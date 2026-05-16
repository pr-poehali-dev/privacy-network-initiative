import { useState } from 'react';
import Icon from '@/components/ui/icon';

const GENRES = ['Всё', 'Поп', 'Рок', 'Электронная', 'Джаз', 'Классика', 'Хип-хоп'];

const TRACKS = [
  { id: 1, title: 'Солнечный день', artist: 'Марина Соколова', initials: 'МС', color: 'from-yellow-300 to-amber-300', duration: '3:24', plays: '14K', genre: 'Поп', liked: false },
  { id: 2, title: 'Город не спит', artist: 'Дима Орлов', initials: 'ДО', color: 'from-amber-300 to-orange-300', duration: '4:11', plays: '8.2K', genre: 'Электронная', liked: true },
  { id: 3, title: 'Дорога домой', artist: 'Саша Лесных', initials: 'СЛ', color: 'from-yellow-200 to-amber-400', duration: '5:02', plays: '21K', genre: 'Джаз', liked: false },
  { id: 4, title: 'Первый снег', artist: 'Нина Волк', initials: 'НВ', color: 'from-amber-200 to-yellow-300', duration: '3:48', plays: '6K', genre: 'Классика', liked: false },
  { id: 5, title: 'Freestyle 2026', artist: 'Иван Петров', initials: 'ИП', color: 'from-orange-300 to-amber-200', duration: '2:59', plays: '33K', genre: 'Хип-хоп', liked: true },
  { id: 6, title: 'Гитарный вечер', artist: 'Алекс Кравцов', initials: 'АК', color: 'from-yellow-300 to-orange-200', duration: '4:35', plays: '11K', genre: 'Рок', liked: false },
  { id: 7, title: 'Лето в городе', artist: 'Марина Соколова', initials: 'МС', color: 'from-yellow-300 to-amber-300', duration: '3:17', plays: '19K', genre: 'Поп', liked: false },
  { id: 8, title: 'Ночной джаз', artist: 'Саша Лесных', initials: 'СЛ', color: 'from-yellow-200 to-amber-400', duration: '6:22', plays: '9K', genre: 'Джаз', liked: true },
];

export default function MusicTab() {
  const [activeGenre, setActiveGenre] = useState('Всё');
  const [playing, setPlaying] = useState<number | null>(null);
  const [liked, setLiked] = useState<Record<number, boolean>>(
    Object.fromEntries(TRACKS.map(t => [t.id, t.liked]))
  );
  const [progress, setProgress] = useState(32);

  const filtered = activeGenre === 'Всё' ? TRACKS : TRACKS.filter(t => t.genre === activeGenre);
  const currentTrack = TRACKS.find(t => t.id === playing) ?? TRACKS[0];

  const togglePlay = (id: number) => {
    setPlaying(prev => prev === id ? null : id);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-cormorant font-bold text-foreground">Музыка</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{TRACKS.length} треков от авторов TEMK</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
          <Icon name="Upload" size={15} />
          Загрузить трек
        </button>
      </div>

      {/* Player */}
      <div className="temk-card p-5 mb-6 bg-gradient-to-br from-yellow-50 to-amber-50 animate-fade-in stagger-1">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${currentTrack.color} flex items-center justify-center text-xl font-bold text-amber-800 shadow-md flex-shrink-0 ${playing !== null ? 'animate-ring-pulse' : ''}`}>
            {currentTrack.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-base text-foreground truncate">{playing !== null ? currentTrack.title : 'Выберите трек'}</p>
            <p className="text-sm text-muted-foreground truncate">{playing !== null ? currentTrack.artist : 'TEMK Music'}</p>
          </div>
          <button
            onClick={() => setLiked(l => ({ ...l, [currentTrack.id]: !l[currentTrack.id] }))}
            className={`transition-colors ${liked[currentTrack.id] ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
          >
            <Icon name="Heart" size={20} className={liked[currentTrack.id] ? 'fill-primary' : ''} />
          </button>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div
            className="w-full h-1.5 bg-border rounded-full cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100));
            }}
          >
            <div className="h-full bg-primary rounded-full relative transition-all" style={{ width: `${progress}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-md" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1:{String(Math.round(progress * 0.6)).padStart(2, '0')}</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="Shuffle" size={18} />
          </button>
          <button
            onClick={() => {
              const idx = TRACKS.findIndex(t => t.id === playing);
              if (idx > 0) setPlaying(TRACKS[idx - 1].id);
            }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="SkipBack" size={22} />
          </button>
          <button
            onClick={() => togglePlay(currentTrack.id)}
            className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/30"
          >
            <Icon name={playing !== null ? 'Pause' : 'Play'} size={22} className={playing === null ? 'ml-0.5' : ''} />
          </button>
          <button
            onClick={() => {
              const idx = TRACKS.findIndex(t => t.id === playing);
              if (idx < TRACKS.length - 1) setPlaying(TRACKS[idx + 1].id);
            }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="SkipForward" size={22} />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="Repeat" size={18} />
          </button>
        </div>
      </div>

      {/* Genres */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {GENRES.map(g => (
          <button
            key={g}
            onClick={() => setActiveGenre(g)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeGenre === g
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Track list */}
      <div className="temk-card overflow-hidden">
        {filtered.map((track, i) => (
          <div
            key={track.id}
            className={`flex items-center gap-3 p-3.5 border-b border-border/50 last:border-b-0 hover:bg-secondary/40 transition-colors cursor-pointer ${playing === track.id ? 'bg-primary/5' : ''}`}
            onClick={() => togglePlay(track.id)}
          >
            <span className="w-5 text-center text-xs text-muted-foreground flex-shrink-0">{playing === track.id ? <Icon name="Volume2" size={13} className="text-primary mx-auto" /> : i + 1}</span>
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${track.color} flex items-center justify-center text-xs font-bold text-amber-800 flex-shrink-0`}>
              {track.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${playing === track.id ? 'text-primary' : 'text-foreground'}`}>{track.title}</p>
              <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-xs text-muted-foreground hidden sm:block">{track.plays}</span>
              <button
                onClick={e => { e.stopPropagation(); setLiked(l => ({ ...l, [track.id]: !l[track.id] })); }}
                className={`transition-colors ${liked[track.id] ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                <Icon name="Heart" size={14} className={liked[track.id] ? 'fill-primary' : ''} />
              </button>
              <span className="text-xs text-muted-foreground font-mono">{track.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
