import { _decorator, Component, Node, Label, Button, find, Color, Sprite } from 'cc';
import { GameData } from './GameData';
import { GameManager } from './GameManager';

const { ccclass, property } = _decorator;

function customPadStart(text: string, targetLength: number, padString: string): string {
    let result = text;
    while (result.length < targetLength) {
        result = padString + result;
    }
    return result;
}

@ccclass('ShopMenu')
export class ShopMenu extends Component {
    
    @property({ type: Label }) private goldLabel: Label | null = null;
    @property({ type: Button }) private dapperBeeButton: Button | null = null;
    @property({ type: Button }) private goldenBeeButton: Button | null = null;

    private gameManager: GameManager | null = null;
    
    private readonly COLOR_ACTIVE = new Color(255, 255, 255, 255);
    private readonly COLOR_INACTIVE = new Color(150, 150, 150, 255);

    onLoad() {
        this.gameManager = find("GameController")?.getComponent(GameManager);
    }
    
    update(deltaTime: number) {
        if (this.goldLabel) {
            const goldValue = Math.floor(GameData.gold);
            const formattedGold = customPadStart(goldValue.toString(), 6, '0');
            this.goldLabel.string = `GOLD\n${formattedGold}`;
        }

        if (this.gameManager) {
            const canAfford = GameData.gold >= this.gameManager.UPGRADE_COST;
            const targetColor = canAfford ? this.COLOR_ACTIVE : this.COLOR_INACTIVE;
            
            if (this.dapperBeeButton) {
                const backgroundNode = this.dapperBeeButton.node.getChildByName('Background');
                if (backgroundNode) {
                    const sprite = backgroundNode.getComponent(Sprite);
                    if (sprite) {
                        sprite.color = targetColor;
                    }
                }
            }
            
            if (this.goldenBeeButton) {
                const backgroundNode = this.goldenBeeButton.node.getChildByName('Background');
                if (backgroundNode) {
                    const sprite = backgroundNode.getComponent(Sprite);
                    if (sprite) {
                        sprite.color = targetColor;
                    }
                }
            }
        }
    }

    public onPurchaseDapperBeeClick(): void {
        if (this.gameManager && GameData.gold >= this.gameManager.UPGRADE_COST) {
            this.gameManager.purchaseDapperBeeUpgrade();
        } else {
            console.log("Недостаточно золота!");
        }
    }

    public onPurchaseGoldenBeeClick(): void {
        if (this.gameManager && GameData.gold >= this.gameManager.UPGRADE_COST) {
            this.gameManager.purchaseGoldenBeeUpgrade();
        } else {
            console.log("Недостаточно золота!");
        }
    }
    
    public onCloseClick(): void {
        this.node.active = false; 
    }
}