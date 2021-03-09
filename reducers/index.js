import { RECEIVE_DECKS, ADD_DECK, ADD_DECK_CARD} from '../actions'

const decks = (state = {}, action) => {
  console.log('Reducer Action :: ', action)
  console.log('Reducer state :: ', state)
  console.log('Reducer action.decks :: ', action.decks)
  //console.log('Reducer state[action.deckName] :: ', state[action.deckName])
  //console.log('Reducer state[action.deckName].questions :: ', state[action.deckName].questions)
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
      return {
        ...state,
        ...action.decks,
        [action.deckName] : {
          ...state[action.deckName],
          questions : state[action.deckName].questions.concat([action.ques])
        }
      }
    default :
      return state
  }
}

export default decks
