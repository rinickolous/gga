export const GURPS: any = {};

GURPS.body_type = {
	arachnoid: {
		name: 'gurps.body_type.arachnoid',
		body_plan: [
			{
				name: 'eyes',
				penalty: -9,
				roll: [],
				DR: [],
			},
			{
				name: 'brain',
				penalty: -7,
				roll: [3, 4],
				DR: [
					{
						amount: 1,
						limitation: {
							compare: 'is_anything',
							qualifier: '',
						},
					},
				],
			},
			{
				name: 'neck',
				penalty: -5,
				roll: [5],
				DR: [],
			},
			{
				name: 'face',
				penalty: -5,
				roll: [6],
				DR: [],
			},
			{
				name: 'legs_1_2',
				penalty: -2,
				roll: [7, 8],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [9, 11],
				DR: [],
			},
			{
				name: 'groin',
				penalty: -3,
				roll: [12],
				DR: [],
			},
			{
				name: 'legs_3_4',
				penalty: -2,
				roll: [13, 14],
				DR: [],
			},
			{
				name: 'legs_5_6',
				penalty: -2,
				roll: [15, 16],
				DR: [],
			},
			{
				name: 'legs_7_8',
				penalty: -2,
				roll: [17, 18],
				DR: [],
			},
			{
				name: 'vitals',
				penalty: -3,
				roll: [],
				DR: [],
			},
		],
	},
	avian: {
		name: 'gurps.body_type.avian',
		body_plan: [
			{
				name: 'eyes',
				penalty: -9,
				roll: [],
				DR: [],
			},
			{
				name: 'brain',
				penalty: -7,
				roll: [3, 4],
				DR: [
					{
						amount: 2,
						limitation: {
							compare: 'is_anything',
							qualifier: '',
						},
					},
				],
			},
			{
				name: 'face',
				penalty: -5,
				roll: [5],
				DR: [],
			},
			{
				name: 'neck',
				penalty: -5,
				roll: [6],
				DR: [],
			},

			{
				name: 'wing',
				penalty: -2,
				roll: [7, 8],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [9, 11],
				DR: [],
			},
			{
				name: 'groin',
				penalty: -3,
				roll: [12],
				DR: [],
			},
			{
				name: 'leg',
				penalty: -2,
				roll: [13, 14],
				DR: [],
			},
			{
				name: 'feet',
				penalty: -4,
				roll: [15, 16],
				DR: [],
			},
			{
				name: 'tail',
				penalty: -3,
				roll: [17, 18],
				DR: [],
			},
			{
				name: 'vitals',
				penalty: -3,
				roll: [],
				DR: [],
			},
		],
	},
	cancroid: {
		name: 'gurps.body_type.cancroid',
		body_plan: [
			{
				name: 'eyes',
				penalty: -9,
				roll: [],
				DR: [],
			},
			{
				name: 'brain',
				penalty: -7,
				roll: [3, 4],
				DR: [
					{
						amount: 2,
						limitation: {
							compare: 'is_anything',
							qualifier: '',
						},
					},
				],
			},
			{
				name: 'face',
				penalty: -5,
				roll: [5],
				DR: [],
			},
			{
				name: 'neck',
				penalty: -5,
				roll: [6],
				DR: [],
			},
			{
				name: 'arm',
				penalty: -2,
				roll: [7, 8],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [9, 12],
				DR: [],
			},
			{
				name: 'leg',
				penalty: -2,
				roll: [13, 16],
				DR: [],
			},
			{
				name: 'feet',
				penalty: -4,
				roll: [17, 18],
				DR: [],
			},
			{
				name: 'vitals',
				penalty: -3,
				roll: [],
				DR: [],
			},
		],
	},
	centaur: {
		name: 'gurps.body_type.centaur',
		body_plan: [
			{
				name: 'eyes',
				penalty: -9,
				roll: [],
				DR: [],
			},
			{
				name: 'skull',
				penalty: -7,
				roll: [3, 4],
				DR: [
					{
						amount: 2,
						limitation: {
							compare: 'is_anything',
							qualifier: '',
						},
					},
				],
			},
			{
				name: 'neck',
				penalty: -5,
				roll: [5],
				DR: [],
			},
			{
				name: 'face',
				penalty: -5,
				roll: [6],
				DR: [],
			},
			{
				name: 'foreleg',
				penalty: -2,
				roll: [7, 8],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [9, 11],
				DR: [],
			},
			{
				name: 'groin',
				penalty: -3,
				roll: [12],
				DR: [],
			},
			{
				name: 'hindleg',
				penalty: -2,
				roll: [13, 14],
				DR: [],
			},
			{
				name: 'arm',
				penalty: -2,
				roll: [15, 16],
				DR: [],
			},
			{
				name: 'extremity',
				penalty: -2,
				roll: [17, 18],
				DR: [],
			},
			{
				name: 'vitals',
				penalty: -3,
				roll: [],
				DR: [],
			},
		],
	},
	hexapod: {
		name: 'gurps.body_type.hexapod',
		body_plan: [
			{
				name: 'eyes',
				penalty: -9,
				roll: [],
				DR: [],
			},
			{
				name: 'skull',
				penalty: -7,
				roll: [3, 4],
				DR: [
					{
						amount: 2,
						limitation: {
							compare: 'is_anything',
							qualifier: '',
						},
					},
				],
			},
			{
				name: 'neck',
				penalty: -5,
				roll: [5],
				DR: [],
			},
			{
				name: 'face',
				penalty: -5,
				roll: [6],
				DR: [],
			},
			{
				name: 'foreleg',
				penalty: -2,
				roll: [7, 8],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [9, 10],
				DR: [],
			},
			{
				name: 'midleg',
				penalty: -3,
				roll: [11],
				DR: [],
			},
			{
				name: 'groin',
				penalty: -3,
				roll: [12],
				DR: [],
			},
			{
				name: 'hindleg',
				penalty: -2,
				roll: [13, 14],
				DR: [],
			},
			{
				name: 'feet',
				penalty: -4,
				roll: [15, 16],
				DR: [],
			},
			{
				name: 'midleg',
				penalty: -2,
				roll: [17, 18],
				DR: [],
			},
			{
				name: 'vitals',
				penalty: -3,
				roll: [],
				DR: [],
			},
		],
	},
	humanoid: {
		name: 'gurps.body_type.humanoid',
		body_plan: [
			{
				name: 'eyes',
				penalty: -9,
				roll: [],
				DR: [],
			},
			{
				name: 'skull',
				penalty: -7,
				roll: [3, 4],
				DR: [
					{
						amount: 2,
						limitation: {
							compare: 'is_anything',
							qualifier: '',
						},
					},
				],
			},
			{
				name: 'face',
				penalty: -5,
				roll: [5],
				DR: [],
			},
			{
				name: 'right_leg',
				penalty: -2,
				roll: [6, 7],
				DR: [],
			},
			{
				name: 'right_arm',
				penalty: -2,
				roll: [8],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [9, 10],
				DR: [],
			},
			{
				name: 'groin',
				penalty: -3,
				roll: [11],
				DR: [],
			},
			{
				name: 'left_arm',
				penalty: -2,
				roll: [12],
				DR: [],
			},
			{
				name: 'left_leg',
				penalty: -2,
				roll: [13, 14],
				DR: [],
			},
			{
				name: 'hand',
				penalty: -4,
				roll: [15],
				DR: [],
			},
			{
				name: 'feet',
				penalty: -4,
				roll: [16],
				DR: [],
			},
			{
				name: 'neck',
				penalty: -5,
				roll: [17, 18],
				DR: [],
			},
			{
				name: 'vitals',
				penalty: -3,
				roll: [],
				DR: [],
			},
		],
	},
	icthyoid: {
		name: 'gurps.body_type.icthyoid',
		body_plan: [
			{
				name: 'eyes',
				penalty: -9,
				roll: [],
				DR: [],
			},
			{
				name: 'skull',
				penalty: -7,
				roll: [3, 4],
				DR: [
					{
						amount: 2,
						limitation: {
							compare: 'is_anything',
							qualifier: '',
						},
					},
				],
			},
			{
				name: 'face',
				penalty: -5,
				roll: [5],
				DR: [],
			},
			{
				name: 'fin',
				penalty: -4,
				roll: [6],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [7, 12],
				DR: [],
			},
			{
				name: 'fin',
				penalty: -4,
				roll: [13, 16],
				DR: [],
			},
			{
				name: 'tail',
				penalty: -3,
				roll: [17, 18],
				DR: [],
			},
			{
				name: 'vitals',
				penalty: -3,
				roll: [],
				DR: [],
			},
		],
	},
	octopod: {
		name: 'gurps.body_type.octopod',
		body_plan: [
			{
				name: 'eyes',
				penalty: -9,
				roll: [],
				DR: [],
			},
			{
				name: 'brain',
				penalty: -7,
				roll: [3, 4],
				DR: [
					{
						amount: 1,
						limitation: {
							compare: 'is_anything',
							qualifier: '',
						},
					},
				],
			},
			{
				name: 'face',
				penalty: -5,
				roll: [5],
				DR: [],
			},
			{
				name: 'neck',
				penalty: -5,
				roll: [6],
				DR: [],
			},
			{
				name: 'arms_1_2',
				penalty: -2,
				roll: [7, 8],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [9, 12],
				DR: [],
			},
			{
				name: 'arms_3_4',
				penalty: -2,
				roll: [13, 14],
				DR: [],
			},
			{
				name: 'arms_5_6',
				penalty: -2,
				roll: [15, 16],
				DR: [],
			},
			{
				name: 'arms_7_8',
				penalty: -2,
				roll: [17, 18],
				DR: [],
			},
			{
				name: 'vitals',
				penalty: -3,
				roll: [],
				DR: [],
			},
		],
	},
	quadruped: {
		name: 'gurps.body_type.quadruped',
		body_plan: [
			{
				name: 'eyes',
				penalty: -9,
				roll: [],
				DR: [],
			},
			{
				name: 'brain',
				penalty: -7,
				roll: [3, 4],
				DR: [
					{
						amount: 2,
						limitation: {
							compare: 'is_anything',
							qualifier: '',
						},
					},
				],
			},
			{
				name: 'face',
				penalty: -5,
				roll: [5],
				DR: [],
			},
			{
				name: 'neck',
				penalty: -5,
				roll: [6],
				DR: [],
			},
			{
				name: 'foreleg',
				penalty: -2,
				roll: [7, 8],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [9, 11],
				DR: [],
			},
			{
				name: 'groin',
				penalty: -3,
				roll: [12],
				DR: [],
			},
			{
				name: 'hindleg',
				penalty: -2,
				roll: [13, 14],
				DR: [],
			},
			{
				name: 'feet',
				penalty: -4,
				roll: [15, 16],
				DR: [],
			},
			{
				name: 'tail',
				penalty: -3,
				roll: [17, 18],
				DR: [],
			},
			{
				name: 'vitals',
				penalty: -3,
				roll: [],
				DR: [],
			},
		],
	},
	scorpion: {
		name: 'gurps.body_type.scorpion',
		body_plan: [
			{
				name: 'eyes',
				penalty: -9,
				roll: [],
				DR: [],
			},
			{
				name: 'skull',
				penalty: -7,
				roll: [3, 4],
				DR: [
					{
						amount: 2,
						limitation: {
							compare: 'is_anything',
							qualifier: '',
						},
					},
				],
			},
			{
				name: 'face',
				penalty: -5,
				roll: [5],
				DR: [],
			},
			{
				name: 'neck',
				penalty: -5,
				roll: [6],
				DR: [],
			},
			{
				name: 'arm',
				penalty: -2,
				roll: [7, 8],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [9, 11],
				DR: [],
			},
			{
				name: 'tail',
				penalty: -3,
				roll: [12],
				DR: [],
			},
			{
				name: 'leg',
				penalty: -2,
				roll: [13, 16],
				DR: [],
			},
			{
				name: 'feet',
				penalty: -4,
				roll: [17, 18],
				DR: [],
			},
			{
				name: 'vitals',
				penalty: -3,
				roll: [],
				DR: [],
			},
		],
	},
	snakemen: {
		name: 'gurps.body_type.snakemen',
		body_plan: [
			{
				name: 'eyes',
				penalty: -9,
				roll: [],
				DR: [],
			},
			{
				name: 'skull',
				penalty: -7,
				roll: [3, 4],
				DR: [
					{
						amount: 2,
						limitation: {
							compare: 'is_anything',
							qualifier: '',
						},
					},
				],
			},
			{
				name: 'face',
				penalty: -5,
				roll: [5],
				DR: [],
			},
			{
				name: 'neck',
				penalty: -5,
				roll: [6],
				DR: [],
			},
			{
				name: 'arm',
				penalty: -2,
				roll: [7, 8],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [9, 12],
				DR: [],
			},
			{
				name: 'arm',
				penalty: -2,
				roll: [13, 14],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [15, 16],
				DR: [],
			},
			{
				name: 'hand',
				penalty: -4,
				roll: [17, 18],
				DR: [],
			},
			{
				name: 'vitals',
				penalty: -3,
				roll: [],
				DR: [],
			},
		],
	},
	squid: {
		name: 'gurps.body_type.squid',
		body_plan: [
			{
				name: 'eyes',
				penalty: -8,
				roll: [],
				DR: [],
			},
			{
				name: 'brain',
				penalty: -7,
				roll: [3, 4],
				DR: [
					{
						amount: 1,
						limitation: {
							compare: 'is_anything',
							qualifier: '',
						},
					},
				],
			},
			{
				name: 'face',
				penalty: -5,
				roll: [5],
				DR: [],
			},
			{
				name: 'neck',
				penalty: -5,
				roll: [6],
				DR: [],
			},
			{
				name: 'arms_1_2',
				penalty: -2,
				roll: [7, 8],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [9, 12],
				DR: [],
			},
			{
				name: 'extremity',
				penalty: -2,
				roll: [13, 16],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [17, 18],
				DR: [],
			},
			{
				name: 'vitals',
				penalty: -3,
				roll: [],
				DR: [],
			},
		],
	},
	vermiform: {
		name: 'gurps.body_type.vermiform',
		body_plan: [
			{
				name: 'eyes',
				penalty: -9,
				roll: [],
				DR: [],
			},
			{
				name: 'skull',
				penalty: -7,
				roll: [3, 4],
				DR: [
					{
						amount: 2,
						limitation: {
							compare: 'is_anything',
							qualifier: '',
						},
					},
				],
			},
			{
				name: 'face',
				penalty: -5,
				roll: [5],
				DR: [],
			},
			{
				name: 'neck',
				penalty: -5,
				roll: [6, 8],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [9, 18],
				DR: [],
			},
			{
				name: 'vitals',
				penalty: -3,
				roll: [],
				DR: [],
			},
		],
	},
	wingex_hexapod: {
		name: 'gurps.body_type.winged_hexapod',
		body_plan: [
			{
				name: 'eyes',
				penalty: -9,
				roll: [],
				DR: [],
			},
			{
				name: 'skull',
				penalty: -7,
				roll: [3, 4],
				DR: [
					{
						amount: 2,
						limitation: {
							compare: 'is_anything',
							qualifier: '',
						},
					},
				],
			},
			{
				name: 'neck',
				penalty: -5,
				roll: [5],
				DR: [],
			},
			{
				name: 'face',
				penalty: -5,
				roll: [6],
				DR: [],
			},
			{
				name: 'foreleg',
				penalty: -2,
				roll: [7, 8],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [9, 10],
				DR: [],
			},
			{
				name: 'midleg',
				penalty: -3,
				roll: [11],
				DR: [],
			},
			{
				name: 'wing',
				penalty: -2,
				roll: [12],
				DR: [],
			},
			{
				name: 'hindleg',
				penalty: -2,
				roll: [13, 14],
				DR: [],
			},
			{
				name: 'feet',
				penalty: -4,
				roll: [15, 16],
				DR: [],
			},
			{
				name: 'midleg',
				penalty: -2,
				roll: [17, 18],
				DR: [],
			},
			{
				name: 'vitals',
				penalty: -3,
				roll: [],
				DR: [],
			},
		],
	},
	winged_quadruped: {
		name: 'gurps.body_type.winged_quadruped',
		body_plan: [
			{
				name: 'eyes',
				penalty: -9,
				roll: [],
				DR: [],
			},
			{
				name: 'brain',
				penalty: -7,
				roll: [3, 4],
				DR: [
					{
						amount: 2,
						limitation: {
							compare: 'is_anything',
							qualifier: '',
						},
					},
				],
			},
			{
				name: 'face',
				penalty: -5,
				roll: [5],
				DR: [],
			},
			{
				name: 'neck',
				penalty: -5,
				roll: [6],
				DR: [],
			},
			{
				name: 'foreleg',
				penalty: -2,
				roll: [7, 8],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [9, 11],
				DR: [],
			},
			{
				name: 'wing',
				penalty: -2,
				roll: [12],
				DR: [],
			},
			{
				name: 'hindleg',
				penalty: -2,
				roll: [13, 14],
				DR: [],
			},
			{
				name: 'feet',
				penalty: -4,
				roll: [15, 16],
				DR: [],
			},
			{
				name: 'tail',
				penalty: -3,
				roll: [17, 18],
				DR: [],
			},
			{
				name: 'vitals',
				penalty: -3,
				roll: [],
				DR: [],
			},
		],
	},
	winged_vermiform: {
		name: 'gurps.body_type.winged_vermiform',
		body_plan: [
			{
				name: 'eyes',
				penalty: -9,
				roll: [],
				DR: [],
			},
			{
				name: 'skull',
				penalty: -7,
				roll: [3, 4],
				DR: [
					{
						amount: 2,
						limitation: {
							compare: 'is_anything',
							qualifier: '',
						},
					},
				],
			},
			{
				name: 'face',
				penalty: -5,
				roll: [5],
				DR: [],
			},
			{
				name: 'neck',
				penalty: -5,
				roll: [6, 8],
				DR: [],
			},
			{
				name: 'legs_1_2',
				penalty: -2,
				roll: [7, 8],
				DR: [],
			},
			{
				name: 'torso',
				penalty: 0,
				roll: [9, 14],
				DR: [],
			},
			{
				name: 'wing',
				penalty: -2,
				roll: [15, 18],
				DR: [],
			},
			{
				name: 'vitals',
				penalty: -3,
				roll: [],
				DR: [],
			},
		],
	},
};

