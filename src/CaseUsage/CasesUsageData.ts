import groupBy from "lodash.groupby";
import { getRandomItem, shuffleAndReturnArr } from "../util";

export const cases = {
  dopełniacz: `Dopełniacz`,
  celownik: `Celownik`,
  biernik: `Biernik`,
  narzędnik: `Narzędnik`,
  miejscownik: `Miejscownik`,
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
  textBare: string;
};

type CardSourceData = {
  caseName: CaseName;
  id: number;
  getRandomizedExample: () => [string, string, string];
};

let counter = 1;

const forCaseMatrixChoice =
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
          template.replace("{word}", `${opened}`),
        ] as [string, string, string];
      },
    };
  };

const forCaseListChoice =
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
          template.replace("{word}", `${opened}`),
        ] as [string, string, string];
      },
    };
  };

const dopełniaczMatrixChoice = forCaseMatrixChoice(cases.dopełniacz);
const celownikMatrixChoice = forCaseMatrixChoice(cases.celownik);
const biernikMatrixChoice = forCaseMatrixChoice(cases.biernik);
const narzędnikMatrixChoice = forCaseMatrixChoice(cases.narzędnik);
const miejscownikMatrixChoice = forCaseMatrixChoice(cases.miejscownik);

const dopełniaczListChoice = forCaseListChoice(cases.dopełniacz);
const celownikListChoice = forCaseListChoice(cases.celownik);
const biernikListChoice = forCaseListChoice(cases.biernik);
const narzędnikListChoice = forCaseListChoice(cases.narzędnik);
const miejscownikListChoice = forCaseListChoice(cases.miejscownik);

