import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  TrendingDown, 
  Lightbulb, 
  CheckCircle, 
  Activity,
  Battery,
  BatteryCharging,
  Save,
  Plus,
  Trash2,
  FileText,
  Download,
  Droplets,
  Calendar,
  User,
  Printer,
  Home
} from 'lucide-react';

const EnergetickyKotel = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [isPdfReady, setIsPdfReady] = useState(false);
  
  const today = new Date().toISOString().split('T')[0];

  const [data, setData] = useState({
    clientName: "",
    date: today,
    topic: "Nedostatek životní, každodenní energie",
    goalOutcome: "",
    goalDeathbed: "",
    levelCurrent: 50,
    levelDesired: 80,
    levelMax: 90,
    levelMin: 20,
    inflows: [], 
    outflows: [],
    reflection: "",
    selectedInflowId: null,
    selectedOutflowId: null,
    optionsInflow: "",
    optionsOutflow: "",
    actions: [{ id: Date.now(), text: "", certainty: 5, successCriteria: "" }], 
    closingDeathbed: ""
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = () => setIsPdfReady(true);
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      if (document.head.contains(link)) document.head.removeChild(link);
    }
  }, []);

  const handleDownloadPdf = (elementId, filenamePrefix) => {
    if (!window.html2pdf) {
      alert("Knihovna pro PDF se ještě nenačetla. Zkuste to prosím za vteřinu znovu.");
      return;
    }
    
    const element = document.getElementById(elementId);
    if (!element) return;

    const safeClientName = data.clientName ? data.clientName.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'koucovany';
    const filename = `${filenamePrefix}-${safeClientName}-${data.date}.pdf`;

    const opt = {
      margin: [10, 10, 10, 10], 
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    window.html2pdf().set(opt).from(element).save();
  };

  const addItem = (type, text) => {
    if (!text.trim()) return;
    const newItem = { id: Date.now(), text, focused: false };
    setData(prev => ({
      ...prev,
      [type]: [...prev[type], newItem]
    }));
  };

  const removeItem = (type, id) => {
    setData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  const updateData = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const addAction = () => {
    setData(prev => ({
      ...prev,
      actions: [...prev.actions, { id: Date.now(), text: "", certainty: 5, successCriteria: "" }]
    }));
  };

  const updateAction = (id, field, value) => {
    setData(prev => ({
      ...prev,
      actions: prev.actions.map(a => a.id === id ? { ...a, [field]: value } : a)
    }));
  };

  const deleteAction = (id) => {
    setData(prev => ({
      ...prev,
      actions: prev.actions.filter(a => a.id !== id)
    }));
  };

  const ThermometerSlider = ({ label, value, onChange, color }) => {
    const colorMap = {
      primary: { bg: 'bg-[#FF8573]', border: 'border-[#FF8573]', thumb: '#FF8573' },
      dark: { bg: 'bg-[#2C2C2C]', border: 'border-[#2C2C2C]', thumb: '#2C2C2C' },
      secondary: { bg: 'bg-[#A69D90]', border: 'border-[#A69D90]', thumb: '#A69D90' },
    };
    
    let c = colorMap.primary;
    if (color === 'blue') c = colorMap.primary; 
    if (color === 'green') c = colorMap.dark;   
    if (color === 'purple') c = colorMap.secondary; 
    if (color === 'orange') c = colorMap.secondary; 

    return (
      <div className="flex flex-col items-center h-full justify-end pb-4 w-24 z-30 select-none relative">
        <label className={`text-xs font-bold text-[#2C2C2C] mb-2 text-center leading-tight uppercase tracking-wider font-mono`}>
          {label}
          <div className="text-xl mt-1 font-bold">{value}%</div>
        </label>
        
        <div className="h-[280px] w-14 relative flex justify-center">
            <div className={`absolute inset-0 w-full h-full bg-white border-4 ${c.border} rounded-t-2xl rounded-b-3xl overflow-hidden shadow-inner`}>
                <div className="absolute inset-0 flex flex-col justify-between py-4 px-0 z-0 pointer-events-none">
                   {[...Array(11)].map((_, i) => (
                     <div key={i} className={`h-[2px] ${i % 5 === 0 ? 'bg-[#2C2C2C] w-full opacity-40' : 'bg-[#A69D90] w-1/2 mx-auto opacity-30'}`}></div>
                   ))}
                </div>
                
                <div 
                  className={`absolute bottom-0 left-0 right-0 ${c.bg} transition-all duration-75`}
                  style={{ height: `${value}%` }}
                >
                   <div className="absolute top-0 left-0 right-0 h-1 bg-white/40"></div>
                </div>
            </div>

            <div 
              className="absolute w-10 h-10 bg-white border-4 rounded-full shadow-lg z-10 pointer-events-none flex items-center justify-center transition-all duration-75"
              style={{ 
                bottom: `calc(${value}% - 20px)`,
                borderColor: c.thumb 
              }}
            >
               <div className={`w-3 h-3 rounded-full ${c.bg}`}></div>
            </div>

            <input 
              type="range" 
              min="0" 
              max="100" 
              step="5"
              value={value}
              onChange={(e) => onChange(parseInt(e.target.value))}
              className="absolute w-[280px] h-14 opacity-0 cursor-pointer z-20"
              style={{ 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%) rotate(-90deg)',
                margin: 0
              }}
            />
        </div>
      </div>
    );
  };

  const VerticalScale = ({ value, onChange }) => {
    return (
      <div className="flex flex-col items-center gap-1 h-48 justify-end">
        <span className="text-xs font-bold text-[#A69D90] mb-2">10</span>
        <div className="flex flex-col-reverse gap-1.5 h-full w-full items-center">
          {[...Array(10)].map((_, i) => {
            const num = i + 1;
            const isActive = num <= value;
            let colorClass = "bg-[#E6DDD2]";
            if (isActive) {
              if (num <= 3) colorClass = "bg-[#A69D90]";
              else if (num <= 7) colorClass = "bg-[#FF8573]/70";
              else colorClass = "bg-[#FF8573]";
            }
            
            return (
              <button
                key={num}
                onClick={() => onChange(num)}
                className={`w-8 h-full rounded transition-all duration-300 ${colorClass} hover:opacity-80 hover:scale-x-110`}
                title={`Jistota: ${num}/10`}
              />
            );
          })}
        </div>
        <span className="text-xs font-bold text-[#A69D90] mt-2">1</span>
      </div>
    );
  };

  const BoilerVisual = ({ showLevels = false, showFlows = false, highlightInflowId = null, highlightOutflowId = null, interactive = false }) => {
    return (
      <div className="flex justify-center items-end gap-2 sm:gap-8 h-[450px] mt-4 mb-24 relative z-0">
        
        {interactive && (
          <div className="flex gap-4 h-full items-end pb-8">
            <ThermometerSlider 
              label="Min" 
              value={data.levelMin} 
              onChange={(val) => updateData('levelMin', val)} 
              color="orange" 
            />
            <ThermometerSlider 
              label="Teď" 
              value={data.levelCurrent} 
              onChange={(val) => updateData('levelCurrent', val)} 
              color="green" 
            />
          </div>
        )}

        <div className="relative w-full max-w-xs h-80 transition-all duration-500 mx-4 self-end mb-8">
          <div className="absolute inset-0 bg-white rounded-b-[3rem] border-[3px] border-[#2C2C2C] overflow-hidden shadow-lg z-0">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2C2C2C 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
            
            {showLevels && (
              <>
                <div className="absolute w-full z-20 flex flex-col justify-end transition-all duration-500 pointer-events-none" style={{ bottom: `${data.levelDesired}%`, transform: 'translateY(50%)' }}>
                  <div className="w-full h-[2px] border-t-[2px] border-dashed border-[#FF8573] relative opacity-90">
                     <span className="absolute right-2 bottom-1 bg-[#FF8573] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm tracking-wider uppercase">
                       Cíl {data.levelDesired}%
                     </span>
                  </div>
                </div>

                <div className="absolute w-full z-10 flex flex-col justify-end transition-all duration-500 pointer-events-none" style={{ bottom: `${data.levelMax}%`, transform: 'translateY(50%)' }}>
                  <div className="w-full h-[1px] bg-[#A69D90] relative opacity-70">
                     <span className="absolute right-2 bottom-0.5 text-[#A69D90] text-[10px] font-bold px-1.5 py-0.5">
                       Max {data.levelMax}%
                     </span>
                  </div>
                </div>

                <div className="absolute w-full z-10 flex flex-col justify-end transition-all duration-500 pointer-events-none" style={{ bottom: `${data.levelMin}%`, transform: 'translateY(50%)' }}>
                  <div className="w-full h-[1px] bg-[#A69D90] relative opacity-70">
                     <span className="absolute right-2 bottom-0.5 text-[#A69D90] text-[10px] font-bold px-1.5 py-0.5">
                       Min {data.levelMin}%
                     </span>
                  </div>
                </div>

                <div className="absolute w-full z-30 flex flex-col justify-end transition-all duration-500 pointer-events-none" style={{ bottom: `${data.levelCurrent}%`, transform: 'translateY(50%)' }}>
                  <div className="w-full h-[4px] bg-[#2C2C2C] shadow-[0_4px_12px_rgba(44,44,44,0.4)] relative">
                     <span className="absolute left-0 bottom-1.5 bg-[#2C2C2C] text-[#FAF6F2] text-[10px] font-bold px-3 py-1 rounded-r-md shadow-md uppercase tracking-wide">
                       Teď {data.levelCurrent}%
                     </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {showFlows && (
            <div className="absolute top-0 left-0 right-0 flex justify-around -mt-16 z-10 pointer-events-none">
              {data.inflows.map((flow, idx) => {
                const isSelected = highlightInflowId === flow.id;
                const activeColor = isSelected ? 'text-[#2C2C2C]' : 'text-[#A69D90]';
                const activeBorder = isSelected ? 'border-[#2C2C2C] ring-2 ring-[#2C2C2C]/10 bg-white' : 'border-[#E6DDD2] bg-[#FAF6F2]';
                const activeBar = isSelected ? 'bg-[#2C2C2C]' : 'bg-[#A69D90]/30';
                
                return (
                  <div 
                    key={flow.id} 
                    className={`flex flex-col items-center transition-all duration-500 ease-out ${isSelected ? 'scale-110 z-50 opacity-100 translate-y-2' : 'opacity-60 scale-95'}`}
                    style={{ animation: isSelected ? 'none' : `bounce 4s infinite ${idx * 0.7}s` }}
                  >
                    <div className={`px-3 py-1.5 rounded-lg shadow-sm text-[10px] font-bold mb-1 max-w-[100px] text-center leading-tight break-words border ${activeColor} ${activeBorder}`}>
                        {flow.text}
                    </div>
                    <TrendingDown className={`w-6 h-6 drop-shadow-sm mb-1 ${activeColor}`} />
                    <div className={`h-10 w-[2px] rounded-full ${activeBar}`}></div>
                  </div>
                );
              })}
            </div>
          )}

          {showFlows && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-around -mb-2 z-10 pointer-events-none">
              {data.outflows.map((flow, idx) => {
                const isSelected = highlightOutflowId === flow.id;
                const activeColor = isSelected ? 'text-[#FF8573]' : 'text-[#A69D90]';
                const activeBorder = isSelected ? 'border-[#FF8573] ring-2 ring-[#FF8573]/10 bg-white' : 'border-[#E6DDD2] bg-[#FAF6F2]';
                const activeBar = isSelected ? 'bg-[#FF8573]' : 'bg-[#A69D90]/30';
                
                return (
                  <div 
                    key={flow.id} 
                    className={`flex flex-col items-center -mb-14 transition-all duration-500 ease-out ${isSelected ? 'scale-110 z-50 opacity-100 -translate-y-2' : 'opacity-60 scale-95'}`}
                  >
                    <div className={`h-8 w-[2px] rounded-full mb-1 ${activeBar}`}></div>
                    <Droplets className={`w-5 h-5 mb-1 ${activeColor} ${isSelected ? 'animate-none' : 'animate-pulse'}`} />
                    <div className={`px-3 py-1.5 rounded-lg shadow-sm text-[10px] font-bold mt-0 max-w-[100px] text-center leading-tight break-words border ${activeColor} ${activeBorder}`}>
                        {flow.text}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {interactive && (
          <div className="flex gap-4 h-full items-end pb-8">
            <ThermometerSlider 
              label="Cíl" 
              value={data.levelDesired} 
              onChange={(val) => updateData('levelDesired', val)} 
              color="blue" 
            />
             <ThermometerSlider 
              label="Max" 
              value={data.levelMax} 
              onChange={(val) => updateData('levelMax', val)} 
              color="purple" 
            />
          </div>
        )}
      </div>
    );
  };

  const steps = [
    {
      title: "Úvod & Cíl",
      icon: <BatteryCharging />,
      content: (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-[#E6DDD2]/30 p-6 rounded-2xl border border-[#E6DDD2] shadow-sm">
            <h3 className="font-bold text-[#FF8573] mb-3 uppercase tracking-wider text-xs">O koučovací technice</h3>
            <p className="text-sm text-[#2C2C2C] leading-relaxed">
              Představte si, že vaše energie je tekutina v kotli. Nahoře přitéká z různých zdrojů. 
              Dole má kotel díry, kterými energie uniká. Podíváme se společně na to, jak to ve vašem kotli vypadá.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#A69D90] uppercase mb-2 flex items-center gap-2">
                <User size={14} /> Jméno koučovaného
              </label>
              <input 
                type="text" 
                className="w-full p-4 border border-[#E6DDD2] rounded-xl focus:border-[#FF8573] focus:ring-2 focus:ring-[#FF8573]/20 outline-none bg-white text-[#2C2C2C] shadow-sm transition-all"
                value={data.clientName}
                onChange={(e) => updateData('clientName', e.target.value)}
                placeholder="Jméno"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#A69D90] uppercase mb-2 flex items-center gap-2">
                <Calendar size={14} /> Datum sezení
              </label>
              <input 
                type="date" 
                className="w-full p-4 border border-[#E6DDD2] rounded-xl focus:border-[#FF8573] focus:ring-2 focus:ring-[#FF8573]/20 outline-none bg-white text-[#2C2C2C] shadow-sm transition-all"
                value={data.date}
                onChange={(e) => updateData('date', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-[#A69D90] uppercase mb-2">Téma</label>
              <input 
                type="text" 
                className="w-full p-4 border border-[#E6DDD2] rounded-xl focus:border-[#FF8573] focus:ring-2 focus:ring-[#FF8573]/20 outline-none bg-white text-[#2C2C2C] shadow-sm transition-all"
                value={data.topic}
                onChange={(e) => updateData('topic', e.target.value)}
                placeholder="Např. Nedostatek životní energie"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-[#A69D90] uppercase mb-2">Cíl</label>
              <textarea 
                className="w-full p-4 border border-[#E6DDD2] rounded-xl focus:border-[#FF8573] focus:ring-2 focus:ring-[#FF8573]/20 outline-none h-28 bg-white text-[#2C2C2C] shadow-sm transition-all resize-none"
                value={data.goalOutcome}
                onChange={(e) => updateData('goalOutcome', e.target.value)}
                placeholder="Chci umět pracovat se svojí energií tak, abych prožíval/a víc radosti..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#A69D90] uppercase mb-2">Vize na začátku</label>
              <textarea 
                className="w-full p-4 border border-[#E6DDD2] rounded-xl focus:border-[#FF8573] focus:ring-2 focus:ring-[#FF8573]/20 outline-none h-24 bg-white text-[#2C2C2C] shadow-sm transition-all resize-none"
                value={data.goalDeathbed}
                onChange={(e) => updateData('goalDeathbed', e.target.value)}
                placeholder="Až budu ležet na smrtelné posteli, budu se usmívat nad..."
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Realita: Hladina energie",
      icon: <Activity />,
      content: (
        <div className="space-y-8">
          <p className="text-[#A69D90] text-center max-w-lg mx-auto">
            Nastavte pomocí posuvníků po stranách kotle energetické hladiny: Minimum, Aktuální stav, Cíl a Maximum.
          </p>
          <BoilerVisual showLevels={true} interactive={true} />
        </div>
      )
    },
    {
      title: "Realita: Zdroje a Díry",
      icon: <Droplets />,
      content: (
        <div className="space-y-6">
          <BoilerVisual showLevels={true} showFlows={true} interactive={true} />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E6DDD2] shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-[#2C2C2C] flex items-center gap-2 mb-4">
                <div className="bg-[#FAF6F2] p-2 rounded-full"><TrendingDown className="w-5 h-5 text-[#2C2C2C]" /></div>
                Přítoky (Zdroje)
              </h4>
              <div className="flex gap-2 mb-4">
                <input 
                  id="inflowInput"
                  type="text" 
                  className="flex-1 text-sm p-3 border border-[#E6DDD2] rounded-lg focus:border-[#2C2C2C] focus:ring-1 focus:ring-[#2C2C2C] outline-none"
                  placeholder="Přidat zdroj..."
                  onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                      addItem('inflows', e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button 
                  onClick={() => {
                    const el = document.getElementById('inflowInput');
                    addItem('inflows', el.value);
                    el.value = '';
                  }}
                  className="bg-[#2C2C2C] text-white px-4 rounded-lg hover:bg-[#4a4a4a] transition-colors"
                ><Plus size={20}/></button>
              </div>
              <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {data.inflows.map(item => (
                  <li key={item.id} className="bg-[#FAF6F2] p-3 rounded-lg text-sm flex justify-between items-center text-[#2C2C2C] group">
                    <span>{item.text}</span>
                    <button onClick={() => removeItem('inflows', item.id)} className="text-[#A69D90] hover:text-[#FF8573] opacity-50 group-hover:opacity-100 transition-opacity">×</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E6DDD2] shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-[#2C2C2C] flex items-center gap-2 mb-4">
                <div className="bg-[#FAF6F2] p-2 rounded-full"><TrendingDown className="w-5 h-5 rotate-180 text-[#FF8573]" /></div>
                Odtoky (Díry)
              </h4>
              <div className="flex gap-2 mb-4">
                <input 
                  id="outflowInput"
                  type="text" 
                  className="flex-1 text-sm p-3 border border-[#E6DDD2] rounded-lg focus:border-[#FF8573] focus:ring-1 focus:ring-[#FF8573] outline-none"
                  placeholder="Přidat únik..."
                  onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                      addItem('outflows', e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button 
                  onClick={() => {
                    const el = document.getElementById('outflowInput');
                    addItem('outflows', el.value);
                    el.value = '';
                  }}
                  className="bg-[#FF8573] text-white px-4 rounded-lg hover:bg-[#ff6b56] transition-colors"
                ><Plus size={20}/></button>
              </div>
              <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {data.outflows.map(item => (
                  <li key={item.id} className="bg-[#FAF6F2] p-3 rounded-lg text-sm flex justify-between items-center text-[#2C2C2C] group">
                    <span>{item.text}</span>
                    <button onClick={() => removeItem('outflows', item.id)} className="text-[#A69D90] hover:text-[#FF8573] opacity-50 group-hover:opacity-100 transition-opacity">×</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Reflexe",
      icon: <Lightbulb />,
      content: (
        <div className="space-y-8">
           <BoilerVisual showLevels={true} showFlows={true} />
           
           <div className="text-center space-y-2">
             <h3 className="text-2xl font-bold text-[#2C2C2C]">"Když to máte takhle před sebou, co vám to říká?"</h3>
             <p className="text-[#A69D90]">Zde je prostor pro váš AHA moment. Podívejte se na celek.</p>
           </div>

           <textarea 
              className="w-full p-6 border border-[#E6DDD2] rounded-2xl focus:border-[#FF8573] focus:ring-2 focus:ring-[#FF8573]/20 outline-none h-48 text-lg bg-white text-[#2C2C2C] shadow-sm leading-relaxed"
              value={data.reflection}
              onChange={(e) => updateData('reflection', e.target.value)}
              placeholder="Uvědomil/a jsem si, že..."
            />
        </div>
      )
    },
    {
      title: "Výběr a Možnosti",
      icon: <CheckCircle />,
      content: (
        <div className="space-y-8">
           <BoilerVisual 
              showLevels={true} 
              showFlows={true} 
              highlightInflowId={data.selectedInflowId} 
              highlightOutflowId={data.selectedOutflowId} 
           />

           <div className="bg-[#E6DDD2]/20 border-l-4 border-[#A69D90] p-4 rounded-r-xl">
             <p className="text-[#A69D90] text-sm italic">
               "Nemusíte vyřešit vše. Často stačí o pár procent zvýšit přítok a o pár procent snížit odtok, abyste změnili celkový trend."
             </p>
           </div>

           <div className={`bg-white p-6 rounded-2xl border transition-all duration-300 shadow-sm ${data.selectedInflowId ? 'border-[#2C2C2C] ring-1 ring-[#2C2C2C]/10' : 'border-[#E6DDD2]'}`}>
             <h4 className="font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
               <span className="bg-[#2C2C2C] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> 
               Vyberte jeden PŘÍTOK <span className="text-[#A69D90] font-normal text-xs uppercase tracking-wide">(otevřít)</span>
             </h4>
             <select 
                className="w-full p-3 border border-[#E6DDD2] rounded-lg mb-4 bg-[#FAF6F2] text-[#2C2C2C] focus:border-[#2C2C2C] outline-none cursor-pointer"
                value={data.selectedInflowId || ""}
                onChange={(e) => updateData('selectedInflowId', parseInt(e.target.value))}
             >
               <option value="">-- Vyberte zdroj --</option>
               {data.inflows.map(i => <option key={i.id} value={i.id}>{i.text}</option>)}
             </select>
             
             {data.selectedInflowId && (
               <div className="animate-fadeIn">
                 <label className="block text-xs font-bold text-[#A69D90] uppercase mb-2">
                   Jaké existují způsoby, jak tento kohoutek otevřít?
                 </label>
                 <textarea 
                    className="w-full p-4 border border-[#E6DDD2] rounded-xl h-32 text-sm focus:border-[#2C2C2C] focus:ring-1 focus:ring-[#2C2C2C]/20 outline-none transition-all"
                    value={data.optionsInflow}
                    onChange={(e) => updateData('optionsInflow', e.target.value)}
                    placeholder="Brainstorming možností..."
                 />
               </div>
             )}
           </div>

           <div className={`bg-white p-6 rounded-2xl border transition-all duration-300 shadow-sm ${data.selectedOutflowId ? 'border-[#FF8573] ring-1 ring-[#FF8573]/10' : 'border-[#E6DDD2]'}`}>
             <h4 className="font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
               <span className="bg-[#FF8573] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
               Vyberte jeden ODTOK <span className="text-[#A69D90] font-normal text-xs uppercase tracking-wide">(zavřít)</span>
             </h4>
             <select 
                className="w-full p-3 border border-[#E6DDD2] rounded-lg mb-4 bg-[#FAF6F2] text-[#2C2C2C] focus:border-[#FF8573] outline-none cursor-pointer"
                value={data.selectedOutflowId || ""}
                onChange={(e) => updateData('selectedOutflowId', parseInt(e.target.value))}
             >
               <option value="">-- Vyberte díru --</option>
               {data.outflows.map(i => <option key={i.id} value={i.id}>{i.text}</option>)}
             </select>
             
             {data.selectedOutflowId && (
               <div className="animate-fadeIn">
                 <label className="block text-xs font-bold text-[#A69D90] uppercase mb-2">
                   Jaké existují způsoby, jak tento odtok uzavřít/zmenšit?
                 </label>
                 <textarea 
                    className="w-full p-4 border border-[#E6DDD2] rounded-xl h-32 text-sm focus:border-[#FF8573] focus:ring-1 focus:ring-[#FF8573]/20 outline-none transition-all"
                    value={data.optionsOutflow}
                    onChange={(e) => updateData('optionsOutflow', e.target.value)}
                    placeholder="Brainstorming možností..."
                 />
               </div>
             )}
           </div>
        </div>
      )
    },
    {
      title: "Energetický kotel",
      icon: <FileText />,
      content: (
        <div className="space-y-8">
           <div className="text-center print:hidden">
             <h3 className="text-2xl font-bold text-[#2C2C2C]">Energetický kotel: {data.clientName}</h3>
             <p className="text-[#A69D90]">Přehled analýzy</p>
           </div>

           <div id="report-content" className="bg-white border border-[#E6DDD2] p-10 rounded-2xl shadow-xl break-inside-avoid w-full max-w-2xl mx-auto relative overflow-hidden flex flex-col justify-between min-h-[90vh]">
             <div className="absolute top-0 left-0 w-full h-2 bg-[#FF8573]"></div>
             
             <div>
               <div className="flex justify-between items-end border-b border-[#E6DDD2] pb-6 mb-8">
                 <div>
                   <h1 className="text-3xl font-bold text-[#2C2C2C] mb-1">Energetický Kotel</h1>
                   <p className="text-[#A69D90] text-sm uppercase tracking-widest">{data.clientName || 'Koučovaný'}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[#2C2C2C] font-bold">{data.date}</p>
                   <p className="text-[#A69D90] text-xs uppercase">Datum</p>
                 </div>
               </div>

               <div className="mb-10 scale-95 origin-top">
                  <BoilerVisual 
                    showLevels={true} 
                    showFlows={true} 
                    highlightInflowId={data.selectedInflowId} 
                    highlightOutflowId={data.selectedOutflowId} 
                  />
               </div>
               
               <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-[#E6DDD2]">
                 <div className="bg-[#FAF6F2] p-5 rounded-xl border border-[#E6DDD2]">
                    <span className="font-bold text-[#2C2C2C] text-xs uppercase block mb-3 border-b border-[#E6DDD2] pb-2">Strategie: Příjem</span>
                    <div className="font-bold text-xl mb-2 text-[#2C2C2C]">{data.inflows.find(i => i.id === data.selectedInflowId)?.text || "Nevybráno"}</div>
                    <p className="text-sm text-[#A69D90] italic leading-relaxed">{data.optionsInflow || "Žádné poznámky"}</p>
                 </div>
                 <div className="bg-[#FAF6F2] p-5 rounded-xl border border-[#E6DDD2]">
                    <span className="font-bold text-[#FF8573] text-xs uppercase block mb-3 border-b border-[#E6DDD2] pb-2">Strategie: Výdej</span>
                    <div className="font-bold text-xl mb-2 text-[#2C2C2C]">{data.outflows.find(i => i.id === data.selectedOutflowId)?.text || "Nevybráno"}</div>
                    <p className="text-sm text-[#A69D90] italic leading-relaxed">{data.optionsOutflow || "Žádné poznámky"}</p>
                 </div>
               </div>

               <div className="mt-6 bg-white p-6 rounded-xl border-l-4 border-[#FF8573] shadow-sm">
                  <span className="font-bold text-[#FF8573] text-xs uppercase block mb-2">Reflexe</span>
                  <p className="text-[#2C2C2C] text-lg leading-relaxed">{data.reflection || "Bez reflexe"}</p>
               </div>
             </div>

             <div className="mt-8 flex justify-center border-t border-[#E6DDD2] pt-4">
                <span className="font-black text-xl tracking-[0.2em] text-[#2C2C2C] opacity-80">by MIND SPARK</span>
             </div>
           </div>

           <div className="flex justify-center print:hidden">
              <button 
                onClick={() => handleDownloadPdf('report-content', 'Energeticky-kotel-analyza')} 
                disabled={!isPdfReady}
                className={`flex items-center gap-2 bg-[#FF8573] text-white px-8 py-4 rounded-xl shadow-lg shadow-[#FF8573]/20 cursor-pointer active:scale-95 transition-all hover:bg-[#ff6b56] font-bold ${!isPdfReady ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Download size={20} /> Stáhnout PDF
              </button>
           </div>
        </div>
      )
    },
    {
      title: "Další kroky",
      icon: <Battery />,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="font-bold text-[#2C2C2C] text-xl">Co konkrétně uděláte?</h3>
            <p className="text-[#A69D90]">Najděte 2-3 věci, do kterých se pustíte.</p>
          </div>
          
          <div className="space-y-6">
            {data.actions.map((action, idx) => (
              <div key={action.id} className="bg-white p-6 rounded-2xl border border-[#E6DDD2] shadow-sm relative flex gap-6 hover:shadow-md transition-all">
                <button 
                  className="absolute top-4 right-4 text-[#E6DDD2] hover:text-[#FF8573] transition-colors" 
                  onClick={() => deleteAction(action.id)}
                  title="Odstranit krok"
                >
                  <Trash2 size={20} />
                </button>
                
                <div className="flex-shrink-0 pt-2">
                  <VerticalScale 
                    value={action.certainty} 
                    onChange={(val) => updateAction(action.id, 'certainty', val)} 
                  />
                </div>

                <div className="flex-grow pt-1">
                  <h4 className="font-bold text-[#FF8573] text-sm uppercase mb-4 flex items-center gap-2">
                    <span className="bg-[#FF8573] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">{idx + 1}</span>
                    Krok
                  </h4>
                  
                  <div className="mb-5">
                    <label className="block text-xs font-bold text-[#A69D90] uppercase mb-2">Co konkrétně uděláte?</label>
                    <input 
                      type="text" 
                      className="w-full p-4 border border-[#E6DDD2] rounded-xl focus:border-[#FF8573] focus:ring-1 focus:ring-[#FF8573]/20 outline-none bg-[#FAF6F2] text-lg text-[#2C2C2C]"
                      placeholder="Popis akce..."
                      value={action.text}
                      onChange={(e) => updateAction(action.id, 'text', e.target.value)}
                    />
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-[#A69D90] uppercase mb-2">Jak poznáte úspěch?</label>
                     <input 
                        type="text" 
                        className="w-full p-4 border border-[#E6DDD2] rounded-xl focus:border-[#FF8573] focus:ring-1 focus:ring-[#FF8573]/20 outline-none bg-[#FAF6F2] text-[#2C2C2C]"
                        placeholder="Měřítko úspěchu..."
                        value={action.successCriteria}
                        onChange={(e) => updateAction(action.id, 'successCriteria', e.target.value)}
                      />
                  </div>
                </div>
              </div>
            ))}

            <button 
              onClick={addAction}
              className="w-full py-5 border-2 border-dashed border-[#E6DDD2] text-[#A69D90] rounded-xl hover:border-[#FF8573] hover:text-[#FF8573] flex items-center justify-center gap-2 transition-all bg-white font-bold"
            >
              <Plus size={20} /> Přidat další krok
            </button>
          </div>

          <div className="bg-[#2C2C2C] p-8 rounded-2xl text-[#FAF6F2] shadow-xl">
             <label className="block text-sm font-bold text-[#FF8573] mb-3 uppercase tracking-wide">
               Dopad
             </label>
             <p className="text-sm text-[#A69D90] mb-3">V čem bude díky těmto krokům váš prožitek na smrtelné posteli lepší?</p>
             <textarea 
                className="w-full p-4 border border-[#4a4a4a] rounded-xl focus:border-[#FF8573] outline-none h-24 bg-[#3a3a3a] text-white"
                value={data.closingDeathbed}
                onChange={(e) => updateData('closingDeathbed', e.target.value)}
             />
          </div>
        </div>
      )
    },
    {
      title: "Shrnutí",
      icon: <Save />,
      content: (
        <div className="space-y-8 print:space-y-4">
           <div className="text-center print:hidden">
             <h3 className="text-2xl font-bold text-[#2C2C2C]">Skvělá práce!</h3>
             <p className="text-[#A69D90]">Váš energetický plán je hotový.</p>
           </div>

           <div id="final-report" className="bg-white border border-[#E6DDD2] p-10 rounded-2xl shadow-xl print:border print:shadow-none print:p-0 break-inside-avoid w-full max-w-2xl mx-auto relative overflow-hidden flex flex-col justify-between min-h-[90vh]">
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#FF8573] to-[#2C2C2C]"></div>
              
              <div>
                <div className="flex justify-between items-end border-b border-[#E6DDD2] pb-6 mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-[#2C2C2C] mb-1">Akční Plán</h1>
                    <p className="text-[#A69D90] text-sm uppercase tracking-widest">{data.clientName || 'Koučovaný'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#2C2C2C] font-bold">{data.date}</p>
                    <p className="text-[#A69D90] text-xs uppercase">Datum</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                  <div className="bg-[#FAF6F2] p-5 rounded-xl border border-[#E6DDD2] break-inside-avoid">
                    <h3 className="font-bold text-[#FF8573] mb-3 uppercase text-xs tracking-wide">Cíl</h3>
                    <p className="text-[#2C2C2C] leading-relaxed">{data.goalOutcome || "Nebylo vyplněno"}</p>
                  </div>
                  <div className="bg-[#FAF6F2] p-5 rounded-xl border border-[#E6DDD2] break-inside-avoid">
                    <h3 className="font-bold text-[#2C2C2C] mb-3 uppercase text-xs tracking-wide">Vize na začátku</h3>
                    <p className="text-[#A69D90] italic leading-relaxed">{data.goalDeathbed || "Nebylo vyplněno"}</p>
                  </div>
                </div>

                <div className="mb-10 scale-95 origin-top break-inside-avoid">
                  <BoilerVisual 
                    showLevels={true} 
                    showFlows={true} 
                    highlightInflowId={data.selectedInflowId}
                    highlightOutflowId={data.selectedOutflowId}
                  />
                </div>

                <div className="grid grid-cols-4 gap-4 mb-8 mt-16 text-center border-b border-[#E6DDD2] pb-8 break-inside-avoid">
                  <div className="bg-[#FAF6F2] p-3 rounded-lg border border-[#E6DDD2]">
                    <h3 className="font-bold text-[#A69D90] text-[10px] uppercase mb-1">Minimum</h3>
                    <div className="text-xl font-bold text-[#2C2C2C]">{data.levelMin}%</div>
                  </div>
                  <div className="bg-[#FF8573]/10 p-3 rounded-lg border border-[#FF8573]/30">
                    <h3 className="font-bold text-[#FF8573] text-[10px] uppercase mb-1">Aktuálně</h3>
                    <div className="text-2xl font-bold text-[#FF8573]">{data.levelCurrent}%</div>
                  </div>
                  <div className="bg-[#FAF6F2] p-3 rounded-lg border border-[#E6DDD2]">
                    <h3 className="font-bold text-[#2C2C2C] text-[10px] uppercase mb-1">Cíl</h3>
                    <div className="text-2xl font-bold text-[#2C2C2C]">{data.levelDesired}%</div>
                  </div>
                  <div className="bg-[#FAF6F2] p-3 rounded-lg border border-[#E6DDD2]">
                    <h3 className="font-bold text-[#A69D90] text-[10px] uppercase mb-1">Maximum</h3>
                    <div className="text-xl font-bold text-[#2C2C2C]">{data.levelMax}%</div>
                  </div>
                </div>

                <div className="mb-8 bg-white p-5 rounded-xl border-l-4 border-[#FF8573] shadow-sm break-inside-avoid">
                  <h3 className="font-bold text-[#FF8573] text-xs uppercase block mb-2">Reflexe</h3>
                  <p className="italic text-[#2C2C2C] text-lg">{data.reflection || "Bez záznamu"}</p>
                </div>

                <div className="mb-8 break-inside-avoid">
                  <h3 className="font-bold text-[#2C2C2C] border-b border-[#E6DDD2] mb-4 pb-2 uppercase text-sm tracking-wide">Strategie Změny</h3>
                  <div className="grid grid-cols-2 gap-6 text-sm text-[#2C2C2C] mb-4">
                    <div className={`p-5 rounded-xl border border-[#E6DDD2] ${data.selectedInflowId ? "bg-[#FAF6F2]" : ""}`}>
                      <span className="font-bold text-[#FF8573] block mb-2 text-xs uppercase">Klíčový zdroj</span>
                      <div className="text-xl font-bold mb-3">
                        {data.inflows.find(i => i.id === data.selectedInflowId)?.text || "Nevybráno"}
                      </div>
                      {data.optionsInflow && (
                        <div className="text-xs bg-white p-3 rounded-lg border border-[#E6DDD2] text-[#A69D90] leading-relaxed">
                          <strong>Nápady:</strong> {data.optionsInflow}
                        </div>
                      )}
                    </div>
                    <div className={`p-5 rounded-xl border border-[#E6DDD2] ${data.selectedOutflowId ? "bg-[#FAF6F2]" : ""}`}>
                      <span className="font-bold text-[#2C2C2C] block mb-2 text-xs uppercase">Klíčový únik</span>
                      <div className="text-xl font-bold mb-3">
                        {data.outflows.find(i => i.id === data.selectedOutflowId)?.text || "Nevybráno"}
                      </div>
                      {data.optionsOutflow && (
                        <div className="text-xs bg-white p-3 rounded-lg border border-[#E6DDD2] text-[#A69D90] leading-relaxed">
                          <strong>Nápady:</strong> {data.optionsOutflow}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-[#2C2C2C] border-b border-[#E6DDD2] mb-4 pb-2 uppercase text-sm tracking-wide">Další kroky</h3>
                  <ul className="space-y-4">
                    {data.actions.map((act, i) => (
                      <li key={i} className="flex gap-5 bg-[#FAF6F2] p-5 rounded-xl border border-[#E6DDD2] break-inside-avoid shadow-sm">
                        <span className="font-bold text-[#FF8573] text-2xl flex-shrink-0">{i+1}.</span>
                        <div className="w-full">
                          <div className="font-bold text-[#2C2C2C] text-lg mb-2">{act.text}</div>
                          <div className="flex justify-between text-xs text-[#A69D90] uppercase tracking-wider border-t border-[#E6DDD2] pt-2">
                            <span>Jistota: <strong className="text-[#2C2C2C]">{act.certainty}/10</strong></span>
                            <span>Úspěch: <strong className="text-[#2C2C2C]">{act.successCriteria}</strong></span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 bg-[#2C2C2C] p-6 rounded-xl break-inside-avoid text-[#FAF6F2] shadow-md">
                  <h3 className="font-bold text-[#FF8573] text-xs mb-2 uppercase tracking-widest">Dopad</h3>
                  <p className="italic opacity-90 text-lg font-light leading-relaxed">{data.closingDeathbed || "Nebylo vyplněno"}</p>
                </div>
              </div>

              <div className="mt-8 flex justify-center border-t border-[#E6DDD2] pt-4">
                  <span className="font-black text-xl tracking-[0.2em] text-[#2C2C2C] opacity-80">by MIND SPARK</span>
              </div>
           </div>

           <div className="flex justify-center print:hidden">
              <button 
                onClick={() => handleDownloadPdf('final-report', 'Energeticky-kotel-final')} 
                disabled={!isPdfReady}
                className={`flex items-center gap-2 bg-[#FF8573] text-white px-8 py-4 rounded-xl shadow-lg shadow-[#FF8573]/20 cursor-pointer active:scale-95 transition-transform hover:bg-[#ff6b56] font-bold ${!isPdfReady ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Download size={20} /> Stáhnout PDF
              </button>
           </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F2] font-sans text-[#2C2C2C] pb-12">
      <header className="bg-white border-b border-[#E6DDD2] sticky top-0 z-20 shadow-sm print:hidden">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
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
            <div className="flex items-center gap-2">
              <Battery className="text-[#FF8573] w-6 h-6" />
              <h1 className="font-bold text-xl text-[#2C2C2C]">Energetický Kotel</h1>
            </div>
          </div>
          <div className="text-sm text-[#A69D90] font-medium">
            Krok {step + 1} z {steps.length}
          </div>
        </div>
        <div className="h-1 bg-[#E6DDD2] w-full">
          <div 
            className="h-full bg-[#FF8573] transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 relative z-10">
        <div className="mb-8 flex items-center gap-3 text-[#FF8573] print:hidden">
          {steps[step].icon}
          <h2 className="text-3xl font-bold text-[#2C2C2C]">{steps[step].title}</h2>
        </div>

        {steps[step].content}

        <div className="flex justify-between items-center mt-12 border-t border-[#E6DDD2] pt-8 print:hidden relative z-20 bg-[#FAF6F2]">
          <button 
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors
              ${step === 0 ? 'text-[#E6DDD2] cursor-not-allowed' : 'text-[#A69D90] hover:bg-[#E6DDD2] hover:text-[#2C2C2C]'}`}
          >
            <ArrowLeft size={20} /> Zpět
          </button>

          <div className="text-[#A69D90] font-bold text-sm tracking-wider opacity-60 select-none">
            by MIND SPARK
          </div>

          {step < steps.length - 1 ? (
            <button 
              onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
              className="flex items-center gap-2 bg-[#FF8573] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#ff6b56] shadow-lg shadow-[#FF8573]/20 hover:shadow-xl transition-all active:scale-95"
            >
              Pokračovat <ArrowRight size={20} />
            </button>
          ) : (
            <button 
              onClick={() => setStep(0)}
              className="flex items-center gap-2 text-[#A69D90] px-6 py-3 hover:bg-[#E6DDD2] rounded-xl font-medium"
            >
              Začít znovu
            </button>
          )}
        </div>
      </main>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default EnergetickyKotel;
