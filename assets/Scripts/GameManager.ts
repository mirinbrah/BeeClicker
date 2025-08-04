import { _decorator, Component, find } from 'cc';
import { GameData } from './GameData';
import { SaveManager } from './SaveManager';

const { ccclass } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private saveManager: SaveManager | null = null;

    onLoad() {
        const gameControllerNode = find("GameController");
        if (gameControllerNode) {
            this.saveManager = gameControllerNode.getComponent(SaveManager);
        }
    }

    public sellAllHoney(): void {
        if (GameData.honey > 0) {
            const honeyToSell = Math.floor(GameData.honey);
            const goldEarned = honeyToSell * GameData.honeyToGoldRate;
            
            GameData.honey = 0;
            GameData.gold += goldEarned;
            
            console.log(`Продано ${honeyToSell} мёда за ${goldEarned} золота.`);
            this.saveManager?.saveGame();
        } else {
            console.log("Нет мёда для продажи.");
        }
    }

    //TBA

}