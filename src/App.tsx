import React, { useState } from "react";
import "./App.scss";
import { CasesEndings } from "./CaseEndings/CasesEndings";
import { Numerals } from "./Numerals/Numerals";
import { Verbs } from "./Verbs/Verbs";
import dialogPolyfill from 'dialog-polyfill';
import { CasesUsage } from "./CaseUsage/CasesUsage";
import { Zaimki } from "./Zaimki/Zaimki";
import { Words } from "./Words/Words";

const modes = ["verbs", "cases-ending", "cases-usage", "words", "zaimki", "numerals"] as const;

type Mode = (typeof modes)[number];
const APP_MODE_KEY = "app-mode-key";

function getModeFromQS() {
  const searchParams = new URLSearchParams(window.location.search);

  const mode = searchParams.get(APP_MODE_KEY);

  if (mode && modes.includes(mode as any)) {
    return mode;
  }
}

function setModeToQs(mode: Mode) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(APP_MODE_KEY, mode);       
  window.history.pushState({}, '', `?${searchParams.toString()}`);
}

function App() {
  const [mode, setMode] = useState(getModeFromQS() ?? ("verbs" as Mode));

  return (
    <div className="App">
      <div id="menu-top">
        <select 
          id="mode-select" 
          value={mode}
          onChange={(evt) => {
            const newMode = evt.target.value as Mode | undefined;
            if (!newMode || newMode === mode) {
              return;
            }
            setModeToQs(newMode);
            setMode(newMode);
          }}  
        >
          {(
            [
              ["verbs", "Czasowniki"],
              ["cases-ending", "Przypadki (końcówki)"],
              ["cases-usage", "Przypadki (użycie)"], 
              ["zaimki", "Zaimki"], 
              ["numerals", "Liczebniki"],
              //["words", "Słownictwo"],
            ] as [Mode, string][]
          ).map(([buttonMode, label]) => (
            <option key={buttonMode} value={buttonMode}>{label}</option>
          ))}
            
        </select>

        <button
          key="help"
          style={{
            marginLeft: 20,
          }}
          onClick={() => {
            const dialog = document.getElementById(
              "help-dialog"
            ) as HTMLDialogElement;
            dialog.showModal();
          }}
        >
          Jak to działa?
        </button>
      </div>
      {renderHelpDialog()}
      <div>
        {mode === "cases-ending" && <CasesEndings />}
        {mode === "cases-usage" && <CasesUsage />}
        {mode === "zaimki" && <Zaimki />}
        {mode === "verbs" && <Verbs />}
        {mode === "numerals" && <Numerals />}
        {mode === "words" && <Words />}
      </div>
    </div>
  );

  function renderHelpDialog() {
    return (
      <dialog id="help-dialog">
        <button
          style={{
            alignSelf: "end",
            width: 30,
            height: 30,
          }}
          onClick={() => {
            const dialog = document.getElementById(
              "help-dialog"
            ) as HTMLDialogElement;
            dialog.close();
          }}
        >
          X
        </button>

        <p>
          "Kata" w sztukach walki to zbiór podstawowych form kluczowych dla
          poprawnej techniki. Tutaj jest kata dla uczących się języka polskiego.
          Tutaj zebrano przykłady podstawowych reguł gramatycznych i typowych
          wyjątków. Jest zawsze w telefonie, dzięki czemu możesz ćwiczyć przez
          10-15 minut w transporcie lub podczas lunchu.
        </p>

        <p>
          <strong>Jak ćwiczyć?</strong>
        </p>

        <p>Wybierz to, co chcesz ćwiczyć.</p>

        <p>
          Jeśli tego potrzebujesz - naciśnij
          <strong>"otworzyć wszystkie"</strong> i powtórz. Potem naciśnij
          <strong>"zamknąć wszystkie"</strong>.
        </p>

        <p>
          Naciśnij <strong>"rozpocznij ćwiczyć"</strong>, i przypomnij sobie
          poprawną formę podświetlonej kartki. Kliknij prawą stronę kartki, aby
          ją otworzyć i zweryfikować. Jeśli zgadłeś źle - kliknij ponownie aby zamknąć i sprobować jeszcze raz albo
          kliknij lewą stronę kartki, aby zaznaczyć ją do powtórzenia.
        </p>

        <p>
          Naciśnij <strong>"tasować"</strong> żeby utrudnić sobie zadanie.
        </p>

        <p>
          Potrzebujesz wyjaśnień gramatycznych? Zobacz:
          <br /> {link("https://polski.info/pl/grammar", "https://polski.info/pl/")}
          <br /> {link("https://www.polskinawynos.com/?page_id=329", " https://www.polskinawynos.com/")}
        </p>

        <p>
          Słowniki:
          <br /> {link("https://pl.bab.la/")}
          <br /> {link("https://context.reverso.net/t%C5%82umaczenie/", "https://context.reverso.net/")} (użycie słów)
          <br /> {link("https://pl.wiktionary.org/")} (Uważaj! Wikisłownik bardzo lubi formy gramatyky experymentałne I archaiczne. )
          <br /> {link("https://odmiana.net/")}
          <br /> {link("https://synonim.net/")}
          <br /> {link("https://pl.pons.com/t%C5%82umaczenie", "https://pl.pons.com/")}
        </p>

        <p>
          Kod tej strony dostępny jako open source: &nbsp;
          <a href="https://github.com/IKoshelev/polish-language-kata">
            https://github.com/IKoshelev/polish-language-kata
          </a>
        </p>
      </dialog>
    );
  }
}

function link(url: string, text?: string){
  return <a href={url}>
    {text ?? url}
</a>
}

export default App;
