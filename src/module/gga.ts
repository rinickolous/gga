/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your system, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your system.
 */

// Import TypeScript modules
import { registerSettings } from './settings';
import { preloadTemplates } from './preloadTemplates';

import { GURPS } from './config';
import { GURPSItem } from './item/entity';
import { GURPSItemSheet } from './item/sheet';
import { GURPSActor } from './actor/entity';
import { GURPSActorSheet } from './actor/sheet';

// Initialize system
Hooks.once('init', async () => {
  console.log('gga | Initializing gga');

  // Assign custom classes and constants here
  CONFIG.GURPS = GURPS;

  CONFIG.Item.entityClass = GURPSItem;
  CONFIG.Actor.entityClass = GURPSActor;

  // Register custom system settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();

  Handlebars.registerHelper('concat', function () {
    let outStr = '';
    for (const arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  // Register custom sheets (if any)
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('gurps', GURPSItemSheet, { makeDefault: true });

  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('gurps', GURPSActorSheet, { makeDefault: true });
});

// Setup system
Hooks.once('setup', async () => {
  // Do anything after initialization but before
  // ready
});

// When ready
Hooks.once('ready', async () => {
  // Do anything once the system is ready
});

// Add any additional hooks if necessary
