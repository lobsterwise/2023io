import { Server } from "socket.io";
import Game from "../../yahtzee_logic/game";
import { getSession } from "@/lib/getSession";

class ManagedGame {
	constructor(id) {
		this.id = id;
		this.game = null;
		this.players = [];
	}

	isStarted() {
		return (this.game !== null);
	}

	start() {
		console.log("Starting with players " + this.players);
		this.game = new Game([], this.players);
		this.players = [];
	}

	addPlayer(name) {
		this.players.push(name);
	}
}

class GameManager {
	constructor() {
		this.games = {};
	}

	addGame(id) {
		if (this.games[id] == undefined) {
			this.games[id] = new ManagedGame(id);
		}
	}

	getGame(id) {
		if (this.games[id] == undefined) {
			this.addGame(id);
		} else {
			return this.games[id];
		}
	}
}

export default async function handler(req, res) {
	let session = await getSession(req, res);
	if (!session.game) {
		let game = new ManagedGame(req.id);
		session.game = game;
	}

	if (res.socket.server.io) {
	} else {
		console.log("Starting Websocket...");
		const io = new Server(res.socket.server);
		
		io.on('connection', socket => {
			socket.broadcast.emit('player-connect');
			
			const updateScore = () => {
				let score = session.game.game.get_score();
				const currentPlayer = session.game.game.currentPlayer;
				socket.emit(
					'update-score',
					currentPlayer,
					score.fields,
					score.getLeftSideBonus(),
					score.yahtzeeBonus,
					score.getTotalScore()
				);
			};

			const startGame = () => {
				session.game.start();
				console.log("Game started");
				socket.broadcast.emit('both-players', session.game.players[0], session.game.players[1]);
			}

			socket.on('player-join', (name) => {
				socket.broadcast.emit('player-join', name);
				session.game.addPlayer(name);
				console.log("Player " + name + " has joined");
				if (session.game.players.length >= 2) {
					startGame();
				} 
			});
			
			socket.on('start-game', () => {
				startGame();
			});

			socket.on('roll', name => {
				if (!session.game.isStarted()) return;
				session.game.game.player_roll_die();

				console.log("Player " + name + " has rolled the die");
				socket.emit('update-dice', session.game.game.currentPlayer, session.game.game.player_get_dice());
			});

			socket.on('hold', die => {
				if (!session.game.isStarted()) return;
				session.game.game.player_hold_die(die);

				socket.emit('update-dice', session.game.game.currentPlayer, session.game.game.player_get_dice());
			});

			socket.on('put-score', field => {
				session.game.game.player_put_score(field);
				updateScore();
			});
		});

		res.socket.server.io = io;
	}

	res.end();
}

// export const config = {
//   api: {
//     externalResolver: true,
//   },
// };
