// =============================================
// 📖 DICCIONARIO INGLÉS - ESPAÑOL
// =============================================
// Para añadir palabras nuevas, simplemente añade
// una nueva línea con el formato:
//   { id: NÚMERO, en: "palabra inglés", es: "traducción español", ph: "/fonética/" },
//
// Para eliminar palabras, borra la línea correspondiente.
// ¡No necesitas cambiar nada más en la app!
// =============================================

const DICTIONARY = [
    { id: 1, en: "chortled", es: "rio entre dientes", ph: "/ˈtʃɔːr.təld/" },
    { id: 2, en: "pecked", es: "dio un beso rápido / picoteó", ph: "/pɛkt/" },
    { id: 3, en: "briefcase", es: "maletín", ph: "/ˈbriːf.keɪs/" },
    { id: 4, en: "you'd", es: "tú harías / habías", ph: "/juːd/" },
    { id: 5, en: "involved", es: "involucrado", ph: "/ɪnˈvɒlvd/" },
    { id: 6, en: "expect", es: "esperar / suponer", ph: "/ɪkˈspɛkt/" },
    { id: 7, en: "nonsense", es: "tonterías", ph: "/ˈnɒn.səns/" },
    { id: 8, en: "drills", es: "taladros / simulacros", ph: "/drɪlz/" },
    { id: 9, en: "beefy", es: "corpulento / fornido", ph: "/ˈbiː.fi/" },
    { id: 10, en: "neck", es: "cuello", ph: "/nɛk/" },
    { id: 11, en: "although", es: "aunque", ph: "/ɔːlˈðoʊ/" },
    { id: 12, en: "amount", es: "cantidad", ph: "/əˈmaʊnt/" },
    { id: 13, en: "useful", es: "útil", ph: "/ˈjuːs.fəl/" },
    { id: 14, en: "spent", es: "gastó / pasó (tiempo)", ph: "/spɛnt/" },
    { id: 15, en: "craning", es: "estirando el cuello", ph: "/ˈkreɪ.nɪŋ/" },
    { id: 16, en: "fences", es: "vallas / cercas", ph: "/ˈfɛn.sɪz/" },
    { id: 17, en: "finer", es: "más fino / mejor", ph: "/ˈfaɪ.nər/" },
    { id: 18, en: "greatest", es: "el más grande", ph: "/ˈɡreɪ.tɪst/" },
    { id: 19, en: "fear", es: "miedo / temor", ph: "/fɪər/" },
    { id: 20, en: "discover", es: "descubrir", ph: "/dɪˈskʌv.ər/" },
    { id: 21, en: "tantrum", es: "rabieta / berrinche", ph: "/ˈtæn.trəm/" },
    { id: 22, en: "corner", es: "esquina / rincón", ph: "/ˈkɔːr.nər/" },
    { id: 23, en: "tyke", es: "niño pequeño / pilluelo", ph: "/taɪk/" },
    { id: 24, en: "bear", es: "soportar / aguantar", ph: "/bɛər/" },
    { id: 25, en: "several", es: "varios", ph: "/ˈsɛv.rəl/" },
    { id: 26, en: "fact", es: "hecho / realidad", ph: "/fækt/" },
    { id: 27, en: "shuddered", es: "se estremeció", ph: "/ˈʃʌd.ərd/" },
    { id: 28, en: "arrived", es: "llegó", ph: "/əˈraɪvd/" },
    { id: 29, en: "dull", es: "aburrido / apagado", ph: "/dʌl/" },
    { id: 30, en: "cloudy", es: "nublado", ph: "/ˈklaʊ.di/" },
    { id: 31, en: "suggest", es: "sugerir", ph: "/səˈdʒɛst/" },
    { id: 32, en: "country", es: "país / campo", ph: "/ˈkʌn.tri/" },
    { id: 33, en: "hummed", es: "tarareó / zumbó", ph: "/hʌmd/" },
    { id: 34, en: "most", es: "la mayoría", ph: "/moʊst/" },
    { id: 35, en: "tie", es: "corbata / atar", ph: "/taɪ/" },
    { id: 36, en: "gossiped", es: "chismeó / cotilleó", ph: "/ˈɡɒs.ɪpt/" },
    { id: 37, en: "wrestled", es: "luchó / forcejeó", ph: "/ˈrɛs.əld/" },
    { id: 38, en: "none", es: "ninguno / nada", ph: "/nʌn/" },
    { id: 39, en: "tawny", es: "leonado / castaño", ph: "/ˈtɔː.ni/" },
    { id: 40, en: "flutter", es: "revolotear / aleteo", ph: "/ˈflʌt.ər/" },
    { id: 41, en: "standing", es: "de pie / parado", ph: "/ˈstæn.dɪŋ/" },
    { id: 42, en: "tabby", es: "gato atigrado", ph: "/ˈtæb.i/" },
    { id: 43, en: "jerked", es: "dio un tirón brusco", ph: "/dʒɜːrkt/" },
];
