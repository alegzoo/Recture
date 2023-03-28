import { ref, Ref } from 'vue';

export interface IUsableSkeletons {
    sizes: Ref<number[]>,

    generate(): void
}

export function useSkeletons(min: number, max: number, minSize: number, maxSize: number) : IUsableSkeletons {
    const sizes = ref([] as number[]);
    generate();
    
    function generate() {
        const newSizes = [] as number[];
        const count = min+Math.floor(Math.random()*(max-min));
        for (let i = 0; i < count; i++) {
            newSizes.push(minSize+Math.floor(Math.random()*(maxSize-minSize)));
        }

        sizes.value = newSizes;
    }

    return { sizes, generate };
}