"use strict";(()=>{var _={id:"olto",steps:[{type:"location",no:"01",title:"Location",validation:!0,collapsible:!1},{type:"variant",no:"02",title:"Base"},{type:"wrap",no:"03",title:"Wrap"},{type:"bundle",no:"04",title:"Accessory Pack"},{type:"accessories",no:"05",title:"Configure your Accessories"},{type:"quantity",no:"06",title:"Quantity"}],product:{handle:"olto-1"},accessoriesCollection:"olto-accessories",testInstructionVideo:"https://vz-19725589-529.b-cdn.net/a4c98a2a-412b-4e2e-a2ce-4e9a64123464/playlist.m3u8",wrap:{productHandle:"olto-wrap"},bundles:{metaobjectType:"bundles"},variants:{44842879156380:{color:"Black",colorHex:"#000000",delivery:"July 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff73905e7daa5ef224c5d5_olto-eu-black.avif"},44842879123612:{color:"Silver",colorHex:"#D9D9D9",delivery:"August 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff7390e94ecc537b713a30_olto-eu-silver.avif"}},defaultVariantId:"44842879156380",wrapColorMap:{Sand:"#DECEAF",Blush:"#F6C6DC",Sky:"#707A8D",Forest:"#627063",Crimson:"#B44C47"},accessoryDependencies:{"olto-rear-rack":{requiredBy:["olto-rear-basket","olto-side-mounting-plate"]}},customImageRules:[{when:["olto-soft-bag","olto-rear-basket"],replace:{"olto-soft-bag":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/69219c3d619077ba6f1689ed_Soft%20Bag%20in%20Rear%20Basket.avif"}},{when:["olto-charging-dock","olto-battery"],replace:{"olto-battery":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6921a4037d0eab061d3d7ca4_Battery%20Dock%20with%20Battery%20Plugged%20in.avif"},hide:["olto-charging-dock"]}]};var U="GraphQL Client";var he="An error occurred while fetching from the API. Review 'graphQLErrors' for details.",ye="Response returned unexpected Content-Type:",ge="An unknown error has occurred. The API did not return a data object or any errors in its response.",te={json:"application/json",multipart:"multipart/mixed"},be="X-SDK-Variant",we="X-SDK-Version",it="shopify-graphql-client",ct="1.4.2",re=1e3,lt=[429,503],ve=/@(defer)\b/i,st=`\r
`,dt=/boundary="?([^=";]+)"?/i,Ee=st+st;function R(e,t=U){return e.startsWith(`${t}`)?e:`${t}: ${e}`}function O(e){return e instanceof Error?e.message:JSON.stringify(e)}function _e(e){return e instanceof Error&&e.cause?e.cause:void 0}function Se(e){return e.flatMap(({errors:t})=>t!=null?t:[])}function ne({client:e,retries:t}){if(t!==void 0&&(typeof t!="number"||t<0||t>3))throw new Error(`${e}: The provided "retries" value (${t}) is invalid - it cannot be less than ${0} or greater than ${3}`)}function w(e,t){return t&&(typeof t!="object"||Array.isArray(t)||typeof t=="object"&&Object.keys(t).length>0)?{[e]:t}:{}}function Ce(e,t){if(e.length===0)return t;let n={[e.pop()]:t};return e.length===0?n:Ce(e,n)}function pt(e,t){return Object.keys(t||{}).reduce((r,n)=>(typeof t[n]=="object"||Array.isArray(t[n]))&&e[n]?(r[n]=pt(e[n],t[n]),r):(r[n]=t[n],r),Array.isArray(e)?[...e]:{...e})}function Ie([e,...t]){return t.reduce(pt,{...e})}function Ae({clientLogger:e,customFetchApi:t=fetch,client:r=U,defaultRetryWaitTime:n=re,retriableCodes:a=lt}){let o=async(s,i,c)=>{let u=i+1,d=c+1,f;try{if(f=await t(...s),e({type:"HTTP-Response",content:{requestParams:s,response:f}}),!f.ok&&a.includes(f.status)&&u<=d)throw new Error;let m=(f==null?void 0:f.headers.get("X-Shopify-API-Deprecated-Reason"))||"";return m&&e({type:"HTTP-Response-GraphQL-Deprecation-Notice",content:{requestParams:s,deprecationNotice:m}}),f}catch(m){if(u<=d){let y=f==null?void 0:f.headers.get("Retry-After");return await tr(y?parseInt(y,10):n),e({type:"HTTP-Retry",content:{requestParams:s,lastResponse:f,retryAttempt:i,maxRetries:c}}),o(s,u,c)}throw new Error(R(`${c>0?`Attempted maximum number of ${c} network retries. Last message - `:""}${O(m)}`,r))}};return o}async function tr(e){return new Promise(t=>setTimeout(t,e))}function $e({headers:e,url:t,customFetchApi:r=fetch,retries:n=0,logger:a}){ne({client:U,retries:n});let o={headers:e,url:t,retries:n},s=rr(a),i=Ae({customFetchApi:r,clientLogger:s,defaultRetryWaitTime:re}),c=nr(i,o),u=ar(c),d=ur(c);return{config:o,fetch:c,request:u,requestStream:d}}function rr(e){return t=>{e&&e(t)}}async function mt(e){let{errors:t,data:r,extensions:n}=await e.json();return{...w("data",r),...w("extensions",n),headers:e.headers,...t||!r?{errors:{networkStatusCode:e.status,message:R(t?he:ge),...w("graphQLErrors",t),response:e}}:{}}}function nr(e,{url:t,headers:r,retries:n}){return async(a,o={})=>{let{variables:s,headers:i,url:c,retries:u,keepalive:d,signal:f}=o,m=JSON.stringify({query:a,variables:s});ne({client:U,retries:u});let y=Object.entries({...r,...i}).reduce(($,[V,B])=>($[V]=Array.isArray(B)?B.join(", "):B.toString(),$),{});!y[be]&&!y[we]&&(y[be]=it,y[we]=ct);let S=[c!=null?c:t,{method:"POST",headers:y,body:m,signal:f,keepalive:d}];return e(S,1,u!=null?u:n)}}function ar(e){return async(...t)=>{if(ve.test(t[0]))throw new Error(R("This operation will result in a streamable response - use requestStream() instead."));let r=null;try{r=await e(...t);let{status:n,statusText:a}=r,o=r.headers.get("content-type")||"";return r.ok?o.includes(te.json)?await mt(r):{errors:{networkStatusCode:n,message:R(`${ye} ${o}`),response:r}}:{errors:{networkStatusCode:n,message:R(a),response:r}}}catch(n){return{errors:{message:O(n),...r==null?{}:{networkStatusCode:r.status,response:r}}}}}}async function*or(e){let t=new TextDecoder;if(e.body[Symbol.asyncIterator])for await(let r of e.body)yield t.decode(r);else{let r=e.body.getReader(),n;try{for(;!(n=await r.read()).done;)yield t.decode(n.value)}finally{r.cancel()}}}function sr(e,t){return{async*[Symbol.asyncIterator](){try{let r="";for await(let n of e)if(r+=n,r.indexOf(t)>-1){let a=r.lastIndexOf(t),s=r.slice(0,a).split(t).filter(i=>i.trim().length>0).map(i=>i.slice(i.indexOf(Ee)+Ee.length).trim());s.length>0&&(yield s),r=r.slice(a+t.length),r.trim()==="--"&&(r="")}}catch(r){throw new Error(`Error occured while processing stream payload - ${O(r)}`)}}}}function ir(e){return{async*[Symbol.asyncIterator](){try{yield{...await mt(e),hasNext:!1}}catch(t){yield{errors:{message:R(O(t)),networkStatusCode:e.status,response:e},hasNext:!1}}}}}function cr(e){return e.map(t=>{try{return JSON.parse(t)}catch(r){throw new Error(`Error in parsing multipart response - ${O(r)}`)}}).map(t=>{let{data:r,incremental:n,hasNext:a,extensions:o,errors:s}=t;if(!n)return{data:r||{},...w("errors",s),...w("extensions",o),hasNext:a};let i=n.map(({data:c,path:u,errors:d})=>({data:c&&u?Ce(u,c):{},...w("errors",d)}));return{data:i.length===1?i[0].data:Ie([...i.map(({data:c})=>c)]),...w("errors",Se(i)),hasNext:a}})}function lr(e,t){if(e.length>0)throw new Error(he,{cause:{graphQLErrors:e}});if(Object.keys(t).length===0)throw new Error(ge)}function dr(e,t){var i,c;let r=(t!=null?t:"").match(dt),n=`--${r?r[1]:"-"}`;if(!((i=e.body)!=null&&i.getReader)&&!((c=e.body)!=null&&c[Symbol.asyncIterator]))throw new Error("API multipart response did not return an iterable body",{cause:e});let a=or(e),o={},s;return{async*[Symbol.asyncIterator](){var u,d;try{let f=!0;for await(let m of sr(a,n)){let y=cr(m);s=(d=(u=y.find($=>$.extensions))==null?void 0:u.extensions)!=null?d:s;let S=Se(y);o=Ie([o,...y.map(({data:$})=>$)]),f=y.slice(-1)[0].hasNext,lr(S,o),yield{...w("data",o),...w("extensions",s),hasNext:f}}if(f)throw new Error("Response stream terminated unexpectedly")}catch(f){let m=_e(f);yield{...w("data",o),...w("extensions",s),errors:{message:R(O(f)),networkStatusCode:e.status,...w("graphQLErrors",m==null?void 0:m.graphQLErrors),response:e},hasNext:!1}}}}}function ur(e){return async(...t)=>{if(!ve.test(t[0]))throw new Error(R("This operation does not result in a streamable response - use request() instead."));try{let r=await e(...t),{statusText:n}=r;if(!r.ok)throw new Error(n,{cause:r});let a=r.headers.get("content-type")||"";switch(!0){case a.includes(te.json):return ir(r);case a.includes(te.multipart):return dr(r,a);default:throw new Error(`${ye} ${a}`,{cause:r})}}catch(r){return{async*[Symbol.asyncIterator](){let n=_e(r);yield{errors:{message:R(O(r)),...w("networkStatusCode",n==null?void 0:n.status),...w("response",n)},hasNext:!1}}}}}}function Re({client:e,storeDomain:t}){try{if(!t||typeof t!="string")throw new Error;let r=t.trim(),n=r.match(/^https?:/)?r:`https://${r}`,a=new URL(n);return a.protocol="https",a.origin}catch(r){throw new Error(`${e}: a valid store domain ("${t}") must be provided`,{cause:r})}}function ae({client:e,currentSupportedApiVersions:t,apiVersion:r,logger:n}){let a=`${e}: the provided apiVersion ("${r}")`,o=`Currently supported API versions: ${t.join(", ")}`;if(!r||typeof r!="string")throw new Error(`${a} is invalid. ${o}`);let s=r.trim();t.includes(s)||(n?n({type:"Unsupported_Api_Version",content:{apiVersion:r,supportedApiVersions:t}}):console.warn(`${a} is likely deprecated or not supported. ${o}`))}function oe(e){let t=e*3-2;return t===10?t:`0${t}`}function Le(e,t,r){let n=t-r;return n<=0?`${e-1}-${oe(n+4)}`:`${e}-${oe(n)}`}function ht(){let e=new Date,t=e.getUTCMonth(),r=e.getUTCFullYear(),n=Math.floor(t/3+1);return{year:r,quarter:n,version:`${r}-${oe(n)}`}}function Te(){let{year:e,quarter:t,version:r}=ht(),n=t===4?`${e+1}-01`:`${e}-${oe(t+1)}`;return[Le(e,t,3),Le(e,t,2),Le(e,t,1),r,n,"unstable"]}function Oe(e){return t=>({...t!=null?t:{},...e.headers})}function xe({getHeaders:e,getApiUrl:t}){return(r,n)=>{let a=[r];if(n&&Object.keys(n).length>0){let{variables:o,apiVersion:s,headers:i,retries:c,signal:u}=n;a.push({...o?{variables:o}:{},...i?{headers:e(i)}:{},...s?{url:t(s)}:{},...c?{retries:c}:{},...u?{signal:u}:{}})}return a}}var Ne="application/json",yt="storefront-api-client",gt="1.0.10",bt="X-Shopify-Storefront-Access-Token",wt="Shopify-Storefront-Private-Token",vt="X-SDK-Variant",Et="X-SDK-Version",_t="X-SDK-Variant-Source",F="Storefront API Client";function St(e){if(e&&typeof window!="undefined")throw new Error(`${F}: private access tokens and headers should only be used in a server-to-server implementation. Use the public API access token in nonserver environments.`)}function Ct(e,t){if(!e&&!t)throw new Error(`${F}: a public or private access token must be provided`);if(e&&t)throw new Error(`${F}: only provide either a public or private access token`)}function De({storeDomain:e,apiVersion:t,publicAccessToken:r,privateAccessToken:n,clientName:a,retries:o=0,customFetchApi:s,logger:i}){let c=Te(),u=Re({client:F,storeDomain:e}),d={client:F,currentSupportedApiVersions:c,logger:i};ae({...d,apiVersion:t}),Ct(r,n),St(n);let f=fr(u,t,d),m={storeDomain:u,apiVersion:t,...r?{publicAccessToken:r}:{privateAccessToken:n},headers:{"Content-Type":Ne,Accept:Ne,[vt]:yt,[Et]:gt,...a?{[_t]:a}:{},...r?{[bt]:r}:{[wt]:n}},apiUrl:f(),clientName:a},y=$e({headers:m.headers,url:m.apiUrl,retries:o,customFetchApi:s,logger:i}),S=Oe(m),$=pr(m,f),V=xe({getHeaders:S,getApiUrl:$});return Object.freeze({config:m,getHeaders:S,getApiUrl:$,fetch:(...H)=>y.fetch(...V(...H)),request:(...H)=>y.request(...V(...H)),requestStream:(...H)=>y.requestStream(...V(...H))})}function fr(e,t,r){return n=>{n&&ae({...r,apiVersion:n});let a=(n!=null?n:t).trim();return`${e}/api/${a}/graphql.json`}}function pr(e,t){return r=>r?t(r):e.apiUrl}var se={SHOPIFY_STORE_DOMAIN:"shop.infinitemachine.com",SHOPIFY_STOREFRONT_PUBLIC_TOKEN:"eefb42e32220791a7472aaa5d2cf2182",SHOPIFY_API_VERSION:"2026-04"};var q=De({storeDomain:se.SHOPIFY_STORE_DOMAIN,apiVersion:se.SHOPIFY_API_VERSION,publicAccessToken:se.SHOPIFY_STOREFRONT_PUBLIC_TOKEN});var Pe=new Map;async function It(e){var s;let t=(s=e.bundles)==null?void 0:s.metaobjectType;if(!t)return[];if(Pe.has(t))return Pe.get(t);let r=`
    query GetBundles($type: String!) {
      metaobjects(type: $type, first: 50) {
        edges {
          node {
            id
            handle
            type
            fields {
              key
              value
              type
              reference {
                ... on Product { id handle title featuredImage { url } }
              }
              references(first: 50) {
                edges {
                  node {
                    ... on Product { id handle title featuredImage { url } }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,{data:n,errors:a}=await q.request(r,{variables:{type:t}});if(a)return console.warn(`[Bundles] GraphQL errors fetching "${t}":`,a),[];let o=n.metaobjects.edges.map(({node:i})=>mr(i));return Pe.set(t,o),o}function mr(e){var r,n;let t={id:e.id,handle:e.handle};for(let a of e.fields)(n=(r=a.references)==null?void 0:r.edges)!=null&&n.length?t[a.key]=a.references.edges.map(o=>o.node):a.reference?t[a.key]=a.reference:a.value!=null&&(t[a.key]=a.value);return t}var Rt="olto_cart_",hr="cfg_",He="config",L=null,l=null,j=null,ke=null,C=null,ie=[],yr=[];function k(e){j=e,l=e}var Z=null;function Lt(e){Z=e}async function Tt(e){var r;ke=e.id,C=At()||Pt();let t=Er();if(t)try{let n=await br(t);n&&(L=t,k(n))}catch(n){console.warn("[Cart] Failed to restore cart, will create new:",n)}if(!L){let n=await gr();k(n),L=n.id,_r(L)}if(!At()&&((r=l==null?void 0:l.lines)!=null&&r.length)){let n=wr(l);n&&(C=n)}return Ht(C),I(),Vt(),l}function Ot(){return l==null?void 0:l.checkoutUrl}function ce(){return C}function Me(){return C=Pt(),Ht(C),Vt(),C}async function xt(e){X();let t=j,r=((t==null?void 0:t.lines)||[]).filter(n=>{var a;return((a=n.attributesByKey)==null?void 0:a._config_id)===e}).map(n=>n.id);r.length!==0&&(await Ue(r),e===C&&Me())}async function Be(e){X();let t=l,r=qe(C),n=e.map(o=>qt(o.variantId,o.quantity||r,{...o.attributes||{},_config_id:C})).filter(Boolean);n.length&&(l=kt(l,n),I());let a=e.map(o=>({merchandiseId:o.variantId,quantity:o.quantity||r,attributes:W({...o.attributes||{},_config_id:C})}));try{return k(await le(()=>K("cartLinesAdd",`
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ${M} }
          userErrors { field message }
        }
      }
    `,{cartId:L,lines:a}))),I(),l}catch(o){throw l=t,I(),o}}async function Ue(e){X();let t=l,r=new Set(e);l&&(l={...l,lines:l.lines.filter(n=>!r.has(n.id))},I());try{return k(await le(()=>K("cartLinesRemove",`
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ${M} }
          userErrors { field message }
        }
      }
    `,{cartId:L,lineIds:e}))),I(),l}catch(n){throw l=t,I(),n}}async function Nt({lineId:e,variantId:t,quantity:r,attributes:n}){X();let a=l;l&&(l={...l,lines:l.lines.map(s=>{if(s.id!==e)return s;let i={...s};if(t!==void 0){let c=je(t)||s.merchandise;i.merchandise=c}if(r!==void 0&&(i.quantity=r),n!==void 0){let c=W(n);i.attributes=c,i.attributesByKey=Object.fromEntries(c.map(u=>[u.key,u.value]))}return i})},I());let o={id:e};t!==void 0&&(o.merchandiseId=t),r!==void 0&&(o.quantity=r),n!==void 0&&(o.attributes=W(n));try{return k(await le(()=>K("cartLinesUpdate",`
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ${M} }
          userErrors { field message }
        }
      }
    `,{cartId:L,lines:[o]}))),I(),l}catch(s){throw l=a,I(),s}}function Dt(e){return ie.push(e),l&&e(l),()=>{ie=ie.filter(t=>t!==e)}}var M=`
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
`;async function gr(){var n;let{data:e,errors:t}=await q.request(`
    mutation CartCreate {
      cartCreate(input: {}) {
        cart { ${M} }
        userErrors { field message }
      }
    }
  `);if(t)throw new Error(`[Cart] createCart errors: ${JSON.stringify(t)}`);let r=(n=e==null?void 0:e.cartCreate)==null?void 0:n.userErrors;if(r!=null&&r.length)throw new Error(`[Cart] createCart userErrors: ${JSON.stringify(r)}`);return Fe(e.cartCreate.cart)}async function br(e){let{data:t,errors:r}=await q.request(`
    query GetCart($id: ID!) {
      cart(id: $id) { ${M} }
    }
  `,{variables:{id:e}});if(r)throw new Error(`[Cart] queryCart errors: ${JSON.stringify(r)}`);return t!=null&&t.cart?Fe(t.cart):null}async function K(e,t,r){var s;let{data:n,errors:a}=await q.request(t,{variables:r});if(a)throw new Error(`[Cart] ${e} errors: ${JSON.stringify(a)}`);let o=n==null?void 0:n[e];if((s=o==null?void 0:o.userErrors)!=null&&s.length)throw new Error(`[Cart] ${e} userErrors: ${JSON.stringify(o.userErrors)}`);return Fe(o.cart)}function Fe(e){let t=e.attributes||[];return{id:e.id,checkoutUrl:e.checkoutUrl,totalQuantity:e.totalQuantity,cost:e.cost,attributes:t,attributesByKey:Object.fromEntries(t.map(r=>[r.key,r.value])),lines:e.lines.edges.map(({node:r})=>({id:r.id,quantity:r.quantity,attributes:r.attributes,attributesByKey:Object.fromEntries(r.attributes.map(n=>[n.key,n.value])),merchandise:r.merchandise}))}}function W(e){return Object.entries(e).filter(([,t])=>t!=null&&t!=="").map(([t,r])=>({key:t,value:String(r)}))}function X(){if(!L)throw new Error("[Cart] Called before initCart(config)")}function I(){for(let e of ie)e(l)}function Pt(){return`${hr}${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function qe(e){var n;let t=j||l;if(!((n=t==null?void 0:t.lines)!=null&&n.length))return 1;let r=t.lines.find(a=>{var o;return((o=a.attributesByKey)==null?void 0:o._config_id)===e});return(r==null?void 0:r.quantity)||1}function Vt(){for(let e of yr)e(C)}function At(){return typeof window=="undefined"?null:new URLSearchParams(window.location.search).get(He)}function Ht(e){if(typeof window=="undefined")return;let t=new URLSearchParams(window.location.search);e?t.set(He,e):t.delete(He),window.history.replaceState({},"",`${window.location.pathname}?${t.toString()}`)}function wr(e){var r;if(!((r=e==null?void 0:e.lines)!=null&&r.length))return null;let t=e.lines.map(n=>{var a;return(a=n.attributesByKey)==null?void 0:a._config_id}).filter(Boolean).sort();return t[t.length-1]||null}var $t=Promise.resolve();async function le(e){let t=$t,r;$t=new Promise(n=>{r=n}),await t;try{return await e()}finally{r()}}var Ve=new Map;function vr(e,t){let r=Ve.get(e)||{inflight:null,latest:null};return r.latest=t,Ve.set(e,r),r.inflight||(r.inflight=(async()=>{for(;r.latest;){let n=r.latest;r.latest=null;try{await le(n)}catch(a){console.error(`[Cart] coalesce(${e}) error:`,a)}}r.inflight=null,Ve.delete(e)})()),r.inflight}async function x(e,t){X();let r=C;if(l){let n=l.lines.findIndex(a=>{var o;return a.merchandise.product.handle===e&&((o=a.attributesByKey)==null?void 0:o._config_id)===r});if(n>=0&&t===null)l={...l,lines:l.lines.filter((a,o)=>o!==n)};else if(n>=0&&t){let a=je(t);a&&(l={...l,lines:l.lines.map((o,s)=>s===n?{...o,merchandise:a}:o)})}else if(n<0&&t){let a=qe(r),o=qt(t,a,{_config_id:r});o&&(l=kt(l,[o]))}I()}return vr(`product:${e}:${r}`,async()=>{let n=j==null?void 0:j.lines.find(a=>{var o;return a.merchandise.product.handle===e&&((o=a.attributesByKey)==null?void 0:o._config_id)===r});if(t===null){n&&(k(await K("cartLinesRemove",`
          mutation($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart { ${M} } userErrors { field message }
            }
          }
        `,{cartId:L,lineIds:[n.id]})),I());return}if(n)k(await K("cartLinesUpdate",`
        mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart { ${M} } userErrors { field message }
          }
        }
      `,{cartId:L,lines:[{id:n.id,merchandiseId:t}]}));else{let a=qe(r);k(await K("cartLinesAdd",`
        mutation($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart { ${M} } userErrors { field message }
          }
        }
      `,{cartId:L,lines:[{merchandiseId:t,quantity:a,attributes:W({_config_id:r})}]}))}I()})}function je(e){if(!Z)return null;let t=[Z.main,Z.wrap,...Z.accessories||[]].filter(Boolean);for(let r of t){let n=r.variants.find(a=>a.id===e);if(n)return{id:n.id,title:n.title,price:n.price,image:n.image,selectedOptions:n.selectedOptions,product:{id:r.id,handle:r.handle,title:r.title}}}return null}function qt(e,t,r){let n=je(e);if(!n)return null;let a=W(r);return{id:`tmp_${Math.random().toString(36).slice(2,10)}`,quantity:t,attributes:a,attributesByKey:Object.fromEntries(a.map(o=>[o.key,o.value])),merchandise:n}}function kt(e,t){return e&&{...e,lines:[...e.lines,...t],totalQuantity:(e.totalQuantity||0)+t.reduce((r,n)=>r+(n.quantity||1),0)}}function Er(){return typeof localStorage=="undefined"?null:localStorage.getItem(`${Rt}${ke}`)}function _r(e){typeof localStorage!="undefined"&&localStorage.setItem(`${Rt}${ke}`,e)}var Ke=new Map,Ge=`
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
`;async function Mt(e){var i;if(Ke.has(e.id))return Ke.get(e.id);let t=!!((i=e.wrap)!=null&&i.productHandle),r=`
    query LoadConfigurator(
      $productHandle: String!
      $accessoriesHandle: String!
      ${t?"$wrapHandle: String!":""}
    ) {
      main: product(handle: $productHandle) { ${Ge} }
      accessoriesCollection: collection(handle: $accessoriesHandle) {
        title
        handle
        products(first: 50) {
          edges { node { ${Ge} } }
        }
      }
      ${t?`wrap: product(handle: $wrapHandle) { ${Ge} }`:""}
    }
  `,n={productHandle:e.product.handle,accessoriesHandle:e.accessoriesCollection};t&&(n.wrapHandle=e.wrap.productHandle);let{data:a,errors:o}=await q.request(r,{variables:n});if(o)throw new Error(`[Products] GraphQL errors: ${JSON.stringify(o)}`);if(!a.main)throw new Error(`[Products] Product not found: ${e.product.handle}`);if(!a.accessoriesCollection)throw new Error(`[Products] Collection not found: ${e.accessoriesCollection}`);let s={main:Qe(a.main),wrap:a.wrap?Qe(a.wrap):null,accessories:a.accessoriesCollection.products.edges.map(c=>Qe(c.node))};return Ke.set(e.id,s),s}function Qe(e){var t,r,n;return{id:e.id,handle:e.handle,title:e.title,description:e.description,availableForSale:e.availableForSale,productType:e.productType,vendor:e.vendor,tags:e.tags||[],featuredImage:e.featuredImage,accessoryEta:((t=e.accessoryEta)==null?void 0:t.value)||null,instructionVideo:((r=e.instructionVideo)==null?void 0:r.value)||null,collections:(((n=e.collections)==null?void 0:n.edges)||[]).map(a=>a.node),variants:e.variants.edges.map(({node:a})=>({id:a.id,title:a.title,availableForSale:a.availableForSale,quantityAvailable:a.quantityAvailable,price:a.price,compareAtPrice:a.compareAtPrice,selectedOptions:a.selectedOptions,image:a.image}))}}var Ye=null,Ze=null,Bt=[],de=[],b={ready:!1,region:"",baseNumericId:null,bikeLine:null,wrapLine:null,accessoryLines:[],activeBundle:null,quantity:1,total:0,currency:"USD",payMode:"cash",cart:null};function We(e){return String(e).split("/").pop()}function J(e){return`gid://shopify/ProductVariant/${e}`}function Ut(e){Ye=e.config,Ze=e.products,Bt=e.bundles||[],b.baseNumericId=Ye.defaultVariantId,Dt(Sr)}function D(){return b}function Ft(e){return de.push(e),()=>{de=de.filter(t=>t!==e)}}function Xe(e){b.region=e,Je()}function ue(e){b.payMode=e,Je()}function Je(){for(let e of de)e(b)}function Sr(e){var c,u;let t=ce(),r=((e==null?void 0:e.lines)||[]).filter(d=>{var f;return((f=d.attributesByKey)==null?void 0:f._config_id)===t}),n=Ze.main.handle,a=(c=Ye.wrap)==null?void 0:c.productHandle,o=new Set(Ze.accessories.map(d=>d.handle));b.cart=e,b.bikeLine=r.find(d=>d.merchandise.product.handle===n)||null,b.wrapLine=r.find(d=>d.merchandise.product.handle===a)||null,b.accessoryLines=r.filter(d=>o.has(d.merchandise.product.handle)),b.bikeLine&&(b.baseNumericId=We(b.bikeLine.merchandise.id)),b.quantity=((u=r[0])==null?void 0:u.quantity)||1;let s=0;for(let d of r)s+=parseFloat(d.merchandise.price.amount)*(d.quantity||1),d.merchandise.price.currencyCode&&(b.currency=d.merchandise.price.currencyCode);b.total=s;let i=new Set(b.accessoryLines.map(d=>d.merchandise.product.handle));b.activeBundle=null;for(let d of Bt){let f=(d.products||[]).map(m=>m.handle);if(f.length&&f.length===i.size&&f.every(m=>i.has(m))){b.activeBundle=d.handle;break}}b.ready=!0,Je()}var Cr='<svg viewBox="0 0 922 201" fill="none" xmlns="http://www.w3.org/2000/svg" class="olto-wordmark" role="img" aria-label="Olto"> <path d="M246.995 19.4652C255.252 28.6186 259.698 41.3214 261.454 61.0855C262.35 70.239 262.649 80.8495 262.649 102.706C262.649 151.985 257.942 170.89 242.885 184.153C231.976 193.605 217.218 198.313 192.41 199.807C182.958 200.405 147.241 201.003 119.817 201.003C59.5913 201.003 43.3765 199.247 26.564 190.093C13.5623 182.995 5.00663 169.433 2.35399 149.968C0.598013 136.966 0.000235075 126.355 0.000235075 94.1874C-0.0371261 48.1211 4.37149 29.8142 18.5687 17.4103C29.1793 7.95792 43.0403 3.54931 68.4458 1.45708C78.496 0.560417 108.011 0 143.99 0C213.631 0 232.237 3.54931 246.995 19.4652ZM46.2907 100.651C46.2907 139.021 49.2422 151.425 60.1517 157.029C71.0611 162.932 80.5135 163.829 136.891 163.829C187.665 163.829 200.331 161.774 208.326 152.919C215.126 145.559 217.181 132.856 217.181 99.4927C217.181 37.8095 216.583 37.2117 131.586 37.2117C46.5896 37.2117 46.2907 38.1084 46.2907 100.651Z" fill="#E90022"/> <path d="M286.86 2.05334H332.328V162.034H476.057V198.909H286.86V2.05334Z" fill="#E90022"/> <path d="M507.328 38.9662H414.673V2.05334H645.154V38.9288H552.759V198.909H507.291V38.9662H507.328Z" fill="#E90022"/> <path d="M906.345 19.4644C914.602 28.6179 919.048 41.3207 920.804 61.0847C921.701 70.2382 922 80.8488 922 102.705C922 151.984 917.292 170.889 902.236 184.152C891.326 193.605 876.569 198.312 851.761 199.807C842.308 200.404 806.591 201.002 779.168 201.002C718.979 201.002 702.727 199.246 685.915 190.093C672.913 182.994 664.357 169.432 661.705 149.967C659.949 136.965 659.351 126.355 659.351 94.1867C659.351 48.1578 663.797 29.8508 677.957 17.4469C688.567 7.99454 702.466 3.58593 727.834 1.49371C737.884 0.597038 767.399 0.0366211 803.378 0.0366211C873.019 0.0366211 891.625 3.58593 906.383 19.5018L906.345 19.4644ZM705.679 100.65C705.679 139.02 708.63 151.424 719.54 157.028C730.449 162.931 739.901 163.828 796.279 163.828C847.053 163.828 859.719 161.773 867.714 152.918C874.514 145.558 876.569 132.855 876.569 99.492C876.569 37.8087 875.971 37.211 790.974 37.211C705.978 37.211 705.679 38.1076 705.679 100.65Z" fill="#E90022"/> </svg>',Ir='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 831.97 45.21" class="im-wordmark" fill="currentColor" role="img" aria-label="Infinite Machine"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M13.56.33V44.88H0V.33Z"/><path d="M44.93.33l27,33.86L71.58.33H84.4V44.88H62.63L36,11.35l.34,33.53h-13V.33Z"/><path d="M141.66.33V10.42H107.87V19.3h32.06V29.39H107.87V44.88H94.38V.33Z"/><path d="M163.09.33V44.88H149.54V.33Z"/><path d="M194.46.33l27,33.86L221.11.33h12.82V44.88H212.16L185.58,11.35l.33,33.53h-13V.33Z"/><path d="M257.44.33V44.88H243.89V.33Z"/><path d="M264.52,11.35V.33h53.23v11H297.91V44.88H284.35V11.35Z"/><path d="M374.26,10.42h-36V18.1h33.93v8.81H338.26V34.8h36.47V44.88H324.91V.33h49.35Z"/><path d="M423,.33l16.23,29.59L455.34.33h21.37V44.88H463.49l.67-34.39L444.39,44.88H433.57L414.13,10.49l.4,34.39H401.44V.33Z"/><path d="M526.62.33,551,44.88H536.17l-4.4-8H503.05l-4.28,8H483.41l25-44.55Zm-9.21,9.55-9.49,17.77H527Z"/><path d="M611.09,32.22c0,1.14-.11,2.11-.2,2.91a13.74,13.74,0,0,1-.36,2.07,11.1,11.1,0,0,1-.57,1.6,8.86,8.86,0,0,1-4.21,4.31,21.46,21.46,0,0,1-8.08,1.77q-2.07.19-6.18.27t-10.78.06c-3.21,0-5.91,0-8.12-.13a53.92,53.92,0,0,1-5.61-.47,20.34,20.34,0,0,1-3.9-.9,14.32,14.32,0,0,1-2.94-1.43,10.08,10.08,0,0,1-2.77-2.58,11.37,11.37,0,0,1-1.74-3.87,32.31,32.31,0,0,1-.9-5.84c-.18-2.32-.27-5.12-.27-8.42q0-4.41.27-7.48a23.36,23.36,0,0,1,1-5.24,10,10,0,0,1,1.87-3.54,10.88,10.88,0,0,1,2.9-2.37,16.6,16.6,0,0,1,3.17-1.44,23.22,23.22,0,0,1,4-.9Q570,.27,573.29.13c2.19-.09,4.83-.13,8-.13q6.21,0,10.22.07c2.67,0,4.88.15,6.61.33a27.49,27.49,0,0,1,4.21.7,18,18,0,0,1,3,1.1,8.12,8.12,0,0,1,4,4.35,20.63,20.63,0,0,1,1.27,7.94V16h-13a11.59,11.59,0,0,0-.5-2.87,2.69,2.69,0,0,0-1.7-1.6,12.6,12.6,0,0,0-3.87-.67c-1.7-.09-4-.13-6.95-.13q-4.14,0-6.74.06c-1.74.05-3.13.14-4.18.27a10.12,10.12,0,0,0-2.4.53,5.12,5.12,0,0,0-1.44.87,4.48,4.48,0,0,0-1,1.24,7.48,7.48,0,0,0-.6,1.87,20.61,20.61,0,0,0-.3,2.94c0,1.18-.07,2.66-.07,4.44a42.86,42.86,0,0,0,.37,6.31A5.34,5.34,0,0,0,570,32.66a8,8,0,0,0,4.21,1.43,75.75,75.75,0,0,0,7.68.31c2.54,0,4.57,0,6.11,0s2.77,0,3.71-.1a12.82,12.82,0,0,0,2.13-.23,7.73,7.73,0,0,0,1.47-.5,3.77,3.77,0,0,0,2.07-1.81,8.36,8.36,0,0,0,.6-3.6h13.16C611.16,29.72,611.14,31.09,611.09,32.22Z"/><path d="M633.44.33v16.5H664.3V.33h13.56V44.88H664.3v-17H633.44v17H619.88V.33Z"/><path d="M701.33.33V44.88H687.77V.33Z"/><path d="M732.7.33l27,33.86L759.35.33h12.82V44.88H750.4L723.82,11.35l.33,33.53h-13V.33Z"/><path d="M831.51,10.42h-36V18.1h33.93v8.81H795.51V34.8H832V44.88H782.15V.33h49.36Z"/></g></g></svg>',v="https://cdn.prod.website-files.com/66ea2a84659b76f5d91d481b",ze={"accessory-plate":`${v}/68d53a735e9c987a9499211a_accessory-plate.avif`,"charger-bag":`${v}/68d53a2cb165eb23a2527775_charger-bag.avif`,"olto-center-stand":`${v}/68d53974c880c4b20d23dec9_olto-center-stand.avif`,"olto-charging-dock":`${v}/68d5396153ba7acdd9978c0d_olto-charging-dock.avif`,"olto-kid-carrier":`${v}/6921a92ec4d3dc4a766d69bb_Kid%20Carrier.avif`,"olto-rear-basket":`${v}/68d53b6769ccc4ad6ad7d0b3_olto-rear-basket.avif`,"olto-rear-rack":`${v}/68d53b2e1153a3e349d34c1a_olto-rear-rack.avif`,"olto-side-mounting-plate":`${v}/68d53bea87ff421cf85c858e_olto-side-mounting-plate.avif`,"olto-sidewalls":`${v}/68d53c3ccb4cfb15c59ac6cd_olto-sidewalls.avif`,"olto-super-charger":`${v}/6921a99cb5dd5b924cf4965d_Super%20Charger%20on%20the%20Ground.avif`,"olto-u-lock-mount":`${v}/68d53cf8bb965a6129e84ff4_olto-u-lock-mount.avif`,"olto-water-bottle-holder":`${v}/68d53d46367f73dfd1b58a42_olto-water-bottle-holder.avif`,"open-face-helmet":`${v}/6921a8f20583ec71e2663dce_Black%20Open%20Face%20Helmet.avif`,"kryptonite-lock":`${v}/68d53fc0d2d8d2d151493b5f_kryptonite-lock.avif`,"olto-soft-bag":`${v}/692197c1914921de9b30217a_Soft%20Bag%20on%20the%20Ground.avif`},jt={finance:{months:48,apr:.1599},lease:{months:24,residualPct:.35}};function Kt(e,t,r){if(r==="finance"){let{months:n,apr:a}=jt.finance,o=a/12,s=o>0?e*o/(1-(1+o)**-n):e/n;return{amount:s,suffix:"/mo",label:"Est. finance payment",sub:`${n} monthly payments of ${T(s,t)} at ${(a*100).toFixed(2)}% APR. Estimate for illustration \u2014 payment options appear at checkout.`}}if(r==="lease"){let{months:n,residualPct:a}=jt.lease;return{amount:e*(1-a)/n,suffix:"/mo",label:"Est. lease payment",sub:`${n}-month term, ${Math.round(a*100)}% residual. Estimate for illustration.`}}return{amount:e,suffix:"",label:"Est. purchase price",sub:"Taxes and shipping calculated at checkout."}}var Ar=[{value:"40 mi",label:"Range (est.)"},{value:"20 mph",label:"Top Speed"},{value:"Class 2",label:"E-bike"}];function T(e,t="USD"){let r=Number(e)||0,n=r%1===0?0:2;return t==="USD"?`$${r.toLocaleString("en-US",{minimumFractionDigits:n,maximumFractionDigits:n})}`:`${t} ${r.toFixed(2)}`}function h(e){return String(e!=null?e:"").replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`)}function G(e,t){return e?`${e}${e.includes("?")?"&":"?"}width=${t}`:""}function Gt({config:e,products:t,bundles:r,wrapVariantsByColor:n}){let a=Object.entries(e.variants),[o]=a.find(([s])=>s===e.defaultVariantId)||a[0];return`
    <header class="topbar">
      <div class="topbar_mark">${Ir}</div>
    </header>

    <section class="hero" aria-label="Olto">
      <img class="hero_img is-active" data-hero-img="a" src="${h(e.variants[o].backgroundImage)}" alt="Olto" />
      <img class="hero_img" data-hero-img="b" alt="" aria-hidden="true" />
      <div class="hero_layers" data-layers>
        ${Object.entries(ze).map(([s,i])=>`<img class="hero_layer" data-layer="${h(s)}" src="${h(i)}" alt="" aria-hidden="true" />`).join("")}
      </div>
    </section>

    <main class="sheet">
      <div class="sheet_handle" aria-hidden="true"></div>

      <section class="intro">
        <h1 class="intro_title">${Cr}</h1>
        <p class="intro_delivery" data-delivery></p>
        <div class="stats">
          ${Ar.map(s=>`
            <div class="stats_item">
              <div class="stats_value">${h(s.value)}</div>
              <div class="stats_label">${h(s.label)}</div>
            </div>`).join("")}
        </div>
      </section>

      <section class="opt" data-section="paint">
        <h2 class="opt_title">Base Material</h2>
        <div class="swatches">
          ${a.map(([s,i])=>`
            <button
              type="button"
              class="swatch"
              data-base-swatch="${h(s)}"
              style="--swatch: ${h(i.colorHex)}"
              aria-label="${h(i.color)}"
            ></button>`).join("")}
        </div>
        <div class="opt_meta">
          <span class="opt_name" data-base-name></span>
          <span class="opt_price">Included</span>
        </div>
      </section>

      <section class="opt" data-section="wrap">
        <h2 class="opt_title">Wrap</h2>
        <p class="opt_sub">Factory-applied color wrap</p>
        <div class="swatches">
          <button type="button" class="swatch swatch--none" data-wrap-swatch="" aria-label="No wrap"></button>
          ${Object.entries(e.wrapColorMap).filter(([s])=>n.has(s)).map(([s,i])=>`
            <button
              type="button"
              class="swatch"
              data-wrap-swatch="${h(s)}"
              style="--swatch: ${h(i)}"
              aria-label="${h(s)} wrap"
            ></button>`).join("")}
        </div>
        <div class="opt_meta">
          <span class="opt_name" data-wrap-name></span>
          <span class="opt_price" data-wrap-price></span>
        </div>
      </section>

      ${$r(r,t)}

      <section class="opt" data-section="accessories">
        <h2 class="opt_title">Accessories</h2>
        <div class="acc-list">
          ${t.accessories.map(s=>Lr(s)).join("")}
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
  `}function $r(e,t){return e!=null&&e.length?`
    <section class="opt" data-section="bundles">
      <h2 class="opt_title">Accessory Pack</h2>
      <p class="opt_sub">Curated sets \u2014 tap again to remove</p>
      <div class="bundle-list">
        ${e.map(r=>Rr(r,t)).join("")}
      </div>
    </section>
  `:""}function Rr(e,t){let r=e.products||[],n=r.reduce((o,s)=>{let i=t.accessories.find(u=>u.handle===s.handle),c=Q(i);return o+(c?parseFloat(c.price.amount):0)},0),a=r.slice(0,4).map(o=>{var s;return`<img class="bundle_thumb" src="${h(G((s=o.featuredImage)==null?void 0:s.url,96))}" alt="" loading="lazy" />`}).join("");return`
    <button type="button" class="bundle" data-bundle="${h(e.handle)}">
      <div class="bundle_thumbs">${a}</div>
      <div class="bundle_info">
        <div class="bundle_name">${h(e.label||e.handle)}</div>
        <div class="bundle_count">${r.length} items</div>
      </div>
      <div class="bundle_price">${T(n)}</div>
    </button>
  `}function Lr(e){var r;let t=Q(e);return t?`
    <div class="acc" data-acc="${h(e.handle)}">
      <img class="acc_img" src="${h(G((r=e.featuredImage)==null?void 0:r.url,240))}" alt="${h(e.title)}" loading="lazy" />
      <div class="acc_info">
        <div class="acc_name">${h(e.title)}</div>
        <div class="acc_price">${T(parseFloat(t.price.amount),t.price.currencyCode)}</div>
      </div>
      <button type="button" class="acc_btn" data-acc-toggle="${h(e.handle)}">Add</button>
    </div>
  `:""}function Q(e){return e&&(e.variants.find(t=>t.availableForSale)||e.variants[0])||null}function Qt(e,t){var a;let r=[];if(e.bikeLine){let o=((a=t.variants[e.baseNumericId])==null?void 0:a.color)||e.bikeLine.merchandise.title;r.push({label:`Olto &middot; ${h(o)}`,amount:parseFloat(e.bikeLine.merchandise.price.amount)})}e.wrapLine&&r.push({label:`Wrap &middot; ${h(e.wrapLine.merchandise.title)}`,amount:parseFloat(e.wrapLine.merchandise.price.amount)});for(let o of e.accessoryLines)r.push({label:h(o.merchandise.product.title),amount:parseFloat(o.merchandise.price.amount)});let n=e.quantity>1?`<div class="summary_qty">&times;${e.quantity} configurations</div>`:"";return r.map(o=>`
      <div class="summary_row">
        <span>${o.label}</span>
        <span>${T(o.amount,e.currency)}</span>
      </div>`).join("")+n}var N=window.gsap||null;N&&window.ScrollTrigger&&N.registerPlugin(window.ScrollTrigger);var g=document.querySelector("#app"),A=null,pe=[],Y=new Map,z="a",fe=null,Tr=new Set(["Sand"]),et=0,tt=null;Or();async function Or(){var t,r;try{[A,pe]=await Promise.all([Mt(_),It(_)])}catch(n){console.error("[Tesla] Failed to load products:",n),Nr();return}Y=xr(A.wrap),Lt(A),await Tt(_),Ut({config:_,products:A,bundles:pe}),g.innerHTML=Gt({config:_,products:A,bundles:pe,wrapVariantsByColor:Y}),Dr(),Ft(Xt),Xt(D());let e=kr();e?Mr(e):D().bikeLine||x(A.main.handle,J(_.defaultVariantId)),jr(),Gr();for(let n of Y.values())(t=n.image)!=null&&t.url&&(new Image().src=n.image.url);for(let n of A.main.variants)(r=n.image)!=null&&r.url&&(new Image().src=G(n.image.url,1600))}function xr(e){var r;let t=new Map;if(!e)return t;for(let n of e.variants){let a=(r=n.selectedOptions)==null?void 0:r.find(s=>/colou?rs?/i.test(s.name)),o=(a==null?void 0:a.value)||n.title;o&&t.set(o,n)}return t}function Nr(){g.innerHTML=`
    <div class="boot">
      <div class="boot_mark">INFINITE MACHINE</div>
      <div class="boot_label">Couldn&rsquo;t reach the store. Check your connection.</div>
      <button type="button" class="boot_retry" onclick="location.reload()">Retry</button>
    </div>
  `}function Dr(){g.addEventListener("click",e=>{let t=e.target.closest("[data-base-swatch]");if(t)return Pr(t.dataset.baseSwatch);let r=e.target.closest("[data-wrap-swatch]");if(r)return Vr(r.dataset.wrapSwatch);let n=e.target.closest("[data-acc-toggle]");if(n)return Hr(n.dataset.accToggle);let a=e.target.closest("[data-bundle]");if(a)return qr(a.dataset.bundle);let o=e.target.closest("[data-pay-mode]");if(o)return ue(o.dataset.payMode);if(e.target.closest("[data-qty-dec]"))return Zt(-1);if(e.target.closest("[data-qty-inc]"))return Zt(1);if(e.target.closest("[data-save]"))return Br();if(e.target.closest("[data-config-reset]"))return Ur();if(e.target.closest("[data-cta]"))return Fr();if(e.target.closest("[data-interest-close]"))return zt(!1)})}function Pr(e){x(A.main.handle,J(e))}function Vr(e){let t=_.wrap.productHandle,r=D().wrapLine;if(!e)return x(t,null);let n=Y.get(e);if(n){if((r==null?void 0:r.merchandise.id)===n.id)return x(t,null);x(t,n.id)}}function Hr(e){var a,o;let t=D(),r=t.accessoryLines.some(s=>s.merchandise.product.handle===e),n=_.accessoryDependencies||{};if(r){x(e,null);let s=((a=n[e])==null?void 0:a.requiredBy)||[];for(let i of s)t.accessoryLines.some(c=>c.merchandise.product.handle===i)&&x(i,null);return}Yt(e);for(let[s,i]of Object.entries(n))(o=i.requiredBy)!=null&&o.includes(e)&&(t.accessoryLines.some(u=>u.merchandise.product.handle===s)||Yt(s))}function Yt(e){let t=A.accessories.find(n=>n.handle===e),r=Q(t);r&&x(e,r.id)}var rt=!1;async function qr(e){var t;if(!rt){rt=!0;try{let r=D(),n=r.activeBundle===e,a=r.accessoryLines.map(i=>i.id).filter(i=>!String(i).startsWith("tmp_"));if(a.length&&await Ue(a),n)return;let o=pe.find(i=>i.handle===e);if(!((t=o==null?void 0:o.products)!=null&&t.length))return;let s=o.products.map(i=>{let c=Q(A.accessories.find(u=>u.handle===i.handle));return c?{variantId:c.id,attributes:{_bundle:e}}:null}).filter(Boolean);s.length&&await Be(s)}catch(r){console.error("[Tesla] Bundle select failed:",r)}finally{rt=!1}}}function Zt(e){let t=D(),r=[t.bikeLine,t.wrapLine,...t.accessoryLines].filter(Boolean),n=Math.min(99,Math.max(1,t.quantity+e));if(n===t.quantity)return;let a=r.filter(o=>!String(o.id).startsWith("tmp_"));Promise.all(a.map(o=>Nt({lineId:o.id,quantity:n})))}function kr(){let e=new URLSearchParams(window.location.search).get("d");if(!e)return null;let[t,r,n,a,o]=e.split(".");return!t||!_.variants[t]?null:{base:t,wrap:r||null,qty:Math.min(99,Math.max(1,parseInt(n,10)||1)),pay:["cash","lease","finance"].includes(a)?a:"cash",accs:(o||"").split("~").filter(Boolean)}}async function Mr(e){Me();let t=[{variantId:J(e.base),quantity:e.qty}],r=e.wrap?Y.get(e.wrap):null;r&&t.push({variantId:r.id,quantity:e.qty});for(let a of e.accs){let o=Q(A.accessories.find(s=>s.handle===a));o&&t.push({variantId:o.id,quantity:e.qty})}ue(e.pay);try{await Be(t)}catch(a){console.error("[Tesla] Failed to apply shared design:",a)}let n=new URLSearchParams(window.location.search);n.delete("d"),window.history.replaceState({},"",`${window.location.pathname}?${n.toString()}`)}var Wt=null;async function Br(){let e=D(),t=e.wrapLine?er(e.wrapLine.merchandise)||e.wrapLine.merchandise.title:"",r=e.accessoryLines.map(s=>s.merchandise.product.handle).join("~"),n=[e.baseNumericId,t,e.quantity,e.payMode,r].join("."),a=new URL(window.location.href);a.searchParams.set("d",n);let o=g.querySelector("[data-save]");try{await navigator.clipboard.writeText(a.toString()),o&&(o.textContent="Link copied")}catch{window.history.replaceState({},"",a.toString()),o&&(o.textContent="Link in URL")}clearTimeout(Wt),Wt=setTimeout(()=>{o&&(o.textContent="Save")},2200)}var ee=null;async function Ur(){let e=g.querySelector("[data-config-reset]");if(!ee){e&&(e.textContent="Tap again to clear",e.classList.add("is-armed")),ee=setTimeout(()=>{ee=null,e&&(e.textContent="Clear configuration",e.classList.remove("is-armed"))},3e3);return}clearTimeout(ee),ee=null,e&&(e.textContent="Clear configuration",e.classList.remove("is-armed"));try{await xt(ce())}catch(t){console.error("[Tesla] Clear failed:",t)}ue("cash"),x(A.main.handle,J(_.defaultVariantId))}function Fr(){let e=D();if(!e.ready)return;if(e.region==="row")return zt(!0);let t=Ot();t&&(window.location.href=t)}function zt(e){let t=g.querySelector("[data-interest]");t&&(t.hidden=!e)}async function jr(){let e=new AbortController,t=setTimeout(()=>e.abort(),8e3);try{let n=(await(await fetch("https://get.geojs.io/v1/ip/country",{signal:e.signal})).text()).trim().toUpperCase();Xe(["US","CA"].includes(n)?"us":"row")}catch{Xe("")}finally{clearTimeout(t)}}function Xt(e){var V,B,H,nt,at;if(!e.ready)return;let t=_.variants[e.baseNumericId]||{};P("[data-base-name]",t.color||""),P("[data-delivery]",t.delivery?`Est. delivery ${t.delivery}`:"");for(let p of g.querySelectorAll("[data-base-swatch]"))p.classList.toggle("is-selected",p.dataset.baseSwatch===e.baseNumericId);let r=e.wrapLine?er(e.wrapLine.merchandise)||e.wrapLine.merchandise.title:"",n=new Set(e.accessoryLines.map(p=>p.merchandise.product.handle)),a={},o=new Set;for(let p of _.customImageRules||[])if(p.when.every(E=>n.has(E))){Object.assign(a,p.replace||{});for(let E of p.hide||[])o.add(E)}let s=!1;for(let p of g.querySelectorAll("[data-layer]")){let E=p.dataset.layer,ot=n.has(E)&&!o.has(E),me=a[E]||ze[E];me&&p.getAttribute("src")!==me&&p.setAttribute("src",me),p.classList.toggle("is-on",ot),ot&&(s=!0)}let i=(B=(V=A.main.variants.find(p=>We(p.id)===e.baseNumericId))==null?void 0:V.image)==null?void 0:B.url,c=e.region==="row"?"eu":"us",u=(c==="eu"?t.backgroundImage:G(i,1600))||G(i,1600)||t.backgroundImage,d=e.wrapLine?(nt=(H=Y.get(r))==null?void 0:H.image)==null?void 0:nt.url:null,f=d&&!Tr.has(r);d&&(f||!s)?Jt(d,`wrap:${r}`):Jt(u,`base:${e.baseNumericId}:${c}`),P("[data-wrap-name]",e.wrapLine?r:"None"),P("[data-wrap-price]",e.wrapLine?T(parseFloat(e.wrapLine.merchandise.price.amount),e.currency):"Included");for(let p of g.querySelectorAll("[data-wrap-swatch]")){let E=p.dataset.wrapSwatch==="";p.classList.toggle("is-selected",e.wrapLine?p.dataset.wrapSwatch===r:E)}for(let p of g.querySelectorAll("[data-bundle]"))p.classList.toggle("is-selected",p.dataset.bundle===e.activeBundle);let m=new Set(e.accessoryLines.map(p=>p.merchandise.product.handle));for(let p of g.querySelectorAll("[data-acc-toggle]")){let E=m.has(p.dataset.accToggle);p.textContent=E?"Added":"Add",p.classList.toggle("is-added",E),(at=p.closest("[data-acc]"))==null||at.classList.toggle("is-added",E)}P("[data-qty-value]",String(e.quantity));let y=g.querySelector("[data-summary]");y&&(y.innerHTML=Qt(e,_)),P("[data-summary-total]",T(e.total,e.currency));let S=Kt(e.total,e.currency,e.payMode);for(let p of g.querySelectorAll("[data-pay-mode]"))p.classList.toggle("is-active",p.dataset.payMode===e.payMode);P("[data-pay-figure]",T(S.amount,e.currency)+S.suffix),P("[data-pay-sub]",S.sub),Kr(S.amount,S.suffix,e.currency),P("[data-total-label]",S.label);let $=g.querySelector("[data-cta]");$&&($.textContent=e.region==="row"?"Register interest":"Order")}function er(e){var r;let t=(r=e.selectedOptions)==null?void 0:r.find(n=>/colou?rs?/i.test(n.name));return(t==null?void 0:t.value)||null}function P(e,t){let r=g.querySelector(e);r&&r.textContent!==t&&(r.textContent=t)}function Kr(e,t,r){let n=g.querySelector("[data-total]");if(n){if(N&&!document.hidden&&et!==e){tt&&tt.kill();let a={v:et};tt=N.to(a,{v:e,duration:.45,ease:"power2.out",onUpdate:()=>{n.textContent=T(a.v,r)+t},onComplete:()=>{n.textContent=T(e,r)+t}})}else n.textContent=T(e,r)+t;et=e}}function Jt(e,t){if(!e||t===fe)return;let r={a:g.querySelector('[data-hero-img="a"]'),b:g.querySelector('[data-hero-img="b"]')};if(!r.a||!r.b)return;if(fe===null){r[z].src=e,fe=t;return}let n=r[z],a=r[z==="a"?"b":"a"];a.src=e,z=z==="a"?"b":"a",fe=t,N?(N.set(a,{opacity:0,scale:1.04,xPercent:0,yPercent:0}),a.classList.add("is-active"),N.to(a,{opacity:1,scale:1,duration:.45,ease:"power2.out"}),N.to(n,{opacity:0,duration:.45,ease:"power2.out",onComplete:()=>n.classList.remove("is-active")})):(a.classList.add("is-active"),a.style.opacity=1,n.classList.remove("is-active"),n.style.opacity=0)}function Gr(){if(!N||!window.ScrollTrigger||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let e=g.querySelector(".sheet");for(let t of g.querySelectorAll(".opt"))N.from(t,{y:24,opacity:0,duration:.45,ease:"power2.out",scrollTrigger:{trigger:t,scroller:e,start:"top 88%",once:!0}})}})();
