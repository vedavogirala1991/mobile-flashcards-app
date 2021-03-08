import {retrieveDecks,FLASHCARDS_STORAGE_KEY} from './_decks'
import { AsyncStorage } from 'react-native'

export const fetchDeckDetails = () => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(retrieveDecks)
}
