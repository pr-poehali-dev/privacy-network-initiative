import { useState } from 'react';
import Auth from '@/components/Auth';
import Feed from '@/components/Feed';
import Profile from '@/components/Profile';
import Messages from '@/components/Messages';
import Search from '@/components/Search';
import Privacy from '@/components/Privacy';
import Icon from '@/components/ui/icon';

type Tab = 'feed' | 'profile' | 'messages' | 'search' | 'privacy';

interface User {
  name: string;
  email: string;
  handle: string;
}

const NAV_ITEMS = [
  { id: 'feed' as Tab, icon: 'Layers', label: 'Лента' },
  { id: 'search' as Tab, icon: 'Search', label: 'Поиск' },
  { id: 'messages' as Tab, icon: 'MessageSquare', label: 'Сообщения' },
  { id: 'profile' as Tab, icon: 'User', label: 'Профиль' },
  { id: 'privacy' as Tab, icon: 'Shield', label: 'Безопасность' },
];

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('feed');

  if (!user) {
    return <Auth onAuth={setUser} />;
  }

  const initials = user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background dot-bg flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-white fixed left-0 top-0 bottom-0 z-40 shadow-sm">
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/30">
              <span className="text-lg font-bold text-primary-foreground font-cormorant">T</span>
            </div>
            <div>
              <h1 className="font-cormorant font-bold text-xl text-foreground tracking-widest">TEMK</h1>
              <p className="text-xs text-muted-foreground">Социальная сеть</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
              {item.id === 'messages' && (
                <span className="ml-auto w-5 h-5 rounded-full bg-foreground text-background text-xs flex items-center justify-center font-bold">3</span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-4 pb-4">
          <button
            onClick={() => setActiveTab('feed')}
            className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
          >
            <Icon name="Plus" size={16} />
            Новый пост
          </button>
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/60 cursor-pointer hover:bg-secondary transition-colors">
            <div className="w-9 h-9 rounded-full avatar-ring flex-shrink-0">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300/60 to-amber-400/60 flex items-center justify-center text-sm font-bold text-amber-800">{initials}</div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.handle}</p>
            </div>
            <button
              onClick={() => setUser(null)}
              title="Выйти"
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <Icon name="LogOut" size={15} />
            </button>
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

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border z-40 flex shadow-lg">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors relative ${
              activeTab === item.id ? 'text-primary font-medium' : 'text-muted-foreground'
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
