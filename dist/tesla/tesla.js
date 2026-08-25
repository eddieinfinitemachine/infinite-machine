"use strict";(()=>{var S={id:"olto",steps:[{type:"location",no:"01",title:"Location",validation:!0,collapsible:!1},{type:"variant",no:"02",title:"Base"},{type:"wrap",no:"03",title:"Wrap"},{type:"bundle",no:"04",title:"Accessory Pack"},{type:"accessories",no:"05",title:"Configure your Accessories"},{type:"quantity",no:"06",title:"Quantity"}],product:{handle:"olto-1"},accessoriesCollection:"olto-accessories",testInstructionVideo:"https://vz-19725589-529.b-cdn.net/a4c98a2a-412b-4e2e-a2ce-4e9a64123464/playlist.m3u8",wrap:{productHandle:"olto-wrap"},bundles:{metaobjectType:"bundles"},variants:{44842879156380:{color:"Black",colorHex:"#000000",delivery:"July 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff73905e7daa5ef224c5d5_olto-eu-black.avif"},44842879123612:{color:"Silver",colorHex:"#D9D9D9",delivery:"August 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff7390e94ecc537b713a30_olto-eu-silver.avif"}},defaultVariantId:"44842879156380",wrapColorMap:{Sand:"#DECEAF",Blush:"#F6C6DC",Sky:"#707A8D",Forest:"#627063",Crimson:"#B44C47"},accessoryDependencies:{"olto-rear-rack":{requiredBy:["olto-rear-basket","olto-side-mounting-plate"]}},customImageRules:[{when:["olto-soft-bag","olto-rear-basket"],replace:{"olto-soft-bag":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/69219c3d619077ba6f1689ed_Soft%20Bag%20in%20Rear%20Basket.avif"}},{when:["olto-charging-dock","olto-battery"],replace:{"olto-battery":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6921a4037d0eab061d3d7ca4_Battery%20Dock%20with%20Battery%20Plugged%20in.avif"},hide:["olto-charging-dock"]}]};var U="GraphQL Client";var he="An error occurred while fetching from the API. Review 'graphQLErrors' for details.",ye="Response returned unexpected Content-Type:",ge="An unknown error has occurred. The API did not return a data object or any errors in its response.",re={json:"application/json",multipart:"multipart/mixed"},be="X-SDK-Variant",we="X-SDK-Version",lt="shopify-graphql-client",dt="1.4.2",ae=1e3,ut=[429,503],ve=/@(defer)\b/i,ct=`\r
`,ft=/boundary="?([^=";]+)"?/i,_e=ct+ct;function L(e,t=U){return e.startsWith(`${t}`)?e:`${t}: ${e}`}function x(e){return e instanceof Error?e.message:JSON.stringify(e)}function Se(e){return e instanceof Error&&e.cause?e.cause:void 0}function Ee(e){return e.flatMap(({errors:t})=>t!=null?t:[])}function ne({client:e,retries:t}){if(t!==void 0&&(typeof t!="number"||t<0||t>3))throw new Error(`${e}: The provided "retries" value (${t}) is invalid - it cannot be less than ${0} or greater than ${3}`)}function w(e,t){return t&&(typeof t!="object"||Array.isArray(t)||typeof t=="object"&&Object.keys(t).length>0)?{[e]:t}:{}}function Ce(e,t){if(e.length===0)return t;let a={[e.pop()]:t};return e.length===0?a:Ce(e,a)}function ht(e,t){return Object.keys(t||{}).reduce((r,a)=>(typeof t[a]=="object"||Array.isArray(t[a]))&&e[a]?(r[a]=ht(e[a],t[a]),r):(r[a]=t[a],r),Array.isArray(e)?[...e]:{...e})}function Ie([e,...t]){return t.reduce(ht,{...e})}function Ae({clientLogger:e,customFetchApi:t=fetch,client:r=U,defaultRetryWaitTime:a=ae,retriableCodes:n=ut}){let o=async(s,i,c)=>{let u=i+1,d=c+1,l;try{if(l=await t(...s),e({type:"HTTP-Response",content:{requestParams:s,response:l}}),!l.ok&&n.includes(l.status)&&u<=d)throw new Error;let m=(l==null?void 0:l.headers.get("X-Shopify-API-Deprecated-Reason"))||"";return m&&e({type:"HTTP-Response-GraphQL-Deprecation-Notice",content:{requestParams:s,deprecationNotice:m}}),l}catch(m){if(u<=d){let g=l==null?void 0:l.headers.get("Retry-After");return await sr(g?parseInt(g,10):a),e({type:"HTTP-Retry",content:{requestParams:s,lastResponse:l,retryAttempt:i,maxRetries:c}}),o(s,u,c)}throw new Error(L(`${c>0?`Attempted maximum number of ${c} network retries. Last message - `:""}${x(m)}`,r))}};return o}async function sr(e){return new Promise(t=>setTimeout(t,e))}function $e({headers:e,url:t,customFetchApi:r=fetch,retries:a=0,logger:n}){ne({client:U,retries:a});let o={headers:e,url:t,retries:a},s=ir(n),i=Ae({customFetchApi:r,clientLogger:s,defaultRetryWaitTime:ae}),c=cr(i,o),u=lr(c),d=yr(c);return{config:o,fetch:c,request:u,requestStream:d}}function ir(e){return t=>{e&&e(t)}}async function yt(e){let{errors:t,data:r,extensions:a}=await e.json();return{...w("data",r),...w("extensions",a),headers:e.headers,...t||!r?{errors:{networkStatusCode:e.status,message:L(t?he:ge),...w("graphQLErrors",t),response:e}}:{}}}function cr(e,{url:t,headers:r,retries:a}){return async(n,o={})=>{let{variables:s,headers:i,url:c,retries:u,keepalive:d,signal:l}=o,m=JSON.stringify({query:n,variables:s});ne({client:U,retries:u});let g=Object.entries({...r,...i}).reduce((R,[k,F])=>(R[k]=Array.isArray(F)?F.join(", "):F.toString(),R),{});!g[be]&&!g[we]&&(g[be]=lt,g[we]=dt);let C=[c!=null?c:t,{method:"POST",headers:g,body:m,signal:l,keepalive:d}];return e(C,1,u!=null?u:a)}}function lr(e){return async(...t)=>{if(ve.test(t[0]))throw new Error(L("This operation will result in a streamable response - use requestStream() instead."));let r=null;try{r=await e(...t);let{status:a,statusText:n}=r,o=r.headers.get("content-type")||"";return r.ok?o.includes(re.json)?await yt(r):{errors:{networkStatusCode:a,message:L(`${ye} ${o}`),response:r}}:{errors:{networkStatusCode:a,message:L(n),response:r}}}catch(a){return{errors:{message:x(a),...r==null?{}:{networkStatusCode:r.status,response:r}}}}}}async function*dr(e){let t=new TextDecoder;if(e.body[Symbol.asyncIterator])for await(let r of e.body)yield t.decode(r);else{let r=e.body.getReader(),a;try{for(;!(a=await r.read()).done;)yield t.decode(a.value)}finally{r.cancel()}}}function ur(e,t){return{async*[Symbol.asyncIterator](){try{let r="";for await(let a of e)if(r+=a,r.indexOf(t)>-1){let n=r.lastIndexOf(t),s=r.slice(0,n).split(t).filter(i=>i.trim().length>0).map(i=>i.slice(i.indexOf(_e)+_e.length).trim());s.length>0&&(yield s),r=r.slice(n+t.length),r.trim()==="--"&&(r="")}}catch(r){throw new Error(`Error occured while processing stream payload - ${x(r)}`)}}}}function fr(e){return{async*[Symbol.asyncIterator](){try{yield{...await yt(e),hasNext:!1}}catch(t){yield{errors:{message:L(x(t)),networkStatusCode:e.status,response:e},hasNext:!1}}}}}function pr(e){return e.map(t=>{try{return JSON.parse(t)}catch(r){throw new Error(`Error in parsing multipart response - ${x(r)}`)}}).map(t=>{let{data:r,incremental:a,hasNext:n,extensions:o,errors:s}=t;if(!a)return{data:r||{},...w("errors",s),...w("extensions",o),hasNext:n};let i=a.map(({data:c,path:u,errors:d})=>({data:c&&u?Ce(u,c):{},...w("errors",d)}));return{data:i.length===1?i[0].data:Ie([...i.map(({data:c})=>c)]),...w("errors",Ee(i)),hasNext:n}})}function mr(e,t){if(e.length>0)throw new Error(he,{cause:{graphQLErrors:e}});if(Object.keys(t).length===0)throw new Error(ge)}function hr(e,t){var i,c;let r=(t!=null?t:"").match(ft),a=`--${r?r[1]:"-"}`;if(!((i=e.body)!=null&&i.getReader)&&!((c=e.body)!=null&&c[Symbol.asyncIterator]))throw new Error("API multipart response did not return an iterable body",{cause:e});let n=dr(e),o={},s;return{async*[Symbol.asyncIterator](){var u,d;try{let l=!0;for await(let m of ur(n,a)){let g=pr(m);s=(d=(u=g.find(R=>R.extensions))==null?void 0:u.extensions)!=null?d:s;let C=Ee(g);o=Ie([o,...g.map(({data:R})=>R)]),l=g.slice(-1)[0].hasNext,mr(C,o),yield{...w("data",o),...w("extensions",s),hasNext:l}}if(l)throw new Error("Response stream terminated unexpectedly")}catch(l){let m=Se(l);yield{...w("data",o),...w("extensions",s),errors:{message:L(x(l)),networkStatusCode:e.status,...w("graphQLErrors",m==null?void 0:m.graphQLErrors),response:e},hasNext:!1}}}}}function yr(e){return async(...t)=>{if(!ve.test(t[0]))throw new Error(L("This operation does not result in a streamable response - use request() instead."));try{let r=await e(...t),{statusText:a}=r;if(!r.ok)throw new Error(a,{cause:r});let n=r.headers.get("content-type")||"";switch(!0){case n.includes(re.json):return fr(r);case n.includes(re.multipart):return hr(r,n);default:throw new Error(`${ye} ${n}`,{cause:r})}}catch(r){return{async*[Symbol.asyncIterator](){let a=Se(r);yield{errors:{message:L(x(r)),...w("networkStatusCode",a==null?void 0:a.status),...w("response",a)},hasNext:!1}}}}}}function Re({client:e,storeDomain:t}){try{if(!t||typeof t!="string")throw new Error;let r=t.trim(),a=r.match(/^https?:/)?r:`https://${r}`,n=new URL(a);return n.protocol="https",n.origin}catch(r){throw new Error(`${e}: a valid store domain ("${t}") must be provided`,{cause:r})}}function oe({client:e,currentSupportedApiVersions:t,apiVersion:r,logger:a}){let n=`${e}: the provided apiVersion ("${r}")`,o=`Currently supported API versions: ${t.join(", ")}`;if(!r||typeof r!="string")throw new Error(`${n} is invalid. ${o}`);let s=r.trim();t.includes(s)||(a?a({type:"Unsupported_Api_Version",content:{apiVersion:r,supportedApiVersions:t}}):console.warn(`${n} is likely deprecated or not supported. ${o}`))}function se(e){let t=e*3-2;return t===10?t:`0${t}`}function Le(e,t,r){let a=t-r;return a<=0?`${e-1}-${se(a+4)}`:`${e}-${se(a)}`}function gt(){let e=new Date,t=e.getUTCMonth(),r=e.getUTCFullYear(),a=Math.floor(t/3+1);return{year:r,quarter:a,version:`${r}-${se(a)}`}}function Te(){let{year:e,quarter:t,version:r}=gt(),a=t===4?`${e+1}-01`:`${e}-${se(t+1)}`;return[Le(e,t,3),Le(e,t,2),Le(e,t,1),r,a,"unstable"]}function xe(e){return t=>({...t!=null?t:{},...e.headers})}function Oe({getHeaders:e,getApiUrl:t}){return(r,a)=>{let n=[r];if(a&&Object.keys(a).length>0){let{variables:o,apiVersion:s,headers:i,retries:c,signal:u}=a;n.push({...o?{variables:o}:{},...i?{headers:e(i)}:{},...s?{url:t(s)}:{},...c?{retries:c}:{},...u?{signal:u}:{}})}return n}}var Ne="application/json",bt="storefront-api-client",wt="1.0.10",vt="X-Shopify-Storefront-Access-Token",_t="Shopify-Storefront-Private-Token",St="X-SDK-Variant",Et="X-SDK-Version",Ct="X-SDK-Variant-Source",B="Storefront API Client";function It(e){if(e&&typeof window!="undefined")throw new Error(`${B}: private access tokens and headers should only be used in a server-to-server implementation. Use the public API access token in nonserver environments.`)}function At(e,t){if(!e&&!t)throw new Error(`${B}: a public or private access token must be provided`);if(e&&t)throw new Error(`${B}: only provide either a public or private access token`)}function De({storeDomain:e,apiVersion:t,publicAccessToken:r,privateAccessToken:a,clientName:n,retries:o=0,customFetchApi:s,logger:i}){let c=Te(),u=Re({client:B,storeDomain:e}),d={client:B,currentSupportedApiVersions:c,logger:i};oe({...d,apiVersion:t}),At(r,a),It(a);let l=gr(u,t,d),m={storeDomain:u,apiVersion:t,...r?{publicAccessToken:r}:{privateAccessToken:a},headers:{"Content-Type":Ne,Accept:Ne,[St]:bt,[Et]:wt,...n?{[Ct]:n}:{},...r?{[vt]:r}:{[_t]:a}},apiUrl:l(),clientName:n},g=$e({headers:m.headers,url:m.apiUrl,retries:o,customFetchApi:s,logger:i}),C=xe(m),R=br(m,l),k=Oe({getHeaders:C,getApiUrl:R});return Object.freeze({config:m,getHeaders:C,getApiUrl:R,fetch:(...P)=>g.fetch(...k(...P)),request:(...P)=>g.request(...k(...P)),requestStream:(...P)=>g.requestStream(...k(...P))})}function gr(e,t,r){return a=>{a&&oe({...r,apiVersion:a});let n=(a!=null?a:t).trim();return`${e}/api/${n}/graphql.json`}}function br(e,t){return r=>r?t(r):e.apiUrl}var ie={SHOPIFY_STORE_DOMAIN:"shop.infinitemachine.com",SHOPIFY_STOREFRONT_PUBLIC_TOKEN:"eefb42e32220791a7472aaa5d2cf2182",SHOPIFY_API_VERSION:"2026-04"};var V=De({storeDomain:ie.SHOPIFY_STORE_DOMAIN,apiVersion:ie.SHOPIFY_API_VERSION,publicAccessToken:ie.SHOPIFY_STOREFRONT_PUBLIC_TOKEN});var qe=new Map;async function $t(e){var s;let t=(s=e.bundles)==null?void 0:s.metaobjectType;if(!t)return[];if(qe.has(t))return qe.get(t);let r=`
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
  `,{data:a,errors:n}=await V.request(r,{variables:{type:t}});if(n)return console.warn(`[Bundles] GraphQL errors fetching "${t}":`,n),[];let o=a.metaobjects.edges.map(({node:i})=>wr(i));return qe.set(t,o),o}function wr(e){var r,a;let t={id:e.id,handle:e.handle};for(let n of e.fields)(a=(r=n.references)==null?void 0:r.edges)!=null&&a.length?t[n.key]=n.references.edges.map(o=>o.node):n.reference?t[n.key]=n.reference:n.value!=null&&(t[n.key]=n.value);return t}var Tt="olto_cart_",vr="cfg_",Pe="config",T=null,f=null,K=null,He=null,I=null,ce=[],_r=[];function H(e){K=e,f=e}var W=null;function xt(e){W=e}async function Ot(e){var r;He=e.id,I=Rt()||Pt();let t=Ar();if(t)try{let a=await Er(t);a&&(T=t,H(a))}catch(a){console.warn("[Cart] Failed to restore cart, will create new:",a)}if(!T){let a=await Sr();H(a),T=a.id,$r(T)}if(!Rt()&&((r=f==null?void 0:f.lines)!=null&&r.length)){let a=Cr(f);a&&(I=a)}return Ht(I),A(),Vt(),f}function Nt(){return f==null?void 0:f.checkoutUrl}function le(){return I}function Me(){return I=Pt(),Ht(I),Vt(),I}async function Dt(e){J();let t=K,r=((t==null?void 0:t.lines)||[]).filter(a=>{var n;return((n=a.attributesByKey)==null?void 0:n._config_id)===e}).map(a=>a.id);r.length!==0&&(await Ue(r),e===I&&Me())}async function Fe(e){J();let t=f,r=Ve(I),a=e.map(o=>Mt(o.variantId,o.quantity||r,{...o.attributes||{},_config_id:I})).filter(Boolean);a.length&&(f=Ft(f,a),A());let n=e.map(o=>({merchandiseId:o.variantId,quantity:o.quantity||r,attributes:X({...o.attributes||{},_config_id:I})}));try{return H(await de(()=>j("cartLinesAdd",`
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ${M} }
          userErrors { field message }
        }
      }
    `,{cartId:T,lines:n}))),A(),f}catch(o){throw f=t,A(),o}}async function Ue(e){J();let t=f,r=new Set(e);f&&(f={...f,lines:f.lines.filter(a=>!r.has(a.id))},A());try{return H(await de(()=>j("cartLinesRemove",`
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ${M} }
          userErrors { field message }
        }
      }
    `,{cartId:T,lineIds:e}))),A(),f}catch(a){throw f=t,A(),a}}async function qt({lineId:e,variantId:t,quantity:r,attributes:a}){J();let n=f;f&&(f={...f,lines:f.lines.map(s=>{if(s.id!==e)return s;let i={...s};if(t!==void 0){let c=Ke(t)||s.merchandise;i.merchandise=c}if(r!==void 0&&(i.quantity=r),a!==void 0){let c=X(a);i.attributes=c,i.attributesByKey=Object.fromEntries(c.map(u=>[u.key,u.value]))}return i})},A());let o={id:e};t!==void 0&&(o.merchandiseId=t),r!==void 0&&(o.quantity=r),a!==void 0&&(o.attributes=X(a));try{return H(await de(()=>j("cartLinesUpdate",`
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ${M} }
          userErrors { field message }
        }
      }
    `,{cartId:T,lines:[o]}))),A(),f}catch(s){throw f=n,A(),s}}function kt(e){return ce.push(e),f&&e(f),()=>{ce=ce.filter(t=>t!==e)}}var M=`
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
`;async function Sr(){var a;let{data:e,errors:t}=await V.request(`
    mutation CartCreate {
      cartCreate(input: {}) {
        cart { ${M} }
        userErrors { field message }
      }
    }
  `);if(t)throw new Error(`[Cart] createCart errors: ${JSON.stringify(t)}`);let r=(a=e==null?void 0:e.cartCreate)==null?void 0:a.userErrors;if(r!=null&&r.length)throw new Error(`[Cart] createCart userErrors: ${JSON.stringify(r)}`);return Be(e.cartCreate.cart)}async function Er(e){let{data:t,errors:r}=await V.request(`
    query GetCart($id: ID!) {
      cart(id: $id) { ${M} }
    }
  `,{variables:{id:e}});if(r)throw new Error(`[Cart] queryCart errors: ${JSON.stringify(r)}`);return t!=null&&t.cart?Be(t.cart):null}async function j(e,t,r){var s;let{data:a,errors:n}=await V.request(t,{variables:r});if(n)throw new Error(`[Cart] ${e} errors: ${JSON.stringify(n)}`);let o=a==null?void 0:a[e];if((s=o==null?void 0:o.userErrors)!=null&&s.length)throw new Error(`[Cart] ${e} userErrors: ${JSON.stringify(o.userErrors)}`);return Be(o.cart)}function Be(e){let t=e.attributes||[];return{id:e.id,checkoutUrl:e.checkoutUrl,totalQuantity:e.totalQuantity,cost:e.cost,attributes:t,attributesByKey:Object.fromEntries(t.map(r=>[r.key,r.value])),lines:e.lines.edges.map(({node:r})=>({id:r.id,quantity:r.quantity,attributes:r.attributes,attributesByKey:Object.fromEntries(r.attributes.map(a=>[a.key,a.value])),merchandise:r.merchandise}))}}function X(e){return Object.entries(e).filter(([,t])=>t!=null&&t!=="").map(([t,r])=>({key:t,value:String(r)}))}function J(){if(!T)throw new Error("[Cart] Called before initCart(config)")}function A(){for(let e of ce)e(f)}function Pt(){return`${vr}${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Ve(e){var a;let t=K||f;if(!((a=t==null?void 0:t.lines)!=null&&a.length))return 1;let r=t.lines.find(n=>{var o;return((o=n.attributesByKey)==null?void 0:o._config_id)===e});return(r==null?void 0:r.quantity)||1}function Vt(){for(let e of _r)e(I)}function Rt(){return typeof window=="undefined"?null:new URLSearchParams(window.location.search).get(Pe)}function Ht(e){if(typeof window=="undefined")return;let t=new URLSearchParams(window.location.search);e?t.set(Pe,e):t.delete(Pe),window.history.replaceState({},"",`${window.location.pathname}?${t.toString()}`)}function Cr(e){var r;if(!((r=e==null?void 0:e.lines)!=null&&r.length))return null;let t=e.lines.map(a=>{var n;return(n=a.attributesByKey)==null?void 0:n._config_id}).filter(Boolean).sort();return t[t.length-1]||null}var Lt=Promise.resolve();async function de(e){let t=Lt,r;Lt=new Promise(a=>{r=a}),await t;try{return await e()}finally{r()}}var ke=new Map;function Ir(e,t){let r=ke.get(e)||{inflight:null,latest:null};return r.latest=t,ke.set(e,r),r.inflight||(r.inflight=(async()=>{for(;r.latest;){let a=r.latest;r.latest=null;try{await de(a)}catch(n){console.error(`[Cart] coalesce(${e}) error:`,n)}}r.inflight=null,ke.delete(e)})()),r.inflight}async function O(e,t){J();let r=I;if(f){let a=f.lines.findIndex(n=>{var o;return n.merchandise.product.handle===e&&((o=n.attributesByKey)==null?void 0:o._config_id)===r});if(a>=0&&t===null)f={...f,lines:f.lines.filter((n,o)=>o!==a)};else if(a>=0&&t){let n=Ke(t);n&&(f={...f,lines:f.lines.map((o,s)=>s===a?{...o,merchandise:n}:o)})}else if(a<0&&t){let n=Ve(r),o=Mt(t,n,{_config_id:r});o&&(f=Ft(f,[o]))}A()}return Ir(`product:${e}:${r}`,async()=>{let a=K==null?void 0:K.lines.find(n=>{var o;return n.merchandise.product.handle===e&&((o=n.attributesByKey)==null?void 0:o._config_id)===r});if(t===null){a&&(H(await j("cartLinesRemove",`
          mutation($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart { ${M} } userErrors { field message }
            }
          }
        `,{cartId:T,lineIds:[a.id]})),A());return}if(a)H(await j("cartLinesUpdate",`
        mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart { ${M} } userErrors { field message }
          }
        }
      `,{cartId:T,lines:[{id:a.id,merchandiseId:t}]}));else{let n=Ve(r);H(await j("cartLinesAdd",`
        mutation($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart { ${M} } userErrors { field message }
          }
        }
      `,{cartId:T,lines:[{merchandiseId:t,quantity:n,attributes:X({_config_id:r})}]}))}A()})}function Ke(e){if(!W)return null;let t=[W.main,W.wrap,...W.accessories||[]].filter(Boolean);for(let r of t){let a=r.variants.find(n=>n.id===e);if(a)return{id:a.id,title:a.title,price:a.price,image:a.image,selectedOptions:a.selectedOptions,product:{id:r.id,handle:r.handle,title:r.title}}}return null}function Mt(e,t,r){let a=Ke(e);if(!a)return null;let n=X(r);return{id:`tmp_${Math.random().toString(36).slice(2,10)}`,quantity:t,attributes:n,attributesByKey:Object.fromEntries(n.map(o=>[o.key,o.value])),merchandise:a}}function Ft(e,t){return e&&{...e,lines:[...e.lines,...t],totalQuantity:(e.totalQuantity||0)+t.reduce((r,a)=>r+(a.quantity||1),0)}}function Ar(){return typeof localStorage=="undefined"?null:localStorage.getItem(`${Tt}${He}`)}function $r(e){typeof localStorage!="undefined"&&localStorage.setItem(`${Tt}${He}`,e)}var je=new Map,Ge=`
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
`;async function Ut(e){var i;if(je.has(e.id))return je.get(e.id);let t=!!((i=e.wrap)!=null&&i.productHandle),r=`
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
  `,a={productHandle:e.product.handle,accessoriesHandle:e.accessoriesCollection};t&&(a.wrapHandle=e.wrap.productHandle);let{data:n,errors:o}=await V.request(r,{variables:a});if(o)throw new Error(`[Products] GraphQL errors: ${JSON.stringify(o)}`);if(!n.main)throw new Error(`[Products] Product not found: ${e.product.handle}`);if(!n.accessoriesCollection)throw new Error(`[Products] Collection not found: ${e.accessoriesCollection}`);let s={main:Qe(n.main),wrap:n.wrap?Qe(n.wrap):null,accessories:n.accessoriesCollection.products.edges.map(c=>Qe(c.node))};return je.set(e.id,s),s}function Qe(e){var t,r,a;return{id:e.id,handle:e.handle,title:e.title,description:e.description,availableForSale:e.availableForSale,productType:e.productType,vendor:e.vendor,tags:e.tags||[],featuredImage:e.featuredImage,accessoryEta:((t=e.accessoryEta)==null?void 0:t.value)||null,instructionVideo:((r=e.instructionVideo)==null?void 0:r.value)||null,collections:(((a=e.collections)==null?void 0:a.edges)||[]).map(n=>n.node),variants:e.variants.edges.map(({node:n})=>({id:n.id,title:n.title,availableForSale:n.availableForSale,quantityAvailable:n.quantityAvailable,price:n.price,compareAtPrice:n.compareAtPrice,selectedOptions:n.selectedOptions,image:n.image}))}}var Ye=null,Ze=null,Bt=[],ue=[],b={ready:!1,region:"",baseNumericId:null,bikeLine:null,wrapLine:null,accessoryLines:[],activeBundle:null,quantity:1,total:0,currency:"USD",payMode:"finance",cart:null};function We(e){return String(e).split("/").pop()}function z(e){return`gid://shopify/ProductVariant/${e}`}function Kt(e){Ye=e.config,Ze=e.products,Bt=e.bundles||[],b.baseNumericId=Ye.defaultVariantId,kt(Rr)}function D(){return b}function jt(e){return ue.push(e),()=>{ue=ue.filter(t=>t!==e)}}function Xe(e){b.region=e,Je()}function fe(e){b.payMode=e,Je()}function Je(){for(let e of ue)e(b)}function Rr(e){var c,u;let t=le(),r=((e==null?void 0:e.lines)||[]).filter(d=>{var l;return((l=d.attributesByKey)==null?void 0:l._config_id)===t}),a=Ze.main.handle,n=(c=Ye.wrap)==null?void 0:c.productHandle,o=new Set(Ze.accessories.map(d=>d.handle));b.cart=e,b.bikeLine=r.find(d=>d.merchandise.product.handle===a)||null,b.wrapLine=r.find(d=>d.merchandise.product.handle===n)||null,b.accessoryLines=r.filter(d=>o.has(d.merchandise.product.handle)),b.bikeLine&&(b.baseNumericId=We(b.bikeLine.merchandise.id)),b.quantity=((u=r[0])==null?void 0:u.quantity)||1;let s=0;for(let d of r)s+=parseFloat(d.merchandise.price.amount)*(d.quantity||1),d.merchandise.price.currencyCode&&(b.currency=d.merchandise.price.currencyCode);b.total=s;let i=new Set(b.accessoryLines.map(d=>d.merchandise.product.handle));b.activeBundle=null;for(let d of Bt){let l=(d.products||[]).map(m=>m.handle);if(l.length&&l.length===i.size&&l.every(m=>i.has(m))){b.activeBundle=d.handle;break}}b.ready=!0,Je()}var Lr='<svg viewBox="0 0 922 201" fill="none" xmlns="http://www.w3.org/2000/svg" class="olto-wordmark" role="img" aria-label="Olto"> <path d="M246.995 19.4652C255.252 28.6186 259.698 41.3214 261.454 61.0855C262.35 70.239 262.649 80.8495 262.649 102.706C262.649 151.985 257.942 170.89 242.885 184.153C231.976 193.605 217.218 198.313 192.41 199.807C182.958 200.405 147.241 201.003 119.817 201.003C59.5913 201.003 43.3765 199.247 26.564 190.093C13.5623 182.995 5.00663 169.433 2.35399 149.968C0.598013 136.966 0.000235075 126.355 0.000235075 94.1874C-0.0371261 48.1211 4.37149 29.8142 18.5687 17.4103C29.1793 7.95792 43.0403 3.54931 68.4458 1.45708C78.496 0.560417 108.011 0 143.99 0C213.631 0 232.237 3.54931 246.995 19.4652ZM46.2907 100.651C46.2907 139.021 49.2422 151.425 60.1517 157.029C71.0611 162.932 80.5135 163.829 136.891 163.829C187.665 163.829 200.331 161.774 208.326 152.919C215.126 145.559 217.181 132.856 217.181 99.4927C217.181 37.8095 216.583 37.2117 131.586 37.2117C46.5896 37.2117 46.2907 38.1084 46.2907 100.651Z" fill="#E90022"/> <path d="M286.86 2.05334H332.328V162.034H476.057V198.909H286.86V2.05334Z" fill="#E90022"/> <path d="M507.328 38.9662H414.673V2.05334H645.154V38.9288H552.759V198.909H507.291V38.9662H507.328Z" fill="#E90022"/> <path d="M906.345 19.4644C914.602 28.6179 919.048 41.3207 920.804 61.0847C921.701 70.2382 922 80.8488 922 102.705C922 151.984 917.292 170.889 902.236 184.152C891.326 193.605 876.569 198.312 851.761 199.807C842.308 200.404 806.591 201.002 779.168 201.002C718.979 201.002 702.727 199.246 685.915 190.093C672.913 182.994 664.357 169.432 661.705 149.967C659.949 136.965 659.351 126.355 659.351 94.1867C659.351 48.1578 663.797 29.8508 677.957 17.4469C688.567 7.99454 702.466 3.58593 727.834 1.49371C737.884 0.597038 767.399 0.0366211 803.378 0.0366211C873.019 0.0366211 891.625 3.58593 906.383 19.5018L906.345 19.4644ZM705.679 100.65C705.679 139.02 708.63 151.424 719.54 157.028C730.449 162.931 739.901 163.828 796.279 163.828C847.053 163.828 859.719 161.773 867.714 152.918C874.514 145.558 876.569 132.855 876.569 99.492C876.569 37.8087 875.971 37.211 790.974 37.211C705.978 37.211 705.679 38.1076 705.679 100.65Z" fill="#E90022"/> </svg>',Tr='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 831.97 45.21" class="im-wordmark" fill="currentColor" role="img" aria-label="Infinite Machine"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M13.56.33V44.88H0V.33Z"/><path d="M44.93.33l27,33.86L71.58.33H84.4V44.88H62.63L36,11.35l.34,33.53h-13V.33Z"/><path d="M141.66.33V10.42H107.87V19.3h32.06V29.39H107.87V44.88H94.38V.33Z"/><path d="M163.09.33V44.88H149.54V.33Z"/><path d="M194.46.33l27,33.86L221.11.33h12.82V44.88H212.16L185.58,11.35l.33,33.53h-13V.33Z"/><path d="M257.44.33V44.88H243.89V.33Z"/><path d="M264.52,11.35V.33h53.23v11H297.91V44.88H284.35V11.35Z"/><path d="M374.26,10.42h-36V18.1h33.93v8.81H338.26V34.8h36.47V44.88H324.91V.33h49.35Z"/><path d="M423,.33l16.23,29.59L455.34.33h21.37V44.88H463.49l.67-34.39L444.39,44.88H433.57L414.13,10.49l.4,34.39H401.44V.33Z"/><path d="M526.62.33,551,44.88H536.17l-4.4-8H503.05l-4.28,8H483.41l25-44.55Zm-9.21,9.55-9.49,17.77H527Z"/><path d="M611.09,32.22c0,1.14-.11,2.11-.2,2.91a13.74,13.74,0,0,1-.36,2.07,11.1,11.1,0,0,1-.57,1.6,8.86,8.86,0,0,1-4.21,4.31,21.46,21.46,0,0,1-8.08,1.77q-2.07.19-6.18.27t-10.78.06c-3.21,0-5.91,0-8.12-.13a53.92,53.92,0,0,1-5.61-.47,20.34,20.34,0,0,1-3.9-.9,14.32,14.32,0,0,1-2.94-1.43,10.08,10.08,0,0,1-2.77-2.58,11.37,11.37,0,0,1-1.74-3.87,32.31,32.31,0,0,1-.9-5.84c-.18-2.32-.27-5.12-.27-8.42q0-4.41.27-7.48a23.36,23.36,0,0,1,1-5.24,10,10,0,0,1,1.87-3.54,10.88,10.88,0,0,1,2.9-2.37,16.6,16.6,0,0,1,3.17-1.44,23.22,23.22,0,0,1,4-.9Q570,.27,573.29.13c2.19-.09,4.83-.13,8-.13q6.21,0,10.22.07c2.67,0,4.88.15,6.61.33a27.49,27.49,0,0,1,4.21.7,18,18,0,0,1,3,1.1,8.12,8.12,0,0,1,4,4.35,20.63,20.63,0,0,1,1.27,7.94V16h-13a11.59,11.59,0,0,0-.5-2.87,2.69,2.69,0,0,0-1.7-1.6,12.6,12.6,0,0,0-3.87-.67c-1.7-.09-4-.13-6.95-.13q-4.14,0-6.74.06c-1.74.05-3.13.14-4.18.27a10.12,10.12,0,0,0-2.4.53,5.12,5.12,0,0,0-1.44.87,4.48,4.48,0,0,0-1,1.24,7.48,7.48,0,0,0-.6,1.87,20.61,20.61,0,0,0-.3,2.94c0,1.18-.07,2.66-.07,4.44a42.86,42.86,0,0,0,.37,6.31A5.34,5.34,0,0,0,570,32.66a8,8,0,0,0,4.21,1.43,75.75,75.75,0,0,0,7.68.31c2.54,0,4.57,0,6.11,0s2.77,0,3.71-.1a12.82,12.82,0,0,0,2.13-.23,7.73,7.73,0,0,0,1.47-.5,3.77,3.77,0,0,0,2.07-1.81,8.36,8.36,0,0,0,.6-3.6h13.16C611.16,29.72,611.14,31.09,611.09,32.22Z"/><path d="M633.44.33v16.5H664.3V.33h13.56V44.88H664.3v-17H633.44v17H619.88V.33Z"/><path d="M701.33.33V44.88H687.77V.33Z"/><path d="M732.7.33l27,33.86L759.35.33h12.82V44.88H750.4L723.82,11.35l.33,33.53h-13V.33Z"/><path d="M831.51,10.42h-36V18.1h33.93v8.81H795.51V34.8H832V44.88H782.15V.33h49.36Z"/></g></g></svg>',v="https://cdn.prod.website-files.com/66ea2a84659b76f5d91d481b",et={"accessory-plate":`${v}/68d53a735e9c987a9499211a_accessory-plate.avif`,"charger-bag":`${v}/68d53a2cb165eb23a2527775_charger-bag.avif`,"olto-center-stand":`${v}/68d53974c880c4b20d23dec9_olto-center-stand.avif`,"olto-charging-dock":`${v}/68d5396153ba7acdd9978c0d_olto-charging-dock.avif`,"olto-kid-carrier":`${v}/6921a92ec4d3dc4a766d69bb_Kid%20Carrier.avif`,"olto-rear-basket":`${v}/68d53b6769ccc4ad6ad7d0b3_olto-rear-basket.avif`,"olto-rear-rack":`${v}/68d53b2e1153a3e349d34c1a_olto-rear-rack.avif`,"olto-side-mounting-plate":`${v}/68d53bea87ff421cf85c858e_olto-side-mounting-plate.avif`,"olto-sidewalls":`${v}/68d53c3ccb4cfb15c59ac6cd_olto-sidewalls.avif`,"olto-super-charger":`${v}/6921a99cb5dd5b924cf4965d_Super%20Charger%20on%20the%20Ground.avif`,"olto-u-lock-mount":`${v}/68d53cf8bb965a6129e84ff4_olto-u-lock-mount.avif`,"olto-water-bottle-holder":`${v}/68d53d46367f73dfd1b58a42_olto-water-bottle-holder.avif`,"open-face-helmet":`${v}/6921a8f20583ec71e2663dce_Black%20Open%20Face%20Helmet.avif`,"kryptonite-lock":`${v}/68d53fc0d2d8d2d151493b5f_kryptonite-lock.avif`,"olto-soft-bag":`${v}/692197c1914921de9b30217a_Soft%20Bag%20on%20the%20Ground.avif`},ze={finance:{months:48,apr:.1599},lease:{months:24,residualPct:.35}};function Gt(e,t,r){if(r==="finance"){let{months:a,apr:n}=ze.finance,o=n/12,s=o>0?e*o/(1-(1+o)**-a):e/a;return{amount:s,suffix:"/mo",label:"Est. finance payment",sub:`${a} monthly payments of ${$(s,t)} at ${(n*100).toFixed(2)}% APR. Estimate for illustration \u2014 payment options appear at checkout.`}}if(r==="lease"){let{months:a,residualPct:n}=ze.lease;return{amount:e*(1-n)/a,suffix:"/mo",label:"Est. lease payment",sub:`${a}-month term, ${Math.round(n*100)}% residual. Estimate for illustration.`}}return{amount:e,suffix:"",label:"Est. purchase price",sub:"Taxes and shipping calculated at checkout."}}var xr=[{value:"40 mi",label:"Range (est.)"},{value:"20 mph",label:"Top Speed"},{value:"Class 2",label:"E-bike"}];function $(e,t="USD"){let r=Number(e)||0,a=r%1===0?0:2;return t==="USD"?`$${r.toLocaleString("en-US",{minimumFractionDigits:a,maximumFractionDigits:a})}`:`${t} ${r.toFixed(2)}`}function y(e){return String(e!=null?e:"").replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`)}function G(e,t){return e?`${e}${e.includes("?")?"&":"?"}width=${t}`:""}function Qt({config:e,products:t,bundles:r,wrapVariantsByColor:a}){let n=Object.entries(e.variants),[o]=n.find(([l])=>l===e.defaultVariantId)||n[0],s=Math.min(...t.main.variants.map(l=>parseFloat(l.price.amount))),{months:i,apr:c}=ze.finance,u=c/12,d=Math.round(s*u/(1-(1+u)**-i));return`
    <header class="topbar">
      <div class="topbar_mark">${Tr}</div>
    </header>

    <section class="hero" aria-label="Olto">
      <img class="hero_img is-active" data-hero-img="a" src="${y(e.variants[o].backgroundImage)}" alt="Olto" />
      <img class="hero_img" data-hero-img="b" alt="" aria-hidden="true" />
      <div class="hero_layers" data-layers>
        ${Object.entries(et).map(([l,m])=>`<img class="hero_layer" data-layer="${y(l)}" src="${y(m)}" alt="" aria-hidden="true" />`).join("")}
      </div>
    </section>

    <main class="sheet">
      <div class="sheet_handle" aria-hidden="true"></div>

      <section class="intro">
        <h1 class="intro_title">${Lr}</h1>
        <p class="intro_delivery" data-delivery></p>
        <p class="intro_price">From ${$(s)} \xB7 or ${$(d)}/mo financing</p>
        <div class="stats">
          ${xr.map(l=>`
            <div class="stats_item">
              <div class="stats_value">${y(l.value)}</div>
              <div class="stats_label">${y(l.label)}</div>
            </div>`).join("")}
        </div>
      </section>

      <section class="opt" data-section="paint">
        <h2 class="opt_title">Base Material</h2>
        <div class="swatches">
          ${n.map(([l,m])=>`
            <button
              type="button"
              class="swatch"
              data-base-swatch="${y(l)}"
              style="--swatch: ${y(m.colorHex)}"
              aria-label="${y(m.color)}"
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
          ${Object.entries(e.wrapColorMap).filter(([l])=>a.has(l)).map(([l,m])=>`
            <button
              type="button"
              class="swatch"
              data-wrap-swatch="${y(l)}"
              style="--swatch: ${y(m)}"
              aria-label="${y(l)} wrap"
            ></button>`).join("")}
        </div>
        <div class="opt_meta">
          <span class="opt_name" data-wrap-name></span>
          <span class="opt_price" data-wrap-price></span>
        </div>
      </section>

      ${Or(r,t)}

      <section class="opt" data-section="accessories">
        <h2 class="opt_title">Accessories</h2>
        <div class="acc-list">
          ${t.accessories.map(l=>Dr(l)).join("")}
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
  `}function Or(e,t){return e!=null&&e.length?`
    <section class="opt" data-section="bundles">
      <h2 class="opt_title">Accessory Pack</h2>
      <p class="opt_sub">Curated sets \u2014 tap again to remove</p>
      <div class="bundle-list">
        ${e.map(r=>Nr(r,t)).join("")}
      </div>
    </section>
  `:""}function Nr(e,t){let r=e.products||[],a=r.reduce((o,s)=>{let i=t.accessories.find(u=>u.handle===s.handle),c=Q(i);return o+(c?parseFloat(c.price.amount):0)},0),n=r.slice(0,4).map(o=>{var s;return`<img class="bundle_thumb" src="${y(G((s=o.featuredImage)==null?void 0:s.url,96))}" alt="" loading="lazy" />`}).join("");return`
    <button type="button" class="bundle" data-bundle="${y(e.handle)}">
      <div class="bundle_thumbs">${n}</div>
      <div class="bundle_info">
        <div class="bundle_name">${y(e.label||e.handle)}</div>
        <div class="bundle_count">${r.length} items</div>
      </div>
      <div class="bundle_price">${$(a)}</div>
    </button>
  `}function Dr(e){var r;let t=Q(e);return t?`
    <div class="acc" data-acc="${y(e.handle)}">
      <img class="acc_img" src="${y(G((r=e.featuredImage)==null?void 0:r.url,240))}" alt="${y(e.title)}" loading="lazy" />
      <div class="acc_info">
        <div class="acc_name">${y(e.title)}</div>
        <div class="acc_price">${$(parseFloat(t.price.amount),t.price.currencyCode)}</div>
      </div>
      <button type="button" class="acc_btn" data-acc-toggle="${y(e.handle)}">Add</button>
    </div>
  `:""}function Q(e){return e&&(e.variants.find(t=>t.availableForSale)||e.variants[0])||null}function Yt(e,t){var n;let r=[];if(e.bikeLine){let o=((n=t.variants[e.baseNumericId])==null?void 0:n.color)||e.bikeLine.merchandise.title;r.push({label:`Olto &middot; ${y(o)}`,amount:parseFloat(e.bikeLine.merchandise.price.amount)})}e.wrapLine&&r.push({label:`Wrap &middot; ${y(e.wrapLine.merchandise.title)}`,amount:parseFloat(e.wrapLine.merchandise.price.amount)});for(let o of e.accessoryLines)r.push({label:y(o.merchandise.product.title),amount:parseFloat(o.merchandise.price.amount)});let a=e.quantity>1?`<div class="summary_qty">&times;${e.quantity} configurations</div>`:"";return r.map(o=>`
      <div class="summary_row">
        <span>${o.label}</span>
        <span>${$(o.amount,e.currency)}</span>
      </div>`).join("")+a}var N=window.gsap||null;N&&window.ScrollTrigger&&N.registerPlugin(window.ScrollTrigger);var h=document.querySelector("#app"),E=null,Y=[],Z=new Map,ee="a",pe=null,qr=new Set(["Sand"]),tt=0,rt=null;kr();async function kr(){var t,r;try{[E,Y]=await Promise.all([Ut(S),$t(S)])}catch(a){console.error("[Tesla] Failed to load products:",a),Hr();return}Y=Pr(Y),Z=Vr(E.wrap),xt(E),await Ot(S),Kt({config:S,products:E,bundles:Y}),h.innerHTML=Qt({config:S,products:E,bundles:Y,wrapVariantsByColor:Z}),Mr(),jt(er),er(D()),Wr();let e=jr();e?Gr(e):D().bikeLine||O(E.main.handle,z(S.defaultVariantId)),zr(),ta();for(let a of Z.values())(t=a.image)!=null&&t.url&&(new Image().src=a.image.url);for(let a of E.main.variants)(r=a.image)!=null&&r.url&&(new Image().src=G(a.image.url,1600))}function Pr(e){let t=e.filter(n=>n.handle!=="kids"),r=t.find(n=>n.handle==="basic"),a=E.accessories.find(n=>n.handle==="open-face-helmet");return r&&a&&!r.products.some(n=>n.handle===a.handle)&&(r.products=[...r.products,a]),t}function Vr(e){var r;let t=new Map;if(!e)return t;for(let a of e.variants){let n=(r=a.selectedOptions)==null?void 0:r.find(s=>/colou?rs?/i.test(s.name)),o=(n==null?void 0:n.value)||a.title;o&&t.set(o,a)}return t}function Hr(){h.innerHTML=`
    <div class="boot">
      <div class="boot_mark">INFINITE MACHINE</div>
      <div class="boot_label">Couldn&rsquo;t reach the store. Check your connection.</div>
      <button type="button" class="boot_retry" onclick="location.reload()">Retry</button>
    </div>
  `}function Mr(){h.addEventListener("click",e=>{let t=e.target.closest("[data-base-swatch]");if(t)return Fr(t.dataset.baseSwatch);let r=e.target.closest("[data-wrap-swatch]");if(r)return Ur(r.dataset.wrapSwatch);let a=e.target.closest("[data-acc-toggle]");if(a)return Br(a.dataset.accToggle);let n=e.target.closest("[data-bundle]");if(n)return Kr(n.dataset.bundle);let o=e.target.closest("[data-pay-mode]");if(o)return fe(o.dataset.payMode);if(e.target.closest("[data-qty-dec]"))return Wt(-1);if(e.target.closest("[data-qty-inc]"))return Wt(1);if(e.target.closest("[data-save]"))return Xr()?(e.target.closest("[data-nudge]")&&setTimeout(nt,2200),Qr()):(e.target.closest("[data-nudge]")&&nt(),zt(!0));if(e.target.closest("[data-save-close]"))return zt(!1);if(e.target.closest("[data-nudge-close]"))return nt();if(e.target.closest("[data-config-reset]"))return Yr();if(e.target.closest("[data-cta]"))return Zr();if(e.target.closest("[data-interest-close]"))return ar(!1)}),h.addEventListener("submit",e=>{e.target.closest("[data-save-form]")&&(e.preventDefault(),Jr(e.target))})}function Fr(e){O(E.main.handle,z(e))}function Ur(e){let t=S.wrap.productHandle,r=D().wrapLine;if(!e)return O(t,null);let a=Z.get(e);if(a){if((r==null?void 0:r.merchandise.id)===a.id)return O(t,null);O(t,a.id)}}function Br(e){var n,o;let t=D(),r=t.accessoryLines.some(s=>s.merchandise.product.handle===e),a=S.accessoryDependencies||{};if(r){O(e,null);let s=((n=a[e])==null?void 0:n.requiredBy)||[];for(let i of s)t.accessoryLines.some(c=>c.merchandise.product.handle===i)&&O(i,null);return}Zt(e);for(let[s,i]of Object.entries(a))(o=i.requiredBy)!=null&&o.includes(e)&&(t.accessoryLines.some(u=>u.merchandise.product.handle===s)||Zt(s))}function Zt(e){let t=E.accessories.find(a=>a.handle===e),r=Q(t);r&&O(e,r.id)}var at=!1;async function Kr(e){var t;if(!at){at=!0;try{let r=D(),a=r.activeBundle===e,n=r.accessoryLines.map(i=>i.id).filter(i=>!String(i).startsWith("tmp_"));if(n.length&&await Ue(n),a)return;let o=Y.find(i=>i.handle===e);if(!((t=o==null?void 0:o.products)!=null&&t.length))return;let s=o.products.map(i=>{let c=Q(E.accessories.find(u=>u.handle===i.handle));return c?{variantId:c.id,attributes:{_bundle:e}}:null}).filter(Boolean);s.length&&await Fe(s)}catch(r){console.error("[Tesla] Bundle select failed:",r)}finally{at=!1}}}function Wt(e){let t=D(),r=[t.bikeLine,t.wrapLine,...t.accessoryLines].filter(Boolean),a=Math.min(99,Math.max(1,t.quantity+e));if(a===t.quantity)return;let n=r.filter(o=>!String(o.id).startsWith("tmp_"));Promise.all(n.map(o=>qt({lineId:o.id,quantity:a})))}function jr(){let e=new URLSearchParams(window.location.search).get("d");if(!e)return null;let[t,r,a,n,o]=e.split(".");return!t||!S.variants[t]?null:{base:t,wrap:r||null,qty:Math.min(99,Math.max(1,parseInt(a,10)||1)),pay:["cash","lease","finance"].includes(n)?n:"finance",accs:(o||"").split("~").filter(Boolean)}}async function Gr(e){Me();let t=[{variantId:z(e.base),quantity:e.qty}],r=e.wrap?Z.get(e.wrap):null;r&&t.push({variantId:r.id,quantity:e.qty});for(let n of e.accs){let o=Q(E.accessories.find(s=>s.handle===n));o&&t.push({variantId:o.id,quantity:e.qty})}fe(e.pay);try{await Fe(t)}catch(n){console.error("[Tesla] Failed to apply shared design:",n)}let a=new URLSearchParams(window.location.search);a.delete("d"),window.history.replaceState({},"",`${window.location.pathname}?${a.toString()}`)}function rr(){let e=D(),t=e.wrapLine?or(e.wrapLine.merchandise)||e.wrapLine.merchandise.title:"",r=e.accessoryLines.map(o=>o.merchandise.product.handle).join("~"),a=[e.baseNumericId,t,e.quantity,e.payMode,r].join("."),n=new URL(window.location.href);return n.searchParams.set("d",a),n.toString()}var Xt=null;async function Qr(){let e=rr(),t=[...h.querySelectorAll("[data-save]")];try{await navigator.clipboard.writeText(e);for(let r of t)r.textContent="Link copied"}catch{window.history.replaceState({},"",e);for(let r of t)r.textContent="Link in URL"}clearTimeout(Xt),Xt=setTimeout(()=>{for(let r of t)r.textContent=r.dataset.saveLabel||"Save"},2200)}var te=null;async function Yr(){let e=h.querySelector("[data-config-reset]");if(!te){e&&(e.textContent="Tap again to clear",e.classList.add("is-armed")),te=setTimeout(()=>{te=null,e&&(e.textContent="Clear configuration",e.classList.remove("is-armed"))},3e3);return}clearTimeout(te),te=null,e&&(e.textContent="Clear configuration",e.classList.remove("is-armed"));try{await Dt(le())}catch(t){console.error("[Tesla] Clear failed:",t)}fe("finance"),O(E.main.handle,z(S.defaultVariantId))}function Zr(){let e=D();if(!e.ready)return;if(e.region==="row")return ar(!0);let t=Nt();t&&(window.location.href=t)}var Jt="olto_tesla_nudge";function Wr(){let e=h.querySelector("[data-nudge]"),t=h.querySelector('[data-section="payment"]');if(!e||!t)return;try{if(sessionStorage.getItem(Jt))return}catch{}let r=new IntersectionObserver(a=>{if(a.some(n=>n.isIntersecting)){r.disconnect(),e.hidden=!1,requestAnimationFrame(()=>e.classList.add("is-in"));try{sessionStorage.setItem(Jt,"1")}catch{}}},{threshold:.3});r.observe(t)}function nt(){let e=h.querySelector("[data-nudge]");!e||e.hidden||(e.classList.remove("is-in"),setTimeout(()=>{e.hidden=!0},450))}function ar(e){let t=h.querySelector("[data-interest]");t&&(t.hidden=!e)}var nr="olto_tesla_lead";function Xr(){try{let e=JSON.parse(localStorage.getItem(nr));return e!=null&&e.email?e:null}catch{return null}}function zt(e){var r;let t=h.querySelector("[data-save-modal]");if(t&&(t.hidden=!e,e)){let a=t.querySelector("[data-save-form]"),n=t.querySelector("[data-save-done]");a&&(a.hidden=!1),n&&(n.hidden=!0),(r=t.querySelector('input[name="name"]'))==null||r.focus()}}async function Jr(e){let t=e.name.value.trim(),r=e.email.value.trim(),a=e.phone.value.trim(),n=e.querySelector("[data-save-error]"),o=null;if(t?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)?a.replace(/\D/g,"").length<7&&(o="That phone number looks too short."):o="That email doesn\u2019t look right.":o="Please add your name.",o){n&&(n.textContent=o,n.hidden=!1);return}n&&(n.hidden=!0);try{localStorage.setItem(nr,JSON.stringify({name:t,email:r,phone:a}))}catch{}let s=rr(),i=!0;try{await navigator.clipboard.writeText(s)}catch{i=!1}e.hidden=!0;let c=h.querySelector("[data-save-done]");if(c){c.hidden=!1;let u=c.querySelector("[data-save-done-msg]");u&&(u.textContent=i?"Link copied to your clipboard \u2014 it rebuilds this exact Olto.":"Copy your link below \u2014 it rebuilds this exact Olto.");let d=c.querySelector("[data-save-link]");d&&(d.textContent=s)}}async function zr(){let e=new AbortController,t=setTimeout(()=>e.abort(),8e3);try{let a=(await(await fetch("https://get.geojs.io/v1/ip/country",{signal:e.signal})).text()).trim().toUpperCase();Xe(["US","CA"].includes(a)?"us":"row")}catch{Xe("")}finally{clearTimeout(t)}}function er(e){var k,F,P,ot,st;if(!e.ready)return;let t=S.variants[e.baseNumericId]||{};q("[data-base-name]",t.color||""),q("[data-delivery]",t.delivery?`Est. delivery ${t.delivery}`:"");for(let p of h.querySelectorAll("[data-base-swatch]"))p.classList.toggle("is-selected",p.dataset.baseSwatch===e.baseNumericId);let r=e.wrapLine?or(e.wrapLine.merchandise)||e.wrapLine.merchandise.title:"",a=new Set(e.accessoryLines.map(p=>p.merchandise.product.handle)),n={},o=new Set;for(let p of S.customImageRules||[])if(p.when.every(_=>a.has(_))){Object.assign(n,p.replace||{});for(let _ of p.hide||[])o.add(_)}let s=!1;for(let p of h.querySelectorAll("[data-layer]")){let _=p.dataset.layer,it=a.has(_)&&!o.has(_),me=n[_]||et[_];me&&p.getAttribute("src")!==me&&p.setAttribute("src",me),p.classList.toggle("is-on",it),it&&(s=!0)}let i=(F=(k=E.main.variants.find(p=>We(p.id)===e.baseNumericId))==null?void 0:k.image)==null?void 0:F.url,c=e.region==="row"?"eu":"us",u=(c==="eu"?t.backgroundImage:G(i,1600))||G(i,1600)||t.backgroundImage,d=e.wrapLine?(ot=(P=Z.get(r))==null?void 0:P.image)==null?void 0:ot.url:null,l=d&&!qr.has(r);d&&(l||!s)?tr(d,`wrap:${r}`):tr(u,`base:${e.baseNumericId}:${c}`),q("[data-wrap-name]",e.wrapLine?r:"None"),q("[data-wrap-price]",e.wrapLine?$(parseFloat(e.wrapLine.merchandise.price.amount),e.currency):"Included");for(let p of h.querySelectorAll("[data-wrap-swatch]")){let _=p.dataset.wrapSwatch==="";p.classList.toggle("is-selected",e.wrapLine?p.dataset.wrapSwatch===r:_)}for(let p of h.querySelectorAll("[data-bundle]"))p.classList.toggle("is-selected",p.dataset.bundle===e.activeBundle);let m=new Set(e.accessoryLines.map(p=>p.merchandise.product.handle));for(let p of h.querySelectorAll("[data-acc-toggle]")){let _=m.has(p.dataset.accToggle);p.textContent=_?"Added":"Add",p.classList.toggle("is-added",_),(st=p.closest("[data-acc]"))==null||st.classList.toggle("is-added",_)}q("[data-qty-value]",String(e.quantity));let g=h.querySelector("[data-summary]");g&&(g.innerHTML=Yt(e,S)),q("[data-summary-total]",$(e.total,e.currency));let C=Gt(e.total,e.currency,e.payMode);for(let p of h.querySelectorAll("[data-pay-mode]"))p.classList.toggle("is-active",p.dataset.payMode===e.payMode);q("[data-pay-figure]",$(C.amount,e.currency)+C.suffix),q("[data-pay-sub]",C.sub),ea(C.amount,C.suffix,e.currency),q("[data-total-label]",C.label);let R=h.querySelector("[data-cta]");R&&(R.textContent=e.region==="row"?"Register interest":"Order")}function or(e){var r;let t=(r=e.selectedOptions)==null?void 0:r.find(a=>/colou?rs?/i.test(a.name));return(t==null?void 0:t.value)||null}function q(e,t){let r=h.querySelector(e);r&&r.textContent!==t&&(r.textContent=t)}function ea(e,t,r){let a=h.querySelector("[data-total]");if(a){if(N&&!document.hidden&&tt!==e){rt&&rt.kill();let n={v:tt};rt=N.to(n,{v:e,duration:.45,ease:"power2.out",onUpdate:()=>{a.textContent=$(n.v,r)+t},onComplete:()=>{a.textContent=$(e,r)+t}})}else a.textContent=$(e,r)+t;tt=e}}function tr(e,t){if(!e||t===pe)return;let r={a:h.querySelector('[data-hero-img="a"]'),b:h.querySelector('[data-hero-img="b"]')};if(!r.a||!r.b)return;if(pe===null){r[ee].src=e,pe=t;return}let a=r[ee],n=r[ee==="a"?"b":"a"];n.src=e,ee=ee==="a"?"b":"a",pe=t,N?(N.set(n,{opacity:0,scale:1.04,xPercent:0,yPercent:0}),n.classList.add("is-active"),N.to(n,{opacity:1,scale:1,duration:.45,ease:"power2.out"}),N.to(a,{opacity:0,duration:.45,ease:"power2.out",onComplete:()=>a.classList.remove("is-active")})):(n.classList.add("is-active"),n.style.opacity=1,a.classList.remove("is-active"),a.style.opacity=0)}function ta(){if(!N||!window.ScrollTrigger||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let e=h.querySelector(".sheet");for(let t of h.querySelectorAll(".opt"))N.from(t,{y:24,opacity:0,duration:.45,ease:"power2.out",scrollTrigger:{trigger:t,scroller:e,start:"top 88%",once:!0}})}})();
