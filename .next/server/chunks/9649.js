"use strict";exports.id=9649,exports.ids=[9649],exports.modules={69649:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(r,{resolveRobots:function(){return n},resolveSitemap:function(){return l},resolveManifest:function(){return i},resolveRouteData:function(){return s}});let o=t(91406);function n(e){let r="",t=Array.isArray(e.rules)?e.rules:[e.rules];for(let e of t){let t=(0,o.resolveArray)(e.userAgent||["*"]);for(let e of t)r+=`User-Agent: ${e}
`;if(e.allow){let t=(0,o.resolveArray)(e.allow);for(let e of t)r+=`Allow: ${e}
`}if(e.disallow){let t=(0,o.resolveArray)(e.disallow);for(let e of t)r+=`Disallow: ${e}
`}e.crawlDelay&&(r+=`Crawl-delay: ${e.crawlDelay}
`),r+="\n"}if(e.host&&(r+=`Host: ${e.host}
`),e.sitemap){let t=(0,o.resolveArray)(e.sitemap);t.forEach(e=>{r+=`Sitemap: ${e}
`})}return r}function l(e){let r="";for(let t of(r+='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n',e)){if(r+=`<url>
<loc>${t.url}</loc>
`,t.lastModified){let e=t.lastModified instanceof Date?t.lastModified.toISOString():t.lastModified;r+=`<lastmod>${e}</lastmod>
`}t.changeFrequency&&(r+=`<changefreq>${t.changeFrequency}</changefreq>
`),"number"==typeof t.priority&&(r+=`<priority>${t.priority}</priority>
`),r+="</url>\n"}return r+"</urlset>\n"}function i(e){return JSON.stringify(e)}function s(e,r){return"robots"===r?n(e):"sitemap"===r?l(e):"manifest"===r?i(e):""}},91406:(e,r)=>{function t(e){return Array.isArray(e)?e:[e]}function o(e){if(null!=e)return t(e)}Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(r,{resolveAsArrayOrUndefined:function(){return o},resolveArray:function(){return t}})}};