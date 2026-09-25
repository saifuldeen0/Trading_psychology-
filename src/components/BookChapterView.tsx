import { useState, useEffect, useRef } from 'react';
import { Chapter } from '../data/bookContent';
import YerkesDodsonInteractive from './YerkesDodsonInteractive';
import DoomSpiralVisualizer from './DoomSpiralVisualizer';
import CompoundingLossSimulator from './CompoundingLossSimulator';
import EmotionalTrafficLightScanner from './EmotionalTrafficLightScanner';
import PerformanceFormulaCalculator from './PerformanceFormulaCalculator';
import PrepVsBiasSimulator from './PrepVsBiasSimulator';
import PerformanceProfileBuilder from './PerformanceProfileBuilder';
import MacroTradingLoopVisualizer from './MacroTradingLoopVisualizer';
import WorkingMemorySimulator from './WorkingMemorySimulator';
import DecisionOutcomeMatrix from './DecisionOutcomeMatrix';
import EnergyTriadAnalyzer from './EnergyTriadAnalyzer';
import ModernJournalReviewTool from './ModernJournalReviewTool';
import CognitiveLoopCoolingVisualizer from './CognitiveLoopCoolingVisualizer';
import StrategyDiagnosticMatrix from './StrategyDiagnosticMatrix';
import TriggerToActionChainBuilder from './TriggerToActionChainBuilder';
import EarlyWarningRadar from './EarlyWarningRadar';
import PerceptionShiftLens from './PerceptionShiftLens';
import PhysicalTellsScanner from './PhysicalTellsScanner';
import NineStageChainVisualizer from './NineStageChainVisualizer';
import ZoneRealityTester from './ZoneRealityTester';
import RetrospectivePrepEvaluator from './RetrospectivePrepEvaluator';
import SequentialChainBreaker from './SequentialChainBreaker';
import RootCauseDiagnosticTool from './RootCauseDiagnosticTool';
import ClinicalJournalBuilder from './ClinicalJournalBuilder';
import StateSelectivitySimulator from './StateSelectivitySimulator';
import StimulationVsOpportunityRadar from './StimulationVsOpportunityRadar';
import TrafficLightStateProtocol from './TrafficLightStateProtocol';
import FullSystemMindMapViewer from './FullSystemMindMapViewer';
import { ChevronDown, BookOpen, Quote, AlertCircle, Info, CheckCircle2, Bookmark, Copy, Check } from 'lucide-react';

interface Props {
  chapter: Chapter;
  fontSize: 'small' | 'medium' | 'large';
}

