import { current } from "immer";
import { CaseName } from "../CaseUsage/CasesUsageData";
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

const zaimkiWithDeclensionSource = {
  [`Mianownik, Wolacz`]: formsDeclensionDict(
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
  [`Dopełniacz`]: formsDeclensionDict(
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
  [`Celownik`]: formsDeclensionDict(
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
  [`Biernik`]: formsDeclensionDict(
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
  [`Narzędnik`]: formsDeclensionDict(
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
  [`Miejscownik`]: formsDeclensionDict(
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
      cards: entries(caseData.data).map(([form, answer]) =>
        mapToCard(form, answer, caseData.question, caseData.template)
      ),
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
      textWhenClosed: template.replace("{word}", `(${form})`),
      textWhenOpened: template.replace(
        "{word}",
        `(${question}) \r\n ${answer}`
      ),
    } as Card;
  }
}

export const formsOdmiana = [
  "męski",
  "żeński",
  "nijaki",
  "męskoosobowy",
  "męski nieosobowy",
] as const;

export type FormsOdmiana = typeof formsOdmiana[number];

function formsOdmianaDict<T>(
  question: string,
  word: string,
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
    word,
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

const zaimkiWithOdmianaSource = {
  "mój, twój, swój": {
    [`Mianownik, Wolacz`]: formsOdmianaDict(
      `Kto?`,
      "mój, twój, swój",
      `To {word}`, 
      "mój, twój, swój",
      "moja, twoja, swoja",
      "moje, twoje, swoje",
      "moi, twoi, swoi",
      "moje, twoje, swoje"
    ),
    [`Dopełniacz`]: formsOdmianaDict(
      `Kogo?`,
      "mój, twój, swój",
      `Szuka {word}`,
      "mojego, twojego, swojego",
      "mojej, twojej, swojej",
      "mojego, twojego, swojego",
      "moich, twoich, swoich",
      "moich, twoich, swoich"
    ),
    [`Celownik`]: formsOdmianaDict(
      `Komu?`,
      "mój, twój, swój",
      `Daje {word}`,
      "mojemu, twojemu, swojemu",
      "mojej, twojej, swojej",
      "mojemu, twojemu, swojemu",
      "moim, twoim, swoim",
      "moim, twoim, swoim"
    ),
    [`Biernik`]: formsOdmianaDict(
      `Kogo?`,
      "mój, twój, swój",
      `Zna {word}`,
      "mojego, twojego, swojego",
      "moją, twoją, swoją",
      "moje, twoje, swoje",
      "moich, twoich, swoich",
      "moje, twoje, swoje"
    ),
    [`Narzędnik`]: formsOdmianaDict(
      `Kim?`,
      "mój, twój, swój",
      `Interesue się {word}`,
      "moim, twoim, swoim",
      "moją, twoją, swoją",
      "moim, twoim, swoim",
      "moimi, twoimi, swoimi",
      "moimi, twoimi, swoimi"
    ),
    [`Miejscownik`]: formsOdmianaDict(
      `Kim?`,
      "mój, twój, swój",
      `Myśle o {word}`,
      "moim, twoim, swoim",
      "mojej, twojej, swojej",
      "moim, twoim, swoim",
      "moich, twoich, swoich",
      "moich, twoich, swoich"
    ),
  },
  "nasz, wasz": {
    [`Mianownik, Wolacz`]: formsOdmianaDict(
      `Kto?`,
      "nasz, wasz",
      `To {word}`,
      "nasz, wasz",
      "nasza, wasza",
      "nasze, wasze",
      "nasi, wasi",
      "nasze, wasze"
    ),
    [`Dopełniacz`]: formsOdmianaDict(
      `Kogo?`,
      "nasz, wasz",
      `Szuka {word}`,
      "naszego, waszego",
      "naszej, waszej",
      "naszego, waszego",
      "naszych, waszych",
      "naszych, waszych"
    ),
    [`Celownik`]: formsOdmianaDict(
      `Komu?`,
      "nasz, wasz",
      `Daje {word}`,
      "naszemu, waszemu",
      "naszej, waszej",
      "naszemu, waszemu",
      "naszym, waszym",
      "naszym, waszym"
    ),
    [`Biernik`]: formsOdmianaDict(
      `Kogo?`,
      "nasz, wasz",
      `Zna {word}`,
      "naszego, waszego",
      "naszą, waszą",
      "nasze, wasze",
      "naszych, waszych",
      "nasze, wasze"
    ),
    [`Narzędnik`]: formsOdmianaDict(
      `Kim?`,
      "nasz, wasz",
      `Interesue się {word}`,
      "naszym, waszym",
      "naszą, waszą",
      "naszym, waszym",
      "naszymi, waszymi",
      "naszymi, waszymi"
    ),
    [`Miejscownik`]: formsOdmianaDict(
      `Kim?`,
      "nasz, wasz",
      `Myśle o {word}`,
      "naszym, waszym",
      "naszej, waszej",
      "naszym, waszym",
      "naszych, waszych",
      ""
    ),
  },
  "czyj, niczyj": {
    [`Mianownik, Wolacz`]: formsOdmianaDict(
      `Kto?`,
      "czyj, niczyj",
      `To {word}`,
      "czyj, niczyj",
      "czyja, niczyja",
      "czyje, niczyje",
      "czyi, niczyi",
      "czyje, niczyje"
    ),
    [`Dopełniacz`]: formsOdmianaDict(
      `Kogo?`,
      "czyj, niczyj",
      `Szuka {word}`,
      "czyjego, niczyjego",
      "czyjej, niczyjej",
      "czyjego, niczyjego",
      "czyich, niczyich",
      "czyich, niczyich"
    ),
    [`Celownik`]: formsOdmianaDict(
      `Komu?`,
      "czyj, niczyj",
      `Daje {word}`,
      "czyjemu, niczyjemu",
      "czyjej, niczyjej",
      "czyjemu, niczyjemu",
      "czyim, niczyim",
      "czyim, niczyim"
    ),
    [`Biernik`]: formsOdmianaDict(
      `Kogo?`,
      "czyj, niczyj",
      `Zna {word}`,
      "czyjego, niczyjego",
      "czyją, niczyją",
      "czyje, niczyje",
      "czyich, niczyich",
      "czyje, niczyje"
    ),
    [`Narzędnik`]: formsOdmianaDict(
      `Kim?`,
      "czyj, niczyj",
      `Interesue się {word}`,
      "czyim, niczyim",
      "czyją, niczyją",
      "czyim, niczyim",
      "czyimi, niczyimi",
      "czyimi, niczyimi"
    ),
    [`Miejscownik`]: formsOdmianaDict(
      `Kim?`,
      "czyj, niczyj",
      `Myśle o {word}`,
      "czyim, niczyim",
      "czyjej, niczyjej",
      "czyim, niczyim",
      "czyich, niczyich",
      "czyich, niczyich"
    ),
  },
  ten: {
    [`Mianownik, Wolacz`]: formsOdmianaDict(
      `Kto?`,
      "ten",
      `To {word}`,
      "ten",
      "ta",
      "to",
      "ci",
      "te"
    ),
    [`Dopełniacz`]: formsOdmianaDict(
      `Kogo?`,
      "ten",
      `Szuka {word}`,
      "tego",
      "tej",
      "tego",
      "tych",
      "tych"
    ),
    [`Celownik`]: formsOdmianaDict(
      `Komu?`,
      "ten",
      `Daje {word}`,
      "temu",
      "tej",
      "temu",
      "tym",
      "tym"
    ),
    [`Biernik`]: formsOdmianaDict(
      `Kogo?`,
      "ten",
      `Zna {word}`,
      "tego",
      "tę",
      "to",
      "tych",
      "te"
    ),
    [`Narzędnik`]: formsOdmianaDict(
      `Kim?`,
      "ten",
      `Interesue się {word}`,
      "tym",
      "tą",
      "tym",
      "tymi",
      "tymi"
    ),
    [`Miejscownik`]: formsOdmianaDict(
      `Kim?`,
      "ten",
      `Myśle o {word}`,
      "tym",
      "tej",
      "tym",
      "tych",
      "tych"
    ),
  },
  tamten: {
    [`Mianownik, Wolacz`]: formsOdmianaDict(
      `Kto?`,
      "tamten",
      `To {word}`,
      "tamten",
      "tamta",
      "tamto",
      "tamci",
      "tamte"
    ),
    [`Dopełniacz`]: formsOdmianaDict(
      `Kogo?`,
      "tamten",
      `Szuka {word}`,
      "tamtego",
      "tamtej",
      "tamtego",
      "tamtych",
      "tamtych"
    ),
    [`Celownik`]: formsOdmianaDict(
      `Komu?`,
      "tamten",
      `Daje {word}`,
      "tamtemu",
      "tamtej",
      "tamtemu",
      "tamtym",
      "tamtym"
    ),
    [`Biernik`]: formsOdmianaDict(
      `Kogo?`,
      "tamten",
      `Zna {word}`,
      "tamtego",
      "tamtą",
      "tamto",
      "tamtych",
      "tamte"
    ),
    [`Narzędnik`]: formsOdmianaDict(
      `Kim?`,
      "tamten",
      `Interesue się {word}`,
      "tamtym",
      "tamtą",
      "tamtym",
      "tamtymi",
      "tamtymi"
    ),
    [`Miejscownik`]: formsOdmianaDict(
      `Kim?`,
      "tamten",
      `Myśle o {word}`,
      "tamtym",
      "tamtej",
      "tamtym",
      "tamtych",
      "tamtych"
    ),
  },
  ow: {
    [`Mianownik, Wolacz`]: formsOdmianaDict(
      `Kto?`,
      "ow",
      `To {word}`,
      "ów",
      "owa",
      "owo",
      "owi",
      "owe"
    ),
    [`Dopełniacz`]: formsOdmianaDict(
      `Kogo?`,
      "ow",
      `Szuka {word}`,
      "owego",
      "owej",
      "owego",
      "owych",
      "owych"
    ),
    [`Celownik`]: formsOdmianaDict(
      `Komu?`,
      "ow",
      `Daje {word}`,
      "owemu",
      "owej",
      "owemu",
      "owym",
      "owym"
    ),
    [`Biernik`]: formsOdmianaDict(
      `Kogo?`,
      "ow",
      `Zna {word}`,
      "owego",
      "ową",
      "owo",
      "owych",
      "owe"
    ),
    [`Narzędnik`]: formsOdmianaDict(
      `Kim?`,
      "ow",
      `Interesue się {word}`,
      "owym",
      "ową",
      "owym",
      "owymi",
      "owymi"
    ),
    [`Miejscownik`]: formsOdmianaDict(
      `Kim?`,
      "ow",
      `Myśle o {word}`,
      "owym",
      "owej",
      "owym",
      "owych",
      "owych"
    ),
  },
  taki: {
    [`Mianownik, Wolacz`]: formsOdmianaDict(
      `Kto?`,
      "taki",
      `To {word}`,
      "taki",
      "taka",
      "takie",
      "tacy",
      "takie"
    ),
    [`Dopełniacz`]: formsOdmianaDict(
      `Kogo?`,
      "taki",
      `Szuka {word}`,
      "takiego",
      "takiej",
      "takiego",
      "takich",
      "takich"
    ),
    [`Celownik`]: formsOdmianaDict(
      `Komu?`,
      "taki",
      `Daje {word}`,
      "takiemu",
      "takiej",
      "takiemu",
      "takim",
      "takim"
    ),
    [`Biernik`]: formsOdmianaDict(
      `Kogo?`,
      "taki",
      `Zna {word}`,
      "takiego",
      "taką",
      "takie",
      "takich",
      "takie"
    ),
    [`Narzędnik`]: formsOdmianaDict(
      `Kim?`,
      "taki",
      `Interesue się {word}`,
      "takim",
      "taką",
      "takim",
      "takimi",
      "takimi"
    ),
    [`Miejscownik`]: formsOdmianaDict(
      `Kim?`,
      "taki",
      `Myśle o {word}`,
      "takim",
      "takiej",
      "takim",
      "takich",
      "takich"
    ),
  },
  który: {
    [`Mianownik, Wolacz`]: formsOdmianaDict(
      `Kto?`,
      "który",
      `To {word}`,
      "który",
      "która",
      "które",
      "którzy",
      "które"
    ),
    [`Dopełniacz`]: formsOdmianaDict(
      `Kogo?`,
      "który",
      `Szuka {word}`,
      "którego",
      "której",
      "którego",
      "których",
      "których"
    ),
    [`Celownik`]: formsOdmianaDict(
      `Komu?`,
      "który",
      `Daje {word}`,
      "któremu",
      "której",
      "któremu",
      "którym",
      "którym"
    ),
    [`Biernik`]: formsOdmianaDict(
      `Kogo?`,
      "który",
      `Zna {word}`,
      "którego",
      "którą",
      "które",
      "których",
      "które"
    ),
    [`Narzędnik`]: formsOdmianaDict(
      `Kim?`,
      "który",
      `Interesue się {word}`,
      "którym",
      "którą",
      "którym",
      "którymi",
      "którymi"
    ),
    [`Miejscownik`]: formsOdmianaDict(
      `Kim?`,
      "który",
      `Myśle o {word}`,
      "którym",
      "której",
      "którym",
      "których",
      "których"
    ),
  },
  jaki: {
    [`Mianownik, Wolacz`]: formsOdmianaDict(
      `Kto?`,
      "jaki",
      `To {word}`,
      "jaki",
      "jaka",
      "jakie",
      "jacy",
      "jakie"
    ),
    [`Dopełniacz`]: formsOdmianaDict(
      `Kogo?`,
      "jaki",
      `Szuka {word}`,
      "jakiego",
      "jakiej",
      "jakiego",
      "jakich",
      "jakich"
    ),
    [`Celownik`]: formsOdmianaDict(
      `Komu?`,
      "jaki",
      `Daje {word}`,
      "jakiemu",
      "jakiej",
      "jakiemu",
      "jakim",
      "jakim"
    ),
    [`Biernik`]: formsOdmianaDict(
      `Kogo?`,
      "jaki",
      `Zna {word}`,
      "jakiego",
      "jaką",
      "jakie",
      "jakich",
      "jakie"
    ),
    [`Narzędnik`]: formsOdmianaDict(
      `Kim?`,
      "jaki",
      `Interesue się {word}`,
      "jakim",
      "jaką",
      "jakim",
      "jakimi",
      "jakimi"
    ),
    [`Miejscownik`]: formsOdmianaDict(
      `Kim?`,
      "jaki",
      `Myśle o {word}`,
      "jakim",
      "jakiej",
      "jakim",
      "jakich",
      "jakich"
    ),
  },
  kazdy: {
    [`Mianownik, Wolacz`]: formsOdmianaDict(
      `Kto?`,
      "kazdy",
      `To {word}`,
      "każdy",
      "każda",
      "każde",
      "wszyscy",
      "wszystkie"
    ),
    [`Dopełniacz`]: formsOdmianaDict(
      `Kogo?`,
      "kazdy",
      `Szuka {word}`,
      "każdego",
      "każdej",
      "każdego",
      "wszystkich",
      "wszystkich"
    ),
    [`Celownik`]: formsOdmianaDict(
      `Komu?`,
      "kazdy",
      `Daje {word}`,
      "każdemu",
      "każdej",
      "każdemu",
      "wszystkim",
      "wszystkim"
    ),
    [`Biernik`]: formsOdmianaDict(
      `Kogo?`,
      "kazdy",
      `Zna {word}`,
      "każdego",
      "każdą",
      "każde",
      "wszystkich",
      "wszystkie"
    ),
    [`Narzędnik`]: formsOdmianaDict(
      `Kim?`,
      "kazdy",
      `Interesue się {word}`,
      "każdym",
      "każdą",
      "każdym",
      "wszystkimi",
      "wszystkimi"
    ),
    [`Miejscownik`]: formsOdmianaDict(
      `Kim?`,
      "kazdy",
      `Myśle o {word}`,
      "każdym",
      "każdej",
      "każdym",
      "wszystkich",
      "wszystkich"
    ),
  },
  żaden: {
    [`Mianownik, Wolacz`]: formsOdmianaDict(
      `Kto?`,
      "żaden",
      `To {word}`,
      "żaden",
      "żadna",
      "żadne",
      "żadni",
      "żadne"
    ),
    [`Dopełniacz`]: formsOdmianaDict(
      `Kogo?`,
      "żaden",
      `Szuka {word}`,
      "żadnego",
      "żadnej",
      "żadnego",
      "żadnych",
      "żadnych"
    ),
    [`Celownik`]: formsOdmianaDict(
      `Komu?`,
      "żaden",
      `Daje {word}`,
      "żadnemu",
      "żadnej",
      "żadnemu",
      "żadnym",
      "żadnych"
    ),
    [`Biernik`]: formsOdmianaDict(
      `Kogo?`,
      "żaden",
      `Zna {word}`,
      "żadnego",
      "żadną",
      "żadne",
      "żadnych",
      "żadne"
    ),
    [`Narzędnik`]: formsOdmianaDict(
      `Kim?`,
      "żaden",
      `Interesue się {word}`,
      "żadnym",
      "żadną",
      "żadnym",
      "żadnymi",
      "żadnymi"
    ),
    [`Miejscownik`]: formsOdmianaDict(
      `Kim?`,
      "żaden",
      `Myśle o {word}`,
      "żadnym",
      "żadnej",
      "żadnym",
      "żadnych",
      "żadnych"
    ),
  },
} as const;


export function prepareZaimkiWithOdmianaCards(
  shuffle = false
): Record<string, { caseName: string, cards: Card[] }[]> {
  const data = entries(zaimkiWithOdmianaSource).reduce((prev, [word, data]) => {
    prev[word] = entries(data).map(
      ([caseName, caseData]) => ({
        caseName,
        cards: entries(caseData.data).map(([form, answer]) =>
          mapToCard(form, answer, caseData.word, caseData.question, caseData.template)
        ),
      })
    );
    return prev;
  },
  {} as Record<string, { caseName: string, cards: Card[] }[]>);
  
  if (shuffle) {
    for (const arr of Object.values(data)){
      shuffleAndReturnArr(arr);
    }
  }

  return data;

  function mapToCard(
    form: string,
    answer: string,
    word: string,
    question: string,
    template: string
  ) {
    return {
      id: Math.random(),
      isMarked: false,
      isOpened: false,
      textWhenClosed: template.replace("{word}", `(${word}, ${form})`),
      textWhenOpened: template.replace(
        "{word}",
        `${answer}` //(${question}) \r\n 
      ),
    } as Card;
  }
}