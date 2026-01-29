import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw, Printer, Copy, CheckCircle, User, Calendar, Target, Info, Globe, Cog, Heart, Sparkles, ArrowUp, BookOpen, X } from 'lucide-react';

const COLORS = {
  primary: '#ff8474',
  secondary: '#a69d90',
  tertiary: '#e5ddd2',
  background: '#FAF6F2',
  dark: '#2C2C2C'
};

const LEVELS = [
  { id: 'prostredi', name: 'Prostředí', subtitle: 'Kde? Kdy? S kým?', icon: Globe, color: '#78716C', description: 'Vnější kontext a okolnosti' },
  { id: 'chovani', name: 'Chování', subtitle: 'Co dělám?', icon: Cog, color: '#a69d90', description: 'Konkrétní akce a činnosti' },
  { id: 'schopnosti', name: 'Schopnosti', subtitle: 'Jak to dělám?', icon: Target, color: '#e06b5c', description: 'Dovednosti a strategie' },
  { id: 'hodnoty', name: 'Hodnoty & Přesvědčení', subtitle: 'Proč to dělám?', icon: Heart, color: '#ff8474', description: 'Motivace a víra' },
  { id: 'identita', name: 'Identita', subtitle: 'Kdo jsem?', icon: Sparkles, color: '#2C2C2C', description: 'Sebepojetí a role' }
];

