import groupBy from "lodash.groupby";
import { entries, shuffleAndReturnArr } from "../util";

export const wordTypes = {
  czasownik: "czasownik",
  rzeczownik: "rzeczownik",
  przymiotnik: "przymiotnik",
  wyrazy: "wyrazy",
  inne: "inne",
} as const;

export type WordType = typeof wordTypes[keyof typeof wordTypes];

export const topics = {
  egzaminPaństwowy: "egzamin państwowy",
  inne: "inne",
  cechyCharakteru: "cechy charakteru",
} as const;

export type Topic = typeof topics[keyof typeof topics];

export type Card = {
  id: number;
  isMarked: boolean;
  wordType: WordType;
  topics: Topic[];
  isTextOpened: boolean;
  textWhenOpened: string[];
  textWhenClosed: string[];
  textBare: string;
};

type CardSourceData = {
  id: number;
  typ: WordType;
  topics: Topic[];
  wordEnglish: string;
  wordPolish: string;
  additionalPolish: string[];
};

let counter = 1;

const word =
  (wordType: WordType) =>
  (
    wordEnglish: string,
    wordPolish: string,
    additionalPolish: string[] = [],
    topics: Topic[] = []
  ): CardSourceData => {
    return {
      id: counter++,
      typ: wordType,
      wordEnglish,
      wordPolish,
      additionalPolish: additionalPolish ?? [],
      topics: topics.length > 0 ? topics : ["inne"],
    };
  };

const wyraz = word("wyrazy");
const rzeczownik = word("rzeczownik");
const rzeczownikDopMiejs = (
  wordEnglish: string,
  wordPolish: string,
  dopelniaczPolish: string,
  miejscownikPolish: string,
  additionalPolish: string[] = [],
  topics: Topic[] = []
) => {
  return rzeczownik(
    wordEnglish,
    wordPolish,
    [
      `nie ma ${dopelniaczPolish}`,
      `myśli o ${miejscownikPolish}`,
      ...additionalPolish,
    ],
    topics
  );
};
const przymiotnik = word("przymiotnik");
const czasownik = word("czasownik");
const inne = word("inne");

