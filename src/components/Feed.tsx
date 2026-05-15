import { useState } from 'react';
import Icon from '@/components/ui/icon';

const POSTS = [
  {
    id: 1,
    user: { name: 'Марина Соколова', handle: '@marina_s', initials: 'МС', color: 'from-neon-cyan/40 to-neon-purple/40' },
    time: '2 мин назад',
    text: 'Только что завершила исследование по квантовой криптографии. Результаты превзошли ожидания — сквозное шифрование на новом уровне 🔐',
    likes: 47,
    comments: 12,
    reposts: 8,
    encrypted: true,
    tags: ['#крипто', '#безопасность'],
  },
  {
    id: 2,
    user: { name: 'Дима Орлов', handle: '@dim_orl', initials: 'ДО', color: 'from-neon-purple/40 to-neon-pink/40' },
    time: '15 мин назад',
    text: 'Разрабатываю новый протокол анонимной передачи данных. Кто хочет поучаствовать в бета-тестировании? Нужны добровольцы с опытом в сетевой безопасности.',
    likes: 89,
    comments: 34,
    reposts: 21,
    encrypted: true,
    tags: ['#анонимность', '#протокол', '#бета'],
  },
  {
    id: 3,
    user: { name: 'Саша Лесных', handle: '@sasha_l', initials: 'СЛ', color: 'from-neon-pink/40 to-neon-cyan/40' },
    time: '1 час назад',
    text: 'Мысли о цифровой приватности: в мире, где каждый клик отслеживается — наше право на тайну становится роскошью. Cipher меняет это.',
    likes: 156,
    comments: 67,
    reposts: 43,
    encrypted: false,
    tags: ['#приватность', '#манифест'],
  },
];

const ACTIVITY = [
  { icon: 'Heart', text: 'Марина лайкнула ваш пост', time: '5 мин', color: 'text-neon-pink' },
  { icon: 'UserPlus', text: 'Дима Орлов подписался', time: '1 ч', color: 'text-primary' },
  { icon: 'MessageSquare', text: 'Новый комментарий от Саши', time: '2 ч', color: 'text-neon-purple' },
  { icon: 'Repeat2', text: 'Ваш пост репостнули 5 раз', time: '3 ч', color: 'text-primary' },
];

export default function Feed() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [newPost, setNewPost] = useState('');
  const [activeView, setActiveView] = useState<'feed' | 'activity'>('feed');

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div>
          <h2 className="text-2xl font-cormorant font-semibold text-foreground">Лента</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Все сообщения зашифрованы E2E</p>
        </div>
        <div className="flex gap-1 p-1 bg-secondary rounded-lg">
          <button
            onClick={() => setActiveView('feed')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeView === 'feed' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Посты
          </button>
          <button
            onClick={() => setActiveView('activity')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeView === 'activity' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Активность
          </button>
        </div>
      </div>

      {activeView === 'feed' ? (
        <>
          {/* Compose */}
          <div className="temk-card p-4 mb-4 animate-fade-in stagger-1">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full avatar-ring flex-shrink-0">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-sm font-bold text-primary">АК</div>
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Что у тебя на уме? Сообщение зашифруется автоматически..."
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none min-h-[60px]"
                  rows={3}
                />
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                      <Icon name="Image" size={16} />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                      <Icon name="Hash" size={16} />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                      <Icon name="MapPin" size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="temk-badge">
                      <Icon name="Lock" size={10} />
                      Зашифровано
                    </span>
                    <button className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                      Опубликовать
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          {POSTS.map((post, i) => (
            <div key={post.id} className={`temk-card p-5 mb-3 animate-fade-in stagger-${i + 2}`}>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full avatar-ring flex-shrink-0">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${post.user.color} flex items-center justify-center text-sm font-bold text-foreground`}>
                    {post.user.initials}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-medium text-sm text-foreground">{post.user.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{post.user.handle}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {post.encrypted && (
                        <span className="temk-badge">
                          <Icon name="Lock" size={9} />
                          E2E
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/90 mt-2 leading-relaxed">{post.text}</p>

                  <div className="flex gap-2 mt-2 flex-wrap">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs text-primary/80 hover:text-primary cursor-pointer transition-colors">{tag}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-5 mt-4 pt-3 border-t border-border">
                    <button
                      onClick={() => setLiked(l => ({ ...l, [post.id]: !l[post.id] }))}
                      className={`flex items-center gap-1.5 text-xs transition-colors ${liked[post.id] ? 'text-neon-pink' : 'text-muted-foreground hover:text-neon-pink'}`}
                    >
                      <Icon name={liked[post.id] ? 'Heart' : 'Heart'} size={15} className={liked[post.id] ? 'fill-current' : ''} />
                      {post.likes + (liked[post.id] ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <Icon name="MessageCircle" size={15} />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <Icon name="Repeat2" size={15} />
                      {post.reposts}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors ml-auto">
                      <Icon name="Bookmark" size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="space-y-2 animate-fade-in">
          {ACTIVITY.map((act, i) => (
            <div key={i} className={`temk-card p-4 flex items-center gap-4 stagger-${i + 1}`}>
              <div className={`w-9 h-9 rounded-full bg-secondary flex items-center justify-center ${act.color}`}>
                <Icon name={act.icon} size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{act.text}</p>
              </div>
              <span className="text-xs text-muted-foreground">{act.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}