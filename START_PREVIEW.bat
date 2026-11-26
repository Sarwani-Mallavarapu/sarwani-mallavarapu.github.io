@echo off
cd /d "%~dp0"
where py >nul 2>nul && (py preview_server.py) || (python preview_server.py)
pause
