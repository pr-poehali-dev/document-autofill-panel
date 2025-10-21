import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import LoginPage from '@/components/LoginPage';
import DocumentPreview from '@/components/DocumentPreview';
import Sidebar from '@/components/Sidebar';
import TransportOrderDialog from '@/components/TransportOrderDialog';
import SubscriptionDialog from '@/components/SubscriptionDialog';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: Date;
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('docflow_logged_in');
    return saved === 'true';
  });
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [warehouseReceipt, setWarehouseReceipt] = useState(false);
  const [smr, setSmr] = useState(false);
  const [ttn, setTtn] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [remainingDocuments] = useState(47);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

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

  const handleDownloadForm = () => {
    const link = document.createElement('a');
    link.href = 'https://cdn.poehali.dev/files/7ee3d3a5-3eb1-4bd4-ac1b-80fd925f52aa.png';
    link.download = 'transport-order-form.png';
    link.click();
    toast.success('Форма скачана');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://docflow.example.com/form/12345');
    toast.success('Ссылка скопирована');
    setShowShareMenu(false);
  };

  const handleShareSocial = (platform: string) => {
    toast.success(`Поделиться в ${platform}`);
    setShowShareMenu(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('docflow_logged_in');
    toast.success('Выход из аккаунта');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    localStorage.setItem('docflow_logged_in', 'true');
    toast.success('Добро пожаловать!');
  };

  const handleSubscribe = (plan: string) => {
    toast.success(`Подписка "${plan}" оформлена`);
    setIsSubscriptionOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <LoginPage
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">DocFlow</h1>
          <p className="text-muted-foreground">Автозаполнение транспортных накладных</p>
        </div>

        <DocumentPreview selectedDoc={selectedDoc} />
      </div>

      <Sidebar
        documents={documents}
        selectedDoc={selectedDoc}
        setSelectedDoc={setSelectedDoc}
        warehouseReceipt={warehouseReceipt}
        setWarehouseReceipt={setWarehouseReceipt}
        smr={smr}
        handleSmrChange={handleSmrChange}
        ttn={ttn}
        handleTtnChange={handleTtnChange}
        handleFileUpload={handleFileUpload}
        handleExport={handleExport}
        setIsFormOpen={setIsFormOpen}
        setIsSubscriptionOpen={setIsSubscriptionOpen}
        handleLogout={handleLogout}
      />

      <TransportOrderDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        showShareMenu={showShareMenu}
        setShowShareMenu={setShowShareMenu}
        handleDownloadForm={handleDownloadForm}
        handleCopyLink={handleCopyLink}
        handleShareSocial={handleShareSocial}
      />

      <SubscriptionDialog
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
        remainingDocuments={remainingDocuments}
        handleSubscribe={handleSubscribe}
      />
    </div>
  );
};

export default Index;