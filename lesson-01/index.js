const number1 = +process.argv[2];
const number2 = +process.argv[3];
const colors = require('colors');

function checkIfSimple(number1, number2) {
    if(isNaN(number1) || isNaN(number2)) {
        console.log(colors.red('Укажите корректные числа'));
        return null;
    }
    let isSimple = [];

    for (let i = number1; i <= number2; i++) {
        for (let j = 2; j <= i - 1; j++) {
            if (i % j === 0) {
                break;
            }
            if (j === i - 1 && i % j !== 0 ) {
                isSimple.push(i);
            }
        }
    }

    return isSimple;
}

function printSimple(items) {
    if(items && items.length) {
        items.forEach((item, index) => {
            if ((index + 1) % 3 === 1) {
                console.log(colors.green(item))
            } else if ((index + 1) % 3 === 2) {
                console.log(colors.yellow(item))
            } else if ((index + 1) % 3 === 0) {
                console.log(colors.red(item))
            }
        });
    }
    if(items && !items.length) {
        console.log(colors.red('В указанном диапазоне нет простых чисел'))
    }
}

printSimple(checkIfSimple(number1, number2));