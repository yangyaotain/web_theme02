(function () {
    'use strict';

    var bridge = window.dataIsland;
    var metadataView = document.querySelector('[data-island-view="metadata"]');
    if (!bridge || !metadataView) return;

    var services = [
        {
            id: 'park-overview',
            name: '园区企业经营概览查询服务',
            registry: '外部注册数据服务_7284',
            org: '深圳市龙岗区智城大数据有限公司',
            updated: '2026-08-08 15:26:40',
            creator: '李晨',
            path: '/api/island/v1/park-enterprise/overview',
            upstreamPath: '/api/v1/park-enterprise/operation-summary',
            callUrl: 'http://10.32.18.46:8080/gateway/api/island/v1/park-enterprise/overview',
            description: '提供龙岗区重点园区企业数量、经营活跃率等月度概览指标查询。',
            average: '12(ms)', frequency: '100 (次/秒)', cache: '不启动', auth: 'key-auth', balance: '轮询', node: '10.32.18.46:8080',
            params: [
                { name: 'parkCode', type: '字符串', required: '是', example: 'LG-BANTIAN-01', desc: '园区唯一编码' },
                { name: 'statMonth', type: '字符串', required: '是', example: '2026-07', desc: '统计月份，格式YYYY-MM' },
                { name: 'includeTrend', type: '布尔类型', required: '否', example: 'true', desc: '是否返回近6个月趋势' }
            ],
            body: [],
            headers: [
                { name: 'X-Source-System', type: '字符串', required: '是', example: 'data-island', desc: '调用方系统标识' },
                { name: 'X-Request-Id', type: '字符串', required: '否', example: 'req-20260810-00128', desc: '请求链路追踪标识' },
                { name: 'Accept', type: '字符串', required: '否', example: 'application/json', desc: '响应数据格式' }
            ],
            returns: [
                { name: 'code', type: '整数', desc: '业务状态码，0表示成功' },
                { name: 'message', type: '字符串', desc: '业务处理结果说明' },
                { name: 'data.parkCode', type: '字符串', desc: '园区唯一编码' },
                { name: 'data.statMonth', type: '字符串', desc: '统计月份' },
                { name: 'data.enterpriseCount', type: '整数', desc: '园区企业总数' },
                { name: 'data.activeEnterpriseCount', type: '整数', desc: '经营活跃企业数' },
                { name: 'data.activeRate', type: '数字', desc: '企业经营活跃率，单位%' },
                { name: 'data.monthOnMonth', type: '数字', desc: '企业数量环比变化率，单位%' },
                { name: 'data.trend', type: '对象数组', desc: '近6个月经营活跃率趋势' }
            ],
            response: { code: 0, message: 'success', data: { parkCode: 'LG-BANTIAN-01', statMonth: '2026-07', enterpriseCount: 386, activeEnterpriseCount: 358, activeRate: 92.75, monthOnMonth: 3.21, trend: [{ month: '2026-02', activeRate: 88.42 }, { month: '2026-03', activeRate: 89.76 }, { month: '2026-04', activeRate: 90.15 }, { month: '2026-05', activeRate: 91.34 }, { month: '2026-06', activeRate: 91.8 }, { month: '2026-07', activeRate: 92.75 }] } }
        },
        {
            id: 'enterprise-activity',
            name: '重点企业活跃度统计服务',
            registry: '外部注册数据服务_8163',
            org: '深圳市龙岗区产业服务集团有限公司',
            updated: '2026-08-07 11:08:25',
            creator: '周妍',
            path: '/api/island/v1/key-enterprise/activity',
            upstreamPath: '/api/v1/enterprise/activity-statistics',
            callUrl: 'http://10.32.18.47:8080/gateway/api/island/v1/key-enterprise/activity',
            description: '提供龙岗区重点企业经营活跃度与月度变化趋势查询。',
            average: '18(ms)', frequency: '80 (次/秒)', cache: '启动（5分钟）', auth: 'key-auth', balance: '一致性哈希', node: '10.32.18.47:8080',
            params: [
                { name: 'industryCode', type: '字符串', required: '否', example: 'C39', desc: '国民经济行业分类编码' },
                { name: 'streetCode', type: '字符串', required: '否', example: '440307013', desc: '街道行政区划编码' },
                { name: 'statMonth', type: '字符串', required: '是', example: '2026-07', desc: '统计月份，格式YYYY-MM' },
                { name: 'minActiveScore', type: '整数', required: '否', example: '70', desc: '最低活跃度评分' }
            ],
            body: [],
            headers: [
                { name: 'X-Source-System', type: '字符串', required: '是', example: 'industry-service', desc: '调用方系统标识' },
                { name: 'X-Request-Id', type: '字符串', required: '否', example: 'req-20260810-00153', desc: '请求链路追踪标识' },
                { name: 'Accept', type: '字符串', required: '否', example: 'application/json', desc: '响应数据格式' }
            ],
            returns: [
                { name: 'code', type: '整数', desc: '业务状态码，0表示成功' },
                { name: 'message', type: '字符串', desc: '业务处理结果说明' },
                { name: 'data.statMonth', type: '字符串', desc: '统计月份' },
                { name: 'data.enterpriseCount', type: '整数', desc: '符合条件的重点企业数' },
                { name: 'data.averageActiveScore', type: '数字', desc: '平均活跃度评分' },
                { name: 'data.highActivityCount', type: '整数', desc: '高活跃企业数量' },
                { name: 'data.industryDistribution', type: '对象数组', desc: '行业活跃度分布' }
            ],
            response: { code: 0, message: 'success', data: { statMonth: '2026-07', enterpriseCount: 126, averageActiveScore: 84.6, highActivityCount: 98, industryDistribution: [{ industryCode: 'C39', industry: '计算机、通信和其他电子设备制造业', enterpriseCount: 47, averageActiveScore: 88.2 }, { industryCode: 'I65', industry: '软件和信息技术服务业', enterpriseCount: 36, averageActiveScore: 86.7 }, { industryCode: 'M73', industry: '研究和试验发展', enterpriseCount: 24, averageActiveScore: 81.5 }, { industryCode: 'L72', industry: '商务服务业', enterpriseCount: 19, averageActiveScore: 78.9 }] } }
        },
        {
            id: 'industry-space',
            name: '产业空间资源检索服务',
            registry: '外部注册数据服务_9057',
            org: '深圳市龙岗区产业空间运营有限公司',
            updated: '2026-08-06 09:42:18',
            creator: '陈昊',
            path: '/api/island/v1/industry-space/search',
            upstreamPath: '/api/v1/industry-space/resource-search',
            callUrl: 'http://10.32.18.48:8080/gateway/api/island/v1/industry-space/search',
            description: '提供产业园区、产业用房与可招商空间资源检索。',
            average: '23(ms)', frequency: '60 (次/秒)', cache: '启动（10分钟）', auth: 'key-auth', balance: '最小连接数', node: '10.32.18.48:8080',
            params: [
                { name: 'streetCode', type: '字符串', required: '否', example: '440307013', desc: '街道行政区划编码' },
                { name: 'spaceType', type: '字符串', required: '否', example: 'INDUSTRIAL_PARK', desc: '空间类型' },
                { name: 'minArea', type: '整数', required: '否', example: '500', desc: '最小可用面积，单位㎡' },
                { name: 'maxRent', type: '数字', required: '否', example: '65', desc: '最高租金，单位元/㎡/月' },
                { name: 'pageNo', type: '整数', required: '否', example: '1', desc: '页码' },
                { name: 'pageSize', type: '整数', required: '否', example: '10', desc: '每页条数' }
            ],
            body: [],
            headers: [
                { name: 'X-Source-System', type: '字符串', required: '是', example: 'investment-platform', desc: '调用方系统标识' },
                { name: 'X-Request-Id', type: '字符串', required: '否', example: 'req-20260810-00176', desc: '请求链路追踪标识' },
                { name: 'Accept', type: '字符串', required: '否', example: 'application/json', desc: '响应数据格式' }
            ],
            returns: [
                { name: 'code', type: '整数', desc: '业务状态码，0表示成功' },
                { name: 'message', type: '字符串', desc: '业务处理结果说明' },
                { name: 'data.total', type: '整数', desc: '符合条件的空间资源总数' },
                { name: 'data.pageNo', type: '整数', desc: '当前页码' },
                { name: 'data.pageSize', type: '整数', desc: '每页条数' },
                { name: 'data.records', type: '对象数组', desc: '产业空间资源列表' },
                { name: 'data.records[].spaceCode', type: '字符串', desc: '空间资源编码' },
                { name: 'data.records[].availableArea', type: '数字', desc: '可用面积，单位㎡' },
                { name: 'data.records[].monthlyRent', type: '数字', desc: '月租金，单位元/㎡' }
            ],
            response: { code: 0, message: 'success', data: { total: 28, pageNo: 1, pageSize: 10, records: [{ spaceCode: 'LG-SP-202607-018', spaceName: '坂田数字产业基地A栋', streetName: '坂田街道', spaceType: 'INDUSTRIAL_PARK', availableArea: 1260, monthlyRent: 58, availableDate: '2026-08-15' }, { spaceCode: 'LG-SP-202607-024', spaceName: '宝龙科技城研发楼3座', streetName: '宝龙街道', spaceType: 'R_AND_D_BUILDING', availableArea: 860, monthlyRent: 62, availableDate: '2026-09-01' }, { spaceCode: 'LG-SP-202608-006', spaceName: '平湖智造园2号厂房', streetName: '平湖街道', spaceType: 'STANDARD_FACTORY', availableArea: 2180, monthlyRent: 46, availableDate: '2026-08-20' }] } }
        }
    ];

    var files = [
        { id: 'park-report', name: '龙岗区重点园区企业经营月报_202607.xlsx', size: '12.48 KB', format: 'xlsx', source: '文件上传', modified: '2026-08-08 14:26:15', maintained: '--', project: '--', status: 'unaligned' },
        { id: 'space-map', name: '坂田片区产业空间分布图.png', size: '386.21 KB', format: 'png', source: '文件上传', modified: '2026-08-07 16:18:32', maintained: '2026-08-08 10:05:11', project: '园区经营分析', status: 'manual', preview: 'images/ai-longgang-infographic.jpg' },
        { id: 'authorization-note', name: '龙岗区公共数据授权说明.pdf', size: '842.35 KB', format: 'pdf', source: '文件上传', modified: '2026-08-06 09:37:46', maintained: '2026-08-08 09:12:24', project: '公共数据服务', status: 'smart' }
    ];

    var selectedServiceId = services[0].id;
    var selectedFileId = '';
    var fileFilter = 'all';
    var sortState = { key: '', asc: true };
    var previewScale = 1;
    var previewRotation = 0;

    var serviceTree = document.querySelector('[data-metadata-service-tree]');
    var storageNode = document.querySelector('[data-metadata-node="storage"]');
    var storagePanel = document.querySelector('[data-metadata-panel="storage"]');
    var servicePanel = document.querySelector('[data-metadata-panel="service"]');
    var nodeMenu = document.querySelector('[data-metadata-node-menu]');
    var fileBody = document.querySelector('[data-metadata-file-body]');
    var fileCount = document.querySelector('[data-metadata-file-count]');
    var searchInput = document.querySelector('[data-metadata-search]');
    var moveMask = document.querySelector('[data-metadata-move-mask]');
    var deleteMask = document.querySelector('[data-metadata-delete-mask]');
    var previewMask = document.querySelector('[data-metadata-preview-mask]');
    var previewImage = document.querySelector('[data-metadata-preview-image]');
    var drawerMask = document.querySelector('[data-metadata-drawer-mask]');

    function escapeHTML(value) {
        return String(value == null ? '' : value).replace(/[&<>\"]/g, function (char) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char];
        });
    }

    function formatFileSize(bytes) {
        if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + ' MB';
        if (bytes >= 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return bytes + ' B';
    }

    function setMask(mask, open) {
        mask.classList.toggle('show', open);
        mask.setAttribute('aria-hidden', String(!open));
        document.body.style.overflow = open ? 'hidden' : '';
    }

    function closeNodeMenu() {
        nodeMenu.classList.remove('show');
        document.querySelectorAll('[data-metadata-node-more][aria-expanded="true"]').forEach(function (button) {
            button.setAttribute('aria-expanded', 'false');
        });
    }

    function renderServiceTree(keyword) {
        var normalized = (keyword || '').trim().toLowerCase();
        var matched = services.filter(function (service) {
            return !normalized || service.name.toLowerCase().indexOf(normalized) >= 0 || service.registry.toLowerCase().indexOf(normalized) >= 0;
        });
        serviceTree.innerHTML = matched.map(function (service) {
            var active = !storagePanel.hidden && false;
            active = service.id === selectedServiceId && !servicePanel.hidden;
            return '<div class="metadata-tree-item' + (active ? ' active' : '') + '" role="button" tabindex="0" data-metadata-node="service" data-service-id="' + escapeHTML(service.id) + '" data-search-name="' + escapeHTML(service.name) + '">' +
                '<span class="material-symbols-rounded" aria-hidden="true">link</span><span class="tree-label">' + escapeHTML(service.name) + '</span>' +
                '<button class="metadata-node-more" type="button" data-metadata-node-more aria-expanded="false" aria-label="更多服务操作"><span class="material-symbols-rounded" aria-hidden="true">more_vert</span></button>' +
            '</div>';
        }).join('');
    }

    function serviceById(id) {
        return services.find(function (service) { return service.id === id; });
    }

    function emptyTableRow(colspan) {
        return '<tr class="metadata-empty-row"><td colspan="' + colspan + '"><div class="metadata-empty-content"><span class="material-symbols-rounded" aria-hidden="true">inbox</span><span>暂无数据</span></div></td></tr>';
    }

    function renderInfoParamRows(rows) {
        if (!rows || !rows.length) return emptyTableRow(5);
        return rows.map(function (row) {
            return '<tr><td>' + escapeHTML(row.name) + '</td><td>' + escapeHTML(row.type) + '</td><td>' + escapeHTML(row.required) + '</td><td>' + escapeHTML(row.example) + '</td><td>' + escapeHTML(row.desc) + '</td></tr>';
        }).join('');
    }

    function renderTestParamRows(rows) {
        if (!rows || !rows.length) return emptyTableRow(5);
        return rows.map(function (row) {
            return '<tr><td>' + escapeHTML(row.name) + '</td><td>' + escapeHTML(row.type) + '</td><td>' + escapeHTML(row.required) + '</td><td>' + escapeHTML(row.desc) + '</td><td><input class="metadata-test-param-input" type="text" value="' + escapeHTML(row.example) + '" aria-label="' + escapeHTML(row.name) + '参数值"></td></tr>';
        }).join('');
    }

    function renderReturnRows(rows) {
        if (!rows || !rows.length) return emptyTableRow(3);
        return rows.map(function (row) {
            return '<tr><td>' + escapeHTML(row.name) + '</td><td>' + escapeHTML(row.type) + '</td><td>' + escapeHTML(row.desc) + '</td></tr>';
        }).join('');
    }

    function serviceExampleUrl(service) {
        var query = (service.params || []).map(function (item) {
            return encodeURIComponent(item.name) + '=' + encodeURIComponent(item.example);
        }).join('&');
        return service.callUrl + (query ? '?' + query : '');
    }

    function renderCodeLines(block, content, source) {
        block.classList.add('has-lines');
        content.innerHTML = source.split('\n').map(function (line, index) {
            return '<span class="metadata-code-line"><i>' + (index + 1) + '</i><code>' + escapeHTML(line) + '</code></span>';
        }).join('');
    }

    function fileById(id) {
        return files.find(function (file) { return file.id === id; });
    }

    function setActiveTreeNode(type, id) {
        storageNode.classList.toggle('active', type === 'storage');
        document.querySelectorAll('[data-metadata-node="service"]').forEach(function (node) {
            node.classList.toggle('active', type === 'service' && node.dataset.serviceId === id);
        });
    }

    function showStorage() {
        storagePanel.hidden = false;
        servicePanel.hidden = true;
        setActiveTreeNode('storage');
        closeNodeMenu();
        document.querySelector('.metadata-detail').scrollTop = 0;
    }

    function updateServiceContent(service) {
        if (!service) return;
        var exampleUrl = serviceExampleUrl(service);
        var responseText = JSON.stringify(service.response, null, 2);
        document.querySelector('[data-metadata-service-title]').textContent = service.name;
        document.querySelector('[data-service-card-title]').textContent = service.name;
        document.querySelector('[data-service-card-subtitle]').textContent = service.registry;
        document.querySelector('[data-service-org]').textContent = service.org;
        document.querySelector('[data-service-updated]').textContent = service.updated;
        document.querySelector('[data-service-creator]').textContent = service.creator;
        document.querySelector('[data-service-average]').textContent = service.average;
        document.querySelector('[data-service-frequency]').textContent = service.frequency;
        document.querySelector('[data-service-call-url]').textContent = service.callUrl;
        document.querySelector('[data-service-cache]').textContent = service.cache;
        document.querySelector('[data-service-auth]').textContent = service.auth;
        document.querySelector('[data-service-balance]').textContent = service.balance;
        document.querySelector('[data-service-upstream-path]').textContent = service.upstreamPath;
        document.querySelector('[data-service-node]').textContent = service.node;
        document.querySelector('[data-service-example-url]').textContent = exampleUrl;
        document.querySelector('[data-service-test-url]').value = exampleUrl;
        ['params', 'body', 'headers'].forEach(function (type) {
            document.querySelector('[data-service-param-body="' + type + '"]').innerHTML = renderInfoParamRows(service[type]);
            document.querySelector('[data-service-test-param-body="' + type + '"]').innerHTML = renderTestParamRows(service[type]);
        });
        document.querySelector('[data-service-return-body]').innerHTML = renderReturnRows(service.returns);
        renderCodeLines(document.querySelector('[data-service-return-example]'), document.querySelector('[data-service-return-code]'), responseText);
        var testResult = document.querySelector('[data-metadata-test-result]');
        testResult.classList.remove('has-lines');
        testResult.textContent = '{}';
    }

    function showService(id) {
        var service = serviceById(id);
        if (!service) return;
        selectedServiceId = id;
        storagePanel.hidden = true;
        servicePanel.hidden = false;
        updateServiceContent(service);
        setActiveTreeNode('service', id);
        closeNodeMenu();
        document.querySelector('.metadata-detail').scrollTop = 0;
    }

    function renderFiles() {
        var visible = files.filter(function (file) { return fileFilter === 'all' || file.status === fileFilter; });
        if (sortState.key) {
            visible = visible.slice().sort(function (a, b) {
                var left = a[sortState.key] === '--' ? '' : a[sortState.key];
                var right = b[sortState.key] === '--' ? '' : b[sortState.key];
                var compared = left.localeCompare(right, 'zh-CN');
                return sortState.asc ? compared : -compared;
            });
        }
        fileCount.textContent = String(visible.length);
        if (!visible.length) {
            fileBody.innerHTML = '<tr class="metadata-empty-row"><td colspan="8"><div class="metadata-empty-content"><span class="material-symbols-rounded" aria-hidden="true">inbox</span><span>暂无数据</span></div></td></tr>';
            return;
        }
        fileBody.innerHTML = visible.map(function (file) {
            return '<tr data-file-id="' + escapeHTML(file.id) + '">' +
                '<td><span class="file-name-cell"><span class="material-symbols-rounded" aria-hidden="true">draft</span><span title="' + escapeHTML(file.name) + '">' + escapeHTML(file.name) + '</span></span></td>' +
                '<td>' + escapeHTML(file.size) + '</td><td>' + escapeHTML(file.format) + '</td><td>' + escapeHTML(file.source) + '</td>' +
                '<td>' + escapeHTML(file.modified) + '</td><td>' + escapeHTML(file.maintained) + '</td><td>' + escapeHTML(file.project) + '</td>' +
                '<td><span class="metadata-row-actions"><button type="button" data-file-action="preview">预览</button><button type="button" data-file-action="download">下载</button><button type="button" data-file-action="maintain">维护</button><button type="button" data-file-action="more" aria-expanded="false">更多<span class="material-symbols-rounded" aria-hidden="true">expand_more</span></button></span></td>' +
            '</tr>';
        }).join('');
    }

    function updatePreviewTransform() {
        previewImage.style.transform = 'scale(' + previewScale + ') rotate(' + previewRotation + 'deg)';
    }

    function openPreview(file) {
        if (!file.preview) {
            bridge.showToast('当前文件格式暂不支持图片预览', true);
            return;
        }
        previewImage.src = file.preview;
        previewImage.alt = file.name + '预览';
        previewScale = 1;
        previewRotation = 0;
        updatePreviewTransform();
        setMask(previewMask, true);
    }

    function downloadFile(file) {
        var link = document.createElement('a');
        if (file.preview) {
            link.href = file.preview;
        } else {
            var blob = new Blob(['数据岛系统模拟文件：' + file.name], { type: 'text/plain;charset=utf-8' });
            link.href = URL.createObjectURL(blob);
            window.setTimeout(function () { URL.revokeObjectURL(link.href); }, 1200);
        }
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    function updateMaintenanceCounters() {
        document.querySelectorAll('[data-maintain-field]').forEach(function (field) {
            field.parentElement.querySelector('.metadata-count').textContent = field.value.length + '/' + field.maxLength;
        });
    }

    function openMaintenance(file) {
        selectedFileId = file.id;
        document.querySelector('[data-maintain-file-name]').textContent = file.name;
        document.querySelector('[data-maintain-file-meta]').textContent = file.format + ' · ' + file.size;
        var metadata = file.metadata || {};
        document.querySelectorAll('[data-maintain-field]').forEach(function (field) { field.value = metadata[field.dataset.maintainField] || ''; });
        updateMaintenanceCounters();
        setMask(drawerMask, true);
    }

    function autoFillMaintenance() {
        var file = fileById(selectedFileId);
        if (!file) return;
        var title = file.name.replace(/\.[^.]+$/, '');
        var values = {
            created: file.modified.slice(0, 10),
            type: file.format === 'png' ? '产业空间分布图' : file.format === 'xlsx' ? '园区经营统计报表' : '公共数据授权说明',
            title: title,
            creator: '深圳市龙岗区智城大数据有限公司',
            subject: '龙岗区;园区企业;产业空间',
            identifier: 'LG-META-' + file.id.toUpperCase(),
            description: title + '，用于数据岛目录检索、授权和服务编排。'
        };
        document.querySelectorAll('[data-maintain-field]').forEach(function (field) { field.value = values[field.dataset.maintainField] || ''; });
        updateMaintenanceCounters();
        bridge.showToast('元数据已智能补齐');
    }

    function confirmMaintenance() {
        var file = fileById(selectedFileId);
        if (!file) return;
        file.metadata = {};
        document.querySelectorAll('[data-maintain-field]').forEach(function (field) { file.metadata[field.dataset.maintainField] = field.value.trim(); });
        file.status = 'manual';
        file.maintained = '2026-08-10 10:30:00';
        setMask(drawerMask, false);
        renderFiles();
        bridge.showToast('文件元数据已保存');
    }

    function applyTreeSearch() {
        var keyword = searchInput.value.trim().toLowerCase();
        var storageMatched = !keyword || 'default-oss 对象存储'.indexOf(keyword) >= 0;
        storageNode.hidden = !storageMatched;
        renderServiceTree(keyword);
        var apiGroup = document.querySelector('[data-metadata-group="api"]');
        apiGroup.hidden = Boolean(keyword) && !serviceTree.children.length && '服务平台api'.indexOf(keyword) < 0;
    }

    renderServiceTree('');
    renderFiles();

    document.querySelectorAll('[data-metadata-group-toggle]').forEach(function (row) {
        row.addEventListener('click', function () { row.closest('.metadata-tree-group').classList.toggle('collapsed'); });
    });

    storageNode.addEventListener('click', showStorage);
    serviceTree.addEventListener('click', function (event) {
        var more = event.target.closest('[data-metadata-node-more]');
        var node = event.target.closest('[data-metadata-node="service"]');
        if (!node) return;
        if (more) {
            event.stopPropagation();
            selectedServiceId = node.dataset.serviceId;
            showService(selectedServiceId);
            var rect = more.getBoundingClientRect();
            nodeMenu.style.left = Math.max(8, rect.right - 82) + 'px';
            nodeMenu.style.top = rect.bottom + 5 + 'px';
            var open = !nodeMenu.classList.contains('show');
            closeNodeMenu();
            if (open) {
                nodeMenu.classList.add('show');
                more.setAttribute('aria-expanded', 'true');
            }
            return;
        }
        showService(node.dataset.serviceId);
    });
    serviceTree.addEventListener('keydown', function (event) {
        if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-metadata-node="service"]')) {
            event.preventDefault();
            showService(event.target.dataset.serviceId);
        }
    });

    document.querySelector('[data-metadata-search-button]').addEventListener('click', applyTreeSearch);
    searchInput.addEventListener('keydown', function (event) { if (event.key === 'Enter') { event.preventDefault(); applyTreeSearch(); } });
    document.querySelector('[data-metadata-refresh]').addEventListener('click', function () { searchInput.value = ''; applyTreeSearch(); bridge.showToast('元数据目录已刷新'); });
    document.querySelector('[data-metadata-add]').addEventListener('click', function () { bridge.showToast('当前没有可新增的目录类型'); });

    document.querySelectorAll('[data-file-status]').forEach(function (button) {
        button.addEventListener('click', function () {
            fileFilter = button.dataset.fileStatus;
            document.querySelectorAll('[data-file-status]').forEach(function (item) { item.classList.toggle('active', item === button); });
            renderFiles();
        });
    });

    document.querySelectorAll('[data-file-sort]').forEach(function (button) {
        button.addEventListener('click', function () {
            var key = button.dataset.fileSort;
            sortState.asc = sortState.key === key ? !sortState.asc : true;
            sortState.key = key;
            renderFiles();
        });
    });

    fileBody.addEventListener('click', function (event) {
        var action = event.target.closest('[data-file-action]');
        var row = event.target.closest('[data-file-id]');
        if (!action || !row) return;
        var file = fileById(row.dataset.fileId);
        if (action.dataset.fileAction === 'preview') openPreview(file);
        else if (action.dataset.fileAction === 'download') downloadFile(file);
        else if (action.dataset.fileAction === 'maintain') openMaintenance(file);
        else if (action.dataset.fileAction === 'more') action.setAttribute('aria-expanded', String(action.getAttribute('aria-expanded') !== 'true'));
    });

    document.querySelector('[data-metadata-align-all]').addEventListener('click', function () {
        var changed = 0;
        files.forEach(function (file) {
            if (file.status === 'unaligned') { file.status = 'smart'; file.maintained = '2026-08-10 10:20:00'; changed += 1; }
        });
        renderFiles();
        bridge.showToast(changed ? '元数据智能补齐完成' : '当前文件均已补齐');
    });

    document.querySelectorAll('[data-metadata-service-tab]').forEach(function (button) {
        button.addEventListener('click', function () {
            document.querySelectorAll('[data-metadata-service-tab]').forEach(function (item) { item.classList.toggle('active', item === button); });
            document.querySelectorAll('[data-metadata-service-view]').forEach(function (view) { view.hidden = view.dataset.metadataServiceView !== button.dataset.metadataServiceTab; });
        });
    });

    document.querySelectorAll('[data-metadata-param-tabs]').forEach(function (tabset) {
        tabset.addEventListener('click', function (event) {
            var button = event.target.closest('[data-metadata-param-tab]');
            if (!button) return;
            tabset.querySelectorAll('[data-metadata-param-tab]').forEach(function (item) { item.classList.toggle('active', item === button); });
            var isTest = tabset.dataset.metadataParamTabs === 'test';
            var selector = isTest ? '[data-metadata-test-param-panel]' : '[data-metadata-param-panel]';
            document.querySelectorAll(selector).forEach(function (panel) {
                var value = isTest ? panel.dataset.metadataTestParamPanel : panel.dataset.metadataParamPanel;
                panel.hidden = value !== button.dataset.metadataParamTab;
            });
        });
    });

    function copyText(value) {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(value).catch(function () {});
        bridge.showToast('内容已复制');
    }
    document.querySelectorAll('[data-copy-target]').forEach(function (button) {
        button.addEventListener('click', function () {
            var target = button.dataset.copyTarget;
            var value = target === 'path' ? document.querySelector('[data-service-upstream-path]').textContent : target === 'example' ? document.querySelector('[data-service-example-url]').textContent : document.querySelector('[data-service-call-url]').textContent;
            copyText(value);
        });
    });
    document.querySelector('[data-copy-return]').addEventListener('click', function () {
        var service = serviceById(selectedServiceId);
        copyText(JSON.stringify(service.response, null, 2));
    });

    document.querySelector('[data-metadata-test-api]').addEventListener('click', function (event) {
        var button = event.currentTarget;
        button.disabled = true;
        button.textContent = '测试中...';
        window.setTimeout(function () {
            var service = serviceById(selectedServiceId);
            var result = JSON.stringify(service.response, null, 2);
            var resultElement = document.querySelector('[data-metadata-test-result]');
            renderCodeLines(resultElement, resultElement, result);
            button.disabled = false;
            button.textContent = '测试接口';
            bridge.showToast('测试成功');
        }, 520);
    });

    nodeMenu.addEventListener('click', function (event) {
        var action = event.target.closest('[data-metadata-node-action]');
        if (!action) return;
        closeNodeMenu();
        var service = serviceById(selectedServiceId);
        if (action.dataset.metadataNodeAction === 'edit') bridge.openApiWizard('metadata', service);
        else if (action.dataset.metadataNodeAction === 'move') setMask(moveMask, true);
        else if (action.dataset.metadataNodeAction === 'delete') setMask(deleteMask, true);
    });

    document.querySelectorAll('[data-close-metadata-move]').forEach(function (button) { button.addEventListener('click', function () { setMask(moveMask, false); }); });
    document.querySelector('[data-confirm-metadata-move]').addEventListener('click', function () { setMask(moveMask, false); bridge.showToast('服务已移动到“服务平台API”'); });
    document.querySelectorAll('[data-close-metadata-delete]').forEach(function (button) { button.addEventListener('click', function () { setMask(deleteMask, false); }); });
    document.querySelector('[data-confirm-metadata-delete]').addEventListener('click', function () {
        services = services.filter(function (service) { return service.id !== selectedServiceId; });
        setMask(deleteMask, false);
        renderServiceTree('');
        showStorage();
        bridge.showToast('服务已删除');
    });

    document.querySelector('[data-close-metadata-preview]').addEventListener('click', function () { setMask(previewMask, false); });
    document.querySelector('[data-metadata-preview-mask]').addEventListener('click', function (event) { if (event.target === previewMask) setMask(previewMask, false); });
    document.querySelectorAll('[data-preview-tool]').forEach(function (button) {
        button.addEventListener('click', function () {
            var tool = button.dataset.previewTool;
            if (tool === 'rotate-left') previewRotation -= 90;
            else if (tool === 'rotate-right') previewRotation += 90;
            else if (tool === 'zoom-in') previewScale = Math.min(2.5, previewScale + .2);
            else if (tool === 'zoom-out') previewScale = Math.max(.4, previewScale - .2);
            else if (tool === 'reset') { previewScale = 1; previewRotation = 0; }
            else if (tool === 'fullscreen') {
                if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
                else if (previewMask.requestFullscreen) previewMask.requestFullscreen();
            }
            updatePreviewTransform();
        });
    });

    document.querySelectorAll('[data-close-metadata-drawer]').forEach(function (button) { button.addEventListener('click', function () { setMask(drawerMask, false); }); });
    document.querySelector('[data-maintain-auto-fill]').addEventListener('click', autoFillMaintenance);
    document.querySelector('[data-confirm-metadata-drawer]').addEventListener('click', confirmMaintenance);
    document.querySelectorAll('[data-maintain-field]').forEach(function (field) { field.addEventListener('input', updateMaintenanceCounters); });

    document.addEventListener('data-island-uploaded', function (event) {
        var uploaded = event.detail && event.detail.file;
        if (!uploaded) return;
        var extension = uploaded.name.indexOf('.') >= 0 ? uploaded.name.split('.').pop().toLowerCase() : 'file';
        files.unshift({
            id: 'upload-' + Date.now(), name: uploaded.name, size: formatFileSize(uploaded.size), format: extension,
            source: '文件上传', modified: '2026-08-10 10:35:00', maintained: '--', project: '--', status: 'unaligned'
        });
        renderFiles();
    });

    document.addEventListener('data-island-api-saved', function (event) {
        var detail = event.detail || {};
        var service = serviceById(detail.id);
        if (!service) return;
        service.name = detail.name || service.name;
        service.path = detail.path || service.path;
        service.description = detail.description || service.description;
        service.upstreamPath = detail.upstreamPath || service.upstreamPath;
        service.callUrl = 'http://10.32.18.46:8080/gateway' + service.path;
        service.updated = '2026-08-10 10:40:00';
        renderServiceTree('');
        showService(service.id);
    });

    var resizer = document.querySelector('[data-metadata-resizer]');
    resizer.addEventListener('mousedown', function (event) {
        event.preventDefault();
        var startX = event.clientX;
        var startWidth = document.querySelector('.metadata-tree-panel').getBoundingClientRect().width;
        function move(moveEvent) {
            var width = Math.max(360, Math.min(600, startWidth + moveEvent.clientX - startX));
            metadataView.style.setProperty('--metadata-tree-width', width + 'px');
        }
        function stop() {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', stop);
        }
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', stop);
    });

    [moveMask, deleteMask].forEach(function (mask) {
        mask.addEventListener('click', function (event) { if (event.target === mask) setMask(mask, false); });
    });
    document.addEventListener('click', function (event) {
        if (!event.target.closest('[data-metadata-node-more]') && !event.target.closest('[data-metadata-node-menu]')) closeNodeMenu();
    });
    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        if (previewMask.classList.contains('show')) setMask(previewMask, false);
        else if (drawerMask.classList.contains('show')) setMask(drawerMask, false);
        else if (moveMask.classList.contains('show')) setMask(moveMask, false);
        else if (deleteMask.classList.contains('show')) setMask(deleteMask, false);
        else closeNodeMenu();
    });
})();
