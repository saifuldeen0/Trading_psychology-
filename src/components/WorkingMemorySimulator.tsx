import { useState } from 'react';
import { Cpu, AlertTriangle, CheckCircle2, RefreshCw, Layers } from 'lucide-react';

export default function WorkingMemorySimulator() {
  const [hasLossDistraction, setHasLossDistraction] = useState<boolean>(false);
  const [hasOverconfidence, setHasOverconfidence] = useState<boolean>(false);

  // Cognitive load calculation
  // Total capacity = 100%
  let analysisLoad = 25;
  let riskLoad = 20;
  let contextLoad = 20;
  let emotionalNoise = 0;

  if (hasLossDistraction) {
    emotionalNoise += 55; // Revenge, regret, loss focus takes over mental RAM
  }
  if (hasOverconfidence) {
    emotionalNoise += 40; // Euphoria, sizing up, invincibility fantasy
  }

  const totalUsed = Math.min(100, analysisLoad + riskLoad + contextLoad + emotionalNoise);
  const freeRam = Math.max(0, 100 - totalUsed);
  const isOverloaded = totalUsed >= 95;

  return (
    <div className="my-8 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-5 md:p-8 dark:border-stone-800/80 dark:bg-stone-900/60 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/60 pb-4 dark:border-stone-800/60">
        <div>
          <span className="text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400">
            محاكاة الذاكرة العاملة (Working Memory)
          </span>
          <h4 className="mt-1 text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            مساحة العمل المؤقتة في دماغ المتداول (RAM الدماغ)
          </h4>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
          سعة استيعاب محدودة
        </span>
      </div>

      <p className="mt-3 text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
        الذاكرة العاملة هي السبورة المؤقتة التي يعالج بها عقلك شروط الدخول والستوب ومستويات السيولة. عندما تقتحم المشاعر عقلك، فإنها تستهلك الذاكرة العاملة وتترك مساحة ضئيلة جداً لمعالجة حركة الشارت:
      </p>

      {/* State Toggle Buttons */}
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setHasLossDistraction(false);
            setHasOverconfidence(false);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            !hasLossDistraction && !hasOverconfidence
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
              : 'bg-white dark:bg-stone-950 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
          }`}
        >
          1. حالة الصفاء الذهني (عقل نقي)
        </button>

        <button
          onClick={() => {
            setHasLossDistraction(true);
            setHasOverconfidence(false);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            hasLossDistraction && !hasOverconfidence
              ? 'bg-red-600 text-white border-red-500 shadow-xs'
              : 'bg-white dark:bg-stone-950 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
          }`}
        >
          2. بعد خسارة مؤلمة (رغبة بالتعويض ولوم)
        </button>

        <button
          onClick={() => {
            setHasLossDistraction(false);
            setHasOverconfidence(true);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            hasOverconfidence && !hasLossDistraction
              ? 'bg-amber-600 text-white border-amber-500 shadow-xs'
              : 'bg-white dark:bg-stone-950 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
          }`}
        >
          3. بعد سلسلة أرباح (حماس مفرط وغرور)
        </button>
      </div>

      {/* Visual Memory Stack (RAM Bar) */}
      <div className="mt-6 p-4 rounded-xl border border-stone-200/70 bg-white dark:border-stone-800/70 dark:bg-stone-950/40">
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="font-bold text-stone-800 dark:text-stone-200">
            توزيع استهلاك الذاكرة العاملة (Working Memory):
          </span>
          <span className={`font-mono font-bold ${isOverloaded ? 'text-red-500' : 'text-emerald-600'}`}>
            المتاح للتفكير: {freeRam}%
          </span>
        </div>

        {/* Stacked Progress Bar */}
        <div className="h-6 w-full rounded-lg overflow-hidden flex bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
          <div style={{ width: `${analysisLoad}%` }} className="bg-blue-500 h-full flex items-center justify-center text-[10px] text-white font-bold" title="التحليل الفني">
            شارت 25%
          </div>
          <div style={{ width: `${riskLoad}%` }} className="bg-emerald-500 h-full flex items-center justify-center text-[10px] text-white font-bold" title="حساب المخاطرة والستوب">
            مخاطرة 20%
          </div>
          <div style={{ width: `${contextLoad}%` }} className="bg-purple-500 h-full flex items-center justify-center text-[10px] text-white font-bold" title="سياق الأخبار والسيولة">
            سياق 20%
          </div>
          {emotionalNoise > 0 && (
            <div style={{ width: `${emotionalNoise}%` }} className="bg-red-500 h-full flex items-center justify-center text-[10px] text-white font-bold animate-pulse" title="الضجيج العاطفي">
              ضجيج المشاعر {emotionalNoise}%
            </div>
          )}
        </div>

        {/* Memory Legend */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span> قراءة الشارت
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> حساب المخاطرة
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-500"></span> سياق الأخبار والسيولة
          </span>
          {emotionalNoise > 0 && (
            <span className="flex items-center gap-1 font-bold text-red-600 dark:text-red-400">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span> استهلاك المشاعر والانتقام
            </span>
          )}
        </div>
      </div>

      {/* Practical Scenario Feedback on Gold (XAUUSD) */}
      <div className="mt-4 p-4 rounded-xl border border-stone-200/70 bg-white dark:border-stone-800/70 dark:bg-stone-950/50">
        <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2 mb-2">
          {isOverloaded ? (
            <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
          )}
          <span>ماذا يحدث فعلياً على شارت الذهب (XAUUSD)؟</span>
        </h5>

        {!hasLossDistraction && !hasOverconfidence ? (
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            السعر وصل للمنطقة، لكن شمعة التأكيد (Confirmation) غائبة. لأن ذاكرتك العاملة خالية من الضجيج، تلاحظ غياب التأكيد فوراً وتقرر بهدوء: <strong>«لا دخول اليوم، الشروط غير مكتملة»</strong>.
          </p>
        ) : hasLossDistraction ? (
          <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">
            السعر وصل للمنطقة دون تأكيد. لكن 55% من ذاكرتك العاملة مشغولة بـ: <em>«ليش خسرت قبل شوي؟ لازم أرجع الـ 20$ حالاً»</em>. النتيجة: يصبح عدم وجود التأكيد تفصيلاً هامشياً مهملاً في عقلك، فتضغط Buy بدافع الاندفاع وتخسر مجدداً!
          </p>
        ) : (
          <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
            ربحت 3 صفقات متتالية. الذاكرة العاملة مزدحمة بنشوة الأرباح: <em>«أنا فهمت السوق أخيراً، اليوم يومي، خليني أرفع حجم اللوت لأحقق قفزة تاريخية!»</em>. النتيجة: تتجاهل مخاطر تقلب الأخبار القادمة وتتعرض لانتكاسة مدمرة.
          </p>
        )}

        <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] font-serif italic text-stone-500 dark:text-stone-400">
          «المشكلة ليست أنك نسيت قواعدك؛ المشكلة أن الحالة العاطفية أصبحت تنافس معلومات الشارت على مساحة انتباهك المحدودة».
        </div>
      </div>
    </div>
  );
}
