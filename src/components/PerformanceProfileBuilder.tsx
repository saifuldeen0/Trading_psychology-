import { useState } from 'react';
import { UserCheck, Copy, Check, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export default function PerformanceProfileBuilder() {
  const [energy, setEnergy] = useState<number>(7);
  const [focus, setFocus] = useState<number>(8);
  const [stress, setStress] = useState<number>(2);
  const [entryUrgency, setEntryUrgency] = useState<string>("منخفضة - أنتظر اكتمال النموذج بصبر الفهد");
  const [lossHandling, setLossHandling] = useState<string>("تكلفة تشغيلية طبيعية في عمل احتمالي");
  const [copied, setCopied] = useState<boolean>(false);

  const profileSummary = `[ملف الأداء التداولي الشخصي - Performance Profile]
• مستوى الطاقة: ${energy}/10
• مستوى التركيز: ${focus}/10
• مستوى التوتر: ${stress}/10
• الرغبة بالدخول: ${entryUrgency}
• طريقة التعامل مع الخسارة: ${lossHandling}
• طريقة النظر للسوق: أراقب ما يقدمه الشارت فعلياً بدلاً من محاولة إثبات صحة تحليلي
• سرعة القرار: سريعة وحاسمة عند توفر الشروط، وبطيئة ومتفرجة عند غيابها`;

  const copyProfile = async () => {
    try {
      await navigator.clipboard.writeText(profileSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="my-8 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-5 md:p-8 dark:border-stone-800/80 dark:bg-stone-900/60 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/60 pb-4 dark:border-stone-800/60">
        <div>
          <span className="text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400">
            أداة بناء ملف الأداء (Performance Profile)
          </span>
          <h4 className="mt-1 text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            تحديد معايير حالتك المثالية بالأرقام القابلة للقياس
          </h4>
        </div>

        <button
          onClick={copyProfile}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'تم نسخ الملف للمذكرة!' : 'نسخ ملف الأداء'}</span>
        </button>
      </div>

      <p className="mt-3 text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
        بدلاً من الكلمات الغامضة مثل «أريد أن أكون هادئاً ومركزاً»، حدد بدقة المعايير الفسيولوجية والسلوكية التي تتوفر في أفضل أيام تداولك:
      </p>

      {/* Metrics Sliders */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl border border-stone-200/70 bg-white dark:border-stone-800/70 dark:bg-stone-950/40">
          <div className="flex justify-between items-center mb-1 text-xs font-bold text-stone-700 dark:text-stone-300">
            <span>مستوى طاقة الصباح</span>
            <span className="font-mono text-amber-600 dark:text-amber-400">{energy}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
          <span className="text-[10px] text-stone-400 mt-1 block">الأفضل: 7-8 (لا خمول ولا فرط استثارة)</span>
        </div>

        <div className="p-3.5 rounded-xl border border-stone-200/70 bg-white dark:border-stone-800/70 dark:bg-stone-950/40">
          <div className="flex justify-between items-center mb-1 text-xs font-bold text-stone-700 dark:text-stone-300">
            <span>مستوى الحضور والتركيز</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">{focus}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={focus}
            onChange={(e) => setFocus(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <span className="text-[10px] text-stone-400 mt-1 block">الأفضل: 8-9 (يقظة تحليليّة كاملة)</span>
        </div>

        <div className="p-3.5 rounded-xl border border-stone-200/70 bg-white dark:border-stone-800/70 dark:bg-stone-950/40">
          <div className="flex justify-between items-center mb-1 text-xs font-bold text-stone-700 dark:text-stone-300">
            <span>مستوى التوتر والضغط</span>
            <span className="font-mono text-blue-600 dark:text-blue-400">{stress}/10</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={stress}
            onChange={(e) => setStress(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="text-[10px] text-stone-400 mt-1 block">الأفضل: 2-3 (توتر صحي بسيط لليقظة)</span>
        </div>
      </div>

      {/* Behavioral Selectors */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl border border-stone-200/70 bg-white dark:border-stone-800/70 dark:bg-stone-950/40 text-xs">
          <span className="font-bold text-stone-800 dark:text-stone-200 block mb-1.5">الرغبة في الدخول (Urgency):</span>
          <select
            value={entryUrgency}
            onChange={(e) => setEntryUrgency(e.target.value)}
            className="w-full p-2 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 focus:outline-hidden"
          >
            <option value="منخفضة - أنتظر اكتمال النموذج بصبر الفهد">منخفضة - أنتظر اكتمال النموذج بصبر الفهد (مثالي)</option>
            <option value="معتدلة - أراقب باهتمام دون تسرع">معتدلة - أراقب باهتمام دون تسرع</option>
            <option value="مرتفعة - أشعر بضرورة فتح صفقة اليوم">مرتفعة - أشعر بضرورة فتح صفقة اليوم (تحذير)</option>
          </select>
        </div>

        <div className="p-3.5 rounded-xl border border-stone-200/70 bg-white dark:border-stone-800/70 dark:bg-stone-950/40 text-xs">
          <span className="font-bold text-stone-800 dark:text-stone-200 block mb-1.5">طريقة التعامل مع الخسارة:</span>
          <select
            value={lossHandling}
            onChange={(e) => setLossHandling(e.target.value)}
            className="w-full p-2 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 focus:outline-hidden"
          >
            <option value="تكلفة تشغيلية طبيعية في عمل احتمالي">تكلفة تشغيلية طبيعية في عمل احتمالي (مثالي)</option>
            <option value="إزعاج بسيط يمكن تجاوزه">إزعاج بسيط يمكن تجاوزه</option>
            <option value="إهانة شخصية ورغبة في استرداد المال فوراً">إهانة شخصية ورغبة في استرداد المال فوراً (خطر)</option>
          </select>
        </div>
      </div>

      {/* Correlation vs Causation Card */}
      <div className="mt-5 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 dark:bg-amber-950/20">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200 mb-2">
          <HelpCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <span>مفهوم حاسم: الارتباط مقابل السببية (Correlation vs. Causation)</span>
        </div>
        <p className="text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed mb-3">
          لا تقل: «المشي الصباحي هو سبب تحسن تداولي» لمجرد أنك مشيت 3 أيام وربحت. قد تكون السلسلة الحقيقية هي:
        </p>

        {/* Chain visualization */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-stone-700 dark:text-stone-300">
          <span className="p-1.5 rounded-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">المشي</span>
          <ArrowRight className="h-3 w-3 text-amber-500 shrink-0" />
          <span className="p-1.5 rounded-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">التعرض لضوء الصباح</span>
          <ArrowRight className="h-3 w-3 text-amber-500 shrink-0" />
          <span className="p-1.5 rounded-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">استيقاظ بيولوجي كامل</span>
          <ArrowRight className="h-3 w-3 text-amber-500 shrink-0" />
          <span className="p-1.5 rounded-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">وقت أطول لتحليل هادئ</span>
          <ArrowRight className="h-3 w-3 text-amber-500 shrink-0" />
          <span className="p-1.5 rounded-md bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 font-bold">قرارات تداول أفضل</span>
        </div>

        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-3">
          سجل بياناتك لعدة أسابيع في دفتر التداول: ابحث عن العوامل التي تتكرر بالفعل حتى تنتقل من مرحلة «أشعر أن...» إلى مرحلة «بياناتي الموثقة تؤكد أن...».
        </p>
      </div>
    </div>
  );
}
