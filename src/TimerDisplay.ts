import { IDisplay } from "./IDisplay";
import { TimeFormatter } from "./TimeFormatter";

export class TimerDisplay implements IDisplay{
    private formatter: TimeFormatter;
    private element:HTMLElement;

    constructor(element:HTMLElement){
        this.formatter=new TimeFormatter();
        this.element=element;
    }

    showTimerFinished():void{
        console.log("タイマーが終了しました");
    }
    showError():void{

    }
    updateTime(seconds:number):void{
        const formattedTime =this.formatter.formatSeconds(seconds);
        this.element.textContent=formattedTime;
    }
}