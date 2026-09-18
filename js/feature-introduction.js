(function () {
    'use strict';

    var CARD_TYPES = ['sequence', 'icon', 'integrated', 'image-grid'];
    var BLOCK_KINDS = ['image', 'text'];
    var GRID_PRESETS = {
        'left-right': { rows: 1, columns: 2 },
        'top-bottom': { rows: 2, columns: 1 },
        'top-middle-bottom': { rows: 3, columns: 1 }
    };
    var ICONS = {
        add: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
        trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5M14 11v5"/></svg>',
        drag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7h.01M8 12h.01M8 17h.01M16 7h.01M16 12h.01M16 17h.01"/></svg>',
        image: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m5 18 5-5 3 3 2-2 4 4"/></svg>',
        text: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M5 10h14M5 14h10M5 18h8"/></svg>',
        feature: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.8 4.7L19 9.5l-4 3.2.2 5.3-3.2-2-3.2 2 .2-5.3-4-3.2 5.2-1.8L12 3Z"/></svg>'
    };

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function clone(value) {
        return JSON.parse(JSON.stringify(value || {}));
    }

    function normalizeVisual(value) {
        if (!value) return null;
        if (typeof value === 'string') return value ? { type: 'image', src: value, name: '' } : null;
        if (value.type === 'icon' && value.name) return { type: 'icon', name: String(value.name) };
        var src = value.src || value.url;
        if ((value.type === 'image' || src) && src) {
            return { type: 'image', src: String(src), name: String(value.name || '') };
        }
        return null;
    }

    function normalizeBlock(block) {
        block = block || {};
        var legacyText = [block.title, block.content || block.desc].filter(function (item) {
            return String(item || '').trim();
        }).join('\n');
        var text = String(block.text != null ? block.text : legacyText);
        var visual = normalizeVisual(block.visual || block.image);
        var kind = BLOCK_KINDS.indexOf(block.kind) > -1 ? block.kind : (visual && !text.trim() ? 'image' : 'text');
        return {
            kind: kind,
            ratio: clampRatio(block.ratio != null ? block.ratio : block.widthRatio),
            text: text,
            visual: visual
        };
    }

    function createImageGridBlock(kind) {
        return { kind: kind === 'image' ? 'image' : 'text', ratio: 1, text: '', visual: null };
    }

    function clampRatio(value) {
        return Math.min(12, Math.max(1, Number(value) || 1));
    }

    function clampGridValue(value) {
        return Math.min(4, Math.max(1, Number(value) || 1));
    }

    function getPresetForLayout(rows, columns, preset) {
        var config = GRID_PRESETS[preset];
        return config && config.rows === rows && config.columns === columns ? preset : 'custom';
    }

    function normalizeLayout(card) {
        card = card || {};
        var legacySize = card.gridSize;
        var source = card.layout || {};
        var rows = clampGridValue(source.rows != null ? source.rows : (card.rows != null ? card.rows : legacySize));
        var columns = clampGridValue(source.columns != null ? source.columns : (card.columns != null ? card.columns : legacySize));
        var preset = getPresetForLayout(rows, columns, source.preset || card.preset);
        return { preset: preset, rows: rows, columns: columns };
    }

    function ensureGridBlocks(card) {
        var count = card.layout.rows * card.layout.columns;
        while (card.blocks.length < count) {
            card.blocks.push(createImageGridBlock(card.blocks.length % 2 ? 'image' : 'text'));
        }
    }

    function normalizeCard(card, sectionTitle) {
        var type = card && card.type;
        if (CARD_TYPES.indexOf(type) === -1) {
            type = String(sectionTitle || '').indexOf('流程') > -1 ? 'sequence' : 'icon';
        }
        if (type === 'image-grid') {
            var layout = normalizeLayout(card);
            var blocks = (card && card.blocks || []).map(normalizeBlock);
            var normalized = {
                type: type,
                layout: layout,
                blocks: blocks
            };
            ensureGridBlocks(normalized);
            return normalized;
        }
        return {
            type: type,
            title: String(card && card.title || ''),
            desc: String(card && card.desc || ''),
            visual: normalizeVisual(card && (card.visual || card.icon || card.image))
        };
    }

    function normalize(data) {
        var source = data || {};
        return {
            sections: (source.sections || []).map(function (section) {
                var title = String(section && section.title || '');
                return {
                    title: title,
                    content: String(section && section.content || ''),
                    cards: (section && (section.cards || section.features) || []).map(function (card) {
                        return normalizeCard(card, title);
                    })
                };
            })
        };
    }

    function getCardTypeLabel(type) {
        if (type === 'sequence') return '序号卡片';
        if (type === 'integrated') return '整行卡片';
        if (type === 'image-grid') return '图片卡片';
        return '图标卡片';
    }

    function renderCounter(value, max, key) {
        return '<span class="feature-editor-counter" data-feature-counter="' + escapeHtml(key) + '">' + String(value || '').length + '/' + max + '</span>';
    }

    function renderDragHandle(kind, sectionIndex, cardIndex) {
        var cardAttrs = cardIndex == null ? '' : ' data-feature-drag-card="' + cardIndex + '"';
        return '<span class="feature-editor-drag" draggable="true" role="button" tabindex="0" title="拖动排序" data-feature-drag-kind="' + kind + '" data-feature-drag-section="' + sectionIndex + '"' + cardAttrs + '>' + ICONS.drag + '<span>拖动</span></span>';
    }

    function renderBlockKindSwitch(kind, key) {
        return '<div class="feature-editor-kind-switch" role="group" aria-label="块属性">'
            + '<button type="button" class="' + (kind === 'image' ? 'is-active' : '') + '" data-feature-block-kind="' + key + '" data-feature-kind-value="image" aria-pressed="' + (kind === 'image') + '">' + ICONS.image + '<span>图片</span></button>'
            + '<button type="button" class="' + (kind === 'text' ? 'is-active' : '') + '" data-feature-block-kind="' + key + '" data-feature-kind-value="text" aria-pressed="' + (kind === 'text') + '">' + ICONS.text + '<span>文本</span></button>'
            + '</div>';
    }

    function renderImageGridBlock(block, sectionIndex, cardIndex, blockIndex) {
        var key = sectionIndex + '-' + cardIndex + '-' + blockIndex;
        return ''
            + '<section class="feature-editor-grid-block" data-feature-grid-block="' + key + '">'
            +   '<header><strong>块 ' + (blockIndex + 1) + '</strong>' + renderBlockKindSwitch(block.kind, key) + '</header>'
            +   '<div class="feature-editor-grid-block-body">'
            +       (block.kind === 'image' ? '<div class="feature-editor-grid-image"><div data-feature-block-visual="' + key + '"></div></div>' : '')
            +       (block.kind === 'text' ? '<div class="feature-editor-grid-text"><span class="feature-editor-textarea-wrap"><textarea maxlength="1000" placeholder="请输入文本内容" aria-label="块 ' + (blockIndex + 1) + ' 文本内容" data-feature-block-text="' + key + '">' + escapeHtml(block.text) + '</textarea>' + renderCounter(block.text, 1000, 'block-text-' + key) + '</span></div>' : '')
            +   '</div>'
            + '</section>';
    }

    function isNarrowRatio(blocks) {
        if (blocks.length < 2) return false;
        var total = blocks.reduce(function (sum, block) { return sum + clampRatio(block.ratio); }, 0);
        return blocks.some(function (block) { return clampRatio(block.ratio) / total < 0.16; });
    }

    function renderRowRatioToolbar(blocks, sectionIndex, cardIndex, rowIndex, start) {
        var ratioFields = blocks.length === 1
            ? '<span class="feature-editor-row-full">块 ' + (start + 1) + ' 铺满整行</span>'
            : blocks.map(function (block, index) {
                var blockIndex = start + index;
                var key = sectionIndex + '-' + cardIndex + '-' + blockIndex;
                return '<label class="feature-editor-row-ratio"><span>块 ' + (blockIndex + 1) + '</span><input type="number" min="1" max="12" step="1" value="' + block.ratio + '" data-feature-block-ratio="' + key + '"></label>';
            }).join('<span class="feature-editor-ratio-colon">:</span>');
        return '<div class="feature-editor-row-toolbar">'
            + '<div class="feature-editor-row-ratio-line"><strong>第 ' + (rowIndex + 1) + ' 行宽度比例</strong><div>' + ratioFields + '</div>'
            + '<em class="feature-editor-ratio-warning"' + (isNarrowRatio(blocks) ? '' : ' hidden') + '>窄列可能影响门户文本可读性</em></div>'
            + '</div>';
    }

    function renderImageGridRow(card, sectionIndex, cardIndex, rowIndex) {
        var start = rowIndex * card.layout.columns;
        var blocks = card.blocks.slice(start, start + card.layout.columns);
        var ratios = blocks.map(function (block) { return clampRatio(block.ratio); });
        var template = ratios.map(function (ratio) { return ratio + 'fr'; }).join(' ');
        return '<section class="feature-editor-grid-row-shell">'
            + renderRowRatioToolbar(blocks, sectionIndex, cardIndex, rowIndex, start)
            + '<div class="feature-editor-grid-row" style="grid-template-columns:' + template + '">'
            + blocks.map(function (block, index) {
                return renderImageGridBlock(block, sectionIndex, cardIndex, start + index);
            }).join('')
            + '</div></section>';
    }

    function renderLayoutDiagram(rows, columns) {
        var cells = '';
        for (var index = 0; index < rows * columns; index += 1) cells += '<i></i>';
        return '<span class="feature-editor-layout-diagram" style="--layout-rows:' + rows + ';--layout-columns:' + columns + '">' + cells + '</span>';
    }

    function renderLayoutPreset(card, key, value, label, rows, columns) {
        var active = card.layout.preset === value;
        return '<button type="button" class="feature-editor-layout-option' + (active ? ' is-active' : '') + '" data-feature-grid-preset="' + value + '" data-feature-grid-key="' + key + '" aria-pressed="' + active + '">'
            + renderLayoutDiagram(rows, columns) + '<span>' + label + '</span></button>';
    }

    function renderImageGridEditor(card, sectionIndex, cardIndex) {
        var key = sectionIndex + '-' + cardIndex;
        var rows = '';
        for (var rowIndex = 0; rowIndex < card.layout.rows; rowIndex += 1) {
            rows += renderImageGridRow(card, sectionIndex, cardIndex, rowIndex);
        }
        return ''
            + '<div class="feature-editor-image-grid-toolbar">'
            +   '<div class="feature-editor-layout-presets">'
            +       renderLayoutPreset(card, key, 'left-right', '左右布局', 1, 2)
            +       renderLayoutPreset(card, key, 'top-bottom', '上下布局', 2, 1)
            +       renderLayoutPreset(card, key, 'top-middle-bottom', '上中下布局', 3, 1)
            +   '</div>'
            +   '<div class="feature-editor-grid-dimensions' + (card.layout.preset === 'custom' ? ' is-custom' : '') + '"><strong>自定义 N × N</strong><label><span>行</span><input type="number" min="1" max="4" value="' + card.layout.rows + '" data-feature-grid-rows="' + key + '"></label><span>×</span><label><span>列</span><input type="number" min="1" max="4" value="' + card.layout.columns + '" data-feature-grid-columns="' + key + '"></label></div>'
            + '</div>'
            + '<p class="feature-editor-image-grid-help">预设布局会同步行列值；直接修改行或列后切换为自定义布局。编辑卡片在当前行宽度内按真实比例展示，窄块控件会自适应排列。</p>'
            + '<div class="feature-editor-image-grid">' + rows + '</div>';
    }

    function renderCardEditor(card, sectionIndex, cardIndex) {
        var type = CARD_TYPES.indexOf(card.type) > -1 ? card.type : 'icon';
        var key = sectionIndex + '-' + cardIndex;
        var body = type === 'image-grid'
            ? renderImageGridEditor(card, sectionIndex, cardIndex)
            : ''
                + '<div class="feature-editor-card-body">'
                +   (type === 'icon' ? '<div class="feature-editor-icon-control"><span>图标或图片</span><div data-feature-card-visual="' + key + '"></div></div>' : '')
                +   '<div class="feature-editor-card-fields">'
                +       '<label><span>标题</span><input type="text" maxlength="40" value="' + escapeHtml(card.title) + '" data-feature-card-title="' + key + '"></label>'
                +       '<label><span>描述</span><span class="feature-editor-textarea-wrap"><textarea maxlength="300" data-feature-card-desc="' + key + '">' + escapeHtml(card.desc) + '</textarea>' + renderCounter(card.desc, 300, 'card-desc-' + key) + '</span></label>'
                +   '</div>'
                + '</div>';
        return ''
            + '<article class="feature-editor-card type-' + type + '" data-feature-card data-feature-section-index="' + sectionIndex + '" data-feature-card-index="' + cardIndex + '">'
            +   '<header class="feature-editor-card-head">'
            +       renderDragHandle('card', sectionIndex, cardIndex)
            +       '<strong>' + getCardTypeLabel(type) + '</strong>'
            +       '<button type="button" class="feature-editor-button feature-editor-delete" data-feature-action="delete-card" data-feature-section="' + sectionIndex + '" data-feature-card="' + cardIndex + '">' + ICONS.trash + '<span>删除</span></button>'
            +   '</header>'
            +   body
            + '</article>';
    }

    function renderSectionEditor(section, sectionIndex) {
        return ''
            + '<section class="feature-editor-section" data-feature-section data-feature-section-index="' + sectionIndex + '">'
            +   '<header class="feature-editor-section-head">'
            +       renderDragHandle('section', sectionIndex)
            +       '<input type="text" maxlength="60" value="' + escapeHtml(section.title) + '" aria-label="章节标题" placeholder="请输入章节标题" data-feature-section-title="' + sectionIndex + '">'
            +       '<button type="button" class="feature-editor-button feature-editor-delete" data-feature-action="delete-section" data-feature-section="' + sectionIndex + '">' + ICONS.trash + '<span>删除章节</span></button>'
            +   '</header>'
            +   '<div class="feature-editor-section-body">'
            +       '<label class="feature-editor-field"><span>正文内容</span><span class="feature-editor-textarea-wrap"><textarea maxlength="1000" placeholder="请输入该章节的正文内容，可使用换行分段" data-feature-section-content="' + sectionIndex + '">' + escapeHtml(section.content) + '</textarea>' + renderCounter(section.content, 1000, 'section-content-' + sectionIndex) + '</span></label>'
            +       '<div class="feature-editor-card-panel">'
            +           '<div class="feature-editor-card-toolbar"><strong>相关卡片</strong><div>'
            +               '<button type="button" class="feature-editor-button" data-feature-action="add-card" data-feature-card-type="sequence" data-feature-section="' + sectionIndex + '">' + ICONS.add + '<span>序号卡片</span></button>'
            +               '<button type="button" class="feature-editor-button" data-feature-action="add-card" data-feature-card-type="icon" data-feature-section="' + sectionIndex + '">' + ICONS.add + '<span>图标卡片</span></button>'
            +               '<button type="button" class="feature-editor-button" data-feature-action="add-card" data-feature-card-type="integrated" data-feature-section="' + sectionIndex + '">' + ICONS.add + '<span>整行卡片</span></button>'
            +               '<button type="button" class="feature-editor-button" data-feature-action="add-card" data-feature-card-type="image-grid" data-feature-section="' + sectionIndex + '">' + ICONS.add + '<span>图片卡片</span></button>'
            +           '</div></div>'
            +           '<div class="feature-editor-card-grid" data-feature-card-grid="' + sectionIndex + '">'
            +               (section.cards.length ? section.cards.map(function (card, cardIndex) { return renderCardEditor(card, sectionIndex, cardIndex); }).join('') : '<div class="feature-editor-card-empty">暂无卡片，可根据内容选择序号、图标、整行或图片卡片。</div>')
            +           '</div>'
            +       '</div>'
            +   '</div>'
            + '</section>';
    }

    function renderEditorMarkup(model, options) {
        options = options || {};
        var editorClass = 'feature-editor' + (options.embedded ? ' feature-editor--embedded' : '');
        var title = options.title || '内容章节';
        var titleHtml = options.showTitle === false
            ? ''
            : '<div class="feature-editor-section-title"><strong>' + escapeHtml(title) + '</strong><span>章节与卡片均支持拖动排序</span></div>';
        return ''
            + '<div class="' + editorClass + '">'
            +   titleHtml
            +   '<div class="feature-editor-section-list" data-feature-section-list>'
            +       (model.sections.length ? model.sections.map(renderSectionEditor).join('') : '<div class="feature-editor-section-empty">暂无内容章节，请新增章节后维护门户展示内容。</div>')
            +   '</div>'
            +   '<button type="button" class="feature-editor-button feature-editor-add-section" data-feature-action="add-section">' + ICONS.add + '<span>新增章节</span></button>'
            + '</div>';
    }

    function notify(options, model) {
        if (options && typeof options.onChange === 'function') options.onChange(model);
    }

    function parsePair(value) {
        var parts = String(value || '').split('-');
        return { section: Number(parts[0]), card: Number(parts[1]) };
    }

    function parseTriple(value) {
        var parts = String(value || '').split('-');
        return { section: Number(parts[0]), card: Number(parts[1]), block: Number(parts[2]) };
    }

    function createCard(type) {
        if (type === 'image-grid') {
            return {
                type: 'image-grid',
                layout: { preset: 'left-right', rows: 1, columns: 2 },
                blocks: [createImageGridBlock('text'), createImageGridBlock('image')]
            };
        }
        return { type: CARD_TYPES.indexOf(type) > -1 ? type : 'icon', title: '', desc: '', visual: null };
    }

    function mountEditor(root, data, options) {
        if (!root) return normalize(data);
        var model = normalize(data);
        var dragState = null;

        function paint() {
            root.innerHTML = renderEditorMarkup(model, options);
            bind();
            mountVisualPickers();
        }

        function updateCounter(key, value) {
            var counter = root.querySelector('[data-feature-counter="' + key + '"]');
            var max = key.indexOf('section-content-') === 0 || key.indexOf('block-text-') === 0 ? 1000 : 300;
            if (counter) counter.textContent = value.length + '/' + max;
        }

        function reportUploadError(message) {
            if (options && typeof options.onError === 'function') options.onError(message);
            else if (window.alert) window.alert(message);
        }

        function mountVisualPickers() {
            if (!window.ImageIconPicker) return;
            root.querySelectorAll('[data-feature-card-visual]').forEach(function (mount) {
                var pair = parsePair(mount.dataset.featureCardVisual);
                var card = model.sections[pair.section] && model.sections[pair.section].cards[pair.card];
                if (!card) return;
                window.ImageIconPicker.mount(mount, {
                    label: '卡片图标',
                    modalTitle: '选择卡片图标',
                    maxSizeMB: 5,
                    maxCount: 1,
                    values: card.visual ? [card.visual] : [],
                    onChange: function (values) {
                        card.visual = values[0] || null;
                        notify(options, model);
                    },
                    onError: reportUploadError
                });
            });
            root.querySelectorAll('[data-feature-block-visual]').forEach(function (mount) {
                var position = parseTriple(mount.dataset.featureBlockVisual);
                var card = model.sections[position.section] && model.sections[position.section].cards[position.card];
                var block = card && card.blocks[position.block];
                if (!block) return;
                window.ImageIconPicker.mount(mount, {
                    label: '块图片',
                    maxSizeMB: 2,
                    maxCount: 1,
                    allowIcon: false,
                    values: block.visual ? [block.visual] : [],
                    onChange: function (values) {
                        block.visual = values[0] || null;
                        notify(options, model);
                    },
                    onError: reportUploadError
                });
            });
        }

        function bind() {
            root.querySelectorAll('[data-feature-section-title]').forEach(function (input) {
                input.addEventListener('input', function () {
                    var section = model.sections[Number(this.dataset.featureSectionTitle)];
                    if (section) section.title = this.value;
                    notify(options, model);
                });
            });

            root.querySelectorAll('[data-feature-section-content]').forEach(function (input) {
                input.addEventListener('input', function () {
                    var index = Number(this.dataset.featureSectionContent);
                    if (model.sections[index]) model.sections[index].content = this.value;
                    updateCounter('section-content-' + index, this.value);
                    notify(options, model);
                });
            });

            root.querySelectorAll('[data-feature-card-title]').forEach(function (input) {
                input.addEventListener('input', function () {
                    var pair = parsePair(this.dataset.featureCardTitle);
                    var card = model.sections[pair.section] && model.sections[pair.section].cards[pair.card];
                    if (card) card.title = this.value;
                    notify(options, model);
                });
            });

            root.querySelectorAll('[data-feature-card-desc]').forEach(function (input) {
                input.addEventListener('input', function () {
                    var pair = parsePair(this.dataset.featureCardDesc);
                    var card = model.sections[pair.section] && model.sections[pair.section].cards[pair.card];
                    if (card) card.desc = this.value;
                    updateCounter('card-desc-' + pair.section + '-' + pair.card, this.value);
                    notify(options, model);
                });
            });

            root.querySelectorAll('[data-feature-grid-preset]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var pair = parsePair(this.dataset.featureGridKey);
                    var card = model.sections[pair.section] && model.sections[pair.section].cards[pair.card];
                    if (!card || card.type !== 'image-grid') return;
                    var preset = GRID_PRESETS[this.dataset.featureGridPreset];
                    if (!preset) return;
                    card.layout = { preset: this.dataset.featureGridPreset, rows: preset.rows, columns: preset.columns };
                    ensureGridBlocks(card);
                    notify(options, model);
                    paint();
                });
            });

            root.querySelectorAll('[data-feature-grid-rows], [data-feature-grid-columns]').forEach(function (input) {
                input.addEventListener('change', function () {
                    var pair = parsePair(this.dataset.featureGridRows || this.dataset.featureGridColumns);
                    var card = model.sections[pair.section] && model.sections[pair.section].cards[pair.card];
                    if (!card || card.type !== 'image-grid') return;
                    if (this.hasAttribute('data-feature-grid-rows')) card.layout.rows = clampGridValue(this.value);
                    else card.layout.columns = clampGridValue(this.value);
                    card.layout.preset = 'custom';
                    ensureGridBlocks(card);
                    notify(options, model);
                    paint();
                });
            });

            root.querySelectorAll('[data-feature-block-kind]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var position = parseTriple(this.dataset.featureBlockKind);
                    var card = model.sections[position.section] && model.sections[position.section].cards[position.card];
                    var block = card && card.blocks[position.block];
                    if (!block) return;
                    block.kind = BLOCK_KINDS.indexOf(this.dataset.featureKindValue) > -1 ? this.dataset.featureKindValue : 'text';
                    notify(options, model);
                    paint();
                });
            });

            root.querySelectorAll('[data-feature-block-ratio]').forEach(function (input) {
                input.addEventListener('change', function () {
                    var position = parseTriple(this.dataset.featureBlockRatio);
                    var card = model.sections[position.section] && model.sections[position.section].cards[position.card];
                    var block = card && card.blocks[position.block];
                    if (!block) return;
                    block.ratio = clampRatio(this.value);
                    notify(options, model);
                    paint();
                });
            });

            root.querySelectorAll('[data-feature-block-text]').forEach(function (input) {
                input.addEventListener('input', function () {
                    var position = parseTriple(this.dataset.featureBlockText);
                    var card = model.sections[position.section] && model.sections[position.section].cards[position.card];
                    var block = card && card.blocks[position.block];
                    if (block) block.text = this.value;
                    updateCounter('block-text-' + position.section + '-' + position.card + '-' + position.block, this.value);
                    notify(options, model);
                });
            });

            root.querySelectorAll('[data-feature-action]').forEach(function (button) {
                button.addEventListener('click', function () {
                    var action = this.dataset.featureAction;
                    var sectionIndex = Number(this.dataset.featureSection);
                    var cardIndex = Number(this.dataset.featureCard);
                    if (action === 'add-section') {
                        model.sections.push({ title: '新增内容章节', content: '', cards: [] });
                    } else if (action === 'delete-section' && model.sections[sectionIndex]) {
                        model.sections.splice(sectionIndex, 1);
                    } else if (action === 'add-card' && model.sections[sectionIndex]) {
                        model.sections[sectionIndex].cards.push(createCard(this.dataset.featureCardType));
                    } else if (action === 'delete-card' && model.sections[sectionIndex] && model.sections[sectionIndex].cards[cardIndex]) {
                        model.sections[sectionIndex].cards.splice(cardIndex, 1);
                    }
                    notify(options, model);
                    paint();
                });
            });

            root.querySelectorAll('[data-feature-drag-kind]').forEach(function (handle) {
                handle.addEventListener('dragstart', function (event) {
                    dragState = {
                        kind: this.dataset.featureDragKind,
                        section: Number(this.dataset.featureDragSection),
                        card: this.dataset.featureDragCard == null ? -1 : Number(this.dataset.featureDragCard)
                    };
                    event.dataTransfer.effectAllowed = 'move';
                    event.dataTransfer.setData('text/plain', dragState.kind);
                    var item = this.closest(dragState.kind === 'section' ? '[data-feature-section]' : '[data-feature-card]');
                    if (item) item.classList.add('is-dragging');
                });
                handle.addEventListener('dragend', function () {
                    root.querySelectorAll('.is-dragging, .is-drag-over').forEach(function (item) { item.classList.remove('is-dragging', 'is-drag-over'); });
                    dragState = null;
                });
            });

            root.querySelectorAll('.feature-editor-section[data-feature-section-index], .feature-editor-card[data-feature-card-index]').forEach(function (target) {
                target.addEventListener('dragover', function (event) {
                    if (!dragState) return;
                    var isSection = this.hasAttribute('data-feature-section');
                    if ((dragState.kind === 'section') !== isSection) return;
                    if (!isSection && Number(this.dataset.featureSectionIndex) !== dragState.section) return;
                    event.preventDefault();
                    this.classList.add('is-drag-over');
                });
                target.addEventListener('dragleave', function () { this.classList.remove('is-drag-over'); });
                target.addEventListener('drop', function (event) {
                    if (!dragState) return;
                    event.preventDefault();
                    if (dragState.kind === 'section' && this.hasAttribute('data-feature-section')) {
                        var targetSection = Number(this.dataset.featureSectionIndex);
                        if (targetSection !== dragState.section) {
                            var movedSection = model.sections.splice(dragState.section, 1)[0];
                            model.sections.splice(targetSection, 0, movedSection);
                        }
                    } else if (dragState.kind === 'card' && this.hasAttribute('data-feature-card')) {
                        var targetGroup = Number(this.dataset.featureSectionIndex);
                        var targetCard = Number(this.dataset.featureCardIndex);
                        if (targetGroup === dragState.section && targetCard !== dragState.card) {
                            var movedCard = model.sections[targetGroup].cards.splice(dragState.card, 1)[0];
                            model.sections[targetGroup].cards.splice(targetCard, 0, movedCard);
                        }
                    }
                    notify(options, model);
                    dragState = null;
                    paint();
                });
            });
        }

        paint();
        notify(options, model);
        return model;
    }

    function renderParagraphs(content) {
        var blocks = String(content || '').split(/\n+/).map(function (item) { return item.trim(); }).filter(Boolean);
        return blocks.map(function (item) { return '<p>' + escapeHtml(item) + '</p>'; }).join('');
    }

    function renderVisual(visual, alt) {
        visual = normalizeVisual(visual);
        if (!visual) return ICONS.image;
        if (visual.type === 'icon') {
            return '<span class="material-symbols-outlined" aria-label="' + escapeHtml(alt || '卡片图标') + '">' + escapeHtml(visual.name) + '</span>';
        }
        return '<img src="' + escapeHtml(visual.src) + '" alt="' + escapeHtml(alt || '') + '">';
    }

    function renderImageGridBlockPortal(block) {
        var kind = BLOCK_KINDS.indexOf(block.kind) > -1 ? block.kind : 'text';
        var content = kind === 'image'
            ? '<div class="feature-detail-image-block-media">' + renderVisual(block.visual, '图片内容') + '</div>'
            : '<div class="feature-detail-image-block-copy">' + renderParagraphs(block.text) + '</div>';
        return '<article class="feature-detail-image-block kind-' + kind + '">' + content + '</article>';
    }

    function renderImageGridCard(card) {
        var layout = normalizeLayout(card);
        var blocks = (card.blocks || []).slice(0, layout.rows * layout.columns);
        var rows = '';
        for (var rowIndex = 0; rowIndex < layout.rows; rowIndex += 1) {
            var rowBlocks = blocks.slice(rowIndex * layout.columns, (rowIndex + 1) * layout.columns);
            var template = rowBlocks.map(function (block) { return clampRatio(block.ratio) + 'fr'; }).join(' ');
            rows += '<div class="feature-detail-image-row" style="grid-template-columns:' + template + '">'
                + rowBlocks.map(renderImageGridBlockPortal).join('') + '</div>';
        }
        return '<div class="feature-detail-image-grid layout-' + layout.preset + '">' + rows + '</div>';
    }

    function renderPortalCard(card, index) {
        if (card.type === 'sequence') {
            return '<article class="feature-detail-card feature-detail-card--sequence"><span class="feature-detail-card-index">' + String(index + 1).padStart(2, '0') + '</span><h4>' + escapeHtml(card.title) + '</h4><p>' + escapeHtml(card.desc) + '</p></article>';
        }
        if (card.type === 'integrated') {
            return '<article class="feature-detail-card feature-detail-card--integrated"><h4>' + escapeHtml(card.title) + '</h4><p>' + escapeHtml(card.desc) + '</p></article>';
        }
        if (card.type === 'image-grid') return renderImageGridCard(card);
        var icon = card.visual ? renderVisual(card.visual, card.title) : ICONS.feature;
        return '<article class="feature-detail-card feature-detail-card--icon"><span class="feature-detail-card-icon">' + icon + '</span><div><h4>' + escapeHtml(card.title) + '</h4><p>' + escapeHtml(card.desc) + '</p></div></article>';
    }

    function hasBlockContent(block) {
        return Boolean(block && (String(block.text || '').trim() || normalizeVisual(block.visual)));
    }

    function hasCardContent(card) {
        if (!card) return false;
        if (card.type === 'image-grid') {
            var layout = normalizeLayout(card);
            return (card.blocks || []).slice(0, layout.rows * layout.columns).some(hasBlockContent);
        }
        return Boolean(String(card.title || '').trim() || String(card.desc || '').trim() || normalizeVisual(card.visual || card.icon));
    }

    function hasContent(data) {
        var model = normalize(data);
        return Boolean(model.sections.some(function (section) {
            return section.title.trim() || section.content.trim() || section.cards.some(hasCardContent);
        }));
    }

    function renderPortal(root, data) {
        if (!root) return;
        var model = normalize(data);
        var sections = model.sections.map(function (section) {
            return {
                title: section.title,
                content: section.content,
                cards: section.cards.filter(hasCardContent)
            };
        }).filter(function (section) {
            return section.title.trim() || section.content.trim() || section.cards.length;
        });
        if (!hasContent(model)) {
            root.innerHTML = '<div class="feature-detail-empty">' + ICONS.feature + '<span>暂无特色介绍</span></div>';
            return;
        }
        root.innerHTML = '<div class="feature-detail">'
            + sections.map(function (section) {
                return '<section class="feature-detail-section">'
                    + '<header class="feature-detail-section-head"><h3>' + escapeHtml(section.title || '特色内容') + '</h3></header>'
                    + (section.content ? '<div class="feature-detail-copy">' + renderParagraphs(section.content) + '</div>' : '')
                    + (section.cards.length ? '<div class="feature-detail-card-grid">' + section.cards.map(renderPortalCard).join('') + '</div>' : '')
                    + '</section>';
            }).join('')
            + '</div>';
    }

    window.ContentSectionEditor = {
        clone: function (data) { return normalize(clone(data)); },
        normalize: normalize,
        hasCardContent: hasCardContent,
        hasContent: hasContent,
        mountEditor: mountEditor
    };

    window.FeatureIntroduction = {
        clone: window.ContentSectionEditor.clone,
        normalize: normalize,
        hasCardContent: hasCardContent,
        hasContent: hasContent,
        mountEditor: mountEditor,
        renderPortal: renderPortal
    };
})();
