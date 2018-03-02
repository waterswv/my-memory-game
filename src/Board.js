import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import './Board.css';

const cardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHED: 2
}

class Board extends Component {
  constructor(props){
    super(props);

    let cards = [
      {id: 0, cardState: cardState.HIDING, backgroundColor: 'DodgerBlue'},
      {id: 1, cardState: cardState.HIDING, backgroundColor: 'DodgerBlue'},
      {id: 2, cardState: cardState.HIDING, backgroundColor: 'Red'},
      {id: 3, cardState: cardState.HIDING, backgroundColor: 'Red'},
      {id: 4, cardState: cardState.HIDING, backgroundColor: 'Green'},
      {id: 5, cardState: cardState.HIDING, backgroundColor: 'Green'},
      {id: 6, cardState: cardState.HIDING, backgroundColor: 'Yellow'},
      {id: 7, cardState: cardState.HIDING, backgroundColor: 'Yellow'},
      {id: 8, cardState: cardState.HIDING, backgroundColor: 'Orange'},
      {id: 9, cardState: cardState.HIDING, backgroundColor: 'Orange'},
      {id: 10, cardState: cardState.HIDING, backgroundColor: 'Black'},
      {id: 11, cardState: cardState.HIDING, backgroundColor: 'Black'},
      {id: 12, cardState: cardState.MATCHED, backgroundColor: 'Pink'},
      {id: 13, cardState: cardState.MATCHED, backgroundColor: 'Pink'},
      {id: 14, cardState: cardState.HIDING, backgroundColor: 'Purple'},
      {id: 15, cardState: cardState.HIDING, backgroundColor: 'Purple'},

    ];
    cards = shuffle(cards);
    this.state = { cards };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id){
    const updateCards = (cards, idsToChange, newCardState) => {
      return cards.map(card => {
        if (idsToChange.includes(card.id))
        {
            card.cardState = newCardState
            return card;
          };

        return card;
      });
    }
    const findIDs = (cardsShowing) => {return cardsShowing.map(card => {return card.id})};
    const foundCards = updateCards(this.state.cards, [id], cardState.SHOWING);
    const cardsShowing = foundCards.filter(card => card.cardState === cardState.SHOWING);
    let cardShowingIDs = findIDs(cardsShowing);
    if(cardsShowing.length < 2)
      this.setState(foundCards);
    else if(cardsShowing.length === 2){
      if(cardsShowing[0].backgroundColor === cardsShowing[1].backgroundColor ){
        const matchingCards = updateCards(foundCards, cardShowingIDs, cardState.MATCHING);
        this.setState(matchingCards);
      }
      else{
        this.setState(foundCards);
        setTimeout(() => {
          const resetCards = updateCards(foundCards, cardShowingIDs, cardState.HIDING);
          this.setState(resetCards);
          
        }, 3000);
      }
    }



  }
  render() {
    const theCards = this.state.cards.map((card) => (
      <Card
        key={card.id}
        backgroundColor={card.backgroundColor}
        showing={card.cardState !== cardState.HIDING}
        onClick={() => this.handleClick(card.id)}
      />
    ));
    return (
      <div className="board">
        {theCards}
      </div>
    );
  }
}

const Card = (props) => {
  let style = {}
  if(props.showing)
  {
    style.backgroundColor = props.backgroundColor;
  }
  return(
    <div
    className='box'
    id={props.id}
    style={style}
    onClick={props.onClick}>

    </div>
  )
};

export default Board;
