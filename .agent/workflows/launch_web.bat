@echo off
cd %~dp0\..\..
echo =========================================
echo Lanzando version web de la aplicacion...
echo =========================================
echo.
echo Iniciando servidor local con http-server...
echo El navegador se abrira automaticamente. Presiona Ctrl+C para detener.
echo.
call npx -y http-server www -c-1 -o
pause
