import rss from '@astrojs/rss';
import { Octokit } from "@octokit/core";

const ghHook = new Octokit({});

const orgInfo = await ghHook.request("GET /orgs/{org}", {
  org: "radiokociamuzyka"
});
const ghZen = await ghHook.request("GET /zen", {

});
const ghEvents = await ghHook.request("GET /orgs/{org}/events", {
  org: "radiokociamuzyka"
});



export function GET(context) {
  return rss({
    // `<title>` field in output xml
    title: orgInfo.data.login,
    // `<description>` field in output xml
    description: `${orgInfo.data.description}`,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: [],
    // (optional) inject custom xml
    customData: `<zen>${ghZen.data}</zen>`,
  });
}