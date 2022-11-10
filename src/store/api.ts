import {TriviaTheme, TriviaClue, TriviaScore} from "./types"

export const getThemes = (count: number):Promise<TriviaTheme[]> => {
  return fetch(`https://jservice.io/api/categories?count=${count}`)
    .then((res) => res.json())
}

export const getClues = (theme: number):Promise<TriviaClue[]> => {
  return fetch(`https://jservice.io/api/clues?category=${theme}`)
    .then((res) => res.json())
}

export const getSavedScores: (() => TriviaScore[]) = () => {
  let scoresString = localStorage.getItem('scores');
  if (scoresString !== null && typeof scoresString !== "undefined")
    return JSON.parse(scoresString);
  return [{ name: "Alice", score: 1000 }, { name: "John", score: 700 }, { name: "Bob", score: 500 }];
}

export const saveScores: ((scores: TriviaScore[]) => void) = (scores) => {
  localStorage.setItem('scores', JSON.stringify(scores));
}
