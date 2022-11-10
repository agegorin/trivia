import { makeAutoObservable } from "mobx";

import { themesCountForRequest, themesCountForChoice, cluesForGame } from "../settings";
import * as API from "./api";
import { TriviaTheme, TriviaClue, TriviaStates } from "./types"

class TriviaStore {
  state: TriviaStates = TriviaStates.WELCOME;
  currentClue: number = 0;
  score: number = 0;

  themes: TriviaTheme[] = [];
  clues: TriviaClue[] = [];
  selectedTheme: TriviaTheme | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  startGame = () => {
    this.score = 0;
    this.getThemes();
    this.state = TriviaStates.SELECTTHEME;
  }

  getThemes = () => {
    this.loading = true;
    API.getThemes(themesCountForRequest)
      .then((themes) => {
        this.themes = [];

        // Не все темы содержат нужное количество вопросов
        // количечество тем увеличивается на 1, потому что API отдает один вопрос с value == null
        const themesWithClues: TriviaTheme[] = themes.filter((theme) => theme.clues_count >= cluesForGame + 1);

        if (themesWithClues.length < themesCountForChoice) throw new Error("Too small amount of clues");

        // Выбираем случайные темы из подходящих
        for (let i = 0; i < themesCountForChoice; i++) {
          let index = Math.floor(Math.random() * themesWithClues.length);
          this.themes.push(themesWithClues[index]);
          themesWithClues.splice(index, 1);
        }

        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        throw new Error("Problem with loading themes");
      })
  }

  selectTheme = (id: number) => {
    this.currentClue = 0;
    this.selectedTheme = this.themes.find((theme) => theme.id === id) || null;
    this.getClues();
    this.state = TriviaStates.CLUE_ASK;
  }

  getClues = () => {
    if (this.selectedTheme === null) {
      throw new Error("Try to get clues without seleсted theme");
      return
    };

    this.loading = true;
    API.getClues(this.selectedTheme.id)
      .then((clues) => {
        this.clues = [];

        let filteredClues = clues.filter(clue => clue.value !== null);
        let selectedClues = [];

        // Выбираем случайные вопросы
        for (let i = 0; i < themesCountForChoice; i++) {
          let index = Math.floor(Math.random() * filteredClues.length);
          selectedClues.push(filteredClues[index]);
          filteredClues.splice(index, 1);
        }

        selectedClues.sort((a, b) => a.value as number - (b.value as number));

        this.clues = selectedClues;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        throw new Error("Problem with loading clues");
      })
  }

  getCurrentClue = () => {
    return this.clues[this.currentClue];
  }

  checkAnswer = (answer: string) => {
    if (this.clues[this.currentClue].answer === answer) {
      this.score += this.clues[this.currentClue].value as number;
      this.state = TriviaStates.CLUE_RIGHT;
    } else {
      this.state = TriviaStates.CLUE_WRONG;
    }
  }

  nextClue = () => {
    if (this.currentClue < cluesForGame - 1) {
      this.currentClue += 1;
      this.state = TriviaStates.CLUE_ASK;
    } else {
      this.state = TriviaStates.RESULTS;
    }
  }

}

export default TriviaStore;
