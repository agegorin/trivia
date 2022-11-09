export interface TriviaTheme {
  id: number
  title: string
  clues_count: number
  created_at?: string
  updated_at?: string
}

export interface TriviaClue {
  id: number
  answer: string
  question: string
  value: number
  airdate?: string //"1985-02-08T12:00:00.000Z"
  created_at?: string //"2022-07-27T00:24:05.346Z"
  updated_at?: string // "2022-07-27T00:24:05.346Z"
  category_id: number
  game_id: number
  invalid_count?: any
  category: TriviaTheme
}
