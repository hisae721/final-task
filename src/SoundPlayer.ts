import { ISoundPlayer } from "./ISoundPlayer";

export class SoundPlayer implements ISoundPlayer {
    private audio: HTMLAudioElement;

    constructor() {
        
        this.audio = new Audio("/sounds/notification.mp3");
        this.audio.loop = true;
        console.log("[Sound] src", this.audio.src);
    }
    startSound(): void {
        console.log("[Sound] startSound 呼ばれた");
        if (this.audio.paused === false) {
            this.stopSound();
        }
        this.audio.currentTime = 0;
        this.audio.play();
        this.audio.play().catch((e) => {
            console.log("音再生エラー", e);
        });

    };
    stopSound(): void {
        this.audio.pause();
        this.audio.currentTime = 0;
    };
}