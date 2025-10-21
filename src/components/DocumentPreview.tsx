import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: Date;
}

interface DocumentPreviewProps {
  selectedDoc: Document | null;
}

const DocumentPreview = ({ selectedDoc }: DocumentPreviewProps) => {
  if (!selectedDoc) {
    return (
      <Card className="flex-1 bg-white shadow-xl border-0 overflow-hidden animate-fade-in">
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
      </Card>
    );
  }

  return (
    <Card className="flex-1 bg-white shadow-xl border-0 overflow-hidden animate-fade-in">
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
    </Card>
  );
};

export default DocumentPreview;
