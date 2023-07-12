
// You could be battling six alien ships each with unique values.
const TOTAL_ALIEN_SHIP = 6;

// Ship Properties
// hull is the same as hitpoints. If hull reaches 0or less, the ship is destroyed
// firepower is the amount of damage done to the hull of the target with a successful hit
// accuracy is the chance between 0 and 1 that the ship will hit its target

// Example use of accuracy to determine a hit:
// You attack the first alien ship
// If the ship survives, it attacks you
// If you survive, you attack the ship again
// If it survives, it attacks you again ... etc
// If you destroy the ship, you have the option to attack the next ship or to retreat
// If you retreat, the game is over, perhaps leaving the game open for further developments or options
// You win the game if you destroy all of the aliens
// You lose the game if you are destroyed


// human ship
class Ship {
    constructor() {
        this.hull = 20;
        this.firepower = 5;
        this.accuracy = 0.7;
    }

    // human attack alien
    static attack(alien, human) {

        console.log(`%c Attacked alien ship #${alien[0].num}!`, 'font-size: 16px; font-weight: 800');

        // hit!
        if (Math.random() < human.accuracy) {
            console.log(`%c Alien ship #${alien[0].num} have been hit! You have done ${human.firepower} damage!`, 'font-style: italic; background: azure; border: 1px solid grey;font-size: 16px;');
            alien[0].hull -= human.firepower;

            // success to destroy an alien ship
            if (alien[0].hull <= 0) {
                console.log(`%c Alien ship #${alien[0].num} was destroyed!`, 'font-size: 16px;color: blue');
                // remove the destroyed alien ship from the alien ship array
                alien.shift();

                // still alien ship remains..
                if (alien.length > 0) {
                    console.log(`%c Alien has ${alien.length} alien ship(s) remaining.`, 'font-size: 16px;color: fuchsia');

                    // ask whether attack next alien ship or retreat
                    let text = `You destroyed ${TOTAL_ALIEN_SHIP - alien.length} ship(s) so far. Do you want to attack next alien ship?`;

                    // attack next alien ship
                    if (confirm(text) == true) {
                        Ship.attack(alien, human);

                    // Retreat : game over
                    } else {
                        console.log('%c Retreat!', 'font-size: 30px; font-weight: 800; color: grey');
                        console.log('%c Game Over!', 'font-size: 50px; color: red');
                    }

                // all alien ship destroyed : you won
                } else {
                    console.log(`%c All alien ships were destroyed!`, 'font-size: 16px; background-color: orange;');
                    console.log(`%c YOU WON!`, 'font-size: 50px; color: green;');
                }
            } else {

                // still alien ship remains : alien will counteratack
                if (alien.length > 0) {
                    // counterattack
                    Alien.counterAttack(alien, human);
                }
            }

        // missed alien
        } else {
            console.log(`%c You missed it!`, 'font-size: 16px;color: red');

            // alien attack back
            Alien.counterAttack(alien, human);
        }
    }
}


// Alien ship
class Alien {
    constructor() {
        this.num = 0;
        // hull - between 3and 6
        this.hull = Math.floor(Math.random() * 4) + 3;
        // firepower - between 2and 4
        this.firepower = Math.floor(Math.random() * 3) + 2;
        // accuracy - between .6and .8
        this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
    }

    // alien attack human
    static counterAttack(alien, human) {
        // hit!
        if (Math.random() < alien[0].accuracy) {
            human.hull -= alien[0].firepower;

            console.log(`%c They are attacking you!`, 'font-size: 16px; color: #ad00c8');
            console.log(`%c You got ${alien[0].firepower} damage! You have ${human.hull} hull now.`, 'font-style: italic; background: lightpink; border: 1px solid red;font-size: 16px;');

            // human attack alien when human still alive
            if (human.hull > 0) {
                Ship.attack(alien, human);
            
            // human ship destroyed : game over
            } else {
                console.log('%c Game Over', 'font-size: 50px; color: red');
            }

        // missed human
        } else {
            console.log(`%c They fail to attack you!`, 'font-size: 16px; color:green');
            // human attack back
            Ship.attack(alien, human);
        }
    }
}

// Start game : game starts when click "Start Game" button
document.getElementById('start').addEventListener('click', e => {

    // generate 6 random alien ships and save to the alien_ships as array
    let alien_ships = [];
    for (let i = 0; i < TOTAL_ALIEN_SHIP; i++) {
        let alien = new Alien();
        alien.num = i + 1;
        alien_ships.push(alien);
    }

    // init human ship
    let USS_Assembly = new Ship();

    // show "start game" in console
    console.log('%c Start Game!', 'background-color:navy; color: white; font-size: 24px;')

    // human attack alien first
    Ship.attack(alien_ships, USS_Assembly);
});