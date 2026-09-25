import { useState } from 'react';
import { BookMarked, Copy, Check, MessageSquare, Award, XCircle, CheckCircle2 } from 'lucide-react';

export default function ModernJournalReviewTool() {
  const [tradePair, setTradePair] = useState<string>("XAUUSD (الذهب)");
  const [preConfidence, setPreConfidence] = useState<number>(7);
  const [preStress, setPreStress] = useState<number>(2);
  const [inTradeEmotion, setInTradeEmotion] = useState<string>("هدوء والتزام - راقبت السعر دون لمس الستوب");
  const [postTradeFeeling, setPostTradeFeeling] = useState<string>("تقبل كامل للنتيجة كاحتمال إحصائي طبيعي");
  const [executionQuality, setExecutionQuality] = useState<number>(9);
  const [pnlOutcome, setPnlOutcome] = useState<string>("-1R (خسارة ضمن الخطة)");
  const [copied, setCopied] = useState<boolean>(false);

  const journalEntry = `[تدوينة دفتر التداول الاحترافي - Trading Journal Entry]
• الزوج: ${tradePair}
• الثقة قبل الدخول: ${preConfidence}/10
• التوتر قبل الدخول: ${preStress}/10
• الحالة العاطفية أثناء وجود الصفقة: ${inTradeEmotion}
• الشعور بعد الخروج: ${postTradeFeeling}
• جودة التنفيذ والالتزام بالخطة: ${executionQuality}/10
• النتيجة المالية: ${pnlOutcome}
• تقييم اليوم: التقييم مبني على جودة القرار والتنفيذ، وليس على P&L وحده!`;

  const copyEntry = async () => {
    try {
      await navigator.clipboard.writeText(journalEntry);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="my-8 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-5 md:p-8 dark:border-stone-800/80 dark:bg-stone-900/60 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/60 pb-4 dark:border-stone-800/60">
        <div>
          <span className="text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400">
            أداة دفتر التداول والمراجعة المتقدمة
          </span>
          <h4 className="mt-1 text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <BookMarked className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            المراجعة الرياضية (Review) بدلاً من جلسة محاكمة الذات
          </h4>
        </div>

        <button
          onClick={copyEntry}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'تم نسخ التدوينة!' : 'نسخ لدفتر التداول'}</span>
        </button>
      </div>

      {/* Comparison: Bad Review vs. Good Review */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/5 dark:bg-red-950/20">
          <div className="flex items-center gap-1.5 font-bold text-red-700 dark:text-red-400 mb-2">
            <XCircle className="h-4 w-4 shrink-0" />
            <span>المراجعة السيئة (محكمة وجلد ذات غاضب):</span>
          </div>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed italic">
            «ليش دخلت؟ أنا غبي! الشارت كان واضح.. دائماً أخرب حسابي.. ما راح أنجح أبداً.. لازم أعوض بكرة غصباً عن السوق!»
          </p>
          <span className="text-[10px] text-red-600 dark:text-red-400 mt-2 block font-medium">
            ➔ النتيجة: تدمير الثقة، شحن الذاكرة العاملة بالغضب، والدخول غداً بضغط عصبي هائل.
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20">
          <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 mb-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>المراجعة الاحترافية (تشخيص رياضي موضوعي):</span>
          </div>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed italic">
            «ماذا حدث؟ ماذا كنت أعرف لحظة القرار؟ ماذا كنت أشعر؟ هل التزمت بالخطة؟ إذا لم ألتزم، هل الخلل في التحليل أم في إدارة المخاطر أم في استثارتي؟»
          </p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-2 block font-medium">
            ➔ النتيجة: بيانات عملية قابلة للتطوير واستشفاء عصبي كامل قبل الجلسة القادمة.
          </span>
        </div>
      </div>

      {/* Interactive Journal Builder Form */}
      <div className="mt-6 p-4 rounded-xl border border-stone-200/70 bg-white dark:border-stone-800/70 dark:bg-stone-950/40 space-y-3">
        <h5 className="font-bold text-xs text-stone-800 dark:text-stone-200">
          سجل مشاعرك الآن لتفريغ الذاكرة العاملة (Cognitive Defusion):
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-stone-500 dark:text-stone-400 mb-1">الزوج أو الأداة المالية:</label>
            <input
              type="text"
              value={tradePair}
              onChange={(e) => setTradePair(e.target.value)}
              className="w-full p-2 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
            />
          </div>

          <div>
            <label className="block text-stone-500 dark:text-stone-400 mb-1">النتيجة المالية:</label>
            <input
              type="text"
              value={pnlOutcome}
              onChange={(e) => setPnlOutcome(e.target.value)}
              className="w-full p-2 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <div className="flex justify-between mb-1 text-[11px] font-medium">
              <span>الثقة قبل الدخول:</span>
              <span className="font-mono font-bold">{preConfidence}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={preConfidence}
              onChange={(e) => setPreConfidence(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1 text-[11px] font-medium">
              <span>التوتر قبل الدخول:</span>
              <span className="font-mono font-bold">{preStress}/10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={preStress}
              onChange={(e) => setPreStress(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1 text-[11px] font-medium">
              <span>جودة التنفيذ والالتزام:</span>
              <span className="font-mono font-bold text-emerald-600">{executionQuality}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={executionQuality}
              onChange={(e) => setExecutionQuality(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>
        </div>

        <div className="text-xs">
          <label className="block text-stone-500 dark:text-stone-400 mb-1">
            أفرغ ما يدور في رأسك الآن بكلمات مكتوبة (بدل التفكير فيه بالداخل):
          </label>
          <textarea
            rows={2}
            value={inTradeEmotion}
            onChange={(e) => setInTradeEmotion(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
          />
        </div>
      </div>
    </div>
  );
}
