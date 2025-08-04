import { _decorator, Component, Node, tween, v3, find, EventTouch } from 'cc';
import { GameData } from './GameData';
import { SaveManager } from './SaveManager';

const { ccclass } = _decorator;

@ccclass('Hive')
export class Hive extends Component {
    private saveManager: SaveManager | null = null;

    onLoad() {
        const gameControllerNode = find("GameController");
        if (gameControllerNode) {
            this.saveManager = gameControllerNode.getComponent(SaveManager);
        }
        this.node.on(Node.EventType.TOUCH_START, this.onHiveClick, this);
    }

    private onHiveClick(event: EventTouch): void {
        const honeyEarned = 1 + GameData.honeyPerClickBonus;
        GameData.honey += honeyEarned;

        this.playClickAnimation();
        this.saveManager?.saveGame();
    }

    private playClickAnimation(): void {
        tween(this.node)
            .to(0.05, { scale: v3(1.1, 1.1, 1) })
            .to(0.05, { scale: v3(1, 1, 1) })
            .start();
    }
    
    onDestroy() {
        this.node.off(Node.EventType.TOUCH_START, this.onHiveClick, this);
    }
}