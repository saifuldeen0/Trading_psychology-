import { useState } from 'react';
import { Eye, Glasses, ArrowRightLeft, AlertTriangle, CheckCircle2, HelpCircle, Flame } from 'lucide-react';

export default function PerceptionShiftLens() {
  const [activeLens, setActiveLens] = useState<'neutral' | 'emotional'>('neutral');

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-stone-100 dark:border-stone-800 bg-linear-to-r from-amber-500/10 via-transparent to-red-500/10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Eye className="h-4 w-4" />
              <span>محاكي تحول الإدراك (Perception Shift Lens)</span>
            </div>
            <h4 className="text-lg md:text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
              كيف يغيّر الغضب والـ FOMO تفسيرك لنفس الشمعة الفنية على الذهب؟
            </h4>
          </div>
          <div className="inline-flex rounded-lg bg-stone-100 dark:bg-stone-800 p-1 text-xs font-semibold">
            <button
              onClick={() => setActiveLens('neutral')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeLens === 'neutral'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Glasses className="h-3.5 w-3.5" />
              <span>العدسة المحايدة (قبل الخسارة)</span>
            </button>
            <button
              onClick={() => setActiveLens('emotional')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeLens === 'emotional'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              <span>العدسة المنفعلة (بعد خسارة $50)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Mock Chart Scenario */}
        <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/60">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
            <span className="font-mono font-bold">XAUUSD · فريم 15 دقيقة</span>
            <span>السيناريو: حركة صاعدة سريعة 40 نقطة واقتراب من مقاومة يومية</span>
          </div>

          {/* Graphical Mock Candlestick preview */}
          <div className="h-32 flex items-center justify-center gap-4 border border-dashed border-stone-300 dark:border-stone-700 rounded-lg bg-white/50 dark:bg-stone-900/50 p-4">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-stone-400">شمعة 1</span>
              <div className="w-3 h-12 bg-red-500 rounded-xs my-1 relative before:content-[''] before:w-0.5 before:h-16 before:bg-red-500 before:absolute before:left-1.5 before:-top-2"></div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-stone-400">شمعة 2</span>
              <div className="w-3 h-8 bg-red-400 rounded-xs my-1 relative before:content-[''] before:w-0.5 before:h-12 before:bg-red-400 before:absolute before:left-1.5 before:-top-2"></div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">شمعة الاختبار الحالية</span>
              <div className="w-3.5 h-10 bg-emerald-500 rounded-xs my-1 relative before:content-[''] before:w-0.5 before:h-16 before:bg-emerald-500 before:absolute before:left-1.5 before:-top-3 ring-2 ring-amber-400/80 ring-offset-2"></div>
            </div>
            <div className="border-r border-stone-300 dark:border-stone-700 h-20 mx-2"></div>
            <div className="text-right text-xs space-y-1">
              <div className="text-stone-500 dark:text-stone-400">مستوى المقاومة: <strong className="font-mono text-stone-800 dark:text-stone-200">2,654.50</strong></div>
              <div className="text-stone-500 dark:text-stone-400">السعر اللحظي: <strong className="font-mono text-stone-800 dark:text-stone-200">2,652.80</strong></div>
              <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">شمعة خضراء صغيرة لم تغلق بعد</div>
            </div>
          </div>
        </div>

        {/* Lens Comparison View */}
        <div className="transition-all duration-300">
          {activeLens === 'neutral' ? (
            <div className="p-5 rounded-xl border border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>تفسير العقل المحايد (قبل الخسارة والتوتر):</span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-200">
                  البحث عن ميزة إحصائية
                </span>
              </div>

              <div className="space-y-2 text-xs md:text-sm text-stone-700 dark:text-stone-300">
                <p>• <strong>ما يراه العقل:</strong> «الاتجاه العام اليوم متذبذب، السعر يقترب من مقاومة قوية، والشمعة الخضراء لم تغلق بعد ولا تملك حجماً كافياً».</p>
                <p>• <strong>السؤال الداخلي:</strong> «هل توجد هنا ميزة واضحة وشمعة تأكيد تبرر المخاطرة برأس مالي؟»</p>
                <p>• <strong>القرار الاحترافي:</strong> «لا دخول الآن.. الانتظار حتى تغلق الشمعة فوق المقاومة أو يظهر نموذج انعكاسي هابط واضح».</p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 text-xs text-emerald-900 dark:text-emerald-200 font-medium">
                النتيجة: حماية رأس المال، هدوء عصبي، وعدم الانجرار خلف الحركات الوهمية.
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-xl border border-red-500/40 bg-red-500/5 dark:bg-red-500/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-red-700 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  <span>تفسير العقل المنفعل (بعد خسارة $50 أو تفويت حركة):</span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-800 dark:text-red-200">
                  البحث عن حل لمشكلة عاطفية
                </span>
              </div>

              <div className="space-y-2 text-xs md:text-sm text-stone-700 dark:text-stone-300">
                <p>• <strong>ما يراه العقل المنفعل:</strong> «مستحيل الذهب يكمل هبوط! هذه الشمعة الخضراء هي الانفجار للأعلى.. الذهب قوي جداً، إذا انتظرت إغلاق الشمعة ستضيع الفرصة!»</p>
                <p>• <strong>السؤال الداخلي الحقيقي:</strong> «أين الصفقة التي سأستعيد بها الـ 50$ التي خسرتها قبل قليل حتى أزيل هذا الإحباط من صدري؟»</p>
                <p>• <strong>التبريرات المنطقية المزيفة:</strong> «أكيد أكو سيولة تحت القاع.. الاتجاه صاعد على الديلي.. سأدخل الآن بلوت 2x وأضع ستوب قريب».</p>
              </div>

              <div className="p-3 rounded-lg bg-red-500/10 text-xs text-red-900 dark:text-red-200 font-bold">
                النتيجة الكارثية: شراء في قمة الشمعة أسفل المقاومة مباشرة، ارتداد السعر، وتكبد خسارة ثانية -120$!
              </div>
            </div>
          )}
        </div>

        {/* The Golden Journal Question */}
        <div className="p-4 md:p-5 rounded-xl border border-amber-500/40 bg-amber-500/10 dark:bg-amber-500/15">
          <div className="flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs md:text-sm font-extrabold text-amber-900 dark:text-amber-200">
                السؤال الذهبي في دفتر التداول (The Golden Journal Filter):
              </span>
              <p className="text-xs md:text-sm text-stone-800 dark:text-stone-200 font-bold leading-relaxed">
                «هل كنت سأحلل هذه الشمعة وأقرر الدخول فيها بنفس الطريقة تماماً لو لم أخسر الصفقة السابقة؟»
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-normal">
                إذا كانت الإجابة «لا»، فأنت لا تتداول الشارت، بل تتداول مشاعرك وجرح كبريائك!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
