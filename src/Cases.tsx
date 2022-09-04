import React, { useEffect, useState } from 'react';

type Card = {
    isFlipped?: boolean;
    front: string[],
    back: string[],
}

type CardTemplateString = `${string}${'{verb}'} ${'{noun}'}${string}`;

type CardSource = {
    templates: [CardTemplateString, CardTemplateString][],
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

const CASES_STATE_QS_KEY = 'cases-state-key';

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
                templates: [['To jest ({verb} {noun})', 'To jest {verb} {noun}']],
                verbs: [['młody', 'młody'], ['wesoły', 'wesoły'], ['przystojny', 'przystojny'], ['dobry', 'dobry'], ['drogi', 'drogi']],
                nouns: [['Marek', 'Marek'], ['aktor', 'aktor'], ['kot', 'kot'], ['poeta', 'poeta']]
            }, {
                templates: [['To jest ({verb} {noun})', 'To jest {verb} {noun}']],
                verbs: [['dobry', 'dobry'], ['drogi', 'drogi'], ['stary', 'stary']],
                nouns: [['samochód', 'samochód'], ['ser', 'ser']]
            }, {
                templates: [['To jest ({verb} {noun})', 'To jest {verb} {noun}']],
                verbs: [['ładna', 'ładna'], ['młoda', 'młoda'], ['inteligentna', 'inteligentna']],
                nouns: [['matka', 'matka'], ['sofa', 'sofa'], ['pani', 'pani'], ['noc', 'noc']]
            }, {
                templates: [['To jest ({verb} {noun})', 'To jest {verb} {noun}']],
                verbs: [['grzecne', 'grzecne'], ['małe', 'małe'], ['wesołe', 'wesołe']],
                nouns: [['kino', 'kino'], ['slońce', 'slońce'], ['dziecko', 'dziecko'], ['imię', 'imię'], ['akwarium', 'akwarium']]
            }],
            plural: [{
                templates: [['To są ({verb} {noun})', 'To są {verb} {noun}']],
                verbs: [['młody', 'młodzi'], ['wesoły', 'weseli'], ['przystojny', 'przystojni'], ['dobry', 'dobrzy'], ['drogi', 'drodzy']],
                nouns: [['Marek', 'Markowie'], ['aktor', 'aktorzy'], ['student', 'studenci'], ['poeta', 'poeci']]
            }, {
                templates: [['To są ({verb} {noun})', 'To są {verb} {noun}']],
                verbs: [['dobry', 'dobre'], ['drogi', 'drogie'], ['stary', 'stare'],  ['dobry', 'dobre']],
                nouns: [['samochód', 'samochody'], ['kot', 'koty'], ['ser', 'sery']]
            }, {
                templates: [['To są ({verb} {noun})', 'To są {verb} {noun}']],
                verbs: [['ładna', 'ładne'], ['młoda', 'młode'], ['inteligentna', 'inteligentne']],
                nouns: [['matka', 'matki'], ['sofa', 'sofy'], ['pani', 'panie'], ['noc', 'nocy']]
            }, {
                templates: [['To są ({verb} {noun})', 'To są {verb} {noun}']],
                verbs: [['grzecne', 'grzecne'], ['małe', 'małe'], ['wesołe', 'wesołe']],
                nouns: [['kino', 'kina'], ['slońce', 'slońca'], ['dziecko', 'dziecka'], ['imię', 'imiona'], ['akwarium', 'akwaria']]
            }]
        }
    },
    {
        name: 'Dopełniacz',
        question: 'Kogo? Czego?',
        use: 'Nie ma... Nie znam... Nie widzę...  Nie lubię...',
        cards: {
            singular: [{
                templates: [
                    ['Nie ma ({verb} {noun})', 'Nie ma {verb} {noun}'],
                    ['Nie znam ({verb} {noun})', 'Nie znam {verb} {noun}'],
                    ['Nie widzę ({verb} {noun})', 'Nie widzę {verb} {noun}'],
                    ['Nie lubię ({verb} {noun})', 'Nie lubię {verb} {noun}']
                ],
                verbs: [['młody', 'młodego'], ['wesoły', 'wesołego'], ['przystojnego', 'przystojny'], ['dobry', 'dobrego'], ['drogi', 'drogiego']],
                nouns: [['Marek', 'Marka'], ['aktor', 'aktora'], ['kot', 'kota'], ['poeta', 'poety']]
            }, {
                templates: [
                    ['Nie ma ({verb} {noun})', 'Nie ma {verb} {noun}'],
                    ['Nie znam ({verb} {noun})', 'Nie znam {verb} {noun}'],
                    ['Nie widzę ({verb} {noun})', 'Nie widzę {verb} {noun}'],
                    ['Nie lubię ({verb} {noun})', 'Nie lubię {verb} {noun}']
                ],
                verbs: [['dobry', 'dobrego'], ['drogi', 'drogiego'], ['stary', 'starego']],
                nouns: [['samochód', 'samochodu'], ['ser', 'sera']]
            }, {
                templates: [
                    ['Nie ma ({verb} {noun})', 'Nie ma {verb} {noun}'],
                    ['Nie znam ({verb} {noun})', 'Nie znam {verb} {noun}'],
                    ['Nie widzę ({verb} {noun})', 'Nie widzę {verb} {noun}'],
                    ['Nie lubię ({verb} {noun})', 'Nie lubię {verb} {noun}']
                ],
                verbs: [['ładna', 'ładnej'], ['młoda', 'młodej'], ['inteligentna', 'inteligentnej']],
                nouns: [['matka', 'matki'], ['sofa', 'sofy'], ['pani', 'pani'], ['noc', 'nocy']]
            }, {
                templates: [
                    ['Nie ma ({verb} {noun})', 'Nie ma {verb} {noun}'],
                    ['Nie znam ({verb} {noun})', 'Nie znam {verb} {noun}'],
                    ['Nie widzę ({verb} {noun})', 'Nie widzę {verb} {noun}'],
                    ['Nie lubię ({verb} {noun})', 'Nie lubię {verb} {noun}']
                ],
                verbs: [['grzecne', 'grzecnego'], ['małe', 'małego'], ['wesołe', 'wesołego']],
                nouns: [['kino', 'kina'], ['slońce', 'slońca'], ['dziecko', 'dziecka'], ['imię', 'imienia'], ['akwarium', 'akwarium']]
            }],
            plural: [{
                templates: [
                    ['Nie ma ({verb} {noun})', 'Nie ma {verb} {noun}'],
                    ['Nie znam ({verb} {noun})', 'Nie znam {verb} {noun}'],
                    ['Nie widzę ({verb} {noun})', 'Nie widzę {verb} {noun}'],
                    ['Nie lubię ({verb} {noun})', 'Nie lubię {verb} {noun}']
                ],
                verbs: [['młody', 'młodych'], ['wesoły', 'wesołych'], ['przystojny', 'przystojnych'], ['dobry', 'dobrych'], ['drogi', 'droich']],
                nouns: [['Marek', 'Marków'], ['aktor', 'aktorów'], ['student', 'studenów'], ['poeta', 'poetów']]
            }, {
                templates: [
                    ['Nie ma ({verb} {noun})', 'Nie ma {verb} {noun}'],
                    ['Nie znam ({verb} {noun})', 'Nie znam {verb} {noun}'],
                    ['Nie widzę ({verb} {noun})', 'Nie widzę {verb} {noun}'],
                    ['Nie lubię ({verb} {noun})', 'Nie lubię {verb} {noun}']
                ],
                verbs: [['dobry', 'dobrych'], ['drogi', 'drogich'], ['stary', 'starych']],
                nouns: [['samochód', 'samochodów'], ['kot', 'kotów'], ['ser', 'serów']]
            }, {
                templates: [
                    ['Nie ma ({verb} {noun})', 'Nie ma {verb} {noun}'],
                    ['Nie znam ({verb} {noun})', 'Nie znam {verb} {noun}'],
                    ['Nie widzę ({verb} {noun})', 'Nie widzę {verb} {noun}'],
                    ['Nie lubię ({verb} {noun})', 'Nie lubię {verb} {noun}']
                ],
                verbs: [['ładna', 'ładnych'], ['młoda', 'młodych'], ['inteligentna', 'inteligentnych']],
                nouns: [['matka', 'matek'], ['sofa', 'sof'], ['pani', 'pań'], ['noc', 'nocy']]
            }, {
                templates: [
                    ['Nie ma ({verb} {noun})', 'Nie ma {verb} {noun}'],
                    ['Nie znam ({verb} {noun})', 'Nie znam {verb} {noun}'],
                    ['Nie widzę ({verb} {noun})', 'Nie widzę {verb} {noun}'],
                    ['Nie lubię ({verb} {noun})', 'Nie lubię {verb} {noun}']
                ],
                verbs: [['grzecne', 'grzecnych'], ['małe', 'małych'], ['wesołe', 'wesołych']],
                nouns: [['kino', 'kin'], ['slońce', 'slońc'], ['dziecko', 'dzieci'], ['imię', 'imion'], ['akwarium', 'akwariów']]
            }]
        }
    },
    {
        name: 'Celownik',
        question: 'Komu? Czemu?',
        use: 'Przyglądam się... Ufam...',
        cards: {
            singular: [{
                templates: [
                    ['Ufam ({verb} {noun})', 'Ufam {verb} {noun}'],
                    ['Przyglądam się ({verb} {noun})', 'Przyglądam się {verb} {noun}'],
                ],
                verbs: [['młody', 'młodemu'], ['wesoły', 'wesołemu'], ['przystojnego', 'przystojnemu'], ['dobry', 'dobremu'], ['drogi', 'drogiemu']],
                nouns: [['Marek', 'Markowi'], ['aktor', 'aktorowi'], ['kot', 'kotu'], ['poeta', 'poecie']]
            }, {
                templates: [
                    ['Ufam ({verb} {noun})', 'Ufam {verb} {noun}'],
                    ['Przyglądam się ({verb} {noun})', 'Przyglądam się {verb} {noun}'],
                ],
                verbs: [['dobry', 'dobremu'], ['drogi', 'drogiemu'], ['stary', 'staremu']],
                nouns: [['samochód', 'samochodowi'], ['ser', 'serowi']]
            }, {
                templates: [
                    ['Ufam ({verb} {noun})', 'Ufam {verb} {noun}'],
                    ['Przyglądam się ({verb} {noun})', 'Przyglądam się {verb} {noun}'],
                ],
                verbs: [['ładna', 'ładnej'], ['młoda', 'młodej'], ['inteligentna', 'inteligentnej']],
                nouns: [['matka', 'matce'], ['sofa', 'sofie'], ['pani', 'pani'], ['noc', 'nocy']]
            }, {
                templates: [
                    ['Ufam ({verb} {noun})', 'Ufam {verb} {noun}'],
                    ['Przyglądam się ({verb} {noun})', 'Przyglądam się {verb} {noun}'],
                ],
                verbs: [['grzecne', 'grzecnemu'], ['małe', 'małemu'], ['wesołe', 'wesołemu']],
                nouns: [['kino', 'kinu'], ['slońce', 'slońcu'], ['dziecko', 'dziecku'], ['imię', 'imieniu'], ['akwarium', 'akwarium']]
            }],
            plural: [{
                templates: [
                    ['Ufam ({verb} {noun})', 'Ufam {verb} {noun}'],
                    ['Przyglądam się ({verb} {noun})', 'Przyglądam się {verb} {noun}'],
                ],
                verbs: [['młody', 'młodym'], ['wesoły', 'wesołym'], ['przystojny', 'przystojnym'], ['dobry', 'dobrym'], ['drogi', 'droim']],
                nouns: [['Marek', 'Markom'], ['aktor', 'aktorom'], ['student', 'studenom'], ['poeta', 'poetom']]
            }, {
                templates: [
                    ['Ufam ({verb} {noun})', 'Ufam {verb} {noun}'],
                    ['Przyglądam się ({verb} {noun})', 'Przyglądam się {verb} {noun}'],
                ],
                verbs: [['dobry', 'dobrym'], ['drogi', 'drogim'], ['stary', 'starym']],
                nouns: [['samochód', 'samochodom'], ['kot', 'kotom'], ['ser', 'serom']]
            }, {
                templates: [
                    ['Ufam ({verb} {noun})', 'Ufam {verb} {noun}'],
                    ['Przyglądam się ({verb} {noun})', 'Przyglądam się {verb} {noun}'],
                ],
                verbs: [['ładna', 'ładnym'], ['młoda', 'młodym'], ['inteligentna', 'inteligentnym']],
                nouns: [['matka', 'matkom'], ['sofa', 'sofom'], ['pani', 'paniom'], ['noc', 'nocom']]
            }, {
                templates: [
                    ['Ufam ({verb} {noun})', 'Ufam {verb} {noun}'],
                    ['Przyglądam się ({verb} {noun})', 'Przyglądam się {verb} {noun}'],
                ],
                verbs: [['grzecne', 'grzecnym'], ['małe', 'małym'], ['wesołe', 'wesołym']],
                nouns: [['kino', 'kinom'], ['slońce', 'slońcom'], ['dziecko', 'dziecom'], ['imię', 'imionom'], ['akwarium', 'akwariom']]
            }]
        }
    },
    {
        name: 'Biernik',
        question: 'Kogo? Co?',
        use: 'Mam...  Znam... Widzę... Lubię...',
        cards: {
            singular: [{
                templates: [
                    ['Mam ({verb} {noun})', 'Mam {verb} {noun}'],
                    ['Znam ({verb} {noun})', 'Znam {verb} {noun}'],
                    ['Widzę ({verb} {noun})', 'Widzę {verb} {noun}'],
                    ['Lubię ({verb} {noun})', 'Lubię {verb} {noun}'],
                ],
                verbs: [['młody', 'młodego'], ['wesoły', 'wesołego'], ['przystojnego', 'przystojnego'], ['dobry', 'dobrego'], ['drogi', 'drogiego']],
                nouns: [['Marek', 'Marka'], ['aktor', 'aktora'], ['kot', 'kota'], ['poeta', 'poetę']]
            }, {
                templates: [
                    ['Mam ({verb} {noun})', 'Mam {verb} {noun}'],
                    ['Znam ({verb} {noun})', 'Znam {verb} {noun}'],
                    ['Widzę ({verb} {noun})', 'Widzę {verb} {noun}'],
                    ['Lubię ({verb} {noun})', 'Lubię {verb} {noun}'],
                ],
                verbs: [['dobry', 'dobry'], ['drogi', 'drogi'], ['stary', 'stary']],
                nouns: [['samochód', 'samochód'], ['ser', 'ser']]
            }, {
                templates: [
                    ['Mam ({verb} {noun})', 'Mam {verb} {noun}'],
                    ['Znam ({verb} {noun})', 'Znam {verb} {noun}'],
                    ['Widzę ({verb} {noun})', 'Widzę {verb} {noun}'],
                    ['Lubię ({verb} {noun})', 'Lubię {verb} {noun}'],
                ],
                verbs: [['ładna', 'ładną'], ['młoda', 'młodą'], ['inteligentna', 'inteligentną']],
                nouns: [['matka', 'matę'], ['sofa', 'sofę'], ['pani', 'panią'], ['noc', 'noc']]
            }, {
                templates: [
                    ['Mam ({verb} {noun})', 'Mam {verb} {noun}'],
                    ['Znam ({verb} {noun})', 'Znam {verb} {noun}'],
                    ['Widzę ({verb} {noun})', 'Widzę {verb} {noun}'],
                    ['Lubię ({verb} {noun})', 'Lubię {verb} {noun}'],
                ],
                verbs: [['grzecne', 'grzecne'], ['małe', 'małe'], ['wesołe', 'wesołe']],
                nouns: [['kino', 'kino'], ['slońce', 'slońce'], ['dziecko', 'dziecko'], ['imię', 'imię'], ['akwarium', 'akwarium']]
            }],
            plural: [{
                templates: [
                    ['Mam ({verb} {noun})', 'Mam {verb} {noun}'],
                    ['Znam ({verb} {noun})', 'Znam {verb} {noun}'],
                    ['Widzę ({verb} {noun})', 'Widzę {verb} {noun}'],
                    ['Lubię ({verb} {noun})', 'Lubię {verb} {noun}'],
                ],
                verbs: [['młody', 'młodych'], ['wesoły', 'wesołych'], ['przystojny', 'przystojnych'], ['dobry', 'dobrych'], ['drogi', 'droich']],
                nouns: [['Marek', 'Marków'], ['aktor', 'aktorów'], ['student', 'studentów'], ['poeta', 'poetów']]
            }, {
                templates: [
                    ['Mam ({verb} {noun})', 'Mam {verb} {noun}'],
                    ['Znam ({verb} {noun})', 'Znam {verb} {noun}'],
                    ['Widzę ({verb} {noun})', 'Widzę {verb} {noun}'],
                    ['Lubię ({verb} {noun})', 'Lubię {verb} {noun}'],
                ],
                verbs: [['dobry', 'dobre'], ['drogi', 'drogi'], ['stary', 'stare']],
                nouns: [['samochód', 'samochody'], ['kot', 'koty'], ['ser', 'sery']]
            }, {
                templates: [
                    ['Mam ({verb} {noun})', 'Mam {verb} {noun}'],
                    ['Znam ({verb} {noun})', 'Znam {verb} {noun}'],
                    ['Widzę ({verb} {noun})', 'Widzę {verb} {noun}'],
                    ['Lubię ({verb} {noun})', 'Lubię {verb} {noun}'],
                ],
                verbs: [['ładna', 'ładne'], ['młoda', 'młode'], ['inteligentna', 'inteligentne']],
                nouns: [['matka', 'matki'], ['sofa', 'sofy'], ['pani', 'panie'], ['noc', 'noce']]
            }, {
                templates: [
                    ['Mam ({verb} {noun})', 'Mam {verb} {noun}'],
                    ['Znam ({verb} {noun})', 'Znam {verb} {noun}'],
                    ['Widzę ({verb} {noun})', 'Widzę {verb} {noun}'],
                    ['Lubię ({verb} {noun})', 'Lubię {verb} {noun}'],
                ],
                verbs: [['grzecne', 'grzecne'], ['małe', 'małe'], ['wesołe', 'wesołe']],
                nouns: [['kino', 'kina'], ['slońce', 'slońca'], ['dziecko', 'dzieci'], ['imię', 'imiona'], ['akwarium', 'akwaria']]
            }]
        }
    },
    {
        name: 'Narzędnik',
        question: '(Z) Kim? Czym?',
        use: 'Idę z … na drinka; Opiekuję się...',
        cards: {
            singular: [{
                templates: [
                    ['Idę z ({verb} {noun}) na drinka', 'Idę z {verb} {noun} na drinka'],
                    ['Opiekuję się ({verb} {noun})', 'Opiekuję się {verb} {noun}'],
                ],
                verbs: [['młody', 'młodym'], ['wesoły', 'wesołym'], ['przystojnego', 'przystojnym'], ['dobry', 'dobrym'], ['drogi', 'drogim']],
                nouns: [['Marek', 'Markiem'], ['aktor', 'aktorem'], ['kot', 'kotem'], ['poeta', 'poetą']]
            }, {
                templates: [
                    ['Idę z ({verb} {noun}) na drinka', 'Idę z {verb} {noun} na drinka'],
                    ['Opiekuję się ({verb} {noun})', 'Opiekuję się {verb} {noun}'],
                ],
                verbs: [['dobry', 'dobrym'], ['drogi', 'drogim'], ['stary', 'starym']],
                nouns: [['samochód', 'samochodem'], ['ser', 'serem']]
            }, {
                templates: [
                    ['Idę z ({verb} {noun}) na drinka', 'Idę z {verb} {noun} na drinka'],
                    ['Opiekuję się ({verb} {noun})', 'Opiekuję się {verb} {noun}'],
                ],
                verbs: [['ładna', 'ładną'], ['młoda', 'młodą'], ['inteligentna', 'inteligentną']],
                nouns: [['matka', 'matką'], ['sofa', 'sofą'], ['pani', 'panią'], ['noc', 'nocą']]
            }, {
                templates: [
                    ['Idę z ({verb} {noun}) na drinka', 'Idę z {verb} {noun} na drinka'],
                    ['Opiekuję się ({verb} {noun})', 'Opiekuję się {verb} {noun}'],
                ],
                verbs: [['grzecne', 'grzecnym'], ['małe', 'małym'], ['wesołe', 'wesołym']],
                nouns: [['kino', 'kinem'], ['slońce', 'slońcem'], ['dziecko', 'dzieckiem'], ['imię', 'imieniem'], ['akwarium', 'akwarium']]
            }],
            plural: [{
                templates: [
                    ['Idę z ({verb} {noun}) na drinka', 'Idę z {verb} {noun} na drinka'],
                    ['Opiekuję się ({verb} {noun})', 'Opiekuję się {verb} {noun}'],
                ],
                verbs: [['młody', 'młodymi'], ['wesoły', 'wesołymi'], ['przystojny', 'przystojnymi'], ['dobry', 'dobrymi'], ['drogi', 'droimi']],
                nouns: [['Marek', 'Markami'], ['aktor', 'aktorami'], ['student', 'studentami'], ['poeta', 'poetami']]
            }, {
                templates: [
                    ['Idę z ({verb} {noun}) na drinka', 'Idę z {verb} {noun} na drinka'],
                    ['Opiekuję się ({verb} {noun})', 'Opiekuję się {verb} {noun}'],
                ],
                verbs: [['dobry', 'dobrymi'], ['drogi', 'drogimi'], ['stary', 'starymi']],
                nouns: [['samochód', 'samochodami'], ['kot', 'kotami'], ['ser', 'serami']]
            }, {
                templates: [
                    ['Idę z ({verb} {noun}) na drinka', 'Idę z {verb} {noun} na drinka'],
                    ['Opiekuję się ({verb} {noun})', 'Opiekuję się {verb} {noun}'],
                ],
                verbs: [['ładna', 'ładnymi'], ['młoda', 'młodymi'], ['inteligentna', 'inteligentnymi']],
                nouns: [['matka', 'matkami'], ['sofa', 'sofami'], ['pani', 'paniami'], ['noc', 'nocami']]
            }, {
                templates: [
                    ['Idę z ({verb} {noun}) na drinka', 'Idę z {verb} {noun} na drinka'],
                    ['Opiekuję się ({verb} {noun})', 'Opiekuję się {verb} {noun}'],
                ],
                verbs: [['grzecne', 'grzecnymi'], ['małe', 'małymi'], ['wesołe', 'wesołymi']],
                nouns: [['kino', 'kinami'], ['slońce', 'slońcami'], ['dziecko', 'dziećmi'], ['imię', 'imionami'], ['akwarium', 'akwariami']]
            }]
        }
    },
    {
        name: 'Miejscownik',
        question: '(O) Kim? Czym?',
        use: 'Marże o... Myślę o...',
        cards: {
            singular: [{
                templates: [
                    ['Marże o ({verb} {noun}) na drinka', 'Marże o {verb} {noun}'],
                    ['Myślę o ({verb} {noun})', 'Myślę o {verb} {noun}'],
                ],
                verbs: [['młody', 'młodym'], ['wesoły', 'wesołym'], ['przystojnego', 'przystojnym'], ['dobry', 'dobrym'], ['drogi', 'drogim']],
                nouns: [['Marek', 'Marku'], ['aktor', 'aktorze'], ['kot', 'kocie'], ['poeta', 'poecie']]
            }, {
                templates: [
                    ['Marże o ({verb} {noun}) na drinka', 'Marże o {verb} {noun}'],
                    ['Myślę o ({verb} {noun})', 'Myślę o {verb} {noun}'],
                ],
                verbs: [['dobry', 'dobrym'], ['drogi', 'drogim'], ['stary', 'starym']],
                nouns: [['samochód', 'samochodzie'], ['ser', 'serze']]
            }, {
                templates: [
                    ['Marże o ({verb} {noun}) na drinka', 'Marże o {verb} {noun}'],
                    ['Myślę o ({verb} {noun})', 'Myślę o {verb} {noun}'],
                ],
                verbs: [['ładna', 'ładnej'], ['młoda', 'młodej'], ['inteligentna', 'inteligentnej']],
                nouns: [['matka', 'matce'], ['sofa', 'sofie'], ['pani', 'pani'], ['noc', 'nocy']]
            }, {
                templates: [
                    ['Marże o ({verb} {noun}) na drinka', 'Marże o {verb} {noun}'],
                    ['Myślę o ({verb} {noun})', 'Myślę o {verb} {noun}'],
                ],
                verbs: [['grzecne', 'grzecnym'], ['małe', 'małym'], ['wesołe', 'wesołym']],
                nouns: [['kino', 'kinie'], ['slońce', 'slońcu'], ['dziecko', 'dziecku'], ['imię', 'imieniu'], ['akwarium', 'akwarium']]
            }],
            plural: [{
                templates: [
                    ['Marże o ({verb} {noun}) na drinka', 'Marże o {verb} {noun}'],
                    ['Myślę o ({verb} {noun})', 'Myślę o {verb} {noun}'],
                ],
                verbs: [['młody', 'młodych'], ['wesoły', 'wesołych'], ['przystojny', 'przystojnych'], ['dobry', 'dobrych'], ['drogi', 'droimich']],
                nouns: [['Marek', 'Markach'], ['aktor', 'aktorach'], ['student', 'studentach'], ['poeta', 'poetach']]
            }, {
                templates: [
                    ['Marże o ({verb} {noun}) na drinka', 'Marże o {verb} {noun}'],
                    ['Myślę o ({verb} {noun})', 'Myślę o {verb} {noun}'],
                ],
                verbs: [['dobry', 'dobrych'], ['drogi', 'drogich'], ['stary', 'starych']],
                nouns: [['samochód', 'samochodach'], ['kot', 'kotach'], ['ser', 'serach']]
            }, {
                templates: [
                    ['Marże o ({verb} {noun}) na drinka', 'Marże o {verb} {noun}'],
                    ['Myślę o ({verb} {noun})', 'Myślę o {verb} {noun}'],
                ],
                verbs: [['ładna', 'ładnych'], ['młoda', 'młodych'], ['inteligentna', 'inteligentnych']],
                nouns: [['matka', 'matkach'], ['sofa', 'sofach'], ['pani', 'paniach'], ['noc', 'nocach']]
            }, {
                templates: [
                    ['Marże o ({verb} {noun}) na drinka', 'Marże o {verb} {noun}'],
                    ['Myślę o ({verb} {noun})', 'Myślę o {verb} {noun}'],
                ],
                verbs: [['grzecne', 'grzecnych'], ['małe', 'małych'], ['wesołe', 'wesołych']],
                nouns: [['kino', 'kinach'], ['slońce', 'slońcach'], ['dziecko', 'dzieciach'], ['imię', 'imionach'], ['akwarium', 'akwariach']]
            }]
        }
    },
    {
        name: 'Wołacz',
        question: 'O!',
        use: 'Drogi...  Drodzy...',
        cards: {
            singular: [{
                templates: [
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                ],
                verbs: [['młody', 'młody'], ['wesoły', 'wesoły'], ['przystojnego', 'przystojny'], ['dobry', 'dobry'], ['drogi', 'drogi']],
                nouns: [['Marek', 'Marku'], ['aktor', 'aktorze'], ['kot', 'kocie'], ['poeta', 'poeto']]
            }, {
                templates: [
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                ],
                verbs: [['dobry', 'dobry'], ['drogi', 'drogi'], ['stary', 'stary']],
                nouns: [['samochód', 'samochodzie'], ['ser', 'serze']]
            }, {
                templates: [
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                ],
                verbs: [['ładna', 'ładna'], ['młoda', 'młoda'], ['inteligentna', 'inteligentna']],
                nouns: [['matka', 'matko'], ['sofa', 'sofo'], ['pani', 'pani'], ['noc', 'nocy']]
            }, {
                templates: [
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                ],
                verbs: [['grzecne', 'grzecne'], ['małe', 'małe'], ['wesołe', 'wesołe']],
                nouns: [['kino', 'kino'], ['slońce', 'slońce'], ['dziecko', 'dziecko'], ['imię', 'imię'], ['akwarium', 'akwarium']]
            }],
            plural: [{
                templates: [
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                ],
                verbs: [['młody', 'młodzi'], ['wesoły', 'wesełi'], ['przystojny', 'przystojni'], ['dobry', 'dobrzy'], ['drogi', 'drodzy']],
                nouns: [['Marek', 'Markowie'], ['aktor', 'aktorzy'], ['student', 'studenci'], ['poeta', 'poeci']]
            }, {
                templates: [
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                ],
                verbs: [['dobry', 'dobre'], ['drogi', 'drogie'], ['stary', 'stare']],
                nouns: [['samochód', 'samochody'], ['kot', 'koty'], ['ser', 'sery']]
            }, {
                templates: [
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                ],
                verbs: [['ładna', 'ładne'], ['młoda', 'młode'], ['inteligentna', 'inteligentne']],
                nouns: [['matka', 'matki'], ['sofa', 'sofy'], ['pani', 'panie'], ['noc', 'noce']]
            }, {
                templates: [
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                ],
                verbs: [['grzecne', 'grzecne'], ['małe', 'małe'], ['wesołe', 'wesołe']],
                nouns: [['kino', 'kina'], ['slońce', 'slońca'], ['dziecko', 'dzieci'], ['imię', 'imiona'], ['akwarium', 'akwaria']]
            }]
        }
    },
];

