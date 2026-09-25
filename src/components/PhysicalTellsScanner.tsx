import { useState } from 'react';
import { Activity, MousePointer, HeartPulse, User, Wind, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';

interface BodyTell {
  id: string;
  name: string;
  part: 'اليد والماوس' | 'الرأس والوضعية' | 'الصدر والأنفاس' | 'الأطراف والقدم';
  symptom: string;
  meaning: string;
  antidote: string;
}

const BODY_TELLS: BodyTell[] = [
  {
    id: 't1',
    name: 'القبضة الحديدية على الماوس (White-Knuckle Grip)',
    part: 'اليد والماوس',
    symptom: 'الضغط بقوة مفرطة على فارة التحكم ووضع السبابة متشنجة فوق زر Buy/Sell',
    meaning: 'انتقال الدماغ إلى وضع القتال أو الهروب (Fight or Flight) والتأهب للانتقام اللحظي',
    antidote: 'أبعد يدك عن الماوس فوراً، ضع كفيك مفتوحتين على سطح الطاولة لمدة 60 ثانية كاملة',
  },
  {
    id: 't2',
    name: 'الاقتراب الشديد من الشاشة (Tunnel Vision Stare)',
    part: 'الرأس والوضعية',
    symptom: 'انحناء الظهر والاقتراب بمسافة 15-20 سم نحو الشمعة مع تضييق حدقة العين',
    meaning: 'فقدان الرؤية الشاملة وحبس العقل داخل النفق الإدراكي للشموع الصغيرة',
    antidote: 'ارجع بظهرك للخلف حتى يلامس مسند الكرسي، ووجّه نظرك إلى أبعد نقطة في الغرفة',
  },
  {
    id: 't3',
    name: 'التنفس السطحي وانحباس الأنفاس (Apnea / Shallow Breath)',
    part: 'الصدر والأنفاس',
    symptom: 'توقف التنفس لعدة ثوانٍ أثناء حركة شمعة الذهب ثم أخذ أنفاس سريعة مقطوعة',
    meaning: 'انخفاض تدفق الأكسجين للفص الجبهي المسؤول عن الحسابات الرياضية والمنطق',
    antidote: 'تطبيق تنفس الصندوق (4 ثوانٍ شهيق، 4 ثوانٍ كتم، 4 ثوانٍ زفير هادئ)',
  },
  {
    id: 't4',
    name: 'الاهتزاز العصبي للقدم (Restless Foot Shaking)',
    part: 'الأطراف والقدم',
    symptom: 'حركة سريعة ومستمرة لأصابع القدم أو الركبة تحت الطاولة بانتظام عالي',
    meaning: 'تفريغ لاإرادي لفائض هرمون الأدرينالين والتوتر الناتج عن الخوف من تفويت الحركة',
    antidote: 'قف على قدميك، مدّ عضلات الساقين، وامشِ 10 خطوات بعيداً عن الغرفة',
  },
];

export default function PhysicalTellsScanner() {
  const [selectedTells, setSelectedTells] = useState<string[]>(['t1']);
  const [isPracticingBreathe, setIsPracticingBreathe] = useState(false);

  const toggle = (id: string) => {
    setSelectedTells((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-stone-100 dark:border-stone-800 bg-linear-to-r from-orange-500/10 via-transparent to-red-500/10">
        <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
          <HeartPulse className="h-4 w-4" />
          <span>فاحص إشارات الجسد السريرية (Physical Tells Scanner)</span>
        </div>
        <h4 className="text-lg md:text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
          جسدك يفضحك قبل عقلك: اكتشف التوتر العضلي قبل أن تضغط الزر
        </h4>
        <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 mt-1">
          أنت قد تقول لنفسك «أنا مسيطر»، لكن جسدك يرسل إشارات استغاثة مبكرة تفضح فقدانك للسيطرة:
        </p>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Tells Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BODY_TELLS.map((tell) => {
            const isChecked = selectedTells.includes(tell.id);
            return (
              <div
                key={tell.id}
                onClick={() => toggle(tell.id)}
                className={`p-4 rounded-xl border text-right transition-all cursor-pointer ${
                  isChecked
                    ? 'border-orange-500/50 bg-orange-500/10 dark:bg-orange-500/15 ring-1 ring-orange-500/30'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {tell.part}
                  </span>
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                      isChecked ? 'bg-orange-600 text-white' : 'border border-stone-400'
                    }`}
                  >
                    {isChecked ? '✓' : ''}
                  </div>
                </div>

                <h5 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 mb-1">
                  {tell.name}
                </h5>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-2">
                  {tell.symptom}
                </p>

                <div className="p-2.5 rounded-lg bg-white/70 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800 text-[11px] space-y-1">
                  <div>
                    <strong className="text-red-600 dark:text-red-400">التشخيص العصبي: </strong>
                    <span className="text-stone-600 dark:text-stone-300">{tell.meaning}</span>
                  </div>
                  <div>
                    <strong className="text-emerald-600 dark:text-emerald-400">ترياق التدخل الفوري: </strong>
                    <span className="text-stone-700 dark:text-stone-200 font-medium">{tell.antidote}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real-time Physical De-escalation Protocol */}
        <div className="p-4 md:p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs md:text-sm">
            <Wind className="h-5 w-5 text-orange-600 dark:text-orange-400 shrink-0" />
            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100">
                بروتوكول تفريغ الشحنة الجسدية (60 ثانية):
              </span>
              <p className="text-stone-600 dark:text-stone-400 text-xs">
                إفلات الماوس + استناد الظهر + 3 دورات تنفس عميق تعيد الذاكرة العاملة للعمل.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPracticingBreathe(!isPracticingBreathe)}
            className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-all shrink-0 cursor-pointer shadow-xs"
          >
            {isPracticingBreathe ? 'إنهاء تمرين التنفس' : 'بدء تمرين التفريغ الآن'}
          </button>
        </div>

        {isPracticingBreathe && (
          <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-center space-y-2 animate-pulse">
            <span className="text-sm font-extrabold text-emerald-800 dark:text-emerald-200">
              شهيق عميق من الأنف (4 ثوانٍ) ... احبس الهواء (4 ثوانٍ) ... زفير بطيء من الفم (6 ثوانٍ)
            </span>
            <p className="text-xs text-stone-600 dark:text-stone-300">
              لاحظ كيف بدأت عضلات كتفيك ويدك ترتخي.. الآن فقط يمكنك التفكير بمنطق.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
