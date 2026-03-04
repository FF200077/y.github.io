import React, { useState, useRef, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useNavigate,
  useParams
} from 'react-router-dom';
import { 
  ShoppingCart, 
  Search, 
  Star, 
  CheckCircle, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  Bolt, 
  Keyboard, 
  Lightbulb, 
  Usb, 
  Zap, 
  Box,
  PiggyBank,
  ChevronLeft,
  ChevronRight,
  SearchIcon,
  X,
  ArrowRight,
  AlertCircle,
  Minus,
  Plus,
  CreditCard,
  Wallet,
  Gift
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MAIN_PRODUCT, RELATED_PRODUCTS, FEATURES } from './constants';
import { Product, RelatedProduct } from './types';
import { CartProvider, useCart } from './CartContext';
import { LanguageProvider, useLanguage } from './LanguageContext';
import CartPage from './CartPage';
import DeliveryPage from './DeliveryPage';

// --- Components ---

const TopBar = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-[#b3e6f7] text-black py-2 text-center text-[10px] font-bold uppercase tracking-widest">
      <span className="bg-black text-white px-2 py-0.5 rounded mr-2">NEW</span>
      {t('top_bar.message')}
    </div>
  );
};

const Header = () => {
  const { cartCount } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <header className="bg-black text-white py-4 sticky top-0 z-50 shadow-lg backdrop-blur-md bg-black/95">
      <div className="container mx-auto px-4 flex items-center justify-between gap-5">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="Promois.png" 
            alt="Promois Logo" 
            className="w-28 h-auto transition-transform group-hover:scale-105" 
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/logo/120/40';
            }} 
          />
        </Link>
        
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full py-2.5 px-6 pr-12 rounded-full border-none bg-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-gray-400"
          />
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-white/10 rounded-lg p-1">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-[10px] font-bold rounded transition-all ${language === 'en' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('fr')}
              className={`px-2 py-1 text-[10px] font-bold rounded transition-all ${language === 'fr' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              FR
            </button>
          </div>

          <button 
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 font-semibold text-sm cursor-pointer hover:bg-white/10 p-2 px-3 rounded-xl transition-all relative"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">{t('cart.title')}</span>
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-black"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

const ProductGallery = ({ images }: { images: string[] }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="space-y-4">
      <div className="relative bg-white rounded-2xl overflow-hidden h-[350px] md:h-[500px] flex items-center justify-center group shadow-sm border border-gray-100">
        <motion.img 
          key={activeImage}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          src={activeImage} 
          alt="Product" 
          referrerPolicy="no-referrer"
          className={`max-h-[90%] max-w-[90%] object-contain transition-transform duration-500 ease-out cursor-crosshair ${isZoomed ? 'scale-150' : 'scale-100'}`}
          onClick={() => setIsZoomed(!isZoomed)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${activeImage}/800/800`;
          }}
        />
        <button 
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute bottom-4 right-4 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-black transition-all backdrop-blur-sm"
        >
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <button 
            key={idx}
            onClick={() => {
              setActiveImage(img);
              setIsZoomed(false);
            }}
            className={`aspect-square rounded-xl overflow-hidden bg-white flex items-center justify-center border-2 transition-all p-2 ${activeImage === img ? 'border-orange-500 shadow-md' : 'border-transparent hover:border-gray-200 grayscale hover:grayscale-0'}`}
          >
            <img 
              src={img} 
              alt={`Thumb ${idx}`} 
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${img}/200/200`;
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const ProductInfo = ({ product, onAddToCart }: { product: Product, onAddToCart: (qty: number) => void }) => {
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="inline-block bg-black text-white text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded">
          {t('product.hot_deal')}
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight tracking-tight">
          {product.name}
        </h1>
      </div>
      
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-current' : 'fill-current opacity-30'}`} />
          ))}
          <span className="text-gray-400 text-xs font-bold ml-1">(4.7)</span>
        </div>
        <span className="text-gray-300">|</span>
        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{product.reviewsCount} Reviews</span>
        <span className="text-gray-300">|</span>
        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">SKU: GK61-RGB-BL</span>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4 max-w-sm">
        <div className="flex items-end gap-3">
          <div className="text-4xl font-black text-black tracking-tighter">
            {product.currentPrice.toFixed(2)} €
          </div>
          <div className="text-lg text-gray-400 line-through font-medium mb-1">
            {product.oldPrice.toFixed(2)} €
          </div>
          <div className="bg-red-500 text-white text-xs font-black px-2 py-1 rounded-lg mb-1 shadow-lg shadow-red-500/20">
            -{product.discount}%
          </div>
        </div>
        <div className="text-sm font-bold text-emerald-600 flex items-center gap-2">
          <PiggyBank className="w-4 h-4" />
          {t('cart.save')} {product.savings.toFixed(2)} €
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex items-center justify-between gap-4 max-w-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-xs font-bold text-orange-900 leading-tight">
            {t('product.payment_options')}
          </div>
        </div>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
          alt="PayPal" 
          className="h-5 opacity-70"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-red-500 font-bold text-sm">
          <AlertCircle className="w-4 h-4" />
          {t('product.stock_alert')}
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            {t('product.in_stock')}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <Truck className="w-4 h-4 text-emerald-500" />
            {t('product.free_shipping')}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            {t('product.secure_payment')}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <div className="flex items-center border-2 border-gray-100 rounded-2xl overflow-hidden bg-white">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-4 hover:bg-gray-50 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input 
            type="number" 
            value={quantity}
            readOnly
            className="w-12 text-center font-black text-lg bg-transparent outline-none"
          />
          <button 
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="px-4 py-4 hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button 
          onClick={() => onAddToCart(quantity)}
          className="flex-1 px-10 py-4 bg-[#ff8800] hover:bg-[#00b247] text-white font-black rounded-2xl transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-3 group"
        >
          <ShoppingCart className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          {t('product.add_to_cart')}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-gray-100">
        {[
          { icon: ShieldCheck, text: t('product.secure') },
          { icon: Truck, text: t('product.fast') },
          { icon: RotateCcw, text: t('product.returns') },
          { icon: Headphones, text: t('product.support') }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1 text-[10px] text-gray-400 uppercase font-bold tracking-widest">
            <item.icon className="w-5 h-5 text-gray-300" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState('description');
  const { t } = useLanguage();

  const tabs = [
    { id: 'description', label: t('product.description') },
    { id: 'features', label: t('product.specifications') },
    { id: 'reviews', label: `${t('product.reviews')} (42)` },
    { id: 'shipping', label: t('product.shipping') }
  ];

  return (
    <div className="mt-20">
      <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-4 text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-all relative ${activeTab === tab.id ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500"
              />
            )}
          </button>
        ))}
      </div>

      <div className="py-10">
        <AnimatePresence mode="wait">
          {activeTab === 'description' && (
            <motion.div 
              key="desc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 text-gray-600 leading-relaxed max-w-4xl"
            >
              <h2 className="text-2xl font-black text-black uppercase tracking-tight">{t('product.description')}</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">{t('product.description_title')}</h3>
                <p>{t('product.description_p1')}</p>
                <p>{t('product.description_p2')}</p>
                <p>{t('product.description_p3')}</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'features' && (
            <motion.div 
              key="feat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {FEATURES.map((feature, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-black mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    {feature.icon === 'bolt' && <Bolt className="w-6 h-6" />}
                    {feature.icon === 'keyboard' && <Keyboard className="w-6 h-6" />}
                    {feature.icon === 'lightbulb' && <Lightbulb className="w-6 h-6" />}
                    {feature.icon === 'usb' && <Usb className="w-6 h-6" />}
                    {feature.icon === 'tachometer-alt' && <Zap className="w-6 h-6" />}
                    {feature.icon === 'box-open' && <Box className="w-6 h-6" />}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div 
              key="rev"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="text-center">
                  <div className="text-6xl font-black text-black">4.7</div>
                  <div className="flex text-yellow-400 justify-center mt-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">42 Reviews</div>
                </div>
                <div className="flex-1 space-y-3 w-full">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-4">
                      <span className="text-xs font-bold w-4">{star}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 rounded-full" 
                          style={{ width: `${star === 5 ? 80 : star === 4 ? 15 : 5}%` }} 
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-8">{star === 5 ? '80%' : star === 4 ? '15%' : '5%'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'shipping' && (
            <motion.div 
              key="ship"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-2 gap-12"
            >
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-black uppercase tracking-tight">{t('product.shipping_info')}</h2>
                <ul className="space-y-4">
                  {[
                    { icon: Box, title: 'Standard Delivery', text: '2–4 business days' },
                    { icon: Truck, title: 'Express Delivery', text: 'Next day delivery available' },
                    { icon: RotateCcw, title: 'Return Policy', text: '14-day hassle-free returns' },
                    { icon: ShieldCheck, title: 'Free Pickup', text: 'Available in partner stores' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
                <h4 className="font-bold text-orange-900 mb-2">{t('product.need_help')}</h4>
                <p className="text-sm text-orange-700 mb-4">{t('product.help_msg')}</p>
                <button className="text-sm font-bold text-orange-900 flex items-center gap-2 hover:gap-3 transition-all">
                  {t('product.contact_support')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const InfoBlocks = () => {
  const { t } = useLanguage();
  const blocks = [
    {
      title: t('info.coanda_title'),
      desc: t('info.coanda_desc'),
      img: 'Produit/info1.jpg'
    },
    {
      title: t('info.acc_title'),
      desc: t('info.acc_desc'),
      img: 'Produit/info2.jpg',
      reverse: true
    },
    {
      title: t('info.heat_title'),
      desc: t('info.heat_desc'),
      img: 'Produit/info3.jpg'
    }
  ];

  return (
    <section className="py-24 space-y-20">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">{t('product.additional_info')}</h2>
        <div className="h-1.5 w-20 bg-orange-500 mx-auto rounded-full" />
      </div>
      
      {blocks.map((block, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${block.reverse ? 'md:flex-row-reverse' : ''}`}
        >
          <div className="w-full md:w-1/2 rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/50 group">
            <img 
              src={block.img} 
              alt={block.title} 
              referrerPolicy="no-referrer"
              className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${block.title}/800/600`;
              }}
            />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h3 className="text-2xl font-black text-gray-900 leading-tight">{block.title}</h3>
            <p className="text-lg text-gray-500 leading-relaxed font-medium">{block.desc}</p>
            <button className="text-orange-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              {t('common.learn_more')} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      ))}
    </section>
  );
};

const RelatedProducts = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white -mx-4 px-4 sm:-mx-8 sm:px-8 md:-mx-16 md:px-16 lg:-mx-32 lg:px-32">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">
            Top 10 Best Selling Products
          </h2>
          <p className="text-gray-500 font-medium text-lg">With special offers - The Best Gaming Accessories</p>
          <div className="h-1.5 w-20 bg-red-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {RELATED_PRODUCTS.map((product) => (
            <motion.div 
              key={product.id} 
              whileHover={{ y: -10 }}
              className="bg-white p-4 md:p-6 rounded-[2rem] shadow-sm border border-gray-50 flex flex-col group/card relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg z-10 shadow-lg shadow-red-500/20">
                -{product.discount}%
              </div>
              
              <div className="relative h-32 md:h-48 mb-4 md:mb-6 overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center p-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain group-hover/card:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${product.id}/400/400`;
                  }}
                />
              </div>
              
              <h3 className="text-xs md:text-sm font-bold text-gray-900 line-clamp-2 h-10 mb-2 leading-snug group-hover/card:text-orange-500 transition-colors">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-1 text-yellow-400 text-[10px] mb-3">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-gray-400 font-bold ml-1">{product.rating}</span>
              </div>
              
              <div className="mt-auto space-y-3">
                <div>
                  <div className="text-gray-400 text-[10px] line-through font-medium">{product.oldPrice.toFixed(2)} $</div>
                  <div className="text-lg md:text-xl font-black text-black tracking-tighter">{product.currentPrice.toFixed(2)} $</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{product.soldCount} {t('common.sold')}</span>
                  <button className="w-8 h-8 md:w-10 md:h-10 bg-black text-white rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors shadow-lg shadow-black/10">
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-black text-white pt-24 pb-12 mt-24">
      <div className="container mx-auto px-4">
        {/* LOGO */}
        <div className="flex justify-center mb-16">
          <img 
            src="Promois.png" 
            alt="Promois Logo" 
            className="w-40 h-auto" 
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/logo-footer/150/50';
            }} 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-8 text-white relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-orange-500">
              {t('footer.customer_service')}
            </h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-orange-500 hover:pl-2 transition-all">Contact Us</a></li>
              <li><a href="#" className="hover:text-orange-500 hover:pl-2 transition-all">FAQ</a></li>
              <li><a href="#" className="hover:text-orange-500 hover:pl-2 transition-all">Order Tracking</a></li>
              <li><a href="#" className="hover:text-orange-500 hover:pl-2 transition-all">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-orange-500 hover:pl-2 transition-all">Size Guide</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-8 text-white relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-orange-500">
              {t('footer.about_us')}
            </h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-orange-500 hover:pl-2 transition-all">Who We Are</a></li>
              <li><a href="#" className="hover:text-orange-500 hover:pl-2 transition-all">Our Stores</a></li>
              <li><a href="#" className="hover:text-orange-500 hover:pl-2 transition-all">Careers</a></li>
              <li><a href="#" className="hover:text-orange-500 hover:pl-2 transition-all">Social Responsibility</a></li>
              <li><a href="#" className="hover:text-orange-500 hover:pl-2 transition-all">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-8 text-white relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-orange-500">
              {t('footer.legal_info')}
            </h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-orange-500 hover:pl-2 transition-all">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-orange-500 hover:pl-2 transition-all">Legal Notice</a></li>
              <li><a href="#" className="hover:text-orange-500 hover:pl-2 transition-all">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 hover:pl-2 transition-all">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 hover:pl-2 transition-all">Sales Conditions</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-8 text-white relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-orange-500">
                {t('footer.newsletter')}
              </h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Subscribe to our newsletter to receive exclusive offers!
              </p>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 bg-white/5 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-orange-500 transition-all"
                />
                <button className="bg-orange-600 hover:bg-orange-700 px-6 rounded-xl font-black text-xs uppercase tracking-widest transition-colors">OK</button>
              </form>
            </div>

            <div className="flex gap-4">
              {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all text-gray-400">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current rounded-full opacity-20" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
            {t('footer.rights')}
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Visa', img: 'https://cdn-icons-png.flaticon.com/512/196/196578.png' },
              { name: 'Mastercard', img: 'https://cdn-icons-png.flaticon.com/512/196/196561.png' },
              { name: 'PayPal', img: 'https://cdn-icons-png.flaticon.com/512/3064/3064076.png' },
              { name: 'Bank of America', img: 'https://cdn-icons-png.flaticon.com/512/888/888870.png' },
              { name: 'Bitcoin', img: 'https://cdn-icons-png.flaticon.com/512/7016/7016523.png' },
              { name: 'Ethereum', img: 'https://cdn-icons-png.flaticon.com/512/7016/7016523.png' },
              { name: 'USDT', img: 'https://cdn-icons-png.flaticon.com/512/7016/7016525.png' }
            ].map((method) => (
              <div key={method.name} className="bg-white px-3 py-1.5 rounded-lg flex items-center justify-center shadow-sm w-12 h-8 overflow-hidden">
                <img src={method.img} alt={method.name} className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
            </div>
            <span className="text-xs font-black tracking-widest">TRUSTPILOT</span>
          </div>
        </div>
        <p className="text-center text-[10px] text-gray-600 mt-8 uppercase tracking-widest opacity-50">
          Secure payments with Cards, US Banks & Crypto
        </p>
      </div>
    </footer>
  );
};

const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => {
  const { t } = useLanguage();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-black text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px] border border-white/10"
    >
      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
        <CheckCircle className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <div className="font-black text-sm uppercase tracking-widest">{t('common.success')}</div>
        <div className="text-xs text-gray-400">{message}</div>
      </div>
      <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [showToast, setShowToast] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const productData = id === MAIN_PRODUCT.id 
    ? MAIN_PRODUCT 
    : RELATED_PRODUCTS.find(p => p.id === id);

  if (!productData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-black uppercase tracking-widest">Product Not Found</h2>
        <Link to="/" className="text-orange-500 font-bold hover:underline">Back to Home</Link>
      </div>
    );
  }

  // Normalize product for the detail view
  const product: Product = 'images' in productData 
    ? productData 
    : {
        id: productData.id,
        name: productData.name,
        badge: '100% New - 2-Year Warranty',
        rating: productData.rating,
        reviewsCount: productData.soldCount,
        currentPrice: productData.currentPrice,
        oldPrice: productData.oldPrice,
        discount: productData.discount,
        savings: productData.oldPrice - productData.currentPrice,
        images: [productData.image, productData.image, productData.image, productData.image],
        sku: `GK-${productData.id}-PRO`
      };

  const handleAddToCart = (qty: number) => {
    addToCart(product, qty);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-12 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
        <Link to="/" className="hover:text-black transition-colors">{t('nav.home')}</Link>
        <ChevronRight className="w-3 h-3" />
        <a href="#" className="hover:text-black transition-colors">{t('nav.gaming')}</a>
        <ChevronRight className="w-3 h-3" />
        <a href="#" className="hover:text-black transition-colors">{t('nav.keyboards')}</a>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} onAddToCart={handleAddToCart} />
      </div>

      {/* Tabs */}
      <ProductTabs />

      {/* Info Blocks */}
      <InfoBlocks />

      {/* Related Products */}
      <RelatedProducts />

      <AnimatePresence>
        {showToast && (
          <Toast 
            message={`${product.name} ${t('toast.added')}`} 
            onClose={() => setShowToast(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] rounded-[40px] overflow-hidden group">
        <img 
          src="https://picsum.photos/seed/gaming-setup/1920/1080" 
          alt="Hero" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
          <div className="container mx-auto px-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-xl space-y-6"
            >
              <span className="inline-block bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full">
                Season Sale 2025
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter uppercase">
                Level Up Your <span className="text-orange-500">Gaming</span> Gear
              </h1>
              <p className="text-gray-300 text-lg font-medium leading-relaxed">
                Discover the best mechanical keyboards, mice, and accessories for your ultimate setup.
              </p>
              <button 
                onClick={scrollToGrid}
                className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition-all transform hover:-translate-y-1"
              >
                Shop Collection
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section ref={gridRef}>
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter">
              {t('product.best_selling')}
            </h2>
            <p className="text-gray-500 font-medium">{t('product.special_offers')}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full">All</button>
            <button className="px-6 py-2 bg-white text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-gray-100 transition-colors">Keyboards</button>
            <button className="px-6 py-2 bg-white text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-gray-100 transition-colors">Mice</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            {
              id: MAIN_PRODUCT.id,
              name: MAIN_PRODUCT.name,
              image: MAIN_PRODUCT.images[0],
              rating: MAIN_PRODUCT.rating,
              oldPrice: MAIN_PRODUCT.oldPrice,
              currentPrice: MAIN_PRODUCT.currentPrice,
              soldCount: MAIN_PRODUCT.reviewsCount,
              discount: MAIN_PRODUCT.discount
            },
            ...RELATED_PRODUCTS
          ].slice(0, 10).map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[32px] p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${product.id}/400/400`;
                  }}
                />
                <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">
                  -{product.discount}%
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-[10px] font-black text-gray-900">{product.rating}</span>
                </div>
                <h3 className="text-xs font-black text-gray-900 line-clamp-2 leading-tight uppercase tracking-tight h-8">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-50">
                  <div>
                    <div className="text-sm font-black text-black">{product.currentPrice.toFixed(2)} €</div>
                    <div className="text-[10px] text-gray-400 line-through">{product.oldPrice.toFixed(2)} €</div>
                  </div>
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Banner */}
      <section className="bg-black rounded-[40px] p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl space-y-4">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
              Join the <span className="text-orange-500">Elite</span> Club
            </h2>
            <p className="text-gray-400 font-medium">
              Get early access to drops, exclusive discounts, and gaming news.
            </p>
          </div>
          <form className="flex w-full md:w-auto gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/10 border-none rounded-2xl px-6 py-4 text-white w-full md:w-80 focus:ring-2 focus:ring-orange-500 transition-all"
            />
            <button className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all">
              Join
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

const PaymentPage = () => {
  const { cart, total } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [cryptoRates, setCryptoRates] = useState<Record<string, number>>({});
  const [loadingRates, setLoadingRates] = useState(false);

  const mainProduct = cart.length > 0 ? cart[0] : null;
  const deliveryInfo = JSON.parse(localStorage.getItem('deliveryInfo') || '{}');

  useEffect(() => {
    const fetchRates = async () => {
      setLoadingRates(true);
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,usd-coin,litecoin&vs_currencies=eur');
        const data = await res.json();
        setCryptoRates({
          Bitcoin: data.bitcoin.eur,
          Ethereum: data.ethereum.eur,
          USDT: data.tether.eur,
          'USD Coin': data['usd-coin'].eur,
          Litecoin: data.litecoin.eur,
        });
      } catch (error) {
        console.error('Error fetching crypto rates:', error);
      } finally {
        setLoadingRates(false);
      }
    };
    fetchRates();
  }, []);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-black uppercase tracking-widest">Your cart is empty</h2>
        <Link to="/" className="text-orange-500 font-bold hover:underline">Back to Home</Link>
      </div>
    );
  }

  const getAdjustedTotal = (method: string) => {
    if (method === 'Cards') return total * 1.2;
    if (['Bitcoin', 'Ethereum', 'USDT', 'USD Coin', 'Litecoin'].includes(method)) return total * 0.88;
    if (['Binance', 'Eneba'].includes(method)) return total * 0.93;
    return total;
  };

  const getCryptoAmount = (method: string) => {
    const rate = cryptoRates[method];
    if (!rate) return null;
    return (getAdjustedTotal(method) / rate).toFixed(8);
  };

  const handlePayment = () => {
    if (!selectedMethod) return;
    navigate('/confirmation');
  };

  const cryptoOptions = [
    { name: 'Bitcoin', symbol: 'BTC', icon: 'https://files.catbox.moe/mg2nn8.png' },
    { name: 'Ethereum', symbol: 'ETH', icon: 'https://files.catbox.moe/7qemhr.png' },
    { name: 'USDT', symbol: 'USDT', icon: 'https://files.catbox.moe/kv99kw.png' },
    { name: 'USD Coin', symbol: 'USDC', icon: 'https://files.catbox.moe/0yoacd.png' },
    { name: 'Litecoin', symbol: 'LTC', icon: 'https://files.catbox.moe/ri45tv.png' },
  ];

  const giftCardOptions = [
    { name: 'Binance', label: 'Binance Gift Card', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/640px-Binance_Logo.svg.png' },
    { name: 'Eneba', label: 'Eneba Gift Card', icon: 'https://cdn.prod.website-files.com/62c47c413889de6ddce2b103/6584c4680a0807a9a546261a_64c3b026c8b5a5a8b3ba44af_logo.png' },
  ];

  return (
    <div className="max-w-xl mx-auto pb-32 pt-8">
      {/* Details Toggle */}
      <button 
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-2 font-bold text-gray-800 mb-6 hover:text-[#e91e63] transition-colors group"
      >
        <span className={`transition-transform duration-300 ${showDetails ? 'rotate-90' : ''}`}>➤</span>
        <span className="text-lg">View product details</span>
      </button>

      {/* Details Box */}
      <AnimatePresence>
        {showDetails && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 space-y-8">
              <div className="flex justify-center">
                <img 
                  src={mainProduct?.images[0]} 
                  alt={mainProduct?.name} 
                  className="w-40 h-40 object-cover rounded-2xl shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-center space-y-4">
                <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 leading-tight">{mainProduct?.name}</h3>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-2xl font-black text-[#28a745]">{mainProduct?.currentPrice.toFixed(2)} €</span>
                  <span className="text-lg text-gray-400 line-through font-medium">{mainProduct?.oldPrice.toFixed(2)} €</span>
                  <span className="bg-[#ff4444] text-white text-xs font-black px-3 py-1 rounded-lg shadow-sm">-{mainProduct?.discount}%</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#f1f7ff] text-[#0056b3] px-5 py-2.5 rounded-xl text-sm font-bold border-l-4 border-[#007bff]">
                  <PiggyBank className="w-4 h-4" />
                  Save {mainProduct?.savings.toFixed(2)} €
                </div>
                <div className="text-sm font-bold text-gray-600 uppercase tracking-widest pt-2">
                  Quantity: {mainProduct?.quantity || 1}
                </div>
              </div>

              {/* Delivery Info Summary */}
              <div className="pt-8 border-t border-gray-100 space-y-4">
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-900">Informations de livraison</h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between"><span className="font-bold text-gray-400 uppercase text-[10px]">Prénom:</span> <span className="font-bold">{deliveryInfo.firstName}</span></div>
                  <div className="flex justify-between"><span className="font-bold text-gray-400 uppercase text-[10px]">Nom:</span> <span className="font-bold">{deliveryInfo.lastName}</span></div>
                  <div className="flex justify-between"><span className="font-bold text-gray-400 uppercase text-[10px]">Email:</span> <span className="font-bold">{deliveryInfo.email}</span></div>
                  <div className="flex justify-between"><span className="font-bold text-gray-400 uppercase text-[10px]">Téléphone:</span> <span className="font-bold">{deliveryInfo.phone}</span></div>
                  <div className="flex justify-between"><span className="font-bold text-gray-400 uppercase text-[10px]">Adresse:</span> <span className="font-bold">{deliveryInfo.address}</span></div>
                  <div className="flex justify-between"><span className="font-bold text-gray-400 uppercase text-[10px]">Ville:</span> <span className="font-bold">{deliveryInfo.city} ({deliveryInfo.zipCode})</span></div>
                  <div className="flex justify-between"><span className="font-bold text-gray-400 uppercase text-[10px]">Pays:</span> <span className="font-bold">{deliveryInfo.country}</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Converted Display */}
      {selectedMethod && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex justify-between items-center mb-8"
        >
          <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
            Equivalent in <span className="text-[#e91e63]">{selectedMethod}</span>:
          </span>
          <span className="text-sm font-black text-[#e91e63]">
            {['Bitcoin', 'Ethereum', 'USDT', 'USD Coin', 'Litecoin'].includes(selectedMethod) 
              ? `${getCryptoAmount(selectedMethod)} ${selectedMethod}`
              : `${getAdjustedTotal(selectedMethod).toFixed(2)} €`}
          </span>
        </motion.div>
      )}

      <div className="space-y-12">
        {/* Pay with Cards */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <img src="https://images.vexels.com/media/users/3/132610/isolated/preview/7eb38f5224912942a7f59db3829a7d3f-wallet-with-cards-icon.png" alt="Wallet" className="w-10 h-auto" referrerPolicy="no-referrer" />
            <h2 className="text-xl font-black text-[#0d1a30] uppercase tracking-tight">
              Pay with Cards <span className="text-[#e91e63] text-base ml-2">+20%</span>
            </h2>
          </div>
          <button 
            onClick={() => setSelectedMethod('Cards')}
            className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all shadow-sm ${
              selectedMethod === 'Cards' ? 'border-[#e91e63] bg-[#fff0f6] border-l-4' : 'border-transparent bg-white hover:border-[#e91e63]/30'
            }`}
          >
            <span className="font-black text-gray-900">Pay with Cards</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Cards" className="h-5 opacity-50 grayscale" referrerPolicy="no-referrer" />
          </button>
        </section>

        {/* Choose Crypto */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <img src="https://files.catbox.moe/wzhwcc.png" alt="Crypto" className="w-10 h-auto" referrerPolicy="no-referrer" />
            <h2 className="text-xl font-black text-[#0d1a30] uppercase tracking-tight">
              Choose your crypto <span className="text-[#28a745] text-base ml-2">(Save 12%)</span>
            </h2>
          </div>
          <div className="grid gap-3">
            {cryptoOptions.map((coin) => (
              <button 
                key={coin.name}
                onClick={() => setSelectedMethod(coin.name)}
                className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all shadow-sm ${
                  selectedMethod === coin.name ? 'border-[#e91e63] bg-[#fff0f6] border-l-4' : 'border-transparent bg-white hover:border-[#e91e63]/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <img src={coin.icon} alt={coin.name} className="w-8 h-8" referrerPolicy="no-referrer" />
                  <span className="font-black text-gray-900">{coin.name}</span>
                </div>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{coin.symbol}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Pay with Gift Cards */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <img src="https://cdn-icons-png.flaticon.com/512/2611/2611152.png" alt="Gift" className="w-10 h-auto" referrerPolicy="no-referrer" />
            <h2 className="text-xl font-black text-[#0d1a30] uppercase tracking-tight">
              Pay with Gift Cards <span className="text-[#28a745] text-base ml-2">(Save 7%)</span>
            </h2>
          </div>
          <div className="grid gap-3">
            {giftCardOptions.map((card) => (
              <button 
                key={card.name}
                onClick={() => setSelectedMethod(card.name)}
                className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all shadow-sm ${
                  selectedMethod === card.name ? 'border-[#e91e63] bg-[#fff0f6] border-l-4' : 'border-transparent bg-white hover:border-[#e91e63]/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <img src={card.icon} alt={card.name} className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
                  <span className="font-black text-gray-900">{card.label}</span>
                </div>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Gift</span>
              </button>
            ))}
          </div>
        </section>

        {/* Note Box */}
        <div className="bg-[#f6fff9] border border-gray-200 p-8 rounded-3xl space-y-6 shadow-sm">
          <strong className="text-lg font-black text-gray-900 uppercase tracking-tight">Note</strong>
          <p className="text-base text-gray-600 leading-relaxed font-medium">
            Explanatory Note: Purchasing with a gift card is often more flexible and can provide extra security for your online transactions.
          </p>
          <div className="flex justify-center py-4">
            <img 
              src="https://files.catbox.moe/v19bgk.png" 
              alt="Security" 
              className="w-full max-w-sm h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-sm text-gray-500 italic text-center leading-relaxed">
            We accept multiple payment methods, including credit cards and PayPal. If you are using a gift card, please note that it can be purchased with any payment method you have available.
          </p>
        </div>

        {/* PayPal Unavailable */}
        <div className="opacity-40 grayscale pointer-events-none space-y-6">
          <div className="flex items-center gap-4">
            <img src="https://files.catbox.moe/v7k8sb.png" alt="PayPal" className="w-8 h-8" referrerPolicy="no-referrer" />
            <h2 className="text-xl font-black text-[#0d1a30] uppercase tracking-tight">Pay with PayPal (Unavailable)</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl border-2 border-transparent shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="https://files.catbox.moe/owj9ho.png" alt="PayPal" className="w-8 h-8" referrerPolicy="no-referrer" />
              <span className="font-black text-gray-900">PayPal</span>
            </div>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Unavailable</span>
          </div>
        </div>
      </div>

      {/* Fixed Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#f6f7f9] via-[#f6f7f9] to-transparent z-50">
        <div className="max-w-xl mx-auto">
          <button 
            disabled={!selectedMethod}
            onClick={handlePayment}
            className={`w-full py-5 rounded-[20px] font-black uppercase tracking-[0.2em] text-base transition-all shadow-xl ${
              selectedMethod 
                ? 'bg-[#e91e63] text-white shadow-[#e91e63]/30 hover:bg-[#d81b60] transform hover:-translate-y-1 active:scale-95' 
                : 'bg-[#b0bec5] text-white cursor-not-allowed'
            }`}
          >
            {selectedMethod 
              ? `Pay ${getAdjustedTotal(selectedMethod).toFixed(2)} € with ${selectedMethod}`
              : 'Select a payment method'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmationPage = () => {
  const { t } = useLanguage();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-8">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12 }}
        className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500"
      >
        <CheckCircle className="w-16 h-16" />
      </motion.div>
      
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">
          Order Confirmed!
        </h1>
        <p className="text-gray-500 max-w-md mx-auto text-lg font-medium">
          Thank you for your purchase. Your order has been received and is being processed. You will receive an email confirmation shortly.
        </p>
      </div>

      <button 
        onClick={() => navigate('/')}
        className="px-10 py-4 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all shadow-xl shadow-black/10 uppercase tracking-widest text-sm"
      >
        Back to Store
      </button>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-[#f6f7f9] font-sans text-gray-900 selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
            <TopBar />
            <Header />
            
            <main className="container mx-auto px-4 py-8 max-w-7xl">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/delivery" element={<DeliveryPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

