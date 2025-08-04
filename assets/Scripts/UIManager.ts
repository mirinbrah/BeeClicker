import { _decorator, Component, Node, Label, find } from 'cc';
import { GameData } from './GameData';
import { GameManager } from './GameManager';
import { BeeAnimator } from './BeeMenuAnimator'; 

const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    // --- ЭЛЕМЕНТЫ ГЛАВНОГО ИНТЕРФЕЙСА ---
    @property({ type: Label, tooltip: "Текст для счётчика мёда на главном экране" }) 
    private mainHoneyLabel: Label | null = null;

    // --- ЭЛЕМЕНТЫ МЕНЮ ПРОДАЖИ (SellMenu) ---
    @property({ type: Node, tooltip: "Весь объект меню продажи, который мы будем включать/выключать" })  
    private sellMenuNode: Node | null = null;
    
    @property({ type: Label, tooltip: "Текст для счётчика золота ВНУТРИ меню продажи" }) 
    private menuGoldLabel: Label | null = null;

    @property({ type: Label, tooltip: "Текст, показывающий курс обмена ВНУТРИ меню продажи" }) 
    private menuPriceLabel: Label | null = null;

    @property({ type: [BeeAnimator], tooltip: "Пчёлы из меню продажи для анимации" }) 
    private menuBees: BeeAnimator[] = [];

    // --- Внутренние ссылки ---
    private gameManager: GameManager | null = null;

    onLoad() {
        // Находим главный игровой менеджер
        const gameControllerNode = find("GameController");
        if (gameControllerNode) {
            this.gameManager = gameControllerNode.getComponent(GameManager);
        }
    }

    // Обновляем значения на экране каждый кадр
    update(deltaTime: number) {
        // Обновляем главный счётчик мёда
        if (this.mainHoneyLabel) {
            this.mainHoneyLabel.string = `${Math.floor(GameData.honey).toLocaleString()}`;
        }
        
        // Обновляем счётчик золота в меню, только если меню активно
        if (this.sellMenuNode?.active && this.menuGoldLabel) {
            this.menuGoldLabel.string = `GOLD\n${Math.floor(GameData.gold).toLocaleString()}`;
        }
    }
    
    // --- ПУБЛИЧНЫЕ МЕТОДЫ ДЛЯ КНОПОК ---

    // Вызывается кнопкой "Продать" на главном экране
    public onOpenSellMenuClick(): void {
        if (this.sellMenuNode) {
            // Обновляем текст с курсом каждый раз при открытии
            this.updatePriceLabel();
            this.sellMenuNode.active = true;
        }
    }

    // Вызывается кнопкой "Выйти" из меню продажи
    public onCloseSellMenuClick(): void {
        if (this.sellMenuNode) {
            this.sellMenuNode.active = false;
        }
    }

    // Вызывается кнопкой "Продать" ВНУТРИ меню
    public onSellAllHoneyClick(): void {
        const wasSaleSuccessful = this.gameManager?.sellAllHoney();

        // Если продажа прошла, анимируем пчёл
        if (wasSaleSuccessful) {
            this.menuBees.forEach(bee => bee.playJumpAnimation());
        }
    }
    
    // Приватный метод для обновления текста с курсом
    private updatePriceLabel(): void {
        if (this.menuPriceLabel) {
            this.menuPriceLabel.string = `${GameData.honeyToGoldRate} GOLD per unit`;
        }
    }
}