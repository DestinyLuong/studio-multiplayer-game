import GameComponent from '../../GameComponent.js';
import React from 'react';
import UserApi from '../../UserApi.js'

export default class MemoryMatch extends GameComponent {
  newGame(){
      var gameData = {
        cards: {
            cardIndex: [],  
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

