import { CountdownTimer } from "./CountdownTimer"
/**
 * 一定間隔で合図を出す係
 * CountdownTimerが使うクラス
 * CountdownTimer.start() の中でIntervalTicker に「1秒ごとに動いて」と頼む
 * 1秒経ったらCountdownTimerのtick() 呼ぶ
 * メトロノーム
 */
export class IntervalTicker {
    // 今動いている setInterval を止めるためのID
    private intervalId: ReturnType<typeof setInterval> | null;

    constructor() {
        this.intervalId = null;
    }

    /**
     * 1秒ごとに指定した処理を繰り返し実行する
     * すでに実行中の場合は何もせず終了する
     * @param callback 毎秒呼び出す処理
     * @returns 
     */
    public startRepeatingTick(callback: () => void): void {
        if (this.intervalId) {
            return;
        }
        this.intervalId = setInterval(callback, 1000);
    }

    /**
     * 繰り返し実行している処理を停止する
     * すでに停止している場合は何もせず終了する
     * @returns 
     */
    public stopRepeatingTick(): void {
        console.log("[Ticker] stopRepeatingTick 呼ばれた");

        if (this.intervalId === null) {
            return;
        }

        clearInterval(this.intervalId);

        this.intervalId = null;
    }
}