import { _decorator, Component, tween, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BeeMenuAnimator')
export class BeeMenuAnimator extends Component {

    public playJumpAnimation(): void {
        const jumpHeight = 30; 
        const jumpDuration = 0.15; 

        tween(this.node).stop();
        
        tween(this.node)
            .by(jumpDuration, { position: v3(0, jumpHeight, 0) }, { easing: 'quadOut' }) 
            .by(jumpDuration, { position: v3(0, -jumpHeight, 0) }, { easing: 'quadIn' }) 
            .start();
    }
}