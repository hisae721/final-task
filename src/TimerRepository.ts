import { TimerSetting } from "./TimerSetting";


export class TimerRepository {
    private MAX_TIMERS: number;
    private timers: TimerSetting[];

    constructor() {
        this.MAX_TIMERS = 5;
        this.timers = [];
    }

    /**
     * タイマーをリポジトリに追加する
     * @param timer 
     * @returns 
     */
    private add(timer: TimerSetting): void {
        if (this.timers.length >= this.MAX_TIMERS) {
            return;
        }

        this.timers.push(timer);
    }

    /**
     * 指定されたIDのタイマーを一覧から消す
     * @param id 
     */
    private remove(id: TimerId): void {
        const result = this.timers.filter((timer) => {
            return id !== timer.id;
        })
        this.timers = result;
    }

    /**
     * 配列の中から、指定された id と一致する TimerSetting を1件見つけて返す
     * @param id 
     */
    private getById(id: TimerId): TimerSetting {
        const timer = this.timers.find((timer) => {
            return timer.id === id;
        })
        if (timer === undefined) {
            throw new Error("該当するIDが見つかりません");
        }
        return timer;
    }

    private countTimers(): number {

    }
    private isFull(): boolean {

    }
    private getAll(): TimerSetting[] {

    }
}