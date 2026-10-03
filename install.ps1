# God of Design installer for Windows PowerShell 5.1+ / PowerShell 7 (also works on macOS/Linux pwsh). MIT (c) Cuma Bozkurt
#   Install  : irm https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.ps1 | iex
#   Uninstall: & ([scriptblock]::Create((irm https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.ps1))) uninstall
#   Options  : -Tool all|every|claude,codex,opencode,antigravity,gemini,cursor,copilot,windsurf,cline  -Project [-Dir PATH]  -DryRun  -Force  -NoInstructions
# The manifest format is shared with install.sh and the Node CLI.
param(
  [Parameter(Position = 0)][ValidateSet('install', 'uninstall', 'remove', 'status', 'list', 'help')][string]$Action = $(if ($env:GOD_OF_DESIGN_ACTION) { $env:GOD_OF_DESIGN_ACTION } else { 'install' }),
  [string]$Tool = $(if ($env:GOD_OF_DESIGN_TOOL) { $env:GOD_OF_DESIGN_TOOL } else { 'all' }),
  [switch]$Project,
  [switch]$Global,
  [string]$Dir = (Get-Location).Path,
  [switch]$DryRun,
  [switch]$Force,
  [switch]$NoInstructions
)
$ErrorActionPreference = 'Stop'
$Repo = 'cumabozkurt/god-of-design'
$Ref = if ($env:GOD_OF_DESIGN_REF) { $env:GOD_OF_DESIGN_REF } else { 'main' }
$Mark = 'god-of-design'
$BStart = '<!-- god-of-design:start -->'
$BEnd = '<!-- god-of-design:end -->'
$AllTools = @('claude', 'codex', 'opencode', 'antigravity', 'gemini', 'cursor', 'copilot', 'windsurf', 'cline')
if ($Action -eq 'remove') { $Action = 'uninstall' }
$Scope = if ($Project) { 'project' } else { 'global' }
$H = if ($env:GOD_OF_DESIGN_HOME) { $env:GOD_OF_DESIGN_HOME } else { [Environment]::GetFolderPath('UserProfile') }
$Xdg = if ($env:XDG_CONFIG_HOME) { $env:XDG_CONFIG_HOME } else { Join-Path $H '.config' }
$CodexH = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $H '.codex' }
if (-not (Test-Path $Dir)) { New-Item -ItemType Directory -Path $Dir | Out-Null }
$Base = (Resolve-Path $Dir).Path
$MDir = if ($Scope -eq 'global') { Join-Path $H '.god-of-design' } else { Join-Path $Base '.god-of-design' }
$Manifest = Join-Path $MDir 'manifest.tsv'
$Utf8 = New-Object System.Text.UTF8Encoding $false

function J([string]$a, [string]$b) { return [IO.Path]::Combine($a, ($b -replace '/', [IO.Path]::DirectorySeparatorChar)) }
function Write-Text([string]$p, [string]$t) { [IO.File]::WriteAllText($p, $t, $Utf8) }
function Test-Ours([string]$p) {
  $f = $p
  if (Test-Path -LiteralPath $p -PathType Container) { $f = Join-Path $p 'SKILL.md' }
  if (-not (Test-Path -LiteralPath $f -PathType Leaf)) { return $false }
  return ([IO.File]::ReadAllText($f)).Contains($Mark)
}
function Remove-BlockText([string]$text) {
  $pattern = '(\r?\n)*' + [regex]::Escape($BStart) + '[\s\S]*?' + [regex]::Escape($BEnd) + '\r?\n?'
  $t = [regex]::Replace($text, $pattern, "`n")
  $t = [regex]::Replace($t, '(\r?\n){3,}', "`n`n")
  return $t.TrimStart("`r", "`n")
}

$script:Lines = New-Object System.Collections.Generic.List[string]
$script:Created = @{}
$script:Done = @{}
function Add-Line([string]$l) { $script:Lines.Add($l) }
function New-DirP([string]$d) {
  $missing = @(); $cur = $d
  while ($cur -and -not (Test-Path -LiteralPath $cur)) { $missing = , $cur + $missing; $cur = Split-Path -Parent $cur }
  foreach ($m in $missing) {
    if (-not $DryRun) { New-Item -ItemType Directory -Path $m -Force | Out-Null }
    if (-not $script:Created.ContainsKey($m)) { $script:Created[$m] = 1; Add-Line "mkdir`t$m" }
  }
}

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
      'windsurf:block' { return , @((J $H '.codeium/windsurf/memories/global_rules.md'), 'adapters/windsurf/god-of-design.md') }
      'windsurf:bundle' { return , @((J $H '.god-of-design/GOD-OF-DESIGN.md')) }
      'cline:bundle' { return , @((J $H '.god-of-design/GOD-OF-DESIGN.md')) }
      'cline:rule' { return , @((J $H 'Documents/Cline/Rules/god-of-design.md'), 'adapters/cline/god-of-design.md') }
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
      'cline:bundle' { return , @((J $Base '.god-of-design/GOD-OF-DESIGN.md')) }
      'cline:rule' { return , @((J $Base '.clinerules/god-of-design.md'), 'adapters/cline/god-of-design.md') }
    }
  }
  return $null
}

