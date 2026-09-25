import { ArrowDown, BookOpen, Clock, Layers, Sparkles } from 'lucide-react';
import { BOOK_METADATA } from '../data/bookContent';
import heroImage from '../assets/images/trading_psychology_hero_1790316974769.jpg';

interface Props {
  onStartReading: () => void;
  savedBookmarkId: string | null;
  onGoToBookmark: () => void;
}

export default function BookHero({ onStartReading, savedBookmarkId, onGoToBookmark }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-stone-100/60 to-[#FBF9F5] dark:from-stone-900/40 dark:to-[#0C0F12] pb-12 pt-10 md:pt-16 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Title & Editorial intro (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Zero-Pill unboxed metadata as required by skill */}
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-stone-500 dark:text-stone-400">
              <span className="font-semibold text-amber-700 dark:text-amber-400">
                {BOOK_METADATA.author}
              </span>
              <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{BOOK_METADATA.estimatedReadTime}</span>
              </span>
              <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
              <span className="flex items-center gap-1">
                <Layers className="h-3.5 w-3.5" />
                <span>{BOOK_METADATA.totalChapters} فصول تفاعلية</span>
              </span>
              <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
              <span>{BOOK_METADATA.edition}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50 leading-[1.25] text-balance">
              {BOOK_METADATA.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal max-w-2xl">
              {BOOK_METADATA.subtitle}
            </p>

            {/* Visual quote accent */}
            <div className="border-r-2 border-amber-600/70 pr-4 text-xs sm:text-sm text-stone-500 dark:text-stone-400 italic">
              «أنت إنسان من دم وأعصاب، ولست ثلاجة LG. المشكلة ليست هل تشعر، بل هل يسمح مستوى شعورك بتنفيذ خطتك؟»
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onStartReading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-amber-600 text-white hover:bg-amber-700 transition-colors shadow-xs group"
              >
                <span>ابدأ القراءة التفاعلية</span>
                <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              {savedBookmarkId && (
                <button
                  onClick={onGoToBookmark}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors border border-stone-200 dark:border-stone-700"
                >
                  <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span>متابعة من الإشارة المرجعية</span>
                </button>
              )}
            </div>
          </div>

          {/* Cinematic Book Cover Presentation (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-xs sm:max-w-sm w-full rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-xl transition-transform duration-300 hover:scale-[1.02] bg-stone-900">
              {/* Cover Image with Fallback */}
              <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden relative">
                <img
                  src={heroImage}
                  alt="غلاف كتاب سيكولوجية التداول وقانون يركيز دودسون"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback container if image fails to render
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950 text-white text-center">
                          <span class="text-xs uppercase tracking-widest text-amber-400 mb-2">كتاب إلكتروني تفاعلي</span>
                          <h3 class="text-xl font-bold font-serif text-stone-100">سيكولوجية التداول</h3>
                          <p class="text-xs text-stone-400 mt-2">إدارة المشاعر وقانون Yerkes-Dodson</p>
                        </div>
                      `;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 right-3 left-3 text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 block">
                    INTERACTIVE MONOGRAPH
                  </span>
                  <div className="text-sm font-bold truncate">سيكولوجية التداول الحديثة</div>
                </div>
              </div>

              {/* Cover spine footer ribbon */}
              <div className="p-3 bg-stone-950 text-stone-300 text-[11px] flex items-center justify-between border-t border-stone-800">
                <span>نسخة رقمية تفاعلية</span>
                <span className="text-amber-400 font-mono">XAUUSD CASE STUDY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
