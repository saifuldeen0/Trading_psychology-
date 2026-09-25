import { useState } from 'react';
import { Radar, AlertTriangle, ShieldCheck, ShieldAlert, CheckSquare, Square, RotateCcw } from 'lucide-react';

interface Indicator {
  id: string;
  category: 'سلوكي' | 'جسدي' | 'عقلي وتفكيري';
  text: string;
  weight: number;
}

const INDICATORS: Indicator[] = [
  { id: 'b1', category: 'سلوكي', text: 'فحص نافذة الأرباح والخسائر (Floating P&L) بشكل قهري كل بضع ثوانٍ', weight: 20 },
  { id: 'b2', category: 'سلوكي', text: 'التبديل المتكرر إلى فريمات صغيرة جداً (1m أو 30s) بحثاً عن حركة فورية', weight: 25 },
  { id: 'b3', category: 'سلوكي', text: 'إدخال حجم لوت أكبر من المعتاد لـ "تعويض الخسارة بضربة واحدة"', weight: 35 },
  { id: 'p1', category: 'جسدي', text: 'شد عضلي ملحوظ في الفك أو الرقبة أو انحباس الأنفاس أثناء تحرك الشمعة', weight: 15 },
  { id: 'p2', category: 'جسدي', text: 'حرارة في الوجه أو تسارع مفاجئ في دقات القلب مع شعور بالعجلة', weight: 20 },
  { id: 'c1', category: 'عقلي وتفكيري', text: 'ظهور صوت داخلي يقول: «مستحيل ينزل السعر أكثر.. السوق يعاندني اليوم»', weight: 25 },
  { id: 'c2', category: 'عقلي وتفكيري', text: 'تفكير ملحّ بضرورة: «إنهاء الجلسة برقم موجب مهما كلف الثمن»', weight: 30 },
];

export default function EarlyWarningRadar() {
  const [selectedIds, setSelectedIds] = useState<string[]>(['b1', 'p1']);

  const toggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalScore = selectedIds.reduce((sum, id) => {
    const ind = INDICATORS.find((i) => i.id === id);
    return sum + (ind?.weight || 0);
  }, 0);

  const getThreatLevel = () => {
    if (totalScore >= 60) return { label: 'إنذار أحمر حرج (Tilt دائم)', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/15 border-red-500/40', advice: 'أوقف المنصة فوراً! عقلك غادر منطقة الأداء الرشيد بالكامل، وأي نقرة إضافية ستكون انتحاراً مالياً.' };
    if (totalScore >= 30) return { label: 'إنذار برتقالي (انحراف مبكر)', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/15 border-amber-500/40', advice: 'فرملة مبكرة مطلوبة الآن! خذ استراحة تبريد 15 دقيقة، اشرب ماء، وتوقف عن مراقبة الـ P&L.' };
    return { label: 'منطقة آمنة (حضور ذهني ممتاز)', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/40', advice: 'جهازك العصبي في حالة توازن؛ التزم بشروط خطتك فقط دون تسرع.' };
  };

  const threat = getThreatLevel();

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-stone-100 dark:border-stone-800 bg-linear-to-r from-red-500/10 via-transparent to-amber-500/10">
        <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
          <Radar className="h-4 w-4" />
          <span>رادار الإنذار المبكر (Early Warning Alarm Radar)</span>
        </div>
        <h4 className="text-lg md:text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
          اكتشاف إشارات التراجع العصبي قبل حدوث الـ Revenge Trading
        </h4>
        <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 mt-1">
          حدد العلامات التي تشعر بها حالياً أو التي تتكرر معك عادة قبل الكارثة:
        </p>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Checklist */}
        <div className="space-y-2.5">
          {INDICATORS.map((ind) => {
            const isSelected = selectedIds.includes(ind.id);
            return (
              <button
                key={ind.id}
                onClick={() => toggle(ind.id)}
                className={`w-full p-3.5 rounded-xl border text-right transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? 'border-red-500/40 bg-red-500/10 dark:bg-red-500/15'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 opacity-75 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                    isSelected
                      ? 'bg-red-600 text-white'
                      : 'border border-stone-400 dark:border-stone-600'
                  }`}
                >
                  {isSelected ? '✓' : ''}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      {ind.category}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      ثقل الإنذار: +{ind.weight}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm font-medium text-stone-800 dark:text-stone-200 mt-1">
                    {ind.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Threat Meter Result */}
        <div className={`p-5 rounded-xl border transition-all ${threat.bg}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              مؤشر خطر الانزلاق في التداول الانتقامي (Tilt Danger):
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-sm md:text-base font-black ${threat.color}`}>
                {threat.label} ({totalScore} نقطة)
              </span>
              <button
                onClick={() => setSelectedIds([])}
                className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>مسح</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden mb-3">
            <div
              className={`h-full transition-all duration-300 ${
                totalScore >= 60 ? 'bg-red-600' : totalScore >= 30 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, (totalScore / 100) * 100)}%` }}
            />
          </div>

          <div className="flex items-start gap-2.5 text-xs md:text-sm font-medium text-stone-800 dark:text-stone-200">
            {totalScore >= 60 ? (
              <ShieldAlert className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0" />
            ) : totalScore >= 30 ? (
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
            ) : (
              <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            )}
            <p className="leading-relaxed">{threat.advice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
