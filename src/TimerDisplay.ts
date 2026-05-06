import { IDisplay } from "./IDisplay";
import { TimeFormatter } from "./TimeFormatter";
import { ButtonClickHandler } from "./Button";

/**
 * タイマーの表示を担当するクラス
 * 
 * IDisplayインターフェースを実装し、
 * 秒数を「HH:mm:ss」形式に変換して画面に表示する。
 */
export class TimerDisplay implements IDisplay {
    /** 秒を00:00:00の形に変換するためのもの */
    private formatter: TimeFormatter;
    /** 表示対象のHTML要素 */
    private element: HTMLElement;

    private dialogElement: HTMLElement;

    private dialogStopButton: HTMLElement;

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

    public hideDialog(): void {
        this.dialogElement.classList.add("hidden");
        console.log("[Display] hideDialog 呼ばれた");
    }



    /**
     * ダイアログの停止ボタンがクリックされたときにhandlerを実行するように登録する
     * @param handler ダイアログの停止ボタン押下時に実行する処理
     */
    setOnDialogStopClick(handler: ButtonClickHandler): void {
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
    setOnDialogResetClick(handler: ButtonClickHandler): void {
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
    updateTime(seconds: number): void {
        console.log("[Display] updateTime", seconds);
        console.log("[Display] element", this.element);
        const formattedTime = TimeFormatter.formatSeconds(seconds);
        this.element.textContent = formattedTime;

    }
}