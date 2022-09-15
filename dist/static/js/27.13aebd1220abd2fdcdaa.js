webpackJsonp([27],{448:function(e,t,s){s(913);var a=s(319)(s(772),s(996),"data-v-254578b0",null);e.exports=a.exports},489:function(e,t,s){"use strict";s(38);t.a={sidebarMenu:[{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Dashboard",icon:"fas fa-home",path:"dashboard",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Bookings",icon:"fas fa-book-open",path:"bookings",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Room Type",icon:"fas fa-building",path:"room-types",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Calendar",icon:"fas fa-calendar",path:"calendar",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Coupons",icon:"fas fa-gift",path:"coupons",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Customers",icon:"fas fa-address-book",path:"customers",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Accounts",icon:"fas fa-users",path:"accounts",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Settings",icon:"fas fa-cog",path:"settings",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Logout",icon:"fas fa-sign-out-alt",path:"logout",flag:!1,subMenu:null}],menuOff:[{id:1,users:"ALL",parent_id:0,description:"Dashboard",icon:"fa fa-tachometer",path:"dashboard",flag:!1,subMenu:null}],APP_NAME:"Mezzo Booking",APP_NAME_HTML:"Mezzo Booking",APP_EMAIL:"support@siml.ph",APP_SITE:"https://wearesiml.com",COMPANY:"Mezzo",COMPANY_URL:"http://wearesiml.ltd",COPYRIGHT:"Mezzo "+(new Date).getFullYear(),USER_TYPE:[{title:"USER"}],profileMenu:[{title:"My Profile",icon:"fa fa-cog",route:"/profile"}],USER_TYPE_SETTING:!1,plan:!1,broadcastingFlag:!0,header:["status","notification"],settingsMenu:[{title:"Profile",type:"profile",allowed:["cellular_number","address"]},{title:"Account",type:"account",allowed:[]},{title:"Business Setting",type:"merchant",allowed:["prefix","website","address","schedule","information"]}],settingsTabMenu:[{title:"General Sale Settings",description:"Shows general sale per coupon",route:"/general-sales"},{title:"Room Type Features",description:"Add or edit room features",route:"features"},{title:"Rates",description:"Add or edit your rates in room-types",route:"rates"}]}},683:function(e,t,s){e.exports=s.p+"static/img/logo.31d66c4.png"},772:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(161),r=s.n(a),n=s(51),i=s(65),o=s(38),l=s(489);t.default={mounted:function(){},data:function(){return{username:"",email:"",password:"",cpassword:"",type:"PARTNER",errorMessage:null,errorMessage2:null,errorMessage3:null,errorMessage4:null,errorMessage5:null,errorMessage6:null,errorMessage7:null,successMessage:null,user:i.a.user,tokenData:i.a.tokenData,flag:!1,schools:null,schoolIndex:null,common:l.a,visibility:"password",visibilityC:"password"}},methods:{strong:function(){this.successMessage="Strong password."},showPassword:function(e){"password"===e?this.visibility="text":this.visibilityC="text"},hidePassword:function(e){"cpassword"===e?this.visibilityC="password":this.visibility="password"},signUp:function(){var e=this;this.validate();var t={username:this.username,email:this.email,password:this.password,config:o.default,account_type:this.type,referral_code:null,status:"ADMIN"};null===this.errorMessage&&null===this.errorMessage2&&null===this.errorMessage3&&null===this.errorMessage4&&null===this.errorMessage5&&null===this.errorMessage6&&null===this.errorMessage7&&($("#loading").css({display:"block"}),this.APIRequest("accounts/create",t).then(function(t){if($("#loading").css({display:"none"}),null!==t.error)if(100===t.error.status){var s=t.error.message;void 0!==r()(s.username)&&void 0!==s.username?e.errorMessage=s.username[0]:void 0!==r()(s.email)&&void 0!==s.email&&(e.errorMessage=s.email[0])}else null!==t.data&&t.data>0&&e.login()}))},redirect:function(e){n.a.push(e)},validate:function(e){this.successMessage=null;var t=/\s/;"username"===e?(this.errorMessage=null,t.test(this.username)?this.errorMessage="Username should not contain a space.":this.username.length<6?this.errorMessage2="Username must be atleast 6 characters.":(this.errorMessage=null,this.errorMessage2=null)):"email"===e?(this.errorMessage3=null,!1===i.a.validateEmail(this.email)?this.errorMessage3="You have entered an invalid email address.":this.errorMessage3=null):"password"===e?(this.errorMessage4=null,this.password.length<l.a.passwordLimit?this.errorMessage4="Password must be atleast "+l.a.passwordLimit+" characters.":/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(this.password)?(this.strong(),this.errorMessage4=null,this.errorMessage5=null):this.errorMessage5="Password must be alphanumeric characters. It should contain 1 number, 1 special character and 1 capital letter."):"cpassword"===e?(this.errorMessage6=null,this.successMessage=null,0!==this.password.localeCompare(this.cpassword)?this.errorMessage6="Password did not match.":this.errorMessage6=null):this.username.length>=6&&null!==this.email&&null!==this.password&&this.password.length>=6&&0===this.password.localeCompare(this.cpassword)&&null!==this.type&&!0===i.a.validateEmail(this.email)?this.errorMessage=null:(this.errorMessage7="Please fill in all required fields.",this.errorMessage7=null)},login:function(){var e=this;i.a.authenticate(this.username,this.password,function(e){n.a.push("dashboard")},function(t,s){e.errorMessage=401===s?"Your username and password did not match.":"Cannot log in? Contact us through email: support@idfactories.com"})}}}},850:function(e,t,s){t=e.exports=s(443)(),t.push([e.i,".holder[data-v-254578b0],.signup-container[data-v-254578b0]{margin-top:25px}.signup-header[data-v-254578b0]{height:100px;color:#060;width:100%;float:left;text-align:center}.signup-header img[data-v-254578b0]{height:100px!important;width:auto!important}.signup-header img[data-v-254578b0]:hover{cursor:pointer}.header-title[data-v-254578b0]{width:90%;margin:25px 5% 0;font-size:24px;font-weight:700px}.signup-holder[data-v-254578b0]{width:80%;margin:0 10%;float:left}.input-holder[data-v-254578b0]{width:90%;margin:0 5%}.form-control[data-v-254578b0]{height:45px!important}.btn[data-v-254578b0]{height:50px!important}.input-group-addon[data-v-254578b0]{width:15%!important;text-align:center!important;padding:0!important;display:block!important;line-height:43px!important}.input-group[data-v-254578b0]{margin-top:5px;margin-bottom:5px}.site-title[data-v-254578b0]{margin-top:25px;width:100%;float:left}.site-title img[data-v-254578b0]{width:50px;float:left;margin-right:10px}.site-title .app-name[data-v-254578b0]{float:left}.account-type[data-v-254578b0]{width:120px!important}@media (max-width:991px){.custom-holder[data-v-254578b0]{box-shadow:0 0 0 0 #fff!important;margin-top:50px!important}}","",{version:3,sources:["/Users/incrementtechnologiesinc./Desktop/increment/vue/mezzobooking/src/components/increment/basic/SignupPartner.vue"],names:[],mappings:"AACA,4DACE,eAAiB,CAClB,AACD,gCACE,aAAc,AACd,WAAe,AACf,WAAY,AACZ,WAAY,AACZ,iBAAmB,CACpB,AACD,oCACE,uBAAyB,AACzB,oBAAuB,CACxB,AACD,0CACE,cAAgB,CACjB,AACD,+BACE,UAAW,AACX,iBAAsB,AACtB,eAAgB,AAChB,iBAAmB,CACpB,AACD,gCACE,UAAW,AACX,aAAoB,AACpB,UAAY,CACb,AACD,+BACE,UAAW,AACX,WAAmB,CACpB,AACD,+BACE,qBAAwB,CACzB,AACD,sBACE,qBAAwB,CACzB,AACD,oCACE,oBAAsB,AACtB,4BAA8B,AAC9B,oBAAwB,AACxB,wBAA0B,AAC1B,0BAA6B,CAC9B,AACD,8BACE,eAAgB,AAChB,iBAAmB,CACpB,AACD,6BACE,gBAAiB,AACjB,WAAY,AACZ,UAAY,CACb,AACD,iCAEE,WAAY,AACZ,WAAY,AACZ,iBAAmB,CACpB,AACD,uCACE,UAAY,CACb,AACD,+BACE,qBAAwB,CACzB,AAED,yBACA,gCACI,kCAAoC,AACpC,yBAA4B,CAC/B,CACA",file:"SignupPartner.vue",sourcesContent:["\n.signup-container[data-v-254578b0], .holder[data-v-254578b0]{\n  margin-top: 25px;\n}\n.signup-header[data-v-254578b0]{\n  height: 100px;\n  color: #006600;\n  width: 100%;\n  float: left;\n  text-align: center;\n}\n.signup-header img[data-v-254578b0]{\n  height: 100px !important;\n  width: auto !important;\n}\n.signup-header img[data-v-254578b0]:hover{\n  cursor: pointer;\n}\n.header-title[data-v-254578b0]{\n  width: 90%;\n  margin:  25px 5% 0 5%;\n  font-size: 24px;\n  font-weight: 700px;\n}\n.signup-holder[data-v-254578b0]{\n  width: 80%;\n  margin: 0 10% 0 10%;\n  float: left;\n}\n.input-holder[data-v-254578b0]{\n  width: 90%;\n  margin:  0 5% 0 5%;\n}\n.form-control[data-v-254578b0]{\n  height: 45px !important;\n}\n.btn[data-v-254578b0]{\n  height: 50px !important;\n}\n.input-group-addon[data-v-254578b0]{\n  width: 15% !important;\n  text-align: center !important;\n  padding: 0px !important;\n  display: block !important;\n  line-height: 43px !important;\n}\n.input-group[data-v-254578b0]{\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\n.site-title[data-v-254578b0]{\n  margin-top: 25px;\n  width: 100%;\n  float: left;\n}\n.site-title img[data-v-254578b0]{\n  width: 50px;\n  width: 50px;\n  float: left;\n  margin-right: 10px;\n}\n.site-title .app-name[data-v-254578b0]{\n  float: left;\n}\n.account-type[data-v-254578b0]{\n  width: 120px !important;\n}\n/*-------------- Extra Small Screen for Mobile Phones --------------*/\n@media (max-width: 991px){\n.custom-holder[data-v-254578b0]{\n    box-shadow: 0 0 0 0 #fff !important;\n    margin-top: 50px !important;\n}\n}\n"],sourceRoot:""}])},913:function(e,t,s){var a=s(850);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);s(444)("5fc0234c",a,!0)},996:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row holder"},[a("div",{staticClass:"col-md-6 col-lg-4 mx-auto signup-container"},[a("div",{staticClass:"signup-wrapper"},[a("div",{staticClass:"signup-header",staticStyle:{"margin-top":"50px"}},[a("img",{attrs:{src:s(683)},on:{click:function(t){return e.redirect("/")}}})]),e._v(" "),a("span",{staticStyle:{width:"100%",float:"left","text-align":"center","font-size":"20px","margin-bottom":"20px"}},[e._v("\n          Register as partner to "),a("b",{staticClass:"text-primary"},[e._v(e._s(e.common.APP_NAME))])]),e._v(" "),a("div",{staticClass:"signup-holder"},[null!==e.errorMessage?a("div",{staticClass:"login-message-holder login-spacer text-center"},[a("span",{staticClass:"text-danger text-center"},[a("b",[e._v("Oops!")]),e._v(" "+e._s(e.errorMessage))])]):e._e(),e._v(" "),null!==e.errorMessage2?a("div",{staticClass:"login-message-holder login-spacer text-center"},[a("span",{staticClass:"text-danger text-center"},[a("b",[e._v("Oops!")]),e._v(" "+e._s(e.errorMessage2))])]):e._e(),e._v(" "),null!==e.errorMessage3?a("div",{staticClass:"login-message-holder login-spacer text-center"},[a("span",{staticClass:"text-danger text-center"},[a("b",[e._v("Oops!")]),e._v(" "+e._s(e.errorMessage3))])]):e._e(),e._v(" "),null!==e.errorMessage4?a("div",{staticClass:"login-message-holder login-spacer text-center"},[a("span",{staticClass:"text-danger text-center"},[a("b",[e._v("Oops!")]),e._v(" "+e._s(e.errorMessage4))])]):e._e(),e._v(" "),null!==e.errorMessage5?a("div",{staticClass:"login-message-holder login-spacer text-center"},[a("span",{staticClass:"text-danger text-center"},[a("b",[e._v("Oops!")]),e._v(" "+e._s(e.errorMessage5))])]):e._e(),e._v(" "),null!==e.errorMessage6?a("div",{staticClass:"login-message-holder login-spacer text-center"},[a("span",{staticClass:"text-danger text-center"},[a("b",[e._v("Oops!")]),e._v(" "+e._s(e.errorMessage6))])]):e._e(),e._v(" "),null!==e.errorMessage7?a("div",{staticClass:"login-message-holder login-spacer text-center"},[a("span",{staticClass:"text-danger text-center"},[a("b",[e._v("Oops!")]),e._v(" "+e._s(e.errorMessage7))])]):e._e(),e._v(" "),null!==e.successMessage?a("div",{staticClass:"login-message-holder login-spacer text-center"},[a("span",{staticClass:"text-success text-center"},[a("b",[e._v("Wow!")]),e._v(" "+e._s(e.successMessage))])]):e._e(),e._v(" "),a("div",[a("div",{staticClass:"input-group login-spacer"},[e._m(0),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"form-control form-control-login",attrs:{type:"text",placeholder:"Username","aria-describedby":"addon-1"},domProps:{value:e.username},on:{keyup:function(t){return e.validate("username")},input:function(t){t.target.composing||(e.username=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input-group login-spacer"},[e._m(1),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control form-control-login",attrs:{type:"text",placeholder:"Email","aria-describedby":"addon-1"},domProps:{value:e.email},on:{keyup:function(t){return e.validate("email")},input:function(t){t.target.composing||(e.email=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input-group"},[e._m(2),e._v(" "),"checkbox"===e.visibility?a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-control form-control-login",staticStyle:{"border-right-style":"none"},attrs:{placeholder:"Password","aria-describedby":"addon-2",type:"checkbox"},domProps:{checked:Array.isArray(e.password)?e._i(e.password,null)>-1:e.password},on:{keyup:function(t){return e.validate("password")},change:function(t){var s=e.password,a=t.target,r=!!a.checked;if(Array.isArray(s)){var n=e._i(s,null);a.checked?n<0&&(e.password=s.concat([null])):n>-1&&(e.password=s.slice(0,n).concat(s.slice(n+1)))}else e.password=r}}}):"radio"===e.visibility?a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-control form-control-login",staticStyle:{"border-right-style":"none"},attrs:{placeholder:"Password","aria-describedby":"addon-2",type:"radio"},domProps:{checked:e._q(e.password,null)},on:{keyup:function(t){return e.validate("password")},change:function(t){e.password=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-control form-control-login",staticStyle:{"border-right-style":"none"},attrs:{placeholder:"Password","aria-describedby":"addon-2",type:e.visibility},domProps:{value:e.password},on:{keyup:function(t){return e.validate("password")},input:function(t){t.target.composing||(e.password=t.target.value)}}}),e._v(" "),a("span",{staticClass:"input-group-addon",staticStyle:{background:"white"}},["password"==e.visibility?a("i",{staticClass:"fa fa-eye",attrs:{"aria-hidden":"true"},on:{click:function(t){return e.showPassword("password")}}}):e._e(),e._v(" "),"text"==e.visibility?a("i",{staticClass:"fa fa-eye-slash",attrs:{"aria-hidden":"true"},on:{click:function(t){return e.hidePassword("password")}}}):e._e()])]),e._v(" "),a("div",{staticClass:"input-group login-spacer"},[e._m(3),e._v(" "),"checkbox"===e.visibilityC?a("input",{directives:[{name:"model",rawName:"v-model",value:e.cpassword,expression:"cpassword"}],staticClass:"form-control form-control-login",staticStyle:{"border-right-style":"none"},attrs:{placeholder:"Confirm Password","aria-describedby":"addon-2",type:"checkbox"},domProps:{checked:Array.isArray(e.cpassword)?e._i(e.cpassword,null)>-1:e.cpassword},on:{keyup:function(t){return e.validate("cpassword")},change:function(t){var s=e.cpassword,a=t.target,r=!!a.checked;if(Array.isArray(s)){var n=e._i(s,null);a.checked?n<0&&(e.cpassword=s.concat([null])):n>-1&&(e.cpassword=s.slice(0,n).concat(s.slice(n+1)))}else e.cpassword=r}}}):"radio"===e.visibilityC?a("input",{directives:[{name:"model",rawName:"v-model",value:e.cpassword,expression:"cpassword"}],staticClass:"form-control form-control-login",staticStyle:{"border-right-style":"none"},attrs:{placeholder:"Confirm Password","aria-describedby":"addon-2",type:"radio"},domProps:{checked:e._q(e.cpassword,null)},on:{keyup:function(t){return e.validate("cpassword")},change:function(t){e.cpassword=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:e.cpassword,expression:"cpassword"}],staticClass:"form-control form-control-login",staticStyle:{"border-right-style":"none"},attrs:{placeholder:"Confirm Password","aria-describedby":"addon-2",type:e.visibilityC},domProps:{value:e.cpassword},on:{keyup:function(t){return e.validate("cpassword")},input:function(t){t.target.composing||(e.cpassword=t.target.value)}}}),e._v(" "),a("span",{staticClass:"input-group-addon",staticStyle:{background:"white"}},["password"==e.visibilityC?a("i",{staticClass:"fa fa-eye",attrs:{"aria-hidden":"true"},on:{click:function(t){return e.showPassword("cpassword")}}}):e._e(),e._v(" "),"text"==e.visibilityC?a("i",{staticClass:"fa fa-eye-slash",attrs:{"aria-hidden":"true"},on:{click:function(t){return e.hidePassword("cpassword")}}}):e._e()])]),e._v(" "),a("button",{staticClass:"btn btn-primary btn-block login-spacer",on:{click:function(t){return e.signUp()}}},[e._v("Signup")]),e._v(" "),a("button",{staticClass:"btn btn-danger btn-block login-spacer",on:{click:function(t){return e.redirect("/login")}}},[e._v("Back to Login")])])])])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticClass:"input-group-addon",attrs:{id:"addon-1"}},[s("i",{staticClass:"fa fa-user"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticClass:"input-group-addon",attrs:{id:"addon-1"}},[s("i",{staticClass:"fa fa-envelope"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticClass:"input-group-addon",attrs:{id:"addon-2"}},[s("i",{staticClass:"fa fa-key"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticClass:"input-group-addon",attrs:{id:"addon-2"}},[s("i",{staticClass:"fa fa-key"})])}]}}});
//# sourceMappingURL=27.13aebd1220abd2fdcdaa.js.map