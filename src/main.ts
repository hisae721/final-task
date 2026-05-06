import "./style.css";

import { CountdownTimer } from "./CountdownTimer";
import { TimerRepository } from "./TimerRepository";
import { SoundPlayer } from "./SoundPlayer";
import { ScreenNavigator } from "./ScreenNavigator";
import { TimerView } from "./TimerView";
import { TimerController } from "./TimerController";
import { TimerDisplay } from "./TimerDisplay";
import { IntervalTicker } from "./IntervalTicker";
import { Screen } from "./Screen";
import { TimerState } from "./TimerState";

const intervalTicker = new IntervalTicker();
const countdownTimer = new CountdownTimer(intervalTicker);
const app = document.getElementById("app");
const timerControlContainer = document.getElementById("timer-control")!;
const savedTimerList = document.getElementById("saved-timer-list")!;

if (!app) {
    throw new Error("app要素が見つかりません。");
}

const soundPlayer = new SoundPlayer();

const displayElement = document.getElementById("timer-display");
if (!displayElement) {
    throw new Error("timer-display が見つかりません");
}

const dialogElement = document.getElementById("timer-dialog");
if (!dialogElement) {
    throw new Error("timer-dialog が見つかりません");
}

const dialogStopButton = document.getElementById("dialog-stop-button");
if (!dialogStopButton) {
    throw new Error("timer-dialog が見つかりません");
}

const dialogResetButton = document.getElementById("dialog-reset-button");
if (!dialogResetButton) {
    throw new Error("timer-dialog が見つかりません");
}


const timerView = new TimerView(timerControlContainer,savedTimerList);


const display = new TimerDisplay(displayElement, dialogElement, dialogStopButton, dialogResetButton);

const timerRepository = new TimerRepository();

const timerController = new TimerController(countdownTimer, display, timerView, timerRepository);

timerView.setOnSaveClick(timerController.onSaveClicked);

timerView.setOnSavedTimerClick((id) => {
    timerController.onSavedTimerClicked(id);
});

timerView.setOnMultipleSelected(() => {
    timerController.onMultipleSelected();
});

timerView.setOnTimeChange((seconds) => {
    timerController.onTimeSet(seconds);
});

display.setOnDialogStopClick(timerController.onDialogStopClicked);

display.setOnDialogResetClick(timerController.onDialogResetClicked);


console.log("[main] setOnStartClick 呼ぶ直前");
timerView.setOnStartClick(timerController.onStartClicked);
console.log("[main] setOnStartClick 呼んだ後");

timerView.setOnPauseClick(timerController.onPauseClicked);

timerView.setOnResetClick(timerController.onResetClicked);

timerView.setOnDeleteSelectedClick(timerController.onDeleteSelectedClicked);

timerView.setOnUnselectAllClick(timerController.OnUnselectAllClicked);

timerView.setOnTimeChange((seconds) => {
    timerController.onTimeSet(seconds);
});

timerView

countdownTimer.reset();

timerView.updateButtons(countdownTimer.getState());
display.updateTime(0);
timerView.updateButtons(TimerState.Initial);



/* ─── ビュー要素を取得 ─── */
const viewHome = document.getElementById('view-home') as HTMLElement | null;
const timerContainer = document.getElementById("timer-container") as HTMLElement | null;
const alarmContainer = document.getElementById("alarm-container") as HTMLElement | null;

/* ─── ホーム画面のメニューボタン ─── */
const menuButtons = document.querySelectorAll<HTMLButtonElement>('.home-menu-btn');
console.log("menuButtonsの数:", menuButtons.length);


if (!viewHome || !timerContainer || !alarmContainer) {
    throw new Error("画面要素が見つかりません");
}


const screenNavigator = new ScreenNavigator(
    viewHome!,
    timerContainer!,
    alarmContainer!
);


/* ─── ホーム画面ボタンのイベントリスナー ─── */
menuButtons.forEach((btn) => {
    console.log("イベント登録:", btn.dataset["target"]);
    btn.addEventListener("click", () => {
        const target = btn.dataset["target"] ?? 'home';
        if (target === "timer") {
            console.log("タイマーへ切替");
            screenNavigator.switchTo(Screen.Timer);
        } else if (target === "alarm") {
            screenNavigator.switchTo(Screen.Alarm);
        } else {
            screenNavigator.switchTo(Screen.Home);
        }
    });
});



/* ─── タイマー画面内のナビリンク ─── */
const timerNavLinks = document.querySelectorAll<HTMLAnchorElement>('.timer-nav-link');

timerNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.dataset["target"] ?? "home";
        if (target === "timer") {
            return;
        } else if (target === "alarm") {
            screenNavigator.switchTo(Screen.Alarm);
        } else {
            screenNavigator.switchTo(Screen.Home);
        }
    })
})

