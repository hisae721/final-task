
class TimeFormatter {
    formatMilliseconds(milliseconds: number): string{

    }

    formatSeconds(seconds: number): string{
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


    formatHourMinute(hour: number, minute: number): string{

    }
}