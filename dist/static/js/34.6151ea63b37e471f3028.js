webpackJsonp([34],{1076:function(e,i,n){i=e.exports=n(410)(),i.push([e.i,".content-holder,.main-sidebar{min-height:200px;overflow:hidden;transition:all 1s ease 0s;z-index:1;margin-top:50px}.main-sidebar{overflow-y:hidden;z-index:10000}.content-holder{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.content{width:55%;padding-top:4%}.sidebar{padding-right:20px}.sidebar,.sidebar-menu{min-height:100vh;overflow-y:auto}.sidebar-menu{list-style:none;padding:0;margin:0;padding-top:20%}.sidebar-menu .header{font-weight:700;padding:15px 2%;color:#000;text-align:center}.header .switch{float:left;width:20%}.header i{font-size:24px;color:#003}.header i:hover{cursor:pointer;color:#003}.profile-photo{float:left;width:100%;height:100px;margin-top:20px}.profile-image-holder{width:100%;float:left;height:80px;text-align:center}.profile-image-holder img{width:80px;height:80px;border-radius:50%}.profile-photo .profile-icon{float:left;font-size:80px;width:100%;height:80px;margin-bottom:10px}.profile-photo .profile-status{font-size:12px!important;padding-left:0!important;padding-right:0!important}.menu-holder{width:100%;float:left;display:-ms-flexbox;display:flex;line-height:40px;overflow:hidden}.menu-holder .visible{width:10%;float:left;text-align:right;padding:12px;line-height:40px}.menu-holder label{float:left;width:86%;margin-left:4%;margin-top:0;margin-bottom:0;line-height:40px}.menu-holder-hidden i:hover,.menu-holder:hover,.menu-holder i:hover,.menu-holder label:hover{cursor:pointer;color:#003}.sub-menu{list-style:none;padding:0;margin:0;z-index:1}.sub-menu li{width:95%;float:left;height:35px;line-height:35px;margin-left:5%;color:#003}.active-menu{color:#cbab58!important}.menu-holder-hidden{width:100%;float:left;min-height:50px;line-height:50px;overflow:hidden;text-align:right}.menu-holder-hidden i{font-size:20px;padding-right:5px}@media (min-width:1200px){.main-sidebar{width:15%;float:left}.sidebar-collapse{display:block;position:fixed}.sidebar-menu .header span{display:block}.content-holder{width:85%;margin:60px 0 0;float:left;margin-left:15%}.main-sidebar.hidden{width:5%;position:fixed}.content-holder.hidden{width:94%;margin:60px 0 0 1%;float:right}}@media (min-width:992px) and (max-width:1199px){.main-sidebar{width:23%;float:left}.content-holder{width:71%;margin:60px 0 0;margin-right:1%;float:right}.main-sidebar.active{padding-left:15%}.sidebar-collapse{display:block;position:fixed}.sidebar-menu .header span{display:block}.main-sidebar.hidden{width:5%;position:fixed}.content-holder.hidden{width:94%;margin:60px 0 0 1%;float:right}}@media (max-width:991px){.main-sidebar{width:90%;position:fixed;top:0;left:0;z-index:30;background-color:rgba(0,0,0,.5);margin-top:50px;height:100vh}.content-holder{min-height:10px;width:96%;overflow-y:hidden;margin:60px 2% 0;float:left}.content{width:100%}.main-sidebar ul{background:#cbab58;width:60%;min-height:400px;height:100vh}.sm-title{text-align:center}.sidebar-menu .header span{display:none}.header .input-group{width:90%;margin:0 5%}#toggleIcon,.force-collapse{display:none}.collapse{display:none!important}.collapse.show{display:block!important}}@media (max-width:239px){.collapse{display:none!important}.collapse.show{display:block!important}.main-sidebar{width:90%;position:fixed;top:0;left:0;z-index:10;background:#fff;margin-top:100px;height:100vh;padding-top:20%}.main-sidebar ul{height:100vh}.content-holder{width:96%;margin:60px 2% 0;float:left}.header,.sm-title{display:none}.sidebar-menu li>a{padding:15px 20px 15px 15px;display:block}.sidebar-menu ul li>a{padding:10px 15px 10px 25px;display:block}.sidebar-menu .header span{display:none}.header .input-group{width:90%;margin:0 5%}#toggleIcon,.force-collapse{display:none}}","",{version:3,sources:["/Applications/XAMPP/xamppfiles/htdocs/vue/mezzobooking/src/modules/frame/Sidebar.vue"],names:[],mappings:"AACA,8BAA8B,iBAAiB,gBAAgB,0BAA0B,UAAU,eAAe,CACjH,AACD,cAAc,kBAAkB,aAAa,CAC5C,AACD,gBAAgB,oBAAoB,aAAa,sBAAsB,mBAAmB,qBAAqB,sBAAsB,CACpI,AACD,SAAS,UAAU,cAAc,CAChC,AACD,SAA0C,kBAAkB,CAC3D,AACD,uBAFS,iBAAiB,eAAgB,CAGzC,AADD,cAAc,gBAAgB,UAAY,SAAW,AAAiB,eAAgB,CACrF,AACD,sBAAsB,gBAAgB,gBAAwB,WAAW,iBAAiB,CACzF,AACD,gBAAgB,WAAW,SAAS,CACnC,AACD,UAAU,eAAe,UAAU,CAClC,AACD,gBAAgB,eAAe,UAAU,CACxC,AACD,eAAe,WAAW,WAAW,aAAa,eAAe,CAChE,AACD,sBAAsB,WAAW,WAAW,YAAY,iBAAiB,CACxE,AACD,0BAA0B,WAAW,YAAY,iBAAiB,CACjE,AACD,6BAA6B,WAAW,eAAe,WAAW,YAAY,kBAAkB,CAC/F,AACD,+BAA+B,yBAA0B,yBAA4B,yBAA4B,CAChH,AACD,aAAa,WAAW,WAAW,oBAAoB,aAAa,iBAAiB,eAAe,CACnG,AACD,sBAAsB,UAAU,WAAW,iBAAiB,aAAa,gBAAgB,CACxF,AACD,mBAAmB,WAAW,UAAU,eAAe,aAAe,gBAAkB,gBAAgB,CACvG,AACD,6FAA6F,eAAe,UAAU,CACrH,AACD,UAAU,gBAAgB,UAAY,SAAW,SAAS,CACzD,AACD,aAAa,UAAU,WAAW,YAAY,iBAAiB,eAAe,UAAU,CACvF,AACD,aAAa,uBAAwB,CACpC,AACD,oBAAoB,WAAW,WAAW,gBAAgB,iBAAiB,gBAAgB,gBAAgB,CAC1G,AACD,sBAAsB,eAAe,iBAAiB,CACrD,AACD,0BACA,cAAc,UAAU,UAAU,CACjC,AACD,kBAAkB,cAAc,cAAc,CAC7C,AACD,2BAA2B,aAAa,CACvC,AACD,gBAAgB,UAAU,gBAAwB,WAAW,eAAe,CAC3E,AACD,qBAAqB,SAAS,cAAc,CAC3C,AACD,uBAAuB,UAAU,mBAAuB,WAAW,CAClE,CACA,AACD,gDACA,cAAc,UAAU,UAAU,CACjC,AACD,gBAAgB,UAAU,gBAAwB,gBAAgB,WAAW,CAC5E,AACD,qBAAqB,gBAAgB,CACpC,AACD,kBAAkB,cAAc,cAAc,CAC7C,AACD,2BAA2B,aAAa,CACvC,AACD,qBAAqB,SAAS,cAAc,CAC3C,AACD,uBAAuB,UAAU,mBAAuB,WAAW,CAClE,CACA,AACD,yBACA,cAAc,UAAU,eAAe,MAAM,OAAO,WAAW,gCAAiC,gBAAgB,YAAY,CAC3H,AACD,gBAAgB,gBAAgB,UAAU,kBAAkB,iBAAoB,UAAU,CACzF,AACD,SAAS,UAAU,CAClB,AACD,iBAAiB,mBAAmB,UAAU,iBAAiB,YAAY,CAC1E,AACD,UAAU,iBAAiB,CAC1B,AACD,2BAA2B,YAAY,CACtC,AACD,qBAAqB,UAAU,WAAgB,CAC9C,AAGD,4BAAgB,YAAY,CAC3B,AACD,UAAU,sBAAuB,CAChC,AACD,eAAe,uBAAwB,CACtC,CACA,AACD,yBACA,UAAU,sBAAuB,CAChC,AACD,eAAe,uBAAwB,CACtC,AACD,cAAc,UAAU,eAAe,MAAM,OAAO,WAAW,gBAAgB,iBAAiB,aAAa,eAAe,CAC3H,AACD,iBAAiB,YAAY,CAC5B,AACD,gBAAgB,UAAU,iBAAoB,UAAU,CACvD,AACD,kBAAkB,YAAY,CAC7B,AACD,mBAAmB,4BAA4B,aAAa,CAC3D,AACD,sBAAsB,4BAA4B,aAAa,CAC9D,AACD,2BAA2B,YAAY,CACtC,AACD,qBAAqB,UAAU,WAAgB,CAC9C,AAGD,4BAAgB,YAAY,CAC3B,CACA",file:"Sidebar.vue",sourcesContent:["\n.main-sidebar,.content-holder{min-height:200px;overflow:hidden;transition:all 1s ease 0s;z-index:1;margin-top:50px\n}\n.main-sidebar{overflow-y:hidden;z-index:10000\n}\n.content-holder{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center\n}\n.content{width:55%;padding-top:4%\n}\n.sidebar{min-height:100vh;overflow-y:auto;padding-right:20px\n}\n.sidebar-menu{list-style:none;padding:0px;margin:0px;min-height:100vh;padding-top:20%;overflow-y:auto\n}\n.sidebar-menu .header{font-weight:700;padding:15px 2% 15px 2%;color:#000;text-align:center\n}\n.header .switch{float:left;width:20%\n}\n.header i{font-size:24px;color:#003\n}\n.header i:hover{cursor:pointer;color:#003\n}\n.profile-photo{float:left;width:100%;height:100px;margin-top:20px\n}\n.profile-image-holder{width:100%;float:left;height:80px;text-align:center\n}\n.profile-image-holder img{width:80px;height:80px;border-radius:50%\n}\n.profile-photo .profile-icon{float:left;font-size:80px;width:100%;height:80px;margin-bottom:10px\n}\n.profile-photo .profile-status{font-size:12px !important;padding-left:0px !important;padding-right:0px !important\n}\n.menu-holder{width:100%;float:left;display:-ms-flexbox;display:flex;line-height:40px;overflow:hidden\n}\n.menu-holder .visible{width:10%;float:left;text-align:right;padding:12px;line-height:40px\n}\n.menu-holder label{float:left;width:86%;margin-left:4%;margin-top:0px;margin-bottom:0px;line-height:40px\n}\n.menu-holder:hover,.menu-holder i:hover,.menu-holder label:hover,.menu-holder-hidden i:hover{cursor:pointer;color:#003\n}\n.sub-menu{list-style:none;padding:0px;margin:0px;z-index:1\n}\n.sub-menu li{width:95%;float:left;height:35px;line-height:35px;margin-left:5%;color:#003\n}\n.active-menu{color:#CBAB58 !important\n}\n.menu-holder-hidden{width:100%;float:left;min-height:50px;line-height:50px;overflow:hidden;text-align:right\n}\n.menu-holder-hidden i{font-size:20px;padding-right:5px\n}\n@media (min-width: 1200px){\n.main-sidebar{width:15%;float:left\n}\n.sidebar-collapse{display:block;position:fixed\n}\n.sidebar-menu .header span{display:block\n}\n.content-holder{width:85%;margin:60px 0px 0px 0px;float:left;margin-left:15%\n}\n.main-sidebar.hidden{width:5%;position:fixed\n}\n.content-holder.hidden{width:94%;margin:60px 0px 0px 1%;float:right\n}\n}\n@media (min-width: 992px) and (max-width: 1199px){\n.main-sidebar{width:23%;float:left\n}\n.content-holder{width:71%;margin:60px 0px 0px 0px;margin-right:1%;float:right\n}\n.main-sidebar.active{padding-left:15%\n}\n.sidebar-collapse{display:block;position:fixed\n}\n.sidebar-menu .header span{display:block\n}\n.main-sidebar.hidden{width:5%;position:fixed\n}\n.content-holder.hidden{width:94%;margin:60px 0px 0px 1%;float:right\n}\n}\n@media (max-width: 991px){\n.main-sidebar{width:90%;position:fixed;top:0;left:0;z-index:30;background-color:rgba(0,0,0,0.5);margin-top:50px;height:100vh\n}\n.content-holder{min-height:10px;width:96%;overflow-y:hidden;margin:60px 2% 0 2%;float:left\n}\n.content{width:100%\n}\n.main-sidebar ul{background:#CBAB58;width:60%;min-height:400px;height:100vh\n}\n.sm-title{text-align:center\n}\n.sidebar-menu .header span{display:none\n}\n.header .input-group{width:90%;margin:0 5% 0 5%\n}\n#toggleIcon{display:none\n}\n.force-collapse{display:none\n}\n.collapse{display:none !important\n}\n.collapse.show{display:block !important\n}\n}\n@media (max-width: 239px){\n.collapse{display:none !important\n}\n.collapse.show{display:block !important\n}\n.main-sidebar{width:90%;position:fixed;top:0;left:0;z-index:10;background:#fff;margin-top:100px;height:100vh;padding-top:20%\n}\n.main-sidebar ul{height:100vh\n}\n.content-holder{width:96%;margin:60px 2% 0 2%;float:left\n}\n.sm-title,.header{display:none\n}\n.sidebar-menu li>a{padding:15px 20px 15px 15px;display:block\n}\n.sidebar-menu ul li>a{padding:10px 15px 10px 25px;display:block\n}\n.sidebar-menu .header span{display:none\n}\n.header .input-group{width:90%;margin:0 5% 0 5%\n}\n#toggleIcon{display:none\n}\n.force-collapse{display:none\n}\n}\n"],sourceRoot:""}])},1137:function(e,i,n){var t=n(1076);"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);n(411)("91cfbc84",t,!0)},1221:function(e,i){e.exports={render:function(){var e=this,i=e.$createElement,n=e._self._c||i;return n("div",{staticClass:"system-body"},[n("div",{staticClass:"main-sidebar sidebar-collapse navbar-collapse collapse",class:e.hide,attrs:{id:"idfactory"}},[n("div",{staticClass:"sidebar"},[n("ul",{staticClass:"sidebar-menu",style:"hidden"===e.hide?"margin-top: 50%;padding-right: 35px":null},[n("li",{staticClass:"header"},[!0===e.menuFlag?n("span",{staticClass:"profile-photo"},[null!==e.user.profile?n("span",{staticClass:"profile-image-holder"},[n("img",{attrs:{src:e.config.BACKEND_URL+e.user.profile.url}})]):n("i",{staticClass:"fas fa-user-circle profile-icon"}),e._v(" "),"VERIFIED"===e.user.status?n("i",{staticClass:"fas fa-check text-primary profile-status"}):e._e(),e._v("\n                Hi "+e._s(e.user.username)+"!\n              ")]):e._e(),e._v(" "),n("i",{class:e.toggleSidebar+" pull-right",attrs:{"aria-hidden":"true",id:"toggleIcon"},on:{click:function(i){return e.changeToggleSidebarIcon()}}})]),e._v(" "),e._l(e.menu,function(i,t){return((i.accountType===e.user.type||"ALL"===i.accountType)&&"ADMIN"!==e.user.type||"ADMIN"===e.user.type&&!0===i.showOnAdmin)&&("ALL"===i.accountStatus||null===e.user.subAccount||null!==e.user.subAccount&&e.user.subAccount.status===i.accountStatus)&&!0===e.menuFlag?n("li",{key:t,staticClass:"menu-holder",class:i.flag||e.$route.path==="/"+i.path?" active-menu":"",on:{click:function(n){"Logout"===i.description?e.logOut():e.setActive(t)}}},[n("i",{staticClass:" visible",class:i.icon,style:i.flag||e.$route.path==="/"+i.path?" ":" color:gray"}),e._v(" "),n("label",[e._v(e._s(i.description))]),e._v(" "),null!==i.subMenu?n("ul",{staticClass:"sub-menu"},e._l(i.subMenu,function(i,a){return(i.users===e.user.type||"ALL"===i.users)&&"ADMIN"!==i.type||"ADMIN"===i.type?n("li",{class:{"active-menu":!0===i.flag},on:{click:function(i){return e.setActiveSubMenu(t,a)}}},[n("i",{staticClass:" visible",class:i.icon}),e._v(" "),n("label",[e._v(e._s(i.description))])]):e._e()}),0):e._e()]):e._e()}),e._v(" "),e._l(e.menuOff,function(i,t){return((i.accountType===e.user.type||"ALL"===i.accountType)&&"ADMIN"!==e.user.type||"ADMIN"===e.user.type&&!0===i.showOnAdmin)&&!1===e.menuFlag?n("li",{staticClass:"menu-holder-hidden",class:{"active-menu":!0===i.flag},on:{click:function(i){return e.setActiveOff(t)}}},[n("i",{staticClass:" visible",class:i.icon,style:i.flag||e.$route.path==="/"+i.path?" ":" color:gray"})]):e._e()})],2)])]),e._v(" "),null!==e.confirmation.message?n("div",{staticClass:"modal",attrs:{id:"timerModal"}},[n("div",{staticClass:"modal-dialog"},[n("div",{staticClass:"modal-content"},[e._m(0),e._v(" "),n("div",{staticClass:"modal-body"},[e._v("\n            "+e._s(e.confirmation.message)+"\n          ")]),e._v(" "),e._m(1)])])]):e._e(),e._v(" "),n("div",{staticClass:"content-holder",class:e.hide},[n("div",{staticClass:"content"},[n("transition",[n("router-view")],1)],1)])])},staticRenderFns:[function(){var e=this,i=e.$createElement,n=e._self._c||i;return n("div",{staticClass:"modal-header"},[n("h4",{staticClass:"modal-title"},[n("i",{staticClass:"fas fa-warning text-danger"}),e._v(" Confirmation!")]),e._v(" "),n("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal"}},[e._v("×")])])},function(){var e=this,i=e.$createElement,n=e._self._c||i;return n("div",{staticClass:"modal-footer"},[n("button",{staticClass:"btn btn-primary",attrs:{type:"button","data-dismiss":"modal"}},[e._v("Ok")])])}]}},437:function(e,i,n){n(1137);var t=n(288)(n(997),n(1221),null,null);e.exports=t.exports},472:function(e,i,n){"use strict";n(24);i.a={sidebarMenu:[{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Dashboard",icon:"fas fa-home",path:"dashboard",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Bookings",icon:"fas fa-book-open",path:"bookings",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Rooms",icon:"fas fa-building",path:"rooms",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Coupons",icon:"fas fa-gift",path:"coupons",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Customers",icon:"fas fa-address-book",path:"customers",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Accounts",icon:"fas fa-users",path:"accounts",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Settings",icon:"fas fa-cog",path:"settings",flag:!1,subMenu:null},{accountType:"ADMIN",showOnAdmin:!0,accountStatus:"ADMIN",description:"Logout",icon:"fas fa-sign-out-alt",path:"logout",flag:!1,subMenu:null}],menuOff:[{id:1,users:"ALL",parent_id:0,description:"Dashboard",icon:"fa fa-tachometer",path:"dashboard",flag:!1,subMenu:null}],APP_NAME:"Mezzo Booking",APP_NAME_HTML:"Mezzo Booking",APP_EMAIL:"support@siml.ph",APP_SITE:"https://wearesiml.com",COMPANY:"Mezzo",COMPANY_URL:"http://wearesiml.ltd",COPYRIGHT:"Mezzo "+(new Date).getFullYear(),USER_TYPE:[{title:"USER"}],profileMenu:[{title:"My Profile",icon:"fa fa-cog",route:"/profile"}],USER_TYPE_SETTING:!1,plan:!1,broadcastingFlag:!0,header:["status","notification"],settingsMenu:[{title:"Profile",type:"profile",allowed:["cellular_number","address"]},{title:"Account",type:"account",allowed:[]},{title:"Business Setting",type:"merchant",allowed:["prefix","website","address","schedule","information"]}],settingsTabMenu:[{title:"General Rooms Limits Settings",description:"Receives email address every time there’s a login of the account.",route:"/general-limit"},{title:"General Sale Settings",description:"Receives email address every time there’s a login of the account.",route:"/general-sales"},{title:"Room Types",description:"Add or edit room types",route:"/room-types"},{title:"Room Features",description:"Add or edit room features",route:"features"},{title:"Add-on Settings",description:"Add or edit checkout and room add-ons",route:"add-ons"}]}},997:function(e,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var t=n(54),a=n(24),A=n(472),o=n(36);i.default={mounted:function(){},data:function(){return{user:t.a.user,config:a.default,menu:A.a.sidebarMenu,menuOff:A.a.sidebarMenu,toggleSidebar:"fas fa-toggle-on",hide:"",flag:!1,confirmation:{message:null,action:null},prevMenu:0,subPrevMenu:0,menuFlag:!0}},components:{},watch:{$route:function(e,i){for(var n=null,t=0;t<A.a.sidebarMenu.length&&!n;t++){var a=A.a.sidebarMenu[t];e.path==="/"+a.path&&(n=t)}null!==n?this.setActiveOnWatch(n,e.path):null!==this.prevMenu&&(this.menu[this.prevMenu].flag=!1)}},methods:{setActive:function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.prevMenu!==e&&(this.menu[this.prevMenu].flag=!1,this.menu[e].flag=!0,null!==this.menu[this.prevMenu].subMenu&&(this.menu[this.prevMenu].subMenu[this.subPrevMenu].flag=!1),this.prevMenu=e),null===this.menu[e].subMenu&&(o.a.push("/"+this.menu[this.prevMenu].path),$(".navbar-collapse").collapse("hide"))},logOut:function(){t.a.deaunthenticate()},setActiveOnWatch:function(e,i){this.prevMenu!==e&&(this.menu[this.prevMenu].flag=!1,this.menu[e].flag=!0,null!==this.menu[this.prevMenu].subMenu&&(this.menu[this.prevMenu].subMenu[this.subPrevMenu].flag=!1),this.prevMenu=e),null===this.menu[e].subMenu&&(o.a.push(i),$(".navbar-collapse").collapse("hide"))},setActiveOff:function(e){this.prevMenu!==e&&(this.menuOff[this.prevMenu].flag=!1,this.menuOff[e].flag=!0,this.prevMenu=e),null===this.menuOff[e].subMenu&&(o.a.push("/"+this.menuOff[this.prevMenu].path),$(".navbar-collapse").collapse("hide"))},setActiveSubMenu:function(e,i){this.prevMenu!==e?(this.menu[this.prevMenu].flag=!1,this.menu[e].flag=!0,null!==this.menu[e].subMenu&&(this.menu[e].subMenu[i].flag=!0),null!==this.menu[this.prevMenu].subMenu&&(this.menu[this.prevMenu].subMenu[this.subPrevMenu].flag=!1),this.prevMenu=e,this.subPrevMenu=i):this.subPrevMenu!==i?(this.menu[this.prevMenu].subMenu[this.subPrevMenu].flag=!1,this.menu[e].subMenu[i].flag=!0,this.subPrevMenu=i):this.subPrevMenu=i,o.a.push("/"+this.menu[this.prevMenu].subMenu[this.subPrevMenu].path),$(".navbar-collapse").collapse("hide")},changeToggleSidebarIcon:function(){!1===this.menuFlag?(this.menuOff[this.prevMenu].flag=!1,this.prevMenu=0):(this.menu[this.prevMenu].flag=!1,null!==this.menu[this.prevMenu].subMenu&&(this.menu[this.prevMenu].subMenu[this.subPrevMenu].flag=!1),this.prevMenu=0,this.subPrevMenu=0),this.menuFlag=!this.menuFlag,this.toggleSidebar=!1===this.menuFlag?"fas fa-toggle-off":"fas fa-toggle-on",this.hide=!1===this.menuFlag?"hidden":""}}}}});
//# sourceMappingURL=34.6151ea63b37e471f3028.js.map