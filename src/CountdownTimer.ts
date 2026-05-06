import { IntervalTicker } from "./IntervalTicker";
import { TimerState } from "./TimerState";

/**
 * タイマーのロジックを管理するクラス
 * 
 * 開始・一時停止・リセットなどの状態を持ち、
 * 経過時間から残り時間を計算する
 * 
 * 表示や音などは担当せず、時間の管理だけを行う
 */
export class CountdownTimer {
    /** 現在のタイマーの状態（Ready / Running / Paused / Finished） */
    private state: TimerState;
    /** 設定された時間 */
    private duration: number;
    /** タイマー開始時の時刻（performance.now()の値） */
    private startTime: number;
    /** 一時停止時などに保持する残り時間 */
    private remainingTime: number;
    /** 1秒ごとに処理を呼び出すためのティッカー */
    private ticker: IntervalTicker;
    /** タイマー終了時に呼ばれるコールバック */
    private onFinished: (() => void) | null = null;
    /** 毎秒呼ばれるコールバック（残り時間を通知する） */
    private onTick: ((remainingTime: number) => void) | null = null;
    // 終了予定時刻
    private endTime: number = 0;

    /**
     * @param ticker 1秒ごとにtick処理を行うためのインスタンス
     */
    constructor(ticker: IntervalTicker) {
        this.state = TimerState.Ready;
        this.duration = 0;
        this.startTime = 0;
        this.ticker = ticker;
        this.remainingTime = 0;
    }




    /**
     * スタートした瞬間の時刻を記録して保存
     */
    start(): void {
        this.startTime = performance.now();
        // 今の時刻 + 設定時間 = 終了予定時刻
        this.endTime = this.startTime + this.duration;
        this.ticker.startRepeatingTick(() => this.tick());
        this.state = TimerState.Running;
        console.log("[Timer] start呼ばれた!");
        console.log("[Timer] state", this.state);
    }

    /**
     * IntervalTicker止めて、状態を変える必要ある
     */
    stop(): void {
        if (this.state !== TimerState.Running) {
            return;
        }
        this.ticker.stopRepeatingTick();
        this.remainingTime = 0;
        this.state = TimerState.Ready;
        console.log("[Timer] state", this.state);
    }

    /**
     * 一時停止後の処理
     */
    pause(): void {
        console.log("[Timer] pause呼ばれた");
        // 経過時間
        const elapsed = performance.now() - this.startTime;
        // 残り時間を保存
        this.remainingTime = this.duration - elapsed;
        this.state = TimerState.Paused;
        this.ticker.stopRepeatingTick();
        console.log("[Timer] state:", this.state);
    }

    /**
     * タイマーをリセットし、設定された時間の状態に戻す。
     * 
     * ・カウントダウンを停止する
     * ・残り時間を、元の設定時間（duration）に戻す
     * ・状態を Ready に変更する
     * 
     * 主に、カウントダウン中や終了後に「元の設定時間に戻す」ために使用する。
     */
    reset(): void {
        console.log("[Timer] reset呼ばれた");
        this.state = TimerState.Ready;
        this.remainingTime = this.duration;
        this.ticker.stopRepeatingTick();
        console.log("[Timer] state:", this.state);
    }

    /**
     * メトロノームの音をきっかけにtick() を実行する
     * 時間を減らす
     * 経過時間と残り時間を計算
     */
    tick(): void {
        // 現在時刻を取得
        const now = performance.now();
        // 残り時間を計算
        // 「終了予定時刻（endTime）- 現在時刻」で求めることで、
        // tickの呼び出し間隔がズレても正しい残り時間を再計算できる
        const remaining = this.endTime - now;

        console.log("[Timer] tick呼ばれた!");
        console.log("[Timer] remaining", remaining);

        if (remaining <= 0) {
            console.log("[Timer] 0以下になったので停止する");
            console.log("[Timer] remaining <= 0 に入った");

            // 0をControllerに通知する
            if (this.onTick) {
                this.onTick(0);
            }

            this.finish();

            return;
        }

        // 今計算したばっかりの最新データをそのまま渡したいからremainingを渡す
        if (this.onTick) {
            this.onTick(remaining);
        }
    }

        /**
     * タイマーを完全な初期状態（未設定状態）に戻す。
     *
     * ・カウントダウンを停止する
     * ・設定時間（duration）と残り時間（remainingTime）を0にリセットする
     * ・状態を Initial に変更する
     *
     * 主に、時間選択後にリセットを押した場合に、
     * タイマーを未設定状態（00:00:00）に戻す際に使用する。
     */
    public initialize(): void {
        console.log("[Timer] initialize 呼ばれた");
        this.ticker.stopRepeatingTick();
        this.duration = 0;
        this.remainingTime = 0;
        this.state = TimerState.Initial;
        console.log("[Timer] state: Initial");
    }

    /**
     * 一時停止後の再開
     */
    resume(): void {
        if (this.state !== TimerState.Paused) {
            return;
        }

        this.startTime = performance.now();
        this.endTime = this.startTime + this.remainingTime;
        this.ticker.startRepeatingTick(() => this.tick());
        this.state = TimerState.Running;
    }




    public setTime(seconds: number): void {
        this.duration = seconds * 1000;
    }

    /**
     * 終了したら、この処理呼んでね
     * @param callback 
     */
    setOnFinished(callback: () => void): void {
        this.onFinished = callback;
    }

    /**
     * 1秒経ったら、この処理呼んでね
     * @param callback 
     */
    setOnTick(callback: (remainingTime: number) => void): void {
        this.onTick = callback;
    }

    /**
     * タイマーが終わった時の処理
     */
    finish(): void {
        console.log("[Timer] finish 呼ばれた!");
        if (this.state === TimerState.Finished) {
            return;
        }
        // 状態をFinishedに変える
        this.state = TimerState.Finished;
        // IntervalTicker を止める
        this.ticker?.stopRepeatingTick();
        // コールバックを呼ぶ
        console.log("[Timer] onFinishedを呼ぶ直前", this.onFinished);
        this.onFinished?.();
    }

    /**
     * 状態を返す
     * @returns 
     */
    public getState(): TimerState {
        return this.state;
    }

    /**
     * 外から残り時間を見るためのメソッド
     * @returns 
     */
    public getDuration(): number {
        return this.duration;
    }

}