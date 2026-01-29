import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, RefreshCw, Send, BookOpen, CheckCircle, Copy, Printer, Info, X, Calendar, User, Target, MapPin, Play, Mail, FileText, TrendingUp, HelpCircle, Plus, Layers, Home } from 'lucide-react';

const COLORS = {
  primary: '#ff8474',
  secondary: '#a69d90',
  tertiary: '#e5ddd2',
  background: '#f9f6f2'
};

const LOGICAL_LEVELS = [
  {
    id: 0,
    title: "Prostředí",
    subtitle: "Kde? Kdy? Jak to tam vypadá?",
    description: "Vnější podmínky a kontext.",
    questions: [
      "Představte si, že tam jste, jak to tam vypadá?",
      "Kde a kdy se to odehrává?",
      "Kdo je tam s vámi?"
    ],
    width: "100%"
  },
  {
    id: 1,
    title: "Chování a jednání",
    subtitle: "Co děláte?",
    description: "Konkrétní činnosti a akce.",
    questions: [
      "Co tam děláte?",
      "Jaké jsou vaše konkrétní kroky?",
      "Jak reagujete?"
    ],
    width: "85%"
  },
  {
    id: 2,
    title: "Schopnosti",
    subtitle: "Jak? Co jste se naučil(a)?",
    description: "Strategie, dovednosti a zdroje.",
    questions: [
      "Co jste se musel(a) naučit, uvědomit si, nebo se muselo stát, že jste v tom tak dobrý/á?",
      "Jaké schopnosti k tomu využíváte?",
      "Jak to děláte?"
    ],
    width: "70%"
  },
  {
    id: 3,
    title: "Hodnoty",
    subtitle: "Proč? Jakou to má hodnotu?",
    description: "Motivace a vnitřní přesvědčení.",
    questions: [
      "Když využíváte těch schopností, o kterých mluvíte, za ten čas, který jste si určil(a), jakou to má pro vás hodnotu?",
      "Proč je to pro vás důležité?",
      "Čemu v tu chvíli věříte?"
    ],
    width: "55%"
  },
  {
    id: 4,
    title: "Identita",
    subtitle: "Kým se stáváte?",
    description: "Smysl pro vlastní já a role.",
    questions: [
      "Když tu hodnotu budete realizovat, jak byste nazval(a) sám/sama sebe?",
      "Kým se stáváte?",
      "Jakou roli hrajete?"
    ],
    width: "40%"
  }
];

const TheoryView = ({ onBack }) => (
  <div className="flex flex-col h-full max-w-5xl mx-auto w-full animate-fade-in relative">
    <div className="flex justify-between items-center mb-6 py-4 border-b flex-none" style={{ borderColor: COLORS.tertiary }}>
      <h2 className="text-2xl font-bold" style={{ color: COLORS.secondary }}>Metodika a Teorie</h2>
      <button onClick={onBack} className="p-2 rounded-full hover:bg-black/5 transition-colors">
        <X size={24} style={{ color: COLORS.secondary }} />
      </button>
    </div>

    <div className="flex-1 overflow-y-auto pr-2 pb-8 custom-scrollbar">
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.secondary }}>Rozbor a původ metody</h3>
          <p className="mb-4">
            Kalifornský psycholog <strong>Robert Dilts</strong> vytvořil z práce Gregoryho Batesona jednoduchý a elegantní model pro přemýšlení o osobní změně, učení a komunikaci.
          </p>
          <div className="bg-[#e5ddd2] bg-opacity-30 p-4 rounded-lg italic border-l-2" style={{ borderColor: COLORS.secondary }}>
            "Výsledkově orientovaný koučink využívá logické úrovně jako rámce a procesy pro organizování a sbírání informací."
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.primary }}>Definice a Hierarchie</h3>
          <p className="mb-3">
            <strong>Logické úrovně jsou vnitřní hierarchií</strong>, v níž každý stupeň je postupně stále více psychologicky ucelenější a vlivnější.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2 opacity-90 mb-4">
            <li><strong>Logické úrovně oddělují chování a osobu.</strong> Osoba a její chování nejsou to samé.</li>
            <li>Existují přirozené hierarchie zkušeností.</li>
            <li>Když koučové vnesou do konverzací otázky logicko-úrovňového formátu, klientova pozornost se upne na přirozené odhalování mysli.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border-l-4" style={{ borderColor: COLORS.primary }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.primary }}>Logické úrovně jako koučovací rámec</h3>
          <ul className="list-disc list-inside space-y-2 ml-2 opacity-90">
            <li>Vztah je možné navázat na různých logických úrovních.</li>
            <li>Myšlení na bázi logických úrovní je rozpoznatelné v každé větě každého lidského jazyka.</li>
            <li>Logické úrovně lze využít k přemítání nad problémem, když se cítíte zmatení nebo nejistí.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.secondary }}>Přehled: 5 Logických úrovní</h3>
          <div className="overflow-hidden rounded-xl border shadow-sm bg-white" style={{ borderColor: COLORS.tertiary }}>
            <table className="w-full text-left border-collapse">
              <thead style={{ backgroundColor: COLORS.tertiary }}>
                <tr>
                  <th className="p-4 font-bold text-[#5a544b]">Úroveň</th>
                  <th className="p-4 font-bold text-[#5a544b]">Klíčová otázka</th>
                  <th className="p-4 font-bold text-[#5a544b] hidden md:table-cell">Zaměření</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="bg-orange-50/30">
                  <td className="p-4 font-bold" style={{ color: COLORS.primary }}>5. Identita</td>
                  <td className="p-4 font-medium">Kým se stáváte?</td>
                  <td className="p-4 text-sm text-gray-600 hidden md:table-cell">Poslání, Role, Sebeobraz</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium" style={{ color: COLORS.secondary }}>4. Hodnoty</td>
                  <td className="p-4">Jakou to má hodnotu?</td>
                  <td className="p-4 text-sm text-gray-600 hidden md:table-cell">Motivace, Přesvědčení</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium" style={{ color: COLORS.secondary }}>3. Schopnosti</td>
                  <td className="p-4">Co jste se musel(a) naučit?</td>
                  <td className="p-4 text-sm text-gray-600 hidden md:table-cell">Strategie, Dovednosti</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium" style={{ color: COLORS.secondary }}>2. Chování a jednání</td>
                  <td className="p-4">Co tam děláte?</td>
                  <td className="p-4 text-sm text-gray-600 hidden md:table-cell">Konkrétní akce</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium" style={{ color: COLORS.secondary }}>1. Prostředí</td>
                  <td className="p-4">Jak to tam vypadá?</td>
                  <td className="p-4 text-sm text-gray-600 hidden md:table-cell">Vnější kontext</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="font-bold text-lg mb-3" style={{ color: COLORS.secondary }}>Princip hierarchické změny</h3>
          <ul className="list-disc list-inside space-y-2 opacity-80">
            <li>Informace odvozené na jedné úrovni třídí a kontrolují informace na úrovni nižší.</li>
            <li><strong>Změna na vyšší úrovni automaticky způsobuje změnu na nižších úrovních.</strong></li>
            <li>Změna na nižší úrovni může, ale nemusí, způsobit změnu na vyšších úrovních.</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
);

