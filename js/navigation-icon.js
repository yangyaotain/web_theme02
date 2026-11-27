/** Shared navigation artwork and embedded content editor; values belong to business records. */
(function () {
    'use strict';
    if (window.NavigationIcon) return;
    const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
    const paths = {
        box: '<path d="m3 7 9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10M8 5l9 4"/>',
        factory: '<path d="M3 21V10l7 4V7l7 4V3h4v18zM7 18h1m4 0h1m4 0h1"/>'
    };
    // The retired configuration must never override content fields or partner Logos.
    try {
        localStorage.removeItem('lg-portal-navigation-icons:v1:overrides');
        localStorage.removeItem('lg-portal-navigation-icons:v1:version');
    } catch { /* Rendering remains available without storage. */ }

    function normalize(value) {
        if (!value) return null;
        if (typeof value === 'string') value = { type: 'image', src: value };
        if (value.type === 'svg' && Object.hasOwn(paths, value.name)) return { type: 'svg', name: value.name };
        if (value.type === 'icon' && /^[a-z][a-z0-9_]{0,60}$/.test(value.name || '')) return { type: 'icon', name: value.name };
        if (value.type === 'image' && (/^data:image\/(png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(value.src || '')
            || /^images\/(?!.*\.\.)[a-z0-9_./-]+\.(png|jpe?g|webp|svg)$/i.test(value.src || ''))) {
            return { type: 'image', src: value.src, name: String(value.name || '') };
        }
        return null;
    }
    function svg(name) {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || paths.box) + '</svg>';
    }
    function ensureFont() {
        if (document.querySelector('[data-navigation-icon-font]')) return;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0';
        link.dataset.navigationIconFont = '';
        document.head.appendChild(link);
    }
    function render(value, fallback, renderSVG = svg, small = false) {
        const visual = normalize(value) || fallback || { type: 'svg', name: 'box' };
        let content;
        if (visual.type === 'image') content = '<img src="' + escape(visual.src) + '" alt="">';
        else if (visual.type === 'icon') {
            ensureFont();
            content = '<span class="nav-config-material" aria-hidden="true">' + escape(visual.name) + '</span>';
        } else content = renderSVG(visual.name);
        return '<span class="nav-menu-icon' + (small ? ' is-small' : '') + (visual.type === 'image' ? ' is-image' : '') + '" aria-hidden="true">' + content + '</span>';
    }

    function mountEditor(root, options) {
        let value = normalize(options.value);
        let pending = false;
        const label = options.label || '导航图标';
        root.classList.add('navigation-icon-editor');
        root.innerHTML = '<div data-navigation-picker></div>'
            + '<p class="navigation-icon-hint">' + escape(options.hint || '仅用于门户导航，建议使用正方形图片，支持 JPG、PNG，单张不超过 1MB。') + '</p>'
            + '<p class="navigation-icon-error" data-navigation-error role="alert" hidden></p>';
        const pickerRoot = root.querySelector('[data-navigation-picker]');
        const error = root.querySelector('[data-navigation-error]');
        function clearError() { error.textContent = ''; error.hidden = true; }
        const pickerValue = value?.type === 'svg' ? { type: 'icon', name: value.name === 'factory' ? 'factory' : 'inventory_2' } : value;
        const picker = window.ImageIconPicker.mount(pickerRoot, {
                label, modalTitle: '选择图标', maxCount: 1, maxSizeMB: 1, allowReplace: true,
                value: pickerValue,
                onChange: values => {
                    value = normalize(values[0]);
                    clearError();
                    options.onChange?.(value ? { ...value } : null);
                },
                onError: message => { error.textContent = message; error.hidden = !message; },
                onUploadPending: uploading => {
                    pending = uploading;
                    pickerRoot.classList.toggle('is-uploading', uploading);
                    options.onUploadPending?.(uploading);
                }
        });
        root.addEventListener('keydown', event => {
            if (event.key === 'Enter' && event.target.matches('[data-iip-search]')) event.preventDefault();
            if (event.key === 'Escape' && picker.open) { picker.close(); pickerRoot.querySelector('[data-iip-open]')?.focus(); }
        });
        return { value: () => value ? { ...value } : null, isPending: () => pending };
    }
    window.NavigationIcon = { normalize, render, mountEditor };
})();
