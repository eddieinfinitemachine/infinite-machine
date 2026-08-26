"use strict";(()=>{var S={id:"olto",steps:[{type:"location",no:"01",title:"Location",validation:!0,collapsible:!1},{type:"variant",no:"02",title:"Base"},{type:"wrap",no:"03",title:"Wrap"},{type:"bundle",no:"04",title:"Accessory Pack"},{type:"accessories",no:"05",title:"Configure your Accessories"},{type:"quantity",no:"06",title:"Quantity"}],product:{handle:"olto-1"},accessoriesCollection:"olto-accessories",testInstructionVideo:"https://vz-19725589-529.b-cdn.net/a4c98a2a-412b-4e2e-a2ce-4e9a64123464/playlist.m3u8",wrap:{productHandle:"olto-wrap"},bundles:{metaobjectType:"bundles"},variants:{44842879156380:{color:"Black",colorHex:"#000000",delivery:"July 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff73905e7daa5ef224c5d5_olto-eu-black.avif"},44842879123612:{color:"Silver",colorHex:"#D9D9D9",delivery:"August 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff7390e94ecc537b713a30_olto-eu-silver.avif"}},defaultVariantId:"44842879156380",wrapColorMap:{Sand:"#DECEAF",Blush:"#F6C6DC",Sky:"#707A8D",Forest:"#627063",Crimson:"#B44C47"},accessoryDependencies:{"olto-rear-rack":{requiredBy:["olto-rear-basket","olto-side-mounting-plate"]}},customImageRules:[{when:["olto-soft-bag","olto-rear-basket"],replace:{"olto-soft-bag":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/69219c3d619077ba6f1689ed_Soft%20Bag%20in%20Rear%20Basket.avif"}},{when:["olto-charging-dock","olto-battery"],replace:{"olto-battery":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6921a4037d0eab061d3d7ca4_Battery%20Dock%20with%20Battery%20Plugged%20in.avif"},hide:["olto-charging-dock"]}]};var U="GraphQL Client";var bt="An error occurred while fetching from the API. Review 'graphQLErrors' for details.",vt="Response returned unexpected Content-Type:",wt="An unknown error has occurred. The API did not return a data object or any errors in its response.",rt={json:"application/json",multipart:"multipart/mixed"},St="X-SDK-Variant",_t="X-SDK-Version",pe="shopify-graphql-client",me="1.4.2",at=1e3,he=[429,503],Et=/@(defer)\b/i,fe=`\r
`,ye=/boundary="?([^=";]+)"?/i,Ct=fe+fe;function T(t,e=U){return t.startsWith(`${e}`)?t:`${e}: ${t}`}function O(t){return t instanceof Error?t.message:JSON.stringify(t)}function It(t){return t instanceof Error&&t.cause?t.cause:void 0}function At(t){return t.flatMap(({errors:e})=>e!=null?e:[])}function nt({client:t,retries:e}){if(e!==void 0&&(typeof e!="number"||e<0||e>3))throw new Error(`${t}: The provided "retries" value (${e}) is invalid - it cannot be less than ${0} or greater than ${3}`)}function _(t,e){return e&&(typeof e!="object"||Array.isArray(e)||typeof e=="object"&&Object.keys(e).length>0)?{[t]:e}:{}}function $t(t,e){if(t.length===0)return e;let a={[t.pop()]:e};return t.length===0?a:$t(t,a)}function ve(t,e){return Object.keys(e||{}).reduce((r,a)=>(typeof e[a]=="object"||Array.isArray(e[a]))&&t[a]?(r[a]=ve(t[a],e[a]),r):(r[a]=e[a],r),Array.isArray(t)?[...t]:{...t})}function Lt([t,...e]){return e.reduce(ve,{...t})}function Rt({clientLogger:t,customFetchApi:e=fetch,client:r=U,defaultRetryWaitTime:a=at,retriableCodes:n=he}){let o=async(s,i,c)=>{let d=i+1,l=c+1,p;try{if(p=await e(...s),t({type:"HTTP-Response",content:{requestParams:s,response:p}}),!p.ok&&n.includes(p.status)&&d<=l)throw new Error;let h=(p==null?void 0:p.headers.get("X-Shopify-API-Deprecated-Reason"))||"";return h&&t({type:"HTTP-Response-GraphQL-Deprecation-Notice",content:{requestParams:s,deprecationNotice:h}}),p}catch(h){if(d<=l){let g=p==null?void 0:p.headers.get("Retry-After");return await lr(g?parseInt(g,10):a),t({type:"HTTP-Retry",content:{requestParams:s,lastResponse:p,retryAttempt:i,maxRetries:c}}),o(s,d,c)}throw new Error(T(`${c>0?`Attempted maximum number of ${c} network retries. Last message - `:""}${O(h)}`,r))}};return o}async function lr(t){return new Promise(e=>setTimeout(e,t))}function Tt({headers:t,url:e,customFetchApi:r=fetch,retries:a=0,logger:n}){nt({client:U,retries:a});let o={headers:t,url:e,retries:a},s=dr(n),i=Rt({customFetchApi:r,clientLogger:s,defaultRetryWaitTime:at}),c=ur(i,o),d=fr(c),l=vr(c);return{config:o,fetch:c,request:d,requestStream:l}}function dr(t){return e=>{t&&t(e)}}async function we(t){let{errors:e,data:r,extensions:a}=await t.json();return{..._("data",r),..._("extensions",a),headers:t.headers,...e||!r?{errors:{networkStatusCode:t.status,message:T(e?bt:wt),..._("graphQLErrors",e),response:t}}:{}}}function ur(t,{url:e,headers:r,retries:a}){return async(n,o={})=>{let{variables:s,headers:i,url:c,retries:d,keepalive:l,signal:p}=o,h=JSON.stringify({query:n,variables:s});nt({client:U,retries:d});let g=Object.entries({...r,...i}).reduce((w,[D,M])=>(w[D]=Array.isArray(M)?M.join(", "):M.toString(),w),{});!g[St]&&!g[_t]&&(g[St]=pe,g[_t]=me);let k=[c!=null?c:e,{method:"POST",headers:g,body:h,signal:p,keepalive:l}];return t(k,1,d!=null?d:a)}}function fr(t){return async(...e)=>{if(Et.test(e[0]))throw new Error(T("This operation will result in a streamable response - use requestStream() instead."));let r=null;try{r=await t(...e);let{status:a,statusText:n}=r,o=r.headers.get("content-type")||"";return r.ok?o.includes(rt.json)?await we(r):{errors:{networkStatusCode:a,message:T(`${vt} ${o}`),response:r}}:{errors:{networkStatusCode:a,message:T(n),response:r}}}catch(a){return{errors:{message:O(a),...r==null?{}:{networkStatusCode:r.status,response:r}}}}}}async function*pr(t){let e=new TextDecoder;if(t.body[Symbol.asyncIterator])for await(let r of t.body)yield e.decode(r);else{let r=t.body.getReader(),a;try{for(;!(a=await r.read()).done;)yield e.decode(a.value)}finally{r.cancel()}}}function mr(t,e){return{async*[Symbol.asyncIterator](){try{let r="";for await(let a of t)if(r+=a,r.indexOf(e)>-1){let n=r.lastIndexOf(e),s=r.slice(0,n).split(e).filter(i=>i.trim().length>0).map(i=>i.slice(i.indexOf(Ct)+Ct.length).trim());s.length>0&&(yield s),r=r.slice(n+e.length),r.trim()==="--"&&(r="")}}catch(r){throw new Error(`Error occured while processing stream payload - ${O(r)}`)}}}}function hr(t){return{async*[Symbol.asyncIterator](){try{yield{...await we(t),hasNext:!1}}catch(e){yield{errors:{message:T(O(e)),networkStatusCode:t.status,response:t},hasNext:!1}}}}}function yr(t){return t.map(e=>{try{return JSON.parse(e)}catch(r){throw new Error(`Error in parsing multipart response - ${O(r)}`)}}).map(e=>{let{data:r,incremental:a,hasNext:n,extensions:o,errors:s}=e;if(!a)return{data:r||{},..._("errors",s),..._("extensions",o),hasNext:n};let i=a.map(({data:c,path:d,errors:l})=>({data:c&&d?$t(d,c):{},..._("errors",l)}));return{data:i.length===1?i[0].data:Lt([...i.map(({data:c})=>c)]),..._("errors",At(i)),hasNext:n}})}function gr(t,e){if(t.length>0)throw new Error(bt,{cause:{graphQLErrors:t}});if(Object.keys(e).length===0)throw new Error(wt)}function br(t,e){var i,c;let r=(e!=null?e:"").match(ye),a=`--${r?r[1]:"-"}`;if(!((i=t.body)!=null&&i.getReader)&&!((c=t.body)!=null&&c[Symbol.asyncIterator]))throw new Error("API multipart response did not return an iterable body",{cause:t});let n=pr(t),o={},s;return{async*[Symbol.asyncIterator](){var d,l;try{let p=!0;for await(let h of mr(n,a)){let g=yr(h);s=(l=(d=g.find(w=>w.extensions))==null?void 0:d.extensions)!=null?l:s;let k=At(g);o=Lt([o,...g.map(({data:w})=>w)]),p=g.slice(-1)[0].hasNext,gr(k,o),yield{..._("data",o),..._("extensions",s),hasNext:p}}if(p)throw new Error("Response stream terminated unexpectedly")}catch(p){let h=It(p);yield{..._("data",o),..._("extensions",s),errors:{message:T(O(p)),networkStatusCode:t.status,..._("graphQLErrors",h==null?void 0:h.graphQLErrors),response:t},hasNext:!1}}}}}function vr(t){return async(...e)=>{if(!Et.test(e[0]))throw new Error(T("This operation does not result in a streamable response - use request() instead."));try{let r=await t(...e),{statusText:a}=r;if(!r.ok)throw new Error(a,{cause:r});let n=r.headers.get("content-type")||"";switch(!0){case n.includes(rt.json):return hr(r);case n.includes(rt.multipart):return br(r,n);default:throw new Error(`${vt} ${n}`,{cause:r})}}catch(r){return{async*[Symbol.asyncIterator](){let a=It(r);yield{errors:{message:T(O(r)),..._("networkStatusCode",a==null?void 0:a.status),..._("response",a)},hasNext:!1}}}}}}function xt({client:t,storeDomain:e}){try{if(!e||typeof e!="string")throw new Error;let r=e.trim(),a=r.match(/^https?:/)?r:`https://${r}`,n=new URL(a);return n.protocol="https",n.origin}catch(r){throw new Error(`${t}: a valid store domain ("${e}") must be provided`,{cause:r})}}function ot({client:t,currentSupportedApiVersions:e,apiVersion:r,logger:a}){let n=`${t}: the provided apiVersion ("${r}")`,o=`Currently supported API versions: ${e.join(", ")}`;if(!r||typeof r!="string")throw new Error(`${n} is invalid. ${o}`);let s=r.trim();e.includes(s)||(a?a({type:"Unsupported_Api_Version",content:{apiVersion:r,supportedApiVersions:e}}):console.warn(`${n} is likely deprecated or not supported. ${o}`))}function st(t){let e=t*3-2;return e===10?e:`0${e}`}function Ot(t,e,r){let a=e-r;return a<=0?`${t-1}-${st(a+4)}`:`${t}-${st(a)}`}function Se(){let t=new Date,e=t.getUTCMonth(),r=t.getUTCFullYear(),a=Math.floor(e/3+1);return{year:r,quarter:a,version:`${r}-${st(a)}`}}function kt(){let{year:t,quarter:e,version:r}=Se(),a=e===4?`${t+1}-01`:`${t}-${st(e+1)}`;return[Ot(t,e,3),Ot(t,e,2),Ot(t,e,1),r,a,"unstable"]}function Dt(t){return e=>({...e!=null?e:{},...t.headers})}function Nt({getHeaders:t,getApiUrl:e}){return(r,a)=>{let n=[r];if(a&&Object.keys(a).length>0){let{variables:o,apiVersion:s,headers:i,retries:c,signal:d}=a;n.push({...o?{variables:o}:{},...i?{headers:t(i)}:{},...s?{url:e(s)}:{},...c?{retries:c}:{},...d?{signal:d}:{}})}return n}}var qt="application/json",_e="storefront-api-client",Ee="1.0.10",Ce="X-Shopify-Storefront-Access-Token",Ie="Shopify-Storefront-Private-Token",Ae="X-SDK-Variant",$e="X-SDK-Version",Le="X-SDK-Variant-Source",B="Storefront API Client";function Re(t){if(t&&typeof window!="undefined")throw new Error(`${B}: private access tokens and headers should only be used in a server-to-server implementation. Use the public API access token in nonserver environments.`)}function Te(t,e){if(!t&&!e)throw new Error(`${B}: a public or private access token must be provided`);if(t&&e)throw new Error(`${B}: only provide either a public or private access token`)}function Pt({storeDomain:t,apiVersion:e,publicAccessToken:r,privateAccessToken:a,clientName:n,retries:o=0,customFetchApi:s,logger:i}){let c=kt(),d=xt({client:B,storeDomain:t}),l={client:B,currentSupportedApiVersions:c,logger:i};ot({...l,apiVersion:e}),Te(r,a),Re(a);let p=wr(d,e,l),h={storeDomain:d,apiVersion:e,...r?{publicAccessToken:r}:{privateAccessToken:a},headers:{"Content-Type":qt,Accept:qt,[Ae]:_e,[$e]:Ee,...n?{[Le]:n}:{},...r?{[Ce]:r}:{[Ie]:a}},apiUrl:p(),clientName:n},g=Tt({headers:h.headers,url:h.apiUrl,retries:o,customFetchApi:s,logger:i}),k=Dt(h),w=Sr(h,p),D=Nt({getHeaders:k,getApiUrl:w});return Object.freeze({config:h,getHeaders:k,getApiUrl:w,fetch:(...N)=>g.fetch(...D(...N)),request:(...N)=>g.request(...D(...N)),requestStream:(...N)=>g.requestStream(...D(...N))})}function wr(t,e,r){return a=>{a&&ot({...r,apiVersion:a});let n=(a!=null?a:e).trim();return`${t}/api/${n}/graphql.json`}}function Sr(t,e){return r=>r?e(r):t.apiUrl}var it={SHOPIFY_STORE_DOMAIN:"shop.infinitemachine.com",SHOPIFY_STOREFRONT_PUBLIC_TOKEN:"eefb42e32220791a7472aaa5d2cf2182",SHOPIFY_API_VERSION:"2026-04"};var q=Pt({storeDomain:it.SHOPIFY_STORE_DOMAIN,apiVersion:it.SHOPIFY_API_VERSION,publicAccessToken:it.SHOPIFY_STOREFRONT_PUBLIC_TOKEN});var ke="olto_cart_",_r="cfg_",Ht="config",x=null,u=null,K=null,Ft=null,A=null,ct=[],Er=[];function P(t){K=t,u=t}var Z=null;function De(t){Z=t}async function Ne(t){var r;Ft=t.id,A=xe()||Me();let e=Lr();if(e)try{let a=await Ir(e);a&&(x=e,P(a))}catch(a){console.warn("[Cart] Failed to restore cart, will create new:",a)}if(!x){let a=await Cr();P(a),x=a.id,Rr(x)}if(!xe()&&((r=u==null?void 0:u.lines)!=null&&r.length)){let a=Ar(u);a&&(A=a)}return Ue(A),$(),Fe(),u}function qe(){return u==null?void 0:u.checkoutUrl}function lt(){return A}function Ut(){return A=Me(),Ue(A),Fe(),A}async function Pe(t){J();let e=K,r=((e==null?void 0:e.lines)||[]).filter(a=>{var n;return((n=a.attributesByKey)==null?void 0:n._config_id)===t}).map(a=>a.id);r.length!==0&&(await Kt(r),t===A&&Ut())}async function Bt(t){J();let e=u,r=Mt(A),a=t.map(o=>Be(o.variantId,o.quantity||r,{...o.attributes||{},_config_id:A})).filter(Boolean);a.length&&(u=Ke(u,a),$());let n=t.map(o=>({merchandiseId:o.variantId,quantity:o.quantity||r,attributes:X({...o.attributes||{},_config_id:A})}));try{return P(await dt(()=>j("cartLinesAdd",`
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ${V} }
          userErrors { field message }
        }
      }
    `,{cartId:x,lines:n}))),$(),u}catch(o){throw u=e,$(),o}}async function Kt(t){J();let e=u,r=new Set(t);u&&(u={...u,lines:u.lines.filter(a=>!r.has(a.id))},$());try{return P(await dt(()=>j("cartLinesRemove",`
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ${V} }
          userErrors { field message }
        }
      }
    `,{cartId:x,lineIds:t}))),$(),u}catch(a){throw u=e,$(),a}}async function Ve({lineId:t,variantId:e,quantity:r,attributes:a}){J();let n=u;u&&(u={...u,lines:u.lines.map(s=>{if(s.id!==t)return s;let i={...s};if(e!==void 0){let c=Gt(e)||s.merchandise;i.merchandise=c}if(r!==void 0&&(i.quantity=r),a!==void 0){let c=X(a);i.attributes=c,i.attributesByKey=Object.fromEntries(c.map(d=>[d.key,d.value]))}return i})},$());let o={id:t};e!==void 0&&(o.merchandiseId=e),r!==void 0&&(o.quantity=r),a!==void 0&&(o.attributes=X(a));try{return P(await dt(()=>j("cartLinesUpdate",`
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ${V} }
          userErrors { field message }
        }
      }
    `,{cartId:x,lines:[o]}))),$(),u}catch(s){throw u=n,$(),s}}function He(t){return ct.push(t),u&&t(u),()=>{ct=ct.filter(e=>e!==t)}}var V=`
  id
  checkoutUrl
  totalQuantity
  attributes { key value }
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        attributes { key value }
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            image { url altText }
            product { id handle title }
            selectedOptions { name value }
          }
        }
      }
    }
  }
