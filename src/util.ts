import { useState } from "react";

export function useRender() {
    const [counter, setCounter] = useState(0);
    return () => setCounter(counter + 1);
}

export function getRandomItem<T>(arr: T[], removeFromArray = false): T {
    const index = Math.floor(arr.length * (Math.random() - 0.001));
    const item = arr[index];
    if (removeFromArray) {
        arr.splice(index, 1);
    }
    return item;
}

export function entries<T extends object>(source: T): [keyof T & string, T[keyof T]][] {
    return Object.entries(source) as any;
}

export function shuffleAndReturnArr<T>(array: T[]) : T[]{
    for (let i = array.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
    return array;
}
