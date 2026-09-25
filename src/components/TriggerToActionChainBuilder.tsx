import { useState } from 'react';
import { GitCommit, ArrowLeft, ShieldAlert, Sparkles, AlertOctagon, CheckCircle2, Zap } from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  trigger: string;
  thought: string;
  emotion: string;
  urge: string;
  action: string;
  result: string;
  interception: string;
}

const PRESETS: Preset[] = [
  {
    id: 'p1',
    name: 'ارتداد السعر قرب الهدف (Near TP Reverse)',
    trigger: 'شمعة الذهب عكست قبل الـ Take Profit بنقطتين فقط وضربت نقطة الدخول (Breakeven)',
    thought: '«السوق سرق ربحي وضيع تعبي! كان معي 120$ وراحت بلمحة بصر»',
    emotion: 'غضب حارق + إحباط عميق (7/10)',
    urge: '«لازم أدخل فوراً واستعيد هذا الربح الضائع قبل أن يغلق اليوم»',
    action: 'دخول شراء فوري بدون أي شمعة تأكيد وبحجم لوت مضاعف',
    result: 'انعكاس مباشر وخسارة حقيقية -2R بدلاً من صفقة محايدة',
    interception: 'الفرملة عند الفكرة: التذكير بأن «الربح غير المحقق ليس ملكي، والسوق لا يدين لي بأي شيء». إغلاق الشاشة 15 دقيقة.',
  },
  {
    id: 'p2',
    name: 'رؤية أرباح الآخرين (Social Media FOMO)',
    trigger: 'مشاهدة لقطة شاشة لمتداول في تلغرام ربح 2,000$ من هبوط مفاجئ في الباوند',
    thought: '«الجميع يكسب أموالاً طائلة وأنا جالس أراقب كالأحمق! الفرص تفوتني»',
    emotion: 'حسد خفي + خوف ملح من فوات الفرصة (FOMO 9/10)',
    urge: '«ابحث عن أي حركة سريعة الآن وادخل معها فوراً»',
    action: 'البيع عند أدنى قاع الشمعة الهابطة دون انتظار تصحيح',
    result: 'الشراء في القاع أو البيع في القاع، ارتداد السعر في وجهك وخسارة فورية',
    interception: 'الفرملة عند المحفز (Trigger): كتم قنوات وإشعارات التداول أثناء الجلسة. أرباح الآخرين لا علاقة لها بخطتك.',
  },
  {
    id: 'p3',
    name: 'نشوة سلسلة الأرباح (God Complex / Overconfidence)',
    trigger: 'تحقيق 4 صفقات رابحة متتالية بربح +8% خلال يومين فقط',
    thought: '«أنا أقرأ السوق مثل كتاب مفتوح.. اليوم مستحيل أخسر!»',
    emotion: 'نشوة وغرور وارتفاع هائل في الدوبامين (استثارة مفرطة 9/10)',
    urge: '«لماذا أخاطر بـ 1% فقط؟ سأضع لوت 5% وأضاعف الحساب هذا الأسبوع»',
    action: 'تجاهل الستوب لوس المعتاد والدخول بلوت ضخم على صفقة غير مثالية',
    result: 'صفقة واحدة خاسرة تمسح جميع أرباح الأيام السابقة وتتركك في صدمة',
    interception: 'الفرملة عند الشعور: تفعيل بروتوكول «فترة التهدئة بعد الربح». بعد 3 أرباح متتالية، يُمنع زيادة اللوت نهائياً.',
  },
  {
    id: 'p4',
    name: 'ضغط نهاية اليوم (20 دقيقة قبل إغلاق السوق)',
    trigger: 'الساعة 4:40 عصراً والحساب خاسر -40$ فقط عن اليوم',
    thought: '«مستحيل أطلع من السوق اليوم خاسر! لازم أحول اليوم إلى أخضر»',
    emotion: 'توتر وضيق واختناق زمني',
    urge: '«افتح أي صفقة سريعة على فريم الدقيقة 1m للتعويض قبل الإغلاق»',
    action: 'تداول عشوائي سريع (Scalping عاطفي) بدون نموذج فني',
    result: 'تحول الخسارة الصغيرة (-40$) إلى كارثة (-350$) وتدمير الحساب',
    interception: 'الفرملة عند الفكرة: إدراك أن «أفضل صفقة في اليوم هي قبول الـ -40$ وإغلاق المنصة برأس مرفوع وانضباط 10/10».',
  },
];

export default function TriggerToActionChainBuilder() {
  const [selectedPreset, setSelectedPreset] = useState<Preset>(PRESETS[0]);
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    { title: '1. المحفز (Trigger)', text: selectedPreset.trigger, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
    { title: '2. الفكرة الأولى (Thought)', text: selectedPreset.thought, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
    { title: '3. الشعور الجسدي (Emotion)', text: selectedPreset.emotion, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' },
    { title: '4. الإلحاح السلوكي (Urge)', text: selectedPreset.urge, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30' },
    { title: '5. الفعل الكارثي (Action)', text: selectedPreset.action, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
    { title: '6. النتيجة والندم (Result)', text: selectedPreset.result, color: 'text-stone-900 dark:text-stone-100', bg: 'bg-stone-200/50 dark:bg-stone-800/50 border-stone-300 dark:border-stone-700' },
  ];

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-stone-100 dark:border-stone-800 bg-linear-to-r from-purple-500/10 via-transparent to-red-500/10">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
          <GitCommit className="h-4 w-4" />
          <span>مفكك السلسلة السلوكية الإدراكية (Cognitive Chain Deconstructor)</span>
        </div>
        <h4 className="text-lg md:text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
          المحفز ➔ الفكرة ➔ الشعور ➔ الإلحاح ➔ السلوك
        </h4>
        <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 mt-1">
          التداول الانتقامي (Revenge Trading) ليس زراً يُضغط فجأة؛ هناك سلسلة محكمة تقود إليه. اكتشف كيف تفككها:
        </p>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-stone-500 dark:text-stone-400 shrink-0">
            اختر سيناريو واقعي:
          </span>
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPreset(p);
                setActiveStep(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedPreset.id === p.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Chain Flow */}
        <div className="space-y-3">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${st.bg} ${
                activeStep === idx ? 'ring-2 ring-purple-500 shadow-md scale-[1.01]' : 'opacity-90'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-extrabold ${st.color}`}>
                  {st.title}
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  المرحلة {idx + 1} من 6
                </span>
              </div>
              <p className="text-xs md:text-sm font-medium text-stone-800 dark:text-stone-200 mt-1 leading-relaxed">
                {st.text}
              </p>
            </div>
          ))}
        </div>

        {/* Golden Interception Point Box */}
        <div className="p-4 md:p-5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-500/15">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs md:text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
                فرامل الطوارئ الذهبية (The Golden Interception Point):
              </span>
              <p className="text-xs md:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                {selectedPreset.interception}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
