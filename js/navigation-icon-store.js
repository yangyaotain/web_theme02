/** Portal navigation overrides; business artwork is never written here. */
(function () {
    'use strict';
    if (window.NavigationIconStore) return;
    const key = 'lg-portal-navigation-icons:v1:overrides';
    const versionKey = 'lg-portal-navigation-icons:v1:version';
    const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
    let memory = {};
    try {
        if (performance.getEntriesByType('navigation')[0]?.type === 'reload' || localStorage.getItem(versionKey) !== '1') {
            localStorage.removeItem(key);
            localStorage.setItem(versionKey, '1');
        }
        // Retire the space dropdown override; shared data-menu space icons remain valid.
        const saved = JSON.parse(localStorage.getItem(key) || '{}');
        if (saved && Object.prototype.hasOwnProperty.call(saved, 'section:spaces')) {
            delete saved['section:spaces'];
            localStorage.setItem(key, JSON.stringify(saved));
        }
    } catch { /* Defaults remain available without storage. */ }

    function normalize(value) {
        if (value?.type === 'icon' && /^[a-z][a-z0-9_]{0,60}$/.test(value.name || '')) return { type: 'icon', name: value.name };
        if (value?.type === 'image' && /^data:image\/(png|jpeg);base64,[a-z0-9+/=]+$/i.test(value.src || '')) {
            return { type: 'image', src: value.src, name: String(value.name || '') };
        }
        return null;
    }
    function read() {
        try {
            const parsed = JSON.parse(localStorage.getItem(key) || '{}');
            memory = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
        } catch { /* Keep the current page snapshot. */ }
        return memory;
    }
    function get(id) { return normalize(read()[id]); }
    function save(id, value) {
        const next = { ...read() };
        const normalized = normalize(value);
        if (value && !normalized) throw new Error('请选择有效的图标或 JPG、PNG 图片。');
        if (normalized) next[id] = normalized;
        else delete next[id];
        try { localStorage.setItem(key, JSON.stringify(next)); }
        catch { throw new Error('图标未保存，浏览器存储空间不足或不可用，请缩小图片后重试。'); }
        memory = next;
        window.dispatchEvent(new CustomEvent('navigation-icons-change'));
    }
    function ensureFont() {
        if (document.querySelector('[data-navigation-icon-font]')) return;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0';
        link.dataset.navigationIconFont = '';
        document.head.appendChild(link);
    }
    function render(id, fallback, svg, small = false, draft) {
        const value = draft === undefined ? get(id) || fallback : draft || fallback;
        const image = value.type === 'image';
        let content;
        if (image) content = '<img src="' + escape(value.src) + '" alt="">';
        else if (value.type === 'icon') {
            ensureFont();
            content = '<span class="nav-config-material" aria-hidden="true">' + escape(value.name) + '</span>';
        } else content = svg(value.name || 'grid');
        return '<span class="nav-menu-icon' + (small ? ' is-small' : '') + (image ? ' is-image' : '') + '" aria-hidden="true">' + content + '</span>';
    }
    window.addEventListener('storage', event => {
        if (event.key === key || event.key === null) window.dispatchEvent(new CustomEvent('navigation-icons-change'));
    });
    window.NavigationIconStore = { key, get, save, render };
})();
