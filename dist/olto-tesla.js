"use strict";(()=>{var Ct={id:"olto",steps:[{type:"location",no:"01",title:"Location",validation:!0,collapsible:!1},{type:"variant",no:"02",title:"Base"},{type:"wrap",no:"03",title:"Wrap"},{type:"bundle",no:"04",title:"Accessory Pack"},{type:"accessories",no:"05",title:"Configure your Accessories"},{type:"quantity",no:"06",title:"Quantity"}],product:{handle:"olto-1"},accessoriesCollection:"olto-accessories",testInstructionVideo:"https://vz-19725589-529.b-cdn.net/a4c98a2a-412b-4e2e-a2ce-4e9a64123464/playlist.m3u8",wrap:{productHandle:"olto-wrap"},bundles:{metaobjectType:"bundles"},variants:{44842879156380:{color:"Black",colorHex:"#000000",delivery:"July 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff73905e7daa5ef224c5d5_olto-eu-black.avif"},44842879123612:{color:"Silver",colorHex:"#D9D9D9",delivery:"August 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff7390e94ecc537b713a30_olto-eu-silver.avif"}},defaultVariantId:"44842879156380",wrapColorMap:{Sand:"#DECEAF",Blush:"#F6C6DC",Sky:"#707A8D",Forest:"#627063",Crimson:"#B44C47"},accessoryDependencies:{"olto-rear-rack":{requiredBy:["olto-rear-basket","olto-side-mounting-plate"]}},customImageRules:[{when:["olto-soft-bag","olto-rear-basket"],replace:{"olto-soft-bag":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/69219c3d619077ba6f1689ed_Soft%20Bag%20in%20Rear%20Basket.avif"}},{when:["olto-charging-dock","olto-battery"],replace:{"olto-battery":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6921a4037d0eab061d3d7ca4_Battery%20Dock%20with%20Battery%20Plugged%20in.avif"},hide:["olto-charging-dock"]}]};var G="GraphQL Client";var Se="An error occurred while fetching from the API. Review 'graphQLErrors' for details.",ke="Response returned unexpected Content-Type:",Ee="An unknown error has occurred. The API did not return a data object or any errors in its response.",se={json:"application/json",multipart:"multipart/mixed"},Ie="X-SDK-Variant",Ae="X-SDK-Version",_t="shopify-graphql-client",Nt="1.4.2",le=1e3,St=[429,503],Le=/@(defer)\b/i,xt=`\r
`,kt=/boundary="?([^=";]+)"?/i,Te=xt+xt;function R(e,t=G){return e.startsWith(`${t}`)?e:`${t}: ${e}`}function M(e){return e instanceof Error?e.message:JSON.stringify(e)}function Re(e){return e instanceof Error&&e.cause?e.cause:void 0}function $e(e){return e.flatMap(({errors:t})=>t!=null?t:[])}function ce({client:e,retries:t}){if(t!==void 0&&(typeof t!="number"||t<0||t>3))throw new Error(`${e}: The provided "retries" value (${t}) is invalid - it cannot be less than ${0} or greater than ${3}`)}function x(e,t){return t&&(typeof t!="object"||Array.isArray(t)||typeof t=="object"&&Object.keys(t).length>0)?{[e]:t}:{}}function Oe(e,t){if(e.length===0)return t;let o={[e.pop()]:t};return e.length===0?o:Oe(e,o)}function At(e,t){return Object.keys(t||{}).reduce((a,o)=>(typeof t[o]=="object"||Array.isArray(t[o]))&&e[o]?(a[o]=At(e[o],t[o]),a):(a[o]=t[o],a),Array.isArray(e)?[...e]:{...e})}function Me([e,...t]){return t.reduce(At,{...e})}function De({clientLogger:e,customFetchApi:t=fetch,client:a=G,defaultRetryWaitTime:o=le,retriableCodes:r=St}){let n=async(i,s,c)=>{let d=s+1,l=c+1,f;try{if(f=await t(...i),e({type:"HTTP-Response",content:{requestParams:i,response:f}}),!f.ok&&r.includes(f.status)&&d<=l)throw new Error;let h=(f==null?void 0:f.headers.get("X-Shopify-API-Deprecated-Reason"))||"";return h&&e({type:"HTTP-Response-GraphQL-Deprecation-Notice",content:{requestParams:i,deprecationNotice:h}}),f}catch(h){if(d<=l){let y=f==null?void 0:f.headers.get("Retry-After");return await ka(y?parseInt(y,10):o),e({type:"HTTP-Retry",content:{requestParams:i,lastResponse:f,retryAttempt:s,maxRetries:c}}),n(i,d,c)}throw new Error(R(`${c>0?`Attempted maximum number of ${c} network retries. Last message - `:""}${M(h)}`,a))}};return n}async function ka(e){return new Promise(t=>setTimeout(t,e))}function Pe({headers:e,url:t,customFetchApi:a=fetch,retries:o=0,logger:r}){ce({client:G,retries:o});let n={headers:e,url:t,retries:o},i=Ea(r),s=De({customFetchApi:a,clientLogger:i,defaultRetryWaitTime:le}),c=Ia(s,n),d=Aa(c),l=Da(c);return{config:n,fetch:c,request:d,requestStream:l}}function Ea(e){return t=>{e&&e(t)}}async function Lt(e){let{errors:t,data:a,extensions:o}=await e.json();return{...x("data",a),...x("extensions",o),headers:e.headers,...t||!a?{errors:{networkStatusCode:e.status,message:R(t?Se:Ee),...x("graphQLErrors",t),response:e}}:{}}}function Ia(e,{url:t,headers:a,retries:o}){return async(r,n={})=>{let{variables:i,headers:s,url:c,retries:d,keepalive:l,signal:f}=n,h=JSON.stringify({query:r,variables:i});ce({client:G,retries:d});let y=Object.entries({...a,...s}).reduce((I,[A,D])=>(I[A]=Array.isArray(D)?D.join(", "):D.toString(),I),{});!y[Ie]&&!y[Ae]&&(y[Ie]=_t,y[Ae]=Nt);let O=[c!=null?c:t,{method:"POST",headers:y,body:h,signal:f,keepalive:l}];return e(O,1,d!=null?d:o)}}function Aa(e){return async(...t)=>{if(Le.test(t[0]))throw new Error(R("This operation will result in a streamable response - use requestStream() instead."));let a=null;try{a=await e(...t);let{status:o,statusText:r}=a,n=a.headers.get("content-type")||"";return a.ok?n.includes(se.json)?await Lt(a):{errors:{networkStatusCode:o,message:R(`${ke} ${n}`),response:a}}:{errors:{networkStatusCode:o,message:R(r),response:a}}}catch(o){return{errors:{message:M(o),...a==null?{}:{networkStatusCode:a.status,response:a}}}}}}async function*La(e){let t=new TextDecoder;if(e.body[Symbol.asyncIterator])for await(let a of e.body)yield t.decode(a);else{let a=e.body.getReader(),o;try{for(;!(o=await a.read()).done;)yield t.decode(o.value)}finally{a.cancel()}}}function Ta(e,t){return{async*[Symbol.asyncIterator](){try{let a="";for await(let o of e)if(a+=o,a.indexOf(t)>-1){let r=a.lastIndexOf(t),i=a.slice(0,r).split(t).filter(s=>s.trim().length>0).map(s=>s.slice(s.indexOf(Te)+Te.length).trim());i.length>0&&(yield i),a=a.slice(r+t.length),a.trim()==="--"&&(a="")}}catch(a){throw new Error(`Error occured while processing stream payload - ${M(a)}`)}}}}function Ra(e){return{async*[Symbol.asyncIterator](){try{yield{...await Lt(e),hasNext:!1}}catch(t){yield{errors:{message:R(M(t)),networkStatusCode:e.status,response:e},hasNext:!1}}}}}function $a(e){return e.map(t=>{try{return JSON.parse(t)}catch(a){throw new Error(`Error in parsing multipart response - ${M(a)}`)}}).map(t=>{let{data:a,incremental:o,hasNext:r,extensions:n,errors:i}=t;if(!o)return{data:a||{},...x("errors",i),...x("extensions",n),hasNext:r};let s=o.map(({data:c,path:d,errors:l})=>({data:c&&d?Oe(d,c):{},...x("errors",l)}));return{data:s.length===1?s[0].data:Me([...s.map(({data:c})=>c)]),...x("errors",$e(s)),hasNext:r}})}function Oa(e,t){if(e.length>0)throw new Error(Se,{cause:{graphQLErrors:e}});if(Object.keys(t).length===0)throw new Error(Ee)}function Ma(e,t){var s,c;let a=(t!=null?t:"").match(kt),o=`--${a?a[1]:"-"}`;if(!((s=e.body)!=null&&s.getReader)&&!((c=e.body)!=null&&c[Symbol.asyncIterator]))throw new Error("API multipart response did not return an iterable body",{cause:e});let r=La(e),n={},i;return{async*[Symbol.asyncIterator](){var d,l;try{let f=!0;for await(let h of Ta(r,o)){let y=$a(h);i=(l=(d=y.find(I=>I.extensions))==null?void 0:d.extensions)!=null?l:i;let O=$e(y);n=Me([n,...y.map(({data:I})=>I)]),f=y.slice(-1)[0].hasNext,Oa(O,n),yield{...x("data",n),...x("extensions",i),hasNext:f}}if(f)throw new Error("Response stream terminated unexpectedly")}catch(f){let h=Re(f);yield{...x("data",n),...x("extensions",i),errors:{message:R(M(f)),networkStatusCode:e.status,...x("graphQLErrors",h==null?void 0:h.graphQLErrors),response:e},hasNext:!1}}}}}function Da(e){return async(...t)=>{if(!Le.test(t[0]))throw new Error(R("This operation does not result in a streamable response - use request() instead."));try{let a=await e(...t),{statusText:o}=a;if(!a.ok)throw new Error(o,{cause:a});let r=a.headers.get("content-type")||"";switch(!0){case r.includes(se.json):return Ra(a);case r.includes(se.multipart):return Ma(a,r);default:throw new Error(`${ke} ${r}`,{cause:a})}}catch(a){return{async*[Symbol.asyncIterator](){let o=Re(a);yield{errors:{message:R(M(a)),...x("networkStatusCode",o==null?void 0:o.status),...x("response",o)},hasNext:!1}}}}}}function He({client:e,storeDomain:t}){try{if(!t||typeof t!="string")throw new Error;let a=t.trim(),o=a.match(/^https?:/)?a:`https://${a}`,r=new URL(o);return r.protocol="https",r.origin}catch(a){throw new Error(`${e}: a valid store domain ("${t}") must be provided`,{cause:a})}}function de({client:e,currentSupportedApiVersions:t,apiVersion:a,logger:o}){let r=`${e}: the provided apiVersion ("${a}")`,n=`Currently supported API versions: ${t.join(", ")}`;if(!a||typeof a!="string")throw new Error(`${r} is invalid. ${n}`);let i=a.trim();t.includes(i)||(o?o({type:"Unsupported_Api_Version",content:{apiVersion:a,supportedApiVersions:t}}):console.warn(`${r} is likely deprecated or not supported. ${n}`))}function ue(e){let t=e*3-2;return t===10?t:`0${t}`}function qe(e,t,a){let o=t-a;return o<=0?`${e-1}-${ue(o+4)}`:`${e}-${ue(o)}`}function Tt(){let e=new Date,t=e.getUTCMonth(),a=e.getUTCFullYear(),o=Math.floor(t/3+1);return{year:a,quarter:o,version:`${a}-${ue(o)}`}}function Be(){let{year:e,quarter:t,version:a}=Tt(),o=t===4?`${e+1}-01`:`${e}-${ue(t+1)}`;return[qe(e,t,3),qe(e,t,2),qe(e,t,1),a,o,"unstable"]}function Ve(e){return t=>({...t!=null?t:{},...e.headers})}function Fe({getHeaders:e,getApiUrl:t}){return(a,o)=>{let r=[a];if(o&&Object.keys(o).length>0){let{variables:n,apiVersion:i,headers:s,retries:c,signal:d}=o;r.push({...n?{variables:n}:{},...s?{headers:e(s)}:{},...i?{url:t(i)}:{},...c?{retries:c}:{},...d?{signal:d}:{}})}return r}}var Ue="application/json",Rt="storefront-api-client",$t="1.0.10",Ot="X-Shopify-Storefront-Access-Token",Mt="Shopify-Storefront-Private-Token",Dt="X-SDK-Variant",Pt="X-SDK-Version",Ht="X-SDK-Variant-Source",K="Storefront API Client";function qt(e){if(e&&typeof window!="undefined")throw new Error(`${K}: private access tokens and headers should only be used in a server-to-server implementation. Use the public API access token in nonserver environments.`)}function Bt(e,t){if(!e&&!t)throw new Error(`${K}: a public or private access token must be provided`);if(e&&t)throw new Error(`${K}: only provide either a public or private access token`)}function ze({storeDomain:e,apiVersion:t,publicAccessToken:a,privateAccessToken:o,clientName:r,retries:n=0,customFetchApi:i,logger:s}){let c=Be(),d=He({client:K,storeDomain:e}),l={client:K,currentSupportedApiVersions:c,logger:s};de({...l,apiVersion:t}),Bt(a,o),qt(o);let f=Pa(d,t,l),h={storeDomain:d,apiVersion:t,...a?{publicAccessToken:a}:{privateAccessToken:o},headers:{"Content-Type":Ue,Accept:Ue,[Dt]:Rt,[Pt]:$t,...r?{[Ht]:r}:{},...a?{[Ot]:a}:{[Mt]:o}},apiUrl:f(),clientName:r},y=Pe({headers:h.headers,url:h.apiUrl,retries:n,customFetchApi:i,logger:s}),O=Ve(h),I=Ha(h,f),A=Fe({getHeaders:O,getApiUrl:I});return Object.freeze({config:h,getHeaders:O,getApiUrl:I,fetch:(...H)=>y.fetch(...A(...H)),request:(...H)=>y.request(...A(...H)),requestStream:(...H)=>y.requestStream(...A(...H))})}function Pa(e,t,a){return o=>{o&&de({...a,apiVersion:o});let r=(o!=null?o:t).trim();return`${e}/api/${r}/graphql.json`}}function Ha(e,t){return a=>a?t(a):e.apiUrl}var pe={SHOPIFY_STORE_DOMAIN:"shop.infinitemachine.com",SHOPIFY_STOREFRONT_PUBLIC_TOKEN:"eefb42e32220791a7472aaa5d2cf2182",SHOPIFY_API_VERSION:"2026-04"};var q=ze({storeDomain:pe.SHOPIFY_STORE_DOMAIN,apiVersion:pe.SHOPIFY_API_VERSION,publicAccessToken:pe.SHOPIFY_STOREFRONT_PUBLIC_TOKEN});var Ut="olto_cart_",qa="cfg_",Ke="config",$=null,p=null,j=null,Ye=null,k=null,fe=[],Ba=[];function B(e){j=e,p=e}var J=null;function zt(e){J=e}async function Gt(e){var a;Ye=e.id,k=Vt()||Wt();let t=Ga();if(t)try{let o=await Fa(t);o&&($=t,B(o))}catch(o){console.warn("[Cart] Failed to restore cart, will create new:",o)}if(!$){let o=await Va();B(o),$=o.id,Ka($)}if(!Vt()&&((a=p==null?void 0:p.lines)!=null&&a.length)){let o=Ua(p);o&&(k=o)}return Zt(k),E(),Qt(),p}function We(){return p==null?void 0:p.checkoutUrl}function ee(){return k}function Qe(){return k=Wt(),Zt(k),Qt(),k}async function Kt(e){te();let t=j,a=((t==null?void 0:t.lines)||[]).filter(o=>{var r;return((r=o.attributesByKey)==null?void 0:r._config_id)===e}).map(o=>o.id);a.length!==0&&(await Je(a),e===k&&Qe())}async function Ze(e){te();let t=p,a=je(k),o=e.map(n=>Jt(n.variantId,n.quantity||a,{...n.attributes||{},_config_id:k})).filter(Boolean);o.length&&(p=Xt(p,o),E());let r=e.map(n=>({merchandiseId:n.variantId,quantity:n.quantity||a,attributes:X({...n.attributes||{},_config_id:k})}));try{return B(await me(()=>Y("cartLinesAdd",`
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ${V} }
          userErrors { field message }
        }
      }
    `,{cartId:$,lines:r}))),E(),p}catch(n){throw p=t,E(),n}}async function Je(e){te();let t=p,a=new Set(e);p&&(p={...p,lines:p.lines.filter(o=>!a.has(o.id))},E());try{return B(await me(()=>Y("cartLinesRemove",`
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ${V} }
          userErrors { field message }
        }
      }
    `,{cartId:$,lineIds:e}))),E(),p}catch(o){throw p=t,E(),o}}async function jt({lineId:e,variantId:t,quantity:a,attributes:o}){te();let r=p;p&&(p={...p,lines:p.lines.map(i=>{if(i.id!==e)return i;let s={...i};if(t!==void 0){let c=et(t)||i.merchandise;s.merchandise=c}if(a!==void 0&&(s.quantity=a),o!==void 0){let c=X(o);s.attributes=c,s.attributesByKey=Object.fromEntries(c.map(d=>[d.key,d.value]))}return s})},E());let n={id:e};t!==void 0&&(n.merchandiseId=t),a!==void 0&&(n.quantity=a),o!==void 0&&(n.attributes=X(o));try{return B(await me(()=>Y("cartLinesUpdate",`
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ${V} }
          userErrors { field message }
        }
      }
    `,{cartId:$,lines:[n]}))),E(),p}catch(i){throw p=r,E(),i}}function Yt(e){return fe.push(e),p&&e(p),()=>{fe=fe.filter(t=>t!==e)}}var V=`
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
`;async function Va(){var o;let{data:e,errors:t}=await q.request(`
    mutation CartCreate {
      cartCreate(input: {}) {
        cart { ${V} }
        userErrors { field message }
      }
    }
  `);if(t)throw new Error(`[Cart] createCart errors: ${JSON.stringify(t)}`);let a=(o=e==null?void 0:e.cartCreate)==null?void 0:o.userErrors;if(a!=null&&a.length)throw new Error(`[Cart] createCart userErrors: ${JSON.stringify(a)}`);return Xe(e.cartCreate.cart)}async function Fa(e){let{data:t,errors:a}=await q.request(`
    query GetCart($id: ID!) {
      cart(id: $id) { ${V} }
    }
  `,{variables:{id:e}});if(a)throw new Error(`[Cart] queryCart errors: ${JSON.stringify(a)}`);return t!=null&&t.cart?Xe(t.cart):null}async function Y(e,t,a){var i;let{data:o,errors:r}=await q.request(t,{variables:a});if(r)throw new Error(`[Cart] ${e} errors: ${JSON.stringify(r)}`);let n=o==null?void 0:o[e];if((i=n==null?void 0:n.userErrors)!=null&&i.length)throw new Error(`[Cart] ${e} userErrors: ${JSON.stringify(n.userErrors)}`);return Xe(n.cart)}function Xe(e){let t=e.attributes||[];return{id:e.id,checkoutUrl:e.checkoutUrl,totalQuantity:e.totalQuantity,cost:e.cost,attributes:t,attributesByKey:Object.fromEntries(t.map(a=>[a.key,a.value])),lines:e.lines.edges.map(({node:a})=>({id:a.id,quantity:a.quantity,attributes:a.attributes,attributesByKey:Object.fromEntries(a.attributes.map(o=>[o.key,o.value])),merchandise:a.merchandise}))}}function X(e){return Object.entries(e).filter(([,t])=>t!=null&&t!=="").map(([t,a])=>({key:t,value:String(a)}))}function te(){if(!$)throw new Error("[Cart] Called before initCart(config)")}function E(){for(let e of fe)e(p)}function Wt(){return`${qa}${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function je(e){var o;let t=j||p;if(!((o=t==null?void 0:t.lines)!=null&&o.length))return 1;let a=t.lines.find(r=>{var n;return((n=r.attributesByKey)==null?void 0:n._config_id)===e});return(a==null?void 0:a.quantity)||1}function Qt(){for(let e of Ba)e(k)}function Vt(){return typeof window=="undefined"?null:new URLSearchParams(window.location.search).get(Ke)}function Zt(e){if(typeof window=="undefined")return;let t=new URLSearchParams(window.location.search);e?t.set(Ke,e):t.delete(Ke),window.history.replaceState({},"",`${window.location.pathname}?${t.toString()}`)}function Ua(e){var a;if(!((a=e==null?void 0:e.lines)!=null&&a.length))return null;let t=e.lines.map(o=>{var r;return(r=o.attributesByKey)==null?void 0:r._config_id}).filter(Boolean).sort();return t[t.length-1]||null}var Ft=Promise.resolve();async function me(e){let t=Ft,a;Ft=new Promise(o=>{a=o}),await t;try{return await e()}finally{a()}}var Ge=new Map;function za(e,t){let a=Ge.get(e)||{inflight:null,latest:null};return a.latest=t,Ge.set(e,a),a.inflight||(a.inflight=(async()=>{for(;a.latest;){let o=a.latest;a.latest=null;try{await me(o)}catch(r){console.error(`[Cart] coalesce(${e}) error:`,r)}}a.inflight=null,Ge.delete(e)})()),a.inflight}async function he(e,t){te();let a=k;if(p){let o=p.lines.findIndex(r=>{var n;return r.merchandise.product.handle===e&&((n=r.attributesByKey)==null?void 0:n._config_id)===a});if(o>=0&&t===null)p={...p,lines:p.lines.filter((r,n)=>n!==o)};else if(o>=0&&t){let r=et(t);r&&(p={...p,lines:p.lines.map((n,i)=>i===o?{...n,merchandise:r}:n)})}else if(o<0&&t){let r=je(a),n=Jt(t,r,{_config_id:a});n&&(p=Xt(p,[n]))}E()}return za(`product:${e}:${a}`,async()=>{let o=j==null?void 0:j.lines.find(r=>{var n;return r.merchandise.product.handle===e&&((n=r.attributesByKey)==null?void 0:n._config_id)===a});if(t===null){o&&(B(await Y("cartLinesRemove",`
          mutation($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart { ${V} } userErrors { field message }
            }
          }
        `,{cartId:$,lineIds:[o.id]})),E());return}if(o)B(await Y("cartLinesUpdate",`
        mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart { ${V} } userErrors { field message }
          }
        }
      `,{cartId:$,lines:[{id:o.id,merchandiseId:t}]}));else{let r=je(a);B(await Y("cartLinesAdd",`
        mutation($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart { ${V} } userErrors { field message }
          }
        }
      `,{cartId:$,lines:[{merchandiseId:t,quantity:r,attributes:X({_config_id:a})}]}))}E()})}function et(e){if(!J)return null;let t=[J.main,J.wrap,...J.accessories||[]].filter(Boolean);for(let a of t){let o=a.variants.find(r=>r.id===e);if(o)return{id:o.id,title:o.title,price:o.price,image:o.image,selectedOptions:o.selectedOptions,product:{id:a.id,handle:a.handle,title:a.title}}}return null}function Jt(e,t,a){let o=et(e);if(!o)return null;let r=X(a);return{id:`tmp_${Math.random().toString(36).slice(2,10)}`,quantity:t,attributes:r,attributesByKey:Object.fromEntries(r.map(n=>[n.key,n.value])),merchandise:o}}function Xt(e,t){return e&&{...e,lines:[...e.lines,...t],totalQuantity:(e.totalQuantity||0)+t.reduce((a,o)=>a+(o.quantity||1),0)}}function Ga(){return typeof localStorage=="undefined"?null:localStorage.getItem(`${Ut}${Ye}`)}function Ka(e){typeof localStorage!="undefined"&&localStorage.setItem(`${Ut}${Ye}`,e)}var ge=[{Name:"United States",Code:"US"},{Name:"Afghanistan",Code:"AF"},{Name:"Albania",Code:"AL"},{Name:"Algeria",Code:"DZ"},{Name:"American Samoa",Code:"AS"},{Name:"Andorra",Code:"AD"},{Name:"Angola",Code:"AO"},{Name:"Anguilla",Code:"AI"},{Name:"Antarctica",Code:"AQ"},{Name:"Antigua and Barbuda",Code:"AG"},{Name:"Argentina",Code:"AR"},{Name:"Armenia",Code:"AM"},{Name:"Aruba",Code:"AW"},{Name:"Australia",Code:"AU"},{Name:"Austria",Code:"AT"},{Name:"Azerbaijan",Code:"AZ"},{Name:"Bahamas",Code:"BS"},{Name:"Bahrain",Code:"BH"},{Name:"Bangladesh",Code:"BD"},{Name:"Barbados",Code:"BB"},{Name:"Belarus",Code:"BY"},{Name:"Belgium",Code:"BE"},{Name:"Belize",Code:"BZ"},{Name:"Benin",Code:"BJ"},{Name:"Bermuda",Code:"BM"},{Name:"Bhutan",Code:"BT"},{Name:"Bolivia, Plurinational State of",Code:"BO"},{Name:"Bonaire, Sint Eustatius and Saba",Code:"BQ"},{Name:"Bosnia and Herzegovina",Code:"BA"},{Name:"Botswana",Code:"BW"},{Name:"Bouvet Island",Code:"BV"},{Name:"Brazil",Code:"BR"},{Name:"British Indian Ocean Territory",Code:"IO"},{Name:"Brunei Darussalam",Code:"BN"},{Name:"Bulgaria",Code:"BG"},{Name:"Burkina Faso",Code:"BF"},{Name:"Burundi",Code:"BI"},{Name:"Cambodia",Code:"KH"},{Name:"Cameroon",Code:"CM"},{Name:"Canada",Code:"CA"},{Name:"Cape Verde",Code:"CV"},{Name:"Cayman Islands",Code:"KY"},{Name:"Central African Republic",Code:"CF"},{Name:"Chad",Code:"TD"},{Name:"Chile",Code:"CL"},{Name:"China",Code:"CN"},{Name:"Christmas Island",Code:"CX"},{Name:"Cocos (Keeling) Islands",Code:"CC"},{Name:"Colombia",Code:"CO"},{Name:"Comoros",Code:"KM"},{Name:"Congo",Code:"CG"},{Name:"Congo, the Democratic Republic of the",Code:"CD"},{Name:"Cook Islands",Code:"CK"},{Name:"Costa Rica",Code:"CR"},{Name:"Croatia",Code:"HR"},{Name:"Cuba",Code:"CU"},{Name:"Cura\xE7ao",Code:"CW"},{Name:"Cyprus",Code:"CY"},{Name:"Czech Republic",Code:"CZ"},{Name:"C\xF4te d'Ivoire",Code:"CI"},{Name:"Denmark",Code:"DK"},{Name:"Djibouti",Code:"DJ"},{Name:"Dominica",Code:"DM"},{Name:"Dominican Republic",Code:"DO"},{Name:"Ecuador",Code:"EC"},{Name:"Egypt",Code:"EG"},{Name:"El Salvador",Code:"SV"},{Name:"Equatorial Guinea",Code:"GQ"},{Name:"Eritrea",Code:"ER"},{Name:"Estonia",Code:"EE"},{Name:"Ethiopia",Code:"ET"},{Name:"Falkland Islands (Malvinas)",Code:"FK"},{Name:"Faroe Islands",Code:"FO"},{Name:"Fiji",Code:"FJ"},{Name:"Finland",Code:"FI"},{Name:"France",Code:"FR"},{Name:"French Guiana",Code:"GF"},{Name:"French Polynesia",Code:"PF"},{Name:"French Southern Territories",Code:"TF"},{Name:"Gabon",Code:"GA"},{Name:"Gambia",Code:"GM"},{Name:"Georgia",Code:"GE"},{Name:"Germany",Code:"DE"},{Name:"Ghana",Code:"GH"},{Name:"Gibraltar",Code:"GI"},{Name:"Greece",Code:"GR"},{Name:"Greenland",Code:"GL"},{Name:"Grenada",Code:"GD"},{Name:"Guadeloupe",Code:"GP"},{Name:"Guam",Code:"GU"},{Name:"Guatemala",Code:"GT"},{Name:"Guernsey",Code:"GG"},{Name:"Guinea",Code:"GN"},{Name:"Guinea-Bissau",Code:"GW"},{Name:"Guyana",Code:"GY"},{Name:"Haiti",Code:"HT"},{Name:"Heard Island and McDonald Islands",Code:"HM"},{Name:"Holy See (Vatican City State)",Code:"VA"},{Name:"Honduras",Code:"HN"},{Name:"Hong Kong",Code:"HK"},{Name:"Hungary",Code:"HU"},{Name:"Iceland",Code:"IS"},{Name:"India",Code:"IN"},{Name:"Indonesia",Code:"ID"},{Name:"Iran, Islamic Republic of",Code:"IR"},{Name:"Iraq",Code:"IQ"},{Name:"Ireland",Code:"IE"},{Name:"Isle of Man",Code:"IM"},{Name:"Israel",Code:"IL"},{Name:"Italy",Code:"IT"},{Name:"Jamaica",Code:"JM"},{Name:"Japan",Code:"JP"},{Name:"Jersey",Code:"JE"},{Name:"Jordan",Code:"JO"},{Name:"Kazakhstan",Code:"KZ"},{Name:"Kenya",Code:"KE"},{Name:"Kiribati",Code:"KI"},{Name:"Korea, Democratic People's Republic of",Code:"KP"},{Name:"Korea, Republic of",Code:"KR"},{Name:"Kuwait",Code:"KW"},{Name:"Kyrgyzstan",Code:"KG"},{Name:"Lao People's Democratic Republic",Code:"LA"},{Name:"Latvia",Code:"LV"},{Name:"Lebanon",Code:"LB"},{Name:"Lesotho",Code:"LS"},{Name:"Liberia",Code:"LR"},{Name:"Libya",Code:"LY"},{Name:"Liechtenstein",Code:"LI"},{Name:"Lithuania",Code:"LT"},{Name:"Luxembourg",Code:"LU"},{Name:"Macao",Code:"MO"},{Name:"Macedonia, the Former Yugoslav Republic of",Code:"MK"},{Name:"Madagascar",Code:"MG"},{Name:"Malawi",Code:"MW"},{Name:"Malaysia",Code:"MY"},{Name:"Maldives",Code:"MV"},{Name:"Mali",Code:"ML"},{Name:"Malta",Code:"MT"},{Name:"Marshall Islands",Code:"MH"},{Name:"Martinique",Code:"MQ"},{Name:"Mauritania",Code:"MR"},{Name:"Mauritius",Code:"MU"},{Name:"Mayotte",Code:"YT"},{Name:"Mexico",Code:"MX"},{Name:"Micronesia, Federated States of",Code:"FM"},{Name:"Moldova, Republic of",Code:"MD"},{Name:"Monaco",Code:"MC"},{Name:"Mongolia",Code:"MN"},{Name:"Montenegro",Code:"ME"},{Name:"Montserrat",Code:"MS"},{Name:"Morocco",Code:"MA"},{Name:"Mozambique",Code:"MZ"},{Name:"Myanmar",Code:"MM"},{Name:"Namibia",Code:"NA"},{Name:"Nauru",Code:"NR"},{Name:"Nepal",Code:"NP"},{Name:"Netherlands",Code:"NL"},{Name:"New Caledonia",Code:"NC"},{Name:"New Zealand",Code:"NZ"},{Name:"Nicaragua",Code:"NI"},{Name:"Niger",Code:"NE"},{Name:"Nigeria",Code:"NG"},{Name:"Niue",Code:"NU"},{Name:"Norfolk Island",Code:"NF"},{Name:"Northern Mariana Islands",Code:"MP"},{Name:"Norway",Code:"NO"},{Name:"Oman",Code:"OM"},{Name:"Pakistan",Code:"PK"},{Name:"Palau",Code:"PW"},{Name:"Palestine, State of",Code:"PS"},{Name:"Panama",Code:"PA"},{Name:"Papua New Guinea",Code:"PG"},{Name:"Paraguay",Code:"PY"},{Name:"Peru",Code:"PE"},{Name:"Philippines",Code:"PH"},{Name:"Pitcairn",Code:"PN"},{Name:"Poland",Code:"PL"},{Name:"Portugal",Code:"PT"},{Name:"Puerto Rico",Code:"PR"},{Name:"Qatar",Code:"QA"},{Name:"Romania",Code:"RO"},{Name:"Russian Federation",Code:"RU"},{Name:"Rwanda",Code:"RW"},{Name:"R\xE9union",Code:"RE"},{Name:"Saint Barth\xE9lemy",Code:"BL"},{Name:"Saint Helena, Ascension and Tristan da Cunha",Code:"SH"},{Name:"Saint Kitts and Nevis",Code:"KN"},{Name:"Saint Lucia",Code:"LC"},{Name:"Saint Martin (French part)",Code:"MF"},{Name:"Saint Pierre and Miquelon",Code:"PM"},{Name:"Saint Vincent and the Grenadines",Code:"VC"},{Name:"Samoa",Code:"WS"},{Name:"San Marino",Code:"SM"},{Name:"Sao Tome and Principe",Code:"ST"},{Name:"Saudi Arabia",Code:"SA"},{Name:"Senegal",Code:"SN"},{Name:"Serbia",Code:"RS"},{Name:"Seychelles",Code:"SC"},{Name:"Sierra Leone",Code:"SL"},{Name:"Singapore",Code:"SG"},{Name:"Sint Maarten (Dutch part)",Code:"SX"},{Name:"Slovakia",Code:"SK"},{Name:"Slovenia",Code:"SI"},{Name:"Solomon Islands",Code:"SB"},{Name:"Somalia",Code:"SO"},{Name:"South Africa",Code:"ZA"},{Name:"South Georgia and the South Sandwich Islands",Code:"GS"},{Name:"South Sudan",Code:"SS"},{Name:"Spain",Code:"ES"},{Name:"Sri Lanka",Code:"LK"},{Name:"Sudan",Code:"SD"},{Name:"Suriname",Code:"SR"},{Name:"Svalbard and Jan Mayen",Code:"SJ"},{Name:"Swaziland",Code:"SZ"},{Name:"Sweden",Code:"SE"},{Name:"Switzerland",Code:"CH"},{Name:"Syrian Arab Republic",Code:"SY"},{Name:"Taiwan, Province of China",Code:"TW"},{Name:"Tajikistan",Code:"TJ"},{Name:"Tanzania, United Republic of",Code:"TZ"},{Name:"Thailand",Code:"TH"},{Name:"Timor-Leste",Code:"TL"},{Name:"Togo",Code:"TG"},{Name:"Tokelau",Code:"TK"},{Name:"Tonga",Code:"TO"},{Name:"Trinidad and Tobago",Code:"TT"},{Name:"Tunisia",Code:"TN"},{Name:"Turkey",Code:"TR"},{Name:"Turkmenistan",Code:"TM"},{Name:"Turks and Caicos Islands",Code:"TC"},{Name:"Tuvalu",Code:"TV"},{Name:"Uganda",Code:"UG"},{Name:"Ukraine",Code:"UA"},{Name:"United Arab Emirates",Code:"AE"},{Name:"United Kingdom",Code:"GB"},{Name:"United States Minor Outlying Islands",Code:"UM"},{Name:"Uruguay",Code:"UY"},{Name:"Uzbekistan",Code:"UZ"},{Name:"Vanuatu",Code:"VU"},{Name:"Venezuela, Bolivarian Republic of",Code:"VE"},{Name:"Viet Nam",Code:"VN"},{Name:"Virgin Islands, British",Code:"VG"},{Name:"Virgin Islands, U.S.",Code:"VI"},{Name:"Wallis and Futuna",Code:"WF"},{Name:"Western Sahara",Code:"EH"},{Name:"Yemen",Code:"YE"},{Name:"Zambia",Code:"ZM"},{Name:"Zimbabwe",Code:"ZW"},{Name:"\xC5land Islands",Code:"AX"}];var tt=new Map,at=`
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
`;async function ea(e){var s;if(tt.has(e.id))return tt.get(e.id);let t=!!((s=e.wrap)!=null&&s.productHandle),a=`
    query LoadConfigurator(
      $productHandle: String!
      $accessoriesHandle: String!
      ${t?"$wrapHandle: String!":""}
    ) {
      main: product(handle: $productHandle) { ${at} }
      accessoriesCollection: collection(handle: $accessoriesHandle) {
        title
        handle
        products(first: 50) {
          edges { node { ${at} } }
        }
      }
      ${t?`wrap: product(handle: $wrapHandle) { ${at} }`:""}
    }
  `,o={productHandle:e.product.handle,accessoriesHandle:e.accessoriesCollection};t&&(o.wrapHandle=e.wrap.productHandle);let{data:r,errors:n}=await q.request(a,{variables:o});if(n)throw new Error(`[Products] GraphQL errors: ${JSON.stringify(n)}`);if(!r.main)throw new Error(`[Products] Product not found: ${e.product.handle}`);if(!r.accessoriesCollection)throw new Error(`[Products] Collection not found: ${e.accessoriesCollection}`);let i={main:ot(r.main),wrap:r.wrap?ot(r.wrap):null,accessories:r.accessoriesCollection.products.edges.map(c=>ot(c.node))};return tt.set(e.id,i),i}function ot(e){var t,a,o;return{id:e.id,handle:e.handle,title:e.title,description:e.description,availableForSale:e.availableForSale,productType:e.productType,vendor:e.vendor,tags:e.tags||[],featuredImage:e.featuredImage,accessoryEta:((t=e.accessoryEta)==null?void 0:t.value)||null,instructionVideo:((a=e.instructionVideo)==null?void 0:a.value)||null,collections:(((o=e.collections)==null?void 0:o.edges)||[]).map(r=>r.node),variants:e.variants.edges.map(({node:r})=>({id:r.id,title:r.title,availableForSale:r.availableForSale,quantityAvailable:r.quantityAvailable,price:r.price,compareAtPrice:r.compareAtPrice,selectedOptions:r.selectedOptions,image:r.image}))}}var rt=null,nt=null,ta=[],ye=[],b={ready:!1,region:"",baseNumericId:null,bikeLine:null,wrapLine:null,accessoryLines:[],activeBundle:null,quantity:1,total:0,currency:"USD",payMode:"finance",cart:null};function be(e){return String(e).split("/").pop()}function ve(e){return`gid://shopify/ProductVariant/${e}`}function aa(e){rt=e.config,nt=e.products,ta=e.bundles||[],b.baseNumericId=rt.defaultVariantId,Yt(ja)}function N(){return b}function oa(e){return ye.push(e),()=>{ye=ye.filter(t=>t!==e)}}function it(e){b.region=e,st()}function we(e){b.payMode=e,st()}function st(){for(let e of ye)e(b)}function ja(e){var c,d;let t=ee(),a=((e==null?void 0:e.lines)||[]).filter(l=>{var f;return((f=l.attributesByKey)==null?void 0:f._config_id)===t}),o=nt.main.handle,r=(c=rt.wrap)==null?void 0:c.productHandle,n=new Set(nt.accessories.map(l=>l.handle));b.cart=e,b.bikeLine=a.find(l=>l.merchandise.product.handle===o)||null,b.wrapLine=a.find(l=>l.merchandise.product.handle===r)||null,b.accessoryLines=a.filter(l=>n.has(l.merchandise.product.handle)),b.bikeLine&&(b.baseNumericId=be(b.bikeLine.merchandise.id)),b.quantity=((d=a[0])==null?void 0:d.quantity)||1;let i=0;for(let l of a)i+=parseFloat(l.merchandise.price.amount)*(l.quantity||1),l.merchandise.price.currencyCode&&(b.currency=l.merchandise.price.currencyCode);b.total=i;let s=new Set(b.accessoryLines.map(l=>l.merchandise.product.handle));b.activeBundle=null;for(let l of ta){let f=(l.products||[]).map(h=>h.handle);if(f.length&&f.length===s.size&&f.every(h=>s.has(h))){b.activeBundle=l.handle;break}}b.ready=!0,st()}var ra=`/* Tesla-configurator-inspired mobile page for Olto.
   IM brand take on the Tesla layout: pinned hero, content sheet that scrolls
   over it, circular swatches, sticky order bar. Tokens follow the IM style
   guide (marketing track): Helvetica Now, black on white, flat, IM green as
   signature accent only. Fonts load from the same Webflow CDN the live site
   serves them from. */

@font-face {
  font-family: 'Helvetica Now Display';
  font-weight: 300;
  font-style: normal;
  font-display: swap;
  src: url('https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6685c0265fa647954105d376_Monotype_-_Helvetica_Now_Display_Light.woff')
    format('woff');
}

@font-face {
  font-family: 'Helvetica Now Display';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url('https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6685c0254c157c5319ffa5a1_Monotype_-_Helvetica_Now_Display.woff') format('woff');
}

@font-face {
  font-family: 'Helvetica Now Display';
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  src: url('https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6685c7aa3569c5fad948926f_Monotype_-_Helvetica_Now_Display_Medium.woff')
    format('woff');
}

@font-face {
  font-family: 'Helvetica Now Text';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url('https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6685c0254089caadd67a3016_Monotype_-_Helvetica_Now_Text.woff') format('woff');
}

@font-face {
  font-family: 'Helvetica Now Text';
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  src: url('https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6685c0252052ff61342f2a9e_Monotype_-_Helvetica_Now_Text_Medium.woff')
    format('woff');
}

/* ---------------------------------------------------------------------------
   Scoping.

   This stylesheet is injected into the live Webflow page, which carries the
   whole site stylesheet, Webflow's normalize, IX2 and several third-party
   widgets. Anything global here would reshape the entire site \u2014 and Webflow's
   own \`body\`/\`button\`/\`img\` rules would deform this UI in return.

   Every rule below is therefore scoped to \`.olto-cfg\`, the class mount() puts
   on the root element in BOTH hosts (the Webflow page's [data-tesla-app] and
   the standalone demo's #app). The custom properties live on the same element
   rather than :root: every region here is a DOM descendant of the mount, so
   they inherit normally even where position:fixed takes them out of flow.
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

.olto-cfg,
.olto-cfg *,
.olto-cfg *::before,
.olto-cfg *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Was \`body\` + \`#app\`. Both collapse onto the mount itself. */
.olto-cfg {
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

.olto-cfg button {
  font-family: inherit;
  border: 0;
  background: none;
  cursor: pointer;
  color: inherit;
}

/* The adopted Webflow form arrives wearing Webflow's own form classes. Neutralise
   them so it inherits this UI rather than the site's. */
.olto-cfg .w-form {
  margin: 0;
}

.olto-cfg .w-input,
.olto-cfg .w-select,
.olto-cfg input[type='text'],
.olto-cfg input[type='email'],
.olto-cfg input[type='tel'] {
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

.olto-cfg input[type='submit'] {
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

.olto-cfg .w-form-done,
.olto-cfg .w-form-fail {
  padding: 16px;
  border-radius: var(--radius);
  background: var(--chip);
  font-size: 0.9rem;
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
  mix-blend-mode: multiply;
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
  background: #eef0f1;
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
  padding: 10px var(--pad) 140px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.sheet_handle {
  width: 36px;
  height: 4px;
  border-radius: 2px;
  background: var(--line);
  margin: 6px auto 22px;
}

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

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 26px;
}

.stats_value {
  font-family: var(--font-display);
  font-size: 19px;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.stats_label {
  margin-top: 3px;
  font-size: 11.5px;
  color: var(--ink-2);
}

/* ---------- Option sections ---------- */

.opt {
  padding: 30px 0;
  border-top: 1px solid var(--line);
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

.swatches {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 22px;
  flex-wrap: wrap;
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

/* Labeled swatch column (consolidated Color row) */

.swatch-opt {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  width: 62px;
}

/* Vinyl wraps sit in their own light-gray rounded box, visually apart from
   the bare Silver base (Eddie, Aug 26 \u2014 solid, not dashed). The row
   top-aligns; Silver's margin must equal the box's padding-top so every
   circle sits on the same horizontal axis. */
.swatches--labeled {
  align-items: flex-start;
}

.swatches--labeled > .swatch-opt {
  margin-top: 37px; /* keep equal to .swatch-box padding-top */
}

.swatch-box {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  /* padding-top must equal Silver's margin-top above \u2014 same circle axis */
  padding: 37px 16px 14px;
  background: var(--chip);
  border-radius: 18px;
}

/* Subtle caption naming what the box holds. Absolutely positioned \u2014 as a
   flex item its flex-basis:100% inflated the box's intrinsic width, which
   stretched it far wider than its swatches (Eddie: "too much padding"). */
.swatch-box_label {
  position: absolute;
  top: 12px;
  left: 0;
  right: 0;
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
  color: var(--ink-3);
}

.swatch_name {
  font-size: 12.5px;
  font-weight: 500;
  line-height: 1;
}

.swatch_sub {
  font-size: 11px;
  color: var(--ink-3);
  line-height: 1;
  margin-top: -2px;
}

/* ---------- Bundles (checklist cards, v6.2 style) ---------- */

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

/* Item list: plain names, nicely spaced \u2014 no checkmarks (Eddie, Aug 26) */
.kit_items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  margin-top: 13px;
}

.kit_item {
  font-size: 13px;
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
}

.acc.is-added {
  border-color: var(--ink);
  box-shadow: inset 0 0 0 1px var(--ink);
}

.acc_img {
  width: 100%;
  height: 104px;
  border-radius: 10px;
  object-fit: cover;
  background: var(--chip);
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

/* ---------- Payment (Cash / Lease / Finance) ---------- */

.paytoggle {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

/* ---------- Interest modal ---------- */

/* ---------- Save / rep nudge ---------- */

.nudge {
  position: fixed;
  left: 50%;
  bottom: calc(92px + env(safe-area-inset-bottom));
  transform: translateX(-50%) translateY(14px);
  width: calc(100% - 2 * var(--pad));
  max-width: 420px;
  padding: 18px;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.14);
  z-index: 45;
  opacity: 0;
  transition: opacity 0.45s cubic-bezier(0.215, 0.61, 0.355, 1),
    transform 0.45s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.nudge.is-in {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.nudge_close {
  position: absolute;
  top: 8px;
  right: 10px;
  padding: 6px;
  font-size: 18px;
  line-height: 1;
  color: var(--ink-3);
}

.nudge_title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 500;
}

.nudge_body {
  margin-top: 4px;
  padding-right: 12px;
  font-size: 13px;
  color: var(--ink-2);
}

.nudge_actions {
  display: flex;
  gap: 8px;
  margin-top: 14px;
}

.nudge_save {
  flex: 1;
  padding: 12px 0;
  border-radius: 999px;
  background: var(--ink);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

.nudge_rep {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  border-radius: 999px;
  border: 1px solid var(--ink);
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
}

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

/* ---------- Save-design lead form ---------- */

/* .leadmodal_cta is sized by display:block on <a>; buttons need the width spelled out */
.olto-cfg button.leadmodal_cta {
  width: 100%;
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
  font-size: 15px;
  text-align: left; /* the sheet centers text \u2014 inputs read left-aligned */
}

.olto-cfg form[data-save-form] .saveform_field:first-of-type {
  margin-top: 20px;
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

/* ---------- Wide desktop: three-pane, live-site configurator layout ----------
   Left spec rail | pinned hero | scrolling options rail (Eddie, Aug 26 \u2014
   "like the live site on desktop, with the best practices we just designed").
   Same fixed-positioning scheme as mobile, re-anchored per pane. */

.rail {
  display: none;
}

@media (min-width: 1140px) {
  :root {
    --rail-w: 292px;
    --sheet-w: 460px;
  }

  .olto-cfg {
    max-width: none;
  }

  .topbar {
    display: none; /* the wordmark lives in the rail */
  }

  .rail {
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
  .rail_block--config {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  .rail_block--config .summary {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
  }

  .rail_mark {
    color: var(--ink);
  }

  .rail_olto {
    margin-top: 10px;
  }

  .rail_olto svg {
    height: 40px;
    width: auto;
    display: block;
  }

  .rail_facts {
    margin-top: 26px;
    border-top: 1px solid var(--line);
  }

  .rail_row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid var(--line);
    font-size: 13.5px;
  }

  .rail_key {
    color: var(--ink-2);
  }

  .rail_val {
    font-weight: 500;
  }

  .rail_val--ship {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .rail_dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--green);
  }

  .rail_block {
    margin-top: 30px;
  }

  .rail_heading {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-3);
    padding-bottom: 10px;
    border-bottom: 1px solid var(--line);
  }

  .rail_list {
    list-style: none;
  }

  .rail_list li {
    padding: 11px 0;
    border-bottom: 1px solid var(--line);
    font-size: 13.5px;
  }

  .rail_block .summary_total {
    font-size: 13.5px;
  }

  .hero {
    left: var(--rail-w);
    right: var(--sheet-w);
    transform: none;
    width: auto;
    max-width: none;
    height: 100vh;
    height: 100dvh;
    border-inline: 0;
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
    padding-top: 30px;
  }

  .sheet_handle {
    display: none;
  }

  /* The rail carries the wordmark, price anchor and delivery \u2014 the sheet
     opens straight into stats + options */
  .intro_title,
  .intro_delivery,
  .intro_price {
    display: none;
  }

  /* ...and the configuration summary */
  .opt--summary {
    display: none;
  }

  .orderbar {
    left: auto;
    right: 0;
    transform: none;
    width: var(--sheet-w);
    max-width: none;
    border-left: 1px solid var(--line);
  }

  .nudge,
  .nudge.is-in {
    left: auto;
    right: calc(var(--sheet-w) + 24px);
  }

  .nudge {
    transform: translateY(14px);
  }

  .nudge.is-in {
    transform: translateY(0);
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

/* ---------- Ship-to country ---------- */

.olto-cfg .intro_ship {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
  font-size: 0.8125rem;
  color: var(--ink-2);
}

.olto-cfg .intro_ship_key {
  color: var(--ink-3);
}

.olto-cfg .intro_country {
  font-family: inherit;
  font-size: 0.8125rem;
  color: var(--ink);
  background: var(--chip);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 5px 10px;
  max-width: 190px;
  cursor: pointer;
}

.olto-cfg .intro_country:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 2px;
}
`;var na='<svg viewBox="0 0 922 201" fill="none" xmlns="http://www.w3.org/2000/svg" class="olto-wordmark" role="img" aria-label="Olto"> <path d="M246.995 19.4652C255.252 28.6186 259.698 41.3214 261.454 61.0855C262.35 70.239 262.649 80.8495 262.649 102.706C262.649 151.985 257.942 170.89 242.885 184.153C231.976 193.605 217.218 198.313 192.41 199.807C182.958 200.405 147.241 201.003 119.817 201.003C59.5913 201.003 43.3765 199.247 26.564 190.093C13.5623 182.995 5.00663 169.433 2.35399 149.968C0.598013 136.966 0.000235075 126.355 0.000235075 94.1874C-0.0371261 48.1211 4.37149 29.8142 18.5687 17.4103C29.1793 7.95792 43.0403 3.54931 68.4458 1.45708C78.496 0.560417 108.011 0 143.99 0C213.631 0 232.237 3.54931 246.995 19.4652ZM46.2907 100.651C46.2907 139.021 49.2422 151.425 60.1517 157.029C71.0611 162.932 80.5135 163.829 136.891 163.829C187.665 163.829 200.331 161.774 208.326 152.919C215.126 145.559 217.181 132.856 217.181 99.4927C217.181 37.8095 216.583 37.2117 131.586 37.2117C46.5896 37.2117 46.2907 38.1084 46.2907 100.651Z" fill="#E90022"/> <path d="M286.86 2.05334H332.328V162.034H476.057V198.909H286.86V2.05334Z" fill="#E90022"/> <path d="M507.328 38.9662H414.673V2.05334H645.154V38.9288H552.759V198.909H507.291V38.9662H507.328Z" fill="#E90022"/> <path d="M906.345 19.4644C914.602 28.6179 919.048 41.3207 920.804 61.0847C921.701 70.2382 922 80.8488 922 102.705C922 151.984 917.292 170.889 902.236 184.152C891.326 193.605 876.569 198.312 851.761 199.807C842.308 200.404 806.591 201.002 779.168 201.002C718.979 201.002 702.727 199.246 685.915 190.093C672.913 182.994 664.357 169.432 661.705 149.967C659.949 136.965 659.351 126.355 659.351 94.1867C659.351 48.1578 663.797 29.8508 677.957 17.4469C688.567 7.99454 702.466 3.58593 727.834 1.49371C737.884 0.597038 767.399 0.0366211 803.378 0.0366211C873.019 0.0366211 891.625 3.58593 906.383 19.5018L906.345 19.4644ZM705.679 100.65C705.679 139.02 708.63 151.424 719.54 157.028C730.449 162.931 739.901 163.828 796.279 163.828C847.053 163.828 859.719 161.773 867.714 152.918C874.514 145.558 876.569 132.855 876.569 99.492C876.569 37.8087 875.971 37.211 790.974 37.211C705.978 37.211 705.679 38.1076 705.679 100.65Z" fill="#E90022"/> </svg>',ia='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 831.97 45.21" class="im-wordmark" fill="currentColor" role="img" aria-label="Infinite Machine"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M13.56.33V44.88H0V.33Z"/><path d="M44.93.33l27,33.86L71.58.33H84.4V44.88H62.63L36,11.35l.34,33.53h-13V.33Z"/><path d="M141.66.33V10.42H107.87V19.3h32.06V29.39H107.87V44.88H94.38V.33Z"/><path d="M163.09.33V44.88H149.54V.33Z"/><path d="M194.46.33l27,33.86L221.11.33h12.82V44.88H212.16L185.58,11.35l.33,33.53h-13V.33Z"/><path d="M257.44.33V44.88H243.89V.33Z"/><path d="M264.52,11.35V.33h53.23v11H297.91V44.88H284.35V11.35Z"/><path d="M374.26,10.42h-36V18.1h33.93v8.81H338.26V34.8h36.47V44.88H324.91V.33h49.35Z"/><path d="M423,.33l16.23,29.59L455.34.33h21.37V44.88H463.49l.67-34.39L444.39,44.88H433.57L414.13,10.49l.4,34.39H401.44V.33Z"/><path d="M526.62.33,551,44.88H536.17l-4.4-8H503.05l-4.28,8H483.41l25-44.55Zm-9.21,9.55-9.49,17.77H527Z"/><path d="M611.09,32.22c0,1.14-.11,2.11-.2,2.91a13.74,13.74,0,0,1-.36,2.07,11.1,11.1,0,0,1-.57,1.6,8.86,8.86,0,0,1-4.21,4.31,21.46,21.46,0,0,1-8.08,1.77q-2.07.19-6.18.27t-10.78.06c-3.21,0-5.91,0-8.12-.13a53.92,53.92,0,0,1-5.61-.47,20.34,20.34,0,0,1-3.9-.9,14.32,14.32,0,0,1-2.94-1.43,10.08,10.08,0,0,1-2.77-2.58,11.37,11.37,0,0,1-1.74-3.87,32.31,32.31,0,0,1-.9-5.84c-.18-2.32-.27-5.12-.27-8.42q0-4.41.27-7.48a23.36,23.36,0,0,1,1-5.24,10,10,0,0,1,1.87-3.54,10.88,10.88,0,0,1,2.9-2.37,16.6,16.6,0,0,1,3.17-1.44,23.22,23.22,0,0,1,4-.9Q570,.27,573.29.13c2.19-.09,4.83-.13,8-.13q6.21,0,10.22.07c2.67,0,4.88.15,6.61.33a27.49,27.49,0,0,1,4.21.7,18,18,0,0,1,3,1.1,8.12,8.12,0,0,1,4,4.35,20.63,20.63,0,0,1,1.27,7.94V16h-13a11.59,11.59,0,0,0-.5-2.87,2.69,2.69,0,0,0-1.7-1.6,12.6,12.6,0,0,0-3.87-.67c-1.7-.09-4-.13-6.95-.13q-4.14,0-6.74.06c-1.74.05-3.13.14-4.18.27a10.12,10.12,0,0,0-2.4.53,5.12,5.12,0,0,0-1.44.87,4.48,4.48,0,0,0-1,1.24,7.48,7.48,0,0,0-.6,1.87,20.61,20.61,0,0,0-.3,2.94c0,1.18-.07,2.66-.07,4.44a42.86,42.86,0,0,0,.37,6.31A5.34,5.34,0,0,0,570,32.66a8,8,0,0,0,4.21,1.43,75.75,75.75,0,0,0,7.68.31c2.54,0,4.57,0,6.11,0s2.77,0,3.71-.1a12.82,12.82,0,0,0,2.13-.23,7.73,7.73,0,0,0,1.47-.5,3.77,3.77,0,0,0,2.07-1.81,8.36,8.36,0,0,0,.6-3.6h13.16C611.16,29.72,611.14,31.09,611.09,32.22Z"/><path d="M633.44.33v16.5H664.3V.33h13.56V44.88H664.3v-17H633.44v17H619.88V.33Z"/><path d="M701.33.33V44.88H687.77V.33Z"/><path d="M732.7.33l27,33.86L759.35.33h12.82V44.88H750.4L723.82,11.35l.33,33.53h-13V.33Z"/><path d="M831.51,10.42h-36V18.1h33.93v8.81H795.51V34.8H832V44.88H782.15V.33h49.36Z"/></g></g></svg>',_="https://cdn.prod.website-files.com/66ea2a84659b76f5d91d481b",ct={"accessory-plate":`${_}/68d53a735e9c987a9499211a_accessory-plate.avif`,"charger-bag":`${_}/68d53a2cb165eb23a2527775_charger-bag.avif`,"olto-center-stand":`${_}/68d53974c880c4b20d23dec9_olto-center-stand.avif`,"olto-charging-dock":`${_}/68d5396153ba7acdd9978c0d_olto-charging-dock.avif`,"olto-kid-carrier":`${_}/6921a92ec4d3dc4a766d69bb_Kid%20Carrier.avif`,"olto-rear-basket":`${_}/68d53b6769ccc4ad6ad7d0b3_olto-rear-basket.avif`,"olto-rear-rack":`${_}/68d53b2e1153a3e349d34c1a_olto-rear-rack.avif`,"olto-side-mounting-plate":`${_}/68d53bea87ff421cf85c858e_olto-side-mounting-plate.avif`,"olto-water-bottle-holder":`${_}/68d53d46367f73dfd1b58a42_olto-water-bottle-holder.avif`,"olto-sidewalls":`${_}/68d53c3ccb4cfb15c59ac6cd_olto-sidewalls.avif`,"olto-super-charger":`${_}/6921a99cb5dd5b924cf4965d_Super%20Charger%20on%20the%20Ground.avif`,"olto-u-lock-mount":`${_}/68d53cf8bb965a6129e84ff4_olto-u-lock-mount.avif`,"open-face-helmet":`${_}/6921a8f20583ec71e2663dce_Black%20Open%20Face%20Helmet.avif`,"kryptonite-lock":`${_}/68d53fc0d2d8d2d151493b5f_kryptonite-lock.avif`,"olto-soft-bag":`${_}/692197c1914921de9b30217a_Soft%20Bag%20on%20the%20Ground.avif`},lt={finance:{months:48,apr:.1599},lease:{months:24,residualPct:.35}};function sa(e,t,a){if(a==="finance"){let{months:o,apr:r}=lt.finance,n=r/12,i=n>0?e*n/(1-(1+n)**-o):e/o;return{amount:i,suffix:"/mo",label:"Est. finance payment",sub:`${o} monthly payments of ${C(i,t)} at ${(r*100).toFixed(2)}% APR. Estimate for illustration \u2014 payment options appear at checkout.`}}if(a==="lease"){let{months:o,residualPct:r}=lt.lease;return{amount:e*(1-r)/o,suffix:"/mo",label:"Est. lease payment",sub:`${o}-month term, ${Math.round(r*100)}% residual. Estimate for illustration.`}}return{amount:e,suffix:"",label:"Est. purchase price",sub:"Taxes and shipping calculated at checkout."}}var Ce=[{key:"commuter",label:"Olto Commuter",tagline:"Everything you need to commute every day.",popular:!0,price:200,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","olto-water-bottle-holder","open-face-helmet","bottom-cover"]},{key:"cargo",label:"Olto Cargo",tagline:"Carry everything.",price:700,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","charger-bag","olto-rear-rack","olto-rear-basket","olto-soft-bag","olto-side-mounting-plate","accessory-plate","olto-center-stand"]},{key:"max",label:"Olto Max",tagline:"Fully loaded. Full power.",price:950,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","olto-water-bottle-holder","charger-bag","olto-rear-rack","olto-rear-basket","olto-soft-bag","olto-side-mounting-plate","accessory-plate","olto-center-stand","olto-super-charger"]}],Wa=new Set(["bottom-cover"]),Qa=[{value:"40 mi",label:"Range (est.)"},{value:"20 mph",label:"Top Speed"},{value:"Class 2",label:"E-bike"}];function C(e,t="USD"){let a=Number(e)||0,o=a%1===0?0:2;return t==="USD"?`$${a.toLocaleString("en-US",{minimumFractionDigits:o,maximumFractionDigits:o})}`:`${t} ${a.toFixed(2)}`}function g(e){return String(e!=null?e:"").replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`)}function W(e,t){return e?`${e}${e.includes("?")?"&":"?"}width=${t}`:""}function la({config:e,products:t,wrapVariantsByColor:a}){let o=Object.entries(e.variants),[r]=o.find(([l])=>l===e.defaultVariantId)||o[0],n=Math.min(...t.main.variants.map(l=>parseFloat(l.price.amount))),{months:i,apr:s}=lt.finance,c=s/12,d=Math.round(n*c/(1-(1+c)**-i));return`
    <header class="topbar">
      <div class="topbar_mark">${ia}</div>
    </header>

    <!-- Wide-desktop left rail (live-site configurator layout); hidden on
         mobile/tablet. [data-summary]/[data-summary-total]/[data-config-reset]
         are duplicated from the sheet \u2014 the render helpers update every match. -->
    <aside class="rail" aria-label="Olto specifications">
      <div class="rail_mark">
        ${ia}
        <div class="rail_olto">${na}</div>
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
          <span class="rail_val">${C(n)}</span>
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
        <button type="button" class="config-clear" data-config-reset>Clear configuration</button>
      </div>
    </aside>

    <section class="hero" aria-label="Olto">
      <img class="hero_img is-active" data-hero-img="a" src="${g(e.variants[r].backgroundImage)}" alt="Olto" />
      <img class="hero_img" data-hero-img="b" alt="" aria-hidden="true" />
      <div class="hero_layers" data-layers>
        ${Object.entries(ct).map(([l,f])=>`<img class="hero_layer" data-layer="${g(l)}" src="${g(f)}" alt="" aria-hidden="true" />`).join("")}
      </div>
    </section>

    <main class="sheet">
      <div class="sheet_handle" aria-hidden="true"></div>

      <section class="intro">
        <h1 class="intro_title">${na}</h1>
        <p class="intro_delivery" data-delivery></p>
        <p class="intro_price">From ${C(n)} \xB7 or ${C(d)}/mo financing</p>
        <!-- Olto ships in the US only. This is also the one field the CRM splits
             US from international on (webflow_submissions.country), and the
             visitor's way to correct a bad geo-IP read. -->
        <p class="intro_ship">
          <span class="intro_ship_key">Ship to</span>
          <select class="intro_country" data-country aria-label="Shipping country">
            ${ge.map(l=>`<option value="${g(l.Code)}">${g(l.Name)}</option>`).join("")}
          </select>
        </p>
        <div class="stats">
          ${Qa.map(l=>`
            <div class="stats_item">
              <div class="stats_value">${g(l.value)}</div>
              <div class="stats_label">${g(l.label)}</div>
            </div>`).join("")}
        </div>
      </section>

      ${Za(e,o,a)}

      ${Ja(t)}

      <section class="opt opt--acc" data-section="accessories">
        <h2 class="opt_title">Additional Accessories</h2>
        <div class="acc-nav">
          <button type="button" class="acc-nav_btn" data-acc-scroll="-1" aria-label="Scroll accessories back">&#8249;</button>
          <button type="button" class="acc-nav_btn" data-acc-scroll="1" aria-label="Scroll accessories forward">&#8250;</button>
        </div>
        <div class="acc-list" data-acc-list>
          ${t.accessories.filter(l=>!Wa.has(l.handle)).map(l=>eo(l)).join("")}
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
        <!-- An anchor, not a button, and carrying sf-checkout: im-attribution's
             capture-phase click backstop keys on [sf-checkout] and on anchors to
             the checkout host, and it is what re-stamps a cart that was built
             between two MutationObserver batches. A JS-only navigation is
             invisible to it. href is kept current by update(). -->
        <a class="orderbar_cta" data-cta sf-checkout="1" href="#" role="button">Order</a>
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

    <div class="leadmodal" data-save-modal hidden>
      <div class="leadmodal_backdrop" data-save-close></div>
      <div class="leadmodal_sheet">
        <h3 class="leadmodal_title" data-save-title>Save your design</h3>
        <p class="leadmodal_body" data-save-copy>
          We&rsquo;ll copy a link that rebuilds this exact Olto &mdash; share it or pick
          up where you left off on any device.
        </p>

        <!-- The live Webflow form (#wf-form-Olto-Interest-Form, 203 submissions)
             is MOVED into this slot by src/olto-tesla.js. Moving rather than
             cloning keeps Webflow's bound AJAX handler, and the im_* hidden
             inputs travel with the node. Never re-render its children:
             im-attribution's data-im-stamped latch would not re-stamp it. -->
        <div data-wf-form-slot hidden></div>

        <!-- Fallback for the standalone Vercel demo, where no Webflow form
             exists. olto-tesla.js hides this once the real form is adopted. -->
        <form data-save-form novalidate>
          <input class="saveform_field" type="text" name="name" placeholder="Name" autocomplete="name" />
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
          <button type="button" class="leadmodal_cta" data-save-close>Done</button>
        </div>
      </div>
    </div>

  `}function Za(e,t,a){var s,c;let o=(s=t.find(([,d])=>/silver/i.test(d.color)))==null?void 0:s[1],r=(c=t.find(([,d])=>/black/i.test(d.color)))==null?void 0:c[1],n={...e.wrapColorMap,Black:(r==null?void 0:r.colorHex)||"#1c1c1e"},i=["Black","Sand","Blush","Forest","Crimson"].filter(d=>a.has(d));return`
    <section class="opt" data-section="color">
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
          <div class="swatch_sub">Ships now</div>
        </div>
        <div class="swatch-box">
          <div class="swatch-box_label">Vinyl wrap</div>
          ${i.map(d=>{let l=parseFloat(a.get(d).price.amount);return`
          <div class="swatch-opt">
            <button
              type="button"
              class="swatch"
              data-color-swatch="${g(d)}"
              style="--swatch: ${g(n[d])}"
              aria-label="${g(d)} vinyl wrap"
            ></button>
            <div class="swatch_name">${g(d)}</div>
            <div class="swatch_sub">+${C(l)}</div>
          </div>`}).join("")}
        </div>
      </div>
    </section>
  `}function Ja(e){return`
    <section class="opt" data-section="bundles">
      <h2 class="opt_title">Bundle</h2>
      <div class="kit-list">
        ${Ce.map(t=>Xa(t,e)).join("")}
      </div>
    </section>
  `}function Xa(e,t){let a=e.items.reduce((i,s)=>{let c=Q(t.accessories.find(d=>d.handle===s));return i+(c?parseFloat(c.price.amount):0)},0),o=a-e.price,r=e.items.map(i=>{let s=t.accessories.find(c=>c.handle===i);return((s==null?void 0:s.title)||i).replace(/^Olto /,"")}),n=e.items.length?`<div class="kit_price">+${C(e.price)}</div>
       ${o>0?`<div class="kit_save"><s>${C(a)}</s> Save ${C(o)}</div>`:""}`:"";return`
    <button type="button" class="kit" data-bundle="${g(e.key)}">
      ${e.popular?'<span class="kit_chip">Most popular</span>':""}
      <div class="kit_top">
        <div class="kit_id">
          <div class="kit_name">${g(e.label)}</div>
          <div class="kit_tagline">${g(e.tagline)}</div>
        </div>
        <div class="kit_pricing">${n}</div>
      </div>
      ${r.length?`<div class="kit_items">${r.map(i=>`<span class="kit_item">${g(i)}</span>`).join("")}</div>`:""}
    </button>
  `}function eo(e){var a;let t=Q(e);return t?`
    <div class="acc" data-acc="${g(e.handle)}">
      <img class="acc_img" src="${g(W((a=e.featuredImage)==null?void 0:a.url,240))}" alt="${g(e.title)}" loading="lazy" />
      <div class="acc_info">
        <div class="acc_name">${g(e.title)}</div>
        <div class="acc_price">${C(parseFloat(t.price.amount),t.price.currencyCode)}</div>
      </div>
      <button type="button" class="acc_btn" data-acc-toggle="${g(e.handle)}">Add</button>
    </div>
  `:""}function Q(e){return e&&(e.variants.find(t=>t.availableForSale)||e.variants[0])||null}function ca(e,t){var r;let a=[];if(e.bikeLine){let n=((r=t.variants[e.baseNumericId])==null?void 0:r.color)||e.bikeLine.merchandise.title;a.push({label:`Olto &middot; ${g(n)}`,amount:parseFloat(e.bikeLine.merchandise.price.amount)})}e.wrapLine&&a.push({label:`Wrap &middot; ${g(e.wrapLine.merchandise.title)}`,amount:parseFloat(e.wrapLine.merchandise.price.amount)});for(let n of e.accessoryLines)a.push({label:g(n.merchandise.product.title),amount:parseFloat(n.merchandise.price.amount)});let o=e.quantity>1?`<div class="summary_qty">&times;${e.quantity} configurations</div>`:"";return a.map(n=>`
      <div class="summary_row">
        <span>${n.label}</span>
        <span>${C(n.amount,e.currency)}</span>
      </div>`).join("")+o}var L=window.gsap||null;L&&window.ScrollTrigger&&L.registerPlugin(window.ScrollTrigger);var w={...Ct},m=null,S=null,Z=new Map,ae="a",xe=null,to=new Set(["Sand"]),ao="Ships now",oo="Now",re="",da=null,dt=0,ut=null;async function ha(e){var o,r,n;if(m=e,!m){console.error("[Olto] mount(): no root element \u2014 nothing rendered.");return}m.classList.add("olto-cfg"),io();let t=(o=Object.entries(w.variants).find(([,i])=>/silver/i.test(i.color)))==null?void 0:o[0];t&&(w.defaultVariantId=t);try{S=await ea(w)}catch(i){console.error("[Tesla] Failed to load products:",i),so();return}await ro(),Z=no(S.wrap),zt(S),await Gt(w),aa({config:w,products:S,bundles:Ce.filter(i=>i.items.length).map(i=>({handle:i.key,products:i.items.map(s=>({handle:s}))}))}),m.innerHTML=la({config:w,products:S,wrapVariantsByColor:Z}),lo(),oa(ne),ne(N()),yo();let a=fo();a?mo(a):N().bikeLine||he(S.main.handle,ve(w.defaultVariantId)),Co(),No(),P("view_configurator");for(let i of Z.values())(r=i.image)!=null&&r.url&&(new Image().src=i.image.url);for(let i of S.main.variants)(n=i.image)!=null&&n.url&&(new Image().src=W(i.image.url,1600))}async function ro(){try{let{data:e}=await q.request('query { product(handle: "bottom-cover") { id handle title availableForSale featuredImage { url altText } variants(first: 5) { edges { node { id title availableForSale price { amount currencyCode } selectedOptions { name value } image { url altText } } } } } }'),t=e==null?void 0:e.product;t&&S.accessories.push({...t,variants:t.variants.edges.map(a=>a.node)})}catch(e){console.warn("[Tesla] Kit-only product fetch failed:",e)}}function no(e){var a;let t=new Map;if(!e)return t;for(let o of e.variants){let r=(a=o.selectedOptions)==null?void 0:a.find(i=>/colou?rs?/i.test(i.name)),n=(r==null?void 0:r.value)||o.title;n&&t.set(n,o)}return t}function io(){if(document.getElementById("olto-tesla-css"))return;let e=document.createElement("style");e.id="olto-tesla-css",e.textContent=ra,document.head.appendChild(e)}function so(){m.innerHTML=`
    <div class="boot">
      <div class="boot_mark">INFINITE MACHINE</div>
      <div class="boot_label">Couldn&rsquo;t reach the store. Check your connection.</div>
      <button type="button" class="boot_retry" onclick="location.reload()">Retry</button>
    </div>
  `}function lo(){m.addEventListener("click",e=>{let t=e.target.closest("[data-color-swatch]");if(t)return uo(t.dataset.colorSwatch);let a=e.target.closest("[data-acc-scroll]");if(a)return co(Number(a.dataset.accScroll));let o=e.target.closest("[data-acc-toggle]");if(o)return po(o.dataset.accToggle);let r=e.target.closest("[data-bundle]");if(r)return ya(r.dataset.bundle);let n=e.target.closest("[data-pay-mode]");if(n)return we(n.dataset.payMode);if(e.target.closest("[data-qty-dec]"))return pa(-1);if(e.target.closest("[data-qty-inc]"))return pa(1);if(e.target.closest("[data-save]"))return e.target.closest("[data-nudge]")&&fa(),va("save");if(e.target.closest("[data-save-close]"))return xa(!1);if(e.target.closest("[data-nudge-close]"))return fa();if(e.target.closest("[data-config-reset]"))return ho();if(e.target.closest("[data-cta]"))return e.preventDefault(),go()}),m.addEventListener("change",e=>{let t=e.target.closest("[data-country]");t&&_a(t.value)}),m.addEventListener("submit",e=>{if(e.target.closest("[data-save-form]")){e.preventDefault(),wo(e.target);return}e.target.closest("[data-wf-form-slot]")&&(wa(),P("form_submit",{form_name:"Olto Interest Form"}))})}var pt=null;function co(e){let t=m.querySelector("[data-acc-list]");if(!t)return;let a=t.scrollLeft,o=Math.max(0,Math.min(t.scrollWidth-t.clientWidth,a+e*320));if(L&&!document.hidden){pt&&pt.kill();let r={v:a};pt=L.to(r,{v:o,duration:.45,ease:"power2.out",onUpdate:()=>{t.scrollLeft=r.v}})}else t.scrollLeft=o}var ga=Promise.resolve();function ie(e,t){let a=he(e,t);return ga=a.catch(()=>null),a}function uo(e){P("select_color",{olto_selected_color:e||"Silver"});let t=w.wrap.productHandle;if(!e)return ie(t,null);let a=Z.get(e);a&&ie(t,a.id)}function po(e){var r,n;let t=N(),a=t.accessoryLines.some(i=>i.merchandise.product.handle===e);P(a?"remove_accessory":"add_accessory",{olto_accessory:e});let o=w.accessoryDependencies||{};if(a){ie(e,null);let i=((r=o[e])==null?void 0:r.requiredBy)||[];for(let s of i)t.accessoryLines.some(c=>c.merchandise.product.handle===s)&&ie(s,null);return}ua(e);for(let[i,s]of Object.entries(o))(n=s.requiredBy)!=null&&n.includes(e)&&(t.accessoryLines.some(d=>d.merchandise.product.handle===i)||ua(i))}function ua(e){let t=S.accessories.find(o=>o.handle===e),a=Q(t);a&&ie(e,a.id)}var ft=!1,_e=null,U=null;async function ya(e){if(P("select_bundle",{olto_selected_bundle:e||"none"}),ft){e!==(U==null?void 0:U.value)&&(_e=e,U={value:e},ne(N()));return}ft=!0;let t=N().activeBundle===e?null:e;U={value:t},ne(N());try{await ga;let a=N().accessoryLines.map(n=>n.id).filter(n=>!String(n).startsWith("tmp_"));a.length&&await Je(a);let o=Ce.find(n=>n.key===e);if(!t||!(o!=null&&o.items.length))return;let r=o.items.map(n=>{let i=Q(S.accessories.find(s=>s.handle===n));return i?{variantId:i.id,attributes:{_bundle:e}}:null}).filter(Boolean);r.length&&await Ze(r)}catch(a){console.error("[Tesla] Bundle select failed:",a)}finally{if(ft=!1,_e){let a=_e;_e=null,ya(a)}else U=null,ne(N())}}function pa(e){P("change_quantity",{olto_quantity_delta:e});let t=N(),a=[t.bikeLine,t.wrapLine,...t.accessoryLines].filter(Boolean),o=Math.min(99,Math.max(1,t.quantity+e));if(o===t.quantity)return;let r=a.filter(n=>!String(n.id).startsWith("tmp_"));Promise.all(r.map(n=>jt({lineId:n.id,quantity:o})))}function fo(){let e=new URLSearchParams(window.location.search).get("d");if(!e)return null;let[t,a,o,r,n]=e.split(".");return!t||!w.variants[t]?null:{base:t,wrap:a||null,qty:Math.min(99,Math.max(1,parseInt(o,10)||1)),pay:["cash","lease","finance"].includes(r)?r:"finance",accs:(n||"").split("~").filter(Boolean)}}async function mo(e){Qe();let t=[{variantId:ve(e.base),quantity:e.qty}],a=e.wrap?Z.get(e.wrap):null;a&&t.push({variantId:a.id,quantity:e.qty});for(let r of e.accs){let n=Q(S.accessories.find(i=>i.handle===r));n&&t.push({variantId:n.id,quantity:e.qty})}we(e.pay);try{await Ze(t)}catch(r){console.error("[Tesla] Failed to apply shared design:",r)}let o=new URLSearchParams(window.location.search);o.delete("d"),window.history.replaceState({},"",`${window.location.pathname}?${o.toString()}`)}function ba(){let e=N(),t=e.wrapLine?Ne(e.wrapLine.merchandise)||e.wrapLine.merchandise.title:"",a=e.accessoryLines.map(n=>n.merchandise.product.handle).join("~"),o=[e.baseNumericId,t,e.quantity,e.payMode,a].join("."),r=new URL(window.location.href);return r.searchParams.set("d",o),r.toString()}var oe=null;function mt(e,t){for(let a of m.querySelectorAll("[data-config-reset]"))a.textContent=e,a.classList.toggle("is-armed",t)}async function ho(){if(!oe){mt("Tap again to clear",!0),oe=setTimeout(()=>{oe=null,mt("Clear configuration",!1)},3e3);return}clearTimeout(oe),oe=null,mt("Clear configuration",!1);try{await Kt(ee())}catch(e){console.error("[Tesla] Clear failed:",e)}we("finance"),he(S.main.handle,ve(w.defaultVariantId))}function go(){let e=N();if(!e.ready)return;if(e.region==="row")return va("row");let t=We();t&&(P("begin_checkout",{checkout_url:t}),window.location.href=t)}function yo(){let e=m.querySelector("[data-nudge]"),t=m.querySelector('[data-section="payment"]');if(!e||!t)return;let a=new IntersectionObserver(o=>{o.some(r=>r.isIntersecting)&&(a.disconnect(),e.hidden=!1,requestAnimationFrame(()=>e.classList.add("is-in")))},{threshold:.3});a.observe(t)}function fa(){let e=m.querySelector("[data-nudge]");!e||e.hidden||(e.classList.remove("is-in"),setTimeout(()=>{e.hidden=!0},450))}function va(e){let t=m.querySelector("[data-save-modal]");if(!t)return;let a=e==="row",o=t.querySelector("[data-save-title]"),r=t.querySelector("[data-save-copy]");o&&(o.textContent=a?"Register your interest":"Save your design"),r&&(r.textContent=a?"Olto ships in the United States today. Leave your details and we\u2019ll tell you the moment it reaches you.":"We\u2019ll save this exact Olto so you can pick up where you left off on any device."),wa(),P(a?"interest_form_open":"save_configuration_open"),xa(!0)}function bo(){var a,o;let e=N(),t=e.wrapLine?Ne(e.wrapLine.merchandise)||e.wrapLine.merchandise.title:"";return{location:re,variant:((o=(a=w.variants)==null?void 0:a[e.baseNumericId])==null?void 0:o.color)||"",wrap:t,pack:e.activeBundle||"",quantity:String(e.quantity||1),accessories:e.accessoryLines.map(r=>r.merchandise.product.title).filter(Boolean).join(", "),design_url:ba()}}function wa(){let e=m.querySelector("[data-wf-form-slot] form");if(!e)return;let t=bo();for(let[a,o]of Object.entries(t)){let r=e.querySelector(`input[name="${a}"]`);r&&(r.value=o)}}function P(e,t){var a,o;try{let r=N();window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:e,configurator:"olto",olto_variant:((o=(a=w.variants)==null?void 0:a[r.baseNumericId])==null?void 0:o.color)||"",olto_wrap:r.wrapLine?Ne(r.wrapLine.merchandise)||r.wrapLine.merchandise.title:"",olto_pack:r.activeBundle||"",olto_quantity:r.quantity||1,olto_accessory_count:r.accessoryLines.length,olto_value:Number(r.total||0),olto_currency:r.currency||"USD",olto_region:r.region||"unresolved",olto_config_id:ee()||"",...t||{}})}catch(r){console.warn("[Olto] dataLayer push failed:",r)}}var Ca="olto_tesla_lead";function vo(){try{let e=JSON.parse(localStorage.getItem(Ca));return e!=null&&e.email?e:null}catch{return null}}function xa(e){var a;let t=m.querySelector("[data-save-modal]");if(t&&(t.hidden=!e,e)){let o=t.querySelector("[data-save-form]"),r=t.querySelector("[data-save-done]");if(o){o.hidden=!1;let n=vo();for(let i of["name","email","phone"]){let s=o.querySelector(`input[name="${i}"]`);s&&!s.value&&(s.value=(n==null?void 0:n[i])||"")}}r&&(r.hidden=!0),(a=t.querySelector('input[name="name"]'))==null||a.focus()}}async function wo(e){let t=e.name.value.trim(),a=e.email.value.trim(),o=e.phone.value.trim(),r=e.querySelector("[data-save-error]"),n=null;if(t?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)?o.replace(/\D/g,"").length<7&&(n="That phone number looks too short."):n="That email doesn\u2019t look right.":n="Please add your name.",n){r&&(r.textContent=n,r.hidden=!1);return}r&&(r.hidden=!0);try{localStorage.setItem(Ca,JSON.stringify({name:t,email:a,phone:o}))}catch{}let i=ba(),s=!0;try{await navigator.clipboard.writeText(i)}catch{s=!1}e.hidden=!0;let c=m.querySelector("[data-save-done]");if(c){c.hidden=!1;let d=c.querySelector("[data-save-done-msg]");d&&(d.textContent=s?"Link copied to your clipboard \u2014 it rebuilds this exact Olto.":"Copy your link below \u2014 it rebuilds this exact Olto.");let l=c.querySelector("[data-save-link]");l&&(l.textContent=i)}}function _a(e,{silent:t}={}){let a=ge.find(r=>r.Code===e);re=(a==null?void 0:a.Name)||"",it(e==="US"?"us":"row");let o=m.querySelector("[data-country]");o&&a&&(o.value=e),F("[data-rail-country]",re||"\u2014"),t||P("select_country",{olto_country:re||e})}async function Co(){let e=new AbortController,t=setTimeout(()=>e.abort(),8e3);try{let o=(await(await fetch("https://get.geojs.io/v1/ip/country",{signal:e.signal})).text()).trim().toUpperCase();_a(o,{silent:!0})}catch{re="",it("")}finally{clearTimeout(t)}}function xo(e){if(!(!e||e===da)){da=e;try{let t=new URLSearchParams(window.location.search);if(t.get("variant")===String(e))return;t.set("variant",String(e)),window.history.replaceState({},"",`${window.location.pathname}?${t}${window.location.hash}`)}catch(t){console.warn("[Olto] variant param sync failed:",t)}}}function ne(e){var H,ht,gt,yt,bt,vt,wt;if(!e.ready)return;xo(e.baseNumericId);let t=w.variants[e.baseNumericId]||{};F("[data-delivery]",ao),F("[data-rail-delivery]",oo);let a=e.wrapLine?Ne(e.wrapLine.merchandise)||e.wrapLine.merchandise.title:"";for(let u of m.querySelectorAll("[data-color-swatch]"))u.classList.toggle("is-selected",e.wrapLine?u.dataset.colorSwatch===a:u.dataset.colorSwatch==="");let o=new Set(e.accessoryLines.map(u=>u.merchandise.product.handle)),r={},n=new Set;for(let u of w.customImageRules||[])if(u.when.every(v=>o.has(v))){Object.assign(r,u.replace||{});for(let v of u.hide||[])n.add(v)}let i=!1;for(let u of m.querySelectorAll("[data-layer]")){let v=u.dataset.layer,T=o.has(v)&&!n.has(v),z=r[v]||ct[v];z&&u.getAttribute("src")!==z&&u.setAttribute("src",z),u.classList.toggle("is-on",T),T&&(i=!0)}let s=(ht=(H=S.main.variants.find(u=>be(u.id)===e.baseNumericId))==null?void 0:H.image)==null?void 0:ht.url,c=e.region==="row"?"eu":"us",d=(c==="eu"?t.backgroundImage:W(s,1600))||W(s,1600)||t.backgroundImage,l=e.wrapLine?(yt=(gt=Z.get(a))==null?void 0:gt.image)==null?void 0:yt.url:null,f=l&&!to.has(a);if(e.wrapLine&&a==="Black"){let u=S.main.variants.find(v=>{var T;return((T=w.variants[be(v.id)])==null?void 0:T.color)==="Black"});(bt=u==null?void 0:u.image)!=null&&bt.url&&(l=W(u.image.url,1600),f=!0)}a==="Custom"&&(l=null),(vt=m.querySelector("[data-layers]"))==null||vt.classList.toggle("is-suppressed",!!l&&!f&&i),l?ma(l,`wrap:${a}`):ma(d,`base:${e.baseNumericId}:${c}`);let h=U?U.value:e.activeBundle;for(let u of m.querySelectorAll("[data-bundle]"))u.classList.toggle("is-selected",u.dataset.bundle===h);let y=new Set(e.accessoryLines.map(u=>u.merchandise.product.handle));for(let u of m.querySelectorAll("[data-acc-toggle]")){let v=y.has(u.dataset.accToggle);u.textContent=v?"Added":"Add",u.classList.toggle("is-added",v),(wt=u.closest("[data-acc]"))==null||wt.classList.toggle("is-added",v)}let O=m.querySelector("[data-acc-list]");if(O){let u=[...O.querySelectorAll(".acc")],v=[...u].sort((T,z)=>(y.has(T.dataset.acc)?1:0)-(y.has(z.dataset.acc)?1:0));if(u.some((T,z)=>T!==v[z]))for(let T of v)O.appendChild(T)}F("[data-qty-value]",String(e.quantity));let I=ca(e,w);for(let u of m.querySelectorAll("[data-summary]"))u.innerHTML!==I&&(u.innerHTML=I);F("[data-summary-total]",C(e.total,e.currency));let A=sa(e.total,e.currency,e.payMode);for(let u of m.querySelectorAll("[data-pay-mode]"))u.classList.toggle("is-active",u.dataset.payMode===e.payMode);F("[data-pay-figure]",C(A.amount,e.currency)+A.suffix),F("[data-pay-sub]",A.sub),_o(A.amount,A.suffix,e.currency),F("[data-total-label]",A.label);let D=m.querySelector("[data-cta]");if(D){let u=e.region==="row"?"":We();D.setAttribute("href",u||"#")}D&&(D.textContent=e.region==="row"?"Register interest":"Order")}function Ne(e){var a;let t=(a=e.selectedOptions)==null?void 0:a.find(o=>/colou?rs?/i.test(o.name));return(t==null?void 0:t.value)||null}function F(e,t){for(let a of m.querySelectorAll(e))a.textContent!==t&&(a.textContent=t)}function _o(e,t,a){let o=m.querySelector("[data-total]");if(o){if(L&&!document.hidden&&dt!==e){ut&&ut.kill();let r={v:dt};ut=L.to(r,{v:e,duration:.45,ease:"power2.out",onUpdate:()=>{o.textContent=C(r.v,a)+t},onComplete:()=>{o.textContent=C(e,a)+t}})}else o.textContent=C(e,a)+t;dt=e}}function ma(e,t){if(!e||t===xe)return;let a={a:m.querySelector('[data-hero-img="a"]'),b:m.querySelector('[data-hero-img="b"]')};if(!a.a||!a.b)return;if(xe===null){a[ae].src=e,xe=t;return}let o=a[ae],r=a[ae==="a"?"b":"a"];r.src=e,ae=ae==="a"?"b":"a",xe=t,L?(L.set(r,{opacity:0,scale:1.04,xPercent:0,yPercent:0}),r.classList.add("is-active"),L.to(r,{opacity:1,scale:1,duration:.45,ease:"power2.out"}),L.to(o,{opacity:0,duration:.45,ease:"power2.out",onComplete:()=>o.classList.remove("is-active")})):(r.classList.add("is-active"),r.style.opacity=1,o.classList.remove("is-active"),o.style.opacity=0)}function No(){if(!L||!window.ScrollTrigger||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let e=m.querySelector(".sheet");for(let t of m.querySelectorAll(".opt"))L.from(t,{y:24,opacity:0,duration:.45,ease:"power2.out",scrollTrigger:{trigger:t,scroller:e,start:"top 88%",once:!0}})}var Na="[data-tesla-app]",Sa=["#wf-form-Olto-Interest-Form",'[data-modal-name="interest"] form'];So();async function So(){let e=document.querySelector(Na);if(!e){console.error(`[Olto] No ${Na} on the page \u2014 configurator not mounted.`);return}ko(e),Eo(),await ha(e),Io(e)}function ko(e){let t=[];for(let a=e.parentElement;a&&a!==document.documentElement;a=a.parentElement){let o=getComputedStyle(a);(o.transform!=="none"||o.filter!=="none"||o.perspective!=="none"||o.contain!=="none"||o.willChange&&/transform|filter|perspective/.test(o.willChange))&&t.push(a)}t.length&&console.error("[Olto] Mount has ancestor(s) creating a containing block \u2014 every fixed region will collapse. Move the mount to a direct child of <body>.",t)}function Eo(){if(document.querySelector("[sf-token][sf-domain]"))return;let e=0,t=setInterval(()=>{if(document.querySelector("[sf-token][sf-domain]"))return clearInterval(t);e+=1,!(e<40)&&(clearInterval(t),console.error("[Olto] No [sf-token][sf-domain] on this page. im-attribution cannot write im_* onto the Shopify cart, so orders will reach the CRM with no source. Restore the Shopyflow host element before shipping."))},250)}function Io(e){let t=e.querySelector("[data-wf-form-slot]"),a=Sa.reduce((r,n)=>r||document.querySelector(n),null);if(!t){console.error("[Olto] No [data-wf-form-slot] in the rendered UI \u2014 form not adopted.");return}if(!a){console.error("[Olto] No Webflow interest form found (tried: "+Sa.join(", ")+"). Rest-of-world interest and US save would both capture nothing \u2014 leaving the fallback form in place.");return}t.appendChild(a.closest(".w-form")||a),t.hidden=!1;let o=e.querySelector("[data-save-form]");o&&o.remove()}})();
