# God of Design installer for Windows PowerShell 5.1+ and PowerShell 7 (also macOS/Linux pwsh). MIT (c) Cuma Bozkurt
#   Install  : irm https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.ps1 | iex
#   Uninstall: $s = irm https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.ps1
#              & ([scriptblock]::Create($s)) uninstall
#   Options  : -Tool all|every|claude,codex,opencode,antigravity,gemini,cursor,copilot,windsurf,cline
#              -Project [-Dir PATH]  -DryRun  -Force  -NoInstructions
# The manifest format is shared with install.sh and the Node CLI (install with one, uninstall with another).
# This file is ASCII-only on purpose: Windows PowerShell 5.1 reads BOM-less files as ANSI.
[CmdletBinding()]
param(
  [Parameter(Position = 0)]
  [ValidateSet('install', 'uninstall', 'remove', 'status', 'list', 'help')]
  [string]$Action = $(if ($env:GOD_OF_DESIGN_ACTION) { $env:GOD_OF_DESIGN_ACTION } else { 'install' }),
  [string]$Tool = $(if ($env:GOD_OF_DESIGN_TOOL) { $env:GOD_OF_DESIGN_TOOL } else { 'all' }),
  [switch]$Project,
  [switch]$Global,
  [string]$Dir = '',
  [switch]$DryRun,
  [switch]$Force,
  [switch]$NoInstructions
)

