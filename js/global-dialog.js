/**
 * GlobalDialog — 全局统一对话框
 *
 * 用法:
 *   GlobalDialog.success({ title, desc, duration, onClose })
 *   GlobalDialog.info({ title, desc, duration, onClose })
 *   GlobalDialog.confirm({ title, desc, confirmText, cancelText, onConfirm, onCancel })
 *   GlobalDialog.danger({ title, desc, confirmText, cancelText, onConfirm, onCancel })
 *   GlobalDialog.warning({ title, desc, confirmText, cancelText, onConfirm, onCancel })
 */
var GlobalDialog = (function () {
    'use strict';

    var SVG = {
        success: '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
        info:    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
        confirm: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        danger:  '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        warning: '<svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
    };

    var SVG_INLINE = {
        confirm: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
        danger:  '<svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
        warning: '<svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>'
    };

    var CLOSE_SVG = '<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>';

    var FADE_MS = 240;

    function _createOverlay() {
        var el = document.createElement('div');
        el.className = 'g-dialog-overlay';
        document.body.appendChild(el);
        return el;
    }

    function _show(overlay) {
        void overlay.offsetHeight;
        overlay.classList.add('show');
    }

    function _hide(overlay, cb) {
        overlay.classList.remove('show');
        setTimeout(function () {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            if (typeof cb === 'function') cb();
        }, FADE_MS);
    }

    function _buildBox(type, opts) {
        var iconClass = 'icon-' + type;
        var html = '<div class="g-dialog-box">' +
            '<div class="g-dialog-icon ' + iconClass + '">' + SVG[type] + '</div>' +
            '<div class="g-dialog-title">' + (opts.title || '') + '</div>';
        if (opts.desc) {
            html += '<div class="g-dialog-desc">' + opts.desc + '</div>';
        }
        return html;
    }

    function _toast(type, opts) {
        opts = opts || {};
        var overlay = _createOverlay();
        var html = _buildBox(type, opts) + '</div>';
        overlay.innerHTML = html;

        _show(overlay);

        var duration = opts.duration || 1600;
        setTimeout(function () {
            _hide(overlay, opts.onClose);
        }, duration);

        return overlay;
    }

    function _dialog(type, opts) {
        opts = opts || {};
        var overlay = _createOverlay();
        overlay.classList.add('g-dialog-confirm');
        var confirmText = opts.confirmText || '确 定';
        var cancelText = opts.cancelText || '取 消';
        var btnClass = type === 'danger' ? 'g-dialog-btn-danger' : 'g-dialog-btn-primary';
        var inlineSvg = SVG_INLINE[type] || SVG_INLINE.warning;

        var html = '<div class="g-dialog-box">' +
            '<div class="g-dialog-confirm-header">' +
                '<div class="g-dialog-title">' + (opts.title || '') + '</div>' +
                '<button class="g-dialog-confirm-close" data-role="cancel">' + CLOSE_SVG + '</button>' +
            '</div>' +
            '<div class="g-dialog-confirm-body">' +
                '<span class="g-dialog-inline-icon ic-' + type + '">' + inlineSvg + '</span>' +
                '<div class="g-dialog-desc">' + (opts.desc || '') + '</div>' +
            '</div>' +
            '<div class="g-dialog-confirm-footer">' +
                '<button class="g-dialog-btn g-dialog-btn-cancel" data-role="cancel">' + cancelText + '</button>' +
                '<button class="g-dialog-btn ' + btnClass + '" data-role="confirm">' + confirmText + '</button>' +
            '</div>' +
        '</div>';
        overlay.innerHTML = html;

        overlay.addEventListener('click', function (e) {
            var target = e.target.closest('[data-role]');
            if (!target) return;
            var role = target.getAttribute('data-role');
            if (role === 'confirm') {
                _hide(overlay, opts.onConfirm);
            } else if (role === 'cancel') {
                _hide(overlay, opts.onCancel);
            }
        });

        _show(overlay);
        return overlay;
    }

    return {
        success: function (opts) { return _toast('success', opts); },
        info:    function (opts) { return _toast('info', opts); },
        confirm: function (opts) { return _dialog('confirm', opts); },
        danger:  function (opts) { return _dialog('danger', opts); },
        warning: function (opts) { return _dialog('warning', opts); }
    };
})();
