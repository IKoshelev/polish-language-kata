const input = 
`8 osiem ósmy, -a, -e ósmego, -ej ósmym, -ej
9 dziewięć dziewiąty, -a, -e dziewiątego, -ej dziewiątym, -ej
10 dziesięć dziesiąty, -a, -e dziesiątego, -ej dziesiątym, -ej
11 jedenaście jedenasty, -a, -e jedenastego, -ej jedenastym, -ej
12 dwanaście dwunasty, -a, -e dwunastego, -ej dwunastym, -ej
13 trzynaście trzynasty, -a, -e trzynastego, -ej trzynastym, -ej
14 czternaście czternasty, -a, -e czternastego, -ej czternastym, -ej
15 piętnaście piętnasty, -a, -e piętnastego, -ej piętnastym, -ej
16 szesnaście szesnasty, -a, -e szesnastego, -ej szesnastym, -ej
17 siedemnaście siedemnasty, -a, -e siedemnastego, -ej siedemnastym, -ej
18 osiemnaście osiemnasty, -a, -e osiemnastego, -ej osiemnastym, -ej
19 dziewiętnaście dziewiętnasty, -a, -e dziewiętnastego, -ej dziewiętnastym, -ej
20 dwadzieścia dwudziesty, -a, -e dwudziestego, -ej dwudziestym, -ej
30 trzydzieści trzydziesty, -a, -e trzydziestego, -ej trzydziestym, -ej
40 czterdzieści czterdziesty, -a, -e czterdziestego, -ej czterdziestym, -ej
50 pięćdziesiąt pięćdziesiąty, -a, -e pięćdziesiątego, -ej pięćdziesiątym, -ej
60 sześćdziesiąt sześćdziesiąty, -a, -e sześćdziesiątego, -ej sześćdziesiątym, -ej
70 siedemdziesiąt siedemdziesiąty, -a, -e siedemdziesiątego, -ej siedemdziesiątym, -ej
80 osiemdziesiąt osiemdziesiąty, -a, -e osiemdziesiątego, -ej osiemdziesiątym, -ej
90 dziewięćdziesiąt dziewięćdziesiąty, -a, -e dziewięćdziesiątego, -ej dziewięćdziesiątym, -ej
100 sto setny, -a, -e setnego, -ej setnym, -ej
200 dwieście dwusetny, -a, -e dwusetnego, -ej dwusetnym, -ej
300 trzysta trzechsetny, -a, -e trzechsetnego, -ej trzechsetnym, -ej
400 czterysta czterechsetny, -a, -e czterechsetnego, -ej czterechsetnym, -ej
500 pięćset pięćsetny, -a, -e pięćsetnego, -ej pięćsetnym, -ej
600 sześćset sześćsetny, -a, -e sześćsetnego, -ej sześćsetnym, -ej
700 siedemset siedemsetny, -a, -e siedemsetnego, -ej siedemsetnym, -ej
800 osiemset osiemsetny, -a, -e osiemsetnego, -ej osiemsetnym, -ej
900 dziewięćset dziewięćsetny, -a, -e dziewięćsetnego, -ej dziewięćsetnym, -ej
1000 tysiąc tysięczny, -a, -e tysięcznego, -ej tysięcznym, -ej
2000 dwa_tysiące dwutysięczny, -a, -e dwutysięcznego, -ej dwutysięcznym, -ej
5000 pięć_tysięcy pięciotysięczny, -a, -e pięciotysięcznego, -ej pięciotysięcznym, -ej
1000000 milion milionowy, -a, -e milionowego, -ej milionowym, -ej
2000000 dwa_miliony dwumilionowy, -a, -e dwumilionowego, -ej dwumilionowym, -ej
5000000 pięć_milionów pięciomilionowy, -a, -e pięciomilionowego, -ej pięciomilionowym, -ej`;

const parsed = input.replaceAll(',', '').split('\n').map(x => {
    const forms = x.split(' ');

    [
        [forms[2], 1, [3, 4]], 
        [forms[5], 3, [6]], 
        [forms[7], 2, [8]]
    ].forEach(([form, charsToTrim, applyToIndexes]) => {
        const root = form.substring(0, form.length - charsToTrim);
        
        applyToIndexes.forEach((index) => {
            forms[index] = forms[index].replaceAll("-", root);
        })
    });
    
    return forms;
});

console.log(parsed);