import{r as i,j as a}from"./index-B5f2V6Mu.js";import{a as u}from"./endpoints-CrS0KxLL.js";const l=[{id:"curl",label:"cURL",language:"bash"},{id:"javascript",label:"JavaScript",language:"javascript"},{id:"python",label:"Python",language:"python"},{id:"nodejs",label:"Node.js",language:"javascript"}];function g({examples:t}){var o;const n=i.useId(),r=l.filter(e=>t==null?void 0:t[e.id]),[c,d]=i.useState((o=r[0])==null?void 0:o.id),s=r.find(e=>e.id===c)||r[0];return s?a.jsxs("div",{className:"code-tabs",children:[a.jsx("div",{className:"code-tabs__list",role:"tablist","aria-label":"Code examples",children:r.map(e=>a.jsx("button",{type:"button",role:"tab",id:`${n}-tab-${e.id}`,"aria-selected":e.id===s.id,"aria-controls":`${n}-panel-${e.id}`,className:`code-tabs__tab ${e.id===s.id?"is-active":""}`,onClick:()=>d(e.id),children:e.label},e.id))}),a.jsx("div",{role:"tabpanel",id:`${n}-panel-${s.id}`,"aria-labelledby":`${n}-tab-${s.id}`,children:a.jsx(u,{code:t[s.id],language:s.language,title:s.label})})]}):null}const p={GET:"success",POST:"info",PUT:"warning",PATCH:"warning",DELETE:"danger"};function m({method:t}){return a.jsx("span",{className:`method-badge method-badge--${p[t]||"neutral"}`,children:t})}const b={"web-search":{curl:`curl -G https://api.customserp.dev/v1/search \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d q="best developer tools" \\
  -d country=us \\
  -d language=en \\
  -d num=10`,javascript:`const response = await fetch(
  "https://api.customserp.dev/v1/search?" +
    new URLSearchParams({ q: "best developer tools", country: "us", language: "en", num: "10" }),
  { headers: { Authorization: "Bearer YOUR_API_KEY" } }
);

const data = await response.json();
console.log(data.results);`,python:`import requests

response = requests.get(
    "https://api.customserp.dev/v1/search",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    params={"q": "best developer tools", "country": "us", "language": "en", "num": 10},
)

data = response.json()
print(data["results"])`,nodejs:`const { default: fetch } = require("node-fetch");

async function search() {
  const params = new URLSearchParams({ q: "best developer tools", country: "us", num: "10" });
  const response = await fetch(\`https://api.customserp.dev/v1/search?\${params}\`, {
    headers: { Authorization: "Bearer YOUR_API_KEY" },
  });
  const data = await response.json();
  console.log(data.results);
}

search();`},"search-status":{curl:`curl https://api.customserp.dev/v1/status \\
  -H "Authorization: Bearer YOUR_API_KEY"`,javascript:`const response = await fetch("https://api.customserp.dev/v1/status", {
  headers: { Authorization: "Bearer YOUR_API_KEY" },
});

const status = await response.json();
console.log(status.requestsUsed, "/", status.requestsLimit);`,python:`import requests

response = requests.get(
    "https://api.customserp.dev/v1/status",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
)

status = response.json()
print(status["requestsUsed"], "/", status["requestsLimit"])`,nodejs:`const { default: fetch } = require("node-fetch");

async function getStatus() {
  const response = await fetch("https://api.customserp.dev/v1/status", {
    headers: { Authorization: "Bearer YOUR_API_KEY" },
  });
  const status = await response.json();
  console.log(status);
}

getStatus();`}};export{g as C,m as M,b as s};
