import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, PiggyBank, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from './CartContext';
import { useLanguage } from './LanguageContext';

const CartPage = () => {
  const { cart } = useCart();
  const { t } = useLanguage();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tight">{t('cart.empty')}</h1>
        <p className="text-gray-500 max-w-xs">{t('cart.empty_msg')}</p>
        <Link 
          to="/" 
          className="px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all"
        >
          {t('cart.start_shopping')}
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-12 px-4"
    >
      <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8 md:p-12 text-center border border-gray-100">
        <div className="flex justify-center mb-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12 }}
            className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500"
          >
            <CheckCircle className="w-12 h-12" />
          </motion.div>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight">
          {t('cart.success')}
        </h1>
        
        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          {t('cart.success_msg')}
        </p>

        <div className="space-y-4 mb-10">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 text-left">
              <div className="w-32 h-32 bg-white rounded-xl border border-gray-200 p-2 flex items-center justify-center flex-shrink-0">
                <img 
                  src={item.images[0]} 
                  alt={item.name} 
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.id}/200/200`;
                  }}
                />
              </div>

              <div className="flex-1 space-y-3 w-full">
                <h3 className="text-xl font-bold text-gray-900 leading-tight">{item.name}</h3>
                
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-emerald-600">{item.currentPrice.toFixed(2)} €</span>
                  <span className="text-gray-400 line-through text-sm font-medium">{item.oldPrice.toFixed(2)} €</span>
                  <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">-{item.discount}%</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-blue-100">
                  <PiggyBank className="w-4 h-4" />
                  <span>{t('cart.save')} {item.savings.toFixed(2)} €</span>
                </div>

                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {t('cart.quantity')}: {item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="w-full sm:w-auto px-8 py-4 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t('cart.continue')}
          </Link>
          <Link 
            to="/delivery"
            className="w-full sm:w-auto px-8 py-4 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center"
          >
            {t('cart.checkout')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;
