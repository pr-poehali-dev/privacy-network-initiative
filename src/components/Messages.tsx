import { useState } from 'react';
import Icon from '@/components/ui/icon';

const CHATS = [
  { id: 1, name: 'Марина Соколова', handle: '@marina_s', initials: 'МС', color: 'from-primary/40 to-accent/40', lastMsg: 'Отправила тебе результаты теста...', time: '2 мин', unread: 2, online: true },
  { id: 2, name: 'Дима Орлов', handle: '@dim_orl', initials: 'ДО', color: 'from-accent/40 to-neon-pink/40', lastMsg: 'Когда сможем встретиться?', time: '1 ч', unread: 1, online: true },
  { id: 3, name: 'Саша Лесных', handle: '@sasha_l', initials: 'СЛ', color: 'from-neon-pink/40 to-primary/40', lastMsg: 'Спасибо за обратную связь!', time: '3 ч', unread: 0, online: false },
  { id: 4, name: 'Иван Петров', handle: '@ivan_p', initials: 'ИП', color: 'from-primary/20 to-accent/20', lastMsg: 'Посмотрел твой пост, интересно...', time: 'Вчера', unread: 0, online: false },
];

const MESSAGES_DATA: Record<number, Array<{ id: number; text: string; mine: boolean; time: string; encrypted: boolean }>> = {
  1: [
    { id: 1, text: 'Привет! Посмотрела твоё исследование по протоколу Signal', mine: false, time: '10:24', encrypted: true },
    { id: 2, text: 'Очень интересная работа. Особенно часть про forward secrecy', mine: false, time: '10:25', encrypted: true },
    { id: 3, text: 'Спасибо! Работал над этим несколько месяцев. Есть что добавить?', mine: true, time: '10:31', encrypted: true },
    { id: 4, text: 'Отправила тебе результаты теста...', mine: false, time: '10:45', encrypted: true },
  ],
  2: [
    { id: 1, text: 'Как идёт разработка нового протокола?', mine: true, time: '09:15', encrypted: true },
    { id: 2, text: 'Хорошо! Почти готов к бета-тесту. Когда сможем встретиться?', mine: false, time: '09:45', encrypted: true },
  ],
  3: [
    { id: 1, text: 'Прочитал твою статью о приватности. Мощно написано!', mine: true, time: 'Вчера', encrypted: true },
    { id: 2, text: 'Спасибо за обратную связь!', mine: false, time: 'Вчера', encrypted: true },
  ],
  4: [
    { id: 1, text: 'Посмотрел твой пост, интересно...', mine: false, time: 'Вчера', encrypted: true },
  ],
};

export default function Messages() {
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MESSAGES_DATA);

  const chat = CHATS.find(c => c.id === activeChat);
  const chatMessages = activeChat ? messages[activeChat] || [] : [];

  const sendMessage = () => {
    if (!message.trim() || !activeChat) return;
    const newMsg = { id: Date.now(), text: message, mine: true, time: 'Сейчас', encrypted: true };
    setMessages(prev => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), newMsg] }));
    setMessage('');
  };

  return (
    <div className="flex h-screen md:h-[calc(100vh-0px)] animate-fade-in">
      {/* Chat list */}
      <div className={`${activeChat ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-72 border-r border-border bg-background`}>
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-cormorant font-semibold mb-3">Сообщения</h2>
          <div className="relative">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск чатов..."
              className="w-full bg-secondary rounded-lg pl-9 pr-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {CHATS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveChat(c.id)}
              className={`w-full flex items-center gap-3 p-4 hover:bg-secondary/50 transition-colors border-b border-border/50 ${activeChat === c.id ? 'bg-secondary/70' : ''}`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full avatar-ring">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-xs font-bold text-foreground`}>{c.initials}</div>
                </div>
                {c.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background" />}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Lock" size={10} className="text-primary/50 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground truncate">{c.lastMsg}</p>
                </div>
              </div>
              {c.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold flex-shrink-0">{c.unread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {activeChat && chat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="flex items-center gap-3 p-4 border-b border-border bg-background/80 backdrop-blur-md">
            <button onClick={() => setActiveChat(null)} className="md:hidden text-muted-foreground hover:text-foreground">
              <Icon name="ChevronLeft" size={20} />
            </button>
            <div className="relative">
              <div className="w-9 h-9 rounded-full avatar-ring">
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${chat.color} flex items-center justify-center text-xs font-bold text-foreground`}>{chat.initials}</div>
              </div>
              {chat.online && <span className="absolute bottom-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-background" />}
            </div>
            <div>
              <p className="text-sm font-medium">{chat.name}</p>
              <p className="text-xs text-muted-foreground">{chat.online ? 'В сети' : 'Не в сети'}</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <span className="enc-badge">
                <Icon name="Lock" size={9} />
                E2E
              </span>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <Icon name="Phone" size={16} />
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <Icon name="MoreVertical" size={16} />
              </button>
            </div>
          </div>

          {/* E2E notice */}
          <div className="flex items-center justify-center py-2 bg-primary/5 border-b border-primary/10">
            <p className="text-xs text-primary/70 flex items-center gap-1">
              <Icon name="ShieldCheck" size={11} />
              Сообщения защищены сквозным шифрованием. Читать можете только вы двое.
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.mine ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-md ${msg.mine ? '' : 'flex gap-2'}`}>
                  {!msg.mine && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 mt-1">
                      {chat.initials[0]}
                    </div>
                  )}
                  <div>
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm ${
                        msg.mine
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-secondary text-foreground rounded-bl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className={`flex items-center gap-1 mt-1 ${msg.mine ? 'justify-end' : 'justify-start'}`}>
                      {msg.encrypted && <Icon name="Lock" size={9} className="text-muted-foreground/50" />}
                      <span className="text-xs text-muted-foreground/50">{msg.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-background/80 backdrop-blur-md">
            <div className="flex gap-2 items-end">
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground flex-shrink-0">
                <Icon name="Paperclip" size={18} />
              </button>
              <div className="flex-1 bg-secondary rounded-xl px-4 py-2.5 flex items-center gap-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Сообщение (зашифруется автоматически)..."
                  className="flex-1 bg-transparent text-sm outline-none resize-none placeholder:text-muted-foreground max-h-24"
                  rows={1}
                />
                <Icon name="Lock" size={12} className="text-primary/50 flex-shrink-0" />
              </div>
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed glow-box-cyan flex-shrink-0"
              >
                <Icon name="Send" size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Icon name="MessageSquare" size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">Выберите чат</p>
          </div>
        </div>
      )}
    </div>
  );
}
