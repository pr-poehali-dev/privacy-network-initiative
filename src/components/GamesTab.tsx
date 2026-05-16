import { useState } from 'react';
import Icon from '@/components/ui/icon';

const CATEGORIES = ['Все', 'Головоломки', 'Аркады', 'Стратегии', 'Викторины'];

const GAMES = [
  {
    id: 1, title: '2048', desc: 'Складывай плитки и доберись до числа 2048', category: 'Головоломки',
    icon: 'Grid3x3', color: 'from-yellow-300 to-amber-400', players: '1.2K', rating: 4.8, tag: 'Популярное',
  },
  {
    id: 2, title: 'Крестики-нолики', desc: 'Классика на двоих прямо в TEMK', category: 'Стратегии',
    icon: 'X', color: 'from-amber-300 to-orange-300', players: '890', rating: 4.5, tag: 'Мультиплеер',
  },
  {
    id: 3, title: 'Угадай слово', desc: 'Угадай слово из 5 букв за 6 попыток', category: 'Викторины',
    icon: 'Type', color: 'from-yellow-200 to-amber-300', players: '3.4K', rating: 4.9, tag: 'Топ',
  },
  {
    id: 4, title: 'Змейка', desc: 'Управляй змейкой — не врежься в стены!', category: 'Аркады',
    icon: 'Zap', color: 'from-amber-400 to-yellow-300', players: '567', rating: 4.3, tag: 'Ретро',
  },
  {
    id: 5, title: 'Викторина TEMK', desc: 'Проверь знания с другими пользователями', category: 'Викторины',
    icon: 'HelpCircle', color: 'from-yellow-300 to-orange-200', players: '2.1K', rating: 4.7, tag: 'Мультиплеер',
  },
  {
    id: 6, title: 'Пазл', desc: 'Собери картинку из 16 кусочков на время', category: 'Головоломки',
    icon: 'Puzzle', color: 'from-orange-200 to-amber-300', players: '445', rating: 4.2, tag: 'Новинка',
  },
];

const LEADERBOARD = [
  { pos: 1, name: 'Дима Орлов', initials: 'ДО', color: 'from-yellow-300 to-amber-300', score: 48200 },
  { pos: 2, name: 'Марина Соколова', initials: 'МС', color: 'from-amber-300 to-orange-300', score: 41500 },
  { pos: 3, name: 'Алекс Кравцов', initials: 'АК', color: 'from-yellow-200 to-amber-400', score: 38900 },
  { pos: 4, name: 'Нина Волк', initials: 'НВ', color: 'from-amber-200 to-yellow-300', score: 31200 },
];

// Simple in-app 2048-like mini game: Wordle-style word guess
const WORD = 'ТЕМКА';
const WORD_LEN = 5;

