import { useState, useEffect } from 'react';
import Header from './components/Header';
import BookHero from './components/BookHero';
import SidebarTOC from './components/SidebarTOC';
import BookChapterView from './components/BookChapterView';
import StandaloneHtmlModal from './components/StandaloneHtmlModal';
import { CHAPTERS, BOOK_METADATA } from './data/bookContent';
import { ambientSound } from './utils/ambientAudio';
import { ArrowUp, BookmarkCheck, Heart, Sparkles, Code2, Download, Award, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Reading progress state
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Active chapter state
  const [activeChapterId, setActiveChapterId] = useState<string>('chapter-1');

  // Font size state
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>(() => {
    return (localStorage.getItem('app_font_size') as 'small' | 'medium' | 'large') || 'medium';
  });

  // Bookmark state
  const [savedBookmarkId, setSavedBookmarkId] = useState<string | null>(() => {
    return localStorage.getItem('app_bookmark_chapter');
  });

  // UI state
  const [isMobileTOCOpen, setIsMobileTOCOpen] = useState<boolean>(false);
  const [isStandaloneModalOpen, setIsStandaloneModalOpen] = useState<boolean>(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [showResumeToast, setShowResumeToast] = useState<boolean>(false);
  const [hasCompletedCelebration, setHasCompletedCelebration] = useState<boolean>(false);

  // Theme effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('app_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('app_theme', 'light');
    }
  }, [isDark]);

  // Auto-restore scroll position on page load
  useEffect(() => {
    const savedPos = localStorage.getItem('app_last_scroll_pos');
    if (savedPos && Number(savedPos) > 150) {
      const timer = setTimeout(() => {
        window.scrollTo({
          top: Number(savedPos),
          behavior: 'smooth'
        });
        setShowResumeToast(true);
        const hideTimer = setTimeout(() => {
          setShowResumeToast(false);
        }, 2200);
        return () => clearTimeout(hideTimer);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, []);

  // Scroll listener for reading progress, scroll-to-top button & auto-saving scroll position
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
      setShowScrollTop(winScroll > 600);

      // Throttled scroll position save
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          if (winScroll > 100) {
            localStorage.setItem('app_last_scroll_pos', winScroll.toString());
          }
          timeoutId = null;
        }, 250);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Intersection Observer for Active Chapter Tracking in TOC
  useEffect(() => {
    const chapterElements = CHAPTERS.map((ch) => document.getElementById(ch.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapterId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0,
      }
    );

    chapterElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Toggle Theme
  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  // Toggle Font Size
  const toggleFontSize = () => {
    const nextSize = fontSize === 'small' ? 'medium' : fontSize === 'medium' ? 'large' : 'small';
    setFontSize(nextSize);
    localStorage.setItem('app_font_size', nextSize);
  };

  // Bookmark Save
  const handleSaveBookmark = (chapterId: string) => {
    if (savedBookmarkId === chapterId) {
      setSavedBookmarkId(null);
      localStorage.removeItem('app_bookmark_chapter');
    } else {
      setSavedBookmarkId(chapterId);
      localStorage.setItem('app_bookmark_chapter', chapterId);
    }
  };

  // Go to Bookmark
  const handleGoToBookmark = () => {
    if (savedBookmarkId) {
      scrollToChapter(savedBookmarkId);
    }
  };

  // Scroll to Chapter
  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveChapterId(id);
    }
  };

  // Toggle Ambient Focus Sound
  const handleToggleSound = () => {
    const status = ambientSound.toggle();
    setIsSoundPlaying(status);
  };

  // Scroll to top
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger celebration confetti
  const handleFinishBook = () => {
    setHasCompletedCelebration(true);
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'] });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 dark:bg-[#0C0F12] dark:text-stone-100 transition-colors flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-900 dark:selection:bg-amber-400/30 dark:selection:text-amber-200">
      {/* Top Header */}
      <Header
        scrollProgress={scrollProgress}
        isDark={isDark}
        onToggleDark={toggleDark}
        fontSize={fontSize}
        onChangeFontSize={toggleFontSize}
        onOpenMobileTOC={() => setIsMobileTOCOpen(true)}
        onOpenStandaloneModal={() => setIsStandaloneModalOpen(true)}
        isSoundPlaying={isSoundPlaying}
        onToggleSound={handleToggleSound}
      />

      {/* Hero Book Section */}
      <BookHero
        onStartReading={() => scrollToChapter('chapter-1')}
        savedBookmarkId={savedBookmarkId}
        onGoToBookmark={handleGoToBookmark}
      />

      {/* Main Reading Layout Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex-1 w-full">
        <div className="flex gap-8 lg:gap-12">
          {/* Sticky Sidebar Table of Contents */}
          <SidebarTOC
            chapters={CHAPTERS}
            activeChapterId={activeChapterId}
            onSelectChapter={scrollToChapter}
            isOpenMobile={isMobileTOCOpen}
            onCloseMobile={() => setIsMobileTOCOpen(false)}
            savedBookmarkId={savedBookmarkId}
            onSaveBookmark={handleSaveBookmark}
          />

          {/* Reading Column (Max 750px measure for optimal eye tracking) */}
          <main className="flex-1 min-w-0 max-w-3xl mx-auto">
            {CHAPTERS.map((chapter) => (
              <BookChapterView
                key={chapter.id}
                chapter={chapter}
                fontSize={fontSize}
              />
            ))}

            {/* Book End / Conclusion Banner with Gamified Finish Button */}
            <div className="my-14 rounded-3xl border-2 border-amber-500/30 bg-gradient-to-b from-amber-500/5 via-stone-100/60 to-amber-500/10 p-7 md:p-10 dark:border-amber-500/20 dark:from-stone-900/60 dark:to-stone-950/80 text-center shadow-lg">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest text-amber-800 dark:text-amber-300 font-bold bg-amber-500/15 mb-3">
                <Award className="h-4 w-4" />
                <span>وسام الإنجاز والاحتراف 🏅</span>
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
                أنت الآن تملك الخريطة النفسية والسريرية الكاملة!
              </h3>
              <p className="mt-3 text-sm md:text-base text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
                أكملت بنجاح دراسة 63 فصلاً متكاملاً في سيكولوجية التداول، إدارة الحالة، كيمياء الذاكرة العاملة، وتشريح السلوك الميداني.
              </p>

              {/* Confetti Finish Button */}
              <div className="my-6">
                <button
                  type="button"
                  onClick={handleFinishBook}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-extrabold bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all ring-4 ring-amber-500/20"
                >
                  <Sparkles className="h-5 w-5 animate-spin" />
                  <span>أنهيت الكتاب 🎉</span>
                </button>
              </div>

              {/* Completion Thank You Message Card */}
              {hasCompletedCelebration && (
                <div className="my-6 p-5 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100 max-w-xl mx-auto text-right space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-base text-emerald-800 dark:text-emerald-300">
                    <Award className="h-5 w-5 shrink-0" />
                    <span>🎓 مبارك إتمام الموسوعة التفاعلية بالكامل!</span>
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed opacity-95">
                    شكراً لالتزامك بتطوير عقليتك الاستثمارية. تذكر دائماً الوصية الخالدة: <em>«أنت لا تحتاج أن تكون في أفضل حالة حتى تتداول، لكن تحتاج أن تعرف حالتك حتى تعرف كيف تتداول.»</em> التزم بفرامل الطوارئ، واحمِ رأس مالك دائماً!
                  </p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-stone-200/80 dark:border-stone-800 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleScrollTop}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity"
                >
                  <ArrowUp className="h-4 w-4" />
                  <span>العودة لأعلى الكتاب</span>
                </button>

                <button
                  onClick={() => setIsStandaloneModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>تحميل كملف HTML مستقل (Single-file)</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Auto-Save Scroll Position Toast Notification */}
      {showResumeToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-stone-900/95 text-white dark:bg-stone-100 dark:text-stone-900 shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs md:text-sm font-bold border border-amber-500/40 animate-bounce transition-all">
          <MapPin className="h-4 w-4 text-amber-400 dark:text-amber-600 animate-pulse" />
          <span>تمت العودة إلى حيث توقفت 📍</span>
        </div>
      )}

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          aria-label="العودة لأعلى الصفحة"
          className="fixed bottom-6 left-6 z-30 p-3 rounded-full bg-amber-600 text-white shadow-lg hover:bg-amber-700 transition-all focus:outline-hidden"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Single-file HTML Modal */}
      <StandaloneHtmlModal
        isOpen={isStandaloneModalOpen}
        onClose={() => setIsStandaloneModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-stone-200/80 bg-stone-100/30 dark:border-stone-800/80 dark:bg-stone-950/40 py-8 px-4 sm:px-6 transition-colors">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-800 dark:text-stone-200">سيكولوجية التداول: الكتاب التفاعلي</span>
            <span>·</span>
            <span>مبني بتقنيات الويب الحديثة</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsStandaloneModalOpen(true)}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>كود Single-File HTML</span>
            </button>
            <span>·</span>
            <span>النسخة التفاعلية 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
