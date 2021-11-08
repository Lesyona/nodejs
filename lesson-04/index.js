#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const colors = require('colors');

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
}
const isDirectory = fileName => {
    return fs.lstatSync(fileName).isDirectory();
}

function readFileOrDirectory(directory) {
    const filePath = path.resolve(__dirname, directory);
    const list = fs.readdirSync(filePath);

    inquirer
        .prompt([
            {
                name: "fileName",
                type: "list",
                message: "Choose file or directory:",
                choices: list,
            },
        ])
        .then((answer) => {
            let computedPath = path.join(directory, answer.fileName);
            if (isDirectory(computedPath)) {
                readFileOrDirectory(computedPath);
            }

            if (isFile(computedPath)) {
                inquirer
                    .prompt([
                        {
                            name: "pattern",
                            type: "input",
                            message: "Search in file for:",
                        }
                    ])
                    .then((answer) => {
                        fs.readFile(computedPath,'utf8', (err, data) => {
                            console.log(data);

                            const regexp = new RegExp( answer.pattern, 'g' );
                            if(data.match(regexp)) {
                                console.log(colors.green('Matches found!'));
                            } else {
                                console.log(colors.red('No matches found!'));
                            }
                        });
                        return;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

readFileOrDirectory(__dirname);