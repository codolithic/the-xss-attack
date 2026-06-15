// /etc/nginx/njs/csp.js
import fs from "fs";

function generateNonce() {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString(
    "base64",
  );
}

function buildCsp(nonce) {
  return [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' https://js.stripe.com`,
    `style-src 'self' 'nonce-${nonce}'`,
    `frame-src https://js.stripe.com https://*.stripe.com`,
    `connect-src 'self' http://localhost:8000 https://api.stripe.com`,
    `img-src 'self' data: https://*.stripe.com`,
    `font-src 'self'`,
  ].join("; ");
}

async function serveIndex(r) {
  const nonce = generateNonce();
  console.log("Generated nonce", nonce);

  try {
    // Read file directly — no subrequest needed
    const template = fs.readFileSync(
      "/usr/share/nginx/html/index.html",
      "utf8",
    );

    const html = template.replace(/__CSP_NONCE_PLACEHOLDER__/g, nonce);

    r.headersOut["Content-Type"] = "text/html";
    r.headersOut["Content-Security-Policy"] = buildCsp(nonce);
    r.headersOut["Cache-Control"] = "no-store";

    r.return(200, html);
  } catch (e) {
    r.error(`Failed to read index.html: ${e.message}`);
    r.return(500, "Internal Server Error");
  }
}

export default { serveIndex };
