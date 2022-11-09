import {TriviaTheme, TriviaClue} from "./types"

export const getThemes = ():Promise<TriviaTheme[]> => {
  return fetch("https://jservice.io/api/categories?count=10")
    .then((res) => res.json())
}

export const getClues = (theme: number):Promise<TriviaClue[]> => {
  return fetch(`https://jservice.io/api/clues?category=${theme}`)
    .then((res) => res.json())
}
