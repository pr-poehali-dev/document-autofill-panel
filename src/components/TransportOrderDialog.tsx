import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface TransportOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  showShareMenu: boolean;
  setShowShareMenu: (value: boolean) => void;
  handleDownloadForm: () => void;
  handleCopyLink: () => void;
  handleShareSocial: (platform: string) => void;
}

const TransportOrderDialog = ({
  isOpen,
  onClose,
  showShareMenu,
  setShowShareMenu,
  handleDownloadForm,
  handleCopyLink,
  handleShareSocial,
}: TransportOrderDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Транспортная накладная</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sender" className="text-sm font-medium">Отправитель / Consignor</Label>
              <Input id="sender" placeholder="ООО Компания" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="address" className="text-sm font-medium">Адрес / Address</Label>
              <Input id="address" placeholder="г. Москва, ул. Ленина, д. 1" className="mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="receiver" className="text-sm font-medium">Получатель / Receiver</Label>
              <Input id="receiver" placeholder="ООО Получатель" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="receiver-address" className="text-sm font-medium">Адрес получателя / Receiver's address</Label>
              <Input id="receiver-address" placeholder="г. Санкт-Петербург" className="mt-1" />
            </div>
          </div>

          <div>
            <Label htmlFor="route" className="text-sm font-medium">Маршрут / Route</Label>
            <Input id="route" placeholder="Москва - Санкт-Петербург" className="mt-1" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="transport" className="text-sm font-medium">Транспорт / Transport</Label>
              <Input id="transport" placeholder="Автомобиль" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="reg-number" className="text-sm font-medium">Гос. номер / Reg. number</Label>
              <Input id="reg-number" placeholder="А000АА00" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="driver" className="text-sm font-medium">Водитель / Driver</Label>
              <Input id="driver" placeholder="ФИО водителя" className="mt-1" />
            </div>
          </div>

          <div>
            <Label htmlFor="cargo" className="text-sm font-medium">Наименование груза / Name of cargo</Label>
            <Textarea id="cargo" placeholder="Описание груза" className="mt-1 min-h-[80px]" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="weight" className="text-sm font-medium">Вес / Weight (кг)</Label>
              <Input id="weight" type="number" placeholder="1000" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="volume" className="text-sm font-medium">Объём / Volume (м³)</Label>
              <Input id="volume" type="number" placeholder="10" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="places" className="text-sm font-medium">Мест / Places</Label>
              <Input id="places" type="number" placeholder="5" className="mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="departure-date" className="text-sm font-medium">Дата отправки / Date of departure</Label>
              <Input id="departure-date" type="date" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="arrival-date" className="text-sm font-medium">Дата прибытия / Date of arrival</Label>
              <Input id="arrival-date" type="date" className="mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cargo-value" className="text-sm font-medium">Стоимость груза / Cargo value</Label>
              <Input id="cargo-value" placeholder="Стоимость" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="freight-rate" className="text-sm font-medium">Сумма фрахта / Freight's rate</Label>
              <Input id="freight-rate" placeholder="Стоимость" className="mt-1" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
          >
            <Icon name="X" size={18} className="mr-2" />
            Закрыть
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleDownloadForm}
            className="flex-1 border-primary text-primary hover:bg-primary/10"
          >
            <Icon name="Download" size={18} className="mr-2" />
            Скачать форму
          </Button>
          
          <div className="flex-1 relative">
            {showShareMenu && (
              <div className="absolute bottom-full mb-2 right-0 bg-white border border-sidebar-border rounded-lg shadow-lg p-2 space-y-1 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyLink}
                  className="w-full justify-start text-left"
                >
                  <Icon name="Link" size={16} className="mr-2" />
                  Скопировать ссылку
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShareSocial('Telegram')}
                  className="w-full justify-start text-left"
                >
                  <Icon name="Send" size={16} className="mr-2" />
                  Telegram
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShareSocial('WhatsApp')}
                  className="w-full justify-start text-left"
                >
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  WhatsApp
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShareSocial('Email')}
                  className="w-full justify-start text-left"
                >
                  <Icon name="Mail" size={16} className="mr-2" />
                  Email
                </Button>
              </div>
            )}
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white"
              onClick={() => setShowShareMenu(!showShareMenu)}
            >
              <Icon name="Share2" size={18} className="mr-2" />
              Отправить форму
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransportOrderDialog;
