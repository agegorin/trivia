import { makeAutoObservable } from "mobx";

import * as API from "./api";
import {TriviaTheme, TriviaClue} from "./types"

class TriviaStore {
  themes: TriviaTheme[] = [];
  clues: TriviaClue[] = [];
  selectedTheme: TriviaTheme | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }
  
  getThemes = () => {
    this.loading = true;
    API.getThemes(100)
      .then((themes) => {
        this.themes = [];

        // Не все темы содержат хотя бы 10 вопросов
        const themesWithClues: TriviaTheme[] = themes.filter((theme) => theme.clues_count >=10);

        if (themesWithClues.length < 10) throw new Error("Too small amount of clues");

        // Выбираем случайные темы из подходящих
        for(let i = 0; i < 10; i++) {
          let index = Math.floor(Math.random()*themesWithClues.length);
          this.themes.push( themesWithClues[index] );
          themesWithClues.splice(index, 1);
        }

        this.loading = false;
      })
      .catch((err) => {
        throw new Error("Problem with loading themes");
        this.loading = false;
      }) 
  }

  selectTheme = (id: number) => {
    this.selectedTheme = this.themes.find((theme) => theme.id === id) || null; 
  }

  getClues = () => {
    if (this.selectedTheme === null) {
      throw new Error("Try to get clues without seleсted theme");
      return
    };

    this.loading = true;
    API.getClues(this.selectedTheme.id)
      .then((clues) => {
        this.clues = clues;
        this.loading = false;
      })
      .catch((err) => {
        throw new Error("Problem with loading clues");
        this.loading = false;
      }) 
  }

}

export default TriviaStore;
