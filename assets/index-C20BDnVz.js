import{a as M,r as n,j as o,u as N,b as U,S as V,__tla as X}from"./index-DtEubEwZ.js";import{c as O,T as Z,O as K,W as Q,C as ee,a as ae,D as re,d as P,P as te,R as se,__tla as oe}from"./routes-B-PH-_IA.js";let C,T,$,F,I,S,E,q,ne=Promise.all([(()=>{try{return X}catch{}})(),(()=>{try{return oe}catch{}})()]).then(async()=>{var p="AlertDialog",[B,le]=M(p,[O]),l=O(),f=a=>{const{__scopeAlertDialog:r,...e}=a,t=l(r);return o.jsx(se,{...t,...e,modal:!0})};f.displayName=p;var W="AlertDialogTrigger",Y=n.forwardRef((a,r)=>{const{__scopeAlertDialog:e,...t}=a,s=l(e);return o.jsx(Z,{...s,...t,ref:r})});Y.displayName=W;var k="AlertDialogPortal",g=a=>{const{__scopeAlertDialog:r,...e}=a,t=l(r);return o.jsx(te,{...t,...e})};g.displayName=k;var z="AlertDialogOverlay",m=n.forwardRef((a,r)=>{const{__scopeAlertDialog:e,...t}=a,s=l(e);return o.jsx(K,{...s,...t,ref:r})});m.displayName=z;var i="AlertDialogContent",[G,H]=B(i),_=n.forwardRef((a,r)=>{const{__scopeAlertDialog:e,children:t,...s}=a,u=l(e),d=n.useRef(null),L=N(r,d),b=n.useRef(null);return o.jsx(Q,{contentName:i,titleName:y,docsSlug:"alert-dialog",children:o.jsx(G,{scope:e,cancelRef:b,children:o.jsxs(ee,{role:"alertdialog",...u,...s,ref:L,onOpenAutoFocus:U(s.onOpenAutoFocus,c=>{var w;c.preventDefault(),(w=b.current)==null||w.focus({preventScroll:!0})}),onPointerDownOutside:c=>c.preventDefault(),onInteractOutside:c=>c.preventDefault(),children:[o.jsx(V,{children:t}),o.jsx(j,{contentRef:d})]})})})});_.displayName=i;var y="AlertDialogTitle",D=n.forwardRef((a,r)=>{const{__scopeAlertDialog:e,...t}=a,s=l(e);return o.jsx(ae,{...s,...t,ref:r})});D.displayName=y;var A="AlertDialogDescription",h=n.forwardRef((a,r)=>{const{__scopeAlertDialog:e,...t}=a,s=l(e);return o.jsx(re,{...s,...t,ref:r})});h.displayName=A;var J="AlertDialogAction",v=n.forwardRef((a,r)=>{const{__scopeAlertDialog:e,...t}=a,s=l(e);return o.jsx(P,{...s,...t,ref:r})});v.displayName=J;var x="AlertDialogCancel",R=n.forwardRef((a,r)=>{const{__scopeAlertDialog:e,...t}=a,{cancelRef:s}=H(x,e),u=l(e),d=N(r,s);return o.jsx(P,{...u,...t,ref:d})});R.displayName=x;let j;j=({contentRef:a})=>{const r=`\`${i}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${i}\` by passing a \`${A}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${i}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;return n.useEffect(()=>{var e;document.getElementById((e=a.current)==null?void 0:e.getAttribute("aria-describedby"))||console.warn(r)},[r,a]),null},S=f,I=g,F=m,T=_,C=v,q=R,E=D,$=h});export{C as A,T as C,$ as D,F as O,I as P,S as R,E as T,ne as __tla,q as a};
