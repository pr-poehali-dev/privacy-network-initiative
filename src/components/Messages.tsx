import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const CHATS = [
  { id: 1, name: 'Марина Соколова', handle: '@marina_s', initials: 'МС', color: 'from-yellow-300/60 to-amber-300/60', lastMsg: 'Отправила тебе файл 📎', time: '2 мин', unread: 2, online: true },
  { id: 2, name: 'Дима Орлов', handle: '@dim_orl', initials: 'ДО', color: 'from-amber-300/60 to-orange-300/60', lastMsg: 'Когда встретимся?', time: '1 ч', unread: 1, online: true },
  { id: 3, name: 'Саша Лесных', handle: '@sasha_l', initials: 'СЛ', color: 'from-yellow-200/60 to-amber-400/60', lastMsg: 'Спасибо за обратную связь!', time: '3 ч', unread: 0, online: false },
  { id: 4, name: 'Иван Петров', handle: '@ivan_p', initials: 'ИП', color: 'from-amber-200/60 to-yellow-300/60', lastMsg: 'Отличная идея!', time: 'Вчера', unread: 0, online: false },
];

const MESSAGES_DATA: Record<number, Array<{ id: number; text: string; mine: boolean; time: string }>> = {
  1: [
    { id: 1, text: 'Привет! Видела твой пост про новый проект 🔥', mine: false, time: '10:24' },
    { id: 2, text: 'Да, работаю над ним уже месяц. Скоро покажу!', mine: true, time: '10:31' },
    { id: 3, text: 'Не терпится увидеть 👀', mine: false, time: '10:33' },
    { id: 4, text: 'Отправила тебе файл 📎', mine: false, time: '10:45' },
  ],
  2: [
    { id: 1, text: 'Как дела с бета-тестом?', mine: true, time: '09:15' },
    { id: 2, text: 'Идёт хорошо! Когда встретимся?', mine: false, time: '09:45' },
  ],
  3: [
    { id: 1, text: 'Прочитал твою статью. Огонь!', mine: true, time: 'Вчера' },
    { id: 2, text: 'Спасибо за обратную связь!', mine: false, time: 'Вчера' },
  ],
  4: [
    { id: 1, text: 'Отличная идея!', mine: false, time: 'Вчера' },
  ],
};

type CallState = 'idle' | 'calling' | 'active';
type CallType = 'audio' | 'video';

