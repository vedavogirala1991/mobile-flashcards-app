import { RECEIVE_DECKS, ADD_DECK, ADD_DECK_CARD,REMOVE_DECK, RESET_DECKS} from '../actions'

const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck,
      }
    case ADD_DECK_CARD :
      const {deckName,card} = action

      return {
        ...state,
        [deckName]: {
          ...state[deckName],
          questions: [...state[deckName].questions].concat(card),
        }
      }
    case REMOVE_DECK :
      console.log('action.deckName : ',action.deckName)
      const {[action.deckName] : value, ...remainingState } = state
      console.log('..remainingState : ',remainingState)
      return remainingState
    case RESET_DECKS :
      return {}
    default :
      return state
  }
}

export default decks
