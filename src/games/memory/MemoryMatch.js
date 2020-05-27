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
                cardsClicked: 0,
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
                    points: 0,
                    turn: true
                   }, 
                  {
                    id:  this.getSessionUserIds(),
                    points: 0,
                    turn: false
                  }, 
                ],
                seen: false
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
        this.endGame(cardsCopy);
        //check if all flipped
          //if cards are flipped show front else show back
          if(cards[id].paired === true){
            console.log("paired");
          } else {
            cardsCopy[id].flipped = !cardsCopy[id].flipped;
            if(cards[id].flipped === false){
            cardsCopy[id].back = "https://i.imgur.com/w3S558P.png";
            } else if(cards[id].flipped === true){
            cardsCopy[id].back = cardsCopy[id].value;
            }
          //set state + checkCards
          this.setState({
            cards: cardsCopy,
            cardsClicked: this.state.cardsClicked + 1,
            cardsSaved: this.state.cardsSaved.concat(cardsCopy[id])
          },() => this.checkCards(id, object, players))
        // console.log(this.state.cardsSaved.length);
        // console.log(this.state.cardsSaved)
       }
    }
    cardsMatch(player, cardsSv, playerCopy, cardsCopy){
      //doesn't run
      if(cardsSv[0].value === cardsSv[1].value && cardsSv[0].flipped && cardsSv[1].flipped){
        console.log("value match"); 
        debugger;
        for(let i = 0; i < cardsCopy.length; i++){
          for(let j = 0; j < cardsSv.length; j++){
            if(cardsCopy[i].value === cardsSv[j].value){
              cardsCopy[i].paired = true;
              console.log(cardsCopy[i].paired);
            } 
          }
        } 

        //just try to flip back the third card whenever possible
        cardsSv[2].flipped = false;
        this.setState({
          cards: cardsCopy,
          players: playerCopy,
          cardsSaved: [],
          cardsClicked: 0,
        })
      } else {
        cardsSv.forEach((v) => {
          v.back = "https://i.imgur.com/w3S558P.png";
          v.flipped = false;
        })
      }
      if (player === 0){
        playerCopy[0].turn = false;
        playerCopy[1].turn = true;
      }else{
        playerCopy[1].turn = false;
        playerCopy[0].turn = true;
      }
        cardsSv[2].flipped = false;
      this.setState({
        cards: cardsCopy,
        players: playerCopy,
        cardsSaved: [],
        cardsClicked: 0,
      })
      console.log(this.state.cardsSaved);
    }
   checkCards(id, object, players){
    const {cards} = this.state;
    let cardsCopy = [...cards];
    let cardsSv = this.state.cardsSaved;
    let playerCopy = players;
    if(cardsSv.length === 3){
      console.log("two reached"); 
      if(playerCopy[0].turn === true){
        this.cardsMatch(0, cardsSv, playerCopy, cardsCopy);
      } else if (playerCopy[1].turn ===  true){
        this.cardsMatch(1, cardsSv, playerCopy, cardsCopy);
      } 
    }else if (cardsSv.length === 2 && cardsSv[0].value === cardsSv[1].value){
      cardsSv[0].paired = true;
      cardsSv[1].paired = true;
        if(playerCopy[0].turn === true){
          playerCopy[0].points = playerCopy[0].points + 1;
          console.log(playerCopy[0].points);
        } else if (playerCopy[1].turn ===  true){
          playerCopy[1].points = playerCopy[1].points + 1;
          console.log(playerCopy[1].points);
        } 
      this.setState({
        cards: cardsCopy,
        players: playerCopy,
        cardsSaved: [],
        cardsClicked: 0,
      })
      console.log(this.state.players);
    }
  }
   endGame(cardsCopy){
    let pairedCount = 0;
    for(let k = 0; k < cardsCopy.length; k++){
        if(cardsCopy[k].paired === true){
          pairedCount = pairedCount + 1;
        } 
    } 
    if(pairedCount === cardsCopy.length){
      this.setState({
        seen: !this.state.seen
       });
      return;
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
  //   this.getSessionDatabaseRef().set(gameData);
    const {cards} = this.state;
    let cardsCopy = [...cards];
    let playerCopy = this.state.players;
    for(let l = 0; l < playerCopy.length; l++){
      playerCopy[l].points = 0;
    } 
    for(let m = 0; m < cardsCopy.length; m++){
      cardsCopy[m].paired = false;
      cardsCopy[m].flipped = false;
      cardsCopy[m].back = "https://i.imgur.com/w3S558P.png";
    } 
    playerCopy[0].turn = true;
    playerCopy[1].turn = false;
    this.setState({
      seen: false,
      cardsSaved: [],
      cardsClicked: 0,
      cards: cardsCopy,
      players: playerCopy,
    })

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
    {this.state.seen ? <div className="popUp">
      <p className="endInfo">Game Finished!</p>
      <p>Player 1's Points {this.state.players[0].points}</p>
      <p>Player 2's Points {this.state.players[1].points}</p>
      <button id="reset" onClick={() => this.newGame()}> Reset </button>
      </div> : null}
          {cards}
          </div>
        <div className="controls">
          <p classname="description">*Cards made with help from ASEC*</p>
        </div>
       </div>

    );
  }
}
