import chalk from "chalk";
import inquirer from "inquirer";
//Currenct convertor API LINK
let apilink = "https://v6.exchangerate-api.com/v6/149053f8b233a503100b1a56/latest/PKR";
//fetching Data
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(apilink);
//object to array
let countries = Object.keys(data);
//user input
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting From",
    choices: countries,
});
console.log(`Converting from ${chalk.greenBright.bold(firstCountry.name)}`);
//first country money
let userMoney = await inquirer.prompt({
    type: "number",
    name: "Rupee",
    message: `   Please enter the amount in ${chalk.greenBright.bold(firstCountry.name)}:`,
});
//convert country
let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting To",
    choices: countries,
});
//conversion rate
let cnv = `https://v6.exchangerate-api.com/v6/149053f8b233a503100b1a56/pair/${firstCountry.name}/${secondCountry.name}`;
//  fetching data for conversion rate
let cnvData = async (data) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};
let conversionRate = await cnvData(cnv);
let convertedRate = userMoney.Rupee * conversionRate;
console.log(`Your ${chalk.bold.greenBright(firstCountry.name)} ${chalk.bold.greenBright(userMoney.Rupee)} in ${chalk.bold.greenBright(secondCountry.name)} is ${chalk.bold.greenBright(convertedRate)}`);
