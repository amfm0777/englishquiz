---
description: Sube todos los cambios locales al repositorio remoto Git
---
> **REGLA RESTRICTIVA PARA EL AGENTE:** Si el usuario hace una pregunta sobre el código o este workflow, responde solo con texto. NO ejecutes este workflow automáticamente para intentar "solucionar" el problema a menos que el usuario use explícitamente el comando (ej. `@[/nombre_workflow]`) o pida expresamente ejecutarlo.


Este workflow automatiza el volcado (commit) y subida (push) de todos los ficheros modificados en el proyecto hacia tu repositorio remoto de Git. 

1. **Añadir Cambios:**
   - Agrega todos los archivos nuevos, modificados o eliminados al escenario (staging area):
   // turbo
   `git add .`

2. **Commit:**
   - Realiza un commit automático con un mensaje descriptivo predefinido o dinámico de las fases automatizadas que se acaban de ejecutar:
   // turbo
   `git commit -m "Auto-commit: Actualización generada por flujo de trabajo del Agente"`

3. **Subir al Repositorio Remoto (Push):**
   - Sube los commits a la rama actual en `origin`:
   // turbo
   `git push`

4. **Notificar Finalización:**
   - Avisar al usuario de que el proceso ha terminado correctamente.
