import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const sampleTokens = [
  { id: 1, ticker: '$LECROCSC', name: 'lecrocscat', creator: '3dwJWZ', replies: 7, marketCap: 4.75, age: '12m', image: 'https://cf-ipfs.com/ipfs/QmWELA9w3rzyyQT6hS9edCgbv9ptCDjwNfecoGyeAGdHc6', desc: "kitten in crocs be leik a genius hacker bustin' out of the matrix! we he bolts, he's gonna torch 10% of le cashish and sli'n sum crocs v ai drop. Catch u on le flip side of le matrix, suckers!", color: '#ba9a78' },
  { id: 2, ticker: 'NI**A', name: 'Kendrug Lamoon', creator: 'B6Diqj', replies: 3, marketCap: 6.10, age: '18m', image: 'https://cf-ipfs.com/ipfs/QmRnVdq7PH1vqrknmJuxfgZd3an6RsyMt5Yaw9iVFLhAHr', desc: "UG): Ni**a a them big jeets, it's ju st big profit. https://t.me/kendruglamoon", color: '#a63359' },
  { id: 3, ticker: 'PEPEART', name: 'pepe earth day', creator: 'B6Diqj', replies: 8, marketCap: 8.79, age: '24m', image: 'https://cf-ipfs.com/ipfs/QmQpkAwEtsJZkXMEyjDiPposHhoRBX9odStPEa3p8E8rgP', desc: 'H: PEPE IS VERY EXCITED, HIS FAVORITE DAY OF THE YEAR IS IF NALLY HERE! PEPE LUVZ THE EA RTH AS MUCH AS HE LOVES HIS BAGS, LET US SHOW YOU HOW MUCH THAT REALLY IS!', color: '#87a84c' },
  { id: 4, ticker: 'COOL', name: 'cool cat club', creator: '4pXK7n', replies: 12, marketCap: 11.42, age: '31m', image: 'https://cf-ipfs.com/ipfs/Qme5t6PHzdzhSZgzihEQ8oFEa2ZupavqPjrMKfQSrGsA2P', desc: 'the coolest cat on the bonding curve. no roadmap, no promises, just immaculate vibes and a little bit of chaos.', color: '#3b7f99' },
  { id: 5, ticker: 'BLAST', name: 'blastoff pepe', creator: '9H4apQ', replies: 4, marketCap: 3.20, age: '38m', image: 'https://pump.fun/pepe.png', desc: 'blast off with the original green rocket frog. fair launch, no presale, no team allocation.', color: '#558a56' },
  { id: 6, ticker: 'ANON', name: 'anon mode', creator: '7xq0Pp', replies: 16, marketCap: 15.06, age: '45m', image: 'https://www.pinclipart.com/picdir/big/184-1843111_pepe-the-frog-crying-png-clipart.png', desc: 'a tiny anonymous experiment for people who enjoy the internet a little too much.', color: '#777d8a' },
];

