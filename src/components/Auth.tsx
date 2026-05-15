import { useState } from 'react';
import Icon from '@/components/ui/icon';

type AuthMode = 'login' | 'register' | 'verify';

interface AuthProps {
  onAuth: (user: { name: string; email: string; handle: string }) => void;
}

export default function Auth({ onAuth }: AuthProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNameChange = (val: string) => {
    setName(val);
    if (mode === 'register') {
      setHandle('@' + val.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_а-яё]/gi, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);

    if (mode === 'login') {
      if (!email || !password) { setError('Заполните все поля'); return; }
      if (password.length < 6) { setError('Неверный пароль'); return; }
      onAuth({ name: email.split('@')[0], email, handle: '@' + email.split('@')[0] });
    } else if (mode === 'register') {
      if (!name || !email || !password) { setError('Заполните все поля'); return; }
      if (password.length < 8) { setError('Пароль должен быть не менее 8 символов'); return; }
      if (!email.includes('@')) { setError('Введите корректный email'); return; }
      setMode('verify');
    } else if (mode === 'verify') {
      if (verifyCode.length < 4) { setError('Введите код из письма'); return; }
      onAuth({ name, email, handle });
    }
  };

  return (
    <div className="min-h-screen dot-bg bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm animate-scale-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary shadow-lg shadow-primary/30 mb-4 animate-ring-pulse">
            <span className="text-2xl font-bold text-primary-foreground font-cormorant">T</span>
          </div>
          <h1 className="text-3xl font-cormorant font-bold text-foreground tracking-wide">TEMK</h1>
          <p className="text-sm text-muted-foreground mt-1">Социальная сеть нового поколения</p>
        </div>

        <div className="temk-card p-6 shadow-xl shadow-black/5">
          {/* Tabs */}
          {mode !== 'verify' && (
            <div className="flex gap-1 p-1 bg-muted rounded-xl mb-6">
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'login' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Войти
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setError(''); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'register' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Регистрация
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'verify' ? (
              <>
                <div className="text-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-3">
                    <Icon name="Mail" size={22} className="text-primary" />
                  </div>
                  <h2 className="font-semibold text-base">Подтвердите email</h2>
                  <p className="text-xs text-muted-foreground mt-1">Мы отправили код на <span className="font-medium text-foreground">{email}</span></p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Код подтверждения</label>
                  <input
                    type="text"
                    value={verifyCode}
                    onChange={e => setVerifyCode(e.target.value)}
                    placeholder="_ _ _ _ _ _"
                    maxLength={6}
                    className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-center tracking-[0.3em] font-semibold outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-colors placeholder:tracking-normal placeholder:font-normal"
                  />
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  Не пришёл код?{' '}
                  <button type="button" className="text-primary font-medium hover:underline">Отправить снова</button>
                </p>
              </>
            ) : (
              <>
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Ваше имя</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => handleNameChange(e.target.value)}
                      placeholder="Иван Иванов"
                      className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-colors placeholder:text-muted-foreground"
                    />
                    {handle && (
                      <p className="text-xs text-muted-foreground mt-1 pl-1">Никнейм: <span className="text-primary font-medium">{handle}</span></p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
                  <div className="relative">
                    <Icon name="Mail" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-muted border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-colors placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Пароль</label>
                  <div className="relative">
                    <Icon name="Lock" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder={mode === 'register' ? 'Минимум 8 символов' : '••••••••'}
                      className="w-full bg-muted border border-border rounded-xl pl-10 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-colors placeholder:text-muted-foreground"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(v => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <Icon name={showPass ? 'EyeOff' : 'Eye'} size={15} />
                    </button>
                  </div>
                  {mode === 'login' && (
                    <div className="text-right mt-1.5">
                      <button type="button" className="text-xs text-primary hover:underline">Забыли пароль?</button>
                    </div>
                  )}
                </div>
              </>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-xs text-destructive">
                <Icon name="AlertCircle" size={13} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  Подождите...
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Войти' : mode === 'register' ? 'Создать аккаунт' : 'Подтвердить'}
                  <Icon name="ArrowRight" size={15} />
                </>
              )}
            </button>
          </form>

          {mode !== 'verify' && (
            <>
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">или</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <button
                type="button"
                className="w-full py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="Globe" size={15} className="text-muted-foreground" />
                Продолжить с Google
              </button>
            </>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Продолжая, вы соглашаетесь с{' '}
          <span className="text-primary cursor-pointer hover:underline">условиями использования</span>
        </p>
      </div>
    </div>
  );
}
