import { _decorator, Component, director } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('MainMenuManager')
export class MainMenuManager extends Component {

    public startGame() {
        console.log("Кнопка 'Старт' была нажата, загружаю сцену 'Game'...");

        director.loadScene('Game');
    }
}