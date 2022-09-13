import React, { useEffect, useState } from 'react';
import { entries, getRandomItem, shuffleAndReturnArr, useRender } from './util';

const VERBS_STATE_QS_KEY = 'verbs-state-key';

type Card = {
    isFlipped?: boolean;
    isMarked?: boolean;
    hidden: string,
    revealed: {
        answer: string,
        rule?: string | undefined;
    },
}

const forms = [
    'ja m.', 'ja k.',
    'ty m.', 'ty k.',
    'on', 'ona', 'ono',
    'my m.', 'my n.m.',
    'wy m.', 'wy n.m.',
    'oni', 'one'] as const

type FormKey = (typeof forms)[number];

const formLayout: [FormKey, number][][] = [
    [['ja m.', 1], ['ty m.', 1], ['on', 1], ['my m.', 1], ['wy m.', 1], ['oni', 1]],
    [['ja k.', 2], ['ty k.', 2], ['ona', 1], ['my n.m.', 2], ['wy n.m.', 2], ['one', 2]],
    [['ono', 1]]
];

type ConjugationsDict<T> = {
    forms: { [K in FormKey]: T }
    general_rule?: string
}

function conjugationsDict<T>(
    ja_m: T, ja_k: T,
    ty_m: T, ty_k: T,
    on: T, ona: T, ono: T,
    my_m: T, my_nm: T,
    wy_m: T, wy_nm: T,
    oni: T, one: T, general_rule?: string): ConjugationsDict<T> {
    return {
        forms: {
            'ja m.': ja_m, 'ja k.': ja_k,
            'ty m.': ty_m, 'ty k.': ty_k,
            on, ona, ono,
            'my m.': my_m, 'my n.m.': my_nm,
            'wy m.': wy_m, 'wy n.m.': wy_nm,
            oni, one
        },
        general_rule
    }
}

type VerbsDataSource = {
    [section: string]: { [verb: string]: ConjugationsDict<string | string[]> }
}

type VerbsData = {
    section: string;
    verbs:
    {
        verb: string;
        forms: ConjugationsDict<Card>
    }[]
}[];

const conjugationsDictSource = conjugationsDict<string | string[]>;

function x<TCount extends number, TValue>(repeat: TCount, value: TValue):
    (TCount extends 0 ? [] :
        TCount extends 1 ? [TValue] :
        TCount extends 2 ? [TValue, TValue] :
        TCount extends 3 ? [TValue, TValue, TValue] :
        TCount extends 4 ? [TValue, TValue, TValue, TValue] :
        TCount extends 5 ? [TValue, TValue, TValue, TValue, TValue] :
        TValue[]) {

    const arr = new Array(repeat);
    for (let i = 0; i < repeat; i++) {
        arr[i] = value
    }
    return arr as any;
}

