(function() {
    'use strict';

    var titleEl = document.getElementById('detailTitle');
    var typeLabelEl = document.getElementById('contentTypeLabel');
    var contentEl = document.getElementById('detailMainContent');
    if (!titleEl || !typeLabelEl || !contentEl) return;

    var params = new URLSearchParams(window.location.search);
    var requestedType = params.get('type') || 'post';
    var type = ['post', 'vote', 'activity'].indexOf(requestedType) !== -1 ? requestedType : 'post';
    var title = params.get('title') || titleEl.textContent.trim();
    var typeLabels = { post: '帖子', vote: '投票', activity: '活动' };

    function renderPostContent() {
        return '' +
            '<p>各位大佬好，我在平台上申请了一批公共数据资源，提交申请后页面一直显示<b style="color:#f97316">“处理中”</b>状态，已经过了3天了还是没有变化。</p>' +
            '<p style="margin-top:12px">具体操作步骤如下：</p>' +
            '<p>1、进入数据资源列表页面，选择了“龙岗区城市管理数据集”；</p>' +
            '<p>2、点击“申请使用”按钮，填写了申请理由和使用用途；</p>' +
            '<p>3、提交申请后，状态一直是“处理中”。</p>' +
            '<div class="post-screenshot" style="margin-top:14px">' +
                '<div style="display:flex;align-items:center;gap:12px;padding:10px 16px;background:#fff3cd;border-radius:6px;border:1px solid #ffc107">' +
                    '<svg viewBox="0 0 24 24" fill="#f59e0b" width="20" height="20"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>' +
                    '<span style="font-size:13px;color:#856404">申请状态：<b>处理中</b> — 提交时间：2026-03-08 14:30</span>' +
                '</div>' +
            '</div>' +
            '<p style="margin-top:14px">请问这是正常的审核周期吗？还是系统出了什么问题？有没有遇到相同情况的朋友？</p>' +
            '<p style="margin-top:8px;color:#aaa;font-size:13px">环境信息：Chrome 120 / Windows 10 / 普通会员账号</p>';
    }

    function renderVoteContent() {
        return '' +
            '<p style="font-size:15px;font-weight:600;color:#333;margin-bottom:16px">数据交易市场还要多少年进入成熟阶段?</p>' +
            '<div class="vote-section">' +
                '<div class="vote-header">' +
                    '<div><span class="vote-type">单选投票</span><span class="vote-type-sub">, 共有 100 人参与投票</span></div>' +
                    '<div class="vote-countdown">距结束还有：9 天23 小时59 分钟</div>' +
                '</div>' +
                '<div class="vote-option">' +
                    '<input type="radio" name="adminVote" id="adminVote1"><label for="adminVote1" class="vote-option-label">1. 3年</label>' +
                    '<div class="vote-bar-wrap"><div class="vote-bar c1" style="width:20%"></div></div>' +
                    '<span class="vote-pct">20% <b>(20)</b></span>' +
                '</div>' +
                '<div class="vote-option">' +
                    '<input type="radio" name="adminVote" id="adminVote2"><label for="adminVote2" class="vote-option-label">2. 5年</label>' +
                    '<div class="vote-bar-wrap"><div class="vote-bar c2" style="width:50%"></div></div>' +
                    '<span class="vote-pct">50% <b>(50)</b></span>' +
                '</div>' +
                '<div class="vote-option">' +
                    '<input type="radio" name="adminVote" id="adminVote3"><label for="adminVote3" class="vote-option-label">3. 10年</label>' +
                    '<div class="vote-bar-wrap"><div class="vote-bar c3" style="width:30%"></div></div>' +
                    '<span class="vote-pct">30% <b>(30)</b></span>' +
                '</div>' +
                '<button type="button" class="btn-vote-submit">提交</button>' +
            '</div>' +
            '<div class="vote-result">' +
                '<div class="vote-result-title">投票结果 <span style="font-size:12px;color:#aaa;font-weight:400">（只有发起者可见）</span></div>' +
                '<div class="vote-result-stats">' +
                    '<span>总投票数：<b>100</b></span>' +
                    '<span>参与人数：<b>100</b></span>' +
                    '<span>投票状态：<span class="vote-status">投票进行中 <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></span></span>' +
                '</div>' +
                '<div class="result-bar-row"><div class="result-bar-label">1.3年</div><div class="result-bar-wrap"><div class="result-bar-track"><div class="result-bar-fill r1" style="width:20%"></div></div><span class="result-bar-val">20票 (20%)</span></div></div>' +
                '<div class="result-bar-row"><div class="result-bar-label">2.5年</div><div class="result-bar-wrap"><div class="result-bar-track"><div class="result-bar-fill r2" style="width:50%"></div></div><span class="result-bar-val">50票 (50%)</span></div></div>' +
                '<div class="result-bar-row"><div class="result-bar-label">3.10年</div><div class="result-bar-wrap"><div class="result-bar-track"><div class="result-bar-fill r3" style="width:30%"></div></div><span class="result-bar-val">30票 (30%)</span></div></div>' +
            '</div>';
    }

    function renderActivityContent() {
        var signupRows = '';
        for (var i = 0; i < 8; i++) {
            signupRows += '<tr><td>zhang</td><td>张三</td><td>男</td><td>15899826401</td><td>龙岗科技有限公司</td><td>自定义收集内容</td><td>2026-1-30 15:00:00</td></tr>';
        }

        return '' +
            '<div class="activity-content">' +
                '<h3>数商招募活动简介</h3>' +
                '<p>本次数商招募活动以培育壮大数字经济生态下的数据要素市场主体为核心，面向全社会招引具备数据服务能力、数字创新赋能的企业与个人数商，共同把握数据要素价值，助力数字经济与实体经济深度融合。活动聚焦数据技术、产品、服务的交流与合作平台，推动龙岗数据要素高质量发展。</p>' +
                '<h3>一、招募背景</h3>' +
                '<p>数据经济发展对释放核心驱动力，数据要素市场化配置改革持续深化，数据作为动态数据价值转化的关键主体，近年来发展迅速新模式。为进一步壮大数据服务市场主体规模，丰富数据服务、运营、服务等多元化产，打造数据生产、加工、流通、应用、安全主产业链条，特开展本次数商招募活动。为各类数据主体搭建机制、培养勇挑与生态涵养。</p>' +
                '<h3>二、招募对象</h3>' +
                '<p>本次数商招募面向企业与个人机构 / 创业团队或者主体主管，重点聚焦数据服务和核心能力，具体包括：</p>' +
                '<p>企业类：大中微数据技术企业、数据产品开发、数据服务分析运营的企业，只要数字化转型赋能力的，可为中小企业提供数据数字化精准化数字转化企业。</p>' +
                '<p>个人数据 / 团队：大数据、人工智能、数据如此、数据分析、数据运营管理等核心能力术人才 / 存，作为大学本来系列传统数字化开发试点人员，具有市场运营点、数字服务专的力大的大型建设团队、充满多方会编数字与转数字子这建设造。</p>' +
                '<p>的毕业生、转在从业主管等。</p>' +
                '<h3>三、核心能力方向</h3>' +
                '<p>数据服务产业全生态创新的数据发展，主力创设以下主力方面的核心数商主体：</p>' +
                '<p>数据产品体系：数据清洗加工、清洗、陷注翻成、数据智能分析等技术平简的主体；</p>' +
                '<p>数据产品的专注：开发数据集、数据模型化产品、AI 智能数据应用等可交互交互动数据产品的主体；</p>' +
                '<p>数据流通服务：提供数据服务产品对接、合规质询、数据经纪、洞察数据服务等流通服纪的主体；</p>' +
                '<p>数据安全与管理：从数据保密加报、脱敏、防泄漏、隐私计算、安全合规审核的安全确保的主体；</p>' +
                '<p>企业数据赋能：为实体行业数据化数字化转型方法、产业数据打造云应用、随路者包围数据的高质量主体的。</p>' +
                '<h3>四、招募亮点</h3>' +
                '<p>低门槛参与：无需投资、保证金、企业类主体具备相关业务服务能力即可报名，个人类主体有创业性都部可以入。</p>' +
                '<p>全流程扶持：从服务理坛、数据席等型性身体服务端品、提供专业咨任专人对对接，解决发展中的各类问题。</p>' +
                '<p>生态化发展：积极数据生态平合，实际数商术人、工作坊、商务数字产值流通、打造活跃发展的数商体系。</p>' +
                '<h3>五、报名方式</h3>' +
                '<p>有意向者可通过以下方式进行报名资源通道 (线上联审 / 资源对接) 提交报名信息后，模拟主体发放信、性身方面、标心龙力等输收对面通审核前确后，即可成为本次龙岗的合作数商，享受各类资源支持，并开放数据的价值创新与发展之旅。</p>' +
            '</div>' +
            '<button type="button" class="btn-signup">我要报名</button>' +
            '<div class="signup-section">' +
                '<div class="signup-header">' +
                    '<div class="signup-header-left"><span>报名结果 <span style="font-size:12px;color:#aaa">（只有发起者可见）</span></span><span>已报名：<b>226</b></span></div>' +
                    '<div class="signup-search"><input type="text" placeholder="账号/姓名/电话号码"><button type="button" class="btn-search">查询</button><button type="button" class="btn-export">导出</button></div>' +
                '</div>' +
                '<table class="signup-table"><thead><tr><th>账号</th><th>姓名</th><th>性别</th><th>电话号码</th><th>公司名称</th><th>自定义</th><th>报名时间</th></tr></thead><tbody>' + signupRows + '</tbody></table>' +
                '<div class="signup-pagination"><span class="signup-page-btn">上一页</span><span class="signup-page-btn active">1</span><span class="signup-page-btn">2</span><span class="signup-page-btn">3</span><span class="signup-page-btn">4</span><span class="signup-page-btn">5</span><span style="color:#aaa;padding:0 4px">...</span><span class="signup-page-btn">50</span><span class="signup-page-btn">下一页</span></div>' +
            '</div>';
    }

    titleEl.textContent = title;
    typeLabelEl.textContent = '[' + typeLabels[type] + ']';
    contentEl.classList.add('community-content-detail');

    if (params.has('type')) {
        if (type === 'vote') contentEl.innerHTML = renderVoteContent();
        else if (type === 'activity') contentEl.innerHTML = renderActivityContent();
        else contentEl.innerHTML = renderPostContent();
    }

    document.title = title + ' - 数据社区管理 - 龙岗数据聚合服务平台';
})();
