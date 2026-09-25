import { Sun, Moon, Type, Menu, Download, Bookmark, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface Props {
  scrollProgress: number;
  isDark: boolean;
  onToggleDark: () => void;
  fontSize: 'small' | 'medium' | 'large';
  onChangeFontSize: () => void;
  onOpenMobileTOC: () => void;
  onOpenStandaloneModal: () => void;
  isSoundPlaying: boolean;
  onToggleSound: () => void;
}

export default function Header({
  scrollProgress,
  isDark,
  onToggleDark,
  fontSize,
  onChangeFontSize,
  onOpenMobileTOC,
  onOpenStandaloneModal,
  isSoundPlaying,
  onToggleSound,
}: Props) {
  const getFontSizeLabel = () => {
    switch (fontSize) {
      case 'small':
        return 'خط: صغير';
      case 'large':
        return 'خط: كبير';
      default:
        return 'خط: متوسط';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-[#FBF9F5]/90 dark:border-stone-800/80 dark:bg-[#0C0F12]/90 backdrop-blur-md transition-colors">
      {/* Top Reading Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-stone-200/50 dark:bg-stone-800/50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Bar: Top Bar Contract - 3 Zones */}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Zone 1: Wordmark Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileTOC}
            className="lg:hidden p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="فتح فهرس الكتاب"
          >
            <Menu className="h-5 w-5" />
          </button>

          <a href="#" className="text-base sm:text-lg font-extrabold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>سيكولوجية التداول</span>
          </a>
        </div>

        {/* Zone 2: Reading status / Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-xs text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1.5 font-medium">
            <span>تقدم القراءة:</span>
            <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{Math.round(scrollProgress)}%</span>
          </span>
          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
          <span>قانون Yerkes-Dodson</span>
          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
          <span>إدارة المشاعر التداولية</span>
        </div>

        {/* Zone 3: Interactive Actions */}
        <div className="flex items-center gap-2">
          {/* Ambient Sound Generator (Gentle focus brown noise) */}
          <button
            onClick={onToggleSound}
            title={isSoundPlaying ? 'إيقاف الصوت المحيطي للتركيز' : 'تشغيل صوت محيطي هادئ لتعزيز التركيز أثناء القراءة'}
            className={`p-2 rounded-lg text-xs transition-colors border ${
              isSoundPlaying
                ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-700'
                : 'text-stone-600 dark:text-stone-300 border-transparent hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
            aria-label="التحكم في الصوت المحيطي"
          >
            {isSoundPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-stone-400" />}
          </button>

          {/* Font Size Toggle */}
          <button
            onClick={onChangeFontSize}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="تغيير حجم خط القراءة"
          >
            <Type className="h-3.5 w-3.5" />
            <span>{getFontSizeLabel()}</span>
          </button>

          {/* Single-file HTML Download / Export modal trigger */}
          <button
            onClick={onOpenStandaloneModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors shadow-2xs whitespace-nowrap"
            title="تحميل أو نسخ نسخة HTML المستقلة بملف واحد"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">نسخة Single-file</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleDark}
            className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="التبديل بين الوضع الداكن والفاتح"
            title={isDark ? 'التحويل إلى الوضع النهاري' : 'التحويل إلى الوضع الليلي'}
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-stone-600" />}
          </button>
        </div>
      </div>
    </header>
  );
}
