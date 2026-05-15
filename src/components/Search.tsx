import { useState } from 'react';
import Icon from '@/components/ui/icon';

const USERS = [
  { id: 1, name: 'Марина Соколова', handle: '@marina_s', initials: 'МС', color: 'from-primary/40 to-accent/40', bio: 'Квантовая криптография · Исследователь', followers: '1.2K', verified: true, following: false },
  { id: 2, name: 'Дима Орлов', handle: '@dim_orl', initials: 'ДО', color: 'from-accent/40 to-neon-pink/40', bio: 'Сетевая безопасность · Разработчик протоколов', followers: '843', verified: false, following: true },
  { id: 3, name: 'Саша Лесных', handle: '@sasha_l', initials: 'СЛ', color: 'from-neon-pink/40 to-primary/40', bio: 'Активист за цифровые права · Журналист', followers: '3.1K', verified: true, following: false },
  { id: 4, name: 'Наташа Волк', handle: '@n_volk', initials: 'НВ', color: 'from-primary/20 to-neon-pink/30', bio: 'UX дизайнер · Создаю продукты для людей', followers: '567', verified: false, following: false },
];

const TRENDING = [
  { tag: '#квантовоешифрование', posts: '1.2K постов' },
  { tag: '#e2e', posts: '890 постов' },
  { tag: '#приватность2025', posts: '3.4K постов' },
  { tag: '#opensource', posts: '7.8K постов' },
  { tag: '#анонимность', posts: '2.1K постов' },
];

export default function Search() {
  const [query, setQuery] = useState('');
  const [following, setFollowing] = useState<Record<number, boolean>>(
    Object.fromEntries(USERS.map(u => [u.id, u.following]))
  );
  const [activeFilter, setActiveFilter] = useState<'all' | 'users' | 'posts'>('all');

  const filtered = USERS.filter(u =>
    !query || u.name.toLowerCase().includes(query.toLowerCase()) || u.handle.includes(query.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-cormorant font-semibold mb-5 animate-fade-in">Поиск</h2>

      {/* Search input */}
      <div className="relative mb-4 animate-fade-in stagger-1">
        <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск пользователей, постов, тегов..."
          className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={14} />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 animate-fade-in stagger-2">
        {[
          { id: 'all', label: 'Все' },
          { id: 'users', label: 'Люди' },
          { id: 'posts', label: 'Посты' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id as 'all' | 'users' | 'posts')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === f.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {!query ? (
        <>
          {/* Trending */}
          <div className="mb-6 animate-fade-in stagger-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">В тренде</h3>
            <div className="temk-card overflow-hidden">
              {TRENDING.map((item, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-3.5 hover:bg-secondary/50 transition-colors border-b border-border/50 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                    <div className="text-left">
                      <p className="text-sm font-medium text-primary">{item.tag}</p>
                      <p className="text-xs text-muted-foreground">{item.posts}</p>
                    </div>
                  </div>
                  <Icon name="TrendingUp" size={14} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          {/* Suggested users */}
          <div className="animate-fade-in stagger-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Рекомендуемые</h3>
            <div className="space-y-2">
              {USERS.map((user, i) => (
                <UserCard key={user.id} user={user} following={following[user.id]} onFollow={() => setFollowing(f => ({ ...f, [user.id]: !f[user.id] }))} index={i} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-2 animate-fade-in">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="SearchX" size={32} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Ничего не найдено по запросу «{query}»</p>
            </div>
          ) : (
            filtered.map((user, i) => (
              <UserCard key={user.id} user={user} following={following[user.id]} onFollow={() => setFollowing(f => ({ ...f, [user.id]: !f[user.id] }))} index={i} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

function UserCard({ user, following, onFollow, index }: {
  user: typeof USERS[0];
  following: boolean;
  onFollow: () => void;
  index: number;
}) {
  return (
    <div className={`temk-card p-4 flex items-center gap-3 animate-fade-in stagger-${Math.min(index + 1, 5)}`}>
      <div className="w-11 h-11 rounded-full avatar-ring flex-shrink-0">
        <div className={`w-full h-full rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-sm font-bold text-foreground`}>{user.initials}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-foreground">{user.name}</span>
          {user.verified && (
            <div className="w-3.5 h-3.5 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
              <Icon name="Check" size={8} className="text-primary" />
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{user.handle} · {user.followers} подписчиков</p>
        <p className="text-xs text-foreground/60 mt-0.5 truncate">{user.bio}</p>
      </div>
      <button
        onClick={onFollow}
        className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
          following
            ? 'bg-secondary text-muted-foreground hover:bg-destructive/10 hover:text-destructive border border-border'
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
      >
        {following ? 'Отписаться' : 'Подписаться'}
      </button>
    </div>
  );
}