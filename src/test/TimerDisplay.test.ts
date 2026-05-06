import { describe, it, expect, vi, afterEach } from "vitest";
import { TimerDisplay } from "../TimerDisplay";

describe("TimerDisplay", () => {
    it("時間表示が更新される", () => {
        const display = document.createElement("div");
        const dialog = document.createElement("div");
        const stopButton = document.createElement("button");
        const resetButton = document.createElement("button");
        const timerDisplay = new TimerDisplay(display, dialog, stopButton, resetButton);
        timerDisplay.updateTime(65);
        expect(display.textContent).toBe("00:01:05");
    })
    it("完了ダイアログを表示できる", () => {
        const display = document.createElement("div");
        const dialog = document.createElement("div");
        const stopButton = document.createElement("button");
        const resetButton = document.createElement("button");
        const timerDisplay = new TimerDisplay(display, dialog, stopButton, resetButton);
        dialog.classList.add("hidden");
        expect(dialog.classList.contains("hidden")).toBe(true);
        timerDisplay.showTimerFinished();
        expect(dialog.classList.contains("hidden")).toBe(false);
    })
    it("完了ダイアログを非表示にできる", () => {
        const display = document.createElement("div");
        const dialog = document.createElement("div");
        const stopButton = document.createElement("button");
        const resetButton = document.createElement("button");
        const timerDisplay = new TimerDisplay(display, dialog, stopButton, resetButton);
        expect(dialog.classList.contains("hidden")).toBe(false);
        timerDisplay.hideDialog();
        expect(dialog.classList.contains("hidden")).toBe(true);
    })
    it("Stopボタンのイベントが登録できる", () => {
        const display = document.createElement("div");
        const dialog = document.createElement("div");
        const stopButton = document.createElement("button");
        const resetButton = document.createElement("button");
        const timerDisplay = new TimerDisplay(display, dialog, stopButton, resetButton);
        const mockFn = vi.fn();
        timerDisplay.setOnDialogStopClick(mockFn);
        stopButton.click();
        expect(mockFn).toHaveBeenCalledTimes(1);
    })
    it("Resetボタンのイベントが登録できる", () => {
        const display = document.createElement("div");
        const dialog = document.createElement("div");
        const stopButton = document.createElement("button");
        const resetButton = document.createElement("button");
        const timerDisplay = new TimerDisplay(display, dialog, stopButton, resetButton);
        const mockFn = vi.fn();
        timerDisplay.setOnDialogResetClick(mockFn);
        resetButton.click();
        expect(mockFn).toHaveBeenCalledTimes(1);
    })
})