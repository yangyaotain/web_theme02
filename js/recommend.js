/**
 * 智能推荐侧边栏公共组件
 * 用法：在页面底部 <script src="js/recommend.js"></script>
 *       页面中需有 <div class="sidebar-list" id="recList"></div>
 */
(function () {
    var TAG_HREF = {
        '数据资源':     'data-detail.html',
        '数据产品':     'product-detail.html',
        '数据咨询服务': 'consulting-detail.html',
        '行业解决方案': 'solution-detail.html',
        '数据需求':     'demand-detail.html'
    };

    var SUPPLY_DETAIL_PAGES = {
        'data-detail.html': true,
        'product-detail.html': true,
        'consulting-detail.html': true,
        'solution-detail.html': true
    };

    var SUPPLY_REC_DATA = [
        {
            name: '金融行业A股上市公司股吧数据集',
            tag: '数据资源', tagCls: '',
            company: '智云数据科技有限公司',
            img: 'images/rec-stock-forum.jpg',
            desc: '对金融类上市公司在股吧平台上投资者交流数据的收集与整理，可用于分析投资者情绪与市场预测。',
            date: '2024-12-23 18:20'
        },
        {
            name: '慧企政策智能推荐',
            tag: '数据产品', tagCls: 'product',
            company: '郑州信息技术有限公司',
            img: 'images/rec-policy-ai.jpg',
            desc: '利用大数据与人工智能技术，精准匹配惠企政策与企业需求，推动政策"免申即享"。',
            date: '2024-12-23 16:20'
        },
        {
            name: '数据资产入表规划咨询服务',
            tag: '数据咨询服务', tagCls: 'service',
            company: '华信数据咨询有限公司',
            img: 'images/rec-asset-consulting.jpg',
            desc: '为企业提供数据资产入表的全流程规划咨询，包括合规评估、价值认定与会计处理。',
            date: '2024-12-23 14:30'
        },
        {
            name: '金融行业数据应用解决方案',
            tag: '行业解决方案', tagCls: 'solution',
            company: '中科数据技术有限公司',
            img: 'images/rec-finance-solution.jpg',
            desc: '面向银行、证券、保险等金融机构，提供从数据采集到智能分析的一站式数据应用方案。',
            date: '2024-12-22 10:15'
        },
        {
            name: '城市交通运行监测数据集',
            tag: '数据资源', tagCls: '',
            company: '深圳交通信息中心',
            img: 'images/rec-traffic-data.jpg',
            desc: '实时采集城市主干道、高速公路和公共交通的运行数据，支持交通态势研判与出行服务优化。',
            date: '2024-12-20 09:30'
        },
        {
            name: '智慧医疗数据分析平台',
            tag: '数据产品', tagCls: 'product',
            company: '健康云科技有限公司',
            img: 'images/rec-healthcare.jpg',
            desc: '整合医疗机构电子病历、影像和检验数据，提供智能辅助诊断与健康管理分析服务。',
            date: '2024-12-19 14:00'
        },
        {
            name: '企业数据治理成熟度评估',
            tag: '数据咨询服务', tagCls: 'service',
            company: '德勤数据咨询有限公司',
            img: 'images/rec-governance.jpg',
            desc: '基于DCMM标准评估企业数据管理能力成熟度，输出改进路线图与实施方案建议。',
            date: '2024-12-18 11:20'
        },
        {
            name: '智慧城市综合管理解决方案',
            tag: '行业解决方案', tagCls: 'solution',
            company: '华为云计算技术有限公司',
            img: 'images/rec-smart-city.jpg',
            desc: '融合IoT、AI与大数据技术，为城市管理者提供一体化的智慧城市治理数字底座。',
            date: '2024-12-17 16:00'
        }
    ];

    var DEMAND_REC_DATA = [
        {
            name: '企业领导驾驶舱服务需求',
            tag: '数据需求', tagCls: 'demand',
            company: '中国电子云',
            img: 'images/rec-dashboard-demand.jpg',
            desc: '汇聚企业各业务系统数据，进行统计分析与智能计算，构建企业运营决策驾驶舱。',
            date: '2024-12-21 16:45'
        },
        {
            name: '政务数据共享交换需求',
            tag: '数据需求', tagCls: 'demand',
            company: '龙岗区政务数据局',
            img: 'images/rec-gov-data.jpg',
            desc: '推动跨部门政务数据互联互通，建设统一数据共享交换平台，提升政府数字化治理效能。',
            date: '2024-12-16 10:30'
        },
        {
            name: '金融风险预警模型训练需求',
            tag: '数据需求', tagCls: 'demand',
            company: '华中金融科技研究院',
            img: 'images/demand-finance.jpg',
            desc: '面向信贷、反欺诈与异常交易场景，征集可用于模型训练和指标校验的多源数据服务。',
            date: '2024-12-15 15:10'
        },
        {
            name: '数据安全态势感知建设需求',
            tag: '数据需求', tagCls: 'demand',
            company: '南山智慧园区运营中心',
            img: 'images/demand-security.jpg',
            desc: '需要整合日志、访问、资产与风险事件数据，形成园区级数据安全监测和预警能力。',
            date: '2024-12-14 11:35'
        },
        {
            name: '教育资源画像分析需求',
            tag: '数据需求', tagCls: 'demand',
            company: '成都市教育数字化中心',
            img: 'images/demand-education.jpg',
            desc: '围绕课程资源、师资配置和学生学习行为，建设教育资源画像与供需匹配分析模型。',
            date: '2024-12-13 09:50'
        },
        {
            name: '城市公交客流预测需求',
            tag: '数据需求', tagCls: 'demand',
            company: '杭州公共交通集团',
            img: 'images/demand-transit.jpg',
            desc: '希望引入客流、天气、节假日和站点周边数据，提升公交线路调度与运力配置精度。',
            date: '2024-12-12 17:20'
        },
        {
            name: '数据资产盘点与价值评估需求',
            tag: '数据需求', tagCls: 'demand',
            company: '青岛制造业数字化联盟',
            img: 'images/demand-asset.jpg',
            desc: '面向重点制造企业开展数据资产梳理、目录建设、质量评估和价值评估方法验证。',
            date: '2024-12-11 14:05'
        },
        {
            name: '产业园区招商线索洞察需求',
            tag: '数据需求', tagCls: 'demand',
            company: '苏州工业园区招商局',
            img: 'images/demand-scenario.jpg',
            desc: '通过企业经营、产业链和区域活跃度数据，辅助发现高潜招商对象与产业协同机会。',
            date: '2024-12-10 10:15'
        }
    ];

    function getCurrentPageName() {
        var path = window.location.pathname || '';
        return path.substring(path.lastIndexOf('/') + 1).toLowerCase();
    }

    function getRecommendData() {
        var pageName = getCurrentPageName();
        if (pageName === 'demand-detail.html') {
            return SUPPLY_REC_DATA;
        }
        if (SUPPLY_DETAIL_PAGES[pageName]) {
            return DEMAND_REC_DATA;
        }
        return SUPPLY_REC_DATA.concat(DEMAND_REC_DATA);
    }

    var listEl = document.getElementById('recList');
    if (!listEl) return;

    getRecommendData().forEach(function (item) {
        var href = TAG_HREF[item.tag] || '#';
        var el = document.createElement('a');
        el.className = 'rec-item';
        el.href = href;
        el.innerHTML =
            '<div class="rec-thumb"><img src="' + item.img + '" alt=""></div>' +
            '<div class="rec-body">' +
                '<div class="rec-row-1">' +
                    '<span class="rec-name">' + item.name + '</span>' +
                    '<span class="rec-tag ' + item.tagCls + '">' + item.tag + '</span>' +
                '</div>' +
                '<div class="rec-row-2">' +
                    '<span class="rec-company">' + item.company + '</span>' +
                    '<span class="rec-date">' + item.date + '</span>' +
                '</div>' +
                '<div class="rec-desc">' + item.desc + '</div>' +
            '</div>';
        listEl.appendChild(el);
    });
})();
