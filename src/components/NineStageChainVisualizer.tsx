import { useState } from 'react';
import { Layers, ShieldAlert, ArrowLeft, CheckCircle2, AlertOctagon, HelpCircle, Activity } from 'lucide-react';

interface Stage {
  id: number;
  label: string;
  name: string;
  example: string;
  effort: string;
  effortScore: number;
  tip: string;
}

const STAGES: Stage[] = [
  {
    id: 1,
    label: 'Trigger',
    name: '1. المحفز الأولي',
    example: 'خسارة صفقة سريعة بـ 30$ على الذهب وصعود السعر مباشرة بعد خروجك.',
    effort: 'جهد المقاومة: 10% (سهل جداً)',
    effortScore: 10,
    tip: 'بمجرد وقوع المحفز، سمّهِ في عقلك: «هذا محفز خروج مبكر، لا علاقة له بالفرصة التالية».',
  },
  {
    id: 2,
    label: 'Thought',
    name: '2. الفكرة والتبرير',
    example: '«السوق أخذ الستوب بسبب سيولة عشوائية.. الاتجاه صاعد ولازم ألحق الحركة!»',
    effort: 'جهد المقاومة: 25% (سهل)',
    effortScore: 25,
    tip: 'اطرح السؤال الحاسم: «هل كنت سأرى هذا المبرر لو لم أخسر الصفقة السابقة؟»',
  },
  {
    id: 3,
    label: 'Emotion',
    name: '3. الشعور والشدة',
    example: 'إحباط 4/10 + استعجال ورغبة بعدم تضييع فرصة الربح.',
    effort: 'جهد المقاومة: 40% (متوسط)',
    effortScore: 40,
    tip: 'سجّل رقم الشدة كتابياً؛ بمجرد كتابة الرقم (4/10) ينخفض نشاط اللوزة الدماغية (Amygdala).',
  },
  {
    id: 4,
    label: 'Physical',
    name: '4. لغة الجسد',
    example: 'شد الماوس بقوة، اقتراب الوجه نحو الشمعة، وتسارع ضربات القلب.',
    effort: 'جهد المقاومة: 55% (متوسط-مرتفع)',
    effortScore: 55,
    tip: 'افلت الماوس فوراً، ارجع للخلف، وخذ 3 أنفاس عميقة لكسر التشنج العضلي.',
  },
  {
    id: 5,
    label: 'Perception',
    name: '5. تغير إدراك الشارت',
    example: 'تبدأ ترى أي شمعة خضراء صغيرة كأنها «انفجار مؤكد» وتتجاهل المقاومة القريبة.',
    effort: 'جهد المقاومة: 70% (صعب)',
    effortScore: 70,
    tip: 'غيّر الفريم إلى فريم الساعة (1H) لترى الصورة الكبرى وتبطل النفق الإدراكي.',
  },
  {
    id: 6,
    label: 'Urge',
    name: '6. الإلحاح السلوكي',
    example: 'ضغط عصبي ملحّ: «اضغط شراء الآن وإلا ستضيع الـ 50 نقطة!»',
    effort: 'جهد المقاومة: 85% (شديد الصعوبة)',
    effortScore: 85,
    tip: 'طبق قاعدة الدقيقة الواحدة: «سأنتظر 60 ثانية قبل الضغط»؛ غالباً تنطفئ النوبة.',
  },
  {
    id: 7,
    label: 'Action',
    name: '7. الفعل الكارثي',
    example: 'الضغط على زر Buy بلوت مضاعف ودون انتظار شمعة إغلاق.',
    effort: 'جهد المقاومة: 95% (شبه مستحيل)',
    effortScore: 95,
    tip: 'هنا حدث السلوك بالفعل؛ التدخل الآن هو عدم إضافة صفقات تعزيز (Averaging Down).',
  },
  {
    id: 8,
    label: 'Result',
    name: '8. النتيجة اللحظية',
    example: 'انعكاس السعر وخسارة -90$ جديدة تعمق الجرح.',
    effort: 'جهد المقاومة: حتمي',
    effortScore: 100,
    tip: 'لا تحاول حل المشكلة الرياضية بمقامرة جديدة.',
  },
  {
    id: 9,
    label: 'New Emotion',
    name: '9. الانفجار العصبي الجديد',
    example: 'غضب 9/10 ورغبة هستيرية بالثأر وتصفير الحساب (Full Tilt).',
    effort: 'إغلاق المنصة بقفل الشاشة',
    effortScore: 100,
    tip: 'أغلق شاشة اللابتوب وغادر المكان كلياً لبقية اليوم دون أي مفاوضات.',
  },
];

export default function NineStageChainVisualizer() {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const currentStage = STAGES[activeStageId - 1];

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-stone-100 dark:border-stone-800 bg-linear-to-r from-purple-500/10 via-transparent to-amber-500/10">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
          <Layers className="h-4 w-4" />
          <span>النموذج السلوكي الشامل المكتمل (9-Stage Master Chain)</span>
        </div>
        <h4 className="text-lg md:text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
          من أول شرارة حتى الانفجار: لماذا المقاومة في البداية أسهل بـ 10 أضعاف؟
        </h4>
        <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 mt-1">
          تنقل بين المراحل التسع لاكتشاف صعوبة المقاومة ونقطة الفرملة الذهبية:
        </p>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Stage Timeline Navigation */}
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5 bg-stone-100 dark:bg-stone-800/60 p-2 rounded-xl">
          {STAGES.map((s) => {
            const isCurrent = s.id === activeStageId;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStageId(s.id)}
                className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-purple-600 text-white font-extrabold shadow-xs scale-105'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                <div className="text-[10px] uppercase font-mono">{s.label}</div>
                <div className="text-xs font-bold">{s.id}</div>
              </button>
            );
          })}
        </div>

        {/* Stage Card View */}
        <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/60 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
            <h5 className="text-base md:text-lg font-black text-stone-900 dark:text-stone-100">
              {currentStage.name}
            </h5>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                currentStage.effortScore <= 30
                  ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                  : currentStage.effortScore <= 60
                  ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300'
                  : 'bg-red-500/20 text-red-800 dark:text-red-300'
              }`}>
                {currentStage.effort}
              </span>
            </div>
          </div>

          {/* Effort Difficulty Meter */}
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
              <span>منحنى صعوبة التدخل الذاتي:</span>
              <span className="font-mono font-bold">{currentStage.effortScore}% صعوبة</span>
            </div>
            <div className="w-full h-3 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  currentStage.effortScore <= 30
                    ? 'bg-emerald-500'
                    : currentStage.effortScore <= 60
                    ? 'bg-amber-500'
                    : 'bg-red-600'
                }`}
                style={{ width: `${currentStage.effortScore}%` }}
              />
            </div>
          </div>

          {/* Scenario description */}
          <div className="p-3.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-xs md:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
            <strong>ما يحدث في الواقع: </strong>
            <span>{currentStage.example}</span>
          </div>

          {/* Intervention Advice */}
          <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs md:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed flex items-start gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong>ترياق هذه المرحلة: </strong>
              <span>{currentStage.tip}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
