import { TimerSetting } from "./TimerSetting";
import { type TimerId } from "./types";

/**
 * タイマー設定（TimerSetting）をまとめて管理するリポジトリクラス。
 * 
 * タイマーの保存・追加・削除などのデータ管理を担当する。
 * 内部でタイマー一覧を保持し、保存時には一意なIDを発行する。
 * また、保存できるタイマーの最大数（MAX_TIMERS）を制御する。
 */
export class TimerRepository {
    private MAX_TIMERS: number;
    private timers: TimerSetting[];
    private currentId: number;

    constructor() {
        this.MAX_TIMERS = 5;
        this.timers = [];
        this.currentId = 0;
    }

    /**
     * タイマーをリポジトリに追加する
     * すでに完成しているTimerSettingを受け取って追加する
     * 追加だけ担当
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
     * 内部でIDを発行する
     * 外から「時間だけ」もらって保存するメソッド。
     * タイマーを1件保存する
     * 保存するために必要なこと全部やる
     * @param duration 
     */
    public save(duration: number): void {
        console.log("[Repository] save 呼ばれた", duration);
        const id = this.createId();
        const timer = new TimerSetting(id, duration);
        if (this.timers.length >= this.MAX_TIMERS) {
            return;
        }
        console.log("[Repository] 保存前の件数", this.timers.length);
        this.timers.push(timer);
        console.log("[Repository] 保存後の件数", this.timers.length);
        console.log("[Repository] 保存されたID", timer.getId());
        console.log("[Repository] 保存されたduration", timer.getDuration?.());
    }

    /**
     * 新しいタイマーIDを生成する
     * 現在の番号（currentId）を使ってIDを作り、
     * 次に使うために番号を1つ増やす。
     * IDを作るだけ
     * @returns 生成されたタイマーID（文字列）
     */
    private createId(): TimerId {
        const id = String(this.currentId);
        this.currentId++;
        return id;
    }

    /**
     * 指定されたIDのタイマーを一覧から消す
     * @param id 
     */
    public remove(id: TimerId): void {
        const result = this.timers.filter((timer) => {
            return id !== timer.getId();
        })
        this.timers = result;
    }

    /**
     * 配列の中から、指定された id と一致する TimerSetting を1件見つけて返す
     * @param id 
     */
    public getById(id: TimerId): TimerSetting {
        const timer = this.timers.find((timer) => {
            return timer.getId() === id;
        })
        if (timer === undefined) {
            throw new Error("該当するIDが見つかりません");
        }
        return timer;
    }

    /**
     * 今登録されているタイマーの数を返す
     */
    public countTimers(): number {
        return this.timers.length;
    }

    /**
     * これ以上タイマー追加できるか判定する
     */
    public isFull(): boolean {
        if (this.timers.length >= this.MAX_TIMERS) {
            return true;
        }
        return false;
    }

    /**
     * 今持ってるタイマー一覧を全部返す
     * @returns TimerSetting[] 配列を返す
     */
    public getAll(): TimerSetting[] {
        const timer = [...this.timers];
        return timer;
    }
}