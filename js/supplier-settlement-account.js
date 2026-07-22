(function () {
    'use strict';

    var ICONS = {
        arrow: '<span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>',
        bank: '<span class="material-symbols-outlined" aria-hidden="true">account_balance</span>',
        check: '<span class="material-symbols-outlined" aria-hidden="true">check</span>',
        clock: '<span class="material-symbols-outlined" aria-hidden="true">schedule</span>',
        close: '<span class="material-symbols-outlined" aria-hidden="true">close</span>',
        edit: '<span class="material-symbols-outlined" aria-hidden="true">edit</span>',
        file: '<span class="material-symbols-outlined" aria-hidden="true">description</span>',
        info: '<span class="material-symbols-outlined" aria-hidden="true">info</span>',
        lock: '<span class="material-symbols-outlined" aria-hidden="true">lock</span>',
        eye: '<span class="material-symbols-outlined" aria-hidden="true">visibility</span>',
        eyeOff: '<span class="material-symbols-outlined" aria-hidden="true">visibility_off</span>',
        shield: '<span class="material-symbols-outlined" aria-hidden="true">verified_user</span>',
        upload: '<span class="material-symbols-outlined" aria-hidden="true">upload</span>',
        warning: '<span class="material-symbols-outlined" aria-hidden="true">warning</span>'
    };

    var validStates = ['unopened', 'form', 'reviewing', 'rejected', 'approved'];
    var params = new URLSearchParams(window.location.search || '');
    if (params.get('menu') !== 'settlement-account') return;

    var panel;
    var pageTitle;
    var state = validStates.indexOf(params.get('settlementState')) >= 0 ? params.get('settlementState') : 'unopened';
    var validApplicationModes = ['open', 'change', 'correction'];
    var applicationMode = validApplicationModes.indexOf(params.get('settlementMode')) >= 0 ? params.get('settlementMode') : 'open';
    var detailOpen = true;
    var sensitiveVisibility = {
        bankAccount: false,
        contactPhone: false,
        legalIdCard: false
    };
    var toastText = '';
    var fieldErrors = {};
    var agreementChecked = true;
    var applicationData = {
        outApplyNo: 'LGDJ20260721000128',
        changeApplyNo: 'BG20260722000036',
        merchantId: 'MER2026072100986'
    };
    var currentAccountData = {
        settleType: '0',
        settleName: '深圳市龙岗数智科技有限公司',
        settleCardNo: '622848005942',
        bankName: '中国农业银行',
        bankBranch: '中国农业银行深圳龙岗支行',
        alliedBankCode: '103584000015',
        province: '广东省',
        city: '深圳市',
        settleMode: '2'
    };
    var formData = {
        settleType: '0',
        settleName: '深圳市龙岗数智科技有限公司',
        settleCardNo: '44050101000012345',
        bankName: '中国农业银行',
        bankBranch: '中国农业银行深圳龙岗支行',
        alliedBankCode: '103584000015',
        province: '广东省',
        city: '深圳市',
        settleMode: '2',
        bankMobilePhone: '13809523501',
        settleLegalName: '王晓梅',
        idCardNo: '440307198806182426',
        settleIDEffectTime: '2020-06-18',
        settleIDValidTime: '2040-06-18',
        contactName: '陈晓琳',
        contactPhone: '13809523501',
        contactEmail: 'finance@lgdata.cn'
    };
    var uploadedFiles = {
        licence: '基本存款账户信息.pdf',
        bankCard: '法人银行卡正面.png',
        idFace: '结算授权人身份证人像面.jpg',
        idNational: '结算授权人身份证国徽面.jpg',
        authorization: '结算账户授权书.pdf'
    };

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
        });
    }

    function icon(name) {
        return ICONS[name] || '';
    }

    function updateUrl(nextState) {
        var nextParams = new URLSearchParams(window.location.search || '');
        nextParams.set('menu', 'settlement-account');
        if (nextState === 'unopened') nextParams.delete('settlementState');
        else nextParams.set('settlementState', nextState);
        if (applicationMode === 'open') nextParams.delete('settlementMode');
        else nextParams.set('settlementMode', applicationMode);
        nextParams.delete('profitsharingState');
        window.history.replaceState({}, '', window.location.pathname + '?' + nextParams.toString());
    }

    function setState(nextState) {
        if (validStates.indexOf(nextState) < 0) return;
        state = nextState;
        fieldErrors = {};
        detailOpen = true;
        updateUrl(nextState);
        render();
    }

    function showToast(message) {
        toastText = message;
        render();
        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(function () {
            toastText = '';
            render();
        }, 2600);
    }

    function renderButton(label, type, action, iconName, extra) {
        return '<button class="settlement-btn ' + (type || 'secondary') + '" type="button" data-settlement-action="' + action + '"' + (extra || '') + '>'
            + icon(iconName) + '<span>' + label + '</span></button>';
    }

    function renderStatusTag(label, type) {
        return '<span class="settlement-status ' + type + '"><i></i>' + label + '</span>';
    }

    function renderDemoSwitcher() {
        var states = [
            ['reviewing', '审核中', 'clock'],
            ['approved', '审核通过', 'check'],
            ['rejected', '审核退回', 'warning']
        ];
        return ''
            + '<div class="settlement-demo-bar" aria-label="原型状态切换">'
            +   '<div class="settlement-demo-label"><span>原型状态演示</span><small>点击切换审核结果页面</small></div>'
            +   '<div class="settlement-demo-actions">'
            +       states.map(function (item) {
                        return '<button class="settlement-demo-btn' + (state === item[0] ? ' active' : '') + '" type="button" data-demo-state="' + item[0] + '">' + icon(item[2]) + '<span>' + item[1] + '</span></button>';
                    }).join('')
            +   '</div>'
            + '</div>';
    }

    function renderUnopened() {
        return ''
            + '<div class="settlement-account-page state-unopened">'
            +   '<section class="settlement-hero">'
            +       '<div class="settlement-hero-icon">' + icon('bank') + '</div>'
            +       '<div class="settlement-hero-main">'
            +           '<div class="settlement-eyebrow">线上收款能力</div>'
            +           '<h2>开通收款结算账户</h2>'
            +           '<p>提交企业主体和银行结算资料，审核通过后即可接收产品订单款项。</p>'
            +           '<div class="settlement-hero-meta">' + renderStatusTag('未开通', 'neutral') + '<span>预计审核时长：1—3 个工作日</span></div>'
            +       '</div>'
            +       '<div class="settlement-hero-action">' + renderButton('开通线上收款', 'primary', 'start-apply', 'arrow') + '</div>'
            +   '</section>'
            +   '<section class="settlement-card settlement-process-card">'
            +       '<div class="settlement-section-head"><div><h3>开通流程</h3><p>企业资料已完成认证，补充结算账户后即可提交审核。</p></div></div>'
            +       '<div class="settlement-process">'
            +           '<div class="settlement-process-item"><span>1</span><div><strong>确认主体资料</strong><p>核对企业认证信息与经办人联系方式</p></div></div>'
            +           '<i></i>'
            +           '<div class="settlement-process-item"><span>2</span><div><strong>填写结算账户</strong><p>登记开户银行、账号及结算证明材料</p></div></div>'
            +           '<i></i>'
            +           '<div class="settlement-process-item"><span>3</span><div><strong>完成进件审核</strong><p>审核通过后取得商户编号并开通收款</p></div></div>'
            +       '</div>'
            +   '</section>'
            +   '<section class="settlement-card settlement-requirements">'
            +       '<div class="settlement-section-head"><div><h3>申请前请准备</h3><p>系统将根据结算账户类型显示所需材料。</p></div></div>'
            +       '<div class="settlement-requirement-grid">'
            +           '<div><span>' + icon('shield') + '</span><strong>企业主体已认证</strong><p>主体名称应与平台企业认证信息保持一致</p></div>'
            +           '<div><span>' + icon('bank') + '</span><strong>有效银行账户</strong><p>优先使用企业同名对公结算账户</p></div>'
            +           '<div><span>' + icon('file') + '</span><strong>银行证明材料</strong><p>准备开户许可证、银行回单或印鉴卡</p></div>'
            +       '</div>'
            +   '</section>'
            + '</div>';
    }

    function renderStepBar() {
        var steps = applicationMode === 'change'
            ? ['核对当前账户', '填写变更资料', '确认提交']
            : ['主体资料', '结算账户', '材料确认'];
        return ''
            + '<div class="settlement-stepbar">'
            +   '<div class="active"><span>1</span><strong>' + steps[0] + '</strong></div><i></i>'
            +   '<div class="active"><span>2</span><strong>' + steps[1] + '</strong></div><i></i>'
            +   '<div class="active"><span>3</span><strong>' + steps[2] + '</strong></div>'
            + '</div>';
    }

    function renderReadOnlyInfo() {
        var rows = [
            ['商户主体类型', '企业'],
            ['企业名称', '深圳市龙岗数智科技有限公司'],
            ['统一社会信用代码', '91440300MA5F8K6N2P'],
            ['营业执照有效期', '2021-06-18 至长期'],
            ['法定代表人', '李明远'],
            ['法人身份证号', '4403**********2418'],
            ['法人证件有效期', '2020-05-12 至 2040-05-12'],
            ['注册地区', '广东省／深圳市'],
            ['注册地址', '广东省深圳市龙岗区坂田街道天安云谷产业园'],
            ['经营范围', '数据产品开发、数据治理、数据技术服务及信息咨询'],
            ['主体证明材料', '<span class="settlement-verified">' + icon('check') + ' 已同步营业执照及法人证件</span>'],
            ['企业认证状态', '<span class="settlement-verified">' + icon('check') + ' 已认证</span>']
        ];
        return rows.map(function (row) {
            return '<div class="settlement-readonly-item"><span>' + row[0] + '</span><strong>' + row[1] + '</strong></div>';
        }).join('');
    }

    function renderApplicationInfo() {
        if (applicationMode !== 'open') {
            return ''
                + '<div class="settlement-application-info">'
                +   '<div><span>商户编号</span><strong>' + escapeHtml(applicationData.merchantId) + '</strong><small>用于识别当前收款商户</small></div>'
                +   '<div><span>' + (applicationMode === 'change' ? '变更申请编号' : '原申请编号') + '</span><strong>' + escapeHtml(applicationMode === 'change' ? applicationData.changeApplyNo : applicationData.outApplyNo) + '</strong><small>用于查询本次申请进度</small></div>'
                + '</div>';
        }
        return ''
            + '<div class="settlement-application-info">'
            +   '<div><span>申请编号</span><strong>' + applicationData.outApplyNo + '</strong><small>提交后可通过该编号查询进度</small></div>'
            +   '<div><span>申请业务</span><strong>开通线上收款</strong><small>审核通过后可接收订单款项</small></div>'
            + '</div>';
    }

    function renderCurrentAccountSummary() {
        if (applicationMode !== 'change') return '';
        return ''
            + '<section class="settlement-card settlement-form-card settlement-current-summary-card">'
            +   '<div class="settlement-section-head"><div><h3>当前生效结算账户</h3><p>新账户审核通过前，产品订单仍结算至当前账户。</p></div><span class="settlement-account-badge">' + icon('shield') + ' 正常使用</span></div>'
            +   '<div class="settlement-readonly-grid">'
            +       '<div class="settlement-readonly-item"><span>开户银行</span><strong>' + escapeHtml(currentAccountData.bankName) + '</strong></div>'
            +       '<div class="settlement-readonly-item"><span>开户名称</span><strong>' + escapeHtml(currentAccountData.settleName) + '</strong></div>'
            +       '<div class="settlement-readonly-item"><span>银行账号</span><strong>' + escapeHtml(maskBankAccount(currentAccountData.settleCardNo)) + '</strong></div>'
            +       '<div class="settlement-readonly-item"><span>账户类型</span><strong>对公同名账户</strong></div>'
            +       '<div class="settlement-readonly-item"><span>开户支行</span><strong>' + escapeHtml(currentAccountData.bankBranch) + '</strong></div>'
            +       '<div class="settlement-readonly-item"><span>结算方式</span><strong>T+1 结算</strong></div>'
            +   '</div>'
            + '</section>';
    }

    function renderField(label, key, placeholder, required, type, attrs) {
        var value = escapeHtml(formData[key]);
        var error = fieldErrors[key] || '';
        return ''
            + '<label class="settlement-field' + (error ? ' has-error' : '') + '">'
            +   '<span>' + (required ? '<em>*</em>' : '') + label + '</span>'
            +   '<input type="' + (type || 'text') + '" value="' + value + '" placeholder="' + placeholder + '" data-settlement-field="' + key + '" ' + (error ? 'aria-invalid="true" ' : '') + (attrs || '') + '>'
            +   (error ? '<small class="settlement-field-error" data-error-for="' + key + '">' + escapeHtml(error) + '</small>' : '')
            + '</label>';
    }

    function renderSelect(label, key, required, options) {
        var error = fieldErrors[key] || '';
        return ''
            + '<label class="settlement-field' + (error ? ' has-error' : '') + '">'
            +   '<span>' + (required ? '<em>*</em>' : '') + label + '</span>'
            +   '<select data-settlement-field="' + key + '"' + (error ? ' aria-invalid="true"' : '') + '>'
            +       options.map(function (option) {
                        return '<option value="' + option[0] + '"' + (String(formData[key]) === String(option[0]) ? ' selected' : '') + '>' + option[1] + '</option>';
                    }).join('')
            +   '</select>'
            +   (error ? '<small class="settlement-field-error" data-error-for="' + key + '">' + escapeHtml(error) + '</small>' : '')
            + '</label>';
    }

    function renderUpload(key, title, hint, required) {
        var fileName = uploadedFiles[key];
        var errorKey = 'file:' + key;
        var error = fieldErrors[errorKey] || '';
        return ''
            + '<div class="settlement-upload-item' + (fileName ? ' has-file' : '') + (error ? ' has-error' : '') + '">'
            +   '<div class="settlement-upload-copy"><strong>' + (required ? '<em>*</em>' : '') + title + '</strong><p>' + hint + '</p></div>'
            +   '<div class="settlement-upload-action">'
            +   (fileName
                ? '<div class="settlement-uploaded-file">' + icon('file') + '<span title="' + escapeHtml(fileName) + '">' + escapeHtml(fileName) + '</span><button type="button" data-remove-file="' + key + '" aria-label="移除文件">' + icon('close') + '<span>移除</span></button></div>'
                : '<label class="settlement-upload-control">' + icon('upload') + '<span>上传材料</span><input type="file" accept=".jpg,.jpeg,.png,.pdf" data-upload-file="' + key + '"></label>')
            +   (error ? '<small class="settlement-field-error upload-error" data-error-for="' + errorKey + '">' + escapeHtml(error) + '</small>' : '')
            +   '</div>'
            + '</div>';
    }

    function renderAccountFields() {
        var privateAccount = formData.settleType === '1' || formData.settleType === '2';
        var authorized = formData.settleType === '2' || formData.settleType === '3';
        return ''
            + '<div class="settlement-form-grid">'
            +   renderSelect('结算账户类型', 'settleType', true, [
                    ['0', '对公同名账户'],
                    ['1', '法人个人账户'],
                    ['2', '授权人个人账户'],
                    ['3', '对公非同名账户']
                ])
            +   renderField('开户名称', 'settleName', '请输入银行账户开户名称', true)
            +   renderField('银行账号', 'settleCardNo', '请输入银行账号', true, 'text', 'inputmode="numeric" maxlength="24"')
            +   renderField('开户银行', 'bankName', '例如：中国农业银行', true)
            +   renderField('开户支行', 'bankBranch', '请输入完整支行名称', !privateAccount)
            +   renderField('联行号', 'alliedBankCode', '请输入 12 位联行号', !privateAccount, 'text', 'inputmode="numeric" maxlength="12"')
            +   renderSelect('开户省份', 'province', !privateAccount, [['广东省', '广东省'], ['北京市', '北京市'], ['上海市', '上海市'], ['浙江省', '浙江省']])
            +   renderSelect('开户城市', 'city', !privateAccount, [['深圳市', '深圳市'], ['广州市', '广州市'], ['东莞市', '东莞市'], ['佛山市', '佛山市']])
            +   renderSelect('结算方式', 'settleMode', false, [['2', 'T+1 结算'], ['0', 'D+1 结算']])
            +   (privateAccount ? renderField('银行预留手机号', 'bankMobilePhone', '请输入银行预留手机号', true, 'tel', 'maxlength="11"') : '')
            + '</div>'
            + (authorized
                ? '<div class="settlement-subheading">结算授权人信息</div><div class="settlement-form-grid">'
                    + (applicationMode !== 'open'
                        ? renderField('结算人身份证号', 'idCardNo', '请输入结算人身份证号', true, 'text', 'maxlength="18"')
                        : renderField('授权人姓名', 'settleLegalName', '请输入授权人姓名', true)
                            + renderField('授权人身份证号', 'idCardNo', '请输入授权人身份证号', true, 'text', 'maxlength="18"')
                            + renderField('证件生效日期', 'settleIDEffectTime', '请选择证件生效日期', true, 'date')
                            + renderField('证件失效日期', 'settleIDValidTime', '请选择证件失效日期', true, 'date'))
                    + '</div>'
                : (formData.settleType === '1'
                    ? '<div class="settlement-sync-note">' + icon('shield') + '<div><strong>法人结算信息已同步</strong><p>结算人姓名、身份证号及证件有效期将复用企业认证中的法人资料。</p></div></div>'
                    : ''))
            + '<div class="settlement-inline-tip">' + icon('info') + '<span>'
            +   (authorized ? '非同名或授权人账户需补充结算授权书，审核通过后方可生效。' : '建议优先使用企业同名对公账户，开户名称需与企业认证主体一致。')
            + '</span></div>';
    }

    function renderMaterials() {
        var privateAccount = formData.settleType === '1' || formData.settleType === '2';
        var authorized = formData.settleType === '2' || formData.settleType === '3';
        var content = privateAccount
            ? renderUpload('bankCard', '银行卡正面', '支持 JPG、JPEG、PNG，普通文件不超过 2MB', true)
            : renderUpload('licence', '银行账户证明', '可上传开户许可证、银行回单或账户证明，普通文件不超过 2MB', true);
        if (authorized) {
            if (applicationMode === 'open') {
                content += renderUpload('idFace', '授权人身份证人像面', '请上传清晰完整的证件图片，普通文件不超过 2MB', true);
                content += renderUpload('idNational', '授权人身份证国徽面', '请上传清晰完整的证件图片，普通文件不超过 2MB', true);
            }
            content += renderUpload('authorization', '结算授权书', '请上传加盖企业公章的授权书，普通文件不超过 2MB', true);
        }
        return content;
    }

    function renderForm() {
        var modifying = applicationMode !== 'open';
        var changeMode = applicationMode === 'change';
        var formTitle = changeMode ? '结算账户变更申请' : (modifying ? '修改进件审核资料' : '进件申请信息');
        var formDescription = changeMode
            ? '请核对当前商户信息并填写新的结算账户资料。'
            : (modifying ? '根据退回原因修改原申请资料，重新提交后继续审核流程。' : '请核对企业信息并补充结算账户与证明材料。');
        var noticeTitle = changeMode ? '当前结算账户不会立即停用' : (modifying ? '已加载原申请资料' : '企业主体信息已通过认证');
        var noticeText = changeMode
            ? '请在下方填写新的结算账户资料。新账户审核通过后再替换当前账户，审核期间不影响线上收款。'
            : (modifying ? '请根据审核退回原因修改对应信息，未涉及的资料可保持不变。' : '以下主体信息由企业认证资料同步，如需修改请前往账号中心处理。');
        var submitLabel = changeMode ? '提交变更审核' : (modifying ? '重新提交审核' : '提交审核');
        var agreementText = changeMode
            ? '我已核对新结算账户资料，并同意提交变更审核'
            : (modifying ? '我已核对修改后的资料，并同意重新提交审核' : '我已核对以上资料，并同意提交商户开通审核');
        return ''
            + '<div class="settlement-account-page state-form">'
            +   renderStepBar()
            +   '<div class="settlement-form-scroll">'
            +       '<section class="settlement-card settlement-application-card">'
            +           '<div class="settlement-section-head"><div><h3>' + formTitle + '</h3><p>' + formDescription + '</p></div></div>'
            +           renderApplicationInfo()
            +       '</section>'
            +       renderCurrentAccountSummary()
            +       '<div class="settlement-form-notice">' + icon('shield') + '<div><strong>' + noticeTitle + '</strong><p>' + noticeText + '</p></div></div>'
            +       '<section class="settlement-card settlement-form-card">'
            +           '<div class="settlement-section-head"><div><h3><span>1</span>商户主体信息</h3><p>' + (changeMode ? '主体信息仅供核对，确保本次变更对应正确商户。' : '企业认证信息由账号中心同步，如需修改请先更新企业认证资料。') + '</p></div></div>'
            +           '<div class="settlement-readonly-grid">' + renderReadOnlyInfo() + '</div>'
            +           '<div class="settlement-subheading">' + (changeMode ? '本次变更经办人' : '业务联系人') + '</div>'
            +           '<div class="settlement-form-grid compact">'
            +               renderField('联系人', 'contactName', '请输入联系人姓名', true)
            +               renderField('联系电话', 'contactPhone', '请输入联系人手机号', true, 'tel', 'maxlength="11"')
            +               renderField('联系邮箱', 'contactEmail', '请输入联系邮箱', false, 'email')
            +           '</div>'
            +       '</section>'
            +       '<section class="settlement-card settlement-form-card">'
            +           '<div class="settlement-section-head"><div><h3><span>2</span>' + (changeMode ? '新结算账户信息' : '结算账户信息') + '</h3><p>请根据账户类型填写完整、准确的银行结算信息。</p></div></div>'
            +           renderAccountFields()
            +       '</section>'
            +       '<section class="settlement-card settlement-form-card">'
            +           '<div class="settlement-section-head"><div><h3><span>3</span>证明材料</h3><p>材料仅用于商户进件审核和结算账户核验。</p></div></div>'
            +           '<div class="settlement-upload-list">' + renderMaterials() + '</div>'
            +       '</section>'
            +   '</div>'
            +   '<footer class="settlement-form-footer">'
            +       '<div class="settlement-agreement-wrap' + (fieldErrors.agreement ? ' has-error' : '') + '"><label class="settlement-agreement"><input type="checkbox" data-settlement-agreement' + (agreementChecked ? ' checked' : '') + '><span>' + agreementText + '</span></label>'
            +       (fieldErrors.agreement ? '<small class="settlement-field-error" data-error-for="agreement">' + escapeHtml(fieldErrors.agreement) + '</small>' : '') + '</div>'
            +       '<div>' + renderButton('取消', 'secondary', 'cancel-apply', 'close') + renderButton(submitLabel, 'primary', 'submit-apply', 'check') + '</div>'
            +   '</footer>'
            + '</div>';
    }

    function maskMobile(value) {
        var text = String(value || '');
        return text.length >= 7 ? text.slice(0, 3) + '****' + text.slice(-4) : '****';
    }

    function maskIdentity(value) {
        var text = String(value || '');
        return text.length >= 10 ? text.slice(0, 6) + '********' + text.slice(-4) : '****';
    }

    function maskBankAccount(value) {
        var text = String(value || '').replace(/\s/g, '');
        return text.length >= 8 ? text.slice(0, 4) + ' **** **** ' + text.slice(-4) : '****';
    }

    function renderDetailItem(label, value, sensitive) {
        if (!sensitive) {
            return '<div class="settlement-detail-item"><span>' + label + '</span><strong>' + escapeHtml(value) + '</strong></div>';
        }
        var visible = !!sensitiveVisibility[sensitive.key];
        var displayValue = visible ? sensitive.full : sensitive.masked;
        return ''
            + '<div class="settlement-detail-item sensitive">'
            +   '<span>' + label + '</span>'
            +   '<div class="settlement-sensitive-value">'
            +       '<strong data-sensitive-value>' + escapeHtml(displayValue) + '</strong>'
            +       '<button type="button" data-sensitive-toggle="' + sensitive.key + '" data-sensitive-label="' + label + '" data-sensitive-full="' + escapeHtml(sensitive.full) + '" data-sensitive-masked="' + escapeHtml(sensitive.masked) + '" aria-label="' + (visible ? '隐藏' : '查看') + label + '" aria-pressed="' + visible + '" title="' + (visible ? '隐藏' : '查看') + label + '">' + icon(visible ? 'eyeOff' : 'eye') + '<span>' + (visible ? '隐藏' : '查看') + '</span></button>'
            +   '</div>'
            + '</div>';
    }

    function renderDetailGroup(title, description, items) {
        return ''
            + '<section class="settlement-detail-group">'
            +   '<div class="settlement-detail-group-head"><h4>' + title + '</h4><p>' + description + '</p></div>'
            +   '<div class="settlement-detail-grid">' + items.join('') + '</div>'
            + '</section>';
    }

    function getApplicationStatusText() {
        if (applicationMode === 'change') {
            if (state === 'approved') return '变更完成';
            if (state === 'rejected') return '变更审核退回';
            return '变更审核中';
        }
        if (state === 'approved') return '审核通过／已开通';
        if (state === 'rejected') return '审核退回';
        return applicationMode === 'correction' ? '重新审核中' : '审核中';
    }

    function renderApplicationDetail() {
        if (!detailOpen) return '';
        var settlementTypeLabels = {
            '0': '对公同名账户',
            '1': '法人个人账户',
            '2': '授权人个人账户',
            '3': '对公非同名账户'
        };
        var settleModeLabels = { '0': 'D+1 结算', '2': 'T+1 结算' };
        var privateAccount = formData.settleType === '1' || formData.settleType === '2';
        var authorizedAccount = formData.settleType === '2' || formData.settleType === '3';
        var applicationItems = [
            renderDetailItem(applicationMode === 'change' ? '变更申请编号' : '申请编号', applicationMode === 'change' ? applicationData.changeApplyNo : applicationData.outApplyNo),
            renderDetailItem('提交时间', '2026-07-21 10:26:18'),
            renderDetailItem('当前状态', getApplicationStatusText()),
            renderDetailItem('申请业务', applicationMode === 'change' ? '结算账户变更' : '线上收款商户进件'),
            renderDetailItem('业务联系人', formData.contactName),
            renderDetailItem('联系电话', '', { key: 'contactPhone', full: formData.contactPhone, masked: maskMobile(formData.contactPhone) }),
            renderDetailItem('联系邮箱', formData.contactEmail)
        ];
        var subjectItems = [
            renderDetailItem('商户主体类型', '企业'),
            renderDetailItem('企业名称', '深圳市龙岗数智科技有限公司'),
            renderDetailItem('统一社会信用代码', '91440300MA5F8K6N2P'),
            renderDetailItem('营业执照有效期', '2021-06-18 至长期'),
            renderDetailItem('法定代表人', '李明远'),
            renderDetailItem('法人身份证号', '', { key: 'legalIdCard', full: '440307197905122418', masked: maskIdentity('440307197905122418') }),
            renderDetailItem('法人证件有效期', '2020-05-12 至 2040-05-12'),
            renderDetailItem('注册地区', '广东省／深圳市'),
            renderDetailItem('注册地址', '广东省深圳市龙岗区坂田街道天安云谷产业园'),
            renderDetailItem('经营范围', '数据产品开发、数据治理、数据技术服务及信息咨询'),
            renderDetailItem('主体证明材料', '营业执照及法人证件已同步'),
            renderDetailItem('企业认证状态', '已认证')
        ];
        var settlementItems = [
            renderDetailItem('结算账户类型', settlementTypeLabels[formData.settleType] || '对公同名账户'),
            renderDetailItem('开户名称', formData.settleName),
            renderDetailItem('银行账号', '', { key: 'bankAccount', full: formData.settleCardNo, masked: maskBankAccount(formData.settleCardNo) }),
            renderDetailItem('开户银行', formData.bankName),
            renderDetailItem('开户支行', formData.bankBranch),
            renderDetailItem('联行号', formData.alliedBankCode),
            renderDetailItem('开户省份', formData.province),
            renderDetailItem('开户城市', formData.city),
            renderDetailItem('结算方式', settleModeLabels[formData.settleMode] || 'T+1 结算'),
            renderDetailItem('账户核验', '银行账户证明已提交')
        ];
        var materialItems = [
            renderDetailItem('企业主体材料', '营业执照及法人证件已同步'),
            renderDetailItem(privateAccount ? '银行卡正面' : '银行账户证明', (privateAccount ? uploadedFiles.bankCard : uploadedFiles.licence) || '未提交'),
            renderDetailItem('其他结算材料', authorizedAccount ? (uploadedFiles.authorization || '未提交结算授权书') : '当前账户类型无需补充授权材料')
        ];
        return ''
            + '<section class="settlement-card settlement-detail-card">'
            +   '<div class="settlement-section-head"><div><h3>申请资料摘要</h3><p>展示本次提交的业务资料，敏感信息默认脱敏，可逐项查看。</p></div><span class="settlement-account-badge">' + icon('lock') + ' 隐私保护</span></div>'
            +   '<div class="settlement-detail-groups">'
            +       renderDetailGroup('申请信息', '申请流水与经办联系方式', applicationItems)
            +       renderDetailGroup('商户主体', '企业认证和业务联系人信息', subjectItems)
            +       renderDetailGroup('结算账户', '银行账户和结算信息', settlementItems)
            +       renderDetailGroup('提交材料', '本次申请已提交的审核材料', materialItems)
            +   '</div>'
            + '</section>';
    }

    function renderTimeline(activeStep, rejected) {
        var items = applicationMode === 'change'
            ? [
                ['提交变更资料', '2026-07-22 10:08:36'],
                [rejected ? '变更审核退回' : '平台变更审核', rejected ? '2026-07-22 16:42:06' : '预计 1 个工作日内完成'],
                ['新账户渠道报备', '平台审核通过后自动发起'],
                ['结算账户变更完成', '新账户审核通过后自动生效']
            ]
            : [
                ['提交进件资料', '2026-07-21 10:26:18'],
                [rejected ? '平台审核退回' : '平台资料审核', rejected ? '2026-07-21 16:42:06' : '预计 1 个工作日内完成'],
                ['支付渠道报备', '平台审核通过后自动发起'],
                ['开通线上收款', '取得商户编号后自动开通']
            ];
        return '<div class="settlement-timeline">' + items.map(function (item, index) {
            var className = index < activeStep ? 'done' : (index === activeStep ? (rejected ? 'rejected' : 'active') : 'pending');
            var connectorClass = '';
            if (index < items.length - 1) {
                if (rejected && index === activeStep - 1) connectorClass = ' connector-rejected';
                else if (index < activeStep) connectorClass = ' connector-done';
            }
            return '<div class="' + className + connectorClass + '"><span class="settlement-timeline-node">' + (className === 'done' ? icon('check') : (className === 'rejected' ? icon('close') : index + 1)) + '</span><div><strong>' + item[0] + '</strong><p>' + item[1] + '</p></div></div>';
        }).join('') + '</div>';
    }

    function renderReviewing() {
        var changeMode = applicationMode === 'change';
        var reviewingTitle = changeMode ? '结算账户变更审核中' : (applicationMode === 'correction' ? '修改资料重新审核中' : '资料审核中');
        var reviewingText = changeMode
            ? '变更资料已提交审核。审核通过前当前结算账户继续正常使用。'
            : '申请已提交审核。审核结果将通过站内消息通知，无需重复提交。';
        return ''
            + '<div class="settlement-account-page state-status">'
            +   '<section class="settlement-status-hero reviewing">'
            +       '<div class="settlement-status-icon"><span></span>' + icon('clock') + '</div>'
            +       '<div><div class="settlement-eyebrow">' + (changeMode ? '结算账户变更' : '商户进件') + '</div><h2>' + reviewingTitle + '</h2><p>' + reviewingText + '</p>' + renderStatusTag('审核中', 'warning') + '</div>'
            +   '</section>'
            +   '<section class="settlement-card settlement-progress-card">'
            +       '<div class="settlement-section-head"><div><h3>' + (changeMode ? '变更进度' : '开通进度') + '</h3><p>系统将根据审核结果自动更新进度。</p></div></div>'
            +       renderTimeline(1, false)
            +   '</section>'
            +   '<div class="settlement-detail-toggle">' + renderButton(detailOpen ? (changeMode ? '收起变更资料' : '收起申请资料') : (changeMode ? '查看变更资料' : '查看申请资料'), 'text', 'toggle-detail', 'file') + '</div>'
            +   renderApplicationDetail()
            + '</div>';
    }

    function renderRejected() {
        var changeMode = applicationMode === 'change';
        return ''
            + '<div class="settlement-account-page state-status">'
            +   '<section class="settlement-status-hero rejected">'
            +       '<div class="settlement-status-icon">' + icon('warning') + '</div>'
            +       '<div><div class="settlement-eyebrow">' + (changeMode ? '结算账户变更' : '商户进件') + '</div><h2>' + (changeMode ? '结算账户变更未通过' : '审核未通过') + '</h2><p>' + (changeMode ? '当前账户继续正常使用，请根据退回原因修改变更资料后重新提交。' : '请根据退回原因修正资料后重新提交，原申请记录将保留。') + '</p>' + renderStatusTag('审核退回', 'danger') + '</div>'
            +       '<div class="settlement-status-action">' + renderButton('修改并重新提交', 'primary', 'edit-application', 'edit') + '</div>'
            +   '</section>'
            +   '<section class="settlement-reject-card">'
            +       '<div class="settlement-reject-title">' + icon('warning') + '<div><strong>退回原因</strong><p>2026-07-21 16:42:06</p></div></div>'
            +       '<ol><li>开户名称与企业认证主体名称不完全一致，请核对后修改。</li><li>银行账户证明图片边缘缺失，请重新上传完整、清晰的材料。</li></ol>'
            +   '</section>'
            +   '<section class="settlement-card settlement-progress-card">'
            +       '<div class="settlement-section-head"><div><h3>审核进度</h3><p>资料修正后将重新进入平台审核。</p></div></div>'
            +       renderTimeline(1, true)
            +   '</section>'
            +   '<div class="settlement-detail-toggle">' + renderButton(detailOpen ? '收起原提交资料' : '查看原提交资料', 'text', 'toggle-detail', 'file') + '</div>'
            +   renderApplicationDetail()
            + '</div>';
    }

    function renderReceiverCard() {
        return ''
            + '<section class="settlement-card profitsharing-card">'
            +   '<div class="settlement-section-head"><div><h3>分账接收信息</h3><p>运营方统一收款后，按合同约定将供方应收金额分账至当前结算账户。</p></div><div class="profitsharing-card-action">' + renderStatusTag('审核成功', 'success') + renderButton('同步状态', 'secondary', 'sync-receiver', 'check') + '</div></div>'
            +   '<div class="profitsharing-summary"><span>' + icon('check') + '</span><p>当前商户已作为运营方的标准分账接收方，可参与第三方产品和服务订单分账，无需单独开通分账能力。</p></div>'
            +   '<div class="profitsharing-capability-grid">'
            +       '<div><span>分账接收方编号</span><strong>RCV-202607-00986</strong></div>'
            +       '<div><span>接收方类型</span><strong>标准商户</strong></div>'
            +       '<div><span>接收方名称</span><strong>深圳市龙岗数智科技有限公司</strong></div>'
            +       '<div><span>分账收款账户</span><strong>中国农业银行 · 4405 **** 12345</strong></div>'
            +       '<div><span>审核结果</span><strong class="success-text">资料审核通过</strong></div>'
            +       '<div><span>生效时间</span><strong>2026-07-22 09:18:36</strong></div>'
            +   '</div>'
            + '</section>';
    }

    function renderApproved() {
        var changeMode = applicationMode === 'change';
        var displayAccount = changeMode ? formData : currentAccountData;
        var typeLabels = { '0': '对公同名账户', '1': '法人个人账户', '2': '授权人个人账户', '3': '对公非同名账户' };
        return ''
            + '<div class="settlement-account-page state-approved">'
            +   '<section class="settlement-status-hero approved">'
            +       '<div class="settlement-status-icon">' + icon('check') + '</div>'
            +       '<div><div class="settlement-eyebrow">' + (changeMode ? '结算账户变更' : '线上收款能力') + '</div><h2>' + (changeMode ? '结算账户变更已完成' : '收款结算账户已开通') + '</h2><p>' + (changeMode ? '新结算账户已完成审核和渠道报备，后续订单款项将结算至新账户。' : '商户进件与支付渠道报备均已完成，产品订单可正常发起线上支付。') + '</p>' + renderStatusTag('正常使用', 'success') + '</div>'
            +       '<div class="settlement-status-action">' + renderButton('申请变更', 'secondary', 'request-change', 'edit') + '</div>'
            +   '</section>'
            +   '<section class="settlement-card settlement-progress-card">'
            +       '<div class="settlement-section-head"><div><h3>' + (changeMode ? '变更进度' : '开通进度') + '</h3><p>' + (changeMode ? '结算账户变更审核、渠道报备及账户切换均已完成。' : '商户进件、支付渠道报备及线上收款能力均已完成。') + '</p></div></div>'
            +       renderTimeline(4, false)
            +   '</section>'
            +   '<section class="settlement-card settlement-account-card">'
            +       '<div class="settlement-section-head"><div><h3>当前结算账户</h3><p>结算账户信息已核验并加密保存。</p></div><span class="settlement-account-badge">' + icon('shield') + ' 已核验</span></div>'
            +       '<div class="settlement-bank-card">'
            +           '<div class="settlement-bank-card-head"><span>' + icon('bank') + '</span><div><strong>' + escapeHtml(displayAccount.bankName) + '</strong><p>' + escapeHtml(displayAccount.bankBranch) + '</p></div></div>'
            +           '<div class="settlement-bank-number">' + escapeHtml(maskBankAccount(displayAccount.settleCardNo)) + '</div>'
            +           '<div class="settlement-bank-card-foot"><span>' + escapeHtml(typeLabels[displayAccount.settleType] || '结算账户') + '</span><strong>' + escapeHtml(displayAccount.settleName) + '</strong></div>'
            +       '</div>'
            +       '<div class="settlement-approved-detail">'
            +           '<div><span>商户编号</span><strong>MER2026072100986</strong></div>'
            +           '<div><span>结算方式</span><strong>T+1 结算</strong></div>'
            +           '<div><span>开通时间</span><strong>2026-07-22 09:18:36</strong></div>'
            +           '<div><span>账户状态</span><strong class="success-text">正常</strong></div>'
            +       '</div>'
            +   '</section>'
            +   renderReceiverCard()
            +   '<section class="settlement-security-note">' + icon('lock') + '<div><strong>账户安全说明</strong><p>平台仅展示脱敏账户信息。申请更换结算账户需重新提交材料并完成审核，新账户审核通过前继续使用当前账户。</p></div></section>'
            +   '<section class="settlement-card settlement-record-card">'
            +       '<div class="settlement-section-head"><div><h3>最近审核记录</h3><p>商户进件与结算账户审核留痕。</p></div></div>'
            +       '<div class="settlement-record-row"><span class="record-check">' + icon('check') + '</span><div><strong>' + (changeMode ? '结算账户变更成功' : '线上收款账户开通成功') + '</strong><p>' + (changeMode ? '新结算账户已审核并生效' : '线上收款能力已审核并生效') + '</p></div><time>2026-07-22 09:18:36</time></div>'
            +       '<div class="settlement-record-row"><span class="record-check">' + icon('check') + '</span><div><strong>提交商户进件申请</strong><p>申请编号：' + escapeHtml(applicationData.outApplyNo) + '</p></div><time>2026-07-21 10:26:18</time></div>'
            +   '</section>'
            + '</div>';
    }

    function renderToast() {
        return toastText ? '<div class="settlement-toast" role="status">' + icon('check') + '<span>' + escapeHtml(toastText) + '</span></div>' : '';
    }

    function render() {
        if (!panel) return;
        var changeForm = applicationMode === 'change' && state === 'form';
        pageTitle.textContent = changeForm ? '变更结算账户' : '收款结算账户';
        document.title = '供方中心 - ' + (changeForm ? '变更结算账户' : '收款结算账户');
        panel.className = 'wb-consult-shell is-settlement-account';
        var content = renderUnopened();
        if (state === 'form') content = renderForm();
        else if (state === 'reviewing') content = renderReviewing();
        else if (state === 'rejected') content = renderRejected();
        else if (state === 'approved') content = renderApproved();
        panel.innerHTML = renderDemoSwitcher() + content + renderToast();
        bindEvents();
    }

    function collectFormData() {
        panel.querySelectorAll('[data-settlement-field]').forEach(function (field) {
            formData[field.dataset.settlementField] = field.value.trim();
        });
        var agreement = panel.querySelector('[data-settlement-agreement]');
        if (agreement) agreementChecked = agreement.checked;
    }

    function validateForm() {
        fieldErrors = {};
        collectFormData();
        var requiredFields = {
            contactName: '请输入业务联系人姓名。',
            contactPhone: '请输入业务联系人手机号。',
            settleName: '请输入银行账户开户名称。',
            settleCardNo: '请输入银行账号。',
            bankName: '请输入开户银行。'
        };
        Object.keys(requiredFields).forEach(function (key) {
            if (!formData[key]) fieldErrors[key] = requiredFields[key];
        });
        if (formData.contactPhone && !/^1\d{10}$/.test(formData.contactPhone)) fieldErrors.contactPhone = '请输入正确的 11 位手机号。';
        if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) fieldErrors.contactEmail = '请输入正确的联系邮箱。';
        if (formData.settleCardNo && !/^\d{8,24}$/.test(formData.settleCardNo.replace(/\s/g, ''))) fieldErrors.settleCardNo = '银行账号应为 8—24 位数字。';
        var privateAccount = formData.settleType === '1' || formData.settleType === '2';
        var authorized = formData.settleType === '2' || formData.settleType === '3';
        if (!privateAccount) {
            if (!formData.bankBranch) fieldErrors.bankBranch = '请输入完整的开户支行名称。';
            if (!formData.province) fieldErrors.province = '请选择开户省份。';
            if (!formData.city) fieldErrors.city = '请选择开户城市。';
            if (!formData.alliedBankCode) fieldErrors.alliedBankCode = '请输入开户银行联行号。';
            else if (!/^\d{12}$/.test(formData.alliedBankCode)) fieldErrors.alliedBankCode = '联行号应为 12 位数字。';
        }
        if (privateAccount) {
            if (!formData.bankMobilePhone) fieldErrors.bankMobilePhone = '请输入银行预留手机号。';
            else if (!/^1\d{10}$/.test(formData.bankMobilePhone)) fieldErrors.bankMobilePhone = '请输入正确的银行预留手机号。';
        }
        if (authorized) {
            if (!formData.idCardNo) fieldErrors.idCardNo = '请输入结算授权人身份证号。';
            else if (!/^\d{17}[\dXx]$/.test(formData.idCardNo)) fieldErrors.idCardNo = '请输入正确的 18 位身份证号。';
            if (applicationMode === 'open') {
                if (!formData.settleLegalName) fieldErrors.settleLegalName = '请输入结算授权人姓名。';
                if (!formData.settleIDEffectTime) fieldErrors.settleIDEffectTime = '请选择证件生效日期。';
                if (!formData.settleIDValidTime) fieldErrors.settleIDValidTime = '请选择证件失效日期。';
                if (formData.settleIDEffectTime && formData.settleIDValidTime && formData.settleIDValidTime < formData.settleIDEffectTime) {
                    fieldErrors.settleIDValidTime = '证件失效日期不能早于生效日期。';
                }
            }
        }
        if (privateAccount && !uploadedFiles.bankCard) fieldErrors['file:bankCard'] = '请上传银行卡正面材料。';
        if (!privateAccount && !uploadedFiles.licence) fieldErrors['file:licence'] = '请上传银行账户证明材料。';
        if (authorized && applicationMode === 'open' && !uploadedFiles.idFace) fieldErrors['file:idFace'] = '请上传授权人身份证人像面。';
        if (authorized && applicationMode === 'open' && !uploadedFiles.idNational) fieldErrors['file:idNational'] = '请上传授权人身份证国徽面。';
        if (authorized && !uploadedFiles.authorization) fieldErrors['file:authorization'] = '请上传结算授权书。';
        if (!agreementChecked) {
            fieldErrors.agreement = applicationMode === 'change'
                ? '请确认新结算账户资料并同意提交变更审核。'
                : '请确认资料并同意提交进件审核。';
        }
        return Object.keys(fieldErrors).length === 0;
    }

    function locateFirstFormError() {
        window.requestAnimationFrame(function () {
            var error = panel.querySelector('.settlement-field-error');
            if (!error) return;
            var target = error.closest('.settlement-field, .settlement-upload-item, .settlement-agreement-wrap') || error;
            var scrollContainer = panel.querySelector('.settlement-form-scroll');
            if (scrollContainer && scrollContainer.contains(target)) {
                var scrollRect = scrollContainer.getBoundingClientRect();
                var targetRect = target.getBoundingClientRect();
                var targetTop = scrollContainer.scrollTop
                    + targetRect.top
                    - scrollRect.top
                    - Math.max(24, (scrollContainer.clientHeight - targetRect.height) / 2);
                scrollContainer.scrollTo({
                    top: Math.max(0, targetTop),
                    behavior: 'smooth'
                });
            }
            var controls = target.querySelectorAll('input, select, textarea, button');
            var focusControl = Array.prototype.find.call(controls, function (control) {
                return !control.disabled && control.type !== 'file' && control.offsetParent !== null;
            });
            if (focusControl) focusControl.focus({ preventScroll: true });
        });
    }

    function prefillRejectedApplication() {
        formData.settleType = '0';
        formData.settleName = '深圳市龙岗数智科技有限公司';
        formData.settleCardNo = '622848005942';
        formData.bankName = '中国农业银行';
        formData.bankBranch = '深圳龙岗支行';
        formData.alliedBankCode = '103584000015';
        formData.province = '广东省';
        formData.city = '深圳市';
        formData.settleMode = '2';
        uploadedFiles.licence = '银行账户证明_补充材料.pdf';
    }

    function prefillChangeApplication() {
        Object.keys(currentAccountData).forEach(function (key) {
            formData[key] = currentAccountData[key];
        });
        uploadedFiles.licence = '基本存款账户信息.pdf';
        agreementChecked = true;
        fieldErrors = {};
    }

    function bindEvents() {
        panel.querySelectorAll('[data-demo-state]').forEach(function (button) {
            button.addEventListener('click', function () {
                setState(this.dataset.demoState);
            });
        });

        panel.querySelectorAll('[data-sensitive-toggle]').forEach(function (button) {
            button.addEventListener('click', function () {
                var key = this.dataset.sensitiveToggle;
                var visible = !sensitiveVisibility[key];
                sensitiveVisibility[key] = visible;
                var wrapper = this.closest('.settlement-sensitive-value');
                var value = wrapper ? wrapper.querySelector('[data-sensitive-value]') : null;
                if (value) value.textContent = visible ? this.dataset.sensitiveFull : this.dataset.sensitiveMasked;
                this.innerHTML = icon(visible ? 'eyeOff' : 'eye') + '<span>' + (visible ? '隐藏' : '查看') + '</span>';
                this.setAttribute('aria-label', (visible ? '隐藏' : '查看') + this.dataset.sensitiveLabel);
                this.setAttribute('aria-pressed', String(visible));
                this.title = (visible ? '隐藏' : '查看') + this.dataset.sensitiveLabel;
            });
        });

        panel.querySelectorAll('[data-settlement-action]').forEach(function (button) {
            button.addEventListener('click', function () {
                var action = this.dataset.settlementAction;
                if (action === 'start-apply') {
                    applicationMode = 'open';
                    setState('form');
                }
                else if (action === 'cancel-apply') {
                    if (applicationMode === 'change') {
                        applicationMode = 'open';
                        setState('approved');
                    } else if (applicationMode === 'correction') {
                        setState('rejected');
                    } else {
                        setState('unopened');
                    }
                }
                else if (action === 'edit-application') {
                    if (applicationMode !== 'change') {
                        applicationMode = 'correction';
                        prefillRejectedApplication();
                    }
                    setState('form');
                }
                else if (action === 'submit-apply') {
                    if (!validateForm()) {
                        render();
                        locateFirstFormError();
                        return;
                    }
                    setState('reviewing');
                    showToast(applicationMode === 'change' ? '结算账户变更申请已提交。' : (applicationMode === 'correction' ? '修改资料已重新提交审核。' : '商户进件申请已提交。'));
                } else if (action === 'toggle-detail') {
                    detailOpen = !detailOpen;
                    render();
                } else if (action === 'request-change') {
                    applicationMode = 'change';
                    prefillChangeApplication();
                    setState('form');
                } else if (action === 'sync-receiver') {
                    showToast('分账接收方审核状态已同步。');
                }
            });
        });

        panel.querySelectorAll('[data-settlement-field]').forEach(function (field) {
            field.addEventListener('input', function () {
                var key = this.dataset.settlementField;
                if (!fieldErrors[key]) return;
                delete fieldErrors[key];
                this.removeAttribute('aria-invalid');
                var wrapper = this.closest('.settlement-field');
                if (wrapper) {
                    wrapper.classList.remove('has-error');
                    var error = wrapper.querySelector('.settlement-field-error');
                    if (error) error.remove();
                }
            });
            field.addEventListener('change', function () {
                collectFormData();
                delete fieldErrors[this.dataset.settlementField];
                if (this.dataset.settlementField === 'settleType') {
                    fieldErrors = {};
                    render();
                }
            });
        });

        var agreement = panel.querySelector('[data-settlement-agreement]');
        if (agreement) {
            agreement.addEventListener('change', function () {
                agreementChecked = this.checked;
                if (!fieldErrors.agreement) return;
                delete fieldErrors.agreement;
                var wrapper = this.closest('.settlement-agreement-wrap');
                if (wrapper) {
                    wrapper.classList.remove('has-error');
                    var error = wrapper.querySelector('.settlement-field-error');
                    if (error) error.remove();
                }
            });
        }

        panel.querySelectorAll('[data-upload-file]').forEach(function (input) {
            input.addEventListener('change', function () {
                var file = this.files && this.files[0];
                if (!file) return;
                if (file.size > 2 * 1024 * 1024) {
                    fieldErrors['file:' + this.dataset.uploadFile] = '普通文件不能超过 2MB。';
                    collectFormData();
                    render();
                    return;
                }
                uploadedFiles[this.dataset.uploadFile] = file.name;
                delete fieldErrors['file:' + this.dataset.uploadFile];
                collectFormData();
                render();
            });
        });

        panel.querySelectorAll('[data-remove-file]').forEach(function (button) {
            button.addEventListener('click', function () {
                uploadedFiles[this.dataset.removeFile] = '';
                collectFormData();
                render();
            });
        });
    }

    function init() {
        panel = document.querySelector('[data-consult-panel]');
        pageTitle = document.querySelector('[data-center-title]');
        if (!panel || !pageTitle) return;
        render();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
