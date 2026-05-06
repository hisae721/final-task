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
    static formatSeconds(seconds: number): string{
        const hour = Math.floor(seconds/3600);
        const remainder = seconds%3600;
        const minute = Math.floor(remainder/60);
        const second = remainder%60;

        let hourString="";
        if(hour<10){
            hourString = "0" + hour;
        }else{
            hourString=String(hour);
        }

        let minuteString="";
        if(minute<10){
            minuteString = "0" + minute;
        }else{
            minuteString=String(minute);
        }

        let secondString="";
        if(second<10){
            secondString = "0" + second;
        }else{
            secondString=String(second);
        }

        return `${hourString}:${minuteString}:${secondString}`;
        
    }

}