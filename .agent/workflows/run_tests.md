---
description: Ejecutar la suite de tests y verificar cobertura
---

Este workflow ejecuta la suite de testing automatizada del proyecto.

1. **Ejecutar Pruebas:**
   - Si existe un script `test` en `package.json`, ejecutar: `npm run test` (o similar, habilitando el flag de cobertura si es posible, ej. `jest --coverage`).

2. **Analizar Resultados:**
   - Leer el output de la consola resultante.
   - Determinar si todos los tests han pasado exitosamente (Exit code 0) o si hay fallos.

3. **Notificar Finalización:**
   - Generar un resúmen claro de cuántos tests pasaron, cuántos fallaron, y notificar al usuario.
   - Si es invocado por otro workflow, usar el código de salida (exit code) para detener la cadena en caso de error.
