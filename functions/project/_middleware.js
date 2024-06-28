class ElementHandler {
  constructor(ogtag) {
    this.ogtag = ogtag;
  }
  element(element) {
    element.append(this.ogtag, { html: true });
  }
}

class RemoveHandler {
  element(element) {
    element.remove();
  }
}

export async function onRequest(context) {
  const { request, next } = context;
  const { pathname } = new URL(request.url);

  const pathParts = pathname.split("/");
  const projectId = pathParts[pathParts.length - 1];

  let res = await next();
  let project;

  // Load project data
  try {
    const response = await fetch(
      `https://round4-api-eas.retrolist.app/projects/${projectId}`
    );
    project = await response.json();
  } catch (err) {}

  if (!project) return res;

  let ogtag;

  // these are the metatags we want to inject into the site
  ogtag = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${project.displayName} - RetroList</title>

    <meta property="og:title" content="${project.displayName} - RetroList" />
    <meta property="og:description" content="RetroList | Retro Funding 4 Project Discovery and Community Voting UI" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${request.url}" />
    <meta property="og:image" content="https://retrolist.app/og/${projectId}.png" />

    <meta property="og:image:height" content="630" />
    <meta property="og:image:width" content="1200" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${project.displayName} - RetroList" />
    <meta name="twitter:description" content="RetroList | Retro Funding 4 Project Discovery and Community Voting UI" />

    <meta name="description" content="RetroList | Retro Funding 4 Project Discovery and Community Voting UI" />
  `;

  return new HTMLRewriter()
    .on("meta", new RemoveHandler())
    .on("title", new RemoveHandler())
    .on("head", new ElementHandler(ogtag))
    .transform(res);
}
