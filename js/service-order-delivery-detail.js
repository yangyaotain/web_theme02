(function () {
    'use strict';

    var TABS = [
        { key: 'basic', label: '基本信息' },
        { key: 'goods', label: '交付物' }
    ];

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
        });
    }

    function materialIcon(name) {
        return '<span class="material-symbols-outlined" aria-hidden="true">' + escapeHtml(name) + '</span>';
    }

    function pad(value) {
        return String(value).padStart(2, '0');
    }

    function addMinutes(value, minutes) {
        var match = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})(?::(\d{2}))?/);
        if (!match) return String(value || '--').slice(0, 16);
        var date = new Date(
            Number(match[1]),
            Number(match[2]) - 1,
            Number(match[3]),
            Number(match[4]),
            Number(match[5]),
            Number(match[6] || 0)
        );
        date.setMinutes(date.getMinutes() + Number(minutes || 0));
        return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate())
            + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes());
    }

    function getStage(item) {
        if (item.status === '交易完成') return '交付完成';
        if (item.status === '待确认交付') return '待确认交付';
        return '待交付';
    }

    function getDeliveryContent(item) {
        if (item.status === '交易完成') return '服务已经完成验收';
        if (item.status === '待确认交付') return '服务已完成线下交付，等待需方确认';
        return '服务正在进行线下交付';
    }

    function getProof(item) {
        if (item.deliveryProof === null || item.status === '待交付') return null;
        return {
            name: item.deliveryProof || (item.status === '交易完成' ? '验收报告.jpeg' : '线下交付凭证.pdf')
        };
    }

    function buildDetail(item) {
        return {
            item: item,
            stage: getStage(item),
            taskNo: item.deliveryTaskNo || ('02' + String(item.orderNo || '')),
            createdAt: item.deliveryCreatedAt || addMinutes(item.appliedAt, 1),
            content: item.deliveryContent || getDeliveryContent(item),
            proof: getProof(item)
        };
    }

    function renderInfoGrid(fields) {
        return '<div class="supplier-order-detail-info-grid service-delivery-basic-grid">'
            + fields.map(function (field) {
                return '<div class="supplier-order-detail-info-field' + (field.full ? ' is-full' : '') + '">'
                    + '<span>' + escapeHtml(field.label) + '</span>'
                    + '<div>' + escapeHtml(field.value == null || field.value === '' ? '--' : field.value) + '</div>'
                    + '</div>';
            }).join('')
            + '</div>';
    }

    function renderSummary(detail) {
        return '<section class="supplier-order-detail-summary is-delivery-summary service-delivery-summary">'
            + '<div class="supplier-order-detail-summary-head">'
            + '<h2>' + escapeHtml(detail.stage) + '</h2>'
            + '<dl>'
            + '<div><dt>任务编号：</dt><dd>' + escapeHtml(detail.taskNo) + '</dd></div>'
            + '<div><dt>订单编号：</dt><dd>' + escapeHtml(detail.item.orderNo) + '</dd></div>'
            + '<div><dt>创建时间：</dt><dd>' + escapeHtml(detail.createdAt) + '</dd></div>'
            + '<div><dt>交付阶段：</dt><dd>' + escapeHtml(detail.stage) + '</dd></div>'
            + '</dl></div></section>';
    }

    function renderTabs(activeTab) {
        return '<div class="supplier-order-detail-tabs supplier-delivery-tabs service-delivery-tabs" role="tablist" aria-label="服务交付详情分类">'
            + TABS.map(function (tab) {
                var active = tab.key === activeTab;
                return '<button type="button" role="tab" aria-selected="' + active + '" tabindex="' + (active ? '0' : '-1') + '" class="supplier-order-detail-tab' + (active ? ' active' : '') + '" data-service-delivery-tab="' + tab.key + '">'
                    + escapeHtml(tab.label) + '</button>';
            }).join('')
            + '</div>';
    }

    function renderBasic(detail) {
        return '<section class="supplier-order-detail-section"><h3>交付物基础信息</h3>'
            + renderInfoGrid([
                { label: '服务名称：', value: detail.item.name },
                { label: '交付方式：', value: '线下交付' },
                { label: '服务交付内容：', value: detail.content, full: true }
            ])
            + '</section>';
    }

    function renderProof(detail) {
        if (!detail.proof) {
            return '<div class="service-delivery-proof-card"><span class="service-delivery-proof-label">交付凭证：</span><span>--</span></div>';
        }
        return '<div class="service-delivery-proof-card">'
            + '<span class="service-delivery-proof-label">交付凭证：</span>'
            + '<span class="service-delivery-proof-name">' + escapeHtml(detail.proof.name) + '</span>'
            + '<button type="button" data-service-delivery-file-action="预览" data-service-delivery-file="' + escapeHtml(detail.proof.name) + '">' + materialIcon('visibility') + '<span>预览</span></button>'
            + '<button type="button" data-service-delivery-file-action="下载" data-service-delivery-file="' + escapeHtml(detail.proof.name) + '">' + materialIcon('download') + '<span>下载</span></button>'
            + '</div>';
    }

    function create(options) {
        options = options || {};
        var panel = options.panel;
        var title = options.titleElement;
        var centerTitle = options.role === 'buyer' ? '需方中心' : '供方中心';
        var state = { item: null, tab: 'basic', open: false, lastFocused: null };
        var toastTimer = null;

        function showToast(message) {
            var toast = panel && panel.querySelector('[data-service-delivery-toast]');
            if (!toast) return;
            toast.querySelector('span:last-child').textContent = message;
            toast.classList.add('show');
            window.clearTimeout(toastTimer);
            toastTimer = window.setTimeout(function () { toast.classList.remove('show'); }, 2200);
        }

        function close() {
            if (!state.open) return;
            state.open = false;
            panel.classList.remove('is-supplier-order-detail', 'is-supplier-order-delivery', 'is-service-delivery-detail');
            if (typeof options.onBack === 'function') options.onBack(state.item);
            if (state.lastFocused && typeof state.lastFocused.focus === 'function') state.lastFocused.focus();
        }

        function bind() {
            var back = panel.querySelector('[data-service-delivery-back]');
            if (back) back.addEventListener('click', close);

            panel.querySelectorAll('[data-service-delivery-tab]').forEach(function (button) {
                button.addEventListener('click', function () {
                    state.tab = this.dataset.serviceDeliveryTab;
                    render();
                });
            });

            panel.querySelectorAll('[data-service-delivery-file-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    showToast(this.dataset.serviceDeliveryFileAction + '：' + this.dataset.serviceDeliveryFile + '（原型演示）');
                });
            });
        }

        function render() {
            if (!panel || !state.item) return;
            var detail = buildDetail(state.item);
            panel.classList.remove('is-order-management', 'is-supplier-order-management', 'is-placeholder', 'is-service-management', 'is-service-order-detail');
            panel.classList.add('is-supplier-order-detail', 'is-supplier-order-delivery', 'is-service-delivery-detail');
            if (title) title.textContent = '交付详情';
            document.title = '交付详情 - ' + centerTitle;
            panel.innerHTML = '<div class="supplier-order-detail-shell supplier-delivery-detail-shell service-delivery-detail-shell">'
                + '<div class="supplier-order-detail-toolbar"><button class="supplier-order-detail-back" type="button" data-service-delivery-back>'
                + materialIcon('arrow_back') + '<span>返回服务订单管理</span></button></div>'
                + '<div class="supplier-order-detail-scroll">'
                + renderSummary(detail)
                + renderTabs(state.tab)
                + '<div class="supplier-order-detail-panel supplier-delivery-detail-panel service-delivery-detail-panel" role="tabpanel">'
                + (state.tab === 'goods' ? renderProof(detail) : renderBasic(detail))
                + '</div></div></div>'
                + '<div class="supplier-order-toast service-delivery-toast" role="status" aria-live="polite" data-service-delivery-toast>'
                + materialIcon('check_circle') + '<span></span></div>';
            bind();
        }

        function open(item, initialTab, trigger) {
            if (!item) return;
            state.item = item;
            state.tab = TABS.some(function (tab) { return tab.key === initialTab; }) ? initialTab : 'basic';
            state.open = true;
            state.lastFocused = trigger || document.activeElement;
            render();
            window.setTimeout(function () {
                var back = panel.querySelector('[data-service-delivery-back]');
                if (back) back.focus();
            }, 0);
        }

        document.addEventListener('keydown', function (event) {
            if (state.open && event.key === 'Escape') close();
        });

        return {
            open: open,
            close: close,
            isOpen: function () { return state.open; }
        };
    }

    window.ServiceOrderDeliveryDetail = {
        create: create
    };
})();
