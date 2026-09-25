import { useState } from 'react';
import { Compass, Flame, ShieldCheck, AlertCircle, Eye, HelpCircle, Check, X } from 'lucide-react';

export default function StimulationVsOpportunityRadar() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const questions = [
    {
      id: 'q1',
      text: 'هل الصفقة مطابقة حرفياً لمعايير الـ Checklist المكتوبة مسبقاً في خطتك بدون استثناء؟',
      desired: true,
      hint: 'إذا كنت تبرر الدخول بكلمات مثل "السوق شكله راح ينفجر" دون شرط مكتوب، فهذه إثارة وليست فرصة.'
    },
    {
      id: 'q2',
      text: 'هل تشعر بملل أو نعاس أو رغبة قوية في "أن يحدث أي شيء على الشارت" قبل ظهور هذه الشمعة؟',
      desired: false,
      hint: 'شمعة الذهب الصغيرة بعد ساعتين من التذبذب العرضي ليست إشارة دخول بل طُعم للمتداول المتملل.'
    },
    {
      id: 'q3',
      text: 'هل مكان وقف الخسارة (Stop Loss) محدد بناءً على كسر هيكل سعري واضح وليس مسافة عشوائية تخشى خسارتها؟',
      desired: true,
      hint: 'في صفقات التسلية يضع المتداول وقفاً وهمياً صغيراً ليبرر الدخول فقط دون احترام لحركة السعر.'
    },
    {
      id: 'q4',
      text: 'إذا أغلقت المنصة الآن دون الدخول، هل تشعر بندم شديد وتوتر واختناق كأنك "ضيعت فرصة العمر"؟',
      desired: false,
      hint: 'المتداول المحترف يتقبل تفويت الحركة ببرود تام لأن السوق مستمر؛ الشعور بالاحتقان دلالة على الإدمان الكيميائي للإثارة.'
    }
  ];

  const handleToggle = (id: string, value: boolean) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const answeredCount = Object.keys(answers).length;
  
  // Calculate score
  let stimulationCount = 0;
  questions.forEach(q => {
    if (answers[q.id] !== undefined) {
      if (answers[q.id] !== q.desired) {
        stimulationCount++;
      }
    }
  });

  const isOpportunity = answeredCount === 4 && stimulationCount === 0;
  const isDangerous = answeredCount === 4 && stimulationCount >= 2;
  const isMixed = answeredCount === 4 && stimulationCount === 1;

  return (
    <div className="my-8 rounded-2xl border border-stone-200/90 bg-white p-5 md:p-7 shadow-sm dark:border-stone-800 dark:bg-stone-900/60">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4 dark:border-stone-800/80 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 mb-1">
            <Compass className="h-3.5 w-3.5" />
            <span>رادار التمييز السلوكي الفوري</span>
          </div>
          <h4 className="text-base md:text-lg font-bold text-stone-900 dark:text-stone-100">
            اقتناص فرصة (Opportunity Seeking) أم بحث عن إثارة (Stimulation Seeking)؟
          </h4>
        </div>
        <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
          سيناريو تذبذب الذهب XAUUSD
        </span>
      </div>

      <div className="mb-5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
        <strong>سيناريو فخ الملل:</strong> فتحت منصة الذهب، والسوق يتحرك عرضياً ببطء منذ ساعتين. شعرت بنفاد الصبر وفجأة صعدت شمعة خضراء 5 نقاط.. عقلك همس: <em>«الذهب سحب سيولة.. هاي بداية الانفجار!»</em>. أجب بصدق لتعرف دافعك الحقيقي:
      </div>

      <div className="space-y-3 mb-6">
        {questions.map((q) => {
          const current = answers[q.id];
          return (
            <div
              key={q.id}
              className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1 flex-1">
                <p className="text-xs md:text-sm font-semibold text-stone-800 dark:text-stone-200">
                  {q.text}
                </p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  {q.hint}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggle(q.id, true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    current === true
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-500/20'
                  }`}
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>نعم</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(q.id, false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    current === false
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-rose-500/20'
                  }`}
                >
                  <X className="h-3.5 w-3.5" />
                  <span>لا</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {answeredCount < 4 ? (
        <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800/40 text-center text-xs text-stone-500 dark:text-stone-400">
          أجب عن الأسئلة الأربعة لتشخيص الدافع الحقيقي قبل اتخاذ أي قرار تنفيذي.
        </div>
      ) : (
        <div
          className={`p-4 rounded-xl border text-right transition-all ${
            isOpportunity
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-100'
              : isMixed
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-950 dark:text-amber-100'
              : 'bg-rose-500/10 border-rose-500/40 text-rose-950 dark:text-rose-100'
          }`}
        >
          <div className="flex items-center gap-2 mb-2 font-bold text-sm md:text-base">
            {isOpportunity ? (
              <>
                <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span>دافع احترافي نقي: اقتناص فرصة حقيقية (Opportunity Seeking)</span>
              </>
            ) : isMixed ? (
              <>
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <span>حالة رمادية مشوبة بالملل: خذ نفساً عميقاً وراجع الستوب</span>
              </>
            ) : (
              <>
                <Flame className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                <span>تحذير أحمر: بحث لاواعي عن الإثارة (Stimulation Seeking)!</span>
              </>
            )}
          </div>
          <p className="text-xs leading-relaxed opacity-90 font-normal">
            {isOpportunity
              ? 'الصفقة مبنية على ميزة إحصائية واضحة (Edge) وليست بدافع الملل. التزم بحجم العقد المحدد مسبقاً في خطتك وتداول بدون تردد.'
              : isMixed
              ? 'هناك رغبة خفية في تحريك الجلسة. انتظر إغلاق الشمعة الحالية بالكامل؛ إن كانت الفرصة حقيقية ستعطيك إعادة اختبار هادئة.'
              : 'أنت لا تتداول الفرصة لأن السوق قدمها، بل لأنك "زهقان وتريد شيئاً يحدث"! إغلاق المنصة الآن هو أربح قرار تتخذه طوال الأسبوع.'}
          </p>
        </div>
      )}
    </div>
  );
}
