import { action, makeAutoObservable } from "mobx";

import { themesCountForRequest, themesCountForChoice, cluesForGame } from "../settings";
import * as API from "./api";
import { TriviaTheme, TriviaClue, TriviaScore, TriviaStates } from "./types"

class TriviaStore {
  state: TriviaStates = TriviaStates.WELCOME;
  currentClue: number = 0;
  score: number = 0;
  previousScore: number | null = null;
  username: string = "";
  scores: TriviaScore[] = [];
  themes: TriviaTheme[] = [];
  clues: TriviaClue[] = [];
  selectedTheme: TriviaTheme | null = null;
  loading = false;

  errorMessage:string = "Some unexpected error happend.";

  constructor() {
    makeAutoObservable(this);
    this.scores = API.getSavedScores();
  }

  startGame = (username: string) => {
    this.score = 0;
    this.username = username;
    this.themes = [];
    this._getThemes();
    this.state = TriviaStates.SELECTTHEME;
  }

  _getThemes = () => {
    this.loading = true;
    API.getThemes(themesCountForRequest)
      .then(action((themes) => {
        this.themes = processThemes(themes, themesCountForChoice, cluesForGame);
        this.loading = false;
      }))
      .catch(action((err) => {
        this.loading = false;
        this.errorMessage = "Can't load themes. Mayby no internet?";
        this.state = TriviaStates.ERROR;
      }))
  }

  selectTheme = (id: number) => {
    this.currentClue = 0;
    this.selectedTheme = this.themes.find((theme) => theme.id === id) || null;
    this.clues = [];
    this._getClues();
    this.state = TriviaStates.CLUE_ASK;
  }

  _getClues = () => {
    if (this.selectedTheme === null) {
      this.errorMessage = "Selected theme accidentally have no clues";
      this.state = TriviaStates.ERROR;
      return;
    };

    this.loading = true;
    API.getClues(this.selectedTheme.id)
      .then(action((clues) => {
        this.clues = processClues(clues, cluesForGame);
        this.loading = false;
      }))
      .catch(action((err) => {
        this.loading = false;
        this.errorMessage = "Can't load clues. Mayby no internet?";
        this.state = TriviaStates.ERROR;
      }))
  }

  getCurrentClue = () => {
    return this.clues.length > 0 ? this.clues[this.currentClue] : null;
  }

  checkAnswer = (answer: string) => {
    if (simplifyString(this.clues[this.currentClue].answer) === simplifyString(answer)) {
      this.score += this.clues[this.currentClue].value as number;
      this.state = TriviaStates.CLUE_RIGHT;
    } else {
      this.state = TriviaStates.CLUE_WRONG;
    }
  }

  nextClue = () => {
    if (this.currentClue < cluesForGame - 1) {
      // NEXT CLUE
      this.currentClue += 1;
      this.state = TriviaStates.CLUE_ASK;
    } else {
      // SHOW RESULTS
      const scoreIndex = this.scores.findIndex(el => el.name === this.username);
      if (scoreIndex !== -1) {
        this.previousScore = this.scores[scoreIndex].score;
        if (this.score > this.previousScore) {
          this.scores[scoreIndex].score = this.score;
          this.scores.sort((a, b) => (b.score - a.score));
          API.saveScores(this.scores);
        }
      } else {
        this.scores.push({ name: this.username, score: this.score });
        this.scores.sort((a, b) => (b.score - a.score));
        this.scores = this.scores.slice(0, 10);
        API.saveScores(this.scores);
      }

      this.state = TriviaStates.RESULTS;
    }
  }

  goToStart = () => {
    this.state = TriviaStates.WELCOME;
  }
}

const processThemes: ((themes: TriviaTheme[], count: number, cluesCount: number) => TriviaTheme[]) = (themes, count, cluesCount) => {
  const themesResult: TriviaTheme[] = [];

  // ???? ?????? ???????? ???????????????? ???????????? ???????????????????? ????????????????
  // ???????????????????????? ?????? ?????????????????????????? ???? 1, ???????????? ?????? API ???????????? ???????? ???????????? ?? value == null
  const themesWithClues: TriviaTheme[] = themes.filter((theme) => theme.clues_count >= cluesCount + 1);

  // ???????????????? ?????????????????? ???????? ???? ????????????????????
  for (let i = 0; i < count; i++) {
    let index = Math.floor(Math.random() * themesWithClues.length);
    themesResult.push(themesWithClues[index]);
    themesWithClues.splice(index, 1);
  }

  return themesResult;
}

const processClues: ((clues: TriviaClue[], cluesCount: number) => TriviaClue[]) = (clues, cluesCount) => {

  let filteredClues = clues.filter(clue => clue.value !== null);
  let selectedClues = [];

  // ???????????????? ?????????????????? ??????????????
  for (let i = 0; i < cluesCount; i++) {
    let index = Math.floor(Math.random() * filteredClues.length);
    selectedClues.push(filteredClues[index]);
    filteredClues.splice(index, 1);
  }

  selectedClues.sort((a, b) => a.value as number - (b.value as number));

  return selectedClues;
}

const simplifyString: ((str: string) => string) = (str: string) => {
  return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

export default TriviaStore;
