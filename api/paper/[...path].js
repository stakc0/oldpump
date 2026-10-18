export default async function handler(req, res) {
  const path = String(req.url || '').split('?')[0].replace(/^\/api\/paper\/?/, '');
  const url = new URL(req.url || '/', 'http://localhost');
  try {
    let target;
    if (path === 'feed/new') {
      target = new URL('https://usepaper.app/api/paper/feed/new');
      for (const [k, v] of url.searchParams) target.searchParams.set(k, v);
    } else if (path === 'dex' || path.startsWith('dex/')) {
      const mint = url.searchParams.get('mint') || path.slice('dex/'.length);
      if (!mint) return res.status(400).json({ ok: false, error: 'mint is required' });
      target = new URL(`https://api.dexscreener.com/latest/dex/tokens/${encodeURIComponent(mint)}`);
    } else if (path.startsWith('token/')) {
      const mint = path.slice('token/'.length);
      if (!mint) return res.status(400).json({ ok: false, error: 'mint is required' });
      target = new URL(`https://usepaper.app/api/paper/token/${encodeURIComponent(mint)}`);
      for (const [k, v] of url.searchParams) target.searchParams.set(k, v);
    } else return res.status(404).json({ ok: false, error: 'Not found' });
    const r = await fetch(target, { headers: { accept: 'application/json', 'user-agent': 'oldpump-live/1.0' }, signal: AbortSignal.timeout(8000) });
    const body = await r.text();
    res.setHeader('content-type', r.headers.get('content-type') || 'application/json');
    res.setHeader('cache-control', 'public, s-maxage=2, stale-while-revalidate=8');
    return res.status(r.status).send(body);
  } catch (e) { return res.status(502).json({ ok: false, error: e.message || 'Feed unavailable' }); }
}