$script:Src = $null; $script:Tmp = $null
function Resolve-Src {
  if ($env:GOD_OF_DESIGN_SRC) { $script:Src = $env:GOD_OF_DESIGN_SRC; return }
  if ($PSScriptRoot -and (Test-Path (J $PSScriptRoot 'skills/god-of-design/SKILL.md'))) { $script:Src = $PSScriptRoot; return }
  $script:Tmp = Join-Path ([IO.Path]::GetTempPath()) ("god-of-design-" + [guid]::NewGuid().ToString('N'))
  New-Item -ItemType Directory -Path $script:Tmp | Out-Null
  $zip = Join-Path $script:Tmp 'src.zip'
  Write-Host "Downloading $Repo@$Ref ..." -ForegroundColor DarkGray
  [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
  Invoke-WebRequest -UseBasicParsing -Uri "https://codeload.github.com/$Repo/zip/$Ref" -OutFile $zip
  Expand-Archive -Path $zip -DestinationPath $script:Tmp -Force
  $script:Src = (Get-ChildItem -Path $script:Tmp -Directory | Select-Object -First 1).FullName
  if (-not (Test-Path (J $script:Src 'skills/god-of-design/SKILL.md'))) { throw 'download did not contain the skill pack' }
}

function Invoke-Part([string]$t, [string]$k) {
  $spec = Get-Target $t $k
  if (-not $spec) { return }
  $dst = $spec[0]
  if ($script:Done.ContainsKey($dst)) { return }
  $script:Done[$dst] = 1
  $label = $t.PadRight(12)
  switch ($k) {
    'skills' {
      New-DirP $dst; $n = 0
      foreach ($s in Get-ChildItem -Path (J $script:Src 'skills') -Directory | Sort-Object Name) {
        if (-not (Test-Path (Join-Path $s.FullName 'SKILL.md'))) { continue }
        $d = Join-Path $dst $s.Name
        if ((Test-Path -LiteralPath $d) -and -not (Test-Ours $d) -and -not $Force) { Write-Host "  ! skip $d (exists and is not from $Mark; use -Force)" -ForegroundColor Yellow; continue }
        if (-not $DryRun) { if (Test-Path -LiteralPath $d) { Remove-Item -LiteralPath $d -Recurse -Force }; Copy-Item -LiteralPath $s.FullName -Destination $d -Recurse }
        Add-Line "dir`t$d"; $n++
      }
      Write-Host "  + $label $n skills -> $dst" -ForegroundColor Green
    }
    'commands' {
      New-DirP $dst; $n = 0
      foreach ($f in Get-ChildItem -Path (J $script:Src 'commands') -Filter '*.md') {
        $d = Join-Path $dst $f.Name
        if ((Test-Path -LiteralPath $d) -and -not (Test-Ours $d) -and -not $Force) { Write-Host "  ! skip $d (exists, not ours)" -ForegroundColor Yellow; continue }
        if (-not $DryRun) {
          $txt = [IO.File]::ReadAllText($f.FullName) -replace "\r\n", "`n"
          if ($txt.StartsWith("---`n")) { $txt = "---`n# $Mark`n" + $txt.Substring(4) }
          Write-Text $d $txt
        }
        Add-Line "file`t$d"; $n++
      }
      Write-Host "  + $label $n commands -> $dst" -ForegroundColor Green
    }
    'rule' {
      if ((Test-Path -LiteralPath $dst) -and -not (Test-Ours $dst) -and -not $Force) { Write-Host "  ! skip $dst (exists, not ours)" -ForegroundColor Yellow; return }
      New-DirP (Split-Path -Parent $dst)
      if (-not $DryRun) { Copy-Item -LiteralPath (J $script:Src $spec[1]) -Destination $dst -Force }
      Add-Line "file`t$dst"; Write-Host "  + $label rule -> $dst" -ForegroundColor Green
    }
    'block' {
      if ($NoInstructions) { return }
      $existed = Test-Path -LiteralPath $dst
      New-DirP (Split-Path -Parent $dst)
      if (-not $DryRun) {
        $body = if ($existed) { Remove-BlockText ([IO.File]::ReadAllText($dst)) } else { '' }
        $snip = ([IO.File]::ReadAllText((J $script:Src $spec[1]))).Trim()
        $block = "$BStart`n$snip`n$BEnd`n"
        if ($body.Trim()) { $out = $body.TrimEnd() + "`n`n" + $block } else { $out = $block }
        Write-Text $dst $out
      }
      Add-Line ("block`t$dst`t" + $(if ($existed) { '0' } else { '1' }))
      Write-Host "  + $label instructions block -> $dst" -ForegroundColor Green
    }
    'bundle' {
      New-DirP (Split-Path -Parent $dst)
      if (-not $DryRun) { Copy-Item -LiteralPath (J $script:Src 'dist/GOD-OF-DESIGN.md') -Destination $dst -Force }
      Add-Line "file`t$dst"; Write-Host "  + $label reference bundle -> $dst" -ForegroundColor Green
    }
  }
}

function Invoke-Uninstall([bool]$Quiet = $false) {
  if (-not (Test-Path -LiteralPath $Manifest)) { if (-not $Quiet) { Write-Host "No $Scope installation found ($Manifest). Nothing to remove." -ForegroundColor Yellow }; return }
  $rows = [IO.File]::ReadAllLines($Manifest) | Where-Object { $_ -and -not $_.StartsWith('#') }
  $removed = 0
  foreach ($row in $rows) {
    $c = $row.Split("`t"); $kind = $c[0]; $p = $c[1]
    if ($kind -eq 'dir' -or $kind -eq 'file') {
      if ((Test-Path -LiteralPath $p) -and ((Test-Ours $p) -or ((Split-Path -Leaf $p) -eq 'GOD-OF-DESIGN.md'))) {
        if (-not $DryRun) { Remove-Item -LiteralPath $p -Recurse -Force }
        $removed++; if (-not $Quiet) { Write-Host "  - $p" -ForegroundColor Red }
      }
    } elseif ($kind -eq 'block' -and (Test-Path -LiteralPath $p)) {
      if (-not $DryRun) {
        $t = Remove-BlockText ([IO.File]::ReadAllText($p))
        if ($c.Length -gt 2 -and $c[2] -eq '1' -and -not $t.Trim()) { Remove-Item -LiteralPath $p -Force } else { Write-Text $p $t }
      }
      $removed++; if (-not $Quiet) { Write-Host "  - block in $p" -ForegroundColor Red }
    }
  }
  if (-not $DryRun) {
    Remove-Item -LiteralPath $Manifest -Force
    $dirs = @($rows | Where-Object { $_.StartsWith("mkdir`t") } | ForEach-Object { $_.Split("`t")[1] }) + @($MDir) | Sort-Object { $_.Length } -Descending
    foreach ($d in $dirs) {
      if ((Test-Path -LiteralPath $d -PathType Container) -and -not (Get-ChildItem -LiteralPath $d -Force | Select-Object -First 1)) { Remove-Item -LiteralPath $d -Force }
    }
  }
  if (-not $Quiet) { Write-Host "God of Design: removed $removed item(s) ($Scope)." }
}

function Invoke-Install {
  Resolve-Src
  $version = ((Get-Content -Raw (J $script:Src 'package.json')) | ConvertFrom-Json).version
  if (Test-Path -LiteralPath $Manifest) { Write-Host 'Existing installation found, removing it first (clean upgrade).' -ForegroundColor DarkGray; if (-not $DryRun) { Invoke-Uninstall $true } }
  Write-Host "God of Design v$version -> $Scope"
  if ($Tool -eq 'all') {
    Invoke-Part 'claude' 'skills'; Invoke-Part 'claude' 'commands'
    Invoke-Part 'codex' 'skills'; Invoke-Part 'codex' 'block'
    Invoke-Part 'antigravity' 'skills'; if ($Scope -eq 'project') { Invoke-Part 'antigravity' 'rule' }
    Invoke-Part 'opencode' 'commands'
  } else {
    $list = if ($Tool -eq 'every') { $AllTools } else { $Tool.ToLower().Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ } }
    foreach ($t in $list) {
      if ($AllTools -notcontains $t) { throw "Unknown tool `"$t`". Use: $($AllTools -join ', '), all, every" }
      foreach ($k in 'skills', 'commands', 'rule', 'block', 'bundle') { Invoke-Part $t $k }
    }
  }
  if (-not $DryRun) {
    New-DirP $MDir
    $header = "# $Mark`tv$version`t$((Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ'))`t$Scope`t$Tool"
    $all = @($header) + $script:Lines.ToArray()
    Write-Text $Manifest (($all -join "`n") + "`n")
    Write-Host "  manifest: $Manifest" -ForegroundColor DarkGray
  } else { Write-Host 'dry run: nothing was written' -ForegroundColor Yellow }
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
        if (Test-Path -LiteralPath $m) { $h1 = ([IO.File]::ReadAllLines($m)[0]).Split("`t"); Write-Host "${sc}: $($h1[1]) tool=$($h1[4]) · $m" } else { Write-Host "${sc}: not installed" }
      }
    }
    'list' { Resolve-Src; Get-ChildItem -Path (J $script:Src 'skills') -Directory | ForEach-Object { $_.Name } }
    'help' { Write-Host "Usage: install.ps1 [install|uninstall|status|list] [-Tool all|every|claude,...] [-Project] [-Dir PATH] [-DryRun] [-Force] [-NoInstructions]`nDocs: https://github.com/$Repo" }
  }
} finally {
  if ($script:Tmp -and (Test-Path $script:Tmp)) { Remove-Item -LiteralPath $script:Tmp -Recurse -Force -ErrorAction SilentlyContinue }
}
