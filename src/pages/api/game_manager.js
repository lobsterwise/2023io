import { Server } from "socket.io";
import Game from "../../yahtzee_logic/game";

class ManagedGame {
	constructor(id) {
		this.id = id;
		this.io = new Server();
		this.game = null;
		this.joining_players = [];
	}

	isStarted() {
		return (this.game !== null);
	}

	start() {
		this.game = new Game(this.joining_players);
		this.joining_players = [];
	}

	addPlayer(id) {
		this.joining_players.push(id);
	}
}

class GameManager {
	constructor() {
		this.games = [];
	}
}

export default function handler(req, res) {
	if (!res.game) {
		let game = new ManagedGame(req.id);
		res.status(200)
		res.game = game;
	}
}