const SetupView = ({ setCurrentStep, clientInfo, setClientInfo }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 md:p-8 animate-fade-in print-hide relative">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg text-left border-t-8 flex flex-col max-h-full" style={{ borderColor: COLORS.primary }}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 flex-none" style={{ color: COLORS.secondary }}>
          <User size={28} />
          Základní údaje sezení
        </h2>

        <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 uppercase tracking-wide opacity-60" style={{ color: COLORS.secondary }}>Jméno koučovaného</label>
              <div className="flex items-center bg-[#f9f6f2] rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-[#ff8474] transition-colors">
                <User size={20} className="opacity-40 mr-3" />
                <input
                  type="text"
                  name="name"
                  value={clientInfo.name}
                  onChange={handleChange}
                  placeholder="Jméno a Příjmení"
                  className="bg-transparent w-full text-base focus:outline-none text-gray-800 font-medium"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 uppercase tracking-wide opacity-60" style={{ color: COLORS.secondary }}>Datum sezení</label>
              <div className="flex items-center bg-[#f9f6f2] rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-[#ff8474] transition-colors">
                <Calendar size={20} className="opacity-40 mr-3" />
                <input
                  type="date"
                  name="date"
                  value={clientInfo.date}
                  onChange={handleChange}
                  className="bg-transparent w-full text-base focus:outline-none text-gray-800 font-medium"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <label className="text-sm font-bold ml-1 uppercase tracking-wide opacity-60" style={{ color: COLORS.secondary }}>Cíl sezení / Rozhodnutí</label>
            <div className="flex items-center bg-[#f9f6f2] rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-[#ff8474] transition-colors">
              <Target size={20} className="opacity-40 mr-3" />
              <input
                type="text"
                name="goal"
                value={clientInfo.goal}
                onChange={handleChange}
                placeholder="Co je cílem? (např. Rozhodnutí mezi prací a podnikáním)"
                className="bg-transparent w-full text-base focus:outline-none text-gray-800"
              />
            </div>
          </div>

          <div className="bg-[#fcfbf9] p-4 rounded-xl border border-[#e5ddd2] mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wide opacity-70 mb-4 flex items-center" style={{ color: COLORS.secondary }}>
              <TrendingUp size={16} className="mr-2" />
              Škálování (1 - 10)
            </h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-medium mb-1 text-gray-700">
                  <span>Kde je koučovaný TEĎ?</span>
                  <span className="font-bold text-lg" style={{ color: COLORS.primary }}>{clientInfo.scaleStart}</span>
                </div>
                <input
                  type="range"
                  name="scaleStart"
                  min="1"
                  max="10"
                  value={clientInfo.scaleStart}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff8474]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1 (Nejhůře)</span>
                  <span>10 (Nejlépe)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-1 text-gray-700">
                  <span>Kde chce být NA KONCI?</span>
                  <span className="font-bold text-lg" style={{ color: COLORS.primary }}>{clientInfo.scaleGoal}</span>
                </div>
                <input
                  type="range"
                  name="scaleGoal"
                  min="1"
                  max="10"
                  value={clientInfo.scaleGoal}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff8474]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1 (Stejně)</span>
                  <span>10 (Cíl)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-8">
            <label className="text-sm font-bold ml-1 uppercase tracking-wide opacity-60" style={{ color: COLORS.secondary }}>Kotva do budoucnosti</label>
            <div className="flex items-start bg-[#f9f6f2] rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-[#ff8474] transition-colors">
              <MapPin size={20} className="opacity-40 mr-3 mt-1" />
              <textarea
                name="futureAnchor"
                value={clientInfo.futureAnchor}
                onChange={handleChange}
                placeholder="Kam se chce koučovaný časově i místně přesunout?"
                className="bg-transparent w-full text-base focus:outline-none text-gray-800 resize-none h-20 leading-relaxed"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-100 flex-none">
          <button
            onClick={() => setCurrentStep('intro')}
            className="px-6 py-3 rounded-xl font-medium text-gray-500 hover:bg-gray-100 transition-colors flex items-center"
          >
            Zpět
          </button>

          <button
            onClick={() => setCurrentStep('coaching')}
            className="px-8 py-3 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center"
            style={{ backgroundColor: COLORS.primary }}
          >
            Spustit proces <Play size={20} className="ml-2 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};

