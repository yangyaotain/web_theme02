(function () {
    var params = new URLSearchParams(window.location.search || '');
    var orderNo = params.get('orderNo') || '2026070111185071000000101148100';
    var productName = params.get('productName') || '龙岗企业经营画像数据集';
    var merchantName = params.get('merchantName') || '深圳市龙岗区数据服务中心';
    var amount = params.get('amount') || '100.00元';
    var bankName = params.get('bankName') || '招商银行';
    var cardType = params.get('cardType') === '002' ? '信用卡' : '借记卡';
    var processingTimer = null;
    var countdownTimer = null;

    function setText(selector, value) {
        var element = document.querySelector(selector);
        if (element) element.textContent = value;
    }

    function setView(name) {
        document.querySelectorAll('[data-gateway-view]').forEach(function (view) {
            view.hidden = view.dataset.gatewayView !== name;
        });
        var targetStep = name === 'confirm' ? 1 : (name === 'processing' ? 2 : 3);
        document.querySelectorAll('[data-step]').forEach(function (step) {
            var index = Number(step.dataset.step);
            step.classList.toggle('active', index === targetStep);
            step.classList.toggle('completed', index < targetStep);
        });
    }

    function getAttemptCount() {
        try {
            return Number(window.sessionStorage.getItem('upp-bank-attempt:' + orderNo)) || 0;
        } catch (error) {
            return 0;
        }
    }

    function setAttemptCount(value) {
        try {
            window.sessionStorage.setItem('upp-bank-attempt:' + orderNo, String(value));
        } catch (error) {
            return;
        }
    }

    function publishResult(status) {
        var payload = {
            type: 'upp-payment-result',
            status: status,
            orderNo: orderNo,
            timestamp: Date.now()
        };
        try {
            window.localStorage.setItem('upp-payment-result:' + orderNo, JSON.stringify(payload));
        } catch (error) {
            // 跨页消息仍可在本地存储不可用时传递结果。
        }
        if (window.opener && !window.opener.closed) {
            var targetOrigin = window.location.origin && window.location.origin !== 'null' ? window.location.origin : '*';
            window.opener.postMessage(payload, targetOrigin);
        }
    }

    function returnToMerchant() {
        window.clearInterval(countdownTimer);
        if (window.opener && !window.opener.closed) {
            window.opener.focus();
            window.close();
            return;
        }
        if (window.history.length > 1) window.history.back();
    }

    function startSuccessCountdown() {
        var remaining = 5;
        var countdown = document.querySelector('[data-result-countdown]');
        function update() {
            if (countdown) countdown.textContent = remaining + '秒后自动返回商户页面';
            if (remaining <= 0) {
                returnToMerchant();
                return;
            }
            remaining -= 1;
        }
        update();
        countdownTimer = window.setInterval(update, 1000);
    }

    function renderResult(status) {
        var success = status === 'PAY_SUCCESS';
        var resultView = document.querySelector('[data-gateway-view="result"]');
        if (resultView) resultView.classList.toggle('failed', !success);
        setText('[data-result-title]', success ? '支付成功' : '支付未完成');
        setText('[data-result-description]', success ? '支付结果已同步至商户订单。' : '银行返回支付失败，本次订单未扣款。');
        setText('[data-result-amount]', amount);
        var retry = document.querySelector('[data-retry-payment]');
        if (retry) retry.hidden = success;
        setView('result');
        publishResult(success ? 'PAY_SUCCESS' : 'PAY_FAIL');
        if (success) startSuccessCountdown();
    }

    function confirmPayment() {
        window.clearTimeout(processingTimer);
        window.clearInterval(countdownTimer);
        setView('processing');
        var attempt = getAttemptCount() + 1;
        setAttemptCount(attempt);
        processingTimer = window.setTimeout(function () {
            var failedSample = orderNo.slice(-1) === '9' && attempt === 1;
            renderResult(failedSample ? 'PAY_FAIL' : 'PAY_SUCCESS');
        }, 2600);
    }

    setText('[data-merchant-name]', merchantName);
    setText('[data-payment-amount]', amount);
    setText('[data-product-name]', productName);
    setText('[data-order-no]', orderNo);
    setText('[data-bank-name]', bankName);
    setText('[data-card-type]', cardType);
    setText('[data-choice-bank]', bankName + ' · ' + cardType);
    document.title = bankName + '网银支付 - 统一支付平台';

    var confirmButton = document.querySelector('[data-confirm-payment]');
    if (confirmButton) confirmButton.addEventListener('click', confirmPayment);

    document.querySelectorAll('[data-return-merchant]').forEach(function (button) {
        button.addEventListener('click', returnToMerchant);
    });

    var retryButton = document.querySelector('[data-retry-payment]');
    if (retryButton) retryButton.addEventListener('click', confirmPayment);

    setView('confirm');
})();
