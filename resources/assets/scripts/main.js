// import external dependencies
import 'jquery';
import 'jszip';
import 'typeturajs';
import 'dayjs/dayjs.min.js';
import 'slick-carousel/slick/slick.min.js';
import 'slick-lightbox/dist/slick-lightbox.min.js';

// Import everything from autoload
import './autoload/**/*'

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home';
import aboutUs from './routes/about';
import cart from './routes/cart';

/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  // Home page
  home,
  // About Us page, note the change from about-us to aboutUs.
  aboutUs,
  // Cart page
  cart,
});

// Load Events
jQuery(document).ready(() => routes.loadEvents());
