import { useState } from 'react';
import Feed from '@/components/Feed';
import Profile from '@/components/Profile';
import Messages from '@/components/Messages';
import Search from '@/components/Search';
import Privacy from '@/components/Privacy';
import Icon from '@/components/ui/icon';

type Tab = 'feed' | 'profile' | 'messages' | 'search' | 'privacy';

const NAV_ITEMS = [
  { id: 'feed' as Tab, icon: 'Layers', label: 'Лента' },
  { id: 'search' as Tab, icon: 'Search', label: 'Поиск' },
  { id: 'messages' as Tab, icon: 'MessageSquare', label: 'Сообщения' },
  { id: 'profile' as Tab, icon: 'User', label: 'Профиль' },
  { id: 'privacy' as Tab, icon: 'Shield', label: 'Приватность' },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>('feed');

  return (
    <div className="min-h-screen bg-background grid-bg flex">
      <div className="scan-line" />

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-background/80 backdrop-blur-md fixed left-0 top-0 bottom-0 z-40">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center animate-pulse-glow">
              <Icon name="Lock" size={16} className="text-primary" />
            </div>
            <div>
              <h1 className="font-cormorant font-semibold text-xl text-foreground tracking-wide glow-cyan">CIPHER</h1>
              <span className="enc-badge">E2E encrypted</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item w-full ${activeTab === item.id ? 'active' : ''}`}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
              {item.id === 'messages' && (
                <span className="ml-auto w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">3</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors">
            <div className="w-9 h-9 rounded-full avatar-ring overflow-hidden flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-sm font-bold text-primary">АК</div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Алекс Кравцов</p>
              <p className="text-xs text-muted-foreground truncate">@alex_k</p>
            </div>
            <Icon name="MoreHorizontal" size={16} className="text-muted-foreground" />
          </div>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 pb-20 md:pb-0">
        {activeTab === 'feed' && <Feed />}
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'messages' && <Messages />}
        {activeTab === 'search' && <Search />}
        {activeTab === 'privacy' && <Privacy />}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-40 flex">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors relative ${
              activeTab === item.id ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {activeTab === item.id && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
            )}
            <Icon name={item.icon} size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
