"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

const questions = [
  {
    id: 1,
    question: "Já comprou algum curso de confeitaria?",
    options: ["Nunca", "Já fiz curso", "Mais de 2 cursos"]
  },
  {
    id: 2,
    question: "Qual dessas metas mais você deseja?",
    options: [
      "Viver só da venda dos Copos",
      "Quero uma renda extra",
      "Quero ser uma confeiteira profissional",
      "Quero ver como isso funciona"
    ]
  },
  {
    id: 3,
    question: "Se tivesse acesso a essa técnica que te permite lucrar mais com os copos da felicidade, o que faria?",
    options: [
      "Começaria a produzir",
      "Testaria a receita",
      "Não sei por onde começar"
    ]
  },
  {
    id: 4,
    question: "Quantos Copos da Felicidade você consegue fazer hoje?",
    options: [
      "5 copos no máximo",
      "6 a 8 copos",
      "Mais de 10 copos",
      "Não sei fazer"
    ]
  },
  {
    id: 5,
    question: "Qual é o seu maior desafio hoje com Copos da Felicidade?",
    options: [
      "Nunca fiz",
      "Faço pra família",
      "Vendo mas não tenho lucro",
      "Quero vender mais"
    ]
  },
  {
    id: 6,
    question: "Se você pudesse produzir muito mais copos da felicidade sem gastar mais pra isso, como isso mudaria a sua vida?",
    options: [
      "Seria meu sonho!",
      "É tudo que eu preciso",
      "Não sei se é possível"
    ]
  },
  {
    id: 7,
    question: "Você está pronta para seguir o passo a passo criado especialmente pra você?",
    options: [
      "Sim, tô pronta!",
      "Sim, mas preciso de orientação",
      "Ainda tenho dúvidas"
    ]
  }
]

export default function CoposFelicidadeQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    // Pequeno delay para mostrar a seleção antes de avançar
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer("")
      } else {
        setShowResult(true)
        startLoading()
      }
    }, 500)
  }

  const handleNext = () => {
    if (!selectedAnswer) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    setSelectedAnswer("")

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
      startLoading()
    }
  }

  const startLoading = () => {
    setIsLoading(true)
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Redirect after 5 seconds
          setTimeout(() => {
            window.location.href = "https://confeitariadafabi.shop/copos2"
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-lg p-8 text-center"
          >
            <div className="mb-8">
              <Image
                src="/logo-cfl.webp"
                alt="Copos da Felicidade"
                width={200}
                height={120}
                className="mx-auto"
              />
            </div>

            {!isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h1 className="text-2xl font-bold text-amber-700 leading-tight">
                  ESSA RECEITA SECRETA FAZ OS COPOS DA FELICIDADE RENDEREM 5 VEZES MAIS...
                </h1>
                
                <p className="text-gray-700 text-lg">
                  Essa receita te permite produzir muito mais copos da felicidade com{" "}
                  <span className="font-bold">apenas 4 caixinhas</span> de leite condensado
                </p>

                <p className="text-xl font-bold text-gray-800">
                  Clique no botão abaixo e descubra agora mesmo!
                </p>

                <Button
                  onClick={startLoading}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform transition-transform hover:scale-105"
                >
                  QUERO DESCOBRIR AGORA!
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-800">
                  Preparando sua receita secreta...
                </h2>
                <div className="space-y-2">
                  <Progress value={loadingProgress} className="w-full h-3" />
                  <p className="text-sm text-gray-600">{Math.round(loadingProgress)}%</p>
                </div>
                <p className="text-gray-600">
                  Você será redirecionada em instantes!
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with logo and progress */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <Image
              src="/logo-cfl.webp"
              alt="Copos da Felicidade"
              width={150}
              height={90}
              className="mx-auto"
            />
          </div>
          <Progress value={progress} className="w-full h-2" />
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-lg p-8"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2 text-center leading-tight">
                {questions[currentQuestion].question}
              </h2>
              
              <p className="text-gray-600 text-center mb-8">
                Selecione a sua resposta
              </p>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full p-4 rounded-full text-white font-medium text-lg transition-all duration-200 transform hover:scale-105 shadow-lg ${
                      selectedAnswer === option
                        ? "bg-pink-500 ring-4 ring-pink-200"
                        : "bg-pink-400 hover:bg-pink-500"
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
