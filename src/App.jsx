import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { 
  Target, Thermometer, Users, Home, Triangle, Sparkles, LogOut, BookOpen, 
  ChevronRight, X, Info, ArrowLeft
} from 'lucide-react';

// Import jednotlivých technik
import WheelOfLife from './techniques/WheelOfLife';
import EnergetickyKotel from './techniques/EnergetickyKotel';
import DisneyModel from './techniques/DisneyModel';
import ThreeAdvisors from './techniques/ThreeAdvisors';
import LogickeUrovne from './techniques/LogickeUrovne';

// ============================================
// GLOBÁLNÍ STYLY
// ============================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
    
    * {
      font-family: 'Montserrat', sans-serif;
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
    .animate-slideUp { animation: slideUp 0.4s ease-out; }
    .animate-slideDown { animation: slideDown 0.3s ease-out; }
    
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #a69d90; }
    
    @media print {
      .no-print { display: none !important; }
      .print-only { display: block !important; }
    }
  `}</style>
);

// ============================================
// DATA TECHNIK
// ============================================
const TECHNIQUES = [
  {
    id: 'wheel',
    name: 'Kolo Rovnováhy',
    subtitle: 'Wheel of Life',
    description: 'Vizuální koučovací technika pro zmapování spokojenosti v klíčových životních oblastech.',
    icon: Target,
    color: '#ff8474',
    theory: {
      origin: 'Kolo rovnováhy (Wheel of Life) je jednou z nejpoužívanějších koučovacích technik na světě. Jeho původ sahá do 60. let 20. století a je spojován s Paulem J. Meyerem, zakladatelem Success Motivation Institute.',
      definition: 'Jde o koučovací techniku, která poskytuje "helikoptérový pohled" na život koučovaného. Kruhový diagram rozdělený do segmentů reprezentuje klíčové životní oblasti, které koučovaný hodnotí na škále 1-10.',
      keyPoints: [
        'Umožňuje rychle identifikovat oblasti vyžadující pozornost',
        'Vizualizuje nerovnováhu mezi různými aspekty života',
        'Pomáhá stanovit priority pro osobní rozvoj',
        'Slouží jako baseline pro měření pokroku v čase'
      ],
      whenToUse: [
        'Na začátku koučovacího vztahu pro celkové zmapování',
        'Při pocitu "zaseknutí" nebo nejasnosti priorit',
        'Pro pravidelnou revizi životní spokojenosti',
        'Když koučovaný potřebuje získat nadhled'
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
      origin: 'Metafora energetického kotle vychází z principů energetického managementu a je inspirována prací Jima Loehr a Tonyho Schwartze (The Power of Full Engagement). Vizualizace energie jako tekutiny v nádobě pomáhá koučovaným lépe pochopit dynamiku jejich vitality.',
      definition: 'Energetický kotel je koučovací technika využívající vizuální metaforu nádoby s tekutinou. Nahoře přitékají zdroje energie (přítoky), dole jsou díry, kterými energie uniká (odtoky). Cílem je najít rovnováhu a optimalizovat energetický management.',
      keyPoints: [
        'Mapuje konkrétní zdroje energie (co člověka nabíjí)',
        'Identifikuje úniky energie (co člověka vyčerpává)',
        'Pracuje se 4 úrovněmi: minimum, aktuální stav, cíl, maximum',
        'Vede k praktickým strategiím pro zvýšení vitality'
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
      origin: 'Disney Strategy byla vyvinuta Robertem Diltsem na základě studia kreativního procesu Walta Disneyho. Dilts analyzoval, jak Disney dokázal přeměnit fantastické vize v realitu, a identifikoval tři odlišné myšlenkové pozice.',
      definition: 'Technika odděluje tři způsoby myšlení do samostatných fází: Snílek (neomezená kreativita), Realizátor (praktické plánování) a Kritik (konstruktivní hodnocení). Oddělením těchto rolí se předchází vzájemnému blokování.',
      keyPoints: [
        'Snílek: Vize bez omezení, "co kdyby všechno bylo možné"',
        'Realizátor: Jak konkrétně to udělat, jaké kroky podniknout',
        'Kritik: Co by mohlo selhat, jak plán vylepšit',
        'Každá pozice má vlastní fyziologii, tón hlasu i perspektivu'
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
    description: 'Získejte moudrost od tří fiktivních postav pro řešení složitých situací.',
    icon: Users,
    color: '#a69d90',
    theory: {
      origin: 'Technika Tří rádců čerpá z jungiánské psychologie a konceptu archetypů. Využívá principu externalizace vnitřní moudrosti prostřednictvím imaginárních postav, což umožňuje přístup k nevědomým zdrojům řešení.',
      definition: 'Koučovaný si zvolí tři postavy (reálné, fiktivní nebo archetypální), které reprezentují různé perspektivy moudrosti. V imaginárním prostoru se s nimi setkává a konzultuje svou situaci, čímž získává nové úhly pohledu.',
      keyPoints: [
        'Využívá sílu imaginace pro přístup k vnitřní moudrosti',
        'Tři různé postavy zajišťují diverzitu perspektiv',
        'Bezpečný prostor pro exploraci možností',
        'Integrace rad vede k vlastnímu řešení koučovaného'
      ],
      whenToUse: [
        'Při složitých životních rozhodnutích',
        'Když koučovaný potřebuje novou perspektivu',
        'Pro práci s vnitřními konflikty',
        'Při hledání inspirace a vedení'
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
      origin: 'Kalifornský psycholog Robert Dilts vytvořil z práce Gregoryho Batesona jednoduchý a elegantní model pro přemýšlení o osobní změně, učení a komunikaci. Model spojuje myšlenky kontextu, úrovně učení a učební pozice.',
      definition: 'Logické úrovně jsou hierarchickým modelem: Prostředí, Chování, Schopnosti, Hodnoty a Identita. Každá úroveň organizuje a řídí informace na úrovni pod ní.',
      keyPoints: [
        'Změna na vyšší úrovni automaticky způsobuje změnu na nižších úrovních',
        'Logické úrovně oddělují chování a osobu',
        'Pomáhají identifikovat nejvhodnější body pro intervenci',
        'Umožňují sladění napříč všemi úrovněmi vědomí'
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
// KARTA TECHNIKY
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
          
          <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
        </div>
      </header>
      
      <div className="bg-gradient-to-b from-white to-[#FAF6F2] py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4">
            Vyberte techniku pro dnešní sezení
          </h2>
          <p className="text-[#78716C] max-w-xl mx-auto">
            5 profesionálních koučovacích technik připravených k okamžitému použití. 
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
              className="animate-slideUp"
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
// HLAVNÍ APP
// ============================================
const App = () => {
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

  const renderTechnique = () => {
    if (!selectedTechnique) return null;
    
    const props = { onBack: handleBack };
    
    switch (selectedTechnique.id) {
      case 'wheel':
        return <WheelOfLife {...props} />;
      case 'boiler':
        return <EnergetickyKotel {...props} />;
      case 'disney':
        return <DisneyModel {...props} />;
      case 'advisors':
        return <ThreeAdvisors {...props} />;
      case 'levels':
        return <LogickeUrovne {...props} />;
      default:
        return null;
    }
  };

  return (
    <>
      <GlobalStyles />
      
      {/* Přihlašovací obrazovka pro nepřihlášené */}
      <SignedOut>
        <div className="min-h-screen bg-[#FAF6F2] flex flex-col items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#ff8474] flex items-center justify-center mx-auto mb-6">
              <Sparkles size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Mind Spark</h1>
            <p className="text-[#a69d90] mb-8">Profesionální koučovací nástroje</p>
            <SignInButton mode="modal">
              <button className="w-full bg-[#ff8474] text-white font-bold py-4 px-8 rounded-xl hover:bg-[#e06b5c] transition-colors text-lg">
                Přihlásit se
              </button>
            </SignInButton>
            <p className="mt-6 text-sm text-[#a69d90]">
              Nemáte účet? Registrace je součástí přihlášení.
            </p>
          </div>
        </div>
      </SignedOut>

      {/* Aplikace pro přihlášené */}
      <SignedIn>
        {currentView === 'dashboard' && (
          <Dashboard 
            onSelectTechnique={handleSelectTechnique}
            onShowInfo={(t) => setInfoTechnique(t)}
          />
        )}
        
        {currentView === 'technique' && renderTechnique()}
        
        {infoTechnique && (
          <MethodInfoModal 
            technique={infoTechnique} 
            onClose={() => setInfoTechnique(null)}
            onStart={() => { 
              handleSelectTechnique(infoTechnique); 
              setInfoTechnique(null); 
            }}
          />
        )}
      </SignedIn>
    </>
  );
};

export default App;
