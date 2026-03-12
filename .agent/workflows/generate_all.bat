@echo off
cd %~dp0\..\..
echo =======================================================
echo Workflow Maestro - Compila, Testea, Publica y Documenta
echo =======================================================
echo.

echo === FASE 0: Build (Idioma por defecto: EN) ===
call .agent\workflows\build_en.bat

echo === FASE 1 ^& 2: Ejecutar Pruebas ===
call .agent\workflows\run_tests.bat
if %errorlevel% neq 0 (
    echo.
    echo [ABORTADO] Los tests han fallado. Omitiendo la publicacion de Android.
    goto fase_docs
)
 
echo.
echo === FASE 3: Publicacion en Android aab===
call .agent\workflows\publish_android.bat

echo.
echo === FASE 3.1: Publicacion en Android APK ===
call .agent\workflows\generate_apk.bat

echo.
echo === FASE 4: Documentar Proyecto ===
call .agent\workflows\document_project.bat

echo.
echo === FIN DEL WORKFLOW MAESTRO ===
pause
