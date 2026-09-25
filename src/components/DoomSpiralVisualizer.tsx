import { useState } from 'react';
import { ArrowDown, AlertOctagon, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  category: 'market' | 'emotion' | 'decision' | 'danger';
  desc: string;
  isCircuitBreakerPoint?: boolean;
}

export default function DoomSpiralVisualizer() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [circuitBreakerActive, setCircuitBreakerActive] = useState<boolean>(false);

  const steps: Step[] = [
    { id: 1, label: "خسارة عادية (-1R)", category: "market", desc: "حدث إحصائي طبيعي لأي نظام تداولي في العالم." },
    { id: 2, label: "إحباط بسيط ومكتوم", category: "emotion", desc: "الأنا تشعر بلسعة الهزيمة: 'هذه الصفقة المفروض كانت رابحة!'" },
    { id: 3, label: "ارتفاع هرمونات التوتر", category: "emotion", desc: "تسارع نبضات القلب وتضاؤل صبر المتداول أمام الشاشة." },
    { id: 4, label: "انخفاض جودة التفكير (-15%)", category: "decision", desc: "التضييق المعرفي يبدأ، وتتراجع قدرة الفص الجبهي على وزن المخاطر.", isCircuitBreakerPoint: true },
    { id: 5, label: "دخول صفقة ثانية أقل جودة", category: "decision", desc: "البحث عن فرصة سريعة دون اكتمال كل شروط الاستراتيجية." },
    { id: 6, label: "خسارة ثانية متتالية", category: "market", desc: "نتيجة منطقية للدخول العشوائي الضعيف." },
    { id: 7, label: "إحباط وغيظ مضاعف", category: "emotion", desc: "العقل يصرخ: 'السوق يتلاعب بي عمداً!'" },
    { id: 8, label: "الرغبة الهستيرية بالتعويض", category: "danger", desc: "التحول من التداول الاحتمالي إلى السعي للحل العاطفي الفوري." },
    { id: 9, label: "زيادة حجم اللوت (Lot) والمخاطرة", category: "danger", desc: "مضاعفة العقود لتعويض خسارتي اليوم بضربة واحدة." },
    { id: 10, label: "قرار أسوأ ➔ كارثة تصفير الحساب", category: "danger", desc: "تراجع الحساب بنسبة 20% أو 30% ودخول مرحلة الندم الشديد." },
  ];

  return (
    <div className="my-8 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-5 md:p-8 dark:border-stone-800/80 dark:bg-stone-900/60 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/60 pb-4 dark:border-stone-800/60">
        <div>
          <span className="text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400">
            تشريح السلسلة التدميرية
          </span>
          <h4 className="mt-1 text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            حلقة التغذية الراجعة السلبية (Negative Feedback Loop)
          </h4>
        </div>

        <button
          onClick={() => setCircuitBreakerActive(!circuitBreakerActive)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            circuitBreakerActive
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
              : 'bg-stone-100 text-stone-700 border-stone-300 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700 hover:border-emerald-500'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>{circuitBreakerActive ? 'قاطع الدائرة مُفعل (تم كسر الحلقة ✓)' : 'تفعيل قاطع الدائرة النفسي'}</span>
        </button>
      </div>

      <p className="mt-3 text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
        الخطأ الثاني لا يولد من فراغ؛ بل هو وليد الحالة النفسية المشحونة التي خلفتها الخسارة الأولى. انقر على أي محطة في السلسلة لتكتشف كواليسها:
      </p>

      {/* Interactive Step Navigator */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-2">
        {steps.map((s) => {
          const isBlocked = circuitBreakerActive && s.id > 4;
          return (
            <button
              key={s.id}
              disabled={isBlocked}
              onClick={() => setActiveStep(s.id)}
              className={`p-2.5 rounded-xl text-right transition-all border text-xs relative ${
                isBlocked
                  ? 'opacity-40 line-through bg-stone-100 dark:bg-stone-950 border-stone-200 dark:border-stone-800 cursor-not-allowed'
                  : activeStep === s.id
                  ? 'bg-amber-100/80 border-amber-500 text-amber-950 dark:bg-amber-950/60 dark:text-amber-100 dark:border-amber-400 font-bold shadow-xs'
                  : 'bg-white/80 border-stone-200 dark:bg-stone-950/40 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] text-stone-400">#{s.id}</span>
                {s.isCircuitBreakerPoint && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-sans">
                    نقطة القطع
                  </span>
                )}
              </div>
              <span className="line-clamp-2">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Details */}
      <div className="mt-4 rounded-xl border border-stone-200/70 bg-white p-4 dark:border-stone-800/70 dark:bg-stone-950/50">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                المرحلة #{activeStep} من 10
              </span>
              <h5 className="text-base font-bold text-stone-900 dark:text-stone-100">
                {steps[activeStep - 1].label}
              </h5>
            </div>
            <p className="mt-2 text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {steps[activeStep - 1].desc}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setActiveStep((prev) => (prev > 1 ? prev - 1 : 10))}
              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs"
              title="السابق"
            >
              ←
            </button>
            <button
              onClick={() => setActiveStep((prev) => (prev < 10 ? prev + 1 : 1))}
              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs"
              title="التالي"
            >
              →
            </button>
          </div>
        </div>

        {circuitBreakerActive ? (
          <div className="mt-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div>
              <strong className="block font-bold">تم إيقاف النزيف المالي بنجاح!</strong>
              عند تفعيل قاطع الدائرة بعد الخسارة الأولى أو الثانية، تبتعد عن الشاشة لمدة ساعتين، مما يعيد استثارتك النفسية إلى المنطقة الذهبية ويمنع خسارة الـ 30%.
            </div>
          </div>
        ) : (
          activeStep >= 5 && (
            <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-800 dark:text-red-300 flex items-center gap-2.5">
              <AlertOctagon className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
              <div>
                <strong className="block font-bold">منطقة الخطر الداهم!</strong>
                أنت الآن تتداول بأموالك الحقيقية تحت تأثير هرمونات الغضب والانتقام، وليس وفق احتمالات استراتيجيتك.
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
