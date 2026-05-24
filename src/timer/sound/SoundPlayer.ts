import type { ISoundPlayer } from "../../common/ISoundPlayer";

/**
 * タイマー終了時の通知音を再生するクラス
 * 
 * 音声ファイルの再生・停止を管理する。
 */
export class SoundPlayer implements ISoundPlayer {
    /** 再生する音声データ */
    private audio: HTMLAudioElement;
    /** 自動停止用タイマーID */
    private autoStopTimerId: number | null = null;

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
     * すでに再生中の場合は一度停止して最初から再生し直す。
     * 
     * 通知音はループ再生され、停止ボタンまたはリセットボタンが
     * 押されない場合は30秒後に自動停止する。
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
        this.autoStopTimerId = window.setTimeout(() => {
            this.stopSound();
        }, 30000);
    };

    /**
     * 通知音を停止する
     * 再生を停止し、再生位置を先頭に戻す。
     * 
     * また、設定されている自動停止処理をキャンセルする。
     */
    public stopSound(): void {
        this.audio.pause();
        this.audio.currentTime = 0;
        // 自動停止タイマー解除
        if (this.autoStopTimerId !== null) {
            clearTimeout(this.autoStopTimerId);
            this.autoStopTimerId = null;
        }
    };
}