const IntroView = ({ setCurrentStep, onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 md:p-8 animate-fade-in print-hide relative overflow-y-auto">
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg hover:bg-gray-100 shadow-sm transition-colors"
        >
          <ArrowLeft size={16} />
          <Home size={16} />
        </button>
      )}

      <div className="mb-8 p-6 rounded-full bg-white shadow-lg transform transition-transform hover:scale-105 duration-500">
        <BookOpen size={64} color={COLORS.primary} />
      </div>
      <h1 className="text-4xl font-bold mb-4" style={{ color: COLORS.secondary }}>
        Logické úrovně
      </h1>
      <h2 className="text-xl mb-10 font-light italic" style={{ color: COLORS.primary }}>
        by Mind Spark
      </h2>

      <p className="max-w-xl text-lg mb-12 leading-relaxed opacity-80" style={{ color: COLORS.secondary }}>
        Vítejte v nástroji pro hlubokou transformaci. <br />
        Tato koučovací technika vám pomůže prozkoumat a sladit myšlenky, chování a cíle napříč pěti úrovněmi vědomí.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => setCurrentStep('setup')}
          className="px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center"
          style={{ backgroundColor: COLORS.primary }}
        >
          Začít sezení <ArrowRight size={24} className="ml-3" />
        </button>

        <button
          onClick={() => setCurrentStep('theory')}
          className="px-8 py-3 rounded-xl font-medium text-sm transition-all border-2 flex items-center justify-center hover:bg-white/50"
          style={{ borderColor: COLORS.secondary, color: COLORS.secondary }}
        >
          <Info size={18} className="mr-2" />
          O metodě a teorii
        </button>
      </div>
    </div>
  );
};

const PyramidVisual = ({ activeLevel, setActiveLevel }) => (
  <div className="flex flex-col-reverse items-center justify-center w-full mb-6 gap-1 h-48 print-hide flex-none">
    {LOGICAL_LEVELS.map((level, index) => {
      const isActive = index === activeLevel;
      const isCompleted = index < activeLevel;

      return (
        <div
          key={level.id}
          className={`transition-all duration-500 rounded-sm flex items-center justify-center text-xs font-bold tracking-wider relative cursor-pointer`}
          style={{
            width: level.width,
            height: isActive ? '3.5rem' : '2rem',
            backgroundColor: isActive ? COLORS.primary : (isCompleted ? COLORS.secondary : COLORS.tertiary),
            color: isActive ? 'white' : (isCompleted ? 'white' : COLORS.secondary),
            opacity: isActive ? 1 : (isCompleted ? 0.7 : 0.4),
            maxWidth: '400px'
          }}
          onClick={() => setActiveLevel(index)}
        >
          {isActive && level.title}
        </div>
      );
    })}
  </div>
);

