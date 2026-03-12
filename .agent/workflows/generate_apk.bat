@echo off
cd %~dp0\..\..
echo Sincronizando web a Android...
call npx cap sync android
cd android
echo Limpiando proyecto de Android...
call .\gradlew clean
echo Compilando APK (Release)...
call .\gradlew assembleRelease
cd ..
echo.
echo APK (Release) generado exitosamente. Revisa la ruta: android/app/build/outputs/apk/release/
pause
