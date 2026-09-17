let currentType='key',selectedGroup=12;

const keyData=[
 {word:'incorporate',phon:'/ɪnˈkɔːpəreɪt/',pos:'v.',meaning:'包含；纳入；合并',opts:[{en:'include',zh:'包括；包含',correct:true},{en:'comprise',zh:'由……组成；包含',correct:true},{en:'contain',zh:'包含；容纳',correct:true},{en:'integrate',zh:'整合；使成为一体',correct:true},{en:'exclude',zh:'排除；不包括',correct:false}],question:'The new course will ______ practical training into the existing programme.',source:'The new course will incorporate practical training into the existing programme.',translation:'这门新课程将把实践培训纳入现有课程体系。',translationHighlights:['把','纳入']},
 {word:'purchase',phon:'/ˈpɜːtʃəs/',pos:'v.',meaning:'购买',opts:[{en:'buy',zh:'购买',correct:true},{en:'acquire',zh:'获得；购得',correct:true},{en:'obtain',zh:'获得',correct:true},{en:'get',zh:'获得；得到',correct:true},{en:'sell',zh:'出售',correct:false}],question:'Visitors can ______ tickets at the front desk.',source:'Visitors can purchase tickets at the front desk.',translation:'访客可以在前台购票。',translationHighlights:['购票']}
];

const keySynData=[
 {word:'incorporate',phon:'/ɪnˈkɔːpəreɪt/',pos:'v.',meaning:'包含；纳入；合并',opts:[{en:'include',zh:'包括；包含',correct:true},{en:'comprise',zh:'由……组成；包含',correct:true},{en:'contain',zh:'包含；容纳',correct:true},{en:'integrate',zh:'整合；使成为一体',correct:true},{en:'exclude',zh:'排除；不包括',correct:false}],question:'The new course will ______ practical training into the existing programme.',source:'The new course will incorporate practical training into the existing programme.',translation:'这门新课程将把实践培训纳入现有课程体系。',translationHighlights:['把','纳入']},
 {word:'purchase',phon:'/ˈpɜːtʃəs/',pos:'v.',meaning:'购买',opts:[{en:'buy',zh:'购买',correct:true},{en:'acquire',zh:'获得；购得',correct:true},{en:'obtain',zh:'获得',correct:true},{en:'get',zh:'获得；得到',correct:true},{en:'sell',zh:'出售',correct:false}],question:'Visitors can ______ tickets at the front desk.',source:'Visitors can purchase tickets at the front desk.',translation:'访客可以在前台购票。',translationHighlights:['购票']},
 {word:'require',phon:'/rɪˈkwaɪə(r)/',pos:'v.',meaning:'需要；要求',opts:[{en:'need',zh:'需要',correct:true},{en:'demand',zh:'要求；需要',correct:true},{en:'call for',zh:'需要；要求',correct:true},{en:'necessitate',zh:'使成为必要',correct:true},{en:'avoid',zh:'避免',correct:false}],question:'The position will ______ previous work experience.',source:'The position will require previous work experience.',translation:'这个岗位需要有以往的工作经验。',translationHighlights:['需要']}
];


const answerData=[
 {word:'music',phon:'/ˈmjuːzɪk/',pos:'n.',meaning:'音乐',example:'She listens to music while studying.',translation:'她学习时会听<span class="hl">音乐</span>。'},
 {word:'station',phon:'/ˈsteɪʃn/',pos:'n.',meaning:'车站',example:'The station is only five minutes away.',translation:'车站离这里只有五分钟路程。'},
 {word:'garden',phon:'/ˈɡɑːdn/',pos:'n.',meaning:'花园',example:'There is a small garden behind the house.',translation:'房子后面有一个小花园。'}
];
const topicData=[
 {word:'accommodation',phon:'/əˌkɒməˈdeɪʃn/',pos:'n.',meaning:'住宿；住处',options:['住宿；住处','交通；运输','设备；器材','预约；预订'],example:'The hotel provides comfortable accommodation for all guests.',translation:'这家酒店为所有客人提供舒适的<span class="hl">住宿</span>。'},
 {word:'transport',phon:'/ˈtrænspɔːt/',pos:'n.',meaning:'交通；运输',options:['环境；生态','交通；运输','费用；价格','登记；注册'],example:'Public transport is available from the airport to the city centre.',translation:'从机场到市中心有公共交通可乘坐。'},
 {word:'reservation',phon:'/ˌrezəˈveɪʃn/',pos:'n.',meaning:'预约；预订',options:['维修；保养','路线；路径','预约；预订','材料；原料'],example:'You should make a reservation before visiting the restaurant.',translation:'去这家餐厅之前你应该先预订。'}
];

const state={
 index:0,selected:new Set(),submitted:false,analysis:false,auto:true,speed:1,interval:1,count:'1次',paused:false,
 showMeaning:true,showSynonyms:true,reveal:false,answerShowMeaning:true,fromReview:false,reviewQueue:[],reviewIndex:0
};

let reviewCount=10,reviewMode='练习模式';
let reviewWords=JSON.parse(localStorage.getItem('vocabReviewWords')||'null')||[
 {word:'incorporate',phon:'/ɪnˈkɔːpəreɪt/',pos:'v.',meaning:'包含；纳入；合并',book:'考点词',date:'9月14日2026年',age:'day',reason:'同替误选',example:'The new course will incorporate practical training into the existing programme.'},
 {word:'station',phon:'/ˈsteɪʃn/',pos:'n.',meaning:'车站',book:'答案词',date:'9月12日2026年',age:'week',reason:'拼写错误',example:'The station is only five minutes away.'},
 {word:'accommodation',phon:'/əˌkɒməˈdeɪʃn/',pos:'n.',meaning:'住宿；住处',book:'话题词',date:'9月5日2026年',age:'month',reason:'词义混淆',example:'The hotel provides comfortable accommodation for all guests.'},
 {word:'reservation',phon:'/ˌrezəˈveɪʃn/',pos:'n.',meaning:'预约；预订',book:'话题词',date:'7月20日2026年',age:'old',reason:'词义混淆',example:'You should make a reservation before visiting the restaurant.'}
];

