//This class manages all of the player's actions and each round of the game
//const player = new(Player)
import Player from "./player.js";

class Game {
    constructor(dice, players) {
		this.dice = dice;
        this.players = players.map(player => {
			return new Player(0, this.dice);
		});
		this.currentPlayer = 0;
		this.currentRoll = 0;
    }

    player_roll_die() {
		// You only get 3 rolls
		if (this.currentRoll > 2) return;
		let player = this.players[this.currentPlayer];
		player.roll();
    }

    player_toggle_held(die) {
		let player = this.players[this.currentPlayer];
        player.toggle_held(die);
    }

	player_get_dice() {
		let player = this.players[this.currentPlayer];
		return player.get_dice();
	}

	get_score() {
		let player = this.players[this.currentPlayer];
		return player.score;
	}

	// Returns false if a field is already filled
	player_put_score(field) {
		let player = this.players[this.currentPlayer];
		if (player.score.isFilled(field)) {
			return false;
		}
		player.score.setScore(field, player.dice);

		this.currentRoll = 0;
		this.handle_turns();

		return true;
	}

    handle_turns() {
		this.currentPlayer++;
		if (this.currentPlayer > 1) {
			this.currentPlayer = 0;
		}
		this.players[this.currentPlayer].startTurn();
    }
}
export default Game;
