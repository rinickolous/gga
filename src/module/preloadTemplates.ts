export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "systems/gga/templates"
    "systems/gga/templates/actor/parts/actor-advantage.hbs",
  ];

  return loadTemplates(templatePaths);
}
