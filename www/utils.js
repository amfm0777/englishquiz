// ============ UTILS ============

/**
 * Mezcla (shuffle) un array in-place usando el algoritmo de Fisher-Yates
 * @param {Array} arr - El array a mezclar
 * @returns {Array} Un nuevo array con los elementos mezclados
 */
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Exportar para entorno Node (Jest), ignorarlo en el navegador (Vanilla JS)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        shuffle
    };
}
