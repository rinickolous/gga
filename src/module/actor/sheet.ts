import { GURPSActor } from "./entity";
declare var callback: any;

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
    activateListeners(html: JQuery<HTMLElement>) {
        super.activateListeners(html);
        html.find(".edit-toggle").click(this._onRefresh.bind(this));
        html.find(".expandcollapseicon").click(this._onCollapseToggle.bind(this));
    }

    _onRefresh(event: { preventDefault: () => void; }) {
        event.preventDefault();
        this.options.editable = !this.options.editable;
        return this._render();
    }

    _onCollapseToggle(event: { preventDefault: () => void; currentTarget: { closest: (arg0: string) => any; }; }) {
        event.preventDefault();
        const li = event.currentTarget.closest(".item");
        const item = this.actor.getOwnedItem(li.dataset.itemId);
        let itemData = duplicate(item.data);
        itemData.data.open = !itemData.data.open;
        
        return item.update(itemData);
    }

    /** @override */
    _getHeaderButtons() {
        let buttons: any = super._getHeaderButtons();

        const canConfigure: boolean = game.user.isGM || this.actor.owner;
        if (this.options.editable && canConfigure) {
            let b = [
                {
                    label: "Import",
                    class: "import",
                    icon: "fas fa-file-import",
                    onclick: (ev: any) => this._onFileImport(ev),
                },
                {
                    label: "Export",
                    class: "export",
                    icon: "fas fa-file-export",
                    onclick: (ev: any) => this._onFileExport(ev),
                }
            ];
            buttons = b.concat(buttons);
        }
        return buttons;

        return buttons;
    }

    async _onFileImport(event: { preventDefault: () => void; }) {
        event.preventDefault();

        let p = this.actor.data.data.settings.importpath;
        if (!!p) {
            let m = p.match(/.*[/\\]Data[/\\](.*)/);
            if (!!m) {
                let f = m[1].replace(/\\/g, "/");
                let xhr = new XMLHttpRequest();
                xhr.open("GET",f);
                let promise = new Promise(resolve => {
                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            let s = xhr.responseText;
                            // @ts-ignore
                            this.actor.importFromGCS(s, m[1], p)
                        } else this._openImportDialog();
                        resolve(this)
                    };
                });
                xhr.send(null);
            }
            else this._openImportDialog();
        }
        else this._openImportDialog();
    }

    async _openImportDialog() {
        new Dialog({
            title: `Import character data for: ${this.actor.name}`,
            content: await renderTemplate("systems/gga/templates/actor/import.hbs", { name: '"' + this.actor.name + '"' }),
            buttons: {
                import: {
                    icon: '<i class="fas fa-file-import"></i>',
                    label: "Import",
                    callback: html => {
                        const form = $(html).find("form")[0];
                        let files = form.data.files;
                        let file: any = null;
                        if (!files.length) {
                            return ui.notifications.error("You did not upload a data file!");
                        } else {
                            file = files[0];
                            console.log(file);
                            // @ts-ignore
                            readTextFromFile(file).then(text => this.actor.importFromGCS(text, file.name, file.path));
                        }
                    }
                },
                no: {
                    icon: '<i class="fas fa-time"></i>',
                    label: "Cancel"
                }
            },
            default: "import"
        }, {
            width: 400
        }).render(true);
    }

    async _onFileExport(event: { preventDefault: () => void; }) {
        event.preventDefault();

        let p = this.actor.data.data.settings.importpath;
        if (!!p) {
            let m = p.match(/.*[/\\]Data[/\\](.*)/);
            var fs = require('fs');
            

            var obj = { table: [] as any[]};
            obj.table.push({id:1, square:2});
            var json = JSON.stringify(obj);

            fs.writeFile('myjsonfile.json',json, 'utf8', callback);
        }
    }

    /** @override */
    getData() {
        const data: any = super.getData();

        data.config = CONFIG.GURPS;
        data.actor = data.entity;
        data.data = data.entity.data;
        data.reactions = data.data.reactions || [];
        data.conditional_modifiers = data.data.conditional_modifiers || [];

        // temp
        data.char_options = 'tEsT';
        data.editable = this.options.editable;

        this._getAttributes(data);
        this._prepareItems(data);
        this._getDR(data);
        this._getBlockLayout(data);
        
        return data;
    }

    _getAttributes(data: any) {
        let [primary,secondary,pools] = data.data.attributes.reduce((arr: Array<any>, item: any) => {
            let a = data.data.settings.attributes.find((e: { id: any; }) => e.id === item.attr_id);
            if (a.type === "pool") arr[2].push({...item, ...{"label":a.name}});
            else if (a.attribute_base.includes("$")) arr[1].push({...item, ...{"label":a.full_name ? a.full_name + " (" + a.name + ")" : a.name}});
            else arr[0].push({...item, ...{"label":a.full_name ? a.full_name + " (" + a.name + ")" : a.name}});
            return arr;
        }, [[],[],[]]);

        data.primary_attributes = primary;
        data.secondary_attributes = secondary;
        data.point_pools = pools;
    }

    _prepareItems(data: any) {
        console.log(data.items);
        let [advantages, skills, spells, carried_equipment, other_equipment, notes] = data.items.reduce((arr: Array<any>, item: any) => {
            item.img = item.img || DEFAULT_TOKEN;
            if (["advantage_container","advantage","modifier"].includes(item.type)) arr[0].push(item);
            else if (["skill_container","technique","skill"].includes(item.type)) arr[1].push(item);
            else if (["spell_container","ritual_magic_spell","spell"].includes(item.type)) arr[2].push(item);
            else if (["equipment_container","equipment","eqp_modifier"].includes(item.type)) {
                if (item.data.other) arr[4].push(item);
                else arr[3].push(item);
            }
            else if (["notes_container","notes"].includes(item.type)) arr[5].push(item);
            return arr;
        }, [[], [], [], [],[],[]]);
        console.log(carried_equipment);
        console.log(other_equipment);
        let advantages_formatted = [];
        for (let ad of advantages) if (ad.type !== "modifier") {
            ad = this._getChildren(ad,advantages);
            if (!!ad) advantages_formatted.push(ad);
        }
        let skills_formatted = [];
        for (let sk of skills) {
            sk = this._getChildren(sk,skills);
            if (!!sk) skills_formatted.push(sk);
        }
        let spells_formatted = [];
        for (let sp of spells) {
            sp = this._getChildren(sp,spells);
            if (!!sp) spells_formatted.push(sp);
        }
        let carried_equipment_formatted = [];
        for (let eq of carried_equipment) if (eq.type !== "eqp_modifier") {
            eq = this._getChildren(eq,carried_equipment);
            if (!!eq) carried_equipment_formatted.push(eq);
        }
        let other_equipment_formatted = [];
        for (let eq of other_equipment)  if (eq.type !== "eqp_modifier") {
            eq = this._getChildren(eq,other_equipment);
            if (!!eq) other_equipment_formatted.push(eq);
        }
        let notes_formatted = [];
        for (let n of notes) {
            n = this._getChildren(n,notes);
            if (!!n) notes_formatted.push(n);
        }
        data.advantages = advantages_formatted;
        data.skills = skills_formatted;
        data.spells = spells_formatted;
        data.equipment = carried_equipment_formatted;
        data.other_equipment = other_equipment_formatted;
        data.notes = notes_formatted;
    }

    _getChildren(item: { data: { parent: string; children: string | any[]; modifiers: string | any[]; notes: string;}; indent: number; children: any[]; modifiers: any[]; notes: any[];}, list: any[], indent=0) {
        console.log(item);
        if (item.data.parent !== "none" && indent === 0) return null;
        // console.log(item);
        let children = [];
        let modifiers = [];
        item.indent = indent;
        if (item.data.children?.length) for (let ch of item.data.children) {
            // console.log(ch);
            let element = list.find(e => e._id === ch);
            // console.log(element);
            let child = this._getChildren(element,list,item.indent+1);
            if (!!child) children.push(child);
        }
        if (item.data.modifiers?.length) for (let m of item.data.modifiers) {
            let mod = list.find(e => e._id === m);
            // console.log(mod);
            if (!mod?.data.disabled) modifiers.push({name:mod.name,notes:mod.data.notes});
        }
        if (item.data.children) item.children = children;
        if (item.data.modifiers) item.modifiers = modifiers;
        if (item.data.parent === "none" || item.indent !== 0) return item;
    }

    // _getChildren(item: { data: { parent: string; children: any; }; indent: number; children: any[]; },list: any[],indent=0) {
    //     // console.log(item);
    //     if (item.data.parent !== "none" && indent === 0) return;
    //     item.indent = indent;
    //     if (item.data.children) {
    //         let children = duplicate(item.data.children);
    //         item.children = [];
    //         for (let ch of children) {
    //             let element = list.find(element => element._id === ch);
    //             // console.log(item,ch,list);
    //             let item_val = this._getChildren(element,list,item.indent+1);
    //             if (!!item_val) item.children.push(item_val);
    //         }
    //     }
    //     // console.log(item.name,item.data.parent);
    //     if (item.data.parent === "none" || item.indent !== 0) {
    //         return item;
    //     }
    // }

    _getAdModifiers(item: { data: { modifiers: string | any[]; }; },list: any[]) {
        let mods = []
        // console.log("MODIFIERS",item,list);
        if (item.data.modifiers.length) for (let i of item.data.modifiers) {
            let mod = list.find(e => e._id === i);
            if (!!mod && mod.data.enabled) mods.push({name:mod.name,notes:mod.data.notes});
        }
        return mods;
    }

    // to replace
    _getDR(data: { body_plan: { name: string; roll: string; penalty: any; DR_short: any; }[]; actor: { data: { body_plan: any; }; }; }) {
        // console.log("DR",data.actor.data.body_plan);
        data.body_plan = [];
        for (let i of data.actor.data.body_plan) {
            data.body_plan.push({
                name: "gurps.location." + i.name,
                roll: (i.roll.length > 0 ? i.roll[0].toString()+(i.roll.length > 1 ? "-"+i.roll[1].toString() : "") : "-"), 
                penalty: i.penalty,
                DR_short: (i.DR.length > 0) ? i.DR[0].amount.toString() : "0"
            });
        }
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

