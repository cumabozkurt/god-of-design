# Standalone round-trip test for install.ps1. Usage: pwsh -File test/install-ps1.test.ps1
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$T = Join-Path ([IO.Path]::GetTempPath()) ("god-ps-" + [guid]::NewGuid().ToString('N'))
$HomeDir = Join-Path $T 'home'; $Proj = Join-Path $T 'proj'
New-Item -ItemType Directory -Path (Join-Path $HomeDir '.codex'), $Proj -Force | Out-Null
[IO.File]::WriteAllText((Join-Path $HomeDir '.codex/AGENTS.md'), "# My rules`n")
[IO.File]::WriteAllText((Join-Path $Proj 'AGENTS.md'), "# Project`n")
$env:GOD_OF_DESIGN_HOME = $HomeDir; $env:XDG_CONFIG_HOME = Join-Path $HomeDir '.config'; $env:CODEX_HOME = Join-Path $HomeDir '.codex'
$script:pass = 0; $script:fail = 0
function Check([string]$name, [scriptblock]$cond) { if (& $cond) { $script:pass++; Write-Host "ok   $name" } else { $script:fail++; Write-Host "FAIL $name" } }
function Snap([string]$dir) { (Get-ChildItem -LiteralPath $dir -Recurse -Force | Sort-Object FullName | ForEach-Object { if ($_.PSIsContainer) { "$($_.FullName)/" } else { "$($_.FullName) $((Get-FileHash -LiteralPath $_.FullName -Algorithm SHA1).Hash)" } }) -join "`n" }
$installer = Join-Path $Root 'install.ps1'
try {
  $h0 = Snap $HomeDir; $p0 = Snap $Proj
  & $installer install | Out-Null
  Check 'global skills for Claude Code' { Test-Path (Join-Path $HomeDir '.claude/skills/god-of-design/SKILL.md') }
  Check 'global skills for Codex/agents' { Test-Path (Join-Path $HomeDir '.agents/skills/god-styles/SKILL.md') }
  Check 'global skills for Antigravity' { Test-Path (Join-Path $HomeDir '.gemini/config/skills/god-color/SKILL.md') }
  Check 'Codex AGENTS.md has block' { (Get-Content -Raw (Join-Path $HomeDir '.codex/AGENTS.md')) -match 'god-of-design:start' }
  & $installer install | Out-Null
  Check 'reinstall keeps a single block' { ([regex]::Matches((Get-Content -Raw (Join-Path $HomeDir '.codex/AGENTS.md')), 'god-of-design:start')).Count -eq 1 }
  & $installer uninstall | Out-Null
  Check 'global uninstall restores HOME' { (Snap $HomeDir) -eq $h0 }
  & $installer install -Project -Dir $Proj -Tool every | Out-Null
  Check 'project cursor rule' { Test-Path (Join-Path $Proj '.cursor/rules/god-of-design.mdc') }
  Check 'project copilot instructions' { Test-Path (Join-Path $Proj '.github/instructions/god-of-design.instructions.md') }
  & $installer uninstall -Project -Dir $Proj | Out-Null
  Check 'project uninstall restores dir' { (Snap $Proj) -eq $p0 }
  & $installer install -DryRun | Out-Null
  Check 'dry-run writes nothing' { (Snap $HomeDir) -eq $h0 }
} finally { Remove-Item -LiteralPath $T -Recurse -Force -ErrorAction SilentlyContinue }
Write-Host "install.ps1: $script:pass passed, $script:fail failed"
if ($script:fail) { exit 1 }
