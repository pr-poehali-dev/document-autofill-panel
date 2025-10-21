import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: Date;
}

const Index = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [warehouseReceipt, setWarehouseReceipt] = useState(false);
  const [smr, setSmr] = useState(false);
  const [ttn, setTtn] = useState(false);

  const handleSmrChange = (checked: boolean) => {
    setSmr(checked);
    if (checked) setTtn(false);
  };

  const handleTtnChange = (checked: boolean) => {
    setTtn(checked);
    if (checked) setSmr(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newDocs: Document[] = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        uploadedAt: new Date(),
      }));
      setDocuments([...documents, ...newDocs]);
      setSelectedDoc(newDocs[0]);
      toast.success(`Загружено файлов: ${files.length}`);
    }
  };

  const handleExport = () => {
    if (!selectedDoc) {
      toast.error('Выберите документ для выгрузки');
      return;
    }
    toast.success(`Документ "${selectedDoc.name}" выгружен`);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">DocFlow</h1>
          <p className="text-muted-foreground">Автозаполнение транспортных накладных</p>
        </div>

        <Card className="flex-1 bg-white shadow-xl border-0 overflow-hidden animate-fade-in">
          {selectedDoc ? (
            <div className="p-8 h-full flex flex-col items-center justify-center">
              <div className="text-center space-y-4 max-w-2xl">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Icon name="FileText" size={40} className="text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground">{selectedDoc.name}</h2>
                <p className="text-muted-foreground">
                  Загружен: {selectedDoc.uploadedAt.toLocaleString('ru-RU')}
                </p>
                
                <div className="mt-8 p-6 bg-accent/50 rounded-lg border-2 border-dashed border-primary/30">
                  <Icon name="Eye" size={32} className="text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Предпросмотр документа появится здесь
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-accent rounded-lg">
                    <div className="font-semibold text-primary mb-1">Статус</div>
                    <div className="text-muted-foreground">Готов к заполнению</div>
                  </div>
                  <div className="p-4 bg-accent rounded-lg">
                    <div className="font-semibold text-primary mb-1">Тип</div>
                    <div className="text-muted-foreground">{selectedDoc.type || 'Документ'}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-accent rounded-full flex items-center justify-center">
                  <Icon name="FileQuestion" size={48} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium text-muted-foreground">
                  Загрузите документ для начала работы
                </h3>
              </div>
            </div>
          )}
        </Card>
      </div>

      <div className="w-96 bg-sidebar border-l border-sidebar-border shadow-2xl flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <h2 className="text-lg font-semibold text-primary mb-4">Управление</h2>
          
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
          <div className="px-6 py-4 border-b border-sidebar-border space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-primary mb-1">Список документов</h3>
              <p className="text-xs text-muted-foreground">Всего: {documents.length}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="warehouse-receipt" 
                  checked={warehouseReceipt}
                  onCheckedChange={(checked) => setWarehouseReceipt(checked as boolean)}
                />
                <label
                  htmlFor="warehouse-receipt"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Складская расписка
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="smr" 
                  checked={smr}
                  onCheckedChange={handleSmrChange}
                />
                <label
                  htmlFor="smr"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  СМР
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="ttn" 
                  checked={ttn}
                  onCheckedChange={handleTtnChange}
                />
                <label
                  htmlFor="ttn"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  ТТН
                </label>
              </div>
            </div>
          </div>
          
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-2 py-4">
              {documents.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Inbox" size={40} className="mx-auto text-muted-foreground mb-3 opacity-50" />
                  <p className="text-sm text-muted-foreground">Нет загруженных документов</p>
                </div>
              ) : (
                documents.map((doc) => (
                  <Card
                    key={doc.id}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                      selectedDoc?.id === doc.id
                        ? 'bg-primary/10 border-primary shadow-sm'
                        : 'bg-white border-transparent hover:border-primary/30'
                    }`}
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        selectedDoc?.id === doc.id ? 'bg-primary/20' : 'bg-accent'
                      }`}>
                        <Icon name="FileText" size={20} className={
                          selectedDoc?.id === doc.id ? 'text-primary' : 'text-muted-foreground'
                        } />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate mb-1">
                          {doc.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {doc.uploadedAt.toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="p-6 border-t border-sidebar-border bg-white/50">
          <Button
            onClick={handleExport}
            disabled={!selectedDoc}
            className="w-full bg-secondary hover:bg-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <Icon name="Download" size={18} className="mr-2 group-hover:scale-110 transition-transform" />
            Выгрузить документ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;