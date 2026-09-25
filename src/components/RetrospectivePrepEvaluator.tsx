import { useState } from 'react';
import { ClipboardCheck, Sparkles, AlertCircle, CheckCircle2, RotateCcw, HelpCircle } from 'lucide-react';

interface PrepItem {
  id: string;
  name: string;
  prepAction: string;
  postQuestion: string;
  confirmedHelpful: boolean | null;
}

export default function RetrospectivePrepEvaluator() {
  const [items, setItems] = useState<PrepItem[]>([
    {
      id: 'sleep',
      name: 'جودة ومدة النوم (8 ساعات)',
      prepAction: 'نمت 8 ساعات مستمرة واستيقظت منتعشاً.',
      postQuestion: 'هل ساعدك النوم الجيد فعلياً أثناء الجلسة على قراءة أدق للشارت وتجنب التسرع؟',
      confirmedHelpful: null,
    },
    {
      id: 'workout',
      name: 'الرياضة الصباحية / المشي',
      prepAction: 'مارست الرياضة لمدة 30 دقيقة قبل فتح الشارت.',
      postQuestion: 'هل لاحظت فرقاً ملموساً في هدوئك وتفريغ التوتر العضلي عند تقلب الأسعار؟',
      confirmedHelpful: null,
    },
    {
      id: 'news',
      name: 'مراجعة المفكرة الاقتصادية',
      prepAction: 'حددت مواعيد بيانات التضخم ومؤشر مديري المشتريات.',
      postQuestion: 'هل حماك ذلك من فتح صفقات عشوائية وقت صدور الأخبار المفاجئة؟',
      confirmedHelpful: null,
    },
    {
      id: 'breathe',
      name: 'تمرين التنفس والتأمل',
      prepAction: 'قمت بـ 5 دقائق تنفس هادئ لتهدئة النبض.',
      postQuestion: 'هل ساعدك ذلك على تجنب الدخول الاندفاعي عند تحرك شمعة الذهب السريعة؟',
      confirmedHelpful: null,
    },
  ]);

  const setAnswer = (id: string, val: boolean) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, confirmedHelpful: val } : item))
    );
  };

  const answeredCount = items.filter((i) => i.confirmedHelpful !== null).length;
  const helpfulCount = items.filter((i) => i.confirmedHelpful === true).length;

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-stone-100 dark:border-stone-800 bg-linear-to-r from-blue-500/10 via-transparent to-emerald-500/10">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          <ClipboardCheck className="h-4 w-4" />
          <span>مقيّم التحضير بأثر رجعي (Retrospective Prep Evaluator)</span>
        </div>
        <h4 className="text-lg md:text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
          قيّم تحضيرك بعد انتهاء الجلسة بناءً على السلوك الفعلي.. لا قبلها!
        </h4>
        <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 mt-1">
          حول طقوس الصباح إلى «فرضيات علمية قابلة للاختبار» للتأكد مما ينعكس حقاً على صفقاتك:
        </p>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/50 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm font-bold text-stone-900 dark:text-stone-100">
                  {item.name}
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                  الطقس: {item.prepAction}
                </span>
              </div>

              <p className="text-xs md:text-sm text-stone-700 dark:text-stone-300 font-medium">
                {item.postQuestion}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setAnswer(item.id, true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    item.confirmedHelpful === true
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>نعم، أحدث فارقاً ملموساً</span>
                </button>
                <button
                  onClick={() => setAnswer(item.id, false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    item.confirmedHelpful === false
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300'
                  }`}
                >
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>لم ألحظ أثراً حقيقياً اليوم</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Retrospective Insight */}
        {answeredCount > 0 && (
          <div className="p-4 md:p-5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-500/15 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm font-extrabold text-emerald-950 dark:text-emerald-200">
                الحصاد الإدراكي بعد الجلسة:
              </span>
              <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
                {helpfulCount} من أصل {answeredCount} عادات أثبتت جدواها السلوكية
              </span>
            </div>
            <p className="text-xs md:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              هكذا تحرر نفسك من الطقوس الوهمية! لا تحافظ على عادة صباحية لمجرد أن مدرباً قال إنها مهمة؛ احتفظ فقط بالعناصر التي تثبت مفكرتك اليومية أنها تقلل قراراتك المندفعة وتزيد صفاء ذهنك أثناء حركة السوق.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
