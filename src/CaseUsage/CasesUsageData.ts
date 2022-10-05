import groupBy from "lodash.groupby";
import { getRandomItem, shuffleAndReturnArr } from "../util";

export const cases = {
  dopełniacz: "Dopełniacz",
  celownik: "Celownik",
  biernik: `Biernik`,
} as const;

export type CaseName = typeof cases[keyof typeof cases];

export type Card = {
  id: number;
  isCaseNameOpened: boolean;
  isTextOpened: boolean;
  isMarked: boolean;
  caseName: CaseName;
  textWhenOpened: string;
  textWhenClosed: string;
};

type CardSourceData = {
  caseName: CaseName;
  id: number;
  getRandomizedExample: () => [string, string];
};

let counter = 1;

const forCaseVerb =
  (caseName: CaseName) =>
  (
    templates: `${string}{word}${string}`[],
    words: [string, string, string][]
  ) => {
    return {
      caseName,
      id: counter++,
      getRandomizedExample: () => {
        const [closed, opened, question] = getRandomItem(words);
        const template = getRandomItem(templates);

        return [
          template.replace("{word}", `(${closed})`),
          template.replace("{word}", `(${question}) ${opened}`),
        ] as [string, string];
      },
    };
  };

const forCasePreposition =
  (caseName: CaseName) =>
  (...templates: [`${string}{word}${string}`, string, string, string][]) => {
    return {
      caseName,
      id: counter++,
      getRandomizedExample: () => {
        const [template, closed, opened, question] = getRandomItem(templates);

        return [
          template.replace("{word}", `(${closed})`),
          template.replace("{word}", `(${question}) ${opened}`),
        ] as [string, string];
      },
    };
  };

const dopełniaczVerb = forCaseVerb(cases.dopełniacz);
const celownikVerb = forCaseVerb(cases.celownik);
const biernikVerb = forCaseVerb(cases.biernik);

const dopełniaczPreposition = forCasePreposition(cases.dopełniacz);
const celownikPreposition = forCasePreposition(cases.celownik);
const biernikPreposition = forCasePreposition(cases.biernik);

