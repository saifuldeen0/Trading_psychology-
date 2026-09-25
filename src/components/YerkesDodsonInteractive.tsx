import { useState, useId } from 'react';
import { Activity, Brain, AlertTriangle, CheckCircle2, Flame, Sliders } from 'lucide-react';

interface ZoneInfo {
  name: string;
  badge: string;
  color: string;
  desc: string;
  performanceScore: number;
  mindset: string;
  action: string;
  quote: string;
}

export default function YerkesDodsonInteractive() {
  const [arousal, setArousal] = useState<number>(50);
  const sliderId = useId();

  // Mathematical Gaussian curve calculation: y(x) = peak * exp(-((x - 50)^2)/(2 * sigma^2))
  const getCurvePoint = (xVal: number) => {
    const peak = 180;
    const base = 40;
    const sigma = 18;
    const normalized = Math.exp(-Math.pow(xVal - 50, 2) / (2 * Math.pow(sigma, 2)));
    // In SVG, y=0 is top, so higher performance means lower y coordinate
    const yCoord = 210 - (normalized * (peak - base));
    return { x: xVal * 5.6 + 40, y: yCoord, performancePercent: Math.round(normalized * 100) };
  };

  const currentPoint = getCurvePoint(arousal);

  // Generate SVG path points
  const points: string[] = [];
  for (let i = 0; i <= 100; i += 2) {
    const pt = getCurvePoint(i);
    points.push(`${pt.x},${pt.y}`);
  }
  const pathD = `M ${points.join(' L ')}`;

  const getZone = (val: number): ZoneInfo => {
    if (val < 30) {
      return {
        name: "استثارة منخفضة جداً (خمول / لامبالاة)",
        badge: "خمول وتراخي",
        color: "text-amber-500 bg-amber-500/10 border-amber-500/30",
        desc: "أنت تشعر بالملل وعدم الاكتراث. الهدوء هنا تحول إلى إهمال قد يجعلك تفوت الأخبار الهامة أو إشارات انعكاس الاتجاه.",
        performanceScore: Math.round((val / 30) * 45) + 15,
        mindset: "«ما تفرق معي، إذا دخلت دخلت وإذا راحت راحت...»",
        action: "تفويت شروط الدخول أو الدخول بكسل دون مراجعة تفاصيل الشارت والسيولة.",
        quote: "الهدوء المفرط ليس احترافاً؛ بل هو نوم على عجلة القيادة."
      };
    } else if (val >= 30 && val <= 70) {
      return {
        name: "المنطقة الذهبية (استثارة مناسبة ومتوازنة)",
        badge: "المنطقة الاحترافية المثالية",
        color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
        desc: "تركيز حاد، حضور ذهني، تقبل كامل لاحتمالات الخسارة، وانضباط حديدي بإدارة المخاطر. أنت القائد هنا.",
        performanceScore: 90 + Math.round(10 - Math.abs(50 - val) * 0.4),
        mindset: "«النموذج مكتمل والمخاطرة 1%. إذا ضرب الستوب لوز، فهذه تكلفة طبيعية للنظام الاحتمالي».",
        action: "تنفيذ الصفقة وفق الخطة المكتوبة بدقة مع التزام صارم بأمر وقف الخسارة.",
        quote: "هنا تتخذ القرارات من الفص الجبهي العقلاني وليس من مركز الخوف والقتال."
      };
    } else if (val > 70 && val < 88) {
      return {
        name: "استثارة مرتفعة (توتر وتضييق تفكير)",
        badge: "إنذار وتوتر متصاعد",
        color: "text-amber-600 bg-amber-600/10 border-amber-600/30",
        desc: "تسارع نبضات القلب، الرغبة في تحريك الستوب لوز لحماية الذات، والخوف من ضياع الأرباح اللحظية.",
        performanceScore: Math.round(75 - (val - 70) * 3),
        mindset: "«ليش نزل السعر ضدي؟ أكيد سيرتد.. خليني أوسع الستوب شوي حتى أعطيه فرصة!».",
        action: "العبث بأوامر الحماية والتحديق المتوتر في الشمعة على فريم الدقيقة الواحدة.",
        quote: "التفكير بدأ يضيق، وأصبحت تحاول حل ألمك العاطفي بدلاً من قراءة الاحتمالات."
      };
    } else {
      return {
        name: "استثارة شديدة (ذعر وتداول انتقامي)",
        badge: "انهيار سلوكي كامل",
        color: "text-red-500 bg-red-500/10 border-red-500/30",
        desc: "فقدان تام للسيطرة العقلانية، غضب هائج، دخول صفقات مضاعفة الحجم (Full Margin) لمحاولة الانتقام من السوق.",
        performanceScore: 12,
        mindset: "«السوق غدر بي ولازم أرجع كل دولار الحين، إما أن أعوض كل شيء أو أحرق الحساب!».",
        action: "حذف أمر وقف الخسارة بالكامل والدخول في صفقات عشوائية بدافع الغيظ.",
        quote: "في هذه المرحلة، أنت لا تتداول؛ أنت تقامر في حالة غيبوبة عاطفية تامة."
      };
    }
  };

  const zone = getZone(arousal);

  return (
    <div className="my-8 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-5 md:p-8 dark:border-stone-800/80 dark:bg-stone-900/60 shadow-xs transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/60 pb-4 dark:border-stone-800/60">
        <div>
          <span className="text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400">
            تجربة تفاعلية مباشرة
          </span>
          <h4 className="mt-1 text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Activity className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            محاكي قانون Yerkes-Dodson للعقل التداولي
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
          <Sliders className="h-4 w-4" />
          <span>اسحب المؤشر لاختبار تأثير الاستثارة النفسية</span>
        </div>
      </div>

      {/* SVG Interactive Inverted U Curve */}
      <div className="relative mt-6 w-full overflow-hidden rounded-xl bg-white/80 p-3 md:p-6 dark:bg-stone-950/60 border border-stone-200/50 dark:border-stone-800/50">
        <div className="relative h-64 w-full">
          <svg
            viewBox="0 0 640 240"
            className="h-full w-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="35%" stopColor="#10b981" stopOpacity="0.9" />
                <stop offset="65%" stopColor="#10b981" stopOpacity="0.9" />
                <stop offset="85%" stopColor="#f97316" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="40" y1="210" x2="600" y2="210" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-stone-300 dark:text-stone-700" />
            <line x1="40" y1="120" x2="600" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-stone-200 dark:text-stone-800" />
            <line x1="40" y1="30" x2="600" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-stone-200 dark:text-stone-800" />

            {/* Inverted U Path */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Optimal Zone Highlight Box */}
            <rect
              x="208"
              y="20"
              width="224"
              height="190"
              fill="rgba(16, 185, 129, 0.05)"
              stroke="rgba(16, 185, 129, 0.25)"
              strokeDasharray="4 4"
              rx="8"
            />
            <text x="320" y="45" textAnchor="middle" className="text-[11px] font-bold fill-emerald-600 dark:fill-emerald-400">
              المنطقة المثالية (Peak Performance)
            </text>

            {/* Dynamic Current Point on Curve */}
            <circle
              cx={currentPoint.x}
              cy={currentPoint.y}
              r="8"
              className="fill-amber-500 stroke-white stroke-2 shadow-lg dark:stroke-stone-900 transition-all duration-75"
            />
            <circle
              cx={currentPoint.x}
              cy={currentPoint.y}
              r="14"
              className="fill-amber-500/20 animate-pulse transition-all duration-75"
            />

            {/* Labels on SVG */}
            <text x="45" y="230" textAnchor="start" className="text-[10px] fill-stone-400">استثارة منخفضة (خمول)</text>
            <text x="320" y="230" textAnchor="middle" className="text-[10px] fill-stone-400 font-medium">استثارة متوازنة (تركيز)</text>
            <text x="595" y="230" textAnchor="end" className="text-[10px] fill-stone-400">استثارة شديدة (ذعر)</text>

            <text x="35" y="25" textAnchor="end" className="text-[10px] fill-stone-400">جودة الأداء العالي ↑</text>
          </svg>
        </div>

        {/* Custom Range Slider */}
        <div className="mt-4 px-2">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
            <span>0% استثارة (برود وكسل)</span>
            <span className="font-bold text-stone-800 dark:text-stone-200">
              مستوى الاستثارة النفسية: {arousal}%
            </span>
            <span>100% استثارة (غضب وذعر)</span>
          </div>
          <label htmlFor={sliderId} className="sr-only">
            مستوى الاستثارة النفسية
          </label>
          <input
            id={sliderId}
            type="range"
            min="0"
            max="100"
            value={arousal}
            onChange={(e) => setArousal(Number(e.target.value))}
            className="w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-600 focus:outline-hidden"
          />

          {/* Quick preset buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setArousal(15)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                arousal <= 25 ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700' : 'bg-transparent text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-700'
              }`}
            >
              1. استثارة منخفضة (15%)
            </button>
            <button
              onClick={() => setArousal(50)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-semibold ${
                arousal >= 40 && arousal <= 60 ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700 shadow-xs' : 'bg-transparent text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-700'
              }`}
            >
              2. المنطقة الذهبية (50%)
            </button>
            <button
              onClick={() => setArousal(78)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                arousal > 65 && arousal <= 85 ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700' : 'bg-transparent text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-700'
              }`}
            >
              3. توتر متصاعد (78%)
            </button>
            <button
              onClick={() => setArousal(95)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                arousal > 85 ? 'bg-red-100 text-red-900 border-red-300 dark:bg-red-950/40 dark:text-red-300 dark:border-red-700' : 'bg-transparent text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-700'
              }`}
            >
              4. ذعر وانتقام (95%)
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Feedback Card */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-stone-200/60 bg-white/90 p-4 dark:border-stone-800/60 dark:bg-stone-950/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-stone-500 dark:text-stone-400">الحالة النفسية الراهنة</span>
            <span className={`text-xs px-2.5 py-0.5 rounded-md border font-medium ${zone.color}`}>
              {zone.badge}
            </span>
          </div>
          <h5 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-1">
            {zone.name}
          </h5>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            {zone.desc}
          </p>

          <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800">
            <span className="text-[11px] font-semibold text-stone-400 block mb-1">ما يقوله عقلك في هذه اللحظة:</span>
            <p className="text-xs font-serif italic text-amber-800 dark:text-amber-300">
              {zone.mindset}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-stone-200/60 bg-white/90 p-4 dark:border-stone-800/60 dark:bg-stone-950/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-stone-500 dark:text-stone-400">جودة القرار التداولي</span>
            <span className="text-xs font-mono font-bold text-stone-700 dark:text-stone-300">
              {zone.performanceScore}% كفاءة
            </span>
          </div>

          {/* Progress bar of performance */}
          <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden mb-3">
            <div
              className={`h-full transition-all duration-300 ${
                zone.performanceScore > 75
                  ? 'bg-emerald-500'
                  : zone.performanceScore > 40
                  ? 'bg-amber-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${zone.performanceScore}%` }}
            />
          </div>

          <span className="text-[11px] font-semibold text-stone-400 block mb-1">السلوك المالي الفعلي على الشارت:</span>
          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
            {zone.action}
          </p>

          <div className="rounded-lg bg-stone-100/80 p-2.5 dark:bg-stone-900/80 flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300">
            <Brain className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <span>{zone.quote}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
