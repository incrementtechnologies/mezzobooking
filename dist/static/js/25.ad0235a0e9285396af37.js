webpackJsonp([25],{1023:function(t,a,n){a=t.exports=n(408)(),a.push([t.i,".holder[data-v-135a86aa],.signup-container[data-v-135a86aa]{margin-top:50px}.header-title[data-v-135a86aa]{width:90%;margin:25px 5% 0;font-size:24px;font-weight:700px}.input-holder[data-v-135a86aa]{width:90%;margin:0 5%}.form-control[data-v-135a86aa]{height:45px!important}.btn-login-primary[data-v-135a86aa]{background:#6a0090;color:#fff;height:45px!important}.btn-login-primary[data-v-135a86aa]:hover{border:1px solid #3f0050}.btn-login-danger[data-v-135a86aa]{background:red;color:#fff;height:45px!important}.btn-login-danger[data-v-135a86aa]:hover{border:1px solid #a90201}.input-group[data-v-135a86aa]{margin-top:5px;margin-bottom:5px}.site-title[data-v-135a86aa]{margin-top:25px;width:100%;float:left}.site-title img[data-v-135a86aa]{height:50px;width:auto!important;float:left;margin-right:10px}.site-title .app-name[data-v-135a86aa]{float:left}@media (max-width:991px){.custom-holder[data-v-135a86aa]{box-shadow:0 0 0 0 #fff!important;margin-top:50px!important}}","",{version:3,sources:["/Users/incrementtechnologiesinc./Desktop/increment/vue/mezzobooking/src/components/increment/basic/Verification.vue"],names:[],mappings:"AACA,4DACE,eAAiB,CAClB,AACD,+BACE,UAAW,AACX,iBAAsB,AACtB,eAAgB,AAChB,iBAAmB,CACpB,AACD,+BACE,UAAW,AACX,WAAmB,CACpB,AACD,+BACE,qBAAwB,CACzB,AACD,oCACE,mBAAoB,AACpB,WAAY,AACZ,qBAAwB,CACzB,AACD,0CACE,wBAA0B,CAC3B,AACD,mCACE,eAAoB,AACpB,WAAY,AACZ,qBAAwB,CACzB,AACD,yCACE,wBAA0B,CAC3B,AACD,8BACE,eAAgB,AAChB,iBAAmB,CACpB,AACD,6BACE,gBAAiB,AACjB,WAAY,AACZ,UAAY,CACb,AACD,iCACE,YAAa,AACb,qBAAuB,AACvB,WAAY,AACZ,iBAAmB,CACpB,AACD,uCACE,UAAY,CACb,AAED,yBACA,gCACI,kCAAoC,AACpC,yBAA4B,CAC/B,CACA",file:"Verification.vue",sourcesContent:["\n.signup-container[data-v-135a86aa], .holder[data-v-135a86aa]{\n  margin-top: 50px;\n}\n.header-title[data-v-135a86aa]{\n  width: 90%;\n  margin:  25px 5% 0 5%;\n  font-size: 24px;\n  font-weight: 700px;\n}\n.input-holder[data-v-135a86aa]{\n  width: 90%;\n  margin:  0 5% 0 5%;\n}\n.form-control[data-v-135a86aa]{\n  height: 45px !important;\n}\n.btn-login-primary[data-v-135a86aa]{\n  background: #6a0090;\n  color: #fff;\n  height: 45px !important;\n}\n.btn-login-primary[data-v-135a86aa]:hover{\n  border: solid 1px #3f0050;\n}\n.btn-login-danger[data-v-135a86aa]{\n  background: #ff0000;\n  color: #fff;\n  height: 45px !important;\n}\n.btn-login-danger[data-v-135a86aa]:hover{\n  border: solid 1px #a90201;\n}\n.input-group[data-v-135a86aa]{\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\n.site-title[data-v-135a86aa]{\n  margin-top: 25px;\n  width: 100%;\n  float: left;\n}\n.site-title img[data-v-135a86aa]{\n  height: 50px;\n  width: auto !important;\n  float: left;\n  margin-right: 10px;\n}\n.site-title .app-name[data-v-135a86aa]{\n  float: left;\n}\n/*-------------- Extra Small Screen for Mobile Phones --------------*/\n@media (max-width: 991px){\n.custom-holder[data-v-135a86aa]{\n    box-shadow: 0 0 0 0 #fff !important;\n    margin-top: 50px !important;\n}\n}\n"],sourceRoot:""}])},1084:function(t,a,n){var o=n(1023);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(409)("a75f0370",o,!0)},1165:function(t,a,n){t.exports={render:function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("div",{staticClass:"row holder"},[o("div",{staticClass:"col-md-6 col-lg-4 mx-auto signup-container"},[o("div",{staticClass:"login-wrapper"},[o("div",{staticClass:"site-title"},[o("img",{attrs:{src:n(866)}}),t._v(" "),o("span",{staticClass:"app-name"},[o("label",{staticClass:"text-primary"},[o("b",{staticClass:"text-primary"},[t._v(t._s(t.common.APP_NAME))])])])]),t._v(" "),o("br"),t._v(" "),o("br"),t._v(" "),t._m(0),t._v(" "),o("div",{staticClass:"signup-holder"},[o("br"),t._v(" "),o("div",[o("div",{staticClass:"login-spacer",staticStyle:{"margin-bottom":"25px !important","text-align":"justify"}},[t._v("\n              We send confirmation email to your email address at "),o("b",[t._v(t._s(t.email))]),t._v(" to verify if it exist.\n              Please give us a moment, it may take few minutes. Please check your email address to continue.\n            ")]),t._v(" "),o("button",{staticClass:"btn btn-login-danger btn-block btn-login login-spacer",on:{click:function(a){return t.redirect("/")}}},[t._v("Back to Login")])])])])])])},staticRenderFns:[function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("span",{staticClass:"login-spacer"},[n("h6",{staticClass:"text-center"},[t._v("\n            Email Confirmation\n          ")])])}]}},414:function(t,a,n){n(1084);var o=n(288)(n(956),n(1165),"data-v-135a86aa",null);t.exports=o.exports},470:function(t,a,n){"use strict";n(24);a.a={sidebarMenu:[{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Dashboard",icon:"fas fa-home",path:"dashboard",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Bookings",icon:"fas fa-book-open",path:"bookings",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Rooms",icon:"fas fa-building",path:"rooms",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Coupons",icon:"fas fa-gift",path:"coupons",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Customers",icon:"fas fa-address-book",path:"customers",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Accounts",icon:"fas fa-users",path:"accounts",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Settings",icon:"fas fa-cog",path:"settings",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Logout",icon:"fas fa-sign-out-alt",path:"logout",flag:!1,subMenu:null}],menuOff:[{id:1,users:"ALL",parent_id:0,description:"Dashboard",icon:"fa fa-tachometer",path:"dashboard",flag:!1,subMenu:null}],APP_NAME:"Mezzo Booking",APP_NAME_HTML:"Mezzo Booking",APP_EMAIL:"support@siml.ph",APP_SITE:"https://wearesiml.com",COMPANY:"Mezzo",COMPANY_URL:"http://wearesiml.ltd",COPYRIGHT:"Mezzo "+(new Date).getFullYear(),USER_TYPE:[{title:"USER"}],profileMenu:[{title:"My Profile",icon:"fa fa-cog",route:"/profile"}],USER_TYPE_SETTING:!1,plan:!1,broadcastingFlag:!0,header:["status","notification"],settingsMenu:[{title:"Profile",type:"profile",allowed:["cellular_number","address"]},{title:"Account",type:"account",allowed:[]},{title:"Business Setting",type:"merchant",allowed:["prefix","website","address","schedule","information"]}],settingsTabMenu:[{title:"General Rooms Limits Settings",description:"Add room limits per category",route:"/general-limit"},{title:"General Sale Settings",description:"Shows general sale per coupon",route:"/general-sales"},{title:"Room Types",description:"Add or edit room types",route:"/room-types"},{title:"Room Features",description:"Add or edit room features",route:"features"},{title:"Add-on Settings",description:"Add or edit checkout and room add-ons",route:"add-ons"}]}},866:function(t,a,n){t.exports=n.p+"static/img/logo.31d66c4.png"},956:function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=n(36),e=(n(54),n(24)),i=n(470);a.default={mounted:function(){this.email=this.$route.params.email},data:function(){return{email:this.$route.params.email,config:e.default,common:i.a}},methods:{redirect:function(t){o.a.push(t)}}}}});
//# sourceMappingURL=25.ad0235a0e9285396af37.js.map