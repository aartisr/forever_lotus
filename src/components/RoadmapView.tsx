import React, { useState } from 'react';
import { 
  Calendar, 
  CheckSquare, 
  Square, 
  Target, 
  Compass, 
  ArrowRight, 
  Sparkles, 
  Award, 
  Layers, 
  CheckCircle2
} from 'lucide-react';
import { ROADMAP_PHASES } from '../data/evaluationData';

export const RoadmapView: React.FC = () => {
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});

  const toggleMilestone = (key: string) => {
    setCompletedMilestones(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const totalMilestones = ROADMAP_PHASES.reduce((acc, p) => acc + p.milestones.length, 0);
  const checkedCount = Object.values(completedMilestones).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / totalMilestones) * 100);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-xl p-6 sm:p-8 border border-stone-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono-code text-amber-400">
              <span className="px-2.5 py-0.5 rounded bg-amber-950 border border-amber-800 uppercase">
                Strategic Horizon
              </span>
              <span>•</span>
              <span className="text-stone-400">16-Week Chronological Execution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-50">
              The Nobel-Cadre Transformation Roadmap
            </h2>
            <p className="text-stone-300 font-serif-body text-base max-w-3xl leading-relaxed">
              A systematic four-phase operational progression moving Forever Lotus from a declarative static website
              to a living, peer-reviewed global institution of moral architecture.
            </p>
          </div>

          {/* Interactive Progress Meter */}
          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 min-w-[220px] text-center sm:text-right">
            <span className="text-xs font-mono-code text-stone-400 uppercase tracking-wider block">
              Simulation Progress
            </span>
            <div className="flex items-baseline justify-center sm:justify-end gap-2 mt-1">
              <span className="text-3xl font-display font-bold text-amber-400">
                {progressPercent}%
              </span>
              <span className="text-xs font-mono-code text-stone-500">
                ({checkedCount}/{totalMilestones} Milestones)
              </span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Phases Stack */}
      <div className="space-y-8">
        {ROADMAP_PHASES.map((phase) => (
          <div
            key={phase.phaseNumber}
            className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6"
          >
            {/* Phase Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-900 text-amber-100 font-mono-code text-xs flex items-center justify-center font-bold">
                    {phase.phaseNumber}
                  </span>
                  <span className="text-xs font-mono-code text-amber-800 font-semibold uppercase">
                    {phase.timeframe}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900">
                  {phase.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono-code text-stone-500">
                  {phase.theme}
                </p>
              </div>

              <div className="bg-stone-50 px-4 py-2 rounded-lg border border-stone-200 text-xs font-mono-code text-stone-600 max-w-sm">
                <span className="font-semibold text-stone-900 block mb-0.5">Core Objective:</span>
                <span className="font-serif-body text-stone-600 leading-relaxed">
                  {phase.corePhilosophy}
                </span>
              </div>
            </div>

            {/* Milestones in this phase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {phase.milestones.map((milestone, mIdx) => {
                const milestoneKey = `p${phase.phaseNumber}-m${mIdx}`;
                const isChecked = !!completedMilestones[milestoneKey];

                return (
                  <div
                    key={mIdx}
                    className={`rounded-xl p-5 border transition-all space-y-4 flex flex-col justify-between ${
                      isChecked
                        ? 'bg-emerald-50/40 border-emerald-300 shadow-xs'
                        : 'bg-stone-50/60 border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono-code px-2 py-0.5 rounded bg-stone-200/80 text-stone-700 font-medium">
                          {milestone.week}
                        </span>
                        <button
                          onClick={() => toggleMilestone(milestoneKey)}
                          className="flex items-center gap-1.5 text-xs font-mono-code text-stone-600 hover:text-stone-900 transition-colors"
                        >
                          {isChecked ? (
                            <>
                              <CheckSquare className="w-4 h-4 text-emerald-600" />
                              <span className="text-emerald-700 font-semibold">Implemented</span>
                            </>
                          ) : (
                            <>
                              <Square className="w-4 h-4 text-stone-400" />
                              <span className="text-stone-400">Mark Simulated</span>
                            </>
                          )}
                        </button>
                      </div>

                      <h4 className="text-base font-display font-bold text-stone-900">
                        {milestone.title}
                      </h4>

                      {/* Deliverables Checklist */}
                      <ul className="mt-3 space-y-2 text-xs text-stone-700 font-serif-body">
                        {milestone.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <span className="text-amber-700 mt-0.5">•</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Standard & KPI footer */}
                    <div className="pt-3 border-t border-stone-200/60 space-y-1.5 text-[11px] font-mono-code">
                      <div className="text-amber-900 flex items-center gap-1.5">
                        <Award className="w-3 h-3 text-amber-700 shrink-0" />
                        <span>Standard: {milestone.nobelStandardAchieved}</span>
                      </div>
                      <div className="text-stone-500 flex items-center gap-1.5">
                        <Target className="w-3 h-3 text-stone-400 shrink-0" />
                        <span>KPI: {milestone.kpi}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
