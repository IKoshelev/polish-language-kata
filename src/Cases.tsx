import React, { useEffect, useState } from 'react';

type Card = {
    isFlipped?: boolean;
    front: string[],
    back: string[],
}

type CardSource = {
    frontTemplate: `${string}${'{verb}'} ${'{noun}'}${string}`,
    backTemplate: `${string}${'{verb}'} ${'{noun}'}${string}`,
    verbs: [string, string][],
    nouns: [string, string][]
}

type CaseData = {
    name: string,
    question: string,
    use: string,
    cards: {
        singular: Card[],
        plural: Card[]
    }
}

type CaseSourceData = {
    name: string,
    question: string,
    use: string,
    cards: {
        singular: CardSource[],
        plural: CardSource[]
    }
}

function getRandomItem<T>(arr: T[]): T {
    const index = Math.floor(arr.length * (Math.random() - 0.001));
    return arr[index];
}

const casesSourceData: CaseSourceData[] = [
    {
        name: 'Mianownik',
        question: 'Kto? Co?',
        use: 'To jest... To są...',
        cards: {
            singular: [{
              frontTemplate: 'To jest {verb} {noun}',
              backTemplate: 'To jest ({verb} {noun})',
              verbs: [['młody','młody'], ['wesoły','wesoły'], ['przystojny','przystojny'], ['dobry','dobry'], ['drogi','drogi']],
              nouns: [['Marek','Marek'],['aktor', 'aktor'], ['kot', 'kot'], ['poeta', 'poeta']]
            }],
            plural: [{ 
              frontTemplate: 'To są {verb} {noun}',
              backTemplate: 'To są ({verb} {noun})  l.mn.',
              verbs: [['młody','młodzi'], ['wesoły','weseli'], ['przystojny','przystojni'], ['dobry','dobrzy'], ['drogi','drodzy']],
              nouns: [['Marek','Markowie'],['aktor', 'aktorzy'], ['student', 'studenci'], ['poeta', 'poeci']]
            }]
        }
    },
    // {
    //     name: 'Dopełniacz',
    //     question: 'Kogo? Czego?',
    //     use: 'Nie ma... Nie znam... Nie widzę...  Nie lubię...',
    //     cards: {
    //         singular: [{
    //             back: [
    //                 "Nie ma (młody Marek)",
    //                 "Nie ma (dobry kot)"
    //             ],
    //             front: [
    //                 "Nie ma młodego Marka",
    //                 "Nie ma dobrego kota"
    //             ]
    //         }, {
    //             back: [
    //                 "Nie ma (drogi samochód)"
    //             ],
    //             front: [
    //                 "Nie ma drogiego samochodu"
    //             ]
    //         }, {
    //             back: [
    //                 "Nie ma (ładna matka)"
    //             ],
    //             front: [
    //                 "Nie ma ładnej matki"
    //             ]
    //         }, {
    //             back: [
    //                 "Nie ma (krótkie kino)",
    //                 "Nie ma (małe akwarium)"
    //             ],
    //             front: [
    //                 "Nie ma krótkiego kina",
    //                 "Nie ma małego akwarium"
    //             ]
    //         }],
    //         plural: [{
    //             back: [
    //                 "Nie ma (młody Marek)",
    //             ],
    //             front: [
    //                 "Nie ma młodych Marków"
    //             ]
    //         }, {
    //             back: [
    //                 "Nie ma (drogi samochód)",
    //                 "Nie ma (dobry kot)"
    //             ],
    //             front: [
    //                 "Nie ma drogich samochodów",
    //                 "Nie ma dobrych kotów"
    //             ]
    //         }, {
    //             back: [
    //                 "Nie ma (ładna matka)"
    //             ],
    //             front: [
    //                 "Nie ma ładnych matek"
    //             ]
    //         }, {
    //             back: [
    //                 "Nie ma (krótkie kino)",
    //                 "TNie ma (małe akwarium)"
    //             ],
    //             front: [
    //                 "Nie ma krótkich kin",
    //                 "Nie ma małych akwariów"
    //             ]
    //         }]
    //     }
    // },
    // {
    //     name: 'Celownik',
    //     question: 'Komu? Czemu?',
    //     use: 'Przyglądam się... Ufam...',
    //     cards: {
    //         singular: [{
    //             back: [
    //                 "Ufam (młody Marek)",
    //                 "Ufam  (dobry kot)"
    //             ],
    //             front: [
    //                 "Ufam młodemu Markowi",
    //                 "Ufam dobremu kotu"
    //             ]
    //         }, {
    //             back: [
    //                 "Ufam (drogi samochód)"
    //             ],
    //             front: [
    //                 "Ufam drogiemu samochodowi"
    //             ]
    //         }, {
    //             back: [
    //                 "Ufam (ładna matka)"
    //             ],
    //             front: [
    //                 "Ufam ładnej matce"
    //             ]
    //         }, {
    //             back: [
    //                 "Ufam (krótkie kino)",
    //                 "Ufam (małe akwarium)"
    //             ],
    //             front: [
    //                 "Ufam krótkiemu kinu",
    //                 "Ufam małemu akwarium"
    //             ]
    //         }],
    //         plural: [{
    //             back: [
    //                 "Ufam (młody Marek)",
    //             ],
    //             front: [
    //                 "Ufam młodym Markom"
    //             ]
    //         }, {
    //             back: [
    //                 "Ufam (drogi samochód)",
    //                 "Ufam (dobry kot)"
    //             ],
    //             front: [
    //                 "Ufam drogim samochodom",
    //                 "Ufam dobrym kotom"
    //             ]
    //         }, {
    //             back: [
    //                 "Ufam (ładna matka)"
    //             ],
    //             front: [
    //                 "Ufam ładnym matkom"
    //             ]
    //         }, {
    //             back: [
    //                 "Ufam (krótkie kino)",
    //                 "Ufam (małe akwarium)"
    //             ],
    //             front: [
    //                 "Ufam krótkim kinom",
    //                 "Ufam małym akwariom"
    //             ]
    //         }]
    //     }
    // },
    // {
    //     name: 'Biernik',
    //     question: 'Kogo? Co?',
    //     use: 'Mam...  Znam... Widzę... Lubię...',
    //     cards: {
    //         singular: [{
    //             back: [
    //                 "Znam (młody Marek)",
    //                 "Znam (dobry kot)"
    //             ],
    //             front: [
    //                 "Znam młodego Marka",
    //                 "Znam dobrego kota"
    //             ]
    //         }, {
    //             back: [
    //                 "Znam (drogi samochód)"
    //             ],
    //             front: [
    //                 "Znam drogi samochód"
    //             ]
    //         }, {
    //             back: [
    //                 "Znam (ładna matka)"
    //             ],
    //             front: [
    //                 "Znam ładną matkę"
    //             ]
    //         }, {
    //             back: [
    //                 "Znam (krótkie kino)",
    //                 "Znam (małe akwarium)"
    //             ],
    //             front: [
    //                 "Znam krótkie kino",
    //                 "Znam małe akwarium"
    //             ]
    //         }],
    //         plural: [{
    //             back: [
    //                 "Znam (młody Marek)",
    //             ],
    //             front: [
    //                 "Znam młodych Marków"
    //             ]
    //         }, {
    //             back: [
    //                 "Znam (drogi samochód)",
    //                 "Znam (dobry kot)"
    //             ],
    //             front: [
    //                 "Znam drogie samochody",
    //                 "Znam dobre koty"
    //             ]
    //         }, {
    //             back: [
    //                 "Znam (ładna matka)"
    //             ],
    //             front: [
    //                 "Znam ładne matki"
    //             ]
    //         }, {
    //             back: [
    //                 "Znam (krótkie kino)",
    //                 "Znam (małe akwarium)"
    //             ],
    //             front: [
    //                 "Znam krótkie kina",
    //                 "Znam małe akwaria"
    //             ]
    //         }]
    //     }
    // },
    // {
    //     name: 'Narzędnik',
    //     question: '(Z) Kim? Czym?',
    //     use: 'Idę z … na drinka; Opiekuję się...',
    //     cards: {
    //         singular: [{
    //             back: [
    //                 "Opiekuję (młody Marek)",
    //                 "Opiekuję (dobry kot)"
    //             ],
    //             front: [
    //                 "Opiekuję się młodym Markiem",
    //                 "Opiekuję się dobrym kotem"
    //             ]
    //         }, {
    //             back: [
    //                 "Opiekuję (drogi samochód)"
    //             ],
    //             front: [
    //                 "Opiekuję się drogim samochodem"
    //             ]
    //         }, {
    //             back: [
    //                 "Opiekuję (ładna matka)"
    //             ],
    //             front: [
    //                 "Opiekuję się ładną matką"
    //             ]
    //         }, {
    //             back: [
    //                 "Opiekuję (krótkie kino)",
    //                 "Opiekuję (małe akwarium)"
    //             ],
    //             front: [
    //                 "Opiekuję się krótkim kinem",
    //                 "Opiekuję się małym akwarium"
    //             ]
    //         }],
    //         plural: [{
    //             back: [
    //                 "Opiekuję (młody Marek)",
    //             ],
    //             front: [
    //                 "Opiekuję się młodymi Markami"
    //             ]
    //         }, {
    //             back: [
    //                 "Opiekuję (drogi samochód)",
    //                 "Opiekuję (dobry kot)"
    //             ],
    //             front: [
    //                 "Opiekuję się drogimi samochodami",
    //                 "Opiekuję się dobrymi kotami"
    //             ]
    //         }, {
    //             back: [
    //                 "Opiekuję (ładna matka)"
    //             ],
    //             front: [
    //                 "Opiekuję się ładnymi matkami"
    //             ]
    //         }, {
    //             back: [
    //                 "Opiekuję (krótkie kino)",
    //                 "Opiekuję (małe akwarium)"
    //             ],
    //             front: [
    //                 "Opiekuję się krótkimi kinami",
    //                 "Opiekuję się małymi akwariami"
    //             ]
    //         }]
    //     }
    // },
    // {
    //     name: 'Miejscownik',
    //     question: '(O) Kim? Czym?',
    //     use: 'Marże o... Myślę o...',
    //     cards: {
    //         singular: [{
    //             back: [
    //                 "Myślę o (młody Marek)",
    //                 "Myślę o (dobry kot)"
    //             ],
    //             front: [
    //                 "Myślę o młodym Marku",
    //                 "Myślę o dobrym kocie"
    //             ]
    //         }, {
    //             back: [
    //                 "Myślę o (drogi samochód)"
    //             ],
    //             front: [
    //                 "Myślę o drogim samochodzie"
    //             ]
    //         }, {
    //             back: [
    //                 "Myślę o (ładna matka)"
    //             ],
    //             front: [
    //                 "Myślę o ładnej matce"
    //             ]
    //         }, {
    //             back: [
    //                 "Myślę o (krótkie kino, słońce)",
    //                 "Myślę o (małe akwarium)"
    //             ],
    //             front: [
    //                 "Myślę o krótkim kinie, słońcu",
    //                 "Myślę o małym akwarium"
    //             ]
    //         }],
    //         plural: [{
    //             back: [
    //                 "Myślę o (młody Marek)",
    //             ],
    //             front: [
    //                 "Myślę o młodych Markach"
    //             ]
    //         }, {
    //             back: [
    //                 "Myślę o (drogi samochód)",
    //                 "Myślę o (dobry kot)"
    //             ],
    //             front: [
    //                 "Myślę o drogich samochodach",
    //                 "Myślę o dobrych kotach"
    //             ]
    //         }, {
    //             back: [
    //                 "Myślę o (ładna matka)"
    //             ],
    //             front: [
    //                 "Myślę o ładnych matkach"
    //             ]
    //         }, {
    //             back: [
    //                 "Myślę o (krótkie kino)",
    //                 "Myślę o (małe akwarium)"
    //             ],
    //             front: [
    //                 "Myślę o krótkich kinach",
    //                 "Myślę o małych akwariach"
    //             ]
    //         }]
    //     }
    // },
    // {
    //     name: 'Wołacz',
    //     question: 'O!',
    //     use: 'Drogi...  Drodzy...',
    //     cards: {
    //         singular: [{
    //             back: [
    //                 "O (młody Marek)!",
    //                 "O (dobry kot)!"
    //             ],
    //             front: [
    //                 "O Młody Marku!",
    //                 "O Dobry kocie!"
    //             ]
    //         }, {
    //             back: [
    //                 "O (drogi samochód)!"
    //             ],
    //             front: [
    //                 "O Drogi samochodzie!"
    //             ]
    //         }, {
    //             back: [
    //                 "O (ładna matka)!"
    //             ],
    //             front: [
    //                 "o Ładna matko!"
    //             ]
    //         }, {
    //             back: [
    //                 "O (krótkie kino)!",
    //                 "O (małe akwarium)!"
    //             ],
    //             front: [
    //                 "Krótkie kino!",
    //                 "Małe akwarium!"
    //             ]
    //         }],
    //         plural: [{
    //             back: [
    //                 "O (młody Marek)!",
    //             ],
    //             front: [
    //                 "O Młodzi Markowie!",
    //             ]
    //         }, {
    //             back: [
    //                 "O (drogi samochód)!",
    //                 "O (dobry kot)!"
    //             ],
    //             front: [
    //                 "O Drogie samochody!",
    //                 "O Dobre koty!"
    //             ]
    //         }, {
    //             back: [
    //                 "O (ładna matka)!"
    //             ],
    //             front: [
    //                 "O Ładne matki!"
    //             ]
    //         }, {
    //             back: [
    //                 "O (krótkie kino)!",
    //                 "O (małe akwarium)!"
    //             ],
    //             front: [
    //                 "O Krótkie kina!",
    //                 "O Małe akwaria!"
    //             ]
    //         }],
    //     }
    // },
];

