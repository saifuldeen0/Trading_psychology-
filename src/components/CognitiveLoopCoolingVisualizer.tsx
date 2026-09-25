import { useState } from 'react';
import { Moon, Sun, AlertTriangle, CheckCircle2, BatteryCharging, BatteryWarning, Brain, ShieldAlert, ZapOff } from 'lucide-react';

export default function CognitiveLoopCoolingVisualizer() {
  const [activeTab, setActiveTab] = useState<'compare' | 'weekly'>('compare');
  const [selectedDay, setSelectedDay] = useState<number>(3); // 1 to 5 (Mon to Fri)

  // Weekly simulation data
  const weekData = [
    { day: 'الاثنين', openLoad: 15, closedLoad: 10, openDesc: 'خسارة أولى لم تُفرَّغ، أفكار مستمرة قبل النوم.', closedDesc: 'تدوين هادئ، إغلاق اليوم بصفاء.' },
    { day: 'الثلاثاء', openLoad: 35, closedLoad: 12, openDesc: 'تراكم إجهاد الأمس + توتر جديد عند الافتتاح.', closedDesc: 'دخول بموارد ذهنية كاملة.' },
    { day: 'الأربعاء', openLoad: 58, closedLoad: 15, openDesc: 'الذاكرة العاملة ممتلئة بنسبة 60% بضجيج الأيام السابقة.', closedDesc: 'تنفيذ دقيق حسب خطة الذهب.' },
    { day: 'الخميس', openLoad: 78, closedLoad: 14, openDesc: 'اقتراب من حافة الانفجار العصبي وتكرار فحص الـ P&L.', closedDesc: 'استقرار تام واستشفاء رياضي.' },
    { day: 'الجمعة', openLoad: 92, closedLoad: 15, openDesc: 'انهيار وانتقام عشوائي (Revenge Trading) وحرق أرباح الأسبوع.', closedDesc: 'إنهاء الأسبوع بأعلى درجات الالتزام.' },
  ];

  const currentDayData = weekData[selectedDay - 1];

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-stone-100 dark:border-stone-800 bg-linear-to-r from-amber-500/10 via-transparent to-blue-500/10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Brain className="h-4 w-4" />
              <span>محاكي إغلاق الحلقات الذهنية (Cognitive Closure Simulator)</span>
            </div>
            <h4 className="text-lg md:text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
              مرحلة التبريد وتفريغ أحداث التداول vs التراكم الأسبوعي
            </h4>
          </div>
          <div className="inline-flex rounded-lg bg-stone-100 dark:bg-stone-800 p-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'compare'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              مقارنة المسارين (Open vs Closed)
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'weekly'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              محاكاة تراكم الأسبوع (من الإثنين للجمعة)
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Compare Paths */}
      {activeTab === 'compare' && (
        <div className="p-5 md:p-6 space-y-6">
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            أثناء الجلسة تمتص كميات هائلة من المعلومات (أسعار، شموع، أخبار، انفعالات). إذا أغلقت المنصة دون معالجة وتفريغ، تظل التجربة «حلقة مفتوحة» (Open Loop) تستنزف طاقتك ليلاً وتضعف أداءك في اليوم التالي.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Path A: Open Loop */}
            <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/5 dark:bg-red-500/10 space-y-4">
              <div className="flex items-center gap-2 font-bold text-red-600 dark:text-red-400">
                <AlertTriangle className="h-5 w-5" />
                <h5>المسار العشوائي (الحلقة المفتوحة - Open Loop)</h5>
              </div>

              <div className="space-y-2 text-xs md:text-sm">
                <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-red-200 dark:border-red-900/40 text-stone-700 dark:text-stone-300">
                  <span className="font-bold text-red-600 dark:text-red-400">1. انتهاء الجلسة:</span> إغلاق الشارت فجأة مع شعور بالضيق أو التردد.
                </div>
                <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-red-200 dark:border-red-900/40 text-stone-700 dark:text-stone-300">
                  <span className="font-bold text-red-600 dark:text-red-400">2. في رأسك أثناء العشاء:</span> «ليش دخلت؟ كان المفروض أنتظر.. لو ما دخلت جان عندي 200$.. باجر لازم أعوض!»
                </div>
                <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-red-200 dark:border-red-900/40 text-stone-700 dark:text-stone-300">
                  <span className="font-bold text-red-600 dark:text-red-400">3. وقت النوم:</span> أرق، تفكير قهري بالصفقات، جودة نوم سيئة ونبض مرتفع.
                </div>
                <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-red-200 dark:border-red-900/40 text-stone-700 dark:text-stone-300">
                  <span className="font-bold text-red-600 dark:text-red-400">4. اليوم التالي:</span> تبدأ بموارد عقلية مستنزفة، وذاكرة عاملة محتلة بنسبة 60% بذكريات الأمس!
                </div>
              </div>

              <div className="p-3 rounded-lg bg-red-500/10 text-xs font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
                <ZapOff className="h-4 w-4 shrink-0" />
                <span>النتيجة الحتمية: تدهور التنفيذ السريع وتوليد الرغبة في الانتقام.</span>
              </div>
            </div>

            {/* Path B: Closed Loop */}
            <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 space-y-4">
              <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <h5>المسار الاحترافي (مرحلة التبريد والإغلاق المعرفي)</h5>
              </div>

              <div className="space-y-2 text-xs md:text-sm">
                <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-emerald-200 dark:border-emerald-900/40 text-stone-700 dark:text-stone-300">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">1. مرحلة التبريد (Cooling Down):</span> 10 دقائق استراحة تامة وابتعاد عن أي شاشة.
                </div>
                <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-emerald-200 dark:border-emerald-900/40 text-stone-700 dark:text-stone-300">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">2. التفريغ الكتابي المنظم:</span> «خسرت صفقتين اليوم: الأولى التزمت بالخطة، الثانية FOMO. شعوري 6/10 إحباط. لا تعديل على الاستراتيجية، المشكلة بالتنفيذ.»
                </div>
                <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-emerald-200 dark:border-emerald-900/40 text-stone-700 dark:text-stone-300">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">3. وقت النوم:</span> التجربة أُغلقت تماماً وسُجّلت حقائقها؛ العقل يرتاح بعمق واستشفاء عصبي.
                </div>
                <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-emerald-200 dark:border-emerald-900/40 text-stone-700 dark:text-stone-300">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">4. اليوم التالي:</span> تبدأ من خط الصفر الحقيقي بذاكرة عاملة نقية وجاهزية 100%.
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <BatteryCharging className="h-4 w-4 shrink-0" />
                <span>النتيجة: ثبات ذهني واستقرار انفعالي يمنحك أفضلية إحصائية مستمرة.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Weekly Accumulation Simulator */}
      {activeTab === 'weekly' && (
        <div className="p-5 md:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-100 dark:bg-stone-800/60 p-3 rounded-xl">
            <span className="text-xs font-bold text-stone-600 dark:text-stone-300">
              اختر اليوم لمعاينة تراكم العبء المعرفي خلال الأسبوع:
            </span>
            <div className="flex items-center gap-1.5">
              {weekData.map((d, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDay(idx + 1)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    selectedDay === idx + 1
                      ? 'bg-amber-500 text-stone-900 font-extrabold shadow-xs'
                      : 'bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                  }`}
                >
                  {d.day}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Load Meters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unprocessed Load */}
            <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/5 dark:bg-red-500/10 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-red-700 dark:text-red-400 flex items-center gap-1.5">
                  <BatteryWarning className="h-4 w-4" />
                  بدون تفريغ (تراكم الحلقات المفتوحة)
                </span>
                <span className="font-mono font-extrabold text-red-600 dark:text-red-400 text-base">
                  {currentDayData.openLoad}% عبء ذهني
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-4 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    currentDayData.openLoad > 70
                      ? 'bg-red-600'
                      : currentDayData.openLoad > 40
                      ? 'bg-amber-500'
                      : 'bg-blue-500'
                  }`}
                  style={{ width: `${currentDayData.openLoad}%` }}
                />
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed pt-1">
                {currentDayData.openDesc}
              </p>

              {currentDayData.openLoad >= 75 && (
                <div className="p-2.5 rounded-lg bg-red-600/15 text-red-700 dark:text-red-300 text-xs font-bold flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>تحذير حرج: العقل في حالة Tilt مسبقة قبل أن تفتح أول صفقة!</span>
                </div>
              )}
            </div>

            {/* Processed Load */}
            <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <BatteryCharging className="h-4 w-4" />
                  مع تفريغ يومي (تبريد + مراجعة)
                </span>
                <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400 text-base">
                  {currentDayData.closedLoad}% عبء مستقر
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-4 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${currentDayData.closedLoad}%` }}
                />
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed pt-1">
                {currentDayData.closedDesc}
              </p>

              <div className="p-2.5 rounded-lg bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>حالة استشفاء متجددة: كل يوم يبدأ بصفحة بيضاء حقيقية.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
