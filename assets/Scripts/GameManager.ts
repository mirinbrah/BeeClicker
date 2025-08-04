import { _decorator, Component, find } from 'cc';
import { GameData } from './GameData';
import { SaveManager } from './SaveManager';

const { ccclass } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    private saveManager: SaveManager | null = null;
    public readonly UPGRADE_COST = 250; 

    onLoad() {
        const gameControllerNode = find("GameController");
        if (gameControllerNode) {
            this.saveManager = gameControllerNode.getComponent(SaveManager);
        }
        
        this.startPassiveIncomeTimer();
    }

    private startPassiveIncomeTimer(): void {
        this.schedule(() => {
            if (GameData.goldPerSecond > 0) {
                GameData.gold += GameData.goldPerSecond;
            }
        }, 1);
    }

    public sellAllHoney(): boolean {
        if (GameData.honey > 0) {
            const honeyToSell = Math.floor(GameData.honey);
            const goldEarned = honeyToSell * GameData.honeyToGoldRate;
            
            GameData.honey = 0;
            GameData.gold += goldEarned;
            
            this.saveManager?.saveGame();
            return true;
        }
        return false;
    }

    public purchaseDapperBeeUpgrade(): void {
        GameData.gold -= this.UPGRADE_COST;
        GameData.honeyPerClickBonus += 1;
        this.saveManager?.saveGame();
    }

    public purchaseGoldenBeeUpgrade(): void {
        GameData.gold -= this.UPGRADE_COST;
        GameData.goldPerSecond += 0.5;
        this.saveManager?.saveGame();
    }
}