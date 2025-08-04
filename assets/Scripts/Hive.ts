import { _decorator, Component, Node, tween, Vec3 , find, EventTouch, v3 } from 'cc';
import { GameData } from './GameData';
import { SaveManager } from './SaveManager';
const { ccclass } = _decorator;

@ccclass('Hive')
export class Hive extends Component {
    private saveManager: SaveManager | null = null;

    private initialScale: Vec3;

    onLoad() {
        this.initialScale = this.node.getScale();

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
        tween(this.node).stop();

        this.node.setScale(this.initialScale);

        tween(this.node)
            .to(0.05, { scale: v3(this.initialScale.x * 1.1, this.initialScale.y * 1.1, this.initialScale.z) })
            .to(0.05, { scale: this.initialScale })
            .start();
    }
    
    onDestroy() {
        this.node.off(Node.EventType.TOUCH_START, this.onHiveClick, this);
    }
}