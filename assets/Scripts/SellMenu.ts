import { _decorator, Component, Label, find } from 'cc';
import { GameData } from './GameData';
import { GameManager } from './GameManager';
import { BeeMenuAnimator } from './BeeMenuAnimator'; 

const { ccclass, property } = _decorator;

function customPadStart(text: string, targetLength: number, padString: string): string {
    let result = text;
    while (result.length < targetLength) {
        result = padString + result;
    }
    return result;
}

@ccclass('SellMenu')
export class SellMenu extends Component {
    @property({ type: Label }) private goldLabel: Label | null = null;
    @property({ type: Label }) private priceLabel: Label | null = null;
    @property({ type: [BeeMenuAnimator], tooltip: "Пчелы внутри этого меню для анимации" }) 
    private beesToAnimate: BeeMenuAnimator[] = [];
    
    private gameManager: GameManager | null = null;

    onLoad() {
        this.gameManager = find("GameController")?.getComponent(GameManager);
    }
    
    onEnable() {
        this.updateLabels();
    }

    update(deltaTime: number) {
        if (this.goldLabel) {
            const goldValue = Math.floor(GameData.gold);
            const formattedGold = customPadStart(goldValue.toString(), 6, '0');
            this.goldLabel.string = `GOLD\n${formattedGold}`;
        }
    }

    private updateLabels(): void {
        if (this.priceLabel) {
            this.priceLabel.string = `${GameData.honeyToGoldRate} GOLD per unit`;
        }
        if (this.goldLabel) {
            const goldValue = Math.floor(GameData.gold);
            const formattedGold = customPadStart(goldValue.toString(), 6, '0');
            this.goldLabel.string = `GOLD\n${formattedGold}`;
        }
    }

    public onSellAllHoneyClick(): void {

        const saleWasSuccessful = this.gameManager?.sellAllHoney();
        
        if (saleWasSuccessful) {
            this.beesToAnimate.forEach(bee => {
                bee.playJumpAnimation();
            });
        }
    }
    
    public onCloseClick(): void {
        this.node.active = false;
    }
}