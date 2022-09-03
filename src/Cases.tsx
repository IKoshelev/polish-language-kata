import React, { useState } from 'react';

type Card = {
    isFlipped?: boolean;
    front: string[],
    back: string[],
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

const casesData: CaseData[] = [
    {
        name: 'Mianownik',
        question: 'Kto? Co?',
        use: 'To jest...; To są...',
        cards: {
            singular: [{
                back: [
                    "To jest (młody Marek)",
                    "To jest (dobry kot)"
                ],
                front: [
                    "To jest młody Marek",
                    "To jest dobry kot"
                ]
            }, {
                back: [
                    "To jest (drogi samochód)"
                ],
                front: [
                    "To jest drogi samochód"
                ]
            }, {
                back: [
                    "To jest (ładna matka)"
                ],
                front: [
                    "To jest ładna matka"
                ]
            }, {
                back: [
                    "To jest (krótkie kino)",
                    "To jest (małe akwarium)"
                ],
                front: [
                    "To jest krótkie kino",
                    "To jest małe akwarium"
                ]
            }],
            plural: [{
                back: [
                    "To są (młody Marek)",
                ],
                front: [
                    "To są młodzi Markowie "
                ]
            }, {
                back: [
                    "To są (drogi samochód)",
                    "To są (dobry kot)"
                ],
                front: [
                    "To są drogie samochody",
                    "To są dobre koty"
                ]
            }, {
                back: [
                    "To są (ładna matka)"
                ],
                front: [
                    "To są ładne matki"
                ]
            }, {
                back: [
                    "To są (krótkie kino)",
                    "To są (małe akwarium)"
                ],
                front: [
                    "To są krótkie kina",
                    "To są małe akwaria"
                ]
            }]
        }
    }
];

function useRender() {
    const [counter, setCounter] = useState(0);
    return () => setCounter(counter + 1);
}

export function Cases() {

    const render = useRender();

    const renderCardCells = (card: Card) =>
        <td
            key={card.front[0]}
            style={{
                backgroundColor: card.isFlipped ? '' : 'lightgray'
            }}
        >
            <div
                onClick={() => { card.isFlipped = !card.isFlipped; render() }}>
                {(card.isFlipped
                    ? card.front
                    : card.back)
                    .map(x => <div key={x}>{x}</div>)}
            </div>
        </td>;

    return (
        <table style={{ width: "100%" }}>
            <tbody>
                {casesData.map(cse => <>
                    <tr key={cse.name + '1'}>
                        <td rowSpan={2}>
                            <strong>{cse.name}</strong><br />
                            {cse.question}<br />
                            {cse.use}
                        </td>
                        {cse.cards.singular.map(renderCardCells)}
                    </tr>
                    <tr key={cse.name + '2'}>
                        {cse.cards.plural.map(renderCardCells)}
                    </tr>
                </>)}
            </tbody>
        </table>
    );
}