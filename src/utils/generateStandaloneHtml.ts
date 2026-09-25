import { CHAPTERS, BOOK_METADATA } from '../data/bookContent';

export function generateStandaloneHtml(): string {
  const chaptersHtml = CHAPTERS.map((ch) => {
    const isPartStart = ch.number === 1 || ch.number === 12 || ch.number === 20 || ch.number === 30 || ch.number === 39 || ch.number === 47 || ch.number === 55;
    let partBanner = '';
    if (isPartStart) {
      partBanner = `
      <div class="part-banner reveal-on-scroll">
        <span class="part-tag">${ch.partTitle}</span>
      </div>`;
    }

    const sectionsHtml = ch.sections.map((sec, sIdx) => {
      let content = '';
      if (sec.title) {
        content += `<h3 class="section-title reveal-on-scroll">${sec.title}</h3>\n`;
      }
      sec.paragraphs.forEach((p, pIdx) => {
        const isDropCap = sIdx === 0 && pIdx === 0;
        content += `<p class="prose-p reveal-on-scroll ${isDropCap ? 'drop-cap' : ''}">${p}</p>\n`;
      });
      if (sec.quote) {
        const safeQuote = sec.quote.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        content += `
        <figure class="quote-box reveal-on-scroll">
          <div class="quote-header">
            <span class="quote-symbol">❝</span>
            <button class="quote-copy-btn" onclick="copyQuote(this)" data-quote="${safeQuote}" title="نسخ الاقتباس">
              <span class="btn-icon">📋</span>
              <span class="btn-text">نسخ الاقتباس</span>
            </button>
          </div>
          <blockquote class="quote-text">«${sec.quote}»</blockquote>
        </figure>\n`;
      }
      if (sec.callout) {
        content += `
        <div class="callout callout-${sec.callout.type} reveal-on-scroll">
          <strong>${sec.callout.title}</strong>
          <p>${sec.callout.text}</p>
        </div>\n`;
      }
      if (sec.customComponent === 'yerkes') {
        content += `
        <div class="interactive-box reveal-on-scroll" id="yerkes-interactive-container">
          <div class="interactive-header">
            <h4>محاكي قانون Yerkes-Dodson للعقل التداولي</h4>
            <span class="interactive-tag">اسحب المؤشر لاختبار الاستثارة</span>
          </div>
          <div class="svg-container">
            <svg id="yerkes-svg" viewBox="0 0 600 220" class="curve-svg">
              <path id="curve-path" d="M 40,200 Q 300,30 560,200" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
              <circle id="curve-dot" cx="300" cy="30" r="8" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
            </svg>
          </div>
          <div class="slider-wrapper">
            <input type="range" id="yerkes-slider-input" min="0" max="100" value="50" oninput="updateYerkes(this.value)">
            <div class="slider-labels">
              <span>0% خمول وكسل</span>
              <span id="yerkes-val-text" style="font-weight:bold; color:#d97706;">الاستثارة: 50%</span>
              <span>100% غضب وذعر</span>
            </div>
          </div>
          <div id="yerkes-desc-box" class="interactive-desc">
            <strong>المنطقة الذهبية (استثارة مناسبة ومتوازنة):</strong>
            <p>تركيز حاد، حضور ذهني، تقبل كامل لاحتمالات الخسارة، والتزام حديدي بإدارة المخاطر.</p>
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'performance-formula') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>حاسبة معادلة الأداء: المهارة × الحالة النفسية × الحالة الجسدية × التنفيذ</h4>
          </div>
          <p style="font-size:0.85rem; color:var(--muted); margin-bottom:1rem;">
            النتيجة قائمة على الضرب (Multiplication). إذا انخفضت حالتك الجسدية أو النفسية، فإن المحصلة تنهار ولو بلغت مهارتك 95%.
          </p>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
            <div>
              <label style="font-size:0.8rem; font-weight:bold;">المهارة الفنية: <span id="val-s">90%</span></label>
              <input type="range" min="20" max="100" value="90" oninput="document.getElementById('val-s').innerText=this.value+'%'; calcPerf();" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.8rem; font-weight:bold;">الحالة النفسية: <span id="val-m">40%</span></label>
              <input type="range" min="10" max="100" value="40" oninput="document.getElementById('val-m').innerText=this.value+'%'; calcPerf();" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.8rem; font-weight:bold;">الحالة الجسدية والنوم: <span id="val-p">50%</span></label>
              <input type="range" min="10" max="100" value="50" oninput="document.getElementById('val-p').innerText=this.value+'%'; calcPerf();" style="width:100%;">
            </div>
            <div>
              <label style="font-size:0.8rem; font-weight:bold;">جودة التنفيذ: <span id="val-e">75%</span></label>
              <input type="range" min="10" max="100" value="75" oninput="document.getElementById('val-e').innerText=this.value+'%'; calcPerf();" style="width:100%;">
            </div>
          </div>
          <div id="perf-score-card" style="padding:1rem; border-radius:10px; background:var(--accent-light); border:1px solid var(--accent); font-weight:bold; font-size:1rem; text-align:center;">
            كفاءة التداول الحقيقية: 14% (خطر داهم - عدم التداول هو أربح قرار اليوم!)
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'working-memory') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>محاكاة الذاكرة العاملة (Working Memory - RAM الدماغ)</h4>
          </div>
          <p style="font-size:0.85rem; color:var(--muted); margin-bottom:1rem;">
            الذاكرة العاملة محدودة. عندما تقتحم المشاعر دماغك، فإنها تستهلك الـ RAM ولا تترك مساحة لقراءة الشارت:
          </p>
          <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
            <button onclick="setRam('clean')" id="btn-ram-clean" class="theme-toggle-btn" style="background:#10b981; color:white; font-weight:bold;">حالة الصفاء الذهني</button>
            <button onclick="setRam('loss')" id="btn-ram-loss" class="theme-toggle-btn">بعد خسارة مؤلمة (انتقام)</button>
          </div>
          <div id="ram-content" style="padding:1rem; border-radius:10px; background:rgba(0,0,0,0.02); font-size:0.9rem; line-height:1.7;">
            <strong>الذاكرة العاملة فارغة (متاح 75% للتفكير):</strong>
            <p>السعر وصل للمنطقة دون تأكيد. لأن عقلك صافٍ، تلاحظ غياب شمعة التأكيد فوراً وتقول بهدوء: «لا دخول اليوم، الشروط غير مكتملة».</p>
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'decision-matrix') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>مصفوفة القرار مقابل النتيجة: افصل بين «صفقة خاسرة» و«قرار سيئ»</h4>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-top:1rem;">
            <div style="padding:1rem; border-radius:10px; border:1px solid #10b981; background:rgba(16,185,129,0.08);">
              <strong style="color:#059669;">قرار ممتاز + ربح</strong>
              <p style="font-size:0.8rem; margin-top:0.3rem;">نجاح مستدام وتوافق بين الخطة والسوق.</p>
            </div>
            <div style="padding:1rem; border-radius:10px; border:1px solid #3b82f6; background:rgba(59,130,246,0.08);">
              <strong style="color:#2563eb;">قرار ممتاز + خسارة</strong>
              <p style="font-size:0.8rem; margin-top:0.3rem;">خسارة احترافية صحية وتكلفة تشغيل طبيعية لنظام رابح (كافئ نفسك!).</p>
            </div>
            <div style="padding:1rem; border-radius:10px; border:1px solid #ef4444; background:rgba(239,68,68,0.08);">
              <strong style="color:#dc2626;">قرار سيئ + ربح</strong>
              <p style="font-size:0.8rem; margin-top:0.3rem;">فخ السم في العسل (أخطر صفقة)! ربح مسموم بمقامرة يعلمك سلوكاً انتحارياً.</p>
            </div>
            <div style="padding:1rem; border-radius:10px; border:1px solid #f59e0b; background:rgba(245,158,11,0.08);">
              <strong style="color:#d97706;">قرار سيئ + خسارة</strong>
              <p style="font-size:0.8rem; margin-top:0.3rem;">عقاب مستحق للمخالفة. أوقف التداول فوراً وراجع انضباطك.</p>
            </div>
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'cognitive-cooling') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>محاكي إغلاق الحلقات الذهنية ومرحلة التبريد</h4>
          </div>
          <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
            <button id="btn-cool-closed" onclick="setCool('closed')" style="flex:1; padding:0.6rem; border-radius:8px; border:1px solid #10b981; background:#10b981; color:#fff; font-weight:bold; cursor:pointer;">المسار الاحترافي (إغلاق وتبريد)</button>
            <button id="btn-cool-open" onclick="setCool('open')" style="flex:1; padding:0.6rem; border-radius:8px; border:1px solid #ef4444; background:none; color:inherit; font-weight:bold; cursor:pointer;">المسار العشوائي (حلقة مفتوحة)</button>
          </div>
          <div id="cool-content" style="padding:1rem; border-radius:10px; background:var(--accent-light); border:1px solid var(--border); font-size:0.85rem; line-height:1.7;">
            <strong>معالجة واستشفاء (Closed Loop):</strong>
            <p>15 دقيقة ابتعاد تام عن الشاشات، تدوين هادئ للتجربة: «خسرت صفقتين اليوم، الأولى بالخطة والثانية FOMO، لا تعديل على الاستراتيجية». الدماغ ينام بعمق ويبدأ اليوم التالي بصفاء 100%.</p>
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'strategy-diagnostic') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>مصفوفة التشخيص الرباعية: لماذا يتراجع أدائي؟</h4>
          </div>
          <p style="font-size:0.85rem; color:var(--muted); margin-bottom:1rem;">
            الاستراتيجية لم تمت؛ المتداول هو من تغير! تفرّق بدقة بين الأسباب الأربعة:
          </p>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div style="padding:0.75rem; border-radius:8px; border:1px solid #10b981; background:rgba(16,185,129,0.06);">
              <strong style="color:#059669; font-size:0.85rem;">1. الاستراتيجية</strong>
              <p style="font-size:0.75rem; margin-top:0.2rem;">هل تم إثبات الـ Edge لـ 50+ صفقة؟ إذا نعم، فالاستراتيجية بريئة.</p>
            </div>
            <div style="padding:0.75rem; border-radius:8px; border:1px solid #f59e0b; background:rgba(245,158,11,0.06);">
              <strong style="color:#d97706; font-size:0.85rem;">2. جودة التنفيذ</strong>
              <p style="font-size:0.75rem; margin-top:0.2rem;">دخول مبكر دون شمعة تأكيد، أو إغلاق مبكر قبل الهدف.</p>
            </div>
            <div style="padding:0.75rem; border-radius:8px; border:1px solid #ef4444; background:rgba(239,68,68,0.06);">
              <strong style="color:#dc2626; font-size:0.85rem;">3. الحالة النفسية</strong>
              <p style="font-size:0.75rem; margin-top:0.2rem;">تكبير اللوت بعد خسارة، الطمع، ومطاردة السوق للانتقام.</p>
            </div>
            <div style="padding:0.75rem; border-radius:8px; border:1px solid #3b82f6; background:rgba(59,130,246,0.06);">
              <strong style="color:#2563eb; font-size:0.85rem;">4. بيئة السوق</strong>
              <p style="font-size:0.75rem; margin-top:0.2rem;">تغير السوق من ترند قوي إلى تذبذب عرضي خانق (Choppy).</p>
            </div>
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'trigger-chain') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>مفكك السلسلة السلوكية (Trigger ➔ Thought ➔ Emotion ➔ Action)</h4>
          </div>
          <div style="padding:1rem; border-radius:10px; background:var(--bg); border:1px solid var(--border); font-size:0.85rem; line-height:1.7;">
            <div style="margin-bottom:0.5rem;"><strong style="color:#d97706;">المحفز الخفي:</strong> الساعة 4:35 عصراً والحساب -30$، قبل الإغلاق بـ 25 دقيقة.</div>
            <div style="margin-bottom:0.5rem;"><strong style="color:#2563eb;">الفكرة الأولى:</strong> «مستحيل أنتهي اليوم خاسراً.. لازم أسكر الحساب برقم أخضر!»</div>
            <div style="margin-bottom:0.5rem;"><strong style="color:#7c3aed;">الشعور والإلحاح:</strong> ضيق واختناق زمني ورغبة عارمة بالدخول السريع.</div>
            <div style="margin-bottom:0.5rem;"><strong style="color:#dc2626;">الفعل الكارثي:</strong> سكالبينج عشوائي على فريم الدقيقة وتحويل الخسارة إلى -350$!</div>
            <div style="padding:0.75rem; border-radius:8px; background:rgba(16,185,129,0.1); border:1px solid #10b981; font-weight:bold; color:#059669;">
              فرامل الطوارئ: تذكّر أن «أربح قرار اليوم هو قبول الـ -30$ وإغلاق المنصة برأس مرفوع».
            </div>
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'early-warning') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>رادار إشارات الإنذار المبكر قبل الـ Revenge Trading</h4>
          </div>
          <p style="font-size:0.85rem; color:var(--muted); margin-bottom:1rem;">
            أنت لست بحاجة للانتظار حتى اللوت القاتل؛ توقف عند أول علامة:
          </p>
          <ul style="font-size:0.85rem; line-height:1.8; padding-right:1.2rem;">
            <li><strong>سلوكي:</strong> مراقبة نافذة الـ P&L بشكل قهري كل 5 ثوانٍ، أو التبديل لفريم 1m.</li>
            <li><strong>جسدي:</strong> شد في الفك، انحباس الأنفاس، حرارة في الأذنين والوجه.</li>
            <li><strong>تفكيري:</strong> «لازم أرجع الـ 50$ الحين.. السوق يعاندني اليوم».</li>
          </ul>
        </div>\n`;
      }
      if (sec.customComponent === 'perception-lens') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>محاكي تحول الإدراك (Perception Shift Lens)</h4>
          </div>
          <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
            <button id="btn-lens-neutral" onclick="setLens('neutral')" style="flex:1; padding:0.6rem; border-radius:8px; border:1px solid #10b981; background:#10b981; color:#fff; font-weight:bold; cursor:pointer;">العدسة المحايدة (قبل الخسارة)</button>
            <button id="btn-lens-emotional" onclick="setLens('emotional')" style="flex:1; padding:0.6rem; border-radius:8px; border:1px solid #ef4444; background:none; color:inherit; font-weight:bold; cursor:pointer;">العدسة المنفعلة (بعد خسارة $50)</button>
          </div>
          <div id="lens-content" style="padding:1rem; border-radius:10px; background:var(--accent-light); border:1px solid var(--border); font-size:0.85rem; line-height:1.7;">
            <strong>تفسير العقل المحايد:</strong>
            <p>الاتجاه غير واضح، هناك مقاومة يومية قريبة، والشموع لا تملك تأكيداً. القرار: الانتظار وحماية رأس المال.</p>
          </div>
          <div style="margin-top:0.75rem; padding:0.75rem; border-radius:8px; background:rgba(245,158,11,0.1); border:1px solid #f59e0b; font-size:0.8rem; font-weight:bold; color:#d97706;">
            السؤال الذهبي: «هل كنت سأحلل هذه الشمعة بنفس الطريقة لو لم أخسر الصفقة السابقة؟»
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'physical-tells') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>فاحص إشارات الجسد السريرية (Physical Tells)</h4>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div style="padding:0.75rem; border-radius:8px; border:1px solid #f59e0b; background:rgba(245,158,11,0.06);">
              <strong style="color:#d97706; font-size:0.85rem;">1. شد الماوس بقوة</strong>
              <p style="font-size:0.75rem; margin-top:0.2rem;">تشنج الأصابع وضغط مستمر على الفارة استعداداً للهجوم العاطفي.</p>
            </div>
            <div style="padding:0.75rem; border-radius:8px; border:1px solid #ef4444; background:rgba(239,68,68,0.06);">
              <strong style="color:#dc2626; font-size:0.85rem;">2. الاقتراب للشاشة</strong>
              <p style="font-size:0.75rem; margin-top:0.2rem;">تقوس الظهر والاقتراب 15 سم نحو الشموع دلالة على النفق الإدراكي.</p>
            </div>
            <div style="padding:0.75rem; border-radius:8px; border:1px solid #7c3aed; background:rgba(124,58,237,0.06);">
              <strong style="color:#7c3aed; font-size:0.85rem;">3. اهتزاز القدم</strong>
              <p style="font-size:0.75rem; margin-top:0.2rem;">حركة لاإرادية سريعة للقدم تحت الطاولة لتفريغ فائض الأدرينالين.</p>
            </div>
            <div style="padding:0.75rem; border-radius:8px; border:1px solid #3b82f6; background:rgba(59,130,246,0.06);">
              <strong style="color:#2563eb; font-size:0.85rem;">4. انحباس الأنفاس</strong>
              <p style="font-size:0.75rem; margin-top:0.2rem;">توقف التنفس لثوانٍ ثم تنفس سطحي يقلل تدفق الأكسجين للفص الجبهي.</p>
            </div>
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'nine-stage-chain') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>منحنى استنزاف المقاومة الإرادية (The Resistance Curve)</h4>
          </div>
          <p style="font-size:0.85rem; color:var(--muted); margin-bottom:0.75rem;">
            في البداية تحتاج 10% جهد إرادة فقط.. وعند الغضب 8/10 تحتاج معجزة:
          </p>
          <div style="font-size:0.8rem; line-height:1.8; padding:0.5rem; background:var(--bg); border-radius:8px; border:1px solid var(--border);">
            <div>1. المحفز ➔ جهد المقاومة: 10% (سهل جداً - افلت الماوس)</div>
            <div>2. الفكرة والتبرير ➔ جهد المقاومة: 25% (اطرح السؤال الذهبي)</div>
            <div>3. الشعور والشدة ➔ جهد المقاومة: 40% (سجّل الرقم 4/10 كتابياً)</div>
            <div>4. لغة الجسد ➔ جهد المقاومة: 55% (تراجع للخلف وتنفس 4-7-8)</div>
            <div>5. تغير الإدراك ➔ جهد المقاومة: 70% (صعب - غيّر فريم الشارت للساعة)</div>
            <div>6. الإلحاح السلوكي ➔ جهد المقاومة: 85% (انتظر 60 ثانية إجبارياً)</div>
            <div>7. الفعل والانتقام ➔ جهد المقاومة: 95% (شبه مستحيل بيولوجياً!)</div>
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'zone-reality') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>مقياس واقعية الـ Zone وتفكيك خرافة قائمة التحضير</h4>
          </div>
          <div style="padding:1rem; border-radius:10px; background:var(--accent-light); border:1px solid var(--border); font-size:0.85rem; line-height:1.7;">
            <p><strong>العامل المؤثر ليس حكماً نهائياً:</strong> نوم 5 ساعات معلومة فسيولوجية للحذر وليس حكماً بالإعدام على يومك.</p>
            <p style="margin-top:0.4rem;"><strong>الـ Zone ليست مكافأة كعكة:</strong> إكمال قائمة المهام يرفع الاحتمالية ولا يضمن تدفق الـ Zone؛ تداول بتواضع مع الحالة المتوفرة لديك فعلاً.</p>
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'retro-prep') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>تقييم التحضير بأثر رجعي: تحويل الطقوس إلى فرضيات</h4>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div style="padding:0.75rem; border-radius:8px; border:1px solid #ef4444; background:rgba(239,68,68,0.06);">
              <strong style="color:#dc2626; font-size:0.85rem;">الطريقة الوهمية القديمة</strong>
              <p style="font-size:0.75rem; margin-top:0.3rem;">«أكملت 8 ساعات نوم وميديتيشن.. إذن أنا جاهز 100% ولا يمكن أن أرتكب حماقة!» (ثقة عمياء)</p>
            </div>
            <div style="padding:0.75rem; border-radius:8px; border:1px solid #10b981; background:rgba(16,185,129,0.06);">
              <strong style="color:#059669; font-size:0.85rem;">التقييم السريري الرجعي</strong>
              <p style="font-size:0.75rem; margin-top:0.3rem;">بعد الجلسة: «هل ساعدني النوم فعلاً عند مواجهة خسارة الذهب المفاجئة؟ هل ضبطت اندفاعي؟» (بيانات واقعية)</p>
            </div>
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'sequential-breaker') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>مفكك وحش المشاكل التسلسلي: من أين تبدأ المعركة؟</h4>
          </div>
          <div style="padding:0.85rem; border-radius:10px; background:var(--bg); border:1px solid var(--border); font-size:0.85rem; line-height:1.8;">
            <div><strong style="color:#d97706;">المشكلة السطحية:</strong> التردد وتفويت الفرص والخروج المبكر والانتقام.</div>
            <div style="margin-top:0.3rem;"><strong style="color:#2563eb;">حجر الأساس الجذري (First Domino):</strong> الخوف من فقدان رأس المال بسبب حجم لوت غير متناسب.</div>
            <div style="margin-top:0.5rem; padding:0.5rem; border-radius:6px; background:rgba(16,185,129,0.1); color:#059669; font-weight:bold;">
              الحل: علاج حجر الأساس الأول يفكك تلقائياً 5 مشاكل تابعة دفعة واحدة.
            </div>
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'root-cause') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>فاحص التشخيص الجذري: لا تخلط بين العَرَض والسبب</h4>
          </div>
          <div style="padding:0.85rem; border-radius:10px; background:var(--accent-light); border:1px solid var(--border); font-size:0.85rem; line-height:1.7;">
            <p><strong>العَرَض الظاهري:</strong> «أنا متداول غير منضبط ومتهور».</p>
            <p style="margin-top:0.3rem;"><strong>التشخيص السريري الحقيقي:</strong> «المشكلة ليست في قوة الإرادة؛ بل في فكرة لاواعية تعتبر الخسارة إهانة شخصية، مما يطلق استجابة قتالية غريزية (Fight or Flight)». عندما تعالج تعريفك للخسارة، ينصلح الانضباط تلقائياً.</p>
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'clinical-journal') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>المفكرة السريرية 2026: خريطة الأعمدة الستة لفك شفرة الانحراف</h4>
          </div>
          <div style="font-size:0.8rem; line-height:1.8; padding:0.75rem; background:var(--bg); border-radius:8px; border:1px solid var(--border);">
            <div><strong>1. المحفز (Trigger):</strong> ما الحدث الدقيق المسبق؟ (خسارة $20 / شمعة ذهب عنيفة / ملل)</div>
            <div><strong>2. الفكرة (Thought):</strong> ما الجملة الحرفية التي دارت بذهنك؟ («لازم أعوضها هسه»)</div>
            <div><strong>3. المشاعر (Emotion):</strong> ما نوع الشعور ومقداره؟ (إحباط 7/10 - فومو 8/10)</div>
            <div><strong>4. الجسد (Body):</strong> ما الإشارة الفسيولوجية؟ (تشنج فك / نقر الأصابع / انحباس نفس)</div>
            <div><strong>5. الإدراك (Perception):</strong> كيف شوهت الشارت؟ (تجاهل الدعوم ورؤية خطوط وهمية)</div>
            <div><strong>6. الفعل البديل (Action):</strong> ما الإجراء المحترف الذي كسر الدائرة؟ (إغلاق اللابتوب 15 دقيقة)</div>
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'stimulation-radar') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>رادار التمييز: اقتناص فرصة (Opportunity) أم بحث عن إثارة (Stimulation)؟</h4>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-top:0.75rem;">
            <div style="padding:0.75rem; border-radius:8px; border:1px solid #10b981; background:rgba(16,185,129,0.06); font-size:0.8rem; line-height:1.6;">
              <strong style="color:#059669;">اقتناص الفرصة (Opportunity Seeking)</strong>
              <p style="margin-top:0.3rem;">تنتظر ببرود صياد اكتمال شروط خطتك الصارمة. إن لم تظهر فرصة، أغلقت المنصة برأس مرفوع وضمير مرتاح.</p>
            </div>
            <div style="padding:0.75rem; border-radius:8px; border:1px solid #ef4444; background:rgba(239,68,68,0.06); font-size:0.8rem; line-height:1.6;">
              <strong style="color:#dc2626;">البحث عن الإثارة (Stimulation Seeking)</strong>
              <p style="margin-top:0.3rem;">تتداول لكسر رتابة اليوم وهرباً من الملل؛ شمعة الذهب الصغيرة تدفعك لاختلاق قصص وهمية للدخول فقط لتشعر بالأكشن!</p>
            </div>
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'state-selectivity') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>معادلة القيمة المتوقعة النفسية (Psychological Expected Value)</h4>
          </div>
          <div style="padding:0.85rem; border-radius:10px; background:var(--bg); border:1px solid var(--border); font-size:0.85rem; line-height:1.7;">
            <p><strong>فخ الصفقة B في الأيام المتوترة:</strong></p>
            <p style="color:#dc2626; margin-top:0.3rem;">خسارة $30 في صفقة متوسطة + تدهور حالتك النفسية = احتمالية 60% لفتح صفقة انتقامية مدمرة!</p>
            <div style="margin-top:0.5rem; padding:0.5rem; border-radius:6px; background:rgba(16,185,129,0.1); color:#059669; font-weight:bold; font-size:0.8rem;">
              القاعدة: كلما انخفضت جودة حالتك الفسيولوجية، ارفع معيار فرصتك إلى A+ فقط لتضمن حماية جهازك العصبي ورأس مالك.
            </div>
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'traffic-light-protocol') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>نظام إشارات المرور الثلاثي للحالة (State Management Protocol)</h4>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.5rem; margin-top:0.75rem; text-align:center; font-size:0.75rem;">
            <div style="padding:0.75rem; border-radius:8px; border:1px solid #10b981; background:rgba(16,185,129,0.08);">
              <strong style="color:#059669; font-size:0.85rem;">الحالة الخضراء</strong>
              <p style="margin-top:0.3rem;">هدوء وصفاء وتركيز ➔ تداول قياسي للفرص A و A+.</p>
            </div>
            <div style="padding:0.75rem; border-radius:8px; border:1px solid #f59e0b; background:rgba(245,158,11,0.08);">
              <strong style="color:#d97706; font-size:0.85rem;">الحالة الصفراء</strong>
              <p style="margin-top:0.3rem;">توتر خفيف أو ملل ➔ A+ فقط وتقليص النشاط 60%.</p>
            </div>
            <div style="padding:0.75rem; border-radius:8px; border:1px solid #ef4444; background:rgba(239,68,68,0.08);">
              <strong style="color:#dc2626; font-size:0.85rem;">الحالة الحمراء</strong>
              <p style="margin-top:0.3rem;">غضب وانتقام وFOMO ➔ توقف تام وإغلاق فوري للمنصة.</p>
            </div>
          </div>
        </div>\n`;
      }
      if (sec.customComponent === 'full-system-mindmap') {
        content += `
        <div class="interactive-box reveal-on-scroll">
          <div class="interactive-header">
            <h4>المخطط الهيكلي الشامل لعقل المتداول والقاعدة الذهبية</h4>
          </div>
          <div style="padding:0.85rem; border-radius:10px; background:var(--accent-light); border:1px solid var(--border); font-size:0.85rem; line-height:1.8;">
            <div style="font-weight:bold; color:var(--primary); margin-bottom:0.5rem;">السلسلة السببية المترابطة:</div>
            <div>البيولوجيا المسبقة ➔ الطاقة والاستثارة ➔ سعة الذاكرة العاملة ➔ جودة التفكير ➔ الإدراك والشارت ➔ معيار الانتقائية (A+ vs B) ➔ التنفيذ والمخاطرة ➔ النتيجة ➔ التبريد والمعالجة.</div>
            <div style="margin-top:0.75rem; padding:0.75rem; border-radius:8px; background:rgba(217,119,6,0.12); border:1px solid #d97706; font-weight:bold; color:#b45309; text-align:center;">
              «أنت لا تحتاج أن تكون في أفضل حالة حتى تتداول، لكن تحتاج أن تعرف حالتك حتى تعرف كيف تتداول.»
            </div>
          </div>
        </div>\n`;
      }
      if (sec.accordion) {
        content += `
        <details class="book-details reveal-on-scroll">
          <summary>
            ${sec.accordion.tag ? `<span class="details-badge">${sec.accordion.tag}</span>` : ''}
            <span>${sec.accordion.summary}</span>
            <span class="arrow-icon">▼</span>
          </summary>
          <div class="details-body">
            <p>${sec.accordion.content}</p>
          </div>
        </details>\n`;
      }
      return content;
    }).join('\n');

    return `
    ${partBanner}
    <article id="${ch.id}" class="chapter-article">
      <header class="chapter-header reveal-on-scroll">
        <div class="chapter-meta">
          <span class="chapter-number">الفصل ${ch.number.toString().padStart(2, '0')}</span>
          <span class="sep">·</span>
          <span class="read-time">${ch.readTime}</span>
        </div>
        <h2 class="chapter-title">${ch.title}</h2>
        <p class="chapter-summary">${ch.summary}</p>
        <div class="chapter-rule"></div>
      </header>
      <div class="chapter-body">
        ${sectionsHtml}
      </div>
    </article>\n`;
  }).join('\n');

  const tocLinksHtml = CHAPTERS.map((ch) => {
    const isPartStart = ch.number === 1 || ch.number === 12 || ch.number === 20 || ch.number === 30 || ch.number === 39 || ch.number === 47 || ch.number === 55;
    const partHeader = isPartStart ? `<div style="font-size:0.75rem; font-weight:800; color:var(--accent); margin:1.2rem 0 0.4rem; padding:0 0.4rem; text-transform:uppercase; border-bottom:1px solid var(--border);">${ch.partTitle}</div>` : '';
    return `
    ${partHeader}
    <a href="#${ch.id}" class="toc-link" data-target="${ch.id}">
      <span class="toc-num">${ch.number.toString().padStart(2, '0')}.</span>
      <span class="toc-title">${ch.shortTitle}</span>
    </a>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${BOOK_METADATA.title} (الموسوعة التفاعلية الشاملة)</title>
  <meta name="description" content="${BOOK_METADATA.subtitle}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  <style>
    :root {
      --bg: #FBF9F5;
      --text: #1C1917;
      --card-bg: #FFFFFF;
      --border: #E7E5E4;
      --accent: #D97706;
      --accent-light: #FEF3C7;
      --muted: #78716C;
      --optimal: #10B981;
    }
    body.dark {
      --bg: #0C0F12;
      --text: #F3F4F6;
      --card-bg: #15191E;
      --border: #27272A;
      --accent: #F59E0B;
      --accent-light: rgba(245, 158, 11, 0.15);
      --muted: #A1A1AA;
      --optimal: #34D399;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html {
      font-family: 'Tajawal', sans-serif;
      background-color: var(--bg);
      color: var(--text);
      scroll-behavior: smooth;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    h1, h2, h3, h4, h5, h6 { font-family: 'Cairo', sans-serif; }
    
    #progress-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: rgba(0,0,0,0.05);
      z-index: 1000;
    }
    #progress-bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #D97706, #10B981);
      transition: width 0.1s ease-out;
    }

    header.site-header {
      position: sticky;
      top: 0;
      z-index: 900;
      background: var(--bg);
      border-bottom: 1px solid var(--border);
      backdrop-filter: blur(10px);
      padding: 0.75rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand-title {
      font-weight: 800;
      font-size: 1.1rem;
      color: var(--text);
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .theme-toggle-btn {
      background: none;
      border: 1px solid var(--border);
      padding: 0.4rem 0.75rem;
      border-radius: 8px;
      cursor: pointer;
      color: var(--text);
      font-family: inherit;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .layout-container {
      max-width: 1260px;
      margin: 2rem auto;
      padding: 0 1.5rem;
      display: grid;
      grid-template-columns: 310px 1fr;
      gap: 3rem;
    }
    @media (max-width: 960px) {
      .layout-container { grid-template-columns: 1fr; }
      aside.sidebar-toc { display: none; }
    }

    aside.sidebar-toc {
      position: sticky;
      top: 5rem;
      height: calc(100vh - 6rem);
      overflow-y: auto;
      padding-left: 1rem;
    }
    .toc-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 1.25rem;
    }
    .toc-card h3 {
      font-size: 0.95rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.5rem;
    }
    .toc-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.45rem 0.6rem;
      border-radius: 8px;
      text-decoration: none;
      color: var(--muted);
      font-size: 0.82rem;
      transition: all 0.2s ease;
      margin-bottom: 0.2rem;
    }
    .toc-link:hover {
      color: var(--text);
      background: rgba(0,0,0,0.03);
    }
    .toc-link.active {
      color: var(--accent);
      font-weight: 700;
      background: var(--accent-light);
      border-right: 3px solid var(--accent);
    }
    .toc-num { font-family: monospace; font-size: 0.75rem; }

    .part-banner {
      margin: 3rem 0 1.5rem;
      padding: 0.5rem 0;
      border-bottom: 2px solid var(--accent);
    }
    .part-tag {
      font-size: 0.85rem;
      font-weight: 800;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .chapter-article {
      margin-bottom: 4rem;
      padding-bottom: 3rem;
      border-bottom: 1px solid var(--border);
      scroll-margin-top: 5rem;
    }
    .chapter-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: var(--muted);
      margin-bottom: 0.5rem;
    }
    .chapter-number {
      font-weight: 700;
      color: var(--accent);
      font-family: monospace;
    }
    .chapter-title {
      font-size: 1.85rem;
      font-weight: 800;
      line-height: 1.35;
      margin-bottom: 0.75rem;
    }
    .chapter-summary {
      color: var(--muted);
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .chapter-rule {
      width: 60px;
      height: 2px;
      background: var(--accent);
      margin-bottom: 2rem;
    }

    .prose-p {
      font-size: 1.1rem;
      line-height: 1.9;
      color: var(--text);
      margin-bottom: 1.5rem;
    }
    .drop-cap::first-letter {
      font-size: 3.2rem;
      font-weight: 700;
      color: var(--accent);
      float: right;
      margin-left: 0.75rem;
      line-height: 1;
    }
    .quote-box {
      margin: 2.2rem 0;
      padding: 1.5rem 1.75rem;
      border: 1px solid var(--border);
      border-right: 4px solid var(--accent);
      background: linear-gradient(270deg, var(--card-bg) 0%, var(--accent-light) 100%);
      border-radius: 16px;
      box-shadow: 0 4px 15px -3px rgba(0,0,0,0.03);
    }
    .quote-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .quote-symbol {
      font-size: 1.8rem;
      line-height: 1;
      color: var(--accent);
      opacity: 0.6;
    }
    .quote-copy-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: var(--card-bg);
      border: 1px solid var(--border);
      padding: 0.35rem 0.75rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text);
      font-family: inherit;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .quote-copy-btn:hover {
      background: var(--accent);
      color: #ffffff;
      border-color: var(--accent);
      transform: translateY(-1px);
    }
    .quote-copy-btn.copied {
      background: #10B981 !important;
      color: #ffffff !important;
      border-color: #10B981 !important;
      transform: scale(1.04);
    }
    .quote-text {
      font-size: 1.15rem;
      font-weight: 600;
      font-style: italic;
      line-height: 1.8;
      color: var(--text);
    }
    .completion-card {
      margin: 4rem 0 2rem;
      padding: 2.5rem 2rem;
      border-radius: 24px;
      border: 2px solid rgba(217, 119, 6, 0.3);
      background: linear-gradient(180deg, var(--accent-light) 0%, var(--card-bg) 100%);
      text-align: center;
      box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
    }
    .completion-badge {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 800;
      padding: 0.35rem 1rem;
      border-radius: 9999px;
      background: rgba(217, 119, 6, 0.15);
      color: var(--accent);
      margin-bottom: 1rem;
    }
    .completion-title {
      font-size: 1.8rem;
      font-weight: 800;
      margin-bottom: 0.75rem;
      color: var(--text);
    }
    .completion-desc {
      font-size: 1rem;
      color: var(--muted);
      max-width: 600px;
      margin: 0 auto 1.75rem;
      line-height: 1.7;
    }
    .finish-book-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.9rem 2.5rem;
      font-size: 1.1rem;
      font-weight: 800;
      font-family: inherit;
      color: #ffffff;
      background: linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #10B981 100%);
      border: none;
      border-radius: 16px;
      cursor: pointer;
      box-shadow: 0 10px 25px -5px rgba(217, 119, 6, 0.4);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .finish-book-btn:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 15px 35px -5px rgba(217, 119, 6, 0.5);
    }
    .finish-book-btn:active {
      transform: translateY(0) scale(0.98);
    }
    .completion-message {
      margin-top: 2rem;
      animation: fadeInMsg 0.5s ease-out forwards;
    }
    .thank-you-box {
      padding: 1.5rem;
      border-radius: 16px;
      border: 1px solid rgba(16, 185, 129, 0.4);
      background: rgba(16, 185, 129, 0.1);
      text-align: right;
    }
    .thank-you-box h4 {
      color: #059669;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }
    .thank-you-box p {
      font-size: 0.9rem;
      line-height: 1.7;
      color: var(--text);
    }
    @keyframes fadeInMsg {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .scroll-toast {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(30px);
      background: rgba(28, 25, 23, 0.95);
      color: #ffffff;
      padding: 0.65rem 1.6rem;
      border-radius: 9999px;
      font-size: 0.9rem;
      font-weight: 700;
      border: 1px solid var(--accent);
      box-shadow: 0 10px 30px -5px rgba(0,0,0,0.4);
      backdrop-filter: blur(10px);
      z-index: 99999;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    body.dark .scroll-toast {
      background: rgba(243, 244, 246, 0.95);
      color: #111827;
    }
    .scroll-toast.visible {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    .callout {
      margin: 1.5rem 0;
      padding: 1.2rem;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: var(--card-bg);
      font-size: 0.95rem;
      line-height: 1.7;
    }
    .callout-info { border-right: 4px solid #3B82F6; }
    .callout-warning { border-right: 4px solid #F59E0B; }
    .callout-success { border-right: 4px solid #10B981; }

    .book-details {
      margin: 1.5rem 0;
      border: 1px solid var(--border);
      border-radius: 12px;
      background: var(--card-bg);
      overflow: hidden;
      transition: all 0.2s ease;
    }
    .book-details summary {
      padding: 1rem 1.25rem;
      cursor: pointer;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: space-between;
      list-style: none;
      user-select: none;
    }
    .book-details summary::-webkit-details-marker { display: none; }
    .details-badge {
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
      background: var(--accent-light);
      color: var(--accent);
      border-radius: 4px;
      margin-left: 0.75rem;
    }
    .details-body {
      padding: 1rem 1.25rem;
      border-top: 1px solid var(--border);
      background: rgba(0,0,0,0.015);
      font-size: 0.95rem;
      line-height: 1.8;
      color: var(--muted);
    }
    .book-details[open] .arrow-icon { transform: rotate(180deg); }
    .arrow-icon { transition: transform 0.2s ease; font-size: 0.75rem; }

    .interactive-box {
      margin: 2rem 0;
      padding: 1.5rem;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
    }
    .interactive-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .interactive-tag {
      font-size: 0.75rem;
      color: var(--muted);
    }
    .svg-container {
      width: 100%;
      height: 180px;
    }
    .curve-svg {
      width: 100%;
      height: 100%;
    }
    .slider-wrapper {
      margin: 1.5rem 0 1rem;
    }
    .slider-wrapper input[type=range] {
      width: 100%;
      accent-color: var(--accent);
      cursor: pointer;
    }
    .slider-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      color: var(--muted);
      margin-top: 0.25rem;
    }
    .interactive-desc {
      padding: 1rem;
      border-radius: 8px;
      background: rgba(0,0,0,0.02);
      font-size: 0.9rem;
      line-height: 1.6;
    }

    .reveal-on-scroll {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal-on-scroll.is-revealed {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
</head>
<body>
  <div id="progress-container">
    <div id="progress-bar"></div>
  </div>

  <header class="site-header">
    <div class="brand-title">سيكولوجية التداول: الموسوعة التفاعلية الشاملة</div>
    <div class="header-actions">
      <span id="read-percent-display" style="font-size:0.8rem; font-family:monospace; color:var(--muted);">0%</span>
      <button class="theme-toggle-btn" onclick="toggleTheme()">
        <span id="theme-icon">🌙</span>
        <span id="theme-text">الوضع الداكن</span>
      </button>
    </div>
  </header>

  <div class="layout-container">
    <aside class="sidebar-toc">
      <div class="toc-card">
        <h3>فهرس الفصول (63 فصلاً في 7 أجزاء)</h3>
        <nav id="toc-nav">
          ${tocLinksHtml}
        </nav>
      </div>
    </aside>

    <main>
      ${chaptersHtml}

      <!-- Finish Book Gamification Card -->
      <div class="completion-card reveal-on-scroll">
        <span class="completion-badge">وسام الإنجاز والاحتراف 🏅</span>
        <h3 class="completion-title">أنت الآن تملك الخريطة النفسية والسريرية الكاملة!</h3>
        <p class="completion-desc">أكملت بنجاح دراسة 63 فصلاً متكاملاً في سيكولوجية التداول، إدارة الحالة (State Management)، كيمياء الذاكرة العاملة، وتشريح السلوك الميداني.</p>
        <div style="margin: 1.5rem 0;">
          <button id="btn-finish-book" class="finish-book-btn" onclick="triggerCelebration()">
            <span>أنهيت الكتاب 🎉</span>
          </button>
        </div>
        <div id="completion-message" class="completion-message" style="display:none;">
          <div class="thank-you-box">
            <h4>🎓 مبارك إتمام الموسوعة التفاعلية بالكامل!</h4>
            <p>شكراً لالتزامك بتطوير عقليتك الاستثمارية. تذكر دائماً الوصية الخالدة: <em>«أنت لا تحتاج أن تكون في أفضل حالة حتى تتداول، لكن تحتاج أن تعرف حالتك حتى تعرف كيف تتداول.»</em> التزم بفرامل الطوارئ، واحمِ رأس مالك دائماً.</p>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- Auto-Save Scroll Position Toast Notification -->
  <div id="scroll-toast" class="scroll-toast">تمت العودة إلى حيث توقفت 📍</div>

  <script>
    let scrollSaveTimer = null;
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      document.getElementById('progress-bar').style.width = scrolled + '%';
      const readDisplay = document.getElementById('read-percent-display');
      if (readDisplay) readDisplay.innerText = Math.round(scrolled) + '%';

      // Throttled scroll position save
      if (!scrollSaveTimer) {
        scrollSaveTimer = setTimeout(() => {
          if (winScroll > 150) {
            localStorage.setItem('book_scroll_pos', winScroll.toString());
          }
          scrollSaveTimer = null;
        }, 250);
      }
    });

    // Auto-restore scroll position on page load
    window.addEventListener('DOMContentLoaded', () => {
      const savedPos = localStorage.getItem('book_scroll_pos');
      if (savedPos && parseInt(savedPos) > 150) {
        setTimeout(() => {
          window.scrollTo({ top: parseInt(savedPos), behavior: 'smooth' });
          showToast('تمت العودة إلى حيث توقفت 📍');
        }, 350);
      }
    });

    function showToast(msg) {
      const toast = document.getElementById('scroll-toast');
      if (toast) {
        toast.innerText = msg;
        toast.classList.add('visible');
        setTimeout(() => {
          toast.classList.remove('visible');
        }, 2200);
      }
    }

    function copyQuote(btn) {
      const quoteText = btn.getAttribute('data-quote') || '';
      navigator.clipboard.writeText(quoteText).then(() => {
        const icon = btn.querySelector('.btn-icon');
        const text = btn.querySelector('.btn-text');
        const prevIcon = icon.innerText;
        const prevText = text.innerText;
        btn.classList.add('copied');
        icon.innerText = '✔️';
        text.innerText = 'تم النسخ!';
        setTimeout(() => {
          btn.classList.remove('copied');
          icon.innerText = prevIcon;
          text.innerText = prevText;
        }, 2000);
      }).catch(err => {
        console.error('Error copying quote: ', err);
      });
    }

    function triggerCelebration() {
      if (typeof confetti === 'function') {
        const duration = 3.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };
        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }
        const interval = setInterval(function() {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'] });
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'] });
        }, 250);
      }
      const msg = document.getElementById('completion-message');
      if (msg) {
        msg.style.display = 'block';
        msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    function initTheme() {
      const saved = localStorage.getItem('app_theme');
      if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
        updateThemeBtn(true);
      } else {
        document.body.classList.remove('dark');
        updateThemeBtn(false);
      }
    }
    function toggleTheme() {
      const isDark = document.body.classList.toggle('dark');
      localStorage.setItem('app_theme', isDark ? 'dark' : 'light');
      updateThemeBtn(isDark);
    }
    function updateThemeBtn(isDark) {
      const icon = document.getElementById('theme-icon');
      const text = document.getElementById('theme-text');
      if (icon && text) {
        icon.innerText = isDark ? '☀️' : '🌙';
        text.innerText = isDark ? 'الوضع النهاري' : 'الوضع الداكن';
      }
    }
    initTheme();

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

    const tocLinks = document.querySelectorAll('.toc-link');
    const chapterArticles = document.querySelectorAll('.chapter-article');
    const tocObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(link => {
            if (link.getAttribute('data-target') === id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    chapterArticles.forEach(art => tocObserver.observe(art));

    function updateYerkes(val) {
      val = parseInt(val);
      const text = document.getElementById('yerkes-val-text');
      const dot = document.getElementById('curve-dot');
      const descBox = document.getElementById('yerkes-desc-box');
      if (text) text.innerText = 'الاستثارة: ' + val + '%';
      
      const x = 40 + (val / 100) * 520;
      const norm = Math.exp(-Math.pow(val - 50, 2) / (2 * Math.pow(18, 2)));
      const y = 200 - (norm * 170);

      if (dot) {
        dot.setAttribute('cx', x);
        dot.setAttribute('cy', y);
      }

      if (descBox) {
        if (val < 30) {
          descBox.innerHTML = '<strong>استثارة منخفضة جداً (خمول / لامبالاة):</strong><p>الهدوء تحول إلى إهمال وتفويت تفاصيل الشارت والفرص.</p>';
          if (dot) dot.setAttribute('fill', '#f59e0b');
        } else if (val <= 70) {
          descBox.innerHTML = '<strong>المنطقة الذهبية (استثارة مناسبة ومتوازنة):</strong><p>تركيز حاد، حضور ذهني، تقبل كامل لاحتمالات الخسارة، والتزام حديدي بإدارة المخاطر.</p>';
          if (dot) dot.setAttribute('fill', '#10b981');
        } else {
          descBox.innerHTML = '<strong>استثارة شديدة (ذعر وتداول انتقامي):</strong><p>فقدان السيطرة، تحريك الستوب لوز، وتدمير الحساب بدافع الغيظ.</p>';
          if (dot) dot.setAttribute('fill', '#ef4444');
        }
      }
    }

    function calcPerf() {
      const s = parseInt(document.getElementById('val-s').innerText) / 100;
      const m = parseInt(document.getElementById('val-m').innerText) / 100;
      const p = parseInt(document.getElementById('val-p').innerText) / 100;
      const e = parseInt(document.getElementById('val-e').innerText) / 100;
      const score = Math.round(s * m * p * e * 100);
      const card = document.getElementById('perf-score-card');
      if (card) {
        let text = 'كفاءة التداول الحقيقية: ' + score + '% ';
        if (score >= 50) text += '(جاهز للتداول بكفاءة عالية ✓)';
        else if (score >= 25) text += '(أداء ضعيف ومتذبذب - توخَّ الحذر)';
        else text += '(خطر داهم - عدم التداول هو أربح قرار اليوم!)';
        card.innerText = text;
      }
    }

    function setRam(mode) {
      const btnClean = document.getElementById('btn-ram-clean');
      const btnLoss = document.getElementById('btn-ram-loss');
      const content = document.getElementById('ram-content');
      if (mode === 'loss') {
        btnLoss.style.background = '#ef4444';
        btnLoss.style.color = '#ffffff';
        btnClean.style.background = 'none';
        btnClean.style.color = 'inherit';
        content.innerHTML = '<strong>الذاكرة العاملة محتلة بالكامل (متاح 20% فقط):</strong><p>السعر وصل للمنطقة دون تأكيد. لكن 60% من عقلك مشغول بـ: «ليش خسرت قبل شوي؟ لازم أرجع الـ 20$ حالاً». النتيجة: تتجاهل غياب التأكيد وتدخل باندفاع وتخسر مجدداً!</p>';
      } else {
        btnClean.style.background = '#10b981';
        btnClean.style.color = '#ffffff';
        btnLoss.style.background = 'none';
        btnLoss.style.color = 'inherit';
        content.innerHTML = '<strong>الذاكرة العاملة فارغة (متاح 75% للتفكير):</strong><p>السعر وصل للمنطقة دون تأكيد. لأن عقلك صافٍ، تلاحظ غياب شمعة التأكيد فوراً وتقول بهدوء: «لا دخول اليوم، الشروط غير مكتملة».</p>';
      }
    }

    function setCool(mode) {
      const btnClosed = document.getElementById('btn-cool-closed');
      const btnOpen = document.getElementById('btn-cool-open');
      const content = document.getElementById('cool-content');
      if (mode === 'open') {
        if (btnOpen) { btnOpen.style.background = '#ef4444'; btnOpen.style.color = '#ffffff'; }
        if (btnClosed) { btnClosed.style.background = 'none'; btnClosed.style.color = 'inherit'; }
        if (content) content.innerHTML = '<strong>تراكم الحلقات المفتوحة (Open Loop):</strong><p>إغلاق المنصة مع غضب وضيق، استمرار التفكير بالصفقة أثناء العشاء وقبل النوم، أرق وتوتر عصبي، ثم بدء اليوم التالي بذاكرة عاملة منهكة بنسبة 70%، مما يقود حتماً للـ Tilt والانتقام!</p>';
      } else {
        if (btnClosed) { btnClosed.style.background = '#10b981'; btnClosed.style.color = '#ffffff'; }
        if (btnOpen) { btnOpen.style.background = 'none'; btnOpen.style.color = 'inherit'; }
        if (content) content.innerHTML = '<strong>معالجة واستشفاء (Closed Loop):</strong><p>15 دقيقة ابتعاد تام عن الشاشات، تدوين هادئ للتجربة: «خسرت صفقتين اليوم، الأولى بالخطة والثانية FOMO، لا تعديل على الاستراتيجية». الدماغ ينام بعمق ويبدأ اليوم التالي بصفاء 100%.</p>';
      }
    }

    function setLens(mode) {
      const btnNeutral = document.getElementById('btn-lens-neutral');
      const btnEmotional = document.getElementById('btn-lens-emotional');
      const content = document.getElementById('lens-content');
      if (mode === 'emotional') {
        if (btnEmotional) { btnEmotional.style.background = '#ef4444'; btnEmotional.style.color = '#ffffff'; }
        if (btnNeutral) { btnNeutral.style.background = 'none'; btnNeutral.style.color = 'inherit'; }
        if (content) content.innerHTML = '<strong>تفسير العقل المنفعل (بعد خسارة $50):</strong><p>«مستحيل الذهب يكمل هبوط! هذه الشمعة الصغيرة هي الانعكاس المؤكد، سأدخل الآن بلوت 2x وأضع ستوب قريب لأعوض ما خسرته!». النتيجة: شراء عند القمة وخسارة إضافية.</p>';
      } else {
        if (btnNeutral) { btnNeutral.style.background = '#10b981'; btnNeutral.style.color = '#ffffff'; }
        if (btnEmotional) { btnEmotional.style.background = 'none'; btnEmotional.style.color = 'inherit'; }
        if (content) content.innerHTML = '<strong>تفسير العقل المحايد:</strong><p>الاتجاه غير واضح، هناك مقاومة يومية قريبة، والشموع لا تملك تأكيداً. القرار: الانتظار وحماية رأس المال.</p>';
      }
    }
  </script>
</body>
</html>`;
}
