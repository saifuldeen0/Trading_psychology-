import { useState } from 'react';
import { Sparkles, Sliders, CheckSquare, AlertTriangle, ShieldCheck, XCircle } from 'lucide-react';

export default function ZoneRealityTester() {
  const [sleepHours, setSleepHours] = useState<number>(6);
  const [didWorkout, setDidWorkout] = useState<boolean>(true);
  const [hasUrgeToRevenge, setHasUrgeToRevenge] = useState<boolean>(false);
  const [hasStressAccumulation, setHasStressAccumulation] = useState<boolean>(false);

  // Evaluate realistically
  const getReadinessVerdict = () => {
    if (hasUrgeToRevenge) {
      return {
        status: 'خطر أحمر - امتناع إلزامي',
        color: 'text-red-600 dark:text-red-400',
        bg: 'border-red-500/40 bg-red-500/10',
        verdict: 'امتنع تماماً عن التداول اليوم! رغبة التعويض المسبقة هي سم قاتل لأي حساب، حتى لو نمت 9 ساعات وتمرنت في الجيم.',
      };
    }

    if (sleepHours < 5 && hasStressAccumulation) {
      return {
        status: 'خطر برتقالي - خفض المخاطرة بنسبة 70%',
        color: 'text-amber-600 dark:text-amber-400',
        bg: 'border-amber-500/40 bg-amber-500/10',
        verdict: 'مواردك العقلية منخفضة؛ تداول بنصف لوت فقط لصفقة واحدة عالية الجودة، أو خذ اليوم راحة واستشفاء.',
      };
    }

    if (sleepHours === 5 && !hasStressAccumulation) {
      return {
        status: 'جاهزية جيدة مع مراقبة اليقظة',
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'border-blue-500/40 bg-blue-500/10',
        verdict: 'نومك 5 ساعات هو مجرد معلومة وليس حكماً بالإعدام! يمكنك التداول بتركيز مع تقليل عدد ساعات الجلوس أمام الشاشة.',
      };
    }

    return {
      status: 'جاهزية ممتازة - ظروف داعمة للأداء',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'border-emerald-500/40 bg-emerald-500/10',
      verdict: 'ظروفك الفيزيولوجية متوازنة. تذكر أن الـ Zone حالة تتدفق بمرونة وليست مكافأة تفرضها بالقوة؛ ركّز على جودة قراراتك فقط.',
    };
  };

  const evalResult = getReadinessVerdict();

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-stone-100 dark:border-stone-800 bg-linear-to-r from-amber-500/10 via-transparent to-blue-500/10">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
          <Sparkles className="h-4 w-4" />
          <span>مقياس واقعية الـ Zone وتفكيك خرافة قائمة التحضير</span>
        </div>
        <h4 className="text-lg md:text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
          الـ Zone ليست وصفة كيك: توازن الاستعداد دون هوس أو تهاون
        </h4>
        <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 mt-1">
          اختبر واقعية حالتك دون الوقوع في فخ التطرفين (التطير والوسواس vs التهور وتجاهل التعب):
        </p>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Sliders and Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Sleep hours */}
          <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span>ساعات النوم الفعلية:</span>
              <span className="font-mono text-amber-600 dark:text-amber-400 text-sm">{sleepHours} ساعات</span>
            </div>
            <input
              type="range"
              min="3"
              max="9"
              value={sleepHours}
              onChange={(e) => setSleepHours(parseInt(e.target.value))}
              className="w-full cursor-pointer accent-amber-500"
            />
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              {sleepHours <= 4 ? 'نوم قليل جداً قد يقلل الذاكرة العاملة' : sleepHours <= 6 ? 'نوم متوسط يسمح بالتداول المركز' : 'نوم كافٍ ومثالي'}
            </p>
          </div>

          {/* Revenge urge toggle */}
          <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span>هل تحمل رغبة مسبقة بالتعويض من أمس؟</span>
              <button
                onClick={() => setHasUrgeToRevenge(!hasUrgeToRevenge)}
                className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                  hasUrgeToRevenge
                    ? 'bg-red-600 text-white'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                {hasUrgeToRevenge ? 'نعم، أريد التعويض!' : 'لا، ذهني هادئ'}
              </button>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              رغبة التعويض المسبقة هي المؤشر الحاسم الأشد خطراً.
            </p>
          </div>
        </div>

        {/* Verdict Box */}
        <div className={`p-5 rounded-xl border transition-all ${evalResult.bg}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              التشخيص الواقعي لحالتك اليوم:
            </span>
            <span className={`text-sm font-black ${evalResult.color}`}>
              {evalResult.status}
            </span>
          </div>

          <p className="text-xs md:text-sm font-medium text-stone-800 dark:text-stone-200 leading-relaxed">
            {evalResult.verdict}
          </p>
        </div>

        {/* Mythbuster Callout */}
        <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/10 text-xs md:text-sm text-stone-800 dark:text-stone-200 space-y-1">
          <strong className="text-blue-700 dark:text-blue-300">
            الحقيقة النفسية: الـ Zone ليست كعكة تخرج من الفرن بعد قائمة مهام!
          </strong>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            النوم والتمرين والقهوة عوامل تهيئ الاحتمالية، لكنها لا تضمن الـ Zone. لا تقع في وسواس مراقبة ذاتك: «ليش مو حاسس بنشوة الـ Zone اليوم؟». مهمتك هي التداول بواقعية وبأعلى انضباط مع الحالة المتوفرة لديك حالياً.
          </p>
        </div>
      </div>
    </div>
  );
}
