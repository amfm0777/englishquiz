@echo off
cd %~dp0\..\..
echo Anadiendo archivos modificados al staging area...
git add .
echo Realizando commit...
git commit -m "Auto-commit: Actualizacion generada por script local automatizado"
echo Subiendo los cambios al repositorio remoto (Push)...
git push
echo.
echo Proceso de Git finalizado correctamente.
pause
