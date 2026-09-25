import { useState } from 'react';
import { generateStandaloneHtml } from '../utils/generateStandaloneHtml';
import { X, Copy, Check, Download, ExternalLink, Code2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function StandaloneHtmlModal({ isOpen, onClose }: Props) {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const htmlCode = generateStandaloneHtml();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trading-psychology-interactive-book.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOpenRaw = () => {
    window.open('/single-file-book.html', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-stone-900 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              كود صفحة HTML الواحدة (Single-file Ready)
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              ملف HTML واحد مستقل ومدمج بالكامل (HTML + CSS + Vanilla JS) جاهز للاستضافة المباشرة أو الفتح محلياً دون أي خادم.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 py-3 border-b border-stone-100 dark:border-stone-800/80">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-600 text-white hover:bg-amber-700 transition-colors shadow-xs"
          >
            <Download className="h-4 w-4" />
            <span>تحميل ملف HTML (.html)</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors border border-stone-200 dark:border-stone-700"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'تم نسخ الكود بالكامل!' : 'نسخ الكود بالكامل'}</span>
          </button>

          <button
            onClick={handleOpenRaw}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors mr-auto"
          >
            <ExternalLink className="h-4 w-4" />
            <span>معاينة في تبويب جديد</span>
          </button>
        </div>

        {/* Code Preview */}
        <div className="flex-1 overflow-hidden my-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-950 p-3">
          <pre className="h-full overflow-y-auto text-[11px] font-mono text-stone-300 direction-ltr text-left select-all">
            {htmlCode.slice(0, 3000)}...
            {"\n\n/* [بقية الكود مدمج في ملف التحميل أو الحافظة (الحجم الكامل: " + Math.round(htmlCode.length / 1024) + " كيلوبايت)] */"}
          </pre>
        </div>

        {/* Footer info */}
        <div className="text-[11px] text-stone-500 dark:text-stone-400 pt-2 flex items-center justify-between">
          <span>يحتوي على: شريط التقدم، الوضع الداكن، الفهرس العائم، IntersectionObserver، ومحاكي Yerkes-Dodson.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
