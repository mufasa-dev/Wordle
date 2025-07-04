import { beforeEach, describe, expect, test } from 'vitest';
import {
  EnumLetters,
  word,
  start,
  finish,
  finishSuccess,
  selectedIndex,
  actualAtempt,
  attempts,
  startGame,
  selectIndex,
  addLetter,
  nextAttempt,
  restartGame,
  validateLetter,
  validateKey,
  moveCursorLeft
} from '../src/game/gameManager'

import { get } from 'svelte/store'

describe('Wordle Game Logic', () => {
  beforeEach(() => {
    restartGame();
    word.set("CANTO");
    attempts.set(["_____", "_____", "_____", "_____", "_____", "_____"]);
  });

  test('startGame initializes game state', () => {
    startGame();
    expect(get(start)).toBe(true);
    expect(get(word).length).toBe(5);
    expect(get(attempts)).toHaveLength(6);
  });

  test('addLetter should insert letter at selectedIndex', () => {
    selectIndex(0);
    addLetter("C");
    expect(get(attempts)[0][0]).toBe("C");
  });

  test('addLetter should delete letter with "Del"', () => {
    selectIndex(0);
    addLetter("C");
    moveCursorLeft();
    addLetter("Del");
    expect(get(attempts)[0][0]).toBe("_");
  });

  test('addLetter should move to next attempt on "Enter"', () => {
    attempts.set(["CANTO", "_____", "_____", "_____", "_____", "_____"]);
    addLetter("Enter");
    expect(get(finish)).toBe(true);
    expect(get(finishSuccess)).toBe(true);
  });

  test('nextAttempt should increment attempt and reset selectedIndex', () => {
    attempts.set(["CASAS", "_____", "_____", "_____", "_____", "_____"]);
    nextAttempt();
    expect(get(actualAtempt)).toBe(1);
    expect(get(selectedIndex)).toBe(0);
  });

  test('restartGame resets game state', () => {
    restartGame();
    expect(get(start)).toBe(false);
    expect(get(finish)).toBe(false);
    expect(get(word)).toBe("");
    expect(get(selectedIndex)).toBe(0);
    expect(get(actualAtempt)).toBe(0);
  });

  test('validateLetter returns Correct for matching letter in position', () => {
    word.set("CANTO");
    expect(validateLetter("C", 0)).toBe(EnumLetters.Correct);
  });

  test('validateLetter returns InAnotherPlace for correct letter wrong position', () => {
    word.set("CANTO");
    expect(validateLetter("T", 1)).toBe(EnumLetters.InAnotherPlace);
  });

  test('validateLetter returns NotFound for wrong letter', () => {
    word.set("CANTO");
    expect(validateLetter("Z", 2)).toBe(EnumLetters.NotFound);
  });

  test('validateKey returns NotUsed if letter hasn\'t been used yet', () => {
    expect(validateKey("A")).toBe(EnumLetters.NotUsed);
  });

  test('validateKey returns Correct if used in correct place before', () => {
    attempts.set(["CANTO", "_____", "_____", "_____", "_____", "_____"]);
    actualAtempt.set(1);
    expect(validateKey("C")).toBe(EnumLetters.Correct);
  });

  test('validateKey returns InAnotherPlace if used but in wrong place', () => {
    attempts.set(["ATLAS", "_____", "_____", "_____", "_____", "_____"]);
    actualAtempt.set(1);
    expect(validateKey("T")).toBe(EnumLetters.InAnotherPlace);
  });

  test('validateKey returns NotFound if used but not in word', () => {
    attempts.set(["ZZZZZ", "_____", "_____", "_____", "_____", "_____"]);
    actualAtempt.set(1);
    expect(validateKey("Z")).toBe(EnumLetters.NotFound);
  });
});
