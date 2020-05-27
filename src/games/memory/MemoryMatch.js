import GameComponent from '../../GameComponent.js';
import React from 'react';
import UserApi from '../../UserApi.js'
import './MemoryMatch.css';

export default class MemoryMatch extends GameComponent {
    constructor(props){
        super(props);
        this.state = {
                cardsSaved:[],
                cards: [
                  {
                    value:"cake",
                    flipped: false,
                    text: "back"
                  },
                  {
                    value:"pen",
                    flipped: false,
                    text: "back"
                  },
                  {
                    value:"pen",
                    flipped: false,
                    text: "back"
                  },
                  {
                    value:"dog",
                    flipped: false,
                    text: "back"
                  },
                  {
                    value:"cake",
                    flipped: false,
                    text: "back"
                  },
                  {
                    value:"dog",
                    flipped: false,
                    text: "back"
                  },
                ],
                players:[
                  {
                    id: this.getSessionCreatorUserId(),
                    cardsClicked: 0,
                    points: 0,
                    turn: true
                   }, 
                  {
                    id:  this.getSessionUserIds(),
                    cardsClicked: 0,
                    points: 0,
                    turn: false
                  }, 
                ]
            }
    }
    getOtherSessionUserID(){
        //finds other person's session id
    }
    onSessionDataChanged(data){
        //takes database info to update
          this.setState({
              turn: data.currentPlayer,
          })
    }
    userAction = (id, object, players) => {
        //user clicks cards
        const {cards} = this.state;
        let cardsCopy = [...cards];
        cardsCopy[id].flipped = !cardsCopy[id].flipped;
          //if cards are flipped show front else show back
          if(cards[id].flipped === false){
            cardsCopy[id].text = "back";
          } else if(cards[id].flipped === true){
            cardsCopy[id].text = cardsCopy[id].value;
          }
          //set state + checkCards
          this.setState({
            cards: cardsCopy,
            cardsSaved: this.state.cardsSaved.concat(cardsCopy[id])
          },() => this.checkCards(players))
        // console.log(this.state.cardsSaved.length);
        // console.log(this.state.cardsSaved)
    }
    stopClick(){
        var buttons = this.state.cards.cardsValue.map((state, i) => (
        <button>
            disabled={!this.isMyTurn() || state !== "gone"}
            onClick={() => this.handleButtonClick(i)}>
          {state}
        </button>
        ));
    }
   checkCards(players){
    let cards = this.state.cardsSaved;
    // const {players} = this.state;
    // const {turn} = this.state;
    // let playerTurn = turn;
    let playerCopy = players;
    if (cards.length === 2){
      console.log("two reached"); 
      //check if card values match only if they are flipped
      if(cards[0].value === cards[1].value && cards[0].flipped && cards[1].flipped){
      console.log("value match");
      console.log(playerCopy[0].turn);
     // + 1 point
        if(playerCopy[0].turn === true){
          playerCopy.points = playerCopy[0].points + 1;
          playerCopy[0].turn = false;
          playerCopy[1].turn = true;
          this.setState({
            cardsSaved: [],
            players: playerCopy
          })
        } else if (playerCopy[1].turn ===  true){
          playerCopy.points = playerCopy[1].points + 1;
          playerCopy[1].turn = false;
          playerCopy[0].turn = true;
          this.setState({
            cardsSaved: [],
            players: playerCopy
          })
        }
    
      } else {
      //have two cards turn back around
      }
      //wipe cardsSaved
      this.setState({
        cardsSaved: []
      })
    } else if(cards.length > 2){
      // disable buttons and flips the rest over
      
    }
   }
  newGame(){
      var gameData = {
        cards: {
            cardsValue: [], 
            cardsFlipped: [],
        },
        players:{
              player1:{
                  cardsClicked: 0,
                  points: 0,
              }, 
              player2:{
                cardsClicked: 0,
                points: 0,
            }, 
      }
    }
    this.getSessionDatabaseRef().set(gameData);
  }  
  randomizeCards(array){
      //randomize cards before loading 
      // let newArray = array.sort(() => 0.5 - Math.random());
      // return newArray;
      var ctr = array.length, temp, index;

      // While there are elements in the array
          while (ctr > 0) {
      // Pick a random index
              index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
              ctr--;
      // And swap the last element with it
              temp = array[ctr];
              array[ctr] = array[index];
              array[index] = temp;
          }
          return array;
  }
  cardsFlipped(index){
    const newcardsFlipped = this.setstate.cards.cardsFlipped;
    newcardsFlipped[index]=!newcardsFlipped[index];
    this.set.state ({
      cards:{
          
    
      },
      cardsFlipped: newcardsFlipped,
    
      });
    
    };

  render(){
    /*var id = this.getSessionId();
    var users = this.getSessionUserIds().map((user_id) => (
      <li key={user_id}>{user_id}</li>
    ));
    var creatorId = UserApi.getName(this.getSessionCreatorUserId());
    var userName = this.getMyUserId();*/
    
  //Change the Button to a show a different name when clicked
  // var displayCard = this.state.cards.cardsValue.map((cardName, index) => {
  //    if(this.state.cardsFlipped[index]){
  //      return cardName;
  //    }
  // return "";
  // });

 
 
  //const handleClick = e => this.userAction(e.target.id);
   var buttons = this.state.cards.map((object, index) => (
     <button className="card" id={index} onClick={() => this.userAction(index, object, this.state.players)}>{object.text}</button>
   ));


    
    return (
    //    <div>
    //      <p>Session ID: {id}</p>
    //      <p>Session creator: {creatorId}</p>
    //      <p>Session users:</p>
    //      <p>User name: {userName}</p>
    //      <p>Photo URL:{UserApi.getPhotoUrl()} </p>s
    //      <p>User sign in: {UserApi.getLastSignIn()}</p>
    //      <ul>
    //        {users}
    //      </ul>
    //    </div>
   
       <div className="game">
         <p></p>
          {buttons}
          
         {/* <div className="cards">
           <div className="topHalf">
              <button className="card" id="0" onClick={handleClick}> {this.state.cards[0].current} </button>
              <button className="card" id="1" onClick={handleClick}> {this.state.text} </button>
              <button className="card" id="2" onClick={handleClick}> {this.state.text} </button>
            </div>
            <div className="bottomHalf">
              <button className="card" id="3" onClick={handleClick}> {this.state.text} </button>
              <button className="card" id="4" onClick={handleClick}> {this.state.text} </button>
              <button className="card" id="5" onClick={handleClick}> {this.state.text} </button>
            </div>
          </div> */}
          <div className="controls">
            <button id="reset" onClick={this.newGame()}> Reset </button>
          </div>
       </div>

    );
  }
}
class RenderOnce extends React.Component {
    state = {
      cards: [
        {
          value:"cake",
          flipped: false,
          text: "back"
        },
        {
          value:"pen",
          flipped: false,
          text: "back"
        },
        {
          value:"pen",
          flipped: false,
          text: "back"
        },
        {
          value:"dog",
          flipped: false,
          text: "back"
        },
        {
          value:"cake",
          flipped: false,
          text: "back"
        },
        {
          value:"dog",
          flipped: false,
          text: "back"
        },
      ],
    };
    randomizeCards(array){
      const {cards} = this.state;
      let cardsCopy = [...cards];
      cardsCopy = this.randomizeCards(cardsCopy);
      console.log(cardsCopy);
      this.setState({
        cards: cardsCopy,
      })
    }
    render() {
      this.randomizeCards(this.state.cards);
      return;
    }
}


