import type { IDisplay } from "./IDisplay";
import { TimeFormatter } from "../../common/TimeFormatter";
import type { ButtonClickHandler } from "../../common/Button";

/**
 * タイマーの表示を担当するクラス
 * 
 * IDisplayインターフェースを実装し、
 * 秒数を「HH:mm:ss」形式に変換して画面に表示する。
 */
export class TimerDisplay implements IDisplay {
    /** 秒を00:00:00の形に変換するためのもの */
    private formatter: TimeFormatter;
    /** タイマー時間を表示するHTML要素 */
    private element: HTMLElement;
    /** タイマー終了時に表示するダイアログ要素 */
    private dialogElement: HTMLElement;
    /** ダイアログ内の停止ボタン要素 */
    private dialogStopButton: HTMLElement;
    /** ダイアログ内のリセットボタン要素 */
    private dialogResetButton: HTMLElement;

    constructor(element: HTMLElement, dialogElement: HTMLElement, dialogStopButton: HTMLElement, dialogResetButton: HTMLElement) {
        this.formatter = new TimeFormatter();
        this.element = element;
        this.dialogElement = dialogElement;
        this.dialogStopButton = dialogStopButton;
        this.dialogResetButton = dialogResetButton;
    }

    /**
     * タイマー終了時の表示処理
     */
    public showTimerFinished(): void {
        console.log("タイマーが終了しました");
        console.log("[Display] showTimerFinished 呼ばれた");
        this.dialogElement.classList.remove("hidden");
    }

    /**
     * タイマー終了ダイアログを非表示にする
     */
    public hideDialog(): void {
        this.dialogElement.classList.add("hidden");
        console.log("[Display] hideDialog 呼ばれた");
    }

    /**
     * ダイアログの停止ボタンがクリックされたときにhandlerを実行するように登録する
     * @param handler ダイアログの停止ボタン押下時に実行する処理
     */
    public setOnDialogStopClick(handler: ButtonClickHandler): void {
        console.log("[Display] dialogStopButtonにイベントセットされた");
        this.dialogStopButton.addEventListener("click", (event) => {
            console.log("[Display] ダイアログ停止ボタン押された");
            handler(event);
        });
    }

    /**
     * ダイアログのリセットボタンがクリックされたときにhandlerを実行するように登録する
     * @param handler ダイアログのリセットボタン押下時に実行する処理
     */
    public setOnDialogResetClick(handler: ButtonClickHandler): void {
        console.log("[Display] dialogResetButtonにイベントセットされた");
        this.dialogResetButton.addEventListener("click", (event) => {
            console.log("[Display] ダイアログリセットボタン押された");
            handler(event);
        });
    }

    /**
     * 秒を00:00:00の形にして画面に表示する
     * @param seconds 表示する時間（秒）
     */
    public updateTime(seconds: number): void {
        console.log("[Display] updateTime", seconds);
        console.log("[Display] element", this.element);
        const formattedTime = TimeFormatter.formatSeconds(seconds);
        this.element.textContent = formattedTime;

    }
}