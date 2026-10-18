import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import referenceMarkup from "../reference/app-root-local.html?raw";
import "./reference.css";
import "./styles.css";

function Overlay({ kind, close }) {
  const title = kind === "how" ? "How it works" : kind === "wallet" ? "Connect wallet" : "Pump.fun";
  return <div className="oldpump-overlay" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && close()}>
    <section className={`oldpump-modal ${kind}`} role="dialog" aria-modal="true" aria-label={title}>
      <button className="oldpump-close" onClick={close} aria-label="Close">×</button>
      {kind === "how" ? <>
        <h2>How it works</h2>
        <p>Pump prevents rugs by making sure that all created tokens are safe. Each coin on pump is a <em className="green">fair-launch</em> with <em className="blue">no presale</em> and <em className="orange">no team allocation.</em></p>
        <ol><li>pick a coin that you like</li><li>buy the coin on the bonding curve</li><li>sell at any time to lock in your profits or losses</li><li>when enough people buy, the coin reaches the migration threshold</li><li>liquidity is deposited and burned on the destination DEX</li></ol>
        <button className="oldpump-ready" onClick={close}>[I'm ready to pump]</button>
      </> : kind === "wallet" ? <>
        <h2>Connect wallet</h2><p className="oldpump-muted">Wallet connection is available as a UI flow in this clone. No wallet session or transaction is created automatically.</p><div className="oldpump-wallet-list"><button onClick={close}>Phantom</button><button onClick={close}>Solflare</button><button onClick={close}>Backpack</button></div><small>Demo surface only · user approval is always required.</small>
      </> : <><h2>Token</h2><p>Open a token card to inspect its captured board details.</p></>}
    </section>
  </div>;
}

function App() {
  const rootRef = useRef(null);
  const [overlay, setOverlay] = useState("how");
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const buttons = [...root.querySelectorAll("button")];
    const onClick = (event) => {
      const button = event.currentTarget;
      const text = button.textContent.trim().toLowerCase();
      if (text.includes("how it works")) return setOverlay("how");
      if (text.includes("connect wallet") || text.includes("start a new coin")) return setOverlay("wallet");
      if (text.includes("sort:") || text.includes("order:") || text === "[ << ]" || text === "[ >> ]") {
        button.dataset.active = button.dataset.active === "true" ? "false" : "true";
        button.style.outline = button.dataset.active === "true" ? "2px solid #86efac" : "";
      }
    };
    buttons.forEach((button) => button.addEventListener("click", onClick));
    const links = [...root.querySelectorAll('a[href*="/coin/"], a[href*="/token/"]')];
    const onCard = (event) => { event.preventDefault(); setOverlay("token"); };
    links.forEach((link) => link.addEventListener("click", onCard));
    return () => { buttons.forEach((button) => button.removeEventListener("click", onClick)); links.forEach((link) => link.removeEventListener("click", onCard)); };
  }, []);
  return <>
    <div ref={rootRef} className="oldpump-reference-root" dangerouslySetInnerHTML={{ __html: referenceMarkup }} />
    {overlay && <Overlay kind={overlay} close={() => setOverlay(null)} />}
    {!overlay && <button className="oldpump-reopen" onClick={() => setOverlay("how")} aria-label="Open how it works">[how it works]</button>}
  </>;
}

createRoot(document.getElementById("root")).render(<App />);