export default function LogickeUrovne() {
  const [step, setStep] = useState(0);
  const [showTheory, setShowTheory] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const [data, setData] = useState({
    clientName: '',
    date: new Date().toISOString().split('T')[0],
    topic: '',
    scalingBefore: 5,
    
    pyramids: [
      {
        id: 1,
        name: 'Možnost A',
        prostredi: '',
        chovani: '',
        schopnosti: '',
        hodnoty: '',
        identita: ''
      }
    ],
    activePyramidId: 1,
    
    reflection: '',
    scalingAfter: 5,
    actionSteps: ''
  });

  const updateData = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updatePyramid = (pyramidId, levelId, value) => {
    setData(prev => ({
      ...prev,
      pyramids: prev.pyramids.map(p => 
        p.id === pyramidId ? { ...p, [levelId]: value } : p
      )
    }));
  };

  const addPyramid = () => {
    const newId = Math.max(...data.pyramids.map(p => p.id)) + 1;
    setData(prev => ({
      ...prev,
      pyramids: [...prev.pyramids, {
        id: newId,
        name: `Možnost ${String.fromCharCode(64 + newId)}`,
        prostredi: '',
        chovani: '',
        schopnosti: '',
        hodnoty: '',
        identita: ''
      }],
      activePyramidId: newId
    }));
  };

  const removePyramid = (pyramidId) => {
    if (data.pyramids.length <= 1) return;
    setData(prev => ({
      ...prev,
      pyramids: prev.pyramids.filter(p => p.id !== pyramidId),
      activePyramidId: prev.pyramids[0].id === pyramidId ? prev.pyramids[1].id : prev.pyramids[0].id
    }));
  };

  const activePyramid = data.pyramids.find(p => p.id === data.activePyramidId);

  const handlePrint = () => window.print();
  
  const copyToClipboard = () => {
    let text = `LOGICKÉ ÚROVNĚ - ${data.clientName || 'Koučovaný'}\nDatum: ${data.date}\nTéma: ${data.topic}\n\n`;
    data.pyramids.forEach(p => {
      text += `--- ${p.name} ---\n`;
      LEVELS.forEach(level => {
        text += `${level.name}: ${p[level.id] || '-'}\n`;
      });
      text += '\n';
    });
    text += `Reflexe: ${data.reflection}\nAkční kroky: ${data.actionSteps}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const resetApp = () => {
    if (window.confirm('Opravdu chcete vymazat všechna data?')) {
      setData({
        clientName: '', date: new Date().toISOString().split('T')[0], topic: '', scalingBefore: 5,
        pyramids: [{ id: 1, name: 'Možnost A', prostredi: '', chovani: '', schopnosti: '', hodnoty: '', identita: '' }],
        activePyramidId: 1, reflection: '', scalingAfter: 5, actionSteps: ''
      });
      setStep(0);
    }
  };

  const PyramidVisual = ({ pyramid, mini = false }) => {
    const levels = [...LEVELS].reverse();
    return (
      <div className={`flex flex-col items-center ${mini ? 'scale-75' : ''}`}>
        {levels.map((level, idx) => {
          const width = mini ? 60 + idx * 30 : 120 + idx * 50;
          const hasContent = pyramid[level.id] && pyramid[level.id].trim() !== '';
          return (
            <div
              key={level.id}
              className={`flex items-center justify-center text-center transition-all duration-300 ${mini ? 'h-8 text-[8px]' : 'h-12 text-xs'} font-bold text-white rounded-t-sm`}
              style={{
                width: `${width}px`,
                backgroundColor: hasContent ? level.color : '#e5ddd2',
                marginTop: idx === 0 ? 0 : '-2px'
              }}
            >
              {!mini && (hasContent ? level.name : '...')}
            </div>
          );
        })}
      </div>
    );
  };

  const TheoryModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="p-6 bg-[#FAF6F2] border-b border-[#e5ddd2] flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#2C2C2C] flex items-center gap-2">
            <BookOpen size={20} className="text-[#ff8474]" />
            O metodě Logických úrovní
          </h2>
          <button onClick={() => setShowTheory(false)} className="p-2 hover:bg-white rounded-full transition-colors">
            <X size={20} className="text-[#78716C]" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6 text-sm text-[#4a4a4a]">
          <section>
            <h3 className="font-bold text-[#ff8474] uppercase text-xs tracking-wider mb-2">Původ</h3>
            <p className="leading-relaxed">
              Kalifornský psycholog Robert Dilts vytvořil z práce Gregoryho Batesona jednoduchý a elegantní model 
              pro přemýšlení o osobní změně, učení a komunikaci. Model spojuje myšlenky kontextu, úrovně učení a učební pozice.
            </p>
          </section>
          <section>
            <h3 className="font-bold text-[#ff8474] uppercase text-xs tracking-wider mb-2">Klíčové principy</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ArrowUp size={14} className="text-[#ff8474] mt-1 shrink-0" />
                <span>Změna na vyšší úrovni automaticky způsobuje změnu na nižších úrovních</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowUp size={14} className="text-[#ff8474] mt-1 shrink-0" />
                <span>Logické úrovně oddělují chování a osobu</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowUp size={14} className="text-[#ff8474] mt-1 shrink-0" />
                <span>Pomáhají identifikovat nejvhodnější body pro intervenci</span>
              </li>
            </ul>
          </section>
          <section className="bg-[#FAF6F2] p-4 rounded-xl">
            <h3 className="font-bold text-[#2C2C2C] uppercase text-xs tracking-wider mb-3">5 úrovní</h3>
            <div className="space-y-3">
              {LEVELS.map(level => (
                <div key={level.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: level.color }}>
                    <level.icon size={16} className="text-white" />
                  </div>
                  <div>
                    <span className="font-bold text-[#2C2C2C]">{level.name}</span>
                    <span className="text-[#a69d90] ml-2">{level.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const steps = [
    {
      title: 'Úvod',
      content: (
        <div className="space-y-6">
          <div className="bg-[#FAF6F2] p-6 rounded-2xl border border-[#e5ddd2]">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-[#ff8474] uppercase text-xs tracking-wider">O technice</h3>
              <button onClick={() => setShowTheory(true)} className="text-xs text-[#a69d90] hover:text-[#ff8474] flex items-center gap-1 transition-colors">
                <BookOpen size={14} /> Více info
              </button>
            </div>
            <p className="text-sm text-[#4a4a4a] leading-relaxed">
              Logické úrovně jsou hierarchickým modelem pro přemýšlení o osobní změně. Pomáhají prozkoumat situaci 
              z pěti různých perspektiv a najít nejvhodnější bod pro intervenci.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#a69d90] uppercase mb-2 flex items-center gap-2">
                <User size={14} /> Jméno koučovaného
              </label>
              <input
                type="text"
                value={data.clientName}
                onChange={(e) => updateData('clientName', e.target.value)}
                className="w-full p-4 border border-[#e5ddd2] rounded-xl focus:border-[#ff8474] focus:ring-2 focus:ring-[#ff8474]/20 outline-none"
                placeholder="Jméno"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#a69d90] uppercase mb-2 flex items-center gap-2">
                <Calendar size={14} /> Datum
              </label>
              <input
                type="date"
                value={data.date}
                onChange={(e) => updateData('date', e.target.value)}
                className="w-full p-4 border border-[#e5ddd2] rounded-xl focus:border-[#ff8474] focus:ring-2 focus:ring-[#ff8474]/20 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#a69d90] uppercase mb-2">Téma / Cíl sezení</label>
            <textarea
              value={data.topic}
              onChange={(e) => updateData('topic', e.target.value)}
              className="w-full p-4 border border-[#e5ddd2] rounded-xl focus:border-[#ff8474] focus:ring-2 focus:ring-[#ff8474]/20 outline-none h-24 resize-none"
              placeholder="Co chcete dnes prozkoumat?"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#a69d90] uppercase mb-3">
              Škálování na začátku: Jak blízko jste k cíli? ({data.scalingBefore}/10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={data.scalingBefore}
              onChange={(e) => updateData('scalingBefore', parseInt(e.target.value))}
              className="w-full h-2 bg-[#e5ddd2] rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: COLORS.primary }}
            />
            <div className="flex justify-between text-xs text-[#a69d90] mt-1">
              <span>1</span>
              <span>10</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Pyramida',
      content: (
        <div className="space-y-6">
          {/* Pyramid Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {data.pyramids.map(p => (
              <button
                key={p.id}
                onClick={() => updateData('activePyramidId', p.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                  data.activePyramidId === p.id
                    ? 'bg-[#ff8474] text-white shadow-md'
                    : 'bg-[#FAF6F2] text-[#78716C] hover:bg-[#e5ddd2]'
                }`}
              >
                {p.name}
                {data.pyramids.length > 1 && data.activePyramidId === p.id && (
                  <button
                    onClick={(e) => { e.stopPropagation(); removePyramid(p.id); }}
                    className="ml-1 hover:text-red-200"
                  >
                    ×
                  </button>
                )}
              </button>
            ))}
            <button
              onClick={addPyramid}
              className="px-4 py-2 rounded-lg font-medium text-sm border-2 border-dashed border-[#e5ddd2] text-[#a69d90] hover:border-[#ff8474] hover:text-[#ff8474] transition-colors"
            >
              + Přidat možnost
            </button>
          </div>

          {/* Pyramid Name */}
          <div>
            <label className="block text-xs font-bold text-[#a69d90] uppercase mb-2">Název možnosti</label>
            <input
              type="text"
              value={activePyramid?.name || ''}
              onChange={(e) => updatePyramid(data.activePyramidId, 'name', e.target.value)}
              className="w-full p-3 border border-[#e5ddd2] rounded-lg focus:border-[#ff8474] outline-none"
              placeholder="Např. Možnost A, Kariéra v IT..."
            />
          </div>

          {/* Levels */}
          <div className="space-y-4">
            {LEVELS.map((level, idx) => {
              const Icon = level.icon;
              return (
                <div key={level.id} className="relative">
                  <div 
                    className="flex items-center gap-3 mb-2"
                    style={{ marginLeft: `${idx * 20}px` }}
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: level.color }}
                    >
                      <Icon size={16} className="text-white" />
                    </div>
                    <div>
                      <span className="font-bold text-[#2C2C2C] text-sm">{level.name}</span>
                      <span className="text-[#a69d90] text-xs ml-2">{level.subtitle}</span>
                    </div>
                  </div>
                  <textarea
                    value={activePyramid?.[level.id] || ''}
                    onChange={(e) => updatePyramid(data.activePyramidId, level.id, e.target.value)}
                    className="w-full p-4 border border-[#e5ddd2] rounded-xl focus:border-[#ff8474] focus:ring-2 focus:ring-[#ff8474]/20 outline-none resize-none h-20 text-sm"
                    style={{ marginLeft: `${idx * 20}px`, width: `calc(100% - ${idx * 20}px)` }}
                    placeholder={`${level.description}...`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )
    },
    {
      title: 'Integrace',
      content: (
        <div className="space-y-6">
          {/* Visual Comparison */}
          {data.pyramids.length > 1 && (
            <div className="bg-[#FAF6F2] p-6 rounded-2xl">
              <h3 className="text-xs font-bold text-[#a69d90] uppercase mb-4">Porovnání možností</h3>
              <div className="flex justify-center gap-8 flex-wrap">
                {data.pyramids.map(p => (
                  <div key={p.id} className="text-center">
                    <PyramidVisual pyramid={p} mini />
                    <p className="text-xs font-bold text-[#2C2C2C] mt-2">{p.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#a69d90] uppercase mb-2">
              Reflexe: Co vidíte, když se díváte na celý obraz?
            </label>
            <textarea
              value={data.reflection}
              onChange={(e) => updateData('reflection', e.target.value)}
              className="w-full p-4 border border-[#e5ddd2] rounded-xl focus:border-[#ff8474] focus:ring-2 focus:ring-[#ff8474]/20 outline-none resize-none h-32"
              placeholder="Jaké vzorce pozorujete? Co vás překvapilo? Která úroveň je klíčová?"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#a69d90] uppercase mb-3">
              Škálování na konci: Jak blízko jste nyní k cíli? ({data.scalingAfter}/10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={data.scalingAfter}
              onChange={(e) => updateData('scalingAfter', parseInt(e.target.value))}
              className="w-full h-2 bg-[#e5ddd2] rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: COLORS.primary }}
            />
            <div className="flex justify-between text-xs text-[#a69d90] mt-1">
              <span>1</span>
              <span>10</span>
            </div>
            {data.scalingAfter > data.scalingBefore && (
              <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                <CheckCircle size={14} /> Posun o {data.scalingAfter - data.scalingBefore} bod(y)!
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#a69d90] uppercase mb-2">
              Akční kroky: Co konkrétně uděláte?
            </label>
            <textarea
              value={data.actionSteps}
              onChange={(e) => updateData('actionSteps', e.target.value)}
              className="w-full p-4 border border-[#e5ddd2] rounded-xl focus:border-[#ff8474] focus:ring-2 focus:ring-[#ff8474]/20 outline-none resize-none h-24"
              placeholder="První krok, který podniknu..."
            />
          </div>
        </div>
      )
    },
    {
      title: 'Shrnutí',
      content: (
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-white border border-[#e5ddd2] rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6 pb-4 border-b border-[#e5ddd2]">
              <div>
                <h2 className="text-xl font-bold text-[#2C2C2C]">Logické úrovně</h2>
                <p className="text-[#a69d90] text-sm">{data.clientName || 'Koučovaný'} • {data.date}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#a69d90] uppercase">Škála</p>
                <p className="text-lg font-bold text-[#ff8474]">{data.scalingBefore} → {data.scalingAfter}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-bold text-[#a69d90] uppercase mb-2">Téma</h3>
              <p className="text-[#2C2C2C]">{data.topic || '-'}</p>
            </div>

            {/* Pyramids Summary */}
            <div className="space-y-6">
              {data.pyramids.map(pyramid => (
                <div key={pyramid.id} className="bg-[#FAF6F2] p-4 rounded-xl">
                  <h3 className="font-bold text-[#2C2C2C] mb-3 flex items-center gap-2">
                    <Target size={16} className="text-[#ff8474]" />
                    {pyramid.name}
                  </h3>
                  <div className="space-y-2">
                    {LEVELS.map(level => (
                      <div key={level.id} className="flex gap-3 text-sm">
                        <span className="font-medium text-[#78716C] w-28 shrink-0">{level.name}:</span>
                        <span className="text-[#2C2C2C]">{pyramid[level.id] || '-'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#e5ddd2]">
              <h3 className="text-xs font-bold text-[#a69d90] uppercase mb-2">Reflexe</h3>
              <p className="text-[#2C2C2C] italic">{data.reflection || '-'}</p>
            </div>

            <div className="mt-4 bg-[#ff8474] text-white p-4 rounded-xl">
              <h3 className="text-xs font-bold uppercase mb-2">Akční kroky</h3>
              <p className="font-medium">{data.actionSteps || '-'}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-[#ff8474] text-white rounded-xl font-bold hover:bg-[#e06b5c] shadow-lg shadow-[#ff8474]/20 transition-all"
            >
              <Printer size={18} /> Tisk / PDF
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-[#e5ddd2] text-[#78716C] rounded-xl font-medium hover:border-[#ff8474] hover:text-[#ff8474] transition-all"
            >
              {isCopied ? <CheckCircle size={18} className="text-green-500" /> : <Copy size={18} />}
              {isCopied ? 'Zkopírováno!' : 'Kopírovat'}
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F2] pb-12" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* Header */}
      <header className="bg-white border-b border-[#e5ddd2] sticky top-0 z-20 no-print">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#ff8474] flex items-center justify-center">
              <Target size={16} className="text-white" />
            </div>
            <h1 className="font-bold text-lg text-[#2C2C2C]">Logické úrovně</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetApp}
              className="p-2 text-[#a69d90] hover:text-[#ff8474] hover:bg-[#FAF6F2] rounded-lg transition-colors"
              title="Reset"
            >
              <RotateCcw size={18} />
            </button>
            <span className="text-sm text-[#a69d90]">Krok {step + 1} / {steps.length}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 bg-[#e5ddd2]">
          <div 
            className="h-full bg-[#ff8474] transition-all duration-500"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-[#e5ddd2] p-6 md:p-8">
          
          {/* Step Title */}
          <div className="mb-6 pb-4 border-b border-[#e5ddd2]">
            <h2 className="text-2xl font-bold text-[#2C2C2C]">{steps[step].title}</h2>
          </div>

          {/* Step Content */}
          {steps[step].content}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#e5ddd2] no-print">
            <button
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                step === 0 ? 'text-[#e5ddd2] cursor-not-allowed' : 'text-[#a69d90] hover:bg-[#FAF6F2]'
              }`}
            >
              <ChevronLeft size={18} /> Zpět
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                className="flex items-center gap-2 px-6 py-3 bg-[#ff8474] text-white rounded-xl font-bold hover:bg-[#e06b5c] shadow-lg shadow-[#ff8474]/20 transition-all"
              >
                Pokračovat <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={resetApp}
                className="flex items-center gap-2 px-6 py-3 bg-[#FAF6F2] text-[#78716C] rounded-xl font-medium hover:bg-[#e5ddd2] transition-colors"
              >
                Nové sezení
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Theory Modal */}
      {showTheory && <TheoryModal />}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        @media print { .no-print { display: none !important; } }
      `}</style>
    </div>
  );
}
