function solve(input) {
    let spell = input.shift();

    let commandLine = input.shift();
    while(commandLine != "End") {
        const [command, firstArg, secondArg] = commandLine.split('!'); 
        let newSub, fromIndex, toIndex;

        switch (command) {
            case "RemoveEven":
                let newSpell = '';
                for(let i = 0; i < spell.length; i++) {
                    if(i % 2 === 0) {
                        newSpell += spell[i];
                    }
                }
                spell = newSpell;
                console.log(spell);
                break;
            case "TakePart":
                fromIndex = firstArg;
                toIndex = secondArg;
                let substring = spell.substring(fromIndex, toIndex);
                spell = substring
                console.log(spell);
                break;
            case "Reverse":
                newSub = firstArg;
                if(spell.includes(newSub)) {
                const reversed = newSub.split("").reverse().join("");
                spell = spell.replace(newSub, "").concat(reversed);
                console.log(spell);
                } else {
                    console.log("Error");
                }
                break;
        }
        commandLine = input.shift();
    }
    console.log(`The concealed spell is: ${spell}`);
}

solve (["asAsl2adkda2mdaczsa", 
    "RemoveEven",
    "TakePart!1!9",
    "Reverse!maz",
    "End"]
);

solve (["hZwemtroiui5tfone1haGnanbvcaploL2u2a2n2i2m", 
    "TakePart!31!42",
    "RemoveEven",
    "Reverse!anim",
    "Reverse!sad",
    "End"]
);