const sourceData: VerbsDataSource = {
    "1 koniugacja; -ę, -esz": {
        'pisać': conjugationsDictSource(
            ...x(2, 'piszę'),
            ...x(2, 'piszesz'),
            ...x(3, 'pisze'),
            ...x(2, 'piszemy'),
            ...x(2, 'piszecie'),
            ...x(2, 'piszą')
        ),
        'myć': conjugationsDictSource(
            ...x(2, 'myję'),
            ...x(2, 'myjesz'),
            ...x(3, 'myje'),
            ...x(2, 'myjemy'),
            ...x(2, 'myjecie'),
            ...x(2, 'myją'),
            'jednosylabowy => my+ j +e'
        ),
        'żyć': conjugationsDictSource(
            ...x(2, 'żyję'),
            ...x(2, 'żyjesz'),
            ...x(3, 'żyje'),
            ...x(2, 'żyjemy'),
            ...x(2, 'żyjecie'),
            ...x(2, 'żyją'),
            'jednosylabowy: my+ j +e'
        ),
        'praco͟w͟a͟ć͟': conjugationsDictSource(
            ...x(2, 'pracuję'),
            ...x(2, 'pracujesz'),
            ...x(3, 'pracuje'),
            ...x(2, 'pracujemy'),
            ...x(2, 'pracujecie'),
            ...x(2, 'pracują'),
            '–ować: owa -> uj'
        ),
        'kupo͟w͟a͟ć͟': conjugationsDictSource(
            ...x(2, 'kupuję'),
            ...x(2, 'kupujesz'),
            ...x(3, 'kupuje'),
            ...x(2, 'kupujemy'),
            ...x(2, 'kupujecie'),
            ...x(2, 'kupują'),
            '–ować: owa -> uj'
        ),
        'daw͟a͟ć͟': conjugationsDictSource(
            ...x(2, 'daję'),
            ...x(2, 'dajesz'),
            ...x(3, 'daje'),
            ...x(2, 'dajemy'),
            ...x(2, 'dajecie'),
            ...x(2, 'dają'),
            '–wać: wa -> j'
        ),
        'szano͟w͟a͟ć͟': conjugationsDictSource(
            ...x(2, 'szanuję'),
            ...x(2, 'szanujesz'),
            ...x(3, 'szanuje'),
            ...x(2, 'szanujemy'),
            ...x(2, 'szanujecie'),
            ...x(2, 'szanują'),
            '–ować: owa -> uj'
        ),
        'nieść': conjugationsDictSource(
            ...x(2, 'niosę'),
            ...x(2, 'niesiesz'),
            ...x(3, 'niesie'),
            ...x(2, 'niesiemy'),
            ...x(2, 'niesiecie'),
            ...x(2, 'niosą'),
            '2 tematy 1,6 oraz 2,3,4,5'
        ),
        'brać': conjugationsDictSource(
            ...x(2, 'biorę'),
            ...x(2, 'bierzesz'),
            ...x(3, 'bierze'),
            ...x(2, 'bierzemy'),
            ...x(2, 'bierzecie'),
            ...x(2, 'biorą'),
            '2 tematy 1,6 oraz 2,3,4,5'
        ),
    },
    "2/3 koniugacja; -ę, -isz/ysz": {
        'mówić': conjugationsDictSource(
            ...x(2, 'mówię'),
            ...x(2, 'mówisz'),
            ...x(3, 'mówi'),
            ...x(2, 'mówimy'),
            ...x(2, 'mówicie'),
            ...x(2, 'mówią')
        ),
        'robić': conjugationsDictSource(
            ...x(2, 'robię'),
            ...x(2, 'robisz'),
            ...x(3, 'robi'),
            ...x(2, 'robimy'),
            ...x(2, 'robicie'),
            ...x(2, 'robią')
        ),
        'lubić': conjugationsDictSource(
            ...x(2, 'lubię'),
            ...x(2, 'lubisz'),
            ...x(3, 'lubi'),
            ...x(2, 'lubimy'),
            ...x(2, 'lubicie'),
            ...x(2, 'lubią')
        ),
        'widzieć': conjugationsDictSource(
            ...x(2, 'widzę'),
            ...x(2, 'widzisz'),
            ...x(3, 'widzi'),
            ...x(2, 'widzimy'),
            ...x(2, 'widzicie'),
            ...x(2, 'widzą')
        ),
    }

}

function prepareCards(shuffle = false): VerbsData {

    function mapToCard(verb: string, source: ConjugationsDict<string | string[]>): ConjugationsDict<Card> {
        const c: ConjugationsDict<Card> = {
            forms: {}
        } as any;
        c.general_rule = source.general_rule;
        entries(source.forms).forEach(([k, v]) => {

            const [answer, rule] = Array.isArray(v)
                ? v
                : [v, source.general_rule];

            c.forms[k] = ({
                hidden: `${k} (${verb})`,
                revealed: {
                    answer: `${k} ${answer}`,
                    rule
                }
            });
        });

        return c;
    }

    const data: VerbsData =
        entries(sourceData).map(([section, verbs]) => ({
            section,
            verbs: entries(verbs).map(([verb, formStrings]) => ({
                verb,
                forms: mapToCard(verb, formStrings)
            }))
        }));

    if (shuffle) {
        shuffleAndReturnArr(data);
        for (const d of data) {
            shuffleAndReturnArr(d.verbs);
        }
    }

    return data;
}

function attemptGetCardsDataByQSKey(): VerbsData | undefined {
    const searchParams = new URLSearchParams(window.location.search);
    if (false === searchParams.has(VERBS_STATE_QS_KEY)) {
        return;
    }

    const key = searchParams.get(VERBS_STATE_QS_KEY);
    const item = window.localStorage.getItem(`${VERBS_STATE_QS_KEY}-${key}`);
    if (!item) { return; }
    return JSON.parse(item);
}

function getAllCards(data: VerbsData): Card[] {
    return data
        .flatMap(x => x.verbs)
        .flatMap(x => entries(x.forms.forms))
        .map(([k,v]) => v);
}


