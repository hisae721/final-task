import { TimerSetting } from "./TimerSetting";


export class TimerRepository {
    private MAX_TIMERS:number;
    private timers:TimerSetting[];

    constructor(){
        this.MAX_TIMERS=5;
        this.timers=[];
    }

    private add(timer:TimerSetting):void{
        if(this.timers.length>=this.MAX_TIMERS){
            return;
        }

        this.timers.push(timer);
    }

    private remove(id:TimerId):void{

    }
    private getById(id:TimerId):TimerSetting{

    }
    private countTimers():number{

    }
    private isFull(): boolean{

    }
    private getAll():TimerSetting[]{

    }
}