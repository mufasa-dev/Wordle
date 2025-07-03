    import { get, writable } from 'svelte/store';
    import { getRandomWord } from './words';

    export enum EnumLetters {
        NotFound = 0,
        InAnotherPlace = 1,
        Correct = 2,
        NotLetter = 3,
        NotUsed = 4
    }

    export let word = writable("");
    export let start = writable(false);
    export let finish = writable(false);
    export let finishSuccess = writable(false);
    export let selectedIndex = writable(0);
    export let actualAtempt = writable(0);
    export let attempts = writable<string[]>([
        "_____",
        "_____",
        "_____",
        "_____",
        "_____",
        "_____"
    ]);

    export function  startGame() {
        const secret = getRandomWord();
        word.set(secret);
        console.log('palavra', word)
        attempts.set([
        "_____",
        "_____",
        "_____",
        "_____",
        "_____",
        "_____"
        ]);
        start.set(true);
    }

    export function selectIndex(index: number) {
        selectedIndex.set(index);
    }

    export function addLetter(letter: string): void {
        let w: string = "";
        let a: string[] = [];
        let i: number = 0;
        let f: boolean = false;
        let selIndex: number = 0;

        word.subscribe(val => w = val)();
        attempts.subscribe(val => a = [...val])();
        actualAtempt.subscribe(val => i = val)();
        finish.subscribe(val => f = val)();
        selectedIndex.subscribe(sel => selIndex = sel)();

        if (f) return;
        if (letter == "Enter") {
            nextAttempt();
            return;
        }
        if (letter == "Del") letter = "_";

        if (selIndex < 0 || selIndex >= w.length) return;

        a[i] = a[i].slice(0, selIndex) + letter + a[i].slice(selIndex + 1);
        attempts.set(a);

        if (selIndex < a[i].length - 1) {
            selectedIndex.update(n => n + 1);
        }
    }
    
    export function nextAttempt() {
        let a: string[] = [];
        let i: number = 0;
        let w: string = "";

        attempts.subscribe(val => a = [...val])();
        actualAtempt.subscribe(val => i = val)();
        word.subscribe(val => w = val)();

        if (a[i].includes("_")) return;

        if (a[i].toUpperCase() === w.toUpperCase()) {
            finish.set(true);
            finishSuccess.set(true);
            return;
        }

        if (i >= a.length - 1) {
            finish.set(true);
            finishSuccess.set(false);
            return;
        }

        selectedIndex.set(0);
        actualAtempt.update(n => n + 1);
    }

    export function restartGame() {
        finish.set(false);
        word.set("");
        selectedIndex.set(0);
        actualAtempt.set(0);
        start.set(false);
        finishSuccess.set(false);
    }

    export function validateLetter(letter: string, index: number) {
        let w: string = "";

        word.subscribe(val => w = val)();

        if (letter == w[index].toUpperCase()) {
            return EnumLetters.Correct;
        } else if (w.toUpperCase().includes(letter)) {
            return EnumLetters.InAnotherPlace;
        } else {
            return EnumLetters.NotFound
        }
    }

    export function validateKey(letter: string): number {
        letter = letter.toUpperCase();

        if (letter === "ENTER" || letter === "DEL") {
            return EnumLetters.NotLetter;
        }

        const currentWord = get(word).toUpperCase();
        const allAttempts = get(attempts).map(a => a.toUpperCase());

        const letterWasUsed = allAttempts.some(attempt => attempt.includes(letter));
        if (!letterWasUsed) {
            return EnumLetters.NotUsed;
        }

        const hasCorrectPosition = allAttempts.some(attempt =>
            attempt.split('').some((char, i) =>
                char === letter && currentWord[i] === char
            )
        );
        if (hasCorrectPosition) return EnumLetters.Correct;

        if (currentWord.includes(letter)) return EnumLetters.InAnotherPlace;

        return EnumLetters.NotFound;
    }