const basicCaseData: CaseData[] = [
    {
        name: 'Mianownik',
        question: 'Kto? Co?',
        use: 'To jest... To są...',
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
    },
    {
        name: 'Dopełniacz',
        question: 'Kogo? Czego?',
        use: 'Nie ma... Nie znam... Nie widzę...  Nie lubię...',
        cards: {
            singular: [{
                back: [
                    "Nie ma (młody Marek)",
                    "Nie ma (dobry kot)"
                ],
                front: [
                    "Nie ma młodego Marka",
                    "Nie ma dobrego kota"
                ]
            }, {
                back: [
                    "Nie ma (drogi samochód)"
                ],
                front: [
                    "Nie ma drogiego samochodu"
                ]
            }, {
                back: [
                    "Nie ma (ładna matka)"
                ],
                front: [
                    "Nie ma ładnej matki"
                ]
            }, {
                back: [
                    "Nie ma (krótkie kino)",
                    "Nie ma (małe akwarium)"
                ],
                front: [
                    "Nie ma krótkiego kina",
                    "Nie ma małego akwarium"
                ]
            }],
            plural: [{
                back: [
                    "Nie ma (młody Marek)",
                ],
                front: [
                    "Nie ma młodych Marków"
                ]
            }, {
                back: [
                    "Nie ma (drogi samochód)",
                    "Nie ma (dobry kot)"
                ],
                front: [
                    "Nie ma drogich samochodów",
                    "Nie ma dobrych kotów"
                ]
            }, {
                back: [
                    "Nie ma (ładna matka)"
                ],
                front: [
                    "Nie ma ładnych matek"
                ]
            }, {
                back: [
                    "Nie ma (krótkie kino)",
                    "TNie ma (małe akwarium)"
                ],
                front: [
                    "Nie ma krótkich kin",
                    "Nie ma małych akwariów"
                ]
            }]
        }
    },
    {
        name: 'Celownik',
        question: 'Komu? Czemu?',
        use: 'Przyglądam się... Ufam...',
        cards: {
            singular: [{
                back: [
                    "Ufam (młody Marek)",
                    "Ufam  (dobry kot)"
                ],
                front: [
                    "Ufam młodemu Markowi",
                    "Ufam dobremu kotu"
                ]
            }, {
                back: [
                    "Ufam (drogi samochód)"
                ],
                front: [
                    "Ufam drogiemu samochodowi"
                ]
            }, {
                back: [
                    "Ufam (ładna matka)"
                ],
                front: [
                    "Ufam ładnej matce"
                ]
            }, {
                back: [
                    "Ufam (krótkie kino)",
                    "Ufam (małe akwarium)"
                ],
                front: [
                    "Ufam krótkiemu kinu",
                    "Ufam małemu akwarium"
                ]
            }],
            plural: [{
                back: [
                    "Ufam (młody Marek)",
                ],
                front: [
                    "Ufam młodym Markom"
                ]
            }, {
                back: [
                    "Ufam (drogi samochód)",
                    "Ufam (dobry kot)"
                ],
                front: [
                    "Ufam drogim samochodom",
                    "Ufam dobrym kotom"
                ]
            }, {
                back: [
                    "Ufam (ładna matka)"
                ],
                front: [
                    "Ufam ładnym matkom"
                ]
            }, {
                back: [
                    "Ufam (krótkie kino)",
                    "Ufam (małe akwarium)"
                ],
                front: [
                    "Ufam krótkim kinom",
                    "Ufam małym akwariom"
                ]
            }]
        }
    },
    {
        name: 'Biernik',
        question: 'Kogo? Co?',
        use: 'Mam...  Znam... Widzę... Lubię...',
        cards: {
            singular: [{
                back: [
                    "Znam (młody Marek)",
                    "Znam (dobry kot)"
                ],
                front: [
                    "Znam młodego Marka",
                    "Znam dobrego kota"
                ]
            }, {
                back: [
                    "Znam (drogi samochód)"
                ],
                front: [
                    "Znam drogi samochód"
                ]
            }, {
                back: [
                    "Znam (ładna matka)"
                ],
                front: [
                    "Znam ładną matkę"
                ]
            }, {
                back: [
                    "Znam (krótkie kino)",
                    "Znam (małe akwarium)"
                ],
                front: [
                    "Znam krótkie kino",
                    "Znam małe akwarium"
                ]
            }],
            plural: [{
                back: [
                    "Znam (młody Marek)",
                ],
                front: [
                    "Znam młodych Marków"
                ]
            }, {
                back: [
                    "Znam (drogi samochód)",
                    "Znam (dobry kot)"
                ],
                front: [
                    "Znam drogie samochody",
                    "Znam dobre koty"
                ]
            }, {
                back: [
                    "Znam (ładna matka)"
                ],
                front: [
                    "Znam ładne matki"
                ]
            }, {
                back: [
                    "Znam (krótkie kino)",
                    "Znam (małe akwarium)"
                ],
                front: [
                    "Znam krótkie kina",
                    "Znam małe akwaria"
                ]
            }]
        }
    },
    {
        name: 'Narzędnik',
        question: '(Z) Kim? Czym?',
        use: 'Idę z … na drinka; Opiekuję się...',
        cards: {
            singular: [{
                back: [
                    "Opiekuję (młody Marek)",
                    "Opiekuję (dobry kot)"
                ],
                front: [
                    "Opiekuję się młodym Markiem",
                    "Opiekuję się dobrym kotem"
                ]
            }, {
                back: [
                    "Opiekuję (drogi samochód)"
                ],
                front: [
                    "Opiekuję się drogim samochodem"
                ]
            }, {
                back: [
                    "Opiekuję (ładna matka)"
                ],
                front: [
                    "Opiekuję się ładną matką"
                ]
            }, {
                back: [
                    "Opiekuję (krótkie kino)",
                    "Opiekuję (małe akwarium)"
                ],
                front: [
                    "Opiekuję się krótkim kinem",
                    "Opiekuję się małym akwarium"
                ]
            }],
            plural: [{
                back: [
                    "Opiekuję (młody Marek)",
                ],
                front: [
                    "Opiekuję się młodymi Markami"
                ]
            }, {
                back: [
                    "Opiekuję (drogi samochód)",
                    "Opiekuję (dobry kot)"
                ],
                front: [
                    "Opiekuję się drogimi samochodami",
                    "Opiekuję się dobrymi kotami"
                ]
            }, {
                back: [
                    "Opiekuję (ładna matka)"
                ],
                front: [
                    "Opiekuję się ładnymi matkami"
                ]
            }, {
                back: [
                    "Opiekuję (krótkie kino)",
                    "Opiekuję (małe akwarium)"
                ],
                front: [
                    "Opiekuję się krótkimi kinami",
                    "Opiekuję się małymi akwariami"
                ]
            }]
        }
    },
    {
        name: 'Miejscownik',
        question: '(O) Kim? Czym?',
        use: 'Marże o... Myślę o...',
        cards: {
            singular: [{
                back: [
                    "Myślę o (młody Marek)",
                    "Myślę o (dobry kot)"
                ],
                front: [
                    "Myślę o młodym Marku",
                    "Myślę o dobrym kocie"
                ]
            }, {
                back: [
                    "Myślę o (drogi samochód)"
                ],
                front: [
                    "Myślę o drogim samochodzie"
                ]
            }, {
                back: [
                    "Myślę o (ładna matka)"
                ],
                front: [
                    "Myślę o ładnej matce"
                ]
            }, {
                back: [
                    "Myślę o (krótkie kino, słońce)",
                    "Myślę o (małe akwarium)"
                ],
                front: [
                    "Myślę o krótkim kinie, słońcu",
                    "Myślę o małym akwarium"
                ]
            }],
            plural: [{
                back: [
                    "Myślę o (młody Marek)",
                ],
                front: [
                    "Myślę o młodych Markach"
                ]
            }, {
                back: [
                    "Myślę o (drogi samochód)",
                    "Myślę o (dobry kot)"
                ],
                front: [
                    "Myślę o drogich samochodach",
                    "Myślę o dobrych kotach"
                ]
            }, {
                back: [
                    "Myślę o (ładna matka)"
                ],
                front: [
                    "Myślę o ładnych matkach"
                ]
            }, {
                back: [
                    "Myślę o (krótkie kino)",
                    "Myślę o (małe akwarium)"
                ],
                front: [
                    "Myślę o krótkich kinach",
                    "Myślę o małych akwariach"
                ]
            }]
        }
    },
    {
        name: 'Wołacz',
        question: 'O!',
        use: 'Drogi...  Drodzy...',
        cards: {
            singular: [{
                back: [
                    "O (młody Marek)!",
                    "O (dobry kot)!"
                ],
                front: [
                    "O Młody Marku!",
                    "O Dobry kocie!"
                ]
            }, {
                back: [
                    "O (drogi samochód)!"
                ],
                front: [
                    "O Drogi samochodzie!"
                ]
            }, {
                back: [
                    "O (ładna matka)!"
                ],
                front: [
                    "o Ładna matko!"
                ]
            }, {
                back: [
                    "O (krótkie kino)!",
                    "O (małe akwarium)!"
                ],
                front: [
                    "Krótkie kino!",
                    "Małe akwarium!"
                ]
            }],
            plural: [{
                back: [
                    "O (młody Marek)!",
                ],
                front: [
                    "O Młodzi Markowie!",
                ]
            }, {
                back: [
                    "O (drogi samochód)!",
                    "O (dobry kot)!"
                ],
                front: [
                    "O Drogie samochody!",
                    "O Dobre koty!"
                ]
            }, {
                back: [
                    "O (ładna matka)!"
                ],
                front: [
                    "O Ładne matki!"
                ]
            }, {
                back: [
                    "O (krótkie kino)!",
                    "O (małe akwarium)!"
                ],
                front: [
                    "O Krótkie kina!",
                    "O Małe akwaria!"
                ]
            }],
        }
    },
];

