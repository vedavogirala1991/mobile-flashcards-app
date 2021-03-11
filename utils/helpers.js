export const formatDeck = (key) => {
  return {
    [key] : {
      title : key,
      questions : [],
    }
  }
}

export const formatCards = (deck) => {
  const cards = deck.questions.map((card,index)=>
  {
    return {
      index,
      question : card.question,
      answer : card.answer,
      display : 'question',
      answered : false,
    }
  })
  return cards
}
