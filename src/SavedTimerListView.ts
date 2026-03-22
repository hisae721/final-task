import { Button } from "./Button";
import { ButtonClickHandler } from "./Button";
import { TimeFormatter } from "./TimeFormatter";
import { ButtonClickHandler } from "./Button";

export class SavedTimerListView {
    private container: HTMLElement;
    private deleteSelectedButton: Button;
    private unselectAllButton: Button;
    private onTimerClick: ButtonClickHandler;

    constructor(container: HTMLElement) {
        this.container = container;
        this.deleteSelectedButton = new Button({ text: "削除(一括)" });
        this.unselectAllButton = new Button({ text: "一括解除" });
        this.onTimerClick = () => { };
    }

    /**
     * 削除（⼀括）ボタンがクリックされたときの処理を設定する
     * @param handler クリック時に実行される処理
     */
    public setOnDeleteSelectedClick(handler: ButtonClickHandler): void {
        this.deleteSelectedButton.setOnClick(handler);
    }

    /**
     * 一括解除ボタンがクリックされた時の処理を設定する
     * @param handler クリック時に実行される処理
     */
    public setOnUnselectAllClick(handler: ButtonClickHandler): void {
        this.unselectAllButton.setOnClick(handler);
    }

    public setOnTimerClick(handler: ButtonClickHandler): void {
        const onTimerClick = handler;
    }

    /**
     * 今、選択されている項目があるかどうかに応じて、ボタンの有効/無効を切り替える
     * @param hasSelection 
     */
    public updateButtons(hasSelection: boolean): void {
        if (hasSelection) {
            this.deleteSelectedButton.enable();
            this.unselectAllButton.enable();
        } else {
            this.deleteSelectedButton.disable();
            this.unselectAllButton.disable();
        }
    }


    /**
     * 保存されているタイマー一覧（データ）を、画面の見た目に変換する役割
     * @param timers 
     */
    public renderTimers(timers: TimerSetting[]): void {
        this.container.innerHTML = "";
        for (const timer of timers) {
            const row = document.createElement("div");
            row.textContent = TimeFormatter.formatSeconds(timer.duration);
            row.addEventListener("click", ()=> {
                this.onTimerClick(timer.id)
            });
            this.container.appendChild(row);
        };
        
    }


}
