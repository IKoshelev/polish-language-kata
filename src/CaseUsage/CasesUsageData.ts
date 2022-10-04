import groupBy from "lodash.groupby";
import { getRandomItem, shuffleAndReturnArr } from "../util";

export type Card = {
  id: number;
  isCaseNameOpened: boolean;
  isTextOpened: boolean;
  isMarked: boolean;
  caseName: string;
  textWhenOpened: string;
  textWhenClosed: string;
};

type CardSourceData = {
  caseName: string;
  id: number;
  getRandomizedExample: () => [string, string];
};

let counter = 1;

const forCaseVerb =
  (caseName: string) =>
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

const dopełniaczVerb = forCaseVerb("Dopełniacz");
const celownikVerb = forCaseVerb("Celownik");

const forCasePreposition =
  (caseName: string) =>
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

const dopełniaczPreposition = forCasePreposition("Dopełniacz");
const celownikPreposition = forCasePreposition("Celownik");

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
      [`one/one`, `ich/nich`, `Kogo?`],
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
      [`on`, `jego/go/niego`, `Kogo?`],
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
      [`ona`, `jej/niej`, `Kogo?`],
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
      ` wspólnej polityki`,
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
    [`Srodki  do {word}`, `wykorzystanie`, `wykorzystania`, `Czego?`],
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
      `Kogo?`,
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

  // {
  //   caseName: "Celownik",
  //   id: counter++,
  //   template: () => ['','']
  // },
  // {
  //   caseName: "Biernik",
  //   id: counter++,
  //   template: () => ['','']
  // },
  // {
  //   caseName: "Narzędnik",
  //   id: counter++,
  //   template: () => ['','']
  // },
  // {
  //   caseName: "Miejscownik",
  //   id: counter++,
  //   template: () => ['','']
  // },
];

const celownikSourceData: CardSourceData[] = [
  celownikVerb(
    [
      `Darować {word} tego.`,
      `Daruję {word} tego.`,
      `Daruje {word} tego.`,
      `Darowałem {word} tego.`,
    ],
    [
      [`ty`, `ci`, `Komu?`],
      [`on`, `jemu`, `Komu?`],
      [`ona`, `jej`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Dawać {word}`,
      `Daję {word}`,
      `Dajesz {word}`,
      `Dawałem {word}`,
    ],
    [
      [`ja`, `mi/mnie`, `Komu?`],
      [`ona`, `jej/niej`, `Komu?`],
      [`oni/one`, `im`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Dokuczać {word}`,
      `Dokuczam {word}`,
      `Dokucza {word}`,
      `Dokuczałem {word}`,
    ],
    [
      [`ty`, `tobie/ci`, `Komu?`],
      [`on`, `jemu/mu/niemu`, `Komu?`],
      [`wy`, `wam`, `Komu?`],
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
      [`twoje zachowanie`, `twojemu zachowaniu`, `Komu?`],
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
      [`wy`, `wam`, `Komu?`],
      [`swój mąż`, `swojemu mężowi`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Kraść {word}`,
      `Kradnę {word}`,
      `Kradniesz {word}`,
      `Kradłem {word}`,
    ],
    [
      [`ludzie`, `ludziom`, `Komu?`],
      [`rząd`, `rządowi`, `Komu?`],
      [`bogaci`, `bogatym`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Kupować {word}`,
      `Kupuję {word}`,
      `Kupujesz {word}`,
      `Kupowałem {word}`,
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
      [`ty`, `ci`, `Komu?`],
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
      `Opowiadać {word}`,
      `Opowiadam {word}`,
      `Opowiadasz {word}`,
      `Opowiadałem {word}`,
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
      [`on`, `jemu/mu/niemu`, `Komu?`],
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
    [
      `Pomagać {word}`,
      `Pomagam {word}`,
      `Pomagasz {word}`,
      `Pomagałem {word}`,
    ],
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
      [`on`, `jemu/mu/niemu`, `Komu?`],
      [`oni/one`, `im/nim`, `Komu?`],
      [`ta firma`, `tej firmie`, `Komu?`],
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
      [`lusterko`, `lusterku`, `Komu?`],
      [`okno`, `oknu`, `Komu?`],
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
      [`on`, `jemu/mu/niemu`, `Komu?`],
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
    [
      `Smakować {word}`,
      `Smakuję {word}`,
      `Smakujesz {word}`,
      `Smakowałem {word}`,
    ],
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
      [`środowisko`, `środowisku`, `Komu?`],
      [`społeczność`, `społeczności`, `Komu?`],
      [`reputacja`, `reputacji`, `Komu?`],
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
      [`on`, `jemu/mu/niemu`, `Komu?`],
      [`sobie`, `sobie`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Ufać {word}`,
      `Ufam {word}`,
      `Ufasz {word}`,
      `Ufałem {word}`,
    ],
    [
      [`niewłaściwe ludzie`, `niewłaściwym ludziom`, `Komu?`],
      [`dziennikarz l.mn.`, `dziennikarzom`, `Komu?`],
      [`lekarz`, `lekarzom`, `Komu?`],
    ]
  ),
  celownikVerb(
    [
      `Wierzyć {word}`,
      `Wierzę {word}`,
      `Wierzysz {word}`,
      `Wierzyłem {word}`,
    ],
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
      [`papuga`, `papuga`, `Komu?`],
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
    [`Zostali wypuszczeni dzięki {word}!`, `starania ambasady`, `staraniom ambasady`, `Czemu?`]
  ),
  celownikPreposition(
    [`Obłok zmierza prosto ku {word}`, `miasto`, `miastu`, `Czemu?`],
    [`Wielki krok ku {word}`, `dorosłość`, `dorosłości`, `Czemu?`],
    [`Pchnęła jego ku {word}`, `negatywne emocje`, `negatywnym emocjom`, `Czemu?`],
    [`Nie żywię wrogich uczuć ku {word}`, `ty`, `tobie`, `Komu?`]
  ),
  celownikPreposition(
    [`Idę naprzeciw {word}`, `system`, `systemowi`, `Czemu?`],
    [`Postępy wychodzą naprzeciw {word}`, `oczekiwanie l.mn.`, `oczekiwaniom`, `Czemu?`],
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
    [`To jest sensowny argument przeciw {word}`, `moja opinia`, `mojej opinii`, `Czemu?`]
  ),
  celownikPreposition(
    [`Postępuję wbrew {word}`, `logika`, `logice`, `Czemu?`],
    [`Postępuję wbrew {word}`, `przepis l.mn.`, `przepisom`, `Czemu?`],
    [`Przetrzymuje człowieka wbrew {word}`, `jego wola`, `jego woli`, `Czemu?`]
  ),
];

const casesSourceData: CardSourceData[] = [
  ...dopełniaczSourceData,
  ...celownikSourceData
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
