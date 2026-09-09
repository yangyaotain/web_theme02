(function () {
    'use strict';

    var CARD_TYPES = ['sequence', 'icon', 'integrated'];
    var ICONS = {
        add: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
        trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5M14 11v5"/></svg>',
        drag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7h.01M8 12h.01M8 17h.01M16 7h.01M16 12h.01M16 17h.01"/></svg>',
        upload: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4m0 0-4 4m4-4 4 4M5 15v4h14v-4"/></svg>',
        image: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m5 18 5-5 3 3 2-2 4 4"/></svg>',
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

    function normalizeCard(card, sectionTitle) {
        var type = card && card.type;
        if (CARD_TYPES.indexOf(type) === -1) {
            type = String(sectionTitle || '').indexOf('流程') > -1 ? 'sequence' : 'icon';
        }
        return {
            type: type,
            title: String(card && card.title || ''),
            desc: String(card && card.desc || ''),
            icon: String(card && (card.icon || card.image) || '')
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
        return '图标卡片';
    }

    function renderCounter(value, max, key) {
        return '<span class="feature-editor-counter" data-feature-counter="' + escapeHtml(key) + '">' + String(value || '').length + '/' + max + '</span>';
    }

    function renderDragHandle(kind, sectionIndex, cardIndex) {
        var cardAttrs = cardIndex == null ? '' : ' data-feature-drag-card="' + cardIndex + '"';
        return '<span class="feature-editor-drag" draggable="true" role="button" tabindex="0" title="拖动排序" data-feature-drag-kind="' + kind + '" data-feature-drag-section="' + sectionIndex + '"' + cardAttrs + '>' + ICONS.drag + '<span>拖动</span></span>';
    }

    function renderCardEditor(card, sectionIndex, cardIndex) {
        var type = CARD_TYPES.indexOf(card.type) > -1 ? card.type : 'icon';
        var key = sectionIndex + '-' + cardIndex;
        var upload = type === 'icon'
            ? '<label class="feature-editor-image-upload">'
                + '<span class="feature-editor-image-preview">'
                + (card.icon ? '<img src="' + escapeHtml(card.icon) + '" alt="卡片图片预览">' : '<span class="feature-editor-image-empty">' + ICONS.image + '<em>暂无图片</em></span>')
                + '</span>'
                + '<span class="feature-editor-upload-button">' + ICONS.upload + '<span>' + (card.icon ? '更换图片' : '上传图片') + '</span></span>'
                + '<input type="file" accept="image/*" data-feature-card-upload="' + key + '">'
                + '</label>'
            : '';
        return ''
            + '<article class="feature-editor-card type-' + type + '" data-feature-card data-feature-section-index="' + sectionIndex + '" data-feature-card-index="' + cardIndex + '">'
            +   '<header class="feature-editor-card-head">'
            +       renderDragHandle('card', sectionIndex, cardIndex)
            +       '<strong>' + getCardTypeLabel(type) + '</strong>'
            +       '<button type="button" class="feature-editor-delete" data-feature-action="delete-card" data-feature-section="' + sectionIndex + '" data-feature-card="' + cardIndex + '">' + ICONS.trash + '<span>删除</span></button>'
            +   '</header>'
            +   '<div class="feature-editor-card-body">'
            +       upload
            +       '<div class="feature-editor-card-fields">'
            +           '<label><span>标题</span><input type="text" maxlength="40" value="' + escapeHtml(card.title) + '" data-feature-card-title="' + key + '"></label>'
            +           '<label><span>描述</span><span class="feature-editor-textarea-wrap"><textarea maxlength="300" data-feature-card-desc="' + key + '">' + escapeHtml(card.desc) + '</textarea>' + renderCounter(card.desc, 300, 'card-desc-' + key) + '</span></label>'
            +       '</div>'
            +   '</div>'
            + '</article>';
    }

    function renderSectionEditor(section, sectionIndex) {
        return ''
            + '<section class="feature-editor-section" data-feature-section data-feature-section-index="' + sectionIndex + '">'
            +   '<header class="feature-editor-section-head">'
            +       '<span class="feature-editor-section-index">' + (sectionIndex + 1) + '</span>'
            +       renderDragHandle('section', sectionIndex)
            +       '<input type="text" maxlength="60" value="' + escapeHtml(section.title) + '" aria-label="章节标题" placeholder="请输入章节标题" data-feature-section-title="' + sectionIndex + '">'
            +       '<button type="button" class="feature-editor-delete" data-feature-action="delete-section" data-feature-section="' + sectionIndex + '">' + ICONS.trash + '<span>删除章节</span></button>'
            +   '</header>'
            +   '<div class="feature-editor-section-body">'
            +       '<label class="feature-editor-field"><span>正文内容</span><span class="feature-editor-textarea-wrap"><textarea maxlength="1000" placeholder="请输入该章节的正文内容，可使用换行分段" data-feature-section-content="' + sectionIndex + '">' + escapeHtml(section.content) + '</textarea>' + renderCounter(section.content, 1000, 'section-content-' + sectionIndex) + '</span></label>'
            +       '<div class="feature-editor-card-panel">'
            +           '<div class="feature-editor-card-toolbar"><strong>相关卡片</strong><div>'
            +               '<button type="button" data-feature-action="add-card" data-feature-card-type="sequence" data-feature-section="' + sectionIndex + '">' + ICONS.add + '<span>序号卡片</span></button>'
            +               '<button type="button" data-feature-action="add-card" data-feature-card-type="icon" data-feature-section="' + sectionIndex + '">' + ICONS.add + '<span>图标卡片</span></button>'
            +               '<button type="button" data-feature-action="add-card" data-feature-card-type="integrated" data-feature-section="' + sectionIndex + '">' + ICONS.add + '<span>整行卡片</span></button>'
            +           '</div></div>'
            +           '<div class="feature-editor-card-grid" data-feature-card-grid="' + sectionIndex + '">'
            +               (section.cards.length ? section.cards.map(function (card, cardIndex) { return renderCardEditor(card, sectionIndex, cardIndex); }).join('') : '<div class="feature-editor-card-empty">暂无卡片，可根据内容选择序号、图标或整行卡片。</div>')
            +           '</div>'
            +       '</div>'
            +   '</div>'
            + '</section>';
    }

    function renderEditorMarkup(model) {
        return ''
            + '<div class="feature-editor">'
            +   '<div class="feature-editor-section-title"><strong>内容章节</strong><span>章节与卡片均支持拖动排序</span></div>'
            +   '<div class="feature-editor-section-list" data-feature-section-list>'
            +       (model.sections.length ? model.sections.map(renderSectionEditor).join('') : '<div class="feature-editor-section-empty">暂无内容章节，请新增章节后维护门户展示内容。</div>')
            +   '</div>'
            +   '<button type="button" class="feature-editor-add-section" data-feature-action="add-section">' + ICONS.add + '<span>新增章节</span></button>'
            + '</div>';
    }

    function notify(options, model) {
        if (options && typeof options.onChange === 'function') options.onChange(model);
    }

    function parsePair(value) {
        var parts = String(value || '').split('-');
        return { section: Number(parts[0]), card: Number(parts[1]) };
    }

    function mountEditor(root, data, options) {
        if (!root) return normalize(data);
        var model = normalize(data);
        var dragState = null;

        function paint() {
            root.innerHTML = renderEditorMarkup(model);
            bind();
        }

        function updateCounter(key, value) {
            var counter = root.querySelector('[data-feature-counter="' + key + '"]');
            if (counter) counter.textContent = value.length + '/' + (key.indexOf('card-desc-') === 0 ? 300 : 1000);
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
                        model.sections[sectionIndex].cards.push({ type: this.dataset.featureCardType || 'icon', title: '', desc: '', icon: '' });
                    } else if (action === 'delete-card' && model.sections[sectionIndex] && model.sections[sectionIndex].cards[cardIndex]) {
                        model.sections[sectionIndex].cards.splice(cardIndex, 1);
                    }
                    notify(options, model);
                    paint();
                });
            });

            root.querySelectorAll('[data-feature-card-upload]').forEach(function (input) {
                input.addEventListener('change', function () {
                    if (!this.files || !this.files[0]) return;
                    var pair = parsePair(this.dataset.featureCardUpload);
                    var card = model.sections[pair.section] && model.sections[pair.section].cards[pair.card];
                    if (!card) return;
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        card.icon = event.target.result;
                        notify(options, model);
                        paint();
                    };
                    reader.readAsDataURL(this.files[0]);
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

    function renderPortalCard(card, index) {
        if (card.type === 'sequence') {
            return '<article class="feature-detail-card feature-detail-card--sequence"><span class="feature-detail-card-index">' + String(index + 1).padStart(2, '0') + '</span><h4>' + escapeHtml(card.title) + '</h4><p>' + escapeHtml(card.desc) + '</p></article>';
        }
        if (card.type === 'integrated') {
            return '<article class="feature-detail-card feature-detail-card--integrated"><h4>' + escapeHtml(card.title) + '</h4><p>' + escapeHtml(card.desc) + '</p></article>';
        }
        var icon = card.icon ? '<img src="' + escapeHtml(card.icon) + '" alt="">' : ICONS.feature;
        return '<article class="feature-detail-card feature-detail-card--icon"><span class="feature-detail-card-icon">' + icon + '</span><div><h4>' + escapeHtml(card.title) + '</h4><p>' + escapeHtml(card.desc) + '</p></div></article>';
    }

    function hasContent(data) {
        var model = normalize(data);
        return Boolean(model.sections.some(function (section) {
            return section.title.trim() || section.content.trim() || section.cards.some(function (card) {
                return card.title.trim() || card.desc.trim() || card.icon;
            });
        }));
    }

    function renderPortal(root, data) {
        if (!root) return;
        var model = normalize(data);
        var sections = model.sections.map(function (section) {
            return {
                title: section.title,
                content: section.content,
                cards: section.cards.filter(function (card) {
                    return card.title.trim() || card.desc.trim() || card.icon;
                })
            };
        }).filter(function (section) {
            return section.title.trim() || section.content.trim() || section.cards.length;
        });
        if (!hasContent(model)) {
            root.innerHTML = '<div class="feature-detail-empty">' + ICONS.feature + '<span>暂无特色介绍</span></div>';
            return;
        }
        root.innerHTML = '<div class="feature-detail">'
            + sections.map(function (section, sectionIndex) {
                return '<section class="feature-detail-section">'
                    + '<header class="feature-detail-section-head"><span>' + (sectionIndex + 1) + '</span><h3>' + escapeHtml(section.title || '特色内容') + '</h3></header>'
                    + (section.content ? '<div class="feature-detail-copy">' + renderParagraphs(section.content) + '</div>' : '')
                    + (section.cards.length ? '<div class="feature-detail-card-grid">' + section.cards.map(renderPortalCard).join('') + '</div>' : '')
                    + '</section>';
            }).join('')
            + '</div>';
    }

    window.FeatureIntroduction = {
        clone: function (data) { return normalize(clone(data)); },
        normalize: normalize,
        hasContent: hasContent,
        mountEditor: mountEditor,
        renderPortal: renderPortal
    };
})();
