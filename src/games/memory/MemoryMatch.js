import GameComponent from '../../GameComponent.js';
import React from 'react';
import UserApi from '../../UserApi.js'
import './MemoryMatch.css';
//import { ActionThumbsUpDown } from 'material-ui/svg-icons';

export default class MemoryMatch extends GameComponent {
    constructor(props){
        super(props);
        this.state = {
                cardsSaved:[],
                cards: [
                  {
                    value: "https://i.imgur.com/gASpgkp.png",
                    flipped: false,
                    back: "https://i.imgur.com/w3S558P.png",
                    paired: false,
                  },
                  {
                    value:"https://i.imgur.com/XUPZl8x.png",
                    flipped: false,
                    back: "https://i.imgur.com/w3S558P.png",
                    paired: false,
                  },
                  {
                    value:"https://i.imgur.com/gASpgkp.png",
                    flipped: false,
                    back: "https://i.imgur.com/w3S558P.png",
                    paired: false,
                  },
                  {
                    value:"https://i.imgur.com/MI8YIEK.png",
                    flipped: false,
                    back: "https://i.imgur.com/w3S558P.png",
                    paired: false,
                  },
                  {
                    value:"https://i.imgur.com/XUPZl8x.png",
                    flipped: false,
                    back: "https://i.imgur.com/w3S558P.png",
                    paired: false,
                  },
                  {
                    value:"https://i.imgur.com/4orjKPo.png",
                    flipped: false,
                    back: "https://i.imgur.com/w3S558P.png",
                    paired: false,
                  },
                  {
                    value:"https://i.imgur.com/PGI3lbv.png",
                    flipped: false,
                    back: "https://i.imgur.com/w3S558P.png",
                    paired: false,
                  },
                  {
                    value:"https://i.imgur.com/PGI3lbv.png",
                    flipped: false,
                    back: "https://i.imgur.com/w3S558P.png",
                    paired: false,
                  },
                  {
                    value:"https://i.imgur.com/MI8YIEK.png",
                    flipped: false,
                    back: "https://i.imgur.com/w3S558P.png",
                    paired: false,
                  },
                  {
                    value:"https://i.imgur.com/4orjKPo.png",
                    flipped: false,
                    back: "https://i.imgur.com/w3S558P.png",
                    paired: false,
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
          if(cards[id].paired === true){

          } else {
            if(cards[id].flipped === false){
            cardsCopy[id].back = "https://i.imgur.com/w3S558P.png";
            } else if(cards[id].flipped === true){
            cardsCopy[id].back = cardsCopy[id].value;
            }
          //set state + checkCards
          this.setState({
            cards: cardsCopy,
            cardsSaved: this.state.cardsSaved.concat(cardsCopy[id])
          },() => this.checkCards(id, object, players))
        // console.log(this.state.cardsSaved.length);
        // console.log(this.state.cardsSaved)
       }
    }
   
   checkCards(id, object, players){
    const {cards} = this.state;
    let cardsCopy = [...cards];
    let cardsSv = this.state.cardsSaved;
    let playerCopy = players;
      if (cardsSv.length === 3){
      console.log("two reached"); 
      //check if card values match only if they are flipped
      if(playerCopy[0].turn === true){

      console.log(playerCopy[0].turn);
     // + 1 point
        if(cardsSv[0].value === cardsSv[1].value && cardsSv[0].flipped && cardsSv[1].flipped){
          console.log("value match");
          playerCopy[0].points = playerCopy[0].points + 1;
          //cardsCopy = cardsSv[]
          this.setState({
            cards: cardsCopy,
            players: playerCopy
          })
        } else if (cardsSv[0].value !== cardsSv[1].value && cardsSv[0].flipped && cardsSv[1].flipped){
          for(let i = 0; i < cardsCopy.length; i++){
            for(let j = 0; j < cardsSv.length; j++){
              if(cardsCopy[i].value === cardsSv[j].value){
                cardsCopy[i].flipped = !cardsCopy[i].flipped;
                cardsCopy[i].back = "https://i.imgur.com/w3S558P.png";
              } 
            }
          }
        }
        playerCopy[0].turn = false;
        playerCopy[1].turn = true;
        this.setState({
          cards: cardsCopy,
          cardsSaved: []
        })
        console.log(this.state.cardsSaved);
    } else if (playerCopy[1].turn ===  true){
        if(cardsSv[0].value === cardsSv[1].value && cardsSv[0].flipped && cardsSv[1].flipped){
          playerCopy[1].points = playerCopy[1].points + 1;
          this.setState({
            players: playerCopy
          })
        } else if (cardsSv[0].value !== cardsSv[1].value && cardsSv[0].flipped && cardsSv[1].flipped){
          for(let i = 0; i < cardsCopy.length; i++){
            for(let j = 0; j < cardsSv.length; j++){
              if(cardsCopy[i].value === cardsSv[j].value){
                cardsCopy[i].flipped = !cardsCopy[i].flipped;
                cardsCopy[i].back = "https://i.imgur.com/w3S558P.png";
              } 
            }
          }
        }
          playerCopy[1].turn = false;
          playerCopy[0].turn = true;
          this.setState({
            cards: cardsCopy,
            cardsSaved: []
          })
      } 
     }
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
   var cards = this.state.cards.map((object, index) => (
     <img className="card" id={index} onClick={() => this.userAction(index, object, this.state.players)} src={object.back}></img>
   ));
   var playerTurn;
   var playerPoints;
   if(this.state.players[0].turn === true){
      playerTurn = 1;
      playerPoints = this.state.players[0].points;

   } else if (this.state.players[1].turn === true){
      playerTurn = 2;
      playerPoints = this.state.players[1].points;
   }
   


    
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
         <h1>Memory Match</h1>
         <div className="stats">
          <p>Player {playerTurn}'s Turn</p>
          <p>Player {playerTurn}'s Points: {playerPoints}</p>
        </div>
        <div className="board">
          {cards}
          </div>
        <div className="controls">
          <button id="reset" onClick={this.newGame()}> Reset </button>
          <p classname="description">*Cards made with help from ASEC*</p>
        </div>
       </div>

    );
  }
}