const CoachingView = ({
  activeLevel,
  setActiveLevel,
  pyramids,
  currentPyramidIndex,
  setCurrentPyramidIndex,
  handleAnswerChange,
  prevLevel,
  nextLevel,
  restart,
  clientInfo,
  goToIntegration,
  addNewPyramid,
  updatePyramidTitle,
  deletePyramid
}) => {
  const currentData = LOGICAL_LEVELS[activeLevel];
  const currentPyramid = pyramids[currentPyramidIndex];

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full animate-fade-in print-content relative">

      <div className="flex-1 overflow-y-auto pr-2 -mr-2 pb-4 custom-scrollbar flex flex-col">
        <div className="flex justify-between items-start mb-4 print-hide flex-none">
          <div>
            <h3 className="text-xl font-bold leading-tight" style={{ color: COLORS.secondary }}>Logické úrovně</h3>
            {clientInfo.name && <p className="text-xs opacity-60 font-medium">{clientInfo.name}</p>}
          </div>
          <button onClick={restart} className="text-sm hover:underline opacity-60" style={{ color: COLORS.secondary }}>
            Restartovat
          </button>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 print-hide flex-none">
          {pyramids.map((p, idx) => (
            <div
              key={p.id}
              className={`flex items-center px-3 py-2 rounded-lg border cursor-pointer transition-all whitespace-nowrap ${idx === currentPyramidIndex ? 'bg-white border-[#ff8474] shadow-sm' : 'bg-transparent border-transparent opacity-60 hover:opacity-100'}`}
              onClick={() => setCurrentPyramidIndex(idx)}
            >
              <Layers size={14} className="mr-2" color={idx === currentPyramidIndex ? COLORS.primary : COLORS.secondary} />
              <input
                type="text"
                className="bg-transparent focus:outline-none text-sm font-semibold w-24 sm:w-auto"
                style={{ color: idx === currentPyramidIndex ? '#000' : COLORS.secondary }}
                value={p.title}
                onChange={(e) => updatePyramidTitle(idx, e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              {pyramids.length > 1 && (
                <button onClick={(e) => { e.stopPropagation(); deletePyramid(idx); }} className="ml-2 hover:bg-red-100 p-1 rounded-full">
                  <X size={12} color={COLORS.secondary} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addNewPyramid}
            className="flex items-center px-3 py-2 rounded-lg border border-dashed border-gray-400 opacity-60 hover:opacity-100 hover:bg-white hover:border-gray-500 transition-all text-sm whitespace-nowrap"
          >
            <Plus size={14} className="mr-1" />
            Možnost
          </button>
        </div>

        <PyramidVisual activeLevel={activeLevel} setActiveLevel={setActiveLevel} />

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border-l-8 print-hide flex-none" style={{ borderColor: COLORS.primary }}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-3xl font-bold mb-1" style={{ color: COLORS.secondary }}>
                {activeLevel + 1}. {currentData.title}
              </h2>
              <p className="text-lg font-medium" style={{ color: COLORS.primary }}>
                {currentData.subtitle}
              </p>
            </div>
            <span className="text-4xl opacity-10" style={{ color: COLORS.secondary }}>0{activeLevel + 1}</span>
          </div>
          <p className="mb-6 opacity-80" style={{ color: COLORS.secondary }}>
            {currentData.description}
          </p>

          <div className="space-y-2 mb-4">
            <p className="font-semibold" style={{ color: COLORS.secondary }}>Koučovací otázky:</p>
            <ul className="list-disc list-inside space-y-2 pl-2" style={{ color: COLORS.secondary }}>
              {currentData.questions.map((q, idx) => (
                <li key={idx} className={`opacity-90 ${idx === 0 ? 'font-medium' : ''}`}>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-grow flex flex-col mb-4 print-full-width min-h-[200px]">
          <textarea
            className="w-full h-full p-4 rounded-xl resize-none focus:outline-none focus:ring-2 transition-all shadow-inner text-lg print-no-bg print-no-border"
            style={{
              backgroundColor: COLORS.tertiary,
              color: '#5a544b',
              borderColor: COLORS.secondary
            }}
            placeholder={`Zapisujte odpovědi koučovaného pro: ${currentPyramid.title}...`}
            value={currentPyramid.answers[activeLevel] || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-none pt-4 bg-[#f9f6f2] z-10 border-t border-gray-100 print-hide">
        <div className="flex justify-between items-center">
          <button
            onClick={prevLevel}
            className="flex items-center px-4 md:px-6 py-3 rounded-lg font-medium transition-colors hover:bg-opacity-80 text-sm md:text-base"
            style={{ backgroundColor: COLORS.tertiary, color: COLORS.secondary }}
          >
            <ArrowLeft size={20} className="mr-2" />
            Zpět
          </button>

          {activeLevel === LOGICAL_LEVELS.length - 1 ? (
            <div className="flex gap-2">
              <button
                onClick={addNewPyramid}
                className="flex items-center px-4 py-3 rounded-lg font-bold border-2 transition-colors hover:bg-white text-sm md:text-base"
                style={{ borderColor: COLORS.primary, color: COLORS.primary }}
              >
                <Plus size={20} className="mr-2" />
                Přidat možnost
              </button>
              <button
                onClick={goToIntegration}
                className="flex items-center px-4 md:px-8 py-3 rounded-lg font-bold text-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 text-sm md:text-base"
                style={{ backgroundColor: COLORS.primary }}
              >
                Jít na Integraci
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          ) : (
            <button
              onClick={nextLevel}
              className="flex items-center px-8 py-3 rounded-lg font-bold text-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: COLORS.primary }}
            >
              Další úroveň
              <ArrowRight size={20} className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const IntegrationView = ({
  integrationAnswers,
  setIntegrationAnswers,
  prevLevel,
  goToSummary,
  clientInfo
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIntegrationAnswers(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full animate-fade-in relative">
      <div className="flex-1 overflow-y-auto pr-2 -mr-2 pb-4 custom-scrollbar flex flex-col">
        <div className="mb-6 flex-none">
          <h3 className="text-xl font-bold leading-tight" style={{ color: COLORS.secondary }}>Integrace a Ukotvení</h3>
          <p className="text-sm opacity-60">Fáze propojení a akčních kroků</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start mb-3">
            <HelpCircle size={20} className="mr-2 mt-1" style={{ color: COLORS.primary }} />
            <p className="font-bold text-lg text-gray-800">Když jste tím teď prošel(prošla), co vám to (o vás) říká?</p>
          </div>
          <textarea
            name="insight"
            value={integrationAnswers.insight}
            onChange={handleChange}
            className="w-full h-24 p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#ff8474]"
            placeholder="Odpověď..."
          />
        </div>

        <div className="bg-[#fcfbf9] rounded-xl shadow-sm p-6 mb-6 border border-[#e5ddd2]">
          <div className="flex items-center mb-4">
            <TrendingUp size={20} className="mr-2" style={{ color: COLORS.primary }} />
            <p className="font-bold text-lg text-gray-800">Jak jste se posunul(a) na té škále?</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Začátek: <strong>{clientInfo.scaleStart}</strong></span>
              <span className="text-gray-500">Cíl: <strong>{clientInfo.scaleGoal}</strong></span>
            </div>
            <div className="flex justify-between text-sm font-medium mb-1 text-gray-700">
              <span>Aktuální pocit (Konec sezení)</span>
              <span className="font-bold text-lg" style={{ color: COLORS.primary }}>{integrationAnswers.scaleEnd}</span>
            </div>
            <input
              type="range"
              name="scaleEnd"
              min="1"
              max="10"
              value={integrationAnswers.scaleEnd}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff8474]"
            />
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Co byste potřeboval(a), abyste se k tomu číslu ze začátku posunul(a) blíž?</p>
            <textarea
              name="needs"
              value={integrationAnswers.needs}
              onChange={handleChange}
              className="w-full h-20 p-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-[#ff8474]"
              placeholder="Co chybí k posunu? (Volitelné)"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start mb-3">
            <HelpCircle size={20} className="mr-2 mt-1" style={{ color: COLORS.primary }} />
            <p className="font-bold text-lg text-gray-800">Co s tím uděláte? Co je pro vás teď důležité?</p>
          </div>
          <textarea
            name="action"
            value={integrationAnswers.action}
            onChange={handleChange}
            className="w-full h-24 p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#ff8474]"
            placeholder="Odpověď..."
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start mb-3">
            <HelpCircle size={20} className="mr-2 mt-1" style={{ color: COLORS.primary }} />
            <p className="font-bold text-lg text-gray-800">Jak s tím budete pracovat do té doby, než se potřebujete rozhodnout?</p>
          </div>
          <textarea
            name="futureWork"
            value={integrationAnswers.futureWork}
            onChange={handleChange}
            className="w-full h-24 p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#ff8474]"
            placeholder="Odpověď..."
          />
        </div>
      </div>

      <div className="flex-none pt-4 bg-[#f9f6f2] z-10 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <button
            onClick={prevLevel}
            className="flex items-center px-6 py-3 rounded-lg font-medium transition-colors hover:bg-opacity-80"
            style={{ backgroundColor: COLORS.tertiary, color: COLORS.secondary }}
          >
            <ArrowLeft size={20} className="mr-2" />
            Zpět na Pyramidu
          </button>

          <button
            onClick={goToSummary}
            className="flex items-center px-8 py-3 rounded-lg font-bold text-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: COLORS.primary }}
          >
            Dokončit a Souhrn
            <CheckCircle size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

const SummaryView = ({
  pyramids,
  setCurrentStep,
  copyToClipboard,
  copied,
  restart,
  handlePrint,
  handleEmail,
  clientInfo,
  coachNotes,
  setCoachNotes,
  integrationAnswers
}) => {

  const renderIntegrationSection = (title, content) => {
    if (!content || content.trim() === '') return null;
    return (
      <div className="mb-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{title}</h4>
        <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full animate-fade-in print-container relative">

      <div className="flex-1 overflow-y-auto pr-2 -mr-2 pb-4 custom-scrollbar">
        <div className="text-center mb-8 pt-4">
          <h2 className="text-3xl font-bold mb-2 print-text-black" style={{ color: COLORS.primary }}>
            Dokončeno: Logické úrovně
          </h2>
          <p style={{ color: COLORS.secondary }} className="print-text-gray">
            Záznam koučovacího sezení Mind Spark
          </p>
        </div>

        <div className="bg-[#f9f6f2] p-6 rounded-xl border border-[#e5ddd2] mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 print-card print-no-shadow print-bg-white">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider opacity-50 mb-1" style={{ color: COLORS.secondary }}>Koučovaný</span>
            <p className="font-semibold text-lg print-text-black" style={{ color: '#5a544b' }}>{clientInfo.name || '---'}</p>
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider opacity-50 mb-1" style={{ color: COLORS.secondary }}>Datum</span>
            <p className="font-semibold text-lg print-text-black" style={{ color: '#5a544b' }}>{clientInfo.date || '---'}</p>
          </div>
          <div className="md:col-span-2">
            <span className="block text-xs font-bold uppercase tracking-wider opacity-50 mb-1" style={{ color: COLORS.secondary }}>Cíl sezení</span>
            <p className="font-medium print-text-black" style={{ color: '#5a544b' }}>{clientInfo.goal || '---'}</p>
          </div>

          <div>
            <span className="block text-xs font-bold uppercase tracking-wider opacity-50 mb-1" style={{ color: COLORS.secondary }}>Škála: Start</span>
            <p className="font-bold text-lg print-text-black" style={{ color: COLORS.primary }}>{clientInfo.scaleStart}/10</p>
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider opacity-50 mb-1" style={{ color: COLORS.secondary }}>Škála: Cíl</span>
            <p className="font-bold text-lg print-text-black" style={{ color: COLORS.primary }}>{clientInfo.scaleGoal}/10</p>
          </div>

          <div className="md:col-span-2">
            <span className="block text-xs font-bold uppercase tracking-wider opacity-50 mb-1" style={{ color: COLORS.secondary }}>Kotva do budoucnosti</span>
            <p className="font-medium print-text-black italic" style={{ color: '#5a544b' }}>{clientInfo.futureAnchor || '---'}</p>
          </div>
        </div>

        <div className="space-y-8 print-overflow-visible">
          {pyramids.map((pyramid, pIdx) => (
            <div key={pyramid.id} className="border-t pt-8 first:border-t-0 first:pt-0">
              {pyramids.length > 1 && (
                <h3 className="text-xl font-bold mb-4 print-text-black" style={{ color: COLORS.secondary }}>
                  {pyramid.title}
                </h3>
              )}

              <div className="space-y-4">
                {[...LOGICAL_LEVELS].reverse().map((level, index) => {
                  const originalIndex = LOGICAL_LEVELS.length - 1 - index;
                  const content = pyramid.answers[originalIndex];
                  if (!content || content.trim() === '') return null;

                  return (
                    <div key={level.id} className="bg-white p-6 rounded-xl shadow-sm border-l-4 relative group hover:shadow-md transition-shadow print-card print-no-shadow" style={{ borderColor: COLORS.secondary }}>
                      <div className="absolute top-4 right-4 opacity-10 text-4xl font-bold select-none print-hide" style={{ color: COLORS.secondary }}>
                        {originalIndex + 1}
                      </div>
                      <h3 className="text-sm uppercase tracking-widest font-bold mb-1 print-text-black" style={{ color: COLORS.primary }}>
                        {level.title}
                      </h3>
                      <p className="text-xs mb-3 italic opacity-60 print-text-gray" style={{ color: COLORS.secondary }}>{level.subtitle}</p>

                      <div className="whitespace-pre-wrap text-gray-700 print-text-black">
                        {content}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {(integrationAnswers.insight || integrationAnswers.needs || integrationAnswers.action || integrationAnswers.futureWork) && (
            <div className="bg-[#f0f9ff] p-6 rounded-xl shadow-sm border-l-4 border-blue-300 mt-8 print-card print-no-shadow break-before-page">
              <h3 className="text-sm uppercase tracking-widest font-bold mb-4 print-text-black text-blue-600 flex items-center">
                <TrendingUp size={16} className="mr-2" />
                Integrace a Akční kroky
              </h3>

              {renderIntegrationSection("Co vám to říká?", integrationAnswers.insight)}

              <div className="mb-4 p-2 bg-blue-50 rounded border border-blue-100 inline-block">
                <span className="text-xs font-bold text-gray-500 uppercase mr-2">Posun na škále:</span>
                <span className="font-bold text-lg text-blue-600">{integrationAnswers.scaleEnd}/10</span>
              </div>

              {renderIntegrationSection("Co potřebujete k posunu?", integrationAnswers.needs)}
              {renderIntegrationSection("Co s tím uděláte?", integrationAnswers.action)}
              {renderIntegrationSection("Jak s tím budete pracovat?", integrationAnswers.futureWork)}
            </div>
          )}

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-gray-400 mt-8 print-card print-no-shadow">
            <h3 className="text-sm uppercase tracking-widest font-bold mb-4 print-text-black text-gray-600 flex items-center">
              <FileText size={16} className="mr-2" />
              Odnáším si
            </h3>
            <textarea
              className="w-full min-h-[100px] p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#ff8474] print-hide resize-y"
              placeholder="Zde můžete napsat co si odnášíte, postřehy nebo úkoly..."
              value={coachNotes}
              onChange={(e) => setCoachNotes(e.target.value)}
            />
            <div className="whitespace-pre-wrap text-gray-700 print-text-black hidden print-block">
              {coachNotes || "---"}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-none pt-4 bg-[#f9f6f2] z-10 border-t border-gray-100 print-hide">
        <div className="flex justify-center flex-wrap gap-4">
          <button
            onClick={() => setCurrentStep('integration')}
            className="flex items-center px-4 py-3 rounded-lg font-medium transition-colors hover:bg-opacity-80"
            style={{ backgroundColor: COLORS.tertiary, color: COLORS.secondary }}
          >
            <ArrowLeft size={18} className="mr-2" />
            Zpět
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-3 rounded-lg font-medium transition-colors hover:bg-opacity-90 bg-gray-100 text-gray-700 shadow-sm"
          >
            <Printer size={18} className="mr-2" />
            Tisk / PDF
          </button>

          <button
            onClick={handleEmail}
            className="flex items-center px-4 py-3 rounded-lg font-medium transition-colors hover:bg-opacity-90 text-white shadow-sm"
            style={{ backgroundColor: '#2196F3' }}
          >
            <Mail size={18} className="mr-2" />
            E-mail
          </button>

          <button
            onClick={copyToClipboard}
            className="flex items-center px-4 py-3 rounded-lg font-medium text-white transition-all shadow hover:shadow-md"
            style={{ backgroundColor: copied ? '#4CAF50' : COLORS.secondary }}
          >
            {copied ? <CheckCircle size={18} className="mr-2" /> : <Copy size={18} className="mr-2" />}
            {copied ? 'Hotovo' : 'Kopírovat'}
          </button>

          <button
            onClick={restart}
            className="flex items-center px-4 py-3 rounded-lg font-bold text-white shadow hover:shadow-md"
            style={{ backgroundColor: COLORS.primary }}
          >
            <RefreshCw size={18} className="mr-2" />
            Nové
          </button>
        </div>
      </div>
    </div>
  );
};

const LogickeUrovne = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState('intro');
  const [activeLevel, setActiveLevel] = useState(0);

  const [pyramids, setPyramids] = useState([{
    id: 1,
    title: 'Možnost 1',
    answers: Array(LOGICAL_LEVELS.length).fill('')
  }]);
  const [currentPyramidIndex, setCurrentPyramidIndex] = useState(0);

  const [copied, setCopied] = useState(false);
  const [coachNotes, setCoachNotes] = useState('');

  const [integrationAnswers, setIntegrationAnswers] = useState({
    insight: '',
    scaleEnd: 5,
    needs: '',
    action: '',
    futureWork: ''
  });

  const [clientInfo, setClientInfo] = useState({
    name: '',
    date: new Date().toISOString().slice(0, 10),
    goal: '',
    futureAnchor: '',
    scaleStart: 1,
    scaleGoal: 10
  });

  const printStyles = `
    @media print {
      body, html { background-color: white !important; height: auto !important; overflow: visible !important; }
      .print-hide { display: none !important; }
      .print-block { display: block !important; }
      .print-container { height: auto !important; overflow: visible !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
      .print-overflow-visible { overflow: visible !important; height: auto !important; }
      .print-bg-white { background-color: white !important; border: 1px solid #ddd !important; }
      .print-card { border: 1px solid #ccc !important; box-shadow: none !important; break-inside: avoid; margin-bottom: 0.5cm; background-color: white !important; }
      .break-before-page { page-break-before: auto; }
      .print-text-black { color: black !important; }
      .print-text-gray { color: #555 !important; }
      .print-no-shadow { box-shadow: none !important; }
      div { overflow: visible !important; }
    }
    .custom-scrollbar::-webkit-scrollbar { width: 8px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); border-radius: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #a69d90; opacity: 0.5; border-radius: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #8e867b; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
  `;

  const addNewPyramid = () => {
    const newId = pyramids.length + 1;
    const newPyramid = {
      id: Date.now(),
      title: `Možnost ${newId}`,
      answers: Array(LOGICAL_LEVELS.length).fill('')
    };
    setPyramids([...pyramids, newPyramid]);
    setCurrentPyramidIndex(pyramids.length);
    setActiveLevel(0);
  };

  const deletePyramid = (index) => {
    if (pyramids.length <= 1) return;
    const newPyramids = pyramids.filter((_, i) => i !== index);
    setPyramids(newPyramids);
    if (currentPyramidIndex >= index && currentPyramidIndex > 0) {
      setCurrentPyramidIndex(currentPyramidIndex - 1);
    }
  };

  const updatePyramidTitle = (index, newTitle) => {
    const newPyramids = [...pyramids];
    newPyramids[index].title = newTitle;
    setPyramids(newPyramids);
  };

  const handleAnswerChange = (text) => {
    const newPyramids = [...pyramids];
    newPyramids[currentPyramidIndex].answers[activeLevel] = text;
    setPyramids(newPyramids);
  };

  const nextLevel = () => {
    if (activeLevel < LOGICAL_LEVELS.length - 1) {
      setActiveLevel(activeLevel + 1);
    }
  };

  const prevLevel = () => {
    if (activeLevel > 0) {
      setActiveLevel(activeLevel - 1);
    } else {
      setCurrentStep('setup');
    }
  };

  const goToIntegration = () => {
    setIntegrationAnswers(prev => ({
      ...prev,
      scaleEnd: prev.scaleEnd === 5 && clientInfo.scaleStart !== 1 ? clientInfo.scaleStart : prev.scaleEnd
    }));
    setCurrentStep('integration');
  };

  const restart = () => {
    if (window.confirm("Opravdu chcete začít znovu? Všechny poznámky budou smazány.")) {
      setPyramids([{
        id: 1,
        title: 'Možnost 1',
        answers: Array(LOGICAL_LEVELS.length).fill('')
      }]);
      setCurrentPyramidIndex(0);
      setClientInfo({
        name: '',
        date: new Date().toISOString().slice(0, 10),
        goal: '',
        futureAnchor: '',
        scaleStart: 1,
        scaleGoal: 10
      });
      setIntegrationAnswers({
        insight: '',
        scaleEnd: 5,
        needs: '',
        action: '',
        futureWork: ''
      });
      setCoachNotes('');
      setActiveLevel(0);
      setCurrentStep('intro');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const generateReportText = () => {
    let text = `REPORT Z KOUČOVACÍHO SEZENÍ: LOGICKÉ ÚROVNĚ\n\nKOUČOVANÝ: ${clientInfo.name}\nDATUM: ${clientInfo.date}\nCÍL: ${clientInfo.goal}\n\n`;
    text += `ŠKÁLA START: ${clientInfo.scaleStart}/10\nŠKÁLA CÍL: ${clientInfo.scaleGoal}/10\n`;
    text += `KOTVA DO BUDOUCNOSTI: ${clientInfo.futureAnchor || '---'}\n\n----------------------------------------\n\n`;

    pyramids.forEach(p => {
      text += `>>> ${p.title.toUpperCase()} <<<\n\n`;
      const levelsText = LOGICAL_LEVELS.map((level, index) => {
        const answer = p.answers[index];
        if (answer && answer.trim() !== '') {
          return `${level.title.toUpperCase()}\n${answer}`;
        }
        return null;
      }).reverse().filter(item => item !== null).join('\n\n');

      text += levelsText ? levelsText : "(Bez záznamu)";
      text += `\n\n========================================\n\n`;
    });

    const int = integrationAnswers;
    if (int.insight || int.needs || int.action || int.futureWork) {
      text += `INTEGRACE A AKČNÍ KROKY\n`;
      text += `POSUN NA ŠKÁLE: ${int.scaleEnd}/10\n\n`;
      if (int.insight) text += `Co vám to říká?\n${int.insight}\n\n`;
      if (int.needs) text += `Co potřebujete k posunu?\n${int.needs}\n\n`;
      if (int.action) text += `Co s tím uděláte?\n${int.action}\n\n`;
      if (int.futureWork) text += `Jak s tím budete pracovat?\n${int.futureWork}\n\n`;
    }

    if (coachNotes) {
      text += `----------------------------------------\n\nODNÁŠÍM SI:\n${coachNotes}`;
    }

    return text;
  };

  const copyToClipboard = () => {
    const text = generateReportText();
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
    document.body.removeChild(textArea);
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Report sezení: ${clientInfo.name} - ${clientInfo.date}`);
    const body = encodeURIComponent(generateReportText());
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen w-full font-sans transition-colors duration-500" style={{ backgroundColor: COLORS.background }}>
      <style>{printStyles}</style>
      <div className="h-screen flex flex-col p-4 md:p-8 overflow-hidden print-container">
        {currentStep === 'intro' && (
          <IntroView
            setCurrentStep={setCurrentStep}
            onBack={onBack}
          />
        )}

        {currentStep === 'setup' && (
          <SetupView
            setCurrentStep={setCurrentStep}
            clientInfo={clientInfo}
            setClientInfo={setClientInfo}
          />
        )}

        {currentStep === 'theory' && (
          <TheoryView onBack={() => setCurrentStep('intro')} />
        )}

        {currentStep === 'coaching' && (
          <CoachingView
            activeLevel={activeLevel}
            setActiveLevel={setActiveLevel}
            pyramids={pyramids}
            currentPyramidIndex={currentPyramidIndex}
            setCurrentPyramidIndex={setCurrentPyramidIndex}
            handleAnswerChange={handleAnswerChange}
            prevLevel={prevLevel}
            nextLevel={nextLevel}
            restart={restart}
            clientInfo={clientInfo}
            goToIntegration={goToIntegration}
            addNewPyramid={addNewPyramid}
            updatePyramidTitle={updatePyramidTitle}
            deletePyramid={deletePyramid}
          />
        )}

        {currentStep === 'integration' && (
          <IntegrationView
            integrationAnswers={integrationAnswers}
            setIntegrationAnswers={setIntegrationAnswers}
            prevLevel={() => setCurrentStep('coaching')}
            goToSummary={() => setCurrentStep('summary')}
            clientInfo={clientInfo}
          />
        )}

        {currentStep === 'summary' && (
          <SummaryView
            pyramids={pyramids}
            setCurrentStep={setCurrentStep}
            copyToClipboard={copyToClipboard}
            copied={copied}
            restart={restart}
            handlePrint={handlePrint}
            handleEmail={handleEmail}
            clientInfo={clientInfo}
            coachNotes={coachNotes}
            setCoachNotes={setCoachNotes}
            integrationAnswers={integrationAnswers}
          />
        )}
      </div>

      <div className="fixed bottom-2 right-4 text-xs opacity-40 pointer-events-none print-hide" style={{ color: COLORS.secondary }}>
        Logické úrovně by Mind Spark
      </div>
    </div>
  );
};

export default LogickeUrovne;