const dopełniaczSourceData: CardSourceData[] = [
  dopełniaczVerb(
    [
      `Bać się {word}`,
      `Boję się {word}`,
      `Boisz się {word}`,
      `Bałem się {word}`,
    ],
    [
      [`pajak l.mn.`, `pajaków`, `Kogo?`],
      [`wonż`, `węża`, `Kogo?`],
      [`wysokość`, `wysokości`, `Czego?`],
      [`ja`, `mnie`, `Kogo?`],
    ]
  ),
  dopełniaczVerb(
    [`Brakuję mi {word}`, `Brakuję ci {word}`, `Brakowało ci {word}`],
    [
      [`pieniądz l.mn.`, `pieniędzy`, `Czego?`],
      [`czas`, `czasu`, `Czego?`],
      [`siła l.mn.`, `sił`, `Czego?`],
      [`one/one`, `ich`, `Kogo?`],
    ]
  ),
  dopełniaczVerb(
    [
      `Pilnować {word}`,
      `Pilnuję {word}`,
      `Pilnujesz {word}`,
      `Pilnowałem {word}`,
    ],
    [
      [`własny interes l. mn.`, ` własnych interesów`, `Czego?`],
      [`rzecz l.mn.`, `rzeczy`, `Czego?`],
      [`dziecko`, `dziecka`, `Kogo?`],
      [`on`, `jego/go`, `Kogo?`],
    ]
  ),
  dopełniaczVerb(
    [
      `Potrzebować  {word}`,
      `Potrzebuje {word}`,
      `Potrzebujesz {word}`,
      `Potrzebowałem {word}`,
    ],
    [
      [`pieniądz l.mn.`, `pieniędzy`, `Czego?`],
      [`ojciec`, `ojca`, `Kogo?`],
      [`pomoc`, `pomocy`, `Czego?`],
      [`ona`, `jej`, `Kogo?`],
    ]
  ),
  dopełniaczVerb(
    [`Słuchać {word}`, `Slucham {word}`, `Sluchasz {word}`, `Słuchałem {word}`],
    [
      [`pani`, `pani`, `Kogo?`],
      [`ojciec`, `ojca`, `Kogo?`],
      [`dziecko l.mn.`, `dzieci`, `Kogo?`],
      [`my`, `nas`, `Kogo?`],
    ]
  ),
  dopełniaczVerb(
    [`Szukać {word}`, `Szukam {word}`, `Szukasz {word}`, `Szukałem {word}`],
    [
      [`kot`, `kota`, `Kogo?`],
      [`ojciec`, `ojca`, `Kogo?`],
      [`pieniądz l.mn.`, `pieniędzy`, `Czego?`],
    ]
  ),
  dopełniaczVerb(
    [
      `Uczyć się {word}`,
      `Uczę się {word}`,
      `Uczysz się {word}`,
      `Uczyłem się {word}`,
    ],
    [
      [`jezyk polski`, `jezyka polskiego`, `Czego?`],
      [`historia Polski`, `historii Polski`, `Czego?`],
      [`właściwe maniery`, `właściwych manier`, `Czego?`],
    ]
  ),
  dopełniaczVerb(
    [`Używać {word}`, `Używam {word}`, `Używasz {word}`, `Używałem {word}`],
    [
      [`ten kryterium`, `tego kryterium`, `Czego?`],
      [`produkt`, `produktu`, `Czego?`],
      [`lek`, `leku`, `Czego?`],
    ]
  ),
  dopełniaczVerb(
    [
      `Zapomniać {word}`,
      `Zapomniałem {word}`,
      `Zapomniałeś {word}`,
      `Zapomniałem {word}`,
    ],
    [
      [`hasło`, `hasła`, `Czego?`],
      [`telefon`, `telefonu`, `Czego?`],
      [`czapka`, `czapki`, `Czego?`],
      [`wy`, `was`, `Kogo?`],
    ]
  ),
  dopełniaczVerb(
    [`Żałować {word}`, `Żałuję {word}`, `Żałujesz {word}`, `Żałowałem {word}`],
    [
      [`pieniądz l.mn.`, `pieniędzy`, `Czego?`],
      [`czegokolwiek`, `czegokolwiek`, `Czego?`],
      [`zmarnowana szansa`, `zmarnowanej szansy`, `Czego?`],
    ]
  ),
  dopełniaczVerb(
    // lots of usage, so 3 dicated cards
    [
      `Życzyć {word}`,
      `Życzę ci {word}`,
      `Życzysz mi {word}`,
      `Życzyłem ci {word}`,
    ],
    [
      [`wielo sukcess l.mn.`, `wielu sukcesów`, `Czego?`],
      [`miły dzień`, `miłego dnia`, `Czego?`],
      [`pomyślna przyszłość`, `pomyślnej przyszłości`, `Czego?`],
    ]
  ),
  dopełniaczVerb(
    [
      `Życzyć {word}`,
      `Życzę ci {word}`,
      `Życzysz mi {word}`,
      `Życzyłem ci {word}`,
    ],
    [
      [`szczęśliwy nowy rok`, `szczęśliwego nowego roku`, `Czego?`],
      [`sam sukcess l.mn.`, `samych sukcesów`, `Czego?`],
      [`odwaga`, `odwagi`, `Czego?`],
    ]
  ),
  dopełniaczVerb(
    [
      `Życzyć {word}`,
      `Życzę ci {word}`,
      `Życzysz mi {word}`,
      `Życzyłem ci {word}`,
    ],
    [
      [`wszystko dobre`, `wszystkiego dobrego`, `Czego?`],
      [`wszelkie sukcess l.mn.`, `wszelkich sukcesów`, `Czego?`],
      [`przyjemna podróż`, `przyjemnej podróży`, `Czego?`],
      [`wesołe świętą`, `wesołych świąt`, `Czego?`],
    ]
  ),
  dopełniaczPreposition(
    [`Kawa bez {word}`, `cukier`, `cukru`, `Czego?`],
    [`Lek bez {word}`, `opakownie`, `opakowania`, `Czego?`],
    [`Działać bez {word}`, `wątpienie`, `wątpienia`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`Obniżka dla {word}`, `obywatel l.mn.`, `obywateli`, `Kogo?`],
    [
      `Mówimy "tak” dla {word}`,
      `wspólna polityka`,
      `wspólnej polityki`,
      `Czego?`,
    ],
    [
      `Recykling jest korzystny dla {word}`,
      `środowisko`,
      `środowiska`,
      `Czego?`,
    ],
    [`Mam dla {word}`, `ty`, `ciebie`, `Kogo?`]
  ),
  dopełniaczPreposition(
    [`Srodki do {word}`, `wykorzystanie`, `wykorzystania`, `Czego?`],
    [`Nalewać do {word}`, `filiżanka`, `filiżanki`, `Czego?`],
    [`Kandydat do {word}`, `dołączenie`, `dołączenia`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`Podróż dookola {word}`, `świat`, `świata`, `Czego?`],
    [`Skóra dookoła {word}`, `rana`, `rany`, `Czego?`],
    [`Rośliny dookoła {word}`, `my`, `nas`, `Kogo?`]
  ),
  dopełniaczPreposition(
    [`Stał obok {word}`, `on`, `niego`, `Kogo?`],
    [`Siadaj obok {word}`, `ja`, `mnie`, `Kogo?`],
    [`Siedzieć obok moich {word}`, `rodzice`, `rodziców`, `Kogo?`]
  ),
  dopełniaczPreposition(
    [`Stał kolo {word}`, `dom`, `domu`, `Czego?`],
    [`Stał kolo {word}`, `ja`, `mnie`, `Kogo?`]
  ),
  dopełniaczPreposition(
    [`Kocham cię, mimo {word}`, `twoje błędy`, `twoich błędów`, `Czego?`],
    [
      `Sytuacja ta zaistniała mimo {word}`,
      `podjęte działania`,
      `podjętych działań`,
      `Czego?`,
    ],
    [
      `Możliwe mimo {word}`,
      `zaostrzenie przepisów`,
      `zaostrzenia przepisów`,
      `Czego?`,
    ]
  ),
  dopełniaczPreposition(
    [`Siedzi naprzeciwko {word}`, `ja`, `mnie`, `Kogo?`],
    [`Siedzieliśmy naprzeciwko {word}`, `siebie`, `siebie`, `Kogo?`],
    [
      `Sklep naprzeciwko {word}`,
      `miejsce spotkania`,
      `miejsca spotkania`,
      `Czego?`,
    ]
  ),
  dopełniaczPreposition(
    [`Mieszkam tutaj od {word}`, `lata`, `lat`, `Czego?`],
    [`Wiadomości od {word}`, `siostra`, `siostry`, `Kogo?`],
    [
      `8 godzin od {word}`,
      `przedawkowanie leku`,
      `przedawkowania leku`,
      `Czego?`,
    ]
  ),
  dopełniaczPreposition(
    [`Egzamin trwa oklo {word}`, `cztery godziny`, `czterech godzin`, `Czego?`],
    [`Miała okolo {word}`, `dwadzieścia lat`, `dwudziestu lat`, `Czego?`],
    [`Miał okolo {word}`, `pięćdziesiąt lat`, `pięćdziesięciu lat`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`Cała załoga prócz {word} ewakuowała się`, `kapitan`, `kapitana`, `Kogo?`],
    [`Nie ma innego znaczenia prócz {word}`, `to`, `tego`, `Czego?`],
    [`Nie lubię nikogo, prócz {word}`, `ty`, `ciebie`, `Kogo?`]
  ),
  dopełniaczPreposition(
    [`Każdy ma samochód oprócz {word}`, `ja`, `mnie`, `Kogo?`],
    [`Nie przepuszczaj nikogo oprócz {word}`, `on`, `niego`, `Kogo?`],
    [`Wszystkie oprócz {word}`, `jedna`, `jednej`, `Kogo?`]
  ),
  dopełniaczPreposition(
    [`Nauczyłam się tego podczas {word}`, `warsztaty`, `warsztatów`, `Czego?`],
    [
      `Wystąpił problem podczas {word}`,
      `tworzenie dokumentu`,
      `tworzenia dokumentu`,
      `Czego?`,
    ],
    [`Opieka lekarska podczas {word}`, `ciąża`, `ciąży`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`Poziom poniżej {word}`, `norma`, `normy`, `Czego?`],
    [
      `Prawdopodobieństwo poniżej {word}`,
      `pięc procent`,
      `pięciu procent`,
      `Czego?`,
    ],
    [`Boli mnie poniżej {word}`, `żebra`, `żeber`, `Czego?`]
  ),
  dopełniaczPreposition(
    [
      `25 kilometrów powyżej {word}`,
      `dozwolona prędkość`,
      `dozwolonej prędkości`,
      `Czego?`,
    ],
    [`Wartość powyżej {word}`, `zakres`, `zakres`, `Czego?`],
    [`Przelewy powyżej {word}`, `pięc tysięcy`, `pięciu tysięcy`, `Czego?`],
    [`Przelewy powyżej {word}`, `dwa tysiące`, `dwóch tysięcy`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`Wyszedł spod {word}`, `kontrola`, `kontroli`, `Czego?`],
    [`Wyszła spod {word}`, `kontrola`, `kontroli`, `Czego?`],
    [`Próbki skóry spod {word}`, `jej paznokci`, ` jej paznokci`, `Czego?`],
    [`Wyrwę się spod {word}`, `to wszystkie`, `tego wszystkiego`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`Wybieram spomiędzy {word}`, `cztery opcji`, `czterech opcji`, `Czego?`],
    [`Brud spomiędzy {word}`, `płytka l.mn.`, `płytek`, `Czego?`],
    [`Ktoś spomiędzy {word}`, `wy`, `was`, `Kogo?`]
  ),
  dopełniaczPreposition(
    [
      `Wybiera przewodniczącego spośród {word}`,
      `przedstawiciel l.mn.`,
      `przedstawicieli`,
      `Kogo?`,
    ],
    [`Jesteś spośród {word}`, `kandydat l.mn.`, `kandydatów`, `Kogo?`],
    [`Największe spośród {word}`, `siedem mórz`, `siedmiu mórz`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`Powiedz komuś spoza {word}`, `rodzina`, `rodziny`, `Czego?`],
    [`Klienci spoza {word}`, `terytorium kraju`, `terytorium kraju`, `Czego?`],
    [`Szukamy kogoś, spoza {word}`, `społeczeństwo`, `społeczeństwa`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`Kanapka sprzed {word}`, `trzy dni`, `trzech dni`, `Czego?`],
    [`To model sprzed {word}`, `rok`, `roku`, `Czego?`],
    [`Został skradziony sprzed {word}`, `nasze nosy`, `naszych nosów`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`Jestem u {word}`, `dentysta`, `dentysty`, `Kogo?`],
    [`Jestem u {word}`, `ja`, `siebie`, `Kogo?`],
    [`Umówić wizytę u {word}`, `lekarz`, `lekarza`, `Kogo?`]
  ),
  dopełniaczPreposition(
    [`Dam wam oferty w ciągu {word}`, `godzina`, `godziny`, `Czego?`],
    [`Potrafię to zrobić w ciągu {word}`, `tydzień`, `tygodnia`, `Czego?`],
    [
      `Posunięcia w ciągu {word}`,
      `ostatnie trzy dni`,
      `ostatnich trzech dni`,
      `Czego?`,
    ]
  ),
  dopełniaczPreposition(
    [
      `Powód według {word}`,
      `wiarygodne źródło l.mn.`,
      `wiarygodnych źródeł`,
      `Czego?`,
    ],
    [
      `Płatność odbywa się według {word}`,
      `wybor klienta`,
      `wyboru klienta`,
      `Czego?`,
    ],
    [
      `Biuro doposażone według {word}`,
      `potrzeba najemcy`,
      `potrzeby najemcy`,
      `Czego?`,
    ]
  ),
  dopełniaczPreposition(
    [`Środki karne w razie {word}`, `naruszenie`, `naruszenia`, `Czego?`],
    [`W razie {word}`, `odwołanie`, `odwołania`, `Czego?`],
    [`Ubezpieczenie w razie {word}`, `wypadek`, `wypadku`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`Być wśród {word}`, `znajomy l.mn.`, `znajomych`, `Kogo?`],
    [`Wybór wśród {word}`, `tyle ludzi`, `tylu ludzi`, `Kogo?`],
    [`Rywalizacja wśród {word}`, `kumpel l.mn.`, `kumpli`, `Kogo?`]
  ),
  dopełniaczPreposition(
    [`W punktach wzdłuż {word}`, `cała trassa`, `całej trasy`, `Czego?`],
    [
      `Przyszłość nie podąża wzdłuż {word}`,
      `pojedyńcza droga`,
      `pojedyńczej drogi`,
      `Czego?`,
    ],
    [`płyń wzdłuż {word}`, `wybrzeże`, `wybrzeży`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`Jestem z {word}`, `Urząd`, `Urzędu`, `Czego?`],
    [`Jestem z {word}`, `Polska`, `Polski`, `Czego?`],
    [`Jestem z {word}`, `przyszłość`, `przyszłości`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`Wybrałam Ciebie zamiast {word}`, `oni`, `ich`, `Kogo?`],
    [`Granatowy zamiast {word}`, `niebieski`, `niebieskiego`, `Czego?`],
    [`Kłamstwo zamiast {word}`, `prawda`, `prawdy`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`Nadajemy na żywo znad {word}`, `Zatoka Tokio`, `Zatoki Tokio`, `Czego?`],
    [`Nadchodzi znad {word}`, `ocean`, `oceanu`, `Czego?`],
    [`Spadło znad {word}`, `jej lewe ramię`, `jej lewego ramienia`, `Czego?`]
  ),
  dopełniaczPreposition(
    [
      `Stracił przytomność z powodu {word}`,
      `wysoka gorączka`,
      `wysokiej gorączki`,
      `Czego?`,
    ],
    [
      `Zamierzasz umrzeć z powodu {word}`,
      `swój pokaz`,
      `swojego pokazu`,
      `Czego?`,
    ],
    [
      `Opuściłem ją z powodu {word}`,
      `własny lęk l.mn.`,
      `własnych lęków`,
      `Czego?`,
    ]
  ),
  dopełniaczPreposition(
    [
      `Stoi niebezpiecznie blisko {word}`,
      `duża kałuża`,
      `dużej kałuży`,
      `Czego?`,
    ],
    [`Musisz pozostać blisko {word}`, `powierzchnia`, `powierzchni`, `Czego?`],
    [
      `Jesteśmy blisko {word}`,
      `wyczerpanie zapasów`,
      `wyczerpania zapasów`,
      `Czego?`,
    ]
  ),
  dopełniaczPreposition(
    [`W motelu niedaleko {word}`, `lotnisko`, `lotniska`, `Czego?`],
    [
      `To znaleziono na skrzyżowaniu niedaleko {word}`,
      `te miejsce`,
      `tego miejsca`,
      `Czego?`,
    ],
    [`Jestem niedaleko {word}`, `ty`, `ciebie`, `Kogo?`]
  ),
];