function getRandomizedCaseData(): CaseData[] {
    const sourcesDataClone = JSON.parse(JSON.stringify(casesSourceData)) as CaseSourceData[];

    const sourcesData = sourcesDataClone.map(x => {

        function collapseCardSource(source: CardSource): Card {
            const verb = getRandomItem(source.verbs);
            const noun = getRandomItem(source.nouns);

            return {
                back: [source.backTemplate.replace('{verb}', verb[0]).replace('{noun}', noun[0])],
                front: [source.frontTemplate.replace('{verb}', verb[1]).replace('{noun}', noun[1])]
            }
        }

        const s: CaseData = {
            name: x.name,
            question: x.question,
            use: x.use,
            cards: {
                singular: x.cards.singular.map(collapseCardSource),
                plural: x.cards.plural.map(collapseCardSource)
            }
        }

        return s;
    });

    return sourcesData;
}

let currentCasesData: CaseData[] = attemptGetCasesDataByQSKey() ?? getRandomizedCaseData();

function attemptGetCasesDataByQSKey(): CaseData[] | undefined {
    const searchParams = new URLSearchParams(window.location.search);
    if (false === searchParams.has('state-key')) {
        return;
    }

    const key = searchParams.get('state-key');
    const item = window.localStorage.getItem(`state-key-${key}`);
    if (!item) { return; }
    return JSON.parse(item);
}

