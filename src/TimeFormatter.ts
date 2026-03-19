
class TimeFormatter {
    formatMilliseconds(milliseconds: number): string{

    }

    formatSeconds(seconds: number): string{
        const hour = seconds/3600;
        const remainder = seconds%3600;
        const minute = remainder/60;
        const second = remainder%60;
    }

    formatHourMinute(hour: number, minute: number): string{

    }
}