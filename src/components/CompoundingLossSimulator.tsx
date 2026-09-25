import { useState, useId } from 'react';
import { TrendingDown, ArrowUpRight, AlertTriangle, Calculator, DollarSign } from 'lucide-react';

export default function CompoundingLossSimulator() {
  const [initialCapital, setInitialCapital] = useState<number>(10000);
  const [lossPercent, setLossPercent] = useState<number>(5);
  const lossSliderId = useId();

  // Drawdown math: Required gain % = (1 / (1 - loss/100) - 1) * 100
  const currentBalance = initialCapital * (1 - lossPercent / 100);
  const moneyLost = initialCapital - currentBalance;
  const requiredGainPercent = ((1 / (1 - lossPercent / 100)) - 1) * 100;

  const presets = [
    { loss: 5, label: "المرحلة الأولى (-5%)", mood: "خسارة طبيعية ومقبولة", recovery: "+5.3%" },
    { loss: 8, label: "المرحلة الثانية (-8%)", mood: "استعجال لتعويض اليوم", recovery: "+8.7%" },
    { loss: 15, label: "المرحلة الثالثة (-15%)", mood: "مضاعفة اللوت وتوتر حاد", recovery: "+17.6%" },
    { loss: 30, label: "المرحلة الرابعة (-30%)", mood: "فقدان العقل وكارثة المحفظة", recovery: "+42.9%" },
  ];

  return (
    <div className="my-8 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-5 md:p-8 dark:border-stone-800/80 dark:bg-stone-900/60 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/60 pb-4 dark:border-stone-800/60">
        <div>
          <span className="text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400">
            حاسبة رياضيات التراجع (Drawdown Math)
          </span>
          <h4 className="mt-1 text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            محاكي كرة الثلج: كيف تتضخم الخسارة من 5% إلى 30%؟
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <Calculator className="h-4 w-4" />
          <span>حساب رياضي فوري</span>
        </div>
      </div>

      <p className="mt-3 text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
        الخسارة الأولى (-5%) هي جزء طبيعي من اللعبة. الكارثة تبدأ عندما تدفعك الرغبة في الانتقام لمضاعفة المخاطرة لتجد نفسك في هوة رياضية يستحيل الخروج منها. جرب تغيير نسبة الخسارة:
      </p>

      {/* Preset Stages Buttons */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {presets.map((p) => (
          <button
            key={p.loss}
            onClick={() => setLossPercent(p.loss)}
            className={`p-3 rounded-xl text-right border transition-all text-xs ${
              lossPercent === p.loss
                ? 'bg-amber-100/90 text-amber-950 border-amber-500 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-400 font-bold shadow-xs'
                : 'bg-white/70 dark:bg-stone-950/40 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-red-600 dark:text-red-400 font-bold">-{p.loss}%</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">{p.recovery}</span>
            </div>
            <div className="text-[11px] font-semibold truncate">{p.label}</div>
            <div className="text-[10px] text-stone-400 truncate mt-0.5">{p.mood}</div>
          </button>
        ))}
      </div>

      {/* Interactive Slider */}
      <div className="mt-6 rounded-xl border border-stone-200/60 bg-white p-4 dark:border-stone-800/60 dark:bg-stone-950/40">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor={lossSliderId} className="text-xs font-semibold text-stone-700 dark:text-stone-300">
            نسبة تراجع الحساب الحالية (Drawdown):
          </label>
          <span className="text-base font-mono font-bold text-red-600 dark:text-red-400">
            -{lossPercent}%
          </span>
        </div>

        <input
          id={lossSliderId}
          type="range"
          min="1"
          max="60"
          value={lossPercent}
          onChange={(e) => setLossPercent(Number(e.target.value))}
          className="w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-hidden"
        />

        <div className="flex justify-between text-[10px] text-stone-400 mt-1">
          <span>-1% (مخاطرة آمنة)</span>
          <span>-15% (منطقة خطر)</span>
          <span>-30% (انهيار جزئي)</span>
          <span>-60% (تدمير شبه كامل)</span>
        </div>
      </div>

      {/* Numerical Results Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl border border-stone-200/70 bg-white dark:border-stone-800/70 dark:bg-stone-950/40">
          <span className="text-[11px] text-stone-500 dark:text-stone-400 block mb-1">الرصيد المتبقي</span>
          <div className="text-lg md:text-xl font-bold font-mono text-stone-900 dark:text-stone-100 flex items-center">
            <DollarSign className="h-4 w-4 text-stone-400" />
            {currentBalance.toLocaleString()}
          </div>
          <span className="text-[10px] text-red-500 font-mono mt-0.5 block">
            خسارة: -${moneyLost.toLocaleString()}
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-amber-200/80 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/20">
          <span className="text-[11px] text-amber-800 dark:text-amber-300 block mb-1">الربح المطلوب للتعافي فقط</span>
          <div className="text-lg md:text-xl font-bold font-mono text-amber-900 dark:text-amber-200 flex items-center gap-1">
            <ArrowUpRight className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            +{requiredGainPercent.toFixed(1)}%
          </div>
          <span className="text-[10px] text-amber-700 dark:text-amber-400 mt-0.5 block">
            فقط للعودة لنقطة الصفر (Breakeven)!
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-stone-200/70 bg-white dark:border-stone-800/70 dark:bg-stone-950/40">
          <span className="text-[11px] text-stone-500 dark:text-stone-400 block mb-1">مستوى الصعوبة النفسية</span>
          <div className="text-sm font-bold text-stone-800 dark:text-stone-200 mt-1">
            {lossPercent <= 5 ? (
              <span className="text-emerald-600 dark:text-emerald-400">سهل جداً (صفقة أو اثنتان منضبطتان)</span>
            ) : lossPercent <= 15 ? (
              <span className="text-amber-600 dark:text-amber-400">متوسط (يحتاج أسبوعين من الانضباط)</span>
            ) : lossPercent <= 30 ? (
              <span className="text-orange-600 dark:text-orange-400">صعب جداً (ضغط نفسي رهيب)</span>
            ) : (
              <span className="text-red-600 dark:text-red-400">شبه مستحيل بدون مقامرة مدمرة</span>
            )}
          </div>
          <span className="text-[10px] text-stone-400 mt-1 block">
            كلما زاد التراجع، تضاعفت صعوبة التعافي هندسياً
          </span>
        </div>
      </div>
    </div>
  );
}
