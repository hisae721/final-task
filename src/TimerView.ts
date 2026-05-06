import { Button } from "./Button"
import { ButtonClickHandler } from "./Button";
import { TimerState } from "./TimerState";
import { TimerSetting } from "./TimerSetting";
import { TimeFormatter } from "./TimeFormatter";
import { TimerId } from "./types";


/**
 *  タイマー画面のUI操作を管理するビュークラス。
 *  ボタン操作や時間入力（時・分・秒）の取得・初期化を担当する。
 */
export class TimerView {
    private container: HTMLElement;
    private startButton!: Button;
    private pauseButton!: Button;
    private resetButton!: Button;
    private saveButton!: Button;
    private deleteSelectedButton!: Button;
    private unselectAllButton!: Button;
    private onTimerClick: (id: string) => void = () => { };
    private hourSelect: HTMLSelectElement;
    private minuteSelect: HTMLSelectElement;
    private secondSelect: HTMLSelectElement;
    private savedTimerList: HTMLElement;
    private onSavedTimerClick: (id: TimerId) => void;
    private selectedTimerIds: TimerId[] = [];
    private onMultipleSelected: () => void = () => { };

    constructor(container: HTMLElement, savedTimerList: HTMLElement) {
        this.container = container;
        this.onTimerClick = () => { };
        this.initializeTimeOptions();
        this.hourSelect = document.getElementById("timer-hour") as HTMLSelectElement;
        this.minuteSelect = document.getElementById("timer-minute") as HTMLSelectElement;
        this.secondSelect = document.getElementById("timer-second") as HTMLSelectElement;
        this.createButtons();
        this.appendButtons();
        this.savedTimerList = savedTimerList;
        this.onSavedTimerClick = (id: TimerId) => { };
    }

    public getSelectedTimerIds(): TimerId[] {
        return this.selectedTimerIds;
    }

    /**
     * タイマー画面で使用する操作ボタンを生成する
     *
     * 保存・開始・リセット・一時停止ボタンのインスタンスを作成し、
     * 初期状態ではすべて押せない状態（disabled）で初期化する。
     */
    private createButtons(): void {
        this.saveButton = new Button({
            text: "保存",
            className: "timer-button save-button",
            disabled: true,
        });

        this.startButton = new Button({
            text: "開始",
            className: "timer-button start-button",
            disabled: true,
        });

        this.resetButton = new Button({
            text: "リセット",
            className: "timer-button reset-button",
            disabled: true,
        });

        this.pauseButton = new Button({
            text: "一時停止",
            className: "timer-button pause-button",
            disabled: true,
        });

        this.deleteSelectedButton = new Button({
            text: "削除(一括)",
            className: "timer-button delete-selected-button hidden",
            disabled: true,
        });

        this.unselectAllButton = new Button({
            text: "一括解除",
            className: "timer-button unselect-all-button hidden",
            disabled: true,
        });
    }

    /**
     * 作成したボタンを画面の指定位置に配置する
     *
     * 各操作ボタンを対応するコンテナ要素に追加し、
     * タイマー操作エリアと保存エリアにボタンを表示する。
     */
    private appendButtons(): void {
        const controls = document.getElementById("timer-controls")!;
        const saveArea = document.getElementById("timer-save")!;
        const deleteArea = document.getElementById("timer-delete")!;
        const selectArea = document.getElementById("timer-select")!;

        this.startButton.appendTo(controls);
        this.pauseButton.appendTo(controls);
        this.resetButton.appendTo(controls);

        this.saveButton.appendTo(saveArea);

        this.deleteSelectedButton.appendTo(deleteArea);

        this.unselectAllButton.appendTo(selectArea);
    }


    /**
     * 時・分・秒の入力値が変更されたときに呼び出されるコールバックを登録する
     * 各セレクトボックス（時・分・秒）の値から合計秒数を計算し、指定されたハンドラー関数に渡す
     * @param handler 合計秒数（秒）を受け取るコールバック関数
     */
    setOnTimeChange(handler: (seconds: number) => void): void {
        const notify = () => {
            const hour = Number(this.hourSelect.value);
            const minute = Number(this.minuteSelect.value);
            const second = Number(this.secondSelect.value);

            const totalSeconds = hour * 3600 + minute * 60 + second;

            console.log("[View] totalSeconds", totalSeconds);

            handler(totalSeconds);
        };

        this.hourSelect.addEventListener("change", notify);
        this.minuteSelect.addEventListener("change", notify);
        this.secondSelect.addEventListener("change", notify);
    }

