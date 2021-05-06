import {GURPS} from "../config"

/** @extends { Actor } */
export class GURPSActor extends Actor {

    /** @override */
    prepareBaseData() {
        const actorData = this.data;
        this._getBodyPlan(actorData);
    }

    /** @override */
    prepareEmbeddedEntities() {
        const actorData = this.data;
        this._resetData(actorData);
        this._applyFeatures(actorData);
        for (let i of actorData.items) {
            if (i.data.parent !== "none" && i.data.parent.includes("-")) {
                i.data.parent = this.data.items.find(e => e.data.id === i.data.parent)._id;
            }
            if (i.data.children && i.data.children.length) {
                for (let c = 0; c < i.data.children.length; c++) {
                    let ch = this.data.items.find( e => e.data.id === i.data.children[c]);
                    if (!!ch && i.data.children[c].includes("-")) i.data.children.splice(c,1,ch._id);
                }
            }
            if (i.data.modifiers && i.data.modifiers.length) {
                for (let m = 0; m < i.data.modifiers.length; m++) {
                    let mod = this.data.items.find( e => e.data.id === i.data.modifiers[m]);
                    if (!!mod && i.data.modifiers[m].includes("-")) i.data.modifiers.splice(m,1,mod._id);
                }
            }
            if (["skill","technique","spell","ritual_magic_spell"].includes(i.type)) this._calculateLevel(actorData,i);
        }
        this._getWeapons(actorData);
        super.prepareEmbeddedEntities();
    }

    /** @override */
    prepareDerivedData() {
        const actorData = this.data;
        this._finalizeData(actorData);
    }

    _getBodyPlan(actorData: any) {
        actorData.data.body_plan = duplicate(GURPS.body_type[actorData.data.profile.body_type].body_plan);
    }

    _resetData(actorData: any) {
        return actorData;
    }

    _applyFeatures(actorData: any) {
        return actorData;
    }

    _calculateLevel(actorData: any, i: any) {
        return actorData;
    }

    _getWeapons(actorData: any) {
        return actorData;
    }

    _finalizeData(actorData: any) {
        return actorData;
    }

    async importFromGCS(json: any, importname: string, importpath: string) {
        let j;
        try {
            j = JSON.parse(json);
        } catch {
            ui.notifications.error(game.i18n.localize("gurps.error.invalid_file"));
            return;
        }
        let commit = {};
        console.log("Importing '"+j.profile.name+"'");
        commit = { ...commit, ...{"name": j.profile.name, "token.name": j.profile.name, "data": {created_date: j.created_date, modified_date: j.modified_date}}};
        commit = { ...commit, ...{
            "data.profile": {
                player_name: j.profile.player_name || "",
                title: j.profile.title || "",
                age: j.profile.age || "",
                birthday: j.profile.birthday || "",
                eyes: j.profile.eyes || "",
                hair: j.profile.hair || "",
                skin: j.profile.skin || "",
                handedness: j.profile.handedness || "",
                height: j.profile.height || "",
                weight: j.profile.weight || "",
                SM: j.profile.SM || 0,
                gender: j.profile.gender || "",
                body_type: j.profile.body_type || "",
                tech_level: j.profile.tech_level || "",
                religion: j.profile.religion || ""
            }
        }}
        commit = { ...commit, ...{"data.settings": { ...j.settings, ...{"rt_name":importname,"importpath":importpath}}}};
        commit = { ...commit, ...{"data.attributes": this._importAttributes(j)}};
        commit = { ...commit, ...{"items": this._importItems(j)}};
        await this.update(commit);
    }

    _importAttributes(j: any) {
        var attrs = [];
        for (let i of j.attributes) {
            attrs.push(i)
        }
        return attrs;
    }

    _importItems(j: any) {
        let items: Array<Object> = [];
        if (j.advantages) for (let ad of j.advantages) {
            items = this._parseAdvantage(items,ad);
        }
        return items;
    }

    _parseAdvantage(items: Array<any>, ad: any, parent="none") {
        let item: any;
        if (ad.type === "advantage") {
            item = {
                type: "advantage",
                name: ad.name || game.i18n.localize("gurps.item.advantage"),
                data: {
                    parent: parent,
                    id: ad.id || "",
                    based_on_id: ad.based_on_id || "",
                    based_on_hash: ad.based_on_hash || "",
                    notes: ad.notes || "",
                    categories: ad.categories || [],
                    round_down: ad.round_down || false,
                    allow_half_levels: ad.allow_half_levels || false,
                    disabled: ad.disabled || false,
                    mental: ad.mental || false,
                    physical: ad.physical || false,
                    social: ad.sociial || false,
                    exotic: ad.exotic || false,
                    supernatural: ad.supernatural || false,
                    levels: ad.levels || "",
                    base_points: ad.base_points || 0,
                    points_per_level: ad.points_per_level || 0,
                    cr: ad.cr || -1,
                    cr_adj: ad.cr_adj || "",
                    reference: ad.reference || "",
                    userdesc: ad.userdesc || "",
                    calc: {
                        points: ad.calc.points || 0,
                    },
                    prereqs: ad.prereqs || GURPS.default_prereq,
                    features: this._parseFeatures(ad.features) || [],
                    modifiers: [],
                    weapons: this._parseWeapons(ad.weapons) || []
                }
            }
        } else if (ad.type === "advantage_container") {
            item = {
                type: "advantage_container",
                name: ad.name || game.i18n.localize("gurps.item.advantage"),
                data: {
                    parent: parent,
                    id: ad.id || "",
                    disabled: ad.disabled || false,
                    container_type: ad.container_type || "group",
                    cr: ad.cr || -1,
                    cr_adj: ad.cr_adj || "",
                    userdesc: ad.userdesc || "",
                    reference: ad.reference || "",
                    notes: ad.notes || "",
                    categories: ad.categories || [],
                    open: ad.open || false,
                    calc: {
                        points: ad.calc.points || 0
                    },
                    modifiers: [],
                    children: []
                }
            }
            if (ad.children && ad.children.length) for (let ch of ad.children) {
                items = this._parseAdvantage(items,ch,ad.id);
                item.data.children.push(ch.id);
            }
        }
        if (ad.modifiers && ad.modifiers.length) for (let m of ad.modifiers) {
            items = this._parseAdvantageModifier(items,m,ad.id);
            item.data.modifiers.push(m.id);
        }
        items.push(item);
        return items;
    }

    _parseAdvantageModifier(items: Array<any>, m: any, parent="none") {
        let item;
        item = {
            type: m.type || "modifier",
            name: m.name || "Modifier",
            data: {
                version: m.version || 1,
                id: m.id || "",
                disabled: m.disabled || false,
                reference: m.reference || "",
                cost_type: m.cost_type || "percentage",
                cost: m.cost || 0,
                affects: m.affects || "total",
                features: this._parseFeatures(m.features) || [],
                notes: m.notes || "",
                levels: m.levels || 0,
                parent: parent
            }
        }
        items.push(item);
        return items;
    }

    _parseFeatures(features: Array<any>) {
        if (!features) return; 
        let f_list: Array<any> = [];
        for (let i of features) {
            let f = GURPS.mergeDeep(GURPS.features[i.type], i);
            f_list.push(f);
        }
        return f_list;
    }

    _parseWeapons(weapons: Array<any>) {
        if (!weapons) return;
        let w_list: Array<any> = [];
        for (let i of weapons) {
            let w = GURPS.mergeDeep(GURPS.weapons[i.type], i);
            w_list.push(w);
        }
        return w_list;
    }
}
