---
description: Ejecutar la suite de tests y verificar cobertura
---
> **REGLA RESTRICTIVA PARA EL AGENTE:** Si el usuario termina su prompt con una pregunta (ej. "¿es posible?", "¿cómo se hace?"), NO debes ejecutar NINGÚN código ni flujo de trabajo. Tu única acción debe ser responder con texto para conversar y entender el requerimiento. NO ejecutes nada proactivamente a menos que el usuario use un comando explícito (ej. `@[/nombre_workflow]`) o dé una orden directa sin formato de pregunta.
Este workflow ejecuta la suite de testing automatizada del proyecto.

1. **Ejecutar Pruebas:**
   - Si existe un script `test` en `package.json`, ejecutar: `npm run test` (o similar, habilitando el flag de cobertura si es posible, ej. `jest --coverage`).

2. **Analizar Resultados:**
   - Leer el output de la consola resultante.
   - Determinar si todos los tests han pasado exitosamente (Exit code 0) o si hay fallos.

3. **Notificar Finalización:**
   - Generar un resúmen claro de cuántos tests pasaron, cuántos fallaron, y notificar al usuario.
   - Si es invocado por otro workflow, usar el código de salida (exit code) para detener la cadena en caso de error.
