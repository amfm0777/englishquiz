@echo off
cd %~dp0\..\..
echo Ejecutando la suite de pruebas (Jest)...
call npm run test
set TEST_RESULT=%errorlevel%
if %TEST_RESULT% neq 0 (
    echo.
    echo [ERROR] Las pruebas fallaron. Código de salida: %TEST_RESULT%
) else (
    echo.
    echo [EXITO] Las pruebas pasaron correctamente.
)
pause
exit /b %TEST_RESULT%
