import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface SubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  remainingDocuments: number;
  handleSubscribe: (plan: string) => void;
}

const SubscriptionDialog = ({
  isOpen,
  onClose,
  remainingDocuments,
  handleSubscribe,
}: SubscriptionDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Подписка</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="bg-accent/50 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-1">Осталось документов</p>
            <p className="text-4xl font-bold text-primary">{remainingDocuments}</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Card className="p-6 border-2 border-primary/20 hover:border-primary transition-all cursor-pointer hover:shadow-lg" onClick={() => handleSubscribe('Базовый')}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Базовый</h3>
                  <p className="text-sm text-muted-foreground mt-1">Для начинающих</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">500₽</p>
                  <p className="text-xs text-muted-foreground">в месяц</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <Icon name="FileText" size={16} className="text-primary" />
                  <span className="text-sm font-medium">+50 документов</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-secondary hover:border-secondary transition-all cursor-pointer hover:shadow-lg bg-secondary/5" onClick={() => handleSubscribe('Стандартный')}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Стандартный</h3>
                  <p className="text-sm text-muted-foreground mt-1">Популярный выбор</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-secondary">1200₽</p>
                  <p className="text-xs text-muted-foreground">в месяц</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <Icon name="FileText" size={16} className="text-secondary" />
                  <span className="text-sm font-medium">+150 документов</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-primary hover:border-primary transition-all cursor-pointer hover:shadow-lg" onClick={() => handleSubscribe('Премиум')}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Премиум</h3>
                  <p className="text-sm text-muted-foreground mt-1">Для профессионалов</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">2500₽</p>
                  <p className="text-xs text-muted-foreground">в месяц</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <Icon name="Infinity" size={16} className="text-primary" />
                  <span className="text-sm font-medium">Безлимитные документы</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDialog;
