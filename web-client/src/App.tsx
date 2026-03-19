import './App.css'
import Header from './components/Header/Header'
import Content from './components/Content/Content'
import QuizSetup from './components/QuizSetup'
import type { Quiz as QuizType } from '@quizify/quiz-util'
import { useState, useRef } from 'react'
import { io, type Socket } from 'socket.io-client'
import { QuizGame } from './components/QuizGame'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [quiz, setQuiz] = useState<QuizType | null>(null)

  const socketRef = useRef<Socket | null>(null)

  const WS_URL = import.meta.env.VITE_WS_URL
  const API_URL = import.meta.env.VITE_API_URL

  console.log(WS_URL)
  console.log(API_URL)

  /**
   * Connect websocket using backend-issued token
   */
  const connectSocket = async (clientToken: string) => {
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
    }

    return new Promise<Socket>((resolve, reject) => {
      const socket = io(WS_URL, {
        auth: { token: clientToken },
        reconnection: true
      })

      const timeout = setTimeout(() => {
        reject(new Error("Socket connection timeout"))
      }, 10000)

      socket.on('connect', () => {
        console.log("Socket connected:", socket.id)

        clearTimeout(timeout)
        socketRef.current = socket
        resolve(socket)
      })

      socket.on('response', (payload: QuizType) => {
        console.log("Received quiz response")

        setQuiz(payload)
        setIsLoading(false)
      })

      socket.on('disconnect', () => {
        console.log("Socket disconnected")
      })

      socket.on('connect_error', (err) => {
        console.error("Socket connection error:", err)
      })
    })
  }

  /**
   * Upload file → backend pipeline → websocket response
   */
  const handleFileUpload = async (files: File[]) => {
    setIsLoading(true)

    try {
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error("Upload failed")
        }

        const data = await response.json()

        if (!data.clientToken) {
          throw new Error("Missing client token")
        }

        // Connect websocket AFTER upload response
        await connectSocket(data.clientToken)
      }
    } catch (error) {
      console.error("Upload flow failed:", error)
      setIsLoading(false)
    }
  }

  const handleStartQuiz = (topic: string) => {
    setIsLoading(true)
    socketRef.current?.emit('start-quiz', { topic })
  }

  return (
    <main className="app-wrapper">
      <Header>
        <h2>
          <i>Quizify</i>
        </h2>
      </Header>

      <Content>
        {quiz ? 
          <QuizGame quiz={quiz} title={"Quiz"} onComplete={() => {}} key={"1"}/> :
          <QuizSetup
            isLoading={isLoading}
            onStartQuiz={handleStartQuiz}
            onFileUpload={handleFileUpload}
          />
        }
      </Content>
    </main>
  )
}

export default App