import Die, { diceIncludes } from "./die";

function dieCount(arr: Die[], val: number): number {
	return arr.filter(die => die.value === val).length;
}

function allEqual<T>(arr: T[]): boolean {
	return arr.every( v => v === arr[0] );
}

function sumDice(dice: Die[]): number {
	return dice.reduce((partialSum, die) => partialSum + die.value, 0);
}

function diceRun(dice: Die[], len: number): boolean {
	for (let i = 1; i <= 6; i++) {
		if (dieCount(dice, i) >= len) {
			return true;
		}
	}

	return false;
}

export interface ScoreFields {
	ones: number | null;
	twos: number | null;
	threes: number | null;
	fours: number | null;
	fives: number | null;
	sixes: number | null;
	threeOAK: number | null;
	fourOAK: number | null;
	fullHouse: number | null;
	smallStraight: number | null;
	largeStraight: number | null;
	yahtzee: number | null;
	chance: number | null;
}

export default class ScoreTable {
	fields: ScoreFields;
	yahtzeeBonus: number | null;

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

	isFilled(field: string) {
		return (this.fields[field] !== null);
	}

	calcScore(field: string, dice: Die[]): number {
		switch (field) {
			case 'ones':
				return dieCount(dice, 1) * 1;
			case 'twos':
				return dieCount(dice, 2) * 2;
			case 'threes':
				return dieCount(dice, 3) * 3;
			case 'fours':
				return dieCount(dice, 4) * 4;
			case 'fives':
				return dieCount(dice, 5) * 5;
			case 'sixes':
				return dieCount(dice, 6) * 6;
			case 'threeOAK':
				if (diceRun(dice, 3)) {
					return sumDice(dice);
				}
				return 0;
			case 'fourOAK':
				if (diceRun(dice, 4)) {
					return sumDice(dice);
				}
				return 0;
			case 'fullHouse':
				if (
					(dieCount(dice, 1) === 2 && dieCount(dice, 2) === 3) ||
					(dieCount(dice, 1) === 2 && dieCount(dice, 3) === 3) ||
					(dieCount(dice, 1) === 2 && dieCount(dice, 4) === 3) ||
					(dieCount(dice, 1) === 2 && dieCount(dice, 5) === 3) ||
					(dieCount(dice, 1) === 2 && dieCount(dice, 6) === 3) ||

					(dieCount(dice, 2) === 2 && dieCount(dice, 1) === 3) ||
					(dieCount(dice, 2) === 2 && dieCount(dice, 3) === 3) ||
					(dieCount(dice, 2) === 2 && dieCount(dice, 4) === 3) ||
					(dieCount(dice, 2) === 2 && dieCount(dice, 5) === 3) ||
					(dieCount(dice, 2) === 2 && dieCount(dice, 6) === 3) ||

					(dieCount(dice, 3) === 2 && dieCount(dice, 1) === 3) ||
					(dieCount(dice, 3) === 2 && dieCount(dice, 2) === 3) ||
					(dieCount(dice, 3) === 2 && dieCount(dice, 4) === 3) ||
					(dieCount(dice, 3) === 2 && dieCount(dice, 5) === 3) ||
					(dieCount(dice, 3) === 2 && dieCount(dice, 6) === 3) ||

					(dieCount(dice, 4) === 2 && dieCount(dice, 1) === 3) ||
					(dieCount(dice, 4) === 2 && dieCount(dice, 2) === 3) ||
					(dieCount(dice, 4) === 2 && dieCount(dice, 3) === 3) ||
					(dieCount(dice, 4) === 2 && dieCount(dice, 5) === 3) ||
					(dieCount(dice, 4) === 2 && dieCount(dice, 6) === 3) ||

					(dieCount(dice, 5) === 2 && dieCount(dice, 1) === 3) ||
					(dieCount(dice, 5) === 2 && dieCount(dice, 2) === 3) ||
					(dieCount(dice, 5) === 2 && dieCount(dice, 3) === 3) ||
					(dieCount(dice, 5) === 2 && dieCount(dice, 4) === 3) ||
					(dieCount(dice, 5) === 2 && dieCount(dice, 6) === 3) ||

					(dieCount(dice, 6) === 2 && dieCount(dice, 1) === 3) ||
					(dieCount(dice, 6) === 2 && dieCount(dice, 2) === 3) ||
					(dieCount(dice, 6) === 2 && dieCount(dice, 3) === 3) ||
					(dieCount(dice, 6) === 2 && dieCount(dice, 4) === 3) ||
					(dieCount(dice, 6) === 2 && dieCount(dice, 5) === 3)
				) {
					return 25;
				}
				return 0;
			case 'smallStraight':
				if (
					(
						diceIncludes(dice, 1) &&
						diceIncludes(dice, 2) &&
						diceIncludes(dice, 3) &&
						diceIncludes(dice, 4)
					) || (
						diceIncludes(dice, 2) &&
						diceIncludes(dice, 3) &&
						diceIncludes(dice, 4) &&
						diceIncludes(dice, 5)
					) || (
						diceIncludes(dice, 3) &&
						diceIncludes(dice, 4) &&
						diceIncludes(dice, 5) &&
						diceIncludes(dice, 6)
					)
				) {
					return 40;
				}
				return 0;
			case 'largeStraight':
				if (
					(
						diceIncludes(dice, 1) &&
						diceIncludes(dice, 2) &&
						diceIncludes(dice, 3) &&
						diceIncludes(dice, 4) &&
						diceIncludes(dice, 5)
					) || (
						diceIncludes(dice, 2) &&
						diceIncludes(dice, 3) &&
						diceIncludes(dice, 4) &&
						diceIncludes(dice, 5) &&
						diceIncludes(dice, 6)
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
				return sumDice(dice);
		}

		return 0;
	}

	setScore(field: string, dice: Die[]) {
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

	getLeftSideBonus(): number {
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

	getTotalScore(): number {
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
		);
	}
}
