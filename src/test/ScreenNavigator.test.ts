import { describe, it, expect, vi, afterEach } from "vitest";
import { ScreenNavigator } from "../ScreenNavigator";
import { Screen } from "../Screen";

describe("ScreenNavigator", () => {
    it("Timerに切り替えたらTimerだけ表示される", () => {
        const home = document.createElement("div");
        const timer = document.createElement("div");
        const alarm = document.createElement("div");
        home.classList.add("view-hidden");
        timer.classList.add("view-hidden");
        alarm.classList.add("view-hidden");
        const screenNavigator = new ScreenNavigator(home, timer, alarm);
        screenNavigator.switchTo(Screen.Timer);
        const isHomeHidden = home.classList.contains("view-hidden");
        const isTimerHidden =timer.classList.contains("view-hidden");
        const isAlarmHidden = alarm.classList.contains("view-hidden");
        expect(isHomeHidden).toBe(true);
        expect(isTimerHidden).toBe(false);
        expect(isAlarmHidden).toBe(true);
    })
    it("Alarmに切り替えたらAlarmだけ表示される",()=>{
        const home = document.createElement("div");
        const timer = document.createElement("div");
        const alarm = document.createElement("div");
        home.classList.add("view-hidden");
        timer.classList.add("view-hidden");
        alarm.classList.add("view-hidden");
        const screenNavigator = new ScreenNavigator(home, timer, alarm);
        screenNavigator.switchTo(Screen.Alarm);
        const isHomeHidden = home.classList.contains("view-hidden");
        const isTimerHidden =timer.classList.contains("view-hidden");
        const isAlarmHidden = alarm.classList.contains("view-hidden");
        expect(isHomeHidden).toBe(true);
        expect(isTimerHidden).toBe(true);
        expect(isAlarmHidden).toBe(false);
    })
    it("Homeに切り替えたらHomeだけ表示される",()=>{
        const home = document.createElement("div");
        const timer = document.createElement("div");
        const alarm = document.createElement("div");
        home.classList.add("view-hidden");
        timer.classList.add("view-hidden");
        alarm.classList.add("view-hidden");
        const screenNavigator = new ScreenNavigator(home, timer, alarm);
        screenNavigator.switchTo(Screen.Home);
        const isHomeHidden = home.classList.contains("view-hidden");
        const isTimerHidden =timer.classList.contains("view-hidden");
        const isAlarmHidden = alarm.classList.contains("view-hidden");
        expect(isHomeHidden).toBe(false);
        expect(isTimerHidden).toBe(true);
        expect(isAlarmHidden).toBe(true);
    })
    it("連続で画面切替しても最後の画面だけ表示される",()=>{
        const home = document.createElement("div");
        const timer = document.createElement("div");
        const alarm = document.createElement("div");
        home.classList.add("view-hidden");
        timer.classList.add("view-hidden");
        alarm.classList.add("view-hidden");
        const screenNavigator = new ScreenNavigator(home, timer, alarm);
        screenNavigator.switchTo(Screen.Timer);
        screenNavigator.switchTo(Screen.Alarm);
        screenNavigator.switchTo(Screen.Home);
        const isHomeHidden = home.classList.contains("view-hidden");
        const isTimerHidden =timer.classList.contains("view-hidden");
        const isAlarmHidden = alarm.classList.contains("view-hidden");
        expect(isHomeHidden).toBe(false);
        expect(isTimerHidden).toBe(true);
        expect(isAlarmHidden).toBe(true);
    })
})