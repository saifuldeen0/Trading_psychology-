import { useState } from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle, CheckSquare, Square, RotateCcw } from 'lucide-react';

interface Symptom {
  id: string;
  text: string;
  tier: 'green' | 'yellow' | 'red';
}

export default function EmotionalTrafficLightScanner() {
  const [selectedIds, setSelectedIds] = useState<string[]>(['g1', 'g3']);

  const symptoms: Symptom[] = [
    // Green
    { id: 'g1', text: "تفكيري صافٍ وهادئ ولا أشعر بأي ضغط خارجي.", tier: 'green' },
    { id: 'g2', text: "أنتظر بهدوء اكتمال شروط الاستراتيجية دون استعجال.", tier: 'green' },
    { id: 'g3', text: "متقبل لاحتمال الخسارة تماماً وملتزم بـ 1% فقط مخاطرة.", tier: 'green' },
    { id: 'g4', text: "لا أشعر بأي إلحاح لدخول صفقة إذا لم تتوفر الشروط.", tier: 'green' },

    // Yellow
    { id: 'y1', text: "أفكر في الصفقة السابقة وأشعر برغبة في تعويضها.", tier: 'yellow' },
    { id: 'y2', text: "أراقب رقم الربح والخسارة بالدولار أكثر من قراءة الشارت.", tier: 'yellow' },
    { id: 'y3', text: "أشعر بالعجلة أو بضرورة إيجاد صفقة قبل إغلاق الجلسة.", tier: 'yellow' },
    { id: 'y4', text: "أفكر في تعديل الاستراتيجية على عجل لتناسب حركة اليوم.", tier: 'yellow' },

    // Red
    { id: 'r1', text: "أشعر بالغضب أو نبضات قلب متسارعة وحرقة بالصدر.", tier: 'red' },
    { id: 'r2', text: "رغبة ملحة في الانتقام من السوق وإثبات صحة وجهة نظري.", tier: 'red' },
    { id: 'r3', text: "أريد زيادة حجم اللوت لتعويض خسارة اليوم بضربة واحدة.", tier: 'red' },
    { id: 'r4', text: "أفكر في تحريك أمر وقف الخسارة أو حذفه بالكامل.", tier: 'red' },
  ];

  const toggleSymptom = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const hasRed = selectedIds.some((id) => id.startsWith('r'));
  const hasYellow = selectedIds.some((id) => id.startsWith('y'));

  let currentTier: 'green' | 'yellow' | 'red' = 'green';
  if (hasRed) {
    currentTier = 'red';
  } else if (hasYellow) {
    currentTier = 'yellow';
  }

  const resetAll = () => {
    setSelectedIds(['g1', 'g2', 'g3', 'g4']);
  };

  return (
    <div className="my-8 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-5 md:p-8 dark:border-stone-800/80 dark:bg-stone-900/60 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/60 pb-4 dark:border-stone-800/60">
        <div>
          <span className="text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400">
            فحص ذاتي قبل التنفيذ
          </span>
          <h4 className="mt-1 text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            رادار الإشارات الضوئية التفاعلي (Traffic Light Assessment)
          </h4>
        </div>
        <button
          onClick={resetAll}
          className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>إعادة ضبط</span>
        </button>
      </div>

      <p className="mt-3 text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
        حدد الأعراض والمشاعر التي تشعر بها في هذه اللحظة بالذات قبل الضغط على أمر الشراء أو البيع:
      </p>

      {/* Symptom Checkboxes */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Green column */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 dark:border-emerald-500/10">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>إشارات المنطقة الخضراء 🟢</span>
          </div>
          <div className="space-y-2">
            {symptoms.filter((s) => s.tier === 'green').map((s) => {
              const isChecked = selectedIds.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleSymptom(s.id)}
                  className="w-full text-right flex items-start gap-2 p-2 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-stone-200/50 dark:border-stone-800/50 hover:border-emerald-400 transition-colors text-xs text-stone-700 dark:text-stone-300"
                >
                  {isChecked ? (
                    <CheckSquare className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                  ) : (
                    <Square className="h-4 w-4 shrink-0 text-stone-300 dark:text-stone-600 mt-0.5" />
                  )}
                  <span className="leading-snug">{s.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Yellow column */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 dark:border-amber-500/10">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 mb-3">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            <span>إشارات المنطقة الصفراء 🟡</span>
          </div>
          <div className="space-y-2">
            {symptoms.filter((s) => s.tier === 'yellow').map((s) => {
              const isChecked = selectedIds.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleSymptom(s.id)}
                  className="w-full text-right flex items-start gap-2 p-2 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-stone-200/50 dark:border-stone-800/50 hover:border-amber-400 transition-colors text-xs text-stone-700 dark:text-stone-300"
                >
                  {isChecked ? (
                    <CheckSquare className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                  ) : (
                    <Square className="h-4 w-4 shrink-0 text-stone-300 dark:text-stone-600 mt-0.5" />
                  )}
                  <span className="leading-snug">{s.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Red column */}
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3.5 dark:border-red-500/10">
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400 mb-3">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            <span>إشارات المنطقة الحمراء 🔴</span>
          </div>
          <div className="space-y-2">
            {symptoms.filter((s) => s.tier === 'red').map((s) => {
              const isChecked = selectedIds.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleSymptom(s.id)}
                  className="w-full text-right flex items-start gap-2 p-2 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-stone-200/50 dark:border-stone-800/50 hover:border-red-400 transition-colors text-xs text-stone-700 dark:text-stone-300"
                >
                  {isChecked ? (
                    <CheckSquare className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
                  ) : (
                    <Square className="h-4 w-4 shrink-0 text-stone-300 dark:text-stone-600 mt-0.5" />
                  )}
                  <span className="leading-snug">{s.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Real-time Diagnosis Banner */}
      <div className="mt-5">
        {currentTier === 'green' && (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 dark:bg-emerald-950/30 flex items-start gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                الحالة: الضوء الأخضر 🟢 - تداول آمن ومسموح
              </h5>
              <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                عقلك في حالة استقرار ممتازة. القشرة الجبهية تقود العملية، وأنت مؤهل لاتخاذ قرارات احتمالية ناضجة. تأكد من اكتمال النموذج والتزم بنسبة المخاطرة 1%.
              </p>
            </div>
          </div>
        )}

        {currentTier === 'yellow' && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 dark:bg-amber-950/30 flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                الحالة: الضوء الأصفر 🟡 - تحذير وتخفيض فوري
              </h5>
              <p className="mt-1 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                أنت في بداية الانزلاق نحو التداول العاطفي! بروتوكول التصرف الإلزامي: قلص حجم لوت الصفقة إلى النصف (0.5% مخاطرة) أو قف من أمام الشاشة وخذ استراحة 45 دقيقة لشرب القهوة والمشي.
              </p>
            </div>
          </div>
        )}

        {currentTier === 'red' && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/15 p-4 dark:bg-red-950/40 flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-bold text-red-900 dark:text-red-200">
                الحالة: الضوء الأحمر 🔴 - إيقاف فوري (قاطع الدائرة)
              </h5>
              <p className="mt-1 text-xs text-red-800 dark:text-red-300 leading-relaxed">
                <strong>توقف فوراً!</strong> اللوزة الدماغية (Amygdala) استولت على قراراتك. أي صفقة تفتحها الآن هي مقامرة بدافع الغيظ. أغلق منصة التداول بالكامل، اخرج من الغرفة، وممنوع التداول لبقية هذا اليوم.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
