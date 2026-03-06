---
description: Construir y preparar la aplicación Android para producción
---
> **REGLA RESTRICTIVA PARA EL AGENTE:** Si el usuario termina su prompt con una pregunta (ej. "¿es posible?", "¿cómo se hace?"), NO debes ejecutar NINGÚN código ni flujo de trabajo. Tu única acción debe ser responder con texto para conversar y entender el requerimiento. NO ejecutes nada proactivamente a menos que el usuario use un comando explícito (ej. `@[/nombre_workflow]`) o dé una orden directa sin formato de pregunta.
Este workflow automatiza la preparación, limpieza y construcción del App Bundle de la aplicación Capacitor para Android.

1. Sincronizar los cambios más recientes de la carpeta web a la plataforma Android:
// turbo
`npx cap sync android`

2. Limpiar la caché de construcción de Android para evitar errores antiguos:
// turbo
`cd android; .\gradlew clean`

3. Generar el archivo de producción final AAB (Android App Bundle):
// turbo
`cd android; .\gradlew bundleRelease`

4. Buscar y confirmar la existencia del archivo generado buscando en la ruta `android/app/build/outputs/bundle/release/`.

5. Informar al usuario que la compilación ha finalizado con éxito, indicarle la ruta exacta del archivo `.aab` resultante y recordarle que este es el archivo que debe subir a la **Google Play Console** para su distribución.
