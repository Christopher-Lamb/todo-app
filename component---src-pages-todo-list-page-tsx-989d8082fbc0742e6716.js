"use strict";(self.webpackChunkmy_gatsby_site=self.webpackChunkmy_gatsby_site||[]).push([[347],{6377:function(e,t,a){a.r(t),a.d(t,{Head:function(){return d}});var n=a(5785),o=a(7294),l=a(1958),r=a(5948),s=a(7094),c=a(2649),m=a(4396),i=a(1376);t.default=()=>{const e="undefined"!=typeof location&&location.pathname.split("/").filter((e=>e)).pop()||"",{0:t,1:a}=(0,o.useState)([]),{0:d,1:u}=(0,o.useState)(""),{0:p,1:f}=(0,o.useState)(!1),{getTodo:E,addTodo:h,deleteTodo:y,updateTodoPosition:x}=(0,m.i)();(0,o.useEffect)((()=>{(async()=>{if(!E)return;const t=await E(e);var n;t?(u(t.content),a(null!==(n=t.todoIds)&&void 0!==n?n:[])):f(!0)})()}),[]);const g=t=>{y&&(y(t,e),a((e=>e.filter((e=>e!==t)))))};return o.createElement(o.Fragment,null,p?o.createElement("main",{className:"mt-one min-h-two flex justify-center"},o.createElement("div",{className:"border border-4 pt-med border-red-600 p-small bg-red-50 shadow"},o.createElement("a",{href:"/"},o.createElement(i.wFh,{size:"2rem",className:"cursor-pointer"})),o.createElement("h1",{className:"text-one"},"Oh no..."),o.createElement("p",{className:"text-med"},'It appears that the "To Do" you\'re looking for does not exist.'))):o.createElement("main",{className:"mt-large lg:mt-one px-2xsmall lg:px-0 w-full"},o.createElement("div",{className:"mx-auto max-w-four"},o.createElement(l.hI,{title:d,parentId:e,onSort:t=>{x&&(a(t),x(t,e))},back:!0}),o.createElement(r.Z5,{onDragEnd:n=>{const o=(0,c.Z)(t,n);o&&x&&(x(o,e),a(o))}},o.createElement(l.JF,{todoContainerId:"index"},t&&t.map(((t,a)=>o.createElement(l.PK,{key:t,parentId:e,todoItemId:t,index:a,onDelete:g}))))),o.createElement("div",{className:"max-w-four mt-2xsmall add-btn-style flex items-center justify-center h-small cursor-pointer opacity-80 hover:opacity-100",onClick:async()=>{if(!h)return;const t=await h(e);a((e=>[].concat((0,n.Z)(e),[t])))}},o.createElement(s.gyF,{className:"w-small h-small"})))))};const d=()=>o.createElement("title",null,"Todo List")}}]);
//# sourceMappingURL=component---src-pages-todo-list-page-tsx-989d8082fbc0742e6716.js.map