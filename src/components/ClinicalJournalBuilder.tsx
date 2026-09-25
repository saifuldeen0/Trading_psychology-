import { useState } from 'react';
import { BookOpen, Copy, Check, FileText, ArrowRightLeft, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ClinicalJournalBuilder() {
  const [viewMode, setViewMode] = useState<'compare' | 'template'>('compare');
  const [isCopied, setIsCopied] = useState(false);

  const clinicalTemplateText = `[سجل التشخيص السريري اليومي للصفقة]
1. القاعدة الفنية: لا أدخل شمعة الذهب إلا بعد إغلاق واضح فوق مستوى السيولة.
2. المحفز (Trigger): خسارة سابقة بـ $35 على صفقة بيع ارتدت فجأة.
3. الفكرة (Thought): «لازم أعوض الـ 35$ الآن قبل ما يغلق السوق».
4. الشعور والشدة (Emotion): غضب وإحباط بنسبة 5/10.
5. لغة الجسد (Physical Tell): شد الماوس بقوة وتشنج الرقبة.
6. تغير الإدراك (Perception Shift): بدأت أرى أي شمعة هابطة صغيرة كأنها انفجار سعري هابط مؤكد!
7. الإلحاح (Urge): رغبة ملحة بفتح اللوت واللحاق بالحركة.
8. الفعل التنفيذي (Action): الضغط على Sell قبل اكتمال شمعة الإغلاق بـ 4 دقائق.
9. النتيجة المالية (Result): خسارة -$40 إضافية.
10. التشخيص الجذري (Root Diagnosis): خرق القاعدة لم يكن ضعف انضباط عادي، بل كان تداولاً انتقامياً (Revenge) مشحوناً بالـ FOMO.
ترياق الجلسة القادمة: تطبيق فترة التبريد لـ 15 دقيقة بعد أي خسارة.`;

  const copyTemplate = () => {
    navigator.clipboard.writeText(clinicalTemplateText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-stone-100 dark:border-stone-800 bg-linear-to-r from-emerald-500/10 via-transparent to-amber-500/10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <FileText className="h-4 w-4" />
              <span>نموذج المفكرة السريرية (Clinical Journal Template)</span>
            </div>
            <h4 className="text-lg md:text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
              تحويل المفكرة من «سجل حسابات أعمى» إلى «أداة تشخيص سريرية لسلوكك»
            </h4>
          </div>
          <div className="inline-flex rounded-lg bg-stone-100 dark:bg-stone-800 p-1 text-xs font-semibold">
            <button
              onClick={() => setViewMode('compare')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === 'compare'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              مقارنة الطريقتين
            </button>
            <button
              onClick={() => setViewMode('template')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === 'template'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              القالب السريري المكتمل
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {viewMode === 'compare' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Old Way */}
            <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/5 dark:bg-red-500/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                1. دفتر الحسابات التقليدي (السطحي):
              </span>
              <div className="p-3 rounded-lg bg-white/70 dark:bg-stone-900/60 font-mono text-xs text-stone-700 dark:text-stone-300 space-y-1 leading-relaxed">
                <div>• الصفقة: Sell XAUUSD</div>
                <div>• اللوت: 0.10</div>
                <div>• النتيجة: -$40</div>
                <div>• الملاحظة: «اليوم كنت غير منضبط ودخلت مبكراً».</div>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                <strong>الخلل:</strong> هذا السجل يخبرك بالنتيجة فقط («أنا سيء»)، لكنه لا يخبرك متى بدأ الخلل ولا كيف تتجنبه غداً!
              </p>
            </div>

            {/* New Clinical Way */}
            <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                2. المفكرة السريرية الاحترافية (العشر نقاط):
              </span>
              <div className="p-3 rounded-lg bg-white/70 dark:bg-stone-900/60 text-xs text-stone-800 dark:text-stone-200 space-y-1 leading-relaxed">
                <div>• <strong>المحفز:</strong> خسارة سابقة بـ $35.</div>
                <div>• <strong>الفكرة:</strong> «لازم أعوض الآن».</div>
                <div>• <strong>الشعور:</strong> غضب 5/10.</div>
                <div>• <strong>لغة الجسد:</strong> شد الماوس بقوة.</div>
                <div>• <strong>الإدراك:</strong> رأيت أي نزول كفرصة sell مؤكدة.</div>
                <div>• <strong>التشخيص الحقيقي:</strong> رغبة تعويض وانتقام وليست مجرد خرق للقواعد!</div>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                <strong>الفائدة:</strong> يمنحك نقطة تدخل صريحة: «في المرة القادمة، عندما أجد نفسي أقول لازم أعوض وأشد الماوس، سأغلق الشاشة 15 دقيقة».
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 font-mono text-xs text-stone-800 dark:text-stone-200 whitespace-pre-wrap leading-relaxed">
              {clinicalTemplateText}
            </div>

            <div className="flex justify-end">
              <button
                onClick={copyTemplate}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{isCopied ? 'تم نسخ القالب!' : 'نسخ القالب لاستخدامه في مفكرتك'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
