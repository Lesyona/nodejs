const moment = require('moment');
require('moment-precise-range-plugin');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

const emitterObject = new MyEmitter();
emitterObject.on('timerIsUp', console.log);

let timers = process.argv.slice(2);

function runTimers(timers) {
    timers.forEach(item => {
        let itemFormatted = moment(item, 'HH:mm-DD-MM-YYYY')
        if (!itemFormatted.isValid()) {
            console.log('Input parameters are incorrect!');
            return false;
        }
        startTimer(item);
    });
}

function startTimer(timer) {
    const timerParsed = moment(timer, 'HH:mm-DD-MM-YYYY');

    const timerId = setInterval(function () {
        const now = moment();
        let time = Math.floor(moment.duration(timerParsed.diff(now)).asSeconds()) + 1;

        if (time < 0) {
            clearInterval(timerId);
            console.log('Timer is not in the future!');
            return false;
        }
        if (time === 0) {
            clearInterval(timerId);
            emitterObject.emit('timerIsUp', 'Time is up!');
            return false;
        }

        let result = moment.preciseDiff(timerParsed, now, true);
        console.log(`years: ${result.years}, months: ${result.months}, days: ${result.days}, hours: ${result.hours}, minutes: ${result.minutes}, seconds: ${result.seconds}`);

        time--;
    }, 1000);
}

runTimers(timers);