import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Save, ClipboardList, Play, Pause, RotateCcw, CheckCircle, Lightbulb, Wrench, Search, Printer, MessageSquare, Info, Anchor, User, Calendar, ArrowLeft, Home } from 'lucide-react';

const DisneyModel = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [answers, setAnswers] = useState({
    jmeno_klienta: '',
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

  const getFormattedDate = () => {
    return answers.datum_sezeni || new Date().toLocaleDateString('cs-CZ');
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
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
      title: 'Úvod',
      icon: <ClipboardList className="w-5 h-5" />,
      color: 'bg-[#F57C69]',
      questions: [
        { id: 'jmeno_klienta', label: 'JMÉNO KOUČOVANÉHO', placeholder: 'Jméno', type: 'text', icon: <User size={16}/> },
        { id: 'datum_sezeni', label: 'DATUM SEZENÍ', placeholder: 'DD.MM.RRRR', type: 'text', icon: <Calendar size={16}/> },
        { id: 'tema', label: 'TÉMA', placeholder: 'Projekt, cíl nebo sen k realizaci', type: 'text' },
        { id: 'tema_cil', label: 'CÍL SEZENÍ', placeholder: 'Co by pro Vás bylo nejskutečnější si odnést?', type: 'textarea' },
        { id: 'vize_zacatek', label: 'VIZE NA ZAČÁTKU', placeholder: 'Jaká je Vaše vstupní představa? Až to bude hotové, budu...', type: 'textarea' },
        { id: 'barva_kotvy', label: 'DEFINICE KOTEV', placeholder: 'Např. Snílek - žlutá, Realista - zelená, Kritik - černá...', type: 'text' }
      ],
      guide: {
        tips: ["Udržujte nastavení mysli oddělené (diferenciace).", "Koučovaný si volí barvy nebo místa pro každou fázi.", "Zapište si zvolené kotvy pro konzistenci."],
        phrases: ["Vyberte si prosím tři barvy nebo místa pro role Snílka, Realisty a Kritika.", "Cílem je oddělit tři různé konverzace pro posílení plánování."]
      }
    },
    {
      id: 'snilek',
      title: 'Snílek',
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'bg-[#FBBF24]',
      questions: [
        { id: 'vize_cas', label: 'POHLED DO BUDOUCNOSTI (5 LET)', placeholder: 'Co vidíte v pět let vzdálené budoucnosti?', type: 'text' },
        { id: 'vize_popis', label: 'PANORAMA MOŽNOSTÍ', placeholder: 'Pohlédněte na svítání velkého snu... Co konkrétně vidíte?', type: 'textarea' },
        { id: 'vize_film', label: 'VNITŘNÍ „ČTYŘHVĚZDIČKOVÝ" FILM', placeholder: 'Sledujte sám/sama sebe v akci. Co vidíte v živých barvách?', type: 'textarea' },
        { id: 'vize_pocity', label: 'HODNOTY A POCITY', placeholder: 'Jakou největší hodnotu tento sen přináší?', type: 'text' },
        { id: 'vize_telo', label: 'TĚLESNÁ KOTVA', placeholder: 'Kde v těle vnímáte tento „rozvíjející se sen"?', type: 'text' }
      ],
      guide: {
        state: "DISOCIOVANÝ (vizionář)",
        body: "Vzpřímený, uvolněný, hlava a ramena zdvižena. Oči vzhůru.",
        voice: "Lehký, výše položený tón.",
        phrases: ["Podívejte se do dálky na svou vizi...", "Pohlédněte na svítání velkého snu.", "Co byste viděl/a, kdybyste o tom natočil/a film?", "Dívejte se na sebe, jak hrajete v příběhu nejvyšší hodnoty."]
      }
    },
    {
      id: 'realizator',
      title: 'Realizátor',
      icon: <Wrench className="w-5 h-5" />,
      color: 'bg-[#10B981]',
      questions: [
        { id: 'real_energie', label: 'ROVNOVÁHA ENERGIE A HODNOTY', placeholder: 'Stojí vynaložená energie za to? Jsou zdroje v rovnováze?', type: 'text' },
        { id: 'real_jak', label: 'FYZICKÉ PROCHÁZENÍ KROKŮ', placeholder: 'Jako byste kroky fyzicky cítil(a)... Jak jste to udělal(a)?', type: 'textarea' },
        { id: 'real_milniky', label: 'OKAMŽITÉ NAPLŇOVÁNÍ', placeholder: 'Jaké jsou milníky v čase?', type: 'textarea' }
      ],
      guide: {
        state: "ASOCIOVANÝ (v akci)",
        body: "Zaměření kupředu, aktivní postoj „pojďme na to".",
        voice: "Věcný, procedurální tón.",
        phrases: ["Nasaďte si (zvolenou) kotvu a zamyslete se nad kroky.", "Představte si činnosti, jako byste je právě vykonával/a.", "Stojí to za to? Jsou energie a hodnota v rovnováze?"]
      }
    },
    {
      id: 'kritik',
      title: 'Kritik',
      icon: <Search className="w-5 h-5" />,
      color: 'bg-[#EF4444]',
      questions: [
        { id: 'kritik_predpoklad', label: '„PŘEDPOKLÁDEJME, ŽE..."', placeholder: 'Jaké otázky by si kladl kritik?', type: 'textarea' },
        { id: 'kritik_uhel_pohledu', label: 'POZICE JINÉHO ÚHLU POHLEDU', placeholder: 'Co by řekl bankéř nebo konkurence?', type: 'textarea' },
        { id: 'kritik_napady', label: 'CITLIVOST VŮČI OSTATNÍM', placeholder: 'Jak spojit zájmy ostatních se svými?', type: 'textarea' },
        { id: 'zaver_plan', label: 'PRVNÍ KONKRÉTNÍ KROK', placeholder: 'Co konkrétně a hmatatelně uděláte jako první krok po tomto sezení?', type: 'textarea' }
      ],
      guide: {
        state: "VŠECHNY SYSTÉMY (otázky)",
        body: "Asymetricky vychýlené, ruka u brady. Oči těkají dolů.",
        voice: "Pomalý, měkký, tázavý tón.",
        phrases: ["Vžijte se do pozice bankovního úředníka, který schvaluje úvěr.", "Kdyby měl konkurent výhodu, jak byste produkt vylepšil/a?", "Jaký je ten nejmenší možný první krok, který můžete udělat hned?"]
      }
    },
    {
      id: 'summary',
      title: 'Shrnutí',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'bg-[#F57C69]',
      questions: []
    }
  ];

  const currentStepData = steps[step];

  return (
    <div className="min-h-screen bg-[#FBF7F4] text-[#4A4A4A] font-sans selection:bg-[#F57C69]/20">
      <div className="max-w-[1400px] mx-auto p-4 md:p-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white/40 shadow-sm">
          <div className="flex items-center gap-4">
            {onBack && (
              <button 
                onClick={onBack}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors no-print"
              >
                <ArrowLeft size={16} />
                <Home size={16} />
              </button>
            )}
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold tracking-tight text-[#2D2D2D]">Disneyho model</h1>
              <p className="text-[#A5A5A5] text-sm font-medium">profesionální koučovací technika <span className="text-[#F57C69] font-bold ml-1">by Mind Spark</span></p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 no-print">
            <div className={`px-5 py-2.5 rounded-2xl font-mono text-lg flex items-center gap-3 transition-colors ${timer > 5400 ? 'bg-red-50 text-red-600' : 'bg-white shadow-inner border border-slate-100'}`}>
              <span className="text-slate-400"><RotateCcw size={16} onClick={() => {setTimer(0); setIsTimerRunning(false)}} className="cursor-pointer hover:text-[#F57C69]"/></span>
              {formatTime(timer)}
              <button onClick={() => setIsTimerRunning(!isTimerRunning)} className="p-1.5 bg-[#F57C69] text-white rounded-xl hover:bg-[#E26A59] transition-all">
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
                  ${step === idx 
                    ? 'bg-[#F57C69] text-white shadow-lg shadow-[#F57C69]/20' 
                    : 'text-[#A5A5A5] hover:bg-slate-50 hover:text-[#F57C69]'
                  }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === idx ? 'bg-white/20' : 'bg-[#FBF7F4]'}`}>
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
                <div className={`w-0 h-0 border-l-[45px] border-l-transparent border-r-[45px] border-r-transparent border-b-[45px] transition-all duration-300 cursor-pointer ${step === 1 ? 'border-b-[#FBBF24] scale-110' : 'border-b-[#FBF7F4]'}`} onClick={() => setStep(1)}></div>
                <div className={`w-28 h-14 mt-2 border-2 transition-all duration-300 cursor-pointer rounded-xl ${step === 2 ? 'bg-[#10B981] border-[#10B981] scale-110 text-white' : 'bg-white border-[#FBF7F4]'}`} onClick={() => setStep(2)}></div>
                <div className={`w-28 h-14 mt-2 border-2 transition-all duration-300 cursor-pointer rounded-xl ${step === 3 ? 'bg-[#EF4444] border-[#EF4444] scale-110 text-white' : 'bg-white border-[#FBF7F4]'}`} onClick={() => setStep(3)}></div>
                <div className={`w-28 h-14 mt-2 border-2 transition-all duration-300 cursor-pointer rounded-xl ${step === 0 ? 'bg-[#F57C69] border-[#F57C69] text-white' : 'bg-white border-[#FBF7F4]'}`} onClick={() => setStep(0)}></div>
              </div>
            </div>
          </div>

          {/* Main Interaction Area */}
          <div className={`${step === 4 ? 'lg:col-span-12' : 'lg:col-span-7'} space-y-6`}>
            <div className={`bg-white p-10 rounded-[2.5rem] shadow-sm border border-white/60 min-h-[650px] flex flex-col print-area relative overflow-hidden`}>
              
              {/* Anchor Reminder */}
              {step > 0 && step < 4 && answers.barva_kotvy && (
                <div className="mb-8 bg-[#2D2D2D] text-white p-4 rounded-2xl flex items-center justify-between no-print shadow-xl">
                  <div className="flex items-center gap-3">
                    <Anchor size={18} className="text-[#F57C69]" />
                    <span className="text-[10px] font-black tracking-widest text-[#888]">AKTIVNÍ KOTVA</span>
                  </div>
                  <span className="text-sm font-bold text-[#F57C69] uppercase">{answers.barva_kotvy}</span>
                </div>
              )}

              {/* Step Title Header (O technice) */}
              {step === 0 && (
                <div className="mb-8 bg-[#F3EDE8] p-6 rounded-2xl border border-[#E8E0D8] no-print">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-[#F57C69] mb-2">O KOUČOVACÍ TECHNICE</h3>
                   <p className="text-xs leading-relaxed text-[#7A7A7A]">
                     Důsledným oddělením fází Snílka, Realisty a Kritika usnadníte tři odlišné konverzace. Tím, jak se koučovaný posunuje od jedné fáze k druhé, dochází k posilování jeho plánovacích schopností.
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
                            className="w-full p-4 rounded-2xl border border-[#E8E0D8] bg-white focus:ring-2 focus:ring-[#F57C69] focus:border-transparent outline-none transition-all placeholder:text-[#D1D1D1] text-sm"
                            placeholder={q.placeholder}
                            value={answers[q.id] || ''}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                          />
                        ) : (
                          <textarea
                            rows={4}
                            className="w-full p-4 rounded-2xl border border-[#E8E0D8] bg-white focus:ring-2 focus:ring-[#F57C69] focus:border-transparent outline-none transition-all resize-none placeholder:text-[#D1D1D1] text-sm"
                            placeholder={q.placeholder}
                            value={answers[q.id] || ''}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-full flex justify-between items-end mb-10 border-b-2 border-[#FBF7F4] pb-6">
                       <div className="text-left">
                          <h2 className="text-3xl font-black text-[#2D2D2D] tracking-tight mb-1">Koučovací sezení</h2>
                          <p className="text-[#F57C69] font-bold uppercase text-[10px] tracking-widest">{answers.jmeno_klienta || "KOUČOVANÝ"}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[#A5A5A5] text-[10px] font-black uppercase tracking-widest">{getFormattedDate()}</p>
                       </div>
                    </div>
                    
                    <div className="w-full max-w-3xl flex flex-col items-center gap-6">
                      <div className="relative w-full mb-4">
                         <svg viewBox="0 0 500 220" className="w-full drop-shadow-xl">
                            <path d="M250 10 L490 210 L10 210 Z" fill="white" stroke="#FBF7F4" strokeWidth="1" />
                            <foreignObject x="100" y="80" width="300" height="120">
                              <div className="flex flex-col items-center justify-center h-full text-center px-4 overflow-hidden">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#FBBF24] mb-2">SNÍLEK</h4>
                                <p className="text-[11px] text-[#4A4A4A] line-clamp-4 leading-relaxed italic">
                                  {answers.vize_film || answers.vize_popis || "Vize nebyla definována."}
                                </p>
                              </div>
                            </foreignObject>
                         </svg>
                      </div>

                      <div className="w-full flex flex-col gap-4">
                        <div className="bg-white border-2 border-[#FBF7F4] rounded-3xl p-6 text-center w-full">
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-[#10B981] mb-3">REALIZÁTOR</h4>
                           <p className="text-xs text-[#4A4A4A] leading-relaxed">{answers.real_jak || "-"}</p>
                        </div>
                        <div className="bg-white border-2 border-[#FBF7F4] rounded-3xl p-6 text-center w-full">
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-[#EF4444] mb-3">KRITIK</h4>
                           <p className="text-xs text-[#4A4A4A] leading-relaxed">{answers.kritik_predpoklad || "-"}</p>
                        </div>
                      </div>

                      <div className="w-full bg-[#2D2D2D] p-8 rounded-[3rem] text-white shadow-2xl flex flex-col md:flex-row gap-6 items-center">
                         <div className="flex-1 text-center md:text-left">
                            <p className="text-[10px] font-black text-[#F57C69] uppercase tracking-[0.2em] mb-2">PRVNÍ KROK</p>
                            <p className="text-lg font-bold leading-tight">{answers.zaver_plan || "Nebyl stanoven."}</p>
                         </div>
                         <div className="h-12 w-[1px] bg-white/10 hidden md:block"></div>
                         <div className="text-center md:text-right">
                            <p className="text-[10px] font-black text-[#A5A5A5] uppercase tracking-widest mb-1">TÉMA</p>
                            <p className="text-sm font-medium opacity-80">{answers.tema || "-"}</p>
                         </div>
                      </div>
                    </div>

                    <button onClick={() => window.print()} className="mt-12 flex items-center gap-3 bg-[#F57C69] text-white px-10 py-4 rounded-3xl font-bold hover:bg-[#E26A59] shadow-lg shadow-[#F57C69]/30 transition-all no-print">
                      <Printer size={20} /> TISK DO PDF
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-[#FBF7F4] flex justify-between no-print">
                <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className={`flex items-center gap-2 px-6 py-2 rounded-2xl font-bold transition-all ${step === 0 ? 'text-slate-200 cursor-not-allowed' : 'text-[#A5A5A5] hover:bg-[#FBF7F4]'}`}>
                  <ChevronLeft size={20} /> Zpět
                </button>
                {step < 4 ? (
                  <button onClick={() => setStep(step + 1)} className="flex items-center gap-3 px-10 py-4 bg-[#F57C69] text-white rounded-3xl font-bold hover:bg-[#E26A59] shadow-xl shadow-[#F57C69]/20 active:scale-95 transition-all group">
                    Pokračovat <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                  </button>
                ) : (
                  <button onClick={() => { setStep(0); setTimer(0); setIsTimerRunning(false); }} className="px-10 py-4 bg-[#FBF7F4] text-[#4A4A4A] rounded-3xl font-bold hover:bg-[#F3EDE8] transition-all">
                    Nové sezení
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Guide Panel */}
          <div className={`lg:col-span-3 space-y-6 ${step === 4 ? 'hidden' : ''} no-print`}>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-white/60 flex flex-col h-full sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <Info size={18} className="text-[#F57C69]" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A5A5A5]">Průvodce Kouče</h3>
              </div>

              <div className="space-y-6 overflow-y-auto pr-2">
                {currentStepData.guide && (
                  <>
                    <div className="bg-[#FBF7F4] p-5 rounded-[2rem]">
                       <p className="text-[9px] font-black text-[#A5A5A5] uppercase mb-2">MENTÁLNÍ NASTAVENÍ</p>
                       <p className="text-xs font-bold text-[#2D2D2D] uppercase leading-tight tracking-wide">{currentStepData.guide.state || "PŘÍPRAVA"}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${step === 0 ? 'bg-[#F57C69]' : step === 1 ? 'bg-[#FBBF24]' : step === 2 ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`}></div>
                        <div>
                          <p className="text-[9px] font-black text-[#D1D1D1] uppercase mb-0.5">POSTOJ</p>
                          <p className="text-xs text-[#7A7A7A] leading-snug">{currentStepData.guide.body || "Standardní"}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-100 mt-1 shrink-0"></div>
                        <div>
                          <p className="text-[9px] font-black text-[#D1D1D1] uppercase mb-0.5">HLAS</p>
                          <p className="text-xs text-[#7A7A7A] leading-snug">{currentStepData.guide.voice || "Přirozený"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[#FBF7F4]">
                      <div className="flex items-center gap-2 mb-4">
                        <MessageSquare size={14} className="text-[#F57C69]" />
                        <span className="text-[9px] font-black uppercase text-[#A5A5A5] tracking-[0.2em]">FRÁZE</span>
                      </div>
                      <div className="space-y-4">
                        {currentStepData.guide.phrases?.map((phrase, i) => (
                          <div key={i} className="bg-[#FBF7F4] p-4 rounded-2xl border-l-4 border-[#F57C69]">
                            <p className="text-xs text-[#4A4A4A] leading-relaxed italic">„{phrase}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-auto pt-8">
                <div className="bg-[#F3EDE8] p-4 rounded-2xl border border-white/40">
                  <p className="text-[9px] font-black text-[#F57C69] uppercase tracking-widest mb-1 underline underline-offset-4">Mind Spark Concept</p>
                  <p className="text-[10px] text-[#A5A5A5] leading-tight italic">
                    Efektivní koučování vyžaduje striktní oddělení těchto tří vnitřních světů.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <footer className="mt-16 text-center text-[#D1D1D1] text-[10px] uppercase tracking-[0.3em] pb-12 no-print">
        <p>Mind Spark © 2026 • Disneyho Model • Profesionální Edice</p>
      </footer>
      
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .p-4, .p-8 { padding: 0 !important; }
          .max-w-[1400px] { max-width: 100% !important; }
          .shadow-sm, .shadow-xl { box-shadow: none !important; }
          .bg-[#FBF7F4] { background: white !important; }
          .print-area { border: none !important; padding: 0 !important; width: 100% !important; }
          input, textarea { border: 1px solid #eee !important; }
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }

        @keyframes soft-pulse {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.85; transform: translateY(-1px); }
        }
        .animate-pulse {
          animation: soft-pulse 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DisneyModel;
