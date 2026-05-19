/**
 * MessageCenter - 站内消息公共原型组件
 *
 * 负责：
 * 1. 顶部消息铃铛下拉
 * 2. 站内消息页面列表
 * 3. 统一原型消息数据
 */
(function (global) {
    'use strict';

    var MESSAGE_PAGE = 'site-message.html';

    var messages = [
        { id: 20, type: '告警消息', category: 'alert', status: 'unread', title: '业务处理/审核超时告警：用户管理业务开通待审核', content: '站内消息原文：用户【龙岗某科创服务企业】提交的业务开通申请已超过 12 小时未审核，请运营方及时处理。', time: '2026-05-19 10:42:16' },
        { id: 21, type: '告警消息', category: 'alert', status: 'unread', title: '业务处理/审核超时告警：数据资源授权申请待处理', content: '站内消息原文：需求方【龙岗某智能制造企业】提交的【龙岗区企业工商登记数据】授权申请已超过 24 小时未处理，请供方【龙岗数据】及时处理。', time: '2026-05-19 10:37:08' },
        { id: 22, type: '告警消息', category: 'alert', status: 'unread', title: '业务处理/审核超时告警：数据产品购买交易待确认', content: '站内消息原文：需求方【龙岗某智慧园区企业】发起的【城市运行指标分析产品】购买交易已超过 12 小时未确认，请供方【龙岗某数据服务方】尽快确认。', time: '2026-05-19 10:31:42' },
        { id: 23, type: '告警消息', category: 'alert', status: 'unread', title: '业务处理/审核超时告警：数据咨询服务交付待确认', content: '站内消息原文：供方【龙岗某咨询服务方】已提交【企业数据治理与合规咨询服务】交付物，需求方【龙岗某制造企业】超过 24 小时未确认。', time: '2026-05-19 10:26:35' },
        { id: 24, type: '告警消息', category: 'alert', status: 'unread', title: '业务处理/审核超时告警：行业解决方案服务上架待审核', content: '站内消息原文：供方【龙岗某方案服务方】提交的【园区能耗精细化治理方案】服务上架申请已超过 24 小时未审核，请运营方及时处理。', time: '2026-05-19 10:18:57' },
        { id: 25, type: '告警消息', category: 'alert', status: 'unread', title: '运行监控告警：调用失败次数过高', content: '失败信息：5 分钟内【龙岗区企业工商登记数据】接口调用失败 12 次，错误码 HTTP 502；需求方【龙岗某科创服务企业】；供方【龙岗数据】；订单【资源授权订单 ZY-20260519-018】。', time: '2026-05-19 10:12:21' },
        { id: 26, type: '告警消息', category: 'alert', status: 'unread', title: '运行监控告警：连续调用失败', content: '失败信息：10 分钟内连续 3 次调用【公共交通运行监测数据】失败，错误码 AUTH_TOKEN_EXPIRED；需求方【龙岗某交通服务企业】；供方【龙岗数据】；订单【资源授权订单 ZY-20260519-021】。', time: '2026-05-19 10:08:44' },
        { id: 27, type: '告警消息', category: 'alert', status: 'unread', title: '运行监控告警：调用失败率异常', content: '失败信息：10 分钟内【城市运行指标分析产品】调用 86 次，失败 20 次，失败率 23%；需求方【龙岗某智慧园区企业】；供方【龙岗某数据服务方】；订单【产品交易订单 CP-20260519-032】。', time: '2026-05-19 10:03:19' },
        { id: 28, type: '告警消息', category: 'alert', status: 'unread', title: '运行监控告警：响应超时异常', content: '失败信息：【物流订单履约分析产品】P95 响应时间 3620ms，超过 3000ms 阈值；需求方【龙岗某物流企业】；供方【龙岗某数据服务方】；订单【产品交易订单 CP-20260519-041】。', time: '2026-05-19 09:57:33' },
        { id: 29, type: '告警消息', category: 'alert', status: 'unread', title: '运行监控告警：用量突增告警', content: '异常信息：【产业供需匹配数据产品】1 小时调用量升至 864 次，是近 7 日均值 240 次的 3.6 倍；需求方【龙岗某产业服务企业】；供方【龙岗某数据服务方】；订单【产品交易订单 CP-20260519-057】。', time: '2026-05-19 09:51:06' },
        { id: 30, type: '告警消息', category: 'alert', status: 'unread', title: '运行监控告警：用量接近额度', content: '异常信息：【企业经营画像分析产品】订单额度 10000 次，已使用 8200 次，达到 82%；需求方【龙岗某科创服务企业】；供方【龙岗数据】；订单【产品交易订单 CP-20260519-066】。', time: '2026-05-19 09:45:28' },
        { id: 31, type: '告警消息', category: 'alert', status: 'unread', title: '运行监控告警：长时间无调用', content: '异常信息：【园区企业用能统计数据】交付开通后 7 天未产生调用记录；需求方【龙岗某园区运营方】；供方【龙岗数据】；订单【资源授权订单 ZY-20260519-073】。', time: '2026-05-19 09:39:12' },
        { id: 1, type: '待办消息', category: 'todo', status: 'unread', title: '数据咨询服务【企业数据治理与合规咨询服务】【服务上架审批】审核申请', time: '2026-05-18 14:35:21' },
        { id: 2, type: '待办消息', category: 'todo', status: 'unread', title: '数据咨询服务【企业数据资产入表咨询服务】【服务上架审批】审核申请', time: '2026-05-18 14:24:25' },
        { id: 3, type: '待办消息', category: 'todo', status: 'unread', title: '数据咨询服务【企业数据资源托管运营服务】【服务上架审批】审核申请', time: '2026-05-18 14:18:49' },
        { id: 4, type: '待办消息', category: 'todo', status: 'unread', title: '数据咨询服务【企业数据资产融资咨询服务】【服务上架审批】审核申请', time: '2026-05-18 14:16:02' },
        { id: 5, type: '待办消息', category: 'todo', status: 'unread', title: '数据咨询服务【企业数据产品孵化服务】【服务上架审批】审核申请', time: '2026-05-18 11:14:19' },
        { id: 6, type: '待办消息', category: 'todo', status: 'unread', title: '数据咨询服务【数据质量评估与优化咨询服务】【服务上架审批】审核申请', time: '2026-05-18 11:11:49' },
        { id: 7, type: '待办消息', category: 'todo', status: 'unread', title: '数据咨询服务【数据安全合规体系建设咨询服务】【服务上架审批】审核申请', time: '2026-05-18 11:00:29' },
        { id: 8, type: '待办消息', category: 'todo', status: 'unread', title: '数据咨询服务【企业数据战略规划咨询服务】【服务上架审批】审核申请', time: '2026-05-18 10:57:00' },
        { id: 9, type: '待办消息', category: 'todo', status: 'unread', title: '数据资源【龙岗区企业工商登记数据】【资源目录审批】审核申请', time: '2026-05-18 10:54:33' },
        { id: 10, type: '待办消息', category: 'todo', status: 'unread', title: '数据资源【公共交通运行监测数据】【资源目录审批】审核申请', time: '2026-05-18 10:51:16' },
        { id: 11, type: '待办消息', category: 'todo', status: 'unread', title: '数据资源【园区企业用能统计数据】【资源目录审批】审核申请', time: '2026-05-18 10:35:08' },
        { id: 12, type: '待办消息', category: 'todo', status: 'unread', title: '数据资源【政务服务事项办理数据】【资源目录审批】审核申请', time: '2026-05-18 10:18:42' },
        { id: 13, type: '待办消息', category: 'todo', status: 'unread', title: '数据资源【产业链供需协同数据】【资源目录审批】审核申请', time: '2026-05-18 09:58:15' },
        { id: 14, type: '待办消息', category: 'todo', status: 'unread', title: '数据产品【城市运行指标分析产品】【产品上架审批】审核申请', time: '2026-05-18 09:46:38' },
        { id: 15, type: '待办消息', category: 'todo', status: 'unread', title: '数据产品【物流订单履约分析产品】【产品上架审批】审核申请', time: '2026-05-18 09:22:04' },
        { id: 16, type: '待办消息', category: 'todo', status: 'unread', title: '数据产品【企业信用评分数据产品】【产品上架审批】审核申请', time: '2026-05-18 09:05:47' },
        { id: 17, type: '待办消息', category: 'todo', status: 'unread', title: '数据产品【产业供需匹配数据产品】【产品上架审批】审核申请', time: '2026-05-17 18:40:31' },
        { id: 18, type: '待办消息', category: 'todo', status: 'unread', title: '数据产品【区域消费活力分析产品】【产品上架审批】审核申请', time: '2026-05-17 16:27:09' },
        { id: 19, type: '待办消息', category: 'todo', status: 'unread', title: '数据产品【企业经营画像分析产品】【产品上架审批】审核申请', time: '2026-05-17 15:12:56' }
    ];

    function cloneMessages() {
        return messages.map(function (item) {
            return Object.assign({}, item);
        });
    }

    function unreadCount(data) {
        return (data || messages).filter(function (item) {
            return item.status === 'unread';
        }).length;
    }

    function escapeHtml(text) {
        return String(text == null ? '' : text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function ensureStyle(root, id, css) {
        var target = root || document;
        if (target.querySelector && target.querySelector('#' + id)) return;
        var style = document.createElement('style');
        style.id = id;
        style.textContent = css;
        if (target.head) {
            target.head.appendChild(style);
        } else {
            target.appendChild(style);
        }
    }

    var dropdownCss = [
        '.mc-notify-trigger{position:relative;}',
        '.notify-bell .notify-badge,.topbar-notify .topbar-notify-dot{top:-3px!important;right:-5px!important;min-width:17px!important;width:auto!important;height:14px!important;padding:0 4px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;background:#f56c6c!important;color:#fff!important;border:1px solid #fff!important;border-radius:999px!important;font-size:10px!important;font-weight:700!important;line-height:1!important;box-sizing:border-box!important;}',
        '.mc-dropdown{position:absolute;top:calc(100% + 6px);right:0;width:392px;background:#fff;border:1px solid #e4e7ed;border-radius:4px;box-shadow:0 10px 28px rgba(0,0,0,.14);z-index:900;overflow:hidden;opacity:0;visibility:hidden;transform:translateY(-6px);transition:opacity .16s ease,visibility .16s ease,transform .16s ease;color:#303133;text-align:left;}',
        '.mc-dropdown.open{opacity:1;visibility:visible;transform:translateY(0);}',
        '.mc-dropdown::before{content:"";position:absolute;top:-7px;right:18px;border:7px solid transparent;border-top:0;border-bottom-color:#fff;}',
        '.mc-head{height:56px;display:flex;align-items:center;padding:0 20px;border-bottom:1px solid #ebeef5;font-size:16px;font-weight:700;color:#303133;}',
        '.mc-list{max-height:348px;overflow-y:auto;padding:10px 0;}',
        '.mc-list::-webkit-scrollbar{width:6px;}',
        '.mc-list::-webkit-scrollbar-thumb{background:#c0c4cc;border-radius:6px;}',
        '.mc-item{display:block;padding:10px 20px 9px;text-decoration:none;color:inherit;cursor:pointer;}',
        '.mc-item:hover{background:#f5f7fa;}',
        '.mc-item-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:400;color:#303133;line-height:20px;}',
        '.mc-item-title b{font-weight:400;}',
        '.mc-item-time{margin-top:3px;font-size:12px;color:#909399;line-height:18px;}',
        '.mc-foot{height:56px;border-top:1px solid #ebeef5;display:flex;align-items:center;justify-content:center;}',
        '.mc-more{border:0;background:transparent;color:#20A565;font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;}',
        '.mc-more:hover{text-decoration:underline;}',
        '@media(max-width:640px){.mc-dropdown{position:fixed;top:58px;right:12px;left:12px;width:auto;}.mc-dropdown::before{display:none;}}'
    ].join('');

    var pageCss = [
        '.mc-page-shell{padding:0 24px 0;}',
        '.mc-page-title{margin:0 0 24px;font-size:20px;font-weight:700;color:#1f2d3d;}',
        '.mc-page-filter{display:flex;align-items:center;gap:10px;margin-bottom:0;flex-wrap:wrap;}',
        '.mc-status-select,.mc-search{height:32px;border:1px solid #dcdfe6;background:#fff;color:#606266;font-size:13px;font-family:inherit;outline:none;box-sizing:border-box;}',
        '.mc-status-select{width:108px;border-radius:4px;padding:0 30px 0 12px;}',
        '.mc-search-wrap{position:relative;width:218px;}',
        '.mc-search{width:100%;border-radius:4px;padding:0 34px 0 12px;}',
        '.mc-search-icon{position:absolute;right:10px;top:50%;width:15px;height:15px;transform:translateY(-50%);color:#909399;}',
        '.mc-page-tabs{display:inline-flex;border:1px solid #dcdfe6;border-radius:4px;overflow:hidden;background:#fff;}',
        '.mc-page-tab{height:32px;padding:0 16px;border:0;border-right:1px solid #dcdfe6;background:#fff;color:#606266;font-size:13px;font-family:inherit;cursor:pointer;}',
        '.mc-page-tab:last-child{border-right:0;}',
        '.mc-page-tab.active{color:#20A565;background:#f0fdf6;font-weight:600;}',
        '.mc-bulkbar{height:64px;margin-top:0;padding:0 22px;display:flex;align-items:center;gap:10px;background:#f4f7f6;border:1px solid #ebeeed;border-radius:7px 7px 0 0;}',
        '.mc-check{width:14px;height:14px;accent-color:#20A565;cursor:pointer;}',
        '.mc-page-btn{height:32px;padding:0 14px;border:1px solid #dcdfe6;border-radius:4px;background:#fff;color:#606266;font-size:13px;font-family:inherit;cursor:pointer;}',
        '.mc-page-btn:disabled{color:#c0c4cc;background:#fff;cursor:not-allowed;}',
        '.mc-list-table{border-left:1px solid transparent;border-right:1px solid transparent;}',
        '.mc-row{height:56px;display:grid;grid-template-columns:32px 14px minmax(0,1fr) 230px;align-items:center;border-bottom:1px solid #e4e7ed;color:#303133;}',
        '.mc-row:hover{background:#f3fbf5;}',
        '.mc-row-dot{width:6px;height:6px;border-radius:50%;background:#f56c6c;}',
        '.mc-row.read .mc-row-dot{background:transparent;}',
        '.mc-row-title{display:block;width:100%;padding:0;border:0;background:transparent;overflow:hidden;text-align:left;text-overflow:ellipsis;white-space:nowrap;font-size:14px;font-weight:400;font-family:inherit;color:#4b5563;cursor:pointer;}',
        '.mc-row.read .mc-row-title{font-weight:400;color:#606266;}',
        '.mc-row-title:hover,.mc-row.read .mc-row-title:hover{color:#20A565;}',
        '.mc-row-tail{justify-self:end;display:flex;align-items:center;justify-content:flex-end;min-width:0;padding-right:18px;}',
        '.mc-row-time{color:#7f8c8d;font-size:13px;}',
        '.mc-row-actions{display:none;align-items:center;gap:12px;white-space:nowrap;}',
        '.mc-row:hover .mc-row-time{display:none;}',
        '.mc-row:hover .mc-row-actions{display:flex;}',
        '.mc-row-action{padding:0;border:0;background:transparent;color:#20A565;font-size:13px;font-family:inherit;line-height:32px;cursor:pointer;}',
        '.mc-row-action:hover{text-decoration:underline;}',
        '.mc-pagination{height:58px;display:flex;align-items:center;justify-content:flex-end;gap:14px;color:#606266;font-size:13px;}',
        '.mc-page-num{min-width:32px;height:32px;padding:0 10px;border:0;border-radius:6px;background:#fff;color:#606266;font-size:13px;cursor:pointer;}',
        '.mc-page-num.active{background:#20A565;color:#fff;font-weight:700;}',
        '.mc-page-size{height:32px;border:1px solid #dcdfe6;border-radius:4px;background:#fff;color:#606266;padding:0 10px;font-size:13px;}',
        '.mc-empty{height:220px;display:flex;align-items:center;justify-content:center;color:#909399;border-bottom:1px solid #ebeef5;}',
        '.mc-drawer-mask{position:fixed;inset:0;z-index:900;background:rgba(31,45,61,.18);opacity:0;visibility:hidden;transition:opacity .18s ease,visibility .18s ease;}',
        '.mc-drawer-mask.open{opacity:1;visibility:visible;}',
        '.mc-drawer{position:fixed;top:8px;right:8px;bottom:8px;z-index:901;width:min(848px,calc(100vw - 56px));display:flex;flex-direction:column;background:#fff;border-radius:8px;box-shadow:0 12px 40px rgba(0,0,0,.14);transform:translateX(calc(100% + 24px));transition:transform .2s ease;overflow:hidden;}',
        '.mc-drawer.open{transform:translateX(0);}',
        '.mc-drawer-head{height:56px;display:flex;align-items:center;gap:10px;padding:0 24px;border-bottom:1px solid #e4e7ed;color:#1f2d3d;font-size:16px;font-weight:700;}',
        '.mc-drawer-close{width:24px;height:24px;border:0;background:transparent;color:#909399;font-size:24px;line-height:22px;cursor:pointer;}',
        '.mc-drawer-close:hover{color:#303133;}',
        '.mc-drawer-main{flex:1;min-height:0;overflow:auto;}',
        '.mc-drawer-summary{display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:28px;align-items:center;padding:22px 32px 18px;border-bottom:1px solid #e4e7ed;}',
        '.mc-drawer-title{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#1f2d3d;font-size:20px;font-weight:700;line-height:30px;}',
        '.mc-drawer-meta{display:inline-flex;align-items:center;gap:4px;color:#7f8c8d;font-size:14px;line-height:22px;white-space:nowrap;}',
        '.mc-drawer-meta span:first-child{color:#909399;}',
        '.mc-drawer-content{padding:24px 32px;color:#4b5563;font-size:14px;line-height:1.8;}',
        '.mc-drawer-foot{height:64px;display:flex;justify-content:flex-end;align-items:center;gap:12px;padding:0 24px;border-top:1px solid #e4e7ed;background:#fff;}',
        '.mc-drawer-btn{height:32px;padding:0 18px;border:1px solid #dcdfe6;border-radius:4px;background:#fff;color:#606266;font-size:13px;font-family:inherit;cursor:pointer;}',
        '.mc-drawer-btn.primary{background:#20A565;border-color:#20A565;color:#fff;}',
        '.mc-drawer-btn:disabled{color:#c0c4cc;background:#fff;cursor:not-allowed;}',
        '@media(max-width:900px){.mc-row{grid-template-columns:28px 12px minmax(0,1fr) 128px;}.mc-row-actions{gap:8px;}.mc-row-action{font-size:12px;}.mc-drawer{width:calc(100vw - 16px);right:8px;}}'
    ].join('');

    function bindDropdown(options) {
        options = options || {};
        var trigger = options.trigger;
        var root = options.root || document;
        if (!trigger || trigger.__mcDropdownBound) return;
        trigger.__mcDropdownBound = true;
        trigger.classList.add('mc-notify-trigger');
        ensureStyle(root, 'message-center-dropdown-style', dropdownCss);

        var badge = options.badgeSelector ? trigger.querySelector(options.badgeSelector) : null;
        if (!badge) badge = trigger.querySelector('.notify-badge, .topbar-notify-dot');
        if (badge) {
            badge.textContent = unreadCount(messages);
            badge.setAttribute('aria-label', unreadCount(messages) + '条未读消息');
        }

        var panel = document.createElement('div');
        panel.className = 'mc-dropdown';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', '未读消息');
        panel.innerHTML = dropdownHtml();
        trigger.appendChild(panel);

        trigger.addEventListener('click', function (event) {
            event.stopPropagation();
            panel.classList.toggle('open');
        });

        panel.addEventListener('click', function (event) {
            event.stopPropagation();
            if (event.target.closest('[data-message-more]')) {
                global.location.href = MESSAGE_PAGE;
            }
        });

        document.addEventListener('click', function () {
            panel.classList.remove('open');
        });
    }

    function dropdownMessages() {
        var unreadMessages = messages.filter(function (item) {
            return item.status === 'unread';
        });
        var alertMessages = unreadMessages.filter(function (item) {
            return item.category === 'alert';
        });
        var todoMessages = unreadMessages.filter(function (item) {
            return item.category === 'todo';
        });
        var mixed = [];
        var maxRows = 6;
        var index = 0;

        while (mixed.length < maxRows && (alertMessages[index] || todoMessages[index])) {
            if (alertMessages[index]) mixed.push(alertMessages[index]);
            if (mixed.length >= maxRows) break;
            if (todoMessages[index]) mixed.push(todoMessages[index]);
            index += 1;
        }

        unreadMessages.forEach(function (item) {
            if (mixed.length < maxRows && mixed.indexOf(item) === -1) mixed.push(item);
        });

        return mixed.slice(0, maxRows);
    }

    function dropdownHtml() {
        var topMessages = dropdownMessages();

        return [
            '<div class="mc-head">未读消息（' + unreadCount(messages) + '）</div>',
            '<div class="mc-list">',
            topMessages.map(function (item) {
                return [
                    '<a class="mc-item" href="' + MESSAGE_PAGE + '">',
                    '<div class="mc-item-title"><b>【' + escapeHtml(item.type) + '】</b> ' + escapeHtml(item.title) + '</div>',
                    '<div class="mc-item-time">' + escapeHtml(item.time) + '</div>',
                    '</a>'
                ].join('');
            }).join(''),
            '</div>',
            '<div class="mc-foot"><button class="mc-more" type="button" data-message-more>查看更多</button></div>'
        ].join('');
    }

    function renderPage(target) {
        var root = typeof target === 'string' ? document.querySelector(target) : target;
        if (!root) return;
        ensureStyle(document, 'message-center-page-style', pageCss);

        var state = {
            data: cloneMessages(),
            status: 'unread',
            category: 'all',
            keyword: '',
            page: 1,
            pageSize: 10,
            selected: {},
            keepVisible: {}
        };

        function categoryCount(category) {
            return state.data.filter(function (item) {
                return item.category === category;
            }).length;
        }

        root.innerHTML = [
            '<div class="mc-page-filter">',
            '<select class="mc-status-select" data-mc-status>',
            '<option value="unread">未读消息</option>',
            '<option value="all">全部消息</option>',
            '<option value="read">已读消息</option>',
            '</select>',
            '<div class="mc-search-wrap">',
            '<input class="mc-search" data-mc-search placeholder="请输入标题搜索">',
            '<svg class="mc-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>',
            '</div>',
            '<div class="mc-page-tabs">',
            '<button class="mc-page-tab active" type="button" data-mc-tab="all">全部类型</button>',
            '<button class="mc-page-tab" type="button" data-mc-tab="todo">待办消息（' + categoryCount('todo') + '）</button>',
            '<button class="mc-page-tab" type="button" data-mc-tab="alert">告警消息（' + categoryCount('alert') + '）</button>',
            '<button class="mc-page-tab" type="button" data-mc-tab="system">系统消息（' + categoryCount('system') + '）</button>',
            '</div>',
            '</div>',
            '<div class="mc-bulkbar">',
            '<input class="mc-check" type="checkbox" data-mc-check-all>',
            '<button class="mc-page-btn" type="button" data-mc-delete disabled>删除</button>',
            '<button class="mc-page-btn" type="button" data-mc-read disabled>标记已读</button>',
            '<button class="mc-page-btn" type="button" data-mc-all-read>全部已读</button>',
            '<button class="mc-page-btn" type="button" data-mc-all-delete>全部删除</button>',
            '</div>',
            '<div class="mc-list-table" data-mc-list></div>',
            '<div class="mc-pagination" data-mc-pagination></div>',
            '<div class="mc-drawer-mask" data-mc-drawer-mask></div>',
            '<aside class="mc-drawer" data-mc-drawer aria-hidden="true">',
            '<div class="mc-drawer-head"><button class="mc-drawer-close" type="button" data-mc-drawer-close>×</button><span>消息详情</span></div>',
            '<div class="mc-drawer-main" data-mc-drawer-body></div>',
            '<div class="mc-drawer-foot">',
            '<button class="mc-drawer-btn" type="button" data-mc-prev>上一条</button>',
            '<button class="mc-drawer-btn primary" type="button" data-mc-next-detail>下一条</button>',
            '</div>',
            '</aside>'
        ].join('');

        function filtered() {
            return state.data.filter(function (item) {
                var keptUnreadRow = state.status === 'unread' && state.keepVisible[item.id];
                var okStatus = state.status === 'all' || item.status === state.status || keptUnreadRow;
                var okCategory = state.category === 'all' || item.category === state.category;
                var okKeyword = !state.keyword || item.title.indexOf(state.keyword) !== -1 || item.type.indexOf(state.keyword) !== -1 || (item.content || '').indexOf(state.keyword) !== -1;
                return okStatus && okCategory && okKeyword;
            });
        }

        function currentPageRows(rows) {
            var start = (state.page - 1) * state.pageSize;
            return rows.slice(start, start + state.pageSize);
        }

        function selectedIds() {
            return Object.keys(state.selected).filter(function (id) {
                return state.selected[id];
            });
        }

        function findMessage(id) {
            return state.data.find(function (item) {
                return String(item.id) === String(id);
            });
        }

        function businessTitle(title) {
            var matches = String(title || '').match(/【([^】]+)】/g) || [];
            if (matches.length >= 1) {
                return matches[0].replace(/[【】]/g, '');
            }
            return title || '';
        }

        function confirmDelete(count, onConfirm) {
            if (window.GlobalDialog && typeof window.GlobalDialog.danger === 'function') {
                window.GlobalDialog.danger({
                    title: '确认删除消息',
                    desc: count > 1 ? '确认删除选中的 ' + count + ' 条消息吗？删除后当前原型列表中不再展示。' : '确认删除该条消息吗？删除后当前原型列表中不再展示。',
                    confirmText: '删除',
                    cancelText: '取消',
                    onConfirm: onConfirm
                });
                return;
            }

            if (window.confirm(count > 1 ? '确认删除选中的 ' + count + ' 条消息吗？' : '确认删除该条消息吗？')) {
                onConfirm();
            }
        }

        function markRead(ids) {
            ids.forEach(function (id) {
                var item = findMessage(id);
                if (item) {
                    item.status = 'read';
                    if (state.status === 'unread') state.keepVisible[item.id] = true;
                }
            });
        }

        function deleteIds(ids) {
            state.data = state.data.filter(function (item) {
                return ids.indexOf(String(item.id)) === -1;
            });
            ids.forEach(function (id) {
                delete state.keepVisible[id];
            });
            state.selected = {};
        }

        function drawerRows() {
            return filtered();
        }

        function openDrawer(id) {
            var item = findMessage(id);
            if (!item) return;

            var rows = drawerRows();
            var currentIndex = rows.findIndex(function (row) {
                return String(row.id) === String(id);
            });
            item.status = 'read';
            if (state.status === 'unread') state.keepVisible[item.id] = true;
            var drawer = root.querySelector('[data-mc-drawer]');
            var mask = root.querySelector('[data-mc-drawer-mask]');
            var body = root.querySelector('[data-mc-drawer-body]');
            var prev = root.querySelector('[data-mc-prev]');
            var next = root.querySelector('[data-mc-next-detail]');
            var content = item.content || '【' + item.type + '】 ' + item.title;

            body.innerHTML = [
                '<div class="mc-drawer-summary">',
                '<div class="mc-drawer-title">' + escapeHtml(businessTitle(item.title)) + '</div>',
                '<div class="mc-drawer-meta"><span>消息类型：</span><span>' + escapeHtml(item.type) + '</span></div>',
                '<div class="mc-drawer-meta"><span>发送时间：</span><span>' + escapeHtml(item.time) + '</span></div>',
                '</div>',
                '<div class="mc-drawer-content">',
                '<p>' + escapeHtml(content) + '</p>',
                '</div>'
            ].join('');

            prev.disabled = currentIndex <= 0;
            next.disabled = currentIndex < 0 || currentIndex >= rows.length - 1;
            prev.setAttribute('data-current-id', id);
            next.setAttribute('data-current-id', id);
            drawer.classList.add('open');
            mask.classList.add('open');
            drawer.setAttribute('aria-hidden', 'false');
            render();
        }

        function closeDrawer() {
            var drawer = root.querySelector('[data-mc-drawer]');
            var mask = root.querySelector('[data-mc-drawer-mask]');
            if (!drawer || !mask) return;
            drawer.classList.remove('open');
            mask.classList.remove('open');
            drawer.setAttribute('aria-hidden', 'true');
        }

        function goDrawer(delta) {
            var btn = delta < 0 ? root.querySelector('[data-mc-prev]') : root.querySelector('[data-mc-next-detail]');
            var currentId = btn ? btn.getAttribute('data-current-id') : '';
            var rows = drawerRows();
            var index = rows.findIndex(function (item) {
                return String(item.id) === String(currentId);
            });
            var target = rows[index + delta];
            if (target) openDrawer(target.id);
        }

        function render() {
            var rows = filtered();
            var totalPages = Math.max(1, Math.ceil(rows.length / state.pageSize));
            if (state.page > totalPages) state.page = totalPages;
            var pageRows = currentPageRows(rows);
            var list = root.querySelector('[data-mc-list]');
            var pagination = root.querySelector('[data-mc-pagination]');
            var selectedCount = selectedIds().length;
            var checkAll = root.querySelector('[data-mc-check-all]');
            var todoTab = root.querySelector('[data-mc-tab="todo"]');
            var alertTab = root.querySelector('[data-mc-tab="alert"]');
            var systemTab = root.querySelector('[data-mc-tab="system"]');
            if (todoTab) todoTab.textContent = '待办消息（' + categoryCount('todo') + '）';
            if (alertTab) alertTab.textContent = '告警消息（' + categoryCount('alert') + '）';
            if (systemTab) systemTab.textContent = '系统消息（' + categoryCount('system') + '）';

            root.querySelector('[data-mc-delete]').disabled = selectedCount === 0;
            root.querySelector('[data-mc-read]').disabled = selectedCount === 0;
            checkAll.checked = pageRows.length > 0 && pageRows.every(function (item) {
                return state.selected[item.id];
            });

            if (!pageRows.length) {
                list.innerHTML = '<div class="mc-empty">暂无消息</div>';
            } else {
                list.innerHTML = pageRows.map(function (item) {
                    return [
                        '<div class="mc-row ' + (item.status === 'read' ? 'read' : '') + '" data-id="' + item.id + '">',
                        '<input class="mc-check" type="checkbox" data-mc-row-check ' + (state.selected[item.id] ? 'checked' : '') + '>',
                        '<span class="mc-row-dot"></span>',
                        '<button class="mc-row-title" type="button" data-mc-open>【' + escapeHtml(item.type) + '】 ' + escapeHtml(item.title) + '</button>',
                        '<div class="mc-row-tail">',
                        '<time class="mc-row-time">' + escapeHtml(item.time) + '</time>',
                        '<div class="mc-row-actions">',
                        '<button class="mc-row-action" type="button" data-mc-row-delete>删除</button>',
                        item.status === 'unread' ? '<button class="mc-row-action" type="button" data-mc-row-read>标记已读</button>' : '',
                        '<button class="mc-row-action" type="button" data-mc-process>去处理</button>',
                        '</div>',
                        '</div>',
                        '</div>'
                    ].join('');
                }).join('');
            }

            pagination.innerHTML = [
                '<span>共 ' + rows.length + ' 条</span>',
                '<button class="mc-page-num active" type="button">' + state.page + '</button>',
                totalPages > 1 ? '<button class="mc-page-num" type="button" data-mc-next>' + Math.min(totalPages, state.page + 1) + '</button>' : '',
                '<button class="mc-page-num" type="button" data-mc-next>›</button>',
                '<select class="mc-page-size" data-mc-size><option value="10">10 条/页</option><option value="20">20 条/页</option></select>',
                '<span>前往</span>'
            ].join('');

            var pageSize = pagination.querySelector('[data-mc-size]');
            if (pageSize) pageSize.value = String(state.pageSize);
        }

        root.addEventListener('input', function (event) {
            if (event.target.matches('[data-mc-search]')) {
                state.keyword = event.target.value.trim();
                state.page = 1;
                state.keepVisible = {};
                render();
            }
        });

        root.addEventListener('change', function (event) {
            if (event.target.matches('[data-mc-status]')) {
                state.status = event.target.value;
                state.page = 1;
                state.selected = {};
                state.keepVisible = {};
                render();
            }
            if (event.target.matches('[data-mc-row-check]')) {
                var row = event.target.closest('[data-id]');
                if (row) state.selected[row.getAttribute('data-id')] = event.target.checked;
                render();
            }
            if (event.target.matches('[data-mc-check-all]')) {
                currentPageRows(filtered()).forEach(function (item) {
                    state.selected[item.id] = event.target.checked;
                });
                render();
            }
            if (event.target.matches('[data-mc-size]')) {
                state.pageSize = Number(event.target.value) || 10;
                state.page = 1;
                render();
            }
        });

        root.addEventListener('click', function (event) {
            var rowButton = event.target.closest('[data-mc-open], [data-mc-row-delete], [data-mc-row-read], [data-mc-process]');
            if (rowButton) {
                var messageRow = rowButton.closest('[data-id]');
                var messageId = messageRow ? messageRow.getAttribute('data-id') : '';

                if (rowButton.matches('[data-mc-open]')) {
                    openDrawer(messageId);
                    return;
                }

                if (rowButton.matches('[data-mc-row-delete]')) {
                    confirmDelete(1, function () {
                        deleteIds([String(messageId)]);
                        render();
                    });
                    return;
                }

                if (rowButton.matches('[data-mc-row-read]')) {
                    markRead([String(messageId)]);
                    render();
                    return;
                }

                if (rowButton.matches('[data-mc-process]')) {
                    return;
                }
            }

            if (event.target.closest('[data-mc-drawer-close]') || event.target.closest('[data-mc-drawer-mask]')) {
                closeDrawer();
                return;
            }

            if (event.target.closest('[data-mc-prev]')) {
                goDrawer(-1);
                return;
            }

            if (event.target.closest('[data-mc-next-detail]')) {
                goDrawer(1);
                return;
            }

            var tab = event.target.closest('[data-mc-tab]');
            if (tab) {
                root.querySelectorAll('[data-mc-tab]').forEach(function (item) {
                    item.classList.remove('active');
                });
                tab.classList.add('active');
                state.category = tab.getAttribute('data-mc-tab');
                state.page = 1;
                state.selected = {};
                state.keepVisible = {};
                render();
                return;
            }

            if (event.target.closest('[data-mc-read]')) {
                markRead(selectedIds());
                state.selected = {};
                render();
                return;
            }

            if (event.target.closest('[data-mc-delete]')) {
                var ids = selectedIds();
                confirmDelete(ids.length, function () {
                    deleteIds(ids);
                    render();
                });
                return;
            }

            if (event.target.closest('[data-mc-all-read]')) {
                state.data.forEach(function (item) { item.status = 'read'; });
                state.status = 'all';
                root.querySelector('[data-mc-status]').value = 'all';
                state.selected = {};
                render();
                return;
            }

            if (event.target.closest('[data-mc-all-delete]')) {
                confirmDelete(state.data.length, function () {
                    state.data = [];
                    state.selected = {};
                    closeDrawer();
                    render();
                });
                return;
            }

            if (event.target.closest('[data-mc-next]')) {
                var total = Math.max(1, Math.ceil(filtered().length / state.pageSize));
                state.page = Math.min(total, state.page + 1);
                render();
            }
        });

        render();
    }

    global.MessageCenter = {
        bindDropdown: bindDropdown,
        renderPage: renderPage,
        getMessages: cloneMessages,
        getUnreadCount: function () { return unreadCount(messages); },
        pageUrl: MESSAGE_PAGE
    };
})(window);
