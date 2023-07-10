
// You could be battling six alien ships each with unique values.

// Ship Properties
// hull is the same as hitpoints. If hull reaches 0or less, the ship is destroyed
// firepower is the amount of damage done to the hull of the target with a successful hit
// accuracy is the chance between 0 and 1 that the ship will hit its target


class Ship {
    constructor() {
        this.human = true;
        this.hull = 20;
        this.firepower = 5;
        this.accuracy = 0.7;
    }

    checkWin(target) {
        // alien ship 
        if (target.hull <=0) {
            console.log(`Alien ship #${target.num} was destroyed!`);
            console.log(`Alien has ${6-target.num} hull remaining.`);
        }
    }

    loseGame() {
        console.log(`You retreated!`);
    }

    attack(target) {
        // attacking alien
        if (!target[0].human) {
            let text = `Attack alien ship #${target[0].num}?`;
            if (confirm(text) == true) {
                console.log(`Attacked alien ship #${target[0].num}!`);

                // hit!
                if (Math.random() < this.accuracy) {
                    console.log(`Alien ship #${target[0].num} have been hit!`);
                    console.log(`%c You have done ${this.firepower} damage!`, 'font-style: italic; background: azure; border: 1px solid grey;');
                    target[0].hull -= this.firepower;

                    // check win
                    this.checkWin(target);

                    // alien is attacking back
                    this.attack(target);
                }
            // Retreat : game over
            } else {
                console.log("Retreat!");
                console.log("Game Over", 'font-size:24x;color:red;');
            }
        } else {
        // attacked 
            if (Math.random() < target[0].accuracy) {
                this.hull -= target[0].firepower;
                console.log(`You have been HIT!`, 'font-size:20px;color:red;');
            }

        }
    }
}

// Space ship
class Human extends Ship {
    constructor() {
        super();
    }

    ussAssembly(target) {

        this.attack(target);

    }


}

// Alien ship
class Alien extends Ship {
    constructor() {
        super();
        this.human = false;
        this.num = 0;
        // hull - between 3and 6
        this.hull = Math.floor(Math.random() * 4) + 3;
        // firepower - between 2and 4
        this.firepower = Math.floor(Math.random() * 3) + 2;
        // accuracy - between .6and .8
        this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
    }
}



// Start game
document.getElementById('start').addEventListener('click', e => {
    // generate 6 random alien ships
    let alien_ships = [];
    for (let i = 0; i < 6; i++) {
        let alien = new Alien();
        alien.num = i + 1;
        alien_ships.push(alien);
    }
    console.log(alien_ships);

    // init human ship
    let human_ship = new Human();
    console.log(human_ship);
    human_ship.attack(alien_ships);


});

// Example use of accuracy to determine a hit:

// You attack the first alien ship

// If the ship survives, it attacks you

// If you survive, you attack the ship again

// If it survives, it attacks you again ... etc

// If you destroy the ship, you have the option to attack the next ship or to retreat

// If you retreat, the game is over, perhaps leaving the game open for further developments or options

// You win the game if you destroy all of the aliens

// You lose the game if you are destroyed