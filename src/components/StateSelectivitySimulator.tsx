import { useState } from 'react';
import { Sliders, AlertTriangle, CheckCircle2, TrendingDown, ShieldAlert, Sparkles, Brain, ArrowLeft } from 'lucide-react';

export default function StateSelectivitySimulator() {
  const [mentalState, setMentalState] = useState<'optimal' | 'moderate' | 'fatigued' | 'compromised'>('moderate');
  const [setupQuality, setSetupQuality] = useState<'A_plus' | 'A' | 'B'>('B');

  // Definitions for states
  const statesInfo = {
    optimal: {
      label: 'حالة مثالية (تركيز وطاقة 90%+)',
      desc: 'نوم ممتاز، صفاء ذهني، هدوء عصبي، لا يوجد FOMO أو رغبة بالتعويض.',
      recommendedTier: 'A و A+',
      color: 'emerald',
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
    },
    moderate: {
      label: 'حالة متوسطة (طاقة عادية 60-70%)',
      desc: 'تركيز مقبول، نوم 6 ساعات، استعجال طفيف أو روتين عمل يومي معتاد.',
      recommendedTier: 'A+ بشكل أساسي (أو A بحذر)',
      color: 'amber',
      bg: 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/40 text-amber-800 dark:text-amber-300'
    },
    fatigued: {
      label: 'طاقة منخفضة أو ملل (40-50%)',
      desc: 'تعب جسدي، قضاء ساعات في مراقبة شارت الذهب العرضي، رغبة برؤية أي حركة.',
      recommendedTier: 'A+ فقط مع تقليص النشاط 70%',
      color: 'orange',
      bg: 'bg-orange-500/10 dark:bg-orange-500/15 border-orange-500/40 text-orange-800 dark:text-orange-300'
    },
    compromised: {
      label: 'حالة متدهورة أو متوترة (أقل من 30%)',
      desc: 'غضب، خسارة سابقة عالقة في الذاكرة العاملة، إصرار على التعويض قبل الإغلاق.',
      recommendedTier: 'توقف كامل ومطلق (No Trading)',
      color: 'rose',
      bg: 'bg-rose-500/10 dark:bg-rose-500/15 border-rose-500/40 text-rose-800 dark:text-rose-300'
    }
  };

  // Calculate True Psychological Expected Value (EV)
  const getEVAnalysis = () => {
    if (setupQuality === 'A_plus') {
      if (mentalState === 'optimal') {
        return {
          ev: '+45$ (إيجابي جداً)',
          status: 'success',
          headline: 'تكامل مثالي بين جودة الفرصة والقدرة النفسية',
          tiltRisk: '5%',
          detail: 'أنت تملك الوضوح الذهني الكامل لإدارة الصفقة وإغلاقها بهدوء سواء ربحت أو خسرت دون انحراف.'
        };
      } else if (mentalState === 'moderate') {
        return {
          ev: '+30$ (إيجابي معقول)',
          status: 'success',
          headline: 'قرار سليم: فرصة A+ تحميك من ارتكاب أخطاء فادحة',
          tiltRisk: '15%',
          detail: 'وضوح النموذج (Edge قوي) يعوض نقص طاقتك الطفيف ويقلل من عبء التردد أثناء حركة السعر.'
        };
      } else if (mentalState === 'fatigued') {
        return {
          ev: '+10$ (إيجابي طفيف)',
          status: 'warning',
          headline: 'مقبول بشرط الالتزام الصارم باللوت المحدد',
          tiltRisk: '35%',
          detail: 'النموذج ممتاز لكن خمولك قد يجعلك بطيئاً في إدارة الوقف. لا تفتح أكثر من عقد واحد.'
        };
      } else {
        return {
          ev: '-65$ (سلبي رغم جودة الصفقة!)',
          status: 'danger',
          headline: 'فخ الحالة المنهارة: لا تتداول حتى مع أفضل Setup في العالم',
          tiltRisk: '85%',
          detail: 'إذا عاكستك الصفقة ولو لـ 5 دقائق، ستنقض على الشارت وتنتقم باللوت المضاعف. تكلفة الانهيار تفوق أي ربح محتمل.'
        };
      }
    } else if (setupQuality === 'A') {
      if (mentalState === 'optimal') {
        return {
          ev: '+25$ (إيجابي مستقر)',
          status: 'success',
          headline: 'تداول احترافي روتيني ضمن خطتك الاستراتيجية',
          tiltRisk: '10%',
          detail: 'قدرتك النفسية العالية تسمح لك باستيعاب تذبذب الفرص الجيدة وإدارتها بثبات.'
        };
      } else if (mentalState === 'moderate') {
        return {
          ev: '+5$ (على الحافة)',
          status: 'warning',
          headline: 'أرفع معيارك إلى A+ أفضل لك في هذه الجلسة',
          tiltRisk: '30%',
          detail: 'أي انزلاق أو ذبذبة غير مريحة قد تشغل مساحة في ذاكرتك العاملة وتستنزف تركيزك المتبقي.'
        };
      } else {
        return {
          ev: '-50$ (سلبي سلوكياً)',
          status: 'danger',
          headline: 'صفقة خطرة ترفع احتمالية الإحباط والتشتت',
          tiltRisk: '65%',
          detail: 'طاقتك المنخفضة لن تتحمل غموض الصفقة؛ أي انعكاس سيتحول فوراً إلى عداء مع السوق.'
        };
      }
    } else {
      // Setup B
      if (mentalState === 'optimal') {
        return {
          ev: '+8$ (إيجابي هامشي)',
          status: 'warning',
          headline: 'مقبول للمحترف الهادئ فقط، مع استعداد تام لقبول الخسارة',
          tiltRisk: '20%',
          detail: 'الفرصة متوسطة لكن صفاءك الذهني يضمن أنك لن تنتقم إذا ضربت الستوب بل ستغلق المنصة.'
        };
      } else if (mentalState === 'moderate') {
        return {
          ev: '-25$ (سلبي نفسياً وتراكمياً)',
          status: 'danger',
          headline: 'فخ الصفقة المتوسطة: خسارة المال وتدهور المزاج',
          tiltRisk: '55%',
          detail: 'المعادلة الخفية: خسارة $30 في الصفقة B + تدهور حالتك النفسية = احتمالية 55% لفتح صفقة انتقامية كارثية!'
        };
      } else {
        return {
          ev: '-120$ (كارثي ومدمر للحساب)',
          status: 'danger',
          headline: 'مقامرة تامة بدافع الملل أو التوتر وليس Edge تداولي',
          tiltRisk: '90%',
          detail: 'دخولك في فرصة ضعيفة بدافع التسلية أو تعويض خسارة سابقة هو بداية سلسلة التصفير الحتمي.'
        };
      }
    }
  };

  const evResult = getEVAnalysis();

  return (
    <div className="my-8 rounded-2xl border border-stone-200/90 bg-white p-5 md:p-7 shadow-sm dark:border-stone-800 dark:bg-stone-900/60">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4 dark:border-stone-800/80 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 mb-1">
            <Sliders className="h-3.5 w-3.5" />
            <span>محاكي الانتقائية والديناميكية السلوكية</span>
          </div>
          <h4 className="text-base md:text-lg font-bold text-stone-900 dark:text-stone-100">
            حاسبة القيمة المتوقعة النفسية (Psychological Expected Value)
          </h4>
        </div>
        <span className="text-xs text-stone-500 dark:text-stone-400">
          «كلما هبطت حالتك، ارفع معيار فرصتك»
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* State selection */}
        <div>
          <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 flex items-center gap-1.5">
            <Brain className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span>1. حدد جودة حالتك الذهنية والجسدية الآن:</span>
          </label>
          <div className="space-y-2">
            {(Object.keys(statesInfo) as Array<keyof typeof statesInfo>).map((key) => {
              const info = statesInfo[key];
              const isSelected = mentalState === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMentalState(key)}
                  className={`w-full text-right p-3 rounded-xl border text-xs transition-all flex flex-col gap-1 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/20 text-stone-900 dark:text-stone-100 ring-2 ring-amber-500/30 font-bold'
                      : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 text-stone-600 dark:text-stone-400 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{info.label}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-sm bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">
                      المعيار: {info.recommendedTier}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 font-normal leading-relaxed">
                    {info.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Setup Selection & EV Output */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span>2. ما جودة الصفقة المعروضة على الشارت أمامك؟</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSetupQuality('A_plus')}
                className={`py-2.5 px-3 rounded-lg border text-center text-xs font-bold transition-all ${
                  setupQuality === 'A_plus'
                    ? 'border-emerald-500 bg-emerald-500 text-white shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-emerald-400'
                }`}
              >
                فرصة A+ النادرة
                <span className="block text-[10px] opacity-80 mt-0.5">تطابق الخطة 100%</span>
              </button>
              <button
                type="button"
                onClick={() => setSetupQuality('A')}
                className={`py-2.5 px-3 rounded-lg border text-center text-xs font-bold transition-all ${
                  setupQuality === 'A'
                    ? 'border-blue-500 bg-blue-500 text-white shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-blue-400'
                }`}
              >
                فرصة A قياسية
                <span className="block text-[10px] opacity-80 mt-0.5">شروط متكاملة</span>
              </button>
              <button
                type="button"
                onClick={() => setSetupQuality('B')}
                className={`py-2.5 px-3 rounded-lg border text-center text-xs font-bold transition-all ${
                  setupQuality === 'B'
                    ? 'border-amber-500 bg-amber-500 text-white shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                }`}
              >
                فرصة B متوسطة
                <span className="block text-[10px] opacity-80 mt-0.5">شروط منقوصة / تردد</span>
              </button>
            </div>
          </div>

          {/* EV Calculation Box */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              evResult.status === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-100'
                : evResult.status === 'warning'
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-950 dark:text-amber-100'
                : 'bg-rose-500/10 border-rose-500/40 text-rose-950 dark:text-rose-100'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                {evResult.status === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
                {evResult.status === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
                {evResult.status === 'danger' && <ShieldAlert className="h-4 w-4 text-rose-600 dark:text-rose-400" />}
                {evResult.headline}
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded-full font-bold bg-white/70 dark:bg-stone-900/80 shadow-2xs">
                خطر التيلت: {evResult.tiltRisk}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-xs opacity-75 font-medium">القيمة المتوقعة النفسية الحقيقية:</span>
              <span className="font-mono font-extrabold text-base md:text-lg">{evResult.ev}</span>
            </div>

            <p className="text-xs leading-relaxed opacity-90 border-t border-black/10 dark:border-white/10 pt-2 font-normal">
              {evResult.detail}
            </p>
          </div>
        </div>
      </div>

      {/* Deep Insight Footer */}
      <div className="mt-5 p-3.5 rounded-xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 leading-relaxed flex items-start gap-2.5">
        <ArrowLeft className="h-4 w-4 text-amber-600 shrink-0 mt-0.5 rotate-180" />
        <p>
          <strong>المفارقة النفسية الكبرى:</strong> الضرر الحقيقي للصفقة المتوسطة وأنت متوتر لا يقتصر على الـ $30 التي خسرتها، بل في <strong>تدهور حالتك النفسية</strong> التي ترفع احتمال ارتكاب خطأ انتقامي مضاعف بالصفقة التالية إلى أكثر من 60%!
        </p>
      </div>
    </div>
  );
}
