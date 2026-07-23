(function () {
    var ONLINE_CHANNELS = [
        { key: 'wechat', label: '微信支付', mode: 'scan', tradeType: 'SCAN', appType: 'WECHATCSB', tip: '请使用微信扫一扫完成支付' },
        { key: 'alipay', label: '支付宝', mode: 'scan', tradeType: 'SCAN', appType: 'ALIPAYCSB', tip: '请使用支付宝扫一扫完成支付' },
        { key: 'unionpay', label: '云闪付', mode: 'scan', tradeType: 'SCAN', appType: 'CUPCSB', tip: '请使用云闪付扫一扫完成支付' },
        { key: 'bank', label: '网银支付', mode: 'web', tradeType: 'WEB', appType: '由支付平台匹配', tip: '将前往银行支付页面完成付款' }
    ];

    var ONLINE_BANKS = [
        { code: 'CMB', label: '招商银行' },
        { code: 'CCB', label: '中国建设银行' }
    ];

    var ICON_PATHS = {
        cancel: '<path d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5z"/>',
        redo: '<path d="M12 5V2L7 7l5 5V7a5 5 0 1 1-4.55 7.06l-1.82.83A7 7 0 1 0 12 5z"/>',
        pay: '<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4H4V6h16v2zm-8 8H5v-2h7v2z"/>',
        online: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-3a15.7 15.7 0 0 0-1.4-3.2A8 8 0 0 1 18.9 8zM12 4c.8 1 1.5 2.3 1.8 4h-3.6c.3-1.7 1-3 1.8-4zM4.3 14a7.7 7.7 0 0 1 0-4h3.5a16.5 16.5 0 0 0 0 4H4.3zm.8 2h3a15.7 15.7 0 0 0 1.4 3.2A8 8 0 0 1 5.1 16zm3-8h-3a8 8 0 0 1 4.4-3.2A15.7 15.7 0 0 0 8.1 8zm3.9 12c-.8-1-1.5-2.3-1.8-4h3.6c-.3 1.7-1 3-1.8 4zm2.2-6H9.8a14.8 14.8 0 0 1 0-4h4.4a14.8 14.8 0 0 1 0 4zm.3 5.2a15.7 15.7 0 0 0 1.4-3.2h3a8 8 0 0 1-4.4 3.2zm1.7-5.2a16.5 16.5 0 0 0 0-4h3.5a7.7 7.7 0 0 1 0 4h-3.5z"/>',
        upload: '<path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/>',
        confirm: '<path d="m9 16.2-3.5-3.5L4.1 14.1 9 19 20.3 7.7l-1.4-1.4L9 16.2z"/>',
        success: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2 15-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"/>'
    };

    function icon(name) {
        return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICON_PATHS[name] || ICON_PATHS.pay) + '</svg>';
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
        });
    }

    function formatAmount(value) {
        var amount = Number(String(value == null ? '' : value).replace(/[^\d.]/g, '')) || 0;
        return amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '元';
    }

    function createCheckout() {
        var host = document.createElement('div');
        host.className = 'buyer-payment-checkout-host';
        document.body.appendChild(host);

        var state = {
            item: null,
            callbacks: {},
            paymentMethod: '',
            onlineChannel: '',
            onlineStage: 'select',
            onlineStatus: '',
            onlineQueryCount: 0,
            bankCode: 'CMB',
            cardType: '001',
            voucherName: '',
            error: '',
            successNotified: false,
            outTradeNo: '',
            channelOrderNo: '',
            paidAt: '',
            retryCount: 0
        };
        var paymentQueryTimer = null;
        var paymentResultTimer = null;
        var bankPaymentWindow = null;

        function getOnlineChannel() {
            return ONLINE_CHANNELS.find(function (channel) {
                return channel.key === state.onlineChannel;
            });
        }

        function getOnlineBankLabel() {
            var bank = ONLINE_BANKS.find(function (item) {
                return item.code === state.bankCode;
            });
            return bank ? bank.label : '';
        }

        function buildOutTradeNo(item, retryCount) {
            var source = String(item.billNo || item.orderNo || Date.now()).replace(/\D/g, '');
            var stage = item.stageNo ? 'P' + String(item.stageNo).padStart(2, '0') : 'P00';
            var retry = retryCount ? 'R' + retryCount : '';
            return 'PAY' + source.slice(-22) + stage + retry;
        }

        function getPaymentStatusLabel() {
            if (state.onlineStage === 'paying') return '等待支付';
            if (state.onlineStage === 'querying') return '结果查询中';
            if (state.onlineStage === 'success') return '支付成功';
            if (state.onlineStage === 'failed') return '支付失败';
            return '待发起';
        }

        function formatDateTime(date) {
            var pad = function (value) { return String(value).padStart(2, '0'); };
            return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate())
                + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
        }

        function renderInfo(label, value, className) {
            return ''
                + '<div class="checkout-info-item' + (className ? ' ' + className : '') + '">'
                +   '<span>' + escapeHtml(label) + '：</span>'
                +   '<strong title="' + escapeHtml(value) + '">' + escapeHtml(value) + '</strong>'
                + '</div>';
        }

        function renderPaymentStage(item) {
            if (!item.stageNo) return '';
            return ''
                + '<div class="checkout-stage-card">'
                +   '<div class="checkout-stage-badge"><span>第' + escapeHtml(item.stageNo) + '期</span><small>共' + escapeHtml(item.stageTotal) + '期</small></div>'
                +   '<div><span>本期名称</span><strong>' + escapeHtml(item.stageName) + '</strong></div>'
                +   '<div><span>本期比例</span><strong>' + escapeHtml(item.stagePercent) + '%</strong></div>'
                +   '<div><span>合同总金额</span><strong>' + formatAmount(item.contractAmount) + '</strong></div>'
                +   '<div><span>本期付款状态</span><strong>' + escapeHtml(item.stageStatus || '待支付') + '</strong></div>'
                + '</div>';
        }

        function renderPaymentTrace(item) {
            if (state.paymentMethod !== 'online') return '';
            var channel = getOnlineChannel();
            var channelLabel = channel ? channel.label + '（' + channel.tradeType + '）' : '待选择支付渠道';
            return ''
                + '<div class="checkout-trace-card">'
                +   '<div class="checkout-trace-head"><span>本次支付流水</span><strong class="is-' + escapeHtml(state.onlineStage || 'select') + '">' + getPaymentStatusLabel() + '</strong></div>'
                +   '<div class="checkout-info-grid">'
                +       renderInfo('支付流水号', state.outTradeNo)
                +       renderInfo('收款商户编号', item.merchantId || 'MER-PLATFORM-202607-0001')
                +       renderInfo('支付金额', formatAmount(item.amount))
                +       renderInfo('支付渠道', channelLabel)
                +       renderInfo('渠道应用类型', channel ? channel.appType : '--')
                +       renderInfo('渠道支付单号', state.channelOrderNo || '支付成功后生成')
                +   '</div>'
                + '</div>';
        }

        function renderOfflinePayment() {
            if (state.paymentMethod !== 'offline') return '';
            var item = state.item || {};
            return ''
                + '<div class="checkout-offline-panel">'
                +   '<section class="checkout-detail-section">'
                +       '<h3>收款方信息</h3>'
                +       '<div class="checkout-receiver-grid">'
                +           renderInfo('开户名称', item.receiverName || '深圳市龙岗区数据要素交易服务有限公司')
                +           renderInfo('开户银行', item.receiverBank || '中国农业银行深圳龙岗支行')
                +           renderInfo('银行账号', item.receiverAccount || '4405 0101 0000 12345')
                +           renderInfo('摘要/附言', item.receiverMemo || '订单号后8位', 'checkout-info-wide')
                +       '</div>'
                +   '</section>'
                +   '<section class="checkout-detail-section checkout-upload-section">'
                +       '<h3>上传支付凭证</h3>'
                +       '<div class="checkout-upload-row">'
                +           '<div class="checkout-upload-label"><em>*</em> 支付凭证</div>'
                +           '<div>'
                +               '<label class="checkout-upload-box">'
                +                   '<input type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" data-checkout-voucher>'
                +                   icon('upload')
                +                   '<span>' + (state.voucherName ? escapeHtml(state.voucherName) : '上传图片') + '</span>'
                +               '</label>'
                +               '<p>上传单个文件，支持 jpg、jpeg、png 等格式，单个文件不超过 2MB</p>'
                +           '</div>'
                +       '</div>'
                +   '</section>'
                + '</div>';
        }

        function renderOnlineChannels() {
            return ''
                + '<section class="checkout-detail-section checkout-channel-section">'
                +   '<h3>选择线上支付渠道</h3>'
                +   '<div class="checkout-channel-grid">'
                +       ONLINE_CHANNELS.map(function (channel) {
                            var active = channel.key === state.onlineChannel;
                            return ''
                                + '<button class="checkout-channel-option channel-' + channel.key + (active ? ' active' : '') + '" type="button" data-online-channel="' + channel.key + '">'
                                +   icon(channel.mode === 'web' ? 'pay' : 'online')
                                +   '<span>' + channel.label + '</span>'
                                + '</button>';
                        }).join('')
                +   '</div>'
                +   '<p class="checkout-channel-guide">选择微信、支付宝或云闪付后将立即展示二维码；网银支付将进入银行支付页面。</p>'
                + '</section>';
        }

        function renderBankPaymentForm() {
            if (state.onlineChannel !== 'bank' || state.onlineStage !== 'select') return '';
            return ''
                + '<section class="checkout-detail-section checkout-bank-section">'
                +   '<h3>填写网银支付信息</h3>'
                +   '<div class="checkout-bank-form">'
                +       '<label><span>支付银行</span><select data-online-bank>'
                +           ONLINE_BANKS.map(function (bank) {
                                return '<option value="' + bank.code + '"' + (state.bankCode === bank.code ? ' selected' : '') + '>' + bank.label + '</option>';
                            }).join('')
                +       '</select></label>'
                +       '<label><span>卡类型</span><select data-online-card-type>'
                +           '<option value="001"' + (state.cardType === '001' ? ' selected' : '') + '>借记卡</option>'
                +           '<option value="002"' + (state.cardType === '002' ? ' selected' : '') + '>信用卡</option>'
                +       '</select></label>'
                +   '</div>'
                +   '<div class="checkout-bank-notice">点击“前往网银支付”后，将进入银行支付页面。请保留当前收银台，以便返回后查询支付结果。</div>'
                + '</section>';
        }

        function getDemoQrUrl(item) {
            var payload = [
                'upp://pay',
                'outTradeNo=' + state.outTradeNo,
                'channel=' + state.onlineChannel,
                'amount=' + formatAmount(item.amount)
            ].join('&');
            return 'https://quickchart.io/qr?size=184&margin=1&text=' + encodeURIComponent(payload);
        }

        function renderOnlinePaying(item) {
            var channel = getOnlineChannel();
            if (!channel) return '';
            if (channel.mode === 'scan') {
                return ''
                    + '<section class="checkout-online-progress checkout-scan-progress">'
                    +   '<div class="checkout-qr-wrap"><img src="' + getDemoQrUrl(item) + '" alt="' + channel.label + '支付二维码"></div>'
                    +   '<div class="checkout-progress-copy">'
                    +       '<div class="checkout-progress-channel">' + icon('online') + '<span>' + channel.label + '</span></div>'
                    +       '<strong class="checkout-progress-amount">' + formatAmount(item.amount) + '</strong>'
                    +       '<h3>' + channel.tip + '</h3>'
                    +       '<p>支付状态：<em>等待支付</em></p>'
                    +       '<p>支付流水号：' + escapeHtml(state.outTradeNo) + '</p>'
                    +       '<p>扫码完成后系统将自动确认并返回支付结果，无需手动操作。</p>'
                    +       '<button class="checkout-text-action" type="button" data-online-change>' + icon('redo') + '<span>更换支付方式</span></button>'
                    +   '</div>'
                    + '</section>';
            }
            return ''
                + '<section class="checkout-online-progress checkout-bank-waiting">'
                +   '<div class="checkout-progress-icon is-waiting">' + icon('online') + '</div>'
                +   '<h3>等待网银支付结果</h3>'
                +   '<p>已选择' + getOnlineBankLabel() + ' · ' + (state.cardType === '002' ? '信用卡' : '借记卡') + '</p>'
                +   '<p>支付流水号：' + escapeHtml(state.outTradeNo) + '</p>'
                +   '<p>请在银行支付页面完成付款，返回后系统将自动确认支付结果。</p>'
                +   '<button class="checkout-text-action" type="button" data-online-change>' + icon('redo') + '<span>更换支付方式</span></button>'
                + '</section>';
        }

        function renderOnlineResult(item) {
            if (state.onlineStage === 'querying') {
                return ''
                    + '<section class="checkout-online-progress checkout-result-panel">'
                    +   '<div class="checkout-progress-icon is-querying">' + icon('online') + '</div>'
                    +   '<h3>正在确认支付结果</h3>'
                    +   '<p>请稍候，正在查询本次支付结果。</p>'
                    + '</section>';
            }
            if (state.onlineStage === 'success') {
                return ''
                    + '<section class="checkout-online-progress checkout-result-panel is-success">'
                    +   '<div class="checkout-progress-icon">' + icon('success') + '</div>'
                    +   '<h3>支付成功</h3>'
                    +   '<strong class="checkout-progress-amount">' + formatAmount(item.amount) + '</strong>'
                    +   '<p>支付流水号：' + escapeHtml(state.outTradeNo) + '</p>'
                    +   '<p>渠道支付单号：' + escapeHtml(state.channelOrderNo) + '</p>'
                    +   '<p>支付时间：' + escapeHtml(state.paidAt) + '</p>'
                    +   '<p>' + escapeHtml(item.successText || '支付结果已同步。') + '</p>'
                    + '</section>';
            }
            if (state.onlineStage === 'failed') {
                return ''
                    + '<section class="checkout-online-progress checkout-result-panel is-failed">'
                    +   '<div class="checkout-progress-icon is-failed">' + icon('cancel') + '</div>'
                    +   '<h3>支付未完成</h3>'
                    +   '<p>支付流水号：' + escapeHtml(state.outTradeNo) + '</p>'
                    +   '<p>本次支付失败，请重新选择支付方式后发起支付。</p>'
                    +   '<p>' + escapeHtml(item.failureText || '本次交易仍保留在“待支付”状态，不会重复扣款。') + '</p>'
                    + '</section>';
            }
            return renderOnlinePaying(item);
        }

        function renderOnlinePayment(item) {
            if (state.paymentMethod !== 'online') return '';
            return '<div class="checkout-online-panel">'
                + (state.onlineStage === 'select' ? renderOnlineChannels() + renderBankPaymentForm() : renderOnlineResult(item))
                + '</div>';
        }

        function renderFooter() {
            if (state.paymentMethod !== 'online') {
                return ''
                    + '<button class="checkout-footer-btn" type="button" data-checkout-close>' + icon('cancel') + '<span>取消</span></button>'
                    + '<button class="checkout-footer-btn primary" type="button" data-checkout-confirm>' + icon('confirm') + '<span>确定</span></button>';
            }
            if (state.onlineStage === 'success') {
                return '<button class="checkout-footer-btn primary" type="button" data-checkout-done>' + icon('confirm') + '<span>完成</span></button>';
            }
            if (state.onlineStage === 'failed') {
                return ''
                    + '<button class="checkout-footer-btn" type="button" data-checkout-close>' + icon('cancel') + '<span>关闭</span></button>'
                    + '<button class="checkout-footer-btn primary" type="button" data-online-retry>' + icon('redo') + '<span>重新支付</span></button>';
            }
            if (state.onlineStage === 'paying' || state.onlineStage === 'querying') {
                return '<button class="checkout-footer-btn" type="button" data-checkout-close>' + icon('cancel') + '<span>关闭</span></button>';
            }
            var channel = getOnlineChannel();
            if (!channel || channel.mode === 'scan') {
                return '<button class="checkout-footer-btn" type="button" data-checkout-close>' + icon('cancel') + '<span>取消</span></button>';
            }
            return ''
                + '<button class="checkout-footer-btn" type="button" data-checkout-close>' + icon('cancel') + '<span>取消</span></button>'
                + '<button class="checkout-footer-btn primary" type="button" data-checkout-confirm>' + icon('confirm') + '<span>前往网银支付</span></button>';
        }

        function render() {
            var item = state.item;
            if (!item) {
                host.innerHTML = '';
                return;
            }
            var offlineActive = state.paymentMethod === 'offline';
            var onlineActive = state.paymentMethod === 'online';
            host.innerHTML = ''
                + '<div class="checkout-modal-mask" data-checkout-mask>'
                +   '<section class="checkout-modal' + (offlineActive ? ' is-offline' : '') + (onlineActive ? ' is-online' : '') + '" role="dialog" aria-modal="true" aria-labelledby="shared-checkout-title">'
                +       '<header class="checkout-modal-head">'
                +           '<h2 id="shared-checkout-title">收银台</h2>'
                +           '<button type="button" aria-label="关闭收银台" data-checkout-close>' + icon('cancel') + '</button>'
                +       '</header>'
                +       '<div class="checkout-modal-body">'
                +           '<section class="checkout-order-section">'
                +               '<h3>订单信息</h3>'
                +               '<div class="checkout-info-grid">'
                +                   renderInfo('支付费用类型', item.feeType || '交易价款')
                +                   renderInfo('订单编号', item.orderNo)
                +                   renderInfo('账单编号', item.billNo)
                +                   renderInfo(item.objectLabel || '产品名称', item.objectName)
                +                   renderInfo(item.objectTypeLabel || '产品类型', item.objectType)
                +                   renderInfo('付款方名称', item.payerName || '深圳市龙岗智慧产业有限公司')
                +                   renderInfo('收款方名称', item.receiverName || '深圳市龙岗区数据要素交易服务有限公司')
                +               '</div>'
                +               renderPaymentStage(item)
                +               renderPaymentTrace(item)
                +               '<div class="checkout-payable"><span>应付金额：</span><strong>' + formatAmount(item.amount) + '</strong></div>'
                +           '</section>'
                +           '<section class="checkout-payment-section">'
                +               '<h3>选择支付方式</h3>'
                +               '<div class="checkout-methods">'
                +                   '<button class="checkout-method' + (offlineActive ? ' active' : '') + '" type="button" data-checkout-method="offline">' + icon('pay') + '<span>线下支付</span></button>'
                +                   '<button class="checkout-method' + (onlineActive ? ' active' : '') + '" type="button" data-checkout-method="online">' + icon('online') + '<span>线上支付</span></button>'
                +               '</div>'
                +               renderOfflinePayment()
                +               renderOnlinePayment(item)
                +               (state.error ? '<div class="checkout-error">' + escapeHtml(state.error) + '</div>' : '')
                +           '</section>'
                +       '</div>'
                +       '<footer class="checkout-modal-footer">' + renderFooter() + '</footer>'
                +   '</section>'
                + '</div>';
            bindEvents();
        }

        function resetState() {
            state.item = null;
            state.callbacks = {};
            state.paymentMethod = '';
            state.onlineChannel = '';
            state.onlineStage = 'select';
            state.onlineStatus = '';
            state.onlineQueryCount = 0;
            state.bankCode = 'CMB';
            state.cardType = '001';
            state.voucherName = '';
            state.error = '';
            state.successNotified = false;
            state.outTradeNo = '';
            state.channelOrderNo = '';
            state.paidAt = '';
            state.retryCount = 0;
        }

        function close(reason) {
            var callbacks = state.callbacks;
            var item = state.item;
            window.clearTimeout(paymentQueryTimer);
            window.clearTimeout(paymentResultTimer);
            resetState();
            render();
            if (callbacks.onClose) callbacks.onClose(reason || 'close', item);
        }

        function openBankPaymentPage(item) {
            var params = new URLSearchParams({
                orderNo: item.orderNo,
                outTradeNo: state.outTradeNo,
                merchantId: item.merchantId || 'MER-PLATFORM-202607-0001',
                productName: item.objectName,
                merchantName: item.merchantName || item.providerName || '',
                amount: formatAmount(item.amount),
                tradeType: 'WEB',
                appType: '由支付平台匹配',
                bankCode: state.bankCode,
                bankName: getOnlineBankLabel(),
                cardType: state.cardType
            });
            if (item.stageNo) {
                params.set('periodNo', item.stageNo);
                params.set('periodTotal', item.stageTotal);
                params.set('periodName', item.stageName || '');
            }
            bankPaymentWindow = window.open('unified-payment-bank.html?' + params.toString(), 'uppBankPayment');
            if (!bankPaymentWindow) return false;
            if (typeof bankPaymentWindow.focus === 'function') bankPaymentWindow.focus();
            return true;
        }

        function confirmCheckout() {
            if (!state.paymentMethod) {
                state.error = '请选择支付方式。';
                render();
                return;
            }
            if (state.paymentMethod === 'online') {
                var channel = getOnlineChannel();
                if (!channel) {
                    state.error = '请选择线上支付渠道。';
                    render();
                    return;
                }
                if (channel.mode === 'web' && !openBankPaymentPage(state.item)) {
                    state.error = '浏览器阻止了网银支付页面，请允许弹窗后重试。';
                    render();
                    return;
                }
                state.onlineStage = 'paying';
                state.onlineStatus = 'PAYING';
                state.error = '';
                render();
                if (channel.mode === 'scan') scheduleOnlineQuery();
                return;
            }
            if (!state.voucherName) {
                state.error = '请上传支付凭证。';
                render();
                return;
            }
            var item = state.item;
            var callbacks = state.callbacks;
            close('offline-submitted');
            if (callbacks.onOfflineSubmitted) callbacks.onOfflineSubmitted(item);
        }

        function completeOnlinePayment(status, item) {
            var success = status === 'PAY_SUCCESS';
            state.onlineStage = success ? 'success' : 'failed';
            state.onlineStatus = status;
            if (success) {
                state.channelOrderNo = 'UPP' + state.outTradeNo.replace(/\D/g, '').slice(-18);
                state.paidAt = formatDateTime(new Date());
            }
            if (success && !state.successNotified) {
                state.successNotified = true;
                if (state.callbacks.onOnlineSuccess) state.callbacks.onOnlineSuccess(item);
            }
            render();
        }

        function queryOnlinePayment() {
            var item = state.item;
            if (!item || state.onlineStage !== 'paying') return;
            window.clearTimeout(paymentQueryTimer);
            state.onlineStage = 'querying';
            state.onlineQueryCount += 1;
            render();
            paymentResultTimer = window.setTimeout(function () {
                var failedSample = item.orderNo.slice(-1) === '9' && state.onlineQueryCount === 1;
                completeOnlinePayment(failedSample ? 'PAY_FAIL' : 'PAY_SUCCESS', item);
            }, 3000);
        }

        function scheduleOnlineQuery() {
            window.clearTimeout(paymentQueryTimer);
            paymentQueryTimer = window.setTimeout(function () {
                if (state.item && state.onlineStage === 'paying') queryOnlinePayment();
            }, 12000);
        }

        function receiveBankPaymentResult(payload) {
            var item = state.item;
            if (!item || !payload || (payload.outTradeNo || payload.orderNo) !== state.outTradeNo) return;
            if (payload.status !== 'PAY_SUCCESS' && payload.status !== 'PAY_FAIL') return;
            if (state.onlineStage === 'success') return;
            if (state.onlineStage === 'failed' && payload.status === 'PAY_FAIL') return;
            window.clearTimeout(paymentQueryTimer);
            window.clearTimeout(paymentResultTimer);
            state.onlineStage = 'querying';
            state.onlineStatus = 'PAYING';
            render();
            paymentResultTimer = window.setTimeout(function () {
                completeOnlinePayment(payload.status, item);
            }, 1500);
        }

        function readStoredBankPaymentResult() {
            var item = state.item;
            if (!item) return;
            var key = 'upp-payment-result:' + state.outTradeNo;
            try {
                if (!window.localStorage) return;
                var stored = window.localStorage.getItem(key);
                if (!stored) return;
                window.localStorage.removeItem(key);
                receiveBankPaymentResult(JSON.parse(stored));
            } catch (error) {
                return;
            }
        }

        function retryOnlinePayment() {
            window.clearTimeout(paymentQueryTimer);
            var channel = getOnlineChannel();
            state.retryCount += 1;
            state.outTradeNo = buildOutTradeNo(state.item, state.retryCount);
            state.channelOrderNo = '';
            state.paidAt = '';
            state.onlineStage = channel && channel.mode === 'scan' ? 'paying' : 'select';
            state.onlineStatus = '';
            state.error = '';
            render();
            if (state.onlineStage === 'paying') scheduleOnlineQuery();
        }

        function changeOnlinePayment() {
            window.clearTimeout(paymentQueryTimer);
            state.onlineChannel = '';
            state.onlineStage = 'select';
            state.onlineStatus = '';
            state.error = '';
            render();
        }

        function finishCheckout() {
            var item = state.item;
            var callbacks = state.callbacks;
            close('done');
            if (callbacks.onDone) callbacks.onDone(item);
        }

        function bindEvents() {
            host.querySelectorAll('[data-checkout-close]').forEach(function (button) {
                button.addEventListener('click', function () { close('close'); });
            });

            var mask = host.querySelector('[data-checkout-mask]');
            if (mask) {
                mask.addEventListener('click', function (event) {
                    if (event.target === mask) close('mask');
                });
            }

            host.querySelectorAll('[data-checkout-method]').forEach(function (button) {
                button.addEventListener('click', function () {
                    window.clearTimeout(paymentQueryTimer);
                    state.paymentMethod = this.dataset.checkoutMethod;
                    state.onlineStage = 'select';
                    state.onlineStatus = '';
                    state.onlineQueryCount = 0;
                    state.error = '';
                    render();
                });
            });

            host.querySelectorAll('[data-online-channel]').forEach(function (button) {
                button.addEventListener('click', function () {
                    window.clearTimeout(paymentQueryTimer);
                    state.onlineChannel = this.dataset.onlineChannel;
                    var channel = getOnlineChannel();
                    state.onlineStage = channel && channel.mode === 'scan' ? 'paying' : 'select';
                    state.onlineStatus = '';
                    state.error = '';
                    render();
                    if (state.onlineStage === 'paying') scheduleOnlineQuery();
                });
            });

            var bankSelect = host.querySelector('[data-online-bank]');
            if (bankSelect) bankSelect.addEventListener('change', function () { state.bankCode = this.value; });

            var cardTypeSelect = host.querySelector('[data-online-card-type]');
            if (cardTypeSelect) cardTypeSelect.addEventListener('change', function () { state.cardType = this.value; });

            host.querySelectorAll('[data-online-change]').forEach(function (button) {
                button.addEventListener('click', changeOnlinePayment);
            });

            host.querySelectorAll('[data-online-retry]').forEach(function (button) {
                button.addEventListener('click', retryOnlinePayment);
            });

            var done = host.querySelector('[data-checkout-done]');
            if (done) done.addEventListener('click', finishCheckout);

            var voucherInput = host.querySelector('[data-checkout-voucher]');
            if (voucherInput) {
                voucherInput.addEventListener('change', function () {
                    var file = this.files && this.files[0];
                    if (!file) return;
                    if (file.size > 2 * 1024 * 1024) {
                        state.voucherName = '';
                        state.error = '支付凭证不能超过 2MB。';
                    } else {
                        state.voucherName = file.name;
                        state.error = '';
                    }
                    render();
                });
            }

            var confirm = host.querySelector('[data-checkout-confirm]');
            if (confirm) confirm.addEventListener('click', confirmCheckout);
        }

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && state.item) close('escape');
        });

        window.addEventListener('message', function (event) {
            if (event.origin && event.origin !== 'null' && event.origin !== window.location.origin) return;
            if (!event.data || event.data.type !== 'upp-payment-result') return;
            receiveBankPaymentResult(event.data);
        });

        window.addEventListener('storage', function (event) {
            if (!event.key || event.key.indexOf('upp-payment-result:') !== 0 || !event.newValue) return;
            try {
                receiveBankPaymentResult(JSON.parse(event.newValue));
            } catch (error) {
                return;
            }
        });

        window.addEventListener('focus', readStoredBankPaymentResult);

        return {
            open: function (item, callbacks) {
                state.item = item;
                state.callbacks = callbacks || {};
                state.paymentMethod = '';
                state.onlineChannel = '';
                state.onlineStage = 'select';
                state.onlineStatus = '';
                state.onlineQueryCount = 0;
                state.bankCode = 'CMB';
                state.cardType = '001';
                state.voucherName = '';
                state.error = '';
                state.successNotified = false;
                state.retryCount = 0;
                state.outTradeNo = item.outTradeNo || buildOutTradeNo(item, 0);
                state.channelOrderNo = item.channelOrderNo || '';
                state.paidAt = item.paidAt || '';
                render();
            },
            close: close
        };
    }

    window.BuyerPaymentCheckout = {
        create: createCheckout
    };
})();
