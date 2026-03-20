import { TimerSetting } from "./TimerSetting";


export class TimerRepository {
    private MAX_TIMERS: number;
    private timers: TimerSetting[];

    constructor() {
        this.MAX_TIMERS = 5;
        this.timers = [];
    }

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

    private getById(id: TimerId): TimerSetting {

    }
    private countTimers(): number {

    }
    private isFull(): boolean {

    }
    private getAll(): TimerSetting[] {

    }
}