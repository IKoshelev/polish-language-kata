import { entries, shuffleAndReturnArr } from "../util";

export type Card = {
  isOpened?: boolean;
  isMarked?: boolean;
  textWhenClosed: string;
  textWhenOpened: string;
  id: number;
};

export const formsDeclension = [
  "ja",
  "ty",
  "on",
  "ona",
  "ono",
  "my",
  "wy",
  "oni",
  "one",
] as const;

export type FormsDeclension = typeof formsDeclension[number];

function formsDeclensionDict<T>(
  question: string,
  template: `${string}{word}${string}`,
  ja: T,
  ty: T,
  on: T,
  ona: T,
  ono: T,
  my: T,
  wy: T,
  oni: T,
  one: T
) {
  return {
    question,
    template,
    data: {
      ja,
      ty,
      on,
      ona,
      ono,
      my,
      wy,
      oni,
      one,
    },
  };
}

const formsOdmiana = [
  "męski",
  "żeński",
  "nijaki",
  "męskoosobowy",
  "męski nieosobowy",
] as const;

export type FormsOdmiana = typeof formsOdmiana[number];

function formsOdmianaDict<T>(
  question: string,
  template: `${string}{word}${string}`,
  m: T,
  f: T,
  n: T,
  mo: T,
  mno: T
) {
  return {
    question,
    template,
    data: {
      męski: m,
      żeński: f,
      nijaki: n,
      męskoosobowy: mo,
      "męski nieosobowy": mno,
    },
  };
}

export const cases = [
  "Mianownik, Wolacz",
  "Dopełniacz",
  "Celownik",
  "Biernik",
  "Narzędnik",
  "Miejscownik",
] as const;

export type Cases = typeof cases[number];

const zaimkiWithDeclensionSource = {
  "Mianownik, Wolacz": formsDeclensionDict(
    `Kto?`,
    `To {word}`,
    "ja",
    "ty",
    "on",
    "ona",
    "ono",
    "my",
    "wy",
    "oni",
    "one"
  ),
  Dopełniacz: formsDeclensionDict(
    `Kogo?`,
    `Szuka {word}`,
    "mnie",
    "ciebie / cię",
    "jego / go",
    "jej",
    "jego / go",
    "nas",
    "was",
    "ich",
    "ich"
  ),
  "Dopełniacz + przyimka": formsDeclensionDict(
    `Kogo?`,
    `Jest u {word}`,
    "mnie",
    "ciebie",
    "niego",
    "niej",
    "niego",
    "nas",
    "was",
    "nich",
    "nich"
  ),
  Celownik: formsDeclensionDict(
    `Komu?`,
    `Daje {word}`,
    "mnie / mi",
    "tobie / ci",
    "jemu / mu",
    "jej",
    "jemu / mu",
    "nam",
    "wam",
    "im",
    "im"
  ),
  "Celownik + przyimka": formsDeclensionDict(
    `Komu?`,
    `Idzie ku {word}`,
    "mnie",
    "tobie",
    "niemu",
    "niej",
    "niemu",
    "nam",
    "wam",
    "nim",
    "nim"
  ),
  Biernik: formsDeclensionDict(
    `Kogo?`,
    `Zna {word}`,
    "mnie / mi",
    "ciebie / cię",
    "jego / go",
    "ją",
    "je",
    "nas",
    "was",
    "ich",
    "je"
  ),
  "Biernik + przyimka": formsDeclensionDict(
    `Kogo?`,
    `Pyta o {word}`,
    "mnie",
    "ciebie",
    "niego",
    "nią",
    "nie",
    "nas",
    "was",
    "nich",
    "nie"
  ),
  Narzędnik: formsDeclensionDict(
    `Kim?`,
    `Interesue się {word}`,
    "mną",
    "tobą",
    "nim",
    "nią",
    "nim",
    "nami",
    "wami",
    "nimi",
    "nimi"
  ),
  Miejscownik: formsDeclensionDict(
    `Kim?`,
    `Myśle o {word}`,
    "mnie",
    "tobie",
    "nim",
    "niej",
    "nim",
    "nas",
    "was",
    "nich",
    "nich"
  ),
} as const;

export function prepareZaimkiWithDeclensionCards(
  shuffle = false
): { caseName: string; cards: Card[] }[] {
  const data = entries(zaimkiWithDeclensionSource).map(
    ([caseName, caseData]) => ({
      caseName,
      cards: entries(caseData.data).map(([form, answer]) => mapToCard(form, answer, caseData.question, caseData.template)),
    })
  );

  if (shuffle) {
    shuffleAndReturnArr(data);
  }

  return data;

  function mapToCard(
    form: string,
    answer: string, 
    question: string,
    template: string
  ) {
  return {
        id: Math.random(),
        isMarked: false,
        isOpened: false,
        textWhenClosed: template.replace('{word}', `(${form})`),
        textWhenOpened:template.replace('{word}', `(${question}) \r\n ${answer}`)
      } as Card;
}
}
