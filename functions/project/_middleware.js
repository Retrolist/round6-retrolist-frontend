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
  const { request, next, env } = context;
  const { pathname } = new URL(request.url);

  const round = env.VITE_CURRENT_ROUND

  const pathParts = pathname.split("/");
  const projectId = pathParts[pathParts.length - 1];

  let res = await next();
  let project;

  // Load project data
  try {
    const response = await fetch(
      `https://round${round}-api-eas.retrolist.app/projects/${projectId}`
    );
    project = await response.json();
  } catch (err) {}

  if (!project) return res;

  // Check if og image exists
  let ogExists = false;
  const defaultOg = `https://round${round}.retrolist.app/img/cover-r${round}-discovery.png`
  const dynamicOg = `https://round${round}.retrolist.app/og/${projectId}.png`
  try {
    const response = await fetch(
      `https://round${round}.retrolist.app/og/${projectId}.png`
    );
    
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      ogExists = contentType && contentType.includes('image/png')
    }
  } catch (err) {}
  const ogImg = ogExists ? dynamicOg : defaultOg

  let ogtag;

  // these are the metatags we want to inject into the site
  ogtag = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${project.displayName} - RetroList</title>

    <meta property="og:title" content="${project.displayName} - RetroList" />
    <meta property="og:description" content="RetroList | Retro Funding ${round} Project Discovery and Community Voting UI" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${request.url}" />
    <meta property="og:image" content="${ogImg}" />

    <meta property="og:image:height" content="630" />
    <meta property="og:image:width" content="1200" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${project.displayName} - RetroList" />
    <meta name="twitter:description" content="RetroList | Retro Funding ${round} Project Discovery and Community Voting UI" />

    <meta name="description" content="RetroList | Retro Funding ${round} Project Discovery and Community Voting UI" />
  
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${ogImg}" />
    <meta name="fc:frame:button:1" content="View Project" />
    <meta name="fc:frame:button:1:action" content="link" />
    <meta name="fc:frame:button:1:target" content="https://round${round}.retrolist.app/project/${projectId}" />
    <meta name="fc:frame:button:2" content="Follow RetroList" />
    <meta name="fc:frame:button:2:action" content="link" />
    <meta name="fc:frame:button:2:target" content="https://warpcast.com/retrolist" />

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZVPR1DXK6R"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-ZVPR1DXK6R');
    </script>

    <script type="text/javascript">
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "nsr8gxo6ae");
    </script>
  `;

  return new HTMLRewriter()
    .on("meta", new RemoveHandler())
    .on("title", new RemoveHandler())
    .on("head", new ElementHandler(ogtag))
    .transform(res);
}
