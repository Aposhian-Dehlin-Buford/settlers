const shuffleDeck = (deck) => {
  let deckSize = deck.length
  while(deckSize){
    deck.push(deck.splice(Math.floor(Math.random() * deckSize), 1)[0])
    deckSize -= 1
  }
    return deck
}

const seedDeck = () => {
    const cardTypes = ['Knight', 'Victory Point', 'Road Building', 'Monopoly', 'Year of Plenty']
    const count = [14, 5, 2, 2, 2]
    const deck = []
      for(let i = 0; i < count.length; i++){
        deck.push(cardTypes[i])
        if(count[i] > 1){
          count[i]--
          i--
        }
      }
    return shuffleDeck(deck)
}


module.exports = {seedDeck, shuffleDeck}