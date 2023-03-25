const arrCount = (arr, val) => {
	return arr.filter(x => x === val).length;
}

const allEqual = arr => arr.every( v => v === arr[0] )

const sumArr = arr => arr.reduce((partialSum, a) => partialSum + a, 0)

const diceRun = (dice, len) => {
	for (let i = 1; i <= 6; i++) {
		if (arrCount(dice, i) >= len) {
			return true;
		}
	}

	return false;
}

export default class ScoreTable {
	constructor() {
		this.fields = {
			ones: null,
			twos: null,
			threes: null,
			fours: null,
			fives: null,
			sixes: null,
			threeOAK: null,
			fourOAK: null,
			fullHouse: null,
			smallStraight: null,
			largeStraight: null,
			yahtzee: null,
			chance: null,
		};

		this.yahtzeeBonus = null;
	}

	isFilled(field) {
		return (field !== null);
	}

	calcScore(field, dice) {
		switch (field) {
			case 'ones':
				return arrCount(dice, 1) * 1;
			case 'twos':
				return arrCount(dice, 2) * 2;
			case 'threes':
				return arrCount(dice, 3) * 3;
			case 'fours':
				return arrCount(dice, 4) * 4;
			case 'fives':
				return arrCount(dice, 5) * 5;
			case 'sixes':
				return arrCount(dice, 6) * 6;
			case 'threeOAK':
				if (diceRun(dice, 3)) {
					return sumArr(dice);
				}
				return 0;
			case 'fourOAK':
				if (diceRun(dice, 4)) {
					return sumArr(dice);
				}
				return 0;
			case 'fullHouse':
				if (
					(arrCount(dice, 1) === 2 && arrCount(dice, 2) === 3) ||
					(arrCount(dice, 1) === 2 && arrCount(dice, 3) === 3) ||
					(arrCount(dice, 1) === 2 && arrCount(dice, 4) === 3) ||
					(arrCount(dice, 1) === 2 && arrCount(dice, 5) === 3) ||
					(arrCount(dice, 1) === 2 && arrCount(dice, 6) === 3) ||

					(arrCount(dice, 2) === 2 && arrCount(dice, 1) === 3) ||
					(arrCount(dice, 2) === 2 && arrCount(dice, 3) === 3) ||
					(arrCount(dice, 2) === 2 && arrCount(dice, 4) === 3) ||
					(arrCount(dice, 2) === 2 && arrCount(dice, 5) === 3) ||
					(arrCount(dice, 2) === 2 && arrCount(dice, 6) === 3) ||

					(arrCount(dice, 3) === 2 && arrCount(dice, 1) === 3) ||
					(arrCount(dice, 3) === 2 && arrCount(dice, 2) === 3) ||
					(arrCount(dice, 3) === 2 && arrCount(dice, 4) === 3) ||
					(arrCount(dice, 3) === 2 && arrCount(dice, 5) === 3) ||
					(arrCount(dice, 3) === 2 && arrCount(dice, 6) === 3) ||

					(arrCount(dice, 4) === 2 && arrCount(dice, 1) === 3) ||
					(arrCount(dice, 4) === 2 && arrCount(dice, 2) === 3) ||
					(arrCount(dice, 4) === 2 && arrCount(dice, 3) === 3) ||
					(arrCount(dice, 4) === 2 && arrCount(dice, 5) === 3) ||
					(arrCount(dice, 4) === 2 && arrCount(dice, 6) === 3) ||

					(arrCount(dice, 5) === 2 && arrCount(dice, 1) === 3) ||
					(arrCount(dice, 5) === 2 && arrCount(dice, 2) === 3) ||
					(arrCount(dice, 5) === 2 && arrCount(dice, 3) === 3) ||
					(arrCount(dice, 5) === 2 && arrCount(dice, 4) === 3) ||
					(arrCount(dice, 5) === 2 && arrCount(dice, 6) === 3) ||

					(arrCount(dice, 6) === 2 && arrCount(dice, 1) === 3) ||
					(arrCount(dice, 6) === 2 && arrCount(dice, 2) === 3) ||
					(arrCount(dice, 6) === 2 && arrCount(dice, 3) === 3) ||
					(arrCount(dice, 6) === 2 && arrCount(dice, 4) === 3) ||
					(arrCount(dice, 6) === 2 && arrCount(dice, 5) === 3)
				) {
					return 25;
				}
				return 0;
			case 'smallStraight':
				if (
					(
						dice.includes(1) &&
						dice.includes(2) &&
						dice.includes(3) &&
						dice.includes(4)
					) || (
						dice.includes(2) &&
						dice.includes(3) &&
						dice.includes(4) &&
						dice.includes(5)
					) || (
						dice.includes(3) &&
						dice.includes(4) &&
						dice.includes(5) &&
						dice.includes(6)
					)
				) {
					return 40;
				}
				return 0;
			case 'largeStraight':
				if (
					(
						dice.includes(1) &&
						dice.includes(2) &&
						dice.includes(3) &&
						dice.includes(4) &&
						dice.includes(5)
					) || (
						dice.includes(2) &&
						dice.includes(3) &&
						dice.includes(4) &&
						dice.includes(5) &&
						dice.includes(6)
					)
				) {
					return 40;
				}
				return 0;
			case 'yahtzee':
				if (allEqual(dice)) {
					return 50;
				}
				return 0;
			case 'chance':
				return sumArr(dice);
		}

		return 0;
	}

	setScore(field, dice) {
		if (this.fields[field] !== null) return;

		const score = this.calcScore(field, dice);
		const yahtScore = this.calcScore('yahtzee', dice);

		if (yahtScore > 0) {
			if (field === 'yahtzee') {
				if (this.yahtzeeBonus == null) {
					this.yahtzeeBonus = 0;
				}
			} else {
				if (this.yahtzeeBonus != null) {
					this.yahtzeeBonus += 100;
				}
			}
		}

		this.fields[field] == score;
	}

	getLeftSideBonus() {
		if (
			this.fields['ones'] +
			this.fields['twos'] +
			this.fields['threes'] +
			this.fields['fours'] +
			this.fields['fives'] +
			this.fields['sixes'] >= 63
		) {
			return 35;
		}

		return 0;
	}

	getTotalScore() {
		return (
			this.fields['ones'] +
			this.fields['twos'] +
			this.fields['threes'] +
			this.fields['fours'] +
			this.fields['fives'] +
			this.fields['sixes'] +
			this.fields['threeOAK'] +
			this.fields['fourOAK'] +
			this.fields['fullHouse'] +
			this.fields['smallStraight'] +
			this.fields['largeStraight'] +
			this.fields['yahtzee'] +
			this.fields['chance'] +
			this.getLeftSideBonus() +
			this.yahtzeeBonus
		)
	}
}