function App() {
  const [showHow, setShowHow] = useState(true);
  const [showWallet, setShowWallet] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [sort, setSort] = useState('bump');
  const [order, setOrder] = useState('desc');
  const [animations, setAnimations] = useState(true);
  const [nsfw, setNsfw] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [chain, setChain] = useState('SOLANA');

  const tokens = useMemo(() => {
    const filtered = sampleTokens.filter((token) => `${token.name} ${token.ticker} ${token.creator}`.toLowerCase().includes(search.toLowerCase()));
    return [...filtered].sort((a, b) => {
      const factor = order === 'desc' ? -1 : 1;
      if (sort === 'market cap') return factor * (a.marketCap - b.marketCap);
      if (sort === 'replies') return factor * (a.replies - b.replies);
      return factor * (a.id - b.id);
    });
  }, [order, search, sort]);
  const pageSize = 3;
  const pageCount = Math.max(1, Math.ceil(tokens.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleTokens = tokens.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return <div className={animations ? 'app animated' : 'app'}>
    <header className="topbar">
      <div className="brand-mark" aria-label="pump.fun home"><span /> pump<span className="dot">.</span>fun</div>
      <nav className="socials"><a href="#twitter">[twitter]</a><a href="#support">[support]</a><a href="#telegram">[telegram]</a><button onClick={() => setShowHow(true)}>[how it works]</button></nav>
      <div className="ticker-row"><div className="ticker green">🟢 <b>BUF9Y3</b> bought 10,000 SOL of BLFH 🐸</div><div className="ticker blue"><b>AJ4pLl</b> created BRUNO 🐸 on 04/25/24</div></div>
      <button className="wallet-link" onClick={() => setShowWallet(true)}>[connect wallet]</button>
    </header>

    <section className="chain-row"><span>selected chain:</span><button className={chain === 'BLAST' ? 'chain selected' : 'chain'} onClick={() => setChain('BLAST')}><span className="blast-icon">◆</span> BLAST</button><button className={chain === 'SOLANA' ? 'chain selected' : 'chain'} onClick={() => setChain('SOLANA')}><span className="sol-icon">▰</span> SOLANA</button></section>
    <main>
      <button className="new-coin" onClick={() => setShowWallet(true)}>start a new coin</button>
      <div className="toolbar">
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="sort"><option value="bump">sort: bump order</option><option value="market cap">sort: market cap</option><option value="replies">sort: replies</option></select>
        <select value={order} onChange={(e) => setOrder(e.target.value)} aria-label="order"><option value="desc">order: desc</option><option value="asc">order: asc</option></select>
        <label>Show animations <button className={animations ? 'toggle on' : 'toggle'} onClick={() => setAnimations(!animations)}>{animations ? 'On' : 'Off'}</button></label>
        <label>Include nsfw <button className={nsfw ? 'toggle on' : 'toggle'} onClick={() => setNsfw(!nsfw)}>{nsfw ? 'On' : 'Off'}</button></label>
        <input className="search" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="search coins" aria-label="search coins" />
      </div>
      <div className="board">{visibleTokens.map((token) => <TokenCard key={token.id} token={token} onClick={() => setSelectedToken(token)} />)}</div>
      <div className="pagination"><button disabled={page === 1} onClick={() => setPage(Math.max(1, page - 1))}>‹ newer</button><span>page {page} / {pageCount} · sample board</span><button disabled={page >= pageCount} onClick={() => setPage(Math.min(pageCount, page + 1))}>older ›</button></div>
    </main>

    {showHow && <Modal title="How it works" onClose={() => setShowHow(false)} className="how-modal"><p>Pump prevents rugs by making sure that all created tokens are safe. Each coin on pump is a <em className="fair">fair-launch</em> with <em className="blue-text">no presale</em> and <em className="orange">no team allocation.</em></p><div className="steps"><div>step 1: pick a coin that you like</div><div>step 2: buy the coin on the bonding curve</div><div>step 3: sell at any time to lock in your profits or losses</div><div>step 4: when enough people buy on the bonding curve it reaches a market cap of $69k</div><div>step 5: $12k of liquidity is then deposited in raydium and burned</div></div><button className="ready" onClick={() => setShowHow(false)}>[I'm ready to pump]</button></Modal>}
    {showWallet && <Modal title="Connect wallet" onClose={() => setShowWallet(false)}><div className="wallet-body"><div className="wallet-orb">◎</div><p>This local clone does not connect to wallets or submit transactions.</p><span className="notice">Demo mode · no authentication</span><button className="ready" onClick={() => setShowWallet(false)}>close</button></div></Modal>}
    {selectedToken && <Modal title={`${selectedToken.name} (${selectedToken.ticker})`} onClose={() => setSelectedToken(null)}><div className="detail"><img src={selectedToken.image} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} /><div><p>{selectedToken.desc}</p><p className="detail-meta">created by {selectedToken.creator} · {selectedToken.replies} replies · market cap: ${selectedToken.marketCap.toFixed(2)}k</p></div></div></Modal>}
  </div>
}

function TokenCard({ token, onClick }) {
  return <button className="token-card" onClick={onClick}><div className="token-image-wrap" style={{ background: token.color }}><img src={token.image} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} /><span className="image-fallback">{token.ticker.slice(0, 2)}</span></div><div className="token-copy"><div className="token-meta"><span>Created by 🐸 {token.creator}</span><span>{token.age}</span></div><div className="token-metrics"><span>market cap: {token.marketCap.toFixed(2)}k</span><span>replies: {token.replies}</span></div><h2>{token.name} <small>(ticker: ${token.ticker})</small></h2><p>{token.desc}</p></div></button>
}

function Modal({ title, onClose, children, className = '' }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><section className={`modal ${className}`} role="dialog" aria-modal="true" aria-label={title}><button className="modal-close" onClick={onClose} aria-label="close">×</button><h1>{title}</h1>{children}</section></div>
}

createRoot(document.getElementById('root')).render(<App />);
