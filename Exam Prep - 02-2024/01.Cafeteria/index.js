function solve(input) {
    const countBarista = Number(input.shift());
    const team = {};

    // Prepare input
    for (let i = 0; i < countBarista; i++) {
        const [name, shift, coffeeTypes] = input[i].split(' ');
        team[name] = {
            shift,
            coffeeTypes: coffeeTypes.split(','),
        }
    }

    // Execute command
    let commandLine = input.shift();
    while(commandLine != 'Closed')
    {
        const [command, name, firstArg, secondArg] = commandLine.split(' / ');
        const barista = team[name];
        let shift, coffeeType;

        switch (command) {
            case 'Prepare':
                shift = firstArg;
                coffeeType = secondArg;
                if(barista.shift === shift && barista.coffeeTypes.includes(coffeeType)) {
                    console.log(`${name} has prepared a ${coffeeType} for you!`);
                } else {
                    console.log(`${name} is not available to prepare a ${coffeeType}.`);
                }            
                break;
            case 'Change Shift':
                shift = firstArg;
                barista.shift = shift;
                console.log(`${name} has updated his shift to: ${shift}`);
                break;
            case 'Learn':
                coffeeType = firstArg;
                if(barista.coffeeTypes.includes(coffeeType)) {
                    console.log(`${name} knows how to make ${coffeeType}.`);
                } else {
                    console.log(`${name} has learned a new coffee type: ${coffeeType}.`)
                }
                break;
        }
        commandLine = input.shift();
    }

    for (const baristaName in team) {
        console.log(`Barista: ${baristaName}, Shift: ${team[baristaName].shift}, Drinks: ${team[baristaName].coffeeTypes.join(', ')}`);
    }
}
solve([
    '3',
      'Alice day Espresso,Cappuccino',
      'Bob night Latte,Mocha',
      'Carol day Americano,Mocha',
      'Prepare / Alice / day / Espresso',
      'Change Shift / Bob / night',
      'Learn / Carol / Latte',
      'Learn / Bob / Latte',
      'Prepare / Bob / night / Latte',
      'Closed']
    );


// Helper:
// 1) Terminal: node index.js
// Run === Ctrl + f5
// console.log(`${name}`) -- ` ` ` ` ` ` ` ` ` `