function getRandomizedCaseData(): CaseData[] {
    const sourcesDataClone = JSON.parse(JSON.stringify(casesSourceData)) as CaseSourceData[];

    const sourcesData = sourcesDataClone.map(x => {

        function collapseCardSource(source: CardSource): Card {
            const template = getRandomItem(source.templates);
            const verb = getRandomItem(source.verbs);
            const noun = getRandomItem(source.nouns);

            return {
                back: [template[0].replace('{verb}', verb[0]).replace('{noun}', noun[0])],
                front: [template[1].replace('{verb}', verb[1]).replace('{noun}', noun[1])]
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

let currentCasesData: CaseData[] = attemptGetCasesDataByQSKey() ?? basicCaseData;

function attemptGetCasesDataByQSKey(): CaseData[] | undefined {
    const searchParams = new URLSearchParams(window.location.search);
    if (false === searchParams.has(CASES_STATE_QS_KEY)) {
        return;
    }

    const key = searchParams.get(CASES_STATE_QS_KEY);
    const item = window.localStorage.getItem(`${CASES_STATE_QS_KEY}-${key}`);
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
            <div style={{ width: '100%' }}>
                <strong>Przypadki</strong> (kliknij na kartki, aby odwrócić)
            </div>
            <div style={{ width: '100%' }}>

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
                    {randomModeOn ? "dezaktywuj tryb losowy" : "aktywuj tryb losowy"}
                </button>
                <button
                    className='cases-button'
                    onClick={() => {
                        const searchParams = new URLSearchParams(window.location.search);
                        const num = Math.random();
                        const key = `${CASES_STATE_QS_KEY}-${num}`;
                        window.localStorage.setItem(key, JSON.stringify(currentCasesData));
                        searchParams.set(CASES_STATE_QS_KEY, num.toString());
                        window.location.search = searchParams.toString();
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
                >tasować (trudniejsze)</button>
            </div>
            <table className='cases-table' style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <td rowSpan={2}></td>
                        <td>Rodzaj Męski (ten, ci) Żywotny</td>
                        <td>Rodzaj Męski (ten, ci) Nieżywotny</td>
                        <td rowSpan={2}>Rodzaj żeński (ta, te)</td>
                        <td rowSpan={2}>Rodzaj nijaki (to, te) </td>
                    </tr>
                    <tr>
                        <td>Męskoosobowy</td>
                        <td>Męski nieosobowy</td>
                    </tr>
                </thead>
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