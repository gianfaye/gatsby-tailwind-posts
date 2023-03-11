"use strict";(self.webpackChunkgatsby_tailwind_posts=self.webpackChunkgatsby_tailwind_posts||[]).push([[691],{5233:function(e,t,a){a.r(t),a.d(t,{Head:function(){return i},default:function(){return o}});var l=a(5785),r=a(7294);var s=e=>{let{searchKeyword:t,setSearchKeyword:a,filteredAuthors:l,selectedAuthor:s,setSelectedAuthor:n}=e;const c=Object.keys(s).length>0,m=l.length>0;return r.createElement("div",{className:"mx-auto max-w-2xl lg:mx-0 flex items-center space-x-4 mt-2"},r.createElement("div",{className:"relative"},r.createElement("label",{htmlFor:"filtering"},"Author:"),r.createElement("input",{id:"filtering",type:"text",placeholder:"Filter by author",value:t,onChange:e=>a(e.target.value),className:"border rounded py-1 px-2 ml-5"}),!c&&m&&r.createElement("div",{className:"absolute z-10 top-full left-10 w-half bg-white shadow-lg rounded-md ml-5"},r.createElement("ul",{className:"py-2"},l.map((e=>r.createElement("li",{key:e.id,onClick:()=>(e=>{n(e),a(e.name)})(e),className:"px-4 py-2 hover:bg-gray-100 cursor-pointer"},e.name))))),r.createElement("button",{className:"ml-3 bg-black text-white px-4 py-1 rounded",onClick:()=>{n({}),a("")}},"Reset")))};var n=e=>{let{currentPage:t,pageTotalCount:a,setCurrentPage:l}=e;const s=1===t,n=t===a,c=e=>{l("prev"!==e?t+1:t-1)};return r.createElement("div",{className:"grid grid-cols-3 border-t border-gray-200 pt-10 mt-10"},!s&&r.createElement("div",{className:"col-start-1 col-end-2"},r.createElement("button",{className:"bg-black text-white float-left px-4 py-2 rounded",onClick:()=>c("prev")},"Previous Page")),r.createElement("div",{className:"col-start-2 col-end-3"},r.createElement("div",{className:"flex justify-center items-center h-full"},r.createElement("span",null,"Showing page ",t," of ",a))),!n&&r.createElement("div",{className:"col-start-3 col-end-4 "},r.createElement("button",{className:"bg-black text-white float-right px-4 py-2 rounded",onClick:()=>c("next")},"Next Page")))};var c=e=>{let{posts:t,usersById:a}=e;return r.createElement(r.Fragment,null,t.map((e=>{var t;const{id:l,userId:s,title:n,body:c}=e,m=a[s],o=null!==(t=null==m?void 0:m.name)&&void 0!==t?t:"";return r.createElement("article",{key:l,className:"flex max-w-xl flex-col items-start"},r.createElement("div",{className:"flex items-center gap-x-4 text-xs"}),r.createElement("div",{className:"group relative"},r.createElement("h3",{className:"mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 capitalize"},r.createElement("a",{href:"#"},n)),r.createElement("div",{className:"text-sm leading-6"},r.createElement("p",{className:"font-semibold text-gray-900"},r.createElement("a",{href:"#"},r.createElement("span",{className:"absolute inset-0"}),o))),r.createElement("p",{className:"mt-5 text-sm leading-6 text-gray-600 line-clamp-3 sentence-case"},c)))})))};var m=e=>{let{sortingOrder:t,setSortingOrder:a}=e;return r.createElement("div",{className:"mx-auto max-w-2xl lg:mx-0 flex items-center space-x-4 mt-2"},r.createElement("label",{htmlFor:"sorting"},"Sort by:"),r.createElement("select",{id:"sorting",value:t,onChange:e=>{const t=e.target.value;a(t)},className:"border rounded py-1 px-2"},r.createElement("option",{value:"default"},"Default"),r.createElement("option",{value:"az"},"A-Z"),r.createElement("option",{value:"za"},"Z-A")))};var o=()=>{const{0:e,1:t}=(0,r.useState)([]),{0:a,1:o}=(0,r.useState)([]),{0:i,1:u}=(0,r.useState)({}),{0:d,1:g}=(0,r.useState)([]),{0:p,1:x}=(0,r.useState)("default"),{0:E,1:f}=(0,r.useState)(1),{0:h,1:v}=(0,r.useState)([]),{0:y,1:N}=(0,r.useState)({}),{0:b,1:w}=(0,r.useState)([]),{0:S,1:k}=(0,r.useState)([]),{0:C,1:P}=(0,r.useState)(""),{0:A,1:j}=(0,r.useState)(!0);return(0,r.useEffect)((()=>{j(!0),(async()=>{const e=await fetch("https://jsonplaceholder.typicode.com/posts"),a=await e.json();t(a)})(),(async()=>{const e=await fetch("https://jsonplaceholder.typicode.com/users"),t=await e.json(),a=(0,l.Z)(t),r=null==a?void 0:a.reduce(((e,t)=>(e[null==t?void 0:t.id]=t,e)),{});o(t),u(r)})()}),[]),(0,r.useEffect)((()=>{if(!(Object.keys(y).length>0))return void k(e);const t=e.filter((e=>e.userId===(null==y?void 0:y.id)));k(t)}),[y,e]),(0,r.useEffect)((()=>{const e=(0,l.Z)(S).sort(((e,t)=>"az"===p?e.title<t.title?-1:e.title>t.title?1:0:"za"===p?e.title>t.title?-1:e.title<t.title?1:0:0));g(e)}),[S,p]),(0,r.useEffect)((()=>{const e=d.length;if(e<=0)return;const t=e/2,a=E*t,l=a-t,r=d.slice(l,a);v(r),j(!1)}),[d,E]),(0,r.useEffect)((()=>{if(C.length>0){const e=a.filter((e=>e.name.toLowerCase().includes(C.toLowerCase())));w(e)}else w([]),N({})}),[C,a]),r.createElement("main",null,r.createElement("div",{className:"bg-white py-24 sm:py-32"},r.createElement("div",{className:"mx-auto max-w-7xl px-6 lg:px-8"},r.createElement("div",null,r.createElement("div",{className:"mx-auto max-w-2xl lg:mx-0"},r.createElement("h2",{className:"text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"},"Posts"),r.createElement("p",{className:"mt-2 text-lg leading-8 text-gray-600"},"Here are the sample posts from the JSON placeholder API")),r.createElement(m,{sortingOrder:p,setSortingOrder:x}),r.createElement(s,{searchKeyword:C,setSearchKeyword:P,filteredAuthors:b,selectedAuthor:y,setSelectedAuthor:N})),r.createElement(n,{currentPage:E,pageTotalCount:2,setCurrentPage:f}),!A&&r.createElement("div",{className:"mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:mt-16 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"},r.createElement(c,{posts:h,usersById:i})),A&&r.createElement("div",{className:"flex mx-auto my-10 max-w-2xl sm:my-16 sm:py-8 lg:mx-0 lg:max-w-none justify-center items-center"},r.createElement("span",null,"Loading posts...")),r.createElement(n,{currentPage:E,pageTotalCount:2,setCurrentPage:f}))))};const i=()=>r.createElement("title",null,"Posts")}}]);
//# sourceMappingURL=component---src-pages-index-tsx-aff48d1e9d8d40dc5013.js.map