import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { attemptGetDataByQSKey, getRandomItem } from './util';

type Card = {
    id: number;
    isFlipped?: boolean;
    isMarked?: boolean;
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
    caseNameIsFlipped: boolean,
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


const casesSourceData: CaseSourceData[] = [
    {
        name: 'Mianownik',
        question: 'Kto? Co?',
        use: 'To jest... To są...',
        cards: {
            singular: [{
                templates: [['To jest ({verb} {noun})', 'To jest {verb} {noun}']],
                verbs: [['młody', 'młody'], ['wesoły', 'wesoły'], ['przystojny', 'przystojny'], ['dobry', 'dobry'], ['drogi', 'drogi'], ['wysoki', 'wysoki']],
                nouns: [['Marek', 'Marek'], ['aktor', 'aktor'], ['kot', 'kot'], ['poeta', 'poeta']]
            }, {
                templates: [['To jest ({verb} {noun})', 'To jest {verb} {noun}']],
                verbs: [['dobry', 'dobry'], ['drogi', 'drogi'], ['stary', 'stary'], ['wysoki', 'wysoki']],
                nouns: [['samochód', 'samochód'], ['ser', 'ser']]
            }, {
                templates: [['To jest ({verb} {noun})', 'To jest {verb} {noun}']],
                verbs: [['ładna', 'ładna'], ['młoda', 'młoda'], ['inteligentna', 'inteligentna'], ['wysoka', 'wysoka']],
                nouns: [['matka', 'matka'], ['sofa', 'sofa'], ['pani', 'pani'], ['noc', 'noc']]
            }, {
                templates: [['To jest ({verb} {noun})', 'To jest {verb} {noun}']],
                verbs: [['grzeczne', 'grzeczne'], ['małe', 'małe'], ['wesołe', 'wesołe'], ['wysokie', 'wysokie']],
                nouns: [['kino', 'kino'], ['słońce', 'słońce'], ['dziecko', 'dziecko'], ['imię', 'imię'], ['akwarium', 'akwarium']]
            }],
            plural: [{
                templates: [['To są ({verb} {noun} l.mn.)', 'To są {verb} {noun}']],
                verbs: [['młody', 'młodzi'], ['wesoły', 'weseli'], ['przystojny', 'przystojni'], ['dobry', 'dobrzy'], ['drogi', 'drodzy'], ['wysoki', 'wysocy']],
                nouns: [['Marek', 'Markowie'], ['aktor', 'aktorzy'], ['student', 'studenci'], ['poeta', 'poeci']]
            }, {
                templates: [['To są ({verb} {noun} l.mn.)', 'To są {verb} {noun}']],
                verbs: [['dobry', 'dobre'], ['drogi', 'drogie'], ['stary', 'stare'], ['dobry', 'dobre'], ['wysoki', 'wysokie']],
                nouns: [['samochód', 'samochody'], ['kot', 'koty'], ['ser', 'sery']]
            }, {
                templates: [['To są ({verb} {noun} l.mn.)', 'To są {verb} {noun}']],
                verbs: [['ładna', 'ładne'], ['młoda', 'młode'], ['inteligentna', 'inteligentne'], ['wysoka', 'wysokie']],
                nouns: [['matka', 'matki'], ['sofa', 'sofy'], ['pani', 'panie'], ['noc', 'nocy']]
            }, {
                templates: [['To są ({verb} {noun} l.mn.)', 'To są {verb} {noun}']],
                verbs: [['grzeczne', 'grzeczne'], ['małe', 'małe'], ['wesołe', 'wesołe'], ['wysokie', 'wysokie']],
                nouns: [['kino', 'kina'], ['słońce', 'słońca'], ['dziecko', 'dzieci'], ['imię', 'imiona'], ['akwarium', 'akwaria']]
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
                verbs: [['młody', 'młodego'], ['wesoły', 'wesołego'], ['przystojny', 'przystojnego'], ['dobry', 'dobrego'], ['drogi', 'drogiego'], ['wysoki', 'wysokiego']],
                nouns: [['Marek', 'Marka'], ['aktor', 'aktora'], ['kot', 'kota'], ['poeta', 'poety']]
            }, {
                templates: [
                    ['Nie ma ({verb} {noun})', 'Nie ma {verb} {noun}'],
                    ['Nie znam ({verb} {noun})', 'Nie znam {verb} {noun}'],
                    ['Nie widzę ({verb} {noun})', 'Nie widzę {verb} {noun}'],
                    ['Nie lubię ({verb} {noun})', 'Nie lubię {verb} {noun}']
                ],
                verbs: [['dobry', 'dobrego'], ['drogi', 'drogiego'], ['stary', 'starego'], ['wysoki', 'wysokiego']],
                nouns: [['samochód', 'samochodu'], ['ser', 'sera']]
            }, {
                templates: [
                    ['Nie ma ({verb} {noun})', 'Nie ma {verb} {noun}'],
                    ['Nie znam ({verb} {noun})', 'Nie znam {verb} {noun}'],
                    ['Nie widzę ({verb} {noun})', 'Nie widzę {verb} {noun}'],
                    ['Nie lubię ({verb} {noun})', 'Nie lubię {verb} {noun}']
                ],
                verbs: [['ładna', 'ładnej'], ['młoda', 'młodej'], ['inteligentna', 'inteligentnej'], ['wysoka', 'wysokiej']],
                nouns: [['matka', 'matki'], ['sofa', 'sofy'], ['pani', 'pani'], ['noc', 'nocy']]
            }, {
                templates: [
                    ['Nie ma ({verb} {noun})', 'Nie ma {verb} {noun}'],
                    ['Nie znam ({verb} {noun})', 'Nie znam {verb} {noun}'],
                    ['Nie widzę ({verb} {noun})', 'Nie widzę {verb} {noun}'],
                    ['Nie lubię ({verb} {noun})', 'Nie lubię {verb} {noun}']
                ],
                verbs: [['grzeczne', 'grzecznego'], ['małe', 'małego'], ['wesołe', 'wesołego'], ['wysokie', 'wysokiego']],
                nouns: [['kino', 'kina'], ['słońce', 'słońca'], ['dziecko', 'dziecka'], ['imię', 'imienia'], ['akwarium', 'akwarium']]
            }],
            plural: [{
                templates: [
                    ['Nie ma ({verb} {noun} l.mn.)', 'Nie ma {verb} {noun}'],
                    ['Nie znam ({verb} {noun} l.mn.)', 'Nie znam {verb} {noun}'],
                    ['Nie widzę ({verb} {noun} l.mn.)', 'Nie widzę {verb} {noun}'],
                    ['Nie lubię ({verb} {noun} l.mn.)', 'Nie lubię {verb} {noun}']
                ],
                verbs: [['młody', 'młodych'], ['wesoły', 'wesołych'], ['przystojny', 'przystojnych'], ['dobry', 'dobrych'], ['drogi', 'drogich'], ['wysoki', 'wysokich']],
                nouns: [['Marek', 'Marków'], ['aktor', 'aktorów'], ['student', 'studentów'], ['poeta', 'poetów']]
            }, {
                templates: [
                    ['Nie ma ({verb} {noun} l.mn.)', 'Nie ma {verb} {noun}'],
                    ['Nie znam ({verb} {noun} l.mn.)', 'Nie znam {verb} {noun}'],
                    ['Nie widzę ({verb} {noun} l.mn.)', 'Nie widzę {verb} {noun}'],
                    ['Nie lubię ({verb} {noun} l.mn.)', 'Nie lubię {verb} {noun}']
                ],
                verbs: [['dobry', 'dobrych'], ['drogi', 'drogich'], ['stary', 'starych'], ['wysoki', 'wysokich']],
                nouns: [['samochód', 'samochodów'], ['kot', 'kotów'], ['ser', 'serów']]
            }, {
                templates: [
                    ['Nie ma ({verb} {noun} l.mn.)', 'Nie ma {verb} {noun}'],
                    ['Nie znam ({verb} {noun} l.mn.)', 'Nie znam {verb} {noun}'],
                    ['Nie widzę ({verb} {noun} l.mn.)', 'Nie widzę {verb} {noun}'],
                    ['Nie lubię ({verb} {noun} l.mn.)', 'Nie lubię {verb} {noun}']
                ],
                verbs: [['ładna', 'ładnych'], ['młoda', 'młodych'], ['inteligentna', 'inteligentnych'], ['wysoka', 'wysokich']],
                nouns: [['matka', 'matek'], ['sofa', 'sof'], ['pani', 'pań'], ['noc', 'nocy']]
            }, {
                templates: [
                    ['Nie ma ({verb} {noun} l.mn.)', 'Nie ma {verb} {noun}'],
                    ['Nie znam ({verb} {noun} l.mn.)', 'Nie znam {verb} {noun}'],
                    ['Nie widzę ({verb} {noun} l.mn.)', 'Nie widzę {verb} {noun}'],
                    ['Nie lubię ({verb} {noun} l.mn.)', 'Nie lubię {verb} {noun}']
                ],
                verbs: [['grzeczne', 'grzecznych'], ['małe', 'małych'], ['wesołe', 'wesołych'], ['wysokie', 'wysokich']],
                nouns: [['kino', 'kin'], ['słońce', 'słońc'], ['dziecko', 'dzieci'], ['imię', 'imion'], ['akwarium', 'akwariów']]
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
                    ['To dzięki ({verb} {noun})', 'To dzięki {verb} {noun}'],
                    ['Na przekór ({verb} {noun})', 'Na przekór {verb} {noun}']
                ],
                verbs: [['młody', 'młodemu'], ['wesoły', 'wesołemu'], ['przystojny', 'przystojnemu'], ['dobry', 'dobremu'], ['drogi', 'drogiemu'], ['wysoki', 'wysokiemu']],
                nouns: [['Marek', 'Markowi'], ['aktor', 'aktorowi'], ['kot', 'kotu'], ['poeta', 'poecie']]
            }, {
                templates: [
                    ['Ufam ({verb} {noun})', 'Ufam {verb} {noun}'],
                    ['To dzięki ({verb} {noun})', 'To dzięki {verb} {noun}'],
                    ['Na przekór ({verb} {noun})', 'Na przekór {verb} {noun}']
                ],
                verbs: [['dobry', 'dobremu'], ['drogi', 'drogiemu'], ['stary', 'staremu'], ['wysoki', 'wysokiemu']],
                nouns: [['samochód', 'samochodowi'], ['ser', 'serowi']]
            }, {
                templates: [
                    ['Ufam ({verb} {noun})', 'Ufam {verb} {noun}'],
                    ['To dzięki ({verb} {noun})', 'To dzięki {verb} {noun}'],
                    ['Na przekór ({verb} {noun})', 'Na przekór {verb} {noun}']
                ],
                verbs: [['ładna', 'ładnej'], ['młoda', 'młodej'], ['inteligentna', 'inteligentnej'], ['wysoka', 'wysokiej']],
                nouns: [['matka', 'matce'], ['sofa', 'sofie'], ['pani', 'pani'], ['noc', 'nocy']]
            }, {
                templates: [
                    ['Ufam ({verb} {noun})', 'Ufam {verb} {noun}'],
                    ['To dzięki ({verb} {noun})', 'To dzięki {verb} {noun}'],
                    ['Na przekór ({verb} {noun})', 'Na przekór {verb} {noun}']
                ],
                verbs: [['grzeczne', 'grzecznemu'], ['małe', 'małemu'], ['wesołe', 'wesołemu'], ['wysokie', 'wysokiemu']],
                nouns: [['kino', 'kinu'], ['słońce', 'słońcu'], ['dziecko', 'dziecku'], ['imię', 'imieniu'], ['akwarium', 'akwarium']]
            }],
            plural: [{
                templates: [
                    ['Ufam ({verb} {noun} l.mn.)', 'Ufam {verb} {noun}'],
                    ['To dzięki ({verb} {noun} l.mn.)', 'To dzięki {verb} {noun}'],
                    ['Na przekór ({verb} {noun} l.mn.)', 'Na przekór {verb} {noun}']
                ],
                verbs: [['młody', 'młodym'], ['wesoły', 'wesołym'], ['przystojny', 'przystojnym'], ['dobry', 'dobrym'], ['drogi', 'drogim'], ['wysoki', 'wysokim']],
                nouns: [['Marek', 'Markom'], ['aktor', 'aktorom'], ['student', 'studentom'], ['poeta', 'poetom']]
            }, {
                templates: [
                    ['Ufam ({verb} {noun} l.mn.)', 'Ufam {verb} {noun}'],
                    ['To dzięki ({verb} {noun} l.mn.)', 'To dzięki {verb} {noun}'],
                    ['Na przekór ({verb} {noun} l.mn.)', 'Na przekór {verb} {noun}']
                ],
                verbs: [['dobry', 'dobrym'], ['drogi', 'drogim'], ['stary', 'starym'], ['wysoki', 'wysokim']],
                nouns: [['samochód', 'samochodom'], ['kot', 'kotom'], ['ser', 'serom']]
            }, {
                templates: [
                    ['Ufam ({verb} {noun} l.mn.)', 'Ufam {verb} {noun}'],
                    ['To dzięki ({verb} {noun} l.mn.)', 'To dzięki {verb} {noun}'],
                    ['Na przekór ({verb} {noun} l.mn.)', 'Na przekór {verb} {noun}']
                ],
                verbs: [['ładna', 'ładnym'], ['młoda', 'młodym'], ['inteligentna', 'inteligentnym'], ['wysoka', 'wysokim']],
                nouns: [['matka', 'matkom'], ['sofa', 'sofom'], ['pani', 'paniom'], ['noc', 'nocom']]
            }, {
                templates: [
                    ['Ufam ({verb} {noun} l.mn.)', 'Ufam {verb} {noun}'],
                    ['To dzięki ({verb} {noun} l.mn.)', 'To dzięki {verb} {noun}'],
                    ['Na przekór ({verb} {noun} l.mn.)', 'Na przekór {verb} {noun}']
                ],
                verbs: [['grzeczne', 'grzecznym'], ['małe', 'małym'], ['wesołe', 'wesołym'], ['wysokie', 'wysokim']],
                nouns: [['kino', 'kinom'], ['słońce', 'słońcom'], ['dziecko', 'dzieciom'], ['imię', 'imionom'], ['akwarium', 'akwariom']]
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
                verbs: [['młody', 'młodego'], ['wesoły', 'wesołego'], ['przystojny', 'przystojnego'], ['dobry', 'dobrego'], ['drogi', 'drogiego'], ['wysoki', 'wysokiego']],
                nouns: [['Marek', 'Marka'], ['aktor', 'aktora'], ['kot', 'kota'], ['poeta', 'poetę']]
            }, {
                templates: [
                    ['Mam ({verb} {noun})', 'Mam {verb} {noun}'],
                    ['Znam ({verb} {noun})', 'Znam {verb} {noun}'],
                    ['Widzę ({verb} {noun})', 'Widzę {verb} {noun}'],
                    ['Lubię ({verb} {noun})', 'Lubię {verb} {noun}'],
                ],
                verbs: [['dobry', 'dobry'], ['drogi', 'drogi'], ['stary', 'stary'], ['wysoki', 'wysoki']],
                nouns: [['samochód', 'samochód'], ['ser', 'ser']]
            }, {
                templates: [
                    ['Mam ({verb} {noun})', 'Mam {verb} {noun}'],
                    ['Znam ({verb} {noun})', 'Znam {verb} {noun}'],
                    ['Widzę ({verb} {noun})', 'Widzę {verb} {noun}'],
                    ['Lubię ({verb} {noun})', 'Lubię {verb} {noun}'],
                ],
                verbs: [['ładna', 'ładną'], ['młoda', 'młodą'], ['inteligentna', 'inteligentną'], ['wysoka', 'wysoką']],
                nouns: [['matka', 'matkę'], ['sofa', 'sofę'], ['pani', 'panią'], ['noc', 'noc']]
            }, {
                templates: [
                    ['Mam ({verb} {noun})', 'Mam {verb} {noun}'],
                    ['Znam ({verb} {noun})', 'Znam {verb} {noun}'],
                    ['Widzę ({verb} {noun})', 'Widzę {verb} {noun}'],
                    ['Lubię ({verb} {noun})', 'Lubię {verb} {noun}'],
                ],
                verbs: [['grzeczne', 'grzeczne'], ['małe', 'małe'], ['wesołe', 'wesołe'], ['wysokie', 'wysokie']],
                nouns: [['kino', 'kino'], ['słońce', 'słońce'], ['dziecko', 'dziecko'], ['imię', 'imię'], ['akwarium', 'akwarium']]
            }],
            plural: [{
                templates: [
                    ['Mam ({verb} {noun} l.mn.)', 'Mam {verb} {noun}'],
                    ['Znam ({verb} {noun} l.mn.)', 'Znam {verb} {noun}'],
                    ['Widzę ({verb} {noun} l.mn.)', 'Widzę {verb} {noun}'],
                    ['Lubię ({verb} {noun} l.mn.)', 'Lubię {verb} {noun}'],
                ],
                verbs: [['młody', 'młodych'], ['wesoły', 'wesołych'], ['przystojny', 'przystojnych'], ['dobry', 'dobrych'], ['drogi', 'drogich'], ['wysoki', 'wysokich']],
                nouns: [['Marek', 'Marków'], ['aktor', 'aktorów'], ['student', 'studentów'], ['poeta', 'poetów']]
            }, {
                templates: [
                    ['Mam ({verb} {noun} l.mn.)', 'Mam {verb} {noun}'],
                    ['Znam ({verb} {noun} l.mn.)', 'Znam {verb} {noun}'],
                    ['Widzę ({verb} {noun} l.mn.)', 'Widzę {verb} {noun}'],
                    ['Lubię ({verb} {noun} l.mn.)', 'Lubię {verb} {noun}'],
                ],
                verbs: [['dobry', 'dobre'], ['drogi', 'drogie'], ['stary', 'stare'], ['wysoki', 'wysokie']],
                nouns: [['samochód', 'samochody'], ['kot', 'koty'], ['ser', 'sery']]
            }, {
                templates: [
                    ['Mam ({verb} {noun} l.mn.)', 'Mam {verb} {noun}'],
                    ['Znam ({verb} {noun} l.mn.)', 'Znam {verb} {noun}'],
                    ['Widzę ({verb} {noun} l.mn.)', 'Widzę {verb} {noun}'],
                    ['Lubię ({verb} {noun} l.mn.)', 'Lubię {verb} {noun}'],
                ],
                verbs: [['ładna', 'ładne'], ['młoda', 'młode'], ['inteligentna', 'inteligentne'], ['wysoka', 'wysokie']],
                nouns: [['matka', 'matki'], ['sofa', 'sofy'], ['pani', 'panie'], ['noc', 'noce']]
            }, {
                templates: [
                    ['Mam ({verb} {noun} l.mn.)', 'Mam {verb} {noun}'],
                    ['Znam ({verb} {noun} l.mn.)', 'Znam {verb} {noun}'],
                    ['Widzę ({verb} {noun} l.mn.)', 'Widzę {verb} {noun}'],
                    ['Lubię ({verb} {noun} l.mn.)', 'Lubię {verb} {noun}'],
                ],
                verbs: [['grzeczne', 'grzeczne'], ['małe', 'małe'], ['wesołe', 'wesołe'], ['wysokie', 'wysokie']],
                nouns: [['kino', 'kina'], ['słońce', 'słońca'], ['dziecko', 'dzieci'], ['imię', 'imiona'], ['akwarium', 'akwaria']]
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
                    ['On jest ({verb} {noun})', 'On jest {verb} {noun}'],
                    ['Idę z ({verb} {noun})', 'Idę z {verb} {noun}'],
                    ['Opiekuję się ({verb} {noun})', 'Opiekuję się {verb} {noun}'],
                    ['W porównaniu z ({verb} {noun})', 'W porównaniu z {verb} {noun}']
                ],
                verbs: [['młody', 'młodym'], ['wesoły', 'wesołym'], ['przystojny', 'przystojnym'], ['dobry', 'dobrym'], ['drogi', 'drogim'], ['wysoki', 'wysokim']],
                nouns: [['Marek', 'Markiem'], ['aktor', 'aktorem'], ['kot', 'kotem'], ['poeta', 'poetą']]
            }, {
                templates: [
                    ['On jest ({verb} {noun})', 'On jest {verb} {noun}'],
                    ['Idę z ({verb} {noun})', 'Idę z {verb} {noun}'],
                    ['Opiekuję się ({verb} {noun})', 'Opiekuję się {verb} {noun}'],
                    ['W porównaniu z ({verb} {noun})', 'W porównaniu z {verb} {noun}']
                ],
                verbs: [['dobry', 'dobrym'], ['drogi', 'drogim'], ['stary', 'starym'], ['wysoki', 'wysokim']],
                nouns: [['samochód', 'samochodem'], ['ser', 'serem']]
            }, {
                templates: [
                    ['Ona jest ({verb} {noun})', 'Ona jest {verb} {noun}'],
                    ['Idę z ({verb} {noun})', 'Idę z {verb} {noun}'],
                    ['Opiekuję się ({verb} {noun})', 'Opiekuję się {verb} {noun}'],
                    ['W porównaniu z ({verb} {noun})', 'W porównaniu z {verb} {noun}']
                ],
                verbs: [['ładna', 'ładną'], ['młoda', 'młodą'], ['inteligentna', 'inteligentną'], ['wysoka', 'wysoką']],
                nouns: [['matka', 'matką'], ['sofa', 'sofą'], ['pani', 'panią'], ['noc', 'nocą']]
            }, {
                templates: [
                    ['Ono jest ({verb} {noun})', 'Ono jest {verb} {noun}'],
                    ['Idę z ({verb} {noun})', 'Idę z {verb} {noun}'],
                    ['Opiekuję się ({verb} {noun})', 'Opiekuję się {verb} {noun}'],
                    ['W porównaniu z ({verb} {noun})', 'W porównaniu z {verb} {noun}']
                ],
                verbs: [['grzeczne', 'grzecznym'], ['małe', 'małym'], ['wesołe', 'wesołym'], ['wysokie', 'wysokim']],
                nouns: [['kino', 'kinem'], ['słońce', 'słońcem'], ['dziecko', 'dzieckiem'], ['imię', 'imieniem'], ['akwarium', 'akwarium']]
            }],
            plural: [{
                templates: [
                    ['Oni są ({verb} {noun})', 'Oni są {verb} {noun}'],
                    ['Idę z ({verb} {noun} l.mn.)', 'Idę z {verb} {noun}'],
                    ['Opiekuję się ({verb} {noun} l.mn.)', 'Opiekuję się {verb} {noun}'],
                    ['W porównaniu z ({verb} {noun} l.mn.)', 'W porównaniu z {verb} {noun}']
                ],
                verbs: [['młody', 'młodymi'], ['wesoły', 'wesołymi'], ['przystojny', 'przystojnymi'], ['dobry', 'dobrymi'], ['drogi', 'drogimi'], ['wysoki', 'wysokimi']],
                nouns: [['Marek', 'Markami'], ['aktor', 'aktorami'], ['student', 'studentami'], ['poeta', 'poetami']]
            }, {
                templates: [
                    ['One są ({verb} {noun})', 'One są {verb} {noun}'],
                    ['Idę z ({verb} {noun} l.mn.)', 'Idę z {verb} {noun}'],
                    ['Opiekuję się ({verb} {noun} l.mn.)', 'Opiekuję się {verb} {noun}'],
                    ['W porównaniu z ({verb} {noun} l.mn.)', 'W porównaniu z {verb} {noun}']
                ],
                verbs: [['dobry', 'dobrymi'], ['drogi', 'drogimi'], ['stary', 'starymi'], ['wysoki', 'wysokimi']],
                nouns: [['samochód', 'samochodami'], ['kot', 'kotami'], ['ser', 'serami']]
            }, {
                templates: [
                    ['One są ({verb} {noun})', 'One są {verb} {noun}'],
                    ['Idę z ({verb} {noun} l.mn.)', 'Idę z {verb} {noun}'],
                    ['Opiekuję się ({verb} {noun} l.mn.)', 'Opiekuję się {verb} {noun}'],
                    ['W porównaniu z ({verb} {noun} l.mn.)', 'W porównaniu z {verb} {noun}']
                ],
                verbs: [['ładna', 'ładnymi'], ['młoda', 'młodymi'], ['inteligentna', 'inteligentnymi'], ['wysoka', 'wysokimi']],
                nouns: [['matka', 'matkami'], ['sofa', 'sofami'], ['pani', 'paniami'], ['noc', 'nocami']]
            }, {
                templates: [
                    ['One są ({verb} {noun})', 'One są {verb} {noun}'],
                    ['Idę z ({verb} {noun} l.mn.)', 'Idę z {verb} {noun}'],
                    ['Opiekuję się ({verb} {noun} l.mn.)', 'Opiekuję się {verb} {noun}'],
                    ['W porównaniu z ({verb} {noun} l.mn.)', 'W porównaniu z {verb} {noun}']
                ],
                verbs: [['grzeczne', 'grzecznymi'], ['małe', 'małymi'], ['wesołe', 'wesołymi'], ['wysoki', 'wysokimi']],
                nouns: [['kino', 'kinami'], ['słońce', 'słońcami'], ['dziecko', 'dziećmi'], ['imię', 'imionami'], ['akwarium', 'akwariami']]
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
                    //['Marże o ({verb} {noun})', 'Marże o {verb} {noun}'],
                    ['Myślę o ({verb} {noun})', 'Myślę o {verb} {noun}'],
                    ['Stoi przy ({verb} {noun})', 'Stoi przy {verb} {noun}'],
                ],
                verbs: [['młody', 'młodym'], ['wesoły', 'wesołym'], ['przystojny', 'przystojnym'], ['dobry', 'dobrym'], ['drogi', 'drogim'], ['wysoki', 'wysokim']],
                nouns: [['Marek', 'Marku'], ['aktor', 'aktorze'], ['kot', 'kocie'], ['poeta', 'poecie']]
            }, {
                templates: [
                    //['Marże o ({verb} {noun})', 'Marże o {verb} {noun}'],
                    ['Myślę o ({verb} {noun})', 'Myślę o {verb} {noun}'],
                    ['Stoi przy ({verb} {noun})', 'Stoi przy {verb} {noun}'],
                ],
                verbs: [['dobry', 'dobrym'], ['drogi', 'drogim'], ['stary', 'starym'], ['wysoki', 'wysokim']],
                nouns: [['samochód', 'samochodzie'], ['ser', 'serze']]
            }, {
                templates: [
                    //['Marże o ({verb} {noun})', 'Marże o {verb} {noun}'],
                    ['Myślę o ({verb} {noun})', 'Myślę o {verb} {noun}'],
                    ['Stoi przy ({verb} {noun})', 'Stoi przy {verb} {noun}'],
                ],
                verbs: [['ładna', 'ładnej'], ['młoda', 'młodej'], ['inteligentna', 'inteligentnej'], ['wysoka', 'wysokiej']],
                nouns: [['matka', 'matce'], ['sofa', 'sofie'], ['pani', 'pani'], ['noc', 'nocy']]
            }, {
                templates: [
                    //['Marże o ({verb} {noun})', 'Marże o {verb} {noun}'],
                    ['Myślę o ({verb} {noun})', 'Myślę o {verb} {noun}'],
                    ['Stoi przy ({verb} {noun})', 'Stoi przy {verb} {noun}'],
                ],
                verbs: [['grzeczne', 'grzecznym'], ['małe', 'małym'], ['wesołe', 'wesołym'], ['wysokie', 'wysokim']],
                nouns: [['kino', 'kinie'], ['słońce', 'słońcu'], ['dziecko', 'dziecku'], ['imię', 'imieniu'], ['akwarium', 'akwarium']]
            }],
            plural: [{
                templates: [
                    //['Marże o ({verb} {noun} l.mn.)', 'Marże o {verb} {noun}'],
                    ['Myślę o ({verb} {noun} l.mn.)', 'Myślę o {verb} {noun}'],
                    ['Stoi przy ({verb} {noun} l.mn.)', 'Stoi przy {verb} {noun}'],
                ],
                verbs: [['młody', 'młodych'], ['wesoły', 'wesołych'], ['przystojny', 'przystojnych'], ['dobry', 'dobrych'], ['drogi', 'drogich'], ['wysoki', 'wysokich']],
                nouns: [['Marek', 'Markach'], ['aktor', 'aktorach'], ['student', 'studentach'], ['poeta', 'poetach']]
            }, {
                templates: [
                    //['Marże o ({verb} {noun} l.mn.)', 'Marże o {verb} {noun}'],
                    ['Myślę o ({verb} {noun} l.mn.)', 'Myślę o {verb} {noun}'],
                    ['Stoi przy ({verb} {noun} l.mn.)', 'Stoi przy {verb} {noun}'],
                ],
                verbs: [['dobry', 'dobrych'], ['drogi', 'drogich'], ['stary', 'starych'], ['wysoki', 'wysokich']],
                nouns: [['samochód', 'samochodach'], ['kot', 'kotach'], ['ser', 'serach']]
            }, {
                templates: [
                    //['Marże o ({verb} {noun} l.mn.)', 'Marże o {verb} {noun}'],
                    ['Myślę o ({verb} {noun} l.mn.)', 'Myślę o {verb} {noun}'],
                    ['Stoi przy ({verb} {noun} l.mn.)', 'Stoi przy {verb} {noun}'],
                ],
                verbs: [['ładna', 'ładnych'], ['młoda', 'młodych'], ['inteligentna', 'inteligentnych'], ['wysoka', 'wysokich']],
                nouns: [['matka', 'matkach'], ['sofa', 'sofach'], ['pani', 'paniach'], ['noc', 'nocach']]
            }, {
                templates: [
                    //['Marże o ({verb} {noun} l.mn.)', 'Marże o {verb} {noun}'],
                    ['Myślę o ({verb} {noun} l.mn.)', 'Myślę o {verb} {noun}'],
                    ['Stoi przy ({verb} {noun} l.mn.)', 'Stoi przy {verb} {noun}'],
                ],
                verbs: [['grzeczne', 'grzecznych'], ['małe', 'małych'], ['wesołe', 'wesołych'], ['wysokie', 'wysokich']],
                nouns: [['kino', 'kinach'], ['słońce', 'słońcach'], ['dziecko', 'dzieciach'], ['imię', 'imionach'], ['akwarium', 'akwariach']]
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
                verbs: [['młody', 'młody'], ['wesoły', 'wesoły'], ['przystojny', 'przystojny'], ['dobry', 'dobry'], ['drogi', 'drogi'], ['wysoki', 'wysoki']],
                nouns: [['Marek', 'Marku'], ['aktor', 'aktorze'], ['kot', 'kocie'], ['poeta', 'poeto']]
            }, {
                templates: [
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                ],
                verbs: [['dobry', 'dobry'], ['drogi', 'drogi'], ['stary', 'stary'], ['wysoki', 'wysoki']],
                nouns: [['samochód', 'samochodzie'], ['ser', 'serze']]
            }, {
                templates: [
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                ],
                verbs: [['ładna', 'ładna'], ['młoda', 'młoda'], ['inteligentna', 'inteligentna'], ['wysoka', 'wysoka']],
                nouns: [['matka', 'matko'], ['sofa', 'sofo'], ['pani', 'pani'], ['noc', 'nocy'], ['Ania', 'Aniu'], ['Kasia', 'Kasiu']]
            }, {
                templates: [
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                    ['O ({verb} {noun})!', 'O {verb} {noun}!'],
                ],
                verbs: [['grzeczne', 'grzeczne'], ['małe', 'małe'], ['wesołe', 'wesołe'], ['wysokie', 'wysokie']],
                nouns: [['kino', 'kino'], ['słońce', 'słońce'], ['dziecko', 'dziecko'], ['imię', 'imię'], ['akwarium', 'akwarium']]
            }],
            plural: [{
                templates: [
                    ['O ({verb} {noun} l.mn.)!', 'O {verb} {noun}!'],
                    ['O ({verb} {noun} l.mn.)!', 'O {verb} {noun}!'],
                ],
                verbs: [['młody', 'młodzi'], ['wesoły', 'weseli'], ['przystojny', 'przystojni'], ['dobry', 'dobrzy'], ['drogi', 'drodzy'], ['wysoki', 'wysocy']],
                nouns: [['Marek', 'Markowie'], ['aktor', 'aktorzy'], ['student', 'studenci'], ['poeta', 'poeci']]
            }, {
                templates: [
                    ['O ({verb} {noun} l.mn.)!', 'O {verb} {noun}!'],
                    ['O ({verb} {noun} l.mn.)!', 'O {verb} {noun}!'],
                ],
                verbs: [['dobry', 'dobre'], ['drogi', 'drogie'], ['stary', 'stare'], ['wysoki', 'wysokie']],
                nouns: [['samochód', 'samochody'], ['kot', 'koty'], ['ser', 'sery']]
            }, {
                templates: [
                    ['O ({verb} {noun} l.mn.)!', 'O {verb} {noun}!'],
                    ['O ({verb} {noun} l.mn.)!', 'O {verb} {noun}!'],
                ],
                verbs: [['ładna', 'ładne'], ['młoda', 'młode'], ['inteligentna', 'inteligentne'], ['wysoka', 'wysokie']],
                nouns: [['matka', 'matki'], ['sofa', 'sofy'], ['pani', 'panie'], ['noc', 'noce']]
            }, {
                templates: [
                    ['O ({verb} {noun} l.mn.)!', 'O {verb} {noun}!'],
                    ['O ({verb} {noun} l.mn.)!', 'O {verb} {noun}!'],
                ],
                verbs: [['grzeczne', 'grzeczne'], ['małe', 'małe'], ['wesołe', 'wesołe'], ['wysokie', 'wysokie']],
                nouns: [['kino', 'kina'], ['słońce', 'słońca'], ['dziecko', 'dzieci'], ['imię', 'imiona'], ['akwarium', 'akwaria']]
            }]
        }
    },
];

