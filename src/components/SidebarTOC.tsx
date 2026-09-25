import { Chapter } from '../data/bookContent';
import { BookOpen, X, BookmarkCheck, Compass, Layers } from 'lucide-react';

interface Props {
  chapters: Chapter[];
  activeChapterId: string;
  onSelectChapter: (id: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  savedBookmarkId: string | null;
  onSaveBookmark: (id: string) => void;
}

export default function SidebarTOC({
  chapters,
  activeChapterId,
  onSelectChapter,
  isOpenMobile,
  onCloseMobile,
  savedBookmarkId,
  onSaveBookmark,
}: Props) {
  const content = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
            فهرس فصول الكتاب
          </span>
        </div>

        {/* Close button on mobile */}
        <button
          onClick={onCloseMobile}
          className="md:hidden p-1 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          aria-label="إغلاق الفهرس"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Chapters list */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1.5 focus:outline-hidden">
        {chapters.map((chapter) => {
          const isActive = activeChapterId === chapter.id;
          const isBookmarked = savedBookmarkId === chapter.id;
          const showPartHeader = chapter.number === 1 || chapter.number === 12 || chapter.number === 20 || chapter.number === 30 || chapter.number === 39 || chapter.number === 47 || chapter.number === 55;

          return (
            <div key={chapter.id}>
              {showPartHeader && (
                <div className="pt-3.5 pb-1 px-2 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5 border-t border-stone-100 dark:border-stone-800/60 mt-2 first:border-t-0 first:mt-0">
                  <Layers className="h-3 w-3 shrink-0" />
                  <span className="truncate">{chapter.partTitle}</span>
                </div>
              )}

              <div
                className={`group flex items-center justify-between rounded-xl p-2.5 transition-all text-xs cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-900 font-bold dark:bg-amber-500/15 dark:text-amber-200 border-r-3 border-amber-500 shadow-2xs'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800/60 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
                onClick={() => {
                  onSelectChapter(chapter.id);
                  onCloseMobile();
                }}
              >
                <div className="flex items-start gap-2.5 min-w-0 pr-1">
                  <span
                    className={`font-mono text-[11px] shrink-0 mt-0.5 ${
                      isActive
                        ? 'text-amber-700 dark:text-amber-400 font-bold'
                        : 'text-stone-400 dark:text-stone-500'
                    }`}
                  >
                    {chapter.number.toString().padStart(2, '0')}.
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-medium">{chapter.shortTitle}</div>
                    <div className="text-[10px] text-stone-400 dark:text-stone-500">
                      {chapter.readTime}
                    </div>
                  </div>
                </div>

                {/* Bookmark affordance button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSaveBookmark(chapter.id);
                  }}
                  title={isBookmarked ? 'علامة القراءة محفوظة هنا' : 'احفظ مكانك هنا كإشارة مرجعية'}
                  className={`p-1 rounded-md transition-colors ${
                    isBookmarked
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-stone-300 dark:text-stone-600 opacity-0 group-hover:opacity-100 hover:text-amber-500'
                  }`}
                >
                  <BookmarkCheck className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-3 border-t border-stone-200/80 dark:border-stone-800/80 text-[11px] text-stone-500 dark:text-stone-400 flex items-center justify-between">
        <span>29 فصلاً تفاعلياً (3 أجزاء)</span>
        {savedBookmarkId && (
          <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
            علامة محفوظة ✓
          </span>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-80 shrink-0">
        <div className="sticky top-20 rounded-2xl border border-stone-200/80 bg-white/70 dark:border-stone-800/80 dark:bg-stone-900/60 backdrop-blur-md max-h-[calc(100vh-6rem)] overflow-hidden shadow-xs flex flex-col">
          {content}
        </div>
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 w-84 max-w-[88vw] bg-white dark:bg-stone-900 shadow-2xl z-10 flex flex-col">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
