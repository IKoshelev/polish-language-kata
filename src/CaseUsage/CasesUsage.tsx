import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import {
  attemptGetDataByQSKey,
  getRandomItem,
  whichSideOfElementWasClicked,
} from "../util";
import {
  MdAvTimer,
  MdFlipToBack,
  MdShuffle,
  MdOutlineTranslate,
  MdFlipToFront,
} from "react-icons/md";
import { GiCardRandom, GiLoad, GiSave } from "react-icons/gi";
import classNames from "classnames";
import { Card, CaseName, cases, getCaseData } from "./CasesUsageData";

const CASES_USAGE_STATE_QS_KEY = "cases-usage-state-key";

type CurrentState = {
  cards: Card[];
  timeout: number;
  target?: number | undefined;
  hasSavedData: boolean;
  randomModeOn: boolean;
  sections: {
    name: CaseName;
    active: boolean;
  }[];
};

export function CasesUsage() {
  const [state, updateState] = useImmer(
    () =>
      ({
        cards: getCaseData(),
        timeout: 2000,
        target: undefined,
        hasSavedData: !!localStorage.getItem(CASES_USAGE_STATE_QS_KEY),
        sections: [
          {
            name: cases.dopełniacz,
            active: true,
          },
          {
            name: cases.celownik,
            active: true,
          },
          {
            name: cases.biernik,
            active: true,
          },
          {
            name: cases.narzędnik,
            active: true,
          },
        ],
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

    const allCards = state.cards
      .filter((x) => activeSections.has(x.caseName))
      .filter((x) => !x.isTextOpened);
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

    // make sure newly selected tile is visible
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
      {/* <td
        className={classNames({
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
      </td> */}
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
          {card.isTextOpened ? (
            <>
              {card.textWhenOpened} <br />
              <span style={{ fontStyle: "italic" }}>{card.caseName}</span>
            </>
          ) : (
            <>
              {card.textWhenClosed} <br />
              &nbsp;
            </>
          )}
        </div>
        <div className="case-usage-translation">
          <a
            target="_blank"
            href={`https://www.bing.com/TRANSLATOR?${getQSforBingTranslator(
              card.textBare
            )}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MdOutlineTranslate />
          </a>
        </div>
      </td>
    </tr>
  );

  const activeSections = new Set(
    state.sections.filter((x) => x.active).map((x) => x.name)
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
              <th>Użycie</th>
            </tr>
          </thead>
          <tbody>
            {state.cards
              .filter((x) => activeSections.has(x.caseName))
              .map((card) => renderCardRow(card))}
          </tbody>
        </table>
      </div>
    </div>
  );

  function getQSforBingTranslator(text: string) {
    const params = new URLSearchParams();
    params.set("text", text);
    return params.toString();
  }
}
