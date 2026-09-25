import { useState } from 'react';
import { GitFork, CheckCircle2, AlertOctagon, ArrowDown, Activity, Sparkles } from 'lucide-react';

interface Stage {
  id: number;
  name: string;
  category: string;
  healthy: string;
  malfunctioning: string;
}

export default function FullSystemMindMapViewer() {
  const [selectedStage, setSelectedStage] = useState<number>(1);

  const stages: Stage[] = [
    {
      id: 1,
      name: '1. الحالة الجسدية والنفسية المسبقة',
      category: 'الأساس البيولوجي',
      healthy: 'نوم كافٍ (7+ ساعات)، تغذية سليمة، فك ارتباط تام بالضغوط العائلية والمالية.',
      malfunctioning: 'نوم متقطع 4 ساعات، إجهاد وظيفي، دخول الجلسة بهدف سداد فاتورة مستعجلة.'
    },
    {
      id: 2,
      name: '2. مستوى الطاقة والاستثارة (Arousal)',
      category: 'طاقة الجهاز العصبي',
      healthy: 'استثارة متوازنة ومضبوطة (في قمة منحنى Yerkes-Dodson: هدوء مع يقظة تامة).',
      malfunctioning: 'إما خمول وملل تام يدفع للبحث عن الإثارة، أو استثارة عصبية مفرطة وخوف وهياج.'
    },
    {
      id: 3,
      name: '3. سعة الذاكرة العاملة (Working Memory)',
      category: 'المعالجة المعرفية',
      healthy: 'مساحة ذاكرة خالية بنسبة 80% وجاهزة لمراقبة الذهب وحساب المخاطر بدقة.',
      malfunctioning: 'ذاكرة مشغولة بنسبة 90% بأفكار الخسارة السابقة وتأنيب الضمير والديون.'
    },
    {
      id: 4,
      name: '4. جودة التفكير المنطقي واتخاذ القرار',
      category: 'الفص الجبهي',
      healthy: 'تفكير احتمالي بارد: "أنا لا أعلم أين سيذهب السعر، دوري فقط تنفيذ ميزتي الإحصائية".',
      malfunctioning: 'تفكير يقيني استبدادي: "السوق لازم يصعد الآن.. مستحيل يكسر هذا الدعم!".'
    },
    {
      id: 5,
      name: '5. طريقة تفسير السوق (Perception)',
      category: 'العدسة الإدراكية',
      healthy: 'رؤية الشموع بحيادية: خطوط الاتجاه ومناطق السيولة تُقرأ وفق الشروط الصارمة.',
      malfunctioning: 'تحول الإدراك (Perception Shift): اختراع خطوط وهمية وتجاهل المقاومة لأنك تريد الشراء.'
    },
    {
      id: 6,
      name: '6. معيار الانتقائية (Selectivity: A+ vs B)',
      category: 'إدارة الفرص',
      healthy: 'انتقائية ديناميكية: رفع المعيار إلى A+ فقط إن كانت الطاقة متوسطة، والامتناع إذا لم توجد فرصة.',
      malfunctioning: 'انتقائية صفرية: الدخول في صفقات C لمجرد القضاء على الملل أو الاستعجال.'
    },
    {
      id: 7,
      name: '7. التنفيذ الفعلي وإدارة المخاطر',
      category: 'التنفيذ الميداني',
      healthy: 'لوت محدد مسبقاً، وقف خسارة موضوع آلياً في الشارت قبل النقر، قبول كامل لتكلفة الخسارة.',
      malfunctioning: 'لوت مضاعف، وقف خسارة ذهني متحرك، النقر المتكرر، واستعجال قبل إغلاق الشمعة.'
    },
    {
      id: 8,
      name: '8. نتيجة الصفقة وفصل القرار عن الحصيلة',
      category: 'النتيجة الإحصائية',
      healthy: 'إدراك أن الخسارة جزء طبيعي من تكلفة تشغيل نظام رابح ولا تعني أبداً فشلاً شخصياً.',
      malfunctioning: 'اعتبار الخسارة إهانة شخصية وهزيمة عسكرية تستوجب الانتقام الفوري واسترداد المال.'
    },
    {
      id: 9,
      name: '9. معالجة التجربة وإغلاق الحلقات الذهنية',
      category: 'التبريد والمراجعة',
      healthy: 'تدوين الصفقة بهدوء في المفكرة، إغلاق الحلقة المفتوحة، وممارسة تبريد عصبي لمدة 10 دقائق.',
      malfunctioning: 'بقاء الصفقة مفتوحة في الذهن، استمرار اللوم وجلد الذات وتخيل الأرباح الضائعة.'
    },
    {
      id: 10,
      name: '10. الاستقرار طويل الأمد أو فخ الـ Tilt',
      category: 'المحصلة التراكمية',
      healthy: 'نمو تراكمي في رأس المال مع ثبات عصبي وانضباط مستدام لا يعتمد على مزاج اليوم.',
      malfunctioning: 'دوامة الهلاك التدميرية: الانتقام، تصفير الحساب، وترك السوق مع صدمة نفسية.'
    }
  ];

  const current = stages.find(s => s.id === selectedStage) || stages[0];

  return (
    <div className="my-8 rounded-2xl border border-stone-200/90 bg-white p-5 md:p-7 shadow-sm dark:border-stone-800 dark:bg-stone-900/60">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4 dark:border-stone-800/80 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 mb-1">
            <GitFork className="h-3.5 w-3.5" />
            <span>الخريطة الكاملة للمنظومة التداولية</span>
          </div>
          <h4 className="text-base md:text-lg font-bold text-stone-900 dark:text-stone-100">
            المخطط الهيكلي الشامل لعقل المتداول: السلسلة السببية من البيولوجيا إلى النتيجة
          </h4>
        </div>
        <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
          10 محطات سلوكية متكاملة
        </span>
      </div>

      <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 mb-5 leading-relaxed">
        انقر على أي محطة في المسار أدناه لترى الفارق الجذري بين <strong>المسار الصحي الاحترافي</strong> و<strong>مسار الانحراف والانهيار</strong>:
      </p>

      {/* Horizontal / Grid Stage Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {stages.map((stage) => {
          const isSelected = stage.id === selectedStage;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setSelectedStage(stage.id)}
              className={`p-2.5 rounded-xl border text-right transition-all flex flex-col justify-between h-20 ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/15 dark:bg-amber-500/20 text-stone-900 dark:text-stone-100 ring-2 ring-amber-500/30 font-bold'
                  : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 hover:border-amber-300'
              }`}
            >
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono">#{stage.id}</span>
              <span className="text-xs line-clamp-2 leading-tight font-semibold">{stage.name.replace(/^\d+\.\s*/, '')}</span>
              <span className="text-[9px] opacity-70 truncate">{stage.category}</span>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40">
        <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800 pb-3 mb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-sm bg-amber-500/10">
              المرحلة {current.id} · {current.category}
            </span>
            <h5 className="text-base font-bold text-stone-900 dark:text-stone-100 mt-1">
              {current.name}
            </h5>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Healthy Path */}
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>المسار السليم للمحترف الملتزم:</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-200 leading-relaxed font-normal">
              {current.healthy}
            </p>
          </div>

          {/* Malfunctioning Path */}
          <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/10">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 dark:text-rose-300 mb-2">
              <AlertOctagon className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
              <span>مسار الانحراف والانهيار:</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-200 leading-relaxed font-normal">
              {current.malfunctioning}
            </p>
          </div>
        </div>
      </div>

      {/* The Grand Takeaway Banner */}
      <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 flex items-center gap-3">
        <Sparkles className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0" />
        <div className="text-xs md:text-sm text-stone-900 dark:text-stone-100 leading-relaxed font-medium">
          <strong>القاعدة الذهبية الخالدة للكتاب:</strong> «أنت لا تحتاج أن تكون في أفضل حالة حتى تتداول، لكن تحتاج أن تعرف حالتك حتى تعرف كيف تتداول.»
        </div>
      </div>
    </div>
  );
}
