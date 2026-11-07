import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, 
  Crown, 
  Database, 
  Binary, 
  Bug, 
  Sparkles, 
  Zap, 
  ChevronRight,
  Terminal,
  Layers
} from 'lucide-react';

interface TitleScreenProps {
  onStart: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleTriggerStart = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onStart();
    }, 600);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore modifier keys alone like Shift, Control, Alt, Meta
      if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
      handleTriggerStart();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExiting]);

  return (
    <div
      onClick={handleTriggerStart}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 select-none cursor-pointer bg-slate-950 text-white overflow-hidden transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Cyber Ambient Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.15),transparent_65%)] pointer-events-none" />
      
      {/* Subtle Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Corner HUD Reticles */}
      <div className="absolute top-6 left-8 text-[10px] font-mono text-slate-500 tracking-widest hidden sm:block">
        [ SYSTEM_ONLINE // RISKS_ENGINE_V2 ]
      </div>
      <div className="absolute top-6 right-8 text-[10px] font-mono text-sky-400/70 tracking-widest hidden sm:block flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>BACEN REGULATION ALIGNED</span>
      </div>
      <div className="absolute bottom-6 left-8 text-[10px] font-mono text-slate-600 hidden sm:block">
        PORT 3000 // AGENTIC SIMULATOR
      </div>
      <div className="absolute bottom-6 right-8 text-[10px] font-mono text-slate-600 hidden sm:block">
        EDITION 2026 // HIRE-READY
      </div>

      {/* Top Header Label */}
      <div className="relative pt-4 sm:pt-6 text-center space-y-1.5 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-sky-400 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Trilha Oficial de Preparação Técnica</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-300">Data Scientist I</span>
        </div>
      </div>

      {/* Center: Monumental Floating Glowing Logo / Emblem */}
      <div className="relative my-auto z-10 flex flex-col items-center max-w-2xl w-full px-4 text-center">
        {/* Floating wrapper with Boss-level glow */}
        <div className="boss-card-floating-wrapper w-full flex justify-center">
          <div className="title-logo-glow relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-purple-950/40 border border-purple-500/60 shadow-2xl backdrop-blur-xl flex flex-col items-center gap-6 max-w-lg w-full">
            
            {/* Glowing Top Aura Line */}
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-sky-500 via-purple-500 to-amber-500 rounded-full animate-pulse" />

            {/* Central Crest / Shield Icon */}
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="absolute -inset-2.5 rounded-2xl bg-gradient-to-r from-sky-500 via-purple-500 to-amber-400 opacity-40 blur-sm animate-pulse" />
              
              <div className="relative p-5 rounded-2xl bg-slate-950 border border-purple-500/80 text-white shadow-2xl flex items-center justify-center">
                <ShieldCheck className="w-12 h-12 text-sky-400" />
                <Crown className="w-6 h-6 text-amber-400 absolute -top-3 -right-2 transform rotate-12 drop-shadow-md" />
              </div>
            </div>

            {/* Main Application Title */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Simulador Agêntico de Riscos
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-md mx-auto leading-relaxed">
                Domine SQL bancário, modelagem em Python, depuração forense de código e enfrente a sabatina executiva com a banca de crédito.
              </p>
            </div>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full pt-1">
              <div className="p-2 rounded-xl bg-slate-950/70 border border-sky-900/50 text-center">
                <div className="text-xs font-bold text-sky-400 font-mono">12 SQL</div>
                <div className="text-[10px] text-slate-400">Transacional</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/70 border border-emerald-900/50 text-center">
                <div className="text-xs font-bold text-emerald-400 font-mono">12 Python</div>
                <div className="text-[10px] text-slate-400">Modelagem</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/70 border border-amber-900/50 text-center">
                <div className="text-xs font-bold text-amber-400 font-mono">6 Bugs</div>
                <div className="text-[10px] text-slate-400">Code Review</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/70 border border-purple-900/50 text-center">
                <div className="text-xs font-bold text-purple-300 font-mono">Boss Final</div>
                <div className="text-[10px] text-slate-400">4 Atos & Invertida</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Area: Press Any Key Prompt (Piscando Lentamente) */}
      <div className="relative pb-6 sm:pb-8 text-center space-y-2.5 z-10">
        <div className="animate-slow-press-blink text-xs sm:text-sm font-mono tracking-widest text-sky-300 font-bold uppercase flex items-center justify-center gap-2">
          <span className="text-amber-400">▶</span>
          <span>APERTE QUALQUER TECLA PARA INICIAR</span>
          <span className="text-amber-400">◀</span>
        </div>

        <div className="text-[11px] text-slate-500 font-mono">
          (ou clique em qualquer lugar da tela para entrar)
        </div>
      </div>
    </div>
  );
};
