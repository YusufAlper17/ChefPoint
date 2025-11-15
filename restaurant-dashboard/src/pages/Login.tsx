import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Lock, UtensilsCrossed } from 'lucide-react';
import { motion } from 'framer-motion';

export const Login = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Demo amaçlı direkt dashboard'a yönlendir
    navigate('/dashboard');
  };

  const handleGoogleLogin = () => {
    // Demo amaçlı direkt dashboard'a yönlendir
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-orange-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-600 rounded-2xl mb-4">
            <UtensilsCrossed className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">RestaurantOS</h1>
          <div className="flex justify-center mt-4">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl ring-1 ring-black/5 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('login.title')}</h2>

          <div className="space-y-4">
            <Input
              label={t('login.email')}
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="ornek@restoran.com"
              icon={Mail}
            />

            <Input
              label={t('login.password')}
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              icon={Lock}
            />

            <Button onClick={handleLogin} fullWidth size="lg">
              {t('login.loginButton')}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">veya</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-medium text-gray-700">{t('login.googleLogin')}</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            {t('login.noAccount')}{' '}
            <button
              onClick={handleLogin}
              className="text-brand-600 font-medium hover:underline"
            >
              {t('login.register')}
            </button>
          </p>
        </div>

        {/* Demo Note */}
        <div className="text-center mt-6 p-4 bg-brand-50 rounded-lg">
          <p className="text-sm text-brand-800">
            <strong>Demo:</strong> {t('login.demo')}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

