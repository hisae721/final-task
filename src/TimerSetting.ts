
import { type TimerId } from "./types";

export class TimerSetting {
    private id: TimerId;
    private duration: number;

    constructor(id:TimerId,duration:number){
        this.id = id;
        this.duration = duration;
    }

    public getId(): TimerId{
        return this.id;
    }

    public getDuration(): number {
        return this.duration;
    }
}