export function Verbs() {

    const [currentData, setCurrentData] = useState(() => attemptGetCardsDataByQSKey() ?? prepareCards());
    const [randomModeOn, setRandomMode] = useState(false);
    const [target, setTarget] = useState(undefined as undefined | Card);
    const render = useRender();

    useEffect(() => {
        if (randomModeOn && (!target || target.isFlipped)) {
            const allCards = getAllCards(currentData).filter(x => !x.isFlipped);
            if (allCards.length === 0) {
                setTimeout(() => {
                    alert('Gratulacje!');
                    setRandomMode(false);
                }, 2500);
                return;
            }

            const randomCard = getRandomItem(allCards);
            setTimeout(() => setTarget(randomCard), 1500);

            // make sure newly setelect tile is visible
            setTimeout(() => {
                const targetTd = window.document.querySelector('td.target');
                if (targetTd) {
                    targetTd.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center'
                    });
                }
            }, 1600);
        }
    }, [randomModeOn, target]);

    const renderCardCell = (card: Card, rowSpan: number) =>
        <td
            rowSpan={rowSpan}
            className={`verb-text ${card === target ? 'target' : ''} ${card.isMarked ? 'marked' : ''}`}
            onClick={(event) => {

                const currentTargetRect = event.currentTarget.getBoundingClientRect();
                const eventOffsetX = event.pageX - currentTargetRect.left;
                // eventOffsetY = event.pageY - currentTargetRect.top;
                const isRightSide = eventOffsetX < (currentTargetRect.width / 2);

                if (isRightSide) {
                    card.isMarked = !card.isMarked;
                } else {
                    card.isFlipped = !card.isFlipped;
                    if (card === target) {
                        setTarget(undefined);
                    }
                }

                render();
            }}
            key={card.revealed.answer}
            style={{
                backgroundColor: card === target ? 'lightgreen' :
                    !card.isFlipped ? 'lightgray' :
                        ""
            }}
        >
            <div>
                <div>{
                    (card.isFlipped
                        ? card.revealed.answer
                        : card.hidden)
                }</div>
            </div>
        </td>;

    return <>
        <div>
            <strong>Czasowniki</strong> (kliknij na kartki, prawa strona do odwrócenia, lewa strona do zaznaczenia)
        </div>
        <div className="verbs-buttons">

            <button
                className='verbs-button'
                onClick={() => {
                    getAllCards(currentData).forEach(x => x.isFlipped = true);
                    render();
                }}
            >otworzyć wszystkie</button>
            <button
                className='verbs-button'
                onClick={() => {
                    getAllCards(currentData).forEach(x => x.isFlipped = false);
                    render();
                }}
            >zamknąć wszystkie</button>
            <button
                className='verbs-button'
                onClick={() => {
                    setRandomMode(!randomModeOn);
                    setTarget(undefined);
                }}
            >
                {randomModeOn ? "dezaktywować tryb losowy" : "aktywować tryb losowy"}
            </button>
            <button
                className='verbs-button'
                onClick={() => {
                    const searchParams = new URLSearchParams(window.location.search);
                    const num = Math.random();
                    const key = `${VERBS_STATE_QS_KEY}-${num}`;
                    window.localStorage.setItem(key, JSON.stringify(currentData));
                    searchParams.set(VERBS_STATE_QS_KEY, num.toString());
                    window.location.search = searchParams.toString();
                    alert('Stan zapisany. Zakładka strony, aby ponownie ją otworzyć (tylko na tym urządzeniu).')
                }}
            >zapisać bieżący stan</button>
            <button
                className='verbs-button'
                onClick={() => {
                    setCurrentData(prepareCards(true));
                    setTarget(undefined);
                }}
            >tasować <br /> <i>dodaje trudniejsze słowa</i> <br /> <i>zachowuje zaznaczone kartki</i></button>
        </div>

        <table className='verbs-table' style={{ width: "100%" }}>
            <thead>
                {
                    formLayout.map((row, i) =>
                        <tr>
                            {i === 0 && <th rowSpan={3}></th>}
                            {row.map(([form, rowSpan]) =>
                                <th
                                    key={form}
                                    rowSpan={rowSpan}
                                >
                                    {form}
                                </th>)}

                        </tr>)
                }
            </thead>
            <tbody>
                {currentData.map(sectionData => <>
                    <tr
                        key={sectionData.section}>
                        <td
                            className='verb-description'
                            colSpan={7}
                        >
                            {sectionData.section}
                        </td>
                    </tr>

                    {
                        sectionData.verbs.map(verbData =>
                            formLayout.map((row, i) => <>
                                <tr key={`${verbData.verb}-${i}`}>
                                    {i === 0 && <td rowSpan={3}>{verbData.verb}</td>}
                                    {
                                        row.map(([form, rowSpan]) =>
                                            renderCardCell(verbData.forms.forms[form], rowSpan))
                                    }
                                </tr>
                            </>)
                        )
                    }
                </>
                )}
            </tbody>
        </table>
    </>;
}