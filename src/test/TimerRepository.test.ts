import { describe, it, expect } from "vitest";
import { TimerRepository } from "../TimerRepository";

describe("TimerRepository", () => {
    it("最初は空になる", () => {
        const timerRepository = new TimerRepository();
        const result = timerRepository.getAll();
        expect(result.length).toBe(0);
    })
    it("4件ではfalse、5件ではtrueになる", () => {
        const timerRepository = new TimerRepository();
        timerRepository.save(10);
        timerRepository.save(20);
        timerRepository.save(30);
        timerRepository.save(40);
        const isFullBefore = timerRepository.isFull();
        expect(isFullBefore).toBe(false);
        timerRepository.save(50);
        const isFullAfter = timerRepository.isFull();
        expect(isFullAfter).toBe(true);
    })
    it("countTimersで件数が取れる", () => {
        const timerRepository = new TimerRepository();
        const saveBefore = timerRepository.countTimers();
        timerRepository.save(10);
        timerRepository.save(20);
        const saveAfter = timerRepository.countTimers();
        expect(saveBefore).toBe(0);
        expect(saveAfter).toBe(2);
    })
    it("複数保存できる", () => {
        const timerRepository = new TimerRepository();
        timerRepository.save(10);
        timerRepository.save(20);
        timerRepository.save(30);
        const result = timerRepository.getAll();
        expect(result.length).toBe(3);
    })
    it("IDが作られている", () => {
        const timerRepository = new TimerRepository();
        timerRepository.save(10);
        timerRepository.save(20);
        timerRepository.save(30);
        timerRepository.save(40);
        const timers = timerRepository.getAll();
        const id3 = timers[3].getId();
        const id0 = timers[0].getId();
        const timer3 = timerRepository.getById(id3);
        const timer0 = timerRepository.getById(id0);
        expect(timer3).toBeDefined();
        expect(timer0).toBeDefined();
        expect(timer3?.getId()).toBe("3");
        expect(timer0?.getId()).toBe("0");
    })
    it("saveしたら保存される",()=>{
        const timerRepository = new TimerRepository();
        timerRepository.save(60000);
        const timers = timerRepository.getAll();
        expect(timers.length).toBe(1);
        const duration = timers[0].getDuration();
        expect(duration).toBe(60000);
    })
    it("removeで削除できる",()=>{
        const timerRepository = new TimerRepository();
        timerRepository.save(10);
        timerRepository.save(20);
        const timers = timerRepository.getAll();
        expect(timers.length).toBe(2);
        const id = timers[0].getId();
        timerRepository.remove(id);
        const afterTimers = timerRepository.getAll();
        expect(afterTimers.length).toBe(1);
        expect(() => timerRepository.getById(id)).toThrow("該当するIDが見つかりません");
    })
    it("保存したdurationが正しく取得できる",()=>{
        const timerRepository = new TimerRepository();
        timerRepository.save(45);
        const duration = timerRepository.getAll()[0].getDuration();
        expect(duration).toBe(45);
    })
})