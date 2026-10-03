# PSScriptAnalyzer settings for install.ps1 and its tests.
# Write-Host is intentional: the installer prints coloured progress for a human at a console.
@{
  Severity     = @('Error', 'Warning')
  ExcludeRules = @('PSAvoidUsingWriteHost')
}
