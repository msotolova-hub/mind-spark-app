import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Play, Pause, RotateCcw, CheckCircle, Lightbulb, Wrench, Search, Printer, MessageSquare, Info, Anchor, User, Calendar, Home } from 'lucide-react';

export default function DisneyModel({ onBack }) {
  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [answers, setAnswers] = useState({
    jmeno_koucovaneho: '',
    datum_sezeni: new Date().toLocaleDateString('cs-CZ'),
    tema: '',
    tema_cil: '',
    vize_zacatek: '',
    barva_kotvy: '',
    vize_cas: '',
    vize_popis: '',
    vize_film: '',
    vize_pocity: '',
    vize_telo: '',
    real_energie: '',
    real_jak: '',
    real_milniky: '',
    kritik_predpoklad: '',
    kritik_uhel_pohledu: '',
    kritik_napady: '',
    zaver_plan: ''
  });

  const getFormattedDate = () => answers.datum_sezeni || new Date().toLocaleDateString('cs-CZ');

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    {
      id: 'intro',
      title: 'Uvod',
      icon: <Home className="w-5 h-5" />,
      color: 'bg-[#ff8474]',
      questions: [
        { id: 'jmeno_koucovaneho', label: 'JMENO KOUCOVANEHO', placeholder: 'Jmeno', type: 'text', icon: <User size={16}/> },
        { id: 'datum_sezeni', label: 'DATUM', placeholder: 'DD.MM.RRRR', type: 'text', icon: <Calendar size={16}/> },
        { id: 'tema', label: 'TEMA', placeholder: 'Projekt, cil nebo sen k realizaci', type: 'text' },
        { id: 'tema_cil', label: 'CIL SEZENI', placeholder: 'Co by pro Vas bylo nejskutecnejsi si odnest?', type: 'textarea' },
        { id: 'vize_zacatek', label: 'VIZE NA ZACATKU', placeholder: 'Jaka je Vase vstupni predstava? Az to bude hotove, budu...', type: 'textarea' },
        { id: 'barva_kotvy', label: 'DEFINICE KOTEV', placeholder: 'Napr. Snilek - zluta, Realista - zelena, Kritik - cerna...', type: 'text' }
      ],
      guide: {
        tips: ["Udrzujte nastaveni mysli oddelene (diferenciace).", "Koucovany si voli barvy nebo mista pro kazdou fazi.", "Zapiste si zvolene kotvy pro konzistenci."],
        phrases: ["Vyberte si prosim tri barvy nebo mista pro role Snilka, Realisty a Kritika.", "Cilem je oddelit tri ruzne konverzace pro posileni planovani."]
      }
    },
    {
      id: 'snilek',
      title: 'Snilek',
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'bg-[#FBBF24]',
      questions: [
        { id: 'vize_cas', label: 'POHLED DO BUDOUCNOSTI (5 LET)', placeholder: 'Co vidite v pet let vzdalene budoucnosti?', type: 'text' },
        { id: 'vize_popis', label: 'PANORAMA MOZNOSTI', placeholder: 'Pohlednete na svitani velkeho snu... Co konkretne vidite?', type: 'textarea' },
        { id: 'vize_film', label: 'VNITRNI CTYRHVEZDICKOVY FILM', placeholder: 'Sledujte sam/sama sebe v akci. Co vidite v zivych barvach?', type: 'textarea' },
        { id: 'vize_pocity', label: 'HODNOTY A POCITY', placeholder: 'Jakou nejvetsi hodnotu tento sen prinasi?', type: 'text' },
        { id: 'vize_telo', label: 'TELESNA KOTVA', placeholder: 'Kde v tele vnimate tento rozvijejici se sen?', type: 'text' }
      ],
      guide: {
        state: "DISOCIOVANY (vizionar)",
        body: "Vzprimeny, uvolneny, hlava a ramena zdviznuta. Oci vzhuru.",
        voice: "Lehky, vyse polozeny ton.",
        phrases: ["Podivejte se do dalky na svou vizi...", "Pohlednete na svitani velkeho snu.", "Co byste videli, kdybyste o tom natocili film?", "Divejte se na sebe, jak hrajete v pribehu nejvyssi hodnoty."]
      }
    },
    {
      id: 'realizator',
      title: 'Realizator',
      icon: <Wrench className="w-5 h-5" />,
      color: 'bg-[#10B981]',
      questions: [
        { id: 'real_energie', label: 'ROVNOVAHA ENERGIE A HODNOTY', placeholder: 'Stoji vynalozena energie za to? Jsou zdroje v rovnovaze?', type: 'text' },
        { id: 'real_jak', label: 'FYZICKE PROCHAZENI KROKU', placeholder: 'Jako byste kroky fyzicky citil(a)... Jak jste to udelal(a)?', type: 'textarea' },
        { id: 'real_milniky', label: 'OKAMZITE NAPLNOVANI', placeholder: 'Jake jsou milniky v case?', type: 'textarea' }
      ],
      guide: {
        state: "ASOCIOVANY (v akci)",
        body: "Zamereni kupredu, aktivni postoj - pojdme na to.",
        voice: "Vecny, proceduralni ton.",
        phrases: ["Nasadte si (zvolenou) kotvu a zamyslete se nad kroky.", "Predstavte si cinnosti, jako byste je prave vykonaval.", "Stoji to za to? Jsou energie a hodnota v rovnovaze?"]
      }
    },
    {
      id: 'kritik',
      title: 'Kritik',
      icon: <Search className="w-5 h-5" />,
      color: 'bg-[#EF4444]',
      questions: [
        { id: 'kritik_predpoklad', label: 'PREDPOKLADEJME, ZE...', placeholder: 'Jake otazky by si kladl kritik?', type: 'textarea' },
        { id: 'kritik_uhel_pohledu', label: 'POZICE JINEHO UHLU POHLEDU', placeholder: 'Co by rekl banker nebo konkurence?', type: 'textarea' },
        { id: 'kritik_napady', label: 'CITLIVOST VUCI OSTATNIM', placeholder: 'Jak spojit zajmy ostatnich se svymi?', type: 'textarea' },
        { id: 'zaver_plan', label: 'PRVNI KONKRETNI KROK', placeholder: 'Co konkretne a hmatatelne udelate jako prvni krok po tomto sezeni?', type: 'textarea' }
      ],
      guide: {
        state: "VSECHNY SYSTEMY (otazky)",
        body: "Asymetricky vychylene, ruka u brady. Oci tekaji dolu.",
        voice: "Pomaly, mekky, tazavy ton.",
        phrases: ["Vzijte se do pozice bankovniho urednika, ktery schvaluje uver.", "Kdyby mel konkurent vyhodu, jak byste produkt vylepsil?", "Jaky je ten nejmensi mozny prvni krok, ktery muzete udelat hned?"]
      }
    },
    {
      id: 'summary',
      title: 'Shrnuti',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'bg-[#ff8474]',
      questions: []
    }
  ];

  const currentStepData = steps[step];

  return (
    <div className="min-h-screen bg-[#FAF6F2] text-[#4A4A4A] pb-12" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="max-w-[1400px] mx-auto p-4 md:p-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white/40 shadow-sm no-print">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 text-[#a69d90] hover:text-[#ff8474] hover:bg-[#FAF6F2] rounded-lg transition-colors"
                title="Zpet na dashboard"
              >
                <Home size={20} />
              </button>
            )}
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold tracking-tight text-[#2D2D2D] flex items-center gap-2">
                Disney Model
              </h1>
              <p className="text-[#A5A5A5] text-sm font-medium">profesionalni nastroj pro kouce <span className="text-[#ff8474] font-bold ml-1">by Mind Spark</span></p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`px-5 py-2.5 rounded-2xl font-mono text-lg flex items-center gap-3 transition-colors ${timer > 5400 ? 'bg-red-50 text-red-600' : 'bg-white shadow-inner border border-[#e5ddd2]'}`}>
              <span className="text-[#a69d90]"><RotateCcw size={16} onClick={() => {setTimer(0); setIsTimerRunning(false)}} className="cursor-pointer hover:text-[#ff8474]"/></span>
              {formatTime(timer)}
              <button onClick={() => setIsTimerRunning(!isTimerRunning)} className="p-1.5 bg-[#ff8474] text-white rounded-xl hover:bg-[#e06b5c] transition-all">
                {isTimerRunning ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              </button>
            </div>
          </div>
        </header>

        {/* Stepper */}
        <div className="mb-10 no-print">
          <nav className="flex justify-between items-center bg-white p-3 rounded-3xl border border-white/60 shadow-sm overflow-x-auto gap-2">
            {steps.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setStep(idx)}
                className={`flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-2xl transition-all min-w-[110px] flex-1
                  ${step === idx ? 'bg-[#ff8474] text-white shadow-lg shadow-[#ff8474]/20' : 'text-[#A5A5A5] hover:bg-[#FAF6F2] hover:text-[#ff8474]'}`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === idx ? 'bg-white/20' : 'bg-[#FAF6F2]'}`}>
                  {React.cloneElement(s.icon, { size: 16, className: step === idx ? 'text-white' : 'text-[#A5A5A5]' })}
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.1em]">{s.title}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Visual Map */}
          <div className={`lg:col-span-2 space-y-6 ${step === 4 ? 'hidden lg:block' : ''} no-print`}>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-white/60 flex flex-col items-center sticky top-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D1D1D1] mb-8">Vizualizace</h3>
              <div className="relative w-36 flex flex-col items-center">
                <div className={`w-0 h-0 border-l-[45px] border-l-transparent border-r-[45px] border-r-transparent border-b-[45px] transition-all duration-300 cursor-pointer ${step === 1 ? 'border-b-[#FBBF24] scale-110' : 'border-b-[#FAF6F2]'}`} onClick={() => setStep(1)}></div>
                <div className={`w-28 h-14 mt-2 border-2 transition-all duration-300 cursor-pointer rounded-xl ${step === 2 ? 'bg-[#10B981] border-[#10B981] scale-110 text-white' : 'bg-white border-[#FAF6F2]'}`} onClick={() => setStep(2)}></div>
                <div className={`w-28 h-14 mt-2 border-2 transition-all duration-300 cursor-pointer rounded-xl ${step === 3 ? 'bg-[#EF4444] border-[#EF4444] scale-110 text-white' : 'bg-white border-[#FAF6F2]'}`} onClick={() => setStep(3)}></div>
                <div className={`w-28 h-14 mt-2 border-2 transition-all duration-300 cursor-pointer rounded-xl ${step === 0 ? 'bg-[#ff8474] border-[#ff8474] text-white' : 'bg-white border-[#FAF6F2]'}`} onClick={() => setStep(0)}></div>
              </div>
            </div>
          </div>

          {/* Main Interaction Area */}
          <div className={`${step === 4 ? 'lg:col-span-12' : 'lg:col-span-7'} space-y-6`}>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-white/60 min-h-[650px] flex flex-col relative overflow-hidden print-main">
              
              {/* Anchor Reminder */}
              {step > 0 && step < 4 && answers.barva_kotvy && (
                <div className="mb-8 bg-[#2D2D2D] text-white p-4 rounded-2xl flex items-center justify-between no-print shadow-xl">
                  <div className="flex items-center gap-3">
                    <Anchor size={18} className="text-[#ff8474]" />
                    <span className="text-[10px] font-black tracking-widest text-[#888]">AKTIVNI KOTVA</span>
                  </div>
                  <span className="text-sm font-bold text-[#ff8474] uppercase">{answers.barva_kotvy}</span>
                </div>
              )}

              {/* Step Title Header */}
              {step === 0 && (
                <div className="mb-8 bg-[#FAF6F2] p-6 rounded-2xl border border-[#e5ddd2] no-print">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-[#ff8474] mb-2">O TECHNICE</h3>
                   <p className="text-xs leading-relaxed text-[#7A7A7A]">
                     Duslednym oddelenim fazi Snilka, Realisty a Kritika usnadnite tri odlisne konverzace. Tim, jak se koucovany posunuje od jedne faze k druhe, dochazi k posilovani jeho panovacich schopnosti.
                   </p>
                </div>
              )}

              <div className="space-y-8 flex-grow">
                {step < 4 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {currentStepData.questions.map((q) => (
                      <div key={q.id} className={`space-y-2 ${q.type === 'textarea' || (step > 0 && q.id !== 'vize_cas') ? 'md:col-span-2' : ''}`}>
                        <div className="flex items-center gap-2 mb-1">
                          {q.icon && <span className="text-[#A5A5A5]">{q.icon}</span>}
                          <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[#A5A5A5]">{q.label}</label>
                        </div>
                        {q.type === 'text' ? (
                          <input
                            type="text"
                            className="w-full p-4 rounded-2xl border border-[#e5ddd2] bg-white focus:ring-2 focus:ring-[#ff8474] focus:border-transparent outline-none transition-all placeholder:text-[#D1D1D1] text-sm"
                            placeholder={q.placeholder}
                            value={answers[q.id] || ''}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                          />
                        ) : (
                          <textarea
                            rows={4}
                            className="w-full p-4 rounded-2xl border border-[#e5ddd2] bg-white focus:ring-2 focus:ring-[#ff8474] focus:border-transparent outline-none transition-all resize-none placeholder:text-[#D1D1D1] text-sm"
                            placeholder={q.placeholder}
                            value={answers[q.id] || ''}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  /* SHRNUTI - PRINT CONTENT */
                  <div className="flex flex-col items-center print-content">
                    <div className="w-full flex justify-between items-end mb-10 border-b-2 border-[#FAF6F2] pb-6">
                       <div className="text-left">
                          <h2 className="text-3xl font-black text-[#2D2D2D] tracking-tight mb-1">Koucovaci sezeni</h2>
                          <p className="text-[#ff8474] font-bold uppercase text-[10px] tracking-widest">{answers.jmeno_koucovaneho || "KOUCOVANY"}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[#A5A5A5] text-[10px] font-black uppercase tracking-widest">{getFormattedDate()}</p>
                       </div>
                    </div>
                    
                    <div className="w-full max-w-3xl flex flex-col items-center gap-6">
                      <div className="relative w-full mb-4">
                         <svg viewBox="0 0 500 220" className="w-full drop-shadow-xl print-svg">
                            <path d="M250 10 L490 210 L10 210 Z" fill="white" stroke="#FAF6F2" strokeWidth="1" />
                            <foreignObject x="100" y="80" width="300" height="120">
                              <div className="flex flex-col items-center justify-center h-full text-center px-4 overflow-hidden">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#FBBF24] mb-2">SNILEK</h4>
                                <p className="text-[11px] text-[#4A4A4A] line-clamp-4 leading-relaxed italic">
                                  {answers.vize_film || answers.vize_popis || "Vize nebyla definovana."}
                                </p>
                              </div>
                            </foreignObject>
                         </svg>
                      </div>

                      <div className="w-full flex flex-col gap-4">
                        <div className="bg-white border-2 border-[#FAF6F2] rounded-3xl p-6 text-center w-full print-box">
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-[#10B981] mb-3">REALIZATOR</h4>
                           <p className="text-xs text-[#4A4A4A] leading-relaxed">{answers.real_jak || "-"}</p>
                        </div>
                        <div className="bg-white border-2 border-[#FAF6F2] rounded-3xl p-6 text-center w-full print-box">
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-[#EF4444] mb-3">KRITIK</h4>
                           <p className="text-xs text-[#4A4A4A] leading-relaxed">{answers.kritik_predpoklad || "-"}</p>
                        </div>
                      </div>

                      <div className="w-full bg-[#2D2D2D] p-8 rounded-[3rem] text-white shadow-2xl flex flex-col md:flex-row gap-6 items-center print-dark-box">
                         <div className="flex-1 text-center md:text-left">
                            <p className="text-[10px] font-black text-[#ff8474] uppercase tracking-[0.2em] mb-2">PRVNI KROK</p>
                            <p className="text-lg font-bold leading-tight">{answers.zaver_plan || "Nebyl stanoven."}</p>
                         </div>
                         <div className="h-12 w-[1px] bg-white/10 hidden md:block"></div>
                         <div className="text-center md:text-right">
                            <p className="text-[10px] font-black text-[#A5A5A5] uppercase tracking-widest mb-1">TEMA</p>
                            <p className="text-sm font-medium opacity-80">{answers.tema || "-"}</p>
                         </div>
                      </div>
                    </div>

                    <button onClick={() => window.print()} className="mt-12 flex items-center gap-3 bg-[#ff8474] text-white px-10 py-4 rounded-3xl font-bold hover:bg-[#e06b5c] shadow-lg shadow-[#ff8474]/30 transition-all no-print">
                      <Printer size={20} /> TISK DO PDF
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-[#FAF6F2] flex justify-between no-print">
                <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className={`flex items-center gap-2 px-6 py-2 rounded-2xl font-bold transition-all ${step === 0 ? 'text-[#e5ddd2] cursor-not-allowed' : 'text-[#A5A5A5] hover:bg-[#FAF6F2]'}`}>
                  <ChevronLeft size={20} /> Zpet
                </button>
                {step < 4 ? (
                  <button onClick={() => setStep(step + 1)} className="flex items-center gap-3 px-10 py-4 bg-[#ff8474] text-white rounded-3xl font-bold hover:bg-[#e06b5c] shadow-xl shadow-[#ff8474]/20 active:scale-95 transition-all group">
                    Pokracovat <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                  </button>
                ) : (
                  <button onClick={() => { setStep(0); setTimer(0); setIsTimerRunning(false); }} className="px-10 py-4 bg-[#FAF6F2] text-[#4A4A4A] rounded-3xl font-bold hover:bg-[#e5ddd2] transition-all">
                    Nove sezeni
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Guide Panel */}
          <div className={`lg:col-span-3 space-y-6 ${step === 4 ? 'hidden' : ''} no-print`}>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-white/60 flex flex-col h-full sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <Info size={18} className="text-[#ff8474]" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5A5A5]">Pruvodce Kouce</h3>
              </div>
              <div className="space-y-6 overflow-y-auto pr-2">
                {currentStepData.guide && (
                  <>
                    <div className="bg-[#FAF6F2] p-5 rounded-[2rem]">
                       <p className="text-[9px] font-black text-[#A5A5A5] uppercase mb-2">MENTALNI NASTAVENI</p>
                       <p className="text-xs font-bold text-[#2D2D2D] uppercase leading-tight tracking-wide">{currentStepData.guide.state || "PRIPRAVA"}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${step === 0 ? 'bg-[#ff8474]' : step === 1 ? 'bg-[#FBBF24]' : step === 2 ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`}></div>
                        <div>
                          <p className="text-[9px] font-black text-[#D1D1D1] uppercase mb-0.5">POSTOJ</p>
                          <p className="text-xs text-[#7A7A7A] leading-snug">{currentStepData.guide.body || "Standardni"}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#e5ddd2] mt-1 shrink-0"></div>
                        <div>
                          <p className="text-[9px] font-black text-[#D1D1D1] uppercase mb-0.5">HLAS</p>
                          <p className="text-xs text-[#7A7A7A] leading-snug">{currentStepData.guide.voice || "Prirozeny"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-[#FAF6F2]">
                      <div className="flex items-center gap-2 mb-4">
                        <MessageSquare size={14} className="text-[#ff8474]" />
                        <span className="text-[9px] font-black uppercase text-[#A5A5A5] tracking-[0.2em]">FRAZE</span>
                      </div>
                      <div className="space-y-4">
                        {currentStepData.guide.phrases?.map((phrase, i) => (
                          <div key={i} className="bg-[#FAF6F2] p-4 rounded-2xl border-l-4 border-[#ff8474]">
                            <p className="text-xs text-[#4A4A4A] leading-relaxed italic">{phrase}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-auto pt-8">
                <div className="bg-[#FAF6F2] p-4 rounded-2xl border border-white/40">
                  <p className="text-[9px] font-black text-[#ff8474] uppercase tracking-widest mb-1 underline underline-offset-4">Mind Spark Concept</p>
                  <p className="text-[10px] text-[#A5A5A5] leading-tight italic">
                    Efektivni koucovani vyzaduje striktni oddeleni techto tri vnitrnich svetu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-16 text-center text-[#D1D1D1] text-[10px] uppercase tracking-[0.3em] pb-12 no-print">
        <p>Mind Spark 2026 - Disney Model - Profesionalni Edice</p>
      </footer>
      
      <style>{`
        @media print {
          .no-print { display: none !important; }
          
          body, html {
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .min-h-screen {
            min-height: auto !important;
          }
          
          .print-main {
            padding: 20px !important;
            box-shadow: none !important;
            border: none !important;
          }
          
          .print-content {
            width: 100% !important;
          }
          
          .print-svg {
            max-width: 400px !important;
            margin: 0 auto !important;
          }
          
          .print-box {
            background-color: white !important;
            border: 2px solid #e5ddd2 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .print-dark-box {
            background-color: #2D2D2D !important;
            color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .text-\\[\\#FBBF24\\] { color: #FBBF24 !important; }
          .text-\\[\\#10B981\\] { color: #10B981 !important; }
          .text-\\[\\#EF4444\\] { color: #EF4444 !important; }
          .text-\\[\\#ff8474\\] { color: #ff8474 !important; }
          
          * {
            overflow: visible !important;
          }
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
