(function () {
    'use strict';

    var MAX_FILE_COUNT = 10;
    var MAX_FILE_SIZE = 5 * 1024 * 1024;
    var ALLOWED_EXTENSIONS = ['doc', 'docx', 'pdf', 'jpg', 'png'];
    var layer = null;
    var state = null;
    var keydownHandler = null;
    var removeTimer = null;

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
        });
    }

    function materialIcon(name) {
        return '<span class="material-symbols-outlined" aria-hidden="true">' + escapeHtml(name) + '</span>';
    }

    function formatFileSize(size) {
        if (size >= 1024 * 1024) return (size / (1024 * 1024)).toFixed(2) + ' MB';
        if (size >= 1024) return (size / 1024).toFixed(1) + ' KB';
        return size + ' B';
    }

    function getFileExtension(name) {
        var parts = String(name || '').toLowerCase().split('.');
        return parts.length > 1 ? parts.pop() : '';
    }

    function renderFileRows() {
        if (!state || !state.files.length) return '';
        return state.files.map(function (file, index) {
            return ''
                + '<div class="buyer-order-operation-file">'
                +   materialIcon('attach_file')
                +   '<span class="buyer-order-operation-file-name" title="' + escapeHtml(file.name) + '">' + escapeHtml(file.name) + '</span>'
                +   '<span class="buyer-order-operation-file-size">' + formatFileSize(file.size) + '</span>'
                +   '<button class="buyer-order-operation-file-remove" type="button" data-buyer-operation-file-remove="' + index + '">'
                +       materialIcon('delete') + '<span>删除</span>'
                +   '</button>'
                + '</div>';
        }).join('');
    }

    function renderTextarea(label, placeholder, maxLength) {
        return ''
            + '<div class="buyer-order-operation-field">'
            +   '<label class="buyer-order-operation-label" for="buyerOrderOperationTextarea"><span class="buyer-order-operation-required">*</span>' + escapeHtml(label) + '</label>'
            +   '<div class="buyer-order-operation-control">'
            +       '<div class="buyer-order-operation-textarea-wrap">'
            +           '<textarea class="buyer-order-operation-textarea" id="buyerOrderOperationTextarea" maxlength="' + maxLength + '" placeholder="' + escapeHtml(placeholder) + '" aria-describedby="buyerOrderOperationTextError buyerOrderOperationCount" data-buyer-operation-textarea>' + escapeHtml(state.text) + '</textarea>'
            +           '<span class="buyer-order-operation-count" id="buyerOrderOperationCount" aria-live="polite" data-buyer-operation-count>' + state.text.length + '/' + maxLength + '</span>'
            +       '</div>'
            +       '<div class="buyer-order-operation-error" id="buyerOrderOperationTextError" role="alert" data-buyer-operation-text-error>' + escapeHtml(state.textError) + '</div>'
            +   '</div>'
            + '</div>';
    }

    function renderCancelBody() {
        return renderTextarea('取消理由', '请输入取消理由', 500);
    }

    function renderDisputeBody() {
        return ''
            + '<div class="buyer-order-operation-order-no"><span>订单编号：</span><strong>' + escapeHtml(state.orderNo) + '</strong></div>'
            + renderTextarea('描述', '请输入争议描述，不超过400字', 400)
            + '<div class="buyer-order-operation-field">'
            +   '<div class="buyer-order-operation-label">附件</div>'
            +   '<div class="buyer-order-operation-control">'
            +       '<label class="buyer-order-operation-upload" role="button" tabindex="0" data-buyer-operation-upload>'
            +           '<span>上传文件</span>'
            +           '<input type="file" accept=".doc,.docx,.pdf,.jpg,.png" multiple tabindex="-1" data-buyer-operation-files-input>'
            +       '</label>'
            +       '<p class="buyer-order-operation-help">可上传10个文件，支持扩展名：.doc .docx .pdf .jpg .png格式，单个文件大小不超过5MB</p>'
            +       '<div class="buyer-order-operation-files" data-buyer-operation-files>' + renderFileRows() + '</div>'
            +       '<div class="buyer-order-operation-error" role="alert" data-buyer-operation-file-error>' + escapeHtml(state.fileError) + '</div>'
            +   '</div>'
            + '</div>';
    }

    function getConfirmDescription() {
        return '确认供方已完成交付吗?';
    }

    function renderConfirmBody() {
        return '<p class="buyer-order-operation-confirm-copy">' + escapeHtml(getConfirmDescription()) + '</p>';
    }

    function renderFooter() {
        return ''
            + '<button class="buyer-order-operation-button" type="button" data-buyer-operation-close><span>取消</span></button>'
            + '<button class="buyer-order-operation-button is-primary" type="button" data-buyer-operation-confirm><span>确定</span></button>';
    }

    function renderDialog() {
        var isConfirm = state.type === 'confirm';
        var body = state.type === 'cancel'
            ? renderCancelBody()
            : (state.type === 'dispute' ? renderDisputeBody() : renderConfirmBody());
        return ''
            + '<section class="buyer-order-operation-dialog is-' + escapeHtml(state.type) + (isConfirm ? ' is-confirm' : '') + '" role="dialog" aria-modal="true" aria-labelledby="buyerOrderOperationTitle">'
            +   '<header class="buyer-order-operation-header">'
            +       '<h2 class="buyer-order-operation-title" id="buyerOrderOperationTitle">'
            +           (isConfirm ? materialIcon('warning') : '')
            +           '<span>' + escapeHtml(state.title) + '</span>'
            +       '</h2>'
            +       (isConfirm ? '' : '<button class="buyer-order-operation-close" type="button" aria-label="关闭' + escapeHtml(state.title) + '" data-buyer-operation-close>' + materialIcon('close') + '</button>')
            +   '</header>'
            +   '<div class="buyer-order-operation-body">' + body + '</div>'
            +   '<footer class="buyer-order-operation-footer">' + renderFooter() + '</footer>'
            + '</section>';
    }

    function getFocusables() {
        if (!layer) return [];
        return Array.prototype.slice.call(layer.querySelectorAll('button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    }

    function focusFirstControl() {
        if (!layer) return;
        var target = state.type === 'confirm'
            ? layer.querySelector('[data-buyer-operation-confirm]')
            : layer.querySelector('[data-buyer-operation-textarea]');
        if (target) target.focus();
    }

    function removeLayerImmediately() {
        window.clearTimeout(removeTimer);
        removeTimer = null;
        if (keydownHandler) document.removeEventListener('keydown', keydownHandler);
        keydownHandler = null;
        if (layer && layer.parentNode) layer.parentNode.removeChild(layer);
        layer = null;
        document.body.classList.remove('buyer-order-operation-open');
    }

    function close(reason) {
        if (!state || !layer) return;
        var currentState = state;
        state = null;
        if (keydownHandler) document.removeEventListener('keydown', keydownHandler);
        keydownHandler = null;
        layer.classList.remove('show');
        document.body.classList.remove('buyer-order-operation-open');
        removeTimer = window.setTimeout(function () {
            if (layer && layer.parentNode) layer.parentNode.removeChild(layer);
            layer = null;
            removeTimer = null;
            if (currentState.returnFocus && currentState.returnFocus.isConnected && typeof currentState.returnFocus.focus === 'function') {
                currentState.returnFocus.focus();
            }
            if (reason !== 'confirmed' && typeof currentState.onCancel === 'function') currentState.onCancel(reason || 'close');
        }, 200);
    }

    function updateTextState(textarea) {
        state.text = textarea.value;
        state.textError = '';
        textarea.classList.remove('is-invalid');
        var count = layer.querySelector('[data-buyer-operation-count]');
        var error = layer.querySelector('[data-buyer-operation-text-error]');
        if (count) count.textContent = state.text.length + '/' + state.maxLength;
        if (error) error.textContent = '';
    }

    function showTextError(message) {
        state.textError = message;
        var textarea = layer.querySelector('[data-buyer-operation-textarea]');
        var error = layer.querySelector('[data-buyer-operation-text-error]');
        if (textarea) {
            textarea.classList.add('is-invalid');
            textarea.focus();
        }
        if (error) error.textContent = message;
    }

    function updateFileUi() {
        var list = layer.querySelector('[data-buyer-operation-files]');
        var error = layer.querySelector('[data-buyer-operation-file-error]');
        if (list) list.innerHTML = renderFileRows();
        if (error) error.textContent = state.fileError;
        bindFileRemoveButtons();
    }

    function addFiles(fileList) {
        var nextFiles = Array.prototype.slice.call(fileList || []);
        var errors = [];
        nextFiles.forEach(function (file) {
            var extension = getFileExtension(file.name);
            if (ALLOWED_EXTENSIONS.indexOf(extension) === -1) {
                errors.push(file.name + '：文件格式不支持');
                return;
            }
            if (file.size > MAX_FILE_SIZE) {
                errors.push(file.name + '：文件大小超过5MB');
                return;
            }
            var duplicate = state.files.some(function (item) {
                return item.name === file.name && item.size === file.size && item.lastModified === file.lastModified;
            });
            if (duplicate) return;
            if (state.files.length >= MAX_FILE_COUNT) {
                errors.push('最多只能上传10个文件');
                return;
            }
            state.files.push(file);
        });
        state.fileError = errors.length ? errors[0] : '';
        updateFileUi();
    }

    function bindFileRemoveButtons() {
        if (!layer) return;
        layer.querySelectorAll('[data-buyer-operation-file-remove]').forEach(function (button) {
            button.addEventListener('click', function () {
                var index = parseInt(this.dataset.buyerOperationFileRemove, 10);
                if (Number.isNaN(index)) return;
                state.files.splice(index, 1);
                state.fileError = '';
                updateFileUi();
            });
        });
    }

    function submit() {
        if (!state) return;
        var currentState = state;
        if (currentState.type !== 'confirm') {
            var value = currentState.text.trim();
            if (!value) {
                showTextError(currentState.type === 'cancel' ? '请输入取消理由。' : '请输入争议描述。');
                return;
            }
            currentState.text = value;
        }
        var payload = currentState.type === 'cancel'
            ? { reason: currentState.text }
            : (currentState.type === 'dispute'
                ? { description: currentState.text, files: currentState.files.slice() }
                : { confirmed: true });
        var onConfirm = currentState.onConfirm;
        close('confirmed');
        if (typeof onConfirm === 'function') onConfirm(payload);
    }

    function bindEvents() {
        layer.addEventListener('click', function (event) {
            if (event.target === layer) {
                close('mask');
                return;
            }
            if (event.target.closest('[data-buyer-operation-close]')) {
                close('cancel');
                return;
            }
            if (event.target.closest('[data-buyer-operation-confirm]')) submit();
        });

        var textarea = layer.querySelector('[data-buyer-operation-textarea]');
        if (textarea) {
            textarea.addEventListener('input', function () { updateTextState(this); });
        }

        var input = layer.querySelector('[data-buyer-operation-files-input]');
        if (input) {
            input.addEventListener('change', function () {
                addFiles(this.files);
                this.value = '';
            });
        }
        var upload = layer.querySelector('[data-buyer-operation-upload]');
        if (upload && input) {
            upload.addEventListener('keydown', function (event) {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                input.click();
            });
        }
        bindFileRemoveButtons();

        keydownHandler = function (event) {
            if (!layer) return;
            if (event.key === 'Escape') {
                event.preventDefault();
                close('escape');
                return;
            }
            if (event.key !== 'Tab') return;
            var focusables = getFocusables();
            if (!focusables.length) return;
            var first = focusables[0];
            var last = focusables[focusables.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', keydownHandler);
    }

    function open(type, options) {
        options = options || {};
        removeLayerImmediately();
        state = {
            type: type,
            title: type === 'cancel' ? '取消订单' : (type === 'dispute' ? '发起争议' : '确认交付'),
            orderNo: options.orderNo || '',
            itemName: options.itemName || '',
            entityLabel: options.entityLabel || '产品',
            description: options.description || '',
            text: '',
            textError: '',
            fileError: '',
            files: [],
            maxLength: type === 'cancel' ? 500 : 400,
            returnFocus: options.returnFocus || document.activeElement,
            onConfirm: options.onConfirm,
            onCancel: options.onCancel
        };
        layer = document.createElement('div');
        layer.className = 'buyer-order-operation-layer';
        layer.innerHTML = renderDialog();
        document.body.appendChild(layer);
        document.body.classList.add('buyer-order-operation-open');
        bindEvents();
        window.requestAnimationFrame(function () {
            if (!layer) return;
            layer.classList.add('show');
            focusFirstControl();
        });
    }

    window.BuyerOrderOperations = {
        openCancel: function (options) { open('cancel', options); },
        openDispute: function (options) { open('dispute', options); },
        openConfirmDelivery: function (options) { open('confirm', options); },
        close: close
    };
})();
