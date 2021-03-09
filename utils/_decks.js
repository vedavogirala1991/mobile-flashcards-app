import { AsyncStorage } from 'react-native'
import {formatDecks} from './helpers'

export const FLASHCARDS_STORAGE_KEY = 'MobileFlashCards:decks'

let decks = {
  React : {
    title : 'React',
    questions : [
      {
        question : 'what is React?',
        answer : 'A library for managing user interfaces.'
      },
      {
        question : 'Where do you make Ajax requests in React?',
        answer : 'The componentDidMount lifecycle event.',
      },
    ],
  },
  JavaScript : {
    title : 'JavaScript',
    questions : [
      {
        question : 'what is a closure?',
        answer : 'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
}

export function retrieveDecks () {
  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
  return decks
}
