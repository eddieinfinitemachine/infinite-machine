"use strict";(()=>{var w={id:"olto",steps:[{type:"location",no:"01",title:"Location",validation:!0,collapsible:!1},{type:"variant",no:"02",title:"Base"},{type:"wrap",no:"03",title:"Wrap"},{type:"bundle",no:"04",title:"Accessory Pack"},{type:"accessories",no:"05",title:"Configure your Accessories"},{type:"quantity",no:"06",title:"Quantity"}],product:{handle:"olto-1"},accessoriesCollection:"olto-accessories",testInstructionVideo:"https://vz-19725589-529.b-cdn.net/a4c98a2a-412b-4e2e-a2ce-4e9a64123464/playlist.m3u8",wrap:{productHandle:"olto-wrap"},bundles:{metaobjectType:"bundles"},variants:{44842879156380:{color:"Black",colorHex:"#000000",delivery:"July 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff73905e7daa5ef224c5d5_olto-eu-black.avif"},44842879123612:{color:"Silver",colorHex:"#D9D9D9",delivery:"August 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff7390e94ecc537b713a30_olto-eu-silver.avif"}},defaultVariantId:"44842879156380",wrapColorMap:{Sand:"#DECEAF",Blush:"#F6C6DC",Sky:"#707A8D",Forest:"#627063",Crimson:"#B44C47"},accessoryDependencies:{"olto-rear-rack":{requiredBy:["olto-rear-basket","olto-side-mounting-plate"]}},customImageRules:[{when:["olto-soft-bag","olto-rear-basket"],replace:{"olto-soft-bag":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/69219c3d619077ba6f1689ed_Soft%20Bag%20in%20Rear%20Basket.avif"}},{when:["olto-charging-dock","olto-battery"],replace:{"olto-battery":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6921a4037d0eab061d3d7ca4_Battery%20Dock%20with%20Battery%20Plugged%20in.avif"},hide:["olto-charging-dock"]}]};var M="GraphQL Client";var ge="An error occurred while fetching from the API. Review 'graphQLErrors' for details.",be="Response returned unexpected Content-Type:",ve="An unknown error has occurred. The API did not return a data object or any errors in its response.",te={json:"application/json",multipart:"multipart/mixed"},we="X-SDK-Variant",_e="X-SDK-Version",lt="shopify-graphql-client",dt="1.4.2",re=1e3,ut=[429,503],Se=/@(defer)\b/i,ct=`\r
`,ft=/boundary="?([^=";]+)"?/i,Ee=ct+ct;function L(e,t=M){return e.startsWith(`${t}`)?e:`${t}: ${e}`}function O(e){return e instanceof Error?e.message:JSON.stringify(e)}function Ce(e){return e instanceof Error&&e.cause?e.cause:void 0}function Ie(e){return e.flatMap(({errors:t})=>t!=null?t:[])}function ae({client:e,retries:t}){if(t!==void 0&&(typeof t!="number"||t<0||t>3))throw new Error(`${e}: The provided "retries" value (${t}) is invalid - it cannot be less than ${0} or greater than ${3}`)}function S(e,t){return t&&(typeof t!="object"||Array.isArray(t)||typeof t=="object"&&Object.keys(t).length>0)?{[e]:t}:{}}function Ae(e,t){if(e.length===0)return t;let a={[e.pop()]:t};return e.length===0?a:Ae(e,a)}function ht(e,t){return Object.keys(t||{}).reduce((r,a)=>(typeof t[a]=="object"||Array.isArray(t[a]))&&e[a]?(r[a]=ht(e[a],t[a]),r):(r[a]=t[a],r),Array.isArray(e)?[...e]:{...e})}function $e([e,...t]){return t.reduce(ht,{...e})}function Re({clientLogger:e,customFetchApi:t=fetch,client:r=M,defaultRetryWaitTime:a=re,retriableCodes:n=ut}){let o=async(s,i,c)=>{let d=i+1,l=c+1,f;try{if(f=await t(...s),e({type:"HTTP-Response",content:{requestParams:s,response:f}}),!f.ok&&n.includes(f.status)&&d<=l)throw new Error;let h=(f==null?void 0:f.headers.get("X-Shopify-API-Deprecated-Reason"))||"";return h&&e({type:"HTTP-Response-GraphQL-Deprecation-Notice",content:{requestParams:s,deprecationNotice:h}}),f}catch(h){if(d<=l){let g=f==null?void 0:f.headers.get("Retry-After");return await or(g?parseInt(g,10):a),e({type:"HTTP-Retry",content:{requestParams:s,lastResponse:f,retryAttempt:i,maxRetries:c}}),o(s,d,c)}throw new Error(L(`${c>0?`Attempted maximum number of ${c} network retries. Last message - `:""}${O(h)}`,r))}};return o}async function or(e){return new Promise(t=>setTimeout(t,e))}function Le({headers:e,url:t,customFetchApi:r=fetch,retries:a=0,logger:n}){ae({client:M,retries:a});let o={headers:e,url:t,retries:a},s=sr(n),i=Re({customFetchApi:r,clientLogger:s,defaultRetryWaitTime:re}),c=ir(i,o),d=cr(c),l=hr(c);return{config:o,fetch:c,request:d,requestStream:l}}function sr(e){return t=>{e&&e(t)}}async function yt(e){let{errors:t,data:r,extensions:a}=await e.json();return{...S("data",r),...S("extensions",a),headers:e.headers,...t||!r?{errors:{networkStatusCode:e.status,message:L(t?ge:ve),...S("graphQLErrors",t),response:e}}:{}}}function ir(e,{url:t,headers:r,retries:a}){return async(n,o={})=>{let{variables:s,headers:i,url:c,retries:d,keepalive:l,signal:f}=o,h=JSON.stringify({query:n,variables:s});ae({client:M,retries:d});let g=Object.entries({...r,...i}).reduce((R,[k,H])=>(R[k]=Array.isArray(H)?H.join(", "):H.toString(),R),{});!g[we]&&!g[_e]&&(g[we]=lt,g[_e]=dt);let C=[c!=null?c:t,{method:"POST",headers:g,body:h,signal:f,keepalive:l}];return e(C,1,d!=null?d:a)}}function cr(e){return async(...t)=>{if(Se.test(t[0]))throw new Error(L("This operation will result in a streamable response - use requestStream() instead."));let r=null;try{r=await e(...t);let{status:a,statusText:n}=r,o=r.headers.get("content-type")||"";return r.ok?o.includes(te.json)?await yt(r):{errors:{networkStatusCode:a,message:L(`${be} ${o}`),response:r}}:{errors:{networkStatusCode:a,message:L(n),response:r}}}catch(a){return{errors:{message:O(a),...r==null?{}:{networkStatusCode:r.status,response:r}}}}}}async function*lr(e){let t=new TextDecoder;if(e.body[Symbol.asyncIterator])for await(let r of e.body)yield t.decode(r);else{let r=e.body.getReader(),a;try{for(;!(a=await r.read()).done;)yield t.decode(a.value)}finally{r.cancel()}}}function dr(e,t){return{async*[Symbol.asyncIterator](){try{let r="";for await(let a of e)if(r+=a,r.indexOf(t)>-1){let n=r.lastIndexOf(t),s=r.slice(0,n).split(t).filter(i=>i.trim().length>0).map(i=>i.slice(i.indexOf(Ee)+Ee.length).trim());s.length>0&&(yield s),r=r.slice(n+t.length),r.trim()==="--"&&(r="")}}catch(r){throw new Error(`Error occured while processing stream payload - ${O(r)}`)}}}}function ur(e){return{async*[Symbol.asyncIterator](){try{yield{...await yt(e),hasNext:!1}}catch(t){yield{errors:{message:L(O(t)),networkStatusCode:e.status,response:e},hasNext:!1}}}}}function fr(e){return e.map(t=>{try{return JSON.parse(t)}catch(r){throw new Error(`Error in parsing multipart response - ${O(r)}`)}}).map(t=>{let{data:r,incremental:a,hasNext:n,extensions:o,errors:s}=t;if(!a)return{data:r||{},...S("errors",s),...S("extensions",o),hasNext:n};let i=a.map(({data:c,path:d,errors:l})=>({data:c&&d?Ae(d,c):{},...S("errors",l)}));return{data:i.length===1?i[0].data:$e([...i.map(({data:c})=>c)]),...S("errors",Ie(i)),hasNext:n}})}function pr(e,t){if(e.length>0)throw new Error(ge,{cause:{graphQLErrors:e}});if(Object.keys(t).length===0)throw new Error(ve)}function mr(e,t){var i,c;let r=(t!=null?t:"").match(ft),a=`--${r?r[1]:"-"}`;if(!((i=e.body)!=null&&i.getReader)&&!((c=e.body)!=null&&c[Symbol.asyncIterator]))throw new Error("API multipart response did not return an iterable body",{cause:e});let n=lr(e),o={},s;return{async*[Symbol.asyncIterator](){var d,l;try{let f=!0;for await(let h of dr(n,a)){let g=fr(h);s=(l=(d=g.find(R=>R.extensions))==null?void 0:d.extensions)!=null?l:s;let C=Ie(g);o=$e([o,...g.map(({data:R})=>R)]),f=g.slice(-1)[0].hasNext,pr(C,o),yield{...S("data",o),...S("extensions",s),hasNext:f}}if(f)throw new Error("Response stream terminated unexpectedly")}catch(f){let h=Ce(f);yield{...S("data",o),...S("extensions",s),errors:{message:L(O(f)),networkStatusCode:e.status,...S("graphQLErrors",h==null?void 0:h.graphQLErrors),response:e},hasNext:!1}}}}}function hr(e){return async(...t)=>{if(!Se.test(t[0]))throw new Error(L("This operation does not result in a streamable response - use request() instead."));try{let r=await e(...t),{statusText:a}=r;if(!r.ok)throw new Error(a,{cause:r});let n=r.headers.get("content-type")||"";switch(!0){case n.includes(te.json):return ur(r);case n.includes(te.multipart):return mr(r,n);default:throw new Error(`${be} ${n}`,{cause:r})}}catch(r){return{async*[Symbol.asyncIterator](){let a=Ce(r);yield{errors:{message:L(O(r)),...S("networkStatusCode",a==null?void 0:a.status),...S("response",a)},hasNext:!1}}}}}}function Te({client:e,storeDomain:t}){try{if(!t||typeof t!="string")throw new Error;let r=t.trim(),a=r.match(/^https?:/)?r:`https://${r}`,n=new URL(a);return n.protocol="https",n.origin}catch(r){throw new Error(`${e}: a valid store domain ("${t}") must be provided`,{cause:r})}}function ne({client:e,currentSupportedApiVersions:t,apiVersion:r,logger:a}){let n=`${e}: the provided apiVersion ("${r}")`,o=`Currently supported API versions: ${t.join(", ")}`;if(!r||typeof r!="string")throw new Error(`${n} is invalid. ${o}`);let s=r.trim();t.includes(s)||(a?a({type:"Unsupported_Api_Version",content:{apiVersion:r,supportedApiVersions:t}}):console.warn(`${n} is likely deprecated or not supported. ${o}`))}function oe(e){let t=e*3-2;return t===10?t:`0${t}`}function Oe(e,t,r){let a=t-r;return a<=0?`${e-1}-${oe(a+4)}`:`${e}-${oe(a)}`}function gt(){let e=new Date,t=e.getUTCMonth(),r=e.getUTCFullYear(),a=Math.floor(t/3+1);return{year:r,quarter:a,version:`${r}-${oe(a)}`}}function xe(){let{year:e,quarter:t,version:r}=gt(),a=t===4?`${e+1}-01`:`${e}-${oe(t+1)}`;return[Oe(e,t,3),Oe(e,t,2),Oe(e,t,1),r,a,"unstable"]}function ke(e){return t=>({...t!=null?t:{},...e.headers})}function De({getHeaders:e,getApiUrl:t}){return(r,a)=>{let n=[r];if(a&&Object.keys(a).length>0){let{variables:o,apiVersion:s,headers:i,retries:c,signal:d}=a;n.push({...o?{variables:o}:{},...i?{headers:e(i)}:{},...s?{url:t(s)}:{},...c?{retries:c}:{},...d?{signal:d}:{}})}return n}}var Ne="application/json",bt="storefront-api-client",vt="1.0.10",wt="X-Shopify-Storefront-Access-Token",_t="Shopify-Storefront-Private-Token",St="X-SDK-Variant",Et="X-SDK-Version",Ct="X-SDK-Variant-Source",F="Storefront API Client";function It(e){if(e&&typeof window!="undefined")throw new Error(`${F}: private access tokens and headers should only be used in a server-to-server implementation. Use the public API access token in nonserver environments.`)}function At(e,t){if(!e&&!t)throw new Error(`${F}: a public or private access token must be provided`);if(e&&t)throw new Error(`${F}: only provide either a public or private access token`)}function qe({storeDomain:e,apiVersion:t,publicAccessToken:r,privateAccessToken:a,clientName:n,retries:o=0,customFetchApi:s,logger:i}){let c=xe(),d=Te({client:F,storeDomain:e}),l={client:F,currentSupportedApiVersions:c,logger:i};ne({...l,apiVersion:t}),At(r,a),It(a);let f=yr(d,t,l),h={storeDomain:d,apiVersion:t,...r?{publicAccessToken:r}:{privateAccessToken:a},headers:{"Content-Type":Ne,Accept:Ne,[St]:bt,[Et]:vt,...n?{[Ct]:n}:{},...r?{[wt]:r}:{[_t]:a}},apiUrl:f(),clientName:n},g=Le({headers:h.headers,url:h.apiUrl,retries:o,customFetchApi:s,logger:i}),C=ke(h),R=gr(h,f),k=De({getHeaders:C,getApiUrl:R});return Object.freeze({config:h,getHeaders:C,getApiUrl:R,fetch:(...D)=>g.fetch(...k(...D)),request:(...D)=>g.request(...k(...D)),requestStream:(...D)=>g.requestStream(...k(...D))})}function yr(e,t,r){return a=>{a&&ne({...r,apiVersion:a});let n=(a!=null?a:t).trim();return`${e}/api/${n}/graphql.json`}}function gr(e,t){return r=>r?t(r):e.apiUrl}var se={SHOPIFY_STORE_DOMAIN:"shop.infinitemachine.com",SHOPIFY_STOREFRONT_PUBLIC_TOKEN:"eefb42e32220791a7472aaa5d2cf2182",SHOPIFY_API_VERSION:"2026-04"};var U=qe({storeDomain:se.SHOPIFY_STORE_DOMAIN,apiVersion:se.SHOPIFY_API_VERSION,publicAccessToken:se.SHOPIFY_STOREFRONT_PUBLIC_TOKEN});var Lt="olto_cart_",br="cfg_",Ve="config",T=null,u=null,B=null,Me=null,I=null,ie=[],vr=[];function N(e){B=e,u=e}var W=null;function Tt(e){W=e}async function Ot(e){var r;Me=e.id,I=$t()||qt();let t=Cr();if(t)try{let a=await _r(t);a&&(T=t,N(a))}catch(a){console.warn("[Cart] Failed to restore cart, will create new:",a)}if(!T){let a=await wr();N(a),T=a.id,Ir(T)}if(!$t()&&((r=u==null?void 0:u.lines)!=null&&r.length)){let a=Sr(u);a&&(I=a)}return Vt(I),A(),Pt(),u}function xt(){return u==null?void 0:u.checkoutUrl}function ce(){return I}function Fe(){return I=qt(),Vt(I),Pt(),I}async function kt(e){J();let t=B,r=((t==null?void 0:t.lines)||[]).filter(a=>{var n;return((n=a.attributesByKey)==null?void 0:n._config_id)===e}).map(a=>a.id);r.length!==0&&(await Be(r),e===I&&Fe())}async function Ue(e){J();let t=u,r=He(I),a=e.map(o=>Ht(o.variantId,o.quantity||r,{...o.attributes||{},_config_id:I})).filter(Boolean);a.length&&(u=Mt(u,a),A());let n=e.map(o=>({merchandiseId:o.variantId,quantity:o.quantity||r,attributes:X({...o.attributes||{},_config_id:I})}));try{return N(await le(()=>K("cartLinesAdd",`
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ${q} }
          userErrors { field message }
        }
      }
    `,{cartId:T,lines:n}))),A(),u}catch(o){throw u=t,A(),o}}async function Be(e){J();let t=u,r=new Set(e);u&&(u={...u,lines:u.lines.filter(a=>!r.has(a.id))},A());try{return N(await le(()=>K("cartLinesRemove",`
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ${q} }
          userErrors { field message }
        }
      }
    `,{cartId:T,lineIds:e}))),A(),u}catch(a){throw u=t,A(),a}}async function Dt({lineId:e,variantId:t,quantity:r,attributes:a}){J();let n=u;u&&(u={...u,lines:u.lines.map(s=>{if(s.id!==e)return s;let i={...s};if(t!==void 0){let c=je(t)||s.merchandise;i.merchandise=c}if(r!==void 0&&(i.quantity=r),a!==void 0){let c=X(a);i.attributes=c,i.attributesByKey=Object.fromEntries(c.map(d=>[d.key,d.value]))}return i})},A());let o={id:e};t!==void 0&&(o.merchandiseId=t),r!==void 0&&(o.quantity=r),a!==void 0&&(o.attributes=X(a));try{return N(await le(()=>K("cartLinesUpdate",`
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ${q} }
          userErrors { field message }
        }
      }
    `,{cartId:T,lines:[o]}))),A(),u}catch(s){throw u=n,A(),s}}function Nt(e){return ie.push(e),u&&e(u),()=>{ie=ie.filter(t=>t!==e)}}var q=`
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
`;async function wr(){var a;let{data:e,errors:t}=await U.request(`
    mutation CartCreate {
      cartCreate(input: {}) {
        cart { ${q} }
        userErrors { field message }
      }
    }
  `);if(t)throw new Error(`[Cart] createCart errors: ${JSON.stringify(t)}`);let r=(a=e==null?void 0:e.cartCreate)==null?void 0:a.userErrors;if(r!=null&&r.length)throw new Error(`[Cart] createCart userErrors: ${JSON.stringify(r)}`);return Ke(e.cartCreate.cart)}async function _r(e){let{data:t,errors:r}=await U.request(`
    query GetCart($id: ID!) {
      cart(id: $id) { ${q} }
    }
  `,{variables:{id:e}});if(r)throw new Error(`[Cart] queryCart errors: ${JSON.stringify(r)}`);return t!=null&&t.cart?Ke(t.cart):null}async function K(e,t,r){var s;let{data:a,errors:n}=await U.request(t,{variables:r});if(n)throw new Error(`[Cart] ${e} errors: ${JSON.stringify(n)}`);let o=a==null?void 0:a[e];if((s=o==null?void 0:o.userErrors)!=null&&s.length)throw new Error(`[Cart] ${e} userErrors: ${JSON.stringify(o.userErrors)}`);return Ke(o.cart)}function Ke(e){let t=e.attributes||[];return{id:e.id,checkoutUrl:e.checkoutUrl,totalQuantity:e.totalQuantity,cost:e.cost,attributes:t,attributesByKey:Object.fromEntries(t.map(r=>[r.key,r.value])),lines:e.lines.edges.map(({node:r})=>({id:r.id,quantity:r.quantity,attributes:r.attributes,attributesByKey:Object.fromEntries(r.attributes.map(a=>[a.key,a.value])),merchandise:r.merchandise}))}}function X(e){return Object.entries(e).filter(([,t])=>t!=null&&t!=="").map(([t,r])=>({key:t,value:String(r)}))}function J(){if(!T)throw new Error("[Cart] Called before initCart(config)")}function A(){for(let e of ie)e(u)}function qt(){return`${br}${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function He(e){var a;let t=B||u;if(!((a=t==null?void 0:t.lines)!=null&&a.length))return 1;let r=t.lines.find(n=>{var o;return((o=n.attributesByKey)==null?void 0:o._config_id)===e});return(r==null?void 0:r.quantity)||1}function Pt(){for(let e of vr)e(I)}function $t(){return typeof window=="undefined"?null:new URLSearchParams(window.location.search).get(Ve)}function Vt(e){if(typeof window=="undefined")return;let t=new URLSearchParams(window.location.search);e?t.set(Ve,e):t.delete(Ve),window.history.replaceState({},"",`${window.location.pathname}?${t.toString()}`)}function Sr(e){var r;if(!((r=e==null?void 0:e.lines)!=null&&r.length))return null;let t=e.lines.map(a=>{var n;return(n=a.attributesByKey)==null?void 0:n._config_id}).filter(Boolean).sort();return t[t.length-1]||null}var Rt=Promise.resolve();async function le(e){let t=Rt,r;Rt=new Promise(a=>{r=a}),await t;try{return await e()}finally{r()}}var Pe=new Map;function Er(e,t){let r=Pe.get(e)||{inflight:null,latest:null};return r.latest=t,Pe.set(e,r),r.inflight||(r.inflight=(async()=>{for(;r.latest;){let a=r.latest;r.latest=null;try{await le(a)}catch(n){console.error(`[Cart] coalesce(${e}) error:`,n)}}r.inflight=null,Pe.delete(e)})()),r.inflight}async function P(e,t){J();let r=I;if(u){let a=u.lines.findIndex(n=>{var o;return n.merchandise.product.handle===e&&((o=n.attributesByKey)==null?void 0:o._config_id)===r});if(a>=0&&t===null)u={...u,lines:u.lines.filter((n,o)=>o!==a)};else if(a>=0&&t){let n=je(t);n&&(u={...u,lines:u.lines.map((o,s)=>s===a?{...o,merchandise:n}:o)})}else if(a<0&&t){let n=He(r),o=Ht(t,n,{_config_id:r});o&&(u=Mt(u,[o]))}A()}return Er(`product:${e}:${r}`,async()=>{let a=B==null?void 0:B.lines.find(n=>{var o;return n.merchandise.product.handle===e&&((o=n.attributesByKey)==null?void 0:o._config_id)===r});if(t===null){a&&(N(await K("cartLinesRemove",`
          mutation($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart { ${q} } userErrors { field message }
            }
          }
        `,{cartId:T,lineIds:[a.id]})),A());return}if(a)N(await K("cartLinesUpdate",`
        mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart { ${q} } userErrors { field message }
          }
        }
      `,{cartId:T,lines:[{id:a.id,merchandiseId:t}]}));else{let n=He(r);N(await K("cartLinesAdd",`
        mutation($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart { ${q} } userErrors { field message }
          }
        }
      `,{cartId:T,lines:[{merchandiseId:t,quantity:n,attributes:X({_config_id:r})}]}))}A()})}function je(e){if(!W)return null;let t=[W.main,W.wrap,...W.accessories||[]].filter(Boolean);for(let r of t){let a=r.variants.find(n=>n.id===e);if(a)return{id:a.id,title:a.title,price:a.price,image:a.image,selectedOptions:a.selectedOptions,product:{id:r.id,handle:r.handle,title:r.title}}}return null}function Ht(e,t,r){let a=je(e);if(!a)return null;let n=X(r);return{id:`tmp_${Math.random().toString(36).slice(2,10)}`,quantity:t,attributes:n,attributesByKey:Object.fromEntries(n.map(o=>[o.key,o.value])),merchandise:a}}function Mt(e,t){return e&&{...e,lines:[...e.lines,...t],totalQuantity:(e.totalQuantity||0)+t.reduce((r,a)=>r+(a.quantity||1),0)}}function Cr(){return typeof localStorage=="undefined"?null:localStorage.getItem(`${Lt}${Me}`)}function Ir(e){typeof localStorage!="undefined"&&localStorage.setItem(`${Lt}${Me}`,e)}var Ge=new Map,Qe=`
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
`;async function Ft(e){var i;if(Ge.has(e.id))return Ge.get(e.id);let t=!!((i=e.wrap)!=null&&i.productHandle),r=`
    query LoadConfigurator(
      $productHandle: String!
      $accessoriesHandle: String!
      ${t?"$wrapHandle: String!":""}
    ) {
      main: product(handle: $productHandle) { ${Qe} }
      accessoriesCollection: collection(handle: $accessoriesHandle) {
        title
        handle
        products(first: 50) {
          edges { node { ${Qe} } }
        }
      }
      ${t?`wrap: product(handle: $wrapHandle) { ${Qe} }`:""}
    }
  `,a={productHandle:e.product.handle,accessoriesHandle:e.accessoriesCollection};t&&(a.wrapHandle=e.wrap.productHandle);let{data:n,errors:o}=await U.request(r,{variables:a});if(o)throw new Error(`[Products] GraphQL errors: ${JSON.stringify(o)}`);if(!n.main)throw new Error(`[Products] Product not found: ${e.product.handle}`);if(!n.accessoriesCollection)throw new Error(`[Products] Collection not found: ${e.accessoriesCollection}`);let s={main:Ye(n.main),wrap:n.wrap?Ye(n.wrap):null,accessories:n.accessoriesCollection.products.edges.map(c=>Ye(c.node))};return Ge.set(e.id,s),s}function Ye(e){var t,r,a;return{id:e.id,handle:e.handle,title:e.title,description:e.description,availableForSale:e.availableForSale,productType:e.productType,vendor:e.vendor,tags:e.tags||[],featuredImage:e.featuredImage,accessoryEta:((t=e.accessoryEta)==null?void 0:t.value)||null,instructionVideo:((r=e.instructionVideo)==null?void 0:r.value)||null,collections:(((a=e.collections)==null?void 0:a.edges)||[]).map(n=>n.node),variants:e.variants.edges.map(({node:n})=>({id:n.id,title:n.title,availableForSale:n.availableForSale,quantityAvailable:n.quantityAvailable,price:n.price,compareAtPrice:n.compareAtPrice,selectedOptions:n.selectedOptions,image:n.image}))}}var Ze=null,We=null,Ut=[],de=[],b={ready:!1,region:"",baseNumericId:null,bikeLine:null,wrapLine:null,accessoryLines:[],activeBundle:null,quantity:1,total:0,currency:"USD",payMode:"finance",cart:null};function ue(e){return String(e).split("/").pop()}function fe(e){return`gid://shopify/ProductVariant/${e}`}function Bt(e){Ze=e.config,We=e.products,Ut=e.bundles||[],b.baseNumericId=Ze.defaultVariantId,Nt(Ar)}function V(){return b}function Kt(e){return de.push(e),()=>{de=de.filter(t=>t!==e)}}function Xe(e){b.region=e,Je()}function pe(e){b.payMode=e,Je()}function Je(){for(let e of de)e(b)}function Ar(e){var c,d;let t=ce(),r=((e==null?void 0:e.lines)||[]).filter(l=>{var f;return((f=l.attributesByKey)==null?void 0:f._config_id)===t}),a=We.main.handle,n=(c=Ze.wrap)==null?void 0:c.productHandle,o=new Set(We.accessories.map(l=>l.handle));b.cart=e,b.bikeLine=r.find(l=>l.merchandise.product.handle===a)||null,b.wrapLine=r.find(l=>l.merchandise.product.handle===n)||null,b.accessoryLines=r.filter(l=>o.has(l.merchandise.product.handle)),b.bikeLine&&(b.baseNumericId=ue(b.bikeLine.merchandise.id)),b.quantity=((d=r[0])==null?void 0:d.quantity)||1;let s=0;for(let l of r)s+=parseFloat(l.merchandise.price.amount)*(l.quantity||1),l.merchandise.price.currencyCode&&(b.currency=l.merchandise.price.currencyCode);b.total=s;let i=new Set(b.accessoryLines.map(l=>l.merchandise.product.handle));b.activeBundle=null;for(let l of Ut){let f=(l.products||[]).map(h=>h.handle);if(f.length&&f.length===i.size&&f.every(h=>i.has(h))){b.activeBundle=l.handle;break}}b.ready=!0,Je()}var $r='<svg viewBox="0 0 922 201" fill="none" xmlns="http://www.w3.org/2000/svg" class="olto-wordmark" role="img" aria-label="Olto"> <path d="M246.995 19.4652C255.252 28.6186 259.698 41.3214 261.454 61.0855C262.35 70.239 262.649 80.8495 262.649 102.706C262.649 151.985 257.942 170.89 242.885 184.153C231.976 193.605 217.218 198.313 192.41 199.807C182.958 200.405 147.241 201.003 119.817 201.003C59.5913 201.003 43.3765 199.247 26.564 190.093C13.5623 182.995 5.00663 169.433 2.35399 149.968C0.598013 136.966 0.000235075 126.355 0.000235075 94.1874C-0.0371261 48.1211 4.37149 29.8142 18.5687 17.4103C29.1793 7.95792 43.0403 3.54931 68.4458 1.45708C78.496 0.560417 108.011 0 143.99 0C213.631 0 232.237 3.54931 246.995 19.4652ZM46.2907 100.651C46.2907 139.021 49.2422 151.425 60.1517 157.029C71.0611 162.932 80.5135 163.829 136.891 163.829C187.665 163.829 200.331 161.774 208.326 152.919C215.126 145.559 217.181 132.856 217.181 99.4927C217.181 37.8095 216.583 37.2117 131.586 37.2117C46.5896 37.2117 46.2907 38.1084 46.2907 100.651Z" fill="#E90022"/> <path d="M286.86 2.05334H332.328V162.034H476.057V198.909H286.86V2.05334Z" fill="#E90022"/> <path d="M507.328 38.9662H414.673V2.05334H645.154V38.9288H552.759V198.909H507.291V38.9662H507.328Z" fill="#E90022"/> <path d="M906.345 19.4644C914.602 28.6179 919.048 41.3207 920.804 61.0847C921.701 70.2382 922 80.8488 922 102.705C922 151.984 917.292 170.889 902.236 184.152C891.326 193.605 876.569 198.312 851.761 199.807C842.308 200.404 806.591 201.002 779.168 201.002C718.979 201.002 702.727 199.246 685.915 190.093C672.913 182.994 664.357 169.432 661.705 149.967C659.949 136.965 659.351 126.355 659.351 94.1867C659.351 48.1578 663.797 29.8508 677.957 17.4469C688.567 7.99454 702.466 3.58593 727.834 1.49371C737.884 0.597038 767.399 0.0366211 803.378 0.0366211C873.019 0.0366211 891.625 3.58593 906.383 19.5018L906.345 19.4644ZM705.679 100.65C705.679 139.02 708.63 151.424 719.54 157.028C730.449 162.931 739.901 163.828 796.279 163.828C847.053 163.828 859.719 161.773 867.714 152.918C874.514 145.558 876.569 132.855 876.569 99.492C876.569 37.8087 875.971 37.211 790.974 37.211C705.978 37.211 705.679 38.1076 705.679 100.65Z" fill="#E90022"/> </svg>',Rr='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 831.97 45.21" class="im-wordmark" fill="currentColor" role="img" aria-label="Infinite Machine"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M13.56.33V44.88H0V.33Z"/><path d="M44.93.33l27,33.86L71.58.33H84.4V44.88H62.63L36,11.35l.34,33.53h-13V.33Z"/><path d="M141.66.33V10.42H107.87V19.3h32.06V29.39H107.87V44.88H94.38V.33Z"/><path d="M163.09.33V44.88H149.54V.33Z"/><path d="M194.46.33l27,33.86L221.11.33h12.82V44.88H212.16L185.58,11.35l.33,33.53h-13V.33Z"/><path d="M257.44.33V44.88H243.89V.33Z"/><path d="M264.52,11.35V.33h53.23v11H297.91V44.88H284.35V11.35Z"/><path d="M374.26,10.42h-36V18.1h33.93v8.81H338.26V34.8h36.47V44.88H324.91V.33h49.35Z"/><path d="M423,.33l16.23,29.59L455.34.33h21.37V44.88H463.49l.67-34.39L444.39,44.88H433.57L414.13,10.49l.4,34.39H401.44V.33Z"/><path d="M526.62.33,551,44.88H536.17l-4.4-8H503.05l-4.28,8H483.41l25-44.55Zm-9.21,9.55-9.49,17.77H527Z"/><path d="M611.09,32.22c0,1.14-.11,2.11-.2,2.91a13.74,13.74,0,0,1-.36,2.07,11.1,11.1,0,0,1-.57,1.6,8.86,8.86,0,0,1-4.21,4.31,21.46,21.46,0,0,1-8.08,1.77q-2.07.19-6.18.27t-10.78.06c-3.21,0-5.91,0-8.12-.13a53.92,53.92,0,0,1-5.61-.47,20.34,20.34,0,0,1-3.9-.9,14.32,14.32,0,0,1-2.94-1.43,10.08,10.08,0,0,1-2.77-2.58,11.37,11.37,0,0,1-1.74-3.87,32.31,32.31,0,0,1-.9-5.84c-.18-2.32-.27-5.12-.27-8.42q0-4.41.27-7.48a23.36,23.36,0,0,1,1-5.24,10,10,0,0,1,1.87-3.54,10.88,10.88,0,0,1,2.9-2.37,16.6,16.6,0,0,1,3.17-1.44,23.22,23.22,0,0,1,4-.9Q570,.27,573.29.13c2.19-.09,4.83-.13,8-.13q6.21,0,10.22.07c2.67,0,4.88.15,6.61.33a27.49,27.49,0,0,1,4.21.7,18,18,0,0,1,3,1.1,8.12,8.12,0,0,1,4,4.35,20.63,20.63,0,0,1,1.27,7.94V16h-13a11.59,11.59,0,0,0-.5-2.87,2.69,2.69,0,0,0-1.7-1.6,12.6,12.6,0,0,0-3.87-.67c-1.7-.09-4-.13-6.95-.13q-4.14,0-6.74.06c-1.74.05-3.13.14-4.18.27a10.12,10.12,0,0,0-2.4.53,5.12,5.12,0,0,0-1.44.87,4.48,4.48,0,0,0-1,1.24,7.48,7.48,0,0,0-.6,1.87,20.61,20.61,0,0,0-.3,2.94c0,1.18-.07,2.66-.07,4.44a42.86,42.86,0,0,0,.37,6.31A5.34,5.34,0,0,0,570,32.66a8,8,0,0,0,4.21,1.43,75.75,75.75,0,0,0,7.68.31c2.54,0,4.57,0,6.11,0s2.77,0,3.71-.1a12.82,12.82,0,0,0,2.13-.23,7.73,7.73,0,0,0,1.47-.5,3.77,3.77,0,0,0,2.07-1.81,8.36,8.36,0,0,0,.6-3.6h13.16C611.16,29.72,611.14,31.09,611.09,32.22Z"/><path d="M633.44.33v16.5H664.3V.33h13.56V44.88H664.3v-17H633.44v17H619.88V.33Z"/><path d="M701.33.33V44.88H687.77V.33Z"/><path d="M732.7.33l27,33.86L759.35.33h12.82V44.88H750.4L723.82,11.35l.33,33.53h-13V.33Z"/><path d="M831.51,10.42h-36V18.1h33.93v8.81H795.51V34.8H832V44.88H782.15V.33h49.36Z"/></g></g></svg>',E="https://cdn.prod.website-files.com/66ea2a84659b76f5d91d481b",et={"accessory-plate":`${E}/68d53a735e9c987a9499211a_accessory-plate.avif`,"charger-bag":`${E}/68d53a2cb165eb23a2527775_charger-bag.avif`,"olto-center-stand":`${E}/68d53974c880c4b20d23dec9_olto-center-stand.avif`,"olto-charging-dock":`${E}/68d5396153ba7acdd9978c0d_olto-charging-dock.avif`,"olto-kid-carrier":`${E}/6921a92ec4d3dc4a766d69bb_Kid%20Carrier.avif`,"olto-rear-basket":`${E}/68d53b6769ccc4ad6ad7d0b3_olto-rear-basket.avif`,"olto-rear-rack":`${E}/68d53b2e1153a3e349d34c1a_olto-rear-rack.avif`,"olto-side-mounting-plate":`${E}/68d53bea87ff421cf85c858e_olto-side-mounting-plate.avif`,"olto-sidewalls":`${E}/68d53c3ccb4cfb15c59ac6cd_olto-sidewalls.avif`,"olto-super-charger":`${E}/6921a99cb5dd5b924cf4965d_Super%20Charger%20on%20the%20Ground.avif`,"olto-u-lock-mount":`${E}/68d53cf8bb965a6129e84ff4_olto-u-lock-mount.avif`,"olto-water-bottle-holder":`${E}/68d53d46367f73dfd1b58a42_olto-water-bottle-holder.avif`,"open-face-helmet":`${E}/6921a8f20583ec71e2663dce_Black%20Open%20Face%20Helmet.avif`,"kryptonite-lock":`${E}/68d53fc0d2d8d2d151493b5f_kryptonite-lock.avif`,"olto-soft-bag":`${E}/692197c1914921de9b30217a_Soft%20Bag%20on%20the%20Ground.avif`},ze={finance:{months:48,apr:.1599},lease:{months:24,residualPct:.35}};function jt(e,t,r){if(r==="finance"){let{months:a,apr:n}=ze.finance,o=n/12,s=o>0?e*o/(1-(1+o)**-a):e/a;return{amount:s,suffix:"/mo",label:"Est. finance payment",sub:`${a} monthly payments of ${_(s,t)} at ${(n*100).toFixed(2)}% APR. Estimate for illustration \u2014 payment options appear at checkout.`}}if(r==="lease"){let{months:a,residualPct:n}=ze.lease;return{amount:e*(1-n)/a,suffix:"/mo",label:"Est. lease payment",sub:`${a}-month term, ${Math.round(n*100)}% residual. Estimate for illustration.`}}return{amount:e,suffix:"",label:"Est. purchase price",sub:"Taxes and shipping calculated at checkout."}}var me=[{key:"olto",label:"Olto",tagline:"Ready to ride.",price:0,includes:["Olto","Battery Charger","Internet Module"],items:[]},{key:"commuter",label:"Olto Commuter",tagline:"Everything you need to commute every day.",popular:!0,price:200,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","olto-water-bottle-holder"]},{key:"cargo",label:"Olto Cargo",tagline:"Carry everything.",price:700,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","charger-bag","olto-rear-rack","olto-rear-basket","olto-soft-bag","olto-side-mounting-plate","accessory-plate","olto-center-stand"]},{key:"max",label:"Olto Max",tagline:"Fully loaded. Full power.",price:950,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","olto-water-bottle-holder","charger-bag","olto-rear-rack","olto-rear-basket","olto-soft-bag","olto-side-mounting-plate","accessory-plate","olto-center-stand","olto-super-charger"]}],Lr=[{value:"40 mi",label:"Range (est.)"},{value:"20 mph",label:"Top Speed"},{value:"Class 2",label:"E-bike"}];function _(e,t="USD"){let r=Number(e)||0,a=r%1===0?0:2;return t==="USD"?`$${r.toLocaleString("en-US",{minimumFractionDigits:a,maximumFractionDigits:a})}`:`${t} ${r.toFixed(2)}`}function y(e){return String(e!=null?e:"").replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`)}function j(e,t){return e?`${e}${e.includes("?")?"&":"?"}width=${t}`:""}function Gt({config:e,products:t,wrapVariantsByColor:r}){let a=Object.entries(e.variants),[n]=a.find(([l])=>l===e.defaultVariantId)||a[0],o=Math.min(...t.main.variants.map(l=>parseFloat(l.price.amount))),{months:s,apr:i}=ze.finance,c=i/12,d=Math.round(o*c/(1-(1+c)**-s));return`
    <header class="topbar">
      <div class="topbar_mark">${Rr}</div>
    </header>

    <section class="hero" aria-label="Olto">
      <img class="hero_img is-active" data-hero-img="a" src="${y(e.variants[n].backgroundImage)}" alt="Olto" />
      <img class="hero_img" data-hero-img="b" alt="" aria-hidden="true" />
      <div class="hero_layers" data-layers>
        ${Object.entries(et).map(([l,f])=>`<img class="hero_layer" data-layer="${y(l)}" src="${y(f)}" alt="" aria-hidden="true" />`).join("")}
      </div>
    </section>

    <main class="sheet">
      <div class="sheet_handle" aria-hidden="true"></div>

      <section class="intro">
        <h1 class="intro_title">${$r}</h1>
        <p class="intro_delivery" data-delivery></p>
        <p class="intro_price">From ${_(o)} \xB7 or ${_(d)}/mo financing</p>
        <div class="stats">
          ${Lr.map(l=>`
            <div class="stats_item">
              <div class="stats_value">${y(l.value)}</div>
              <div class="stats_label">${y(l.label)}</div>
            </div>`).join("")}
        </div>
      </section>

      ${Tr(e,a,r)}

      ${Or(t,o)}

      <section class="opt" data-section="accessories">
        <h2 class="opt_title">Accessories</h2>
        <div class="acc-list">
          ${t.accessories.map(l=>kr(l)).join("")}
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
  `}function Tr(e,t,r){var i,c;let a=(i=t.find(([,d])=>/silver/i.test(d.color)))==null?void 0:i[1],n=(c=t.find(([,d])=>/black/i.test(d.color)))==null?void 0:c[1],o={...e.wrapColorMap,Black:(n==null?void 0:n.colorHex)||"#1c1c1e"},s=["Black","Sand","Blush","Forest","Crimson"].filter(d=>r.has(d));return`
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
          <div class="swatch_sub">+${_(l)}</div>
        </div>`}).join("")}
      </div>
    </section>
  `}function Or(e,t){return`
    <section class="opt" data-section="bundles">
      <h2 class="opt_title">Bundle</h2>
      <div class="kit-list">
        ${me.map(r=>xr(r,e,t)).join("")}
      </div>
    </section>
  `}function xr(e,t,r){let a=e.items.reduce((i,c)=>{let d=G(t.accessories.find(l=>l.handle===c));return i+(d?parseFloat(d.price.amount):0)},0),n=a-e.price,o=e.includes||e.items.map(i=>{let c=t.accessories.find(d=>d.handle===i);return((c==null?void 0:c.title)||i).replace(/^Olto /,"")}),s=e.items.length?`<div class="kit_price">+${_(e.price)}</div>
       ${n>0?`<div class="kit_save"><s>${_(a)}</s> Save ${_(n)}</div>`:""}`:`<div class="kit_price">${_(r)}</div>`;return`
    <button type="button" class="kit" data-bundle="${y(e.key)}">
      ${e.popular?'<span class="kit_chip">Most popular</span>':""}
      <div class="kit_top">
        <div class="kit_id">
          <div class="kit_name">${y(e.label)}</div>
          <div class="kit_tagline">${y(e.tagline)}</div>
        </div>
        <div class="kit_pricing">${s}</div>
      </div>
      <div class="kit_items">
        ${o.map(i=>`<span class="kit_item">${y(i)}</span>`).join("")}
      </div>
    </button>
  `}function kr(e){var r;let t=G(e);return t?`
    <div class="acc" data-acc="${y(e.handle)}">
      <img class="acc_img" src="${y(j((r=e.featuredImage)==null?void 0:r.url,240))}" alt="${y(e.title)}" loading="lazy" />
      <div class="acc_info">
        <div class="acc_name">${y(e.title)}</div>
        <div class="acc_price">${_(parseFloat(t.price.amount),t.price.currencyCode)}</div>
      </div>
      <button type="button" class="acc_btn" data-acc-toggle="${y(e.handle)}">Add</button>
    </div>
  `:""}function G(e){return e&&(e.variants.find(t=>t.availableForSale)||e.variants[0])||null}function Qt(e,t){var n;let r=[];if(e.bikeLine){let o=((n=t.variants[e.baseNumericId])==null?void 0:n.color)||e.bikeLine.merchandise.title;r.push({label:`Olto &middot; ${y(o)}`,amount:parseFloat(e.bikeLine.merchandise.price.amount)})}e.wrapLine&&r.push({label:`Wrap &middot; ${y(e.wrapLine.merchandise.title)}`,amount:parseFloat(e.wrapLine.merchandise.price.amount)});for(let o of e.accessoryLines)r.push({label:y(o.merchandise.product.title),amount:parseFloat(o.merchandise.price.amount)});let a=e.quantity>1?`<div class="summary_qty">&times;${e.quantity} configurations</div>`:"";return r.map(o=>`
      <div class="summary_row">
        <span>${o.label}</span>
        <span>${_(o.amount,e.currency)}</span>
      </div>`).join("")+a}var x=window.gsap||null;x&&window.ScrollTrigger&&x.registerPlugin(window.ScrollTrigger);var m=document.querySelector("#app"),$=null,Y=new Map,z="a",he=null,Dr=new Set(["Sand"]),tt=0,rt=null;Nr();async function Nr(){var r,a,n;let e=(r=Object.entries(w.variants).find(([,o])=>/silver/i.test(o.color)))==null?void 0:r[0];e&&(w.defaultVariantId=e);try{$=await Ft(w)}catch(o){console.error("[Tesla] Failed to load products:",o),Pr();return}Y=qr($.wrap),Tt($),await Ot(w),Bt({config:w,products:$,bundles:me.filter(o=>o.items.length).map(o=>({handle:o.key,products:o.items.map(s=>({handle:s}))}))}),m.innerHTML=Gt({config:w,products:$,wrapVariantsByColor:Y}),Vr(),Kt(zt),zt(V()),Qr();let t=Ur();t?Br(t):V().bikeLine||P($.main.handle,fe(w.defaultVariantId)),Wr(),Jr();for(let o of Y.values())(a=o.image)!=null&&a.url&&(new Image().src=o.image.url);for(let o of $.main.variants)(n=o.image)!=null&&n.url&&(new Image().src=j(o.image.url,1600))}function qr(e){var r;let t=new Map;if(!e)return t;for(let a of e.variants){let n=(r=a.selectedOptions)==null?void 0:r.find(s=>/colou?rs?/i.test(s.name)),o=(n==null?void 0:n.value)||a.title;o&&t.set(o,a)}return t}function Pr(){m.innerHTML=`
    <div class="boot">
      <div class="boot_mark">INFINITE MACHINE</div>
      <div class="boot_label">Couldn&rsquo;t reach the store. Check your connection.</div>
      <button type="button" class="boot_retry" onclick="location.reload()">Retry</button>
    </div>
  `}function Vr(){m.addEventListener("click",e=>{let t=e.target.closest("[data-color-swatch]");if(t)return Hr(t.dataset.colorSwatch);let r=e.target.closest("[data-acc-toggle]");if(r)return Mr(r.dataset.accToggle);let a=e.target.closest("[data-bundle]");if(a)return Fr(a.dataset.bundle);let n=e.target.closest("[data-pay-mode]");if(n)return pe(n.dataset.payMode);if(e.target.closest("[data-qty-dec]"))return Zt(-1);if(e.target.closest("[data-qty-inc]"))return Zt(1);if(e.target.closest("[data-save]"))return Yr()?(e.target.closest("[data-nudge]")&&setTimeout(nt,2200),Kr()):(e.target.closest("[data-nudge]")&&nt(),Jt(!0));if(e.target.closest("[data-save-close]"))return Jt(!1);if(e.target.closest("[data-nudge-close]"))return nt();if(e.target.closest("[data-config-reset]"))return jr();if(e.target.closest("[data-cta]"))return Gr();if(e.target.closest("[data-interest-close]"))return rr(!1)}),m.addEventListener("submit",e=>{e.target.closest("[data-save-form]")&&(e.preventDefault(),Zr(e.target))})}function Hr(e){let t=w.wrap.productHandle;if(!e)return P(t,null);let r=Y.get(e);r&&P(t,r.id)}function Mr(e){var n,o;let t=V(),r=t.accessoryLines.some(s=>s.merchandise.product.handle===e),a=w.accessoryDependencies||{};if(r){P(e,null);let s=((n=a[e])==null?void 0:n.requiredBy)||[];for(let i of s)t.accessoryLines.some(c=>c.merchandise.product.handle===i)&&P(i,null);return}Yt(e);for(let[s,i]of Object.entries(a))(o=i.requiredBy)!=null&&o.includes(e)&&(t.accessoryLines.some(d=>d.merchandise.product.handle===s)||Yt(s))}function Yt(e){let t=$.accessories.find(a=>a.handle===e),r=G(t);r&&P(e,r.id)}var at=!1;async function Fr(e){if(!at){at=!0;try{let t=V(),r=t.activeBundle===e,a=t.accessoryLines.map(s=>s.id).filter(s=>!String(s).startsWith("tmp_"));a.length&&await Be(a);let n=me.find(s=>s.key===e);if(r||!(n!=null&&n.items.length))return;let o=n.items.map(s=>{let i=G($.accessories.find(c=>c.handle===s));return i?{variantId:i.id,attributes:{_bundle:e}}:null}).filter(Boolean);o.length&&await Ue(o)}catch(t){console.error("[Tesla] Bundle select failed:",t)}finally{at=!1}}}function Zt(e){let t=V(),r=[t.bikeLine,t.wrapLine,...t.accessoryLines].filter(Boolean),a=Math.min(99,Math.max(1,t.quantity+e));if(a===t.quantity)return;let n=r.filter(o=>!String(o.id).startsWith("tmp_"));Promise.all(n.map(o=>Dt({lineId:o.id,quantity:a})))}function Ur(){let e=new URLSearchParams(window.location.search).get("d");if(!e)return null;let[t,r,a,n,o]=e.split(".");return!t||!w.variants[t]?null:{base:t,wrap:r||null,qty:Math.min(99,Math.max(1,parseInt(a,10)||1)),pay:["cash","lease","finance"].includes(n)?n:"finance",accs:(o||"").split("~").filter(Boolean)}}async function Br(e){Fe();let t=[{variantId:fe(e.base),quantity:e.qty}],r=e.wrap?Y.get(e.wrap):null;r&&t.push({variantId:r.id,quantity:e.qty});for(let n of e.accs){let o=G($.accessories.find(s=>s.handle===n));o&&t.push({variantId:o.id,quantity:e.qty})}pe(e.pay);try{await Ue(t)}catch(n){console.error("[Tesla] Failed to apply shared design:",n)}let a=new URLSearchParams(window.location.search);a.delete("d"),window.history.replaceState({},"",`${window.location.pathname}?${a.toString()}`)}function tr(){let e=V(),t=e.wrapLine?nr(e.wrapLine.merchandise)||e.wrapLine.merchandise.title:"",r=e.accessoryLines.map(o=>o.merchandise.product.handle).join("~"),a=[e.baseNumericId,t,e.quantity,e.payMode,r].join("."),n=new URL(window.location.href);return n.searchParams.set("d",a),n.toString()}var Wt=null;async function Kr(){let e=tr(),t=[...m.querySelectorAll("[data-save]")];try{await navigator.clipboard.writeText(e);for(let r of t)r.textContent="Link copied"}catch{window.history.replaceState({},"",e);for(let r of t)r.textContent="Link in URL"}clearTimeout(Wt),Wt=setTimeout(()=>{for(let r of t)r.textContent=r.dataset.saveLabel||"Save"},2200)}var ee=null;async function jr(){let e=m.querySelector("[data-config-reset]");if(!ee){e&&(e.textContent="Tap again to clear",e.classList.add("is-armed")),ee=setTimeout(()=>{ee=null,e&&(e.textContent="Clear configuration",e.classList.remove("is-armed"))},3e3);return}clearTimeout(ee),ee=null,e&&(e.textContent="Clear configuration",e.classList.remove("is-armed"));try{await kt(ce())}catch(t){console.error("[Tesla] Clear failed:",t)}pe("finance"),P($.main.handle,fe(w.defaultVariantId))}function Gr(){let e=V();if(!e.ready)return;if(e.region==="row")return rr(!0);let t=xt();t&&(window.location.href=t)}var Xt="olto_tesla_nudge";function Qr(){let e=m.querySelector("[data-nudge]"),t=m.querySelector('[data-section="payment"]');if(!e||!t)return;try{if(sessionStorage.getItem(Xt))return}catch{}let r=new IntersectionObserver(a=>{if(a.some(n=>n.isIntersecting)){r.disconnect(),e.hidden=!1,requestAnimationFrame(()=>e.classList.add("is-in"));try{sessionStorage.setItem(Xt,"1")}catch{}}},{threshold:.3});r.observe(t)}function nt(){let e=m.querySelector("[data-nudge]");!e||e.hidden||(e.classList.remove("is-in"),setTimeout(()=>{e.hidden=!0},450))}function rr(e){let t=m.querySelector("[data-interest]");t&&(t.hidden=!e)}var ar="olto_tesla_lead";function Yr(){try{let e=JSON.parse(localStorage.getItem(ar));return e!=null&&e.email?e:null}catch{return null}}function Jt(e){var r;let t=m.querySelector("[data-save-modal]");if(t&&(t.hidden=!e,e)){let a=t.querySelector("[data-save-form]"),n=t.querySelector("[data-save-done]");a&&(a.hidden=!1),n&&(n.hidden=!0),(r=t.querySelector('input[name="name"]'))==null||r.focus()}}async function Zr(e){let t=e.name.value.trim(),r=e.email.value.trim(),a=e.phone.value.trim(),n=e.querySelector("[data-save-error]"),o=null;if(t?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)?a.replace(/\D/g,"").length<7&&(o="That phone number looks too short."):o="That email doesn\u2019t look right.":o="Please add your name.",o){n&&(n.textContent=o,n.hidden=!1);return}n&&(n.hidden=!0);try{localStorage.setItem(ar,JSON.stringify({name:t,email:r,phone:a}))}catch{}let s=tr(),i=!0;try{await navigator.clipboard.writeText(s)}catch{i=!1}e.hidden=!0;let c=m.querySelector("[data-save-done]");if(c){c.hidden=!1;let d=c.querySelector("[data-save-done-msg]");d&&(d.textContent=i?"Link copied to your clipboard \u2014 it rebuilds this exact Olto.":"Copy your link below \u2014 it rebuilds this exact Olto.");let l=c.querySelector("[data-save-link]");l&&(l.textContent=s)}}async function Wr(){let e=new AbortController,t=setTimeout(()=>e.abort(),8e3);try{let a=(await(await fetch("https://get.geojs.io/v1/ip/country",{signal:e.signal})).text()).trim().toUpperCase();Xe(["US","CA"].includes(a)?"us":"row")}catch{Xe("")}finally{clearTimeout(t)}}function zt(e){var k,H,D,ot,st,it;if(!e.ready)return;let t=w.variants[e.baseNumericId]||{};Q("[data-delivery]",t.delivery?`Est. delivery ${t.delivery}`:"");let r=e.wrapLine?nr(e.wrapLine.merchandise)||e.wrapLine.merchandise.title:"";for(let p of m.querySelectorAll("[data-color-swatch]"))p.classList.toggle("is-selected",e.wrapLine?p.dataset.colorSwatch===r:p.dataset.colorSwatch==="");let a=new Set(e.accessoryLines.map(p=>p.merchandise.product.handle)),n={},o=new Set;for(let p of w.customImageRules||[])if(p.when.every(v=>a.has(v))){Object.assign(n,p.replace||{});for(let v of p.hide||[])o.add(v)}let s=!1;for(let p of m.querySelectorAll("[data-layer]")){let v=p.dataset.layer,Z=a.has(v)&&!o.has(v),ye=n[v]||et[v];ye&&p.getAttribute("src")!==ye&&p.setAttribute("src",ye),p.classList.toggle("is-on",Z),Z&&(s=!0)}let i=(H=(k=$.main.variants.find(p=>ue(p.id)===e.baseNumericId))==null?void 0:k.image)==null?void 0:H.url,c=e.region==="row"?"eu":"us",d=(c==="eu"?t.backgroundImage:j(i,1600))||j(i,1600)||t.backgroundImage,l=e.wrapLine?(ot=(D=Y.get(r))==null?void 0:D.image)==null?void 0:ot.url:null,f=l&&!Dr.has(r);if(e.wrapLine&&r==="Black"){let p=$.main.variants.find(v=>{var Z;return((Z=w.variants[ue(v.id)])==null?void 0:Z.color)==="Black"});(st=p==null?void 0:p.image)!=null&&st.url&&(l=j(p.image.url,1600),f=!0)}l&&(f||!s)?er(l,`wrap:${r}`):er(d,`base:${e.baseNumericId}:${c}`);for(let p of m.querySelectorAll("[data-bundle]")){let v=p.dataset.bundle==="olto";p.classList.toggle("is-selected",v?e.accessoryLines.length===0:p.dataset.bundle===e.activeBundle)}let h=new Set(e.accessoryLines.map(p=>p.merchandise.product.handle));for(let p of m.querySelectorAll("[data-acc-toggle]")){let v=h.has(p.dataset.accToggle);p.textContent=v?"Added":"Add",p.classList.toggle("is-added",v),(it=p.closest("[data-acc]"))==null||it.classList.toggle("is-added",v)}Q("[data-qty-value]",String(e.quantity));let g=m.querySelector("[data-summary]");g&&(g.innerHTML=Qt(e,w)),Q("[data-summary-total]",_(e.total,e.currency));let C=jt(e.total,e.currency,e.payMode);for(let p of m.querySelectorAll("[data-pay-mode]"))p.classList.toggle("is-active",p.dataset.payMode===e.payMode);Q("[data-pay-figure]",_(C.amount,e.currency)+C.suffix),Q("[data-pay-sub]",C.sub),Xr(C.amount,C.suffix,e.currency),Q("[data-total-label]",C.label);let R=m.querySelector("[data-cta]");R&&(R.textContent=e.region==="row"?"Register interest":"Order")}function nr(e){var r;let t=(r=e.selectedOptions)==null?void 0:r.find(a=>/colou?rs?/i.test(a.name));return(t==null?void 0:t.value)||null}function Q(e,t){let r=m.querySelector(e);r&&r.textContent!==t&&(r.textContent=t)}function Xr(e,t,r){let a=m.querySelector("[data-total]");if(a){if(x&&!document.hidden&&tt!==e){rt&&rt.kill();let n={v:tt};rt=x.to(n,{v:e,duration:.45,ease:"power2.out",onUpdate:()=>{a.textContent=_(n.v,r)+t},onComplete:()=>{a.textContent=_(e,r)+t}})}else a.textContent=_(e,r)+t;tt=e}}function er(e,t){if(!e||t===he)return;let r={a:m.querySelector('[data-hero-img="a"]'),b:m.querySelector('[data-hero-img="b"]')};if(!r.a||!r.b)return;if(he===null){r[z].src=e,he=t;return}let a=r[z],n=r[z==="a"?"b":"a"];n.src=e,z=z==="a"?"b":"a",he=t,x?(x.set(n,{opacity:0,scale:1.04,xPercent:0,yPercent:0}),n.classList.add("is-active"),x.to(n,{opacity:1,scale:1,duration:.45,ease:"power2.out"}),x.to(a,{opacity:0,duration:.45,ease:"power2.out",onComplete:()=>a.classList.remove("is-active")})):(n.classList.add("is-active"),n.style.opacity=1,a.classList.remove("is-active"),a.style.opacity=0)}function Jr(){if(!x||!window.ScrollTrigger||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let e=m.querySelector(".sheet");for(let t of m.querySelectorAll(".opt"))x.from(t,{y:24,opacity:0,duration:.45,ease:"power2.out",scrollTrigger:{trigger:t,scroller:e,start:"top 88%",once:!0}})}})();
