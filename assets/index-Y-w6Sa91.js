import{a2 as R,__tla as A}from"./index-DlgZvHNC.js";let C,S=Promise.all([(()=>{try{return A}catch{}})()]).then(async()=>{var y,g;function D(){return g||(g=1,y=function(){var a=document.getSelection();if(!a.rangeCount)return function(){};for(var n=document.activeElement,i=[],s=0;s<a.rangeCount;s++)i.push(a.getRangeAt(s));switch(n.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":n.blur();break;default:n=null;break}return a.removeAllRanges(),function(){a.type==="Caret"&&a.removeAllRanges(),a.rangeCount||i.forEach(function(d){a.addRange(d)}),n&&n.focus()}}),y}var p,b;function x(){if(b)return p;b=1;var a=D(),n={"text/plain":"Text","text/html":"Url",default:"Text"},i="Copy to clipboard: #{key}, Enter";function s(r){var t=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return r.replace(/#{\s*key\s*}/g,t)}function d(r,t){var c,v,w,u,l,e,f=!1;t||(t={}),c=t.debug||!1;try{w=a(),u=document.createRange(),l=document.getSelection(),e=document.createElement("span"),e.textContent=r,e.ariaHidden="true",e.style.all="unset",e.style.position="fixed",e.style.top=0,e.style.clip="rect(0, 0, 0, 0)",e.style.whiteSpace="pre",e.style.webkitUserSelect="text",e.style.MozUserSelect="text",e.style.msUserSelect="text",e.style.userSelect="text",e.addEventListener("copy",function(o){if(o.stopPropagation(),t.format)if(o.preventDefault(),typeof o.clipboardData>"u"){c&&console.warn("unable to use e.clipboardData"),c&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var m=n[t.format]||n.default;window.clipboardData.setData(m,r)}else o.clipboardData.clearData(),o.clipboardData.setData(t.format,r);t.onCopy&&(o.preventDefault(),t.onCopy(o.clipboardData))}),document.body.appendChild(e),u.selectNodeContents(e),l.addRange(u);var E=document.execCommand("copy");if(!E)throw new Error("copy command was unsuccessful");f=!0}catch(o){c&&console.error("unable to copy using execCommand: ",o),c&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",r),t.onCopy&&t.onCopy(window.clipboardData),f=!0}catch(m){c&&console.error("unable to copy using clipboardData: ",m),c&&console.error("falling back to prompt"),v=s("message"in t?t.message:i),window.prompt(v,r)}}finally{l&&(typeof l.removeRange=="function"?l.removeRange(u):l.removeAllRanges()),e&&document.body.removeChild(e),w()}return f}return p=d,p}var h=x();C=R(h)});export{S as __tla,C as w};
