# Dr. Proxy for Windows

This is a Windows version of Dr.Proxy by FordLabs.

## How to use

1) Clone this repository.
2) Create a PowerShell Profile (if you don´t have it) running 
```powershell
New-Item -Type File -Force $PROFILE
```
3) Move auto-proxy.ps1 file from this repository to PowerShell´s profile folder (Documents/WindowsPowerShell)

4) Paste this code on Microsoft.PowerShell_profile.ps1 file:
```powershell
&  "$PSScriptRoot\auto-proxy.ps1"
```


5) DONE!


## How to contribute

If you have any suggestion to contribute to this idea, please, leave an issue here on GitHub or contact RMARQU65@ford.com.