    private initializeTimeOptions(): void {
        this.createHourOptions();
        this.createMinuteOptions();
        this.createSecondOptions();
    }

    // 時の時間選択を作る
    private createHourOptions(): void {
        const timerHour = document.getElementById("timer-hour");
        for (let i = 0; i <= 23; i++) {
            let option = document.createElement("option");
            let text;
            if (i < 10) {
                text = "0" + i;
            } else {
                text = "" + i;
            }
            option.textContent = text;
            timerHour!.appendChild(option);
        }
    }

    // 分の時間選択を作る
    private createMinuteOptions(): void {
        const timerMinute = document.getElementById("timer-minute");
        for (let i = 0; i <= 59; i++) {
            let option = document.createElement("option");
            let text;
            if (i < 10) {
                text = "0" + i;
            } else {
                text = "" + i;
            }
            option.textContent = text;
            timerMinute!.appendChild(option);
        }
    }

    // 秒の時間選択を作る
    private createSecondOptions(): void {
        const timerSecond = document.getElementById("timer-second");
        for (let i = 0; i <= 59; i++) {
            let option = document.createElement("option");
            let text;
            if (i < 10) {
                text = "0" + i;
            } else {
                text = "" + i;
            }
            option.textContent = text;
            timerSecond!.appendChild(option);
        }
    }

    /**
     * 開始ボタンがクリックされたときにhandlerを実行するように登録する
     * @param handler 
     */
    public setOnStartClick(handler: ButtonClickHandler): void {
        this.startButton.setOnClick(handler);
        console.log("[View]startButtonにイベントセットされた");
    }

    /**
     * 一時停止ボタンが押されたときにhandlerを実行するように登録する
     * @param handler 
     */
    public setOnPauseClick(handler: ButtonClickHandler): void {
        this.pauseButton.setOnClick(handler);
        console.log("[View] pauseButtonにイベントセットされた")
    }

    /**
     * リセットボタンが押されたときにhandlerを実行するように登録する
     * @param handler 
     */
    public setOnResetClick(handler: ButtonClickHandler): void {
        this.resetButton.setOnClick(handler);
        console.log("[View] resetButtonにイベントセットされた")
    }

    /**
     * 保存ボタンが押されたときにhandlerを実行するように登録する
     * @param handler 
     */
    public setOnSaveClick(handler: ButtonClickHandler): void {
        this.saveButton.setOnClick(handler);
        console.log("[View] saveButtonにイベントセットされた")
    }


    /**
     * 保存タイマーがクリックされたときの処理を登録する
     *
     * 保存タイマー一覧の項目がクリックされた際に実行される処理（handler）を受け取り、
     * 内部に保持する。クリック時には、選択されたタイマーのIDが引数として渡される。
     *
     * @param handler タイマー選択時に実行されるコールバック関数
     */
    setOnSavedTimerClick(handler: (id: TimerId) => void): void {
        this.onSavedTimerClick = handler;
    }

