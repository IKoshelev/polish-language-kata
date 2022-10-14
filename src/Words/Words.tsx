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
  MdOutlineTranslate,
  MdFlipToFront,
} from "react-icons/md";
import { CgPlayTrackNextR, CgPlayTrackPrevR } from "react-icons/cg";
import {
  GiCardDraw,
  GiCardExchange,
  GiCardRandom,
  GiLoad,
  GiSave,
} from "react-icons/gi";
import { RiFilterLine, RiFilterOffLine } from "react-icons/ri";
import classNames from "classnames";
import {
  Card,
  getCardsData,
  Topic,
  topics,
  WordType,
  wordTypes,
} from "./WordsData";

const WORDS_USAGE_STATE_QS_KEY = "words-usage-state-key";

type CurrentState = {
  cards: Card[];
  timeout: number;
  previousTarget?: number | undefined;
  target?: number | undefined;
  hasSavedData: boolean;
  randomModeOn: boolean;
  onlyShowMarked: boolean;
  activeWordTypes: WordType[];
  activeTopics: Topic[];
};

export function Words() {
  const [state, updateState] = useImmer(
    () =>
      ({
        cards: getCardsData(),
        timeout: 2000,
        previousTarget: undefined,
        target: undefined,
        hasSavedData: !!localStorage.getItem(WORDS_USAGE_STATE_QS_KEY),
        activeWordTypes: Object.values(wordTypes),
        activeTopics: Object.values(topics),
        randomModeOn: false,
        onlyShowMarked: false,
      } as CurrentState)
  );

  const activeTopics = new Set(state.activeTopics);

  const activeWordTypes = new Set(state.activeWordTypes);

  const visibleCards = state.cards.filter(
    (x) =>
      (!state.onlyShowMarked || x.isMarked) &&
      activeWordTypes.has(x.wordType) &&
      x.topics.some((t) => activeTopics.has(t))
  );

  useEffect(() => {
    if (!state.randomModeOn) {
      return;
    }

    if (state.target) {
      return;
    }

    const allCards = visibleCards.filter((x) => !x.isTextOpened);
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
      scrollIntoView(targetTd);
    }, state.timeout + 200);
  }, [state.randomModeOn, state.target]);

  const renderCardRow = (card: Card) => (
    <tr key={card.id} id={`card-${card.id}`}>
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
              if (cardUpdate.id === state.target) {
                d.previousTarget = d.target;
                d.target = undefined;
              }
            }
          });
        }}
      >
        <div className="word-usage-text">
          {(card.isTextOpened ? card.textWhenOpened : card.textWhenClosed).map(
            (x) => (
              <div key={x}>{x}</div>
            )
          )}
        </div>
        <div className="word-usage-translation">
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

  return (
    <div id="words">
      <div className="submenu-std">
        <button
          onClick={() =>
            updateState((d) => {
              d.cards.forEach((x) => (x.isTextOpened = true));
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
              d.cards = shuffleAndReturnArr(d.cards);
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
          onClick={() =>
            updateState((d) => {
              d.cards = getCardsData(10, true, state.cards);
              d.target = undefined;
            })
          }
        >
          <div className="text">
            wygenerować po 10 losowo
            <br />
            <i>zachowuje zaznaczone kartki</i>
          </div>
          <div className="icon">
            <GiCardDraw />
          </div>
        </button>
        <button
          onClick={() =>
            updateState((d) => {
              d.cards = getCardsData(10, false, state.cards);
              d.target = undefined;
            })
          }
        >
          <div className="text">
            wygenerować po 10 (niedawnych)
            <br />
            <i>zachowuje zaznaczone kartki</i>
          </div>
          <div className="icon">
            <GiCardDraw />
          </div>
        </button>
        <button
          onClick={() =>
            updateState((d) => {
              d.cards = getCardsData(undefined, true, state.cards);
              d.target = undefined;
            })
          }
        >
          <div className="text">
            wygenerować max losowo
            <br />
            <i>zachowuje zaznaczone kartki</i>
          </div>
          <div className="icon">
            <GiCardDraw />
          </div>
        </button>
        <button
          onClick={() => {
            const st = { ...state };
            st.hasSavedData = true;
            window.localStorage.setItem(
              WORDS_USAGE_STATE_QS_KEY,
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
                    WORDS_USAGE_STATE_QS_KEY
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
        {Object.values(wordTypes).map((wordType) => {
          const active = state.activeWordTypes.includes(wordType);
          return (
            <div
              key={wordType}
              className="subsection-checkbox"
              onClick={() =>
                updateState((d) => {
                  if (active) {
                    d.activeWordTypes = d.activeWordTypes.filter(
                      (x) => x !== wordType
                    );
                  } else {
                    d.activeWordTypes.push(wordType as WordType);
                  }
                })
              }
            >
              {wordType}
              <span>{active === true ? "✔️" : " "}</span>
            </div>
          );
        })}
      </div>
      {/* <div className="subsections-std">
        {Object.values(topics).map((topic) => {
          const active = state.activeTopics.includes(topic);
          return (
            <div
              key={topic}
              className="subsection-checkbox"
              onClick={() =>
                updateState((d) => {
                  if (active) {
                    d.activeTopics = d.activeTopics.filter((x) => x !== topic);
                  } else {
                    d.activeTopics.push(topic as Topic);
                  }
                })
              }
            >
              {topic}
              <span>{active === true ? "✔️" : " "}</span>
            </div>
          );
        })}
      </div> */}
      <div>
        Kliknij na kartki, prawa strona do odwrócenia, lewa strona do
        zaznaczenia.
        <br />
        <MdOutlineTranslate /> - pokażać tłumaczenie w Bing Translator
        <br />
        <RiFilterLine /> - pokażać tylko zaznaczone
        <br />
        <CgPlayTrackPrevR /> - przejść do poprzedniej kartki
        <br />
        <CgPlayTrackNextR /> - przejść do aktualnej kartki
      </div>
      <div className="table-container-std">
        <div id="quick-menu">
          <button
            title="pokaż tylko zaznaczone"
            className={classNames("filter-marked", {
              active: state.onlyShowMarked,
            })}
            onClick={() => {
              updateState((d) => {
                d.onlyShowMarked = !d.onlyShowMarked;
              });
            }}
          >
            {state.onlyShowMarked ? <RiFilterOffLine /> : <RiFilterLine />}
          </button>
          <button
            title="przejdź do poprzedniej kartki"
            onClick={() => {
              const target = window.document.querySelector(
                `#card-${state.previousTarget}`
              );
              if (!target) {
                return;
              }
              scrollIntoView(target);
            }}
            disabled={!state.previousTarget}
          >
            <CgPlayTrackPrevR />
          </button>
          <button
            title="przejdź do aktualnej kartki"
            onClick={() => {
              const target = window.document.querySelector(
                `#card-${state.target}`
              );
              if (!target) {
                return;
              }
              scrollIntoView(target);
            }}
            disabled={!state.target}
          >
            <CgPlayTrackNextR />
          </button>
        </div>
        <table className="table-std">
          <thead>
            <tr>
              <th>Użycie</th>
            </tr>
          </thead>
          <tbody>{visibleCards.map((card) => renderCardRow(card))}</tbody>
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
