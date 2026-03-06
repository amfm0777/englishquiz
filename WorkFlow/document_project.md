---
description: Generar documentación completa del proyecto (Jerarquía, Código y Tests)
---
> **REGLA RESTRICTIVA PARA EL AGENTE:** Si el usuario termina su prompt con una pregunta (ej. "¿es posible?", "¿cómo se hace?"), NO debes ejecutar NINGÚN código ni flujo de trabajo. Tu única acción debe ser responder con texto para conversar y entender el requerimiento. NO ejecutes nada proactivamente a menos que el usuario use un comando explícito (ej. `@[/nombre_workflow]`) o dé una orden directa sin formato de pregunta.
Este workflow es una instrucción exhaustiva para que el agente inspeccione, analice en profundidad y documente automáticamente todo el estado actual del proyecto, generando finalmente una salida en formato HTML estático.

1. **Documentar la Jerarquía del Proyecto:**
   - Explora las carpetas principales del proyecto entero (ignorando dependencias como `node_modules`, carpetas binarias o `.git`).
   - Mapea el árbol de directorios.
   - Detalla el propósito general de cada directorio y la labor que realiza cada fichero importante y de configuración.

2. **Documentar la API, Lógica de Negocio y Análisis Estático:**
   - Analiza en profundidad el contenido de los archivos fuente (ej. JS, Java, HTML, etc.).
   - Genera una lista exhaustiva de todos los ficheros de código.
   - Para cada fichero, documenta en detalle todas las **clases**, **funciones** y **métodos**, explicando sus responsabilidades y su rol en la aplicación.
   - **Análisis de Complejidad Algorítmica (Big O):** Calcula y detalla el orden de complejidad computacional (Tiempo y Espacio) para las funciones, métodos o algoritmos clave que encuentres.
   - **Análisis de Lógica y Flujo (Code Review):** Inspecciona el flujo de ejecución para detectar y alertar sobre posibles **bugs**, cuellos de botella, problemas de seguridad o proponer **mejoras** de refactorización y buenas prácticas.

3. **Auditar y Caracterizar los Tests:**
   - Busca todo el código y configuraciones relacionados con pruebas en el sistema (archivos de test, configuración de frameworks de test).
   - Para las pruebas existentes y su entorno, documenta:
     * **Scope**: El alcance del código cubierto por las pruebas actuales.
     * **Pre-requisitos y Post-requisitos**: Acciones de setup previas y de limpieza/teardown.
     * **Análisis de Complejidad de Testeo:** Evalúa cuán difícil es mantener y extender la suite de pruebas actual (ej. fragilidad de los mocks, acoplamiento).
     * **Caracterización de Pruebas** evaluando estrictamente estos 6 ejes:
       1. **Unitarios**: ¿Cuáles son y qué componentes aislados prueban?
       2. **Cobertura (Coverage)**: ¿Hay reportes o configuraciones de cobertura de código?
       3. **Performance**: ¿Existe alguna métrica, test de carga, estrés o de rendimiento de la app?
       4. **Memory Leak**: ¿Se está comprobando de alguna forma si hay fugas de memoria?
       5. **Usabilidad**: ¿Existen pruebas E2E (End to End) de UI/Comportamiento humano?
       6. **Tracking**: ¿Existen pruebas sobre los eventos de analítica, clics, o seguimiento?

4. **Generación Automática de Documentación HTML:**
   - Agrupa toda la información recopilada en los pasos anteriores.
   - Compila esta información construyendo un archivo HTML estructurado y navegable (`docs/index.html` o un nombre similar descriptivo).
   - El HTML generado debe incluir estilos CSS básicos embebidos para que la documentación sea legible (índices, tablas de contenido, bloques de código, etc.).

5. **Notificar Finalización:**
   - Guardar el/los archivo(s) HTML generados en la carpeta `docs/` del proyecto.
   - Llamar a la herramienta de notificación de usuario indicando que el análisis exhaustivo ha finalizado e incluir la ruta absoluta del documento HTML generado para que el usuario pueda abrirlo en su navegador.