const rzeczowniki: CardSourceData[] = [
  rzeczownikDopMiejs("monument", "pomnik", "pomnika", "omniku", [
    "ponmik ofiar (czego) rządy radzieckiego - monument to victims of soviet regime",
  ]),
  rzeczownikDopMiejs("10 commendnments", "dekalog", "dekalogu", "dekalogu"),
  rzeczownikDopMiejs("decorations", "wystrój", "wystroju", "wystroju"),
  rzeczownikDopMiejs("suitcase ", "walizka", "walizki", "walizce", [
    "walizka z kółkami - suitcase with wheels",
  ]),
  rzeczownikDopMiejs("clothes", "ubranie", "ubrania", "ubraniu"),
  rzeczownik("emotions", "emocje"),
  rzeczownikDopMiejs("personality", "osobowość", "osobowości", "osobowości"),
  rzeczownikDopMiejs("pants", "spodnie", "spodni", "spodniach"),
  rzeczownikDopMiejs("trap", "pułapka", "pułapki", "pułapce"),
  rzeczownikDopMiejs("hotel room, peace", "pokój", "pokoju", "pokoju"),
  rzeczownikDopMiejs("animal", "zwierzę", "zwierzęcia", "zwierzęciu", [
    "l.mn. zwierzęta",
  ]),
  rzeczownikDopMiejs(
    "responsibility",
    "odpowiedzialność",
    "odpowiedzialności",
    "odpowiedzialności",
    ["wymaga od nas dużej odpowiedzialności - is a great responsibility"]
  ),
  rzeczownikDopMiejs("purchase", "kupno", "kupna", "kupnie", [
    "przed kupnem - before purchase",
  ]),
  rzeczownikDopMiejs("detail", "szczegół", "szczegółu", "szczególe"),
  rzeczownikDopMiejs("camp", "obóz", "obozu", "obozie"),
  rzeczownikDopMiejs("reception", "recepcja", "recepcji", "recepcji"),
  rzeczownikDopMiejs(
    "bar stool",
    "stołek barowy",
    "stołka barowego",
    "stołku barowym"
  ),
  rzeczownikDopMiejs(
    "skill, ability",
    "umiejętność",
    "umiejętności",
    "umiejętności"
  ),
  rzeczownikDopMiejs("knowledge", "wiedza ", "wiedzy", "wiedzy"),
  rzeczownikDopMiejs("missile, projectile", "pocisk", "pocisku", "pocisku"),
  rzeczownikDopMiejs("sculpture", "rzeźba", "rzeźby", "rzeźbie"),
  rzeczownikDopMiejs(
    "flag",
    "flaga, sztandar",
    "flagi, sztandaru",
    "fladze, sztandarze"
  ),
  rzeczownikDopMiejs("result", "skutek", "skutku", "skutku", [
    "skuteczny manager - effective manager"
  ]),
  rzeczownikDopMiejs("position", "stanowisko", "stanowiska", "stanowisku", [
    "objąć stanowisko - to take up a position",
    "zajmować stanowisko - to hold a position",
    "zwolnić kogoś ze stanowiska - to dismiss somebody (from job)",
  ]),
  rzeczownikDopMiejs("faucet", "kran", "kranu", "kranie", [
    "woda wypływa z kranu - water flows from the facuet",
  ]),
  rzeczownikDopMiejs("potatos", "ziemniaki", "ziemniaków", "ziemniakach"),
  rzeczownikDopMiejs("shirt", "koszula", "koszuli", "koszuli"),
  rzeczownikDopMiejs("t-shirt", "koszulka", "koszulki", "koszulce"),
  rzeczownikDopMiejs("vest", "kamizelka", "kamizelki", "kamizelce"),
  rzeczownikDopMiejs("jacket", "kurtka", "kurtki", "kurtce"),
  rzeczownikDopMiejs("coat", "płaszcz", "płaszcza", "płaszczu"),
  rzeczownikDopMiejs("cap", "czapka", "czapki", "czapce"),
  rzeczownikDopMiejs("sneakers", "tenisówki", "tenisówek", "tenisówkach"),
  rzeczownikDopMiejs("table", "stół", "stołu", "stole"),
  rzeczownikDopMiejs("chair", "krzesło", "krzesła", "krześle"),
  rzeczownikDopMiejs("floor", "podłoga", "podłogi", "podłodze"),
  rzeczownikDopMiejs("ceeling", "sufit", "sufitu", "suficie"),
  rzeczownikDopMiejs("wall", "ściana", "ściany", "ścianie", [
    "na ścianie wisi zdjęcie - on the wall hangs a picture",
  ]),
  rzeczownikDopMiejs("intention", "zamiar", "zamiaru", "zamiarze"),
  rzeczownikDopMiejs("fire extinguisher", "gaśnica", "gaśnicy", "gaśnicy"),
  rzeczownikDopMiejs("holidays", "wakacje", "wakacji", "wakacjach"),
  rzeczownikDopMiejs("vacation", "urlop", "urlopu", "urlopie"),
  rzeczownikDopMiejs("train", "pociąg", "pociągu", "pociągu"),
  rzeczownikDopMiejs("bus", "autobus", "autobusu", "autobusie"),
  rzeczownikDopMiejs("tram", "tramwaj", "tramwaju", "tramwaju"),
  rzeczownikDopMiejs("plane", "samolot", "samolotu", "samolocie"),
  rzeczownikDopMiejs("equipment", "sprzęt", "sprzętu", "sprzęcie"),
  rzeczownikDopMiejs("device, tool", "narzędzie", "narzędzia", "narzędziu", [
    "szuka narzędzi",
  ]),
  rzeczownikDopMiejs(
    "warehouse attendant",
    "magazynier",
    "magazyniera",
    "magazynierze"
  ),
  rzeczownikDopMiejs("commander", "dowódca", "dowódcy", "dowódcy"),
  rzeczownikDopMiejs("subject, topic", "temat", "tematu", "temacie"),
  rzeczownikDopMiejs("resource", "surowiec", "surowca", "surowcu"),
  rzeczownikDopMiejs("lorry", "ciężarówka", "ciężarówki", "ciężarówce"),
  rzeczownikDopMiejs("episode, section", "odcinek", "odcinka", "odcinku"),
  rzeczownikDopMiejs("barracks (army)", "koszary", "koszar", "koszarach"),
  rzeczownikDopMiejs(
    "safe-keeping",
    "przechowanie",
    "przechowania",
    "przechowaniu"
  ),
  rzeczownikDopMiejs("interview", "wywiad", "wywiadu", "wywiadzie"),
  rzeczownikDopMiejs("benefit", "ulgia", "ulgi", "uldze"),
  rzeczownikDopMiejs("usefulness", "korzyść", "korzyści", "korzyści"),
  rzeczownikDopMiejs("advantage", "zaleta", "zalety", "zalecie"),
  rzeczownikDopMiejs("power, rule, authority", "władza", "władzy", "władzy"),
  rzeczownikDopMiejs("traitor", "zdrajca", "zdrajcy", "zdrajcy"),
  rzeczownikDopMiejs("friction", "tarcie", "tarcia", "tarciu", [
    "otarcie - abrasion",
  ]),
  rzeczownikDopMiejs("tank (military vehicle)", "czołg", "czołgu", "czołgu"),
  rzeczownikDopMiejs(
    "industry",
    "branża, przemysł",
    "branży, przemysłu",
    "branży, przemyśle"
  ),
  rzeczownikDopMiejs("branch (tree/company)", "gałąź", "gałęzi", "gałęzi"),
  rzeczownikDopMiejs("bush", "krzak", "krzaka", "krzaku"),
  rzeczownikDopMiejs("grass", "trawa", "trawy", "trawie"),
  rzeczownikDopMiejs("victory", "zwycięstwo", "zwycięstwa", "zwycięstwie"),
  rzeczownikDopMiejs("loss", "strata", "straty", "stracie"),
  rzeczownikDopMiejs("judge", "sędzia", "sędzi", "sędzi"),
  rzeczownikDopMiejs("crowd", "tłum", "tłumu", "tłumie"),
  rzeczownikDopMiejs(
    "support",
    "oparcie, wsparcie",
    "oparcia, wsparcia",
    "oparciu, wsparciu"
  ),
  rzeczownikDopMiejs(
    "profitability",
    "opłacalność",
    "opłacalności",
    "opłacalności"
  ),
  rzeczownikDopMiejs("railway", "kolej", "kolei", "kolei"),
  rzeczownikDopMiejs("pattern, model, fasion", "wzór", "wzoru", "wzorze", [
    "koszula we wzór - patterned shirt",
    "koszula w paski - shirt with dots",
    "koszula w plamki - shirt with stripes"
  ]),
  rzeczownikDopMiejs("agency", "placówka", "placówki", "placówce"),
  rzeczownikDopMiejs("quality", "jakość", "jakości", "jakości"),
  rzeczownikDopMiejs("character trait", "cecha", "cechy", "cesze"),
  rzeczownikDopMiejs("camp", "obóz", "obozu", "obozie"),
  rzeczownikDopMiejs(
    "primary school",
    "podstawówka",
    "podstawówki",
    "podstawówce"
  ),
  rzeczownikDopMiejs("wealth", "zamożność", "zamożności", "zamożności"),
  rzeczownikDopMiejs("idea", "pomysł", "pomysłu", "pomyśle"),
  rzeczownikDopMiejs("court", "sąd", "sądu", "sądzie"),
  rzeczownikDopMiejs("report", "sprawozdanie", "sprawozdania", "sprawozdaniu"),
  rzeczownikDopMiejs("schedule", "harmonogram", "harmonogramu", "harmonogramie"),
];
const czasowniki: CardSourceData[] = [
  czasownik("dress-up", "wystroić", ["wystroję", "wystroisz"]),
  czasownik("avoid", "unikać", ["unikam", "unikasz"]),
  czasownik("require", "wymagać", ["wymagam", "wymagasz"]),
  czasownik("demand", "żądać", [" żądam", "żądasz"]),
  czasownik("care", "dbać", ["dbam", "dbasz"]),
  czasownik("infect", "zarażać", ["zarażam", "zarażasz"]),
  czasownik("surrender, give up", "poddawać się", ["poddaję", "poddajesz"]),
  czasownik("cause, lead to", "powodować ", ["powoduję", "powodujesz"]),
  czasownik("bring, lead to", "sprawić", ["sprawię", "sprawisz"]),
  czasownik("betray", "zdradzać", ["zdradzam", "zdradzasz"]),
  czasownik("propose, submit, declare", "zgłaszać", [
    "zgłaszam",
    "zgłaszasz",
    "zgłaszać coś do oclenia - to declare sth",
    "zgłosić sprzeciw - to raise an objection",
    "zgłaszać zastrzeżenia - to express reservations",
  ]),
  czasownik("agree", "zgadzać", ["zgadzam", "zgadzasz"]),
  czasownik("convienece", "przekonywać", ["przekonuję", "przekonujesz"]),
  czasownik("cultivate, grow, practice", "uprawiać", [
    "uprawiam",
    "uprawiasz",
    "uprawiać sport - play/do sports",
    "uprawiać seks - have sex",
  ]),
  czasownik("repair, fix", "naprawiać", [
    "naprawiam",
    "naprawiasz",
    "naprawiać samochód - fix car",
  ]),
  czasownik("toss, throw", "przerzucać", ["przerzucam", "przerzucasz"]),
  czasownik("go around", "obchodzić", [
    "obchodzę",
    "obchodzisz",
    "polityka go nie obchodzi - he does not care about politics",
  ]),
  czasownik("involve", "dotyczyć", [
    "dotyczę",
    "dotyczysz",
    "Niniejsza sprawa dotyczy... - The present case concerns...",
  ]),
  czasownik("establish, found", "zakładać", ["zakładam", "zakładasz"]),
  czasownik("equip", "wyposażyć", ["wyposażę", "wyposażysz"]),
  czasownik("testify", "świadczyć", ["świadczę", "świadczysz"]),
  czasownik("sue", "pozywać", ["pozywam", "pozywasz"]),
  czasownik("guess", "zgadnąć", ["zgadnę", "zgadniesz"]),
  czasownik("lose (thing)", "gubić", ["gubię", "gubisz"]),
  czasownik("waste, loose (touch/sense/time...)", "tracić", [
    "tracę",
    "tracisz",
  ]),
  czasownik("suggest", "sugerować", ["sugeruję", "sugerujesz"]),
  czasownik("to argue", "kłócić się z,o", [
    "kłócę się",
    "kłócisz się",
    "OK, nie kłócę się o to - Okay, I'm not arguing that",
  ]),
  czasownik("to argue with", "spierać się z,o", [
    "spieram się z",
    "spierasz się z",
  ]),
  czasownik("recognize, acknowledge", "uznawać", ["uznaję", "uznajesz"]),
  czasownik("to care", "troszczyć się", ["troszczę się", "troszczysz się"]),
  czasownik("discard, throw out", "wyrzucać", ["wyrzucam", "wyrzucasz"]),
  czasownik("shape, to form", "kształtować", ["kształtuję", "kształtujesz"]),
  czasownik("be enough", "wystarczyć", ["wystarczę", "wystarczysz"]),
  czasownik("advance, proceed", "awansować", ["awansuję", "awansujesz"]),
  czasownik("accuse", "oskarzyć", ["oskarżę", "oskarżysz"]),
  czasownik("inherit", "dziedziczyć", ["dziedziczę", "dziedziczysz"]),
  czasownik("achieve", "osiągać", ["osiągam", "osiągasz"]),
  czasownik("stop wanting", "odechcieć się, odechciewać się"),
];
const przymiotniki: CardSourceData[] = [
  przymiotnik("appropriate, correct, proper", "właściwy"),
  przymiotnik("bright, clear, blonde, pale", "jasny"),
  przymiotnik("big, giant", "olbrzymi"),
  przymiotnik("honest", "uczciwy"),
  przymiotnik("sincere", "szczery"),
  przymiotnik("friendly, nice", "poczciwy"),
  przymiotnik("serious", "poważny"),
  przymiotnik("outstanding", "znakomity"),
  przymiotnik("backward, behind the times", "zacofany"),
  przymiotnik("modern", "nowoczesny"),
  przymiotnik("necessary", "konieczny"),
  przymiotnik("next", "kolejny"),
  przymiotnik("previous", "poprzedni, zeszły"),
  przymiotnik("completely", "zupełnie"),
  przymiotnik("not very", "niezbyt"),
  przymiotnik("too (much)", "zbyt", ["byłem zbyt surowy - i was too harsh"]),
  przymiotnik("essential", "niezbędny"),
  przymiotnik("apparent", "pozorny"),
  przymiotnik("clever", "sprytny"),
  przymiotnik("ruthless", "bezwzględny"),
  przymiotnik("luxurious", "luksusowy"),
];
const wyrazy: CardSourceData[] = [
  wyraz("to wear", "mieć na sobie (co?)"),
  wyraz("to be dressed in", "być ubranym w (co?)"),
  wyraz(
    "on the front plan of the photo",
    "na przednim planie zdjęcia",
    [],
    [topics.egzaminPaństwowy]
  ),
  wyraz(
    "on the middle plan of the photo",
    "na drugim planie zdjęcia",
    ["na drugim planie zdjęcia widoczna jest"],
    [topics.egzaminPaństwowy]
  ),
  wyraz(
    "on the back plan of the photo",
    "na tylnum planie zdjęcia",
    [],
    [topics.egzaminPaństwowy]
  ),
  wyraz("first (in a list)", "po pierwsze", [], [topics.egzaminPaństwowy]),
  wyraz("see in window", "widzieć w oknie", [], []),
  wyraz("see through a window", "widzieć przez okno", [], []),
  wyraz("biggest argument in favour", "największy argument za tym", [], []),
  wyraz("clarify the matter", "wyjaśnić tę sprawę", [], []),
  wyraz(
    "prevent similar events",
    "nie dopuścić podobnych wydarzeń; zapobiegać podobnym zdarzeniom",
    [],
    []
  ),
  wyraz("you won't lose anything", "nic nie stracisz", [], []),
  wyraz("he must not drink much", "nie powinien pic dużo", [], []),
  wyraz("he can't drink much", "nie wolno mu pić dużo", [], []),
  wyraz("he can't be trusted", "nie wolno mu zaufać", [], []),
  wyraz("visit the gym", "chodzić na siłownie", [], []),
  wyraz("quickly", "na szybko"),
  wyraz("how long will it take", "ile czasu to zajmie"),
  wyraz("friendly towards animals", "łagodny wobec zwierząt"),
  wyraz("boiling water", "wrząca, przegotowana woda", [
    "szuka wrzącej, przegotowanej wody",
    "myśli o wrzącej, przegotowanej wodzie",
  ]),
  wyraz("i can't wait that long", "nie mogę tak długo czekać"),
  wyraz(
    "we see a man reading a newspaper",
    "widzimy mężczyznę czytającego gazetę"
  ),
  wyraz(
    "on the table stands a vase with flowers",
    "na stole stoi wazon z kwiatami"
  ),
  wyraz("salt and pepper", "sól i pieprz"),
  wyraz("which one are you looking for?", "którego pan szuka?"),
  wyraz("sin of omission", "grzech zaniechania"),
  wyraz("a necessary condition", "konieczny warunek"),
  wyraz("as a result...", "wynikiem tego stało się coś"),
  wyraz("role model", "wzór do naśladowania"),
  wyraz("to some extent", "do pewnego stopnia"),
  wyraz("social media", "siec społecznościowa"),
  wyraz("external affairs", "sprawy zewnętrzne"),
  wyraz("internal affairs", "sprawy wewnętrzne"),
  wyraz("allow yourself to", "pozwól sobie na", [
    "pozwól sobie na świętowanie -  allow yourself to celebrate",
  ]),
  wyraz("shirt with blue stripes", "koszula w niebieskie paski"),
  wyraz("allow promotion, advancement", "Pozwalać na awans"),
];
const inneSource: CardSourceData[] = [
  inne("almost", "prawie", [
    "trwało to prawie godzinę - it lasted almost an hour",
  ]),
  inne("before", "zanim; przed tym"),
  inne("particularly", "szczególnie"),
  inne("generally", "ogólnie"),
  inne("usually", "zwykle; z reguły"),
  inne("equally", "równie; również; tak samo; jednakowo; też"),
  inne("earlier, before, in andvance", "wcześniej"),
  inne("unfortunately", "niestety"),
  inne("always", "zawsze"),
  inne("immediately", "natychmiast"),
  inne("suddenly", "nagle"),
  inne("however", "natomiast"),
  inne("GDP", "PKB - Produkt krajowy brutto"),
  inne("previously", "poprzednio"),
  inne("properly", "właściwie"),
  inne("apparently, seemingly", "z pozoru", [
    "pod żadnym pozorem - under no circumstances",
    "zachowywać pozory - to keep up appearances",
  ]),
  inne("since", "skoro", ["skoro jesteś zazdrosny - since you are jealous"]),
  inne("recently", "niedawno"),
  inne("largely", "w dużej mierze"),
  inne("enough", "dość, dosyć, wystarczająco"),
  inne("between", "pomiędzy"),
  inne("before", "zanim"),
  inne("simultaneously", "jednocześnie"),
  inne("barely, just", "dopiero"),

  // cechy charakteru
  inne("personality", "osobowość", [], [topics.cechyCharakteru]),
  inne(
    "affectionate, loving",
    "czuły, kochający",
    [],
    [topics.cechyCharakteru]
  ),
  inne("ambitious", "ambitny", [], [topics.cechyCharakteru]),
  inne("brave, courageous", "odważny", [], [topics.cechyCharakteru]),
  inne("bright", "bystry", [], [topics.cechyCharakteru]),
  inne(
    "open-minded, tolerant",
    "tolerancyjny, o szerokich horyzontach",
    [],
    [topics.cechyCharakteru]
  ),
  inne("calm", "spokojny, opanowany", [], [topics.cechyCharakteru]),
  inne(
    "composed, controlled",
    "opanowany, kontrolujący się",
    [],
    [topics.cechyCharakteru]
  ),
  inne("peaceful", "pokojowy, spokojny", [], [topics.cechyCharakteru]),
  inne("carefree", "beztroski", [], [topics.cechyCharakteru]),
  inne("caring", "opiekuńczy, troskliwy", [], [topics.cechyCharakteru]),
  inne("cautious", "ostrożny", [], [topics.cechyCharakteru]),
  inne("charming", "czarujący", [], [topics.cechyCharakteru]),
  inne("cheerful", "wesoły, radosny", [], [topics.cechyCharakteru]),
  inne("considerate", "troskliwy", [], [topics.cechyCharakteru]),
  inne("creative", "eatywny, twórczy", [], [topics.cechyCharakteru]),
  inne("decisive", "zdecydowany", [], [topics.cechyCharakteru]),
  inne("dedicated, devoted", "oddany", [], [topics.cechyCharakteru]),
  inne("demanding", "wymagający", [], [topics.cechyCharakteru]),
  inne("depressed", "załamany, z depresją", [], [topics.cechyCharakteru]),
  inne("direct", "bezpośredni", [], [topics.cechyCharakteru]),
  inne(
    "down-to-earth, realistic",
    "reczowy, realistyczny",
    [],
    [topics.cechyCharakteru]
  ),
  inne("dynamic", "dynamiczny", [], [topics.cechyCharakteru]),
  inne("easy-going", "luzacki", [], [topics.cechyCharakteru]),
  inne("economical", "oszczędny", [], [topics.cechyCharakteru]),
  inne("energetic", "energiczny", [], [topics.cechyCharakteru]),
  inne("excited", "podekscytowany", [], [topics.cechyCharakteru]),
  inne("experienced", "doświadczony", [], [topics.cechyCharakteru]),
  inne("fair", "sprawiedliwy", [], [topics.cechyCharakteru]),
  inne(
    "forgiving",
    "łatwo wybaczający, wyrozumiały",
    [],
    [topics.cechyCharakteru]
  ),
  inne("frank, honest (uczciwy)", "szczery", [], [topics.cechyCharakteru]),
  inne("friendly", "przyjacielski, przyjazny", [], [topics.cechyCharakteru]),
  inne("funny", "zabawny", [], [topics.cechyCharakteru]),
  inne("generous", "hojny, szczodry", [], [topics.cechyCharakteru]),
  inne("gentle", "łagodny", [], [topics.cechyCharakteru]),
  inne("gifted, talented", "utalentowany", [], [topics.cechyCharakteru]),
  inne("hard-working", "pracowity", [], [topics.cechyCharakteru]),
  inne("helpful", "pomocny, uczynny", [], [topics.cechyCharakteru]),
  inne("hospitable", "gościnny", [], [topics.cechyCharakteru]),
  inne("independent", "niezależny", [], [topics.cechyCharakteru]),
  inne("loyal", "lojalny", [], [topics.cechyCharakteru]),
  inne("lenient", "pobłażliwy, wyrozumiały", [], [topics.cechyCharakteru]),
  inne("mature", "dojrzały", [], [topics.cechyCharakteru]),
  inne("modest", "skromny", [], [topics.cechyCharakteru]),
  inne("neat", "schludny, staranny", [], [topics.cechyCharakteru]),
  inne("noble", "szlachetny, wielkoduszny", [], [topics.cechyCharakteru]),
  inne("obedient", "posłuszny", [], [topics.cechyCharakteru]),
  inne("observant", "spostrzegawczy", [], [topics.cechyCharakteru]),
  inne("optimistic", "optymistyczny", [], [topics.cechyCharakteru]),
  inne("organized", "zorganizowany", [], [topics.cechyCharakteru]),
  inne(
    "outgoing, sociable",
    "towarzyski, otwarty",
    [],
    [topics.cechyCharakteru]
  ),
  inne("patient", "cierpliwy", [], [topics.cechyCharakteru]),
  inne("persuasive", "przekonujący, elokwentny", [], [topics.cechyCharakteru]),
  inne("polite", "grzeczny, uprzejmy", [], [topics.cechyCharakteru]),
  inne("practical", "praktyczny", [], [topics.cechyCharakteru]),
  inne("punctual", "punktualny", [], [topics.cechyCharakteru]),
  inne("quiet", "opanowany, spokojny, cichy", [], [topics.cechyCharakteru]),
  inne("relaxed", "wyluzowany", [], [topics.cechyCharakteru]),
  inne(
    "easy-going",
    "łatwy w obejściu, wyluzowany",
    [],
    [topics.cechyCharakteru]
  ),
  inne("reliable", "rzetelny, godny zaufania", [], [topics.cechyCharakteru]),
  inne("resourceful", "pomysłowy, zaradny", [], [topics.cechyCharakteru]),
  inne("responsible", "odpowiedzialny", [], [topics.cechyCharakteru]),
  inne("romantic", "romantyczny", [], [topics.cechyCharakteru]),
  inne("self-confident", "pewny siebie", [], [topics.cechyCharakteru]),
  inne("selfless", "bezinteresowny", [], [topics.cechyCharakteru]),
  inne(
    "sense of humorUS/ humourGB",
    "poczucie humoru",
    [],
    [topics.cechyCharakteru]
  ),
  inne("sensible", "rozsądny", [], [topics.cechyCharakteru]),
  inne("sensitive", "wrażliwy", [], [topics.cechyCharakteru]),
  inne("serious", "poważny", [], [topics.cechyCharakteru]),
  inne(
    "smart, intelligent, clever",
    "inteligentny, bystry",
    [],
    [topics.cechyCharakteru]
  ),
  inne("sophisticated", "wyrafinowany, obyty", [], [topics.cechyCharakteru]),
  inne("spontaneous", "spontaniczny", [], [topics.cechyCharakteru]),
  inne(
    "sympathetic, compassionate",
    "współczujący",
    [],
    [topics.cechyCharakteru]
  ),
  inne("talkative", "gadatliwy", [], [topics.cechyCharakteru]),
  inne("thoughtful", "troskliwy, życzliwy", [], [topics.cechyCharakteru]),
  inne("thrifty", "oszczędny", [], [topics.cechyCharakteru]),
  inne("tidy", "schludny", [], [topics.cechyCharakteru]),
  inne("trustful", "ufny", [], [topics.cechyCharakteru]),
  inne("trustworthy", "godny zaufania", [], [topics.cechyCharakteru]),
  inne("truthful", "prawdomówny", [], [topics.cechyCharakteru]),
  inne("understanding", "wyrozumiały", [], [topics.cechyCharakteru]),
  inne("warm-hearted", "życzliwy, serdeczny", [], [topics.cechyCharakteru]),
  inne("wise", "mądry", [], [topics.cechyCharakteru]),
  inne("witty", "dowcipny", [], [topics.cechyCharakteru]),
  inne("negative traits", "CECHY NEGATYWNE", [], [topics.cechyCharakteru]),
  inne("absent-minded", "roztargniony", [], [topics.cechyCharakteru]),
  inne("aggressive", "agresywny", [], [topics.cechyCharakteru]),
  inne("arrogant", "arogancki, zarozumiały", [], [topics.cechyCharakteru]),
  inne("awkward", "niezręczny, niezdarny", [], [topics.cechyCharakteru]),
  inne("bad-tempered", "zły, skory do gniewu", [], [topics.cechyCharakteru]),
  inne("bitter", "zgorzkniały", [], [topics.cechyCharakteru]),
  inne("boring, dull", "nudny, nieciekawy", [], [topics.cechyCharakteru]),
  inne("bored", "znudzony", [], [topics.cechyCharakteru]),
  inne(
    "bossy, dominant",
    "lubiący dominować, apodyktyczny",
    [],
    [topics.cechyCharakteru]
  ),
  inne("careless", "nieuważny, niedbały", [], [topics.cechyCharakteru]),
  inne("childish", "dziecinny", [], [topics.cechyCharakteru]),
  inne("clumsy", "niezdarny", [], [topics.cechyCharakteru]),
  inne("conceited", "zarozumiały", [], [topics.cechyCharakteru]),
  inne("coward", "tchór", [], [topics.cechyCharakteru]),
  inne("cruel", "okrutny", [], [topics.cechyCharakteru]),
  inne("cunning", "przebiegły", [], [topics.cechyCharakteru]),
  inne(
    "disappointed (with)",
    "rozczarowany (czymś)",
    [],
    [topics.cechyCharakteru]
  ),
  inne("dishonest", "nieuczciwy", [], [topics.cechyCharakteru]),
  inne("disloyal", "nielojalny", [], [topics.cechyCharakteru]),
  inne("distrustful", "podejrzliwy, nieufny", [], [topics.cechyCharakteru]),
  inne("eccentric", "ekscentryczny", [], [topics.cechyCharakteru]),
  inne(
    "egoistic, egocentric, self-centred",
    "egoistyczny, egocentryczny",
    [],
    [topics.cechyCharakteru]
  ),
  inne("embarassed", "zażenowany, zawstydzony", [], [topics.cechyCharakteru]),
  inne("emotional", "uczuciowy", [], [topics.cechyCharakteru]),
  inne("extravagant", "rozrzutny", [], [topics.cechyCharakteru]),
  inne("forgetful", "roztargniony", [], [topics.cechyCharakteru]),
  inne("greedy", "chciwy, zachłanny", [], [topics.cechyCharakteru]),
  inne("grumpy", "zrzędliwy", [], [topics.cechyCharakteru]),
  inne("immature", "niedojrzały", [], [topics.cechyCharakteru]),
  inne("impatient", "niecierpliwy", [], [topics.cechyCharakteru]),
  inne("impolite", "nieuprzejmy", [], [topics.cechyCharakteru]),
  inne(
    "nosy, curious, inquisitive",
    "ciekawski, wścibski",
    [],
    [topics.cechyCharakteru]
  ),
  inne(
    "insecure",
    "niepewny siebie, zakompleksiony",
    [],
    [topics.cechyCharakteru]
  ),
  inne("insensitive", "niewrażliwy", [], [topics.cechyCharakteru]),
  inne("intolerant", "nietolerancyjny", [], [topics.cechyCharakteru]),
  inne("irresponsible", "nieodpowiedzialny", [], [topics.cechyCharakteru]),
  inne("jealous", "zazdrosny", [], [topics.cechyCharakteru]),
  inne("lazy", "leniwy", [], [topics.cechyCharakteru]),
  inne("lively", "żywiołowy", [], [topics.cechyCharakteru]),
  inne(
    "low self-esteem, poor self-esteem",
    "niska samoocena",
    [],
    [topics.cechyCharakteru]
  ),
  inne(
    "mean, vicious, malicious",
    "złośliwy, podły",
    [],
    [topics.cechyCharakteru]
  ),
  inne("messy", "nieporządny, zabałaganiony", [], [topics.cechyCharakteru]),
  inne("miserable", "nieszczęśliwy", [], [topics.cechyCharakteru]),
  inne(
    "moody",
    "zmiennego usposobienia, zmienny",
    [],
    [topics.cechyCharakteru]
  ),
  inne("naive", "naiwny", [], [topics.cechyCharakteru]),
  inne("nasty", "wstrętny", [], [topics.cechyCharakteru]),
  inne(
    "narrow-minded",
    "ograniczony, o wąskich horyzontach",
    [],
    [topics.cechyCharakteru]
  ),
  inne(
    "oversensitive",
    "przewrażliwiony, przeczulony",
    [],
    [topics.cechyCharakteru]
  ),
  inne("pedantic", "pedantyczny", [], [topics.cechyCharakteru]),
  inne("pessimistic", "pesymistyczny", [], [topics.cechyCharakteru]),
  inne("possessive", "zaborczy", [], [topics.cechyCharakteru]),
  inne(
    "prejudiced",
    "uprzedzony, nietolerancyjny",
    [],
    [topics.cechyCharakteru]
  ),
  inne("proud", "dumny, pyszny", [], [topics.cechyCharakteru]),
  inne("quick-tempered", "porywczy", [], [topics.cechyCharakteru]),
  inne("rebellious", "buntowniczy", [], [topics.cechyCharakteru]),
  inne("reserved", "powściągliwy", [], [topics.cechyCharakteru]),
  inne("rude", "opryskliwy", [], [topics.cechyCharakteru]),
  inne("secretive", "skryty", [], [topics.cechyCharakteru]),
  inne("selfish", "samolubny", [], [topics.cechyCharakteru]),
  inne("shallow", "płytki", [], [topics.cechyCharakteru]),
  inne("shy, bashful", "nieśmiały", [], [topics.cechyCharakteru]),
  inne("sly", "przebiegły", [], [topics.cechyCharakteru]),
  inne("sneaky", "podstępny", [], [topics.cechyCharakteru]),
  inne("stingy", "skąpy", [], [topics.cechyCharakteru]),
  inne("strict", "surowy, srogi", [], [topics.cechyCharakteru]),
  inne("stubborn", "uparty", [], [topics.cechyCharakteru]),
  inne(
    "stupid, dumb, silly (w śmieszny sposób)",
    "głupi, niemądry",
    [],
    [topics.cechyCharakteru]
  ),
  inne("submissive", "uległy", [], [topics.cechyCharakteru]),
  inne("superstitious", "przesądny", [], [topics.cechyCharakteru]),
  inne("suspicious", "podejrzliwy", [], [topics.cechyCharakteru]),
  inne("timid", "bojaźliwy, lękliwy", [], [topics.cechyCharakteru]),
  inne("unfriendly", "nieprzyjazny", [], [topics.cechyCharakteru]),
  inne("ungrateful", "niewdzięczny", [], [topics.cechyCharakteru]),
  inne(
    "unpredictable",
    "nieprzewidywalny, nieobliczalny",
    [],
    [topics.cechyCharakteru]
  ),
  inne("vain", "próżny", [], [topics.cechyCharakteru]),
  inne(
    "weird, strange",
    "dziwny, dziwaczny, ekscentryczny",
    [],
    [topics.cechyCharakteru]
  ),
  inne(
    "What is he like? He is very nice.",
    "Jaki on jest? On jest bardzo miły.",
    [],
    [topics.cechyCharakteru]
  ),
  inne(
    "What kind of person is he? He's both friendly and trustworthy.",
    "Jaką on jest osobą? On jest zarówno przyjacielski jak i gody zaufania.",
    [],
    [topics.cechyCharakteru]
  ),
  inne(
    "Everyone was very friendly towards me.",
    "Wszycy są dla mnie bardzo mili.",
    [],
    [topics.cechyCharakteru]
  ),
  inne(
    "He was a hard-working, honest man.",
    "On był pracowitym, szczerym mężczyzną.",
    [],
    [topics.cechyCharakteru]
  ),
  inne(
    "She's always very generous to the kids.",
    "On jest bardzo hojny dla dzieci.",
    [],
    [topics.cechyCharakteru]
  ),
  inne(
    "He is the laziest boy in the class.",
    "On jest najleniwszym chłopcem w klasie.",
    [],
    [topics.cechyCharakteru]
  ),
  inne(
    "I was very angry with myself for making such a stupid mistake.",
    "Byłem wkurzony na siebie, że zrobiłem taki głupi błąd.",
    [],
    [topics.cechyCharakteru]
  ),
];

