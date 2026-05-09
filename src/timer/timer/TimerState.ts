/**
 * タイマーの状態を表す列挙型
 * 
 * Initial  : 初期状態
 * Ready    : 時間が設定され開始可能な状態
 * Running  : カウントダウン状態
 * Paused   : 一時停止状態
 * Finished : 終了状態
 */
export enum TimerState {
    // 初期状態
    Initial = "Initial",
    // 時間が設定され開始可能な状態
    Ready = "Ready",
    // カウントダウン状態
    Running = "Running",
    // 一時停止状態
    Paused = "Paused",
    // 終了状態
    Finished = "Finished",
}