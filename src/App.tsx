import { useState, useEffect } from 'react'
import './App.css'
import { FCMService, NotificationPayload } from './firebase/messaging'
import StationForm from './components/formComponents/StationForm'
import { MessagePayload } from 'firebase/messaging'

function App() {
  const [fcmToken, setFcmToken] = useState<string | null>(null)
  const [lastMessage, setLastMessage] = useState<NotificationPayload | null>(null)

  useEffect(() => {
    // Handle incoming messages
    const handleMessage = (payload: MessagePayload) => {
      setLastMessage(payload as NotificationPayload)
    }

    FCMService.initialize().then(token => {
      setFcmToken(token)
      if (token) {
        FCMService.setMessageHandler(handleMessage)
      }
    })
  }, [])

  return (
    <div className="main-page">
      <StationForm />
    </div>
  )
}

export default App
