import Die, { makeDice } from "./die";
import Player from "./player";

class Game {
	dice: Die[];
	players: Player[];
	currentPlayer: number;
	currentRoll: number;

	constructor(dice: Die[], players: Player[]) {
		this.dice = dice;
		this.players = players;
		this.currentPlayer = 0;
		this.currentRoll = 0;
	}

	rollDice() {
		// You only get 3 rolls
		if (this.currentRoll > 2) return;
		this.dice.forEach(die => {
			if (die.held) return;
			let random_num = Math.floor(Math.random() * 5) + 1;
			die.value = random_num;
		});
	}

	getPlayers() {
		return this.players;
	}

	toggleHeld(die: number) {
		this.dice[die].held = !this.dice[die].held;
	}

	getScores() {
		let player = this.players[this.currentPlayer];
		return player.scores;
	}

	// Returns false if a field is already filled
	playerPutScore(field: string): boolean {
		let player = this.players[this.currentPlayer];
		if (player.scores.isFilled(field)) {
			return false;
		}
		player.scores.setScore(field, this.dice);

		this.currentRoll = 0;
		this.startNextTurn();

		return true;
	}

	startNextTurn() {
		this.currentPlayer++;
		if (this.currentPlayer > 1) {
			this.currentPlayer = 0;
		}
		this.currentRoll = 0;
		this.dice = makeDice(null, false);
	}
}
export default Game;
