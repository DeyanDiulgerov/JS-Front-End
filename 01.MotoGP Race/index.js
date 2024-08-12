function solve(input) {
    const countRiders = Number(input.shift());
    const riders = {};

    // Prepare input
    for (let i = 0; i < countRiders; i++) {
        const riderLine = input.shift();
        const [name, fuel, position] = riderLine.split('|');

        riders[name] = {
            fuel: Number(fuel),
            position: Number(position)
        };
    }

    // Execute command
    let commandLine = input.shift();
    while(commandLine !== 'Finish') {
        const [command, rider, firstArg, secondArg] = commandLine.split(' - ');
        const riderName = riders[rider];
        let rider2, minFuel, changedPosition, lapsLeft;

        switch(command) {
            case "StopForFuel":
                minFuel = firstArg;
                changedPosition = secondArg;
                if(riderName.fuel < minFuel) {
                    console.log(`${rider} stopped to refuel but lost his position, now he is ${changedPosition}.`);
                    riderName.position = changedPosition;
                    riderName.fuel = 100;
                } else {
                    console.log(`${rider} does not need to stop for fuel!`);
                }
                break;
            case "Overtaking":
                rider2 = firstArg;
                rider2Name = riders[rider2];
                if(riderName.position < rider2Name.position) {
                    console.log(`${rider} overtook ${rider2}!`);
                    let tempPos = riderName.position;
                    riderName.position = rider2Name.position;
                    rider2Name.position = tempPos;
                }
                break;
            case "EngineFail":
                lapsLeft = firstArg;
                delete riders[rider];
                console.log(`${rider} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`);
                break;
        }


        commandLine = input.shift();
    }

    for (const rider in riders) {
        console.log(`${rider}`);
        console.log(` Final position: ${riders[rider].position}`);
    }
}

solve (["3",
    "Valentino Rossi|100|1",
    "Marc Marquez|90|2",
    "Jorge Lorenzo|80|3",
    "StopForFuel - Valentino Rossi - 50 - 1",
    "Overtaking - Marc Marquez - Jorge Lorenzo",
    "EngineFail - Marc Marquez - 10",
    "Finish"]
);

solve (["4",
    "Valentino Rossi|100|1",
    "Marc Marquez|90|3",
    "Jorge Lorenzo|80|4",
    "Johann Zarco|80|2",
    "StopForFuel - Johann Zarco - 90 - 5",
    "Overtaking - Marc Marquez - Jorge Lorenzo",
    "EngineFail - Marc Marquez - 10",
    "Finish"]
);