export default function Messages() {
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MESSAGES_DATA);
  const [callState, setCallState] = useState<CallState>('idle');
  const [callType, setCallType] = useState<CallType>('audio');
  const [callTimer, setCallTimer] = useState(0);
  const [micMuted, setMicMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const chat = CHATS.find(c => c.id === activeChat);
  const chatMessages = activeChat ? messages[activeChat] || [] : [];

  useEffect(() => {
    if (callState === 'active') {
      timerRef.current = setInterval(() => setCallTimer(t => t + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallTimer(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [callState]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const startCall = (type: CallType) => {
    setCallType(type);
    setCallState('calling');
    setTimeout(() => setCallState('active'), 2500);
  };

  const endCall = () => {
    setCallState('idle');
    setMicMuted(false);
    setCamOff(false);
  };

  const sendMessage = () => {
    if (!message.trim() || !activeChat) return;
    const newMsg = { id: Date.now(), text: message, mine: true, time: 'Сейчас' };
    setMessages(prev => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), newMsg] }));
    setMessage('');
  };

  return (
    <div className="flex h-screen animate-fade-in">
      {/* Call overlay */}
      {callState !== 'idle' && chat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="temk-card w-80 p-6 text-center shadow-2xl animate-scale-in">
            {callType === 'video' && callState === 'active' && !camOff && (
              <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-amber-100 h-44 mb-4 flex items-center justify-center relative overflow-hidden border border-border">
                <Icon name="Video" size={40} className="text-amber-300 opacity-40 absolute" />
                <p className="text-xs text-muted-foreground relative z-10">Видеопоток активен</p>
                <div className="absolute bottom-2 right-2 w-16 h-12 rounded-lg bg-gradient-to-br from-yellow-100 to-amber-200 border-2 border-white flex items-center justify-center shadow-sm">
                  <Icon name="User" size={14} className="text-amber-600" />
                </div>
              </div>
            )}

            <div className={`relative mx-auto mb-4 ${callState === 'calling' ? 'w-20 h-20' : 'w-16 h-16'}`}>
              <div className={`w-full h-full rounded-full avatar-ring bg-gradient-to-br ${chat.color} flex items-center justify-center text-xl font-bold text-foreground ${callState === 'calling' ? 'animate-ring-pulse' : ''}`}>
                {chat.initials}
              </div>
            </div>

            <h3 className="font-semibold text-base mb-1">{chat.name}</h3>
            <p className="text-sm text-muted-foreground mb-1">
              {callState === 'calling' ? (
                <span className="flex items-center justify-center gap-1.5">
                  <span>Звоним</span>
                  <span className="flex gap-0.5 items-center">
                    {[0,1,2].map(i => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary inline-block"
                        style={{ animation: `bounce 0.8s ${i * 0.15}s ease-in-out infinite`, display: 'inline-block' }}
                      />
                    ))}
                  </span>
                </span>
              ) : (
                <span className="font-mono text-primary font-bold text-base">{formatTime(callTimer)}</span>
              )}
            </p>
            <p className="text-xs text-muted-foreground mb-5">
              {callType === 'video' ? '📹 Видеозвонок' : '🎙 Аудиозвонок'}
            </p>

            {callState === 'active' && (
              <div className="flex justify-center gap-3 mb-5">
                <button
                  onClick={() => setMicMuted(v => !v)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors text-sm font-medium ${micMuted ? 'bg-destructive/15 text-destructive border border-destructive/20' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                >
                  <Icon name={micMuted ? 'MicOff' : 'Mic'} size={18} />
                </button>
                {callType === 'video' && (
                  <button
                    onClick={() => setCamOff(v => !v)}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${camOff ? 'bg-destructive/15 text-destructive border border-destructive/20' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                  >
                    <Icon name={camOff ? 'VideoOff' : 'Video'} size={18} />
                  </button>
                )}
                <button className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="Volume2" size={18} />
                </button>
              </div>
            )}

            <button
              onClick={endCall}
              className="w-14 h-14 rounded-full bg-destructive text-white flex items-center justify-center mx-auto hover:bg-destructive/90 transition-colors shadow-lg shadow-destructive/25"
            >
              <Icon name="PhoneOff" size={22} />
            </button>
          </div>
        </div>
      )}

      {/* Chat list */}
      <div className={`${activeChat ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-72 border-r border-border bg-white`}>
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-cormorant font-bold mb-3 text-foreground">Сообщения</h2>
          <div className="relative">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск чатов..."
              className="w-full bg-muted rounded-xl pl-9 pr-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/50 border border-transparent focus:border-primary/40 transition-colors"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {CHATS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveChat(c.id)}
              className={`w-full flex items-center gap-3 p-4 hover:bg-secondary/60 transition-colors border-b border-border/40`}
              style={{ background: activeChat === c.id ? 'hsl(45 95% 50% / 0.08)' : undefined }}
            >
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full avatar-ring">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-xs font-bold text-foreground`}>{c.initials}</div>
                </div>
                {c.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-background" />}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{c.lastMsg}</p>
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
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-3 p-4 border-b border-border bg-white/90 backdrop-blur-md">
            <button onClick={() => setActiveChat(null)} className="md:hidden text-muted-foreground hover:text-foreground">
              <Icon name="ChevronLeft" size={20} />
            </button>
            <div className="relative">
              <div className="w-9 h-9 rounded-full avatar-ring">
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${chat.color} flex items-center justify-center text-xs font-bold text-foreground`}>{chat.initials}</div>
              </div>
              {chat.online && <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border-2 border-background" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{chat.name}</p>
              <p className="text-xs text-muted-foreground">{chat.online ? 'В сети' : 'Не в сети'}</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => startCall('audio')}
                title="Аудиозвонок"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Icon name="Phone" size={17} />
              </button>
              <button
                onClick={() => startCall('video')}
                title="Видеозвонок"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Icon name="Video" size={17} />
              </button>
              <button className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors">
                <Icon name="MoreVertical" size={17} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-background dot-bg">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.mine ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-sm ${!msg.mine ? 'flex gap-2 items-end' : ''}`}>
                  {!msg.mine && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-200 to-amber-300 flex items-center justify-center text-xs font-bold text-amber-800 flex-shrink-0">
                      {chat.initials[0]}
                    </div>
                  )}
                  <div>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm ${msg.mine ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-white text-foreground rounded-bl-sm border border-border'}`}>
                      {msg.text}
                    </div>
                    <p className={`text-xs text-muted-foreground mt-1 ${msg.mine ? 'text-right' : 'text-left pl-1'}`}>{msg.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border bg-white/90 backdrop-blur-md">
            <div className="flex gap-2 items-end">
              <button className="p-2.5 rounded-xl hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground flex-shrink-0">
                <Icon name="Paperclip" size={18} />
              </button>
              <div className="flex-1 bg-muted rounded-xl px-4 py-2.5 border border-border focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Написать сообщение..."
                  className="w-full bg-transparent text-sm outline-none resize-none placeholder:text-muted-foreground max-h-24"
                  rows={1}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40 flex-shrink-0 shadow-md shadow-primary/25"
              >
                <Icon name="Send" size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-background dot-bg">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="MessageSquare" size={26} className="text-primary" />
            </div>
            <p className="text-muted-foreground text-sm">Выберите чат для общения</p>
          </div>
        </div>
      )}
    </div>
  );
}
