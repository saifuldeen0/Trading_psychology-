import { useState } from 'react';
import { GitFork, ShieldCheck, Scissors, ArrowDown, AlertOctagon, Sparkles, CheckCircle2 } from 'lucide-react';

interface Chain {
  id: string;
  title: string;
  description: string;
  steps: {
    number: number;
    title: string;
    type: 'root' | 'cascade' | 'danger';
    desc: string;
    isCutPoint?: boolean;
  }[];
  cutInsight: string;
}

const CHAINS: Chain[] = [
  {
    id: 'fear',
    title: 'سلسلة الخوف والتردد (The Fear-To-Revenge Cascade)',
    description: 'كيف يتحول الخوف النبيل من الخسارة إلى أسوأ كارثة انتقامية (8 مشاكل في حبل واحد):',
    steps: [
      { number: 1, title: 'الخوف من الخسارة', type: 'root', desc: 'تخوف وقلق أولي من فقدان المال.', isCutPoint: true },
      { number: 2, title: 'التردد في اتخاذ القرار', type: 'cascade', desc: 'الوقوف مشلولاً أمام شمعة التأكيد المكتملة.' },
      { number: 3, title: 'تفويت فرصة الدخول المثالية', type: 'cascade', desc: 'السعر ينطلق بقوة ويحقق الهدف دون أن تكون فيه.' },
      { number: 4, title: 'اشتعال الـ FOMO والغيظ', type: 'cascade', desc: '«الجميع كسب إلا أنا.. السوق يهرب مني!»' },
      { number: 5, title: 'الدخول المتأخر عند القمة', type: 'cascade', desc: 'الشراء الاندفاعي عند نهاية الموجة.' },
      { number: 6, title: 'انعكاس السعر والخسارة', type: 'cascade', desc: 'ضرب الستوب لوس بعد ثوانٍ من الدخول.' },
      { number: 7, title: 'غضب حارق وإحباط', type: 'cascade', desc: '«ليش ترددت بالبداية؟ أنا غبي!»' },
      { number: 8, title: 'التداول الانتقامي (Revenge)', type: 'danger', desc: 'مضاعفة اللوت وتصفير الحساب.' },
    ],
    cutInsight: 'إذا قطعت السلسلة عند الخطوة 1 (الخوف ➔ التردد) عبر إدخال أمر الدخول بنموذج مشروط مسبقاً، تحمي نفسك من المراحل السبع اللاحقة بالكامل دون أن تضطر لمحاربة وحش الانتقام في النهاية!',
  },
  {
    id: 'confidence',
    title: 'سلسلة الثقة المفرطة والغرور (The Overconfidence Trap on Gold)',
    description: 'عندما تبدأ الكارثة بصفقتين رابحتين على الذهب (XAUUSD):',
    steps: [
      { number: 1, title: 'صفقتان رابحتان متتاليتان', type: 'root', desc: 'ربح سريع ومريح في جلسة الصباح.', isCutPoint: true },
      { number: 2, title: 'نشوة وغرور متصاعد', type: 'cascade', desc: '«أنا أفهم خوارزمية الذهب تماماً اليوم!»' },
      { number: 3, title: 'زيادة حجم المخاطرة (Overleveraging)', type: 'cascade', desc: 'مضاعفة اللوت لأنك تشعر أنك معصوم.' },
      { number: 4, title: 'خسارة مفاجئة بشمعة واحدة', type: 'cascade', desc: 'السوق يذكرك بأنه لم يوقع عقداً معك.' },
      { number: 5, title: 'صدمة وإنكار الكبرياء', type: 'cascade', desc: '«مستحيل أخسر.. السوق يعاندني!»' },
      { number: 6, title: 'محاولة استرجاع فورية', type: 'cascade', desc: 'دخول سريع لاسترداد ما خسرته.' },
      { number: 7, title: 'تداول انتقامي مدمر', type: 'danger', desc: 'مسح أرباح أسبوعين كاملين في ساعة واحدة.' },
    ],
    cutInsight: 'المشكلة لم تبدأ عند الخسارة في الخطوة 4! الخسارة كانت مجرد كاشف للخلل؛ الانحراف الحقيقي بدأ عند الخطوة 1 (نشوة الربح ➔ رفع اللوت). بروتوكول التهدئة بعد الربح هو الترياق الحاسم.',
  },
];

export default function SequentialChainBreaker() {
  const [selectedChainId, setSelectedChainId] = useState<'fear' | 'confidence'>('fear');
  const [isCutActive, setIsCutActive] = useState<boolean>(false);

  const currentChain = CHAINS.find((c) => c.id === selectedChainId)!;

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-stone-100 dark:border-stone-800 bg-linear-to-r from-purple-500/10 via-transparent to-red-500/10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              <GitFork className="h-4 w-4" />
              <span>مفكك التسلسل السببي (Sequential Problem Hierarchy)</span>
            </div>
            <h4 className="text-lg md:text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
              أنت لا تملك 8 مشاكل نفسية.. أنت تملك سلسلة واحدة تبدأ بشرارة صغيرة!
            </h4>
          </div>
          <div className="inline-flex rounded-lg bg-stone-100 dark:bg-stone-800 p-1 text-xs font-semibold">
            <button
              onClick={() => { setSelectedChainId('fear'); setIsCutActive(false); }}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                selectedChainId === 'fear'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              سلسلة الخوف والتردد
            </button>
            <button
              onClick={() => { setSelectedChainId('confidence'); setIsCutActive(false); }}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                selectedChainId === 'confidence'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              سلسلة الثقة المفرطة بالذهب
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {currentChain.description}
        </p>

        {/* Chain Flow */}
        <div className="space-y-2.5">
          {currentChain.steps.map((st, idx) => {
            const isBlockedByCut = isCutActive && idx > 0;
            return (
              <div
                key={st.number}
                className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                  isBlockedByCut
                    ? 'opacity-25 bg-stone-100 dark:bg-stone-900 border-stone-200 dark:border-stone-800 line-through'
                    : st.type === 'root'
                    ? 'border-purple-500/50 bg-purple-500/10 dark:bg-purple-500/15'
                    : st.type === 'danger'
                    ? 'border-red-500/50 bg-red-500/10 dark:bg-red-500/15'
                    : 'border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                    st.type === 'root'
                      ? 'bg-purple-600 text-white'
                      : st.type === 'danger'
                      ? 'bg-red-600 text-white'
                      : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {st.number}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-extrabold text-stone-900 dark:text-stone-100">
                      {st.title}
                    </span>
                    {st.isCutPoint && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300">
                        نقطة الحسم والفرملة
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cut Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40">
          <div className="text-xs text-stone-700 dark:text-stone-300">
            <strong>اختبار التدخل المبكر: </strong>
            <span>جرّب قطع السلسلة عند الحلقة الأولى لترى كيف يختفي بقية الوحش:</span>
          </div>
          <button
            onClick={() => setIsCutActive(!isCutActive)}
            className={`px-4 py-2 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs ${
              isCutActive
                ? 'bg-emerald-600 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            <Scissors className="h-4 w-4" />
            <span>{isCutActive ? 'إعادة تشغيل السلسلة' : 'قطع السلسلة عند الحلقة الأولى'}</span>
          </button>
        </div>

        {/* Insight Box */}
        <div className="p-4 md:p-5 rounded-xl border border-purple-500/40 bg-purple-500/10 dark:bg-purple-500/15 flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs md:text-sm font-extrabold text-purple-950 dark:text-purple-200">
              القاعدة الذهبية لتسلسل المشاكل:
            </span>
            <p className="text-xs md:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
              {currentChain.cutInsight}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
