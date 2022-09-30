import React, { useState } from "react";
import "./App.scss";
import { Cases } from "./Cases";
import { Numerals } from "./Numerals";
import { Verbs } from "./Verbs";
import dialogPolyfill from 'dialog-polyfill';

type Mode = "cases" | "verbs" | "numerals";
const APP_MODE_KEY = "app-mode-key";

function getModeFromQS() {
  const searchParams = new URLSearchParams(window.location.search);

  if (searchParams.has(APP_MODE_KEY)) {
    return searchParams.get(APP_MODE_KEY);
  }
}

function setModeToQs(mode: Mode) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(APP_MODE_KEY, mode);
  window.location.search = searchParams.toString();
}

function App() {
  const [mode, setMode] = useState(getModeFromQS() ?? ("cases" as Mode));

  return (
    <div className="App">
      <div id="menu-top">
        {(
          [
            ["cases", "Przypadki"],
            ["verbs", "Czasowniki"],
            ["numerals", "Liczebniki"],
          ] as [Mode, string][]
        ).map(([buttonMode, label]) => (
          <button
            key={buttonMode}
            className={buttonMode === mode ? "active" : ""}
            onClick={() => {
              if (buttonMode === mode) {
                return;
              }
              setModeToQs(buttonMode);
              setMode(buttonMode);
            }}
          >
            {label}
          </button>
        ))}
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
        {mode === "cases" && <Cases />}
        {mode === "verbs" && <Verbs />}
        {mode === "numerals" && <Numerals />}
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
          Jeśli tego potrzebujesz - naciśnij{" "}
          <strong>"otworzyć wszystkie"</strong> i powtórz. Potem naciśnij{" "}
          <strong>"zamknąć wszystkie"</strong>.
        </p>

        <p>
          Naciśnij <strong>"rozpocznij ćwiczyć"</strong>, i przypomnij sobie
          poprawną formę podświetlonej kartki. Kliknij prawą stronę kartki, aby
          ją otworzyć i zweryfikować. Jeśli zgadłeś źle - kliknij lewą stronę
          kartki, aby zaznaczyć ją do powtórzenia.
        </p>

        <p>
          Naciśnij <strong>"tasować"</strong> żeby utrudnić sobie zadanie.
        </p>

        <p>
          Potrzebujesz wyjaśnień gramatycznych? Zobacz:
          <br />
          <a href="https://polski.info/pl/grammar">
            https://polski.info/pl/grammar
          </a>
          <br />
          <a href="https://www.polskinawynos.com/?page_id=329">
            https://www.polskinawynos.com/
          </a>
        </p>

        <p>
          Kod dostępny jako open source: &nbsp;
          <a href="https://github.com/IKoshelev/polish-language-kata">
            https://github.com/IKoshelev/polish-language-kata
          </a>
        </p>
      </dialog>
    );
  }
}

export default App;
