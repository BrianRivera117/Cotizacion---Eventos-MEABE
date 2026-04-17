import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Calculator, 
  Calendar, 
  Users, 
  Info, 
  ShoppingBag, 
  Phone, 
  Mail, 
  MessageCircle,
  Instagram, 
  Facebook,
  ChevronDown
} from 'lucide-react';
import { CATEGORIES, SERVICES } from './constants';
import { QuoteItem, Service } from './types';
import logo from './Logo MEABE.png';

const IVA_RATE = 0.16;

export default function App() {
  const [quote, setQuote] = useState<QuoteItem[]>([]);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [includeISR, setIncludeISR] = useState(false);
  const [eventDate, setEventDate] = useState("");

  const addToQuote = (service: Service) => {
    setQuote(prev => {
      const existing = prev.find(item => item.id === service.id);
      if (existing) {
        return prev.map(item => 
          item.id === service.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...service, cantidad: 1 }];
    });
    setIsQuoteOpen(true);
  };

  const removeFromQuote = (id: number) => {
    setQuote(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, cantidad: number) => {
    setQuote(prev => prev.map(item => 
      item.id === id ? { ...item, cantidad: Math.max(0, cantidad) } : item
    ));
  };

  const totals = useMemo(() => {
    const subtotal = quote.reduce((acc, item) => acc + (item.precio_base * item.cantidad), 0);
    const isr = includeISR ? subtotal * IVA_RATE : 0;
    const total = subtotal + isr;
    return { subtotal, isr, total };
  }, [quote, includeISR]);

  const handleWhatsAppRedirect = () => {
    const itemsMessage = quote.map(item => `- ${item.nombre}: ${item.cantidad} ${item.unidad_medida === 'persona' ? 'personas' : 'unidades'} ($${(item.precio_base * item.cantidad).toLocaleString('es-MX', { minimumFractionDigits: 2 })})`).join('%0A');
    
    // Format date if exists
    const formattedDate = eventDate ? eventDate.split('-').reverse().join('/') : 'Por definir';

    const message = `*Cotización Eventos MEABE*%0A%0A` +
      `Hola, me interesa una cotización para mi evento con los siguientes servicios:%0A%0A` +
      `*Fecha tentativa de mi evento:* ${formattedDate}%0A%0A` +
      `${itemsMessage}%0A%0A` +
      `*Subtotal:* $${totals.subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}%0A` +
      (includeISR ? `*IVA (16%):* $${totals.isr.toLocaleString('es-MX', { minimumFractionDigits: 2 })}%0A` : '') +
      `*Total:* $${totals.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}%0A%0A` +
      `¿Podrían apoyarme con más información? Gracias.`;

    window.open(`https://wa.me/524929094845?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-dot-pattern">
      {/* Navigation */}
      <nav className="bg-white border-b border-border-meabe sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="Logo MEABE"
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl font-bold tracking-tight text-meabe uppercase">EVENTOS MEABE</span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-4">
              <span className="extra-pill">📍 Callejoneadas</span>
              <span className="extra-pill">📅 Organización Completa</span>
            </div>

              <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center space-x-6">
                  <a href="#inicio" className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-meabe transition-colors">Inicio</a>
                  <a href="#servicios" className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-meabe transition-colors">Servicios</a>
                  <a href="#cotizador" className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-meabe transition-colors">Cotización</a>
                </div>
                <a 
                  href="#cotizador"
                  className="relative p-2 text-meabe hover:bg-meabe/5 rounded-lg transition-colors"
                >
                  <ShoppingBag size={22} />
                  {quote.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {quote.length}
                    </span>
                  )}
                </a>
              </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative h-[300px] flex items-center justify-center overflow-hidden mb-6">
        <div className="absolute inset-0 z-0 px-6 mt-6">
          <div className="w-full h-full rounded-2xl overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000" 
              alt="Event Background" 
              className="w-full h-full object-cover brightness-[0.5]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-meabe/20 mix-blend-multiply"></div>
          </div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mt-6">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            Tu Evento Soñado, <span className="text-blue-200 underline decoration-meabe underline-offset-8">Hecho Realidad</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-light text-gray-100 max-w-2xl mx-auto"
          >
            Servicio integral de banquetes y barras gourmet para celebraciones inolvidables en Zacatecas.
          </motion.p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-6 py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          
          {/* Services Section */}
          <main id="servicios" className="bg-white rounded-xl p-6 shadow-polish border border-border-meabe">
            {/* Event Date Picker */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="text-meabe" size={20} />
                <h3 className="text-[14px] font-bold text-gray-800 uppercase tracking-tight">Fecha Tentativa del Evento</h3>
              </div>
              <input 
                type="date" 
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full md:w-64 bg-white border border-border-meabe rounded-lg px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-meabe/20 focus:border-meabe transition-all cursor-pointer"
              />
              <p className="text-[10px] text-gray-400 mt-2 italic">*Esta fecha nos ayuda a verificar disponibilidad.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Catálogo de Servicios</h2>
              <p className="text-sm text-gray-500">Selecciona los elementos para tu cotización</p>
            </div>

            {CATEGORIES.map(category => (
              <div key={category.id} className="mb-10 last:mb-0">
                <h3 className="category-title">{category.nombre}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SERVICES.filter(s => s.categoria_id === category.id).map(service => (
                    <motion.div 
                      key={service.id}
                      className="bg-white rounded-lg p-4 border border-border-meabe hover:border-meabe transition-all flex items-center justify-between group"
                    >
                      <div className="flex-1">
                        <h4 className="text-[14px] font-bold text-gray-700 mb-0.5">{service.nombre}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] font-medium text-gray-900">
                            {service.precio_base > 0 ? `$${service.precio_base.toFixed(2)}` : 'Consultar'}
                          </span>
                          {service.precio_base > 0 && (
                            <span className="text-[11px] text-gray-400 font-medium lowercase">/ {service.unidad_medida}</span>
                          )}
                        </div>
                        {service.descripcion && (
                          <p className="text-[10px] text-gray-400 mt-1 line-clamp-1 group-hover:line-clamp-none">
                            {service.descripcion}
                          </p>
                        )}
                      </div>
                      
                      {service.precio_base > 0 && (
                        <button 
                          onClick={() => addToQuote(service)}
                          className="ml-4 bg-meabe text-white px-3 py-1.5 rounded text-[12px] font-bold hover:bg-[#5a6475] transition-all flex items-center gap-1 active:scale-95 shadow-sm"
                        >
                          <Plus size={14} />
                          Añadir
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </main>

          {/* Quote Section */}
          <aside id="cotizador" className="flex flex-col gap-6 sticky top-24 scroll-mt-24">
            <div className="bg-white rounded-xl shadow-polish border border-border-meabe overflow-hidden flex flex-col max-h-[calc(100vh-120px)]">
              <div className="bg-white border-b border-border-meabe px-6 py-4 flex items-center justify-between">
                <h3 className="text-[14px] font-bold text-meabe uppercase tracking-wider flex items-center gap-2">
                  <Calculator size={16} />
                  Mi Cotización
                </h3>
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">
                  {quote.length} Items
                </span>
              </div>

              <div className="flex-1 overflow-y-auto min-h-[200px] p-0">
                {quote.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                    <ShoppingBag size={40} className="text-gray-200 mb-2" />
                    <p className="text-[12px] text-gray-400 font-medium">Tu cotización está vacía.<br/>Selecciona servicios del catálogo.</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-meabe text-white text-[10px] uppercase tracking-wider font-bold">
                        <th className="py-2.5 px-4 font-bold">Servicio</th>
                        <th className="py-2.5 px-2 text-center font-bold">Cant.</th>
                        <th className="py-2.5 px-4 text-right font-bold">Subtotal</th>
                        <th className="py-2.5 px-2"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {quote.map(item => (
                        <tr key={item.id} className="group hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4">
                            <p className="text-[12px] font-bold text-gray-700 leading-tight">{item.nombre}</p>
                            <p className="text-[10px] text-gray-400 font-medium">${item.precio_base.toFixed(2)} por {item.unidad_medida}</p>
                          </td>
                          <td className="py-3 px-2">
                            <input 
                              type="number" 
                              value={item.cantidad === 0 ? "" : item.cantidad}
                              onChange={(e) => updateQuantity(item.id, e.target.value === "" ? 0 : parseInt(e.target.value))}
                              onBlur={(e) => {
                                if (e.target.value === "" || parseInt(e.target.value) < 1) {
                                  updateQuantity(item.id, 1);
                                }
                              }}
                              className="w-12 px-1 py-1 border border-border-meabe rounded text-[11px] font-bold text-center focus:outline-none focus:ring-1 focus:ring-meabe"
                            />
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="text-[12px] font-bold text-gray-800">${(item.precio_base * item.cantidad).toLocaleString('es-MX')}</span>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <button 
                              onClick={() => removeFromQuote(item.id)}
                              className="text-red-400 hover:text-red-600 p-1.5 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {quote.length > 0 && (
                <div className="p-6 bg-white border-t border-border-meabe">
                  <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <input 
                      type="checkbox" 
                      id="isr-toggle"
                      checked={includeISR}
                      onChange={(e) => setIncludeISR(e.target.checked)}
                      className="w-4 h-4 text-meabe border-gray-300 rounded focus:ring-meabe accent-meabe cursor-pointer"
                    />
                    <label htmlFor="isr-toggle" className="text-[12px] font-bold text-gray-600 cursor-pointer select-none">
                      Incluir Impuestos (IVA/ISR)
                    </label>
                  </div>

                  <div className="totals-card">
                    <div className="flex justify-between items-center text-[12px] text-gray-500 mb-1">
                      <span>Subtotal</span>
                      <span className="font-bold">${totals.subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                    </div>
                    {includeISR && (
                      <div className="flex justify-between items-center text-[12px] text-gray-500 mb-3">
                        <span>Impuestos (16%)</span>
                        <span className="font-bold">${totals.isr.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <span className="text-[14px] font-bold text-gray-900 uppercase tracking-tighter">Total</span>
                      <span className="text-[18px] font-bold text-meabe">
                        ${totals.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2 italic">*Los precios pueden cambiar sin previo aviso.</p>
                  
                  <button 
                    onClick={handleWhatsAppRedirect}
                    className="w-full mt-4 bg-meabe text-white py-3 rounded-lg font-bold text-[13px] hover:bg-[#5a6475] transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageCircle size={16} />
                    Solicitar Cotización
                  </button>
                </div>
              )}
            </div>

            {/* Support Info */}
            <div className="bg-white rounded-xl p-4 shadow-polish border border-border-meabe flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Atención Directa</p>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col">
                    <p className="text-[13px] font-bold text-gray-700 leading-tight">492-870-94-30</p>
                    <p className="text-[10px] text-gray-400 font-medium">Manuel Rivera</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[13px] font-bold text-gray-700 leading-tight">492-909-48-45</p>
                    <p className="text-[10px] text-gray-400 font-medium">Brian Rivera</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer id="contacto" className="bg-white border-t border-border-meabe py-10 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <a href="https://wa.link/xl5m4q" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:text-green-600 transition-colors border border-border-meabe"><MessageCircle size={18} /></a>
            <a href="https://www.instagram.com/eventos_meabe" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:text-meabe transition-colors border border-border-meabe"><Instagram size={18} /></a>
            <a href="https://www.facebook.com/EventosMeabe" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:text-blue-600 transition-colors border border-border-meabe"><Facebook size={18} /></a>
          </div>
          <p className="text-[11px] text-gray-400 uppercase font-bold tracking-[2px]">© 2026 Eventos MEABE • Tu evento, nuestra misión</p>
        </div>
      </footer>
    </div>
  );
}

