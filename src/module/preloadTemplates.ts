export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "systems/gga/templates"
  ];

  return loadTemplates(templatePaths);
}
