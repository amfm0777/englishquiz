@echo off
cd %~dp0\..\..
echo Sincronizando web a Android...
call npx cap sync android
cd android
echo Limpiando proyecto de Android...
call .\gradlew clean
echo Compilando App Bundle (Release)...
call .\gradlew bundleRelease
cd ..
echo.
echo Android App Bundle generado exitosamente. Revisa la ruta: android/app/build/outputs/bundle/release/
pause