GURPS.cr = {
	none: {
		name: 'gurps.advantage.cr.none',
		multiplier: 1,
	},
	'15': {
		name: 'gurps.advantage.cr.15',
		multiplier: 0.5,
	},
	'12': {
		name: 'gurps.advantage.cr.12',
		multiplier: 1,
	},
	'9': {
		name: 'gurps.advantage.cr.9',
		multiplier: 1.5,
	},
	'6': {
		name: 'gurps.advantage.cr.6',
		multiplier: 2,
	},
	'0': {
		name: 'gurps.advantage.cr.0',
		multiplier: 2.5,
	},
};

GURPS.cr_effect = {
	none: 'gurps.advantage.cr_effect.none',
	action_penalty: 'gurps.advantage.cr_effect.action_penalty',
	reaction_penalty: 'gurps.advantage.cr_effect.reaction_penalty',
	fright_check_penalty: 'gurps.advantage.cr_effect.fright_check_penalty',
	fright_check_bonus: 'gurps.advantage.cr_effect.fright_check_bonus',
	col_increase_minor: 'gurps.advantage.cr_effect.col_increase_minor',
	col_increase_major: 'gurps.advantage.cr_effect.col_increase_major',
};

GURPS.default_prereq = {
	type: "prereq_list", all: true, when_tl: { compare: "is_anything", qualifier: 0 }, prereqs: []
};

