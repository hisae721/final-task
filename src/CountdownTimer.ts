import { IntervalTicker } from "./IntervalTicker";
import { TimerState } from "./TimerState";

export class CountdownTimer {
    private state: TimerState;
    private duration: number;
    private remainingTime: number;
    private onFinished: (() => void) | null = null;
    private ticker: IntervalTicker | null;

    constructor() {
        this.state = TimerState.Ready;
        this.duration = 0;
        this.remainingTime = 0;
    }

    start(): void {
        this.ticker = new IntervalTicker;
    }

    /**
     * 終了したら、この処理呼んでね
     * @param callback 
     */
    setOnFinished(callback): void {
        this.onFinished = callback;
    }

    /**
     * 一秒経過ごとに呼ばれる処理(秒間処理の中心)
     */
    tick(): void {
        // 状態がRunningじゃないならreturnする
        if (this.state !== TimerState.Running) {
            return;
        }

        // 状態がRunningなら残り時間を減らす
        this.remainingTime -= 1;

        // 0 になったら finish する
        if (this.remainingTime <= 0) {
            this.finish();
        }
    }

    /**
     * タイマーが終わった時の処理
     */
    finish() {
        if(this.state===TimerState.Finished){
            return;
        }
        // 状態をFinishedに変える
        this.state = TimerState.Finished;
        // IntervalTicker を止める
        this.ticker?.stopRepeatingTick();
        // コールバックを呼ぶ
        this.onFinished?.();
    }

    getState():TimerState{
        return this.state;
    }
}