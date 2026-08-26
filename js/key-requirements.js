(function () {
    'use strict';

    var links = Array.prototype.slice.call(document.querySelectorAll('[data-toc-link]'));
    var sections = links.map(function (link) {
        return document.querySelector(link.getAttribute('href'));
    }).filter(Boolean);
    var navigationLock = {
        id: '',
        until: 0
    };

    function setActive(id) {
        links.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
        });

        document.querySelectorAll('[data-toc-group]').forEach(function (group) {
            var rootId = group.getAttribute('data-toc-group');
            var childIsActive = group.querySelector('[data-parent="' + rootId + '"].is-active');
            group.classList.toggle('is-parent-active', Boolean(childIsActive));
        });
    }

    function updateActiveSection() {
        if (navigationLock.id && Date.now() < navigationLock.until) {
            setActive(navigationLock.id);
            return;
        }

        var current = sections[0];
        var reachedPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (reachedPageBottom && sections.length) {
            setActive(sections[sections.length - 1].id);
            return;
        }

        sections.forEach(function (section) {
            if (section.getBoundingClientRect().top <= 120) current = section;
        });
        if (current) setActive(current.id);
    }

    links.forEach(function (link) {
        link.addEventListener('click', function () {
            var id = link.getAttribute('href').slice(1);
            navigationLock.id = id;
            navigationLock.until = Date.now() + 600;
            setActive(id);
        });
    });

    document.querySelectorAll('[data-toc-toggle]').forEach(function (toggle) {
        toggle.addEventListener('click', function () {
            var menuId = toggle.getAttribute('aria-controls');
            var menu = document.getElementById(menuId);
            if (!menu) return;

            var expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            menu.hidden = expanded;
        });
    });

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
