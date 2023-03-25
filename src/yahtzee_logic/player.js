import ScoreTable from "./score";

const makeDice = (len, val) => Array.apply(null, Array(len)).map(() => val);

class Player {
	constructor(id, dice) {
		this.id = id;
		this.dice = dice;
		this.held = makeDice(dice.length, false);
		this.score = new ScoreTable();
	}

	startTurn() {
		this.dice = makeDice(5, null);
		this.held = makeDice(5, false);
	}

	roll() {
		for (let i = 0; i < this.dice.length; i++) {
			if (this.held[i]) continue;
			let random_num = Math.floor(Math.random() * 5) + 1;
			this.dice[i] = random_num;
		}
	}

	toggle_held(die) {
		this.held[die] = !this.held[die];
	}

	get_dice() {
		return this.dice, this.held;
	}
}

export default Player;
