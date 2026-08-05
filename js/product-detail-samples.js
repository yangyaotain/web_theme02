(function () {
    'use strict';

    var SAMPLE_OUTPUT_ROOT = 'outputs/019fa0fb-0add-75a2-85a0-b0e49bf3fdcd/';
    var OTHER_SAMPLE_FILE = 'output/pdf/龙岗区产业运行分析样例报告.pdf';
    var PRODUCTS = {
        dataset: {
            name: '龙岗区企业经营活力监测数据集',
            type: '数据集',
            image: 'images/policy-recommend.jpg',
            description: '汇聚企业登记、产业分布和经营活跃度等主题指标，形成龙岗区企业经营活力监测样例数据，为产业分析、园区运营和企业服务提供数据支撑。',
            price: '9,800元/年',
            delivery: '文件传输',
            industry: '企业服务',
            introduction: '围绕龙岗区企业经营活跃度、产业结构和空间分布构建标准化数据集，提供统一字段口径、按日更新的数据文件及可下载样例。'
        },
        api: {
            name: '龙岗企业经营活力指数查询 API',
            type: 'API',
            image: 'images/water-analytics.jpg',
            description: '提供企业经营活力指数、状态标签和统计日期查询能力，适用于企业服务、园区运营及产业监测系统的实时接口接入。',
            price: '0.08元/次',
            delivery: 'API传输',
            industry: '企业服务',
            introduction: '通过数据岛 API 网关提供企业经营活力指标查询服务，支持企业编码和统计日期参数，返回结构化 JSON 数据。'
        },
        other: {
            name: '龙岗区产业运行分析样例报告',
            type: '其他',
            image: 'images/tourism-weather.jpg',
            description: '围绕重点产业、街道和园区形成产业运行分析说明文件，展示数据口径、指标结构和主要分析内容。',
            price: '3,600元/份',
            delivery: '文件传输',
            industry: '产业发展',
            introduction: '以说明文件形式交付产业运行分析样例，内容包括重点产业结构、企业活跃度、园区运行情况以及数据使用说明。'
        }
    };

    var RESOURCES = {
        dataset: {
            name: '龙岗区企业经营活力基础数据集',
            type: '数据集',
            resourceType: '企业数据',
            image: 'images/stock-data.jpg',
            description: '汇聚龙岗区企业登记、所属行业、所在街道和经营活跃度等基础信息，形成可用于产业分析和企业服务的标准化数据资源。',
            delivery: '文件传输',
            industry: '信息传输、软件和信息技术服务业',
            owner: '深圳市龙岗区政务数据运营有限公司',
            publishedAt: '2026-07-18 09:30:00',
            format: 'XLSX / CSV',
            source: '原始数据',
            introduction: '围绕企业经营活跃度、产业结构和空间分布整理形成标准化基础数据集，提供统一字段口径和按日更新的数据文件。',
            fields: [
                ['企业编码', 'enterprise_code', '字符串型', '32'],
                ['企业名称', 'enterprise_name', '字符串型', '255'],
                ['所属行业', 'industry_name', '字符串型', '100'],
                ['所属街道', 'street_name', '字符串型', '50'],
                ['注册资本', 'registered_capital', '数值型', '18,2'],
                ['活力指数', 'vitality_index', '数值型', '5,2'],
                ['经营状态', 'operation_status', '字符串型', '20'],
                ['数据日期', 'stat_date', '日期型', '10']
            ]
        },
        api: {
            name: '龙岗企业登记信息查询 API 资源',
            type: 'API',
            resourceType: '企业数据',
            image: 'images/realtime-data.jpg',
            description: '提供龙岗区企业登记信息、经营活力指数和状态标签的实时查询能力，支持业务系统通过标准接口按企业编码调用。',
            delivery: 'API传输',
            industry: '信息传输、软件和信息技术服务业',
            owner: '深圳市龙岗区政务数据运营有限公司',
            publishedAt: '2026-07-17 16:35:00',
            format: 'JSON',
            source: '加工数据',
            introduction: '通过数据岛 API 网关提供标准化查询接口，调用方可按企业编码及统计日期获取结构化企业经营活力信息。',
            fields: [
                ['企业编码', 'enterpriseCode', '字符串型', '32'],
                ['企业名称', 'enterpriseName', '字符串型', '255'],
                ['活力指数', 'vitalityIndex', '数值型', '5,2'],
                ['经营状态', 'operationStatus', '字符串型', '20'],
                ['统计日期', 'statDate', '日期型', '10']
            ]
        },
        other: {
            name: '龙岗区产业运行分析资料包',
            type: '其他',
            resourceType: '行业数据',
            image: 'images/data-screen.jpg',
            description: '汇集龙岗区重点产业、街道和园区运行情况的分析说明、指标口径及配套资料，供产业研究和业务研判参考。',
            delivery: '文件传输',
            industry: '租赁和商务服务业',
            owner: '深圳市龙岗区产业数据运营有限公司',
            publishedAt: '2026-07-16 14:10:00',
            format: 'PDF / TXT',
            source: '加工数据',
            introduction: '资料包包括覆盖范围、数据周期、主要分析内容和指标口径说明，以登记时上传的文件形式提供样例。',
            fields: [
                ['文件名称', 'file_name', '字符串型', '255'],
                ['文件类型', 'file_type', '字符串型', '20'],
                ['文件大小', 'file_size', '字符串型', '20'],
                ['内容摘要', 'content_summary', '字符串型', '500'],
                ['更新日期', 'update_date', '日期型', '10']
            ]
        }
    };

    var DATASET_ROWS = [
        ['LGQY0001', '深圳市启辰智能科技有限公司', '软件和信息技术服务业', '坂田街道', '3,000', '92.6', '活跃', '2026-07-20'],
        ['LGQY0002', '深圳市云图数据服务有限公司', '互联网和相关服务', '龙城街道', '1,800', '88.4', '活跃', '2026-07-20'],
        ['LGQY0003', '深圳市创维智联技术有限公司', '计算机、通信和其他电子设备制造业', '宝龙街道', '5,200', '86.9', '活跃', '2026-07-20'],
        ['LGQY0004', '深圳市星河产业运营有限公司', '商务服务业', '园山街道', '2,500', '84.7', '稳定', '2026-07-20'],
        ['LGQY0005', '深圳市联创精密制造有限公司', '专用设备制造业', '平湖街道', '4,600', '82.1', '稳定', '2026-07-20'],
        ['LGQY0006', '深圳市智谷新能源科技有限公司', '电气机械和器材制造业', '坪地街道', '3,800', '80.8', '稳定', '2026-07-20'],
        ['LGQY0007', '深圳市航盛数字科技有限公司', '科技推广和应用服务业', '吉华街道', '2,100', '78.5', '稳定', '2026-07-20'],
        ['LGQY0008', '深圳市大运供应链管理有限公司', '多式联运和运输代理业', '横岗街道', '1,600', '75.9', '关注', '2026-07-20'],
        ['LGQY0009', '深圳市恒裕生物技术有限公司', '医药制造业', '龙岗街道', '2,900', '73.6', '关注', '2026-07-20'],
        ['LGQY0010', '深圳市清林文创发展有限公司', '文化艺术业', '布吉街道', '1,200', '71.4', '关注', '2026-07-20']
    ];

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character];
        });
    }

    function icon(name) {
        var paths = {
            dataset: '<path d="M4 3h16v18H4V3zm2 2v3h12V5H6zm0 5v3h4v-3H6zm6 0v3h6v-3h-6zm-6 5v4h4v-4H6zm6 0v4h6v-4h-6z"/>',
            api: '<path d="M7 7h3V4h4v3h3a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-3v3h-4v-3H7a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H7zm2 2h2v2H9v-2zm4 0h2v2h-2v-2z"/>',
            file: '<path d="M6 2h8l4 4v16H6V2zm2 2v16h8V8h-4V4H8zm6 1.5V6h.5L14 5.5zM9 11h6v2H9v-2zm0 4h6v2H9v-2z"/>',
            download: '<path d="M11 3h2v10.17l3.59-3.58L18 11l-6 6-6-6 1.41-1.41L11 13.17V3zm-6 16h14v2H5v-2z"/>'
        };
        return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (paths[name] || paths.file) + '</svg>';
    }

    function renderOverview(type, product, description) {
        var iconName = type === 'dataset' ? 'dataset' : (type === 'api' ? 'api' : 'file');
        return ''
            + '<div class="sample-overview">'
            +   '<div class="sample-overview-copy">'
            +       '<span class="sample-type-badge">' + icon(iconName) + escapeHtml(product.type) + '</span>'
            +       '<h3>' + escapeHtml(product.name) + '</h3>'
            +       '<p>' + escapeHtml(description) + '</p>'
            +   '</div>'
            + '</div>';
    }

    function renderFileCard(fileName, fileMeta, href, iconName) {
        return ''
            + '<div class="sample-file-card">'
            +   '<span class="sample-file-icon">' + icon(iconName || 'file') + '</span>'
            +   '<div class="sample-file-info"><strong>' + escapeHtml(fileName) + '</strong><span>' + escapeHtml(fileMeta) + '</span></div>'
            +   '<a class="sample-download" href="' + escapeHtml(href) + '" download>' + icon('download') + '<span>下载文件</span></a>'
            + '</div>';
    }

    function renderDatasetSample(product) {
        var header = ['企业编码', '企业名称', '所属行业', '所属街道', '注册资本（万元）', '活力指数', '经营状态', '数据日期'];
        return ''
            + renderOverview('dataset', product, '下载完整 Excel 样例文件，页面同步展示其中 10 条示例记录。')
            + renderFileCard(
                '龙岗区企业经营活力监测样例.xlsx',
                'Excel 工作簿 · 10 条样例数据 · 8 个字段',
                SAMPLE_OUTPUT_ROOT + '龙岗区企业经营活力监测样例.xlsx',
                'dataset'
            )
            + '<h3 class="sample-table-title">样例数据预览</h3>'
            + '<p class="sample-table-note">以下内容与 Excel 文件中的“企业活力样例”工作表保持一致。</p>'
            + '<div class="sample-table-scroll"><table class="sample-preview-table">'
            +   '<thead><tr>' + header.map(function (item) { return '<th>' + escapeHtml(item) + '</th>'; }).join('') + '</tr></thead>'
            +   '<tbody>'
            +       DATASET_ROWS.map(function (row) {
                        return '<tr>' + row.map(function (cell) {
                            return '<td>' + escapeHtml(cell) + '</td>';
                        }).join('') + '</tr>';
                    }).join('')
            +   '</tbody>'
            + '</table></div>';
    }

    function renderApiSample(product) {
        return ''
            + renderOverview('api', product, '以下为数据岛 API 文档示例，可直接查看调用地址、请求参数和响应结构。')
            + '<div class="api-doc-meta">'
            +   '<div><span>API 编码</span><strong>API-LG-ENT-006</strong></div>'
            +   '<div><span>当前版本</span><strong>v1.2</strong></div>'
            +   '<div><span>数据格式</span><strong>JSON</strong></div>'
            +   '<div><span>更新频率</span><strong>每日</strong></div>'
            + '</div>'
            + '<h3 class="api-doc-title">请求地址</h3>'
            + '<div class="api-endpoint"><span class="api-method">GET</span><code>https://api.dataisland.longgang.gov.cn/v1/enterprises/vitality</code></div>'
            + '<h3 class="api-doc-title">请求参数</h3>'
            + '<div class="sample-table-scroll"><table class="api-parameter-table">'
            +   '<thead><tr><th>参数名称</th><th>位置</th><th>类型</th><th>必填</th><th>说明</th><th>示例值</th></tr></thead>'
            +   '<tbody>'
            +       '<tr><td>X-Data-Island-Key</td><td>Header</td><td>String</td><td class="api-required">是</td><td>数据岛调用凭证</td><td>di_live_******</td></tr>'
            +       '<tr><td>enterpriseCode</td><td>Query</td><td>String</td><td class="api-required">是</td><td>企业统一编码</td><td>LGQY0001</td></tr>'
            +       '<tr><td>statDate</td><td>Query</td><td>Date</td><td>否</td><td>统计日期，默认返回最新数据</td><td>2026-07-20</td></tr>'
            +   '</tbody>'
            + '</table></div>'
            + '<h3 class="api-doc-title">调用示例</h3>'
            + '<pre class="api-code-block">curl -X GET \\\n'
            + '  "https://api.dataisland.longgang.gov.cn/v1/enterprises/vitality?enterpriseCode=LGQY0001&amp;statDate=2026-07-20" \\\n'
            + '  -H "X-Data-Island-Key: di_live_******"</pre>'
            + '<h3 class="api-doc-title">响应示例</h3>'
            + '<pre class="api-code-block">{\n'
            + '  "code": 0,\n'
            + '  "message": "success",\n'
            + '  "data": {\n'
            + '    "enterpriseCode": "LGQY0001",\n'
            + '    "enterpriseName": "深圳市启辰智能科技有限公司",\n'
            + '    "vitalityIndex": 92.6,\n'
            + '    "operationStatus": "活跃",\n'
            + '    "statDate": "2026-07-20"\n'
            + '  }\n'
            + '}</pre>';
    }

    function renderOtherSample(product) {
        return ''
            + renderOverview('other', product, '该类型以登记时上传的文件作为样例，用户可查看文件信息并直接下载。')
            + renderFileCard(
                '龙岗区产业运行分析样例报告.pdf',
                'PDF 文件',
                OTHER_SAMPLE_FILE,
                'file'
            );
    }

    function setText(selector, value) {
        var element = document.querySelector(selector);
        if (element) element.textContent = value;
    }

    function applyProduct(product) {
        document.title = product.name + ' - 龙岗数据聚合服务平台';
        setText('[data-product-detail-breadcrumb]', product.name);
        setText('[data-product-detail-title]', product.name);
        setText('[data-product-detail-description]', product.description);
        setText('[data-product-detail-price]', product.price);
        setText('[data-product-detail-delivery]', product.delivery);
        setText('[data-product-detail-name]', product.name);
        setText('[data-product-detail-type]', product.type);
        setText('[data-product-detail-industry]', product.industry);
        setText('[data-product-detail-introduction]', product.introduction);
        setText('[data-product-consult-target]', product.name);
        document.querySelectorAll('[data-product-detail-image]').forEach(function (image) {
            image.src = product.image;
            image.alt = product.name;
        });
    }

    function renderResourceFields(fields) {
        var target = document.querySelector('[data-resource-detail-fields]');
        if (!target || !fields) return;
        target.innerHTML = fields.map(function (field, index) {
            return '<tr><td>' + (index + 1) + '</td>'
                + '<td>' + escapeHtml(field[0]) + '</td>'
                + '<td>' + escapeHtml(field[1]) + '</td>'
                + '<td>' + escapeHtml(field[2]) + '</td>'
                + '<td>' + escapeHtml(field[3]) + '</td></tr>';
        }).join('');
    }

    function applyResource(resource) {
        document.title = resource.name + ' - 龙岗数据聚合服务平台';
        setText('[data-resource-detail-breadcrumb]', resource.name);
        setText('[data-resource-detail-title]', resource.name);
        setText('[data-resource-detail-description]', resource.description);
        setText('[data-resource-detail-published]', resource.publishedAt);
        setText('[data-resource-detail-delivery]', resource.delivery);
        setText('[data-resource-detail-name]', resource.name);
        setText('[data-resource-detail-type]', resource.resourceType);
        setText('[data-resource-detail-industry]', resource.industry);
        setText('[data-resource-detail-format]', resource.format);
        setText('[data-resource-detail-source]', resource.source);
        setText('[data-resource-detail-introduction]', resource.introduction);
        setText('[data-resource-detail-transfer]', resource.delivery);
        setText('[data-resource-consult-target]', resource.name);
        document.querySelectorAll('[data-resource-detail-owner]').forEach(function (element) {
            element.textContent = resource.owner;
        });
        document.querySelectorAll('[data-resource-detail-image]').forEach(function (image) {
            image.src = resource.image;
            image.alt = resource.name;
        });
        renderResourceFields(resource.fields);
    }

    function initDetailSamples() {
        var samplePanel = document.getElementById('tabSample');
        if (!samplePanel) return;
        var context = samplePanel.getAttribute('data-sample-context') === 'resource' ? 'resource' : 'product';
        var catalog = context === 'resource' ? RESOURCES : PRODUCTS;
        var params = new URLSearchParams(window.location.search || '');
        var type = params.get('sampleType');
        if (!catalog[type]) type = 'dataset';
        var item = catalog[type];
        if (context === 'resource') applyResource(item);
        else applyProduct(item);
        samplePanel.classList.add('sample-panel');
        samplePanel.innerHTML = type === 'api'
            ? renderApiSample(item)
            : (type === 'other' ? renderOtherSample(item) : renderDatasetSample(item));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDetailSamples);
    } else {
        initDetailSamples();
    }
})();
