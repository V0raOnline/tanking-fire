@echo off
rem Abre TANKING... FIRE! en el navegador con un servidor local (hace falta Python).
rem Puerto 8790 para no chocar con ROI (8765).
cd /d "%~dp0"
start "" cmd /c "timeout /t 1 >nul & start http://localhost:8790"
echo TANKING... FIRE! en http://localhost:8790  (cierra esta ventana para pararlo)
python -m http.server 8790
