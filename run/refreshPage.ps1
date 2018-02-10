[CmdletBinding()]
Param(
[Parameter(Mandatory=$True,Position=1)]
[string]$action
)

$refresh = "r"
$close = "c"

$wshell = New-Object -ComObject wscript.shell
$wshell.AppActivate('Google Chrome')

If ($action -eq $refresh) {
    $wshell.SendKeys("{F5}")
}
Else {
    $wshell.SendKeys("^w")
    $wshell.AppActivate('Visual Studio Code')
}
