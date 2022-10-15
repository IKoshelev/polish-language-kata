import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import {
  attemptGetDataByQSKey,
  getRandomItem,
  scrollIntoView,
  shuffleAndReturnArr,
  whichSideOfElementWasClicked,
} from "../util";
import {
  MdAvTimer,
  MdFlipToBack,
  MdFlipToFront,
  MdShuffle,
} from "react-icons/md";
import { GiCardDraw, GiCardExchange, GiCardRandom, GiLoad, GiSave } from "react-icons/gi";
import classNames from "classnames";
import {
  basicCaseData,
  Card,
  CaseData,
  getRandomizedCaseData,
} from "./CasesEndingsData";

const CASES_ENDINGS_STATE_QS_KEY = "cases-endings-state-key";

type CurrentState = {
  cards: CaseData[];
  timeout: number;
  target?: number | undefined;
  hasSavedData: boolean;
  randomModeOn: boolean;
};

const getAllCards = (caseData: CaseData[]) =>
  caseData
    .flatMap((x) => x.cards)
    .flatMap((x) => [x.plural, x.singular])
    .flatMap((x) => x);

export function CasesEndings() {
  const [state, updateState] = useImmer(
    () =>
      ({
        cards: basicCaseData,
        timeout: 2000,
        target: undefined,
        hasSavedData: !!localStorage.getItem(CASES_ENDINGS_STATE_QS_KEY),
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

    const allCards = getAllCards(state.cards).filter((x) => !x.isOpened);
    if (allCards.length === 0) {
      setTimeout(() => {
        alert("Gratulacje!");
        updateState((d) => {
          d.cards.forEach((x) => (x.caseNameIsOpened = true));
          d.randomModeOn = false;
        });
      }, 2500);
      return;
    }

    const randomCard = getRandomItem(allCards);
    setTimeout(
      () =>
        updateState((d) => {
          d.cards.forEach((x) => (x.caseNameIsOpened = false));
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
      scrollIntoView(targetTd);
    }, state.timeout + 200);
  }, [state.randomModeOn, state.target]);

  const renderCardCells =
    (isPlural: boolean) => (card: Card, caseData: CaseData) =>
      (
        <td
          key={card.textWhenOpened[0]}
          className={classNames("case-text", {
            target: card.id === state.target,
            marked: card.isMarked,
            closed: !card.isOpened,
            opened: card.isOpened,
          })}
          onClick={(event) => {
            const sideClicked = whichSideOfElementWasClicked(event);

            updateState((d) => {
              const cardUpdate = getAllCards(d.cards).find(
                (c) => c.id === card.id
              )!;
              if (sideClicked === "right") {
                cardUpdate.isMarked = !cardUpdate.isMarked;
              } else {
                cardUpdate.isOpened = !cardUpdate.isOpened;
                if (cardUpdate.isOpened) {
                  d.cards.find(
                    (x) => x.name === caseData.name
                  )!.caseNameIsOpened = true;
                }
                if (cardUpdate.id === state.target) {
                  d.target = undefined;
                }
              }
            });
          }}
        >
          <div>
            {(card.isOpened ? card.textWhenOpened : card.textWhenClosed).map(
              (x) => (
                <div key={x}>{x}</div>
              )
            )}
          </div>
        </td>
      );

  return (
    <div id="cases-endings">
      <div className="submenu-std">
        <button
          onClick={() =>
            updateState((d) => {
              getAllCards(d.cards).forEach((x) => (x.isOpened = true));
              d.cards.forEach((x) => (x.caseNameIsOpened = true));
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
              getAllCards(d.cards).forEach((x) => (x.isOpened = false));
              d.cards.forEach((x) => (x.caseNameIsOpened = false));
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
              d.cards = getRandomizedCaseData(d.cards);
              d.target = undefined;
            })
          }
        >
          <div className="text">
            wygenerować <br /> <i>dodaje trudniejsze słowa</i> <br />{" "}
            <i>zachowuje zaznaczone kartki</i>
          </div>
          <div className="icon">
            <GiCardDraw />
          </div>
        </button>
        <button
          onClick={() =>
            updateState((d) => {
              shuffleAndReturnArr(d.cards);
              d.target = undefined;
            })
          }
        >
          <div className="text">tasować</div>
          <div className="icon">
            <GiCardExchange />
          </div>
        </button>
        <button
          onClick={() => {
            const st = { ...state };
            st.hasSavedData = true;
            window.localStorage.setItem(
              CASES_ENDINGS_STATE_QS_KEY,
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
                    CASES_ENDINGS_STATE_QS_KEY
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
              <th>Rodzaj Męski (ten, ci) Żywotny</th>
              <th>Rodzaj Męski (ten, ci) Nieżywotny</th>
              <th rowSpan={2}>Rodzaj żeński (ta, te)</th>
              <th rowSpan={2}>Rodzaj nijaki (to, te)</th>
            </tr>
            <tr>
              <th>Męskoosobowy</th>
              <th>Męski nieosobowy</th>
            </tr>
          </thead>
          <tbody>
            {state.cards.map((cse) => (
              <React.Fragment key={cse.name}>
                <tr key={cse.name + "description"}>
                  <td
                    className={classNames("case-description", {
                      closed: !cse.caseNameIsOpened,
                      opened: cse.caseNameIsOpened,
                    })}
                    colSpan={4}
                    onClick={() =>
                      updateState((d) => {
                        const caseDraft = d.cards.find(
                          (x) => x.name === cse.name
                        )!;
                        caseDraft.caseNameIsOpened =
                          !caseDraft.caseNameIsOpened;
                      })
                    }
                  >
                    <span
                      style={{
                        position: "sticky",
                        float: "left",
                        left: 25,
                        textAlign: "left",
                      }}
                    >
                      {cse.caseNameIsOpened ? (
                        <>
                          <strong>{cse.name}</strong>&nbsp;
                          {cse.question}
                          <br />
                          {cse.use}
                        </>
                      ) : (
                        <>
                          ??????
                          <br />
                          ??????
                        </>
                      )}
                    </span>
                  </td>
                </tr>
                <tr key={cse.name + "singular"}>
                  {cse.cards.singular.map((x) =>
                    renderCardCells(false)(x, cse)
                  )}
                </tr>
                <tr key={cse.name + "plural"}>
                  {cse.cards.plural.map((x) => renderCardCells(true)(x, cse))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
