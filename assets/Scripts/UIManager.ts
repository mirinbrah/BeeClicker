import { _decorator, Component, Node, Label, find } from 'cc';
import { GameData } from './GameData';

const { ccclass, property } = _decorator;

function customPadStart(text: string, targetLength: number, padString: string): string {
    let result = text;
    while (result.length < targetLength) {
        result = padString + result;
    }
    return result;
}

@ccclass('UIManager')
export class UIManager extends Component {
    @property({ type: Label }) private mainHoneyLabel: Label | null = null;
    @property({ type: Label }) private mainGoldLabel: Label | null = null;
    @property({ type: Node }) private sellMenuNode: Node | null = null;
    @property({ type: Node }) private shopMenuNode: Node | null = null;

    update(deltaTime: number) {
        if (this.mainHoneyLabel) {
            this.mainHoneyLabel.string = `HONEY\n${Math.floor(GameData.honey).toLocaleString()}`;
        }
        if (this.mainGoldLabel) {
            const goldValue = Math.floor(GameData.gold);
            const formattedGold = customPadStart(goldValue.toString(), 6, '0');
            this.mainGoldLabel.string = `GOLD\n${formattedGold}`;
        }
    }
    
    public onOpenSellMenuClick(): void {
        if (this.sellMenuNode) this.sellMenuNode.active = true;
    }
    
    public onOpenShopMenuClick(): void {
        if (this.shopMenuNode) this.shopMenuNode.active = true;
    }
}