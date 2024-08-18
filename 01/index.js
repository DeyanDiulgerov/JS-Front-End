function solve(input) {
    const numberHeroes = Number(input.shift());
    const heroes = {};

    // Prepare input
    for(let i = 0; i < numberHeroes; i++) {
        const [name, powers, energy] =  input[i].split('-');
        heroes[name] = {
            powers: powers.split(','),
            energy: Number(energy),
        }
    }

    // Execute commands
    let commandLine = input.shift();
    while(commandLine != "Evil Defeated!") {
        const [command, name, firstArg, secondArg] = commandLine.split(' * ');
        const hero = heroes[name];
        let power, energyReq, trainingEnergy, newPower;

        switch(command) {
            case "Use Power":
                power = firstArg;
                energyReq = secondArg;
                if(hero.powers.includes(power) && hero.energy >= energyReq) {
                    hero.energy -= Number(energyReq);
                    console.log(`${name} has used ${power} and now has ${hero.energy} energy!`);
                } else {
                    console.log(`${name} is unable to use ${power} or lacks energy!`);
                }
                break;
            case "Train":
                trainingEnergy = firstArg;
                if(hero.energy < 100) {
                    let testEnergy = 100 - hero.energy;
                    hero.energy += Number(trainingEnergy);
                    if(hero.energy > 100) {
                        console.log(`${name} has trained and gained ${testEnergy} energy!`);
                        hero.energy = 100;
                    } else {
                        console.log(`${name} has trained and gained ${trainingEnergy} energy!`);
                    }
                } else {
                    console.log(`${name} is already at full energy!`);
                }
                break;
            case "Learn":
                newPower = firstArg;
                if(hero.powers.includes(newPower)) {
                    console.log(`${name} already knows ${newPower}.`);
                } else {
                    console.log(`${name} has learned ${newPower}!`);
                    hero.powers.push(newPower);
                }
                break;
        }
        commandLine = input.shift();
    }

    for (const hero in heroes) {
        console.log(`Superhero: ${hero}`);
        console.log(`- Superpowers: ${heroes[hero].powers.join(', ')}`);
        console.log(`- Energy: ${heroes[hero].energy}`);
    }
}

solve ([
        "3",
        "Iron Man-Repulsor Beams,Flight-80",
        "Thor-Lightning Strike,Hammer Throw-10",
        "Hulk-Super Strength-60",
        "Use Power * Iron Man * Flight * 30",
        "Train * Thor * 20",
        "Train * Hulk * 50",
        "Learn * Hulk * Thunderclap",
        "Use Power * Hulk * Thunderclap * 70",
        "Evil Defeated!"
    ]
);


solve ([
        "2",
        "Iron Man-Repulsor Beams,Flight-20",
        "Thor-Lightning Strike,Hammer Throw-100",
        "Train * Thor * 20",
        "Use Power * Iron Man * Repulsor Beams * 30",
        "Evil Defeated!"
    ]
);

solve ([
        "2",
        "Iron Man-Repulsor Beams,Flight-100",
        "Thor-Lightning Strike,Hammer Throw-50",
        "Train * Thor * 20",
        "Learn * Thor * Hammer Throw",
        "Use Power * Iron Man * Repulsor Beams * 30",
        "Evil Defeated!"
    ]
);