import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
      <Globe size={18} className="text-gray-600" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'tr' | 'en')}
        className="text-sm font-medium text-gray-700 bg-transparent border-none outline-none cursor-pointer"
      >
        <option value="tr">Türkçe</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

