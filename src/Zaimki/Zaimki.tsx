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
import {
  Card,
  formsDeclension,
  formsOdmiana,
  prepareZaimkiWithDeclensionCards,
  prepareZaimkiWithOdmianaCards,
} from "./ZaimkiData";

const ZAIMKI_STATE_QS_KEY = "zaimki-state-key";

type CurrentState = {
  zaimkiWithDeclension: ReturnType<typeof prepareZaimkiWithDeclensionCards>;
  zaimkiWithOdmiana: ReturnType<typeof prepareZaimkiWithOdmianaCards>;
  timeout: number;
  target?: number | undefined;
  randomModeOn: boolean;
  hasSavedData: boolean;
};

function getAllCards(state: CurrentState): Card[] {
  return [
    ...state.zaimkiWithDeclension.flatMap((x) => x.cards),
    ...Object.values(state.zaimkiWithOdmiana)
      .flatMap((x) => x)
      .flatMap((x) => x.cards),
  ];
}

export function Zaimki() {
  const [state, updateState] = useImmer(
    () =>
      ({
        zaimkiWithDeclension: prepareZaimkiWithDeclensionCards(),
        zaimkiWithOdmiana: prepareZaimkiWithOdmianaCards(),
        timeout: 2000,
        target: undefined,
        randomModeOn: false,
        hasSavedData: !!localStorage.getItem(ZAIMKI_STATE_QS_KEY),
      } as CurrentState)
  );

  useEffect(() => {
    const targetCard = getAllCards(state).find((x) => x.id === state.target);

    if (state.randomModeOn && (!targetCard || targetCard.isOpened)) {
      const allShownCards = getAllCards(state).filter((x) => !x.isOpened);
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
    }
  }, [state.randomModeOn, state.target]);

  const renderCardCell = (card: Card) => (
    <td
      key={card.id}
      className={classNames("zaimka-text", {
        target: card.id === state.target,
        marked: card.isMarked,
        closed: !card.isOpened,
        opened: card.isOpened,
      })}
      onClick={(event) => {
        const sideClicked = whichSideOfElementWasClicked(event);

        updateState((d) => {
          const cardMut = getAllCards(d).find((c) => c.id === card.id)!;

          if (sideClicked === "right") {
            cardMut.isMarked = !cardMut.isMarked;
          } else {
            cardMut.isOpened = !cardMut.isOpened;
            if (cardMut.id === state.target) {
              d.target = undefined;
            }
          }
        });
      }}
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
    <div id="zaimki">
      <div className="submenu-std">
        <button
          onClick={() =>
            updateState((d) => {
              getAllCards(d).forEach((x) => (x.isOpened = true));
            })
          }
        >
          <div className="text">otworzy?? wszystkie</div>
          <div className="icon">
            <MdFlipToFront />
          </div>
        </button>
        <button
          onClick={() =>
            updateState((d) => {
              getAllCards(d).forEach((x) => (x.isOpened = false));
            })
          }
        >
          <div className="text">zamkn???? wszystkie</div>
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
            {state.randomModeOn ? "przesta?? ??wiczy??" : "rozpocznij ??wiczy??"}
          </div>
          <div className="icon">
            <GiCardRandom />
          </div>
        </button>
        <button
          onClick={() => {
            updateState((d) => {
              shuffleAndReturnArr(d.zaimkiWithDeclension);
              for (const arr of Object.values(d.zaimkiWithOdmiana)){
                shuffleAndReturnArr(arr);
              }
            });
          }}
        >
          <div className="text">tasowa??</div>
          <div className="icon">
            <GiCardExchange />
          </div>
        </button>
        <button
          onClick={() => {
            const st = { ...state };
            st.hasSavedData = true;
            window.localStorage.setItem(
              ZAIMKI_STATE_QS_KEY,
              JSON.stringify(st)
            );
            updateState((d) => {
              d.hasSavedData = true;
            });
            alert("Stan zapisany.");
          }}
        >
          <div className="text">
            zapisa?? <br />
            bie????cy stan
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
                  attemptGetDataByQSKey<CurrentState>(ZAIMKI_STATE_QS_KEY) ?? d
              );
            }}
          >
            <div className="text">
              za??adowa?? <br />
              bie????cy stan
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
          <div className="text">Zw??oka {state.timeout / 1000} sek.</div>
          <div className="icon">
            <MdAvTimer />
          </div>
        </button>
      </div>
      <div>
        Kliknij na kartki, prawa strona do odwr??cenia, lewa strona do
        zaznaczenia
      </div>
      <div className="section-name">Zaimki rzeczowne</div>
      <div className="pre-table-menu">
        <button
          onClick={() =>
            updateState((d) => {
              d.zaimkiWithDeclension
                .flatMap((x) => x.cards)
                .forEach((x) => (x.isOpened = true));
            })
          }
        >
          <div className="text">otworzy?? sekcje</div>
          <div className="icon">
            <MdFlipToFront />
          </div>
        </button>
        <button
          onClick={() =>
            updateState((d) => {
              d.zaimkiWithDeclension
                .flatMap((x) => x.cards)
                .forEach((x) => (x.isOpened = false));
            })
          }
        >
          <div className="text">zamkn???? sekcje</div>
          <div className="icon">
            <MdFlipToBack />
          </div>
        </button>
      </div>
      <div className="table-container-std">
        <table className="table-std">
          <thead>
            <tr>
              <th></th>
              {formsDeclension.map((x) => (
                <th key={x}>{x}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.zaimkiWithDeclension.map((caseData) => (
              <tr key={caseData.caseName}>
                <td key={caseData.caseName}>{caseData.caseName}</td>
                {caseData.cards.map(renderCardCell)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        entries(state.zaimkiWithOdmiana).map(([word, data]) => renderZaimkiOdmiana(word, data))
      }
    </div>
  );

  function renderZaimkiOdmiana(
    word: string,
    data: {
      caseName: string;
      cards: Card[];
    }[]
  ) {
    return (
      <React.Fragment key={word}>
        <div className="section-name">{word}</div>
        <div className="pre-table-menu">
          <button
            onClick={() =>
              updateState((d) => {
                d.zaimkiWithOdmiana[word]
                  .flatMap((x) => x.cards)
                  .forEach((x) => (x.isOpened = true));
              })
            }
          >
            <div className="text">otworzy?? sekcje</div>
            <div className="icon">
              <MdFlipToFront />
            </div>
          </button>
          <button
            onClick={() =>
              updateState((d) => {
                d.zaimkiWithOdmiana[word]
                  .flatMap((x) => x.cards)
                  .forEach((x) => (x.isOpened = false));
              })
            }
          >
            <div className="text">zamkn???? sekcje</div>
            <div className="icon">
              <MdFlipToBack />
            </div>
          </button>
        </div>
        <div className="table-container-std">
          <table className="table-std">
            <thead>
              <tr>
                <th></th>
                {formsOdmiana.map((x) => (
                  <th key={x}>{x}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((caseData) => (
                <tr key={caseData.caseName}>
                  <td key={caseData.caseName}>{caseData.caseName}</td>
                  {caseData.cards.map(renderCardCell)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
