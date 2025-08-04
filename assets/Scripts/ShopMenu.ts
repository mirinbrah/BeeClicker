import { _decorator, Component, Node, Label, Button, find } from 'cc';
import { GameData } from './GameData';
import { GameManager } from './GameManager';

const { ccclass, property } = _decorator;

@ccclass('ShopMenu')
export class ShopMenu extends Component {
    
    @property({ type: Label }) private goldLabel: Label | null = null;
    @property({ type: Button }) private dapperBeeButton: Button | null = null;
    @property({ type: Button }) private goldenBeeButton: Button | null = null;

    private gameManager: GameManager | null = null;

    onLoad() {
        this.gameManager = find("GameController")?.getComponent(GameManager);
    }
    
    update(deltaTime: number) {
        if (this.goldLabel) {
            this.goldLabel.string = `${Math.floor(GameData.gold).toLocaleString()}`;
        }

        if (this.gameManager) {
            const canAfford = GameData.gold >= this.gameManager.UPGRADE_COST;
            if (this.dapperBeeButton) this.dapperBeeButton.interactable = canAfford;
            if (this.goldenBeeButton) this.goldenBeeButton.interactable = canAfford;
        }
    }

    public onPurchaseDapperBeeClick(): void {
        this.gameManager?.purchaseDapperBeeUpgrade();
    }

    public onPurchaseGoldenBeeClick(): void {
        this.gameManager?.purchaseGoldenBeeUpgrade();
    }
    
    public onCloseClick(): void {
        this.node.active = false; 
    }
}