/**
 * 智能客服 — 悬浮图标 + 弹窗聊天组件
 * 在门户页面引入即可自动初始化：<script src="js/smart-service.js" defer></script>
 */
(function () {
    var ROOT_ID = 'smartServiceRoot';
    if (document.getElementById(ROOT_ID)) return;

    var ROBOT_SVG_SM = '<svg viewBox="0 0 80 80" fill="none" style="width:100%;height:100%"><rect x="18" y="32" width="44" height="34" rx="10" fill="#2d6a4f"/><rect x="22" y="12" width="36" height="28" rx="12" fill="#3a8c67"/><line x1="40" y1="5" x2="40" y2="12" stroke="#2d6a4f" stroke-width="3" stroke-linecap="round"/><circle cx="40" cy="4" r="3" fill="#52b788"/><circle cx="33" cy="26" r="4" fill="#fff"/><circle cx="47" cy="26" r="4" fill="#fff"/><circle cx="34" cy="26" r="2" fill="#1a1a2e"/><circle cx="48" cy="26" r="2" fill="#1a1a2e"/><path d="M34 33 Q40 38 46 33" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="30" y="40" width="20" height="12" rx="3" fill="#b7e4c7" opacity=".6"/><rect x="8" y="38" width="10" height="6" rx="3" fill="#2d6a4f"/><rect x="62" y="38" width="10" height="6" rx="3" fill="#2d6a4f"/><rect x="27" y="64" width="10" height="6" rx="3" fill="#2d6a4f"/><rect x="43" y="64" width="10" height="6" rx="3" fill="#2d6a4f"/></svg>';

    var root = document.createElement('div');
    root.id = ROOT_ID;
    root.innerHTML = `
<!-- 悬浮按钮 -->
<div class="ss-float-btn" id="ssFloatBtn">
    <div class="ss-float-icon">
        <svg class="ss-robot-svg" viewBox="0 0 80 80" fill="none">
            <!-- 身体 -->
            <rect x="18" y="32" width="44" height="34" rx="10" fill="#2d6a4f"/>
            <!-- 头部 -->
            <rect x="22" y="12" width="36" height="28" rx="12" fill="#3a8c67"/>
            <!-- 天线 -->
            <line x1="40" y1="5" x2="40" y2="12" stroke="#2d6a4f" stroke-width="3" stroke-linecap="round"/>
            <circle cx="40" cy="4" r="3" fill="#52b788" class="ss-antenna-dot"/>
            <!-- 眼睛 -->
            <circle cx="33" cy="26" r="4" fill="#fff"/>
            <circle cx="47" cy="26" r="4" fill="#fff"/>
            <circle cx="34" cy="26" r="2" fill="#1a1a2e" class="ss-eye-l"/>
            <circle cx="48" cy="26" r="2" fill="#1a1a2e" class="ss-eye-r"/>
            <!-- 嘴巴 -->
            <path d="M34 33 Q40 38 46 33" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>
            <!-- 腹部屏幕 -->
            <rect x="30" y="40" width="20" height="12" rx="3" fill="#b7e4c7" opacity=".6"/>
            <line x1="33" y1="44" x2="47" y2="44" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".8"/>
            <line x1="33" y1="48" x2="42" y2="48" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".6"/>
            <!-- 手臂 -->
            <rect x="8" y="38" width="10" height="6" rx="3" fill="#2d6a4f" class="ss-arm-l"/>
            <rect x="62" y="38" width="10" height="6" rx="3" fill="#2d6a4f" class="ss-arm-r"/>
            <!-- 脚 -->
            <rect x="27" y="64" width="10" height="6" rx="3" fill="#2d6a4f"/>
            <rect x="43" y="64" width="10" height="6" rx="3" fill="#2d6a4f"/>
        </svg>
    </div>
    <span class="ss-float-label">智能客服</span>
    <!-- 消息提示点 -->
    <div class="ss-notify-dot"></div>
    <!-- 脉冲环 -->
    <div class="ss-float-pulse"></div>
    <div class="ss-float-pulse ss-float-pulse2"></div>
</div>

<!-- 遮罩 -->
<div class="ss-overlay" id="ssOverlay"></div>

<!-- 聊天弹窗 -->
<div class="ss-dialog" id="ssDialog">
    <div class="ss-header">
        <div class="ss-header-left">
            <div class="ss-header-icon ss-header-robot"></div>
            <span class="ss-header-title">智能客服</span>
        </div>
        <div class="ss-header-actions">
            <button class="ss-header-btn" id="ssMin" title="最小化"><svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
            <button class="ss-header-btn" id="ssMax" title="最大化"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke="currentColor" stroke-width="1.6" fill="none"/></svg></button>
            <button class="ss-header-btn ss-header-btn-close" id="ssClose" title="关闭"><svg viewBox="0 0 16 16" width="14" height="14"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
        </div>
    </div>
    <div class="ss-body">
        <div class="ss-chat-area">
            <div class="ss-messages" id="ssMessages">
                <!-- 系统欢迎 -->
                <div class="ss-msg ss-msg-ai">
                    <div class="ss-avatar ss-avatar-ai ss-avatar-robot"></div>
                    <div class="ss-bubble ss-bubble-ai">您好，我是您的专属客服。请问有什么可以帮到您？</div>
                </div>
                <!-- 用户提问 -->
                <div class="ss-msg ss-msg-user">
                    <div class="ss-avatar ss-avatar-user"><svg viewBox="0 0 24 24" fill="#fff"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg></div>
                    <div class="ss-bubble ss-bubble-user">请问忘记密码，如何找回账号？</div>
                </div>
                <!-- AI 回复 -->
                <div class="ss-msg ss-msg-ai">
                    <div class="ss-avatar ss-avatar-ai ss-avatar-robot"></div>
                    <div class="ss-bubble ss-bubble-ai ss-bubble-long">
                        <p>请各企业单位、个人做好账号管理工作，务必了解清楚账号的登录方式、账号信息获取以及找回账号的路径。</p>
                        <p><strong>一、 账号登录方式</strong></p>
                        <p>平台有两种登录方式。一是通过账号密码进行登录，用户需要在注册完成后进入统一用户中心获得账号和密码（也可以在统一用户中心进行账号密码的修改）</p>
                        <p>一种是通过手机号及验证码进行登录。如忘记账号密码的用户，可以尝试使用手机号验证码进行登录。</p>
                        <p><strong>二、 账号信息查看</strong></p>
                        <p>1. 进入官网，点击右上角登录—进入统一用户中心。</p>
                        <p>2. 记住上图中红框内的三个信息，分别是登录账号、手机号以及密码，他们分别对应了账号登录的两种方式——手机验证码登录和账号密码登录。</p>
                        <p><strong>三、 账号找回</strong></p>
                        <p>当用户忘记密码需要找回时，需要充分排查清楚情形。</p>
                        <p>情况1：进入官网-登陆页面，在左下角"忘记密码"进行密码找回；如果您在找回页面输入手机号无法获得验证码，可能说明该手机号并未在平台注册</p>
                        <p>情况2：如果您是企业客户，您确认您公司已经在深圳数据交易所完成了注册，但手机号/账号密码均不清楚，可以通过机构账号找回的方式进行申请找回：点击"忘记密码"，在右上角找到"机构账号找回"</p>
                        <p>按照申请表单内容进行完整填写以及材料上传（注：请确保提交的材料完整、准确、符合要求，否则平台不予处理您的找回申请），平台收到申请后会对资料进行核对校验，并与您联系。</p>
                        <div class="ss-timestamp">2025-2-18 14:36:00</div>
                    </div>
                </div>
            </div>
            <!-- 输入区 -->
            <div class="ss-input-area">
                <div class="ss-input-wrap">
                    <input type="text" class="ss-input" placeholder="可以问我任何问题......" readonly>
                    <button class="ss-send-btn"><svg viewBox="0 0 24 24" width="28" height="28"><circle cx="12" cy="12" r="12" fill="var(--forest-green, #2d6a4f)"/><path d="M8 12h8M13 8l4 4-4 4" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                </div>
            </div>
        </div>
        <!-- 常见问题侧栏 -->
        <div class="ss-faq">
            <div class="ss-faq-title">常见问题</div>
            <a href="javascript:;" class="ss-faq-item">如何找回账号？</a>
            <a href="javascript:;" class="ss-faq-item">如何申请数据资源？</a>
            <a href="javascript:;" class="ss-faq-item">如何上架数据产品？</a>
            <a href="javascript:;" class="ss-faq-item">如何获得交易角色权限？</a>
            <a href="javascript:;" class="ss-faq-item">如何查询数据服务？</a>
            <a href="javascript:;" class="ss-faq-item">如何办理数据产权登记？</a>
            <a href="javascript:;" class="ss-faq-item">企业账户如何管理子账号？</a>
        </div>
    </div>
</div>`;

    var style = document.createElement('style');
    style.textContent = `
/* ====== 悬浮按钮 ====== */
.ss-float-btn {
    position: fixed; right: 32px; bottom: 32px; z-index: 99990;
    display: flex; flex-direction: column; align-items: center; cursor: pointer;
    transition: transform .3s cubic-bezier(.34,1.56,.64,1);
}
.ss-float-btn:hover { transform: translateY(-6px) scale(1.05); }
.ss-float-icon {
    width: 68px; height: 68px; border-radius: 20px;
    background: linear-gradient(145deg, #ffffff, #f0f7f3);
    box-shadow: 0 6px 24px rgba(45,106,79,.2), 0 2px 8px rgba(0,0,0,.08);
    display: flex; align-items: center; justify-content: center;
    position: relative;
    animation: ssFloat 3s ease-in-out infinite;
}
.ss-robot-svg { width: 52px; height: 52px; }
.ss-float-label {
    margin-top: 6px; font-size: 12px; font-weight: 600; color: #444;
    white-space: nowrap; letter-spacing: .5px;
}
/* 消息红点 */
.ss-notify-dot {
    position: absolute; top: -2px; right: 18px;
    width: 12px; height: 12px; border-radius: 50%;
    background: #ef4444; border: 2px solid #fff;
    animation: ssNotifyPulse 2s ease-in-out infinite;
    pointer-events: none;
}
/* 脉冲环 */
.ss-float-pulse {
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 68px; height: 68px; border-radius: 20px;
    border: 2px solid rgba(45,106,79,.35);
    animation: ssPulse 3s ease-out infinite;
    pointer-events: none;
}
.ss-float-pulse2 { animation-delay: 1.5s; }

/* 天线闪烁 */
.ss-antenna-dot { animation: ssAntenna 2s ease-in-out infinite; }
/* 手臂摇摆 */
.ss-arm-l { animation: ssArmL 2.5s ease-in-out infinite; transform-origin: 18px 41px; }
.ss-arm-r { animation: ssArmR 2.5s ease-in-out infinite; transform-origin: 62px 41px; }
/* 眼睛眨动 */
.ss-eye-l, .ss-eye-r { animation: ssBlink 4s ease-in-out infinite; }

@keyframes ssFloat {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
}
@keyframes ssPulse {
    0% { opacity: .6; transform: translateX(-50%) scale(1); }
    100% { opacity: 0; transform: translateX(-50%) scale(1.6); }
}
@keyframes ssNotifyPulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: .7; }
}
@keyframes ssAntenna {
    0%,100% { fill: #52b788; }
    50% { fill: #95d5b2; filter: drop-shadow(0 0 4px #52b788); }
}
@keyframes ssArmL {
    0%,100% { transform: rotate(0deg); }
    50% { transform: rotate(-8deg); }
}
@keyframes ssArmR {
    0%,100% { transform: rotate(0deg); }
    50% { transform: rotate(8deg); }
}
@keyframes ssBlink {
    0%,42%,46%,100% { transform: scaleY(1); }
    44% { transform: scaleY(0.1); }
}

/* ====== 遮罩 ====== */
.ss-overlay {
    display: none; position: fixed; inset: 0; z-index: 99991;
    background: rgba(0,0,0,.35);
}
.ss-overlay.active { display: block; }

/* ====== 弹窗 ====== */
.ss-dialog {
    display: none; position: fixed; z-index: 99992;
    right: 36px; bottom: 36px;
    width: 820px; height: 580px;
    background: #fff; border-radius: 12px; overflow: hidden;
    box-shadow: 0 12px 48px rgba(0,0,0,.2);
    flex-direction: column;
    animation: ssSlideUp .3s ease;
    transition: width .3s, height .3s, top .3s, left .3s, right .3s, bottom .3s, border-radius .3s;
}
.ss-dialog.active { display: flex; }
@keyframes ssSlideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

/* ====== 头部 ====== */
.ss-header {
    height: 48px; padding: 0 16px;
    background: var(--forest-green, #2d6a4f);
    display: flex; align-items: center; justify-content: space-between;
    flex-shrink: 0;
}
.ss-header-left { display: flex; align-items: center; gap: 8px; }
.ss-header-icon { width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,.2); padding: 2px; }
.ss-header-title { color: #fff; font-size: 15px; font-weight: 600; }
.ss-header-actions { display: flex; align-items: center; gap: 2px; }
.ss-header-btn {
    background: none; border: none; color: rgba(255,255,255,.75);
    cursor: pointer; padding: 6px 8px; border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    transition: all .15s;
}
.ss-header-btn:hover { background: rgba(255,255,255,.15); color: #fff; }
.ss-header-btn-close:hover { background: rgba(239,68,68,.8); color: #fff; }

/* AI 头像 SVG */
.ss-avatar-robot { padding: 3px; }

/* ====== 最小化状态 ====== */
.ss-dialog.ss-minimized .ss-body { display: none; }
.ss-dialog.ss-minimized {
    width: 320px !important; height: auto !important;
    bottom: 32px; right: 32px;
    top: auto !important; left: auto !important;
}

/* ====== 最大化状态 ====== */
.ss-dialog.ss-maximized {
    width: 100vw !important; height: 100vh !important;
    top: 0 !important; left: 0 !important;
    right: 0 !important; bottom: 0 !important;
    border-radius: 0;
}

/* ====== 主体 ====== */
.ss-body {
    flex: 1; display: flex; overflow: hidden;
}

/* ====== 聊天区 ====== */
.ss-chat-area {
    flex: 1; display: flex; flex-direction: column; min-width: 0;
}
.ss-messages {
    flex: 1; overflow-y: auto; padding: 20px 20px 12px;
    display: flex; flex-direction: column; gap: 16px;
}
.ss-messages::-webkit-scrollbar { width: 5px; }
.ss-messages::-webkit-scrollbar-thumb { background: #d0d5dd; border-radius: 3px; }

/* 消息 */
.ss-msg { display: flex; gap: 10px; align-items: flex-start; }
.ss-msg-user { flex-direction: row-reverse; }
.ss-avatar {
    width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
}
.ss-avatar-ai { background: #eef6f2; }
.ss-avatar-user { background: var(--forest-green, #2d6a4f); }
.ss-avatar-user svg { width: 20px; height: 20px; }

/* 气泡 */
.ss-bubble {
    max-width: 72%; padding: 10px 14px; border-radius: 10px;
    font-size: 14px; line-height: 1.65; color: #333;
}
.ss-bubble-ai { background: #f5f7fa; }
.ss-bubble-user { background: var(--forest-green, #2d6a4f); color: #fff; border-radius: 10px 2px 10px 10px; }
.ss-bubble-long p { margin: 0 0 8px; }
.ss-bubble-long p:last-of-type { margin-bottom: 0; }
.ss-bubble-long strong { color: #1a1a2e; }
.ss-timestamp {
    text-align: center; color: #999; font-size: 12px;
    margin-top: 12px; padding-top: 8px;
    border-top: 1px solid #eee;
}

/* 输入区 */
.ss-input-area {
    padding: 12px 20px 16px; border-top: 1px solid #f0f2f5;
    flex-shrink: 0;
}
.ss-input-wrap {
    display: flex; align-items: center; gap: 8px;
    background: #f5f7fa; border-radius: 24px; padding: 6px 8px 6px 20px;
}
.ss-input {
    flex: 1; border: none; background: transparent; outline: none;
    font-size: 14px; color: #333; font-family: inherit;
}
.ss-input::placeholder { color: #b0b8c4; }
.ss-send-btn {
    background: none; border: none; cursor: pointer; padding: 2px;
    display: flex; align-items: center; justify-content: center;
    opacity: .8; transition: .15s;
}
.ss-send-btn:hover { opacity: 1; }

/* ====== FAQ侧栏 ====== */
.ss-faq {
    width: 210px; flex-shrink: 0; border-left: 1px solid #f0f2f5;
    padding: 20px 16px; overflow-y: auto;
}
.ss-faq-title {
    font-size: 15px; font-weight: 700; color: #1a1a2e;
    margin-bottom: 16px; padding-bottom: 10px;
    border-bottom: 1px solid #f0f2f5;
}
.ss-faq-item {
    display: block; padding: 8px 0; font-size: 13px;
    color: #555; text-decoration: none;
    border-bottom: 1px solid #f7f8fa;
    transition: color .15s;
}
.ss-faq-item:hover { color: var(--forest-green, #2d6a4f); }

/* ====== 响应式 ====== */
@media (max-width: 900px) {
    .ss-dialog { width: calc(100vw - 32px); right: 16px; bottom: 16px; height: 70vh; }
    .ss-faq { display: none; }
}
`;

    document.head.appendChild(style);
    document.body.appendChild(root);

    // 注入 SVG 到所有机器人占位元素
    root.querySelectorAll('.ss-header-robot, .ss-avatar-robot').forEach(function (el) {
        el.innerHTML = ROBOT_SVG_SM;
    });

    var floatBtn = document.getElementById('ssFloatBtn');
    var overlay = document.getElementById('ssOverlay');
    var dialog = document.getElementById('ssDialog');
    var closeBtn = document.getElementById('ssClose');
    var minBtn = document.getElementById('ssMin');
    var maxBtn = document.getElementById('ssMax');

    function openDialog() {
        floatBtn.style.display = 'none';
        overlay.classList.add('active');
        dialog.classList.remove('ss-minimized');
        dialog.classList.remove('ss-maximized');
        dialog.classList.add('active');
        var msgs = document.getElementById('ssMessages');
        msgs.scrollTop = msgs.scrollHeight;
    }
    function closeDialog() {
        overlay.classList.remove('active');
        dialog.classList.remove('active');
        dialog.classList.remove('ss-minimized');
        dialog.classList.remove('ss-maximized');
        floatBtn.style.display = '';
    }
    function minimizeDialog() {
        if (dialog.classList.contains('ss-minimized')) {
            dialog.classList.remove('ss-minimized');
            overlay.style.display = '';
        } else {
            dialog.classList.remove('ss-maximized');
            dialog.classList.add('ss-minimized');
            overlay.classList.remove('active');
        }
    }
    function maximizeDialog() {
        if (dialog.classList.contains('ss-maximized')) {
            dialog.classList.remove('ss-maximized');
        } else {
            dialog.classList.remove('ss-minimized');
            dialog.classList.add('ss-maximized');
            overlay.classList.add('active');
        }
        var msgs = document.getElementById('ssMessages');
        msgs.scrollTop = msgs.scrollHeight;
    }

    floatBtn.addEventListener('click', openDialog);
    overlay.addEventListener('click', closeDialog);
    closeBtn.addEventListener('click', closeDialog);
    minBtn.addEventListener('click', minimizeDialog);
    maxBtn.addEventListener('click', maximizeDialog);

    var faqItems = root.querySelectorAll('.ss-faq-item');
    faqItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var msgs = document.getElementById('ssMessages');
            var userMsg = document.createElement('div');
            userMsg.className = 'ss-msg ss-msg-user';
            userMsg.innerHTML = '<div class="ss-avatar ss-avatar-user"><svg viewBox="0 0 24 24" fill="#fff"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg></div><div class="ss-bubble ss-bubble-user">' + item.textContent + '</div>';
            msgs.appendChild(userMsg);

            setTimeout(function () {
                var aiMsg = document.createElement('div');
                aiMsg.className = 'ss-msg ss-msg-ai';
                aiMsg.innerHTML = '<div class="ss-avatar ss-avatar-ai ss-avatar-robot"></div><div class="ss-bubble ss-bubble-ai">感谢您的提问，我正在为您查询相关信息，请稍候……</div>';
                aiMsg.querySelector('.ss-avatar-robot').innerHTML = ROBOT_SVG_SM;
                msgs.appendChild(aiMsg);
                msgs.scrollTop = msgs.scrollHeight;
            }, 400);

            msgs.scrollTop = msgs.scrollHeight;
        });
    });
})();
