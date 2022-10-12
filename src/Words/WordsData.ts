import groupBy from "lodash.groupby";
import { shuffleAndReturnArr } from "../util";

export const wordTypes = {
  czasownik: "czasownik",
  rzeczownik: "rzeczownik",
  przymiotnik: "przymiotnik",
  wyrazy: "wyrazy",
  inne: "inne",
} as const;

export type WordType = typeof wordTypes[keyof typeof wordTypes];

export const topics = {
  egzaminPaństwowy: "egzamin państwowy",
  inne: "inne",
} as const;

export type Topic = typeof topics[keyof typeof topics];

export type Card = {
  id: number;
  isMarked: boolean;
  wordType: WordType;
  topics: Topic[];
  isTextOpened: boolean;
  textWhenOpened: string[];
  textWhenClosed: string[];
  textBare: string;
};

type CardSourceData = {
  id: number;
  typ: WordType;
  topics: Topic[];
  wordEnglish: string;
  wordPolish: string;
  additionalPolish: string[];
};

let counter = 1;

const word =
  (wordType: WordType) =>
  (
    wordEnglish: string,
    wordPolish: string,
    additionalPolish: string[] = [],
    topics: Topic[] = []
  ): CardSourceData => {
    return {
      id: counter++,
      typ: wordType,
      wordEnglish,
      wordPolish,
      additionalPolish: additionalPolish ?? [],
      topics: topics.length > 0 ? topics : ["inne"],
    };
  };

const wyraz = word("wyrazy");
const rzeczownik = word("rzeczownik");
const rzeczownikDopMiejs = (
  wordEnglish: string,
  wordPolish: string,
  dopelniaczPolish: string,
  miejscownikPolish: string,
  additionalPolish: string[] = [],
  topics: Topic[] = []
) => {
  return rzeczownik(
    wordEnglish,
    wordPolish,
    [
      `nie ma ${dopelniaczPolish}`,
      `myśli o ${miejscownikPolish}`,
      ...additionalPolish,
    ],
    topics
  );
};
const przymiotnik = word("przymiotnik");
const czasownik = word("czasownik");
const inne = word("inne");