GURPS.features = {
	attribute_bonus: {
		type: "attribute_bonus",
		amount: 1,
		per_level: false,
		attribute: "st",
		limitation: ""
	},
	dr_bonus: {
		type: "dr_bonus",
		amount: 1,
		per_level: false,
		location: "torso",
		limitation: {
			compare: "is_anything",
			qualifier: ""
		}
	},
	reaction_bonus: {
		type: "reaction_bonus",
		amount: 1,
		per_level: false,
		situation: ""
	},
	conditional_modifier: {
		type: "reaction_bonus",
		amount: 1,
		per_level: false,
		situation: ""
	},
	skill_bonus: {
		type: "skill_bonus",
		amount: 1,
		per_level: false,
		selection_type: "skills_with_name",
		name: {
			compare: "is",
			qualifier: "",
		},
		specialization: {
			compare: "is_anything",
			qualifier: ""
		},
		category: {
			compare: "is_anything",
			qualifier: ""
		}
	},
	skill_point_bonus: {
		type: "skill_point_bonus",
		amount: 1,
		per_level: false,
		name: {
			compare: "is",
			qualifier: ""
		},
		specialization: {
			compare: "is_anything",
			qualifier: ""
		},
		category: {
			compare: "is_anything",
			qualifier: ""
		}
	},
	spell_bonus: {
		type: "spell_bonus",
		amount: 1,
		per_level: false,
		match: "all_colleges",
		name: {
			compare: "is",
			qualifier: ""
		},
		category: {
			compare: "is_anything",
			qualifier: ""
		}
	},
	spell_point_bonus: {
		type: "spell_point_bonus",
		amount: 1,
		per_level: false,
		match: "all_colleges",
		name: {
			compare: "is",
			qualifier: ""
		},
		category: {
			compare: "is_anything",
			qualifier: ""
		}
	},
	weapon_bonus: {
		type: "weapon_bonus",
		amount: 1,
		per_level: false,
		selection_type: "weapons_with_required_skill",
		name: {
			compare: "is",
			qualifier: ""
		},
		specialization: {
			compare: "is_anything",
			qualifier: ""
		},
		level: {
			compare: "at_least",
			qualifier: 0
		},
		category: {
			compare: "is_anything",
			qualifier: ""
		}
	},
	cost_reduction: {
		type: "cost_reduction",
		attribute: "st",
		percentage: 40
	}
};

