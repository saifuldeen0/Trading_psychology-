import { useState } from 'react';
import { Target, AlertCircle, RefreshCw, BarChart2, ShieldCheck, HelpCircle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  category: 'strategy' | 'execution' | 'psychology' | 'regime';
}

const QUESTIONS: Question[] = [
  { id: 'q1', text: 'هل الاستراتيجية أثبتت نجاحها سابقاً في باك تيست أو لـ 50+ صفقة بنسبة ربح إيجابية؟', category: 'strategy' },
  { id: 'q2', text: 'هل دخلت بعض الصفقات مبكراً قبل اكتمال شمعة الإغلاق أو بدون الـ Confirmation المطلوب؟', category: 'execution' },
  { id: 'q3', text: 'هل رفعت حجم العقد (اللوت) بعد صفقة خاسرة محاولاً استعادة المال سريعاً؟', category: 'psychology' },
  { id: 'q4', text: 'هل تغيرت حركة السوق مؤخراً من ترند قوي سلس إلى نطاق عرضي متذبذب وخانق؟', category: 'regime' },
  { id: 'q5', text: 'هل قمت بتحريك أو إلغاء أمر وقف الخسارة (Stop Loss) أثناء سريان الصفقة؟', category: 'execution' },
  { id: 'q6', text: 'هل شعرت بنبضات قلب سريعة أو غضب ملحّ دفعك لفتح الشارت والبحث عن أي فرصة؟', category: 'psychology' },
];

export default function StrategyDiagnosticMatrix() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({
    q1: true,
    q2: true,
    q3: true,
    q4: false,
    q5: false,
    q6: true,
  });

  const toggleAnswer = (id: string) => {
    setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate scores
  const isStrategyProven = answers['q1'];
  const executionFlaws = (answers['q2'] ? 1 : 0) + (answers['q5'] ? 1 : 0);
  const psychologyFlaws = (answers['q3'] ? 1 : 0) + (answers['q6'] ? 1 : 0);
  const regimeShift = answers['q4'];

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-stone-100 dark:border-stone-800 bg-linear-to-r from-blue-500/10 via-transparent to-amber-500/10">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          <Target className="h-4 w-4" />
          <span>مصفوفة التشخيص الرباعية (4-Pillars Diagnostic Matrix)</span>
        </div>
        <h4 className="text-lg md:text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
          هل المشكلة في الاستراتيجية، أم في التنفيذ، أم في النفسية، أم في بيئة السوق؟
        </h4>
        <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 mt-1">
          أجب عن الأسئلة أدناه بصدق لمعرفة السبب الجذري لتراجع أدائك ووقف فخ التنقل العشوائي (Strategy Hopping):
        </p>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Questions Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {QUESTIONS.map((q) => {
            const isChecked = answers[q.id];
            return (
              <button
                key={q.id}
                onClick={() => toggleAnswer(q.id)}
                className={`p-3.5 rounded-xl border text-right transition-all flex items-start gap-3 cursor-pointer ${
                  isChecked
                    ? 'border-amber-500/50 bg-amber-500/10 dark:bg-amber-500/15'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 opacity-70 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                    isChecked
                      ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-stone-950'
                      : 'border border-stone-400 dark:border-stone-600'
                  }`}
                >
                  {isChecked ? '✓' : ''}
                </div>
                <span className="text-xs md:text-sm font-medium text-stone-800 dark:text-stone-200 leading-snug">
                  {q.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Diagnostic Results Box */}
        <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              التشخيص التشريحي الدقيق لحسابك:
            </span>
            <button
              onClick={() =>
                setAnswers({ q1: true, q2: false, q3: false, q4: false, q5: false, q6: false })
              }
              className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              <span>إعادة الضبط</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {/* Strategy */}
            <div className={`p-3 rounded-lg border ${!isStrategyProven ? 'border-red-500/40 bg-red-500/10' : 'border-emerald-500/40 bg-emerald-500/10'}`}>
              <div className="text-xs text-stone-500 dark:text-stone-400">1. الاستراتيجية</div>
              <div className={`text-sm font-extrabold mt-1 ${!isStrategyProven ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {isStrategyProven ? 'سليمة ومجرّبة' : 'غير مثبتة إحصائياً'}
              </div>
            </div>

            {/* Execution */}
            <div className={`p-3 rounded-lg border ${executionFlaws > 0 ? 'border-amber-500/40 bg-amber-500/10' : 'border-emerald-500/40 bg-emerald-500/10'}`}>
              <div className="text-xs text-stone-500 dark:text-stone-400">2. جودة التنفيذ</div>
              <div className={`text-sm font-extrabold mt-1 ${executionFlaws > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {executionFlaws === 2 ? 'خلل تنفيذي جسيم' : executionFlaws === 1 ? 'انحرافات مبكرة' : 'انضباط ممتاز'}
              </div>
            </div>

            {/* Psychology */}
            <div className={`p-3 rounded-lg border ${psychologyFlaws > 0 ? 'border-red-500/40 bg-red-500/10' : 'border-emerald-500/40 bg-emerald-500/10'}`}>
              <div className="text-xs text-stone-500 dark:text-stone-400">3. الحالة النفسية</div>
              <div className={`text-sm font-extrabold mt-1 ${psychologyFlaws > 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {psychologyFlaws === 2 ? 'حالة استثارة وانتقام' : psychologyFlaws === 1 ? 'توتر ومطاردة' : 'هدوء وتوازن'}
              </div>
            </div>

            {/* Market Regime */}
            <div className={`p-3 rounded-lg border ${regimeShift ? 'border-blue-500/40 bg-blue-500/10' : 'border-stone-200 dark:border-stone-800'}`}>
              <div className="text-xs text-stone-500 dark:text-stone-400">4. بيئة السوق</div>
              <div className={`text-sm font-extrabold mt-1 ${regimeShift ? 'text-blue-600 dark:text-blue-400' : 'text-stone-700 dark:text-stone-300'}`}>
                {regimeShift ? 'تغير نظام الحركة' : 'طبيعية ومعتادة'}
              </div>
            </div>
          </div>

          {/* Verdict Message */}
          <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 dark:bg-amber-500/15">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs md:text-sm">
                <span className="font-extrabold text-amber-900 dark:text-amber-200">
                  خلاصة التشخيص الإكلينيكي:
                </span>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  {isStrategyProven && (executionFlaws > 0 || psychologyFlaws > 0) ? (
                    <>
                      <strong>استراتيجيتك بريئة تماماً من الخسائر!</strong> المشكلة 85% تكمن في أن «المتداول الذي ينفذها اليوم» يختلف عن المتداول المنضبط الذي ربح بها أول 100 صفقة. تغيير المؤشرات أو الاستراتيجية الآن (Strategy Hopping) هو هروب من المشكلة الحقيقية وسيضمن تكرار الخسارة بنفس الطريقة.
                    </>
                  ) : !isStrategyProven ? (
                    <>
                      أنت بحاجة أولاً لإثبات ميزتك الإحصائية (Edge) على بيانات تاريخية لـ 100 صفقة قبل أن تلوم نفسيتك.
                    </>
                  ) : regimeShift ? (
                    <>
                      حركتك سليمة لكن السوق دخل في نطاق ضيق غير ملائم لنماذج الترند الخاصة بك. الحل هو خفض عدد الصفقات وليس تغيير القواعد.
                    </>
                  ) : (
                    <>
                      حسابك وأداؤك في المنطقة الخضراء المثالية! استمر بالالتزام الصارم بنفس القواعد.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
