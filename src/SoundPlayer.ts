import { ISoundPlayer } from "./ISoundPlayer";

/**
 * タイマー終了時の通知音を再生するクラス
 * 
 * 音声ファイルの再生・停止を管理する。
 */
export class SoundPlayer implements ISoundPlayer {
    /** 再生する音声データ */
    private audio: HTMLAudioElement;

    /**
     * SoundPlayerを生成する
     * 
     * 通知音ファイルを読み込み、
     * ループ再生を有効にする。
     */
    constructor() {
        this.audio = new Audio("/sounds/notification.mp3");
        this.audio.loop = true;
        console.log("[Sound] src", this.audio.src);
    }

    /**
     * 通知音を再生する
     * 
     * すでに再生中の場合は一度停止してから
     * 最初から再生し直す。
     */
    public startSound(): void {
        console.log("[Sound] startSound 呼ばれた");
        if (this.audio.paused === false) {
            this.stopSound();
        }
        this.audio.currentTime = 0;
        this.audio.play().catch((e) => {
            console.log("音再生エラー", e);
        });
    };

    /**
     * 通知音を停止する
     * 
     * 再生位置を先頭に戻す。
     */
    public stopSound(): void {
        this.audio.pause();
        this.audio.currentTime = 0;
    };
}