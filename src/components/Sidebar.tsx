import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: Date;
}

interface SidebarProps {
  documents: Document[];
  selectedDoc: Document | null;
  setSelectedDoc: (doc: Document) => void;
  warehouseReceipt: boolean;
  setWarehouseReceipt: (value: boolean) => void;
  smr: boolean;
  handleSmrChange: (checked: boolean) => void;
  ttn: boolean;
  handleTtnChange: (checked: boolean) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExport: () => void;
  setIsFormOpen: (value: boolean) => void;
  setIsSubscriptionOpen: (value: boolean) => void;
  handleLogout: () => void;
}

const Sidebar = ({
  documents,
  selectedDoc,
  setSelectedDoc,
  warehouseReceipt,
  setWarehouseReceipt,
  smr,
  handleSmrChange,
  ttn,
  handleTtnChange,
  handleFileUpload,
  handleExport,
  setIsFormOpen,
  setIsSubscriptionOpen,
  handleLogout,
}: SidebarProps) => {
  return (
    <div className="w-96 bg-sidebar border-l border-sidebar-border shadow-2xl flex flex-col">
      <div className="p-6 border-b border-sidebar-border space-y-4">
        <div className="flex items-center justify-end mb-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-primary/10 px-3 py-2">
                <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Иван Иванов</span>
                <Icon name="User" size={18} className="text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setIsSubscriptionOpen(true)} className="cursor-pointer">
                <Icon name="CreditCard" size={16} className="mr-2" />
                Подписка
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <h2 className="text-lg font-semibold text-primary mb-4">Управление</h2>
        
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="w-full bg-secondary hover:bg-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 group mb-3"
        >
          <Icon name="FileEdit" size={18} className="mr-2 group-hover:scale-110 transition-transform" />
          Заполнить форму
        </Button>
        
        <label htmlFor="file-upload">
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 group">
            <Icon name="Upload" size={18} className="mr-2 group-hover:scale-110 transition-transform" />
            Загрузить документы
          </Button>
        </label>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-sidebar-border">
          <h3 className="font-medium text-sm text-muted-foreground mb-3">Документы на выгрузку</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="warehouse" 
                checked={warehouseReceipt}
                onCheckedChange={(checked) => setWarehouseReceipt(checked as boolean)}
              />
              <label htmlFor="warehouse" className="text-sm cursor-pointer select-none">
                Складская квитанция
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="smr" 
                checked={smr}
                onCheckedChange={(checked) => handleSmrChange(checked as boolean)}
              />
              <label htmlFor="smr" className="text-sm cursor-pointer select-none">
                СМР
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ttn" 
                checked={ttn}
                onCheckedChange={(checked) => handleTtnChange(checked as boolean)}
              />
              <label htmlFor="ttn" className="text-sm cursor-pointer select-none">
                ТТН
              </label>
            </div>
          </div>
          
          <Button 
            onClick={handleExport}
            className="w-full mt-4 bg-primary hover:bg-primary/90 text-white"
          >
            <Icon name="Download" size={18} className="mr-2" />
            Выгрузить
          </Button>
        </div>

        <ScrollArea className="flex-1 px-6">
          <div className="py-4 space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground mb-3">Загруженные файлы</h3>
            {documents.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Нет загруженных документов
              </p>
            ) : (
              documents.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedDoc?.id === doc.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-accent hover:bg-accent/70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon 
                      name="FileText" 
                      size={18} 
                      className={selectedDoc?.id === doc.id ? 'text-white' : 'text-primary'} 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{doc.name}</p>
                      <p className={`text-xs mt-1 ${
                        selectedDoc?.id === doc.id ? 'text-white/80' : 'text-muted-foreground'
                      }`}>
                        {doc.uploadedAt.toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;