function ClickableQuote({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy quote', e);
    }
  };

  return (
    <figure className="my-6 p-4 md:p-6 rounded-2xl border-r-4 border-amber-500 bg-gradient-to-l from-amber-500/5 via-amber-500/10 to-transparent dark:border-amber-400 dark:from-amber-500/10 dark:via-amber-500/15 reveal-on-scroll relative group shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <blockquote className="text-base md:text-xl font-medium text-stone-900 dark:text-stone-100 leading-relaxed italic flex gap-3 flex-1">
          <Quote className="h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400 rotate-180 opacity-70 mt-1" />
          <span>{text}</span>
        </blockquote>
        <button
          onClick={handleCopy}
          type="button"
          title="نسخ الاقتباس"
          aria-label="نسخ الاقتباس"
          className={`self-end sm:self-center shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            copied
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs scale-105'
              : 'bg-white/90 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>تم النسخ! ✔️</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>نسخ الاقتباس</span>
            </>
          )}
        </button>
      </div>
    </figure>
  );
}

export default function BookChapterView({ chapter, fontSize }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Set up Scroll Reveal Intersection Observer
  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll('.reveal-on-scroll');
    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [chapter]);

  // Typography scale classes based on font size setting
  const getProseClasses = () => {
    switch (fontSize) {
      case 'small':
        return 'text-sm md:text-base leading-relaxed md:leading-[1.8]';
      case 'large':
        return 'text-lg md:text-xl leading-loose md:leading-[2.1]';
      default:
        return 'text-base md:text-lg leading-relaxed md:leading-[1.9]';
    }
  };

  const isPartStart = chapter.number === 1 || chapter.number === 12 || chapter.number === 20 || chapter.number === 30 || chapter.number === 39 || chapter.number === 47 || chapter.number === 55;

  return (
    <article
      id={chapter.id}
      ref={containerRef}
      className="scroll-mt-24 pt-8 pb-16 border-b border-stone-200/80 dark:border-stone-800/80 last:border-b-0"
    >
      {/* Part Divider Banner if start of Part */}
      {isPartStart && (
        <div className="mb-8 pt-4 pb-3 border-b border-amber-500/30 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-bold tracking-wider">
            <Bookmark className="h-3.5 w-3.5" />
            <span>{chapter.partTitle}</span>
          </div>
        </div>
      )}

      {/* Chapter Header */}
      <header className="mb-8 reveal-on-scroll">
        <div className="flex items-center gap-3 text-xs md:text-sm text-stone-500 dark:text-stone-400 mb-2">
          <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
            الفصل {chapter.number.toString().padStart(2, '0')}
          </span>
          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>وقت القراءة: {chapter.readTime}</span>
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-snug">
          {chapter.title}
        </h2>

        <p className="mt-3 text-sm md:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
          {chapter.summary}
        </p>

        <div className="mt-5 h-px w-20 bg-amber-500/60 dark:bg-amber-400/50" />
      </header>

      {/* Chapter Sections */}
      <div className="space-y-7">
        {chapter.sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-5">
            {section.title && (
              <h3 className="text-lg md:text-xl font-bold text-stone-800 dark:text-stone-200 mt-6 reveal-on-scroll">
                {section.title}
              </h3>
            )}

            {/* Paragraphs */}
            {section.paragraphs.map((p, pIdx) => {
              const isDropCap = sIdx === 0 && pIdx === 0;
              return (
                <p
                  key={pIdx}
                  className={`${getProseClasses()} text-stone-700 dark:text-stone-300 reveal-on-scroll ${
                    isDropCap
                      ? 'first-letter:text-4xl md:first-letter:text-5xl first-letter:font-bold first-letter:text-amber-700 dark:first-letter:text-amber-400 first-letter:float-right first-letter:ml-3 first-letter:leading-none'
                      : ''
                  }`}
                >
                  {p}
                </p>
              );
            })}

            {/* Quote block */}
            {section.quote && (
              <ClickableQuote text={section.quote} />
            )}

            {/* Callout Box */}
            {section.callout && (
              <div
                className={`my-5 p-4 rounded-xl border reveal-on-scroll ${
                  section.callout.type === 'warning'
                    ? 'border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-200'
                    : section.callout.type === 'success'
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200'
                    : 'border-blue-500/30 bg-blue-500/10 text-blue-950 dark:text-blue-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
                  {section.callout.type === 'warning' && <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
                  {section.callout.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
                  {section.callout.type === 'info' && <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                  <span>{section.callout.title}</span>
                </div>
                <p className="text-xs md:text-sm leading-relaxed opacity-90">
                  {section.callout.text}
                </p>
              </div>
            )}

            {/* Custom Interactive Components */}
            {section.customComponent === 'yerkes' && (
              <div className="reveal-on-scroll">
                <YerkesDodsonInteractive />
              </div>
            )}

            {section.customComponent === 'doom-spiral' && (
              <div className="reveal-on-scroll">
                <DoomSpiralVisualizer />
              </div>
            )}

            {section.customComponent === 'loss-simulator' && (
              <div className="reveal-on-scroll">
                <CompoundingLossSimulator />
              </div>
            )}

            {section.customComponent === 'traffic-light' && (
              <div className="reveal-on-scroll">
                <EmotionalTrafficLightScanner />
              </div>
            )}

            {section.customComponent === 'performance-formula' && (
              <div className="reveal-on-scroll">
                <PerformanceFormulaCalculator />
              </div>
            )}

            {section.customComponent === 'prep-vs-bias' && (
              <div className="reveal-on-scroll">
                <PrepVsBiasSimulator />
              </div>
            )}

            {section.customComponent === 'profile-builder' && (
              <div className="reveal-on-scroll">
                <PerformanceProfileBuilder />
              </div>
            )}

            {section.customComponent === 'macro-loop' && (
              <div className="reveal-on-scroll">
                <MacroTradingLoopVisualizer />
              </div>
            )}

            {section.customComponent === 'working-memory' && (
              <div className="reveal-on-scroll">
                <WorkingMemorySimulator />
              </div>
            )}

            {section.customComponent === 'decision-matrix' && (
              <div className="reveal-on-scroll">
                <DecisionOutcomeMatrix />
              </div>
            )}

            {section.customComponent === 'energy-triad' && (
              <div className="reveal-on-scroll">
                <EnergyTriadAnalyzer />
              </div>
            )}

            {section.customComponent === 'journal-review' && (
              <div className="reveal-on-scroll">
                <ModernJournalReviewTool />
              </div>
            )}

            {section.customComponent === 'cognitive-cooling' && (
              <div className="reveal-on-scroll">
                <CognitiveLoopCoolingVisualizer />
              </div>
            )}

            {section.customComponent === 'strategy-diagnostic' && (
              <div className="reveal-on-scroll">
                <StrategyDiagnosticMatrix />
              </div>
            )}

            {section.customComponent === 'trigger-chain' && (
              <div className="reveal-on-scroll">
                <TriggerToActionChainBuilder />
              </div>
            )}

            {section.customComponent === 'early-warning' && (
              <div className="reveal-on-scroll">
                <EarlyWarningRadar />
              </div>
            )}

            {section.customComponent === 'perception-lens' && (
              <div className="reveal-on-scroll">
                <PerceptionShiftLens />
              </div>
            )}

            {section.customComponent === 'physical-tells' && (
              <div className="reveal-on-scroll">
                <PhysicalTellsScanner />
              </div>
            )}

            {section.customComponent === 'nine-stage-chain' && (
              <div className="reveal-on-scroll">
                <NineStageChainVisualizer />
              </div>
            )}

            {section.customComponent === 'zone-reality' && (
              <div className="reveal-on-scroll">
                <ZoneRealityTester />
              </div>
            )}

            {section.customComponent === 'retro-prep' && (
              <div className="reveal-on-scroll">
                <RetrospectivePrepEvaluator />
              </div>
            )}

            {section.customComponent === 'sequential-breaker' && (
              <div className="reveal-on-scroll">
                <SequentialChainBreaker />
              </div>
            )}

            {section.customComponent === 'root-cause' && (
              <div className="reveal-on-scroll">
                <RootCauseDiagnosticTool />
              </div>
            )}

            {section.customComponent === 'clinical-journal' && (
              <div className="reveal-on-scroll">
                <ClinicalJournalBuilder />
              </div>
            )}

            {section.customComponent === 'state-selectivity' && (
              <div className="reveal-on-scroll">
                <StateSelectivitySimulator />
              </div>
            )}

            {section.customComponent === 'stimulation-radar' && (
              <div className="reveal-on-scroll">
                <StimulationVsOpportunityRadar />
              </div>
            )}

            {section.customComponent === 'traffic-light-protocol' && (
              <div className="reveal-on-scroll">
                <TrafficLightStateProtocol />
              </div>
            )}

            {section.customComponent === 'full-system-mindmap' && (
              <div className="reveal-on-scroll">
                <FullSystemMindMapViewer />
              </div>
            )}

            {/* Custom Accordion Component (<details> & <summary>) */}
            {section.accordion && (
              <details className="group my-5 rounded-xl border border-stone-200/90 bg-white/70 dark:border-stone-800 dark:bg-stone-900/50 overflow-hidden transition-all duration-200 reveal-on-scroll shadow-2xs">
                <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer select-none font-semibold text-stone-900 dark:text-stone-100 hover:bg-stone-100/50 dark:hover:bg-stone-800/40 transition-colors">
                  <div className="flex items-center gap-2.5">
                    {section.accordion.tag && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-amber-500/15 text-amber-700 dark:text-amber-400">
                        {section.accordion.tag}
                      </span>
                    )}
                    <span className="text-sm md:text-base">{section.accordion.summary}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-stone-400 group-open:rotate-180 transition-transform duration-200 shrink-0" />
                </summary>
                <div className="px-4 pb-4 pt-1 text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800/60 bg-stone-50/40 dark:bg-stone-950/20">
                  <p>{section.accordion.content}</p>
                </div>
              </details>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