const source: CardSourceData[] = [
  ...rzeczowniki,
  ...czasowniki,
  ...przymiotniki,
  ...wyrazy,
  ...inneSource,
];

export function getCardsData(
  num = 10000,
  randomized = false,
  cardsToSave: Card[] = []
) {
  const itemsToSave = groupBy(
    cardsToSave.filter((x) => x.isMarked),
    (x) => x.wordType
  );

  let res = entries(groupBy(source, (x) => x.typ)).flatMap(([key, cards]) => {
    const itemsToSaveForKey = itemsToSave[key] ?? [];
    const itemsToAddNum = Math.min(-num + itemsToSaveForKey.length, 0);
    const itemsToAdd = (randomized ? shuffleAndReturnArr(cards) : cards)
      .filter((x) => !itemsToSaveForKey.find((i) => i.id === x.id))
      .map((x) => {
        return {
          id: x.id,
          isMarked: false,
          wordType: x.typ,
          topics: x.topics,
          isTextOpened: false,
          textWhenOpened: [x.wordPolish, ...x.additionalPolish],
          textWhenClosed: [x.wordEnglish],
          textBare: x.wordPolish,
        } as Card;
      })
      .slice(itemsToAddNum);
    return [...itemsToSaveForKey, ...itemsToAdd];
  });

  return res;
}

// parser
// console.log([...document.querySelectorAll('tr')].map(x => {
//   return [...x.getElementsByTagName('td')].map(x => x.innerText.replaceAll(/\[.*\]/gm, "").replaceAll('  ',' ').trim().trim('\n').replaceAll(' \n', ', '));
// }).map(x => `przymiotnik("${x[1]}","${x[0]}"),`).join('\r\n'))
