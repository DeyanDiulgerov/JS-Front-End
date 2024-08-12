function solve(input) {
    let encrypted = input.shift();

    let commandLine = input.shift();
    while(commandLine != "Buy")
    {
        const [command, firstArg, secondArg] = commandLine.split("?");
        let substring, replacement;

        switch(command)
        {
            case "TakeEven":
                let newString = '';
                for(let i = 0; i < encrypted.length; i++) 
                {
                    if(i % 2 == 0)
                        newString += encrypted[i];
                }
                encrypted = newString;
                console.log(encrypted);
                break;
            case "ChangeAll":
                substring = firstArg;
                replacement = secondArg;
                encrypted = encrypted.split(substring).join(replacement);
                console.log(encrypted);
                break;
            case "Reverse":
                substring = firstArg;
                if(encrypted.includes(substring)) {
                    encrypted = encrypted.replace(substring, '');
                    let reversed = '';
                    for(let i = substring.length - 1; i >= 0; i--) {
                        reversed += substring[i];
                    }

                    encrypted += reversed;

                    console.log(encrypted);
                }
                else {
                    console.log("error");
                }
                break;
        }

        commandLine = input.shift();
    }

    console.log(`The cryptocurrency is: ${encrypted}`);
}

solve (["z2tdsfndoctsB6z7tjc8ojzdngzhtjsyVjek!snfzsafhscs", 
    "TakeEven",
"Reverse?!nzahc",
"ChangeAll?m?g",
"Reverse?adshk",
"ChangeAll?z?i",
"Buy"]
);

solve (["PZDfA2PkAsakhnefZ7aZ", 
    "TakeEven",
    "TakeEven",
    "TakeEven",
    "ChangeAll?Z?X",
    "ChangeAll?A?R",
    "Reverse?PRX",
    "Buy"]
);