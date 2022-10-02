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

const forCase =
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

const dopełniacz = forCase("Dopełniacz");

const casesSourceData: CardSourceData[] = [
  dopełniacz(
    [`Boję się {word}`, `Nie bój się {word}`, `Czy państwo boją się {word}`],
    [
      [`pajak l.mn.`, `pajaków`, `Kogo?`],
      [`wonż`, `węża`, `Kogo?`],
      [`wysokość`, `wysokości`, `Czego?`],
    ]
  ),
  dopełniacz(
    [`Zabraklo mu {word}`, `Zaczyna nam brakować {word}`, `Niech Ci nigdy nie zabraknie {word}`],
    [
      [`pieniądz l.mn.`, `pieniędzy`, `Czego?`],
      [`czas`, `czasu`, `Czego?`], 
      [`siła l.mn.`, `sił`, `Czego?`],
    ]
  ),
  dopełniacz(
    [`Ja pilnowałam {word}`, `Pilnuj {word}`, `Muszą pilnować {word}`],
    [
      [`własny interes l. mn.`, ` własnych interesów`, `Czego?`],
      [`rzecz l.mn.`, `rzeczy`, `Czego?`], 
      [`dziecko l.mn.`, `dzieci`, `Kogo?`],
    ]
  ),
  dopełniacz(
    [`On potrzebuje {word}`, `Pilnuj {word}`, `Muszą pilnować {word}`],
    [
      [`własny interes l. mn.`, ` własnych interesów`, `Czego?`],
      [`rzecz l.mn.`, `rzeczy`, `Czego?`], 
      [`dziecko l.mn.`, `dzieci`, `Kogo?`],
    ]
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
      <div>
        Kliknij na kartki, prawa strona do odwrócenia, lewa strona do
        zaznaczenia
      </div>
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
