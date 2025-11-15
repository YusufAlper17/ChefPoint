import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hover = false }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm p-6 ${hover ? 'hover:shadow-md transition-shadow cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action, icon: Icon }) => {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={20} className="text-gray-600" />}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

