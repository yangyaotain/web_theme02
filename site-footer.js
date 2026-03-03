/**
 * <site-footer> Web Component
 * 龙岗数据聚合服务平台 — 统一底部组件
 *
 * 用法：
 *   <site-footer></site-footer>
 *
 * 外部可通过 CSS 自定义 host 上边距：
 *   site-footer { margin-top: 0; }
 */
class SiteFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
<style>
:host {
    display: block;
    margin-top: 60px;
}

.footer {
    background: #0B1A14;
    padding: 48px 32px;
    border-top: 1px solid rgba(32, 165, 101, 0.15);
}

.footer-container {
    max-width: 1400px;
    margin: 0 auto;
    text-align: center;
}

.footer-text {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.35);
    line-height: 2;
}
</style>

<footer class="footer">
    <div class="footer-container">
        <p class="footer-text">
            深圳市龙岗区数据有限公司主办<br>
            备案：ICP备050xxxx03号-2 | 公网安备3301xxxx20013897号 | 网站标识码：3301xxxx05<br>
            建议使用1366*768以上分辨率 / Chrome、Edge浏览器访问以获得最佳效果
        </p>
    </div>
</footer>`;
    }
}

customElements.define('site-footer', SiteFooter);
