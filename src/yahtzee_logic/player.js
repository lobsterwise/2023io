class Player
{
    constructor(score, roll, id, dice)
    {
        this.score = score;
        this.roll = roll;
        this.id = id;
        this.dice = dice; //will be in form of [number of die, sides on die]
    }

    roll_calculator(dice)
    {
        //die should be in the form of [number of dice, amount of sides on die]
        let current_rolls = [];
        let count = 0;
        while(count < dice[0])
        {
            let random_num = Math.floor(Math.random() * dice[1] - 1);
            current_rolls.push(random_num);
        }
        return current_rolls;
    }
    score_calculator(current_rolls)
    {
        
    }
    hold_rolls(current_rolls, die_type)
    {
        let rolls_to_hold = [3, 4]; //array of the ids of die that you want to hold ie: die number 3 and 4
        let dice_to_keep = [];
        let die = [rolls_to_hold.length, die_type];
        for(let x in rolls_to_hold);
        {
            for(let y in current_rolls)
            {
                if (!rolls_to_hold[x] == y)
                {
                    dice_to_keep.push[current_rolls];
                }
            }
        }
        return die, dice_to_keep;
    }
    game_manager(roll, die, score, want_to_roll)
    {
        if(roll == 1)
        {
            current_rolls = this.roll_calculator(dice);
        }
        if(roll < 3 && want_to_roll == true)
        {
            this.score_calculator(current_rolls);
            die, current_rolls = this.hold_rolls(current_rolls, die[die.length - 1]);
            return die, current_rolls;
        }
    }
    
}

export default Player;