    /**
     * 保存されているタイマー一覧を画面に表示する
     *
     * 渡されたタイマーの配列をもとに一覧を作り直し、
     * 各タイマーの時間を見やすい形式に変換してリストに表示する。
     * また、それぞれのタイマーをクリックすると、
     * そのタイマーのIDをControllerに通知する。
     * @param timers 表示する保存済みタイマーの配列
     */
    renderSavedTimers(timers: TimerSetting[]): void {
        console.log("[View] renderSavedTimers 呼ばれた");
        console.log("[View] 受け取ったtimers", timers);
        this.savedTimerList.innerHTML = "";
        timers.forEach((timer) => {
            console.log("[View] 描画中のtimer", timer);
            const li = document.createElement("li");
            const duration = timer.getDuration();
            const seconds = Math.floor(duration / 1000);
            const formatted = TimeFormatter.formatSeconds(seconds);
            li.textContent = `${formatted}`;


            li.addEventListener("click", () => {
                const id = timer.getId();
                if (this.selectedTimerIds.includes(id)) {
                    this.selectedTimerIds = this.selectedTimerIds.filter(
                        selectedId => selectedId !== id
                    )
                    li.classList.remove("selected");
                } else {
                    this.selectedTimerIds.push(id);
                    li.classList.add("selected");
                }

                // 選択数が 1件だけなら
                if (this.selectedTimerIds.length === 1) {
                    this.onSavedTimerClick(id);
                    //選択数が 2件以上
                } else if (this.selectedTimerIds.length >= 2) {
                    this.onMultipleSelected()
                } else {
                    this.onMultipleSelected()
                }
                this.deleteSelectedButton.enable();
                this.unselectAllButton.enable();
            });
            this.savedTimerList.appendChild(li);
        })

        if (timers.length === 0) {
            this.deleteSelectedButton.hide();
            this.unselectAllButton.hide();

        }
        if (timers.length > 0) {
            this.deleteSelectedButton.show();
            this.unselectAllButton.show();
            this.deleteSelectedButton.disable();
        }

    }

    /**
     * タイマーの状態に応じて、どのボタンを押せる状態にするか・押せない状態
     * （グレーアウト）にするかを条件分岐でまとめて決めるためのメソッド
     * タイマーの状態を見て、複数のボタンの状態をまとめて更新する
     * @param TimerState
     */
    public updateButtons(state: TimerState): void {
        console.log("[View] updateButtons", state);
        if (state === TimerState.Initial) {
            this.startButton.disable();
            this.pauseButton.disable();
            this.resetButton.disable();
            this.saveButton.disable();
        }
        if (state === TimerState.Ready) {
            this.startButton.enable();
            this.pauseButton.disable();
            this.resetButton.enable();
            this.saveButton.enable();
        }
        if (state === TimerState.Running) {
            this.startButton.disable();
            this.pauseButton.enable();
            this.resetButton.enable();
            this.saveButton.disable();
        }
        if (state === TimerState.Paused) {
            this.startButton.enable();
            this.pauseButton.disable();
            this.resetButton.enable();
            this.saveButton.disable();
        }
        console.log("[View] start disabled:", this.startButton.getElement().disabled);
    }

    /**
     * 一時停止ボタンが押された時、開始ボタンが再開ボタンに変わるメソッド
     * @param text 
     */
    public setStartButtonText(text: string): void {
        this.startButton.setText(text);
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

    /**
     * 保存タイマー一覧の選択状態をすべて解除する。
     * 各li要素から "selected" クラスを削除し、見た目上の選択状態をリセットする。
     */
    public clearSelection(): void {
        const liList = document.querySelectorAll("li");
        liList.forEach((li) => {
            li.classList.remove("selected");
        });

    }
    /**
     * 複数選択時の処理を外部から設定する
     * 
     * 一括解除や複数選択など、複数のタイマーが選択されたときに
     * 実行されるコールバック関数を登録する。
     * 
     * @param handler 複数選択時に呼び出される処理（Controller側の処理）
     */
    public setOnMultipleSelected(handler: () => void): void {
        this.onMultipleSelected = handler;
    }

    /**
     * タイマーがクリックされたときの処理を登録する
     *
     * タイマー要素がクリックされた際に実行される処理（handler）を受け取り、
     * View内に保持する。クリック時には登録された処理が呼び出される。
     *
     * @param handler タイマークリック時に実行されるコールバック関数
     */
    public setOnTimerClick(handler: (id: string) => void): void {
        this.onTimerClick = handler;
    }

    /**
     * 保存されているタイマー一覧（データ）を、画面の見た目に変換する役割
     * @param timers 
     */
    public renderTimers(timers: TimerSetting[]): void {
        this.container.innerHTML = "";
        for (const timer of timers) {
            const row = document.createElement("div");
            row.textContent = TimeFormatter.formatSeconds(timer.getDuration());
            row.addEventListener("click", () => {
                this.onTimerClick(timer.getId())
            });
            this.container.appendChild(row);
        };
    }

}