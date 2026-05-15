import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface ToggleSetting {
  id: string;
  icon: string;
  title: string;
  desc: string;
  enabled: boolean;
  critical?: boolean;
}

const SECTIONS = [
  {
    title: 'Шифрование',
    icon: 'Lock',
    color: 'text-primary',
    settings: [
      { id: 'e2e', icon: 'ShieldCheck', title: 'Сквозное шифрование (E2E)', desc: 'Все сообщения шифруются на вашем устройстве перед отправкой', enabled: true, critical: true },
      { id: 'forward', icon: 'RefreshCw', title: 'Perfect Forward Secrecy', desc: 'Новые ключи для каждого сеанса — компрометация одного не раскрывает остальные', enabled: true, critical: true },
      { id: 'msgencrypt', icon: 'FileKey', title: 'Шифрование хранилища', desc: 'Ваши данные на устройстве защищены AES-256', enabled: true },
    ]
  },
  {
    title: 'Анонимность',
    icon: 'EyeOff',
    color: 'text-accent',
    settings: [
      { id: 'anon', icon: 'Ghost', title: 'Анонимный режим', desc: 'Скрыть вашу онлайн-активность от других пользователей', enabled: false },
      { id: 'readreceipt', icon: 'CheckCheck', title: 'Статус прочтения', desc: 'Показывать, когда вы прочитали сообщения', enabled: true },
      { id: 'lastseen', icon: 'Clock', title: 'Время последнего визита', desc: 'Отображать когда вы были онлайн', enabled: false },
      { id: 'typing', icon: 'Type', title: 'Индикатор набора', desc: 'Показывать что вы печатаете в чате', enabled: true },
    ]
  },
  {
    title: 'Данные',
    icon: 'Database',
    color: 'text-neon-pink',
    settings: [
      { id: 'analytics', icon: 'BarChart2', title: 'Аналитика использования', desc: 'Помогает улучшать приложение (анонимно)', enabled: false },
      { id: 'backup', icon: 'CloudOff', title: 'Облачный бэкап', desc: 'Резервное копирование зашифрованных данных', enabled: false },
      { id: 'crash', icon: 'AlertTriangle', title: 'Отчёты об ошибках', desc: 'Автоматически отправлять анонимные отчёты', enabled: false },
    ]
  },
];

export default function Privacy() {
  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(
      SECTIONS.flatMap(s => s.settings.map(item => [item.id, item.enabled]))
    )
  );

  const toggle = (id: string, critical?: boolean) => {
    if (critical && settings[id]) return;
    setSettings(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const score = Math.round(
    (Object.values(settings).filter(Boolean).length / Object.values(settings).length) * 100
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-cormorant font-semibold mb-5 animate-fade-in">Приватность и безопасность</h2>

      {/* Security score */}
      <div className="temk-card p-5 mb-5 animate-fade-in stagger-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative flex items-center gap-5">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(220 15% 16%)" strokeWidth="6" />
              <circle
                cx="40" cy="40" r="34"
                fill="none"
                stroke="hsl(175 80% 50%)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - score / 100)}`}
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">{score}%</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-1">
              {score >= 80 ? 'Защита надёжная' : score >= 60 ? 'Хорошая защита' : 'Нужно усилить защиту'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {score >= 80
                ? 'Ваши данные хорошо защищены. Продолжайте в том же духе.'
                : 'Включите дополнительные параметры безопасности для лучшей защиты.'}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="temk-badge">
                <Icon name="Shield" size={9} />
                AES-256
              </span>
              <span className="temk-badge">
                <Icon name="Key" size={9} />
                RSA-4096
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings sections */}
      {SECTIONS.map((section, si) => (
        <div key={section.title} className={`mb-4 animate-fade-in stagger-${si + 2}`}>
          <div className="flex items-center gap-2 mb-2 px-1">
            <Icon name={section.icon} size={14} className={section.color} />
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{section.title}</h3>
          </div>
          <div className="temk-card overflow-hidden">
            {section.settings.map((item, i) => (
              <div
                key={item.id}
                className={`flex items-start gap-4 p-4 border-b border-border/50 last:border-b-0 ${item.critical && settings[item.id] ? 'opacity-100' : ''}`}
              >
                <div className={`w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5 ${section.color}`}>
                  <Icon name={item.icon} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    {item.critical && (
                      <span className="temk-badge" style={{ fontSize: '9px' }}>критично</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
                <button
                  onClick={() => toggle(item.id, item.critical)}
                  className={`flex-shrink-0 mt-0.5 w-10 h-5.5 rounded-full relative transition-colors focus:outline-none ${
                    settings[item.id] ? 'bg-primary' : 'bg-secondary border border-border'
                  } ${item.critical && settings[item.id] ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
                  style={{ width: '40px', height: '22px', minWidth: '40px' }}
                >
                  <span
                    className={`absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform ${
                      settings[item.id] ? 'translate-x-[19px]' : 'translate-x-0.5'
                    }`}
                    style={{ width: '17px', height: '17px', top: '2.5px', left: '2px' }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Danger zone */}
      <div className="temk-card border-destructive/20 animate-fade-in stagger-5 mt-4">
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="AlertTriangle" size={14} className="text-destructive" />
            <h3 className="text-xs font-semibold text-destructive uppercase tracking-wider">Опасная зона</h3>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <button className="w-full text-left p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors flex items-center justify-between group">
            <div>
              <p className="text-sm font-medium text-foreground">Удалить все данные</p>
              <p className="text-xs text-muted-foreground">Безвозвратно удалить аккаунт и все данные</p>
            </div>
            <Icon name="Trash2" size={15} className="text-muted-foreground group-hover:text-destructive transition-colors" />
          </button>
          <button className="w-full text-left p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors flex items-center justify-between group">
            <div>
              <p className="text-sm font-medium text-foreground">Экспорт данных</p>
              <p className="text-xs text-muted-foreground">Скачать зашифрованный архив ваших данных</p>
            </div>
            <Icon name="Download" size={15} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}