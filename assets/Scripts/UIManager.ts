import { _decorator, Component, Node, Label, find } from 'cc';
import { GameData } from './GameData';
import { GameManager } from './GameManager'; // Импортируем GameManager

const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    @property({ type: Label }) private honeyLabel: Label | null = null;
    @property({ type: Label }) private goldLabel: Label | null = null;
    @property({ type: Label }) private priceLabel: Label | null = null;
    @property({ type: Node })  private sellMenu: Node | null = null;
    
    private gameManager: GameManager | null = null;

    onLoad() {
        const gameControllerNode = find("GameController");
        if (gameControllerNode) {
            this.gameManager = gameControllerNode.getComponent(GameManager);
        }
    }

    update(deltaTime: number) {
        if (this.honeyLabel) {
            this.honeyLabel.string = `HONEY\n${Math.floor(GameData.honey).toLocaleString()}`;
        }
        if (this.goldLabel) {
            this.goldLabel.string = `GOLD\n${Math.floor(GameData.gold).toLocaleString()}`;
        }
    }
    
    public onSellAllHoneyClick(): void {
        this.gameManager?.sellAllHoney();
    }

    public openSellMenu(): void {
        if (this.sellMenu) {
            this.updatePriceLabel();
            this.sellMenu.active = true;
        }
    }

    public closeSellMenu(): void {
        if (this.sellMenu) {
            this.sellMenu.active = false;
        }
    }
    
    public updatePriceLabel(): void {
        if (this.priceLabel) {
            this.priceLabel.string = `${GameData.honeyToGoldRate} GOLD per unit`;
        }
    }
}