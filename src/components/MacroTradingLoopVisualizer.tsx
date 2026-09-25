import { useState } from 'react';
import { Network, ArrowDown, Sparkles, Moon, Brain, Shield, Target, DollarSign, RefreshCw } from 'lucide-react';

export default function MacroTradingLoopVisualizer() {
  const [activeNode, setActiveNode] = useState<number>(1);

  const nodes = [
    {
      id: 1,
      title: "1. المدخلات البيولوجية والروتينية",
      subtitle: "النوم، التغذية، الرياضة، مخلفات الأمس (-3R)، المشاكل الشخصية",
      icon: Moon,
      color: "border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/5",
      detail: "جسمك وعقلك لا يعملان كملف Excel تمسح فيه خسارة الأمس. إذا نمت 4 ساعات وأنت متوتر من صفقة الأمس، فإن مدخلاتك الحيوية اليوم محطمة قبل أن تفتح الشارت."
    },
    {
      id: 2,
      title: "2. حالة الأداء الراهنة (Performance State)",
      subtitle: "مستوى صفاء الذهن ومخزون الطاقة ومقدار التوتر الكامن",
      icon: Brain,
      color: "border-purple-500/40 text-purple-600 dark:text-purple-400 bg-purple-500/5",
      detail: "حالة الأداء تتحدد بساعات قبل أول شمعة. هدوؤك الظاهري لا يعني جاهزيتك إذا كان جهازك العصبي مشحوناً بالرغبة في تعويض خسارة الأمس."
    },
    {
      id: 3,
      title: "3. مستوى الاستثارة النفسية (Yerkes-Dodson)",
      subtitle: "هل أنت في المنطقة الذهبية أم في مرحلة الخمول أو فرط التوتر؟",
      icon: Target,
      color: "border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/5",
      detail: "إذا كانت الاستثارة متوازنة، يقود الفص الجبهي قراراتك. وإذا كانت مرتفعة، تسيطر اللوزة الدماغية وتضيق رؤيتك إلى رغبة ملحة بالحل العاطفي الفوري."
    },
    {
      id: 4,
      title: "4. جودة التفكير والمحاكمة المنطقية",
      subtitle: "تفكير احتمالي مرن (IF-THEN) أم تعلق أعمى بالتحيز (Bias)",
      icon: Shield,
      color: "border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5",
      detail: "التحضير الحقيقي يمنحك مرونة للتعامل مع أي حركة للسوق، بينما التحيز يحول تحليلك الفني إلى عناد مكلف وتبرير واهم."
    },
    {
      id: 5,
      title: "5. جودة القرار وسرعة التنفيذ",
      subtitle: "احترام أمر وقف الخسارة وحجم المخاطرة بدقة",
      icon: DollarSign,
      color: "border-stone-500/40 text-stone-700 dark:text-stone-300 bg-stone-500/5",
      detail: "الدخول عند توفر الشروط فقط، دون تردد أو استعجال، وقبول خسارة الصفقة كجزء طبيعي من اللعبة الاحتمالية."
    },
    {
      id: 6,
      title: "6. الأثر المتبقي لليوم التالي (The Carryover)",
      subtitle: "كيف تغذي نتيجة اليوم حالة الغد؟",
      icon: RefreshCw,
      color: "border-red-500/40 text-red-600 dark:text-red-400 bg-red-500/5",
      detail: "إذا أغلقت المنصة بانضباط وقبلت النتيجة، تبدأ الغد طاهراً. أما إذا تركت الغضب والانتقام يشتعل، فستبدأ يومك التالي وأنت أصلاً قريب من الانهيار العصبي."
    }
  ];

  return (
    <div className="my-8 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-5 md:p-8 dark:border-stone-800/80 dark:bg-stone-900/60 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/60 pb-4 dark:border-stone-800/60">
        <div>
          <span className="text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400">
            النموذج النفسي الشامل
          </span>
          <h4 className="mt-1 text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Network className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            حلقة التداول البيولوجية والنفسية المتكاملة
          </h4>
        </div>
        <span className="text-xs text-stone-500 dark:text-stone-400">
          انقر على أي مرحلة لاكتشاف تفاصيلها
        </span>
      </div>

      <p className="mt-3 text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
        الربط الجوهري بين الجزأين: الجزء الأول يشرح كيف ترتفع المشاعر أثناء الجلسة، بينما يوضح هذا المخطط لماذا تدخل السوق وأنت أصلاً على حافة الانهيار:
      </p>

      {/* Nodes visual interactive chain */}
      <div className="mt-6 space-y-3">
        {nodes.map((n, idx) => {
          const Icon = n.icon;
          const isSelected = activeNode === n.id;
          return (
            <div key={n.id}>
              <div
                onClick={() => setActiveNode(n.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? `${n.color} shadow-xs border-r-4 font-bold`
                    : 'bg-white/80 dark:bg-stone-950/40 border-stone-200 dark:border-stone-800 hover:border-amber-400 text-stone-700 dark:text-stone-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shrink-0`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm truncate font-bold text-stone-900 dark:text-stone-100">
                      {n.title}
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                      {n.subtitle}
                    </div>
                  </div>
                </div>

                <span className="font-mono text-xs text-stone-400">0{n.id}</span>
              </div>

              {isSelected && (
                <div className="mt-2 mr-6 p-3 rounded-lg bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300 leading-relaxed animate-in fade-in duration-200">
                  {n.detail}
                </div>
              )}

              {idx < nodes.length - 1 && (
                <div className="flex justify-center my-1 text-stone-300 dark:text-stone-700">
                  <ArrowDown className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
