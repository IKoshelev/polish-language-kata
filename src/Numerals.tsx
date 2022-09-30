import classNames from "classnames";
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import {
  MdAvTimer,
  MdFlipToBack,
  MdFlipToFront,
  MdShuffle,
} from "react-icons/md";
import { GiCardRandom, GiLoad, GiSave } from "react-icons/gi";

import {
  attemptGetDataByQSKey,
  getRandomItem,
  shuffleAndReturnArr,
} from "./util";

const NUMERALS_STATE_QS_KEY = "numerals-state-key";

type Card = {
  isOpened?: boolean;
  isMarked?: boolean;
  textWhenClosed: string;
  textWhenOpened: string;
  id: number;
};

type NumeralDict = {
  numeral: string;
  cards: [Card, Card, Card, Card, Card, Card, Card, Card];
};

type NumeralForms = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

const numeralsDictBase: NumeralForms[] = [
  [
    "0",
    "zero",
    "zerowy",
    "zerowa",
    "zerowe",
    "zerowego",
    "zerowej",
    "zerowym",
    "zerowej",
  ],
  [
    "1",
    "jeden",
    "pierwszy",
    "pierwsza",
    "pierwsze",
    "pierwszego",
    "pierwszeej",
    "pierwszym",
    "pierwszej",
  ],
  [
    "2",
    "dwa",
    "drugi",
    "druga",
    "drugie",
    "drugiego",
    "drugiej",
    "drugim",
    "drugiej",
  ],
  [
    "3",
    "trzy",
    "trzeci",
    "trzecia",
    "trzecie",
    "trzeciego",
    "trzeciej",
    "trzecim",
    "trzeciej",
  ],
  [
    "4",
    "cztery",
    "czwarty",
    "czwarta",
    "czwarte",
    "czwartego",
    "czwartej",
    "czwartym",
    "czwartej",
  ],
  [
    "5",
    "pięć",
    "piąty",
    "piąta",
    "piąte",
    "piątego",
    "piątej",
    "piątym",
    "piątej",
  ],
  [
    "6",
    "sześć",
    "szósty",
    "szósta",
    "szóste",
    "szóstego",
    "szóstej",
    "szóstym",
    "szóstej",
  ],
  [
    "7",
    "siedem",
    "siódmy",
    "siódma",
    "siódme",
    "siódmego",
    "siódmej",
    "siódmym",
    "siódmej",
  ],
  ["8", "osiem", "ósmy", "ósma", "ósme", "ósmego", "ósmej", "ósmym", "ósmej"],
  [
    "9",
    "dziewięć",
    "dziewiąty",
    "dziewiąta",
    "dziewiąte",
    "dziewiątego",
    "dziewiątej",
    "dziewiątym",
    "dziewiątej",
  ],
  [
    "10",
    "dziesięć",
    "dziesiąty",
    "dziesiąta",
    "dziesiąte",
    "dziesiątego",
    "dziesiątej",
    "dziesiątym",
    "dziesiątej",
  ],
  [
    "11",
    "jedenaście",
    "jedenasty",
    "jedenasta",
    "jedenaste",
    "jedenastego",
    "jedenastej",
    "jedenastym",
    "jedenastej",
  ],
  [
    "12",
    "dwanaście",
    "dwunasty",
    "dwunasta",
    "dwunaste",
    "dwunastego",
    "dwunastej",
    "dwunastym",
    "dwunastej",
  ],
  [
    "13",
    "trzynaście",
    "trzynasty",
    "trzynasta",
    "trzynaste",
    "trzynastego",
    "trzynastej",
    "trzynastym",
    "trzynastej",
  ],
  [
    "14",
    "czternaście",
    "czternasty",
    "czternasta",
    "czternaste",
    "czternastego",
    "czternastej",
    "czternastym",
    "czternastej",
  ],
  [
    "15",
    "piętnaście",
    "piętnasty",
    "piętnasta",
    "piętnaste",
    "piętnastego",
    "piętnastej",
    "piętnastym",
    "piętnastej",
  ],
  [
    "16",
    "szesnaście",
    "szesnasty",
    "szesnasta",
    "szesnaste",
    "szesnastego",
    "szesnastej",
    "szesnastym",
    "szesnastej",
  ],
  [
    "17",
    "siedemnaście",
    "siedemnasty",
    "siedemnasta",
    "siedemnaste",
    "siedemnastego",
    "siedemnastej",
    "siedemnastym",
    "siedemnastej",
  ],
  [
    "18",
    "osiemnaście",
    "osiemnasty",
    "osiemnasta",
    "osiemnaste",
    "osiemnastego",
    "osiemnastej",
    "osiemnastym",
    "osiemnastej",
  ],
  [
    "19",
    "dziewiętnaście",
    "dziewiętnasty",
    "dziewiętnasta",
    "dziewiętnaste",
    "dziewiętnastego",
    "dziewiętnastej",
    "dziewiętnastym",
    "dziewiętnastej",
  ],
  [
    "20",
    "dwadzieścia",
    "dwudziesty",
    "dwudziesta",
    "dwudzieste",
    "dwudziestego",
    "dwudziestej",
    "dwudziestym",
    "dwudziestej",
  ],
  [
    "30",
    "trzydzieści",
    "trzydziesty",
    "trzydziesta",
    "trzydzieste",
    "trzydziestego",
    "trzydziestej",
    "trzydziestym",
    "trzydziestej",
  ],
  [
    "40",
    "czterdzieści",
    "czterdziesty",
    "czterdziesta",
    "czterdzieste",
    "czterdziestego",
    "czterdziestej",
    "czterdziestym",
    "czterdziestej",
  ],
  [
    "50",
    "pięćdziesiąt",
    "pięćdziesiąty",
    "pięćdziesiąta",
    "pięćdziesiąte",
    "pięćdziesiątego",
    "pięćdziesiątej",
    "pięćdziesiątym",
    "pięćdziesiątej",
  ],
  [
    "60",
    "sześćdziesiąt",
    "sześćdziesiąty",
    "sześćdziesiąta",
    "sześćdziesiąte",
    "sześćdziesiątego",
    "sześćdziesiątej",
    "sześćdziesiątym",
    "sześćdziesiątej",
  ],
  [
    "70",
    "siedemdziesiąt",
    "siedemdziesiąty",
    "siedemdziesiąta",
    "siedemdziesiąte",
    "siedemdziesiątego",
    "siedemdziesiątej",
    "siedemdziesiątym",
    "siedemdziesiątej",
  ],
  [
    "80",
    "osiemdziesiąt",
    "osiemdziesiąty",
    "osiemdziesiąta",
    "osiemdziesiąte",
    "osiemdziesiątego",
    "osiemdziesiątej",
    "osiemdziesiątym",
    "osiemdziesiątej",
  ],
  [
    "90",
    "dziewięćdziesiąt",
    "dziewięćdziesiąty",
    "dziewięćdziesiąta",
    "dziewięćdziesiąte",
    "dziewięćdziesiątego",
    "dziewięćdziesiątej",
    "dziewięćdziesiątym",
    "dziewięćdziesiątej",
  ],
  [
    "100",
    "sto",
    "setny",
    "setna",
    "setne",
    "setnego",
    "setnej",
    "setnym",
    "setnej",
  ],
  [
    "200",
    "dwieście",
    "dwusetny",
    "dwusetna",
    "dwusetne",
    "dwusetnego",
    "dwusetnej",
    "dwusetnym",
    "dwusetnej",
  ],
  [
    "300",
    "trzysta",
    "trzechsetny",
    "trzechsetna",
    "trzechsetne",
    "trzechsetnego",
    "trzechsetnej",
    "trzechsetnym",
    "trzechsetnej",
  ],
  [
    "400",
    "czterysta",
    "czterechsetny",
    "czterechsetna",
    "czterechsetne",
    "czterechsetnego",
    "czterechsetnej",
    "czterechsetnym",
    "czterechsetnej",
  ],
  [
    "500",
    "pięćset",
    "pięćsetny",
    "pięćsetna",
    "pięćsetne",
    "pięćsetnego",
    "pięćsetnej",
    "pięćsetnym",
    "pięćsetnej",
  ],
  [
    "600",
    "sześćset",
    "sześćsetny",
    "sześćsetna",
    "sześćsetne",
    "sześćsetnego",
    "sześćsetnej",
    "sześćsetnym",
    "sześćsetnej",
  ],
  [
    "700",
    "siedemset",
    "siedemsetny",
    "siedemsetna",
    "siedemsetne",
    "siedemsetnego",
    "siedemsetnej",
    "siedemsetnym",
    "siedemsetnej",
  ],
  [
    "800",
    "osiemset",
    "osiemsetny",
    "osiemsetna",
    "osiemsetne",
    "osiemsetnego",
    "osiemsetnej",
    "osiemsetnym",
    "osiemsetnej",
  ],
  [
    "900",
    "dziewięćset",
    "dziewięćsetny",
    "dziewięćsetna",
    "dziewięćsetne",
    "dziewięćsetnego",
    "dziewięćsetnej",
    "dziewięćsetnym",
    "dziewięćsetnej",
  ],
  [
    "1000",
    "tysiąc",
    "tysięczny",
    "tysięczna",
    "tysięczne",
    "tysięcznego",
    "tysięcznej",
    "tysięcznym",
    "tysięcznej",
  ],
  [
    "2000",
    "dwa_tysiące",
    "dwutysięczny",
    "dwutysięczna",
    "dwutysięczne",
    "dwutysięcznego",
    "dwutysięcznej",
    "dwutysięcznym",
    "dwutysięcznej",
  ],
  [
    "5000",
    "pięć_tysięcy",
    "pięciotysięczny",
    "pięciotysięczna",
    "pięciotysięczne",
    "pięciotysięcznego",
    "pięciotysięcznej",
    "pięciotysięcznym",
    "pięciotysięcznej",
  ],
  [
    "1000000",
    "milion",
    "milionowy",
    "milionowa",
    "milionowe",
    "milionowego",
    "milionowej",
    "milionowym",
    "milionowej",
  ],
  [
    "2000000",
    "dwa miliony",
    "dwumilionowy",
    "dwumilionowa",
    "dwumilionowe",
    "dwumilionowego",
    "dwumilionowej",
    "dwumilionowym",
    "dwumilionowej",
  ],
  [
    "5000000",
    "pięć milionów",
    "pięciomilionowy",
    "pięciomilionowa",
    "pięciomilionowe",
    "pięciomilionowego",
    "pięciomilionowej",
    "pięciomilionowym",
    "pięciomilionowej",
  ],
];

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

