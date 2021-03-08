export const RECEIVE_DECKS = 'RECEIVE_DECKS'
import {fetchDeckDetails} from '../utils/api'

export const recieveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}
