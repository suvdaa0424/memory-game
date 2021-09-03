import './App.css';
import MemoryCard from './Components/MemoryCard';
import React from 'react';

// function App() {
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
function generateDeck()  {
    var symbols = ['∆', 'ß', '£', '§', '•', '$', '+', 'ø'];
    let deck = []
    for (let i = 0; i < 16; i++) {
      deck.push({
        isFlipped: false,
        symbol: symbols[i % 8]
      })
    }
    return shuffle(deck)
  }
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      deck: generateDeck(),
      pickedCards: [],
      win: true
    }
  }
  unflipCards (card1Index, card2Index) {
    const card1 = {...this.state.deck[card1Index]}
    const card2 = {...this.state.deck[card2Index]}
    card1.isFlipped = false
    card2.isFlipped = false
  const newDeck = this.state.deck.map((card, index) => {
    if(index === card1Index) {
      return card1
    }
    if(index === card2Index) {
      return card2
    }
    return card
  })
  this.setState({deck: newDeck})
  }
  // Add a new member function to the App component called pickCard
  pickCard = (cardIndex) => {
    // Set up a variable cardToFlip to store a copy of the card data that we are trying to flip
    const cardToFlip = {...this.state.deck[cardIndex]}
    if (cardToFlip.isFlipped) {
    return
    }
    cardToFlip.isFlipped = true

    let newPickedCards = [...this.state.pickedCards, cardIndex]
    const newDeck = this.state.deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip
      }
      return card
    })

    if (newPickedCards.length === 2) {
      const card1index = newPickedCards[0]
      const card2index = newPickedCards[1]
      const firstCard = newDeck[card1index]
      const secondCard = newDeck[card2index]
      if (firstCard.symbol !== secondCard.symbol) {
        // unflip cards
        // this.unflipCards(newPickedCards[0], newPickedCards[1])
        setTimeout(() => {this.unflipCards(card1index, card2index)}, 1000)
      }
    newPickedCards = []

    }
    const win = newDeck.every( card => {
      return card.isFlipped
    })

    this.setState({deck: newDeck, pickedCards: newPickedCards, win: win})
}

refreshDeck = () => {
  this.setState({
    deck: generateDeck()
  })
}


  render() {
    const cardsJSX = this.state.deck.map((card, index) => {
      return <MemoryCard clickHandler={() => this.pickCard(index)} symbol={card.symbol} isFlipped={card.isFlipped} key={index}
      />
    })
    if (this.state.win === true) {

    }
    return (
      <div className="App">
        <header className="App-header">
          <h1>Memory Game</h1>
          <h2 className="subtitle">Match cards to win!</h2>
        </header>
        <div>
        {cardsJSX.slice(0,4)}
        </div>
        <div>
        {cardsJSX.slice(4,8)}
        </div>
        <div>
        {cardsJSX.slice(8,12)}
        </div>
        <div>
        {cardsJSX.slice(12,16)}
        </div>
        {this.state.win ? (<button onClick={this.refreshDeck}>Refresh</button>) : ('')}
      </div>
    );
  }
}
// }

export default App;
