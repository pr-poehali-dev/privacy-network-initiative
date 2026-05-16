import { useState } from 'react';
import Icon from '@/components/ui/icon';

const CATS = [
  { id: 1, name: 'Пуговка', owner: 'Марина Соколова', initials: 'МС', breed: 'Британский короткошёрстный', age: '2 года', emoji: '🐱', bg: 'bg-gradient-to-br from-yellow-100 to-amber-200', likes: 312, fact: 'Обожает греться на подоконнике и смотреть на птиц' },
  { id: 2, name: 'Барсик', owner: 'Дима Орлов', initials: 'ДО', breed: 'Мейн-кун', age: '4 года', emoji: '🦁', bg: 'bg-gradient-to-br from-amber-100 to-orange-200', likes: 541, fact: 'Самый крупный кот в районе. Весит почти 8 кг!' },
  { id: 3, name: 'Снежинка', owner: 'Саша Лесных', initials: 'СЛ', breed: 'Турецкая ангора', age: '1 год', emoji: '🤍', bg: 'bg-gradient-to-br from-yellow-50 to-amber-100', likes: 228, fact: 'Чисто белая и очень пушистая. Боится пылесоса' },
  { id: 4, name: 'Рыжик', owner: 'Иван Петров', initials: 'ИП', breed: 'Европейская короткошёрстная', age: '3 года', emoji: '🧡', bg: 'bg-gradient-to-br from-orange-100 to-amber-200', likes: 189, fact: 'Ходит за хозяином как собачка и мурлычет 24/7' },
  { id: 5, name: 'Луна', owner: 'Нина Волк', initials: 'НВ', breed: 'Сиамская', age: '5 лет', emoji: '🌙', bg: 'bg-gradient-to-br from-amber-50 to-yellow-200', likes: 407, fact: 'Очень общительная, встречает всех гостей у двери' },
  { id: 6, name: 'Граф', owner: 'Алекс Кравцов', initials: 'АК', breed: 'Русская голубая', age: '6 лет', emoji: '🎩', bg: 'bg-gradient-to-br from-yellow-100 to-amber-300', likes: 295, fact: 'Серьёзный кот с важным видом. Спит только на диване' },
];

const FACTS = [
  'Кошки спят до 16 часов в сутки 😴',
  'Кошки не чувствуют сладкий вкус 🍬',
  'Мурлыканье кошки лечит кости и снимает стресс 💊',
  'У кошек 32 мышцы в каждом ухе 👂',
  'Кошки могут издавать более 100 различных звуков 🎶',
  'Средняя скорость кошки — 48 км/ч 🏃',
  'Кошки потеют только через подушечки лап 🐾',
  'Нос кошки уникален, как отпечатки пальцев у людей 👃',
];

export default function CatsTab() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [factIdx, setFactIdx] = useState(0);
  const [selected, setSelected] = useState<typeof CATS[0] | null>(null);

  const nextFact = () => setFactIdx(i => (i + 1) % FACTS.length);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">

      {/* Cat detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setSelected(null)}>
          <div className="temk-card w-full max-w-xs p-6 animate-scale-in text-center" onClick={e => e.stopPropagation()}>
            <div className={`w-24 h-24 rounded-2xl ${selected.bg} flex items-center justify-center text-5xl mx-auto mb-4 shadow-md`}>
              {selected.emoji}
            </div>
            <h3 className="text-xl font-cormorant font-bold text-foreground mb-1">{selected.name}</h3>
            <p className="text-sm text-muted-foreground mb-1">{selected.breed}</p>
            <p className="text-xs text-muted-foreground mb-3">Возраст: {selected.age} · Хозяин: {selected.owner}</p>
            <div className="bg-primary/8 rounded-xl p-3 mb-4 text-sm text-foreground/80 leading-relaxed italic" style={{ background: 'hsl(45 95% 50% / 0.08)' }}>
              «{selected.fact}»
            </div>
            <button
              onClick={() => { setLiked(l => ({ ...l, [selected.id]: !l[selected.id] })); }}
              className={`flex items-center gap-2 mx-auto px-5 py-2 rounded-xl font-medium text-sm transition-all ${liked[selected.id] ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-primary/10'}`}
            >
              <Icon name="Heart" size={15} className={liked[selected.id] ? 'fill-white' : ''} />
              {selected.likes + (liked[selected.id] ? 1 : 0)} лайков
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-cormorant font-bold text-foreground">Котики 🐾</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Самый важный раздел TEMK</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
          <Icon name="Plus" size={15} />
          Добавить котика
        </button>
      </div>

      {/* Fact card */}
      <div
        className="temk-card p-4 mb-6 bg-gradient-to-br from-yellow-50 to-amber-50 cursor-pointer animate-fade-in stagger-1 select-none"
        onClick={nextFact}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 text-xl">
            🐈
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wide">Факт о кошках</p>
            <p className="text-sm text-foreground leading-relaxed">{FACTS[factIdx]}</p>
          </div>
          <button className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0 mt-0.5">
            <Icon name="RefreshCw" size={14} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-right">Нажми, чтобы узнать ещё ✨</p>
      </div>

      {/* Cat grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATS.map((cat, i) => (
          <div
            key={cat.id}
            className={`temk-card overflow-hidden cursor-pointer animate-fade-in stagger-${Math.min(i + 1, 5)}`}
            onClick={() => setSelected(cat)}
          >
            {/* Cat image area */}
            <div className={`relative h-40 ${cat.bg} flex items-center justify-center`}>
              <span className="text-7xl select-none" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}>
                {cat.emoji}
              </span>
              <div className="absolute top-2 right-2">
                <span className="temk-badge text-[9px]">{cat.breed}</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-base text-foreground">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground">{cat.age}</p>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); setLiked(l => ({ ...l, [cat.id]: !l[cat.id] })); }}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${liked[cat.id] ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  <Icon name="Heart" size={16} className={liked[cat.id] ? 'fill-primary' : ''} />
                  {cat.likes + (liked[cat.id] ? 1 : 0)}
                </button>
              </div>

              {/* Owner */}
              <div className="flex items-center gap-2 pt-3 border-t border-border">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300/60 to-amber-400/60 flex items-center justify-center text-[10px] font-bold text-amber-800 flex-shrink-0">
                  {cat.initials}
                </div>
                <p className="text-xs text-muted-foreground">{cat.owner}</p>
                <span className="ml-auto text-xs text-primary/70 font-medium">Подробнее →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom banner */}
      <div className="mt-6 temk-card p-4 bg-gradient-to-br from-yellow-50 to-amber-50 text-center animate-fade-in">
        <p className="text-2xl mb-2">😻</p>
        <p className="text-sm font-medium text-foreground">Поделись своим котиком!</p>
        <p className="text-xs text-muted-foreground mt-1 mb-3">Присоединяйся к сообществу любителей кошек TEMK</p>
        <button className="px-5 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
          Загрузить фото 🐾
        </button>
      </div>
    </div>
  );
}
