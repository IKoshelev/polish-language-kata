import classNames from "classnames";
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import {
  MdAvTimer,
  MdFlipToBack,
  MdFlipToFront,
  MdShuffle,
} from "react-icons/md";
import { GiCardExchange, GiCardRandom, GiLoad, GiSave } from "react-icons/gi";
import {
  attemptGetDataByQSKey,
  getRandomItem,
  scrollIntoView,
  shuffleAndReturnArr,
  whichSideOfElementWasClicked,
} from "../util";
import { Card, NumeralDict, prepareCards } from "./NumeralsData";

const NUMERALS_STATE_QS_KEY = "numerals-state-key";

function getAllCards(numerals: NumeralDict[]): Card[] {
  return numerals.flatMap((x) => x.cards);
}

type CurrentState = {
  numerals: NumeralDict[];
  sections: {
    name: string;
    active: boolean;
    lowerBound: number;
    upperBound: number;
  }[];
  timeout: number;
  target?: Card | undefined;
  randomModeOn: boolean;
  hasSavedData: boolean;
};

function getNumeralsFromActiveSections(state: CurrentState) {
  return state.numerals.filter((numeral) => {
    const numParsed = Number(numeral.numeral);
    return state.sections
      .filter((x) => x.active)
      .some((x) => x.lowerBound <= numParsed && numParsed <= x.upperBound);
  });
}

export function Numerals() {
  const [state, updateState] = useImmer(
    () =>
      ({
        numerals: prepareCards(),
        timeout: 2000,
        sections: [
          {
            name: "0-10",
            active: true,
            lowerBound: 0,
            upperBound: 10,
          },
          {
            name: "11-19",
            active: true,
            lowerBound: 11,
            upperBound: 19,
          },
          {
            name: "20-90",
            active: true,
            lowerBound: 20,
            upperBound: 90,
          },
          {
            name: "100-900",
            active: true,
            lowerBound: 100,
            upperBound: 900,
          },
          {
            name: "1000-....",
            active: true,
            lowerBound: 1000,
            upperBound: 9999999999,
          },
        ],
        target: undefined,
        randomModeOn: false,
        hasSavedData: !!localStorage.getItem(NUMERALS_STATE_QS_KEY),
      } as CurrentState)
  );

  useEffect(() => {
    if (state.randomModeOn && (!state.target || state.target.isOpened)) {
      const allShownCards = getAllCards(
        getNumeralsFromActiveSections(state)
      ).filter((x) => !x.isOpened);

      if (allShownCards.length === 0) {
        setTimeout(() => {
          alert("Gratulacje!");
          updateState((d) => {
            d.randomModeOn = false;
          });
        }, 2500);
        return;
      }

      const randomCard = getRandomItem(allShownCards);
      setTimeout(
        () =>
          updateState((d) => {
            d.target = randomCard;
          }),
        state.timeout
      );

      // make sure newly selected tile is visible
      setTimeout(() => {
        const targetTd = window.document.querySelector("td.target");
        if (!targetTd) {
          // something went wrong, rechoose
          updateState((d) => (d.target = undefined));
          return;
        }
        scrollIntoView(targetTd);
      }, state.timeout + 200);
    }
  }, [state.randomModeOn, state.target?.id]);

  const renderCardCell = (card: Card) => (
    <td
      className={classNames("numerals-text", {
        target: card.id === state.target?.id,
        marked: card.isMarked,
        closed: !card.isOpened,
        opened: card.isOpened,
      })}
      onClick={(event) => {
        const sideClicked = whichSideOfElementWasClicked(event);

        updateState((d) => {
          const cardMut = getAllCards(d.numerals).find(
            (c) => c.id === card.id
          )!;

          if (sideClicked === "right") {
            cardMut.isMarked = !cardMut.isMarked;
          } else {
            cardMut.isOpened = !cardMut.isOpened;
            if (cardMut.id === state.target?.id) {
              d.target = undefined;
            }
          }
        });
      }}
      key={card.textWhenClosed}
    >
      <div>
        {card.isOpened ? (
          <div>{card.textWhenOpened}</div>
        ) : (
          <div>{card.textWhenClosed}</div>
        )}
      </div>
    </td>
  );

  return (
    <div id="numerals">
      <div className="submenu-std">
        <button
          onClick={() =>
            updateState((d) => {
              getAllCards(d.numerals).forEach((x) => (x.isOpened = true));
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
              getAllCards(d.numerals).forEach((x) => (x.isOpened = false));
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
          onClick={() => {
            updateState((d) => {
              shuffleAndReturnArr(d.numerals);
              d.target = undefined;
            });
          }}
        >
          <div className="text">
            tasować
          </div>
          <div className="icon">
            <GiCardExchange />
          </div>
        </button>
        <button
          onClick={() => {
            const st = { ...state };
            st.hasSavedData = true;
            window.localStorage.setItem(
              NUMERALS_STATE_QS_KEY,
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
                  attemptGetDataByQSKey<CurrentState>(NUMERALS_STATE_QS_KEY) ??
                  d
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
        <strong>Sekcje:</strong>
      </div>
      <div className="subsections-std">
        {state.sections.map((section) => {
          return (
            <div
              key={section.name}
              className="subsection-checkbox"
              onClick={() =>
                updateState((d) => {
                  const s = d.sections.find((x) => x.name === section.name)!;
                  s.active = !s?.active;
                })
              }
            >
              {section.name}
              <span>{section.active === true ? "✔️" : " "}</span>
            </div>
          );
        })}
      </div>
      <div>
        Kliknij na kartki, prawa strona do odwrócenia, lewa strona do
        zaznaczenia
      </div>
      <div className="table-container-std">
        <table className="table-std">
          <thead>
            <tr>
              <th></th>
              <th>Ile?</th>
              <th>Który?</th>
              <th>Która?</th>
              <th>Które?</th>
              <th>Którego</th>
              <th>Której</th>
              <th>O którym?</th>
              <th>O której?</th>
            </tr>
          </thead>
          <tbody>
            {getNumeralsFromActiveSections(state).map((numeralData) => (
              <tr key={numeralData.numeral}>
                <td>{numeralData.numeral}</td>
                {numeralData.cards.map((numeralCard) =>
                  renderCardCell(numeralCard)
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