const basicCaseData: CaseData[] = [
    {
        name: 'Mianownik',
        question: 'Kto? Co?',
        use: 'To jest... To są...',
        caseNameIsFlipped: true,
        cards: {
            singular: [{
                id: Math.random(),
                back: [
                    "To jest (młody Marek)",
                    "To jest (dobry kot)"
                ],
                front: [
                    "To jest młody Marek",
                    "To jest dobry kot"
                ]
            }, {
                id: Math.random(),
                back: [
                    "To jest (drogi samochód)"
                ],
                front: [
                    "To jest drogi samochód"
                ]
            }, {
                id: Math.random(),
                back: [
                    "To jest (ładna matka)"
                ],
                front: [
                    "To jest ładna matka"
                ]
            }, {
                id: Math.random(),
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
                id: Math.random(),
                back: [
                    "To są (młody Marek l.mn.)",
                ],
                front: [
                    "To są młodzi Markowie "
                ]
            }, {
                id: Math.random(),
                back: [
                    "To są (drogi samochód l.mn.)",
                    "To są (dobry kot l.mn.)"
                ],
                front: [
                    "To są drogie samochody",
                    "To są dobre koty"
                ]
            }, {
                id: Math.random(),
                back: [
                    "To są (ładna matka l.mn.)"
                ],
                front: [
                    "To są ładne matki"
                ]
            }, {
                id: Math.random(),
                back: [
                    "To są (krótkie kino l.mn.)",
                    "To są (małe akwarium l.mn.)"
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
        caseNameIsFlipped: true,
        cards: {
            singular: [{
                id: Math.random(),
                back: [
                    "Nie ma (młody Marek)",
                    "Nie ma (dobry kot)"
                ],
                front: [
                    "Nie ma młodego Marka",
                    "Nie ma dobrego kota"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Nie ma (drogi samochód)"
                ],
                front: [
                    "Nie ma drogiego samochodu"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Nie ma (ładna matka)"
                ],
                front: [
                    "Nie ma ładnej matki"
                ]
            }, {
                id: Math.random(),
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
                id: Math.random(),
                back: [
                    "Nie ma (młody Marek l.mn.)",
                ],
                front: [
                    "Nie ma młodych Marków"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Nie ma (drogi samochód l.mn.)",
                    "Nie ma (dobry kot l.mn.)"
                ],
                front: [
                    "Nie ma drogich samochodów",
                    "Nie ma dobrych kotów"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Nie ma (ładna matka l.mn.)"
                ],
                front: [
                    "Nie ma ładnych matek"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Nie ma (krótkie kino l.mn.)",
                    "TNie ma (małe akwarium l.mn.)"
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
        caseNameIsFlipped: true,
        cards: {
            singular: [{
                id: Math.random(),
                back: [
                    "Ufam (młody Marek)",
                    "Ufam  (dobry kot)"
                ],
                front: [
                    "Ufam młodemu Markowi",
                    "Ufam dobremu kotu"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Ufam (drogi samochód)"
                ],
                front: [
                    "Ufam drogiemu samochodowi"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Ufam (ładna matka)"
                ],
                front: [
                    "Ufam ładnej matce"
                ]
            }, {
                id: Math.random(),
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
                id: Math.random(),
                back: [
                    "Ufam (młody Marek l.mn.)",
                ],
                front: [
                    "Ufam młodym Markom"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Ufam (drogi samochód l.mn.)",
                    "Ufam (dobry kot l.mn.)"
                ],
                front: [
                    "Ufam drogim samochodom",
                    "Ufam dobrym kotom"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Ufam (ładna matka l.mn.)"
                ],
                front: [
                    "Ufam ładnym matkom"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Ufam (krótkie kino l.mn.)",
                    "Ufam (małe akwarium l.mn.)"
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
        caseNameIsFlipped: true,
        cards: {
            singular: [{
                id: Math.random(),
                back: [
                    "Znam (młody Marek)",
                    "Znam (dobry kot)"
                ],
                front: [
                    "Znam młodego Marka",
                    "Znam dobrego kota"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Znam (drogi samochód)"
                ],
                front: [
                    "Znam drogi samochód"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Znam (ładna matka)"
                ],
                front: [
                    "Znam ładną matkę"
                ]
            }, {
                id: Math.random(),
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
                id: Math.random(),
                back: [
                    "Znam (młody Marek l.mn.)",
                ],
                front: [
                    "Znam młodych Marków"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Znam (drogi samochód l.mn.)",
                    "Znam (dobry kot l.mn.)"
                ],
                front: [
                    "Znam drogie samochody",
                    "Znam dobre koty"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Znam (ładna matka l.mn.)"
                ],
                front: [
                    "Znam ładne matki"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Znam (krótkie kino l.mn.)",
                    "Znam (małe akwarium l.mn.)"
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
        caseNameIsFlipped: true,
        cards: {
            singular: [{
                id: Math.random(),
                back: [
                    "Opiekuję się (młody Marek)",
                    "Opiekuję się (dobry kot)"
                ],
                front: [
                    "Opiekuję się młodym Markiem",
                    "Opiekuję się dobrym kotem"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Opiekuję się (drogi samochód)"
                ],
                front: [
                    "Opiekuję się drogim samochodem"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Opiekuję się (ładna matka)"
                ],
                front: [
                    "Opiekuję się ładną matką"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Opiekuję się (krótkie kino)",
                    "Opiekuję się (małe akwarium)"
                ],
                front: [
                    "Opiekuję się krótkim kinem",
                    "Opiekuję się małym akwarium"
                ]
            }],
            plural: [{
                id: Math.random(),
                back: [
                    "Opiekuję się (młody Marek l.mn.)",
                ],
                front: [
                    "Opiekuję się młodymi Markami"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Opiekuję się (drogi samochód l.mn.)",
                    "Opiekuję się (dobry kot l.mn.)"
                ],
                front: [
                    "Opiekuję się drogimi samochodami",
                    "Opiekuję się dobrymi kotami"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Opiekuję się (ładna matka l.mn.)"
                ],
                front: [
                    "Opiekuję się ładnymi matkami"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Opiekuję się (krótkie kino l.mn.)",
                    "Opiekuję się (małe akwarium l.mn.)"
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
        caseNameIsFlipped: true,
        cards: {
            singular: [{
                id: Math.random(),
                back: [
                    "Myślę o (młody Marek)",
                    "Myślę o (dobry kot)"
                ],
                front: [
                    "Myślę o młodym Marku",
                    "Myślę o dobrym kocie"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Myślę o (drogi samochód)"
                ],
                front: [
                    "Myślę o drogim samochodzie"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Myślę o (ładna matka)"
                ],
                front: [
                    "Myślę o ładnej matce"
                ]
            }, {
                id: Math.random(),
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
                id: Math.random(),
                back: [
                    "Myślę o (młody Marek l.mn.)",
                ],
                front: [
                    "Myślę o młodych Markach"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Myślę o (drogi samochód l.mn.)",
                    "Myślę o (dobry kot l.mn.)"
                ],
                front: [
                    "Myślę o drogich samochodach",
                    "Myślę o dobrych kotach"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Myślę o (ładna matka l.mn.)"
                ],
                front: [
                    "Myślę o ładnych matkach"
                ]
            }, {
                id: Math.random(),
                back: [
                    "Myślę o (krótkie kino l.mn.)",
                    "Myślę o (małe akwarium l.mn.)"
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
        caseNameIsFlipped: true,
        cards: {
            singular: [{
                id: Math.random(),
                back: [
                    "O (młody Marek)!",
                    "O (dobry kot)!"
                ],
                front: [
                    "O Młody Marku!",
                    "O Dobry kocie!"
                ]
            }, {
                id: Math.random(),
                back: [
                    "O (drogi samochód)!"
                ],
                front: [
                    "O Drogi samochodzie!"
                ]
            }, {
                id: Math.random(),
                back: [
                    "O (ładna matka)!"
                ],
                front: [
                    "o Ładna matko!"
                ]
            }, {
                id: Math.random(),
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
                id: Math.random(),
                back: [
                    "O (młody Marek)!",
                ],
                front: [
                    "O Młodzi Markowie!",
                ]
            }, {
                id: Math.random(),
                back: [
                    "O (drogi samochód)!",
                    "O (dobry kot)!"
                ],
                front: [
                    "O Drogie samochody!",
                    "O Dobre koty!"
                ]
            }, {
                id: Math.random(),
                back: [
                    "O (ładna matka)!"
                ],
                front: [
                    "O Ładne matki!"
                ]
            }, {
                id: Math.random(),
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
function getRandomizedCaseData(currentSourceToPreserveMarked?: CaseData[]): CaseData[] {
    const sourcesDataClone = JSON.parse(JSON.stringify(casesSourceData)) as CaseSourceData[];

    const sourcesData = sourcesDataClone.map(x => {

        function collapseCardSource(source: CardSource): Card {
            const template = getRandomItem(source.templates);
            const verb = getRandomItem(source.verbs);
            const noun = getRandomItem(source.nouns);

            return {
                id: Math.random(),
                back: [template[0].replace('{verb}', verb[0]).replace('{noun}', noun[0])],
                front: [template[1].replace('{verb}', verb[1]).replace('{noun}', noun[1])]
            }
        }

        const s: CaseData = {
            name: x.name,
            question: x.question,
            use: x.use,
            caseNameIsFlipped: false,
            cards: {
                singular: x.cards.singular.map(collapseCardSource),
                plural: x.cards.plural.map(collapseCardSource)
            }
        }

        return s;
    });

    for (const cse of currentSourceToPreserveMarked ?? [])
        for (const type of ['singular', 'plural'] as const)
            for (const [index, card] of cse.cards[type].entries()) {
                if (card.isMarked) {
                    sourcesData.find(x => x.name === cse.name)!.cards[type][index] = card;
                }
            }

    const sourcesDataShuffled: CaseData[] = [];

    while (sourcesData.length > 0) {
        const item = getRandomItem(sourcesData, true);
        sourcesDataShuffled.push(item);
    }

    return sourcesDataShuffled;
}

type CurrentState = {
    cards: CaseData[];
    timeout: number;
    target?: number | undefined;
    hasSavedData: boolean;
    randomModeOn: boolean;
}

const getAllCards = (caseData: CaseData[]) => caseData
    .flatMap(x => x.cards)
    .flatMap(x => [x.plural, x.singular])
    .flatMap(x => x);

export function Cases() {

    const [state, updateState] = useImmer(() => ({
        cards: basicCaseData,
        timeout: 2000,
        target: undefined,
        hasSavedData: !!localStorage.getItem(CASES_STATE_QS_KEY),
        randomModeOn: false,
    }) as CurrentState);

    useEffect(() => {
        if (!state.randomModeOn) {
            return;
        }

        if (state.target
            //|| getAllCards(state.cards).find(c => c.id === state.target)?.isFlipped === false
        ) {
            return;
        }

        const allCards = getAllCards(state.cards).filter(x => !x.isFlipped);
        if (allCards.length === 0) {
            setTimeout(() => {
                alert('Gratulacje!');
                updateState((d) => {
                    d.cards.forEach(x => x.caseNameIsFlipped = true);
                    d.randomModeOn = false;
                })
            }, 2500);
            return;
        }

        const randomCard = getRandomItem(allCards);
        setTimeout(() => updateState((d) => {
            d.cards.forEach(x => x.caseNameIsFlipped = false);
            d.target = randomCard.id;
        }), state.timeout);

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

    }, [state.randomModeOn, state.target]);


    const renderCardCells = (isPlural: boolean) => (card: Card, caseData: CaseData) =>
        <td
            className={`case-text ${card.id === state.target ? 'target' : ''} ${card.isMarked ? 'marked' : ''}`}
            onClick={(event) => {

                const currentTargetRect = event.currentTarget.getBoundingClientRect();
                const eventOffsetX = event.pageX - currentTargetRect.left;
                // eventOffsetY = event.pageY - currentTargetRect.top;
                const isRightSide = eventOffsetX < (currentTargetRect.width / 2);

                updateState((d) => {
                    const cardUpdate = getAllCards(d.cards).find(c => c.id === card.id)!;
                    if (isRightSide) {
                        cardUpdate.isMarked = !cardUpdate.isMarked;
                    } else {
                        cardUpdate.isFlipped = !cardUpdate.isFlipped;
                        d.cards.find(x => x.name === caseData.name)!.caseNameIsFlipped = true;
                        if (cardUpdate.id === state.target) {
                            d.target = undefined;
                        }
                    }
                })

            }}
            key={card.front[0]}
            style={{
                cursor: 'pointer',
                backgroundColor: card.id === state.target ? 'lightgreen' :
                    !card.isFlipped ? 'lightgray' :
                        ""
            }}
        >
            <div>
                {(card.isFlipped
                    ? card.front
                    : card.back)
                    .map(x => <div key={x}>{x}</div>)}
            </div>
        </td>;

    return (
        <>
            <div style={{ width: '100%' }}>
                <strong>Przypadki</strong> (kliknij na kartki, prawa strona do odwrócenia, lewa strona do zaznaczenia)
            </div>
            <div className="cases-buttons" style={{ width: '100%' }}>

                <button
                    className='cases-button'
                    onClick={() => updateState((d) => {
                        getAllCards(d.cards).forEach(x => x.isFlipped = true);
                        d.cards.forEach(x => x.caseNameIsFlipped = true);
                    })}
                >otworzyć wszystkie</button>
                <button
                    className='cases-button'
                    onClick={() => updateState((d) => {
                        getAllCards(d.cards).forEach(x => x.isFlipped = false);
                        d.cards.forEach(x => x.caseNameIsFlipped = false);
                    })}
                >zamknąć wszystkie</button>
                <button
                    className='cases-button'
                    onClick={() => updateState((d) => {
                        d.randomModeOn = !d.randomModeOn;
                        d.target = undefined;
                    })}
                >
                    {state.randomModeOn ? "dezaktywować tryb losowy" : "aktywować tryb losowy"}
                </button>
                <button
                    className='cases-button'
                    onClick={() => {
                        const st = {...state};
                        st.hasSavedData = true;
                        window.localStorage.setItem(CASES_STATE_QS_KEY, JSON.stringify(st));
                        updateState(d => { d.hasSavedData = true; });
                    }}
                >zapisać <br/>bieżący stan</button>
                {
                    state.hasSavedData &&
                    <button
                        className='cases-button'
                        onClick={() => {
                            updateState(d => attemptGetDataByQSKey<CurrentState>(CASES_STATE_QS_KEY) ?? d);
                        }}
                    >załadować <br/>zapisany stan</button>
                }
                <button
                    className='cases-button'
                    onClick={() => updateState((d) => {
                        d.cards = getRandomizedCaseData(d.cards);
                        d.target = undefined;
                    })}
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
            <div
                style={{
                    width: "100%",
                    overflowY: 'scroll'

                }}
            >
                <table className='cases-table' >
                    <thead>
                        <tr>
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
                        {state.cards.map(cse => <>
                            <tr
                                key={cse.name + 'description'}
                            >
                                <td
                                    className='case-description'
                                    style={{
                                        backgroundColor: !cse.caseNameIsFlipped ? 'lightgray' : "",
                                        cursor: 'pointer'
                                    }}
                                    colSpan={4}
                                    onClick={() => updateState((d) => {
                                        const caseDraft = d.cards.find(x => x.name === cse.name)!;
                                        caseDraft.caseNameIsFlipped = !caseDraft.caseNameIsFlipped;
                                    })}
                                >
                                    <span
                                        style={{
                                            position: 'sticky',
                                            float: 'left',
                                            left: 10,
                                            textAlign: 'left'
                                        }}>
                                        {
                                            cse.caseNameIsFlipped
                                                ? <>
                                                    <strong>{cse.name}</strong>&nbsp;
                                                    {cse.question}<br />
                                                    {cse.use}
                                                </>
                                                : <>??????<br />??????</>
                                        }

                                    </span>
                                </td>
                            </tr>
                            <tr
                                key={cse.name + 'singular'}>
                                {cse.cards.singular.map(x => renderCardCells(false)(x, cse))}
                            </tr>
                            <tr key={cse.name + 'plural'}>
                                {cse.cards.plural.map(x => renderCardCells(true)(x, cse))}
                            </tr>
                        </>)}
                    </tbody>
                </table>
            </div>
        </>
    );
}