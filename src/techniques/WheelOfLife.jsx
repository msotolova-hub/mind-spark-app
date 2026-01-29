import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Pencil, RefreshCw, Printer, ChevronRight, HelpCircle, Plus, Trash2, Target, ArrowRight, ArrowLeft, Home } from 'lucide-react';

const CURRENT_COLOR = '#ff8474';
const FUTURE_COLOR = '#a69d90';

export default function WheelOfLife({ onBack }) {
  const [categories, setCategories] = useState([]);
  const [clientName, setClientName] = useState('');
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isEditingNames, setIsEditingNames] = useState(true);
  const [showFuture, setShowFuture] = useState(false);
  const [focusAreaId, setFocusAreaId] = useState('');

  const handleValueChange = (id, field, newValue) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, [field]: parseInt(newValue) } : cat
    ));
  };

  const handleNameChange = (id, newName) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, name: newName } : cat
    ));
  };

  const addCategory = () => {
    const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    setCategories([...categories, { id: newId, name: '', value: 1, futureValue: 1 }]);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
    if (focusAreaId === String(id)) setFocusAreaId('');
  };

  const handleReset = () => {
    if (window.confirm('Opravdu chcete vymazat všechna data a začít znovu?')) {
      setCategories([]);
      setClientName('');
      setSessionDate(new Date().toISOString().split('T')[0]);
      setNotes('');
      setShowFuture(false);
      setFocusAreaId('');
    }
  };

  const handleClearAll = () => {
     if (window.confirm('Opravdu chcete odstranit všechny oblasti?')) {
      setCategories([]);
      setFocusAreaId('');
    }
  }

  const handlePrint = () => {
    window.print();
  };

  const toggleFutureMode = () => {
    if (!showFuture) {
      setCategories(prev => prev.map(c => ({...c, futureValue: c.value})));
    }
    setShowFuture(!showFuture);
  };

  const toggleFocusArea = (id) => {
    setFocusAreaId(prev => prev === String(id) ? '' : String(id));
  };

  const CustomTick = ({ payload, x, y, textAnchor, stroke, radius }) => {
    const isFocused = categories.find(c => c.name === payload.value)?.id === parseInt(focusAreaId);
    
    return (
      <g className="recharts-layer recharts-polar-angle-axis-tick">
        <text 
          radius={radius} 
          stroke={stroke} 
          x={x} 
          y={y} 
          className="recharts-text recharts-polar-angle-axis-tick-value" 
          textAnchor={textAnchor}
          fill={isFocused ? FUTURE_COLOR : '#4b5563'}
          fontWeight={isFocused ? 'bold' : 'normal'}
          fontSize={isFocused ? 14 : 12}
        >
          {payload.value} {isFocused ? '★' : ''}
        </text>
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-12 print:bg-white print:pb-0">
      
      {/* --- HEADER --- */}
      <header className="bg-white shadow-sm sticky top-0 z-10 print:hidden">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
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
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: CURRENT_COLOR }}>
                KR
              </div>
              <h1 className="text-xl font-bold text-gray-800">
                Kolo Rovnováhy <span className="font-normal text-gray-500">by Mind Spark</span>
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RefreshCw size={16} />
              Reset
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: CURRENT_COLOR }}
            >
              <Printer size={16} />
              Tisk / PDF
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEVÝ PANEL: Inputs (při tisku skryté) --- */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Jméno koučovaného</label>
                <input 
                  type="text" 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Jméno..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ '--tw-ring-color': CURRENT_COLOR }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Datum sezení</label>
                <input 
                  type="date" 
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ '--tw-ring-color': CURRENT_COLOR }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                1. Definice oblastí
                <button 
                  onClick={() => setIsEditingNames(!isEditingNames)}
                  className={`p-1 rounded transition-colors ${isEditingNames ? 'bg-gray-100 text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
                  title={isEditingNames ? "Ukončit úpravy názvů" : "Upravit názvy"}
                >
                  <Pencil size={14} />
                </button>
              </h2>
              
              <div className="flex gap-2">
                 <button onClick={handleClearAll} className="text-xs text-red-400 hover:text-red-600 px-2 py-1">Smazat vše</button>
                 <button 
                    onClick={addCategory}
                    className="flex items-center gap-1 text-xs font-bold text-white px-3 py-1 rounded-full hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: CURRENT_COLOR }}
                  >
                    <Plus size={14} /> Přidat
                  </button>
              </div>
            </div>

            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {categories.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                   <p className="mb-2 text-sm">Zatím prázdno. Koučovaný si zde vypisuje vlastní oblasti života.</p>
                   <button onClick={addCategory} className="text-sm font-bold underline" style={{ color: CURRENT_COLOR }}>Přidat první oblast</button>
                </div>
              )}

              {categories.map((cat) => {
                const isFocused = String(cat.id) === focusAreaId;
                return (
                  <div 
                    key={cat.id} 
                    className={`p-3 rounded-lg border transition-all ${isFocused ? 'bg-orange-50/10 border-l-4' : 'bg-gray-50 border-gray-100'}`}
                    style={{ borderLeftColor: isFocused ? FUTURE_COLOR : 'transparent' }}
                  >
                    <div className="flex justify-between items-center mb-2 gap-2">
                      <div className="flex items-center gap-2 flex-grow">
                        <button 
                          onClick={() => toggleFocusArea(cat.id)}
                          className={`p-1.5 rounded-full transition-colors ${isFocused ? 'text-white shadow-sm' : 'text-gray-300 hover:bg-gray-200'}`}
                          style={{ backgroundColor: isFocused ? FUTURE_COLOR : 'transparent' }}
                          title={isFocused ? "Zrušit výběr pákové oblasti" : "Označit jako pákovou oblast"}
                        >
                          <Target size={14} />
                        </button>

                        <input 
                          type="text" 
                          value={cat.name}
                          onChange={(e) => handleNameChange(cat.id, e.target.value)}
                          placeholder="Název oblasti..."
                          className={`flex-grow bg-transparent font-medium border-b border-transparent focus:border-gray-300 focus:outline-none placeholder-gray-400 ${isFocused ? 'text-gray-900 font-bold' : 'text-gray-800'}`}
                        />
                      </div>
                      <button onClick={() => deleteCategory(cat.id)} className="text-gray-300 hover:text-red-500 p-1"><Trash2 size={14} /></button>
                    </div>

                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold w-12 text-gray-500">Teď:</span>
                      <input
                        type="range" min="1" max="10" step="1"
                        value={cat.value}
                        onChange={(e) => handleValueChange(cat.id, 'value', e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{ accentColor: CURRENT_COLOR }}
                      />
                      <span className="font-bold text-sm w-4 text-right" style={{ color: CURRENT_COLOR }}>{cat.value}</span>
                    </div>

                    {showFuture && (
                      <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-200 animate-fadeIn">
                        <span className="text-xs font-bold w-12" style={{ color: FUTURE_COLOR }}>Cíl:</span>
                        <input
                          type="range" min="1" max="10" step="1"
                          value={cat.futureValue}
                          onChange={(e) => handleValueChange(cat.id, 'futureValue', e.target.value)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          style={{ accentColor: FUTURE_COLOR }}
                        />
                        <span className="font-bold text-sm w-4 text-right" style={{ color: FUTURE_COLOR }}>{cat.futureValue}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {categories.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                    <button 
                        onClick={toggleFutureMode}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${showFuture ? 'bg-gray-100 text-gray-600' : 'text-white shadow-md hover:shadow-lg'}`}
                        style={{ backgroundColor: showFuture ? '#f3f4f6' : FUTURE_COLOR, color: showFuture ? '#4b5563' : 'white' }}
                    >
                        {showFuture ? 'Skrýt plánování vize' : 'Přejít k vizi a cílům'}
                        {!showFuture && <ArrowRight size={18} />}
                    </button>
                </div>
            )}
          </div>
          
          {categories.length > 0 && (
            <div className={`p-6 rounded-2xl border animate-slideDown transition-colors ${showFuture ? 'bg-[#f8f7f6] border-[#eaddcf]' : 'bg-white border-white'}`}>
                {!showFuture ? (
                   <div className="text-gray-500 text-sm italic text-center">
                      <p>Jakmile máte vyplněn současný stav, požádejte koučovaného o výběr <strong>pákové oblasti</strong> (kliknutím na ikonu terče u názvu oblasti).</p>
                   </div>
                ) : (
                  <div>
                    <div className="mb-6 flex items-start gap-3">
                        <div className="p-2 rounded-full text-white mt-1 shrink-0" style={{ backgroundColor: FUTURE_COLOR }}>
                           <Target size={16} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wide mb-1" style={{ color: FUTURE_COLOR }}>Krok 1: Páková oblast</h3>
                            {focusAreaId ? (
                                <p className="text-sm text-gray-700">
                                    Vybráno: <strong>{categories.find(c => String(c.id) === focusAreaId)?.name}</strong>. 
                                    <br/><span className="text-xs text-gray-500">Tato oblast má největší potenciál pozitivně ovlivnit ostatní.</span>
                                </p>
                            ) : (
                                <p className="text-sm text-gray-500 italic">
                                    "Kdybyste si měl/a zvolit jednu oblast, která nejvíce promění i ty ostatní, která by to byla?"
                                    <br/>(Klikněte na ikonu terče v seznamu výše)
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full text-white mt-1 shrink-0" style={{ backgroundColor: FUTURE_COLOR, opacity: 0.7 }}>
                           <ArrowRight size={16} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wide mb-1" style={{ color: FUTURE_COLOR }}>Krok 2: Vize změny</h3>
                            <p className="text-sm text-gray-700">
                                Nastavte pomocí <strong>béžových posuvníků</strong> cílový stav.
                            </p>
                        </div>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>

        {/* --- PRAVÝ PANEL: Vizualizace --- */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 print:shadow-none print:border-none print:p-0 min-h-[500px] flex flex-col">
            
            {/* Tiskové záhlaví */}
            <div className="hidden print:block mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-bold mb-2 text-gray-800">
                    Kolo Rovnováhy <span className="text-2xl font-normal text-gray-500">by Mind Spark</span>
                  </h1>
                  <p className="text-gray-500 text-sm">Datum sezení: {sessionDate ? new Date(sessionDate).toLocaleDateString('cs-CZ') : new Date().toLocaleDateString('cs-CZ')}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-lg">Koučovaný:</p>
                  <p className="font-bold text-2xl text-black">{clientName || '________________'}</p>
                </div>
              </div>
            </div>

            <div className="flex-grow w-full relative flex items-center justify-center">
              {categories.length < 3 ? (
                <div className="text-center text-gray-400 p-8 print:hidden">
                   <p>Pro zobrazení grafu přidejte alespoň 3 oblasti.</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={500}>
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={categories}>
                    <PolarGrid gridType="circle" stroke="#e5e7eb" />
                    <PolarAngleAxis 
                      dataKey="name" 
                      tick={<CustomTick />}
                    />
                    <PolarRadiusAxis angle={90} domain={[0, 10]} tick={false} axisLine={false} />
                    
                    <Radar
                      name="Současný stav"
                      dataKey="value"
                      stroke={CURRENT_COLOR}
                      strokeWidth={3}
                      fill={CURRENT_COLOR}
                      fillOpacity={0.3}
                    />

                    {showFuture && (
                        <Radar
                        name="Cílový stav (Vize)"
                        dataKey="futureValue"
                        stroke={FUTURE_COLOR}
                        strokeWidth={3}
                        fill={FUTURE_COLOR}
                        fillOpacity={0.3}
                        strokeDasharray="5 5"
                        />
                    )}
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* TABULKA HODNOT PRO TISK */}
            <div className="hidden print:block mt-8 w-full">
                <h3 className="font-bold border-b-2 border-gray-800 pb-2 mb-4 text-lg">Přehled hodnocení</h3>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="py-2">Oblast</th>
                      <th className="py-2 text-center" style={{ color: CURRENT_COLOR }}>Současnost (1-10)</th>
                      <th className="py-2 text-center" style={{ color: FUTURE_COLOR }}>Cíl / Vize (1-10)</th>
                      <th className="py-2 text-center">Rozdíl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(cat => {
                      const isFocused = String(cat.id) === focusAreaId;
                      return (
                        <tr key={cat.id} className={`border-b border-gray-100 ${isFocused ? 'bg-gray-50 font-bold' : ''}`}>
                          <td className="py-3 flex items-center gap-2">
                             {isFocused && <Target size={14} fill={FUTURE_COLOR} stroke="none" />} 
                             {cat.name || '(Nepojmenováno)'}
                             {isFocused && <span className="text-xs font-normal text-gray-500 ml-2">(Páková oblast)</span>}
                          </td>
                          <td className="py-3 text-center font-bold text-gray-700">{cat.value}</td>
                          <td className="py-3 text-center font-bold text-gray-700">{showFuture ? cat.futureValue : '-'}</td>
                          <td className="py-3 text-center text-gray-500">
                            {showFuture ? (cat.futureValue - cat.value > 0 ? `+${cat.futureValue - cat.value}` : cat.futureValue - cat.value) : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
            </div>
          </div>

          {/* Poznámky */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 print:shadow-none print:border print:border-gray-300 print:mt-4 print:break-inside-avoid">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 print:text-black">
              <ChevronRight size={20} style={{ color: CURRENT_COLOR }} />
              Poznámky a Akční kroky
            </h3>
            
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-48 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none print:hidden"
              placeholder="Zde si zapisujte klíčová uvědomění..."
              style={{ '--tw-ring-color': CURRENT_COLOR }}
            />

            <div className="hidden print:block whitespace-pre-wrap text-sm text-gray-800 font-serif leading-relaxed min-h-[100px]">
              {notes || "(Žádné poznámky nebyly zapsány.)"}
            </div>
            
             <div className="hidden print:flex justify-between mt-12 pt-8 border-t border-gray-300 text-sm text-gray-500">
                <div className="w-1/3 border-t border-gray-400 pt-2 text-center">Podpis koučovaného</div>
                <div className="w-1/3 border-t border-gray-400 pt-2 text-center">Podpis kouče</div>
             </div>
          </div>

        </div>
      </main>

      <style>{`
        @media print {
          @page { margin: 1.5cm; }
          body { -webkit-print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          .print\\:flex { display: flex !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-none { border: none !important; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px; width: 16px;
          border-radius: 50%;
          cursor: pointer;
          margin-top: -6px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.2);
          background: currentColor;
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%; height: 4px;
          cursor: pointer; background: #e5e7eb; border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
