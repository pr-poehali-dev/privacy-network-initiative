import Icon from '@/components/ui/icon';

const POSTS = [
  { id: 1, text: 'Работаю над новым open-source проектом для анонимной коммуникации. DM если интересно.', likes: 34, comments: 8, time: '3 ч назад' },
  { id: 2, text: 'Cipher — это не просто соцсеть. Это манифест в коде. Каждый байт здесь принадлежит тебе.', likes: 127, comments: 45, time: '2 дня назад' },
  { id: 3, text: 'Провёл мастер-класс по операционной безопасности. Спасибо всем участникам 🙏', likes: 89, comments: 12, time: '5 дней назад' },
];

const STATS = [
  { label: 'Постов', value: '147' },
  { label: 'Подписчиков', value: '2.4K' },
  { label: 'Подписок', value: '312' },
];

export default function Profile() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Cover + Avatar */}
      <div className="cipher-card overflow-hidden mb-4 animate-fade-in">
        <div className="h-32 bg-gradient-to-br from-primary/20 via-accent/20 to-neon-pink/20 relative">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, hsl(175 80% 50% / 0.03) 20px, hsl(175 80% 50% / 0.03) 21px)',
            }}
          />
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-16 h-16 rounded-full border border-primary/20 opacity-60" />
          <div className="absolute top-8 right-8 w-8 h-8 rounded-full border border-primary/15 opacity-40" />
        </div>

        <div className="px-5 pb-5">
          <div className="flex items-end justify-between -mt-8 mb-4">
            <div className="w-16 h-16 rounded-full avatar-ring p-0.5 bg-background">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-xl font-bold text-primary">АК</div>
            </div>
            <div className="flex gap-2 mt-8">
              <button className="px-4 py-1.5 text-xs font-medium border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
                Редактировать
              </button>
              <button className="px-4 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors glow-box-cyan">
                Поделиться
              </button>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">Алекс Кравцов</h2>
              <div className="w-4 h-4 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                <Icon name="Check" size={10} className="text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">@alex_k</p>
          </div>

          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            Исследователь кибербезопасности · Разработчик открытого ПО · Сторонник цифровой приватности.<br />
            <span className="text-primary/70">«Код — это язык свободы»</span>
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1"><Icon name="MapPin" size={12} /> Москва</span>
            <span className="flex items-center gap-1"><Icon name="LinkIcon" size={12} /> cipher.social/alex_k</span>
            <span className="flex items-center gap-1"><Icon name="Calendar" size={12} /> С мая 2025</span>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-base font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-2 mb-4 animate-fade-in stagger-1 flex-wrap">
        {['Верифицирован', 'E2E активен', 'Без трекинга', 'Анон. режим'].map((badge, i) => (
          <span key={i} className="enc-badge">{badge}</span>
        ))}
      </div>

      {/* Posts */}
      <h3 className="text-sm font-medium text-muted-foreground mb-3 animate-fade-in stagger-2">Публикации</h3>
      <div className="space-y-3">
        {POSTS.map((post, i) => (
          <div key={post.id} className={`cipher-card p-4 animate-fade-in stagger-${i + 3}`}>
            <p className="text-sm text-foreground/90 leading-relaxed mb-3">{post.text}</p>
            <div className="flex items-center gap-5 text-xs text-muted-foreground">
              <button className="flex items-center gap-1 hover:text-neon-pink transition-colors">
                <Icon name="Heart" size={13} /> {post.likes}
              </button>
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                <Icon name="MessageCircle" size={13} /> {post.comments}
              </button>
              <span className="ml-auto">{post.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