const dopełniaczSourceData: CardSourceData[] = [
  dopełniaczListChoice(
    [
      `{word}`,
      `1 styczeń 2000`,
      `Pierwszego stycznia dwutysięcznego roku`,
      `Czego?`,
    ],
    [
      `{word}`,
      `10 luty 1965`,
      `Dziesiątego lutego tysiąc dziewięćset sześćdziesiątego piątego roku`,
      `Czego?`,
    ],
    [
      `{word}`,
      `31 grudzień 1999`,
      `Trzydziestego pierwszego grudnia tysiąc dziewięćset dziewięćdziesiątego dziewiątego roku`,
      `Czego?`,
    ]
  ),
  dopełniaczListChoice(
    [
      `{word}`,
      `12 marzec 1987`,
      `Dwunastego marca tysiąc dziewięćset osiemdziesiątego siódmego roku`,
      `Czego?`,
    ],
    [
      `{word}`,
      `20 kwiecień 1992`,
      `Dwudziestego kwietnia tysiąc dziewięćset dziewięćdziesiątego drugiego roku`,
      `Czego?`,
    ],
    [
      `{word}`,
      `15 maj 1943`,
      `Piętnastego maja tysiąc dziewięćset czterdziestego trzeciego roku`,
      `Czego?`,
    ]
  ),
  dopełniaczListChoice(
    [
      `{word}`,
      `18 czerwiec 2005`,
      `Osiemnastego czerwca dwa tysiące piątego roku`,
      `Czego?`,
    ],
    [
      `{word}`,
      `28 lipiec 2021`,
      `Dwudziestego ósmego lipca dwa tysiące dwudziestego pierwszego roku`,
      `Czego?`,
    ],
    [
      `{word}`,
      `25 sierpień 1832`,
      `Dwudziestego piątego sierpnia tysiąc osiemsetnego trzydziestego drugiego roku`,
      `Czego?`,
    ]
  ),
  dopełniaczListChoice(
    [
      `{word}`,
      `30 wrzesień 2012`,
      `Trzydziestego wrzesnia dwa tysiące dwunastego roku`,
      `Czego?`,
    ],
    [
      `{word}`,
      `4 październik 1900`,
      `Czwarte października tysiąc dziewięćsetnego roku`,
      `Czego?`,
    ],
    [
      `{word}`,
      `11 listopad 1918`,
      `Jedenastego listopada tysiąc dziewięćset osiemnastego roku`,
      `Czego?`,
    ]
  ),
  dopełniaczListChoice(
    [`Pudełko {word}`, `czekoladka l.mn.`, `czekoladek`, `Czego?`],
    [`Puszka {word}`, `piwo`, `piwa`, `Czego?`],
    [`Paczka {word}`, `cukier`, `cukru`, `Czego?`]
  ),
  dopełniaczListChoice(
    [`Talerz {word}`, `zupa`, `zupy`, `Czego?`],
    [`Kubek {word}`, `kawa`, `kawy`, `Czego?`],
    [`Garnek {word}`, `woda`, `wody`, `Czego?`]
  ),
  dopełniaczListChoice(
    [`Metr {word}`, `tapeta`, `tapety`, `Czego?`],
    [`Kilogram {word}`, `herbata`, `herbaty`, `Czego?`],
    [`Metr szescienny {word}`, `próżnia`, `próżni`, `Czego?`]
  ),
  dopełniaczListChoice(
    [`Pięć {word}`, `rok`, `lat`, `Czego?`],
    [`Dziewięć {word}`, `życie`, `żyć`, `Czego?`],
    [`Sto {word}`, `obiekt`, `obiektów`, `Czego?`]
  ),
  dopełniaczMatrixChoice(
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
  dopełniaczMatrixChoice(
    [`Brakuję mi {word}`, `Brakuję ci {word}`, `Brakowało ci {word}`],
    [
      [`pieniądz l.mn.`, `pieniędzy`, `Czego?`],
      [`czas`, `czasu`, `Czego?`],
      [`siła l.mn.`, `sił`, `Czego?`],
      [`one/one`, `ich`, `Kogo?`],
    ]
  ),
  dopełniaczMatrixChoice(
    [
      `Pilnować {word}`,
      `Pilnuję {word}`,
      `Pilnujesz {word}`,
      `Pilnowałem {word}`,
    ],
    [
      [`własny interes l. mn.`, `własnych interesów`, `Czego?`],
      [`rzecz l.mn.`, `rzeczy`, `Czego?`],
      [`dziecko`, `dziecka`, `Kogo?`],
      [`on`, `jego/go`, `Kogo?`],
    ]
  ),
  dopełniaczMatrixChoice(
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
  dopełniaczMatrixChoice(
    [`Słuchać {word}`, `Slucham {word}`, `Sluchasz {word}`, `Słuchałem {word}`],
    [
      [`pani`, `pani`, `Kogo?`],
      [`ojciec`, `ojca`, `Kogo?`],
      [`dziecko l.mn.`, `dzieci`, `Kogo?`],
      [`my`, `nas`, `Kogo?`],
    ]
  ),
  dopełniaczMatrixChoice(
    [`Szukać {word}`, `Szukam {word}`, `Szukasz {word}`, `Szukałem {word}`],
    [
      [`kot`, `kota`, `Kogo?`],
      [`ojciec`, `ojca`, `Kogo?`],
      [`pieniądz l.mn.`, `pieniędzy`, `Czego?`],
    ]
  ),
  dopełniaczMatrixChoice(
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
  dopełniaczMatrixChoice(
    [`Używać {word}`, `Używam {word}`, `Używasz {word}`, `Używałem {word}`],
    [
      [`ten kryterium`, `tego kryterium`, `Czego?`],
      [`produkt`, `produktu`, `Czego?`],
      [`lek`, `leku`, `Czego?`],
    ]
  ),
  dopełniaczMatrixChoice(
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
  dopełniaczMatrixChoice(
    [`Żałować {word}`, `Żałuję {word}`, `Żałujesz {word}`, `Żałowałem {word}`],
    [
      [`pieniądz l.mn.`, `pieniędzy`, `Czego?`],
      [`czegokolwiek`, `czegokolwiek`, `Czego?`],
      [`zmarnowana szansa`, `zmarnowanej szansy`, `Czego?`],
    ]
  ),
  dopełniaczMatrixChoice(
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
  dopełniaczMatrixChoice(
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
  dopełniaczMatrixChoice(
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
  dopełniaczListChoice(
    [`Kawa bez {word}`, `cukier`, `cukru`, `Czego?`],
    [`Lek bez {word}`, `opakownie`, `opakowania`, `Czego?`],
    [`Działać bez {word}`, `wątpienie`, `wątpienia`, `Czego?`]
  ),
  dopełniaczListChoice(
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
  dopełniaczListChoice(
    [`Srodki do {word}`, `wykorzystanie`, `wykorzystania`, `Czego?`],
    [`Nalewać do {word}`, `filiżanka`, `filiżanki`, `Czego?`],
    [`Kandydat do {word}`, `dołączenie`, `dołączenia`, `Czego?`]
  ),
  dopełniaczListChoice(
    [`Podróż dookola {word}`, `świat`, `świata`, `Czego?`],
    [`Skóra dookoła {word}`, `rana`, `rany`, `Czego?`],
    [`Rośliny dookoła {word}`, `my`, `nas`, `Kogo?`]
  ),
  dopełniaczListChoice(
    [`Stał obok {word}`, `on`, `niego`, `Kogo?`],
    [`Siadaj obok {word}`, `ja`, `mnie`, `Kogo?`],
    [`Siedzieć obok moich {word}`, `rodzice`, `rodziców`, `Kogo?`]
  ),
  dopełniaczListChoice(
    [`Stał kolo {word}`, `dom`, `domu`, `Czego?`],
    [`Stał kolo {word}`, `ja`, `mnie`, `Kogo?`]
  ),
  dopełniaczListChoice(
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
  dopełniaczListChoice(
    [`Siedzi naprzeciwko {word}`, `ja`, `mnie`, `Kogo?`],
    [`Siedzieliśmy naprzeciwko {word}`, `siebie`, `siebie`, `Kogo?`],
    [
      `Sklep naprzeciwko {word}`,
      `miejsce spotkania`,
      `miejsca spotkania`,
      `Czego?`,
    ]
  ),
  dopełniaczListChoice(
    [`Mieszkam tutaj od {word}`, `lata`, `lat`, `Czego?`],
    [`Wiadomości od {word}`, `siostra`, `siostry`, `Kogo?`],
    [
      `8 godzin od {word}`,
      `przedawkowanie leku`,
      `przedawkowania leku`,
      `Czego?`,
    ]
  ),
  dopełniaczListChoice(
    [`Egzamin trwa oklo {word}`, `cztery godziny`, `czterech godzin`, `Czego?`],
    [`Miała okolo {word}`, `dwadzieścia lat`, `dwudziestu lat`, `Czego?`],
    [`Miał okolo {word}`, `pięćdziesiąt lat`, `pięćdziesięciu lat`, `Czego?`]
  ),
  dopełniaczListChoice(
    [`Cała załoga prócz {word} ewakuowała się`, `kapitan`, `kapitana`, `Kogo?`],
    [`Nie ma innego znaczenia prócz {word}`, `to`, `tego`, `Czego?`],
    [`Nie lubię nikogo, prócz {word}`, `ty`, `ciebie`, `Kogo?`]
  ),
  dopełniaczListChoice(
    [`Każdy ma samochód oprócz {word}`, `ja`, `mnie`, `Kogo?`],
    [`Nie przepuszczaj nikogo oprócz {word}`, `on`, `niego`, `Kogo?`],
    [`Wszystkie oprócz {word}`, `jedna`, `jednej`, `Kogo?`]
  ),
  dopełniaczListChoice(
    [`Nauczyłam się tego podczas {word}`, `warsztaty`, `warsztatów`, `Czego?`],
    [
      `Wystąpił problem podczas {word}`,
      `tworzenie dokumentu`,
      `tworzenia dokumentu`,
      `Czego?`,
    ],
    [`Opieka lekarska podczas {word}`, `ciąża`, `ciąży`, `Czego?`]
  ),
  dopełniaczListChoice(
    [`Poziom poniżej {word}`, `norma`, `normy`, `Czego?`],
    [
      `Prawdopodobieństwo poniżej {word}`,
      `pięc procent`,
      `pięciu procent`,
      `Czego?`,
    ],
    [`Boli mnie poniżej {word}`, `żebra`, `żeber`, `Czego?`]
  ),
  dopełniaczListChoice(
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
  dopełniaczListChoice(
    [`Wyszedł spod {word}`, `kontrola`, `kontroli`, `Czego?`],
    [`Wyszła spod {word}`, `kontrola`, `kontroli`, `Czego?`],
    [`Próbki skóry spod {word}`, `jej paznokci`, `jej paznokci`, `Czego?`],
    [`Wyrwę się spod {word}`, `to wszystkie`, `tego wszystkiego`, `Czego?`]
  ),
  dopełniaczListChoice(
    [`Wybieram spomiędzy {word}`, `cztery opcji`, `czterech opcji`, `Czego?`],
    [`Brud spomiędzy {word}`, `płytka l.mn.`, `płytek`, `Czego?`],
    [`Ktoś spomiędzy {word}`, `wy`, `was`, `Kogo?`]
  ),
  dopełniaczListChoice(
    [
      `Wybiera przewodniczącego spośród {word}`,
      `przedstawiciel l.mn.`,
      `przedstawicieli`,
      `Kogo?`,
    ],
    [`Jesteś spośród {word}`, `kandydat l.mn.`, `kandydatów`, `Kogo?`],
    [`Największe spośród {word}`, `siedem mórz`, `siedmiu mórz`, `Czego?`]
  ),
  dopełniaczListChoice(
    [`Powiedz komuś spoza {word}`, `rodzina`, `rodziny`, `Czego?`],
    [`Klienci spoza {word}`, `terytorium kraju`, `terytorium kraju`, `Czego?`],
    [`Szukamy kogoś, spoza {word}`, `społeczeństwo`, `społeczeństwa`, `Czego?`]
  ),
  dopełniaczListChoice(
    [`Kanapka sprzed {word}`, `trzy dni`, `trzech dni`, `Czego?`],
    [`To model sprzed {word}`, `rok`, `roku`, `Czego?`],
    [`Został skradziony sprzed {word}`, `nasze nosy`, `naszych nosów`, `Czego?`]
  ),
  dopełniaczListChoice(
    [`Jestem u {word}`, `dentysta`, `dentysty`, `Kogo?`],
    [`Jestem u {word}`, `ja`, `siebie`, `Kogo?`],
    [`Umówić wizytę u {word}`, `lekarz`, `lekarza`, `Kogo?`]
  ),
  dopełniaczListChoice(
    [`Dam wam oferty w ciągu {word}`, `godzina`, `godziny`, `Czego?`],
    [`Potrafię to zrobić w ciągu {word}`, `tydzień`, `tygodnia`, `Czego?`],
    [
      `Posunięcia w ciągu {word}`,
      `ostatnie trzy dni`,
      `ostatnich trzech dni`,
      `Czego?`,
    ]
  ),
  dopełniaczListChoice(
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
  dopełniaczListChoice(
    [`Środki karne w razie {word}`, `naruszenie`, `naruszenia`, `Czego?`],
    [`W razie {word}`, `odwołanie`, `odwołania`, `Czego?`],
    [`Ubezpieczenie w razie {word}`, `wypadek`, `wypadku`, `Czego?`]
  ),
  dopełniaczListChoice(
    [`Być wśród {word}`, `znajomy l.mn.`, `znajomych`, `Kogo?`],
    [`Wybór wśród {word}`, `tyle ludzi`, `tylu ludzi`, `Kogo?`],
    [`Rywalizacja wśród {word}`, `kumpel l.mn.`, `kumpli`, `Kogo?`]
  ),
  dopełniaczListChoice(
    [`W punktach wzdłuż {word}`, `cała trassa`, `całej trasy`, `Czego?`],
    [
      `Przyszłość nie podąża wzdłuż {word}`,
      `pojedyńcza droga`,
      `pojedyńczej drogi`,
      `Czego?`,
    ],
    [`płyń wzdłuż {word}`, `wybrzeże`, `wybrzeży`, `Czego?`]
  ),
  dopełniaczListChoice(
    [`Jestem z {word}`, `Urząd`, `Urzędu`, `Czego?`],
    [`Jestem z {word}`, `Polska`, `Polski`, `Czego?`],
    [`Jestem z {word}`, `przyszłość`, `przyszłości`, `Czego?`]
  ),
  dopełniaczListChoice(
    [`Wybrałam Ciebie zamiast {word}`, `oni`, `ich`, `Kogo?`],
    [`Granatowy zamiast {word}`, `niebieski`, `niebieskiego`, `Czego?`],
    [`Kłamstwo zamiast {word}`, `prawda`, `prawdy`, `Czego?`]
  ),
  dopełniaczListChoice(
    [`Nadajemy na żywo znad {word}`, `Zatoka Tokio`, `Zatoki Tokio`, `Czego?`],
    [`Nadchodzi znad {word}`, `ocean`, `oceanu`, `Czego?`],
    [`Spadło znad {word}`, `jej lewe ramię`, `jej lewego ramienia`, `Czego?`]
  ),
  dopełniaczListChoice(
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
  dopełniaczListChoice(
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
  dopełniaczListChoice(
    [`W motelu niedaleko {word}`, `lotnisko`, `lotniska`, `Czego?`],
    [
      `To znaleziono na skrzyżowaniu niedaleko {word}`,
      `te miejsce`,
      `tego miejsca`,
      `Czego?`,
    ],
    [`Jestem niedaleko {word}`, `ty`, `ciebie`, `Kogo?`]
  ),
  celownikMatrixChoice(
    [`Widzi {word}`],
    [
      [`ja`, `mnie`, `Kogo?`],
      [`ty`, `ciebie`, `Kogo?`],
      [`on`, `jego`, `Kogo?`],
      [`ona`, `jej`, `Kogo?`],
      [`ono`, `jego`, `Kogo?`],
      [`my`, `nas`, `Kogo?`],
      [`wy`, `was`, `Kogo?`],
      [`oni`, `ich`, `Kogo?`],
      [`one`, `ich`, `Kogo?`],
    ]
  ),
];

const celownikSourceData: CardSourceData[] = [
  celownikListChoice([`Miło {word}`, `ja`, `mi`, `Komu?`]),
  celownikMatrixChoice(
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
  celownikMatrixChoice(
    [`Dawać {word}`, `Daję {word}`, `Dajesz {word}`, `Dawałem {word}`],
    [
      [`ja`, `mi/mnie`, `Komu?`],
      [`ona`, `jej`, `Komu?`],
      [`oni/one`, `im`, `Komu?`],
    ]
  ),
  celownikMatrixChoice(
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
  celownikMatrixChoice(
    [
      `Dziękować {word}`,
      `Dziękuję {word}`,
      `Dziękujesz {word}`,
      `Dziękowałem {word}`,
    ],
    [
      [`brat`, `bratu`, `Komu?`],
      [`dziennikarz`, `dziennikarzowi`, `Komu?`],
      [`urzędnik`, `urzędnikowi`, `Komu?`],
    ]
  ),
  celownikMatrixChoice(
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
  celownikMatrixChoice(
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
  celownikMatrixChoice(
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
  celownikMatrixChoice(
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
  celownikMatrixChoice(
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
  celownikMatrixChoice(
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
  celownikMatrixChoice(
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
  celownikMatrixChoice(
    [
      `Opowiadać {word} historii`,
      `Opowiadam {word} historii`,
      `Opowiadasz {word} historii`,
      `Opowiadałem {word} historii`,
    ],
    [
      [`dziecko l.mn.`, `dzieciom`, `Komu?`],
      [`turyst`, `turystom`, `Komu?`],
      [`chłopiec`, `chłopcu`, `Komu?`],
    ]
  ),
  celownikMatrixChoice(
    [
      `Podawać rękę {word}`,
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
  celownikMatrixChoice(
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
  celownikMatrixChoice(
    [`Pomagać {word}`, `Pomagam {word}`, `Pomagasz {word}`, `Pomagałem {word}`],
    [
      [`biedny l.mn.`, `biednym`, `Komu?`],
      [`zwierzęta`, `zwierzętom`, `Komu?`],
      [`dzieci`, `dzieciom`, `Komu?`],
    ]
  ),
  celownikMatrixChoice(
    [
      `Pożyczać {word} pieniądze`,
      `Pożyczam {word} pieniądze`,
      `Pożyczasz {word} pieniądze`,
      `Pożyczałem {word} pieniądze`,
    ],
    [
      [`on`, `jemu/mu`, `Komu?`],
      [`oni/one`, `im`, `Komu?`],
      [`ta firma`, `tej firmie`, `Czemu?`],
    ]
  ),
  celownikMatrixChoice(
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
  celownikMatrixChoice(
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
  celownikMatrixChoice(
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
  celownikMatrixChoice(
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
  celownikMatrixChoice(
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
  celownikMatrixChoice(
    [`Mięso smakuje {word}`, `Mięso smakowało {word}`],
    [
      [`niedźwiedź`, `niedźwiedziowi`, `Komu?`],
      [`wilk`, `wilkowi`, `Komu?`],
      [`tygrys`, `tygrysowi`, `Komu?`],
    ]
  ),
  celownikMatrixChoice(
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
  celownikMatrixChoice(
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
  celownikMatrixChoice(
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
  celownikMatrixChoice(
    [`Ufać {word}`, `Ufam {word}`, `Ufasz {word}`, `Ufałem {word}`],
    [
      [`niewłaściwe ludzie`, `niewłaściwym ludziom`, `Komu?`],
      [`dziennikarz l.mn.`, `dziennikarzom`, `Komu?`],
      [`lekarz`, `lekarzom`, `Komu?`],
    ]
  ),
  celownikMatrixChoice(
    [`Wierzyć {word}`, `Wierzę {word}`, `Wierzysz {word}`, `Wierzyłem {word}`],
    [
      [`Kamil`, `Kamilowi`, `Komu?`],
      [`dziennikarz l.mn.`, `dziennikarzom`, `Komu?`],
      [`lekarz`, `lekarzom`, `Komu?`],
    ]
  ),
  celownikMatrixChoice(
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
  celownikMatrixChoice(
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
  celownikMatrixChoice(
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
  celownikListChoice(
    [`Dzięki {word} jestem żywy!`, `Bog`, `Bogu`, `Komu?`],
    [`Znalazłem go dzięki {word}`, `ty`, `tobie`, `Komu?`],
    [
      `Zostali wypuszczeni dzięki {word}!`,
      `starania ambasady`,
      `staraniom ambasady`,
      `Czemu?`,
    ]
  ),
  celownikListChoice(
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
  celownikListChoice(
    [`Idę naprzeciw {word}`, `system`, `systemowi`, `Czemu?`],
    [
      `Postępy wychodzą naprzeciw {word}`,
      `oczekiwanie l.mn.`,
      `oczekiwaniom`,
      `Czemu?`,
    ],
    [`Wyszedł naprzeciw {word}`, `stanowisko Rady`, `stanowisku Rady`, `Czemu?`]
  ),
  celownikListChoice(
    [`Zrobiłam to na przekór {word}`, `tata`, `tacie`, `Komu?`],
    [`Walczymy na przekór {word}`, `wszystko`, `wszystkiemu`, `Czemu?`],
    [`Na przekór {word}`, `tradycja`, `tradycji`, `Czemu?`]
  ),
  celownikListChoice(
    [`Zazdrość może zwrócić brata przeciw {word}`, `brat`, `bratu`, `Komu?`],
    [`On jest przeciwko {word}`, `my`, `nam`, `Komu?`],
    [
      `To jest sensowny argument przeciw {word}`,
      `moja opinia`,
      `mojej opinii`,
      `Czemu?`,
    ]
  ),
  celownikListChoice(
    [`Postępuję wbrew {word}`, `logika`, `logice`, `Czemu?`],
    [`Postępuję wbrew {word}`, `przepis l.mn.`, `przepisom`, `Czemu?`],
    [`Przetrzymuje człowieka wbrew {word}`, `jego wola`, `jego woli`, `Czemu?`]
  ),
  celownikMatrixChoice(
    [`Ufa {word}`],
    [
      [`ja`, `mnie`, `Komu?`],
      [`ty`, `tobie`, `Komu?`],
      [`on`, `jemu`, `Komu?`],
      [`ona`, `jej`, `Komu?`],
      [`ono`, `jemu`, `Komu?`],
      [`my`, `nam`, `Komu?`],
      [`wy`, `wam`, `Komu?`],
      [`oni`, `im`, `Komu?`],
      [`one`, `im`, `Komu?`],
    ]
  ),
];

const biernikSourceData: CardSourceData[] = [
  biernikMatrixChoice(
    [`Mieć {word}`, `Mam {word}`, `Masz {word}`, `Miałem {word}`],
    [
      [`matka`, `matkę`, `Kogo?`],
      [`dziadek`, `dziadka`, `Kogo?`],
      [`babcia`, `babcię`, `Kogo?`],
      [`czas`, `czas`, `Co?`],
    ]
  ),
  biernikMatrixChoice(
    [`Lubić {word}`, `Lubię {word}`, `Lubisz {word}`, `Lubiłem {word}`],
    [
      [`wiele rzcecz l.mn.`, `wiele rzeczy`, `Co?`],
      [`siebie`, `siebie`, `Kogo?`],
      [`historia l.mn.`, `historie`, `Co?`],
    ]
  ),
  biernikMatrixChoice(
    [
      `Kochać {word} i zamierzać ją poślubić`,
      `Kocham {word} i zamierzam ją poślubić`,
      `Kochasz {word} i zamierzasz ją poślubić`,
      `Kochałem {word} i zamierzałem ją poślubić`,
    ],
    [
      [`pańska córka`, `pańską córkę`, `Kogo?`],
      [`Kasia`, `Kasię`, `Kogo?`],
      [`ta barmenka`, `tę barmankę`, `Kogo?`],
    ]
  ),
  biernikMatrixChoice(
    [`Widzieć {word}`, `Widzę {word}`, `Widzisz {word}`, `Widziałem {word}`],
    [
      [`tamten samochód`, `tamten samochód`, `Co?`],
      [`szersza perspektywa`, `szerszą perspektywę`, `Co?`],
      [`on`, `jego`, `Kogo?`],
    ]
  ),
  biernikMatrixChoice(
    [`Jeść {word}`, `Jem {word}`, `Jesz {word}`, `Jadłem {word}`],
    [
      [`mięso`, `mięso`, `Co?`],
      [`fasola`, `fasolę`, `Co?`],
      [`ciasto l.mn.`, `ciasta`, `Co?`],
      [`rysz`, `rysz`, `Co?`],
      [`kasza`, `kaszę`, `Co?`],
    ]
  ),
  biernikMatrixChoice(
    [`Pić {word}`, `Piję {word}`, `Pijesz {word}`, `Piłem {word}`],
    [
      [`krew`, `krew`, `Co?`],
      [`piwo, wino, wódka`, `piwo, wino, wódkę`, `Co?`],
      [`szampan`, `szampana`, `Co?`],
    ]
  ),
  biernikMatrixChoice(
    [`Znać {word}`, `Znam {word}`, `Znasz {word}`, `Znałem {word}`],
    [
      [`ich sekret`, `ich sekre`, `Co?`],
      [`strach przed przegraną`, `strach przed przegraną`, `Co?`],
      [`polskie prawo`, `polskie prawo`, `Co?`],
    ]
  ),
  biernikMatrixChoice(
    [`Czytać {word}`, `Czytam {word}`, `Czytasz {word}`, `Czytałem {word}`],
    [
      [`wiadomość l.mn. w internecie`, `wiadomości w internecie`, `Co?`],
      [`komentarz l.mn. na tej stronie`, `komentarzy na tej stronie`, `Co?`],
      [`książka w telefonie`, `książkę w telefonie`, `Co?`],
    ]
  ),
  biernikMatrixChoice(
    [`Pisać {word}`, `Piszę {word}`, `Piszesz {word}`, `Pisałem {word}`],
    [
      [`mail do szefa`, `mail do szefa`, `Co?`],
      [`list do tej gazety`, `list do tej gazety`, `Co?`],
      [`coś na ścianie`, `coś na ścianie`, `Co?`],
    ]
  ),
  biernikMatrixChoice(
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
  biernikMatrixChoice(
    [`Oglądać {word}`, `Oglądam {word}`, `Oglądasz {word}`, `Oglądałem {word}`],
    [
      [`film`, `film`, `Co?`],
      [`pacjent`, `pacjenta`, `Kogo?`],
      [`zdjęcia`, `zdjęcia`, `Co?`],
    ]
  ),
  biernikMatrixChoice(
    [`Kupować {word}`, `Kupuję {word}`, `Kupujesz {word}`, `Kupowałem {word}`],
    [
      [`prezenty swoim kochankom`, `prezenty swoim kochankom`, `Co?`],
      [`różna rzecz`, `różne rzeczy`, `Co?`],
      [`ubrania w dziale dla dzieci`, `ubrania w dziale dla dzieci`, `Co?`],
    ]
  ),
  biernikMatrixChoice(
    [`Gotować {word}`, `Gotuję {word}`, `Gotujesz {word}`, `Gotowałem {word}`],
    [
      [`kolacja dla wszystkich`, `kolację dla wszystkich`, `Co?`],
      [`śniadanie`, `śniadanie`, `Co?`],
      [`lunch`, `lunch`, `Co?`],
    ]
  ),
  biernikListChoice(
    [`Jechaliśmy przez {word}`, `tunel w górże`, `tunel w górże`, `Co?`],
    [
      `Skuteczność nabycia majątku przez {word}`,
      `osoba trzecia`,
      `osobę trzecią`,
      `Kogo?`,
    ],
    [`Zbyt martwisz się przez {word}`, `on`, `niego`, `Kogo?`]
  ),
  biernikListChoice(
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
  biernikListChoice(
    [
      `Wybraliśmy biurowiec ze względu na jego {word}`,
      `dogodna lokalizacja`,
      `dogodną lokalizację`,
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
  biernikListChoice(
    [`Współpracuje z FBI w zamian za {word}`, `immunitet`, `immunitet`, `Co?`],
    [`W zamian za {word}`, `pomoc`, `pomoc`, `Co?`],
    [`Milion dolarów w zamian za {word}`, `dusza`, `duszę`, `Co?`]
  ),
  biernikListChoice(
    [
      `Z uwagi na {word}`,
      `trudna sytuacja epidemiczna`,
      `trudną sytuację epidemiczną`,
      `Co?`,
    ],
    [
      `Z uwagi na {word}`,
      `brak łączności komórkowej`,
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
  biernikListChoice(
    [`Patrzy na {word}`, `ściana`, `ścianę`, `Co?`],
    [`Pajak wlazł na {word}`, `sufit`, `sufit`, `Co?`],
    [`Odrzucił koc na {word}`, `podłoga`, `podłogę`, `Kogo?`]
  ),
  biernikListChoice(
    [`Chodzi o {word}`, `pieniądz l.mn.`, `pieniądze`, `Co?`],
    [`Spierać się o {word}`, `oczywiste rzeczy`, `oczywiste rzeczy`, `Co?`],
    [`Szef pyta o {word}`, `jakość produktów`, `jakość produktów`, `Co?`],
    [`Szef pyta o {word}`, `ten projekt`, `ten projekt`, `Co?`],
    [`Szef pyta o {word}`, `jego zdanie`, `jego zdanie`, `Co?`]
  ),
  biernikListChoice(
    [`Posłałem po {word}`, `on`, `niego`, `Kogo?`],
    [`Poszłam po {word}`, `lekarz`, `lekarza`, `Kogo?`],
    [`Jedzie po {word}`, `Maciej`, `Macieja`, `Kogo?`]
  ),
  biernikListChoice(
    [`Poszedł pod {word}`, `prysznic`, `prysznic`, `Co?`],
    [`Idź prosto pod {word}`, `most`, `most`, `Co?`],
    [`Chodź tu... pod {word}`, `drzewo`, `drzewo`, `Co?`]
  ),
  biernikListChoice(
    [`A jutro rano jedziemy nad {word}`, `morze`, `morze`, `Co?`],
    [`Ruszam nad {word}`, `jezioro`, `jezioro`, `Co?`],
    [`Pojechałem nad {word}`, `rzekę`, `rzekę`, `Co?`]
  ),
  biernikListChoice(
    [`Sprzedałem ponad {word}`, `milion sztuk`, `milion sztuk`, `Co?`],
    [`Czekałem ponad {word}`, `godzina`, `godzinę`, `Co?`],
    [
      `Dobro firmy ponad {word}`,
      `uczucie osobiste l.mn.`,
      `uczucia osobiste`,
      `Co?`,
    ]
  ),
  biernikListChoice(
    [`Dałem czterdzieści tysięcy za {word}`, `samochód`, `samochód`, `Co?`],
    [`Nie możemy podejmować decyzji za {word}`, `ona`, `nią`, `Kogo?`],
    [`Zapłacę ci za {word} kiedy wrócę`, `on`, `niego`, `Kogo?`]
  ),
  biernikListChoice(
    [`Zajechali przed {word}`, `budynek`, `budynek`, `Co?`],
    [
      `Zamiast przed {word} trafiła do zakładu karnego`,
      `ołtarz`,
      `ołtarz`,
      `Co?`,
    ],
    [`Znów trafię przed {word}`, `sędzia`, `sędzię`, `Kogo?`]
  ),
  biernikListChoice(
    [`On nie wszedł między {word}`, `my`, `nas`, `Kogo?`],
    [`Włożył ją między {word}`, `pośladek l.mn.`, `pośladki`, `Co?`],
    [`Dzielenie tekstu między {word}`, `kolumny`, `kolumny`, `Co?`]
  ),
  biernikListChoice(
    [`Wyszłaś poza {word}, prawda?`, `mur`, `mur`, `Co?`],
    [`Poza {word} miasta`, `granica`, `granicę`, `Co?`]
  ),
  biernikListChoice(
    [`Patrzał w moje {word}`, `oko l.mn.`, `oczy`, `Co?`],
    [`Musisz wkroczyć w {word}`, `pustka`, `pustkę`, `Co?`],
    [`Leci w {word}`, `niebo`, `niebo`, `Co?`]
  ),
  biernikMatrixChoice(
    [`Pyta o {word}`],
    [
      [`ja`, `mnie`, `Kogo?`],
      [`ty`, `ciebie`, `Kogo?`],
      [`on`, `niego`, `Kogo?`],
      [`ona`, `nią`, `Kogo?`],
      [`ono`, `nie`, `Kogo?`],
      [`my`, `nas`, `Kogo?`],
      [`wy`, `was`, `Kogo?`],
      [`oni`, `nich`, `Kogo?`],
      [`one`, `nie`, `Kogo?`],
    ]
  ),
];

const narzędniSourcseData: CardSourceData[] = [
  narzędnikMatrixChoice(
    [`Być {word}`, `Jestem {word}`, `Seteś {word}`, `Byłem {word}`],
    [
      [`student`, `studentem`, `Kim?`],
      [`świadek`, `świadkiem`, `Czym?`],
      [`chłopiec`, `chłopcem`, `Czym?`],
    ]
  ),
  narzędnikMatrixChoice(
    [`Jechać {word}`, `Jadę {word}`, `Jedziesz {word}`, `Jechałem {word}`],
    [
      [`droga nr 5`, `drogą nr 5`, `Czym?`],
      [`samochód`, `samochodem`, `Czym?`],
      [`rower`, `rowerem`, `Czym?`],
    ]
  ),
  narzędnikMatrixChoice(
    [`Pisać {word}`, `Piszę {word}`, `Piszesz {word}`, `Pisałem {word}`],
    [
      [`długopis`, `długopisem`, `Czym?`],
      [`ołówek`, `ołówkiem`, `Czym?`],
    ]
  ),
  narzędnikMatrixChoice(
    [`Iść z {word}`, `Idę z {word}`, `Idziesz z {word}`, `Szedłem z {word}`],
    [
      [`on`, `nim`, `Kim?`],
      [`ona`, `nią`, `Kim?`],
      [`brat`, `bratem`, `Kim?`],
    ]
  ),
  narzędnikMatrixChoice(
    [
      `Rozmawiać z {word}`,
      `Rozmawiam z {word}`,
      `Rozmawiasz z {word}`,
      `Rozmawiałem z {word}`,
    ],
    [
      [`trener`, `trenerem`, `Kim?`],
      [`siostra`, `siostrą`, `Kim?`],
      [`babcia`, `babcią`, `Kim?`],
    ]
  ),
  narzędnikListChoice(
    [`Którędy jechać? {word}`, `tunel`, `tunelem`, `Czym?`],
    [`Którędy iść? Idź {word}`, `ta ulica`, `tą ulicą`, `Czym?`]
  ),
  narzędnikListChoice(
    [`Kiedy to będzie? {word}`, `wieczór`, `wieczorem`, `Czym?`],
    [`Kiedy to będzie? {word}`, `żima`, `zimą`, `Czym?`]
  ),
  narzędnikListChoice([
    `Jak iść? {word}`,
    `zdecydowany krok`,
    `zdecydowanym krokiem`,
    `Czym?`,
  ]),
  narzędnikMatrixChoice(
    [
      `Bawić się {word}`,
      `Bawię się {word}`,
      `Bawisz się {word}`,
      `Bawiłem się {word}`,
    ],
    [
      [`oni`, `nimi`, `Czym?`],
      [`zabawki`, `zabawkami`, `Czym?`],
      [`rzecz l.mn.`, `rzeczami`, `Czym?`],
    ]
  ),
  narzędnikMatrixChoice(
    [
      `Chwalić się {word}`,
      `Chwalę się {word}`,
      `Chwalisz się {word}`,
      `Chwaliłem się {word}`,
    ],
    [
      [`swoje auto`, `swoim autem`, `Czym?`],
      [`sukces l.mn.`, `sukcesami`, `Czym?`],
      [`wygranie`, `wygraniem`, `Czym?`],
    ]
  ),

  narzędnikMatrixChoice(
    [
      `Cieszyć się {word}`,
      `Cieszę się {word}`,
      `Cieszysz się {word}`,
      `Cieszyłem się {word}`,
    ],
    [
      [`umiejętność`, `umiejętnością`, `Czym?`],
      [`wysoka reputacja`, `wysoką reputacją`, `Czym?`],
      [`zaufanie ministra`, `zaufaniem ministra`, `Czym?`],
    ]
  ),

  narzędnikMatrixChoice(
    [
      `Interesować się {word}`,
      `Interesuję się {word}`,
      `Interesujesz się {word}`,
      `Interesowałem się {word}`,
    ],
    [
      [`wielo rzeczy`, `wieloma rzeczami`, `Czym?`],
      [`taki dom l.mn.`, `takimi domami`, `Czym?`],
      [`nauka`, `nauką`, `Czym?`],
    ]
  ),

  narzędnikMatrixChoice(
    [
      `Kierować {word}`,
      `Kieruję {word}`,
      `Kierujesz {word}`,
      `Kierowałem {word}`,
    ],
    [
      [`poszukiwania`, `poszukiwaniami`, `Czym?`],
      [`wszystko`, `wszystkim`, `Czym?`],
      [`serce mężczyzny`, `sercami mężczyzn`, `Czym?`],
      [`firmą`, `firma`, `Czym?`],
      [`ludzie`, `ludźmi`, `Kim?`],
    ]
  ),

  narzędnikMatrixChoice(
    [
      `Martwić się {word}`,
      `Martwię się {word}`,
      `Martwisz się {word}`,
      `Martwiłem się {word}`,
    ],
    [
      [`ich zachowanie`, `ich zachowaniem`, `Czym?`],
      [`sytuacja`, `sytuacją`, `Czym?`],
      [`przyszłość`, `przyszłością`, `Czym?`],
    ]
  ),

  narzędnikMatrixChoice(
    [
      `Męczyć się {word}`,
      `Męczę się {word}`,
      `Męczysz się {word}`,
      `Męczyłem się {word}`,
    ],
    [
      [`ćwiczenie`, `ćwiczeniem`, `Czym?`],
      [`trzy zmarnowane lata`, `trzema zmarnowanymi latami`, `Czym?`],
      [`czekanie`, `czekaniem`, `Czym?`],
    ]
  ),

  narzędnikMatrixChoice(
    [
      `Opiekować się {word}`,
      `Opiekuję się {word}`,
      `Opiekujesz się {word}`,
      `Opiekowałem się {word}`,
    ],
    [
      [`dzieci`, `dziećmi`, `Czym?`],
      [`one`, `nimi`, `Kym?`],
      [`pies l.mn.`, `psami`, `Czym?`],
    ]
  ),
  narzędnikMatrixChoice(
    [
      `Pachnieć {word}`,
      `Pachnę się {word}`,
      `Pachniesz się {word}`,
      `Pachniałem się {word}`,
    ],
    [
      [`specjalne perfumy`, `specjalnymi perfumami`, `Czym?`],
      [`take zapachy ekskluzywne`, `takimi zapachami ekskluzywnymi`, `Czym?`],
      [`lipa`, `lipą`, `Czym?`],
    ]
  ),
  narzędnikMatrixChoice(
    [
      `Przejmować się {word}`,
      `Przejmuję się {word}`,
      `Przejmujesz się {word}`,
      `Przejmowałem się {word}`,
    ],
    [
      [`on`, `nim`, `Kim?`],
      [`ona`, `nią`, `Kim?`],
      [`los kraju`, `losem kraju`, `Czym?`],
    ]
  ),
  narzędnikMatrixChoice(
    [
      `Rządzić {word}`,
      `Rządzę się {word}`,
      `Rządzisz się {word}`,
      `Rządziłem się {word}`,
    ],
    [
      [`nasz kraj`, `naszym krajem`, `Czym?`],
      [`one`, `nimi`, `Kim?`],
      [`ludzkie serce`, `ludzkim sercem`, `Czym?`],
    ]
  ),
  narzędnikMatrixChoice(
    [
      `Smarować {word}`,
      `Smaruję {word}`,
      `Smarujesz {word}`,
      `Smarowałem {word}`,
    ],
    [
      [`masło`, `masłem`, `Czym?`],
      [`masełko`, `masełkiem`, `Czym?`],
      [`maść`, `maścią`, `Czym?`],
    ]
  ),
  narzędnikMatrixChoice(
    [
      `Stresować się {word}`,
      `Stresuje się {word}`,
      `Stresujes się {word}`,
      `Stresowałem się {word}`,
    ],
    [
      [`spotkanie`, `spotkaniem`, `Czym?`],
      [`mecz`, `meczem`, `Czym?`],
      [`szkoła`, `szkołą`, `Czym?`],
    ]
  ),
  narzędnikMatrixChoice(
    [
      `Zachwycać się {word}`,
      `Zachwycam się {word}`,
      `Zachwycasz się {word}`,
      `Zachwycałem się {word}`,
    ],
    [
      [`krajobraz`, `krajobrazem`, `Czym?`],
      [`cudowna reklama`, `cudowną reklamą`, `Czym?`],
      [`malarstwo`, `malarstwem`, `Czym?`],
    ]
  ),
  narzędnikMatrixChoice(
    [
      `Zajmować się {word}`,
      `Zajmuję się {word}`,
      `Zajmujesz się {word}`,
      `Zajmowałem się {word}`,
    ],
    [
      [`doradztwo`, `doradztwem`, `Czym?`],
      [`sprawy finansowe`, `sprawami finansowymi`, `Czym?`],
      [`rysunek i projektowanie`, `rysunkiem i projektowaniem`, `Czym?`],
    ]
  ),
  narzędnikMatrixChoice(
    [
      `Zarażać się {word}`,
      `Zarażam się {word}`,
      `Zarażasz się {word}`,
      `Zarażałem się {word}`,
    ],
    [
      [`koronavirus`, `koronavirusem`, `Czym?`],
      [`grypa`, `grypą`, `Czym?`],
      [`choroba`, `chorobą`, `Czym?`],
    ]
  ),
  narzędnikListChoice(
    [`Piję latte z {word}`, `mleko`, `mlekiem`, `Czym?`],
    [`Idę na spacer z {word}`, `pies`, `psem`, `Kim?`],
    [`Żyję z {word}`, `siostra`, `siostrą`, `Kim?`]
  ),
  narzędnikListChoice(
    [
      `Zarządzam krótką przerwę przed {word}`,
      `następna sprawa`,
      `następną sprawą`,
      `Czym?`,
    ],
    [`Postanowiłam ochronić moje dziecko przed {word}`, `zło`, `złem`, `Czym?`],
    [`Rodzice trzymali przed {word} straszną tajemnicę`, `my`, `nami`, `Czym?`]
  ),
  narzędnikListChoice(
    [`Chowa się za {word}`, `ściana`, `ścianą`, `Czym?`],
    [`Zamknąłem za {word} drzwi`, `ona`, `nią`, `Kim?`],
    [`Myslalem, że stoi za {word}`, `ja`, `mną`, `Kim?`]
  ),
  narzędnikListChoice(
    [`W domu nad {word}`, `morze`, `morzem`, `Czym?`],
    [`Lubi spacerować nad {word}`, `jezioro`, `jeziorem`, `Czym?`],
    [`Smok leci nad {word}`, `miasto`, `miastem`, `Czym?`]
  ),
  narzędnikListChoice(
    [`Mieszkanie było pod {word}`, `dach`, `dachem`, `Czym?`],
    [
      `Pod {word} to kultowe miejsce spotkań`,
      `Papuga l.mn.`,
      `Papugami`,
      `Kim?`,
    ],
    [
      `Surfuj bezpiecznie pod {word} doświadczonego instruktora`,
      `oko`,
      `okeim`,
      `Czym?`,
    ]
  ),
  narzędnikListChoice(
    [
      `Stał między {word}`,
      `pielęgniarka i lekarz`,
      `pielęgniarką i lekarzem`,
      `Kim?`,
    ],
    [`Muszę wybierać między {word}`, `ty i ona`, `tobą i nią`, `Kim?`],
    [
      `Niełatwo wybrać między dwoma świetnymi {word}`,
      `facet l.mn.`,
      `facetami`,
      `Kim?`,
    ]
  ),
  narzędnikListChoice(
    [`Reprezentant naszego kraju poza {word}`, `granicr`, `granicam`, `Czym?`],
    [`To jego pierwsza podróż poza {word}`, `ojczyzna`, `ojczyzną`, `Czym?`],
    [`Świat poza {word} jest iluzją`, `te mury`, `tymi murami`, `Czym?`]
  ),
  narzędnikListChoice(
    [
      `To nic w porównaniu z {word} za dziecko`,
      `odpowiedzialność`,
      `odpowiedzialnością`,
      `Czym?`,
    ],
    [
      `Umowa jest znaczącym krokiem naprzód w porównaniu z {word}`,
      `poprzednia wersja`,
      `poprzednią wersją`,
      `Czym?`,
    ],
    [`Wyglądam bardzo dobrze, w porównaniu z {word}`, `oni`, `nimi`, `Kim?`]
  ),
  narzędnikListChoice(
    [`Są poszukiwani w związku z {word}`, `morderstwo`, `morderstwem`, `Czym?`],
    [`W związku z projektem {word}`, `elektrownia`, `elektrowni`, `Czym?`],
    [
      `Chciałby omówić kilka punktów w związku z {word}`,
      `zaistniała sytuacja`,
      `zaistniałą sytuacją`,
      `Czym?`,
    ]
  ),
  narzędnikListChoice(
    [
      `Wykonaj zadanie konkursowe zgodnie z {word}`,
      `regulamin`,
      `regulaminem`,
      `Czym?`,
    ],
    [
      `Pochowaliśmy jej ciało zgodnie z {word}`,
      `nasze zwyczaje`,
      `naszymi zwyczajami`,
      `Czym?`,
    ],
    [`Gotowałem zgodnie z {word}`, `przepis`, `przepisem`, `Czym?`]
  ),
  narzędnikMatrixChoice(
    [`Opiekuje się {word}`],
    [
      [`ja`, `mną`, `Kim?`],
      [`ty`, `tobą`, `Kim?`],
      [`on`, `nim`, `Kim?`],
      [`ona`, `nią`, `Kim?`],
      [`ono`, `nim`, `Kim?`],
      [`my`, `nami`, `Kim?`],
      [`wy`, `wami`, `Kim?`],
      [`oni`, `nimi`, `Kim?`],
      [`one`, `nimi`, `Kim?`],
    ]
  ),
];

const miejscownikSourceData: CardSourceData[] = [
  miejscownikListChoice(
    [`O {word} idę na spacer`, `dziewiąta`, `dziewiątej`, `Czym?`],
    [`Jest 20 minut po {word}`, `szósta`, `szóstej`, `Czym?`],
    [`10 lat po {word}`, `ślub`, `ślubie`, `Czym?`]
  ),
  miejscownikListChoice(
    [`Pracuję w {word}`, `szpital`, `szpitalu`, `Czym?`],
    [`Jestem w {word}`, `dobra forma`, `dobrej formie`, `Czym?`],
    [`Mieszkam na {word}`, `wieś`, `wsi`, `Czym?`]
  ),
  miejscownikListChoice(
    [`Kubek stoi na {word}`, `stół`, `stole`, `Czym?`],
    [`Kot leży na {word}`, `podłoga`, `podłodze`, `Czym?`],
    [`Drzewo leży na {word}`, `ziemia`, `ziemi`, `Czym?`]
  ),
  miejscownikListChoice(
    [`Te misato znajduje się na {word}`, `zachód`, `zachodzie`, `Czym?`],
    [`Te misato znajduje się na {word}`, `schód`, `schodzie`, `Czym?`],
    [`Te misato znajduje się na {word}`, `północ`, `północy`, `Czym?`],
    [`Te misato znajduje się na {word}`, `południe`, `południu`, `Czym?`]
  ),
  miejscownikListChoice([
    `Studiuję na {word}`,
    `uniwersytet`,
    `uniwersytecie`,
    `Czym?`,
  ]),
  miejscownikListChoice(
    [`Myśle o {word}`, `ja`, `mnie`, `Kim?`],
    [`Myśle o {word}`, `ty`, `tobie`, `Kim?`],
    [`Myśle o {word}`, `on`, `nim`, `Kim?`],
    [`Myśle o {word}`, `ona`, `niej`, `Kim?`]
  ),
  miejscownikListChoice(
    [`Po {word} idę do pracy`, `śniadanie`, `śniadaniu`, `Czym?`],
    [`Po {word} biorę prysznic`, `spacer`, `spacerze`, `Czym?`],
    [`Po {word} idę do domu`, `zakończenie`, `zakończeniu`, `Czym?`]
  ),
  miejscownikListChoice(
    [`Przy {word}`, `planowanie`, `planowaniu`, `Czym?`],
    [`Obserwuj mistrza przy {word}`, `praca`, `pracy`, `Czym?`],
    [`Jesteśmy przy  {word}`, `budynek`, `budynku`, `Czym?`]
  ),
  miejscownikListChoice(
    [`Trzymasz go w {word}`, `ta szafa`, `tej szafie`, `Czym?`],
    [`Masz w {word} tylko jedno`, `głowa`, `glowie`, `Czym?`],
    [
      `To co mieliśmy w {word} teraz jest niemożliwe`,
      `plan l.mn.`,
      `planach`,
      `Czym?`,
    ]
  ),
  miejscownikMatrixChoice(
    [
      `Dyskutować o {word}`,
      `Dyskutuję o {word}`,
      `Dyskutujesz o {word}`,
      `Dyskutowałem o {word}`,
    ],
    [
      [`polityka`, `polityce`, `Czym?`],
      [`cel l.mn.`, `celach`, `Czym?`],
      [`strategia`, `strategii`, `Czym?`],
    ]
  ),
  miejscownikMatrixChoice(
    [
      `Marzyć o {word}`,
      `Marzę o {word}`,
      `Marzysz o {word}`,
      `Marzyłem o {word}`,
    ],
    [
      [`on`, `nim`, `Kim?`],
      [`ona`, `niej`, `Kim?`],
      [`wystawa`, `wystawie`, `Czym?`],
    ]
  ),
  miejscownikMatrixChoice(
    [
      `Myśleć o {word}`,
      `Myślę o {word}`,
      `Myślisz o {word}`,
      `Myślałem o {word}`,
    ],
    [
      [`my`, `nas`, `Kim?`],
      [`wy`, `was`, `Kim?`],
      [`one/oni`, `nich`, `Kim?`],
    ]
  ),
  miejscownikMatrixChoice(
    [
      `Pamiętać o {word}`,
      `Pamiętam o {word}`,
      `Pamiętasz o {word}`,
      `Pamiętałem o {word}`,
    ],
    [
      [`moj test na prawo jazdy`, `moim teście na prawo jazdy`, `Czym?`],
      [`urodziny taty`, `urodzinach taty`, `Czym?`],
      [`dzisiejszy wieczór`, `dzisiejszym wieczorze`, `Czym?`],
    ]
  ),
  miejscownikMatrixChoice(
    [
      `Rozmawiać o {word}`,
      `Rozmawiam o {word}`,
      `Rozmawiasz o {word}`,
      `Rozmawiałem o {word}`,
    ],
    [
      [`to`, `tym`, `Czym?`],
      [`plany`, `planach`, `Czym?`],
      [`sprawa`, `sprawie`, `Czym?`],
    ]
  ),
  miejscownikMatrixChoice(
    [
      `Zapominać o {word}`,
      `Zapominam o {word}`,
      `Zapominasz o {word}`,
      `Zapominałem o {word}`,
    ],
    [
      [`problemy`, `problemach`, `Czym?`],
      [`słodycze`, `słodyczy`, `Czym?`],
      [`klauzula w kontrakcie`, `klauzuli w kontrakcie`, `Czym?`],
    ]
  ),
  miejscownikMatrixChoice(
    [
      `Chodzić po {word}`,
      `Chodzę po {word}`,
      `Chodzisz po {word}`,
      `Chodziłem po {word}`,
    ],
    [
      [`ta ulica`, `tej ulicy`, `Czym?`],
      [`Księżyc`, `Księżycu`, `Czym?`],
      [`park`, `parku`, `Czym?`],
    ]
  ),
  miejscownikMatrixChoice(
    [
      `Jeździć po {word}`,
      `Jeżdżę po {word}`,
      `Jeździsz po {word}`,
      `Jeździłem po {word}`,
    ],
    [
      [`droga`, `drodze`, `Czym?`],
      [`trasa`, `trasie`, `Czym?`],
      [`świat`, `świecie`, `Czym?`],
    ]
  ),
  miejscownikMatrixChoice(
    [
      `Odpoczywać po {word}`,
      `Odpoczywam po {word}`,
      `Odpoczywasz po {word}`,
      `Odpoczywałem po {word}`,
    ],
    [
      [`trening`, `treningu`, `Czym?`],
      [`egzamin`, `egzaminie`, `Czym?`],
      [`praca`, `pracy`, `Czym?`],
    ]
  ),
  miejscownikMatrixChoice(
    [
      `Podróżować po {word}`,
      `Podróżuję po {word}`,
      `Podróżujesz po {word}`,
      `Podróżowałem po {word}`,
    ],
    [
      [`morzac`, `morzach`, `Czym?`],
      [`kraj`, `kraju`, `Czym?`],
      [`Europa`, `Europie`, `Czym?`],
    ]
  ),
  miejscownikMatrixChoice(
    [
      `Spacerować po {word}`,
      `Spaceruję po {word}`,
      `Spacerujesz po {word}`,
      `Spacerowałem po {word}`,
    ],
    [
      [`Paryż`, `Paryżu`, `Czym?`],
      [`miasto`, `mieście`, `Czym?`],
      [`ulice`, `ulicach`, `Czym?`],
    ]
  ),
  miejscownikMatrixChoice(
    [`Mysli o {word}`],
    [
      [`ja`, `mnie`, `Kim?`],
      [`ty`, `tobie`, `Kim?`],
      [`on`, `nim`, `Kim?`],
      [`ona`, `niej`, `Kim?`],
      [`ono`, `nim`, `Kim?`],
      [`my`, `nas`, `Kim?`],
      [`wy`, `was`, `Kim?`],
      [`oni`, `nich`, `Kim?`],
      [`one`, `nich`, `Kim?`],
    ]
  ),
];

const casesSourceData: CardSourceData[] = [
  ...dopełniaczSourceData,
  ...celownikSourceData,
  ...biernikSourceData,
  ...narzędniSourcseData,
  ...miejscownikSourceData,
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
        textBare: texts[2],
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
