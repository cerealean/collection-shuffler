import { CollectionShuffler } from './index';

describe('CollectionShuffler Tests', () => {
    let collectionShuffler: CollectionShuffler;

    beforeEach(() => {
        collectionShuffler = new CollectionShuffler();
    });

    describe('shuffling an array', () => {
        test('when given an empty array should return an empty array', () => {
            const actual = collectionShuffler.shuffle([]);

            expect(Array.isArray(actual)).toBe(true);
            expect(actual.length).toBe(0);
        });

        [
            [1,2,3],
            [22,66,932,'rawr'],
            new Array(new Date().getDate()).fill(1),
            new Array(new Date().getMonth()).fill(9)
        ].forEach(testArray => {
            test(`when given an array of (${testArray.join(',')}) should return an array containing the exact same values`, () => {
                const actual = collectionShuffler.shuffle(testArray);

                console.log(testArray, actual);
                expect(actual).toEqual(expect.arrayContaining(testArray));
            });
        });
    });
});