export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "systems/gga/templates"
    "systems/gga/templates/actor/parts/actor-advantage.hbs",
    "systems/gga/templates/actor/parts/actor-skill.hbs",
    "systems/gga/templates/actor/parts/actor-spell.hbs",
    "systems/gga/templates/actor/parts/actor-equipment.hbs",
    "systems/gga/templates/actor/parts/actor-notes.hbs",
  ];

  return loadTemplates(templatePaths);
}
