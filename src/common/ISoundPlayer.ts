/**
 * 通知音の再生・停止を行うためのインターフェース
 */
export interface ISoundPlayer {
    /**
     * 通知音を再生する
     */
    startSound():void
    /**
     * 通知音を停止する
     */
    stopSound():void
}


