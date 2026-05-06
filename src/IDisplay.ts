import { ButtonClickHandler } from "./Button";

export interface IDisplay {

    updateTime(seconds:number):void;

    showTimerFinished():void;

    hideDialog():void;

    setOnDialogStopClick(handler: ButtonClickHandler):void;
}