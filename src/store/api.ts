import {TriviaTheme, TriviaClue} from "./types"

export const getThemes = (count: number):Promise<TriviaTheme[]> => {
  return fetch(`https://jservice.io/api/categories?count=${count}`)
    .then((res) => res.json())
}

export const getClues = (theme: number):Promise<TriviaClue[]> => {
  return fetch(`https://jservice.io/api/clues?category=${theme}`)
    .then((res) => res.json())
}
