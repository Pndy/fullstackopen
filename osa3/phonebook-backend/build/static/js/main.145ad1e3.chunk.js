(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(t,e,n){},39:function(t,e,n){"use strict";n.r(e);var c=n(2),a=n(14),r=n.n(a),o=n(3),i=n(4),u=n.n(i),s="https://arcane-lowlands-25368.herokuapp.com/api/persons",d={getAll:function(){return u.a.get(s).then((function(t){return t.data}))},create:function(t){return u.a.post(s,t).then((function(t){return t.data}))},deleteById:function(t){return u.a.delete("".concat(s,"/").concat(t)).then((function(t){return t.data}))},update:function(t,e){return u.a.put("".concat(s,"/").concat(t),e).then((function(t){return t.data}))}},f=n(0),l=function(t){var e=t.contacts,n=t.setContacts,c=t.filterName,a=t.setNotification,r=""===c?e:e.filter((function(t){return t.name.toLowerCase().includes(c.toLowerCase())}));return Object(f.jsx)("div",{children:r.map((function(t){return Object(f.jsxs)("li",{children:[t.id,": ",t.name," ",t.number," ",Object(f.jsx)("button",{onClick:function(){return function(t){var c=e.find((function(e){return e.id===t}));window.confirm("Delete contact ".concat(c.name,"?"))&&d.deleteById(t).then((function(r){var o=e.filter((function(e){return e.id!==t}));n(o),a({text:"Deleted contact ".concat(c.name),type:"success"}),setTimeout((function(){a("")}),3e3)})).catch((function(r){var o=e.filter((function(e){return e.id!==t}));n(o),a({text:"Information of ".concat(c.name," has already been deleted"),type:"error"}),setTimeout((function(){a("")}),3e3)}))}(t.id)},children:"Delete"})]},t.id)}))})},j=function(t){var e=t.contacts,n=t.setContacts,a=t.setNotification,r=Object(c.useState)(""),i=Object(o.a)(r,2),u=i[0],s=i[1],l=Object(c.useState)(""),j=Object(o.a)(l,2),b=j[0],m=j[1];return Object(f.jsxs)("form",{children:[Object(f.jsxs)("div",{children:["name: ",Object(f.jsx)("input",{value:u,onChange:function(t){s(t.target.value)}}),Object(f.jsx)("br",{}),"number: ",Object(f.jsx)("input",{value:b,onChange:function(t){m(t.target.value)}})]}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{onClick:function(t){return function(t){if(t.preventDefault(),e.some((function(t){return t.name===u}))){var c=e.find((function(t){return t.name===u}));window.confirm("".concat(u," already added. want to update number?"))&&(c.number=b,d.update(c.id,c).then((function(){var t=e.map((function(t){return t.name===u&&(t.number=b),t}));n(t),a({text:"Updated ".concat(c.name," number to ").concat(b),type:"success"}),setTimeout((function(){a("")}),3e3)})))}else d.create({name:u,number:b}).then((function(t){var c=e.concat({name:t.name,number:t.number,id:t.id});n(c),a({text:"Added ".concat(u),type:"success"}),setTimeout((function(){a("")}),3e3)})).catch((function(t){alert("Error uploading to server: ".concat(t))}));s(""),m("")}(t)},children:"add"})})]})},b=function(t){var e=t.setFilterName;return Object(f.jsxs)("div",{children:["Filter results: ",Object(f.jsx)("input",{onChange:function(t){e(t.target.value)}})]})},m=function(t){var e=t.message;return null===e||""===e?null:Object(f.jsx)("div",{className:e.type,children:e.text})},h=(n(38),function(){var t=Object(c.useState)([]),e=Object(o.a)(t,2),n=e[0],a=e[1],r=Object(c.useState)(""),i=Object(o.a)(r,2),u=i[0],s=i[1],h=Object(c.useState)(""),O=Object(o.a)(h,2),p=O[0],x=O[1];return Object(c.useEffect)((function(){d.getAll().then((function(t){a(t)}))}),[]),Object(f.jsxs)("div",{children:[Object(f.jsx)("h2",{children:"Phonebook"}),Object(f.jsx)(m,{message:p}),Object(f.jsx)(b,{setFilterName:s}),Object(f.jsx)("h2",{children:"Add new"}),Object(f.jsx)(j,{contacts:n,setContacts:a,setNotification:x}),Object(f.jsx)("h2",{children:"Numbers"}),Object(f.jsx)(l,{filterName:u,contacts:n,setContacts:a,setNotification:x})]})});r.a.render(Object(f.jsx)(h,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.145ad1e3.chunk.js.map