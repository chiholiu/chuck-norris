!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(1),e.exports=n(2)},function(e,t){!function(){"use strict";const e=document.getElementById("getData");e.addEventListener("click",function(){fetch("https://api.icndb.com/jokes/random/10").then(function(e){return e.json()}).then(function(e){let n="";console.log(e.value),e.value.forEach((e,i)=>{n+=`<li><input type="checkbox" class='inputCheckbox' id='${e.id}'/> User title :  ${e.joke}</li>`,t.innerHTML=n}),function(e){for(let t=0;t<e.length;t++)o(e[t],r)}(t.children),s.addEventListener("click",p),a.addEventListener("click",g)}).catch(function(e){console.log(e)})});let t=document.getElementById("list-of-jokes"),n=[];function i(){let e=document.getElementById("favorites"),t=function(){let e=[];for(let t in n){let i=n[t],o={};for(let e in i)o[e]=i[e];e.push(o)}return e}(),i="";for(let e in t)i+=`<li><input type='button' class='delete' id='${t[e].id}' value='remove'/></span> User title: ${t[e].joke}</li>`;e.innerHTML=i,function(e){for(let t=0;t<e.length;t++)l(e[t],c)}(e.children)}let o=function(e,t){let n=e.querySelector('input[type="checkbox"]');n.addEventListener("change",r),function(e){let t=new m(e);y.push(t)}(n)},l=function(e,t){e.querySelector(".delete").addEventListener("click",c)},r=function(){let e=this.id,o=this.parentNode.innerText;this.disabled=!0,null===n&&(n=[]),function(e,o){let l=new u(e,o);const r=n.reduce((e,t)=>e.concat(t.id),[]);if(!(n.length<10)||r.includes(e))return function(){let e=t.querySelectorAll("input:not(:checked)");for(let t=0;t<e.length;t++)0==e[t].disabled&&(e[t].disabled=!0)}(),console.log("id is the same and/ or length is bigger than 5"),!1;n.push(l);d(),i()}(e,o)},c=function(){let e=this.id,t=this.parentNode.firstChild;t.checked=!1,t.disabled=!1,function(e){for(let t in n)if(n[t].id===e){n.splice(t,1);break}d(),i()}(e)},u=function(e,t){this.id=e,this.joke=t};function d(){localStorage.setItem("favoList",JSON.stringify(n))}n=JSON.parse(localStorage.getItem("favoList")),i();let f,s=document.getElementById("start"),a=document.getElementById("stop");let h=1e3;function p(){return f=setInterval(b,h),!1}function g(){return clearInterval(f),!1}let m=function(e){this.id=e},y=[];function b(){let e=Math.floor(Math.random()*Math.floor(y.length)),t=y[e].id.id,n=document.getElementById(t),i=y.indexOf(y[e]);y.length<=1&&g(),y.splice(i,1),n.click()}}()},function(e,t,n){}]);