var navIcon = document.querySelector('.nav-menu-icon'),
    navMenu = document.querySelector('.menu'),
    overlay = document.querySelector('.overlay'),
    mapcover = document.querySelector('.map-cover');

function addClass() {
  mapcover.className += ' js-selected';
}

function toggleNav() {
  navIcon.classList.toggle('js-nav-active');
  navMenu.classList.toggle('js-nav-active');
  overlay.classList.toggle('js-active');
}

window.onload = function() {
  if (mapcover) {
    mapcover.addEventListener( 'click' , addClass );
  }
  if (navIcon) {
    navIcon.addEventListener('click', toggleNav);
    // navIcon.addEventListener('touchstart', toggleNav);
  }
};
