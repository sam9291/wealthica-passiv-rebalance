(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(7),u=n.n(c),l=(n(13),n(2)),o=n.n(l),i=n(4),s=n(3),m=n(5),d=n(1),p=(n(15),{addon:new(0,window.Addon)}),f=function(e){return p.addon.api.getPositions({groups:e.groupsFilter,institutions:e.institutionsFilter,investments:e.investmentsFilter})},E=function(e){return p.addon.api.getInstitutions({groups:e.groupsFilter,institutions:e.institutionsFilter,investments:e.investmentsFilter})},y=function(){return p.addon.request({method:"GET",endpoint:"preferences/addons/passiv/passiv-lite"}).then((function(e){return t=e.data,JSON.parse(atob(t));var t}))},b=function(e){return function(e,t,n){var a=new URL(e);return t&&(a.search=new URLSearchParams(t).toString()),fetch(a.toString(),n).then((function(e){return e.json()}))}("https://getpassiv.com/api/v1/embeddedTrades",void 0,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)})},h={margin:8},v=function(e,t){var n="cad"===t?".TO":"";return"".concat(e.symbol).concat(n)},O=function(e){var t,n=(null===(t=e.positions.find((function(t){return v(t.security,t.security.currency)===e.component.symbol})))||void 0===t?void 0:t.quantity)||0,a=e.actions.find((function(t){return t.symbol===e.component.symbol})),c=0,u=0,l=0,o=0;return a&&(c=a.units,"SELL"===a.action&&(c*=-1),l=Math.round(n*a.price*100)/100,u=Math.round((n+c)*a.price*100)/100,o=e.positions.reduce((function(t,n){var a;return t+n.quantity*((null===(a=e.actions.find((function(e){return e.symbol===v(n.security,n.security.currency)})))||void 0===a?void 0:a.price)||0)}),0)),r.a.createElement("tr",null,r.a.createElement("td",null,e.component.symbol),r.a.createElement("td",null,(null===a||void 0===a?void 0:a.price)||"-"),r.a.createElement("td",null,"".concat(Math.round(l/o*100*100)/100,"% / ").concat(100*e.component.percentOfPortfolio,"%")),r.a.createElement("td",null,n),r.a.createElement("td",null,l),r.a.createElement("td",null,(null===a||void 0===a?void 0:a.action)||""),r.a.createElement("td",null,c||""),r.a.createElement("td",null,n+c),r.a.createElement("td",null,a?u:"-"))},j=function(){var e=Object(a.useState)(!1),t=Object(d.a)(e,2),n=t[0],c=t[1],u=Object(a.useState)(!1),l=Object(d.a)(u,2),j=l[0],g=l[1],S=Object(a.useState)(!1),w=Object(d.a)(S,2),k=w[0],F=w[1],x=Object(a.useState)(),C=Object(d.a)(x,2),P=C[0],T=C[1],B=Object(a.useState)(),M=Object(d.a)(B,2),q=M[0],L=M[1],N=Object(a.useState)(),A=Object(d.a)(N,2),J=A[0],Q=A[1],I=Object(a.useState)([]),R=Object(d.a)(I,2),U=R[0],V=R[1],W=Object(a.useState)([]),G=Object(d.a)(W,2),$=G[0],_=G[1],z=Object(a.useState)([]),D=Object(d.a)(z,2),H=D[0],K=D[1],X=Object.keys($.flatMap((function(e){return e.investments})).map((function(e){return e.currency})).reduce((function(e,t){return Object(m.a)({},e,Object(s.a)({},t,1))}),{})),Y=X.map((function(e){return function(e){return{currency:e,amount:$.flatMap((function(t){return t.investments.filter((function(t){return t.currency===e}))})).reduce((function(e,t){return e+t.cash}),0)}}(e)}));Object(a.useEffect)((function(){n||(c(!0),p.addon.on("init",(function(e){T(e)})),p.addon.on("update",(function(e){T((function(t){return Object(m.a)({},t,{},e)}))})))}),[n]),Object(a.useEffect)((function(){(function(){var e=Object(i.a)(o.a.mark((function e(){var t,n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!P){e.next=13;break}return e.next=3,f(P);case 3:return t=e.sent,V(t),e.next=7,y();case 7:return n=e.sent,L(n),e.next=11,E(P);case 11:a=e.sent,_(a);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[P]);var Z=function(){var e=Object(i.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return F(!0),e.next=3,b({buy_only:j,positions:U.map((function(e){return{symbol:v(e.security,e.security.currency),units:e.quantity}})),targets:t.components.map((function(e){return{symbol:e.symbol,percent:100*e.percentOfPortfolio}})),balances:Y});case 3:n=e.sent,K(n),Q(t),F(!1);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"Positions:"),r.a.createElement("table",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Symbol"),r.a.createElement("th",null,"Quantity")),U.map((function(e){return r.a.createElement("tr",null,r.a.createElement("td",null,v(e.security,e.security.currency)),r.a.createElement("td",null,e.quantity))}))),r.a.createElement("h1",null,"Cash Balance"),r.a.createElement("table",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Currency"),r.a.createElement("th",null,"Balance")),Y.map((function(e){return r.a.createElement("tr",null,r.a.createElement("td",null,e.currency),r.a.createElement("td",null,e.amount))}))),r.a.createElement("h1",null,"Targets:"),r.a.createElement("div",null,q&&r.a.createElement(r.a.Fragment,null,r.a.createElement("span",null,"Buy only"),r.a.createElement("input",{type:"checkbox",checked:j,onClick:function(){return g(!j)}}),q.portfolios.map((function(e){return r.a.createElement("button",{onClick:function(){return Z(e)},style:h},e.portfolioName)})))),k&&r.a.createElement("h2",null,"Loading..."),J&&U&&r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,J.portfolioName),r.a.createElement("table",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Symbol"),r.a.createElement("th",null,"Price"),r.a.createElement("th",null,"Target"),r.a.createElement("th",null,"Current Quantity"),r.a.createElement("th",null,"Current Value"),r.a.createElement("th",null,"Action"),r.a.createElement("th",null,"Buy/Sell"),r.a.createElement("th",null,"Final Quantity"),r.a.createElement("th",null,"Final Value")),J.components.sort((function(e){var t;return(null===(t=H.find((function(t){return t.symbol===e.symbol})))||void 0===t?void 0:t.units)||0})).map((function(e){return r.a.createElement(O,{component:e,positions:U,actions:H})})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,n){e.exports=n(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.7b9f986d.chunk.js.map