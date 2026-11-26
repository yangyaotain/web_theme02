(function () {
    'use strict';
        function escapeHtml(value) {
            return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
                return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
            });
        }

        function renderRichText(text) {
            return String(text || '').split('\n').filter(Boolean).map(function (line) {
                return '<p>' + escapeHtml(line) + '</p>';
            }).join('');
        }

        function getReferencePrice(data) {
            var pricing = data.pricing || {};
            if (pricing.countPrice) return pricing.countPrice + (pricing.countUnit || '');
            if (pricing.durationPrice) return pricing.durationPrice + (pricing.durationUnit || '');
            if ((pricing.measures || []).indexOf('面议') !== -1) return '面议';
            return pricing.referencePrice || data.price || '面议';
        }

        function normalizeVisual(value) {
            if (!value) return null;
            if (typeof value === 'string') return { type: 'image', src: value };
            if (value.type === 'icon' && value.name) return { type: 'icon', name: value.name };
            var src = value.src || value.url;
            return src ? { type: 'image', src: src } : null;
        }

        function renderVisual(value, alt) {
            var visual = normalizeVisual(value);
            if (!visual) return '<span class="material-symbols-outlined">image</span>';
            if (visual.type === 'icon') return '<span class="material-symbols-outlined">' + escapeHtml(visual.name) + '</span>';
            return '<img src="' + escapeHtml(visual.src) + '" alt="' + escapeHtml(alt || '') + '">';
        }

        function normalizeGridLayout(card) {
            var source = card.layout || {};
            var legacySize = card.gridSize;
            return {
                rows: Math.min(4, Math.max(1, Number(source.rows != null ? source.rows : (card.rows != null ? card.rows : legacySize)) || 1)),
                columns: Math.min(4, Math.max(1, Number(source.columns != null ? source.columns : (card.columns != null ? card.columns : legacySize)) || 1))
            };
        }

        function normalizeGridBlock(block) {
            block = block || {};
            var text = String(block.text != null ? block.text : [block.title, block.content || block.desc].filter(Boolean).join('\n'));
            var visual = normalizeVisual(block.visual || block.image);
            var kind = ['image', 'text'].indexOf(block.kind) > -1 ? block.kind : (visual && !text.trim() ? 'image' : 'text');
            var ratio = Math.min(12, Math.max(1, Number(block.ratio != null ? block.ratio : block.widthRatio) || 1));
            return { kind: kind, ratio: ratio, text: text, visual: visual };
        }

        function renderImageGrid(card) {
            var layout = normalizeGridLayout(card);
            var blocks = (card.blocks || []).slice(0, layout.rows * layout.columns).map(normalizeGridBlock);
            var rows = '';
            for (var rowIndex = 0; rowIndex < layout.rows; rowIndex += 1) {
                var rowBlocks = blocks.slice(rowIndex * layout.columns, (rowIndex + 1) * layout.columns);
                var template = rowBlocks.map(function (block) { return block.ratio + 'fr'; }).join(' ');
                rows += '<div class="preview-image-row" style="grid-template-columns:' + template + '">' + rowBlocks.map(function (block) {
                    var content = block.kind === 'image'
                        ? '<div class="preview-image-block-media">' + renderVisual(block.visual, '图片内容') + '</div>'
                        : '<div class="preview-image-block-copy">' + renderRichText(block.text) + '</div>';
                    return '<article class="preview-image-block kind-' + block.kind + '">' + content + '</article>';
                }).join('') + '</div>';
            }
            return '<div class="preview-image-grid">' + rows + '</div>';
        }

        function hasCardContent(card) {
            if (!card) return false;
            if (card.type === 'image-grid') {
                var layout = normalizeGridLayout(card);
                return (card.blocks || []).slice(0, layout.rows * layout.columns).some(function (source) {
                    var block = normalizeGridBlock(source);
                    return block.text.trim() || block.visual;
                });
            }
            return card.title || card.desc || normalizeVisual(card.visual || card.icon);
        }

        function renderCardFlow(cards) {
            var sequenceIndex = 0;
            var iconIndex = 0;
            return '<div class="preview-card-flow">' + cards.map(function (card) {
                var type = card.type || 'icon';
                if (type === 'sequence') {
                    sequenceIndex += 1;
                    return '<div class="preview-process-card"><div class="preview-process-index">' + String(sequenceIndex).padStart(2, '0') + '</div><div class="preview-card-title">' + escapeHtml(card.title) + '</div><p class="preview-card-desc">' + escapeHtml(card.desc) + '</p></div>';
                }
                if (type === 'integrated') {
                    return '<div class="preview-case-card"><div class="preview-card-title">' + escapeHtml(card.title) + '</div><p class="preview-card-desc">' + escapeHtml(card.desc) + '</p></div>';
                }
                if (type === 'image-grid') return renderImageGrid(card);
                iconIndex += 1;
                var icon = card.visual || card.icon ? renderVisual(card.visual || card.icon, card.title) : iconIndex;
                return '<div class="preview-advantage-card"><div class="preview-advantage-icon">' + icon + '</div><div><div class="preview-card-title">' + escapeHtml(card.title) + '</div><p class="preview-card-desc">' + escapeHtml(card.desc) + '</p></div></div>';
            }).join('') + '</div>';
        }

        function renderCards(section) {
            var defaultType = section.title.indexOf('流程') > -1 ? 'sequence' : (section.title.indexOf('案例') > -1 ? 'integrated' : 'icon');
            var cards = (section.cards || section.features || []).map(function (card) {
                return Object.assign({ type: defaultType }, card);
            }).filter(hasCardContent);
            if (!cards.length) return '';
            return renderCardFlow(cards);
        }

        function renderSections(sections, options) {
            return (sections || []).map(function (section) {
                if (section.type === 'related-links') return window.ContentSectionEditor.renderLinks(section, options);
                return '<section class="preview-section">'
                    + (options?.exactFields && !section.title ? '' : '<div class="preview-section-head"><h2 class="preview-section-title">' + escapeHtml(section.title) + '</h2></div>')
                    + (section.content ? '<div class="preview-rich">' + renderRichText(section.content) + '</div>' : '')
                    + renderCards(section)
                    + '</section>';
            }).join('');
        }

    window.ServiceContentPreview = { renderSections, getReferencePrice };
})();