GURPS.weapons = {
	melee_weapon: {
		type: "melee_weapon",
        damage: {
            type: "",
            st: "",
            base: "",
            armor_divisor: 0,
            fragmentation: "",
            fragmentation_armor_divisor: 0,
            fragmentation_type: "",
            modifier_per_die: ""
        },
        strength: "",
        usage: "",
        reach: "",
        parry: "",
        block: "",
		calc: {
			level: 0,
			parry: "",
			block: "",
			damage: ""
		},
        defaults: []
	},
	ranged_weapon: {
		type: "ranged_weaon",
        damage: {
            type: "",
            st: "none",
            armor_divisor: 0,
            fragmentation: "",
            fragmentation_armor_divisor: 0,
            fragmentation_type: ""
        },
        strength: "",
        usage: "",
        accuracy: "",
        range: "",
        rate_of_fire: "",
        shots: "",
        bulk: "",
        recoil: "",
		calc: {
			level: 0,
			range: "",
			damage: ""
		},
        defaults: []
	}
};

function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
GURPS.isObject = isObject;

//@ts-ignore
function mergeDeep(target: any, ...sources: any) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
        if (isObject(source[key])) {
            if (!target[key]) Object.assign(target, { [key]: {} });
            mergeDeep(target[key], source[key]);
        } else {
            Object.assign(target, { [key]: source[key] });
        }
        }
    }
	
    return mergeDeep(target, ...sources);
}
GURPS.mergeDeep = mergeDeep;