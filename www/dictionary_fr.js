// =============================================
// 📖 DICCIONARIO FRANCÉS - ESPAÑOL
// =============================================
// Para añadir palabras nuevas, simplemente añade
// una nueva línea con el formato:
//   { id: NÚMERO, en: "palabra francés", es: "traducción español", ph: "/fonética/" },
// -> NOTA: La propiedad se sigue llamando "en" por compatibilidad con el código JS,
//          pero el contenido está en francés.
// =============================================

const DICTIONARY = [
    { id: 1, en: "bonjour", es: "hola / buenos días", ph: "/bɔ̃.ʒuʁ/" },
    { id: 2, en: "merci", es: "gracias", ph: "/mɛʁ.si/" },
    { id: 3, en: "oui", es: "sí", ph: "/wi/" },
    { id: 4, en: "non", es: "no", ph: "/nɔ̃/" },
    { id: 5, en: "s'il vous plaît", es: "por favor", ph: "/sil vu plɛ/" },
    { id: 6, en: "au revoir", es: "adiós", ph: "/o ʁə.vwaʁ/" },
    { id: 7, en: "pardon", es: "perdón / disculpe", ph: "/paʁ.dɔ̃/" },
    { id: 8, en: "comment ça va", es: "cómo estás", ph: "/kɔ.mɑ̃ sa va/" },
    { id: 9, en: "bien", es: "bien", ph: "/bjɛ̃/" },
    { id: 10, en: "mal", es: "mal", ph: "/mal/" },
    { id: 11, en: "chat", es: "gato", ph: "/ʃa/" },
    { id: 12, en: "chien", es: "perro", ph: "/ʃjɛ̃/" },
    { id: 13, en: "maison", es: "casa", ph: "/mɛ.zɔ̃/" },
    { id: 14, en: "voiture", es: "coche", ph: "/vwa.tyʁ/" },
    { id: 15, en: "eau", es: "agua", ph: "/o/" },
    { id: 16, en: "pain", es: "pan", ph: "/pɛ̃/" },
    { id: 17, en: "pomme", es: "manzana", ph: "/pɔm/" },
    { id: 18, en: "fromage", es: "queso", ph: "/fʁɔ.maʒ/" },
    { id: 19, en: "vin", es: "vino", ph: "/vɛ̃/" },
    { id: 20, en: "rue", es: "calle", ph: "/ʁy/" },
    { id: 21, en: "ville", es: "ciudad", ph: "/vil/" },
    { id: 22, en: "ami", es: "amigo", ph: "/a.mi/" },
    { id: 23, en: "homme", es: "hombre", ph: "/ɔm/" },
    { id: 24, en: "femme", es: "mujer", ph: "/fam/" },
    { id: 25, en: "enfant", es: "niño / niña", ph: "/ɑ̃.fɑ̃/" },
    { id: 26, en: "livre", es: "libro", ph: "/livʁ/" },
    { id: 27, en: "rouge", es: "rojo", ph: "/ʁuʒ/" },
    { id: 28, en: "bleu", es: "azul", ph: "/blø/" },
    { id: 29, en: "grand", es: "grande", ph: "/ɡʁɑ̃/" },
    { id: 30, en: "petit", es: "pequeño", ph: "/pə.ti/" },
];
