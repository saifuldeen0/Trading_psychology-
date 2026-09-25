import { useState } from 'react';
import { Grid, CheckCircle2, AlertOctagon, HelpCircle, ShieldCheck, Skull, DollarSign } from 'lucide-react';

export default function DecisionOutcomeMatrix() {
  const [followedPlan, setFollowedPlan] = useState<boolean>(true);
  const [outcome, setOutcome] = useState<'win' | 'loss'>('loss');

  // Matrix quadrant determine
  // Q1: Good Decision + Win
  // Q2: Good Decision + Loss
  // Q3: Bad Decision + Win
  // Q4: Bad Decision + Loss
  let quadrant = 1;
  if (followedPlan && outcome === 'win') quadrant = 1;
  if (followedPlan && outcome === 'loss') quadrant = 2;
  if (!followedPlan && outcome === 'win') quadrant = 3;
  if (!followedPlan && outcome === 'loss') quadrant = 4;

  return (
    <div className="my-8 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-5 md:p-8 dark:border-stone-800/80 dark:bg-stone-900/60 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/60 pb-4 dark:border-stone-800/60">
        <div>
          <span className="text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400">
            مصفوفة تقييم الصفقات الاحترافية
          </span>
          <h4 className="mt-1 text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Grid className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            افصل بين «صفقة خاسرة» و«قرار سيئ»: مصفوفة القرار مقابل النتيجة
          </h4>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
          Process over Outcome
        </span>
      </div>

      <p className="mt-3 text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
        النتيجة المالية وحدها لا تحكم على جودة المتداول. في أنظمة الاحتمالات، قد تتخذ قراراً ممتازاً وتخسر، أو تتخذ قراراً أحمق وتربح بالصدفة. جرب تدقيق أي صفقة:
      </p>

      {/* Trade Audit Inputs */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-white dark:bg-stone-950/40 border border-stone-200/70 dark:border-stone-800/70">
        <div>
          <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
            1. هل التزمت بالخطة وشروط النموذج وإدارة المخاطر؟
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setFollowedPlan(true)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                followedPlan
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'
              }`}
            >
              نعم، التزام كامل بالخطة (قرار ممتاز)
            </button>
            <button
              onClick={() => setFollowedPlan(false)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                !followedPlan
                  ? 'bg-red-600 text-white border-red-500 shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'
              }`}
            >
              لا، خالفت القواعد (قرار سيئ)
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
            2. ما هي النتيجة المالية للصفقة؟
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setOutcome('win')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                outcome === 'win'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'
              }`}
            >
              رابحة (+Profit)
            </button>
            <button
              onClick={() => setOutcome('loss')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                outcome === 'loss'
                  ? 'bg-amber-600 text-white border-amber-500 shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'
              }`}
            >
              خاسرة (-Stop Loss)
            </button>
          </div>
        </div>
      </div>

      {/* 2x2 Visual Matrix */}
      <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
        {/* Q1 */}
        <div className={`p-4 rounded-xl border transition-all ${
          quadrant === 1
            ? 'border-emerald-500 bg-emerald-500/15 dark:bg-emerald-950/40 shadow-sm ring-2 ring-emerald-500/50'
            : 'border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-950/20 opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-1.5 font-bold text-emerald-800 dark:text-emerald-300">
            <span>قرار ممتاز + ربح</span>
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="font-semibold text-stone-800 dark:text-stone-200 mb-1">النجاح المستدام الحقيقي</div>
          <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
            العملية صحيحة والسوق توافق معك. احتفظ بالهدوء ولا تدع الحماس يرفع حجم اللوت في الصفقة التالية.
          </p>
        </div>

        {/* Q2 */}
        <div className={`p-4 rounded-xl border transition-all ${
          quadrant === 2
            ? 'border-blue-500 bg-blue-500/15 dark:bg-blue-950/40 shadow-sm ring-2 ring-blue-500/50'
            : 'border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-950/20 opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-1.5 font-bold text-blue-800 dark:text-blue-300">
            <span>قرار ممتاز + خسارة</span>
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div className="font-semibold text-stone-800 dark:text-stone-200 mb-1">خسارة احترافية صحية</div>
          <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
            ليست خطأ تداولياً على الإطلاق! هي مجرد تكلفة تشغيل طبيعية في نموذج احتمالي. كافئ نفسك على الالتزام بالستوب!
          </p>
        </div>

        {/* Q3 */}
        <div className={`p-4 rounded-xl border transition-all ${
          quadrant === 3
            ? 'border-red-500 bg-red-500/15 dark:bg-red-950/40 shadow-sm ring-2 ring-red-500/50'
            : 'border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-950/20 opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-1.5 font-bold text-red-800 dark:text-red-300">
            <span>قرار سيئ + ربح</span>
            <Skull className="h-4 w-4" />
          </div>
          <div className="font-semibold text-red-900 dark:text-red-200 mb-1">فخ السم في العسل (أخطر صفقة!)</div>
          <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
            أخطر نتيجة يمكن أن تحدث! لأن عقلك يتعلم أن مخالفة الخطة تعطي ربحاً. ستكررها حتماً وستدمر حسابك لاحقاً.
          </p>
        </div>

        {/* Q4 */}
        <div className={`p-4 rounded-xl border transition-all ${
          quadrant === 4
            ? 'border-amber-500 bg-amber-500/15 dark:bg-amber-950/40 shadow-sm ring-2 ring-amber-500/50'
            : 'border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-950/20 opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-1.5 font-bold text-amber-800 dark:text-amber-300">
            <span>قرار سيئ + خسارة</span>
            <AlertOctagon className="h-4 w-4" />
          </div>
          <div className="font-semibold text-stone-800 dark:text-stone-200 mb-1">عقاب منطقي للمخالفة</div>
          <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
            الخسارة هنا مستحقة بسبب التسرع أو غياب النموذج. أوقف التداول فوراً وراجع أسباب كسر قواعدك.
          </p>
        </div>
      </div>

      {/* Dynamic Coaching Verdict */}
      <div className="mt-4 p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/60 text-xs leading-relaxed text-stone-800 dark:text-stone-200">
        <strong className="block mb-1 font-bold text-amber-800 dark:text-amber-300">
          خلاصة تدقيق الصفقة:
        </strong>
        {quadrant === 2 && (
          <span>
            لا تجلد ذاتك ولا تقل «تحليلي فاشل»! أنت نفذت الصفقة باحتراف، وخروجك على الستوب هو دليل انضباط وليس فشلاً. إذا عاقبت نفسك هنا، فأنت تدمر ثقتك بنظام رابح إحصائياً.
          </span>
        )}
        {quadrant === 3 && (
          <span>
            لا تحتفل بهذا الربح إطلاقاً! هذا الربح مسموم ومخادع. لقد دخلت دون استيفاء الشروط أو غامرت بحجم لوت مضاعف. اعترافك بالخطأ الآن هو ما سيحميك من تصفير الحساب في المرة القادمة.
          </span>
        )}
        {quadrant === 1 && (
          <span>
            يوم تداول نموذجي. خذ استراحة واستمر بنفس الانضباط دون الانزلاق إلى الثقة المفرطة (Overconfidence).
          </span>
        )}
        {quadrant === 4 && (
          <span>
            استراحة إجبارية لمدة ساعتين أو إغلاق الشاشة لبقية اليوم. لقد دخلت تحت تأثير المشاعر ودفع السوق الثمن.
          </span>
        )}
      </div>
    </div>
  );
}
