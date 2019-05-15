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
                    cardsFlipped: [],
                },
                players:{
                      player1:{
                        id: this.getSessionCreatorUserId(),
                        cardsClicked: 0,
                        points: 0,
                      }, 
                      player2:{
                      //  id:  this.getOtherSessionUserId(),
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

  render(){
    var id = this.getSessionId();
    var users = this.getSessionUserIds().map((user_id) => (
      <li key={user_id}>{user_id}</li>
    ));
    var creatorId = UserApi.getName(this.getSessionCreatorUserId());
    var userName = this.getMyUserId();
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
        <button id="buttonOne"> back </button>
        <button id="buttonTwo"> back </button>
        <button id="buttonThree"> back </button>
        <button id="buttonFour"> back </button>
        <button id="buttonFive"> back </button>
        <button id="buttonSix"> back </button>
        <button id= "reset" onClick={this.newGame()}> Reset </button>
       </div>

    );
  }
}

