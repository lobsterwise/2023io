import { Server } from "socket.io";
import Game from "../../yahtzee_logic/game";
import { getSession } from "../../lib/getSession";
import Player from "../../yahtzee_logic/player";

class ManagedGame {
	id: string;
	game: Game;
	players: Player[];
	constructor(id: string) {
		this.id = id;
		this.game = null;
		this.players = [];
	}

	isStarted(): boolean {
		return (this.game !== null);
	}

	start() {
		console.log("Starting with players " + this.players[0].name + " " + this.players[1].name);
		this.game = new Game([], this.players);
		this.players = [];
	}

	addPlayer(name: string, id:string) {
		this.players.push(new Player(name, this.players.length, id));
	}

	removePlayer(id: string) {
		let indexOfPlayer = this.players.map(e => e.id).indexOf(id)
		if (indexOfPlayer > -1) {
			const player = this.players[indexOfPlayer];
			console.log(`Removed ${player.name} (${player.id})`)
			this.players.splice(indexOfPlayer, 1)
		} else {
			console.log(`Unable to remove ${id}`)
		}
	}
}

export default async function handler(req: any, res: any) {
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
					score.getTotalScore(),
				);
			};

			const startGame = () => {
				session.game.start();
				console.log("Game started");
				socket.broadcast.emit('both-players', session.game.players[0], session.game.players[1]);
			};

			socket.on('player-join', (name) => {
				socket.broadcast.emit('player-join', name);
				session.game.addPlayer(name, socket.id);
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
				session.game.game.rollDice();

				console.log("Player " + name + " has rolled the die");
				socket.emit('update-dice', session.game.game.currentPlayer, session.game.game.playerGetDice());
			});

			socket.once("disconnect", reason => {
				session.game.removePlayer(socket.id);
				socket.emit('players', session.game.players)
			})

			socket.on('hold', die => {
				console.log("Player has held die number " + die);
				if (!session.game.isStarted()) return;
				session.game.game.toggleHeld(die);

				socket.emit('update-dice', session.game.game.currentPlayer, session.game.game.playerGetDice());
			});

			socket.on('put-score', field => {
				session.game.game.playerPutScore(field);
				updateScore();
			});
		});

		res.socket.server.io = io;
	}

	if (session.game.players.toString === "[]") {
		await session.destroy();
	}

	res.end();
}
