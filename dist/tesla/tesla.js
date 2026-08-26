"use strict";(()=>{var w={id:"olto",steps:[{type:"location",no:"01",title:"Location",validation:!0,collapsible:!1},{type:"variant",no:"02",title:"Base"},{type:"wrap",no:"03",title:"Wrap"},{type:"bundle",no:"04",title:"Accessory Pack"},{type:"accessories",no:"05",title:"Configure your Accessories"},{type:"quantity",no:"06",title:"Quantity"}],product:{handle:"olto-1"},accessoriesCollection:"olto-accessories",testInstructionVideo:"https://vz-19725589-529.b-cdn.net/a4c98a2a-412b-4e2e-a2ce-4e9a64123464/playlist.m3u8",wrap:{productHandle:"olto-wrap"},bundles:{metaobjectType:"bundles"},variants:{44842879156380:{color:"Black",colorHex:"#000000",delivery:"July 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff73905e7daa5ef224c5d5_olto-eu-black.avif"},44842879123612:{color:"Silver",colorHex:"#D9D9D9",delivery:"August 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff7390e94ecc537b713a30_olto-eu-silver.avif"}},defaultVariantId:"44842879156380",wrapColorMap:{Sand:"#DECEAF",Blush:"#F6C6DC",Sky:"#707A8D",Forest:"#627063",Crimson:"#B44C47"},accessoryDependencies:{"olto-rear-rack":{requiredBy:["olto-rear-basket","olto-side-mounting-plate"]}},customImageRules:[{when:["olto-soft-bag","olto-rear-basket"],replace:{"olto-soft-bag":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/69219c3d619077ba6f1689ed_Soft%20Bag%20in%20Rear%20Basket.avif"}},{when:["olto-charging-dock","olto-battery"],replace:{"olto-battery":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6921a4037d0eab061d3d7ca4_Battery%20Dock%20with%20Battery%20Plugged%20in.avif"},hide:["olto-charging-dock"]}]};var M="GraphQL Client";var vt="An error occurred while fetching from the API. Review 'graphQLErrors' for details.",wt="Response returned unexpected Content-Type:",_t="An unknown error has occurred. The API did not return a data object or any errors in its response.",et={json:"application/json",multipart:"multipart/mixed"},St="X-SDK-Variant",Et="X-SDK-Version",ue="shopify-graphql-client",fe="1.4.2",at=1e3,pe=[429,503],Ct=/@(defer)\b/i,de=`\r
`,me=/boundary="?([^=";]+)"?/i,It=de+de;function T(t,e=M){return t.startsWith(`${e}`)?t:`${e}: ${t}`}function O(t){return t instanceof Error?t.message:JSON.stringify(t)}function At(t){return t instanceof Error&&t.cause?t.cause:void 0}function $t(t){return t.flatMap(({errors:e})=>e!=null?e:[])}function rt({client:t,retries:e}){if(e!==void 0&&(typeof e!="number"||e<0||e>3))throw new Error(`${t}: The provided "retries" value (${e}) is invalid - it cannot be less than ${0} or greater than ${3}`)}function S(t,e){return e&&(typeof e!="object"||Array.isArray(e)||typeof e=="object"&&Object.keys(e).length>0)?{[t]:e}:{}}function Rt(t,e){if(t.length===0)return e;let r={[t.pop()]:e};return t.length===0?r:Rt(t,r)}function ge(t,e){return Object.keys(e||{}).reduce((a,r)=>(typeof e[r]=="object"||Array.isArray(e[r]))&&t[r]?(a[r]=ge(t[r],e[r]),a):(a[r]=e[r],a),Array.isArray(t)?[...t]:{...t})}function Lt([t,...e]){return e.reduce(ge,{...t})}function Tt({clientLogger:t,customFetchApi:e=fetch,client:a=M,defaultRetryWaitTime:r=at,retriableCodes:n=pe}){let o=async(s,i,c)=>{let d=i+1,l=c+1,f;try{if(f=await e(...s),t({type:"HTTP-Response",content:{requestParams:s,response:f}}),!f.ok&&n.includes(f.status)&&d<=l)throw new Error;let h=(f==null?void 0:f.headers.get("X-Shopify-API-Deprecated-Reason"))||"";return h&&t({type:"HTTP-Response-GraphQL-Deprecation-Notice",content:{requestParams:s,deprecationNotice:h}}),f}catch(h){if(d<=l){let g=f==null?void 0:f.headers.get("Retry-After");return await ia(g?parseInt(g,10):r),t({type:"HTTP-Retry",content:{requestParams:s,lastResponse:f,retryAttempt:i,maxRetries:c}}),o(s,d,c)}throw new Error(T(`${c>0?`Attempted maximum number of ${c} network retries. Last message - `:""}${O(h)}`,a))}};return o}async function ia(t){return new Promise(e=>setTimeout(e,t))}function xt({headers:t,url:e,customFetchApi:a=fetch,retries:r=0,logger:n}){rt({client:M,retries:r});let o={headers:t,url:e,retries:r},s=ca(n),i=Tt({customFetchApi:a,clientLogger:s,defaultRetryWaitTime:at}),c=la(i,o),d=da(c),l=ga(c);return{config:o,fetch:c,request:d,requestStream:l}}function ca(t){return e=>{t&&t(e)}}async function be(t){let{errors:e,data:a,extensions:r}=await t.json();return{...S("data",a),...S("extensions",r),headers:t.headers,...e||!a?{errors:{networkStatusCode:t.status,message:T(e?vt:_t),...S("graphQLErrors",e),response:t}}:{}}}function la(t,{url:e,headers:a,retries:r}){return async(n,o={})=>{let{variables:s,headers:i,url:c,retries:d,keepalive:l,signal:f}=o,h=JSON.stringify({query:n,variables:s});rt({client:M,retries:d});let g=Object.entries({...a,...i}).reduce((R,[D,V])=>(R[D]=Array.isArray(V)?V.join(", "):V.toString(),R),{});!g[St]&&!g[Et]&&(g[St]=ue,g[Et]=fe);let C=[c!=null?c:e,{method:"POST",headers:g,body:h,signal:f,keepalive:l}];return t(C,1,d!=null?d:r)}}function da(t){return async(...e)=>{if(Ct.test(e[0]))throw new Error(T("This operation will result in a streamable response - use requestStream() instead."));let a=null;try{a=await t(...e);let{status:r,statusText:n}=a,o=a.headers.get("content-type")||"";return a.ok?o.includes(et.json)?await be(a):{errors:{networkStatusCode:r,message:T(`${wt} ${o}`),response:a}}:{errors:{networkStatusCode:r,message:T(n),response:a}}}catch(r){return{errors:{message:O(r),...a==null?{}:{networkStatusCode:a.status,response:a}}}}}}async function*ua(t){let e=new TextDecoder;if(t.body[Symbol.asyncIterator])for await(let a of t.body)yield e.decode(a);else{let a=t.body.getReader(),r;try{for(;!(r=await a.read()).done;)yield e.decode(r.value)}finally{a.cancel()}}}function fa(t,e){return{async*[Symbol.asyncIterator](){try{let a="";for await(let r of t)if(a+=r,a.indexOf(e)>-1){let n=a.lastIndexOf(e),s=a.slice(0,n).split(e).filter(i=>i.trim().length>0).map(i=>i.slice(i.indexOf(It)+It.length).trim());s.length>0&&(yield s),a=a.slice(n+e.length),a.trim()==="--"&&(a="")}}catch(a){throw new Error(`Error occured while processing stream payload - ${O(a)}`)}}}}function pa(t){return{async*[Symbol.asyncIterator](){try{yield{...await be(t),hasNext:!1}}catch(e){yield{errors:{message:T(O(e)),networkStatusCode:t.status,response:t},hasNext:!1}}}}}function ma(t){return t.map(e=>{try{return JSON.parse(e)}catch(a){throw new Error(`Error in parsing multipart response - ${O(a)}`)}}).map(e=>{let{data:a,incremental:r,hasNext:n,extensions:o,errors:s}=e;if(!r)return{data:a||{},...S("errors",s),...S("extensions",o),hasNext:n};let i=r.map(({data:c,path:d,errors:l})=>({data:c&&d?Rt(d,c):{},...S("errors",l)}));return{data:i.length===1?i[0].data:Lt([...i.map(({data:c})=>c)]),...S("errors",$t(i)),hasNext:n}})}function ha(t,e){if(t.length>0)throw new Error(vt,{cause:{graphQLErrors:t}});if(Object.keys(e).length===0)throw new Error(_t)}function ya(t,e){var i,c;let a=(e!=null?e:"").match(me),r=`--${a?a[1]:"-"}`;if(!((i=t.body)!=null&&i.getReader)&&!((c=t.body)!=null&&c[Symbol.asyncIterator]))throw new Error("API multipart response did not return an iterable body",{cause:t});let n=ua(t),o={},s;return{async*[Symbol.asyncIterator](){var d,l;try{let f=!0;for await(let h of fa(n,r)){let g=ma(h);s=(l=(d=g.find(R=>R.extensions))==null?void 0:d.extensions)!=null?l:s;let C=$t(g);o=Lt([o,...g.map(({data:R})=>R)]),f=g.slice(-1)[0].hasNext,ha(C,o),yield{...S("data",o),...S("extensions",s),hasNext:f}}if(f)throw new Error("Response stream terminated unexpectedly")}catch(f){let h=At(f);yield{...S("data",o),...S("extensions",s),errors:{message:T(O(f)),networkStatusCode:t.status,...S("graphQLErrors",h==null?void 0:h.graphQLErrors),response:t},hasNext:!1}}}}}function ga(t){return async(...e)=>{if(!Ct.test(e[0]))throw new Error(T("This operation does not result in a streamable response - use request() instead."));try{let a=await t(...e),{statusText:r}=a;if(!a.ok)throw new Error(r,{cause:a});let n=a.headers.get("content-type")||"";switch(!0){case n.includes(et.json):return pa(a);case n.includes(et.multipart):return ya(a,n);default:throw new Error(`${wt} ${n}`,{cause:a})}}catch(a){return{async*[Symbol.asyncIterator](){let r=At(a);yield{errors:{message:T(O(a)),...S("networkStatusCode",r==null?void 0:r.status),...S("response",r)},hasNext:!1}}}}}}function Ot({client:t,storeDomain:e}){try{if(!e||typeof e!="string")throw new Error;let a=e.trim(),r=a.match(/^https?:/)?a:`https://${a}`,n=new URL(r);return n.protocol="https",n.origin}catch(a){throw new Error(`${t}: a valid store domain ("${e}") must be provided`,{cause:a})}}function nt({client:t,currentSupportedApiVersions:e,apiVersion:a,logger:r}){let n=`${t}: the provided apiVersion ("${a}")`,o=`Currently supported API versions: ${e.join(", ")}`;if(!a||typeof a!="string")throw new Error(`${n} is invalid. ${o}`);let s=a.trim();e.includes(s)||(r?r({type:"Unsupported_Api_Version",content:{apiVersion:a,supportedApiVersions:e}}):console.warn(`${n} is likely deprecated or not supported. ${o}`))}function ot(t){let e=t*3-2;return e===10?e:`0${e}`}function kt(t,e,a){let r=e-a;return r<=0?`${t-1}-${ot(r+4)}`:`${t}-${ot(r)}`}function ve(){let t=new Date,e=t.getUTCMonth(),a=t.getUTCFullYear(),r=Math.floor(e/3+1);return{year:a,quarter:r,version:`${a}-${ot(r)}`}}function Dt(){let{year:t,quarter:e,version:a}=ve(),r=e===4?`${t+1}-01`:`${t}-${ot(e+1)}`;return[kt(t,e,3),kt(t,e,2),kt(t,e,1),a,r,"unstable"]}function Nt(t){return e=>({...e!=null?e:{},...t.headers})}function qt({getHeaders:t,getApiUrl:e}){return(a,r)=>{let n=[a];if(r&&Object.keys(r).length>0){let{variables:o,apiVersion:s,headers:i,retries:c,signal:d}=r;n.push({...o?{variables:o}:{},...i?{headers:t(i)}:{},...s?{url:e(s)}:{},...c?{retries:c}:{},...d?{signal:d}:{}})}return n}}var Pt="application/json",we="storefront-api-client",_e="1.0.10",Se="X-Shopify-Storefront-Access-Token",Ee="Shopify-Storefront-Private-Token",Ce="X-SDK-Variant",Ie="X-SDK-Version",Ae="X-SDK-Variant-Source",F="Storefront API Client";function $e(t){if(t&&typeof window!="undefined")throw new Error(`${F}: private access tokens and headers should only be used in a server-to-server implementation. Use the public API access token in nonserver environments.`)}function Re(t,e){if(!t&&!e)throw new Error(`${F}: a public or private access token must be provided`);if(t&&e)throw new Error(`${F}: only provide either a public or private access token`)}function Ht({storeDomain:t,apiVersion:e,publicAccessToken:a,privateAccessToken:r,clientName:n,retries:o=0,customFetchApi:s,logger:i}){let c=Dt(),d=Ot({client:F,storeDomain:t}),l={client:F,currentSupportedApiVersions:c,logger:i};nt({...l,apiVersion:e}),Re(a,r),$e(r);let f=ba(d,e,l),h={storeDomain:d,apiVersion:e,...a?{publicAccessToken:a}:{privateAccessToken:r},headers:{"Content-Type":Pt,Accept:Pt,[Ce]:we,[Ie]:_e,...n?{[Ae]:n}:{},...a?{[Se]:a}:{[Ee]:r}},apiUrl:f(),clientName:n},g=xt({headers:h.headers,url:h.apiUrl,retries:o,customFetchApi:s,logger:i}),C=Nt(h),R=va(h,f),D=qt({getHeaders:C,getApiUrl:R});return Object.freeze({config:h,getHeaders:C,getApiUrl:R,fetch:(...N)=>g.fetch(...D(...N)),request:(...N)=>g.request(...D(...N)),requestStream:(...N)=>g.requestStream(...D(...N))})}function ba(t,e,a){return r=>{r&&nt({...a,apiVersion:r});let n=(r!=null?r:e).trim();return`${t}/api/${n}/graphql.json`}}function va(t,e){return a=>a?e(a):t.apiUrl}var st={SHOPIFY_STORE_DOMAIN:"shop.infinitemachine.com",SHOPIFY_STOREFRONT_PUBLIC_TOKEN:"eefb42e32220791a7472aaa5d2cf2182",SHOPIFY_API_VERSION:"2026-04"};var B=Ht({storeDomain:st.SHOPIFY_STORE_DOMAIN,apiVersion:st.SHOPIFY_API_VERSION,publicAccessToken:st.SHOPIFY_STOREFRONT_PUBLIC_TOKEN});var xe="olto_cart_",wa="cfg_",Mt="config",x=null,u=null,K=null,Ut=null,I=null,it=[],_a=[];function q(t){K=t,u=t}var W=null;function Oe(t){W=t}async function ke(t){var a;Ut=t.id,I=Le()||He();let e=Aa();if(e)try{let r=await Ea(e);r&&(x=e,q(r))}catch(r){console.warn("[Cart] Failed to restore cart, will create new:",r)}if(!x){let r=await Sa();q(r),x=r.id,$a(x)}if(!Le()&&((a=u==null?void 0:u.lines)!=null&&a.length)){let r=Ca(u);r&&(I=r)}return Me(I),A(),Ve(),u}function De(){return u==null?void 0:u.checkoutUrl}function ct(){return I}function Bt(){return I=He(),Me(I),Ve(),I}async function Ne(t){J();let e=K,a=((e==null?void 0:e.lines)||[]).filter(r=>{var n;return((n=r.attributesByKey)==null?void 0:n._config_id)===t}).map(r=>r.id);a.length!==0&&(await dt(a),t===I&&Bt())}async function lt(t){J();let e=u,a=Ft(I),r=t.map(o=>Fe(o.variantId,o.quantity||a,{...o.attributes||{},_config_id:I})).filter(Boolean);r.length&&(u=Ue(u,r),A());let n=t.map(o=>({merchandiseId:o.variantId,quantity:o.quantity||a,attributes:X({...o.attributes||{},_config_id:I})}));try{return q(await ut(()=>j("cartLinesAdd",`
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ${P} }
          userErrors { field message }
        }
      }
    `,{cartId:x,lines:n}))),A(),u}catch(o){throw u=e,A(),o}}async function dt(t){J();let e=u,a=new Set(t);u&&(u={...u,lines:u.lines.filter(r=>!a.has(r.id))},A());try{return q(await ut(()=>j("cartLinesRemove",`
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ${P} }
          userErrors { field message }
        }
      }
    `,{cartId:x,lineIds:t}))),A(),u}catch(r){throw u=e,A(),r}}async function qe({lineId:t,variantId:e,quantity:a,attributes:r}){J();let n=u;u&&(u={...u,lines:u.lines.map(s=>{if(s.id!==t)return s;let i={...s};if(e!==void 0){let c=jt(e)||s.merchandise;i.merchandise=c}if(a!==void 0&&(i.quantity=a),r!==void 0){let c=X(r);i.attributes=c,i.attributesByKey=Object.fromEntries(c.map(d=>[d.key,d.value]))}return i})},A());let o={id:t};e!==void 0&&(o.merchandiseId=e),a!==void 0&&(o.quantity=a),r!==void 0&&(o.attributes=X(r));try{return q(await ut(()=>j("cartLinesUpdate",`
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ${P} }
          userErrors { field message }
        }
      }
    `,{cartId:x,lines:[o]}))),A(),u}catch(s){throw u=n,A(),s}}function Pe(t){return it.push(t),u&&t(u),()=>{it=it.filter(e=>e!==t)}}var P=`
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
`;async function Sa(){var r;let{data:t,errors:e}=await B.request(`
    mutation CartCreate {
      cartCreate(input: {}) {
        cart { ${P} }
        userErrors { field message }
      }
    }
  `);if(e)throw new Error(`[Cart] createCart errors: ${JSON.stringify(e)}`);let a=(r=t==null?void 0:t.cartCreate)==null?void 0:r.userErrors;if(a!=null&&a.length)throw new Error(`[Cart] createCart userErrors: ${JSON.stringify(a)}`);return Kt(t.cartCreate.cart)}async function Ea(t){let{data:e,errors:a}=await B.request(`
    query GetCart($id: ID!) {
      cart(id: $id) { ${P} }
    }
  `,{variables:{id:t}});if(a)throw new Error(`[Cart] queryCart errors: ${JSON.stringify(a)}`);return e!=null&&e.cart?Kt(e.cart):null}async function j(t,e,a){var s;let{data:r,errors:n}=await B.request(e,{variables:a});if(n)throw new Error(`[Cart] ${t} errors: ${JSON.stringify(n)}`);let o=r==null?void 0:r[t];if((s=o==null?void 0:o.userErrors)!=null&&s.length)throw new Error(`[Cart] ${t} userErrors: ${JSON.stringify(o.userErrors)}`);return Kt(o.cart)}function Kt(t){let e=t.attributes||[];return{id:t.id,checkoutUrl:t.checkoutUrl,totalQuantity:t.totalQuantity,cost:t.cost,attributes:e,attributesByKey:Object.fromEntries(e.map(a=>[a.key,a.value])),lines:t.lines.edges.map(({node:a})=>({id:a.id,quantity:a.quantity,attributes:a.attributes,attributesByKey:Object.fromEntries(a.attributes.map(r=>[r.key,r.value])),merchandise:a.merchandise}))}}function X(t){return Object.entries(t).filter(([,e])=>e!=null&&e!=="").map(([e,a])=>({key:e,value:String(a)}))}function J(){if(!x)throw new Error("[Cart] Called before initCart(config)")}function A(){for(let t of it)t(u)}function He(){return`${wa}${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Ft(t){var r;let e=K||u;if(!((r=e==null?void 0:e.lines)!=null&&r.length))return 1;let a=e.lines.find(n=>{var o;return((o=n.attributesByKey)==null?void 0:o._config_id)===t});return(a==null?void 0:a.quantity)||1}function Ve(){for(let t of _a)t(I)}function Le(){return typeof window=="undefined"?null:new URLSearchParams(window.location.search).get(Mt)}function Me(t){if(typeof window=="undefined")return;let e=new URLSearchParams(window.location.search);t?e.set(Mt,t):e.delete(Mt),window.history.replaceState({},"",`${window.location.pathname}?${e.toString()}`)}function Ca(t){var a;if(!((a=t==null?void 0:t.lines)!=null&&a.length))return null;let e=t.lines.map(r=>{var n;return(n=r.attributesByKey)==null?void 0:n._config_id}).filter(Boolean).sort();return e[e.length-1]||null}var Te=Promise.resolve();async function ut(t){let e=Te,a;Te=new Promise(r=>{a=r}),await e;try{return await t()}finally{a()}}var Vt=new Map;function Ia(t,e){let a=Vt.get(t)||{inflight:null,latest:null};return a.latest=e,Vt.set(t,a),a.inflight||(a.inflight=(async()=>{for(;a.latest;){let r=a.latest;a.latest=null;try{await ut(r)}catch(n){console.error(`[Cart] coalesce(${t}) error:`,n)}}a.inflight=null,Vt.delete(t)})()),a.inflight}async function H(t,e){J();let a=I;if(u){let r=u.lines.findIndex(n=>{var o;return n.merchandise.product.handle===t&&((o=n.attributesByKey)==null?void 0:o._config_id)===a});if(r>=0&&e===null)u={...u,lines:u.lines.filter((n,o)=>o!==r)};else if(r>=0&&e){let n=jt(e);n&&(u={...u,lines:u.lines.map((o,s)=>s===r?{...o,merchandise:n}:o)})}else if(r<0&&e){let n=Ft(a),o=Fe(e,n,{_config_id:a});o&&(u=Ue(u,[o]))}A()}return Ia(`product:${t}:${a}`,async()=>{let r=K==null?void 0:K.lines.find(n=>{var o;return n.merchandise.product.handle===t&&((o=n.attributesByKey)==null?void 0:o._config_id)===a});if(e===null){r&&(q(await j("cartLinesRemove",`
          mutation($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart { ${P} } userErrors { field message }
            }
          }
        `,{cartId:x,lineIds:[r.id]})),A());return}if(r)q(await j("cartLinesUpdate",`
        mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart { ${P} } userErrors { field message }
          }
        }
      `,{cartId:x,lines:[{id:r.id,merchandiseId:e}]}));else{let n=Ft(a);q(await j("cartLinesAdd",`
        mutation($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart { ${P} } userErrors { field message }
          }
        }
      `,{cartId:x,lines:[{merchandiseId:e,quantity:n,attributes:X({_config_id:a})}]}))}A()})}function jt(t){if(!W)return null;let e=[W.main,W.wrap,...W.accessories||[]].filter(Boolean);for(let a of e){let r=a.variants.find(n=>n.id===t);if(r)return{id:r.id,title:r.title,price:r.price,image:r.image,selectedOptions:r.selectedOptions,product:{id:a.id,handle:a.handle,title:a.title}}}return null}function Fe(t,e,a){let r=jt(t);if(!r)return null;let n=X(a);return{id:`tmp_${Math.random().toString(36).slice(2,10)}`,quantity:e,attributes:n,attributesByKey:Object.fromEntries(n.map(o=>[o.key,o.value])),merchandise:r}}function Ue(t,e){return t&&{...t,lines:[...t.lines,...e],totalQuantity:(t.totalQuantity||0)+e.reduce((a,r)=>a+(r.quantity||1),0)}}function Aa(){return typeof localStorage=="undefined"?null:localStorage.getItem(`${xe}${Ut}`)}function $a(t){typeof localStorage!="undefined"&&localStorage.setItem(`${xe}${Ut}`,t)}var Gt=new Map,Qt=`
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
`;async function Be(t){var i;if(Gt.has(t.id))return Gt.get(t.id);let e=!!((i=t.wrap)!=null&&i.productHandle),a=`
    query LoadConfigurator(
      $productHandle: String!
      $accessoriesHandle: String!
      ${e?"$wrapHandle: String!":""}
    ) {
      main: product(handle: $productHandle) { ${Qt} }
      accessoriesCollection: collection(handle: $accessoriesHandle) {
        title
        handle
        products(first: 50) {
          edges { node { ${Qt} } }
        }
      }
      ${e?`wrap: product(handle: $wrapHandle) { ${Qt} }`:""}
    }
  `,r={productHandle:t.product.handle,accessoriesHandle:t.accessoriesCollection};e&&(r.wrapHandle=t.wrap.productHandle);let{data:n,errors:o}=await B.request(a,{variables:r});if(o)throw new Error(`[Products] GraphQL errors: ${JSON.stringify(o)}`);if(!n.main)throw new Error(`[Products] Product not found: ${t.product.handle}`);if(!n.accessoriesCollection)throw new Error(`[Products] Collection not found: ${t.accessoriesCollection}`);let s={main:Yt(n.main),wrap:n.wrap?Yt(n.wrap):null,accessories:n.accessoriesCollection.products.edges.map(c=>Yt(c.node))};return Gt.set(t.id,s),s}function Yt(t){var e,a,r;return{id:t.id,handle:t.handle,title:t.title,description:t.description,availableForSale:t.availableForSale,productType:t.productType,vendor:t.vendor,tags:t.tags||[],featuredImage:t.featuredImage,accessoryEta:((e=t.accessoryEta)==null?void 0:e.value)||null,instructionVideo:((a=t.instructionVideo)==null?void 0:a.value)||null,collections:(((r=t.collections)==null?void 0:r.edges)||[]).map(n=>n.node),variants:t.variants.edges.map(({node:n})=>({id:n.id,title:n.title,availableForSale:n.availableForSale,quantityAvailable:n.quantityAvailable,price:n.price,compareAtPrice:n.compareAtPrice,selectedOptions:n.selectedOptions,image:n.image}))}}var Zt=null,Wt=null,Ke=[],ft=[],b={ready:!1,region:"",baseNumericId:null,bikeLine:null,wrapLine:null,accessoryLines:[],activeBundle:null,quantity:1,total:0,currency:"USD",payMode:"finance",cart:null};function pt(t){return String(t).split("/").pop()}function mt(t){return`gid://shopify/ProductVariant/${t}`}function je(t){Zt=t.config,Wt=t.products,Ke=t.bundles||[],b.baseNumericId=Zt.defaultVariantId,Pe(Ra)}function k(){return b}function Ge(t){return ft.push(t),()=>{ft=ft.filter(e=>e!==t)}}function Xt(t){b.region=t,Jt()}function ht(t){b.payMode=t,Jt()}function Jt(){for(let t of ft)t(b)}function Ra(t){var c,d;let e=ct(),a=((t==null?void 0:t.lines)||[]).filter(l=>{var f;return((f=l.attributesByKey)==null?void 0:f._config_id)===e}),r=Wt.main.handle,n=(c=Zt.wrap)==null?void 0:c.productHandle,o=new Set(Wt.accessories.map(l=>l.handle));b.cart=t,b.bikeLine=a.find(l=>l.merchandise.product.handle===r)||null,b.wrapLine=a.find(l=>l.merchandise.product.handle===n)||null,b.accessoryLines=a.filter(l=>o.has(l.merchandise.product.handle)),b.bikeLine&&(b.baseNumericId=pt(b.bikeLine.merchandise.id)),b.quantity=((d=a[0])==null?void 0:d.quantity)||1;let s=0;for(let l of a)s+=parseFloat(l.merchandise.price.amount)*(l.quantity||1),l.merchandise.price.currencyCode&&(b.currency=l.merchandise.price.currencyCode);b.total=s;let i=new Set(b.accessoryLines.map(l=>l.merchandise.product.handle));b.activeBundle=null;for(let l of Ke){let f=(l.products||[]).map(h=>h.handle);if(f.length&&f.length===i.size&&f.every(h=>i.has(h))){b.activeBundle=l.handle;break}}b.ready=!0,Jt()}var La='<svg viewBox="0 0 922 201" fill="none" xmlns="http://www.w3.org/2000/svg" class="olto-wordmark" role="img" aria-label="Olto"> <path d="M246.995 19.4652C255.252 28.6186 259.698 41.3214 261.454 61.0855C262.35 70.239 262.649 80.8495 262.649 102.706C262.649 151.985 257.942 170.89 242.885 184.153C231.976 193.605 217.218 198.313 192.41 199.807C182.958 200.405 147.241 201.003 119.817 201.003C59.5913 201.003 43.3765 199.247 26.564 190.093C13.5623 182.995 5.00663 169.433 2.35399 149.968C0.598013 136.966 0.000235075 126.355 0.000235075 94.1874C-0.0371261 48.1211 4.37149 29.8142 18.5687 17.4103C29.1793 7.95792 43.0403 3.54931 68.4458 1.45708C78.496 0.560417 108.011 0 143.99 0C213.631 0 232.237 3.54931 246.995 19.4652ZM46.2907 100.651C46.2907 139.021 49.2422 151.425 60.1517 157.029C71.0611 162.932 80.5135 163.829 136.891 163.829C187.665 163.829 200.331 161.774 208.326 152.919C215.126 145.559 217.181 132.856 217.181 99.4927C217.181 37.8095 216.583 37.2117 131.586 37.2117C46.5896 37.2117 46.2907 38.1084 46.2907 100.651Z" fill="#E90022"/> <path d="M286.86 2.05334H332.328V162.034H476.057V198.909H286.86V2.05334Z" fill="#E90022"/> <path d="M507.328 38.9662H414.673V2.05334H645.154V38.9288H552.759V198.909H507.291V38.9662H507.328Z" fill="#E90022"/> <path d="M906.345 19.4644C914.602 28.6179 919.048 41.3207 920.804 61.0847C921.701 70.2382 922 80.8488 922 102.705C922 151.984 917.292 170.889 902.236 184.152C891.326 193.605 876.569 198.312 851.761 199.807C842.308 200.404 806.591 201.002 779.168 201.002C718.979 201.002 702.727 199.246 685.915 190.093C672.913 182.994 664.357 169.432 661.705 149.967C659.949 136.965 659.351 126.355 659.351 94.1867C659.351 48.1578 663.797 29.8508 677.957 17.4469C688.567 7.99454 702.466 3.58593 727.834 1.49371C737.884 0.597038 767.399 0.0366211 803.378 0.0366211C873.019 0.0366211 891.625 3.58593 906.383 19.5018L906.345 19.4644ZM705.679 100.65C705.679 139.02 708.63 151.424 719.54 157.028C730.449 162.931 739.901 163.828 796.279 163.828C847.053 163.828 859.719 161.773 867.714 152.918C874.514 145.558 876.569 132.855 876.569 99.492C876.569 37.8087 875.971 37.211 790.974 37.211C705.978 37.211 705.679 38.1076 705.679 100.65Z" fill="#E90022"/> </svg>',Ta='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 831.97 45.21" class="im-wordmark" fill="currentColor" role="img" aria-label="Infinite Machine"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M13.56.33V44.88H0V.33Z"/><path d="M44.93.33l27,33.86L71.58.33H84.4V44.88H62.63L36,11.35l.34,33.53h-13V.33Z"/><path d="M141.66.33V10.42H107.87V19.3h32.06V29.39H107.87V44.88H94.38V.33Z"/><path d="M163.09.33V44.88H149.54V.33Z"/><path d="M194.46.33l27,33.86L221.11.33h12.82V44.88H212.16L185.58,11.35l.33,33.53h-13V.33Z"/><path d="M257.44.33V44.88H243.89V.33Z"/><path d="M264.52,11.35V.33h53.23v11H297.91V44.88H284.35V11.35Z"/><path d="M374.26,10.42h-36V18.1h33.93v8.81H338.26V34.8h36.47V44.88H324.91V.33h49.35Z"/><path d="M423,.33l16.23,29.59L455.34.33h21.37V44.88H463.49l.67-34.39L444.39,44.88H433.57L414.13,10.49l.4,34.39H401.44V.33Z"/><path d="M526.62.33,551,44.88H536.17l-4.4-8H503.05l-4.28,8H483.41l25-44.55Zm-9.21,9.55-9.49,17.77H527Z"/><path d="M611.09,32.22c0,1.14-.11,2.11-.2,2.91a13.74,13.74,0,0,1-.36,2.07,11.1,11.1,0,0,1-.57,1.6,8.86,8.86,0,0,1-4.21,4.31,21.46,21.46,0,0,1-8.08,1.77q-2.07.19-6.18.27t-10.78.06c-3.21,0-5.91,0-8.12-.13a53.92,53.92,0,0,1-5.61-.47,20.34,20.34,0,0,1-3.9-.9,14.32,14.32,0,0,1-2.94-1.43,10.08,10.08,0,0,1-2.77-2.58,11.37,11.37,0,0,1-1.74-3.87,32.31,32.31,0,0,1-.9-5.84c-.18-2.32-.27-5.12-.27-8.42q0-4.41.27-7.48a23.36,23.36,0,0,1,1-5.24,10,10,0,0,1,1.87-3.54,10.88,10.88,0,0,1,2.9-2.37,16.6,16.6,0,0,1,3.17-1.44,23.22,23.22,0,0,1,4-.9Q570,.27,573.29.13c2.19-.09,4.83-.13,8-.13q6.21,0,10.22.07c2.67,0,4.88.15,6.61.33a27.49,27.49,0,0,1,4.21.7,18,18,0,0,1,3,1.1,8.12,8.12,0,0,1,4,4.35,20.63,20.63,0,0,1,1.27,7.94V16h-13a11.59,11.59,0,0,0-.5-2.87,2.69,2.69,0,0,0-1.7-1.6,12.6,12.6,0,0,0-3.87-.67c-1.7-.09-4-.13-6.95-.13q-4.14,0-6.74.06c-1.74.05-3.13.14-4.18.27a10.12,10.12,0,0,0-2.4.53,5.12,5.12,0,0,0-1.44.87,4.48,4.48,0,0,0-1,1.24,7.48,7.48,0,0,0-.6,1.87,20.61,20.61,0,0,0-.3,2.94c0,1.18-.07,2.66-.07,4.44a42.86,42.86,0,0,0,.37,6.31A5.34,5.34,0,0,0,570,32.66a8,8,0,0,0,4.21,1.43,75.75,75.75,0,0,0,7.68.31c2.54,0,4.57,0,6.11,0s2.77,0,3.71-.1a12.82,12.82,0,0,0,2.13-.23,7.73,7.73,0,0,0,1.47-.5,3.77,3.77,0,0,0,2.07-1.81,8.36,8.36,0,0,0,.6-3.6h13.16C611.16,29.72,611.14,31.09,611.09,32.22Z"/><path d="M633.44.33v16.5H664.3V.33h13.56V44.88H664.3v-17H633.44v17H619.88V.33Z"/><path d="M701.33.33V44.88H687.77V.33Z"/><path d="M732.7.33l27,33.86L759.35.33h12.82V44.88H750.4L723.82,11.35l.33,33.53h-13V.33Z"/><path d="M831.51,10.42h-36V18.1h33.93v8.81H795.51V34.8H832V44.88H782.15V.33h49.36Z"/></g></g></svg>',E="https://cdn.prod.website-files.com/66ea2a84659b76f5d91d481b",te={"accessory-plate":`${E}/68d53a735e9c987a9499211a_accessory-plate.avif`,"charger-bag":`${E}/68d53a2cb165eb23a2527775_charger-bag.avif`,"olto-center-stand":`${E}/68d53974c880c4b20d23dec9_olto-center-stand.avif`,"olto-charging-dock":`${E}/68d5396153ba7acdd9978c0d_olto-charging-dock.avif`,"olto-kid-carrier":`${E}/6921a92ec4d3dc4a766d69bb_Kid%20Carrier.avif`,"olto-rear-basket":`${E}/68d53b6769ccc4ad6ad7d0b3_olto-rear-basket.avif`,"olto-rear-rack":`${E}/68d53b2e1153a3e349d34c1a_olto-rear-rack.avif`,"olto-side-mounting-plate":`${E}/68d53bea87ff421cf85c858e_olto-side-mounting-plate.avif`,"olto-water-bottle-holder":`${E}/68d53d46367f73dfd1b58a42_olto-water-bottle-holder.avif`,"olto-sidewalls":`${E}/68d53c3ccb4cfb15c59ac6cd_olto-sidewalls.avif`,"olto-super-charger":`${E}/6921a99cb5dd5b924cf4965d_Super%20Charger%20on%20the%20Ground.avif`,"olto-u-lock-mount":`${E}/68d53cf8bb965a6129e84ff4_olto-u-lock-mount.avif`,"open-face-helmet":`${E}/6921a8f20583ec71e2663dce_Black%20Open%20Face%20Helmet.avif`,"kryptonite-lock":`${E}/68d53fc0d2d8d2d151493b5f_kryptonite-lock.avif`,"olto-soft-bag":`${E}/692197c1914921de9b30217a_Soft%20Bag%20on%20the%20Ground.avif`},zt={finance:{months:48,apr:.1599},lease:{months:24,residualPct:.35}};function Qe(t,e,a){if(a==="finance"){let{months:r,apr:n}=zt.finance,o=n/12,s=o>0?t*o/(1-(1+o)**-r):t/r;return{amount:s,suffix:"/mo",label:"Est. finance payment",sub:`${r} monthly payments of ${_(s,e)} at ${(n*100).toFixed(2)}% APR. Estimate for illustration \u2014 payment options appear at checkout.`}}if(a==="lease"){let{months:r,residualPct:n}=zt.lease;return{amount:t*(1-n)/r,suffix:"/mo",label:"Est. lease payment",sub:`${r}-month term, ${Math.round(n*100)}% residual. Estimate for illustration.`}}return{amount:t,suffix:"",label:"Est. purchase price",sub:"Taxes and shipping calculated at checkout."}}var yt=[{key:"none",label:"No bundle",tagline:"Pick accessories individually.",price:0,items:[]},{key:"commuter",label:"Olto Commuter",tagline:"Everything you need to commute every day.",popular:!0,price:200,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","olto-water-bottle-holder"]},{key:"cargo",label:"Olto Cargo",tagline:"Carry everything.",price:700,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","charger-bag","olto-rear-rack","olto-rear-basket","olto-soft-bag","olto-side-mounting-plate","accessory-plate","olto-center-stand"]},{key:"max",label:"Olto Max",tagline:"Fully loaded. Full power.",price:950,items:["olto-sidewalls","olto-charging-dock","olto-phone-mount","olto-water-bottle-holder","charger-bag","olto-rear-rack","olto-rear-basket","olto-soft-bag","olto-side-mounting-plate","accessory-plate","olto-center-stand","olto-super-charger"]}],xa=[{value:"40 mi",label:"Range (est.)"},{value:"20 mph",label:"Top Speed"},{value:"Class 2",label:"E-bike"}];function _(t,e="USD"){let a=Number(t)||0,r=a%1===0?0:2;return e==="USD"?`$${a.toLocaleString("en-US",{minimumFractionDigits:r,maximumFractionDigits:r})}`:`${e} ${a.toFixed(2)}`}function y(t){return String(t!=null?t:"").replace(/[&<>"']/g,e=>`&#${e.charCodeAt(0)};`)}function G(t,e){return t?`${t}${t.includes("?")?"&":"?"}width=${e}`:""}function Ye({config:t,products:e,wrapVariantsByColor:a}){let r=Object.entries(t.variants),[n]=r.find(([l])=>l===t.defaultVariantId)||r[0],o=Math.min(...e.main.variants.map(l=>parseFloat(l.price.amount))),{months:s,apr:i}=zt.finance,c=i/12,d=Math.round(o*c/(1-(1+c)**-s));return`
    <header class="topbar">
      <div class="topbar_mark">${Ta}</div>
    </header>

    <section class="hero" aria-label="Olto">
      <img class="hero_img is-active" data-hero-img="a" src="${y(t.variants[n].backgroundImage)}" alt="Olto" />
      <img class="hero_img" data-hero-img="b" alt="" aria-hidden="true" />
      <div class="hero_layers" data-layers>
        ${Object.entries(te).map(([l,f])=>`<img class="hero_layer" data-layer="${y(l)}" src="${y(f)}" alt="" aria-hidden="true" />`).join("")}
      </div>
    </section>

    <main class="sheet">
      <div class="sheet_handle" aria-hidden="true"></div>

      <section class="intro">
        <h1 class="intro_title">${La}</h1>
        <p class="intro_delivery" data-delivery></p>
        <p class="intro_price">From ${_(o)} \xB7 or ${_(d)}/mo financing</p>
        <div class="stats">
          ${xa.map(l=>`
            <div class="stats_item">
              <div class="stats_value">${y(l.value)}</div>
              <div class="stats_label">${y(l.label)}</div>
            </div>`).join("")}
        </div>
      </section>

      ${Oa(t,r,a)}

      ${ka(e)}

      <section class="opt opt--acc" data-section="accessories">
        <h2 class="opt_title">Accessories</h2>
        <div class="acc-nav">
          <button type="button" class="acc-nav_btn" data-acc-scroll="-1" aria-label="Scroll accessories back">&#8249;</button>
          <button type="button" class="acc-nav_btn" data-acc-scroll="1" aria-label="Scroll accessories forward">&#8250;</button>
        </div>
        <div class="acc-list" data-acc-list>
          ${e.accessories.map(l=>Na(l)).join("")}
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

    <div class="modal" data-custom-modal hidden>
      <div class="modal_backdrop" data-custom-close></div>
      <div class="modal_sheet">
        <form data-custom-form novalidate>
          <h3 class="modal_title">Custom color</h3>
          <p class="modal_body">
            Tell us the color you want &mdash; a name, a hex code, anything we can
            match. It rides along with your order.
          </p>
          <input
            class="saveform_field"
            type="text"
            name="color"
            placeholder="Your color &mdash; e.g. Miami teal, #00CED1"
          />
          <p class="saveform_error" data-custom-error hidden></p>
          <button type="submit" class="modal_cta">Add custom wrap</button>
          <button type="button" class="modal_close" data-custom-close>Close</button>
        </form>
      </div>
    </div>
  `}function Oa(t,e,a){var i,c;let r=(i=e.find(([,d])=>/silver/i.test(d.color)))==null?void 0:i[1],n=(c=e.find(([,d])=>/black/i.test(d.color)))==null?void 0:c[1],o={...t.wrapColorMap,Black:(n==null?void 0:n.colorHex)||"#1c1c1e"},s=["Black","Sand","Blush","Forest","Crimson"].filter(d=>a.has(d));return`
    <section class="opt" data-section="color">
      <h2 class="opt_title">Color</h2>
      <p class="opt_sub">Silver anodized finish. Vinyl wrap on top of the aluminum.</p>
      <div class="swatches swatches--labeled">
        <div class="swatch-opt">
          <button
            type="button"
            class="swatch"
            data-color-swatch=""
            style="--swatch: ${y((r==null?void 0:r.colorHex)||"#d7d7d7")}"
            aria-label="Silver"
          ></button>
          <div class="swatch_name">Silver</div>
          <div class="swatch_sub">Ships now</div>
        </div>
        <div class="swatch-box">
          ${s.map(d=>{let l=parseFloat(a.get(d).price.amount);return`
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
          ${a.has("Custom")?`
          <div class="swatch-opt">
            <button
              type="button"
              class="swatch swatch--custom"
              data-color-swatch="Custom"
              data-custom-open
              aria-label="Custom color"
            ></button>
            <div class="swatch_name">Custom</div>
            <div class="swatch_sub">+${_(parseFloat(a.get("Custom").price.amount))}</div>
          </div>`:""}
        </div>
      </div>
    </section>
  `}function ka(t){return`
    <section class="opt" data-section="bundles">
      <h2 class="opt_title">Bundle</h2>
      <div class="kit-list">
        ${yt.map(e=>Da(e,t)).join("")}
      </div>
    </section>
  `}function Da(t,e){let a=t.items.reduce((s,i)=>{let c=Q(e.accessories.find(d=>d.handle===i));return s+(c?parseFloat(c.price.amount):0)},0),r=a-t.price,n=t.items.map(s=>{let i=e.accessories.find(c=>c.handle===s);return((i==null?void 0:i.title)||s).replace(/^Olto /,"")}),o=t.items.length?`<div class="kit_price">+${_(t.price)}</div>
       ${r>0?`<div class="kit_save"><s>${_(a)}</s> Save ${_(r)}</div>`:""}`:"";return`
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
  `}function Na(t){var a;let e=Q(t);return e?`
    <div class="acc" data-acc="${y(t.handle)}">
      <img class="acc_img" src="${y(G((a=t.featuredImage)==null?void 0:a.url,240))}" alt="${y(t.title)}" loading="lazy" />
      <div class="acc_info">
        <div class="acc_name">${y(t.title)}</div>
        <div class="acc_price">${_(parseFloat(e.price.amount),e.price.currencyCode)}</div>
      </div>
      <button type="button" class="acc_btn" data-acc-toggle="${y(t.handle)}">Add</button>
    </div>
  `:""}function Q(t){return t&&(t.variants.find(e=>e.availableForSale)||t.variants[0])||null}function Ze(t,e){var n;let a=[];if(t.bikeLine){let o=((n=e.variants[t.baseNumericId])==null?void 0:n.color)||t.bikeLine.merchandise.title;a.push({label:`Olto &middot; ${y(o)}`,amount:parseFloat(t.bikeLine.merchandise.price.amount)})}t.wrapLine&&a.push({label:`Wrap &middot; ${y(t.wrapLine.merchandise.title)}`,amount:parseFloat(t.wrapLine.merchandise.price.amount)});for(let o of t.accessoryLines)a.push({label:y(o.merchandise.product.title),amount:parseFloat(o.merchandise.price.amount)});let r=t.quantity>1?`<div class="summary_qty">&times;${t.quantity} configurations</div>`:"";return a.map(o=>`
      <div class="summary_row">
        <span>${o.label}</span>
        <span>${_(o.amount,t.currency)}</span>
      </div>`).join("")+r}var L=window.gsap||null;L&&window.ScrollTrigger&&L.registerPlugin(window.ScrollTrigger);var m=document.querySelector("#app"),$=null,U=new Map,z="a",gt=null,qa=new Set(["Sand"]),ee=0,ae=null;Pa();async function Pa(){var a,r,n;let t=(a=Object.entries(w.variants).find(([,o])=>/silver/i.test(o.color)))==null?void 0:a[0];t&&(w.defaultVariantId=t);try{$=await Be(w)}catch(o){console.error("[Tesla] Failed to load products:",o),Va();return}U=Ha($.wrap),Oe($),await ke(w),je({config:w,products:$,bundles:yt.filter(o=>o.items.length).map(o=>({handle:o.key,products:o.items.map(s=>({handle:s}))}))}),m.innerHTML=Ye({config:w,products:$,wrapVariantsByColor:U}),Ma(),Ge(ea),ea(k()),Xa();let e=Ga();e?Qa(e):k().bikeLine||H($.main.handle,mt(w.defaultVariantId)),tr(),ar();for(let o of U.values())(r=o.image)!=null&&r.url&&(new Image().src=o.image.url);for(let o of $.main.variants)(n=o.image)!=null&&n.url&&(new Image().src=G(o.image.url,1600))}function Ha(t){var a;let e=new Map;if(!t)return e;for(let r of t.variants){let n=(a=r.selectedOptions)==null?void 0:a.find(s=>/colou?rs?/i.test(s.name)),o=(n==null?void 0:n.value)||r.title;o&&e.set(o,r)}return e}function Va(){m.innerHTML=`
    <div class="boot">
      <div class="boot_mark">INFINITE MACHINE</div>
      <div class="boot_label">Couldn&rsquo;t reach the store. Check your connection.</div>
      <button type="button" class="boot_retry" onclick="location.reload()">Retry</button>
    </div>
  `}function Ma(){m.addEventListener("click",t=>{if(t.target.closest("[data-custom-open]"))return se(!0);if(t.target.closest("[data-custom-close]"))return se(!1);let e=t.target.closest("[data-color-swatch]");if(e)return Ba(e.dataset.colorSwatch);let a=t.target.closest("[data-acc-scroll]");if(a)return Fa(Number(a.dataset.accScroll));let r=t.target.closest("[data-acc-toggle]");if(r)return Ka(r.dataset.accToggle);let n=t.target.closest("[data-bundle]");if(n)return ja(n.dataset.bundle);let o=t.target.closest("[data-pay-mode]");if(o)return ht(o.dataset.payMode);if(t.target.closest("[data-qty-dec]"))return Xe(-1);if(t.target.closest("[data-qty-inc]"))return Xe(1);if(t.target.closest("[data-save]"))return Ja()?(t.target.closest("[data-nudge]")&&setTimeout(oe,2200),Ya()):(t.target.closest("[data-nudge]")&&oe(),ta(!0));if(t.target.closest("[data-save-close]"))return ta(!1);if(t.target.closest("[data-nudge-close]"))return oe();if(t.target.closest("[data-config-reset]"))return Za();if(t.target.closest("[data-cta]"))return Wa();if(t.target.closest("[data-interest-close]"))return na(!1)}),m.addEventListener("submit",t=>{t.target.closest("[data-save-form]")&&(t.preventDefault(),za(t.target)),t.target.closest("[data-custom-form]")&&(t.preventDefault(),Ua(t.target))})}var re=null;function Fa(t){let e=m.querySelector("[data-acc-list]");if(!e)return;let a=e.scrollLeft,r=Math.max(0,Math.min(e.scrollWidth-e.clientWidth,a+t*320));if(L&&!document.hidden){re&&re.kill();let n={v:a};re=L.to(n,{v:r,duration:.45,ease:"power2.out",onUpdate:()=>{e.scrollLeft=n.v}})}else e.scrollLeft=r}function se(t){var a;let e=m.querySelector("[data-custom-modal]");if(e&&(e.hidden=!t,t)){let r=e.querySelector("[data-custom-error]");r&&(r.hidden=!0),(a=e.querySelector('input[name="color"]'))==null||a.focus()}}async function Ua(t){let e=t.color.value.trim(),a=t.querySelector("[data-custom-error]");if(!e){a&&(a.textContent="Tell us the color you have in mind.",a.hidden=!1);return}a&&(a.hidden=!0),se(!1);let r=U.get("Custom");if(r)try{let{wrapLine:n}=k();n&&!String(n.id).startsWith("tmp_")&&await dt([n.id]),await lt([{variantId:r.id,attributes:{_custom_color:e}}])}catch(n){console.error("[Tesla] Custom wrap failed:",n)}}function Ba(t){let e=w.wrap.productHandle;if(!t)return H(e,null);let a=U.get(t);a&&H(e,a.id)}function Ka(t){var n,o;let e=k(),a=e.accessoryLines.some(s=>s.merchandise.product.handle===t),r=w.accessoryDependencies||{};if(a){H(t,null);let s=((n=r[t])==null?void 0:n.requiredBy)||[];for(let i of s)e.accessoryLines.some(c=>c.merchandise.product.handle===i)&&H(i,null);return}We(t);for(let[s,i]of Object.entries(r))(o=i.requiredBy)!=null&&o.includes(t)&&(e.accessoryLines.some(d=>d.merchandise.product.handle===s)||We(s))}function We(t){let e=$.accessories.find(r=>r.handle===t),a=Q(e);a&&H(t,a.id)}var ne=!1;async function ja(t){if(!ne){ne=!0;try{let e=k(),a=e.activeBundle===t,r=e.accessoryLines.map(s=>s.id).filter(s=>!String(s).startsWith("tmp_"));r.length&&await dt(r);let n=yt.find(s=>s.key===t);if(a||!(n!=null&&n.items.length))return;let o=n.items.map(s=>{let i=Q($.accessories.find(c=>c.handle===s));return i?{variantId:i.id,attributes:{_bundle:t}}:null}).filter(Boolean);o.length&&await lt(o)}catch(e){console.error("[Tesla] Bundle select failed:",e)}finally{ne=!1}}}function Xe(t){let e=k(),a=[e.bikeLine,e.wrapLine,...e.accessoryLines].filter(Boolean),r=Math.min(99,Math.max(1,e.quantity+t));if(r===e.quantity)return;let n=a.filter(o=>!String(o.id).startsWith("tmp_"));Promise.all(n.map(o=>qe({lineId:o.id,quantity:r})))}function Ga(){let t=new URLSearchParams(window.location.search).get("d");if(!t)return null;let[e,a,r,n,o]=t.split(".");return!e||!w.variants[e]?null:{base:e,wrap:a||null,qty:Math.min(99,Math.max(1,parseInt(r,10)||1)),pay:["cash","lease","finance"].includes(n)?n:"finance",accs:(o||"").split("~").filter(Boolean)}}async function Qa(t){Bt();let e=[{variantId:mt(t.base),quantity:t.qty}],a=t.wrap?U.get(t.wrap):null;a&&e.push({variantId:a.id,quantity:t.qty});for(let n of t.accs){let o=Q($.accessories.find(s=>s.handle===n));o&&e.push({variantId:o.id,quantity:t.qty})}ht(t.pay);try{await lt(e)}catch(n){console.error("[Tesla] Failed to apply shared design:",n)}let r=new URLSearchParams(window.location.search);r.delete("d"),window.history.replaceState({},"",`${window.location.pathname}?${r.toString()}`)}function ra(){let t=k(),e=t.wrapLine?sa(t.wrapLine.merchandise)||t.wrapLine.merchandise.title:"",a=t.accessoryLines.map(o=>o.merchandise.product.handle).join("~"),r=[t.baseNumericId,e,t.quantity,t.payMode,a].join("."),n=new URL(window.location.href);return n.searchParams.set("d",r),n.toString()}var Je=null;async function Ya(){let t=ra(),e=[...m.querySelectorAll("[data-save]")];try{await navigator.clipboard.writeText(t);for(let a of e)a.textContent="Link copied"}catch{window.history.replaceState({},"",t);for(let a of e)a.textContent="Link in URL"}clearTimeout(Je),Je=setTimeout(()=>{for(let a of e)a.textContent=a.dataset.saveLabel||"Save"},2200)}var tt=null;async function Za(){let t=m.querySelector("[data-config-reset]");if(!tt){t&&(t.textContent="Tap again to clear",t.classList.add("is-armed")),tt=setTimeout(()=>{tt=null,t&&(t.textContent="Clear configuration",t.classList.remove("is-armed"))},3e3);return}clearTimeout(tt),tt=null,t&&(t.textContent="Clear configuration",t.classList.remove("is-armed"));try{await Ne(ct())}catch(e){console.error("[Tesla] Clear failed:",e)}ht("finance"),H($.main.handle,mt(w.defaultVariantId))}function Wa(){let t=k();if(!t.ready)return;if(t.region==="row")return na(!0);let e=De();e&&(window.location.href=e)}var ze="olto_tesla_nudge";function Xa(){let t=m.querySelector("[data-nudge]"),e=m.querySelector('[data-section="payment"]');if(!t||!e)return;try{if(sessionStorage.getItem(ze))return}catch{}let a=new IntersectionObserver(r=>{if(r.some(n=>n.isIntersecting)){a.disconnect(),t.hidden=!1,requestAnimationFrame(()=>t.classList.add("is-in"));try{sessionStorage.setItem(ze,"1")}catch{}}},{threshold:.3});a.observe(e)}function oe(){let t=m.querySelector("[data-nudge]");!t||t.hidden||(t.classList.remove("is-in"),setTimeout(()=>{t.hidden=!0},450))}function na(t){let e=m.querySelector("[data-interest]");e&&(e.hidden=!t)}var oa="olto_tesla_lead";function Ja(){try{let t=JSON.parse(localStorage.getItem(oa));return t!=null&&t.email?t:null}catch{return null}}function ta(t){var a;let e=m.querySelector("[data-save-modal]");if(e&&(e.hidden=!t,t)){let r=e.querySelector("[data-save-form]"),n=e.querySelector("[data-save-done]");r&&(r.hidden=!1),n&&(n.hidden=!0),(a=e.querySelector('input[name="name"]'))==null||a.focus()}}async function za(t){let e=t.name.value.trim(),a=t.email.value.trim(),r=t.phone.value.trim(),n=t.querySelector("[data-save-error]"),o=null;if(e?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)?r.replace(/\D/g,"").length<7&&(o="That phone number looks too short."):o="That email doesn\u2019t look right.":o="Please add your name.",o){n&&(n.textContent=o,n.hidden=!1);return}n&&(n.hidden=!0);try{localStorage.setItem(oa,JSON.stringify({name:e,email:a,phone:r}))}catch{}let s=ra(),i=!0;try{await navigator.clipboard.writeText(s)}catch{i=!1}t.hidden=!0;let c=m.querySelector("[data-save-done]");if(c){c.hidden=!1;let d=c.querySelector("[data-save-done-msg]");d&&(d.textContent=i?"Link copied to your clipboard \u2014 it rebuilds this exact Olto.":"Copy your link below \u2014 it rebuilds this exact Olto.");let l=c.querySelector("[data-save-link]");l&&(l.textContent=s)}}async function tr(){let t=new AbortController,e=setTimeout(()=>t.abort(),8e3);try{let r=(await(await fetch("https://get.geojs.io/v1/ip/country",{signal:t.signal})).text()).trim().toUpperCase();Xt(["US","CA"].includes(r)?"us":"row")}catch{Xt("")}finally{clearTimeout(e)}}function ea(t){var D,V,N,ie,ce,le;if(!t.ready)return;let e=w.variants[t.baseNumericId]||{};Y("[data-delivery]",e.delivery?`Est. delivery ${e.delivery}`:"");let a=t.wrapLine?sa(t.wrapLine.merchandise)||t.wrapLine.merchandise.title:"";for(let p of m.querySelectorAll("[data-color-swatch]"))p.classList.toggle("is-selected",t.wrapLine?p.dataset.colorSwatch===a:p.dataset.colorSwatch==="");let r=new Set(t.accessoryLines.map(p=>p.merchandise.product.handle)),n={},o=new Set;for(let p of w.customImageRules||[])if(p.when.every(v=>r.has(v))){Object.assign(n,p.replace||{});for(let v of p.hide||[])o.add(v)}let s=!1;for(let p of m.querySelectorAll("[data-layer]")){let v=p.dataset.layer,Z=r.has(v)&&!o.has(v),bt=n[v]||te[v];bt&&p.getAttribute("src")!==bt&&p.setAttribute("src",bt),p.classList.toggle("is-on",Z),Z&&(s=!0)}let i=(V=(D=$.main.variants.find(p=>pt(p.id)===t.baseNumericId))==null?void 0:D.image)==null?void 0:V.url,c=t.region==="row"?"eu":"us",d=(c==="eu"?e.backgroundImage:G(i,1600))||G(i,1600)||e.backgroundImage,l=t.wrapLine?(ie=(N=U.get(a))==null?void 0:N.image)==null?void 0:ie.url:null,f=l&&!qa.has(a);if(t.wrapLine&&a==="Black"){let p=$.main.variants.find(v=>{var Z;return((Z=w.variants[pt(v.id)])==null?void 0:Z.color)==="Black"});(ce=p==null?void 0:p.image)!=null&&ce.url&&(l=G(p.image.url,1600),f=!0)}a==="Custom"&&(l=null),l&&(f||!s)?aa(l,`wrap:${a}`):aa(d,`base:${t.baseNumericId}:${c}`);for(let p of m.querySelectorAll("[data-bundle]")){let v=p.dataset.bundle==="none";p.classList.toggle("is-selected",v?t.accessoryLines.length===0:p.dataset.bundle===t.activeBundle)}let h=new Set(t.accessoryLines.map(p=>p.merchandise.product.handle));for(let p of m.querySelectorAll("[data-acc-toggle]")){let v=h.has(p.dataset.accToggle);p.textContent=v?"Added":"Add",p.classList.toggle("is-added",v),(le=p.closest("[data-acc]"))==null||le.classList.toggle("is-added",v)}Y("[data-qty-value]",String(t.quantity));let g=m.querySelector("[data-summary]");g&&(g.innerHTML=Ze(t,w)),Y("[data-summary-total]",_(t.total,t.currency));let C=Qe(t.total,t.currency,t.payMode);for(let p of m.querySelectorAll("[data-pay-mode]"))p.classList.toggle("is-active",p.dataset.payMode===t.payMode);Y("[data-pay-figure]",_(C.amount,t.currency)+C.suffix),Y("[data-pay-sub]",C.sub),er(C.amount,C.suffix,t.currency),Y("[data-total-label]",C.label);let R=m.querySelector("[data-cta]");R&&(R.textContent=t.region==="row"?"Register interest":"Order")}function sa(t){var a;let e=(a=t.selectedOptions)==null?void 0:a.find(r=>/colou?rs?/i.test(r.name));return(e==null?void 0:e.value)||null}function Y(t,e){let a=m.querySelector(t);a&&a.textContent!==e&&(a.textContent=e)}function er(t,e,a){let r=m.querySelector("[data-total]");if(r){if(L&&!document.hidden&&ee!==t){ae&&ae.kill();let n={v:ee};ae=L.to(n,{v:t,duration:.45,ease:"power2.out",onUpdate:()=>{r.textContent=_(n.v,a)+e},onComplete:()=>{r.textContent=_(t,a)+e}})}else r.textContent=_(t,a)+e;ee=t}}function aa(t,e){if(!t||e===gt)return;let a={a:m.querySelector('[data-hero-img="a"]'),b:m.querySelector('[data-hero-img="b"]')};if(!a.a||!a.b)return;if(gt===null){a[z].src=t,gt=e;return}let r=a[z],n=a[z==="a"?"b":"a"];n.src=t,z=z==="a"?"b":"a",gt=e,L?(L.set(n,{opacity:0,scale:1.04,xPercent:0,yPercent:0}),n.classList.add("is-active"),L.to(n,{opacity:1,scale:1,duration:.45,ease:"power2.out"}),L.to(r,{opacity:0,duration:.45,ease:"power2.out",onComplete:()=>r.classList.remove("is-active")})):(n.classList.add("is-active"),n.style.opacity=1,r.classList.remove("is-active"),r.style.opacity=0)}function ar(){if(!L||!window.ScrollTrigger||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let t=m.querySelector(".sheet");for(let e of m.querySelectorAll(".opt"))L.from(e,{y:24,opacity:0,duration:.45,ease:"power2.out",scrollTrigger:{trigger:e,scroller:t,start:"top 88%",once:!0}})}})();
