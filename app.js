
// You could be battling six alien ships each with unique values.

// Ship Properties
// hull is the same as hitpoints. If hull reaches 0or less, the ship is destroyed
// firepower is the amount of damage done to the hull of the target with a successful hit
// accuracy is the chance between 0 and 1 that the ship will hit its target

class Ship {
    constructor() {
        this.hull = 0;
        this.firepower = 0;
        this.accuracy = 0;
    }
    
}

// Space ship
class Human extends Ship {
    constructor() {
        this.hull = 20;
        this.firepower = 5;
        this.accuracy = 0.7;
    }

    ussAssembly (target) {
        
    }
}

// Alien ship
class Alien extends Ship {
    constructor() {
        // hull - between 3and 6
        this.hull = Math.floor(Math.random() * 4) + 3;
        // firepower - between 2and 4
        this.firepower = Math.floor(Math.random() * 3) + 2;
        // accuracy - between .6and .8
        this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
    }
}

const game = {

};

// Start game
document.getElementById('start').addEventListener('click', e => {
    let alien_ships = []; 

    for (let i=0; i < 6; i++) {
        alien_ships.push(new Alien());
    }

    console.log(alien_ships);
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