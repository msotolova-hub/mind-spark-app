import React, { useState } from 'react';
import { SignInButton, UserButton, useUser, useAuth } from '@clerk/clerk-react';
import { 
  Target, Thermometer, Users, Home, Triangle, Sparkles, LogOut, BookOpen, 
  ChevronRight, X, Info, ArrowLeft, Star, Check, CreditCard
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
// STRIPE ODKAZY
// ============================================
// ============================================
// DASHBOARD
// ============================================
const Dashboard = ({ onSelectTechnique, onShowInfo, onShowTerms, onShowPrivacy, onShowPricing, isSubscribed }) => {
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
          
          <div className="flex items-center gap-4">
            {isSubscribed ? (
              <button
                onClick={onShowPricing}
                className="flex items-center gap-2 bg-green-100 text-green-700 font-medium py-2 px-4 rounded-lg hover:bg-green-200 transition-colors text-sm"
              >
                <Check size={16} />
                <span className="hidden sm:inline">Předplatné</span>
              </button>
            ) : (
              <button
                onClick={onShowPricing}
                className="flex items-center gap-2 bg-[#ff8474] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#e06b5c] transition-colors text-sm"
              >
                <CreditCard size={16} />
                <span className="hidden sm:inline">Předplatné</span>
              </button>
            )}
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          </div>
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
            <a href="#" onClick={(e) => { e.preventDefault(); onShowTerms && onShowTerms(); }} className="text-[#a69d90] hover:text-[#ff8474] transition-colors">Podmínky</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onShowPrivacy && onShowPrivacy(); }} className="text-[#a69d90] hover:text-[#ff8474] transition-colors">Ochrana údajů</a>
          </div>
        </div>
      </footer>
      
    </div>
  );
};

// ============================================
// STRÁNKA S CENAMI
// ============================================

