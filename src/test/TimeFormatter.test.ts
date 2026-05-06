import { describe, it, expect} from "vitest";
import { TimeFormatter } from "../TimeFormatter";

describe("TimeFormatter",()=>{
    it("0秒を渡したら 00:00:00 になる",()=>{
        const result = TimeFormatter.formatSeconds(0);
        expect(result).toBe("00:00:00");
    })
    it("60秒を渡したら 00:01:00 になる",()=>{
        const result = TimeFormatter.formatSeconds(60);
        expect(result).toBe("00:01:00");
    })
    it("3600秒を渡したら 01:00:00 になる",()=>{
        const result = TimeFormatter.formatSeconds(3600);
        expect(result).toBe("01:00:00");
    })
    it("1:1:1 じゃなくて 01:01:01 になる",()=>{
        const result = TimeFormatter.formatSeconds(3661);
        expect(result).toBe("01:01:01");
    })
    it("61秒を渡したら、00:01:01になる",()=>{
        const result = TimeFormatter.formatSeconds(61);
        expect(result).toBe("00:01:01");
    })
    it("59秒を渡したら、00:00:59 になる",()=>{
        const result = TimeFormatter.formatSeconds(59);
        expect(result).toBe("00:00:59");
    })
})