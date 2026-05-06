/**
 * 一定間隔で処理を繰り返し実行するクラス
 * 
 * CountdownTimer から利用され、
 * 指定されたコールバック関数を一定間隔ごとに呼び出す。
 * 
 * タイマー処理そのものは持たず、
 * 「一定時間ごとに合図を出す役割」を担当する。
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