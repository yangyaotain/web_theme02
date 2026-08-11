(function () {
    if (window.FadadaSignDemo) return;

    var callbacks = {};

    function createChannelId() {
        return 'FDD-CHANNEL-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
    }

    function open(options) {
        options = options || {};
        var channelId = createChannelId();
        var params = new URLSearchParams();
        params.set('scene', 'sign');
        params.set('channelId', channelId);
        params.set('taskId', options.taskId || 'FDD-DEMO-2026070001');
        params.set('contractName', options.contractName || '数据交易三方合同');
        params.set('contractNo', options.contractNo || '--');
        params.set('orderNo', options.orderNo || '--');
        params.set('role', options.role || '签署方');
        params.set('party', options.party || '当前登录企业');
        params.set('node', options.node || '合同签署');
        params.set('businessType', options.businessType || 'product');
        params.set('operationMode', options.operationMode || 'thirdParty');
        params.set('partyTotal', String(options.partyTotal || (options.operationMode === 'self' ? 2 : 3)));
        if (options.sourceMenu) params.set('sourceMenu', options.sourceMenu);
        if (options.returnUrl) params.set('returnUrl', options.returnUrl);
        callbacks[channelId] = typeof options.onResult === 'function' ? options.onResult : null;
        var targetUrl;
        try {
            targetUrl = new URL(options.signUrl || 'fadada-sign-demo.html', window.location.href);
        } catch (error) {
            targetUrl = new URL('fadada-sign-demo.html', window.location.href);
        }
        params.forEach(function (value, key) { targetUrl.searchParams.set(key, value); });
        var child = window.open(targetUrl.toString(), '_blank');
        if (!child) delete callbacks[channelId];
        return { channelId: channelId, windowRef: child, url: targetUrl.toString() };
    }

    window.addEventListener('message', function (event) {
        if (event.origin !== window.location.origin && !(event.origin === 'null' && window.location.origin === 'null')) return;
        var payload = event.data || {};
        if (payload.type !== 'fadada-sign-result' || !payload.channelId) return;
        if (!Object.prototype.hasOwnProperty.call(callbacks, payload.channelId)) return;
        var callback = callbacks[payload.channelId];
        delete callbacks[payload.channelId];
        if (typeof callback === 'function') callback(payload);
    });

    window.FadadaSignDemo = { open: open };
})();
