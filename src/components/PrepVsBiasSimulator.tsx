import { useState } from 'react';
import { GitCompare, Eye, CheckCircle2, XCircle, ArrowRightLeft, ShieldAlert } from 'lucide-react';

export default function PrepVsBiasSimulator() {
  const [mode, setMode] = useState<'bias' | 'prepared'>('bias');

  return (
    <div className="my-8 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-5 md:p-8 dark:border-stone-800/80 dark:bg-stone-900/60 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/60 pb-4 dark:border-stone-800/60">
        <div>
          <span className="text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400">
            محاكاة سيناريو الذهب (XAUUSD) المباشر
          </span>
          <h4 className="mt-1 text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            فخ الاستعداد الزائد: التحضير المرن مقابل التحيز القاتل
          </h4>
        </div>

        {/* Mode Toggle Button */}
        <div className="flex items-center p-1 rounded-xl bg-stone-200/80 dark:bg-stone-800 text-xs">
          <button
            onClick={() => setMode('bias')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              mode === 'bias'
                ? 'bg-red-600 text-white shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
          >
            المتداول المتحيز (Bias)
          </button>
          <button
            onClick={() => setMode('prepared')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              mode === 'prepared'
                ? 'bg-emerald-600 text-white shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
          >
            المتداول المحضر باحتراف (Preparation)
          </button>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
        <strong>السيناريو:</strong> قبل جلسة نيويورك بساعتين، قمت بتحليل الذهب وتوقعت صعوده بناءً على نموذج دعم وأخبار التضخم. فجأة مع افتتاح الجلسة، ظهرت شمعة هبوطية حمراء قوية كسرت مستوى الدعم بعنف!
      </div>

      {/* Side-by-side or Toggled View */}
      {mode === 'bias' ? (
        <div className="mt-6 space-y-4">
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 dark:bg-red-950/20">
            <div className="flex items-center gap-2 text-xs font-bold text-red-700 dark:text-red-400 mb-2">
              <XCircle className="h-4 w-4" />
              <span>طريقة تفكير المتداول المتحيز (محاولة إجبار السوق على مطابقة تحليله):</span>
            </div>

            <div className="space-y-2.5 text-xs text-stone-700 dark:text-stone-300">
              <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-red-200/50 dark:border-red-900/30 flex items-start gap-2">
                <span className="font-mono text-red-500 font-bold shrink-0">1. الصدمة:</span>
                <span>«لا مستحيل ينزل! هذا مجرد تلاعب بالسيولة (Liquidity Sweep) عشان يخرجونا!».</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-red-200/50 dark:border-red-900/30 flex items-start gap-2">
                <span className="font-mono text-red-500 font-bold shrink-0">2. الإنكار:</span>
                <span>«الهبوط مؤقت والتحليل الأساسي اليوم يدعم الصعود مئة بالمئة.. السعر حتماً سيرتد».</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-red-200/50 dark:border-red-900/30 flex items-start gap-2">
                <span className="font-mono text-red-500 font-bold shrink-0">3. الانتهاك:</span>
                <span>«خليني أوسع وقف الخسارة شوي عشان ما ينضرب.. وممكن أعزز شراء من تحت بسعر أرخص!».</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-red-200/50 dark:border-red-900/30 flex items-start gap-2">
                <span className="font-mono text-red-500 font-bold shrink-0">4. الكارثة:</span>
                <span>يكمل الذهب هبوطه ويضرب الحساب بخسارة -12% بدلاً من خسارة -1% المقررة في الخطة.</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-red-200/60 dark:border-red-900/40 text-[11px] text-red-800 dark:text-red-300 font-serif italic">
              «التحيز حوّل تحضيرك إلى قيد نفسي أعمى يرفض رؤية المعلومات الجديدة التي يقدمها السوق».
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>طريقة تفكير المتداول المحترف المرن (شجرة الاحتمالات IF-THEN):</span>
            </div>

            <div className="space-y-2.5 text-xs text-stone-700 dark:text-stone-300">
              <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-emerald-200/50 dark:border-emerald-900/30 flex items-start gap-2">
                <span className="font-mono text-emerald-600 font-bold shrink-0">1. قبول الواقع:</span>
                <span>«السوق كسر مستوى الدعم بقوة ورفض السيناريو الأول (A). هذه معلومة جديدة ثمينة».</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-emerald-200/50 dark:border-emerald-900/30 flex items-start gap-2">
                <span className="font-mono text-emerald-600 font-bold shrink-0">2. تفعيل الخطة B:</span>
                <span>«خطة الصعود أُلغيت فورياً. إذا أعاد اختبار المستوى كمنطقة مقاومة وأعطى ضعفاً، سأفكر بالبيع (B)».</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-emerald-200/50 dark:border-emerald-900/30 flex items-start gap-2">
                <span className="font-mono text-emerald-600 font-bold shrink-0">3. حياد تام:</span>
                <span>«إذا لم يقدم الشارت شروط الدخول للسيناريو البديل، فلن أفعل شيئاً على الإطلاق اليوم».</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/60 border border-emerald-200/50 dark:border-emerald-900/30 flex items-start gap-2">
                <span className="font-mono text-emerald-600 font-bold shrink-0">4. النتيجة:</span>
                <span>رأس المال محفوظ بنسبة 100%، الجهاز العصبي هادئ، ولا توجد أي إهانة شخصية للأنا!</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-900/40 text-[11px] text-emerald-800 dark:text-emerald-300 font-serif italic">
              «المحترف لا يحتاج أن يتنبأ بما سيحدث؛ بل يعرف ماذا سيفعل بكل دقة مهما كانت حركة السوق».
            </div>
          </div>
        </div>
      )}

      {/* Comparison Rules */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-950/40">
          <strong className="block text-stone-900 dark:text-stone-100 font-bold mb-1">التحضير (Preparation) = مرونة وحماية</strong>
          <p className="text-stone-600 dark:text-stone-400">«هذه هي السيناريوهات المحتملة.. إذا حدث A سأفعل X، وإذا حدث B سأفعل Y، وإذا لم يحدث شيء فلن ألمس الشارت».</p>
        </div>
        <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-950/40">
          <strong className="block text-red-600 dark:text-red-400 font-bold mb-1">التحيز (Bias) = عمى وانتحار مالي</strong>
          <p className="text-stone-600 dark:text-stone-400">«هذا السيناريو حتماً هو الذي سيحدث، وأي حركة ضده هي مؤامرة تلاعب سأقاومها برفع حجم العقود!».</p>
        </div>
      </div>
    </div>
  );
}
