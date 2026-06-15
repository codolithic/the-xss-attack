import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import App from "./App.tsx";
import "./index.css";

const readNonce = (): string => {
  const metaEl = document.querySelector<HTMLMetaElement>(
    'meta[property="csp-nonce"]',
  );
  const nonceValue = metaEl?.nonce ?? "";
  return nonceValue;
};

const muiCache = createCache({
  key: "mui",
  nonce: readNonce(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CacheProvider value={muiCache}>
      <App />
    </CacheProvider>
  </StrictMode>,
);
