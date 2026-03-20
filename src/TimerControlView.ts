import { Button } from "./Button"
import { ButtonOptions } from "./ButtonOptions";
import { ButtonClickHandler } from "./Button";
import { TimerState } from "./TimerState";


export class TimerControlView {
    private container: HTMLElement;
    private startButton: Button;
    private pauseButton: Button;
    private resetButton: Button;
    private saveButton: Button;

    constructor(container:HTMLElement){
        this.container=container;
        this.startButton=new Button({text:"開始"});
        this.pauseButton=new Button({text:"一時停止"});
        this.resetButton=new Button({text:"リセット"});
        this.saveButton=new Button({text:"保存"});
    }

    /**
     * 開始ボタンがクリックされたときにhandlerを実行するように登録する
     * @param handler 
     */
    public setOnStartClick(handler: ButtonClickHandler): void{
        this.startButton.buttonElement.addEventListener("click",handler);
    }

    public setOnPauseClick(handler: ButtonClickHandler): void{
        this.pauseButton.buttonElement.addEventListener("click",handler);
    }

    public setOnResetClick(handler: ButtonClickHandler): void{
        this.resetButton.buttonElement.addEventListener("click",handler);
    }

    public setOnSaveClick(handler: ButtonClickHandler): void{
        this.saveButton.buttonElement.addEventListener("click",handler);
    }

    /**
     * タイマーの状態に応じて、どのボタンを押せる状態にするか・押せない状態
     * （グレーアウト）にするかを条件分岐でまとめて決めるためのメソッド
     * タイマーの状態を見て、複数のボタンの状態をまとめて更新する
     * @param TimerState
     */
    public updateButtons(state: TimerState): void{
        if(state===TimerState.Ready){
            this.startButton.disable();
            this.pauseButton.disable();
            this.resetButton.disable();
            this.saveButton.disable();
        }
    }

    /**
     * 一時停止ボタンが押された時、開始ボタンが再開ボタンに変わるメソッド
     * @param text 
     */
    public setStartButtonText(text:string): void{

    }
}