class Player
{
    constructor(name, score, roll, id, die, want_to_roll)
    {
        this.name = name
        this.score = score
        this.roll = roll
        this.id = id
        this.die = die
        this.want_to_roll = want_to_roll
        this.game_manager(roll, die, score)
    }

    roll_calculator(die)
    {
        let current_rolls = []
        let count = 0
        while(count < die[0])
        {
            let random_num = Math.floor(Math.random() * die[1] - 1)
            current_rolls.push(random_num)
        }
        return current_rolls
    }
    score_calculator(current_rolls)
    {
        
    }
    game_manager(roll, die, score, want_to_roll)
    {
        
    }
    
}