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
    `to {word}`,
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
    `{word} szuka`,
    "mnie",
    "ciebie",
    "jego",
    "jej",
    "jego",
    "nas",
    "was",
    "ich",
    "ich"
  ),
  "Dopełniacz + krótkia forma": formsDeclensionDict(
    `Kogo?`,
    `szuka {word}`,
    "mię",
    "cię",
    "go",
    "jej",
    "go",
    "nas",
    "was",
    "ich",
    "ich"
  ),
  "Dopełniacz + przyimka": formsDeclensionDict(
    `Kogo?`,
    `jest u {word}`,
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
  [`Celownik `]: formsDeclensionDict(
    `Komu?`,
    `{word} daje`,
    "mnie",
    "tobie",
    "jemu",
    "jej",
    "jemu",
    "nam",
    "wam",
    "im",
    "im"
  ),
  [`Celownik + krótkia forma`]: formsDeclensionDict(
    `Komu?`,
    `daje {word}`,
    "mi",
    "ci",
    "mu",
    "jej",
    "mu",
    "nam",
    "wam",
    "im",
    "im"
  ),
  "Celownik + przyimka": formsDeclensionDict(
    `Komu?`,
    `idzie ku {word}`,
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
    `{word} zna`,
    "mnie",
    "ciebie",
    "jego",
    "ją",
    "je",
    "nas",
    "was",
    "ich",
    "je"
  ),
  [`Biernik + krótkia forma`]: formsDeclensionDict(
    `Kogo?`,
    `zna {word}`,
    "mi",
    "cię",
    "go",
    "ją",
    "je",
    "nas",
    "was",
    "ich",
    "je"
  ),
  "Biernik + przyimka": formsDeclensionDict(
    `Kogo?`,
    `pyta o {word}`,
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
    `interesue się {word}`,
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
    `myśli o {word}`,
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

const baseOdmiana =
  <T>(base_m: T, base_f: T, base_n: T, base_mo: T, base_mno: T) =>
  (
    question: string,
    word: string,
    template: `${string}{word}${string}`,
    m: T,
    f: T,
    n: T,
    mo: T,
    mno: T
  ) => {
    return {
      question,
      template,
      word,
      base: {
        męski: base_m,
        żeński: base_f,
        nijaki: base_n,
        męskoosobowy: base_mo,
        "męski nieosobowy": base_mno,
      },
      data: {
        męski: m,
        żeński: f,
        nijaki: n,
        męskoosobowy: mo,
        "męski nieosobowy": mno,
      },
    };
  };

export const cases = [
  "Mianownik, Wolacz",
  "Dopełniacz",
  "Celownik",
  "Biernik",
  "Narzędnik",
  "Miejscownik",
] as const;

export type Cases = typeof cases[number];

const formsOdmianaKto = baseOdmiana(
  "mój, twój, swój",
  "moja, twoja, swoja",
  "moje, twoje, swoje",
  "moi, twoi, swoi",
  "moje, twoje, swoje"
);

const formsOdmianaNasz = baseOdmiana(
  "nasz, wasz",
  "nasza, wasza",
  "nasze, wasze",
  "nasi, wasi",
  "nasze, wasze"
);

const formsOdmianaCzyj = baseOdmiana(
  "czyj, niczyj",
  "czyja, niczyja",
  "czyje, niczyje",
  "czyi, niczyi",
  "czyje, niczyje"
);

const formsOdmianaTen = baseOdmiana(
  "ten",
  "ta",
  "to",
  "ci",
  "te"
);

const formsOdmianaTamten = baseOdmiana(
  "tamten",
  "tamta",
  "tamto",
  "tamci",
  "tamte"
);

const formsOdmianaOw = baseOdmiana(
  "ów",
  "owa",
  "owo",
  "owi",
  "owe"
);

const formsOdmianaTaki = baseOdmiana(
  "taki",
  "taka",
  "takie",
  "tacy",
  "takie"
);

const formsOdmianaKtory = baseOdmiana(
  "który",
  "która",
  "które",
  "którzy",
  "które"
);

const formsOdmianaJaki = baseOdmiana(
  "jaki",
  "jaka",
  "jakie",
  "jacy",
  "jakie"
);

const formsOdmianaKazdy = baseOdmiana(
  "każdy",
  "każda",
  "każde",
  "wszyscy",
  "wszystkie"
);

const formsOdmianaZaden = baseOdmiana(
  "żaden",
  "żadna",
  "żadne",
  "żadni",
  "żadne"
);

const zaimkiWithOdmianaSource = {
  "mój, twój, swój": {
    [`Mianownik, Wolacz`]: formsOdmianaKto(
      `Kto?`,
      "mój, twój, swój",
      `To {word}`,
      "mój, twój, swój",
      "moja, twoja, swoja",
      "moje, twoje, swoje",
      "moi, twoi, swoi",
      "moje, twoje, swoje"
    ),
    [`Dopełniacz`]: formsOdmianaKto(
      `Kogo?`,
      "mój, twój, swój",
      `Szuka {word}`,
      "mojego, twojego, swojego",
      "mojej, twojej, swojej",
      "mojego, twojego, swojego",
      "moich, twoich, swoich",
      "moich, twoich, swoich"
    ),
    [`Celownik`]: formsOdmianaKto(
      `Komu?`,
      "mój, twój, swój",
      `Daje {word}`,
      "mojemu, twojemu, swojemu",
      "mojej, twojej, swojej",
      "mojemu, twojemu, swojemu",
      "moim, twoim, swoim",
      "moim, twoim, swoim"
    ),
    [`Biernik`]: formsOdmianaKto(
      `Kogo?`,
      "mój, twój, swój",
      `Zna {word}`,
      "mojego, twojego, swojego",
      "moją, twoją, swoją",
      "moje, twoje, swoje",
      "moich, twoich, swoich",
      "moje, twoje, swoje"
    ),
    [`Narzędnik`]: formsOdmianaKto(
      `Kim?`,
      "mój, twój, swój",
      `Interesue się {word}`,
      "moim, twoim, swoim",
      "moją, twoją, swoją",
      "moim, twoim, swoim",
      "moimi, twoimi, swoimi",
      "moimi, twoimi, swoimi"
    ),
    [`Miejscownik`]: formsOdmianaKto(
      `Kim?`,
      "mój, twój, swój",
      `Myśli o {word}`,
      "moim, twoim, swoim",
      "mojej, twojej, swojej",
      "moim, twoim, swoim",
      "moich, twoich, swoich",
      "moich, twoich, swoich"
    ),
  },
  "nasz, wasz": {
    [`Mianownik, Wolacz`]: formsOdmianaNasz(
      `Kto?`,
      "nasz, wasz",
      `To {word}`,
      "nasz, wasz",
      "nasza, wasza",
      "nasze, wasze",
      "nasi, wasi",
      "nasze, wasze"
    ),
    [`Dopełniacz`]: formsOdmianaNasz(
      `Kogo?`,
      "nasz, wasz",
      `Szuka {word}`,
      "naszego, waszego",
      "naszej, waszej",
      "naszego, waszego",
      "naszych, waszych",
      "naszych, waszych"
    ),
    [`Celownik`]: formsOdmianaNasz(
      `Komu?`,
      "nasz, wasz",
      `Daje {word}`,
      "naszemu, waszemu",
      "naszej, waszej",
      "naszemu, waszemu",
      "naszym, waszym",
      "naszym, waszym"
    ),
    [`Biernik`]: formsOdmianaNasz(
      `Kogo?`,
      "nasz, wasz",
      `Zna {word}`,
      "naszego, waszego",
      "naszą, waszą",
      "nasze, wasze",
      "naszych, waszych",
      "nasze, wasze"
    ),
    [`Narzędnik`]: formsOdmianaNasz(
      `Kim?`,
      "nasz, wasz",
      `Interesue się {word}`,
      "naszym, waszym",
      "naszą, waszą",
      "naszym, waszym",
      "naszymi, waszymi",
      "naszymi, waszymi"
    ),
    [`Miejscownik`]: formsOdmianaNasz(
      `Kim?`,
      "nasz, wasz",
      `Myśli o {word}`,
      "naszym, waszym",
      "naszej, waszej",
      "naszym, waszym",
      "naszych, waszych",
      ""
    ),
  },
  "czyj, niczyj": {
    [`Mianownik, Wolacz`]: formsOdmianaCzyj(
      `Kto?`,
      "czyj, niczyj",
      `To {word}`,
      "czyj, niczyj",
      "czyja, niczyja",
      "czyje, niczyje",
      "czyi, niczyi",
      "czyje, niczyje"
    ),
    [`Dopełniacz`]: formsOdmianaCzyj(
      `Kogo?`,
      "czyj, niczyj",
      `Szuka {word}`,
      "czyjego, niczyjego",
      "czyjej, niczyjej",
      "czyjego, niczyjego",
      "czyich, niczyich",
      "czyich, niczyich"
    ),
    [`Celownik`]: formsOdmianaCzyj(
      `Komu?`,
      "czyj, niczyj",
      `Daje {word}`,
      "czyjemu, niczyjemu",
      "czyjej, niczyjej",
      "czyjemu, niczyjemu",
      "czyim, niczyim",
      "czyim, niczyim"
    ),
    [`Biernik`]: formsOdmianaCzyj(
      `Kogo?`,
      "czyj, niczyj",
      `Zna {word}`,
      "czyjego, niczyjego",
      "czyją, niczyją",
      "czyje, niczyje",
      "czyich, niczyich",
      "czyje, niczyje"
    ),
    [`Narzędnik`]: formsOdmianaCzyj(
      `Kim?`,
      "czyj, niczyj",
      `Interesue się {word}`,
      "czyim, niczyim",
      "czyją, niczyją",
      "czyim, niczyim",
      "czyimi, niczyimi",
      "czyimi, niczyimi"
    ),
    [`Miejscownik`]: formsOdmianaCzyj(
      `Kim?`,
      "czyj, niczyj",
      `Myśli o {word}`,
      "czyim, niczyim",
      "czyjej, niczyjej",
      "czyim, niczyim",
      "czyich, niczyich",
      "czyich, niczyich"
    ),
  },
  ten: {
    [`Mianownik, Wolacz`]: formsOdmianaTen(
      `Kto?`,
      "ten",
      `To {word}`,
      "ten",
      "ta",
      "to",
      "ci",
      "te"
    ),
    [`Dopełniacz`]: formsOdmianaTen(
      `Kogo?`,
      "ten",
      `Szuka {word}`,
      "tego",
      "tej",
      "tego",
      "tych",
      "tych"
    ),
    [`Celownik`]: formsOdmianaTen(
      `Komu?`,
      "ten",
      `Daje {word}`,
      "temu",
      "tej",
      "temu",
      "tym",
      "tym"
    ),
    [`Biernik`]: formsOdmianaTen(
      `Kogo?`,
      "ten",
      `Zna {word}`,
      "tego",
      "tę",
      "to",
      "tych",
      "te"
    ),
    [`Narzędnik`]: formsOdmianaTen(
      `Kim?`,
      "ten",
      `Interesue się {word}`,
      "tym",
      "tą",
      "tym",
      "tymi",
      "tymi"
    ),
    [`Miejscownik`]: formsOdmianaTen(
      `Kim?`,
      "ten",
      `Myśli o {word}`,
      "tym",
      "tej",
      "tym",
      "tych",
      "tych"
    ),
  },
  tamten: {
    [`Mianownik, Wolacz`]: formsOdmianaTamten(
      `Kto?`,
      "tamten",
      `To {word}`,
      "tamten",
      "tamta",
      "tamto",
      "tamci",
      "tamte"
    ),
    [`Dopełniacz`]: formsOdmianaTamten(
      `Kogo?`,
      "tamten",
      `Szuka {word}`,
      "tamtego",
      "tamtej",
      "tamtego",
      "tamtych",
      "tamtych"
    ),
    [`Celownik`]: formsOdmianaTamten(
      `Komu?`,
      "tamten",
      `Daje {word}`,
      "tamtemu",
      "tamtej",
      "tamtemu",
      "tamtym",
      "tamtym"
    ),
    [`Biernik`]: formsOdmianaTamten(
      `Kogo?`,
      "tamten",
      `Zna {word}`,
      "tamtego",
      "tamtą",
      "tamto",
      "tamtych",
      "tamte"
    ),
    [`Narzędnik`]: formsOdmianaTamten(
      `Kim?`,
      "tamten",
      `Interesue się {word}`,
      "tamtym",
      "tamtą",
      "tamtym",
      "tamtymi",
      "tamtymi"
    ),
    [`Miejscownik`]: formsOdmianaTamten(
      `Kim?`,
      "tamten",
      `Myśli o {word}`,
      "tamtym",
      "tamtej",
      "tamtym",
      "tamtych",
      "tamtych"
    ),
  },
  ow: {
    [`Mianownik, Wolacz`]: formsOdmianaOw(
      `Kto?`,
      "ow",
      `To {word}`,
      "ów",
      "owa",
      "owo",
      "owi",
      "owe"
    ),
    [`Dopełniacz`]: formsOdmianaOw(
      `Kogo?`,
      "ow",
      `Szuka {word}`,
      "owego",
      "owej",
      "owego",
      "owych",
      "owych"
    ),
    [`Celownik`]: formsOdmianaOw(
      `Komu?`,
      "ow",
      `Daje {word}`,
      "owemu",
      "owej",
      "owemu",
      "owym",
      "owym"
    ),
    [`Biernik`]: formsOdmianaOw(
      `Kogo?`,
      "ow",
      `Zna {word}`,
      "owego",
      "ową",
      "owo",
      "owych",
      "owe"
    ),
    [`Narzędnik`]: formsOdmianaOw(
      `Kim?`,
      "ow",
      `Interesue się {word}`,
      "owym",
      "ową",
      "owym",
      "owymi",
      "owymi"
    ),
    [`Miejscownik`]: formsOdmianaOw(
      `Kim?`,
      "ow",
      `Myśli o {word}`,
      "owym",
      "owej",
      "owym",
      "owych",
      "owych"
    ),
  },
  taki: {
    [`Mianownik, Wolacz`]: formsOdmianaTaki(
      `Kto?`,
      "taki",
      `To {word}`,
      "taki",
      "taka",
      "takie",
      "tacy",
      "takie"
    ),
    [`Dopełniacz`]: formsOdmianaTaki(
      `Kogo?`,
      "taki",
      `Szuka {word}`,
      "takiego",
      "takiej",
      "takiego",
      "takich",
      "takich"
    ),
    [`Celownik`]: formsOdmianaTaki(
      `Komu?`,
      "taki",
      `Daje {word}`,
      "takiemu",
      "takiej",
      "takiemu",
      "takim",
      "takim"
    ),
    [`Biernik`]: formsOdmianaTaki(
      `Kogo?`,
      "taki",
      `Zna {word}`,
      "takiego",
      "taką",
      "takie",
      "takich",
      "takie"
    ),
    [`Narzędnik`]: formsOdmianaTaki(
      `Kim?`,
      "taki",
      `Interesue się {word}`,
      "takim",
      "taką",
      "takim",
      "takimi",
      "takimi"
    ),
    [`Miejscownik`]: formsOdmianaTaki(
      `Kim?`,
      "taki",
      `Myśli o {word}`,
      "takim",
      "takiej",
      "takim",
      "takich",
      "takich"
    ),
  },
  który: {
    [`Mianownik, Wolacz`]: formsOdmianaKtory(
      `Kto?`,
      "który",
      `To {word}`,
      "który",
      "która",
      "które",
      "którzy",
      "które"
    ),
    [`Dopełniacz`]: formsOdmianaKtory(
      `Kogo?`,
      "który",
      `Szuka {word}`,
      "którego",
      "której",
      "którego",
      "których",
      "których"
    ),
    [`Celownik`]: formsOdmianaKtory(
      `Komu?`,
      "który",
      `Daje {word}`,
      "któremu",
      "której",
      "któremu",
      "którym",
      "którym"
    ),
    [`Biernik`]: formsOdmianaKtory(
      `Kogo?`,
      "który",
      `Zna {word}`,
      "którego",
      "którą",
      "które",
      "których",
      "które"
    ),
    [`Narzędnik`]: formsOdmianaKtory(
      `Kim?`,
      "który",
      `Interesue się {word}`,
      "którym",
      "którą",
      "którym",
      "którymi",
      "którymi"
    ),
    [`Miejscownik`]: formsOdmianaKtory(
      `Kim?`,
      "który",
      `Myśli o {word}`,
      "którym",
      "której",
      "którym",
      "których",
      "których"
    ),
  },
  jaki: {
    [`Mianownik, Wolacz`]: formsOdmianaJaki(
      `Kto?`,
      "jaki",
      `To {word}`,
      "jaki",
      "jaka",
      "jakie",
      "jacy",
      "jakie"
    ),
    [`Dopełniacz`]: formsOdmianaJaki(
      `Kogo?`,
      "jaki",
      `Szuka {word}`,
      "jakiego",
      "jakiej",
      "jakiego",
      "jakich",
      "jakich"
    ),
    [`Celownik`]: formsOdmianaJaki(
      `Komu?`,
      "jaki",
      `Daje {word}`,
      "jakiemu",
      "jakiej",
      "jakiemu",
      "jakim",
      "jakim"
    ),
    [`Biernik`]: formsOdmianaJaki(
      `Kogo?`,
      "jaki",
      `Zna {word}`,
      "jakiego",
      "jaką",
      "jakie",
      "jakich",
      "jakie"
    ),
    [`Narzędnik`]: formsOdmianaJaki(
      `Kim?`,
      "jaki",
      `Interesue się {word}`,
      "jakim",
      "jaką",
      "jakim",
      "jakimi",
      "jakimi"
    ),
    [`Miejscownik`]: formsOdmianaJaki(
      `Kim?`,
      "jaki",
      `Myśli o {word}`,
      "jakim",
      "jakiej",
      "jakim",
      "jakich",
      "jakich"
    ),
  },
  kazdy: {
    [`Mianownik, Wolacz`]: formsOdmianaKazdy(
      `Kto?`,
      "kazdy",
      `To {word}`,
      "każdy",
      "każda",
      "każde",
      "wszyscy",
      "wszystkie"
    ),
    [`Dopełniacz`]: formsOdmianaKazdy(
      `Kogo?`,
      "kazdy",
      `Szuka {word}`,
      "każdego",
      "każdej",
      "każdego",
      "wszystkich",
      "wszystkich"
    ),
    [`Celownik`]: formsOdmianaKazdy(
      `Komu?`,
      "kazdy",
      `Daje {word}`,
      "każdemu",
      "każdej",
      "każdemu",
      "wszystkim",
      "wszystkim"
    ),
    [`Biernik`]: formsOdmianaKazdy(
      `Kogo?`,
      "kazdy",
      `Zna {word}`,
      "każdego",
      "każdą",
      "każde",
      "wszystkich",
      "wszystkie"
    ),
    [`Narzędnik`]: formsOdmianaKazdy(
      `Kim?`,
      "kazdy",
      `Interesue się {word}`,
      "każdym",
      "każdą",
      "każdym",
      "wszystkimi",
      "wszystkimi"
    ),
    [`Miejscownik`]: formsOdmianaKazdy(
      `Kim?`,
      "kazdy",
      `Myśli o {word}`,
      "każdym",
      "każdej",
      "każdym",
      "wszystkich",
      "wszystkich"
    ),
  },
  żaden: {
    [`Mianownik, Wolacz`]: formsOdmianaZaden(
      `Kto?`,
      "żaden",
      `To {word}`,
      "żaden",
      "żadna",
      "żadne",
      "żadni",
      "żadne"
    ),
    [`Dopełniacz`]: formsOdmianaZaden(
      `Kogo?`,
      "żaden",
      `Szuka {word}`,
      "żadnego",
      "żadnej",
      "żadnego",
      "żadnych",
      "żadnych"
    ),
    [`Celownik`]: formsOdmianaZaden(
      `Komu?`,
      "żaden",
      `Daje {word}`,
      "żadnemu",
      "żadnej",
      "żadnemu",
      "żadnym",
      "żadnych"
    ),
    [`Biernik`]: formsOdmianaZaden(
      `Kogo?`,
      "żaden",
      `Zna {word}`,
      "żadnego",
      "żadną",
      "żadne",
      "żadnych",
      "żadne"
    ),
    [`Narzędnik`]: formsOdmianaZaden(
      `Kim?`,
      "żaden",
      `Interesue się {word}`,
      "żadnym",
      "żadną",
      "żadnym",
      "żadnymi",
      "żadnymi"
    ),
    [`Miejscownik`]: formsOdmianaZaden(
      `Kim?`,
      "żaden",
      `Myśli o {word}`,
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
): Record<string, { caseName: string; cards: Card[] }[]> {
  const data = entries(zaimkiWithOdmianaSource).reduce((prev, [word, data]) => {
    prev[word] = entries(data).map(([caseName, caseData]) => ({
      caseName,
      cards: entries(caseData.data).map(([form, answer]) =>
        mapToCard(
          answer,
          caseData.base[form],
          caseData.template
        )
      ),
    }));
    return prev;
  }, {} as Record<string, { caseName: string; cards: Card[] }[]>);

  if (shuffle) {
    for (const arr of Object.values(data)) {
      shuffleAndReturnArr(arr);
    }
  }

  return data;

  function mapToCard(
    answer: string,
    word: string,
    template: string
  ) {
    return {
      id: Math.random(),
      isMarked: false,
      isOpened: false,
      textWhenClosed: template.replace("{word}", `\r\n(${word})`),
      textWhenOpened: template.replace(
        "{word}",
        `\r\n${answer}` //(${question}) \r\n
      ),
    } as Card;
  }
}
