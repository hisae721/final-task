import { describe, it, expect, vi, afterEach } from "vitest";
import { Button } from "../Button";


describe("Button", () => {
    it("初期化時にテキスト・クラス・disabledが反映される", () => {
        const button = new Button({
            text: "保存",
            className: "timer-button save-button",
            disabled: true
        });
        const container = document.createElement("div");
        button.appendTo(container);
        const buttonElement = container.querySelector("button");
        expect(buttonElement).not.toBeNull();
        expect(buttonElement!.textContent).toBe("保存");
        expect(buttonElement!.className).toBe("timer-button save-button");
        expect(buttonElement!.disabled).toBe(true);
    })
    it("enable()を呼ぶとボタンが押せる状態になる", () => {
        const button = new Button({
            text: "開始",
            className: "timer-button start-button",
            disabled: true,
        });
        button.enable();
        const container = document.createElement("div");
        button.appendTo(container);
        const buttonElement = container.querySelector("button");
        expect(buttonElement).not.toBeNull();
        expect(buttonElement!.disabled).toBe(false);
    })
    it("disable()を呼ぶとボタンが押せない状態になる", () => {
        const button = new Button({
            text: "開始",
            className: "timer-button start-button",
            disabled: false,
        });
        button.disable();
        const container = document.createElement("div");
        button.appendTo(container);
        const buttonElement = container.querySelector("button");
        expect(buttonElement).not.toBeNull();
        expect(buttonElement!.disabled).toBe(true);
    })
    it("setText()を呼ぶとボタンの文字が変わる", () => {
        const button = new Button({
            text: "開始",
            className: "timer-button start-button",
            disabled: true,
        });
        const container = document.createElement("div");
        button.appendTo(container);
        const buttonElement = container.querySelector("button");
        expect(buttonElement).not.toBeNull();
        expect(buttonElement!.textContent).toBe("開始");
        button.setText("再開");
        expect(buttonElement!.textContent).toBe("再開");
    })
    it("setOnClick()で登録した処理がクリック時に呼ばれる", () => {
        const button = new Button({
            text: "開始",
            className: "timer-button start-button",
            disabled: false,
        });
        const mockFn = vi.fn();
        const container = document.createElement("div");
        button.setOnClick(mockFn);
        button.appendTo(container);
        const buttonElement = container.querySelector("button");
        expect(buttonElement).not.toBeNull();
        buttonElement!.click();
        expect(mockFn).toHaveBeenCalledTimes(1);
    })
    it("appendTo()で指定した親要素に追加される",()=>{
        const button = new Button({
            text: "保存",
            className: "timer-button save-button",
            disabled: true
        });
        const container = document.createElement("div");
        button.appendTo(container);
        const buttonElement = container.querySelector("button");
        expect(buttonElement).not.toBeNull();
        expect(container.children.length).toBe(1);
    })
})