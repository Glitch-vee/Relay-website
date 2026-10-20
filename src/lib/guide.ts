/** Alvee's "Relay - Setup Guide (v3.0)" Google Doc (anyone with the link can view). Edit the doc and the site follows. */
export const GUIDE_DOC_ID = "1zlJk1hvoLtBFLQib01DV-MeZSJPedDyp8c-5Xy1y45M";

/** Opens the doc to read. */
export const GUIDE_VIEW_URL = `https://docs.google.com/document/d/${GUIDE_DOC_ID}/view`;

/** Downloads the doc as a PDF. */
export const GUIDE_PDF_URL = `https://docs.google.com/document/d/${GUIDE_DOC_ID}/export?format=pdf`;

export const GROK_URL = "https://grok.com";

/** The prompt from the setup guide doc, word for word. */
export const GROK_PROMPT =
  "I'm using an Android app called Relay. It sends my text messages and app alerts as JSON to a webhook. Create a webhook endpoint for it and a key. Then give me a Relay setup link (relay://connect?...), or the https:// address, the header name and the key. Tell me if I need the Bearer prefix. Confirm when my first test message arrives.";
