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
        callbacks[channelId] = typeof options.onResult === 'function' ? options.onResult : null;
        var child = window.open('fadada-sign-demo.html?' + params.toString(), '_blank');
        if (!child) delete callbacks[channelId];
        return { channelId: channelId, windowRef: child };
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
