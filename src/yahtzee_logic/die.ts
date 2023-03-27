export default interface Die {
	value: number | null,
	held: boolean,
}

export const makeDice = (value: number | null, held: boolean): Die[] => {
	return Array.apply(null, Array(5)).map(() => {
		return {
			value: value,
			held: held,
		};
	});
};

export function diceIncludes(dice: Die[], val: number | null): boolean {
	return (dice.find(die => die.value === val) != undefined);
}