# Everything runs in a child scope so "irm | iex" leaves no functions, variables or
# $ErrorActionPreference changes behind in your PowerShell session.
& {
  param($Action, $Tool, $Project, $Global, $Dir, $DryRun, $Force, $NoInstructions)
  $ErrorActionPreference = 'Stop'
  # Plain values; the nested helper functions read these through PowerShell's dynamic scoping.
  $Tool = "$Tool"; $DryRun = [bool]$DryRun; $Force = [bool]$Force; $NoInstructions = [bool]$NoInstructions
  Set-StrictMode -Version 2.0

  $Repo = 'cumabozkurt/god-of-design'
  $Ref = if ($env:GOD_OF_DESIGN_REF) { $env:GOD_OF_DESIGN_REF } else { 'main' }
  $Mark = 'god-of-design'
  $Managed = 'god-of-design:managed'
  $BStart = '<!-- god-of-design:start -->'
  $BEnd = '<!-- god-of-design:end -->'
  $AllTools = @('claude', 'codex', 'opencode', 'antigravity', 'gemini', 'cursor', 'copilot', 'windsurf', 'cline')
  $Utf8 = New-Object System.Text.UTF8Encoding $false
  if ($Action -eq 'remove') { $Action = 'uninstall' }
  if ($Global -and $Project) { throw 'Use either -Global or -Project, not both.' }
  $Scope = if ($Project) { 'project' } else { 'global' }
  $H = if ($env:GOD_OF_DESIGN_HOME) { $env:GOD_OF_DESIGN_HOME } else { [Environment]::GetFolderPath('UserProfile') }
  $Xdg = if ($env:XDG_CONFIG_HOME) { $env:XDG_CONFIG_HOME } else { Join-Path $H '.config' }
  $CodexH = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $H '.codex' }
  if (-not $Dir) { $Dir = (Get-Location).ProviderPath }
  if (-not (Test-Path -LiteralPath $Dir -PathType Container)) { throw "Directory not found: $Dir" }
  $Base = (Resolve-Path -LiteralPath $Dir).ProviderPath
  $MDir = if ($Scope -eq 'global') { Join-Path $H '.god-of-design' } else { Join-Path $Base '.god-of-design' }
  $Manifest = Join-Path $MDir 'manifest.tsv'
  # Mutable state shared by the helper functions (hashtables are passed by reference).
  $S = @{ Lines = New-Object System.Collections.Generic.List[string]; Created = @{}; Done = @{}; File = $null; Src = $null; Tmp = $null }

  function J([string]$a, [string]$b) { return [IO.Path]::Combine($a, ($b -replace '/', [IO.Path]::DirectorySeparatorChar)) }
  # Exact text I/O: keeps a BOM (as U+FEFF), line endings and a missing final newline.
  function Read-Exact([string]$p) { return $Utf8.GetString([IO.File]::ReadAllBytes($p)) }
  function Write-Exact([string]$p, [string]$t) { [IO.File]::WriteAllBytes($p, $Utf8.GetBytes($t)) }
  function Test-Owned([string]$p) {
    try {
      if (Test-Path -LiteralPath $p -PathType Container) {
        $f = Join-Path $p 'SKILL.md'
        if (-not (Test-Path -LiteralPath $f -PathType Leaf)) { return $false }
        return [regex]::IsMatch((Read-Exact $f), '(?m)^\s+pack:\s*"?god-of-design"?\s*$')
      }
      if (-not (Test-Path -LiteralPath $p -PathType Leaf)) { return $false }
      $text = Read-Exact $p
      if ($text.Contains($Managed)) { return $true }
      # Files written by v1.0.0, before the :managed marker existed.
      if (@('god-of-design.md', 'god-of-design.mdc', 'god-of-design.instructions.md', 'GOD-OF-DESIGN.md') -ccontains (Split-Path -Leaf $p)) { return $true }
      return [regex]::IsMatch($text, '^---\r?\n# god-of-design\r?\n')
    } catch { return $false }
  }
  function Get-Nl([string]$t) { if ($t.Contains("`r`n")) { return "`r`n" } else { return "`n" } }
  # Exact inverse of Add-Block (same algorithm as the Node CLI and install.sh).
  function Get-TextWithoutBlock([string]$text, [bool]$pad) {
    $i = $text.IndexOf($BStart, [StringComparison]::Ordinal)
    if ($i -lt 0) { return $text }
    $j = $text.IndexOf($BEnd, $i, [StringComparison]::Ordinal)
    if ($j -lt 0) { return $text }
    $nl = Get-Nl $text
    $pre = $text.Substring(0, $i); $post = $text.Substring($j + $BEnd.Length)
    if ($post.StartsWith($nl, [StringComparison]::Ordinal)) { $post = $post.Substring($nl.Length) }
    elseif ($post.StartsWith("`n", [StringComparison]::Ordinal)) { $post = $post.Substring(1) }
    if ($pre.EndsWith($nl, [StringComparison]::Ordinal)) { $pre = $pre.Substring(0, $pre.Length - $nl.Length) }
    if ($pad -and $pre.EndsWith($nl, [StringComparison]::Ordinal)) { $pre = $pre.Substring(0, $pre.Length - $nl.Length) }
    return $pre + $post
  }
  function Add-Block([string]$text, [string]$snippet) {
    if ($text.Contains($BStart)) { $text = Get-TextWithoutBlock $text $false }
    $nl = if ($text) { Get-Nl $text } else { "`n" }
    $body = (($snippet -replace "`r`n", "`n").Trim()) -replace "`n", $nl
    $block = $BStart + $nl + $body + $nl + $BEnd + $nl
    if ($text -eq '') { return @{ Out = $block; Pad = $false } }
    $pad = -not $text.EndsWith("`n", [StringComparison]::Ordinal)
    $sep = if ($pad) { $nl + $nl } else { $nl }
    return @{ Out = $text + $sep + $block; Pad = $pad }
  }
  function Add-Record([string]$l) {
    $S.Lines.Add($l)
    if ($S.File) { [IO.File]::AppendAllText($S.File, "$l`n", $Utf8) }
  }
  function Add-DirTree([string]$d) {
    $missing = @(); $cur = $d
    while ($cur -and -not (Test-Path -LiteralPath $cur)) { $missing = , $cur + $missing; $cur = Split-Path -Parent $cur }
    foreach ($m in $missing) {
      if (-not $DryRun) { [void][IO.Directory]::CreateDirectory($m) }
      if (-not $S.Created.ContainsKey($m)) { $S.Created[$m] = 1; Add-Record "mkdir`t$m" }
    }
  }
  # SKILL.md first, so even a partially copied folder is recognisable as ours (and removable).
  function Copy-SkillDir([string]$src, [string]$dst) {
    [void][IO.Directory]::CreateDirectory($dst)
    $first = Join-Path $src 'SKILL.md'
    if (Test-Path -LiteralPath $first) { [IO.File]::Copy($first, (Join-Path $dst 'SKILL.md'), $true) }
    foreach ($e in Get-ChildItem -LiteralPath $src -Force) {
      if ($e.Name -eq 'SKILL.md') { continue }
      $d = Join-Path $dst $e.Name
      if ($e.PSIsContainer) { Copy-SkillDir $e.FullName $d } else { [IO.File]::Copy($e.FullName, $d, $true) }
    }
  }
  function Write-Info([string]$m, [string]$c = 'Gray') { Write-Host $m -ForegroundColor $c }

  function Get-Target([string]$t, [string]$k) {
    if ($Scope -eq 'global') {
      switch ("${t}:$k") {
        'claude:skills' { return , @((J $H '.claude/skills')) }
        'claude:commands' { return , @((J $H '.claude/commands')) }
        'codex:skills' { return , @((J $H '.agents/skills')) }
        'codex:block' { return , @((J $CodexH 'AGENTS.md'), 'adapters/codex/AGENTS.snippet.md') }
        'opencode:skills' { return , @((J $Xdg 'opencode/skills')) }
        'opencode:commands' { return , @((J $Xdg 'opencode/commands')) }
        'antigravity:skills' { return , @((J $H '.gemini/config/skills')) }
        'gemini:skills' { return , @((J $H '.gemini/skills')) }
        'cursor:skills' { return , @((J $H '.cursor/skills')) }
        'copilot:skills' { return , @((J $H '.copilot/skills')) }
        'windsurf:block' { return , @((J $H '.codeium/windsurf/memories/global_rules.md'), 'adapters/windsurf/global_rules.snippet.md') }
        'windsurf:bundle' { return , @((J $H '.god-of-design/GOD-OF-DESIGN.md')) }
        'cline:rule' { return , @((J $H 'Documents/Cline/Rules/god-of-design.md'), 'adapters/cline/god-of-design.md') }
        'cline:bundle' { return , @((J $H '.god-of-design/GOD-OF-DESIGN.md')) }
      }
    } else {
      switch ("${t}:$k") {
        'claude:skills' { return , @((J $Base '.claude/skills')) }
        'claude:commands' { return , @((J $Base '.claude/commands')) }
        'codex:skills' { return , @((J $Base '.agents/skills')) }
        'codex:block' { return , @((J $Base 'AGENTS.md'), 'adapters/codex/AGENTS.snippet.md') }
        'opencode:skills' { return , @((J $Base '.opencode/skills')) }
        'opencode:commands' { return , @((J $Base '.opencode/commands')) }
        'antigravity:skills' { return , @((J $Base '.agents/skills')) }
        'antigravity:rule' { return , @((J $Base '.agents/rules/god-of-design.md'), 'adapters/antigravity/god-of-design.md') }
        'gemini:skills' { return , @((J $Base '.gemini/skills')) }
        'gemini:block' { return , @((J $Base 'GEMINI.md'), 'adapters/gemini/GEMINI.snippet.md') }
        'cursor:skills' { return , @((J $Base '.cursor/skills')) }
        'cursor:rule' { return , @((J $Base '.cursor/rules/god-of-design.mdc'), 'adapters/cursor/god-of-design.mdc') }
        'copilot:skills' { return , @((J $Base '.github/skills')) }
        'copilot:rule' { return , @((J $Base '.github/instructions/god-of-design.instructions.md'), 'adapters/copilot/god-of-design.instructions.md') }
        'windsurf:rule' { return , @((J $Base '.windsurf/rules/god-of-design.md'), 'adapters/windsurf/god-of-design.md') }
        'windsurf:bundle' { return , @((J $Base '.god-of-design/GOD-OF-DESIGN.md')) }
        'cline:rule' { return , @((J $Base '.clinerules/god-of-design.md'), 'adapters/cline/god-of-design.md') }
        'cline:bundle' { return , @((J $Base '.god-of-design/GOD-OF-DESIGN.md')) }
      }
    }
    return $null
  }

  # "all" = the recommended set; anything else is validated before touching the disk.
  function Get-Plan {
    $arg = "$Tool".ToLowerInvariant().Trim()
    if ($arg -eq 'all') {
      $agRule = if ($Scope -eq 'project') { @('skills', 'rule') } else { @('skills') }
      return @(
        @{ T = 'claude'; Parts = @('skills', 'commands', 'rule', 'block', 'bundle') },
        @{ T = 'codex'; Parts = @('skills', 'commands', 'rule', 'block', 'bundle') },
        @{ T = 'antigravity'; Parts = $agRule },
        @{ T = 'opencode'; Parts = @('commands') })
    }
    $list = if ($arg -eq 'every') { $AllTools } else { @($arg.Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ }) }
    if (-not $list) { throw '-Tool needs a value' }
    foreach ($t in $list) { if ($AllTools -notcontains $t) { throw "Unknown tool `"$t`". Use one of: $($AllTools -join ', '), all, every" } }
    # Share skill folders instead of duplicating them: Gemini CLI also reads .agents/skills; Cursor and
    # OpenCode also read .agents/skills and .claude/skills (Gemini CLI warns about every duplicate).
    $agents = if ($list -contains 'codex') { 'codex' } elseif ($Scope -eq 'project' -and $list -contains 'antigravity') { 'antigravity' } else { $null }
    $claude = if ($list -contains 'claude') { 'claude' } else { $null }
    $seen = @{}; $plan = @()
    foreach ($t in $list) {
      if ($seen.ContainsKey($t)) { continue }
      $seen[$t] = 1
      $via = $null
      if ($t -eq 'gemini') { $via = $agents }
      elseif ($t -eq 'cursor' -or $t -eq 'opencode') { $via = if ($agents) { $agents } else { $claude } }
      if ($via) { $plan += @{ T = $t; Via = $via; Parts = @('commands', 'rule', 'block', 'bundle') } }
      else { $plan += @{ T = $t; Via = $null; Parts = @('skills', 'commands', 'rule', 'block', 'bundle') } }
    }
    return $plan
  }

  function Resolve-Src {
    if ($env:GOD_OF_DESIGN_SRC) { $S.Src = $env:GOD_OF_DESIGN_SRC; return }
    if ($PSScriptRoot -and (Test-Path -LiteralPath (J $PSScriptRoot 'skills/god-of-design/SKILL.md'))) { $S.Src = $PSScriptRoot; return }
    $S.Tmp = Join-Path ([IO.Path]::GetTempPath()) ('god-of-design-' + [guid]::NewGuid().ToString('N'))
    [void][IO.Directory]::CreateDirectory($S.Tmp)
    $zip = Join-Path $S.Tmp 'src.zip'
    Write-Info "Downloading $Repo@$Ref ..." 'DarkGray'
    try { [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12 } catch { Write-Verbose 'TLS 1.2 already enabled' }
    $old = $ProgressPreference; $ProgressPreference = 'SilentlyContinue'   # the progress bar makes 5.1 downloads very slow
    try { Invoke-WebRequest -UseBasicParsing -Uri "https://codeload.github.com/$Repo/zip/$Ref" -OutFile $zip } finally { $ProgressPreference = $old }
    Expand-Archive -LiteralPath $zip -DestinationPath $S.Tmp -Force
    $S.Src = (Get-ChildItem -LiteralPath $S.Tmp -Directory | Select-Object -First 1).FullName
    if (-not (Test-Path -LiteralPath (J $S.Src 'skills/god-of-design/SKILL.md'))) { throw 'The download did not contain the skill pack.' }
  }

  function Invoke-Part([string]$t, [string]$k) {
    $spec = Get-Target $t $k
    if (-not $spec) { return }
    $dst = $spec[0]
    if ($S.Done.ContainsKey($dst)) { return }
    $label = $t.PadRight(12)
    switch ($k) {
      'skills' {
        $S.Done[$dst] = 1; Add-DirTree $dst; $n = 0
        foreach ($sk in Get-ChildItem -LiteralPath (J $S.Src 'skills') -Directory | Sort-Object Name) {
          if (-not (Test-Path -LiteralPath (Join-Path $sk.FullName 'SKILL.md'))) { continue }
          $d = Join-Path $dst $sk.Name
          if ((Test-Path -LiteralPath $d) -and -not (Test-Owned $d) -and -not $Force) { Write-Info "  ! skip $d (exists and is not from $Mark; use -Force)" 'Yellow'; continue }
          Add-Record "dir`t$d"
          if (-not $DryRun) { if (Test-Path -LiteralPath $d) { Remove-Item -LiteralPath $d -Recurse -Force }; Copy-SkillDir $sk.FullName $d }
          $n++
        }
        Write-Info "  + $label $n skills -> $dst" 'Green'
      }
      'commands' {
        $S.Done[$dst] = 1; Add-DirTree $dst; $n = 0
        foreach ($f in Get-ChildItem -LiteralPath (J $S.Src 'commands') -Filter '*.md' | Sort-Object Name) {
          $d = Join-Path $dst $f.Name
          if ((Test-Path -LiteralPath $d) -and -not (Test-Owned $d) -and -not $Force) { Write-Info "  ! skip $d (exists, not ours)" 'Yellow'; continue }
          Add-Record "file`t$d"
          if (-not $DryRun) { Write-Exact $d ([regex]::Replace((Read-Exact $f.FullName), '^---\r?\n', "---`n# $Managed`n")) }
          $n++
        }
        Write-Info "  + $label $n commands -> $dst" 'Green'
      }
      'rule' {
        $S.Done[$dst] = 1
        if ((Test-Path -LiteralPath $dst) -and -not (Test-Owned $dst) -and -not $Force) { Write-Info "  ! skip $dst (exists, not ours)" 'Yellow'; return }
        Add-DirTree (Split-Path -Parent $dst); Add-Record "file`t$dst"
        if (-not $DryRun) { [IO.File]::Copy((J $S.Src $spec[1]), $dst, $true) }
        Write-Info "  + $label rule -> $dst" 'Green'
      }
      'block' {
        if ($NoInstructions) { return }
        $S.Done[$dst] = 1
        $existed = Test-Path -LiteralPath $dst -PathType Leaf
        Add-DirTree (Split-Path -Parent $dst)
        $orig = if ($existed) { Read-Exact $dst } else { '' }
        $r = Add-Block $orig (Read-Exact (J $S.Src $spec[1]))
        Add-Record ("block`t$dst`t" + $(if ($existed) { '0' } else { '1' }) + "`t" + $(if ($r.Pad) { '1' } else { '0' }))
        if (-not $DryRun) { Write-Exact $dst $r.Out }
        Write-Info "  + $label instructions block -> $dst" 'Green'
      }
      'bundle' {
        $S.Done[$dst] = 1
        Add-DirTree (Split-Path -Parent $dst); Add-Record "file`t$dst"
        if (-not $DryRun) { [IO.File]::Copy((J $S.Src 'dist/GOD-OF-DESIGN.md'), $dst, $true) }
        Write-Info "  + $label reference bundle -> $dst" 'Green'
      }
    }
  }

  function Invoke-Uninstall([bool]$Quiet) {
    if (-not (Test-Path -LiteralPath $Manifest)) {
      if (-not $Quiet) { Write-Info "No $Scope installation found ($Manifest). Nothing to remove." 'Yellow' }
      return
    }
    $rows = @([IO.File]::ReadAllLines($Manifest) | Where-Object { $_ -and -not $_.StartsWith('#') })
    $removed = 0
    foreach ($row in $rows) {
      $c = $row.Split("`t"); $kind = $c[0]
      if ($c.Length -lt 2 -or -not $c[1]) { continue }
      $p = $c[1]
      if ($kind -eq 'dir' -or $kind -eq 'file') {
        if ((Test-Path -LiteralPath $p) -and (Test-Owned $p)) {
          if (-not $DryRun) { Remove-Item -LiteralPath $p -Recurse -Force }
          $removed++; if (-not $Quiet) { Write-Info "  - $p" 'Red' }
        }
      } elseif ($kind -eq 'block' -and (Test-Path -LiteralPath $p -PathType Leaf)) {
        $before = Read-Exact $p
        if (-not $before.Contains($BStart)) { continue }
        $pad = ($c.Length -gt 3 -and $c[3] -eq '1')
        $t = Get-TextWithoutBlock $before $pad
        if (-not $DryRun) {
          if ($c.Length -gt 2 -and $c[2] -eq '1' -and $t -eq '') { Remove-Item -LiteralPath $p -Force } else { Write-Exact $p $t }
        }
        $removed++; if (-not $Quiet) { Write-Info "  - block in $p" 'Red' }
      }
    }
    if (-not $DryRun) {
      Remove-Item -LiteralPath $Manifest -Force
      $dirs = @($rows | Where-Object { $_.StartsWith("mkdir`t") } | ForEach-Object { $_.Split("`t")[1] }) + @($MDir)
      foreach ($d in ($dirs | Select-Object -Unique | Sort-Object { $_.Length } -Descending)) {
        try {
          if ((Test-Path -LiteralPath $d -PathType Container) -and -not (Get-ChildItem -LiteralPath $d -Force | Select-Object -First 1)) { Remove-Item -LiteralPath $d -Force }
        } catch { Write-Verbose "kept $d" }
      }
    }
    if (-not $Quiet) { Write-Host "God of Design: removed $removed item(s) ($Scope)." }
  }

  function Invoke-Install {
    $plan = @(Get-Plan)                   # validates -Tool before anything is written
    Resolve-Src
    $version = ((Read-Exact (J $S.Src 'package.json')) | ConvertFrom-Json).version
    if (Test-Path -LiteralPath $Manifest) {
      Write-Info 'Existing installation found, removing it first (clean upgrade).' 'DarkGray'
      if (-not $DryRun) { Invoke-Uninstall $true }
    }
    Write-Host "God of Design v$version -> $Scope"
    if (-not $DryRun) {
      Add-DirTree $MDir
      $stamp = (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ')
      $header = "# $Mark`tv$version`t$stamp`t$Scope`t$Tool`n"
      [IO.File]::WriteAllText($Manifest, $header + (($S.Lines | ForEach-Object { "$_`n" }) -join ''), $Utf8)
      $S.File = $Manifest
    }
    try {
      foreach ($p in $plan) {
        if ($p.ContainsKey('Via') -and $p.Via) {
          $shared = (Get-Target $p.Via 'skills')[0]
          Write-Info "  = $($p.T.PadRight(12)) skills: reads $shared (no duplicate copy)" 'Green'
        }
        foreach ($k in $p.Parts) { Invoke-Part $p.T $k }
      }
    } catch {
      $msg = $_.Exception.Message
      if (-not $DryRun) { $S.File = $null; Invoke-Uninstall $true }
      throw "$msg`nInstall stopped and was rolled back; nothing from God of Design is left behind."
    }
    if ($DryRun) { Write-Info 'dry run: nothing was written' 'Yellow' } else { Write-Info "  manifest: $Manifest" 'DarkGray' }
    Write-Host ''
    Write-Host 'Try it: ask your agent "design a landing page for an Istanbul ceramics studio in Ottoman Iznik style"'
  }

  try {
    switch ($Action) {
      'install' { Invoke-Install }
      'uninstall' { Invoke-Uninstall $false }
      'status' {
        foreach ($sc in 'global', 'project') {
          $m = if ($sc -eq 'global') { J $H '.god-of-design/manifest.tsv' } else { J $Base '.god-of-design/manifest.tsv' }
          if (Test-Path -LiteralPath $m) {
            $h1 = ([IO.File]::ReadAllLines($m)[0]).Split("`t")
            Write-Host "${sc}: $($h1[1]) tool=$($h1[4]) - $m"
          } else { Write-Host "${sc}: not installed" }
        }
      }
      'list' { Resolve-Src; Get-ChildItem -LiteralPath (J $S.Src 'skills') -Directory | ForEach-Object { $_.Name } }
      'help' {
        Write-Host 'Usage: install.ps1 [install|uninstall|status|list] [-Tool all|every|claude,...]'
        Write-Host '                   [-Project] [-Dir PATH] [-DryRun] [-Force] [-NoInstructions]'
        Write-Host "Docs: https://github.com/$Repo"
      }
    }
  } finally {
    if ($S.Tmp -and (Test-Path -LiteralPath $S.Tmp)) { Remove-Item -LiteralPath $S.Tmp -Recurse -Force -ErrorAction SilentlyContinue }
  }
} $Action $Tool $Project $Global $Dir $DryRun $Force $NoInstructions