`;async function Cr(){var a;let{data:t,errors:e}=await q.request(`
    mutation CartCreate {
      cartCreate(input: {}) {
        cart { ${V} }
        userErrors { field message }
      }
    }
  `);if(e)throw new Error(`[Cart] createCart errors: ${JSON.stringify(e)}`);let r=(a=t==null?void 0:t.cartCreate)==null?void 0:a.userErrors;if(r!=null&&r.length)throw new Error(`[Cart] createCart userErrors: ${JSON.stringify(r)}`);return jt(t.cartCreate.cart)}async function Ir(t){let{data:e,errors:r}=await q.request(`
    query GetCart($id: ID!) {
      cart(id: $id) { ${V} }
    }
  `,{variables:{id:t}});if(r)throw new Error(`[Cart] queryCart errors: ${JSON.stringify(r)}`);return e!=null&&e.cart?jt(e.cart):null}async function j(t,e,r){var s;let{data:a,errors:n}=await q.request(e,{variables:r});if(n)throw new Error(`[Cart] ${t} errors: ${JSON.stringify(n)}`);let o=a==null?void 0:a[t];if((s=o==null?void 0:o.userErrors)!=null&&s.length)throw new Error(`[Cart] ${t} userErrors: ${JSON.stringify(o.userErrors)}`);return jt(o.cart)}function jt(t){let e=t.attributes||[];return{id:t.id,checkoutUrl:t.checkoutUrl,totalQuantity:t.totalQuantity,cost:t.cost,attributes:e,attributesByKey:Object.fromEntries(e.map(r=>[r.key,r.value])),lines:t.lines.edges.map(({node:r})=>({id:r.id,quantity:r.quantity,attributes:r.attributes,attributesByKey:Object.fromEntries(r.attributes.map(a=>[a.key,a.value])),merchandise:r.merchandise}))}}function X(t){return Object.entries(t).filter(([,e])=>e!=null&&e!=="").map(([e,r])=>({key:e,value:String(r)}))}function J(){if(!x)throw new Error("[Cart] Called before initCart(config)")}function $(){for(let t of ct)t(u)}function Me(){return`${_r}${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Mt(t){var a;let e=K||u;if(!((a=e==null?void 0:e.lines)!=null&&a.length))return 1;let r=e.lines.find(n=>{var o;return((o=n.attributesByKey)==null?void 0:o._config_id)===t});return(r==null?void 0:r.quantity)||1}function Fe(){for(let t of Er)t(A)}function xe(){return typeof window=="undefined"?null:new URLSearchParams(window.location.search).get(Ht)}function Ue(t){if(typeof window=="undefined")return;let e=new URLSearchParams(window.location.search);t?e.set(Ht,t):e.delete(Ht),window.history.replaceState({},"",`${window.location.pathname}?${e.toString()}`)}function Ar(t){var r;if(!((r=t==null?void 0:t.lines)!=null&&r.length))return null;let e=t.lines.map(a=>{var n;return(n=a.attributesByKey)==null?void 0:n._config_id}).filter(Boolean).sort();return e[e.length-1]||null}var Oe=Promise.resolve();async function dt(t){let e=Oe,r;Oe=new Promise(a=>{r=a}),await e;try{return await t()}finally{r()}}var Vt=new Map;function $r(t,e){let r=Vt.get(t)||{inflight:null,latest:null};return r.latest=e,Vt.set(t,r),r.inflight||(r.inflight=(async()=>{for(;r.latest;){let a=r.latest;r.latest=null;try{await dt(a)}catch(n){console.error(`[Cart] coalesce(${t}) error:`,n)}}r.inflight=null,Vt.delete(t)})()),r.inflight}async function ut(t,e){J();let r=A;if(u){let a=u.lines.findIndex(n=>{var o;return n.merchandise.product.handle===t&&((o=n.attributesByKey)==null?void 0:o._config_id)===r});if(a>=0&&e===null)u={...u,lines:u.lines.filter((n,o)=>o!==a)};else if(a>=0&&e){let n=Gt(e);n&&(u={...u,lines:u.lines.map((o,s)=>s===a?{...o,merchandise:n}:o)})}else if(a<0&&e){let n=Mt(r),o=Be(e,n,{_config_id:r});o&&(u=Ke(u,[o]))}$()}return $r(`product:${t}:${r}`,async()=>{let a=K==null?void 0:K.lines.find(n=>{var o;return n.merchandise.product.handle===t&&((o=n.attributesByKey)==null?void 0:o._config_id)===r});if(e===null){a&&(P(await j("cartLinesRemove",`
          mutation($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart { ${V} } userErrors { field message }
            }
          }
        `,{cartId:x,lineIds:[a.id]})),$());return}if(a)P(await j("cartLinesUpdate",`
        mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart { ${V} } userErrors { field message }
          }
        }
      `,{cartId:x,lines:[{id:a.id,merchandiseId:e}]}));else{let n=Mt(r);P(await j("cartLinesAdd",`
        mutation($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart { ${V} } userErrors { field message }
          }
        }
      `,{cartId:x,lines:[{merchandiseId:e,quantity:n,attributes:X({_config_id:r})}]}))}$()})}function Gt(t){if(!Z)return null;let e=[Z.main,Z.wrap,...Z.accessories||[]].filter(Boolean);for(let r of e){let a=r.variants.find(n=>n.id===t);if(a)return{id:a.id,title:a.title,price:a.price,image:a.image,selectedOptions:a.selectedOptions,product:{id:r.id,handle:r.handle,title:r.title}}}return null}function Be(t,e,r){let a=Gt(t);if(!a)return null;let n=X(r);return{id:`tmp_${Math.random().toString(36).slice(2,10)}`,quantity:e,attributes:n,attributesByKey:Object.fromEntries(n.map(o=>[o.key,o.value])),merchandise:a}}function Ke(t,e){return t&&{...t,lines:[...t.lines,...e],totalQuantity:(t.totalQuantity||0)+e.reduce((r,a)=>r+(a.quantity||1),0)}}function Lr(){return typeof localStorage=="undefined"?null:localStorage.getItem(`${ke}${Ft}`)}function Rr(t){typeof localStorage!="undefined"&&localStorage.setItem(`${ke}${Ft}`,t)}var Qt=new Map,Yt=`
  id
  handle
  title
  description
  availableForSale
  productType
  vendor
  tags
  featuredImage { url altText }
  accessoryEta: metafield(namespace: "custom", key: "accessory_etas") { value }
  instructionVideo: metafield(namespace: "custom", key: "instruction_video") { value }
  collections(first: 10) {
    edges { node { handle title } }
  }
  variants(first: 25) {
    edges {
      node {
        id
        title
        availableForSale
        quantityAvailable
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        selectedOptions { name value }
        image { url altText }
      }
    }
  }
`;async function je(t){var i;if(Qt.has(t.id))return Qt.get(t.id);let e=!!((i=t.wrap)!=null&&i.productHandle),r=`
    query LoadConfigurator(
      $productHandle: String!
      $accessoriesHandle: String!
      ${e?"$wrapHandle: String!":""}
    ) {
      main: product(handle: $productHandle) { ${Yt} }
      accessoriesCollection: collection(handle: $accessoriesHandle) {
        title
        handle
        products(first: 50) {
          edges { node { ${Yt} } }
        }
      }
      ${e?`wrap: product(handle: $wrapHandle) { ${Yt} }`:""}
    }
  `,a={productHandle:t.product.handle,accessoriesHandle:t.accessoriesCollection};e&&(a.wrapHandle=t.wrap.productHandle);let{data:n,errors:o}=await q.request(r,{variables:a});if(o)throw new Error(`[Products] GraphQL errors: ${JSON.stringify(o)}`);if(!n.main)throw new Error(`[Products] Product not found: ${t.product.handle}`);if(!n.accessoriesCollection)throw new Error(`[Products] Collection not found: ${t.accessoriesCollection}`);let s={main:Wt(n.main),wrap:n.wrap?Wt(n.wrap):null,accessories:n.accessoriesCollection.products.edges.map(c=>Wt(c.node))};return Qt.set(t.id,s),s}function Wt(t){var e,r,a;return{id:t.id,handle:t.handle,title:t.title,description:t.description,availableForSale:t.availableForSale,productType:t.productType,vendor:t.vendor,tags:t.tags||[],featuredImage:t.featuredImage,accessoryEta:((e=t.accessoryEta)==null?void 0:e.value)||null,instructionVideo:((r=t.instructionVideo)==null?void 0:r.value)||null,collections:(((a=t.collections)==null?void 0:a.edges)||[]).map(n=>n.node),variants:t.variants.edges.map(({node:n})=>({id:n.id,title:n.title,availableForSale:n.availableForSale,quantityAvailable:n.quantityAvailable,price:n.price,compareAtPrice:n.compareAtPrice,selectedOptions:n.selectedOptions,image:n.image}))}}var Zt=null,Xt=null,Ge=[],ft=[],b={ready:!1,region:"",baseNumericId:null,bikeLine:null,wrapLine:null,accessoryLines:[],activeBundle:null,quantity:1,total:0,currency:"USD",payMode:"finance",cart:null};function pt(t){return String(t).split("/").pop()}function mt(t){return`gid://shopify/ProductVariant/${t}`}function Qe(t){Zt=t.config,Xt=t.products,Ge=t.bundles||[],b.baseNumericId=Zt.defaultVariantId,He(Tr)}function H(){return b}function Ye(t){return ft.push(t),()=>{ft=ft.filter(e=>e!==t)}}function Jt(t){b.region=t,zt()}function ht(t){b.payMode=t,zt()}function zt(){for(let t of ft)t(b)}function Tr(t){var c,d;let e=lt(),r=((t==null?void 0:t.lines)||[]).filter(l=>{var p;return((p=l.attributesByKey)==null?void 0:p._config_id)===e}),a=Xt.main.handle,n=(c=Zt.wrap)==null?void 0:c.productHandle,o=new Set(Xt.accessories.map(l=>l.handle));b.cart=t,b.bikeLine=r.find(l=>l.merchandise.product.handle===a)||null,b.wrapLine=r.find(l=>l.merchandise.product.handle===n)||null,b.accessoryLines=r.filter(l=>o.has(l.merchandise.product.handle)),b.bikeLine&&(b.baseNumericId=pt(b.bikeLine.merchandise.id)),b.quantity=((d=r[0])==null?void 0:d.quantity)||1;let s=0;for(let l of r)s+=parseFloat(l.merchandise.price.amount)*(l.quantity||1),l.merchandise.price.currencyCode&&(b.currency=l.merchandise.price.currencyCode);b.total=s;let i=new Set(b.accessoryLines.map(l=>l.merchandise.product.handle));b.activeBundle=null;for(let l of Ge){let p=(l.products||[]).map(h=>h.handle);if(p.length&&p.length===i.size&&p.every(h=>i.has(h))){b.activeBundle=l.handle;break}}b.ready=!0,zt()}var xr='<svg viewBox="0 0 922 201" fill="none" xmlns="http://www.w3.org/2000/svg" class="olto-wordmark" role="img" aria-label="Olto"> <path d="M246.995 19.4652C255.252 28.6186 259.698 41.3214 261.454 61.0855C262.35 70.239 262.649 80.8495 262.649 102.706C262.649 151.985 257.942 170.89 242.885 184.153C231.976 193.605 217.218 198.313 192.41 199.807C182.958 200.405 147.241 201.003 119.817 201.003C59.5913 201.003 43.3765 199.247 26.564 190.093C13.5623 182.995 5.00663 169.433 2.35399 149.968C0.598013 136.966 0.000235075 126.355 0.000235075 94.1874C-0.0371261 48.1211 4.37149 29.8142 18.5687 17.4103C29.1793 7.95792 43.0403 3.54931 68.4458 1.45708C78.496 0.560417 108.011 0 143.99 0C213.631 0 232.237 3.54931 246.995 19.4652ZM46.2907 100.651C46.2907 139.021 49.2422 151.425 60.1517 157.029C71.0611 162.932 80.5135 163.829 136.891 163.829C187.665 163.829 200.331 161.774 208.326 152.919C215.126 145.559 217.181 132.856 217.181 99.4927C217.181 37.8095 216.583 37.2117 131.586 37.2117C46.5896 37.2117 46.2907 38.1084 46.2907 100.651Z" fill="#E90022"/> <path d="M286.86 2.05334H332.328V162.034H476.057V198.909H286.86V2.05334Z" fill="#E90022"/> <path d="M507.328 38.9662H414.673V2.05334H645.154V38.9288H552.759V198.909H507.291V38.9662H507.328Z" fill="#E90022"/> <path d="M906.345 19.4644C914.602 28.6179 919.048 41.3207 920.804 61.0847C921.701 70.2382 922 80.8488 922 102.705C922 151.984 917.292 170.889 902.236 184.152C891.326 193.605 876.569 198.312 851.761 199.807C842.308 200.404 806.591 201.002 779.168 201.002C718.979 201.002 702.727 199.246 685.915 190.093C672.913 182.994 664.357 169.432 661.705 149.967C659.949 136.965 659.351 126.355 659.351 94.1867C659.351 48.1578 663.797 29.8508 677.957 17.4469C688.567 7.99454 702.466 3.58593 727.834 1.49371C737.884 0.597038 767.399 0.0366211 803.378 0.0366211C873.019 0.0366211 891.625 3.58593 906.383 19.5018L906.345 19.4644ZM705.679 100.65C705.679 139.02 708.63 151.424 719.54 157.028C730.449 162.931 739.901 163.828 796.279 163.828C847.053 163.828 859.719 161.773 867.714 152.918C874.514 145.558 876.569 132.855 876.569 99.492C876.569 37.8087 875.971 37.211 790.974 37.211C705.978 37.211 705.679 38.1076 705.679 100.65Z" fill="#E90022"/> </svg>',Or='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 831.97 45.21" class="im-wordmark" fill="currentColor" role="img" aria-label="Infinite Machine"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M13.56.33V44.88H0V.33Z"/><path d="M44.93.33l27,33.86L71.58.33H84.4V44.88H62.63L36,11.35l.34,33.53h-13V.33Z"/><path d="M141.66.33V10.42H107.87V19.3h32.06V29.39H107.87V44.88H94.38V.33Z"/><path d="M163.09.33V44.88H149.54V.33Z"/><path d="M194.46.33l27,33.86L221.11.33h12.82V44.88H212.16L185.58,11.35l.33,33.53h-13V.33Z"/><path d="M257.44.33V44.88H243.89V.33Z"/><path d="M264.52,11.35V.33h53.23v11H297.91V44.88H284.35V11.35Z"/><path d="M374.26,10.42h-36V18.1h33.93v8.81H338.26V34.8h36.47V44.88H324.91V.33h49.35Z"/><path d="M423,.33l16.23,29.59L455.34.33h21.37V44.88H463.49l.67-34.39L444.39,44.88H433.57L414.13,10.49l.4,34.39H401.44V.33Z"/><path d="M526.62.33,551,44.88H536.17l-4.4-8H503.05l-4.28,8H483.41l25-44.55Zm-9.21,9.55-9.49,17.77H527Z"/><path d="M611.09,32.22c0,1.14-.11,2.11-.2,2.91a13.74,13.74,0,0,1-.36,2.07,11.1,11.1,0,0,1-.57,1.6,8.86,8.86,0,0,1-4.21,4.31,21.46,21.46,0,0,1-8.08,1.77q-2.07.19-6.18.27t-10.78.06c-3.21,0-5.91,0-8.12-.13a53.92,53.92,0,0,1-5.61-.47,20.34,20.34,0,0,1-3.9-.9,14.32,14.32,0,0,1-2.94-1.43,10.08,10.08,0,0,1-2.77-2.58,11.37,11.37,0,0,1-1.74-3.87,32.31,32.31,0,0,1-.9-5.84c-.18-2.32-.27-5.12-.27-8.42q0-4.41.27-7.48a23.36,23.36,0,0,1,1-5.24,10,10,0,0,1,1.87-3.54,10.88,10.88,0,0,1,2.9-2.37,16.6,16.6,0,0,1,3.17-1.44,23.22,23.22,0,0,1,4-.9Q570,.27,573.29.13c2.19-.09,4.83-.13,8-.13q6.21,0,10.22.07c2.67,0,4.88.15,6.61.33a27.49,27.49,0,0,1,4.21.7,18,18,0,0,1,3,1.1,8.12,8.12,0,0,1,4,4.35,20.63,20.63,0,0,1,1.27,7.94V16h-13a11.59,11.59,0,0,0-.5-2.87,2.69,2.69,0,0,0-1.7-1.6,12.6,12.6,0,0,0-3.87-.67c-1.7-.09-4-.13-6.95-.13q-4.14,0-6.74.06c-1.74.05-3.13.14-4.18.27a10.12,10.12,0,0,0-2.4.53,5.12,5.12,0,0,0-1.44.87,4.48,4.48,0,0,0-1,1.24,7.48,7.48,0,0,0-.6,1.87,20.61,20.61,0,0,0-.3,2.94c0,1.18-.07,2.66-.07,4.44a42.86,42.86,0,0,0,.37,6.31A5.34,5.34,0,0,0,570,32.66a8,8,0,0,0,4.21,1.43,75.75,75.75,0,0,0,7.68.31c2.54,0,4.57,0,6.11,0s2.77,0,3.71-.1a12.82,12.82,0,0,0,2.13-.23,7.73,7.73,0,0,0,1.47-.5,3.77,3.77,0,0,0,2.07-1.81,8.36,8.36,0,0,0,.6-3.6h13.16C611.16,29.72,611.14,31.09,611.09,32.22Z"/><path d="M633.44.33v16.5H664.3V.33h13.56V44.88H664.3v-17H633.44v17H619.88V.33Z"/><path d="M701.33.33V44.88H687.77V.33Z"/><path d="M732.7.33l27,33.86L759.35.33h12.82V44.88H750.4L723.82,11.35l.33,33.53h-13V.33Z"/><path d="M831.51,10.42h-36V18.1h33.93v8.81H795.51V34.8H832V44.88H782.15V.33h49.36Z"/></g></g></svg>',E="https://cdn.prod.website-files.com/66ea2a84659b76f5d91d481b",ee={"accessory-plate":`${E}/68d53a735e9c987a9499211a_accessory-plate.avif`,"charger-bag":`${E}/68d53a2cb165eb23a2527775_charger-bag.avif`,"olto-center-stand":`${E}/68d53974c880c4b20d23dec9_olto-center-stand.avif`,"olto-charging-dock":`${E}/68d5396153ba7acdd9978c0d_olto-charging-dock.avif`,"olto-kid-carrier":`${E}/6921a92ec4d3dc4a766d69bb_Kid%20Carrier.avif`,"olto-rear-basket":`${E}/68d53b6769ccc4ad6ad7d0b3_olto-rear-basket.avif`,"olto-rear-rack":`${E}/68d53b2e1153a3e349d34c1a_olto-rear-rack.avif`,"olto-side-mounting-plate":`${E}/68d53bea87ff421cf85c858e_olto-side-mounting-plate.avif`,"olto-water-bottle-holder":`${E}/68d53d46367f73dfd1b58a42_olto-water-bottle-holder.avif`,"olto-sidewalls":`${E}/68d53c3ccb4cfb15c59ac6cd_olto-sidewalls.avif`,"olto-super-charger":`${E}/6921a99cb5dd5b924cf4965d_Super%20Charger%20on%20the%20Ground.avif`,"olto-u-lock-mount":`${E}/68d53cf8bb965a6129e84ff4_olto-u-lock-mount.avif`,"open-face-helmet":`${E}/6921a8f20583ec71e2663dce_Black%20Open%20Face%20Helmet.avif`,"kryptonite-lock":`${E}/68d53fc0d2d8d2d151493b5f_kryptonite-lock.avif`,"olto-soft-bag":`${E}/692197c1914921de9b30217a_Soft%20Bag%20on%20the%20Ground.avif`},te={finance:{months:48,apr:.1599},lease:{months:24,residualPct:.35}};function We(t,e,r){if(r==="finance"){let{months:a,apr:n}=te.finance,o=n/12,s=o>0?t*o/(1-(1+o)**-a):t/a;return{amount:s,suffix:"/mo",label:"Est. finance payment",sub:`${a} monthly payments of ${C(s,e)} at ${(n*100).toFixed(2)}% APR. Estimate for illustration \u2014 payment options appear at checkout.`}}if(r==="lease"){let{months:a,residualPct:n}=te.lease;return{amount:t*(1-n)/a,suffix:"/mo",label:"Est. lease payment",sub:`${a}-month term, ${Math.round(n*100)}% residual. Estimate for illustration.`}}return{amount:t,suffix:"",label:"Est. purchase price",sub:"Taxes and shipping calculated at checkout."}}var yt=[{key:"commuter",label:"Olto Commuter",tagline:"Everything you need to commute every day.",popular:!0,price:200,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","olto-water-bottle-holder","open-face-helmet","bottom-cover"]},{key:"cargo",label:"Olto Cargo",tagline:"Carry everything.",price:700,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","charger-bag","olto-rear-rack","olto-rear-basket","olto-soft-bag","olto-side-mounting-plate","accessory-plate","olto-center-stand"]},{key:"max",label:"Olto Max",tagline:"Fully loaded. Full power.",price:950,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","olto-water-bottle-holder","charger-bag","olto-rear-rack","olto-rear-basket","olto-soft-bag","olto-side-mounting-plate","accessory-plate","olto-center-stand","olto-super-charger"]}],kr=new Set(["bottom-cover"]),Dr=[{value:"40 mi",label:"Range (est.)"},{value:"20 mph",label:"Top Speed"},{value:"Class 2",label:"E-bike"}];function C(t,e="USD"){let r=Number(t)||0,a=r%1===0?0:2;return e==="USD"?`$${r.toLocaleString("en-US",{minimumFractionDigits:a,maximumFractionDigits:a})}`:`${e} ${r.toFixed(2)}`}function y(t){return String(t!=null?t:"").replace(/[&<>"']/g,e=>`&#${e.charCodeAt(0)};`)}function G(t,e){return t?`${t}${t.includes("?")?"&":"?"}width=${e}`:""}function Ze({config:t,products:e,wrapVariantsByColor:r}){let a=Object.entries(t.variants),[n]=a.find(([l])=>l===t.defaultVariantId)||a[0],o=Math.min(...e.main.variants.map(l=>parseFloat(l.price.amount))),{months:s,apr:i}=te.finance,c=i/12,d=Math.round(o*c/(1-(1+c)**-s));return`
    <header class="topbar">
      <div class="topbar_mark">${Or}</div>
    </header>

    <section class="hero" aria-label="Olto">
      <img class="hero_img is-active" data-hero-img="a" src="${y(t.variants[n].backgroundImage)}" alt="Olto" />
      <img class="hero_img" data-hero-img="b" alt="" aria-hidden="true" />
      <div class="hero_layers" data-layers>
        ${Object.entries(ee).map(([l,p])=>`<img class="hero_layer" data-layer="${y(l)}" src="${y(p)}" alt="" aria-hidden="true" />`).join("")}
      </div>
    </section>

    <main class="sheet">
      <div class="sheet_handle" aria-hidden="true"></div>

      <section class="intro">
        <h1 class="intro_title">${xr}</h1>
        <p class="intro_delivery" data-delivery></p>
        <p class="intro_price">From ${C(o)} \xB7 or ${C(d)}/mo financing</p>
        <div class="stats">
          ${Dr.map(l=>`
            <div class="stats_item">
              <div class="stats_value">${y(l.value)}</div>
              <div class="stats_label">${y(l.label)}</div>
            </div>`).join("")}
        </div>
      </section>

      ${Nr(t,a,r)}

      ${qr(e)}

      <section class="opt opt--acc" data-section="accessories">
        <h2 class="opt_title">Additional Accessories</h2>
        <div class="acc-nav">
          <button type="button" class="acc-nav_btn" data-acc-scroll="-1" aria-label="Scroll accessories back">&#8249;</button>
          <button type="button" class="acc-nav_btn" data-acc-scroll="1" aria-label="Scroll accessories forward">&#8250;</button>
        </div>
        <div class="acc-list" data-acc-list>
          ${e.accessories.filter(l=>!kr.has(l.handle)).map(l=>Vr(l)).join("")}
        </div>
      </section>

      <section class="opt" data-section="quantity">
        <h2 class="opt_title">Quantity</h2>
        <div class="qty">
          <button type="button" class="qty_btn" data-qty-dec aria-label="Decrease quantity">&minus;</button>
          <span class="qty_value" data-qty-value>1</span>
          <button type="button" class="qty_btn" data-qty-inc aria-label="Increase quantity">+</button>
        </div>
      </section>

      <section class="opt" data-section="payment">
        <h2 class="opt_title">Payment</h2>
        <div class="paytoggle">
          <button type="button" class="paytoggle_btn" data-pay-mode="cash">Cash</button>
          <button type="button" class="paytoggle_btn" data-pay-mode="lease">Lease</button>
          <button type="button" class="paytoggle_btn" data-pay-mode="finance">Finance</button>
        </div>
        <div class="pay_meta">
          <div class="pay_figure" data-pay-figure></div>
          <div class="pay_sub" data-pay-sub></div>
        </div>
      </section>

      <section class="opt opt--summary" data-section="summary">
        <h2 class="opt_title">Your Olto</h2>
        <div class="summary" data-summary></div>
        <div class="summary_total">
          <span>Total</span>
          <span data-summary-total></span>
        </div>
        <p class="summary_note">Taxes and shipping calculated at checkout</p>
        <button type="button" class="config-clear" data-config-reset>Clear configuration</button>
      </section>
    </main>

    <footer class="orderbar">
      <div class="orderbar_total">
        <div class="orderbar_amount" data-total>&nbsp;</div>
        <div class="orderbar_label" data-total-label>Est. purchase price</div>
      </div>
      <div class="orderbar_actions">
        <button type="button" class="orderbar_save" data-save>Save</button>
        <button type="button" class="orderbar_cta" data-cta>Order</button>
      </div>
    </footer>

    <aside class="nudge" data-nudge hidden>
      <button type="button" class="nudge_close" data-nudge-close aria-label="Dismiss">&times;</button>
      <p class="nudge_title">Don&rsquo;t lose your design</p>
      <p class="nudge_body">Save it to share or finish later &mdash; or talk it through with an IM rep.</p>
      <div class="nudge_actions">
        <button type="button" class="nudge_save" data-save data-save-label="Save my design">
          Save my design
        </button>
        <a
          class="nudge_rep"
          href="https://www.infinitemachine.com/contact"
          target="_blank"
          rel="noopener"
        >
          Talk to a rep
        </a>
      </div>
    </aside>

    <div class="modal" data-interest hidden>
      <div class="modal_backdrop" data-interest-close></div>
      <div class="modal_sheet">
        <h3 class="modal_title">Not in your region yet</h3>
        <p class="modal_body">
          Olto is currently available in the United States and Canada. Register your
          interest and we&rsquo;ll let you know when Olto reaches you.
        </p>
        <a class="modal_cta" href="https://www.infinitemachine.com" target="_blank" rel="noopener">
          Visit infinitemachine.com
        </a>
        <button type="button" class="modal_close" data-interest-close>Close</button>
      </div>
    </div>

    <div class="modal" data-save-modal hidden>
      <div class="modal_backdrop" data-save-close></div>
      <div class="modal_sheet">
        <form data-save-form novalidate>
          <h3 class="modal_title">Save your design</h3>
          <p class="modal_body">
            We&rsquo;ll copy a link that rebuilds this exact Olto &mdash; share it or pick
            up where you left off on any device.
          </p>
          <input class="saveform_field" type="text" name="name" placeholder="Name" autocomplete="name" />
          <input class="saveform_field" type="email" name="email" placeholder="Email" autocomplete="email" inputmode="email" />
          <input class="saveform_field" type="tel" name="phone" placeholder="Phone" autocomplete="tel" inputmode="tel" />
          <p class="saveform_error" data-save-error hidden></p>
          <button type="submit" class="modal_cta">Save my design</button>
          <button type="button" class="modal_close" data-save-close>Close</button>
        </form>
        <div data-save-done hidden>
          <h3 class="modal_title">Design saved</h3>
          <p class="modal_body" data-save-done-msg>Link copied to your clipboard.</p>
          <p class="savedone_link" data-save-link></p>
          <button type="button" class="modal_cta" data-save-close>Done</button>
        </div>
      </div>
    </div>

  `}function Nr(t,e,r){var i,c;let a=(i=e.find(([,d])=>/silver/i.test(d.color)))==null?void 0:i[1],n=(c=e.find(([,d])=>/black/i.test(d.color)))==null?void 0:c[1],o={...t.wrapColorMap,Black:(n==null?void 0:n.colorHex)||"#1c1c1e"},s=["Black","Sand","Blush","Forest","Crimson"].filter(d=>r.has(d));return`
    <section class="opt" data-section="color">
      <h2 class="opt_title">Color</h2>
      <p class="opt_sub">Silver anodized finish. Vinyl wrap on top of the aluminum.</p>
      <div class="swatches swatches--labeled">
        <div class="swatch-opt">
          <button
            type="button"
            class="swatch"
            data-color-swatch=""
            style="--swatch: ${y((a==null?void 0:a.colorHex)||"#d7d7d7")}"
            aria-label="Silver"
          ></button>
          <div class="swatch_name">Silver</div>
          <div class="swatch_sub">Ships now</div>
        </div>
        <div class="swatch-box">
          <div class="swatch-box_label">Vinyl wrap</div>
          ${s.map(d=>{let l=parseFloat(r.get(d).price.amount);return`
          <div class="swatch-opt">
            <button
              type="button"
              class="swatch"
              data-color-swatch="${y(d)}"
              style="--swatch: ${y(o[d])}"
              aria-label="${y(d)} vinyl wrap"
            ></button>
            <div class="swatch_name">${y(d)}</div>
            <div class="swatch_sub">+${C(l)}</div>
          </div>`}).join("")}
        </div>
      </div>
    </section>
  `}function qr(t){return`
    <section class="opt" data-section="bundles">
      <h2 class="opt_title">Bundle</h2>
      <div class="kit-list">
        ${yt.map(e=>Pr(e,t)).join("")}
      </div>
    </section>
  `}function Pr(t,e){let r=t.items.reduce((s,i)=>{let c=Q(e.accessories.find(d=>d.handle===i));return s+(c?parseFloat(c.price.amount):0)},0),a=r-t.price,n=t.items.map(s=>{let i=e.accessories.find(c=>c.handle===s);return((i==null?void 0:i.title)||s).replace(/^Olto /,"")}),o=t.items.length?`<div class="kit_price">+${C(t.price)}</div>
       ${a>0?`<div class="kit_save"><s>${C(r)}</s> Save ${C(a)}</div>`:""}`:"";return`
    <button type="button" class="kit" data-bundle="${y(t.key)}">
      ${t.popular?'<span class="kit_chip">Most popular</span>':""}
      <div class="kit_top">
        <div class="kit_id">
          <div class="kit_name">${y(t.label)}</div>
          <div class="kit_tagline">${y(t.tagline)}</div>
        </div>
        <div class="kit_pricing">${o}</div>
      </div>
      ${n.length?`<div class="kit_items">${n.map(s=>`<span class="kit_item">${y(s)}</span>`).join("")}</div>`:""}
    </button>
  `}function Vr(t){var r;let e=Q(t);return e?`
    <div class="acc" data-acc="${y(t.handle)}">
      <img class="acc_img" src="${y(G((r=t.featuredImage)==null?void 0:r.url,240))}" alt="${y(t.title)}" loading="lazy" />
      <div class="acc_info">
        <div class="acc_name">${y(t.title)}</div>
        <div class="acc_price">${C(parseFloat(e.price.amount),e.price.currencyCode)}</div>
      </div>
      <button type="button" class="acc_btn" data-acc-toggle="${y(t.handle)}">Add</button>
    </div>
  `:""}function Q(t){return t&&(t.variants.find(e=>e.availableForSale)||t.variants[0])||null}function Xe(t,e){var n;let r=[];if(t.bikeLine){let o=((n=e.variants[t.baseNumericId])==null?void 0:n.color)||t.bikeLine.merchandise.title;r.push({label:`Olto &middot; ${y(o)}`,amount:parseFloat(t.bikeLine.merchandise.price.amount)})}t.wrapLine&&r.push({label:`Wrap &middot; ${y(t.wrapLine.merchandise.title)}`,amount:parseFloat(t.wrapLine.merchandise.price.amount)});for(let o of t.accessoryLines)r.push({label:y(o.merchandise.product.title),amount:parseFloat(o.merchandise.price.amount)});let a=t.quantity>1?`<div class="summary_qty">&times;${t.quantity} configurations</div>`:"";return r.map(o=>`
      <div class="summary_row">
        <span>${o.label}</span>
        <span>${C(o.amount,t.currency)}</span>
      </div>`).join("")+a}var L=window.gsap||null;L&&window.ScrollTrigger&&L.registerPlugin(window.ScrollTrigger);var m=document.querySelector("#app"),I=null,W=new Map,z="a",gt=null,Hr=new Set(["Sand"]),re=0,ae=null;Mr();async function Mr(){var r,a,n;let t=(r=Object.entries(S.variants).find(([,o])=>/silver/i.test(o.color)))==null?void 0:r[0];t&&(S.defaultVariantId=t);try{I=await je(S)}catch(o){console.error("[Tesla] Failed to load products:",o),Br();return}await Fr(),W=Ur(I.wrap),De(I),await Ne(S),Qe({config:S,products:I,bundles:yt.filter(o=>o.items.length).map(o=>({handle:o.key,products:o.items.map(s=>({handle:s}))}))}),m.innerHTML=Ze({config:S,products:I,wrapVariantsByColor:W}),Kr(),Ye(rr),rr(H()),ta();let e=Wr();e?Zr(e):H().bikeLine||ut(I.main.handle,mt(S.defaultVariantId)),aa(),oa();for(let o of W.values())(a=o.image)!=null&&a.url&&(new Image().src=o.image.url);for(let o of I.main.variants)(n=o.image)!=null&&n.url&&(new Image().src=G(o.image.url,1600))}async function Fr(){try{let{data:t}=await q.request('query { product(handle: "bottom-cover") { id handle title availableForSale featuredImage { url altText } variants(first: 5) { edges { node { id title availableForSale price { amount currencyCode } selectedOptions { name value } image { url altText } } } } } }'),e=t==null?void 0:t.product;e&&I.accessories.push({...e,variants:e.variants.edges.map(r=>r.node)})}catch(t){console.warn("[Tesla] Kit-only product fetch failed:",t)}}function Ur(t){var r;let e=new Map;if(!t)return e;for(let a of t.variants){let n=(r=a.selectedOptions)==null?void 0:r.find(s=>/colou?rs?/i.test(s.name)),o=(n==null?void 0:n.value)||a.title;o&&e.set(o,a)}return e}function Br(){m.innerHTML=`
    <div class="boot">
      <div class="boot_mark">INFINITE MACHINE</div>
      <div class="boot_label">Couldn&rsquo;t reach the store. Check your connection.</div>
      <button type="button" class="boot_retry" onclick="location.reload()">Retry</button>
    </div>
  `}function Kr(){m.addEventListener("click",t=>{let e=t.target.closest("[data-color-swatch]");if(e)return Gr(e.dataset.colorSwatch);let r=t.target.closest("[data-acc-scroll]");if(r)return jr(Number(r.dataset.accScroll));let a=t.target.closest("[data-acc-toggle]");if(a)return Qr(a.dataset.accToggle);let n=t.target.closest("[data-bundle]");if(n)return Yr(n.dataset.bundle);let o=t.target.closest("[data-pay-mode]");if(o)return ht(o.dataset.payMode);if(t.target.closest("[data-qty-dec]"))return ze(-1);if(t.target.closest("[data-qty-inc]"))return ze(1);if(t.target.closest("[data-save]"))return ea()?(t.target.closest("[data-nudge]")&&setTimeout(se,2200),Xr()):(t.target.closest("[data-nudge]")&&se(),er(!0));if(t.target.closest("[data-save-close]"))return er(!1);if(t.target.closest("[data-nudge-close]"))return se();if(t.target.closest("[data-config-reset]"))return Jr();if(t.target.closest("[data-cta]"))return zr();if(t.target.closest("[data-interest-close]"))return sr(!1)}),m.addEventListener("submit",t=>{t.target.closest("[data-save-form]")&&(t.preventDefault(),ra(t.target))})}var ne=null;function jr(t){let e=m.querySelector("[data-acc-list]");if(!e)return;let r=e.scrollLeft,a=Math.max(0,Math.min(e.scrollWidth-e.clientWidth,r+t*320));if(L&&!document.hidden){ne&&ne.kill();let n={v:r};ne=L.to(n,{v:a,duration:.45,ease:"power2.out",onUpdate:()=>{e.scrollLeft=n.v}})}else e.scrollLeft=a}var nr=Promise.resolve();function et(t,e){let r=ut(t,e);return nr=r.catch(()=>null),r}function Gr(t){let e=S.wrap.productHandle;if(!t)return et(e,null);let r=W.get(t);r&&et(e,r.id)}function Qr(t){var n,o;let e=H(),r=e.accessoryLines.some(s=>s.merchandise.product.handle===t),a=S.accessoryDependencies||{};if(r){et(t,null);let s=((n=a[t])==null?void 0:n.requiredBy)||[];for(let i of s)e.accessoryLines.some(c=>c.merchandise.product.handle===i)&&et(i,null);return}Je(t);for(let[s,i]of Object.entries(a))(o=i.requiredBy)!=null&&o.includes(t)&&(e.accessoryLines.some(d=>d.merchandise.product.handle===s)||Je(s))}function Je(t){let e=I.accessories.find(a=>a.handle===t),r=Q(e);r&&et(t,r.id)}var oe=!1;async function Yr(t){if(!oe){oe=!0;try{await nr;let e=H(),r=e.activeBundle===t,a=e.accessoryLines.map(s=>s.id).filter(s=>!String(s).startsWith("tmp_"));a.length&&await Kt(a);let n=yt.find(s=>s.key===t);if(r||!(n!=null&&n.items.length))return;let o=n.items.map(s=>{let i=Q(I.accessories.find(c=>c.handle===s));return i?{variantId:i.id,attributes:{_bundle:t}}:null}).filter(Boolean);o.length&&await Bt(o)}catch(e){console.error("[Tesla] Bundle select failed:",e)}finally{oe=!1}}}function ze(t){let e=H(),r=[e.bikeLine,e.wrapLine,...e.accessoryLines].filter(Boolean),a=Math.min(99,Math.max(1,e.quantity+t));if(a===e.quantity)return;let n=r.filter(o=>!String(o.id).startsWith("tmp_"));Promise.all(n.map(o=>Ve({lineId:o.id,quantity:a})))}function Wr(){let t=new URLSearchParams(window.location.search).get("d");if(!t)return null;let[e,r,a,n,o]=t.split(".");return!e||!S.variants[e]?null:{base:e,wrap:r||null,qty:Math.min(99,Math.max(1,parseInt(a,10)||1)),pay:["cash","lease","finance"].includes(n)?n:"finance",accs:(o||"").split("~").filter(Boolean)}}async function Zr(t){Ut();let e=[{variantId:mt(t.base),quantity:t.qty}],r=t.wrap?W.get(t.wrap):null;r&&e.push({variantId:r.id,quantity:t.qty});for(let n of t.accs){let o=Q(I.accessories.find(s=>s.handle===n));o&&e.push({variantId:o.id,quantity:t.qty})}ht(t.pay);try{await Bt(e)}catch(n){console.error("[Tesla] Failed to apply shared design:",n)}let a=new URLSearchParams(window.location.search);a.delete("d"),window.history.replaceState({},"",`${window.location.pathname}?${a.toString()}`)}function or(){let t=H(),e=t.wrapLine?cr(t.wrapLine.merchandise)||t.wrapLine.merchandise.title:"",r=t.accessoryLines.map(o=>o.merchandise.product.handle).join("~"),a=[t.baseNumericId,e,t.quantity,t.payMode,r].join("."),n=new URL(window.location.href);return n.searchParams.set("d",a),n.toString()}var tr=null;async function Xr(){let t=or(),e=[...m.querySelectorAll("[data-save]")];try{await navigator.clipboard.writeText(t);for(let r of e)r.textContent="Link copied"}catch{window.history.replaceState({},"",t);for(let r of e)r.textContent="Link in URL"}clearTimeout(tr),tr=setTimeout(()=>{for(let r of e)r.textContent=r.dataset.saveLabel||"Save"},2200)}var tt=null;async function Jr(){let t=m.querySelector("[data-config-reset]");if(!tt){t&&(t.textContent="Tap again to clear",t.classList.add("is-armed")),tt=setTimeout(()=>{tt=null,t&&(t.textContent="Clear configuration",t.classList.remove("is-armed"))},3e3);return}clearTimeout(tt),tt=null,t&&(t.textContent="Clear configuration",t.classList.remove("is-armed"));try{await Pe(lt())}catch(e){console.error("[Tesla] Clear failed:",e)}ht("finance"),ut(I.main.handle,mt(S.defaultVariantId))}function zr(){let t=H();if(!t.ready)return;if(t.region==="row")return sr(!0);let e=qe();e&&(window.location.href=e)}function ta(){let t=m.querySelector("[data-nudge]"),e=m.querySelector('[data-section="payment"]');if(!t||!e)return;let r=new IntersectionObserver(a=>{a.some(n=>n.isIntersecting)&&(r.disconnect(),t.hidden=!1,requestAnimationFrame(()=>t.classList.add("is-in")))},{threshold:.3});r.observe(e)}function se(){let t=m.querySelector("[data-nudge]");!t||t.hidden||(t.classList.remove("is-in"),setTimeout(()=>{t.hidden=!0},450))}function sr(t){let e=m.querySelector("[data-interest]");e&&(e.hidden=!t)}var ir="olto_tesla_lead";function ea(){try{let t=JSON.parse(localStorage.getItem(ir));return t!=null&&t.email?t:null}catch{return null}}function er(t){var r;let e=m.querySelector("[data-save-modal]");if(e&&(e.hidden=!t,t)){let a=e.querySelector("[data-save-form]"),n=e.querySelector("[data-save-done]");a&&(a.hidden=!1),n&&(n.hidden=!0),(r=e.querySelector('input[name="name"]'))==null||r.focus()}}async function ra(t){let e=t.name.value.trim(),r=t.email.value.trim(),a=t.phone.value.trim(),n=t.querySelector("[data-save-error]"),o=null;if(e?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)?a.replace(/\D/g,"").length<7&&(o="That phone number looks too short."):o="That email doesn\u2019t look right.":o="Please add your name.",o){n&&(n.textContent=o,n.hidden=!1);return}n&&(n.hidden=!0);try{localStorage.setItem(ir,JSON.stringify({name:e,email:r,phone:a}))}catch{}let s=or(),i=!0;try{await navigator.clipboard.writeText(s)}catch{i=!1}t.hidden=!0;let c=m.querySelector("[data-save-done]");if(c){c.hidden=!1;let d=c.querySelector("[data-save-done-msg]");d&&(d.textContent=i?"Link copied to your clipboard \u2014 it rebuilds this exact Olto.":"Copy your link below \u2014 it rebuilds this exact Olto.");let l=c.querySelector("[data-save-link]");l&&(l.textContent=s)}}async function aa(){let t=new AbortController,e=setTimeout(()=>t.abort(),8e3);try{let a=(await(await fetch("https://get.geojs.io/v1/ip/country",{signal:t.signal})).text()).trim().toUpperCase();Jt(["US","CA"].includes(a)?"us":"row")}catch{Jt("")}finally{clearTimeout(e)}}function rr(t){var M,N,ie,ce,le,de,ue;if(!t.ready)return;let e=S.variants[t.baseNumericId]||{};Y("[data-delivery]",e.delivery?`Est. delivery ${e.delivery}`:"");let r=t.wrapLine?cr(t.wrapLine.merchandise)||t.wrapLine.merchandise.title:"";for(let f of m.querySelectorAll("[data-color-swatch]"))f.classList.toggle("is-selected",t.wrapLine?f.dataset.colorSwatch===r:f.dataset.colorSwatch==="");let a=new Set(t.accessoryLines.map(f=>f.merchandise.product.handle)),n={},o=new Set;for(let f of S.customImageRules||[])if(f.when.every(v=>a.has(v))){Object.assign(n,f.replace||{});for(let v of f.hide||[])o.add(v)}let s=!1;for(let f of m.querySelectorAll("[data-layer]")){let v=f.dataset.layer,R=a.has(v)&&!o.has(v),F=n[v]||ee[v];F&&f.getAttribute("src")!==F&&f.setAttribute("src",F),f.classList.toggle("is-on",R),R&&(s=!0)}let i=(N=(M=I.main.variants.find(f=>pt(f.id)===t.baseNumericId))==null?void 0:M.image)==null?void 0:N.url,c=t.region==="row"?"eu":"us",d=(c==="eu"?e.backgroundImage:G(i,1600))||G(i,1600)||e.backgroundImage,l=t.wrapLine?(ce=(ie=W.get(r))==null?void 0:ie.image)==null?void 0:ce.url:null,p=l&&!Hr.has(r);if(t.wrapLine&&r==="Black"){let f=I.main.variants.find(v=>{var R;return((R=S.variants[pt(v.id)])==null?void 0:R.color)==="Black"});(le=f==null?void 0:f.image)!=null&&le.url&&(l=G(f.image.url,1600),p=!0)}r==="Custom"&&(l=null),(de=m.querySelector("[data-layers]"))==null||de.classList.toggle("is-suppressed",!!l&&!p&&s),l?ar(l,`wrap:${r}`):ar(d,`base:${t.baseNumericId}:${c}`);for(let f of m.querySelectorAll("[data-bundle]"))f.classList.toggle("is-selected",f.dataset.bundle===t.activeBundle);let h=new Set(t.accessoryLines.map(f=>f.merchandise.product.handle));for(let f of m.querySelectorAll("[data-acc-toggle]")){let v=h.has(f.dataset.accToggle);f.textContent=v?"Added":"Add",f.classList.toggle("is-added",v),(ue=f.closest("[data-acc]"))==null||ue.classList.toggle("is-added",v)}let g=m.querySelector("[data-acc-list]");if(g){let f=[...g.querySelectorAll(".acc")],v=[...f].sort((R,F)=>(h.has(R.dataset.acc)?1:0)-(h.has(F.dataset.acc)?1:0));if(f.some((R,F)=>R!==v[F]))for(let R of v)g.appendChild(R)}Y("[data-qty-value]",String(t.quantity));let k=m.querySelector("[data-summary]");k&&(k.innerHTML=Xe(t,S)),Y("[data-summary-total]",C(t.total,t.currency));let w=We(t.total,t.currency,t.payMode);for(let f of m.querySelectorAll("[data-pay-mode]"))f.classList.toggle("is-active",f.dataset.payMode===t.payMode);Y("[data-pay-figure]",C(w.amount,t.currency)+w.suffix),Y("[data-pay-sub]",w.sub),na(w.amount,w.suffix,t.currency),Y("[data-total-label]",w.label);let D=m.querySelector("[data-cta]");D&&(D.textContent=t.region==="row"?"Register interest":"Order")}function cr(t){var r;let e=(r=t.selectedOptions)==null?void 0:r.find(a=>/colou?rs?/i.test(a.name));return(e==null?void 0:e.value)||null}function Y(t,e){let r=m.querySelector(t);r&&r.textContent!==e&&(r.textContent=e)}function na(t,e,r){let a=m.querySelector("[data-total]");if(a){if(L&&!document.hidden&&re!==t){ae&&ae.kill();let n={v:re};ae=L.to(n,{v:t,duration:.45,ease:"power2.out",onUpdate:()=>{a.textContent=C(n.v,r)+e},onComplete:()=>{a.textContent=C(t,r)+e}})}else a.textContent=C(t,r)+e;re=t}}function ar(t,e){if(!t||e===gt)return;let r={a:m.querySelector('[data-hero-img="a"]'),b:m.querySelector('[data-hero-img="b"]')};if(!r.a||!r.b)return;if(gt===null){r[z].src=t,gt=e;return}let a=r[z],n=r[z==="a"?"b":"a"];n.src=t,z=z==="a"?"b":"a",gt=e,L?(L.set(n,{opacity:0,scale:1.04,xPercent:0,yPercent:0}),n.classList.add("is-active"),L.to(n,{opacity:1,scale:1,duration:.45,ease:"power2.out"}),L.to(a,{opacity:0,duration:.45,ease:"power2.out",onComplete:()=>a.classList.remove("is-active")})):(n.classList.add("is-active"),n.style.opacity=1,a.classList.remove("is-active"),a.style.opacity=0)}function oa(){if(!L||!window.ScrollTrigger||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let t=m.querySelector(".sheet");for(let e of m.querySelectorAll(".opt"))L.from(e,{y:24,opacity:0,duration:.45,ease:"power2.out",scrollTrigger:{trigger:e,scroller:t,start:"top 88%",once:!0}})}})();
