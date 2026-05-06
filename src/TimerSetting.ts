
import { type TimerId } from "./types";

/**
 * 保存済みタイマー設定を表すクラス
 * 
 * タイマーIDと設定時間を保持する。
 */
export class TimerSetting {
    /** タイマーを識別するID */
    private id: TimerId;
    /** タイマーの設定時間（ミリ秒） */
    private duration: number;

    constructor(id:TimerId,duration:number){
        this.id = id;
        this.duration = duration;
    }

    /**
     * タイマーIDを取得する
     * 
     * @returns タイマーID
     */
    public getId(): TimerId{
        return this.id;
    }

    /**
     * タイマーの設定時間を取得する
     * 
     * @returns タイマーの設定時間（ミリ秒）
     */
    public getDuration(): number {
        return this.duration;
    }
}