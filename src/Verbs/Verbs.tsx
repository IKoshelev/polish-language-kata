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
  entries,
  getRandomItem,
  scrollIntoView,
  shuffleAndReturnArr,
  whichSideOfElementWasClicked,
} from "../util";
import { Card, FormKey, prepareCards, sourceData, VerbsData } from "./VerbsData";

const VERBS_STATE_QS_KEY = "verbs-state-key";

const formLayout: [FormKey, number][][] = [
  [
    ["ja m.", 1],
    ["ty m.", 1],
    ["on", 1],
    ["my m.", 1],
    ["wy m.", 1],
    ["oni", 1],
  ],
  [
    ["ja k.", 2],
    ["ty k.", 2],
    ["ona", 1],
    ["my n.m.", 2],
    ["wy n.m.", 2],
    ["one", 2],
  ],
  [["ono", 1]],
];

type CurrentState = {
  cards: VerbsData;
  timeout: number;
  target?: Card | undefined;
  randomModeOn: boolean;
  hasSavedData: boolean;
  activeSections: Partial<Record<keyof typeof sourceData, boolean>>;
};

function getAllCards(
  data: VerbsData,
  activeSections?: Partial<Record<keyof typeof sourceData, boolean>>
): Card[] {
  let sections = data;

  if (activeSections) {
    sections = sections.filter((s) => activeSections[s.section] === true);
  }

  return sections
    .flatMap((x) => x.verbs)
    .flatMap((x) => entries(x.forms.forms))
    .map(([k, v]) => v);
}

export function Verbs() {
  const [state, updateState] = useImmer(
    () =>
      ({
        cards: prepareCards(),
        timeout: 2000,
        target: undefined,
        randomModeOn: false,
        hasSavedData: !!localStorage.getItem(VERBS_STATE_QS_KEY),
        activeSections: entries(sourceData).reduce((prev, [k, v]) => {
          prev[k] = true;
          return prev;
        }, {} as CurrentState["activeSections"]),
      } as CurrentState)
  );

  useEffect(() => {
    if (state.randomModeOn && (!state.target || state.target.isOpened)) {
      const allShownCards = getAllCards(
        state.cards,
        state.activeSections
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

  const renderCardCell = (card: Card, rowSpan: number) => (
    <td
      rowSpan={rowSpan}
      className={classNames("verb-text", {
        target: card.id === state.target?.id,
        marked: card.isMarked,
        closed: !card.isOpened,
        opened: card.isOpened,
      })}
      onClick={(event) => {
        const sideClicked = whichSideOfElementWasClicked(event);

        updateState((d) => {
          const cardMut = getAllCards(d.cards).find((c) => c.id === card.id)!;

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
      key={card.textWhenOpened}
    >
      <div>
        {card.isOpened ? (
          <div>{card.textWhenOpened}</div>
        ) : (
          <>
            <div
              style={{
                fontStyle: "italic",
              }}
            >
              {card.tense}
            </div>
            <div>{card.textWhenClosed}</div>
          </>
        )}
      </div>
    </td>
  );

  return (
    <div id="verbs">
      <div className="submenu-std">
        <button
          onClick={() =>
            updateState((d) => {
              getAllCards(d.cards).forEach((x) => (x.isOpened = true));
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
              shuffleAndReturnArr(d.cards);
              for (const c of d.cards) {
                shuffleAndReturnArr(c.verbs);
              }
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
            window.localStorage.setItem(VERBS_STATE_QS_KEY, JSON.stringify(st));
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
                  attemptGetDataByQSKey<CurrentState>(VERBS_STATE_QS_KEY) ?? d
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
        {entries(sourceData).map(([k, v]) => {
          return (
            <div
              key={k}
              className="subsection-checkbox"
              onClick={() =>
                updateState((d) => {
                  d.activeSections[k] = !d.activeSections[k];
                })
              }
            >
              {k}
              <span>{state.activeSections[k] === true ? "✔️" : " "}</span>
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
            {formLayout.map((row, i) => (
              <tr key={i}>
                {row.map(([form, rowSpan]) => (
                  <th key={form} rowSpan={rowSpan}>
                    {form}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {state.cards
              .filter(
                (sectionData) =>
                  state.activeSections[sectionData.section] === true
              )
              .map((sectionData) => (
                <React.Fragment key={sectionData.section}>
                  <tr key={sectionData.section}>
                    <td className="verb-description" colSpan={6}>
                      {sectionData.section}
                    </td>
                  </tr>

                  {sectionData.verbs.map((verbData) => (
                    <React.Fragment key={`${verbData.verb}-verb`}>
                      <tr key={`${verbData.verb}-verb`}>
                        <td colSpan={6}>
                          <strong>{verbData.verb}</strong> &nbsp;
                          {verbData.forms.general_rule
                            ? verbData.forms.general_rule
                            : ""}
                        </td>
                      </tr>
                      {formLayout.map((row, i) => (
                        <React.Fragment key={`${verbData.verb}-${i}`}>
                          <tr key={`${verbData.verb}-${i}`}>
                            {row.map(([form, rowSpan]) =>
                              renderCardCell(
                                verbData.forms.forms[form],
                                rowSpan
                              )
                            )}
                          </tr>
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
