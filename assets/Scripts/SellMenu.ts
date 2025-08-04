import { _decorator, Component, Label, find } from 'cc';
import { GameData } from './GameData';
import { GameManager } from './GameManager';

const { ccclass, property } = _decorator;

@ccclass('SellMenu')
export class SellMenu extends Component {
    @property({ type: Label }) private goldLabel: Label | null = null;
    @property({ type: Label }) private priceLabel: Label | null = null;
    
    private gameManager: GameManager | null = null;

    onLoad() {
        this.gameManager = find("GameController")?.getComponent(GameManager);
    }
    
    onEnable() {
        this.updateLabels();
    }

    update(deltaTime: number) {
        if (this.goldLabel) {
            this.goldLabel.string = `${Math.floor(GameData.gold).toLocaleString()}`;
        }
    }

    private updateLabels(): void {
        if (this.priceLabel) {
            this.priceLabel.string = `${GameData.honeyToGoldRate} GOLD per unit`;
        }
        if (this.goldLabel) {
            this.goldLabel.string = `${Math.floor(GameData.gold).toLocaleString()}`;
        }
    }

    public onSellAllHoneyClick(): void {
        this.gameManager?.sellAllHoney();
    }
    
    public onCloseClick(): void {
        this.node.active = false;
    }
}