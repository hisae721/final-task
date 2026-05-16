import type { ButtonClickHandler } from "../../common/Button";

/**
 * タイマー表示を行うためのインターフェース
 * 
 * 時間表示や終了ダイアログ表示、
 * ダイアログ内ボタンのイベント登録を定義する。
 */
export interface IDisplay {
    /**
     * 時間表示を更新する
     * 
     * @param seconds 表示する時間（秒）
     */
    updateTime(seconds:number):void;

    /**
     * タイマー終了ダイアログを表示する
     */
    showTimerFinished():void;

    /**
     * タイマー終了ダイアログを非表示にする
     */
    hideDialog():void;

    /**
     * ダイアログの停止ボタン押下時の処理を登録する
     * 
     * @param handler 停止ボタン押下時に実行する処理
     */
    setOnDialogStopClick(handler: ButtonClickHandler):void;
}