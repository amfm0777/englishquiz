---
description: Workflow Maestro - Compila, Testea, Publica y Documenta
---
> **REGLA RESTRICTIVA PARA EL AGENTE:** Si el usuario hace una pregunta sobre el código o este workflow, responde solo con texto. NO ejecutes este workflow automáticamente para intentar "solucionar" el problema a menos que el usuario use explícitamente el comando (ej. `@[/nombre_workflow]`) o pida expresamente ejecutarlo.


Este workflow unifica todos los procesos de salida y auditoría del proyecto "English App". Al ejecutar este workflow, el agente debe seguir estrictamente estos pasos:

1. **Fase 1: Compilación / Verificación Web**
   - Dado que el frontend emplea Vanilla JS/HTML/CSS sin un `build` de Node, verificar que no hay errores fatales de sintaxis pendientes en `www/app.js` y `www/index.html`.

2. **Fase 2: Ejecutar Workflow de Tests (`run_tests.md`)**
   - El agente asume y ejecuta la lógica contenida en el workflow `run_tests.md` (previamente generado, posiblemente con `generate_tests.md`).
   - 🚨 **Condición Crítica**: Si los tests fallan (exit code != 0), **ABORTAR** la fase de Android (Fase 3) e ir directamente a la fase de Documentación (Fase 4). 
   - Notificar explícitamente al usuario que la generación de Android se omitió debido a fallos en las pruebas.

3. **Fase 3: Ejecutar Workflow de Android (`publish_android.md`)** *(Sólo si Fase 2 fue exitosa)*
   - El agente asume y ejecuta la lógica de publicación:
     1. Sincroniza web a Android (`npx cap sync android`).
     2. Limpia el proyecto en Android (`cd android; .\gradlew clean`).
     3. Compila el App Bundle Release (`cd android; .\gradlew bundleRelease`).
     4. Verifica que `app-release.aab` exista.

4. **Fase 4: Ejecutar Workflow de Documentación (`document_project.md`)**
   - Se ejecuta independientemente del resultado de los tests.
   - Analiza la jerarquía, complejidad y realiza la auditoría.
   - Construye o actualiza el fichero completo `docs/index.html`.

5. **Fase 5: Notificación Maestra**
   - Tras completar todos los pasos anteriores, notificar al usuario.
   - El resumen debe indicar el estado final:
     * Resultado de los Tests.
     * Si Android se publicó (con ruta `.aab`) o se omitió.
     * Link al `docs/index.html` recién actualizado.
