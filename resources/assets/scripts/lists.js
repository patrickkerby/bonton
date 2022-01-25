// import external dependencies
import 'jquery';
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

// import local dependencies
import Router from './util/Router';
import pickupList from './routes/pickupList';
import packingList from './routes/packingList';
import bakingList from './routes/bakingList';
import inventoryList from './routes/inventoryList';
import oosList from './routes/oosList';
import groceryList from './routes/groceryList';
import breadClubList from './routes/breadClubList';
import breadClubSchedule from './routes/breadClubSchedule';
import store2doorList from './routes/store2doorList';


/** Populate Router instance with DOM routes */
const routes = new Router({
  pickupList,
  packingList,
  bakingList,
  inventoryList,
  oosList,
  groceryList,
  breadClubList,
  breadClubSchedule,
  store2doorList,
});

// Load Events
jQuery(document).ready(() => routes.loadEvents());
