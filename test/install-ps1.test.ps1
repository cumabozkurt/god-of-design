# Standalone round-trip tests for install.ps1 (Windows PowerShell 5.1 and PowerShell 7).
# Usage: pwsh -File test/install-ps1.test.ps1   (or: powershell -File test/install-ps1.test.ps1)
[Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSAvoidUsingInvokeExpression', '', Justification = 'tests the irm | iex one-liner')]
param()
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$installer = Join-Path $Root 'install.ps1'
# Spaces in every path, like "C:\Users\Jane Doe".
$T = Join-Path (Join-Path ([IO.Path]::GetTempPath()) ('god-ps-' + [guid]::NewGuid().ToString('N'))) 'with space'
$HomeDir = Join-Path $T 'home dir'; $Proj = Join-Path $T 'proj dir'
New-Item -ItemType Directory -Path (Join-Path $HomeDir '.codex'), $Proj -Force *> $null
$enc = New-Object System.Text.UTF8Encoding $false
[IO.File]::WriteAllText((Join-Path $HomeDir '.codex/AGENTS.md'), "# My rules`r`n`r`nUse tabs.`r`n", $enc)        # CRLF
[IO.File]::WriteAllBytes((Join-Path $Proj 'AGENTS.md'), [byte[]](0xEF, 0xBB, 0xBF) + $enc.GetBytes('# Project')) # BOM, no final newline
[IO.File]::WriteAllText((Join-Path $Proj 'GEMINI.md'), '', $enc)                                                 # empty file
$env:GOD_OF_DESIGN_HOME = $HomeDir; $env:XDG_CONFIG_HOME = Join-Path $HomeDir '.config'; $env:CODEX_HOME = Join-Path $HomeDir '.codex'
$env:GOD_OF_DESIGN_SRC = $Root
$script:pass = 0; $script:fail = 0
function Check([string]$name, [scriptblock]$cond) { if (& $cond) { $script:pass++; Write-Host "ok   $name" } else { $script:fail++; Write-Host "FAIL $name" } }
function Snap([string]$dir) {
  (Get-ChildItem -LiteralPath $dir -Recurse -Force | Sort-Object FullName | ForEach-Object {
      if ($_.PSIsContainer) { "$($_.FullName)/" } else { "$($_.FullName) $((Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash)" } }) -join "`n"
}
function Text([string]$p) { $enc.GetString([IO.File]::ReadAllBytes($p)) }
try {
  $h0 = Snap $HomeDir; $p0 = Snap $Proj
  & $installer install *> $null
  Check 'global skills for Claude Code' { Test-Path -LiteralPath (Join-Path $HomeDir '.claude/skills/god-of-design/SKILL.md') }
  Check 'global skills for Codex/agents' { Test-Path -LiteralPath (Join-Path $HomeDir '.agents/skills/god-styles/SKILL.md') }
  Check 'global skills for Antigravity' { Test-Path -LiteralPath (Join-Path $HomeDir '.gemini/config/skills/god-color/SKILL.md') }
  Check 'OpenCode commands' { Test-Path -LiteralPath (Join-Path $HomeDir '.config/opencode/commands/god-design.md') }
  Check 'Codex block on its own CRLF lines' { (Text (Join-Path $HomeDir '.codex/AGENTS.md')).StartsWith("# My rules`r`n`r`nUse tabs.`r`n`r`n<!-- god-of-design:start -->`r`n") }
  & $installer install *> $null
  Check 'reinstall keeps a single block' { ([regex]::Matches((Text (Join-Path $HomeDir '.codex/AGENTS.md')), 'god-of-design:start')).Count -eq 1 }
  & $installer uninstall *> $null
  Check 'global uninstall restores HOME byte-for-byte' { (Snap $HomeDir) -eq $h0 }

  & $installer install -Project -Dir $Proj -Tool every *> $null
  Check 'project cursor rule' { Test-Path -LiteralPath (Join-Path $Proj '.cursor/rules/god-of-design.mdc') }
  Check 'project copilot instructions' { Test-Path -LiteralPath (Join-Path $Proj '.github/instructions/god-of-design.instructions.md') }
  Check 'project block keeps BOM, starts on its own line' { (Text (Join-Path $Proj 'AGENTS.md')).StartsWith([string][char]0xFEFF + "# Project`n`n<!-- god-of-design:start -->`n") }
  & $installer uninstall -Project -Dir $Proj *> $null
  Check 'project uninstall restores dir (BOM, no final newline, empty file)' { (Snap $Proj) -eq $p0 }

  & $installer install -DryRun *> $null
  & $installer install -Project -Dir $Proj -Tool every -DryRun *> $null
  Check 'dry-run writes nothing' { ((Snap $HomeDir) -eq $h0) -and ((Snap $Proj) -eq $p0) }

  $failed = $false; try { & $installer install -Tool 'claude,photoshop' *> $null } catch { $failed = $true }
  Check 'unknown tool is rejected and changes nothing' { $failed -and ((Snap $HomeDir) -eq $h0) }
  $missing = Join-Path $T 'does not exist'
  $failed = $false; try { & $installer install -Project -Dir $missing *> $null } catch { $failed = $true }
  Check 'missing -Dir is rejected, not created' { $failed -and -not (Test-Path -LiteralPath $missing) }

  # "irm | iex" style: must not leak functions or $ErrorActionPreference into the caller's session.
  $leak = & {
    $ErrorActionPreference = 'Continue'
    Get-Content -Raw -LiteralPath $installer | Invoke-Expression *> $null
    $r = @{ EAP = $ErrorActionPreference; Fn = [bool](Get-Command Invoke-Part -ErrorAction SilentlyContinue) }
    & ([scriptblock]::Create((Get-Content -Raw -LiteralPath $installer))) uninstall *> $null
    $r
  }
  Check 'iex install leaves the session untouched' { $leak.EAP -eq 'Continue' -and -not $leak.Fn }
  Check 'scriptblock uninstall restores HOME' { (Snap $HomeDir) -eq $h0 }
} finally { Remove-Item -LiteralPath (Split-Path -Parent $T) -Recurse -Force -ErrorAction SilentlyContinue }
Write-Host "install.ps1: $script:pass passed, $script:fail failed (PowerShell $($PSVersionTable.PSVersion))"
if ($script:fail) { exit 1 }
