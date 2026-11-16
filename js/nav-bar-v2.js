/**
 * Independent navigation 2.0 preview. The original <nav-bar> stays unchanged.
 * Reuses NavBar's brand, account UI, special zones and message center.
 */
(function () {
    'use strict';

    const paths = {
        home: '<path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8"/>',
        database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
        grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
        network: '<circle cx="12" cy="5" r="3"/><circle cx="5" cy="18" r="3"/><circle cx="19" cy="18" r="3"/><path d="m10.5 7.5-4 8m7-8 4 8M8 18h8"/>',
        leaf: '<path d="M20 3c1 9-2 16-9 16a7 7 0 0 1-7-7C4 5 11 4 20 3zM3 21l12-12"/>',
        shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z"/><path d="m8 12 3 3 5-6"/>',
        box: '<path d="m3 7 9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10M8 5l9 4"/>',
        folder: '<path d="M3 7V5h7l2 3h9v12H3z"/><path d="M3 8h9"/>',
        plane: '<path d="m3 11 18-8-8 18-2-8zM11 13 21 3"/>',
        robot: '<rect x="5" y="7" width="14" height="13" rx="3"/><path d="M12 3v4M2 11v5m20-5v5M9 12h.01M15 12h.01M9 16h6"/>',
        health: '<path d="M20 13c4-6-4-12-8-6-4-6-12 0-8 6l8 8z"/><path d="M9 12h6m-3-3v6"/>',
        art: '<path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-4 2 2 0 0 1 1-4h3c4 0 4-10-6-10z"/><path d="M7 10h.01M10 7h.01M15 7h.01"/>',
        chart: '<path d="M4 3v18h17M8 16v-4m5 4V7m5 9v-7"/>',
        chat: '<path d="M21 11a8 8 0 0 1-8 8H7l-4 3V11a9 9 0 0 1 18 0zM7 9h10M7 13h7"/>',
        factory: '<path d="M3 21V10l7 4V7l7 4V3h4v18zM7 18h1m4 0h1m4 0h1"/>',
        pen: '<path d="m15 4 5 5M4 15 16 3l5 5L9 20l-6 1zM4 15l5 5"/>',
        code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/>',
        register: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 5V3h8v4H8M8 12h8m-8 4h5"/>',
        book: '<path d="M12 5v16M3 3c4 0 6 0 9 2 3-2 5-2 9-2v16c-4 0-6 0-9 2-3-2-5-2-9-2z"/>',
        users: '<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 4c3 0 4 2 4 4v3"/>',
        news: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h4v5H7zM15 7h2m-2 4h2M7 16h10"/>',
        help: '<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 1 1 5 2c-1 1-2 1-2 3m0 3h.01"/>',
        login: '<path d="M14 3h6v18h-6M3 12h12m-4-4 4 4-4 4"/>',
        logout: '<path d="M10 3H4v18h6m-1-9h12m-4-4 4 4-4 4"/>',
        arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
        chevron: '<path d="m6 9 6 6 6-6"/>',
        close: '<path d="m6 6 12 12M6 18 18 6"/>',
        menu: '<path d="M3 6h18M3 12h18M3 18h18"/>'
    };
    function icon(name) {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || paths.grid) + '</svg>';
    }
    function escape(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[char]));
    }
    const item = (label, href, glyph, description) => ({ label, href, glyph, description });

    class NavBarV2 extends NavBar {
        _sections() {
            // The shared helper already escapes editable zone names.
            const decoder = document.createElement('textarea');
            const zones = this._getSpecialZoneItems().map(zone => {
                decoder.innerHTML = zone.label;
                return { label: decoder.value, href: zone.href };
            });
            const spaces = this._getSpaceItems();
            return [
                {
                    id: 'data', label: '数据聚合', glyph: 'database',
                    heading: '看清数据来源，连接可信流通',
                    footer: '从资源目录到行业空间，按业务需要选择数据入口。',
                    groups: [
                        { title: '公共数据与流通', glyph: 'shield', items: [
                            item('公共数据授权运营', 'data-scenario.html', 'shield', '了解龙岗区公共数据授权运营，查看适用场景与开发利用路径。'),
                            item(spaces[0].label, spaces[0].href, spaces[0].glyph, spaces[0].description)
                        ] },
                        { title: '数据资源与产品', glyph: 'database', items: [
                            item('数据资源', 'data-resources.html', 'database', '查找可申请、可使用的数据资源'),
                            item('数据产品', 'data-products.html', 'box', '浏览面向业务应用的数据产品')
                        ], zones },
                        { title: '子空间', glyph: 'network', items: spaces.slice(1).map(space => item(space.label, space.href, space.glyph, space.description)) }
                    ]
                },
                {
                    id: 'app', label: '应用聚合', glyph: 'grid',
                    heading: '从业务任务出发，找到产品与服务',
                    footer: '连接行业方案、专业咨询与数据生产工具。',
                    groups: [
                        { title: '行业应用与咨询', glyph: 'chart', items: [
                            item('行业解决方案', 'industry-solutions.html', 'chart', '围绕行业场景，查找适用的解决方案'),
                            item('数据咨询服务', 'data-consulting.html', 'chat', '了解数据开发利用相关的专业咨询服务')
                        ] },
                        { title: '数据生产与加工', glyph: 'factory', items: [
                            item('数据工厂生产线', 'data-production-line.html', 'factory', '覆盖机器人、大模型、数据治理、低空经济及 CIM 数据服务五类生产线。'),
                            item('数据标注平台', 'data-factory.html', 'pen', '了解数据标注与加工能力，支撑高质量数据生产。')
                        ] },
                        { title: '开发与工具', glyph: 'code', items: [
                            item('开发工具', 'data-dev-platform.html', 'code', '查看数据开发、分析与加工工具')
                        ] }
                    ]
                },
                {
                    id: 'eco', label: '生态聚合', glyph: 'network',
                    heading: '连接生态伙伴，促进供需合作',
                    footer: '从合作入驻到社区交流，连接数据要素生态。',
                    groups: [
                        { title: '生态合作', glyph: 'register', items: [
                            item('数商入驻', 'portal-placeholder.html?page=merchant-onboarding', 'register', '了解入驻入口，参与平台生态合作'),
                            item('产教融合', 'portal-placeholder.html?page=industry-education', 'book', '连接产业需求与教育资源')
                        ] },
                        { title: '社区与供需', glyph: 'users', items: [
                            item('数据科学社区', 'community.html', 'users', '参与数据话题交流，分享经验与实践'),
                            item('需求大厅', 'demand-hall.html', 'chat', '发现数据与服务需求，促进供需对接')
                        ] },
                        { title: '资讯与支持', glyph: 'news', items: [
                            item('政策资讯', 'policy-news.html', 'news', '了解数据要素相关政策与平台资讯'),
                            item('帮助中心', 'help-center.html', 'help', '查看平台使用指南与常见问题')
                        ] }
                    ]
                }
            ];
        }

        _renderEntry(entry) {
            return `<a class="v2-entry" href="${escape(entry.href)}">
                <span class="v2-entry-icon">${icon(entry.glyph)}</span>
                <span class="v2-entry-copy"><strong>${escape(entry.label)}</strong><small>${escape(entry.description)}</small></span>
                <span class="v2-entry-arrow">${icon('arrow')}</span>
            </a>`;
        }

        _renderGroup(group) {
            const zones = group.zones && group.zones.length ? `<div class="v2-zones">
                <h4>${icon('folder')}特色专区</h4>
                <div class="v2-zone-links">${group.zones.map(zone => `<a href="${escape(zone.href)}">${icon('folder')}<span>${escape(zone.label)}</span>${icon('arrow')}</a>`).join('')}</div>
            </div>` : '';
            return `<section class="v2-group">
                <h3>${icon(group.glyph)}${escape(group.title)}</h3>
                <div class="v2-entries">${group.items.map(entry => this._renderEntry(entry)).join('')}</div>${zones}
            </section>`;
        }

        _render() {
            clearTimeout(this._closeTimer);
            super._render();
            const shadow = this.shadowRoot;
            this._openSection = null;
            this._hoverOpened = null;
            shadow.querySelector('.nav').setAttribute('aria-label', '平台主导航');
            shadow.querySelector('.nav-brand').href = 'navigation-v2.html';
            const links = shadow.querySelector('.nav-links');
            links.id = 'v2-primary';
            links.innerHTML = `<a href="navigation-v2.html" class="v2-home" aria-current="page">${icon('home')}<span>首页</span></a>` + this._sections().map(section => `
                <div class="v2-nav-item" data-section="${section.id}">
                    <button type="button" class="v2-trigger" id="v2-trigger-${section.id}" aria-expanded="false" aria-controls="v2-panel-${section.id}">
                        ${icon(section.glyph)}<span>${section.label}</span><span class="v2-chevron">${icon('chevron')}</span>
                    </button>
                    <div class="v2-panel" id="v2-panel-${section.id}" aria-labelledby="v2-trigger-${section.id}" hidden>
                        <div class="v2-panel-inner">
                            <div class="v2-panel-heading"><div><span>${section.label}</span><h2>${section.heading}</h2></div>
                                <button type="button" class="v2-close" data-close aria-label="关闭${section.label}导航">${icon('close')}<span>收起</span></button>
                            </div>
                            <div class="v2-grid">${section.groups.map(group => this._renderGroup(group)).join('')}</div>
                            <div class="v2-panel-footer"><span>${section.footer}</span></div>
                        </div>
                    </div>
                </div>`).join('');

            const mobile = document.createElement('button');
            mobile.type = 'button';
            mobile.className = 'v2-mobile-toggle';
            mobile.setAttribute('aria-expanded', 'false');
            mobile.setAttribute('aria-controls', 'v2-primary');
            mobile.innerHTML = icon('menu') + '<span>导航</span>';
            links.before(mobile);

            // Keep the shared account content, adding icons and keyboard controls.
            shadow.querySelectorAll('.nav-actions .btn, .logout-btn').forEach(button => {
                const glyph = button.id === 'logoutBtn' ? 'logout' : button.getAttribute('href') === 'register.html' ? 'register' : 'login';
                button.insertAdjacentHTML('afterbegin', icon(glyph));
            });
            shadow.querySelectorAll('.user-menu-item').forEach(link => {
                link.insertAdjacentHTML('afterbegin', icon('grid'));
            });
            shadow.querySelectorAll('.nav-actions .dropdown-item').forEach(link => {
                link.insertAdjacentHTML('afterbegin', icon('network'));
            });
            const spaceTrigger = shadow.querySelector('.nav-actions .nav-dropdown-trigger');
            if (spaceTrigger) {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = spaceTrigger.className;
                button.innerHTML = icon('network') + spaceTrigger.innerHTML;
                button.id = 'v2-spaces-trigger';
                button.setAttribute('aria-expanded', 'false');
                button.setAttribute('aria-controls', 'v2-spaces-panel');
                spaceTrigger.replaceWith(button);
                const spacePanel = shadow.querySelector('.nav-dropdown-menu');
                spacePanel.id = 'v2-spaces-panel';
                spacePanel.setAttribute('inert', '');
            }
            const userTrigger = shadow.getElementById('userTrigger');
            if (userTrigger) {
                userTrigger.setAttribute('role', 'button');
                userTrigger.tabIndex = 0;
                userTrigger.setAttribute('aria-expanded', 'false');
                userTrigger.setAttribute('aria-controls', 'userPanel');
                shadow.getElementById('userPanel').setAttribute('inert', '');
            }
            const bell = shadow.querySelector('.notify-bell');
            if (bell) {
                bell.setAttribute('role', 'button');
                bell.tabIndex = 0;
                bell.setAttribute('aria-label', '通知');
            }
            const stylesheet = document.createElement('link');
            stylesheet.rel = 'stylesheet';
            stylesheet.href = 'css/navigation-v2.css';
            shadow.append(stylesheet);
        }

        _closePrimary(restoreFocus = false) {
            clearTimeout(this._closeTimer);
            const openGroup = this._openSection;
            this.shadowRoot.querySelectorAll('.v2-nav-item').forEach(group => {
                group.querySelector('.v2-trigger').setAttribute('aria-expanded', 'false');
                group.querySelector('.v2-panel').hidden = true;
            });
            this._openSection = null;
            this._hoverOpened = null;
            if (restoreFocus && openGroup) openGroup.querySelector('.v2-trigger').focus({ preventScroll: true });
        }

        _closeAccounts(except, keepNotifications = false) {
            this.shadowRoot.querySelectorAll('.nav-actions [aria-controls]').forEach(trigger => {
                if (trigger === except) return;
                trigger.setAttribute('aria-expanded', 'false');
                const panel = this.shadowRoot.getElementById(trigger.getAttribute('aria-controls'));
                panel.classList.remove('open');
                panel.setAttribute('inert', '');
            });
            if (!keepNotifications) {
                this.shadowRoot.querySelectorAll('.mc-dropdown.open').forEach(panel => panel.classList.remove('open'));
            }
        }

        _openPrimary(group, hover = false) {
            this._closePrimary();
            this._closeAccounts();
            group.querySelector('.v2-trigger').setAttribute('aria-expanded', 'true');
            group.querySelector('.v2-panel').hidden = false;
            this._openSection = group;
            this._hoverOpened = hover ? group : null;
        }

        _closeMobile() {
            this._closePrimary();
            this.shadowRoot.querySelector('.nav-links').classList.remove('v2-mobile-open');
            this.shadowRoot.querySelector('.v2-mobile-toggle').setAttribute('aria-expanded', 'false');
        }

        _bindEvents() {
            if (this._events) this._events.abort();
            this._events = new AbortController();
            const options = { signal: this._events.signal };
            const shadow = this.shadowRoot;
            const groups = Array.from(shadow.querySelectorAll('.v2-nav-item'));
            const isDesktop = () => window.matchMedia('(min-width: 901px)').matches;

            groups.forEach(group => {
                const trigger = group.querySelector('.v2-trigger');
                group.addEventListener('pointerenter', event => {
                    if (event.pointerType === 'mouse' && isDesktop()) this._openPrimary(group, true);
                }, options);
                group.addEventListener('pointerleave', event => {
                    if (event.pointerType !== 'mouse' || !isDesktop()) return;
                    clearTimeout(this._closeTimer);
                    this._closeTimer = setTimeout(() => {
                        // Keep an open panel available to keyboard users.
                        if (!group.contains(shadow.activeElement)) this._closePrimary();
                    }, 180);
                }, options);
                trigger.addEventListener('click', () => {
                    if (this._hoverOpened === group) {
                        this._hoverOpened = null;
                        return;
                    }
                    if (this._openSection === group) this._closePrimary();
                    else this._openPrimary(group);
                }, options);
                trigger.addEventListener('keydown', event => {
                    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
                    event.preventDefault();
                    this._openPrimary(group);
                    const entries = group.querySelectorAll('.v2-panel a');
                    entries[event.key === 'ArrowUp' ? entries.length - 1 : 0].focus();
                }, options);
                group.querySelector('[data-close]').addEventListener('click', () => this._closePrimary(true), options);
                group.addEventListener('focusout', event => {
                    if (this._openSection === group && !group.contains(event.relatedTarget)) this._closePrimary();
                }, options);
            });

            const mobile = shadow.querySelector('.v2-mobile-toggle');
            mobile.addEventListener('click', () => {
                const open = mobile.getAttribute('aria-expanded') !== 'true';
                this._closePrimary();
                this._closeAccounts();
                mobile.setAttribute('aria-expanded', String(open));
                shadow.querySelector('.nav-links').classList.toggle('v2-mobile-open', open);
            }, options);

            shadow.querySelectorAll('.nav-actions [aria-controls]').forEach(trigger => {
                const panel = shadow.getElementById(trigger.getAttribute('aria-controls'));
                trigger.addEventListener('click', event => {
                    event.stopPropagation();
                    const open = trigger.getAttribute('aria-expanded') !== 'true';
                    this._closeMobile();
                    this._closeAccounts(trigger);
                    trigger.setAttribute('aria-expanded', String(open));
                    panel.classList.toggle('open', open);
                    panel.toggleAttribute('inert', !open);
                }, options);
                trigger.addEventListener('keydown', event => {
                    if ((event.key === 'Enter' || event.key === ' ') && trigger.tagName !== 'BUTTON') {
                        event.preventDefault();
                        trigger.click();
                    } else if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        if (trigger.getAttribute('aria-expanded') !== 'true') trigger.click();
                        panel.querySelector('a, button').focus();
                    }
                }, options);
                trigger.parentElement.addEventListener('focusout', event => {
                    if (!trigger.parentElement.contains(event.relatedTarget)) {
                        trigger.setAttribute('aria-expanded', 'false');
                        panel.classList.remove('open');
                        panel.setAttribute('inert', '');
                    }
                }, options);
            });
            const logout = shadow.getElementById('logoutBtn');
            if (logout) logout.addEventListener('click', () => {
                try { localStorage.removeItem('lgk_logged_in'); } catch (error) { /* Keep the existing guest fallback. */ }
                this._closeMobile();
                this._render();
                this._bindEvents();
            }, options);

            this._bindMessageDropdown();
            const bell = shadow.querySelector('.notify-bell');
            if (bell) {
                bell.addEventListener('click', event => {
                    if (event.target.closest('.mc-dropdown')) return;
                    this._closeMobile();
                    this._closeAccounts(null, true);
                }, { ...options, capture: true });
                bell.addEventListener('keydown', event => {
                    if (event.target !== bell) return;
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        bell.click();
                    }
                }, options);
            }

            shadow.addEventListener('click', event => {
                if (event.target.closest('a')) this._closeMobile();
            }, options);
            document.addEventListener('pointerdown', event => {
                if (!event.composedPath().includes(this)) {
                    this._closeMobile();
                    this._closeAccounts();
                }
            }, options);
            shadow.addEventListener('keydown', event => {
                if (event.key !== 'Escape') return;
                event.preventDefault();
                if (this._openSection) this._closePrimary(true);
                else {
                    const account = shadow.querySelector('.nav-actions [aria-expanded="true"]');
                    this._closeAccounts();
                    if (account) account.focus();
                    else if (mobile.getAttribute('aria-expanded') === 'true') {
                        this._closeMobile();
                        mobile.focus();
                    }
                }
            }, options);
            window.addEventListener('resize', () => {
                this._closeMobile();
                this._closeAccounts();
            }, options);
            window.addEventListener('storage', event => {
                if (['lgk_logged_in', 'lgk_special_zones_v1', null].includes(event.key)) this._refresh();
            }, options);
        }

        disconnectedCallback() {
            clearTimeout(this._closeTimer);
            if (this._events) this._events.abort();
        }
    }

    customElements.define('nav-bar-v2', NavBarV2);
})();
