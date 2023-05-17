import { tasklist } from "tasklist";
import schedule from 'node-schedule';
import TelegramBot from 'node-telegram-bot-api';
import fetch from "node-fetch";

const token = '6127294994:AAFcv24fMSFOKNIOwB-V6Gf8QHqrttN_HwE';
const bot = new TelegramBot(token, {polling: false});

const GAMES = [
    "dota2.exe",
    "Overwatch.exe",
    "r5apex.exe",
    "Hearthstone.exe",
    "DeadByDaylight.exe",
    "VALORANT.exe"
]

let game = "";

function checkIfTaskWithinGames(task) {
    game = task.imageName;
    return GAMES.includes(task.imageName)
}

const checkIsPlayingJob = schedule.scheduleJob('*/10 * * * * *', async function(){
    const tasklistArr = await tasklist();

    const curDate = new Date();
    if (curDate.getDate() !== 0 || curDate.getDate() !== 6) {
        if (tasklistArr.some(checkIfTaskWithinGames)) {
            // const message = await bot.sendMessage("-1001800091038", `Челлендж был нарушен игра ${game} была запущена только что.`)

            await fetch(`https://84c4-147-30-30-238.ngrok-free.app/game-was-opened?game=${game}`, {method: "POST"});
        }
    }

});