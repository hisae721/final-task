
import { ButtonOptions } from "./ButtonOptions";

export type ButtonClickHandler = (event: MouseEvent) => void;

/**
 * ボタン要素を生成して設定するクラス
 * 
 * テキスト・クラス名・有効/無効状態・クリック時の処理などを
 * まとめて指定してボタンを作成できる
 */
export class Button {
    /** ボタンとして扱うHTMLのbutton要素 */
    private buttonElement: HTMLButtonElement;

    constructor(options: ButtonOptions) {
        this.buttonElement = document.createElement("button");
        this.buttonElement.textContent = options.text;

        // クラス名をつける
        if (options.className) {
            this.buttonElement.className = options.className;
        }

        // Buttonを作るときに指定された“押せる / 押せない”設定を、
        // 実際のボタンに反映している
        if (options.disabled !== undefined) {
            this.buttonElement.disabled = options.disabled;
        }

        // onClickが渡されてたら、その関数をボタンに登録する
        if (options.onClick) {
            this.setOnClick(options.onClick);
        }
    }

    /**
     * ボタンを押下可能にする
     */
    public enable(): void {
        this.buttonElement.disabled = false;
    }

    /**
     * ボタンを押下不可にする
     */
    public disable(): void {
        this.buttonElement.disabled = true;
    }

    public hide(): void {
        this.buttonElement.classList.add("hidden");
    }

    public show(): void {
        this.buttonElement.classList.remove("hidden");
    }

    /**
     * クリック後の動作登録メソッド
     * @param handler 
     */
    public setOnClick(handler: ButtonClickHandler): void {
        this.buttonElement.addEventListener("click", handler);
    }

    /**
     * クラス名を追加するメソッド
     * @param className 
     */
    private addClass(className: string): void {
        this.buttonElement.classList.add(className);
    }

    /**
     * ボタン要素そのものを取得するメソッド
     */
    public getElement(): HTMLButtonElement {
        return this.buttonElement;
    }

    /**
     * 指定した親要素にボタンを追加する
     * @param parent 
     */
    public appendTo(parent: HTMLElement): void {
        parent.appendChild(this.buttonElement);
    }

    /**
     * ボタンの表示テキストを変更する
     * @param text 表示する文字列
     */
    public setText(text: string): void {
        this.buttonElement.textContent = text;
    }
}