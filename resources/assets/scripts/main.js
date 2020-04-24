// import external dependencies
import 'jquery';
import 'jszip';
import 'pdfmake';
import 'datatables.net-bs4';
import 'datatables.net-buttons-bs4';
import 'datatables.net-buttons/js/buttons.colVis.js';
import 'datatables.net-buttons/js/buttons.flash.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import 'datatables.net-fixedheader-bs4';
import 'datatables.net-responsive-bs4';
import 'datatables.net-rowgroup-bs4';
import 'datatables.net-searchpanes-bs4';

// Import everything from autoload
import './autoload/**/*'

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home';
import aboutUs from './routes/about';
import pickupList from './routes/pickupList';
import packingList from './routes/packingList';
import bakingList from './routes/packingList';

/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  // Home page
  home,
  // About Us page, note the change from about-us to aboutUs.
  aboutUs,
  // List pages for baking, packing, pickup
  pickupList,
  // List pages for baking, packing, pickup
  packingList,
  // List pages for baking, packing, pickup
  bakingList,
});

// Load Events
jQuery(document).ready(() => routes.loadEvents());
