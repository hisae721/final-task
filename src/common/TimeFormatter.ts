import { AlarmTime } from "../alarm/domain/alarm/AlarmTime";

/**
 * 時間の値を表示用の文字列に変換するクラス
 * 
 * 秒やミリ秒などの数値を、画面に表示しやすい形式（00:00:00 など）に変換する
 */
export class TimeFormatter {

    /**
     * 秒を時間の表示（00:00:00）に変換する
     * 
     * @param seconds 変換する時間（秒）
     * @returns 00:00:00形式の文字列
     */
    static formatSeconds(seconds: number): string {
        const hour = Math.floor(seconds / 3600);
        const remainder = seconds % 3600;
        const minute = Math.floor(remainder / 60);
        const second = remainder % 60;

        let hourString = "";
        if (hour < 10) {
            hourString = "0" + hour;
        } else {
            hourString = String(hour);
        }

        let minuteString = "";
        if (minute < 10) {
            minuteString = "0" + minute;
        } else {
            minuteString = String(minute);
        }

        let secondString = "";
        if (second < 10) {
            secondString = "0" + second;
        } else {
            secondString = String(second);
        }

        return `${hourString}:${minuteString}:${secondString}`;

    }

    // 秒を "MM:SS" 形式にフォーマットする。タイマー向け
    // formatSeconds(seconds: number): string {}

    // 時・分を "HH:MM" 形式にフォーマットする。アラーム向け
    formatHourMinute(time: AlarmTime): string {
        // 「padStart(2, "0")」 = 元の文字列が2桁に満たない場合、先頭に「0」を自動的に補完して合計2桁にする
        const hourDisplay = time.hour.toString();
        const minuteDisplay = time.minute.toString().padStart(2, "0");
        return `${hourDisplay}:${minuteDisplay}`;
    }
    // { 例: (9, 5) → "9:05" }
    // format(time: AlarmTime): string

}