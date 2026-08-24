(function () {
    if (window.ImageIconPicker) return;

    var PAGE_SIZE = 20;
    var ICONS = [
        ['dataset', '数据资源'], ['table_chart', '数据表格'], ['database', '数据库'], ['api', '接口服务'],
        ['description', '文档资料'], ['folder_open', '文件目录'], ['account_tree', '数据关系'], ['monitoring', '监测分析'],
        ['map', '地图空间'], ['directions_car', '交通出行'], ['factory', '工业制造'], ['business', '企业经营'],
        ['storefront', '商贸服务'], ['public', '公共数据'], ['school', '教育服务'], ['health_and_safety', '医疗健康'],
        ['payments', '金融服务'], ['energy_savings_leaf', '能源低碳'], ['water_drop', '水务环境'], ['cloud', '云端数据'],
        ['schema', '数据模型'], ['hub', '数据枢纽'], ['data_object', '结构化数据'], ['storage', '数据存储'],
        ['dns', '服务器'], ['backup', '数据备份'], ['cloud_upload', '云端上传'], ['cloud_download', '云端下载'],
        ['sync', '数据同步'], ['query_stats', '查询分析'], ['analytics', '数据分析'], ['insights', '数据洞察'],
        ['bar_chart', '柱状图表'], ['pie_chart', '占比分析'], ['stacked_line_chart', '趋势分析'], ['dashboard', '数据看板'],
        ['code', '程序代码'], ['terminal', '终端服务'], ['memory', '计算资源'], ['smart_toy', '人工智能'],
        ['sensors', '物联感知'], ['wifi', '网络通信'], ['link', '数据链接'], ['share', '数据共享'],
        ['lock', '数据安全'], ['shield', '安全防护'], ['verified_user', '可信认证'], ['key', '授权访问'],
        ['fingerprint', '身份认证'], ['policy', '政策制度'], ['gavel', '司法法务'], ['settings', '系统设置'],
        ['tune', '参数配置'], ['filter_alt', '数据筛选'], ['search', '数据检索'], ['visibility', '数据查看'],
        ['fact_check', '数据核验'], ['rule', '规则管理'], ['checklist', '任务清单'], ['task', '任务管理'],
        ['assignment', '业务档案'], ['event', '事件管理'], ['calendar_month', '日程计划'], ['groups', '组织人员'],
        ['person', '用户信息'], ['badge', '资质证照'], ['contact_page', '联系信息'], ['corporate_fare', '机构组织'],
        ['apartment', '楼宇园区'], ['location_city', '城市治理'], ['work', '企业服务'], ['account_balance', '金融机构'],
        ['account_balance_wallet', '账户资金'], ['credit_card', '支付结算'], ['paid', '资金交易'], ['savings', '储蓄资产'],
        ['receipt_long', '票据账单'], ['request_quote', '报价采购'], ['trending_up', '经营趋势'], ['shopping_cart', '商业零售'],
        ['inventory_2', '仓储库存'], ['local_shipping', '物流运输'], ['train', '铁路交通'], ['subway', '轨道交通'],
        ['flight', '航空运输'], ['directions_boat', '水运港口'], ['two_wheeler', '骑行出行'], ['traffic', '交通管理'],
        ['route', '线路路径'], ['construction', '工程建设'], ['engineering', '工程技术'], ['precision_manufacturing', '智能制造'],
        ['electrical_services', '电力设施'], ['bolt', '能源电力'], ['eco', '生态环境'], ['recycling', '资源循环'],
        ['park', '园林绿化'], ['medical_services', '医疗服务'], ['local_hospital', '医疗机构'], ['science', '科研创新'],
        ['biotech', '生物科技'], ['menu_book', '文化教育'], ['museum', '文化场馆'], ['theater_comedy', '文艺演出'],
        ['sports_soccer', '体育服务'], ['home', '住房服务'], ['elderly', '养老服务'], ['child_care', '儿童服务'],
        ['restaurant', '餐饮服务'], ['hotel', '住宿服务'], ['agriculture', '农业农村'], ['forest', '林业资源'],
        ['pets', '动物管理'], ['mail', '邮件消息'], ['chat', '在线沟通'], ['forum', '社区交流'],
        ['notifications', '消息通知'], ['phone', '通信联络'], ['videocam', '视频资源'], ['photo_camera', '图片资源']
    ].map(function (item) { return { name: item[0], label: item[1] }; });

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character];
        });
    }

    function icon(name) {
        return '<span class="material-symbols-outlined" aria-hidden="true">' + escapeHtml(name) + '</span>';
    }

    function normalizeValue(value) {
        if (!value) return null;
        if (value.type === 'icon' && value.name) return { type: 'icon', name: value.name };
        var src = value.src || value.url;
        if ((value.type === 'image' || src) && src) return { type: 'image', src: src, name: value.name || '' };
        return null;
    }

    function normalizeValues(values) {
        if (!Array.isArray(values)) values = values ? [values] : [];
        return values.map(normalizeValue).filter(Boolean);
    }

    function getIconLabel(name) {
        var item = ICONS.find(function (candidate) { return candidate.name === name; });
        return item ? item.label : '图片';
    }

    function Picker(root, options) {
        this.root = root;
        this.options = {};
        this.values = [];
        this.open = false;
        this.keyword = '';
        this.page = 1;
        this.pendingIcon = '';
        this.handleClick = this.handleClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        root.addEventListener('click', this.handleClick);
        root.addEventListener('input', this.handleInput);
        root.addEventListener('change', this.handleChange);
        this.update(options);
    }

    Picker.prototype.update = function (options) {
        this.options = Object.assign({
            label: '图片',
            modalTitle: '选择图标',
            maxSizeMB: 5,
            onChange: function () {},
            onError: function () {}
        }, options || {});
        this.values = normalizeValues(this.options.values !== undefined ? this.options.values : this.options.value);
        this.render();
    };

    Picker.prototype.getFilteredIcons = function () {
        var keyword = this.keyword.trim().toLowerCase();
        if (!keyword) return ICONS;
        return ICONS.filter(function (item) {
            return item.label.indexOf(keyword) !== -1 || item.name.toLowerCase().indexOf(keyword) !== -1;
        });
    };

    Picker.prototype.getPageData = function () {
        var items = this.getFilteredIcons();
        var totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
        this.page = Math.min(totalPages, Math.max(1, this.page || 1));
        var start = (this.page - 1) * PAGE_SIZE;
        return { items: items, pageItems: items.slice(start, start + PAGE_SIZE), totalPages: totalPages };
    };

    Picker.prototype.renderPreviews = function () {
        return this.values.map(function (value, index) {
            if (value.type === 'image') {
                return '<div class="image-icon-picker-preview has-image"><img src="' + escapeHtml(value.src) + '" alt="' + escapeHtml(this.options.label) + '"><button type="button" aria-label="删除' + escapeHtml(this.options.label) + '" data-iip-remove="' + index + '">' + icon('close') + '</button></div>';
            }
            return '<div class="image-icon-picker-preview has-icon" role="img" aria-label="' + escapeHtml(getIconLabel(value.name)) + '图标">' + icon(value.name) + '<button type="button" aria-label="删除' + escapeHtml(this.options.label) + '" data-iip-remove="' + index + '">' + icon('close') + '</button></div>';
        }, this).join('');
    };

    Picker.prototype.renderIconOptions = function () {
        var pageData = this.getPageData();
        if (!pageData.items.length) {
            return '<div class="image-icon-picker-empty">' + icon('search_off') + '<strong>未找到匹配的图标</strong><span>请尝试输入其他关键词</span></div>';
        }
        return pageData.pageItems.map(function (item) {
            var active = item.name === this.pendingIcon;
            return '<button class="image-icon-picker-option' + (active ? ' active' : '') + '" type="button" data-iip-icon="' + escapeHtml(item.name) + '" aria-pressed="' + (active ? 'true' : 'false') + '">' + icon(item.name) + '<span>' + escapeHtml(item.label) + '</span></button>';
        }, this).join('');
    };

    Picker.prototype.renderPagination = function () {
        var pageData = this.getPageData();
        if (!pageData.items.length) return '';
        var pageButtons = '';
        for (var page = 1; page <= pageData.totalPages; page += 1) {
            pageButtons += '<button class="image-icon-picker-page-number' + (page === this.page ? ' active' : '') + '" type="button" data-iip-page="' + page + '"' + (page === this.page ? ' aria-current="page"' : '') + '>' + page + '</button>';
        }
        return '<div class="image-icon-picker-pagination"><span>共 ' + pageData.items.length + ' 个图标</span><div class="image-icon-picker-page-buttons">'
            + '<button class="image-icon-picker-page-nav" type="button" data-iip-page="prev"' + (this.page <= 1 ? ' disabled' : '') + '>' + icon('chevron_left') + '<span>上一页</span></button>'
            + pageButtons
            + '<button class="image-icon-picker-page-nav" type="button" data-iip-page="next"' + (this.page >= pageData.totalPages ? ' disabled' : '') + '><span>下一页</span>' + icon('chevron_right') + '</button>'
            + '</div></div>';
    };

    Picker.prototype.renderResults = function () {
        return '<div class="image-icon-picker-grid">' + this.renderIconOptions() + '</div>' + this.renderPagination();
    };

    Picker.prototype.renderModal = function () {
        if (!this.open) return '';
        return '<div class="image-icon-picker-backdrop" data-iip-backdrop>'
            + '<section class="image-icon-picker-modal" role="dialog" aria-modal="true" aria-label="' + escapeHtml(this.options.modalTitle) + '">'
            + '<header><h2>' + escapeHtml(this.options.modalTitle) + '</h2><button type="button" aria-label="关闭" data-iip-close>' + icon('close') + '</button></header>'
            + '<div class="image-icon-picker-modal-body">'
            + '<label class="image-icon-picker-search">' + icon('search') + '<input type="search" value="' + escapeHtml(this.keyword) + '" placeholder="搜索图标名称" autocomplete="off" data-iip-search><button type="button" aria-label="清除搜索" data-iip-clear-search' + (this.keyword ? '' : ' hidden') + '>' + icon('close') + '</button></label>'
            + '<div data-iip-results>' + this.renderResults() + '</div></div>'
            + '<footer><button class="image-icon-picker-footer-button" type="button" data-iip-close>' + icon('close') + '<span>取消</span></button><button class="image-icon-picker-footer-button primary" type="button" data-iip-confirm' + (this.pendingIcon ? '' : ' disabled') + '>' + icon('check') + '<span>确定</span></button></footer>'
            + '</section></div>';
    };

    Picker.prototype.render = function () {
        this.root.innerHTML = '<div class="image-icon-picker-control">' + this.renderPreviews()
            + '<button class="image-icon-picker-action" type="button" data-iip-upload>' + icon('add_photo_alternate') + '<span>上传图片</span></button>'
            + '<button class="image-icon-picker-action" type="button" data-iip-open>' + icon('grid_view') + '<span>选择图标</span></button>'
            + '<input type="file" accept="image/jpeg,image/png,.jpg,.jpeg,.png" multiple hidden data-iip-file></div>'
            + this.renderModal();
    };

    Picker.prototype.refreshResults = function () {
        var results = this.root.querySelector('[data-iip-results]');
        if (results) results.innerHTML = this.renderResults();
    };

    Picker.prototype.emitChange = function () {
        this.options.onChange(normalizeValues(this.values));
    };

    Picker.prototype.close = function () {
        this.open = false;
        this.keyword = '';
        this.page = 1;
        this.render();
    };

    Picker.prototype.handleClick = function (event) {
        if (event.target.closest('[data-iip-upload]')) {
            var input = this.root.querySelector('[data-iip-file]');
            if (input) input.click();
            return;
        }
        if (event.target.closest('[data-iip-open]')) {
            this.pendingIcon = '';
            this.keyword = '';
            this.page = 1;
            this.open = true;
            this.render();
            return;
        }
        var removeButton = event.target.closest('[data-iip-remove]');
        if (removeButton) {
            var removeIndex = parseInt(removeButton.dataset.iipRemove, 10);
            if (removeIndex >= 0 && removeIndex < this.values.length) this.values.splice(removeIndex, 1);
            this.emitChange();
            this.render();
            return;
        }
        if (event.target.closest('[data-iip-close]')) { this.close(); return; }
        var backdrop = event.target.closest('[data-iip-backdrop]');
        if (backdrop && event.target === backdrop) { this.close(); return; }
        var clearSearch = event.target.closest('[data-iip-clear-search]');
        if (clearSearch) {
            this.keyword = '';
            this.page = 1;
            var search = this.root.querySelector('[data-iip-search]');
            if (search) search.value = '';
            clearSearch.hidden = true;
            this.refreshResults();
            if (search) search.focus();
            return;
        }
        var option = event.target.closest('[data-iip-icon]');
        if (option) {
            this.pendingIcon = option.dataset.iipIcon;
            this.root.querySelectorAll('[data-iip-icon]').forEach(function (button) {
                var active = button === option;
                button.classList.toggle('active', active);
                button.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
            var confirm = this.root.querySelector('[data-iip-confirm]');
            if (confirm) confirm.disabled = false;
            return;
        }
        var pageButton = event.target.closest('[data-iip-page]');
        if (pageButton && !pageButton.disabled) {
            var pageData = this.getPageData();
            var target = pageButton.dataset.iipPage;
            if (target === 'prev') this.page -= 1;
            else if (target === 'next') this.page += 1;
            else this.page = parseInt(target, 10) || 1;
            this.page = Math.min(pageData.totalPages, Math.max(1, this.page));
            this.refreshResults();
            return;
        }
        if (event.target.closest('[data-iip-confirm]') && this.pendingIcon) {
            this.values.push({ type: 'icon', name: this.pendingIcon });
            this.emitChange();
            this.close();
        }
    };

    Picker.prototype.handleInput = function (event) {
        if (!event.target.matches('[data-iip-search]')) return;
        this.keyword = event.target.value;
        this.page = 1;
        var clear = this.root.querySelector('[data-iip-clear-search]');
        if (clear) clear.hidden = !this.keyword;
        this.refreshResults();
    };

    Picker.prototype.handleChange = function (event) {
        if (!event.target.matches('[data-iip-file]')) return;
        var input = event.target;
        var files = Array.prototype.slice.call(input.files || []);
        if (!files.length) return;
        var maxBytes = this.options.maxSizeMB * 1024 * 1024;
        var invalidFormat = false;
        var invalidSize = false;
        var acceptedFiles = files.filter(function (file) {
            var extensionValid = /\.(jpe?g|png)$/i.test(file.name || '');
            var mimeValid = !file.type || /^image\/(jpeg|png)$/.test(file.type);
            if (!extensionValid || !mimeValid) {
                invalidFormat = true;
                return false;
            }
            if (file.size > maxBytes) {
                invalidSize = true;
                return false;
            }
            return true;
        });

        input.value = '';
        var validationMessage = invalidFormat
            ? '部分' + this.options.label + '未上传：仅支持 jpg、jpeg、png 格式。'
            : (invalidSize ? '部分' + this.options.label + '未上传：单张不能超过 ' + this.options.maxSizeMB + 'MB。' : '');
        if (!acceptedFiles.length) {
            if (validationMessage) this.options.onError(validationMessage);
            return;
        }

        Promise.all(acceptedFiles.map(function (file) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                reader.addEventListener('load', function () {
                    resolve({ type: 'image', src: reader.result, name: file.name });
                });
                reader.addEventListener('error', reject);
                reader.readAsDataURL(file);
            });
        })).then(function (values) {
            this.values = this.values.concat(values);
            this.emitChange();
            this.render();
            if (validationMessage) this.options.onError(validationMessage);
        }.bind(this)).catch(function () {
            this.options.onError('图片读取失败，请重新选择。');
        }.bind(this));
    };

    function mount(root, options) {
        if (!root) return null;
        if (root.__imageIconPicker) {
            root.__imageIconPicker.update(options);
            return root.__imageIconPicker;
        }
        root.__imageIconPicker = new Picker(root, options);
        return root.__imageIconPicker;
    }

    function renderDisplay(value, options) {
        var normalized = normalizeValue(value);
        if (!normalized) return '';
        options = options || {};
        var className = 'image-icon-picker-display' + (options.className ? ' ' + options.className : '');
        if (normalized.type === 'image') {
            return '<span class="' + escapeHtml(className) + '"><img src="' + escapeHtml(normalized.src) + '" alt="' + escapeHtml(options.alt || '') + '"></span>';
        }
        return '<span class="' + escapeHtml(className) + ' is-icon" role="img" aria-label="' + escapeHtml(options.alt || getIconLabel(normalized.name)) + '">' + icon(normalized.name) + '</span>';
    }

    window.ImageIconPicker = {
        icons: ICONS.slice(),
        mount: mount,
        renderDisplay: renderDisplay
    };
})();
