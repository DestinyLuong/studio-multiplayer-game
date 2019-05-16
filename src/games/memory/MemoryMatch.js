import GameComponent from '../../GameComponent.js';
import React from 'react';
import UserApi from '../../UserApi.js'

export default class MemoryMatch extends GameComponent {
    constructor(props){
        super(props);
        this.state = {
                turn: "player1",
                cards: {
                    cardsValue: ["cake", "dog", "cake", "pen", "pen", "dog"],  
                    cardsFlipped: [false, false, false, false, false, false],
                },
                players:{
                      player1:{
                        id: this.getSessionCreatorUserId(),
                        cardsClicked: 0,
                        points: 0,
                      }, 
                      player2:{
                        id:  this.getSessionUserIds(),
                        cardsClicked: 0,
                        points: 0,
                    }, 
              }
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
    userAction(){
        //user clicks cards
       
      
    }
    stopClick(){
        var buttons = this.state.cardsValue.map((state, i) => (
        <button
            disabled={!this.isMyTurn() || state !== "gone"}
            onClick={() => this.handleButtonClick(i)}>
          {state}
        </button>
        ));
    }
   /* cardsClicked(){
        if(cardsFlipped === 2){
            this.state.turn = data.currentplayer;
        }
    }*/
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
  var displayCard = this.state.cards.cardsValue.map((cardName, index) => {
    if(this.state.cardsFlipped[index]){
      return cardName;
    }
  return "";
  });
  var buttons = cardDisplay.map((name, i) =>(
    <button onClick={this.handleButtonClick(i)}>{name}</button>
  ));

     
    return (
    //    <div>
    //      <p>Session ID: {id}</p>
    //      <p>Session creator: {creatorId}</p>
    //      <p>Session users:</p>
    //      <p>User name: {userName}</p>
    //      <p>Photo URL:{UserApi.getPhotoUrl()} </p>
    //      <p>User sign in: {UserApi.getLastSignIn()}</p>
    //      <ul>
    //        {users}
    //      </ul>
    //    </div>
       <div id="game">
        <button id="0" onClick={this.userAction(this.id)}> Back </button>
        <button id="1" onClick={this.userAction(this.id)}> Back </button>
        <button id="2" onClick={this.userAction(this.id)}> Back </button>
        <button id="3" onClick={this.userAction(this.id)}> Back </button>
        <button id="4" onClick={this.userAction(this.id)}> Back </button>
        <button id="5" onClick={this.userAction(this.id)}> Back </button>
        <button id= "reset" onClick={this.newGame()}> Reset </button>
       </div>

    );
  }
}


