import { describe, it, expect, vi, afterEach } from "vitest";
import { IntervalTicker } from "../IntervalTicker";

describe("IntervalTicker", () => {
    afterEach(() => {
        vi.useRealTimers();
    });
    it("startRepeatingTickでcallbackが呼ばれる", () => {
        vi.useFakeTimers();
        const intervalTicker = new IntervalTicker();
        const callback = vi.fn();
        intervalTicker.startRepeatingTick(callback);
        vi.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalled();
    })
    it("stopRepeatingTickでcallbackが止まる", () => {
        vi.useFakeTimers();
        const intervalTicker = new IntervalTicker();
        const callback = vi.fn();
        intervalTicker.startRepeatingTick(callback);
        vi.advanceTimersByTime(1000);
        intervalTicker.stopRepeatingTick();
        const callCountAfterStart = callback.mock.calls.length;
        vi.advanceTimersByTime(1000);
        const callCountAfterStop = callback.mock.calls.length;
        expect(callCountAfterStop).toBe(callCountAfterStart);
    })
    it("startしていない状態でstopしてもエラーにならない", () => {
        const intervalTicker = new IntervalTicker();
        expect(() => {
            intervalTicker.stopRepeatingTick();
        }).not.toThrow();
    })
    it("複数回startしても二重に動作しない", () => {
        vi.useFakeTimers();
        const intervalTicker = new IntervalTicker();
        const callback = vi.fn();
        intervalTicker.startRepeatingTick(callback);
        vi.advanceTimersByTime(1000);
        intervalTicker.startRepeatingTick(callback);
        vi.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalledTimes(2);
    })
    it("stopした後にもう一度startできる", () => {
        vi.useFakeTimers();
        const intervalTicker = new IntervalTicker();
        const callback = vi.fn();
        intervalTicker.startRepeatingTick(callback);
        vi.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalledTimes(1);
        intervalTicker.stopRepeatingTick();
        vi.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalledTimes(1);
        intervalTicker.startRepeatingTick(callback);
        vi.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalledTimes(2);
    })

})