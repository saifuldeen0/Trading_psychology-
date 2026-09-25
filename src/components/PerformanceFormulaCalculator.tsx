import { useState, useId } from 'react';
import { Calculator, Zap, Moon, Brain, ShieldAlert, Award } from 'lucide-react';

export default function PerformanceFormulaCalculator() {
  const [skill, setSkill] = useState<number>(90);
  const [mental, setMental] = useState<number>(40);
  const [physical, setPhysical] = useState<number>(50);
  const [execution, setExecution] = useState<number>(75);

  const skillId = useId();
  const mentalId = useId();
  const physicalId = useId();
  const executionId = useId();

  // Normalized performance formula: (Skill/100 * Mental/100 * Physical/100 * Execution/100) * 100
  // Scaled with power weighting to emphasize the multiplier effect
  const rawScore = (skill / 100) * (mental / 100) * (physical / 100) * (execution / 100) * 100;
  // Scaled score to percentage
  const finalScore = Math.round(rawScore);

  const presets = [
    {
      title: "متداول عبقري ولكن منهك عصبياً",
      desc: "مهارة 95%، ولكن نام 4 ساعات وخسر أمس 3R",
      s: 95, m: 30, p: 35, e: 60
    },
    {
      title: "الحالة الذهنية المثالية (The Optimal State)",
      desc: "نوم ممتاز، صفاء ذهني، والتزام صارم",
      s: 85, m: 90, p: 90, e: 90
    },
    {
      title: "مبتدئ هادئ ومستقر",
      desc: "مهارة متواضعة لكن جهاز عصبي مستقر ومنضبط",
      s: 60, m: 85, p: 80, e: 80
    }
  ];

  return (
    <div className="my-8 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-5 md:p-8 dark:border-stone-800/80 dark:bg-stone-900/60 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/60 pb-4 dark:border-stone-800/60">
        <div>
          <span className="text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400">
            حاسبة أداء المتداول التفاعلية
          </span>
          <h4 className="mt-1 text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            معادلة الأداء: المهارة الفنية × الحالة الذهنية × الحالة الجسدية × التنفيذ
          </h4>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
          حاصل ضرب وليس جمع
        </span>
      </div>

      <p className="mt-3 text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
        المهارة التحليلية وحدها لا تكفي. لأن المعادلة قائمة على الضرب (Multiplication)، إذا انخفضت حالتك الجسدية أو النفسية، فإن المحصلة النهائية للأداء تتهاوى ولو كنت أعظم محلل فني:
      </p>

      {/* Formula Display Banner */}
      <div className="my-5 p-3.5 rounded-xl border border-stone-200/70 bg-white/90 dark:border-stone-800/70 dark:bg-stone-950/40 text-center font-mono text-xs sm:text-sm text-stone-800 dark:text-stone-200 flex flex-wrap items-center justify-center gap-2">
        <span className="font-bold text-amber-700 dark:text-amber-400">الأداء النهائي ({finalScore}%)</span>
        <span>=</span>
        <span>المهارة ({skill}%)</span>
        <span>×</span>
        <span>الحالة النفسية ({mental}%)</span>
        <span>×</span>
        <span>الحالة الجسدية ({physical}%)</span>
        <span>×</span>
        <span>جودة التنفيذ ({execution}%)</span>
      </div>

      {/* Preset Scenarios */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
        {presets.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSkill(p.s);
              setMental(p.m);
              setPhysical(p.p);
              setExecution(p.e);
            }}
            className="p-3 text-right rounded-xl border border-stone-200/60 bg-white dark:border-stone-800/60 dark:bg-stone-950/40 hover:border-amber-400 transition-colors text-xs"
          >
            <div className="font-bold text-stone-900 dark:text-stone-100">{p.title}</div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">{p.desc}</div>
          </button>
        ))}
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Skill */}
        <div className="p-3.5 rounded-xl border border-stone-200/60 bg-white/80 dark:border-stone-800/60 dark:bg-stone-950/40">
          <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
              <Award className="h-4 w-4 text-blue-500" />
              المهارة الفنية واستراتيجية السوق
            </span>
            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{skill}%</span>
          </div>
          <input
            id={skillId}
            type="range"
            min="20"
            max="100"
            value={skill}
            onChange={(e) => setSkill(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="text-[10px] text-stone-400 block mt-1">فهم الشارت، إدارة المخاطر، والنسب الإحصائية</span>
        </div>

        {/* Mental */}
        <div className="p-3.5 rounded-xl border border-stone-200/60 bg-white/80 dark:border-stone-800/60 dark:bg-stone-950/40">
          <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
              <Brain className="h-4 w-4 text-purple-500" />
              الحالة العاطفية والنفسية
            </span>
            <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">{mental}%</span>
          </div>
          <input
            id={mentalId}
            type="range"
            min="10"
            max="100"
            value={mental}
            onChange={(e) => setMental(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <span className="text-[10px] text-stone-400 block mt-1">تأثير خسائر الأمس، المشاكل الشخصية، غياب الغضب</span>
        </div>

        {/* Physical */}
        <div className="p-3.5 rounded-xl border border-stone-200/60 bg-white/80 dark:border-stone-800/60 dark:bg-stone-950/40">
          <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
              <Moon className="h-4 w-4 text-amber-500" />
              الحالة الجسدية والبيولوجية
            </span>
            <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{physical}%</span>
          </div>
          <input
            id={physicalId}
            type="range"
            min="10"
            max="100"
            value={physical}
            onChange={(e) => setPhysical(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
          <span className="text-[10px] text-stone-400 block mt-1">ساعات وجودة النوم، التغذية، الترطيب، والطاقة الصباحية</span>
        </div>

        {/* Execution */}
        <div className="p-3.5 rounded-xl border border-stone-200/60 bg-white/80 dark:border-stone-800/60 dark:bg-stone-950/40">
          <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
              <Zap className="h-4 w-4 text-emerald-500" />
              الانضباط وسرعة التنفيذ
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{execution}%</span>
          </div>
          <input
            id={executionId}
            type="range"
            min="10"
            max="100"
            value={execution}
            onChange={(e) => setExecution(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <span className="text-[10px] text-stone-400 block mt-1">الالتزام بأمر الوقف وعدم التردد أو التسرع</span>
        </div>
      </div>

      {/* Outcome Verdict Card */}
      <div className="mt-5 p-4 rounded-xl border border-stone-200/70 bg-white dark:border-stone-800/70 dark:bg-stone-950/50 flex items-start gap-3">
        <ShieldAlert className={`h-6 w-6 shrink-0 mt-0.5 ${
          finalScore >= 55 ? 'text-emerald-600 dark:text-emerald-400' : finalScore >= 25 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
        }`} />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
              تقييم كفاءة التداول الحقيقية: {finalScore}%
            </span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
              finalScore >= 55
                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                : finalScore >= 25
                ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300'
                : 'bg-red-500/10 text-red-700 dark:text-red-300'
            }`}>
              {finalScore >= 55 ? 'جاهز للتداول بكفاءة' : finalScore >= 25 ? 'أداء متذبذب وضعيف' : 'خطر داهم - عدم التداول أفضل قرار!'}
            </span>
          </div>
          <p className="mt-1 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            {finalScore >= 55
              ? 'أركان الأداء متوازنة. جهازك العصبي مستعد لاتخاذ قرارات احتمالية دون تشويش من العوامل البيولوجية أو مخلفات الأمس.'
              : finalScore >= 25
              ? 'لديك نقطة ضعف واضحة (عنق زجاجة). حتى لو كانت استراتيجيتك ممتازة، فإن تشتتك أو قلة نومك ستجعلك ترتكب خطأ مكلفاً في لحظة حاسمة.'
              : 'المهارة هنا عاجزة تماماً! أنت تقود سيارة فورمولا 1 بإطارات ممزقة ومحرك يشتعل. عدم فتح أي صفقة اليوم هو أفضل وأربح قرار مالي يمكنك اتخاذه.'}
          </p>
        </div>
      </div>
    </div>
  );
}