function WordleGame({ onClose }: { onClose: () => void }) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const [won, setWon] = useState(false);

  const submit = () => {
    if (current.length !== WORD_LEN) return;
    const next = [...guesses, current];
    setGuesses(next);
    if (current.toUpperCase() === WORD) setWon(true);
    setCurrent('');
  };

  const getLetterState = (guess: string, pos: number) => {
    const g = guess.toUpperCase();
    if (g[pos] === WORD[pos]) return 'correct';
    if (WORD.includes(g[pos])) return 'present';
    return 'absent';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="temk-card w-full max-w-xs p-5 animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-cormorant font-bold text-lg">Угадай слово</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="X" size={18} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mb-4 text-center">Угадай слово из {WORD_LEN} букв за 6 попыток</p>

        {/* Grid */}
        <div className="space-y-1.5 mb-4">
          {Array.from({ length: 6 }).map((_, row) => (
            <div key={row} className="flex gap-1.5 justify-center">
              {Array.from({ length: WORD_LEN }).map((_, col) => {
                const guess = guesses[row];
                const letter = guess ? guess[col] : (row === guesses.length && !won ? current[col] : '');
                const state = guess ? getLetterState(guess, col) : 'empty';
                return (
                  <div
                    key={col}
                    className={`w-11 h-11 rounded-lg border-2 flex items-center justify-center text-sm font-bold uppercase transition-all ${
                      state === 'correct' ? 'bg-primary border-primary text-primary-foreground' :
                      state === 'present' ? 'bg-amber-200 border-amber-400 text-amber-900' :
                      state === 'absent' ? 'bg-muted border-border text-muted-foreground' :
                      letter ? 'border-primary/50 bg-primary/5 text-foreground' : 'border-border bg-white text-foreground'
                    }`}
                  >
                    {letter || ''}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {won ? (
          <div className="text-center">
            <p className="text-primary font-bold mb-2">🎉 Верно! Ты угадал!</p>
            <button onClick={() => { setGuesses([]); setCurrent(''); setWon(false); }} className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium">Ещё раз</button>
          </div>
        ) : guesses.length >= 6 ? (
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-2">Слово было: <span className="font-bold text-foreground">{WORD}</span></p>
            <button onClick={() => { setGuesses([]); setCurrent(''); }} className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium">Заново</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={current}
              onChange={e => setCurrent(e.target.value.slice(0, WORD_LEN))}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="Введи слово..."
              maxLength={WORD_LEN}
              className="flex-1 bg-muted rounded-xl px-3 py-2 text-sm outline-none border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/20 uppercase tracking-widest"
            />
            <button
              onClick={submit}
              disabled={current.length !== WORD_LEN}
              className="px-3 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium disabled:opacity-40"
            >
              <Icon name="Check" size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GamesTab() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [openGame, setOpenGame] = useState<number | null>(null);

  const filtered = activeCategory === 'Все' ? GAMES : GAMES.filter(g => g.category === activeCategory);

  const medalColor = (pos: number) => {
    if (pos === 1) return 'text-yellow-500';
    if (pos === 2) return 'text-gray-400';
    return 'text-amber-600';
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      {openGame === 3 && <WordleGame onClose={() => setOpenGame(null)} />}

      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-cormorant font-bold text-foreground">Игры</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Играй прямо в TEMK</p>
        </div>
        <div className="temk-badge">
          <Icon name="Gamepad2" size={10} />
          {GAMES.length} игр
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none">
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

      {/* Games grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {filtered.map((game, i) => (
          <div key={game.id} className={`temk-card p-4 flex gap-3 animate-fade-in stagger-${Math.min(i + 1, 5)} cursor-pointer`}
            onClick={() => setOpenGame(game.id)}
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
              <Icon name={game.icon} size={26} className="text-amber-800" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1 mb-1">
                <p className="text-sm font-semibold text-foreground">{game.title}</p>
                <span className="temk-badge flex-shrink-0 text-[9px]">{game.tag}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-snug mb-2">{game.desc}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="Users" size={11} />
                  {game.players}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Star" size={11} className="text-primary" />
                  {game.rating}
                </span>
                <span className="ml-auto text-primary font-medium">Играть →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="temk-card overflow-hidden animate-fade-in stagger-3">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <Icon name="Trophy" size={16} className="text-primary" />
          <h3 className="font-semibold text-sm text-foreground">Лидеры недели</h3>
        </div>
        {LEADERBOARD.map((player) => (
          <div key={player.pos} className={`flex items-center gap-3 p-3.5 border-b border-border/50 last:border-b-0 ${player.pos === 1 ? 'bg-primary/5' : ''}`}>
            <span className={`w-6 text-center font-bold text-sm ${medalColor(player.pos)}`}>
              {player.pos <= 3 ? ['🥇', '🥈', '🥉'][player.pos - 1] : player.pos}
            </span>
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${player.color} flex items-center justify-center text-xs font-bold text-amber-800 flex-shrink-0`}>
              {player.initials}
            </div>
            <p className="flex-1 text-sm font-medium text-foreground">{player.name}</p>
            <span className="text-sm font-bold text-primary font-mono">{player.score.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
