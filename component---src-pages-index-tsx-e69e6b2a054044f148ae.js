"use strict";(self.webpackChunkmy_gatsby_site=self.webpackChunkmy_gatsby_site||[]).push([[691],{7200:function(e,t,a){a.r(t),a.d(t,{Head:function(){return c}});var n=a(5785),o=a(7294),l=a(9823),s=a(5948),d=a(7094),m=a(2649),r=a(4396);t.default=()=>{const{0:e,1:t}=(0,o.useState)([]),{getChildrenTodos:a,getTodo:c,addTodo:i,deleteTodo:u,updateTodoPosition:f}=(0,r.i)();(0,o.useEffect)((()=>{(async()=>{if(!c)return;const e=await c("mainIds");var a;e&&t(null!==(a=e.todoIds)&&void 0!==a?a:[])})()}),[]);const y=e=>{u&&(u(e,"mainIds"),t((t=>t.filter((t=>t!==e)))))};return o.createElement("main",{className:"mt-large lg:mt-one px-2xsmall lg:px-0 w-full"},o.createElement("div",{className:"mx-auto max-w-four"},o.createElement(l.hI,{title:"<h3>To do's</h3>",parentId:"mainIds",onSort:e=>{f&&(t(e),f(e,"mainIds"))}}),o.createElement(s.Z5,{onDragEnd:a=>{const n=(0,m.Z)(e,a);n&&f&&(t(n),f(n,"mainIds"))}},o.createElement(l.JF,{todoContainerId:"index"},e.map(((e,t)=>o.createElement(l.zk,{key:e,todoId:e,index:t,onDelete:y}))))),o.createElement("button",{title:"Add Todo",className:"max-w-four mt-2xsmall add-btn-style flex items-center justify-center w-full h-small cursor-pointer opacity-80 hover:opacity-100",onClick:async()=>{if(!i)return;const e=await i("mainIds");t((t=>[].concat((0,n.Z)(t),[e])))}},o.createElement(d.gyF,{className:"w-small h-small"}))))};const c=()=>o.createElement("title",null,"Home")}}]);
//# sourceMappingURL=component---src-pages-index-tsx-e69e6b2a054044f148ae.js.map