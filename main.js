#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let enemies = ['Skeleton', 'Zombie', 'Warrior', 'Assassin'];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
let health = 100;
let attackDamage = 50;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let healthpotionDropChance = 50;
let running = true;
let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * max - min) + min;
};
console.log("\t----------------------------------------");
console.log(chalk.greenBright("\t WELCOME TO THE DUNGEON!") + (chalk.yellowBright(" By Merchantsons")));
console.log("\t----------------------------------------");
GAME: while (running) {
    console.log(chalk.red("\t↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓"));
    let enemyHealth = getRandomNumber(1, maxEnemyHealth);
    let enemy = enemies[getRandomNumber(0, enemies.length - 1)];
    console.log(chalk.red(`\t# ☻ ${enemy} has appeard #`));
    console.log("\t------------------------------------");
    while (enemyHealth > 0) {
        console.log(chalk.greenBright(`\t ♥ Your Power : ${health}`));
        console.log(chalk.redBright(`\t § ${enemy} Power : ${enemyHealth}`));
        console.log("\t------------------------------------");
        let control = await inquirer.prompt({
            message: "What would you like to do?",
            type: "list",
            choices: [" Attack", " Drink Health Potion", " Run"],
            name: "command"
        });
        switch (control.command) {
            case " Attack":
                let strikeDamage = getRandomNumber(1, attackDamage);
                let damageTaken = getRandomNumber(1, enemyAttackDamage);
                health -= damageTaken;
                enemyHealth -= strikeDamage;
                console.log(chalk.greenBright(`\t You Strike the ${enemy} with ${strikeDamage} damage.`));
                console.log(chalk.redBright(`\t You received ${damageTaken} damage from ${enemy}.`));
                if (health < 1) {
                    console.log(`\t You have taken too much damage. You are too weak to go on.`);
                    break;
                }
                break;
            case " Drink Health Potion":
                if (numHealthPotions > 0) {
                    health += healthPotionHealAmount;
                    console.log(chalk.green(`\t You drank health potion, healing yourself for ${healthPotionHealAmount}\n\t You now have ${health} HEALTH POWER\n\t and have ${numHealthPotions} left`));
                    numHealthPotions--;
                    console.log(chalk.bgBlueBright(`\t You now have ${numHealthPotions} health potion(s) left.`));
                }
                else {
                    console.log(`\t You have no health potion left, defeat enemies for a chance to get one. `);
                }
                break;
            case " Run":
                console.log(`\t You ran away from the ${enemy}.`);
                continue GAME;
                break;
        }
    }
    if (health < 1) {
        console.log(`\t You limp out of the dungeon, and weak for this battle.`);
        break;
    }
    console.log("\t------------------------------------");
    console.log(chalk.red(`\t # ${enemy} has been defeated #`));
    console.log(chalk.green(`\t # You have ${health} health power left #`));
    if (getRandomNumber(1, 100) < healthpotionDropChance) {
        numHealthPotions++;
        console.log(chalk.yellowBright(`\t # The ${enemy} dropped the health potion #`));
        console.log(chalk.blueBright(`\t # You now have ${numHealthPotions} healthpotion(s). #`));
    }
    let stateControl = await inquirer.prompt({
        message: "\nWhat would you like to do now.",
        type: "list",
        choices: ["   Continue Fight", "   Exit Dungeon."],
        name: "command",
    });
    if (stateControl.command == "   Continue Fight") {
        console.log(`You can continue your fight now!`);
    }
    else {
        console.log(chalk.bgYellowBright("\n\tYou have successfuly exited from Dungeon!"));
        break;
    }
}
console.log(chalk.bgRed("\n\n\t            GAME OVER                "));
console.log(chalk.red("\t    #############################"));
console.log(chalk.green("\t    Thankyou for playing Dungeon!"));
console.log(chalk.red("\t    #############################"));
