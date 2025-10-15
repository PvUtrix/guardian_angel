export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block">Спокойствие для родителей.</span>
            <span className="block text-blue-200">Свобода для детей.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-blue-100 sm:text-2xl">
            Безопасный мониторинг маршрутов ваших детей с мгновенными уведомлениями. 
            Позвольте детям быть независимыми, оставаясь спокойными за их безопасность.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex items-center space-x-2 text-blue-200">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Безопасность</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-200">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Независимость</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-200">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Спокойствие</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl"></div>
    </section>
  )
}
