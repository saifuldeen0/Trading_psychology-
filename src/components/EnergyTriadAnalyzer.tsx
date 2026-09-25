import { useState } from 'react';
import { BatteryCharging, Flame, Zap, Heart, Activity, AlertTriangle } from 'lucide-react';

export default function EnergyTriadAnalyzer() {
  const [physical, setPhysical] = useState<number>(60);
  const [motivational, setMotivational] = useState<number>(85);
  const [emotional, setEmotional] = useState<number>(70);
  const [arousal, setArousal] = useState<number>(80);

  // Arousal danger check
  const isArousalSpike = arousal > 75;
  const isOverconfident = motivational > 80 && emotional > 75 && arousal > 80;
  const isExhaustedExcited = physical < 40 && motivational > 75;

  return (
    <div className="my-8 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-5 md:p-8 dark:border-stone-800/80 dark:bg-stone-900/60 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/60 pb-4 dark:border-stone-800/60">
        <div>
          <span className="text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400">
            محلل أبعاد الطاقة المتعددة
          </span>
          <h4 className="mt-1 text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <BatteryCharging className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            الطاقة ليست شيئاً واحداً: التفكيك الثلاثي والفرق عن الاستثارة
          </h4>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
          Physical · Motivational · Emotional
        </span>
      </div>

      <p className="mt-3 text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
        قد تكون طاقتك الجسدية منخفضة ولكن طاقتك التحفيزية ملتهبة (نمت 5 ساعات ومتحمس للذهب)، أو العكس. كما أن «الطاقة العالية» تختلف تماماً عن «فرط الاستثارة والانفعال»:
      </p>

      {/* Sliders Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Physical */}
        <div className="p-3.5 rounded-xl border border-stone-200/70 bg-white/80 dark:border-stone-800/70 dark:bg-stone-950/40">
          <div className="flex justify-between items-center mb-1 text-xs font-bold text-stone-700 dark:text-stone-300">
            <span className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              1. الطاقة الجسدية (Physical)
            </span>
            <span className="font-mono text-amber-600 dark:text-amber-400">{physical}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={physical}
            onChange={(e) => setPhysical(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
          <span className="text-[10px] text-stone-400 mt-1 block">النوم، التعب، الغذاء، النشاط البدني</span>
        </div>

        {/* Motivational */}
        <div className="p-3.5 rounded-xl border border-stone-200/70 bg-white/80 dark:border-stone-800/70 dark:bg-stone-950/40">
          <div className="flex justify-between items-center mb-1 text-xs font-bold text-stone-700 dark:text-stone-300">
            <span className="flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-orange-500" />
              2. الطاقة التحفيزية (Motivational)
            </span>
            <span className="font-mono text-orange-600 dark:text-orange-400">{motivational}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={motivational}
            onChange={(e) => setMotivational(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-orange-600"
          />
          <span className="text-[10px] text-stone-400 mt-1 block">الرغبة في التحليل والعمل وبذل الجهد</span>
        </div>

        {/* Emotional */}
        <div className="p-3.5 rounded-xl border border-stone-200/70 bg-white/80 dark:border-stone-800/70 dark:bg-stone-950/40">
          <div className="flex justify-between items-center mb-1 text-xs font-bold text-stone-700 dark:text-stone-300">
            <span className="flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-pink-500" />
              3. الطاقة العاطفية (Emotional Tone)
            </span>
            <span className="font-mono text-pink-600 dark:text-pink-400">{emotional}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={emotional}
            onChange={(e) => setEmotional(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-pink-600"
          />
          <span className="text-[10px] text-stone-400 mt-1 block">الثقة، الحماس، الخلو من الغضب والقلق</span>
        </div>

        {/* Arousal */}
        <div className="p-3.5 rounded-xl border border-amber-300/80 bg-amber-50/50 dark:border-amber-900/60 dark:bg-amber-950/30">
          <div className="flex justify-between items-center mb-1 text-xs font-bold text-amber-900 dark:text-amber-200">
            <span className="flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-red-500" />
              مستوى الاستثارة النفسية (Arousal)
            </span>
            <span className="font-mono font-bold text-red-600 dark:text-red-400">{arousal}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={arousal}
            onChange={(e) => setArousal(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <span className="text-[10px] text-amber-800 dark:text-amber-400 mt-1 block">شدة الإلحاح: هل ترغب بالتداول أم 'لازم' تطلع 500$ اليوم؟</span>
        </div>
      </div>

      {/* Dynamic Diagnosis Card */}
      <div className="mt-5 p-4 rounded-xl border border-stone-200/70 bg-white dark:border-stone-800/70 dark:bg-stone-950/50">
        <div className="flex items-start gap-3">
          <AlertTriangle className={`h-5 w-5 shrink-0 mt-0.5 ${
            isOverconfident || isArousalSpike ? 'text-red-500' : 'text-emerald-500'
          }`} />
          <div className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
            <strong className="block text-sm text-stone-900 dark:text-stone-100 font-bold mb-1">
              التشخيص الفسيولوجي المباشر لحالتك:
            </strong>

            {isOverconfident ? (
              <span className="text-red-700 dark:text-red-300 font-medium">
                فخ الثقة المفرطة (Overconfidence Trap)! طاقتك التحفيزية والعاطفية عالية جداً مع استثارة مرتفعة. صوتك الداخلي يقول: «السوق اليوم بيدي وراح أطلع 500$». أنت لا تمتلك ثقة صحية، بل غروراً سيجعلك تقلل من احتمال الخطأ وترفع حجم اللوت وتتجاهل إدارة المخاطر!
              </span>
            ) : isExhaustedExcited ? (
              <span className="text-amber-800 dark:text-amber-300 font-medium">
                تضارب خطير: إرهاق جسدي حاد (نوم ناقص) مع حماس تحفيزي مفرط! هذا المزيج يجعل سرعة انتباهك بطيئة، بينما اندفاعك في أقصاه. احتمالية ارتكاب خطأ في إدخال حجم اللوت أو تحديد الستوب لوز مرتفعة جداً اليوم.
              </span>
            ) : isArousalSpike ? (
              <span className="text-orange-700 dark:text-orange-300 font-medium">
                انتبه: استثارتك النفسية مرتفعة ({arousal}%). لقد انتقلت من طاقة مفيدة إلى إلحاح وتوتر. خذ نفساً عميقاً وابتعد عن الشاشة لـ 20 دقيقة لتستعيد هدوءك قبل تنفيذ أول صفقة.
              </span>
            ) : (
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                توازن استثنائي (Optimal Balance). طاقتك كافية، واستثارتك مضبوطة في المنطقة الذهبية. عقلك جاهز لمعالجة الاحتمالات دون استعجال أو توتر.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
