import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import groupBy from "lodash.groupby";
import {
  attemptGetDataByQSKey,
  getRandomItem,
  shuffleAndReturnArr,
  whichSideOfElementWasClicked,
} from "./util";
import {
  MdAvTimer,
  MdFlipToBack,
  MdFlipToFront,
  MdShuffle,
} from "react-icons/md";
import { GiCardRandom, GiLoad, GiSave } from "react-icons/gi";
import classNames from "classnames";

type Card = {
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

const CASES_USAGE_STATE_QS_KEY = "cases-usage-state-key";

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

const casesSourceData: CardSourceData[] = [
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
    ]
  ),
  dopełniaczVerb(
    [`Brakuję mi {word}`, `Brakuję ci {word}`, `Brakowało ci {word}`],
    [
      [`pieniądz l.mn.`, `pieniędzy`, `Czego?`],
      [`czas`, `czasu`, `Czego?`],
      [`siła l.mn.`, `sił`, `Czego?`],
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
    ]
  ),
  dopełniaczVerb(
    [`Słuchać {word}`, `Slucham {word}`, `Sluchasz {word}`, `Słuchałem {word}`],
    [
      [`pani`, `pani`, `Kogo?`],
      [`ojciec`, `ojca`, `Kogo?`],
      [`dziecko l.mn.`, `dzieci`, `Kogo?`],
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
    [`Mam dla {word}`, `Ty`, `Ciebie`, `Kogo?`]
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
    [`Siedzieliśmy naprzeciwko {word}`, `siebie`, `siebie`, `Czego?`],
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
    [`Nie lubię nikogo, prócz {word}`, `Ty`, `Ciebie`, `Kogo?`]
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
    [`Prawdopodobieństwo poniżej {word}`, `pięc procent`, `pięciu procent`, `Czego?`],
    [`Boli mnie poniżej {word}`, `żebra`, `żeber`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`25 kilometrów powyżej {word}`, `dozwolona prędkość`, `dozwolonej prędkości`, `Czego?`],
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
    [`Wybiera przewodniczącego spośród {word}`, `przedstawiciel l.mn.`, `przedstawicieli`, `Kogo?`],
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
    [`Posunięcia w ciągu {word}`, `ostatnie trzy dni`, `ostatnich trzech dni`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`Powód według {word}`, `wiarygodne źródło l.mn.`, `wiarygodnych źródeł`, `Kogo?`],
    [`Płatność odbywa się według {word}`, `wybor klienta`, `wyboru klienta`, `Czego?`],
    [`Biuro doposażone według {word}`, `potrzeba najemcy`, `potrzeby najemcy`, `Czego?`]
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
    [`Przyszłość nie podąża wzdłuż {word}`, `pojedyńcza droga`, `pojedyńczej drogi`, `Czego?`],
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
    [`Stracił przytomność z powodu {word}`, `wysoka gorączka`, `wysokiej gorączki`, `Czego?`],
    [`Zamierzasz umrzeć z powodu {word}`, `swój pokaz`, `swojego pokazu`, `Czego?`],
    [`Opuściłem ją z powodu {word}`, `własny lęk l.mn.`, `własnych lęków`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`Stoi niebezpiecznie blisko {word}`, `duża kałuża`, `dużej kałuży`, `Czego?`],
    [`Musisz pozostać blisko {word}`, `powierzchnia`, `powierzchni`, `Czego?`],
    [`Jesteśmy blisko {word}`, `wyczerpanie zapasów`, `wyczerpania zapasów`, `Czego?`]
  ),
  dopełniaczPreposition(
    [`W motelu niedaleko {word}`, `lotnisko`, `lotniska`, `Czego?`],
    [`To znaleziono na skrzyżowaniu niedaleko {word}`, `te miejsce`, `tego miejsca`, `Czego?`],
    [`Jestem niedaleko {word}`, `Ci`, `Ciebie`, `Kogo?`]
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

function getCaseData(
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

type CurrentState = {
  cards: Card[];
  timeout: number;
  target?: number | undefined;
  hasSavedData: boolean;
  randomModeOn: boolean;
};

export function CasesUsage() {
  const [state, updateState] = useImmer(
    () =>
      ({
        cards: getCaseData(),
        timeout: 2000,
        target: undefined,
        hasSavedData: !!localStorage.getItem(CASES_USAGE_STATE_QS_KEY),
        randomModeOn: false,
      } as CurrentState)
  );

  useEffect(() => {
    if (!state.randomModeOn) {
      return;
    }

    if (state.target) {
      return;
    }

    const allCards = state.cards.filter((x) => !x.isTextOpened);
    if (allCards.length === 0) {
      setTimeout(() => {
        alert("Gratulacje!");
      }, 2500);
      return;
    }

    const randomCard = getRandomItem(allCards);
    setTimeout(
      () =>
        updateState((d) => {
          d.target = randomCard.id;
        }),
      state.timeout
    );

    // make sure newly setelect tile is visible
    setTimeout(() => {
      const targetTd = window.document.querySelector("td.target");
      if (!targetTd) {
        // something went wrong, rechoose
        updateState((d) => (d.target = undefined));
        return;
      }
      targetTd.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }, state.timeout + 200);
  }, [state.randomModeOn, state.target]);

  const renderCardRow = (card: Card) => (
    <tr key={card.id}>
      <td
        className={classNames({
          //target: card.id === state.target,
          //marked: card.isMarked,
          closed: !card.isCaseNameOpened,
          opened: card.isCaseNameOpened,
        })}
        onClick={() =>
          updateState((d) => {
            const cardUpdate = d.cards.find((c) => c.id === card.id)!;
            cardUpdate.isCaseNameOpened = !cardUpdate.isCaseNameOpened;
          })
        }
      >
        <div className="case-usage-casename">
          {card.isCaseNameOpened ? card.caseName : "??????"}
        </div>
      </td>
      <td
        className={classNames({
          target: card.id === state.target,
          marked: card.isMarked,
          closed: !card.isTextOpened,
          opened: card.isTextOpened,
        })}
        onClick={(event) => {
          const sideClicked = whichSideOfElementWasClicked(event);

          updateState((d) => {
            const cardUpdate = d.cards.find((c) => c.id === card.id)!;
            if (sideClicked === "right") {
              cardUpdate.isMarked = !cardUpdate.isMarked;
            } else {
              cardUpdate.isTextOpened = !cardUpdate.isTextOpened;
              if (cardUpdate.isTextOpened) {
                cardUpdate.isCaseNameOpened = true;
              }
              if (cardUpdate.id === state.target) {
                d.target = undefined;
              }
            }
          });
        }}
      >
        <div className="case-usage-text">
          {card.isTextOpened ? card.textWhenOpened : card.textWhenClosed}
        </div>
      </td>
    </tr>
  );

  return (
    <div id="cases-usage">
      <div className="submenu-std">
        <button
          onClick={() =>
            updateState((d) => {
              d.cards.forEach((x) => (x.isTextOpened = true));
              d.cards.forEach((x) => (x.isCaseNameOpened = true));
            })
          }
        >
          <div className="text">otworzyć wszystkie</div>
          <div className="icon">
            <MdFlipToFront />
          </div>
        </button>
        <button
          onClick={() =>
            updateState((d) => {
              d.cards.forEach((x) => (x.isTextOpened = false));
              d.cards.forEach((x) => (x.isCaseNameOpened = false));
            })
          }
        >
          <div className="text">zamknąć wszystkie</div>
          <div className="icon">
            <MdFlipToBack />
          </div>
        </button>
        <button
          onClick={() =>
            updateState((d) => {
              d.randomModeOn = !d.randomModeOn;
              d.target = undefined;
            })
          }
        >
          <div className="text">
            {state.randomModeOn ? "przestań ćwiczyć" : "rozpocznij ćwiczyć"}
          </div>
          <div className="icon">
            <GiCardRandom />
          </div>
        </button>
        <button
          onClick={() =>
            updateState((d) => {
              d.cards = getCaseData(10, false, d.cards);
              d.target = undefined;
            })
          }
        >
          <div className="text">
            wygenerować 10
            <br />
            <i>zachowuje zaznaczone kartki</i>
          </div>
          <div className="icon">
            <MdShuffle />
          </div>
        </button>
        <button
          onClick={() =>
            updateState((d) => {
              d.cards = getCaseData(100, true, d.cards);
              d.target = undefined;
            })
          }
        >
          <div className="text">
            wygenerować max
            <br />
            <i>zachowuje zaznaczone kartki</i>
          </div>
          <div className="icon">
            <MdShuffle />
          </div>
        </button>
        <button
          onClick={() => {
            const st = { ...state };
            st.hasSavedData = true;
            window.localStorage.setItem(
              CASES_USAGE_STATE_QS_KEY,
              JSON.stringify(st)
            );
            updateState((d) => {
              d.hasSavedData = true;
            });
            alert("Stan zapisany.");
          }}
        >
          <div className="text">
            zapisać <br />
            bieżący stan
          </div>
          <div className="icon">
            <GiSave />
          </div>
        </button>
        {state.hasSavedData && (
          <button
            onClick={() => {
              updateState(
                (d) =>
                  attemptGetDataByQSKey<CurrentState>(
                    CASES_USAGE_STATE_QS_KEY
                  ) ?? d
              );
            }}
          >
            <div className="text">
              załadować <br />
              bieżący stan
            </div>
            <div className="icon">
              <GiLoad />
            </div>
          </button>
        )}
        <button
          className="verbs-button"
          onClick={() => {
            updateState((d) => {
              d.timeout += 500;
              if (d.timeout > 5000) {
                d.timeout = 1000;
              }
            });
          }}
        >
          <div className="text">Zwłoka {state.timeout / 1000} sek.</div>
          <div className="icon">
            <MdAvTimer />
          </div>
        </button>
      </div>
      <div>
        Kliknij na kartki, prawa strona do odwrócenia, lewa strona do
        zaznaczenia
      </div>
      <div className="table-container-std">
        <table className="table-std">
          <thead>
            <tr>
              <th>Przypadek</th>
              <th>Użycie</th>
            </tr>
          </thead>
          <tbody>{state.cards.map((card) => renderCardRow(card))}</tbody>
        </table>
      </div>
    </div>
  );
}
