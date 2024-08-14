function solve(input) {
    const numCharacters = Number(input.shift());
    const gunners = {};

    // Prepare input
    for(let i = 0; i < numCharacters; i++) {
        const gunnerInfo = input.shift();
        const [name, hp, bullets] = gunnerInfo.split(' ');

        gunners[name] = {
            hp: Number(hp),
            bullets: Number(bullets),
        };
    }

    // Execute commands
    let commandLine = input.shift();
    while(commandLine != "Ride Off Into Sunset") {
        const [command, name, firstArg, secondArg] = commandLine.split(' - ');
        const currGunner = gunners[name];
        let target, damage, attacker, amount;

        switch(command) {
            case "FireShot":
                target = firstArg;
                if(currGunner.bullets > 0) {
                    currGunner.bullets -= 1;
                    console.log(`${name} has successfully hit ${target} and now has ${currGunner.bullets} bullets!`);
                } else {
                    console.log(`${name} doesn't have enough bullets to shoot at ${target}!`);
                }
                break;
            case "TakeHit":
                damage = Number(firstArg);
                attacker = secondArg;
                currGunner.hp -= damage;
                if(currGunner.hp > 0) {
                    console.log(`${name} took a hit for ${damage} HP from ${attacker} and now has ${currGunner.hp} HP!`);
                } else {
                    delete gunners[name];
                    console.log(`${name} was gunned down by ${attacker}!`);
                }
                break;
            case "Reload":
                if(currGunner.bullets < 6) {
                    console.log(`${name} reloaded ${6 - currGunner.bullets} bullets!`);
                    currGunner.bullets = 6;
                } else {
                    console.log(`${name}'s pistol is fully loaded!`);
                }
                break;
            case "PatchUp":
                amount = Number(firstArg);
                if(currGunner.hp === 100) {
                    console.log(`${name} is in full health!`);
                } else {
                    currGunner.hp =  currGunner.hp + amount;
                    if(currGunner.hp >= 100) {
                        currGunner.hp = 100;
                    }
                    console.log(`${name} patched up and recovered ${amount} HP!`);
                }
                break;
        }

        commandLine = input.shift();
    }

    // Output
    for(const gunner in gunners) {
        console.log(`${gunner}`);
        console.log(` HP: ${gunners[gunner].hp}`);
        console.log(` Bullets: ${gunners[gunner].bullets}`);
    }
}

solve (["2",
    "Gus 100 0",
    "Walt 100 6",
    "TakeHit - Gus - 80 - Bandit",
    "PatchUp - Gus - 20" ,
    "Ride Off Into Sunset"]
);

solve (["2",
    "Gus 100 0",
    "Walt 100 6",
    "FireShot - Gus - Bandit",
    "TakeHit - Gus - 100 - Bandit",
    "Reload - Walt",
    "Ride Off Into Sunset"]
);

solve (["2",
    "Jesse 100 4",
    "Walt 100 5",
    "FireShot - Jesse - Bandit",
     "TakeHit - Walt - 30 - Bandit",
     "PatchUp - Walt - 20" ,
     "Reload - Jesse",
     "Ride Off Into Sunset"]
);

solve(["2",
    "Gus 100 4",
    "Walt 100 5",
    "FireShot - Gus - Bandit",
    "TakeHit - Walt - 100 - Bandit",
    "Reload - Gus",
    "Ride Off Into Sunset"]
);