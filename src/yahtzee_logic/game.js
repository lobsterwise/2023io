//This class manages all of the player's actions and each round of the game

class Game
{
    constructor(player_ids)
    {
        this.player_ids = player_ids; //this is an array of player ids
        this.turn = 0;
        

    }
    handle_turn(player_id)
    {

    }
    //this function manages each individual turn and each of the player's actions
    turn_manager(player_ids)
    {
        //loop through all of the players
        for(let i in player_ids)
        {
            this.handle_turn(player_ids[i]);
        }
        this.turn++;
    }
}

export default Game;


//delete before presenting:

//what this class needs to do:
//
//what this class needs to take in:
//player ids
//what this class needs to return:
//