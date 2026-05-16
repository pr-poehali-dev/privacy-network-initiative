import { useState } from 'react';
import Icon from '@/components/ui/icon';

const CATEGORIES = ['Всё', 'Тренды', 'Музыка', 'Спорт', 'Игры', 'Образование'];

const VIDEOS = [
  { id: 1, title: 'Закат на озере Байкал — таймлапс 4K', author: 'Марина Соколова', handle: '@marina_s', initials: 'МС', views: '128K', duration: '4:32', likes: 3400, color: 'from-yellow-200 to-amber-300', thumb: 'bg-gradient-to-br from-orange-200 via-yellow-100 to-amber-200', category: 'Тренды' },
  { id: 2, title: 'Как я научился рисовать за 30 дней', author: 'Дима Орлов', handle: '@dim_orl', initials: 'ДО', views: '54K', duration: '12:18', likes: 1800, color: 'from-amber-200 to-orange-300', thumb: 'bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-200', category: 'Образование' },
  { id: 3, title: 'Мой стрим по Minecraft — лучшие моменты', author: 'Саша Лесных', handle: '@sasha_l', initials: 'СЛ', views: '89K', duration: '24:05', likes: 5200, color: 'from-yellow-300 to-amber-200', thumb: 'bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100', category: 'Игры' },
  { id: 4, title: 'Лайфхаки для продуктивности — топ 10', author: 'Иван Петров', handle: '@ivan_p', initials: 'ИП', views: '212K', duration: '8:47', likes: 7800, color: 'from-amber-300 to-yellow-200', thumb: 'bg-gradient-to-br from-orange-100 via-yellow-100 to-amber-100', category: 'Тренды' },
  { id: 5, title: 'Акустический кавер — Imagine (John Lennon)', author: 'Нина Волк', handle: '@n_volk', initials: 'НВ', views: '34K', duration: '3:54', likes: 2100, color: 'from-yellow-200 to-orange-200', thumb: 'bg-gradient-to-br from-yellow-200 via-amber-100 to-orange-200', category: 'Музыка' },
  { id: 6, title: 'Тренировка дома без инвентаря — 20 минут', author: 'Алекс Кравцов', handle: '@alex_k', initials: 'АК', views: '67K', duration: '20:00', likes: 4300, color: 'from-amber-200 to-yellow-300', thumb: 'bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-100', category: 'Спорт' },
];

export default function VideoTab() {
  const [activeCategory, setActiveCategory] = useState('Всё');
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [playing, setPlaying] = useState<number | null>(null);

  const filtered = activeCategory === 'Всё' ? VIDEOS : VIDEOS.filter(v => v.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-cormorant font-bold text-foreground">Видео</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{VIDEOS.length} роликов от авторов TEMK</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
          <Icon name="Plus" size={15} />
          Загрузить
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured video */}
      {activeCategory === 'Всё' && (
        <div className="temk-card overflow-hidden mb-6 animate-fade-in stagger-1">
          <div className={`relative h-52 ${VIDEOS[0].thumb} flex items-center justify-center cursor-pointer group`}
            onClick={() => setPlaying(playing === VIDEOS[0].id ? null : VIDEOS[0].id)}
          >
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
            {playing === VIDEOS[0].id ? (
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-xl">
                  <Icon name="Pause" size={28} className="text-primary-foreground" />
                </div>
                <div className="w-48 h-1 bg-white/40 rounded-full mt-2">
                  <div className="w-1/3 h-full bg-primary rounded-full" />
                </div>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform relative z-10">
                <Icon name="Play" size={28} className="text-primary-foreground ml-1" />
              </div>
            )}
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md font-mono">
              {VIDEOS[0].duration}
            </div>
            <div className="absolute top-3 left-3 temk-badge">
              <Icon name="Flame" size={9} />
              Тренд
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-base text-foreground mb-2">{VIDEOS[0].title}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${VIDEOS[0].color} flex items-center justify-center text-xs font-bold text-amber-800`}>{VIDEOS[0].initials}</div>
                <div>
                  <p className="text-xs font-medium text-foreground">{VIDEOS[0].author}</p>
                  <p className="text-xs text-muted-foreground">{VIDEOS[0].views} просмотров</p>
                </div>
              </div>
              <button
                onClick={() => setLiked(l => ({ ...l, [VIDEOS[0].id]: !l[VIDEOS[0].id] }))}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${liked[VIDEOS[0].id] ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                <Icon name="Heart" size={16} className={liked[VIDEOS[0].id] ? 'fill-primary' : ''} />
                {VIDEOS[0].likes + (liked[VIDEOS[0].id] ? 1 : 0)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.slice(activeCategory === 'Всё' ? 1 : 0).map((video, i) => (
          <div key={video.id} className={`temk-card overflow-hidden animate-fade-in stagger-${Math.min(i + 1, 5)}`}>
            <div
              className={`relative h-36 ${video.thumb} flex items-center justify-center cursor-pointer group`}
              onClick={() => setPlaying(playing === video.id ? null : video.id)}
            >
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
              {playing === video.id ? (
                <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center shadow-lg relative z-10">
                  <Icon name="Pause" size={18} className="text-primary-foreground" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform relative z-10">
                  <Icon name="Play" size={18} className="text-primary-foreground ml-0.5" />
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded font-mono text-[10px]">
                {video.duration}
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-foreground leading-snug mb-2 line-clamp-2">{video.title}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${video.color} flex items-center justify-center text-[9px] font-bold text-amber-800`}>{video.initials}</div>
                  <div>
                    <p className="text-[11px] font-medium text-foreground">{video.author}</p>
                    <p className="text-[10px] text-muted-foreground">{video.views} просм.</p>
                  </div>
                </div>
                <button
                  onClick={() => setLiked(l => ({ ...l, [video.id]: !l[video.id] }))}
                  className={`flex items-center gap-1 text-xs transition-colors ${liked[video.id] ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  <Icon name="Heart" size={13} className={liked[video.id] ? 'fill-primary' : ''} />
                  {video.likes + (liked[video.id] ? 1 : 0)}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
