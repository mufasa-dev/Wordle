export const wordsPt: string[] = [
  "verde",
  "festa",
  "mundo",
  "sorte",
  "tempo",
  "risos",
  "falar",
  "cores",
  "livro",
  "folha",
  "nuvem",
  "vento",
  "porta",
  "grito",
  "saber"
];

export const wordsEn: string[] = [
  "party",
  "heavy",
  "metal",
  "flute",
  "timer",
  "laugh",
  "yellow",
  "sword",
  "break",
  "three",
  "cloud",
  "final",
  "panic",
  "movie",
  "mouse"
];

export function getRandomWord(lang: string = "pt"): string {
  let words: string[] = [];
  if (lang == "en") {
    words = wordsEn;
  } else {
    words = wordsPt;
  }
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}