function todayCN(){const d=new Date();return `${d.getMonth()+1}月${d.getDate()}日${d.getFullYear()}年`}
function addReviewWord(d,book,reason){
 const item={word:d.word,phon:d.phon||'',pos:d.pos||'',meaning:d.meaning||'',book,date:todayCN(),age:'day',reason,example:d.example||'',question:d.question||'',source:d.source||'',translation:d.translation||'',translationHighlights:d.translationHighlights||[],opts:d.opts||[]};
 const old=reviewWords.findIndex(x=>x.word===d.word);
 if(old>=0)reviewWords.splice(old,1);
 reviewWords.unshift(item);localStorage.setItem('vocabReviewWords',JSON.stringify(reviewWords));
}
function toggleDropdown(id){
 const target=document.getElementById(id),willOpen=!target.classList.contains('open');
 document.querySelectorAll('.dropdown.open').forEach(x=>x.classList.remove('open'));
 if(willOpen)target.classList.add('open');
 if(window.event)window.event.stopPropagation();
}
document.addEventListener('click',e=>{if(!e.target.closest('.dropdown'))document.querySelectorAll('.dropdown.open').forEach(x=>x.classList.remove('open'))});

function selectedValues(id){return [...document.querySelectorAll(`#${id} input:checked`)].map(x=>x.value)}
function changeBookFilter(el){
 const box=document.getElementById('bookFilter'),all=box.querySelector('input[value="all"]'),others=[...box.querySelectorAll('input:not([value="all"])')];
 if(el.value==='all'&&el.checked)others.forEach(x=>x.checked=false);
 if(el.value!=='all'&&el.checked)all.checked=false;
 if(!all.checked&&!others.some(x=>x.checked))all.checked=true;
 const vals=selectedValues('bookFilter');document.getElementById('bookFilterLabel').textContent=vals.includes('all')?'全部':vals.length===1?vals[0]:`已选${vals.length}项`;renderReviewTable();
}
function changeTimeFilter(){const vals=selectedValues('timeFilter');document.getElementById('timeFilterLabel').textContent=vals.length?`已选${vals.length}项`:'最近练习';renderReviewTable()}
function filteredReviewWords(){
 const books=selectedValues('bookFilter'),times=selectedValues('timeFilter');
 return reviewWords.filter(x=>(books.includes('all')||books.includes(x.book))&&(!times.length||times.includes(x.age)));
}
function renderReviewTable(){
 const body=document.getElementById('reviewTableBody');if(!body)return;
 const rows=filteredReviewWords();
 body.innerHTML=rows.length?rows.map(x=>`<tr><td class="word-cell">${x.word}</td><td>${x.pos} ${x.meaning}</td><td>${x.date}</td><td><span class="book-pill">${x.book}</span></td><td><button class="detail-btn" onclick="openWordDetail('${x.word}')">查看详情</button></td></tr>`).join(''):`<tr><td colspan="5"><div class="empty-review">当前筛选条件下暂无错词</div></td></tr>`;
}
function wordDetailSource(x){
 const source=x.book==='考点词'?keySynData.find(d=>d.word===x.word):x.book==='答案词'?answerData.find(d=>d.word===x.word):topicData.find(d=>d.word===x.word);
 return {...x,...(source||{}),date:x.date,book:x.book,reason:x.reason};
}
function cleanHTML(s=''){return s.replace(/<[^>]*>/g,'')}
function zhFragments(d){const text=cleanHTML(d.translation||''),meaningParts=(d.meaning||'').split(/[；;]/).map(s=>s.trim()).filter(s=>s&&text.includes(s));return meaningParts.length?[...new Set(meaningParts)]:[...new Set(d.translationHighlights||[])]}
function openWordDetail(word){
 const saved=reviewWords.find(v=>v.word===word);if(!saved)return;const x=wordDetailSource(saved);
 const head=`<div class="detail-date">上次练习时间：${x.date}</div><div class="detail-head"><div><div class="detail-wordline"><h2>${x.word}</h2><button class="detail-audio" onclick="speak('${x.word}')" aria-label="播放${x.word}读音">🔊</button></div><div class="detail-phon">${x.phon}</div></div><button class="detail-close" onclick="closeWordDetail()">×</button></div><div class="detail-meaning"><span style="color:#758296;margin-right:8px">${x.pos}</span>${x.meaning}</div>`;
 let body='';
 if(x.book==='考点词'){
   const synonyms=(x.opts||[]).filter(o=>o.correct),first=synonyms[0];
   const question=(x.source||x.question||'').replace('______',x.word);
   const corresponding=first&&question?question.replace(new RegExp(`\\b${x.word}\\b`,'i'),first.en):question;
   body=`<div class="detail-section"><h4>同义替换</h4><div class="synonym-list">${synonyms.map(o=>`<div class="synonym-row"><strong>${o.en}</strong><span>${o.zh}</span><button class="synonym-audio" onclick="speak('${o.en}')" aria-label="播放${o.en}读音">🔊</button></div>`).join('')||'<div class="sub">暂无同替数据</div>'}</div></div>
   <div class="detail-section"><div class="detail-label">题目原文</div><div class="detail-example">${highlightKeySource(question,x.word)}</div></div>
   <div class="detail-section"><div class="detail-label">对应原文</div><div class="detail-example">${first?highlightKeySource(corresponding,first.en):corresponding}</div></div>
   <div class="detail-section"><div class="detail-label">对应原文中文翻译</div><div class="detail-example">${highlightChineseFragments(cleanHTML(x.translation||''),zhFragments(x))}</div></div>`;
 }else{
   body=`<div class="detail-section"><div class="detail-label">例句</div><div class="detail-example">${highlightExample(x.example||'',x.word)}</div></div>
   <div class="detail-section"><div class="detail-label">例句中文译文</div><div class="detail-example">${highlightChineseFragments(cleanHTML(x.translation||''),zhFragments(x))}</div></div>`;
 }
 document.getElementById('reviewDetail').innerHTML=head+body;
 document.getElementById('reviewStage').classList.add('detail-open');
}
function closeWordDetail(){document.getElementById('reviewStage').classList.remove('detail-open')}
function changeReviewCount(delta){reviewCount=Math.max(5,Math.min(50,reviewCount+delta));document.getElementById('reviewCount').textContent=reviewCount}
function selectReviewMode(btn,mode){reviewMode=mode;btn.parentElement.querySelectorAll('.mode-pill').forEach(x=>x.classList.remove('active'));btn.classList.add('active')}
function exportReview(type){
 const rows=filteredReviewWords(),headers=['单词','释义','最近练习时间','词书'];
 if(type==='csv'){
  const csv='\ufeff'+[headers,...rows.map(x=>[x.word,`${x.pos} ${x.meaning}`,x.date,x.book])].map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');downloadBlob(csv,'错题本词表.csv','text/csv;charset=utf-8');
 }else if(type==='word'){
  const trs=rows.map(x=>`<tr><td>${x.word}</td><td>${x.pos} ${x.meaning}</td><td>${x.date}</td><td>${x.book}</td></tr>`).join('');downloadBlob(`<html><meta charset="utf-8"><body><h1>错题本词表</h1><table border="1" cellspacing="0" cellpadding="8"><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr>${trs}</table></body></html>`,'错题本词表.doc','application/msword');
 }else{
  const w=window.open('','_blank');w.document.write(`<html><head><title>错题本词表</title><style>body{font-family:sans-serif;padding:32px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:10px;text-align:left}</style></head><body><h1>错题本词表</h1><table><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr>${rows.map(x=>`<tr><td>${x.word}</td><td>${x.pos} ${x.meaning}</td><td>${x.date}</td><td>${x.book}</td></tr>`).join('')}</table></body></html>`);w.document.close();setTimeout(()=>w.print(),250);
 }
 document.getElementById('exportMenu').classList.remove('open');
}
function downloadBlob(content,name,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
function setupTrendTooltip(){
 const tip=document.getElementById('chartTooltip');if(!tip)return;
 document.querySelectorAll('.trend-dot').forEach(dot=>{dot.onmouseenter=e=>{tip.textContent=`${dot.dataset.day}：复习 ${dot.dataset.value} 个单词`;tip.style.display='block';const card=dot.closest('.chart-card').getBoundingClientRect();tip.style.left=(e.clientX-card.left+12)+'px';tip.style.top=(e.clientY-card.top-38)+'px'};dot.onmousemove=dot.onmouseenter;dot.onmouseleave=()=>tip.style.display='none'});
}

function showView(id){['listView','groupView','modeView','exerciseView','doneView','reviewView','statsView'].forEach(v=>document.getElementById(v).classList.add('hidden'));document.getElementById(id).classList.remove('hidden')}
function openNav(name){
 document.querySelectorAll('[data-nav]').forEach(n=>n.classList.toggle('active',n.dataset.nav===name));
 showView(name==='book'?'listView':name==='review'?'reviewView':'statsView');
 if(name==='review'){renderReviewTable();closeWordDetail()}
 if(name==='stats')setupTrendTooltip();
}
function reviewModeFor(book){
 if(reviewMode==='速刷模式')return book==='考点词'?'key-flash':book==='话题词'?'topic-flash':'answer-flash';
 return book==='考点词'?'key-syn':book==='话题词'?'topic-meaning':'answer-spell';
}
function loadReviewItem(){
 const item=state.reviewQueue[state.reviewIndex];if(!item)return;
 currentType=item.book==='考点词'?'key':item.book==='话题词'?'topic':'answer';
 state.mode=reviewModeFor(item.book);state.index=0;
}
function startReview(){
 const rows=filteredReviewWords().slice(0,reviewCount);
 if(!rows.length){alert('当前筛选条件下没有需要复习的单词。');return}
 state.reviewQueue=rows.map(wordDetailSource);state.reviewIndex=0;state.fromReview=true;selectedGroup=1;
 loadReviewItem();resetItem();showView('exerciseView');renderExercise();
}
function returnToWordList(){
 if(state.fromReview){state.fromReview=false;openNav('review');return}
 showGroups(currentType,selectedGroup);
}
function typeName(t){return t==='key'?'考点词':t==='answer'?'答案词':'话题词'}
function defaultGroup(t){return t==='key'?12:t==='answer'?8:5}

function showGroups(t,activeGroup=defaultGroup(t)){
 currentType=t;showView('groupView');
 document.getElementById('groupTitle').textContent=typeName(t)+' · 选择词组';
 const cur=activeGroup;
 document.getElementById('groupGrid').innerHTML=Array.from({length:18},(_,i)=>i+1).map(n=>`<button class="group ${n===cur?'current':''}" onclick="openType('${t}',${n})">第${n}组</button>`).join('');
}
function openType(t,g){
 state.fromReview=false;currentType=t;selectedGroup=g;
 const modes=t==='key'
  ?[['刷词速记','快速听音，复习释义和同义替换','key-flash'],['同替练习','听主词条后，从5个音频中多选同义替换','key-syn']]
  :t==='answer'
  ?[['刷词速记','快速听音并熟悉答案词','answer-flash'],['拼写练习','听音后根据字母数量完整拼写答案词','answer-spell']]
  :[['刷词速记','快速听音并记忆话题词含义','topic-flash'],['词义速记','只听发音，选择正确的中文含义','topic-meaning']];
 document.getElementById('modeModalTitle').textContent=`第${g}组 · ${typeName(t)}`;
 document.getElementById('modeModalSub').textContent='请选择本组词汇复习模式';
 document.getElementById('modeModalGrid').innerHTML=modes.map(m=>`<div class="mode-choice"><h3>${m[0]}</h3><div class="desc">${m[1]}</div><button class="btn primary" onclick="startMode('${m[2]}')">进入练习</button></div>`).join('');
 document.getElementById('modeOverlay').classList.add('show');
 document.body.style.overflow='hidden';
}

function closeModeModal(e){if(e&&e.target!==e.currentTarget)return;document.getElementById('modeOverlay').classList.remove('show');document.body.style.overflow=''}

function resetItem(){state.selected=new Set();state.submitted=false;state.analysis=false;state.reveal=false;state.paused=false}
function startMode(mode){closeModeModal();state.mode=mode;state.index=0;resetItem();showView('exerciseView');renderExercise()}
function speak(t,rate=state.speed){if(!('speechSynthesis'in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='en-GB';u.rate=rate;speechSynthesis.speak(u)}
function currentData(){if(state.fromReview)return state.reviewQueue[state.reviewIndex];if(state.mode==='key-syn')return keySynData[state.index%keySynData.length];if(state.mode.startsWith('key'))return keyData[state.index%keyData.length];if(state.mode.startsWith('answer'))return answerData[state.index%answerData.length];return topicData[state.index%topicData.length]}

function settingsHTML(extra=''){
 return `<div class="settings" id="settings"><div class="settings-head"><h2>⚙ 练习设置</h2><button class="close" id="closeSettings">×</button></div>
   <div class="row"><div class="rowtop"><span>自动发音</span><button class="toggle ${state.auto?'on':''}" id="autoToggle"></button></div></div>
   ${extra}
   <div class="row"><div class="rowtop"><span>播放速度</span></div><div class="segs" id="speedSegs">${[0.5,1,1.2,1.5,2].map(v=>`<button class="seg ${state.speed===v?'sel':''}" data-v="${v}">${v}×</button>`).join('')}</div></div>
   <div class="row"><div class="rowtop"><span>播放间隔</span></div><div class="segs" id="intervalSegs">${[1,2,3,5].map(v=>`<button class="seg ${state.interval===v?'sel':''}" data-v="${v}">${v}秒</button>`).join('')}</div></div>
   <div class="row"><div class="rowtop"><span>播放次数</span></div><div class="segs" id="countSegs">${['1次','2次','单词循环','本组循环'].map(v=>`<button class="seg ${state.count===v?'sel':''}" data-v="${v}">${v}</button>`).join('')}</div></div>
 </div>`;
}
function commonCardStart(title,subtitle,extraSettings=''){
 const heading=state.fromReview?`复习 · ${title}`:`第${selectedGroup}组 · ${title}`;
 const progress=state.fromReview?`${state.reviewIndex+1} / ${state.reviewQueue.length}`:`${state.index+1} / 20`;
 return `<div class="exercise-page"><div class="header"><div><h1>${heading}</h1><div class="sub">${subtitle}</div></div><button class="back" onclick="returnToWordList()">← 返回词汇列表</button></div>
 <div class="card" id="card"><div class="card-top"><span>${title} / ${subtitle}</span><strong>${progress}</strong></div><button class="gear" id="gear">⚙</button>${settingsHTML(extraSettings)}<div class="main">`;
}
function commonBottom(buttons){return `</div><div class="bottom" style="grid-template-columns:repeat(${buttons.length},1fr)">${buttons.join('')}</div></div></div>`}

function renderExercise(){
 if(state.mode==='key-syn')return renderKeySyn();
 if(state.mode==='key-flash')return renderKeyFlash();
 if(state.mode==='answer-flash')return renderAnswerFlash();
 if(state.mode==='answer-spell')return renderAnswerSpell();
 if(state.mode==='topic-flash')return renderTopicFlash();
 if(state.mode==='topic-meaning')return renderTopicMeaning();
}



function highlightChineseAnswer(sentence,fragments=[]){
 let result=sentence;
 fragments.forEach(f=>{
   if(!f)return;
   const escaped=f.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
   result=result.replace(new RegExp(escaped,'g'),m=>`<span class="hl">${m}</span>`);
 });
 return result;
}

function highlightKeySource(sentence,word){
 const escaped=word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 return sentence.replace(new RegExp(`\\b${escaped}\\b`,'gi'),m=>`<span class="hl">${m}</span>`);
}
function highlightChineseFragments(sentence,fragments=[]){
 let result=sentence;
 fragments.forEach(f=>{
   if(!f)return;
   const escaped=f.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
   result=result.replace(new RegExp(escaped,'g'),m=>`<span class="hl">${m}</span>`);
 });
 return result;
}

function renderKeySyn(){
 const d=currentData();
 document.getElementById('exerciseView').innerHTML=commonCardStart('考点词','同替练习')+
 `<div class="word-line"><div class="word">${d.word}</div><button class="small-audio" onclick="speak('${d.word}')">🔊</button></div><div class="phon">${d.phon}</div><div class="pos">${d.pos}${(state.submitted||state.analysis)?` <span style="margin-left:10px">${d.meaning}</span>`:''}</div>
 <div class="status">🔊 准备自动播放 1 / 5 …</div><div class="prompt">🎧 请选择所有含义相同或相近的词语（可多选）</div>
 <div class="options">${d.opts.map((o,i)=>`<div class="opt" data-opt="${i}"><button class="circle" data-audio="${i}">🔊</button><div class="select-row"><button class="pickbox ${state.selected.has(i)?'selected':''}" data-pick="${i}"></button><span class="letter">${String.fromCharCode(65+i)}</span></div><div class="meta">${(state.submitted||state.analysis)?`<strong>${o.en}</strong><br>${o.zh}`:''}</div></div>`).join('')}</div>
 <div class="feedback" id="feedback"></div>
 ${state.analysis?`<div class="analysis"><h3>▤ 解析</h3><div class="block"><div class="label">题目</div><div class="q">${d.question.replace('______',`<span class="hl">${d.word}</span>`)}</div></div><div class="block"><div class="label">对应原文</div><div class="q">${highlightKeySource(d.source,d.word)}</div></div><div class="block"><div class="label">对应原文中文翻译</div><div>${highlightChineseFragments(d.translation,d.translationHighlights||[])}</div></div></div>`:''}`+
 commonBottom([
 '<button class="ctrl" id="prev"><span class="ico">⏮</span>上一词</button>','<button class="ctrl"><span class="ico">Ⅱ</span>暂停</button>','<button class="ctrl" id="next"><span class="ico">⏭</span>下一词</button>','<button class="ctrl" id="replay"><span class="ico">↻</span>再听一遍</button>','<button class="ctrl" id="analysisBtn"><span class="ico">☼</span>查看解析</button>','<button class="ctrl primary" id="submit"><span class="ico">✓</span>确认答案</button>'
 ]);
 wireBase();
 document.querySelectorAll('[data-audio]').forEach(b=>b.onclick=()=>speak(d.opts[+b.dataset.audio].en));
 document.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{if(state.submitted)return;const i=+b.dataset.pick;state.selected.has(i)?state.selected.delete(i):state.selected.add(i);b.classList.toggle('selected',state.selected.has(i))});
 if(state.submitted||state.analysis)document.querySelectorAll('[data-opt]').forEach((el,i)=>{
   if(d.opts[i].correct)el.classList.add('correct');
   else if(state.submitted&&state.selected.has(i))el.classList.add('wrong');
 });
 if(state.analysis&&!state.submitted){
   const f=document.getElementById('feedback');
   if(f){
     f.className='feedback bad';
     f.textContent='正确答案已标出。';
   }
 }
 document.getElementById('submit').onclick=()=>{state.submitted=true;const correct=d.opts.map((o,i)=>o.correct?i:null).filter(i=>i!==null);const chosen=[...state.selected].sort();const ok=correct.length===chosen.length&&correct.every((v,i)=>v===chosen[i]);if(!ok)addReviewWord(d,'考点词','同替误选');renderKeySyn();const f=document.getElementById('feedback');f.className='feedback '+(ok?'ok':'bad');f.textContent=ok?'✓ 回答正确':'答案有遗漏或误选，已自动加入复习。'};
 document.getElementById('analysisBtn').onclick=()=>{
   state.analysis=!state.analysis;
   renderKeySyn();
 };
 document.getElementById('replay').onclick=()=>{resetItem();renderKeySyn();setTimeout(()=>d.opts.forEach((o,i)=>setTimeout(()=>speak(o.en),i*1000)),100)};
}

function renderKeyFlash(){
 const d=currentData();
 const extra=`<div class="row"><div class="rowtop"><span>显示释义</span><button class="toggle ${state.showMeaning?'on':''}" id="meaningToggle"></button></div></div><div class="row"><div class="rowtop"><span>显示同替</span><button class="toggle ${state.showSynonyms?'on':''}" id="synToggle"></button></div></div>`;
 document.getElementById('exerciseView').innerHTML=commonCardStart('考点词','刷词速记',extra)+
 `<div class="word-line"><div class="word">${d.word}</div><button class="small-audio" onclick="speak('${d.word}')">🔊</button></div><div class="phon">${d.phon}</div><div class="pos">${d.pos}</div>
 ${(state.showMeaning||state.reveal)?`<div class="meaning">${d.meaning}</div>`:`<div class="hidden-tip">中文释义已隐藏</div>`}
 ${(state.showSynonyms||state.reveal)?`<div class="flash-synbox"><h3>同义替换</h3>${d.opts.filter(o=>o.correct).map(o=>`<div class="flash-synrow"><strong>${o.en}</strong><span>${o.zh}</span><button class="flash-mini-audio" onclick="speak('${o.en}')">🔊</button></div>`).join('')}</div>`:`<div class="hidden-tip">同义替换已隐藏</div>`}`+
 commonBottom(['<button class="ctrl" id="prev"><span class="ico">⏮</span>上一词</button>','<button class="ctrl"><span class="ico">Ⅱ</span>暂停</button>','<button class="ctrl" id="next"><span class="ico">⏭</span>下一词</button>','<button class="ctrl" onclick="speak(\''+d.word+'\')"><span class="ico">↻</span>再听一遍</button>','<button class="ctrl primary" id="reveal"><span class="ico">◉</span>'+(state.reveal?'隐藏答案':'查看答案')+'</button>']);
 wireBase();
 document.getElementById('meaningToggle').onclick=()=>{state.showMeaning=!state.showMeaning;renderKeyFlash()};
 document.getElementById('synToggle').onclick=()=>{state.showSynonyms=!state.showSynonyms;renderKeyFlash()};
 document.getElementById('reveal').onclick=()=>{state.reveal=!state.reveal;renderKeyFlash()};
}

function renderAnswerFlash(){
 const d=currentData();
 const extra=`<div class="row"><div class="rowtop"><span>显示释义</span><button class="toggle ${state.answerShowMeaning?'on':''}" id="answerFlashMeaningToggle"></button></div></div>`;

 const revealMeaning = state.answerShowMeaning || state.analysis;

 document.getElementById('exerciseView').innerHTML=commonCardStart('答案词','刷词速记',extra)+
 `<div class="word-line">
    <div class="word">${d.word}</div>
    <button class="small-audio" onclick="speak('${d.word}')">🔊</button>
  </div>
  <div class="phon">${d.phon}</div>
  <div class="pos">${d.pos}${revealMeaning?` <span style="margin-left:12px;font-weight:700">${d.meaning}</span>`:''}</div>

  ${state.analysis?`
    <div class="analysis" style="margin-top:34px">
      <h3>▤ 解析</h3>
      <div class="block">
        <div class="label">例句</div>
        <div class="q">${highlightExample(d.example,d.word)}</div>
      </div>
      <div class="block">
        <div class="label">例句中文释义</div>
        <div>${highlightChineseAnswer(d.translation,d.translationHighlights||[d.meaning])}</div>
      </div>
    </div>`:''}`+

 commonBottom([
   '<button class="ctrl" id="prev"><span class="ico">⏮</span>上一词</button>',
   '<button class="ctrl"><span class="ico">Ⅱ</span>暂停</button>',
   '<button class="ctrl" id="next"><span class="ico">⏭</span>下一词</button>',
   '<button class="ctrl" id="answerFlashReplay"><span class="ico">↻</span>再听一遍</button>',
   '<button class="ctrl" id="answerFlashAnalysis"><span class="ico">☼</span>查看解析</button>'
 ]);

 wireBase();

 const meaningToggle=document.getElementById('answerFlashMeaningToggle');
 if(meaningToggle){
   meaningToggle.onclick=()=>{
     state.answerShowMeaning=!state.answerShowMeaning;
     state.analysis=false;
     renderAnswerFlash();
   };
 }

 document.getElementById('answerFlashAnalysis').onclick=()=>{
   state.analysis=!state.analysis;
   renderAnswerFlash();
 };

 document.getElementById('answerFlashReplay').onclick=()=>{
   state.analysis=false;
   renderAnswerFlash();
   setTimeout(()=>speak(d.word),160);
 };
}


function highlightExample(sentence,word){
 const escaped=word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 return sentence.replace(new RegExp(`\\b${escaped}\\b`,'gi'),m=>`<span class="hl">${m}</span>`);
}

function renderAnswerSpell(){
 const d=currentData();
 const extra=`<div class="row"><div class="rowtop"><span>显示释义</span><button class="toggle ${state.answerShowMeaning?'on':''}" id="answerMeaningToggle"></button></div></div>`;

 document.getElementById('exerciseView').innerHTML=commonCardStart('答案词','拼写练习',extra)+
 `<div class="word-line"><button class="circle" style="border:0" onclick="speak('${d.word}')">🔊</button></div>
  <div class="pos" style="margin-top:22px">词性：${d.pos}<span id="answerMeaningInline">${state.submitted?` <span style="margin-left:14px;font-weight:700">${d.meaning}</span>`:''}</span></div>

  ${state.answerShowMeaning && !state.submitted ? `<div class="meaning" style="font-size:18px">${d.meaning}</div>` : ''}

  <div class="spell-wrap">
    <div class="spell-inline" id="spellCells">
      ${d.word.split('').map((_,i)=>`<input class="spell-cell" maxlength="1" data-i="${i}" autocomplete="off">`).join('')}
    </div>
    <div style="margin-top:22px"><button class="btn primary" id="spellSubmit">确认拼写</button></div>
    <div class="spell-result" id="spellResult"></div>
    ${state.submitted?`<div class="correct-word-display">正确答案：${d.word}</div>`:''}
  </div>

  ${state.submitted?`<div class="answer-info">
     <div class="info-line" style="border-top:0">
       <div class="label">例句</div>
       <div class="example-box">${highlightExample(d.example,d.word)}</div>
     </div>
     <div class="info-line">
       <div class="label">例句中文翻译</div>
       <div>${d.translation}</div>
     </div>
   </div>`:''}`+
 commonBottom([
   '<button class="ctrl" id="prev"><span class="ico">⏮</span>上一词</button>',
   '<button class="ctrl"><span class="ico">Ⅱ</span>暂停</button>',
   '<button class="ctrl" id="next"><span class="ico">⏭</span>下一词</button>',
   '<button class="ctrl" id="answerReplay"><span class="ico">↻</span>再听一遍</button>'
 ]);

 wireBase();

 const cells=[...document.querySelectorAll('.spell-cell')];

 // User types directly on the underlines.
 cells.forEach((cell,i)=>{
   cell.addEventListener('input',()=>{
     cell.value=cell.value.slice(-1).toLowerCase();
     if(cell.value && i<cells.length-1) cells[i+1].focus();
   });
   cell.addEventListener('keydown',e=>{
     if(e.key==='Backspace' && !cell.value && i>0) cells[i-1].focus();
   });
 });

 if(cells[0]) cells[0].focus();

 document.getElementById('spellSubmit').onclick=()=>{
   state.submitted=true;
   const typed=cells.map(c=>c.value.toLowerCase());
   cells.forEach((c,i)=>{
     c.classList.remove('correct','wrong');
     c.classList.add(typed[i]===d.word[i]?'correct':'wrong');
     c.disabled=true;
   });
   const ok=typed.join('')===d.word;
   if(!ok)addReviewWord(d,'答案词','拼写错误');
   const meaningInline=document.getElementById('answerMeaningInline');
   if(meaningInline) meaningInline.innerHTML=` <span style="margin-left:14px;font-weight:700">${d.meaning}</span>`;
   const r=document.getElementById('spellResult');
   r.style.color=ok?'var(--green)':'var(--red)';
   r.textContent=ok?'✓ 拼写正确':'拼写完成：绿色为正确字母，红色为错误字母；该词已自动加入复习。';

   if(!document.querySelector('.correct-word-display')){
     const answer=document.createElement('div');
     answer.className='correct-word-display';
     answer.textContent='正确答案：'+d.word;
     r.insertAdjacentElement('afterend',answer);
   }

   // Append all answer-word information after checking.
   if(!document.querySelector('.answer-info')){
     const info=document.createElement('div');
     info.className='answer-info';
     info.innerHTML=`
       <div class="info-line" style="border-top:0">
         <div class="label">例句</div>
         <div class="example-box">${highlightExample(d.example,d.word)}</div>
       </div>
       <div class="info-line">
         <div class="label">例句中文翻译</div>
         <div>${d.translation}</div>
       </div>`;
     document.querySelector('.spell-wrap').appendChild(info);
   }
 };

 document.getElementById('answerReplay').onclick=()=>{
   state.submitted=false;
   renderAnswerSpell();
   setTimeout(()=>speak(d.word),160);
 };

 const toggle=document.getElementById('answerMeaningToggle');
 if(toggle){
   toggle.onclick=()=>{
     state.answerShowMeaning=!state.answerShowMeaning;
     renderAnswerSpell();
   };
 }
}

function renderTopicFlash(){
 const d=currentData();
 const extra=`<div class="row"><div class="rowtop"><span>显示释义</span><button class="toggle ${state.answerShowMeaning?'on':''}" id="topicFlashMeaningToggle"></button></div></div>`;
 const revealMeaning = state.answerShowMeaning || state.analysis;

 document.getElementById('exerciseView').innerHTML=commonCardStart('话题词','刷词速记',extra)+
 `<div class="word-line">
    <div class="word">${d.word}</div>
    <button class="small-audio" onclick="speak('${d.word}')">🔊</button>
  </div>
  <div class="phon">${d.phon}</div>
  <div class="pos">${d.pos}${revealMeaning?` <span style="margin-left:12px;font-weight:700">${d.meaning}</span>`:''}</div>

  ${state.analysis?`
    <div class="analysis" style="margin-top:34px">
      <h3>▤ 解析</h3>
      <div class="block">
        <div class="label">例句</div>
        <div class="q">${highlightExample(d.example,d.word)}</div>
      </div>
      <div class="block">
        <div class="label">例句中文释义</div>
        <div>${d.translation}</div>
      </div>
    </div>`:''}`+

 commonBottom([
   '<button class="ctrl" id="prev"><span class="ico">⏮</span>上一词</button>',
   '<button class="ctrl"><span class="ico">Ⅱ</span>暂停</button>',
   '<button class="ctrl" id="next"><span class="ico">⏭</span>下一词</button>',
   '<button class="ctrl" id="topicFlashReplay"><span class="ico">↻</span>再听一遍</button>',
   '<button class="ctrl" id="topicFlashAnalysis"><span class="ico">☼</span>查看解析</button>'
 ]);

 wireBase();

 const meaningToggle=document.getElementById('topicFlashMeaningToggle');
 if(meaningToggle){
   meaningToggle.onclick=()=>{
     state.answerShowMeaning=!state.answerShowMeaning;
     state.analysis=false;
     renderTopicFlash();
   };
 }

 document.getElementById('topicFlashAnalysis').onclick=()=>{
   state.analysis=!state.analysis;
   renderTopicFlash();
 };

 document.getElementById('topicFlashReplay').onclick=()=>{
   state.analysis=false;
   renderTopicFlash();
   setTimeout(()=>speak(d.word),160);
 };
}

function renderTopicMeaning(){
 const d=currentData();

 document.getElementById('exerciseView').innerHTML=commonCardStart('话题词','词义速记')+
 `<div class="word-line"><button class="circle" style="border:0" onclick="speak('${d.word}')">🔊</button></div>
  <div class="prompt">听发音，选择正确的中文含义</div>

  ${state.submitted?`
    <div class="analysis" style="text-align:center;margin-top:24px">
      <div class="word-line">
        <div class="word" style="font-size:34px">${d.word}</div>
        <button class="small-audio" onclick="speak('${d.word}')">🔊</button>
      </div>
      <div class="phon">${d.phon}</div>
      <div class="meaning">${d.meaning}</div>
    </div>`:''}

  <div class="choice-list">
    ${d.options.map((o,i)=>`<button class="choice ${state.selected.has(i)?'selected':''}" data-choice="${i}">${String.fromCharCode(65+i)}. ${o}</button>`).join('')}
  </div>

  <div id="topicResult" class="feedback"></div>

  ${state.analysis?`
    <div class="analysis" style="margin-top:28px">
      <h3>▤ 解析</h3>
      <div class="block">
        <div class="label">例句</div>
        <div class="q">${highlightExample(d.example,d.word)}</div>
      </div>
      <div class="block">
        <div class="label">例句中文释义</div>
        <div>${d.translation}</div>
      </div>
    </div>`:''}`+

 commonBottom([
   '<button class="ctrl" id="prev"><span class="ico">⏮</span>上一词</button>',
   '<button class="ctrl"><span class="ico">Ⅱ</span>暂停</button>',
   '<button class="ctrl" id="next"><span class="ico">⏭</span>下一词</button>',
   '<button class="ctrl" onclick="speak(\''+d.word+'\')"><span class="ico">↻</span>再听一遍</button>',
   '<button class="ctrl" id="topicAnalysis"><span class="ico">☼</span>查看解析</button>',
   '<button class="ctrl primary" id="topicSubmit"><span class="ico">✓</span>确认答案</button>'
 ]);

 wireBase();

 document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{
   if(state.submitted)return;
   state.selected=new Set([+b.dataset.choice]);
   renderTopicMeaning();
 });

 if(state.submitted){
   document.querySelectorAll('[data-choice]').forEach((b,i)=>{
     if(d.options[i]===d.meaning)b.classList.add('correct');
     else if(state.selected.has(i))b.classList.add('wrong');
   });
 }

 document.getElementById('topicSubmit').onclick=()=>{
   state.submitted=true;
   const chosen=[...state.selected][0];
   const ok=chosen!==undefined && d.options[chosen]===d.meaning;
   if(!ok)addReviewWord(d,'话题词','词义混淆');
   renderTopicMeaning();
   const r=document.getElementById('topicResult');
   r.className='feedback '+(ok?'ok':'bad');
   r.textContent=ok?'✓ 回答正确':'回答错误，正确答案已标出，并已自动加入复习。';
 };

 document.getElementById('topicAnalysis').onclick=()=>{
   state.analysis=!state.analysis;
   renderTopicMeaning();
 };
}





function showKeySynDone(){
 showView('doneView');
 const done=document.getElementById('doneView');
 done.innerHTML=`
   <div class="topbar">
     <div>
       <h1>第${selectedGroup}组 · 考点词</h1>
       <div class="sub">同替练习</div>
     </div>
     <button class="btn" onclick="showGroups(currentType,selectedGroup)">← 返回词汇列表</button>
   </div>
   <div class="done-card">
     <div class="done-icon">✓</div>
     <div class="done-title">已完成刷词</div>
     <div class="done-sub">本组考点词同替练习已全部完成</div>
     <div class="done-stats">
       <div class="done-stat"><div class="sub">本组单词</div><div class="num">${keySynData.length}</div></div>
       <div class="done-stat"><div class="sub">待复习</div><div class="num">0</div></div>
     </div>
     <div class="done-actions">
       <button class="btn" onclick="state.index=0;resetItem();showView('exerciseView');renderKeySyn()">再练一遍</button>
       <button class="btn primary" onclick="openType('key',selectedGroup+1)">下一组</button>
     </div>
   </div>`;
}

function showKeyFlashDone(){
 showView('doneView');
 const done=document.getElementById('doneView');
 done.innerHTML=`
   <div class="topbar">
     <div>
       <h1>第${selectedGroup}组 · 考点词</h1>
       <div class="sub">刷词速记</div>
     </div>
     <button class="btn" onclick="showGroups(currentType,selectedGroup)">← 返回词汇列表</button>
   </div>
   <div class="done-card">
     <div class="done-icon">✓</div>
     <div class="done-title">已完成刷词</div>
     <div class="done-sub">本组考点词刷词速记已全部完成</div>

     <div class="done-stats">
       <div class="done-stat">
         <div class="sub">本组单词</div>
         <div class="num">${keyData.length}</div>
       </div>
       <div class="done-stat">
         <div class="sub">待复习</div>
         <div class="num">0</div>
       </div>
     </div>

     <div class="done-actions">
       <button class="btn" onclick="state.index=0;resetItem();showView('exerciseView');renderKeyFlash()">再练一遍</button>
       <button class="btn primary" onclick="openType('key',selectedGroup+1)">下一组</button>
     </div>
   </div>`;
}

function showAnswerFlashDone(){
 showView('doneView');
 const done=document.getElementById('doneView');
 done.innerHTML=`
   <div class="topbar">
     <div>
       <h1>第${selectedGroup}组 · 答案词</h1>
       <div class="sub">刷词速记</div>
     </div>
     <button class="btn" onclick="showGroups(currentType,selectedGroup)">← 返回词汇列表</button>
   </div>
   <div class="done-card">
     <div class="done-icon">✓</div>
     <div class="done-title">已完成刷词</div>
     <div class="done-sub">本组答案词刷词速记已全部完成</div>

     <div class="done-stats">
       <div class="done-stat">
         <div class="sub">本组单词</div>
         <div class="num">${answerData.length}</div>
       </div>
       <div class="done-stat">
         <div class="sub">待复习</div>
         <div class="num">0</div>
       </div>
     </div>

     <div class="done-actions">
       <button class="btn" onclick="state.index=0;resetItem();showView('exerciseView');renderAnswerFlash()">再练一遍</button>
       <button class="btn primary" onclick="openType('answer',selectedGroup+1)">下一组</button>
     </div>
   </div>`;
}


function showTopicMeaningDone(){
 showView('doneView');
 const done=document.getElementById('doneView');
 done.innerHTML=`
   <div class="topbar">
     <div>
       <h1>第${selectedGroup}组 · 话题词</h1>
       <div class="sub">词义速记</div>
     </div>
     <button class="btn" onclick="showGroups(currentType,selectedGroup)">← 返回词汇列表</button>
   </div>
   <div class="done-card">
     <div class="done-icon">✓</div>
     <div class="done-title">已完成刷词</div>
     <div class="done-sub">本组话题词词义速记已全部完成</div>

     <div class="done-stats">
       <div class="done-stat">
         <div class="sub">本组单词</div>
         <div class="num">${topicData.length}</div>
       </div>
       <div class="done-stat">
         <div class="sub">待复习</div>
         <div class="num">0</div>
       </div>
     </div>

     <div class="done-actions">
       <button class="btn" onclick="state.index=0;resetItem();showView('exerciseView');renderTopicMeaning()">再练一遍</button>
       <button class="btn primary" onclick="openType('topic',selectedGroup+1)">下一组</button>
     </div>
   </div>`;
}

function showTopicFlashDone(){
 showView('doneView');
 const done=document.getElementById('doneView');
 done.innerHTML=`
   <div class="topbar">
     <div>
       <h1>第${selectedGroup}组 · 话题词</h1>
       <div class="sub">刷词速记</div>
     </div>
     <button class="btn" onclick="showGroups(currentType,selectedGroup)">← 返回词汇列表</button>
   </div>
   <div class="done-card">
     <div class="done-icon">✓</div>
     <div class="done-title">已完成刷词</div>
     <div class="done-sub">本组话题词刷词速记已全部完成</div>

     <div class="done-stats">
       <div class="done-stat">
         <div class="sub">本组单词</div>
         <div class="num">${topicData.length}</div>
       </div>
       <div class="done-stat">
         <div class="sub">待复习</div>
         <div class="num">0</div>
       </div>
     </div>

     <div class="done-actions">
       <button class="btn" onclick="state.index=0;resetItem();showView('exerciseView');renderTopicFlash()">再练一遍</button>
       <button class="btn primary" onclick="openType('topic',selectedGroup+1)">下一组</button>
     </div>
   </div>`;
}

function showAnswerDone(){
 showView('doneView');
 const done=document.getElementById('doneView');
 done.innerHTML=`
   <div class="topbar">
     <div>
       <h1>第${selectedGroup}组 · 答案词</h1>
       <div class="sub">拼写练习</div>
     </div>
     <button class="btn" onclick="showGroups(currentType,selectedGroup)">← 返回词汇列表</button>
   </div>
   <div class="done-card">
     <div class="done-icon">✓</div>
     <div class="done-title">已完成刷词</div>
     <div class="done-sub">本组答案词拼写练习已全部完成</div>

     <div class="done-stats">
       <div class="done-stat">
         <div class="sub">本组单词</div>
         <div class="num">${answerData.length}</div>
       </div>
       <div class="done-stat">
         <div class="sub">待复习</div>
         <div class="num">${answerData.length}</div>
       </div>
     </div>

     <div class="done-actions">
       <button class="btn" onclick="state.index=0;resetItem();showView('exerciseView');renderAnswerSpell()">再练一遍</button>
       <button class="btn primary" onclick="openType('answer',selectedGroup+1)">下一组</button>
     </div>
   </div>`;
}

function showReviewDone(){
 showView('doneView');
 document.getElementById('doneView').innerHTML=`<div class="topbar"><div><h1>复习完成</h1><div class="sub">本轮已按筛选条件完成复习</div></div><button class="btn" onclick="returnToWordList()">← 返回复习列表</button></div><div class="done-card"><div class="done-icon">✓</div><div class="done-title">本轮复习已完成</div><div class="done-sub">已完成 ${state.reviewQueue.length} 个错词</div><div class="done-stats"><div class="done-stat"><div class="sub">复习单词</div><div class="num">${state.reviewQueue.length}</div></div><div class="done-stat"><div class="sub">复习模式</div><div class="num" style="font-size:20px">${reviewMode}</div></div></div><div class="done-actions"><button class="btn primary" onclick="returnToWordList()">返回复习列表</button></div></div>`;
}

function wireBase(){
 setupSettings();
 const prev=document.getElementById('prev'),next=document.getElementById('next');
 if(prev)prev.onclick=()=>{
   if(state.fromReview){if(state.reviewIndex>0){state.reviewIndex--;loadReviewItem();resetItem();renderExercise()}return}
   if(state.index>0){state.index--;resetItem();renderExercise()}
 };
 if(next)next.onclick=()=>{
   if(state.fromReview){
     if(state.reviewIndex<state.reviewQueue.length-1){state.reviewIndex++;loadReviewItem();resetItem();renderExercise()}else{showReviewDone()}
     return;
   }
   if(state.mode==='topic-meaning'){
     if(state.index < topicData.length-1){
       state.index++;
       resetItem();
       renderTopicMeaning();
     }else{
       showTopicMeaningDone();
     }
     return;
   }

   if(state.mode==='key-syn'){
     if(state.index < keySynData.length-1){
       state.index++;
       resetItem();
       renderKeySyn();
     }else{
       showKeySynDone();
     }
     return;
   }

   if(state.mode==='answer-spell'){
     if(state.index < answerData.length-1){
       state.index++;
       resetItem();
       renderAnswerSpell();
     }else{
       showAnswerDone();
     }
     return;
   }

   if(state.mode==='key-flash'){
     if(state.index < keyData.length-1){
       state.index++;
       resetItem();
       renderKeyFlash();
     }else{
       showKeyFlashDone();
     }
     return;
   }

   if(state.mode==='answer-flash'){
     if(state.index < answerData.length-1){
       state.index++;
       resetItem();
       renderAnswerFlash();
     }else{
       showAnswerFlashDone();
     }
     return;
   }

   if(state.mode==='topic-flash'){
     if(state.index < topicData.length-1){
       state.index++;
       resetItem();
       renderTopicFlash();
     }else{
       showTopicFlashDone();
     }
     return;
   }

   state.index=(state.index+1)%3;
   resetItem();
   renderExercise();
 };
 if(state.auto)setTimeout(()=>speak(currentData().word),180);
}
function setupSettings(){
 const card=document.getElementById('card'),gear=document.getElementById('gear'),settings=document.getElementById('settings');
 let drag=false,moved=false,sx=0,sy=0,ox=0,oy=0;
 function place(){let left=gear.offsetLeft+gear.offsetWidth+12,top=gear.offsetTop;if(left+settings.offsetWidth>card.clientWidth-14)left=gear.offsetLeft-settings.offsetWidth-12;if(left<14)left=14;if(top+settings.offsetHeight>card.clientHeight-14)top=card.clientHeight-settings.offsetHeight-14;if(top<14)top=14;settings.style.left=left+'px';settings.style.top=top+'px'}
 gear.addEventListener('pointerdown',e=>{drag=true;moved=false;sx=e.clientX;sy=e.clientY;ox=gear.offsetLeft;oy=gear.offsetTop;gear.setPointerCapture(e.pointerId)});
 gear.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)+Math.abs(dy)>4)moved=true;const x=Math.max(8,Math.min(card.clientWidth-gear.offsetWidth-8,ox+dx));const y=Math.max(8,Math.min(card.clientHeight-gear.offsetHeight-8,oy+dy));gear.style.left=x+'px';gear.style.top=y+'px';gear.style.right='auto';if(settings.classList.contains('show'))place()});
 gear.addEventListener('pointerup',()=>{drag=false;if(!moved){settings.classList.toggle('show');if(settings.classList.contains('show'))place()}});
 document.getElementById('closeSettings').onclick=()=>settings.classList.remove('show');
 document.getElementById('autoToggle').onclick=()=>{state.auto=!state.auto;renderExercise()};
 document.querySelectorAll('#speedSegs .seg').forEach(b=>b.onclick=()=>{state.speed=+b.dataset.v;renderExercise()});
 document.querySelectorAll('#intervalSegs .seg').forEach(b=>b.onclick=()=>{state.interval=+b.dataset.v;renderExercise()});
 document.querySelectorAll('#countSegs .seg').forEach(b=>b.onclick=()=>{state.count=b.dataset.v;renderExercise()});
}
