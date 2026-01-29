import React, { useState, useEffect } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  Target, Thermometer, Users, Home, Triangle, LogOut, BookOpen, ChevronRight, ChevronLeft,
  Sparkles, X, ArrowLeft, Info, Pencil, RefreshCw, Printer, Plus, Trash2, ArrowRight,
  Play, Pause, RotateCcw, CheckCircle, Lightbulb, Wrench, Search, MessageSquare, Anchor,
  User, Calendar, Quote, Flame, Feather, HelpCircle, MapPin, Copy, Battery, BatteryCharging,
  Save, FileText, Download, Droplets, Activity, TrendingDown
} from 'lucide-react';

// ============================================
// GLOBÁLNÍ STYLY A FONT MONTSERRAT
// ============================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
    
    * {
      font-family: 'Montserrat', sans-serif !important;
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      background-color: #FAF6F2;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
    .animate-slideUp { animation: slideUp 0.4s ease-out forwards; }
    .animate-slideDown { animation: slideDown 0.3s ease-out; }
    
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #FAF6F2; border-radius: 3px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5ddd2; border-radius: 3px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #a69d90; }
    
    @media print {
      .no-print { display: none !important; }
      .print-only { display: block !important; }
      @page { margin: 1.5cm; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    
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
      cursor: pointer; background: #e5ddd2; border-radius: 2px;
    }
  `}</style>
);

// ============================================
// BARVY MIND SPARK
// ============================================
const COLORS = {
  primary: '#ff8474',
  primaryHover: '#e06b5c',
  secondary: '#a69d90',
  tertiary: '#e5ddd2',
  background: '#FAF6F2',
  dark: '#2C2C2C',
  white: '#FFFFFF'
};

// ============================================
// DATA TECHNIK S TEXTY "O METODĚ"
// ============================================
const TECHNIQUES = [
  {
    id: 'wheel',
    name: 'Kolo Rovnováhy',
    subtitle: 'Wheel of Life',
    description: 'Vizuální nástroj pro zmapování spokojenosti v klíčových životních oblastech.',
    icon: Target,
    color: '#ff8474',
    theory: {
      origin: 'Kolo rovnováhy (Wheel of Life) je jedním z nejpoužívanějších koučovacích nástrojů na světě. Jeho původ sahá do 60. let 20. století a je spojován s Paulem J. Meyerem, zakladatelem Success Motivation Institute. Od té doby se stal základním kamenem koučovací praxe po celém světě.',
      definition: 'Jde o vizuální koučovací technika, který poskytuje "helikoptérový pohled" na život koučovaného. Kruhový diagram rozdělený do segmentů reprezentuje klíčové životní oblasti, které koučovaný hodnotí na škále 1-10. Výsledný tvar okamžitě odhaluje oblasti vyžadující pozornost.',
      keyPoints: [
        'Umožňuje rychle identifikovat oblasti vyžadující pozornost',
        'Vizualizuje nerovnováhu mezi různými aspekty života',
        'Pomáhá stanovit priority pro osobní rozvoj',
        'Slouží jako baseline pro měření pokroku v čase',
        'Koncept "pákové oblasti" – jedna změna ovlivní ostatní'
      ],
      whenToUse: [
        'Na začátku koučovacího vztahu pro celkové zmapování',
        'Při pocitu "zaseknutí" nebo nejasnosti priorit',
        'Pro pravidelnou revizi životní spokojenosti',
        'Když koučovaný potřebuje získat nadhled nad svým životem'
      ]
    }
  },
  {
    id: 'boiler',
    name: 'Energetický kotel',
    subtitle: 'Energy Boiler',
    description: 'Prozkoumejte zdroje energie a místa, kde vám uniká.',
    icon: Thermometer,
    color: '#e06b5c',
    theory: {
      origin: 'Metafora energetického kotle vychází z principů energetického managementu a je inspirována prací Jima Loehr a Tonyho Schwartze (The Power of Full Engagement). Vizualizace energie jako tekutiny v nádobě pomáhá koučovaným lépe pochopit dynamiku jejich vitality a životní síly.',
      definition: 'Energetický kotel je koučovací technika využívající vizuální metaforu nádoby s tekutinou. Nahoře přitékají zdroje energie (přítoky), dole jsou díry, kterými energie uniká (odtoky). Cílem je najít rovnováhu a optimalizovat energetický management koučovaného.',
      keyPoints: [
        'Mapuje konkrétní zdroje energie (co člověka nabíjí)',
        'Identifikuje úniky energie (co člověka vyčerpává)',
        'Pracuje se 4 úrovněmi: minimum, aktuální stav, cíl, maximum',
        'Vede k praktickým strategiím pro zvýšení vitality',
        'Pomáhá najít rovnováhu mezi přítoky a odtoky'
      ],
      whenToUse: [
        'Při chronické únavě nebo vyčerpání',
        'Když koučovaný hledá work-life balance',
        'Pro prevenci vyhoření',
        'Při potřebě změny životního stylu'
      ]
    }
  },
  {
    id: 'disney',
    name: 'Disney Model',
    subtitle: 'Snílek • Realizátor • Kritik',
    description: 'Tři fáze kreativního plánování pro posílení realizačních schopností.',
    icon: Home,
    color: '#FBBF24',
    theory: {
      origin: 'Disney Strategy byla vyvinuta Robertem Diltsem na základě studia kreativního procesu Walta Disneyho. Dilts analyzoval, jak Disney dokázal přeměnit fantastické vize v realitu, a identifikoval tři odlišné myšlenkové pozice, které Disney střídal během tvůrčího procesu.',
      definition: 'Technika odděluje tři způsoby myšlení do samostatných fází: Snílek (neomezená kreativita a vize), Realizátor (praktické plánování a akční kroky) a Kritik (konstruktivní hodnocení a zdokonalování). Oddělením těchto rolí se předchází vzájemnému blokování.',
      keyPoints: [
        'Snílek: Vize bez omezení, "co kdyby všechno bylo možné"',
        'Realizátor: Jak konkrétně to udělat, jaké kroky podniknout',
        'Kritik: Co by mohlo selhat, jak plán vylepšit',
        'Každá pozice má vlastní fyziologii, tón hlasu i perspektivu',
        'Striktní oddělení fází je klíčem k úspěchu'
      ],
      whenToUse: [
        'Při plánování nových projektů nebo cílů',
        'Když je koučovaný paralyzován perfekcionismem',
        'Pro rozvoj podnikatelských nápadů',
        'Při překonávání tvůrčího bloku'
      ]
    }
  },
  {
    id: 'advisors',
    name: '3 Rádcové',
    subtitle: 'Three Advisors',
    description: 'Získejte moudrost od tří imaginárních postav pro řešení složitých situací.',
    icon: Users,
    color: '#a69d90',
    theory: {
      origin: 'Technika Tří rádců čerpá z jungiánské psychologie a konceptu archetypů. Využívá principu externalizace vnitřní moudrosti prostřednictvím imaginárních postav, což umožňuje přístup k nevědomým zdrojům řešení a kreativním perspektivám.',
      definition: 'Koučovaný si zvolí tři postavy (reálné, fiktivní nebo archetypální), které reprezentují různé perspektivy moudrosti. V imaginárním prostoru se s nimi setkává a konzultuje svou situaci, čímž získává nové úhly pohledu na svůj problém.',
      keyPoints: [
        'Využívá sílu imaginace pro přístup k vnitřní moudrosti',
        'Tři různé postavy zajišťují diverzitu perspektiv',
        'Bezpečný prostor pro exploraci možností',
        'Integrace rad vede k vlastnímu řešení koučovaného',
        '"Zlatá otázka" – jedna otázka, která vše vyřeší'
      ],
      whenToUse: [
        'Při složitých životních rozhodnutích',
        'Když koučovaný potřebuje novou perspektivu',
        'Pro práci s vnitřními konflikty',
        'Při hledání inspirace a vnitřního vedení'
      ]
    }
  },
  {
    id: 'levels',
    name: 'Logické úrovně',
    subtitle: 'Diltsova pyramida',
    description: 'Prozkoumejte a slaďte myšlenky napříč pěti úrovněmi vědomí.',
    icon: Triangle,
    color: '#78716C',
    theory: {
      origin: 'Kalifornský psycholog Robert Dilts vytvořil z práce Gregoryho Batesona jednoduchý a elegantní model pro přemýšlení o osobní změně, učení a komunikaci. Model spojuje myšlenky kontextu, úrovně učení a učební pozice do praktického nástroje.',
      definition: 'Logické úrovně jsou vnitřní hierarchií, v níž každý stupeň je postupně stále více psychologicky ucelenější a vlivnější. Model zahrnuje 5 úrovní: Prostředí (kde, kdy), Chování (co), Schopnosti (jak), Hodnoty & Přesvědčení (proč) a Identita (kdo).',
      keyPoints: [
        'Změna na vyšší úrovni automaticky způsobuje změnu na nižších úrovních',
        'Logické úrovně oddělují chování a osobu (člověk není své chování)',
        'Pomáhají identifikovat nejvhodnější body pro intervenci',
        'Umožňují sladění napříč všemi úrovněmi vědomí',
        'Multi-pyramidová práce pro porovnání různých možností'
      ],
      whenToUse: [
        'Pro hlubokou transformační práci',
        'Při rozhodování mezi více možnostmi',
        'Když koučovaný hledá smysl a poslání',
        'Pro práci s identitou a hodnotami'
      ]
    }
  }
];

// ============================================
// KARTA TECHNIKY NA DASHBOARDU
// ============================================
const TechniqueCard = ({ technique, onClick, onInfoClick }) => {
  const Icon = technique.icon;
  
  return (
    <div 
      className="group relative bg-white rounded-3xl p-6 shadow-sm border border-transparent hover:border-[#ff8474]/30 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 -translate-y-1/2 translate-x-1/2 transition-transform duration-500 group-hover:scale-150"
        style={{ backgroundColor: technique.color }}
      />
      
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
        style={{ backgroundColor: `${technique.color}15` }}
      >
        <Icon size={28} style={{ color: technique.color }} />
      </div>
      
      <h3 className="text-xl font-bold text-[#2C2C2C] mb-1 group-hover:text-[#ff8474] transition-colors">
        {technique.name}
      </h3>
      <p className="text-xs font-medium text-[#a69d90] uppercase tracking-wider mb-3">
        {technique.subtitle}
      </p>
      <p className="text-sm text-[#78716C] leading-relaxed mb-4">
        {technique.description}
      </p>
      
      <div className="flex items-center justify-end pt-4 border-t border-[#e5ddd2]">
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onInfoClick(); }}
            className="p-2 rounded-full hover:bg-[#FAF6F2] text-[#a69d90] hover:text-[#ff8474] transition-colors"
            title="O metodě"
          >
            <BookOpen size={16} />
          </button>
          <div className="flex items-center text-[#ff8474] font-semibold text-sm group-hover:translate-x-1 transition-transform">
            Spustit <ChevronRight size={16} className="ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MODAL "O METODĚ"
// ============================================
const MethodInfoModal = ({ technique, onClose, onStart }) => {
  if (!technique) return null;
  const Icon = technique.icon;
  
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
        <div 
          className="p-8 relative overflow-hidden"
          style={{ backgroundColor: `${technique.color}10` }}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/50 text-[#78716C] hover:text-[#2C2C2C] transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: technique.color }}
            >
              <Icon size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#2C2C2C]">{technique.name}</h2>
              <p className="text-[#a69d90] font-medium">{technique.subtitle}</p>
            </div>
          </div>
        </div>
        
        <div className="p-8 overflow-y-auto max-h-[55vh] custom-scrollbar">
          <div className="space-y-6 text-[#4a4a4a]">
            
            <section>
              <h3 className="text-sm font-bold text-[#ff8474] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Info size={14} /> Původ a historie
              </h3>
              <p className="leading-relaxed text-sm">
                {technique.theory.origin}
              </p>
            </section>
            
            <section className="bg-[#FAF6F2] p-4 rounded-xl border border-[#e5ddd2]">
              <h3 className="text-sm font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                Definice
              </h3>
              <p className="leading-relaxed text-sm">
                {technique.theory.definition}
              </p>
            </section>
            
            <section>
              <h3 className="text-sm font-bold text-[#2C2C2C] uppercase tracking-wider mb-3">
                Klíčové principy
              </h3>
              <ul className="space-y-2">
                {technique.theory.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span 
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5 shrink-0"
                      style={{ backgroundColor: technique.color }}
                    >
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            <section>
              <h3 className="text-sm font-bold text-[#2C2C2C] uppercase tracking-wider mb-3">
                Kdy použít
              </h3>
              <ul className="space-y-1.5">
                {technique.theory.whenToUse.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <ChevronRight size={14} style={{ color: technique.color }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
        
        <div className="p-6 bg-[#FAF6F2] border-t border-[#e5ddd2] flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-semibold text-[#78716C] bg-white border border-[#e5ddd2] hover:border-[#a69d90] transition-colors"
          >
            Zavřít
          </button>
          <button 
            onClick={onStart}
            className="flex-1 py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg flex items-center justify-center gap-2"
            style={{ backgroundColor: technique.color }}
          >
            Spustit techniku <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// HEADER PRO TECHNIKY (NAVIGACE ZPĚT)
// ============================================
const TechniqueHeader = ({ techniqueName, techniqueColor, onBack }) => (
  <div className="bg-white border-b border-[#e5ddd2] sticky top-0 z-40 no-print">
    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-[#78716C] hover:text-[#ff8474] hover:bg-[#FAF6F2] transition-all font-medium text-sm"
      >
        <ArrowLeft size={18} />
        Zpět na přehled
      </button>
      <div className="h-6 w-px bg-[#e5ddd2]" />
      <div className="flex items-center gap-2">
        <div 
          className="w-6 h-6 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: techniqueColor }}
        >
          <Sparkles size={12} className="text-white" />
        </div>
        <span className="text-sm font-semibold text-[#2C2C2C]">{techniqueName}</span>
      </div>
    </div>
  </div>
);

// ============================================
// DASHBOARD
// ============================================
const Dashboard = ({ onSelectTechnique, onShowInfo }) => {
  return (
    <div className="min-h-screen bg-[#FAF6F2]">
      <header className="bg-white border-b border-[#e5ddd2] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff8474] flex items-center justify-center">
              <Sparkles size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#2C2C2C]">Koučovací techniky</h1>
              <p className="text-xs text-[#a69d90] font-medium">by Mind Spark</p>
            </div>
          </div>
          
          <button className="p-2 rounded-xl hover:bg-[#FAF6F2] text-[#a69d90] hover:text-[#ff8474] transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </header>
      
      <div className="bg-gradient-to-b from-white to-[#FAF6F2] py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4">
            Vyberte techniku pro dnešní sezení
          </h2>
          <p className="text-[#78716C] max-w-xl mx-auto">
            5 profesionálních koučovacích nástrojů připravených k okamžitému použití. 
            Každá technika obsahuje průvodce, pracovní listy a export výstupů.
          </p>
        </div>
      </div>
      
      <main className="max-w-6xl mx-auto px-6 pb-16 -mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECHNIQUES.map((technique, index) => (
            <div 
              key={technique.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="animate-slideUp opacity-0"
            >
              <TechniqueCard 
                technique={technique}
                onClick={() => onSelectTechnique(technique)}
                onInfoClick={() => onShowInfo(technique)}
              />
            </div>
          ))}
        </div>
      </main>
      
      <footer className="border-t border-[#e5ddd2] py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#a69d90]">
            © 2026 Mind Spark · Profesionální nástroje pro kouče
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-[#a69d90] hover:text-[#ff8474] transition-colors">Podpora</a>
            <a href="#" className="text-[#a69d90] hover:text-[#ff8474] transition-colors">Podmínky</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ============================================
// KOLO ROVNOVÁHY (WHEEL OF LIFE)
// ============================================
const WheelOfLife = ({ onBack }) => {
  const [categories, setCategories] = useState([]);
  const [clientName, setClientName] = useState('');
  const [notes, setNotes] = useState('');
  const [showFuture, setShowFuture] = useState(false);
  const [focusAreaId, setFocusAreaId] = useState('');

  const CURRENT_COLOR = '#ff8474';
  const FUTURE_COLOR = '#a69d90';

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
    setCategories([...categories, { id: newId, name: '', value: 5, futureValue: 5 }]);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
    if (focusAreaId === String(id)) setFocusAreaId('');
  };

  const handleReset = () => {
    if (window.confirm('Opravdu chcete vymazat všechna data a začít znovu?')) {
      setCategories([]);
      setClientName('');
      setNotes('');
      setShowFuture(false);
      setFocusAreaId('');
    }
  };

  const toggleFocusArea = (id) => {
    setFocusAreaId(prev => prev === String(id) ? '' : String(id));
  };

  const CustomTick = ({ payload, x, y, textAnchor, stroke, radius }) => {
    const isFocused = categories.find(c => c.name === payload.value)?.id === parseInt(focusAreaId);
    return (
      <g className="recharts-layer recharts-polar-angle-axis-tick">
        <text 
          radius={radius} stroke={stroke} x={x} y={y} 
          className="recharts-text recharts-polar-angle-axis-tick-value" 
          textAnchor={textAnchor}
          fill={isFocused ? FUTURE_COLOR : '#4b5563'}
          fontWeight={isFocused ? 'bold' : 'normal'}
          fontSize={isFocused ? 14 : 12}
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {payload.value} {isFocused ? '★' : ''}
        </text>
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF6F2]">
      <TechniqueHeader techniqueName="Kolo Rovnováhy" techniqueColor="#ff8474" onBack={onBack} />
      
      <div className="pb-12 print:bg-white print:pb-0">
        <header className="bg-white shadow-sm py-4 print:hidden">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-[#ff8474]">
                <Target size={16} />
              </div>
              <h1 className="text-xl font-bold text-[#2C2C2C]">Kolo Rovnováhy</h1>
            </div>
            <div className="flex gap-2">
              <button onClick={handleReset} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#78716C] bg-[#FAF6F2] rounded-lg hover:bg-[#e5ddd2] transition-colors">
                <RefreshCw size={16} /> Reset
              </button>
              <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm hover:opacity-90 transition-opacity bg-[#ff8474]">
                <Printer size={16} /> Tisk / PDF
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEVÝ PANEL */}
          <div className="lg:col-span-5 space-y-6 print:hidden">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e5ddd2]">
              <label className="block text-sm font-medium text-[#a69d90] mb-2">Jméno koučovaného</label>
              <input 
                type="text" value={clientName} onChange={(e) => setClientName(e.target.value)}
                placeholder="Jméno koučovaného..."
                className="w-full px-4 py-2 border border-[#e5ddd2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8474] focus:border-transparent"
              />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e5ddd2]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-[#2C2C2C]">1. Definice oblastí</h2>
                <button onClick={addCategory} className="flex items-center gap-1 text-xs font-bold text-white px-3 py-1 rounded-full hover:opacity-90 transition-opacity bg-[#ff8474]">
                  <Plus size={14} /> Přidat
                </button>
              </div>

              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {categories.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-[#a69d90] border-2 border-dashed border-[#e5ddd2] rounded-lg bg-[#FAF6F2]">
                    <p className="mb-2 text-sm">Zatím prázdno.</p>
                    <button onClick={addCategory} className="text-sm font-bold underline text-[#ff8474]">Přidat první oblast</button>
                  </div>
                )}

                {categories.map((cat) => {
                  const isFocused = String(cat.id) === focusAreaId;
                  return (
                    <div key={cat.id} className={`p-3 rounded-lg border transition-all ${isFocused ? 'bg-[#ff8474]/5 border-l-4 border-l-[#a69d90]' : 'bg-[#FAF6F2] border-[#e5ddd2]'}`}>
                      <div className="flex justify-between items-center mb-2 gap-2">
                        <div className="flex items-center gap-2 flex-grow">
                          <button onClick={() => toggleFocusArea(cat.id)}
                            className={`p-1.5 rounded-full transition-colors ${isFocused ? 'bg-[#a69d90] text-white shadow-sm' : 'text-[#e5ddd2] hover:bg-[#e5ddd2]'}`}
                            title={isFocused ? "Zrušit výběr pákové oblasti" : "Označit jako pákovou oblast"}
                          >
                            <Target size={14} />
                          </button>
                          <input type="text" value={cat.name} onChange={(e) => handleNameChange(cat.id, e.target.value)}
                            placeholder="Název oblasti..."
                            className={`flex-grow bg-transparent font-medium border-b border-transparent focus:border-[#a69d90] focus:outline-none placeholder-[#a69d90] ${isFocused ? 'text-[#2C2C2C] font-bold' : 'text-[#2C2C2C]'}`}
                          />
                        </div>
                        <button onClick={() => deleteCategory(cat.id)} className="text-[#e5ddd2] hover:text-red-500 p-1"><Trash2 size={14} /></button>
                      </div>

                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold w-12 text-[#a69d90]">Teď:</span>
                        <input type="range" min="1" max="10" step="1" value={cat.value}
                          onChange={(e) => handleValueChange(cat.id, 'value', e.target.value)}
                          className="w-full h-2 bg-[#e5ddd2] rounded-lg appearance-none cursor-pointer"
                          style={{ accentColor: CURRENT_COLOR }}
                        />
                        <span className="font-bold text-sm w-4 text-right text-[#ff8474]">{cat.value}</span>
                      </div>

                      {showFuture && (
                        <div className="flex items-center gap-3 mt-2 pt-2 border-t border-[#e5ddd2] animate-fadeIn">
                          <span className="text-xs font-bold w-12 text-[#a69d90]">Cíl:</span>
                          <input type="range" min="1" max="10" step="1" value={cat.futureValue}
                            onChange={(e) => handleValueChange(cat.id, 'futureValue', e.target.value)}
                            className="w-full h-2 bg-[#e5ddd2] rounded-lg appearance-none cursor-pointer"
                            style={{ accentColor: FUTURE_COLOR }}
                          />
                          <span className="font-bold text-sm w-4 text-right text-[#a69d90]">{cat.futureValue}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {categories.length > 0 && (
                <div className="mt-6 pt-6 border-t border-[#e5ddd2]">
                  <button onClick={() => setShowFuture(!showFuture)}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${showFuture ? 'bg-[#FAF6F2] text-[#78716C]' : 'bg-[#a69d90] text-white shadow-md hover:shadow-lg'}`}
                  >
                    {showFuture ? 'Skrýt plánování vize' : 'Přejít k vizi a cílům'}
                    {!showFuture && <ArrowRight size={18} />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* PRAVÝ PANEL - VIZUALIZACE */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e5ddd2] print:shadow-none print:border-none print:p-0 min-h-[500px] flex flex-col">
              
              {/* Tiskové záhlaví */}
              <div className="hidden print:block mb-6 pb-6 border-b border-[#e5ddd2]">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-bold mb-2 text-[#2C2C2C]">
                      Kolo Rovnováhy <span className="text-2xl font-normal text-[#a69d90]">by Mind Spark</span>
                    </h1>
                    <p className="text-[#a69d90] text-sm">Datum: {new Date().toLocaleDateString('cs-CZ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#78716C] text-lg">Koučovaný:</p>
                    <p className="font-bold text-2xl text-[#2C2C2C]">{clientName || '________________'}</p>
                  </div>
                </div>
              </div>

              <div className="flex-grow w-full relative flex items-center justify-center">
                {categories.length < 3 ? (
                  <div className="text-center text-[#a69d90] p-8 print:hidden">
                    <p>Pro zobrazení grafu přidejte alespoň 3 oblasti.</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={450}>
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={categories}>
                      <PolarGrid gridType="circle" stroke="#e5ddd2" />
                      <PolarAngleAxis dataKey="name" tick={<CustomTick />} />
                      <PolarRadiusAxis angle={90} domain={[0, 10]} tick={false} axisLine={false} />
                      
                      <Radar name="Současný stav" dataKey="value" stroke={CURRENT_COLOR} strokeWidth={3} fill={CURRENT_COLOR} fillOpacity={0.3} />
                      {showFuture && (
                        <Radar name="Cílový stav (Vize)" dataKey="futureValue" stroke={FUTURE_COLOR} strokeWidth={3} fill={FUTURE_COLOR} fillOpacity={0.3} strokeDasharray="5 5" />
                      )}
                      <Legend wrapperStyle={{ paddingTop: '20px', fontFamily: 'Montserrat, sans-serif' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* TABULKA PRO TISK */}
              <div className="hidden print:block mt-8 w-full">
                <h3 className="font-bold border-b-2 border-[#2C2C2C] pb-2 mb-4 text-lg">Přehled hodnocení</h3>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e5ddd2]">
                      <th className="py-2">Oblast</th>
                      <th className="py-2 text-center text-[#ff8474]">Současnost</th>
                      <th className="py-2 text-center text-[#a69d90]">Cíl / Vize</th>
                      <th className="py-2 text-center">Rozdíl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(cat => {
                      const isFocused = String(cat.id) === focusAreaId;
                      return (
                        <tr key={cat.id} className={`border-b border-[#e5ddd2] ${isFocused ? 'bg-[#FAF6F2] font-bold' : ''}`}>
                          <td className="py-3 flex items-center gap-2">
                            {isFocused && <Target size={14} fill="#a69d90" stroke="none" />} 
                            {cat.name || '(Nepojmenováno)'}
                            {isFocused && <span className="text-xs font-normal text-[#a69d90] ml-2">(Páková oblast)</span>}
                          </td>
                          <td className="py-3 text-center font-bold text-[#2C2C2C]">{cat.value}</td>
                          <td className="py-3 text-center font-bold text-[#2C2C2C]">{showFuture ? cat.futureValue : '-'}</td>
                          <td className="py-3 text-center text-[#a69d90]">
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
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e5ddd2] print:shadow-none print:border print:border-[#e5ddd2] print:mt-4 print:break-inside-avoid">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#2C2C2C]">
                <ChevronRight size={20} className="text-[#ff8474]" />
                Poznámky a Akční kroky
              </h3>
              
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                className="w-full h-48 p-4 border border-[#e5ddd2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8474] focus:border-transparent resize-none print:hidden"
                placeholder="Zde si zapisujte klíčová uvědomění..."
              />

              <div className="hidden print:block whitespace-pre-wrap text-sm text-[#2C2C2C] leading-relaxed min-h-[100px]">
                {notes || "(Žádné poznámky nebyly zapsány.)"}
              </div>
              
              <div className="hidden print:flex justify-between mt-12 pt-8 border-t border-[#e5ddd2] text-sm text-[#a69d90]">
                <div className="w-1/3 border-t border-[#a69d90] pt-2 text-center">Podpis koučovaného</div>
                <div className="w-1/3 border-t border-[#a69d90] pt-2 text-center">Podpis kouče</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// ============================================
// PLACEHOLDER PRO OSTATNÍ TECHNIKY
// ============================================
const TechniquePlaceholder = ({ technique, onBack }) => {
  const Icon = technique.icon;
  
  return (
    <div className="min-h-screen bg-[#FAF6F2]">
      <TechniqueHeader techniqueName={technique.name} techniqueColor={technique.color} onBack={onBack} />
      
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center max-w-md mx-auto p-8">
          <div 
            className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: technique.color }}
          >
            <Icon size={48} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#2C2C2C] mb-2">{technique.name}</h2>
          <p className="text-[#a69d90] mb-8">{technique.subtitle}</p>
          
          <div className="bg-white p-6 rounded-2xl border border-[#e5ddd2] mb-6">
            <p className="text-sm text-[#78716C] leading-relaxed">
              {technique.description}
            </p>
          </div>
          
          <p className="text-xs text-[#a69d90] italic">
            Kompletní funkčnost této techniky bude k dispozici v další verzi.
          </p>
          
          <button 
            onClick={onBack}
            className="mt-6 px-6 py-3 bg-white rounded-xl text-[#2C2C2C] font-medium hover:shadow-lg transition-all border border-[#e5ddd2]"
          >
            ← Zpět na přehled
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// HLAVNÍ APP KOMPONENTA
// ============================================
const MindSparkApp = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [infoTechnique, setInfoTechnique] = useState(null);
  
  const handleSelectTechnique = (technique) => {
    setSelectedTechnique(technique);
    setCurrentView('technique');
  };
  
  const handleBack = () => {
    setSelectedTechnique(null);
    setCurrentView('dashboard');
  };
  
  const handleShowInfo = (technique) => {
    setInfoTechnique(technique);
  };
  
  const handleStartFromInfo = () => {
    if (infoTechnique) {
      handleSelectTechnique(infoTechnique);
      setInfoTechnique(null);
    }
  };
  
  const renderTechnique = () => {
    if (!selectedTechnique) return null;
    
    switch (selectedTechnique.id) {
      case 'wheel':
        return <WheelOfLife onBack={handleBack} />;
      case 'boiler':
      case 'disney':
      case 'advisors':
      case 'levels':
        return <TechniquePlaceholder technique={selectedTechnique} onBack={handleBack} />;
      default:
        return <TechniquePlaceholder technique={selectedTechnique} onBack={handleBack} />;
    }
  };
  
  return (
    <>
      <GlobalStyles />
      
      {currentView === 'dashboard' && (
        <Dashboard 
          onSelectTechnique={handleSelectTechnique}
          onShowInfo={handleShowInfo}
        />
      )}
      
      {currentView === 'technique' && renderTechnique()}
      
      {infoTechnique && (
        <MethodInfoModal 
          technique={infoTechnique} 
          onClose={() => setInfoTechnique(null)}
          onStart={handleStartFromInfo}
        />
      )}
    </>
  );
};

export default MindSparkApp;
