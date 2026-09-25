import { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, XCircle, Power, Clock, ArrowRight } from 'lucide-react';

export default function TrafficLightStateProtocol() {
  const [selectedZone, setSelectedZone] = useState<'green' | 'yellow' | 'red'>('green');

  const protocols = {
    green: {
      title: 'الحالة الخضراء (Green Zone)',
      badge: 'جاهزية تداول قياسية',
      color: 'emerald',
      symptoms: [
        'هدوء فسيولوجي تام (تنفس منتظم، عضلات فك وكتفين مسترخية).',
        'تركيز ذهني حاضر، خلو الذاكرة العاملة من أي خسارة سابقة.',
        'غياب رغبة الانتقام أو التعويض؛ التداول بعقلية الاحتمالات الإحصائية.',
        'رؤية الشارت بموضوعية وتطابق الإدراك مع القواعد الفنية.'
      ],
      directives: [
        'تنفيذ الصفقات المطابقة للخطة (A و A+) بالحجم الطبيعي.',
        'الالتزام بقواعد إدارة رأس المال المقررة.',
        'متابعة الجلسة مع فحص الحالة النفسية كل 60 دقيقة.'
      ],
      quote: '«أنا في حالة توازن؛ أتعامل مع ما يقدمه السوق بحيادية دون فرض رغباتي عليه.»'
    },
    yellow: {
      title: 'الحالة الصفراء (Yellow Zone)',
      badge: 'انتقائية استثنائية مشددة',
      color: 'amber',
      symptoms: [
        'توتر خفيف، استعجال غير مبرر، أو شعور بالملل بعد انتظار طويل.',
        'تفكير متكرر بصفقة سابقة خسرتها أو صفقة فائتة صعدت بدونك.',
        'تغيرات جسدية طفيفة: سرعة نقر الماوس، الاقتراب أكثر من الشاشة.',
        'ميل خفي لتبرير الدخول في صفقات متوسطة (B Setup).'
      ],
      directives: [
        'رفع معيار الدخول فوراً: فرصة A+ النادرة والمثالية فقط، أو لا تداول!',
        'تقليص حجم العقد (Position Size) بنسبة 50% لحماية رأس المال.',
        'فرض وقت انتظار إجباري (Cooldown) لمدة 15 دقيقة قبل أي نقرة تنفيذ.',
        'تذكّر: الحفاظ على رأس المال عند تراجع حالتك هو قمة الاحتراف.'
      ],
      quote: '«طاقتي ليست في ذروتها اليوم؛ معيار الـ A+ فقط هو حزام الأمان الذي يحميني من نفسي.»'
    },
    red: {
      title: 'الحالة الحمراء (Red Zone)',
      badge: 'إغلاق المنصة الإجباري فوراً',
      color: 'rose',
      symptoms: [
        'غضب عارم، رغبة هستيرية في تعويض خسارة سابقة في نفس الجلسة.',
        'FOMO حاد، شعور بالاختناق وتشنج في الفك والرقبة وخفقان قلب سريع.',
        'تجاهل كامل لقواعد الاستراتيجية ووقف الخسارة، والتفكير بمضاعفة اللوت.',
        'انغلاق الإدراك في نفق ضيق: رؤية الشارت كعدو شخصي يجب هزيمته!'
      ],
      directives: [
        'تفعيل فرامل الطوارئ (Circuit Breaker): إغلاق منصة التداول والـ MetaTrader فوراً.',
        'الابتعاد الجسدي عن شاشة الكمبيوتر والهاتف لمدة ساعتين على الأقل.',
        'ممنوع فتح أي صفقة جديدة تحت أي ذريعة أو مبرر تحليلي.',
        'تدوين تفاصيل المحفز والمشاعر في المفكرة بعد أن يهدأ الجهاز العصبي.'
      ],
      quote: '«الانسحاب الآن ليس هزيمة؛ بل هو القرار الوحيد الذي يمنع تصفير الحساب ويضمن بقائي في السوق.»'
    }
  };

  const active = protocols[selectedZone];

  return (
    <div className="my-8 rounded-2xl border border-stone-200/90 bg-white p-5 md:p-7 shadow-sm dark:border-stone-800 dark:bg-stone-900/60">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4 dark:border-stone-800/80 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 mb-1">
            <Shield className="h-3.5 w-3.5" />
            <span>نظام إشارات المرور السريري المسبق</span>
          </div>
          <h4 className="text-base md:text-lg font-bold text-stone-900 dark:text-stone-100">
            مصفوفة إدارة الحالة (State Management Protocol): قواعد تُكتب قبل الانفعال
          </h4>
        </div>
        <span className="text-xs text-stone-500 dark:text-stone-400">
          «القرار يُحدد مسبقاً على البارد وليس في لهيب المعركة»
        </span>
      </div>

      {/* Traffic Light Selector */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
        <button
          type="button"
          onClick={() => setSelectedZone('green')}
          className={`py-3 px-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
            selectedZone === 'green'
              ? 'border-emerald-500 bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/40 shadow-sm font-bold'
              : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-emerald-400'
          }`}
        >
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-xs" />
          <span className="text-xs md:text-sm font-bold">الحالة الخضراء</span>
          <span className="text-[10px] opacity-75">تنفيذ طبيعي</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedZone('yellow')}
          className={`py-3 px-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
            selectedZone === 'yellow'
              ? 'border-amber-500 bg-amber-500/15 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200 ring-2 ring-amber-500/40 shadow-sm font-bold'
              : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-amber-400'
          }`}
        >
          <div className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-xs" />
          <span className="text-xs md:text-sm font-bold">الحالة الصفراء</span>
          <span className="text-[10px] opacity-75">A+ فقط وتحفظ</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedZone('red')}
          className={`py-3 px-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
            selectedZone === 'red'
              ? 'border-rose-500 bg-rose-500/15 dark:bg-rose-500/20 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/40 shadow-sm font-bold'
              : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-rose-400'
          }`}
        >
          <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-xs" />
          <span className="text-xs md:text-sm font-bold">الحالة الحمراء</span>
          <span className="text-[10px] opacity-75">توقف تام فوري</span>
        </button>
      </div>

      {/* Protocol Display Area */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          selectedZone === 'green'
            ? 'bg-emerald-500/5 border-emerald-500/30'
            : selectedZone === 'yellow'
            ? 'bg-amber-500/5 border-amber-500/30'
            : 'bg-rose-500/5 border-rose-500/30'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-2">
            {selectedZone === 'green' && <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
            {selectedZone === 'yellow' && <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
            {selectedZone === 'red' && <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />}
            <h5 className="font-bold text-sm md:text-base text-stone-900 dark:text-stone-100">
              {active.title}
            </h5>
          </div>
          <span
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
              selectedZone === 'green'
                ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                : selectedZone === 'yellow'
                ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300'
                : 'bg-rose-500/20 text-rose-800 dark:text-rose-300'
            }`}
          >
            {active.badge}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
          {/* Symptoms */}
          <div>
            <h6 className="text-xs font-bold text-stone-800 dark:text-stone-200 mb-2 flex items-center gap-1.5">
              <span>الأعراض والتشخيص السلوكي:</span>
            </h6>
            <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 leading-relaxed pr-2">
              {active.symptoms.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-stone-400 mt-1">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Operational Directives */}
          <div>
            <h6 className="text-xs font-bold text-stone-800 dark:text-stone-200 mb-2 flex items-center gap-1.5">
              <span>الإجراءات التنفيذية الإلزامية:</span>
            </h6>
            <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-200 leading-relaxed pr-2 font-medium">
              {active.directives.map((d, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold mt-0.5">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mantra Quote */}
        <div className="pt-3 border-t border-black/5 dark:border-white/5 text-center text-xs font-semibold italic text-stone-700 dark:text-stone-300">
          {active.quote}
        </div>
      </div>
    </div>
  );
}
