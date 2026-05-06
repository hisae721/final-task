
import { describe, it, expect, vi } from "vitest";
import { CountdownTimer } from "../CountdownTimer";
import { TimerState } from "../TimerState";
import { IntervalTicker } from "../IntervalTicker";

describe("CountdownTimer", () => {
    it("startしたら状態がRunningになる", () => {
        const intervalTicker = new IntervalTicker();
        const countdownTimer = new CountdownTimer(intervalTicker);
        countdownTimer.setTime(10);
        countdownTimer.start();
        const state = countdownTimer.getState();
        expect(state).toBe(TimerState.Running);
    })

    it("pauseしたら状態がPausedになる", () => {
        const intervalTicker = new IntervalTicker();
        const countdownTimer = new CountdownTimer(intervalTicker);
        countdownTimer.setTime(10);
        countdownTimer.start();
        countdownTimer.pause();
        const state = countdownTimer.getState();
        expect(state).toBe(TimerState.Paused);
    })

    it("resetしたらReadyになる", () => {
        const intervalTicker = new IntervalTicker();
        const countdownTimer = new CountdownTimer(intervalTicker);
        countdownTimer.setTime(10);
        countdownTimer.start();
        countdownTimer.reset();
        const state = countdownTimer.getState();
        const duration = countdownTimer.getDuration();
        expect(state).toBe(TimerState.Ready);
        expect(duration).toBe(10000);
    })

    it("initializeしたらInitialになる", () => {
        const intervalTicker = new IntervalTicker();
        const countdownTimer = new CountdownTimer(intervalTicker);
        countdownTimer.setTime(10);
        countdownTimer.initialize();
        const state = countdownTimer.getState();
        expect(state).toBe(TimerState.Initial);
    })

    it("残り時間が0以下になったらfinishが呼ばれる", () => {
        vi.useFakeTimers();
        const intervalTicker = new IntervalTicker();
        const countdownTimer = new CountdownTimer(intervalTicker);
        countdownTimer.setTime(10);
        const onFinishedMock = vi.fn();
        countdownTimer.setOnFinished(onFinishedMock);
        countdownTimer.start();
        vi.advanceTimersByTime(10000);
        expect(onFinishedMock).toHaveBeenCalled();
        vi.useRealTimers();
    })

})

