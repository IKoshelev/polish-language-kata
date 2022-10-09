import { useState } from "react";

export function useRender() {
    const [counter, setCounter] = useState(0);
    return () => setCounter(counter + 1);
}

export function getRandomItem<T>(arr: T[], removeFromArray = false): T {
    if (arr.length === 0) {
        throw new Error('no items');
    }
    let index!: number;
    while (true) {
        const rnd = Math.random();
        index = Math.floor(arr.length * rnd);
        if (index in arr) {
            break;
        }
    }
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

export function attemptGetDataByQSKey<T>(key: string): T | undefined {
    const item = window.localStorage.getItem(key);
    if (!item) { return; }
    return JSON.parse(item);
}

export function whichSideOfElementWasClicked(event: React.MouseEvent<HTMLElement, MouseEvent>): 'right' | 'left' {
    const currentTargetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.pageX - currentTargetRect.left;
    const isRightSide = eventOffsetX < currentTargetRect.width / 2;
    return isRightSide ? 'right' : 'left';
  }

  export async function scrollIntoView(elem: Element) {
    // fixes problem with mobile browser failing to scroll horizontally when no vertical scroll is needed

    elem.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    elem.scrollIntoView({
        block: "center",
        inline: "center",
      });

  }