import { TabsContent } from '@radix-ui/react-tabs';
import './App.css'
import StationForm from './components/formComponents/StationForm'
import { Card } from './components/ui/card'
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import { useNotifications } from './hooks/useNotifications'
import { useOffers } from './hooks/useOffers';
import OfferCard from './components/offersComponents/OffersCard';
import { useAuth } from './hooks/useAuth';

function App() {
  const { fcmToken: _fcmToken, lastMessage: _lastMessage } = useNotifications();
  const { offerIds } = useOffers();

  return (
    <div className="main-page">
      <Tabs defaultValue="application" className="w-auto max-w-[410px] mniej-z-innymi-card">
        <TabsList className="grid w-full grid-cols-2 bg-slate-50">
          <TabsTrigger value="application">Zgłoś</TabsTrigger>
          <TabsTrigger value="offers">Aktualne zgłoszenia</TabsTrigger>
        </TabsList>
        <TabsContent value="application">
          <StationForm />
        </TabsContent>
        <TabsContent value="offers">
          <OfferCard />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default App
