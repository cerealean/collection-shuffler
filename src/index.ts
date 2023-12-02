type RNGFunction = () => number;

export interface CollectionShufflerConfig {
    /**
     * @summary Optionally supply a function that 
     * returns a number between 0 and 1 which will be used for random number 
     * generation. If not supplied, `Math.random()` will be used.
     * @description Your supplied function can return a number or a 
     * Promise that resolves to a number. Please note that the longer 
     * it takes to generate the random number, the longer it will take 
     * to shuffle your collection.
     * @default Math.random()
     * @example ```typescript
     * import { betterRandomNumber } from 'some-package';
     * // ...
     * const config = {
     *     rng: () => betterRandomNumber()
     * };
     * ```
     * @returns A number value between 0 and 1, inclusive
     */
    rng?: RNGFunction;
}

export class CollectionShuffler {
    private static min = -1;
    private static max = 1;
    private readonly rng: RNGFunction;

    constructor(config?: CollectionShufflerConfig) {
        this.rng = config?.rng ?? Math.random;
    }

    public shuffle<T>(values: T[]): T[];
    public shuffle<T>(values: Set<T>): Set<T>;

    public shuffle(values: any): any {
        if(Array.isArray(values)) {
            return values.toSorted(this.getRandomSortValue);
        }
    }

    private getRandomSortValue = () => {
        const randomNumber = this.rng();
        
        return randomNumber <= (1/3) ? -1 
            : randomNumber >= (2/3) ? 1
            : 0;
    }

}
