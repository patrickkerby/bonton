/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/routes/bakingList.js":
/*!**************************************!*\
  !*** ./scripts/routes/bakingList.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // JavaScript to be fired on the lists page
  },
  finalize: function finalize() {
    // JavaScript to be fired on the lists page, after the init JS
    $(document).ready(function() {
      $.noConflict();
      $('#lists').DataTable(
        {
          'paging': false,
          'info': false,
          'order': [[ 1, 'desc' ], [ 0, 'asc' ]],
        }     
      );      
    });
  },
});


/***/ }),

/***/ "./scripts/routes/breadClubList.js":
/*!*****************************************!*\
  !*** ./scripts/routes/breadClubList.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // JavaScript to be fired on the lists page
  },
  finalize: function finalize() {
    // JavaScript to be fired on the lists page, after the init JS
    $(document).ready(function() {
      $.noConflict();
      $('#lists-Tuesday').DataTable(
        {
          'paging': false,
          'info': false,
          'order': [[1, 'asc']],
          'dom': 'Bfrtip',
          'buttons': [
            'copy',
            'csv',
            'pdf',
            'print' ],
        }
      );
      $('#lists-Thursday').DataTable(
        {
          'paging': false,
          'info': false,
          'order': [[1, 'asc']],
          'dom': 'Bfrtip',
          'buttons': [
            'copy',
            'csv',
            'pdf',
            'print' ],
        }
      );
      $('#lists').DataTable(
        {
          'paging': false,
          'info': false,
          'dom': 'Bfrtip',
          'buttons': [
            'copy',
            'csv',
            'pdf',
            'print' ],
        }
      );
  });   
  },
});


/***/ }),

/***/ "./scripts/routes/breadClubSchedule.js":
/*!*********************************************!*\
  !*** ./scripts/routes/breadClubSchedule.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // JavaScript to be fired on the lists page
  },
  finalize: function finalize() {
    // JavaScript to be fired on the lists page, after the init JS
    $(document).ready(function() {
      $.noConflict();
      $('#lists-Tuesday').DataTable(
        {
          'paging': false,
          'info': false,
          'dom': 'rtip',
          'bFilter': false,
        }
      );
      $('#lists-Thursday').DataTable(
        {
          'paging': false,
          'info': false,
          'dom': 'rtip',
          'bFilter': false,
        }
      );
  });   
  },
});


/***/ }),

/***/ "./scripts/routes/deliveryExport.js":
/*!******************************************!*\
  !*** ./scripts/routes/deliveryExport.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // JavaScript to be fired on the lists page
  },
  finalize: function finalize() {
    // JavaScript to be fired on the lists page, after the init JS
    $(document).ready(function() {
      $.noConflict();
  
      $('#lists').DataTable(
        {
          'paging': false,
          'info': false,
          'order': [[0, 'asc']],
          'columnDefs': [ {
            'targets': [0,2,3,4], /* column index */
            'orderable': true, /* true or false */
          }],
          'dom': 'Bfrtip',
          'buttons': [
            {
                'extend': 'csv', 
                'exportOptions': {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                },
            } ],
        }
      );
  });   
  },
});


/***/ }),

/***/ "./scripts/routes/groceryList.js":
/*!***************************************!*\
  !*** ./scripts/routes/groceryList.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // JavaScript to be fired on the lists page
  },
  finalize: function finalize() {
    // JavaScript to be fired on the lists page, after the init JS
    $(document).ready(function() {
      $.noConflict();
       

    
      
      var groupColumn = 0;
      var table = $('#lists').DataTable({
          'columnDefs': [
              { 'visible': false, 'targets': groupColumn } ],
          'order': [[ groupColumn, 'asc' ]],
          'rowGroup': [
            {'dataSrc': 'product'} ],
          'paging': false,
      } );
  
      // Order by the grouping
      $('#lists tbody').on( 'click', 'tr.group', function () {
          var currentOrder = table.order()[0];
          if ( currentOrder[0] === groupColumn && currentOrder[1] === 'asc' ) {
              table.order( [ groupColumn, 'desc' ] ).draw();
          }
          else {
              table.order( [ groupColumn, 'asc' ] ).draw();
          }
      } );
    });
  },
});


/***/ }),

/***/ "./scripts/routes/inventoryList.js":
/*!*****************************************!*\
  !*** ./scripts/routes/inventoryList.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // JavaScript to be fired on the lists page
  },
  finalize: function finalize() {
    // JavaScript to be fired on the lists page, after the init JS

    var dayjs = __webpack_require__(/*! dayjs */ "../../node_modules/dayjs/dayjs.min.js");
    var customParseFormat = __webpack_require__(/*! dayjs/plugin/customParseFormat */ "../../node_modules/dayjs/plugin/customParseFormat.js");
    dayjs.extend(customParseFormat);

    $(document).ready(function() {
      $.noConflict();
      $('#lists').DataTable(
        {
          'paging': false,
          'info': false,
          'order': [[ 1, 'desc' ], [ 0, 'asc' ]],
          'dom': 'Bfrtip',
          'buttons': [
            'copy',
            'csv',
            'pdf'],          
        }     
      ); 
      
      $( function() {
        var 
          from = $( '#from' )
            .datepicker({
              defaultDate: '+1w',
              changeMonth: true,
              numberOfMonths: 2,
              // dateFormat: 'dd/mm/yy',
            })
            .on( 'change', function() {
              to.datepicker( 'option', 'minDate', getDate( this ) );
            }),
          to = $( '#to' ).datepicker({
            defaultDate: '+1w',
            changeMonth: true,
            numberOfMonths: 2,
            // dateFormat: 'dd/mm/yy',
          })
          .on( 'change', function() {
            from.datepicker( 'option', 'maxDate', getDate( this ) );
          });
     
        function getDate( element ) {
          var date;
          try {
            date = $.datepicker.parseDate( element.value );
          } catch( error ) {
            date = null;
          }
     
          return date;
        }
      } );
    });

    
  },
});


/***/ }),

/***/ "./scripts/routes/oosList.js":
/*!***********************************!*\
  !*** ./scripts/routes/oosList.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // JavaScript to be fired on the lists page
  },
  finalize: function finalize() {
    // JavaScript to be fired on the lists page, after the init JS
    $(document).ready(function() {
      $.noConflict();
      $('#lists').DataTable(
        {
          'paging': false,
          'info': false,
          'order': [[ 1, 'desc' ], [ 0, 'asc' ]],
        }
      );
    });
  },
});


/***/ }),

/***/ "./scripts/routes/packingList.js":
/*!***************************************!*\
  !*** ./scripts/routes/packingList.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // JavaScript to be fired on the lists page
  },
  finalize: function finalize() {
    // JavaScript to be fired on the lists page, after the init JS
    $(document).ready(function() {
      $.noConflict();
      $('#lists').DataTable(
        {
          'paging': false,
          'info': false,
          'order': [[ 0, 'asc' ]],
          'columnDefs': [{
            'targets': [0,1,2], /* column index */
            'orderable': false, /* true or false */
          }],
        }  
      );      
    });
  },
});


/***/ }),

/***/ "./scripts/routes/pickupList.js":
/*!**************************************!*\
  !*** ./scripts/routes/pickupList.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // JavaScript to be fired on the lists page
  },
  finalize: function finalize() {
    // JavaScript to be fired on the lists page, after the init JS
    $(document).ready(function() {
      $.noConflict();
      $('#lists').DataTable(
        {
          'paging': false,
          'info': false,
          'order': [[1, 'asc']],
          'columnDefs': [ {
            'targets': [0,2,3,4], /* column index */
            'orderable': true, /* true or false */
          }],
          'dom': 'Bfrtip',
          'buttons': [
            'copy',
            'csv',
            'pdf',
            'print' ],
        }
      );
  });   
  },
});


/***/ }),

/***/ "./scripts/util/Router.js":
/*!********************************!*\
  !*** ./scripts/util/Router.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _camelCase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camelCase */ "./scripts/util/camelCase.js");


/**
 * DOM-based Routing
 *
 * Based on {@link http://goo.gl/EUTi53|Markup-based Unobtrusive Comprehensive DOM-ready Execution} by Paul Irish
 *
 * The routing fires all common scripts, followed by the page specific scripts.
 * Add additional events for more control over timing e.g. a finalize event
 */
var Router = function Router(routes) {
  this.routes = routes;
};

/**
 * Fire Router events
 * @param {string} route DOM-based route derived from body classes (`<body class="...">`)
 * @param {string} [event] Events on the route. By default, `init` and `finalize` events are called.
 * @param {string} [arg] Any custom argument to be passed to the event.
 */
Router.prototype.fire = function fire (route, event, arg) {
    if ( event === void 0 ) event = 'init';

  document.dispatchEvent(new CustomEvent('routed', {
    bubbles: true,
    detail: {
      route: route,
      fn: event,
    },
  }));
    
  var fire = route !== '' && this.routes[route] && typeof this.routes[route][event] === 'function';
  if (fire) {
    this.routes[route][event](arg);
  }
};

/**
 * Automatically load and fire Router events
 *
 * Events are fired in the following order:
 ** common init
 ** page-specific init
 ** page-specific finalize
 ** common finalize
 */
Router.prototype.loadEvents = function loadEvents () {
    var this$1 = this;

  // Fire common init JS
  this.fire('common');

  // Fire page-specific init JS, and then finalize JS
  document.body.className
    .toLowerCase()
    .replace(/-/g, '_')
    .split(/\s+/)
    .map(_camelCase__WEBPACK_IMPORTED_MODULE_0__["default"])
    .forEach(function (className) {
      this$1.fire(className);
      this$1.fire(className, 'finalize');
    });

  // Fire common finalize JS
  this.fire('common', 'finalize');
};

/* harmony default export */ __webpack_exports__["default"] = (Router);


/***/ }),

/***/ "./scripts/util/camelCase.js":
/*!***********************************!*\
  !*** ./scripts/util/camelCase.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/**
 * the most terrible camelizer on the internet, guaranteed!
 * @param {string} str String that isn't camel-case, e.g., CAMeL_CaSEiS-harD
 * @return {string} String converted to camel-case, e.g., camelCaseIsHard
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(str) { return ("" + (str.charAt(0).toLowerCase()) + (str.replace(/[\W_]/g, '|').split('|')
  .map(function (part) { return ("" + (part.charAt(0).toUpperCase()) + (part.slice(1))); })
  .join('')
  .slice(1))); };


/***/ }),

/***/ "../../node_modules/dayjs/dayjs.min.js":
/*!*********************************************!*\
  !*** ../../node_modules/dayjs/dayjs.min.js ***!
  \*********************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return b},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return a+1;case"MM":return b.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return b.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return b.s(u,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=!0),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O}));

/***/ }),

/***/ "../../node_modules/dayjs/plugin/customParseFormat.js":
/*!************************************************************!*\
  !*** ../../node_modules/dayjs/plugin/customParseFormat.js ***!
  \************************************************************/
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d/,r=/\d\d/,i=/\d\d?/,o=/\d*[^-_:/,()\s\d]+/,s={},a=function(e){return(e=+e)+(e>68?1900:2e3)};var f=function(e){return function(t){this[e]=+t}},h=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e)return 0;if("Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),n=60*t[1]+(+t[2]||0);return 0===n?0:"+"===t[0]?-n:n}(e)}],u=function(e){var t=s[e];return t&&(t.indexOf?t:t.s.concat(t.f))},d=function(e,t){var n,r=s.meridiem;if(r){for(var i=1;i<=24;i+=1)if(e.indexOf(r(i,0,t))>-1){n=i>12;break}}else n=e===(t?"pm":"PM");return n},c={A:[o,function(e){this.afternoon=d(e,!1)}],a:[o,function(e){this.afternoon=d(e,!0)}],Q:[n,function(e){this.month=3*(e-1)+1}],S:[n,function(e){this.milliseconds=100*+e}],SS:[r,function(e){this.milliseconds=10*+e}],SSS:[/\d{3}/,function(e){this.milliseconds=+e}],s:[i,f("seconds")],ss:[i,f("seconds")],m:[i,f("minutes")],mm:[i,f("minutes")],H:[i,f("hours")],h:[i,f("hours")],HH:[i,f("hours")],hh:[i,f("hours")],D:[i,f("day")],DD:[r,f("day")],Do:[o,function(e){var t=s.ordinal,n=e.match(/\d+/);if(this.day=n[0],t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,"")===e&&(this.day=r)}],w:[i,f("week")],ww:[r,f("week")],M:[i,f("month")],MM:[r,f("month")],MMM:[o,function(e){var t=u("months"),n=(u("monthsShort")||t.map((function(e){return e.slice(0,3)}))).indexOf(e)+1;if(n<1)throw new Error;this.month=n%12||n}],MMMM:[o,function(e){var t=u("months").indexOf(e)+1;if(t<1)throw new Error;this.month=t%12||t}],Y:[/[+-]?\d+/,f("year")],YY:[r,function(e){this.year=a(e)}],YYYY:[/\d{4}/,f("year")],Z:h,ZZ:h};function l(n){var r,i;r=n,i=s&&s.formats;for(var o=(n=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,n,r){var o=r&&r.toUpperCase();return n||i[r]||e[r]||i[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,n){return t||n.slice(1)}))}))).match(t),a=o.length,f=0;f<a;f+=1){var h=o[f],u=c[h],d=u&&u[0],l=u&&u[1];o[f]=l?{regex:d,parser:l}:h.replace(/^\[|\]$/g,"")}return function(e){for(var t={},n=0,r=0;n<a;n+=1){var i=o[n];if("string"==typeof i)r+=i.length;else{var s=i.regex,f=i.parser,h=e.slice(r),u=s.exec(h)[0];f.call(t,u),e=e.replace(u,"")}}return function(e){var t=e.afternoon;if(void 0!==t){var n=e.hours;t?n<12&&(e.hours+=12):12===n&&(e.hours=0),delete e.afternoon}}(t),t}}return function(e,t,n){n.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(a=e.parseTwoDigitYear);var r=t.prototype,i=r.parse;r.parse=function(e){var t=e.date,r=e.utc,o=e.args;this.$u=r;var a=o[1];if("string"==typeof a){var f=!0===o[2],h=!0===o[3],u=f||h,d=o[2];h&&(d=o[2]),s=this.$locale(),!f&&d&&(s=n.Ls[d]),this.$d=function(e,t,n,r){try{if(["x","X"].indexOf(t)>-1)return new Date(("X"===t?1e3:1)*e);var i=l(t)(e),o=i.year,s=i.month,a=i.day,f=i.hours,h=i.minutes,u=i.seconds,d=i.milliseconds,c=i.zone,m=i.week,M=new Date,Y=a||(o||s?1:M.getDate()),p=o||M.getFullYear(),v=0;o&&!s||(v=s>0?s-1:M.getMonth());var D,w=f||0,g=h||0,y=u||0,L=d||0;return c?new Date(Date.UTC(p,v,Y,w,g,y,L+60*c.offset*1e3)):n?new Date(Date.UTC(p,v,Y,w,g,y,L)):(D=new Date(p,v,Y,w,g,y,L),m&&(D=r(D).week(m).toDate()),D)}catch(e){return new Date("")}}(t,a,r,n),this.init(),d&&!0!==d&&(this.$L=this.locale(d).$L),u&&t!=this.format(a)&&(this.$d=new Date("")),s={}}else if(a instanceof Array)for(var c=a.length,m=1;m<=c;m+=1){o[1]=a[m-1];var M=n.apply(this,o);if(M.isValid()){this.$d=M.$d,this.$L=M.$L,this.init();break}m===c&&(this.$d=new Date(""))}else i.call(this,e)}}}));

/***/ }),

/***/ "../../node_modules/datatables.net-buttons/js/buttons.colVis.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/datatables.net-buttons/js/buttons.colVis.js ***!
  \**********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*!
 * Column visibility buttons for Buttons and DataTables.
 * © SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net', 'datatables.net-buttons'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( true ) {
		// CommonJS
		var jq = __webpack_require__(/*! jquery */ "jquery");
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				__webpack_require__(/*! datatables.net */ "../../node_modules/datatables.net/js/dataTables.mjs")(root, $);
			}

			if ( ! $.fn.dataTable.Buttons ) {
				__webpack_require__(/*! datatables.net-buttons */ "../../node_modules/datatables.net-buttons/js/dataTables.buttons.mjs")(root, $);
			}
		};

		if (typeof window === 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {}
}(function( $, window, document ) {
'use strict';
var DataTable = $.fn.dataTable;



$.extend(DataTable.ext.buttons, {
	// A collection of column visibility buttons
	colvis: function (dt, conf) {
		var node = null;
		var buttonConf = {
			extend: 'collection',
			init: function (dt, n) {
				node = n;
			},
			text: function (dt) {
				return dt.i18n('buttons.colvis', 'Column visibility');
			},
			className: 'buttons-colvis',
			closeButton: false,
			buttons: [
				{
					extend: 'columnsToggle',
					columns: conf.columns,
					columnText: conf.columnText
				}
			]
		};

		// Rebuild the collection with the new column structure if columns are reordered
		dt.on('column-reorder.dt' + conf.namespace, function () {
			dt.button(null, dt.button(null, node).node()).collectionRebuild([
				{
					extend: 'columnsToggle',
					columns: conf.columns,
					columnText: conf.columnText
				}
			]);
		});

		return buttonConf;
	},

	// Selected columns with individual buttons - toggle column visibility
	columnsToggle: function (dt, conf) {
		var columns = dt
			.columns(conf.columns)
			.indexes()
			.map(function (idx) {
				return {
					extend: 'columnToggle',
					columns: idx,
					columnText: conf.columnText
				};
			})
			.toArray();

		return columns;
	},

	// Single button to toggle column visibility
	columnToggle: function (dt, conf) {
		return {
			extend: 'columnVisibility',
			columns: conf.columns,
			columnText: conf.columnText
		};
	},

	// Selected columns with individual buttons - set column visibility
	columnsVisibility: function (dt, conf) {
		var columns = dt
			.columns(conf.columns)
			.indexes()
			.map(function (idx) {
				return {
					extend: 'columnVisibility',
					columns: idx,
					visibility: conf.visibility,
					columnText: conf.columnText
				};
			})
			.toArray();

		return columns;
	},

	// Single button to set column visibility
	columnVisibility: {
		columns: undefined, // column selector
		text: function (dt, button, conf) {
			return conf._columnText(dt, conf);
		},
		className: 'buttons-columnVisibility',
		action: function (e, dt, button, conf) {
			var col = dt.columns(conf.columns);
			var curr = col.visible();

			col.visible(
				conf.visibility !== undefined ? conf.visibility : !(curr.length ? curr[0] : false)
			);
		},
		init: function (dt, button, conf) {
			var that = this;
			button.attr('data-cv-idx', conf.columns);

			dt.on('column-visibility.dt' + conf.namespace, function (e, settings) {
				if (!settings.bDestroying && settings.nTable == dt.settings()[0].nTable) {
					that.active(dt.column(conf.columns).visible());
				}
			}).on('column-reorder.dt' + conf.namespace, function () {
				// Button has been removed from the DOM
				if (conf.destroying) {
					return;
				}

				if (dt.columns(conf.columns).count() !== 1) {
					return;
				}

				// This button controls the same column index but the text for the column has
				// changed
				that.text(conf._columnText(dt, conf));

				// Since its a different column, we need to check its visibility
				that.active(dt.column(conf.columns).visible());
			});

			this.active(dt.column(conf.columns).visible());
		},
		destroy: function (dt, button, conf) {
			dt.off('column-visibility.dt' + conf.namespace).off(
				'column-reorder.dt' + conf.namespace
			);
		},

		_columnText: function (dt, conf) {
			if (typeof conf.text === 'string') {
				return conf.text;
			}

			var title = dt.column(conf.columns).title();
			var idx = dt.column(conf.columns).index();

			title = title
				.replace(/\n/g, ' ') // remove new lines
				.replace(/<br\s*\/?>/gi, ' ') // replace line breaks with spaces
				.replace(/<select(.*?)<\/select\s*>/gi, ''); // remove select tags, including options text

			// Strip HTML comments
			title = DataTable.Buttons.stripHtmlComments(title);

			// Use whatever HTML stripper DataTables is configured for
			title = DataTable.util.stripHtml(title).trim();

			return conf.columnText ? conf.columnText(dt, idx, title) : title;
		}
	},

	colvisRestore: {
		className: 'buttons-colvisRestore',

		text: function (dt) {
			return dt.i18n('buttons.colvisRestore', 'Restore visibility');
		},

		init: function (dt, button, conf) {
			// Use a private parameter on the column. This gets moved around with the
			// column if ColReorder changes the order
			dt.columns().every(function () {
				var init = this.init();

				if (init.__visOriginal === undefined) {
					init.__visOriginal = this.visible();
				}
			});
		},

		action: function (e, dt, button, conf) {
			dt.columns().every(function (i) {
				var init = this.init();

				this.visible(init.__visOriginal);
			});
		}
	},

	colvisGroup: {
		className: 'buttons-colvisGroup',

		action: function (e, dt, button, conf) {
			dt.columns(conf.show).visible(true, false);
			dt.columns(conf.hide).visible(false, false);

			dt.columns.adjust();
		},

		show: [],

		hide: []
	}
});


return DataTable;
}));



/***/ }),

/***/ "../../node_modules/datatables.net-buttons/js/buttons.html5.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/datatables.net-buttons/js/buttons.html5.js ***!
  \*********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*!
 * HTML5 export buttons for Buttons and DataTables.
 * © SpryMedia Ltd - datatables.net/license
 *
 * FileSaver.js (1.3.3) - MIT license
 * Copyright © 2016 Eli Grey - http://eligrey.com
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net', 'datatables.net-buttons'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( true ) {
		// CommonJS
		var jq = __webpack_require__(/*! jquery */ "jquery");
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				__webpack_require__(/*! datatables.net */ "../../node_modules/datatables.net/js/dataTables.mjs")(root, $);
			}

			if ( ! $.fn.dataTable.Buttons ) {
				__webpack_require__(/*! datatables.net-buttons */ "../../node_modules/datatables.net-buttons/js/dataTables.buttons.mjs")(root, $);
			}
		};

		if (typeof window === 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {}
}(function( $, window, document ) {
'use strict';
var DataTable = $.fn.dataTable;



// Allow the constructor to pass in JSZip and PDFMake from external requires.
// Otherwise, use globally defined variables, if they are available.
var useJszip;
var usePdfmake;

function _jsZip() {
	return useJszip || window.JSZip;
}
function _pdfMake() {
	return usePdfmake || window.pdfMake;
}

DataTable.Buttons.pdfMake = function (_) {
	if (!_) {
		return _pdfMake();
	}
	usePdfmake = _;
};

DataTable.Buttons.jszip = function (_) {
	if (!_) {
		return _jsZip();
	}
	useJszip = _;
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * FileSaver.js dependency
 */

/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

var _saveAs = (function (view) {
	'use strict';
	// IE <10 is explicitly unsupported
	if (
		typeof view === 'undefined' ||
		(typeof navigator !== 'undefined' &&
			/MSIE [1-9]\./.test(navigator.userAgent))
	) {
		return;
	}
	var doc = view.document,
		// only get URL when necessary in case Blob.js hasn't overridden it yet
		get_URL = function () {
			return view.URL || view.webkitURL || view;
		},
		save_link = doc.createElementNS('http://www.w3.org/1999/xhtml', 'a'),
		can_use_save_link = 'download' in save_link,
		click = function (node) {
			var event = new MouseEvent('click');
			node.dispatchEvent(event);
		},
		is_safari = /constructor/i.test(view.HTMLElement) || view.safari,
		is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent),
		throw_outside = function (ex) {
			(view.setImmediate || view.setTimeout)(function () {
				throw ex;
			}, 0);
		},
		force_saveable_type = 'application/octet-stream',
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		arbitrary_revoke_timeout = 1000 * 40, // in ms
		revoke = function (file) {
			var revoker = function () {
				if (typeof file === 'string') {
					// file is an object URL
					get_URL().revokeObjectURL(file);
				}
				else {
					// file is a File
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		},
		dispatch = function (filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver['on' + event_types[i]];
				if (typeof listener === 'function') {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		},
		auto_bom = function (blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (
				/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
					blob.type
				)
			) {
				return new Blob([String.fromCharCode(0xfeff), blob], {
					type: blob.type
				});
			}
			return blob;
		},
		FileSaver = function (blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var filesaver = this,
				type = blob.type,
				force = type === force_saveable_type,
				object_url,
				dispatch_all = function () {
					dispatch(
						filesaver,
						'writestart progress write writeend'.split(' ')
					);
				},
				// on any filesys errors revert to saving with object URLs
				fs_error = function () {
					if (
						(is_chrome_ios || (force && is_safari)) &&
						view.FileReader
					) {
						// Safari doesn't allow downloading of blob urls
						var reader = new FileReader();
						reader.onloadend = function () {
							var url = is_chrome_ios
								? reader.result
								: reader.result.replace(
										/^data:[^;]*;/,
										'data:attachment/file;'
								);
							var popup = view.open(url, '_blank');
							if (!popup) view.location.href = url;
							url = undefined; // release reference before dispatching
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					// don't create more object URLs than needed
					if (!object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (force) {
						view.location.href = object_url;
					}
					else {
						var opened = view.open(object_url, '_blank');
						if (!opened) {
							// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
							view.location.href = object_url;
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				};
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function () {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		},
		FS_proto = FileSaver.prototype,
		saveAs = function (blob, name, no_auto_bom) {
			return new FileSaver(
				blob,
				name || blob.name || 'download',
				no_auto_bom
			);
		};
	// IE 10+ (native saveAs)
	if (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob) {
		return function (blob, name, no_auto_bom) {
			name = name || blob.name || 'download';

			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name);
		};
	}

	FS_proto.abort = function () {};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
		FS_proto.onwritestart =
		FS_proto.onprogress =
		FS_proto.onwrite =
		FS_proto.onabort =
		FS_proto.onerror =
		FS_proto.onwriteend =
			null;

	return saveAs;
})(
	(typeof self !== 'undefined' && self) ||
		(typeof window !== 'undefined' && window) ||
		this.content
);

// Expose file saver on the DataTables API. Can't attach to `DataTables.Buttons`
// since this file can be loaded before Button's core!
DataTable.fileSave = _saveAs;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Local (private) functions
 */

/**
 * Get the sheet name for Excel exports.
 *
 * @param {object}	config Button configuration
 */
var _sheetname = function (config) {
	var sheetName = 'Sheet1';

	if (config.sheetName) {
		sheetName = config.sheetName.replace(/[\[\]\*\/\\\?\:]/g, '');
	}

	return sheetName;
};

/**
 * Get the newline character(s)
 *
 * @param {object}	config Button configuration
 * @return {string}				Newline character
 */
var _newLine = function (config) {
	return config.newline
		? config.newline
		: navigator.userAgent.match(/Windows/)
		? '\r\n'
		: '\n';
};

/**
 * Combine the data from the `buttons.exportData` method into a string that
 * will be used in the export file.
 *
 * @param	{DataTable.Api} dt		 DataTables API instance
 * @param	{object}				config Button configuration
 * @return {object}							 The data to export
 */
var _exportData = function (dt, config) {
	var newLine = _newLine(config);
	var data = dt.buttons.exportData(config.exportOptions);
	var boundary = config.fieldBoundary;
	var separator = config.fieldSeparator;
	var reBoundary = new RegExp(boundary, 'g');
	var escapeChar = config.escapeChar !== undefined ? config.escapeChar : '\\';
	var join = function (a) {
		var s = '';

		// If there is a field boundary, then we might need to escape it in
		// the source data
		for (var i = 0, ien = a.length; i < ien; i++) {
			if (i > 0) {
				s += separator;
			}

			s += boundary
				? boundary +
				('' + a[i]).replace(reBoundary, escapeChar + boundary) +
				boundary
				: a[i];
		}

		return s;
	};

	var header = '';
	var footer = '';
	var body = [];

	if (config.header) {
		header =
			data.headerStructure
				.map(function (row) {
					return join(
						row.map(function (cell) {
							return cell ? cell.title : '';
						})
					);
				})
				.join(newLine) + newLine;
	}

	if (config.footer && data.footer) {
		footer =
			data.footerStructure
				.map(function (row) {
					return join(
						row.map(function (cell) {
							return cell ? cell.title : '';
						})
					);
				})
				.join(newLine) + newLine;
	}

	for (var i = 0, ien = data.body.length; i < ien; i++) {
		body.push(join(data.body[i]));
	}

	return {
		str: header + body.join(newLine) + newLine + footer,
		rows: body.length
	};
};

/**
 * Older versions of Safari (prior to tech preview 18) don't support the
 * download option required.
 *
 * @return {Boolean} `true` if old Safari
 */
var _isDuffSafari = function () {
	var safari =
		navigator.userAgent.indexOf('Safari') !== -1 &&
		navigator.userAgent.indexOf('Chrome') === -1 &&
		navigator.userAgent.indexOf('Opera') === -1;

	if (!safari) {
		return false;
	}

	var version = navigator.userAgent.match(/AppleWebKit\/(\d+\.\d+)/);
	if (version && version.length > 1 && version[1] * 1 < 603.1) {
		return true;
	}

	return false;
};

/**
 * Convert from numeric position to letter for column names in Excel
 * @param  {int} n Column number
 * @return {string} Column letter(s) name
 */
function createCellPos(n) {
	var ordA = 'A'.charCodeAt(0);
	var ordZ = 'Z'.charCodeAt(0);
	var len = ordZ - ordA + 1;
	var s = '';

	while (n >= 0) {
		s = String.fromCharCode((n % len) + ordA) + s;
		n = Math.floor(n / len) - 1;
	}

	return s;
}

try {
	var _serialiser = new XMLSerializer();
	var _ieExcel;
} catch (t) {
	// noop
}

/**
 * Recursively add XML files from an object's structure to a ZIP file. This
 * allows the XSLX file to be easily defined with an object's structure matching
 * the files structure.
 *
 * @param {JSZip} zip ZIP package
 * @param {object} obj Object to add (recursive)
 */
function _addToZip(zip, obj) {
	if (_ieExcel === undefined) {
		// Detect if we are dealing with IE's _awful_ serialiser by seeing if it
		// drop attributes
		_ieExcel =
			_serialiser
				.serializeToString(
					new window.DOMParser().parseFromString(
						excelStrings['xl/worksheets/sheet1.xml'],
						'text/xml'
					)
				)
				.indexOf('xmlns:r') === -1;
	}

	$.each(obj, function (name, val) {
		if ($.isPlainObject(val)) {
			var newDir = zip.folder(name);
			_addToZip(newDir, val);
		}
		else {
			if (_ieExcel) {
				// IE's XML serialiser will drop some name space attributes from
				// from the root node, so we need to save them. Do this by
				// replacing the namespace nodes with a regular attribute that
				// we convert back when serialised. Edge does not have this
				// issue
				var worksheet = val.childNodes[0];
				var i, ien;
				var attrs = [];

				for (i = worksheet.attributes.length - 1; i >= 0; i--) {
					var attrName = worksheet.attributes[i].nodeName;
					var attrValue = worksheet.attributes[i].nodeValue;

					if (attrName.indexOf(':') !== -1) {
						attrs.push({ name: attrName, value: attrValue });

						worksheet.removeAttribute(attrName);
					}
				}

				for (i = 0, ien = attrs.length; i < ien; i++) {
					var attr = val.createAttribute(
						attrs[i].name.replace(':', '_dt_b_namespace_token_')
					);
					attr.value = attrs[i].value;
					worksheet.setAttributeNode(attr);
				}
			}

			var str = _serialiser.serializeToString(val);

			// Fix IE's XML
			if (_ieExcel) {
				// IE doesn't include the XML declaration
				if (str.indexOf('<?xml') === -1) {
					str =
						'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
						str;
				}

				// Return namespace attributes to being as such
				str = str.replace(/_dt_b_namespace_token_/g, ':');

				// Remove testing name space that IE puts into the space preserve attr
				str = str.replace(/xmlns:NS[\d]+="" NS[\d]+:/g, '');
			}

			// Safari, IE and Edge will put empty name space attributes onto
			// various elements making them useless. This strips them out
			str = str.replace(/<([^<>]*?) xmlns=""([^<>]*?)>/g, '<$1 $2>');

			zip.file(name, str);
		}
	});
}

/**
 * Create an XML node and add any children, attributes, etc without needing to
 * be verbose in the DOM.
 *
 * @param  {object} doc      XML document
 * @param  {string} nodeName Node name
 * @param  {object} opts     Options - can be `attr` (attributes), `children`
 *   (child nodes) and `text` (text content)
 * @return {node}            Created node
 */
function _createNode(doc, nodeName, opts) {
	var tempNode = doc.createElement(nodeName);

	if (opts) {
		if (opts.attr) {
			$(tempNode).attr(opts.attr);
		}

		if (opts.children) {
			$.each(opts.children, function (key, value) {
				tempNode.appendChild(value);
			});
		}

		if (opts.text !== null && opts.text !== undefined) {
			tempNode.appendChild(doc.createTextNode(opts.text));
		}
	}

	return tempNode;
}

/**
 * Get the width for an Excel column based on the contents of that column
 * @param  {object} data Data for export
 * @param  {int}    col  Column index
 * @return {int}         Column width
 */
function _excelColWidth(data, col) {
	var max = data.header[col].length;
	var len, lineSplit, str;

	if (data.footer && data.footer[col] && data.footer[col].length > max) {
		max = data.footer[col].length;
	}

	for (var i = 0, ien = data.body.length; i < ien; i++) {
		var point = data.body[i][col];
		str = point !== null && point !== undefined ? point.toString() : '';

		// If there is a newline character, workout the width of the column
		// based on the longest line in the string
		if (str.indexOf('\n') !== -1) {
			lineSplit = str.split('\n');
			lineSplit.sort(function (a, b) {
				return b.length - a.length;
			});

			len = lineSplit[0].length;
		}
		else {
			len = str.length;
		}

		if (len > max) {
			max = len;
		}

		// Max width rather than having potentially massive column widths
		if (max > 40) {
			return 54; // 40 * 1.35
		}
	}

	max *= 1.35;

	// And a min width
	return max > 6 ? max : 6;
}

// Excel - Pre-defined strings to build a basic XLSX file
var excelStrings = {
	'_rels/.rels':
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
		'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
		'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
		'</Relationships>',

	'xl/_rels/workbook.xml.rels':
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
		'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
		'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' +
		'<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
		'</Relationships>',

	'[Content_Types].xml':
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
		'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
		'<Default Extension="xml" ContentType="application/xml" />' +
		'<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />' +
		'<Default Extension="jpeg" ContentType="image/jpeg" />' +
		'<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />' +
		'<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />' +
		'<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" />' +
		'</Types>',

	'xl/workbook.xml':
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
		'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
		'<fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/>' +
		'<workbookPr showInkAnnotation="0" autoCompressPictures="0"/>' +
		'<bookViews>' +
		'<workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/>' +
		'</bookViews>' +
		'<sheets>' +
		'<sheet name="Sheet1" sheetId="1" r:id="rId1"/>' +
		'</sheets>' +
		'<definedNames/>' +
		'</workbook>',

	'xl/worksheets/sheet1.xml':
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
		'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">' +
		'<sheetData/>' +
		'<mergeCells count="0"/>' +
		'</worksheet>',

	'xl/styles.xml':
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">' +
		'<numFmts count="6">' +
		'<numFmt numFmtId="164" formatCode="[$$-409]#,##0.00;-[$$-409]#,##0.00"/>' +
		'<numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/>' +
		'<numFmt numFmtId="166" formatCode="[$€-2] #,##0.00"/>' +
		'<numFmt numFmtId="167" formatCode="0.0%"/>' +
		'<numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/>' +
		'<numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/>' +
		'</numFmts>' +
		'<fonts count="5" x14ac:knownFonts="1">' +
		'<font>' +
		'<sz val="11" />' +
		'<name val="Calibri" />' +
		'</font>' +
		'<font>' +
		'<sz val="11" />' +
		'<name val="Calibri" />' +
		'<color rgb="FFFFFFFF" />' +
		'</font>' +
		'<font>' +
		'<sz val="11" />' +
		'<name val="Calibri" />' +
		'<b />' +
		'</font>' +
		'<font>' +
		'<sz val="11" />' +
		'<name val="Calibri" />' +
		'<i />' +
		'</font>' +
		'<font>' +
		'<sz val="11" />' +
		'<name val="Calibri" />' +
		'<u />' +
		'</font>' +
		'</fonts>' +
		'<fills count="6">' +
		'<fill>' +
		'<patternFill patternType="none" />' +
		'</fill>' +
		'<fill>' + // Excel appears to use this as a dotted background regardless of values but
		'<patternFill patternType="none" />' + // to be valid to the schema, use a patternFill
		'</fill>' +
		'<fill>' +
		'<patternFill patternType="solid">' +
		'<fgColor rgb="FFD9D9D9" />' +
		'<bgColor indexed="64" />' +
		'</patternFill>' +
		'</fill>' +
		'<fill>' +
		'<patternFill patternType="solid">' +
		'<fgColor rgb="FFD99795" />' +
		'<bgColor indexed="64" />' +
		'</patternFill>' +
		'</fill>' +
		'<fill>' +
		'<patternFill patternType="solid">' +
		'<fgColor rgb="ffc6efce" />' +
		'<bgColor indexed="64" />' +
		'</patternFill>' +
		'</fill>' +
		'<fill>' +
		'<patternFill patternType="solid">' +
		'<fgColor rgb="ffc6cfef" />' +
		'<bgColor indexed="64" />' +
		'</patternFill>' +
		'</fill>' +
		'</fills>' +
		'<borders count="2">' +
		'<border>' +
		'<left />' +
		'<right />' +
		'<top />' +
		'<bottom />' +
		'<diagonal />' +
		'</border>' +
		'<border diagonalUp="false" diagonalDown="false">' +
		'<left style="thin">' +
		'<color auto="1" />' +
		'</left>' +
		'<right style="thin">' +
		'<color auto="1" />' +
		'</right>' +
		'<top style="thin">' +
		'<color auto="1" />' +
		'</top>' +
		'<bottom style="thin">' +
		'<color auto="1" />' +
		'</bottom>' +
		'<diagonal />' +
		'</border>' +
		'</borders>' +
		'<cellStyleXfs count="1">' +
		'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" />' +
		'</cellStyleXfs>' +
		'<cellXfs count="68">' +
		'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="0" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="1" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="2" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="3" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="4" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>' +
		'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
		'<alignment horizontal="left"/>' +
		'</xf>' +
		'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
		'<alignment horizontal="center"/>' +
		'</xf>' +
		'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
		'<alignment horizontal="right"/>' +
		'</xf>' +
		'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
		'<alignment horizontal="fill"/>' +
		'</xf>' +
		'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
		'<alignment textRotation="90"/>' +
		'</xf>' +
		'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">' +
		'<alignment wrapText="1"/>' +
		'</xf>' +
		'<xf numFmtId="9"   fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
		'<xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
		'<xf numFmtId="165" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
		'<xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
		'<xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
		'<xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
		'<xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
		'<xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
		'<xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
		'<xf numFmtId="1" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
		'<xf numFmtId="2" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
		'<xf numFmtId="14" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>' +
		'</cellXfs>' +
		'<cellStyles count="1">' +
		'<cellStyle name="Normal" xfId="0" builtinId="0" />' +
		'</cellStyles>' +
		'<dxfs count="0" />' +
		'<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" />' +
		'</styleSheet>'
};
// Note we could use 3 `for` loops for the styles, but when gzipped there is
// virtually no difference in size, since the above can be easily compressed

// Pattern matching for special number formats. Perhaps this should be exposed
// via an API in future?
// Ref: section 3.8.30 - built in formatters in open spreadsheet
//   https://www.ecma-international.org/news/TC45_current_work/Office%20Open%20XML%20Part%204%20-%20Markup%20Language%20Reference.pdf
var _excelSpecials = [
	{
		match: /^\-?\d+\.\d%$/,
		style: 60,
		fmt: function (d) {
			return d / 100;
		}
	}, // Percent with d.p.
	{
		match: /^\-?\d+\.?\d*%$/,
		style: 56,
		fmt: function (d) {
			return d / 100;
		}
	}, // Percent
	{ match: /^\-?\$[\d,]+.?\d*$/, style: 57 }, // Dollars
	{ match: /^\-?£[\d,]+.?\d*$/, style: 58 }, // Pounds
	{ match: /^\-?€[\d,]+.?\d*$/, style: 59 }, // Euros
	{ match: /^\-?\d+$/, style: 65 }, // Numbers without thousand separators
	{ match: /^\-?\d+\.\d{2}$/, style: 66 }, // Numbers 2 d.p. without thousands separators
	{
		match: /^\([\d,]+\)$/,
		style: 61,
		fmt: function (d) {
			return -1 * d.replace(/[\(\)]/g, '');
		}
	}, // Negative numbers indicated by brackets
	{
		match: /^\([\d,]+\.\d{2}\)$/,
		style: 62,
		fmt: function (d) {
			return -1 * d.replace(/[\(\)]/g, '');
		}
	}, // Negative numbers indicated by brackets - 2d.p.
	{ match: /^\-?[\d,]+$/, style: 63 }, // Numbers with thousand separators
	{ match: /^\-?[\d,]+\.\d{2}$/, style: 64 },
	{
		match: /^(19\d\d|[2-9]\d\d\d)\-(0\d|1[012])\-[0123][\d]$/,
		style: 67,
		fmt: function (d) {
			return Math.round(25569 + Date.parse(d) / (86400 * 1000));
		}
	} //Date yyyy-mm-dd
];

var _excelMergeCells = function (rels, row, column, rowspan, colspan) {
	var mergeCells = $('mergeCells', rels);

	mergeCells[0].appendChild(
		_createNode(rels, 'mergeCell', {
			attr: {
				ref:
					createCellPos(column) +
					row +
					':' +
					createCellPos(column + colspan - 1) +
					(row + rowspan - 1)
			}
		})
	);

	mergeCells.attr('count', parseFloat(mergeCells.attr('count')) + 1);
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Buttons
 */

//
// Copy to clipboard
//
DataTable.ext.buttons.copyHtml5 = {
	className: 'buttons-copy buttons-html5',

	text: function (dt) {
		return dt.i18n('buttons.copy', 'Copy');
	},

	action: function (e, dt, button, config, cb) {
		var exportData = _exportData(dt, config);
		var info = dt.buttons.exportInfo(config);
		var newline = _newLine(config);
		var output = exportData.str;
		var hiddenDiv = $('<div/>').css({
			height: 1,
			width: 1,
			overflow: 'hidden',
			position: 'fixed',
			top: 0,
			left: 0
		});

		if (info.title) {
			output = info.title + newline + newline + output;
		}

		if (info.messageTop) {
			output = info.messageTop + newline + newline + output;
		}

		if (info.messageBottom) {
			output = output + newline + newline + info.messageBottom;
		}

		if (config.customize) {
			output = config.customize(output, config, dt);
		}

		var textarea = $('<textarea readonly/>')
			.val(output)
			.appendTo(hiddenDiv);

		// For browsers that support the copy execCommand, try to use it
		if (document.queryCommandSupported('copy')) {
			hiddenDiv.appendTo(dt.table().container());
			textarea[0].focus();
			textarea[0].select();

			try {
				var successful = document.execCommand('copy');
				hiddenDiv.remove();

				if (successful) {
					if (config.copySuccess) {
						dt.buttons.info(
							dt.i18n('buttons.copyTitle', 'Copy to clipboard'),
							dt.i18n(
								'buttons.copySuccess',
								{
									1: 'Copied one row to clipboard',
									_: 'Copied %d rows to clipboard'
								},
								exportData.rows
							),
							2000
						);
					}

					cb();
					return;
				}
			} catch (t) {
				// noop
			}
		}

		// Otherwise we show the text box and instruct the user to use it
		var message = $(
			'<span>' +
				dt.i18n(
					'buttons.copyKeys',
					'Press <i>ctrl</i> or <i>\u2318</i> + <i>C</i> to copy the table data<br>to your system clipboard.<br><br>' +
						'To cancel, click this message or press escape.'
				) +
				'</span>'
		).append(hiddenDiv);

		dt.buttons.info(
			dt.i18n('buttons.copyTitle', 'Copy to clipboard'),
			message,
			0
		);

		// Select the text so when the user activates their system clipboard
		// it will copy that text
		textarea[0].focus();
		textarea[0].select();

		// Event to hide the message when the user is done
		var container = $(message).closest('.dt-button-info');
		var close = function () {
			container.off('click.buttons-copy');
			$(document).off('.buttons-copy');
			dt.buttons.info(false);
		};

		container.on('click.buttons-copy', function () {
			close();
			cb();
		});
		$(document)
			.on('keydown.buttons-copy', function (e) {
				if (e.keyCode === 27) {
					// esc
					close();
					cb();
				}
			})
			.on('copy.buttons-copy cut.buttons-copy', function () {
				close();
				cb();
			});
	},

	async: 100,

	copySuccess: true,

	exportOptions: {},

	fieldSeparator: '\t',

	fieldBoundary: '',

	header: true,

	footer: true,

	title: '*',

	messageTop: '*',

	messageBottom: '*'
};

//
// CSV export
//
DataTable.ext.buttons.csvHtml5 = {
	bom: false,

	className: 'buttons-csv buttons-html5',

	available: function () {
		return window.FileReader !== undefined && window.Blob;
	},

	text: function (dt) {
		return dt.i18n('buttons.csv', 'CSV');
	},

	action: function (e, dt, button, config, cb) {
		// Set the text
		var output = _exportData(dt, config).str;
		var info = dt.buttons.exportInfo(config);
		var charset = config.charset;

		if (config.customize) {
			output = config.customize(output, config, dt);
		}

		if (charset !== false) {
			if (!charset) {
				charset = document.characterSet || document.charset;
			}

			if (charset) {
				charset = ';charset=' + charset;
			}
		}
		else {
			charset = '';
		}

		if (config.bom) {
			output = String.fromCharCode(0xfeff) + output;
		}

		_saveAs(
			new Blob([output], { type: 'text/csv' + charset }),
			info.filename,
			true
		);

		cb();
	},

	async: 100,

	filename: '*',

	extension: '.csv',

	exportOptions: {
		escapeExcelFormula: true
	},

	fieldSeparator: ',',

	fieldBoundary: '"',

	escapeChar: '"',

	charset: null,

	header: true,

	footer: true
};

//
// Excel (xlsx) export
//
DataTable.ext.buttons.excelHtml5 = {
	className: 'buttons-excel buttons-html5',

	available: function () {
		return (
			window.FileReader !== undefined &&
			_jsZip() !== undefined &&
			!_isDuffSafari() &&
			_serialiser
		);
	},

	text: function (dt) {
		return dt.i18n('buttons.excel', 'Excel');
	},

	action: function (e, dt, button, config, cb) {
		var rowPos = 0;
		var dataStartRow, dataEndRow;
		var getXml = function (type) {
			var str = excelStrings[type];

			//str = str.replace( /xmlns:/g, 'xmlns_' ).replace( /mc:/g, 'mc_' );

			return $.parseXML(str);
		};
		var rels = getXml('xl/worksheets/sheet1.xml');
		var relsGet = rels.getElementsByTagName('sheetData')[0];

		var xlsx = {
			_rels: {
				'.rels': getXml('_rels/.rels')
			},
			xl: {
				_rels: {
					'workbook.xml.rels': getXml('xl/_rels/workbook.xml.rels')
				},
				'workbook.xml': getXml('xl/workbook.xml'),
				'styles.xml': getXml('xl/styles.xml'),
				worksheets: {
					'sheet1.xml': rels
				}
			},
			'[Content_Types].xml': getXml('[Content_Types].xml')
		};

		var data = dt.buttons.exportData(config.exportOptions);
		var currentRow, rowNode;
		var addRow = function (row) {
			currentRow = rowPos + 1;
			rowNode = _createNode(rels, 'row', { attr: { r: currentRow } });

			for (var i = 0, ien = row.length; i < ien; i++) {
				// Concat both the Cell Columns as a letter and the Row of the cell.
				var cellId = createCellPos(i) + '' + currentRow;
				var cell = null;

				// For null, undefined of blank cell, continue so it doesn't create the _createNode
				if (row[i] === null || row[i] === undefined || row[i] === '') {
					if (config.createEmptyCells === true) {
						row[i] = '';
					}
					else {
						continue;
					}
				}

				var originalContent = row[i];
				row[i] =
					typeof row[i].trim === 'function' ? row[i].trim() : row[i];

				// Special number formatting options
				for (var j = 0, jen = _excelSpecials.length; j < jen; j++) {
					var special = _excelSpecials[j];

					// TODO Need to provide the ability for the specials to say
					// if they are returning a string, since at the moment it is
					// assumed to be a number
					if (
						row[i].match &&
						!row[i].match(/^0\d+/) &&
						row[i].match(special.match)
					) {
						var val = row[i].replace(/[^\d\.\-]/g, '');

						if (special.fmt) {
							val = special.fmt(val);
						}

						cell = _createNode(rels, 'c', {
							attr: {
								r: cellId,
								s: special.style
							},
							children: [_createNode(rels, 'v', { text: val })]
						});

						break;
					}
				}

				if (!cell) {
					if (
						typeof row[i] === 'number' ||
						(row[i].match &&
							row[i].match(/^-?\d+(\.\d+)?([eE]\-?\d+)?$/) && // Includes exponential format
							!row[i].match(/^0\d+/))
					) {
						// Detect numbers - don't match numbers with leading zeros
						// or a negative anywhere but the start
						cell = _createNode(rels, 'c', {
							attr: {
								t: 'n',
								r: cellId
							},
							children: [_createNode(rels, 'v', { text: row[i] })]
						});
					}
					else {
						// String output - replace non standard characters for text output
						/*eslint no-control-regex: "off"*/
						var text = !originalContent.replace
							? originalContent
							: originalContent.replace(
									/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g,
									''
							);

						cell = _createNode(rels, 'c', {
							attr: {
								t: 'inlineStr',
								r: cellId
							},
							children: {
								row: _createNode(rels, 'is', {
									children: {
										row: _createNode(rels, 't', {
											text: text,
											attr: {
												'xml:space': 'preserve'
											}
										})
									}
								})
							}
						});
					}
				}

				rowNode.appendChild(cell);
			}

			relsGet.appendChild(rowNode);
			rowPos++;
		};

		var addHeader = function (structure) {
			structure.forEach(function (row) {
				addRow(
					row.map(function (cell) {
						return cell ? cell.title : '';
					}),
					rowPos
				);
				$('row:last c', rels).attr('s', '2'); // bold

				// Add any merge cells
				row.forEach(function (cell, columnCounter) {
					if (cell && (cell.colSpan > 1 || cell.rowSpan > 1)) {
						_excelMergeCells(
							rels,
							rowPos,
							columnCounter,
							cell.rowSpan,
							cell.colSpan
						);
					}
				});
			});
		};

		// Title and top messages
		var exportInfo = dt.buttons.exportInfo(config);
		if (exportInfo.title) {
			addRow([exportInfo.title], rowPos);
			_excelMergeCells(rels, rowPos, 0, 1, data.header.length);
			$('row:last c', rels).attr('s', '51'); // centre
		}

		if (exportInfo.messageTop) {
			addRow([exportInfo.messageTop], rowPos);
			_excelMergeCells(rels, rowPos, 0, 1, data.header.length);
		}

		// Table header
		if (config.header) {
			addHeader(data.headerStructure);
		}

		dataStartRow = rowPos;

		// Table body
		for (var n = 0, ie = data.body.length; n < ie; n++) {
			addRow(data.body[n], rowPos);
		}

		dataEndRow = rowPos;

		// Table footer
		if (config.footer && data.footer) {
			addHeader(data.footerStructure);
		}

		// Below the table
		if (exportInfo.messageBottom) {
			addRow([exportInfo.messageBottom], rowPos);
			_excelMergeCells(rels, rowPos, 0, 1, data.header.length);
		}

		// Set column widths
		var cols = _createNode(rels, 'cols');
		$('worksheet', rels).prepend(cols);

		for (var i = 0, ien = data.header.length; i < ien; i++) {
			cols.appendChild(
				_createNode(rels, 'col', {
					attr: {
						min: i + 1,
						max: i + 1,
						width: _excelColWidth(data, i),
						customWidth: 1
					}
				})
			);
		}

		// Workbook modifications
		var workbook = xlsx.xl['workbook.xml'];

		$('sheets sheet', workbook).attr('name', _sheetname(config));

		// Auto filter for columns
		if (config.autoFilter) {
			$('mergeCells', rels).before(
				_createNode(rels, 'autoFilter', {
					attr: {
						ref:
							'A' +
							dataStartRow +
							':' +
							createCellPos(data.header.length - 1) +
							dataEndRow
					}
				})
			);

			$('definedNames', workbook).append(
				_createNode(workbook, 'definedName', {
					attr: {
						name: '_xlnm._FilterDatabase',
						localSheetId: '0',
						hidden: 1
					},
					text:
						'\'' +
						_sheetname(config).replace(/'/g, '\'\'') +
						'\'!$A$' +
						dataStartRow +
						':' +
						createCellPos(data.header.length - 1) +
						dataEndRow
				})
			);
		}

		// Let the developer customise the document if they want to
		if (config.customize) {
			config.customize(xlsx, config, dt);
		}

		// Excel doesn't like an empty mergeCells tag
		if ($('mergeCells', rels).children().length === 0) {
			$('mergeCells', rels).remove();
		}

		var jszip = _jsZip();
		var zip = new jszip();
		var zipConfig = {
			compression: 'DEFLATE',
			type: 'blob',
			mimeType:
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		};

		_addToZip(zip, xlsx);

		// Modern Excel has a 218 character limit on the file name + path of the file (why!?)
		// https://support.microsoft.com/en-us/office/excel-specifications-and-limits-1672b34d-7043-467e-8e27-269d656771c3
		// So we truncate to allow for this.
		var filename = exportInfo.filename;

		if (filename > 175) {
			filename = filename.substr(0, 175);
		}

		// Let the developer customize the final zip file if they want to before it is generated and sent to the browser
		if (config.customizeZip) {
			config.customizeZip(zip, data, filename);
		}


		if (zip.generateAsync) {
			// JSZip 3+
			zip.generateAsync(zipConfig).then(function (blob) {
				_saveAs(blob, filename);
				cb();
			});
		}
		else {
			// JSZip 2.5
			_saveAs(zip.generate(zipConfig), filename);
			cb();
		}
	},

	async: 100,

	filename: '*',

	extension: '.xlsx',

	exportOptions: {},

	header: true,

	footer: true,

	title: '*',

	messageTop: '*',

	messageBottom: '*',

	createEmptyCells: false,

	autoFilter: false,

	sheetName: ''
};

//
// PDF export - using pdfMake - http://pdfmake.org
//
DataTable.ext.buttons.pdfHtml5 = {
	className: 'buttons-pdf buttons-html5',

	available: function () {
		return window.FileReader !== undefined && _pdfMake();
	},

	text: function (dt) {
		return dt.i18n('buttons.pdf', 'PDF');
	},

	action: function (e, dt, button, config, cb) {
		var data = dt.buttons.exportData(config.exportOptions);
		var info = dt.buttons.exportInfo(config);
		var rows = [];

		if (config.header) {
			data.headerStructure.forEach(function (row) {
				rows.push(
					row.map(function (cell) {
						return cell
							? {
									text: cell.title,
									colSpan: cell.colspan,
									rowSpan: cell.rowspan,
									style: 'tableHeader'
							}
							: {};
					})
				);
			});
		}

		for (var i = 0, ien = data.body.length; i < ien; i++) {
			rows.push(
				data.body[i].map(function (d) {
					return {
						text:
							d === null || d === undefined
								? ''
								: typeof d === 'string'
								? d
								: d.toString()
					};
				})
			);
		}

		if (config.footer) {
			data.footerStructure.forEach(function (row) {
				rows.push(
					row.map(function (cell) {
						return cell
							? {
									text: cell.title,
									colSpan: cell.colspan,
									rowSpan: cell.rowspan,
									style: 'tableHeader'
							}
							: {};
					})
				);
			});
		}

		var doc = {
			pageSize: config.pageSize,
			pageOrientation: config.orientation,
			content: [
				{
					style: 'table',
					table: {
						headerRows: data.headerStructure.length,
						footerRows: data.footerStructure.length, // Used for styling, doesn't do anything in pdfmake
						body: rows
					},
					layout: {
						hLineWidth: function (i, node) {
							if (i === 0 || i === node.table.body.length) {
								return 0;
							}
							return 0.5;
						},
						vLineWidth: function () {
							return 0;
						},
						hLineColor: function (i, node) {
							return i === node.table.headerRows ||
								i ===
									node.table.body.length -
										node.table.footerRows
								? '#333'
								: '#ddd';
						},
						fillColor: function (rowIndex) {
							if (rowIndex < data.headerStructure.length) {
								return '#fff';
							}
							return rowIndex % 2 === 0 ? '#f3f3f3' : null;
						},
						paddingTop: function () {
							return 5;
						},
						paddingBottom: function () {
							return 5;
						}
					}
				}
			],
			styles: {
				tableHeader: {
					bold: true,
					fontSize: 11,
					alignment: 'center'
				},
				tableFooter: {
					bold: true,
					fontSize: 11
				},
				table: {
					margin: [0, 5, 0, 5]
				},
				title: {
					alignment: 'center',
					fontSize: 13
				},
				message: {}
			},
			defaultStyle: {
				fontSize: 10
			}
		};

		if (info.messageTop) {
			doc.content.unshift({
				text: info.messageTop,
				style: 'message',
				margin: [0, 0, 0, 12]
			});
		}

		if (info.messageBottom) {
			doc.content.push({
				text: info.messageBottom,
				style: 'message',
				margin: [0, 0, 0, 12]
			});
		}

		if (info.title) {
			doc.content.unshift({
				text: info.title,
				style: 'title',
				margin: [0, 0, 0, 12]
			});
		}

		if (config.customize) {
			config.customize(doc, config, dt);
		}

		var pdf = _pdfMake().createPdf(doc);

		if (config.download === 'open' && !_isDuffSafari()) {
			pdf.open();
		}
		else {
			pdf.download(info.filename);
		}

		cb();
	},

	async: 100,

	title: '*',

	filename: '*',

	extension: '.pdf',

	exportOptions: {},

	orientation: 'portrait',

	// This isn't perfect, but it is close
	pageSize:
		navigator.language === 'en-US' || navigator.language === 'en-CA'
			? 'LETTER'
			: 'A4',

	header: true,

	footer: true,

	messageTop: '*',

	messageBottom: '*',

	customize: null,

	download: 'download'
};


return DataTable;
}));



/***/ }),

/***/ "../../node_modules/datatables.net-buttons/js/buttons.print.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/datatables.net-buttons/js/buttons.print.js ***!
  \*********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*!
 * Print button for Buttons and DataTables.
 * © SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net', 'datatables.net-buttons'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( true ) {
		// CommonJS
		var jq = __webpack_require__(/*! jquery */ "jquery");
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				__webpack_require__(/*! datatables.net */ "../../node_modules/datatables.net/js/dataTables.mjs")(root, $);
			}

			if ( ! $.fn.dataTable.Buttons ) {
				__webpack_require__(/*! datatables.net-buttons */ "../../node_modules/datatables.net-buttons/js/dataTables.buttons.mjs")(root, $);
			}
		};

		if (typeof window === 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {}
}(function( $, window, document ) {
'use strict';
var DataTable = $.fn.dataTable;



var _link = document.createElement('a');

/**
 * Clone link and style tags, taking into account the need to change the source
 * path.
 *
 * @param  {node}     el Element to convert
 */
var _styleToAbs = function (el) {
	var clone = $(el).clone()[0];

	if (clone.nodeName.toLowerCase() === 'link') {
		clone.href = _relToAbs(clone.href);
	}

	return clone.outerHTML;
};

/**
 * Convert a URL from a relative to an absolute address so it will work
 * correctly in the popup window which has no base URL.
 *
 * @param  {string} href URL
 */
var _relToAbs = function (href) {
	// Assign to a link on the original page so the browser will do all the
	// hard work of figuring out where the file actually is
	_link.href = href;
	var linkHost = _link.host;

	// IE doesn't have a trailing slash on the host
	// Chrome has it on the pathname
	if (linkHost.indexOf('/') === -1 && _link.pathname.indexOf('/') !== 0) {
		linkHost += '/';
	}

	return _link.protocol + '//' + linkHost + _link.pathname + _link.search;
};

DataTable.ext.buttons.print = {
	className: 'buttons-print',

	text: function (dt) {
		return dt.i18n('buttons.print', 'Print');
	},

	action: function (e, dt, button, config, cb) {
		var data = dt.buttons.exportData(
			$.extend({ decodeEntities: false }, config.exportOptions) // XSS protection
		);
		var exportInfo = dt.buttons.exportInfo(config);

		// Get the classes for the columns from the header cells
		var columnClasses = dt
			.columns(config.exportOptions.columns)
			.nodes()
			.map(function (n) {
				return n.className;
			})
			.toArray();

		var addRow = function (d, tag) {
			var str = '<tr>';

			for (var i = 0, ien = d.length; i < ien; i++) {
				// null and undefined aren't useful in the print output
				var dataOut = d[i] === null || d[i] === undefined ? '' : d[i];
				var classAttr = columnClasses[i]
					? 'class="' + columnClasses[i] + '"'
					: '';

				str +=
					'<' +
					tag +
					' ' +
					classAttr +
					'>' +
					dataOut +
					'</' +
					tag +
					'>';
			}

			return str + '</tr>';
		};

		// Construct a table for printing
		var html = '<table class="' + dt.table().node().className + '">';

		if (config.header) {
			var headerRows = data.headerStructure.map(function (row) {
				return (
					'<tr>' +
					row
						.map(function (cell) {
							return cell
								? '<th colspan="' +
										cell.colspan +
										'" rowspan="' +
										cell.rowspan +
										'">' +
										cell.title +
										'</th>'
								: '';
						})
						.join('') +
					'</tr>'
				);
			});

			html += '<thead>' + headerRows.join('') + '</thead>';
		}

		html += '<tbody>';
		for (var i = 0, ien = data.body.length; i < ien; i++) {
			html += addRow(data.body[i], 'td');
		}
		html += '</tbody>';

		if (config.footer && data.footer) {
			var footerRows = data.footerStructure.map(function (row) {
				return (
					'<tr>' +
					row
						.map(function (cell) {
							return cell
								? '<th colspan="' +
										cell.colspan +
										'" rowspan="' +
										cell.rowspan +
										'">' +
										cell.title +
										'</th>'
								: '';
						})
						.join('') +
					'</tr>'
				);
			});

			html += '<tfoot>' + footerRows.join('') + '</tfoot>';
		}
		html += '</table>';

		// Open a new window for the printable table
		var win = window.open('', '');

		if (!win) {
			dt.buttons.info(
				dt.i18n('buttons.printErrorTitle', 'Unable to open print view'),
				dt.i18n(
					'buttons.printErrorMsg',
					'Please allow popups in your browser for this site to be able to view the print view.'
				),
				5000
			);

			return;
		}

		win.document.close();

		// Inject the title and also a copy of the style and link tags from this
		// document so the table can retain its base styling. Note that we have
		// to use string manipulation as IE won't allow elements to be created
		// in the host document and then appended to the new window.
		var head = '<title>' + exportInfo.title + '</title>';
		$('style, link').each(function () {
			head += _styleToAbs(this);
		});

		try {
			win.document.head.innerHTML = head; // Work around for Edge
		} catch (e) {
			$(win.document.head).html(head); // Old IE
		}

		// Add any custom scripts (for example for paged.js)
		if (config.customScripts) {
			config.customScripts.forEach(function (script) {
				var tag = win.document.createElement("script");
				tag.src = script;
				win.document.getElementsByTagName("head")[0].appendChild(tag);
			});
		}

		// Inject the table and other surrounding information
		win.document.body.innerHTML =
			'<h1>' +
			exportInfo.title +
			'</h1>' +
			'<div>' +
			(exportInfo.messageTop || '') +
			'</div>' +
			html +
			'<div>' +
			(exportInfo.messageBottom || '') +
			'</div>';

		$(win.document.body).addClass('dt-print-view');

		$('img', win.document.body).each(function (i, img) {
			img.setAttribute('src', _relToAbs(img.getAttribute('src')));
		});

		if (config.customize) {
			config.customize(win, config, dt);
		}

		// Allow stylesheets time to load
		var autoPrint = function () {
			if (config.autoPrint) {
				win.print(); // blocking - so close will not
				win.close(); // execute until this is done
			}
		};

		win.setTimeout(autoPrint, 1000);

		cb();
	},

	async: 100,

	title: '*',

	messageTop: '*',

	messageBottom: '*',

	exportOptions: {},

	header: true,

	footer: true,

	autoPrint: true,

	customize: null
};


return DataTable;
}));



/***/ }),

/***/ "../../node_modules/jszip/dist/jszip.min.js":
/*!**************************************************!*\
  !*** ../../node_modules/jszip/dist/jszip.min.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

!function(e){if(true)module.exports=e();else {}}(function(){return function s(a,o,h){function u(r,e){if(!o[r]){if(!a[r]){var t=undefined;if(!e&&t)return require(r,!0);if(l)return l(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return u(t||e)},i,i.exports,s,a,o,h)}return o[r].exports}for(var l=undefined,e=0;e<h.length;e++)u(h[e]);return u}({1:[function(e,t,r){"use strict";var d=e("./utils"),c=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,h=[],u=0,l=e.length,f=l,c="string"!==d.getTypeOf(e);u<e.length;)f=l-u,n=c?(t=e[u++],r=u<l?e[u++]:0,u<l?e[u++]:0):(t=e.charCodeAt(u++),r=u<l?e.charCodeAt(u++):0,u<l?e.charCodeAt(u++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<f?(15&r)<<2|n>>6:64,o=2<f?63&n:64,h.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,h=0,u="data:";if(e.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=c.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),l[h++]=t,64!==s&&(l[h++]=r),64!==a&&(l[h++]=n);return l}},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var n=e("./utils");var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}(0|t,e,e.length,0):function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t.charCodeAt(a))];return-1^e}(0|t,e,e.length,0):0}},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,t,r){"use strict";var n=null;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n}},{lie:37}],7:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function h(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta})}},r.compressWorker=function(e){return new h("Deflate",e)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function A(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function n(e,t,r,n,i,s){var a,o,h=e.file,u=e.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),c=I.transformTo("string",O.utf8encode(h.name)),d=h.comment,p=I.transformTo("string",s(d)),m=I.transformTo("string",O.utf8encode(d)),_=c.length!==h.name.length,g=m.length!==d.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===i?(C=798,z|=function(e,t){var r=e;return e||(r=t?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(e){return 63&(e||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+c,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(n,4)+f+b+p}}var I=e("../utils"),i=e("../stream/GenericWorker"),O=e("../utf8"),B=e("../crc32"),R=e("../signature");function s(e,t,r,n){i.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,i),s.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,i.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}))},s.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=n(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,r=n(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),t)this.push({data:function(e){return R.DATA_DESCRIPTOR+A(e.crc32,4)+A(e.compressedSize,4)+A(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r=this.bytesWritten-e,n=function(e,t,r,n,i){var s=I.transformTo("string",i(n));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(e,2)+A(e,2)+A(t,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:n,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on("error",function(e){t.error(e)}),this},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(e){var t=this._sources;if(!i.prototype.error.call(this,e))return!1;for(var r=0;r<t.length;r++)try{t[r].error(e)}catch(e){}return!0},s.prototype.lock=function(){i.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var u=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),h=0;try{e.forEach(function(e,t){h++;var r=function(e,t){var r=e||t,n=u[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(e){o.error(e)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e}}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.10.1",n.loadAsync=function(e,t){return(new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var u=e("./utils"),i=e("./external"),n=e("./utf8"),s=e("./zipEntries"),a=e("./stream/Crc32Probe"),l=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new a);r.on("error",function(e){t(e)}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e()}).resume()})}t.exports=function(e,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:n.utf8decode}),l.isNode&&l.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",e,!0,o.optimizedBinaryString,o.base64).then(function(e){var t=new s(o);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(o.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n],s=i.fileNameStr,a=u.resolve(i.fileNameStr);h.file(a,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:o.createFolders}),i.dir||(h.file(a).unsafeOriginalName=s)}return t.zipComment.length&&(h.comment=t.zipComment),h})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t)}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}})}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e)}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t)}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume()},t.exports=n},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}}},{}],15:[function(e,t,r){"use strict";function s(e,t,r){var n,i=u.getTypeOf(t),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=g(e)),s.createFolders&&(n=_(e))&&b.call(this,n,!0);var a="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string");var o=null;o=t instanceof c||t instanceof l?t:p.isNode&&p.isStream(t)?new m(e,t):u.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var h=new d(e,o,s);this.files[e]=h}var i=e("./utf8"),u=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),f=e("./defaults"),c=e("./compressedObject"),d=e("./zipObject"),o=e("./generate"),p=e("./nodejsUtils"),m=e("./nodejs/NodejsStreamInputAdapter"),_=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""},g=function(e){return"/"!==e.slice(-1)&&(e+="/"),e},b=function(e,t){return t=void 0!==t?t:f.createFolders,e=g(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function h(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n)},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t)}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(h(e)){var n=e;return this.filter(function(e,t){return!t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=b.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=u.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n)}catch(e){(t=new l("error")).error(e)}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){"use strict";t.exports=e("stream")},{stream:void 0}],17:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,r){"use strict";var n=e("./Uint8ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var n=e("./ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),h=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new h(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0)}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.end()}),e.on("error",function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n},{}],29:[function(e,t,r){"use strict";var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),u=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter")}catch(e){}function l(e,o){return new a.Promise(function(t,r){var n=[],i=e._internalType,s=e._outputType,a=e._mimeType;e.on("data",function(e,t){n.push(e),o&&o(t)}).on("error",function(e){n=[],r(e)}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return u.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e)}catch(e){r(e)}n=[]}).resume()})}function f(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string"}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock()}catch(e){this._worker=new s("error"),this._worker.error(e)}}f.prototype={accumulate:function(e){return l(this,e)},on:function(e,t){var r=this;return"data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta)}):this._worker.on(e,function(){h.delay(t,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size}catch(e){r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch(e){r.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,s){"use strict";for(var o=e("./utils"),h=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),u=new Array(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;u[254]=u[254]=1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null}function l(){n.call(this,"utf-8 encode")}s.utf8encode=function(e){return h.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=h.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return h.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=u[n]))a[r++]=65533,t+=i-1;else{for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(h.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(h.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}(t),i=t;n!==t.length&&(h.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,n),l.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,a){"use strict";var o=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),u=e("./external");function n(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}e("setimmediate"),a.newBlob=function(t,r){a.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var i={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return!1}}()}};function s(e){var t=65536,r=a.getTypeOf(e),n=!0;if("uint8array"===r?n=i.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=i.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return i.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2)}return i.stringifyByChar(e)}function f(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}a.applyFromCharCode=s;var c={};c.string={string:n,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:s,array:n,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return s(new Uint8Array(e))},array:function(e){return f(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:n,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:n,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return f(e,new Uint8Array(e.length))},nodebuffer:n},a.transformTo=function(e,t){if(t=t||"",!e)return t;a.checkSupport(e);var r=a.getTypeOf(t);return c[r][e](t)},a.resolve=function(e){for(var t=e.split("/"),r=[],n=0;n<t.length;n++){var i=t[n];"."===i||""===i&&0!==n&&n!==t.length-1||(".."===i?r.pop():r.push(i))}return r.join("/")},a.getTypeOf=function(e){return"string"==typeof e?"string":"[object Array]"===Object.prototype.toString.call(e)?"array":o.nodebuffer&&r.isBuffer(e)?"nodebuffer":o.uint8array&&e instanceof Uint8Array?"uint8array":o.arraybuffer&&e instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(e){if(!o[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},a.delay=function(e,t,r){setImmediate(function(){e.apply(r||null,t||[])})},a.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r},a.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},a.prepareContent=function(r,e,n,i,s){return u.Promise.resolve(e).then(function(n){return o.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))&&"undefined"!=typeof FileReader?new u.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=function(e){r(e.target.error)},e.readAsArrayBuffer(n)}):n}).then(function(e){var t=a.getTypeOf(e);return t?("arraybuffer"===t?e=a.transformTo("uint8array",e):"string"===t&&(s?e=h.decode(e):n&&!0!==i&&(e=function(e){return l(e,o.uint8array?new Uint8Array(e.length):new Array(e.length))}(e))),e):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=e("./support");function h(e){this.files=[],this.loadOptions=e}h.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),h=e("./compressions"),u=e("./support");function l(e,t){this.options=e,this.loadOptions=t}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in h)if(Object.prototype.hasOwnProperty.call(h,t)&&h[t].magic===e)return h[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i)},handleUTF8:function(){var e=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else{var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else{var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),h=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker))}catch(e){(t=new h("error")).error(e)}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new i(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)n.prototype[u[f]]=l;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,l,t){(function(t){"use strict";var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(u),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2}}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){u(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(u,0)};else{var o=new t.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var e,t;n=!0;for(var r=h.length;r;){for(t=h,h=[],e=-1;++e<r;)t[e]();r=h.length}n=!1}l.exports=function(e){1!==h.push(e)||n||r()}}).call(this,"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==u&&d(this,e)}function h(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(t,r,n){i(function(){var e;try{e=r(n)}catch(e){return l.reject(t,e)}e===t?l.reject(t,new TypeError("Cannot resolve promise with itself")):l.resolve(t,e)})}function c(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function d(t,e){var r=!1;function n(e){r||(r=!0,l.reject(t,e))}function i(e){r||(r=!0,l.resolve(t,e))}var s=p(function(){e(i,n)});"error"===s.status&&n(s.value)}function p(e,t){var r={};try{r.value=e(t),r.status="success"}catch(e){r.status="error",r.value=e}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(u);this.state!==n?f(r,this.state===a?e:t,this.outcome):this.queue.push(new h(r,e,t));return r},h.prototype.callFulfilled=function(e){l.resolve(this.promise,e)},h.prototype.otherCallFulfilled=function(e){f(this.promise,this.onFulfilled,e)},h.prototype.callRejected=function(e){l.reject(this.promise,e)},h.prototype.otherCallRejected=function(e){f(this.promise,this.onRejected,e)},l.resolve=function(e,t){var r=p(c,t);if("error"===r.status)return l.reject(e,r.value);var n=r.value;if(n)d(e,n);else{e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t)}return e},l.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){if(e instanceof this)return e;return l.resolve(new this(u),e)},o.reject=function(e){var t=new this(u);return l.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);var s=new Array(n),a=0,t=-1,o=new this(u);for(;++t<n;)h(e[t],t);return o;function h(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,l.resolve(o,s))},function(e){i||(i=!0,l.reject(o,e))})}},o.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);var i=-1,s=new this(u);for(;++i<r;)a=e[i],t.resolve(a).then(function(e){n||(n=!0,l.resolve(s,e))},function(e){n||(n=!0,l.reject(s,e))});var a;return s}},{immediate:36}],38:[function(e,t,r){"use strict";var n={};(0,e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var a=e("./zlib/deflate"),o=e("./utils/common"),h=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,c=0,d=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:f,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:c,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==l)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?h.string2buf(t.dictionary):"[object ArrayBuffer]"===u.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==l)throw new Error(i[r]);this._dict_set=!0}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=h.string2buf(e):"[object ArrayBuffer]"===u.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)))}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==n||(this.onEnd(l),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return(t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return(t=t||{}).gzip=!0,n(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var c=e("./zlib/inflate"),d=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=d.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=c.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,c.inflateGetHeader(this.strm,this.header)}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?h.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?h.input=new Uint8Array(e):h.input=e,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new d.Buf8(u),h.next_out=0,h.avail_out=u),(r=c.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=c.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(h.output,h.next_out),s=h.next_out-i,a=p.buf2string(h.output,i),h.next_out=s,h.avail_out=u-s,s&&d.arraySet(h.output,h.output,i,s,0),this.onData(a)):this.onData(d.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=c.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e)},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return(t=t||{}).raw=!0,o(e,t)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){return[].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(n)},{}],42:[function(e,t,r){"use strict";var h=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(e){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){s=!1}for(var u=new h.Buf8(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function l(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,h.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}u[254]=u[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new h.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return l(e,e.length)},r.binstring2buf=function(e){for(var t=new h.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=u[i]))o[n++]=65533,r+=s-1;else{for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i)}return l(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521}return i|s<<16|0}},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,r){"use strict";var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}},{}],46:[function(e,t,r){"use strict";var h,c=e("../utils/common"),u=e("./trees"),d=e("./adler32"),p=e("./crc32"),n=e("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,i=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(e,t){return e.msg=n[t],t}function T(e){return(e<<1)-(4<e?9:0)}function D(e){for(var t=e.length;0<=--t;)e[t]=0}function F(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(c.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0))}function N(e,t){u._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm)}function U(e,t){e.pending_buf[e.pending++]=t}function P(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function L(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,h=e.strstart>e.w_size-z?e.strstart-(e.w_size-z):0,u=e.window,l=e.w_mask,f=e.prev,c=e.strstart+S,d=u[s+a-1],p=u[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(u[(r=t)+a]===p&&u[r+a-1]===d&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<c);if(n=S-(c-s),s=c-S,a<n){if(e.match_start=t,o<=(a=n))break;d=u[s+a-1],p=u[s+a]}}}while((t=f[t&l])>h&&0!=--i);return a<=e.lookahead?a:e.lookahead}function j(e){var t,r,n,i,s,a,o,h,u,l,f=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=f+(f-z)){for(c.arraySet(e.window,e.window,f,f,0),e.match_start-=f,e.strstart-=f,e.block_start-=f,t=r=e.hash_size;n=e.head[--t],e.head[t]=f<=n?n-f:0,--r;);for(t=r=f;n=e.prev[--t],e.prev[t]=f<=n?n-f:0,--r;);i+=f}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,h=e.strstart+e.lookahead,u=i,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,c.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=d(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),e.lookahead+=r,e.lookahead+e.insert>=x)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+x-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<x)););}while(e.lookahead<z&&0!==e.strm.avail_in)}function Z(e,t){for(var r,n;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r)),e.match_length>=x)if(n=u._tr_tally(e,e.strstart-e.match_start,e.match_length-x),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=x){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function W(e,t){for(var r,n,i;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=x-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===x&&4096<e.strstart-e.match_start)&&(e.match_length=x-1)),e.prev_length>=x&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-x,n=u._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-x),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=x-1,e.strstart++,n&&(N(e,!1),0===e.strm.avail_out))return A}else if(e.match_available){if((n=u._tr_tally(e,0,e.window[e.strstart-1]))&&N(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return A}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(n=u._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function M(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new c.Buf16(2*w),this.dyn_dtree=new c.Buf16(2*(2*a+1)),this.bl_tree=new c.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new c.Buf16(k+1),this.heap=new c.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new c.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?C:E,e.adler=2===t.wrap?0:1,t.last_flush=l,u._tr_init(t),m):R(e,_)}function K(e){var t=G(e);return t===m&&function(e){e.window_size=2*e.w_size,D(e.head),e.max_lazy_match=h[e.level].max_lazy,e.good_match=h[e.level].good_length,e.nice_match=h[e.level].nice_length,e.max_chain_length=h[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=x-1,e.match_available=0,e.ins_h=0}(e.state),t}function Y(e,t,r,n,i,s){if(!e)return _;var a=1;if(t===g&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||y<i||r!==v||n<8||15<n||t<0||9<t||s<0||b<s)return R(e,_);8===n&&(n=9);var o=new H;return(e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new c.Buf8(2*o.w_size),o.head=new c.Buf16(o.hash_size),o.prev=new c.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new c.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,K(e)}h=[new M(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(j(e),0===e.lookahead&&t===l)return A;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,N(e,!1),0===e.strm.avail_out))return A;if(e.strstart-e.block_start>=e.w_size-z&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):(e.strstart>e.block_start&&(N(e,!1),e.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(e,t){return Y(e,t,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?_:(e.state.gzhead=t,m):_},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?R(e,_):_;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&t!==f)return R(e,0===e.avail_out?-5:_);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===C)if(2===n.wrap)e.adler=0,U(n,31),U(n,139),U(n,8),n.gzhead?(U(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),U(n,255&n.gzhead.time),U(n,n.gzhead.time>>8&255),U(n,n.gzhead.time>>16&255),U(n,n.gzhead.time>>24&255),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(U(n,255&n.gzhead.extra.length),U(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(U(n,0),U(n,0),U(n,0),U(n,0),U(n,0),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,3),n.status=E);else{var a=v+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=E,P(n,a),0!==n.strstart&&(P(n,e.adler>>>16),P(n,65535&e.adler)),e.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending!==n.pending_buf_size));)U(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103)}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&F(e),n.pending+2<=n.pending_buf_size&&(U(n,255&e.adler),U(n,e.adler>>8&255),e.adler=0,n.status=E)):n.status=E),0!==n.pending){if(F(e),0===e.avail_out)return n.last_flush=-1,m}else if(0===e.avail_in&&T(t)<=T(r)&&t!==f)return R(e,-5);if(666===n.status&&0!==e.avail_in)return R(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==l&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(j(e),0===e.lookahead)){if(t===l)return A;break}if(e.match_length=0,r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=S){if(j(e),e.lookahead<=S&&t===l)return A;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=x&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+S;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=S-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=x?(r=u._tr_tally(e,1,e.match_length-x),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):h[n.level].func(n,t);if(o!==O&&o!==B||(n.status=666),o===A||o===O)return 0===e.avail_out&&(n.last_flush=-1),m;if(o===I&&(1===t?u._tr_align(n):5!==t&&(u._tr_stored_block(n,0,0,!1),3===t&&(D(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),F(e),0===e.avail_out))return n.last_flush=-1,m}return t!==f?m:n.wrap<=0?1:(2===n.wrap?(U(n,255&e.adler),U(n,e.adler>>8&255),U(n,e.adler>>16&255),U(n,e.adler>>24&255),U(n,255&e.total_in),U(n,e.total_in>>8&255),U(n,e.total_in>>16&255),U(n,e.total_in>>24&255)):(P(n,e.adler>>>16),P(n,65535&e.adler)),F(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?m:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==C&&69!==t&&73!==t&&91!==t&&103!==t&&t!==E&&666!==t?R(e,_):(e.state=null,t===E?R(e,-3):m):_},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,h,u,l=t.length;if(!e||!e.state)return _;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(e.adler=d(e.adler,t,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new c.Buf8(r.w_size),c.arraySet(u,t,l-r.w_size,r.w_size,0),t=u,l=r.w_size),a=e.avail_in,o=e.next_in,h=e.input,e.avail_in=l,e.next_in=0,e.input=t,j(r);r.lookahead>=x;){for(n=r.strstart,i=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+x-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,e.next_in=o,e.input=h,e.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,t,r){"use strict";t.exports=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,C=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,c=r.window,d=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;e:do{p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=m[d&g];t:for(;;){if(d>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(d&(1<<y)-1)];continue t}if(32&y){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}w=65535&v,(y&=15)&&(p<y&&(d+=z[n++]<<p,p+=8),w+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=_[d&b];r:for(;;){if(d>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(d&(1<<y)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&v,p<(y&=15)&&(d+=z[n++]<<p,(p+=8)<y&&(d+=z[n++]<<p,p+=8)),h<(k+=d&(1<<y)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(d>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=c,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=c[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=c[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(n<i&&s<o);n-=w=p>>3,d&=(1<<(p-=w<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=d,r.bits=p}},{}],49:[function(e,t,r){"use strict";var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),R=e("./inffast"),T=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function h(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function u(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=h(e,t))!==N&&(e.state=null),r):U}var l,f,c=!0;function j(e){if(c){var t;for(l=new I.Buf32(512),f=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(T(D,e.lens,0,288,l,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;T(F,e.lens,0,32,f,0,e.work,{bits:5}),c=!1}e.lencode=l,e.lenbits=9,e.distcode=f,e.distbits=5}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(e){return u(e,15)},r.inflateInit2=u,r.inflate=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,f=o,c=h,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){e.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(d=r.length)&&(d=o),d&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,d,k)),512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,r.length-=d),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}e.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;u>>>=2,l-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(d=r.length){if(o<d&&(d=o),h<d&&(d=h),0===d)break e;I.arraySet(i,n,s,d,a),o-=d,s+=d,h-=d,a+=d,r.length-=d;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],d=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+d>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;d--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=h){e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,R(e,c),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break e;if(d=c-h,r.offset>d){if((d=r.offset-d)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=d>r.wnext?(d-=r.wnext,r.wsize-d):r.wnext-d,d>r.length&&(d=r.length),m=r.window}else m=i,p=a-r.offset,d=r.length;for(h<d&&(d=h),h-=d,r.length-=d;i[a++]=m[p++],--d;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break e;i[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break e;o--,u|=n[s++]<<l,l+=8}if(c-=h,e.total_out+=c,r.total+=c,c&&(e.adler=r.check=r.flags?B(r.check,i,c,a-c):O(r.check,i,c,a-c)),c=h,(r.flags?u:L(u))!==r.check){e.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return-4;case 32:default:return U}return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,(r.wsize||c!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,c-e.avail_out)?(r.mode=31,-4):(f-=e.avail_in,c-=e.avail_out,e.total_in+=f,e.total_out+=c,r.total+=c,r.wrap&&c&&(e.adler=r.check=r.flags?B(r.check,i,c,e.next_out-c):O(r.check,i,c,e.next_out-c)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===c||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var h,u,l,f,c,d,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<n;v++)O[t[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===e||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<n;v++)0!==t[r+v]&&(a[B[t[r+v]]++]=v);if(d=0===e?(A=R=a,19):1===e?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,c=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===e&&852<C||2===e&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<d?(m=0,a[v]):a[v]>d?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;i[c+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=t[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),c+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===e&&852<C||2===e&&592<C)return 1;i[l=E&f]=k<<24|x<<16|c-s|0}}return 0!==E&&(i[c+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,r){"use strict";var i=e("../utils/common"),o=0,h=1;function n(e){for(var t=e.length;0<=--t;)e[t]=0}var s=0,a=29,u=256,l=u+1+a,f=30,c=19,_=2*l+1,g=15,d=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));n(z);var C=new Array(2*f);n(C);var E=new Array(512);n(E);var A=new Array(256);n(A);var I=new Array(a);n(I);var O,B,R,T=new Array(f);function D(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function N(e){return e<256?E[e]:E[256+(e>>>7)]}function U(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function P(e,t,r){e.bi_valid>d-r?(e.bi_buf|=t<<e.bi_valid&65535,U(e,e.bi_buf),e.bi_buf=t>>d-e.bi_valid,e.bi_valid+=r-d):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r)}function L(e,t,r){P(e,r[2*t],r[2*t+1])}function j(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function Z(e,t,r){var n,i,s=new Array(g+1),a=0;for(n=1;n<=g;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=j(s[o]++,o))}}function W(e){var t;for(t=0;t<l;t++)e.dyn_ltree[2*t]=0;for(t=0;t<f;t++)e.dyn_dtree[2*t]=0;for(t=0;t<c;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*m]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function M(e){8<e.bi_valid?U(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function H(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function G(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&H(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!H(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n}function K(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?L(e,i,t):(L(e,(s=A[i])+u+1,t),0!==(a=w[s])&&P(e,i-=I[s],a),L(e,s=N(--n),r),0!==(a=k[s])&&P(e,n-=T[s],a)),o<e.last_lit;);L(e,m,t)}function Y(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,h=t.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(e.heap[++e.heap_len]=u=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=u<2?++u:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=u,r=e.heap_len>>1;1<=r;r--)G(e,s,r);for(i=h;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],G(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,G(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,h=t.dyn_tree,u=t.max_code,l=t.stat_desc.static_tree,f=t.stat_desc.has_stree,c=t.stat_desc.extra_bits,d=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=g;s++)e.bl_count[s]=0;for(h[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<_;r++)p<(s=h[2*h[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),h[2*n+1]=s,u<n||(e.bl_count[s]++,a=0,d<=n&&(a=c[n-d]),o=h[2*n],e.opt_len+=o*(s+a),f&&(e.static_len+=o*(l[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)u<(i=e.heap[--r])||(h[2*i+1]!==s&&(e.opt_len+=(s-h[2*i+1])*h[2*i],h[2*i+1]=s),n--)}}(e,t),Z(s,u,e.bl_count)}function X(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<h&&i===a||(o<u?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[2*b]++):o<=10?e.bl_tree[2*v]++:e.bl_tree[2*y]++,s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4))}function V(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<h&&i===a)){if(o<u)for(;L(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(L(e,i,e.bl_tree),o--),L(e,b,e.bl_tree),P(e,o-3,2)):o<=10?(L(e,v,e.bl_tree),P(e,o-3,3)):(L(e,y,e.bl_tree),P(e,o-11,7));s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4)}}n(T);var q=!1;function J(e,t,r,n){P(e,(s<<1)+(n?1:0),3),function(e,t,r,n){M(e),n&&(U(e,r),U(e,~r)),i.arraySet(e.pending_buf,e.window,t,r,e.pending),e.pending+=r}(e,t,r,!0)}r._tr_init=function(e){q||(function(){var e,t,r,n,i,s=new Array(g+1);for(n=r=0;n<a-1;n++)for(I[n]=r,e=0;e<1<<w[n];e++)A[r++]=n;for(A[r-1]=n,n=i=0;n<16;n++)for(T[n]=i,e=0;e<1<<k[n];e++)E[i++]=n;for(i>>=7;n<f;n++)for(T[n]=i<<7,e=0;e<1<<k[n]-7;e++)E[256+i++]=n;for(t=0;t<=g;t++)s[t]=0;for(e=0;e<=143;)z[2*e+1]=8,e++,s[8]++;for(;e<=255;)z[2*e+1]=9,e++,s[9]++;for(;e<=279;)z[2*e+1]=7,e++,s[7]++;for(;e<=287;)z[2*e+1]=8,e++,s[8]++;for(Z(z,l+1,s),e=0;e<f;e++)C[2*e+1]=5,C[2*e]=j(e,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,c,p)}(),q=!0),e.l_desc=new F(e.dyn_ltree,O),e.d_desc=new F(e.dyn_dtree,B),e.bl_desc=new F(e.bl_tree,R),e.bi_buf=0,e.bi_valid=0,W(e)},r._tr_stored_block=J,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return o;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return h;for(t=32;t<u;t++)if(0!==e.dyn_ltree[2*t])return h;return o}(e)),Y(e,e.l_desc),Y(e,e.d_desc),a=function(e){var t;for(X(e,e.dyn_ltree,e.l_desc.max_code),X(e,e.dyn_dtree,e.d_desc.max_code),Y(e,e.bl_desc),t=c-1;3<=t&&0===e.bl_tree[2*S[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?J(e,t,r,n):4===e.strategy||s===i?(P(e,2+(n?1:0),3),K(e,z,C)):(P(e,4+(n?1:0),3),function(e,t,r,n){var i;for(P(e,t-257,5),P(e,r-1,5),P(e,n-4,4),i=0;i<n;i++)P(e,e.bl_tree[2*S[i]+1],3);V(e,e.dyn_ltree,t-1),V(e,e.dyn_dtree,r-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),K(e,e.dyn_ltree,e.dyn_dtree)),W(e),n&&M(e)},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(A[r]+u+1)]++,e.dyn_dtree[2*N(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){P(e,2,3),L(e,m,z),function(e){16===e.bi_valid?(U(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}(e)}},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,r){(function(e){!function(r,n){"use strict";if(!r.setImmediate){var i,s,t,a,o=1,h={},u=!1,l=r.document,e=Object.getPrototypeOf&&Object.getPrototypeOf(r);e=e&&e.setTimeout?e:r,i="[object process]"==={}.toString.call(r.process)?function(e){process.nextTick(function(){c(e)})}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1},r.postMessage("","*"),r.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",d,!1):r.attachEvent("onmessage",d),function(e){r.postMessage(a+e,"*")}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){c(e.data)},function(e){t.port2.postMessage(e)}):l&&"onreadystatechange"in l.createElement("script")?(s=l.documentElement,function(e){var t=l.createElement("script");t.onreadystatechange=function(){c(e),t.onreadystatechange=null,s.removeChild(t),t=null},s.appendChild(t)}):function(e){setTimeout(c,0,e)},e.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return h[o]=n,i(o),o++},e.clearImmediate=f}function f(e){delete h[e]}function c(e){if(u)setTimeout(c,0,e);else{var t=h[e];if(t){u=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{f(e),u=!1}}}}function d(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(a)&&c(+e.data.slice(a.length))}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[10])(10)});

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = jQuery;

/***/ }),

/***/ "../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4.mjs":
/*!**************************************************************************!*\
  !*** ../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4.mjs ***!
  \**************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var datatables_net__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! datatables.net */ "../../node_modules/datatables.net/js/dataTables.mjs");
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*! DataTables Bootstrap 4 integration
 * © SpryMedia Ltd - datatables.net/license
 */




// Allow reassignment of the $ variable
let $ = jquery__WEBPACK_IMPORTED_MODULE_0__;


/**
 * DataTables integration for Bootstrap 4.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Bootstrap. See https://datatables.net/manual/styling/bootstrap
 * for further information.
 */

/* Set the defaults for DataTables initialisation */
$.extend( true, datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].defaults, {
	renderer: 'bootstrap'
} );


/* Default class modification */
$.extend( true, datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].ext.classes, {
	container: "dt-container dt-bootstrap4",
	search: {
		input: "form-control form-control-sm"
	},
	length: {
		select: "custom-select custom-select-sm form-control form-control-sm"
	},
	processing: {
		container: "dt-processing card"
	},
	layout: {
		row: 'row justify-content-between',
		cell: 'd-md-flex justify-content-between align-items-center',
		tableCell: 'col-12',
		start: 'dt-layout-start col-md-auto mr-auto',
		end: 'dt-layout-end col-md-auto ml-auto',
		full: 'dt-layout-full col-md'
	}
} );


/* Bootstrap paging button renderer */
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].ext.renderer.pagingButton.bootstrap = function (settings, buttonType, content, active, disabled) {
	var btnClasses = ['dt-paging-button', 'page-item'];

	if (active) {
		btnClasses.push('active');
	}

	if (disabled) {
		btnClasses.push('disabled')
	}

	var li = $('<li>').addClass(btnClasses.join(' '));
	var a = $('<a>', {
		'href': disabled ? null : '#',
		'class': 'page-link'
	})
		.html(content)
		.appendTo(li);

	return {
		display: li,
		clicker: a
	};
};

datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].ext.renderer.pagingContainer.bootstrap = function (settings, buttonEls) {
	return $('<ul/>').addClass('pagination').append(buttonEls);
};


/* harmony default export */ __webpack_exports__["default"] = (datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "../../node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4.mjs":
/*!*******************************************************************************!*\
  !*** ../../node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4.mjs ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! datatables.net-bs4 */ "../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4.mjs");
/* harmony import */ var datatables_net_buttons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! datatables.net-buttons */ "../../node_modules/datatables.net-buttons/js/dataTables.buttons.mjs");
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*! Bootstrap integration for DataTables' Buttons
 * © SpryMedia Ltd - datatables.net/license
 */





// Allow reassignment of the $ variable
let $ = jquery__WEBPACK_IMPORTED_MODULE_0__;


$.extend(true, datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__["default"].Buttons.defaults, {
	dom: {
		container: {
			className: 'dt-buttons btn-group flex-wrap'
		},
		button: {
			className: 'btn btn-secondary',
			active: 'active',
			dropHtml: '',
			dropClass: 'dropdown-toggle'
		},
		collection: {
			container: {
				tag: 'div',
				className: 'dropdown-menu dt-button-collection'
			},
			closeButton: false,
			button: {
				tag: 'a',
				className: 'dt-button dropdown-item',
				active: 'dt-button-active',
				disabled: 'disabled',
				spacer: {
					className: 'dropdown-divider',
					tag: 'hr'
				}
			}
		},
		split: {
			action: {
				tag: 'a',
				className: 'btn btn-secondary dt-button-split-drop-button',
				closeButton: false
			},
			dropdown: {
				tag: 'button',
				className:
					'btn btn-secondary dt-button-split-drop dropdown-toggle-split',
				closeButton: false,
				align: 'split-left',
				splitAlignClass: 'dt-button-split-left'
			},
			wrapper: {
				tag: 'div',
				className: 'dt-button-split btn-group',
				closeButton: false
			}
		}
	},
	buttonCreated: function (config, button) {
		return config.buttons ? $('<div class="btn-group"/>').append(button) : button;
	}
});

datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__["default"].ext.buttons.collection.rightAlignClassName = 'dropdown-menu-right';


/* harmony default export */ __webpack_exports__["default"] = (datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "../../node_modules/datatables.net-buttons/js/dataTables.buttons.mjs":
/*!***************************************************************************!*\
  !*** ../../node_modules/datatables.net-buttons/js/dataTables.buttons.mjs ***!
  \***************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var datatables_net__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! datatables.net */ "../../node_modules/datatables.net/js/dataTables.mjs");
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*! Buttons for DataTables 3.2.0
 * © SpryMedia Ltd - datatables.net/license
 */




// Allow reassignment of the $ variable
let $ = jquery__WEBPACK_IMPORTED_MODULE_0__;


// Used for namespacing events added to the document by each instance, so they
// can be removed on destroy
var _instCounter = 0;

// Button namespacing counter for namespacing events on individual buttons
var _buttonCounter = 0;

var _dtButtons = datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].ext.buttons;

// Custom entity decoder for data export
var _entityDecoder = null;

// Allow for jQuery slim
function _fadeIn(el, duration, fn) {
	if ($.fn.animate) {
		el.stop().fadeIn(duration, fn);
	}
	else {
		el.css('display', 'block');

		if (fn) {
			fn.call(el);
		}
	}
}

function _fadeOut(el, duration, fn) {
	if ($.fn.animate) {
		el.stop().fadeOut(duration, fn);
	}
	else {
		el.css('display', 'none');

		if (fn) {
			fn.call(el);
		}
	}
}

/**
 * [Buttons description]
 * @param {[type]}
 * @param {[type]}
 */
var Buttons = function (dt, config) {
	if (!datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].versionCheck('2')) {
		throw 'Warning: Buttons requires DataTables 2 or newer';
	}

	// If not created with a `new` keyword then we return a wrapper function that
	// will take the settings object for a DT. This allows easy use of new instances
	// with the `layout` option - e.g. `topLeft: $.fn.dataTable.Buttons( ... )`.
	if (!(this instanceof Buttons)) {
		return function (settings) {
			return new Buttons(settings, dt).container();
		};
	}

	// If there is no config set it to an empty object
	if (typeof config === 'undefined') {
		config = {};
	}

	// Allow a boolean true for defaults
	if (config === true) {
		config = {};
	}

	// For easy configuration of buttons an array can be given
	if (Array.isArray(config)) {
		config = { buttons: config };
	}

	this.c = $.extend(true, {}, Buttons.defaults, config);

	// Don't want a deep copy for the buttons
	if (config.buttons) {
		this.c.buttons = config.buttons;
	}

	this.s = {
		dt: new datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api(dt),
		buttons: [],
		listenKeys: '',
		namespace: 'dtb' + _instCounter++
	};

	this.dom = {
		container: $('<' + this.c.dom.container.tag + '/>').addClass(
			this.c.dom.container.className
		)
	};

	this._constructor();
};

$.extend(Buttons.prototype, {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Public methods
	 */

	/**
	 * Get the action of a button
	 * @param  {int|string} Button index
	 * @return {function}
	 */ /**
	 * Set the action of a button
	 * @param  {node} node Button element
	 * @param  {function} action Function to set
	 * @return {Buttons} Self for chaining
	 */
	action: function (node, action) {
		var button = this._nodeToButton(node);

		if (action === undefined) {
			return button.conf.action;
		}

		button.conf.action = action;

		return this;
	},

	/**
	 * Add an active class to the button to make to look active or get current
	 * active state.
	 * @param  {node} node Button element
	 * @param  {boolean} [flag] Enable / disable flag
	 * @return {Buttons} Self for chaining or boolean for getter
	 */
	active: function (node, flag) {
		var button = this._nodeToButton(node);
		var klass = this.c.dom.button.active;
		var jqNode = $(button.node);

		if (
			button.inCollection &&
			this.c.dom.collection.button &&
			this.c.dom.collection.button.active !== undefined
		) {
			klass = this.c.dom.collection.button.active;
		}

		if (flag === undefined) {
			return jqNode.hasClass(klass);
		}

		jqNode.toggleClass(klass, flag === undefined ? true : flag);

		return this;
	},

	/**
	 * Add a new button
	 * @param {object} config Button configuration object, base string name or function
	 * @param {int|string} [idx] Button index for where to insert the button
	 * @param {boolean} [draw=true] Trigger a draw. Set a false when adding
	 *   lots of buttons, until the last button.
	 * @return {Buttons} Self for chaining
	 */
	add: function (config, idx, draw) {
		var buttons = this.s.buttons;

		if (typeof idx === 'string') {
			var split = idx.split('-');
			var base = this.s;

			for (var i = 0, ien = split.length - 1; i < ien; i++) {
				base = base.buttons[split[i] * 1];
			}

			buttons = base.buttons;
			idx = split[split.length - 1] * 1;
		}

		this._expandButton(
			buttons,
			config,
			config !== undefined ? config.split : undefined,
			(config === undefined ||
				config.split === undefined ||
				config.split.length === 0) &&
				base !== undefined,
			false,
			idx
		);

		if (draw === undefined || draw === true) {
			this._draw();
		}

		return this;
	},

	/**
	 * Clear buttons from a collection and then insert new buttons
	 */
	collectionRebuild: function (node, newButtons) {
		var button = this._nodeToButton(node);

		if (newButtons !== undefined) {
			var i;
			// Need to reverse the array
			for (i = button.buttons.length - 1; i >= 0; i--) {
				this.remove(button.buttons[i].node);
			}

			// If the collection has prefix and / or postfix buttons we need to add them in
			if (button.conf.prefixButtons) {
				newButtons.unshift.apply(newButtons, button.conf.prefixButtons);
			}

			if (button.conf.postfixButtons) {
				newButtons.push.apply(newButtons, button.conf.postfixButtons);
			}

			for (i = 0; i < newButtons.length; i++) {
				var newBtn = newButtons[i];

				this._expandButton(
					button.buttons,
					newBtn,
					newBtn !== undefined &&
						newBtn.config !== undefined &&
						newBtn.config.split !== undefined,
					true,
					newBtn.parentConf !== undefined &&
						newBtn.parentConf.split !== undefined,
					null,
					newBtn.parentConf
				);
			}
		}

		this._draw(button.collection, button.buttons);
	},

	/**
	 * Get the container node for the buttons
	 * @return {jQuery} Buttons node
	 */
	container: function () {
		return this.dom.container;
	},

	/**
	 * Disable a button
	 * @param  {node} node Button node
	 * @return {Buttons} Self for chaining
	 */
	disable: function (node) {
		var button = this._nodeToButton(node);

		if (button.isSplit) {
			$(button.node.childNodes[0])
				.addClass(this.c.dom.button.disabled)
				.prop('disabled', true);
		}
		else {
			$(button.node)
				.addClass(this.c.dom.button.disabled)
				.prop('disabled', true);
		}

		button.disabled = true;

		this._checkSplitEnable();

		return this;
	},

	/**
	 * Destroy the instance, cleaning up event handlers and removing DOM
	 * elements
	 * @return {Buttons} Self for chaining
	 */
	destroy: function () {
		// Key event listener
		$('body').off('keyup.' + this.s.namespace);

		// Individual button destroy (so they can remove their own events if
		// needed). Take a copy as the array is modified by `remove`
		var buttons = this.s.buttons.slice();
		var i, ien;

		for (i = 0, ien = buttons.length; i < ien; i++) {
			this.remove(buttons[i].node);
		}

		// Container
		this.dom.container.remove();

		// Remove from the settings object collection
		var buttonInsts = this.s.dt.settings()[0];

		for (i = 0, ien = buttonInsts.length; i < ien; i++) {
			if (buttonInsts.inst === this) {
				buttonInsts.splice(i, 1);
				break;
			}
		}

		return this;
	},

	/**
	 * Enable / disable a button
	 * @param  {node} node Button node
	 * @param  {boolean} [flag=true] Enable / disable flag
	 * @return {Buttons} Self for chaining
	 */
	enable: function (node, flag) {
		if (flag === false) {
			return this.disable(node);
		}

		var button = this._nodeToButton(node);

		if (button.isSplit) {
			$(button.node.childNodes[0])
				.removeClass(this.c.dom.button.disabled)
				.prop('disabled', false);
		}
		else {
			$(button.node)
				.removeClass(this.c.dom.button.disabled)
				.prop('disabled', false);
		}

		button.disabled = false;

		this._checkSplitEnable();

		return this;
	},

	/**
	 * Get a button's index
	 *
	 * This is internally recursive
	 * @param {element} node Button to get the index of
	 * @return {string} Button index
	 */
	index: function (node, nested, buttons) {
		if (!nested) {
			nested = '';
			buttons = this.s.buttons;
		}

		for (var i = 0, ien = buttons.length; i < ien; i++) {
			var inner = buttons[i].buttons;

			if (buttons[i].node === node) {
				return nested + i;
			}

			if (inner && inner.length) {
				var match = this.index(node, i + '-', inner);

				if (match !== null) {
					return match;
				}
			}
		}

		return null;
	},

	/**
	 * Get the instance name for the button set selector
	 * @return {string} Instance name
	 */
	name: function () {
		return this.c.name;
	},

	/**
	 * Get a button's node of the buttons container if no button is given
	 * @param  {node} [node] Button node
	 * @return {jQuery} Button element, or container
	 */
	node: function (node) {
		if (!node) {
			return this.dom.container;
		}

		var button = this._nodeToButton(node);
		return $(button.node);
	},

	/**
	 * Set / get a processing class on the selected button
	 * @param {element} node Triggering button node
	 * @param  {boolean} flag true to add, false to remove, undefined to get
	 * @return {boolean|Buttons} Getter value or this if a setter.
	 */
	processing: function (node, flag) {
		var dt = this.s.dt;
		var button = this._nodeToButton(node);

		if (flag === undefined) {
			return $(button.node).hasClass('processing');
		}

		$(button.node).toggleClass('processing', flag);

		$(dt.table().node()).triggerHandler('buttons-processing.dt', [
			flag,
			dt.button(node),
			dt,
			$(node),
			button.conf
		]);

		return this;
	},

	/**
	 * Remove a button.
	 * @param  {node} node Button node
	 * @return {Buttons} Self for chaining
	 */
	remove: function (node) {
		var button = this._nodeToButton(node);
		var host = this._nodeToHost(node);
		var dt = this.s.dt;

		// Remove any child buttons first
		if (button.buttons.length) {
			for (var i = button.buttons.length - 1; i >= 0; i--) {
				this.remove(button.buttons[i].node);
			}
		}

		button.conf.destroying = true;

		// Allow the button to remove event handlers, etc
		if (button.conf.destroy) {
			button.conf.destroy.call(dt.button(node), dt, $(node), button.conf);
		}

		this._removeKey(button.conf);

		$(button.node).remove();

		var idx = $.inArray(button, host);
		host.splice(idx, 1);

		return this;
	},

	/**
	 * Get the text for a button
	 * @param  {int|string} node Button index
	 * @return {string} Button text
	 */ /**
	 * Set the text for a button
	 * @param  {int|string|function} node Button index
	 * @param  {string} label Text
	 * @return {Buttons} Self for chaining
	 */
	text: function (node, label) {
		var button = this._nodeToButton(node);
		var textNode = button.textNode;
		var dt = this.s.dt;
		var jqNode = $(button.node);
		var text = function (opt) {
			return typeof opt === 'function'
				? opt(dt, jqNode, button.conf)
				: opt;
		};

		if (label === undefined) {
			return text(button.conf.text);
		}

		button.conf.text = label;
		textNode.html(text(label));

		return this;
	},

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constructor
	 */

	/**
	 * Buttons constructor
	 * @private
	 */
	_constructor: function () {
		var that = this;
		var dt = this.s.dt;
		var dtSettings = dt.settings()[0];
		var buttons = this.c.buttons;

		if (!dtSettings._buttons) {
			dtSettings._buttons = [];
		}

		dtSettings._buttons.push({
			inst: this,
			name: this.c.name
		});

		for (var i = 0, ien = buttons.length; i < ien; i++) {
			this.add(buttons[i]);
		}

		dt.on('destroy', function (e, settings) {
			if (settings === dtSettings) {
				that.destroy();
			}
		});

		// Global key event binding to listen for button keys
		$('body').on('keyup.' + this.s.namespace, function (e) {
			if (
				!document.activeElement ||
				document.activeElement === document.body
			) {
				// SUse a string of characters for fast lookup of if we need to
				// handle this
				var character = String.fromCharCode(e.keyCode).toLowerCase();

				if (that.s.listenKeys.toLowerCase().indexOf(character) !== -1) {
					that._keypress(character, e);
				}
			}
		});
	},

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods
	 */

	/**
	 * Add a new button to the key press listener
	 * @param {object} conf Resolved button configuration object
	 * @private
	 */
	_addKey: function (conf) {
		if (conf.key) {
			this.s.listenKeys += $.isPlainObject(conf.key)
				? conf.key.key
				: conf.key;
		}
	},

	/**
	 * Insert the buttons into the container. Call without parameters!
	 * @param  {node} [container] Recursive only - Insert point
	 * @param  {array} [buttons] Recursive only - Buttons array
	 * @private
	 */
	_draw: function (container, buttons) {
		if (!container) {
			container = this.dom.container;
			buttons = this.s.buttons;
		}

		container.children().detach();

		for (var i = 0, ien = buttons.length; i < ien; i++) {
			container.append(buttons[i].inserter);
			container.append(' ');

			if (buttons[i].buttons && buttons[i].buttons.length) {
				this._draw(buttons[i].collection, buttons[i].buttons);
			}
		}
	},

	/**
	 * Create buttons from an array of buttons
	 * @param  {array} attachTo Buttons array to attach to
	 * @param  {object} button Button definition
	 * @param  {boolean} inCollection true if the button is in a collection
	 * @private
	 */
	_expandButton: function (
		attachTo,
		button,
		split,
		inCollection,
		inSplit,
		attachPoint,
		parentConf
	) {
		var dt = this.s.dt;
		var isSplit = false;
		var domCollection = this.c.dom.collection;
		var buttons = !Array.isArray(button) ? [button] : button;

		if (button === undefined) {
			buttons = !Array.isArray(split) ? [split] : split;
		}

		for (var i = 0, ien = buttons.length; i < ien; i++) {
			var conf = this._resolveExtends(buttons[i]);

			if (!conf) {
				continue;
			}

			isSplit = conf.config && conf.config.split ? true : false;

			// If the configuration is an array, then expand the buttons at this
			// point
			if (Array.isArray(conf)) {
				this._expandButton(
					attachTo,
					conf,
					built !== undefined && built.conf !== undefined
						? built.conf.split
						: undefined,
					inCollection,
					parentConf !== undefined && parentConf.split !== undefined,
					attachPoint,
					parentConf
				);
				continue;
			}

			var built = this._buildButton(
				conf,
				inCollection,
				conf.split !== undefined ||
					(conf.config !== undefined &&
						conf.config.split !== undefined),
				inSplit
			);
			if (!built) {
				continue;
			}

			if (attachPoint !== undefined && attachPoint !== null) {
				attachTo.splice(attachPoint, 0, built);
				attachPoint++;
			}
			else {
				attachTo.push(built);
			}

			// Any button type can have a drop icon set
			if (built.conf.dropIcon && ! built.conf.split) {
				$(built.node)
					.addClass(this.c.dom.button.dropClass)
					.append(this.c.dom.button.dropHtml);
			}

			// Create the dropdown for a collection
			if (built.conf.buttons) {
				built.collection = $(
					'<' + domCollection.container.content.tag + '/>'
				);
				built.conf._collection = built.collection;

				this._expandButton(
					built.buttons,
					built.conf.buttons,
					built.conf.split,
					!isSplit,
					isSplit,
					attachPoint,
					built.conf
				);
			}

			// And the split collection
			if (built.conf.split) {
				built.collection = $('<' + domCollection.container.tag + '/>');
				built.conf._collection = built.collection;

				for (var j = 0; j < built.conf.split.length; j++) {
					var item = built.conf.split[j];

					if (typeof item === 'object') {
						item.parent = parentConf;

						if (item.collectionLayout === undefined) {
							item.collectionLayout = built.conf.collectionLayout;
						}

						if (item.dropup === undefined) {
							item.dropup = built.conf.dropup;
						}

						if (item.fade === undefined) {
							item.fade = built.conf.fade;
						}
					}
				}

				this._expandButton(
					built.buttons,
					built.conf.buttons,
					built.conf.split,
					!isSplit,
					isSplit,
					attachPoint,
					built.conf
				);
			}

			built.conf.parent = parentConf;

			// init call is made here, rather than buildButton as it needs to
			// be selectable, and for that it needs to be in the buttons array
			if (conf.init) {
				conf.init.call(dt.button(built.node), dt, $(built.node), conf);
			}
		}
	},

	/**
	 * Create an individual button
	 * @param  {object} config            Resolved button configuration
	 * @param  {boolean} inCollection `true` if a collection button
	 * @return {object} Completed button description object
	 * @private
	 */
	_buildButton: function (config, inCollection, isSplit, inSplit) {
		var that = this;
		var configDom = this.c.dom;
		var textNode;
		var dt = this.s.dt;
		var text = function (opt) {
			return typeof opt === 'function' ? opt(dt, button, config) : opt;
		};

		// Create an object that describes the button which can be in `dom.button`, or
		// `dom.collection.button` or `dom.split.button` or `dom.collection.split.button`!
		// Each should extend from `dom.button`.
		var dom = $.extend(true, {}, configDom.button);

		if (inCollection && isSplit && configDom.collection.split) {
			$.extend(true, dom, configDom.collection.split.action);
		}
		else if (inSplit || inCollection) {
			$.extend(true, dom, configDom.collection.button);
		}
		else if (isSplit) {
			$.extend(true, dom, configDom.split.button);
		}

		// Spacers don't do much other than insert an element into the DOM
		if (config.spacer) {
			var spacer = $('<' + dom.spacer.tag + '/>')
				.addClass(
					'dt-button-spacer ' +
						config.style +
						' ' +
						dom.spacer.className
				)
				.html(text(config.text));

			return {
				conf: config,
				node: spacer,
				inserter: spacer,
				buttons: [],
				inCollection: inCollection,
				isSplit: isSplit,
				collection: null,
				textNode: spacer
			};
		}

		// Make sure that the button is available based on whatever requirements
		// it has. For example, PDF button require pdfmake
		if (
			config.available &&
			!config.available(dt, config) &&
			!config.html
		) {
			return false;
		}

		var button;

		if (!config.html) {
			var run = function (e, dt, button, config, done) {
				config.action.call(dt.button(button), e, dt, button, config, done);

				$(dt.table().node()).triggerHandler('buttons-action.dt', [
					dt.button(button),
					dt,
					button,
					config
				]);
			};

			var action = function(e, dt, button, config) {
				if (config.async) {
					that.processing(button[0], true);

					setTimeout(function () {
						run(e, dt, button, config, function () {
							that.processing(button[0], false);
						});
					}, config.async);
				}
				else {
					run(e, dt, button, config, function () {});
				}
			}

			var tag = config.tag || dom.tag;
			var clickBlurs =
				config.clickBlurs === undefined ? true : config.clickBlurs;

			button = $('<' + tag + '/>')
				.addClass(dom.className)
				.attr('tabindex', this.s.dt.settings()[0].iTabIndex)
				.attr('aria-controls', this.s.dt.table().node().id)
				.on('click.dtb', function (e) {
					e.preventDefault();

					if (!button.hasClass(dom.disabled) && config.action) {
						action(e, dt, button, config);
					}

					if (clickBlurs) {
						button.trigger('blur');
					}
				})
				.on('keypress.dtb', function (e) {
					if (e.keyCode === 13) {
						e.preventDefault();

						if (!button.hasClass(dom.disabled) && config.action) {
							action(e, dt, button, config);
						}
					}
				});

			// Make `a` tags act like a link
			if (tag.toLowerCase() === 'a') {
				button.attr('href', '#');
			}

			// Button tags should have `type=button` so they don't have any default behaviour
			if (tag.toLowerCase() === 'button') {
				button.attr('type', 'button');
			}

			if (dom.liner.tag) {
				var liner = $('<' + dom.liner.tag + '/>')
					.html(text(config.text))
					.addClass(dom.liner.className);

				if (dom.liner.tag.toLowerCase() === 'a') {
					liner.attr('href', '#');
				}

				button.append(liner);
				textNode = liner;
			}
			else {
				button.html(text(config.text));
				textNode = button;
			}

			if (config.enabled === false) {
				button.addClass(dom.disabled);
			}

			if (config.className) {
				button.addClass(config.className);
			}

			if (config.titleAttr) {
				button.attr('title', text(config.titleAttr));
			}

			if (config.attr) {
				button.attr(config.attr);
			}

			if (!config.namespace) {
				config.namespace = '.dt-button-' + _buttonCounter++;
			}

			if (config.config !== undefined && config.config.split) {
				config.split = config.config.split;
			}
		}
		else {
			button = $(config.html);
		}

		var buttonContainer = this.c.dom.buttonContainer;
		var inserter;
		if (buttonContainer && buttonContainer.tag) {
			inserter = $('<' + buttonContainer.tag + '/>')
				.addClass(buttonContainer.className)
				.append(button);
		}
		else {
			inserter = button;
		}

		this._addKey(config);

		// Style integration callback for DOM manipulation
		// Note that this is _not_ documented. It is currently
		// for style integration only
		if (this.c.buttonCreated) {
			inserter = this.c.buttonCreated(config, inserter);
		}

		var splitDiv;

		if (isSplit) {
			var dropdownConf = inCollection
				? $.extend(true, this.c.dom.split, this.c.dom.collection.split)
				: this.c.dom.split;
			var wrapperConf = dropdownConf.wrapper;

			splitDiv = $('<' + wrapperConf.tag + '/>')
				.addClass(wrapperConf.className)
				.append(button);

			var dropButtonConfig = $.extend(config, {
				autoClose: true,
				align: dropdownConf.dropdown.align,
				attr: {
					'aria-haspopup': 'dialog',
					'aria-expanded': false
				},
				className: dropdownConf.dropdown.className,
				closeButton: false,
				splitAlignClass: dropdownConf.dropdown.splitAlignClass,
				text: dropdownConf.dropdown.text
			});

			this._addKey(dropButtonConfig);

			var splitAction = function (e, dt, button, config) {
				_dtButtons.split.action.call(
					dt.button(splitDiv),
					e,
					dt,
					button,
					config
				);

				$(dt.table().node()).triggerHandler('buttons-action.dt', [
					dt.button(button),
					dt,
					button,
					config
				]);
				button.attr('aria-expanded', true);
			};

			var dropButton = $(
				'<button class="' +
					dropdownConf.dropdown.className +
					' dt-button"></button>'
			)
				.html(this.c.dom.button.dropHtml)
				.addClass(this.c.dom.button.dropClass)
				.on('click.dtb', function (e) {
					e.preventDefault();
					e.stopPropagation();

					if (!dropButton.hasClass(dom.disabled)) {
						splitAction(e, dt, dropButton, dropButtonConfig);
					}
					if (clickBlurs) {
						dropButton.trigger('blur');
					}
				})
				.on('keypress.dtb', function (e) {
					if (e.keyCode === 13) {
						e.preventDefault();

						if (!dropButton.hasClass(dom.disabled)) {
							splitAction(e, dt, dropButton, dropButtonConfig);
						}
					}
				});

			if (config.split.length === 0) {
				dropButton.addClass('dtb-hide-drop');
			}

			splitDiv.append(dropButton).attr(dropButtonConfig.attr);
		}

		return {
			conf: config,
			node: isSplit ? splitDiv.get(0) : button.get(0),
			inserter: isSplit ? splitDiv : inserter,
			buttons: [],
			inCollection: inCollection,
			isSplit: isSplit,
			inSplit: inSplit,
			collection: null,
			textNode: textNode
		};
	},

	/**
	 * Spin over buttons checking if splits should be enabled or not.
	 * @param {*} buttons Array of buttons to check
	 */
	_checkSplitEnable: function (buttons) {
		if (! buttons) {
			buttons = this.s.buttons;
		}

		for (var i=0 ; i<buttons.length ; i++) {
			var button = buttons[i];

			// Check if the button is a split one and if so, determine
			// its state
			if (button.isSplit) {
				var splitBtn = button.node.childNodes[1];

				if (this._checkAnyEnabled(button.buttons)) {
					// Enable the split
					$(splitBtn)
						.removeClass(this.c.dom.button.disabled)
						.prop('disabled', false);
				}
				else {
					$(splitBtn)
						.addClass(this.c.dom.button.disabled)
						.prop('disabled', false);
				}
			}
			else if (button.isCollection) {
				// Nest down into collections
				this._checkSplitEnable(button.buttons);
			}
		}
	},

	/**
	 * Check an array of buttons and see if any are enabled in it
	 * @param {*} buttons Button array
	 * @returns true if a button is enabled, false otherwise
	 */
	_checkAnyEnabled: function (buttons) {
		for (var i=0 ; i<buttons.length ; i++) {
			if (! buttons[i].disabled) {
				return true;
			}
		}

		return false;
	},

	/**
	 * Get the button object from a node (recursive)
	 * @param  {node} node Button node
	 * @param  {array} [buttons] Button array, uses base if not defined
	 * @return {object} Button object
	 * @private
	 */
	_nodeToButton: function (node, buttons) {
		if (!buttons) {
			buttons = this.s.buttons;
		}

		for (var i = 0, ien = buttons.length; i < ien; i++) {
			if (buttons[i].node === node || $(buttons[i].node).children().eq(0).get(0) === node) {
				return buttons[i];
			}

			if (buttons[i].buttons.length) {
				var ret = this._nodeToButton(node, buttons[i].buttons);

				if (ret) {
					return ret;
				}
			}
		}
	},

	/**
	 * Get container array for a button from a button node (recursive)
	 * @param  {node} node Button node
	 * @param  {array} [buttons] Button array, uses base if not defined
	 * @return {array} Button's host array
	 * @private
	 */
	_nodeToHost: function (node, buttons) {
		if (!buttons) {
			buttons = this.s.buttons;
		}

		for (var i = 0, ien = buttons.length; i < ien; i++) {
			if (buttons[i].node === node) {
				return buttons;
			}

			if (buttons[i].buttons.length) {
				var ret = this._nodeToHost(node, buttons[i].buttons);

				if (ret) {
					return ret;
				}
			}
		}
	},

	/**
	 * Handle a key press - determine if any button's key configured matches
	 * what was typed and trigger the action if so.
	 * @param  {string} character The character pressed
	 * @param  {object} e Key event that triggered this call
	 * @private
	 */
	_keypress: function (character, e) {
		// Check if this button press already activated on another instance of Buttons
		if (e._buttonsHandled) {
			return;
		}

		var run = function (conf, node) {
			if (!conf.key) {
				return;
			}

			if (conf.key === character) {
				e._buttonsHandled = true;
				$(node).click();
			}
			else if ($.isPlainObject(conf.key)) {
				if (conf.key.key !== character) {
					return;
				}

				if (conf.key.shiftKey && !e.shiftKey) {
					return;
				}

				if (conf.key.altKey && !e.altKey) {
					return;
				}

				if (conf.key.ctrlKey && !e.ctrlKey) {
					return;
				}

				if (conf.key.metaKey && !e.metaKey) {
					return;
				}

				// Made it this far - it is good
				e._buttonsHandled = true;
				$(node).click();
			}
		};

		var recurse = function (a) {
			for (var i = 0, ien = a.length; i < ien; i++) {
				run(a[i].conf, a[i].node);

				if (a[i].buttons.length) {
					recurse(a[i].buttons);
				}
			}
		};

		recurse(this.s.buttons);
	},

	/**
	 * Remove a key from the key listener for this instance (to be used when a
	 * button is removed)
	 * @param  {object} conf Button configuration
	 * @private
	 */
	_removeKey: function (conf) {
		if (conf.key) {
			var character = $.isPlainObject(conf.key) ? conf.key.key : conf.key;

			// Remove only one character, as multiple buttons could have the
			// same listening key
			var a = this.s.listenKeys.split('');
			var idx = $.inArray(character, a);
			a.splice(idx, 1);
			this.s.listenKeys = a.join('');
		}
	},

	/**
	 * Resolve a button configuration
	 * @param  {string|function|object} conf Button config to resolve
	 * @return {object} Button configuration
	 * @private
	 */
	_resolveExtends: function (conf) {
		var that = this;
		var dt = this.s.dt;
		var i, ien;
		var toConfObject = function (base) {
			var loop = 0;

			// Loop until we have resolved to a button configuration, or an
			// array of button configurations (which will be iterated
			// separately)
			while (!$.isPlainObject(base) && !Array.isArray(base)) {
				if (base === undefined) {
					return;
				}

				if (typeof base === 'function') {
					base = base.call(that, dt, conf);

					if (!base) {
						return false;
					}
				}
				else if (typeof base === 'string') {
					if (!_dtButtons[base]) {
						return { html: base };
					}

					base = _dtButtons[base];
				}

				loop++;
				if (loop > 30) {
					// Protect against misconfiguration killing the browser
					throw 'Buttons: Too many iterations';
				}
			}

			return Array.isArray(base) ? base : $.extend({}, base);
		};

		conf = toConfObject(conf);

		while (conf && conf.extend) {
			// Use `toConfObject` in case the button definition being extended
			// is itself a string or a function
			if (!_dtButtons[conf.extend]) {
				throw 'Cannot extend unknown button type: ' + conf.extend;
			}

			var objArray = toConfObject(_dtButtons[conf.extend]);
			if (Array.isArray(objArray)) {
				return objArray;
			}
			else if (!objArray) {
				// This is a little brutal as it might be possible to have a
				// valid button without the extend, but if there is no extend
				// then the host button would be acting in an undefined state
				return false;
			}

			// Stash the current class name
			var originalClassName = objArray.className;

			if (conf.config !== undefined && objArray.config !== undefined) {
				conf.config = $.extend({}, objArray.config, conf.config);
			}

			conf = $.extend({}, objArray, conf);

			// The extend will have overwritten the original class name if the
			// `conf` object also assigned a class, but we want to concatenate
			// them so they are list that is combined from all extended buttons
			if (originalClassName && conf.className !== originalClassName) {
				conf.className = originalClassName + ' ' + conf.className;
			}

			// Although we want the `conf` object to overwrite almost all of
			// the properties of the object being extended, the `extend`
			// property should come from the object being extended
			conf.extend = objArray.extend;
		}

		// Buttons to be added to a collection  -gives the ability to define
		// if buttons should be added to the start or end of a collection
		var postfixButtons = conf.postfixButtons;
		if (postfixButtons) {
			if (!conf.buttons) {
				conf.buttons = [];
			}

			for (i = 0, ien = postfixButtons.length; i < ien; i++) {
				conf.buttons.push(postfixButtons[i]);
			}
		}

		var prefixButtons = conf.prefixButtons;
		if (prefixButtons) {
			if (!conf.buttons) {
				conf.buttons = [];
			}

			for (i = 0, ien = prefixButtons.length; i < ien; i++) {
				conf.buttons.splice(i, 0, prefixButtons[i]);
			}
		}

		return conf;
	},

	/**
	 * Display (and replace if there is an existing one) a popover attached to a button
	 * @param {string|node} content Content to show
	 * @param {DataTable.Api} hostButton DT API instance of the button
	 * @param {object} inOpts Options (see object below for all options)
	 */
	_popover: function (content, hostButton, inOpts) {
		var dt = hostButton;
		var c = this.c;
		var closed = false;
		var options = $.extend(
			{
				align: 'button-left', // button-right, dt-container, split-left, split-right
				autoClose: false,
				background: true,
				backgroundClassName: 'dt-button-background',
				closeButton: true,
				containerClassName: c.dom.collection.container.className,
				contentClassName: c.dom.collection.container.content.className,
				collectionLayout: '',
				collectionTitle: '',
				dropup: false,
				fade: 400,
				popoverTitle: '',
				rightAlignClassName: 'dt-button-right',
				tag: c.dom.collection.container.tag
			},
			inOpts
		);

		var containerSelector =
			options.tag + '.' + options.containerClassName.replace(/ /g, '.');
		var hostButtonNode = hostButton.node();
		var hostNode = options.collectionLayout.includes('fixed') ? $('body') : hostButton.node();

		var close = function () {
			closed = true;

			_fadeOut($(containerSelector), options.fade, function () {
				$(this).detach();
			});

			$(
				dt
					.buttons('[aria-haspopup="dialog"][aria-expanded="true"]')
					.nodes()
			).attr('aria-expanded', 'false');

			$('div.dt-button-background').off('click.dtb-collection');
			Buttons.background(
				false,
				options.backgroundClassName,
				options.fade,
				hostNode
			);

			$(window).off('resize.resize.dtb-collection');
			$('body').off('.dtb-collection');
			dt.off('buttons-action.b-internal');
			dt.off('destroy');

			$('body').trigger('buttons-popover-hide.dt');
		};

		if (content === false) {
			close();
			return;
		}

		var existingExpanded = $(
			dt.buttons('[aria-haspopup="dialog"][aria-expanded="true"]').nodes()
		);
		if (existingExpanded.length) {
			// Reuse the current position if the button that was triggered is inside an existing collection
			if (hostNode.closest(containerSelector).length) {
				hostNode = existingExpanded.eq(0);
			}

			close();
		}

		// Sort buttons if defined
		if (options.sort) {
			var elements = $('button', content)
				.map(function (idx, el) {
					return {
						text: $(el).text(),
						el: el
					};
				})
				.toArray();

			elements.sort(function (a, b) {
				return a.text.localeCompare(b.text);
			});

			$(content).append(elements.map(function (v) {
				return v.el;
			}));
		}

		// Try to be smart about the layout
		var cnt = $('.dt-button', content).length;
		var mod = '';

		if (cnt === 3) {
			mod = 'dtb-b3';
		}
		else if (cnt === 2) {
			mod = 'dtb-b2';
		}
		else if (cnt === 1) {
			mod = 'dtb-b1';
		}

		var display = $('<' + options.tag + '/>')
			.addClass(options.containerClassName)
			.addClass(options.collectionLayout)
			.addClass(options.splitAlignClass)
			.addClass(mod)
			.css('display', 'none')
			.attr({
				'aria-modal': true,
				role: 'dialog'
			});

		content = $(content)
			.addClass(options.contentClassName)
			.attr('role', 'menu')
			.appendTo(display);

		hostButtonNode.attr('aria-expanded', 'true');

		if (hostNode.parents('body')[0] !== document.body) {
			hostNode = document.body.lastChild;
		}

		if (options.popoverTitle) {
			display.prepend(
				'<div class="dt-button-collection-title">' +
					options.popoverTitle +
					'</div>'
			);
		}
		else if (options.collectionTitle) {
			display.prepend(
				'<div class="dt-button-collection-title">' +
					options.collectionTitle +
					'</div>'
			);
		}

		if (options.closeButton) {
			display
				.prepend('<div class="dtb-popover-close">&times;</div>')
				.addClass('dtb-collection-closeable');
		}

		_fadeIn(display.insertAfter(hostNode), options.fade);

		var tableContainer = $(hostButton.table().container());
		var position = display.css('position');

		if (options.span === 'container' || options.align === 'dt-container') {
			hostNode = hostNode.parent();
			display.css('width', tableContainer.width());
		}

		// Align the popover relative to the DataTables container
		// Useful for wide popovers such as SearchPanes
		if (position === 'absolute') {
			// Align relative to the host button
			var offsetParent = $(hostNode[0].offsetParent);
			var buttonPosition = hostNode.position();
			var buttonOffset = hostNode.offset();
			var tableSizes = offsetParent.offset();
			var containerPosition = offsetParent.position();
			var computed = window.getComputedStyle(offsetParent[0]);

			tableSizes.height = offsetParent.outerHeight();
			tableSizes.width =
				offsetParent.width() + parseFloat(computed.paddingLeft);
			tableSizes.right = tableSizes.left + tableSizes.width;
			tableSizes.bottom = tableSizes.top + tableSizes.height;

			// Set the initial position so we can read height / width
			var top = buttonPosition.top + hostNode.outerHeight();
			var left = buttonPosition.left;

			display.css({
				top: top,
				left: left
			});

			// Get the popover position
			computed = window.getComputedStyle(display[0]);
			var popoverSizes = display.offset();

			popoverSizes.height = display.outerHeight();
			popoverSizes.width = display.outerWidth();
			popoverSizes.right = popoverSizes.left + popoverSizes.width;
			popoverSizes.bottom = popoverSizes.top + popoverSizes.height;
			popoverSizes.marginTop = parseFloat(computed.marginTop);
			popoverSizes.marginBottom = parseFloat(computed.marginBottom);

			// First position per the class requirements - pop up and right align
			if (options.dropup) {
				top =
					buttonPosition.top -
					popoverSizes.height -
					popoverSizes.marginTop -
					popoverSizes.marginBottom;
			}

			if (
				options.align === 'button-right' ||
				display.hasClass(options.rightAlignClassName)
			) {
				left =
					buttonPosition.left -
					popoverSizes.width +
					hostNode.outerWidth();
			}

			// Container alignment - make sure it doesn't overflow the table container
			if (
				options.align === 'dt-container' ||
				options.align === 'container'
			) {
				if (left < buttonPosition.left) {
					left = -buttonPosition.left;
				}
			}

			// Window adjustment
			if (
				containerPosition.left + left + popoverSizes.width >
				$(window).width()
			) {
				// Overflowing the document to the right
				left =
					$(window).width() -
					popoverSizes.width -
					containerPosition.left;
			}

			if (buttonOffset.left + left < 0) {
				// Off to the left of the document
				left = -buttonOffset.left;
			}

			if (
				containerPosition.top + top + popoverSizes.height >
				$(window).height() + $(window).scrollTop()
			) {
				// Pop up if otherwise we'd need the user to scroll down
				top =
					buttonPosition.top -
					popoverSizes.height -
					popoverSizes.marginTop -
					popoverSizes.marginBottom;
			}

			if (offsetParent.offset().top + top < $(window).scrollTop()) {
				// Correction for when the top is beyond the top of the page
				top = buttonPosition.top + hostNode.outerHeight();
			}

			// Calculations all done - now set it
			display.css({
				top: top,
				left: left
			});
		}
		else {
			// Fix position - centre on screen
			var place = function () {
				var half = $(window).height() / 2;

				var top = display.height() / 2;
				if (top > half) {
					top = half;
				}

				display.css('marginTop', top * -1);
			};

			place();

			$(window).on('resize.dtb-collection', function () {
				place();
			});
		}

		if (options.background) {
			Buttons.background(
				true,
				options.backgroundClassName,
				options.fade,
				options.backgroundHost || hostNode
			);
		}

		// This is bonkers, but if we don't have a click listener on the
		// background element, iOS Safari will ignore the body click
		// listener below. An empty function here is all that is
		// required to make it work...
		$('div.dt-button-background').on(
			'click.dtb-collection',
			function () {}
		);

		if (options.autoClose) {
			setTimeout(function () {
				dt.on('buttons-action.b-internal', function (e, btn, dt, node) {
					if (node[0] === hostNode[0]) {
						return;
					}
					close();
				});
			}, 0);
		}

		$(display).trigger('buttons-popover.dt');

		dt.on('destroy', close);

		setTimeout(function () {
			closed = false;
			$('body')
				.on('click.dtb-collection', function (e) {
					if (closed) {
						return;
					}

					// andSelf is deprecated in jQ1.8, but we want 1.7 compat
					var back = $.fn.addBack ? 'addBack' : 'andSelf';
					var parent = $(e.target).parent()[0];

					if (
						(!$(e.target).parents()[back]().filter(content)
							.length &&
							!$(parent).hasClass('dt-buttons')) ||
						$(e.target).hasClass('dt-button-background')
					) {
						close();
					}
				})
				.on('keyup.dtb-collection', function (e) {
					if (e.keyCode === 27) {
						close();
					}
				})
				.on('keydown.dtb-collection', function (e) {
					// Focus trap for tab key
					var elements = $('a, button', content);
					var active = document.activeElement;

					if (e.keyCode !== 9) {
						// tab
						return;
					}

					if (elements.index(active) === -1) {
						// If current focus is not inside the popover
						elements.first().focus();
						e.preventDefault();
					}
					else if (e.shiftKey) {
						// Reverse tabbing order when shift key is pressed
						if (active === elements[0]) {
							elements.last().focus();
							e.preventDefault();
						}
					}
					else {
						if (active === elements.last()[0]) {
							elements.first().focus();
							e.preventDefault();
						}
					}
				});
		}, 0);
	}
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Statics
 */

/**
 * Show / hide a background layer behind a collection
 * @param  {boolean} Flag to indicate if the background should be shown or
 *   hidden
 * @param  {string} Class to assign to the background
 * @static
 */
Buttons.background = function (show, className, fade, insertPoint) {
	if (fade === undefined) {
		fade = 400;
	}
	if (!insertPoint) {
		insertPoint = document.body;
	}

	if (show) {
		_fadeIn(
			$('<div/>')
				.addClass(className)
				.css('display', 'none')
				.insertAfter(insertPoint),
			fade
		);
	}
	else {
		_fadeOut($('div.' + className), fade, function () {
			$(this).removeClass(className).remove();
		});
	}
};

/**
 * Instance selector - select Buttons instances based on an instance selector
 * value from the buttons assigned to a DataTable. This is only useful if
 * multiple instances are attached to a DataTable.
 * @param  {string|int|array} Instance selector - see `instance-selector`
 *   documentation on the DataTables site
 * @param  {array} Button instance array that was attached to the DataTables
 *   settings object
 * @return {array} Buttons instances
 * @static
 */
Buttons.instanceSelector = function (group, buttons) {
	if (group === undefined || group === null) {
		return $.map(buttons, function (v) {
			return v.inst;
		});
	}

	var ret = [];
	var names = $.map(buttons, function (v) {
		return v.name;
	});

	// Flatten the group selector into an array of single options
	var process = function (input) {
		if (Array.isArray(input)) {
			for (var i = 0, ien = input.length; i < ien; i++) {
				process(input[i]);
			}
			return;
		}

		if (typeof input === 'string') {
			if (input.indexOf(',') !== -1) {
				// String selector, list of names
				process(input.split(','));
			}
			else {
				// String selector individual name
				var idx = $.inArray(input.trim(), names);

				if (idx !== -1) {
					ret.push(buttons[idx].inst);
				}
			}
		}
		else if (typeof input === 'number') {
			// Index selector
			ret.push(buttons[input].inst);
		}
		else if (typeof input === 'object' && input.nodeName) {
			// Element selector
			for (var j = 0; j < buttons.length; j++) {
				if (buttons[j].inst.dom.container[0] === input) {
					ret.push(buttons[j].inst);
				}
			}
		}
		else if (typeof input === 'object') {
			// Actual instance selector
			ret.push(input);
		}
	};

	process(group);

	return ret;
};

/**
 * Button selector - select one or more buttons from a selector input so some
 * operation can be performed on them.
 * @param  {array} Button instances array that the selector should operate on
 * @param  {string|int|node|jQuery|array} Button selector - see
 *   `button-selector` documentation on the DataTables site
 * @return {array} Array of objects containing `inst` and `idx` properties of
 *   the selected buttons so you know which instance each button belongs to.
 * @static
 */
Buttons.buttonSelector = function (insts, selector) {
	var ret = [];
	var nodeBuilder = function (a, buttons, baseIdx) {
		var button;
		var idx;

		for (var i = 0, ien = buttons.length; i < ien; i++) {
			button = buttons[i];

			if (button) {
				idx = baseIdx !== undefined ? baseIdx + i : i + '';

				a.push({
					node: button.node,
					name: button.conf.name,
					idx: idx
				});

				if (button.buttons) {
					nodeBuilder(a, button.buttons, idx + '-');
				}
			}
		}
	};

	var run = function (selector, inst) {
		var i, ien;
		var buttons = [];
		nodeBuilder(buttons, inst.s.buttons);

		var nodes = $.map(buttons, function (v) {
			return v.node;
		});

		if (Array.isArray(selector) || selector instanceof $) {
			for (i = 0, ien = selector.length; i < ien; i++) {
				run(selector[i], inst);
			}
			return;
		}

		if (selector === null || selector === undefined || selector === '*') {
			// Select all
			for (i = 0, ien = buttons.length; i < ien; i++) {
				ret.push({
					inst: inst,
					node: buttons[i].node
				});
			}
		}
		else if (typeof selector === 'number') {
			// Main button index selector
			if (inst.s.buttons[selector]) {
				ret.push({
					inst: inst,
					node: inst.s.buttons[selector].node
				});
			}
		}
		else if (typeof selector === 'string') {
			if (selector.indexOf(',') !== -1) {
				// Split
				var a = selector.split(',');

				for (i = 0, ien = a.length; i < ien; i++) {
					run(a[i].trim(), inst);
				}
			}
			else if (selector.match(/^\d+(\-\d+)*$/)) {
				// Sub-button index selector
				var indexes = $.map(buttons, function (v) {
					return v.idx;
				});

				ret.push({
					inst: inst,
					node: buttons[$.inArray(selector, indexes)].node
				});
			}
			else if (selector.indexOf(':name') !== -1) {
				// Button name selector
				var name = selector.replace(':name', '');

				for (i = 0, ien = buttons.length; i < ien; i++) {
					if (buttons[i].name === name) {
						ret.push({
							inst: inst,
							node: buttons[i].node
						});
					}
				}
			}
			else {
				// jQuery selector on the nodes
				$(nodes)
					.filter(selector)
					.each(function () {
						ret.push({
							inst: inst,
							node: this
						});
					});
			}
		}
		else if (typeof selector === 'object' && selector.nodeName) {
			// Node selector
			var idx = $.inArray(selector, nodes);

			if (idx !== -1) {
				ret.push({
					inst: inst,
					node: nodes[idx]
				});
			}
		}
	};

	for (var i = 0, ien = insts.length; i < ien; i++) {
		var inst = insts[i];

		run(selector, inst);
	}

	return ret;
};

/**
 * Default function used for formatting output data.
 * @param {*} str Data to strip
 */
Buttons.stripData = function (str, config) {
	if (typeof str !== 'string') {
		return str;
	}

	// Always remove script tags
	str = Buttons.stripHtmlScript(str);

	// Always remove comments
	str = Buttons.stripHtmlComments(str);

	if (!config || config.stripHtml) {
		str = datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].util.stripHtml(str);
	}

	if (!config || config.trim) {
		str = str.trim();
	}

	if (!config || config.stripNewlines) {
		str = str.replace(/\n/g, ' ');
	}

	if (!config || config.decodeEntities) {
		if (_entityDecoder) {
			str = _entityDecoder(str);
		}
		else {
			_exportTextarea.innerHTML = str;
			str = _exportTextarea.value;
		}
	}

	// Prevent Excel from running a formula
	if (!config || config.escapeExcelFormula) {
		if (str.match(/^[=+\-@\t\r]/)) {
			console.log('matching and updateing');
			str = "'" + str;
		}
	}

	return str;
};

/**
 * Provide a custom entity decoding function - e.g. a regex one, which can be
 * much faster than the built in DOM option, but also larger code size.
 * @param {function} fn
 */
Buttons.entityDecoder = function (fn) {
	_entityDecoder = fn;
};

/**
 * Common function for stripping HTML comments
 *
 * @param {*} input 
 * @returns 
 */
Buttons.stripHtmlComments = function (input) {
	var previous;  
	
	do {  
		previous = input;
		input = input.replace(/(<!--.*?--!?>)|(<!--[\S\s]+?--!?>)|(<!--[\S\s]*?$)/g, '');
	} while (input !== previous);  

	return input;  
};

/**
 * Common function for stripping HTML script tags
 *
 * @param {*} input 
 * @returns 
 */
Buttons.stripHtmlScript = function (input) {
	var previous;  
	
	do {  
		previous = input;
		input = input.replace(/<script\b[^<]*(?:(?!<\/script[^>]*>)<[^<]*)*<\/script[^>]*>/gi, '');
	} while (input !== previous);  

	return input;  
};

/**
 * Buttons defaults. For full documentation, please refer to the docs/option
 * directory or the DataTables site.
 * @type {Object}
 * @static
 */
Buttons.defaults = {
	buttons: ['copy', 'excel', 'csv', 'pdf', 'print'],
	name: 'main',
	tabIndex: 0,
	dom: {
		container: {
			tag: 'div',
			className: 'dt-buttons'
		},
		collection: {
			container: {
				// The element used for the dropdown
				className: 'dt-button-collection',
				content: {
					className: '',
					tag: 'div'
				},
				tag: 'div'
			}
			// optionally
			// , button: IButton - buttons inside the collection container
			// , split: ISplit - splits inside the collection container
		},
		button: {
			tag: 'button',
			className: 'dt-button',
			active: 'dt-button-active', // class name
			disabled: 'disabled', // class name
			spacer: {
				className: 'dt-button-spacer',
				tag: 'span'
			},
			liner: {
				tag: 'span',
				className: ''
			},
			dropClass: '',
			dropHtml: '<span class="dt-button-down-arrow">&#x25BC;</span>'
		},
		split: {
			action: {
				// action button
				className: 'dt-button-split-drop-button dt-button',
				tag: 'button'
			},
			dropdown: {
				// button to trigger the dropdown
				align: 'split-right',
				className: 'dt-button-split-drop',
				splitAlignClass: 'dt-button-split-left',
				tag: 'button'
			},
			wrapper: {
				// wrap around both
				className: 'dt-button-split',
				tag: 'div'
			}
		}
	}
};

/**
 * Version information
 * @type {string}
 * @static
 */
Buttons.version = '3.2.0';

$.extend(_dtButtons, {
	collection: {
		text: function (dt) {
			return dt.i18n('buttons.collection', 'Collection');
		},
		className: 'buttons-collection',
		closeButton: false,
		dropIcon: true,
		init: function (dt, button) {
			button.attr('aria-expanded', false);
		},
		action: function (e, dt, button, config) {
			if (config._collection.parents('body').length) {
				this.popover(false, config);
			}
			else {
				this.popover(config._collection, config);
			}

			// When activated using a key - auto focus on the
			// first item in the popover
			if (e.type === 'keypress') {
				$('a, button', config._collection).eq(0).focus();
			}
		},
		attr: {
			'aria-haspopup': 'dialog'
		}
		// Also the popover options, defined in Buttons.popover
	},
	split: {
		text: function (dt) {
			return dt.i18n('buttons.split', 'Split');
		},
		className: 'buttons-split',
		closeButton: false,
		init: function (dt, button) {
			return button.attr('aria-expanded', false);
		},
		action: function (e, dt, button, config) {
			this.popover(config._collection, config);
		},
		attr: {
			'aria-haspopup': 'dialog'
		}
		// Also the popover options, defined in Buttons.popover
	},
	copy: function () {
		if (_dtButtons.copyHtml5) {
			return 'copyHtml5';
		}
	},
	csv: function (dt, conf) {
		if (_dtButtons.csvHtml5 && _dtButtons.csvHtml5.available(dt, conf)) {
			return 'csvHtml5';
		}
	},
	excel: function (dt, conf) {
		if (
			_dtButtons.excelHtml5 &&
			_dtButtons.excelHtml5.available(dt, conf)
		) {
			return 'excelHtml5';
		}
	},
	pdf: function (dt, conf) {
		if (_dtButtons.pdfHtml5 && _dtButtons.pdfHtml5.available(dt, conf)) {
			return 'pdfHtml5';
		}
	},
	pageLength: function (dt) {
		var lengthMenu = dt.settings()[0].aLengthMenu;
		var vals = [];
		var lang = [];
		var text = function (dt) {
			return dt.i18n(
				'buttons.pageLength',
				{
					'-1': 'Show all rows',
					_: 'Show %d rows'
				},
				dt.page.len()
			);
		};

		// Support for DataTables 1.x 2D array
		if (Array.isArray(lengthMenu[0])) {
			vals = lengthMenu[0];
			lang = lengthMenu[1];
		}
		else {
			for (var i = 0; i < lengthMenu.length; i++) {
				var option = lengthMenu[i];

				// Support for DataTables 2 object in the array
				if ($.isPlainObject(option)) {
					vals.push(option.value);
					lang.push(option.label);
				}
				else {
					vals.push(option);
					lang.push(option);
				}
			}
		}

		return {
			extend: 'collection',
			text: text,
			className: 'buttons-page-length',
			autoClose: true,
			buttons: $.map(vals, function (val, i) {
				return {
					text: lang[i],
					className: 'button-page-length',
					action: function (e, dt) {
						dt.page.len(val).draw();
					},
					init: function (dt, node, conf) {
						var that = this;
						var fn = function () {
							that.active(dt.page.len() === val);
						};

						dt.on('length.dt' + conf.namespace, fn);
						fn();
					},
					destroy: function (dt, node, conf) {
						dt.off('length.dt' + conf.namespace);
					}
				};
			}),
			init: function (dt, node, conf) {
				var that = this;
				dt.on('length.dt' + conf.namespace, function () {
					that.text(conf.text);
				});
			},
			destroy: function (dt, node, conf) {
				dt.off('length.dt' + conf.namespace);
			}
		};
	},
	spacer: {
		style: 'empty',
		spacer: true,
		text: function (dt) {
			return dt.i18n('buttons.spacer', '');
		}
	}
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API
 *
 * For complete documentation, please refer to the docs/api directory or the
 * DataTables site
 */

// Buttons group and individual button selector
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('buttons()', function (group, selector) {
	// Argument shifting
	if (selector === undefined) {
		selector = group;
		group = undefined;
	}

	this.selector.buttonGroup = group;

	var res = this.iterator(
		true,
		'table',
		function (ctx) {
			if (ctx._buttons) {
				return Buttons.buttonSelector(
					Buttons.instanceSelector(group, ctx._buttons),
					selector
				);
			}
		},
		true
	);

	res._groupSelector = group;
	return res;
});

// Individual button selector
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('button()', function (group, selector) {
	// just run buttons() and truncate
	var buttons = this.buttons(group, selector);

	if (buttons.length > 1) {
		buttons.splice(1, buttons.length);
	}

	return buttons;
});

// Active buttons
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.registerPlural(
	'buttons().active()',
	'button().active()',
	function (flag) {
		if (flag === undefined) {
			return this.map(function (set) {
				return set.inst.active(set.node);
			});
		}

		return this.each(function (set) {
			set.inst.active(set.node, flag);
		});
	}
);

// Get / set button action
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.registerPlural(
	'buttons().action()',
	'button().action()',
	function (action) {
		if (action === undefined) {
			return this.map(function (set) {
				return set.inst.action(set.node);
			});
		}

		return this.each(function (set) {
			set.inst.action(set.node, action);
		});
	}
);

// Collection control
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.registerPlural(
	'buttons().collectionRebuild()',
	'button().collectionRebuild()',
	function (buttons) {
		return this.each(function (set) {
			for (var i = 0; i < buttons.length; i++) {
				if (typeof buttons[i] === 'object') {
					buttons[i].parentConf = set;
				}
			}
			set.inst.collectionRebuild(set.node, buttons);
		});
	}
);

// Enable / disable buttons
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register(
	['buttons().enable()', 'button().enable()'],
	function (flag) {
		return this.each(function (set) {
			set.inst.enable(set.node, flag);
		});
	}
);

// Disable buttons
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register(
	['buttons().disable()', 'button().disable()'],
	function () {
		return this.each(function (set) {
			set.inst.disable(set.node);
		});
	}
);

// Button index
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('button().index()', function () {
	var idx = null;

	this.each(function (set) {
		var res = set.inst.index(set.node);

		if (res !== null) {
			idx = res;
		}
	});

	return idx;
});

// Get button nodes
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.registerPlural(
	'buttons().nodes()',
	'button().node()',
	function () {
		var jq = $();

		// jQuery will automatically reduce duplicates to a single entry
		$(
			this.each(function (set) {
				jq = jq.add(set.inst.node(set.node));
			})
		);

		return jq;
	}
);

// Get / set button processing state
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.registerPlural(
	'buttons().processing()',
	'button().processing()',
	function (flag) {
		if (flag === undefined) {
			return this.map(function (set) {
				return set.inst.processing(set.node);
			});
		}

		return this.each(function (set) {
			set.inst.processing(set.node, flag);
		});
	}
);

// Get / set button text (i.e. the button labels)
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.registerPlural(
	'buttons().text()',
	'button().text()',
	function (label) {
		if (label === undefined) {
			return this.map(function (set) {
				return set.inst.text(set.node);
			});
		}

		return this.each(function (set) {
			set.inst.text(set.node, label);
		});
	}
);

// Trigger a button's action
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.registerPlural(
	'buttons().trigger()',
	'button().trigger()',
	function () {
		return this.each(function (set) {
			set.inst.node(set.node).trigger('click');
		});
	}
);

// Button resolver to the popover
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('button().popover()', function (content, options) {
	return this.map(function (set) {
		return set.inst._popover(content, this.button(this[0].node), options);
	});
});

// Get the container elements
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('buttons().containers()', function () {
	var jq = $();
	var groupSelector = this._groupSelector;

	// We need to use the group selector directly, since if there are no buttons
	// the result set will be empty
	this.iterator(true, 'table', function (ctx) {
		if (ctx._buttons) {
			var insts = Buttons.instanceSelector(groupSelector, ctx._buttons);

			for (var i = 0, ien = insts.length; i < ien; i++) {
				jq = jq.add(insts[i].container());
			}
		}
	});

	return jq;
});

datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('buttons().container()', function () {
	// API level of nesting is `buttons()` so we can zip into the containers method
	return this.containers().eq(0);
});

// Add a new button
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('button().add()', function (idx, conf, draw) {
	var ctx = this.context;

	// Don't use `this` as it could be empty - select the instances directly
	if (ctx.length) {
		var inst = Buttons.instanceSelector(
			this._groupSelector,
			ctx[0]._buttons
		);

		if (inst.length) {
			inst[0].add(conf, idx, draw);
		}
	}

	return this.button(this._groupSelector, idx);
});

// Destroy the button sets selected
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('buttons().destroy()', function () {
	this.pluck('inst')
		.unique()
		.each(function (inst) {
			inst.destroy();
		});

	return this;
});

// Remove a button
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.registerPlural(
	'buttons().remove()',
	'buttons().remove()',
	function () {
		this.each(function (set) {
			set.inst.remove(set.node);
		});

		return this;
	}
);

// Information box that can be used by buttons
var _infoTimer;
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('buttons.info()', function (title, message, time) {
	var that = this;

	if (title === false) {
		this.off('destroy.btn-info');
		_fadeOut($('#datatables_buttons_info'), 400, function () {
			$(this).remove();
		});
		clearTimeout(_infoTimer);
		_infoTimer = null;

		return this;
	}

	if (_infoTimer) {
		clearTimeout(_infoTimer);
	}

	if ($('#datatables_buttons_info').length) {
		$('#datatables_buttons_info').remove();
	}

	title = title ? '<h2>' + title + '</h2>' : '';

	_fadeIn(
		$('<div id="datatables_buttons_info" class="dt-button-info"/>')
			.html(title)
			.append(
				$('<div/>')[typeof message === 'string' ? 'html' : 'append'](
					message
				)
			)
			.css('display', 'none')
			.appendTo('body')
	);

	if (time !== undefined && time !== 0) {
		_infoTimer = setTimeout(function () {
			that.buttons.info(false);
		}, time);
	}

	this.on('destroy.btn-info', function () {
		that.buttons.info(false);
	});

	return this;
});

// Get data from the table for export - this is common to a number of plug-in
// buttons so it is included in the Buttons core library
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('buttons.exportData()', function (options) {
	if (this.context.length) {
		return _exportData(new datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api(this.context[0]), options);
	}
});

// Get information about the export that is common to many of the export data
// types (DRY)
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('buttons.exportInfo()', function (conf) {
	if (!conf) {
		conf = {};
	}

	return {
		filename: _filename(conf, this),
		title: _title(conf, this),
		messageTop: _message(this, conf, conf.message || conf.messageTop, 'top'),
		messageBottom: _message(this, conf, conf.messageBottom, 'bottom')
	};
});

/**
 * Get the file name for an exported file.
 *
 * @param {object} config Button configuration
 * @param {object} dt DataTable instance
 */
var _filename = function (config, dt) {
	// Backwards compatibility
	var filename =
		config.filename === '*' &&
		config.title !== '*' &&
		config.title !== undefined &&
		config.title !== null &&
		config.title !== ''
			? config.title
			: config.filename;

	if (typeof filename === 'function') {
		filename = filename(config, dt);
	}

	if (filename === undefined || filename === null) {
		return null;
	}

	if (filename.indexOf('*') !== -1) {
		filename = filename.replace(/\*/g, $('head > title').text()).trim();
	}

	// Strip characters which the OS will object to
	filename = filename.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, '');

	var extension = _stringOrFunction(config.extension, config, dt);
	if (!extension) {
		extension = '';
	}

	return filename + extension;
};

/**
 * Simply utility method to allow parameters to be given as a function
 *
 * @param {undefined|string|function} option Option
 * @return {null|string} Resolved value
 */
var _stringOrFunction = function (option, config, dt) {
	if (option === null || option === undefined) {
		return null;
	}
	else if (typeof option === 'function') {
		return option(config, dt);
	}
	return option;
};

/**
 * Get the title for an exported file.
 *
 * @param {object} config	Button configuration
 */
var _title = function (config, dt) {
	var title = _stringOrFunction(config.title, config, dt);

	return title === null
		? null
		: title.indexOf('*') !== -1
		? title.replace(/\*/g, $('head > title').text() || 'Exported data')
		: title;
};

var _message = function (dt, config, option, position) {
	var message = _stringOrFunction(option, config, dt);
	if (message === null) {
		return null;
	}

	var caption = $('caption', dt.table().container()).eq(0);
	if (message === '*') {
		var side = caption.css('caption-side');
		if (side !== position) {
			return null;
		}

		return caption.length ? caption.text() : '';
	}

	return message;
};

var _exportTextarea = $('<textarea/>')[0];
var _exportData = function (dt, inOpts) {
	var config = $.extend(
		true,
		{},
		{
			rows: null,
			columns: '',
			modifier: {
				search: 'applied',
				order: 'applied'
			},
			orthogonal: 'display',
			stripHtml: true,
			stripNewlines: true,
			decodeEntities: true,
			escapeExcelFormula: false,
			trim: true,
			format: {
				header: function (d) {
					return Buttons.stripData(d, config);
				},
				footer: function (d) {
					return Buttons.stripData(d, config);
				},
				body: function (d) {
					return Buttons.stripData(d, config);
				}
			},
			customizeData: null,
			customizeZip: null
		},
		inOpts
	);

	var header = dt
		.columns(config.columns)
		.indexes()
		.map(function (idx) {
			var col = dt.column(idx);
			return config.format.header(col.title(), idx, col.header());
		})
		.toArray();

	var footer = dt.table().footer()
		? dt
				.columns(config.columns)
				.indexes()
				.map(function (idx) {
					var el = dt.column(idx).footer();
					var val = '';

					if (el) {
						var inner = $('.dt-column-title', el);

						val = inner.length
							? inner.html()
							: $(el).html();
					}

					return config.format.footer(val, idx, el);
				})
				.toArray()
		: null;

	// If Select is available on this table, and any rows are selected, limit the export
	// to the selected rows. If no rows are selected, all rows will be exported. Specify
	// a `selected` modifier to control directly.
	var modifier = $.extend({}, config.modifier);
	if (
		dt.select &&
		typeof dt.select.info === 'function' &&
		modifier.selected === undefined
	) {
		if (
			dt.rows(config.rows, $.extend({ selected: true }, modifier)).any()
		) {
			$.extend(modifier, { selected: true });
		}
	}

	var rowIndexes = dt.rows(config.rows, modifier).indexes().toArray();
	var selectedCells = dt.cells(rowIndexes, config.columns, {
		order: modifier.order
	});
	var cells = selectedCells.render(config.orthogonal).toArray();
	var cellNodes = selectedCells.nodes().toArray();
	var cellIndexes = selectedCells.indexes().toArray();

	var columns = dt.columns(config.columns).count();
	var rows = columns > 0 ? cells.length / columns : 0;
	var body = [];
	var cellCounter = 0;

	for (var i = 0, ien = rows; i < ien; i++) {
		var row = [columns];

		for (var j = 0; j < columns; j++) {
			row[j] = config.format.body(
				cells[cellCounter],
				cellIndexes[cellCounter].row,
				cellIndexes[cellCounter].column,
				cellNodes[cellCounter]
			);
			cellCounter++;
		}

		body[i] = row;
	}

	var data = {
		header: header,
		headerStructure: _headerFormatter(
			config.format.header,
			dt.table().header.structure(config.columns)
		),
		footer: footer,
		footerStructure: _headerFormatter(
			config.format.footer,
			dt.table().footer.structure(config.columns)
		),
		body: body
	};

	if (config.customizeData) {
		config.customizeData(data);
	}

	return data;
};

function _headerFormatter(formatter, struct) {
	for (var i=0 ; i<struct.length ; i++) {
		for (var j=0 ; j<struct[i].length ; j++) {
			var item = struct[i][j];

			if (item) {
				item.title = formatter(
					item.title,
					j,
					item.cell
				);
			}
		}
	}

	return struct;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables interface
 */

// Attach to DataTables objects for global access
$.fn.dataTable.Buttons = Buttons;
$.fn.DataTable.Buttons = Buttons;

// DataTables creation - check if the buttons have been defined for this table,
// they will have been if the `B` option was used in `dom`, otherwise we should
// create the buttons instance here so they can be inserted into the document
// using the API. Listen for `init` for compatibility with pre 1.10.10, but to
// be removed in future.
$(document).on('init.dt plugin-init.dt', function (e, settings) {
	if (e.namespace !== 'dt') {
		return;
	}

	var opts = settings.oInit.buttons || datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].defaults.buttons;

	if (opts && !settings._buttons) {
		new Buttons(settings, opts).container();
	}
});

function _init(settings, options) {
	var api = new datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api(settings);
	var opts = options
		? options
		: api.init().buttons || datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].defaults.buttons;

	return new Buttons(api, opts).container();
}

// DataTables 1 `dom` feature option
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].ext.feature.push({
	fnInit: _init,
	cFeature: 'B'
});

// DataTables 2 layout feature
if (datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].feature) {
	datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].feature.register('buttons', _init);
}


/* harmony default export */ __webpack_exports__["default"] = (datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "../../node_modules/datatables.net-fixedheader-bs4/js/fixedHeader.bootstrap4.mjs":
/*!***************************************************************************************!*\
  !*** ../../node_modules/datatables.net-fixedheader-bs4/js/fixedHeader.bootstrap4.mjs ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! datatables.net-bs4 */ "../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4.mjs");
/* harmony import */ var datatables_net_fixedheader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! datatables.net-fixedheader */ "../../node_modules/datatables.net-fixedheader/js/dataTables.fixedHeader.mjs");
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*! Bootstrap 4 styling wrapper for FixedHeader
 * © SpryMedia Ltd - datatables.net/license
 */





// Allow reassignment of the $ variable
let $ = jquery__WEBPACK_IMPORTED_MODULE_0__;



/* harmony default export */ __webpack_exports__["default"] = (datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "../../node_modules/datatables.net-fixedheader/js/dataTables.fixedHeader.mjs":
/*!***********************************************************************************!*\
  !*** ../../node_modules/datatables.net-fixedheader/js/dataTables.fixedHeader.mjs ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var datatables_net__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! datatables.net */ "../../node_modules/datatables.net/js/dataTables.mjs");
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*! FixedHeader 4.0.1
 * © SpryMedia Ltd - datatables.net/license
 */




// Allow reassignment of the $ variable
let $ = jquery__WEBPACK_IMPORTED_MODULE_0__;


/**
 * @summary     FixedHeader
 * @description Fix a table's header or footer, so it is always visible while
 *              scrolling
 * @version     4.0.1
 * @author      SpryMedia Ltd
 * @contact     datatables.net
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

var _instCounter = 0;

var FixedHeader = function (dt, config) {
	if (!datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].versionCheck('2')) {
		throw 'Warning: FixedHeader requires DataTables 2 or newer';
	}

	// Sanity check - you just know it will happen
	if (!(this instanceof FixedHeader)) {
		throw "FixedHeader must be initialised with the 'new' keyword.";
	}

	// Allow a boolean true for defaults
	if (config === true) {
		config = {};
	}

	dt = new datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api(dt);

	this.c = $.extend(true, {}, FixedHeader.defaults, config);

	this.s = {
		dt: dt,
		position: {
			theadTop: 0,
			tbodyTop: 0,
			tfootTop: 0,
			tfootBottom: 0,
			width: 0,
			left: 0,
			tfootHeight: 0,
			theadHeight: 0,
			windowHeight: $(window).height(),
			visible: true
		},
		headerMode: null,
		footerMode: null,
		autoWidth: dt.settings()[0].oFeatures.bAutoWidth,
		namespace: '.dtfc' + _instCounter++,
		scrollLeft: {
			header: -1,
			footer: -1
		},
		enable: true,
		autoDisable: false
	};

	this.dom = {
		floatingHeader: null,
		thead: $(dt.table().header()),
		tbody: $(dt.table().body()),
		tfoot: $(dt.table().footer()),
		header: {
			host: null,
			floating: null,
			floatingParent: $('<div class="dtfh-floatingparent"><div></div></div>'),
			placeholder: null
		},
		footer: {
			host: null,
			floating: null,
			floatingParent: $('<div class="dtfh-floatingparent"><div></div></div>'),
			placeholder: null
		}
	};

	this.dom.header.host = this.dom.thead.parent();
	this.dom.footer.host = this.dom.tfoot.parent();

	var dtSettings = dt.settings()[0];
	if (dtSettings._fixedHeader) {
		throw (
			'FixedHeader already initialised on table ' + dtSettings.nTable.id
		);
	}

	dtSettings._fixedHeader = this;

	this._constructor();
};

/*
 * Variable: FixedHeader
 * Purpose:  Prototype for FixedHeader
 * Scope:    global
 */
$.extend(FixedHeader.prototype, {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * API methods
	 */

	/**
	 * Kill off FH and any events
	 */
	destroy: function () {
		var dom = this.dom;

		this.s.dt.off('.dtfc');
		$(window).off(this.s.namespace);

		// Remove clones of FC blockers
		if (dom.header.rightBlocker) {
			dom.header.rightBlocker.remove();
		}
		if (dom.header.leftBlocker) {
			dom.header.leftBlocker.remove();
		}
		if (dom.footer.rightBlocker) {
			dom.footer.rightBlocker.remove();
		}
		if (dom.footer.leftBlocker) {
			dom.footer.leftBlocker.remove();
		}

		if (this.c.header) {
			this._modeChange('in-place', 'header', true);
		}

		if (this.c.footer && dom.tfoot.length) {
			this._modeChange('in-place', 'footer', true);
		}
	},

	/**
	 * Enable / disable the fixed elements
	 *
	 * @param  {boolean} enable `true` to enable, `false` to disable
	 */
	enable: function (enable, update, type) {
		this.s.enable = enable;

		this.s.enableType = type;

		if (update || update === undefined) {
			this._positions();
			this._scroll(true);
		}
	},

	/**
	 * Get enabled status
	 */
	enabled: function () {
		return this.s.enable;
	},

	/**
	 * Set header offset
	 *
	 * @param  {int} new value for headerOffset
	 */
	headerOffset: function (offset) {
		if (offset !== undefined) {
			this.c.headerOffset = offset;
			this.update();
		}

		return this.c.headerOffset;
	},

	/**
	 * Set footer offset
	 *
	 * @param  {int} new value for footerOffset
	 */
	footerOffset: function (offset) {
		if (offset !== undefined) {
			this.c.footerOffset = offset;
			this.update();
		}

		return this.c.footerOffset;
	},

	/**
	 * Recalculate the position of the fixed elements and force them into place
	 */
	update: function (force) {
		var table = this.s.dt.table().node();

		// Update should only do something if enabled by the dev.
		if (!this.s.enable && !this.s.autoDisable) {
			return;
		}

		if ($(table).is(':visible')) {
			this.s.autoDisable = false;
			this.enable(true, false);
		}
		else {
			this.s.autoDisable = true;
			this.enable(false, false);
		}

		// Don't update if header is not in the document atm (due to
		// async events)
		if ($(table).children('thead').length === 0) {
			return;
		}

		this._positions();
		this._scroll(force !== undefined ? force : true);
		this._widths(this.dom.header);
		this._widths(this.dom.footer);
	},

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constructor
	 */

	/**
	 * FixedHeader constructor - adding the required event listeners and
	 * simple initialisation
	 *
	 * @private
	 */
	_constructor: function () {
		var that = this;
		var dt = this.s.dt;

		$(window)
			.on('scroll' + this.s.namespace, function () {
				that._scroll();
			})
			.on(
				'resize' + this.s.namespace,
				datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].util.throttle(function () {
					that.s.position.windowHeight = $(window).height();
					that.update();
				}, 50)
			);

		var autoHeader = $('.fh-fixedHeader');
		if (!this.c.headerOffset && autoHeader.length) {
			this.c.headerOffset = autoHeader.outerHeight();
		}

		var autoFooter = $('.fh-fixedFooter');
		if (!this.c.footerOffset && autoFooter.length) {
			this.c.footerOffset = autoFooter.outerHeight();
		}

		dt.on(
			'column-reorder.dt.dtfc column-visibility.dt.dtfc column-sizing.dt.dtfc responsive-display.dt.dtfc',
			function (e, ctx) {
				that.update();
			}
		).on('draw.dt.dtfc', function (e, ctx) {
			// For updates from our own table, don't reclone, but for all others, do
			that.update(ctx === dt.settings()[0] ? false : true);
		});

		dt.on('destroy.dtfc', function () {
			that.destroy();
		});

		this._positions();
		this._scroll();
	},

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods
	 */

	/**
	 * Clone a fixed item to act as a place holder for the original element
	 * which is moved into a clone of the table element, and moved around the
	 * document to give the fixed effect.
	 *
	 * @param  {string}  item  'header' or 'footer'
	 * @param  {boolean} force Force the clone to happen, or allow automatic
	 *   decision (reuse existing if available)
	 * @private
	 */
	_clone: function (item, force) {
		var that = this;
		var dt = this.s.dt;
		var itemDom = this.dom[item];
		var itemElement = item === 'header' ? this.dom.thead : this.dom.tfoot;

		// If footer and scrolling is enabled then we don't clone
		// Instead the table's height is decreased accordingly - see `_scroll()`
		if (item === 'footer' && this._scrollEnabled()) {
			return;
		}

		if (!force && itemDom.floating) {
			// existing floating element - reuse it
			itemDom.floating.removeClass(
				'fixedHeader-floating fixedHeader-locked'
			);
		}
		else {
			if (itemDom.floating) {
				if (itemDom.placeholder !== null) {
					itemDom.placeholder.remove();
				}

				itemDom.floating.children().detach();
				itemDom.floating.remove();
			}

			var tableNode = $(dt.table().node());
			var scrollBody = $(tableNode.parent());
			var scrollEnabled = this._scrollEnabled();

			itemDom.floating = $(dt.table().node().cloneNode(false))
				.attr('aria-hidden', 'true')
				.css({
					top: 0,
					left: 0
				})
				.removeAttr('id');

			itemDom.floatingParent
				.css({
					width: scrollBody[0].offsetWidth,
					overflow: 'hidden',
					height: 'fit-content',
					position: 'fixed',
					left: scrollEnabled
						? tableNode.offset().left + scrollBody.scrollLeft()
						: 0
				})
				.css(
					item === 'header'
						? {
								top: this.c.headerOffset,
								bottom: ''
						}
						: {
								top: '',
								bottom: this.c.footerOffset
						}
				)
				.addClass(
					item === 'footer'
						? 'dtfh-floatingparent-foot'
						: 'dtfh-floatingparent-head'
				)
				.appendTo('body')
				.children()
				.eq(0)
				.append(itemDom.floating);

			this._stickyPosition(itemDom.floating, '-');

			var scrollLeftUpdate = function () {
				var scrollLeft = scrollBody.scrollLeft();
				that.s.scrollLeft = { footer: scrollLeft, header: scrollLeft };
				itemDom.floatingParent.scrollLeft(that.s.scrollLeft.header);
			};

			scrollLeftUpdate();
			scrollBody.off('scroll.dtfh').on('scroll.dtfh', scrollLeftUpdate);

			// Need padding on the header's container to allow for a scrollbar,
			// just like how DataTables handles it
			itemDom.floatingParent.children().css({
				width: 'fit-content',
				paddingRight: that.s.dt.settings()[0].oBrowser.barWidth
			});

			// Blocker to hide the table behind the scrollbar - this needs to use
			// fixed positioning in the container since we don't have an outer wrapper
			let blocker = $(
				item === 'footer'
					? 'div.dtfc-bottom-blocker'
					: 'div.dtfc-top-blocker',
				dt.table().container()
			);

			if (blocker.length) {
				blocker
					.clone()
					.appendTo(itemDom.floatingParent)
					.css({
						position: 'fixed',
						right: blocker.width()
					});
			}

			// Insert a fake thead/tfoot into the DataTable to stop it jumping around
			itemDom.placeholder = itemElement.clone(false);
			itemDom.placeholder.find('*[id]').removeAttr('id');

			// Move the thead / tfoot elements around - original into the floating
			// element and clone into the original table
			itemDom.host.prepend(itemDom.placeholder);
			itemDom.floating.append(itemElement);

			this._widths(itemDom);
		}
	},

	/**
	 * This method sets the sticky position of the header elements to match fixed columns
	 * @param {JQuery<HTMLElement>} el
	 * @param {string} sign
	 */
	_stickyPosition: function (el, sign) {
		if (this._scrollEnabled()) {
			var that = this;
			var rtl = $(that.s.dt.table().node()).css('direction') === 'rtl';

			el.find('th').each(function () {
				// Find out if fixed header has previously set this column
				if ($(this).css('position') === 'sticky') {
					var right = $(this).css('right');
					var left = $(this).css('left');
					var potential;

					if (right !== 'auto' && !rtl) {
						potential = +right.replace(/px/g, '')

						$(this).css('right', potential > 0 ? potential : 0);
					}
					else if (left !== 'auto' && rtl) {
						potential = +left.replace(/px/g, '');

						$(this).css('left', potential > 0 ? potential : 0);
					}
				}
			});
		}
	},

	/**
	 * Reposition the floating elements to take account of horizontal page
	 * scroll
	 *
	 * @param  {string} item       The `header` or `footer`
	 * @param  {int}    scrollLeft Document scrollLeft
	 * @private
	 */
	_horizontal: function (item, scrollLeft) {
		var itemDom = this.dom[item];
		var lastScrollLeft = this.s.scrollLeft;

		if (itemDom.floating && lastScrollLeft[item] !== scrollLeft) {
			// If scrolling is enabled we need to match the floating header to the body
			if (this._scrollEnabled()) {
				var newScrollLeft = $(
					$(this.s.dt.table().node()).parent()
				).scrollLeft();
				itemDom.floating.scrollLeft(newScrollLeft);
				itemDom.floatingParent.scrollLeft(newScrollLeft);
			}

			lastScrollLeft[item] = scrollLeft;
		}
	},

	/**
	 * Change from one display mode to another. Each fixed item can be in one
	 * of:
	 *
	 * * `in-place` - In the main DataTable
	 * * `in` - Floating over the DataTable
	 * * `below` - (Header only) Fixed to the bottom of the table body
	 * * `above` - (Footer only) Fixed to the top of the table body
	 *
	 * @param  {string}  mode        Mode that the item should be shown in
	 * @param  {string}  item        'header' or 'footer'
	 * @param  {boolean} forceChange Force a redraw of the mode, even if already
	 *     in that mode.
	 * @private
	 */
	_modeChange: function (mode, item, forceChange) {
		var itemDom = this.dom[item];
		var position = this.s.position;

		// Just determine if scroll is enabled once
		var scrollEnabled = this._scrollEnabled();

		// If footer and scrolling is enabled then we don't clone
		// Instead the table's height is decreased accordingly - see `_scroll()`
		if (item === 'footer' && scrollEnabled) {
			return;
		}

		// It isn't trivial to add a !important css attribute...
		var importantWidth = function (w) {
			itemDom.floating[0].style.setProperty('width', w + 'px', 'important');

			// If not scrolling also have to update the floatingParent
			if (!scrollEnabled) {
				itemDom.floatingParent[0].style.setProperty('width', w + 'px', 'important');
			}
		};

		// Record focus. Browser's will cause input elements to loose focus if
		// they are inserted else where in the doc
		var tablePart = this.dom[item === 'footer' ? 'tfoot' : 'thead'];
		var focus = $.contains(tablePart[0], document.activeElement)
			? document.activeElement
			: null;
		var scrollBody = $($(this.s.dt.table().node()).parent());

		if (mode === 'in-place') {
			// Insert the header back into the table's real header
			if (itemDom.placeholder) {
				itemDom.placeholder.remove();
				itemDom.placeholder = null;
			}

			if (item === 'header') {
				itemDom.host.prepend(tablePart);
			}
			else {
				itemDom.host.append(tablePart);
			}

			if (itemDom.floating) {
				itemDom.floating.remove();
				itemDom.floating = null;
				this._stickyPosition(itemDom.host, '+');
			}

			if (itemDom.floatingParent) {
				itemDom.floatingParent.find('div.dtfc-top-blocker').remove();
				itemDom.floatingParent.remove();
			}

			$($(itemDom.host.parent()).parent()).scrollLeft(
				scrollBody.scrollLeft()
			);
		}
		else if (mode === 'in') {
			// Remove the header from the real table and insert into a fixed
			// positioned floating table clone
			this._clone(item, forceChange);

			// Get useful position values
			var scrollOffset = scrollBody.offset();
			var windowTop = $(document).scrollTop();
			var windowHeight = $(window).height();
			var windowBottom = windowTop + windowHeight;
			var bodyTop = scrollEnabled ? scrollOffset.top : position.tbodyTop;
			var bodyBottom = scrollEnabled
				? scrollOffset.top + scrollBody.outerHeight()
				: position.tfootTop;

			// Calculate the amount that the footer or header needs to be shuffled
			var shuffle;

			if (item === 'footer') {
				shuffle =
					bodyTop > windowBottom
						? position.tfootHeight // Yes - push the footer below
						: bodyTop + position.tfootHeight - windowBottom; // No
			}
			else {
				// Otherwise must be a header so get the difference from the bottom of the
				//  desired floating header and the bottom of the table body
				shuffle =
					windowTop +
					this.c.headerOffset +
					position.theadHeight -
					bodyBottom;
			}

			// Set the top or bottom based off of the offset and the shuffle value
			var prop = item === 'header' ? 'top' : 'bottom';
			var val = this.c[item + 'Offset'] - (shuffle > 0 ? shuffle : 0);

			itemDom.floating.addClass('fixedHeader-floating');
			itemDom.floatingParent
				.css(prop, val)
				.css({
					left: position.left,
					'z-index': 3
				});

			importantWidth(position.width);

			if (item === 'footer') {
				itemDom.floating.css('top', '');
			}
		}
		else if (mode === 'below') {
			// only used for the header
			// Fix the position of the floating header at base of the table body
			this._clone(item, forceChange);

			itemDom.floating.addClass('fixedHeader-locked');
			itemDom.floatingParent.css({
				position: 'absolute',
				top: position.tfootTop - position.theadHeight,
				left: position.left + 'px'
			});

			importantWidth(position.width);
		}
		else if (mode === 'above') {
			// only used for the footer
			// Fix the position of the floating footer at top of the table body
			this._clone(item, forceChange);

			itemDom.floating.addClass('fixedHeader-locked');
			itemDom.floatingParent.css({
				position: 'absolute',
				top: position.tbodyTop,
				left: position.left + 'px'
			});

			importantWidth(position.width);
		}

		// Restore focus if it was lost
		if (focus && focus !== document.activeElement) {
			setTimeout(function () {
				focus.focus();
			}, 10);
		}

		this.s.scrollLeft.header = -1;
		this.s.scrollLeft.footer = -1;
		this.s[item + 'Mode'] = mode;
	},

	/**
	 * Cache the positional information that is required for the mode
	 * calculations that FixedHeader performs.
	 *
	 * @private
	 */
	_positions: function () {
		var dt = this.s.dt;
		var table = dt.table();
		var position = this.s.position;
		var dom = this.dom;
		var tableNode = $(table.node());
		var scrollEnabled = this._scrollEnabled();

		// Need to use the header and footer that are in the main table,
		// regardless of if they are clones, since they hold the positions we
		// want to measure from
		var thead = $(dt.table().header());
		var tfoot = $(dt.table().footer());
		var tbody = dom.tbody;
		var scrollBody = tableNode.parent();

		position.visible = tableNode.is(':visible');
		position.width = tableNode.outerWidth();
		position.left = tableNode.offset().left;
		position.theadTop = thead.offset().top;
		position.tbodyTop = scrollEnabled
			? scrollBody.offset().top
			: tbody.offset().top;
		position.tbodyHeight = scrollEnabled
			? scrollBody.outerHeight()
			: tbody.outerHeight();
		position.theadHeight = thead.outerHeight();
		position.theadBottom = position.theadTop + position.theadHeight;
		position.tfootTop = position.tbodyTop + position.tbodyHeight; //tfoot.offset().top;

		if (tfoot.length) {
			position.tfootBottom = position.tfootTop + tfoot.outerHeight();
			position.tfootHeight = tfoot.outerHeight();
		}
		else {
			position.tfootBottom = position.tfootTop;
			position.tfootHeight = 0;
		}
	},

	/**
	 * Mode calculation - determine what mode the fixed items should be placed
	 * into.
	 *
	 * @param  {boolean} forceChange Force a redraw of the mode, even if already
	 *     in that mode.
	 * @private
	 */
	_scroll: function (forceChange) {
		if (this.s.dt.settings()[0].bDestroying) {
			return;
		}

		// ScrollBody details
		var scrollEnabled = this._scrollEnabled();
		var scrollBody = $(this.s.dt.table().node()).parent();
		var scrollOffset = scrollBody.offset();
		var scrollHeight = scrollBody.outerHeight();

		// Window details
		var windowLeft = $(document).scrollLeft();
		var windowTop = $(document).scrollTop();
		var windowHeight = $(window).height();
		var windowBottom = windowHeight + windowTop;

		var position = this.s.position;
		var headerMode, footerMode;

		// Body Details
		var bodyTop = scrollEnabled ? scrollOffset.top : position.tbodyTop;
		var bodyLeft = scrollEnabled ? scrollOffset.left : position.left;
		var bodyBottom = scrollEnabled
			? scrollOffset.top + scrollHeight
			: position.tfootTop;
		var bodyWidth = scrollEnabled
			? scrollBody.outerWidth()
			: position.tbodyWidth;

		if (this.c.header) {
			if (!this.s.enable) {
				headerMode = 'in-place';
			}
			// The header is in it's normal place if the body top is lower than
			//  the scroll of the window plus the headerOffset and the height of the header
			else if (
				!position.visible ||
				windowTop + this.c.headerOffset + position.theadHeight <=
					bodyTop
			) {
				headerMode = 'in-place';
			}
			// The header should be floated if
			else if (
				// The scrolling plus the header offset plus the height of the header is lower than the top of the body
				windowTop + this.c.headerOffset + position.theadHeight >
					bodyTop &&
				// And the scrolling at the top plus the header offset is above the bottom of the body
				windowTop + this.c.headerOffset + position.theadHeight <
					bodyBottom
			) {
				headerMode = 'in';

				// Further to the above, If the scrolling plus the header offset plus the header height is lower
				// than the bottom of the table a shuffle is required so have to force the calculation
				if (
					windowTop + this.c.headerOffset + position.theadHeight >
						bodyBottom ||
					this.dom.header.floatingParent === undefined
				) {
					forceChange = true;
				}
				else {
					this.dom.header.floatingParent
						.css({
							top: this.c.headerOffset,
							position: 'fixed'
						})
						.children()
						.eq(0)
						.append(this.dom.header.floating);
				}
			}
			// Anything else and the view is below the table
			else {
				headerMode = 'below';
			}

			if (forceChange || headerMode !== this.s.headerMode) {
				this._modeChange(headerMode, 'header', forceChange);
			}

			this._horizontal('header', windowLeft);
		}

		var header = {
			offset: { top: 0, left: 0 },
			height: 0
		};
		var footer = {
			offset: { top: 0, left: 0 },
			height: 0
		};

		if (
			this.c.footer &&
			this.dom.tfoot.length &&
			this.dom.tfoot.find('th, td').length
		) {
			if (!this.s.enable) {
				footerMode = 'in-place';
			}
			else if (
				!position.visible ||
				position.tfootBottom + this.c.footerOffset <= windowBottom
			) {
				footerMode = 'in-place';
			}
			else if (
				bodyBottom + position.tfootHeight + this.c.footerOffset >
					windowBottom &&
				bodyTop + this.c.footerOffset < windowBottom
			) {
				footerMode = 'in';
				forceChange = true;
			}
			else {
				footerMode = 'above';
			}

			if (forceChange || footerMode !== this.s.footerMode) {
				this._modeChange(footerMode, 'footer', forceChange);
			}

			this._horizontal('footer', windowLeft);

			var getOffsetHeight = function (el) {
				return {
					offset: el.offset(),
					height: el.outerHeight()
				};
			};

			header = this.dom.header.floating
				? getOffsetHeight(this.dom.header.floating)
				: getOffsetHeight(this.dom.thead);
			footer = this.dom.footer.floating
				? getOffsetHeight(this.dom.footer.floating)
				: getOffsetHeight(this.dom.tfoot);

			// If scrolling is enabled and the footer is off the screen
			if (scrollEnabled && footer.offset.top > windowTop) {
				// && footer.offset.top >= windowBottom) {
				// Calculate the gap between the top of the scrollBody and the top of the window
				var overlap = windowTop - scrollOffset.top;
				// The new height is the bottom of the window
				var newHeight =
					windowBottom +
					// If the gap between the top of the scrollbody and the window is more than
					//  the height of the header then the top of the table is still visible so add that gap
					// Doing this has effectively calculated the height from the top of the table to the bottom of the current page
					(overlap > -header.height ? overlap : 0) -
					// Take from that
					// The top of the header plus
					(header.offset.top +
						// The header height if the standard header is present
						(overlap < -header.height ? header.height : 0) +
						// And the height of the footer
						footer.height);

				// Don't want a negative height
				if (newHeight < 0) {
					newHeight = 0;
				}

				// At the end of the above calculation the space between the header (top of the page if floating)
				// and the point just above the footer should be the new value for the height of the table.
				scrollBody.outerHeight(newHeight);

				// Need some rounding here as sometimes very small decimal places are encountered
				// If the actual height is bigger or equal to the height we just applied then the footer is "Floating"
				if (
					Math.round(scrollBody.outerHeight()) >=
					Math.round(newHeight)
				) {
					$(this.dom.tfoot.parent()).addClass('fixedHeader-floating');
				}
				// Otherwise max-width has kicked in so it is not floating
				else {
					$(this.dom.tfoot.parent()).removeClass(
						'fixedHeader-floating'
					);
				}
			}
		}

		if (this.dom.header.floating) {
			this.dom.header.floatingParent.css('left', bodyLeft - windowLeft);
		}
		if (this.dom.footer.floating) {
			this.dom.footer.floatingParent.css('left', bodyLeft - windowLeft);
		}

		// If fixed columns is being used on this table then the blockers need to be copied across
		// Cloning these is cleaner than creating as our own as it will keep consistency with fixedColumns automatically
		// ASSUMING that the class remains the same
		if (this.s.dt.settings()[0]._fixedColumns !== undefined) {
			var adjustBlocker = function (side, end, el) {
				if (el === undefined) {
					var blocker = $(
						'div.dtfc-' + side + '-' + end + '-blocker'
					);

					el =
						blocker.length === 0
							? null
							: blocker.clone().css('z-index', 1);
				}

				if (el !== null) {
					if (headerMode === 'in' || headerMode === 'below') {
						el.appendTo('body').css({
							top:
								end === 'top'
									? header.offset.top
									: footer.offset.top,
							left:
								side === 'right'
									? bodyLeft + bodyWidth - el.width()
									: bodyLeft
						});
					}
					else {
						el.detach();
					}
				}

				return el;
			};

			// Adjust all blockers
			this.dom.header.rightBlocker = adjustBlocker(
				'right',
				'top',
				this.dom.header.rightBlocker
			);
			this.dom.header.leftBlocker = adjustBlocker(
				'left',
				'top',
				this.dom.header.leftBlocker
			);
			this.dom.footer.rightBlocker = adjustBlocker(
				'right',
				'bottom',
				this.dom.footer.rightBlocker
			);
			this.dom.footer.leftBlocker = adjustBlocker(
				'left',
				'bottom',
				this.dom.footer.leftBlocker
			);
		}
	},

	/**
	 * Function to check if scrolling is enabled on the table or not
	 * @returns Boolean value indicating if scrolling on the table is enabled or not
	 */
	_scrollEnabled: function () {
		var oScroll = this.s.dt.settings()[0].oScroll;
		if (oScroll.sY !== '' || oScroll.sX !== '') {
			return true;
		}
		return false;
	},

	/**
	 * Realign columns by using the colgroup tag and
	 * checking column widths
	 */
	_widths: function (itemDom) {
		if (! itemDom || ! itemDom.placeholder) {
			return;
		}

		// Match the table overall width
		var tableNode = $(this.s.dt.table().node());
		var scrollBody = $(tableNode.parent());

		itemDom.floatingParent.css('width', scrollBody[0].offsetWidth);
		itemDom.floating.css('width', tableNode[0].offsetWidth);

		// Strip out the old colgroup
		$('colgroup', itemDom.floating).remove();

		// Copy the `colgroup` element to define the number of columns - needed
		// for complex header cases where a column might not have a unique
		// header
		var cols = itemDom.placeholder
			.parent()
			.find('colgroup')
			.clone()
			.appendTo(itemDom.floating)
			.find('col');

		// However, the widths defined in the colgroup from the DataTable might
		// not exactly reflect the actual widths of the columns (content can
		// force it to stretch). So we need to copy the actual widths into the
		// colgroup / col's used for the floating header.
		var widths = this.s.dt.columns(':visible').widths();

		for (var i=0 ; i<widths.length ; i++) {
			cols.eq(i).css('width', widths[i]);
		}
	}
});

/**
 * Version
 * @type {String}
 * @static
 */
FixedHeader.version = '4.0.1';

/**
 * Defaults
 * @type {Object}
 * @static
 */
FixedHeader.defaults = {
	header: true,
	footer: false,
	headerOffset: 0,
	footerOffset: 0
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables interfaces
 */

// Attach for constructor access
$.fn.dataTable.FixedHeader = FixedHeader;
$.fn.DataTable.FixedHeader = FixedHeader;

// DataTables creation - check if the FixedHeader option has been defined on the
// table and if so, initialise
$(document).on('init.dt.dtfh', function (e, settings, json) {
	if (e.namespace !== 'dt') {
		return;
	}

	var init = settings.oInit.fixedHeader;
	var defaults = datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].defaults.fixedHeader;

	if ((init || defaults) && !settings._fixedHeader) {
		var opts = $.extend({}, defaults, init);

		if (init !== false) {
			new FixedHeader(settings, opts);
		}
	}
});

// DataTables API methods
datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('fixedHeader()', function () { });

datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('fixedHeader.adjust()', function () {
	return this.iterator('table', function (ctx) {
		var fh = ctx._fixedHeader;

		if (fh) {
			fh.update();
		}
	});
});

datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('fixedHeader.enable()', function (flag) {
	return this.iterator('table', function (ctx) {
		var fh = ctx._fixedHeader;

		flag = flag !== undefined ? flag : true;
		if (fh && flag !== fh.enabled()) {
			fh.enable(flag);
		}
	});
});

datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('fixedHeader.enabled()', function () {
	if (this.context.length) {
		var fh = this.context[0]._fixedHeader;

		if (fh) {
			return fh.enabled();
		}
	}

	return false;
});

datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('fixedHeader.disable()', function () {
	return this.iterator('table', function (ctx) {
		var fh = ctx._fixedHeader;

		if (fh && fh.enabled()) {
			fh.enable(false);
		}
	});
});

$.each(['header', 'footer'], function (i, el) {
	datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('fixedHeader.' + el + 'Offset()', function (offset) {
		var ctx = this.context;

		if (offset === undefined) {
			return ctx.length && ctx[0]._fixedHeader
				? ctx[0]._fixedHeader[el + 'Offset']()
				: undefined;
		}

		return this.iterator('table', function (ctx) {
			var fh = ctx._fixedHeader;

			if (fh) {
				fh[el + 'Offset'](offset);
			}
		});
	});
});


/* harmony default export */ __webpack_exports__["default"] = (datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "../../node_modules/datatables.net-responsive-bs4/js/responsive.bootstrap4.mjs":
/*!*************************************************************************************!*\
  !*** ../../node_modules/datatables.net-responsive-bs4/js/responsive.bootstrap4.mjs ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! datatables.net-bs4 */ "../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4.mjs");
/* harmony import */ var datatables_net_responsive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! datatables.net-responsive */ "../../node_modules/datatables.net-responsive/js/dataTables.responsive.mjs");
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*! Bootstrap 4 integration for DataTables' Responsive
 * © SpryMedia Ltd - datatables.net/license
 */





// Allow reassignment of the $ variable
let $ = jquery__WEBPACK_IMPORTED_MODULE_0__;


var _display = datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__["default"].Responsive.display;
var _original = _display.modal;
var _modal = $(
	'<div class="modal fade dtr-bs-modal" role="dialog">' +
		'<div class="modal-dialog" role="document">' +
		'<div class="modal-content">' +
		'<div class="modal-header">' +
		'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'</div>' +
		'<div class="modal-body"/>' +
		'</div>' +
		'</div>' +
		'</div>'
);

_display.modal = function (options) {
	return function (row, update, render, closeCallback) {
		if (!$.fn.modal) {
			return _original(row, update, render, closeCallback);
		}
		else {
			var rendered = render();

			if (rendered === false) {
				return false;
			}

			if (!update) {
				if (options && options.header) {
					var header = _modal.find('div.modal-header');
					var button = header.find('button').detach();

					header
						.empty()
						.append('<h4 class="modal-title">' + options.header(row) + '</h4>')
						.append(button);
				}

				_modal.find('div.modal-body').empty().append(rendered);

				_modal
					.data('dtr-row-idx', row.index())
					.one('hidden.bs.modal', closeCallback)
					.appendTo('body')
					.modal();
			}
			else {
				if ($.contains(document, _modal[0]) && row.index() === _modal.data('dtr-row-idx')) {
					_modal.find('div.modal-body').empty().append(rendered);
				}
				else {
					// Modal not shown - do nothing
					return null;
				}
			}

			return true;
		}
	};
};


/* harmony default export */ __webpack_exports__["default"] = (datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "../../node_modules/datatables.net-responsive/js/dataTables.responsive.mjs":
/*!*********************************************************************************!*\
  !*** ../../node_modules/datatables.net-responsive/js/dataTables.responsive.mjs ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var datatables_net__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! datatables.net */ "../../node_modules/datatables.net/js/dataTables.mjs");
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*! Responsive 3.0.3
 * © SpryMedia Ltd - datatables.net/license
 */




// Allow reassignment of the $ variable
let $ = jquery__WEBPACK_IMPORTED_MODULE_0__;


/**
 * @summary     Responsive
 * @description Responsive tables plug-in for DataTables
 * @version     3.0.3
 * @author      SpryMedia Ltd
 * @copyright   SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

/**
 * Responsive is a plug-in for the DataTables library that makes use of
 * DataTables' ability to change the visibility of columns, changing the
 * visibility of columns so the displayed columns fit into the table container.
 * The end result is that complex tables will be dynamically adjusted to fit
 * into the viewport, be it on a desktop, tablet or mobile browser.
 *
 * Responsive for DataTables has two modes of operation, which can used
 * individually or combined:
 *
 * * Class name based control - columns assigned class names that match the
 *   breakpoint logic can be shown / hidden as required for each breakpoint.
 * * Automatic control - columns are automatically hidden when there is no
 *   room left to display them. Columns removed from the right.
 *
 * In additional to column visibility control, Responsive also has built into
 * options to use DataTables' child row display to show / hide the information
 * from the table that has been hidden. There are also two modes of operation
 * for this child row display:
 *
 * * Inline - when the control element that the user can use to show / hide
 *   child rows is displayed inside the first column of the table.
 * * Column - where a whole column is dedicated to be the show / hide control.
 *
 * Initialisation of Responsive is performed by:
 *
 * * Adding the class `responsive` or `dt-responsive` to the table. In this case
 *   Responsive will automatically be initialised with the default configuration
 *   options when the DataTable is created.
 * * Using the `responsive` option in the DataTables configuration options. This
 *   can also be used to specify the configuration options, or simply set to
 *   `true` to use the defaults.
 *
 *  @class
 *  @param {object} settings DataTables settings object for the host table
 *  @param {object} [opts] Configuration options
 *  @requires jQuery 1.7+
 *  @requires DataTables 1.10.3+
 *
 *  @example
 *      $('#example').DataTable( {
 *        responsive: true
 *      } );
 *    } );
 */
var Responsive = function (settings, opts) {
	// Sanity check that we are using DataTables 1.10 or newer
	if (!datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].versionCheck || !datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].versionCheck('2')) {
		throw 'DataTables Responsive requires DataTables 2 or newer';
	}

	this.s = {
		childNodeStore: {},
		columns: [],
		current: [],
		dt: new datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api(settings)
	};

	// Check if responsive has already been initialised on this table
	if (this.s.dt.settings()[0].responsive) {
		return;
	}

	// details is an object, but for simplicity the user can give it as a string
	// or a boolean
	if (opts && typeof opts.details === 'string') {
		opts.details = { type: opts.details };
	}
	else if (opts && opts.details === false) {
		opts.details = { type: false };
	}
	else if (opts && opts.details === true) {
		opts.details = { type: 'inline' };
	}

	this.c = $.extend(
		true,
		{},
		Responsive.defaults,
		datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].defaults.responsive,
		opts
	);
	settings.responsive = this;
	this._constructor();
};

$.extend(Responsive.prototype, {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constructor
	 */

	/**
	 * Initialise the Responsive instance
	 *
	 * @private
	 */
	_constructor: function () {
		var that = this;
		var dt = this.s.dt;
		var oldWindowWidth = $(window).innerWidth();

		dt.settings()[0]._responsive = this;

		// Use DataTables' throttle function to avoid processor thrashing
		$(window).on(
			'orientationchange.dtr',
			datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].util.throttle(function () {
				// iOS has a bug whereby resize can fire when only scrolling
				// See: http://stackoverflow.com/questions/8898412
				var width = $(window).innerWidth();

				if (width !== oldWindowWidth) {
					that._resize();
					oldWindowWidth = width;
				}
			})
		);

		// Handle new rows being dynamically added - needed as responsive
		// updates all rows (shown or not) a responsive change, rather than
		// per draw.
		dt.on('row-created.dtr', function (e, tr, data, idx) {
			if ($.inArray(false, that.s.current) !== -1) {
				$('>td, >th', tr).each(function (i) {
					var idx = dt.column.index('toData', i);

					if (that.s.current[idx] === false) {
						$(this)
							.css('display', 'none')
							.addClass('dtr-hidden');
					}
				});
			}
		});

		// Destroy event handler
		dt.on('destroy.dtr', function () {
			dt.off('.dtr');
			$(dt.table().body()).off('.dtr');
			$(window).off('resize.dtr orientationchange.dtr');
			dt.cells('.dtr-control').nodes().to$().removeClass('dtr-control');
			$(dt.table().node()).removeClass('dtr-inline collapsed');

			// Restore the columns that we've hidden
			$.each(that.s.current, function (i, val) {
				if (val === false) {
					that._setColumnVis(i, true);
				}
			});
		});

		// Reorder the breakpoints array here in case they have been added out
		// of order
		this.c.breakpoints.sort(function (a, b) {
			return a.width < b.width ? 1 : a.width > b.width ? -1 : 0;
		});

		this._classLogic();

		// Details handler
		var details = this.c.details;

		if (details.type !== false) {
			that._detailsInit();

			// DataTables will trigger this event on every column it shows and
			// hides individually
			dt.on('column-visibility.dtr', function () {
				// Use a small debounce to allow multiple columns to be set together
				if (that._timer) {
					clearTimeout(that._timer);
				}

				that._timer = setTimeout(function () {
					that._timer = null;

					that._classLogic();
					that._resizeAuto();
					that._resize(true);

					that._redrawChildren();
				}, 100);
			});

			// Redraw the details box on each draw which will happen if the data
			// has changed. This is used until DataTables implements a native
			// `updated` event for rows
			dt.on('draw.dtr', function () {
				that._redrawChildren();
			});

			$(dt.table().node()).addClass('dtr-' + details.type);
		}

		// DT2 let's us tell it if we are hiding columns
		dt.on('column-calc.dt', function (e, d) {
			var curr = that.s.current;

			for (var i = 0; i < curr.length; i++) {
				var idx = d.visible.indexOf(i);

				if (curr[i] === false && idx >= 0) {
					d.visible.splice(idx, 1);
				}
			}
		});

		// On Ajax reload we want to reopen any child rows which are displayed
		// by responsive
		dt.on('preXhr.dtr', function () {
			var rowIds = [];
			dt.rows().every(function () {
				if (this.child.isShown()) {
					rowIds.push(this.id(true));
				}
			});

			dt.one('draw.dtr', function () {
				that._resizeAuto();
				that._resize();

				dt.rows(rowIds).every(function () {
					that._detailsDisplay(this, false);
				});
			});
		});

		// First pass when the table is ready
		dt
			.on('draw.dtr', function () {
				that._controlClass();
			})
			.ready(function () {
				that._resizeAuto();
				that._resize();

				// Attach listeners after first pass
				dt.on('column-reorder.dtr', function (e, settings, details) {
					that._classLogic();
					that._resizeAuto();
					that._resize(true);
				});

				// Change in column sizes means we need to calc
				dt.on('column-sizing.dtr', function () {
					that._resizeAuto();
					that._resize();
				});
			});
	},

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods
	 */

	/**
	 * Insert a `col` tag into the correct location in a `colgroup`.
	 *
	 * @param {jQuery} colGroup The `colgroup` tag
	 * @param {jQuery} colEl The `col` tag
	 */
	_colGroupAttach: function (colGroup, colEls, idx) {
		var found = null;

		// No need to do anything if already attached
		if (colEls[idx].get(0).parentNode === colGroup[0]) {
			return;
		}

		// Find the first `col` after our own which is already attached
		for (var i = idx+1; i < colEls.length; i++) {
			if (colGroup[0] === colEls[i].get(0).parentNode) {
				found = i;
				break;
			}
		}

		if (found !== null) {
			// Insert before
			colEls[idx].insertBefore(colEls[found][0]);
		}
		else {
			// If wasn't found, insert at the end
			colGroup.append(colEls[idx]);
		}
	},

	/**
	 * Get and store nodes from a cell - use for node moving renderers
	 *
	 * @param {*} dt DT instance
	 * @param {*} row Row index
	 * @param {*} col Column index
	 */
	_childNodes: function (dt, row, col) {
		var name = row + '-' + col;

		if (this.s.childNodeStore[name]) {
			return this.s.childNodeStore[name];
		}

		// https://jsperf.com/childnodes-array-slice-vs-loop
		var nodes = [];
		var children = dt.cell(row, col).node().childNodes;
		for (var i = 0, ien = children.length; i < ien; i++) {
			nodes.push(children[i]);
		}

		this.s.childNodeStore[name] = nodes;

		return nodes;
	},

	/**
	 * Restore nodes from the cache to a table cell
	 *
	 * @param {*} dt DT instance
	 * @param {*} row Row index
	 * @param {*} col Column index
	 */
	_childNodesRestore: function (dt, row, col) {
		var name = row + '-' + col;

		if (!this.s.childNodeStore[name]) {
			return;
		}

		var node = dt.cell(row, col).node();
		var store = this.s.childNodeStore[name];
		if (store.length > 0) {
			var parent = store[0].parentNode;
			var parentChildren = parent.childNodes;
			var a = [];

			for (var i = 0, ien = parentChildren.length; i < ien; i++) {
				a.push(parentChildren[i]);
			}

			for (var j = 0, jen = a.length; j < jen; j++) {
				node.appendChild(a[j]);
			}
		}

		this.s.childNodeStore[name] = undefined;
	},

	/**
	 * Calculate the visibility for the columns in a table for a given
	 * breakpoint. The result is pre-determined based on the class logic if
	 * class names are used to control all columns, but the width of the table
	 * is also used if there are columns which are to be automatically shown
	 * and hidden.
	 *
	 * @param  {string} breakpoint Breakpoint name to use for the calculation
	 * @return {array} Array of boolean values initiating the visibility of each
	 *   column.
	 *  @private
	 */
	_columnsVisiblity: function (breakpoint) {
		var dt = this.s.dt;
		var columns = this.s.columns;
		var i, ien;

		// Create an array that defines the column ordering based first on the
		// column's priority, and secondly the column index. This allows the
		// columns to be removed from the right if the priority matches
		var order = columns
			.map(function (col, idx) {
				return {
					columnIdx: idx,
					priority: col.priority
				};
			})
			.sort(function (a, b) {
				if (a.priority !== b.priority) {
					return a.priority - b.priority;
				}
				return a.columnIdx - b.columnIdx;
			});

		// Class logic - determine which columns are in this breakpoint based
		// on the classes. If no class control (i.e. `auto`) then `-` is used
		// to indicate this to the rest of the function
		var display = $.map(columns, function (col, i) {
			if (dt.column(i).visible() === false) {
				return 'not-visible';
			}
			return col.auto && col.minWidth === null
				? false
				: col.auto === true
				? '-'
				: $.inArray(breakpoint, col.includeIn) !== -1;
		});

		// Auto column control - first pass: how much width is taken by the
		// ones that must be included from the non-auto columns
		var requiredWidth = 0;
		for (i = 0, ien = display.length; i < ien; i++) {
			if (display[i] === true) {
				requiredWidth += columns[i].minWidth;
			}
		}

		// Second pass, use up any remaining width for other columns. For
		// scrolling tables we need to subtract the width of the scrollbar. It
		// may not be requires which makes this sub-optimal, but it would
		// require another full redraw to make complete use of those extra few
		// pixels
		var scrolling = dt.settings()[0].oScroll;
		var bar = scrolling.sY || scrolling.sX ? scrolling.iBarWidth : 0;
		var widthAvailable = dt.table().container().offsetWidth - bar;
		var usedWidth = widthAvailable - requiredWidth;

		// Control column needs to always be included. This makes it sub-
		// optimal in terms of using the available with, but to stop layout
		// thrashing or overflow. Also we need to account for the control column
		// width first so we know how much width is available for the other
		// columns, since the control column might not be the first one shown
		for (i = 0, ien = display.length; i < ien; i++) {
			if (columns[i].control) {
				usedWidth -= columns[i].minWidth;
			}
		}

		// Allow columns to be shown (counting by priority and then right to
		// left) until we run out of room
		var empty = false;
		for (i = 0, ien = order.length; i < ien; i++) {
			var colIdx = order[i].columnIdx;

			if (
				display[colIdx] === '-' &&
				!columns[colIdx].control &&
				columns[colIdx].minWidth
			) {
				// Once we've found a column that won't fit we don't let any
				// others display either, or columns might disappear in the
				// middle of the table
				if (empty || usedWidth - columns[colIdx].minWidth < 0) {
					empty = true;
					display[colIdx] = false;
				}
				else {
					display[colIdx] = true;
				}

				usedWidth -= columns[colIdx].minWidth;
			}
		}

		// Determine if the 'control' column should be shown (if there is one).
		// This is the case when there is a hidden column (that is not the
		// control column). The two loops look inefficient here, but they are
		// trivial and will fly through. We need to know the outcome from the
		// first , before the action in the second can be taken
		var showControl = false;

		for (i = 0, ien = columns.length; i < ien; i++) {
			if (
				!columns[i].control &&
				!columns[i].never &&
				display[i] === false
			) {
				showControl = true;
				break;
			}
		}

		for (i = 0, ien = columns.length; i < ien; i++) {
			if (columns[i].control) {
				display[i] = showControl;
			}

			// Replace not visible string with false from the control column detection above
			if (display[i] === 'not-visible') {
				display[i] = false;
			}
		}

		// Finally we need to make sure that there is at least one column that
		// is visible
		if ($.inArray(true, display) === -1) {
			display[0] = true;
		}

		return display;
	},

	/**
	 * Create the internal `columns` array with information about the columns
	 * for the table. This includes determining which breakpoints the column
	 * will appear in, based upon class names in the column, which makes up the
	 * vast majority of this method.
	 *
	 * @private
	 */
	_classLogic: function () {
		var that = this;
		var breakpoints = this.c.breakpoints;
		var dt = this.s.dt;
		var columns = dt
			.columns()
			.eq(0)
			.map(function (i) {
				var column = this.column(i);
				var className = column.header().className;
				var priority = column.init().responsivePriority;
				var dataPriority = column
					.header()
					.getAttribute('data-priority');

				if (priority === undefined) {
					priority =
						dataPriority === undefined || dataPriority === null
							? 10000
							: dataPriority * 1;
				}

				return {
					className: className,
					includeIn: [],
					auto: false,
					control: false,
					never: className.match(/\b(dtr\-)?never\b/) ? true : false,
					priority: priority
				};
			});

		// Simply add a breakpoint to `includeIn` array, ensuring that there are
		// no duplicates
		var add = function (colIdx, name) {
			var includeIn = columns[colIdx].includeIn;

			if ($.inArray(name, includeIn) === -1) {
				includeIn.push(name);
			}
		};

		var column = function (colIdx, name, operator, matched) {
			var size, i, ien;

			if (!operator) {
				columns[colIdx].includeIn.push(name);
			}
			else if (operator === 'max-') {
				// Add this breakpoint and all smaller
				size = that._find(name).width;

				for (i = 0, ien = breakpoints.length; i < ien; i++) {
					if (breakpoints[i].width <= size) {
						add(colIdx, breakpoints[i].name);
					}
				}
			}
			else if (operator === 'min-') {
				// Add this breakpoint and all larger
				size = that._find(name).width;

				for (i = 0, ien = breakpoints.length; i < ien; i++) {
					if (breakpoints[i].width >= size) {
						add(colIdx, breakpoints[i].name);
					}
				}
			}
			else if (operator === 'not-') {
				// Add all but this breakpoint
				for (i = 0, ien = breakpoints.length; i < ien; i++) {
					if (breakpoints[i].name.indexOf(matched) === -1) {
						add(colIdx, breakpoints[i].name);
					}
				}
			}
		};

		// Loop over each column and determine if it has a responsive control
		// class
		columns.each(function (col, i) {
			var classNames = col.className.split(' ');
			var hasClass = false;

			// Split the class name up so multiple rules can be applied if needed
			for (var k = 0, ken = classNames.length; k < ken; k++) {
				var className = classNames[k].trim();

				if (className === 'all' || className === 'dtr-all') {
					// Include in all
					hasClass = true;
					col.includeIn = $.map(breakpoints, function (a) {
						return a.name;
					});
					return;
				}
				else if (
					className === 'none' ||
					className === 'dtr-none' ||
					col.never
				) {
					// Include in none (default) and no auto
					hasClass = true;
					return;
				}
				else if (
					className === 'control' ||
					className === 'dtr-control'
				) {
					// Special column that is only visible, when one of the other
					// columns is hidden. This is used for the details control
					hasClass = true;
					col.control = true;
					return;
				}

				$.each(breakpoints, function (j, breakpoint) {
					// Does this column have a class that matches this breakpoint?
					var brokenPoint = breakpoint.name.split('-');
					var re = new RegExp(
						'(min\\-|max\\-|not\\-)?(' +
							brokenPoint[0] +
							')(\\-[_a-zA-Z0-9])?'
					);
					var match = className.match(re);

					if (match) {
						hasClass = true;

						if (
							match[2] === brokenPoint[0] &&
							match[3] === '-' + brokenPoint[1]
						) {
							// Class name matches breakpoint name fully
							column(
								i,
								breakpoint.name,
								match[1],
								match[2] + match[3]
							);
						}
						else if (match[2] === brokenPoint[0] && !match[3]) {
							// Class name matched primary breakpoint name with no qualifier
							column(i, breakpoint.name, match[1], match[2]);
						}
					}
				});
			}

			// If there was no control class, then automatic sizing is used
			if (!hasClass) {
				col.auto = true;
			}
		});

		this.s.columns = columns;
	},

	/**
	 * Update the cells to show the correct control class / button
	 * @private
	 */
	_controlClass: function () {
		if (this.c.details.type === 'inline') {
			var dt = this.s.dt;
			var columnsVis = this.s.current;
			var firstVisible = $.inArray(true, columnsVis);

			// Remove from any cells which shouldn't have it
			dt.cells(
				null,
				function (idx) {
					return idx !== firstVisible;
				},
				{ page: 'current' }
			)
				.nodes()
				.to$()
				.filter('.dtr-control')
				.removeClass('dtr-control');

			dt.cells(null, firstVisible, { page: 'current' })
				.nodes()
				.to$()
				.addClass('dtr-control');
		}
	},

	/**
	 * Show the details for the child row
	 *
	 * @param  {DataTables.Api} row    API instance for the row
	 * @param  {boolean}        update Update flag
	 * @private
	 */
	_detailsDisplay: function (row, update) {
		var that = this;
		var dt = this.s.dt;
		var details = this.c.details;
		var event = function (res) {
			$(row.node()).toggleClass('dtr-expanded', res !== false);
			$(dt.table().node()).triggerHandler('responsive-display.dt', [
				dt,
				row,
				res,
				update
			]);
		};

		if (details && details.type !== false) {
			var renderer =
				typeof details.renderer === 'string'
					? Responsive.renderer[details.renderer]()
					: details.renderer;

			var res = details.display(
				row,
				update,
				function () {
					return renderer.call(
						that,
						dt,
						row[0][0],
						that._detailsObj(row[0])
					);
				},
				function () {
					event(false);
				}
			);

			if (typeof res === 'boolean') {
				event(res);
			}
		}
	},

	/**
	 * Initialisation for the details handler
	 *
	 * @private
	 */
	_detailsInit: function () {
		var that = this;
		var dt = this.s.dt;
		var details = this.c.details;

		// The inline type always uses the first child as the target
		if (details.type === 'inline') {
			details.target = 'td.dtr-control, th.dtr-control';
		}

		// Keyboard accessibility
		dt.on('draw.dtr', function () {
			that._tabIndexes();
		});
		that._tabIndexes(); // Initial draw has already happened

		$(dt.table().body()).on('keyup.dtr', 'td, th', function (e) {
			if (e.keyCode === 13 && $(this).data('dtr-keyboard')) {
				$(this).click();
			}
		});

		// type.target can be a string jQuery selector or a column index
		var target = details.target;
		var selector = typeof target === 'string' ? target : 'td, th';

		if (target !== undefined || target !== null) {
			// Click handler to show / hide the details rows when they are available
			$(dt.table().body()).on(
				'click.dtr mousedown.dtr mouseup.dtr',
				selector,
				function (e) {
					// If the table is not collapsed (i.e. there is no hidden columns)
					// then take no action
					if (!$(dt.table().node()).hasClass('collapsed')) {
						return;
					}

					// Check that the row is actually a DataTable's controlled node
					if (
						$.inArray(
							$(this).closest('tr').get(0),
							dt.rows().nodes().toArray()
						) === -1
					) {
						return;
					}

					// For column index, we determine if we should act or not in the
					// handler - otherwise it is already okay
					if (typeof target === 'number') {
						var targetIdx =
							target < 0
								? dt.columns().eq(0).length + target
								: target;

						if (dt.cell(this).index().column !== targetIdx) {
							return;
						}
					}

					// $().closest() includes itself in its check
					var row = dt.row($(this).closest('tr'));

					// Check event type to do an action
					if (e.type === 'click') {
						// The renderer is given as a function so the caller can execute it
						// only when they need (i.e. if hiding there is no point is running
						// the renderer)
						that._detailsDisplay(row, false);
					}
					else if (e.type === 'mousedown') {
						// For mouse users, prevent the focus ring from showing
						$(this).css('outline', 'none');
					}
					else if (e.type === 'mouseup') {
						// And then re-allow at the end of the click
						$(this).trigger('blur').css('outline', '');
					}
				}
			);
		}
	},

	/**
	 * Get the details to pass to a renderer for a row
	 * @param  {int} rowIdx Row index
	 * @private
	 */
	_detailsObj: function (rowIdx) {
		var that = this;
		var dt = this.s.dt;

		return $.map(this.s.columns, function (col, i) {
			// Never and control columns should not be passed to the renderer
			if (col.never || col.control) {
				return;
			}

			var dtCol = dt.settings()[0].aoColumns[i];

			return {
				className: dtCol.sClass,
				columnIndex: i,
				data: dt.cell(rowIdx, i).render(that.c.orthogonal),
				hidden: dt.column(i).visible() && !that.s.current[i],
				rowIndex: rowIdx,
				title: dt.column(i).title()
			};
		});
	},

	/**
	 * Find a breakpoint object from a name
	 *
	 * @param  {string} name Breakpoint name to find
	 * @return {object}      Breakpoint description object
	 * @private
	 */
	_find: function (name) {
		var breakpoints = this.c.breakpoints;

		for (var i = 0, ien = breakpoints.length; i < ien; i++) {
			if (breakpoints[i].name === name) {
				return breakpoints[i];
			}
		}
	},

	/**
	 * Re-create the contents of the child rows as the display has changed in
	 * some way.
	 *
	 * @private
	 */
	_redrawChildren: function () {
		var that = this;
		var dt = this.s.dt;

		dt.rows({ page: 'current' }).iterator('row', function (settings, idx) {
			that._detailsDisplay(dt.row(idx), true);
		});
	},

	/**
	 * Alter the table display for a resized viewport. This involves first
	 * determining what breakpoint the window currently is in, getting the
	 * column visibilities to apply and then setting them.
	 *
	 * @param  {boolean} forceRedraw Force a redraw
	 * @private
	 */
	_resize: function (forceRedraw) {
		var that = this;
		var dt = this.s.dt;
		var width = $(window).innerWidth();
		var breakpoints = this.c.breakpoints;
		var breakpoint = breakpoints[0].name;
		var columns = this.s.columns;
		var i, ien;
		var oldVis = this.s.current.slice();

		// Determine what breakpoint we are currently at
		for (i = breakpoints.length - 1; i >= 0; i--) {
			if (width <= breakpoints[i].width) {
				breakpoint = breakpoints[i].name;
				break;
			}
		}

		// Show the columns for that break point
		var columnsVis = this._columnsVisiblity(breakpoint);
		this.s.current = columnsVis;

		// Set the class before the column visibility is changed so event
		// listeners know what the state is. Need to determine if there are
		// any columns that are not visible but can be shown
		var collapsedClass = false;

		for (i = 0, ien = columns.length; i < ien; i++) {
			if (
				columnsVis[i] === false &&
				!columns[i].never &&
				!columns[i].control &&
				!dt.column(i).visible() === false
			) {
				collapsedClass = true;
				break;
			}
		}

		$(dt.table().node()).toggleClass('collapsed', collapsedClass);

		var changed = false;
		var visible = 0;
		var dtSettings = dt.settings()[0];
		var colGroup = $(dt.table().node()).children('colgroup');
		var colEls = dtSettings.aoColumns.map(function (col) {
			return col.colEl;
		});

		dt.columns()
			.eq(0)
			.each(function (colIdx, i) {
				// Do nothing on DataTables' hidden column - DT removes it from the table
				// so we need to slide back
				if (! dt.column(colIdx).visible()) {
					return;
				}

				if (columnsVis[i] === true) {
					visible++;
				}

				if (forceRedraw || columnsVis[i] !== oldVis[i]) {
					changed = true;
					that._setColumnVis(colIdx, columnsVis[i]);
				}

				// DataTables 2 uses `col` to define the width for a column
				// and this needs to run each time, as DataTables will change
				// the column width. We may need to reattach if we've removed
				// an element previously.
				if (! columnsVis[i]) {
					colEls[i].detach();
				}
				else {
					that._colGroupAttach(colGroup, colEls, i);
				}
			});

		if (changed) {
			dt.columns.adjust();

			this._redrawChildren();

			// Inform listeners of the change
			$(dt.table().node()).trigger('responsive-resize.dt', [
				dt,
				this._responsiveOnlyHidden()
			]);

			// If no records, update the "No records" display element
			if (dt.page.info().recordsDisplay === 0) {
				$('td', dt.table().body()).eq(0).attr('colspan', visible);
			}
		}

		that._controlClass();
	},

	/**
	 * Determine the width of each column in the table so the auto column hiding
	 * has that information to work with. This method is never going to be 100%
	 * perfect since column widths can change slightly per page, but without
	 * seriously compromising performance this is quite effective.
	 *
	 * @private
	 */
	_resizeAuto: function () {
		var dt = this.s.dt;
		var columns = this.s.columns;
		var that = this;
		var visibleColumns = dt
			.columns()
			.indexes()
			.filter(function (idx) {
				return dt.column(idx).visible();
			});

		// Are we allowed to do auto sizing?
		if (!this.c.auto) {
			return;
		}

		// Are there any columns that actually need auto-sizing, or do they all
		// have classes defined
		if (
			$.inArray(
				true,
				$.map(columns, function (c) {
					return c.auto;
				})
			) === -1
		) {
			return;
		}

		// Clone the table with the current data in it
		var clonedTable = dt.table().node().cloneNode(false);
		var clonedHeader = $(dt.table().header().cloneNode(false)).appendTo(
			clonedTable
		);
		var clonedFooter = $(dt.table().footer().cloneNode(false)).appendTo(
			clonedTable
		);
		var clonedBody = $(dt.table().body())
			.clone(false, false)
			.empty()
			.appendTo(clonedTable); // use jQuery because of IE8

		clonedTable.style.width = 'auto';

		// Header
		dt.table()
			.header.structure(visibleColumns)
			.forEach((row) => {
				var cells = row
					.filter(function (el) {
						return el ? true : false;
					})
					.map(function (el) {
						return $(el.cell)
							.clone(false)
							.css('display', 'table-cell')
							.css('width', 'auto')
							.css('min-width', 0);
					});

				$('<tr/>').append(cells).appendTo(clonedHeader);
			});

		// Always need an empty row that we can read widths from
		var emptyRow = $('<tr/>').appendTo(clonedBody);

		for (var i = 0; i < visibleColumns.count(); i++) {
			emptyRow.append('<td/>');
		}

		// Body rows
		if (this.c.details.renderer._responsiveMovesNodes) {
			// Slow but it allows for moving elements around the document
			dt.rows({ page: 'current' }).every(function (rowIdx) {
				var node = this.node();

				if (! node) {
					return;
				}

				// We clone the table's rows and cells to create the sizing table
				var tr = node.cloneNode(false);

				dt.cells(rowIdx, visibleColumns).every(function (rowIdx2, colIdx) {
					// If nodes have been moved out (listHiddenNodes), we need to
					// clone from the store
					var store = that.s.childNodeStore[rowIdx + '-' + colIdx];

					if (store) {
						$(this.node().cloneNode(false))
							.append($(store).clone())
							.appendTo(tr);
					}
					else {
						$(this.node()).clone(false).appendTo(tr);
					}
				});

				clonedBody.append(tr);
			});
		}
		else {
			// This is much faster, but it doesn't account for moving nodes around
			$(clonedBody)
				.append( $(dt.rows( { page: 'current' } ).nodes()).clone( false ) )
				.find( 'th, td' ).css( 'display', '' );
		}

		// Any cells which were hidden by Responsive in the host table, need to
		// be visible here for the calculations
		clonedBody.find('th, td').css('display', '');

		// Footer
		dt.table()
			.footer.structure(visibleColumns)
			.forEach((row) => {
				var cells = row
					.filter(function (el) {
						return el ? true : false;
					})
					.map(function (el) {
						return $(el.cell)
							.clone(false)
							.css('display', 'table-cell')
							.css('width', 'auto')
							.css('min-width', 0);
					});

				$('<tr/>').append(cells).appendTo(clonedFooter);
			});

		// In the inline case extra padding is applied to the first column to
		// give space for the show / hide icon. We need to use this in the
		// calculation
		if (this.c.details.type === 'inline') {
			$(clonedTable).addClass('dtr-inline collapsed');
		}

		// It is unsafe to insert elements with the same name into the DOM
		// multiple times. For example, cloning and inserting a checked radio
		// clears the chcecked state of the original radio.
		$(clonedTable).find('[name]').removeAttr('name');

		// A position absolute table would take the table out of the flow of
		// our container element, bypassing the height and width (Scroller)
		$(clonedTable).css('position', 'relative');

		var inserted = $('<div/>')
			.css({
				width: 1,
				height: 1,
				overflow: 'hidden',
				clear: 'both'
			})
			.append(clonedTable);

		inserted.insertBefore(dt.table().node());

		// The cloned table now contains the smallest that each column can be
		emptyRow.children().each(function (i) {
			var idx = dt.column.index('fromVisible', i);
			columns[idx].minWidth = this.offsetWidth || 0;
		});

		inserted.remove();
	},

	/**
	 * Get the state of the current hidden columns - controlled by Responsive only
	 */
	_responsiveOnlyHidden: function () {
		var dt = this.s.dt;

		return $.map(this.s.current, function (v, i) {
			// If the column is hidden by DataTables then it can't be hidden by
			// Responsive!
			if (dt.column(i).visible() === false) {
				return true;
			}
			return v;
		});
	},

	/**
	 * Set a column's visibility.
	 *
	 * We don't use DataTables' column visibility controls in order to ensure
	 * that column visibility can Responsive can no-exist. Since only IE8+ is
	 * supported (and all evergreen browsers of course) the control of the
	 * display attribute works well.
	 *
	 * @param {integer} col      Column index
	 * @param {boolean} showHide Show or hide (true or false)
	 * @private
	 */
	_setColumnVis: function (col, showHide) {
		var that = this;
		var dt = this.s.dt;
		var display = showHide ? '' : 'none'; // empty string will remove the attr

		this._setHeaderVis(col, showHide, dt.table().header.structure());
		this._setHeaderVis(col, showHide, dt.table().footer.structure());

		dt.column(col)
			.nodes()
			.to$()
			.css('display', display)
			.toggleClass('dtr-hidden', !showHide);

		// If the are child nodes stored, we might need to reinsert them
		if (!$.isEmptyObject(this.s.childNodeStore)) {
			dt.cells(null, col)
				.indexes()
				.each(function (idx) {
					that._childNodesRestore(dt, idx.row, idx.column);
				});
		}
	},

	/**
	 * Set the a column's visibility, taking into account multiple rows
	 * in a header / footer and colspan attributes
	 * @param {*} col
	 * @param {*} showHide
	 * @param {*} structure
	 */
	_setHeaderVis: function (col, showHide, structure) {
		var that = this;
		var display = showHide ? '' : 'none';

		structure.forEach(function (row) {
			if (row[col]) {
				$(row[col].cell)
					.css('display', display)
					.toggleClass('dtr-hidden', !showHide);
			}
			else {
				// In a colspan - need to rewind calc the new span since
				// display:none elements do not count as being spanned over
				var search = col;

				while (search >= 0) {
					if (row[search]) {
						row[search].cell.colSpan = that._colspan(row, search);
						break;
					}

					search--;
				}
			}
		});
	},

	/**
	 * How many columns should this cell span
	 *
	 * @param {*} row Header structure row
	 * @param {*} idx The column index of the cell to span
	 */
	_colspan: function (row, idx) {
		var colspan = 1;

		for (var col = idx + 1; col < row.length; col++) {
			if (row[col] === null && this.s.current[col]) {
				// colspan and not hidden by Responsive
				colspan++;
			}
			else if (row[col]) {
				// Got the next cell, jump out
				break;
			}
		}

		return colspan;
	},

	/**
	 * Update the cell tab indexes for keyboard accessibility. This is called on
	 * every table draw - that is potentially inefficient, but also the least
	 * complex option given that column visibility can change on the fly. Its a
	 * shame user-focus was removed from CSS 3 UI, as it would have solved this
	 * issue with a single CSS statement.
	 *
	 * @private
	 */
	_tabIndexes: function () {
		var dt = this.s.dt;
		var cells = dt.cells({ page: 'current' }).nodes().to$();
		var ctx = dt.settings()[0];
		var target = this.c.details.target;

		cells.filter('[data-dtr-keyboard]').removeData('[data-dtr-keyboard]');

		if (typeof target === 'number') {
			dt.cells(null, target, { page: 'current' })
				.nodes()
				.to$()
				.attr('tabIndex', ctx.iTabIndex)
				.data('dtr-keyboard', 1);
		}
		else {
			// This is a bit of a hack - we need to limit the selected nodes to just
			// those of this table
			if (target === 'td:first-child, th:first-child') {
				target = '>td:first-child, >th:first-child';
			}

			$(target, dt.rows({ page: 'current' }).nodes())
				.attr('tabIndex', ctx.iTabIndex)
				.data('dtr-keyboard', 1);
		}
	}
});

/**
 * List of default breakpoints. Each item in the array is an object with two
 * properties:
 *
 * * `name` - the breakpoint name.
 * * `width` - the breakpoint width
 *
 * @name Responsive.breakpoints
 * @static
 */
Responsive.breakpoints = [
	{ name: 'desktop', width: Infinity },
	{ name: 'tablet-l', width: 1024 },
	{ name: 'tablet-p', width: 768 },
	{ name: 'mobile-l', width: 480 },
	{ name: 'mobile-p', width: 320 }
];

/**
 * Display methods - functions which define how the hidden data should be shown
 * in the table.
 *
 * @namespace
 * @name Responsive.defaults
 * @static
 */
Responsive.display = {
	childRow: function (row, update, render) {
		var rowNode = $(row.node());

		if (update) {
			if (rowNode.hasClass('dtr-expanded')) {
				row.child(render(), 'child').show();

				return true;
			}
		}
		else {
			if (!rowNode.hasClass('dtr-expanded')) {
				var rendered = render();

				if (rendered === false) {
					return false;
				}

				row.child(rendered, 'child').show();
				return true;
			}
			else {
				row.child(false);

				return false;
			}
		}
	},

	childRowImmediate: function (row, update, render) {
		var rowNode = $(row.node());

		if (
			(!update && rowNode.hasClass('dtr-expanded')) ||
			!row.responsive.hasHidden()
		) {
			// User interaction and the row is show, or nothing to show
			row.child(false);

			return false;
		}
		else {
			// Display
			var rendered = render();

			if (rendered === false) {
				return false;
			}

			row.child(rendered, 'child').show();

			return true;
		}
	},

	// This is a wrapper so the modal options for Bootstrap and jQuery UI can
	// have options passed into them. This specific one doesn't need to be a
	// function but it is for consistency in the `modal` name
	modal: function (options) {
		return function (row, update, render, closeCallback) {
			var modal;
			var rendered = render();

			if (rendered === false) {
				return false;
			}

			if (!update) {
				// Show a modal
				var close = function () {
					modal.remove(); // will tidy events for us
					$(document).off('keypress.dtr');
					$(row.node()).removeClass('dtr-expanded');

					closeCallback();
				};

				modal = $('<div class="dtr-modal"/>')
					.append(
						$('<div class="dtr-modal-display"/>')
							.append(
								$('<div class="dtr-modal-content"/>')
									.data('dtr-row-idx', row.index())
									.append(rendered)
							)
							.append(
								$(
									'<div class="dtr-modal-close">&times;</div>'
								).click(function () {
									close();
								})
							)
					)
					.append(
						$('<div class="dtr-modal-background"/>').click(
							function () {
								close();
							}
						)
					)
					.appendTo('body');

				$(row.node()).addClass('dtr-expanded');

				$(document).on('keyup.dtr', function (e) {
					if (e.keyCode === 27) {
						e.stopPropagation();

						close();
					}
				});
			}
			else {
				modal = $('div.dtr-modal-content');

				if (modal.length && row.index() === modal.data('dtr-row-idx')) {
					modal.empty().append(rendered);
				}
				else {
					// Modal not shown, nothing to update
					return null;
				}
			}

			if (options && options.header) {
				$('div.dtr-modal-content').prepend(
					'<h2>' + options.header(row) + '</h2>'
				);
			}

			return true;
		};
	}
};

/**
 * Display methods - functions which define how the hidden data should be shown
 * in the table.
 *
 * @namespace
 * @name Responsive.defaults
 * @static
 */
Responsive.renderer = {
	listHiddenNodes: function () {
		var fn = function (api, rowIdx, columns) {
			var that = this;
			var ul = $(
				'<ul data-dtr-index="' + rowIdx + '" class="dtr-details"/>'
			);
			var found = false;

			$.each(columns, function (i, col) {
				if (col.hidden) {
					var klass = col.className
						? 'class="' + col.className + '"'
						: '';

					$(
						'<li ' +
							klass +
							' data-dtr-index="' +
							col.columnIndex +
							'" data-dt-row="' +
							col.rowIndex +
							'" data-dt-column="' +
							col.columnIndex +
							'">' +
							'<span class="dtr-title">' +
							col.title +
							'</span> ' +
							'</li>'
					)
						.append(
							$('<span class="dtr-data"/>').append(
								that._childNodes(
									api,
									col.rowIndex,
									col.columnIndex
								)
							)
						) // api.cell( col.rowIndex, col.columnIndex ).node().childNodes ) )
						.appendTo(ul);

					found = true;
				}
			});

			return found ? ul : false;
		};

		fn._responsiveMovesNodes = true;

		return fn;
	},

	listHidden: function () {
		return function (api, rowIdx, columns) {
			var data = $.map(columns, function (col) {
				var klass = col.className
					? 'class="' + col.className + '"'
					: '';

				return col.hidden
					? '<li ' +
							klass +
							' data-dtr-index="' +
							col.columnIndex +
							'" data-dt-row="' +
							col.rowIndex +
							'" data-dt-column="' +
							col.columnIndex +
							'">' +
							'<span class="dtr-title">' +
							col.title +
							'</span> ' +
							'<span class="dtr-data">' +
							col.data +
							'</span>' +
							'</li>'
					: '';
			}).join('');

			return data
				? $(
						'<ul data-dtr-index="' +
							rowIdx +
							'" class="dtr-details"/>'
				).append(data)
				: false;
		};
	},

	tableAll: function (options) {
		options = $.extend(
			{
				tableClass: ''
			},
			options
		);

		return function (api, rowIdx, columns) {
			var data = $.map(columns, function (col) {
				var klass = col.className
					? 'class="' + col.className + '"'
					: '';

				return (
					'<tr ' +
					klass +
					' data-dt-row="' +
					col.rowIndex +
					'" data-dt-column="' +
					col.columnIndex +
					'">' +
					'<td>' +
					col.title +
					':' +
					'</td> ' +
					'<td>' +
					col.data +
					'</td>' +
					'</tr>'
				);
			}).join('');

			return $(
				'<table class="' +
					options.tableClass +
					' dtr-details" width="100%"/>'
			).append(data);
		};
	}
};

/**
 * Responsive default settings for initialisation
 *
 * @namespace
 * @name Responsive.defaults
 * @static
 */
Responsive.defaults = {
	/**
	 * List of breakpoints for the instance. Note that this means that each
	 * instance can have its own breakpoints. Additionally, the breakpoints
	 * cannot be changed once an instance has been creased.
	 *
	 * @type {Array}
	 * @default Takes the value of `Responsive.breakpoints`
	 */
	breakpoints: Responsive.breakpoints,

	/**
	 * Enable / disable auto hiding calculations. It can help to increase
	 * performance slightly if you disable this option, but all columns would
	 * need to have breakpoint classes assigned to them
	 *
	 * @type {Boolean}
	 * @default  `true`
	 */
	auto: true,

	/**
	 * Details control. If given as a string value, the `type` property of the
	 * default object is set to that value, and the defaults used for the rest
	 * of the object - this is for ease of implementation.
	 *
	 * The object consists of the following properties:
	 *
	 * * `display` - A function that is used to show and hide the hidden details
	 * * `renderer` - function that is called for display of the child row data.
	 *   The default function will show the data from the hidden columns
	 * * `target` - Used as the selector for what objects to attach the child
	 *   open / close to
	 * * `type` - `false` to disable the details display, `inline` or `column`
	 *   for the two control types
	 *
	 * @type {Object|string}
	 */
	details: {
		display: Responsive.display.childRow,

		renderer: Responsive.renderer.listHidden(),

		target: 0,

		type: 'inline'
	},

	/**
	 * Orthogonal data request option. This is used to define the data type
	 * requested when Responsive gets the data to show in the child row.
	 *
	 * @type {String}
	 */
	orthogonal: 'display'
};

/*
 * API
 */
var Api = $.fn.dataTable.Api;

// Doesn't do anything - work around for a bug in DT... Not documented
Api.register('responsive()', function () {
	return this;
});

Api.register('responsive.index()', function (li) {
	li = $(li);

	return {
		column: li.data('dtr-index'),
		row: li.parent().data('dtr-index')
	};
});

Api.register('responsive.rebuild()', function () {
	return this.iterator('table', function (ctx) {
		if (ctx._responsive) {
			ctx._responsive._classLogic();
		}
	});
});

Api.register('responsive.recalc()', function () {
	return this.iterator('table', function (ctx) {
		if (ctx._responsive) {
			ctx._responsive._resizeAuto();
			ctx._responsive._resize();
		}
	});
});

Api.register('responsive.hasHidden()', function () {
	var ctx = this.context[0];

	return ctx._responsive
		? $.inArray(false, ctx._responsive._responsiveOnlyHidden()) !== -1
		: false;
});

Api.registerPlural(
	'columns().responsiveHidden()',
	'column().responsiveHidden()',
	function () {
		return this.iterator(
			'column',
			function (settings, column) {
				return settings._responsive
					? settings._responsive._responsiveOnlyHidden()[column]
					: false;
			},
			1
		);
	}
);

/**
 * Version information
 *
 * @name Responsive.version
 * @static
 */
Responsive.version = '3.0.3';

$.fn.dataTable.Responsive = Responsive;
$.fn.DataTable.Responsive = Responsive;

// Attach a listener to the document which listens for DataTables initialisation
// events so we can automatically initialise
$(document).on('preInit.dt.dtr', function (e, settings, json) {
	if (e.namespace !== 'dt') {
		return;
	}

	if (
		$(settings.nTable).hasClass('responsive') ||
		$(settings.nTable).hasClass('dt-responsive') ||
		settings.oInit.responsive ||
		datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].defaults.responsive
	) {
		var init = settings.oInit.responsive;

		if (init !== false) {
			new Responsive(settings, $.isPlainObject(init) ? init : {});
		}
	}
});


/* harmony default export */ __webpack_exports__["default"] = (datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "../../node_modules/datatables.net-rowgroup-bs4/js/rowGroup.bootstrap4.mjs":
/*!*********************************************************************************!*\
  !*** ../../node_modules/datatables.net-rowgroup-bs4/js/rowGroup.bootstrap4.mjs ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! datatables.net-bs4 */ "../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4.mjs");
/* harmony import */ var datatables_net_rowgroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! datatables.net-rowgroup */ "../../node_modules/datatables.net-rowgroup/js/dataTables.rowGroup.mjs");
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*! Bootstrap 4 styling wrapper for RowGroup
 * © SpryMedia Ltd - datatables.net/license
 */





// Allow reassignment of the $ variable
let $ = jquery__WEBPACK_IMPORTED_MODULE_0__;



/* harmony default export */ __webpack_exports__["default"] = (datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "../../node_modules/datatables.net-rowgroup/js/dataTables.rowGroup.mjs":
/*!*****************************************************************************!*\
  !*** ../../node_modules/datatables.net-rowgroup/js/dataTables.rowGroup.mjs ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var datatables_net__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! datatables.net */ "../../node_modules/datatables.net/js/dataTables.mjs");
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*! RowGroup 1.5.1
 * © SpryMedia Ltd - datatables.net/license
 */




// Allow reassignment of the $ variable
let $ = jquery__WEBPACK_IMPORTED_MODULE_0__;


/**
 * @summary     RowGroup
 * @description RowGrouping for DataTables
 * @version     1.5.1
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     datatables.net
 * @copyright   SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

var RowGroup = function (dt, opts) {
	// Sanity check that we are using DataTables 1.10 or newer
	if (!datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].versionCheck || !datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].versionCheck('1.11')) {
		throw 'RowGroup requires DataTables 1.11 or newer';
	}

	// User and defaults configuration object
	this.c = $.extend(true, {}, datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].defaults.rowGroup, RowGroup.defaults, opts);

	// Internal settings
	this.s = {
		dt: new datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api(dt)
	};

	// DOM items
	this.dom = {};

	// Check if row grouping has already been initialised on this table
	var settings = this.s.dt.settings()[0];
	var existing = settings.rowGroup;
	if (existing) {
		return existing;
	}

	settings.rowGroup = this;
	this._constructor();
};

$.extend(RowGroup.prototype, {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * API methods for DataTables API interface
	 */

	/**
	 * Get/set the grouping data source - need to call draw after this is
	 * executed as a setter
	 * @returns string~RowGroup
	 */
	dataSrc: function (val) {
		if (val === undefined) {
			return this.c.dataSrc;
		}

		var dt = this.s.dt;

		this.c.dataSrc = val;

		$(dt.table().node()).triggerHandler('rowgroup-datasrc.dt', [dt, val]);

		return this;
	},

	/**
	 * Disable - need to call draw after this is executed
	 * @returns RowGroup
	 */
	disable: function () {
		this.c.enable = false;
		return this;
	},

	/**
	 * Enable - need to call draw after this is executed
	 * @returns RowGroup
	 */
	enable: function (flag) {
		if (flag === false) {
			return this.disable();
		}

		this.c.enable = true;
		return this;
	},

	/**
	 * Get enabled flag
	 * @returns boolean
	 */
	enabled: function () {
		return this.c.enable;
	},

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constructor
	 */
	_constructor: function () {
		var that = this;
		var dt = this.s.dt;
		var hostSettings = dt.settings()[0];

		dt.on('draw.dtrg', function (e, s) {
			if (that.c.enable && hostSettings === s) {
				that._draw();
			}
		});

		dt.on('column-visibility.dt.dtrg responsive-resize.dt.dtrg', function () {
			that._adjustColspan();
		});

		dt.on('destroy', function () {
			dt.off('.dtrg');
		});
	},

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods
	 */

	/**
	 * Adjust column span when column visibility changes
	 * @private
	 */
	_adjustColspan: function () {
		$('tr.' + this.c.className, this.s.dt.table().body())
			.find('th:visible, td:visible')
			.attr('colspan', this._colspan());
	},

	/**
	 * Get the number of columns that a grouping row should span
	 * @private
	 */
	_colspan: function () {
		return this.s.dt
			.columns()
			.visible()
			.reduce(function (a, b) {
				return a + b;
			}, 0);
	},

	/**
	 * Update function that is called whenever we need to draw the grouping rows.
	 * This is basically a bootstrap for the self iterative _group and _groupDisplay
	 * methods
	 * @private
	 */
	_draw: function () {
		var dt = this.s.dt;
		var groupedRows = this._group(0, dt.rows({ page: 'current' }).indexes());

		this._groupDisplay(0, groupedRows);
	},

	/**
	 * Get the grouping information from a data set (index) of rows
	 * @param {number} level Nesting level
	 * @param {DataTables.Api} rows API of the rows to consider for this group
	 * @returns {object[]} Nested grouping information - it is structured like this:
	 *	{
	 *		dataPoint: 'Edinburgh',
	 *		rows: [ 1,2,3,4,5,6,7 ],
	 *		children: [ {
	 *			dataPoint: 'developer'
	 *			rows: [ 1, 2, 3 ]
	 *		},
	 *		{
	 *			dataPoint: 'support',
	 *			rows: [ 4, 5, 6, 7 ]
	 *		} ]
	 *	}
	 * @private
	 */
	_group: function (level, rows) {
		var fns = Array.isArray(this.c.dataSrc) ? this.c.dataSrc : [this.c.dataSrc];
		var fn = datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].util.get(fns[level]);
		var dt = this.s.dt;
		var group, last;
		var i, ien;
		var data = [];
		var that = this;

		for (i = 0, ien = rows.length; i < ien; i++) {
			var rowIndex = rows[i];
			var rowData = dt.row(rowIndex).data();

			group = fn(rowData, level);

			if (group === null || group === undefined) {
				group = that.c.emptyDataGroup;
			}

			if (last === undefined || group !== last) {
				data.push({
					dataPoint: group,
					rows: []
				});

				last = group;
			}

			data[data.length - 1].rows.push(rowIndex);
		}

		if (fns[level + 1] !== undefined) {
			for (i = 0, ien = data.length; i < ien; i++) {
				data[i].children = this._group(level + 1, data[i].rows);
			}
		}

		return data;
	},

	/**
	 * Row group display - insert the rows into the document
	 * @param {number} level Nesting level
	 * @param {object[]} groups Takes the nested array from `_group`
	 * @private
	 */
	_groupDisplay: function (level, groups) {
		var dt = this.s.dt;
		var display;

		for (var i = 0, ien = groups.length; i < ien; i++) {
			var group = groups[i];
			var groupName = group.dataPoint;
			var row;
			var rows = group.rows;

			if (this.c.startRender) {
				display = this.c.startRender.call(this, dt.rows(rows), groupName, level);
				row = this._rowWrap(display, this.c.startClassName, level);

				if (row) {
					row.insertBefore(dt.row(rows[0]).node());
				}
			}

			if (this.c.endRender) {
				display = this.c.endRender.call(this, dt.rows(rows), groupName, level);
				row = this._rowWrap(display, this.c.endClassName, level);

				if (row) {
					row.insertAfter(dt.row(rows[rows.length - 1]).node());
				}
			}

			if (group.children) {
				this._groupDisplay(level + 1, group.children);
			}
		}
	},

	/**
	 * Take a rendered value from an end user and make it suitable for display
	 * as a row, by wrapping it in a row, or detecting that it is a row.
	 * @param {node|jQuery|string} display Display value
	 * @param {string} className Class to add to the row
	 * @param {array} group
	 * @param {number} group level
	 * @private
	 */
	_rowWrap: function (display, className, level) {
		var row;

		if (display === null || display === '') {
			display = this.c.emptyDataGroup;
		}

		if (display === undefined || display === null) {
			return null;
		}

		if (
			typeof display === 'object' &&
			display.nodeName &&
			display.nodeName.toLowerCase() === 'tr'
		) {
			row = $(display);
		}
		else if (
			display instanceof $ &&
			display.length &&
			display[0].nodeName.toLowerCase() === 'tr'
		) {
			row = display;
		}
		else {
			row = $('<tr/>').append(
				$('<th/>').attr('colspan', this._colspan()).attr('scope', 'row').append(display)
			);
		}

		return row
			.addClass(this.c.className)
			.addClass(className)
			.addClass('dtrg-level-' + level);
	}
});

/**
 * RowGroup default settings for initialisation
 *
 * @namespace
 * @name RowGroup.defaults
 * @static
 */
RowGroup.defaults = {
	/**
	 * Class to apply to grouping rows - applied to both the start and
	 * end grouping rows.
	 * @type string
	 */
	className: 'dtrg-group',

	/**
	 * Data property from which to read the grouping information
	 * @type string|integer|array
	 */
	dataSrc: 0,

	/**
	 * Text to show if no data is found for a group
	 * @type string
	 */
	emptyDataGroup: 'No group',

	/**
	 * Initial enablement state
	 * @boolean
	 */
	enable: true,

	/**
	 * Class name to give to the end grouping row
	 * @type string
	 */
	endClassName: 'dtrg-end',

	/**
	 * End grouping label function
	 * @function
	 */
	endRender: null,

	/**
	 * Class name to give to the start grouping row
	 * @type string
	 */
	startClassName: 'dtrg-start',

	/**
	 * Start grouping label function
	 * @function
	 */
	startRender: function (rows, group) {
		return group;
	}
};

RowGroup.version = '1.5.1';

$.fn.dataTable.RowGroup = RowGroup;
$.fn.DataTable.RowGroup = RowGroup;

datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('rowGroup()', function () {
	return this;
});

datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('rowGroup().disable()', function () {
	return this.iterator('table', function (ctx) {
		if (ctx.rowGroup) {
			ctx.rowGroup.enable(false);
		}
	});
});

datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('rowGroup().enable()', function (opts) {
	return this.iterator('table', function (ctx) {
		if (ctx.rowGroup) {
			ctx.rowGroup.enable(opts === undefined ? true : opts);
		}
	});
});

datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('rowGroup().enabled()', function () {
	var ctx = this.context;

	return ctx.length && ctx[0].rowGroup ? ctx[0].rowGroup.enabled() : false;
});

datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].Api.register('rowGroup().dataSrc()', function (val) {
	if (val === undefined) {
		return this.context[0].rowGroup.dataSrc();
	}

	return this.iterator('table', function (ctx) {
		if (ctx.rowGroup) {
			ctx.rowGroup.dataSrc(val);
		}
	});
});

// Attach a listener to the document which listens for DataTables initialisation
// events so we can automatically initialise
$(document).on('preInit.dt.dtrg', function (e, settings, json) {
	if (e.namespace !== 'dt') {
		return;
	}

	var init = settings.oInit.rowGroup;
	var defaults = datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].defaults.rowGroup;

	if (init || defaults) {
		var opts = $.extend({}, defaults, init);

		if (init !== false) {
			new RowGroup(settings, opts);
		}
	}
});


/* harmony default export */ __webpack_exports__["default"] = (datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "../../node_modules/datatables.net-searchpanes-bs4/js/searchPanes.bootstrap4.mjs":
/*!***************************************************************************************!*\
  !*** ../../node_modules/datatables.net-searchpanes-bs4/js/searchPanes.bootstrap4.mjs ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! datatables.net-bs4 */ "../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4.mjs");
/* harmony import */ var datatables_net_searchpanes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! datatables.net-searchpanes */ "../../node_modules/datatables.net-searchpanes/js/dataTables.searchPanes.mjs");
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*! Bootstrap integration for DataTables' SearchPanes
 * © SpryMedia Ltd - datatables.net/license
 */





// Allow reassignment of the $ variable
let $ = jquery__WEBPACK_IMPORTED_MODULE_0__;

$.extend(true, datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__["default"].SearchPane.classes, {
    buttonGroup: 'btn-group',
    disabledButton: 'disabled',
    narrow: 'col',
    pane: {
        container: 'table'
    },
    paneButton: 'btn btn-light',
    pill: 'pill badge badge-pill badge-secondary',
    search: 'form-control search',
    searchCont: 'input-group',
    searchLabelCont: 'input-group-append',
    subRow1: 'dtsp-subRow1',
    subRow2: 'dtsp-subRow2',
    table: 'table table-sm table-borderless',
    topRow: 'dtsp-topRow'
});
$.extend(true, datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__["default"].SearchPanes.classes, {
    clearAll: 'dtsp-clearAll btn btn-light',
    collapseAll: 'dtsp-collapseAll btn btn-light',
    container: 'dtsp-searchPanes',
    disabledButton: 'disabled',
    panes: 'dtsp-panes dtsp-panesContainer',
    search: datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__["default"].SearchPane.classes.search,
    showAll: 'dtsp-showAll btn btn-light',
    title: 'dtsp-title',
    titleRow: 'dtsp-titleRow'
});


/* harmony default export */ __webpack_exports__["default"] = (datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "../../node_modules/datatables.net-searchpanes/js/dataTables.searchPanes.mjs":
/*!***********************************************************************************!*\
  !*** ../../node_modules/datatables.net-searchpanes/js/dataTables.searchPanes.mjs ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var datatables_net__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! datatables.net */ "../../node_modules/datatables.net/js/dataTables.mjs");
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*! SearchPanes 2.3.3
 * © SpryMedia Ltd - datatables.net/license
 */




// Allow reassignment of the $ variable
let $ = jquery__WEBPACK_IMPORTED_MODULE_0__;

(function () {
    'use strict';

    var $$5;
    var dataTable$2;
    function setJQuery$4(jq) {
        $$5 = jq;
        dataTable$2 = jq.fn.dataTable;
    }
    var SearchPane = /** @class */ (function () {
        /**
         * Creates the panes, sets up the search function
         *
         * @param paneSettings The settings for the searchPanes
         * @param opts The options for the default features
         * @param index the index of the column for this pane
         * @param panesContainer The overall container for SearchPanes that this pane will be attached to
         * @param panes The custom pane settings if this is a custom pane
         * @returns {object} the pane that has been created, including the table and the index of the pane
         */
        function SearchPane(paneSettings, opts, index, panesContainer, panes) {
            var _this = this;
            if (panes === void 0) { panes = null; }
            // Check that the required version of DataTables is included
            if (!dataTable$2 || !dataTable$2.versionCheck || !dataTable$2.versionCheck('1.10.0')) {
                throw new Error('SearchPane requires DataTables 1.10 or newer');
            }
            // Check that Select is included
            // eslint-disable-next-line no-extra-parens
            if (!dataTable$2.select) {
                throw new Error('SearchPane requires Select');
            }
            var table = new dataTable$2.Api(paneSettings);
            this.classes = $$5.extend(true, {}, SearchPane.classes);
            // Get options from user
            this.c = $$5.extend(true, {}, SearchPane.defaults, opts, panes);
            if (opts && opts.hideCount && opts.viewCount === undefined) {
                this.c.viewCount = !this.c.hideCount;
            }
            var rowLength = table.columns().eq(0).toArray().length;
            this.s = {
                colExists: index < rowLength,
                colOpts: undefined,
                customPaneSettings: panes,
                displayed: false,
                dt: table,
                dtPane: undefined,
                firstSet: true,
                index: index,
                indexes: [],
                listSet: false,
                name: undefined,
                rowData: {
                    arrayFilter: [],
                    arrayOriginal: [],
                    bins: {},
                    binsOriginal: {},
                    filterMap: new Map(),
                    totalOptions: 0
                },
                scrollTop: 0,
                searchFunction: undefined,
                selections: [],
                serverSelect: [],
                serverSelecting: false,
                tableLength: null,
                updating: false
            };
            this.s.colOpts = this.s.colExists ? this._getOptions() : this._getBonusOptions();
            this.dom = {
                buttonGroup: $$5('<div/>').addClass(this.classes.buttonGroup),
                clear: $$5('<button type="button">&#215;</button>')
                    .attr('disabled', 'true')
                    .addClass(this.classes.disabledButton)
                    .addClass(this.classes.paneButton)
                    .addClass(this.classes.clearButton)
                    .html(this.s.dt.i18n('searchPanes.clearPane', this.c.i18n.clearPane)),
                collapseButton: $$5('<button type="button"><span class="' + this.classes.caret + '">&#x5e;</span></button>')
                    .addClass(this.classes.paneButton)
                    .addClass(this.classes.collapseButton),
                container: $$5('<div/>')
                    .addClass(this.classes.container)
                    .addClass(this.s.colOpts.className)
                    .addClass(this.classes.layout +
                    (parseInt(this.c.layout.split('-')[1], 10) < 10 ?
                        this.c.layout :
                        this.c.layout.split('-')[0] + '-9'))
                    .addClass(this.s.customPaneSettings && this.s.customPaneSettings.className
                    ? this.s.customPaneSettings.className
                    : ''),
                countButton: $$5('<button type="button"><span></span></button>')
                    .addClass(this.classes.paneButton)
                    .addClass(this.classes.countButton),
                dtP: $$5('<table width="100%"><thead><tr><th></th><th></th></tr></thead></table>'),
                lower: $$5('<div/>').addClass(this.classes.subRow2).addClass(this.classes.narrowButton),
                nameButton: $$5('<button type="button"><span></span></button>')
                    .addClass(this.classes.paneButton)
                    .addClass(this.classes.nameButton),
                panesContainer: $$5(panesContainer),
                searchBox: $$5('<input/>').addClass(this.classes.paneInputButton).addClass(this.classes.search),
                searchButton: $$5('<button type="button"><span></span></button>')
                    .addClass(this.classes.searchIcon)
                    .addClass(this.classes.paneButton),
                searchCont: $$5('<div/>').addClass(this.classes.searchCont),
                searchLabelCont: $$5('<div/>').addClass(this.classes.searchLabelCont),
                topRow: $$5('<div/>').addClass(this.classes.topRow),
                upper: $$5('<div/>').addClass(this.classes.subRow1).addClass(this.classes.narrowSearch)
            };
            var title = '';
            if (this.s.colExists) {
                title = $$5(this.s.dt.column(this.s.index).header()).text();
                this.dom.dtP.find('th').eq(0).text(title);
            }
            else {
                title = this.s.customPaneSettings.header || 'Custom Pane';
                this.dom.dtP.find('th').eq(0).html(title);
            }
            // Set the value of name incase ordering is desired
            if (this.s.colOpts.name) {
                this.s.name = this.s.colOpts.name;
            }
            else if (this.s.customPaneSettings && this.s.customPaneSettings.name) {
                this.s.name = this.s.customPaneSettings.name;
            }
            else {
                this.s.name = title;
            }
            var tableNode = this.s.dt.table(0).node();
            // Custom search function for table
            this.s.searchFunction = function (settings, searchData, dataIndex) {
                // If no data has been selected then show all
                if (_this.s.selections.length === 0) {
                    return true;
                }
                if (settings.nTable !== tableNode) {
                    return true;
                }
                var filter = null;
                if (_this.s.colExists) {
                    // Get the current filtered data
                    filter = searchData[_this.s.index];
                    if (_this.s.colOpts.orthogonal.filter !== 'filter') {
                        // get the filter value from the map
                        filter = _this.s.rowData.filterMap.get(dataIndex);
                        if (filter instanceof $$5.fn.dataTable.Api) {
                            // eslint-disable-next-line no-extra-parens
                            filter = filter.toArray();
                        }
                    }
                }
                return _this._search(filter, dataIndex);
            };
            $$5.fn.dataTable.ext.search.push(this.s.searchFunction);
            // If the clear button for this pane is clicked clear the selections
            if (this.c.clear) {
                this.dom.clear.on('click.dtsp', function () {
                    var searches = _this.dom.container.find('.' + _this.classes.search.replace(/\s+/g, '.'));
                    searches.each(function () {
                        $$5(this).val('').trigger('input');
                    });
                    _this.clearPane();
                });
            }
            // Sometimes the top row of the panes containing the search box and ordering buttons appears
            //  weird if the width of the panes is lower than expected, this fixes the design.
            // Equally this may occur when the table is resized.
            this.s.dt.on('draw.dtsp', function () { return _this.adjustTopRow(); });
            this.s.dt.on('buttons-action.dtsp', function () { return _this.adjustTopRow(); });
            // When column-reorder is present and the columns are moved, it is necessary to
            //  reassign all of the panes indexes to the new index of the column.
            this.s.dt.on('column-reorder.dtsp', function (e, settings, details) {
                _this.s.index = details.mapping[_this.s.index];
            });
            return this;
        }
        /**
         * Adds a row to the panes table
         *
         * @param display the value to be displayed to the user
         * @param filter the value to be filtered on when searchpanes is implemented
         * @param shown the number of rows in the table that are currently visible matching this criteria
         * @param total the total number of rows in the table that match this criteria
         * @param sort the value to be sorted in the pane table
         * @param type the value of which the type is to be derived from
         */
        SearchPane.prototype.addRow = function (display, filter, sort, type, className, total, shown) {
            if (!total) {
                total = this.s.rowData.bins[filter] ?
                    this.s.rowData.bins[filter] :
                    0;
            }
            if (!shown) {
                shown = this._getShown(filter);
            }
            var index;
            for (var _i = 0, _a = this.s.indexes; _i < _a.length; _i++) {
                var entry = _a[_i];
                if (entry.filter === filter) {
                    index = entry.index;
                }
            }
            if (index === undefined) {
                index = this.s.indexes.length;
                this.s.indexes.push({ filter: filter, index: index });
            }
            return this.s.dtPane.row.add({
                className: className,
                display: display !== '' ?
                    display :
                    this.emptyMessage(),
                filter: filter,
                index: index,
                shown: shown,
                sort: sort,
                total: total,
                type: type
            });
        };
        /**
         * Adjusts the layout of the top row when the screen is resized
         */
        SearchPane.prototype.adjustTopRow = function () {
            var subContainers = this.dom.container.find('.' + this.classes.subRowsContainer.replace(/\s+/g, '.'));
            var subRow1 = this.dom.container.find('.' + this.classes.subRow1.replace(/\s+/g, '.'));
            var subRow2 = this.dom.container.find('.' + this.classes.subRow2.replace(/\s+/g, '.'));
            var topRow = this.dom.container.find('.' + this.classes.topRow.replace(/\s+/g, '.'));
            // If the width is 0 then it is safe to assume that the pane has not yet been displayed.
            //  Even if it has, if the width is 0 it won't make a difference if it has the narrow class or not
            if (($$5(subContainers[0]).width() < 252 || $$5(topRow[0]).width() < 252) && $$5(subContainers[0]).width() !== 0) {
                $$5(subContainers[0]).addClass(this.classes.narrow);
                $$5(subRow1[0]).addClass(this.classes.narrowSub).removeClass(this.classes.narrowSearch);
                $$5(subRow2[0]).addClass(this.classes.narrowSub).removeClass(this.classes.narrowButton);
            }
            else {
                $$5(subContainers[0]).removeClass(this.classes.narrow);
                $$5(subRow1[0]).removeClass(this.classes.narrowSub).addClass(this.classes.narrowSearch);
                $$5(subRow2[0]).removeClass(this.classes.narrowSub).addClass(this.classes.narrowButton);
            }
        };
        /**
         * In the case of a rebuild there is potential for new data to have been included or removed
         * so all of the rowData must be reset as a precaution.
         */
        SearchPane.prototype.clearData = function () {
            this.s.rowData = {
                arrayFilter: [],
                arrayOriginal: [],
                bins: {},
                binsOriginal: {},
                filterMap: new Map(),
                totalOptions: 0
            };
        };
        /**
         * Clear the selections in the pane
         */
        SearchPane.prototype.clearPane = function () {
            // Deselect all rows which are selected and update the table and filter count.
            this.s.dtPane.rows({ selected: true }).deselect();
            this.updateTable();
            return this;
        };
        /**
         * Collapses the pane so that only the header is displayed
         */
        SearchPane.prototype.collapse = function () {
            var _this = this;
            if (!this.s.displayed ||
                (
                // If collapsing is disabled globally, and not enabled specifically for this column
                !this.c.collapse && this.s.colOpts.collapse !== true ||
                    // OR, collapsing could be enabled globally and this column specifically
                    // is not to be collapsed.
                    // We can't just take !this.s.colOpts.collapse here as if it is undefined
                    // then the global should be used
                    this.s.colOpts.collapse === false)) {
                return;
            }
            $$5(this.s.dtPane.table().container()).addClass(this.classes.hidden);
            this.dom.topRow.addClass(this.classes.bordered);
            this.dom.nameButton.addClass(this.classes.disabledButton);
            this.dom.countButton.addClass(this.classes.disabledButton);
            this.dom.searchButton.addClass(this.classes.disabledButton);
            this.dom.collapseButton.addClass(this.classes.rotated);
            this.dom.topRow.one('click.dtsp', function () { return _this.show(); });
            this.dom.topRow.trigger('collapse.dtsps');
        };
        /**
         * Strips all of the SearchPanes elements from the document and turns all of the listeners for the buttons off
         */
        SearchPane.prototype.destroy = function () {
            if (this.s.dtPane) {
                this.s.dtPane.off('.dtsp');
            }
            this.s.dt.off('.dtsp');
            this.dom.clear.off('.dtsp');
            this.dom.nameButton.off('.dtsp');
            this.dom.countButton.off('.dtsp');
            this.dom.searchButton.off('.dtsp');
            this.dom.collapseButton.off('.dtsp');
            $$5(this.s.dt.table().node()).off('.dtsp');
            this.dom.container.detach();
            var searchIdx = $$5.fn.dataTable.ext.search.indexOf(this.s.searchFunction);
            while (searchIdx !== -1) {
                $$5.fn.dataTable.ext.search.splice(searchIdx, 1);
                searchIdx = $$5.fn.dataTable.ext.search.indexOf(this.s.searchFunction);
            }
            // If the datatables have been defined for the panes then also destroy these
            if (this.s.dtPane) {
                this.s.dtPane.destroy();
            }
            this.s.listSet = false;
        };
        /**
         * Getting the legacy message is a little complex due a legacy parameter
         */
        SearchPane.prototype.emptyMessage = function () {
            var def = this.c.i18n.emptyMessage;
            // Legacy parameter support
            if (this.c.emptyMessage) {
                def = this.c.emptyMessage;
            }
            // Override per column
            if (this.s.colOpts.emptyMessage !== false && this.s.colOpts.emptyMessage !== null) {
                def = this.s.colOpts.emptyMessage;
            }
            return this.s.dt.i18n('searchPanes.emptyMessage', def);
        };
        /**
         * Updates the number of filters that have been applied in the title
         */
        SearchPane.prototype.getPaneCount = function () {
            return this.s.dtPane ?
                this.s.dtPane.rows({ selected: true }).data().toArray().length :
                0;
        };
        /**
         * Rebuilds the panes from the start having deleted the old ones
         *
         * @param? dataIn data to be used in buildPane
         * @param? maintainSelection Whether the current selections are to be maintained over rebuild
         */
        SearchPane.prototype.rebuildPane = function (dataIn, maintainSelection) {
            if (dataIn === void 0) { dataIn = null; }
            if (maintainSelection === void 0) { maintainSelection = false; }
            this.clearData();
            var selectedRows = [];
            this.s.serverSelect = [];
            var prevEl = null;
            // When rebuilding strip all of the HTML Elements out of the container and start from scratch
            if (this.s.dtPane) {
                if (maintainSelection) {
                    if (!this.s.dt.page.info().serverSide) {
                        selectedRows = this.s.dtPane.rows({ selected: true }).data().toArray();
                    }
                    else {
                        this.s.serverSelect = this.s.dtPane.rows({ selected: true }).data().toArray();
                    }
                }
                this.s.dtPane.clear().destroy();
                prevEl = this.dom.container.prev();
                this.destroy();
                this.s.dtPane = undefined;
                $$5.fn.dataTable.ext.search.push(this.s.searchFunction);
            }
            this.dom.container.removeClass(this.classes.hidden);
            this.s.displayed = false;
            this._buildPane(!this.s.dt.page.info().serverSide ?
                selectedRows :
                this.s.serverSelect, dataIn, prevEl);
            return this;
        };
        /**
         * Resizes the pane based on the layout that is passed in
         *
         * @param layout the layout to be applied to this pane
         */
        SearchPane.prototype.resize = function (layout) {
            this.c.layout = layout;
            this.dom.container
                .removeClass()
                .addClass(this.classes.show)
                .addClass(this.classes.container)
                .addClass(this.s.colOpts.className)
                .addClass(this.classes.layout +
                (parseInt(layout.split('-')[1], 10) < 10 ?
                    layout :
                    layout.split('-')[0] + '-9'))
                .addClass(this.s.customPaneSettings !== null && this.s.customPaneSettings.className
                ? this.s.customPaneSettings.className
                : '');
            this.adjustTopRow();
        };
        /**
         * Sets the listeners for the pane.
         *
         * Having it in it's own function makes it easier to only set them once
         */
        SearchPane.prototype.setListeners = function () {
            var _this = this;
            if (!this.s.dtPane) {
                return;
            }
            // When an item is selected on the pane, add these to the array which holds selected items.
            // Custom search will perform.
            this.s.dtPane.off('select.dtsp').on('select.dtsp', function () {
                clearTimeout(_this.s.deselectTimeout);
                _this._updateSelection(!_this.s.updating);
                _this.dom.clear.removeClass(_this.classes.disabledButton).removeAttr('disabled');
            });
            // When an item is deselected on the pane, re add the currently selected items to the array
            // which holds selected items. Custom search will be performed.
            this.s.dtPane.off('deselect.dtsp').on('deselect.dtsp', function () {
                _this.s.deselectTimeout = setTimeout(function () {
                    _this._updateSelection(true);
                    if (_this.s.dtPane.rows({ selected: true }).data().toArray().length === 0) {
                        _this.dom.clear.addClass(_this.classes.disabledButton).attr('disabled', 'true');
                    }
                }, 50);
            });
            // If we attempty to turn off this event then it will ruin behaviour in other panes
            //  so need to make sure that it is only done once
            if (this.s.firstSet) {
                this.s.firstSet = false;
                // When saving the state store all of the selected rows for preselection next time around
                this.s.dt.on('stateSaveParams.dtsp', function (e, settings, data) {
                    // If the data being passed in is empty then state clear must have occured
                    // so clear the panes state as well
                    if ($$5.isEmptyObject(data)) {
                        _this.s.dtPane.state.clear();
                        return;
                    }
                    var bins;
                    var order;
                    var selected = [];
                    var collapsed;
                    var searchTerm;
                    var arrayFilter;
                    // Get all of the data needed for the state save from the pane
                    if (_this.s.dtPane) {
                        selected = _this.s.dtPane
                            .rows({ selected: true })
                            .data()
                            .map(function (item) { return item.filter !== null ? item.filter.toString() : null; })
                            .toArray();
                        searchTerm = _this.dom.searchBox.val();
                        order = _this.s.dtPane.order();
                        bins = _this.s.rowData.binsOriginal;
                        arrayFilter = _this.s.rowData.arrayOriginal;
                        collapsed = _this.dom.collapseButton.hasClass(_this.classes.rotated);
                    }
                    if (data.searchPanes === undefined) {
                        data.searchPanes = {};
                    }
                    if (data.searchPanes.panes === undefined) {
                        data.searchPanes.panes = [];
                    }
                    for (var i = 0; i < data.searchPanes.panes.length; i++) {
                        if (data.searchPanes.panes[i].id === _this.s.index) {
                            data.searchPanes.panes.splice(i, 1);
                            i--;
                        }
                    }
                    // Add the panes data to the state object
                    data.searchPanes.panes.push({
                        arrayFilter: arrayFilter,
                        bins: bins,
                        collapsed: collapsed,
                        id: _this.s.index,
                        order: order,
                        searchTerm: searchTerm,
                        selected: selected
                    });
                });
            }
            this.s.dtPane.off('user-select.dtsp').on('user-select.dtsp', function (e, _dt, type, cell, originalEvent) {
                originalEvent.stopPropagation();
            });
            this.s.dtPane.off('draw.dtsp').on('draw.dtsp', function () { return _this.adjustTopRow(); });
            // When the button to order by the name of the options is clicked then
            //  change the ordering to whatever it isn't currently
            this.dom.nameButton.off('click.dtsp').on('click.dtsp', function () {
                var currentOrder = _this.s.dtPane.order()[0][1];
                _this.s.dtPane.order([[0, currentOrder === 'asc' ? 'desc' : 'asc']]).draw();
                // This state save is required so that the ordering of the panes is maintained
                _this.s.dt.state.save();
            });
            // When the button to order by the number of entries in the column is clicked then
            //  change the ordering to whatever it isn't currently
            this.dom.countButton.off('click.dtsp').on('click.dtsp', function () {
                var currentOrder = _this.s.dtPane.order()[0][1];
                _this.s.dtPane.order([[1, currentOrder === 'asc' ? 'desc' : 'asc']]).draw();
                // This state save is required so that the ordering of the panes is maintained
                _this.s.dt.state.save();
            });
            // When the button to order by the number of entries in the column is clicked then
            //  change the ordering to whatever it isn't currently
            this.dom.collapseButton.off('click.dtsp').on('click.dtsp', function (e) {
                e.stopPropagation();
                var container = $$5(_this.s.dtPane.table().container());
                // Toggle the classes
                container.toggleClass(_this.classes.hidden);
                _this.dom.topRow.toggleClass(_this.classes.bordered);
                _this.dom.nameButton.toggleClass(_this.classes.disabledButton);
                _this.dom.countButton.toggleClass(_this.classes.disabledButton);
                _this.dom.searchButton.toggleClass(_this.classes.disabledButton);
                _this.dom.collapseButton.toggleClass(_this.classes.rotated);
                if (container.hasClass(_this.classes.hidden)) {
                    _this.dom.topRow.on('click.dtsp', function () { return _this.dom.collapseButton.click(); });
                }
                else {
                    _this.dom.topRow.off('click.dtsp');
                }
                _this.s.dt.state.save();
                _this.dom.topRow.trigger('collapse.dtsps');
            });
            // When the clear button is clicked reset the pane
            this.dom.clear.off('click.dtsp').on('click.dtsp', function () {
                var searches = _this.dom.container.find('.' + _this.classes.search.replace(/ /g, '.'));
                searches.each(function () {
                    // set the value of the search box to be an empty string and then search on that, effectively reseting
                    $$5(this).val('').trigger('input');
                });
                _this.clearPane();
            });
            // When the search button is clicked then draw focus to the search box
            this.dom.searchButton.off('click.dtsp').on('click.dtsp', function () { return _this.dom.searchBox.focus(); });
            // When a character is inputted into the searchbox search the pane for matching values.
            // Doing it this way means that no button has to be clicked to trigger a search, it is done asynchronously
            this.dom.searchBox.off('click.dtsp').on('input.dtsp', function () {
                var searchval = _this.dom.searchBox.val();
                _this.s.dtPane.search(searchval).draw();
                if (typeof searchval === 'string' &&
                    (searchval.length > 0 ||
                        searchval.length === 0 && _this.s.dtPane.rows({ selected: true }).data().toArray().length > 0)) {
                    _this.dom.clear.removeClass(_this.classes.disabledButton).removeAttr('disabled');
                }
                else {
                    _this.dom.clear.addClass(_this.classes.disabledButton).attr('disabled', 'true');
                }
                // This state save is required so that the searching on the panes is maintained
                _this.s.dt.state.save();
            });
            this.s.dtPane.select.style(this.s.colOpts.dtOpts && this.s.colOpts.dtOpts.select && this.s.colOpts.dtOpts.select.style
                ? this.s.colOpts.dtOpts.select.style
                : this.c.dtOpts && this.c.dtOpts.select && this.c.dtOpts.select.style
                    ? this.c.dtOpts.select.style
                    : 'os');
        };
        /**
         * Populates the SearchPane based off of the data that has been recieved from the server
         *
         * This method is overriden by SearchPaneST
         *
         * @param dataIn The data that has been sent from the server
         */
        SearchPane.prototype._serverPopulate = function (dataIn) {
            if (dataIn.tableLength) {
                this.s.tableLength = dataIn.tableLength;
                this.s.rowData.totalOptions = this.s.tableLength;
            }
            else if (this.s.tableLength === null || this.s.dt.rows()[0].length > this.s.tableLength) {
                this.s.tableLength = this.s.dt.rows()[0].length;
                this.s.rowData.totalOptions = this.s.tableLength;
            }
            var colTitle = this.s.dt.column(this.s.index).dataSrc();
            // If there is SP data for this column add it to the data array and bin
            if (dataIn.searchPanes.options[colTitle]) {
                for (var _i = 0, _a = dataIn.searchPanes.options[colTitle]; _i < _a.length; _i++) {
                    var dataPoint = _a[_i];
                    this.s.rowData.arrayFilter.push({
                        display: dataPoint.label,
                        filter: dataPoint.value,
                        sort: dataPoint.label,
                        type: dataPoint.label
                    });
                    this.s.rowData.bins[dataPoint.value] = dataPoint.total;
                }
            }
            var binLength = Object.keys(this.s.rowData.bins).length;
            var uniqueRatio = this._uniqueRatio(binLength, this.s.tableLength);
            // Don't show the pane if there isnt enough variance in the data, or there is only 1 entry for that pane
            if (this.s.displayed === false &&
                ((this.s.colOpts.show === undefined && this.s.colOpts.threshold === null ?
                    uniqueRatio > this.c.threshold :
                    uniqueRatio > this.s.colOpts.threshold) ||
                    this.s.colOpts.show !== true && binLength <= 1)) {
                this.dom.container.addClass(this.classes.hidden);
                this.s.displayed = false;
                return;
            }
            // Store the original data
            this.s.rowData.arrayOriginal = this.s.rowData.arrayFilter;
            this.s.rowData.binsOriginal = this.s.rowData.bins;
            // Flag this pane as being displayed
            this.s.displayed = true;
        };
        /**
         * Expands the pane from the collapsed state
         */
        SearchPane.prototype.show = function () {
            if (!this.s.displayed) {
                return;
            }
            this.dom.topRow.removeClass(this.classes.bordered);
            this.dom.nameButton.removeClass(this.classes.disabledButton);
            this.dom.countButton.removeClass(this.classes.disabledButton);
            this.dom.searchButton.removeClass(this.classes.disabledButton);
            this.dom.collapseButton.removeClass(this.classes.rotated);
            $$5(this.s.dtPane.table().container()).removeClass(this.classes.hidden);
            this.dom.topRow.trigger('collapse.dtsps');
        };
        /**
         * Finds the ratio of the number of different options in the table to the number of rows
         *
         * @param bins the number of different options in the table
         * @param rowCount the total number of rows in the table
         * @returns {number} returns the ratio
         */
        SearchPane.prototype._uniqueRatio = function (bins, rowCount) {
            if (rowCount > 0 &&
                (this.s.rowData.totalOptions > 0 && !this.s.dt.page.info().serverSide ||
                    this.s.dt.page.info().serverSide && this.s.tableLength > 0)) {
                return bins / this.s.rowData.totalOptions;
            }
            return 1;
        };
        /**
         * Updates the panes if one of the options to do so has been set to true
         * rather than the filtered message when using viewTotal.
         */
        SearchPane.prototype.updateTable = function () {
            var selectedRows = this.s.dtPane.rows({ selected: true }).data().toArray().map(function (el) { return el.filter; });
            this.s.selections = selectedRows;
            this._searchExtras();
        };
        /**
         * Adds the custom options to the pane
         *
         * @returns {Array} Returns the array of rows which have been added to the pane
         */
        SearchPane.prototype._getComparisonRows = function () {
            // Find the appropriate options depending on whether this is a pane for a specific column or a custom pane
            var options = this.s.colOpts.options
                ? this.s.colOpts.options
                : this.s.customPaneSettings && this.s.customPaneSettings.options
                    ? this.s.customPaneSettings.options
                    : undefined;
            if (options === undefined) {
                return;
            }
            var allRows = this.s.dt.rows();
            var tableValsTotal = allRows.data().toArray();
            var rows = [];
            // Clear all of the other rows from the pane, only custom options are to be displayed when they are defined
            this.s.dtPane.clear();
            this.s.indexes = [];
            for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                var comp = options_1[_i];
                // Initialise the object which is to be placed in the row
                var insert = comp.label !== '' ?
                    comp.label :
                    this.emptyMessage();
                var comparisonObj = {
                    className: comp.className,
                    display: insert,
                    filter: typeof comp.value === 'function' ? comp.value : [],
                    sort: comp.order !== undefined
                        ? comp.order
                        : insert,
                    total: 0,
                    type: insert
                };
                // If a custom function is in place
                if (typeof comp.value === 'function') {
                    // Count the number of times the function evaluates to true for the original data in the Table
                    for (var i = 0; i < tableValsTotal.length; i++) {
                        if (comp.value.call(this.s.dt, tableValsTotal[i], allRows[0][i])) {
                            comparisonObj.total++;
                        }
                    }
                    // Update the comparisonObj
                    if (typeof comparisonObj.filter !== 'function') {
                        comparisonObj.filter.push(comp.filter);
                    }
                }
                rows.push(this.addRow(comparisonObj.display, comparisonObj.filter, comparisonObj.sort, comparisonObj.type, comparisonObj.className, comparisonObj.total));
            }
            return rows;
        };
        SearchPane.prototype._getMessage = function (row) {
            return this.s.dt.i18n('searchPanes.count', this.c.i18n.count).replace(/{total}/g, row.total);
        };
        /**
         * Overridden in SearchPaneViewTotal and SearchPaneCascade to get the number of times a specific value is shown
         *
         * Here it is blanked so that it takes no action
         *
         * @param filter The filter value
         * @returns undefined
         */
        SearchPane.prototype._getShown = function (filter) {
            return undefined;
        };
        /**
         * Get's the pane config appropriate to this class
         *
         * @returns The config needed to create a pane of this type
         */
        SearchPane.prototype._getPaneConfig = function () {
            var _this = this;
            // eslint-disable-next-line no-extra-parens
            var haveScroller = dataTable$2.Scroller;
            var langOpts = this.s.dt.settings()[0].oLanguage;
            langOpts.url = null;
            langOpts.sUrl = null;
            return {
                columnDefs: [
                    {
                        className: 'dtsp-nameColumn',
                        data: 'display',
                        render: function (data, type, row) {
                            if (type === 'sort') {
                                return row.sort;
                            }
                            else if (type === 'type') {
                                return row.type;
                            }
                            var message = _this._getMessage(row);
                            // We are displaying the count in the same columne as the name of the search option.
                            // This is so that there is not need to call columns.adjust()
                            //  which in turn speeds up the code
                            var pill = '<span class="' + _this.classes.pill + '">' + message + '</span>';
                            if (!_this.c.viewCount || !_this.s.colOpts.viewCount) {
                                pill = '';
                            }
                            if (type === 'filter') {
                                return typeof data === 'string' && data.match(/<[^>]*>/) !== null ?
                                    data.replace(/<[^>]*>/g, '') :
                                    data;
                            }
                            return '<div class="' + _this.classes.nameCont + '"><span title="' +
                                (typeof data === 'string' && data.match(/<[^>]*>/) !== null ?
                                    data.replace(/<[^>]*>/g, '') :
                                    data) +
                                '" class="' + _this.classes.name + '">' +
                                data + '</span>' +
                                pill + '</div>';
                        },
                        targets: 0,
                        // Accessing the private datatables property to set type based on the original table.
                        // This is null if not defined by the user, meaning that automatic type detection
                        //  would take place
                        type: this.s.dt.settings()[0].aoColumns[this.s.index] ?
                            this.s.dt.settings()[0].aoColumns[this.s.index]._sManualType :
                            null
                    },
                    {
                        className: 'dtsp-countColumn ' + this.classes.badgePill,
                        data: 'total',
                        searchable: false,
                        targets: 1,
                        visible: false
                    }
                ],
                deferRender: true,
                info: false,
                language: langOpts,
                paging: haveScroller ? true : false,
                scrollX: false,
                scrollY: '200px',
                scroller: haveScroller ? true : false,
                select: true,
                stateSave: this.s.dt.settings()[0].oFeatures.bStateSave ? true : false
            };
        };
        /**
         * This method allows for changes to the panes and table to be made when a selection or a deselection occurs
         */
        SearchPane.prototype._makeSelection = function () {
            this.updateTable();
            this.s.updating = true;
            this.s.dt.draw();
            this.s.updating = false;
        };
        /**
         * Populates an array with all of the data for the table
         *
         * @param rowIdx The current row index to be compared
         * @param arrayFilter The array that is to be populated with row Details
         * @param settings The DataTable settings object
         * @param bins The bins object that is to be populated with the row counts
         */
        SearchPane.prototype._populatePaneArray = function (rowIdx, arrayFilter, settings, bins) {
            if (bins === void 0) { bins = this.s.rowData.bins; }
            // Retrieve the rendered data from the cell using the fastData function
            // rather than the cell().render API method for optimisation
            var fastData = settings.fastData
                ? settings.fastData
                : function (row, col, orth) {
                    // Legacy DT1
                    return settings.oApi._fnGetCellData(settings, row, col, orth);
                };
            if (typeof this.s.colOpts.orthogonal === 'string') {
                var rendered = fastData(rowIdx, this.s.index, this.s.colOpts.orthogonal);
                this.s.rowData.filterMap.set(rowIdx, rendered);
                this._addOption(rendered, rendered, rendered, rendered, arrayFilter, bins);
                this.s.rowData.totalOptions++;
            }
            else {
                var filter = fastData(rowIdx, this.s.index, this.s.colOpts.orthogonal.search);
                // Null and empty string are to be considered the same value
                if (filter === null) {
                    filter = '';
                }
                if (typeof filter === 'string') {
                    filter = filter.replace(/<[^>]*>/g, '');
                }
                this.s.rowData.filterMap.set(rowIdx, filter);
                if (!bins[filter]) {
                    this._addOption(filter, fastData(rowIdx, this.s.index, this.s.colOpts.orthogonal.display), fastData(rowIdx, this.s.index, this.s.colOpts.orthogonal.sort), fastData(rowIdx, this.s.index, this.s.colOpts.orthogonal.type), arrayFilter, bins);
                    this.s.rowData.totalOptions++;
                }
                else {
                    bins[filter]++;
                    this.s.rowData.totalOptions++;
                }
            }
        };
        /**
         * Reloads all of the previous selects into the panes
         *
         * @param loadedFilter The loaded filters from a previous state
         */
        SearchPane.prototype._reloadSelect = function (loadedFilter) {
            // If the state was not saved don't selected any
            if (loadedFilter === undefined) {
                return;
            }
            var idx;
            // For each pane, check that the loadedFilter list exists and is not null,
            // find the id of each search item and set it to be selected.
            for (var i = 0; i < loadedFilter.searchPanes.panes.length; i++) {
                if (loadedFilter.searchPanes.panes[i].id === this.s.index) {
                    idx = i;
                    break;
                }
            }
            if (idx) {
                var table = this.s.dtPane;
                var rows = table.rows({ order: 'index' }).data().map(function (item) { return item.filter !== null ?
                    item.filter.toString() :
                    null; }).toArray();
                for (var _i = 0, _a = loadedFilter.searchPanes.panes[idx].selected; _i < _a.length; _i++) {
                    var filter = _a[_i];
                    var id = -1;
                    if (filter !== null) {
                        id = rows.indexOf(filter.toString());
                    }
                    if (id > -1) {
                        this.s.serverSelecting = true;
                        table.row(id).select();
                        this.s.serverSelecting = false;
                    }
                }
            }
        };
        /**
         * Notes the rows that have been selected within this pane and stores them internally
         *
         * @param notUpdating Whether the panes are updating themselves or not
         */
        SearchPane.prototype._updateSelection = function (notUpdating) {
            var _this = this;
            var processing = function (state) {
                if (datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].versionCheck('2')) {
                    _this.s.dt.processing(state);
                }
                else {
                    // Legacy v1
                    var settings = _this.s.dt.settings()[0];
                    var oApi = settings.oApi;
                    oApi._fnProcessingDisplay(settings, false);
                }
            };
            var run = function () {
                _this.s.scrollTop = $$5(_this.s.dtPane.table().node()).parent()[0].scrollTop;
                if (_this.s.dt.page.info().serverSide && !_this.s.updating) {
                    if (!_this.s.serverSelecting) {
                        _this.s.serverSelect = _this.s.dtPane.rows({ selected: true }).data().toArray();
                        _this.s.dt.draw(false);
                    }
                }
                else if (notUpdating) {
                    _this._makeSelection();
                }
                processing(false);
            };
            processing(true);
            setTimeout(run, 1);
        };
        /**
         * Takes in potentially undetected rows and adds them to the array if they are not yet featured
         *
         * @param filter the filter value of the potential row
         * @param display the display value of the potential row
         * @param sort the sort value of the potential row
         * @param type the type value of the potential row
         * @param arrayFilter the array to be populated
         * @param bins the bins to be populated
         */
        SearchPane.prototype._addOption = function (filter, display, sort, type, arrayFilter, bins) {
            // If the filter is an array then take a note of this, and add the elements to the arrayFilter array
            if (Array.isArray(filter) || filter instanceof dataTable$2.Api) {
                // Convert to an array so that we can work with it
                if (filter instanceof dataTable$2.Api) {
                    filter = filter.toArray();
                    display = display.toArray();
                }
                if (filter.length === display.length) {
                    for (var i = 0; i < filter.length; i++) {
                        // If we haven't seen this row before add it
                        if (!bins[filter[i]]) {
                            bins[filter[i]] = 1;
                            arrayFilter.push({
                                display: display[i],
                                filter: filter[i],
                                sort: sort[i],
                                type: type[i]
                            });
                        }
                        // Otherwise just increment the count
                        else {
                            bins[filter[i]]++;
                        }
                        this.s.rowData.totalOptions++;
                    }
                    return;
                }
                throw new Error('display and filter not the same length');
            }
            // If the values were affected by othogonal data and are not an array then check if it is already present
            else if (typeof this.s.colOpts.orthogonal === 'string') {
                if (!bins[filter]) {
                    bins[filter] = 1;
                    arrayFilter.push({
                        display: display,
                        filter: filter,
                        sort: sort,
                        type: type
                    });
                    this.s.rowData.totalOptions++;
                }
                else {
                    bins[filter]++;
                    this.s.rowData.totalOptions++;
                }
            }
            // Otherwise we must just be adding an option
            else {
                bins[filter] = 1;
                arrayFilter.push({
                    display: display,
                    filter: filter,
                    sort: sort,
                    type: type
                });
            }
        };
        /**
         * Method to construct the actual pane.
         *
         * @param selectedRows previously selected Rows to be reselected
         * @param dataIn Data that should be used to populate this pane
         * @param prevEl Reference to the previous element, used to ensure insert is in the correct location
         * @returns boolean to indicate whether this pane was the last one to have a selection made
         */
        SearchPane.prototype._buildPane = function (selectedRows, dataIn, prevEl) {
            var _this = this;
            if (selectedRows === void 0) { selectedRows = []; }
            if (dataIn === void 0) { dataIn = null; }
            if (prevEl === void 0) { prevEl = null; }
            // Aliases
            this.s.selections = [];
            // Other Variables
            var loadedFilter = this.s.dt.state.loaded();
            var row;
            // If the listeners have not been set yet then using the latest state may result in funny errors
            if (this.s.listSet) {
                loadedFilter = this.s.dt.state();
            }
            // If it is not a custom pane in place
            if (this.s.colExists) {
                var idx = -1;
                if (loadedFilter && loadedFilter.searchPanes && loadedFilter.searchPanes.panes) {
                    for (var i = 0; i < loadedFilter.searchPanes.panes.length; i++) {
                        if (loadedFilter.searchPanes.panes[i].id === this.s.index) {
                            idx = i;
                            break;
                        }
                    }
                }
                // Perform checks that do not require populate pane to run
                if ((this.s.colOpts.show === false ||
                    this.s.colOpts.show !== undefined && this.s.colOpts.show !== true) &&
                    idx === -1) {
                    this.dom.container.addClass(this.classes.hidden);
                    this.s.displayed = false;
                    return false;
                }
                else if (this.s.colOpts.show === true || idx !== -1) {
                    this.s.displayed = true;
                }
                if (!this.s.dt.page.info().serverSide &&
                    (!dataIn ||
                        !dataIn.searchPanes ||
                        !dataIn.searchPanes.options)) {
                    // Only run populatePane if the data has not been collected yet
                    if (this.s.rowData.arrayFilter.length === 0) {
                        this.s.rowData.totalOptions = 0;
                        this._populatePane();
                        this.s.rowData.arrayOriginal = this.s.rowData.arrayFilter;
                        this.s.rowData.binsOriginal = this.s.rowData.bins;
                    }
                    var binLength = Object.keys(this.s.rowData.binsOriginal).length;
                    var uniqueRatio = this._uniqueRatio(binLength, this.s.dt.rows()[0].length);
                    // Don't show the pane if there isn't enough variance in the data, or there is only 1 entry
                    //  for that pane
                    if (this.s.displayed === false &&
                        ((this.s.colOpts.show === undefined && this.s.colOpts.threshold === null ?
                            uniqueRatio > this.c.threshold :
                            uniqueRatio > this.s.colOpts.threshold) ||
                            this.s.colOpts.show !== true && binLength <= 1)) {
                        this.dom.container.addClass(this.classes.hidden);
                        this.s.displayed = false;
                        return;
                    }
                    this.dom.container.addClass(this.classes.show);
                    this.s.displayed = true;
                }
                else if (dataIn && dataIn.searchPanes && dataIn.searchPanes.options) {
                    this._serverPopulate(dataIn);
                }
            }
            else {
                this.s.displayed = true;
            }
            // If the variance is accceptable then display the search pane
            this._displayPane();
            if (!this.s.listSet) {
                // Here, when the state is loaded if the data object on the original table is empty,
                //  then a state.clear() must have occurred, so delete all of the panes tables state objects too.
                this.dom.dtP.on('stateLoadParams.dtsp', function (e, settings, data) {
                    if ($$5.isEmptyObject(_this.s.dt.state.loaded())) {
                        $$5.each(data, function (index) {
                            delete data[index];
                        });
                    }
                });
            }
            // Add the container to the document in its original location
            if (prevEl !== null && this.dom.panesContainer.has(prevEl).length > 0) {
                this.dom.container.insertAfter(prevEl);
            }
            else {
                this.dom.panesContainer.prepend(this.dom.container);
            }
            // Declare the datatable for the pane
            var errMode = $$5.fn.dataTable.ext.errMode;
            $$5.fn.dataTable.ext.errMode = 'none';
            // eslint-disable-next-line no-extra-parens
            // For async loading of a DataTable (e.g. language file)
            // we need to set the select style to make sure the event
            // handlers are added.
            this.dom.dtP.on('init.dt', function (e, s) {
                var dt = _this.dom.dtP.DataTable();
                var style = dt.select.style();
                dt.select.style(style);
            });
            var layout;
            if ($$5.fn.dataTable.versionCheck('2')) {
                // We need to modify the layout default to null all entries, keeping in
                // mind that the default might have been modified by the dev using DT,
                // so it needs to be dynamic.
                var cloned_1 = $$5.extend(true, {}, $$5.fn.dataTable.defaults.layout);
                $$5.each(cloned_1, function (key, val) {
                    cloned_1[key] = null;
                });
                layout = { layout: cloned_1 };
            }
            else {
                layout = { dom: 't' };
            }
            this.s.dtPane = this.dom.dtP.DataTable($$5.extend(true, this._getPaneConfig(), this.c.dtOpts, this.s.colOpts ? this.s.colOpts.dtOpts : {}, this.s.colOpts.options || !this.s.colExists ?
                {
                    createdRow: function (row, data) {
                        $$5(row).addClass(data.className);
                    }
                } :
                undefined, this.s.customPaneSettings !== null && this.s.customPaneSettings.dtOpts ?
                this.s.customPaneSettings.dtOpts :
                {}, layout));
            this.dom.dtP.addClass(this.classes.table);
            // Getting column titles is a little messy
            var headerText = 'Custom Pane';
            if (this.s.customPaneSettings && this.s.customPaneSettings.header) {
                headerText = this.s.customPaneSettings.header;
            }
            else if (this.s.colOpts.header) {
                headerText = this.s.colOpts.header;
            }
            else if (this.s.colExists) {
                headerText = $$5.fn.dataTable.versionCheck('2')
                    ? this.s.dt.column(this.s.index).title()
                    : this.s.dt.settings()[0].aoColumns[this.s.index].sTitle;
            }
            headerText = this._escapeHTML(headerText);
            this.dom.searchBox.attr('placeholder', headerText);
            $$5.fn.dataTable.ext.errMode = errMode;
            // If it is not a custom pane
            if (this.s.colExists) {
                // Add all of the search options to the pane
                for (var j = 0, jen = this.s.rowData.arrayFilter.length; j < jen; j++) {
                    if (this.s.dt.page.info().serverSide) {
                        row = this.addRow(this.s.rowData.arrayFilter[j].display, this.s.rowData.arrayFilter[j].filter, this.s.rowData.arrayFilter[j].sort, this.s.rowData.arrayFilter[j].type);
                        for (var _i = 0, _a = this.s.serverSelect; _i < _a.length; _i++) {
                            var option = _a[_i];
                            if (option.filter === this.s.rowData.arrayFilter[j].filter) {
                                this.s.serverSelecting = true;
                                row.select();
                                this.s.serverSelecting = false;
                            }
                        }
                    }
                    else if (!this.s.dt.page.info().serverSide && this.s.rowData.arrayFilter[j]) {
                        this.addRow(this.s.rowData.arrayFilter[j].display, this.s.rowData.arrayFilter[j].filter, this.s.rowData.arrayFilter[j].sort, this.s.rowData.arrayFilter[j].type);
                    }
                    else if (!this.s.dt.page.info().serverSide) {
                        // Just pass an empty string as the message will be calculated based on that in addRow()
                        this.addRow('', '', '', '');
                    }
                }
            }
            // If there are custom options set or it is a custom pane then get them
            if (this.s.colOpts.options ||
                this.s.customPaneSettings && this.s.customPaneSettings.options) {
                this._getComparisonRows();
            }
            // Display the pane
            this.s.dtPane.draw();
            this.s.dtPane.table().node().parentNode.scrollTop = this.s.scrollTop;
            this.adjustTopRow();
            this.setListeners();
            this.s.listSet = true;
            for (var _b = 0, selectedRows_1 = selectedRows; _b < selectedRows_1.length; _b++) {
                var selection = selectedRows_1[_b];
                if (selection) {
                    for (var _c = 0, _d = this.s.dtPane.rows().indexes().toArray(); _c < _d.length; _c++) {
                        row = _d[_c];
                        if (this.s.dtPane.row(row).data() &&
                            selection.filter === this.s.dtPane.row(row).data().filter) {
                            // If this is happening when serverSide processing is happening then
                            //  different behaviour is needed
                            if (this.s.dt.page.info().serverSide) {
                                this.s.serverSelecting = true;
                                this.s.dtPane.row(row).select();
                                this.s.serverSelecting = false;
                            }
                            else {
                                this.s.dtPane.row(row).select();
                            }
                        }
                    }
                }
            }
            //  If SSP and the table is ready, apply the search for the pane
            if (this.s.dt.page.info().serverSide) {
                this.s.dtPane.search(this.dom.searchBox.val()).draw();
            }
            if ((this.c.initCollapsed && this.s.colOpts.initCollapsed !== false ||
                this.s.colOpts.initCollapsed) &&
                (this.c.collapse && this.s.colOpts.collapse !== false ||
                    this.s.colOpts.collapse)) {
                // If the pane has not initialised yet then we need to wait for it to do so before collapsing
                // Otherwise the container that the class is added to does not exist
                if (this.s.dtPane.settings()[0]._bInitComplete) {
                    this.collapse();
                }
                else {
                    this.s.dtPane.one('init', function () { return _this.collapse(); });
                }
            }
            // Reload the selection, searchbox entry and ordering from the previous state
            // Need to check here if SSP that this is the first draw, otherwise it will infinite loop
            if (loadedFilter &&
                loadedFilter.searchPanes &&
                loadedFilter.searchPanes.panes &&
                (!dataIn ||
                    dataIn.draw === 1)) {
                this._reloadSelect(loadedFilter);
                for (var _e = 0, _f = loadedFilter.searchPanes.panes; _e < _f.length; _e++) {
                    var pane = _f[_e];
                    if (pane.id === this.s.index) {
                        // Save some time by only triggering an input if there is a value
                        if (pane.searchTerm && pane.searchTerm.length > 0) {
                            this.dom.searchBox.val(pane.searchTerm).trigger('input');
                        }
                        if (pane.order) {
                            this.s.dtPane.order(pane.order).draw();
                        }
                        // Is the pane to be hidden or shown?
                        if (pane.collapsed) {
                            this.collapse();
                        }
                        else {
                            this.show();
                        }
                    }
                }
            }
            return true;
        };
        /**
         * Appends all of the HTML elements to their relevant parent Elements
         */
        SearchPane.prototype._displayPane = function () {
            // Empty everything to start again
            this.dom.dtP.empty();
            this.dom.topRow.empty().addClass(this.classes.topRow);
            // If there are more than 3 columns defined then make there be a smaller gap between the panes
            if (parseInt(this.c.layout.split('-')[1], 10) > 3) {
                this.dom.container.addClass(this.classes.smallGap);
            }
            this.dom.topRow
                .addClass(this.classes.subRowsContainer)
                .append(this.dom.upper.append(this.dom.searchCont))
                .append(this.dom.lower.append(this.dom.buttonGroup));
            // If no selections have been made in the pane then disable the clear button
            if (this.c.dtOpts.searching === false ||
                this.s.colOpts.dtOpts && this.s.colOpts.dtOpts.searching === false ||
                (!this.c.controls || !this.s.colOpts.controls) ||
                this.s.customPaneSettings &&
                    this.s.customPaneSettings.dtOpts &&
                    this.s.customPaneSettings.dtOpts.searching !== undefined &&
                    !this.s.customPaneSettings.dtOpts.searching) {
                this.dom.searchBox
                    .removeClass(this.classes.paneInputButton)
                    .addClass(this.classes.disabledButton)
                    .attr('disabled', 'true');
            }
            this.dom.searchBox.appendTo(this.dom.searchCont);
            // Create the contents of the searchCont div. Worth noting that this function will change when using semantic ui
            this._searchContSetup();
            // If the clear button is allowed to show then display it
            if (this.c.clear && this.c.controls && this.s.colOpts.controls) {
                this.dom.clear.appendTo(this.dom.buttonGroup);
            }
            if (this.c.orderable && this.s.colOpts.orderable && this.c.controls && this.s.colOpts.controls) {
                this.dom.nameButton.appendTo(this.dom.buttonGroup);
            }
            // If the count column is hidden then don't display the ordering button for it
            if (this.c.viewCount &&
                this.s.colOpts.viewCount &&
                this.c.orderable &&
                this.s.colOpts.orderable &&
                this.c.controls &&
                this.s.colOpts.controls) {
                this.dom.countButton.appendTo(this.dom.buttonGroup);
            }
            if ((this.c.collapse && this.s.colOpts.collapse !== false ||
                this.s.colOpts.collapse) &&
                this.c.controls && this.s.colOpts.controls) {
                this.dom.collapseButton.appendTo(this.dom.buttonGroup);
            }
            this.dom.container.prepend(this.dom.topRow).append(this.dom.dtP).show();
        };
        /**
         * Escape html characters within a string
         *
         * @param txt the string to be escaped
         * @returns the escaped string
         */
        SearchPane.prototype._escapeHTML = function (txt) {
            return txt
                .toString()
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&');
        };
        /**
         * Gets the options for the row for the customPanes
         *
         * @returns {object} The options for the row extended to include the options from the user.
         */
        SearchPane.prototype._getBonusOptions = function () {
            // We need to reset the thresholds as if they have a value in colOpts then that value will be used
            var defaultMutator = {
                threshold: null
            };
            return $$5.extend(true, {}, SearchPane.defaults, defaultMutator, this.c ? this.c : {});
        };
        /**
         * Gets the options for the row for the customPanes
         *
         * @returns {object} The options for the row extended to include the options from the user.
         */
        SearchPane.prototype._getOptions = function () {
            var table = this.s.dt;
            // We need to reset the thresholds as if they have a value in colOpts then that value will be used
            var defaultMutator = {
                collapse: null,
                emptyMessage: false,
                initCollapsed: null,
                threshold: null
            };
            var columnOptions = table.settings()[0].aoColumns[this.s.index].searchPanes;
            var colOpts = $$5.extend(true, {}, SearchPane.defaults, defaultMutator, columnOptions);
            if (columnOptions && columnOptions.hideCount && columnOptions.viewCount === undefined) {
                colOpts.viewCount = !columnOptions.hideCount;
            }
            return colOpts;
        };
        /**
         * Fill the array with the values that are currently being displayed in the table
         */
        SearchPane.prototype._populatePane = function () {
            this.s.rowData.arrayFilter = [];
            this.s.rowData.bins = {};
            var settings = this.s.dt.context[0];
            if (!this.s.dt.page.info().serverSide) {
                for (var _i = 0, _a = this.s.dt.rows().indexes().toArray(); _i < _a.length; _i++) {
                    var index = _a[_i];
                    this._populatePaneArray(index, this.s.rowData.arrayFilter, settings);
                }
            }
        };
        /**
         * This method decides whether a row should contribute to the pane or not
         *
         * @param filter the value that the row is to be filtered on
         * @param dataIndex the row index
         */
        SearchPane.prototype._search = function (filter, dataIndex) {
            var colOpts = this.s.colOpts;
            var table = this.s.dt;
            // For each item selected in the pane, check if it is available in the cell
            for (var _i = 0, _a = this.s.selections; _i < _a.length; _i++) {
                var colSelect = _a[_i];
                if (typeof colSelect === 'string' && typeof filter === 'string') {
                    // The filter value will not have the &amp; in place but a &,
                    // so we need to do a replace to make sure that they will match
                    colSelect = this._escapeHTML(colSelect);
                }
                // if the filter is an array then is the column present in it
                if (Array.isArray(filter)) {
                    if (colOpts.combiner === 'and') {
                        if (!filter.includes(colSelect)) {
                            return false;
                        }
                    }
                    else if (filter.includes(colSelect)) {
                        return true;
                    }
                }
                // if the filter is a function then does it meet the criteria of that function or not
                else if (typeof colSelect === 'function') {
                    if (colSelect.call(table, table.row(dataIndex).data(), dataIndex)) {
                        if (colOpts.combiner === 'or') {
                            return true;
                        }
                    }
                    // If the combiner is an "and" then we need to check against all possible selections
                    // so if it fails here then the and is not met and return false
                    else if (colOpts.combiner === 'and') {
                        return false;
                    }
                }
                // otherwise if the two filter values are equal then return true
                else if (filter === colSelect ||
                    // Loose type checking incase number type in column comparing to a string
                    // eslint-disable-next-line eqeqeq
                    !(typeof filter === 'string' && filter.length === 0) && filter == colSelect ||
                    colSelect === null && typeof filter === 'string' && filter === '') {
                    return true;
                }
            }
            // If the combiner is an and then we need to check against all possible selections
            // so return true here if so because it would have returned false earlier if it had failed
            if (colOpts.combiner === 'and') {
                return true;
            }
            // Otherwise it hasn't matched with anything by this point so it must be false
            return false;
        };
        /**
         * Creates the contents of the searchCont div
         *
         * NOTE This is overridden when semantic ui styling in order to integrate the search button into the text box.
         */
        SearchPane.prototype._searchContSetup = function () {
            if (this.c.controls && this.s.colOpts.controls) {
                this.dom.searchButton.appendTo(this.dom.searchLabelCont);
            }
            if (!(this.c.dtOpts.searching === false ||
                this.s.colOpts.dtOpts.searching === false ||
                this.s.customPaneSettings &&
                    this.s.customPaneSettings.dtOpts &&
                    this.s.customPaneSettings.dtOpts.searching !== undefined &&
                    !this.s.customPaneSettings.dtOpts.searching)) {
                this.dom.searchLabelCont.appendTo(this.dom.searchCont);
            }
        };
        /**
         * Adds outline to the pane when a selection has been made
         */
        SearchPane.prototype._searchExtras = function () {
            var updating = this.s.updating;
            this.s.updating = true;
            var filters = this.s.dtPane.rows({ selected: true }).data().pluck('filter').toArray();
            var nullIndex = filters.indexOf(this.emptyMessage());
            var container = $$5(this.s.dtPane.table().container());
            // If null index is found then search for empty cells as a filter.
            if (nullIndex > -1) {
                filters[nullIndex] = '';
            }
            // If a filter has been applied then outline the respective pane, remove it when it no longer is.
            if (filters.length > 0) {
                container.addClass(this.classes.selected);
            }
            else if (filters.length === 0) {
                container.removeClass(this.classes.selected);
            }
            this.s.updating = updating;
        };
        SearchPane.version = '2.1.2';
        SearchPane.classes = {
            bordered: 'dtsp-bordered',
            buttonGroup: 'dtsp-buttonGroup',
            buttonSub: 'dtsp-buttonSub',
            caret: 'dtsp-caret',
            clear: 'dtsp-clear',
            clearAll: 'dtsp-clearAll',
            clearButton: 'clearButton',
            collapseAll: 'dtsp-collapseAll',
            collapseButton: 'dtsp-collapseButton',
            container: 'dtsp-searchPane',
            countButton: 'dtsp-countButton',
            disabledButton: 'dtsp-disabledButton',
            hidden: 'dtsp-hidden',
            hide: 'dtsp-hide',
            layout: 'dtsp-',
            name: 'dtsp-name',
            nameButton: 'dtsp-nameButton',
            nameCont: 'dtsp-nameCont',
            narrow: 'dtsp-narrow',
            paneButton: 'dtsp-paneButton',
            paneInputButton: 'dtsp-paneInputButton',
            pill: 'dtsp-pill',
            rotated: 'dtsp-rotated',
            search: 'dtsp-search',
            searchCont: 'dtsp-searchCont',
            searchIcon: 'dtsp-searchIcon',
            searchLabelCont: 'dtsp-searchButtonCont',
            selected: 'dtsp-selected',
            smallGap: 'dtsp-smallGap',
            subRow1: 'dtsp-subRow1',
            subRow2: 'dtsp-subRow2',
            subRowsContainer: 'dtsp-subRowsContainer',
            title: 'dtsp-title',
            topRow: 'dtsp-topRow'
        };
        // Define SearchPanes default options
        SearchPane.defaults = {
            clear: true,
            collapse: true,
            combiner: 'or',
            container: function (dt) {
                return dt.table().container();
            },
            controls: true,
            dtOpts: {},
            emptyMessage: null,
            hideCount: false,
            i18n: {
                clearPane: '&times;',
                count: '{total}',
                emptyMessage: '<em>No data</em>'
            },
            initCollapsed: false,
            layout: 'auto',
            name: undefined,
            orderable: true,
            orthogonal: {
                display: 'display',
                filter: 'filter',
                hideCount: false,
                search: 'filter',
                show: undefined,
                sort: 'sort',
                threshold: 0.6,
                type: 'type',
                viewCount: true
            },
            preSelect: [],
            threshold: 0.6,
            viewCount: true
        };
        return SearchPane;
    }());

    var __extends$4 = (window && window.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var SearchPaneST = /** @class */ (function (_super) {
        __extends$4(SearchPaneST, _super);
        function SearchPaneST(paneSettings, opts, index, panesContainer, panes) {
            return _super.call(this, paneSettings, opts, index, panesContainer, panes) || this;
        }
        /**
         * When server-side processing is enabled, SP will remove rows and then readd them,
         * resulting in Select's reference to the last selected cell being lost.
         * This function is provided to update that reference.
         *
         * @returns Function
         */
        SearchPaneST.prototype._emptyPane = function () {
            var dt = this.s.dtPane;
            if (datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].versionCheck('2')) {
                var last = dt.select.last();
                var selectedIndex_1;
                if (last && dt.row(last.row).any()) {
                    selectedIndex_1 = dt.row(last.row).data().index;
                }
                dt.rows().remove();
                return function () {
                    if (selectedIndex_1 !== undefined) {
                        var idx = dt.row(function (i, data) { return data.index === selectedIndex_1; }).index();
                        dt.select.last({ row: idx, column: 0 });
                    }
                };
            }
            dt.rows().remove();
            return function () { };
        };
        /**
         * Populates the SearchPane based off of the data that has been recieved from the server
         *
         * This method overrides SearchPane's _serverPopulate() method
         *
         * @param dataIn The data that has been sent from the server
         */
        SearchPaneST.prototype._serverPopulate = function (dataIn) {
            var selection, row, data;
            this.s.rowData.binsShown = {};
            this.s.rowData.arrayFilter = [];
            if (dataIn.tableLength !== undefined) {
                this.s.tableLength = dataIn.tableLength;
                this.s.rowData.totalOptions = this.s.tableLength;
            }
            else if (this.s.tableLength === null || this.s.dt.rows()[0].length > this.s.tableLength) {
                this.s.tableLength = this.s.dt.rows()[0].length;
                this.s.rowData.totalOptions = this.s.tableLength;
            }
            var colTitle = this.s.dt.column(this.s.index).dataSrc();
            // If there is SP data for this column add it to the data array and bin
            if (dataIn.searchPanes.options[colTitle] !== undefined) {
                for (var _i = 0, _a = dataIn.searchPanes.options[colTitle]; _i < _a.length; _i++) {
                    var dataPoint = _a[_i];
                    this.s.rowData.arrayFilter.push({
                        display: dataPoint.label,
                        filter: dataPoint.value,
                        shown: +dataPoint.count,
                        sort: dataPoint.label,
                        total: +dataPoint.total,
                        type: dataPoint.label
                    });
                    this.s.rowData.binsShown[dataPoint.value] = +dataPoint.count;
                    this.s.rowData.bins[dataPoint.value] = +dataPoint.total;
                }
            }
            var binLength = Object.keys(this.s.rowData.bins).length;
            var uniqueRatio = this._uniqueRatio(binLength, this.s.tableLength);
            // Don't show the pane if there isnt enough variance in the data, or there is only 1 entry for that pane
            if (!this.s.colOpts.show &&
                this.s.displayed === false &&
                ((this.s.colOpts.show === undefined && this.s.colOpts.threshold === null ?
                    uniqueRatio > this.c.threshold :
                    uniqueRatio > this.s.colOpts.threshold) ||
                    this.s.colOpts.show !== true && binLength <= 1)) {
                this.dom.container.addClass(this.classes.hidden);
                this.s.displayed = false;
                return;
            }
            // Store the original data
            this.s.rowData.arrayOriginal = this.s.rowData.arrayFilter;
            this.s.rowData.binsOriginal = this.s.rowData.bins;
            // Flag this pane as being displayed
            this.s.displayed = true;
            // If the pane exists
            if (this.s.dtPane) {
                // Not the selections that have been made and remove all of the rows
                var selected = this.s.serverSelect;
                var reselect = this._emptyPane();
                // Add the rows that are to be shown into the pane
                for (var _b = 0, _c = this.s.rowData.arrayFilter; _b < _c.length; _b++) {
                    data = _c[_b];
                    if (this._shouldAddRow(data)) {
                        row = this.addRow(data.display, data.filter, data.sort, data.type);
                        // Select the row if it was selected before
                        for (var i = 0; i < selected.length; i++) {
                            selection = selected[i];
                            if (selection.filter === data.filter) {
                                // This flag stops another request being made to the server
                                this.s.serverSelecting = true;
                                row.select();
                                this.s.serverSelecting = false;
                                // Remove the selection from the to select list and add it to the selected list
                                selected.splice(i, 1);
                                this.s.selections.push(data.filter);
                                break;
                            }
                        }
                    }
                }
                // Remake any selections that are no longer present
                for (var _d = 0, selected_1 = selected; _d < selected_1.length; _d++) {
                    selection = selected_1[_d];
                    for (var _e = 0, _f = this.s.rowData.arrayOriginal; _e < _f.length; _e++) {
                        data = _f[_e];
                        if (data.filter === selection.filter) {
                            row = this.addRow(data.display, data.filter, data.sort, data.type);
                            this.s.serverSelecting = true;
                            row.select();
                            this.s.serverSelecting = false;
                            this.s.selections.push(data.filter);
                        }
                    }
                }
                // Store the selected rows
                this.s.serverSelect = this.s.dtPane.rows({ selected: true }).data().toArray();
                // Update the pane
                this.s.dtPane.draw();
                reselect();
            }
        };
        /**
         * This method updates the rows and their data within the SearchPanes
         *
         * SearchPaneCascade overrides this method
         */
        SearchPaneST.prototype.updateRows = function () {
            if (!this.s.dt.page.info().serverSide) {
                // Get the latest count values from the table
                this.s.rowData.binsShown = {};
                for (var _i = 0, _a = this.s.dt.rows({ search: 'applied' }).indexes().toArray(); _i < _a.length; _i++) {
                    var index = _a[_i];
                    this._updateShown(index, this.s.dt.settings()[0], this.s.rowData.binsShown);
                }
            }
            var _loop_1 = function (row) {
                row.shown = typeof this_1.s.rowData.binsShown[row.filter] === 'number' ?
                    this_1.s.rowData.binsShown[row.filter] :
                    0;
                this_1.s.dtPane
                    .row(function (idx, data) {
                    return data && (data.index === row.index);
                })
                    .data(row);
            };
            var this_1 = this;
            // Update the rows data to show the current counts
            for (var _b = 0, _c = this.s.dtPane.rows().data().toArray(); _b < _c.length; _b++) {
                var row = _c[_b];
                _loop_1(row);
            }
            // Show updates in the pane
            this.s.dtPane.draw();
            this.s.dtPane.table().node().parentNode.scrollTop = this.s.scrollTop;
        };
        /**
         * Remove functionality from makeSelection - needs to be more advanced when tracking selections
         */
        SearchPaneST.prototype._makeSelection = function () {
            return;
        };
        /**
         * Blank method to remove reloading of selected rows - needs to be more advanced when tracking selections
         */
        SearchPaneST.prototype._reloadSelect = function () {
            return;
        };
        /**
         * Decides if a row should be added when being added from the server
         *
         * Overridden by SearchPaneCascade
         *
         * @param data the row data
         * @returns boolean indicating if the row should be added or not
         */
        SearchPaneST.prototype._shouldAddRow = function (data) {
            return true;
        };
        /**
         * Updates the server selection list where appropriate
         */
        SearchPaneST.prototype._updateSelection = function () {
            if (this.s.dt.page.info().serverSide && !this.s.updating && !this.s.serverSelecting) {
                this.s.serverSelect = this.s.dtPane.rows({ selected: true }).data().toArray();
            }
        };
        /**
         * Used when binning the data for a column
         *
         * @param rowIdx The current row that is to be added to the bins
         * @param settings The datatables settings object
         * @param bins The bins object that is to be incremented
         */
        SearchPaneST.prototype._updateShown = function (rowIdx, settings, bins) {
            if (bins === void 0) { bins = this.s.rowData.binsShown; }
            var orth = typeof this.s.colOpts.orthogonal === 'string'
                ? this.s.colOpts.orthogonal
                : this.s.colOpts.orthogonal.search;
            var fastData = settings.fastData
                ? settings.fastData
                : function (row, col, orth) {
                    // Legacy DT1
                    return settings.oApi._fnGetCellData(settings, row, col, orth);
                };
            var filter = fastData(rowIdx, this.s.index, orth);
            var add = function (f) {
                if (!bins[f]) {
                    bins[f] = 1;
                }
                else {
                    bins[f]++;
                }
            };
            if (Array.isArray(filter)) {
                for (var _i = 0, filter_1 = filter; _i < filter_1.length; _i++) {
                    var f = filter_1[_i];
                    add(f);
                }
            }
            else {
                add(filter);
            }
        };
        return SearchPaneST;
    }(SearchPane));

    var __extends$3 = (window && window.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var $$4;
    function setJQuery$3(jq) {
        $$4 = jq;
    }
    var SearchPaneViewTotal = /** @class */ (function (_super) {
        __extends$3(SearchPaneViewTotal, _super);
        function SearchPaneViewTotal(paneSettings, opts, index, panesContainer, panes) {
            var _this = this;
            var override = {
                i18n: {
                    countFiltered: '{shown} ({total})'
                }
            };
            _this = _super.call(this, paneSettings, $$4.extend(override, opts), index, panesContainer, panes) || this;
            return _this;
        }
        /**
         * Gets the message that is to be used to indicate the count for each SearchPane row
         *
         * This method overrides _getMessage() in SearchPane and is overridden by SearchPaneCascadeViewTotal
         *
         * @param row The row object that is being processed
         * @returns string - the message that is to be shown for the count of each entry
         */
        SearchPaneViewTotal.prototype._getMessage = function (row) {
            var countMessage = this.s.dt.i18n('searchPanes.count', this.c.i18n.count);
            var filteredMessage = this.s.dt.i18n('searchPanes.countFiltered', this.c.i18n.countFiltered);
            return (this.s.filteringActive ? filteredMessage : countMessage)
                .replace(/{total}/g, row.total)
                .replace(/{shown}/g, row.shown);
        };
        /**
         * Overrides the blank method in SearchPane to return the number of times a given value is currently being displayed
         *
         * @param filter The filter value
         * @returns number - The number of times the value is shown
         */
        SearchPaneViewTotal.prototype._getShown = function (filter) {
            return this.s.rowData.binsShown && this.s.rowData.binsShown[filter] ?
                this.s.rowData.binsShown[filter] :
                0;
        };
        return SearchPaneViewTotal;
    }(SearchPaneST));

    var __extends$2 = (window && window.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var $$3;
    function setJQuery$2(jq) {
        $$3 = jq;
    }
    var SearchPaneCascade = /** @class */ (function (_super) {
        __extends$2(SearchPaneCascade, _super);
        function SearchPaneCascade(paneSettings, opts, index, panesContainer, panes) {
            var _this = this;
            var override = {
                i18n: {
                    count: '{shown}'
                }
            };
            _this = _super.call(this, paneSettings, $$3.extend(override, opts), index, panesContainer, panes) || this;
            return _this;
        }
        /**
         * This method updates the rows and their data within the SearchPanes
         *
         * This overrides the method in SearchPane
         */
        SearchPaneCascade.prototype.updateRows = function () {
            // Note the currently selected values in the pane and remove all of the rows
            var selected = this.s.dtPane.rows({ selected: true }).data().toArray();
            var selection;
            if (this.s.colOpts.options ||
                this.s.customPaneSettings && this.s.customPaneSettings.options) {
                // If there are custom options set or it is a custom pane then get them
                this._getComparisonRows();
                var rows = this.s.dtPane.rows().toArray()[0];
                for (var i = 0; i < rows.length; i++) {
                    var row = this.s.dtPane.row(rows[i]);
                    var rowData = row.data();
                    if (rowData === undefined) {
                        continue;
                    }
                    if (rowData.shown === 0) {
                        row.remove();
                        rows = this.s.dtPane.rows().toArray()[0];
                        i--;
                        continue;
                    }
                    for (var _i = 0, selected_1 = selected; _i < selected_1.length; _i++) {
                        selection = selected_1[_i];
                        if (rowData.filter === selection.filter) {
                            row.select();
                            selected.splice(i, 1);
                            this.s.selections.push(rowData.filter);
                            break;
                        }
                    }
                }
            }
            else {
                if (!this.s.dt.page.info().serverSide) {
                    // Get the latest count values from the table
                    this._activePopulatePane();
                    this.s.rowData.binsShown = {};
                    for (var _a = 0, _b = this.s.dt.rows({ search: 'applied' }).indexes().toArray(); _a < _b.length; _a++) {
                        var index = _b[_a];
                        this._updateShown(index, this.s.dt.settings()[0], this.s.rowData.binsShown);
                    }
                }
                this.s.dtPane.rows().remove();
                // Go over all of the rows that could be displayed
                for (var _c = 0, _d = this.s.rowData.arrayFilter; _c < _d.length; _c++) {
                    var data = _d[_c];
                    // Cascade - If there are no rows present in the table don't show the option
                    if (data.shown === 0) {
                        continue;
                    }
                    // Add the row to the pane
                    var newRow = this.addRow(data.display, data.filter, data.sort, data.type, undefined);
                    // Check if this row was selected
                    for (var j = 0; j < selected.length; j++) {
                        var selectedRow = selected[j];
                        if (selectedRow.filter === data.filter) {
                            newRow.select();
                            // Remove the row from the to find list and then add it to the selections list
                            selected.splice(j, 1);
                            this.s.selections.push(data.filter);
                            break;
                        }
                    }
                }
                // Add all of the rows that were previously selected but aren't any more
                for (var _e = 0, selected_2 = selected; _e < selected_2.length; _e++) {
                    selection = selected_2[_e];
                    for (var _f = 0, _g = this.s.rowData.arrayOriginal; _f < _g.length; _f++) {
                        var origData = _g[_f];
                        if (origData.filter === selection.filter) {
                            var addedRow = this.addRow(origData.display, origData.filter, origData.sort, origData.type, undefined);
                            addedRow.select();
                            this.s.selections.push(origData.filter);
                        }
                    }
                }
            }
            // Show updates in the pane
            this.s.dtPane.draw();
            this.s.dtPane.table().node().parentNode.scrollTop = this.s.scrollTop;
            // If client side updated the tables results
            if (!this.s.dt.page.info().serverSide) {
                this.s.dt.draw(false);
            }
        };
        /**
         * Fill the array with the values that are currently being displayed in the table
         */
        SearchPaneCascade.prototype._activePopulatePane = function () {
            this.s.rowData.arrayFilter = [];
            this.s.rowData.bins = {};
            var settings = this.s.dt.settings()[0];
            if (!this.s.dt.page.info().serverSide) {
                for (var _i = 0, _a = this.s.dt.rows({ search: 'applied' }).indexes().toArray(); _i < _a.length; _i++) {
                    var index = _a[_i];
                    this._populatePaneArray(index, this.s.rowData.arrayFilter, settings);
                }
            }
        };
        SearchPaneCascade.prototype._getComparisonRows = function () {
            // Find the appropriate options depending on whether this is a pane for a specific column or a custom pane
            var options = this.s.colOpts.options
                ? this.s.colOpts.options
                : this.s.customPaneSettings && this.s.customPaneSettings.options
                    ? this.s.customPaneSettings.options
                    : undefined;
            if (options === undefined) {
                return;
            }
            var allRows = this.s.dt.rows();
            var shownRows = this.s.dt.rows({ search: 'applied' });
            var tableValsTotal = allRows.data().toArray();
            var tableValsShown = shownRows.data().toArray();
            var rows = [];
            // Clear all of the other rows from the pane, only custom options are to be displayed when they are defined
            this.s.dtPane.clear();
            this.s.indexes = [];
            for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                var comp = options_1[_i];
                // Initialise the object which is to be placed in the row
                var insert = comp.label !== '' ?
                    comp.label :
                    this.emptyMessage();
                var comparisonObj = {
                    className: comp.className,
                    display: insert,
                    filter: typeof comp.value === 'function' ? comp.value : [],
                    shown: 0,
                    sort: insert,
                    total: 0,
                    type: insert
                };
                // If a custom function is in place
                if (typeof comp.value === 'function') {
                    // Count the number of times the function evaluates to true for the original data in the Table
                    for (var i = 0; i < tableValsTotal.length; i++) {
                        if (comp.value.call(this.s.dt, tableValsTotal[i], allRows[0][i])) {
                            comparisonObj.total++;
                        }
                    }
                    for (var j = 0; j < tableValsShown.length; j++) {
                        if (comp.value.call(this.s.dt, tableValsShown[j], shownRows[0][j])) {
                            comparisonObj.shown++;
                        }
                    }
                    // Update the comparisonObj
                    if (typeof comparisonObj.filter !== 'function') {
                        comparisonObj.filter.push(comp.filter);
                    }
                }
                rows.push(this.addRow(comparisonObj.display, comparisonObj.filter, comparisonObj.sort, comparisonObj.type, comparisonObj.className, comparisonObj.total, comparisonObj.shown));
            }
            return rows;
        };
        /**
         * Gets the message that is to be used to indicate the count for each SearchPane row
         *
         * This method overrides _getMessage() in SearchPane and is overridden by SearchPaneCascadeViewTotal
         *
         * @param row The row object that is being processed
         * @returns string - the message that is to be shown for the count of each entry
         */
        SearchPaneCascade.prototype._getMessage = function (row) {
            return this.s.dt.i18n('searchPanes.count', this.c.i18n.count)
                .replace(/{total}/g, row.total)
                .replace(/{shown}/g, row.shown);
        };
        /**
         * Overrides the blank method in SearchPane to return the number of times a given value is currently being displayed
         *
         * @param filter The filter value
         * @returns number - The number of times the value is shown
         */
        SearchPaneCascade.prototype._getShown = function (filter) {
            return this.s.rowData.binsShown && this.s.rowData.binsShown[filter] ?
                this.s.rowData.binsShown[filter] :
                0;
        };
        /**
         * Decides if a row should be added when being added from the server
         *
         * Overrides method in by SearchPaneST
         *
         * @param data the row data
         * @returns boolean indicating if the row should be added or not
         */
        SearchPaneCascade.prototype._shouldAddRow = function (data) {
            return data.shown > 0;
        };
        return SearchPaneCascade;
    }(SearchPaneST));

    var __extends$1 = (window && window.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var $$2;
    function setJQuery$1(jq) {
        $$2 = jq;
    }
    var SearchPaneCascadeViewTotal = /** @class */ (function (_super) {
        __extends$1(SearchPaneCascadeViewTotal, _super);
        function SearchPaneCascadeViewTotal(paneSettings, opts, index, panesContainer, panes) {
            var _this = this;
            var override = {
                i18n: {
                    count: '{total}',
                    countFiltered: '{shown} ({total})'
                }
            };
            _this = _super.call(this, paneSettings, $$2.extend(override, opts), index, panesContainer, panes) || this;
            return _this;
        }
        /**
         * Fill the array with the values that are currently being displayed in the table
         *
         * This method overrides _activePopulatePane() in SearchPaneCascade
         */
        SearchPaneCascadeViewTotal.prototype._activePopulatePane = function () {
            this.s.rowData.arrayFilter = [];
            this.s.rowData.binsShown = {};
            var settings = this.s.dt.settings()[0];
            if (!this.s.dt.page.info().serverSide) {
                for (var _i = 0, _a = this.s.dt.rows({ search: 'applied' }).indexes().toArray(); _i < _a.length; _i++) {
                    var index = _a[_i];
                    this._populatePaneArray(index, this.s.rowData.arrayFilter, settings, this.s.rowData.binsShown);
                }
            }
        };
        /**
         * Gets the message that is to be used to indicate the count for each SearchPane row
         *
         * This method overrides _getMessage() in SearchPaneCascade
         *
         * @param row The row object that is being processed
         * @returns string - the message that is to be shown for the count of each entry
         */
        SearchPaneCascadeViewTotal.prototype._getMessage = function (row) {
            var countMessage = this.s.dt.i18n('searchPanes.count', this.c.i18n.count);
            var filteredMessage = this.s.dt.i18n('searchPanes.countFiltered', this.c.i18n.countFiltered);
            return (this.s.filteringActive ? filteredMessage : countMessage)
                .replace(/{total}/g, row.total)
                .replace(/{shown}/g, row.shown);
        };
        return SearchPaneCascadeViewTotal;
    }(SearchPaneCascade));

    var $$1;
    var dataTable$1;
    function setJQuery(jq) {
        $$1 = jq;
        dataTable$1 = jq.fn.dataTable;
    }
    var SearchPanes = /** @class */ (function () {
        function SearchPanes(paneSettings, opts, fromPreInit, paneClass) {
            var _this = this;
            if (fromPreInit === void 0) { fromPreInit = false; }
            if (paneClass === void 0) { paneClass = SearchPane; }
            // Check that the required version of DataTables is included
            if (!dataTable$1 || !dataTable$1.versionCheck || !dataTable$1.versionCheck('1.10.0')) {
                throw new Error('SearchPane requires DataTables 1.10 or newer');
            }
            // Check that Select is included
            // eslint-disable-next-line no-extra-parens
            if (!dataTable$1.select) {
                throw new Error('SearchPane requires Select');
            }
            var table = new dataTable$1.Api(paneSettings);
            this.classes = $$1.extend(true, {}, SearchPanes.classes);
            // Get options from user
            this.c = $$1.extend(true, {}, SearchPanes.defaults, opts);
            // Add extra elements to DOM object including clear
            this.dom = {
                clearAll: $$1('<button type="button"/>')
                    .addClass(this.classes.clearAll)
                    .html(table.i18n('searchPanes.clearMessage', this.c.i18n.clearMessage)),
                collapseAll: $$1('<button type="button"/>')
                    .addClass(this.classes.collapseAll)
                    .html(table.i18n('searchPanes.collapseMessage', this.c.i18n.collapseMessage)),
                container: $$1('<div/>').addClass(this.classes.panes).html(table.i18n('searchPanes.loadMessage', this.c.i18n.loadMessage)),
                emptyMessage: $$1('<div/>').addClass(this.classes.emptyMessage),
                panes: $$1('<div/>').addClass(this.classes.container),
                showAll: $$1('<button type="button"/>')
                    .addClass(this.classes.showAll)
                    .addClass(this.classes.disabledButton)
                    .attr('disabled', 'true')
                    .html(table.i18n('searchPanes.showMessage', this.c.i18n.showMessage)),
                title: $$1('<div/>').addClass(this.classes.title),
                titleRow: $$1('<div/>').addClass(this.classes.titleRow)
            };
            this.s = {
                colOpts: [],
                dt: table,
                filterCount: 0,
                minPaneWidth: 260.0,
                page: 0,
                paging: false,
                pagingST: false,
                paneClass: paneClass,
                panes: [],
                selectionList: [],
                serverData: {},
                stateRead: false,
                updating: false
            };
            // Do not reinitialise if already initialised on table
            if (table.settings()[0]._searchPanes) {
                return;
            }
            // When the panes update, we check it the clear buttons needs to be updated
            $$1(document).on('draw.dt', function (e) {
                if (_this.dom.container.find(e.target).length) {
                    _this._updateFilterCount();
                }
            });
            this._getState();
            if (this.s.dt.page.info().serverSide) {
                var hostSettings = this.s.dt.settings()[0];
                // Listener to get the data into the server request before it is made
                this.s.dt.on('preXhr.dtsps', function (e, settings, data) {
                    if (hostSettings !== settings) {
                        return;
                    }
                    if (data.searchPanes === undefined) {
                        data.searchPanes = {};
                    }
                    if (data.searchPanes_null === undefined) {
                        data.searchPanes_null = {};
                    }
                    var src;
                    for (var _i = 0, _a = _this.s.selectionList; _i < _a.length; _i++) {
                        var selection = _a[_i];
                        src = _this.s.dt.column(selection.column).dataSrc();
                        if (data.searchPanes[src] === undefined) {
                            data.searchPanes[src] = {};
                        }
                        if (data.searchPanes_null[src] === undefined) {
                            data.searchPanes_null[src] = {};
                        }
                        for (var i = 0; i < selection.rows.length; i++) {
                            data.searchPanes[src][i] = selection.rows[i];
                            if (data.searchPanes[src][i] === null) {
                                data.searchPanes_null[src][i] = true;
                            }
                            else {
                                data.searchPanes_null[src][i] = false;
                            }
                        }
                    }
                    if (_this.s.selectionList.length > 0) {
                        data.searchPanesLast = src;
                    }
                    // Config options that will change how the querying is done
                    data.searchPanes_options = {
                        cascade: _this.c.cascadePanes,
                        viewCount: _this.c.viewCount,
                        viewTotal: _this.c.viewTotal
                    };
                });
            }
            this._setXHR();
            table.settings()[0]._searchPanes = this;
            if (this.s.dt.settings()[0]._bInitComplete || fromPreInit) {
                this._paneDeclare(table, paneSettings, opts);
            }
            else {
                table.one('preInit.dtsps', function () {
                    _this._paneDeclare(table, paneSettings, opts);
                });
            }
            return this;
        }
        /**
         * Clear the selections of all of the panes
         */
        SearchPanes.prototype.clearSelections = function () {
            var pane;
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                pane = _a[_i];
                if (pane.s.dtPane) {
                    pane.s.scrollTop = pane.s.dtPane.table().node().parentNode.scrollTop;
                }
            }
            // Load in all of the searchBoxes in the documents
            var searches = this.dom.container.find('.' + this.classes.search.replace(/\s+/g, '.'));
            // For each searchBox set the input text to be empty and then trigger
            // an input on them so that they no longer filter the panes
            searches.each(function () {
                $$1(this).val('').trigger('input');
            });
            // Clear the selectionList
            this.s.selectionList = [];
            var returnArray = [];
            for (var _b = 0, _c = this.s.panes; _b < _c.length; _b++) {
                pane = _c[_b];
                if (pane.s.dtPane) {
                    returnArray.push(pane.clearPane());
                }
            }
            return returnArray;
        };
        /**
         * returns the container node for the searchPanes
         */
        SearchPanes.prototype.getNode = function () {
            return this.dom.container;
        };
        /**
         * rebuilds all of the panes
         */
        SearchPanes.prototype.rebuild = function (targetIdx, maintainSelection) {
            if (targetIdx === void 0) { targetIdx = false; }
            if (maintainSelection === void 0) { maintainSelection = false; }
            this.dom.emptyMessage.detach();
            // As a rebuild from scratch is required, empty the searchpanes container.
            if (targetIdx === false) {
                this.dom.panes.empty();
            }
            // Rebuild each pane individually, if a specific pane has been selected then only rebuild that one
            var returnArray = [];
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (targetIdx === false || pane.s.index === targetIdx) {
                    pane.clearData();
                    pane.rebuildPane(this.s.dt.page.info().serverSide ?
                        this.s.serverData :
                        undefined, maintainSelection);
                    this.dom.panes.append(pane.dom.container);
                    returnArray.push(pane);
                }
            }
            this._updateSelection();
            // Attach panes, clear buttons, and title bar to the document
            this._updateFilterCount();
            this._attachPaneContainer();
            this._initSelectionListeners(false);
            // If the selections are to be maintained, then it is safe to assume that paging is also to be maintained
            // Otherwise, the paging should be reset
            this.s.dt.draw(!maintainSelection);
            // Resize the panes incase there has been a change
            this.resizePanes();
            // If a single pane has been rebuilt then return only that pane
            return returnArray.length === 1 ? returnArray[0] : returnArray;
        };
        /**
         * Resizes all of the panes
         */
        SearchPanes.prototype.resizePanes = function () {
            var pane;
            if (this.c.layout === 'auto') {
                var contWidth = $$1(this.s.dt.searchPanes.container()).width();
                var target = Math.floor(contWidth / this.s.minPaneWidth); // The neatest number of panes per row
                var highest_1 = 1;
                var highestmod_1 = 0;
                // Get the indexes of all of the displayed panes
                var dispIndex = [];
                for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                    pane = _a[_i];
                    if (pane.s.displayed) {
                        dispIndex.push(pane.s.index);
                    }
                }
                var displayCount = dispIndex.length;
                // If the neatest number is the number we have then use this.
                if (target === displayCount) {
                    highest_1 = target;
                }
                else {
                    // Go from the target down and find the value with the most panes left over, this will be the best fit
                    for (var ppr = target; ppr > 1; ppr--) {
                        var rem = displayCount % ppr;
                        if (rem === 0) {
                            highest_1 = ppr;
                            highestmod_1 = 0;
                            break;
                        }
                        // If there are more left over at this amount of panes per row (ppr)
                        // then it fits better so new values
                        else if (rem > highestmod_1) {
                            highest_1 = ppr;
                            highestmod_1 = rem;
                        }
                    }
                }
                // If there is a perfect fit then none are to be wider
                var widerIndexes_1 = highestmod_1 !== 0 ? dispIndex.slice(dispIndex.length - highestmod_1, dispIndex.length) : [];
                this.s.panes.forEach(function (pane) {
                    // Resize the pane with the new layout
                    if (pane.s.displayed) {
                        pane.resize('columns-' + (!widerIndexes_1.includes(pane.s.index) ? highest_1 : highestmod_1));
                    }
                });
            }
            else {
                for (var _b = 0, _c = this.s.panes; _b < _c.length; _b++) {
                    pane = _c[_b];
                    pane.adjustTopRow();
                }
            }
            return this;
        };
        /**
         * Holder method that is userd in SearchPanesST to set listeners that have an effect on other panes
         *
         * @param isPreselect boolean to indicate if the preselect array is to override the current selection list.
         */
        SearchPanes.prototype._initSelectionListeners = function (isPreselect) {
            return;
        };
        /**
         * Blank method that is overridden in SearchPanesST to retrieve the totals from the server data
         */
        SearchPanes.prototype._serverTotals = function () {
            return;
        };
        /**
         * Set's the xhr listener so that SP can extact appropriate data from the response
         */
        SearchPanes.prototype._setXHR = function () {
            var _this = this;
            var hostSettings = this.s.dt.settings()[0];
            var run = function (json) {
                if (json && json.searchPanes && json.searchPanes.options) {
                    _this.s.serverData = json;
                    _this.s.serverData.tableLength = json.recordsTotal;
                    _this._serverTotals();
                }
            };
            // We are using the xhr event to rebuild the panes if required due to viewTotal being enabled
            // If viewTotal is not enabled then we simply update the data from the server
            this.s.dt.on('xhr.dtsps', function (e, settings, json) {
                if (hostSettings === settings) {
                    run(json);
                }
            });
            // Account for the initial JSON fetch having already completed
            run(this.s.dt.ajax.json());
        };
        /**
         * Set's the function that is to be performed when a state is loaded
         *
         * Overridden by the method in SearchPanesST
         */
        SearchPanes.prototype._stateLoadListener = function () {
            var _this = this;
            var hostSettings = this.s.dt.settings()[0];
            this.s.dt.on('stateLoadParams.dtsps', function (e, settings, data) {
                if (data.searchPanes === undefined || settings !== hostSettings) {
                    return;
                }
                _this.clearSelections();
                // Set the selection list for the panes so that the correct
                // rows can be reselected and in the right order
                _this.s.selectionList =
                    data.searchPanes.selectionList ?
                        data.searchPanes.selectionList :
                        [];
                // Find the panes that match from the state and the actual instance
                if (data.searchPanes.panes) {
                    for (var _i = 0, _a = data.searchPanes.panes; _i < _a.length; _i++) {
                        var loadedPane = _a[_i];
                        for (var _b = 0, _c = _this.s.panes; _b < _c.length; _b++) {
                            var pane = _c[_b];
                            if (loadedPane.id === pane.s.index && pane.s.dtPane) {
                                // Set the value of the searchbox
                                pane.dom.searchBox.val(loadedPane.searchTerm);
                                // Set the value of the order
                                pane.s.dtPane.order(loadedPane.order);
                            }
                        }
                    }
                }
                _this._makeSelections(_this.s.selectionList);
            });
        };
        /**
         * Updates the selectionList when cascade is not in place
         *
         * Overridden in SearchPanesST
         */
        SearchPanes.prototype._updateSelection = function () {
            this.s.selectionList = [];
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.dtPane) {
                    var rows = pane.s.dtPane.rows({ selected: true }).data().toArray().map(function (el) { return el.filter; });
                    if (rows.length) {
                        this.s.selectionList.push({
                            column: pane.s.index,
                            rows: rows
                        });
                    }
                }
            }
        };
        /**
         * Attach the panes, buttons and title to the document
         */
        SearchPanes.prototype._attach = function () {
            var _this = this;
            this.dom.titleRow
                .removeClass(this.classes.hide)
                .detach()
                .append(this.dom.title);
            // If the clear button is permitted attach it
            if (this.c.clear) {
                this.dom.clearAll
                    .appendTo(this.dom.titleRow)
                    .off('click.dtsps')
                    .on('click.dtsps', function () { return _this.clearSelections(); });
            }
            if (this.c.collapse) {
                this.dom.showAll.appendTo(this.dom.titleRow);
                this.dom.collapseAll.appendTo(this.dom.titleRow);
                this._setCollapseListener();
            }
            // Attach the container for each individual pane to the overall container
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                this.dom.panes.append(pane.dom.container);
            }
            // Attach everything to the document
            this.dom.container
                .text('')
                .removeClass(this.classes.hide)
                .append(this.dom.titleRow)
                .append(this.dom.panes);
            // WORKAROUND
            this.s.panes.forEach(function (pane) { return pane.setListeners(); });
            if ($$1('div.' + this.classes.container).length === 0) {
                this.dom.container.prependTo(this.s.dt);
            }
        };
        /**
         * If there are no panes to display then this method is called to either
         * display a message in their place or hide them completely.
         */
        SearchPanes.prototype._attachMessage = function () {
            // Create a message to display on the screen
            var message;
            try {
                message = this.s.dt.i18n('searchPanes.emptyPanes', this.c.i18n.emptyPanes);
            }
            catch (error) {
                message = null;
            }
            // If the message is an empty string then searchPanes.emptyPanes is undefined,
            // therefore the pane container should be removed from the display
            if (message === null) {
                this.dom.container.addClass(this.classes.hide);
                this.dom.titleRow.removeClass(this.classes.hide);
                return;
            }
            // Otherwise display the message
            this.dom.container.removeClass(this.classes.hide);
            this.dom.titleRow.addClass(this.classes.hide);
            this.dom.emptyMessage.html(message).appendTo(this.dom.container);
        };
        /**
         * Attaches the panes to the document and displays a message or hides if there are none
         */
        SearchPanes.prototype._attachPaneContainer = function () {
            // If a pane is to be displayed then attach the normal pane output
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.displayed === true) {
                    this._attach();
                    return;
                }
            }
            // Otherwise attach the custom message or remove the container from the display
            this._attachMessage();
        };
        /**
         * Checks which panes are collapsed and then performs relevant actions to the collapse/show all buttons
         */
        SearchPanes.prototype._checkCollapse = function () {
            var disableClose = true;
            var disableShow = true;
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.displayed) {
                    // If the pane is not collapsed
                    if (!pane.dom.collapseButton.hasClass(pane.classes.rotated)) {
                        // Enable the collapse all button
                        this.dom.collapseAll.removeClass(this.classes.disabledButton).removeAttr('disabled');
                        disableClose = false;
                    }
                    else {
                        // Otherwise enable the show all button
                        this.dom.showAll.removeClass(this.classes.disabledButton).removeAttr('disabled');
                        disableShow = false;
                    }
                }
            }
            // If this flag is still true, no panes are open so the close button should be disabled
            if (disableClose) {
                this.dom.collapseAll.addClass(this.classes.disabledButton).attr('disabled', 'true');
            }
            // If this flag is still true, no panes are closed so the show button should be disabled
            if (disableShow) {
                this.dom.showAll.addClass(this.classes.disabledButton).attr('disabled', 'true');
            }
        };
        /**
         * Attaches the message to the document but does not add any panes
         */
        SearchPanes.prototype._checkMessage = function () {
            // If a pane is to be displayed then attach the normal pane output
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.displayed === true) {
                    // Ensure that the empty message is removed if a pane is displayed
                    this.dom.emptyMessage.detach();
                    this.dom.titleRow.removeClass(this.classes.hide);
                    return;
                }
            }
            // Otherwise attach the custom message or remove the container from the display
            this._attachMessage();
        };
        /**
         * Collapses all of the panes
         */
        SearchPanes.prototype._collapseAll = function () {
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                pane.collapse();
            }
        };
        /**
         * Finds a pane based upon the name of that pane
         *
         * @param name string representing the name of the pane
         * @returns SearchPane The pane which has that name
         */
        SearchPanes.prototype._findPane = function (name) {
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (name === pane.s.name) {
                    return pane;
                }
            }
        };
        /**
         * Gets the selection list from the previous state and stores it in the selectionList Property
         */
        SearchPanes.prototype._getState = function () {
            var loadedFilter = this.s.dt.state.loaded();
            if (loadedFilter && loadedFilter.searchPanes && loadedFilter.searchPanes.selectionList) {
                this.s.selectionList = loadedFilter.searchPanes.selectionList;
            }
        };
        SearchPanes.prototype._makeSelections = function (selectList) {
            for (var _i = 0, selectList_1 = selectList; _i < selectList_1.length; _i++) {
                var selection = selectList_1[_i];
                var pane = void 0;
                for (var _a = 0, _b = this.s.panes; _a < _b.length; _a++) {
                    var p = _b[_a];
                    if (p.s.index === selection.column) {
                        pane = p;
                        break;
                    }
                }
                if (pane && pane.s.dtPane) {
                    for (var j = 0; j < pane.s.dtPane.rows().data().toArray().length; j++) {
                        if (selection.rows.includes(typeof pane.s.dtPane.row(j).data().filter === 'function' ?
                            pane.s.dtPane.cell(j, 0).data() :
                            pane.s.dtPane.row(j).data().filter)) {
                            pane.s.dtPane.row(j).select();
                        }
                    }
                    pane.updateTable();
                }
            }
        };
        /**
         * Declares the instances of individual searchpanes dependant on the number of columns.
         * It is necessary to run this once preInit has completed otherwise no panes will be
         * created as the column count will be 0.
         *
         * @param table the DataTable api for the parent table
         * @param paneSettings the settings passed into the constructor
         * @param opts the options passed into the constructor
         */
        SearchPanes.prototype._paneDeclare = function (table, paneSettings, opts) {
            var _this = this;
            // Create Panes
            table
                .columns(this.c.columns.length > 0 ? this.c.columns : undefined)
                .eq(0)
                .each(function (idx) {
                _this.s.panes.push(new _this.s.paneClass(paneSettings, opts, idx, _this.dom.panes));
            });
            // If there is any extra custom panes defined then create panes for them too
            var colCount = table.columns().eq(0).toArray().length;
            for (var i = 0; i < this.c.panes.length; i++) {
                var id = colCount + i;
                this.s.panes.push(new this.s.paneClass(paneSettings, opts, id, this.dom.panes, this.c.panes[i]));
            }
            // If a custom ordering is being used
            if (this.c.order.length > 0) {
                // Make a new Array of panes based upon the order
                this.s.panes = this.c.order.map(function (name) { return _this._findPane(name); });
            }
            // If this internal property is true then the DataTable has been initialised already
            if (this.s.dt.settings()[0]._bInitComplete) {
                this._startup(table);
            }
            else {
                // Otherwise add the paneStartup function to the list of functions
                // that are to be run when the table is initialised. This will garauntee that the
                // panes are initialised before the init event and init Complete callback is fired
                if (dataTable$1.versionCheck('2')) {
                    this.s.dt.settings()[0].aoInitComplete.push(function () { return _this._startup(table); });
                }
                else {
                    this.s.dt.settings()[0].aoInitComplete.push({
                        fn: function () { return _this._startup(table); }
                    });
                }
            }
        };
        /**
         * Sets the listeners for the collapse and show all buttons
         * Also sets and performs checks on current panes to see if they are collapsed
         */
        SearchPanes.prototype._setCollapseListener = function () {
            var _this = this;
            this.dom.collapseAll
                .off('click.dtsps')
                .on('click.dtsps', function () {
                _this._collapseAll();
                _this.dom.collapseAll.addClass(_this.classes.disabledButton).attr('disabled', 'true');
                _this.dom.showAll.removeClass(_this.classes.disabledButton).removeAttr('disabled');
                _this.s.dt.state.save();
            });
            this.dom.showAll
                .off('click.dtsps')
                .on('click.dtsps', function () {
                _this._showAll();
                _this.dom.showAll.addClass(_this.classes.disabledButton).attr('disabled', 'true');
                _this.dom.collapseAll.removeClass(_this.classes.disabledButton).removeAttr('disabled');
                _this.s.dt.state.save();
            });
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                // We want to make the same check whenever there is a collapse/expand
                pane.dom.topRow.off('collapse.dtsps').on('collapse.dtsps', function () { return _this._checkCollapse(); });
            }
            this._checkCollapse();
        };
        /**
         * Shows all of the panes
         */
        SearchPanes.prototype._showAll = function () {
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                pane.show();
            }
        };
        /**
         * Initialises the tables previous/preset selections and initialises callbacks for events
         *
         * @param table the parent table for which the searchPanes are being created
         */
        SearchPanes.prototype._startup = function (table) {
            var _this = this;
            // Attach clear button and title bar to the document
            this._attach();
            this.dom.panes.empty();
            var hostSettings = this.s.dt.settings()[0];
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                pane.rebuildPane(Object.keys(this.s.serverData).length > 0 ? this.s.serverData : undefined);
                this.dom.panes.append(pane.dom.container);
            }
            // If the layout is set to auto then the panes need to be resized to their best fit
            if (this.c.layout === 'auto') {
                this.resizePanes();
            }
            var loadedFilter = this.s.dt.state.loaded();
            // Reset the paging if that has been saved in the state
            if (!this.s.stateRead && loadedFilter) {
                this.s.dt
                    .page(loadedFilter.start / this.s.dt.page.len())
                    .draw('page');
            }
            this.s.stateRead = true;
            this._checkMessage();
            // When a draw is called on the DataTable, update all of the panes incase the data in the DataTable has changed
            table.on('preDraw.dtsps', function () {
                // Check that the panes are not updating to avoid infinite loops
                // Also check that this draw is not due to paging
                if (!_this.s.updating && !_this.s.paging) {
                    _this._updateFilterCount();
                    _this._updateSelection();
                }
                // Paging flag reset - we only need to dodge the draw once
                _this.s.paging = false;
            });
            $$1(window).on('resize.dtsps', dataTable$1.util.throttle(function () { return _this.resizePanes(); }));
            // Whenever a state save occurs store the selection list in the state object
            this.s.dt.on('stateSaveParams.dtsps', function (e, settings, data) {
                if (settings !== hostSettings) {
                    return;
                }
                if (data.searchPanes === undefined) {
                    data.searchPanes = {};
                }
                data.searchPanes.selectionList = _this.s.selectionList;
            });
            this._stateLoadListener();
            // Listener for paging on main table
            table.off('page.dtsps page-nc.dtsps').on('page.dtsps page-nc.dtsps', function (e, s) {
                _this.s.paging = true;
                // This is an indicator to any selection tracking classes that paging has occured
                // It has to happen here so that we don't stack event listeners unnecessarily
                // The value is only ever set back to false in the SearchPanesST class
                // Equally it is never read in this class
                _this.s.pagingST = true;
                _this.s.page = _this.s.dt.page();
            });
            if (this.s.dt.page.info().serverSide) {
                table.off('preXhr.dtsps').on('preXhr.dtsps', function (e, settings, data) {
                    if (settings !== hostSettings) {
                        return;
                    }
                    if (!data.searchPanes) {
                        data.searchPanes = {};
                    }
                    if (!data.searchPanes_null) {
                        data.searchPanes_null = {};
                    }
                    // Count how many filters are being applied
                    var filterCount = 0;
                    for (var _i = 0, _a = _this.s.panes; _i < _a.length; _i++) {
                        var pane = _a[_i];
                        var src = _this.s.dt.column(pane.s.index).dataSrc();
                        if (!data.searchPanes[src]) {
                            data.searchPanes[src] = {};
                        }
                        if (!data.searchPanes_null[src]) {
                            data.searchPanes_null[src] = {};
                        }
                        if (pane.s.dtPane) {
                            var rowData = pane.s.dtPane.rows({ selected: true }).data().toArray();
                            for (var i = 0; i < rowData.length; i++) {
                                data.searchPanes[src][i] = rowData[i].filter;
                                if (!data.searchPanes[src][i]) {
                                    data.searchPanes_null[src][i] = true;
                                }
                                else {
                                    data.searchPanes_null[src][i] = false;
                                }
                                filterCount++;
                            }
                        }
                    }
                    // If there is a filter to be applied, then we need to read from the start of the result set
                    // and set the paging to 0. This matches the behaviour of client side processing
                    if (filterCount > 0) {
                        // If the number of filters has changed we need to read from the start of the
                        // result set and reset the paging
                        if (filterCount !== _this.s.filterCount) {
                            data.start = 0;
                            _this.s.page = 0;
                        }
                        // Otherwise it is a paging request and we need to read from whatever the paging has been set to
                        else {
                            data.start = _this.s.page * _this.s.dt.page.len();
                        }
                        _this.s.dt.page(_this.s.page);
                        _this.s.filterCount = filterCount;
                    }
                    if (_this.s.selectionList.length > 0) {
                        data.searchPanesLast = _this.s.dt
                            .column(_this.s.selectionList[_this.s.selectionList.length - 1].column)
                            .dataSrc();
                    }
                    // Config options that will change how the querying is done
                    data.searchPanes_options = {
                        cascade: _this.c.cascadePanes,
                        viewCount: _this.c.viewCount,
                        viewTotal: _this.c.viewTotal
                    };
                });
            }
            else {
                table.on('preXhr.dtsps', function () { return _this.s.panes.forEach(function (pane) { return pane.clearData(); }); });
            }
            // If the data is reloaded from the server then it is possible that it has changed completely,
            // so we need to rebuild the panes
            this.s.dt.on('xhr.dtsps', function (e, settings) {
                if (settings.nTable !== _this.s.dt.table().node()) {
                    return;
                }
                if (!_this.s.dt.page.info().serverSide) {
                    var processing_1 = false;
                    _this.s.dt.one('preDraw.dtsps', function () {
                        if (processing_1) {
                            return;
                        }
                        var page = _this.s.dt.page();
                        processing_1 = true;
                        _this.s.updating = true;
                        _this.dom.panes.empty();
                        for (var _i = 0, _a = _this.s.panes; _i < _a.length; _i++) {
                            var pane = _a[_i];
                            pane.clearData(); // Clears all of the bins and will mean that the data has to be re-read
                            // Pass a boolean to say whether this is the last choice made for maintaining selections
                            // when rebuilding
                            pane.rebuildPane(undefined, true);
                            _this.dom.panes.append(pane.dom.container);
                        }
                        if (!_this.s.dt.page.info().serverSide) {
                            _this.s.dt.draw();
                        }
                        _this.s.updating = false;
                        _this._updateSelection();
                        _this._checkMessage();
                        _this.s.dt.one('draw.dtsps', function () {
                            _this.s.updating = true;
                            _this.s.dt.page(page).draw(false);
                            _this.s.updating = false;
                        });
                    });
                }
            });
            // PreSelect any selections which have been defined using the preSelect option
            var selectList = this.c.preSelect;
            if (loadedFilter && loadedFilter.searchPanes && loadedFilter.searchPanes.selectionList) {
                selectList = loadedFilter.searchPanes.selectionList;
            }
            this._makeSelections(selectList);
            // Update the title bar to show how many filters have been selected
            this._updateFilterCount();
            // If the table is destroyed and restarted then clear the selections so that they do not persist.
            table.on('destroy.dtsps', function (e, settings) {
                if (settings !== hostSettings) {
                    return;
                }
                for (var _i = 0, _a = _this.s.panes; _i < _a.length; _i++) {
                    var pane = _a[_i];
                    pane.destroy();
                }
                table.off('.dtsps');
                _this.dom.showAll.off('.dtsps');
                _this.dom.clearAll.off('.dtsps');
                _this.dom.collapseAll.off('.dtsps');
                $$1(table.table().node()).off('.dtsps');
                _this.dom.container.detach();
                _this.clearSelections();
            });
            if (this.c.collapse) {
                this._setCollapseListener();
            }
            // When the clear All button has been pressed clear all of the selections in the panes
            if (this.c.clear) {
                this.dom.clearAll
                    .off('click.dtsps')
                    .on('click.dtsps', function () { return _this.clearSelections(); });
            }
            hostSettings._searchPanes = this;
            // This state save is required so that state is maintained over multiple refreshes if no actions are made
            this.s.dt.state.save();
        };
        /**
         * Updates the number of filters that have been applied in the title
         */
        SearchPanes.prototype._updateFilterCount = function () {
            var filterCount = 0;
            var tableSearch = 0;
            // Add the number of all of the filters throughout the panes
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.dtPane) {
                    filterCount += pane.getPaneCount();
                    if (pane.s.dtPane.search()) {
                        tableSearch++;
                    }
                }
            }
            // Run the message through the internationalisation method to improve readability
            this.dom.title.html(this.s.dt.i18n('searchPanes.title', this.c.i18n.title, filterCount));
            if (this.c.filterChanged && typeof this.c.filterChanged === 'function') {
                this.c.filterChanged.call(this.s.dt, filterCount);
            }
            if (filterCount === 0 && tableSearch === 0) {
                this.dom.clearAll.addClass(this.classes.disabledButton).attr('disabled', 'true');
            }
            else {
                this.dom.clearAll.removeClass(this.classes.disabledButton).removeAttr('disabled');
            }
        };
        SearchPanes.version = '2.3.3';
        SearchPanes.classes = {
            clear: 'dtsp-clear',
            clearAll: 'dtsp-clearAll',
            collapseAll: 'dtsp-collapseAll',
            container: 'dtsp-searchPanes',
            disabledButton: 'dtsp-disabledButton',
            emptyMessage: 'dtsp-emptyMessage',
            hide: 'dtsp-hidden',
            panes: 'dtsp-panesContainer',
            search: 'dtsp-search',
            showAll: 'dtsp-showAll',
            title: 'dtsp-title',
            titleRow: 'dtsp-titleRow'
        };
        // Define SearchPanes default options
        SearchPanes.defaults = {
            cascadePanes: false,
            clear: true,
            collapse: true,
            columns: [],
            container: function (dt) {
                return dt.table().container();
            },
            filterChanged: undefined,
            i18n: {
                clearMessage: 'Clear All',
                clearPane: '&times;',
                collapse: {
                    0: 'SearchPanes',
                    _: 'SearchPanes (%d)'
                },
                collapseMessage: 'Collapse All',
                count: '{total}',
                emptyMessage: '<em>No data</em>',
                emptyPanes: 'No SearchPanes',
                loadMessage: 'Loading Search Panes...',
                showMessage: 'Show All',
                title: 'Filters Active - %d'
            },
            layout: 'auto',
            order: [],
            panes: [],
            preSelect: [],
            viewCount: true,
            viewTotal: false
        };
        return SearchPanes;
    }());

    var __extends = (window && window.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var SearchPanesST = /** @class */ (function (_super) {
        __extends(SearchPanesST, _super);
        function SearchPanesST(paneSettings, opts, fromPreInit) {
            if (fromPreInit === void 0) { fromPreInit = false; }
            var _this = this;
            var paneClass;
            if (opts.cascadePanes && opts.viewTotal) {
                paneClass = SearchPaneCascadeViewTotal;
            }
            else if (opts.cascadePanes) {
                paneClass = SearchPaneCascade;
            }
            else if (opts.viewTotal) {
                paneClass = SearchPaneViewTotal;
            }
            _this = _super.call(this, paneSettings, opts, fromPreInit, paneClass) || this;
            var dt = _this.s.dt;
            var loadedFilter = dt.state.loaded();
            var loadFn = function () { return _this._initSelectionListeners(true, loadedFilter && loadedFilter.searchPanes && loadedFilter.searchPanes.selectionList ?
                loadedFilter.searchPanes.selectionList :
                _this.c.preSelect); };
            if (dt.settings()[0]._bInitComplete) {
                loadFn();
            }
            else {
                dt.off('init.dtsps').on('init.dtsps', loadFn);
            }
            return _this;
        }
        /**
         * Ensures that the correct selection listeners are set for selection tracking
         *
         * @param preSelect Any values that are to be preselected
         */
        SearchPanesST.prototype._initSelectionListeners = function (isPreselect, preSelect) {
            if (isPreselect === void 0) { isPreselect = true; }
            if (preSelect === void 0) { preSelect = []; }
            if (isPreselect) {
                this.s.selectionList = preSelect;
            }
            // Set selection listeners for each pane
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.displayed) {
                    pane.s.dtPane
                        .off('select.dtsp')
                        .on('select.dtsp', this._update(pane))
                        .off('deselect.dtsp')
                        .on('deselect.dtsp', this._updateTimeout(pane));
                }
            }
            // Update on every draw
            this.s.dt.off('draw.dtsps').on('draw.dtsps', this._update());
            // Also update right now as table has just initialised
            this._updateSelectionList();
        };
        /**
         * Retrieve the total values from the server data
         */
        SearchPanesST.prototype._serverTotals = function () {
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.colOpts.show) {
                    var colTitle = this.s.dt.column(pane.s.index).dataSrc();
                    var blockVT = true;
                    // If any of the counts are not equal to the totals filtering must be active
                    if (this.s.serverData.searchPanes.options[colTitle]) {
                        for (var _b = 0, _c = this.s.serverData.searchPanes.options[colTitle]; _b < _c.length; _b++) {
                            var data = _c[_b];
                            if (data.total !== data.count) {
                                blockVT = false;
                                break;
                            }
                        }
                    }
                    // Set if filtering is present on the pane and populate the data arrays
                    pane.s.filteringActive = !blockVT;
                    pane._serverPopulate(this.s.serverData);
                }
            }
        };
        /**
         * Set's the function that is to be performed when a state is loaded
         *
         * Overrides the method in SearchPanes
         */
        SearchPanesST.prototype._stateLoadListener = function () {
            var _this = this;
            var stateLoadFunction = function (e, settings, data) {
                if (data.searchPanes === undefined) {
                    return;
                }
                // Set the selection list for the panes so that the correct
                // rows can be reselected and in the right order
                _this.s.selectionList =
                    data.searchPanes.selectionList ?
                        data.searchPanes.selectionList :
                        [];
                // Find the panes that match from the state and the actual instance
                if (data.searchPanes.panes) {
                    for (var _i = 0, _a = data.searchPanes.panes; _i < _a.length; _i++) {
                        var loadedPane = _a[_i];
                        for (var _b = 0, _c = _this.s.panes; _b < _c.length; _b++) {
                            var pane = _c[_b];
                            if (loadedPane.id === pane.s.index && pane.s.dtPane) {
                                // Set the value of the searchbox
                                pane.dom.searchBox.val(loadedPane.searchTerm);
                                // Set the value of the order
                                pane.s.dtPane.order(loadedPane.order);
                            }
                        }
                    }
                }
                _this._updateSelectionList();
            };
            this.s.dt.off('stateLoadParams.dtsps', stateLoadFunction).on('stateLoadParams.dtsps', stateLoadFunction);
        };
        /**
         * Remove the function's actions when using cascade
         *
         * Overrides the method in SearchPanes
         */
        SearchPanesST.prototype._updateSelection = function () {
            return;
        };
        /**
         * Returns a function that updates the selection list based on a specific pane
         * Also clears the timeout to stop the deselect from running
         *
         * @param pane the pane that is to have it's selections loaded
         */
        SearchPanesST.prototype._update = function (pane) {
            var _this = this;
            if (pane === void 0) { pane = undefined; }
            return function () {
                if (pane) {
                    clearTimeout(pane.s.deselectTimeout);
                }
                _this._updateSelectionList(pane);
            };
        };
        /**
         * Returns a function that updates the selection list based on a specific pane
         * Also sets a timeout incase a select is about to be made
         *
         * @param pane the pane that is to have it's selections loaded
         */
        SearchPanesST.prototype._updateTimeout = function (pane) {
            var _this = this;
            if (pane === void 0) { pane = undefined; }
            return function () { return pane ?
                pane.s.deselectTimeout = setTimeout(function () { return _this._updateSelectionList(pane); }, 50) :
                _this._updateSelectionList(); };
        };
        /**
         * Updates the selection list to include the latest selections for a given pane
         *
         * @param index The index of the pane that is to be updated
         * @param selected Which rows are selected within the pane
         */
        SearchPanesST.prototype._updateSelectionList = function (paneIn) {
            if (paneIn === void 0) { paneIn = undefined; }
            // Bail if any of these flags are set
            if (this.s.pagingST) {
                // Reset pagingST flag
                this.s.pagingST = false;
                return;
            }
            else if (this.s.updating || paneIn && paneIn.s.serverSelecting) {
                return;
            }
            if (paneIn !== undefined) {
                if (this.s.dt.page.info().serverSide) {
                    paneIn._updateSelection();
                }
                // Get filter values for all of the rows and the selections
                var rows = paneIn.s.dtPane.rows({ selected: true }).data().toArray().map(function (el) { return el.filter; });
                this.s.selectionList = this.s.selectionList.filter(function (selection) { return selection.column !== paneIn.s.index; });
                if (rows.length > 0) {
                    this.s.selectionList.push({
                        column: paneIn.s.index,
                        rows: rows
                    });
                    paneIn.dom.clear.removeClass(this.classes.disabledButton).removeAttr('disabled');
                }
                else {
                    paneIn.dom.clear.addClass(this.classes.disabledButton).attr('disabled', 'true');
                }
                if (this.s.dt.page.info().serverSide) {
                    this.s.dt.draw(false);
                }
            }
            this._remakeSelections();
            this._updateFilterCount();
        };
        /**
         * Remake the selections that were present before new data or calculations have occured
         */
        SearchPanesST.prototype._remakeSelections = function () {
            var currPane;
            var pane;
            this.s.updating = true;
            if (!this.s.dt.page.info().serverSide) {
                var tmpSL = this.s.selectionList;
                var anotherFilter = false;
                this.clearSelections();
                this.s.dt.draw(false);
                // When there are no selections present if the length of the data does not match the searched data
                // then another filter is present
                if (this.s.dt.rows().toArray()[0].length > this.s.dt.rows({ search: 'applied' }).toArray()[0].length) {
                    anotherFilter = true;
                }
                this.s.selectionList = tmpSL;
                // Update the rows in each pane
                for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                    pane = _a[_i];
                    if (pane.s.displayed) {
                        pane.s.filteringActive = anotherFilter;
                        pane.updateRows();
                    }
                }
                for (var _b = 0, _c = this.s.selectionList; _b < _c.length; _b++) {
                    var selection = _c[_b];
                    pane = null;
                    for (var _d = 0, _e = this.s.panes; _d < _e.length; _d++) {
                        var paneCheck = _e[_d];
                        if (paneCheck.s.index === selection.column) {
                            pane = paneCheck;
                            break;
                        }
                    }
                    if (!pane.s.dtPane) {
                        continue;
                    }
                    var ids = pane.s.dtPane.rows().indexes().toArray();
                    // Select the rows that are present in the selection list
                    for (var i = 0; i < selection.rows.length; i++) {
                        var rowFound = false;
                        for (var _f = 0, ids_1 = ids; _f < ids_1.length; _f++) {
                            var id = ids_1[_f];
                            var currRow = pane.s.dtPane.row(id);
                            var data = currRow.data();
                            if (selection.rows[i] === data.filter) {
                                currRow.select();
                                rowFound = true;
                            }
                        }
                        if (!rowFound) {
                            selection.rows.splice(i, 1);
                            i--;
                        }
                    }
                    pane.s.selections = selection.rows;
                    // If there are no rows selected then don't bother continuing past here
                    // Will just increase processing time and skew the rows that are shown in the table
                    if (selection.rows.length === 0) {
                        continue;
                    }
                    // Update the table to display the current results
                    this.s.dt.draw();
                    var filteringActive = false;
                    var filterCount = 0;
                    var prevSelectedPanes = 0;
                    var selectedPanes = 0;
                    // Add the number of all of the filters throughout the panes
                    for (var _g = 0, _h = this.s.panes; _g < _h.length; _g++) {
                        currPane = _h[_g];
                        if (currPane.s.dtPane) {
                            filterCount += currPane.getPaneCount();
                            if (filterCount > prevSelectedPanes) {
                                selectedPanes++;
                                prevSelectedPanes = filterCount;
                            }
                        }
                    }
                    filteringActive = filterCount > 0;
                    for (var _j = 0, _k = this.s.panes; _j < _k.length; _j++) {
                        currPane = _k[_j];
                        if (currPane.s.displayed) {
                            // Set the filtering active flag
                            if (anotherFilter || pane.s.index !== currPane.s.index || !filteringActive) {
                                currPane.s.filteringActive = filteringActive || anotherFilter;
                            }
                            else if (selectedPanes === 1) {
                                currPane.s.filteringActive = false;
                            }
                            // Update the rows to show correct counts
                            if (currPane.s.index !== pane.s.index) {
                                currPane.updateRows();
                            }
                        }
                    }
                }
                // Update table to show final search results
                this.s.dt.draw(false);
            }
            else {
                // Identify the last pane to have a change in selection
                if (this.s.selectionList.length > 0) {
                    pane = this.s.panes[this.s.selectionList[this.s.selectionList.length - 1].column];
                }
                // Update the rows of all of the other panes
                for (var _l = 0, _m = this.s.panes; _l < _m.length; _l++) {
                    currPane = _m[_l];
                    if (currPane.s.displayed && (!pane || currPane.s.index !== pane.s.index)) {
                        currPane.updateRows();
                    }
                }
            }
            this.s.updating = false;
        };
        return SearchPanesST;
    }(SearchPanes));

    /*! SearchPanes 2.3.3
     * © SpryMedia Ltd - datatables.net/license
     */
    setJQuery$4($);
    setJQuery($);
    setJQuery$3($);
    setJQuery$2($);
    setJQuery$1($);
    var dataTable = $.fn.dataTable;
    // eslint-disable-next-line no-extra-parens
    dataTable.SearchPanes = SearchPanes;
    // eslint-disable-next-line no-extra-parens
    datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].SearchPanes = SearchPanes;
    // eslint-disable-next-line no-extra-parens
    dataTable.SearchPanesST = SearchPanesST;
    // eslint-disable-next-line no-extra-parens
    datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].SearchPanesST = SearchPanesST;
    // eslint-disable-next-line no-extra-parens
    dataTable.SearchPane = SearchPane;
    // eslint-disable-next-line no-extra-parens
    datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].SearchPane = SearchPane;
    // eslint-disable-next-line no-extra-parens
    dataTable.SearchPaneViewTotal = SearchPaneViewTotal;
    // eslint-disable-next-line no-extra-parens
    datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].SearchPaneViewTotal = SearchPaneViewTotal;
    // eslint-disable-next-line no-extra-parens
    dataTable.SearchPaneCascade = SearchPaneCascade;
    // eslint-disable-next-line no-extra-parens
    datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].SearchPaneCascade = SearchPaneCascade;
    // eslint-disable-next-line no-extra-parens
    dataTable.SearchPaneCascadeViewTotal = SearchPaneCascadeViewTotal;
    // eslint-disable-next-line no-extra-parens
    datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].SearchPaneCascadeViewTotal = SearchPaneCascadeViewTotal;
    // eslint-disable-next-line no-extra-parens
    var apiRegister = $.fn.dataTable.Api.register;
    apiRegister('searchPanes()', function () {
        return this;
    });
    apiRegister('searchPanes.clearSelections()', function () {
        return this.iterator('table', function (ctx) {
            if (ctx._searchPanes) {
                ctx._searchPanes.clearSelections();
            }
        });
    });
    apiRegister('searchPanes.rebuildPane()', function (targetIdx, maintainSelections) {
        return this.iterator('table', function (ctx) {
            if (ctx._searchPanes) {
                ctx._searchPanes.rebuild(targetIdx, maintainSelections);
            }
        });
    });
    apiRegister('searchPanes.resizePanes()', function () {
        var ctx = this.context[0];
        return ctx._searchPanes ?
            ctx._searchPanes.resizePanes() :
            null;
    });
    apiRegister('searchPanes.container()', function () {
        var ctx = this.context[0];
        return ctx._searchPanes
            ? ctx._searchPanes.getNode()
            : null;
    });
    datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].ext.buttons.searchPanesClear = {
        action: function (e, dt) {
            dt.searchPanes.clearSelections();
        },
        text: 'Clear Panes'
    };
    datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].ext.buttons.searchPanes = {
        action: function (e, dt, node, config) {
            var _this = this;
            var that = this;
            if (!config._panes) {
                // No SearchPanes on this button yet - initialise and show
                this.processing(true);
                setTimeout(function () {
                    _buttonSourced(dt, node, config);
                    _this.popover(config._panes.getNode(), {
                        align: 'container',
                        span: 'container'
                    });
                    config._panes.rebuild(undefined, true);
                    // Tables were hidden in the popover, need to be resized
                    $('table.dataTable', config._panes.getNode()).DataTable().columns.adjust();
                    that.processing(false);
                }, 10);
            }
            else {
                // Already got SP - show it
                this.popover(config._panes.getNode(), {
                    align: 'container',
                    span: 'container'
                });
                config._panes.rebuild(undefined, true);
            }
        },
        init: function (dt, node, config) {
            dt.button(node).text(config.text || dt.i18n('searchPanes.collapse', 'SearchPanes', 0));
            // For cases when we need to initialise the SearchPane immediately
            if (dt.init().stateSave || config.delayInit === false) {
                _buttonSourced(dt, node, config);
            }
        },
        config: {},
        text: '',
        delayInit: true
    };
    function _buttonSourced(dt, node, config) {
        var buttonOpts = $.extend({
            filterChanged: function (count) {
                dt.button(node).text(dt.i18n('searchPanes.collapse', dt.context[0].oLanguage.searchPanes !== undefined ?
                    dt.context[0].oLanguage.searchPanes.collapse :
                    dt.context[0]._searchPanes.c.i18n.collapse, count));
            }
        }, config.config);
        var panes = buttonOpts && (buttonOpts.cascadePanes || buttonOpts.viewTotal) ?
            new datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].SearchPanesST(dt, buttonOpts) :
            new datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].SearchPanes(dt, buttonOpts);
        dt.button(node).text(config.text || dt.i18n('searchPanes.collapse', panes.c.i18n.collapse, 0));
        config._panes = panes;
    }
    function _init(settings, options, fromPre) {
        if (options === void 0) { options = null; }
        if (fromPre === void 0) { fromPre = false; }
        var api = new dataTable.Api(settings);
        var opts = options
            ? options
            : api.init().searchPanes || dataTable.defaults.searchPanes;
        var searchPanes = opts && (opts.cascadePanes || opts.viewTotal) ?
            new SearchPanesST(api, opts, fromPre) :
            new SearchPanes(api, opts, fromPre);
        var node = searchPanes.getNode();
        return node;
    }
    // Attach a listener to the document which listens for DataTables initialisation
    // events so we can automatically initialise
    $(document).on('preInit.dt.dtsp', function (e, settings) {
        if (e.namespace !== 'dt') {
            return;
        }
        if (settings.oInit.searchPanes ||
            datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].defaults.searchPanes) {
            if (!settings._searchPanes) {
                _init(settings, null, true);
            }
        }
    });
    // DataTables `dom` feature option
    datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].ext.feature.push({
        cFeature: 'P',
        fnInit: _init
    });
    // DataTables 2 layout feature
    if (datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].feature) {
        datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"].feature.register('searchPanes', _init);
    }

})();


/* harmony default export */ __webpack_exports__["default"] = (datatables_net__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "../../node_modules/datatables.net/js/dataTables.mjs":
/*!***********************************************************!*\
  !*** ../../node_modules/datatables.net/js/dataTables.mjs ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*! DataTables 2.1.8
 * © SpryMedia Ltd - datatables.net/license
 */



// DataTables code uses $ internally, but we want to be able to
// reassign $ with the `use` method, so it is a regular var.
var $ = jquery__WEBPACK_IMPORTED_MODULE_0__;


var DataTable = function ( selector, options )
{
	// Check if called with a window or jQuery object for DOM less applications
	// This is for backwards compatibility
	if (DataTable.factory(selector, options)) {
		return DataTable;
	}

	// When creating with `new`, create a new DataTable, returning the API instance
	if (this instanceof DataTable) {
		return $(selector).DataTable(options);
	}
	else {
		// Argument switching
		options = selector;
	}

	var _that = this;
	var emptyInit = options === undefined;
	var len = this.length;

	if ( emptyInit ) {
		options = {};
	}

	// Method to get DT API instance from jQuery object
	this.api = function ()
	{
		return new _Api( this );
	};

	this.each(function() {
		// For each initialisation we want to give it a clean initialisation
		// object that can be bashed around
		var o = {};
		var oInit = len > 1 ? // optimisation for single table case
			_fnExtend( o, options, true ) :
			options;

		
		var i=0, iLen;
		var sId = this.getAttribute( 'id' );
		var defaults = DataTable.defaults;
		var $this = $(this);
		
		
		/* Sanity check */
		if ( this.nodeName.toLowerCase() != 'table' )
		{
			_fnLog( null, 0, 'Non-table node initialisation ('+this.nodeName+')', 2 );
			return;
		}
		
		$(this).trigger( 'options.dt', oInit );
		
		/* Backwards compatibility for the defaults */
		_fnCompatOpts( defaults );
		_fnCompatCols( defaults.column );
		
		/* Convert the camel-case defaults to Hungarian */
		_fnCamelToHungarian( defaults, defaults, true );
		_fnCamelToHungarian( defaults.column, defaults.column, true );
		
		/* Setting up the initialisation object */
		_fnCamelToHungarian( defaults, $.extend( oInit, $this.data() ), true );
		
		
		
		/* Check to see if we are re-initialising a table */
		var allSettings = DataTable.settings;
		for ( i=0, iLen=allSettings.length ; i<iLen ; i++ )
		{
			var s = allSettings[i];
		
			/* Base check on table node */
			if (
				s.nTable == this ||
				(s.nTHead && s.nTHead.parentNode == this) ||
				(s.nTFoot && s.nTFoot.parentNode == this)
			) {
				var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve;
				var bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy;
		
				if ( emptyInit || bRetrieve )
				{
					return s.oInstance;
				}
				else if ( bDestroy )
				{
					new DataTable.Api(s).destroy();
					break;
				}
				else
				{
					_fnLog( s, 0, 'Cannot reinitialise DataTable', 3 );
					return;
				}
			}
		
			/* If the element we are initialising has the same ID as a table which was previously
			 * initialised, but the table nodes don't match (from before) then we destroy the old
			 * instance by simply deleting it. This is under the assumption that the table has been
			 * destroyed by other methods. Anyone using non-id selectors will need to do this manually
			 */
			if ( s.sTableId == this.id )
			{
				allSettings.splice( i, 1 );
				break;
			}
		}
		
		/* Ensure the table has an ID - required for accessibility */
		if ( sId === null || sId === "" )
		{
			sId = "DataTables_Table_"+(DataTable.ext._unique++);
			this.id = sId;
		}
		
		/* Create the settings object for this table and set some of the default parameters */
		var oSettings = $.extend( true, {}, DataTable.models.oSettings, {
			"sDestroyWidth": $this[0].style.width,
			"sInstance":     sId,
			"sTableId":      sId,
			colgroup: $('<colgroup>').prependTo(this),
			fastData: function (row, column, type) {
				return _fnGetCellData(oSettings, row, column, type);
			}
		} );
		oSettings.nTable = this;
		oSettings.oInit  = oInit;
		
		allSettings.push( oSettings );
		
		// Make a single API instance available for internal handling
		oSettings.api = new _Api( oSettings );
		
		// Need to add the instance after the instance after the settings object has been added
		// to the settings array, so we can self reference the table instance if more than one
		oSettings.oInstance = (_that.length===1) ? _that : $this.dataTable();
		
		// Backwards compatibility, before we apply all the defaults
		_fnCompatOpts( oInit );
		
		// If the length menu is given, but the init display length is not, use the length menu
		if ( oInit.aLengthMenu && ! oInit.iDisplayLength )
		{
			oInit.iDisplayLength = Array.isArray(oInit.aLengthMenu[0])
				? oInit.aLengthMenu[0][0]
				: $.isPlainObject( oInit.aLengthMenu[0] )
					? oInit.aLengthMenu[0].value
					: oInit.aLengthMenu[0];
		}
		
		// Apply the defaults and init options to make a single init object will all
		// options defined from defaults and instance options.
		oInit = _fnExtend( $.extend( true, {}, defaults ), oInit );
		
		
		// Map the initialisation options onto the settings object
		_fnMap( oSettings.oFeatures, oInit, [
			"bPaginate",
			"bLengthChange",
			"bFilter",
			"bSort",
			"bSortMulti",
			"bInfo",
			"bProcessing",
			"bAutoWidth",
			"bSortClasses",
			"bServerSide",
			"bDeferRender"
		] );
		_fnMap( oSettings, oInit, [
			"ajax",
			"fnFormatNumber",
			"sServerMethod",
			"aaSorting",
			"aaSortingFixed",
			"aLengthMenu",
			"sPaginationType",
			"iStateDuration",
			"bSortCellsTop",
			"iTabIndex",
			"sDom",
			"fnStateLoadCallback",
			"fnStateSaveCallback",
			"renderer",
			"searchDelay",
			"rowId",
			"caption",
			"layout",
			"orderDescReverse",
			"typeDetect",
			[ "iCookieDuration", "iStateDuration" ], // backwards compat
			[ "oSearch", "oPreviousSearch" ],
			[ "aoSearchCols", "aoPreSearchCols" ],
			[ "iDisplayLength", "_iDisplayLength" ]
		] );
		_fnMap( oSettings.oScroll, oInit, [
			[ "sScrollX", "sX" ],
			[ "sScrollXInner", "sXInner" ],
			[ "sScrollY", "sY" ],
			[ "bScrollCollapse", "bCollapse" ]
		] );
		_fnMap( oSettings.oLanguage, oInit, "fnInfoCallback" );
		
		/* Callback functions which are array driven */
		_fnCallbackReg( oSettings, 'aoDrawCallback',       oInit.fnDrawCallback );
		_fnCallbackReg( oSettings, 'aoStateSaveParams',    oInit.fnStateSaveParams );
		_fnCallbackReg( oSettings, 'aoStateLoadParams',    oInit.fnStateLoadParams );
		_fnCallbackReg( oSettings, 'aoStateLoaded',        oInit.fnStateLoaded );
		_fnCallbackReg( oSettings, 'aoRowCallback',        oInit.fnRowCallback );
		_fnCallbackReg( oSettings, 'aoRowCreatedCallback', oInit.fnCreatedRow );
		_fnCallbackReg( oSettings, 'aoHeaderCallback',     oInit.fnHeaderCallback );
		_fnCallbackReg( oSettings, 'aoFooterCallback',     oInit.fnFooterCallback );
		_fnCallbackReg( oSettings, 'aoInitComplete',       oInit.fnInitComplete );
		_fnCallbackReg( oSettings, 'aoPreDrawCallback',    oInit.fnPreDrawCallback );
		
		oSettings.rowIdFn = _fnGetObjectDataFn( oInit.rowId );
		
		/* Browser support detection */
		_fnBrowserDetect( oSettings );
		
		var oClasses = oSettings.oClasses;
		
		$.extend( oClasses, DataTable.ext.classes, oInit.oClasses );
		$this.addClass( oClasses.table );
		
		if (! oSettings.oFeatures.bPaginate) {
			oInit.iDisplayStart = 0;
		}
		
		if ( oSettings.iInitDisplayStart === undefined )
		{
			/* Display start point, taking into account the save saving */
			oSettings.iInitDisplayStart = oInit.iDisplayStart;
			oSettings._iDisplayStart = oInit.iDisplayStart;
		}
		
		var defer = oInit.iDeferLoading;
		if ( defer !== null )
		{
			oSettings.deferLoading = true;
		
			var tmp = Array.isArray(defer);
			oSettings._iRecordsDisplay = tmp ? defer[0] : defer;
			oSettings._iRecordsTotal = tmp ? defer[1] : defer;
		}
		
		/*
		 * Columns
		 * See if we should load columns automatically or use defined ones
		 */
		var columnsInit = [];
		var thead = this.getElementsByTagName('thead');
		var initHeaderLayout = _fnDetectHeader( oSettings, thead[0] );
		
		// If we don't have a columns array, then generate one with nulls
		if ( oInit.aoColumns ) {
			columnsInit = oInit.aoColumns;
		}
		else if ( initHeaderLayout.length ) {
			for ( i=0, iLen=initHeaderLayout[0].length ; i<iLen ; i++ ) {
				columnsInit.push( null );
			}
		}
		
		// Add the columns
		for ( i=0, iLen=columnsInit.length ; i<iLen ; i++ ) {
			_fnAddColumn( oSettings );
		}
		
		// Apply the column definitions
		_fnApplyColumnDefs( oSettings, oInit.aoColumnDefs, columnsInit, initHeaderLayout, function (iCol, oDef) {
			_fnColumnOptions( oSettings, iCol, oDef );
		} );
		
		/* HTML5 attribute detection - build an mData object automatically if the
		 * attributes are found
		 */
		var rowOne = $this.children('tbody').find('tr').eq(0);
		
		if ( rowOne.length ) {
			var a = function ( cell, name ) {
				return cell.getAttribute( 'data-'+name ) !== null ? name : null;
			};
		
			$( rowOne[0] ).children('th, td').each( function (i, cell) {
				var col = oSettings.aoColumns[i];
		
				if (! col) {
					_fnLog( oSettings, 0, 'Incorrect column count', 18 );
				}
		
				if ( col.mData === i ) {
					var sort = a( cell, 'sort' ) || a( cell, 'order' );
					var filter = a( cell, 'filter' ) || a( cell, 'search' );
		
					if ( sort !== null || filter !== null ) {
						col.mData = {
							_:      i+'.display',
							sort:   sort !== null   ? i+'.@data-'+sort   : undefined,
							type:   sort !== null   ? i+'.@data-'+sort   : undefined,
							filter: filter !== null ? i+'.@data-'+filter : undefined
						};
						col._isArrayHost = true;
		
						_fnColumnOptions( oSettings, i );
					}
				}
			} );
		}
		
		// Must be done after everything which can be overridden by the state saving!
		_fnCallbackReg( oSettings, 'aoDrawCallback', _fnSaveState );
		
		var features = oSettings.oFeatures;
		if ( oInit.bStateSave )
		{
			features.bStateSave = true;
		}
		
		// If aaSorting is not defined, then we use the first indicator in asSorting
		// in case that has been altered, so the default sort reflects that option
		if ( oInit.aaSorting === undefined ) {
			var sorting = oSettings.aaSorting;
			for ( i=0, iLen=sorting.length ; i<iLen ; i++ ) {
				sorting[i][1] = oSettings.aoColumns[ i ].asSorting[0];
			}
		}
		
		// Do a first pass on the sorting classes (allows any size changes to be taken into
		// account, and also will apply sorting disabled classes if disabled
		_fnSortingClasses( oSettings );
		
		_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
			if ( oSettings.bSorted || _fnDataSource( oSettings ) === 'ssp' || features.bDeferRender ) {
				_fnSortingClasses( oSettings );
			}
		} );
		
		
		/*
		 * Table HTML init
		 * Cache the header, body and footer as required, creating them if needed
		 */
		var caption = $this.children('caption');
		
		if ( oSettings.caption ) {
			if ( caption.length === 0 ) {
				caption = $('<caption/>').appendTo( $this );
			}
		
			caption.html( oSettings.caption );
		}
		
		// Store the caption side, so we can remove the element from the document
		// when creating the element
		if (caption.length) {
			caption[0]._captionSide = caption.css('caption-side');
			oSettings.captionNode = caption[0];
		}
		
		if ( thead.length === 0 ) {
			thead = $('<thead/>').appendTo($this);
		}
		oSettings.nTHead = thead[0];
		$('tr', thead).addClass(oClasses.thead.row);
		
		var tbody = $this.children('tbody');
		if ( tbody.length === 0 ) {
			tbody = $('<tbody/>').insertAfter(thead);
		}
		oSettings.nTBody = tbody[0];
		
		var tfoot = $this.children('tfoot');
		if ( tfoot.length === 0 ) {
			// If we are a scrolling table, and no footer has been given, then we need to create
			// a tfoot element for the caption element to be appended to
			tfoot = $('<tfoot/>').appendTo($this);
		}
		oSettings.nTFoot = tfoot[0];
		$('tr', tfoot).addClass(oClasses.tfoot.row);
		
		// Copy the data index array
		oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
		
		// Initialisation complete - table can be drawn
		oSettings.bInitialised = true;
		
		// Language definitions
		var oLanguage = oSettings.oLanguage;
		$.extend( true, oLanguage, oInit.oLanguage );
		
		if ( oLanguage.sUrl ) {
			// Get the language definitions from a file
			$.ajax( {
				dataType: 'json',
				url: oLanguage.sUrl,
				success: function ( json ) {
					_fnCamelToHungarian( defaults.oLanguage, json );
					$.extend( true, oLanguage, json, oSettings.oInit.oLanguage );
		
					_fnCallbackFire( oSettings, null, 'i18n', [oSettings], true);
					_fnInitialise( oSettings );
				},
				error: function () {
					// Error occurred loading language file
					_fnLog( oSettings, 0, 'i18n file loading error', 21 );
		
					// Continue on as best we can
					_fnInitialise( oSettings );
				}
			} );
		}
		else {
			_fnCallbackFire( oSettings, null, 'i18n', [oSettings], true);
			_fnInitialise( oSettings );
		}
	} );
	_that = null;
	return this;
};



/**
 * DataTables extensions
 * 
 * This namespace acts as a collection area for plug-ins that can be used to
 * extend DataTables capabilities. Indeed many of the build in methods
 * use this method to provide their own capabilities (sorting methods for
 * example).
 *
 * Note that this namespace is aliased to `jQuery.fn.dataTableExt` for legacy
 * reasons
 *
 *  @namespace
 */
DataTable.ext = _ext = {
	/**
	 * Buttons. For use with the Buttons extension for DataTables. This is
	 * defined here so other extensions can define buttons regardless of load
	 * order. It is _not_ used by DataTables core.
	 *
	 *  @type object
	 *  @default {}
	 */
	buttons: {},


	/**
	 * Element class names
	 *
	 *  @type object
	 *  @default {}
	 */
	classes: {},


	/**
	 * DataTables build type (expanded by the download builder)
	 *
	 *  @type string
	 */
	builder: "-source-",


	/**
	 * Error reporting.
	 * 
	 * How should DataTables report an error. Can take the value 'alert',
	 * 'throw', 'none' or a function.
	 *
	 *  @type string|function
	 *  @default alert
	 */
	errMode: "alert",


	/**
	 * Legacy so v1 plug-ins don't throw js errors on load
	 */
	feature: [],

	/**
	 * Feature plug-ins.
	 * 
	 * This is an object of callbacks which provide the features for DataTables
	 * to be initialised via the `layout` option.
	 */
	features: {},


	/**
	 * Row searching.
	 * 
	 * This method of searching is complimentary to the default type based
	 * searching, and a lot more comprehensive as it allows you complete control
	 * over the searching logic. Each element in this array is a function
	 * (parameters described below) that is called for every row in the table,
	 * and your logic decides if it should be included in the searching data set
	 * or not.
	 *
	 * Searching functions have the following input parameters:
	 *
	 * 1. `{object}` DataTables settings object: see
	 *    {@link DataTable.models.oSettings}
	 * 2. `{array|object}` Data for the row to be processed (same as the
	 *    original format that was passed in as the data source, or an array
	 *    from a DOM data source
	 * 3. `{int}` Row index ({@link DataTable.models.oSettings.aoData}), which
	 *    can be useful to retrieve the `TR` element if you need DOM interaction.
	 *
	 * And the following return is expected:
	 *
	 * * {boolean} Include the row in the searched result set (true) or not
	 *   (false)
	 *
	 * Note that as with the main search ability in DataTables, technically this
	 * is "filtering", since it is subtractive. However, for consistency in
	 * naming we call it searching here.
	 *
	 *  @type array
	 *  @default []
	 *
	 *  @example
	 *    // The following example shows custom search being applied to the
	 *    // fourth column (i.e. the data[3] index) based on two input values
	 *    // from the end-user, matching the data in a certain range.
	 *    $.fn.dataTable.ext.search.push(
	 *      function( settings, data, dataIndex ) {
	 *        var min = document.getElementById('min').value * 1;
	 *        var max = document.getElementById('max').value * 1;
	 *        var version = data[3] == "-" ? 0 : data[3]*1;
	 *
	 *        if ( min == "" && max == "" ) {
	 *          return true;
	 *        }
	 *        else if ( min == "" && version < max ) {
	 *          return true;
	 *        }
	 *        else if ( min < version && "" == max ) {
	 *          return true;
	 *        }
	 *        else if ( min < version && version < max ) {
	 *          return true;
	 *        }
	 *        return false;
	 *      }
	 *    );
	 */
	search: [],


	/**
	 * Selector extensions
	 *
	 * The `selector` option can be used to extend the options available for the
	 * selector modifier options (`selector-modifier` object data type) that
	 * each of the three built in selector types offer (row, column and cell +
	 * their plural counterparts). For example the Select extension uses this
	 * mechanism to provide an option to select only rows, columns and cells
	 * that have been marked as selected by the end user (`{selected: true}`),
	 * which can be used in conjunction with the existing built in selector
	 * options.
	 *
	 * Each property is an array to which functions can be pushed. The functions
	 * take three attributes:
	 *
	 * * Settings object for the host table
	 * * Options object (`selector-modifier` object type)
	 * * Array of selected item indexes
	 *
	 * The return is an array of the resulting item indexes after the custom
	 * selector has been applied.
	 *
	 *  @type object
	 */
	selector: {
		cell: [],
		column: [],
		row: []
	},


	/**
	 * Legacy configuration options. Enable and disable legacy options that
	 * are available in DataTables.
	 *
	 *  @type object
	 */
	legacy: {
		/**
		 * Enable / disable DataTables 1.9 compatible server-side processing
		 * requests
		 *
		 *  @type boolean
		 *  @default null
		 */
		ajax: null
	},


	/**
	 * Pagination plug-in methods.
	 * 
	 * Each entry in this object is a function and defines which buttons should
	 * be shown by the pagination rendering method that is used for the table:
	 * {@link DataTable.ext.renderer.pageButton}. The renderer addresses how the
	 * buttons are displayed in the document, while the functions here tell it
	 * what buttons to display. This is done by returning an array of button
	 * descriptions (what each button will do).
	 *
	 * Pagination types (the four built in options and any additional plug-in
	 * options defined here) can be used through the `paginationType`
	 * initialisation parameter.
	 *
	 * The functions defined take two parameters:
	 *
	 * 1. `{int} page` The current page index
	 * 2. `{int} pages` The number of pages in the table
	 *
	 * Each function is expected to return an array where each element of the
	 * array can be one of:
	 *
	 * * `first` - Jump to first page when activated
	 * * `last` - Jump to last page when activated
	 * * `previous` - Show previous page when activated
	 * * `next` - Show next page when activated
	 * * `{int}` - Show page of the index given
	 * * `{array}` - A nested array containing the above elements to add a
	 *   containing 'DIV' element (might be useful for styling).
	 *
	 * Note that DataTables v1.9- used this object slightly differently whereby
	 * an object with two functions would be defined for each plug-in. That
	 * ability is still supported by DataTables 1.10+ to provide backwards
	 * compatibility, but this option of use is now decremented and no longer
	 * documented in DataTables 1.10+.
	 *
	 *  @type object
	 *  @default {}
	 *
	 *  @example
	 *    // Show previous, next and current page buttons only
	 *    $.fn.dataTableExt.oPagination.current = function ( page, pages ) {
	 *      return [ 'previous', page, 'next' ];
	 *    };
	 */
	pager: {},


	renderer: {
		pageButton: {},
		header: {}
	},


	/**
	 * Ordering plug-ins - custom data source
	 * 
	 * The extension options for ordering of data available here is complimentary
	 * to the default type based ordering that DataTables typically uses. It
	 * allows much greater control over the the data that is being used to
	 * order a column, but is necessarily therefore more complex.
	 * 
	 * This type of ordering is useful if you want to do ordering based on data
	 * live from the DOM (for example the contents of an 'input' element) rather
	 * than just the static string that DataTables knows of.
	 * 
	 * The way these plug-ins work is that you create an array of the values you
	 * wish to be ordering for the column in question and then return that
	 * array. The data in the array much be in the index order of the rows in
	 * the table (not the currently ordering order!). Which order data gathering
	 * function is run here depends on the `dt-init columns.orderDataType`
	 * parameter that is used for the column (if any).
	 *
	 * The functions defined take two parameters:
	 *
	 * 1. `{object}` DataTables settings object: see
	 *    {@link DataTable.models.oSettings}
	 * 2. `{int}` Target column index
	 *
	 * Each function is expected to return an array:
	 *
	 * * `{array}` Data for the column to be ordering upon
	 *
	 *  @type array
	 *
	 *  @example
	 *    // Ordering using `input` node values
	 *    $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
	 *    {
	 *      return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
	 *        return $('input', td).val();
	 *      } );
	 *    }
	 */
	order: {},


	/**
	 * Type based plug-ins.
	 *
	 * Each column in DataTables has a type assigned to it, either by automatic
	 * detection or by direct assignment using the `type` option for the column.
	 * The type of a column will effect how it is ordering and search (plug-ins
	 * can also make use of the column type if required).
	 *
	 * @namespace
	 */
	type: {
		/**
		 * Automatic column class assignment
		 */
		className: {},

		/**
		 * Type detection functions.
		 *
		 * The functions defined in this object are used to automatically detect
		 * a column's type, making initialisation of DataTables super easy, even
		 * when complex data is in the table.
		 *
		 * The functions defined take two parameters:
		 *
	     *  1. `{*}` Data from the column cell to be analysed
	     *  2. `{settings}` DataTables settings object. This can be used to
	     *     perform context specific type detection - for example detection
	     *     based on language settings such as using a comma for a decimal
	     *     place. Generally speaking the options from the settings will not
	     *     be required
		 *
		 * Each function is expected to return:
		 *
		 * * `{string|null}` Data type detected, or null if unknown (and thus
		 *   pass it on to the other type detection functions.
		 *
		 *  @type array
		 *
		 *  @example
		 *    // Currency type detection plug-in:
		 *    $.fn.dataTable.ext.type.detect.push(
		 *      function ( data, settings ) {
		 *        // Check the numeric part
		 *        if ( ! data.substring(1).match(/[0-9]/) ) {
		 *          return null;
		 *        }
		 *
		 *        // Check prefixed by currency
		 *        if ( data.charAt(0) == '$' || data.charAt(0) == '&pound;' ) {
		 *          return 'currency';
		 *        }
		 *        return null;
		 *      }
		 *    );
		 */
		detect: [],

		/**
		 * Automatic renderer assignment
		 */
		render: {},


		/**
		 * Type based search formatting.
		 *
		 * The type based searching functions can be used to pre-format the
		 * data to be search on. For example, it can be used to strip HTML
		 * tags or to de-format telephone numbers for numeric only searching.
		 *
		 * Note that is a search is not defined for a column of a given type,
		 * no search formatting will be performed.
		 * 
		 * Pre-processing of searching data plug-ins - When you assign the sType
		 * for a column (or have it automatically detected for you by DataTables
		 * or a type detection plug-in), you will typically be using this for
		 * custom sorting, but it can also be used to provide custom searching
		 * by allowing you to pre-processing the data and returning the data in
		 * the format that should be searched upon. This is done by adding
		 * functions this object with a parameter name which matches the sType
		 * for that target column. This is the corollary of <i>afnSortData</i>
		 * for searching data.
		 *
		 * The functions defined take a single parameter:
		 *
	     *  1. `{*}` Data from the column cell to be prepared for searching
		 *
		 * Each function is expected to return:
		 *
		 * * `{string|null}` Formatted string that will be used for the searching.
		 *
		 *  @type object
		 *  @default {}
		 *
		 *  @example
		 *    $.fn.dataTable.ext.type.search['title-numeric'] = function ( d ) {
		 *      return d.replace(/\n/g," ").replace( /<.*?>/g, "" );
		 *    }
		 */
		search: {},


		/**
		 * Type based ordering.
		 *
		 * The column type tells DataTables what ordering to apply to the table
		 * when a column is sorted upon. The order for each type that is defined,
		 * is defined by the functions available in this object.
		 *
		 * Each ordering option can be described by three properties added to
		 * this object:
		 *
		 * * `{type}-pre` - Pre-formatting function
		 * * `{type}-asc` - Ascending order function
		 * * `{type}-desc` - Descending order function
		 *
		 * All three can be used together, only `{type}-pre` or only
		 * `{type}-asc` and `{type}-desc` together. It is generally recommended
		 * that only `{type}-pre` is used, as this provides the optimal
		 * implementation in terms of speed, although the others are provided
		 * for compatibility with existing Javascript sort functions.
		 *
		 * `{type}-pre`: Functions defined take a single parameter:
		 *
	     *  1. `{*}` Data from the column cell to be prepared for ordering
		 *
		 * And return:
		 *
		 * * `{*}` Data to be sorted upon
		 *
		 * `{type}-asc` and `{type}-desc`: Functions are typical Javascript sort
		 * functions, taking two parameters:
		 *
	     *  1. `{*}` Data to compare to the second parameter
	     *  2. `{*}` Data to compare to the first parameter
		 *
		 * And returning:
		 *
		 * * `{*}` Ordering match: <0 if first parameter should be sorted lower
		 *   than the second parameter, ===0 if the two parameters are equal and
		 *   >0 if the first parameter should be sorted height than the second
		 *   parameter.
		 * 
		 *  @type object
		 *  @default {}
		 *
		 *  @example
		 *    // Numeric ordering of formatted numbers with a pre-formatter
		 *    $.extend( $.fn.dataTable.ext.type.order, {
		 *      "string-pre": function(x) {
		 *        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
		 *        return parseFloat( a );
		 *      }
		 *    } );
		 *
		 *  @example
		 *    // Case-sensitive string ordering, with no pre-formatting method
		 *    $.extend( $.fn.dataTable.ext.order, {
		 *      "string-case-asc": function(x,y) {
		 *        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		 *      },
		 *      "string-case-desc": function(x,y) {
		 *        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		 *      }
		 *    } );
		 */
		order: {}
	},

	/**
	 * Unique DataTables instance counter
	 *
	 * @type int
	 * @private
	 */
	_unique: 0,


	//
	// Depreciated
	// The following properties are retained for backwards compatibility only.
	// The should not be used in new projects and will be removed in a future
	// version
	//

	/**
	 * Version check function.
	 *  @type function
	 *  @depreciated Since 1.10
	 */
	fnVersionCheck: DataTable.fnVersionCheck,


	/**
	 * Index for what 'this' index API functions should use
	 *  @type int
	 *  @deprecated Since v1.10
	 */
	iApiIndex: 0,


	/**
	 * Software version
	 *  @type string
	 *  @deprecated Since v1.10
	 */
	sVersion: DataTable.version
};


//
// Backwards compatibility. Alias to pre 1.10 Hungarian notation counter parts
//
$.extend( _ext, {
	afnFiltering: _ext.search,
	aTypes:       _ext.type.detect,
	ofnSearch:    _ext.type.search,
	oSort:        _ext.type.order,
	afnSortData:  _ext.order,
	aoFeatures:   _ext.feature,
	oStdClasses:  _ext.classes,
	oPagination:  _ext.pager
} );


$.extend( DataTable.ext.classes, {
	container: 'dt-container',
	empty: {
		row: 'dt-empty'
	},
	info: {
		container: 'dt-info'
	},
	layout: {
		row: 'dt-layout-row',
		cell: 'dt-layout-cell',
		tableRow: 'dt-layout-table',
		tableCell: '',
		start: 'dt-layout-start',
		end: 'dt-layout-end',
		full: 'dt-layout-full'
	},
	length: {
		container: 'dt-length',
		select: 'dt-input'
	},
	order: {
		canAsc: 'dt-orderable-asc',
		canDesc: 'dt-orderable-desc',
		isAsc: 'dt-ordering-asc',
		isDesc: 'dt-ordering-desc',
		none: 'dt-orderable-none',
		position: 'sorting_'
	},
	processing: {
		container: 'dt-processing'
	},
	scrolling: {
		body: 'dt-scroll-body',
		container: 'dt-scroll',
		footer: {
			self: 'dt-scroll-foot',
			inner: 'dt-scroll-footInner'
		},
		header: {
			self: 'dt-scroll-head',
			inner: 'dt-scroll-headInner'
		}
	},
	search: {
		container: 'dt-search',
		input: 'dt-input'
	},
	table: 'dataTable',	
	tbody: {
		cell: '',
		row: ''
	},
	thead: {
		cell: '',
		row: ''
	},
	tfoot: {
		cell: '',
		row: ''
	},
	paging: {
		active: 'current',
		button: 'dt-paging-button',
		container: 'dt-paging',
		disabled: 'disabled',
		nav: ''
	}
} );


/*
 * It is useful to have variables which are scoped locally so only the
 * DataTables functions can access them and they don't leak into global space.
 * At the same time these functions are often useful over multiple files in the
 * core and API, so we list, or at least document, all variables which are used
 * by DataTables as private variables here. This also ensures that there is no
 * clashing of variable names and that they can easily referenced for reuse.
 */


// Defined else where
//  _selector_run
//  _selector_opts
//  _selector_row_indexes

var _ext; // DataTable.ext
var _Api; // DataTable.Api
var _api_register; // DataTable.Api.register
var _api_registerPlural; // DataTable.Api.registerPlural

var _re_dic = {};
var _re_new_lines = /[\r\n\u2028]/g;
var _re_html = /<([^>]*>)/g;
var _max_str_len = Math.pow(2, 28);

// This is not strict ISO8601 - Date.parse() is quite lax, although
// implementations differ between browsers.
var _re_date = /^\d{2,4}[./-]\d{1,2}[./-]\d{1,2}([T ]{1}\d{1,2}[:.]\d{2}([.:]\d{2})?)?$/;

// Escape regular expression special characters
var _re_escape_regex = new RegExp( '(\\' + [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-' ].join('|\\') + ')', 'g' );

// https://en.wikipedia.org/wiki/Foreign_exchange_market
// - \u20BD - Russian ruble.
// - \u20a9 - South Korean Won
// - \u20BA - Turkish Lira
// - \u20B9 - Indian Rupee
// - R - Brazil (R$) and South Africa
// - fr - Swiss Franc
// - kr - Swedish krona, Norwegian krone and Danish krone
// - \u2009 is thin space and \u202F is narrow no-break space, both used in many
// - Ƀ - Bitcoin
// - Ξ - Ethereum
//   standards as thousands separators.
var _re_formatted_numeric = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi;


var _empty = function ( d ) {
	return !d || d === true || d === '-' ? true : false;
};


var _intVal = function ( s ) {
	var integer = parseInt( s, 10 );
	return !isNaN(integer) && isFinite(s) ? integer : null;
};

// Convert from a formatted number with characters other than `.` as the
// decimal place, to a Javascript number
var _numToDecimal = function ( num, decimalPoint ) {
	// Cache created regular expressions for speed as this function is called often
	if ( ! _re_dic[ decimalPoint ] ) {
		_re_dic[ decimalPoint ] = new RegExp( _fnEscapeRegex( decimalPoint ), 'g' );
	}
	return typeof num === 'string' && decimalPoint !== '.' ?
		num.replace( /\./g, '' ).replace( _re_dic[ decimalPoint ], '.' ) :
		num;
};


var _isNumber = function ( d, decimalPoint, formatted, allowEmpty ) {
	var type = typeof d;
	var strType = type === 'string';

	if ( type === 'number' || type === 'bigint') {
		return true;
	}

	// If empty return immediately so there must be a number if it is a
	// formatted string (this stops the string "k", or "kr", etc being detected
	// as a formatted number for currency
	if ( allowEmpty && _empty( d ) ) {
		return true;
	}

	if ( decimalPoint && strType ) {
		d = _numToDecimal( d, decimalPoint );
	}

	if ( formatted && strType ) {
		d = d.replace( _re_formatted_numeric, '' );
	}

	return !isNaN( parseFloat(d) ) && isFinite( d );
};


// A string without HTML in it can be considered to be HTML still
var _isHtml = function ( d ) {
	return _empty( d ) || typeof d === 'string';
};

// Is a string a number surrounded by HTML?
var _htmlNumeric = function ( d, decimalPoint, formatted, allowEmpty ) {
	if ( allowEmpty && _empty( d ) ) {
		return true;
	}

	// input and select strings mean that this isn't just a number
	if (typeof d === 'string' && d.match(/<(input|select)/i)) {
		return null;
	}

	var html = _isHtml( d );
	return ! html ?
		null :
		_isNumber( _stripHtml( d ), decimalPoint, formatted, allowEmpty ) ?
			true :
			null;
};


var _pluck = function ( a, prop, prop2 ) {
	var out = [];
	var i=0, ien=a.length;

	// Could have the test in the loop for slightly smaller code, but speed
	// is essential here
	if ( prop2 !== undefined ) {
		for ( ; i<ien ; i++ ) {
			if ( a[i] && a[i][ prop ] ) {
				out.push( a[i][ prop ][ prop2 ] );
			}
		}
	}
	else {
		for ( ; i<ien ; i++ ) {
			if ( a[i] ) {
				out.push( a[i][ prop ] );
			}
		}
	}

	return out;
};


// Basically the same as _pluck, but rather than looping over `a` we use `order`
// as the indexes to pick from `a`
var _pluck_order = function ( a, order, prop, prop2 )
{
	var out = [];
	var i=0, ien=order.length;

	// Could have the test in the loop for slightly smaller code, but speed
	// is essential here
	if ( prop2 !== undefined ) {
		for ( ; i<ien ; i++ ) {
			if ( a[ order[i] ] && a[ order[i] ][ prop ] ) {
				out.push( a[ order[i] ][ prop ][ prop2 ] );
			}
		}
	}
	else {
		for ( ; i<ien ; i++ ) {
			if ( a[ order[i] ] ) {
				out.push( a[ order[i] ][ prop ] );
			}
		}
	}

	return out;
};


var _range = function ( len, start )
{
	var out = [];
	var end;

	if ( start === undefined ) {
		start = 0;
		end = len;
	}
	else {
		end = start;
		start = len;
	}

	for ( var i=start ; i<end ; i++ ) {
		out.push( i );
	}

	return out;
};


var _removeEmpty = function ( a )
{
	var out = [];

	for ( var i=0, ien=a.length ; i<ien ; i++ ) {
		if ( a[i] ) { // careful - will remove all falsy values!
			out.push( a[i] );
		}
	}

	return out;
};

// Replaceable function in api.util
var _stripHtml = function (input) {
	if (! input || typeof input !== 'string') {
		return input;
	}

	// Irrelevant check to workaround CodeQL's false positive on the regex
	if (input.length > _max_str_len) {
		throw new Error('Exceeded max str len');
	}

	var previous;

	input = input.replace(_re_html, ''); // Complete tags

	// Safety for incomplete script tag - use do / while to ensure that
	// we get all instances
	do {
		previous = input;
		input = input.replace(/<script/i, '');
	} while (input !== previous);

	return previous;
};

// Replaceable function in api.util
var _escapeHtml = function ( d ) {
	if (Array.isArray(d)) {
		d = d.join(',');
	}

	return typeof d === 'string' ?
		d
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;') :
		d;
};

// Remove diacritics from a string by decomposing it and then removing
// non-ascii characters
var _normalize = function (str, both) {
	if (typeof str !== 'string') {
		return str;
	}

	// It is faster to just run `normalize` than it is to check if
	// we need to with a regex! (Check as it isn't available in old
	// Safari)
	var res = str.normalize
		? str.normalize("NFD")
		: str;

	// Equally, here we check if a regex is needed or not
	return res.length !== str.length
		? (both === true ? str + ' ' : '' ) + res.replace(/[\u0300-\u036f]/g, "")
		: res;
}

/**
 * Determine if all values in the array are unique. This means we can short
 * cut the _unique method at the cost of a single loop. A sorted array is used
 * to easily check the values.
 *
 * @param  {array} src Source array
 * @return {boolean} true if all unique, false otherwise
 * @ignore
 */
var _areAllUnique = function ( src ) {
	if ( src.length < 2 ) {
		return true;
	}

	var sorted = src.slice().sort();
	var last = sorted[0];

	for ( var i=1, ien=sorted.length ; i<ien ; i++ ) {
		if ( sorted[i] === last ) {
			return false;
		}

		last = sorted[i];
	}

	return true;
};


/**
 * Find the unique elements in a source array.
 *
 * @param  {array} src Source array
 * @return {array} Array of unique items
 * @ignore
 */
var _unique = function ( src )
{
	if (Array.from && Set) {
		return Array.from(new Set(src));
	}

	if ( _areAllUnique( src ) ) {
		return src.slice();
	}

	// A faster unique method is to use object keys to identify used values,
	// but this doesn't work with arrays or objects, which we must also
	// consider. See jsperf.app/compare-array-unique-versions/4 for more
	// information.
	var
		out = [],
		val,
		i, ien=src.length,
		j, k=0;

	again: for ( i=0 ; i<ien ; i++ ) {
		val = src[i];

		for ( j=0 ; j<k ; j++ ) {
			if ( out[j] === val ) {
				continue again;
			}
		}

		out.push( val );
		k++;
	}

	return out;
};

// Surprisingly this is faster than [].concat.apply
// https://jsperf.com/flatten-an-array-loop-vs-reduce/2
var _flatten = function (out, val) {
	if (Array.isArray(val)) {
		for (var i=0 ; i<val.length ; i++) {
			_flatten(out, val[i]);
		}
	}
	else {
		out.push(val);
	}

	return out;
}

// Similar to jQuery's addClass, but use classList.add
function _addClass(el, name) {
	if (name) {
		name.split(' ').forEach(function (n) {
			if (n) {
				// `add` does deduplication, so no need to check `contains`
				el.classList.add(n);
			}
		});
	}
}

/**
 * DataTables utility methods
 * 
 * This namespace provides helper methods that DataTables uses internally to
 * create a DataTable, but which are not exclusively used only for DataTables.
 * These methods can be used by extension authors to save the duplication of
 * code.
 *
 *  @namespace
 */
DataTable.util = {
	/**
	 * Return a string with diacritic characters decomposed
	 * @param {*} mixed Function or string to normalize
	 * @param {*} both Return original string and the normalized string
	 * @returns String or undefined
	 */
	diacritics: function (mixed, both) {
		var type = typeof mixed;

		if (type !== 'function') {
			return _normalize(mixed, both);
		}
		_normalize = mixed;
	},

	/**
	 * Debounce a function
	 *
	 * @param {function} fn Function to be called
	 * @param {integer} freq Call frequency in mS
	 * @return {function} Wrapped function
	 */
	debounce: function ( fn, timeout ) {
		var timer;

		return function () {
			var that = this;
			var args = arguments;

			clearTimeout(timer);

			timer = setTimeout( function () {
				fn.apply(that, args);
			}, timeout || 250 );
		};
	},

	/**
	 * Throttle the calls to a function. Arguments and context are maintained
	 * for the throttled function.
	 *
	 * @param {function} fn Function to be called
	 * @param {integer} freq Call frequency in mS
	 * @return {function} Wrapped function
	 */
	throttle: function ( fn, freq ) {
		var
			frequency = freq !== undefined ? freq : 200,
			last,
			timer;

		return function () {
			var
				that = this,
				now  = +new Date(),
				args = arguments;

			if ( last && now < last + frequency ) {
				clearTimeout( timer );

				timer = setTimeout( function () {
					last = undefined;
					fn.apply( that, args );
				}, frequency );
			}
			else {
				last = now;
				fn.apply( that, args );
			}
		};
	},

	/**
	 * Escape a string such that it can be used in a regular expression
	 *
	 *  @param {string} val string to escape
	 *  @returns {string} escaped string
	 */
	escapeRegex: function ( val ) {
		return val.replace( _re_escape_regex, '\\$1' );
	},

	/**
	 * Create a function that will write to a nested object or array
	 * @param {*} source JSON notation string
	 * @returns Write function
	 */
	set: function ( source ) {
		if ( $.isPlainObject( source ) ) {
			/* Unlike get, only the underscore (global) option is used for for
			 * setting data since we don't know the type here. This is why an object
			 * option is not documented for `mData` (which is read/write), but it is
			 * for `mRender` which is read only.
			 */
			return DataTable.util.set( source._ );
		}
		else if ( source === null ) {
			// Nothing to do when the data source is null
			return function () {};
		}
		else if ( typeof source === 'function' ) {
			return function (data, val, meta) {
				source( data, 'set', val, meta );
			};
		}
		else if (
			typeof source === 'string' && (source.indexOf('.') !== -1 ||
			source.indexOf('[') !== -1 || source.indexOf('(') !== -1)
		) {
			// Like the get, we need to get data from a nested object
			var setData = function (data, val, src) {
				var a = _fnSplitObjNotation( src ), b;
				var aLast = a[a.length-1];
				var arrayNotation, funcNotation, o, innerSrc;
	
				for ( var i=0, iLen=a.length-1 ; i<iLen ; i++ ) {
					// Protect against prototype pollution
					if (a[i] === '__proto__' || a[i] === 'constructor') {
						throw new Error('Cannot set prototype values');
					}
	
					// Check if we are dealing with an array notation request
					arrayNotation = a[i].match(__reArray);
					funcNotation = a[i].match(__reFn);
	
					if ( arrayNotation ) {
						a[i] = a[i].replace(__reArray, '');
						data[ a[i] ] = [];
	
						// Get the remainder of the nested object to set so we can recurse
						b = a.slice();
						b.splice( 0, i+1 );
						innerSrc = b.join('.');
	
						// Traverse each entry in the array setting the properties requested
						if ( Array.isArray( val ) ) {
							for ( var j=0, jLen=val.length ; j<jLen ; j++ ) {
								o = {};
								setData( o, val[j], innerSrc );
								data[ a[i] ].push( o );
							}
						}
						else {
							// We've been asked to save data to an array, but it
							// isn't array data to be saved. Best that can be done
							// is to just save the value.
							data[ a[i] ] = val;
						}
	
						// The inner call to setData has already traversed through the remainder
						// of the source and has set the data, thus we can exit here
						return;
					}
					else if ( funcNotation ) {
						// Function call
						a[i] = a[i].replace(__reFn, '');
						data = data[ a[i] ]( val );
					}
	
					// If the nested object doesn't currently exist - since we are
					// trying to set the value - create it
					if ( data[ a[i] ] === null || data[ a[i] ] === undefined ) {
						data[ a[i] ] = {};
					}
					data = data[ a[i] ];
				}
	
				// Last item in the input - i.e, the actual set
				if ( aLast.match(__reFn ) ) {
					// Function call
					data = data[ aLast.replace(__reFn, '') ]( val );
				}
				else {
					// If array notation is used, we just want to strip it and use the property name
					// and assign the value. If it isn't used, then we get the result we want anyway
					data[ aLast.replace(__reArray, '') ] = val;
				}
			};
	
			return function (data, val) { // meta is also passed in, but not used
				return setData( data, val, source );
			};
		}
		else {
			// Array or flat object mapping
			return function (data, val) { // meta is also passed in, but not used
				data[source] = val;
			};
		}
	},

	/**
	 * Create a function that will read nested objects from arrays, based on JSON notation
	 * @param {*} source JSON notation string
	 * @returns Value read
	 */
	get: function ( source ) {
		if ( $.isPlainObject( source ) ) {
			// Build an object of get functions, and wrap them in a single call
			var o = {};
			$.each( source, function (key, val) {
				if ( val ) {
					o[key] = DataTable.util.get( val );
				}
			} );
	
			return function (data, type, row, meta) {
				var t = o[type] || o._;
				return t !== undefined ?
					t(data, type, row, meta) :
					data;
			};
		}
		else if ( source === null ) {
			// Give an empty string for rendering / sorting etc
			return function (data) { // type, row and meta also passed, but not used
				return data;
			};
		}
		else if ( typeof source === 'function' ) {
			return function (data, type, row, meta) {
				return source( data, type, row, meta );
			};
		}
		else if (
			typeof source === 'string' && (source.indexOf('.') !== -1 ||
			source.indexOf('[') !== -1 || source.indexOf('(') !== -1)
		) {
			/* If there is a . in the source string then the data source is in a
			 * nested object so we loop over the data for each level to get the next
			 * level down. On each loop we test for undefined, and if found immediately
			 * return. This allows entire objects to be missing and sDefaultContent to
			 * be used if defined, rather than throwing an error
			 */
			var fetchData = function (data, type, src) {
				var arrayNotation, funcNotation, out, innerSrc;
	
				if ( src !== "" ) {
					var a = _fnSplitObjNotation( src );
	
					for ( var i=0, iLen=a.length ; i<iLen ; i++ ) {
						// Check if we are dealing with special notation
						arrayNotation = a[i].match(__reArray);
						funcNotation = a[i].match(__reFn);
	
						if ( arrayNotation ) {
							// Array notation
							a[i] = a[i].replace(__reArray, '');
	
							// Condition allows simply [] to be passed in
							if ( a[i] !== "" ) {
								data = data[ a[i] ];
							}
							out = [];
	
							// Get the remainder of the nested object to get
							a.splice( 0, i+1 );
							innerSrc = a.join('.');
	
							// Traverse each entry in the array getting the properties requested
							if ( Array.isArray( data ) ) {
								for ( var j=0, jLen=data.length ; j<jLen ; j++ ) {
									out.push( fetchData( data[j], type, innerSrc ) );
								}
							}
	
							// If a string is given in between the array notation indicators, that
							// is used to join the strings together, otherwise an array is returned
							var join = arrayNotation[0].substring(1, arrayNotation[0].length-1);
							data = (join==="") ? out : out.join(join);
	
							// The inner call to fetchData has already traversed through the remainder
							// of the source requested, so we exit from the loop
							break;
						}
						else if ( funcNotation ) {
							// Function call
							a[i] = a[i].replace(__reFn, '');
							data = data[ a[i] ]();
							continue;
						}
	
						if (data === null || data[ a[i] ] === null) {
							return null;
						}
						else if ( data === undefined || data[ a[i] ] === undefined ) {
							return undefined;
						}

						data = data[ a[i] ];
					}
				}
	
				return data;
			};
	
			return function (data, type) { // row and meta also passed, but not used
				return fetchData( data, type, source );
			};
		}
		else {
			// Array or flat object mapping
			return function (data) { // row and meta also passed, but not used
				return data[source];
			};
		}
	},

	stripHtml: function (mixed) {
		var type = typeof mixed;

		if (type === 'function') {
			_stripHtml = mixed;
			return;
		}
		else if (type === 'string') {
			return _stripHtml(mixed);
		}
		return mixed;
	},

	escapeHtml: function (mixed) {
		var type = typeof mixed;

		if (type === 'function') {
			_escapeHtml = mixed;
			return;
		}
		else if (type === 'string' || Array.isArray(mixed)) {
			return _escapeHtml(mixed);
		}
		return mixed;
	},

	unique: _unique
};



/**
 * Create a mapping object that allows camel case parameters to be looked up
 * for their Hungarian counterparts. The mapping is stored in a private
 * parameter called `_hungarianMap` which can be accessed on the source object.
 *  @param {object} o
 *  @memberof DataTable#oApi
 */
function _fnHungarianMap ( o )
{
	var
		hungarian = 'a aa ai ao as b fn i m o s ',
		match,
		newKey,
		map = {};

	$.each( o, function (key) {
		match = key.match(/^([^A-Z]+?)([A-Z])/);

		if ( match && hungarian.indexOf(match[1]+' ') !== -1 )
		{
			newKey = key.replace( match[0], match[2].toLowerCase() );
			map[ newKey ] = key;

			if ( match[1] === 'o' )
			{
				_fnHungarianMap( o[key] );
			}
		}
	} );

	o._hungarianMap = map;
}


/**
 * Convert from camel case parameters to Hungarian, based on a Hungarian map
 * created by _fnHungarianMap.
 *  @param {object} src The model object which holds all parameters that can be
 *    mapped.
 *  @param {object} user The object to convert from camel case to Hungarian.
 *  @param {boolean} force When set to `true`, properties which already have a
 *    Hungarian value in the `user` object will be overwritten. Otherwise they
 *    won't be.
 *  @memberof DataTable#oApi
 */
function _fnCamelToHungarian ( src, user, force )
{
	if ( ! src._hungarianMap ) {
		_fnHungarianMap( src );
	}

	var hungarianKey;

	$.each( user, function (key) {
		hungarianKey = src._hungarianMap[ key ];

		if ( hungarianKey !== undefined && (force || user[hungarianKey] === undefined) )
		{
			// For objects, we need to buzz down into the object to copy parameters
			if ( hungarianKey.charAt(0) === 'o' )
			{
				// Copy the camelCase options over to the hungarian
				if ( ! user[ hungarianKey ] ) {
					user[ hungarianKey ] = {};
				}
				$.extend( true, user[hungarianKey], user[key] );

				_fnCamelToHungarian( src[hungarianKey], user[hungarianKey], force );
			}
			else {
				user[hungarianKey] = user[ key ];
			}
		}
	} );
}

/**
 * Map one parameter onto another
 *  @param {object} o Object to map
 *  @param {*} knew The new parameter name
 *  @param {*} old The old parameter name
 */
var _fnCompatMap = function ( o, knew, old ) {
	if ( o[ knew ] !== undefined ) {
		o[ old ] = o[ knew ];
	}
};


/**
 * Provide backwards compatibility for the main DT options. Note that the new
 * options are mapped onto the old parameters, so this is an external interface
 * change only.
 *  @param {object} init Object to map
 */
function _fnCompatOpts ( init )
{
	_fnCompatMap( init, 'ordering',      'bSort' );
	_fnCompatMap( init, 'orderMulti',    'bSortMulti' );
	_fnCompatMap( init, 'orderClasses',  'bSortClasses' );
	_fnCompatMap( init, 'orderCellsTop', 'bSortCellsTop' );
	_fnCompatMap( init, 'order',         'aaSorting' );
	_fnCompatMap( init, 'orderFixed',    'aaSortingFixed' );
	_fnCompatMap( init, 'paging',        'bPaginate' );
	_fnCompatMap( init, 'pagingType',    'sPaginationType' );
	_fnCompatMap( init, 'pageLength',    'iDisplayLength' );
	_fnCompatMap( init, 'searching',     'bFilter' );

	// Boolean initialisation of x-scrolling
	if ( typeof init.sScrollX === 'boolean' ) {
		init.sScrollX = init.sScrollX ? '100%' : '';
	}
	if ( typeof init.scrollX === 'boolean' ) {
		init.scrollX = init.scrollX ? '100%' : '';
	}

	// Column search objects are in an array, so it needs to be converted
	// element by element
	var searchCols = init.aoSearchCols;

	if ( searchCols ) {
		for ( var i=0, ien=searchCols.length ; i<ien ; i++ ) {
			if ( searchCols[i] ) {
				_fnCamelToHungarian( DataTable.models.oSearch, searchCols[i] );
			}
		}
	}

	// Enable search delay if server-side processing is enabled
	if (init.serverSide && ! init.searchDelay) {
		init.searchDelay = 400;
	}
}


/**
 * Provide backwards compatibility for column options. Note that the new options
 * are mapped onto the old parameters, so this is an external interface change
 * only.
 *  @param {object} init Object to map
 */
function _fnCompatCols ( init )
{
	_fnCompatMap( init, 'orderable',     'bSortable' );
	_fnCompatMap( init, 'orderData',     'aDataSort' );
	_fnCompatMap( init, 'orderSequence', 'asSorting' );
	_fnCompatMap( init, 'orderDataType', 'sortDataType' );

	// orderData can be given as an integer
	var dataSort = init.aDataSort;
	if ( typeof dataSort === 'number' && ! Array.isArray( dataSort ) ) {
		init.aDataSort = [ dataSort ];
	}
}


/**
 * Browser feature detection for capabilities, quirks
 *  @param {object} settings dataTables settings object
 *  @memberof DataTable#oApi
 */
function _fnBrowserDetect( settings )
{
	// We don't need to do this every time DataTables is constructed, the values
	// calculated are specific to the browser and OS configuration which we
	// don't expect to change between initialisations
	if ( ! DataTable.__browser ) {
		var browser = {};
		DataTable.__browser = browser;

		// Scrolling feature / quirks detection
		var n = $('<div/>')
			.css( {
				position: 'fixed',
				top: 0,
				left: -1 * window.pageXOffset, // allow for scrolling
				height: 1,
				width: 1,
				overflow: 'hidden'
			} )
			.append(
				$('<div/>')
					.css( {
						position: 'absolute',
						top: 1,
						left: 1,
						width: 100,
						overflow: 'scroll'
					} )
					.append(
						$('<div/>')
							.css( {
								width: '100%',
								height: 10
							} )
					)
			)
			.appendTo( 'body' );

		var outer = n.children();
		var inner = outer.children();

		// Get scrollbar width
		browser.barWidth = outer[0].offsetWidth - outer[0].clientWidth;

		// In rtl text layout, some browsers (most, but not all) will place the
		// scrollbar on the left, rather than the right.
		browser.bScrollbarLeft = Math.round( inner.offset().left ) !== 1;

		n.remove();
	}

	$.extend( settings.oBrowser, DataTable.__browser );
	settings.oScroll.iBarWidth = DataTable.__browser.barWidth;
}

/**
 * Add a column to the list used for the table with default values
 *  @param {object} oSettings dataTables settings object
 *  @memberof DataTable#oApi
 */
function _fnAddColumn( oSettings )
{
	// Add column to aoColumns array
	var oDefaults = DataTable.defaults.column;
	var iCol = oSettings.aoColumns.length;
	var oCol = $.extend( {}, DataTable.models.oColumn, oDefaults, {
		"aDataSort": oDefaults.aDataSort ? oDefaults.aDataSort : [iCol],
		"mData": oDefaults.mData ? oDefaults.mData : iCol,
		idx: iCol,
		searchFixed: {},
		colEl: $('<col>').attr('data-dt-column', iCol)
	} );
	oSettings.aoColumns.push( oCol );

	// Add search object for column specific search. Note that the `searchCols[ iCol ]`
	// passed into extend can be undefined. This allows the user to give a default
	// with only some of the parameters defined, and also not give a default
	var searchCols = oSettings.aoPreSearchCols;
	searchCols[ iCol ] = $.extend( {}, DataTable.models.oSearch, searchCols[ iCol ] );
}


/**
 * Apply options for a column
 *  @param {object} oSettings dataTables settings object
 *  @param {int} iCol column index to consider
 *  @param {object} oOptions object with sType, bVisible and bSearchable etc
 *  @memberof DataTable#oApi
 */
function _fnColumnOptions( oSettings, iCol, oOptions )
{
	var oCol = oSettings.aoColumns[ iCol ];

	/* User specified column options */
	if ( oOptions !== undefined && oOptions !== null )
	{
		// Backwards compatibility
		_fnCompatCols( oOptions );

		// Map camel case parameters to their Hungarian counterparts
		_fnCamelToHungarian( DataTable.defaults.column, oOptions, true );

		/* Backwards compatibility for mDataProp */
		if ( oOptions.mDataProp !== undefined && !oOptions.mData )
		{
			oOptions.mData = oOptions.mDataProp;
		}

		if ( oOptions.sType )
		{
			oCol._sManualType = oOptions.sType;
		}
	
		// `class` is a reserved word in Javascript, so we need to provide
		// the ability to use a valid name for the camel case input
		if ( oOptions.className && ! oOptions.sClass )
		{
			oOptions.sClass = oOptions.className;
		}

		var origClass = oCol.sClass;

		$.extend( oCol, oOptions );
		_fnMap( oCol, oOptions, "sWidth", "sWidthOrig" );

		// Merge class from previously defined classes with this one, rather than just
		// overwriting it in the extend above
		if (origClass !== oCol.sClass) {
			oCol.sClass = origClass + ' ' + oCol.sClass;
		}

		/* iDataSort to be applied (backwards compatibility), but aDataSort will take
		 * priority if defined
		 */
		if ( oOptions.iDataSort !== undefined )
		{
			oCol.aDataSort = [ oOptions.iDataSort ];
		}
		_fnMap( oCol, oOptions, "aDataSort" );
	}

	/* Cache the data get and set functions for speed */
	var mDataSrc = oCol.mData;
	var mData = _fnGetObjectDataFn( mDataSrc );

	// The `render` option can be given as an array to access the helper rendering methods.
	// The first element is the rendering method to use, the rest are the parameters to pass
	if ( oCol.mRender && Array.isArray( oCol.mRender ) ) {
		var copy = oCol.mRender.slice();
		var name = copy.shift();

		oCol.mRender = DataTable.render[name].apply(window, copy);
	}

	oCol._render = oCol.mRender ? _fnGetObjectDataFn( oCol.mRender ) : null;

	var attrTest = function( src ) {
		return typeof src === 'string' && src.indexOf('@') !== -1;
	};
	oCol._bAttrSrc = $.isPlainObject( mDataSrc ) && (
		attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter)
	);
	oCol._setter = null;

	oCol.fnGetData = function (rowData, type, meta) {
		var innerData = mData( rowData, type, undefined, meta );

		return oCol._render && type ?
			oCol._render( innerData, type, rowData, meta ) :
			innerData;
	};
	oCol.fnSetData = function ( rowData, val, meta ) {
		return _fnSetObjectDataFn( mDataSrc )( rowData, val, meta );
	};

	// Indicate if DataTables should read DOM data as an object or array
	// Used in _fnGetRowElements
	if ( typeof mDataSrc !== 'number' && ! oCol._isArrayHost ) {
		oSettings._rowReadObject = true;
	}

	/* Feature sorting overrides column specific when off */
	if ( !oSettings.oFeatures.bSort )
	{
		oCol.bSortable = false;
	}
}


/**
 * Adjust the table column widths for new data. Note: you would probably want to
 * do a redraw after calling this function!
 *  @param {object} settings dataTables settings object
 *  @memberof DataTable#oApi
 */
function _fnAdjustColumnSizing ( settings )
{
	_fnCalculateColumnWidths( settings );
	_fnColumnSizes( settings );

	var scroll = settings.oScroll;
	if ( scroll.sY !== '' || scroll.sX !== '') {
		_fnScrollDraw( settings );
	}

	_fnCallbackFire( settings, null, 'column-sizing', [settings] );
}

/**
 * Apply column sizes
 *
 * @param {*} settings DataTables settings object
 */
function _fnColumnSizes ( settings )
{
	var cols = settings.aoColumns;

	for (var i=0 ; i<cols.length ; i++) {
		var width = _fnColumnsSumWidth(settings, [i], false, false);

		cols[i].colEl.css('width', width);
	}
}


/**
 * Convert the index of a visible column to the index in the data array (take account
 * of hidden columns)
 *  @param {object} oSettings dataTables settings object
 *  @param {int} iMatch Visible column index to lookup
 *  @returns {int} i the data index
 *  @memberof DataTable#oApi
 */
function _fnVisibleToColumnIndex( oSettings, iMatch )
{
	var aiVis = _fnGetColumns( oSettings, 'bVisible' );

	return typeof aiVis[iMatch] === 'number' ?
		aiVis[iMatch] :
		null;
}


/**
 * Convert the index of an index in the data array and convert it to the visible
 *   column index (take account of hidden columns)
 *  @param {int} iMatch Column index to lookup
 *  @param {object} oSettings dataTables settings object
 *  @returns {int} i the data index
 *  @memberof DataTable#oApi
 */
function _fnColumnIndexToVisible( oSettings, iMatch )
{
	var aiVis = _fnGetColumns( oSettings, 'bVisible' );
	var iPos = aiVis.indexOf(iMatch);

	return iPos !== -1 ? iPos : null;
}


/**
 * Get the number of visible columns
 *  @param {object} oSettings dataTables settings object
 *  @returns {int} i the number of visible columns
 *  @memberof DataTable#oApi
 */
function _fnVisbleColumns( settings )
{
	var layout = settings.aoHeader;
	var columns = settings.aoColumns;
	var vis = 0;

	if ( layout.length ) {
		for ( var i=0, ien=layout[0].length ; i<ien ; i++ ) {
			if ( columns[i].bVisible && $(layout[0][i].cell).css('display') !== 'none' ) {
				vis++;
			}
		}
	}

	return vis;
}


/**
 * Get an array of column indexes that match a given property
 *  @param {object} oSettings dataTables settings object
 *  @param {string} sParam Parameter in aoColumns to look for - typically
 *    bVisible or bSearchable
 *  @returns {array} Array of indexes with matched properties
 *  @memberof DataTable#oApi
 */
function _fnGetColumns( oSettings, sParam )
{
	var a = [];

	oSettings.aoColumns.map( function(val, i) {
		if ( val[sParam] ) {
			a.push( i );
		}
	} );

	return a;
}

/**
 * Allow the result from a type detection function to be `true` while
 * translating that into a string. Old type detection functions will
 * return the type name if it passes. An obect store would be better,
 * but not backwards compatible.
 *
 * @param {*} typeDetect Object or function for type detection
 * @param {*} res Result from the type detection function
 * @returns Type name or false
 */
function _typeResult (typeDetect, res) {
	return res === true
		? typeDetect._name
		: res;
}

/**
 * Calculate the 'type' of a column
 *  @param {object} settings dataTables settings object
 *  @memberof DataTable#oApi
 */
function _fnColumnTypes ( settings )
{
	var columns = settings.aoColumns;
	var data = settings.aoData;
	var types = DataTable.ext.type.detect;
	var i, ien, j, jen, k, ken;
	var col, detectedType, cache;

	// For each column, spin over the data type detection functions, seeing if one matches
	for ( i=0, ien=columns.length ; i<ien ; i++ ) {
		col = columns[i];
		cache = [];

		if ( ! col.sType && col._sManualType ) {
			col.sType = col._sManualType;
		}
		else if ( ! col.sType ) {
			// With SSP type detection can be unreliable and error prone, so we provide a way
			// to turn it off.
			if (! settings.typeDetect) {
				return;
			}

			for ( j=0, jen=types.length ; j<jen ; j++ ) {
				var typeDetect = types[j];

				// There can be either one, or three type detection functions
				var oneOf = typeDetect.oneOf;
				var allOf = typeDetect.allOf || typeDetect;
				var init = typeDetect.init;
				var one = false;

				detectedType = null;

				// Fast detect based on column assignment
				if (init) {
					detectedType = _typeResult(typeDetect, init(settings, col, i));

					if (detectedType) {
						col.sType = detectedType;
						break;
					}
				}

				for ( k=0, ken=data.length ; k<ken ; k++ ) {
					if (! data[k]) {
						continue;
					}

					// Use a cache array so we only need to get the type data
					// from the formatter once (when using multiple detectors)
					if ( cache[k] === undefined ) {
						cache[k] = _fnGetCellData( settings, k, i, 'type' );
					}

					// Only one data point in the column needs to match this function
					if (oneOf && ! one) {
						one = _typeResult(typeDetect, oneOf( cache[k], settings ));
					}

					// All data points need to match this function
					detectedType = _typeResult(typeDetect, allOf( cache[k], settings ));

					// If null, then this type can't apply to this column, so
					// rather than testing all cells, break out. There is an
					// exception for the last type which is `html`. We need to
					// scan all rows since it is possible to mix string and HTML
					// types
					if ( ! detectedType && j !== types.length-3 ) {
						break;
					}

					// Only a single match is needed for html type since it is
					// bottom of the pile and very similar to string - but it
					// must not be empty
					if ( detectedType === 'html' && ! _empty(cache[k]) ) {
						break;
					}
				}

				// Type is valid for all data points in the column - use this
				// type
				if ( (oneOf && one && detectedType) || (!oneOf && detectedType) ) {
					col.sType = detectedType;
					break;
				}
			}

			// Fall back - if no type was detected, always use string
			if ( ! col.sType ) {
				col.sType = 'string';
			}
		}

		// Set class names for header / footer for auto type classes
		var autoClass = _ext.type.className[col.sType];

		if (autoClass) {
			_columnAutoClass(settings.aoHeader, i, autoClass);
			_columnAutoClass(settings.aoFooter, i, autoClass);
		}

		var renderer = _ext.type.render[col.sType];

		// This can only happen once! There is no way to remove
		// a renderer. After the first time the renderer has
		// already been set so createTr will run the renderer itself.
		if (renderer && ! col._render) {
			col._render = DataTable.util.get(renderer);

			_columnAutoRender(settings, i);
		}
	}
}

/**
 * Apply an auto detected renderer to data which doesn't yet have
 * a renderer
 */
function _columnAutoRender(settings, colIdx) {
	var data = settings.aoData;

	for (var i=0 ; i<data.length ; i++) {
		if (data[i].nTr) {
			// We have to update the display here since there is no
			// invalidation check for the data
			var display = _fnGetCellData( settings, i, colIdx, 'display' );

			data[i].displayData[colIdx] = display;
			_fnWriteCell(data[i].anCells[colIdx], display);

			// No need to update sort / filter data since it has
			// been invalidated and will be re-read with the
			// renderer now applied
		}
	}
}

/**
 * Apply a class name to a column's header cells
 */
function _columnAutoClass(container, colIdx, className) {
	container.forEach(function (row) {
		if (row[colIdx] && row[colIdx].unique) {
			_addClass(row[colIdx].cell, className);
		}
	});
}

/**
 * Take the column definitions and static columns arrays and calculate how
 * they relate to column indexes. The callback function will then apply the
 * definition found for a column to a suitable configuration object.
 *  @param {object} oSettings dataTables settings object
 *  @param {array} aoColDefs The aoColumnDefs array that is to be applied
 *  @param {array} aoCols The aoColumns array that defines columns individually
 *  @param {array} headerLayout Layout for header as it was loaded
 *  @param {function} fn Callback function - takes two parameters, the calculated
 *    column index and the definition for that column.
 *  @memberof DataTable#oApi
 */
function _fnApplyColumnDefs( oSettings, aoColDefs, aoCols, headerLayout, fn )
{
	var i, iLen, j, jLen, k, kLen, def;
	var columns = oSettings.aoColumns;

	if ( aoCols ) {
		for ( i=0, iLen=aoCols.length ; i<iLen ; i++ ) {
			if (aoCols[i] && aoCols[i].name) {
				columns[i].sName = aoCols[i].name;
			}
		}
	}

	// Column definitions with aTargets
	if ( aoColDefs )
	{
		/* Loop over the definitions array - loop in reverse so first instance has priority */
		for ( i=aoColDefs.length-1 ; i>=0 ; i-- )
		{
			def = aoColDefs[i];

			/* Each definition can target multiple columns, as it is an array */
			var aTargets = def.target !== undefined
				? def.target
				: def.targets !== undefined
					? def.targets
					: def.aTargets;

			if ( ! Array.isArray( aTargets ) )
			{
				aTargets = [ aTargets ];
			}

			for ( j=0, jLen=aTargets.length ; j<jLen ; j++ )
			{
				var target = aTargets[j];

				if ( typeof target === 'number' && target >= 0 )
				{
					/* Add columns that we don't yet know about */
					while( columns.length <= target )
					{
						_fnAddColumn( oSettings );
					}

					/* Integer, basic index */
					fn( target, def );
				}
				else if ( typeof target === 'number' && target < 0 )
				{
					/* Negative integer, right to left column counting */
					fn( columns.length+target, def );
				}
				else if ( typeof target === 'string' )
				{
					for ( k=0, kLen=columns.length ; k<kLen ; k++ ) {
						if (target === '_all') {
							// Apply to all columns
							fn( k, def );
						}
						else if (target.indexOf(':name') !== -1) {
							// Column selector
							if (columns[k].sName === target.replace(':name', '')) {
								fn( k, def );
							}
						}
						else {
							// Cell selector
							headerLayout.forEach(function (row) {
								if (row[k]) {
									var cell = $(row[k].cell);

									// Legacy support. Note that it means that we don't support
									// an element name selector only, since they are treated as
									// class names for 1.x compat.
									if (target.match(/^[a-z][\w-]*$/i)) {
										target = '.' + target;
									}

									if (cell.is( target )) {
										fn( k, def );
									}
								}
							});
						}
					}
				}
			}
		}
	}

	// Statically defined columns array
	if ( aoCols ) {
		for ( i=0, iLen=aoCols.length ; i<iLen ; i++ ) {
			fn( i, aoCols[i] );
		}
	}
}


/**
 * Get the width for a given set of columns
 *
 * @param {*} settings DataTables settings object
 * @param {*} targets Columns - comma separated string or array of numbers
 * @param {*} original Use the original width (true) or calculated (false)
 * @param {*} incVisible Include visible columns (true) or not (false)
 * @returns Combined CSS value
 */
function _fnColumnsSumWidth( settings, targets, original, incVisible ) {
	if ( ! Array.isArray( targets ) ) {
		targets = _fnColumnsFromHeader( targets );
	}

	var sum = 0;
	var unit;
	var columns = settings.aoColumns;
	
	for ( var i=0, ien=targets.length ; i<ien ; i++ ) {
		var column = columns[ targets[i] ];
		var definedWidth = original ?
			column.sWidthOrig :
			column.sWidth;

		if ( ! incVisible && column.bVisible === false ) {
			continue;
		}

		if ( definedWidth === null || definedWidth === undefined ) {
			return null; // can't determine a defined width - browser defined
		}
		else if ( typeof definedWidth === 'number' ) {
			unit = 'px';
			sum += definedWidth;
		}
		else {
			var matched = definedWidth.match(/([\d\.]+)([^\d]*)/);

			if ( matched ) {
				sum += matched[1] * 1;
				unit = matched.length === 3 ?
					matched[2] :
					'px';
			}
		}
	}

	return sum + unit;
}

function _fnColumnsFromHeader( cell )
{
	var attr = $(cell).closest('[data-dt-column]').attr('data-dt-column');

	if ( ! attr ) {
		return [];
	}

	return attr.split(',').map( function (val) {
		return val * 1;
	} );
}
/**
 * Add a data array to the table, creating DOM node etc. This is the parallel to
 * _fnGatherData, but for adding rows from a Javascript source, rather than a
 * DOM source.
 *  @param {object} settings dataTables settings object
 *  @param {array} data data array to be added
 *  @param {node} [tr] TR element to add to the table - optional. If not given,
 *    DataTables will create a row automatically
 *  @param {array} [tds] Array of TD|TH elements for the row - must be given
 *    if nTr is.
 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if failed
 *  @memberof DataTable#oApi
 */
function _fnAddData ( settings, dataIn, tr, tds )
{
	/* Create the object for storing information about this new row */
	var rowIdx = settings.aoData.length;
	var rowModel = $.extend( true, {}, DataTable.models.oRow, {
		src: tr ? 'dom' : 'data',
		idx: rowIdx
	} );

	rowModel._aData = dataIn;
	settings.aoData.push( rowModel );

	var columns = settings.aoColumns;

	for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
	{
		// Invalidate the column types as the new data needs to be revalidated
		columns[i].sType = null;
	}

	/* Add to the display array */
	settings.aiDisplayMaster.push( rowIdx );

	var id = settings.rowIdFn( dataIn );
	if ( id !== undefined ) {
		settings.aIds[ id ] = rowModel;
	}

	/* Create the DOM information, or register it if already present */
	if ( tr || ! settings.oFeatures.bDeferRender )
	{
		_fnCreateTr( settings, rowIdx, tr, tds );
	}

	return rowIdx;
}


/**
 * Add one or more TR elements to the table. Generally we'd expect to
 * use this for reading data from a DOM sourced table, but it could be
 * used for an TR element. Note that if a TR is given, it is used (i.e.
 * it is not cloned).
 *  @param {object} settings dataTables settings object
 *  @param {array|node|jQuery} trs The TR element(s) to add to the table
 *  @returns {array} Array of indexes for the added rows
 *  @memberof DataTable#oApi
 */
function _fnAddTr( settings, trs )
{
	var row;

	// Allow an individual node to be passed in
	if ( ! (trs instanceof $) ) {
		trs = $(trs);
	}

	return trs.map( function (i, el) {
		row = _fnGetRowElements( settings, el );
		return _fnAddData( settings, row.data, el, row.cells );
	} );
}


/**
 * Get the data for a given cell from the internal cache, taking into account data mapping
 *  @param {object} settings dataTables settings object
 *  @param {int} rowIdx aoData row id
 *  @param {int} colIdx Column index
 *  @param {string} type data get type ('display', 'type' 'filter|search' 'sort|order')
 *  @returns {*} Cell data
 *  @memberof DataTable#oApi
 */
function _fnGetCellData( settings, rowIdx, colIdx, type )
{
	if (type === 'search') {
		type = 'filter';
	}
	else if (type === 'order') {
		type = 'sort';
	}

	var row = settings.aoData[rowIdx];

	if (! row) {
		return undefined;
	}

	var draw           = settings.iDraw;
	var col            = settings.aoColumns[colIdx];
	var rowData        = row._aData;
	var defaultContent = col.sDefaultContent;
	var cellData       = col.fnGetData( rowData, type, {
		settings: settings,
		row:      rowIdx,
		col:      colIdx
	} );

	// Allow for a node being returned for non-display types
	if (type !== 'display' && cellData && typeof cellData === 'object' && cellData.nodeName) {
		cellData = cellData.innerHTML;
	}

	if ( cellData === undefined ) {
		if ( settings.iDrawError != draw && defaultContent === null ) {
			_fnLog( settings, 0, "Requested unknown parameter "+
				(typeof col.mData=='function' ? '{function}' : "'"+col.mData+"'")+
				" for row "+rowIdx+", column "+colIdx, 4 );
			settings.iDrawError = draw;
		}
		return defaultContent;
	}

	// When the data source is null and a specific data type is requested (i.e.
	// not the original data), we can use default column data
	if ( (cellData === rowData || cellData === null) && defaultContent !== null && type !== undefined ) {
		cellData = defaultContent;
	}
	else if ( typeof cellData === 'function' ) {
		// If the data source is a function, then we run it and use the return,
		// executing in the scope of the data object (for instances)
		return cellData.call( rowData );
	}

	if ( cellData === null && type === 'display' ) {
		return '';
	}

	if ( type === 'filter' ) {
		var fomatters = DataTable.ext.type.search;

		if ( fomatters[ col.sType ] ) {
			cellData = fomatters[ col.sType ]( cellData );
		}
	}

	return cellData;
}


/**
 * Set the value for a specific cell, into the internal data cache
 *  @param {object} settings dataTables settings object
 *  @param {int} rowIdx aoData row id
 *  @param {int} colIdx Column index
 *  @param {*} val Value to set
 *  @memberof DataTable#oApi
 */
function _fnSetCellData( settings, rowIdx, colIdx, val )
{
	var col     = settings.aoColumns[colIdx];
	var rowData = settings.aoData[rowIdx]._aData;

	col.fnSetData( rowData, val, {
		settings: settings,
		row:      rowIdx,
		col:      colIdx
	}  );
}

/**
 * Write a value to a cell
 * @param {*} td Cell
 * @param {*} val Value
 */
function _fnWriteCell(td, val)
{
	if (val && typeof val === 'object' && val.nodeName) {
		$(td)
			.empty()
			.append(val);
	}
	else {
		td.innerHTML = val;
	}
}


// Private variable that is used to match action syntax in the data property object
var __reArray = /\[.*?\]$/;
var __reFn = /\(\)$/;

/**
 * Split string on periods, taking into account escaped periods
 * @param  {string} str String to split
 * @return {array} Split string
 */
function _fnSplitObjNotation( str )
{
	var parts = str.match(/(\\.|[^.])+/g) || [''];

	return parts.map( function ( s ) {
		return s.replace(/\\\./g, '.');
	} );
}


/**
 * Return a function that can be used to get data from a source object, taking
 * into account the ability to use nested objects as a source
 *  @param {string|int|function} mSource The data source for the object
 *  @returns {function} Data get function
 *  @memberof DataTable#oApi
 */
var _fnGetObjectDataFn = DataTable.util.get;


/**
 * Return a function that can be used to set data from a source object, taking
 * into account the ability to use nested objects as a source
 *  @param {string|int|function} mSource The data source for the object
 *  @returns {function} Data set function
 *  @memberof DataTable#oApi
 */
var _fnSetObjectDataFn = DataTable.util.set;


/**
 * Return an array with the full table data
 *  @param {object} oSettings dataTables settings object
 *  @returns array {array} aData Master data array
 *  @memberof DataTable#oApi
 */
function _fnGetDataMaster ( settings )
{
	return _pluck( settings.aoData, '_aData' );
}


/**
 * Nuke the table
 *  @param {object} oSettings dataTables settings object
 *  @memberof DataTable#oApi
 */
function _fnClearTable( settings )
{
	settings.aoData.length = 0;
	settings.aiDisplayMaster.length = 0;
	settings.aiDisplay.length = 0;
	settings.aIds = {};
}


/**
 * Mark cached data as invalid such that a re-read of the data will occur when
 * the cached data is next requested. Also update from the data source object.
 *
 * @param {object} settings DataTables settings object
 * @param {int}    rowIdx   Row index to invalidate
 * @param {string} [src]    Source to invalidate from: undefined, 'auto', 'dom'
 *     or 'data'
 * @param {int}    [colIdx] Column index to invalidate. If undefined the whole
 *     row will be invalidated
 * @memberof DataTable#oApi
 *
 * @todo For the modularisation of v1.11 this will need to become a callback, so
 *   the sort and filter methods can subscribe to it. That will required
 *   initialisation options for sorting, which is why it is not already baked in
 */
function _fnInvalidate( settings, rowIdx, src, colIdx )
{
	var row = settings.aoData[ rowIdx ];
	var i, ien;

	// Remove the cached data for the row
	row._aSortData = null;
	row._aFilterData = null;
	row.displayData = null;

	// Are we reading last data from DOM or the data object?
	if ( src === 'dom' || ((! src || src === 'auto') && row.src === 'dom') ) {
		// Read the data from the DOM
		row._aData = _fnGetRowElements(
				settings, row, colIdx, colIdx === undefined ? undefined : row._aData
			)
			.data;
	}
	else {
		// Reading from data object, update the DOM
		var cells = row.anCells;
		var display = _fnGetRowDisplay(settings, rowIdx);

		if ( cells ) {
			if ( colIdx !== undefined ) {
				_fnWriteCell(cells[colIdx], display[colIdx]);
			}
			else {
				for ( i=0, ien=cells.length ; i<ien ; i++ ) {
					_fnWriteCell(cells[i], display[i]);
				}
			}
		}
	}

	// Column specific invalidation
	var cols = settings.aoColumns;
	if ( colIdx !== undefined ) {
		// Type - the data might have changed
		cols[ colIdx ].sType = null;

		// Max length string. Its a fairly cheep recalculation, so not worth
		// something more complicated
		cols[ colIdx ].maxLenString = null;
	}
	else {
		for ( i=0, ien=cols.length ; i<ien ; i++ ) {
			cols[i].sType = null;
			cols[i].maxLenString = null;
		}

		// Update DataTables special `DT_*` attributes for the row
		_fnRowAttributes( settings, row );
	}
}


/**
 * Build a data source object from an HTML row, reading the contents of the
 * cells that are in the row.
 *
 * @param {object} settings DataTables settings object
 * @param {node|object} TR element from which to read data or existing row
 *   object from which to re-read the data from the cells
 * @param {int} [colIdx] Optional column index
 * @param {array|object} [d] Data source object. If `colIdx` is given then this
 *   parameter should also be given and will be used to write the data into.
 *   Only the column in question will be written
 * @returns {object} Object with two parameters: `data` the data read, in
 *   document order, and `cells` and array of nodes (they can be useful to the
 *   caller, so rather than needing a second traversal to get them, just return
 *   them from here).
 * @memberof DataTable#oApi
 */
function _fnGetRowElements( settings, row, colIdx, d )
{
	var
		tds = [],
		td = row.firstChild,
		name, col, i=0, contents,
		columns = settings.aoColumns,
		objectRead = settings._rowReadObject;

	// Allow the data object to be passed in, or construct
	d = d !== undefined ?
		d :
		objectRead ?
			{} :
			[];

	var attr = function ( str, td  ) {
		if ( typeof str === 'string' ) {
			var idx = str.indexOf('@');

			if ( idx !== -1 ) {
				var attr = str.substring( idx+1 );
				var setter = _fnSetObjectDataFn( str );
				setter( d, td.getAttribute( attr ) );
			}
		}
	};

	// Read data from a cell and store into the data object
	var cellProcess = function ( cell ) {
		if ( colIdx === undefined || colIdx === i ) {
			col = columns[i];
			contents = (cell.innerHTML).trim();

			if ( col && col._bAttrSrc ) {
				var setter = _fnSetObjectDataFn( col.mData._ );
				setter( d, contents );

				attr( col.mData.sort, cell );
				attr( col.mData.type, cell );
				attr( col.mData.filter, cell );
			}
			else {
				// Depending on the `data` option for the columns the data can
				// be read to either an object or an array.
				if ( objectRead ) {
					if ( ! col._setter ) {
						// Cache the setter function
						col._setter = _fnSetObjectDataFn( col.mData );
					}
					col._setter( d, contents );
				}
				else {
					d[i] = contents;
				}
			}
		}

		i++;
	};

	if ( td ) {
		// `tr` element was passed in
		while ( td ) {
			name = td.nodeName.toUpperCase();

			if ( name == "TD" || name == "TH" ) {
				cellProcess( td );
				tds.push( td );
			}

			td = td.nextSibling;
		}
	}
	else {
		// Existing row object passed in
		tds = row.anCells;

		for ( var j=0, jen=tds.length ; j<jen ; j++ ) {
			cellProcess( tds[j] );
		}
	}

	// Read the ID from the DOM if present
	var rowNode = row.firstChild ? row : row.nTr;

	if ( rowNode ) {
		var id = rowNode.getAttribute( 'id' );

		if ( id ) {
			_fnSetObjectDataFn( settings.rowId )( d, id );
		}
	}

	return {
		data: d,
		cells: tds
	};
}

/**
 * Render and cache a row's display data for the columns, if required
 * @returns 
 */
function _fnGetRowDisplay (settings, rowIdx) {
	var rowModal = settings.aoData[rowIdx];
	var columns = settings.aoColumns;

	if (! rowModal.displayData) {
		// Need to render and cache
		rowModal.displayData = [];
	
		for ( var colIdx=0, len=columns.length ; colIdx<len ; colIdx++ ) {
			rowModal.displayData.push(
				_fnGetCellData( settings, rowIdx, colIdx, 'display' )
			);
		}
	}

	return rowModal.displayData;
}

/**
 * Create a new TR element (and it's TD children) for a row
 *  @param {object} oSettings dataTables settings object
 *  @param {int} iRow Row to consider
 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given,
 *    DataTables will create a row automatically
 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
 *    if nTr is.
 *  @memberof DataTable#oApi
 */
function _fnCreateTr ( oSettings, iRow, nTrIn, anTds )
{
	var
		row = oSettings.aoData[iRow],
		rowData = row._aData,
		cells = [],
		nTr, nTd, oCol,
		i, iLen, create,
		trClass = oSettings.oClasses.tbody.row;

	if ( row.nTr === null )
	{
		nTr = nTrIn || document.createElement('tr');

		row.nTr = nTr;
		row.anCells = cells;

		_addClass(nTr, trClass);

		/* Use a private property on the node to allow reserve mapping from the node
		 * to the aoData array for fast look up
		 */
		nTr._DT_RowIndex = iRow;

		/* Special parameters can be given by the data source to be used on the row */
		_fnRowAttributes( oSettings, row );

		/* Process each column */
		for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
		{
			oCol = oSettings.aoColumns[i];
			create = nTrIn && anTds[i] ? false : true;

			nTd = create ? document.createElement( oCol.sCellType ) : anTds[i];

			if (! nTd) {
				_fnLog( oSettings, 0, 'Incorrect column count', 18 );
			}

			nTd._DT_CellIndex = {
				row: iRow,
				column: i
			};
			
			cells.push( nTd );
			
			var display = _fnGetRowDisplay(oSettings, iRow);

			// Need to create the HTML if new, or if a rendering function is defined
			if (
				create ||
				(
					(oCol.mRender || oCol.mData !== i) &&
					(!$.isPlainObject(oCol.mData) || oCol.mData._ !== i+'.display')
				)
			) {
				_fnWriteCell(nTd, display[i]);
			}

			// column class
			_addClass(nTd, oCol.sClass);

			// Visibility - add or remove as required
			if ( oCol.bVisible && create )
			{
				nTr.appendChild( nTd );
			}
			else if ( ! oCol.bVisible && ! create )
			{
				nTd.parentNode.removeChild( nTd );
			}

			if ( oCol.fnCreatedCell )
			{
				oCol.fnCreatedCell.call( oSettings.oInstance,
					nTd, _fnGetCellData( oSettings, iRow, i ), rowData, iRow, i
				);
			}
		}

		_fnCallbackFire( oSettings, 'aoRowCreatedCallback', 'row-created', [nTr, rowData, iRow, cells] );
	}
	else {
		_addClass(row.nTr, trClass);
	}
}


/**
 * Add attributes to a row based on the special `DT_*` parameters in a data
 * source object.
 *  @param {object} settings DataTables settings object
 *  @param {object} DataTables row object for the row to be modified
 *  @memberof DataTable#oApi
 */
function _fnRowAttributes( settings, row )
{
	var tr = row.nTr;
	var data = row._aData;

	if ( tr ) {
		var id = settings.rowIdFn( data );

		if ( id ) {
			tr.id = id;
		}

		if ( data.DT_RowClass ) {
			// Remove any classes added by DT_RowClass before
			var a = data.DT_RowClass.split(' ');
			row.__rowc = row.__rowc ?
				_unique( row.__rowc.concat( a ) ) :
				a;

			$(tr)
				.removeClass( row.__rowc.join(' ') )
				.addClass( data.DT_RowClass );
		}

		if ( data.DT_RowAttr ) {
			$(tr).attr( data.DT_RowAttr );
		}

		if ( data.DT_RowData ) {
			$(tr).data( data.DT_RowData );
		}
	}
}


/**
 * Create the HTML header for the table
 *  @param {object} oSettings dataTables settings object
 *  @memberof DataTable#oApi
 */
function _fnBuildHead( settings, side )
{
	var classes = settings.oClasses;
	var columns = settings.aoColumns;
	var i, ien, row;
	var target = side === 'header'
		? settings.nTHead
		: settings.nTFoot;
	var titleProp = side === 'header' ? 'sTitle' : side;

	// Footer might be defined
	if (! target) {
		return;
	}

	// If no cells yet and we have content for them, then create
	if (side === 'header' || _pluck(settings.aoColumns, titleProp).join('')) {
		row = $('tr', target);

		// Add a row if needed
		if (! row.length) {
			row = $('<tr/>').appendTo(target)
		}

		// Add the number of cells needed to make up to the number of columns
		if (row.length === 1) {
			var cells = $('td, th', row);

			for ( i=cells.length, ien=columns.length ; i<ien ; i++ ) {
				$('<th/>')
					.html( columns[i][titleProp] || '' )
					.appendTo( row );
			}
		}
	}

	var detected = _fnDetectHeader( settings, target, true );

	if (side === 'header') {
		settings.aoHeader = detected;
	}
	else {
		settings.aoFooter = detected;
	}

	// Every cell needs to be passed through the renderer
	$(target).children('tr').children('th, td')
		.each( function () {
			_fnRenderer( settings, side )(
				settings, $(this), classes
			);
		} );
}

/**
 * Build a layout structure for a header or footer
 *
 * @param {*} settings DataTables settings
 * @param {*} source Source layout array
 * @param {*} incColumns What columns should be included
 * @returns Layout array
 */
function _fnHeaderLayout( settings, source, incColumns )
{
	var row, column, cell;
	var local = [];
	var structure = [];
	var columns = settings.aoColumns;
	var columnCount = columns.length;
	var rowspan, colspan;

	if ( ! source ) {
		return;
	}

	// Default is to work on only visible columns
	if ( ! incColumns ) {
		incColumns = _range(columnCount)
			.filter(function (idx) {
				return columns[idx].bVisible;
			});
	}

	// Make a copy of the master layout array, but with only the columns we want
	for ( row=0 ; row<source.length ; row++ ) {
		// Remove any columns we haven't selected
		local[row] = source[row].slice().filter(function (cell, i) {
			return incColumns.includes(i);
		});

		// Prep the structure array - it needs an element for each row
		structure.push( [] );
	}

	for ( row=0 ; row<local.length ; row++ ) {
		for ( column=0 ; column<local[row].length ; column++ ) {
			rowspan = 1;
			colspan = 1;

			// Check to see if there is already a cell (row/colspan) covering our target
			// insert point. If there is, then there is nothing to do.
			if ( structure[row][column] === undefined ) {
				cell = local[row][column].cell;

				// Expand for rowspan
				while (
					local[row+rowspan] !== undefined &&
					local[row][column].cell == local[row+rowspan][column].cell
				) {
					structure[row+rowspan][column] = null;
					rowspan++;
				}

				// And for colspan
				while (
					local[row][column+colspan] !== undefined &&
					local[row][column].cell == local[row][column+colspan].cell
				) {
					// Which also needs to go over rows
					for ( var k=0 ; k<rowspan ; k++ ) {
						structure[row+k][column+colspan] = null;
					}

					colspan++;
				}

				var titleSpan = $('span.dt-column-title', cell);

				structure[row][column] = {
					cell: cell,
					colspan: colspan,
					rowspan: rowspan,
					title: titleSpan.length
						? titleSpan.html()
						: $(cell).html()
				};
			}
		}
	}

	return structure;
}


/**
 * Draw the header (or footer) element based on the column visibility states.
 *
 *  @param object oSettings dataTables settings object
 *  @param array aoSource Layout array from _fnDetectHeader
 *  @memberof DataTable#oApi
 */
function _fnDrawHead( settings, source )
{
	var layout = _fnHeaderLayout(settings, source);
	var tr, n;

	for ( var row=0 ; row<source.length ; row++ ) {
		tr = source[row].row;

		// All cells are going to be replaced, so empty out the row
		// Can't use $().empty() as that kills event handlers
		if (tr) {
			while( (n = tr.firstChild) ) {
				tr.removeChild( n );
			}
		}

		for ( var column=0 ; column<layout[row].length ; column++ ) {
			var point = layout[row][column];

			if (point) {
				$(point.cell)
					.appendTo(tr)
					.attr('rowspan', point.rowspan)
					.attr('colspan', point.colspan);
			}
		}
	}
}


/**
 * Insert the required TR nodes into the table for display
 *  @param {object} oSettings dataTables settings object
 *  @param ajaxComplete true after ajax call to complete rendering
 *  @memberof DataTable#oApi
 */
function _fnDraw( oSettings, ajaxComplete )
{
	// Allow for state saving and a custom start position
	_fnStart( oSettings );

	/* Provide a pre-callback function which can be used to cancel the draw is false is returned */
	var aPreDraw = _fnCallbackFire( oSettings, 'aoPreDrawCallback', 'preDraw', [oSettings] );
	if ( aPreDraw.indexOf(false) !== -1 )
	{
		_fnProcessingDisplay( oSettings, false );
		return;
	}

	var anRows = [];
	var iRowCount = 0;
	var bServerSide = _fnDataSource( oSettings ) == 'ssp';
	var aiDisplay = oSettings.aiDisplay;
	var iDisplayStart = oSettings._iDisplayStart;
	var iDisplayEnd = oSettings.fnDisplayEnd();
	var columns = oSettings.aoColumns;
	var body = $(oSettings.nTBody);

	oSettings.bDrawing = true;

	/* Server-side processing draw intercept */
	if ( oSettings.deferLoading )
	{
		oSettings.deferLoading = false;
		oSettings.iDraw++;
		_fnProcessingDisplay( oSettings, false );
	}
	else if ( !bServerSide )
	{
		oSettings.iDraw++;
	}
	else if ( !oSettings.bDestroying && !ajaxComplete)
	{
		// Show loading message for server-side processing
		if (oSettings.iDraw === 0) {
			body.empty().append(_emptyRow(oSettings));
		}

		_fnAjaxUpdate( oSettings );
		return;
	}

	if ( aiDisplay.length !== 0 )
	{
		var iStart = bServerSide ? 0 : iDisplayStart;
		var iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd;

		for ( var j=iStart ; j<iEnd ; j++ )
		{
			var iDataIndex = aiDisplay[j];
			var aoData = oSettings.aoData[ iDataIndex ];
			if ( aoData.nTr === null )
			{
				_fnCreateTr( oSettings, iDataIndex );
			}

			var nRow = aoData.nTr;

			// Add various classes as needed
			for (var i=0 ; i<columns.length ; i++) {
				var col = columns[i];
				var td = aoData.anCells[i];

				_addClass(td, _ext.type.className[col.sType]); // auto class
				_addClass(td, oSettings.oClasses.tbody.cell); // all cells
			}

			// Row callback functions - might want to manipulate the row
			// iRowCount and j are not currently documented. Are they at all
			// useful?
			_fnCallbackFire( oSettings, 'aoRowCallback', null,
				[nRow, aoData._aData, iRowCount, j, iDataIndex] );

			anRows.push( nRow );
			iRowCount++;
		}
	}
	else
	{
		anRows[ 0 ] = _emptyRow(oSettings);
	}

	/* Header and footer callbacks */
	_fnCallbackFire( oSettings, 'aoHeaderCallback', 'header', [ $(oSettings.nTHead).children('tr')[0],
		_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );

	_fnCallbackFire( oSettings, 'aoFooterCallback', 'footer', [ $(oSettings.nTFoot).children('tr')[0],
		_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );

	// replaceChildren is faster, but only became widespread in 2020,
	// so a fall back in jQuery is provided for older browsers.
	if (body[0].replaceChildren) {
		body[0].replaceChildren.apply(body[0], anRows);
	}
	else {
		body.children().detach();
		body.append( $(anRows) );
	}

	// Empty table needs a specific class
	$(oSettings.nTableWrapper).toggleClass('dt-empty-footer', $('tr', oSettings.nTFoot).length === 0);

	/* Call all required callback functions for the end of a draw */
	_fnCallbackFire( oSettings, 'aoDrawCallback', 'draw', [oSettings], true );

	/* Draw is complete, sorting and filtering must be as well */
	oSettings.bSorted = false;
	oSettings.bFiltered = false;
	oSettings.bDrawing = false;
}


/**
 * Redraw the table - taking account of the various features which are enabled
 *  @param {object} oSettings dataTables settings object
 *  @param {boolean} [holdPosition] Keep the current paging position. By default
 *    the paging is reset to the first page
 *  @memberof DataTable#oApi
 */
function _fnReDraw( settings, holdPosition, recompute )
{
	var
		features = settings.oFeatures,
		sort     = features.bSort,
		filter   = features.bFilter;

	if (recompute === undefined || recompute === true) {
		// Resolve any column types that are unknown due to addition or invalidation
		_fnColumnTypes( settings );

		if ( sort ) {
			_fnSort( settings );
		}

		if ( filter ) {
			_fnFilterComplete( settings, settings.oPreviousSearch );
		}
		else {
			// No filtering, so we want to just use the display master
			settings.aiDisplay = settings.aiDisplayMaster.slice();
		}
	}

	if ( holdPosition !== true ) {
		settings._iDisplayStart = 0;
	}

	// Let any modules know about the draw hold position state (used by
	// scrolling internally)
	settings._drawHold = holdPosition;

	_fnDraw( settings );

	settings._drawHold = false;
}


/*
 * Table is empty - create a row with an empty message in it
 */
function _emptyRow ( settings ) {
	var oLang = settings.oLanguage;
	var zero = oLang.sZeroRecords;
	var dataSrc = _fnDataSource( settings );

	if (
		(settings.iDraw < 1 && dataSrc === 'ssp') ||
		(settings.iDraw <= 1 && dataSrc === 'ajax')
	) {
		zero = oLang.sLoadingRecords;
	}
	else if ( oLang.sEmptyTable && settings.fnRecordsTotal() === 0 )
	{
		zero = oLang.sEmptyTable;
	}

	return $( '<tr/>' )
		.append( $('<td />', {
			'colSpan': _fnVisbleColumns( settings ),
			'class':   settings.oClasses.empty.row
		} ).html( zero ) )[0];
}


/**
 * Expand the layout items into an object for the rendering function
 */
function _layoutItems (row, align, items) {
	if ( Array.isArray(items)) {
		for (var i=0 ; i<items.length ; i++) {
			_layoutItems(row, align, items[i]);
		}

		return;
	}

	var rowCell = row[align];

	// If it is an object, then there can be multiple features contained in it
	if ( $.isPlainObject( items ) ) {
		// A feature plugin cannot be named "features" due to this check
		if (items.features) {
			if (items.rowId) {
				row.id = items.rowId;
			}
			if (items.rowClass) {
				row.className = items.rowClass;
			}

			rowCell.id = items.id;
			rowCell.className = items.className;

			_layoutItems(row, align, items.features);
		}
		else {
			Object.keys(items).map(function (key) {
				rowCell.contents.push( {
					feature: key,
					opts: items[key]
				});
			});
		}
	}
	else {
		rowCell.contents.push(items);
	}
}

/**
 * Find, or create a layout row
 */
function _layoutGetRow(rows, rowNum, align) {
	var row;

	// Find existing rows
	for (var i=0; i<rows.length; i++) {
		row = rows[i];

		if (row.rowNum === rowNum) {
			// full is on its own, but start and end share a row
			if (
				(align === 'full' && row.full) ||
				((align === 'start' || align === 'end') && (row.start || row.end))
			) {
				if (! row[align]) {
					row[align] = {
						contents: []
					};
				}

				return row;
			}
		}
	}

	// If we get this far, then there was no match, create a new row
	row = {
		rowNum: rowNum	
	};

	row[align] = {
		contents: []
	};

	rows.push(row);

	return row;
}

/**
 * Convert a `layout` object given by a user to the object structure needed
 * for the renderer. This is done twice, once for above and once for below
 * the table. Ordering must also be considered.
 *
 * @param {*} settings DataTables settings object
 * @param {*} layout Layout object to convert
 * @param {string} side `top` or `bottom`
 * @returns Converted array structure - one item for each row.
 */
function _layoutArray ( settings, layout, side ) {
	var rows = [];
	
	// Split out into an array
	$.each( layout, function ( pos, items ) {
		if (items === null) {
			return;
		}

		var parts = pos.match(/^([a-z]+)([0-9]*)([A-Za-z]*)$/);
		var rowNum = parts[2]
			? parts[2] * 1
			: 0;
		var align = parts[3]
			? parts[3].toLowerCase()
			: 'full';

		// Filter out the side we aren't interested in
		if (parts[1] !== side) {
			return;
		}

		// Get or create the row we should attach to
		var row = _layoutGetRow(rows, rowNum, align);

		_layoutItems(row, align, items);
	});

	// Order by item identifier
	rows.sort( function ( a, b ) {
		var order1 = a.rowNum;
		var order2 = b.rowNum;

		// If both in the same row, then the row with `full` comes first
		if (order1 === order2) {
			var ret = a.full && ! b.full ? -1 : 1;

			return side === 'bottom'
				? ret * -1
				: ret;
		}

		return order2 - order1;
	} );

	// Invert for below the table
	if ( side === 'bottom' ) {
		rows.reverse();
	}

	for (var row = 0; row<rows.length; row++) {
		delete rows[row].rowNum;

		_layoutResolve(settings, rows[row]);
	}

	return rows;
}


/**
 * Convert the contents of a row's layout object to nodes that can be inserted
 * into the document by a renderer. Execute functions, look up plug-ins, etc.
 *
 * @param {*} settings DataTables settings object
 * @param {*} row Layout object for this row
 */
function _layoutResolve( settings, row ) {
	var getFeature = function (feature, opts) {
		if ( ! _ext.features[ feature ] ) {
			_fnLog( settings, 0, 'Unknown feature: '+ feature );
		}

		return _ext.features[ feature ].apply( this, [settings, opts] );
	};

	var resolve = function ( item ) {
		if (! row[ item ]) {
			return;
		}

		var line = row[ item ].contents;

		for ( var i=0, ien=line.length ; i<ien ; i++ ) {
			if ( ! line[i] ) {
				continue;
			}
			else if ( typeof line[i] === 'string' ) {
				line[i] = getFeature( line[i], null );
			}
			else if ( $.isPlainObject(line[i]) ) {
				// If it's an object, it just has feature and opts properties from
				// the transform in _layoutArray
				line[i] = getFeature(line[i].feature, line[i].opts);
			}
			else if ( typeof line[i].node === 'function' ) {
				line[i] = line[i].node( settings );
			}
			else if ( typeof line[i] === 'function' ) {
				var inst = line[i]( settings );

				line[i] = typeof inst.node === 'function' ?
					inst.node() :
					inst;
			}
		}
	};

	resolve('start');
	resolve('end');
	resolve('full');
}


/**
 * Add the options to the page HTML for the table
 *  @param {object} settings DataTables settings object
 *  @memberof DataTable#oApi
 */
function _fnAddOptionsHtml ( settings )
{
	var classes = settings.oClasses;
	var table = $(settings.nTable);

	// Wrapper div around everything DataTables controls
	var insert = $('<div/>')
		.attr({
			id:      settings.sTableId+'_wrapper',
			'class': classes.container
		})
		.insertBefore(table);

	settings.nTableWrapper = insert[0];

	if (settings.sDom) {
		// Legacy
		_fnLayoutDom(settings, settings.sDom, insert);
	}
	else {
		var top = _layoutArray( settings, settings.layout, 'top' );
		var bottom = _layoutArray( settings, settings.layout, 'bottom' );
		var renderer = _fnRenderer( settings, 'layout' );
	
		// Everything above - the renderer will actually insert the contents into the document
		top.forEach(function (item) {
			renderer( settings, insert, item );
		});

		// The table - always the center of attention
		renderer( settings, insert, {
			full: {
				table: true,
				contents: [ _fnFeatureHtmlTable(settings) ]
			}
		} );

		// Everything below
		bottom.forEach(function (item) {
			renderer( settings, insert, item );
		});
	}

	// Processing floats on top, so it isn't an inserted feature
	_processingHtml( settings );
}

/**
 * Draw the table with the legacy DOM property
 * @param {*} settings DT settings object
 * @param {*} dom DOM string
 * @param {*} insert Insert point
 */
function _fnLayoutDom( settings, dom, insert )
{
	var parts = dom.match(/(".*?")|('.*?')|./g);
	var featureNode, option, newNode, next, attr;

	for ( var i=0 ; i<parts.length ; i++ ) {
		featureNode = null;
		option = parts[i];

		if ( option == '<' ) {
			// New container div
			newNode = $('<div/>');

			// Check to see if we should append an id and/or a class name to the container
			next = parts[i+1];

			if ( next[0] == "'" || next[0] == '"' ) {
				attr = next.replace(/['"]/g, '');

				var id = '', className;

				/* The attribute can be in the format of "#id.class", "#id" or "class" This logic
				 * breaks the string into parts and applies them as needed
				 */
				if ( attr.indexOf('.') != -1 ) {
					var split = attr.split('.');

					id = split[0];
					className = split[1];
				}
				else if ( attr[0] == "#" ) {
					id = attr;
				}
				else {
					className = attr;
				}

				newNode
					.attr('id', id.substring(1))
					.addClass(className);

				i++; // Move along the position array
			}

			insert.append( newNode );
			insert = newNode;
		}
		else if ( option == '>' ) {
			// End container div
			insert = insert.parent();
		}
		else if ( option == 't' ) {
			// Table
			featureNode = _fnFeatureHtmlTable( settings );
		}
		else
		{
			DataTable.ext.feature.forEach(function(feature) {
				if ( option == feature.cFeature ) {
					featureNode = feature.fnInit( settings );
				}
			});
		}

		// Add to the display
		if ( featureNode ) {
			insert.append( featureNode );
		}
	}
}


/**
 * Use the DOM source to create up an array of header cells. The idea here is to
 * create a layout grid (array) of rows x columns, which contains a reference
 * to the cell that that point in the grid (regardless of col/rowspan), such that
 * any column / row could be removed and the new grid constructed
 *  @param {node} thead The header/footer element for the table
 *  @returns {array} Calculated layout array
 *  @memberof DataTable#oApi
 */
function _fnDetectHeader ( settings, thead, write )
{
	var columns = settings.aoColumns;
	var rows = $(thead).children('tr');
	var row, cell;
	var i, k, l, iLen, shifted, column, colspan, rowspan;
	var isHeader = thead && thead.nodeName.toLowerCase() === 'thead';
	var layout = [];
	var unique;
	var shift = function ( a, i, j ) {
		var k = a[i];
		while ( k[j] ) {
			j++;
		}
		return j;
	};

	// We know how many rows there are in the layout - so prep it
	for ( i=0, iLen=rows.length ; i<iLen ; i++ ) {
		layout.push( [] );
	}

	for ( i=0, iLen=rows.length ; i<iLen ; i++ ) {
		row = rows[i];
		column = 0;

		// For every cell in the row..
		cell = row.firstChild;
		while ( cell ) {
			if (
				cell.nodeName.toUpperCase() == 'TD' ||
				cell.nodeName.toUpperCase() == 'TH'
			) {
				var cols = [];

				// Get the col and rowspan attributes from the DOM and sanitise them
				colspan = cell.getAttribute('colspan') * 1;
				rowspan = cell.getAttribute('rowspan') * 1;
				colspan = (!colspan || colspan===0 || colspan===1) ? 1 : colspan;
				rowspan = (!rowspan || rowspan===0 || rowspan===1) ? 1 : rowspan;

				// There might be colspan cells already in this row, so shift our target
				// accordingly
				shifted = shift( layout, i, column );

				// Cache calculation for unique columns
				unique = colspan === 1 ?
					true :
					false;
				
				// Perform header setup
				if ( write ) {
					if (unique) {
						// Allow column options to be set from HTML attributes
						_fnColumnOptions( settings, shifted, $(cell).data() );
						
						// Get the width for the column. This can be defined from the
						// width attribute, style attribute or `columns.width` option
						var columnDef = columns[shifted];
						var width = cell.getAttribute('width') || null;
						var t = cell.style.width.match(/width:\s*(\d+[pxem%]+)/);
						if ( t ) {
							width = t[1];
						}

						columnDef.sWidthOrig = columnDef.sWidth || width;

						if (isHeader) {
							// Column title handling - can be user set, or read from the DOM
							// This happens before the render, so the original is still in place
							if ( columnDef.sTitle !== null && ! columnDef.autoTitle ) {
								cell.innerHTML = columnDef.sTitle;
							}

							if (! columnDef.sTitle && unique) {
								columnDef.sTitle = _stripHtml(cell.innerHTML);
								columnDef.autoTitle = true;
							}
						}
						else {
							// Footer specific operations
							if (columnDef.footer) {
								cell.innerHTML = columnDef.footer;
							}
						}

						// Fall back to the aria-label attribute on the table header if no ariaTitle is
						// provided.
						if (! columnDef.ariaTitle) {
							columnDef.ariaTitle = $(cell).attr("aria-label") || columnDef.sTitle;
						}

						// Column specific class names
						if ( columnDef.className ) {
							$(cell).addClass( columnDef.className );
						}
					}

					// Wrap the column title so we can write to it in future
					if ( $('span.dt-column-title', cell).length === 0) {
						$('<span>')
							.addClass('dt-column-title')
							.append(cell.childNodes)
							.appendTo(cell);
					}

					if ( isHeader && $('span.dt-column-order', cell).length === 0) {
						$('<span>')
							.addClass('dt-column-order')
							.appendTo(cell);
					}
				}

				// If there is col / rowspan, copy the information into the layout grid
				for ( l=0 ; l<colspan ; l++ ) {
					for ( k=0 ; k<rowspan ; k++ ) {
						layout[i+k][shifted+l] = {
							cell: cell,
							unique: unique
						};

						layout[i+k].row = row;
					}

					cols.push( shifted+l );
				}

				// Assign an attribute so spanning cells can still be identified
				// as belonging to a column
				cell.setAttribute('data-dt-column', _unique(cols).join(','));
			}

			cell = cell.nextSibling;
		}
	}

	return layout;
}

/**
 * Set the start position for draw
 *  @param {object} oSettings dataTables settings object
 */
function _fnStart( oSettings )
{
	var bServerSide = _fnDataSource( oSettings ) == 'ssp';
	var iInitDisplayStart = oSettings.iInitDisplayStart;

	// Check and see if we have an initial draw position from state saving
	if ( iInitDisplayStart !== undefined && iInitDisplayStart !== -1 )
	{
		oSettings._iDisplayStart = bServerSide ?
			iInitDisplayStart :
			iInitDisplayStart >= oSettings.fnRecordsDisplay() ?
				0 :
				iInitDisplayStart;

		oSettings.iInitDisplayStart = -1;
	}
}

/**
 * Create an Ajax call based on the table's settings, taking into account that
 * parameters can have multiple forms, and backwards compatibility.
 *
 * @param {object} oSettings dataTables settings object
 * @param {array} data Data to send to the server, required by
 *     DataTables - may be augmented by developer callbacks
 * @param {function} fn Callback function to run when data is obtained
 */
function _fnBuildAjax( oSettings, data, fn )
{
	var ajaxData;
	var ajax = oSettings.ajax;
	var instance = oSettings.oInstance;
	var callback = function ( json ) {
		var status = oSettings.jqXHR
			? oSettings.jqXHR.status
			: null;

		if ( json === null || (typeof status === 'number' && status == 204 ) ) {
			json = {};
			_fnAjaxDataSrc( oSettings, json, [] );
		}

		var error = json.error || json.sError;
		if ( error ) {
			_fnLog( oSettings, 0, error );
		}

		// Microsoft often wrap JSON as a string in another JSON object
		// Let's handle that automatically
		if (json.d && typeof json.d === 'string') {
			try {
				json = JSON.parse(json.d);
			}
			catch (e) {
				// noop
			}
		}

		oSettings.json = json;

		_fnCallbackFire( oSettings, null, 'xhr', [oSettings, json, oSettings.jqXHR], true );
		fn( json );
	};

	if ( $.isPlainObject( ajax ) && ajax.data )
	{
		ajaxData = ajax.data;

		var newData = typeof ajaxData === 'function' ?
			ajaxData( data, oSettings ) :  // fn can manipulate data or return
			ajaxData;                      // an object object or array to merge

		// If the function returned something, use that alone
		data = typeof ajaxData === 'function' && newData ?
			newData :
			$.extend( true, data, newData );

		// Remove the data property as we've resolved it already and don't want
		// jQuery to do it again (it is restored at the end of the function)
		delete ajax.data;
	}

	var baseAjax = {
		"url": typeof ajax === 'string' ?
			ajax :
			'',
		"data": data,
		"success": callback,
		"dataType": "json",
		"cache": false,
		"type": oSettings.sServerMethod,
		"error": function (xhr, error) {
			var ret = _fnCallbackFire( oSettings, null, 'xhr', [oSettings, null, oSettings.jqXHR], true );

			if ( ret.indexOf(true) === -1 ) {
				if ( error == "parsererror" ) {
					_fnLog( oSettings, 0, 'Invalid JSON response', 1 );
				}
				else if ( xhr.readyState === 4 ) {
					_fnLog( oSettings, 0, 'Ajax error', 7 );
				}
			}

			_fnProcessingDisplay( oSettings, false );
		}
	};

	// If `ajax` option is an object, extend and override our default base
	if ( $.isPlainObject( ajax ) ) {
		$.extend( baseAjax, ajax )
	}

	// Store the data submitted for the API
	oSettings.oAjaxData = data;

	// Allow plug-ins and external processes to modify the data
	_fnCallbackFire( oSettings, null, 'preXhr', [oSettings, data, baseAjax], true );

	if ( typeof ajax === 'function' )
	{
		// Is a function - let the caller define what needs to be done
		oSettings.jqXHR = ajax.call( instance, data, callback, oSettings );
	}
	else if (ajax.url === '') {
		// No url, so don't load any data. Just apply an empty data array
		// to the object for the callback.
		var empty = {};

		DataTable.util.set(ajax.dataSrc)(empty, []);
		callback(empty);
	}
	else {
		// Object to extend the base settings
		oSettings.jqXHR = $.ajax( baseAjax );
	}

	// Restore for next time around
	if ( ajaxData ) {
		ajax.data = ajaxData;
	}
}


/**
 * Update the table using an Ajax call
 *  @param {object} settings dataTables settings object
 *  @returns {boolean} Block the table drawing or not
 *  @memberof DataTable#oApi
 */
function _fnAjaxUpdate( settings )
{
	settings.iDraw++;
	_fnProcessingDisplay( settings, true );

	_fnBuildAjax(
		settings,
		_fnAjaxParameters( settings ),
		function(json) {
			_fnAjaxUpdateDraw( settings, json );
		}
	);
}


/**
 * Build up the parameters in an object needed for a server-side processing
 * request.
 *  @param {object} oSettings dataTables settings object
 *  @returns {bool} block the table drawing or not
 *  @memberof DataTable#oApi
 */
function _fnAjaxParameters( settings )
{
	var
		columns = settings.aoColumns,
		features = settings.oFeatures,
		preSearch = settings.oPreviousSearch,
		preColSearch = settings.aoPreSearchCols,
		colData = function ( idx, prop ) {
			return typeof columns[idx][prop] === 'function' ?
				'function' :
				columns[idx][prop];
		};

	return {
		draw: settings.iDraw,
		columns: columns.map( function ( column, i ) {
			return {
				data: colData(i, 'mData'),
				name: column.sName,
				searchable: column.bSearchable,
				orderable: column.bSortable,
				search: {
					value: preColSearch[i].search,
					regex: preColSearch[i].regex,
					fixed: Object.keys(column.searchFixed).map( function(name) {
						return {
							name: name,
							term: column.searchFixed[name].toString()
						}
					})
				}
			};
		} ),
		order: _fnSortFlatten( settings ).map( function ( val ) {
			return {
				column: val.col,
				dir: val.dir,
				name: colData(val.col, 'sName')
			};
		} ),
		start: settings._iDisplayStart,
		length: features.bPaginate ?
			settings._iDisplayLength :
			-1,
		search: {
			value: preSearch.search,
			regex: preSearch.regex,
			fixed: Object.keys(settings.searchFixed).map( function(name) {
				return {
					name: name,
					term: settings.searchFixed[name].toString()
				}
			})
		}
	};
}


/**
 * Data the data from the server (nuking the old) and redraw the table
 *  @param {object} oSettings dataTables settings object
 *  @param {object} json json data return from the server.
 *  @param {string} json.sEcho Tracking flag for DataTables to match requests
 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filtering
 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filtering
 *  @param {array} json.aaData The data to display on this page
 *  @param {string} [json.sColumns] Column ordering (sName, comma separated)
 *  @memberof DataTable#oApi
 */
function _fnAjaxUpdateDraw ( settings, json )
{
	var data = _fnAjaxDataSrc(settings, json);
	var draw = _fnAjaxDataSrcParam(settings, 'draw', json);
	var recordsTotal = _fnAjaxDataSrcParam(settings, 'recordsTotal', json);
	var recordsFiltered = _fnAjaxDataSrcParam(settings, 'recordsFiltered', json);

	if ( draw !== undefined ) {
		// Protect against out of sequence returns
		if ( draw*1 < settings.iDraw ) {
			return;
		}
		settings.iDraw = draw * 1;
	}

	// No data in returned object, so rather than an array, we show an empty table
	if ( ! data ) {
		data = [];
	}

	_fnClearTable( settings );
	settings._iRecordsTotal   = parseInt(recordsTotal, 10);
	settings._iRecordsDisplay = parseInt(recordsFiltered, 10);

	for ( var i=0, ien=data.length ; i<ien ; i++ ) {
		_fnAddData( settings, data[i] );
	}
	settings.aiDisplay = settings.aiDisplayMaster.slice();

	_fnColumnTypes(settings);
	_fnDraw( settings, true );
	_fnInitComplete( settings );
	_fnProcessingDisplay( settings, false );
}


/**
 * Get the data from the JSON data source to use for drawing a table. Using
 * `_fnGetObjectDataFn` allows the data to be sourced from a property of the
 * source object, or from a processing function.
 *  @param {object} settings dataTables settings object
 *  @param  {object} json Data source object / array from the server
 *  @return {array} Array of data to use
 */
function _fnAjaxDataSrc ( settings, json, write )
{
	var dataProp = 'data';

	if ($.isPlainObject( settings.ajax ) && settings.ajax.dataSrc !== undefined) {
		// Could in inside a `dataSrc` object, or not!
		var dataSrc = settings.ajax.dataSrc;

		// string, function and object are valid types
		if (typeof dataSrc === 'string' || typeof dataSrc === 'function') {
			dataProp = dataSrc;
		}
		else if (dataSrc.data !== undefined) {
			dataProp = dataSrc.data;
		}
	}

	if ( ! write ) {
		if ( dataProp === 'data' ) {
			// If the default, then we still want to support the old style, and safely ignore
			// it if possible
			return json.aaData || json[dataProp];
		}

		return dataProp !== "" ?
			_fnGetObjectDataFn( dataProp )( json ) :
			json;
	}
	
	// set
	_fnSetObjectDataFn( dataProp )( json, write );
}

/**
 * Very similar to _fnAjaxDataSrc, but for the other SSP properties
 * @param {*} settings DataTables settings object
 * @param {*} param Target parameter
 * @param {*} json JSON data
 * @returns Resolved value
 */
function _fnAjaxDataSrcParam (settings, param, json) {
	var dataSrc = $.isPlainObject( settings.ajax )
		? settings.ajax.dataSrc
		: null;

	if (dataSrc && dataSrc[param]) {
		// Get from custom location
		return _fnGetObjectDataFn( dataSrc[param] )( json );
	}

	// else - Default behaviour
	var old = '';

	// Legacy support
	if (param === 'draw') {
		old = 'sEcho';
	}
	else if (param === 'recordsTotal') {
		old = 'iTotalRecords';
	}
	else if (param === 'recordsFiltered') {
		old = 'iTotalDisplayRecords';
	}

	return json[old] !== undefined
		? json[old]
		: json[param];
}


/**
 * Filter the table using both the global filter and column based filtering
 *  @param {object} settings dataTables settings object
 *  @param {object} input search information
 *  @memberof DataTable#oApi
 */
function _fnFilterComplete ( settings, input )
{
	var columnsSearch = settings.aoPreSearchCols;

	// In server-side processing all filtering is done by the server, so no point hanging around here
	if ( _fnDataSource( settings ) != 'ssp' )
	{
		// Check if any of the rows were invalidated
		_fnFilterData( settings );

		// Start from the full data set
		settings.aiDisplay = settings.aiDisplayMaster.slice();

		// Global filter first
		_fnFilter( settings.aiDisplay, settings, input.search, input );

		$.each(settings.searchFixed, function (name, term) {
			_fnFilter(settings.aiDisplay, settings, term, {});
		});

		// Then individual column filters
		for ( var i=0 ; i<columnsSearch.length ; i++ )
		{
			var col = columnsSearch[i];

			_fnFilter(
				settings.aiDisplay,
				settings,
				col.search,
				col,
				i
			);

			$.each(settings.aoColumns[i].searchFixed, function (name, term) {
				_fnFilter(settings.aiDisplay, settings, term, {}, i);
			});
		}

		// And finally global filtering
		_fnFilterCustom( settings );
	}

	// Tell the draw function we have been filtering
	settings.bFiltered = true;

	_fnCallbackFire( settings, null, 'search', [settings] );
}


/**
 * Apply custom filtering functions
 * 
 * This is legacy now that we have named functions, but it is widely used
 * from 1.x, so it is not yet deprecated.
 *  @param {object} oSettings dataTables settings object
 *  @memberof DataTable#oApi
 */
function _fnFilterCustom( settings )
{
	var filters = DataTable.ext.search;
	var displayRows = settings.aiDisplay;
	var row, rowIdx;

	for ( var i=0, ien=filters.length ; i<ien ; i++ ) {
		var rows = [];

		// Loop over each row and see if it should be included
		for ( var j=0, jen=displayRows.length ; j<jen ; j++ ) {
			rowIdx = displayRows[ j ];
			row = settings.aoData[ rowIdx ];

			if ( filters[i]( settings, row._aFilterData, rowIdx, row._aData, j ) ) {
				rows.push( rowIdx );
			}
		}

		// So the array reference doesn't break set the results into the
		// existing array
		displayRows.length = 0;
		displayRows.push.apply(displayRows, rows);
	}
}


/**
 * Filter the data table based on user input and draw the table
 */
function _fnFilter( searchRows, settings, input, options, column )
{
	if ( input === '' ) {
		return;
	}

	var i = 0;
	var matched = [];

	// Search term can be a function, regex or string - if a string we apply our
	// smart filtering regex (assuming the options require that)
	var searchFunc = typeof input === 'function' ? input : null;
	var rpSearch = input instanceof RegExp
		? input
		: searchFunc
			? null
			: _fnFilterCreateSearch( input, options );

	// Then for each row, does the test pass. If not, lop the row from the array
	for (i=0 ; i<searchRows.length ; i++) {
		var row = settings.aoData[ searchRows[i] ];
		var data = column === undefined
			? row._sFilterRow
			: row._aFilterData[ column ];

		if ( (searchFunc && searchFunc(data, row._aData, searchRows[i], column)) || (rpSearch && rpSearch.test(data)) ) {
			matched.push(searchRows[i]);
		}
	}

	// Mutate the searchRows array
	searchRows.length = matched.length;

	for (i=0 ; i<matched.length ; i++) {
		searchRows[i] = matched[i];
	}
}


/**
 * Build a regular expression object suitable for searching a table
 *  @param {string} sSearch string to search for
 *  @param {bool} bRegex treat as a regular expression or not
 *  @param {bool} bSmart perform smart filtering or not
 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
 *  @returns {RegExp} constructed object
 *  @memberof DataTable#oApi
 */
function _fnFilterCreateSearch( search, inOpts )
{
	var not = [];
	var options = $.extend({}, {
		boundary: false,
		caseInsensitive: true,
		exact: false,
		regex: false,
		smart: true
	}, inOpts);

	if (typeof search !== 'string') {
		search = search.toString();
	}

	// Remove diacritics if normalize is set up to do so
	search = _normalize(search);

	if (options.exact) {
		return new RegExp(
			'^'+_fnEscapeRegex(search)+'$',
			options.caseInsensitive ? 'i' : ''
		);
	}

	search = options.regex ?
		search :
		_fnEscapeRegex( search );
	
	if ( options.smart ) {
		/* For smart filtering we want to allow the search to work regardless of
		 * word order. We also want double quoted text to be preserved, so word
		 * order is important - a la google. And a negative look around for
		 * finding rows which don't contain a given string.
		 * 
		 * So this is the sort of thing we want to generate:
		 * 
		 * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
		 */
		var parts = search.match( /!?["\u201C][^"\u201D]+["\u201D]|[^ ]+/g ) || [''];
		var a = parts.map( function ( word ) {
			var negative = false;
			var m;

			// Determine if it is a "does not include"
			if ( word.charAt(0) === '!' ) {
				negative = true;
				word = word.substring(1);
			}

			// Strip the quotes from around matched phrases
			if ( word.charAt(0) === '"' ) {
				m = word.match( /^"(.*)"$/ );
				word = m ? m[1] : word;
			}
			else if ( word.charAt(0) === '\u201C' ) {
				// Smart quote match (iPhone users)
				m = word.match( /^\u201C(.*)\u201D$/ );
				word = m ? m[1] : word;
			}

			// For our "not" case, we need to modify the string that is
			// allowed to match at the end of the expression.
			if (negative) {
				if (word.length > 1) {
					not.push('(?!'+word+')');
				}

				word = '';
			}

			return word.replace(/"/g, '');
		} );

		var match = not.length
			? not.join('')
			: '';

		var boundary = options.boundary
			? '\\b'
			: '';

		search = '^(?=.*?'+boundary+a.join( ')(?=.*?'+boundary )+')('+match+'.)*$';
	}

	return new RegExp( search, options.caseInsensitive ? 'i' : '' );
}


/**
 * Escape a string such that it can be used in a regular expression
 *  @param {string} sVal string to escape
 *  @returns {string} escaped string
 *  @memberof DataTable#oApi
 */
var _fnEscapeRegex = DataTable.util.escapeRegex;

var __filter_div = $('<div>')[0];
var __filter_div_textContent = __filter_div.textContent !== undefined;

// Update the filtering data for each row if needed (by invalidation or first run)
function _fnFilterData ( settings )
{
	var columns = settings.aoColumns;
	var data = settings.aoData;
	var column;
	var j, jen, filterData, cellData, row;
	var wasInvalidated = false;

	for ( var rowIdx=0 ; rowIdx<data.length ; rowIdx++ ) {
		if (! data[rowIdx]) {
			continue;
		}

		row = data[rowIdx];

		if ( ! row._aFilterData ) {
			filterData = [];

			for ( j=0, jen=columns.length ; j<jen ; j++ ) {
				column = columns[j];

				if ( column.bSearchable ) {
					cellData = _fnGetCellData( settings, rowIdx, j, 'filter' );

					// Search in DataTables is string based
					if ( cellData === null ) {
						cellData = '';
					}

					if ( typeof cellData !== 'string' && cellData.toString ) {
						cellData = cellData.toString();
					}
				}
				else {
					cellData = '';
				}

				// If it looks like there is an HTML entity in the string,
				// attempt to decode it so sorting works as expected. Note that
				// we could use a single line of jQuery to do this, but the DOM
				// method used here is much faster https://jsperf.com/html-decode
				if ( cellData.indexOf && cellData.indexOf('&') !== -1 ) {
					__filter_div.innerHTML = cellData;
					cellData = __filter_div_textContent ?
						__filter_div.textContent :
						__filter_div.innerText;
				}

				if ( cellData.replace ) {
					cellData = cellData.replace(/[\r\n\u2028]/g, '');
				}

				filterData.push( cellData );
			}

			row._aFilterData = filterData;
			row._sFilterRow = filterData.join('  ');
			wasInvalidated = true;
		}
	}

	return wasInvalidated;
}


/**
 * Draw the table for the first time, adding all required features
 *  @param {object} settings dataTables settings object
 *  @memberof DataTable#oApi
 */
function _fnInitialise ( settings )
{
	var i;
	var init = settings.oInit;
	var deferLoading = settings.deferLoading;
	var dataSrc = _fnDataSource( settings );

	// Ensure that the table data is fully initialised
	if ( ! settings.bInitialised ) {
		setTimeout( function(){ _fnInitialise( settings ); }, 200 );
		return;
	}

	// Build the header / footer for the table
	_fnBuildHead( settings, 'header' );
	_fnBuildHead( settings, 'footer' );

	// Load the table's state (if needed) and then render around it and draw
	_fnLoadState( settings, init, function () {
		// Then draw the header / footer
		_fnDrawHead( settings, settings.aoHeader );
		_fnDrawHead( settings, settings.aoFooter );

		// Cache the paging start point, as the first redraw will reset it
		var iAjaxStart = settings.iInitDisplayStart

		// Local data load
		// Check if there is data passing into the constructor
		if ( init.aaData ) {
			for ( i=0 ; i<init.aaData.length ; i++ ) {
				_fnAddData( settings, init.aaData[ i ] );
			}
		}
		else if ( deferLoading || dataSrc == 'dom' ) {
			// Grab the data from the page
			_fnAddTr( settings, $(settings.nTBody).children('tr') );
		}

		// Filter not yet applied - copy the display master
		settings.aiDisplay = settings.aiDisplayMaster.slice();

		// Enable features
		_fnAddOptionsHtml( settings );
		_fnSortInit( settings );

		_colGroup( settings );

		/* Okay to show that something is going on now */
		_fnProcessingDisplay( settings, true );

		_fnCallbackFire( settings, null, 'preInit', [settings], true );

		// If there is default sorting required - let's do it. The sort function
		// will do the drawing for us. Otherwise we draw the table regardless of the
		// Ajax source - this allows the table to look initialised for Ajax sourcing
		// data (show 'loading' message possibly)
		_fnReDraw( settings );

		// Server-side processing init complete is done by _fnAjaxUpdateDraw
		if ( dataSrc != 'ssp' || deferLoading ) {
			// if there is an ajax source load the data
			if ( dataSrc == 'ajax' ) {
				_fnBuildAjax( settings, {}, function(json) {
					var aData = _fnAjaxDataSrc( settings, json );

					// Got the data - add it to the table
					for ( i=0 ; i<aData.length ; i++ ) {
						_fnAddData( settings, aData[i] );
					}

					// Reset the init display for cookie saving. We've already done
					// a filter, and therefore cleared it before. So we need to make
					// it appear 'fresh'
					settings.iInitDisplayStart = iAjaxStart;

					_fnReDraw( settings );
					_fnProcessingDisplay( settings, false );
					_fnInitComplete( settings );
				}, settings );
			}
			else {
				_fnInitComplete( settings );
				_fnProcessingDisplay( settings, false );
			}
		}
	} );
}


/**
 * Draw the table for the first time, adding all required features
 *  @param {object} settings dataTables settings object
 *  @memberof DataTable#oApi
 */
function _fnInitComplete ( settings )
{
	if (settings._bInitComplete) {
		return;
	}

	var args = [settings, settings.json];

	settings._bInitComplete = true;

	// Table is fully set up and we have data, so calculate the
	// column widths
	_fnAdjustColumnSizing( settings );

	_fnCallbackFire( settings, null, 'plugin-init', args, true );
	_fnCallbackFire( settings, 'aoInitComplete', 'init', args, true );
}

function _fnLengthChange ( settings, val )
{
	var len = parseInt( val, 10 );
	settings._iDisplayLength = len;

	_fnLengthOverflow( settings );

	// Fire length change event
	_fnCallbackFire( settings, null, 'length', [settings, len] );
}

/**
 * Alter the display settings to change the page
 *  @param {object} settings DataTables settings object
 *  @param {string|int} action Paging action to take: "first", "previous",
 *    "next" or "last" or page number to jump to (integer)
 *  @param [bool] redraw Automatically draw the update or not
 *  @returns {bool} true page has changed, false - no change
 *  @memberof DataTable#oApi
 */
function _fnPageChange ( settings, action, redraw )
{
	var
		start     = settings._iDisplayStart,
		len       = settings._iDisplayLength,
		records   = settings.fnRecordsDisplay();

	if ( records === 0 || len === -1 )
	{
		start = 0;
	}
	else if ( typeof action === "number" )
	{
		start = action * len;

		if ( start > records )
		{
			start = 0;
		}
	}
	else if ( action == "first" )
	{
		start = 0;
	}
	else if ( action == "previous" )
	{
		start = len >= 0 ?
			start - len :
			0;

		if ( start < 0 )
		{
			start = 0;
		}
	}
	else if ( action == "next" )
	{
		if ( start + len < records )
		{
			start += len;
		}
	}
	else if ( action == "last" )
	{
		start = Math.floor( (records-1) / len) * len;
	}
	else if ( action === 'ellipsis' )
	{
		return;
	}
	else
	{
		_fnLog( settings, 0, "Unknown paging action: "+action, 5 );
	}

	var changed = settings._iDisplayStart !== start;
	settings._iDisplayStart = start;

	_fnCallbackFire( settings, null, changed ? 'page' : 'page-nc', [settings] );

	if ( changed && redraw ) {
		_fnDraw( settings );
	}

	return changed;
}


/**
 * Generate the node required for the processing node
 *  @param {object} settings DataTables settings object
 */
function _processingHtml ( settings )
{
	var table = settings.nTable;
	var scrolling = settings.oScroll.sX !== '' || settings.oScroll.sY !== '';

	if ( settings.oFeatures.bProcessing ) {
		var n = $('<div/>', {
				'id': settings.sTableId + '_processing',
				'class': settings.oClasses.processing.container,
				'role': 'status'
			} )
			.html( settings.oLanguage.sProcessing )
			.append('<div><div></div><div></div><div></div><div></div></div>');

		// Different positioning depending on if scrolling is enabled or not
		if (scrolling) {
			n.prependTo( $('div.dt-scroll', settings.nTableWrapper) );
		}
		else {
			n.insertBefore( table );
		}

		$(table).on( 'processing.dt.DT', function (e, s, show) {
			n.css( 'display', show ? 'block' : 'none' );
		} );
	}
}


/**
 * Display or hide the processing indicator
 *  @param {object} settings DataTables settings object
 *  @param {bool} show Show the processing indicator (true) or not (false)
 */
function _fnProcessingDisplay ( settings, show )
{
	// Ignore cases when we are still redrawing
	if (settings.bDrawing && show === false) {
		return;
	}

	_fnCallbackFire( settings, null, 'processing', [settings, show] );
}

/**
 * Show the processing element if an action takes longer than a given time
 *
 * @param {*} settings DataTables settings object
 * @param {*} enable Do (true) or not (false) async processing (local feature enablement)
 * @param {*} run Function to run
 */
function _fnProcessingRun( settings, enable, run ) {
	if (! enable) {
		// Immediate execution, synchronous
		run();
	}
	else {
		_fnProcessingDisplay(settings, true);
		
		// Allow the processing display to show if needed
		setTimeout(function () {
			run();

			_fnProcessingDisplay(settings, false);
		}, 0);
	}
}
/**
 * Add any control elements for the table - specifically scrolling
 *  @param {object} settings dataTables settings object
 *  @returns {node} Node to add to the DOM
 *  @memberof DataTable#oApi
 */
function _fnFeatureHtmlTable ( settings )
{
	var table = $(settings.nTable);

	// Scrolling from here on in
	var scroll = settings.oScroll;

	if ( scroll.sX === '' && scroll.sY === '' ) {
		return settings.nTable;
	}

	var scrollX = scroll.sX;
	var scrollY = scroll.sY;
	var classes = settings.oClasses.scrolling;
	var caption = settings.captionNode;
	var captionSide = caption ? caption._captionSide : null;
	var headerClone = $( table[0].cloneNode(false) );
	var footerClone = $( table[0].cloneNode(false) );
	var footer = table.children('tfoot');
	var _div = '<div/>';
	var size = function ( s ) {
		return !s ? null : _fnStringToCss( s );
	};

	if ( ! footer.length ) {
		footer = null;
	}

	/*
	 * The HTML structure that we want to generate in this function is:
	 *  div - scroller
	 *    div - scroll head
	 *      div - scroll head inner
	 *        table - scroll head table
	 *          thead - thead
	 *    div - scroll body
	 *      table - table (master table)
	 *        thead - thead clone for sizing
	 *        tbody - tbody
	 *    div - scroll foot
	 *      div - scroll foot inner
	 *        table - scroll foot table
	 *          tfoot - tfoot
	 */
	var scroller = $( _div, { 'class': classes.container } )
		.append(
			$(_div, { 'class': classes.header.self } )
				.css( {
					overflow: 'hidden',
					position: 'relative',
					border: 0,
					width: scrollX ? size(scrollX) : '100%'
				} )
				.append(
					$(_div, { 'class': classes.header.inner } )
						.css( {
							'box-sizing': 'content-box',
							width: scroll.sXInner || '100%'
						} )
						.append(
							headerClone
								.removeAttr('id')
								.css( 'margin-left', 0 )
								.append( captionSide === 'top' ? caption : null )
								.append(
									table.children('thead')
								)
						)
				)
		)
		.append(
			$(_div, { 'class': classes.body } )
				.css( {
					position: 'relative',
					overflow: 'auto',
					width: size( scrollX )
				} )
				.append( table )
		);

	if ( footer ) {
		scroller.append(
			$(_div, { 'class': classes.footer.self } )
				.css( {
					overflow: 'hidden',
					border: 0,
					width: scrollX ? size(scrollX) : '100%'
				} )
				.append(
					$(_div, { 'class': classes.footer.inner } )
						.append(
							footerClone
								.removeAttr('id')
								.css( 'margin-left', 0 )
								.append( captionSide === 'bottom' ? caption : null )
								.append(
									table.children('tfoot')
								)
						)
				)
		);
	}

	var children = scroller.children();
	var scrollHead = children[0];
	var scrollBody = children[1];
	var scrollFoot = footer ? children[2] : null;

	// When the body is scrolled, then we also want to scroll the headers
	$(scrollBody).on( 'scroll.DT', function () {
		var scrollLeft = this.scrollLeft;

		scrollHead.scrollLeft = scrollLeft;

		if ( footer ) {
			scrollFoot.scrollLeft = scrollLeft;
		}
	} );

	// When focus is put on the header cells, we might need to scroll the body
	$('th, td', scrollHead).on('focus', function () {
		var scrollLeft = scrollHead.scrollLeft;

		scrollBody.scrollLeft = scrollLeft;

		if ( footer ) {
			scrollBody.scrollLeft = scrollLeft;
		}
	});

	$(scrollBody).css('max-height', scrollY);
	if (! scroll.bCollapse) {
		$(scrollBody).css('height', scrollY);
	}

	settings.nScrollHead = scrollHead;
	settings.nScrollBody = scrollBody;
	settings.nScrollFoot = scrollFoot;

	// On redraw - align columns
	settings.aoDrawCallback.push(_fnScrollDraw);

	return scroller[0];
}



/**
 * Update the header, footer and body tables for resizing - i.e. column
 * alignment.
 *
 * Welcome to the most horrible function DataTables. The process that this
 * function follows is basically:
 *   1. Re-create the table inside the scrolling div
 *   2. Correct colgroup > col values if needed
 *   3. Copy colgroup > col over to header and footer
 *   4. Clean up
 *
 *  @param {object} settings dataTables settings object
 *  @memberof DataTable#oApi
 */
function _fnScrollDraw ( settings )
{
	// Given that this is such a monster function, a lot of variables are use
	// to try and keep the minimised size as small as possible
	var
		scroll         = settings.oScroll,
		barWidth       = scroll.iBarWidth,
		divHeader      = $(settings.nScrollHead),
		divHeaderInner = divHeader.children('div'),
		divHeaderTable = divHeaderInner.children('table'),
		divBodyEl      = settings.nScrollBody,
		divBody        = $(divBodyEl),
		divFooter      = $(settings.nScrollFoot),
		divFooterInner = divFooter.children('div'),
		divFooterTable = divFooterInner.children('table'),
		header         = $(settings.nTHead),
		table          = $(settings.nTable),
		footer         = settings.nTFoot && $('th, td', settings.nTFoot).length ? $(settings.nTFoot) : null,
		browser        = settings.oBrowser,
		headerCopy, footerCopy;

	// If the scrollbar visibility has changed from the last draw, we need to
	// adjust the column sizes as the table width will have changed to account
	// for the scrollbar
	var scrollBarVis = divBodyEl.scrollHeight > divBodyEl.clientHeight;
	
	if ( settings.scrollBarVis !== scrollBarVis && settings.scrollBarVis !== undefined ) {
		settings.scrollBarVis = scrollBarVis;
		_fnAdjustColumnSizing( settings );
		return; // adjust column sizing will call this function again
	}
	else {
		settings.scrollBarVis = scrollBarVis;
	}

	// 1. Re-create the table inside the scrolling div
	// Remove the old minimised thead and tfoot elements in the inner table
	table.children('thead, tfoot').remove();

	// Clone the current header and footer elements and then place it into the inner table
	headerCopy = header.clone().prependTo( table );
	headerCopy.find('th, td').removeAttr('tabindex');
	headerCopy.find('[id]').removeAttr('id');

	if ( footer ) {
		footerCopy = footer.clone().prependTo( table );
		footerCopy.find('[id]').removeAttr('id');
	}

	// 2. Correct colgroup > col values if needed
	// It is possible that the cell sizes are smaller than the content, so we need to
	// correct colgroup>col for such cases. This can happen if the auto width detection
	// uses a cell which has a longer string, but isn't the widest! For example 
	// "Chief Executive Officer (CEO)" is the longest string in the demo, but
	// "Systems Administrator" is actually the widest string since it doesn't collapse.
	// Note the use of translating into a column index to get the `col` element. This
	// is because of Responsive which might remove `col` elements, knocking the alignment
	// of the indexes out.
	if (settings.aiDisplay.length) {
		// Get the column sizes from the first row in the table. This should really be a
		// [].find, but it wasn't supported in Chrome until Sept 2015, and DT has 10 year
		// browser support
		var firstTr = null;

		for (i=settings._iDisplayStart ; i<settings.aiDisplay.length ; i++) {
			var idx = settings.aiDisplay[i];
			var tr = settings.aoData[idx].nTr;

			if (tr) {
				firstTr = tr;
				break;
			}
		}

		if (firstTr) {
			var colSizes = $(firstTr).children('th, td').map(function (vis) {
				return {
					idx: _fnVisibleToColumnIndex(settings, vis),
					width: $(this).outerWidth()
				}
			});

			// Check against what the colgroup > col is set to and correct if needed
			for (var i=0 ; i<colSizes.length ; i++) {
				var colEl = settings.aoColumns[ colSizes[i].idx ].colEl[0];
				var colWidth = colEl.style.width.replace('px', '');

				if (colWidth !== colSizes[i].width) {
					colEl.style.width = colSizes[i].width + 'px';
				}
			}
		}
	}

	// 3. Copy the colgroup over to the header and footer
	divHeaderTable
		.find('colgroup')
		.remove();

	divHeaderTable.append(settings.colgroup.clone());

	if ( footer ) {
		divFooterTable
			.find('colgroup')
			.remove();

		divFooterTable.append(settings.colgroup.clone());
	}

	// "Hide" the header and footer that we used for the sizing. We need to keep
	// the content of the cell so that the width applied to the header and body
	// both match, but we want to hide it completely.
	$('th, td', headerCopy).each(function () {
		$(this.childNodes).wrapAll('<div class="dt-scroll-sizing">');
	});

	if ( footer ) {
		$('th, td', footerCopy).each(function () {
			$(this.childNodes).wrapAll('<div class="dt-scroll-sizing">');
		});
	}

	// 4. Clean up
	// Figure out if there are scrollbar present - if so then we need a the header and footer to
	// provide a bit more space to allow "overflow" scrolling (i.e. past the scrollbar)
	var isScrolling = Math.floor(table.height()) > divBodyEl.clientHeight || divBody.css('overflow-y') == "scroll";
	var paddingSide = 'padding' + (browser.bScrollbarLeft ? 'Left' : 'Right' );

	// Set the width's of the header and footer tables
	var outerWidth = table.outerWidth();

	divHeaderTable.css('width', _fnStringToCss( outerWidth ));
	divHeaderInner
		.css('width', _fnStringToCss( outerWidth ))
		.css(paddingSide, isScrolling ? barWidth+"px" : "0px");

	if ( footer ) {
		divFooterTable.css('width', _fnStringToCss( outerWidth ));
		divFooterInner
			.css('width', _fnStringToCss( outerWidth ))
			.css(paddingSide, isScrolling ? barWidth+"px" : "0px");
	}

	// Correct DOM ordering for colgroup - comes before the thead
	table.children('colgroup').prependTo(table);

	// Adjust the position of the header in case we loose the y-scrollbar
	divBody.trigger('scroll');

	// If sorting or filtering has occurred, jump the scrolling back to the top
	// only if we aren't holding the position
	if ( (settings.bSorted || settings.bFiltered) && ! settings._drawHold ) {
		divBodyEl.scrollTop = 0;
	}
}

/**
 * Calculate the width of columns for the table
 *  @param {object} settings dataTables settings object
 *  @memberof DataTable#oApi
 */
function _fnCalculateColumnWidths ( settings )
{
	// Not interested in doing column width calculation if auto-width is disabled
	if (! settings.oFeatures.bAutoWidth) {
		return;
	}

	var
		table = settings.nTable,
		columns = settings.aoColumns,
		scroll = settings.oScroll,
		scrollY = scroll.sY,
		scrollX = scroll.sX,
		scrollXInner = scroll.sXInner,
		visibleColumns = _fnGetColumns( settings, 'bVisible' ),
		tableWidthAttr = table.getAttribute('width'), // from DOM element
		tableContainer = table.parentNode,
		i, column, columnIdx;
		
	var styleWidth = table.style.width;

	// If there is no width applied as a CSS style or as an attribute, we assume that
	// the width is intended to be 100%, which is usually is in CSS, but it is very
	// difficult to correctly parse the rules to get the final result.
	if ( ! styleWidth && ! tableWidthAttr) {
		table.style.width = '100%';
		styleWidth = '100%';
	}

	if ( styleWidth && styleWidth.indexOf('%') !== -1 ) {
		tableWidthAttr = styleWidth;
	}

	// Let plug-ins know that we are doing a recalc, in case they have changed any of the
	// visible columns their own way (e.g. Responsive uses display:none).
	_fnCallbackFire(
		settings,
		null,
		'column-calc',
		{visible: visibleColumns},
		false
	);

	// Construct a single row, worst case, table with the widest
	// node in the data, assign any user defined widths, then insert it into
	// the DOM and allow the browser to do all the hard work of calculating
	// table widths
	var tmpTable = $(table.cloneNode())
		.css( 'visibility', 'hidden' )
		.removeAttr( 'id' );

	// Clean up the table body
	tmpTable.append('<tbody>')
	var tr = $('<tr/>').appendTo( tmpTable.find('tbody') );

	// Clone the table header and footer - we can't use the header / footer
	// from the cloned table, since if scrolling is active, the table's
	// real header and footer are contained in different table tags
	tmpTable
		.append( $(settings.nTHead).clone() )
		.append( $(settings.nTFoot).clone() );

	// Remove any assigned widths from the footer (from scrolling)
	tmpTable.find('tfoot th, tfoot td').css('width', '');

	// Apply custom sizing to the cloned header
	tmpTable.find('thead th, thead td').each( function () {
		// Get the `width` from the header layout
		var width = _fnColumnsSumWidth( settings, this, true, false );

		if ( width ) {
			this.style.width = width;

			// For scrollX we need to force the column width otherwise the
			// browser will collapse it. If this width is smaller than the
			// width the column requires, then it will have no effect
			if ( scrollX ) {
				$( this ).append( $('<div/>').css( {
					width: width,
					margin: 0,
					padding: 0,
					border: 0,
					height: 1
				} ) );
			}
		}
		else {
			this.style.width = '';
		}
	} );

	// Find the widest piece of data for each column and put it into the table
	for ( i=0 ; i<visibleColumns.length ; i++ ) {
		columnIdx = visibleColumns[i];
		column = columns[ columnIdx ];

		var longest = _fnGetMaxLenString(settings, columnIdx);
		var autoClass = _ext.type.className[column.sType];
		var text = longest + column.sContentPadding;
		var insert = longest.indexOf('<') === -1
			? document.createTextNode(text)
			: text
		
		$('<td/>')
			.addClass(autoClass)
			.addClass(column.sClass)
			.append(insert)
			.appendTo(tr);
	}

	// Tidy the temporary table - remove name attributes so there aren't
	// duplicated in the dom (radio elements for example)
	$('[name]', tmpTable).removeAttr('name');

	// Table has been built, attach to the document so we can work with it.
	// A holding element is used, positioned at the top of the container
	// with minimal height, so it has no effect on if the container scrolls
	// or not. Otherwise it might trigger scrolling when it actually isn't
	// needed
	var holder = $('<div/>').css( scrollX || scrollY ?
			{
				position: 'absolute',
				top: 0,
				left: 0,
				height: 1,
				right: 0,
				overflow: 'hidden'
			} :
			{}
		)
		.append( tmpTable )
		.appendTo( tableContainer );

	// When scrolling (X or Y) we want to set the width of the table as 
	// appropriate. However, when not scrolling leave the table width as it
	// is. This results in slightly different, but I think correct behaviour
	if ( scrollX && scrollXInner ) {
		tmpTable.width( scrollXInner );
	}
	else if ( scrollX ) {
		tmpTable.css( 'width', 'auto' );
		tmpTable.removeAttr('width');

		// If there is no width attribute or style, then allow the table to
		// collapse
		if ( tmpTable.width() < tableContainer.clientWidth && tableWidthAttr ) {
			tmpTable.width( tableContainer.clientWidth );
		}
	}
	else if ( scrollY ) {
		tmpTable.width( tableContainer.clientWidth );
	}
	else if ( tableWidthAttr ) {
		tmpTable.width( tableWidthAttr );
	}

	// Get the width of each column in the constructed table
	var total = 0;
	var bodyCells = tmpTable.find('tbody tr').eq(0).children();

	for ( i=0 ; i<visibleColumns.length ; i++ ) {
		// Use getBounding for sub-pixel accuracy, which we then want to round up!
		var bounding = bodyCells[i].getBoundingClientRect().width;

		// Total is tracked to remove any sub-pixel errors as the outerWidth
		// of the table might not equal the total given here
		total += bounding;

		// Width for each column to use
		columns[ visibleColumns[i] ].sWidth = _fnStringToCss( bounding );
	}

	table.style.width = _fnStringToCss( total );

	// Finished with the table - ditch it
	holder.remove();

	// If there is a width attr, we want to attach an event listener which
	// allows the table sizing to automatically adjust when the window is
	// resized. Use the width attr rather than CSS, since we can't know if the
	// CSS is a relative value or absolute - DOM read is always px.
	if ( tableWidthAttr ) {
		table.style.width = _fnStringToCss( tableWidthAttr );
	}

	if ( (tableWidthAttr || scrollX) && ! settings._reszEvt ) {
		var bindResize = function () {
			$(window).on('resize.DT-'+settings.sInstance, DataTable.util.throttle( function () {
				if (! settings.bDestroying) {
					_fnAdjustColumnSizing( settings );
				}
			} ) );
		};

		bindResize();

		settings._reszEvt = true;
	}
}


/**
 * Get the maximum strlen for each data column
 *  @param {object} settings dataTables settings object
 *  @param {int} colIdx column of interest
 *  @returns {string} string of the max length
 *  @memberof DataTable#oApi
 */
function _fnGetMaxLenString( settings, colIdx )
{
	var column = settings.aoColumns[colIdx];

	if (! column.maxLenString) {
		var s, max='', maxLen = -1;
	
		for ( var i=0, ien=settings.aiDisplayMaster.length ; i<ien ; i++ ) {
			var rowIdx = settings.aiDisplayMaster[i];
			var data = _fnGetRowDisplay(settings, rowIdx)[colIdx];

			var cellString = data && typeof data === 'object' && data.nodeType
				? data.innerHTML
				: data+'';

			// Remove id / name attributes from elements so they
			// don't interfere with existing elements
			cellString = cellString
				.replace(/id=".*?"/g, '')
				.replace(/name=".*?"/g, '');

			s = _stripHtml(cellString)
				.replace( /&nbsp;/g, ' ' );
	
			if ( s.length > maxLen ) {
				// We want the HTML in the string, but the length that
				// is important is the stripped string
				max = cellString;
				maxLen = s.length;
			}
		}

		column.maxLenString = max;
	}

	return column.maxLenString;
}


/**
 * Append a CSS unit (only if required) to a string
 *  @param {string} value to css-ify
 *  @returns {string} value with css unit
 *  @memberof DataTable#oApi
 */
function _fnStringToCss( s )
{
	if ( s === null ) {
		return '0px';
	}

	if ( typeof s == 'number' ) {
		return s < 0 ?
			'0px' :
			s+'px';
	}

	// Check it has a unit character already
	return s.match(/\d$/) ?
		s+'px' :
		s;
}

/**
 * Re-insert the `col` elements for current visibility
 *
 * @param {*} settings DT settings
 */
function _colGroup( settings ) {
	var cols = settings.aoColumns;

	settings.colgroup.empty();

	for (i=0 ; i<cols.length ; i++) {
		if (cols[i].bVisible) {
			settings.colgroup.append(cols[i].colEl);
		}
	}
}


function _fnSortInit( settings ) {
	var target = settings.nTHead;
	var headerRows = target.querySelectorAll('tr');
	var legacyTop = settings.bSortCellsTop;
	var notSelector = ':not([data-dt-order="disable"]):not([data-dt-order="icon-only"])';
	
	// Legacy support for `orderCellsTop`
	if (legacyTop === true) {
		target = headerRows[0];
	}
	else if (legacyTop === false) {
		target = headerRows[ headerRows.length - 1 ];
	}

	_fnSortAttachListener(
		settings,
		target,
		target === settings.nTHead
			? 'tr'+notSelector+' th'+notSelector+', tr'+notSelector+' td'+notSelector
			: 'th'+notSelector+', td'+notSelector
	);

	// Need to resolve the user input array into our internal structure
	var order = [];
	_fnSortResolve( settings, order, settings.aaSorting );

	settings.aaSorting = order;
}


function _fnSortAttachListener(settings, node, selector, column, callback) {
	_fnBindAction( node, selector, function (e) {
		var run = false;
		var columns = column === undefined
			? _fnColumnsFromHeader( e.target )
			: [column];

		if ( columns.length ) {
			for ( var i=0, ien=columns.length ; i<ien ; i++ ) {
				var ret = _fnSortAdd( settings, columns[i], i, e.shiftKey );

				if (ret !== false) {
					run = true;
				}					

				// If the first entry is no sort, then subsequent
				// sort columns are ignored
				if (settings.aaSorting.length === 1 && settings.aaSorting[0][1] === '') {
					break;
				}
			}

			if (run) {
				_fnProcessingRun(settings, true, function () {
					_fnSort( settings );
					_fnSortDisplay( settings, settings.aiDisplay );

					_fnReDraw( settings, false, false );

					if (callback) {
						callback();
					}
				});
			}
		}
	} );
}

/**
 * Sort the display array to match the master's order
 * @param {*} settings
 */
function _fnSortDisplay(settings, display) {
	if (display.length < 2) {
		return;
	}

	var master = settings.aiDisplayMaster;
	var masterMap = {};
	var map = {};
	var i;

	// Rather than needing an `indexOf` on master array, we can create a map
	for (i=0 ; i<master.length ; i++) {
		masterMap[master[i]] = i;
	}

	// And then cache what would be the indexOf fom the display
	for (i=0 ; i<display.length ; i++) {
		map[display[i]] = masterMap[display[i]];
	}

	display.sort(function(a, b){
		// Short version of this function is simply `master.indexOf(a) - master.indexOf(b);`
		return map[a] - map[b];
	});
}


function _fnSortResolve (settings, nestedSort, sort) {
	var push = function ( a ) {
		if ($.isPlainObject(a)) {
			if (a.idx !== undefined) {
				// Index based ordering
				nestedSort.push([a.idx, a.dir]);
			}
			else if (a.name) {
				// Name based ordering
				var cols = _pluck( settings.aoColumns, 'sName');
				var idx = cols.indexOf(a.name);

				if (idx !== -1) {
					nestedSort.push([idx, a.dir]);
				}
			}
		}
		else {
			// Plain column index and direction pair
			nestedSort.push(a);
		}
	};

	if ( $.isPlainObject(sort) ) {
		// Object
		push(sort);
	}
	else if ( sort.length && typeof sort[0] === 'number' ) {
		// 1D array
		push(sort);
	}
	else if ( sort.length ) {
		// 2D array
		for (var z=0; z<sort.length; z++) {
			push(sort[z]); // Object or array
		}
	}
}


function _fnSortFlatten ( settings )
{
	var
		i, k, kLen,
		aSort = [],
		extSort = DataTable.ext.type.order,
		aoColumns = settings.aoColumns,
		aDataSort, iCol, sType, srcCol,
		fixed = settings.aaSortingFixed,
		fixedObj = $.isPlainObject( fixed ),
		nestedSort = [];
	
	if ( ! settings.oFeatures.bSort ) {
		return aSort;
	}

	// Build the sort array, with pre-fix and post-fix options if they have been
	// specified
	if ( Array.isArray( fixed ) ) {
		_fnSortResolve( settings, nestedSort, fixed );
	}

	if ( fixedObj && fixed.pre ) {
		_fnSortResolve( settings, nestedSort, fixed.pre );
	}

	_fnSortResolve( settings, nestedSort, settings.aaSorting );

	if (fixedObj && fixed.post ) {
		_fnSortResolve( settings, nestedSort, fixed.post );
	}

	for ( i=0 ; i<nestedSort.length ; i++ )
	{
		srcCol = nestedSort[i][0];

		if ( aoColumns[ srcCol ] ) {
			aDataSort = aoColumns[ srcCol ].aDataSort;

			for ( k=0, kLen=aDataSort.length ; k<kLen ; k++ )
			{
				iCol = aDataSort[k];
				sType = aoColumns[ iCol ].sType || 'string';

				if ( nestedSort[i]._idx === undefined ) {
					nestedSort[i]._idx = aoColumns[iCol].asSorting.indexOf(nestedSort[i][1]);
				}

				if ( nestedSort[i][1] ) {
					aSort.push( {
						src:       srcCol,
						col:       iCol,
						dir:       nestedSort[i][1],
						index:     nestedSort[i]._idx,
						type:      sType,
						formatter: extSort[ sType+"-pre" ],
						sorter:    extSort[ sType+"-"+nestedSort[i][1] ]
					} );
				}
			}
		}
	}

	return aSort;
}

/**
 * Change the order of the table
 *  @param {object} oSettings dataTables settings object
 *  @memberof DataTable#oApi
 */
function _fnSort ( oSettings, col, dir )
{
	var
		i, ien, iLen,
		aiOrig = [],
		extSort = DataTable.ext.type.order,
		aoData = oSettings.aoData,
		sortCol,
		displayMaster = oSettings.aiDisplayMaster,
		aSort;

	// Allow a specific column to be sorted, which will _not_ alter the display
	// master
	if (col !== undefined) {
		var srcCol = oSettings.aoColumns[col];
		aSort = [{
			src:       col,
			col:       col,
			dir:       dir,
			index:     0,
			type:      srcCol.sType,
			formatter: extSort[ srcCol.sType+"-pre" ],
			sorter:    extSort[ srcCol.sType+"-"+dir ]
		}];
		displayMaster = displayMaster.slice();
	}
	else {
		aSort = _fnSortFlatten( oSettings );
	}

	for ( i=0, ien=aSort.length ; i<ien ; i++ ) {
		sortCol = aSort[i];

		// Load the data needed for the sort, for each cell
		_fnSortData( oSettings, sortCol.col );
	}

	/* No sorting required if server-side or no sorting array */
	if ( _fnDataSource( oSettings ) != 'ssp' && aSort.length !== 0 )
	{
		// Reset the initial positions on each pass so we get a stable sort
		for ( i=0, iLen=displayMaster.length ; i<iLen ; i++ ) {
			aiOrig[ i ] = i;
		}

		// If the first sort is desc, then reverse the array to preserve original
		// order, just in reverse
		if (aSort.length && aSort[0].dir === 'desc' && oSettings.orderDescReverse) {
			aiOrig.reverse();
		}

		/* Do the sort - here we want multi-column sorting based on a given data source (column)
		 * and sorting function (from oSort) in a certain direction. It's reasonably complex to
		 * follow on it's own, but this is what we want (example two column sorting):
		 *  fnLocalSorting = function(a,b){
		 *    var test;
		 *    test = oSort['string-asc']('data11', 'data12');
		 *      if (test !== 0)
		 *        return test;
		 *    test = oSort['numeric-desc']('data21', 'data22');
		 *    if (test !== 0)
		 *      return test;
		 *    return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
		 *  }
		 * Basically we have a test for each sorting column, if the data in that column is equal,
		 * test the next column. If all columns match, then we use a numeric sort on the row
		 * positions in the original data array to provide a stable sort.
		 */
		displayMaster.sort( function ( a, b ) {
			var
				x, y, k, test, sort,
				len=aSort.length,
				dataA = aoData[a]._aSortData,
				dataB = aoData[b]._aSortData;

			for ( k=0 ; k<len ; k++ ) {
				sort = aSort[k];

				// Data, which may have already been through a `-pre` function
				x = dataA[ sort.col ];
				y = dataB[ sort.col ];

				if (sort.sorter) {
					// If there is a custom sorter (`-asc` or `-desc`) for this
					// data type, use it
					test = sort.sorter(x, y);

					if ( test !== 0 ) {
						return test;
					}
				}
				else {
					// Otherwise, use generic sorting
					test = x<y ? -1 : x>y ? 1 : 0;

					if ( test !== 0 ) {
						return sort.dir === 'asc' ? test : -test;
					}
				}
			}

			x = aiOrig[a];
			y = aiOrig[b];

			return x<y ? -1 : x>y ? 1 : 0;
		} );
	}
	else if ( aSort.length === 0 ) {
		// Apply index order
		displayMaster.sort(function (x, y) {
			return x<y ? -1 : x>y ? 1 : 0;
		});
	}

	if (col === undefined) {
		// Tell the draw function that we have sorted the data
		oSettings.bSorted = true;
		oSettings.sortDetails = aSort;

		_fnCallbackFire( oSettings, null, 'order', [oSettings, aSort] );
	}

	return displayMaster;
}


/**
 * Function to run on user sort request
 *  @param {object} settings dataTables settings object
 *  @param {node} attachTo node to attach the handler to
 *  @param {int} colIdx column sorting index
 *  @param {int} addIndex Counter
 *  @param {boolean} [shift=false] Shift click add
 *  @param {function} [callback] callback function
 *  @memberof DataTable#oApi
 */
function _fnSortAdd ( settings, colIdx, addIndex, shift )
{
	var col = settings.aoColumns[ colIdx ];
	var sorting = settings.aaSorting;
	var asSorting = col.asSorting;
	var nextSortIdx;
	var next = function ( a, overflow ) {
		var idx = a._idx;
		if ( idx === undefined ) {
			idx = asSorting.indexOf(a[1]);
		}

		return idx+1 < asSorting.length ?
			idx+1 :
			overflow ?
				null :
				0;
	};

	if ( ! col.bSortable ) {
		return false;
	}

	// Convert to 2D array if needed
	if ( typeof sorting[0] === 'number' ) {
		sorting = settings.aaSorting = [ sorting ];
	}

	// If appending the sort then we are multi-column sorting
	if ( (shift || addIndex) && settings.oFeatures.bSortMulti ) {
		// Are we already doing some kind of sort on this column?
		var sortIdx = _pluck(sorting, '0').indexOf(colIdx);

		if ( sortIdx !== -1 ) {
			// Yes, modify the sort
			nextSortIdx = next( sorting[sortIdx], true );

			if ( nextSortIdx === null && sorting.length === 1 ) {
				nextSortIdx = 0; // can't remove sorting completely
			}

			if ( nextSortIdx === null ) {
				sorting.splice( sortIdx, 1 );
			}
			else {
				sorting[sortIdx][1] = asSorting[ nextSortIdx ];
				sorting[sortIdx]._idx = nextSortIdx;
			}
		}
		else if (shift) {
			// No sort on this column yet, being added by shift click
			// add it as itself
			sorting.push( [ colIdx, asSorting[0], 0 ] );
			sorting[sorting.length-1]._idx = 0;
		}
		else {
			// No sort on this column yet, being added from a colspan
			// so add with same direction as first column
			sorting.push( [ colIdx, sorting[0][1], 0 ] );
			sorting[sorting.length-1]._idx = 0;
		}
	}
	else if ( sorting.length && sorting[0][0] == colIdx ) {
		// Single column - already sorting on this column, modify the sort
		nextSortIdx = next( sorting[0] );

		sorting.length = 1;
		sorting[0][1] = asSorting[ nextSortIdx ];
		sorting[0]._idx = nextSortIdx;
	}
	else {
		// Single column - sort only on this column
		sorting.length = 0;
		sorting.push( [ colIdx, asSorting[0] ] );
		sorting[0]._idx = 0;
	}
}


/**
 * Set the sorting classes on table's body, Note: it is safe to call this function
 * when bSort and bSortClasses are false
 *  @param {object} oSettings dataTables settings object
 *  @memberof DataTable#oApi
 */
function _fnSortingClasses( settings )
{
	var oldSort = settings.aLastSort;
	var sortClass = settings.oClasses.order.position;
	var sort = _fnSortFlatten( settings );
	var features = settings.oFeatures;
	var i, ien, colIdx;

	if ( features.bSort && features.bSortClasses ) {
		// Remove old sorting classes
		for ( i=0, ien=oldSort.length ; i<ien ; i++ ) {
			colIdx = oldSort[i].src;

			// Remove column sorting
			$( _pluck( settings.aoData, 'anCells', colIdx ) )
				.removeClass( sortClass + (i<2 ? i+1 : 3) );
		}

		// Add new column sorting
		for ( i=0, ien=sort.length ; i<ien ; i++ ) {
			colIdx = sort[i].src;

			$( _pluck( settings.aoData, 'anCells', colIdx ) )
				.addClass( sortClass + (i<2 ? i+1 : 3) );
		}
	}

	settings.aLastSort = sort;
}


// Get the data to sort a column, be it from cache, fresh (populating the
// cache), or from a sort formatter
function _fnSortData( settings, colIdx )
{
	// Custom sorting function - provided by the sort data type
	var column = settings.aoColumns[ colIdx ];
	var customSort = DataTable.ext.order[ column.sSortDataType ];
	var customData;

	if ( customSort ) {
		customData = customSort.call( settings.oInstance, settings, colIdx,
			_fnColumnIndexToVisible( settings, colIdx )
		);
	}

	// Use / populate cache
	var row, cellData;
	var formatter = DataTable.ext.type.order[ column.sType+"-pre" ];
	var data = settings.aoData;

	for ( var rowIdx=0 ; rowIdx<data.length ; rowIdx++ ) {
		// Sparse array
		if (! data[rowIdx]) {
			continue;
		}

		row = data[rowIdx];

		if ( ! row._aSortData ) {
			row._aSortData = [];
		}

		if ( ! row._aSortData[colIdx] || customSort ) {
			cellData = customSort ?
				customData[rowIdx] : // If there was a custom sort function, use data from there
				_fnGetCellData( settings, rowIdx, colIdx, 'sort' );

			row._aSortData[ colIdx ] = formatter ?
				formatter( cellData, settings ) :
				cellData;
		}
	}
}


/**
 * State information for a table
 *
 * @param {*} settings
 * @returns State object
 */
function _fnSaveState ( settings )
{
	if (settings._bLoadingState) {
		return;
	}

	/* Store the interesting variables */
	var state = {
		time:    +new Date(),
		start:   settings._iDisplayStart,
		length:  settings._iDisplayLength,
		order:   $.extend( true, [], settings.aaSorting ),
		search:  $.extend({}, settings.oPreviousSearch),
		columns: settings.aoColumns.map( function ( col, i ) {
			return {
				visible: col.bVisible,
				search: $.extend({}, settings.aoPreSearchCols[i])
			};
		} )
	};

	settings.oSavedState = state;
	_fnCallbackFire( settings, "aoStateSaveParams", 'stateSaveParams', [settings, state] );
	
	if ( settings.oFeatures.bStateSave && !settings.bDestroying )
	{
		settings.fnStateSaveCallback.call( settings.oInstance, settings, state );
	}	
}


/**
 * Attempt to load a saved table state
 *  @param {object} oSettings dataTables settings object
 *  @param {object} oInit DataTables init object so we can override settings
 *  @param {function} callback Callback to execute when the state has been loaded
 *  @memberof DataTable#oApi
 */
function _fnLoadState ( settings, init, callback )
{
	if ( ! settings.oFeatures.bStateSave ) {
		callback();
		return;
	}

	var loaded = function(state) {
		_fnImplementState(settings, state, callback);
	}

	var state = settings.fnStateLoadCallback.call( settings.oInstance, settings, loaded );

	if ( state !== undefined ) {
		_fnImplementState( settings, state, callback );
	}
	// otherwise, wait for the loaded callback to be executed

	return true;
}

function _fnImplementState ( settings, s, callback) {
	var i, ien;
	var columns = settings.aoColumns;
	settings._bLoadingState = true;

	// When StateRestore was introduced the state could now be implemented at any time
	// Not just initialisation. To do this an api instance is required in some places
	var api = settings._bInitComplete ? new DataTable.Api(settings) : null;

	if ( ! s || ! s.time ) {
		settings._bLoadingState = false;
		callback();
		return;
	}

	// Reject old data
	var duration = settings.iStateDuration;
	if ( duration > 0 && s.time < +new Date() - (duration*1000) ) {
		settings._bLoadingState = false;
		callback();
		return;
	}

	// Allow custom and plug-in manipulation functions to alter the saved data set and
	// cancelling of loading by returning false
	var abStateLoad = _fnCallbackFire( settings, 'aoStateLoadParams', 'stateLoadParams', [settings, s] );
	if ( abStateLoad.indexOf(false) !== -1 ) {
		settings._bLoadingState = false;
		callback();
		return;
	}

	// Number of columns have changed - all bets are off, no restore of settings
	if ( s.columns && columns.length !== s.columns.length ) {
		settings._bLoadingState = false;
		callback();
		return;
	}

	// Store the saved state so it might be accessed at any time
	settings.oLoadedState = $.extend( true, {}, s );

	// This is needed for ColReorder, which has to happen first to allow all
	// the stored indexes to be usable. It is not publicly documented.
	_fnCallbackFire( settings, null, 'stateLoadInit', [settings, s], true );

	// Page Length
	if ( s.length !== undefined ) {
		// If already initialised just set the value directly so that the select element is also updated
		if (api) {
			api.page.len(s.length)
		}
		else {
			settings._iDisplayLength   = s.length;
		}
	}

	// Restore key features
	if ( s.start !== undefined ) {
		if(api === null) {
			settings._iDisplayStart    = s.start;
			settings.iInitDisplayStart = s.start;
		}
		else {
			_fnPageChange(settings, s.start/settings._iDisplayLength);
		}
	}

	// Order
	if ( s.order !== undefined ) {
		settings.aaSorting = [];
		$.each( s.order, function ( i, col ) {
			settings.aaSorting.push( col[0] >= columns.length ?
				[ 0, col[1] ] :
				col
			);
		} );
	}

	// Search
	if ( s.search !== undefined ) {
		$.extend( settings.oPreviousSearch, s.search );
	}

	// Columns
	if ( s.columns ) {
		for ( i=0, ien=s.columns.length ; i<ien ; i++ ) {
			var col = s.columns[i];

			// Visibility
			if ( col.visible !== undefined ) {
				// If the api is defined, the table has been initialised so we need to use it rather than internal settings
				if (api) {
					// Don't redraw the columns on every iteration of this loop, we will do this at the end instead
					api.column(i).visible(col.visible, false);
				}
				else {
					columns[i].bVisible = col.visible;
				}
			}

			// Search
			if ( col.search !== undefined ) {
				$.extend( settings.aoPreSearchCols[i], col.search );
			}
		}
		
		// If the api is defined then we need to adjust the columns once the visibility has been changed
		if (api) {
			api.columns.adjust();
		}
	}

	settings._bLoadingState = false;
	_fnCallbackFire( settings, 'aoStateLoaded', 'stateLoaded', [settings, s] );
	callback();
}

/**
 * Log an error message
 *  @param {object} settings dataTables settings object
 *  @param {int} level log error messages, or display them to the user
 *  @param {string} msg error message
 *  @param {int} tn Technical note id to get more information about the error.
 *  @memberof DataTable#oApi
 */
function _fnLog( settings, level, msg, tn )
{
	msg = 'DataTables warning: '+
		(settings ? 'table id='+settings.sTableId+' - ' : '')+msg;

	if ( tn ) {
		msg += '. For more information about this error, please see '+
		'https://datatables.net/tn/'+tn;
	}

	if ( ! level  ) {
		// Backwards compatibility pre 1.10
		var ext = DataTable.ext;
		var type = ext.sErrMode || ext.errMode;

		if ( settings ) {
			_fnCallbackFire( settings, null, 'dt-error', [ settings, tn, msg ], true );
		}

		if ( type == 'alert' ) {
			alert( msg );
		}
		else if ( type == 'throw' ) {
			throw new Error(msg);
		}
		else if ( typeof type == 'function' ) {
			type( settings, tn, msg );
		}
	}
	else if ( window.console && console.log ) {
		console.log( msg );
	}
}


/**
 * See if a property is defined on one object, if so assign it to the other object
 *  @param {object} ret target object
 *  @param {object} src source object
 *  @param {string} name property
 *  @param {string} [mappedName] name to map too - optional, name used if not given
 *  @memberof DataTable#oApi
 */
function _fnMap( ret, src, name, mappedName )
{
	if ( Array.isArray( name ) ) {
		$.each( name, function (i, val) {
			if ( Array.isArray( val ) ) {
				_fnMap( ret, src, val[0], val[1] );
			}
			else {
				_fnMap( ret, src, val );
			}
		} );

		return;
	}

	if ( mappedName === undefined ) {
		mappedName = name;
	}

	if ( src[name] !== undefined ) {
		ret[mappedName] = src[name];
	}
}


/**
 * Extend objects - very similar to jQuery.extend, but deep copy objects, and
 * shallow copy arrays. The reason we need to do this, is that we don't want to
 * deep copy array init values (such as aaSorting) since the dev wouldn't be
 * able to override them, but we do want to deep copy arrays.
 *  @param {object} out Object to extend
 *  @param {object} extender Object from which the properties will be applied to
 *      out
 *  @param {boolean} breakRefs If true, then arrays will be sliced to take an
 *      independent copy with the exception of the `data` or `aaData` parameters
 *      if they are present. This is so you can pass in a collection to
 *      DataTables and have that used as your data source without breaking the
 *      references
 *  @returns {object} out Reference, just for convenience - out === the return.
 *  @memberof DataTable#oApi
 *  @todo This doesn't take account of arrays inside the deep copied objects.
 */
function _fnExtend( out, extender, breakRefs )
{
	var val;

	for ( var prop in extender ) {
		if ( Object.prototype.hasOwnProperty.call(extender, prop) ) {
			val = extender[prop];

			if ( $.isPlainObject( val ) ) {
				if ( ! $.isPlainObject( out[prop] ) ) {
					out[prop] = {};
				}
				$.extend( true, out[prop], val );
			}
			else if ( breakRefs && prop !== 'data' && prop !== 'aaData' && Array.isArray(val) ) {
				out[prop] = val.slice();
			}
			else {
				out[prop] = val;
			}
		}
	}

	return out;
}


/**
 * Bind an event handers to allow a click or return key to activate the callback.
 * This is good for accessibility since a return on the keyboard will have the
 * same effect as a click, if the element has focus.
 *  @param {element} n Element to bind the action to
 *  @param {object|string} selector Selector (for delegated events) or data object
 *   to pass to the triggered function
 *  @param {function} fn Callback function for when the event is triggered
 *  @memberof DataTable#oApi
 */
function _fnBindAction( n, selector, fn )
{
	$(n)
		.on( 'click.DT', selector, function (e) {
			fn(e);
		} )
		.on( 'keypress.DT', selector, function (e){
			if ( e.which === 13 ) {
				e.preventDefault();
				fn(e);
			}
		} )
		.on( 'selectstart.DT', selector, function () {
			// Don't want a double click resulting in text selection
			return false;
		} );
}


/**
 * Register a callback function. Easily allows a callback function to be added to
 * an array store of callback functions that can then all be called together.
 *  @param {object} settings dataTables settings object
 *  @param {string} store Name of the array storage for the callbacks in oSettings
 *  @param {function} fn Function to be called back
 *  @memberof DataTable#oApi
 */
function _fnCallbackReg( settings, store, fn )
{
	if ( fn ) {
		settings[store].push(fn);
	}
}


/**
 * Fire callback functions and trigger events. Note that the loop over the
 * callback array store is done backwards! Further note that you do not want to
 * fire off triggers in time sensitive applications (for example cell creation)
 * as its slow.
 *  @param {object} settings dataTables settings object
 *  @param {string} callbackArr Name of the array storage for the callbacks in
 *      oSettings
 *  @param {string} eventName Name of the jQuery custom event to trigger. If
 *      null no trigger is fired
 *  @param {array} args Array of arguments to pass to the callback function /
 *      trigger
 *  @param {boolean} [bubbles] True if the event should bubble
 *  @memberof DataTable#oApi
 */
function _fnCallbackFire( settings, callbackArr, eventName, args, bubbles )
{
	var ret = [];

	if ( callbackArr ) {
		ret = settings[callbackArr].slice().reverse().map( function (val) {
			return val.apply( settings.oInstance, args );
		} );
	}

	if ( eventName !== null) {
		var e = $.Event( eventName+'.dt' );
		var table = $(settings.nTable);
		
		// Expose the DataTables API on the event object for easy access
		e.dt = settings.api;

		table[bubbles ?  'trigger' : 'triggerHandler']( e, args );

		// If not yet attached to the document, trigger the event
		// on the body directly to sort of simulate the bubble
		if (bubbles && table.parents('body').length === 0) {
			$('body').trigger( e, args );
		}

		ret.push( e.result );
	}

	return ret;
}


function _fnLengthOverflow ( settings )
{
	var
		start = settings._iDisplayStart,
		end = settings.fnDisplayEnd(),
		len = settings._iDisplayLength;

	/* If we have space to show extra rows (backing up from the end point - then do so */
	if ( start >= end )
	{
		start = end - len;
	}

	// Keep the start record on the current page
	start -= (start % len);

	if ( len === -1 || start < 0 )
	{
		start = 0;
	}

	settings._iDisplayStart = start;
}


function _fnRenderer( settings, type )
{
	var renderer = settings.renderer;
	var host = DataTable.ext.renderer[type];

	if ( $.isPlainObject( renderer ) && renderer[type] ) {
		// Specific renderer for this type. If available use it, otherwise use
		// the default.
		return host[renderer[type]] || host._;
	}
	else if ( typeof renderer === 'string' ) {
		// Common renderer - if there is one available for this type use it,
		// otherwise use the default
		return host[renderer] || host._;
	}

	// Use the default
	return host._;
}


/**
 * Detect the data source being used for the table. Used to simplify the code
 * a little (ajax) and to make it compress a little smaller.
 *
 *  @param {object} settings dataTables settings object
 *  @returns {string} Data source
 *  @memberof DataTable#oApi
 */
function _fnDataSource ( settings )
{
	if ( settings.oFeatures.bServerSide ) {
		return 'ssp';
	}
	else if ( settings.ajax ) {
		return 'ajax';
	}
	return 'dom';
}

/**
 * Common replacement for language strings
 *
 * @param {*} settings DT settings object
 * @param {*} str String with values to replace
 * @param {*} entries Plural number for _ENTRIES_ - can be undefined
 * @returns String
 */
function _fnMacros ( settings, str, entries )
{
	// When infinite scrolling, we are always starting at 1. _iDisplayStart is
	// used only internally
	var
		formatter  = settings.fnFormatNumber,
		start      = settings._iDisplayStart+1,
		len        = settings._iDisplayLength,
		vis        = settings.fnRecordsDisplay(),
		max        = settings.fnRecordsTotal(),
		all        = len === -1;

	return str.
		replace(/_START_/g, formatter.call( settings, start ) ).
		replace(/_END_/g,   formatter.call( settings, settings.fnDisplayEnd() ) ).
		replace(/_MAX_/g,   formatter.call( settings, max ) ).
		replace(/_TOTAL_/g, formatter.call( settings, vis ) ).
		replace(/_PAGE_/g,  formatter.call( settings, all ? 1 : Math.ceil( start / len ) ) ).
		replace(/_PAGES_/g, formatter.call( settings, all ? 1 : Math.ceil( vis / len ) ) ).
		replace(/_ENTRIES_/g, settings.api.i18n('entries', '', entries) ).
		replace(/_ENTRIES-MAX_/g, settings.api.i18n('entries', '', max) ).
		replace(/_ENTRIES-TOTAL_/g, settings.api.i18n('entries', '', vis) );
}



/**
 * Computed structure of the DataTables API, defined by the options passed to
 * `DataTable.Api.register()` when building the API.
 *
 * The structure is built in order to speed creation and extension of the Api
 * objects since the extensions are effectively pre-parsed.
 *
 * The array is an array of objects with the following structure, where this
 * base array represents the Api prototype base:
 *
 *     [
 *       {
 *         name:      'data'                -- string   - Property name
 *         val:       function () {},       -- function - Api method (or undefined if just an object
 *         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
 *         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
 *       },
 *       {
 *         name:     'row'
 *         val:       {},
 *         methodExt: [ ... ],
 *         propExt:   [
 *           {
 *             name:      'data'
 *             val:       function () {},
 *             methodExt: [ ... ],
 *             propExt:   [ ... ]
 *           },
 *           ...
 *         ]
 *       }
 *     ]
 *
 * @type {Array}
 * @ignore
 */
var __apiStruct = [];


/**
 * `Array.prototype` reference.
 *
 * @type object
 * @ignore
 */
var __arrayProto = Array.prototype;


/**
 * Abstraction for `context` parameter of the `Api` constructor to allow it to
 * take several different forms for ease of use.
 *
 * Each of the input parameter types will be converted to a DataTables settings
 * object where possible.
 *
 * @param  {string|node|jQuery|object} mixed DataTable identifier. Can be one
 *   of:
 *
 *   * `string` - jQuery selector. Any DataTables' matching the given selector
 *     with be found and used.
 *   * `node` - `TABLE` node which has already been formed into a DataTable.
 *   * `jQuery` - A jQuery object of `TABLE` nodes.
 *   * `object` - DataTables settings object
 *   * `DataTables.Api` - API instance
 * @return {array|null} Matching DataTables settings objects. `null` or
 *   `undefined` is returned if no matching DataTable is found.
 * @ignore
 */
var _toSettings = function ( mixed )
{
	var idx, jq;
	var settings = DataTable.settings;
	var tables = _pluck(settings, 'nTable');

	if ( ! mixed ) {
		return [];
	}
	else if ( mixed.nTable && mixed.oFeatures ) {
		// DataTables settings object
		return [ mixed ];
	}
	else if ( mixed.nodeName && mixed.nodeName.toLowerCase() === 'table' ) {
		// Table node
		idx = tables.indexOf(mixed);
		return idx !== -1 ? [ settings[idx] ] : null;
	}
	else if ( mixed && typeof mixed.settings === 'function' ) {
		return mixed.settings().toArray();
	}
	else if ( typeof mixed === 'string' ) {
		// jQuery selector
		jq = $(mixed).get();
	}
	else if ( mixed instanceof $ ) {
		// jQuery object (also DataTables instance)
		jq = mixed.get();
	}

	if ( jq ) {
		return settings.filter(function (v, idx) {
			return jq.includes(tables[idx]);
		});
	}
};


/**
 * DataTables API class - used to control and interface with  one or more
 * DataTables enhanced tables.
 *
 * The API class is heavily based on jQuery, presenting a chainable interface
 * that you can use to interact with tables. Each instance of the API class has
 * a "context" - i.e. the tables that it will operate on. This could be a single
 * table, all tables on a page or a sub-set thereof.
 *
 * Additionally the API is designed to allow you to easily work with the data in
 * the tables, retrieving and manipulating it as required. This is done by
 * presenting the API class as an array like interface. The contents of the
 * array depend upon the actions requested by each method (for example
 * `rows().nodes()` will return an array of nodes, while `rows().data()` will
 * return an array of objects or arrays depending upon your table's
 * configuration). The API object has a number of array like methods (`push`,
 * `pop`, `reverse` etc) as well as additional helper methods (`each`, `pluck`,
 * `unique` etc) to assist your working with the data held in a table.
 *
 * Most methods (those which return an Api instance) are chainable, which means
 * the return from a method call also has all of the methods available that the
 * top level object had. For example, these two calls are equivalent:
 *
 *     // Not chained
 *     api.row.add( {...} );
 *     api.draw();
 *
 *     // Chained
 *     api.row.add( {...} ).draw();
 *
 * @class DataTable.Api
 * @param {array|object|string|jQuery} context DataTable identifier. This is
 *   used to define which DataTables enhanced tables this API will operate on.
 *   Can be one of:
 *
 *   * `string` - jQuery selector. Any DataTables' matching the given selector
 *     with be found and used.
 *   * `node` - `TABLE` node which has already been formed into a DataTable.
 *   * `jQuery` - A jQuery object of `TABLE` nodes.
 *   * `object` - DataTables settings object
 * @param {array} [data] Data to initialise the Api instance with.
 *
 * @example
 *   // Direct initialisation during DataTables construction
 *   var api = $('#example').DataTable();
 *
 * @example
 *   // Initialisation using a DataTables jQuery object
 *   var api = $('#example').dataTable().api();
 *
 * @example
 *   // Initialisation as a constructor
 *   var api = new DataTable.Api( 'table.dataTable' );
 */
_Api = function ( context, data )
{
	if ( ! (this instanceof _Api) ) {
		return new _Api( context, data );
	}

	var i;
	var settings = [];
	var ctxSettings = function ( o ) {
		var a = _toSettings( o );
		if ( a ) {
			settings.push.apply( settings, a );
		}
	};

	if ( Array.isArray( context ) ) {
		for ( i=0 ; i<context.length ; i++ ) {
			ctxSettings( context[i] );
		}
	}
	else {
		ctxSettings( context );
	}

	// Remove duplicates
	this.context = settings.length > 1
		? _unique( settings )
		: settings;

	// Initial data
	if ( data ) {
		// Chrome can throw a max stack error if apply is called with
		// too large an array, but apply is faster.
		if (data.length < 10000) {
			this.push.apply(this, data);
		}
		else {
			for (i=0 ; i<data.length ; i++) {
				this.push(data[i]);
			}
		}
	}

	// selector
	this.selector = {
		rows: null,
		cols: null,
		opts: null
	};

	_Api.extend( this, this, __apiStruct );
};

DataTable.Api = _Api;

// Don't destroy the existing prototype, just extend it. Required for jQuery 2's
// isPlainObject.
$.extend( _Api.prototype, {
	any: function ()
	{
		return this.count() !== 0;
	},

	context: [], // array of table settings objects

	count: function ()
	{
		return this.flatten().length;
	},

	each: function ( fn )
	{
		for ( var i=0, ien=this.length ; i<ien; i++ ) {
			fn.call( this, this[i], i, this );
		}

		return this;
	},

	eq: function ( idx )
	{
		var ctx = this.context;

		return ctx.length > idx ?
			new _Api( ctx[idx], this[idx] ) :
			null;
	},

	filter: function ( fn )
	{
		var a = __arrayProto.filter.call( this, fn, this );

		return new _Api( this.context, a );
	},

	flatten: function ()
	{
		var a = [];

		return new _Api( this.context, a.concat.apply( a, this.toArray() ) );
	},

	get: function ( idx )
	{
		return this[ idx ];
	},

	join:    __arrayProto.join,

	includes: function ( find ) {
		return this.indexOf( find ) === -1 ? false : true;
	},

	indexOf: __arrayProto.indexOf,

	iterator: function ( flatten, type, fn, alwaysNew ) {
		var
			a = [], ret,
			i, ien, j, jen,
			context = this.context,
			rows, items, item,
			selector = this.selector;

		// Argument shifting
		if ( typeof flatten === 'string' ) {
			alwaysNew = fn;
			fn = type;
			type = flatten;
			flatten = false;
		}

		for ( i=0, ien=context.length ; i<ien ; i++ ) {
			var apiInst = new _Api( context[i] );

			if ( type === 'table' ) {
				ret = fn.call( apiInst, context[i], i );

				if ( ret !== undefined ) {
					a.push( ret );
				}
			}
			else if ( type === 'columns' || type === 'rows' ) {
				// this has same length as context - one entry for each table
				ret = fn.call( apiInst, context[i], this[i], i );

				if ( ret !== undefined ) {
					a.push( ret );
				}
			}
			else if ( type === 'every' || type === 'column' || type === 'column-rows' || type === 'row' || type === 'cell' ) {
				// columns and rows share the same structure.
				// 'this' is an array of column indexes for each context
				items = this[i];

				if ( type === 'column-rows' ) {
					rows = _selector_row_indexes( context[i], selector.opts );
				}

				for ( j=0, jen=items.length ; j<jen ; j++ ) {
					item = items[j];

					if ( type === 'cell' ) {
						ret = fn.call( apiInst, context[i], item.row, item.column, i, j );
					}
					else {
						ret = fn.call( apiInst, context[i], item, i, j, rows );
					}

					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
			}
		}

		if ( a.length || alwaysNew ) {
			var api = new _Api( context, flatten ? a.concat.apply( [], a ) : a );
			var apiSelector = api.selector;
			apiSelector.rows = selector.rows;
			apiSelector.cols = selector.cols;
			apiSelector.opts = selector.opts;
			return api;
		}
		return this;
	},

	lastIndexOf: __arrayProto.lastIndexOf,

	length:  0,

	map: function ( fn )
	{
		var a = __arrayProto.map.call( this, fn, this );

		return new _Api( this.context, a );
	},

	pluck: function ( prop )
	{
		var fn = DataTable.util.get(prop);

		return this.map( function ( el ) {
			return fn(el);
		} );
	},

	pop:     __arrayProto.pop,

	push:    __arrayProto.push,

	reduce: __arrayProto.reduce,

	reduceRight: __arrayProto.reduceRight,

	reverse: __arrayProto.reverse,

	// Object with rows, columns and opts
	selector: null,

	shift:   __arrayProto.shift,

	slice: function () {
		return new _Api( this.context, this );
	},

	sort:    __arrayProto.sort,

	splice:  __arrayProto.splice,

	toArray: function ()
	{
		return __arrayProto.slice.call( this );
	},

	to$: function ()
	{
		return $( this );
	},

	toJQuery: function ()
	{
		return $( this );
	},

	unique: function ()
	{
		return new _Api( this.context, _unique(this.toArray()) );
	},

	unshift: __arrayProto.unshift
} );


function _api_scope( scope, fn, struc ) {
	return function () {
		var ret = fn.apply( scope || this, arguments );

		// Method extension
		_Api.extend( ret, ret, struc.methodExt );
		return ret;
	};
}

function _api_find( src, name ) {
	for ( var i=0, ien=src.length ; i<ien ; i++ ) {
		if ( src[i].name === name ) {
			return src[i];
		}
	}
	return null;
}

window.__apiStruct = __apiStruct;

_Api.extend = function ( scope, obj, ext )
{
	// Only extend API instances and static properties of the API
	if ( ! ext.length || ! obj || ( ! (obj instanceof _Api) && ! obj.__dt_wrapper ) ) {
		return;
	}

	var
		i, ien,
		struct;

	for ( i=0, ien=ext.length ; i<ien ; i++ ) {
		struct = ext[i];

		if (struct.name === '__proto__') {
			continue;
		}

		// Value
		obj[ struct.name ] = struct.type === 'function' ?
			_api_scope( scope, struct.val, struct ) :
			struct.type === 'object' ?
				{} :
				struct.val;

		obj[ struct.name ].__dt_wrapper = true;

		// Property extension
		_Api.extend( scope, obj[ struct.name ], struct.propExt );
	}
};

//     [
//       {
//         name:      'data'                -- string   - Property name
//         val:       function () {},       -- function - Api method (or undefined if just an object
//         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
//         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
//       },
//       {
//         name:     'row'
//         val:       {},
//         methodExt: [ ... ],
//         propExt:   [
//           {
//             name:      'data'
//             val:       function () {},
//             methodExt: [ ... ],
//             propExt:   [ ... ]
//           },
//           ...
//         ]
//       }
//     ]


_Api.register = _api_register = function ( name, val )
{
	if ( Array.isArray( name ) ) {
		for ( var j=0, jen=name.length ; j<jen ; j++ ) {
			_Api.register( name[j], val );
		}
		return;
	}

	var
		i, ien,
		heir = name.split('.'),
		struct = __apiStruct,
		key, method;

	for ( i=0, ien=heir.length ; i<ien ; i++ ) {
		method = heir[i].indexOf('()') !== -1;
		key = method ?
			heir[i].replace('()', '') :
			heir[i];

		var src = _api_find( struct, key );
		if ( ! src ) {
			src = {
				name:      key,
				val:       {},
				methodExt: [],
				propExt:   [],
				type:      'object'
			};
			struct.push( src );
		}

		if ( i === ien-1 ) {
			src.val = val;
			src.type = typeof val === 'function' ?
				'function' :
				$.isPlainObject( val ) ?
					'object' :
					'other';
		}
		else {
			struct = method ?
				src.methodExt :
				src.propExt;
		}
	}
};

_Api.registerPlural = _api_registerPlural = function ( pluralName, singularName, val ) {
	_Api.register( pluralName, val );

	_Api.register( singularName, function () {
		var ret = val.apply( this, arguments );

		if ( ret === this ) {
			// Returned item is the API instance that was passed in, return it
			return this;
		}
		else if ( ret instanceof _Api ) {
			// New API instance returned, want the value from the first item
			// in the returned array for the singular result.
			return ret.length ?
				Array.isArray( ret[0] ) ?
					new _Api( ret.context, ret[0] ) : // Array results are 'enhanced'
					ret[0] :
				undefined;
		}

		// Non-API return - just fire it back
		return ret;
	} );
};


/**
 * Selector for HTML tables. Apply the given selector to the give array of
 * DataTables settings objects.
 *
 * @param {string|integer} [selector] jQuery selector string or integer
 * @param  {array} Array of DataTables settings objects to be filtered
 * @return {array}
 * @ignore
 */
var __table_selector = function ( selector, a )
{
	if ( Array.isArray(selector) ) {
		var result = [];

		selector.forEach(function (sel) {
			var inner = __table_selector(sel, a);

			result.push.apply(result, inner);
		});

		return result.filter( function (item) {
			return item;
		});
	}

	// Integer is used to pick out a table by index
	if ( typeof selector === 'number' ) {
		return [ a[ selector ] ];
	}

	// Perform a jQuery selector on the table nodes
	var nodes = a.map( function (el) {
		return el.nTable;
	} );

	return $(nodes)
		.filter( selector )
		.map( function () {
			// Need to translate back from the table node to the settings
			var idx = nodes.indexOf(this);
			return a[ idx ];
		} )
		.toArray();
};



/**
 * Context selector for the API's context (i.e. the tables the API instance
 * refers to.
 *
 * @name    DataTable.Api#tables
 * @param {string|integer} [selector] Selector to pick which tables the iterator
 *   should operate on. If not given, all tables in the current context are
 *   used. This can be given as a jQuery selector (for example `':gt(0)'`) to
 *   select multiple tables or as an integer to select a single table.
 * @returns {DataTable.Api} Returns a new API instance if a selector is given.
 */
_api_register( 'tables()', function ( selector ) {
	// A new instance is created if there was a selector specified
	return selector !== undefined && selector !== null ?
		new _Api( __table_selector( selector, this.context ) ) :
		this;
} );


_api_register( 'table()', function ( selector ) {
	var tables = this.tables( selector );
	var ctx = tables.context;

	// Truncate to the first matched table
	return ctx.length ?
		new _Api( ctx[0] ) :
		tables;
} );

// Common methods, combined to reduce size
[
	['nodes', 'node', 'nTable'],
	['body', 'body', 'nTBody'],
	['header', 'header', 'nTHead'],
	['footer', 'footer', 'nTFoot'],
].forEach(function (item) {
	_api_registerPlural(
		'tables().' + item[0] + '()',
		'table().' + item[1] + '()' ,
		function () {
			return this.iterator( 'table', function ( ctx ) {
				return ctx[item[2]];
			}, 1 );
		}
	);
});

// Structure methods
[
	['header', 'aoHeader'],
	['footer', 'aoFooter'],
].forEach(function (item) {
	_api_register( 'table().' + item[0] + '.structure()' , function (selector) {
		var indexes = this.columns(selector).indexes().flatten();
		var ctx = this.context[0];
		
		return _fnHeaderLayout(ctx, ctx[item[1]], indexes);
	} );
})


_api_registerPlural( 'tables().containers()', 'table().container()' , function () {
	return this.iterator( 'table', function ( ctx ) {
		return ctx.nTableWrapper;
	}, 1 );
} );

_api_register( 'tables().every()', function ( fn ) {
	var that = this;

	return this.iterator('table', function (s, i) {
		fn.call(that.table(i), i);
	});
});

_api_register( 'caption()', function ( value, side ) {
	var context = this.context;

	// Getter - return existing node's content
	if ( value === undefined ) {
		var caption = context[0].captionNode;

		return caption && context.length ?
			caption.innerHTML : 
			null;
	}

	return this.iterator( 'table', function ( ctx ) {
		var table = $(ctx.nTable);
		var caption = $(ctx.captionNode);
		var container = $(ctx.nTableWrapper);

		// Create the node if it doesn't exist yet
		if ( ! caption.length ) {
			caption = $('<caption/>').html( value );
			ctx.captionNode = caption[0];

			// If side isn't set, we need to insert into the document to let the
			// CSS decide so we can read it back, otherwise there is no way to
			// know if the CSS would put it top or bottom for scrolling
			if (! side) {
				table.prepend(caption);

				side = caption.css('caption-side');
			}
		}

		caption.html( value );

		if ( side ) {
			caption.css( 'caption-side', side );
			caption[0]._captionSide = side;
		}

		if (container.find('div.dataTables_scroll').length) {
			var selector = (side === 'top' ? 'Head' : 'Foot');

			container.find('div.dataTables_scroll'+ selector +' table').prepend(caption);
		}
		else {
			table.prepend(caption);
		}
	}, 1 );
} );

_api_register( 'caption.node()', function () {
	var ctx = this.context;

	return ctx.length ? ctx[0].captionNode : null;
} );


/**
 * Redraw the tables in the current context.
 */
_api_register( 'draw()', function ( paging ) {
	return this.iterator( 'table', function ( settings ) {
		if ( paging === 'page' ) {
			_fnDraw( settings );
		}
		else {
			if ( typeof paging === 'string' ) {
				paging = paging === 'full-hold' ?
					false :
					true;
			}

			_fnReDraw( settings, paging===false );
		}
	} );
} );



/**
 * Get the current page index.
 *
 * @return {integer} Current page index (zero based)
 *//**
 * Set the current page.
 *
 * Note that if you attempt to show a page which does not exist, DataTables will
 * not throw an error, but rather reset the paging.
 *
 * @param {integer|string} action The paging action to take. This can be one of:
 *  * `integer` - The page index to jump to
 *  * `string` - An action to take:
 *    * `first` - Jump to first page.
 *    * `next` - Jump to the next page
 *    * `previous` - Jump to previous page
 *    * `last` - Jump to the last page.
 * @returns {DataTables.Api} this
 */
_api_register( 'page()', function ( action ) {
	if ( action === undefined ) {
		return this.page.info().page; // not an expensive call
	}

	// else, have an action to take on all tables
	return this.iterator( 'table', function ( settings ) {
		_fnPageChange( settings, action );
	} );
} );


/**
 * Paging information for the first table in the current context.
 *
 * If you require paging information for another table, use the `table()` method
 * with a suitable selector.
 *
 * @return {object} Object with the following properties set:
 *  * `page` - Current page index (zero based - i.e. the first page is `0`)
 *  * `pages` - Total number of pages
 *  * `start` - Display index for the first record shown on the current page
 *  * `end` - Display index for the last record shown on the current page
 *  * `length` - Display length (number of records). Note that generally `start
 *    + length = end`, but this is not always true, for example if there are
 *    only 2 records to show on the final page, with a length of 10.
 *  * `recordsTotal` - Full data set length
 *  * `recordsDisplay` - Data set length once the current filtering criterion
 *    are applied.
 */
_api_register( 'page.info()', function () {
	if ( this.context.length === 0 ) {
		return undefined;
	}

	var
		settings   = this.context[0],
		start      = settings._iDisplayStart,
		len        = settings.oFeatures.bPaginate ? settings._iDisplayLength : -1,
		visRecords = settings.fnRecordsDisplay(),
		all        = len === -1;

	return {
		"page":           all ? 0 : Math.floor( start / len ),
		"pages":          all ? 1 : Math.ceil( visRecords / len ),
		"start":          start,
		"end":            settings.fnDisplayEnd(),
		"length":         len,
		"recordsTotal":   settings.fnRecordsTotal(),
		"recordsDisplay": visRecords,
		"serverSide":     _fnDataSource( settings ) === 'ssp'
	};
} );


/**
 * Get the current page length.
 *
 * @return {integer} Current page length. Note `-1` indicates that all records
 *   are to be shown.
 *//**
 * Set the current page length.
 *
 * @param {integer} Page length to set. Use `-1` to show all records.
 * @returns {DataTables.Api} this
 */
_api_register( 'page.len()', function ( len ) {
	// Note that we can't call this function 'length()' because `length`
	// is a Javascript property of functions which defines how many arguments
	// the function expects.
	if ( len === undefined ) {
		return this.context.length !== 0 ?
			this.context[0]._iDisplayLength :
			undefined;
	}

	// else, set the page length
	return this.iterator( 'table', function ( settings ) {
		_fnLengthChange( settings, len );
	} );
} );



var __reload = function ( settings, holdPosition, callback ) {
	// Use the draw event to trigger a callback
	if ( callback ) {
		var api = new _Api( settings );

		api.one( 'draw', function () {
			callback( api.ajax.json() );
		} );
	}

	if ( _fnDataSource( settings ) == 'ssp' ) {
		_fnReDraw( settings, holdPosition );
	}
	else {
		_fnProcessingDisplay( settings, true );

		// Cancel an existing request
		var xhr = settings.jqXHR;
		if ( xhr && xhr.readyState !== 4 ) {
			xhr.abort();
		}

		// Trigger xhr
		_fnBuildAjax( settings, {}, function( json ) {
			_fnClearTable( settings );

			var data = _fnAjaxDataSrc( settings, json );
			for ( var i=0, ien=data.length ; i<ien ; i++ ) {
				_fnAddData( settings, data[i] );
			}

			_fnReDraw( settings, holdPosition );
			_fnInitComplete( settings );
			_fnProcessingDisplay( settings, false );
		} );
	}
};


/**
 * Get the JSON response from the last Ajax request that DataTables made to the
 * server. Note that this returns the JSON from the first table in the current
 * context.
 *
 * @return {object} JSON received from the server.
 */
_api_register( 'ajax.json()', function () {
	var ctx = this.context;

	if ( ctx.length > 0 ) {
		return ctx[0].json;
	}

	// else return undefined;
} );


/**
 * Get the data submitted in the last Ajax request
 */
_api_register( 'ajax.params()', function () {
	var ctx = this.context;

	if ( ctx.length > 0 ) {
		return ctx[0].oAjaxData;
	}

	// else return undefined;
} );


/**
 * Reload tables from the Ajax data source. Note that this function will
 * automatically re-draw the table when the remote data has been loaded.
 *
 * @param {boolean} [reset=true] Reset (default) or hold the current paging
 *   position. A full re-sort and re-filter is performed when this method is
 *   called, which is why the pagination reset is the default action.
 * @returns {DataTables.Api} this
 */
_api_register( 'ajax.reload()', function ( callback, resetPaging ) {
	return this.iterator( 'table', function (settings) {
		__reload( settings, resetPaging===false, callback );
	} );
} );


/**
 * Get the current Ajax URL. Note that this returns the URL from the first
 * table in the current context.
 *
 * @return {string} Current Ajax source URL
 *//**
 * Set the Ajax URL. Note that this will set the URL for all tables in the
 * current context.
 *
 * @param {string} url URL to set.
 * @returns {DataTables.Api} this
 */
_api_register( 'ajax.url()', function ( url ) {
	var ctx = this.context;

	if ( url === undefined ) {
		// get
		if ( ctx.length === 0 ) {
			return undefined;
		}
		ctx = ctx[0];

		return $.isPlainObject( ctx.ajax ) ?
			ctx.ajax.url :
			ctx.ajax;
	}

	// set
	return this.iterator( 'table', function ( settings ) {
		if ( $.isPlainObject( settings.ajax ) ) {
			settings.ajax.url = url;
		}
		else {
			settings.ajax = url;
		}
	} );
} );


/**
 * Load data from the newly set Ajax URL. Note that this method is only
 * available when `ajax.url()` is used to set a URL. Additionally, this method
 * has the same effect as calling `ajax.reload()` but is provided for
 * convenience when setting a new URL. Like `ajax.reload()` it will
 * automatically redraw the table once the remote data has been loaded.
 *
 * @returns {DataTables.Api} this
 */
_api_register( 'ajax.url().load()', function ( callback, resetPaging ) {
	// Same as a reload, but makes sense to present it for easy access after a
	// url change
	return this.iterator( 'table', function ( ctx ) {
		__reload( ctx, resetPaging===false, callback );
	} );
} );




var _selector_run = function ( type, selector, selectFn, settings, opts )
{
	var
		out = [], res,
		a, i, ien, j, jen,
		selectorType = typeof selector;

	// Can't just check for isArray here, as an API or jQuery instance might be
	// given with their array like look
	if ( ! selector || selectorType === 'string' || selectorType === 'function' || selector.length === undefined ) {
		selector = [ selector ];
	}

	for ( i=0, ien=selector.length ; i<ien ; i++ ) {
		// Only split on simple strings - complex expressions will be jQuery selectors
		a = selector[i] && selector[i].split && ! selector[i].match(/[[(:]/) ?
			selector[i].split(',') :
			[ selector[i] ];

		for ( j=0, jen=a.length ; j<jen ; j++ ) {
			res = selectFn( typeof a[j] === 'string' ? (a[j]).trim() : a[j] );

			// Remove empty items
			res = res.filter( function (item) {
				return item !== null && item !== undefined;
			});

			if ( res && res.length ) {
				out = out.concat( res );
			}
		}
	}

	// selector extensions
	var ext = _ext.selector[ type ];
	if ( ext.length ) {
		for ( i=0, ien=ext.length ; i<ien ; i++ ) {
			out = ext[i]( settings, opts, out );
		}
	}

	return _unique( out );
};


var _selector_opts = function ( opts )
{
	if ( ! opts ) {
		opts = {};
	}

	// Backwards compatibility for 1.9- which used the terminology filter rather
	// than search
	if ( opts.filter && opts.search === undefined ) {
		opts.search = opts.filter;
	}

	return $.extend( {
		search: 'none',
		order: 'current',
		page: 'all'
	}, opts );
};


// Reduce the API instance to the first item found
var _selector_first = function ( old )
{
	var inst = new _Api(old.context[0]);

	// Use a push rather than passing to the constructor, since it will
	// merge arrays down automatically, which isn't what is wanted here
	if (old.length) {
		inst.push( old[0] );
	}

	inst.selector = old.selector;

	// Limit to a single row / column / cell
	if (inst.length && inst[0].length > 1) {
		inst[0].splice(1);
	}

	return inst;
};


var _selector_row_indexes = function ( settings, opts )
{
	var
		i, ien, tmp, a=[],
		displayFiltered = settings.aiDisplay,
		displayMaster = settings.aiDisplayMaster;

	var
		search = opts.search,  // none, applied, removed
		order  = opts.order,   // applied, current, index (original - compatibility with 1.9)
		page   = opts.page;    // all, current

	if ( _fnDataSource( settings ) == 'ssp' ) {
		// In server-side processing mode, most options are irrelevant since
		// rows not shown don't exist and the index order is the applied order
		// Removed is a special case - for consistency just return an empty
		// array
		return search === 'removed' ?
			[] :
			_range( 0, displayMaster.length );
	}

	if ( page == 'current' ) {
		// Current page implies that order=current and filter=applied, since it is
		// fairly senseless otherwise, regardless of what order and search actually
		// are
		for ( i=settings._iDisplayStart, ien=settings.fnDisplayEnd() ; i<ien ; i++ ) {
			a.push( displayFiltered[i] );
		}
	}
	else if ( order == 'current' || order == 'applied' ) {
		if ( search == 'none') {
			a = displayMaster.slice();
		}
		else if ( search == 'applied' ) {
			a = displayFiltered.slice();
		}
		else if ( search == 'removed' ) {
			// O(n+m) solution by creating a hash map
			var displayFilteredMap = {};

			for ( i=0, ien=displayFiltered.length ; i<ien ; i++ ) {
				displayFilteredMap[displayFiltered[i]] = null;
			}

			displayMaster.forEach(function (item) {
				if (! Object.prototype.hasOwnProperty.call(displayFilteredMap, item)) {
					a.push(item);
				}
			});
		}
	}
	else if ( order == 'index' || order == 'original' ) {
		for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			if (! settings.aoData[i]) {
				continue;
			}

			if ( search == 'none' ) {
				a.push( i );
			}
			else { // applied | removed
				tmp = displayFiltered.indexOf(i);

				if ((tmp === -1 && search == 'removed') ||
					(tmp >= 0   && search == 'applied') )
				{
					a.push( i );
				}
			}
		}
	}
	else if ( typeof order === 'number' ) {
		// Order the rows by the given column
		var ordered = _fnSort(settings, order, 'asc');

		if (search === 'none') {
			a = ordered;
		}
		else { // applied | removed
			for (i=0; i<ordered.length; i++) {
				tmp = displayFiltered.indexOf(ordered[i]);

				if ((tmp === -1 && search == 'removed') ||
					(tmp >= 0   && search == 'applied') )
				{
					a.push( ordered[i] );
				}
			}
		}
	}

	return a;
};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Rows
 *
 * {}          - no selector - use all available rows
 * {integer}   - row aoData index
 * {node}      - TR node
 * {string}    - jQuery selector to apply to the TR elements
 * {array}     - jQuery array of nodes, or simply an array of TR nodes
 *
 */
var __row_selector = function ( settings, selector, opts )
{
	var rows;
	var run = function ( sel ) {
		var selInt = _intVal( sel );
		var aoData = settings.aoData;

		// Short cut - selector is a number and no options provided (default is
		// all records, so no need to check if the index is in there, since it
		// must be - dev error if the index doesn't exist).
		if ( selInt !== null && ! opts ) {
			return [ selInt ];
		}

		if ( ! rows ) {
			rows = _selector_row_indexes( settings, opts );
		}

		if ( selInt !== null && rows.indexOf(selInt) !== -1 ) {
			// Selector - integer
			return [ selInt ];
		}
		else if ( sel === null || sel === undefined || sel === '' ) {
			// Selector - none
			return rows;
		}

		// Selector - function
		if ( typeof sel === 'function' ) {
			return rows.map( function (idx) {
				var row = aoData[ idx ];
				return sel( idx, row._aData, row.nTr ) ? idx : null;
			} );
		}

		// Selector - node
		if ( sel.nodeName ) {
			var rowIdx = sel._DT_RowIndex;  // Property added by DT for fast lookup
			var cellIdx = sel._DT_CellIndex;

			if ( rowIdx !== undefined ) {
				// Make sure that the row is actually still present in the table
				return aoData[ rowIdx ] && aoData[ rowIdx ].nTr === sel ?
					[ rowIdx ] :
					[];
			}
			else if ( cellIdx ) {
				return aoData[ cellIdx.row ] && aoData[ cellIdx.row ].nTr === sel.parentNode ?
					[ cellIdx.row ] :
					[];
			}
			else {
				var host = $(sel).closest('*[data-dt-row]');
				return host.length ?
					[ host.data('dt-row') ] :
					[];
			}
		}

		// ID selector. Want to always be able to select rows by id, regardless
		// of if the tr element has been created or not, so can't rely upon
		// jQuery here - hence a custom implementation. This does not match
		// Sizzle's fast selector or HTML4 - in HTML5 the ID can be anything,
		// but to select it using a CSS selector engine (like Sizzle or
		// querySelect) it would need to need to be escaped for some characters.
		// DataTables simplifies this for row selectors since you can select
		// only a row. A # indicates an id any anything that follows is the id -
		// unescaped.
		if ( typeof sel === 'string' && sel.charAt(0) === '#' ) {
			// get row index from id
			var rowObj = settings.aIds[ sel.replace( /^#/, '' ) ];
			if ( rowObj !== undefined ) {
				return [ rowObj.idx ];
			}

			// need to fall through to jQuery in case there is DOM id that
			// matches
		}
		
		// Get nodes in the order from the `rows` array with null values removed
		var nodes = _removeEmpty(
			_pluck_order( settings.aoData, rows, 'nTr' )
		);

		// Selector - jQuery selector string, array of nodes or jQuery object/
		// As jQuery's .filter() allows jQuery objects to be passed in filter,
		// it also allows arrays, so this will cope with all three options
		return $(nodes)
			.filter( sel )
			.map( function () {
				return this._DT_RowIndex;
			} )
			.toArray();
	};

	var matched = _selector_run( 'row', selector, run, settings, opts );

	if (opts.order === 'current' || opts.order === 'applied') {
		_fnSortDisplay(settings, matched);
	}

	return matched;
};


_api_register( 'rows()', function ( selector, opts ) {
	// argument shifting
	if ( selector === undefined ) {
		selector = '';
	}
	else if ( $.isPlainObject( selector ) ) {
		opts = selector;
		selector = '';
	}

	opts = _selector_opts( opts );

	var inst = this.iterator( 'table', function ( settings ) {
		return __row_selector( settings, selector, opts );
	}, 1 );

	// Want argument shifting here and in __row_selector?
	inst.selector.rows = selector;
	inst.selector.opts = opts;

	return inst;
} );

_api_register( 'rows().nodes()', function () {
	return this.iterator( 'row', function ( settings, row ) {
		return settings.aoData[ row ].nTr || undefined;
	}, 1 );
} );

_api_register( 'rows().data()', function () {
	return this.iterator( true, 'rows', function ( settings, rows ) {
		return _pluck_order( settings.aoData, rows, '_aData' );
	}, 1 );
} );

_api_registerPlural( 'rows().cache()', 'row().cache()', function ( type ) {
	return this.iterator( 'row', function ( settings, row ) {
		var r = settings.aoData[ row ];
		return type === 'search' ? r._aFilterData : r._aSortData;
	}, 1 );
} );

_api_registerPlural( 'rows().invalidate()', 'row().invalidate()', function ( src ) {
	return this.iterator( 'row', function ( settings, row ) {
		_fnInvalidate( settings, row, src );
	} );
} );

_api_registerPlural( 'rows().indexes()', 'row().index()', function () {
	return this.iterator( 'row', function ( settings, row ) {
		return row;
	}, 1 );
} );

_api_registerPlural( 'rows().ids()', 'row().id()', function ( hash ) {
	var a = [];
	var context = this.context;

	// `iterator` will drop undefined values, but in this case we want them
	for ( var i=0, ien=context.length ; i<ien ; i++ ) {
		for ( var j=0, jen=this[i].length ; j<jen ; j++ ) {
			var id = context[i].rowIdFn( context[i].aoData[ this[i][j] ]._aData );
			a.push( (hash === true ? '#' : '' )+ id );
		}
	}

	return new _Api( context, a );
} );

_api_registerPlural( 'rows().remove()', 'row().remove()', function () {
	this.iterator( 'row', function ( settings, row ) {
		var data = settings.aoData;
		var rowData = data[ row ];

		// Delete from the display arrays
		var idx = settings.aiDisplayMaster.indexOf(row);
		if (idx !== -1) {
			settings.aiDisplayMaster.splice(idx, 1);
		}

		// For server-side processing tables - subtract the deleted row from the count
		if ( settings._iRecordsDisplay > 0 ) {
			settings._iRecordsDisplay--;
		}

		// Check for an 'overflow' they case for displaying the table
		_fnLengthOverflow( settings );

		// Remove the row's ID reference if there is one
		var id = settings.rowIdFn( rowData._aData );
		if ( id !== undefined ) {
			delete settings.aIds[ id ];
		}

		data[row] = null;
	} );

	return this;
} );


_api_register( 'rows.add()', function ( rows ) {
	var newRows = this.iterator( 'table', function ( settings ) {
			var row, i, ien;
			var out = [];

			for ( i=0, ien=rows.length ; i<ien ; i++ ) {
				row = rows[i];

				if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
					out.push( _fnAddTr( settings, row )[0] );
				}
				else {
					out.push( _fnAddData( settings, row ) );
				}
			}

			return out;
		}, 1 );

	// Return an Api.rows() extended instance, so rows().nodes() etc can be used
	var modRows = this.rows( -1 );
	modRows.pop();
	modRows.push.apply(modRows, newRows);

	return modRows;
} );





/**
 *
 */
_api_register( 'row()', function ( selector, opts ) {
	return _selector_first( this.rows( selector, opts ) );
} );


_api_register( 'row().data()', function ( data ) {
	var ctx = this.context;

	if ( data === undefined ) {
		// Get
		return ctx.length && this.length && this[0].length ?
			ctx[0].aoData[ this[0] ]._aData :
			undefined;
	}

	// Set
	var row = ctx[0].aoData[ this[0] ];
	row._aData = data;

	// If the DOM has an id, and the data source is an array
	if ( Array.isArray( data ) && row.nTr && row.nTr.id ) {
		_fnSetObjectDataFn( ctx[0].rowId )( data, row.nTr.id );
	}

	// Automatically invalidate
	_fnInvalidate( ctx[0], this[0], 'data' );

	return this;
} );


_api_register( 'row().node()', function () {
	var ctx = this.context;

	if (ctx.length && this.length && this[0].length) {
		var row = ctx[0].aoData[ this[0] ];

		if (row && row.nTr) {
			return row.nTr;
		}
	}

	return null;
} );


_api_register( 'row.add()', function ( row ) {
	// Allow a jQuery object to be passed in - only a single row is added from
	// it though - the first element in the set
	if ( row instanceof $ && row.length ) {
		row = row[0];
	}

	var rows = this.iterator( 'table', function ( settings ) {
		if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
			return _fnAddTr( settings, row )[0];
		}
		return _fnAddData( settings, row );
	} );

	// Return an Api.rows() extended instance, with the newly added row selected
	return this.row( rows[0] );
} );


$(document).on('plugin-init.dt', function (e, context) {
	var api = new _Api( context );

	api.on( 'stateSaveParams.DT', function ( e, settings, d ) {
		// This could be more compact with the API, but it is a lot faster as a simple
		// internal loop
		var idFn = settings.rowIdFn;
		var rows = settings.aiDisplayMaster;
		var ids = [];

		for (var i=0 ; i<rows.length ; i++) {
			var rowIdx = rows[i];
			var data = settings.aoData[rowIdx];

			if (data._detailsShow) {
				ids.push( '#' + idFn(data._aData) );
			}
		}

		d.childRows = ids;
	});

	// For future state loads (e.g. with StateRestore)
	api.on( 'stateLoaded.DT', function (e, settings, state) {
		__details_state_load( api, state );
	});

	// And the initial load state
	__details_state_load( api, api.state.loaded() );
});

var __details_state_load = function (api, state)
{
	if ( state && state.childRows ) {
		api
			.rows( state.childRows.map(function (id) {
				// Escape any `:` characters from the row id. Accounts for
				// already escaped characters.
				return id.replace(/([^:\\]*(?:\\.[^:\\]*)*):/g, "$1\\:");
			}) )
			.every( function () {
				_fnCallbackFire( api.settings()[0], null, 'requestChild', [ this ] )
			});
	}
}

var __details_add = function ( ctx, row, data, klass )
{
	// Convert to array of TR elements
	var rows = [];
	var addRow = function ( r, k ) {
		// Recursion to allow for arrays of jQuery objects
		if ( Array.isArray( r ) || r instanceof $ ) {
			for ( var i=0, ien=r.length ; i<ien ; i++ ) {
				addRow( r[i], k );
			}
			return;
		}

		// If we get a TR element, then just add it directly - up to the dev
		// to add the correct number of columns etc
		if ( r.nodeName && r.nodeName.toLowerCase() === 'tr' ) {
			r.setAttribute( 'data-dt-row', row.idx );
			rows.push( r );
		}
		else {
			// Otherwise create a row with a wrapper
			var created = $('<tr><td></td></tr>')
				.attr( 'data-dt-row', row.idx )
				.addClass( k );
			
			$('td', created)
				.addClass( k )
				.html( r )[0].colSpan = _fnVisbleColumns( ctx );

			rows.push( created[0] );
		}
	};

	addRow( data, klass );

	if ( row._details ) {
		row._details.detach();
	}

	row._details = $(rows);

	// If the children were already shown, that state should be retained
	if ( row._detailsShow ) {
		row._details.insertAfter( row.nTr );
	}
};


// Make state saving of child row details async to allow them to be batch processed
var __details_state = DataTable.util.throttle(
	function (ctx) {
		_fnSaveState( ctx[0] )
	},
	500
);


var __details_remove = function ( api, idx )
{
	var ctx = api.context;

	if ( ctx.length ) {
		var row = ctx[0].aoData[ idx !== undefined ? idx : api[0] ];

		if ( row && row._details ) {
			row._details.remove();

			row._detailsShow = undefined;
			row._details = undefined;
			$( row.nTr ).removeClass( 'dt-hasChild' );
			__details_state( ctx );
		}
	}
};


var __details_display = function ( api, show ) {
	var ctx = api.context;

	if ( ctx.length && api.length ) {
		var row = ctx[0].aoData[ api[0] ];

		if ( row._details ) {
			row._detailsShow = show;

			if ( show ) {
				row._details.insertAfter( row.nTr );
				$( row.nTr ).addClass( 'dt-hasChild' );
			}
			else {
				row._details.detach();
				$( row.nTr ).removeClass( 'dt-hasChild' );
			}

			_fnCallbackFire( ctx[0], null, 'childRow', [ show, api.row( api[0] ) ] )

			__details_events( ctx[0] );
			__details_state( ctx );
		}
	}
};


var __details_events = function ( settings )
{
	var api = new _Api( settings );
	var namespace = '.dt.DT_details';
	var drawEvent = 'draw'+namespace;
	var colvisEvent = 'column-sizing'+namespace;
	var destroyEvent = 'destroy'+namespace;
	var data = settings.aoData;

	api.off( drawEvent +' '+ colvisEvent +' '+ destroyEvent );

	if ( _pluck( data, '_details' ).length > 0 ) {
		// On each draw, insert the required elements into the document
		api.on( drawEvent, function ( e, ctx ) {
			if ( settings !== ctx ) {
				return;
			}

			api.rows( {page:'current'} ).eq(0).each( function (idx) {
				// Internal data grab
				var row = data[ idx ];

				if ( row._detailsShow ) {
					row._details.insertAfter( row.nTr );
				}
			} );
		} );

		// Column visibility change - update the colspan
		api.on( colvisEvent, function ( e, ctx ) {
			if ( settings !== ctx ) {
				return;
			}

			// Update the colspan for the details rows (note, only if it already has
			// a colspan)
			var row, visible = _fnVisbleColumns( ctx );

			for ( var i=0, ien=data.length ; i<ien ; i++ ) {
				row = data[i];

				if ( row && row._details ) {
					row._details.each(function () {
						var el = $(this).children('td');

						if (el.length == 1) {
							el.attr('colspan', visible);
						}
					});
				}
			}
		} );

		// Table destroyed - nuke any child rows
		api.on( destroyEvent, function ( e, ctx ) {
			if ( settings !== ctx ) {
				return;
			}

			for ( var i=0, ien=data.length ; i<ien ; i++ ) {
				if ( data[i] && data[i]._details ) {
					__details_remove( api, i );
				}
			}
		} );
	}
};

// Strings for the method names to help minification
var _emp = '';
var _child_obj = _emp+'row().child';
var _child_mth = _child_obj+'()';

// data can be:
//  tr
//  string
//  jQuery or array of any of the above
_api_register( _child_mth, function ( data, klass ) {
	var ctx = this.context;

	if ( data === undefined ) {
		// get
		return ctx.length && this.length && ctx[0].aoData[ this[0] ]
			? ctx[0].aoData[ this[0] ]._details
			: undefined;
	}
	else if ( data === true ) {
		// show
		this.child.show();
	}
	else if ( data === false ) {
		// remove
		__details_remove( this );
	}
	else if ( ctx.length && this.length ) {
		// set
		__details_add( ctx[0], ctx[0].aoData[ this[0] ], data, klass );
	}

	return this;
} );


_api_register( [
	_child_obj+'.show()',
	_child_mth+'.show()' // only when `child()` was called with parameters (without
], function () {         // it returns an object and this method is not executed)
	__details_display( this, true );
	return this;
} );


_api_register( [
	_child_obj+'.hide()',
	_child_mth+'.hide()' // only when `child()` was called with parameters (without
], function () {         // it returns an object and this method is not executed)
	__details_display( this, false );
	return this;
} );


_api_register( [
	_child_obj+'.remove()',
	_child_mth+'.remove()' // only when `child()` was called with parameters (without
], function () {           // it returns an object and this method is not executed)
	__details_remove( this );
	return this;
} );


_api_register( _child_obj+'.isShown()', function () {
	var ctx = this.context;

	if ( ctx.length && this.length && ctx[0].aoData[ this[0] ] ) {
		// _detailsShown as false or undefined will fall through to return false
		return ctx[0].aoData[ this[0] ]._detailsShow || false;
	}
	return false;
} );



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Columns
 *
 * {integer}           - column index (>=0 count from left, <0 count from right)
 * "{integer}:visIdx"  - visible column index (i.e. translate to column index)  (>=0 count from left, <0 count from right)
 * "{integer}:visible" - alias for {integer}:visIdx  (>=0 count from left, <0 count from right)
 * "{string}:name"     - column name
 * "{string}"          - jQuery selector on column header nodes
 *
 */

// can be an array of these items, comma separated list, or an array of comma
// separated lists

var __re_column_selector = /^([^:]+)?:(name|title|visIdx|visible)$/;


// r1 and r2 are redundant - but it means that the parameters match for the
// iterator callback in columns().data()
var __columnData = function ( settings, column, r1, r2, rows, type ) {
	var a = [];
	for ( var row=0, ien=rows.length ; row<ien ; row++ ) {
		a.push( _fnGetCellData( settings, rows[row], column, type ) );
	}
	return a;
};


var __column_header = function ( settings, column, row ) {
	var header = settings.aoHeader;
	var target = row !== undefined
		? row
		: settings.bSortCellsTop // legacy support
			? 0
			: header.length - 1;

	return header[target][column].cell;
};

var __column_selector = function ( settings, selector, opts )
{
	var
		columns = settings.aoColumns,
		names = _pluck( columns, 'sName' ),
		titles = _pluck( columns, 'sTitle' ),
		cells = DataTable.util.get('[].[].cell')(settings.aoHeader),
		nodes = _unique( _flatten([], cells) );
	
	var run = function ( s ) {
		var selInt = _intVal( s );

		// Selector - all
		if ( s === '' ) {
			return _range( columns.length );
		}

		// Selector - index
		if ( selInt !== null ) {
			return [ selInt >= 0 ?
				selInt : // Count from left
				columns.length + selInt // Count from right (+ because its a negative value)
			];
		}

		// Selector = function
		if ( typeof s === 'function' ) {
			var rows = _selector_row_indexes( settings, opts );

			return columns.map(function (col, idx) {
				return s(
						idx,
						__columnData( settings, idx, 0, 0, rows ),
						__column_header( settings, idx )
					) ? idx : null;
			});
		}

		// jQuery or string selector
		var match = typeof s === 'string' ?
			s.match( __re_column_selector ) :
			'';

		if ( match ) {
			switch( match[2] ) {
				case 'visIdx':
				case 'visible':
					// Selector is a column index
					if (match[1] && match[1].match(/^\d+$/)) {
						var idx = parseInt( match[1], 10 );

						// Visible index given, convert to column index
						if ( idx < 0 ) {
							// Counting from the right
							var visColumns = columns.map( function (col,i) {
								return col.bVisible ? i : null;
							} );
							return [ visColumns[ visColumns.length + idx ] ];
						}
						// Counting from the left
						return [ _fnVisibleToColumnIndex( settings, idx ) ];
					}
					
					return columns.map( function (col, idx) {
						// Not visible, can't match
						if (! col.bVisible) {
							return null;
						}

						// Selector
						if (match[1]) {
							return $(nodes[idx]).filter(match[1]).length > 0 ? idx : null;
						}

						// `:visible` on its own
						return idx;
					} );

				case 'name':
					// match by name. `names` is column index complete and in order
					return names.map( function (name, i) {
						return name === match[1] ? i : null;
					} );

				case 'title':
					// match by column title
					return titles.map( function (title, i) {
						return title === match[1] ? i : null;
					} );

				default:
					return [];
			}
		}

		// Cell in the table body
		if ( s.nodeName && s._DT_CellIndex ) {
			return [ s._DT_CellIndex.column ];
		}

		// jQuery selector on the TH elements for the columns
		var jqResult = $( nodes )
			.filter( s )
			.map( function () {
				return _fnColumnsFromHeader( this ); // `nodes` is column index complete and in order
			} )
			.toArray();

		if ( jqResult.length || ! s.nodeName ) {
			return jqResult;
		}

		// Otherwise a node which might have a `dt-column` data attribute, or be
		// a child or such an element
		var host = $(s).closest('*[data-dt-column]');
		return host.length ?
			[ host.data('dt-column') ] :
			[];
	};

	return _selector_run( 'column', selector, run, settings, opts );
};


var __setColumnVis = function ( settings, column, vis ) {
	var
		cols = settings.aoColumns,
		col  = cols[ column ],
		data = settings.aoData,
		cells, i, ien, tr;

	// Get
	if ( vis === undefined ) {
		return col.bVisible;
	}

	// Set
	// No change
	if ( col.bVisible === vis ) {
		return false;
	}

	if ( vis ) {
		// Insert column
		// Need to decide if we should use appendChild or insertBefore
		var insertBefore = _pluck(cols, 'bVisible').indexOf(true, column+1);

		for ( i=0, ien=data.length ; i<ien ; i++ ) {
			if (data[i]) {
				tr = data[i].nTr;
				cells = data[i].anCells;

				if ( tr ) {
					// insertBefore can act like appendChild if 2nd arg is null
					tr.insertBefore( cells[ column ], cells[ insertBefore ] || null );
				}
			}
		}
	}
	else {
		// Remove column
		$( _pluck( settings.aoData, 'anCells', column ) ).detach();
	}

	// Common actions
	col.bVisible = vis;

	_colGroup(settings);
	
	return true;
};


_api_register( 'columns()', function ( selector, opts ) {
	// argument shifting
	if ( selector === undefined ) {
		selector = '';
	}
	else if ( $.isPlainObject( selector ) ) {
		opts = selector;
		selector = '';
	}

	opts = _selector_opts( opts );

	var inst = this.iterator( 'table', function ( settings ) {
		return __column_selector( settings, selector, opts );
	}, 1 );

	// Want argument shifting here and in _row_selector?
	inst.selector.cols = selector;
	inst.selector.opts = opts;

	return inst;
} );

_api_registerPlural( 'columns().header()', 'column().header()', function ( row ) {
	return this.iterator( 'column', function (settings, column) {
		return __column_header(settings, column, row);
	}, 1 );
} );

_api_registerPlural( 'columns().footer()', 'column().footer()', function ( row ) {
	return this.iterator( 'column', function ( settings, column ) {
		var footer = settings.aoFooter;

		if (! footer.length) {
			return null;
		}

		return settings.aoFooter[row !== undefined ? row : 0][column].cell;
	}, 1 );
} );

_api_registerPlural( 'columns().data()', 'column().data()', function () {
	return this.iterator( 'column-rows', __columnData, 1 );
} );

_api_registerPlural( 'columns().render()', 'column().render()', function ( type ) {
	return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
		return __columnData( settings, column, i, j, rows, type );
	}, 1 );
} );

_api_registerPlural( 'columns().dataSrc()', 'column().dataSrc()', function () {
	return this.iterator( 'column', function ( settings, column ) {
		return settings.aoColumns[column].mData;
	}, 1 );
} );

_api_registerPlural( 'columns().cache()', 'column().cache()', function ( type ) {
	return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
		return _pluck_order( settings.aoData, rows,
			type === 'search' ? '_aFilterData' : '_aSortData', column
		);
	}, 1 );
} );

_api_registerPlural( 'columns().init()', 'column().init()', function () {
	return this.iterator( 'column', function ( settings, column ) {
		return settings.aoColumns[column];
	}, 1 );
} );

_api_registerPlural( 'columns().nodes()', 'column().nodes()', function () {
	return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
		return _pluck_order( settings.aoData, rows, 'anCells', column ) ;
	}, 1 );
} );

_api_registerPlural( 'columns().titles()', 'column().title()', function (title, row) {
	return this.iterator( 'column', function ( settings, column ) {
		// Argument shifting
		if (typeof title === 'number') {
			row = title;
			title = undefined;
		}

		var span = $('span.dt-column-title', this.column(column).header(row));

		if (title !== undefined) {
			span.html(title);
			return this;
		}

		return span.html();
	}, 1 );
} );

_api_registerPlural( 'columns().types()', 'column().type()', function () {
	return this.iterator( 'column', function ( settings, column ) {
		var type = settings.aoColumns[column].sType;

		// If the type was invalidated, then resolve it. This actually does
		// all columns at the moment. Would only happen once if getting all
		// column's data types.
		if (! type) {
			_fnColumnTypes(settings);
		}

		return type;
	}, 1 );
} );

_api_registerPlural( 'columns().visible()', 'column().visible()', function ( vis, calc ) {
	var that = this;
	var changed = [];
	var ret = this.iterator( 'column', function ( settings, column ) {
		if ( vis === undefined ) {
			return settings.aoColumns[ column ].bVisible;
		} // else
		
		if (__setColumnVis( settings, column, vis )) {
			changed.push(column);
		}
	} );

	// Group the column visibility changes
	if ( vis !== undefined ) {
		this.iterator( 'table', function ( settings ) {
			// Redraw the header after changes
			_fnDrawHead( settings, settings.aoHeader );
			_fnDrawHead( settings, settings.aoFooter );
	
			// Update colspan for no records display. Child rows and extensions will use their own
			// listeners to do this - only need to update the empty table item here
			if ( ! settings.aiDisplay.length ) {
				$(settings.nTBody).find('td[colspan]').attr('colspan', _fnVisbleColumns(settings));
			}
	
			_fnSaveState( settings );

			// Second loop once the first is done for events
			that.iterator( 'column', function ( settings, column ) {
				if (changed.includes(column)) {
					_fnCallbackFire( settings, null, 'column-visibility', [settings, column, vis, calc] );
				}
			} );

			if ( changed.length && (calc === undefined || calc) ) {
				that.columns.adjust();
			}
		});
	}

	return ret;
} );

_api_registerPlural( 'columns().widths()', 'column().width()', function () {
	// Injects a fake row into the table for just a moment so the widths can
	// be read, regardless of colspan in the header and rows being present in
	// the body
	var columns = this.columns(':visible').count();
	var row = $('<tr>').html('<td>' + Array(columns).join('</td><td>') + '</td>');

	$(this.table().body()).append(row);

	var widths = row.children().map(function () {
		return $(this).outerWidth();
	});

	row.remove();
	
	return this.iterator( 'column', function ( settings, column ) {
		var visIdx = _fnColumnIndexToVisible( settings, column );

		return visIdx !== null ? widths[visIdx] : 0;
	}, 1);
} );

_api_registerPlural( 'columns().indexes()', 'column().index()', function ( type ) {
	return this.iterator( 'column', function ( settings, column ) {
		return type === 'visible' ?
			_fnColumnIndexToVisible( settings, column ) :
			column;
	}, 1 );
} );

_api_register( 'columns.adjust()', function () {
	return this.iterator( 'table', function ( settings ) {
		_fnAdjustColumnSizing( settings );
	}, 1 );
} );

_api_register( 'column.index()', function ( type, idx ) {
	if ( this.context.length !== 0 ) {
		var ctx = this.context[0];

		if ( type === 'fromVisible' || type === 'toData' ) {
			return _fnVisibleToColumnIndex( ctx, idx );
		}
		else if ( type === 'fromData' || type === 'toVisible' ) {
			return _fnColumnIndexToVisible( ctx, idx );
		}
	}
} );

_api_register( 'column()', function ( selector, opts ) {
	return _selector_first( this.columns( selector, opts ) );
} );

var __cell_selector = function ( settings, selector, opts )
{
	var data = settings.aoData;
	var rows = _selector_row_indexes( settings, opts );
	var cells = _removeEmpty( _pluck_order( data, rows, 'anCells' ) );
	var allCells = $(_flatten( [], cells ));
	var row;
	var columns = settings.aoColumns.length;
	var a, i, ien, j, o, host;

	var run = function ( s ) {
		var fnSelector = typeof s === 'function';

		if ( s === null || s === undefined || fnSelector ) {
			// All cells and function selectors
			a = [];

			for ( i=0, ien=rows.length ; i<ien ; i++ ) {
				row = rows[i];

				for ( j=0 ; j<columns ; j++ ) {
					o = {
						row: row,
						column: j
					};

					if ( fnSelector ) {
						// Selector - function
						host = data[ row ];

						if ( s( o, _fnGetCellData(settings, row, j), host.anCells ? host.anCells[j] : null ) ) {
							a.push( o );
						}
					}
					else {
						// Selector - all
						a.push( o );
					}
				}
			}

			return a;
		}
		
		// Selector - index
		if ( $.isPlainObject( s ) ) {
			// Valid cell index and its in the array of selectable rows
			return s.column !== undefined && s.row !== undefined && rows.indexOf(s.row) !== -1 ?
				[s] :
				[];
		}

		// Selector - jQuery filtered cells
		var jqResult = allCells
			.filter( s )
			.map( function (i, el) {
				return { // use a new object, in case someone changes the values
					row:    el._DT_CellIndex.row,
					column: el._DT_CellIndex.column
				};
			} )
			.toArray();

		if ( jqResult.length || ! s.nodeName ) {
			return jqResult;
		}

		// Otherwise the selector is a node, and there is one last option - the
		// element might be a child of an element which has dt-row and dt-column
		// data attributes
		host = $(s).closest('*[data-dt-row]');
		return host.length ?
			[ {
				row: host.data('dt-row'),
				column: host.data('dt-column')
			} ] :
			[];
	};

	return _selector_run( 'cell', selector, run, settings, opts );
};




_api_register( 'cells()', function ( rowSelector, columnSelector, opts ) {
	// Argument shifting
	if ( $.isPlainObject( rowSelector ) ) {
		// Indexes
		if ( rowSelector.row === undefined ) {
			// Selector options in first parameter
			opts = rowSelector;
			rowSelector = null;
		}
		else {
			// Cell index objects in first parameter
			opts = columnSelector;
			columnSelector = null;
		}
	}
	if ( $.isPlainObject( columnSelector ) ) {
		opts = columnSelector;
		columnSelector = null;
	}

	// Cell selector
	if ( columnSelector === null || columnSelector === undefined ) {
		return this.iterator( 'table', function ( settings ) {
			return __cell_selector( settings, rowSelector, _selector_opts( opts ) );
		} );
	}

	// The default built in options need to apply to row and columns
	var internalOpts = opts ? {
		page: opts.page,
		order: opts.order,
		search: opts.search
	} : {};

	// Row + column selector
	var columns = this.columns( columnSelector, internalOpts );
	var rows = this.rows( rowSelector, internalOpts );
	var i, ien, j, jen;

	var cellsNoOpts = this.iterator( 'table', function ( settings, idx ) {
		var a = [];

		for ( i=0, ien=rows[idx].length ; i<ien ; i++ ) {
			for ( j=0, jen=columns[idx].length ; j<jen ; j++ ) {
				a.push( {
					row:    rows[idx][i],
					column: columns[idx][j]
				} );
			}
		}

		return a;
	}, 1 );

	// There is currently only one extension which uses a cell selector extension
	// It is a _major_ performance drag to run this if it isn't needed, so this is
	// an extension specific check at the moment
	var cells = opts && opts.selected ?
		this.cells( cellsNoOpts, opts ) :
		cellsNoOpts;

	$.extend( cells.selector, {
		cols: columnSelector,
		rows: rowSelector,
		opts: opts
	} );

	return cells;
} );


_api_registerPlural( 'cells().nodes()', 'cell().node()', function () {
	return this.iterator( 'cell', function ( settings, row, column ) {
		var data = settings.aoData[ row ];

		return data && data.anCells ?
			data.anCells[ column ] :
			undefined;
	}, 1 );
} );


_api_register( 'cells().data()', function () {
	return this.iterator( 'cell', function ( settings, row, column ) {
		return _fnGetCellData( settings, row, column );
	}, 1 );
} );


_api_registerPlural( 'cells().cache()', 'cell().cache()', function ( type ) {
	type = type === 'search' ? '_aFilterData' : '_aSortData';

	return this.iterator( 'cell', function ( settings, row, column ) {
		return settings.aoData[ row ][ type ][ column ];
	}, 1 );
} );


_api_registerPlural( 'cells().render()', 'cell().render()', function ( type ) {
	return this.iterator( 'cell', function ( settings, row, column ) {
		return _fnGetCellData( settings, row, column, type );
	}, 1 );
} );


_api_registerPlural( 'cells().indexes()', 'cell().index()', function () {
	return this.iterator( 'cell', function ( settings, row, column ) {
		return {
			row: row,
			column: column,
			columnVisible: _fnColumnIndexToVisible( settings, column )
		};
	}, 1 );
} );


_api_registerPlural( 'cells().invalidate()', 'cell().invalidate()', function ( src ) {
	return this.iterator( 'cell', function ( settings, row, column ) {
		_fnInvalidate( settings, row, src, column );
	} );
} );



_api_register( 'cell()', function ( rowSelector, columnSelector, opts ) {
	return _selector_first( this.cells( rowSelector, columnSelector, opts ) );
} );


_api_register( 'cell().data()', function ( data ) {
	var ctx = this.context;
	var cell = this[0];

	if ( data === undefined ) {
		// Get
		return ctx.length && cell.length ?
			_fnGetCellData( ctx[0], cell[0].row, cell[0].column ) :
			undefined;
	}

	// Set
	_fnSetCellData( ctx[0], cell[0].row, cell[0].column, data );
	_fnInvalidate( ctx[0], cell[0].row, 'data', cell[0].column );

	return this;
} );



/**
 * Get current ordering (sorting) that has been applied to the table.
 *
 * @returns {array} 2D array containing the sorting information for the first
 *   table in the current context. Each element in the parent array represents
 *   a column being sorted upon (i.e. multi-sorting with two columns would have
 *   2 inner arrays). The inner arrays may have 2 or 3 elements. The first is
 *   the column index that the sorting condition applies to, the second is the
 *   direction of the sort (`desc` or `asc`) and, optionally, the third is the
 *   index of the sorting order from the `column.sorting` initialisation array.
 *//**
 * Set the ordering for the table.
 *
 * @param {integer} order Column index to sort upon.
 * @param {string} direction Direction of the sort to be applied (`asc` or `desc`)
 * @returns {DataTables.Api} this
 *//**
 * Set the ordering for the table.
 *
 * @param {array} order 1D array of sorting information to be applied.
 * @param {array} [...] Optional additional sorting conditions
 * @returns {DataTables.Api} this
 *//**
 * Set the ordering for the table.
 *
 * @param {array} order 2D array of sorting information to be applied.
 * @returns {DataTables.Api} this
 */
_api_register( 'order()', function ( order, dir ) {
	var ctx = this.context;
	var args = Array.prototype.slice.call( arguments );

	if ( order === undefined ) {
		// get
		return ctx.length !== 0 ?
			ctx[0].aaSorting :
			undefined;
	}

	// set
	if ( typeof order === 'number' ) {
		// Simple column / direction passed in
		order = [ [ order, dir ] ];
	}
	else if ( args.length > 1 ) {
		// Arguments passed in (list of 1D arrays)
		order = args;
	}
	// otherwise a 2D array was passed in

	return this.iterator( 'table', function ( settings ) {
		settings.aaSorting = Array.isArray(order) ? order.slice() : order;
	} );
} );


/**
 * Attach a sort listener to an element for a given column
 *
 * @param {node|jQuery|string} node Identifier for the element(s) to attach the
 *   listener to. This can take the form of a single DOM node, a jQuery
 *   collection of nodes or a jQuery selector which will identify the node(s).
 * @param {integer} column the column that a click on this node will sort on
 * @param {function} [callback] callback function when sort is run
 * @returns {DataTables.Api} this
 */
_api_register( 'order.listener()', function ( node, column, callback ) {
	return this.iterator( 'table', function ( settings ) {
		_fnSortAttachListener(settings, node, {}, column, callback);
	} );
} );


_api_register( 'order.fixed()', function ( set ) {
	if ( ! set ) {
		var ctx = this.context;
		var fixed = ctx.length ?
			ctx[0].aaSortingFixed :
			undefined;

		return Array.isArray( fixed ) ?
			{ pre: fixed } :
			fixed;
	}

	return this.iterator( 'table', function ( settings ) {
		settings.aaSortingFixed = $.extend( true, {}, set );
	} );
} );


// Order by the selected column(s)
_api_register( [
	'columns().order()',
	'column().order()'
], function ( dir ) {
	var that = this;

	if ( ! dir ) {
		return this.iterator( 'column', function ( settings, idx ) {
			var sort = _fnSortFlatten( settings );

			for ( var i=0, ien=sort.length ; i<ien ; i++ ) {
				if ( sort[i].col === idx ) {
					return sort[i].dir;
				}
			}

			return null;
		}, 1 );
	}
	else {
		return this.iterator( 'table', function ( settings, i ) {
			settings.aaSorting = that[i].map( function (col) {
				return [ col, dir ];
			} );
		} );
	}
} );

_api_registerPlural('columns().orderable()', 'column().orderable()', function ( directions ) {
	return this.iterator( 'column', function ( settings, idx ) {
		var col = settings.aoColumns[idx];

		return directions ?
			col.asSorting :
			col.bSortable;
	}, 1 );
} );


_api_register( 'processing()', function ( show ) {
	return this.iterator( 'table', function ( ctx ) {
		_fnProcessingDisplay( ctx, show );
	} );
} );


_api_register( 'search()', function ( input, regex, smart, caseInsen ) {
	var ctx = this.context;

	if ( input === undefined ) {
		// get
		return ctx.length !== 0 ?
			ctx[0].oPreviousSearch.search :
			undefined;
	}

	// set
	return this.iterator( 'table', function ( settings ) {
		if ( ! settings.oFeatures.bFilter ) {
			return;
		}

		if (typeof regex === 'object') {
			// New style options to pass to the search builder
			_fnFilterComplete( settings, $.extend( settings.oPreviousSearch, regex, {
				search: input
			} ) );
		}
		else {
			// Compat for the old options
			_fnFilterComplete( settings, $.extend( settings.oPreviousSearch, {
				search: input,
				regex:  regex === null ? false : regex,
				smart:  smart === null ? true  : smart,
				caseInsensitive: caseInsen === null ? true : caseInsen
			} ) );
		}
	} );
} );

_api_register( 'search.fixed()', function ( name, search ) {
	var ret = this.iterator( true, 'table', function ( settings ) {
		var fixed = settings.searchFixed;

		if (! name) {
			return Object.keys(fixed)
		}
		else if (search === undefined) {
			return fixed[name];
		}
		else if (search === null) {
			delete fixed[name];
		}
		else {
			fixed[name] = search;
		}

		return this;
	} );

	return name !== undefined && search === undefined
		? ret[0]
		: ret;
} );

_api_registerPlural(
	'columns().search()',
	'column().search()',
	function ( input, regex, smart, caseInsen ) {
		return this.iterator( 'column', function ( settings, column ) {
			var preSearch = settings.aoPreSearchCols;

			if ( input === undefined ) {
				// get
				return preSearch[ column ].search;
			}

			// set
			if ( ! settings.oFeatures.bFilter ) {
				return;
			}

			if (typeof regex === 'object') {
				// New style options to pass to the search builder
				$.extend( preSearch[ column ], regex, {
					search: input
				} );
			}
			else {
				// Old style (with not all options available)
				$.extend( preSearch[ column ], {
					search: input,
					regex:  regex === null ? false : regex,
					smart:  smart === null ? true  : smart,
					caseInsensitive: caseInsen === null ? true : caseInsen
				} );
			}

			_fnFilterComplete( settings, settings.oPreviousSearch );
		} );
	}
);

_api_register([
		'columns().search.fixed()',
		'column().search.fixed()'
	],
	function ( name, search ) {
		var ret = this.iterator( true, 'column', function ( settings, colIdx ) {
			var fixed = settings.aoColumns[colIdx].searchFixed;

			if (! name) {
				return Object.keys(fixed)
			}
			else if (search === undefined) {
				return fixed[name];
			}
			else if (search === null) {
				delete fixed[name];
			}
			else {
				fixed[name] = search;
			}

			return this;
		} );

		return name !== undefined && search === undefined
			? ret[0]
			: ret;
	}
);
/*
 * State API methods
 */

_api_register( 'state()', function ( set, ignoreTime ) {
	// getter
	if ( ! set ) {
		return this.context.length ?
			this.context[0].oSavedState :
			null;
	}

	var setMutate = $.extend( true, {}, set );

	// setter
	return this.iterator( 'table', function ( settings ) {
		if ( ignoreTime !== false ) {
			setMutate.time = +new Date() + 100;
		}

		_fnImplementState( settings, setMutate, function(){} );
	} );
} );


_api_register( 'state.clear()', function () {
	return this.iterator( 'table', function ( settings ) {
		// Save an empty object
		settings.fnStateSaveCallback.call( settings.oInstance, settings, {} );
	} );
} );


_api_register( 'state.loaded()', function () {
	return this.context.length ?
		this.context[0].oLoadedState :
		null;
} );


_api_register( 'state.save()', function () {
	return this.iterator( 'table', function ( settings ) {
		_fnSaveState( settings );
	} );
} );

/**
 * Set the libraries that DataTables uses, or the global objects.
 * Note that the arguments can be either way around (legacy support)
 * and the second is optional. See docs.
 */
DataTable.use = function (arg1, arg2) {
	// Reverse arguments for legacy support
	var module = typeof arg1 === 'string'
		? arg2
		: arg1;
	var type = typeof arg2 === 'string'
		? arg2
		: arg1;

	// Getter
	if (module === undefined && typeof type === 'string') {
		switch (type) {
			case 'lib':
			case 'jq':
				return $;

			case 'win':
				return window;

			case 'datetime':
				return DataTable.DateTime;

			case 'luxon':
				return __luxon;

			case 'moment':
				return __moment;

			default:
				return null;
		}
	}

	// Setter
	if (type === 'lib' || type === 'jq' || (module && module.fn && module.fn.jquery)) {
		$ = module;
	}
	else if (type == 'win' || (module && module.document)) {
		window = module;
		document = module.document;
	}
	else if (type === 'datetime' || (module && module.type === 'DateTime')) {
		DataTable.DateTime = module;
	}
	else if (type === 'luxon' || (module && module.FixedOffsetZone)) {
		__luxon = module;
	}
	else if (type === 'moment' || (module && module.isMoment)) {
		__moment = module;
	}
}

/**
 * CommonJS factory function pass through. This will check if the arguments
 * given are a window object or a jQuery object. If so they are set
 * accordingly.
 * @param {*} root Window
 * @param {*} jq jQUery
 * @returns {boolean} Indicator
 */
DataTable.factory = function (root, jq) {
	var is = false;

	// Test if the first parameter is a window object
	if (root && root.document) {
		window = root;
		document = root.document;
	}

	// Test if the second parameter is a jQuery object
	if (jq && jq.fn && jq.fn.jquery) {
		$ = jq;
		is = true;
	}

	return is;
}

/**
 * Provide a common method for plug-ins to check the version of DataTables being
 * used, in order to ensure compatibility.
 *
 *  @param {string} version Version string to check for, in the format "X.Y.Z".
 *    Note that the formats "X" and "X.Y" are also acceptable.
 *  @param {string} [version2=current DataTables version] As above, but optional.
 *   If not given the current DataTables version will be used.
 *  @returns {boolean} true if this version of DataTables is greater or equal to
 *    the required version, or false if this version of DataTales is not
 *    suitable
 *  @static
 *  @dtopt API-Static
 *
 *  @example
 *    alert( $.fn.dataTable.versionCheck( '1.9.0' ) );
 */
DataTable.versionCheck = function( version, version2 )
{
	var aThis = version2 ?
		version2.split('.') :
		DataTable.version.split('.');
	var aThat = version.split('.');
	var iThis, iThat;

	for ( var i=0, iLen=aThat.length ; i<iLen ; i++ ) {
		iThis = parseInt( aThis[i], 10 ) || 0;
		iThat = parseInt( aThat[i], 10 ) || 0;

		// Parts are the same, keep comparing
		if (iThis === iThat) {
			continue;
		}

		// Parts are different, return immediately
		return iThis > iThat;
	}

	return true;
};


/**
 * Check if a `<table>` node is a DataTable table already or not.
 *
 *  @param {node|jquery|string} table Table node, jQuery object or jQuery
 *      selector for the table to test. Note that if more than more than one
 *      table is passed on, only the first will be checked
 *  @returns {boolean} true the table given is a DataTable, or false otherwise
 *  @static
 *  @dtopt API-Static
 *
 *  @example
 *    if ( ! $.fn.DataTable.isDataTable( '#example' ) ) {
 *      $('#example').dataTable();
 *    }
 */
DataTable.isDataTable = function ( table )
{
	var t = $(table).get(0);
	var is = false;

	if ( table instanceof DataTable.Api ) {
		return true;
	}

	$.each( DataTable.settings, function (i, o) {
		var head = o.nScrollHead ? $('table', o.nScrollHead)[0] : null;
		var foot = o.nScrollFoot ? $('table', o.nScrollFoot)[0] : null;

		if ( o.nTable === t || head === t || foot === t ) {
			is = true;
		}
	} );

	return is;
};


/**
 * Get all DataTable tables that have been initialised - optionally you can
 * select to get only currently visible tables.
 *
 *  @param {boolean} [visible=false] Flag to indicate if you want all (default)
 *    or visible tables only.
 *  @returns {array} Array of `table` nodes (not DataTable instances) which are
 *    DataTables
 *  @static
 *  @dtopt API-Static
 *
 *  @example
 *    $.each( $.fn.dataTable.tables(true), function () {
 *      $(table).DataTable().columns.adjust();
 *    } );
 */
DataTable.tables = function ( visible )
{
	var api = false;

	if ( $.isPlainObject( visible ) ) {
		api = visible.api;
		visible = visible.visible;
	}

	var a = DataTable.settings
		.filter( function (o) {
			return !visible || (visible && $(o.nTable).is(':visible')) 
				? true
				: false;
		} )
		.map( function (o) {
			return o.nTable;
		});

	return api ?
		new _Api( a ) :
		a;
};


/**
 * Convert from camel case parameters to Hungarian notation. This is made public
 * for the extensions to provide the same ability as DataTables core to accept
 * either the 1.9 style Hungarian notation, or the 1.10+ style camelCase
 * parameters.
 *
 *  @param {object} src The model object which holds all parameters that can be
 *    mapped.
 *  @param {object} user The object to convert from camel case to Hungarian.
 *  @param {boolean} force When set to `true`, properties which already have a
 *    Hungarian value in the `user` object will be overwritten. Otherwise they
 *    won't be.
 */
DataTable.camelToHungarian = _fnCamelToHungarian;



/**
 *
 */
_api_register( '$()', function ( selector, opts ) {
	var
		rows   = this.rows( opts ).nodes(), // Get all rows
		jqRows = $(rows);

	return $( [].concat(
		jqRows.filter( selector ).toArray(),
		jqRows.find( selector ).toArray()
	) );
} );


// jQuery functions to operate on the tables
$.each( [ 'on', 'one', 'off' ], function (i, key) {
	_api_register( key+'()', function ( /* event, handler */ ) {
		var args = Array.prototype.slice.call(arguments);

		// Add the `dt` namespace automatically if it isn't already present
		args[0] = args[0].split( /\s/ ).map( function ( e ) {
			return ! e.match(/\.dt\b/) ?
				e+'.dt' :
				e;
			} ).join( ' ' );

		var inst = $( this.tables().nodes() );
		inst[key].apply( inst, args );
		return this;
	} );
} );


_api_register( 'clear()', function () {
	return this.iterator( 'table', function ( settings ) {
		_fnClearTable( settings );
	} );
} );


_api_register( 'error()', function (msg) {
	return this.iterator( 'table', function ( settings ) {
		_fnLog( settings, 0, msg );
	} );
} );


_api_register( 'settings()', function () {
	return new _Api( this.context, this.context );
} );


_api_register( 'init()', function () {
	var ctx = this.context;
	return ctx.length ? ctx[0].oInit : null;
} );


_api_register( 'data()', function () {
	return this.iterator( 'table', function ( settings ) {
		return _pluck( settings.aoData, '_aData' );
	} ).flatten();
} );


_api_register( 'trigger()', function ( name, args, bubbles ) {
	return this.iterator( 'table', function ( settings ) {
		return _fnCallbackFire( settings, null, name, args, bubbles );
	} ).flatten();
} );


_api_register( 'ready()', function ( fn ) {
	var ctx = this.context;

	// Get status of first table
	if (! fn) {
		return ctx.length
			? (ctx[0]._bInitComplete || false)
			: null;
	}

	// Function to run either once the table becomes ready or
	// immediately if it is already ready.
	return this.tables().every(function () {
		if (this.context[0]._bInitComplete) {
			fn.call(this);
		}
		else {
			this.on('init.dt.DT', function () {
				fn.call(this);
			});
		}
	} );
} );


_api_register( 'destroy()', function ( remove ) {
	remove = remove || false;

	return this.iterator( 'table', function ( settings ) {
		var classes   = settings.oClasses;
		var table     = settings.nTable;
		var tbody     = settings.nTBody;
		var thead     = settings.nTHead;
		var tfoot     = settings.nTFoot;
		var jqTable   = $(table);
		var jqTbody   = $(tbody);
		var jqWrapper = $(settings.nTableWrapper);
		var rows      = settings.aoData.map( function (r) { return r ? r.nTr : null; } );
		var orderClasses = classes.order;

		// Flag to note that the table is currently being destroyed - no action
		// should be taken
		settings.bDestroying = true;

		// Fire off the destroy callbacks for plug-ins etc
		_fnCallbackFire( settings, "aoDestroyCallback", "destroy", [settings], true );

		// If not being removed from the document, make all columns visible
		if ( ! remove ) {
			new _Api( settings ).columns().visible( true );
		}

		// Blitz all `DT` namespaced events (these are internal events, the
		// lowercase, `dt` events are user subscribed and they are responsible
		// for removing them
		jqWrapper.off('.DT').find(':not(tbody *)').off('.DT');
		$(window).off('.DT-'+settings.sInstance);

		// When scrolling we had to break the table up - restore it
		if ( table != thead.parentNode ) {
			jqTable.children('thead').detach();
			jqTable.append( thead );
		}

		if ( tfoot && table != tfoot.parentNode ) {
			jqTable.children('tfoot').detach();
			jqTable.append( tfoot );
		}

		settings.colgroup.remove();

		settings.aaSorting = [];
		settings.aaSortingFixed = [];
		_fnSortingClasses( settings );

		$('th, td', thead)
			.removeClass(
				orderClasses.canAsc + ' ' +
				orderClasses.canDesc + ' ' +
				orderClasses.isAsc + ' ' +
				orderClasses.isDesc
			)
			.css('width', '');

		// Add the TR elements back into the table in their original order
		jqTbody.children().detach();
		jqTbody.append( rows );

		var orig = settings.nTableWrapper.parentNode;
		var insertBefore = settings.nTableWrapper.nextSibling;

		// Remove the DataTables generated nodes, events and classes
		var removedMethod = remove ? 'remove' : 'detach';
		jqTable[ removedMethod ]();
		jqWrapper[ removedMethod ]();

		// If we need to reattach the table to the document
		if ( ! remove && orig ) {
			// insertBefore acts like appendChild if !arg[1]
			orig.insertBefore( table, insertBefore );

			// Restore the width of the original table - was read from the style property,
			// so we can restore directly to that
			jqTable
				.css( 'width', settings.sDestroyWidth )
				.removeClass( classes.table );
		}

		/* Remove the settings object from the settings array */
		var idx = DataTable.settings.indexOf(settings);
		if ( idx !== -1 ) {
			DataTable.settings.splice( idx, 1 );
		}
	} );
} );


// Add the `every()` method for rows, columns and cells in a compact form
$.each( [ 'column', 'row', 'cell' ], function ( i, type ) {
	_api_register( type+'s().every()', function ( fn ) {
		var opts = this.selector.opts;
		var api = this;
		var inst;
		var counter = 0;

		return this.iterator( 'every', function ( settings, selectedIdx, tableIdx ) {
			inst = api[ type ](selectedIdx, opts);

			if (type === 'cell') {
				fn.call(inst, inst[0][0].row, inst[0][0].column, tableIdx, counter);
			}
			else {
				fn.call(inst, selectedIdx, tableIdx, counter);
			}

			counter++;
		} );
	} );
} );


// i18n method for extensions to be able to use the language object from the
// DataTable
_api_register( 'i18n()', function ( token, def, plural ) {
	var ctx = this.context[0];
	var resolved = _fnGetObjectDataFn( token )( ctx.oLanguage );

	if ( resolved === undefined ) {
		resolved = def;
	}

	if ( $.isPlainObject( resolved ) ) {
		resolved = plural !== undefined && resolved[ plural ] !== undefined ?
			resolved[ plural ] :
			resolved._;
	}

	return typeof resolved === 'string'
		? resolved.replace( '%d', plural ) // nb: plural might be undefined,
		: resolved;
} );

/**
 * Version string for plug-ins to check compatibility. Allowed format is
 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
 * only for non-release builds. See https://semver.org/ for more information.
 *  @member
 *  @type string
 *  @default Version number
 */
DataTable.version = "2.1.8";

/**
 * Private data store, containing all of the settings objects that are
 * created for the tables on a given page.
 *
 * Note that the `DataTable.settings` object is aliased to
 * `jQuery.fn.dataTableExt` through which it may be accessed and
 * manipulated, or `jQuery.fn.dataTable.settings`.
 *  @member
 *  @type array
 *  @default []
 *  @private
 */
DataTable.settings = [];

/**
 * Object models container, for the various models that DataTables has
 * available to it. These models define the objects that are used to hold
 * the active state and configuration of the table.
 *  @namespace
 */
DataTable.models = {};



/**
 * Template object for the way in which DataTables holds information about
 * search information for the global filter and individual column filters.
 *  @namespace
 */
DataTable.models.oSearch = {
	/**
	 * Flag to indicate if the filtering should be case insensitive or not
	 */
	"caseInsensitive": true,

	/**
	 * Applied search term
	 */
	"search": "",

	/**
	 * Flag to indicate if the search term should be interpreted as a
	 * regular expression (true) or not (false) and therefore and special
	 * regex characters escaped.
	 */
	"regex": false,

	/**
	 * Flag to indicate if DataTables is to use its smart filtering or not.
	 */
	"smart": true,

	/**
	 * Flag to indicate if DataTables should only trigger a search when
	 * the return key is pressed.
	 */
	"return": false
};




/**
 * Template object for the way in which DataTables holds information about
 * each individual row. This is the object format used for the settings
 * aoData array.
 *  @namespace
 */
DataTable.models.oRow = {
	/**
	 * TR element for the row
	 */
	"nTr": null,

	/**
	 * Array of TD elements for each row. This is null until the row has been
	 * created.
	 */
	"anCells": null,

	/**
	 * Data object from the original data source for the row. This is either
	 * an array if using the traditional form of DataTables, or an object if
	 * using mData options. The exact type will depend on the passed in
	 * data from the data source, or will be an array if using DOM a data
	 * source.
	 */
	"_aData": [],

	/**
	 * Sorting data cache - this array is ostensibly the same length as the
	 * number of columns (although each index is generated only as it is
	 * needed), and holds the data that is used for sorting each column in the
	 * row. We do this cache generation at the start of the sort in order that
	 * the formatting of the sort data need be done only once for each cell
	 * per sort. This array should not be read from or written to by anything
	 * other than the master sorting methods.
	 */
	"_aSortData": null,

	/**
	 * Per cell filtering data cache. As per the sort data cache, used to
	 * increase the performance of the filtering in DataTables
	 */
	"_aFilterData": null,

	/**
	 * Filtering data cache. This is the same as the cell filtering cache, but
	 * in this case a string rather than an array. This is easily computed with
	 * a join on `_aFilterData`, but is provided as a cache so the join isn't
	 * needed on every search (memory traded for performance)
	 */
	"_sFilterRow": null,

	/**
	 * Denote if the original data source was from the DOM, or the data source
	 * object. This is used for invalidating data, so DataTables can
	 * automatically read data from the original source, unless uninstructed
	 * otherwise.
	 */
	"src": null,

	/**
	 * Index in the aoData array. This saves an indexOf lookup when we have the
	 * object, but want to know the index
	 */
	"idx": -1,

	/**
	 * Cached display value
	 */
	displayData: null
};


/**
 * Template object for the column information object in DataTables. This object
 * is held in the settings aoColumns array and contains all the information that
 * DataTables needs about each individual column.
 *
 * Note that this object is related to {@link DataTable.defaults.column}
 * but this one is the internal data store for DataTables's cache of columns.
 * It should NOT be manipulated outside of DataTables. Any configuration should
 * be done through the initialisation options.
 *  @namespace
 */
DataTable.models.oColumn = {
	/**
	 * Column index.
	 */
	"idx": null,

	/**
	 * A list of the columns that sorting should occur on when this column
	 * is sorted. That this property is an array allows multi-column sorting
	 * to be defined for a column (for example first name / last name columns
	 * would benefit from this). The values are integers pointing to the
	 * columns to be sorted on (typically it will be a single integer pointing
	 * at itself, but that doesn't need to be the case).
	 */
	"aDataSort": null,

	/**
	 * Define the sorting directions that are applied to the column, in sequence
	 * as the column is repeatedly sorted upon - i.e. the first value is used
	 * as the sorting direction when the column if first sorted (clicked on).
	 * Sort it again (click again) and it will move on to the next index.
	 * Repeat until loop.
	 */
	"asSorting": null,

	/**
	 * Flag to indicate if the column is searchable, and thus should be included
	 * in the filtering or not.
	 */
	"bSearchable": null,

	/**
	 * Flag to indicate if the column is sortable or not.
	 */
	"bSortable": null,

	/**
	 * Flag to indicate if the column is currently visible in the table or not
	 */
	"bVisible": null,

	/**
	 * Store for manual type assignment using the `column.type` option. This
	 * is held in store so we can manipulate the column's `sType` property.
	 */
	"_sManualType": null,

	/**
	 * Flag to indicate if HTML5 data attributes should be used as the data
	 * source for filtering or sorting. True is either are.
	 */
	"_bAttrSrc": false,

	/**
	 * Developer definable function that is called whenever a cell is created (Ajax source,
	 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
	 * allowing you to modify the DOM element (add background colour for example) when the
	 * element is available.
	 */
	"fnCreatedCell": null,

	/**
	 * Function to get data from a cell in a column. You should <b>never</b>
	 * access data directly through _aData internally in DataTables - always use
	 * the method attached to this property. It allows mData to function as
	 * required. This function is automatically assigned by the column
	 * initialisation method
	 */
	"fnGetData": null,

	/**
	 * Function to set data for a cell in the column. You should <b>never</b>
	 * set the data directly to _aData internally in DataTables - always use
	 * this method. It allows mData to function as required. This function
	 * is automatically assigned by the column initialisation method
	 */
	"fnSetData": null,

	/**
	 * Property to read the value for the cells in the column from the data
	 * source array / object. If null, then the default content is used, if a
	 * function is given then the return from the function is used.
	 */
	"mData": null,

	/**
	 * Partner property to mData which is used (only when defined) to get
	 * the data - i.e. it is basically the same as mData, but without the
	 * 'set' option, and also the data fed to it is the result from mData.
	 * This is the rendering method to match the data method of mData.
	 */
	"mRender": null,

	/**
	 * The class to apply to all TD elements in the table's TBODY for the column
	 */
	"sClass": null,

	/**
	 * When DataTables calculates the column widths to assign to each column,
	 * it finds the longest string in each column and then constructs a
	 * temporary table and reads the widths from that. The problem with this
	 * is that "mmm" is much wider then "iiii", but the latter is a longer
	 * string - thus the calculation can go wrong (doing it properly and putting
	 * it into an DOM object and measuring that is horribly(!) slow). Thus as
	 * a "work around" we provide this option. It will append its value to the
	 * text that is found to be the longest string for the column - i.e. padding.
	 */
	"sContentPadding": null,

	/**
	 * Allows a default value to be given for a column's data, and will be used
	 * whenever a null data source is encountered (this can be because mData
	 * is set to null, or because the data source itself is null).
	 */
	"sDefaultContent": null,

	/**
	 * Name for the column, allowing reference to the column by name as well as
	 * by index (needs a lookup to work by name).
	 */
	"sName": null,

	/**
	 * Custom sorting data type - defines which of the available plug-ins in
	 * afnSortData the custom sorting will use - if any is defined.
	 */
	"sSortDataType": 'std',

	/**
	 * Class to be applied to the header element when sorting on this column
	 */
	"sSortingClass": null,

	/**
	 * Title of the column - what is seen in the TH element (nTh).
	 */
	"sTitle": null,

	/**
	 * Column sorting and filtering type
	 */
	"sType": null,

	/**
	 * Width of the column
	 */
	"sWidth": null,

	/**
	 * Width of the column when it was first "encountered"
	 */
	"sWidthOrig": null,

	/** Cached string which is the longest in the column */
	maxLenString: null,

	/**
	 * Store for named searches
	 */
	searchFixed: null
};


/*
 * Developer note: The properties of the object below are given in Hungarian
 * notation, that was used as the interface for DataTables prior to v1.10, however
 * from v1.10 onwards the primary interface is camel case. In order to avoid
 * breaking backwards compatibility utterly with this change, the Hungarian
 * version is still, internally the primary interface, but is is not documented
 * - hence the @name tags in each doc comment. This allows a Javascript function
 * to create a map from Hungarian notation to camel case (going the other direction
 * would require each property to be listed, which would add around 3K to the size
 * of DataTables, while this method is about a 0.5K hit).
 *
 * Ultimately this does pave the way for Hungarian notation to be dropped
 * completely, but that is a massive amount of work and will break current
 * installs (therefore is on-hold until v2).
 */

/**
 * Initialisation options that can be given to DataTables at initialisation
 * time.
 *  @namespace
 */
DataTable.defaults = {
	/**
	 * An array of data to use for the table, passed in at initialisation which
	 * will be used in preference to any data which is already in the DOM. This is
	 * particularly useful for constructing tables purely in Javascript, for
	 * example with a custom Ajax call.
	 */
	"aaData": null,


	/**
	 * If ordering is enabled, then DataTables will perform a first pass sort on
	 * initialisation. You can define which column(s) the sort is performed
	 * upon, and the sorting direction, with this variable. The `sorting` array
	 * should contain an array for each column to be sorted initially containing
	 * the column's index and a direction string ('asc' or 'desc').
	 */
	"aaSorting": [[0,'asc']],


	/**
	 * This parameter is basically identical to the `sorting` parameter, but
	 * cannot be overridden by user interaction with the table. What this means
	 * is that you could have a column (visible or hidden) which the sorting
	 * will always be forced on first - any sorting after that (from the user)
	 * will then be performed as required. This can be useful for grouping rows
	 * together.
	 */
	"aaSortingFixed": [],


	/**
	 * DataTables can be instructed to load data to display in the table from a
	 * Ajax source. This option defines how that Ajax call is made and where to.
	 *
	 * The `ajax` property has three different modes of operation, depending on
	 * how it is defined. These are:
	 *
	 * * `string` - Set the URL from where the data should be loaded from.
	 * * `object` - Define properties for `jQuery.ajax`.
	 * * `function` - Custom data get function
	 *
	 * `string`
	 * --------
	 *
	 * As a string, the `ajax` property simply defines the URL from which
	 * DataTables will load data.
	 *
	 * `object`
	 * --------
	 *
	 * As an object, the parameters in the object are passed to
	 * [jQuery.ajax](https://api.jquery.com/jQuery.ajax/) allowing fine control
	 * of the Ajax request. DataTables has a number of default parameters which
	 * you can override using this option. Please refer to the jQuery
	 * documentation for a full description of the options available, although
	 * the following parameters provide additional options in DataTables or
	 * require special consideration:
	 *
	 * * `data` - As with jQuery, `data` can be provided as an object, but it
	 *   can also be used as a function to manipulate the data DataTables sends
	 *   to the server. The function takes a single parameter, an object of
	 *   parameters with the values that DataTables has readied for sending. An
	 *   object may be returned which will be merged into the DataTables
	 *   defaults, or you can add the items to the object that was passed in and
	 *   not return anything from the function. This supersedes `fnServerParams`
	 *   from DataTables 1.9-.
	 *
	 * * `dataSrc` - By default DataTables will look for the property `data` (or
	 *   `aaData` for compatibility with DataTables 1.9-) when obtaining data
	 *   from an Ajax source or for server-side processing - this parameter
	 *   allows that property to be changed. You can use Javascript dotted
	 *   object notation to get a data source for multiple levels of nesting, or
	 *   it my be used as a function. As a function it takes a single parameter,
	 *   the JSON returned from the server, which can be manipulated as
	 *   required, with the returned value being that used by DataTables as the
	 *   data source for the table.
	 *
	 * * `success` - Should not be overridden it is used internally in
	 *   DataTables. To manipulate / transform the data returned by the server
	 *   use `ajax.dataSrc`, or use `ajax` as a function (see below).
	 *
	 * `function`
	 * ----------
	 *
	 * As a function, making the Ajax call is left up to yourself allowing
	 * complete control of the Ajax request. Indeed, if desired, a method other
	 * than Ajax could be used to obtain the required data, such as Web storage
	 * or an AIR database.
	 *
	 * The function is given four parameters and no return is required. The
	 * parameters are:
	 *
	 * 1. _object_ - Data to send to the server
	 * 2. _function_ - Callback function that must be executed when the required
	 *    data has been obtained. That data should be passed into the callback
	 *    as the only parameter
	 * 3. _object_ - DataTables settings object for the table
	 */
	"ajax": null,


	/**
	 * This parameter allows you to readily specify the entries in the length drop
	 * down menu that DataTables shows when pagination is enabled. It can be
	 * either a 1D array of options which will be used for both the displayed
	 * option and the value, or a 2D array which will use the array in the first
	 * position as the value, and the array in the second position as the
	 * displayed options (useful for language strings such as 'All').
	 *
	 * Note that the `pageLength` property will be automatically set to the
	 * first value given in this array, unless `pageLength` is also provided.
	 */
	"aLengthMenu": [ 10, 25, 50, 100 ],


	/**
	 * The `columns` option in the initialisation parameter allows you to define
	 * details about the way individual columns behave. For a full list of
	 * column options that can be set, please see
	 * {@link DataTable.defaults.column}. Note that if you use `columns` to
	 * define your columns, you must have an entry in the array for every single
	 * column that you have in your table (these can be null if you don't which
	 * to specify any options).
	 */
	"aoColumns": null,

	/**
	 * Very similar to `columns`, `columnDefs` allows you to target a specific
	 * column, multiple columns, or all columns, using the `targets` property of
	 * each object in the array. This allows great flexibility when creating
	 * tables, as the `columnDefs` arrays can be of any length, targeting the
	 * columns you specifically want. `columnDefs` may use any of the column
	 * options available: {@link DataTable.defaults.column}, but it _must_
	 * have `targets` defined in each object in the array. Values in the `targets`
	 * array may be:
	 *   <ul>
	 *     <li>a string - class name will be matched on the TH for the column</li>
	 *     <li>0 or a positive integer - column index counting from the left</li>
	 *     <li>a negative integer - column index counting from the right</li>
	 *     <li>the string "_all" - all columns (i.e. assign a default)</li>
	 *   </ul>
	 */
	"aoColumnDefs": null,


	/**
	 * Basically the same as `search`, this parameter defines the individual column
	 * filtering state at initialisation time. The array must be of the same size
	 * as the number of columns, and each element be an object with the parameters
	 * `search` and `escapeRegex` (the latter is optional). 'null' is also
	 * accepted and the default will be used.
	 */
	"aoSearchCols": [],


	/**
	 * Enable or disable automatic column width calculation. This can be disabled
	 * as an optimisation (it takes some time to calculate the widths) if the
	 * tables widths are passed in using `columns`.
	 */
	"bAutoWidth": true,


	/**
	 * Deferred rendering can provide DataTables with a huge speed boost when you
	 * are using an Ajax or JS data source for the table. This option, when set to
	 * true, will cause DataTables to defer the creation of the table elements for
	 * each row until they are needed for a draw - saving a significant amount of
	 * time.
	 */
	"bDeferRender": true,


	/**
	 * Replace a DataTable which matches the given selector and replace it with
	 * one which has the properties of the new initialisation object passed. If no
	 * table matches the selector, then the new DataTable will be constructed as
	 * per normal.
	 */
	"bDestroy": false,


	/**
	 * Enable or disable filtering of data. Filtering in DataTables is "smart" in
	 * that it allows the end user to input multiple words (space separated) and
	 * will match a row containing those words, even if not in the order that was
	 * specified (this allow matching across multiple columns). Note that if you
	 * wish to use filtering in DataTables this must remain 'true' - to remove the
	 * default filtering input box and retain filtering abilities, please use
	 * {@link DataTable.defaults.dom}.
	 */
	"bFilter": true,

	/**
	 * Used only for compatiblity with DT1
	 * @deprecated
	 */
	"bInfo": true,

	/**
	 * Used only for compatiblity with DT1
	 * @deprecated
	 */
	"bLengthChange": true,

	/**
	 * Enable or disable pagination.
	 */
	"bPaginate": true,


	/**
	 * Enable or disable the display of a 'processing' indicator when the table is
	 * being processed (e.g. a sort). This is particularly useful for tables with
	 * large amounts of data where it can take a noticeable amount of time to sort
	 * the entries.
	 */
	"bProcessing": false,


	/**
	 * Retrieve the DataTables object for the given selector. Note that if the
	 * table has already been initialised, this parameter will cause DataTables
	 * to simply return the object that has already been set up - it will not take
	 * account of any changes you might have made to the initialisation object
	 * passed to DataTables (setting this parameter to true is an acknowledgement
	 * that you understand this). `destroy` can be used to reinitialise a table if
	 * you need.
	 */
	"bRetrieve": false,


	/**
	 * When vertical (y) scrolling is enabled, DataTables will force the height of
	 * the table's viewport to the given height at all times (useful for layout).
	 * However, this can look odd when filtering data down to a small data set,
	 * and the footer is left "floating" further down. This parameter (when
	 * enabled) will cause DataTables to collapse the table's viewport down when
	 * the result set will fit within the given Y height.
	 */
	"bScrollCollapse": false,


	/**
	 * Configure DataTables to use server-side processing. Note that the
	 * `ajax` parameter must also be given in order to give DataTables a
	 * source to obtain the required data for each draw.
	 */
	"bServerSide": false,


	/**
	 * Enable or disable sorting of columns. Sorting of individual columns can be
	 * disabled by the `sortable` option for each column.
	 */
	"bSort": true,


	/**
	 * Enable or display DataTables' ability to sort multiple columns at the
	 * same time (activated by shift-click by the user).
	 */
	"bSortMulti": true,


	/**
	 * Allows control over whether DataTables should use the top (true) unique
	 * cell that is found for a single column, or the bottom (false - default).
	 * This is useful when using complex headers.
	 */
	"bSortCellsTop": null,


	/**
	 * Enable or disable the addition of the classes `sorting\_1`, `sorting\_2` and
	 * `sorting\_3` to the columns which are currently being sorted on. This is
	 * presented as a feature switch as it can increase processing time (while
	 * classes are removed and added) so for large data sets you might want to
	 * turn this off.
	 */
	"bSortClasses": true,


	/**
	 * Enable or disable state saving. When enabled HTML5 `localStorage` will be
	 * used to save table display information such as pagination information,
	 * display length, filtering and sorting. As such when the end user reloads
	 * the page the display display will match what thy had previously set up.
	 */
	"bStateSave": false,


	/**
	 * This function is called when a TR element is created (and all TD child
	 * elements have been inserted), or registered if using a DOM source, allowing
	 * manipulation of the TR element (adding classes etc).
	 */
	"fnCreatedRow": null,


	/**
	 * This function is called on every 'draw' event, and allows you to
	 * dynamically modify any aspect you want about the created DOM.
	 */
	"fnDrawCallback": null,


	/**
	 * Identical to fnHeaderCallback() but for the table footer this function
	 * allows you to modify the table footer on every 'draw' event.
	 */
	"fnFooterCallback": null,


	/**
	 * When rendering large numbers in the information element for the table
	 * (i.e. "Showing 1 to 10 of 57 entries") DataTables will render large numbers
	 * to have a comma separator for the 'thousands' units (e.g. 1 million is
	 * rendered as "1,000,000") to help readability for the end user. This
	 * function will override the default method DataTables uses.
	 */
	"fnFormatNumber": function ( toFormat ) {
		return toFormat.toString().replace(
			/\B(?=(\d{3})+(?!\d))/g,
			this.oLanguage.sThousands
		);
	},


	/**
	 * This function is called on every 'draw' event, and allows you to
	 * dynamically modify the header row. This can be used to calculate and
	 * display useful information about the table.
	 */
	"fnHeaderCallback": null,


	/**
	 * The information element can be used to convey information about the current
	 * state of the table. Although the internationalisation options presented by
	 * DataTables are quite capable of dealing with most customisations, there may
	 * be times where you wish to customise the string further. This callback
	 * allows you to do exactly that.
	 */
	"fnInfoCallback": null,


	/**
	 * Called when the table has been initialised. Normally DataTables will
	 * initialise sequentially and there will be no need for this function,
	 * however, this does not hold true when using external language information
	 * since that is obtained using an async XHR call.
	 */
	"fnInitComplete": null,


	/**
	 * Called at the very start of each table draw and can be used to cancel the
	 * draw by returning false, any other return (including undefined) results in
	 * the full draw occurring).
	 */
	"fnPreDrawCallback": null,


	/**
	 * This function allows you to 'post process' each row after it have been
	 * generated for each table draw, but before it is rendered on screen. This
	 * function might be used for setting the row class name etc.
	 */
	"fnRowCallback": null,


	/**
	 * Load the table state. With this function you can define from where, and how, the
	 * state of a table is loaded. By default DataTables will load from `localStorage`
	 * but you might wish to use a server-side database or cookies.
	 */
	"fnStateLoadCallback": function ( settings ) {
		try {
			return JSON.parse(
				(settings.iStateDuration === -1 ? sessionStorage : localStorage).getItem(
					'DataTables_'+settings.sInstance+'_'+location.pathname
				)
			);
		} catch (e) {
			return {};
		}
	},


	/**
	 * Callback which allows modification of the saved state prior to loading that state.
	 * This callback is called when the table is loading state from the stored data, but
	 * prior to the settings object being modified by the saved state. Note that for
	 * plug-in authors, you should use the `stateLoadParams` event to load parameters for
	 * a plug-in.
	 */
	"fnStateLoadParams": null,


	/**
	 * Callback that is called when the state has been loaded from the state saving method
	 * and the DataTables settings object has been modified as a result of the loaded state.
	 */
	"fnStateLoaded": null,


	/**
	 * Save the table state. This function allows you to define where and how the state
	 * information for the table is stored By default DataTables will use `localStorage`
	 * but you might wish to use a server-side database or cookies.
	 */
	"fnStateSaveCallback": function ( settings, data ) {
		try {
			(settings.iStateDuration === -1 ? sessionStorage : localStorage).setItem(
				'DataTables_'+settings.sInstance+'_'+location.pathname,
				JSON.stringify( data )
			);
		} catch (e) {
			// noop
		}
	},


	/**
	 * Callback which allows modification of the state to be saved. Called when the table
	 * has changed state a new state save is required. This method allows modification of
	 * the state saving object prior to actually doing the save, including addition or
	 * other state properties or modification. Note that for plug-in authors, you should
	 * use the `stateSaveParams` event to save parameters for a plug-in.
	 */
	"fnStateSaveParams": null,


	/**
	 * Duration for which the saved state information is considered valid. After this period
	 * has elapsed the state will be returned to the default.
	 * Value is given in seconds.
	 */
	"iStateDuration": 7200,


	/**
	 * Number of rows to display on a single page when using pagination. If
	 * feature enabled (`lengthChange`) then the end user will be able to override
	 * this to a custom setting using a pop-up menu.
	 */
	"iDisplayLength": 10,


	/**
	 * Define the starting point for data display when using DataTables with
	 * pagination. Note that this parameter is the number of records, rather than
	 * the page number, so if you have 10 records per page and want to start on
	 * the third page, it should be "20".
	 */
	"iDisplayStart": 0,


	/**
	 * By default DataTables allows keyboard navigation of the table (sorting, paging,
	 * and filtering) by adding a `tabindex` attribute to the required elements. This
	 * allows you to tab through the controls and press the enter key to activate them.
	 * The tabindex is default 0, meaning that the tab follows the flow of the document.
	 * You can overrule this using this parameter if you wish. Use a value of -1 to
	 * disable built-in keyboard navigation.
	 */
	"iTabIndex": 0,


	/**
	 * Classes that DataTables assigns to the various components and features
	 * that it adds to the HTML table. This allows classes to be configured
	 * during initialisation in addition to through the static
	 * {@link DataTable.ext.oStdClasses} object).
	 */
	"oClasses": {},


	/**
	 * All strings that DataTables uses in the user interface that it creates
	 * are defined in this object, allowing you to modified them individually or
	 * completely replace them all as required.
	 */
	"oLanguage": {
		/**
		 * Strings that are used for WAI-ARIA labels and controls only (these are not
		 * actually visible on the page, but will be read by screenreaders, and thus
		 * must be internationalised as well).
		 */
		"oAria": {
			/**
			 * ARIA label that is added to the table headers when the column may be sorted
			 */
			"orderable": ": Activate to sort",

			/**
			 * ARIA label that is added to the table headers when the column is currently being sorted
			 */
			"orderableReverse": ": Activate to invert sorting",

			/**
			 * ARIA label that is added to the table headers when the column is currently being 
			 * sorted and next step is to remove sorting
			 */
			"orderableRemove": ": Activate to remove sorting",

			paginate: {
				first: 'First',
				last: 'Last',
				next: 'Next',
				previous: 'Previous',
				number: ''
			}
		},

		/**
		 * Pagination string used by DataTables for the built-in pagination
		 * control types.
		 */
		"oPaginate": {
			/**
			 * Label and character for first page button («)
			 */
			"sFirst": "\u00AB",

			/**
			 * Last page button (»)
			 */
			"sLast": "\u00BB",

			/**
			 * Next page button (›)
			 */
			"sNext": "\u203A",

			/**
			 * Previous page button (‹)
			 */
			"sPrevious": "\u2039",
		},

		/**
		 * Plural object for the data type the table is showing
		 */
		entries: {
			_: "entries",
			1: "entry"
		},

		/**
		 * This string is shown in preference to `zeroRecords` when the table is
		 * empty of data (regardless of filtering). Note that this is an optional
		 * parameter - if it is not given, the value of `zeroRecords` will be used
		 * instead (either the default or given value).
		 */
		"sEmptyTable": "No data available in table",


		/**
		 * This string gives information to the end user about the information
		 * that is current on display on the page. The following tokens can be
		 * used in the string and will be dynamically replaced as the table
		 * display updates. This tokens can be placed anywhere in the string, or
		 * removed as needed by the language requires:
		 *
		 * * `\_START\_` - Display index of the first record on the current page
		 * * `\_END\_` - Display index of the last record on the current page
		 * * `\_TOTAL\_` - Number of records in the table after filtering
		 * * `\_MAX\_` - Number of records in the table without filtering
		 * * `\_PAGE\_` - Current page number
		 * * `\_PAGES\_` - Total number of pages of data in the table
		 */
		"sInfo": "Showing _START_ to _END_ of _TOTAL_ _ENTRIES-TOTAL_",


		/**
		 * Display information string for when the table is empty. Typically the
		 * format of this string should match `info`.
		 */
		"sInfoEmpty": "Showing 0 to 0 of 0 _ENTRIES-TOTAL_",


		/**
		 * When a user filters the information in a table, this string is appended
		 * to the information (`info`) to give an idea of how strong the filtering
		 * is. The variable _MAX_ is dynamically updated.
		 */
		"sInfoFiltered": "(filtered from _MAX_ total _ENTRIES-MAX_)",


		/**
		 * If can be useful to append extra information to the info string at times,
		 * and this variable does exactly that. This information will be appended to
		 * the `info` (`infoEmpty` and `infoFiltered` in whatever combination they are
		 * being used) at all times.
		 */
		"sInfoPostFix": "",


		/**
		 * This decimal place operator is a little different from the other
		 * language options since DataTables doesn't output floating point
		 * numbers, so it won't ever use this for display of a number. Rather,
		 * what this parameter does is modify the sort methods of the table so
		 * that numbers which are in a format which has a character other than
		 * a period (`.`) as a decimal place will be sorted numerically.
		 *
		 * Note that numbers with different decimal places cannot be shown in
		 * the same table and still be sortable, the table must be consistent.
		 * However, multiple different tables on the page can use different
		 * decimal place characters.
		 */
		"sDecimal": "",


		/**
		 * DataTables has a build in number formatter (`formatNumber`) which is
		 * used to format large numbers that are used in the table information.
		 * By default a comma is used, but this can be trivially changed to any
		 * character you wish with this parameter.
		 */
		"sThousands": ",",


		/**
		 * Detail the action that will be taken when the drop down menu for the
		 * pagination length option is changed. The '_MENU_' variable is replaced
		 * with a default select list of 10, 25, 50 and 100, and can be replaced
		 * with a custom select box if required.
		 */
		"sLengthMenu": "_MENU_ _ENTRIES_ per page",


		/**
		 * When using Ajax sourced data and during the first draw when DataTables is
		 * gathering the data, this message is shown in an empty row in the table to
		 * indicate to the end user the the data is being loaded. Note that this
		 * parameter is not used when loading data by server-side processing, just
		 * Ajax sourced data with client-side processing.
		 */
		"sLoadingRecords": "Loading...",


		/**
		 * Text which is displayed when the table is processing a user action
		 * (usually a sort command or similar).
		 */
		"sProcessing": "",


		/**
		 * Details the actions that will be taken when the user types into the
		 * filtering input text box. The variable "_INPUT_", if used in the string,
		 * is replaced with the HTML text box for the filtering input allowing
		 * control over where it appears in the string. If "_INPUT_" is not given
		 * then the input box is appended to the string automatically.
		 */
		"sSearch": "Search:",


		/**
		 * Assign a `placeholder` attribute to the search `input` element
		 *  @type string
		 *  @default 
		 *
		 *  @dtopt Language
		 *  @name DataTable.defaults.language.searchPlaceholder
		 */
		"sSearchPlaceholder": "",


		/**
		 * All of the language information can be stored in a file on the
		 * server-side, which DataTables will look up if this parameter is passed.
		 * It must store the URL of the language file, which is in a JSON format,
		 * and the object has the same properties as the oLanguage object in the
		 * initialiser object (i.e. the above parameters). Please refer to one of
		 * the example language files to see how this works in action.
		 */
		"sUrl": "",


		/**
		 * Text shown inside the table records when the is no information to be
		 * displayed after filtering. `emptyTable` is shown when there is simply no
		 * information in the table at all (regardless of filtering).
		 */
		"sZeroRecords": "No matching records found"
	},


	/** The initial data order is reversed when `desc` ordering */
	orderDescReverse: true,


	/**
	 * This parameter allows you to have define the global filtering state at
	 * initialisation time. As an object the `search` parameter must be
	 * defined, but all other parameters are optional. When `regex` is true,
	 * the search string will be treated as a regular expression, when false
	 * (default) it will be treated as a straight string. When `smart`
	 * DataTables will use it's smart filtering methods (to word match at
	 * any point in the data), when false this will not be done.
	 */
	"oSearch": $.extend( {}, DataTable.models.oSearch ),


	/**
	 * Table and control layout. This replaces the legacy `dom` option.
	 */
	layout: {
		topStart: 'pageLength',
		topEnd: 'search',
		bottomStart: 'info',
		bottomEnd: 'paging'
	},


	/**
	 * Legacy DOM layout option
	 */
	"sDom": null,


	/**
	 * Search delay option. This will throttle full table searches that use the
	 * DataTables provided search input element (it does not effect calls to
	 * `dt-api search()`, providing a delay before the search is made.
	 */
	"searchDelay": null,


	/**
	 * DataTables features six different built-in options for the buttons to
	 * display for pagination control:
	 *
	 * * `numbers` - Page number buttons only
	 * * `simple` - 'Previous' and 'Next' buttons only
	 * * 'simple_numbers` - 'Previous' and 'Next' buttons, plus page numbers
	 * * `full` - 'First', 'Previous', 'Next' and 'Last' buttons
	 * * `full_numbers` - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
	 * * `first_last_numbers` - 'First' and 'Last' buttons, plus page numbers
	 */
	"sPaginationType": "",


	/**
	 * Enable horizontal scrolling. When a table is too wide to fit into a
	 * certain layout, or you have a large number of columns in the table, you
	 * can enable x-scrolling to show the table in a viewport, which can be
	 * scrolled. This property can be `true` which will allow the table to
	 * scroll horizontally when needed, or any CSS unit, or a number (in which
	 * case it will be treated as a pixel measurement). Setting as simply `true`
	 * is recommended.
	 */
	"sScrollX": "",


	/**
	 * This property can be used to force a DataTable to use more width than it
	 * might otherwise do when x-scrolling is enabled. For example if you have a
	 * table which requires to be well spaced, this parameter is useful for
	 * "over-sizing" the table, and thus forcing scrolling. This property can by
	 * any CSS unit, or a number (in which case it will be treated as a pixel
	 * measurement).
	 */
	"sScrollXInner": "",


	/**
	 * Enable vertical scrolling. Vertical scrolling will constrain the DataTable
	 * to the given height, and enable scrolling for any data which overflows the
	 * current viewport. This can be used as an alternative to paging to display
	 * a lot of data in a small area (although paging and scrolling can both be
	 * enabled at the same time). This property can be any CSS unit, or a number
	 * (in which case it will be treated as a pixel measurement).
	 */
	"sScrollY": "",


	/**
	 * __Deprecated__ The functionality provided by this parameter has now been
	 * superseded by that provided through `ajax`, which should be used instead.
	 *
	 * Set the HTTP method that is used to make the Ajax call for server-side
	 * processing or Ajax sourced data.
	 */
	"sServerMethod": "GET",


	/**
	 * DataTables makes use of renderers when displaying HTML elements for
	 * a table. These renderers can be added or modified by plug-ins to
	 * generate suitable mark-up for a site. For example the Bootstrap
	 * integration plug-in for DataTables uses a paging button renderer to
	 * display pagination buttons in the mark-up required by Bootstrap.
	 *
	 * For further information about the renderers available see
	 * DataTable.ext.renderer
	 */
	"renderer": null,


	/**
	 * Set the data property name that DataTables should use to get a row's id
	 * to set as the `id` property in the node.
	 */
	"rowId": "DT_RowId",


	/**
	 * Caption value
	 */
	"caption": null,


	/**
	 * For server-side processing - use the data from the DOM for the first draw
	 */
	iDeferLoading: null
};

_fnHungarianMap( DataTable.defaults );



/*
 * Developer note - See note in model.defaults.js about the use of Hungarian
 * notation and camel case.
 */

/**
 * Column options that can be given to DataTables at initialisation time.
 *  @namespace
 */
DataTable.defaults.column = {
	/**
	 * Define which column(s) an order will occur on for this column. This
	 * allows a column's ordering to take multiple columns into account when
	 * doing a sort or use the data from a different column. For example first
	 * name / last name columns make sense to do a multi-column sort over the
	 * two columns.
	 */
	"aDataSort": null,
	"iDataSort": -1,

	ariaTitle: '',


	/**
	 * You can control the default ordering direction, and even alter the
	 * behaviour of the sort handler (i.e. only allow ascending ordering etc)
	 * using this parameter.
	 */
	"asSorting": [ 'asc', 'desc', '' ],


	/**
	 * Enable or disable filtering on the data in this column.
	 */
	"bSearchable": true,


	/**
	 * Enable or disable ordering on this column.
	 */
	"bSortable": true,


	/**
	 * Enable or disable the display of this column.
	 */
	"bVisible": true,


	/**
	 * Developer definable function that is called whenever a cell is created (Ajax source,
	 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
	 * allowing you to modify the DOM element (add background colour for example) when the
	 * element is available.
	 */
	"fnCreatedCell": null,


	/**
	 * This property can be used to read data from any data source property,
	 * including deeply nested objects / properties. `data` can be given in a
	 * number of different ways which effect its behaviour:
	 *
	 * * `integer` - treated as an array index for the data source. This is the
	 *   default that DataTables uses (incrementally increased for each column).
	 * * `string` - read an object property from the data source. There are
	 *   three 'special' options that can be used in the string to alter how
	 *   DataTables reads the data from the source object:
	 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
	 *      Javascript to read from nested objects, so to can the options
	 *      specified in `data`. For example: `browser.version` or
	 *      `browser.name`. If your object parameter name contains a period, use
	 *      `\\` to escape it - i.e. `first\\.name`.
	 *    * `[]` - Array notation. DataTables can automatically combine data
	 *      from and array source, joining the data with the characters provided
	 *      between the two brackets. For example: `name[, ]` would provide a
	 *      comma-space separated list from the source array. If no characters
	 *      are provided between the brackets, the original array source is
	 *      returned.
	 *    * `()` - Function notation. Adding `()` to the end of a parameter will
	 *      execute a function of the name given. For example: `browser()` for a
	 *      simple function on the data source, `browser.version()` for a
	 *      function in a nested property or even `browser().version` to get an
	 *      object property if the function called returns an object. Note that
	 *      function notation is recommended for use in `render` rather than
	 *      `data` as it is much simpler to use as a renderer.
	 * * `null` - use the original data source for the row rather than plucking
	 *   data directly from it. This action has effects on two other
	 *   initialisation options:
	 *    * `defaultContent` - When null is given as the `data` option and
	 *      `defaultContent` is specified for the column, the value defined by
	 *      `defaultContent` will be used for the cell.
	 *    * `render` - When null is used for the `data` option and the `render`
	 *      option is specified for the column, the whole data source for the
	 *      row is used for the renderer.
	 * * `function` - the function given will be executed whenever DataTables
	 *   needs to set or get the data for a cell in the column. The function
	 *   takes three parameters:
	 *    * Parameters:
	 *      * `{array|object}` The data source for the row
	 *      * `{string}` The type call data requested - this will be 'set' when
	 *        setting data or 'filter', 'display', 'type', 'sort' or undefined
	 *        when gathering data. Note that when `undefined` is given for the
	 *        type DataTables expects to get the raw data for the object back<
	 *      * `{*}` Data to set when the second parameter is 'set'.
	 *    * Return:
	 *      * The return value from the function is not required when 'set' is
	 *        the type of call, but otherwise the return is what will be used
	 *        for the data requested.
	 *
	 * Note that `data` is a getter and setter option. If you just require
	 * formatting of data for output, you will likely want to use `render` which
	 * is simply a getter and thus simpler to use.
	 *
	 * Note that prior to DataTables 1.9.2 `data` was called `mDataProp`. The
	 * name change reflects the flexibility of this property and is consistent
	 * with the naming of mRender. If 'mDataProp' is given, then it will still
	 * be used by DataTables, as it automatically maps the old name to the new
	 * if required.
	 */
	"mData": null,


	/**
	 * This property is the rendering partner to `data` and it is suggested that
	 * when you want to manipulate data for display (including filtering,
	 * sorting etc) without altering the underlying data for the table, use this
	 * property. `render` can be considered to be the the read only companion to
	 * `data` which is read / write (then as such more complex). Like `data`
	 * this option can be given in a number of different ways to effect its
	 * behaviour:
	 *
	 * * `integer` - treated as an array index for the data source. This is the
	 *   default that DataTables uses (incrementally increased for each column).
	 * * `string` - read an object property from the data source. There are
	 *   three 'special' options that can be used in the string to alter how
	 *   DataTables reads the data from the source object:
	 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
	 *      Javascript to read from nested objects, so to can the options
	 *      specified in `data`. For example: `browser.version` or
	 *      `browser.name`. If your object parameter name contains a period, use
	 *      `\\` to escape it - i.e. `first\\.name`.
	 *    * `[]` - Array notation. DataTables can automatically combine data
	 *      from and array source, joining the data with the characters provided
	 *      between the two brackets. For example: `name[, ]` would provide a
	 *      comma-space separated list from the source array. If no characters
	 *      are provided between the brackets, the original array source is
	 *      returned.
	 *    * `()` - Function notation. Adding `()` to the end of a parameter will
	 *      execute a function of the name given. For example: `browser()` for a
	 *      simple function on the data source, `browser.version()` for a
	 *      function in a nested property or even `browser().version` to get an
	 *      object property if the function called returns an object.
	 * * `object` - use different data for the different data types requested by
	 *   DataTables ('filter', 'display', 'type' or 'sort'). The property names
	 *   of the object is the data type the property refers to and the value can
	 *   defined using an integer, string or function using the same rules as
	 *   `render` normally does. Note that an `_` option _must_ be specified.
	 *   This is the default value to use if you haven't specified a value for
	 *   the data type requested by DataTables.
	 * * `function` - the function given will be executed whenever DataTables
	 *   needs to set or get the data for a cell in the column. The function
	 *   takes three parameters:
	 *    * Parameters:
	 *      * {array|object} The data source for the row (based on `data`)
	 *      * {string} The type call data requested - this will be 'filter',
	 *        'display', 'type' or 'sort'.
	 *      * {array|object} The full data source for the row (not based on
	 *        `data`)
	 *    * Return:
	 *      * The return value from the function is what will be used for the
	 *        data requested.
	 */
	"mRender": null,


	/**
	 * Change the cell type created for the column - either TD cells or TH cells. This
	 * can be useful as TH cells have semantic meaning in the table body, allowing them
	 * to act as a header for a row (you may wish to add scope='row' to the TH elements).
	 */
	"sCellType": "td",


	/**
	 * Class to give to each cell in this column.
	 */
	"sClass": "",

	/**
	 * When DataTables calculates the column widths to assign to each column,
	 * it finds the longest string in each column and then constructs a
	 * temporary table and reads the widths from that. The problem with this
	 * is that "mmm" is much wider then "iiii", but the latter is a longer
	 * string - thus the calculation can go wrong (doing it properly and putting
	 * it into an DOM object and measuring that is horribly(!) slow). Thus as
	 * a "work around" we provide this option. It will append its value to the
	 * text that is found to be the longest string for the column - i.e. padding.
	 * Generally you shouldn't need this!
	 */
	"sContentPadding": "",


	/**
	 * Allows a default value to be given for a column's data, and will be used
	 * whenever a null data source is encountered (this can be because `data`
	 * is set to null, or because the data source itself is null).
	 */
	"sDefaultContent": null,


	/**
	 * This parameter is only used in DataTables' server-side processing. It can
	 * be exceptionally useful to know what columns are being displayed on the
	 * client side, and to map these to database fields. When defined, the names
	 * also allow DataTables to reorder information from the server if it comes
	 * back in an unexpected order (i.e. if you switch your columns around on the
	 * client-side, your server-side code does not also need updating).
	 */
	"sName": "",


	/**
	 * Defines a data source type for the ordering which can be used to read
	 * real-time information from the table (updating the internally cached
	 * version) prior to ordering. This allows ordering to occur on user
	 * editable elements such as form inputs.
	 */
	"sSortDataType": "std",


	/**
	 * The title of this column.
	 */
	"sTitle": null,


	/**
	 * The type allows you to specify how the data for this column will be
	 * ordered. Four types (string, numeric, date and html (which will strip
	 * HTML tags before ordering)) are currently available. Note that only date
	 * formats understood by Javascript's Date() object will be accepted as type
	 * date. For example: "Mar 26, 2008 5:03 PM". May take the values: 'string',
	 * 'numeric', 'date' or 'html' (by default). Further types can be adding
	 * through plug-ins.
	 */
	"sType": null,


	/**
	 * Defining the width of the column, this parameter may take any CSS value
	 * (3em, 20px etc). DataTables applies 'smart' widths to columns which have not
	 * been given a specific width through this interface ensuring that the table
	 * remains readable.
	 */
	"sWidth": null
};

_fnHungarianMap( DataTable.defaults.column );



/**
 * DataTables settings object - this holds all the information needed for a
 * given table, including configuration, data and current application of the
 * table options. DataTables does not have a single instance for each DataTable
 * with the settings attached to that instance, but rather instances of the
 * DataTable "class" are created on-the-fly as needed (typically by a
 * $().dataTable() call) and the settings object is then applied to that
 * instance.
 *
 * Note that this object is related to {@link DataTable.defaults} but this
 * one is the internal data store for DataTables's cache of columns. It should
 * NOT be manipulated outside of DataTables. Any configuration should be done
 * through the initialisation options.
 */
DataTable.models.oSettings = {
	/**
	 * Primary features of DataTables and their enablement state.
	 */
	"oFeatures": {

		/**
		 * Flag to say if DataTables should automatically try to calculate the
		 * optimum table and columns widths (true) or not (false).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 */
		"bAutoWidth": null,

		/**
		 * Delay the creation of TR and TD elements until they are actually
		 * needed by a driven page draw. This can give a significant speed
		 * increase for Ajax source and Javascript source data, but makes no
		 * difference at all for DOM and server-side processing tables.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 */
		"bDeferRender": null,

		/**
		 * Enable filtering on the table or not. Note that if this is disabled
		 * then there is no filtering at all on the table, including fnFilter.
		 * To just remove the filtering input use sDom and remove the 'f' option.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 */
		"bFilter": null,

		/**
		 * Used only for compatiblity with DT1
		 * @deprecated
		 */
		"bInfo": true,

		/**
		 * Used only for compatiblity with DT1
		 * @deprecated
		 */
		"bLengthChange": true,

		/**
		 * Pagination enabled or not. Note that if this is disabled then length
		 * changing must also be disabled.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 */
		"bPaginate": null,

		/**
		 * Processing indicator enable flag whenever DataTables is enacting a
		 * user request - typically an Ajax request for server-side processing.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 */
		"bProcessing": null,

		/**
		 * Server-side processing enabled flag - when enabled DataTables will
		 * get all data from the server for every draw - there is no filtering,
		 * sorting or paging done on the client-side.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 */
		"bServerSide": null,

		/**
		 * Sorting enablement flag.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 */
		"bSort": null,

		/**
		 * Multi-column sorting
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 */
		"bSortMulti": null,

		/**
		 * Apply a class to the columns which are being sorted to provide a
		 * visual highlight or not. This can slow things down when enabled since
		 * there is a lot of DOM interaction.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 */
		"bSortClasses": null,

		/**
		 * State saving enablement flag.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 */
		"bStateSave": null
	},


	/**
	 * Scrolling settings for a table.
	 */
	"oScroll": {
		/**
		 * When the table is shorter in height than sScrollY, collapse the
		 * table container down to the height of the table (when true).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 */
		"bCollapse": null,

		/**
		 * Width of the scrollbar for the web-browser's platform. Calculated
		 * during table initialisation.
		 */
		"iBarWidth": 0,

		/**
		 * Viewport width for horizontal scrolling. Horizontal scrolling is
		 * disabled if an empty string.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 */
		"sX": null,

		/**
		 * Width to expand the table to when using x-scrolling. Typically you
		 * should not need to use this.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @deprecated
		 */
		"sXInner": null,

		/**
		 * Viewport height for vertical scrolling. Vertical scrolling is disabled
		 * if an empty string.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 */
		"sY": null
	},

	/**
	 * Language information for the table.
	 */
	"oLanguage": {
		/**
		 * Information callback function. See
		 * {@link DataTable.defaults.fnInfoCallback}
		 */
		"fnInfoCallback": null
	},

	/**
	 * Browser support parameters
	 */
	"oBrowser": {
		/**
		 * Determine if the vertical scrollbar is on the right or left of the
		 * scrolling container - needed for rtl language layout, although not
		 * all browsers move the scrollbar (Safari).
		 */
		"bScrollbarLeft": false,

		/**
		 * Browser scrollbar width
		 */
		"barWidth": 0
	},


	"ajax": null,


	/**
	 * Array referencing the nodes which are used for the features. The
	 * parameters of this object match what is allowed by sDom - i.e.
	 *   <ul>
	 *     <li>'l' - Length changing</li>
	 *     <li>'f' - Filtering input</li>
	 *     <li>'t' - The table!</li>
	 *     <li>'i' - Information</li>
	 *     <li>'p' - Pagination</li>
	 *     <li>'r' - pRocessing</li>
	 *   </ul>
	 */
	"aanFeatures": [],

	/**
	 * Store data information - see {@link DataTable.models.oRow} for detailed
	 * information.
	 */
	"aoData": [],

	/**
	 * Array of indexes which are in the current display (after filtering etc)
	 */
	"aiDisplay": [],

	/**
	 * Array of indexes for display - no filtering
	 */
	"aiDisplayMaster": [],

	/**
	 * Map of row ids to data indexes
	 */
	"aIds": {},

	/**
	 * Store information about each column that is in use
	 */
	"aoColumns": [],

	/**
	 * Store information about the table's header
	 */
	"aoHeader": [],

	/**
	 * Store information about the table's footer
	 */
	"aoFooter": [],

	/**
	 * Store the applied global search information in case we want to force a
	 * research or compare the old search to a new one.
	 * Note that this parameter will be set by the initialisation routine. To
	 * set a default use {@link DataTable.defaults}.
	 */
	"oPreviousSearch": {},

	/**
	 * Store for named searches
	 */
	searchFixed: {},

	/**
	 * Store the applied search for each column - see
	 * {@link DataTable.models.oSearch} for the format that is used for the
	 * filtering information for each column.
	 */
	"aoPreSearchCols": [],

	/**
	 * Sorting that is applied to the table. Note that the inner arrays are
	 * used in the following manner:
	 * <ul>
	 *   <li>Index 0 - column number</li>
	 *   <li>Index 1 - current sorting direction</li>
	 * </ul>
	 * Note that this parameter will be set by the initialisation routine. To
	 * set a default use {@link DataTable.defaults}.
	 */
	"aaSorting": null,

	/**
	 * Sorting that is always applied to the table (i.e. prefixed in front of
	 * aaSorting).
	 * Note that this parameter will be set by the initialisation routine. To
	 * set a default use {@link DataTable.defaults}.
	 */
	"aaSortingFixed": [],

	/**
	 * If restoring a table - we should restore its width
	 */
	"sDestroyWidth": 0,

	/**
	 * Callback functions array for every time a row is inserted (i.e. on a draw).
	 */
	"aoRowCallback": [],

	/**
	 * Callback functions for the header on each draw.
	 */
	"aoHeaderCallback": [],

	/**
	 * Callback function for the footer on each draw.
	 */
	"aoFooterCallback": [],

	/**
	 * Array of callback functions for draw callback functions
	 */
	"aoDrawCallback": [],

	/**
	 * Array of callback functions for row created function
	 */
	"aoRowCreatedCallback": [],

	/**
	 * Callback functions for just before the table is redrawn. A return of
	 * false will be used to cancel the draw.
	 */
	"aoPreDrawCallback": [],

	/**
	 * Callback functions for when the table has been initialised.
	 */
	"aoInitComplete": [],


	/**
	 * Callbacks for modifying the settings to be stored for state saving, prior to
	 * saving state.
	 */
	"aoStateSaveParams": [],

	/**
	 * Callbacks for modifying the settings that have been stored for state saving
	 * prior to using the stored values to restore the state.
	 */
	"aoStateLoadParams": [],

	/**
	 * Callbacks for operating on the settings object once the saved state has been
	 * loaded
	 */
	"aoStateLoaded": [],

	/**
	 * Cache the table ID for quick access
	 */
	"sTableId": "",

	/**
	 * The TABLE node for the main table
	 */
	"nTable": null,

	/**
	 * Permanent ref to the thead element
	 */
	"nTHead": null,

	/**
	 * Permanent ref to the tfoot element - if it exists
	 */
	"nTFoot": null,

	/**
	 * Permanent ref to the tbody element
	 */
	"nTBody": null,

	/**
	 * Cache the wrapper node (contains all DataTables controlled elements)
	 */
	"nTableWrapper": null,

	/**
	 * Indicate if all required information has been read in
	 */
	"bInitialised": false,

	/**
	 * Information about open rows. Each object in the array has the parameters
	 * 'nTr' and 'nParent'
	 */
	"aoOpenRows": [],

	/**
	 * Dictate the positioning of DataTables' control elements - see
	 * {@link DataTable.model.oInit.sDom}.
	 * Note that this parameter will be set by the initialisation routine. To
	 * set a default use {@link DataTable.defaults}.
	 */
	"sDom": null,

	/**
	 * Search delay (in mS)
	 */
	"searchDelay": null,

	/**
	 * Which type of pagination should be used.
	 * Note that this parameter will be set by the initialisation routine. To
	 * set a default use {@link DataTable.defaults}.
	 */
	"sPaginationType": "two_button",

	/**
	 * Number of paging controls on the page. Only used for backwards compatibility
	 */
	pagingControls: 0,

	/**
	 * The state duration (for `stateSave`) in seconds.
	 * Note that this parameter will be set by the initialisation routine. To
	 * set a default use {@link DataTable.defaults}.
	 */
	"iStateDuration": 0,

	/**
	 * Array of callback functions for state saving. Each array element is an
	 * object with the following parameters:
	 *   <ul>
	 *     <li>function:fn - function to call. Takes two parameters, oSettings
	 *       and the JSON string to save that has been thus far created. Returns
	 *       a JSON string to be inserted into a json object
	 *       (i.e. '"param": [ 0, 1, 2]')</li>
	 *     <li>string:sName - name of callback</li>
	 *   </ul>
	 */
	"aoStateSave": [],

	/**
	 * Array of callback functions for state loading. Each array element is an
	 * object with the following parameters:
	 *   <ul>
	 *     <li>function:fn - function to call. Takes two parameters, oSettings
	 *       and the object stored. May return false to cancel state loading</li>
	 *     <li>string:sName - name of callback</li>
	 *   </ul>
	 */
	"aoStateLoad": [],

	/**
	 * State that was saved. Useful for back reference
	 */
	"oSavedState": null,

	/**
	 * State that was loaded. Useful for back reference
	 */
	"oLoadedState": null,

	/**
	 * Note if draw should be blocked while getting data
	 */
	"bAjaxDataGet": true,

	/**
	 * The last jQuery XHR object that was used for server-side data gathering.
	 * This can be used for working with the XHR information in one of the
	 * callbacks
	 */
	"jqXHR": null,

	/**
	 * JSON returned from the server in the last Ajax request
	 */
	"json": undefined,

	/**
	 * Data submitted as part of the last Ajax request
	 */
	"oAjaxData": undefined,

	/**
	 * Send the XHR HTTP method - GET or POST (could be PUT or DELETE if
	 * required).
	 * Note that this parameter will be set by the initialisation routine. To
	 * set a default use {@link DataTable.defaults}.
	 */
	"sServerMethod": null,

	/**
	 * Format numbers for display.
	 * Note that this parameter will be set by the initialisation routine. To
	 * set a default use {@link DataTable.defaults}.
	 */
	"fnFormatNumber": null,

	/**
	 * List of options that can be used for the user selectable length menu.
	 * Note that this parameter will be set by the initialisation routine. To
	 * set a default use {@link DataTable.defaults}.
	 */
	"aLengthMenu": null,

	/**
	 * Counter for the draws that the table does. Also used as a tracker for
	 * server-side processing
	 */
	"iDraw": 0,

	/**
	 * Indicate if a redraw is being done - useful for Ajax
	 */
	"bDrawing": false,

	/**
	 * Draw index (iDraw) of the last error when parsing the returned data
	 */
	"iDrawError": -1,

	/**
	 * Paging display length
	 */
	"_iDisplayLength": 10,

	/**
	 * Paging start point - aiDisplay index
	 */
	"_iDisplayStart": 0,

	/**
	 * Server-side processing - number of records in the result set
	 * (i.e. before filtering), Use fnRecordsTotal rather than
	 * this property to get the value of the number of records, regardless of
	 * the server-side processing setting.
	 */
	"_iRecordsTotal": 0,

	/**
	 * Server-side processing - number of records in the current display set
	 * (i.e. after filtering). Use fnRecordsDisplay rather than
	 * this property to get the value of the number of records, regardless of
	 * the server-side processing setting.
	 */
	"_iRecordsDisplay": 0,

	/**
	 * The classes to use for the table
	 */
	"oClasses": {},

	/**
	 * Flag attached to the settings object so you can check in the draw
	 * callback if filtering has been done in the draw. Deprecated in favour of
	 * events.
	 *  @deprecated
	 */
	"bFiltered": false,

	/**
	 * Flag attached to the settings object so you can check in the draw
	 * callback if sorting has been done in the draw. Deprecated in favour of
	 * events.
	 *  @deprecated
	 */
	"bSorted": false,

	/**
	 * Indicate that if multiple rows are in the header and there is more than
	 * one unique cell per column, if the top one (true) or bottom one (false)
	 * should be used for sorting / title by DataTables.
	 * Note that this parameter will be set by the initialisation routine. To
	 * set a default use {@link DataTable.defaults}.
	 */
	"bSortCellsTop": null,

	/**
	 * Initialisation object that is used for the table
	 */
	"oInit": null,

	/**
	 * Destroy callback functions - for plug-ins to attach themselves to the
	 * destroy so they can clean up markup and events.
	 */
	"aoDestroyCallback": [],


	/**
	 * Get the number of records in the current record set, before filtering
	 */
	"fnRecordsTotal": function ()
	{
		return _fnDataSource( this ) == 'ssp' ?
			this._iRecordsTotal * 1 :
			this.aiDisplayMaster.length;
	},

	/**
	 * Get the number of records in the current record set, after filtering
	 */
	"fnRecordsDisplay": function ()
	{
		return _fnDataSource( this ) == 'ssp' ?
			this._iRecordsDisplay * 1 :
			this.aiDisplay.length;
	},

	/**
	 * Get the display end point - aiDisplay index
	 */
	"fnDisplayEnd": function ()
	{
		var
			len      = this._iDisplayLength,
			start    = this._iDisplayStart,
			calc     = start + len,
			records  = this.aiDisplay.length,
			features = this.oFeatures,
			paginate = features.bPaginate;

		if ( features.bServerSide ) {
			return paginate === false || len === -1 ?
				start + records :
				Math.min( start+len, this._iRecordsDisplay );
		}
		else {
			return ! paginate || calc>records || len===-1 ?
				records :
				calc;
		}
	},

	/**
	 * The DataTables object for this table
	 */
	"oInstance": null,

	/**
	 * Unique identifier for each instance of the DataTables object. If there
	 * is an ID on the table node, then it takes that value, otherwise an
	 * incrementing internal counter is used.
	 */
	"sInstance": null,

	/**
	 * tabindex attribute value that is added to DataTables control elements, allowing
	 * keyboard navigation of the table and its controls.
	 */
	"iTabIndex": 0,

	/**
	 * DIV container for the footer scrolling table if scrolling
	 */
	"nScrollHead": null,

	/**
	 * DIV container for the footer scrolling table if scrolling
	 */
	"nScrollFoot": null,

	/**
	 * Last applied sort
	 */
	"aLastSort": [],

	/**
	 * Stored plug-in instances
	 */
	"oPlugins": {},

	/**
	 * Function used to get a row's id from the row's data
	 */
	"rowIdFn": null,

	/**
	 * Data location where to store a row's id
	 */
	"rowId": null,

	caption: '',

	captionNode: null,

	colgroup: null,

	/** Delay loading of data */
	deferLoading: null,

	/** Allow auto type detection */
	typeDetect: true
};

/**
 * Extension object for DataTables that is used to provide all extension
 * options.
 *
 * Note that the `DataTable.ext` object is available through
 * `jQuery.fn.dataTable.ext` where it may be accessed and manipulated. It is
 * also aliased to `jQuery.fn.dataTableExt` for historic reasons.
 *  @namespace
 *  @extends DataTable.models.ext
 */


var extPagination = DataTable.ext.pager;

// Paging buttons configuration
$.extend( extPagination, {
	simple: function () {
		return [ 'previous', 'next' ];
	},

	full: function () {
		return [ 'first', 'previous', 'next', 'last' ];
	},

	numbers: function () {
		return [ 'numbers' ];
	},

	simple_numbers: function () {
		return [ 'previous', 'numbers', 'next' ];
	},

	full_numbers: function () {
		return [ 'first', 'previous', 'numbers', 'next', 'last' ];
	},

	first_last: function () {
		return ['first', 'last'];
	},

	first_last_numbers: function () {
		return ['first', 'numbers', 'last'];
	},

	// For testing and plug-ins to use
	_numbers: _pagingNumbers,

	// Number of number buttons - legacy, use `numbers` option for paging feature
	numbers_length: 7
} );


$.extend( true, DataTable.ext.renderer, {
	pagingButton: {
		_: function (settings, buttonType, content, active, disabled) {
			var classes = settings.oClasses.paging;
			var btnClasses = [classes.button];
			var btn;

			if (active) {
				btnClasses.push(classes.active);
			}

			if (disabled) {
				btnClasses.push(classes.disabled)
			}

			if (buttonType === 'ellipsis') {
				btn = $('<span class="ellipsis"></span>').html(content)[0];
			}
			else {
				btn = $('<button>', {
					class: btnClasses.join(' '),
					role: 'link',
					type: 'button'
				}).html(content);
			}

			return {
				display: btn,
				clicker: btn
			}
		}
	},

	pagingContainer: {
		_: function (settings, buttons) {
			// No wrapping element - just append directly to the host
			return buttons;
		}
	}
} );

// Common function to remove new lines, strip HTML and diacritic control
var _filterString = function (stripHtml, normalize) {
	return function (str) {
		if (_empty(str) || typeof str !== 'string') {
			return str;
		}

		str = str.replace( _re_new_lines, " " );

		if (stripHtml) {
			str = _stripHtml(str);
		}

		if (normalize) {
			str = _normalize(str, false);
		}

		return str;
	};
}

/*
 * Public helper functions. These aren't used internally by DataTables, or
 * called by any of the options passed into DataTables, but they can be used
 * externally by developers working with DataTables. They are helper functions
 * to make working with DataTables a little bit easier.
 */

/**
 * Common logic for moment, luxon or a date action.
 *
 * Happens after __mldObj, so don't need to call `resolveWindowsLibs` again
 */
function __mld( dtLib, momentFn, luxonFn, dateFn, arg1 ) {
	if (__moment) {
		return dtLib[momentFn]( arg1 );
	}
	else if (__luxon) {
		return dtLib[luxonFn]( arg1 );
	}
	
	return dateFn ? dtLib[dateFn]( arg1 ) : dtLib;
}


var __mlWarning = false;
var __luxon; // Can be assigned in DateTeble.use()
var __moment; // Can be assigned in DateTeble.use()

/**
 * 
 */
function resolveWindowLibs() {
	if (window.luxon && ! __luxon) {
		__luxon = window.luxon;
	}
	
	if (window.moment && ! __moment) {
		__moment = window.moment;
	}
}

function __mldObj (d, format, locale) {
	var dt;

	resolveWindowLibs();

	if (__moment) {
		dt = __moment.utc( d, format, locale, true );

		if (! dt.isValid()) {
			return null;
		}
	}
	else if (__luxon) {
		dt = format && typeof d === 'string'
			? __luxon.DateTime.fromFormat( d, format )
			: __luxon.DateTime.fromISO( d );

		if (! dt.isValid) {
			return null;
		}

		dt.setLocale(locale);
	}
	else if (! format) {
		// No format given, must be ISO
		dt = new Date(d);
	}
	else {
		if (! __mlWarning) {
			alert('DataTables warning: Formatted date without Moment.js or Luxon - https://datatables.net/tn/17');
		}

		__mlWarning = true;
	}

	return dt;
}

// Wrapper for date, datetime and time which all operate the same way with the exception of
// the output string for auto locale support
function __mlHelper (localeString) {
	return function ( from, to, locale, def ) {
		// Luxon and Moment support
		// Argument shifting
		if ( arguments.length === 0 ) {
			locale = 'en';
			to = null; // means toLocaleString
			from = null; // means iso8601
		}
		else if ( arguments.length === 1 ) {
			locale = 'en';
			to = from;
			from = null;
		}
		else if ( arguments.length === 2 ) {
			locale = to;
			to = from;
			from = null;
		}

		var typeName = 'datetime' + (to ? '-' + to : '');

		// Add type detection and sorting specific to this date format - we need to be able to identify
		// date type columns as such, rather than as numbers in extensions. Hence the need for this.
		if (! DataTable.ext.type.order[typeName + '-pre']) {
			DataTable.type(typeName, {
				detect: function (d) {
					// The renderer will give the value to type detect as the type!
					return d === typeName ? typeName : false;
				},
				order: {
					pre: function (d) {
						// The renderer gives us Moment, Luxon or Date obects for the sorting, all of which have a
						// `valueOf` which gives milliseconds epoch
						return d.valueOf();
					}
				},
				className: 'dt-right'
			});
		}
	
		return function ( d, type ) {
			// Allow for a default value
			if (d === null || d === undefined) {
				if (def === '--now') {
					// We treat everything as UTC further down, so no changes are
					// made, as such need to get the local date / time as if it were
					// UTC
					var local = new Date();
					d = new Date( Date.UTC(
						local.getFullYear(), local.getMonth(), local.getDate(),
						local.getHours(), local.getMinutes(), local.getSeconds()
					) );
				}
				else {
					d = '';
				}
			}

			if (type === 'type') {
				// Typing uses the type name for fast matching
				return typeName;
			}

			if (d === '') {
				return type !== 'sort'
					? ''
					: __mldObj('0000-01-01 00:00:00', null, locale);
			}

			// Shortcut. If `from` and `to` are the same, we are using the renderer to
			// format for ordering, not display - its already in the display format.
			if ( to !== null && from === to && type !== 'sort' && type !== 'type' && ! (d instanceof Date) ) {
				return d;
			}

			var dt = __mldObj(d, from, locale);

			if (dt === null) {
				return d;
			}

			if (type === 'sort') {
				return dt;
			}
			
			var formatted = to === null
				? __mld(dt, 'toDate', 'toJSDate', '')[localeString]()
				: __mld(dt, 'format', 'toFormat', 'toISOString', to);

			// XSS protection
			return type === 'display' ?
				_escapeHtml( formatted ) :
				formatted;
		};
	}
}

// Based on locale, determine standard number formatting
// Fallback for legacy browsers is US English
var __thousands = ',';
var __decimal = '.';

if (window.Intl !== undefined) {
	try {
		var num = new Intl.NumberFormat().formatToParts(100000.1);
	
		for (var i=0 ; i<num.length ; i++) {
			if (num[i].type === 'group') {
				__thousands = num[i].value;
			}
			else if (num[i].type === 'decimal') {
				__decimal = num[i].value;
			}
		}
	}
	catch (e) {
		// noop
	}
}

// Formatted date time detection - use by declaring the formats you are going to use
DataTable.datetime = function ( format, locale ) {
	var typeName = 'datetime-' + format;

	if (! locale) {
		locale = 'en';
	}

	if (! DataTable.ext.type.order[typeName]) {
		DataTable.type(typeName, {
			detect: function (d) {
				var dt = __mldObj(d, format, locale);
				return d === '' || dt ? typeName : false;
			},
			order: {
				pre: function (d) {
					return __mldObj(d, format, locale) || 0;
				}
			},
			className: 'dt-right'
		});
	}
}

/**
 * Helpers for `columns.render`.
 *
 * The options defined here can be used with the `columns.render` initialisation
 * option to provide a display renderer. The following functions are defined:
 *
 * * `moment` - Uses the MomentJS library to convert from a given format into another.
 * This renderer has three overloads:
 *   * 1 parameter:
 *     * `string` - Format to convert to (assumes input is ISO8601 and locale is `en`)
 *   * 2 parameters:
 *     * `string` - Format to convert from
 *     * `string` - Format to convert to. Assumes `en` locale
 *   * 3 parameters:
 *     * `string` - Format to convert from
 *     * `string` - Format to convert to
 *     * `string` - Locale
 * * `number` - Will format numeric data (defined by `columns.data`) for
 *   display, retaining the original unformatted data for sorting and filtering.
 *   It takes 5 parameters:
 *   * `string` - Thousands grouping separator
 *   * `string` - Decimal point indicator
 *   * `integer` - Number of decimal points to show
 *   * `string` (optional) - Prefix.
 *   * `string` (optional) - Postfix (/suffix).
 * * `text` - Escape HTML to help prevent XSS attacks. It has no optional
 *   parameters.
 *
 * @example
 *   // Column definition using the number renderer
 *   {
 *     data: "salary",
 *     render: $.fn.dataTable.render.number( '\'', '.', 0, '$' )
 *   }
 *
 * @namespace
 */
DataTable.render = {
	date: __mlHelper('toLocaleDateString'),
	datetime: __mlHelper('toLocaleString'),
	time: __mlHelper('toLocaleTimeString'),
	number: function ( thousands, decimal, precision, prefix, postfix ) {
		// Auto locale detection
		if (thousands === null || thousands === undefined) {
			thousands = __thousands;
		}

		if (decimal === null || decimal === undefined) {
			decimal = __decimal;
		}

		return {
			display: function ( d ) {
				if ( typeof d !== 'number' && typeof d !== 'string' ) {
					return d;
				}

				if (d === '' || d === null) {
					return d;
				}

				var negative = d < 0 ? '-' : '';
				var flo = parseFloat( d );
				var abs = Math.abs(flo);

				// Scientific notation for large and small numbers
				if (abs >= 100000000000 || (abs < 0.0001 && abs !== 0) ) {
					var exp = flo.toExponential(precision).split(/e\+?/);
					return exp[0] + ' x 10<sup>' + exp[1] + '</sup>';
				}

				// If NaN then there isn't much formatting that we can do - just
				// return immediately, escaping any HTML (this was supposed to
				// be a number after all)
				if ( isNaN( flo ) ) {
					return _escapeHtml( d );
				}

				flo = flo.toFixed( precision );
				d = Math.abs( flo );

				var intPart = parseInt( d, 10 );
				var floatPart = precision ?
					decimal+(d - intPart).toFixed( precision ).substring( 2 ):
					'';

				// If zero, then can't have a negative prefix
				if (intPart === 0 && parseFloat(floatPart) === 0) {
					negative = '';
				}

				return negative + (prefix||'') +
					intPart.toString().replace(
						/\B(?=(\d{3})+(?!\d))/g, thousands
					) +
					floatPart +
					(postfix||'');
			}
		};
	},

	text: function () {
		return {
			display: _escapeHtml,
			filter: _escapeHtml
		};
	}
};


var _extTypes = DataTable.ext.type;

// Get / set type
DataTable.type = function (name, prop, val) {
	if (! prop) {
		return {
			className: _extTypes.className[name],
			detect: _extTypes.detect.find(function (fn) {
				return fn._name === name;
			}),
			order: {
				pre: _extTypes.order[name + '-pre'],
				asc: _extTypes.order[name + '-asc'],
				desc: _extTypes.order[name + '-desc']
			},
			render: _extTypes.render[name],
			search: _extTypes.search[name]
		};
	}

	var setProp = function(prop, propVal) {
		_extTypes[prop][name] = propVal;
	};
	var setDetect = function (detect) {
		// `detect` can be a function or an object - we set a name
		// property for either - that is used for the detection
		Object.defineProperty(detect, "_name", {value: name});

		var idx = _extTypes.detect.findIndex(function (item) {
			return item._name === name;
		});

		if (idx === -1) {
			_extTypes.detect.unshift(detect);
		}
		else {
			_extTypes.detect.splice(idx, 1, detect);
		}
	};
	var setOrder = function (obj) {
		_extTypes.order[name + '-pre'] = obj.pre; // can be undefined
		_extTypes.order[name + '-asc'] = obj.asc; // can be undefined
		_extTypes.order[name + '-desc'] = obj.desc; // can be undefined
	};

	// prop is optional
	if (val === undefined) {
		val = prop;
		prop = null;
	}

	if (prop === 'className') {
		setProp('className', val);
	}
	else if (prop === 'detect') {
		setDetect(val);
	}
	else if (prop === 'order') {
		setOrder(val);
	}
	else if (prop === 'render') {
		setProp('render', val);
	}
	else if (prop === 'search') {
		setProp('search', val);
	}
	else if (! prop) {
		if (val.className) {
			setProp('className', val.className);
		}

		if (val.detect !== undefined) {
			setDetect(val.detect);
		}

		if (val.order) {
			setOrder(val.order);
		}

		if (val.render !== undefined) {
			setProp('render', val.render);
		}

		if (val.search !== undefined) {
			setProp('search', val.search);
		}
	}
}

// Get a list of types
DataTable.types = function () {
	return _extTypes.detect.map(function (fn) {
		return fn._name;
	});
};

var __diacriticSort = function (a, b) {
	a = a !== null && a !== undefined ? a.toString().toLowerCase() : '';
	b = b !== null && b !== undefined ? b.toString().toLowerCase() : '';

	// Checked for `navigator.languages` support in `oneOf` so this code can't execute in old
	// Safari and thus can disable this check
	// eslint-disable-next-line compat/compat
	return a.localeCompare(b, navigator.languages[0] || navigator.language, {
		numeric: true,
		ignorePunctuation: true,
	});
}

//
// Built in data types
//

DataTable.type('string', {
	detect: function () {
		return 'string';
	},
	order: {
		pre: function ( a ) {
			// This is a little complex, but faster than always calling toString,
			// http://jsperf.com/tostring-v-check
			return _empty(a) && typeof a !== 'boolean' ?
				'' :
				typeof a === 'string' ?
					a.toLowerCase() :
					! a.toString ?
						'' :
						a.toString();
		}
	},
	search: _filterString(false, true)
});

DataTable.type('string-utf8', {
	detect: {
		allOf: function ( d ) {
			return true;
		},
		oneOf: function ( d ) {
			// At least one data point must contain a non-ASCII character
			// This line will also check if navigator.languages is supported or not. If not (Safari 10.0-)
			// this data type won't be supported.
			// eslint-disable-next-line compat/compat
			return ! _empty( d ) && navigator.languages && typeof d === 'string' && d.match(/[^\x00-\x7F]/);
		}
	},
	order: {
		asc: __diacriticSort,
		desc: function (a, b) {
			return __diacriticSort(a, b) * -1;
		}
	},
	search: _filterString(false, true)
});


DataTable.type('html', {
	detect: {
		allOf: function ( d ) {
			return _empty( d ) || (typeof d === 'string' && d.indexOf('<') !== -1);
		},
		oneOf: function ( d ) {
			// At least one data point must contain a `<`
			return ! _empty( d ) && typeof d === 'string' && d.indexOf('<') !== -1;
		}
	},
	order: {
		pre: function ( a ) {
			return _empty(a) ?
				'' :
				a.replace ?
					_stripHtml(a).trim().toLowerCase() :
					a+'';
		}
	},
	search: _filterString(true, true)
});


DataTable.type('date', {
	className: 'dt-type-date',
	detect: {
		allOf: function ( d ) {
			// V8 tries _very_ hard to make a string passed into `Date.parse()`
			// valid, so we need to use a regex to restrict date formats. Use a
			// plug-in for anything other than ISO8601 style strings
			if ( d && !(d instanceof Date) && ! _re_date.test(d) ) {
				return null;
			}
			var parsed = Date.parse(d);
			return (parsed !== null && !isNaN(parsed)) || _empty(d);
		},
		oneOf: function ( d ) {
			// At least one entry must be a date or a string with a date
			return (d instanceof Date) || (typeof d === 'string' && _re_date.test(d));
		}
	},
	order: {
		pre: function ( d ) {
			var ts = Date.parse( d );
			return isNaN(ts) ? -Infinity : ts;
		}
	}
});


DataTable.type('html-num-fmt', {
	className: 'dt-type-numeric',
	detect: {
		allOf: function ( d, settings ) {
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal, true, false );
		},
		oneOf: function (d, settings) {
			// At least one data point must contain a numeric value
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal, true, false );
		}
	},
	order: {
		pre: function ( d, s ) {
			var dp = s.oLanguage.sDecimal;
			return __numericReplace( d, dp, _re_html, _re_formatted_numeric );
		}
	},
	search: _filterString(true, true)
});


DataTable.type('html-num', {
	className: 'dt-type-numeric',
	detect: {
		allOf: function ( d, settings ) {
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal, false, true );
		},
		oneOf: function (d, settings) {
			// At least one data point must contain a numeric value
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal, false, false );
		}
	},
	order: {
		pre: function ( d, s ) {
			var dp = s.oLanguage.sDecimal;
			return __numericReplace( d, dp, _re_html );
		}
	},
	search: _filterString(true, true)
});


DataTable.type('num-fmt', {
	className: 'dt-type-numeric',
	detect: {
		allOf: function ( d, settings ) {
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal, true, true );
		},
		oneOf: function (d, settings) {
			// At least one data point must contain a numeric value
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal, true, false );
		}
	},
	order: {
		pre: function ( d, s ) {
			var dp = s.oLanguage.sDecimal;
			return __numericReplace( d, dp, _re_formatted_numeric );
		}
	}
});


DataTable.type('num', {
	className: 'dt-type-numeric',
	detect: {
		allOf: function ( d, settings ) {
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal, false, true );
		},
		oneOf: function (d, settings) {
			// At least one data point must contain a numeric value
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal, false, false );
		}
	},
	order: {
		pre: function (d, s) {
			var dp = s.oLanguage.sDecimal;
			return __numericReplace( d, dp );
		}
	}
});




var __numericReplace = function ( d, decimalPlace, re1, re2 ) {
	if ( d !== 0 && (!d || d === '-') ) {
		return -Infinity;
	}
	
	var type = typeof d;

	if (type === 'number' || type === 'bigint') {
		return d;
	}

	// If a decimal place other than `.` is used, it needs to be given to the
	// function so we can detect it and replace with a `.` which is the only
	// decimal place Javascript recognises - it is not locale aware.
	if ( decimalPlace ) {
		d = _numToDecimal( d, decimalPlace );
	}

	if ( d.replace ) {
		if ( re1 ) {
			d = d.replace( re1, '' );
		}

		if ( re2 ) {
			d = d.replace( re2, '' );
		}
	}

	return d * 1;
};


$.extend( true, DataTable.ext.renderer, {
	footer: {
		_: function ( settings, cell, classes ) {
			cell.addClass(classes.tfoot.cell);
		}
	},

	header: {
		_: function ( settings, cell, classes ) {
			cell.addClass(classes.thead.cell);

			if (! settings.oFeatures.bSort) {
				cell.addClass(classes.order.none);
			}

			var legacyTop = settings.bSortCellsTop;
			var headerRows = cell.closest('thead').find('tr');
			var rowIdx = cell.parent().index();

			// Conditions to not apply the ordering icons
			if (
				// Cells and rows which have the attribute to disable the icons
				cell.attr('data-dt-order') === 'disable' ||
				cell.parent().attr('data-dt-order') === 'disable' ||

				// Legacy support for `orderCellsTop`. If it is set, then cells
				// which are not in the top or bottom row of the header (depending
				// on the value) do not get the sorting classes applied to them
				(legacyTop === true && rowIdx !== 0) ||
				(legacyTop === false && rowIdx !== headerRows.length - 1)
			) {
				return;
			}

			// No additional mark-up required
			// Attach a sort listener to update on sort - note that using the
			// `DT` namespace will allow the event to be removed automatically
			// on destroy, while the `dt` namespaced event is the one we are
			// listening for
			$(settings.nTable).on( 'order.dt.DT column-visibility.dt.DT', function ( e, ctx ) {
				if ( settings !== ctx ) { // need to check this this is the host
					return;               // table, not a nested one
				}

				var sorting = ctx.sortDetails;

				if (! sorting) {
					return;
				}

				var i;
				var orderClasses = classes.order;
				var columns = ctx.api.columns( cell );
				var col = settings.aoColumns[columns.flatten()[0]];
				var orderable = columns.orderable().includes(true);
				var ariaType = '';
				var indexes = columns.indexes();
				var sortDirs = columns.orderable(true).flatten();
				var orderedColumns = _pluck(sorting, 'col');

				cell
					.removeClass(
						orderClasses.isAsc +' '+
						orderClasses.isDesc
					)
					.toggleClass( orderClasses.none, ! orderable )
					.toggleClass( orderClasses.canAsc, orderable && sortDirs.includes('asc') )
					.toggleClass( orderClasses.canDesc, orderable && sortDirs.includes('desc') );

				// Determine if all of the columns that this cell covers are included in the
				// current ordering
				var isOrdering = true;
				
				for (i=0; i<indexes.length; i++) {
					if (! orderedColumns.includes(indexes[i])) {
						isOrdering = false;
					}
				}

				if ( isOrdering ) {
					// Get the ordering direction for the columns under this cell
					// Note that it is possible for a cell to be asc and desc sorting
					// (column spanning cells)
					var orderDirs = columns.order();

					cell.addClass(
						orderDirs.includes('asc') ? orderClasses.isAsc : '' +
						orderDirs.includes('desc') ? orderClasses.isDesc : ''
					);
				}

				// Find the first visible column that has ordering applied to it - it get's
				// the aria information, as the ARIA spec says that only one column should
				// be marked with aria-sort
				var firstVis = -1; // column index

				for (i=0; i<orderedColumns.length; i++) {
					if (settings.aoColumns[orderedColumns[i]].bVisible) {
						firstVis = orderedColumns[i];
						break;
					}
				}

				if (indexes[0] == firstVis) {
					var firstSort = sorting[0];
					var sortOrder = col.asSorting;

					cell.attr('aria-sort', firstSort.dir === 'asc' ? 'ascending' : 'descending');

					// Determine if the next click will remove sorting or change the sort
					ariaType = ! sortOrder[firstSort.index + 1] ? 'Remove' : 'Reverse';
				}
				else {
					cell.removeAttr('aria-sort');
				}

				cell.attr('aria-label', orderable
					? col.ariaTitle + ctx.api.i18n('oAria.orderable' + ariaType)
					: col.ariaTitle
				);

				// Make the headers tab-able for keyboard navigation
				if (orderable) {
					cell.find('.dt-column-title').attr('role', 'button');
					cell.attr('tabindex', 0)
				}
			} );
		}
	},

	layout: {
		_: function ( settings, container, items ) {
			var classes = settings.oClasses.layout;
			var row = $('<div/>')
				.attr('id', items.id || null)
				.addClass(items.className || classes.row)
				.appendTo( container );

			$.each( items, function (key, val) {
				if (key === 'id' || key === 'className') {
					return;
				}

				var klass = '';

				if (val.table) {
					row.addClass(classes.tableRow);
					klass += classes.tableCell + ' ';
				}

				if (key === 'start') {
					klass += classes.start;
				}
				else if (key === 'end') {
					klass += classes.end;
				}
				else {
					klass += classes.full;
				}

				$('<div/>')
					.attr({
						id: val.id || null,
						"class": val.className
							? val.className
							: classes.cell + ' ' + klass
					})
					.append( val.contents )
					.appendTo( row );
			} );
		}
	}
} );


DataTable.feature = {};

// Third parameter is internal only!
DataTable.feature.register = function ( name, cb, legacy ) {
	DataTable.ext.features[ name ] = cb;

	if (legacy) {
		_ext.feature.push({
			cFeature: legacy,
			fnInit: cb
		});
	}
};

function _divProp(el, prop, val) {
	if (val) {
		el[prop] = val;
	}
}

DataTable.feature.register( 'div', function ( settings, opts ) {
	var n = $('<div>')[0];

	if (opts) {
		_divProp(n, 'className', opts.className);
		_divProp(n, 'id', opts.id);
		_divProp(n, 'innerHTML', opts.html);
		_divProp(n, 'textContent', opts.text);
	}

	return n;
} );

DataTable.feature.register( 'info', function ( settings, opts ) {
	// For compatibility with the legacy `info` top level option
	if (! settings.oFeatures.bInfo) {
		return null;
	}

	var
		lang  = settings.oLanguage,
		tid = settings.sTableId,
		n = $('<div/>', {
			'class': settings.oClasses.info.container,
		} );

	opts = $.extend({
		callback: lang.fnInfoCallback,
		empty: lang.sInfoEmpty,
		postfix: lang.sInfoPostFix,
		search: lang.sInfoFiltered,
		text: lang.sInfo,
	}, opts);


	// Update display on each draw
	settings.aoDrawCallback.push(function (s) {
		_fnUpdateInfo(s, opts, n);
	});

	// For the first info display in the table, we add a callback and aria information.
	if (! settings._infoEl) {
		n.attr({
			'aria-live': 'polite',
			id: tid+'_info',
			role: 'status'
		});

		// Table is described by our info div
		$(settings.nTable).attr( 'aria-describedby', tid+'_info' );

		settings._infoEl = n;
	}

	return n;
}, 'i' );

/**
 * Update the information elements in the display
 *  @param {object} settings dataTables settings object
 *  @memberof DataTable#oApi
 */
function _fnUpdateInfo ( settings, opts, node )
{
	var
		start = settings._iDisplayStart+1,
		end   = settings.fnDisplayEnd(),
		max   = settings.fnRecordsTotal(),
		total = settings.fnRecordsDisplay(),
		out   = total
			? opts.text
			: opts.empty;

	if ( total !== max ) {
		// Record set after filtering
		out += ' ' + opts.search;
	}

	// Convert the macros
	out += opts.postfix;
	out = _fnMacros( settings, out );

	if ( opts.callback ) {
		out = opts.callback.call( settings.oInstance,
			settings, start, end, max, total, out
		);
	}

	node.html( out );

	_fnCallbackFire(settings, null, 'info', [settings, node[0], out]);
}

var __searchCounter = 0;

// opts
// - text
// - placeholder
DataTable.feature.register( 'search', function ( settings, opts ) {
	// Don't show the input if filtering isn't available on the table
	if (! settings.oFeatures.bFilter) {
		return null;
	}

	var classes = settings.oClasses.search;
	var tableId = settings.sTableId;
	var language = settings.oLanguage;
	var previousSearch = settings.oPreviousSearch;
	var input = '<input type="search" class="'+classes.input+'"/>';

	opts = $.extend({
		placeholder: language.sSearchPlaceholder,
		processing: false,
		text: language.sSearch
	}, opts);

	// The _INPUT_ is optional - is appended if not present
	if (opts.text.indexOf('_INPUT_') === -1) {
		opts.text += '_INPUT_';
	}

	opts.text = _fnMacros(settings, opts.text);

	// We can put the <input> outside of the label if it is at the start or end
	// which helps improve accessability (not all screen readers like implicit
	// for elements).
	var end = opts.text.match(/_INPUT_$/);
	var start = opts.text.match(/^_INPUT_/);
	var removed = opts.text.replace(/_INPUT_/, '');
	var str = '<label>' + opts.text + '</label>';

	if (start) {
		str = '_INPUT_<label>' + removed + '</label>';
	}
	else if (end) {
		str = '<label>' + removed + '</label>_INPUT_';
	}

	var filter = $('<div>')
		.addClass(classes.container)
		.append(str.replace(/_INPUT_/, input));

	// add for and id to label and input
	filter.find('label').attr('for', 'dt-search-' + __searchCounter);
	filter.find('input').attr('id', 'dt-search-' + __searchCounter);
	__searchCounter++;

	var searchFn = function(event) {
		var val = this.value;

		if(previousSearch.return && event.key !== "Enter") {
			return;
		}

		/* Now do the filter */
		if ( val != previousSearch.search ) {
			_fnProcessingRun(settings, opts.processing, function () {
				previousSearch.search = val;
		
				_fnFilterComplete( settings, previousSearch );
		
				// Need to redraw, without resorting
				settings._iDisplayStart = 0;
				_fnDraw( settings );
			});
		}
	};

	var searchDelay = settings.searchDelay !== null ?
		settings.searchDelay :
		0;

	var jqFilter = $('input', filter)
		.val( previousSearch.search )
		.attr( 'placeholder', opts.placeholder )
		.on(
			'keyup.DT search.DT input.DT paste.DT cut.DT',
			searchDelay ?
				DataTable.util.debounce( searchFn, searchDelay ) :
				searchFn
		)
		.on( 'mouseup.DT', function(e) {
			// Edge fix! Edge 17 does not trigger anything other than mouse events when clicking
			// on the clear icon (Edge bug 17584515). This is safe in other browsers as `searchFn`
			// checks the value to see if it has changed. In other browsers it won't have.
			setTimeout( function () {
				searchFn.call(jqFilter[0], e);
			}, 10);
		} )
		.on( 'keypress.DT', function(e) {
			/* Prevent form submission */
			if ( e.keyCode == 13 ) {
				return false;
			}
		} )
		.attr('aria-controls', tableId);

	// Update the input elements whenever the table is filtered
	$(settings.nTable).on( 'search.dt.DT', function ( ev, s ) {
		if ( settings === s && jqFilter[0] !== document.activeElement ) {
			jqFilter.val( typeof previousSearch.search !== 'function'
				? previousSearch.search
				: ''
			);
		}
	} );

	return filter;
}, 'f' );

// opts
// - type - button configuration
// - buttons - number of buttons to show - must be odd
DataTable.feature.register( 'paging', function ( settings, opts ) {
	// Don't show the paging input if the table doesn't have paging enabled
	if (! settings.oFeatures.bPaginate) {
		return null;
	}

	opts = $.extend({
		buttons: DataTable.ext.pager.numbers_length,
		type: settings.sPaginationType,
		boundaryNumbers: true,
		firstLast: true,
		previousNext: true,
		numbers: true
	}, opts);

	var host = $('<div/>')
		.addClass(settings.oClasses.paging.container + (opts.type ? ' paging_' + opts.type : ''))
		.append(
			$('<nav>')
				.attr('aria-label', 'pagination')
				.addClass(settings.oClasses.paging.nav)
		);
	var draw = function () {
		_pagingDraw(settings, host.children(), opts);
	};

	settings.aoDrawCallback.push(draw);

	// Responsive redraw of paging control
	$(settings.nTable).on('column-sizing.dt.DT', draw);

	return host;
}, 'p' );

/**
 * Dynamically create the button type array based on the configuration options.
 * This will only happen if the paging type is not defined.
 */
function _pagingDynamic(opts) {
	var out = [];

	if (opts.numbers) {
		out.push('numbers');
	}

	if (opts.previousNext) {
		out.unshift('previous');
		out.push('next');
	}

	if (opts.firstLast) {
		out.unshift('first');
		out.push('last');
	}

	return out;
}

function _pagingDraw(settings, host, opts) {
	if (! settings._bInitComplete) {
		return;
	}

	var
		plugin = opts.type
			? DataTable.ext.pager[ opts.type ]
			: _pagingDynamic,
		aria = settings.oLanguage.oAria.paginate || {},
		start      = settings._iDisplayStart,
		len        = settings._iDisplayLength,
		visRecords = settings.fnRecordsDisplay(),
		all        = len === -1,
		page = all ? 0 : Math.ceil( start / len ),
		pages = all ? 1 : Math.ceil( visRecords / len ),
		buttons = [],
		buttonEls = [],
		buttonsNested = plugin(opts)
			.map(function (val) {
				return val === 'numbers'
					? _pagingNumbers(page, pages, opts.buttons, opts.boundaryNumbers)
					: val;
			});

	// .flat() would be better, but not supported in old Safari
	buttons = buttons.concat.apply(buttons, buttonsNested);

	for (var i=0 ; i<buttons.length ; i++) {
		var button = buttons[i];

		var btnInfo = _pagingButtonInfo(settings, button, page, pages);
		var btn = _fnRenderer( settings, 'pagingButton' )(
			settings,
			button,
			btnInfo.display,
			btnInfo.active,
			btnInfo.disabled
		);

		var ariaLabel = typeof button === 'string'
			? aria[ button ]
			: aria.number
				? aria.number + (button+1)
				: null;

		// Common attributes
		$(btn.clicker).attr({
			'aria-controls': settings.sTableId,
			'aria-disabled': btnInfo.disabled ? 'true' : null,
			'aria-current': btnInfo.active ? 'page' : null,
			'aria-label': ariaLabel,
			'data-dt-idx': button,
			'tabIndex': btnInfo.disabled
				? -1
				: settings.iTabIndex
					? settings.iTabIndex
					: null, // `0` doesn't need a tabIndex since it is the default
		});

		if (typeof button !== 'number') {
			$(btn.clicker).addClass(button);
		}

		_fnBindAction(
			btn.clicker, {action: button}, function(e) {
				e.preventDefault();

				_fnPageChange( settings, e.data.action, true );
			}
		);

		buttonEls.push(btn.display);
	}

	var wrapped = _fnRenderer(settings, 'pagingContainer')(
		settings, buttonEls
	);

	var activeEl = host.find(document.activeElement).data('dt-idx');

	host.empty().append(wrapped);

	if ( activeEl !== undefined ) {
		host.find( '[data-dt-idx='+activeEl+']' ).trigger('focus');
	}

	// Responsive - check if the buttons are over two lines based on the
	// height of the buttons and the container.
	if (
		buttonEls.length && // any buttons
		opts.buttons > 1 && // prevent infinite
		$(host).height() >= ($(buttonEls[0]).outerHeight() * 2) - 10
	) {
		_pagingDraw(settings, host, $.extend({}, opts, { buttons: opts.buttons - 2 }));
	}
}

/**
 * Get properties for a button based on the current paging state of the table
 *
 * @param {*} settings DT settings object
 * @param {*} button The button type in question
 * @param {*} page Table's current page
 * @param {*} pages Number of pages
 * @returns Info object
 */
function _pagingButtonInfo(settings, button, page, pages) {
	var lang = settings.oLanguage.oPaginate;
	var o = {
		display: '',
		active: false,
		disabled: false
	};

	switch ( button ) {
		case 'ellipsis':
			o.display = '&#x2026;';
			o.disabled = true;
			break;

		case 'first':
			o.display = lang.sFirst;

			if (page === 0) {
				o.disabled = true;
			}
			break;

		case 'previous':
			o.display = lang.sPrevious;

			if ( page === 0 ) {
				o.disabled = true;
			}
			break;

		case 'next':
			o.display = lang.sNext;

			if ( pages === 0 || page === pages-1 ) {
				o.disabled = true;
			}
			break;

		case 'last':
			o.display = lang.sLast;

			if ( pages === 0 || page === pages-1 ) {
				o.disabled = true;
			}
			break;

		default:
			if ( typeof button === 'number' ) {
				o.display = settings.fnFormatNumber( button + 1 );
				
				if (page === button) {
					o.active = true;
				}
			}
			break;
	}

	return o;
}

/**
 * Compute what number buttons to show in the paging control
 *
 * @param {*} page Current page
 * @param {*} pages Total number of pages
 * @param {*} buttons Target number of number buttons
 * @param {boolean} addFirstLast Indicate if page 1 and end should be included
 * @returns Buttons to show
 */
function _pagingNumbers ( page, pages, buttons, addFirstLast ) {
	var
		numbers = [],
		half = Math.floor(buttons / 2),
		before = addFirstLast ? 2 : 1,
		after = addFirstLast ? 1 : 0;

	if ( pages <= buttons ) {
		numbers = _range(0, pages);
	}
	else if (buttons === 1) {
		// Single button - current page only
		numbers = [page];
	}
	else if (buttons === 3) {
		// Special logic for just three buttons
		if (page <= 1) {
			numbers = [0, 1, 'ellipsis'];
		}
		else if (page >= pages - 2) {
			numbers = _range(pages-2, pages);
			numbers.unshift('ellipsis');
		}
		else {
			numbers = ['ellipsis', page, 'ellipsis'];
		}
	}
	else if ( page <= half ) {
		numbers = _range(0, buttons-before);
		numbers.push('ellipsis');

		if (addFirstLast) {
			numbers.push(pages-1);
		}
	}
	else if ( page >= pages - 1 - half ) {
		numbers = _range(pages-(buttons-before), pages);
		numbers.unshift('ellipsis');

		if (addFirstLast) {
			numbers.unshift(0);
		}
	}
	else {
		numbers = _range(page-half+before, page+half-after);
		numbers.push('ellipsis');
		numbers.unshift('ellipsis');

		if (addFirstLast) {
			numbers.push(pages-1);
			numbers.unshift(0);
		}
	}

	return numbers;
}

var __lengthCounter = 0;

// opts
// - menu
// - text
DataTable.feature.register( 'pageLength', function ( settings, opts ) {
	var features = settings.oFeatures;

	// For compatibility with the legacy `pageLength` top level option
	if (! features.bPaginate || ! features.bLengthChange) {
		return null;
	}

	opts = $.extend({
		menu: settings.aLengthMenu,
		text: settings.oLanguage.sLengthMenu
	}, opts);

	var
		classes  = settings.oClasses.length,
		tableId  = settings.sTableId,
		menu     = opts.menu,
		lengths  = [],
		language = [],
		i;

	// Options can be given in a number of ways
	if (Array.isArray( menu[0] )) {
		// Old 1.x style - 2D array
		lengths = menu[0];
		language = menu[1];
	}
	else {
		for ( i=0 ; i<menu.length ; i++ ) {
			// An object with different label and value
			if ($.isPlainObject(menu[i])) {
				lengths.push(menu[i].value);
				language.push(menu[i].label);
			}
			else {
				// Or just a number to display and use
				lengths.push(menu[i]);
				language.push(menu[i]);
			}
		}
	}

	// We can put the <select> outside of the label if it is at the start or
	// end which helps improve accessability (not all screen readers like
	// implicit for elements).
	var end = opts.text.match(/_MENU_$/);
	var start = opts.text.match(/^_MENU_/);
	var removed = opts.text.replace(/_MENU_/, '');
	var str = '<label>' + opts.text + '</label>';

	if (start) {
		str = '_MENU_<label>' + removed + '</label>';
	}
	else if (end) {
		str = '<label>' + removed + '</label>_MENU_';
	}

	// Wrapper element - use a span as a holder for where the select will go
	var tmpId = 'tmp-' + (+new Date())
	var div = $('<div/>')
		.addClass( classes.container )
		.append(
			str.replace( '_MENU_', '<span id="'+tmpId+'"></span>' )
		);

	// Save text node content for macro updating
	var textNodes = [];
	Array.from(div.find('label')[0].childNodes).forEach(function (el) {
		if (el.nodeType === Node.TEXT_NODE) {
			textNodes.push({
				el: el,
				text: el.textContent
			});
		}
	});

	// Update the label text in case it has an entries value
	var updateEntries = function (len) {
		textNodes.forEach(function (node) {
			node.el.textContent = _fnMacros(settings, node.text, len);
		});
	}

	// Next, the select itself, along with the options
	var select = $('<select/>', {
		'name':          tableId+'_length',
		'aria-controls': tableId,
		'class':         classes.select
	} );

	for ( i=0 ; i<lengths.length ; i++ ) {
		select[0][ i ] = new Option(
			typeof language[i] === 'number' ?
				settings.fnFormatNumber( language[i] ) :
				language[i],
			lengths[i]
		);
	}

	// add for and id to label and input
	div.find('label').attr('for', 'dt-length-' + __lengthCounter);
	select.attr('id', 'dt-length-' + __lengthCounter);
	__lengthCounter++;

	// Swap in the select list
	div.find('#' + tmpId).replaceWith(select);

	// Can't use `select` variable as user might provide their own and the
	// reference is broken by the use of outerHTML
	$('select', div)
		.val( settings._iDisplayLength )
		.on( 'change.DT', function() {
			_fnLengthChange( settings, $(this).val() );
			_fnDraw( settings );
		} );

	// Update node value whenever anything changes the table's length
	$(settings.nTable).on( 'length.dt.DT', function (e, s, len) {
		if ( settings === s ) {
			$('select', div).val( len );

			// Resolve plurals in the text for the new length
			updateEntries(len);
		}
	} );

	updateEntries(settings._iDisplayLength);

	return div;
}, 'l' );

// jQuery access
$.fn.dataTable = DataTable;

// Provide access to the host jQuery object (circular reference)
DataTable.$ = $;

// Legacy aliases
$.fn.dataTableSettings = DataTable.settings;
$.fn.dataTableExt = DataTable.ext;

// With a capital `D` we return a DataTables API instance rather than a
// jQuery object
$.fn.DataTable = function ( opts ) {
	return $(this).dataTable( opts ).api();
};

// All properties that are available to $.fn.dataTable should also be
// available on $.fn.DataTable
$.each( DataTable, function ( prop, val ) {
	$.fn.DataTable[ prop ] = val;
} );

/* harmony default export */ __webpack_exports__["default"] = (DataTable);



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**************************!*\
  !*** ./scripts/lists.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jszip */ "../../node_modules/jszip/dist/jszip.min.js");
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var datatables_net_bs4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! datatables.net-bs4 */ "../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4.mjs");
/* harmony import */ var datatables_net_buttons_bs4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! datatables.net-buttons-bs4 */ "../../node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4.mjs");
/* harmony import */ var datatables_net_buttons_js_buttons_colVis_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! datatables.net-buttons/js/buttons.colVis.js */ "../../node_modules/datatables.net-buttons/js/buttons.colVis.js");
/* harmony import */ var datatables_net_buttons_js_buttons_colVis_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(datatables_net_buttons_js_buttons_colVis_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var datatables_net_buttons_js_buttons_html5_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! datatables.net-buttons/js/buttons.html5.js */ "../../node_modules/datatables.net-buttons/js/buttons.html5.js");
/* harmony import */ var datatables_net_buttons_js_buttons_html5_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(datatables_net_buttons_js_buttons_html5_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var datatables_net_buttons_js_buttons_print_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! datatables.net-buttons/js/buttons.print.js */ "../../node_modules/datatables.net-buttons/js/buttons.print.js");
/* harmony import */ var datatables_net_buttons_js_buttons_print_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(datatables_net_buttons_js_buttons_print_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var datatables_net_fixedheader_bs4__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! datatables.net-fixedheader-bs4 */ "../../node_modules/datatables.net-fixedheader-bs4/js/fixedHeader.bootstrap4.mjs");
/* harmony import */ var datatables_net_responsive_bs4__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! datatables.net-responsive-bs4 */ "../../node_modules/datatables.net-responsive-bs4/js/responsive.bootstrap4.mjs");
/* harmony import */ var datatables_net_rowgroup_bs4__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! datatables.net-rowgroup-bs4 */ "../../node_modules/datatables.net-rowgroup-bs4/js/rowGroup.bootstrap4.mjs");
/* harmony import */ var datatables_net_searchpanes_bs4__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! datatables.net-searchpanes-bs4 */ "../../node_modules/datatables.net-searchpanes-bs4/js/searchPanes.bootstrap4.mjs");
/* harmony import */ var _util_Router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./util/Router */ "./scripts/util/Router.js");
/* harmony import */ var _routes_pickupList__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./routes/pickupList */ "./scripts/routes/pickupList.js");
/* harmony import */ var _routes_packingList__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./routes/packingList */ "./scripts/routes/packingList.js");
/* harmony import */ var _routes_bakingList__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./routes/bakingList */ "./scripts/routes/bakingList.js");
/* harmony import */ var _routes_inventoryList__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./routes/inventoryList */ "./scripts/routes/inventoryList.js");
/* harmony import */ var _routes_oosList__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./routes/oosList */ "./scripts/routes/oosList.js");
/* harmony import */ var _routes_groceryList__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./routes/groceryList */ "./scripts/routes/groceryList.js");
/* harmony import */ var _routes_breadClubList__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./routes/breadClubList */ "./scripts/routes/breadClubList.js");
/* harmony import */ var _routes_breadClubSchedule__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./routes/breadClubSchedule */ "./scripts/routes/breadClubSchedule.js");
/* harmony import */ var _routes_deliveryExport__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./routes/deliveryExport */ "./scripts/routes/deliveryExport.js");
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "jquery");
// import external dependencies











// import local dependencies












/** Populate Router instance with DOM routes */
var routes = new _util_Router__WEBPACK_IMPORTED_MODULE_10__["default"]({
  pickupList: _routes_pickupList__WEBPACK_IMPORTED_MODULE_11__["default"],
  packingList: _routes_packingList__WEBPACK_IMPORTED_MODULE_12__["default"],
  bakingList: _routes_bakingList__WEBPACK_IMPORTED_MODULE_13__["default"],
  inventoryList: _routes_inventoryList__WEBPACK_IMPORTED_MODULE_14__["default"],
  oosList: _routes_oosList__WEBPACK_IMPORTED_MODULE_15__["default"],
  groceryList: _routes_groceryList__WEBPACK_IMPORTED_MODULE_16__["default"],
  breadClubList: _routes_breadClubList__WEBPACK_IMPORTED_MODULE_17__["default"],
  breadClubSchedule: _routes_breadClubSchedule__WEBPACK_IMPORTED_MODULE_18__["default"],
  deliveryExport: _routes_deliveryExport__WEBPACK_IMPORTED_MODULE_19__["default"],
});

// Load Events
jQuery(document).ready(function () { return routes.loadEvents(); });

}();
/******/ })()
;
//# sourceMappingURL=lists.js.map