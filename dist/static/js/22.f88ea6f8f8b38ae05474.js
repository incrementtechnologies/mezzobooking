webpackJsonp([22],{456:function(t,e,n){n(900);var o=n(319)(n(799),n(983),"data-v-03f64e87",null);t.exports=o.exports},489:function(t,e,n){"use strict";n(38);e.a={sidebarMenu:[{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Dashboard",icon:"fas fa-home",path:"dashboard",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Bookings",icon:"fas fa-book-open",path:"bookings",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Room Type",icon:"fas fa-building",path:"room-types",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Calendar",icon:"fas fa-calendar",path:"calendar",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Coupons",icon:"fas fa-gift",path:"coupons",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Customers",icon:"fas fa-address-book",path:"customers",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Accounts",icon:"fas fa-users",path:"accounts",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Settings",icon:"fas fa-cog",path:"settings",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Logout",icon:"fas fa-sign-out-alt",path:"logout",flag:!1,subMenu:null}],menuOff:[{id:1,users:"ALL",parent_id:0,description:"Dashboard",icon:"fa fa-tachometer",path:"dashboard",flag:!1,subMenu:null}],APP_NAME:"Mezzo Booking",APP_NAME_HTML:"Mezzo Booking",APP_EMAIL:"support@siml.ph",APP_SITE:"https://wearesiml.com",COMPANY:"Mezzo",COMPANY_URL:"http://wearesiml.ltd",COPYRIGHT:"Mezzo "+(new Date).getFullYear(),USER_TYPE:[{title:"USER"}],profileMenu:[{title:"My Profile",icon:"fa fa-cog",route:"/profile"}],USER_TYPE_SETTING:!1,plan:!1,broadcastingFlag:!0,header:["status","notification"],settingsMenu:[{title:"Profile",type:"profile",allowed:["cellular_number","address"]},{title:"Account",type:"account",allowed:[]},{title:"Business Setting",type:"merchant",allowed:["prefix","website","address","schedule","information"]}],settingsTabMenu:[{title:"General Sale Settings",description:"Shows general sale per coupon",route:"/general-sales"},{title:"Room Type Features",description:"Add or edit room features",route:"features"},{title:"Rates",description:"Add or edit your rates in room-types",route:"rates"}]}},683:function(t,e,n){t.exports=n.p+"static/img/logo.31d66c4.png"},684:function(t,e,n){var o=n(159),i=n(52)("toStringTag"),r="Arguments"==o(function(){return arguments}()),a=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=a(e=Object(t),i))?n:r?o(e):"Object"==(s=o(e))&&"function"==typeof e.callee?"Arguments":s}},685:function(t,e,n){"use strict";function o(t){var e,n;this.promise=new t(function(t,o){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=o}),this.resolve=i(e),this.reject=i(n)}var i=n(320);t.exports.f=function(t){return new o(t)}},689:function(t,e,n){var o=n(684),i=n(52)("iterator"),r=n(93);t.exports=n(30).getIteratorMethod=function(t){if(void 0!=t)return t[i]||t["@@iterator"]||r[o(t)]}},691:function(t,e){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},692:function(t,e,n){var o=n(60),i=n(53),r=n(685);t.exports=function(t,e){if(o(t),i(e)&&e.constructor===t)return e;var n=r.f(t);return(0,n.resolve)(e),n.promise}},693:function(t,e,n){var o=n(60),i=n(320),r=n(52)("species");t.exports=function(t,e){var n,a=o(t).constructor;return void 0===a||void 0==(n=o(a)[r])?e:i(n)}},694:function(t,e,n){var o,i,r,a=n(160),s=n(712),c=n(325),d=n(162),u=n(39),l=u.process,p=u.setImmediate,f=u.clearImmediate,A=u.MessageChannel,m=u.Dispatch,h=0,v={},g=function(){var t=+this;if(v.hasOwnProperty(t)){var e=v[t];delete v[t],e()}},x=function(t){g.call(t.data)};p&&f||(p=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return v[++h]=function(){s("function"==typeof t?t:Function(t),e)},o(h),h},f=function(t){delete v[t]},"process"==n(159)(l)?o=function(t){l.nextTick(a(g,t,1))}:m&&m.now?o=function(t){m.now(a(g,t,1))}:A?(i=new A,r=i.port2,i.port1.onmessage=x,o=a(r.postMessage,r,1)):u.addEventListener&&"function"==typeof postMessage&&!u.importScripts?(o=function(t){u.postMessage(t+"","*")},u.addEventListener("message",x,!1)):o="onreadystatechange"in d("script")?function(t){c.appendChild(d("script")).onreadystatechange=function(){c.removeChild(this),g.call(t)}}:function(t){setTimeout(a(g,t,1),0)}),t.exports={set:p,clear:f}},697:function(t,e,n){var o=n(93),i=n(52)("iterator"),r=Array.prototype;t.exports=function(t){return void 0!==t&&(o.Array===t||r[i]===t)}},698:function(t,e,n){var o=n(60);t.exports=function(t,e,n,i){try{return i?e(o(n)[0],n[1]):e(n)}catch(e){var r=t.return;throw void 0!==r&&o(r.call(t)),e}}},699:function(t,e,n){var o=n(52)("iterator"),i=!1;try{var r=[7][o]();r.return=function(){i=!0},Array.from(r,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!i)return!1;var n=!1;try{var r=[7],a=r[o]();a.next=function(){return{done:n=!0}},r[o]=function(){return a},t(r)}catch(t){}return n}},702:function(t,e,n){"use strict";e.a={primary:"#000033",darkPrimary:"#01004e",secondary:"#CBAB58",warning:"#F1BF14",danger:"#FF0000"}},704:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["onClick","icon","text","styles","icon_position"]}},705:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["onClick","icon","text","styles","icon_position"]}},706:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(708),i=n.n(o);e.default={props:["type","styles","placeholder","classes","onEnter"],methods:{onChange:function(t){this.$emit("input",t.target.value)},enter:function(t){return new i.a(function(e,n){e(t)})}}}},708:function(t,e,n){t.exports={default:n(709),__esModule:!0}},709:function(t,e,n){n(326),n(321),n(322),n(717),n(718),n(719),t.exports=n(30).Promise},710:function(t,e){t.exports=function(t,e,n,o){if(!(t instanceof e)||void 0!==o&&o in t)throw TypeError(n+": incorrect invocation!");return t}},711:function(t,e,n){var o=n(160),i=n(698),r=n(697),a=n(60),s=n(323),c=n(689),d={},u={},e=t.exports=function(t,e,n,l,p){var f,A,m,h,v=p?function(){return t}:c(t),g=o(n,l,e?2:1),x=0;if("function"!=typeof v)throw TypeError(t+" is not iterable!");if(r(v)){for(f=s(t.length);f>x;x++)if((h=e?g(a(A=t[x])[0],A[1]):g(t[x]))===d||h===u)return h}else for(m=v.call(t);!(A=m.next()).done;)if((h=i(m,g,A.value,e))===d||h===u)return h};e.BREAK=d,e.RETURN=u},712:function(t,e){t.exports=function(t,e,n){var o=void 0===n;switch(e.length){case 0:return o?t():t.call(n);case 1:return o?t(e[0]):t.call(n,e[0]);case 2:return o?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return o?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return o?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},713:function(t,e,n){var o=n(39),i=n(694).set,r=o.MutationObserver||o.WebKitMutationObserver,a=o.process,s=o.Promise,c="process"==n(159)(a);t.exports=function(){var t,e,n,d=function(){var o,i;for(c&&(o=a.domain)&&o.exit();t;){i=t.fn,t=t.next;try{i()}catch(o){throw t?n():e=void 0,o}}e=void 0,o&&o.enter()};if(c)n=function(){a.nextTick(d)};else if(!r||o.navigator&&o.navigator.standalone)if(s&&s.resolve){var u=s.resolve(void 0);n=function(){u.then(d)}}else n=function(){i.call(o,d)};else{var l=!0,p=document.createTextNode("");new r(d).observe(p,{characterData:!0}),n=function(){p.data=l=!l}}return function(o){var i={fn:o,next:void 0};e&&(e.next=i),t||(t=i,n()),e=i}}},714:function(t,e,n){var o=n(55);t.exports=function(t,e,n){for(var i in e)n&&t[i]?t[i]=e[i]:o(t,i,e[i]);return t}},715:function(t,e,n){"use strict";var o=n(39),i=n(30),r=n(45),a=n(40),s=n(52)("species");t.exports=function(t){var e="function"==typeof i[t]?i[t]:o[t];a&&e&&!e[s]&&r.f(e,s,{configurable:!0,get:function(){return this}})}},716:function(t,e,n){var o=n(39),i=o.navigator;t.exports=i&&i.userAgent||""},717:function(t,e,n){"use strict";var o,i,r,a,s=n(67),c=n(39),d=n(160),u=n(684),l=n(44),p=n(53),f=n(320),A=n(710),m=n(711),h=n(693),v=n(694).set,g=n(713)(),x=n(685),C=n(691),w=n(716),B=n(692),b=c.TypeError,y=c.process,_=y&&y.versions,k=_&&_.v8||"",M=c.Promise,D="process"==u(y),E=function(){},R=i=x.f,P=!!function(){try{var t=M.resolve(1),e=(t.constructor={})[n(52)("species")]=function(t){t(E,E)};return(D||"function"==typeof PromiseRejectionEvent)&&t.then(E)instanceof e&&0!==k.indexOf("6.6")&&-1===w.indexOf("Chrome/66")}catch(t){}}(),S=function(t){var e;return!(!p(t)||"function"!=typeof(e=t.then))&&e},T=function(t,e){if(!t._n){t._n=!0;var n=t._c;g(function(){for(var o=t._v,i=1==t._s,r=0;n.length>r;)!function(e){var n,r,a,s=i?e.ok:e.fail,c=e.resolve,d=e.reject,u=e.domain;try{s?(i||(2==t._h&&N(t),t._h=1),!0===s?n=o:(u&&u.enter(),n=s(o),u&&(u.exit(),a=!0)),n===e.promise?d(b("Promise-chain cycle")):(r=S(n))?r.call(n,c,d):c(n)):d(o)}catch(t){u&&!a&&u.exit(),d(t)}}(n[r++]);t._c=[],t._n=!1,e&&!t._h&&q(t)})}},q=function(t){v.call(c,function(){var e,n,o,i=t._v,r=I(t);if(r&&(e=C(function(){D?y.emit("unhandledRejection",i,t):(n=c.onunhandledrejection)?n({promise:t,reason:i}):(o=c.console)&&o.error&&o.error("Unhandled promise rejection",i)}),t._h=D||I(t)?2:1),t._a=void 0,r&&e.e)throw e.v})},I=function(t){return 1!==t._h&&0===(t._a||t._c).length},N=function(t){v.call(c,function(){var e;D?y.emit("rejectionHandled",t):(e=c.onrejectionhandled)&&e({promise:t,reason:t._v})})},z=function(t){var e=this;e._d||(e._d=!0,e=e._w||e,e._v=t,e._s=2,e._a||(e._a=e._c.slice()),T(e,!0))},F=function(t){var e,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===t)throw b("Promise can't be resolved itself");(e=S(t))?g(function(){var o={_w:n,_d:!1};try{e.call(t,d(F,o,1),d(z,o,1))}catch(t){z.call(o,t)}}):(n._v=t,n._s=1,T(n,!1))}catch(t){z.call({_w:n,_d:!1},t)}}};P||(M=function(t){A(this,M,"Promise","_h"),f(t),o.call(this);try{t(d(F,this,1),d(z,this,1))}catch(t){z.call(this,t)}},o=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},o.prototype=n(714)(M.prototype,{then:function(t,e){var n=R(h(this,M));return n.ok="function"!=typeof t||t,n.fail="function"==typeof e&&e,n.domain=D?y.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&T(this,!1),n.promise},catch:function(t){return this.then(void 0,t)}}),r=function(){var t=new o;this.promise=t,this.resolve=d(F,t,1),this.reject=d(z,t,1)},x.f=R=function(t){return t===M||t===a?new r(t):i(t)}),l(l.G+l.W+l.F*!P,{Promise:M}),n(94)(M,"Promise"),n(715)("Promise"),a=n(30).Promise,l(l.S+l.F*!P,"Promise",{reject:function(t){var e=R(this);return(0,e.reject)(t),e.promise}}),l(l.S+l.F*(s||!P),"Promise",{resolve:function(t){return B(s&&this===a?M:this,t)}}),l(l.S+l.F*!(P&&n(699)(function(t){M.all(t).catch(E)})),"Promise",{all:function(t){var e=this,n=R(e),o=n.resolve,i=n.reject,r=C(function(){var n=[],r=0,a=1;m(t,!1,function(t){var s=r++,c=!1;n.push(void 0),a++,e.resolve(t).then(function(t){c||(c=!0,n[s]=t,--a||o(n))},i)}),--a||o(n)});return r.e&&i(r.v),n.promise},race:function(t){var e=this,n=R(e),o=n.reject,i=C(function(){m(t,!1,function(t){e.resolve(t).then(n.resolve,o)})});return i.e&&o(i.v),n.promise}})},718:function(t,e,n){"use strict";var o=n(44),i=n(30),r=n(39),a=n(693),s=n(692);o(o.P+o.R,"Promise",{finally:function(t){var e=a(this,i.Promise||r.Promise),n="function"==typeof t;return this.then(n?function(n){return s(e,t()).then(function(){return n})}:t,n?function(n){return s(e,t()).then(function(){throw n})}:t)}})},719:function(t,e,n){"use strict";var o=n(44),i=n(685),r=n(691);o(o.S,"Promise",{try:function(t){var e=i.f(this),n=r(t);return(n.e?e.reject:e.resolve)(n.v),e.promise}})},721:function(t,e,n){e=t.exports=n(443)(),e.push([t.i,".dialogueBTN[data-v-0f4cb32e]{outline:none!important;box-shadow:none!important;border:0;border-radius:40px;font-weight:500;height:45px;padding-left:20px;padding-right:20px;min-width:150px}","",{version:3,sources:["/Users/incrementtechnologiesinc./Desktop/increment/vue/mezzobooking/src/modules/generic/roundedBtn.vue"],names:[],mappings:"AACA,8BAA8B,uBAAwB,0BAA2B,SAAW,mBAAmB,gBAAgB,YAAY,kBAAkB,mBAAmB,eAAe,CAC9L",file:"roundedBtn.vue",sourcesContent:["\n.dialogueBTN[data-v-0f4cb32e]{outline:none !important;box-shadow:none !important;border:0px;border-radius:40px;font-weight:500;height:45px;padding-left:20px;padding-right:20px;min-width:150px\n}\n"],sourceRoot:""}])},722:function(t,e,n){e=t.exports=n(443)(),e.push([t.i,".dialogueBTN[data-v-3f6e8f5a]{outline:none!important;box-shadow:none!important;border:0;border-radius:40px;font-weight:500;height:45px;border-bottom-right-radius:0;padding-left:20px;padding-right:20px;min-width:150px}","",{version:3,sources:["/Users/incrementtechnologiesinc./Desktop/increment/vue/mezzobooking/src/modules/generic/dialogueBtn.vue"],names:[],mappings:"AACA,8BAA8B,uBAAwB,0BAA2B,SAAW,mBAAmB,gBAAgB,YAAY,6BAA+B,kBAAkB,mBAAmB,eAAe,CAC7N",file:"dialogueBtn.vue",sourcesContent:["\n.dialogueBTN[data-v-3f6e8f5a]{outline:none !important;box-shadow:none !important;border:0px;border-radius:40px;font-weight:500;height:45px;border-bottom-right-radius:0px;padding-left:20px;padding-right:20px;min-width:150px\n}\n"],sourceRoot:""}])},723:function(t,e,n){e=t.exports=n(443)(),e.push([t.i,".roudedInput[data-v-6c4be0d2]{outline:none!important;box-shadow:none!important;height:45px!important;border-radius:40px!important;border:1px solid #ccc!important}","",{version:3,sources:["/Users/incrementtechnologiesinc./Desktop/increment/vue/mezzobooking/src/modules/generic/roundedInput.vue"],names:[],mappings:"AACA,8BAA8B,uBAAwB,0BAA2B,sBAAuB,6BAA8B,+BAAgC,CACrK",file:"roundedInput.vue",sourcesContent:["\n.roudedInput[data-v-6c4be0d2]{outline:none !important;box-shadow:none !important;height:45px !important;border-radius:40px !important;border:1px solid #ccc !important\n}\n"],sourceRoot:""}])},727:function(t,e,n){var o=n(721);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(444)("0bbfc210",o,!0)},728:function(t,e,n){var o=n(722);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(444)("3c451556",o,!0)},729:function(t,e,n){var o=n(723);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(444)("20b18875",o,!0)},733:function(t,e,n){n(728);var o=n(319)(n(704),n(739),"data-v-3f6e8f5a",null);t.exports=o.exports},734:function(t,e,n){n(727);var o=n(319)(n(705),n(738),"data-v-0f4cb32e",null);t.exports=o.exports},735:function(t,e,n){n(729);var o=n(319)(n(706),n(740),"data-v-6c4be0d2",null);t.exports=o.exports},738:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{staticClass:"btn dialogueBTN",style:t.styles,on:{click:t.onClick}},["left"==t.icon_position?n("i",{class:t.icon,staticStyle:{"margin-right":"10px"}}):t._e(),t._v("\n    "+t._s(t.text)+" \n    "),"right"==t.icon_position?n("i",{class:t.icon,staticStyle:{"margin-left":"20px"}}):t._e()])},staticRenderFns:[]}},739:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{staticClass:"btn dialogueBTN",style:t.styles,on:{click:t.onClick}},["left"==t.icon_position?n("i",{class:t.icon,staticStyle:{"margin-right":"10px"}}):t._e(),t._v("\n    "+t._s(t.text)+" \n    "),"right"==t.icon_position?n("i",{class:t.icon,staticStyle:{"margin-left":"20px"}}):t._e()])},staticRenderFns:[]}},740:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("input",{class:"form-control roudedInput "+t.classes,style:t.styles,attrs:{type:t.type?t.type:"text",placeholder:t.placeholder},on:{input:t.onChange,keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;void 0!==t.onEnter&&t.enter(t.onEnter(e)).then(function(t){return t})}}})},staticRenderFns:[]}},799:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(161),i=n.n(o),r=n(733),a=n.n(r),s=n(735),c=n.n(s),d=n(734),u=n.n(d),l=n(702),p=n(65),f=n(38),A=n(489),m=n(68);e.default={data:function(){return{username:"",password:"",cpassword:"",email:"",config:f.default,common:A.a,type:"USER",global:m.a,isValid:!0,isEmailValid:!0,passwordRequirements:"",colors:l.a,user:p.a.user,errorMessage:null}},components:{dialogueBtn:a.a,roundedInput:c.a,roundedBtn:u.a,COLORS:l.a},methods:{login:function(t){this.$router.push("/login")},register:function(t){var e=this;if(console.log("register:::"),this.validate()){this.isValid=!0;var n={username:this.username,email:this.email,password:this.password,config:f.default,account_type:this.type,referral_code:null,status:"ADMIN"};$("#loading").css({display:"block"}),this.APIRequest("accounts/create",n).then(function(t){if($("#loading").css({display:"none"}),null!==t.error)if(100===t.error.status){var n=t.error.message;void 0!==i()(n.username)&&void 0!==n.username?e.errorMessage=n.username[0]:void 0!==i()(n.email)&&void 0!==n.email&&(e.errorMessage=n.email[0])}else null!==t.data&&t.data>0&&e.login()})}},validate:function(){this.errorMessage=null;var t=this.email,e=this.username,n=this.password,o=this.cpassword;return""===t||""===e||""===n||""===o?(this.isValid=!1,!1):e.includes(" ")?(this.isValid=!1,this.errorMessage="Username should not contain spaces.",!1):m.a.validateEmail(t)?n!==o?(m.a.validateEmail(t)&&(this.isEmailValid=!0),this.isValid=!1,!1):m.a.validatePassword(n)?(this.passwordRequirements="",!0):(m.a.validateEmail(t)&&(this.isEmailValid=!0),this.isValid=!1,this.passwordRequirements="Password should be minimum of 6 and should contain at least one digit, lower case, upper case and special character.",!1):(this.isValid=!1,this.isEmailValid=!1,!1)},forgotPassword:function(t){console.log("forgot password:::")}}}},837:function(t,e,n){e=t.exports=n(443)(),e.push([t.i,".requiredFieldError[data-v-03f64e87]{color:red;font-size:10px;margin-left:20px;margin-bottom:25px!important}.errorMessage[data-v-03f64e87]{margin-top:-14px;color:red;margin-bottom:25px!important;text-align:center}.orSeparatorA[data-v-03f64e87]{margin-top:20px;margin-bottom:15px}.orSeparatorB[data-v-03f64e87]{margin-top:15px;margin-bottom:35px}.registrationField[data-v-03f64e87]{margin-bottom:20px}.QouteText[data-v-03f64e87]{font-size:45px}.SubQoute[data-v-03f64e87]{text-align:left}.SupportingText[data-v-03f64e87]{margin-right:30%;margin-top:4%}.QouteCard[data-v-03f64e87]{width:80%!important;margin-top:10vh;margin-bottom:5vh;text-align:left;margin-left:10%}.RegisterCard[data-v-03f64e87]{margin-top:15%;width:475px;background-color:#fff;border-radius:20px;box-shadow:3px 3px 1px -2px rgba(1,0,154,.75);-webkit-box-shadow:3px 3px 1px -2px rgba(1,0,154,.75);-moz-box-shadow:3px 3px 1px -2px rgba(1,0,154,.75)}.LoginContainer[data-v-03f64e87]{min-height:91.8vh;background-color:#003;padding-top:3%}.RowContainer[data-v-03f64e87]{background-color:#003!important}.QouteCardContainer[data-v-03f64e87]{display:-ms-flexbox!important;display:flex!important;-ms-flex-pack:center!important;justify-content:center!important;-ms-flex-align:center!important;align-items:center!important;background:none}.LoginCardContainer[data-v-03f64e87]{background-color:transparent!important}.fields[data-v-03f64e87]{margin-top:30px}@media (max-width:500px){.RegisterCard[data-v-03f64e87]{width:100%}.QouteText[data-v-03f64e87]{font-size:30px}}@media (max-width:1200px){.QouteCardContainer[data-v-03f64e87]{width:90%!important}}@media (max-width:1150px){.LoginCardContainer[data-v-03f64e87],.QouteCardContainer[data-v-03f64e87]{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}}@media (max-width:950px){.QouteCardContainer[data-v-03f64e87]{-ms-flex:0 0 40%;flex:0 0 40%;max-width:40%}.LoginCardContainer[data-v-03f64e87]{-ms-flex:0 0 60%;flex:0 0 60%;max-width:60%}.QouteText[data-v-03f64e87]{font-size:35px}}@media (max-width:768px){.LoginCardContainer[data-v-03f64e87],.QouteCardContainer[data-v-03f64e87]{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.QouteText[data-v-03f64e87]{font-size:35px}.QouteCard img[data-v-03f64e87]{width:100%!important}}","",{version:3,sources:["/Users/incrementtechnologiesinc./Desktop/increment/vue/mezzobooking/src/modules/account/register.vue"],names:[],mappings:"AACA,qCAAqC,UAAU,eAAe,iBAAiB,4BAA6B,CAC3G,AACD,+BAA+B,iBAAiB,UAAU,6BAA8B,iBAAiB,CACxG,AACD,+BAA+B,gBAAgB,kBAAkB,CAChE,AACD,+BAA+B,gBAAgB,kBAAkB,CAChE,AACD,oCAAoC,kBAAkB,CACrD,AACD,4BAA4B,cAAc,CACzC,AACD,2BAA2B,eAAe,CACzC,AACD,iCAAiC,iBAAiB,aAAa,CAC9D,AACD,4BAA4B,oBAAqB,gBAAgB,kBAAkB,gBAAgB,eAAe,CACjH,AACD,+BAA+B,eAAe,YAAY,sBAAuB,mBAAmB,8CAA+C,sDAAuD,kDAAmD,CAC5P,AACD,iCAAiC,kBAAkB,sBAAsB,cAAc,CACtF,AACD,+BAA+B,+BAAgC,CAC9D,AACD,qCAAqC,8BAA+B,uBAAwB,+BAAgC,iCAAkC,gCAAiC,6BAA8B,eAAe,CAC3O,AACD,qCAAqC,sCAAuC,CAC3E,AACD,yBAAyB,eAAe,CACvC,AACD,yBACA,+BAA+B,UAAU,CACxC,AACD,4BAA4B,cAAc,CACzC,CACA,AACD,0BACA,qCAAqC,mBAAoB,CACxD,CACA,AACD,0BAGA,0EAAqC,iBAAiB,aAAa,aAAa,CAC/E,CACA,AACD,yBACA,qCAAqC,iBAAiB,aAAa,aAAa,CAC/E,AACD,qCAAqC,iBAAiB,aAAa,aAAa,CAC/E,AACD,4BAA4B,cAAc,CACzC,CACA,AACD,yBAGA,0EAAqC,kBAAkB,cAAc,cAAc,CAClF,AACD,4BAA4B,cAAc,CACzC,AACD,gCAAgC,oBAAqB,CACpD,CACA",file:"register.vue",sourcesContent:["\n.requiredFieldError[data-v-03f64e87]{color:red;font-size:10px;margin-left:20px;margin-bottom:25px !important\n}\n.errorMessage[data-v-03f64e87]{margin-top:-14px;color:red;margin-bottom:25px !important;text-align:center\n}\n.orSeparatorA[data-v-03f64e87]{margin-top:20px;margin-bottom:15px\n}\n.orSeparatorB[data-v-03f64e87]{margin-top:15px;margin-bottom:35px\n}\n.registrationField[data-v-03f64e87]{margin-bottom:20px\n}\n.QouteText[data-v-03f64e87]{font-size:45px\n}\n.SubQoute[data-v-03f64e87]{text-align:left\n}\n.SupportingText[data-v-03f64e87]{margin-right:30%;margin-top:4%\n}\n.QouteCard[data-v-03f64e87]{width:80% !important;margin-top:10vh;margin-bottom:5vh;text-align:left;margin-left:10%\n}\n.RegisterCard[data-v-03f64e87]{margin-top:15%;width:475px;background-color:white;border-radius:20px;box-shadow:3px 3px 1px -2px rgba(1,0,154,0.75);-webkit-box-shadow:3px 3px 1px -2px rgba(1,0,154,0.75);-moz-box-shadow:3px 3px 1px -2px rgba(1,0,154,0.75)\n}\n.LoginContainer[data-v-03f64e87]{min-height:91.8vh;background-color:#003;padding-top:3%\n}\n.RowContainer[data-v-03f64e87]{background-color:#003 !important\n}\n.QouteCardContainer[data-v-03f64e87]{display:-ms-flexbox !important;display:flex !important;-ms-flex-pack:center !important;justify-content:center !important;-ms-flex-align:center !important;align-items:center !important;background:none\n}\n.LoginCardContainer[data-v-03f64e87]{background-color:transparent !important\n}\n.fields[data-v-03f64e87]{margin-top:30px\n}\n@media (max-width: 500px){\n.RegisterCard[data-v-03f64e87]{width:100%\n}\n.QouteText[data-v-03f64e87]{font-size:30px\n}\n}\n@media (max-width: 1200px){\n.QouteCardContainer[data-v-03f64e87]{width:90% !important\n}\n}\n@media (max-width: 1150px){\n.QouteCardContainer[data-v-03f64e87]{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%\n}\n.LoginCardContainer[data-v-03f64e87]{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%\n}\n}\n@media (max-width: 950px){\n.QouteCardContainer[data-v-03f64e87]{-ms-flex:0 0 40%;flex:0 0 40%;max-width:40%\n}\n.LoginCardContainer[data-v-03f64e87]{-ms-flex:0 0 60%;flex:0 0 60%;max-width:60%\n}\n.QouteText[data-v-03f64e87]{font-size:35px\n}\n}\n@media (max-width: 768px){\n.QouteCardContainer[data-v-03f64e87]{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%\n}\n.LoginCardContainer[data-v-03f64e87]{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%\n}\n.QouteText[data-v-03f64e87]{font-size:35px\n}\n.QouteCard img[data-v-03f64e87]{width:100% !important\n}\n}\n"],sourceRoot:""}])},900:function(t,e,n){var o=n(837);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(444)("7d00abc4",o,!0)},983:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"LoginContainer col-sm-12"},[o("div",{staticClass:"row RowContainer"},[o("div",{staticClass:"col-sm-7 col-md-7 col-lg-7 col-xl-7 col-xs-7 QouteCardContainer mb-5"},[o("div",{staticClass:"QouteCard"},[o("img",{staticStyle:{width:"50%",height:"auto","margin-left":"6%"},attrs:{src:n(683),alt:"Image"}}),t._v(" "),o("div",{staticClass:"SubQoute",staticStyle:{"margin-top":"6%",color:"white"}})])]),t._v(" "),o("div",{staticClass:"col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xs-5 d-flex justify-content-center LoginCardContainer mb-5"},[o("div",{staticClass:"card RegisterCard"},[o("div",{staticClass:"card-body RegisterCardBody"},[t._m(0),t._v(" "),null!=t.errorMessage?o("p",{staticClass:"mb-2 pb-0 errorMessage"},[t._v(t._s(t.errorMessage))]):t._e(),t._v(" "),o("div",{staticClass:"fields"},[o("roundedInput",{class:this.isValid||""!=t.username?" registrationField":"mb-0 ",attrs:{type:"text",placeholder:"Username",styles:{border:this.isValid||""!=t.username?"none":"1px solid red !important"}},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t._v(" "),this.isValid||""!=t.username?t._e():o("p",{staticClass:"mb-0 pb-0 requiredFieldError"},[t._v("Required Field")]),t._v(" "),o("roundedInput",{class:this.isValid||""!=t.email&&t.isEmailValid?" registrationField":"mb-0 ",attrs:{type:"text",placeholder:"Email Address",styles:{border:this.isValid||""!=t.email&&t.isEmailValid?"none":"1px solid red !important"}},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),t._v(" "),this.isValid||""!=t.email&&t.isEmailValid?t._e():o("p",{staticClass:"mb-0 pb-0 requiredFieldError"},[t._v(t._s(t.isEmailValid?"Required Field":"Invalid Email"))]),t._v(" "),o("roundedInput",{class:this.isValid||""!=t.password&&t.password==t.cpassword&&""==t.passwordRequirements?" registrationField":"mb-0 ",attrs:{type:"password",placeholder:"Password",styles:{border:this.isValid||""!=t.password&&t.password==t.cpassword&&""==t.passwordRequirements?"none":"1px solid red !important"}},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),this.isValid||""!=t.password&&t.password==t.cpassword&&""==t.passwordRequirements?t._e():o("p",{staticClass:"mb-0 pb-0 requiredFieldError"},[t._v(t._s(t.password!=t.cpassword?""!=t.passwordRequirements?t.passwordRequirements:"Password Did Not Match":""!=t.passwordRequirements?t.passwordRequirements:"Required Field"))]),t._v(" "),o("roundedInput",{class:this.isValid||""!=t.password&&t.password==t.cpassword&&""==t.passwordRequirements?" registrationField":"mb-0 ",attrs:{type:"password",placeholder:"Confirm Password",styles:{border:this.isValid||""!=t.password&&t.password==t.cpassword&&""==t.passwordRequirements?"none":"1px solid red !important"}},model:{value:t.cpassword,callback:function(e){t.cpassword=e},expression:"cpassword"}}),t._v(" "),this.isValid||""!=t.password&&t.password==t.cpassword&&""==t.passwordRequirements?t._e():o("p",{staticClass:"mb-0 pb-0 requiredFieldError"},[t._v(t._s(t.password!=t.cpassword?""!=t.passwordRequirements?t.passwordRequirements:"Password Did Not Match":""!=t.passwordRequirements?t.passwordRequirements:"Required Field"))])],1),t._v(" "),o("div",{staticClass:"d-flex justify-content-end"},[o("roundedBtn",{attrs:{onClick:t.register,text:"Register",styles:{backgroundColor:t.colors.secondary,color:"white"}}})],1),t._v(" "),t._m(1),t._v(" "),o("hr"),t._v(" "),o("div",{staticClass:"col-sm-12 col-md-12 col-lg-12 d-flex justify-content-end",staticStyle:{"margin-left":"4%"}},[o("roundedBtn",{attrs:{onClick:t.login,text:"Login",styles:{backgroundColor:t.colors.primary,color:"white"}}})],1)])])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"d-flex justify-content-center pt-3 pb-4 mb-3",staticStyle:{"font-weight":"1000"}},[n("b",[t._v("Register with Mezzo Hotel")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"d-flex justify-content-center orSeparatorA"},[n("p",{staticStyle:{color:"#CBAB58"}},[t._v("Have an account?")])])}]}}});
//# sourceMappingURL=22.f88ea6f8f8b38ae05474.js.map