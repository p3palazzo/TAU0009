// Import the Bootstrap bundle
//
// This includes Popper and all of Bootstrap's JS plugins.

//import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// Import just what we need

// import '../../node_modules/bootstrap/js/dist/alert';
import '../../node_modules/bootstrap/js/dist/button';
// import '../../node_modules/bootstrap/js/dist/carousel';
import '../../node_modules/bootstrap/js/dist/collapse';
// import '../../node_modules/bootstrap/js/dist/dropdown';
import '../../node_modules/bootstrap/js/dist/modal';
// import '../../node_modules/bootstrap/js/dist/offcanvas';
import '../../node_modules/bootstrap/js/dist/popover';
// import '../../node_modules/bootstrap/js/dist/scrollspy';
// import '../../node_modules/bootstrap/js/dist/tab';
// import '../../node_modules/bootstrap/js/dist/toast';
// import '../../node_modules/bootstrap/js/dist/tooltip';



//
// Place any custom JS here
//

import "../../_js/search.js";

// Create an example popover
document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new bootstrap.Popover(popover)
  })
