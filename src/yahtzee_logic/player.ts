import ScoreTable from "./score";

class Player {
	name: string;
	scores: ScoreTable;
	id: string;
	index: number;

	constructor(name: string, index: number, id : string) {
		this.name = name;
		this.index = index;
		this.id = id;
		this.scores = new ScoreTable();
	}
}

export default Player;
