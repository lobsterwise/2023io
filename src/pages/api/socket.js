import { Server } from "socket.io";

const SocketHandler = (req, res) => {
	if (!res.socket.server.io) {
		console.log("Starting Websocket...");
		const io = new Server(res.socket.server);
		res.socket.server.io = io;
	}

	// if (!res.)

	res.end();
};

export default SocketHandler;
