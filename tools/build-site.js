const fs=require("fs");const [src,out]=process.argv.slice(2);
let s=fs.readFileSync(src,"utf8");
const rep=(a,b)=>{if(!s.includes(a)){console.error("MISSING: "+a.slice(0,70));process.exit(1)}s=s.split(a).join(b)};
// hide the leaderboard everywhere
rep(`<h2>TODAY'S LEADERBOARD</h2>`,`<h2 id="lbHead">TODAY'S LEADERBOARD</h2>`);
rep(`</style>`,`#boardBtn,#lbHead,#board,#boardCard{display:none!important}\n</style>`);
// account copy: everything lives on this device
rep(`"You're not signed in, so your account and record are saved on this device only and you won't appear on the leaderboard."`,`"Your account and record are saved on this device."`);
rep(`GUESTS SKIP THE NAME. PROGRESS STAYS ON THIS DEVICE AND ISN'T ON THE LEADERBOARD.`,`GUESTS SKIP THE NAME. PROGRESS STAYS ON THIS DEVICE.`);
rep(`"Playing as a guest. Your record is saved on this device only and you are not on the leaderboard."`,`"Playing as a guest. Your record is saved on this device only."`);
rep(`<p>This permanently deletes your player name, record and leaderboard entry. Today's round stays used.</p>`,`<p>This permanently deletes your player name and record from this device. Today's round stays used.</p>`);
// terms: no platform sign-in, no automated checking, no leaderboard
rep(`<li>Your account is linked to the sign-in you use to open the Game. If you play without a sign-in, your progress is stored only on your device.</li>`,`<li>Your account and progress are stored only in your browser on your device. Clearing your browser data removes them.</li>`);
rep(`Do not use multiple accounts, automation, scripts or other means to replay rounds, manipulate scores or the leaderboard.`,`Do not use automation, scripts or other means to replay rounds or manipulate scores.`);
rep(` Answers not found in our built-in lists may be checked by an automated service, which can make mistakes.`,` Answers not found in our built-in lists may be looked up on Wikipedia and scored by how often their article is read, which can make mistakes.`);
rep(`Scores and leaderboards have no monetary value`,`Scores have no monetary value`);
// privacy: only device storage
rep(`<ul><li><b>Account identifier.</b> An anonymous identifier supplied by the platform you sign in with. We never see your password.</li>\n<li><b>Player name.</b> The public name you choose.</li>`,`<ul><li><b>Player name.</b> The name you choose.</li>`);
rep(`<li><b>Device storage.</b> Your music setting and, if you play without signing in, your progress, saved in your browser's local storage.</li></ul>`,`<li><b>Music setting.</b> Whether you turned sound off.</li></ul>\n<p>All of this is saved only in your browser's local storage on your device. It is never sent to us. Answers you type that aren't on our lists are looked up on Wikipedia (see below).</p>`);
rep(`<li>To show the daily leaderboard. Your player name, score and result pattern for that day are visible to other players.</li>\n<li>To check answers that are not in our built-in lists. The text of such an answer and the question are sent to an automated answer-checking service provided through our hosting platform. Do not type personal information into answers.</li></ul>`,`<li>To check answers that are not in our built-in lists. The answer text is looked up on Wikipedia, run by the Wikimedia Foundation, which receives it along with your IP address. Do not type personal information into answers.</li></ul>\n<p>The Game loads its fonts from Google Fonts, which receives your IP address as part of delivering them. The site is hosted on GitHub Pages, which may log visits under GitHub's own privacy statement.</p>`);
rep(`<p>We keep your data while your account exists. Deleting your account from the Account screen removes your profile, record and leaderboard entry. Local device data can be removed by clearing your browser's site data.</p>`,`<p>Your data stays on your device until you delete your account from the Account screen or clear your browser's site data.</p>`);
// practice copy: no leaderboard on the website
rep(`PRACTICE ROUNDS DON'T CHANGE YOUR SCORE, STREAK OR LEADERBOARD PLACE.`,`PRACTICE ROUNDS DON'T CHANGE YOUR SCORE OR STREAK.`);
rep(`Your streak and leaderboard place are unchanged.`,`Your streak is unchanged.`);
/* ---- where the site lives: change this one value when the custom domain is connected ---- */
const path=require("path");
const SITE_URL=(process.argv[4]||"https://rayahms0667.github.io/footnote/").replace(/\/?$/,"/");
const dir=path.dirname(out), host=new URL(SITE_URL).hostname;
const DESC="Footnote is a free daily retro history trivia game. Seven questions a day: name the answers nobody else would. Rare answers upgrade your pixel tank.";
const head=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#120f22">
<meta name="description" content="${DESC}">
<link rel="canonical" href="${SITE_URL}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Footnote">
<meta property="og:title" content="Footnote: daily history trivia">
<meta property="og:description" content="Seven questions a day. Name the answers nobody else would. Rare answers upgrade your tank.">
<meta property="og:url" content="${SITE_URL}">
<meta property="og:image" content="${SITE_URL}og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Footnote: a pixel tank at sunset under the words Daily history trivia">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Footnote: daily history trivia">
<meta name="twitter:description" content="Seven questions a day. Name the answers nobody else would.">
<meta name="twitter:image" content="${SITE_URL}og-image.png">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Footnote">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"VideoGame","name":"Footnote","url":SITE_URL,"description":DESC,"genre":["Trivia","Quiz","Educational"],"gamePlatform":"Web browser","applicationCategory":"Game","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"GBP"},"image":SITE_URL+"og-image.png"})}</script>
`;
const sw=`<script>if("serviceWorker" in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));</script>`;
const i=s.indexOf(`</style>`)+`</style>`.length;
s=head+s.slice(0,i)+`\n<style>html,body{margin:0}:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}[hidden]{display:none!important}</style>\n</head>\n<body>\n`+s.slice(i)+`\n<noscript><p style="font-family:monospace;color:#f6eedb;text-align:center;padding:24px">Footnote needs JavaScript turned on to play.</p></noscript>\n${sw}\n</body>\n</html>\n`;
fs.writeFileSync(out,s);console.log("built",s.length,"bytes for",SITE_URL);

/* ---- support files ---- */
const w=(f,c)=>fs.writeFileSync(path.join(dir,f),c);
w("manifest.webmanifest",JSON.stringify({name:"Footnote: daily history trivia",short_name:"Footnote",description:DESC,id:"./",start_url:"./",scope:"./",display:"standalone",orientation:"portrait",background_color:"#120f22",theme_color:"#120f22",categories:["games","education"],
  icons:[{src:"icon-192.png",sizes:"192x192",type:"image/png",purpose:"any"},{src:"icon-512.png",sizes:"512x512",type:"image/png",purpose:"any"},{src:"icon-maskable-512.png",sizes:"512x512",type:"image/png",purpose:"maskable"}]},null,2)+"\n");
const ver=require("crypto").createHash("sha1").update(s).digest("hex").slice(0,10);
w("sw.js",`/* Footnote offline support. Pages load fresh when online and fall back to the cached copy offline. */
const CACHE="footnote-${ver}";
const CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png","favicon-32.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const req=e.request; if(req.method!=="GET")return;
  const u=new URL(req.url);
  if(/(^|\.)(wikipedia|wikimedia)\.org$/.test(u.hostname))return; // answer checks always go to the network
  if(req.mode==="navigate"){
    e.respondWith(fetch(req).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put("index.html",copy));return r}).catch(()=>caches.match("index.html")));
    return;
  }
  const cacheable=u.origin===location.origin||u.hostname==="fonts.googleapis.com"||u.hostname==="fonts.gstatic.com";
  if(!cacheable)return;
  e.respondWith(caches.match(req).then(hit=>{
    const net=fetch(req).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return r}).catch(()=>hit);
    return hit||net;
  }));
});
`);
w("404.html",`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Page not found · Footnote</title><meta name="robots" content="noindex">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap">
<style>:root{color-scheme:dark}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#120f22;color:#f6eedb;font-family:"VT323",monospace;font-size:22px;padding:16px;text-align:center}
h1{font-family:"Press Start 2P",monospace;font-size:28px;text-shadow:3px 3px 0 #ff4f8b,6px 6px 0 #07060f;margin:0 0 16px}
a{display:inline-block;margin-top:20px;font-family:"Press Start 2P",monospace;font-size:12px;background:#ffd84a;color:#1a1d22;padding:14px 16px;border:4px solid #07060f;box-shadow:5px 5px 0 #07060f;text-decoration:none}</style></head>
<body><main><h1>LOST TO HISTORY</h1><p>This page isn't in the archive.</p><a href="${SITE_URL}">PLAY FOOTNOTE</a></main></body></html>
`);
w("robots.txt",`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n`);
w("sitemap.xml",`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}</loc><changefreq>daily</changefreq><priority>1.0</priority></url>\n</urlset>\n`);
const cname=path.join(dir,"CNAME");
if(!/\.github\.io$/.test(host))w("CNAME",host+"\n");else if(fs.existsSync(cname))fs.unlinkSync(cname);
console.log("support files written");
