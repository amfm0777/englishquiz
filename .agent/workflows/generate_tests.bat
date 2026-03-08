@echo off
cd %~dp0\..\..
echo Instalando dependencias de testing (Jest)...
call npm i -D jest
echo.
echo Jest y las dependencias de prueba se comprobaron e instalaron.
echo Nota: La creacion autonoma e inteligente de logica de pruebas requiere de la IA.
echo Pero puedes continuar escribiendo o ejecutando pruebas unitarias normalmente.
pause
