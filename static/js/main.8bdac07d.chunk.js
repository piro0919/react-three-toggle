(this["webpackJsonpreact-three-toggle"]=this["webpackJsonpreact-three-toggle"]||[]).push([[0],{18:function(e,t,n){"use strict";n.r(t);var i,c,r,a,o=n(0),s=n(5),l=n(6),u=n(2),d=n(3),h=d.a.div(i||(i=Object(u.a)(["\n  border: 1px solid #ccc;\n  border-radius: ",";\n  box-sizing: content-box;\n  cursor: pointer;\n  height: ",";\n  padding: 4px;\n  width: ",";\n"])),(function(e){var t=e.height;return"".concat(t,"px")}),(function(e){var t=e.height;return"".concat(t,"px")}),(function(e){var t=e.width;return"".concat(t,"px")})),b=d.a.div(c||(c=Object(u.a)(["\n  height: 100%;\n  position: relative;\n  width: 100%;\n"]))),f=d.a.div(r||(r=Object(u.a)(["\n  background: #aaa;\n  border-radius: 50%;\n  height: ",";\n  left: ",";\n  position: absolute;\n  transition: 100ms;\n  top: ",";\n  width: ",";\n"])),(function(e){var t=e.height,n=e.isVertical,i=e.width;return"".concat(n?i:t,"px")}),(function(e){var t=e.height,n=e.isVertical,i=e.selected;return n||"first"===i?0:"calc((100% - ".concat(t,"px) / ").concat("second"===i?2:1,")")}),(function(e){var t=e.isVertical,n=e.selected,i=e.width;return t?"first"===n?0:"calc((100% - ".concat(i,"px) / ").concat("second"===n?2:1,")"):0}),(function(e){var t=e.height,n=e.isVertical,i=e.width;return"".concat(n?i:t,"px")})),j=d.a.select(a||(a=Object(u.a)(["\n  display: none;\n"]))),p=n(1),g=Object(o.forwardRef)((function(e,t){var n=e.className,i=(n=void 0===n?{selectedClassName:void 0,wrapperClassName:void 0}:n).selectedClassName,c=n.wrapperClassName,r=e.height,a=void 0===r?16:r,u=e.initialValue,d=e.isVertical,g=e.isWrap,v=e.name,O=e.onChange,x=e.style,m=(x=void 0===x?{selectedStyle:void 0,wrapperStyle:void 0}:x).selectedStyle,w=x.wrapperStyle,y=e.values,C=e.width,S=void 0===C?48:C,k=Object(o.useMemo)((function(){return y.map((function(e){return"string"===typeof e?e:e.value}))}),[y]),N=Object(o.useState)(u||k[0]),V=Object(s.a)(N,2),M=V[0],F=V[1],I=Object(o.useState)(!1),z=Object(s.a)(I,2),R=z[0],B=z[1],D=Object(o.useCallback)((function(e){e.preventDefault(),F((function(e){var t=k.findIndex((function(t){return e===t}));return g?0===t||2===t?k[1]:k[R?0:2]:k[2===t?0:t+1]}))}),[g,k,R]),E=Object(o.useMemo)((function(){return y.map((function(e){return"string"===typeof e?Object(p.jsx)("option",{value:e},e):Object(p.jsx)("option",{value:e.value},e.value)}))}),[y]),J=Object(o.useMemo)((function(){return["first","second","third"][k.findIndex((function(e){return M===e}))]}),[k,M]),L=Object(o.useCallback)((function(){}),[]),P=Object(o.useMemo)((function(){var e=y.find((function(e){return M===("string"===typeof e?e:e.value)}));if(e)return Object(p.jsx)(f,{className:i,height:a,isVertical:d,selected:J,style:m,width:S,children:"string"===typeof e?null:e.label})}),[a,d,J,i,m,M,y,S]);return Object(o.useEffect)((function(){"first"!==J&&"third"!==J||B("third"===J)}),[J]),Object(l.a)((function(){if(O){var e=y.find((function(e){return"string"===typeof e?M===e:M===e.value}));e&&O(e)}}),[O,M]),Object(p.jsxs)(h,{className:c,height:a,onClick:D,style:w,width:S,children:[Object(p.jsx)(b,{children:P}),Object(p.jsx)(j,{name:v,onChange:L,ref:t,value:M,children:E})]})})),v=function(){var e=Object(o.useMemo)((function(){return["hoge","fuga","piyo"]}),[]),t=Object(o.useMemo)((function(){return[{label:"hoge",value:"hoge"},{label:"fuga",value:"fuga"},{label:"piyo",value:"piyo"}]}),[]),n=Object(o.useCallback)((function(e){console.log(e)}),[]);return Object(p.jsxs)("div",{children:[Object(p.jsx)("h1",{children:"react-three-toggle"}),Object(p.jsxs)("article",{children:[Object(p.jsx)("h2",{children:"Simple"}),Object(p.jsx)(g,{values:e})]}),Object(p.jsx)("hr",{}),Object(p.jsxs)("article",{children:[Object(p.jsx)("h2",{children:"Full Customize"}),Object(p.jsx)(g,{className:{selectedClassName:"moge1",wrapperClassName:"moge2"},height:96,onChange:n,initialValue:"piyo",isVertical:!0,isWrap:!0,style:{selectedStyle:{background:"red",borderRadius:0,color:"white",fontSize:"12px",lineHeight:"32px",textAlign:"center",transition:"250ms"},wrapperStyle:{background:"pink",border:"none",borderRadius:0,padding:0}},values:t,width:32})]})]})},O=n(8),x=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),i(e),c(e),r(e),a(e)}))};n.n(O).a.render(Object(p.jsx)(o.StrictMode,{children:Object(p.jsx)(v,{})}),document.getElementById("root")),x()}},[[18,1,2]]]);
//# sourceMappingURL=main.8bdac07d.chunk.js.map