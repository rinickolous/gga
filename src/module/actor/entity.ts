import {GURPS} from "../config"
import { GURPSItem } from "../item/entity";

/** @extends { Actor } */
export class GURPSActor extends Actor {

    /** @override */
    async update(data: Data, options: Options= {}) {
        console.log("update data",data);
        return super.update(data,options);
    }

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
                i.data.parent = this.data.items.find(e => e.data.id === i.data.parent)?._id;
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
        let commit: Data;
        console.log("Importing '"+j.profile.name+"'");
        commit = { ...commit, ...{"name": j.profile.name, "token.name": j.profile.name, "data.created_date": j.created_date, "data.modified_date": j.modified_date}};
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
        let items: Array<any> = [];
        if (j.advantages) for (let ad of j.advantages) {
            items = this._parseAdvantage(items,ad);
        }
        if (j.skills) for (let sk of j.skills) {
            items = this._parseSkill(items,sk);
        }
        if (j.spells) for (let sp of j.spells) {
            items = this._parseSpell(items,sp);
        }
        if (j.equipment) for (let eq of j.equipment) {
            items = this._parseEquipment(items,eq,false);
        }
        if (j.other_equipment) for (let eq of j.other_equipment) {
            items = this._parseEquipment(items,eq,true);
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
                name: ad.name || game.i18n.localize("gurps.item.advantage_container"),
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
        console.log(item);
        items.push(item);
        return items;
    }

    _parseAdvantageModifier(items: Array<any>, m: any, parent="none") {
        let item;
        item = {
            type: "modifier",
            name: m.name || game.i18n.localize("gurps.item.modifier"),
            data: {
                id: m.id || "",
                based_on_id: m.based_on_id || "",
                based_on_hash: m.based_on_hash || "",
                reference: m.reference || "",
                notes: m.notes || "",
                userdesc: m.userdesc || "",
                categories: m.categories || [],
                parent: parent,
                disabled: m.disabled || false,
                cost_type: m.cost_type || "percentage",
                cost: m.cost || 0,
                affects: m.affects || "total",
                features: this._parseFeatures(m.features) || [],
                levels: m.levels || 0
            }
        }
        console.log(item);
        items.push(item);
        return items;
    }

    _parseSkill(items: Array<any>, sk: any, parent="none") {
        let item;
        if (sk.type === "skill") {
            item = {
                type: "skill",
                name: sk.name || game.i18n.localize("gurps.item.skill"),
                data: {
                    id: sk.id || "",
                    based_on_id: sk.based_on_id || "",
                    based_on_hash: sk.based_on_hash || "",
                    reference: sk.reference || "",
                    notes: sk.notes || "",
                    userdesc: sk.userdesc || "",
                    categories: sk.categories || [],
                    parent: parent,
                    prereqs: sk.prereqs || GURPS.default_prereq,
                    specialization: sk.specialization || "",
                    tech_level: sk.tech_level || "",
                    difficulty: sk.difficulty || "dx/a",
                    encumbrance_penalty_multiplier: sk.encumbrance_penalty_multiplier || 0,
                    points: sk.points || 1,
                    defaults: sk.defaults || [],
                    defaulted_from: sk.defaulted_from || {},
                    features: this._parseFeatures(sk.features) || [],
                    weapons: this._parseWeapons(sk.weapons) || [],
                    calc: {
                        level: sk.calc.level || 0,
                        rsl: sk.calc.rsl || "",
                    }
                }
            }
        } else if (sk.type === "technique") {
            item = {
                type: "technique",
                name: sk.name || game.i18n.localize("gurps.item.technique"),
                data: {
                    id: sk.id || "",
                    based_on_id: sk.based_on_id || "",
                    based_on_hash: sk.based_on_hash || "",
                    reference: sk.reference || "",
                    notes: sk.notes || "",
                    userdesc: sk.userdesc || "",
                    categories: sk.categories || [],
                    parent: parent,
                    difficulty: sk.difficulty || "A",
                    points: sk.points || 1,
                    weapons: this._parseWeapons(sk.weapons) || [],
                    limit: sk.limit || 0,
                    default: {
                        type: sk.default.type || "skill",
                        name: sk.default.name || "",
                        specialization: sk.default.specialization || "",
                        modifier: sk.default.modifier || 0,
                    },
                    prereqs: sk.prereqs || GURPS.default_prereq,
                    features: this._parseFeatures(sk.features) || [],
                    calc: {
                        level: sk.calc.level || 0,
                        rsl: sk.calc.rsl || "",
                    }
                }
            }
        } else if (sk.type === "skill_container") {
            item = {
                type: "skill_container",
                name: sk.name || game.i18n.localize("gurps.item.skill_container"),
                data: {
                    id: sk.id || "",
                    based_on_id: sk.based_on_id || "",
                    based_on_hash: sk.based_on_hash || "",
                    reference: sk.reference || "",
                    notes: sk.notes || "",
                    userdesc: sk.userdesc || "",
                    categories: sk.categories || [],
                    parent: parent,
                    open: sk.open || false,
                    children: []
                }
            }
            if (sk.children && sk.children.length) for (let ch of sk.children) {
                items = this._parseSkill(items,ch,sk.id);
                item.data.children.push(ch.id);
            }
        }
        console.log(item);
        items.push(item);
        return items;
    }

