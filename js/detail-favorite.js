(function () {
    'use strict';

    var STORAGE_PREFIX = 'PortalDetailFavorites:v1:';

    function getStorageKey(button) {
        var scope = button.getAttribute('data-favorite-scope') || 'detail';
        var params = new URLSearchParams(window.location.search || '');
        var itemIdentity = button.getAttribute('data-favorite-item') || params.get('sampleType') || params.get('title');
        var title = document.querySelector('.product-title');

        if (!itemIdentity && title) {
            itemIdentity = title.textContent.trim();
        }

        return STORAGE_PREFIX + scope + ':' + (itemIdentity || 'default');
    }

    function readFavorite(key) {
        try {
            return window.localStorage.getItem(key) === '1';
        } catch (error) {
            return false;
        }
    }

    function writeFavorite(key, isFavorite) {
        try {
            window.localStorage.setItem(key, isFavorite ? '1' : '0');
        } catch (error) {
            // 本地存储不可用时仍保留当前页面的交互状态。
        }
    }

    function renderFavorite(button, isFavorite) {
        var label = button.querySelector('[data-favorite-label]');

        button.classList.toggle('is-favorite', isFavorite);
        button.setAttribute('aria-pressed', String(isFavorite));
        button.setAttribute('aria-label', isFavorite ? '取消收藏此内容' : '收藏此内容');
        if (label) label.textContent = isFavorite ? '取消收藏' : '收藏';
    }

    function showFeedback(isFavorite) {
        if (!window.GlobalDialog) return;

        var method = isFavorite ? 'success' : 'info';
        window.GlobalDialog[method]({
            title: isFavorite ? '收藏成功' : '已取消收藏',
            desc: isFavorite ? '已添加到我的收藏' : '已从我的收藏中移除',
            duration: 1400
        });
    }

    function initFavorite(button) {
        if (button.getAttribute('data-favorite-ready') === 'true') return;

        button.setAttribute('data-favorite-ready', 'true');
        var key = getStorageKey(button);
        renderFavorite(button, readFavorite(key));

        button.addEventListener('click', function () {
            var isFavorite = button.getAttribute('aria-pressed') !== 'true';
            renderFavorite(button, isFavorite);
            writeFavorite(key, isFavorite);
            showFeedback(isFavorite);
        });
    }

    function initDetailFavorites(root) {
        (root || document).querySelectorAll('[data-detail-favorite]').forEach(initFavorite);
    }

    window.DetailFavorite = {
        init: initDetailFavorites
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDetailFavorites);
    } else {
        initDetailFavorites();
    }
})();
