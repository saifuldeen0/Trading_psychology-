import { useState } from 'react';
import { Target, HelpCircle, CheckCircle2, AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';

interface CauseOption {
  id: string;
  name: string;
  innerMonologue: string;
  emotionalState: string;
  trueDiagnosis: string;
  treatment: string;
}

const CAUSES: CauseOption[] = [
  {
    id: 'fomo',
    name: 'الخوف من فوات الفرصة (FOMO)',
    innerMonologue: '«الشمعة بدأت تتحرك بقوة، إذا انتظرت إغلاقها ستضيع الـ 40 نقطة بالكامل!»',
    emotionalState: 'استعجال ملحّ وقلق متوتر',
    trueDiagnosis: 'الخلل ليس ضعف انضباط، بل ذعر من الفقدان (FOMO).',
    treatment: 'تطبيق قاعدة: «حركة لا أنتظر إغلاق شمعتها هي حركة ليست ملكي رياضياً».',
  },
  {
    id: 'revenge',
    name: 'الغضب والرغبة بالتعويض (Revenge)',
    innerMonologue: '«خسرت 35$ قبل قليل.. ظهر نموذج شبه مكتمل، سأدخل بسرعة لأستعيد مالي»',
    emotionalState: 'غضب مكبوت 6/10 وضيق في الصدر',
    trueDiagnosis: 'الخلل هو تداول انتقامي مقنّع، وليس مجرد استعجال فني.',
    treatment: 'تطبيق إغلاق المنصة الإجباري لـ 20 دقيقة بعد أي خسارة.',
  },
  {
    id: 'overconfidence',
    name: 'الثقة المفرطة واستثناء النفس (Overconfidence)',
    innerMonologue: '«أنا أرى حركة الذهب واضحة جداً اليوم.. لا أحتاج لانتظار شمعة تأكيد ساذجة!»',
    emotionalState: 'نشوة وغرور وارتفاع دوبامين',
    trueDiagnosis: 'استكبار على قواعد الاحتمالات ووهم السيطرة على السوق.',
    treatment: 'تذكير الذات بأن «السوق يملك سيولة تفوق مئات المليارات ولا يعبأ بحدسك الفردي».',
  },
  {
    id: 'discipline',
    name: 'ضعف الانضباط والكسل المباشر (Pure Discipline Flaw)',
    innerMonologue: '«أعرف الشروط تماماً، لا يوجد أي خوف أو غضب، لكنني ببساطة لا أريد الانتظار 15 دقيقة أخرى»',
    emotionalState: 'هدوء تام مع استسهال وتهاون',
    trueDiagnosis: 'هنا فقط تكون المشكلة ضعف التزام وانضباط حقيقي!',
    treatment: 'فرض عقوبة حظر تداول لـ 24 ساعة عند أي خرق واعٍ للقواعد.',
  },
  {
    id: 'boredom',
    name: 'الملل والبحث عن الإثارة (Boredom Trading)',
    innerMonologue: '«صار لي ساعتين جالس أراقب الشارت بدون حركة.. خلني أدخل أي صفقة صغيرة لتحريك الجو»',
    emotionalState: 'تثاؤب وخمول ورغبة بالأكشن',
    trueDiagnosis: 'البحث عن الترفيه والمقامرة بدلاً من إدارة استثمار مالي.',
    treatment: 'إغلاق اللابتوب؛ التداول وظيفة جافة ومملة تشبه مراقبة الطلاء وهو يجف.',
  },
];

export default function RootCauseDiagnosticTool() {
  const [selectedCauseId, setSelectedCauseId] = useState<string>('fomo');
  const selected = CAUSES.find((c) => c.id === selectedCauseId)!;

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-stone-100 dark:border-stone-800 bg-linear-to-r from-amber-500/10 via-transparent to-blue-500/10">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
          <Target className="h-4 w-4" />
          <span>مشرط التشخيص الجذري (Root Cause Diagnostic Scalpel)</span>
        </div>
        <h4 className="text-lg md:text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
          نفس السلوك الظاهري.. لكن السبب النفسي مختلف تماماً!
        </h4>
        <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 mt-1">
          السلوك: «خرقت الخطة ودخلت مبكراً قبل اكتمال الـ Setup». اختر الصوت الذي دار في رأسك لمعرفة السبب الحقيقي:
        </p>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Cause Selectors */}
        <div className="flex flex-wrap gap-2">
          {CAUSES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCauseId(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCauseId === c.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Detailed Breakdown Card */}
        <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/60 space-y-4">
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs md:text-sm text-amber-950 dark:text-amber-200 font-semibold italic">
            الصوت الداخلي الذي همس في رأسك: {selected.innerMonologue}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
            <div className="p-3.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-[11px] font-bold text-stone-400 block mb-1">الحالة الشعورية المرافقة:</span>
              <span className="font-extrabold text-stone-900 dark:text-stone-100">{selected.emotionalState}</span>
            </div>
            <div className="p-3.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="text-[11px] font-bold text-stone-400 block mb-1">التشخيص الطبي الحقيقي:</span>
              <span className="font-extrabold text-red-600 dark:text-red-400">{selected.trueDiagnosis}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-500/15 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs md:text-sm font-extrabold text-emerald-950 dark:text-emerald-200">
                العلاج الموجه لهذا السبب بالذات:
              </span>
              <p className="text-xs md:text-sm text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">
                {selected.treatment}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
