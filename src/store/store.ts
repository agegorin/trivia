import { makeAutoObservable } from "mobx";

import * as API from "./api";
import {TriviaTheme, TriviaClue} from "./types"

class TriviaStore {
  themes: TriviaTheme[] = [];
  clues: TriviaClue[] = [];
  selectedTheme: number = 0;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }
  
  getThemes = () => {
    this.loading = true;
    API.getThemes()
      .then((themes) => {
        this.themes = themes;
        this.loading = false;
      })
      .catch((err) => {
        console.error(err);
        this.loading = false;
      }) 
  }

  selectTheme = (id: number) => {
    this.selectedTheme = id;
  }

  getClues = () => {
    this.loading = true;
    API.getClues(this.selectedTheme)
      .then((clues) => {
        this.clues = clues;
        this.loading = false;
      })
      .catch((err) => {
        console.error(err);
        this.loading = false;
      }) 
  }

}

export default TriviaStore;
