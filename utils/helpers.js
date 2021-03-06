export const formDeckOverview = (deck) => {

  let deckTitle = deck[0]
  let deckObject = deck[1]

  let cardCount = deckObject.questions.length

  let formattedDeck = {
    title : deckTitle,
    count : cardCount,
  }

  return formattedDeck
}
