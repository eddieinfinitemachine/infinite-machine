"use strict";(()=>{var w={id:"olto",steps:[{type:"location",no:"01",title:"Location",validation:!0,collapsible:!1},{type:"variant",no:"02",title:"Base"},{type:"wrap",no:"03",title:"Wrap"},{type:"bundle",no:"04",title:"Accessory Pack"},{type:"accessories",no:"05",title:"Configure your Accessories"},{type:"quantity",no:"06",title:"Quantity"}],product:{handle:"olto-1"},accessoriesCollection:"olto-accessories",testInstructionVideo:"https://vz-19725589-529.b-cdn.net/a4c98a2a-412b-4e2e-a2ce-4e9a64123464/playlist.m3u8",wrap:{productHandle:"olto-wrap"},bundles:{metaobjectType:"bundles"},variants:{44842879156380:{color:"Black",colorHex:"#000000",delivery:"July 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff73905e7daa5ef224c5d5_olto-eu-black.avif"},44842879123612:{color:"Silver",colorHex:"#D9D9D9",delivery:"August 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff7390e94ecc537b713a30_olto-eu-silver.avif"}},defaultVariantId:"44842879156380",wrapColorMap:{Sand:"#DECEAF",Blush:"#F6C6DC",Sky:"#707A8D",Forest:"#627063",Crimson:"#B44C47"},accessoryDependencies:{"olto-rear-rack":{requiredBy:["olto-rear-basket","olto-side-mounting-plate"]}},customImageRules:[{when:["olto-soft-bag","olto-rear-basket"],replace:{"olto-soft-bag":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/69219c3d619077ba6f1689ed_Soft%20Bag%20in%20Rear%20Basket.avif"}},{when:["olto-charging-dock","olto-battery"],replace:{"olto-battery":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6921a4037d0eab061d3d7ca4_Battery%20Dock%20with%20Battery%20Plugged%20in.avif"},hide:["olto-charging-dock"]}]};var B="GraphQL Client";var Se="An error occurred while fetching from the API. Review 'graphQLErrors' for details.",_e="Response returned unexpected Content-Type:",Ee="An unknown error has occurred. The API did not return a data object or any errors in its response.",ne={json:"application/json",multipart:"multipart/mixed"},Ce="X-SDK-Variant",Ie="X-SDK-Version",yt="shopify-graphql-client",gt="1.4.2",oe=1e3,bt=[429,503],Ae=/@(defer)\b/i,ht=`\r
`,vt=/boundary="?([^=";]+)"?/i,$e=ht+ht;function x(e,t=B){return e.startsWith(`${t}`)?e:`${t}: ${e}`}function N(e){return e instanceof Error?e.message:JSON.stringify(e)}function Re(e){return e instanceof Error&&e.cause?e.cause:void 0}function Le(e){return e.flatMap(({errors:t})=>t!=null?t:[])}function se({client:e,retries:t}){if(t!==void 0&&(typeof t!="number"||t<0||t>3))throw new Error(`${e}: The provided "retries" value (${t}) is invalid - it cannot be less than ${0} or greater than ${3}`)}function S(e,t){return t&&(typeof t!="object"||Array.isArray(t)||typeof t=="object"&&Object.keys(t).length>0)?{[e]:t}:{}}function Te(e,t){if(e.length===0)return t;let a={[e.pop()]:t};return e.length===0?a:Te(e,a)}function _t(e,t){return Object.keys(t||{}).reduce((r,a)=>(typeof t[a]=="object"||Array.isArray(t[a]))&&e[a]?(r[a]=_t(e[a],t[a]),r):(r[a]=t[a],r),Array.isArray(e)?[...e]:{...e})}function Oe([e,...t]){return t.reduce(_t,{...e})}function xe({clientLogger:e,customFetchApi:t=fetch,client:r=B,defaultRetryWaitTime:a=oe,retriableCodes:n=bt}){let o=async(s,i,c)=>{let d=i+1,l=c+1,p;try{if(p=await t(...s),e({type:"HTTP-Response",content:{requestParams:s,response:p}}),!p.ok&&n.includes(p.status)&&d<=l)throw new Error;let h=(p==null?void 0:p.headers.get("X-Shopify-API-Deprecated-Reason"))||"";return h&&e({type:"HTTP-Response-GraphQL-Deprecation-Notice",content:{requestParams:s,deprecationNotice:h}}),p}catch(h){if(d<=l){let g=p==null?void 0:p.headers.get("Retry-After");return await ur(g?parseInt(g,10):a),e({type:"HTTP-Retry",content:{requestParams:s,lastResponse:p,retryAttempt:i,maxRetries:c}}),o(s,d,c)}throw new Error(x(`${c>0?`Attempted maximum number of ${c} network retries. Last message - `:""}${N(h)}`,r))}};return o}async function ur(e){return new Promise(t=>setTimeout(t,e))}function ke({headers:e,url:t,customFetchApi:r=fetch,retries:a=0,logger:n}){se({client:B,retries:a});let o={headers:e,url:t,retries:a},s=fr(n),i=xe({customFetchApi:r,clientLogger:s,defaultRetryWaitTime:oe}),c=pr(i,o),d=mr(c),l=Sr(c);return{config:o,fetch:c,request:d,requestStream:l}}function fr(e){return t=>{e&&e(t)}}async function Et(e){let{errors:t,data:r,extensions:a}=await e.json();return{...S("data",r),...S("extensions",a),headers:e.headers,...t||!r?{errors:{networkStatusCode:e.status,message:x(t?Se:Ee),...S("graphQLErrors",t),response:e}}:{}}}function pr(e,{url:t,headers:r,retries:a}){return async(n,o={})=>{let{variables:s,headers:i,url:c,retries:d,keepalive:l,signal:p}=o,h=JSON.stringify({query:n,variables:s});se({client:B,retries:d});let g=Object.entries({...r,...i}).reduce(($,[R,F])=>($[R]=Array.isArray(F)?F.join(", "):F.toString(),$),{});!g[Ce]&&!g[Ie]&&(g[Ce]=yt,g[Ie]=gt);let D=[c!=null?c:t,{method:"POST",headers:g,body:h,signal:p,keepalive:l}];return e(D,1,d!=null?d:a)}}function mr(e){return async(...t)=>{if(Ae.test(t[0]))throw new Error(x("This operation will result in a streamable response - use requestStream() instead."));let r=null;try{r=await e(...t);let{status:a,statusText:n}=r,o=r.headers.get("content-type")||"";return r.ok?o.includes(ne.json)?await Et(r):{errors:{networkStatusCode:a,message:x(`${_e} ${o}`),response:r}}:{errors:{networkStatusCode:a,message:x(n),response:r}}}catch(a){return{errors:{message:N(a),...r==null?{}:{networkStatusCode:r.status,response:r}}}}}}async function*hr(e){let t=new TextDecoder;if(e.body[Symbol.asyncIterator])for await(let r of e.body)yield t.decode(r);else{let r=e.body.getReader(),a;try{for(;!(a=await r.read()).done;)yield t.decode(a.value)}finally{r.cancel()}}}function yr(e,t){return{async*[Symbol.asyncIterator](){try{let r="";for await(let a of e)if(r+=a,r.indexOf(t)>-1){let n=r.lastIndexOf(t),s=r.slice(0,n).split(t).filter(i=>i.trim().length>0).map(i=>i.slice(i.indexOf($e)+$e.length).trim());s.length>0&&(yield s),r=r.slice(n+t.length),r.trim()==="--"&&(r="")}}catch(r){throw new Error(`Error occured while processing stream payload - ${N(r)}`)}}}}function gr(e){return{async*[Symbol.asyncIterator](){try{yield{...await Et(e),hasNext:!1}}catch(t){yield{errors:{message:x(N(t)),networkStatusCode:e.status,response:e},hasNext:!1}}}}}function br(e){return e.map(t=>{try{return JSON.parse(t)}catch(r){throw new Error(`Error in parsing multipart response - ${N(r)}`)}}).map(t=>{let{data:r,incremental:a,hasNext:n,extensions:o,errors:s}=t;if(!a)return{data:r||{},...S("errors",s),...S("extensions",o),hasNext:n};let i=a.map(({data:c,path:d,errors:l})=>({data:c&&d?Te(d,c):{},...S("errors",l)}));return{data:i.length===1?i[0].data:Oe([...i.map(({data:c})=>c)]),...S("errors",Le(i)),hasNext:n}})}function vr(e,t){if(e.length>0)throw new Error(Se,{cause:{graphQLErrors:e}});if(Object.keys(t).length===0)throw new Error(Ee)}function wr(e,t){var i,c;let r=(t!=null?t:"").match(vt),a=`--${r?r[1]:"-"}`;if(!((i=e.body)!=null&&i.getReader)&&!((c=e.body)!=null&&c[Symbol.asyncIterator]))throw new Error("API multipart response did not return an iterable body",{cause:e});let n=hr(e),o={},s;return{async*[Symbol.asyncIterator](){var d,l;try{let p=!0;for await(let h of yr(n,a)){let g=br(h);s=(l=(d=g.find($=>$.extensions))==null?void 0:d.extensions)!=null?l:s;let D=Le(g);o=Oe([o,...g.map(({data:$})=>$)]),p=g.slice(-1)[0].hasNext,vr(D,o),yield{...S("data",o),...S("extensions",s),hasNext:p}}if(p)throw new Error("Response stream terminated unexpectedly")}catch(p){let h=Re(p);yield{...S("data",o),...S("extensions",s),errors:{message:x(N(p)),networkStatusCode:e.status,...S("graphQLErrors",h==null?void 0:h.graphQLErrors),response:e},hasNext:!1}}}}}function Sr(e){return async(...t)=>{if(!Ae.test(t[0]))throw new Error(x("This operation does not result in a streamable response - use request() instead."));try{let r=await e(...t),{statusText:a}=r;if(!r.ok)throw new Error(a,{cause:r});let n=r.headers.get("content-type")||"";switch(!0){case n.includes(ne.json):return gr(r);case n.includes(ne.multipart):return wr(r,n);default:throw new Error(`${_e} ${n}`,{cause:r})}}catch(r){return{async*[Symbol.asyncIterator](){let a=Re(r);yield{errors:{message:x(N(r)),...S("networkStatusCode",a==null?void 0:a.status),...S("response",a)},hasNext:!1}}}}}}function De({client:e,storeDomain:t}){try{if(!t||typeof t!="string")throw new Error;let r=t.trim(),a=r.match(/^https?:/)?r:`https://${r}`,n=new URL(a);return n.protocol="https",n.origin}catch(r){throw new Error(`${e}: a valid store domain ("${t}") must be provided`,{cause:r})}}function ie({client:e,currentSupportedApiVersions:t,apiVersion:r,logger:a}){let n=`${e}: the provided apiVersion ("${r}")`,o=`Currently supported API versions: ${t.join(", ")}`;if(!r||typeof r!="string")throw new Error(`${n} is invalid. ${o}`);let s=r.trim();t.includes(s)||(a?a({type:"Unsupported_Api_Version",content:{apiVersion:r,supportedApiVersions:t}}):console.warn(`${n} is likely deprecated or not supported. ${o}`))}function ce(e){let t=e*3-2;return t===10?t:`0${t}`}function Ne(e,t,r){let a=t-r;return a<=0?`${e-1}-${ce(a+4)}`:`${e}-${ce(a)}`}function Ct(){let e=new Date,t=e.getUTCMonth(),r=e.getUTCFullYear(),a=Math.floor(t/3+1);return{year:r,quarter:a,version:`${r}-${ce(a)}`}}function qe(){let{year:e,quarter:t,version:r}=Ct(),a=t===4?`${e+1}-01`:`${e}-${ce(t+1)}`;return[Ne(e,t,3),Ne(e,t,2),Ne(e,t,1),r,a,"unstable"]}function Pe(e){return t=>({...t!=null?t:{},...e.headers})}function He({getHeaders:e,getApiUrl:t}){return(r,a)=>{let n=[r];if(a&&Object.keys(a).length>0){let{variables:o,apiVersion:s,headers:i,retries:c,signal:d}=a;n.push({...o?{variables:o}:{},...i?{headers:e(i)}:{},...s?{url:t(s)}:{},...c?{retries:c}:{},...d?{signal:d}:{}})}return n}}var Ve="application/json",It="storefront-api-client",At="1.0.10",$t="X-Shopify-Storefront-Access-Token",Rt="Shopify-Storefront-Private-Token",Lt="X-SDK-Variant",Tt="X-SDK-Version",Ot="X-SDK-Variant-Source",K="Storefront API Client";function xt(e){if(e&&typeof window!="undefined")throw new Error(`${K}: private access tokens and headers should only be used in a server-to-server implementation. Use the public API access token in nonserver environments.`)}function kt(e,t){if(!e&&!t)throw new Error(`${K}: a public or private access token must be provided`);if(e&&t)throw new Error(`${K}: only provide either a public or private access token`)}function Me({storeDomain:e,apiVersion:t,publicAccessToken:r,privateAccessToken:a,clientName:n,retries:o=0,customFetchApi:s,logger:i}){let c=qe(),d=De({client:K,storeDomain:e}),l={client:K,currentSupportedApiVersions:c,logger:i};ie({...l,apiVersion:t}),kt(r,a),xt(a);let p=_r(d,t,l),h={storeDomain:d,apiVersion:t,...r?{publicAccessToken:r}:{privateAccessToken:a},headers:{"Content-Type":Ve,Accept:Ve,[Lt]:It,[Tt]:At,...n?{[Ot]:n}:{},...r?{[$t]:r}:{[Rt]:a}},apiUrl:p(),clientName:n},g=ke({headers:h.headers,url:h.apiUrl,retries:o,customFetchApi:s,logger:i}),D=Pe(h),$=Er(h,p),R=He({getHeaders:D,getApiUrl:$});return Object.freeze({config:h,getHeaders:D,getApiUrl:$,fetch:(...q)=>g.fetch(...R(...q)),request:(...q)=>g.request(...R(...q)),requestStream:(...q)=>g.requestStream(...R(...q))})}function _r(e,t,r){return a=>{a&&ie({...r,apiVersion:a});let n=(a!=null?a:t).trim();return`${e}/api/${n}/graphql.json`}}function Er(e,t){return r=>r?t(r):e.apiUrl}var le={SHOPIFY_STORE_DOMAIN:"shop.infinitemachine.com",SHOPIFY_STOREFRONT_PUBLIC_TOKEN:"eefb42e32220791a7472aaa5d2cf2182",SHOPIFY_API_VERSION:"2026-04"};var P=Me({storeDomain:le.SHOPIFY_STORE_DOMAIN,apiVersion:le.SHOPIFY_API_VERSION,publicAccessToken:le.SHOPIFY_STOREFRONT_PUBLIC_TOKEN});var qt="olto_cart_",Cr="cfg_",Ue="config",k=null,u=null,j=null,Ke=null,I=null,de=[],Ir=[];function H(e){j=e,u=e}var X=null;function Pt(e){X=e}async function Ht(e){var r;Ke=e.id,I=Dt()||Bt();let t=Tr();if(t)try{let a=await $r(t);a&&(k=t,H(a))}catch(a){console.warn("[Cart] Failed to restore cart, will create new:",a)}if(!k){let a=await Ar();H(a),k=a.id,Or(k)}if(!Dt()&&((r=u==null?void 0:u.lines)!=null&&r.length)){let a=Rr(u);a&&(I=a)}return jt(I),A(),Kt(),u}function Vt(){return u==null?void 0:u.checkoutUrl}function ue(){return I}function je(){return I=Bt(),jt(I),Kt(),I}async function Mt(e){z();let t=j,r=((t==null?void 0:t.lines)||[]).filter(a=>{var n;return((n=a.attributesByKey)==null?void 0:n._config_id)===e}).map(a=>a.id);r.length!==0&&(await Ge(r),e===I&&je())}async function Qe(e){z();let t=u,r=Be(I),a=e.map(o=>Qt(o.variantId,o.quantity||r,{...o.attributes||{},_config_id:I})).filter(Boolean);a.length&&(u=Gt(u,a),A());let n=e.map(o=>({merchandiseId:o.variantId,quantity:o.quantity||r,attributes:J({...o.attributes||{},_config_id:I})}));try{return H(await fe(()=>Q("cartLinesAdd",`
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ${V} }
          userErrors { field message }
        }
      }
    `,{cartId:k,lines:n}))),A(),u}catch(o){throw u=t,A(),o}}async function Ge(e){z();let t=u,r=new Set(e);u&&(u={...u,lines:u.lines.filter(a=>!r.has(a.id))},A());try{return H(await fe(()=>Q("cartLinesRemove",`
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ${V} }
          userErrors { field message }
        }
      }
    `,{cartId:k,lineIds:e}))),A(),u}catch(a){throw u=t,A(),a}}async function Ft({lineId:e,variantId:t,quantity:r,attributes:a}){z();let n=u;u&&(u={...u,lines:u.lines.map(s=>{if(s.id!==e)return s;let i={...s};if(t!==void 0){let c=We(t)||s.merchandise;i.merchandise=c}if(r!==void 0&&(i.quantity=r),a!==void 0){let c=J(a);i.attributes=c,i.attributesByKey=Object.fromEntries(c.map(d=>[d.key,d.value]))}return i})},A());let o={id:e};t!==void 0&&(o.merchandiseId=t),r!==void 0&&(o.quantity=r),a!==void 0&&(o.attributes=J(a));try{return H(await fe(()=>Q("cartLinesUpdate",`
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ${V} }
          userErrors { field message }
        }
      }
    `,{cartId:k,lines:[o]}))),A(),u}catch(s){throw u=n,A(),s}}function Ut(e){return de.push(e),u&&e(u),()=>{de=de.filter(t=>t!==e)}}var V=`
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
`;async function Ar(){var a;let{data:e,errors:t}=await P.request(`
    mutation CartCreate {
      cartCreate(input: {}) {
        cart { ${V} }
        userErrors { field message }
      }
    }
  `);if(t)throw new Error(`[Cart] createCart errors: ${JSON.stringify(t)}`);let r=(a=e==null?void 0:e.cartCreate)==null?void 0:a.userErrors;if(r!=null&&r.length)throw new Error(`[Cart] createCart userErrors: ${JSON.stringify(r)}`);return Ye(e.cartCreate.cart)}async function $r(e){let{data:t,errors:r}=await P.request(`
    query GetCart($id: ID!) {
      cart(id: $id) { ${V} }
    }
  `,{variables:{id:e}});if(r)throw new Error(`[Cart] queryCart errors: ${JSON.stringify(r)}`);return t!=null&&t.cart?Ye(t.cart):null}async function Q(e,t,r){var s;let{data:a,errors:n}=await P.request(t,{variables:r});if(n)throw new Error(`[Cart] ${e} errors: ${JSON.stringify(n)}`);let o=a==null?void 0:a[e];if((s=o==null?void 0:o.userErrors)!=null&&s.length)throw new Error(`[Cart] ${e} userErrors: ${JSON.stringify(o.userErrors)}`);return Ye(o.cart)}function Ye(e){let t=e.attributes||[];return{id:e.id,checkoutUrl:e.checkoutUrl,totalQuantity:e.totalQuantity,cost:e.cost,attributes:t,attributesByKey:Object.fromEntries(t.map(r=>[r.key,r.value])),lines:e.lines.edges.map(({node:r})=>({id:r.id,quantity:r.quantity,attributes:r.attributes,attributesByKey:Object.fromEntries(r.attributes.map(a=>[a.key,a.value])),merchandise:r.merchandise}))}}function J(e){return Object.entries(e).filter(([,t])=>t!=null&&t!=="").map(([t,r])=>({key:t,value:String(r)}))}function z(){if(!k)throw new Error("[Cart] Called before initCart(config)")}function A(){for(let e of de)e(u)}function Bt(){return`${Cr}${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Be(e){var a;let t=j||u;if(!((a=t==null?void 0:t.lines)!=null&&a.length))return 1;let r=t.lines.find(n=>{var o;return((o=n.attributesByKey)==null?void 0:o._config_id)===e});return(r==null?void 0:r.quantity)||1}function Kt(){for(let e of Ir)e(I)}function Dt(){return typeof window=="undefined"?null:new URLSearchParams(window.location.search).get(Ue)}function jt(e){if(typeof window=="undefined")return;let t=new URLSearchParams(window.location.search);e?t.set(Ue,e):t.delete(Ue),window.history.replaceState({},"",`${window.location.pathname}?${t.toString()}`)}function Rr(e){var r;if(!((r=e==null?void 0:e.lines)!=null&&r.length))return null;let t=e.lines.map(a=>{var n;return(n=a.attributesByKey)==null?void 0:n._config_id}).filter(Boolean).sort();return t[t.length-1]||null}var Nt=Promise.resolve();async function fe(e){let t=Nt,r;Nt=new Promise(a=>{r=a}),await t;try{return await e()}finally{r()}}var Fe=new Map;function Lr(e,t){let r=Fe.get(e)||{inflight:null,latest:null};return r.latest=t,Fe.set(e,r),r.inflight||(r.inflight=(async()=>{for(;r.latest;){let a=r.latest;r.latest=null;try{await fe(a)}catch(n){console.error(`[Cart] coalesce(${e}) error:`,n)}}r.inflight=null,Fe.delete(e)})()),r.inflight}async function pe(e,t){z();let r=I;if(u){let a=u.lines.findIndex(n=>{var o;return n.merchandise.product.handle===e&&((o=n.attributesByKey)==null?void 0:o._config_id)===r});if(a>=0&&t===null)u={...u,lines:u.lines.filter((n,o)=>o!==a)};else if(a>=0&&t){let n=We(t);n&&(u={...u,lines:u.lines.map((o,s)=>s===a?{...o,merchandise:n}:o)})}else if(a<0&&t){let n=Be(r),o=Qt(t,n,{_config_id:r});o&&(u=Gt(u,[o]))}A()}return Lr(`product:${e}:${r}`,async()=>{let a=j==null?void 0:j.lines.find(n=>{var o;return n.merchandise.product.handle===e&&((o=n.attributesByKey)==null?void 0:o._config_id)===r});if(t===null){a&&(H(await Q("cartLinesRemove",`
          mutation($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart { ${V} } userErrors { field message }
            }
          }
        `,{cartId:k,lineIds:[a.id]})),A());return}if(a)H(await Q("cartLinesUpdate",`
        mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart { ${V} } userErrors { field message }
          }
        }
      `,{cartId:k,lines:[{id:a.id,merchandiseId:t}]}));else{let n=Be(r);H(await Q("cartLinesAdd",`
        mutation($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart { ${V} } userErrors { field message }
          }
        }
      `,{cartId:k,lines:[{merchandiseId:t,quantity:n,attributes:J({_config_id:r})}]}))}A()})}function We(e){if(!X)return null;let t=[X.main,X.wrap,...X.accessories||[]].filter(Boolean);for(let r of t){let a=r.variants.find(n=>n.id===e);if(a)return{id:a.id,title:a.title,price:a.price,image:a.image,selectedOptions:a.selectedOptions,product:{id:r.id,handle:r.handle,title:r.title}}}return null}function Qt(e,t,r){let a=We(e);if(!a)return null;let n=J(r);return{id:`tmp_${Math.random().toString(36).slice(2,10)}`,quantity:t,attributes:n,attributesByKey:Object.fromEntries(n.map(o=>[o.key,o.value])),merchandise:a}}function Gt(e,t){return e&&{...e,lines:[...e.lines,...t],totalQuantity:(e.totalQuantity||0)+t.reduce((r,a)=>r+(a.quantity||1),0)}}function Tr(){return typeof localStorage=="undefined"?null:localStorage.getItem(`${qt}${Ke}`)}function Or(e){typeof localStorage!="undefined"&&localStorage.setItem(`${qt}${Ke}`,e)}var Ze=new Map,Xe=`
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
`;async function Yt(e){var i;if(Ze.has(e.id))return Ze.get(e.id);let t=!!((i=e.wrap)!=null&&i.productHandle),r=`
    query LoadConfigurator(
      $productHandle: String!
      $accessoriesHandle: String!
      ${t?"$wrapHandle: String!":""}
    ) {
      main: product(handle: $productHandle) { ${Xe} }
      accessoriesCollection: collection(handle: $accessoriesHandle) {
        title
        handle
        products(first: 50) {
          edges { node { ${Xe} } }
        }
      }
      ${t?`wrap: product(handle: $wrapHandle) { ${Xe} }`:""}
    }
  `,a={productHandle:e.product.handle,accessoriesHandle:e.accessoriesCollection};t&&(a.wrapHandle=e.wrap.productHandle);let{data:n,errors:o}=await P.request(r,{variables:a});if(o)throw new Error(`[Products] GraphQL errors: ${JSON.stringify(o)}`);if(!n.main)throw new Error(`[Products] Product not found: ${e.product.handle}`);if(!n.accessoriesCollection)throw new Error(`[Products] Collection not found: ${e.accessoriesCollection}`);let s={main:Je(n.main),wrap:n.wrap?Je(n.wrap):null,accessories:n.accessoriesCollection.products.edges.map(c=>Je(c.node))};return Ze.set(e.id,s),s}function Je(e){var t,r,a;return{id:e.id,handle:e.handle,title:e.title,description:e.description,availableForSale:e.availableForSale,productType:e.productType,vendor:e.vendor,tags:e.tags||[],featuredImage:e.featuredImage,accessoryEta:((t=e.accessoryEta)==null?void 0:t.value)||null,instructionVideo:((r=e.instructionVideo)==null?void 0:r.value)||null,collections:(((a=e.collections)==null?void 0:a.edges)||[]).map(n=>n.node),variants:e.variants.edges.map(({node:n})=>({id:n.id,title:n.title,availableForSale:n.availableForSale,quantityAvailable:n.quantityAvailable,price:n.price,compareAtPrice:n.compareAtPrice,selectedOptions:n.selectedOptions,image:n.image}))}}var ze=null,et=null,Wt=[],me=[],b={ready:!1,region:"",baseNumericId:null,bikeLine:null,wrapLine:null,accessoryLines:[],activeBundle:null,quantity:1,total:0,currency:"USD",payMode:"finance",cart:null};function he(e){return String(e).split("/").pop()}function ye(e){return`gid://shopify/ProductVariant/${e}`}function Zt(e){ze=e.config,et=e.products,Wt=e.bundles||[],b.baseNumericId=ze.defaultVariantId,Ut(xr)}function L(){return b}function Xt(e){return me.push(e),()=>{me=me.filter(t=>t!==e)}}function tt(e){b.region=e,rt()}function ge(e){b.payMode=e,rt()}function rt(){for(let e of me)e(b)}function xr(e){var c,d;let t=ue(),r=((e==null?void 0:e.lines)||[]).filter(l=>{var p;return((p=l.attributesByKey)==null?void 0:p._config_id)===t}),a=et.main.handle,n=(c=ze.wrap)==null?void 0:c.productHandle,o=new Set(et.accessories.map(l=>l.handle));b.cart=e,b.bikeLine=r.find(l=>l.merchandise.product.handle===a)||null,b.wrapLine=r.find(l=>l.merchandise.product.handle===n)||null,b.accessoryLines=r.filter(l=>o.has(l.merchandise.product.handle)),b.bikeLine&&(b.baseNumericId=he(b.bikeLine.merchandise.id)),b.quantity=((d=r[0])==null?void 0:d.quantity)||1;let s=0;for(let l of r)s+=parseFloat(l.merchandise.price.amount)*(l.quantity||1),l.merchandise.price.currencyCode&&(b.currency=l.merchandise.price.currencyCode);b.total=s;let i=new Set(b.accessoryLines.map(l=>l.merchandise.product.handle));b.activeBundle=null;for(let l of Wt){let p=(l.products||[]).map(h=>h.handle);if(p.length&&p.length===i.size&&p.every(h=>i.has(h))){b.activeBundle=l.handle;break}}b.ready=!0,rt()}var kr='<svg viewBox="0 0 922 201" fill="none" xmlns="http://www.w3.org/2000/svg" class="olto-wordmark" role="img" aria-label="Olto"> <path d="M246.995 19.4652C255.252 28.6186 259.698 41.3214 261.454 61.0855C262.35 70.239 262.649 80.8495 262.649 102.706C262.649 151.985 257.942 170.89 242.885 184.153C231.976 193.605 217.218 198.313 192.41 199.807C182.958 200.405 147.241 201.003 119.817 201.003C59.5913 201.003 43.3765 199.247 26.564 190.093C13.5623 182.995 5.00663 169.433 2.35399 149.968C0.598013 136.966 0.000235075 126.355 0.000235075 94.1874C-0.0371261 48.1211 4.37149 29.8142 18.5687 17.4103C29.1793 7.95792 43.0403 3.54931 68.4458 1.45708C78.496 0.560417 108.011 0 143.99 0C213.631 0 232.237 3.54931 246.995 19.4652ZM46.2907 100.651C46.2907 139.021 49.2422 151.425 60.1517 157.029C71.0611 162.932 80.5135 163.829 136.891 163.829C187.665 163.829 200.331 161.774 208.326 152.919C215.126 145.559 217.181 132.856 217.181 99.4927C217.181 37.8095 216.583 37.2117 131.586 37.2117C46.5896 37.2117 46.2907 38.1084 46.2907 100.651Z" fill="#E90022"/> <path d="M286.86 2.05334H332.328V162.034H476.057V198.909H286.86V2.05334Z" fill="#E90022"/> <path d="M507.328 38.9662H414.673V2.05334H645.154V38.9288H552.759V198.909H507.291V38.9662H507.328Z" fill="#E90022"/> <path d="M906.345 19.4644C914.602 28.6179 919.048 41.3207 920.804 61.0847C921.701 70.2382 922 80.8488 922 102.705C922 151.984 917.292 170.889 902.236 184.152C891.326 193.605 876.569 198.312 851.761 199.807C842.308 200.404 806.591 201.002 779.168 201.002C718.979 201.002 702.727 199.246 685.915 190.093C672.913 182.994 664.357 169.432 661.705 149.967C659.949 136.965 659.351 126.355 659.351 94.1867C659.351 48.1578 663.797 29.8508 677.957 17.4469C688.567 7.99454 702.466 3.58593 727.834 1.49371C737.884 0.597038 767.399 0.0366211 803.378 0.0366211C873.019 0.0366211 891.625 3.58593 906.383 19.5018L906.345 19.4644ZM705.679 100.65C705.679 139.02 708.63 151.424 719.54 157.028C730.449 162.931 739.901 163.828 796.279 163.828C847.053 163.828 859.719 161.773 867.714 152.918C874.514 145.558 876.569 132.855 876.569 99.492C876.569 37.8087 875.971 37.211 790.974 37.211C705.978 37.211 705.679 38.1076 705.679 100.65Z" fill="#E90022"/> </svg>',Dr='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 831.97 45.21" class="im-wordmark" fill="currentColor" role="img" aria-label="Infinite Machine"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M13.56.33V44.88H0V.33Z"/><path d="M44.93.33l27,33.86L71.58.33H84.4V44.88H62.63L36,11.35l.34,33.53h-13V.33Z"/><path d="M141.66.33V10.42H107.87V19.3h32.06V29.39H107.87V44.88H94.38V.33Z"/><path d="M163.09.33V44.88H149.54V.33Z"/><path d="M194.46.33l27,33.86L221.11.33h12.82V44.88H212.16L185.58,11.35l.33,33.53h-13V.33Z"/><path d="M257.44.33V44.88H243.89V.33Z"/><path d="M264.52,11.35V.33h53.23v11H297.91V44.88H284.35V11.35Z"/><path d="M374.26,10.42h-36V18.1h33.93v8.81H338.26V34.8h36.47V44.88H324.91V.33h49.35Z"/><path d="M423,.33l16.23,29.59L455.34.33h21.37V44.88H463.49l.67-34.39L444.39,44.88H433.57L414.13,10.49l.4,34.39H401.44V.33Z"/><path d="M526.62.33,551,44.88H536.17l-4.4-8H503.05l-4.28,8H483.41l25-44.55Zm-9.21,9.55-9.49,17.77H527Z"/><path d="M611.09,32.22c0,1.14-.11,2.11-.2,2.91a13.74,13.74,0,0,1-.36,2.07,11.1,11.1,0,0,1-.57,1.6,8.86,8.86,0,0,1-4.21,4.31,21.46,21.46,0,0,1-8.08,1.77q-2.07.19-6.18.27t-10.78.06c-3.21,0-5.91,0-8.12-.13a53.92,53.92,0,0,1-5.61-.47,20.34,20.34,0,0,1-3.9-.9,14.32,14.32,0,0,1-2.94-1.43,10.08,10.08,0,0,1-2.77-2.58,11.37,11.37,0,0,1-1.74-3.87,32.31,32.31,0,0,1-.9-5.84c-.18-2.32-.27-5.12-.27-8.42q0-4.41.27-7.48a23.36,23.36,0,0,1,1-5.24,10,10,0,0,1,1.87-3.54,10.88,10.88,0,0,1,2.9-2.37,16.6,16.6,0,0,1,3.17-1.44,23.22,23.22,0,0,1,4-.9Q570,.27,573.29.13c2.19-.09,4.83-.13,8-.13q6.21,0,10.22.07c2.67,0,4.88.15,6.61.33a27.49,27.49,0,0,1,4.21.7,18,18,0,0,1,3,1.1,8.12,8.12,0,0,1,4,4.35,20.63,20.63,0,0,1,1.27,7.94V16h-13a11.59,11.59,0,0,0-.5-2.87,2.69,2.69,0,0,0-1.7-1.6,12.6,12.6,0,0,0-3.87-.67c-1.7-.09-4-.13-6.95-.13q-4.14,0-6.74.06c-1.74.05-3.13.14-4.18.27a10.12,10.12,0,0,0-2.4.53,5.12,5.12,0,0,0-1.44.87,4.48,4.48,0,0,0-1,1.24,7.48,7.48,0,0,0-.6,1.87,20.61,20.61,0,0,0-.3,2.94c0,1.18-.07,2.66-.07,4.44a42.86,42.86,0,0,0,.37,6.31A5.34,5.34,0,0,0,570,32.66a8,8,0,0,0,4.21,1.43,75.75,75.75,0,0,0,7.68.31c2.54,0,4.57,0,6.11,0s2.77,0,3.71-.1a12.82,12.82,0,0,0,2.13-.23,7.73,7.73,0,0,0,1.47-.5,3.77,3.77,0,0,0,2.07-1.81,8.36,8.36,0,0,0,.6-3.6h13.16C611.16,29.72,611.14,31.09,611.09,32.22Z"/><path d="M633.44.33v16.5H664.3V.33h13.56V44.88H664.3v-17H633.44v17H619.88V.33Z"/><path d="M701.33.33V44.88H687.77V.33Z"/><path d="M732.7.33l27,33.86L759.35.33h12.82V44.88H750.4L723.82,11.35l.33,33.53h-13V.33Z"/><path d="M831.51,10.42h-36V18.1h33.93v8.81H795.51V34.8H832V44.88H782.15V.33h49.36Z"/></g></g></svg>',_="https://cdn.prod.website-files.com/66ea2a84659b76f5d91d481b",nt={"accessory-plate":`${_}/68d53a735e9c987a9499211a_accessory-plate.avif`,"charger-bag":`${_}/68d53a2cb165eb23a2527775_charger-bag.avif`,"olto-center-stand":`${_}/68d53974c880c4b20d23dec9_olto-center-stand.avif`,"olto-charging-dock":`${_}/68d5396153ba7acdd9978c0d_olto-charging-dock.avif`,"olto-kid-carrier":`${_}/6921a92ec4d3dc4a766d69bb_Kid%20Carrier.avif`,"olto-rear-basket":`${_}/68d53b6769ccc4ad6ad7d0b3_olto-rear-basket.avif`,"olto-rear-rack":`${_}/68d53b2e1153a3e349d34c1a_olto-rear-rack.avif`,"olto-side-mounting-plate":`${_}/68d53bea87ff421cf85c858e_olto-side-mounting-plate.avif`,"olto-water-bottle-holder":`${_}/68d53d46367f73dfd1b58a42_olto-water-bottle-holder.avif`,"olto-sidewalls":`${_}/68d53c3ccb4cfb15c59ac6cd_olto-sidewalls.avif`,"olto-super-charger":`${_}/6921a99cb5dd5b924cf4965d_Super%20Charger%20on%20the%20Ground.avif`,"olto-u-lock-mount":`${_}/68d53cf8bb965a6129e84ff4_olto-u-lock-mount.avif`,"open-face-helmet":`${_}/6921a8f20583ec71e2663dce_Black%20Open%20Face%20Helmet.avif`,"kryptonite-lock":`${_}/68d53fc0d2d8d2d151493b5f_kryptonite-lock.avif`,"olto-soft-bag":`${_}/692197c1914921de9b30217a_Soft%20Bag%20on%20the%20Ground.avif`},at={finance:{months:48,apr:.1599},lease:{months:24,residualPct:.35}};function Jt(e,t,r){if(r==="finance"){let{months:a,apr:n}=at.finance,o=n/12,s=o>0?e*o/(1-(1+o)**-a):e/a;return{amount:s,suffix:"/mo",label:"Est. finance payment",sub:`${a} monthly payments of ${E(s,t)} at ${(n*100).toFixed(2)}% APR. Estimate for illustration \u2014 payment options appear at checkout.`}}if(r==="lease"){let{months:a,residualPct:n}=at.lease;return{amount:e*(1-n)/a,suffix:"/mo",label:"Est. lease payment",sub:`${a}-month term, ${Math.round(n*100)}% residual. Estimate for illustration.`}}return{amount:e,suffix:"",label:"Est. purchase price",sub:"Taxes and shipping calculated at checkout."}}var be=[{key:"commuter",label:"Olto Commuter",tagline:"Everything you need to commute every day.",popular:!0,price:200,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","olto-water-bottle-holder","open-face-helmet","bottom-cover"]},{key:"cargo",label:"Olto Cargo",tagline:"Carry everything.",price:700,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","charger-bag","olto-rear-rack","olto-rear-basket","olto-soft-bag","olto-side-mounting-plate","accessory-plate","olto-center-stand"]},{key:"max",label:"Olto Max",tagline:"Fully loaded. Full power.",price:950,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","olto-water-bottle-holder","charger-bag","olto-rear-rack","olto-rear-basket","olto-soft-bag","olto-side-mounting-plate","accessory-plate","olto-center-stand","olto-super-charger"]}],Nr=new Set(["bottom-cover"]),qr=[{value:"40 mi",label:"Range (est.)"},{value:"20 mph",label:"Top Speed"},{value:"Class 2",label:"E-bike"}];function E(e,t="USD"){let r=Number(e)||0,a=r%1===0?0:2;return t==="USD"?`$${r.toLocaleString("en-US",{minimumFractionDigits:a,maximumFractionDigits:a})}`:`${t} ${r.toFixed(2)}`}function y(e){return String(e!=null?e:"").replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`)}function G(e,t){return e?`${e}${e.includes("?")?"&":"?"}width=${t}`:""}function zt({config:e,products:t,wrapVariantsByColor:r}){let a=Object.entries(e.variants),[n]=a.find(([l])=>l===e.defaultVariantId)||a[0],o=Math.min(...t.main.variants.map(l=>parseFloat(l.price.amount))),{months:s,apr:i}=at.finance,c=i/12,d=Math.round(o*c/(1-(1+c)**-s));return`
    <header class="topbar">
      <div class="topbar_mark">${Dr}</div>
    </header>

    <section class="hero" aria-label="Olto">
      <img class="hero_img is-active" data-hero-img="a" src="${y(e.variants[n].backgroundImage)}" alt="Olto" />
      <img class="hero_img" data-hero-img="b" alt="" aria-hidden="true" />
      <div class="hero_layers" data-layers>
        ${Object.entries(nt).map(([l,p])=>`<img class="hero_layer" data-layer="${y(l)}" src="${y(p)}" alt="" aria-hidden="true" />`).join("")}
      </div>
    </section>

    <main class="sheet">
      <div class="sheet_handle" aria-hidden="true"></div>

      <section class="intro">
        <h1 class="intro_title">${kr}</h1>
        <p class="intro_delivery" data-delivery></p>
        <p class="intro_price">From ${E(o)} \xB7 or ${E(d)}/mo financing</p>
        <div class="stats">
          ${qr.map(l=>`
            <div class="stats_item">
              <div class="stats_value">${y(l.value)}</div>
              <div class="stats_label">${y(l.label)}</div>
            </div>`).join("")}
        </div>
      </section>

      ${Pr(e,a,r)}

      ${Hr(t)}

      <section class="opt opt--acc" data-section="accessories">
        <h2 class="opt_title">Additional Accessories</h2>
        <div class="acc-nav">
          <button type="button" class="acc-nav_btn" data-acc-scroll="-1" aria-label="Scroll accessories back">&#8249;</button>
          <button type="button" class="acc-nav_btn" data-acc-scroll="1" aria-label="Scroll accessories forward">&#8250;</button>
        </div>
        <div class="acc-list" data-acc-list>
          ${t.accessories.filter(l=>!Nr.has(l.handle)).map(l=>Mr(l)).join("")}
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
        <button type="button" class="nudge_save" data-save>
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

  `}function Pr(e,t,r){var i,c;let a=(i=t.find(([,d])=>/silver/i.test(d.color)))==null?void 0:i[1],n=(c=t.find(([,d])=>/black/i.test(d.color)))==null?void 0:c[1],o={...e.wrapColorMap,Black:(n==null?void 0:n.colorHex)||"#1c1c1e"},s=["Black","Sand","Blush","Forest","Crimson"].filter(d=>r.has(d));return`
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
            <div class="swatch_sub">+${E(l)}</div>
          </div>`}).join("")}
        </div>
      </div>
    </section>
  `}function Hr(e){return`
    <section class="opt" data-section="bundles">
      <h2 class="opt_title">Bundle</h2>
      <div class="kit-list">
        ${be.map(t=>Vr(t,e)).join("")}
      </div>
    </section>
  `}function Vr(e,t){let r=e.items.reduce((s,i)=>{let c=Y(t.accessories.find(d=>d.handle===i));return s+(c?parseFloat(c.price.amount):0)},0),a=r-e.price,n=e.items.map(s=>{let i=t.accessories.find(c=>c.handle===s);return((i==null?void 0:i.title)||s).replace(/^Olto /,"")}),o=e.items.length?`<div class="kit_price">+${E(e.price)}</div>
       ${a>0?`<div class="kit_save"><s>${E(r)}</s> Save ${E(a)}</div>`:""}`:"";return`
    <button type="button" class="kit" data-bundle="${y(e.key)}">
      ${e.popular?'<span class="kit_chip">Most popular</span>':""}
      <div class="kit_top">
        <div class="kit_id">
          <div class="kit_name">${y(e.label)}</div>
          <div class="kit_tagline">${y(e.tagline)}</div>
        </div>
        <div class="kit_pricing">${o}</div>
      </div>
      ${n.length?`<div class="kit_items">${n.map(s=>`<span class="kit_item">${y(s)}</span>`).join("")}</div>`:""}
    </button>
  `}function Mr(e){var r;let t=Y(e);return t?`
    <div class="acc" data-acc="${y(e.handle)}">
      <img class="acc_img" src="${y(G((r=e.featuredImage)==null?void 0:r.url,240))}" alt="${y(e.title)}" loading="lazy" />
      <div class="acc_info">
        <div class="acc_name">${y(e.title)}</div>
        <div class="acc_price">${E(parseFloat(t.price.amount),t.price.currencyCode)}</div>
      </div>
      <button type="button" class="acc_btn" data-acc-toggle="${y(e.handle)}">Add</button>
    </div>
  `:""}function Y(e){return e&&(e.variants.find(t=>t.availableForSale)||e.variants[0])||null}function er(e,t){var n;let r=[];if(e.bikeLine){let o=((n=t.variants[e.baseNumericId])==null?void 0:n.color)||e.bikeLine.merchandise.title;r.push({label:`Olto &middot; ${y(o)}`,amount:parseFloat(e.bikeLine.merchandise.price.amount)})}e.wrapLine&&r.push({label:`Wrap &middot; ${y(e.wrapLine.merchandise.title)}`,amount:parseFloat(e.wrapLine.merchandise.price.amount)});for(let o of e.accessoryLines)r.push({label:y(o.merchandise.product.title),amount:parseFloat(o.merchandise.price.amount)});let a=e.quantity>1?`<div class="summary_qty">&times;${e.quantity} configurations</div>`:"";return r.map(o=>`
      <div class="summary_row">
        <span>${o.label}</span>
        <span>${E(o.amount,e.currency)}</span>
      </div>`).join("")+a}var T=window.gsap||null;T&&window.ScrollTrigger&&T.registerPlugin(window.ScrollTrigger);var m=document.querySelector("#app"),C=null,Z=new Map,ee="a",ve=null,Fr=new Set(["Sand"]),ot=0,st=null;Ur();async function Ur(){var r,a,n;let e=(r=Object.entries(w.variants).find(([,o])=>/silver/i.test(o.color)))==null?void 0:r[0];e&&(w.defaultVariantId=e);try{C=await Yt(w)}catch(o){console.error("[Tesla] Failed to load products:",o),jr();return}await Br(),Z=Kr(C.wrap),Pt(C),await Ht(w),Zt({config:w,products:C,bundles:be.filter(o=>o.items.length).map(o=>({handle:o.key,products:o.items.map(s=>({handle:s}))}))}),m.innerHTML=zt({config:w,products:C,wrapVariantsByColor:Z}),Qr(),Xt(re),re(L()),ta();let t=Zr();t?Xr(t):L().bikeLine||pe(C.main.handle,ye(w.defaultVariantId)),na(),sa();for(let o of Z.values())(a=o.image)!=null&&a.url&&(new Image().src=o.image.url);for(let o of C.main.variants)(n=o.image)!=null&&n.url&&(new Image().src=G(o.image.url,1600))}async function Br(){try{let{data:e}=await P.request('query { product(handle: "bottom-cover") { id handle title availableForSale featuredImage { url altText } variants(first: 5) { edges { node { id title availableForSale price { amount currencyCode } selectedOptions { name value } image { url altText } } } } } }'),t=e==null?void 0:e.product;t&&C.accessories.push({...t,variants:t.variants.edges.map(r=>r.node)})}catch(e){console.warn("[Tesla] Kit-only product fetch failed:",e)}}function Kr(e){var r;let t=new Map;if(!e)return t;for(let a of e.variants){let n=(r=a.selectedOptions)==null?void 0:r.find(s=>/colou?rs?/i.test(s.name)),o=(n==null?void 0:n.value)||a.title;o&&t.set(o,a)}return t}function jr(){m.innerHTML=`
    <div class="boot">
      <div class="boot_mark">INFINITE MACHINE</div>
      <div class="boot_label">Couldn&rsquo;t reach the store. Check your connection.</div>
      <button type="button" class="boot_retry" onclick="location.reload()">Retry</button>
    </div>
  `}function Qr(){m.addEventListener("click",e=>{let t=e.target.closest("[data-color-swatch]");if(t)return Yr(t.dataset.colorSwatch);let r=e.target.closest("[data-acc-scroll]");if(r)return Gr(Number(r.dataset.accScroll));let a=e.target.closest("[data-acc-toggle]");if(a)return Wr(a.dataset.accToggle);let n=e.target.closest("[data-bundle]");if(n)return ir(n.dataset.bundle);let o=e.target.closest("[data-pay-mode]");if(o)return ge(o.dataset.payMode);if(e.target.closest("[data-qty-dec]"))return rr(-1);if(e.target.closest("[data-qty-inc]"))return rr(1);if(e.target.closest("[data-save]"))return e.target.closest("[data-nudge]")&&ar(),nr(!0);if(e.target.closest("[data-save-close]"))return nr(!1);if(e.target.closest("[data-nudge-close]"))return ar();if(e.target.closest("[data-config-reset]"))return zr();if(e.target.closest("[data-cta]"))return ea();if(e.target.closest("[data-interest-close]"))return cr(!1)}),m.addEventListener("submit",e=>{e.target.closest("[data-save-form]")&&(e.preventDefault(),aa(e.target))})}var it=null;function Gr(e){let t=m.querySelector("[data-acc-list]");if(!t)return;let r=t.scrollLeft,a=Math.max(0,Math.min(t.scrollWidth-t.clientWidth,r+e*320));if(T&&!document.hidden){it&&it.kill();let n={v:r};it=T.to(n,{v:a,duration:.45,ease:"power2.out",onUpdate:()=>{t.scrollLeft=n.v}})}else t.scrollLeft=a}var sr=Promise.resolve();function ae(e,t){let r=pe(e,t);return sr=r.catch(()=>null),r}function Yr(e){let t=w.wrap.productHandle;if(!e)return ae(t,null);let r=Z.get(e);r&&ae(t,r.id)}function Wr(e){var n,o;let t=L(),r=t.accessoryLines.some(s=>s.merchandise.product.handle===e),a=w.accessoryDependencies||{};if(r){ae(e,null);let s=((n=a[e])==null?void 0:n.requiredBy)||[];for(let i of s)t.accessoryLines.some(c=>c.merchandise.product.handle===i)&&ae(i,null);return}tr(e);for(let[s,i]of Object.entries(a))(o=i.requiredBy)!=null&&o.includes(e)&&(t.accessoryLines.some(d=>d.merchandise.product.handle===s)||tr(s))}function tr(e){let t=C.accessories.find(a=>a.handle===e),r=Y(t);r&&ae(e,r.id)}var ct=!1,we=null,M=null;async function ir(e){if(ct){e!==(M==null?void 0:M.value)&&(we=e,M={value:e},re(L()));return}ct=!0;let t=L().activeBundle===e?null:e;M={value:t},re(L());try{await sr;let r=L().accessoryLines.map(o=>o.id).filter(o=>!String(o).startsWith("tmp_"));r.length&&await Ge(r);let a=be.find(o=>o.key===e);if(!t||!(a!=null&&a.items.length))return;let n=a.items.map(o=>{let s=Y(C.accessories.find(i=>i.handle===o));return s?{variantId:s.id,attributes:{_bundle:e}}:null}).filter(Boolean);n.length&&await Qe(n)}catch(r){console.error("[Tesla] Bundle select failed:",r)}finally{if(ct=!1,we){let r=we;we=null,ir(r)}else M=null,re(L())}}function rr(e){let t=L(),r=[t.bikeLine,t.wrapLine,...t.accessoryLines].filter(Boolean),a=Math.min(99,Math.max(1,t.quantity+e));if(a===t.quantity)return;let n=r.filter(o=>!String(o.id).startsWith("tmp_"));Promise.all(n.map(o=>Ft({lineId:o.id,quantity:a})))}function Zr(){let e=new URLSearchParams(window.location.search).get("d");if(!e)return null;let[t,r,a,n,o]=e.split(".");return!t||!w.variants[t]?null:{base:t,wrap:r||null,qty:Math.min(99,Math.max(1,parseInt(a,10)||1)),pay:["cash","lease","finance"].includes(n)?n:"finance",accs:(o||"").split("~").filter(Boolean)}}async function Xr(e){je();let t=[{variantId:ye(e.base),quantity:e.qty}],r=e.wrap?Z.get(e.wrap):null;r&&t.push({variantId:r.id,quantity:e.qty});for(let n of e.accs){let o=Y(C.accessories.find(s=>s.handle===n));o&&t.push({variantId:o.id,quantity:e.qty})}ge(e.pay);try{await Qe(t)}catch(n){console.error("[Tesla] Failed to apply shared design:",n)}let a=new URLSearchParams(window.location.search);a.delete("d"),window.history.replaceState({},"",`${window.location.pathname}?${a.toString()}`)}function Jr(){let e=L(),t=e.wrapLine?dr(e.wrapLine.merchandise)||e.wrapLine.merchandise.title:"",r=e.accessoryLines.map(o=>o.merchandise.product.handle).join("~"),a=[e.baseNumericId,t,e.quantity,e.payMode,r].join("."),n=new URL(window.location.href);return n.searchParams.set("d",a),n.toString()}var te=null;async function zr(){let e=m.querySelector("[data-config-reset]");if(!te){e&&(e.textContent="Tap again to clear",e.classList.add("is-armed")),te=setTimeout(()=>{te=null,e&&(e.textContent="Clear configuration",e.classList.remove("is-armed"))},3e3);return}clearTimeout(te),te=null,e&&(e.textContent="Clear configuration",e.classList.remove("is-armed"));try{await Mt(ue())}catch(t){console.error("[Tesla] Clear failed:",t)}ge("finance"),pe(C.main.handle,ye(w.defaultVariantId))}function ea(){let e=L();if(!e.ready)return;if(e.region==="row")return cr(!0);let t=Vt();t&&(window.location.href=t)}function ta(){let e=m.querySelector("[data-nudge]"),t=m.querySelector('[data-section="payment"]');if(!e||!t)return;let r=new IntersectionObserver(a=>{a.some(n=>n.isIntersecting)&&(r.disconnect(),e.hidden=!1,requestAnimationFrame(()=>e.classList.add("is-in")))},{threshold:.3});r.observe(t)}function ar(){let e=m.querySelector("[data-nudge]");!e||e.hidden||(e.classList.remove("is-in"),setTimeout(()=>{e.hidden=!0},450))}function cr(e){let t=m.querySelector("[data-interest]");t&&(t.hidden=!e)}var lr="olto_tesla_lead";function ra(){try{let e=JSON.parse(localStorage.getItem(lr));return e!=null&&e.email?e:null}catch{return null}}function nr(e){var r;let t=m.querySelector("[data-save-modal]");if(t&&(t.hidden=!e,e)){let a=t.querySelector("[data-save-form]"),n=t.querySelector("[data-save-done]");if(a){a.hidden=!1;let o=ra();for(let s of["name","email","phone"]){let i=a.querySelector(`input[name="${s}"]`);i&&!i.value&&(i.value=(o==null?void 0:o[s])||"")}}n&&(n.hidden=!0),(r=t.querySelector('input[name="name"]'))==null||r.focus()}}async function aa(e){let t=e.name.value.trim(),r=e.email.value.trim(),a=e.phone.value.trim(),n=e.querySelector("[data-save-error]"),o=null;if(t?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)?a.replace(/\D/g,"").length<7&&(o="That phone number looks too short."):o="That email doesn\u2019t look right.":o="Please add your name.",o){n&&(n.textContent=o,n.hidden=!1);return}n&&(n.hidden=!0);try{localStorage.setItem(lr,JSON.stringify({name:t,email:r,phone:a}))}catch{}let s=Jr(),i=!0;try{await navigator.clipboard.writeText(s)}catch{i=!1}e.hidden=!0;let c=m.querySelector("[data-save-done]");if(c){c.hidden=!1;let d=c.querySelector("[data-save-done-msg]");d&&(d.textContent=i?"Link copied to your clipboard \u2014 it rebuilds this exact Olto.":"Copy your link below \u2014 it rebuilds this exact Olto.");let l=c.querySelector("[data-save-link]");l&&(l.textContent=s)}}async function na(){let e=new AbortController,t=setTimeout(()=>e.abort(),8e3);try{let a=(await(await fetch("https://get.geojs.io/v1/ip/country",{signal:e.signal})).text()).trim().toUpperCase();tt(["US","CA"].includes(a)?"us":"row")}catch{tt("")}finally{clearTimeout(t)}}function re(e){var q,lt,dt,ut,ft,pt,mt;if(!e.ready)return;let t=w.variants[e.baseNumericId]||{};W("[data-delivery]",t.delivery?`Est. delivery ${t.delivery}`:"");let r=e.wrapLine?dr(e.wrapLine.merchandise)||e.wrapLine.merchandise.title:"";for(let f of m.querySelectorAll("[data-color-swatch]"))f.classList.toggle("is-selected",e.wrapLine?f.dataset.colorSwatch===r:f.dataset.colorSwatch==="");let a=new Set(e.accessoryLines.map(f=>f.merchandise.product.handle)),n={},o=new Set;for(let f of w.customImageRules||[])if(f.when.every(v=>a.has(v))){Object.assign(n,f.replace||{});for(let v of f.hide||[])o.add(v)}let s=!1;for(let f of m.querySelectorAll("[data-layer]")){let v=f.dataset.layer,O=a.has(v)&&!o.has(v),U=n[v]||nt[v];U&&f.getAttribute("src")!==U&&f.setAttribute("src",U),f.classList.toggle("is-on",O),O&&(s=!0)}let i=(lt=(q=C.main.variants.find(f=>he(f.id)===e.baseNumericId))==null?void 0:q.image)==null?void 0:lt.url,c=e.region==="row"?"eu":"us",d=(c==="eu"?t.backgroundImage:G(i,1600))||G(i,1600)||t.backgroundImage,l=e.wrapLine?(ut=(dt=Z.get(r))==null?void 0:dt.image)==null?void 0:ut.url:null,p=l&&!Fr.has(r);if(e.wrapLine&&r==="Black"){let f=C.main.variants.find(v=>{var O;return((O=w.variants[he(v.id)])==null?void 0:O.color)==="Black"});(ft=f==null?void 0:f.image)!=null&&ft.url&&(l=G(f.image.url,1600),p=!0)}r==="Custom"&&(l=null),(pt=m.querySelector("[data-layers]"))==null||pt.classList.toggle("is-suppressed",!!l&&!p&&s),l?or(l,`wrap:${r}`):or(d,`base:${e.baseNumericId}:${c}`);let h=M?M.value:e.activeBundle;for(let f of m.querySelectorAll("[data-bundle]"))f.classList.toggle("is-selected",f.dataset.bundle===h);let g=new Set(e.accessoryLines.map(f=>f.merchandise.product.handle));for(let f of m.querySelectorAll("[data-acc-toggle]")){let v=g.has(f.dataset.accToggle);f.textContent=v?"Added":"Add",f.classList.toggle("is-added",v),(mt=f.closest("[data-acc]"))==null||mt.classList.toggle("is-added",v)}let D=m.querySelector("[data-acc-list]");if(D){let f=[...D.querySelectorAll(".acc")],v=[...f].sort((O,U)=>(g.has(O.dataset.acc)?1:0)-(g.has(U.dataset.acc)?1:0));if(f.some((O,U)=>O!==v[U]))for(let O of v)D.appendChild(O)}W("[data-qty-value]",String(e.quantity));let $=m.querySelector("[data-summary]");$&&($.innerHTML=er(e,w)),W("[data-summary-total]",E(e.total,e.currency));let R=Jt(e.total,e.currency,e.payMode);for(let f of m.querySelectorAll("[data-pay-mode]"))f.classList.toggle("is-active",f.dataset.payMode===e.payMode);W("[data-pay-figure]",E(R.amount,e.currency)+R.suffix),W("[data-pay-sub]",R.sub),oa(R.amount,R.suffix,e.currency),W("[data-total-label]",R.label);let F=m.querySelector("[data-cta]");F&&(F.textContent=e.region==="row"?"Register interest":"Order")}function dr(e){var r;let t=(r=e.selectedOptions)==null?void 0:r.find(a=>/colou?rs?/i.test(a.name));return(t==null?void 0:t.value)||null}function W(e,t){let r=m.querySelector(e);r&&r.textContent!==t&&(r.textContent=t)}function oa(e,t,r){let a=m.querySelector("[data-total]");if(a){if(T&&!document.hidden&&ot!==e){st&&st.kill();let n={v:ot};st=T.to(n,{v:e,duration:.45,ease:"power2.out",onUpdate:()=>{a.textContent=E(n.v,r)+t},onComplete:()=>{a.textContent=E(e,r)+t}})}else a.textContent=E(e,r)+t;ot=e}}function or(e,t){if(!e||t===ve)return;let r={a:m.querySelector('[data-hero-img="a"]'),b:m.querySelector('[data-hero-img="b"]')};if(!r.a||!r.b)return;if(ve===null){r[ee].src=e,ve=t;return}let a=r[ee],n=r[ee==="a"?"b":"a"];n.src=e,ee=ee==="a"?"b":"a",ve=t,T?(T.set(n,{opacity:0,scale:1.04,xPercent:0,yPercent:0}),n.classList.add("is-active"),T.to(n,{opacity:1,scale:1,duration:.45,ease:"power2.out"}),T.to(a,{opacity:0,duration:.45,ease:"power2.out",onComplete:()=>a.classList.remove("is-active")})):(n.classList.add("is-active"),n.style.opacity=1,a.classList.remove("is-active"),a.style.opacity=0)}function sa(){if(!T||!window.ScrollTrigger||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let e=m.querySelector(".sheet");for(let t of m.querySelectorAll(".opt"))T.from(t,{y:24,opacity:0,duration:.45,ease:"power2.out",scrollTrigger:{trigger:t,scroller:e,start:"top 88%",once:!0}})}})();
