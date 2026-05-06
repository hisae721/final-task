import { describe, it, expect, vi, afterEach } from "vitest";
import { TimerSetting } from "../TimerSetting";

describe("TimerSetting",()=>{
    it("作成したIDが取得できる",()=>{
        const timerSetting = new TimerSetting("1", 60000);
        const id = timerSetting.getId();
        expect(id).toBe("1");
    })
    it("作成した時間が取得できる",()=>{
        const timerSetting = new TimerSetting("1", 60000);
        const duration = timerSetting.getDuration();
        expect(duration).toBe(60000);
    })
    it("IDと時間が別々に正しく保持される",()=>{
        const timerSetting = new TimerSetting("0", 1000);
        const duration = timerSetting.getDuration();
        const id = timerSetting.getId();
        expect(duration).toBe(1000);
        expect(id).toBe("0");
    })
})