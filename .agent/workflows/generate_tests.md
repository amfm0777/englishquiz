---
description: Generar tests unitarios iterativamente para el código
---
> **REGLA RESTRICTIVA PARA EL AGENTE:** Si el usuario termina su prompt con una pregunta (ej. "¿es posible?", "¿cómo se hace?"), NO debes ejecutar NINGÚN código ni flujo de trabajo. Tu única acción debe ser responder con texto para conversar y entender el requerimiento. NO ejecutes nada proactivamente a menos que el usuario use un comando explícito (ej. `@[/nombre_workflow]`) o dé una orden directa sin formato de pregunta.
Este workflow tiene como objetivo crear o actualizar una suite de pruebas para el proyecto. Dado que el proyecto usa Vanilla JS sin framework de tests pre-configurado, el agente deberá:

1. **Revisar Dependencias de Testing:** 
   - Verificar en `package.json` si existe un framework como `jest`. Si no existe, instalarlo (`npm i -D jest`).
   - Ajustar el script `test` en `package.json` para ejecutar `jest`.

2. **Refactorizar para Testabilidad (Si es necesario):**
   - Si la lógica de negocio (ej. `shuffle`, manipulación de arrays) en `www/app.js` está acoplada al entorno del navegador (`window`/`document`), el agente deberá evaluar y proponer extraer funciones puras a un archivo separado (ej. `www/utils.js`) y configurar módulos (o usar exportaciones condicionales estilo Node).

3. **Escribir / Actualizar Tests:**
   - Crear o modificar archivos bajo una carpeta de pruebas (ej. `www/tests/` o ficheros `*.test.js`).
   - Escribir tests unitarios que valoren positivamente el comportamiento y manejen adecuadamente los casos límite (edge cases).

4. **Notificar Finalización:**
   - Informar al usuario sobre los tests generados y las dependencias (si aplica) instaladas.
