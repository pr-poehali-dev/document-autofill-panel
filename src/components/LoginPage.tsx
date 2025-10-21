import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface LoginPageProps {
  loginEmail: string;
  setLoginEmail: (value: string) => void;
  loginPassword: string;
  setLoginPassword: (value: string) => void;
  onLogin: (e: React.FormEvent) => void;
}

const LoginPage = ({
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  onLogin,
}: LoginPageProps) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/15e8d7ed-2cfe-4c80-8e2d-8aa4ca31fc13/files/cf9dfade-5061-4363-826b-3c0fc0e44bc1.jpg)' }}
      />
      <div className="absolute inset-0 bg-primary/60" />
      
      <Card className="relative z-10 w-full max-w-md p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <img 
            src="https://cdn.poehali.dev/files/c5fd7ec7-0659-498e-877f-d8d371e9af52.png" 
            alt="DocFlow Logo" 
            className="h-32 w-32 object-contain"
          />
          <h1 className="text-3xl font-bold text-primary mt-2">DocFlow</h1>
        </div>
        
        <form onSubmit={onLogin} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">Логин</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="email@example.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password" className="text-sm font-medium">Пароль</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          
          <button 
            type="button"
            className="text-sm text-primary hover:underline"
            onClick={() => toast.info('Функция восстановления пароля')}
          >
            Восстановление пароля
          </button>
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
            Войти
          </Button>
          
          <Button 
            type="button"
            variant="outline" 
            className="w-full"
            onClick={() => toast.info('Функция создания аккаунта')}
          >
            Создать аккаунт
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
