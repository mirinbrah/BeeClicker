import { _decorator, Component, sys } from 'cc';
import { GameData } from './GameData'; 

const { ccclass } = _decorator;

@ccclass('SaveManager')
export class SaveManager extends Component {

    private static readonly SAVE_KEY = 'beeClickerSaveData';

    onLoad() {
        this.loadGame();
    }

    public saveGame(): void {

        const saveData = {
            honey: GameData.honey,
            gold: GameData.gold,
            honeyToGoldRate: GameData.honeyToGoldRate 
        };

        const jsonString = JSON.stringify(saveData);

        sys.localStorage.setItem(SaveManager.SAVE_KEY, jsonString);
    }

    public loadGame(): void {

        const savedDataString = sys.localStorage.getItem(SaveManager.SAVE_KEY);

        if (savedDataString) {

            const savedData = JSON.parse(savedDataString);
            
            GameData.honey = savedData.honey || 0;
            GameData.gold = savedData.gold || 0;
            GameData.honeyToGoldRate = savedData.honeyToGoldRate || 2;
        } else {

            this.resetToDefaults();
        }
    }


    public resetSave(): void {

        sys.localStorage.removeItem(SaveManager.SAVE_KEY);

        this.resetToDefaults();
        console.log("Сохранение сброшено!");
    }

    private resetToDefaults(): void {
        GameData.honey = 0;
        GameData.gold = 0;
        GameData.honeyToGoldRate = 2;
    }
}


