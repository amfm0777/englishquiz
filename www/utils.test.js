const { shuffle } = require('./utils');

describe('utils.js', () => {

    describe('shuffle', () => {
        it('debe devolver un array con la misma longitud', () => {
            const arr = [1, 2, 3, 4, 5];
            const result = shuffle(arr);
            expect(result.length).toBe(arr.length);
        });

        it('debe contener los mismos elementos que el array original', () => {
            const arr = ['a', 'b', 'c'];
            const result = shuffle(arr);
            expect(result.sort()).toEqual(arr.sort());
        });

        it('no debe mutar el array original', () => {
            const arr = [1, 2, 3];
            const copy = [...arr];
            shuffle(arr);
            expect(arr).toEqual(copy);
        });

        it('debe cambiar el orden de los elementos (la mayoría de las veces)', () => {
            // Usamos un array largo para asegurar estadísticamente que el orden cambie
            const arr = Array.from({ length: 50 }, (_, i) => i);
            const result = shuffle(arr);
            // Es posible (pero altamente improbable) que el orden no cambie
            expect(result).not.toEqual(arr);
        });

        it('debe manejar arrays vacíos', () => {
            const arr = [];
            const result = shuffle(arr);
            expect(result).toEqual([]);
        });

        it('debe manejar arrays con un solo elemento', () => {
            const arr = [42];
            const result = shuffle(arr);
            expect(result).toEqual([42]);
        });
    });

});
