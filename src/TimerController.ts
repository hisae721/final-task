import { CountdownTimer } from "./CountdownTimer";
import { IDisplay } from "./IDisplay";
import { ISoundPlayer } from "./ISoundPlayer";
import { SoundPlayer } from "./SoundPlayer";
import { TimerView } from "./TimerView";
import { TimerState } from "./TimerState";
import { TimerRepository } from "./TimerRepository";
import { TimerId } from "./types";

/**
 * タイマー・画面表示・操作をつなぐクラス
 * 
 * ボタン操作を受け取り、タイマーの開始・停止などを制御し、
 * 表示や音の処理を呼び出す
 */
export class TimerController {
    /** タイマーの処理を行うクラス */
    private timer: CountdownTimer;
    /** 画面表示を担当するクラス */
    private display: IDisplay;
    /** 音を再生するクラス */
    private soundPlayer: ISoundPlayer;
    /** ボタンなどの操作を受け取るView */
    private timerView: TimerView;
    /** タイマー設定の保存・取得・削除を管理するリポジトリ */
    private timerRepository: TimerRepository;

    /**
     * @param timer タイマーの処理を行うインスタンス
     * @param display 表示を行うインスタンス
     * @param controlView 操作を受け取るView
     */
    constructor(timer: CountdownTimer, display: IDisplay, timerView: TimerView, timerRepository: TimerRepository) {
        this.timer = timer;
        this.display = display;
        this.timerView = timerView;
        this.timerRepository = timerRepository;
        this.soundPlayer = new SoundPlayer();
        this.timer.setOnFinished(() => {
            this.onTimerFinished();
        });
        this.timer.setOnTick((remainingTime: number) => {
            console.log("[Controller] onTick受け取った", remainingTime);
            const remainingSeconds = Math.ceil(remainingTime / 1000);
            this.display.updateTime(remainingSeconds);
        });
    }


    public onStartClicked = (): void => {
        console.log("[Controller]開始ボタン押された！");
        if (this.timer.getState() === TimerState.Paused) {
            this.timer.resume();
        } else {
            this.timer.start();
        }
        const state = this.timer.getState();
        this.timerView.updateButtons(state);
    }



    public onStopClicked = (): void => {
        this.timer.stop();
    }


    public onPauseClicked = (): void => {
        console.log("[Controller] 一時停止ボタン押された");
        this.timer.pause();
        this.timerView.setStartButtonText("再開");
        this.timerView.updateButtons(this.timer.getState());
    }

    

    public onResetClicked = (): void => {
        console.log("[Controller] リセットボタン押された");
        // Running中にリセット → 元の設定時間を表示
        // Ready中にリセット → 00:00:00を表示
        const state = this.timer.getState();
        if (state === TimerState.Running|| state === TimerState.Paused) {
            this.timer.reset();
            this.timerView.setStartButtonText("開始");
            this.timerView.updateButtons(this.timer.getState());
            const remainingSeconds = Math.ceil(this.timer.getDuration() / 1000);
            this.display.updateTime(remainingSeconds);
        } else if (state === TimerState.Ready) {
            this.timer.initialize();
            this.timerView.setStartButtonText("開始");
            this.display.updateTime(0);
            this.timerView.updateButtons(TimerState.Initial);
        }
    }

    public onSaveClicked = (): void => {
        console.log("[Controller] 保存ボタン押された");
        const duration = this.timer.getDuration();
        this.timerRepository.save(duration);
        console.log("[Controller] Repositoryに保存する");
        console.log("[Controller] 保存する時間", duration);
        const timers = this.timerRepository.getAll();
        console.log("[Controller] 取得したタイマー一覧", timers);
        console.log("[Controller] Viewに渡す直前", timers);
        this.timerView.renderSavedTimers(timers);
    }

    public onSavedTimerClicked(id: TimerId): void {
        console.log("[View] 保存済みタイマークリック", id);
        console.log("[Controller] 保存済みタイマー選択", id);

        const timerSetting = this.timerRepository.getById(id);
        console.log("[Controller] 選択されたタイマー", timerSetting);
        const duration = timerSetting.getDuration();
        this.timer.setTime(duration);
        const seconds = Math.floor(duration / 1000);
        this.display.updateTime(seconds);
        this.timerView.updateButtons(TimerState.Ready);
    }

    public onDeleteSelectedClicked = (): void => {
        console.log("[Controller] 削除ボタン押された");
        console.log("[Controller] timerViewの正体", this.timerView);
        console.log("[Controller] getSelectedTimerIds", this.timerView.getSelectedTimerIds);
        const selectedTimerIds = this.timerView.getSelectedTimerIds();
        if (selectedTimerIds.length === 0) {
            return;
        }
        selectedTimerIds.forEach((Id) => {
            this.timerRepository.remove(Id);

        });
        const all = this.timerRepository.getAll();
        this.timerView.renderSavedTimers(all);
    }

    public OnUnselectAllClicked = (): void => {
        this.timerView.clearSelection();
    }

    public onMultipleSelected = (): void => {
        this.display.updateTime(0);
    }

    /**
     * タイマー終了時に実行する処理
     */
    public onTimerFinished(): void {
        console.log("[Controller] onTimerFinished 呼ばれた!");
        this.timerView.setStartButtonText("開始");
        this.display.showTimerFinished();
        this.soundPlayer.startSound();
    }


    /**
     * ダイアログの停止ボタンを押した時の処理
     */
    public onDialogStopClicked = (): void => {
        console.log("[Controller] onDialogStopClicked 呼ばれた");
        this.timer.stop();
        console.log("[Controller] timer.stop 呼んだ");

        this.soundPlayer.stopSound();
        console.log("[Controller] soundPlayer.stopSound 呼んだ");
        this.display.updateTime(0);
        console.log("[Controller] display.updateTime(0) 呼んだ");
        this.display.hideDialog();
        console.log("[Controller] display.hideDialog 呼んだ");
    }

    /**
     * ダイアログのリセットボタンを押した時の処理
     */
    public onDialogResetClicked = (): void => {
        console.log("[Controller] ダイアログのリセットボタン押された");
        this.timer.reset();
        this.soundPlayer.stopSound();
        const remainingSeconds = Math.ceil(this.timer.getDuration() / 1000);
        this.display.updateTime(remainingSeconds);
        this.display.hideDialog();
        this.timerView.updateButtons(TimerState.Ready);
    }

    /**
     * UIで入力された時間をアプリ本体に反映するメソッド
     * その値をタイマー本体と表示に反映する
     * ①CountdownTimer に設定時間を渡す
     * ②画面表示をその時間に更新する
     * ③必要ならボタン状態を更新する
     * @param seconds 
     */
    public onTimeSet(seconds: number): void {
        this.timer.setTime(seconds);
        this.display.updateTime(seconds);
        let state: TimerState;
        if (seconds === 0) {
            state = TimerState.Initial;
        } else {
            state = TimerState.Ready;
        };
        this.timerView.updateButtons(state);
        console.log("[Controller] onTimeSet seconds:", seconds);
        console.log("[Controller] state:", state);
    }

}