import { describe, it, expect, vi, afterEach } from "vitest";
import { SoundPlayer } from "../SoundPlayer";

describe("SoundPlayer", () => {
    it("startSound() を呼ぶと play() が呼ばれる", () => {
        const soundPlayer = new SoundPlayer();
        const playSpy = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
        soundPlayer.startSound();
        expect(playSpy).toHaveBeenCalled();
    })
    it("stopSound() で pause() が呼ばれる", () => {
        const soundPlayer = new SoundPlayer();
        const pauseSpy = vi.spyOn(HTMLMediaElement.prototype, "pause");
        soundPlayer.stopSound();
        expect(pauseSpy).toHaveBeenCalled();
    })
    it("再生中に startSound() すると pause() が呼ばれてから play() される", () => {
        const soundPlayer = new SoundPlayer();
        vi.spyOn(HTMLMediaElement.prototype, "paused", "get").mockReturnValue(false);
        const pauseSpy = vi.spyOn(HTMLMediaElement.prototype, "pause");
        const playSpy = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
        soundPlayer.startSound();
        expect(pauseSpy).toHaveBeenCalled();
        expect(playSpy).toHaveBeenCalled();
    });
})