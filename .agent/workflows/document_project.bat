@echo off
cd %~dp0\..\..
echo Generando documentacion estatica basica (Version Script sin IA)...
if not exist docs mkdir docs
echo ^<html^>^<head^>^<meta charset="UTF-8"^>^<title^>Estructura del Proyecto^</title^>^<style^>body{font-family:sans-serif; padding:20px;}^</style^>^</head^>^<body^>^<h1^>Documentacion Simple del Proyecto^</h1^>^<p^>Esta documentacion fue generada automaticamente sin IA.^</p^>^<h2^>Jerarquia de Archivos^</h2^>^<pre^> > docs\index.html
tree /F /A >> docs\index.html
echo ^</pre^>^</body^>^</html^> >> docs\index.html
echo.
echo Documentacion basica generada en docs/index.html
pause