const PricingPage = ({ onBack, showBackButton = true, onShowTerms, onShowPrivacy, isSubscribed, currentPlan }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(null); // 'monthly' nebo 'yearly' nebo null

  // Získáme aktuální plán z props nebo z user metadata
  const activePlan = currentPlan || user?.publicMetadata?.subscription?.plan || null;
  const subscriptionId = user?.publicMetadata?.subscription?.subscriptionId || null;
  const subscriptionStatus = user?.publicMetadata?.subscription?.status || null;
  const cancelAt = user?.publicMetadata?.subscription?.cancelAt || null;

  const handleCheckout = async (plan) => {
    if (!user) {
      alert('Musíte být přihlášeni');
      return;
    }

    setLoading(plan);

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          plan: plan, // 'monthly' nebo 'yearly'
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Chyba při vytváření platby: ' + (data.error || 'Neznámá chyba'));
        setLoading(null);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Chyba při vytváření platby');
      setLoading(null);
    }
  };

  const handleCancel = async () => {
    if (!user || !subscriptionId) {
      alert('Nelze zrušit předplatné');
      return;
    }

    const confirmed = window.confirm(
      'Opravdu chcete zrušit předplatné? Přístup k aplikaci budete mít do konce aktuálního zaplaceného období.'
    );

    if (!confirmed) return;

    setLoading('cancel');

    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          subscriptionId: subscriptionId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Předplatné bylo zrušeno. Přístup máte do ' + new Date(data.cancelAt).toLocaleDateString('cs-CZ'));
        window.location.reload();
      } else {
        alert('Chyba při rušení předplatného: ' + (data.error || 'Neznámá chyba'));
        setLoading(null);
      }
    } catch (error) {
      console.error('Cancel error:', error);
      alert('Chyba při rušení předplatného');
      setLoading(null);
    }
  };

  const handleChangePlan = async (newPlan) => {
    if (!user || !subscriptionId) {
      alert('Nelze změnit plán');
      return;
    }

    const planName = newPlan === 'yearly' ? 'roční' : 'měsíční';
    const confirmed = window.confirm(
      `Opravdu chcete přejít na ${planName} předplatné? Rozdíl v ceně bude automaticky přepočítán.`
    );

    if (!confirmed) return;

    setLoading(newPlan);

    try {
      const response = await fetch('/api/change-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          subscriptionId: subscriptionId,
          newPlan: newPlan,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Plán byl změněn na ${planName}.`);
        window.location.reload();
      } else {
        alert('Chyba při změně plánu: ' + (data.error || 'Neznámá chyba'));
        setLoading(null);
      }
    } catch (error) {
      console.error('Change plan error:', error);
      alert('Chyba při změně plánu');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F2]">
      <header className="bg-white border-b border-[#e5ddd2] sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          {showBackButton ? (
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-[#a69d90] hover:text-[#ff8474] transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Zpět na dashboard</span>
            </button>
          ) : (
            <div></div>
          )}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#ff8474] flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-sm font-bold text-[#2C2C2C]">Mind Spark</span>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        {isSubscribed && (
          <div className={`${subscriptionStatus === 'canceling' ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'} border rounded-2xl p-6 mb-8 max-w-3xl mx-auto`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${subscriptionStatus === 'canceling' ? 'bg-yellow-100' : 'bg-green-100'} flex items-center justify-center`}>
                  <Check size={20} className={subscriptionStatus === 'canceling' ? 'text-yellow-600' : 'text-green-600'} />
                </div>
                <div>
                  <h3 className={`font-bold ${subscriptionStatus === 'canceling' ? 'text-yellow-800' : 'text-green-800'}`}>
                    {subscriptionStatus === 'canceling' 
                      ? `Předplatné bude zrušeno ${cancelAt ? new Date(cancelAt).toLocaleDateString('cs-CZ') : ''}`
                      : `Máte aktivní ${activePlan === 'yearly' ? 'roční' : 'měsíční'} předplatné`
                    }
                  </h3>
                  {subscriptionStatus === 'canceling' && (
                    <p className="text-sm text-yellow-700 mt-1">Do té doby máte plný přístup k aplikaci.</p>
                  )}
                </div>
              </div>
              {subscriptionStatus === 'active' && (
                <button
                  onClick={handleCancel}
                  disabled={loading === 'cancel'}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50"
                >
                  {loading === 'cancel' ? 'Ruším...' : 'Zrušit předplatné'}
                </button>
              )}
            </div>
          </div>
        )}
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4">
            {isSubscribed ? 'Váš aktuální plán' : 'Vyberte si svůj plán'}
          </h1>
          <p className="text-[#78716C] max-w-xl mx-auto">
            {isSubscribed 
              ? 'Děkujeme za vaši podporu! Máte přístup ke všem funkcím.'
              : 'Získejte přístup ke všem koučovacím technikám a profesionálním nástrojům'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Měsíční plán */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#e5ddd2] p-8 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">Měsíční</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#2C2C2C]">250 Kč</span>
                <span className="text-[#a69d90]"> / měsíc</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-[#4a4a4a]">
                <Check size={18} className="text-green-500 flex-shrink-0" />
                <span>Všech 5 koučovacích technik</span>
              </li>
              <li className="flex items-center gap-3 text-[#4a4a4a]">
                <Check size={18} className="text-green-500 flex-shrink-0" />
                <span>Export do PDF</span>
              </li>
              <li className="flex items-center gap-3 text-[#4a4a4a]">
                <Check size={18} className="text-green-500 flex-shrink-0" />
                <span>Pracovní listy a průvodce</span>
              </li>
              <li className="flex items-center gap-3 text-[#4a4a4a]">
                <Check size={18} className="text-green-500 flex-shrink-0" />
                <span>Zrušení kdykoliv</span>
              </li>
            </ul>
            
            {isSubscribed && activePlan === 'monthly' ? (
              <div className="block w-full bg-gray-100 text-gray-500 font-bold py-3 px-6 rounded-xl text-center">
                Aktuální plán
              </div>
            ) : isSubscribed && activePlan === 'yearly' && subscriptionStatus === 'active' ? (
              <button 
                onClick={() => handleChangePlan('monthly')}
                disabled={loading !== null}
                className="block w-full bg-white border-2 border-gray-300 text-gray-500 font-medium py-3 px-6 rounded-xl hover:border-[#ff8474] hover:text-[#ff8474] transition-colors text-center disabled:opacity-50"
              >
                {loading === 'monthly' ? 'Načítání...' : 'Přejít na měsíční'}
              </button>
            ) : isSubscribed && activePlan === 'yearly' && subscriptionStatus === 'canceling' ? (
              <div className="block w-full bg-gray-100 text-gray-400 font-medium py-3 px-6 rounded-xl text-center text-sm">
                Předplatné se ruší
              </div>
            ) : (
              <button 
                onClick={() => handleCheckout('monthly')}
                disabled={loading !== null}
                className="block w-full bg-white border-2 border-[#ff8474] text-[#ff8474] font-bold py-3 px-6 rounded-xl hover:bg-[#fff5f3] transition-colors text-center disabled:opacity-50"
              >
                {loading === 'monthly' ? 'Načítání...' : 'Vybrat měsíční'}
              </button>
            )}
          </div>

          {/* Roční plán */}
          <div className="bg-white rounded-2xl shadow-sm border-2 border-[#ff8474] p-8 relative hover:shadow-lg transition-shadow">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff8474] text-white text-xs font-bold px-4 py-1 rounded-full">
              UŠETŘÍTE 17 %
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">Roční</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-[#2C2C2C]">2 490 Kč</span>
                <span className="text-[#a69d90]"> / rok</span>
              </div>
              <p className="text-sm text-[#a69d90] mb-4">= 207 Kč měsíčně</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-[#4a4a4a]">
                <Check size={18} className="text-green-500 flex-shrink-0" />
                <span>Všech 5 koučovacích technik</span>
              </li>
              <li className="flex items-center gap-3 text-[#4a4a4a]">
                <Check size={18} className="text-green-500 flex-shrink-0" />
                <span>Export do PDF</span>
              </li>
              <li className="flex items-center gap-3 text-[#4a4a4a]">
                <Check size={18} className="text-green-500 flex-shrink-0" />
                <span>Pracovní listy a průvodce</span>
              </li>
              <li className="flex items-center gap-3 text-[#4a4a4a]">
                <Check size={18} className="text-green-500 flex-shrink-0" />
                <span>Prioritní podpora</span>
              </li>
            </ul>
            
            {isSubscribed && activePlan === 'yearly' ? (
              <div className="block w-full bg-gray-100 text-gray-500 font-bold py-3 px-6 rounded-xl text-center">
                Aktuální plán
              </div>
            ) : isSubscribed && activePlan === 'monthly' && subscriptionStatus === 'active' ? (
              <button 
                onClick={() => handleChangePlan('yearly')}
                disabled={loading !== null}
                className="block w-full bg-[#ff8474] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#e06b5c] transition-colors text-center disabled:opacity-50"
              >
                {loading === 'yearly' ? 'Načítání...' : 'Přejít na roční'}
              </button>
            ) : isSubscribed && activePlan === 'monthly' && subscriptionStatus === 'canceling' ? (
              <div className="block w-full bg-gray-100 text-gray-400 font-medium py-3 px-6 rounded-xl text-center text-sm">
                Předplatné se ruší
              </div>
            ) : (
              <button 
                onClick={() => handleCheckout('yearly')}
                disabled={loading !== null}
                className="block w-full bg-[#ff8474] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#e06b5c] transition-colors text-center disabled:opacity-50"
              >
                {loading === 'yearly' ? 'Načítání...' : 'Vybrat roční'}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-[#a69d90] mt-8">
          Bezpečná platba přes Stripe · Zrušení kdykoliv · 14denní garance vrácení peněz
        </p>
        
        {(onShowTerms || onShowPrivacy) && (
          <div className="text-center mt-6 flex justify-center gap-4 text-xs text-[#a69d90]">
            {onShowTerms && (
              <a href="#" onClick={(e) => { e.preventDefault(); onShowTerms(); }} className="hover:text-[#ff8474] transition-colors">Obchodní podmínky</a>
            )}
            {onShowTerms && onShowPrivacy && <span>·</span>}
            {onShowPrivacy && (
              <a href="#" onClick={(e) => { e.preventDefault(); onShowPrivacy(); }} className="hover:text-[#ff8474] transition-colors">Ochrana údajů</a>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

// ============================================
// PRÁVNÍ STRÁNKY
// ============================================
const LegalPage = ({ type, onBack }) => {
  const isTerms = type === 'terms';
  
  return (
    <div className="min-h-screen bg-[#FAF6F2]">
      <header className="bg-white border-b border-[#e5ddd2] sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#a69d90] hover:text-[#ff8474] transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Zpět na dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#ff8474] flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-sm font-bold text-[#2C2C2C]">Mind Spark</span>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-[#e5ddd2] p-8 md:p-12">
          {isTerms ? <TermsContent /> : <PrivacyContent />}
        </div>
      </main>
    </div>
  );
};

const SectionTitle = ({ children }) => (
  <h2 className="text-xl font-bold text-[#2C2C2C] mt-8 mb-4">{children}</h2>
);

const P = ({ children }) => (
  <p className="text-[#4a4a4a] leading-relaxed mb-3">{children}</p>
);

const BulletItem = ({ children }) => (
  <li className="text-[#4a4a4a] leading-relaxed mb-2 ml-6 list-disc">{children}</li>
);

const TermsContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2 text-center">Obchodní podmínky</h1>
    <p className="text-center text-[#a69d90] mb-10">Platné od 1. 2. 2026</p>

    <SectionTitle>I. Úvodní ustanovení</SectionTitle>
    <P>1.1 Tyto obchodní podmínky (dále jen <strong>"Podmínky"</strong>) upravují práva a povinnosti mezi provozovatelem a uživatelem webové aplikace Mind Spark (dále jen <strong>"Aplikace"</strong>).</P>
    <P>1.2 <strong>Provozovatelem</strong> Aplikace je Michaela Šotolová, IČO: 24411604, se sídlem v České republice, kontaktní e-mail: info@sotolovamichaela.com (dále jen <strong>"Provozovatel"</strong>).</P>
    <P>1.3 <strong>Uživatelem</strong> je fyzická nebo právnická osoba, která se zaregistruje a využívá Aplikaci pro účely profesionálního koučování (dále jen <strong>"Uživatel"</strong>).</P>
    <P>1.4 Aplikace je určena výhradně pro profesionální kouče a osoby působící v oblasti koučování, mentoringu a osobního rozvoje.</P>

    <SectionTitle>II. Popis služby</SectionTitle>
    <P>2.1 Aplikace Mind Spark poskytuje digitální koučovací nástroje, které zahrnují zejména:</P>
    <ul className="mb-4">
      <BulletItem>interaktivní koučovací techniky (Kolo Rovnováhy, Energetický Kotel, Disney Model, 3 Rádcové, Logické úrovně a další)</BulletItem>
      <BulletItem>pracovní listy a průvodce jednotlivými technikami</BulletItem>
      <BulletItem>možnost exportu výstupů do PDF</BulletItem>
      <BulletItem>další funkce dle aktuální nabídky</BulletItem>
    </ul>
    <P>2.2 Provozovatel si vyhrazuje právo rozšiřovat, upravovat nebo omezovat rozsah funkcí Aplikace.</P>

    <SectionTitle>III. Registrace a uživatelský účet</SectionTitle>
    <P>3.1 Pro využívání Aplikace je nutná registrace prostřednictvím e-mailové adresy nebo účtu Google.</P>
    <P>3.2 Uživatel je povinen uvést pravdivé a aktuální údaje při registraci.</P>
    <P>3.3 Uživatel je odpovědný za zabezpečení svého účtu a nesmí své přihlašovací údaje sdílet s třetími osobami.</P>
    <P>3.4 Provozovatel má právo zablokovat nebo zrušit účet Uživatele v případě porušení těchto Podmínek.</P>

    <SectionTitle>IV. Předplatné a platební podmínky</SectionTitle>
    <P>4.1 Aplikace je poskytována na základě placeného předplatného. Uživatel si může zvolit:</P>
    <ul className="mb-4">
      <BulletItem><strong>Měsíční předplatné</strong> - automaticky se obnovuje každý měsíc</BulletItem>
      <BulletItem><strong>Roční předplatné</strong> - automaticky se obnovuje každý rok</BulletItem>
    </ul>
    <P>4.2 Aktuální ceny předplatného jsou uvedeny na webových stránkách Aplikace. Provozovatel si vyhrazuje právo ceny měnit, o čemž bude Uživatel informován nejméně 30 dní předem.</P>
    <P>4.3 Platba je realizována prostřednictvím platební brány Stripe. Provozovatel nemá přístup k platebním údajům Uživatele (číslo karty apod.).</P>
    <P>4.4 Provozovatel může nabízet slevové kódy poskytující zvýhodněné ceny předplatného. Slevové kódy nelze vzájemně kombinovat, pokud není uvedeno jinak, a mají omezenou platnost.</P>
    <P>4.5 Předplatné se automaticky obnovuje na konci každého platebního období, pokud jej Uživatel nezruší nejpozději 24 hodin před koncem aktuálního období.</P>

    <SectionTitle>V. Zrušení předplatného a vrácení platby</SectionTitle>
    <P>5.1 Uživatel může předplatné zrušit kdykoliv prostřednictvím svého účtu v Aplikaci. Zrušení nabude účinnosti na konci aktuálního platebního období.</P>
    <P>5.2 Po zrušení předplatného má Uživatel přístup k Aplikaci do konce zaplaceného období.</P>
    <P>5.3 Uživatel, který je spotřebitelem ve smyslu zákona č. 89/2012 Sb., občanského zákoníku, má právo odstoupit od smlouvy do 14 dnů od uzavření smlouvy bez udání důvodu. V takovém případě bude Uživateli vrácena platba v plné výši.</P>

    <SectionTitle>VI. Práva a povinnosti Uživatele</SectionTitle>
    <P>6.1 Uživatel má právo využívat Aplikaci v rozsahu zvoleného předplatného.</P>
    <P>6.2 Uživatel se zavazuje:</P>
    <ul className="mb-4">
      <BulletItem>používat Aplikaci v souladu s těmito Podmínkami a platnými právními předpisy</BulletItem>
      <BulletItem>nesdílet svůj účet ani přihlašovací údaje s třetími osobami</BulletItem>
      <BulletItem>nekopírovat, nerozmnožovat ani jinak nešířit obsah Aplikace bez souhlasu Provozovatele</BulletItem>
      <BulletItem>nepokoušet se o neoprávněný přístup k systémům Aplikace</BulletItem>
    </ul>

    <SectionTitle>VII. Práva a povinnosti Provozovatele</SectionTitle>
    <P>7.1 Provozovatel se zavazuje zajistit dostupnost Aplikace v rozsahu technických možností. Provozovatel neodpovídá za krátkodobé výpadky způsobené údržbou nebo technickými problémy třetích stran.</P>
    <P>7.2 Provozovatel má právo provádět plánované i neplánované odstávky za účelem údržby a aktualizace Aplikace.</P>

    <SectionTitle>VIII. Duševní vlastnictví</SectionTitle>
    <P>8.1 Veškerý obsah Aplikace, včetně koučovacích technik, textů, grafiky, designu a softwaru, je chráněn autorským právem a je majetkem Provozovatele.</P>
    <P>8.2 Předplatné opravňuje Uživatele k osobnímu využití Aplikace v rámci své koučovací praxe. Nezakládá licenci k dalšímu šíření nebo komerčnímu využití obsahu Aplikace.</P>

    <SectionTitle>IX. Omezení odpovědnosti</SectionTitle>
    <P>9.1 Aplikace slouží jako podpůrný nástroj pro koučovací praxi. Provozovatel neodpovídá za výsledky koučovacích sezení ani za rozhodnutí učiněná na základě výstupů z Aplikace.</P>
    <P>9.2 Provozovatel nenese odpovědnost za ztrátu dat způsobenou technickými problémy nebo zásahy třetích stran.</P>
    <P>9.3 Maximální odpovědnost Provozovatele je omezena na výši částky zaplacené Uživatelem za předplatné v posledních 12 měsících.</P>

    <SectionTitle>X. Reklamace</SectionTitle>
    <P>10.1 Uživatel má právo reklamovat vady Aplikace písemně na e-mail info@sotolovamichaela.com.</P>
    <P>10.2 Provozovatel vyřídí reklamaci bez zbytečného odkladu, nejpozději do 30 dnů od jejího obdržení.</P>

    <SectionTitle>XI. Závěrečná ustanovení</SectionTitle>
    <P>11.1 Tyto Podmínky se řídí právním řádem České republiky, zejména zákonem č. 89/2012 Sb., občanským zákoníkem.</P>
    <P>11.2 Provozovatel si vyhrazuje právo tyto Podmínky jednostranně měnit. O změnách bude Uživatel informován prostřednictvím e-mailu nebo oznámením v Aplikaci nejméně 14 dní před nabytím účinnosti.</P>
    <P>11.3 V případě sporů je k rozhodování příslušný obecný soud České republiky.</P>
    <P>11.4 Pokud je Uživatel spotřebitelem, má právo na mimosoudní řešení spotřebitelských sporů prostřednictvím České obchodní inspekce (www.coi.cz).</P>
    <P>11.5 Tyto Podmínky nabývají účinnosti dnem 1. 2. 2026.</P>
  </div>
);

const PrivacyContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2 text-center">Zásady ochrany osobních údajů</h1>
    <p className="text-center text-[#a69d90] mb-10">Platné od 1. 2. 2026</p>

    <SectionTitle>I. Správce osobních údajů</SectionTitle>
    <P>Správcem osobních údajů je Michaela Šotolová, IČO: 24411604, kontaktní e-mail: info@sotolovamichaela.com (dále jen "Správce").</P>
    <P>Správce zpracovává osobní údaje v souladu s Nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR) a zákonem č. 110/2019 Sb., o zpracování osobních údajů.</P>

    <SectionTitle>II. Jaké osobní údaje zpracováváme</SectionTitle>
    <P><strong>A) Údaje poskytnuté při registraci:</strong></P>
    <ul className="mb-4">
      <BulletItem>jméno a příjmení</BulletItem>
      <BulletItem>e-mailová adresa</BulletItem>
      <BulletItem>profilový obrázek (při přihlášení přes Google)</BulletItem>
    </ul>
    <P><strong>B) Údaje zpracovávané při platbě:</strong></P>
    <ul className="mb-4">
      <BulletItem>fakturační údaje</BulletItem>
      <BulletItem>historie plateb a předplatného</BulletItem>
      <BulletItem>platební údaje (zpracovává výhradně platební brána Stripe; Správce k nim nemá přístup)</BulletItem>
    </ul>
    <P><strong>C) Technické údaje:</strong></P>
    <ul className="mb-4">
      <BulletItem>IP adresa</BulletItem>
      <BulletItem>typ prohlížeče a operačního systému</BulletItem>
      <BulletItem>datum a čas přístupu</BulletItem>
    </ul>

    <SectionTitle>III. Účel zpracování</SectionTitle>
    <P>Osobní údaje zpracováváme za těmito účely:</P>
    <ul className="mb-4">
      <BulletItem><strong>Poskytování služby</strong> - registrace, přihlášení, správa účtu a zpřístupnění funkcí Aplikace</BulletItem>
      <BulletItem><strong>Správa předplatného</strong> - zpracování plateb, fakturace, uplatnění slevových kódů</BulletItem>
      <BulletItem><strong>Komunikace</strong> - zasílání informací o změnách služby, technických oznámení a odpovědí na dotazy</BulletItem>
      <BulletItem><strong>Zlepšování služby</strong> - analýza využívání Aplikace za účelem jejího vylepšování</BulletItem>
      <BulletItem><strong>Plnění právních povinností</strong> - vedení účetnictví, daňové povinnosti</BulletItem>
    </ul>

    <SectionTitle>IV. Právní základ zpracování</SectionTitle>
    <ul className="mb-4">
      <BulletItem><strong>Plnění smlouvy</strong> (čl. 6 odst. 1 písm. b) GDPR) - zpracování nezbytné pro poskytování služby</BulletItem>
      <BulletItem><strong>Oprávněný zájem</strong> (čl. 6 odst. 1 písm. f) GDPR) - zlepšování služby, prevence zneužití</BulletItem>
      <BulletItem><strong>Plnění právní povinnosti</strong> (čl. 6 odst. 1 písm. c) GDPR) - účetní a daňové povinnosti</BulletItem>
    </ul>

    <SectionTitle>V. Sdílení údajů s třetími stranami</SectionTitle>
    <P>Pro zajištění funkčnosti Aplikace využíváme následující zpracovatele:</P>
    <ul className="mb-4">
      <BulletItem><strong>Clerk</strong> (Clerk, Inc., USA) - autentizace a správa uživatelských účtů</BulletItem>
      <BulletItem><strong>Stripe</strong> (Stripe, Inc., USA) - zpracování plateb</BulletItem>
      <BulletItem><strong>Vercel</strong> (Vercel, Inc., USA) - hosting Aplikace</BulletItem>
    </ul>
    <P>Tito zpracovatelé jsou vázáni smluvními podmínkami zajišťujícími ochranu osobních údajů v souladu s GDPR. Přenos údajů do USA je zajištěn na základě standardních smluvních doložek (SCC) a/nebo rozhodnutí Evropské komise o přiměřenosti (EU-US Data Privacy Framework).</P>

    <SectionTitle>VI. Soubory cookies</SectionTitle>
    <P>Aplikace používá pouze nezbytné technické cookies pro zajištění přihlášení a funkčnosti. Tyto cookies jsou nezbytné pro provoz Aplikace a nelze je odmítnout.</P>
    <P>Aplikace nepoužívá marketingové ani analytické cookies třetích stran.</P>

    <SectionTitle>VII. Doba uchování údajů</SectionTitle>
    <ul className="mb-4">
      <BulletItem><strong>Údaje o účtu:</strong> po dobu trvání účtu a 30 dnů po jeho zrušení</BulletItem>
      <BulletItem><strong>Fakturační údaje:</strong> po dobu stanovenou daňovými a účetními předpisy (až 10 let)</BulletItem>
      <BulletItem><strong>Technické údaje:</strong> maximálně 90 dnů</BulletItem>
    </ul>

    <SectionTitle>VIII. Vaše práva</SectionTitle>
    <P>Jako subjekt údajů máte následující práva:</P>
    <ul className="mb-4">
      <BulletItem><strong>Právo na přístup</strong> - získat informace o tom, jaké údaje o vás zpracováváme</BulletItem>
      <BulletItem><strong>Právo na opravu</strong> - požadovat opravu nepřesných údajů</BulletItem>
      <BulletItem><strong>Právo na výmaz</strong> - požadovat smazání svých údajů ("právo být zapomenut")</BulletItem>
      <BulletItem><strong>Právo na omezení zpracování</strong> - požadovat omezení zpracování za určitých podmínek</BulletItem>
      <BulletItem><strong>Právo na přenositelnost</strong> - získat své údaje ve strukturovaném formátu</BulletItem>
      <BulletItem><strong>Právo vznést námitku</strong> - proti zpracování založenému na oprávněném zájmu</BulletItem>
      <BulletItem><strong>Právo podat stížnost</strong> - u Úřadu pro ochranu osobních údajů (www.uoou.cz)</BulletItem>
    </ul>
    <P>Pro uplatnění svých práv nás kontaktujte na e-mailu info@sotolovamichaela.com. Na vaši žádost odpovíme bez zbytečného odkladu, nejpozději do 30 dnů.</P>

    <SectionTitle>IX. Zabezpečení údajů</SectionTitle>
    <P>Správce přijal vhodná technická a organizační opatření k ochraně osobních údajů, včetně šifrování přenosu dat (SSL/TLS), zabezpečeného uložení dat u zpracovatelů a pravidelného přezkoumávání bezpečnostních opatření.</P>

    <SectionTitle>X. Změny zásad ochrany osobních údajů</SectionTitle>
    <P>Správce si vyhrazuje právo tyto zásady aktualizovat. O podstatných změnách bude Uživatel informován prostřednictvím e-mailu nebo oznámením v Aplikaci.</P>
    <P>Tyto zásady nabývají účinnosti dnem 1. 2. 2026.</P>

    <SectionTitle>Kontakt</SectionTitle>
    <P><strong>Michaela Šotolová</strong></P>
    <P>IČO: 24411604</P>
    <P>E-mail: info@sotolovamichaela.com</P>
  </div>
);

// ============================================
// PROTECTED CONTENT - kontrola předplatného
// ============================================
const ProtectedContent = ({ children, onShowTerms, onShowPrivacy }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  
  // Clerk se načítá
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#FAF6F2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-[#ff8474] flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles size={24} className="text-white" />
          </div>
          <p className="text-[#a69d90]">Načítání...</p>
        </div>
      </div>
    );
  }
  
  // Není přihlášen (nemělo by nastat díky SignedIn wrapperu, ale pro jistotu)
  if (!isSignedIn) {
    return null;
  }
  
  // Kontrola předplatného
  const subscriptionStatus = user?.publicMetadata?.subscription?.status;
  const hasSubscription = subscriptionStatus === 'active' || subscriptionStatus === 'canceling';
  
  if (hasSubscription) {
    return children;
  }
  
  // Nemá předplatné - ukázat ceník
  return (
    <PricingPage 
      onBack={() => {}} 
      showBackButton={false}
      onShowTerms={onShowTerms}
      onShowPrivacy={onShowPrivacy}
      isSubscribed={false}
    />
  );
};

// ============================================
// HLAVNÍ APP
// ============================================
const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [infoTechnique, setInfoTechnique] = useState(null);
  const [legalPage, setLegalPage] = useState(null);
  const [showPricing, setShowPricing] = useState(false);

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

  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  // Clerk se ještě nenačetl
  if (!isLoaded) {
    return (
      <>
        <GlobalStyles />
        <div className="min-h-screen bg-[#FAF6F2] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-[#ff8474] flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Sparkles size={24} className="text-white" />
            </div>
            <p className="text-[#a69d90]">Načítání...</p>
          </div>
        </div>
      </>
    );
  }

  // NEPŘIHLÁŠENÝ - zobrazit login
  if (!isSignedIn) {
    return (
      <>
        <GlobalStyles />
        {legalPage ? (
          <LegalPage type={legalPage} onBack={() => setLegalPage(null)} />
        ) : (
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
              <div className="mt-6 flex justify-center gap-4 text-xs text-[#a69d90]">
                <a href="#" onClick={(e) => { e.preventDefault(); setLegalPage('terms'); }} className="hover:text-[#ff8474] transition-colors">Podmínky</a>
                <span>·</span>
                <a href="#" onClick={(e) => { e.preventDefault(); setLegalPage('privacy'); }} className="hover:text-[#ff8474] transition-colors">Ochrana údajů</a>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // PŘIHLÁŠENÝ - zkontrolovat předplatné
  const subscriptionStatus = user?.publicMetadata?.subscription?.status;
  const hasSubscription = subscriptionStatus === 'active' || subscriptionStatus === 'canceling';

  // Legal pages
  if (legalPage) {
    return (
      <>
        <GlobalStyles />
        <LegalPage type={legalPage} onBack={() => setLegalPage(null)} />
      </>
    );
  }

  // Nemá předplatné - zobrazit ceník
  if (!hasSubscription) {
    return (
      <>
        <GlobalStyles />
        <PricingPage 
          onBack={() => {}} 
          showBackButton={false}
          onShowTerms={() => setLegalPage('terms')}
          onShowPrivacy={() => setLegalPage('privacy')}
          isSubscribed={false}
        />
      </>
    );
  }

  // Má předplatné - zobrazit dashboard nebo techniku
  return (
    <>
      <GlobalStyles />
      {showPricing ? (
        <PricingPage onBack={() => setShowPricing(false)} isSubscribed={true} />
      ) : (
        <>
          {currentView === 'dashboard' && (
            <Dashboard 
              onSelectTechnique={handleSelectTechnique}
              onShowInfo={(t) => setInfoTechnique(t)}
              onShowTerms={() => setLegalPage('terms')}
              onShowPrivacy={() => setLegalPage('privacy')}
              onShowPricing={() => setShowPricing(true)}
              isSubscribed={true}
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
        </>
      )}
    </>
  );
};

export default App;
