"use strict";(self.webpackChunkmy_gatsby_site=self.webpackChunkmy_gatsby_site||[]).push([[347],{9662:function(t,n,e){var r=e(614),o=e(6330),i=TypeError;t.exports=function(t){if(r(t))return t;throw i(o(t)+" is not a function")}},9670:function(t,n,e){var r=e(111),o=String,i=TypeError;t.exports=function(t){if(r(t))return t;throw i(o(t)+" is not an object")}},1318:function(t,n,e){var r=e(5656),o=e(1400),i=e(6244),u=function(t){return function(n,e,u){var c,a=r(n),f=i(a),s=o(u,f);if(t&&e!=e){for(;f>s;)if((c=a[s++])!=c)return!0}else for(;f>s;s++)if((t||s in a)&&a[s]===e)return t||s||0;return!t&&-1}};t.exports={includes:u(!0),indexOf:u(!1)}},4326:function(t,n,e){var r=e(1702),o=r({}.toString),i=r("".slice);t.exports=function(t){return i(o(t),8,-1)}},648:function(t,n,e){var r=e(1694),o=e(614),i=e(4326),u=e(5112)("toStringTag"),c=Object,a="Arguments"===i(function(){return arguments}());t.exports=r?i:function(t){var n,e,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=function(t,n){try{return t[n]}catch(e){}}(n=c(t),u))?e:a?i(n):"Object"===(r=i(n))&&o(n.callee)?"Arguments":r}},9920:function(t,n,e){var r=e(2597),o=e(3887),i=e(1236),u=e(3070);t.exports=function(t,n,e){for(var c=o(n),a=u.f,f=i.f,s=0;s<c.length;s++){var l=c[s];r(t,l)||e&&r(e,l)||a(t,l,f(n,l))}}},8880:function(t,n,e){var r=e(9781),o=e(3070),i=e(9114);t.exports=r?function(t,n,e){return o.f(t,n,i(1,e))}:function(t,n,e){return t[n]=e,t}},9114:function(t){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},8052:function(t,n,e){var r=e(614),o=e(3070),i=e(6339),u=e(3072);t.exports=function(t,n,e,c){c||(c={});var a=c.enumerable,f=void 0!==c.name?c.name:n;if(r(e)&&i(e,f,c),c.global)a?t[n]=e:u(n,e);else{try{c.unsafe?t[n]&&(a=!0):delete t[n]}catch(s){}a?t[n]=e:o.f(t,n,{value:e,enumerable:!1,configurable:!c.nonConfigurable,writable:!c.nonWritable})}return t}},3072:function(t,n,e){var r=e(7854),o=Object.defineProperty;t.exports=function(t,n){try{o(r,t,{value:n,configurable:!0,writable:!0})}catch(e){r[t]=n}return n}},9781:function(t,n,e){var r=e(7293);t.exports=!r((function(){return 7!==Object.defineProperty({},1,{get:function(){return 7}})[1]}))},4154:function(t){var n="object"==typeof document&&document.all,e=void 0===n&&void 0!==n;t.exports={all:n,IS_HTMLDDA:e}},317:function(t,n,e){var r=e(7854),o=e(111),i=r.document,u=o(i)&&o(i.createElement);t.exports=function(t){return u?i.createElement(t):{}}},8113:function(t){t.exports="undefined"!=typeof navigator&&String(navigator.userAgent)||""},7392:function(t,n,e){var r,o,i=e(7854),u=e(8113),c=i.process,a=i.Deno,f=c&&c.versions||a&&a.version,s=f&&f.v8;s&&(o=(r=s.split("."))[0]>0&&r[0]<4?1:+(r[0]+r[1])),!o&&u&&(!(r=u.match(/Edge\/(\d+)/))||r[1]>=74)&&(r=u.match(/Chrome\/(\d+)/))&&(o=+r[1]),t.exports=o},748:function(t){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},2109:function(t,n,e){var r=e(7854),o=e(1236).f,i=e(8880),u=e(8052),c=e(3072),a=e(9920),f=e(4705);t.exports=function(t,n){var e,s,l,p,v,m=t.target,g=t.global,y=t.stat;if(e=g?r:y?r[m]||c(m,{}):(r[m]||{}).prototype)for(s in n){if(p=n[s],l=t.dontCallGetSet?(v=o(e,s))&&v.value:e[s],!f(g?s:m+(y?".":"#")+s,t.forced)&&void 0!==l){if(typeof p==typeof l)continue;a(p,l)}(t.sham||l&&l.sham)&&i(p,"sham",!0),u(e,s,p,t)}}},7293:function(t){t.exports=function(t){try{return!!t()}catch(n){return!0}}},4374:function(t,n,e){var r=e(7293);t.exports=!r((function(){var t=function(){}.bind();return"function"!=typeof t||t.hasOwnProperty("prototype")}))},6916:function(t,n,e){var r=e(4374),o=Function.prototype.call;t.exports=r?o.bind(o):function(){return o.apply(o,arguments)}},6530:function(t,n,e){var r=e(9781),o=e(2597),i=Function.prototype,u=r&&Object.getOwnPropertyDescriptor,c=o(i,"name"),a=c&&"something"===function(){}.name,f=c&&(!r||r&&u(i,"name").configurable);t.exports={EXISTS:c,PROPER:a,CONFIGURABLE:f}},1702:function(t,n,e){var r=e(4374),o=Function.prototype,i=o.call,u=r&&o.bind.bind(i,i);t.exports=r?u:function(t){return function(){return i.apply(t,arguments)}}},5005:function(t,n,e){var r=e(7854),o=e(614);t.exports=function(t,n){return arguments.length<2?(e=r[t],o(e)?e:void 0):r[t]&&r[t][n];var e}},8173:function(t,n,e){var r=e(9662),o=e(8554);t.exports=function(t,n){var e=t[n];return o(e)?void 0:r(e)}},647:function(t,n,e){var r=e(1702),o=e(7908),i=Math.floor,u=r("".charAt),c=r("".replace),a=r("".slice),f=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,s=/\$([$&'`]|\d{1,2})/g;t.exports=function(t,n,e,r,l,p){var v=e+t.length,m=r.length,g=s;return void 0!==l&&(l=o(l),g=f),c(p,g,(function(o,c){var f;switch(u(c,0)){case"$":return"$";case"&":return t;case"`":return a(n,0,e);case"'":return a(n,v);case"<":f=l[a(c,1,-1)];break;default:var s=+c;if(0===s)return o;if(s>m){var p=i(s/10);return 0===p?o:p<=m?void 0===r[p-1]?u(c,1):r[p-1]+u(c,1):o}f=r[s-1]}return void 0===f?"":f}))}},7854:function(t,n,e){var r=function(t){return t&&t.Math===Math&&t};t.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof e.g&&e.g)||function(){return this}()||this||Function("return this")()},2597:function(t,n,e){var r=e(1702),o=e(7908),i=r({}.hasOwnProperty);t.exports=Object.hasOwn||function(t,n){return i(o(t),n)}},3501:function(t){t.exports={}},4664:function(t,n,e){var r=e(9781),o=e(7293),i=e(317);t.exports=!r&&!o((function(){return 7!==Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},8361:function(t,n,e){var r=e(1702),o=e(7293),i=e(4326),u=Object,c=r("".split);t.exports=o((function(){return!u("z").propertyIsEnumerable(0)}))?function(t){return"String"===i(t)?c(t,""):u(t)}:u},2788:function(t,n,e){var r=e(1702),o=e(614),i=e(5465),u=r(Function.toString);o(i.inspectSource)||(i.inspectSource=function(t){return u(t)}),t.exports=i.inspectSource},9909:function(t,n,e){var r,o,i,u=e(4811),c=e(7854),a=e(111),f=e(8880),s=e(2597),l=e(5465),p=e(6200),v=e(3501),m="Object already initialized",g=c.TypeError,y=c.WeakMap;if(u||l.state){var d=l.state||(l.state=new y);d.get=d.get,d.has=d.has,d.set=d.set,r=function(t,n){if(d.has(t))throw g(m);return n.facade=t,d.set(t,n),n},o=function(t){return d.get(t)||{}},i=function(t){return d.has(t)}}else{var b=p("state");v[b]=!0,r=function(t,n){if(s(t,b))throw g(m);return n.facade=t,f(t,b,n),n},o=function(t){return s(t,b)?t[b]:{}},i=function(t){return s(t,b)}}t.exports={set:r,get:o,has:i,enforce:function(t){return i(t)?o(t):r(t,{})},getterFor:function(t){return function(n){var e;if(!a(n)||(e=o(n)).type!==t)throw g("Incompatible receiver, "+t+" required");return e}}}},614:function(t,n,e){var r=e(4154),o=r.all;t.exports=r.IS_HTMLDDA?function(t){return"function"==typeof t||t===o}:function(t){return"function"==typeof t}},4705:function(t,n,e){var r=e(7293),o=e(614),i=/#|\.prototype\./,u=function(t,n){var e=a[c(t)];return e===s||e!==f&&(o(n)?r(n):!!n)},c=u.normalize=function(t){return String(t).replace(i,".").toLowerCase()},a=u.data={},f=u.NATIVE="N",s=u.POLYFILL="P";t.exports=u},8554:function(t){t.exports=function(t){return null==t}},111:function(t,n,e){var r=e(614),o=e(4154),i=o.all;t.exports=o.IS_HTMLDDA?function(t){return"object"==typeof t?null!==t:r(t)||t===i}:function(t){return"object"==typeof t?null!==t:r(t)}},1913:function(t){t.exports=!1},7850:function(t,n,e){var r=e(111),o=e(4326),i=e(5112)("match");t.exports=function(t){var n;return r(t)&&(void 0!==(n=t[i])?!!n:"RegExp"===o(t))}},2190:function(t,n,e){var r=e(5005),o=e(614),i=e(7976),u=e(3307),c=Object;t.exports=u?function(t){return"symbol"==typeof t}:function(t){var n=r("Symbol");return o(n)&&i(n.prototype,c(t))}},6244:function(t,n,e){var r=e(7466);t.exports=function(t){return r(t.length)}},6339:function(t,n,e){var r=e(1702),o=e(7293),i=e(614),u=e(2597),c=e(9781),a=e(6530).CONFIGURABLE,f=e(2788),s=e(9909),l=s.enforce,p=s.get,v=String,m=Object.defineProperty,g=r("".slice),y=r("".replace),d=r([].join),b=c&&!o((function(){return 8!==m((function(){}),"length",{value:8}).length})),h=String(String).split("String"),x=t.exports=function(t,n,e){"Symbol("===g(v(n),0,7)&&(n="["+y(v(n),/^Symbol\(([^)]*)\)/,"$1")+"]"),e&&e.getter&&(n="get "+n),e&&e.setter&&(n="set "+n),(!u(t,"name")||a&&t.name!==n)&&(c?m(t,"name",{value:n,configurable:!0}):t.name=n),b&&e&&u(e,"arity")&&t.length!==e.arity&&m(t,"length",{value:e.arity});try{e&&u(e,"constructor")&&e.constructor?c&&m(t,"prototype",{writable:!1}):t.prototype&&(t.prototype=void 0)}catch(o){}var r=l(t);return u(r,"source")||(r.source=d(h,"string"==typeof n?n:"")),t};Function.prototype.toString=x((function(){return i(this)&&p(this).source||f(this)}),"toString")},4758:function(t){var n=Math.ceil,e=Math.floor;t.exports=Math.trunc||function(t){var r=+t;return(r>0?e:n)(r)}},3070:function(t,n,e){var r=e(9781),o=e(4664),i=e(3353),u=e(9670),c=e(4948),a=TypeError,f=Object.defineProperty,s=Object.getOwnPropertyDescriptor,l="enumerable",p="configurable",v="writable";n.f=r?i?function(t,n,e){if(u(t),n=c(n),u(e),"function"==typeof t&&"prototype"===n&&"value"in e&&v in e&&!e[v]){var r=s(t,n);r&&r[v]&&(t[n]=e.value,e={configurable:p in e?e[p]:r[p],enumerable:l in e?e[l]:r[l],writable:!1})}return f(t,n,e)}:f:function(t,n,e){if(u(t),n=c(n),u(e),o)try{return f(t,n,e)}catch(r){}if("get"in e||"set"in e)throw a("Accessors not supported");return"value"in e&&(t[n]=e.value),t}},1236:function(t,n,e){var r=e(9781),o=e(6916),i=e(5296),u=e(9114),c=e(5656),a=e(4948),f=e(2597),s=e(4664),l=Object.getOwnPropertyDescriptor;n.f=r?l:function(t,n){if(t=c(t),n=a(n),s)try{return l(t,n)}catch(e){}if(f(t,n))return u(!o(i.f,t,n),t[n])}},8006:function(t,n,e){var r=e(6324),o=e(748).concat("length","prototype");n.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},5181:function(t,n){n.f=Object.getOwnPropertySymbols},7976:function(t,n,e){var r=e(1702);t.exports=r({}.isPrototypeOf)},6324:function(t,n,e){var r=e(1702),o=e(2597),i=e(5656),u=e(1318).indexOf,c=e(3501),a=r([].push);t.exports=function(t,n){var e,r=i(t),f=0,s=[];for(e in r)!o(c,e)&&o(r,e)&&a(s,e);for(;n.length>f;)o(r,e=n[f++])&&(~u(s,e)||a(s,e));return s}},5296:function(t,n){var e={}.propertyIsEnumerable,r=Object.getOwnPropertyDescriptor,o=r&&!e.call({1:2},1);n.f=o?function(t){var n=r(this,t);return!!n&&n.enumerable}:e},2140:function(t,n,e){var r=e(6916),o=e(614),i=e(111),u=TypeError;t.exports=function(t,n){var e,c;if("string"===n&&o(e=t.toString)&&!i(c=r(e,t)))return c;if(o(e=t.valueOf)&&!i(c=r(e,t)))return c;if("string"!==n&&o(e=t.toString)&&!i(c=r(e,t)))return c;throw u("Can't convert object to primitive value")}},3887:function(t,n,e){var r=e(5005),o=e(1702),i=e(8006),u=e(5181),c=e(9670),a=o([].concat);t.exports=r("Reflect","ownKeys")||function(t){var n=i.f(c(t)),e=u.f;return e?a(n,e(t)):n}},7066:function(t,n,e){var r=e(9670);t.exports=function(){var t=r(this),n="";return t.hasIndices&&(n+="d"),t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.dotAll&&(n+="s"),t.unicode&&(n+="u"),t.unicodeSets&&(n+="v"),t.sticky&&(n+="y"),n}},4706:function(t,n,e){var r=e(6916),o=e(2597),i=e(7976),u=e(7066),c=RegExp.prototype;t.exports=function(t){var n=t.flags;return void 0!==n||"flags"in c||o(t,"flags")||!i(c,t)?n:r(u,t)}},4488:function(t,n,e){var r=e(8554),o=TypeError;t.exports=function(t){if(r(t))throw o("Can't call method on "+t);return t}},6200:function(t,n,e){var r=e(2309),o=e(9711),i=r("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},5465:function(t,n,e){var r=e(7854),o=e(3072),i="__core-js_shared__",u=r[i]||o(i,{});t.exports=u},2309:function(t,n,e){var r=e(1913),o=e(5465);(t.exports=function(t,n){return o[t]||(o[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.32.1",mode:r?"pure":"global",copyright:"© 2014-2023 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.32.1/LICENSE",source:"https://github.com/zloirock/core-js"})},6293:function(t,n,e){var r=e(7392),o=e(7293),i=e(7854).String;t.exports=!!Object.getOwnPropertySymbols&&!o((function(){var t=Symbol("symbol detection");return!i(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&r&&r<41}))},1400:function(t,n,e){var r=e(9303),o=Math.max,i=Math.min;t.exports=function(t,n){var e=r(t);return e<0?o(e+n,0):i(e,n)}},5656:function(t,n,e){var r=e(8361),o=e(4488);t.exports=function(t){return r(o(t))}},9303:function(t,n,e){var r=e(4758);t.exports=function(t){var n=+t;return n!=n||0===n?0:r(n)}},7466:function(t,n,e){var r=e(9303),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},7908:function(t,n,e){var r=e(4488),o=Object;t.exports=function(t){return o(r(t))}},7593:function(t,n,e){var r=e(6916),o=e(111),i=e(2190),u=e(8173),c=e(2140),a=e(5112),f=TypeError,s=a("toPrimitive");t.exports=function(t,n){if(!o(t)||i(t))return t;var e,a=u(t,s);if(a){if(void 0===n&&(n="default"),e=r(a,t,n),!o(e)||i(e))return e;throw f("Can't convert object to primitive value")}return void 0===n&&(n="number"),c(t,n)}},4948:function(t,n,e){var r=e(7593),o=e(2190);t.exports=function(t){var n=r(t,"string");return o(n)?n:n+""}},1694:function(t,n,e){var r={};r[e(5112)("toStringTag")]="z",t.exports="[object z]"===String(r)},1340:function(t,n,e){var r=e(648),o=String;t.exports=function(t){if("Symbol"===r(t))throw TypeError("Cannot convert a Symbol value to a string");return o(t)}},6330:function(t){var n=String;t.exports=function(t){try{return n(t)}catch(e){return"Object"}}},9711:function(t,n,e){var r=e(1702),o=0,i=Math.random(),u=r(1..toString);t.exports=function(t){return"Symbol("+(void 0===t?"":t)+")_"+u(++o+i,36)}},3307:function(t,n,e){var r=e(6293);t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},3353:function(t,n,e){var r=e(9781),o=e(7293);t.exports=r&&o((function(){return 42!==Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}))},4811:function(t,n,e){var r=e(7854),o=e(614),i=r.WeakMap;t.exports=o(i)&&/native code/.test(String(i))},5112:function(t,n,e){var r=e(7854),o=e(2309),i=e(2597),u=e(9711),c=e(6293),a=e(3307),f=r.Symbol,s=o("wks"),l=a?f.for||f:f&&f.withoutSetter||u;t.exports=function(t){return i(s,t)||(s[t]=c&&i(f,t)?f[t]:l("Symbol."+t)),s[t]}},8757:function(t,n,e){var r=e(2109),o=e(6916),i=e(1702),u=e(4488),c=e(614),a=e(8554),f=e(7850),s=e(1340),l=e(8173),p=e(4706),v=e(647),m=e(5112),g=e(1913),y=m("replace"),d=TypeError,b=i("".indexOf),h=i("".replace),x=i("".slice),S=Math.max,w=function(t,n,e){return e>t.length?-1:""===n?e:b(t,n,e)};r({target:"String",proto:!0},{replaceAll:function(t,n){var e,r,i,m,O,E,j,P,T,I=u(this),k=0,C=0,M="";if(!a(t)){if((e=f(t))&&(r=s(u(p(t))),!~b(r,"g")))throw d("`.replaceAll` does not allow non-global regexes");if(i=l(t,y))return o(i,t,I,n);if(g&&e)return h(s(I),t,n)}for(m=s(I),O=s(t),(E=c(n))||(n=s(n)),j=O.length,P=S(1,j),k=w(m,O,0);-1!==k;)T=E?s(n(O,k,m)):v(O,m,k,[],void 0,n),M+=x(m,C,k)+T,C=k+j,k=w(m,O,k+P);return C<m.length&&(M+=x(m,C)),M}})},7207:function(t,n,e){e(8757)},6377:function(t,n,e){e.r(n),e.d(n,{Head:function(){return l}});e(7207);var r=e(5785),o=e(7294),i=e(9823),u=e(5948),c=e(7094),a=e(2649),f=e(4396),s=e(1376);n.default=()=>{const t=location.pathname.replaceAll("/","")||"",{0:n,1:e}=(0,o.useState)([]),{0:l,1:p}=(0,o.useState)(""),{0:v,1:m}=(0,o.useState)(!1),{getTodo:g,addTodo:y,deleteTodo:d,updateTodoPosition:b}=(0,f.i)();(0,o.useEffect)((()=>{(async()=>{if(!g)return;const n=await g(t);var r;n?(p(n.content),e(null!==(r=n.todoIds)&&void 0!==r?r:[])):m(!0)})()}),[]);const h=n=>{d&&(d(n,t),e((t=>t.filter((t=>t!==n)))))};return o.createElement(o.Fragment,null,v?o.createElement("main",{className:"mt-one min-h-two flex justify-center"},o.createElement("div",{className:"border border-4 pt-med border-red-600 p-small bg-red-50 shadow"},o.createElement("a",{href:"/"},o.createElement(s.wFh,{size:"2rem",className:"cursor-pointer"})),o.createElement("h1",{className:"text-one"},"Oh no..."),o.createElement("p",{className:"text-med"},'It appears that the "To Do" you\'re looking for does not exist.'))):o.createElement("main",{className:"mt-large lg:mt-one px-2xsmall lg:px-0 w-full"},o.createElement("div",{className:"mx-auto max-w-four"},o.createElement(i.hI,{title:l,parentId:t,onSort:n=>{b&&(e(n),b(n,t))},back:!0}),o.createElement(u.Z5,{onDragEnd:r=>{const o=(0,a.Z)(n,r);o&&b&&(b(o,t),e(o))}},o.createElement(i.JF,{todoContainerId:"index"},n&&n.map(((n,e)=>o.createElement(i.PK,{key:n,parentId:t,todoItemId:n,index:e,onDelete:h}))))),o.createElement("div",{className:"max-w-four mt-2xsmall add-btn-style flex items-center justify-center h-small cursor-pointer opacity-80 hover:opacity-100",onClick:async()=>{if(!y)return;const n=await y(t);e((t=>[].concat((0,r.Z)(t),[n])))}},o.createElement(c.gyF,{className:"w-small h-small"})))))};const l=()=>o.createElement("title",null,"Todo List")}}]);
//# sourceMappingURL=component---src-pages-todo-list-page-tsx-7d6ab626f2b3f2de911e.js.map