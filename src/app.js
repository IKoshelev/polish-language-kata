const text = "[`Mianownik, Wolacz`]: formsDeclensionDict(`Kto?`, `To {word}`,'mój, twój, swój','moja/ma, twoja/twa, swoja/swa','moje/me, twoje/twe, swoje/swe','moi, twoi, swoi','moje/me, twoje/twe, swoje/swe')," +
"[`Dopełniacz`]: formsDeclensionDict(`Kogo?`,`Szuka {word}`,'mojego/mego, twojego/twego, swojego/swego','mojej/mej, twojej/twej, swojej/swej','mojego/mego, twojego/twego, swojego/swego','moich/mych, twoich/twych, swoich/swych','moich/mych, twoich/twych, swoich/swych'),"+
"[`Celownik`]: formsDeclensionDict(`Komu?`,`Daje {word}`,'mojemu/memu, twojemu/twemu, swojemu/swemu','mojej/mej, twojej/twej, swojej/swej','mojemu/memu, twojemu/twemu, swojemu/swemu','moim/mym, twoim/twym, swoim/swym','moim/mym, twoim/twym, swoim/swym'),"+
"[`Biernik`]: formsDeclensionDict(`Kogo?`,`Zna {word}`,'mojego/mego, twojego/twego, swojego/swego','moją/mą, twoją/twą, swoją/swą','moje/me, twoje/twe, swoje/swe','moich/mych, twoich/twych, swoich/swych','moje/me, twoje/twe, swoje/swe'),"+
"[`Narzędnik`]: formsDeclensionDict(`Kim?`, `Interesue się {word}`,'moim/mym, twoim/twym, swoim/swym','moją/mą, twoją/twą, swoją/swą','moim/mym, twoim/twym, swoim/swym','moimi/mymi, twoimi/twymi, swoimi/swymi','moimi/mymi, twoimi/twymi, swoimi/swymi'),"+
"[`Miejscownik`]: formsDeclensionDict(`Kim?`, `Myśle o {word}`,'moim/mym, twoim/twym, swoim/swym','mojej/mej, twojej/twej, swojej/swej','moim/mym, twoim/twym, swoim/swym','moich/mych, twoich/twych, swoich/swych','moich/mych, twoich/twych, swoich/swych')";

const text2 = text.replace(new RegExp("\\/\\w*", "g"), '');

console.log(text);
