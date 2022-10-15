import { getRandomItem } from "../util";

export type Card = {
  id: number;
  isOpened?: boolean;
  isMarked?: boolean;
  textWhenOpened: string[];
  textWhenClosed: string[];
};

export type CardTemplateString = `${string}${"{verb}"} ${"{noun}"}${string}`;

export type CardSource = {
  templates: [CardTemplateString, CardTemplateString][];
  verbs: [string, string][];
  nouns: [string, string][];
};

export type CaseData = {
  name: string;
  question: string;
  use: string;
  caseNameIsOpened: boolean;
  cards: {
    singular: Card[];
    plural: Card[];
  };
};

type CaseSourceData = {
  name: string;
  question: string;
  use: string;
  cards: {
    singular: CardSource[];
    plural: CardSource[];
  };
};

const casesSourceData: CaseSourceData[] = [
  {
    name: "Mianownik",
    question: "Kto? Co?",
    use: "To jest... To są...",
    cards: {
      singular: [
        {
          templates: [["To jest ({verb} {noun})", "To jest {verb} {noun}"]],
          verbs: [
            ["młody", "młody"],
            ["wesoły", "wesoły"],
            ["przystojny", "przystojny"],
            ["dobry", "dobry"],
            ["drogi", "drogi"],
            ["wysoki", "wysoki"],
          ],
          nouns: [
            ["Marek", "Marek"],
            ["mężczyzna", "mężczyzna"],
            ["aktor", "aktor"],
            ["kot", "kot"],
            ["poeta", "poeta"],
          ],
        },
        {
          templates: [["To jest ({verb} {noun})", "To jest {verb} {noun}"]],
          verbs: [
            ["dobry", "dobry"],
            ["drogi", "drogi"],
            ["stary", "stary"],
            ["wysoki", "wysoki"],
          ],
          nouns: [
            ["samochód", "samochód"],
            ["ser", "ser"],
          ],
        },
        {
          templates: [["To jest ({verb} {noun})", "To jest {verb} {noun}"]],
          verbs: [
            ["ładna", "ładna"],
            ["młoda", "młoda"],
            ["inteligentna", "inteligentna"],
            ["wysoka", "wysoka"],
          ],
          nouns: [
            ["matka", "matka"],
            ["kobieta", "kobieta"],
            ["sofa", "sofa"],
            ["pani", "pani"],
            ["noc", "noc"],
          ],
        },
        {
          templates: [["To jest ({verb} {noun})", "To jest {verb} {noun}"]],
          verbs: [
            ["grzeczne", "grzeczne"],
            ["małe", "małe"],
            ["wesołe", "wesołe"],
            ["wysokie", "wysokie"],
          ],
          nouns: [
            ["kino", "kino"],
            ["słońce", "słońce"],
            ["dziecko", "dziecko"],
            ["imię", "imię"],
            ["akwarium", "akwarium"],
          ],
        },
      ],
      plural: [
        {
          templates: [["To są ({verb} {noun} l.mn.)", "To są {verb} {noun}"]],
          verbs: [
            ["młody", "młodzi"],
            ["wesoły", "weseli"],
            ["przystojny", "przystojni"],
            ["dobry", "dobrzy"],
            ["drogi", "drodzy"],
            ["wysoki", "wysocy"],
          ],
          nouns: [
            ["Marek", "Markowie"],
            ["mężczyzna", "mężczyźni"],
            ["aktor", "aktorzy"],
            ["student", "studenci"],
            ["poeta", "poeci"],
          ],
        },
        {
          templates: [["To są ({verb} {noun} l.mn.)", "To są {verb} {noun}"]],
          verbs: [
            ["dobry", "dobre"],
            ["drogi", "drogie"],
            ["stary", "stare"],
            ["dobry", "dobre"],
            ["wysoki", "wysokie"],
          ],
          nouns: [
            ["samochód", "samochody"],
            ["kot", "koty"],
            ["ser", "sery"],
          ],
        },
        {
          templates: [["To są ({verb} {noun} l.mn.)", "To są {verb} {noun}"]],
          verbs: [
            ["ładna", "ładne"],
            ["młoda", "młode"],
            ["inteligentna", "inteligentne"],
            ["wysoka", "wysokie"],
          ],
          nouns: [
            ["matka", "matki"],
            ["kobieta", "kobiety"],
            ["sofa", "sofy"],
            ["pani", "panie"],
            ["noc", "nocy"],
          ],
        },
        {
          templates: [["To są ({verb} {noun} l.mn.)", "To są {verb} {noun}"]],
          verbs: [
            ["grzeczne", "grzeczne"],
            ["małe", "małe"],
            ["wesołe", "wesołe"],
            ["wysokie", "wysokie"],
          ],
          nouns: [
            ["kino", "kina"],
            ["słońce", "słońca"],
            ["dziecko", "dzieci"],
            ["imię", "imiona"],
            ["akwarium", "akwaria"],
          ],
        },
      ],
    },
  },
  {
    name: "Dopełniacz",
    question: "Kogo? Czego?",
    use: "Nie ma... Nie znam... Nie widzę...  Nie lubię...",
    cards: {
      singular: [
        {
          templates: [
            ["Nie ma ({verb} {noun})", "Nie ma {verb} {noun}"],
            ["Nie znam ({verb} {noun})", "Nie znam {verb} {noun}"],
            ["Nie widzę ({verb} {noun})", "Nie widzę {verb} {noun}"],
            ["Nie lubię ({verb} {noun})", "Nie lubię {verb} {noun}"],
          ],
          verbs: [
            ["młody", "młodego"],
            ["wesoły", "wesołego"],
            ["przystojny", "przystojnego"],
            ["dobry", "dobrego"],
            ["drogi", "drogiego"],
            ["wysoki", "wysokiego"],
          ],
          nouns: [
            ["Marek", "Marka"],
            ["mężczyzna", "mężczyzny"],
            ["aktor", "aktora"],
            ["kot", "kota"],
            ["poeta", "poety"],
          ],
        },
        {
          templates: [
            ["Nie ma ({verb} {noun})", "Nie ma {verb} {noun}"],
            ["Nie znam ({verb} {noun})", "Nie znam {verb} {noun}"],
            ["Nie widzę ({verb} {noun})", "Nie widzę {verb} {noun}"],
            ["Nie lubię ({verb} {noun})", "Nie lubię {verb} {noun}"],
          ],
          verbs: [
            ["dobry", "dobrego"],
            ["drogi", "drogiego"],
            ["stary", "starego"],
            ["wysoki", "wysokiego"],
          ],
          nouns: [
            ["samochód", "samochodu"],
            ["ser", "sera"],
          ],
        },
        {
          templates: [
            ["Nie ma ({verb} {noun})", "Nie ma {verb} {noun}"],
            ["Nie znam ({verb} {noun})", "Nie znam {verb} {noun}"],
            ["Nie widzę ({verb} {noun})", "Nie widzę {verb} {noun}"],
            ["Nie lubię ({verb} {noun})", "Nie lubię {verb} {noun}"],
          ],
          verbs: [
            ["ładna", "ładnej"],
            ["młoda", "młodej"],
            ["inteligentna", "inteligentnej"],
            ["wysoka", "wysokiej"],
          ],
          nouns: [
            ["matka", "matki"],
            ["kobieta", "kobiety"],
            ["sofa", "sofy"],
            ["pani", "pani"],
            ["noc", "nocy"],
          ],
        },
        {
          templates: [
            ["Nie ma ({verb} {noun})", "Nie ma {verb} {noun}"],
            ["Nie znam ({verb} {noun})", "Nie znam {verb} {noun}"],
            ["Nie widzę ({verb} {noun})", "Nie widzę {verb} {noun}"],
            ["Nie lubię ({verb} {noun})", "Nie lubię {verb} {noun}"],
          ],
          verbs: [
            ["grzeczne", "grzecznego"],
            ["małe", "małego"],
            ["wesołe", "wesołego"],
            ["wysokie", "wysokiego"],
          ],
          nouns: [
            ["kino", "kina"],
            ["słońce", "słońca"],
            ["dziecko", "dziecka"],
            ["imię", "imienia"],
            ["akwarium", "akwarium"],
          ],
        },
      ],
      plural: [
        {
          templates: [
            ["Nie ma ({verb} {noun} l.mn.)", "Nie ma {verb} {noun}"],
            ["Nie znam ({verb} {noun} l.mn.)", "Nie znam {verb} {noun}"],
            ["Nie widzę ({verb} {noun} l.mn.)", "Nie widzę {verb} {noun}"],
            ["Nie lubię ({verb} {noun} l.mn.)", "Nie lubię {verb} {noun}"],
          ],
          verbs: [
            ["młody", "młodych"],
            ["wesoły", "wesołych"],
            ["przystojny", "przystojnych"],
            ["dobry", "dobrych"],
            ["drogi", "drogich"],
            ["wysoki", "wysokich"],
          ],
          nouns: [
            ["Marek", "Marków"],
            ["mężczyzna", "mężczyzn"],
            ["aktor", "aktorów"],
            ["student", "studentów"],
            ["poeta", "poetów"],
          ],
        },
        {
          templates: [
            ["Nie ma ({verb} {noun} l.mn.)", "Nie ma {verb} {noun}"],
            ["Nie znam ({verb} {noun} l.mn.)", "Nie znam {verb} {noun}"],
            ["Nie widzę ({verb} {noun} l.mn.)", "Nie widzę {verb} {noun}"],
            ["Nie lubię ({verb} {noun} l.mn.)", "Nie lubię {verb} {noun}"],
          ],
          verbs: [
            ["dobry", "dobrych"],
            ["drogi", "drogich"],
            ["stary", "starych"],
            ["wysoki", "wysokich"],
          ],
          nouns: [
            ["samochód", "samochodów"],
            ["kot", "kotów"],
            ["ser", "serów"],
          ],
        },
        {
          templates: [
            ["Nie ma ({verb} {noun} l.mn.)", "Nie ma {verb} {noun}"],
            ["Nie znam ({verb} {noun} l.mn.)", "Nie znam {verb} {noun}"],
            ["Nie widzę ({verb} {noun} l.mn.)", "Nie widzę {verb} {noun}"],
            ["Nie lubię ({verb} {noun} l.mn.)", "Nie lubię {verb} {noun}"],
          ],
          verbs: [
            ["ładna", "ładnych"],
            ["młoda", "młodych"],
            ["inteligentna", "inteligentnych"],
            ["wysoka", "wysokich"],
          ],
          nouns: [
            ["matka", "matek"],
            ["kobieta", "kobiet"],
            ["sofa", "sof"],
            ["pani", "pań"],
            ["noc", "nocy"],
          ],
        },
        {
          templates: [
            ["Nie ma ({verb} {noun} l.mn.)", "Nie ma {verb} {noun}"],
            ["Nie znam ({verb} {noun} l.mn.)", "Nie znam {verb} {noun}"],
            ["Nie widzę ({verb} {noun} l.mn.)", "Nie widzę {verb} {noun}"],
            ["Nie lubię ({verb} {noun} l.mn.)", "Nie lubię {verb} {noun}"],
          ],
          verbs: [
            ["grzeczne", "grzecznych"],
            ["małe", "małych"],
            ["wesołe", "wesołych"],
            ["wysokie", "wysokich"],
          ],
          nouns: [
            ["kino", "kin"],
            ["słońce", "słońc"],
            ["dziecko", "dzieci"],
            ["imię", "imion"],
            ["akwarium", "akwariów"],
          ],
        },
      ],
    },
  },
  {
    name: "Celownik",
    question: "Komu? Czemu?",
    use: "Przyglądam się... Ufam...",
    cards: {
      singular: [
        {
          templates: [
            ["Ufam ({verb} {noun})", "Ufam {verb} {noun}"],
            ["To dzięki ({verb} {noun})", "To dzięki {verb} {noun}"],
            ["Na przekór ({verb} {noun})", "Na przekór {verb} {noun}"],
          ],
          verbs: [
            ["młody", "młodemu"],
            ["wesoły", "wesołemu"],
            ["przystojny", "przystojnemu"],
            ["dobry", "dobremu"],
            ["drogi", "drogiemu"],
            ["wysoki", "wysokiemu"],
          ],
          nouns: [
            ["Marek", "Markowi"],
            ["mężczyzna", "mężczyźnie"],
            ["aktor", "aktorowi"],
            ["kot", "kotu"],
            ["poeta", "poecie"],
          ],
        },
        {
          templates: [
            ["Ufam ({verb} {noun})", "Ufam {verb} {noun}"],
            ["To dzięki ({verb} {noun})", "To dzięki {verb} {noun}"],
            ["Na przekór ({verb} {noun})", "Na przekór {verb} {noun}"],
          ],
          verbs: [
            ["dobry", "dobremu"],
            ["drogi", "drogiemu"],
            ["stary", "staremu"],
            ["wysoki", "wysokiemu"],
          ],
          nouns: [
            ["samochód", "samochodowi"],
            ["ser", "serowi"],
          ],
        },
        {
          templates: [
            ["Ufam ({verb} {noun})", "Ufam {verb} {noun}"],
            ["To dzięki ({verb} {noun})", "To dzięki {verb} {noun}"],
            ["Na przekór ({verb} {noun})", "Na przekór {verb} {noun}"],
          ],
          verbs: [
            ["ładna", "ładnej"],
            ["młoda", "młodej"],
            ["inteligentna", "inteligentnej"],
            ["wysoka", "wysokiej"],
          ],
          nouns: [
            ["matka", "matce"],
            ["kobieta", "kobiecie"],
            ["sofa", "sofie"],
            ["pani", "pani"],
            ["noc", "nocy"],
          ],
        },
        {
          templates: [
            ["Ufam ({verb} {noun})", "Ufam {verb} {noun}"],
            ["To dzięki ({verb} {noun})", "To dzięki {verb} {noun}"],
            ["Na przekór ({verb} {noun})", "Na przekór {verb} {noun}"],
          ],
          verbs: [
            ["grzeczne", "grzecznemu"],
            ["małe", "małemu"],
            ["wesołe", "wesołemu"],
            ["wysokie", "wysokiemu"],
          ],
          nouns: [
            ["kino", "kinu"],
            ["słońce", "słońcu"],
            ["dziecko", "dziecku"],
            ["imię", "imieniu"],
            ["akwarium", "akwarium"],
          ],
        },
      ],
      plural: [
        {
          templates: [
            ["Ufam ({verb} {noun} l.mn.)", "Ufam {verb} {noun}"],
            ["To dzięki ({verb} {noun} l.mn.)", "To dzięki {verb} {noun}"],
            ["Na przekór ({verb} {noun} l.mn.)", "Na przekór {verb} {noun}"],
          ],
          verbs: [
            ["młody", "młodym"],
            ["wesoły", "wesołym"],
            ["przystojny", "przystojnym"],
            ["dobry", "dobrym"],
            ["drogi", "drogim"],
            ["wysoki", "wysokim"],
          ],
          nouns: [
            ["Marek", "Markom"],
            ["mężczyzna", "mężczyznom"],
            ["aktor", "aktorom"],
            ["student", "studentom"],
            ["poeta", "poetom"],
          ],
        },
        {
          templates: [
            ["Ufam ({verb} {noun} l.mn.)", "Ufam {verb} {noun}"],
            ["To dzięki ({verb} {noun} l.mn.)", "To dzięki {verb} {noun}"],
            ["Na przekór ({verb} {noun} l.mn.)", "Na przekór {verb} {noun}"],
          ],
          verbs: [
            ["dobry", "dobrym"],
            ["drogi", "drogim"],
            ["stary", "starym"],
            ["wysoki", "wysokim"],
          ],
          nouns: [
            ["samochód", "samochodom"],
            ["kot", "kotom"],
            ["ser", "serom"],
          ],
        },
        {
          templates: [
            ["Ufam ({verb} {noun} l.mn.)", "Ufam {verb} {noun}"],
            ["To dzięki ({verb} {noun} l.mn.)", "To dzięki {verb} {noun}"],
            ["Na przekór ({verb} {noun} l.mn.)", "Na przekór {verb} {noun}"],
          ],
          verbs: [
            ["ładna", "ładnym"],
            ["młoda", "młodym"],
            ["inteligentna", "inteligentnym"],
            ["wysoka", "wysokim"],
          ],
          nouns: [
            ["matka", "matkom"],
            ["kobieta", "kobietom"],
            ["sofa", "sofom"],
            ["pani", "paniom"],
            ["noc", "nocom"],
          ],
        },
        {
          templates: [
            ["Ufam ({verb} {noun} l.mn.)", "Ufam {verb} {noun}"],
            ["To dzięki ({verb} {noun} l.mn.)", "To dzięki {verb} {noun}"],
            ["Na przekór ({verb} {noun} l.mn.)", "Na przekór {verb} {noun}"],
          ],
          verbs: [
            ["grzeczne", "grzecznym"],
            ["małe", "małym"],
            ["wesołe", "wesołym"],
            ["wysokie", "wysokim"],
          ],
          nouns: [
            ["kino", "kinom"],
            ["słońce", "słońcom"],
            ["dziecko", "dzieciom"],
            ["imię", "imionom"],
            ["akwarium", "akwariom"],
          ],
        },
      ],
    },
  },
  {
    name: "Biernik",
    question: "Kogo? Co?",
    use: "Mam...  Znam... Widzę... Lubię...",
    cards: {
      singular: [
        {
          templates: [
            ["Mam ({verb} {noun})", "Mam {verb} {noun}"],
            ["Znam ({verb} {noun})", "Znam {verb} {noun}"],
            ["Widzę ({verb} {noun})", "Widzę {verb} {noun}"],
            ["Lubię ({verb} {noun})", "Lubię {verb} {noun}"],
          ],
          verbs: [
            ["młody", "młodego"],
            ["wesoły", "wesołego"],
            ["przystojny", "przystojnego"],
            ["dobry", "dobrego"],
            ["drogi", "drogiego"],
            ["wysoki", "wysokiego"],
          ],
          nouns: [
            ["Marek", "Marka"],
            ["mężczyzna", "mężczyznę"],
            ["aktor", "aktora"],
            ["kot", "kota"],
            ["poeta", "poetę"],
          ],
        },
        {
          templates: [
            ["Mam ({verb} {noun})", "Mam {verb} {noun}"],
            ["Znam ({verb} {noun})", "Znam {verb} {noun}"],
            ["Widzę ({verb} {noun})", "Widzę {verb} {noun}"],
            ["Lubię ({verb} {noun})", "Lubię {verb} {noun}"],
          ],
          verbs: [
            ["dobry", "dobry"],
            ["drogi", "drogi"],
            ["stary", "stary"],
            ["wysoki", "wysoki"],
          ],
          nouns: [
            ["samochód", "samochód"],
            ["ser", "ser"],
          ],
        },
        {
          templates: [
            ["Mam ({verb} {noun})", "Mam {verb} {noun}"],
            ["Znam ({verb} {noun})", "Znam {verb} {noun}"],
            ["Widzę ({verb} {noun})", "Widzę {verb} {noun}"],
            ["Lubię ({verb} {noun})", "Lubię {verb} {noun}"],
          ],
          verbs: [
            ["ładna", "ładną"],
            ["młoda", "młodą"],
            ["inteligentna", "inteligentną"],
            ["wysoka", "wysoką"],
          ],
          nouns: [
            ["matka", "matkę"],
            ["kobieta", "kobietę"],
            ["sofa", "sofę"],
            ["pani", "panią"],
            ["noc", "noc"],
          ],
        },
        {
          templates: [
            ["Mam ({verb} {noun})", "Mam {verb} {noun}"],
            ["Znam ({verb} {noun})", "Znam {verb} {noun}"],
            ["Widzę ({verb} {noun})", "Widzę {verb} {noun}"],
            ["Lubię ({verb} {noun})", "Lubię {verb} {noun}"],
          ],
          verbs: [
            ["grzeczne", "grzeczne"],
            ["małe", "małe"],
            ["wesołe", "wesołe"],
            ["wysokie", "wysokie"],
          ],
          nouns: [
            ["kino", "kino"],
            ["słońce", "słońce"],
            ["dziecko", "dziecko"],
            ["imię", "imię"],
            ["akwarium", "akwarium"],
          ],
        },
      ],
      plural: [
        {
          templates: [
            ["Mam ({verb} {noun} l.mn.)", "Mam {verb} {noun}"],
            ["Znam ({verb} {noun} l.mn.)", "Znam {verb} {noun}"],
            ["Widzę ({verb} {noun} l.mn.)", "Widzę {verb} {noun}"],
            ["Lubię ({verb} {noun} l.mn.)", "Lubię {verb} {noun}"],
          ],
          verbs: [
            ["młody", "młodych"],
            ["wesoły", "wesołych"],
            ["przystojny", "przystojnych"],
            ["dobry", "dobrych"],
            ["drogi", "drogich"],
            ["wysoki", "wysokich"],
          ],
          nouns: [
            ["Marek", "Marków"],
            ["mężczyzna", "mężczyzn"],
            ["aktor", "aktorów"],
            ["student", "studentów"],
            ["poeta", "poetów"],
          ],
        },
        {
          templates: [
            ["Mam ({verb} {noun} l.mn.)", "Mam {verb} {noun}"],
            ["Znam ({verb} {noun} l.mn.)", "Znam {verb} {noun}"],
            ["Widzę ({verb} {noun} l.mn.)", "Widzę {verb} {noun}"],
            ["Lubię ({verb} {noun} l.mn.)", "Lubię {verb} {noun}"],
          ],
          verbs: [
            ["dobry", "dobre"],
            ["drogi", "drogie"],
            ["stary", "stare"],
            ["wysoki", "wysokie"],
          ],
          nouns: [
            ["samochód", "samochody"],
            ["kot", "koty"],
            ["ser", "sery"],
          ],
        },
        {
          templates: [
            ["Mam ({verb} {noun} l.mn.)", "Mam {verb} {noun}"],
            ["Znam ({verb} {noun} l.mn.)", "Znam {verb} {noun}"],
            ["Widzę ({verb} {noun} l.mn.)", "Widzę {verb} {noun}"],
            ["Lubię ({verb} {noun} l.mn.)", "Lubię {verb} {noun}"],
          ],
          verbs: [
            ["ładna", "ładne"],
            ["młoda", "młode"],
            ["inteligentna", "inteligentne"],
            ["wysoka", "wysokie"],
          ],
          nouns: [
            ["matka", "matki"],
            ["kobieta", "kobiety"],
            ["sofa", "sofy"],
            ["pani", "panie"],
            ["noc", "noce"],
          ],
        },
        {
          templates: [
            ["Mam ({verb} {noun} l.mn.)", "Mam {verb} {noun}"],
            ["Znam ({verb} {noun} l.mn.)", "Znam {verb} {noun}"],
            ["Widzę ({verb} {noun} l.mn.)", "Widzę {verb} {noun}"],
            ["Lubię ({verb} {noun} l.mn.)", "Lubię {verb} {noun}"],
          ],
          verbs: [
            ["grzeczne", "grzeczne"],
            ["małe", "małe"],
            ["wesołe", "wesołe"],
            ["wysokie", "wysokie"],
          ],
          nouns: [
            ["kino", "kina"],
            ["słońce", "słońca"],
            ["dziecko", "dzieci"],
            ["imię", "imiona"],
            ["akwarium", "akwaria"],
          ],
        },
      ],
    },
  },
  {
    name: "Narzędnik",
    question: "(Z) Kim? Czym?",
    use: "Idę z … na drinka; Opiekuję się...",
    cards: {
      singular: [
        {
          templates: [
            ["On jest ({verb} {noun})", "On jest {verb} {noun}"],
            ["Idę z ({verb} {noun})", "Idę z {verb} {noun}"],
            ["Opiekuję się ({verb} {noun})", "Opiekuję się {verb} {noun}"],
            ["W porównaniu z ({verb} {noun})", "W porównaniu z {verb} {noun}"],
          ],
          verbs: [
            ["młody", "młodym"],
            ["wesoły", "wesołym"],
            ["przystojny", "przystojnym"],
            ["dobry", "dobrym"],
            ["drogi", "drogim"],
            ["wysoki", "wysokim"],
          ],
          nouns: [
            ["Marek", "Markiem"],
            ["mężczyzna", "mężczyzną"],
            ["aktor", "aktorem"],
            ["kot", "kotem"],
            ["poeta", "poetą"],
          ],
        },
        {
          templates: [
            ["On jest ({verb} {noun})", "On jest {verb} {noun}"],
            ["Idę z ({verb} {noun})", "Idę z {verb} {noun}"],
            ["Opiekuję się ({verb} {noun})", "Opiekuję się {verb} {noun}"],
            ["W porównaniu z ({verb} {noun})", "W porównaniu z {verb} {noun}"],
          ],
          verbs: [
            ["dobry", "dobrym"],
            ["drogi", "drogim"],
            ["stary", "starym"],
            ["wysoki", "wysokim"],
          ],
          nouns: [
            ["samochód", "samochodem"],
            ["ser", "serem"],
          ],
        },
        {
          templates: [
            ["Ona jest ({verb} {noun})", "Ona jest {verb} {noun}"],
            ["Idę z ({verb} {noun})", "Idę z {verb} {noun}"],
            ["Opiekuję się ({verb} {noun})", "Opiekuję się {verb} {noun}"],
            ["W porównaniu z ({verb} {noun})", "W porównaniu z {verb} {noun}"],
          ],
          verbs: [
            ["ładna", "ładną"],
            ["młoda", "młodą"],
            ["inteligentna", "inteligentną"],
            ["wysoka", "wysoką"],
          ],
          nouns: [
            ["matka", "matką"],
            ["kobieta", "kobietą"],
            ["sofa", "sofą"],
            ["pani", "panią"],
            ["noc", "nocą"],
          ],
        },
        {
          templates: [
            ["Ono jest ({verb} {noun})", "Ono jest {verb} {noun}"],
            ["Idę z ({verb} {noun})", "Idę z {verb} {noun}"],
            ["Opiekuję się ({verb} {noun})", "Opiekuję się {verb} {noun}"],
            ["W porównaniu z ({verb} {noun})", "W porównaniu z {verb} {noun}"],
          ],
          verbs: [
            ["grzeczne", "grzecznym"],
            ["małe", "małym"],
            ["wesołe", "wesołym"],
            ["wysokie", "wysokim"],
          ],
          nouns: [
            ["kino", "kinem"],
            ["słońce", "słońcem"],
            ["dziecko", "dzieckiem"],
            ["imię", "imieniem"],
            ["akwarium", "akwarium"],
          ],
        },
      ],
      plural: [
        {
          templates: [
            ["Oni są ({verb} {noun})", "Oni są {verb} {noun}"],
            ["Idę z ({verb} {noun} l.mn.)", "Idę z {verb} {noun}"],
            [
              "Opiekuję się ({verb} {noun} l.mn.)",
              "Opiekuję się {verb} {noun}",
            ],
            [
              "W porównaniu z ({verb} {noun} l.mn.)",
              "W porównaniu z {verb} {noun}",
            ],
          ],
          verbs: [
            ["młody", "młodymi"],
            ["wesoły", "wesołymi"],
            ["przystojny", "przystojnymi"],
            ["dobry", "dobrymi"],
            ["drogi", "drogimi"],
            ["wysoki", "wysokimi"],
          ],
          nouns: [
            ["Marek", "Markami"],
            ["mężczyzna", "mężczyznami"],
            ["aktor", "aktorami"],
            ["student", "studentami"],
            ["poeta", "poetami"],
          ],
        },
        {
          templates: [
            ["One są ({verb} {noun})", "One są {verb} {noun}"],
            ["Idę z ({verb} {noun} l.mn.)", "Idę z {verb} {noun}"],
            [
              "Opiekuję się ({verb} {noun} l.mn.)",
              "Opiekuję się {verb} {noun}",
            ],
            [
              "W porównaniu z ({verb} {noun} l.mn.)",
              "W porównaniu z {verb} {noun}",
            ],
          ],
          verbs: [
            ["dobry", "dobrymi"],
            ["drogi", "drogimi"],
            ["stary", "starymi"],
            ["wysoki", "wysokimi"],
          ],
          nouns: [
            ["samochód", "samochodami"],
            ["kot", "kotami"],
            ["ser", "serami"],
          ],
        },
        {
          templates: [
            ["One są ({verb} {noun})", "One są {verb} {noun}"],
            ["Idę z ({verb} {noun} l.mn.)", "Idę z {verb} {noun}"],
            [
              "Opiekuję się ({verb} {noun} l.mn.)",
              "Opiekuję się {verb} {noun}",
            ],
            [
              "W porównaniu z ({verb} {noun} l.mn.)",
              "W porównaniu z {verb} {noun}",
            ],
          ],
          verbs: [
            ["ładna", "ładnymi"],
            ["młoda", "młodymi"],
            ["inteligentna", "inteligentnymi"],
            ["wysoka", "wysokimi"],
          ],
          nouns: [
            ["matka", "matkami"],
            ["kobieta", "kobietami"],
            ["sofa", "sofami"],
            ["pani", "paniami"],
            ["noc", "nocami"],
          ],
        },
        {
          templates: [
            ["One są ({verb} {noun})", "One są {verb} {noun}"],
            ["Idę z ({verb} {noun} l.mn.)", "Idę z {verb} {noun}"],
            [
              "Opiekuję się ({verb} {noun} l.mn.)",
              "Opiekuję się {verb} {noun}",
            ],
            [
              "W porównaniu z ({verb} {noun} l.mn.)",
              "W porównaniu z {verb} {noun}",
            ],
          ],
          verbs: [
            ["grzeczne", "grzecznymi"],
            ["małe", "małymi"],
            ["wesołe", "wesołymi"],
            ["wysoki", "wysokimi"],
          ],
          nouns: [
            ["kino", "kinami"],
            ["słońce", "słońcami"],
            ["dziecko", "dziećmi"],
            ["imię", "imionami"],
            ["akwarium", "akwariami"],
          ],
        },
      ],
    },
  },
  {
    name: "Miejscownik",
    question: "(O) Kim? Czym?",
    use: "Marże o... Myślę o...",
    cards: {
      singular: [
        {
          templates: [
            //['Marże o ({verb} {noun})', 'Marże o {verb} {noun}'],
            ["Myślę o ({verb} {noun})", "Myślę o {verb} {noun}"],
            ["Stoi przy ({verb} {noun})", "Stoi przy {verb} {noun}"],
          ],
          verbs: [
            ["młody", "młodym"],
            ["wesoły", "wesołym"],
            ["przystojny", "przystojnym"],
            ["dobry", "dobrym"],
            ["drogi", "drogim"],
            ["wysoki", "wysokim"],
          ],
          nouns: [
            ["Marek", "Marku"],
            ["mężczyzna", "mężczyźnie"],
            ["aktor", "aktorze"],
            ["kot", "kocie"],
            ["poeta", "poecie"],
          ],
        },
        {
          templates: [
            //['Marże o ({verb} {noun})', 'Marże o {verb} {noun}'],
            ["Myślę o ({verb} {noun})", "Myślę o {verb} {noun}"],
            ["Stoi przy ({verb} {noun})", "Stoi przy {verb} {noun}"],
          ],
          verbs: [
            ["dobry", "dobrym"],
            ["drogi", "drogim"],
            ["stary", "starym"],
            ["wysoki", "wysokim"],
          ],
          nouns: [
            ["samochód", "samochodzie"],
            ["ser", "serze"],
          ],
        },
        {
          templates: [
            //['Marże o ({verb} {noun})', 'Marże o {verb} {noun}'],
            ["Myślę o ({verb} {noun})", "Myślę o {verb} {noun}"],
            ["Stoi przy ({verb} {noun})", "Stoi przy {verb} {noun}"],
          ],
          verbs: [
            ["ładna", "ładnej"],
            ["młoda", "młodej"],
            ["inteligentna", "inteligentnej"],
            ["wysoka", "wysokiej"],
          ],
          nouns: [
            ["matka", "matce"],
            ["kobieta", "kobiecie"],
            ["sofa", "sofie"],
            ["pani", "pani"],
            ["noc", "nocy"],
          ],
        },
        {
          templates: [
            //['Marże o ({verb} {noun})', 'Marże o {verb} {noun}'],
            ["Myślę o ({verb} {noun})", "Myślę o {verb} {noun}"],
            ["Stoi przy ({verb} {noun})", "Stoi przy {verb} {noun}"],
          ],
          verbs: [
            ["grzeczne", "grzecznym"],
            ["małe", "małym"],
            ["wesołe", "wesołym"],
            ["wysokie", "wysokim"],
          ],
          nouns: [
            ["kino", "kinie"],
            ["słońce", "słońcu"],
            ["dziecko", "dziecku"],
            ["imię", "imieniu"],
            ["akwarium", "akwarium"],
          ],
        },
      ],
      plural: [
        {
          templates: [
            //['Marże o ({verb} {noun} l.mn.)', 'Marże o {verb} {noun}'],
            ["Myślę o ({verb} {noun} l.mn.)", "Myślę o {verb} {noun}"],
            ["Stoi przy ({verb} {noun} l.mn.)", "Stoi przy {verb} {noun}"],
          ],
          verbs: [
            ["młody", "młodych"],
            ["wesoły", "wesołych"],
            ["przystojny", "przystojnych"],
            ["dobry", "dobrych"],
            ["drogi", "drogich"],
            ["wysoki", "wysokich"],
          ],
          nouns: [
            ["Marek", "Markach"],
            ["mężczyzna", "mężczyznach"],
            ["aktor", "aktorach"],
            ["student", "studentach"],
            ["poeta", "poetach"],
          ],
        },
        {
          templates: [
            //['Marże o ({verb} {noun} l.mn.)', 'Marże o {verb} {noun}'],
            ["Myślę o ({verb} {noun} l.mn.)", "Myślę o {verb} {noun}"],
            ["Stoi przy ({verb} {noun} l.mn.)", "Stoi przy {verb} {noun}"],
          ],
          verbs: [
            ["dobry", "dobrych"],
            ["drogi", "drogich"],
            ["stary", "starych"],
            ["wysoki", "wysokich"],
          ],
          nouns: [
            ["samochód", "samochodach"],
            ["kot", "kotach"],
            ["ser", "serach"],
          ],
        },
        {
          templates: [
            //['Marże o ({verb} {noun} l.mn.)', 'Marże o {verb} {noun}'],
            ["Myślę o ({verb} {noun} l.mn.)", "Myślę o {verb} {noun}"],
            ["Stoi przy ({verb} {noun} l.mn.)", "Stoi przy {verb} {noun}"],
          ],
          verbs: [
            ["ładna", "ładnych"],
            ["młoda", "młodych"],
            ["inteligentna", "inteligentnych"],
            ["wysoka", "wysokich"],
          ],
          nouns: [
            ["matka", "matkach"],
            ["kobieta", "kobietach"],
            ["sofa", "sofach"],
            ["pani", "paniach"],
            ["noc", "nocach"],
          ],
        },
        {
          templates: [
            //['Marże o ({verb} {noun} l.mn.)', 'Marże o {verb} {noun}'],
            ["Myślę o ({verb} {noun} l.mn.)", "Myślę o {verb} {noun}"],
            ["Stoi przy ({verb} {noun} l.mn.)", "Stoi przy {verb} {noun}"],
          ],
          verbs: [
            ["grzeczne", "grzecznych"],
            ["małe", "małych"],
            ["wesołe", "wesołych"],
            ["wysokie", "wysokich"],
          ],
          nouns: [
            ["kino", "kinach"],
            ["słońce", "słońcach"],
            ["dziecko", "dzieciach"],
            ["imię", "imionach"],
            ["akwarium", "akwariach"],
          ],
        },
      ],
    },
  },
  {
    name: "Wołacz",
    question: "O!",
    use: "Drogi...  Drodzy...",
    cards: {
      singular: [
        {
          templates: [
            ["O ({verb} {noun})!", "O {verb} {noun}!"],
            ["O ({verb} {noun})!", "O {verb} {noun}!"],
          ],
          verbs: [
            ["młody", "młody"],
            ["wesoły", "wesoły"],
            ["przystojny", "przystojny"],
            ["dobry", "dobry"],
            ["drogi", "drogi"],
            ["wysoki", "wysoki"],
          ],
          nouns: [
            ["Marek", "Marku"],
            ["mężczyzna", "mężczyzno"],
            ["aktor", "aktorze"],
            ["kot", "kocie"],
            ["poeta", "poeto"],
          ],
        },
        {
          templates: [
            ["O ({verb} {noun})!", "O {verb} {noun}!"],
            ["O ({verb} {noun})!", "O {verb} {noun}!"],
          ],
          verbs: [
            ["dobry", "dobry"],
            ["drogi", "drogi"],
            ["stary", "stary"],
            ["wysoki", "wysoki"],
          ],
          nouns: [
            ["samochód", "samochodzie"],
            ["ser", "serze"],
          ],
        },
        {
          templates: [
            ["O ({verb} {noun})!", "O {verb} {noun}!"],
            ["O ({verb} {noun})!", "O {verb} {noun}!"],
          ],
          verbs: [
            ["ładna", "ładna"],
            ["młoda", "młoda"],
            ["inteligentna", "inteligentna"],
            ["wysoka", "wysoka"],
          ],
          nouns: [
            ["matka", "matko"],
            ["kobieta", "kobieto"],
            ["sofa", "sofo"],
            ["pani", "pani"],
            ["noc", "nocy"],
            ["Ania", "Aniu"],
            ["Kasia", "Kasiu"],
          ],
        },
        {
          templates: [
            ["O ({verb} {noun})!", "O {verb} {noun}!"],
            ["O ({verb} {noun})!", "O {verb} {noun}!"],
          ],
          verbs: [
            ["grzeczne", "grzeczne"],
            ["małe", "małe"],
            ["wesołe", "wesołe"],
            ["wysokie", "wysokie"],
          ],
          nouns: [
            ["kino", "kino"],
            ["słońce", "słońce"],
            ["dziecko", "dziecko"],
            ["imię", "imię"],
            ["akwarium", "akwarium"],
          ],
        },
      ],
      plural: [
        {
          templates: [
            ["O ({verb} {noun} l.mn.)!", "O {verb} {noun}!"],
            ["O ({verb} {noun} l.mn.)!", "O {verb} {noun}!"],
          ],
          verbs: [
            ["młody", "młodzi"],
            ["wesoły", "weseli"],
            ["przystojny", "przystojni"],
            ["dobry", "dobrzy"],
            ["drogi", "drodzy"],
            ["wysoki", "wysocy"],
          ],
          nouns: [
            ["Marek", "Markowie"],
            ["mężczyzna", "mężczyźni"],
            ["aktor", "aktorzy"],
            ["student", "studenci"],
            ["poeta", "poeci"],
          ],
        },
        {
          templates: [
            ["O ({verb} {noun} l.mn.)!", "O {verb} {noun}!"],
            ["O ({verb} {noun} l.mn.)!", "O {verb} {noun}!"],
          ],
          verbs: [
            ["dobry", "dobre"],
            ["drogi", "drogie"],
            ["stary", "stare"],
            ["wysoki", "wysokie"],
          ],
          nouns: [
            ["samochód", "samochody"],
            ["kot", "koty"],
            ["ser", "sery"],
          ],
        },
        {
          templates: [
            ["O ({verb} {noun} l.mn.)!", "O {verb} {noun}!"],
            ["O ({verb} {noun} l.mn.)!", "O {verb} {noun}!"],
          ],
          verbs: [
            ["ładna", "ładne"],
            ["młoda", "młode"],
            ["inteligentna", "inteligentne"],
            ["wysoka", "wysokie"],
          ],
          nouns: [
            ["matka", "matki"],
            ["kobieta", "kobiety"],
            ["sofa", "sofy"],
            ["pani", "panie"],
            ["noc", "noce"],
          ],
        },
        {
          templates: [
            ["O ({verb} {noun} l.mn.)!", "O {verb} {noun}!"],
            ["O ({verb} {noun} l.mn.)!", "O {verb} {noun}!"],
          ],
          verbs: [
            ["grzeczne", "grzeczne"],
            ["małe", "małe"],
            ["wesołe", "wesołe"],
            ["wysokie", "wysokie"],
          ],
          nouns: [
            ["kino", "kina"],
            ["słońce", "słońca"],
            ["dziecko", "dzieci"],
            ["imię", "imiona"],
            ["akwarium", "akwaria"],
          ],
        },
      ],
    },
  },
];