    _parseSpell(items: Array<any>, sp: any, parent="none") {
        let item;
        if (sp.type === "spell") {
            item = {
                type: "spell",
                name: sp.name || game.i18n.localize("gurps.item.spell"),
                data: {
                    id: sp.id || "",
                    based_on_id: sp.based_on_id || "",
                    based_on_hash: sp.based_on_hash || "",
                    reference: sp.reference || "",
                    notes: sp.notes || "",
                    userdesc: sp.userdesc || "",
                    categories: sp.categories || [],
                    parent: parent,
                    prereqs: sp.prereqs || GURPS.default_prereq,
                    college: sp.college || [],
                    spell_class: sp.spell_class || "",
                    casting_cost: sp.casting_cost || "",
                    maintenance_cost: sp.maintenance_cost || "",
                    resist: sp.resist || "",
                    casting_time: sp.casting_time || "",
                    duration: sp.duration || "",
                    difficulty: sp.difficulty || "iq/h",
                    power_source: sp.power_source || "",
                    points: !!sp.points ? sp.points : 1,
                    calc: {
                        level: sp.calc.level || 0,
                        rsl: sp.calc.rsl || "",
                    },
                    tech_level: sp.tech_level || "",
                    weapons: this._parseWeapons(sp.weapons) || [],
                }
            }
        } else if (sp.type === "ritual_magic_spell") {
            item = {
                type: "ritual_magic_spell",
                name: sp.name || game.i18n.localize("gurps.item.spell"),
                data: {
                    id: sp.id || "",
                    based_on_id: sp.based_on_id || "",
                    based_on_hash: sp.based_on_hash || "",
                    reference: sp.reference || "",
                    notes: sp.notes || "",
                    userdesc: sp.userdesc || "",
                    categories: sp.categories || [],
                    parent: parent,
                    base_skill: sp.base_skill || "",
                    prereq_count: sp.prereq_count || 0,
                    prereqs: sp.prereqs || GURPS.default_prereq,
                    college: sp.college || [],
                    spell_class: sp.spell_class || "",
                    casting_cost: sp.casting_cost || "",
                    maintenance_cost: sp.maintenance_cost || "",
                    resist: sp.resist || "",
                    casting_time: sp.casting_time || "",
                    duration: sp.duration || "",
                    difficulty: sp.difficulty || "iq/h",
                    power_source: sp.power_source || "",
                    points: !!sp.points ? sp.points : 1,
                    calc: {
                        level: sp.calc.level || 0,
                        rsl: sp.calc.rsl || "",
                    },
                    tech_level: sp.tech_level || "",
                    weapons: this._parseWeapons(sp.weapons) || [],
                }
            }
        } else if (sp.type === "spell_container") {
            item = {
                type: "spell_container",
                name: sp.name || game.i18n.localize("gurps.item.spell_container"),
                data: {
                    id: sp.id || "",
                    based_on_id: sp.based_on_id || "",
                    based_on_hash: sp.based_on_hash || "",
                    reference: sp.reference || "",
                    notes: sp.notes || "",
                    userdesc: sp.userdesc || "",
                    categories: sp.categories || [],
                    parent: parent,
                    open: sp.open || false,
                    children: []
                }
            }
            if (sp.children && sp.children.length) for (let ch of sp.children) {
                items = this._parseSpell(items,ch,sp.id);
                item.data.children.push(ch.id);
            }
        }
        console.log(item);
        items.push(item);
        return items;
    }

