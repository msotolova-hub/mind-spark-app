import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Copy, 
  CheckCircle, 
  User, 
  HelpCircle,
  MapPin,
  Check,
  Sparkles,
  Feather,
  Quote,
  Flame,
  Printer,
  Home
} from 'lucide-react';

const ThreeAdvisors = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);
  
  const [data, setData] = useState({
    topic: '',
    goldenQuestion: '',
    meetingPlace: '',
    advisorName1: '',
    advisorName2: '',
    advisorName3: '',
    advisor1Response: '',
    advisor2Response: '',
    advisor3Response: '',
    synthesis: '',
    actionStep: ''
  });
  const [isCopied, setIsCopied] = useState(false);

  const getAdvisorName = (num) => {
    const name = data[`advisorName${num}`];
    return name && name.trim() !== '' ? name : `Rádce č. ${num}`;
  };
  
  const steps = [
    {
      id: 'intro',
      shortTitle: 'Úvod',
      title: 'Tři rádcové - profesionální koučovací technika by Mind Spark',
      description: 'Získejte odpovědi skrze moudrost tří postav. Provedu vás procesem definování otázky, výběru rádců a integrace jejich rad.',
      icon: <Flame size={32} />,
      bgColor: 'bg-[#ff8474]',
      textColor: 'text-white',
      accentColor: 'text-orange-100'
    },
    {
      id: 'topic',
      shortTitle: 'Téma',
      title: 'Vaše Téma',
      description: 'Co je tou situací, kterou dnes chcete prozkoumat?',
      placeholder: 'Zde si poznamenejte své téma...',
      inputType: 'textarea',
      field: 'topic',
      bgColor: 'bg-[#FFF8F0]', 
      textColor: 'text-[#2D1810]',
      accentColor: 'text-[#ff8474]'
    },
    {
      id: 'goldenQuestion',
      shortTitle: 'Otázka',
      title: 'Klíčová otázka',
      description: 'Existuje jedna otázka, na kterou kdybyste znali odpověď, vyřešilo by to vaši situaci.',
      placeholder: 'Jak zní ta otázka?',
      inputType: 'textarea', 
      field: 'goldenQuestion',
      icon: <HelpCircle size={28} />,
      bgColor: 'bg-[#FFEDD5]', 
      textColor: 'text-[#7C2D12]', 
      accentColor: 'text-[#ff8474]'
    },
    {
      id: 'setupAdvisors',
      shortTitle: 'Výběr',
      title: 'Pozvání rádců',
      description: 'Zvolte si tři postavy (reálné, fiktivní nebo archetypální).',
      inputType: 'custom_advisors',
      bgColor: 'bg-white',
      textColor: 'text-[#2D1810]',
      icon: <Users size={28} />,
      accentColor: 'text-[#ff8474]'
    },
    {
      id: 'meetingPlace',
      shortTitle: 'Místo',
      title: 'Místo setkání',
      description: 'Kde se s vašimi rádci potkáte? Popište atmosféru tohoto prostoru.',
      placeholder: 'Popis místa...',
      inputType: 'textarea',
      field: 'meetingPlace',
      icon: <MapPin size={28} />,
      bgColor: 'bg-[#F5F5F4]', 
      textColor: 'text-[#44403C]', 
      accentColor: 'text-[#78716C]'
    },
    {
      id: 'advisor1',
      shortTitle: '1. Rádce',
      title: `Setkání: ${getAdvisorName(1)}`,
      description: `Vstupujete do prostoru "${data.meetingPlace}". Čeká tu ${getAdvisorName(1)}.`,
      placeholder: `Odpověď rádce...`,
      inputType: 'textarea',
      field: 'advisor1Response',
      icon: <User size={28} />,
      bgColor: 'bg-[#FFF7ED]', 
      textColor: 'text-[#7C2D12]',
      accentColor: 'text-[#ff8474]'
    },
    {
      id: 'advisor2',
      shortTitle: '2. Rádce',
      title: `Setkání: ${getAdvisorName(2)}`,
      description: `Nyní přichází ${getAdvisorName(2)}. Jaká je odpověď z této perspektivy?`,
      placeholder: `Odpověď rádce...`,
      inputType: 'textarea',
      field: 'advisor2Response',
      icon: <User size={28} />,
      bgColor: 'bg-[#FAFAF9]', 
      textColor: 'text-[#57534E]',
      accentColor: 'text-[#78716C]'
    },
    {
      id: 'advisor3',
      shortTitle: '3. Rádce',
      title: `Setkání: ${getAdvisorName(3)}`,
      description: `Jako poslední přichází ${getAdvisorName(3)}. Co vám radí?`,
      placeholder: `Odpověď rádce...`,
      inputType: 'textarea',
      field: 'advisor3Response',
      icon: <User size={28} />,
      bgColor: 'bg-[#FED7AA]', 
      textColor: 'text-[#7C2D12]',
      accentColor: 'text-[#e06b5c]'
    },
    {
      id: 'synthesis',
      shortTitle: 'Syntéza',
      title: 'Porada Rádců',
      description: 'V čem se shodují? V čem se liší? Jaké nové řešení vyplývá?',
      placeholder: 'Můj vhled...',
      inputType: 'textarea',
      field: 'synthesis',
      bgColor: 'bg-white', 
      textColor: 'text-[#2D1810]',
      accentColor: 'text-[#ff8474]'
    },
    {
      id: 'action',
      shortTitle: 'Akce',
      title: 'První krok',
      description: 'Jaký je jeden konkrétní krok, který uděláte?',
      placeholder: 'Můj závazek...',
      inputType: 'textarea',
      field: 'actionStep',
      icon: <CheckCircle size={28} />,
      bgColor: 'bg-[#e06b5c]', 
      textColor: 'text-white',
      accentColor: 'text-orange-200'
    },
    {
      id: 'summary',
      shortTitle: 'Shrnutí',
      title: 'Shrnutí Sezení',
      description: 'Přehled vaší cesty.',
      bgColor: 'bg-[#FFF8F0]', 
      textColor: 'text-[#2D1810]',
      accentColor: 'text-[#ff8474]'
    }
  ];

  useEffect(() => {
    if (currentStep > maxStepReached) {
      setMaxStepReached(currentStep);
    }
  }, [currentStep, maxStepReached]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const jumpToStep = (index) => {
    if (index <= maxStepReached) setCurrentStep(index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handlePrint = () => {
    window.print();
  };

  const copyToClipboard = () => {
    const text = `
Téma: ${data.topic}
Klíčová otázka: ${data.goldenQuestion}
Místo setkání: ${data.meetingPlace}
-------------------
1. ${getAdvisorName(1)}: ${data.advisor1Response}
2. ${getAdvisorName(2)}: ${data.advisor2Response}
3. ${getAdvisorName(3)}: ${data.advisor3Response}
-------------------
Syntéza: ${data.synthesis}
Akční krok: ${data.actionStep}
    `;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const resetApp = () => {
    if(window.confirm("Opravdu chcete vymazat všechna data a začít znovu?")) {
      setData({
        topic: '', goldenQuestion: '', meetingPlace: '',
        advisorName1: '', advisorName2: '', advisorName3: '',
        advisor1Response: '', advisor2Response: '', advisor3Response: '',
        synthesis: '', actionStep: ''
      });
      setCurrentStep(0);
      setMaxStepReached(0);
    }
  };

  const currentStepData = steps[currentStep];

  const StepIndicator = () => (
    <div className="flex justify-center mb-6 px-4 print:hidden">
      <div className="flex items-center gap-1.5 bg-white p-2 rounded-full shadow-sm border border-orange-100">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isClickable = index <= maxStepReached;

          return (
            <button
              key={step.id}
              onClick={() => jumpToStep(index)}
              disabled={!isClickable}
              className={`
                relative rounded-full transition-all duration-300 flex items-center justify-center
                ${isActive ? 'w-8 h-8 bg-[#ff8474] text-white shadow-md' : 'w-2 h-2'}
                ${isCompleted && !isActive ? 'bg-orange-200 w-2 h-2 hover:bg-[#ff8474]' : ''}
                ${!isActive && !isCompleted ? 'bg-stone-200' : ''}
                ${isClickable ? 'cursor-pointer' : 'cursor-default'}
              `}
              title={step.shortTitle}
            >
              {isActive && <span className="text-[10px] font-bold">{index + 1}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderContextCards = () => {
    if (!currentStepData.id.startsWith('advisor')) return null;
    return (
      <div className="flex flex-col gap-3 mb-8 text-sm">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F5F5F4] border border-[#E7E5E4] text-[#44403C]">
           <MapPin size={16} className="mt-0.5 shrink-0 text-[#A8A29E]" /> 
           <div>
             <span className="text-xs font-bold uppercase tracking-wider text-[#A8A29E] block mb-1">Místo setkání</span>
             <span className="italic">"{data.meetingPlace || "..."}"</span>
           </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FFF7ED] border border-[#FFEDD5] text-[#9A3412]">
           <HelpCircle size={16} className="mt-0.5 shrink-0 text-[#ff8474]" /> 
           <div>
             <span className="text-xs font-bold uppercase tracking-wider text-[#ff8474] block mb-1">Otázka</span>
             <span className="italic">"{data.goldenQuestion || "..."}"</span>
           </div>
        </div>
      </div>
    );
  };

  // --- Summary View ---
  if (currentStepData.id === 'summary') {
    return (
      <div className="min-h-screen bg-[#FFF8F0] font-sans text-[#2D1810] p-4 md:p-8 print:bg-white print:p-0">
        <div className="max-w-4xl mx-auto print:max-w-none">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-8 print:hidden">
            <div className="flex items-center gap-4">
              {onBack && (
                <button 
                  onClick={onBack}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft size={16} />
                  <Home size={16} />
                </button>
              )}
              <h1 className="text-2xl font-serif font-bold text-[#2D1810] flex items-center gap-2">
                <Quote size={24} className="text-[#ff8474]"/> Váš zápis
              </h1>
            </div>
            <div className="flex gap-2">
              <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-[#ff8474] hover:bg-[#e06b5c] text-white rounded-lg transition-all shadow-md shadow-orange-200 text-sm font-medium">
                <Printer size={14} />
                Tisknout
              </button>
              <button onClick={copyToClipboard} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E7E5E4] hover:border-[#ff8474] text-[#44403C] hover:text-[#ff8474] rounded-lg transition-all shadow-sm text-sm font-medium">
                {isCopied ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
                {isCopied ? 'Hotovo' : 'Kopírovat'}
              </button>
              <button onClick={resetApp} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E7E5E4] hover:text-red-600 hover:border-red-200 text-[#44403C] rounded-lg transition-all shadow-sm text-sm font-medium">
                <RotateCcw size={14} /> Nové
              </button>
            </div>
          </div>

          {/* Print Header */}
          <div className="hidden print:block mb-8 border-b pb-4">
            <h1 className="text-2xl font-serif font-bold text-[#2D1810] mb-2">Tři rádcové - Výstup ze sezení</h1>
            <p className="text-sm text-stone-500">by Mind Spark</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg shadow-orange-100/50 border border-[#FED7AA]/30 overflow-hidden print:shadow-none print:border-none print:rounded-none">
            {/* Top Info */}
            <div className="bg-[#FFF7ED] p-8 border-b border-[#FFEDD5] print:bg-white print:border-stone-200 print:p-0 print:pb-6 print:mb-6">
               <div className="max-w-3xl">
                 <div className="text-[#ff8474] text-xs font-bold uppercase tracking-widest mb-2">Téma</div>
                 <h2 className="text-xl md:text-2xl font-serif leading-tight text-[#2D1810] mb-6">{data.topic || "Bez názvu"}</h2>
                 
                 <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-[#FFEDD5] print:gap-4 print:pt-4">
                    <div>
                      <span className="block text-[#A8A29E] text-xs uppercase font-bold mb-1">Otázka</span>
                      <span className="font-serif italic text-[#e06b5c]">"{data.goldenQuestion}"</span>
                    </div>
                    <div>
                      <span className="block text-[#A8A29E] text-xs uppercase font-bold mb-1">Místo</span>
                      <span className="font-serif italic text-[#57534E]">"{data.meetingPlace}"</span>
                    </div>
                 </div>
               </div>
            </div>

            {/* Content Grid */}
            <div className="p-8 space-y-8 print:p-0">
               {/* Advisors */}
               <div className="grid lg:grid-cols-3 gap-6 print:block print:space-y-6">
                 {[1, 2, 3].map(num => (
                   <div key={num} className="bg-[#FAFAF9] p-5 rounded-lg border border-[#E7E5E4] hover:border-[#ff8474]/30 transition-colors print:bg-white print:border print:border-stone-200 print:mb-4 print:break-inside-avoid">
                     <h3 className="text-sm font-bold text-[#2D1810] mb-3 flex items-center gap-2 uppercase tracking-wide">
                       <span className="w-5 h-5 rounded-full bg-[#FFEDD5] flex items-center justify-center text-[10px] text-[#e06b5c] print:border print:border-stone-200">{num}</span>
                       {getAdvisorName(num)}
                     </h3>
                     <p className="text-[#57534E] text-sm leading-relaxed whitespace-pre-wrap">{data[`advisor${num}Response`] || "..."}</p>
                   </div>
                 ))}
               </div>

               {/* Synthesis & Action */}
               <div className="grid md:grid-cols-2 gap-6 print:block print:space-y-6 print:break-inside-avoid">
                  <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] shadow-sm print:border-stone-200 print:shadow-none print:mb-4">
                     <h3 className="text-[#2D1810] text-sm font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
                       <Sparkles size={14} className="text-[#ff8474]"/> Syntéza
                     </h3>
                     <p className="text-[#57534E] italic text-sm leading-relaxed">{data.synthesis || "..."}</p>
                  </div>
                  <div className="bg-[#ff8474] text-white p-6 rounded-xl shadow-lg shadow-orange-500/20 flex flex-col justify-center print:bg-white print:text-black print:border print:border-[#ff8474] print:shadow-none">
                     <h3 className="text-orange-100 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 print:text-[#ff8474]">
                        <CheckCircle size={14} className="text-white print:text-[#ff8474]"/> První krok
                     </h3>
                     <p className="text-lg font-serif print:text-black">{data.actionStep || "..."}</p>
                  </div>
               </div>
            </div>

            <div className="bg-[#FAFAF9] p-4 border-t border-[#E7E5E4] flex justify-center print:hidden">
              <button onClick={handlePrev} className="text-[#A8A29E] hover:text-[#57534E] font-medium text-xs flex items-center gap-2 transition-colors">
                <ArrowLeft size={12} /> Zpět k úpravám
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Wizard View ---
  return (
    <div className={`min-h-screen font-sans text-[#2D1810] flex flex-col items-center justify-center p-4 transition-colors duration-700 bg-[#FFF8F0]`}>
      
      {/* Back button */}
      {onBack && currentStep === 0 && (
        <div className="fixed top-4 left-4 z-50">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg hover:bg-gray-100 shadow-sm transition-colors"
          >
            <ArrowLeft size={16} />
            <Home size={16} />
          </button>
        </div>
      )}
      
      <div className="w-full max-w-xl relative">
        <StepIndicator />

        {/* Main Card */}
        <div className="bg-white shadow-xl shadow-orange-200/40 rounded-3xl overflow-hidden border border-white">
          
          {/* Header Area */}
          <div className={`
            relative p-8 text-center
            ${currentStepData.bgColor}
            ${currentStepData.textColor}
            transition-colors duration-500 ease-in-out
          `}>
             {currentStepData.icon && (
               <div className={`relative z-10 mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${currentStepData.textColor === 'text-white' ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                 <div className={currentStepData.textColor === 'text-white' ? 'text-white' : 'text-[#ff8474]'}>
                    {currentStepData.icon}
                 </div>
               </div>
             )}
             
             <h1 className="relative z-10 text-2xl font-serif font-bold mb-2">
               {currentStepData.title}
             </h1>
             <p className={`relative z-10 text-sm font-medium max-w-sm mx-auto leading-relaxed opacity-90`}>
               {currentStepData.description}
             </p>
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8 bg-white">
            {currentStepData.id === 'intro' ? (
               <div className="text-center">
                 <button 
                   onClick={handleNext}
                   className="inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all bg-[#ff8474] rounded-full hover:bg-[#e06b5c] hover:-translate-y-0.5 shadow-lg shadow-orange-200 text-sm tracking-wide"
                 >
                   Začít <ArrowRight size={16} className="ml-2" />
                 </button>
               </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                
                {renderContextCards()}

                {currentStepData.inputType === 'custom_advisors' ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(num => (
                      <div key={num} className="group">
                        <label className="block text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest mb-1.5 ml-1">
                          {num}. Rádce
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            name={`advisorName${num}`}
                            value={data[`advisorName${num}`]} 
                            onChange={handleChange}
                            placeholder={num === 1 ? "Moudrý stařec..." : num === 2 ? "Vnitřní dítě..." : "Kritik..."}
                            className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#E7E5E4] focus:border-[#ff8474] focus:bg-white outline-none transition-all rounded-lg text-base text-[#2D1810] placeholder:text-[#D6D3D1]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute top-4 left-4 text-[#D6D3D1]">
                      <Feather size={16} />
                    </div>
                    <textarea
                      name={currentStepData.field}
                      value={data[currentStepData.field]}
                      onChange={handleChange}
                      placeholder={currentStepData.placeholder}
                      className="w-full h-48 pl-10 pr-4 py-4 bg-[#FFF8F0] rounded-xl border border-[#E7E5E4] focus:bg-white focus:border-[#ff8474]/50 outline-none transition-all resize-none text-base text-[#2D1810] placeholder:text-[#D6D3D1] leading-relaxed font-medium"
                      autoFocus
                    />
                  </div>
                )}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-[#F5F5F4]">
                  <button 
                    onClick={handlePrev}
                    className="text-[#A8A29E] hover:text-[#57534E] px-2 py-2 font-medium flex items-center gap-1.5 transition-colors text-xs uppercase tracking-wider"
                  >
                    <ArrowLeft size={14} /> Zpět
                  </button>
                  
                  <button 
                    onClick={handleNext}
                    disabled={currentStepData.inputType === 'custom_advisors' ? (!data.advisorName1 || !data.advisorName2 || !data.advisorName3) : !data[currentStepData.field]}
                    className={`
                      px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 text-sm shadow-md
                      ${(currentStepData.inputType === 'custom_advisors' ? (!data.advisorName1 || !data.advisorName2 || !data.advisorName3) : !data[currentStepData.field])
                        ? 'bg-[#F5F5F4] text-[#D6D3D1] shadow-none cursor-not-allowed' 
                        : `bg-[#ff8474] text-white hover:bg-[#e06b5c] hover:-translate-y-0.5`
                      }
                    `}
                  >
                    {currentStep === steps.length - 2 ? 'Dokončit' : 'Pokračovat'} 
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeAdvisors;
