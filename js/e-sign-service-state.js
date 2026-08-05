(function () {
    if (window.ESignServiceState) return;

    var STORAGE_KEY = 'DataElementsESignService:v1';
    var DEFAULT_STATE = {
        status: 'syncing_company',
        companyId: '',
        companyName: '中国电子云',
        creditCode: '91440300731109149K',
        adminName: '企业经办人',
        certificationStatus: 'not_started',
        authorizationStatus: 'not_started',
        failureReason: '',
        lastSyncAt: '--'
    };

    var STATUS_META = {
        syncing_company: {
            label: '主体同步中',
            tone: 'processing',
            title: '正在同步法大大企业主体',
            description: '本平台已自动调用法大大创建企业主体，无需在此重复提交企业资料。',
            action: '同步中',
            actionType: 'wait'
        },
        sync_failed: {
            label: '同步异常',
            tone: 'danger',
            title: '法大大企业主体同步异常',
            description: '平台将自动重试创建企业主体，请刷新查看最新同步结果。',
            action: '刷新状态',
            actionType: 'refresh'
        },
        pending_verification: {
            label: '待企业认证',
            tone: 'warning',
            title: '法大大企业主体已创建',
            description: '请进入法大大完成企业认证；认证结果由法大大回调或状态查询同步至本平台。',
            action: '进入法大大',
            actionType: 'verify'
        },
        verifying: {
            label: '认证中',
            tone: 'processing',
            title: '企业实名认证处理中',
            description: '法大大正在处理认证资料，纸质审核或标准认证方案可能需要一定时间。',
            action: '进入法大大',
            actionType: 'verify'
        },
        pending_authorization: {
            label: '待认证授权',
            tone: 'warning',
            title: '企业实名认证待完成授权',
            description: '法大大返回待授权，请由法定代表人或企业负责人完成实名认证授权。',
            action: '进入法大大',
            actionType: 'authorize'
        },
        active: {
            label: '服务可用',
            tone: 'success',
            title: '电子签章服务可用',
            description: '法大大企业认证已通过；印章、模板及具体用印授权均在法大大平台维护。',
            action: '进入法大大',
            actionType: 'manage'
        },
        verification_failed: {
            label: '认证失败',
            tone: 'danger',
            title: '企业实名认证未通过',
            description: '请查看失败原因并重新提交实名认证资料。',
            action: '进入法大大',
            actionType: 'verify'
        },
        authorization_failed: {
            label: '认证授权失败',
            tone: 'danger',
            title: '企业实名认证授权未完成',
            description: '请核对法定代表人或企业负责人身份后重新完成认证授权。',
            action: '进入法大大',
            actionType: 'authorize'
        },
        expired: {
            label: '认证失效',
            tone: 'danger',
            title: '企业实名认证已失效',
            description: '电子签章能力已暂停，请重新完成企业实名认证。',
            action: '进入法大大',
            actionType: 'verify'
        }
    };

    function nowText() {
        return new Date().toLocaleString('zh-CN', { hour12: false });
    }

    function normalize(input) {
        var state = Object.assign({}, DEFAULT_STATE, input || {});
        if (state.status === 'not_opened') state.status = 'syncing_company';
        if (!STATUS_META[state.status]) state.status = 'syncing_company';
        if (state.status === 'pending_authorization') {
            state.certificationStatus = 'pending_authorization';
            state.authorizationStatus = 'pending';
        } else if (state.status === 'authorization_failed') {
            state.certificationStatus = 'authorization_failed';
            state.authorizationStatus = 'failed';
        } else if (state.status === 'active') {
            state.certificationStatus = 'verified';
        }
        return state;
    }

    function read() {
        try {
            return normalize(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null'));
        } catch (error) {
            return normalize();
        }
    }

    function emit(state) {
        window.dispatchEvent(new CustomEvent('esignservicechange', { detail: state }));
    }

    function write(patch) {
        var next = normalize(Object.assign({}, read(), patch || {}));
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch (error) {
            // localStorage不可用时仍更新当前页面状态。
        }
        emit(next);
        return next;
    }

    function isReady(state) {
        var current = normalize(state || read());
        return current.status === 'active'
            && current.certificationStatus === 'verified';
    }

    function getMeta(state) {
        var current = normalize(state || read());
        return Object.assign({}, STATUS_META[current.status], { state: current });
    }

    function completeCompanySync() {
        return write({
            status: 'pending_verification',
            companyId: read().companyId || ('FDD-COMP-' + Date.now()),
            certificationStatus: 'unverified',
            authorizationStatus: 'not_started',
            failureReason: '',
            lastSyncAt: nowText()
        });
    }

    function markCompanySyncFailed(reason) {
        return write({
            status: 'sync_failed',
            companyId: '',
            certificationStatus: 'not_started',
            authorizationStatus: 'not_started',
            failureReason: reason || '法大大企业主体创建失败，平台正在自动重试。',
            lastSyncAt: nowText()
        });
    }

    function markVerificationSubmitted() {
        return write({
            status: 'verifying',
            certificationStatus: 'verifying',
            authorizationStatus: 'not_started',
            failureReason: '',
            lastSyncAt: nowText()
        });
    }

    function markVerificationApproved() {
        return write({
            status: 'pending_authorization',
            certificationStatus: 'pending_authorization',
            authorizationStatus: 'pending',
            failureReason: '',
            lastSyncAt: nowText()
        });
    }

    function markCertificationAuthorized() {
        return write({
            status: 'active',
            certificationStatus: 'verified',
            authorizationStatus: 'authorized',
            failureReason: '',
            lastSyncAt: nowText()
        });
    }

    function refresh() {
        var current = read();
        if (current.status === 'syncing_company' || current.status === 'sync_failed') return completeCompanySync();
        if (current.status === 'verifying') return markVerificationApproved();
        return write({ lastSyncAt: nowText() });
    }

    function openFadada(scene) {
        var state = read();
        var params = new URLSearchParams();
        params.set('scene', scene || 'manage');
        params.set('companyName', state.companyName);
        params.set('creditCode', state.creditCode);
        params.set('companyId', state.companyId || '--');
        return window.open('fadada-sign-demo.html?' + params.toString(), '_blank', 'noopener');
    }

    window.addEventListener('storage', function (event) {
        if (event.key === STORAGE_KEY) emit(read());
    });

    window.ESignServiceState = {
        storageKey: STORAGE_KEY,
        get: read,
        set: write,
        getMeta: getMeta,
        isReady: isReady,
        completeCompanySync: completeCompanySync,
        startOpen: completeCompanySync,
        markCompanySyncFailed: markCompanySyncFailed,
        markVerificationSubmitted: markVerificationSubmitted,
        markVerificationApproved: markVerificationApproved,
        markCertificationAuthorized: markCertificationAuthorized,
        markAuthorized: markCertificationAuthorized,
        refresh: refresh,
        openFadada: openFadada
    };
})();
