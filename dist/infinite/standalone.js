"use strict";(()=>{var Ht={id:"olto",steps:[{type:"location",no:"01",title:"Location",validation:!0,collapsible:!1},{type:"variant",no:"02",title:"Base"},{type:"wrap",no:"03",title:"Wrap"},{type:"bundle",no:"04",title:"Accessory Pack"},{type:"accessories",no:"05",title:"Configure your Accessories"},{type:"quantity",no:"06",title:"Quantity"}],product:{handle:"olto-1"},accessoriesCollection:"olto-accessories",testInstructionVideo:"https://vz-19725589-529.b-cdn.net/a4c98a2a-412b-4e2e-a2ce-4e9a64123464/playlist.m3u8",wrap:{productHandle:"olto-wrap"},bundles:{metaobjectType:"bundles"},variants:{44842879156380:{color:"Black",colorHex:"#000000",delivery:"July 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff73905e7daa5ef224c5d5_olto-eu-black.avif"},44842879123612:{color:"Silver",colorHex:"#D9D9D9",delivery:"August 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff7390e94ecc537b713a30_olto-eu-silver.avif"}},defaultVariantId:"44842879156380",wrapColorMap:{Sand:"#DECEAF",Blush:"#F6C6DC",Sky:"#707A8D",Forest:"#627063",Crimson:"#B44C47"},accessoryDependencies:{"olto-rear-rack":{requiredBy:["olto-rear-basket","olto-side-mounting-plate"]}},customImageRules:[{when:["olto-soft-bag","olto-rear-basket"],replace:{"olto-soft-bag":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/69219c3d619077ba6f1689ed_Soft%20Bag%20in%20Rear%20Basket.avif"}},{when:["olto-charging-dock","olto-battery"],replace:{"olto-battery":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6921a4037d0eab061d3d7ca4_Battery%20Dock%20with%20Battery%20Plugged%20in.avif"},hide:["olto-charging-dock"]}]};var G="GraphQL Client";var De="An error occurred while fetching from the API. Review 'graphQLErrors' for details.",Pe="Response returned unexpected Content-Type:",He="An unknown error has occurred. The API did not return a data object or any errors in its response.",me={json:"application/json",multipart:"multipart/mixed"},Be="X-SDK-Variant",qe="X-SDK-Version",qt="shopify-graphql-client",Vt="1.4.2",he=1e3,Ft=[429,503],Ve=/@(defer)\b/i,Bt=`\r
`,Ut=/boundary="?([^=";]+)"?/i,Fe=Bt+Bt;function D(e,t=G){return e.startsWith(`${t}`)?e:`${t}: ${e}`}function P(e){return e instanceof Error?e.message:JSON.stringify(e)}function Ue(e){return e instanceof Error&&e.cause?e.cause:void 0}function ze(e){return e.flatMap(({errors:t})=>t!=null?t:[])}function ge({client:e,retries:t}){if(t!==void 0&&(typeof t!="number"||t<0||t>3))throw new Error(`${e}: The provided "retries" value (${t}) is invalid - it cannot be less than ${0} or greater than ${3}`)}function E(e,t){return t&&(typeof t!="object"||Array.isArray(t)||typeof t=="object"&&Object.keys(t).length>0)?{[e]:t}:{}}function je(e,t){if(e.length===0)return t;let o={[e.pop()]:t};return e.length===0?o:je(e,o)}function Gt(e,t){return Object.keys(t||{}).reduce((a,o)=>(typeof t[o]=="object"||Array.isArray(t[o]))&&e[o]?(a[o]=Gt(e[o],t[o]),a):(a[o]=t[o],a),Array.isArray(e)?[...e]:{...e})}function Ge([e,...t]){return t.reduce(Gt,{...e})}function Ke({clientLogger:e,customFetchApi:t=fetch,client:a=G,defaultRetryWaitTime:o=he,retriableCodes:n=Ft}){let r=async(i,s,l)=>{let c=s+1,h=l+1,m;try{if(m=await t(...i),e({type:"HTTP-Response",content:{requestParams:i,response:m}}),!m.ok&&n.includes(m.status)&&c<=h)throw new Error;let d=(m==null?void 0:m.headers.get("X-Shopify-API-Deprecated-Reason"))||"";return d&&e({type:"HTTP-Response-GraphQL-Deprecation-Notice",content:{requestParams:i,deprecationNotice:d}}),m}catch(d){if(c<=h){let y=m==null?void 0:m.headers.get("Retry-After");return await Za(y?parseInt(y,10):o),e({type:"HTTP-Retry",content:{requestParams:i,lastResponse:m,retryAttempt:s,maxRetries:l}}),r(i,c,l)}throw new Error(D(`${l>0?`Attempted maximum number of ${l} network retries. Last message - `:""}${P(d)}`,a))}};return r}async function Za(e){return new Promise(t=>setTimeout(t,e))}function We({headers:e,url:t,customFetchApi:a=fetch,retries:o=0,logger:n}){ge({client:G,retries:o});let r={headers:e,url:t,retries:o},i=Ja(n),s=Ke({customFetchApi:a,clientLogger:i,defaultRetryWaitTime:he}),l=Xa(s,r),c=eo(l),h=so(l);return{config:r,fetch:l,request:c,requestStream:h}}function Ja(e){return t=>{e&&e(t)}}async function Kt(e){let{errors:t,data:a,extensions:o}=await e.json();return{...E("data",a),...E("extensions",o),headers:e.headers,...t||!a?{errors:{networkStatusCode:e.status,message:D(t?De:He),...E("graphQLErrors",t),response:e}}:{}}}function Xa(e,{url:t,headers:a,retries:o}){return async(n,r={})=>{let{variables:i,headers:s,url:l,retries:c,keepalive:h,signal:m}=r,d=JSON.stringify({query:n,variables:i});ge({client:G,retries:c});let y=Object.entries({...a,...s}).reduce((S,[k,w])=>(S[k]=Array.isArray(w)?w.join(", "):w.toString(),S),{});!y[Be]&&!y[qe]&&(y[Be]=qt,y[qe]=Vt);let v=[l!=null?l:t,{method:"POST",headers:y,body:d,signal:m,keepalive:h}];return e(v,1,c!=null?c:o)}}function eo(e){return async(...t)=>{if(Ve.test(t[0]))throw new Error(D("This operation will result in a streamable response - use requestStream() instead."));let a=null;try{a=await e(...t);let{status:o,statusText:n}=a,r=a.headers.get("content-type")||"";return a.ok?r.includes(me.json)?await Kt(a):{errors:{networkStatusCode:o,message:D(`${Pe} ${r}`),response:a}}:{errors:{networkStatusCode:o,message:D(n),response:a}}}catch(o){return{errors:{message:P(o),...a==null?{}:{networkStatusCode:a.status,response:a}}}}}}async function*to(e){let t=new TextDecoder;if(e.body[Symbol.asyncIterator])for await(let a of e.body)yield t.decode(a);else{let a=e.body.getReader(),o;try{for(;!(o=await a.read()).done;)yield t.decode(o.value)}finally{a.cancel()}}}function ao(e,t){return{async*[Symbol.asyncIterator](){try{let a="";for await(let o of e)if(a+=o,a.indexOf(t)>-1){let n=a.lastIndexOf(t),i=a.slice(0,n).split(t).filter(s=>s.trim().length>0).map(s=>s.slice(s.indexOf(Fe)+Fe.length).trim());i.length>0&&(yield i),a=a.slice(n+t.length),a.trim()==="--"&&(a="")}}catch(a){throw new Error(`Error occured while processing stream payload - ${P(a)}`)}}}}function oo(e){return{async*[Symbol.asyncIterator](){try{yield{...await Kt(e),hasNext:!1}}catch(t){yield{errors:{message:D(P(t)),networkStatusCode:e.status,response:e},hasNext:!1}}}}}function no(e){return e.map(t=>{try{return JSON.parse(t)}catch(a){throw new Error(`Error in parsing multipart response - ${P(a)}`)}}).map(t=>{let{data:a,incremental:o,hasNext:n,extensions:r,errors:i}=t;if(!o)return{data:a||{},...E("errors",i),...E("extensions",r),hasNext:n};let s=o.map(({data:l,path:c,errors:h})=>({data:l&&c?je(c,l):{},...E("errors",h)}));return{data:s.length===1?s[0].data:Ge([...s.map(({data:l})=>l)]),...E("errors",ze(s)),hasNext:n}})}function ro(e,t){if(e.length>0)throw new Error(De,{cause:{graphQLErrors:e}});if(Object.keys(t).length===0)throw new Error(He)}function io(e,t){var s,l;let a=(t!=null?t:"").match(Ut),o=`--${a?a[1]:"-"}`;if(!((s=e.body)!=null&&s.getReader)&&!((l=e.body)!=null&&l[Symbol.asyncIterator]))throw new Error("API multipart response did not return an iterable body",{cause:e});let n=to(e),r={},i;return{async*[Symbol.asyncIterator](){var c,h;try{let m=!0;for await(let d of ao(n,o)){let y=no(d);i=(h=(c=y.find(S=>S.extensions))==null?void 0:c.extensions)!=null?h:i;let v=ze(y);r=Ge([r,...y.map(({data:S})=>S)]),m=y.slice(-1)[0].hasNext,ro(v,r),yield{...E("data",r),...E("extensions",i),hasNext:m}}if(m)throw new Error("Response stream terminated unexpectedly")}catch(m){let d=Ue(m);yield{...E("data",r),...E("extensions",i),errors:{message:D(P(m)),networkStatusCode:e.status,...E("graphQLErrors",d==null?void 0:d.graphQLErrors),response:e},hasNext:!1}}}}}function so(e){return async(...t)=>{if(!Ve.test(t[0]))throw new Error(D("This operation does not result in a streamable response - use request() instead."));try{let a=await e(...t),{statusText:o}=a;if(!a.ok)throw new Error(o,{cause:a});let n=a.headers.get("content-type")||"";switch(!0){case n.includes(me.json):return oo(a);case n.includes(me.multipart):return io(a,n);default:throw new Error(`${Pe} ${n}`,{cause:a})}}catch(a){return{async*[Symbol.asyncIterator](){let o=Ue(a);yield{errors:{message:D(P(a)),...E("networkStatusCode",o==null?void 0:o.status),...E("response",o)},hasNext:!1}}}}}}function Ye({client:e,storeDomain:t}){try{if(!t||typeof t!="string")throw new Error;let a=t.trim(),o=a.match(/^https?:/)?a:`https://${a}`,n=new URL(o);return n.protocol="https",n.origin}catch(a){throw new Error(`${e}: a valid store domain ("${t}") must be provided`,{cause:a})}}function ye({client:e,currentSupportedApiVersions:t,apiVersion:a,logger:o}){let n=`${e}: the provided apiVersion ("${a}")`,r=`Currently supported API versions: ${t.join(", ")}`;if(!a||typeof a!="string")throw new Error(`${n} is invalid. ${r}`);let i=a.trim();t.includes(i)||(o?o({type:"Unsupported_Api_Version",content:{apiVersion:a,supportedApiVersions:t}}):console.warn(`${n} is likely deprecated or not supported. ${r}`))}function we(e){let t=e*3-2;return t===10?t:`0${t}`}function Qe(e,t,a){let o=t-a;return o<=0?`${e-1}-${we(o+4)}`:`${e}-${we(o)}`}function Wt(){let e=new Date,t=e.getUTCMonth(),a=e.getUTCFullYear(),o=Math.floor(t/3+1);return{year:a,quarter:o,version:`${a}-${we(o)}`}}function Ze(){let{year:e,quarter:t,version:a}=Wt(),o=t===4?`${e+1}-01`:`${e}-${we(t+1)}`;return[Qe(e,t,3),Qe(e,t,2),Qe(e,t,1),a,o,"unstable"]}function Je(e){return t=>({...t!=null?t:{},...e.headers})}function Xe({getHeaders:e,getApiUrl:t}){return(a,o)=>{let n=[a];if(o&&Object.keys(o).length>0){let{variables:r,apiVersion:i,headers:s,retries:l,signal:c}=o;n.push({...r?{variables:r}:{},...s?{headers:e(s)}:{},...i?{url:t(i)}:{},...l?{retries:l}:{},...c?{signal:c}:{}})}return n}}var et="application/json",Yt="storefront-api-client",Qt="1.0.10",Zt="X-Shopify-Storefront-Access-Token",Jt="Shopify-Storefront-Private-Token",Xt="X-SDK-Variant",ea="X-SDK-Version",ta="X-SDK-Variant-Source",K="Storefront API Client";function aa(e){if(e&&typeof window!="undefined")throw new Error(`${K}: private access tokens and headers should only be used in a server-to-server implementation. Use the public API access token in nonserver environments.`)}function oa(e,t){if(!e&&!t)throw new Error(`${K}: a public or private access token must be provided`);if(e&&t)throw new Error(`${K}: only provide either a public or private access token`)}function tt({storeDomain:e,apiVersion:t,publicAccessToken:a,privateAccessToken:o,clientName:n,retries:r=0,customFetchApi:i,logger:s}){let l=Ze(),c=Ye({client:K,storeDomain:e}),h={client:K,currentSupportedApiVersions:l,logger:s};ye({...h,apiVersion:t}),oa(a,o),aa(o);let m=lo(c,t,h),d={storeDomain:c,apiVersion:t,...a?{publicAccessToken:a}:{privateAccessToken:o},headers:{"Content-Type":et,Accept:et,[Xt]:Yt,[ea]:Qt,...n?{[ta]:n}:{},...a?{[Zt]:a}:{[Jt]:o}},apiUrl:m(),clientName:n},y=We({headers:d.headers,url:d.apiUrl,retries:r,customFetchApi:i,logger:s}),v=Je(d),S=co(d,m),k=Xe({getHeaders:v,getApiUrl:S});return Object.freeze({config:d,getHeaders:v,getApiUrl:S,fetch:(...$)=>y.fetch(...k(...$)),request:(...$)=>y.request(...k(...$)),requestStream:(...$)=>y.requestStream(...k(...$))})}function lo(e,t,a){return o=>{o&&ye({...a,apiVersion:o});let n=(o!=null?o:t).trim();return`${e}/api/${n}/graphql.json`}}function co(e,t){return a=>a?t(a):e.apiUrl}var be={SHOPIFY_STORE_DOMAIN:"shop.infinitemachine.com",SHOPIFY_STOREFRONT_PUBLIC_TOKEN:"eefb42e32220791a7472aaa5d2cf2182",SHOPIFY_API_VERSION:"2026-04"};var z=tt({storeDomain:be.SHOPIFY_STORE_DOMAIN,apiVersion:be.SHOPIFY_API_VERSION,publicAccessToken:be.SHOPIFY_STOREFRONT_PUBLIC_TOKEN});var ia="olto_cart_",uo="cfg_",ot="config",O=null,u=null,Z=null,rt=null,R=null,ve=[],po=[];function B(e){Z=e,u=e}var ie=null;function sa(e){ie=e}async function la(e){var a;rt=e.id,R=na()||fa();let t=go();if(t)try{let o=await mo(t);o&&(O=t,B(o))}catch(o){console.warn("[Cart] Failed to restore cart, will create new:",o)}if(!O){let o=await fo();B(o),O=o.id,yo(O)}if(!na()&&((a=u==null?void 0:u.lines)!=null&&a.length)){let o=ho(u);o&&(R=o)}return ha(R),L(),ma(),u}function it(){return u}function st(){return u==null?void 0:u.checkoutUrl}function J(){return R}function lt(){return R=fa(),ha(R),ma(),R}async function ca(e){X();let t=Z,a=((t==null?void 0:t.lines)||[]).filter(o=>{var n;return((n=o.attributesByKey)==null?void 0:n._config_id)===e}).map(o=>o.id);a.length!==0&&(await xe(a),e===R&&lt())}async function ct(e){X();let t=u,a=nt(R),o=e.map(r=>ya(r.variantId,r.quantity||a,{...r.attributes||{},_config_id:R})).filter(Boolean);o.length&&(u=wa(u,o),L());let n=e.map(r=>({merchandiseId:r.variantId,quantity:r.quantity||a,attributes:se({...r.attributes||{},_config_id:R})}));try{return B(await Ce(()=>W("cartLinesAdd",`
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ${q} }
          userErrors { field message }
        }
      }
    `,{cartId:O,lines:n}))),L(),u}catch(r){throw u=t,L(),r}}async function xe(e){X();let t=u,a=new Set(e);u&&(u={...u,lines:u.lines.filter(o=>!a.has(o.id))},L());try{return B(await Ce(()=>W("cartLinesRemove",`
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ${q} }
          userErrors { field message }
        }
      }
    `,{cartId:O,lineIds:e}))),L(),u}catch(o){throw u=t,L(),o}}async function da({lineId:e,variantId:t,quantity:a,attributes:o}){X();let n=u;u&&(u={...u,lines:u.lines.map(i=>{if(i.id!==e)return i;let s={...i};if(t!==void 0){let l=ut(t)||i.merchandise;s.merchandise=l}if(a!==void 0&&(s.quantity=a),o!==void 0){let l=se(o);s.attributes=l,s.attributesByKey=Object.fromEntries(l.map(c=>[c.key,c.value]))}return s})},L());let r={id:e};t!==void 0&&(r.merchandiseId=t),a!==void 0&&(r.quantity=a),o!==void 0&&(r.attributes=se(o));try{return B(await Ce(()=>W("cartLinesUpdate",`
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ${q} }
          userErrors { field message }
        }
      }
    `,{cartId:O,lines:[r]}))),L(),u}catch(i){throw u=n,L(),i}}async function ua(e){X();let t=[...new Set((e||[]).filter(Boolean))];return ga("cart:discounts",async()=>{B(await W("cartDiscountCodesUpdate",`
      mutation($cartId: ID!, $discountCodes: [String!]!) {
        cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
          cart { ${q} } userErrors { field message }
        }
      }
    `,{cartId:O,discountCodes:t})),L()})}function pa(e){return ve.push(e),u&&e(u),()=>{ve=ve.filter(t=>t!==e)}}var q=`
  id
  checkoutUrl
  totalQuantity
  attributes { key value }
  discountCodes { code applicable }
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
        discountAllocations { discountedAmount { amount currencyCode } }
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
`;async function fo(){var o;let{data:e,errors:t}=await z.request(`
    mutation CartCreate {
      cartCreate(input: {}) {
        cart { ${q} }
        userErrors { field message }
      }
    }
  `);if(t)throw new Error(`[Cart] createCart errors: ${JSON.stringify(t)}`);let a=(o=e==null?void 0:e.cartCreate)==null?void 0:o.userErrors;if(a!=null&&a.length)throw new Error(`[Cart] createCart userErrors: ${JSON.stringify(a)}`);return dt(e.cartCreate.cart)}async function mo(e){let{data:t,errors:a}=await z.request(`
    query GetCart($id: ID!) {
      cart(id: $id) { ${q} }
    }
  `,{variables:{id:e}});if(a)throw new Error(`[Cart] queryCart errors: ${JSON.stringify(a)}`);return t!=null&&t.cart?dt(t.cart):null}async function W(e,t,a){var i;let{data:o,errors:n}=await z.request(t,{variables:a});if(n)throw new Error(`[Cart] ${e} errors: ${JSON.stringify(n)}`);let r=o==null?void 0:o[e];if((i=r==null?void 0:r.userErrors)!=null&&i.length)throw new Error(`[Cart] ${e} userErrors: ${JSON.stringify(r.userErrors)}`);return dt(r.cart)}function dt(e){let t=e.attributes||[];return{id:e.id,checkoutUrl:e.checkoutUrl,totalQuantity:e.totalQuantity,cost:e.cost,attributes:t,attributesByKey:Object.fromEntries(t.map(a=>[a.key,a.value])),lines:e.lines.edges.map(({node:a})=>({id:a.id,quantity:a.quantity,attributes:a.attributes,attributesByKey:Object.fromEntries(a.attributes.map(o=>[o.key,o.value])),discountedAmount:(a.discountAllocations||[]).reduce((o,n)=>{var r;return o+parseFloat(((r=n.discountedAmount)==null?void 0:r.amount)||0)},0),merchandise:a.merchandise}))}}function se(e){return Object.entries(e).filter(([,t])=>t!=null&&t!=="").map(([t,a])=>({key:t,value:String(a)}))}function X(){if(!O)throw new Error("[Cart] Called before initCart(config)")}function L(){for(let e of ve)e(u)}function fa(){return`${uo}${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function nt(e){var o;let t=Z||u;if(!((o=t==null?void 0:t.lines)!=null&&o.length))return 1;let a=t.lines.find(n=>{var r;return((r=n.attributesByKey)==null?void 0:r._config_id)===e});return(a==null?void 0:a.quantity)||1}function ma(){for(let e of po)e(R)}function na(){return typeof window=="undefined"?null:new URLSearchParams(window.location.search).get(ot)}function ha(e){if(typeof window=="undefined")return;let t=new URLSearchParams(window.location.search);e?t.set(ot,e):t.delete(ot),window.history.replaceState({},"",`${window.location.pathname}?${t.toString()}`)}function ho(e){var a;if(!((a=e==null?void 0:e.lines)!=null&&a.length))return null;let t=e.lines.map(o=>{var n;return(n=o.attributesByKey)==null?void 0:n._config_id}).filter(Boolean).sort();return t[t.length-1]||null}var ra=Promise.resolve();async function Ce(e){let t=ra,a;ra=new Promise(o=>{a=o}),await t;try{return await e()}finally{a()}}var at=new Map;function ga(e,t){let a=at.get(e)||{inflight:null,latest:null};return a.latest=t,at.set(e,a),a.inflight||(a.inflight=(async()=>{for(;a.latest;){let o=a.latest;a.latest=null;try{await Ce(o)}catch(n){console.error(`[Cart] coalesce(${e}) error:`,n)}}a.inflight=null,at.delete(e)})()),a.inflight}async function _e(e,t){X();let a=R;if(u){let o=u.lines.findIndex(n=>{var r;return n.merchandise.product.handle===e&&((r=n.attributesByKey)==null?void 0:r._config_id)===a});if(o>=0&&t===null)u={...u,lines:u.lines.filter((n,r)=>r!==o)};else if(o>=0&&t){let n=ut(t);n&&(u={...u,lines:u.lines.map((r,i)=>i===o?{...r,merchandise:n}:r)})}else if(o<0&&t){let n=nt(a),r=ya(t,n,{_config_id:a});r&&(u=wa(u,[r]))}L()}return ga(`product:${e}:${a}`,async()=>{let o=Z==null?void 0:Z.lines.find(n=>{var r;return n.merchandise.product.handle===e&&((r=n.attributesByKey)==null?void 0:r._config_id)===a});if(t===null){o&&(B(await W("cartLinesRemove",`
          mutation($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart { ${q} } userErrors { field message }
            }
          }
        `,{cartId:O,lineIds:[o.id]})),L());return}if(o)B(await W("cartLinesUpdate",`
        mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart { ${q} } userErrors { field message }
          }
        }
      `,{cartId:O,lines:[{id:o.id,merchandiseId:t}]}));else{let n=nt(a);B(await W("cartLinesAdd",`
        mutation($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart { ${q} } userErrors { field message }
          }
        }
      `,{cartId:O,lines:[{merchandiseId:t,quantity:n,attributes:se({_config_id:a})}]}))}L()})}function ut(e){if(!ie)return null;let t=[ie.main,ie.wrap,...ie.accessories||[]].filter(Boolean);for(let a of t){let o=a.variants.find(n=>n.id===e);if(o)return{id:o.id,title:o.title,price:o.price,image:o.image,selectedOptions:o.selectedOptions,product:{id:a.id,handle:a.handle,title:a.title}}}return null}function ya(e,t,a){let o=ut(e);if(!o)return null;let n=se(a);return{id:`tmp_${Math.random().toString(36).slice(2,10)}`,quantity:t,attributes:n,attributesByKey:Object.fromEntries(n.map(r=>[r.key,r.value])),merchandise:o}}function wa(e,t){return e&&{...e,lines:[...e.lines,...t],totalQuantity:(e.totalQuantity||0)+t.reduce((a,o)=>a+(o.quantity||1),0)}}function go(){return typeof localStorage=="undefined"?null:localStorage.getItem(`${ia}${rt}`)}function yo(e){typeof localStorage!="undefined"&&localStorage.setItem(`${ia}${rt}`,e)}var Se=[{Name:"United States",Code:"US"},{Name:"Afghanistan",Code:"AF"},{Name:"Albania",Code:"AL"},{Name:"Algeria",Code:"DZ"},{Name:"American Samoa",Code:"AS"},{Name:"Andorra",Code:"AD"},{Name:"Angola",Code:"AO"},{Name:"Anguilla",Code:"AI"},{Name:"Antarctica",Code:"AQ"},{Name:"Antigua and Barbuda",Code:"AG"},{Name:"Argentina",Code:"AR"},{Name:"Armenia",Code:"AM"},{Name:"Aruba",Code:"AW"},{Name:"Australia",Code:"AU"},{Name:"Austria",Code:"AT"},{Name:"Azerbaijan",Code:"AZ"},{Name:"Bahamas",Code:"BS"},{Name:"Bahrain",Code:"BH"},{Name:"Bangladesh",Code:"BD"},{Name:"Barbados",Code:"BB"},{Name:"Belarus",Code:"BY"},{Name:"Belgium",Code:"BE"},{Name:"Belize",Code:"BZ"},{Name:"Benin",Code:"BJ"},{Name:"Bermuda",Code:"BM"},{Name:"Bhutan",Code:"BT"},{Name:"Bolivia, Plurinational State of",Code:"BO"},{Name:"Bonaire, Sint Eustatius and Saba",Code:"BQ"},{Name:"Bosnia and Herzegovina",Code:"BA"},{Name:"Botswana",Code:"BW"},{Name:"Bouvet Island",Code:"BV"},{Name:"Brazil",Code:"BR"},{Name:"British Indian Ocean Territory",Code:"IO"},{Name:"Brunei Darussalam",Code:"BN"},{Name:"Bulgaria",Code:"BG"},{Name:"Burkina Faso",Code:"BF"},{Name:"Burundi",Code:"BI"},{Name:"Cambodia",Code:"KH"},{Name:"Cameroon",Code:"CM"},{Name:"Canada",Code:"CA"},{Name:"Cape Verde",Code:"CV"},{Name:"Cayman Islands",Code:"KY"},{Name:"Central African Republic",Code:"CF"},{Name:"Chad",Code:"TD"},{Name:"Chile",Code:"CL"},{Name:"China",Code:"CN"},{Name:"Christmas Island",Code:"CX"},{Name:"Cocos (Keeling) Islands",Code:"CC"},{Name:"Colombia",Code:"CO"},{Name:"Comoros",Code:"KM"},{Name:"Congo",Code:"CG"},{Name:"Congo, the Democratic Republic of the",Code:"CD"},{Name:"Cook Islands",Code:"CK"},{Name:"Costa Rica",Code:"CR"},{Name:"Croatia",Code:"HR"},{Name:"Cuba",Code:"CU"},{Name:"Cura\xE7ao",Code:"CW"},{Name:"Cyprus",Code:"CY"},{Name:"Czech Republic",Code:"CZ"},{Name:"C\xF4te d'Ivoire",Code:"CI"},{Name:"Denmark",Code:"DK"},{Name:"Djibouti",Code:"DJ"},{Name:"Dominica",Code:"DM"},{Name:"Dominican Republic",Code:"DO"},{Name:"Ecuador",Code:"EC"},{Name:"Egypt",Code:"EG"},{Name:"El Salvador",Code:"SV"},{Name:"Equatorial Guinea",Code:"GQ"},{Name:"Eritrea",Code:"ER"},{Name:"Estonia",Code:"EE"},{Name:"Ethiopia",Code:"ET"},{Name:"Falkland Islands (Malvinas)",Code:"FK"},{Name:"Faroe Islands",Code:"FO"},{Name:"Fiji",Code:"FJ"},{Name:"Finland",Code:"FI"},{Name:"France",Code:"FR"},{Name:"French Guiana",Code:"GF"},{Name:"French Polynesia",Code:"PF"},{Name:"French Southern Territories",Code:"TF"},{Name:"Gabon",Code:"GA"},{Name:"Gambia",Code:"GM"},{Name:"Georgia",Code:"GE"},{Name:"Germany",Code:"DE"},{Name:"Ghana",Code:"GH"},{Name:"Gibraltar",Code:"GI"},{Name:"Greece",Code:"GR"},{Name:"Greenland",Code:"GL"},{Name:"Grenada",Code:"GD"},{Name:"Guadeloupe",Code:"GP"},{Name:"Guam",Code:"GU"},{Name:"Guatemala",Code:"GT"},{Name:"Guernsey",Code:"GG"},{Name:"Guinea",Code:"GN"},{Name:"Guinea-Bissau",Code:"GW"},{Name:"Guyana",Code:"GY"},{Name:"Haiti",Code:"HT"},{Name:"Heard Island and McDonald Islands",Code:"HM"},{Name:"Holy See (Vatican City State)",Code:"VA"},{Name:"Honduras",Code:"HN"},{Name:"Hong Kong",Code:"HK"},{Name:"Hungary",Code:"HU"},{Name:"Iceland",Code:"IS"},{Name:"India",Code:"IN"},{Name:"Indonesia",Code:"ID"},{Name:"Iran, Islamic Republic of",Code:"IR"},{Name:"Iraq",Code:"IQ"},{Name:"Ireland",Code:"IE"},{Name:"Isle of Man",Code:"IM"},{Name:"Israel",Code:"IL"},{Name:"Italy",Code:"IT"},{Name:"Jamaica",Code:"JM"},{Name:"Japan",Code:"JP"},{Name:"Jersey",Code:"JE"},{Name:"Jordan",Code:"JO"},{Name:"Kazakhstan",Code:"KZ"},{Name:"Kenya",Code:"KE"},{Name:"Kiribati",Code:"KI"},{Name:"Korea, Democratic People's Republic of",Code:"KP"},{Name:"Korea, Republic of",Code:"KR"},{Name:"Kuwait",Code:"KW"},{Name:"Kyrgyzstan",Code:"KG"},{Name:"Lao People's Democratic Republic",Code:"LA"},{Name:"Latvia",Code:"LV"},{Name:"Lebanon",Code:"LB"},{Name:"Lesotho",Code:"LS"},{Name:"Liberia",Code:"LR"},{Name:"Libya",Code:"LY"},{Name:"Liechtenstein",Code:"LI"},{Name:"Lithuania",Code:"LT"},{Name:"Luxembourg",Code:"LU"},{Name:"Macao",Code:"MO"},{Name:"Macedonia, the Former Yugoslav Republic of",Code:"MK"},{Name:"Madagascar",Code:"MG"},{Name:"Malawi",Code:"MW"},{Name:"Malaysia",Code:"MY"},{Name:"Maldives",Code:"MV"},{Name:"Mali",Code:"ML"},{Name:"Malta",Code:"MT"},{Name:"Marshall Islands",Code:"MH"},{Name:"Martinique",Code:"MQ"},{Name:"Mauritania",Code:"MR"},{Name:"Mauritius",Code:"MU"},{Name:"Mayotte",Code:"YT"},{Name:"Mexico",Code:"MX"},{Name:"Micronesia, Federated States of",Code:"FM"},{Name:"Moldova, Republic of",Code:"MD"},{Name:"Monaco",Code:"MC"},{Name:"Mongolia",Code:"MN"},{Name:"Montenegro",Code:"ME"},{Name:"Montserrat",Code:"MS"},{Name:"Morocco",Code:"MA"},{Name:"Mozambique",Code:"MZ"},{Name:"Myanmar",Code:"MM"},{Name:"Namibia",Code:"NA"},{Name:"Nauru",Code:"NR"},{Name:"Nepal",Code:"NP"},{Name:"Netherlands",Code:"NL"},{Name:"New Caledonia",Code:"NC"},{Name:"New Zealand",Code:"NZ"},{Name:"Nicaragua",Code:"NI"},{Name:"Niger",Code:"NE"},{Name:"Nigeria",Code:"NG"},{Name:"Niue",Code:"NU"},{Name:"Norfolk Island",Code:"NF"},{Name:"Northern Mariana Islands",Code:"MP"},{Name:"Norway",Code:"NO"},{Name:"Oman",Code:"OM"},{Name:"Pakistan",Code:"PK"},{Name:"Palau",Code:"PW"},{Name:"Palestine, State of",Code:"PS"},{Name:"Panama",Code:"PA"},{Name:"Papua New Guinea",Code:"PG"},{Name:"Paraguay",Code:"PY"},{Name:"Peru",Code:"PE"},{Name:"Philippines",Code:"PH"},{Name:"Pitcairn",Code:"PN"},{Name:"Poland",Code:"PL"},{Name:"Portugal",Code:"PT"},{Name:"Puerto Rico",Code:"PR"},{Name:"Qatar",Code:"QA"},{Name:"Romania",Code:"RO"},{Name:"Russian Federation",Code:"RU"},{Name:"Rwanda",Code:"RW"},{Name:"R\xE9union",Code:"RE"},{Name:"Saint Barth\xE9lemy",Code:"BL"},{Name:"Saint Helena, Ascension and Tristan da Cunha",Code:"SH"},{Name:"Saint Kitts and Nevis",Code:"KN"},{Name:"Saint Lucia",Code:"LC"},{Name:"Saint Martin (French part)",Code:"MF"},{Name:"Saint Pierre and Miquelon",Code:"PM"},{Name:"Saint Vincent and the Grenadines",Code:"VC"},{Name:"Samoa",Code:"WS"},{Name:"San Marino",Code:"SM"},{Name:"Sao Tome and Principe",Code:"ST"},{Name:"Saudi Arabia",Code:"SA"},{Name:"Senegal",Code:"SN"},{Name:"Serbia",Code:"RS"},{Name:"Seychelles",Code:"SC"},{Name:"Sierra Leone",Code:"SL"},{Name:"Singapore",Code:"SG"},{Name:"Sint Maarten (Dutch part)",Code:"SX"},{Name:"Slovakia",Code:"SK"},{Name:"Slovenia",Code:"SI"},{Name:"Solomon Islands",Code:"SB"},{Name:"Somalia",Code:"SO"},{Name:"South Africa",Code:"ZA"},{Name:"South Georgia and the South Sandwich Islands",Code:"GS"},{Name:"South Sudan",Code:"SS"},{Name:"Spain",Code:"ES"},{Name:"Sri Lanka",Code:"LK"},{Name:"Sudan",Code:"SD"},{Name:"Suriname",Code:"SR"},{Name:"Svalbard and Jan Mayen",Code:"SJ"},{Name:"Swaziland",Code:"SZ"},{Name:"Sweden",Code:"SE"},{Name:"Switzerland",Code:"CH"},{Name:"Syrian Arab Republic",Code:"SY"},{Name:"Taiwan, Province of China",Code:"TW"},{Name:"Tajikistan",Code:"TJ"},{Name:"Tanzania, United Republic of",Code:"TZ"},{Name:"Thailand",Code:"TH"},{Name:"Timor-Leste",Code:"TL"},{Name:"Togo",Code:"TG"},{Name:"Tokelau",Code:"TK"},{Name:"Tonga",Code:"TO"},{Name:"Trinidad and Tobago",Code:"TT"},{Name:"Tunisia",Code:"TN"},{Name:"Turkey",Code:"TR"},{Name:"Turkmenistan",Code:"TM"},{Name:"Turks and Caicos Islands",Code:"TC"},{Name:"Tuvalu",Code:"TV"},{Name:"Uganda",Code:"UG"},{Name:"Ukraine",Code:"UA"},{Name:"United Arab Emirates",Code:"AE"},{Name:"United Kingdom",Code:"GB"},{Name:"United States Minor Outlying Islands",Code:"UM"},{Name:"Uruguay",Code:"UY"},{Name:"Uzbekistan",Code:"UZ"},{Name:"Vanuatu",Code:"VU"},{Name:"Venezuela, Bolivarian Republic of",Code:"VE"},{Name:"Viet Nam",Code:"VN"},{Name:"Virgin Islands, British",Code:"VG"},{Name:"Virgin Islands, U.S.",Code:"VI"},{Name:"Wallis and Futuna",Code:"WF"},{Name:"Western Sahara",Code:"EH"},{Name:"Yemen",Code:"YE"},{Name:"Zambia",Code:"ZM"},{Name:"Zimbabwe",Code:"ZW"},{Name:"\xC5land Islands",Code:"AX"}];var pt=new Map,ft=`
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
`;async function ba(e){var s;if(pt.has(e.id))return pt.get(e.id);let t=!!((s=e.wrap)!=null&&s.productHandle),a=`
    query LoadConfigurator(
      $productHandle: String!
      $accessoriesHandle: String!
      ${t?"$wrapHandle: String!":""}
    ) {
      main: product(handle: $productHandle) { ${ft} }
      accessoriesCollection: collection(handle: $accessoriesHandle) {
        title
        handle
        products(first: 50) {
          edges { node { ${ft} } }
        }
      }
      ${t?`wrap: product(handle: $wrapHandle) { ${ft} }`:""}
    }
  `,o={productHandle:e.product.handle,accessoriesHandle:e.accessoriesCollection};t&&(o.wrapHandle=e.wrap.productHandle);let{data:n,errors:r}=await z.request(a,{variables:o});if(r)throw new Error(`[Products] GraphQL errors: ${JSON.stringify(r)}`);if(!n.main)throw new Error(`[Products] Product not found: ${e.product.handle}`);if(!n.accessoriesCollection)throw new Error(`[Products] Collection not found: ${e.accessoriesCollection}`);let i={main:mt(n.main),wrap:n.wrap?mt(n.wrap):null,accessories:n.accessoriesCollection.products.edges.map(l=>mt(l.node))};return pt.set(e.id,i),i}function mt(e){var t,a,o;return{id:e.id,handle:e.handle,title:e.title,description:e.description,availableForSale:e.availableForSale,productType:e.productType,vendor:e.vendor,tags:e.tags||[],featuredImage:e.featuredImage,accessoryEta:((t=e.accessoryEta)==null?void 0:t.value)||null,instructionVideo:((a=e.instructionVideo)==null?void 0:a.value)||null,collections:(((o=e.collections)==null?void 0:o.edges)||[]).map(n=>n.node),variants:e.variants.edges.map(({node:n})=>({id:n.id,title:n.title,availableForSale:n.availableForSale,quantityAvailable:n.quantityAvailable,price:n.price,compareAtPrice:n.compareAtPrice,selectedOptions:n.selectedOptions,image:n.image}))}}var va=`/* Infinite configurator page for Olto.
   Pinned hero, content sheet that scrolls over it, circular swatches, sticky
   order bar. Tokens follow the IM style guide (marketing track): Helvetica
   Now, black on white, flat, IM green as signature accent only. Fonts load
   from the same Webflow CDN the live site serves them from. */

/* URL-encoded (%20) filenames are required \u2014 the CDN 403s the underscore variants of these files. */
@font-face {
  font-family: 'Helvetica Now Display';
  font-weight: 300;
  font-style: normal;
  font-display: swap;
  src: url('https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6685c0265fa647954105d376_Monotype%20-%20Helvetica%20Now%20Display%20Light.woff')
      format('woff'),
    url('https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6685c0259578765b978448c5_Monotype%20-%20Helvetica%20Now%20Display%20Light.otf')
      format('opentype');
}

@font-face {
  font-family: 'Helvetica Now Display';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url('https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6685c0254c157c5319ffa5a1_Monotype%20-%20Helvetica%20Now%20Display.woff')
      format('woff'),
    url('https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6685c025a7f9105a9cfa1831_Monotype%20-%20Helvetica%20Now%20Display.otf')
      format('opentype');
}

@font-face {
  font-family: 'Helvetica Now Display';
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  src: url('https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6685c7aa3569c5fad948926f_Monotype%20-%20Helvetica%20Now%20Display%20Medium.woff')
      format('woff'),
    url('https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6685c7aa18240ccee650efe6_Monotype%20-%20Helvetica%20Now%20Display%20Medium.otf')
      format('opentype');
}

@font-face {
  font-family: 'Helvetica Now Text';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url('https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6685c0254089caadd67a3016_Monotype%20-%20Helvetica%20Now%20Text.woff')
      format('woff'),
    url('https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6685c025cd155be191f437d4_Monotype%20-%20Helvetica%20Now%20Text.otf')
      format('opentype');
}

@font-face {
  font-family: 'Helvetica Now Text';
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  src: url('https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6685c0252052ff61342f2a9e_Monotype%20-%20Helvetica%20Now%20Text%20Medium.woff')
      format('woff'),
    url('https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6685c025846a39a8ec9d9215_Monotype%20-%20Helvetica%20Now%20Text%20Medium.otf')
      format('opentype');
}

/* ---------------------------------------------------------------------------
   Scoping.

   This stylesheet is injected into the live Webflow page, which carries the
   whole site stylesheet, Webflow's normalize, IX2 and several third-party
   widgets. Anything global here would reshape the entire site \u2014 and Webflow's
   own body/button/img rules would deform this UI in return.

   Everything is scoped to \`.olto-cfg\`, the class mount() puts on the root
   element in BOTH hosts (the Webflow page's [data-olto-configurator] and the
   standalone demo's .olto-cfg). Tokens live on the same element rather than :root:
   every region here is a DOM descendant of the mount, so they inherit normally
   even where position:fixed takes them out of flow.

   :where() is used for the reset rules because scoping must add REACH, not
   WEIGHT \u2014 written plainly, \`.olto-cfg button\` is (0,1,1) and outranks
   \`.swatch\` (0,1,0), which silently blanks every colour swatch.
   --------------------------------------------------------------------------- */
.olto-cfg {
  --ink: #252525; /* oklch(0.145 0 0) */
  --ink-2: #6a6a6a;
  --ink-3: #9a9a9a;
  --line: #e5e5e5;
  --chip: #f8f8f8;
  --bg: #ffffff;
  --green: #00ff38; /* IM green \u2014 signature accent only */
  --radius: 0.625rem;
  --sheet-radius: 22px;
  --pad: 20px;
  --hero-h: 44vh;
  --font-display: 'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-text: 'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --ease-im: cubic-bezier(0.215, 0.61, 0.355, 1);
}

:where(.olto-cfg),
:where(.olto-cfg) *,
:where(.olto-cfg) *::before,
:where(.olto-cfg) *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Was \`body\` + \`.olto-cfg\`; both collapse onto the mount.
   font-size/line-height are PINNED rather than inherited: infinitemachine.com
   sets a responsive root scale (body computes to 25.6px there vs 16px
   standalone) and anything without an explicit size would inherit it. */
.olto-cfg {
  font-size: 16px;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
  font-family: var(--font-text);
  color: var(--ink);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
  max-width: 640px;
  margin: 0 auto;
  min-height: 100vh;
  min-height: 100dvh;
}

:where(.olto-cfg) button {
  font-family: inherit;
  border: 0;
  background: none;
  cursor: pointer;
  color: inherit;
}

/* The adopted Webflow form arrives wearing Webflow's own form classes.
   Confined to the slot so it cannot outrank the fallback form's classes. */
:where(.olto-cfg) .w-form {
  margin: 0;
}

:where(.olto-cfg) [data-wf-form-slot] .w-input,
:where(.olto-cfg) [data-wf-form-slot] input[type='text'],
:where(.olto-cfg) [data-wf-form-slot] input[type='email'],
:where(.olto-cfg) [data-wf-form-slot] input[type='tel'] {
  width: 100%;
  height: auto;
  font-family: inherit;
  font-size: 1rem;
  color: var(--ink);
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 13px 14px;
  margin-bottom: 10px;
}

:where(.olto-cfg) [data-wf-form-slot] input[type='submit'] {
  width: 100%;
  font-family: inherit;
  font-size: 1rem;
  color: var(--bg);
  background: var(--ink);
  border: 0;
  border-radius: 999px;
  padding: 15px 20px;
  cursor: pointer;
}

:where(.olto-cfg) .w-form-done,
:where(.olto-cfg) .w-form-fail {
  padding: 16px;
  border-radius: var(--radius);
  background: var(--chip);
  font-size: 0.9rem;
}

/* ---------- Ship to ----------
   Deliberately not a form control: it sits with the summary rows, reads as
   text, and only looks like a picker on hover/focus. */
.olto-cfg .shipto {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0 0;
  font-size: 0.8125rem;
  color: var(--ink-3);
}

.olto-cfg .shipto_select {
  appearance: none;
  -webkit-appearance: none;
  font-family: inherit;
  font-size: 0.8125rem;
  color: var(--ink-2);
  background: transparent;
  border: 0;
  border-radius: 6px;
  padding: 2px 4px;
  margin-right: -4px;
  text-align: right;
  text-align-last: right;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.olto-cfg .shipto_select:hover {
  color: var(--ink);
  background: var(--chip);
}

.olto-cfg .shipto_select:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 1px;
}

/* ---------- Boot / error ---------- */

.boot {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: var(--pad);
  text-align: center;
}

.boot_mark,
.topbar_mark {
  display: flex;
  justify-content: center;
  color: var(--ink);
}

.im-wordmark {
  height: 11px;
  width: auto;
  display: block;
}

.boot_spinner {
  width: 22px;
  height: 22px;
  border: 2px solid var(--line);
  border-top-color: var(--green); /* signature accent */
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.boot_label {
  font-size: 14px;
  color: var(--ink-2);
}

.boot_retry {
  padding: 12px 28px;
  border-radius: 999px;
  background: var(--ink);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

/* ---------- Topbar + hero ---------- */

.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
  display: flex;
  justify-content: center;
  padding: calc(14px + env(safe-area-inset-top)) 0 14px;
  pointer-events: none;
}

/* The vehicle stays pinned \u2014 the options sheet scrolls in its own region
   below, so the scooter is always in view while configuring. */
.hero {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 640px;
  height: var(--hero-h);
  z-index: 1;
  overflow: hidden;
  /* White, not the studio grey the product shots are cut out on \u2014 on iPhone
     that grey read as a band across the top before the hero image painted
     ("Can we remove grey up top", Aug 26). */
  background: var(--bg);
}

.hero_img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0;
  will-change: opacity, transform;
}

.hero_img.is-active {
  opacity: 1;
}

/* Accessory layers \u2014 in-position shots on the same canvas as the base bike
   image, so identical geometry (inset 0 + cover) keeps them pixel-aligned.
   Hidden via visibility (like the live site) so they preload for instant
   toggles. */
.hero_layers {
  position: absolute;
  inset: 0;
}

/* A non-composite wrap photo is showing \u2014 its layers would misregister */
.hero_layers.is-suppressed {
  visibility: hidden;
}

.hero_layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  visibility: hidden;
}

.hero_layer.is-on {
  visibility: visible;
}

/* ---------- Content sheet ---------- */

.sheet {
  position: fixed;
  top: calc(var(--hero-h) - 22px);
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 640px;
  z-index: 2;
  background: var(--bg);
  border-radius: var(--sheet-radius) var(--sheet-radius) 0 0;
  padding: 26px var(--pad) 140px;
  overflow-y: auto;
  /* The accessories row is the only thing allowed to move sideways in here */
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

/* (The bottom-sheet drag handle that used to sit here was cut \u2014 Eddie,
   Aug 26 pm: "this top gray bar shouldn't be there.") */

/* ---------- Intro ---------- */

.intro {
  text-align: center;
  padding-bottom: 34px;
}

.intro_title {
  line-height: 0;
}

.olto-wordmark {
  height: 38px;
  width: auto;
  display: inline-block;
}

.intro_delivery {
  margin-top: 8px;
  font-size: 13px;
  color: var(--ink-2);
  min-height: 1.2em;
}

.intro_price {
  margin-top: 4px;
  font-size: 14px;
  color: var(--ink);
}

/* ---------- Option sections ---------- */

.opt {
  padding: 30px 0;
  border-top: 1px solid var(--line);
}

/* Color leads the sheet (Eddie, Aug 26 pm \u2014 "make sure that the colors are the
   first thing and there is no gray line in front"): nothing above it to divide
   it from, on desktop or under the mobile intro block */
.opt--color {
  border-top: 0;
  padding-top: 8px;
}

.opt_title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.01em;
  text-align: center;
}

.opt_sub {
  margin-top: 4px;
  font-size: 12.5px;
  color: var(--ink-2);
  text-align: center;
}

.opt_meta {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
  font-size: 14px;
}

.opt_name {
  font-weight: 500;
}

.opt_price {
  color: var(--ink-2);
}

/* ---------- Swatches ---------- */

/* One row, always \u2014 never a horizontal scroller. The row used to switch
   between nowrap+overflow-x (mobile), wrap (900-1139) and nowrap+overflow-x
   again (1140+), which is what read as "weird scrolling behavior" (Eddie,
   Aug 26 pm): at ~1140-1270px the six columns overflow by a few pixels, so
   the row swallowed trackpad gestures mid-sheet-scroll, and overflow-x:auto
   computes overflow-y:auto too \u2014 clipping the selected swatch's ring. The
   columns now share whatever width the sheet has instead. */
.swatches {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 6px;
  margin-top: 22px;
}

.swatch {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--swatch, #ddd);
  border: 1px solid rgba(23, 24, 26, 0.12);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.swatch:active {
  transform: scale(0.94);
}

.swatch.is-selected {
  box-shadow: 0 0 0 3px var(--bg), 0 0 0 5px var(--ink);
}

/* Labeled swatch column (consolidated Color row). The wrap grouping box is
   gone (team review, Aug 26 \u2014 "do we need this bounding box?"); the opt_sub
   caption above the row carries the wrap-not-paint distinction. */

/* Equal columns that flex with the sheet (flex-basis 0, so six of them split
   the row evenly) and cap out at the old 62px so a short colour set still
   sits tight rather than sprawling. */
.swatch-opt {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  flex: 1 1 0;
  min-width: 0;
  max-width: 62px;
}

/* Price wraps under the name (Eddie, Aug 26 pm \u2014 "wrap the text, so have
   the label be under the name"). Ellipsis rather than nowrap-overflow: at
   phone widths a narrow column would otherwise spill its label over the
   neighbours. */
.swatch_name,
.swatch_sub {
  max-width: 100%;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.swatch_name {
  font-size: 12.5px;
  font-weight: 500;
}

.swatch_sub {
  font-size: 11px;
  color: var(--ink-3);
  margin-top: -2px;
}

/* Phones: smaller circle + type so six columns still clear their labels in a
   ~350px sheet (team review, Aug 26 \u2014 one row, no side-scroll). */
@media (max-width: 899.98px) {
  .swatch {
    width: 40px;
    height: 40px;
  }

  .swatch_name {
    font-size: 11.5px;
  }

  .swatch_sub {
    font-size: 10.5px;
  }
}

/* Small phones (SE-class): tighten further so "Included" still reads whole. */
@media (max-width: 380px) {
  .swatches {
    gap: 4px;
  }

  .swatch_name {
    font-size: 10.5px;
  }

  .swatch_sub {
    font-size: 10px;
  }
}

/* ---------- Bundles (checklist cards) ----------
   A side-scrolling thumbnail carousel was tried for the Aug 26 review and
   rolled back the same day (Eddie: "I like the previous bundle thing
   better. It's simple."). */

.kit-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 22px;
}

.kit {
  position: relative;
  width: 100%;
  text-align: left;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--bg);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.kit.is-selected {
  border-color: var(--ink);
  box-shadow: inset 0 0 0 1px var(--ink);
}

.kit_chip {
  position: absolute;
  top: -9px;
  left: 14px;
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--ink);
  color: #fff;
  font-size: 11px;
  font-weight: 500;
}

.kit_top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.kit_name {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 500;
}

.kit_tagline {
  margin-top: 3px;
  font-size: 13px;
  color: var(--ink-2);
}

.kit_pricing {
  text-align: right;
  flex-shrink: 0;
}

.kit_price {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 500;
  white-space: nowrap;
}

.kit_save {
  margin-top: 3px;
  font-size: 12px;
  color: var(--ink-2);
  white-space: nowrap;
}

.kit_save s {
  color: var(--ink-3);
  margin-right: 4px;
}

/* Item list: no checkmarks (Eddie, Aug 26), but plain names separated by bare
   whitespace ran together \u2014 "Water Bottle Holder Bottom Cover" reads as one
   thing, and the ragged wrap made the gaps look arbitrary ("weird spacing
   here between accessories", Eddie, Aug 26 pm). Soft chips give each item an
   edge, so the rhythm is even at any wrap point. */
/* Plain comma-separated names \u2014 no pills (Eddie, Aug 26 pm). Commas ride with
   the word before them, so a wrap never strands a separator at the start of a
   line the way flex items + a middot did, and multi-word items still read as
   separate things (the original "weird spacing" complaint). */
.kit_items {
  margin-top: 13px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--ink-2);
}

/* ---------- Accessories (horizontal scroll to save space) ---------- */

.opt--acc {
  position: relative;
}

/* Explicit scroll affordance \u2014 swipe works on touch, arrows everywhere else */
.acc-nav {
  position: absolute;
  top: 32px;
  right: 0;
  display: flex;
  gap: 8px;
}

.acc-nav_btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--bg);
  color: var(--ink);
  font-size: 18px;
  line-height: 1;
}

.acc-nav_btn:active {
  transform: translateY(1px);
}

.acc-list {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  margin-inline: calc(-1 * var(--pad));
  padding: 2px var(--pad) 6px;
  overflow-x: auto;
  scrollbar-width: none;
}

.acc-list::-webkit-scrollbar {
  display: none;
}

.acc {
  flex: 0 0 150px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  /* The card itself adds/removes (infinite.js) */
  cursor: pointer;
}

@media (hover: hover) {
  .acc:hover {
    border-color: var(--ink-3);
  }
}

/* ...except the variant selects, which stay ordinary controls */
.acc select {
  cursor: auto;
}

/* Added = a black outline, and the card holds its place in the row (Eddie,
   Aug 26 pm: "i just want the black outline. not the fill"). The inset ring
   doubles the border without shifting the card's box by a pixel. */
.acc.is-added {
  border-color: var(--ink);
  box-shadow: inset 0 0 0 1px var(--ink);
}

.acc_media {
  position: relative;
}

.acc_img {
  display: block;
  width: 100%;
  height: 104px;
  border-radius: 10px;
  object-fit: cover;
  background: var(--chip);
}

/* Instruction-clip trigger \u2014 the live configurator's play affordance */
.acc_play {
  position: absolute;
  right: 6px;
  bottom: 6px;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  color: var(--ink);
  transition: transform 0.15s ease;
}

.acc_play svg {
  width: 20px;
  height: 20px;
}

.acc_play:active {
  transform: scale(0.92);
}

.acc_info {
  flex: 1;
  min-width: 0;
}

.acc_name {
  font-size: 13.5px;
  font-weight: 500;
  line-height: 1.25;
}

.acc_price {
  margin-top: 3px;
  font-size: 12.5px;
  color: var(--ink-2);
}

/* Product-option selects on a card (helmet size/color \u2014 team review, Aug 26) */
.acc_opts {
  display: flex;
  gap: 6px;
}

.acc_select {
  flex: 1;
  min-width: 0;
  padding: 7px 8px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--bg);
  color: var(--ink);
  font-family: inherit;
  font-size: 12px;
}

.acc_select:focus {
  outline: none;
  border-color: var(--ink);
}

/* Sub-16px form controls make iOS Safari zoom the page on focus */
@media (max-width: 899.98px) {
  .acc_select {
    font-size: 16px;
  }
}

.acc_btn {
  width: 100%;
  padding: 8px 0;
  border-radius: 999px;
  border: 1px solid var(--ink);
  font-size: 13px;
  font-weight: 500;
  transition: background 0.15s ease-out, color 0.15s ease-out;
}

.acc_btn:active {
  transform: translateY(1px);
}

.acc_btn.is-added {
  background: var(--ink);
  color: #fff;
}

/* ---------- Quantity ---------- */

.qty {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  margin-top: 20px;
}

.qty_btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--line);
  font-size: 20px;
  line-height: 1;
  transition: border-color 0.15s ease;
}

.qty_btn:active {
  border-color: var(--ink);
}

.qty_value {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 500;
  min-width: 2ch;
  text-align: center;
}

/* ---------- Summary ---------- */

.summary {
  margin-top: 18px;
}

.summary_row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 0;
  font-size: 14px;
  color: var(--ink-2);
}

.summary_row span:last-child {
  color: var(--ink);
  white-space: nowrap;
}

.summary_qty {
  padding: 9px 0;
  font-size: 13px;
  color: var(--ink-2);
  font-style: italic;
}

/* Bundle discount reads as money coming off, not another line item */
.summary_row--save span {
  color: var(--ink);
}

/* Bundle savings sit under the label \u2014 its own line at every width, so the
   bar never reflows mid-sentence (obodom, Aug 26: "show the total savings on
   the bottom sticky banner") */
.orderbar_savings {
  display: block;
  margin-top: 2px;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--ink);
}

.summary_total {
  display: flex;
  justify-content: space-between;
  padding-top: 14px;
  margin-top: 6px;
  border-top: 1px solid var(--line);
  font-size: 16px;
  font-weight: 500;
}

.summary_note {
  margin-top: 10px;
  font-size: 12px;
  color: var(--ink-3);
}

/* Clear configuration + Talk to a rep, the two quiet actions that close the
   sheet and the rail (the rep link used to live in the removed pop-up) */
.config-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.config-rep {
  font-size: 13px;
  color: var(--ink-2);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.config-clear {
  display: block;
  margin: 22px auto 0;
  padding: 10px 22px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-2);
  transition: color 0.15s ease-out, border-color 0.15s ease-out;
}

.config-clear.is-armed {
  color: var(--ink);
  border-color: var(--ink);
}

.config-clear:active {
  transform: translateY(1px);
}

/* ---------- Sticky order bar ---------- */

.orderbar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 640px;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px var(--pad) calc(14px + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.86);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  border-top: 1px solid var(--line);
}

.orderbar_amount {
  font-family: var(--font-display);
  font-size: 19px;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.orderbar_label {
  font-size: 11.5px;
  color: var(--ink-2);
}

.orderbar_actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.orderbar_save {
  padding: 13px 20px;
  border-radius: 999px;
  border: 1px solid var(--ink);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition: background 0.15s ease-out, color 0.15s ease-out;
}

.orderbar_save:active {
  transform: translateY(1px);
}

.orderbar_cta {
  padding: 14px 34px;
  border-radius: 999px;
  background: var(--ink);
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.orderbar_cta:active {
  transform: translateY(1px);
}

/* ---------- Payment (Cash / Shop Pay Finance) ----------
   The three-way Cash/Lease/Finance picker was scratched in the Aug 26 team
   review; this two-way Cash + Shop Pay Installments toggle replaced it the
   same day (Eddie: "add financing with shop pay options. so cash and
   finance"). */

.paytoggle {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
}

.paytoggle_btn {
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-2);
  transition: background 0.15s ease-out, color 0.15s ease-out;
}

.paytoggle_btn + .paytoggle_btn {
  border-left: 1px solid var(--line);
}

.paytoggle_btn.is-active {
  background: var(--ink);
  color: #fff;
  /* IM green \u2014 the page's one signature-accent moment */
  box-shadow: inset 0 -2px 0 var(--green);
}

.paytoggle_btn:active {
  transform: translateY(1px);
}

.pay_meta {
  text-align: center;
  margin-top: 18px;
}

.pay_figure {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.pay_sub {
  margin-top: 8px;
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--ink-2);
  max-width: 34em;
  margin-inline: auto;
}

/* ---------- Modals ----------
   Base overlay shared by the video, interest and save-design dialogs. (Lost
   with the nudge CSS when the load-time pop-up came out on Aug 26 \u2014 without
   it .leadmodal is a zero-height static box and its contents render into the page
   flow instead of over it, which is why the accessory clips looked dead.) */

.leadmodal {
  position: fixed;
  inset: 0;
  z-index: 50;
}

.leadmodal_backdrop {
  position: absolute;
  inset: 0;
  background: rgba(23, 24, 26, 0.4);
}

.leadmodal_sheet {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 640px;
  background: var(--bg);
  border-radius: var(--sheet-radius) var(--sheet-radius) 0 0;
  padding: 28px var(--pad) calc(28px + env(safe-area-inset-bottom));
  text-align: center;
}

.leadmodal_title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 500;
}

.leadmodal_body {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--ink-2);
}

.leadmodal_cta {
  display: block;
  margin-top: 20px;
  padding: 14px;
  border-radius: 999px;
  background: var(--ink);
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
}

.leadmodal_close {
  margin-top: 12px;
  padding: 10px;
  width: 100%;
  font-size: 14px;
  color: var(--ink-2);
}

/* ---------- Accessory video ---------- */

.leadmodal--video .leadmodal_backdrop {
  background: rgba(12, 12, 13, 0.82);
}

/* The clips are portrait (720x1280 from Bunny), so the player is sized by
   HEIGHT and takes its width from the clip's own ratio \u2014 a fixed-width box
   letterboxes a phone-shaped video inside a wall of black. */
.vid {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  max-width: calc(100vw - 2 * var(--pad));
}

.vid_head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
  color: #fff;
}

.vid_title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 500;
}

.vid_close {
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 22px;
  line-height: 1;
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
}

.vid_player {
  display: block;
  height: min(72vh, 860px);
  width: auto;
  max-width: min(880px, calc(100vw - 2 * var(--pad)));
  border-radius: var(--radius);
  background: #000;
}

/* ---------- Interest modal ---------- */

/* ---------- Save-design lead form ---------- */

/* .leadmodal_cta is sized by display:block on <a>; buttons need the width spelled out */
.olto-cfg button.leadmodal_cta {
  width: 100%;
}

/* Secondary modal action (Download as image) \u2014 outlined, not filled */
.leadmodal_cta--alt {
  background: var(--bg);
  color: var(--ink);
  border: 1px solid var(--ink);
}

/* First/last side by side (Eddie, Aug 26 pm \u2014 "break out first and last
   name") */
.saveform_row {
  display: flex;
  gap: 8px;
  margin-top: 20px;
}

.saveform_row .saveform_field {
  margin-top: 0;
  min-width: 0;
}

.saveform_field {
  width: 100%;
  margin-top: 12px;
  padding: 13px 16px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--bg);
  color: var(--ink);
  font-family: inherit;
  /* 16px minimum \u2014 anything smaller makes iOS Safari zoom the page when a
     field focuses (Eddie, Aug 26 pm: "shouldn't zoom in") */
  font-size: 16px;
  text-align: left; /* the sheet centers text \u2014 inputs read left-aligned */
}

.saveform_field::placeholder {
  color: var(--ink-3);
}

.saveform_field:focus {
  outline: none;
  border-color: var(--ink);
}

.saveform_error {
  margin-top: 10px;
  font-size: 13px;
  color: #c0392b;
}

.savedone_link {
  margin-top: 14px;
  padding: 12px 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--ink-2);
  word-break: break-all;
  user-select: all;
}

/* ---------- Desktop: keep the phone composition, centered ---------- */

@media (min-width: 641px) {
  body {
    background: #f2f2f3;
  }

  .hero,
  .sheet {
    border-inline: 1px solid var(--line);
  }
}

/* Squat viewports (desktop windows, landscape phones): cover would crop the
   vehicle out of the 44vh hero box (handlebars/helmet cut off). Letterbox
   the full shot instead \u2014 the photos' own white ground blends into a white
   hero, and base + layers switch together so they stay pixel-registered.
   Portrait phones (aspect < 3/5) keep the tuned cover composition. */
@media (min-aspect-ratio: 3/5) {
  .hero {
    background: #fff;
  }

  .hero_img,
  .hero_layer {
    object-fit: contain;
  }
}

/* ---------- Desktop, two-pane (900\u20131139px) ----------
   The old cutover was 1140px, which left "pretty wide" windows on the phone
   layout (Eddie, Aug 26). From 900px: pinned hero left, options sheet fixed
   right \u2014 the live-site scheme minus the spec rail (its summary/clear
   controls are duplicated in the sheet's Your Olto section). The \u22651140px
   three-pane block below layers the rail back on top of this. */
@media (min-width: 900px) {
  :root {
    --sheet-w: 420px;
    /* One inset for both panes' first line, so the INFINITE MACHINE wordmark
       and the OLTO wordmark start at the same y (Eddie, Aug 26). */
    --pane-top: 30px;
  }

  .olto-cfg {
    max-width: none;
  }

  .hero {
    left: 0;
    right: var(--sheet-w);
    transform: none;
    width: auto;
    max-width: none;
    height: 100vh;
    height: 100dvh;
    border-inline: 0;
  }

  /* Vehicle 20% smaller in the desktop pane. Shrinking the shared image BOX
     (not a transform) keeps base + accessory layers pixel-registered and
     leaves GSAP's crossfade scale free to compose on top. */
  .hero_img,
  .hero_layer {
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
  }

  /* Compact swatch row so Silver + five wraps fit the sheet in one line.
     The columns flex (see .swatch-opt) \u2014 no overflow-x safety valve here on
     purpose: a scroll container in the middle of the sheet hijacks trackpad
     scrolling the moment it overflows by even a pixel. */
  .swatch {
    width: 38px;
    height: 38px;
  }

  .swatch_name {
    font-size: 11.5px;
  }

  .swatch_sub {
    font-size: 10.5px;
  }

  /* The wordmark belongs to the vehicle pane, not the whole window \u2014 with the
     sheet pinned right, centring across the full viewport pushed it off-centre
     over the scooter (Eddie, Aug 26). */
  .topbar {
    right: var(--sheet-w);
    padding-top: var(--pane-top);
  }

  .sheet {
    top: 0;
    left: auto;
    right: 0;
    transform: none;
    width: var(--sheet-w);
    max-width: none;
    border-radius: 0;
    border-inline: 0;
    border-left: 1px solid var(--line);
    padding-top: var(--pane-top);
  }

  .orderbar {
    left: auto;
    right: 0;
    transform: none;
    width: var(--sheet-w);
    max-width: none;
    border-left: 1px solid var(--line);
  }

  /* Modals read as centered dialogs, not bottom sheets */
  .leadmodal_sheet {
    bottom: auto;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 440px;
    border-radius: var(--sheet-radius);
  }
}

/* ---------- Wide desktop: the tablet two-pane layout, scaled up ----------
   Eddie, Aug 26 pm: "i like how it is on tablet ... can we try a version of
   desktop that is like this." So the 900px tier now carries all the way up \u2014
   full-height hero on the left, one options column on the right, the OLTO
   wordmark + delivery + From price leading the sheet \u2014 and only the sheet
   widens as the window grows. The three-pane rail layout is still in the
   build behind ?layout=rail (see .is-rail below) for side-by-side comparison. */

@media (min-width: 1140px) {
  :root {
    --sheet-w: 460px;
  }
}

@media (min-width: 1600px) {
  :root {
    --sheet-w: 520px;
  }

  /* Keep the vehicle from ballooning in a very wide pane */
  .hero_img,
  .hero_layer {
    top: 14%;
    left: 18%;
    width: 64%;
    height: 72%;
  }
}

/* ---------- Wide desktop, ?layout=rail: three-pane, live-site layout ----------
   Left spec rail | pinned hero | scrolling options rail (Eddie, Aug 26 \u2014
   "like the live site on desktop, with the best practices we just designed").
   Extends the two-pane tier above: the rail appears and the hero re-anchors
   beside it. */

.rail {
  display: none;
}

@media (min-width: 1140px) {
  .olto-cfg.is-rail {
    --rail-w: 292px;
    --sheet-w: 460px;
  }

  .olto-cfg.is-rail .topbar {
    display: none; /* the wordmark lives in the rail */
  }

  .olto-cfg.is-rail .rail {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--rail-w);
    z-index: 3;
    padding: 30px 26px 32px;
    background: var(--bg);
    border-right: 1px solid var(--line);
    overflow-y: auto;
  }

  /* Configuration fills the leftover rail height: the item list scrolls,
     Total + Clear stay pinned at the rail's foot (like the live site) */
  .olto-cfg.is-rail .rail_block--config {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  .olto-cfg.is-rail .rail_block--config .summary {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
  }

  .olto-cfg.is-rail .rail_mark {
    color: var(--ink);
  }

  .olto-cfg.is-rail .rail_olto {
    margin-top: 10px;
  }

  .olto-cfg.is-rail .rail_olto svg {
    height: 40px;
    width: auto;
    display: block;
  }

  .olto-cfg.is-rail .rail_facts {
    margin-top: 26px;
    border-top: 1px solid var(--line);
  }

  .olto-cfg.is-rail .rail_row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid var(--line);
    font-size: 13.5px;
  }

  .olto-cfg.is-rail .rail_key {
    color: var(--ink-2);
  }

  .olto-cfg.is-rail .rail_val {
    font-weight: 500;
  }

  .olto-cfg.is-rail .rail_val--ship {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .olto-cfg.is-rail .rail_dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--green);
  }

  .olto-cfg.is-rail .rail_block {
    margin-top: 30px;
  }

  .olto-cfg.is-rail .rail_heading {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-3);
    padding-bottom: 10px;
    border-bottom: 1px solid var(--line);
  }

  .olto-cfg.is-rail .rail_list {
    list-style: none;
  }

  .olto-cfg.is-rail .rail_list li {
    padding: 11px 0;
    border-bottom: 1px solid var(--line);
    font-size: 13.5px;
  }

  .olto-cfg.is-rail .rail_block .summary_total {
    font-size: 13.5px;
  }

  /* Hero re-anchors beside the rail; everything else is inherited from the
     two-pane tier above. */
  .olto-cfg.is-rail .hero {
    left: var(--rail-w);
  }

  /* The rail carries the wordmark, price anchor and delivery \u2014 the sheet
     opens straight into Payment (hide the whole block, not just its children:
     an empty intro left a dead 34px band above the first section) */
  .olto-cfg.is-rail .intro {
    display: none;
  }

  /* ...and the configuration summary */
  .olto-cfg.is-rail .opt--summary {
    display: none;
  }
}
`;var ht="nd875425",xa="https://api-iam.intercom.io",ee="idle";async function Ca(){if(ee!=="idle"||typeof window=="undefined")return;if(ee="checking",!await bo()){ee="blocked",console.info(`[Infinite] Intercom messenger unavailable on ${window.location.host} \u2014 add the domain to the workspace\u2019s trusted domains; "Talk to a rep" falls back to the contact page until then.`);return}if(window.intercomSettings={api_base:xa,app_id:ht,hide_default_launcher:!0},typeof window.Intercom!="function"){let t=function(...a){t.c(a)};t.q=[],t.c=a=>t.q.push(a),window.Intercom=t}let e=document.createElement("script");e.async=!0,e.src=`https://widget.intercom.io/widget/${ht}`,e.onload=()=>{ee="ready",window.Intercom("boot",window.intercomSettings)},e.onerror=()=>{ee="blocked",console.warn("[Infinite] Intercom failed to load \u2014 rep link falls back to /contact")},document.head.appendChild(e)}async function bo(){try{return(await fetch(`${xa}/messenger/web/ping`,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({app_id:ht,referer:window.location.href})})).ok}catch{return!1}}function vo(){return ee==="ready"&&typeof window.Intercom=="function"&&window.Intercom.booted}function _a({message:e,lead:t}={}){if(!vo())return!1;try{return t!=null&&t.email&&window.Intercom("update",{name:[t.first,t.last].filter(Boolean).join(" ")||void 0,email:t.email,phone:t.phone||void 0}),window.Intercom("showNewMessage",e||""),!0}catch(a){return console.warn("[Infinite] Intercom refused to open:",a),!1}}var gt=null,yt=null,Sa=[],Ne=[],b={ready:!1,region:"",baseNumericId:null,bikeLine:null,wrapLine:null,accessoryLines:[],activeBundle:null,bundleSavings:0,quantity:1,total:0,currency:"USD",payMode:"cash",cart:null};function ke(e){return String(e).split("/").pop()}function Ee(e){return`gid://shopify/ProductVariant/${e}`}function Na(e){gt=e.config,yt=e.products,Sa=e.bundles||[],b.baseNumericId=gt.defaultVariantId,pa(xo)}function N(){return b}function ka(e){return Ne.push(e),()=>{Ne=Ne.filter(t=>t!==e)}}function wt(e){b.region=e,bt()}function Ie(e){b.payMode=e,bt()}function bt(){for(let e of Ne)e(b)}function xo(e){var h,m;let t=J(),a=((e==null?void 0:e.lines)||[]).filter(d=>{var y;return((y=d.attributesByKey)==null?void 0:y._config_id)===t}),o=yt.main.handle,n=(h=gt.wrap)==null?void 0:h.productHandle,r=new Set(yt.accessories.map(d=>d.handle));b.cart=e,b.bikeLine=a.find(d=>d.merchandise.product.handle===o)||null,b.wrapLine=a.find(d=>d.merchandise.product.handle===n)||null,b.accessoryLines=a.filter(d=>r.has(d.merchandise.product.handle)),b.bikeLine&&(b.baseNumericId=ke(b.bikeLine.merchandise.id)),b.quantity=((m=a[0])==null?void 0:m.quantity)||1;let i=0;for(let d of a)i+=parseFloat(d.merchandise.price.amount)*(d.quantity||1),d.merchandise.price.currencyCode&&(b.currency=d.merchandise.price.currencyCode);let s=new Set(b.accessoryLines.map(d=>d.merchandise.product.handle));b.activeBundle=null;let l=null;for(let d of Sa){let y=(d.products||[]).map(v=>v.handle);if(y.length&&y.length===s.size&&y.every(v=>s.has(v))){b.activeBundle=d.handle,l=d;break}}let c=a.reduce((d,y)=>d+(y.discountedAmount||0),0);b.bundleSavings=c>0?c:0,i-=b.bundleSavings,l&&typeof l.price=="number"&&b.bundleSavings===0&&console.warn(`[Olto] Bundle "${l.handle}" is in the cart but Shopify applied no discount. Checkout will bill the full component price.`),b.total=i,b.ready=!0,bt()}var Ae='<svg viewBox="0 0 922 201" fill="none" xmlns="http://www.w3.org/2000/svg" class="olto-wordmark" role="img" aria-label="Olto"> <path d="M246.995 19.4652C255.252 28.6186 259.698 41.3214 261.454 61.0855C262.35 70.239 262.649 80.8495 262.649 102.706C262.649 151.985 257.942 170.89 242.885 184.153C231.976 193.605 217.218 198.313 192.41 199.807C182.958 200.405 147.241 201.003 119.817 201.003C59.5913 201.003 43.3765 199.247 26.564 190.093C13.5623 182.995 5.00663 169.433 2.35399 149.968C0.598013 136.966 0.000235075 126.355 0.000235075 94.1874C-0.0371261 48.1211 4.37149 29.8142 18.5687 17.4103C29.1793 7.95792 43.0403 3.54931 68.4458 1.45708C78.496 0.560417 108.011 0 143.99 0C213.631 0 232.237 3.54931 246.995 19.4652ZM46.2907 100.651C46.2907 139.021 49.2422 151.425 60.1517 157.029C71.0611 162.932 80.5135 163.829 136.891 163.829C187.665 163.829 200.331 161.774 208.326 152.919C215.126 145.559 217.181 132.856 217.181 99.4927C217.181 37.8095 216.583 37.2117 131.586 37.2117C46.5896 37.2117 46.2907 38.1084 46.2907 100.651Z" fill="#E90022"/> <path d="M286.86 2.05334H332.328V162.034H476.057V198.909H286.86V2.05334Z" fill="#E90022"/> <path d="M507.328 38.9662H414.673V2.05334H645.154V38.9288H552.759V198.909H507.291V38.9662H507.328Z" fill="#E90022"/> <path d="M906.345 19.4644C914.602 28.6179 919.048 41.3207 920.804 61.0847C921.701 70.2382 922 80.8488 922 102.705C922 151.984 917.292 170.889 902.236 184.152C891.326 193.605 876.569 198.312 851.761 199.807C842.308 200.404 806.591 201.002 779.168 201.002C718.979 201.002 702.727 199.246 685.915 190.093C672.913 182.994 664.357 169.432 661.705 149.967C659.949 136.965 659.351 126.355 659.351 94.1867C659.351 48.1578 663.797 29.8508 677.957 17.4469C688.567 7.99454 702.466 3.58593 727.834 1.49371C737.884 0.597038 767.399 0.0366211 803.378 0.0366211C873.019 0.0366211 891.625 3.58593 906.383 19.5018L906.345 19.4644ZM705.679 100.65C705.679 139.02 708.63 151.424 719.54 157.028C730.449 162.931 739.901 163.828 796.279 163.828C847.053 163.828 859.719 161.773 867.714 152.918C874.514 145.558 876.569 132.855 876.569 99.492C876.569 37.8087 875.971 37.211 790.974 37.211C705.978 37.211 705.679 38.1076 705.679 100.65Z" fill="#E90022"/> </svg>',Ea='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 831.97 45.21" class="im-wordmark" fill="currentColor" role="img" aria-label="Infinite Machine"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M13.56.33V44.88H0V.33Z"/><path d="M44.93.33l27,33.86L71.58.33H84.4V44.88H62.63L36,11.35l.34,33.53h-13V.33Z"/><path d="M141.66.33V10.42H107.87V19.3h32.06V29.39H107.87V44.88H94.38V.33Z"/><path d="M163.09.33V44.88H149.54V.33Z"/><path d="M194.46.33l27,33.86L221.11.33h12.82V44.88H212.16L185.58,11.35l.33,33.53h-13V.33Z"/><path d="M257.44.33V44.88H243.89V.33Z"/><path d="M264.52,11.35V.33h53.23v11H297.91V44.88H284.35V11.35Z"/><path d="M374.26,10.42h-36V18.1h33.93v8.81H338.26V34.8h36.47V44.88H324.91V.33h49.35Z"/><path d="M423,.33l16.23,29.59L455.34.33h21.37V44.88H463.49l.67-34.39L444.39,44.88H433.57L414.13,10.49l.4,34.39H401.44V.33Z"/><path d="M526.62.33,551,44.88H536.17l-4.4-8H503.05l-4.28,8H483.41l25-44.55Zm-9.21,9.55-9.49,17.77H527Z"/><path d="M611.09,32.22c0,1.14-.11,2.11-.2,2.91a13.74,13.74,0,0,1-.36,2.07,11.1,11.1,0,0,1-.57,1.6,8.86,8.86,0,0,1-4.21,4.31,21.46,21.46,0,0,1-8.08,1.77q-2.07.19-6.18.27t-10.78.06c-3.21,0-5.91,0-8.12-.13a53.92,53.92,0,0,1-5.61-.47,20.34,20.34,0,0,1-3.9-.9,14.32,14.32,0,0,1-2.94-1.43,10.08,10.08,0,0,1-2.77-2.58,11.37,11.37,0,0,1-1.74-3.87,32.31,32.31,0,0,1-.9-5.84c-.18-2.32-.27-5.12-.27-8.42q0-4.41.27-7.48a23.36,23.36,0,0,1,1-5.24,10,10,0,0,1,1.87-3.54,10.88,10.88,0,0,1,2.9-2.37,16.6,16.6,0,0,1,3.17-1.44,23.22,23.22,0,0,1,4-.9Q570,.27,573.29.13c2.19-.09,4.83-.13,8-.13q6.21,0,10.22.07c2.67,0,4.88.15,6.61.33a27.49,27.49,0,0,1,4.21.7,18,18,0,0,1,3,1.1,8.12,8.12,0,0,1,4,4.35,20.63,20.63,0,0,1,1.27,7.94V16h-13a11.59,11.59,0,0,0-.5-2.87,2.69,2.69,0,0,0-1.7-1.6,12.6,12.6,0,0,0-3.87-.67c-1.7-.09-4-.13-6.95-.13q-4.14,0-6.74.06c-1.74.05-3.13.14-4.18.27a10.12,10.12,0,0,0-2.4.53,5.12,5.12,0,0,0-1.44.87,4.48,4.48,0,0,0-1,1.24,7.48,7.48,0,0,0-.6,1.87,20.61,20.61,0,0,0-.3,2.94c0,1.18-.07,2.66-.07,4.44a42.86,42.86,0,0,0,.37,6.31A5.34,5.34,0,0,0,570,32.66a8,8,0,0,0,4.21,1.43,75.75,75.75,0,0,0,7.68.31c2.54,0,4.57,0,6.11,0s2.77,0,3.71-.1a12.82,12.82,0,0,0,2.13-.23,7.73,7.73,0,0,0,1.47-.5,3.77,3.77,0,0,0,2.07-1.81,8.36,8.36,0,0,0,.6-3.6h13.16C611.16,29.72,611.14,31.09,611.09,32.22Z"/><path d="M633.44.33v16.5H664.3V.33h13.56V44.88H664.3v-17H633.44v17H619.88V.33Z"/><path d="M701.33.33V44.88H687.77V.33Z"/><path d="M732.7.33l27,33.86L759.35.33h12.82V44.88H750.4L723.82,11.35l.33,33.53h-13V.33Z"/><path d="M831.51,10.42h-36V18.1h33.93v8.81H795.51V34.8H832V44.88H782.15V.33h49.36Z"/></g></g></svg>',I="https://cdn.prod.website-files.com/66ea2a84659b76f5d91d481b",vt={"accessory-plate":`${I}/68d53a735e9c987a9499211a_accessory-plate.avif`,"charger-bag":`${I}/68d53a2cb165eb23a2527775_charger-bag.avif`,"olto-center-stand":`${I}/68d53974c880c4b20d23dec9_olto-center-stand.avif`,"olto-charging-dock":`${I}/68d5396153ba7acdd9978c0d_olto-charging-dock.avif`,"olto-kid-carrier":`${I}/6921a92ec4d3dc4a766d69bb_Kid%20Carrier.avif`,"olto-rear-basket":`${I}/68d53b6769ccc4ad6ad7d0b3_olto-rear-basket.avif`,"olto-rear-rack":`${I}/68d53b2e1153a3e349d34c1a_olto-rear-rack.avif`,"olto-side-mounting-plate":`${I}/68d53bea87ff421cf85c858e_olto-side-mounting-plate.avif`,"olto-water-bottle-holder":`${I}/68d53d46367f73dfd1b58a42_olto-water-bottle-holder.avif`,"olto-sidewalls":`${I}/68d53c3ccb4cfb15c59ac6cd_olto-sidewalls.avif`,"olto-super-charger":`${I}/6921a99cb5dd5b924cf4965d_Super%20Charger%20on%20the%20Ground.avif`,"olto-u-lock-mount":`${I}/68d53cf8bb965a6129e84ff4_olto-u-lock-mount.avif`,"open-face-helmet":`${I}/6921a8f20583ec71e2663dce_Black%20Open%20Face%20Helmet.avif`,"kryptonite-lock":`${I}/68d53fc0d2d8d2d151493b5f_kryptonite-lock.avif`,"olto-soft-bag":`${I}/692197c1914921de9b30217a_Soft%20Bag%20on%20the%20Ground.avif`},Ia=!0,Co={finance:{months:12,apr:0}};function xt(e,t,a){if(a==="finance"){let{months:o}=Co.finance,n=e/o;return{amount:n,suffix:"/mo",label:"12 mo at 0% APR, with Shop Pay",sub:`${x(n,t)}/mo with Shop Pay Installments \u2014 ${o} monthly payments at 0% APR for eligible buyers. Longer terms are available at checkout and carry interest.`}}return{amount:e,suffix:"",label:"Est. purchase price",sub:"Taxes and shipping calculated at checkout."}}var le=[{key:"commuter",label:"Olto Commuter",tagline:"Everything you need to commute every day.",popular:!0,price:200,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","olto-water-bottle-holder","bottom-cover"]},{key:"cargo",label:"Olto Cargo",tagline:"Carry everything.",price:600,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","charger-bag","olto-rear-rack","olto-rear-basket","olto-soft-bag","olto-side-mounting-plate","accessory-plate","olto-center-stand"]},{key:"max",label:"Olto Max",tagline:"Fully loaded. Full power.",price:780,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","olto-water-bottle-holder","charger-bag","olto-rear-rack","olto-rear-basket","olto-soft-bag","olto-side-mounting-plate","accessory-plate","olto-center-stand","olto-super-charger"]}],_o=new Set(["bottom-cover"]),So='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 7.5v9l7.5-4.5z" fill="currentColor"/></svg>',No=new Map([["bottom-cover","Outdoor Cover"]]);function te(e,t){return No.get(e)||t||e}function x(e,t="USD"){let a=Number(e)||0,o=a%1===0?0:2;return t==="USD"?`$${a.toLocaleString("en-US",{minimumFractionDigits:o,maximumFractionDigits:o})}`:`${t} ${a.toFixed(2)}`}function g(e){return String(e!=null?e:"").replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`)}function ae(e,t){return e?`${e}${e.includes("?")?"&":"?"}width=${t}`:""}function Aa({config:e,products:t,wrapVariantsByColor:a}){let o=Object.entries(e.variants),[n]=o.find(([i])=>i===e.defaultVariantId)||o[0],r=Math.min(...t.main.variants.map(i=>parseFloat(i.price.amount)));return`
    <header class="topbar">
      <div class="topbar_mark">${Ea}</div>
    </header>

    <!-- Wide-desktop left rail (live-site configurator layout); hidden on
         mobile/tablet. [data-summary]/[data-summary-total]/[data-config-reset]
         are duplicated from the sheet \u2014 the render helpers update every match. -->
    <aside class="rail" aria-label="Olto specifications">
      <div class="rail_mark">
        ${Ea}
        <div class="rail_olto">${Ae}</div>
      </div>
      <div class="rail_facts">
        <div class="rail_row">
          <span class="rail_key">Shipping</span>
          <span class="rail_val rail_val--ship"><span data-rail-delivery>Now</span><span class="rail_dot"></span></span>
        </div>
        <div class="rail_row">
          <span class="rail_key">Ship to</span>
          <span class="rail_val" data-rail-country>&mdash;</span>
        </div>
        <div class="rail_row">
          <span class="rail_key">Starting at</span>
          <span class="rail_val">${x(r)}</span>
        </div>
      </div>
      <div class="rail_block">
        <h3 class="rail_heading">Included as standard</h3>
        <ul class="rail_list">
          <li>Olto</li>
          <li>Battery</li>
          <li>Charger</li>
          <li>Internet Module</li>
        </ul>
      </div>
      <div class="rail_block rail_block--config">
        <h3 class="rail_heading">Configuration</h3>
        <div class="summary" data-summary></div>
        <div class="summary_total">
          <span>Total</span>
          <span data-summary-total></span>
        </div>
        <div class="config-actions">
          <button type="button" class="config-clear" data-config-reset>Clear configuration</button>
          <!-- Opens IM's Intercom messenger in-page (infinite.js); the href is
               the fallback for a blocked/failed widget. -->
          <a
            class="config-rep"
            data-rep-chat
            href="https://www.infinitemachine.com/contact"
            target="_blank"
            rel="noopener"
          >Talk to a rep</a>
        </div>
      </div>
    </aside>

    <section class="hero" aria-label="Olto">
      <img class="hero_img is-active" data-hero-img="a" src="${g(e.variants[n].backgroundImage)}" alt="Olto" />
      <img class="hero_img" data-hero-img="b" alt="" aria-hidden="true" />
      <div class="hero_layers" data-layers>
        ${Object.entries(vt).map(([i,s])=>`<img class="hero_layer" data-layer="${g(i)}" src="${g(s)}" alt="" aria-hidden="true" />`).join("")}
      </div>
    </section>

    <main class="sheet">
      <section class="intro">
        <h1 class="intro_title">${Ae}</h1>
        <p class="intro_delivery" data-delivery></p>
        <p class="intro_price">From ${x(r)}</p>
      </section>

      <!-- Spec stats were cut from the config funnel (team review, Aug 26 \u2014
           "not useful info at the config funnel step"). -->

      ${ko(e,o,a)}

      ${Eo(t)}

      <section class="opt opt--acc" data-section="accessories">
        <h2 class="opt_title">Additional Accessories</h2>
        <div class="acc-nav">
          <button type="button" class="acc-nav_btn" data-acc-scroll="-1" aria-label="Scroll accessories back">&#8249;</button>
          <button type="button" class="acc-nav_btn" data-acc-scroll="1" aria-label="Scroll accessories forward">&#8250;</button>
        </div>
        <div class="acc-list" data-acc-list>
          ${t.accessories.filter(i=>!_o.has(i.handle)).map(i=>Lo(i)).join("")}
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

      <!-- Cash / Shop Pay Installments (Eddie, Aug 26 pm) \u2014 the two-way picker
           replaces the scratched three-way Cash/Lease/Finance one. It was tried
           at the top of the sheet and folded into the order bar; both were
           rolled back ("i dont like the payment options on mobile. lets go back
           to the way it was before"), so it is a section again, after the build
           is configured. -->
      <section class="opt" data-section="payment">
        <h2 class="opt_title">Payment</h2>
        <div class="paytoggle">
          <button type="button" class="paytoggle_btn" data-pay-mode="cash">Cash</button>
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
        <!-- Olto ships in the US only. Quiet by design: geo-IP resolves this
             for almost everyone, but it is the one field the CRM splits US from
             international on (webflow_submissions.country) and the visitor's
             way to correct a bad geo read, so it has to be reachable. -->
        <p class="shipto">
          <span class="shipto_key">Ship to</span>
          <span class="shipto_val">
            <select class="shipto_select" data-country aria-label="Shipping country">
              ${Se.map(i=>`<option value="${g(i.Code)}">${g(i.Name)}</option>`).join("")}
            </select>
          </span>
        </p>
        <p class="summary_note">Taxes and shipping calculated at checkout</p>
        <div class="config-actions">
          <button type="button" class="config-clear" data-config-reset>Clear configuration</button>
          <!-- Opens IM's Intercom messenger in-page (infinite.js); the href is
               the fallback for a blocked/failed widget. -->
          <a
            class="config-rep"
            data-rep-chat
            href="https://www.infinitemachine.com/contact"
            target="_blank"
            rel="noopener"
          >Talk to a rep</a>
        </div>
      </section>
    </main>

    <footer class="orderbar">
      <div class="orderbar_total">
        <div class="orderbar_amount" data-total>&nbsp;</div>
        <div class="orderbar_meta">
          <span class="orderbar_label" data-total-label>Est. purchase price</span>
          <span class="orderbar_savings" data-total-save hidden></span>
        </div>
      </div>
      <div class="orderbar_actions">
        <button type="button" class="orderbar_save" data-save>Save</button>
        <!-- An anchor, not a button, carrying sf-checkout: im-attribution's
             capture-phase backstop keys on [sf-checkout] and on anchors to the
             checkout host, and it re-stamps a cart built between two
             MutationObserver batches. A JS-only navigation is invisible to it.
             href is kept current by update(). -->
        <a class="orderbar_cta" data-cta sf-checkout="1" href="#" role="button">Order</a>
      </div>
    </footer>

    <!-- Accessory instruction clip (Bunny HLS), same source the live
         configurator plays \u2014 modules/accessory-video.js -->
    <div class="leadmodal leadmodal--video" data-video-modal hidden>
      <div class="leadmodal_backdrop" data-video-close></div>
      <div class="vid">
        <div class="vid_head">
          <h3 class="vid_title" data-video-title></h3>
          <button type="button" class="vid_close" data-video-close aria-label="Close video">&times;</button>
        </div>
        <video class="vid_player" data-video-el playsinline controls preload="none"></video>
      </div>
    </div>

    <div class="leadmodal" data-save-modal hidden>
      <div class="leadmodal_backdrop" data-save-close></div>
      <div class="leadmodal_sheet">
        <h3 class="leadmodal_title" data-save-title>Save your design</h3>
        <p class="leadmodal_body" data-save-copy>
          We&rsquo;ll copy a link that rebuilds this exact Olto &mdash; share it or pick
          up where you left off on any device.
        </p>

        <!-- The live Webflow form (#wf-form-Olto-Interest-Form, 203 submissions)
             is MOVED into this slot by src/olto-configurator.js. Moving rather
             than cloning keeps Webflow's bound AJAX handler, and the im_* hidden
             inputs travel with the node. Never re-render its children:
             im-attribution's data-im-stamped latch would not re-stamp it. -->
        <div data-wf-form-slot hidden></div>

        <!-- Fallback for the standalone demo, where no Webflow form exists.
             olto-configurator.js removes this once the real form is adopted. -->
        <form data-save-form novalidate>
          <div class="saveform_row">
            <input class="saveform_field" type="text" name="first_name" placeholder="First name" autocomplete="given-name" />
            <input class="saveform_field" type="text" name="last_name" placeholder="Last name" autocomplete="family-name" />
          </div>
          <input class="saveform_field" type="email" name="email" placeholder="Email" autocomplete="email" inputmode="email" />
          <input class="saveform_field" type="tel" name="phone" placeholder="Phone" autocomplete="tel" inputmode="tel" />
          <p class="saveform_error" data-save-error hidden></p>
          <button type="submit" class="leadmodal_cta">Save my design</button>
        </form>

        <!-- Outside the fallback form on purpose: that form is removed once the
             Webflow form is adopted, and the close affordance must survive. -->
        <button type="button" class="leadmodal_close" data-save-close>Close</button>
        <div data-save-done hidden>
          <h3 class="leadmodal_title">Design saved</h3>
          <p class="leadmodal_body" data-save-done-msg>Link copied to your clipboard.</p>
          <p class="savedone_link" data-save-link></p>
          <button type="button" class="leadmodal_cta modal_cta--alt" data-save-image>
            Download as image
          </button>
          <p class="saveform_error" data-save-image-note hidden></p>
          <button type="button" class="leadmodal_cta" data-save-close>Done</button>
        </div>
      </div>
    </div>

  `}function ko(e,t,a){var s,l;let o=(s=t.find(([,c])=>/silver/i.test(c.color)))==null?void 0:s[1],n=(l=t.find(([,c])=>/black/i.test(c.color)))==null?void 0:l[1],r={...e.wrapColorMap,Black:(n==null?void 0:n.colorHex)||"#1c1c1e"},i=["Black","Sand","Blush","Forest","Crimson"].filter(c=>a.has(c));return`
    <section class="opt opt--color" data-section="color">
      <h2 class="opt_title">Color</h2>
      <p class="opt_sub">Silver anodized finish. Vinyl wrap on top of the aluminum.</p>
      <div class="swatches swatches--labeled">
        <div class="swatch-opt">
          <button
            type="button"
            class="swatch"
            data-color-swatch=""
            style="--swatch: ${g((o==null?void 0:o.colorHex)||"#d7d7d7")}"
            aria-label="Silver"
          ></button>
          <div class="swatch_name">Silver</div>
          <div class="swatch_sub">Included</div>
        </div>
        ${i.map(c=>{let h=parseFloat(a.get(c).price.amount);return`
        <div class="swatch-opt">
          <button
            type="button"
            class="swatch"
            data-color-swatch="${g(c)}"
            style="--swatch: ${g(r[c])}"
            aria-label="${g(c)} vinyl wrap"
          ></button>
          <div class="swatch_name">${g(c)}</div>
          <div class="swatch_sub">+${x(h)}</div>
        </div>`}).join("")}
      </div>
    </section>
  `}function Eo(e){return`
    <section class="opt" data-section="bundles">
      <h2 class="opt_title">Bundle</h2>
      <div class="kit-list">
        ${le.map(t=>Io(t,e)).join("")}
      </div>
    </section>
  `}function Io(e,t){let a=e.items.reduce((s,l)=>{let c=Y(t.accessories.find(h=>h.handle===l));return s+(c?parseFloat(c.price.amount):0)},0),o=a-e.price,n=e.items.map(s=>{let l=t.accessories.find(c=>c.handle===s);return te(s,l==null?void 0:l.title).replace(/^Olto /,"")}),r=Ia?e.price:a,i=e.items.length?`<div class="kit_price">+${x(r)}</div>
       ${Ia&&o>0?`<div class="kit_save"><s>${x(a)}</s> Save ${x(o)}</div>`:""}`:"";return`
    <button type="button" class="kit" data-bundle="${g(e.key)}">
      ${e.popular?'<span class="kit_chip">Most popular</span>':""}
      <div class="kit_top">
        <div class="kit_id">
          <div class="kit_name">${g(e.label)}</div>
          <div class="kit_tagline">${g(e.tagline)}</div>
        </div>
        <div class="kit_pricing">${i}</div>
      </div>
      ${n.length?`<p class="kit_items">${n.map(s=>g(s)).join(", ")}</p>`:""}
    </button>
  `}function Ao(e){let t=new Map;for(let a of(e==null?void 0:e.variants)||[])for(let o of a.selectedOptions||[]){if(o.name==="Title"&&o.value==="Default Title")continue;t.has(o.name)||t.set(o.name,[]);let n=t.get(o.name);n.includes(o.value)||n.push(o.value)}return[...t.entries()]}function La(e,t){let a=((e==null?void 0:e.variants)||[]).filter(o=>(o.selectedOptions||[]).every(n=>t[n.name]==null||t[n.name]===n.value));return a.find(o=>o.availableForSale)||a[0]||null}function Lo(e){var n;let t=Y(e);if(!t)return"";let a=e.variants.length>1?Ao(e):[],o=new Map((t.selectedOptions||[]).map(r=>[r.name,r.value]));return`
    <div class="acc" data-acc="${g(e.handle)}">
      <div class="acc_media">
        <img class="acc_img" src="${g(ae((n=e.featuredImage)==null?void 0:n.url,240))}" alt="${g(e.title)}" loading="lazy" />
        ${e.instructionVideo?`<button
                type="button"
                class="acc_play"
                data-acc-play="${g(e.handle)}"
                aria-label="Watch the ${g(e.title)} video"
              >${So}</button>`:""}
      </div>
      <div class="acc_info">
        <div class="acc_name">${g(e.title)}</div>
        <div class="acc_price">${x(parseFloat(t.price.amount),t.price.currencyCode)}</div>
      </div>
      ${a.length?`<div class="acc_opts">${a.map(([r,i])=>`
        <select class="acc_select" data-acc-option="${g(r)}" aria-label="${g(e.title)} ${g(r)}">
          ${i.map(s=>`<option value="${g(s)}"${o.get(r)===s?" selected":""}>${g(s)}</option>`).join("")}
        </select>`).join("")}</div>`:""}
      <button type="button" class="acc_btn" data-acc-toggle="${g(e.handle)}">Add</button>
    </div>
  `}function Y(e){return e&&(e.variants.find(t=>t.availableForSale)||e.variants[0])||null}function Ta(e,t){var n;let a=[];if(e.bikeLine){let r=((n=t.variants[e.baseNumericId])==null?void 0:n.color)||e.bikeLine.merchandise.title;a.push({label:`Olto &middot; ${g(r)}`,amount:parseFloat(e.bikeLine.merchandise.price.amount)})}e.wrapLine&&a.push({label:`Wrap &middot; ${g(e.wrapLine.merchandise.title)}`,amount:parseFloat(e.wrapLine.merchandise.price.amount)});for(let r of e.accessoryLines)a.push({label:g(te(r.merchandise.product.handle,r.merchandise.product.title)),amount:parseFloat(r.merchandise.price.amount)});if(e.bundleSavings>0){let r=le.find(i=>i.key===e.activeBundle);a.push({label:`${g((r==null?void 0:r.label)||"Bundle")} discount`,amount:-e.bundleSavings/(e.quantity||1),isSaving:!0})}let o=e.quantity>1?`<div class="summary_qty">&times;${e.quantity} configurations</div>`:"";return a.map(r=>`
      <div class="summary_row${r.isSaving?" summary_row--save":""}">
        <span>${r.label}</span>
        <span>${r.isSaving?"&minus;":""}${x(Math.abs(r.amount),e.currency)}</span>
      </div>`).join("")+o}var M=window.gsap||null;M&&window.ScrollTrigger&&M.registerPlugin(window.ScrollTrigger);var _={...Ht},f=null,C=null,oe=new Map,ce="a",Le=null,To=new Set(["Sand"]),Ro="Ships now",$o="Now",$e="",Ra=null,Ct=0,_t=null;async function Pa(e){var n,r,i;if(f=e,!f){console.error("[Olto] mount(): no root element \u2014 nothing rendered.");return}f.classList.add("olto-cfg"),Do();let t=(n=Object.entries(_.variants).find(([,s])=>/silver/i.test(s.color)))==null?void 0:n[0];t&&(_.defaultVariantId=t);try{C=await ba(_)}catch(s){console.error("[Infinite] Failed to load products:",s),Po();return}await Oo(),oe=Mo(C.wrap),sa(C),await la(_),await Va("boot"),Na({config:_,products:C,bundles:le.filter(s=>s.items.length).map(s=>({handle:s.key,price:s.price,label:s.label,products:s.items.map(l=>({handle:l}))}))}),new URLSearchParams(window.location.search).get("layout")==="rail"&&f.classList.add("is-rail"),f.innerHTML=Aa({config:_,products:C,wrapVariantsByColor:oe}),Ho(),ka(ue),ue(N()),Qo(),Yo(),(window.requestIdleCallback||(s=>setTimeout(s,1500)))(()=>Ca());let o=Vo();o?Fo(o):N().bikeLine||_e(C.main.handle,Ee(_.defaultVariantId)),an(),U("view_configurator"),cn();for(let s of oe.values())(r=s.image)!=null&&r.url&&(new Image().src=s.image.url);for(let s of C.main.variants)(i=s.image)!=null&&i.url&&(new Image().src=ae(s.image.url,1600))}async function Oo(){try{let{data:e}=await z.request('query { product(handle: "bottom-cover") { id handle title availableForSale featuredImage { url altText } variants(first: 5) { edges { node { id title availableForSale price { amount currencyCode } selectedOptions { name value } image { url altText } } } } } }'),t=e==null?void 0:e.product;t&&C.accessories.push({...t,variants:t.variants.edges.map(a=>a.node)})}catch(e){console.warn("[Infinite] Kit-only product fetch failed:",e)}}function Mo(e){var a;let t=new Map;if(!e)return t;for(let o of e.variants){let n=(a=o.selectedOptions)==null?void 0:a.find(i=>/colou?rs?/i.test(i.name)),r=(n==null?void 0:n.value)||o.title;r&&t.set(r,o)}return t}function Do(){if(document.getElementById("olto-cfg-css"))return;let e=document.createElement("style");e.id="olto-cfg-css",e.textContent=va,document.head.appendChild(e)}function Po(){f.innerHTML=`
    <div class="boot">
      <div class="boot_mark">INFINITE MACHINE</div>
      <div class="boot_label">Couldn&rsquo;t reach the store. Check your connection.</div>
      <button type="button" class="boot_retry" onclick="location.reload()">Retry</button>
    </div>
  `}function Ho(){f.addEventListener("click",e=>{let t=e.target.closest("[data-color-swatch]");if(t)return qo(t.dataset.colorSwatch);let a=e.target.closest("[data-acc-scroll]");if(a)return Bo("[data-acc-list]",Number(a.dataset.accScroll));let o=e.target.closest("[data-acc-toggle]");if(o)return Oa(o.dataset.accToggle);let n=e.target.closest("[data-acc-play]");if(n)return Wo(n.dataset.accPlay);if(e.target.closest("[data-video-close]"))return Rt();let r=e.target.closest("[data-acc]");if(r&&!e.target.closest("select, label"))return Oa(r.dataset.acc);let i=e.target.closest("[data-bundle]");if(i)return qa(i.dataset.bundle);let s=e.target.closest("[data-pay-mode]");if(s)return Ie(s.dataset.payMode);if(e.target.closest("[data-qty-dec]"))return Ma(-1);if(e.target.closest("[data-qty-inc]"))return Ma(1);if(e.target.closest("[data-save]"))return za("save");if(e.target.closest("[data-rep-chat]")){_a({message:Uo(),lead:Ka()})&&e.preventDefault();return}if(e.target.closest("[data-save-image]"))return tn();if(e.target.closest("[data-save-close]"))return Wa(!1);if(e.target.closest("[data-config-reset]"))return zo();if(e.target.closest("[data-cta]"))return e.preventDefault(),jo()}),f.addEventListener("change",e=>{let t=e.target.closest("[data-country]");t&&Ya(t.value)}),f.addEventListener("submit",e=>{if(e.target.closest("[data-save-form]")){e.preventDefault(),Xo(e.target);return}e.target.closest("[data-wf-form-slot]")&&(ja(),U("form_submit",{form_name:"Olto Interest Form"}))}),f.addEventListener("change",e=>{let t=e.target.closest("[data-acc-option]");if(!t)return;let a=t.closest("[data-acc]");if(!a)return;let o=a.dataset.acc;if(!N().accessoryLines.some(i=>i.merchandise.product.handle===o))return;let r=Ha(o);r&&ne(o,r.id)})}function Ha(e){let t=C.accessories.find(r=>r.handle===e);if(!t)return null;let a=f.querySelector(`[data-acc="${e}"]`),o=a?[...a.querySelectorAll("[data-acc-option]")]:[];if(!o.length)return Y(t);let n={};for(let r of o)n[r.dataset.accOption]=r.value;return La(t,n)||Y(t)}var $a=new Map;function Bo(e,t){var r;let a=f.querySelector(e);if(!a)return;let o=a.scrollLeft,n=Math.max(0,Math.min(a.scrollWidth-a.clientWidth,o+t*320));if(M&&!document.hidden){(r=$a.get(e))==null||r.kill();let i={v:o};$a.set(e,M.to(i,{v:n,duration:.45,ease:"power2.out",onUpdate:()=>{a.scrollLeft=i.v}}))}else a.scrollLeft=n}var Ba=Promise.resolve();function ne(e,t){let a=_e(e,t);return Ba=a.catch(()=>null),a}function qo(e){U("select_color",{olto_selected_color:e||"Silver"});let t=_.wrap.productHandle;if(!e)return ne(t,null);let a=oe.get(e);a&&ne(t,a.id)}var Q=null;function Oa(e){var n,r;let t=N(),a=t.accessoryLines.some(i=>i.merchandise.product.handle===e);U(a?"remove_accessory":"add_accessory",{olto_accessory:e});let o=_.accessoryDependencies||{};if(a){ne(e,null);let i=((n=o[e])==null?void 0:n.requiredBy)||[],s=[];for(let l of i)t.accessoryLines.some(c=>c.merchandise.product.handle===l)&&(ne(l,null),s.push(l));Q=s.length?{trigger:e,removed:s}:null;return}if(St(e),(Q==null?void 0:Q.trigger)===e){for(let i of Q.removed)St(i);Q=null}for(let[i,s]of Object.entries(o))(r=s.requiredBy)!=null&&r.includes(e)&&(t.accessoryLines.some(c=>c.merchandise.product.handle===i)||St(i))}function St(e){let t=Ha(e);t&&ne(e,t.id)}var Nt=!1,Te=null,j=null;async function qa(e){if(U("select_bundle",{olto_selected_bundle:e||"none"}),Nt){e!==(j==null?void 0:j.value)&&(Te=e,j={value:e},ue(N()));return}Nt=!0;let t=N().activeBundle===e?null:e;j={value:t},ue(N());try{await Ba;let a=N().accessoryLines.map(r=>r.id).filter(r=>!String(r).startsWith("tmp_"));a.length&&await xe(a);let o=le.find(r=>r.key===e);if(!t||!(o!=null&&o.items.length))return;let n=o.items.map(r=>{let i=Y(C.accessories.find(s=>s.handle===r));return i?{variantId:i.id,attributes:{_bundle:e}}:null}).filter(Boolean);n.length&&await ct(n)}catch(a){console.error("[Infinite] Bundle select failed:",a)}finally{if(Nt=!1,Te){let a=Te;Te=null,qa(a)}else j=null,ue(N())}}function Ma(e){U("change_quantity",{olto_quantity_delta:e});let t=N(),a=[t.bikeLine,t.wrapLine,...t.accessoryLines].filter(Boolean),o=Math.min(99,Math.max(1,t.quantity+e));if(o===t.quantity)return;let n=a.filter(r=>!String(r.id).startsWith("tmp_"));Promise.all(n.map(r=>da({lineId:r.id,quantity:o})))}async function Va(e){var o;let t=J();if(!t)return 0;let a=(((o=it())==null?void 0:o.lines)||[]).filter(n=>{var r;return!n.id||String(n.id).startsWith("tmp_")?!1:((r=n.attributesByKey)==null?void 0:r._config_id)!==t}).map(n=>n.id);if(!a.length)return 0;try{return await xe(a),console.warn(`[Olto] Dropped ${a.length} cart line(s) from a previous configuration (${e}). This cart shows one configuration at a time.`),a.length}catch(n){return console.error("[Olto] Failed to clear stale cart lines; checkout may overcharge:",n),0}}function Vo(){let e=new URLSearchParams(window.location.search).get("d");if(!e)return null;let[t,a,o,n,r]=e.split(".");return!t||!_.variants[t]?null:{base:t,wrap:a||null,qty:Math.min(99,Math.max(1,parseInt(o,10)||1)),pay:["cash","finance"].includes(n)?n:"cash",accs:(r||"").split("~").filter(Boolean)}}async function Fo(e){lt(),await Va("shared design");let t=[{variantId:Ee(e.base),quantity:e.qty}],a=e.wrap?oe.get(e.wrap):null;a&&t.push({variantId:a.id,quantity:e.qty});for(let n of e.accs){let r=Y(C.accessories.find(i=>i.handle===n));r&&t.push({variantId:r.id,quantity:e.qty})}Ie(e.pay);try{await ct(t)}catch(n){console.error("[Infinite] Failed to apply shared design:",n)}let o=new URLSearchParams(window.location.search);o.delete("d"),window.history.replaceState({},"",`${window.location.pathname}?${o.toString()}`)}function $t(){let e=N(),t=e.wrapLine?fe(e.wrapLine.merchandise)||e.wrapLine.merchandise.title:"",a=e.accessoryLines.map(r=>r.merchandise.product.handle).join("~"),o=[e.baseNumericId,t,e.quantity,e.payMode,a].join("."),n=new URL(window.location.href);return n.searchParams.set("d",o),n.toString()}function Uo(){var s;let e=N(),t=e.wrapLine?fe(e.wrapLine.merchandise)||e.wrapLine.merchandise.title:"",a=((s=_.variants[e.baseNumericId])==null?void 0:s.color)||"Silver",o=[t?`${t} wrap`:`${a} finish`],n=e.accessoryLines.map(l=>te(l.merchandise.product.handle,l.merchandise.product.title));n.length&&o.push(n.join(", ")),e.quantity>1&&o.push(`qty ${e.quantity}`);let r=x(e.total,e.currency),i=`Total ${r}`;if(e.payMode==="finance"){let{amount:l}=xt(e.total,e.currency,"finance");i=`${x(l,e.currency)}/mo with Shop Pay (${r} total)`}return["Hi \u2014 I\u2019m designing an Olto and have a question.","",`My build: ${o.join(" \xB7 ")}`,i,$t(),""].join(`
`)}var de=null;function kt(e,t){for(let a of f.querySelectorAll("[data-config-reset]"))a.textContent=e,a.classList.toggle("is-armed",t)}async function zo(){if(!de){kt("Tap again to clear",!0),de=setTimeout(()=>{de=null,kt("Clear configuration",!1)},3e3);return}clearTimeout(de),de=null,kt("Clear configuration",!1);try{await ca(J())}catch(e){console.error("[Infinite] Clear failed:",e)}Q=null,Ie("cash"),_e(C.main.handle,Ee(_.defaultVariantId))}function jo(){let e=N();if(!e.ready)return;if(e.region==="row")return za("row");let t=st();t&&(U("begin_checkout",{checkout_url:t}),window.location.href=t)}var Go="https://cdn.jsdelivr.net/npm/hls.js@1.5.17/dist/hls.min.js",pe=null,Re=null,F=null,Tt=null;function Oe(){return f.querySelector("[data-video-el]")}function Fa(){var e;return!!((e=Oe())!=null&&e.canPlayType("application/vnd.apple.mpegurl"))}function Ua(){return window.Hls?Promise.resolve(window.Hls):Re||(Re=new Promise(e=>{let t=document.createElement("script");t.async=!0,t.src=Go,t.onload=()=>{pe=window.Hls||null,e(pe)},t.onerror=()=>{console.warn("[Infinite] hls.js failed to load \u2014 videos disabled"),e(null)},document.head.appendChild(t)}),Re)}function Ko(){var t;Fa()||window.Hls||pe||!((t=C==null?void 0:C.accessories)!=null&&t.some(a=>a.instructionVideo))||Ua()}function Wo(e){var s,l;let t=(s=C==null?void 0:C.accessories)==null?void 0:s.find(c=>c.handle===e),a=t==null?void 0:t.instructionVideo,o=f.querySelector("[data-video-modal]"),n=Oe();if(!a||!o||!n)return;V("[data-video-title]",te(e,t.title)),Tt=a;let r=window.Hls||pe;Fa()?n.src=a:r!=null&&r.isSupported()?(F||(F=new r({maxBufferLength:30}),F.attachMedia(n)),F.loadSource(a)):n.src=a,o.hidden=!1,n.muted=!1;let i=(l=n.play)==null?void 0:l.call(n);i!=null&&i.catch&&i.catch(()=>{var c;n.muted=!0,(c=n.play)==null||c.call(n).catch(h=>console.warn("[Infinite] Video playback blocked:",h))})}function Rt(){var a;let e=f.querySelector("[data-video-modal]"),t=Oe();!e||e.hidden||((a=t==null?void 0:t.pause)==null||a.call(t),e.hidden=!0)}function Yo(){let e=Oe();e&&(e.addEventListener("ended",Rt),e.addEventListener("error",async()=>{var a;if(!Tt||F)return;console.warn("[Infinite] Native HLS failed \u2014 retrying through hls.js");let t=window.Hls||pe||await Ua();!(t!=null&&t.isSupported())||F||(F=new t({maxBufferLength:30}),F.attachMedia(e),F.loadSource(Tt),(a=e.play)==null||a.call(e).catch(o=>console.warn("[Infinite] hls.js retry failed:",o)))}),document.addEventListener("keydown",t=>{t.key==="Escape"&&Rt()}),Ko())}function Qo(){let e=f.querySelector(".sheet");if(!e)return;let t=window.matchMedia("(min-width: 900px)");window.addEventListener("wheel",a=>{if(!t.matches)return;let o=a.target instanceof Element?a.target:null;if(o!=null&&o.closest(".sheet, .modal"))return;let n=a.deltaMode===1?16:a.deltaMode===2?e.clientHeight:1;e.scrollTop+=a.deltaY*n},{passive:!0})}function za(e){let t=f.querySelector("[data-save-modal]");if(!t)return;let a=e==="row",o=t.querySelector("[data-save-title]"),n=t.querySelector("[data-save-copy]");o&&(o.textContent=a?"Register your interest":"Save your design"),n&&(n.textContent=a?"Olto ships in the United States and Canada today. Leave your details and we\u2019ll tell you the moment it reaches you.":"We\u2019ll save this exact Olto so you can pick up where you left off on any device."),ja(),U(a?"interest_form_open":"save_configuration_open"),Wa(!0)}function Zo(){var a,o;let e=N(),t=e.wrapLine?fe(e.wrapLine.merchandise)||e.wrapLine.merchandise.title:"";return{location:$e,variant:((o=(a=_.variants)==null?void 0:a[e.baseNumericId])==null?void 0:o.color)||"",wrap:t,pack:e.activeBundle||"",quantity:String(e.quantity||1),accessories:e.accessoryLines.map(n=>n.merchandise.product.title).filter(Boolean).join(", "),design_url:$t()}}var Jo={location:["location","country"],variant:["variant"],wrap:["wrap"],pack:["pack"],quantity:["quantity"],accessories:["accessories"],design_url:["design_url"]};function ja(){let e=f.querySelector("[data-wf-form-slot] form");if(!e)return;let t=Zo();for(let[a,o]of Object.entries(t)){let r=(Jo[a]||[a]).map(i=>e.querySelector(`input[name="${i}"]`)).find(Boolean);r&&(r.value=o)}}function U(e,t){var a,o;try{let n=N();window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:e,configurator:"olto",olto_variant:((o=(a=_.variants)==null?void 0:a[n.baseNumericId])==null?void 0:o.color)||"",olto_wrap:n.wrapLine?fe(n.wrapLine.merchandise)||n.wrapLine.merchandise.title:"",olto_pack:n.activeBundle||"",olto_quantity:n.quantity||1,olto_accessory_count:n.accessoryLines.length,olto_value:Number(n.total||0),olto_savings:Number(n.bundleSavings||0),olto_currency:n.currency||"USD",olto_region:n.region||"unresolved",olto_config_id:J()||"",...t||{}})}catch(n){console.warn("[Olto] dataLayer push failed:",n)}}var Ga="olto_infinite_lead";function Ka(){try{let e=JSON.parse(localStorage.getItem(Ga));return e!=null&&e.email?e:null}catch{return null}}function Wa(e){var a;let t=f.querySelector("[data-save-modal]");if(t&&(t.hidden=!e,e)){let o=t.querySelector("[data-save-form]"),n=t.querySelector("[data-save-done]");if(o){o.hidden=!1;let r=Ka(),[i,...s]=((r==null?void 0:r.name)||"").split(/\s+/),l={first_name:(r==null?void 0:r.first)||i||"",last_name:(r==null?void 0:r.last)||s.join(" ")||"",email:(r==null?void 0:r.email)||"",phone:(r==null?void 0:r.phone)||""};for(let[c,h]of Object.entries(l)){let m=o.querySelector(`input[name="${c}"]`);m&&!m.value&&(m.value=h)}}n&&(n.hidden=!0),(a=t.querySelector('input[name="first_name"]'))==null||a.focus()}}async function Xo(e){let t=e.first_name.value.trim(),a=e.last_name.value.trim(),o=e.email.value.trim(),n=e.phone.value.trim(),r=e.querySelector("[data-save-error]"),i=null;if(!t||!a?i="Please add your first and last name.":/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o)?n.replace(/\D/g,"").length<7&&(i="That phone number looks too short."):i="That email doesn\u2019t look right.",i){r&&(r.textContent=i,r.hidden=!1);return}r&&(r.hidden=!0);try{localStorage.setItem(Ga,JSON.stringify({first:t,last:a,email:o,phone:n}))}catch{}let s=$t(),l=!0;try{await navigator.clipboard.writeText(s)}catch{l=!1}e.hidden=!0;let c=f.querySelector("[data-save-done]");if(c){c.hidden=!1;let h=c.querySelector("[data-save-done-msg]");h&&(h.textContent=l?"Link copied to your clipboard \u2014 it rebuilds this exact Olto.":"Copy your link below \u2014 it rebuilds this exact Olto.");let m=c.querySelector("[data-save-link]");m&&(m.textContent=s)}}function Et(e,t){return new Promise((a,o)=>{let n=new Image;t&&(n.crossOrigin="anonymous"),n.onload=()=>a(n),n.onerror=()=>o(new Error(`image failed: ${e}`)),n.src=e})}function It(e,t,a){let o=Math.min(a.w/t.naturalWidth,a.h/t.naturalHeight),n=t.naturalWidth*o,r=t.naturalHeight*o;e.drawImage(t,a.x+(a.w-n)/2,a.y+(a.h-r)/2,n,r)}var At='"Helvetica Now Text", "Helvetica Neue", Helvetica, Arial, sans-serif',en='"Helvetica Now Display", "Helvetica Neue", Helvetica, Arial, sans-serif';async function tn(){var t,a,o;let e=f.querySelector("[data-save-image-note]");e&&(e.hidden=!0);try{let n=N(),r=1080,i=1350,s=document.createElement("canvas");s.width=r,s.height=i;let l=s.getContext("2d");l.fillStyle="#ffffff",l.fillRect(0,0,r,i);let c=Ae.replace("<svg ",'<svg width="922" height="201" '),h=URL.createObjectURL(new Blob([c],{type:"image/svg+xml"}));try{It(l,await Et(h),{x:r/2-160,y:64,w:320,h:70})}finally{URL.revokeObjectURL(h)}let m={x:90,y:190,w:900,h:620},d=(t=f.querySelector(".hero_img.is-active"))==null?void 0:t.src;if(d&&It(l,await Et(d,!0),m),!((a=f.querySelector("[data-layers]"))==null?void 0:a.classList.contains("is-suppressed")))for(let T of f.querySelectorAll(".hero_layer.is-on"))try{It(l,await Et(T.src,!0),m)}catch{}let v=[];n.bikeLine&&v.push([`Olto - ${((o=_.variants[n.baseNumericId])==null?void 0:o.color)||n.bikeLine.merchandise.title}`,parseFloat(n.bikeLine.merchandise.price.amount)]),n.wrapLine&&v.push([`Wrap - ${n.wrapLine.merchandise.title}`,parseFloat(n.wrapLine.merchandise.price.amount)]);for(let T of n.accessoryLines)v.push([te(T.merchandise.product.handle,T.merchandise.product.title),parseFloat(T.merchandise.price.amount)]);n.bundleSavings>0&&v.push(["Bundle discount",-n.bundleSavings/(n.quantity||1)]);let S=120,k=r-120,w=880,$=v.slice(0,7);l.font=`26px ${At}`;for(let[T,H]of $)l.textAlign="left",l.fillStyle="#6a6a6a",l.fillText(T,S,w),l.textAlign="right",l.fillStyle="#252525",l.fillText(x(H,n.currency),k,w),w+=44;v.length>$.length&&(l.textAlign="left",l.fillStyle="#6a6a6a",l.fillText(`+ ${v.length-$.length} more`,S,w),w+=44),w+=8,l.strokeStyle="#e5e5e5",l.beginPath(),l.moveTo(S,w),l.lineTo(k,w),l.stroke(),w+=56,l.font=`500 34px ${en}`,l.textAlign="left",l.fillStyle="#252525",l.fillText("Total",S,w),l.textAlign="right",l.fillText(x(n.total,n.currency),k,w),w+=40,n.quantity>1&&(l.font=`22px ${At}`,l.textAlign="right",l.fillStyle="#6a6a6a",l.fillText(`${n.quantity} configurations`,k,w)),l.font=`22px ${At}`,l.textAlign="left",l.fillStyle="#9a9a9a",l.fillText("Taxes and shipping calculated at checkout - infinitemachine.com",S,i-80),s.toBlob(T=>{if(!T){e&&(e.textContent="Couldn\u2019t generate the image in this browser \u2014 a screenshot works too.",e.hidden=!1);return}let H=document.createElement("a");H.href=URL.createObjectURL(T),H.download="my-olto.png",H.click(),setTimeout(()=>URL.revokeObjectURL(H.href),1e4)},"image/png")}catch(n){console.error("[Infinite] Image export failed:",n),e&&(e.textContent="Couldn\u2019t generate the image in this browser \u2014 a screenshot works too.",e.hidden=!1)}}function Ya(e,{silent:t}={}){let a=Se.find(n=>n.Code===e);$e=(a==null?void 0:a.Name)||"",wt(nn.has(e)?"us":"row");let o=f.querySelector("[data-country]");o&&a&&(o.value=e),V("[data-rail-country]",$e||"\u2014"),t||U("select_country",{olto_country:$e||e})}async function an(){let e=new AbortController,t=setTimeout(()=>e.abort(),8e3);try{let o=(await(await fetch("https://get.geojs.io/v1/ip/country",{signal:e.signal})).text()).trim().toUpperCase();Ya(o,{silent:!0})}catch{wt("")}finally{clearTimeout(t)}}var Qa={commuter:"OLTO-COMMUTER-BUNDLE",cargo:"OLTO-CARGO-BUNDLE",max:"OLTO-MAX-BUNDLE"},on=new Set(Object.values(Qa)),nn=new Set(["US","CA"]),Lt=null;async function rn(){var i;let e=N();if(!e.ready)return;let t=e.activeBundle?Qa[e.activeBundle]:null,o=(((i=it())==null?void 0:i.discountCodes)||[]).map(s=>s.code).filter(s=>!on.has(s)),n=t?[t,...o]:o,r=[...n].sort().join("|");if(r!==Lt){Lt=r;try{await ua(n)}catch(s){Lt=null,console.error("[Olto] Failed to sync bundle discount:",s)}}}function sn(e){if(!(!e||e===Ra)){Ra=e;try{let t=new URLSearchParams(window.location.search);if(t.get("variant")===String(e))return;t.set("variant",String(e)),window.history.replaceState({},"",`${window.location.pathname}?${t}${window.location.hash}`)}catch(t){console.warn("[Olto] variant param sync failed:",t)}}}function ue(e){var $,T,H,Ot,Mt,Dt,Pt;if(!e.ready)return;sn(e.baseNumericId),rn();let t=_.variants[e.baseNumericId]||{};V("[data-delivery]",Ro),V("[data-rail-delivery]",$o);let a=e.wrapLine?fe(e.wrapLine.merchandise)||e.wrapLine.merchandise.title:"";for(let p of f.querySelectorAll("[data-color-swatch]"))p.classList.toggle("is-selected",e.wrapLine?p.dataset.colorSwatch===a:p.dataset.colorSwatch==="");let o=new Set(e.accessoryLines.map(p=>p.merchandise.product.handle)),n={},r=new Set;for(let p of _.customImageRules||[])if(p.when.every(A=>o.has(A))){Object.assign(n,p.replace||{});for(let A of p.hide||[])r.add(A)}let i=!1;for(let p of f.querySelectorAll("[data-layer]")){let A=p.dataset.layer,re=o.has(A)&&!r.has(A),Me=n[A]||vt[A];Me&&p.getAttribute("src")!==Me&&p.setAttribute("src",Me),p.classList.toggle("is-on",re),re&&(i=!0)}let s=(T=($=C.main.variants.find(p=>ke(p.id)===e.baseNumericId))==null?void 0:$.image)==null?void 0:T.url,l=e.region==="row"?"eu":"us",c=(l==="eu"?t.backgroundImage:ae(s,1600))||ae(s,1600)||t.backgroundImage,h=e.wrapLine?(Ot=(H=oe.get(a))==null?void 0:H.image)==null?void 0:Ot.url:null,m=h&&!To.has(a);if(e.wrapLine&&a==="Black"){let p=C.main.variants.find(A=>{var re;return((re=_.variants[ke(A.id)])==null?void 0:re.color)==="Black"});(Mt=p==null?void 0:p.image)!=null&&Mt.url&&(h=ae(p.image.url,1600),m=!0)}a==="Custom"&&(h=null),(Dt=f.querySelector("[data-layers]"))==null||Dt.classList.toggle("is-suppressed",!!h&&!m&&i),h?Da(h,`wrap:${a}`):Da(c,`base:${e.baseNumericId}:${l}`);let d=j?j.value:e.activeBundle;for(let p of f.querySelectorAll("[data-bundle]"))p.classList.toggle("is-selected",p.dataset.bundle===d);let y=new Set(e.accessoryLines.map(p=>p.merchandise.product.handle));for(let p of f.querySelectorAll("[data-acc-toggle]")){let A=y.has(p.dataset.accToggle);p.textContent=A?"Added":"Add",p.classList.toggle("is-added",A),(Pt=p.closest("[data-acc]"))==null||Pt.classList.toggle("is-added",A)}V("[data-qty-value]",String(e.quantity));let v=Ta(e,_);for(let p of f.querySelectorAll("[data-summary]"))p.innerHTML!==v&&(p.innerHTML=v);V("[data-summary-total]",x(e.total,e.currency));let S=e.payMode==="finance"?"finance":"cash",k=xt(e.total,e.currency,S);for(let p of f.querySelectorAll("[data-pay-mode]"))p.classList.toggle("is-active",p.dataset.payMode===S);V("[data-pay-figure]",x(k.amount,e.currency)+k.suffix),V("[data-pay-sub]",k.sub),ln(k.amount,k.suffix,e.currency),V("[data-total-label]",k.label);for(let p of f.querySelectorAll("[data-total-save]"))p.textContent=e.bundleSavings?`You save ${x(e.bundleSavings,e.currency)}`:"",p.hidden=!e.bundleSavings;let w=f.querySelector("[data-cta]");if(w){let p=e.region==="row"?"":st();w.setAttribute("href",p||"#")}w&&(w.textContent=e.region==="row"?"Register interest":"Order")}function fe(e){var a;let t=(a=e.selectedOptions)==null?void 0:a.find(o=>/colou?rs?/i.test(o.name));return(t==null?void 0:t.value)||null}function V(e,t){for(let a of f.querySelectorAll(e))a.textContent!==t&&(a.textContent=t)}function ln(e,t,a){let o=f.querySelector("[data-total]");if(o){if(M&&!document.hidden&&Ct!==e){_t&&_t.kill();let n={v:Ct};_t=M.to(n,{v:e,duration:.45,ease:"power2.out",onUpdate:()=>{o.textContent=x(n.v,a)+t},onComplete:()=>{o.textContent=x(e,a)+t}})}else o.textContent=x(e,a)+t;Ct=e}}function Da(e,t){if(!e||t===Le)return;let a={a:f.querySelector('[data-hero-img="a"]'),b:f.querySelector('[data-hero-img="b"]')};if(!a.a||!a.b)return;if(Le===null){a[ce].src=e,Le=t;return}let o=a[ce],n=a[ce==="a"?"b":"a"];n.src=e,ce=ce==="a"?"b":"a",Le=t,M?(M.set(n,{opacity:0,scale:1.04,xPercent:0,yPercent:0}),n.classList.add("is-active"),M.to(n,{opacity:1,scale:1,duration:.45,ease:"power2.out"}),M.to(o,{opacity:0,duration:.45,ease:"power2.out",onComplete:()=>o.classList.remove("is-active")})):(n.classList.add("is-active"),n.style.opacity=1,o.classList.remove("is-active"),o.style.opacity=0)}function cn(){if(!M||!window.ScrollTrigger||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let e=f.querySelector(".sheet");for(let t of f.querySelectorAll(".opt"))M.from(t,{y:24,opacity:0,duration:.45,ease:"power2.out",scrollTrigger:{trigger:t,scroller:e,start:"top 88%",once:!0}})}Pa(document.querySelector("#app"));})();
