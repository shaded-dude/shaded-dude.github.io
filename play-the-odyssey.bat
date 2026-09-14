@echo off
setlocal
cd /d "%~dp0"
start "The Odyssey server" /min node server.js
timeout /t 1 /nobreak >nul
start "" http://127.0.0.1:8787/
