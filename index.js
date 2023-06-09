import { tasklist } from "tasklist";
import schedule from 'node-schedule';
import TelegramBot from 'node-telegram-bot-api';
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.token;
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
    game = task;
    return GAMES.includes(task.imageName)
}

const checkIsPlayingJob = schedule.scheduleJob('*/10 * * * * *', async function(){
    const tasklistArr = await tasklist();

    const curDate = new Date();
    if (curDate.getDate() !== 0 || curDate.getDate() !== 6) {
        if (tasklistArr.some(checkIfTaskWithinGames)) {
            // exec("taskkill game.id")
            await fetch(`${process.env.CHALLENGE_COORDINATOR_URL}/game-was-opened?game=${game.imageName}`, {method: "POST"});
        }
    }

});