    _parseEquipment(items: Array<any>, eq: any, other: boolean, parent="none") {
        let item;
        if (eq.type === "equipment") {
            item = {
                type: "equipment",
                name: eq.description || game.i18n.localize("gurps.item.equipment"),
                data: {
                    id: eq.id || "",
                    based_on_id: eq.based_on_id || "",
                    based_on_hash: eq.based_on_hash || "",
                    reference: eq.reference || "",
                    notes: eq.notes || "",
                    userdesc: eq.userdesc || "",
                    categories: eq.categories || [],
                    parent: parent,
                    prereqs: eq.prereqs || GURPS.default_prereq,
                    other: other,
                    quantity: eq.quantity || 1,
                    value: eq.value || "",
                    ignore_weight_for_skills: eq.ignore_weight_for_skills || false,
                    weight: eq.weight || "",
                    tech_level: eq.tech_level || "",
                    legality_class: eq.legality_class || "",
                    equipped: !!eq.equipped ? eq.equipped : true,
                    uses: eq.uses || 0,
                    max_uses: eq.max_uses || 0,
                    weapons: this._parseWeapons(eq.weapons) || [],
                    features: this._parseFeatures(eq.features) || [],
                    modifiers: []
                }
            }
        } else if (eq.type === "equipment_container") {
            item = {
                type: "equipment_container",
                name: eq.description || game.i18n.localize("gurps.item.equipment_container"),
                data: {
                    id: eq.id || "",
                    based_on_id: eq.based_on_id || "",
                    based_on_hash: eq.based_on_hash || "",
                    reference: eq.reference || "",
                    notes: eq.notes || "",
                    userdesc: eq.userdesc || "",
                    categories: eq.categories || [],
                    parent: parent,
                    prereqs: eq.prereqs || GURPS.default_prereq,
                    other: other,
                    quantity: eq.quantity || 1,
                    value: eq.value || "",
                    ignore_weight_for_skills: eq.ignore_weight_for_skills || false,
                    weight: eq.weight || "",
                    tech_level: eq.tech_level || "",
                    legality_class: eq.legality_class || "",
                    equipped: !!eq.equipped ? eq.equipped : true,
                    uses: eq.uses || 0,
                    max_uses: eq.max_uses || 0,
                    weapons: this._parseWeapons(eq.weapons) || [],
                    features: this._parseFeatures(eq.features) || [],
                    modifiers: [],
                    children: []
                }
            }
            if (eq.children && eq.children.length) for (let ch of eq.children) {
                items = this._parseEquipment(items,ch,eq.id);
                item.data.children.push(ch.id);
            }
        }
        if (eq.modifiers && eq.modifiers.length) for (let m of eq.modifiers) {
            items = this._parseEquipmentModifier(items,m,other,eq.id);
            item.data.modifiers.push(m.id);
        }
        console.log(item);
        items.push(item);
        return items;
    }

    _parseEquipmentModifier(items: Array<any>, m: any, other: boolean, parent="none") {
        let item;
        item = {
            type: "eqp_modifier",
            name: m.name || game.i18n.localize("gurps.item.eqp_modifier"),
            data: {
                id: m.id || "",
                based_on_id: m.based_on_id || "",
                based_on_hash: m.based_on_hash || "",
                reference: m.reference || "",
                notes: m.notes || "",
                userdesc: m.userdesc || "",
                categories: m.categories || [],
                parent: parent,
                disabled: m.disabled || false,
                cost_type: m.cost_type || "to_original_cost",
                cost: m.cost || "+0",
                weight_type: m.weight_type || "to_original_weight",
                weight: m.weight || "+0 lb",
                features: this._parseFeatures(m.features) || [],
                other: other
            }
        }
        console.log(item);
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
