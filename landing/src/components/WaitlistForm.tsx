'use client'

import { useState } from 'react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email) {
      setError('Пожалуйста, введите email адрес')
      return
    }
    
    if (!validateEmail(email)) {
      setError('Пожалуйста, введите корректный email адрес')
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call - in real implementation, this would save to database
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store email in localStorage for now (in production, this would be sent to backend)
      const existingEmails = JSON.parse(localStorage.getItem('waitlist_emails') || '[]')
      existingEmails.push({
        email,
        timestamp: new Date().toISOString(),
        source: 'landing_page'
      })
      localStorage.setItem('waitlist_emails', JSON.stringify(existingEmails))
      
      setIsSubmitted(true)
      setEmail('')
    } catch {
      setError('Произошла ошибка. Попробуйте еще раз.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-24 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Спасибо за интерес!
            </h2>
            <p className="mt-4 text-gray-600">
              Мы уведомим вас, как только Guardian Angel будет готов к запуску. 
              Ожидайте приглашение в течение нескольких недель.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 text-blue-600 hover:text-blue-500"
            >
              Добавить еще один email
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900">
            Будьте в числе первых
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Получите ранний доступ к Guardian Angel и помогите нам сделать мир безопаснее для детей
          </p>
          
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="email" className="sr-only">
                  Email адрес
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Введите ваш email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-lg bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Отправка...' : 'Присоединиться'}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </form>
          
          <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="ml-2">Бесплатно</span>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="ml-2">Без спама</span>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="ml-2">Конфиденциально</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
