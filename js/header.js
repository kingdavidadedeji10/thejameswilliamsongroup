// Shared header loader — fetches components/header.html, injects it, then
// immediately wires up the mobile-menu toggle so there is no race condition.
document.addEventListener('DOMContentLoaded', function () {
    var placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    fetch('components/header.html')
        .then(function (response) { return response.text(); })
        .then(function (html) {
            placeholder.outerHTML = html;
            initMobileMenu();
        })
        .catch(function (err) {
            console.error('Failed to load header:', err);
        });
});

function initMobileMenu() {
    var toggle  = document.querySelector('.mobile-menu-toggle');
    var menu    = document.querySelector('.mobile-menu');
    var overlay = document.querySelector('.mobile-menu-overlay');
    var close   = document.querySelector('.mobile-menu-close');

    if (!toggle || !menu || !overlay) return;

    function openMenu() {
        menu.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menu.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', openMenu);
    if (close)   close.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Close on nav link click (navigates to new page anyway)
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });
}