const getAllCards = () => currentCasesData
                            .flatMap(x => x.cards)
                            .flatMap(x => [x.plural, x.singular])
                            .flatMap(x => x);

function useRender() {
    const [counter, setCounter] = useState(0);
    return () => setCounter(counter + 1);
}

export function Cases() {

    const [randomModeOn, setRandomMode] = useState(false);
    const [target, setTarget] = useState(undefined as undefined | Card);
    const render = useRender();

    useEffect(() => {
        if (randomModeOn && (!target || target.isFlipped)) {
            const allCards = getAllCards().filter(x => !x.isFlipped);
            if (allCards.length === 0) {
                alert('Gratulacje!');
                return;
            }

            const randomCard = getRandomItem(allCards);
            setTarget(randomCard);
            // make sure newly setelect tile is visible
            setTimeout(() => {
               const targetTd = window.document.querySelector('td.target');
               if (targetTd) {
                targetTd.scrollIntoView({
                    behavior: 'smooth'
                });
               }
            }, 10);                    
        }
    }, [randomModeOn, target]);


    const renderCardCells = (isPlural: boolean) => (card: Card) =>
        <td
            className={`case-text ${card === target ? 'target' : ''}`}
            onClick={() => { 
                card.isFlipped = !card.isFlipped;
                if (card === target) {
                    setTarget(undefined);
                }
                render(); 
            }}
            key={card.front[0]}
            style={{
                backgroundColor: card === target ? 'lightgreen' : 
                                 !card.isFlipped ? 'lightgray' :
                                 ""
            }}
        >
            <div>
                {(card.isFlipped
                    ? card.front
                    : card.back)
                    .map(x => <div key={x}>{x} {(isPlural && !card.isFlipped) ? ' l.mn.' : ''}</div>)}
            </div>
        </td>;

    return (
        <>
            <button
                className='cases-button'
                onClick={() => {
                    getAllCards().forEach(x => x.isFlipped = true);
                    render();
                }}
            >otworzyć wszystkie</button>
            <button
                className='cases-button'
                onClick={() => {
                    getAllCards().forEach(x => x.isFlipped = false);
                    render();
                }}
            >zamknąć wszystkie</button>
            <button
                className='cases-button'
                onClick={() => {   
                    setRandomMode(!randomModeOn);
                    render();
                }}
            >
            {randomModeOn ? "dezaktywuj tryb losowy" : "aktywuj tryb losowy" }
            </button>
            <button
                className='cases-button'
                onClick={() => {
                    const num = Math.random();
                    const key = `state-key-${num}`;
                    window.localStorage.setItem(key, JSON.stringify(currentCasesData));
                    window.location.search = `state-key=${num}`;
                    alert('Stan zapisany. Zakładka strony, aby ponownie ją otworzyć (tylko na tym urządzeniu).')
                }}
            >zapisz bieżący stan</button>
            <button
                className='cases-button'
                onClick={() => {
                    currentCasesData = getRandomizedCaseData();
                    setTarget(undefined);
                    render();
                }}
            >tasować</button>
            <table style={{ width: "100%" }}>
                <tbody>
                    {currentCasesData.map(cse => <>
                        <tr
                            key={cse.name + '1'}>
                            <td
                                className='case-description'
                                rowSpan={2}
                            >
                                <strong>{cse.name}</strong><br />
                                {cse.question}<br />
                                {cse.use}
                            </td>
                            {cse.cards.singular.map(renderCardCells(false))}
                        </tr>
                        <tr key={cse.name + '2'}>
                            {cse.cards.plural.map(renderCardCells(true))}
                        </tr>
                    </>)}
                </tbody>
            </table>
        </>
    );
}