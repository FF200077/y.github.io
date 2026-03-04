import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  User, 
  Truck, 
  PiggyBank, 
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import { useCart } from './CartContext';
import { useLanguage } from './LanguageContext';

const DeliveryPage = () => {
  const { cart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });

  useEffect(() => {
    const savedData = localStorage.getItem('deliveryInfo');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error('Error parsing saved delivery info', e);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const newData = { ...formData, [id]: value };
    setFormData(newData);
    localStorage.setItem('deliveryInfo', JSON.stringify(newData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd validate and then navigate to payment
    navigate('/payment');
  };

  const steps = [
    { id: 1, label: t('checkout.step.cart'), status: 'completed' },
    { id: 2, label: t('checkout.step.delivery'), status: 'active' },
    { id: 3, label: t('checkout.step.payment'), status: 'pending' },
    { id: 4, label: t('checkout.step.confirmation'), status: 'pending' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Checkout Steps */}
      <div className="flex justify-between items-center mb-12 relative max-w-2xl mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
        {steps.map((step, idx) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
              step.status === 'completed' ? 'bg-black text-white' : 
              step.status === 'active' ? 'bg-orange-500 text-white' : 
              'bg-gray-200 text-gray-400'
            }`}>
              {step.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : step.id}
            </div>
            <span className={`text-xs font-bold uppercase tracking-widest ${
              step.status === 'active' ? 'text-black' : 'text-gray-400'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Delivery Form */}
        <div className="lg:col-span-2 space-y-8">
          <form id="deliveryForm" onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 space-y-10">
            {/* Customer Info */}
            <section className="space-y-6">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-3 uppercase tracking-tight">
                <User className="w-6 h-6 text-orange-500" />
                {t('delivery.customer_info')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {t('delivery.first_name')}
                  </label>
                  <input 
                    type="text" 
                    id="firstName" 
                    required 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {t('delivery.last_name')}
                  </label>
                  <input 
                    type="text" 
                    id="lastName" 
                    required 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  {t('delivery.email')} <span className="text-[10px] lowercase font-medium opacity-60">{t('delivery.email_hint')}</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {t('delivery.phone')}
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  required 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
                />
              </div>
            </section>

            {/* Shipping Address */}
            <section className="space-y-6">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-3 uppercase tracking-tight">
                <Truck className="w-6 h-6 text-orange-500" />
                {t('delivery.shipping_address')}
              </h2>

              <div className="space-y-2">
                <label htmlFor="address" className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {t('delivery.address')}
                </label>
                <input 
                  type="text" 
                  id="address" 
                  required 
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="city" className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {t('delivery.city')}
                  </label>
                  <input 
                    type="text" 
                    id="city" 
                    required 
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="zipCode" className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {t('delivery.zip')}
                  </label>
                  <input 
                    type="text" 
                    id="zipCode" 
                    required 
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="country" className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {t('delivery.country')}
                </label>
                <select 
                  id="country" 
                  required 
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all appearance-none"
                >
                  <option value="">{t('delivery.select_country')}</option>
                  <option value="FR">France</option>
                  <option value="BE">Belgium</option>
                  <option value="CH">Switzerland</option>
                  <option value="LU">Luxembourg</option>
                  <option value="IT">Italy</option>
                  <option value="ES">Spain</option>
                  <option value="CA">Canada</option>
                  <option value="MA">Morocco</option>
                </select>
              </div>
            </section>

            {/* Delivery Options */}
            <section className="space-y-6">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-3 uppercase tracking-tight">
                <Truck className="w-6 h-6 text-orange-500" />
                {t('delivery.options')}
              </h2>

              <div className="p-6 bg-orange-50 border border-orange-100 rounded-3xl flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-orange-500 flex items-center justify-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                  </div>
                  <div>
                    <div className="font-black text-gray-900">{t('delivery.standard')}</div>
                    <div className="text-sm text-gray-500">{t('delivery.standard_desc')}</div>
                  </div>
                </div>
                <div className="font-black text-orange-600 uppercase tracking-widest text-sm">
                  {t('delivery.free')}
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8 sticky top-24">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight border-b border-gray-50 pb-4">
              {t('summary.title')}
            </h3>

            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-100 p-2 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.id}/200/200`;
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-emerald-600">{item.currentPrice.toFixed(2)} €</span>
                      <span className="text-xs text-gray-400 line-through">{item.oldPrice.toFixed(2)} €</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-600 text-[10px] font-bold uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-lg w-fit">
                      <PiggyBank className="w-3 h-3" />
                      {t('cart.save')} {item.savings.toFixed(2)} €
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-1">
                      {t('cart.quantity')}: {item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-50 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Subtotal</span>
                <span className="font-black text-gray-900">
                  {cart.reduce((acc, item) => acc + item.currentPrice * item.quantity, 0).toFixed(2)} €
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Shipping</span>
                <span className="font-black text-emerald-600 uppercase tracking-widest text-xs">{t('delivery.free')}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <span className="text-lg font-black text-gray-900 uppercase tracking-tight">Total</span>
                <span className="text-2xl font-black text-orange-500 tracking-tighter">
                  {cart.reduce((acc, item) => acc + item.currentPrice * item.quantity, 0).toFixed(2)} €
                </span>
              </div>
            </div>

            <button 
              type="submit" 
              form="deliveryForm"
              className="w-full py-4 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3 group"
            >
              {t('delivery.continue')}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
