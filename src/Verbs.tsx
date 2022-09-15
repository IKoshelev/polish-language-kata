import React, { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { entries, getRandomItem, shuffleAndReturnArr, useRender } from './util';

const VERBS_STATE_QS_KEY = 'verbs-state-key';

type Card = {
    isFlipped?: boolean;
    isMarked?: boolean;
    tense: string;
    hidden: string;
    revealed: string;
    rule?: string;
    id: number;
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
    forms: { [K in FormKey]: T };
    general_rule?: string;
    tense: string;
}

function conjugationsDict<T>(
    ja_m: T, ja_k: T,
    ty_m: T, ty_k: T,
    on: T, ona: T, ono: T,
    my_m: T, my_nm: T,
    wy_m: T, wy_nm: T,
    oni: T, one: T, tense: string, general_rule?: string): ConjugationsDict<T> {
    return {
        forms: {
            'ja m.': ja_m, 'ja k.': ja_k,
            'ty m.': ty_m, 'ty k.': ty_k,
            on, ona, ono,
            'my m.': my_m, 'my n.m.': my_nm,
            'wy m.': wy_m, 'wy n.m.': wy_nm,
            oni, one
        },
        general_rule,
        tense
    }
}

type VerbsData = {
    section: keyof typeof sourceData;
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

const sourceData = {
    "1 koniugacja; -ę, -esz": {
        'pisać': conjugationsDictSource(
            ...x(2, 'piszę'),
            ...x(2, 'piszesz'),
            ...x(3, 'pisze'),
            ...x(2, 'piszemy'),
            ...x(2, 'piszecie'),
            ...x(2, 'piszą'),
            "Czas teraźniejszy"
        ),
        'myć': conjugationsDictSource(
            ...x(2, 'myję'),
            ...x(2, 'myjesz'),
            ...x(3, 'myje'),
            ...x(2, 'myjemy'),
            ...x(2, 'myjecie'),
            ...x(2, 'myją'),
            "Czas teraźniejszy",
            'jednosylabowy => my+ j +e'
        ),
        'żyć': conjugationsDictSource(
            ...x(2, 'żyję'),
            ...x(2, 'żyjesz'),
            ...x(3, 'żyje'),
            ...x(2, 'żyjemy'),
            ...x(2, 'żyjecie'),
            ...x(2, 'żyją'),
            "Czas teraźniejszy",
            'jednosylabowy: my+ j +e'
        ),
        'praco͟w͟a͟ć͟': conjugationsDictSource(
            ...x(2, 'pracuję'),
            ...x(2, 'pracujesz'),
            ...x(3, 'pracuje'),
            ...x(2, 'pracujemy'),
            ...x(2, 'pracujecie'),
            ...x(2, 'pracują'),
            "Czas teraźniejszy",
            '–ować: owa -> uj'
        ),
        'kupo͟w͟a͟ć͟': conjugationsDictSource(
            ...x(2, 'kupuję'),
            ...x(2, 'kupujesz'),
            ...x(3, 'kupuje'),
            ...x(2, 'kupujemy'),
            ...x(2, 'kupujecie'),
            ...x(2, 'kupują'),
            "Czas teraźniejszy",
            '–ować: owa -> uj'
        ),
        'daw͟a͟ć͟': conjugationsDictSource(
            ...x(2, 'daję'),
            ...x(2, 'dajesz'),
            ...x(3, 'daje'),
            ...x(2, 'dajemy'),
            ...x(2, 'dajecie'),
            ...x(2, 'dają'),
            "Czas teraźniejszy",
            '–wać: wa -> j'
        ),
        'szano͟w͟a͟ć͟': conjugationsDictSource(
            ...x(2, 'szanuję'),
            ...x(2, 'szanujesz'),
            ...x(3, 'szanuje'),
            ...x(2, 'szanujemy'),
            ...x(2, 'szanujecie'),
            ...x(2, 'szanują'),
            "Czas teraźniejszy",
            '–ować: owa -> uj'
        ),
        'nieść': conjugationsDictSource(
            ...x(2, 'niosę'),
            ...x(2, 'niesiesz'),
            ...x(3, 'niesie'),
            ...x(2, 'niesiemy'),
            ...x(2, 'niesiecie'),
            ...x(2, 'niosą'),
            "Czas teraźniejszy",
            '2 tematy 1,6 oraz 2,3,4,5'
        ),
        'brać': conjugationsDictSource(
            ...x(2, 'biorę'),
            ...x(2, 'bierzesz'),
            ...x(3, 'bierze'),
            ...x(2, 'bierzemy'),
            ...x(2, 'bierzecie'),
            ...x(2, 'biorą'),
            "Czas teraźniejszy",
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
            ...x(2, 'mówią'),
            "Czas teraźniejszy"
        ),
        'robić': conjugationsDictSource(
            ...x(2, 'robię'),
            ...x(2, 'robisz'),
            ...x(3, 'robi'),
            ...x(2, 'robimy'),
            ...x(2, 'robicie'),
            ...x(2, 'robią'),
            "Czas teraźniejszy"
        ),
        'lubić': conjugationsDictSource(
            ...x(2, 'lubię'),
            ...x(2, 'lubisz'),
            ...x(3, 'lubi'),
            ...x(2, 'lubimy'),
            ...x(2, 'lubicie'),
            ...x(2, 'lubią'),
            "Czas teraźniejszy"
        ),
        'widzieć': conjugationsDictSource(
            ...x(2, 'widzę'),
            ...x(2, 'widzisz'),
            ...x(3, 'widzi'),
            ...x(2, 'widzimy'),
            ...x(2, 'widzicie'),
            ...x(2, 'widzą'),
            "Czas teraźniejszy"
        ),
        'myśleć': conjugationsDictSource(
            ...x(2, 'myślę'),
            ...x(2, 'myślisz'),
            ...x(3, 'myśli'),
            ...x(2, 'myślimy'),
            ...x(2, 'myślicie'),
            ...x(2, 'myślą'),
            "Czas teraźniejszy"
        ),
        'słyszeć': conjugationsDictSource(
            ...x(2, 'słyszę'),
            ...x(2, 'słyszysz'),
            ...x(3, 'słyszy'),
            ...x(2, 'słyszymy'),
            ...x(2, 'słyszycie'),
            ...x(2, 'słyszą'),
            "Czas teraźniejszy"
        ),
        'uczyć się': conjugationsDictSource(
            ...x(2, 'uczę się'),
            ...x(2, 'uczysz się'),
            ...x(3, 'uczy się'),
            ...x(2, 'uczymy się'),
            ...x(2, 'uczycie się'),
            ...x(2, 'uczą się'),
            "Czas teraźniejszy"
        ),
        'tańczyć': conjugationsDictSource(
            ...x(2, 'tańczę'),
            ...x(2, 'tańczysz'),
            ...x(3, 'tańczy'),
            ...x(2, 'tańczymy'),
            ...x(2, 'tańczycie'),
            ...x(2, 'tańczą'),
            "Czas teraźniejszy"
        )
    },
    "4 koniugacją; -m; -sz": {
        'czytać': conjugationsDictSource(
            ...x(2, 'czytam'),
            ...x(2, 'czytasz'),
            ...x(3, 'czyta'),
            ...x(2, 'czytamy'),
            ...x(2, 'czytacie'),
            ...x(2, 'czytają'),
            "Czas teraźniejszy",
        ),
        'mieszkać': conjugationsDictSource(
            ...x(2, 'mieszkam'),
            ...x(2, 'mieszkasz'),
            ...x(3, 'mieszka'),
            ...x(2, 'mieszkamy'),
            ...x(2, 'mieszkacie'),
            ...x(2, 'mieszkają'),
            "Czas teraźniejszy",
        ),
        'umieć': conjugationsDictSource(
            ...x(2, 'umiem'),
            ...x(2, 'umiesz'),
            ...x(3, 'umie'),
            ...x(2, 'umiemy'),
            ...x(2, 'umiecie'),
            ...x(2, 'umieją'),
            "Czas teraźniejszy",
        ),
        'rozumieć': conjugationsDictSource(
            ...x(2, 'rozumiem'),
            ...x(2, 'rozumiesz'),
            ...x(3, 'rozumie'),
            ...x(2, 'rozumiemy'),
            ...x(2, 'rozumiecie'),
            ...x(2, 'rozumieją'),
            "Czas teraźniejszy",
        ),
    },
    "Czasowniki nieregularne": {
        'być': conjugationsDictSource(
            ...x(2, 'jestem'),
            ...x(2, 'jesteś'),
            ...x(3, 'jest'),
            ...x(2, 'jesteśmy'),
            ...x(2, 'jesteście'),
            ...x(2, 'są'),
            "Czas teraźniejszy",
        ),
        'iść': conjugationsDictSource(
            ...x(2, 'idę'),
            ...x(2, 'idziesz'),
            ...x(3, 'idzie'),
            ...x(2, 'idziemy'),
            ...x(2, 'idziecie'),
            ...x(2, 'idą'),
            "Czas teraźniejszy",
        ),
        'jechać': conjugationsDictSource(
            ...x(2, 'jadę'),
            ...x(2, 'jedziesz'),
            ...x(3, 'jedzie'),
            ...x(2, 'jedziemy'),
            ...x(2, 'jedziecie'),
            ...x(2, 'jadą'),
            "Czas teraźniejszy",
        ),
        'chcieć': conjugationsDictSource(
            ...x(2, 'chcę'),
            ...x(2, 'chcesz'),
            ...x(3, 'chce'),
            ...x(2, 'chcemy'),
            ...x(2, 'chcecie'),
            ...x(2, 'chcą'),
            "Czas teraźniejszy",
        ),
        'móc': conjugationsDictSource(
            ...x(2, 'mogę'),
            ...x(2, 'możesz'),
            ...x(3, 'może'),
            ...x(2, 'możemy'),
            ...x(2, 'możecie'),
            ...x(2, 'mogą'),
            "Czas teraźniejszy",
        ),
        'jeździć': conjugationsDictSource(
            ...x(2, 'jeżdżę'),
            ...x(2, 'jeździsz'),
            ...x(3, 'jeździ'),
            ...x(2, 'jeździmy'),
            ...x(2, 'jeździcie'),
            ...x(2, 'jeżdżą'),
            "Czas teraźniejszy",
        ),
        'mieć': conjugationsDictSource(
            ...x(2, 'mam'),
            ...x(2, 'masz'),
            ...x(3, 'ma'),
            ...x(2, 'mamy'),
            ...x(2, 'macie'),
            ...x(2, 'mają'),
            "Czas teraźniejszy",
        ),
        'jeść': conjugationsDictSource(
            ...x(2, 'jem'),
            ...x(2, 'jesz'),
            ...x(3, 'je'),
            ...x(2, 'jemy'),
            ...x(2, 'jecie'),
            ...x(2, 'jedzą'),
            "Czas teraźniejszy",
        ),
        'wiedzieć': conjugationsDictSource(
            ...x(2, 'wiem'),
            ...x(2, 'wiesz'),
            ...x(3, 'wie'),
            ...x(2, 'wiemy'),
            ...x(2, 'wiecie'),
            ...x(2, 'wiedzą'),
            "Czas teraźniejszy",
        ),
    },
    "Czas przeszły": {
        'czytać': conjugationsDictSource(
            "czytałem",
            "czytałam",
            "czytałeś",
            "czytałaś",
            "czytał",
            "czytała",
            "czytało",
            "czytaliśmy",
            "czytałyśmy",
            "czytaliście",
            "czytałyście",
            "czytali",
            "czytały",
            "Czas przeszły",
        ),
        'kupować': conjugationsDictSource(
            "kupowałem",
            "kupowałam",
            "kupowałeś",
            "kupowałaś",
            "kupował",
            "kupowała",
            "kupowało",
            "kupowaliśmy",
            "kupowałyśmy",
            "kupowaliście",
            "kupowałyście",
            "kupowali",
            "kupowały",
            "Czas przeszły",
        ),
        'mie͟ć͟': conjugationsDictSource(
            "miałem",
            "miałam",
            "miałeś",
            "miałaś",
            "miał",
            "miała",
            "miało",
            "mieliśmy",
            "miałyśmy",
            "mieliście",
            "miałyście",
            "mieli",
            "miały",
            "Czas przeszły",
            "-eć: e -> a oprócz m.osob"
        ),
        'wole͟ć͟': conjugationsDictSource(
            "wolałem",
            "wolałam",
            "wolałeś",
            "wolałaś",
            "wolał ",
            "wolała",
            "wolało",
            "woleliśmy",
            "wlałyśmy",
            "woleliście",
            "wolałyście",
            "woleli",
            "wolały",
            "Czas przeszły",
            "-eć: e -> a oprócz m.osob"
        ),
        'nieś͟ć͟': conjugationsDictSource(
            "niosłem",
            "niosłam",
            "niosłeś",
            "niosłaś",
            "niósł",
            "niosła",
            "niosło",
            "nieśliśmy",
            "niosłyśmy",
            "nieśliście",
            "niosłyście",
            "nieśli",
            "niosły",
            "Czas przeszły",
            "-eć: e -> a oprócz m.osob"
        ),
        'wieź͟ć͟': conjugationsDictSource(
            "wiozłem",
            "wiozłam",
            "wiozłeś",
            "wiozłaś",
            "wiózł",
            "wiozła",
            "wiozło",
            "wieźliśmy",
            "wiozłyśmy",
            "wieźliście",
            "wiozłyście",
            "wieźli",
            "wiozły",
            "Czas przeszły",
            "-eć: e -> a oprócz m.osob"
        ),
        'iść': conjugationsDictSource(
            "szedłem",
            "szłam",
            "szedłeś",
            "szłaś",
            "szedł",
            "szła",
            "szło",
            "szliśmy",
            "szłyśmy",
            "szliście",
            "szłyście",
            "szli",
            "szły",
            "Czas przeszły",
            "Nieregularny"
        ),
    },
    "Czas przyszły złożony": {
        'czytać': conjugationsDictSource(
            "będę czytał",
            "będę czytała",
            "będziesz czytał",
            "będziesz czytała",
            "będzie czytał",
            "będzie czytała",
            "będzie czytało",
            "będziemy czytali",
            "będziemy czytały",
            "będziecie czytali",
            "będziecie czytały",
            "będą czytali",
            "będą czytały",
            "Czas przyszły złożony"
        ),
        'czytać 2': conjugationsDictSource(
            ...x(2, 'będę czytać'),
            ...x(2, 'będziesz czytać'),
            ...x(3, 'będzie czytać'),
            ...x(2, 'będziemy czytać '),
            ...x(2, 'będziecie czytać'),
            ...x(2, 'będą czytać'),
            "Czas przyszły złożony"
        ),
    },
    "Tryb rozkazujący": {
        'pisać': conjugationsDictSource(
            ...x(2, '_'),
            ...x(2, 'pisz'),
            ...x(3, 'niech pisze'),
            ...x(2, 'piszmy'),
            ...x(2, 'piszcie'),
            ...x(2, 'niech piszą'),
            "Tryb rozkazujący"
        ),
        'pracować': conjugationsDictSource(
            ...x(2, '_'),
            ...x(2, 'pracuj'),
            ...x(3, 'niech pracuje'),
            ...x(2, 'pracujcie'),
            ...x(2, 'piszcie'),
            ...x(2, 'niech pracują'),
            "Tryb rozkazujący"
        ),
        'przypominać': conjugationsDictSource(
            ...x(2, '_'),
            ...x(2, 'przypomnij'),
            ...x(3, 'niech przypomni'),
            ...x(2, 'przypomnijmy'),
            ...x(2, 'przypomnijcie'),
            ...x(2, 'niech przypomną'),
            "Tryb rozkazujący"
        ),
        'czytać': conjugationsDictSource(
            ...x(2, '_'),
            ...x(2, 'czytaj'),
            ...x(3, 'niech czyta'),
            ...x(2, 'czytajmy'),
            ...x(2, 'czytajcie'),
            ...x(2, 'niech czytają'),
            "Tryb rozkazujący"
        ),
        'robić': conjugationsDictSource(
            ...x(2, '_'),
            ...x(2, 'rób'),
            ...x(3, 'niech robi'),
            ...x(2, 'róbmy'),
            ...x(2, 'róbcie'),
            ...x(2, 'niech robią'),
            "Tryb rozkazujący"
        ),
    },
    "Tryb przypuszczający": {
        'pisałbym': conjugationsDictSource(
            "pisałbym",
            "pisałabym",
            "pisałbyś",
            "pisałabyś",
            "pisałby",
            "pisałaby",
            "pisałoby",
            "pisalibyśmy",
            "pisałybyśmy",
            "pisalibyście",
            "pisałybyście",
            "pisaliby",
            "pisałyby",
            "Tryb przypuszczający"
        ),
        'gdy': conjugationsDictSource(
            "gdybym miał - zrobiłbym",
            "gdybym miała - zrobiłabym",
            "gdybyś miał - zrobiłbyś",
            "gdybyś miała - zrobiłabyś",
            "gdyby miał - zrobiłby",
            "gdyby miała -zrobiłaby",
            "gdyby miało- zrobiłoby",
            "gdybyśmy mieli - zrobilibyśmy",
            "gdybyśmy miały - zrobiłybyśmy",
            "gdybyście mieli - zrobilibyście",
            "gdybyście miały - zrobiłybyście",
            "gdyby mieli - zrobiliby",
            "gdyby miały - zrobiłyby",
            "Tryb przypuszczający"
        )
    }
} as const;

type CurrentState = {
    cards: VerbsData,
    timeout: number;
    target?: Card | undefined,
    randomModeOn: boolean,
    activeSections: Partial<Record<(keyof typeof sourceData), boolean>>;
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
                id: Math.random(),
                tense: source.tense,
                hidden: `${k} (${verb})`,
                revealed: `${k} ${answer}`,
                rule
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

function attemptGetCardsDataByQSKey(): CurrentState | undefined {
    const searchParams = new URLSearchParams(window.location.search);
    if (false === searchParams.has(VERBS_STATE_QS_KEY)) {
        return;
    }

    const key = searchParams.get(VERBS_STATE_QS_KEY);
    const item = window.localStorage.getItem(`${VERBS_STATE_QS_KEY}-${key}`);
    if (!item) { return; }
    return JSON.parse(item);
}

function getAllCards(data: VerbsData, activeSections?: Partial<Record<(keyof typeof sourceData), boolean>>): Card[] {

    let sections = data;

    if (activeSections) {
        sections = sections.filter(s => activeSections[s.section] === true);
    }

    return sections
        .flatMap(x => x.verbs)
        .flatMap(x => entries(x.forms.forms))
        .map(([k, v]) => v);
}

export function Verbs() {

    const [state, updateState] = useImmer(() => attemptGetCardsDataByQSKey() ?? {
        cards: prepareCards(),
        timeout: 2000,
        target: undefined,
        randomModeOn: false,
        activeSections: entries(sourceData).reduce((prev, [k, v]) => {
            prev[k] = true;
            return prev
        }, {} as CurrentState['activeSections'])
    });

    useEffect(() => {
        if (state.randomModeOn && (!state.target || state.target.isFlipped)) {
            const allShownCards = getAllCards(state.cards, state.activeSections).filter(x => !x.isFlipped);
            if (allShownCards.length === 0) {
                setTimeout(() => {
                    alert('Gratulacje!');
                    updateState(d => { d.randomModeOn = false; })
                }, 2500);
                return;
            }

            const randomCard = getRandomItem(allShownCards);
            setTimeout(() => updateState(d => { d.target = randomCard; }), state.timeout);

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
            }, state.timeout + 100);
        }
    }, [state.randomModeOn, state.target?.id]);

    const renderCardCell = (card: Card, rowSpan: number) =>
        <td
            rowSpan={rowSpan}
            className={`verb-text ${card.id === state.target?.id ? 'target' : ''} ${card.isMarked ? 'marked' : ''}`}
            onClick={(event) => {

                const currentTargetRect = event.currentTarget.getBoundingClientRect();
                const eventOffsetX = event.pageX - currentTargetRect.left;
                // eventOffsetY = event.pageY - currentTargetRect.top;
                const isRightSide = eventOffsetX < (currentTargetRect.width / 2);

                updateState(d => {
                    const cardMut = getAllCards(d.cards).find(c => c.id === card.id)!;

                    if (isRightSide) {
                        cardMut.isMarked = !cardMut.isMarked;
                    } else {
                        cardMut.isFlipped = !cardMut.isFlipped;
                        if (cardMut.id === state.target?.id) {
                            d.target = undefined;
                        }
                    }
                });
            }}
            key={card.revealed}
            style={{
                backgroundColor: card.id === state.target?.id ? 'lightgreen' :
                    !card.isFlipped ? 'lightgray' :
                        ""
            }}
        >
            <div>
                <div style={{
                    fontStyle: "italic"
                }}>
                    {card.tense}
                </div>
                <div>{
                    (card.isFlipped
                        ? card.revealed
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
                onClick={() => updateState(d => {
                    getAllCards(d.cards).forEach(x => x.isFlipped = true);
                })}
            >otworzyć wszystkie</button>
            <button
                className='verbs-button'
                onClick={() => updateState(d => {
                    getAllCards(d.cards).forEach(x => x.isFlipped = false);
                })}
            >zamknąć wszystkie</button>
            <button
                className='verbs-button'
                onClick={() => updateState(d => {
                    d.randomModeOn = !d.randomModeOn;
                    d.target = undefined;
                })}
            >
                {state.randomModeOn ? "dezaktywować tryb losowy" : "aktywować tryb losowy"}
            </button>
            <button
                className='verbs-button'
                onClick={() => {
                    const searchParams = new URLSearchParams(window.location.search);
                    const num = Math.random();
                    const key = `${VERBS_STATE_QS_KEY}-${num}`;
                    window.localStorage.setItem(key, JSON.stringify(state));
                    searchParams.set(VERBS_STATE_QS_KEY, num.toString());
                    window.location.search = searchParams.toString();
                    alert('Stan zapisany. Zakładka strony, aby ponownie ją otworzyć (tylko na tym urządzeniu).')
                }}
            >zapisać bieżący stan</button>
            <button
                className='verbs-button'
                onClick={() => {
                    updateState((d) => {
                        d.cards = prepareCards(true);
                        d.target = undefined;
                    });
                }}
            >tasować <br /> <i>dodaje trudniejsze słowa</i> <br /> <i>zachowuje zaznaczone kartki</i></button>
            <button
                className='verbs-button'
                onClick={() => {
                    updateState((d) => {
                        d.timeout += 500;
                        if (d.timeout > 5000) {
                            d.timeout = 1000;
                        }
                    });
                }}
            >Zwłoka {state.timeout / 1000} s</button>
        </div>
        <div>Sekcje:</div>
        <div className="verbs-sections">     
            {
                entries(sourceData).map(([k, v]) => {
                    return <div
                        className='section-checkbox'
                        onClick={() => updateState((d) => {
                            d.activeSections[k] = !d.activeSections[k];
                        })}
                    >
                        <span style={{
                            fontSize: '2em'
                        }}>{state.activeSections[k] === true ? '☑' : '☐'}</span>
                        {k}
                    </div>
                })
            }
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
                {state.cards
                    .filter(sectionData => state.activeSections[sectionData.section] === true)
                    .map(sectionData => <>
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