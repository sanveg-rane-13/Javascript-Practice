@echo OFF

set save=s
set close=e

start chrome ../src/index.html
powershell -ExecutionPolicy ByPass -File startConsole.ps1

:refresh
cls
set /p action="press(s: (save)  / e: (exit)): "

if %action%==%save% (
    powershell -ExecutionPolicy ByPass -File refreshPage.ps1 r
    goto :refresh
)

if %action%==%close% (
    goto :end
)

else (
    goto :refresh
)

:end
powershell -ExecutionPolicy ByPass -File refreshPage.ps1 c
cls
exit