const rzeczowniki: CardSourceData[] = [
  rzeczownikDopMiejs("monument", "pomnik", "pomnika", "omniku", [
    "ponmik ofiar (czego) rządy radzieckiego - monument to victims of soviet regime",
  ]),
  rzeczownikDopMiejs("10 commendnments", "dekalog", "dekalogu", "dekalogu"),
  rzeczownikDopMiejs("decorations", "wystrój", "wystroju", "wystroju"),
  rzeczownikDopMiejs("suitcase ", "walizka", "walizki", "walizce", [
    "walizka z kółkami - suitcase with wheels",
  ]),
  rzeczownikDopMiejs("clothes", "ubranie", "ubrania", "ubraniu"),
  rzeczownik("emotions", "emocje"),
  rzeczownikDopMiejs("personality", "osobowość", "osobowości", "osobowości"),
  rzeczownikDopMiejs("pants", "spodnie", "spodni", "spodniach"),
  rzeczownikDopMiejs("trap", "pułapka", "pułapki", "pułapce"),
  rzeczownikDopMiejs("hotel room, peace", "pokój", "pokoju", "pokoju"),
  rzeczownikDopMiejs("animal", "zwierzę", "zwierzęcia", "zwierzęciu", [
    "l.mn. zwierzęta",
  ]),
  rzeczownikDopMiejs(
    "responsibility",
    "odpowiedzialność",
    "odpowiedzialności",
    "odpowiedzialności",
    ["wymaga od nas dużej odpowiedzialności - is a great responsibility"]
  ),
  rzeczownikDopMiejs("purchase", "kupno", "kupna", "kupnie", [
    "przed kupnem - before purchase",
  ]),
  rzeczownikDopMiejs("detail", "szczegół", "szczegółu", "szczególe"),
  rzeczownikDopMiejs("camp", "obóz", "obozu", "obozie"),
  rzeczownikDopMiejs("reception", "recepcja", "recepcji", "recepcji"),
  rzeczownikDopMiejs(
    "bar stool",
    "stołek barowy",
    "stołka barowego",
    "stołku barowym"
  ),
  rzeczownikDopMiejs('skill, ability', 'umiejętność', "umiejętności", "umiejętności"),
  rzeczownikDopMiejs('knowledge', 'wiedza ', "wiedzy", "wiedzy"),
  rzeczownikDopMiejs('missile, projectile', 'pocisk', "pocisku", "pocisku"),
  rzeczownikDopMiejs('sculpture', 'rzeźba', "rzeźby", "rzeźbie"),
  rzeczownikDopMiejs('flag', 'flaga, sztandar', "flagi, sztandaru", "fladze, sztandarze"),

];
const czasowniki: CardSourceData[] = [
  czasownik("dress-up", "wystroić", ["wystroję", "wystroisz"]),
  czasownik("avoid", "unikać", ["unikam", "unikasz"]),
  czasownik("require", "wymagać", ["wymagam", "wymagasz"]),
  czasownik("demand", "żądać", [" żądam", "żądasz"]),
  czasownik("care", "dbać", ["dbam", "dbasz"]),
  czasownik("infect", "zarażać", ["zarażam", "zarażasz"]),
  czasownik("surrender, give up", "poddawać się", ["poddaję", "poddajesz"]),
  czasownik("cause, lead to", "powodować ", ["powoduję", "powodujesz"]),
  czasownik("bring, lead to", "sprawić", ["sprawię", "sprawisz"]),
  czasownik("betray", "zdradzać", ["zdradzam", "zdradzasz"]),
];
const przymiotniki: CardSourceData[] = [
  przymiotnik("appropriate, correct, proper", "właściwy"),
  przymiotnik("bright, clear, blonde, pale", "jasny"),
  przymiotnik("big, giant", "olbrzymi"),
  przymiotnik("honest", "uczciwy"),
  przymiotnik("sincere", "szczery"),
  przymiotnik("friendly, nice", "poczciwy"),
  przymiotnik("serious", "poważny"),
];
const wyrazy: CardSourceData[] = [
  wyraz("to wear", "mieć no sobie (co?)"),
  wyraz("to be dressed in", "być ubranym w (co?)"),
  wyraz(
    "on the front plan of the photo",
    "na przednim planie zdjęcia",
    [],
    [topics.egzaminPaństwowy]
  ),
  wyraz(
    "on the middle plan of the photo",
    "na drugim planie zdjęcia",
    ["na drugim planie zdjęcia widoczna jest"],
    [topics.egzaminPaństwowy]
  ),
  wyraz(
    "on the back plan of the photo",
    "na tylnum planie zdjęcia",
    [],
    [topics.egzaminPaństwowy]
  ),
  wyraz("first (in a list)", "po pierwsze", [], [topics.egzaminPaństwowy]),
  wyraz("see in window", "widzieć w oknie", [], []),
  wyraz("see through a window", "widzieć przez okno", [], []),
  wyraz("biggest argument in favour", "największy argument za tym", [], []),
  wyraz("clarify the matter", "wyjaśnić tę sprawę", [], []),
  wyraz(
    "prevent similar events",
    "nie dopuścić podobnych wydarzeń; zapobiegać podobnym zdarzeniom",
    [],
    []
  ),
  wyraz(
    "you won't lose anything",
    "nic nie stracisz",
    [],
    []
  ),
];
const inneSource: CardSourceData[] = [
  inne("almost", "prawie", [
    "trwało to prawie godzinę - it lasted almost an hour",
  ]),
  inne("before", "zanim; przed tym"),
  inne("particularly", "szczególnie"),
  inne("generally", "ogólnie"),
  inne("usually", "zwykle; z reguły"),
  inne("equally", "równie; również; tak samo; jednakowo; też"),
  inne("earlier, before, in andvance", "wcześniej"),
];

const source: CardSourceData[] = [
  ...rzeczowniki,
  ...czasowniki,
  ...przymiotniki,
  ...wyrazy,
  ...inneSource,
];

export function getCardsData(num?: number) {
  let src = source;

  if (num) {
    src = Object.values(groupBy(src, (x) => x.typ)).flatMap((x) =>
      shuffleAndReturnArr(x).slice(0, num)
    );
  }

  return src.map((x) => {
    return {
      id: x.id,
      isMarked: false,
      wordType: x.typ,
      topics: x.topics,
      isTextOpened: false,
      textWhenOpened: [x.wordPolish, ...x.additionalPolish],
      textWhenClosed: [x.wordEnglish],
      textBare: x.wordPolish,
    } as Card;
  });
}
