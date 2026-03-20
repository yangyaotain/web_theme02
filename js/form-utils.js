/**
 * FormUtils — 表单公共工具集
 *
 * 包含以下工具，在页面中按需调用：
 *
 *   FormUtils.charCount(textareaId, countId)
 *     — 绑定文本域字符计数
 *
 *   FormUtils.passwordToggle(containerOrSelector)
 *     — 初始化容器内所有 .pwd-toggle 按钮的密码显隐
 *
 *   FormUtils.smsCountdown(btnIdOrEl, seconds)
 *     — 绑定短信验证码倒计时（默认 60 秒）
 *
 *   FormUtils.modalClose(overlayId, closeBtnId)
 *     — 绑定弹窗关闭（点击关闭按钮或遮罩层）
 *
 *   FormUtils.captcha(canvasId, clickTargetId)
 *     — 初始化图形验证码并绑定点击刷新
 *
 *   FormUtils.tabs(tabSelector, panelSelector, mapFn)
 *     — 初始化 Tab 切换，mapFn(tabEl) 返回对应 panelId
 */
var FormUtils = (function () {
    'use strict';

    function charCount(textareaId, countId) {
        var ta = document.getElementById(textareaId);
        var ct = document.getElementById(countId);
        if (!ta || !ct) return;
        ta.addEventListener('input', function () {
            ct.textContent = ta.value.length;
        });
    }

    function passwordToggle(container) {
        var root = typeof container === 'string'
            ? document.querySelector(container)
            : (container || document);
        root.querySelectorAll('.pwd-toggle').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var input = document.getElementById(this.getAttribute('data-target'));
                if (!input) return;
                var show = input.type === 'password';
                input.type = show ? 'text' : 'password';
                this.querySelectorAll('.eye-open').forEach(function (el) {
                    el.style.display = show ? 'none' : '';
                });
                this.querySelectorAll('.eye-closed').forEach(function (el) {
                    el.style.display = show ? '' : 'none';
                });
            });
        });
    }

    function smsCountdown(btnIdOrEl, seconds) {
        var btn = typeof btnIdOrEl === 'string'
            ? document.getElementById(btnIdOrEl) : btnIdOrEl;
        if (!btn) return;
        var sec = seconds || 60;
        btn.addEventListener('click', function () {
            if (btn.disabled) return;
            btn.disabled = true;
            var remaining = sec;
            btn.textContent = remaining + 's 后重发';
            var timer = setInterval(function () {
                remaining--;
                if (remaining <= 0) {
                    clearInterval(timer);
                    btn.disabled = false;
                    btn.textContent = '获取验证码';
                } else {
                    btn.textContent = remaining + 's 后重发';
                }
            }, 1000);
        });
    }

    function modalClose(overlayId, closeBtnId) {
        var overlay = document.getElementById(overlayId);
        var closeBtn = document.getElementById(closeBtnId);
        if (!overlay) return;

        function doClose() {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.2s ease';
            setTimeout(function () { overlay.style.display = 'none'; }, 200);
        }

        if (closeBtn) closeBtn.addEventListener('click', doClose);
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) doClose();
        });
    }

    function captcha(canvasId, clickTargetId) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var w = canvas.width, h = canvas.height;
        var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';

        function draw() {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = '#f5f5f5';
            ctx.fillRect(0, 0, w, h);
            ctx.font = 'bold 28px monospace';
            ctx.textBaseline = 'middle';
            var colors = ['#333', '#555', '#222', '#444'];
            for (var i = 0; i < 4; i++) {
                var ch = chars[Math.floor(Math.random() * chars.length)];
                ctx.save();
                ctx.translate(18 + i * 26, h / 2 + (Math.random() * 10 - 5));
                ctx.rotate((Math.random() - 0.5) * 0.4);
                ctx.fillStyle = colors[i];
                ctx.fillText(ch, 0, 0);
                ctx.restore();
            }
            for (var j = 0; j < 4; j++) {
                ctx.strokeStyle = 'rgba(0,0,0,' + (0.1 + Math.random() * 0.15) + ')';
                ctx.beginPath();
                ctx.moveTo(Math.random() * w, Math.random() * h);
                ctx.lineTo(Math.random() * w, Math.random() * h);
                ctx.stroke();
            }
            for (var k = 0; k < 30; k++) {
                ctx.fillStyle = 'rgba(0,0,0,' + (0.15 + Math.random() * 0.2) + ')';
                ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
            }
        }

        draw();
        var target = document.getElementById(clickTargetId || canvasId);
        if (target) target.addEventListener('click', draw);
    }

    function tabs(tabSelector, panelSelector, mapFn) {
        var tabEls = document.querySelectorAll(tabSelector);
        var panelEls = document.querySelectorAll(panelSelector);
        tabEls.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabEls.forEach(function (t) { t.classList.remove('active'); });
                panelEls.forEach(function (p) { p.classList.remove('active'); });
                tab.classList.add('active');
                var panelId = mapFn ? mapFn(tab) : tab.getAttribute('data-panel');
                var panel = document.getElementById(panelId);
                if (panel) panel.classList.add('active');
            });
        });
    }

    return {
        charCount: charCount,
        passwordToggle: passwordToggle,
        smsCountdown: smsCountdown,
        modalClose: modalClose,
        captcha: captcha,
        tabs: tabs
    };
})();
