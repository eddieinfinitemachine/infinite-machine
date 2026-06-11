"use strict";(()=>{var we={id:"olto",product:{handle:"olto-1"},accessoriesCollection:"olto-accessories",wrap:{productHandle:"olto-wrap"},bundles:{metaobjectType:"bundles"},variants:{"44842879156380":{color:"Black",colorHex:"#000000",delivery:"June 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff73905e7daa5ef224c5d5_olto-eu-black.avif"},"44842879123612":{color:"Silver",colorHex:"#D9D9D9",delivery:"July 2026",backgroundImage:"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/68ff7390e94ecc537b713a30_olto-eu-silver.avif"}},defaultVariantId:"44842879156380",wrapColorMap:{Sand:"#DECEAF",Blush:"#F6C6DC",Sky:"#707A8D",Forest:"#627063",Crimson:"#B44C47"},accessoryDependencies:{"olto-rear-rack":{requiredBy:["olto-rear-basket","olto-side-mounting-plate"]}},customImageRules:[{when:["olto-soft-bag","olto-rear-basket"],replace:{"olto-soft-bag":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/69219c3d619077ba6f1689ed_Soft%20Bag%20in%20Rear%20Basket.avif"}},{when:["olto-charging-dock","olto-battery"],replace:{"olto-battery":"https://cdn.prod.website-files.com/66856cd71d6df6db1cada051/6921a4037d0eab061d3d7ca4_Battery%20Dock%20with%20Battery%20Plugged%20in.avif"},hide:["olto-charging-dock"]}]};var Br={olto:we},Et=Br;function St(t,{startOpen:e=!0}={}){let r=document.querySelector(`[data-step-${t}="head"]`),n=document.querySelector(`[data-step-${t}="content"]`),o=document.querySelector(`[data-step-${t}="meta"]`);if(!r||!n||!o)return null;n.style.overflow="hidden",n.style.transition="height 0.3s ease-out",o.style.transition="opacity 0.3s ease-in-out, visibility 0.3s ease-in-out";let i=e;i?(o.style.opacity="0",o.style.visibility="hidden"):(n.style.height="0px",o.style.opacity="1",o.style.visibility="visible");function s(){n.style.height="auto";let d=n.scrollHeight;n.style.height="0px",requestAnimationFrame(()=>{n.style.height=d+"px"}),o.style.opacity="0",o.style.visibility="hidden",i=!0}function a(){i&&(n.style.height="0px",o.style.opacity="1",o.style.visibility="visible",i=!1)}function c(){i?a():s()}return r.addEventListener("click",c),{open:s,collapse:a,toggle:c}}var ve=window.jQuery;ve||console.error("[Configurator] jQuery not found on window. The configurator requires jQuery.");var l=ve;function _(t){l(t).css({display:"flex",opacity:"1"})}function E(t){l(t).hide().css("opacity","0")}var $e="is-error",xe="is-disabled",Ee="field-validation",Se="input:visible[data-required], select:visible[data-required], textarea:visible[data-required]",qr="[buy-button], [deposit-button], [form-button]";function Ie(){l(document).on("change",Se,Ce),Ce()}function Ce(){let t=!0;l(Se).each(function(){let e=l(this),r=e.closest("[step-block]").find("[option-head]");if(!e.val()||e.val().trim()===""){Hr(r),t=!1;return}Fr(r)}),Ur(t)}function Hr(t){t.addClass($e),_(t.find(`[${Ee}]`))}function Fr(t){t.removeClass($e),E(t.find(`[${Ee}]`))}function Ur(t){let e=l(qr);t?e.removeClass(xe):e.addClass(xe)}var Vr=["United States","Canada"],jr={us:{reveal:'[data-delivery-date="us"],[data-meta-side],[data-eu-price]',hide:'[data-delivery-date="eu"]',active:'[data-img-local="us"]',inactive:'[data-img-local="eu"]'},eu:{reveal:'[data-delivery-date="eu"],[data-meta-side],[data-eu-price]',hide:'[data-delivery-date="us"]',active:'[data-img-local="eu"]',inactive:'[data-img-local="us"]'}},At="",It=null,it=[];function Ae(){return At}function _e(t){return it.push(t),()=>{let e=it.indexOf(t);e>=0&&it.splice(e,1)}}function Re(){let t=l("#country");t.length&&(Mr(t),Kr(t),Qr(t))}function Mr(t){let e=window.countries;if(!Array.isArray(e)){console.warn("[Configurator] window.countries not found \u2014 skipping country list population");return}for(let r of e){let n=document.createElement("option");n.value=r.Name,n.textContent=r.Name,n.setAttribute("data-code",r.Code),t.append(n)}}function Kr(t){t.on("change",()=>Te(t))}function Qr(t){let e=r=>{let n=(r==null?void 0:r.country_code)||"US";Gr(t,n)};if(window.__geoipData){e(window.__geoipData);return}window.geoip=e}function Gr(t,e){let r=t.find("option");for(let n=0;n<r.length;n++)if(l(r[n]).attr("data-code")===e){t.prop("selectedIndex",n),Te(t);return}}function Te(t){It=t.val();let e=Vr.includes(It)?"us":"eu",r=jr[e];At=e,_(l(r.reveal)),E(l(r.hide)),l(r.active).addClass("active"),l(r.inactive).removeClass("active"),zr(e),it.forEach(n=>n({region:At,country:It}))}function zr(t){let e=l("[payment-block]"),r=l("[form-block]"),n=l("[buy-button]"),o=l("[form-button]"),i=l("[deposit-button]"),s=l("[data-deposit-email]"),a=l("[data-total-block]");t==="us"?(_(e),_(n),_(a),E(r),E(o),E(i),E(s)):(E(e),E(n),E(i),E(a),E(s),_(r),_(o))}var K=null,Oe=null,Yr=null,at=[];function Le(t){Oe=t.defaultVariantId||null,st(),Yr=setInterval(st,100),window.addEventListener("popstate",st)}function ke(){return K}function Q(t){let e=new URLSearchParams(window.location.search);e.set("variant",t);let r=`${window.location.pathname}?${e.toString()}`;window.history.pushState({},"",r),st()}function ct(t){return at.push(t),K&&t(K),()=>{at=at.filter(e=>e!==t)}}function st(){let t=new URLSearchParams(window.location.search),e=t.getAll("variant"),r=e.length?e[e.length-1]:null;if(r||(r=Oe),!!r){if(e.length!==1||e[0]!==r){t.delete("variant"),t.set("variant",r);let n=`${window.location.pathname}?${t.toString()}`;window.history.replaceState({},"",n)}r!==K&&(K=r,at.forEach(n=>n(r)))}}var q="GraphQL Client";var _t="An error occurred while fetching from the API. Review 'graphQLErrors' for details.",Rt="Response returned unexpected Content-Type:",Tt="An unknown error has occurred. The API did not return a data object or any errors in its response.",lt={json:"application/json",multipart:"multipart/mixed"},Ot="X-SDK-Variant",Lt="X-SDK-Version",Ne="shopify-graphql-client",Pe="1.4.2",dt=1e3,Be=[429,503],kt=/@(defer)\b/i,De=`\r
`,qe=/boundary="?([^=";]+)"?/i,Dt=De+De;function R(t,e=q){return t.startsWith(`${e}`)?t:`${e}: ${t}`}function L(t){return t instanceof Error?t.message:JSON.stringify(t)}function Nt(t){return t instanceof Error&&t.cause?t.cause:void 0}function Pt(t){return t.flatMap(({errors:e})=>e!=null?e:[])}function ut({client:t,retries:e}){if(e!==void 0&&(typeof e!="number"||e<0||e>3))throw new Error(`${t}: The provided "retries" value (${e}) is invalid - it cannot be less than ${0} or greater than ${3}`)}function S(t,e){return e&&(typeof e!="object"||Array.isArray(e)||typeof e=="object"&&Object.keys(e).length>0)?{[t]:e}:{}}function Bt(t,e){if(t.length===0)return e;let n={[t.pop()]:e};return t.length===0?n:Bt(t,n)}function Ue(t,e){return Object.keys(e||{}).reduce((r,n)=>(typeof e[n]=="object"||Array.isArray(e[n]))&&t[n]?(r[n]=Ue(t[n],e[n]),r):(r[n]=e[n],r),Array.isArray(t)?[...t]:{...t})}function qt([t,...e]){return e.reduce(Ue,{...t})}function Ht({clientLogger:t,customFetchApi:e=fetch,client:r=q,defaultRetryWaitTime:n=dt,retriableCodes:o=Be}){let i=async(s,a,c)=>{let d=a+1,f=c+1,u;try{if(u=await e(...s),t({type:"HTTP-Response",content:{requestParams:s,response:u}}),!u.ok&&o.includes(u.status)&&d<=f)throw new Error;let p=(u==null?void 0:u.headers.get("X-Shopify-API-Deprecated-Reason"))||"";return p&&t({type:"HTTP-Response-GraphQL-Deprecation-Notice",content:{requestParams:s,deprecationNotice:p}}),u}catch(p){if(d<=f){let h=u==null?void 0:u.headers.get("Retry-After");return await Wr(h?parseInt(h,10):n),t({type:"HTTP-Retry",content:{requestParams:s,lastResponse:u,retryAttempt:a,maxRetries:c}}),i(s,d,c)}throw new Error(R(`${c>0?`Attempted maximum number of ${c} network retries. Last message - `:""}${L(p)}`,r))}};return i}async function Wr(t){return new Promise(e=>setTimeout(e,t))}function Ft({headers:t,url:e,customFetchApi:r=fetch,retries:n=0,logger:o}){ut({client:q,retries:n});let i={headers:t,url:e,retries:n},s=Xr(o),a=Ht({customFetchApi:r,clientLogger:s,defaultRetryWaitTime:dt}),c=Jr(a,i),d=Zr(c),f=sn(c);return{config:i,fetch:c,request:d,requestStream:f}}function Xr(t){return e=>{t&&t(e)}}async function Ve(t){let{errors:e,data:r,extensions:n}=await t.json();return{...S("data",r),...S("extensions",n),headers:t.headers,...e||!r?{errors:{networkStatusCode:t.status,message:R(e?_t:Tt),...S("graphQLErrors",e),response:t}}:{}}}function Jr(t,{url:e,headers:r,retries:n}){return async(o,i={})=>{let{variables:s,headers:a,url:c,retries:d,keepalive:f,signal:u}=i,p=JSON.stringify({query:o,variables:s});ut({client:q,retries:d});let h=Object.entries({...r,...a}).reduce((y,[g,v])=>(y[g]=Array.isArray(v)?v.join(", "):v.toString(),y),{});!h[Ot]&&!h[Lt]&&(h[Ot]=Ne,h[Lt]=Pe);let w=[c!=null?c:e,{method:"POST",headers:h,body:p,signal:u,keepalive:f}];return t(w,1,d!=null?d:n)}}function Zr(t){return async(...e)=>{if(kt.test(e[0]))throw new Error(R("This operation will result in a streamable response - use requestStream() instead."));let r=null;try{r=await t(...e);let{status:n,statusText:o}=r,i=r.headers.get("content-type")||"";return r.ok?i.includes(lt.json)?await Ve(r):{errors:{networkStatusCode:n,message:R(`${Rt} ${i}`),response:r}}:{errors:{networkStatusCode:n,message:R(o),response:r}}}catch(n){return{errors:{message:L(n),...r==null?{}:{networkStatusCode:r.status,response:r}}}}}}async function*tn(t){let e=new TextDecoder;if(t.body[Symbol.asyncIterator])for await(let r of t.body)yield e.decode(r);else{let r=t.body.getReader(),n;try{for(;!(n=await r.read()).done;)yield e.decode(n.value)}finally{r.cancel()}}}function en(t,e){return{async*[Symbol.asyncIterator](){try{let r="";for await(let n of t)if(r+=n,r.indexOf(e)>-1){let o=r.lastIndexOf(e),s=r.slice(0,o).split(e).filter(a=>a.trim().length>0).map(a=>a.slice(a.indexOf(Dt)+Dt.length).trim());s.length>0&&(yield s),r=r.slice(o+e.length),r.trim()==="--"&&(r="")}}catch(r){throw new Error(`Error occured while processing stream payload - ${L(r)}`)}}}}function rn(t){return{async*[Symbol.asyncIterator](){try{yield{...await Ve(t),hasNext:!1}}catch(e){yield{errors:{message:R(L(e)),networkStatusCode:t.status,response:t},hasNext:!1}}}}}function nn(t){return t.map(e=>{try{return JSON.parse(e)}catch(r){throw new Error(`Error in parsing multipart response - ${L(r)}`)}}).map(e=>{let{data:r,incremental:n,hasNext:o,extensions:i,errors:s}=e;if(!n)return{data:r||{},...S("errors",s),...S("extensions",i),hasNext:o};let a=n.map(({data:c,path:d,errors:f})=>({data:c&&d?Bt(d,c):{},...S("errors",f)}));return{data:a.length===1?a[0].data:qt([...a.map(({data:c})=>c)]),...S("errors",Pt(a)),hasNext:o}})}function on(t,e){if(t.length>0)throw new Error(_t,{cause:{graphQLErrors:t}});if(Object.keys(e).length===0)throw new Error(Tt)}function an(t,e){var a,c;let r=(e!=null?e:"").match(qe),n=`--${r?r[1]:"-"}`;if(!((a=t.body)!=null&&a.getReader)&&!((c=t.body)!=null&&c[Symbol.asyncIterator]))throw new Error("API multipart response did not return an iterable body",{cause:t});let o=tn(t),i={},s;return{async*[Symbol.asyncIterator](){var d,f;try{let u=!0;for await(let p of en(o,n)){let h=nn(p);s=(f=(d=h.find(y=>y.extensions))==null?void 0:d.extensions)!=null?f:s;let w=Pt(h);i=qt([i,...h.map(({data:y})=>y)]),u=h.slice(-1)[0].hasNext,on(w,i),yield{...S("data",i),...S("extensions",s),hasNext:u}}if(u)throw new Error("Response stream terminated unexpectedly")}catch(u){let p=Nt(u);yield{...S("data",i),...S("extensions",s),errors:{message:R(L(u)),networkStatusCode:t.status,...S("graphQLErrors",p==null?void 0:p.graphQLErrors),response:t},hasNext:!1}}}}}function sn(t){return async(...e)=>{if(!kt.test(e[0]))throw new Error(R("This operation does not result in a streamable response - use request() instead."));try{let r=await t(...e),{statusText:n}=r;if(!r.ok)throw new Error(n,{cause:r});let o=r.headers.get("content-type")||"";switch(!0){case o.includes(lt.json):return rn(r);case o.includes(lt.multipart):return an(r,o);default:throw new Error(`${Rt} ${o}`,{cause:r})}}catch(r){return{async*[Symbol.asyncIterator](){let n=Nt(r);yield{errors:{message:R(L(r)),...S("networkStatusCode",n==null?void 0:n.status),...S("response",n)},hasNext:!1}}}}}}function Ut({client:t,storeDomain:e}){try{if(!e||typeof e!="string")throw new Error;let r=e.trim(),n=r.match(/^https?:/)?r:`https://${r}`,o=new URL(n);return o.protocol="https",o.origin}catch(r){throw new Error(`${t}: a valid store domain ("${e}") must be provided`,{cause:r})}}function ft({client:t,currentSupportedApiVersions:e,apiVersion:r,logger:n}){let o=`${t}: the provided apiVersion ("${r}")`,i=`Currently supported API versions: ${e.join(", ")}`;if(!r||typeof r!="string")throw new Error(`${o} is invalid. ${i}`);let s=r.trim();e.includes(s)||(n?n({type:"Unsupported_Api_Version",content:{apiVersion:r,supportedApiVersions:e}}):console.warn(`${o} is likely deprecated or not supported. ${i}`))}function pt(t){let e=t*3-2;return e===10?e:`0${e}`}function Vt(t,e,r){let n=e-r;return n<=0?`${t-1}-${pt(n+4)}`:`${t}-${pt(n)}`}function je(){let t=new Date,e=t.getUTCMonth(),r=t.getUTCFullYear(),n=Math.floor(e/3+1);return{year:r,quarter:n,version:`${r}-${pt(n)}`}}function jt(){let{year:t,quarter:e,version:r}=je(),n=e===4?`${t+1}-01`:`${t}-${pt(e+1)}`;return[Vt(t,e,3),Vt(t,e,2),Vt(t,e,1),r,n,"unstable"]}function Mt(t){return e=>({...e!=null?e:{},...t.headers})}function Kt({getHeaders:t,getApiUrl:e}){return(r,n)=>{let o=[r];if(n&&Object.keys(n).length>0){let{variables:i,apiVersion:s,headers:a,retries:c,signal:d}=n;o.push({...i?{variables:i}:{},...a?{headers:t(a)}:{},...s?{url:e(s)}:{},...c?{retries:c}:{},...d?{signal:d}:{}})}return o}}var Qt="application/json",Me="storefront-api-client",Ke="1.0.10",Qe="X-Shopify-Storefront-Access-Token",Ge="Shopify-Storefront-Private-Token",ze="X-SDK-Variant",Ye="X-SDK-Version",We="X-SDK-Variant-Source",H="Storefront API Client";function Xe(t){if(t&&typeof window!="undefined")throw new Error(`${H}: private access tokens and headers should only be used in a server-to-server implementation. Use the public API access token in nonserver environments.`)}function Je(t,e){if(!t&&!e)throw new Error(`${H}: a public or private access token must be provided`);if(t&&e)throw new Error(`${H}: only provide either a public or private access token`)}function Gt({storeDomain:t,apiVersion:e,publicAccessToken:r,privateAccessToken:n,clientName:o,retries:i=0,customFetchApi:s,logger:a}){let c=jt(),d=Ut({client:H,storeDomain:t}),f={client:H,currentSupportedApiVersions:c,logger:a};ft({...f,apiVersion:e}),Je(r,n),Xe(n);let u=cn(d,e,f),p={storeDomain:d,apiVersion:e,...r?{publicAccessToken:r}:{privateAccessToken:n},headers:{"Content-Type":Qt,Accept:Qt,[ze]:Me,[Ye]:Ke,...o?{[We]:o}:{},...r?{[Qe]:r}:{[Ge]:n}},apiUrl:u(),clientName:o},h=Ft({headers:p.headers,url:p.apiUrl,retries:i,customFetchApi:s,logger:a}),w=Mt(p),y=ln(p,u),g=Kt({getHeaders:w,getApiUrl:y});return Object.freeze({config:p,getHeaders:w,getApiUrl:y,fetch:(...$)=>h.fetch(...g(...$)),request:(...$)=>h.request(...g(...$)),requestStream:(...$)=>h.requestStream(...g(...$))})}function cn(t,e,r){return n=>{n&&ft({...r,apiVersion:n});let o=(n!=null?n:e).trim();return`${t}/api/${o}/graphql.json`}}function ln(t,e){return r=>r?e(r):t.apiUrl}var mt={SHOPIFY_STORE_DOMAIN:"shop.infinitemachine.com",SHOPIFY_STOREFRONT_PUBLIC_TOKEN:"eefb42e32220791a7472aaa5d2cf2182",SHOPIFY_API_VERSION:"2026-04"};var N=Gt({storeDomain:mt.SHOPIFY_STORE_DOMAIN,apiVersion:mt.SHOPIFY_API_VERSION,publicAccessToken:mt.SHOPIFY_STOREFRONT_PUBLIC_TOKEN});var er="olto_cart_",dn="cfg_",Yt="config",T=null,m=null,F=null,Xt=null,C=null,ht=[],gt=[];function P(t){F=t,m=t}var G=null;function rr(t){G=t}async function nr(t){var r;Xt=t.id,C=Ze()||sr();let e=hn();if(e)try{let n=await fn(e);n&&(T=e,P(n))}catch(n){console.warn("[Cart] Failed to restore cart, will create new:",n)}if(!T){let n=await un();P(n),T=n.id,gn(T)}if(!Ze()&&((r=m==null?void 0:m.lines)!=null&&r.length)){let n=pn(m);n&&(C=n)}return re(C),I(),ee(),m}function k(){return m}function yt(){return m==null?void 0:m.checkoutUrl}function Jt(){return C}function Zt(){return C=sr(),re(C),ee(),C}function or(t){!t||t===C||(C=t,re(C),ee())}function bt(t){return gt.push(t),()=>{gt=gt.filter(e=>e!==t)}}async function ir(t){X();let e=F,r=((e==null?void 0:e.lines)||[]).filter(n=>{var o;return((o=n.attributesByKey)==null?void 0:o._config_id)===t}).map(n=>n.id);r.length!==0&&(await wt(r),t===C&&Zt())}async function ar(t){X();let e=m,r=Wt(C),n=t.map(i=>cr(i.variantId,i.quantity||r,{...i.attributes||{},_config_id:C})).filter(Boolean);n.length&&(m=lr(m,n),I());let o=t.map(i=>({merchandiseId:i.variantId,quantity:i.quantity||r,attributes:z({...i.attributes||{},_config_id:C})}));try{return P(await vt(()=>U("cartLinesAdd",`
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ${B} }
          userErrors { field message }
        }
      }
    `,{cartId:T,lines:o}))),I(),m}catch(i){throw m=e,I(),i}}async function Y(t){return wt([t])}async function wt(t){X();let e=m,r=new Set(t);m&&(m={...m,lines:m.lines.filter(n=>!r.has(n.id))},I());try{return P(await vt(()=>U("cartLinesRemove",`
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ${B} }
          userErrors { field message }
        }
      }
    `,{cartId:T,lineIds:t}))),I(),m}catch(n){throw m=e,I(),n}}async function W({lineId:t,variantId:e,quantity:r,attributes:n}){X();let o=m;m&&(m={...m,lines:m.lines.map(s=>{if(s.id!==t)return s;let a={...s};if(e!==void 0){let c=ne(e)||s.merchandise;a.merchandise=c}if(r!==void 0&&(a.quantity=r),n!==void 0){let c=z(n);a.attributes=c,a.attributesByKey=Object.fromEntries(c.map(d=>[d.key,d.value]))}return a})},I());let i={id:t};e!==void 0&&(i.merchandiseId=e),r!==void 0&&(i.quantity=r),n!==void 0&&(i.attributes=z(n));try{return P(await vt(()=>U("cartLinesUpdate",`
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ${B} }
          userErrors { field message }
        }
      }
    `,{cartId:T,lines:[i]}))),I(),m}catch(s){throw m=o,I(),s}}function V(t){return ht.push(t),m&&t(m),()=>{ht=ht.filter(e=>e!==t)}}var B=`
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
`;async function un(){var n;let{data:t,errors:e}=await N.request(`
    mutation CartCreate {
      cartCreate(input: {}) {
        cart { ${B} }
        userErrors { field message }
      }
    }
  `);if(e)throw new Error(`[Cart] createCart errors: ${JSON.stringify(e)}`);let r=(n=t==null?void 0:t.cartCreate)==null?void 0:n.userErrors;if(r!=null&&r.length)throw new Error(`[Cart] createCart userErrors: ${JSON.stringify(r)}`);return te(t.cartCreate.cart)}async function fn(t){let{data:e,errors:r}=await N.request(`
    query GetCart($id: ID!) {
      cart(id: $id) { ${B} }
    }
  `,{variables:{id:t}});if(r)throw new Error(`[Cart] queryCart errors: ${JSON.stringify(r)}`);return e!=null&&e.cart?te(e.cart):null}async function U(t,e,r){var s;let{data:n,errors:o}=await N.request(e,{variables:r});if(o)throw new Error(`[Cart] ${t} errors: ${JSON.stringify(o)}`);let i=n==null?void 0:n[t];if((s=i==null?void 0:i.userErrors)!=null&&s.length)throw new Error(`[Cart] ${t} userErrors: ${JSON.stringify(i.userErrors)}`);return te(i.cart)}function te(t){let e=t.attributes||[];return{id:t.id,checkoutUrl:t.checkoutUrl,totalQuantity:t.totalQuantity,cost:t.cost,attributes:e,attributesByKey:Object.fromEntries(e.map(r=>[r.key,r.value])),lines:t.lines.edges.map(({node:r})=>({id:r.id,quantity:r.quantity,attributes:r.attributes,attributesByKey:Object.fromEntries(r.attributes.map(n=>[n.key,n.value])),merchandise:r.merchandise}))}}function z(t){return Object.entries(t).filter(([,e])=>e!=null&&e!=="").map(([e,r])=>({key:e,value:String(r)}))}function X(){if(!T)throw new Error("[Cart] Called before initCart(config)")}function I(){for(let t of ht)t(m)}function sr(){return`${dn}${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Wt(t){var n;let e=F||m;if(!((n=e==null?void 0:e.lines)!=null&&n.length))return 1;let r=e.lines.find(o=>{var i;return((i=o.attributesByKey)==null?void 0:i._config_id)===t});return(r==null?void 0:r.quantity)||1}function ee(){for(let t of gt)t(C)}function Ze(){return typeof window=="undefined"?null:new URLSearchParams(window.location.search).get(Yt)}function re(t){if(typeof window=="undefined")return;let e=new URLSearchParams(window.location.search);t?e.set(Yt,t):e.delete(Yt),window.history.replaceState({},"",`${window.location.pathname}?${e.toString()}`)}function pn(t){var r;if(!((r=t==null?void 0:t.lines)!=null&&r.length))return null;let e=t.lines.map(n=>{var o;return(o=n.attributesByKey)==null?void 0:o._config_id}).filter(Boolean).sort();return e[e.length-1]||null}var tr=Promise.resolve();async function vt(t){let e=tr,r;tr=new Promise(n=>{r=n}),await e;try{return await t()}finally{r()}}var zt=new Map;function mn(t,e){let r=zt.get(t)||{inflight:null,latest:null};return r.latest=e,zt.set(t,r),r.inflight||(r.inflight=(async()=>{for(;r.latest;){let n=r.latest;r.latest=null;try{await vt(n)}catch(o){console.error(`[Cart] coalesce(${t}) error:`,o)}}r.inflight=null,zt.delete(t)})()),r.inflight}async function O(t,e){X();let r=C;if(m){let n=m.lines.findIndex(o=>{var i;return o.merchandise.product.handle===t&&((i=o.attributesByKey)==null?void 0:i._config_id)===r});if(n>=0&&e===null)m={...m,lines:m.lines.filter((o,i)=>i!==n)};else if(n>=0&&e){let o=ne(e);o&&(m={...m,lines:m.lines.map((i,s)=>s===n?{...i,merchandise:o}:i)})}else if(n<0&&e){let o=Wt(r),i=cr(e,o,{_config_id:r});i&&(m=lr(m,[i]))}I()}return mn(`product:${t}:${r}`,async()=>{let n=F==null?void 0:F.lines.find(o=>{var i;return o.merchandise.product.handle===t&&((i=o.attributesByKey)==null?void 0:i._config_id)===r});if(e===null){n&&(P(await U("cartLinesRemove",`
          mutation($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart { ${B} } userErrors { field message }
            }
          }
        `,{cartId:T,lineIds:[n.id]})),I());return}if(n)P(await U("cartLinesUpdate",`
        mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart { ${B} } userErrors { field message }
          }
        }
      `,{cartId:T,lines:[{id:n.id,merchandiseId:e}]}));else{let o=Wt(r);P(await U("cartLinesAdd",`
        mutation($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart { ${B} } userErrors { field message }
          }
        }
      `,{cartId:T,lines:[{merchandiseId:e,quantity:o,attributes:z({_config_id:r})}]}))}I()})}function ne(t){if(!G)return null;let e=[G.main,G.wrap,...G.accessories||[]].filter(Boolean);for(let r of e){let n=r.variants.find(o=>o.id===t);if(n)return{id:n.id,title:n.title,price:n.price,image:n.image,selectedOptions:n.selectedOptions,product:{id:r.id,handle:r.handle,title:r.title}}}return null}function cr(t,e,r){let n=ne(t);if(!n)return null;let o=z(r);return{id:`tmp_${Math.random().toString(36).slice(2,10)}`,quantity:e,attributes:o,attributesByKey:Object.fromEntries(o.map(i=>[i.key,i.value])),merchandise:n}}function lr(t,e){return t&&{...t,lines:[...t.lines,...e],totalQuantity:(t.totalQuantity||0)+e.reduce((r,n)=>r+(n.quantity||1),0)}}function hn(){return typeof localStorage=="undefined"?null:localStorage.getItem(`${er}${Xt}`)}function gn(t){typeof localStorage!="undefined"&&localStorage.setItem(`${er}${Xt}`,t)}var oe=new Map,ie=`
  id
  handle
  title
  description
  availableForSale
  productType
  vendor
  tags
  featuredImage { url altText }
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
`;async function dr(t){var a;if(oe.has(t.id))return oe.get(t.id);let e=!!((a=t.wrap)!=null&&a.productHandle),r=`
    query LoadConfigurator(
      $productHandle: String!
      $accessoriesHandle: String!
      ${e?"$wrapHandle: String!":""}
    ) {
      main: product(handle: $productHandle) { ${ie} }
      accessoriesCollection: collection(handle: $accessoriesHandle) {
        title
        handle
        products(first: 50) {
          edges { node { ${ie} } }
        }
      }
      ${e?`wrap: product(handle: $wrapHandle) { ${ie} }`:""}
    }
  `,n={productHandle:t.product.handle,accessoriesHandle:t.accessoriesCollection};e&&(n.wrapHandle=t.wrap.productHandle);let{data:o,errors:i}=await N.request(r,{variables:n});if(i)throw new Error(`[Products] GraphQL errors: ${JSON.stringify(i)}`);if(!o.main)throw new Error(`[Products] Product not found: ${t.product.handle}`);if(!o.accessoriesCollection)throw new Error(`[Products] Collection not found: ${t.accessoriesCollection}`);let s={main:ae(o.main),wrap:o.wrap?ae(o.wrap):null,accessories:o.accessoriesCollection.products.edges.map(c=>ae(c.node))};return oe.set(t.id,s),s}function ae(t){var e;return{id:t.id,handle:t.handle,title:t.title,description:t.description,availableForSale:t.availableForSale,productType:t.productType,vendor:t.vendor,tags:t.tags||[],featuredImage:t.featuredImage,collections:(((e=t.collections)==null?void 0:e.edges)||[]).map(r=>r.node),variants:t.variants.edges.map(({node:r})=>({id:r.id,title:r.title,availableForSale:r.availableForSale,quantityAvailable:r.quantityAvailable,price:r.price,compareAtPrice:r.compareAtPrice,selectedOptions:r.selectedOptions,image:r.image}))}}function j(t,e){var r,n;return((r=t.main)==null?void 0:r.handle)===e?t.main:((n=t.wrap)==null?void 0:n.handle)===e?t.wrap:t.accessories.find(o=>o.handle===e)||null}function ur(t,e){let r=[t.main,t.wrap,...t.accessories].filter(Boolean);for(let n of r){let o=n.variants.find(i=>i.id===e);if(o)return{variant:o,product:n}}return null}var b=null,se=null,Z=null,tt=null,xt=[];function fr(t,e,r=[]){b=t,se=e,Z=r,J(),V(J),ct(J),_e(J),bt(J)}function A(){return tt}function x(t){return xt.push(t),tt&&t(tt),()=>{let e=xt.indexOf(t);e>=0&&xt.splice(e,1)}}function J(){let t=k(),e=ke(),r=Ae(),n=Jt(),o=vn(t,n);tt={variant:yn(e),wrap:wn(t,n),accessories:o,activeBundle:bn(o),region:r,sessionId:n,cart:t,allConfigs:xn(t)},xt.forEach(i=>i(tt))}function yn(t){var o,i,s;if(!t)return null;let e=((o=b==null?void 0:b.variants)==null?void 0:o[t])||{},r=`gid://shopify/ProductVariant/${t}`,n=se?ur(se,r):null;return{id:t,gid:r,color:e.color,colorHex:e.colorHex,delivery:e.delivery,usImage:((s=(i=n==null?void 0:n.variant)==null?void 0:i.image)==null?void 0:s.url)||null,euImage:e.backgroundImage||null}}function pr(t,e){var r;return((r=t.attributesByKey)==null?void 0:r._config_id)===e}function bn(t){if(!(Z!=null&&Z.length)||t.length===0)return null;let e=new Set(t.map(r=>r.handle));for(let r of Z){let n=new Set((r.products||[]).map(i=>i.handle));if(n.size===0||n.size!==e.size)continue;let o=!0;for(let i of n)if(!e.has(i)){o=!1;break}if(o)return r.handle}return null}function wn(t,e){var s,a,c;if(!t||!((s=b==null?void 0:b.wrap)!=null&&s.productHandle))return null;let r=b.wrap.productHandle,n=t.lines.find(d=>d.merchandise.product.handle===r&&pr(d,e));if(!n)return null;let o=(a=n.merchandise.selectedOptions)==null?void 0:a.find(d=>/colou?rs?/i.test(d.name)),i=o==null?void 0:o.value;return{lineId:n.id,variantId:n.merchandise.id,color:i,hex:i?(c=b.wrapColorMap)==null?void 0:c[i]:null}}function vn(t,e){var o,i;if(!t)return[];let r=(o=b==null?void 0:b.product)==null?void 0:o.handle,n=(i=b==null?void 0:b.wrap)==null?void 0:i.productHandle;return t.lines.filter(s=>{let a=s.merchandise.product.handle;return a===r||a===n?!1:pr(s,e)}).map(s=>{var a;return{lineId:s.id,handle:s.merchandise.product.handle,variantId:s.merchandise.id,title:s.merchandise.product.title,image:((a=s.merchandise.image)==null?void 0:a.url)||null,quantity:s.quantity}})}function xn(t){var i,s,a,c;if(!((i=t==null?void 0:t.lines)!=null&&i.length))return[];let e=(s=b==null?void 0:b.product)==null?void 0:s.handle,r=(a=b==null?void 0:b.wrap)==null?void 0:a.productHandle,n=Jt(),o=new Map;for(let d of t.lines){let f=((c=d.attributesByKey)==null?void 0:c._config_id)||"__loose";o.has(f)||o.set(f,{sessionId:f,bikeLine:null,wrapLine:null,accessoryLines:[],totalQuantity:0});let u=o.get(f),p=d.merchandise.product.handle;p===e?u.bikeLine=d:p===r?u.wrapLine=d:u.accessoryLines.push(d),u.totalQuantity+=d.quantity||0}return[...o.values()].sort((d,f)=>d.sessionId.localeCompare(f.sessionId)).map(d=>({...d,isCurrent:d.sessionId===n}))}function mr(t,e){let r=l('[data-accessories="wrap"]'),n=l('[data-accessories="list"]'),o=l("[data-accessories-item]").first();if(!n.length){console.warn('[AccessorySidebar] Missing [data-accessories="list"] mount \u2014 sidebar disabled');return}let i=o.length?o[0].outerHTML:'<div data-accessories-item="" class="checkout_includes-inner-item"><p data-item="label" class="text-size-tiny text-weight-medium"></p><div class="cc-flex"><img data-item="img" loading="lazy" class="checkout_item-pic-small" alt="" /><div class="icon-embed-12" style="cursor:pointer"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path d="M19 5L5 19" stroke="black" /><path d="M5 5L19 19" stroke="black" /></svg></div></div></div>';o.length||console.log("[AccessorySidebar] No Webflow template found \u2014 using fallback HTML"),n.empty(),l(document).on("click.accessorySidebar","[data-accessories-item][data-line-id]",function(){let a=l(this).attr("data-line-id");a&&Y(a).catch(c=>console.error("[AccessorySidebar] removeLine failed:",c))});let s=new Map;((e==null?void 0:e.accessories)||[]).forEach((a,c)=>s.set(a.handle,c)),x(a=>{var d,f;let c=[...a.accessories].sort((u,p)=>{var h,w;return((h=s.get(u.handle))!=null?h:1/0)-((w=s.get(p.handle))!=null?w:1/0)});if(n.empty(),c.length===0){E(r);return}for(let u of c){let p=(d=a.cart)==null?void 0:d.lines.find($=>$.id===u.lineId);if(!p)continue;let h=p.merchandise,y=(h.selectedOptions||[]).filter($=>$.value&&$.value.toLowerCase()!=="default title"),g=y.length?` \u2014 ${y.map($=>$.value).join(" / ")}`:"",v=l(i);v.attr("data-line-id",u.lineId),v.attr("data-source-id",u.handle),v.find('[data-item="label"]').text(h.product.title+g),(f=h.image)!=null&&f.url&&v.find('[data-item="img"]').attr("src",h.image.url),n.append(v)}_(r)})}var ce=!1;function hr(t,e){t.accessoryDependencies&&x(async r=>{if(!ce){ce=!0;try{let n=new Set(r.accessories.map(o=>o.handle));for(let[o,i]of Object.entries(t.accessoryDependencies)){if(!i.requiredBy.some(d=>n.has(d))||n.has(o))continue;let a=j(e,o),c=a==null?void 0:a.variants[0];if(!c){console.warn(`[AccessoryDependencies] Parent not found: ${o}`);continue}await O(o,c.id),n.add(o)}}catch(n){console.error("[AccessoryDependencies] Error:",n)}finally{ce=!1}}})}function gr(t,e){if(!Array.isArray(t.customImageRules)||t.customImageRules.length===0)return;let r=new Map,n=s=>{if(r.has(s))return r.get(s);let a=j(e,s);if(!a)return null;let c=a.id.split("/").pop();return r.set(s,c),c},o=new Map,i=s=>{if(o.has(s))return;let a=et(s).attr("src");a&&o.set(s,a)};V(s=>{if(!s)return;let a=new Set(s.lines.map(c=>c.merchandise.product.handle));for(let c of t.customImageRules)c.when.every(f=>a.has(f))?Cn(c,n,i):$n(c,n,o)})}function et(t){return l(`.checkout_product-layers [data-product-layer="${t}"] img`)}function Cn(t,e,r){if(t.replace)for(let[n,o]of Object.entries(t.replace)){let i=e(n);i&&(r(i),et(i).attr("src",o))}if(t.hide)for(let n of t.hide){let o=e(n);o&&et(o).hide()}}function $n(t,e,r){if(t.replace)for(let n of Object.keys(t.replace)){let o=e(n);if(!o)continue;let i=r.get(o);i&&et(o).attr("src",i)}if(t.hide)for(let n of t.hide){let o=e(n);o&&et(o).show()}}var le=!1;async function yr(t,e,r){var s;if(!((s=t.bundles)!=null&&s.metaobjectType))return;if(!(r!=null&&r.length)){console.warn("[BundlesUi] No bundles to render");return}r.sort((a,c)=>(Number(a.order)||0)-(Number(c.order)||0));let n=l('[data-option-group="bundle"]');if(!n.length){console.warn('[BundlesUi] No [data-option-group="bundle"] mount');return}let o=n.find("[data-preset-value]").first();if(!o.length){console.warn("[BundlesUi] No [data-preset-value] template found inside mount");return}let i=o[0].outerHTML;n.find("[data-preset-value]").remove();for(let a of r){let c=l(i);c.attr("data-preset-value",a.handle);let d=a.label||a.handle,f=c.find("[data-preset-label], .checkout_option-text").first();f.length&&f.text(d),c.find("[data-accessory-label]").text((a.products||[]).map(u=>u.title).join(", ")),c.find(".w-dyn-list, [data-bundle-product]").remove(),n.append(c)}n.off("click.bundles").on("click.bundles","[data-preset-value]",async function(){var d,f;if(le)return;le=!0;let a=l(this).attr("data-preset-value"),c=((d=A())==null?void 0:d.activeBundle)===a;try{if(await En(t),c)return;let u=r.find(h=>h.handle===a);if(!((f=u==null?void 0:u.products)!=null&&f.length))return;let p=u.products.map(h=>{var y,g;let w=(g=(y=j(e,h.handle))==null?void 0:y.variants[0])==null?void 0:g.id;return w?{variantId:w,attributes:{_bundle:a}}:null}).filter(Boolean);p.length&&await ar(p)}catch(u){console.error("[BundlesUi] Click handler error:",u)}finally{le=!1}})}async function En(t){let r=A().accessories.map(n=>n.lineId);r.length&&await wt(r)}var de="data-wrap-variant-id";function br(t,e){if(!t.wrap||!e.wrap)return;let r=e.wrap,n=r.handle,o=r.id.split("/").pop(),i=document.querySelector(`[sf-product="${o}"]`);if(!i){console.warn(`[Wrap] Container [sf-product="${o}"] not found`);return}An(),Sn(i,r),In(i,n),_n()}function Sn(t,e){let r=new Map;for(let n of e.variants){let o=n.selectedOptions.find(i=>/colou?rs?/i.test(i.name));o&&r.set(o.value,n)}l(t).find("[sf-add-to-cart][sf-option-value]").each(function(){let n=l(this),o=n.attr("sf-option-value");if(o==="Custom"){n.hide();return}let i=r.get(o);i&&n.attr(de,i.id)})}function In(t,e){t.addEventListener("click",r=>{var a;let n=r.target.closest(`[sf-add-to-cart][${de}]`);if(!n)return;r.preventDefault(),r.stopImmediatePropagation();let o=n.getAttribute(de),i=(a=A())==null?void 0:a.wrap,s=i&&i.variantId===o?null:o;O(e,s)},!0),l('[sf-option-value="none"]').on("click.wrap",function(r){r.preventDefault(),r.stopImmediatePropagation(),O(e,null)})}function An(){if(l('[data-inc-item="wrap"]').length)return;let t=l('[data-inc-item="finish"]').first();if(!t.length)return;let e=t.clone();e.attr("data-inc-item","wrap").removeAttr("data-w-id"),e.find(".text-size-tiny.text-weight-medium").first().text("Wrap"),e.find('[data-inc-item="label"]').attr("data-inc-item","wrap-label").text(""),e.find('[data-inc-item="color"]').attr("data-inc-item","wrap-color").attr("style",""),e.css({display:"none",opacity:0}),t.after(e)}function _n(){x(t=>{var o;let e=(o=t.wrap)==null?void 0:o.color,r=l(".checkout_product-wraps");if(!r.length)return;if(!e){r.css("visibility","hidden"),l("[data-img-local]").css("display","");return}let n=r.find(`[data-wrap-img="${e}"]`).first();if(!n.length){r.css("visibility","hidden"),l("[data-img-local]").css("display","");return}r.find(".w-dyn-item").css("display","none"),n.css("display",""),r.css("visibility","visible"),l("[data-img-local]").css("display","none")})}var Rn=()=>A()||{accessories:[]},wr="data-accessory-variant-id",M="data-accessory-handle",ue="data-accessory-option-id";function vr(t,e){var n,o,i;if(!((n=e.accessories)!=null&&n.length))return;let r=0;for(let s of e.accessories){let a=s.id.split("/").pop(),c=l(`[sf-product="${a}"]`).first();if(!c.length)continue;let d=s.variants[0];if(!d)continue;if(c.attr(wr,d.id),c.attr(M,s.handle),s.variants.length>1){let u=new Map;for(let p of s.variants){let h=(i=(o=p.selectedOptions)==null?void 0:o[0])==null?void 0:i.value;h&&!u.has(h)&&u.set(h,p.id)}c.find("[sf-option-value]").each(function(){let p=l(this).attr("sf-option-value"),h=u.get(p);h&&l(this).attr(ue,h)})}let f=c.find('[sf-show-price="1"]').first();if(f.length&&d.price){let u=parseFloat(d.price.amount).toFixed(2),p=d.price.currencyCode==="USD"?"$":`${d.price.currencyCode} `;f.text(`${p}${u}`).css({display:"flex",opacity:1})}r++}console.log(`[AccessoryOrch] Tagged ${r}/${e.accessories.length} accessory cards`),l(document).on("click.accessoryOrch",`[${M}]`,function(s){if(l(s.target).closest("[sf-option-value], [sf-change-option]").length)return;s.preventDefault(),s.stopImmediatePropagation();let a=l(this),c=a.attr(wr),d=a.attr(M),f=Rn().accessories.find(u=>u.handle===d);O(d,f?null:c)}),l(document).on("click.accessorySwatch",`[${M}] [${ue}]`,function(s){s.preventDefault(),s.stopImmediatePropagation();let a=l(this),d=a.closest(`[${M}]`).attr(M),f=a.attr(ue);!d||!f||O(d,f)})}var Tn=`
  #cart-drawer { position: fixed; top: 0; right: 0; bottom: 0; width: 380px;
    background: #fff; color: #111; border-left: 1px solid #ddd;
    z-index: 2147483646; display: flex; flex-direction: column;
    transform: translateX(100%); transition: transform 0.2s ease-out;
    font: 13px/1.4 ui-sans-serif, system-ui, sans-serif; }
  #cart-drawer.open { transform: translateX(0); }
  #cart-drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4);
    z-index: 2147483645; opacity: 0; pointer-events: none;
    transition: opacity 0.2s ease-out; }
  #cart-drawer-overlay.open { opacity: 1; pointer-events: auto; }
  #cart-drawer .hdr { display: flex; justify-content: space-between; align-items: center;
    padding: 14px 16px; border-bottom: 1px solid #eee; }
  #cart-drawer .hdr strong { font-size: 14px; }
  #cart-drawer .hdr button { background: none; border: none; font-size: 22px;
    cursor: pointer; padding: 0 6px; line-height: 1; }
  #cart-drawer .body { flex: 1; overflow-y: auto; padding: 12px 16px; }
  #cart-drawer .empty { color: #888; padding: 40px 0; text-align: center; }
  #cart-drawer .group { border: 1px solid #ddd; border-radius: 4px;
    padding: 10px 12px; margin-bottom: 12px; }
  #cart-drawer .group.current { border-color: #111; }
  #cart-drawer .group-hdr { display: flex; justify-content: space-between;
    align-items: baseline; margin-bottom: 8px; }
  #cart-drawer .group-hdr strong { font-size: 13px; }
  #cart-drawer .group-hdr .meta { color: #888; font-size: 11px; }
  #cart-drawer .group-actions { margin-top: 8px; display: flex; gap: 6px; }
  #cart-drawer .group-actions button { background: #f4f4f4; border: 1px solid #ddd;
    padding: 4px 8px; font-size: 11px; cursor: pointer; border-radius: 3px; }
  #cart-drawer .group-actions button.danger { color: #b00; }
  #cart-drawer .line { display: grid;
    grid-template-columns: 36px 1fr auto auto;
    gap: 8px; align-items: center;
    padding: 6px 0; border-top: 1px solid #f0f0f0; }
  #cart-drawer .line:first-child { border-top: none; }
  #cart-drawer .line img { width: 36px; height: 36px; object-fit: cover;
    background: #f4f4f4; border-radius: 3px; }
  #cart-drawer .line .title { font-size: 12px; }
  #cart-drawer .line .title .opts { color: #888; display: block; font-size: 11px; }
  #cart-drawer .qty { display: flex; align-items: center; gap: 4px;
    border: 1px solid #ddd; border-radius: 3px; }
  #cart-drawer .qty button { background: none; border: none; width: 22px; height: 22px;
    cursor: pointer; font-size: 13px; padding: 0; }
  #cart-drawer .qty button:disabled { color: #ccc; cursor: not-allowed; }
  #cart-drawer .qty .v { min-width: 16px; text-align: center; font-size: 12px; }
  #cart-drawer .line .price { font-size: 12px; min-width: 50px; text-align: right; }
  #cart-drawer .line button.remove { background: none; border: none; color: #b00;
    cursor: pointer; font-size: 16px; padding: 0 4px; line-height: 1; }
  #cart-drawer .footer { border-top: 1px solid #eee; padding: 12px 16px; }
  #cart-drawer .total { display: flex; justify-content: space-between;
    font-weight: 600; margin-bottom: 10px; }
  #cart-drawer .footer button { width: 100%; padding: 10px; font-size: 13px;
    cursor: pointer; margin-bottom: 6px; border-radius: 3px; }
  #cart-drawer .footer .add-another { background: #fff; color: #111; border: 1px solid #111; }
  #cart-drawer .footer .checkout { background: #111; color: #fff; border: 1px solid #111; }
  #cart-drawer .footer .checkout:disabled { background: #888; border-color: #888; cursor: not-allowed; }
`,On="mainProductHandle",xr=null;function $r(t){var n;if(document.getElementById("cart-drawer"))return;xr=t,xr[On]=(n=t.product)==null?void 0:n.handle,l("<style>").text(Tn).appendTo("head");let e=l('<div id="cart-drawer-overlay"></div>'),r=l(`
    <div id="cart-drawer" aria-hidden="true">
      <div class="hdr">
        <strong>Your cart</strong>
        <button data-act="close" aria-label="Close">\xD7</button>
      </div>
      <div class="body"></div>
      <div class="footer">
        <div class="total"><span>Total</span><span class="total-amt">$0.00</span></div>
        <button class="add-another" data-act="add-another">+ Configure another bike</button>
        <button class="checkout" data-act="checkout">Checkout \u2192</button>
      </div>
    </div>
  `);l("body").append(e).append(r),e.on("click",Ct),r.on("click","[data-act]",Ln),x(Cr),Cr(A())}function Er(){l("#cart-drawer-overlay").addClass("open"),l("#cart-drawer").addClass("open").attr("aria-hidden","false")}function Ct(){l("#cart-drawer-overlay").removeClass("open"),l("#cart-drawer").removeClass("open").attr("aria-hidden","true")}function Ln(t){let e=l(this),r=e.attr("data-act"),n=e.attr("data-line-id"),o=e.attr("data-session-id");if(r==="close")return Ct();if(r==="remove-line"&&n)return Y(n);if(r==="qty-up"&&n){let i=Number(e.closest(".qty").find(".v").text())||1;return W({lineId:n,quantity:i+1})}if(r==="qty-down"&&n){let i=Number(e.closest(".qty").find(".v").text())||1;return i<=1?Y(n):W({lineId:n,quantity:i-1})}if(r==="edit-config"&&o){or(o),Ct();return}if(r==="remove-config"&&o)return confirm("Remove this entire configuration?")?ir(o):void 0;if(r==="add-another"){Zt(),Ct();return}if(r==="checkout"){let i=yt();i&&(window.location.href=i);return}}function Cr(t){var i,s;if(!t)return;let e=l("#cart-drawer .body"),r=t.allConfigs||[];if(r.length===0||!((s=(i=t.cart)==null?void 0:i.lines)!=null&&s.length)){e.html('<div class="empty">Your cart is empty.</div>'),l("#cart-drawer .total-amt").text("$0.00"),l("#cart-drawer .checkout").prop("disabled",!0);return}let n=0,o=r.map((a,c)=>{var w,y;let d=[a.bikeLine,a.wrapLine,...a.accessoryLines].filter(Boolean),f=d.reduce((g,v)=>{var $;return g+parseFloat((($=v.merchandise.price)==null?void 0:$.amount)||0)*(v.quantity||1)},0);n+=f;let u=d.map(g=>kn(g)).join(""),p=(y=(w=a.bikeLine)==null?void 0:w.merchandise.selectedOptions)==null?void 0:y.find(g=>/colou?r/i.test(g.name)),h=a.bikeLine?`Bike ${c+1}${p?` \u2014 ${p.value}`:""}`:`Configuration ${c+1}`;return`
        <div class="group ${a.isCurrent?"current":""}">
          <div class="group-hdr">
            <strong>${D(h)}</strong>
            <span class="meta">${fe(f)} \xB7 ${d.length} item${d.length===1?"":"s"}</span>
          </div>
          ${u}
          <div class="group-actions">
            ${a.isCurrent?'<span class="meta" style="font-size:11px;color:#888;align-self:center;">(currently editing)</span>':`<button data-act="edit-config" data-session-id="${D(a.sessionId)}">Edit</button>`}
            <button class="danger" data-act="remove-config" data-session-id="${D(a.sessionId)}">Remove</button>
          </div>
        </div>
      `}).join("");e.html(o),l("#cart-drawer .total-amt").text(fe(n)),l("#cart-drawer .checkout").prop("disabled",!1)}function kn(t){var i,s;let e=(t.merchandise.selectedOptions||[]).filter(a=>a.value&&a.value.toLowerCase()!=="default title"),r=e.length?e.map(a=>a.value).join(" / "):"",n=((i=t.merchandise.image)==null?void 0:i.url)||"",o=parseFloat(((s=t.merchandise.price)==null?void 0:s.amount)||0)*(t.quantity||1);return`
    <div class="line">
      <img src="${D(n)}" alt="" loading="lazy" />
      <div class="title">
        ${D(t.merchandise.product.title)}
        ${r?`<span class="opts">${D(r)}</span>`:""}
      </div>
      <div class="qty">
        <button data-act="qty-down" data-line-id="${D(t.id)}">\u2212</button>
        <span class="v">${t.quantity}</span>
        <button data-act="qty-up" data-line-id="${D(t.id)}">+</button>
      </div>
      <span class="price">${fe(o)}</span>
      <button class="remove" data-act="remove-line" data-line-id="${D(t.id)}" aria-label="Remove">\xD7</button>
    </div>
  `}function fe(t){return`$${t.toFixed(2)}`}function D(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function Sr(){l("[buy-button]").on("click.buyFlow",function(t){var r;t.preventDefault();let e=k();if(!((r=e==null?void 0:e.lines)!=null&&r.length)){console.warn("[BuyFlow] Cart is empty");return}Er()})}function Ir(t,e){if(!e.main)return;let r=e.main.id.split("/").pop(),n=l(`[sf-product="${r}"]`).first();if(!n.length){console.warn(`[VariantSwatch] Main product container [sf-product="${r}"] not found`);return}let o=new Map;for(let s of e.main.variants){let a=s.selectedOptions.find(c=>/colou?rs?/i.test(c.name));a&&o.set(a.value,s.id.split("/").pop())}let i=0;n.find("[sf-option-value]").each(function(){let s=l(this),a=s.attr("sf-option-value"),c=o.get(a);c&&(s.attr("data-variant-id",c),i++)}),console.log(`[VariantSwatch] Tagged ${i}/${e.main.variants.length} variant swatches`),n.on("click.variantSwatch","[data-variant-id]",function(s){s.preventDefault(),s.stopPropagation();let a=l(this).attr("data-variant-id");a&&Q(a)})}function Ar(t,e){if(!e.main)return;let r=e.main.handle,n=t.defaultVariantId;ct(o=>{let i=`gid://shopify/ProductVariant/${o}`;O(r,i)}),bt(o=>{let i=k(),s=i==null?void 0:i.lines.find(a=>{var c;return a.merchandise.product.handle===r&&((c=a.attributesByKey)==null?void 0:c._config_id)===o});if(s){let a=s.merchandise.id.split("/").pop();Q(a)}else if(n){let a=`gid://shopify/ProductVariant/${n}`;O(r,a),Q(n)}})}function rt({cards:t,match:e,className:r="sf-active",alsoOnChildren:n=!1}){let o=new Set;x(i=>{let s=l(t),a=new Set;s.each(function(){e(this,i)&&a.add(this)});for(let c of o){if(a.has(c))continue;let d=l(c);d.removeClass(r),n&&d.find("*").removeClass(r)}for(let c of a){if(o.has(c))continue;let d=l(c);d.addClass(r),n&&d.find("*").addClass(r)}o=a})}function pe({row:t,show:e,fields:r={}}){x(n=>{let o=l(t);if(o.length){if(e&&!e(n)){o.css({display:"none",opacity:0});return}for(let[i,s]of Object.entries(r)){let a=s(n),c=o.find(`[data-inc-item="${i}"]`);c.length&&(typeof a=="string"&&/^(#|rgb)/.test(a)?c.css("background-color",a):a==null||a===""?c.text(""):c.text(a))}e&&o.css({display:"flex",opacity:1})}})}function me({target:t,src:e,type:r="bg"}){let n=null;x(o=>{let i=e(o);if(!i||i===n)return;n=i;let s=l(t);s.length&&(r==="bg"?s.css("background-image",`url(${i})`):s.attr("src",i))})}function _r({target:t,text:e}){let r=null;x(n=>{let o=e(n);o==null||o===r||(r=o,l(t).text(o))})}function nt({cards:t,match:e}){rt({cards:t,match:e,className:"sf-active",alsoOnChildren:!0}),rt({cards:t,match:e,className:"sf-product-added"})}function Rr(t){if(t.product&&(nt({cards:"[data-variant-id]",match:(e,r)=>{var n;return e.getAttribute("data-variant-id")===((n=r.variant)==null?void 0:n.id)}}),pe({row:'[data-inc-item="finish"]',fields:{label:e=>{var r;return(r=e.variant)==null?void 0:r.color},color:e=>{var r;return(r=e.variant)==null?void 0:r.colorHex}}}),me({target:'[data-img-local="us"]',src:e=>{var r;return(r=e.variant)==null?void 0:r.usImage}}),me({target:'[data-img-local="eu"]',src:e=>{var r;return(r=e.variant)==null?void 0:r.euImage}}),_r({target:'[data-delivery-date="us"]',text:e=>{var r;return(r=e.variant)==null?void 0:r.delivery}})),t.wrap&&(nt({cards:"[data-wrap-variant-id]",match:(e,r)=>{var n;return e.getAttribute("data-wrap-variant-id")===((n=r.wrap)==null?void 0:n.variantId)}}),nt({cards:'[sf-option-value="none"]',match:(e,r)=>!r.wrap}),pe({row:'[data-inc-item="wrap"]',show:e=>!!e.wrap,fields:{"wrap-label":e=>{var r;return(r=e.wrap)==null?void 0:r.color},"wrap-color":e=>{var r;return(r=e.wrap)==null?void 0:r.hex}}})),t.bundles&&nt({cards:"[data-preset-value]",match:(e,r)=>r.activeBundle&&e.getAttribute("data-preset-value")===r.activeBundle}),t.accessoriesCollection){let e=(r,n)=>n.accessories.some(o=>o.handle===r);nt({cards:"[data-accessory-handle]",match:(r,n)=>e(r.getAttribute("data-accessory-handle"),n)}),rt({cards:"[data-accessory-handle] .sub-product_info-wrapper",match:(r,n)=>{let o=r.closest("[data-accessory-handle]");return e(o==null?void 0:o.getAttribute("data-accessory-handle"),n)},className:"sf-sub-product-added"}),rt({cards:"[data-accessory-handle] [sf-option-value]",match:(r,n)=>{let o=r.getAttribute("data-accessory-option-id");return o&&n.accessories.some(i=>i.variantId===o)},className:"sf-active",alsoOnChildren:!0})}}var $t='[fs-list-field="type"]',he="is-list-active",Dn="All";function Or(t){var o;if(!((o=t==null?void 0:t.accessories)!=null&&o.length))return;let e=0;for(let i of t.accessories){let s=(i.collections||[]).map(c=>c.title),a=l(`[data-accessory-handle="${i.handle}"]`);a.length&&(a.attr("data-collections",s.join("|")),e++)}console.log(`[Filters] Tagged ${e}/${t.accessories.length} cards with collections`),l(document).on("change.filters",$t,function(){this.checked&&(l($t).parent().removeClass(he),l(this).parent().addClass(he),Tr(l(this).attr("fs-list-value")))});let r=l($t).filter(":checked").first(),n=r.length?r:l($t).first();n.length&&(n.prop("checked",!0),n.parent().addClass(he),Tr(n.attr("fs-list-value")))}function Tr(t){let e=!t||t===Dn;l("[data-accessory-handle]").each(function(){let r=l(this);if(e){r.show();return}(r.attr("data-collections")||"").split("|").includes(t)?r.show():r.hide()})}var Nn=`
  [data-config-qty] { display: flex; align-items: center; gap: 10px;
    margin: 8px 0; font-size: 13px; }
  [data-config-qty] .stepper { display: inline-flex; align-items: center;
    border: 1px solid #ddd; border-radius: 3px; }
  [data-config-qty] .stepper button { background: none; border: none;
    width: 28px; height: 28px; cursor: pointer; font-size: 14px;
    padding: 0; line-height: 1; }
  [data-config-qty] .stepper button:disabled { color: #ccc; cursor: not-allowed; }
  [data-config-qty] .stepper [data-config-qty-input] { min-width: 26px;
    text-align: center; }
`,ge=!1,ot=null;function kr(){document.getElementById("config-qty-style")||l('<style id="config-qty-style">').text(Nn).appendTo("head");let t=l("[data-config-qty]");if(!t.length){let e=l("[buy-button]");if(!e.length){console.warn("[ConfigQuantity] No [buy-button] anchor \u2014 stepper not injected");return}t=l(`
      <div data-config-qty>
        <span>Quantity:</span>
        <div class="stepper">
          <button data-config-qty-down aria-label="Decrease">\u2212</button>
          <span data-config-qty-input>1</span>
          <button data-config-qty-up aria-label="Increase">+</button>
        </div>
      </div>
    `),e.before(t)}ot=t,ot.on("click","[data-config-qty-up], [data-config-qty-down]",async function(){ge||await Pn(l(this).is("[data-config-qty-up]")?1:-1)}),x(Lr),Lr(A())}async function Pn(t){ge=!0;try{let e=A();if(!(e!=null&&e.cart))return;let r=e.cart.lines.filter(i=>{var s;return((s=i.attributesByKey)==null?void 0:s._config_id)===e.sessionId});if(r.length===0)return;let n=r[0].quantity||1,o=Math.max(1,n+t);if(o===n)return;await Promise.all(r.map(i=>W({lineId:i.id,quantity:o})))}catch(e){console.error("[ConfigQuantity] Error:",e)}finally{ge=!1}}function Lr(t){var n;if(!ot||!(t!=null&&t.cart))return;let r=((n=t.cart.lines.filter(o=>{var i;return((i=o.attributesByKey)==null?void 0:i._config_id)===t.sessionId})[0])==null?void 0:n.quantity)||1;ot.find("[data-config-qty-input]").text(r),ot.find("[data-config-qty-down]").prop("disabled",r<=1)}var Bn=`
  #cart-debug-panel { position: fixed; bottom: 16px; right: 16px;
    width: 340px; max-height: 70vh; overflow: auto;
    background: rgba(15,15,20,0.96); color: #b8ffb8;
    font: 11px/1.4 ui-monospace, 'SF Mono', Menlo, monospace;
    border: 1px solid #2a4a2a; border-radius: 6px;
    z-index: 2147483647; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
  #cart-debug-panel .hdr { display: flex; align-items: center; justify-content: space-between;
    padding: 8px 10px; background: #1a2a1a; border-bottom: 1px solid #2a4a2a;
    cursor: move; user-select: none; }
  #cart-debug-panel .hdr strong { color: #fff; font-size: 12px; }
  #cart-debug-panel .hdr .ctl { color: #888; cursor: pointer; padding: 0 6px; }
  #cart-debug-panel .hdr .ctl:hover { color: #fff; }
  #cart-debug-panel .body { padding: 10px; }
  #cart-debug-panel .row { margin: 4px 0; }
  #cart-debug-panel .line { margin: 6px 0; padding: 6px; background: rgba(184,255,184,0.06);
    border-left: 2px solid #4a8a4a; }
  #cart-debug-panel .line .ttl { color: #fff; font-weight: 600; }
  #cart-debug-panel .line .sub { color: #888; font-size: 10px; }
  #cart-debug-panel .line .attr { color: #7aa; font-size: 10px; }
  #cart-debug-panel .attrs { margin: 8px 0; padding: 6px;
    background: rgba(122,170,170,0.08); border-left: 2px solid #4a7a7a; }
  #cart-debug-panel .empty { color: #666; font-style: italic; }
  #cart-debug-panel .btns { margin-top: 10px; display: flex; gap: 6px; }
  #cart-debug-panel button { flex: 1; padding: 6px 8px; background: #2a2a2a; color: #fff;
    border: 1px solid #444; border-radius: 3px; cursor: pointer; font: inherit; }
  #cart-debug-panel button:hover { background: #3a3a3a; }
  #cart-debug-panel button.danger { background: #4a1a1a; border-color: #6a2a2a; }
  #cart-debug-panel button.danger:hover { background: #6a2a2a; }
  #cart-debug-panel a { color: #6cf; text-decoration: none; }
  #cart-debug-panel a:hover { text-decoration: underline; }
  #cart-debug-panel .sel { margin-top: 8px; padding: 6px;
    background: rgba(184,184,255,0.05); border-left: 2px solid #4a4a8a; color: #aab; }
  #cart-debug-panel.collapsed .body { display: none; }
`;function Dr({configId:t}){if(document.getElementById("cart-debug-panel"))return;l("<style>").text(Bn).appendTo("head");let e=l(`
    <div id="cart-debug-panel">
      <div class="hdr">
        <strong>Cart Debug</strong>
        <span>
          <span class="ctl" data-act="toggle">[\u2212]</span>
          <span class="ctl" data-act="close" title="Hide for this session">[\xD7]</span>
        </span>
      </div>
      <div class="body"></div>
    </div>
  `);l("body").append(e);let r=e.find(".body");function n(s){return s?`$${parseFloat(s.amount).toFixed(2)}`:"?"}function o(){let s=k(),a=yt();if(!s){r.html('<div class="empty">No cart yet</div>');return}let c=Object.entries(s.attributesByKey||{}).filter(([,u])=>u),d=c.length?`<div class="attrs"><div><strong>Cart Attributes</strong></div>${c.map(([u,p])=>`<div>${u}: <span style="color:#fff">${p}</span></div>`).join("")}</div>`:"",f=s.lines.length?s.lines.map(u=>{var y;let p=(y=u.merchandise.selectedOptions)!=null&&y.length?u.merchandise.selectedOptions.map(g=>`${g.name}=${g.value}`).join(", "):u.merchandise.title,h=Object.entries(u.attributesByKey||{}).filter(([g,v])=>v&&g!=="_config_id").map(([g,v])=>`<div class="attr">${g}: ${v}</div>`).join(""),w=u.id.startsWith("tmp_");return`
              <div class="line">
                <div class="ttl">${u.merchandise.product.title} \xD7 ${u.quantity}</div>
                <div class="sub">${p} \u2014 ${n(u.merchandise.price)}</div>
                <div class="sub" style="opacity:0.5">id: ${u.id.slice(-14)}${w?" (optimistic)":""}</div>
                ${h}
              </div>`}).join(""):'<div class="empty">(no lines)</div>';r.html(`
      <div class="row"><strong style="color:#fff">Cart:</strong> ${s.id.slice(-18)}</div>
      <div class="row"><strong style="color:#fff">Total:</strong> ${n(s.cost.totalAmount)} (${s.totalQuantity} items)</div>
      ${d}
      <div class="row" style="margin-top:8px;color:#fff"><strong>Lines (${s.lines.length})</strong></div>
      ${f}
      <div class="sel" id="cart-debug-sel"><em>Loading selection...</em></div>
      ${a?`<div class="row" style="margin-top:8px"><a href="${a}" target="_blank">Open checkout \u2192</a></div>`:""}
      <div class="btns">
        <button data-act="copy">Copy JSON</button>
        <button data-act="reset" class="danger">Reset cart</button>
      </div>
    `),i()}function i(){let s=l("#cart-debug-sel");s.length&&x(a=>{let c=[];a.variant&&c.push(`variant: ${a.variant.color} (${a.variant.id.slice(-6)})`),a.wrap&&c.push(`wrap: ${a.wrap.color}`),a.activeBundle&&c.push(`bundle: ${a.activeBundle}`),c.push(`accessories: ${a.accessories.length}`),c.push(`region: ${a.region||"(none)"}`),s.html(c.map(d=>`<div>${d}</div>`).join(""))})}e.on("click",".ctl",function(){let s=l(this).attr("data-act");s==="toggle"?(e.toggleClass("collapsed"),l(this).text(e.hasClass("collapsed")?"[+]":"[\u2212]")):s==="close"&&e.remove()}),e.on("click","button",function(){let s=l(this).attr("data-act");if(s==="reset"){if(!confirm("Reset cart? This clears localStorage and reloads."))return;t&&localStorage.removeItem(`olto_cart_${t}`),t&&localStorage.removeItem(`${t}_active_bundle`),Object.keys(localStorage).filter(a=>a.startsWith("olto_cart_")||a.endsWith("_active_bundle")).forEach(a=>localStorage.removeItem(a)),window.location.reload()}else s==="copy"&&(navigator.clipboard.writeText(JSON.stringify(k(),null,2)),l(this).text("Copied!"),setTimeout(()=>l(this).text("Copy JSON"),1200))}),V(o),o()}var ye=new Map;async function Nr(t){var s;let e=(s=t.bundles)==null?void 0:s.metaobjectType;if(!e)return[];if(ye.has(e))return ye.get(e);let r=`
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
  `,{data:n,errors:o}=await N.request(r,{variables:{type:e}});if(o)return console.warn(`[Bundles] GraphQL errors fetching "${e}":`,o),[];let i=n.metaobjects.edges.map(({node:a})=>qn(a));return ye.set(e,i),i}function qn(t){var r,n;let e={id:t.id,handle:t.handle};for(let o of t.fields)(n=(r=o.references)==null?void 0:r.edges)!=null&&n.length?e[o.key]=o.references.edges.map(i=>i.node):o.reference?e[o.key]=o.reference:o.value!=null&&(e[o.key]=o.value);return e}function Hn(){l(".checkout_order-includes-items").css({height:"auto"}),l(".checkout_includes-item, .modal_ecl-image").css({opacity:1})}async function Pr(t){console.log(`[Configurator] Booting "${t.id}"`),Hn(),Ie(),Re(),t.accessoriesCollection&&St("accessories"),t.wrap&&St("wraps",{startOpen:!1});let e,r=[];try{[e,r]=await Promise.all([dr(t),t.bundles?Nr(t):Promise.resolve([])])}catch(n){console.error("[Configurator] Failed to fetch products/bundles:",n);return}rr(e);try{await nr(t)}catch(n){console.error("[Configurator] Failed to init cart:",n);return}fr(t,e,r),Rr(t),t.accessoriesCollection&&vr(t,e),t.accessoriesCollection&&mr(t,e),t.accessoriesCollection&&Or(e),t.accessoryDependencies&&hr(t,e),Array.isArray(t.customImageRules)&&gr(t,e),t.bundles&&yr(t,e,r),t.wrap&&br(t,e),$r(t),kr(),Sr(),t.product&&(Ar(t,e),Ir(t,e),Le(t)),console.log(`[Configurator] "${t.id}" boot complete`),Dr({configId:t.id})}var be=document.body.dataset.configurator;if(!be)console.error('[Configurator] No data-configurator attribute on <body>. Add e.g. <body data-configurator="olto">');else{let t=Et[be];t?Pr(t):console.error(`[Configurator] Unknown configurator "${be}". Available: ${Object.keys(Et).join(", ")}`)}})();
