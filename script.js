var navIcon = document.querySelector('.nav-menu-icon'),
    navMenu = document.querySelector('.menu'),
    overlay = document.querySelector('.overlay');

function changeClass() {
  document.getElementById('map-cover').className = 'js-selected';
}

function toggleNav() {
  navIcon.classList.toggle('js-nav-active');
  navMenu.classList.toggle('js-nav-active');
  overlay.classList.toggle('js-active');
}

window.onload = function() {
  document.getElementById('map-cover').addEventListener( 'click' , changeClass );
  navIcon.addEventListener('click', toggleNav);
  // navIcon.addEventListener('touchstart', toggleNav);
};
