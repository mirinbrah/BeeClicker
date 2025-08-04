import { _decorator, Component, Node, Label, find } from 'cc';
import { GameData } from './GameData';

const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    @property({ type: Label }) private mainHoneyLabel: Label | null = null;
    @property({ type: Label }) private mainGoldLabel: Label | null = null;

    @property({ type: Node }) private sellMenuNode: Node | null = null;
    @property({ type: Node }) private shopMenuNode: Node | null = null;

    update(deltaTime: number) {
        if (this.mainHoneyLabel) {
            this.mainHoneyLabel.string = `${Math.floor(GameData.honey).toLocaleString()}`;
        }
        if (this.mainGoldLabel) {
            this.mainGoldLabel.string = `${Math.floor(GameData.gold).toLocaleString()}`;
        }
    }
    
    public onOpenSellMenuClick(): void {
        if (this.sellMenuNode) this.sellMenuNode.active = true;
    }
    
    public onOpenShopMenuClick(): void {
        if (this.shopMenuNode) this.shopMenuNode.active = true;
    } 
}