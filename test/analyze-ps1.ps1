# Runs PSScriptAnalyzer on every PowerShell file with the repo settings; exits 1 on any finding.
# Usage: pwsh -File test/analyze-ps1.ps1
$ErrorActionPreference = 'Stop'
if (-not (Get-Module -ListAvailable PSScriptAnalyzer)) {
  Install-Module PSScriptAnalyzer -Scope CurrentUser -Force -RequiredVersion 1.25.0
}
Import-Module PSScriptAnalyzer
$root = Split-Path -Parent $PSScriptRoot
$settings = Join-Path $root 'PSScriptAnalyzerSettings.psd1'
$files = Get-ChildItem -LiteralPath $root -Recurse -Include *.ps1, *.psm1 -File |
  Where-Object { $_.FullName -notmatch '[\\/](node_modules|\.git)[\\/]' }
$findings = @()
foreach ($f in $files) { $findings += @(Invoke-ScriptAnalyzer -Path $f.FullName -Settings $settings) }
$findings | Format-Table -AutoSize | Out-String -Width 200 | Write-Output
Write-Output "PSScriptAnalyzer: $($files.Count) file(s), $($findings.Count) finding(s)"
if ($findings.Count) { exit 1 }