export const basicCaseData: CaseData[] = [
  {
    name: "Mianownik",
    question: "Kto? Co?",
    use: "To jest... To są...",
    caseNameIsOpened: true,
    cards: {
      singular: [
        {
          id: Math.random(),
          textWhenClosed: ["To jest (młody Marek)", "To jest (dobry kot)"],
          textWhenOpened: ["To jest młody Marek", "To jest dobry kot"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["To jest (drogi samochód)"],
          textWhenOpened: ["To jest drogi samochód"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["To jest (ładna matka)"],
          textWhenOpened: ["To jest ładna matka"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["To jest (krótkie kino)", "To jest (małe akwarium)"],
          textWhenOpened: ["To jest krótkie kino", "To jest małe akwarium"],
        },
      ],
      plural: [
        {
          id: Math.random(),
          textWhenClosed: ["To są (młody Marek l.mn.)"],
          textWhenOpened: ["To są młodzi Markowie "],
        },
        {
          id: Math.random(),
          textWhenClosed: [
            "To są (drogi samochód l.mn.)",
            "To są (dobry kot l.mn.)",
          ],
          textWhenOpened: ["To są drogie samochody", "To są dobre koty"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["To są (ładna matka l.mn.)"],
          textWhenOpened: ["To są ładne matki"],
        },
        {
          id: Math.random(),
          textWhenClosed: [
            "To są (krótkie kino l.mn.)",
            "To są (małe akwarium l.mn.)",
          ],
          textWhenOpened: ["To są krótkie kina", "To są małe akwaria"],
        },
      ],
    },
  },
  {
    name: "Dopełniacz",
    question: "Kogo? Czego?",
    use: "Nie ma... Nie znam... Nie widzę...  Nie lubię...",
    caseNameIsOpened: true,
    cards: {
      singular: [
        {
          id: Math.random(),
          textWhenClosed: ["Nie ma (młody Marek)", "Nie ma (dobry kot)"],
          textWhenOpened: ["Nie ma młodego Marka", "Nie ma dobrego kota"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Nie ma (drogi samochód)"],
          textWhenOpened: ["Nie ma drogiego samochodu"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Nie ma (ładna matka)"],
          textWhenOpened: ["Nie ma ładnej matki"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Nie ma (krótkie kino)", "Nie ma (małe akwarium)"],
          textWhenOpened: ["Nie ma krótkiego kina", "Nie ma małego akwarium"],
        },
      ],
      plural: [
        {
          id: Math.random(),
          textWhenClosed: ["Nie ma (młody Marek l.mn.)"],
          textWhenOpened: ["Nie ma młodych Marków"],
        },
        {
          id: Math.random(),
          textWhenClosed: [
            "Nie ma (drogi samochód l.mn.)",
            "Nie ma (dobry kot l.mn.)",
          ],
          textWhenOpened: ["Nie ma drogich samochodów", "Nie ma dobrych kotów"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Nie ma (ładna matka l.mn.)"],
          textWhenOpened: ["Nie ma ładnych matek"],
        },
        {
          id: Math.random(),
          textWhenClosed: [
            "Nie ma (krótkie kino l.mn.)",
            "TNie ma (małe akwarium l.mn.)",
          ],
          textWhenOpened: ["Nie ma krótkich kin", "Nie ma małych akwariów"],
        },
      ],
    },
  },
  {
    name: "Celownik",
    question: "Komu? Czemu?",
    use: "Przyglądam się... Ufam...",
    caseNameIsOpened: true,
    cards: {
      singular: [
        {
          id: Math.random(),
          textWhenClosed: ["Ufam (młody Marek)", "Ufam  (dobry kot)"],
          textWhenOpened: ["Ufam młodemu Markowi", "Ufam dobremu kotu"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Ufam (drogi samochód)"],
          textWhenOpened: ["Ufam drogiemu samochodowi"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Ufam (ładna matka)"],
          textWhenOpened: ["Ufam ładnej matce"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Ufam (krótkie kino)", "Ufam (małe akwarium)"],
          textWhenOpened: ["Ufam krótkiemu kinu", "Ufam małemu akwarium"],
        },
      ],
      plural: [
        {
          id: Math.random(),
          textWhenClosed: ["Ufam (młody Marek l.mn.)"],
          textWhenOpened: ["Ufam młodym Markom"],
        },
        {
          id: Math.random(),
          textWhenClosed: [
            "Ufam (drogi samochód l.mn.)",
            "Ufam (dobry kot l.mn.)",
          ],
          textWhenOpened: ["Ufam drogim samochodom", "Ufam dobrym kotom"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Ufam (ładna matka l.mn.)"],
          textWhenOpened: ["Ufam ładnym matkom"],
        },
        {
          id: Math.random(),
          textWhenClosed: [
            "Ufam (krótkie kino l.mn.)",
            "Ufam (małe akwarium l.mn.)",
          ],
          textWhenOpened: ["Ufam krótkim kinom", "Ufam małym akwariom"],
        },
      ],
    },
  },
  {
    name: "Biernik",
    question: "Kogo? Co?",
    use: "Mam...  Znam... Widzę... Lubię...",
    caseNameIsOpened: true,
    cards: {
      singular: [
        {
          id: Math.random(),
          textWhenClosed: ["Znam (młody Marek)", "Znam (dobry kot)"],
          textWhenOpened: ["Znam młodego Marka", "Znam dobrego kota"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Znam (drogi samochód)"],
          textWhenOpened: ["Znam drogi samochód"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Znam (ładna matka)"],
          textWhenOpened: ["Znam ładną matkę"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Znam (krótkie kino)", "Znam (małe akwarium)"],
          textWhenOpened: ["Znam krótkie kino", "Znam małe akwarium"],
        },
      ],
      plural: [
        {
          id: Math.random(),
          textWhenClosed: ["Znam (młody Marek l.mn.)"],
          textWhenOpened: ["Znam młodych Marków"],
        },
        {
          id: Math.random(),
          textWhenClosed: [
            "Znam (drogi samochód l.mn.)",
            "Znam (dobry kot l.mn.)",
          ],
          textWhenOpened: ["Znam drogie samochody", "Znam dobre koty"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Znam (ładna matka l.mn.)"],
          textWhenOpened: ["Znam ładne matki"],
        },
        {
          id: Math.random(),
          textWhenClosed: [
            "Znam (krótkie kino l.mn.)",
            "Znam (małe akwarium l.mn.)",
          ],
          textWhenOpened: ["Znam krótkie kina", "Znam małe akwaria"],
        },
      ],
    },
  },
  {
    name: "Narzędnik",
    question: "(Z) Kim? Czym?",
    use: "Idę z … na drinka; Opiekuję się...",
    caseNameIsOpened: true,
    cards: {
      singular: [
        {
          id: Math.random(),
          textWhenClosed: [
            "Opiekuję się (młody Marek)",
            "Opiekuję się (dobry kot)",
          ],
          textWhenOpened: [
            "Opiekuję się młodym Markiem",
            "Opiekuję się dobrym kotem",
          ],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Opiekuję się (drogi samochód)"],
          textWhenOpened: ["Opiekuję się drogim samochodem"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Opiekuję się (ładna matka)"],
          textWhenOpened: ["Opiekuję się ładną matką"],
        },
        {
          id: Math.random(),
          textWhenClosed: [
            "Opiekuję się (krótkie kino)",
            "Opiekuję się (małe akwarium)",
          ],
          textWhenOpened: [
            "Opiekuję się krótkim kinem",
            "Opiekuję się małym akwarium",
          ],
        },
      ],
      plural: [
        {
          id: Math.random(),
          textWhenClosed: ["Opiekuję się (młody Marek l.mn.)"],
          textWhenOpened: ["Opiekuję się młodymi Markami"],
        },
        {
          id: Math.random(),
          textWhenClosed: [
            "Opiekuję się (drogi samochód l.mn.)",
            "Opiekuję się (dobry kot l.mn.)",
          ],
          textWhenOpened: [
            "Opiekuję się drogimi samochodami",
            "Opiekuję się dobrymi kotami",
          ],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Opiekuję się (ładna matka l.mn.)"],
          textWhenOpened: ["Opiekuję się ładnymi matkami"],
        },
        {
          id: Math.random(),
          textWhenClosed: [
            "Opiekuję się (krótkie kino l.mn.)",
            "Opiekuję się (małe akwarium l.mn.)",
          ],
          textWhenOpened: [
            "Opiekuję się krótkimi kinami",
            "Opiekuję się małymi akwariami",
          ],
        },
      ],
    },
  },
  {
    name: "Miejscownik",
    question: "(O) Kim? Czym?",
    use: "Marże o... Myślę o...",
    caseNameIsOpened: true,
    cards: {
      singular: [
        {
          id: Math.random(),
          textWhenClosed: ["Myślę o (młody Marek)", "Myślę o (dobry kot)"],
          textWhenOpened: ["Myślę o młodym Marku", "Myślę o dobrym kocie"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Myślę o (drogi samochód)"],
          textWhenOpened: ["Myślę o drogim samochodzie"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Myślę o (ładna matka)"],
          textWhenOpened: ["Myślę o ładnej matce"],
        },
        {
          id: Math.random(),
          textWhenClosed: [
            "Myślę o (krótkie kino, słońce)",
            "Myślę o (małe akwarium)",
          ],
          textWhenOpened: [
            "Myślę o krótkim kinie, słońcu",
            "Myślę o małym akwarium",
          ],
        },
      ],
      plural: [
        {
          id: Math.random(),
          textWhenClosed: ["Myślę o (młody Marek l.mn.)"],
          textWhenOpened: ["Myślę o młodych Markach"],
        },
        {
          id: Math.random(),
          textWhenClosed: [
            "Myślę o (drogi samochód l.mn.)",
            "Myślę o (dobry kot l.mn.)",
          ],
          textWhenOpened: [
            "Myślę o drogich samochodach",
            "Myślę o dobrych kotach",
          ],
        },
        {
          id: Math.random(),
          textWhenClosed: ["Myślę o (ładna matka l.mn.)"],
          textWhenOpened: ["Myślę o ładnych matkach"],
        },
        {
          id: Math.random(),
          textWhenClosed: [
            "Myślę o (krótkie kino l.mn.)",
            "Myślę o (małe akwarium l.mn.)",
          ],
          textWhenOpened: [
            "Myślę o krótkich kinach",
            "Myślę o małych akwariach",
          ],
        },
      ],
    },
  },
  {
    name: "Wołacz",
    question: "O!",
    use: "Drogi...  Drodzy...",
    caseNameIsOpened: true,
    cards: {
      singular: [
        {
          id: Math.random(),
          textWhenClosed: ["O (młody Marek)!", "O (dobry kot)!"],
          textWhenOpened: ["O Młody Marku!", "O Dobry kocie!"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["O (drogi samochód)!"],
          textWhenOpened: ["O Drogi samochodzie!"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["O (ładna matka)!"],
          textWhenOpened: ["o Ładna matko!"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["O (krótkie kino)!", "O (małe akwarium)!"],
          textWhenOpened: ["Krótkie kino!", "Małe akwarium!"],
        },
      ],
      plural: [
        {
          id: Math.random(),
          textWhenClosed: ["O (młody Marek)!"],
          textWhenOpened: ["O Młodzi Markowie!"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["O (drogi samochód)!", "O (dobry kot)!"],
          textWhenOpened: ["O Drogie samochody!", "O Dobre koty!"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["O (ładna matka)!"],
          textWhenOpened: ["O Ładne matki!"],
        },
        {
          id: Math.random(),
          textWhenClosed: ["O (krótkie kino)!", "O (małe akwarium)!"],
          textWhenOpened: ["O Krótkie kina!", "O Małe akwaria!"],
        },
      ],
    },
  },
];

export function getRandomizedCaseData(
  currentSourceToPreserveMarked?: CaseData[],
  shuffle = false
): CaseData[] {
  const sourcesDataClone = JSON.parse(
    JSON.stringify(casesSourceData)
  ) as CaseSourceData[];

  const sourcesData = sourcesDataClone.map((x) => {
    function collapseCardSource(source: CardSource): Card {
      const template = getRandomItem(source.templates);

      //TODO remove mężczyzna/kobiet
      const verb = getRandomItem(source.verbs);
      const noun =
        source.nouns.find((x) => x[0] === "mężczyzna" || x[0] === "kobieta") ??
        getRandomItem(source.nouns);

      return {
        id: Math.random(),
        textWhenClosed: [
          template[0].replace("{verb}", verb[0]).replace("{noun}", noun[0]),
        ],
        textWhenOpened: [
          template[1].replace("{verb}", verb[1]).replace("{noun}", noun[1]),
        ],
      };
    }

    const s: CaseData = {
      name: x.name,
      question: x.question,
      use: x.use,
      caseNameIsOpened: false,
      cards: {
        singular: x.cards.singular.map(collapseCardSource),
        plural: x.cards.plural.map(collapseCardSource),
      },
    };

    return s;
  });

  for (const cse of currentSourceToPreserveMarked ?? []) {
    for (const type of ["singular", "plural"] as const) {
      for (const [index, card] of cse.cards[type].entries()) {
        if (card.isMarked) {
          sourcesData.find((x) => x.name === cse.name)!.cards[type][index] =
            card;
        }
      }
    }
  }

  if (!shuffle){
    return sourcesData;
  }

  const sourcesDataShuffled: CaseData[] = [];

  while (sourcesData.length > 0) {
    const item = getRandomItem(sourcesData, true);
    sourcesDataShuffled.push(item);
  }

  return sourcesDataShuffled;
}
