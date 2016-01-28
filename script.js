var navIcon = document.querySelector('.nav-menu-icon'),
    navMenu = document.querySelector('.menu'),
    overlay = document.querySelector('.overlay'),
    mapCover = document.querySelector('.map-cover'),
    anchorLink = document.querySelector('.menu a[href*="/#"]'),
    extLink = document.querySelector('.menu a[target*="blank"]');

function enableMapMove() {
  mapCover.classList.add('js-selected');
}

function toggleNav(evt) {
  evt.preventDefault(); // Prevents double clicking with both touchstart() and click()
  navIcon.classList.toggle('js-nav-active');
  navMenu.classList.toggle('js-nav-active');
  overlay.classList.toggle('js-active');
}

function removeNav() {
  navIcon.classList.remove('js-nav-active');
  navMenu.classList.remove('js-nav-active');
  overlay.classList.remove('js-active');
}

window.onload = function() {
  if (mapCover) {
    mapCover.addEventListener( 'click' , enableMapMove );
  }

  if (navIcon) {
    navIcon.addEventListener('click', toggleNav);
    navIcon.addEventListener('touchstart', toggleNav);
  }

  // Make sure the nav disappears when jumping to an anchor
  if (anchorLink) {
    anchorLink.addEventListener('click', removeNav);
  }

  // Make sure the nav disappears when navigating to external page
  if (extLink) {
    extLink.addEventListener('click', removeNav);
  }
};

// Add a class to the header when scrolled down 100px
var scrollElement = document.querySelector('.header');
window.onscroll = function() {
  if (window.scrollY > 100) {
    scrollElement.classList.add('js-scrolled');
  }
  else {
    scrollElement.classList.remove('js-scrolled');
  }
};
