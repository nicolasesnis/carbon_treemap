(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{1101:function(e,t){},1595:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),i=n(152),r=n.n(i),s=(n(766),n(21)),o=(n(767),n(299)),l=n.n(o),j=n(743),b=n(51),u=n(1656),d=n(1664),O=n(1658),h=n(1665),p=n(728),x=n.n(p),f=n(1652),m=n(1660),g=n(1667),v=n(3);var y=function(e){var t=Object(a.useState)(!1),n=Object(s.a)(t,2),c=n[0],i=n[1],r=Object(a.useState)(!1),o=Object(s.a)(r,2),l=o[0],j=o[1],b=Object(a.useState)({}),p=Object(s.a)(b,2),y=p[0],S=p[1],k=Object(a.useState)(!0),w=Object(s.a)(k,2),C=w[0],E=w[1],z=Object(a.useState)(!1),T=Object(s.a)(z,2),L=T[0],F=T[1],G=Object(a.useState)(!1),I=Object(s.a)(G,2),_=I[0],D=I[1],P=Object(a.useState)(!1),A=Object(s.a)(P,2),R=A[0],W=A[1],M=Object(a.useState)(!1),N=Object(s.a)(M,2),B=N[0],J=N[1],Y=Object(a.useState)(!1),q=Object(s.a)(Y,2),V=q[0],H=q[1];return Object(a.useEffect)((function(){E(!0),j(!1),fetch("https://carbon-treemap.herokuapp.com/get-data/"+e.filename).then((function(e){return e.json()})).then((function(t){"failed"!==t.status?(W(!1),F(Object.keys(t)[Object.keys(t).length-1]),D(Object.keys(t).map((function(e){return{label:e,value:parseInt(e)}}))),i(t),H("1y_evo"),S({margin:{t:50,l:25,r:25,b:25},title:"entreprises"===e.filename?"GES et market cap. - Entreprises":"CO2 total et evolution - Pays",autosize:!0,font:{size:"50%",plot_bgcolor:"black"},textfont:30,annotations:[{showarrow:!1,text:"entreprises"===e.filename?"<i>Taille des zones : market cap. ; Couleur des zones : CO2</i>":"<i>Taille des zones : GES total ; Couleur des zones : Evolution</i>",x:.5,xanchor:"center",y:-.05,yanchor:"bottom"}]}),E(!1)):W(t.message)}))}),[e.filename]),Object(a.useEffect)((function(){L&&c&&V&&(j(c[L][V]),J(Object.keys(c[L]).map((function(e){return{label:e,value:e}}))))}),[L,c,V]),Object(a.useEffect)((function(){H("1y_evo")}),[L]),Object(a.useEffect)((function(){console.log(l),!C&&l&&x.a.react("treemap",[{type:"treemap",labels:l.label,parents:l.parent,values:l.value,branchvalues:"total",marker:{colors:l.color,colorscale:[["0.0","#2ca853"],["0.111111111111","#56a33b"],["0.222222222222","#729c23"],["0.333333333333","#8a940a"],["0.444444444444","#9f8b00"],["0.555555555556","#b28100"],["0.666666666667","#c37511"],["0.777777777778","#d16826"],["0.888888888889","#db5b3a"],["1.0","#e24e4e"]],showscale:!0,cmid:l[V+"_med"],cmax:l[V+"_max"],cmin:l[V+"_min"]},textposition:"center",texttemplate:"<span style='font-size:4vw; text-align: center'>%{label}<span>",hovertemplate:"entreprises"===e.filename?"<b>%{label} </b> <br> Market cap. : %{value}<br> GES : %{color:,}<extra></extra>":"<b>%{label} </b> <br> C02 Total : %{value}<br> Evolution : %{color:,}<extra></extra>"}],y,{responsive:!0})}),[l,y,C,e.filename,V]),Object(a.useEffect)((function(){setTimeout((function(){window.dispatchEvent(new Event("resize"))}),100)}),[e.open]),Object(v.jsx)("div",{children:!0!==C&&l&&_&&L?Object(v.jsxs)(m.a,{container:!0,spacing:"1",alignItems:"center",children:[Object(v.jsxs)(m.a,{item:!0,xs:1,children:[" ",Object(v.jsx)(d.a,{children:Object(v.jsxs)(h.a,{fullWidth:!0,children:[Object(v.jsx)(O.a,{id:"demo-simple-select-label",children:"Year"}),Object(v.jsx)(f.a,{id:"select-year",value:L,label:"Year",onChange:function(e){return F(e.target.value)},children:Object.keys(_).map((function(e){return Object(v.jsx)(g.a,{value:_[e].value,children:_[e].label},e)}))})," "]})})," ",Object(v.jsx)(d.a,{sx:{marginTop:"5vh"},children:Object(v.jsxs)(h.a,{fullWidth:!0,children:[Object(v.jsx)(O.a,{id:"demo-simple-select-label",children:"Color"}),Object(v.jsx)(f.a,{id:"select-color",value:V,label:"Color",onChange:function(e){return H(e.target.value)},children:Object.keys(B).map((function(e){return Object(v.jsx)(g.a,{value:B[e].value,children:B[e].label},e)}))})," "]})})]}),Object(v.jsxs)(m.a,{item:!0,xs:11,children:[Object(v.jsx)("div",{id:"treemap",style:{height:"80vh"}})," "]})]}):Object(v.jsx)("div",{children:R?Object(v.jsx)(u.a,{style:{marginTop:"2vh"},severity:"error",children:Object(v.jsxs)("div",{children:[Object(v.jsx)("div",{children:"Something went wrong. The file is probably not matching with compatible templates. Double check file or send below message to Nico:"}),Object(v.jsx)("br",{}),R]})}):Object(v.jsx)("div",{children:" Loading data "})})})},S=n(1654),k=n(1662),w=n(739),C=n.n(w),E=n(740),z=n.n(E),T=n(200),L=n(6),F=n(66),G=n(1661),I=n(738),_=n.n(I),D=n(1648),P=n(1668),A=n(1669),R=n(1666),W=n(312),M=n(1649),N=n(1663),B=n(733),J=n.n(B),Y=n(734),q=n.n(Y),V=n(735),H=n.n(V),K=n(1657),Q=n(1650),U=n(1651),X=n(737),Z=n.n(X),$=n(736),ee=n.n($),te=240,ne=Object(L.a)("main",{shouldForwardProp:function(e){return"open"!==e}})((function(e){var t=e.theme,n=e.open;return Object(T.a)({flexGrow:1,padding:t.spacing(3),transition:t.transitions.create("margin",{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen}),marginLeft:"-".concat(te,"px")},n&&{transition:t.transitions.create("margin",{easing:t.transitions.easing.easeOut,duration:t.transitions.duration.enteringScreen}),marginLeft:0})})),ae=Object(L.a)(P.a,{shouldForwardProp:function(e){return"open"!==e}})((function(e){var t=e.theme,n=e.open;return Object(T.a)({backgroundColor:"White",color:"black",transition:t.transitions.create(["margin","width"],{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen})},n&&{width:"calc(100% - ".concat(te,"px)"),marginLeft:"".concat(te,"px"),transition:t.transitions.create(["margin","width"],{easing:t.transitions.easing.easeOut,duration:t.transitions.duration.enteringScreen})})})),ce=Object(L.a)("div")((function(e){var t=e.theme;return Object(T.a)(Object(T.a)({display:"flex",alignItems:"center",padding:t.spacing(0,1)},t.mixins.toolbar),{},{justifyContent:"flex-end"})}));function ie(e){var t=e.children,n=Object(F.a)(),i=c.a.useState(!0),r=Object(s.a)(i,2),o=r[0],j=r[1],b=c.a.useState("pays.csv"),u=Object(s.a)(b,2),O=u[0],h=u[1],p=c.a.useState([]),x=Object(s.a)(p,2),f=x[0],m=x[1],g=c.a.Children.map(t,(function(e){return c.a.isValidElement(e)?c.a.cloneElement(e,{open:o,filename:O}):e}));function y(){l.a.get("https://carbon-treemap.herokuapp.com/get-files").then((function(e){m(e.data)})).catch((function(e){console.log(e)}))}return Object(a.useEffect)((function(){y()}),[]),Object(v.jsxs)(d.a,{sx:{display:"flex"},children:[Object(v.jsx)(D.a,{}),Object(v.jsx)(ae,{position:"fixed",open:o,children:Object(v.jsxs)(A.a,{children:[Object(v.jsx)(N.a,{color:"inherit","aria-label":"open drawer",onClick:function(){j(!0)},edge:"start",sx:Object(T.a)({mr:2},o&&{display:"none"}),children:Object(v.jsx)(J.a,{})}),Object(v.jsx)(W.a,{variant:"h6",noWrap:!0,component:"div",children:"Repr\xe9sentation graphique des \xe9missions de GES"})]})}),Object(v.jsxs)(G.a,{sx:{width:te,flexShrink:0,"& .MuiDrawer-paper":{width:te,boxSizing:"border-box"}},variant:"persistent",anchor:"left",open:o,children:[Object(v.jsx)(ce,{children:Object(v.jsx)(N.a,{onClick:function(){j(!1)},children:"ltr"===n.direction?Object(v.jsx)(q.a,{}):Object(v.jsx)(H.a,{})})}),Object(v.jsx)(M.a,{}),Object(v.jsxs)(R.a,{children:[f.map((function(e){return Object(v.jsxs)(K.a,{button:!0,onClick:function(t){return h(e)},children:[Object(v.jsx)(Q.a,{children:Object(v.jsx)(ee.a,{})}),Object(v.jsx)(U.a,{primary:e})]},e)})),Object(v.jsxs)(K.a,{button:!0,onClick:function(e){return y()},children:[Object(v.jsx)(Q.a,{children:Object(v.jsx)(Z.a,{})}),Object(v.jsx)(U.a,{primary:"Refresh Drive"})]},"Refresh")]}),Object(v.jsx)(M.a,{}),Object(v.jsx)(R.a,{children:Object(v.jsxs)(K.a,{button:!0,children:[Object(v.jsx)(Q.a,{children:Object(v.jsx)(_.a,{})}),Object(v.jsx)(U.a,{primary:"About"})]},"About")})]}),Object(v.jsxs)(ne,{open:o,children:[Object(v.jsx)(ce,{}),g]})]})}function re(e){var t=e.open,n=e.filename,c=a.useState(0),i=Object(s.a)(c,2),r=i[0],o=i[1];return Object(v.jsxs)(ie,{children:[Object(v.jsxs)(S.a,{value:r,onChange:function(e,t){o(t)},"aria-label":"icon tabs example",children:[Object(v.jsx)(k.a,{icon:Object(v.jsx)(C.a,{}),"aria-label":"chart"}),Object(v.jsx)(k.a,{icon:Object(v.jsx)(z.a,{}),"aria-label":"table"})]}),0===r?Object(v.jsx)(y,{filename:n,open:t}):Object(v.jsx)("div",{})]})}var se=function(){var e=Object(a.useState)({}),t=Object(s.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){l.a.get("https://carbon-treemap.herokuapp.com/api").then((function(e){c(e)})).catch((function(e){console.log(e)}))}),[]),Object(v.jsxs)("div",{className:"App",children:[Object(v.jsx)("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"}),200===n.status?Object(v.jsx)("div",{children:Object(v.jsx)(j.a,{children:Object(v.jsx)(b.a,{exact:!0,path:"/",component:re})})}):Object(v.jsx)("h3",{children:"LOADING"})]})},oe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,1672)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),i(e),r(e)}))};r.a.render(Object(v.jsx)(c.a.StrictMode,{children:Object(v.jsx)(se,{})}),document.getElementById("root")),oe()},766:function(e,t,n){},767:function(e,t,n){},985:function(e,t){},987:function(e,t){}},[[1595,1,2]]]);
//# sourceMappingURL=main.ef0fad12.chunk.js.map