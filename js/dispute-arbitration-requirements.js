(function () {
    'use strict';

    var links = Array.prototype.slice.call(document.querySelectorAll('.dar-toc nav a'));
    var sections = links.map(function (link) {
        return document.querySelector(link.getAttribute('href'));
    }).filter(Boolean);

    function setActive(id) {
        links.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
        });
    }

    function updateActiveSection() {
        var current = sections[0];
        sections.forEach(function (section) {
            if (section.getBoundingClientRect().top <= 118) current = section;
        });
        if (current) setActive(current.id);
    }

    var closeButton = document.querySelector('[data-action="close-page"]');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            window.close();
            if (!window.closed && window.history.length > 1) window.history.back();
        });
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('hashchange', updateActiveSection);
    updateActiveSection();
}());