const celownikSourceData: CardSourceData[] = [
  celownikVerb(
    [
      `Darować {word} tego.`,
      `Daruję {word} tego.`,
      `Darujesz {word} tego.`,
      `Darowałem {word} tego.`,
    ],
    [
      [`człowiek`, `człowiekowi`, `Komu?`],
      [`on`, `jemu`, `Komu?`],
      [`ona`, `jej`, `Komu?`],
    ]
  ),
  celownikVerb(
    [`Dawać {word}`, `Daję {word}`, `Dajesz {word}`, `Dawałem {word}`],
    [
      [`ja`, `mi/mnie`, `Komu?`],
      [`ona`, `jej`, `Komu?`],
      [`oni/one`, `im`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Dokuczać {word}`,
      `Dokuczam {word}`,
      `Dokuczasz {word}`,
      `Dokuczałem {word}`,
    ],
    [
      [`kot`, `kotu`, `Komu?`],
      [`on`, `jemu/mu`, `Komu?`],
      [`ona`, `jej`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Dziękować {word}`,
      `Dziękuję {word}`,
      `Dziękujesz {word}`,
      `Dziękowałem {word}`,
    ],
    [
      [`brat`, `bratu`, `Komu?`],
      [`dziennikarz `, `dziennikarzowi`, `Komu?`],
      [`urzędnik`, `urzędnikowi`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Dziwić się {word}`,
      `Dziwię się {word}`,
      `Dziwisz się {word}`,
      `Dziwiłem się {word}`,
    ],
    [
      [`ona`, `jej`, `Komu?`],
      [`to`, `temu`, `Czemu?`],
      [`twoje zachowanie`, `twojemu zachowaniu`, `Czemu?`],
    ]
  ),
  celownikVerb(
    [
      `Kibicować {word}`,
      `Kibicuję {word}`,
      `Kibicujesz {word}`,
      `Kibicowałem {word}`,
    ],
    [
      [`drużyna`, `drużynie`, `Czemu?`],
      [`on`, `jemu`, `Komu?`],
      [`swój mąż`, `swojemu mężowi`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Kraść {word} środki`,
      `Kradnę {word} środki`,
      `Kradniesz {word} środki`,
      `Kradłem {word} środki`,
    ],
    [
      [`ludzie`, `ludziom`, `Komu?`],
      [`rząd`, `rządowi`, `Komu?`],
      [`bogaci`, `bogatym`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Kupować {word} prezent`,
      `Kupuję {word} prezent`,
      `Kupujesz {word} prezent`,
      `Kupowałem {word} prezent`,
    ],
    [
      [`ona`, `jej`, `Komu?`],
      [`żona`, `żonie`, `Komu?`],
      [`mąż`, `mężowi`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Mówić {word} o tym`,
      `Mówię {word} o tym`,
      `Mówisz {word} o tym`,
      `Mówiłem {word} o tym`,
    ],
    [
      [`przyjaciel`, `przyjacielowi`, `Komu?`],
      [`pani`, `pani`, `Komu?`],
      [`pan sędzia`, `panu sędzi`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Oddawać datek {word}`,
      `Oddaję datek {word}`,
      `Oddajesz datek {word}`,
      `Oddawałem datek {word}`,
    ],
    [
      [`ksiądz`, `księdzu`, `Komu?`],
      [`organizacja charytatywna`, `organizacji charytatywnej`, `Czemu?`],
      [`uniwersytet`, `uniwersytetowi`, `Czemu?`],
    ]
  ),
  celownikVerb(
    [
      `Odmawiać {word}`,
      `Odmawiam {word}`,
      `Odmawiasz {word}`,
      `Odmawiałem {word}`,
    ],
    [
      [`król`, `królowi`, `Komu?`],
      [`książę`, `księciu`, `Komu?`],
      [`księżniczka`, `księżniczce`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Opowiadać {word} historii`,
      `Opowiadam {word} historii`,
      `Opowiadasz {word} historii`,
      `Opowiadałem {word} historii`,
    ],
    [
      [`dziecko l.mn.`, `dzieciom`, `Komu?`],
      [`turyst`, `turystom `, `Komu?`],
      [`chłopiec`, `chłopcu`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Podawać rękę {word} `,
      `Podaję rękę {word}`,
      `Podajesz rękę {word}`,
      `Podawałem rękę {word}`,
    ],
    [
      [`on`, `jemu/mu`, `Komu?`],
      [`prezes`, `prezesowi`, `Komu?`],
      [`lekarz`, `lekarzowi`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Podobać się {word}`,
      `Podobam się {word}`,
      `Podobasz się {word}`,
      `Podobałem się {word}`,
    ],
    [
      [`kobieta`, `kobiecie`, `Komu?`],
      [`mężczyzna`, `mężczyźnie`, `Komu?`],
      [`dziewczyna l.mn.`, `dziewczynom`, `Komu?`],
    ]
  ),
  celownikVerb(
    [`Pomagać {word}`, `Pomagam {word}`, `Pomagasz {word}`, `Pomagałem {word}`],
    [
      [`biedny l.mn.`, `biednym`, `Komu?`],
      [`zwierzęta`, `zwierzętom`, `Komu?`],
      [`dzieci`, `dzieciom`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Pożyczać {word} pieniądze `,
      `Pożyczam {word} pieniądze `,
      `Pożyczasz {word} pieniądze `,
      `Pożyczałem {word} pieniądze `,
    ],
    [
      [`on`, `jemu/mu`, `Komu?`],
      [`oni/one`, `im`, `Komu?`],
      [`ta firma`, `tej firmie`, `Czemu?`],
    ]
  ),
  celownikVerb(
    [
      `Przedstawiać {word} pannę Weronikę`,
      `Przedstawiam {word} pannę Weronikę`,
      `Przedstawiasz {word} pannę Weronikę`,
      `Przedstawiałem {word} pannę Weronikę`,
    ],
    [
      [`Wasza Wysokość`, `Waszej Wysokości`, `Komu?`],
      [`Państwo`, `Państwu`, `Komu?`],
      [`wy`, `wam`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Przyglądać się {word}`,
      `Przyglądam się {word}`,
      `Przyglądasz się {word}`,
      `Przyglądałem się {word}`,
    ],
    [
      [`każda twarz`, `każdej twarzy`, `Czemu?`],
      [`lusterko`, `lusterku`, `Czemu?`],
      [`okno`, `oknu`, `Czemu?`],
    ]
  ),
  celownikVerb(
    [
      `Przynosić {word} radość`,
      `Przynoszę {word} radość`,
      `Przynosisz {word} radość`,
      `Przynosiłem {word} radość`,
    ],
    [
      [`on`, `jemu/mu`, `Komu?`],
      [`dzieci`, `dzieciom`, `Komu?`],
      [`wszyscy`, `wszystkim`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Przypominać {word} o spotkaniu`,
      `Przypominam {word} o spotkaniu`,
      `Przypominasz {word} o spotkaniu`,
      `Przypominałem {word} o spotkaniu`,
    ],
    [
      [`Marta`, `Marcie`, `Komu?`],
      [`Jacek`, `Jackowi`, `Komu?`],
      [`student`, `studentowi`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Rozdawać {word} słodycze`,
      `Rozdaję {word} słodycze`,
      `Rozdajesz {word} słodycze`,
      `Rozdawałem {word} słodycze`,
    ],
    [
      [`dzieci`, `dzieciom`, `Komu?`],
      [`przechodni l.mn.`, `przechodnim`, `Komu?`],
      [`pacjent l.mn.`, `pacjentom`, `Komu?`],
    ]
  ),
  celownikVerb(
    [`Mięso smakuję {word}`, `Mięso smakowało {word}`],
    [
      [`niedźwiedź`, `niedźwiedziowi`, `Komu?`],
      [`wilk`, `wilkowi`, `Komu?`],
      [`tygrys`, `tygrysowi`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Sprzedawać {word} towary`,
      `Sprzedaję {word} towary`,
      `Sprzedajesz {word} towary`,
      `Sprzedawałem {word} towary`,
    ],
    [
      [`ludzie`, `ludziom`, `Komu?`],
      [`klient`, `klientowi`, `Komu?`],
      [`magazyn l.mn.`, `magazynom`, `Czemu?`],
    ]
  ),
  celownikVerb(
    [
      `Szkodzić {word}`,
      `Szkodzę {word}`,
      `Szkodzisz {word}`,
      `Szkodziłem {word}`,
    ],
    [
      [`środowisko`, `środowisku`, `Czemu?`],
      [`społeczność`, `społeczności`, `Czemu?`],
      [`reputacja`, `reputacji`, `Czemu?`],
    ]
  ),
  celownikVerb(
    [
      `Tłumaczyć {word} to`,
      `Tłumaczę {word} to`,
      `Tłumaczysz {word} to`,
      `Tłumaczyłem {word} to`,
    ],
    [
      [`sędzia`, `sędzi`, `Komu?`],
      [`on`, `jemu/mu`, `Komu?`],
      [`sobie`, `sobie`, `Komu?`],
    ]
  ),
  celownikVerb(
    [`Ufać {word}`, `Ufam {word}`, `Ufasz {word}`, `Ufałem {word}`],
    [
      [`niewłaściwe ludzie`, `niewłaściwym ludziom`, `Komu?`],
      [`dziennikarz l.mn.`, `dziennikarzom`, `Komu?`],
      [`lekarz`, `lekarzom`, `Komu?`],
    ]
  ),
  celownikVerb(
    [`Wierzyć {word}`, `Wierzę {word}`, `Wierzysz {word}`, `Wierzyłem {word}`],
    [
      [`Kamil`, `Kamilowi`, `Komu?`],
      [`dziennikarz l.mn.`, `dziennikarzom`, `Komu?`],
      [`lekarz`, `lekarzom`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Wybaczać {word}`,
      `Wybaczam {word}`,
      `Wybaczasz {word}`,
      `Wybaczałem {word}`,
    ],
    [
      [`Ania`, `Ani`, `Komu?`],
      [`pies`, `psu`, `Komu?`],
      [`papuga`, `papudze`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Nie zazdrościć {word}`,
      `Nie zazdroszczę {word}`,
      `Nie zazdrościsz {word}`,
      `Nie zazdrości {word}`,
    ],
    [
      [`nikt`, `nikomu`, `Komu?`],
      [`Michał`, `Michałowi`, `Komu?`],
      [`pracownik`, `pracownikowi`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Życzyć {word} miłego dnia`,
      `Życzę {word} miłego dnia`,
      `Życzysz {word} miłego dnia`,
      `Życzyłem {word} miłego dnia`,
    ],
    [
      [`wszyscy`, `wszystkim`, `Komu?`],
      [`kolega l.mn.`, `kolegom`, `Komu?`],
      [`kolega`, `koledze`, `Komu?`],
    ]
  ),
  celownikPreposition(
    [`Dzięki {word} jestem żywy!`, `Bog`, `Bogu`, `Komu?`],
    [`Znalazłem go dzięki {word} `, `ty`, `tobie`, `Komu?`],
    [
      `Zostali wypuszczeni dzięki {word}!`,
      `starania ambasady`,
      `staraniom ambasady`,
      `Czemu?`,
    ]
  ),
  celownikPreposition(
    [`Obłok zmierza prosto ku {word}`, `miasto`, `miastu`, `Czemu?`],
    [`Wielki krok ku {word}`, `dorosłość`, `dorosłości`, `Czemu?`],
    [
      `Pchnęła jego ku {word}`,
      `negatywne emocje`,
      `negatywnym emocjom`,
      `Czemu?`,
    ],
    [`Nie żywię wrogich uczuć ku {word}`, `ty`, `tobie`, `Komu?`]
  ),
  celownikPreposition(
    [`Idę naprzeciw {word}`, `system`, `systemowi`, `Czemu?`],
    [
      `Postępy wychodzą naprzeciw {word}`,
      `oczekiwanie l.mn.`,
      `oczekiwaniom`,
      `Czemu?`,
    ],
    [`Wyszedł naprzeciw {word}`, `stanowisko Rady`, `stanowisku Rady`, `Czemu?`]
  ),
  celownikPreposition(
    [`Zrobiłam to na przekór {word}`, `tata`, `tacie`, `Komu?`],
    [`Walczymy na przekór {word}`, ` wszystko`, ` wszystkiemu`, `Czemu?`],
    [`Na przekór {word}`, `tradycja`, `tradycji`, `Czemu?`]
  ),
  celownikPreposition(
    [`Zazdrość może zwrócić brata przeciw {word}`, `brat`, `bratu`, `Komu?`],
    [`On jest przeciwko {word}`, `my`, `nam`, `Komu?`],
    [
      `To jest sensowny argument przeciw {word}`,
      `moja opinia`,
      `mojej opinii`,
      `Czemu?`,
    ]
  ),
  celownikPreposition(
    [`Postępuję wbrew {word}`, `logika`, `logice`, `Czemu?`],
    [`Postępuję wbrew {word}`, `przepis l.mn.`, `przepisom`, `Czemu?`],
    [`Przetrzymuje człowieka wbrew {word}`, `jego wola`, `jego woli`, `Czemu?`]
  ),
];

const biernikSourceData: CardSourceData[] = [
  biernikVerb(
    [`Mieć {word}`, `Mam {word}`, `Masz {word}`, `Miałem {word}`],
    [
      [`matka`, `matkę`, `Kogo?`],
      [`dziadek`, `dziadka`, `Kogo?`],
      [`babcia`, `babcię`, `Kogo?`],
      [`czas`, `czas`, `Co?`],
    ]
  ),
  biernikVerb(
    [`Lubić {word}`, `Lubię {word}`, `Lubisz {word}`, `Lubiłem {word}`],
    [
      [`wiele rzcecz l.mn.`, `wiele rzeczy`, `Co?`],
      [`siebie`, `siebie`, `Kogo?`],
      [`historia l.mn.`, `historie`, `Co?`],
    ]
  ),
  biernikVerb(
    [
      `Kochać {word} i zamierzam ją poślubić`,
      `Kocham {word} i zamierzam ją poślubić`,
      `Kochasz {word} i zamierzam ją poślubić`,
      `Kochałem {word} i zamierzam ją poślubić`,
    ],
    [
      [`pańska córka`, `pańską córkę`, `Kogo?`],
      [`Kasia`, `Kasię`, `Kogo?`],
      [`ta barmenka`, `tę barmankę`, `Kogo?`],
    ]
  ),
  biernikVerb(
    [`Widzieć {word}`, `Widzę {word}`, `Widzisz {word}`, `Widziałem {word}`],
    [
      [`tamten samochód`, ``, `Co?`],
      [`szersza perspektywa`, `szerszą perspektywę`, `Co?`],
      [`on`, `jego`, `Kogo?`],
    ]
  ),
  biernikVerb(
    [`Jeść {word}`, `Jem {word}`, `Jesz {word}`, `Jadłem {word}`],
    [
      [`mięso`, `mięso`, `Co?`],
      [`fasola`, `fasolę `, `Co?`],
      [`ciasto l.mn.`, `ciasta`, `Co?`],
      [`rysz`, `rysz`, `Co?`],
      [`kasza`, `kaszę`, `Co?`],
    ]
  ),
  biernikVerb(
    [`Pić {word}`, `Piję {word}`, `Pijesz {word}`, `Piłem {word}`],
    [
      [`krew`, `krew`, `Co?`],
      [`piwo, wino, wódka`, `piwo, wino, wódkę`, `Co?`],
      [`szampan`, `szampana`, `Co?`],
    ]
  ),
  biernikVerb(
    [`Znać {word}`, `Znam {word}`, `Znasz {word}`, `Znałem {word}`],
    [
      [`ich sekret`, `ich sekre`, `Co?`],
      [`strach przed przegraną`, `strach przed przegraną`, `Co?`],
      [`polskie prawo`, `polskie prawo`, `Co?`],
    ]
  ),
  biernikVerb(
    [`Czytać {word}`, `Czytam {word}`, `Czytasz {word}`, `Czytałem {word}`],
    [
      [`wiadomość l.mn. w internecie`, `wiadomości w internecie`, `Co?`],
      [`komentarz l.mn. na tej stronie`, `komentarzy na tej stronie`, `Co?`],
      [`książka w telefonie`, `książkę w telefonie`, `Co?`],
    ]
  ),
  biernikVerb(
    [`Pisać {word}`, `Piszę {word}`, `Piszesz {word}`, `Pisałem {word}`],
    [
      [`mail do szefa`, `maila do szefa`, `Co?`],
      [`list do tej gazety`, `list do tej gazety`, `Co?`],
      [`coś na ścianie`, `coś na ścianie`, `Co?`],
    ]
  ),
  biernikVerb(
    [
      `Sprzątać {word}`,
      `Sprzątam {word}`,
      `Sprzątasz {word}`,
      `Sprzątałem {word}`,
    ],
    [
      [`mieszkanie`, `mieszkanie`, `Co?`],
      [`biurko`, `biurko`, `Co?`],
      [`cudze bałagany`, `cudze bałagany`, `Co?`],
    ]
  ),
  biernikVerb(
    [`Oglądać {word}`, `Oglądam {word}`, `Oglądasz {word}`, `Oglądałem {word}`],
    [
      [`film`, `film`, `Co?`],
      [`pacjent`, `pacjenta`, `Kogo?`],
      [`zdjęcia`, `zdjęcia`, `Co?`],
    ]
  ),
  biernikVerb(
    [`Kupować {word}`, `Kupuję {word}`, `Kupujesz {word}`, `Kupowałem {word}`],
    [
      [`prezenty swoim kochankom`, `prezenty swoim kochankom`, `Co?`],
      [`różna rzecz`, `różne rzeczy`, `Co?`],
      [`ubrania w dziale dla dzieci`, `ubrania w dziale dla dzieci`, `Co?`],
    ]
  ),
  biernikVerb(
    [`Gotować {word}`, `Gotuję {word}`, `Gotujesz {word}`, `Gotowałem {word}`],
    [
      [`kolacja dla wszystkich`, `kolację dla wszystkich`, `Co?`],
      [`śniadanie`, `śniadanie`, `Co?`],
      [`lunch`, `lunch`, `Co?`],
    ]
  ),
  biernikPreposition(
    [`Jechaliśmy przez {word}`, `tunel w górże`, `tunel w górże`, `Co?`],
    [
      `Skuteczność nabycia majątku przez {word}`,
      `osoba trzecia`,
      `osobę trzecią`,
      `Kogo?`,
    ],
    [`Zbyt martwisz się przez {word}`, `on`, `niego`, `Kogo?`]
  ),
  biernikPreposition(
    [
      `Jednakowe traktowanie pracowników bez względu na {word}`,
      `narodowość`,
      `narodowość`,
      `Co?`,
    ],
    [`Wyruszamy bez względu na {word}`, `ich gotowość`, `ich gotowość`, `Co?`],
    [
      `Odpowiedzialność bez względu na {word}`,
      `stanowisko`,
      `stanowisko`,
      `Co?`,
    ]
  ),
  biernikPreposition(
    [
      `Wybraliśmy biurowiec ze względu na jego {word}`,
      `dogodna lokalizacja`,
      `dogodną lokalizację `,
      `Co?`,
    ],
    [
      `Poszedł na urlop ze względu na {word}`,
      `problem osobisty l.mn.`,
      `problemy osobiste`,
      `Co?`,
    ],
    [`Zostałem w domu ze względu na {word}`, `pogoda`, `pogodę`, `Co?`]
  ),
  biernikPreposition(
    [`Współpracuje z FBI w zamian za {word}`, `immunitet`, `immunitet`, `Co?`],
    [`W zamian za {word}`, `pomoc`, `pomoc`, `Co?`],
    [`Milion dolarów w zamian za {word}`, `dusza`, `duszę`, `Co?`]
  ),
  biernikPreposition(
    [
      `Z uwagi na {word}`,
      `trudna sytuacja epidemiczna`,
      `trudną sytuację epidemiczną`,
      `Co?`,
    ],
    [
      `Z uwagi na {word}`,
      `brak łączności komórkowej `,
      `brak łączności komórkowej`,
      `Co?`,
    ],
    [
      `Może tam pracować z uwagi na {word}`,
      `umiejętność l.mn.`,
      `umiejętności`,
      `Co?`,
    ]
  ),
  biernikPreposition(
    [`Patrzy na {word}`, `ściana`, `ścianę`, `Co?`],
    [`Pajak wlazł na {word}`, `sufit`, `sufit`, `Co?`],
    [`Odrzucił koc na {word}`, `podłoga`, `podłogę`, `Kogo?`]
  ),
  biernikPreposition(
    [`Chodzi o {word}`, `pieniądz l.mn.`, `pieniądze`, `Co?`],
    [`Spierać się o {word}`, `oczywiste rzeczy`, `oczywiste rzeczy`, `Co?`],
    [`Szef pyta o {word}`, `jakość produktów`, `jakość produktów`, `Co?`],
    [`Szef pyta o {word}`, `ten projekt`, `ten projekt`, `Co?`],
    [`Szef pyta o {word}`, `jego zdanie`, `jego zdanie`, `Co?`]
  ),
  biernikPreposition(
    [`Posłałem po {word}`, `on`, `niego`, `Kogo?`],
    [`Poszłam po {word}`, `lekarz`, `lekarza`, `Kogo?`],
    [`Jedzie po {word}`, `Maciej`, `Macieja`, `Kogo?`]
  ),
  biernikPreposition(
    [`Poszedł pod {word}`, `prysznic`, `prysznic`, `Co?`],
    [`Idź prosto pod {word}`, `most`, `most`, `Co?`],
    [`Chodź tu... pod {word}`, `drzewo`, `drzewo`, `Co?`]
  ),
  biernikPreposition(
    [`A jutro rano jedziemy nad {word}`, `morze`, `morze`, `Co?`],
    [`Ruszam nad {word}`, `jezioro`, `jezioro`, `Co?`],
    [`Pojechałem nad {word}`, `rzekę`, `rzekę`, `Co?`]
  ),
  biernikPreposition(
    [`Sprzedałem ponad {word}`, `milion sztuk`, `milion sztuk`, `Co?`],
    [`Czekałem ponad {word}`, `godzina`, `godzinę`, `Co?`],
    [
      `Dobro firmy ponad {word}`,
      `uczucie osobiste l.mn.`,
      `uczucia osobiste`,
      `Co?`,
    ]
  ),
  biernikPreposition(
    [`Dałem czterdzieści tysięcy za {word}`, `samochód`, `samochód`, `Co?`],
    [`Nie możemy podejmować decyzji za {word}`, `ona`, `nią`, `Kogo?`],
    [`Zapłacę ci za {word} kiedy wrócę `, `on`, `niego`, `Kogo?`]
  ),
  biernikPreposition(
    [`Zajechali przed {word}`, `budynek`, `budynek`, `Co?`],
    [
      `Zamiast przed {word} trafiła do zakładu karnego `,
      `ołtarz`,
      `ołtarz`,
      `Co?`,
    ],
    [`Znów trafię przed {word}`, `sędzia`, `sędzię`, `Kogo?`]
  ),
  biernikPreposition(
    [`On nie wszedł między {word}`, `my`, `nas`, `Kogo?`],
    [`Włożył ją między {word}`, `pośladek l.mn.`, `pośladki`, `Co?`],
    [`Dzielenie tekstu między {word}`, `kolumny`, `kolumny`, `Co?`]
  ),
  biernikPreposition(
    [`Wyszłaś poza {word}, prawda? `, `mur`, `mur`, `Co?`],
    [`Poza {word} miasta`, `granica`, `granicę`, `Co?`],
  ),
  biernikPreposition(
    [`Patrzał w moje {word}`, `oko l.mn.`, `oczy`, `Co?`],
    [`Musisz wkroczyć w {word}`, `pustka`, `pustkę`, `Co?`],
    [`Leci w {word}`, `niebo`, `niebo`, `Co?`]
  ),
];

const casesSourceData: CardSourceData[] = [
  ...dopełniaczSourceData,
  ...celownikSourceData,
];

export function getCaseData(
  cardsToGeneratePerCase = 100, // essentially means 'all'
  orderById = false,
  currentSourceToPreserveMarked: Card[] = []
): Card[] {
  const cardsToPreserve = currentSourceToPreserveMarked.filter(
    (x) => x.isMarked
  );
  const preservedCardIds = new Set(cardsToPreserve.map((x) => x.id));
  const addableCards = casesSourceData.filter(
    (x) => preservedCardIds.has(x.id) === false
  );
  const addableCardsDict = groupBy(addableCards, (x) => x.caseName);

  const newStateDict = groupBy(cardsToPreserve, (x) => x.caseName);
  for (const [cse, availableCards] of Object.entries(addableCardsDict)) {
    if (!(cse in newStateDict)) {
      newStateDict[cse] = [];
    }

    const cardsInThisCase = newStateDict[cse];
    const addableCardsForThisCase = shuffleAndReturnArr(availableCards);
    while (
      cardsInThisCase.length < cardsToGeneratePerCase &&
      addableCardsForThisCase.length > 0
    ) {
      const newCard = addableCardsForThisCase.pop()!;

      const texts = newCard.getRandomizedExample();

      const s: Card = {
        id: newCard.id,
        caseName: newCard.caseName,
        isCaseNameOpened: false,
        isTextOpened: false,
        isMarked: false,
        textWhenOpened: texts[1],
        textWhenClosed: texts[0],
      };

      cardsInThisCase.push(s);
    }
  }

  const sourceData = Object.values(newStateDict).flatMap((x) => x);

  if (orderById) {
    sourceData.sort((a, b) => a.id - b.id);
  } else {
    shuffleAndReturnArr(sourceData);
  }

  return sourceData;
}
