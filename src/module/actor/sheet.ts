/** @extends { ActorSheet } */
export class GURPSActorSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        // @ts-ignore
        return mergeObject(super.defaultOptions, {
            classes: ['gurps', 'sheet', 'actor'],
            template: "systems/gga/templates/actor/character-sheet-gcs.hbs",
            width: 840
        })
    }

    /** @override */
    getData() {
        const data: any = super.getData();

        data.config = CONFIG.GURPS;
        data.actor = data.entity;
        data.data = data.entity.data;
        data.reactions = data.data.reactions || [];
        data.conditional_modifiers = data.data.conditional_modifiers || [];

        this._getBlockLayout(data);
        
        return data;
    }

    _getBlockLayout(data: any) {
        data.block_layout = "'personal personal' 'stats stats'";
        for (let i of data.actor.data.settings.block_layout) {
            let add = "";
            let arr = [];
            for (let j of i.split(" ")) {
                if (!!data[j] && data[j].length > 0) {
                    arr.push(j);
                }
            }
            if (arr.length === 1) arr.push(arr[0]);
            if (arr.length > 0) {
                add = add.concat("'",arr[0]," ",arr[1],"'");
                data.block_layout = data.block_layout.concat(" ",add);
            }
        }
        data.block_layout = data.block_layout.concat(" 'footer footer'",);
        return data;
    }
}