function prepareCards(): NumeralDict[] {
  return numeralsDictBase.map((x) => {
    const [numeral, ...forms] = x;

    const row: NumeralDict = {
      numeral,
      cards: [
        "Ile?",
        "Który?",
        "Która?",
        "Które?",
        "Którego?",
        "Której?",
        "O którym?",
        "O której?",
      ].map((question, index) => ({
        textWhenClosed: `${question} ${numeral}`,
        textWhenOpened: forms[index],
        id: Math.random(),
      })) as any,
    };

    return row;
  });
}

function getAllCards(numerals: NumeralDict[]): Card[] {
  return numerals.flatMap((x) => x.cards);
}

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
        const currentTargetRect = event.currentTarget.getBoundingClientRect();
        const eventOffsetX = event.pageX - currentTargetRect.left;
        // eventOffsetY = event.pageY - currentTargetRect.top;
        const isRightSide = eventOffsetX < currentTargetRect.width / 2;

        updateState((d) => {
          const cardMut = getAllCards(d.numerals).find(
            (c) => c.id === card.id
          )!;

          if (isRightSide) {
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
      <div>
        <strong>Liczebniki</strong> (kliknij na kartki, prawa strona do
        odwrócenia, lewa strona do zaznaczenia)
      </div>
      <div className="sumbenu-std">
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
            tasować <br /> <i>zachowuje zaznaczone kartki</i>
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
