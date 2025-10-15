export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold">Guardian Angel</h3>
            <p className="mt-4 text-gray-300">
              Безопасность детей - наш приоритет. Современные технологии для спокойствия родителей.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Telegram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">VKontakte</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.01-1.49-.864-1.744-.864-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407.254 0 .66.102 1.017.356 1.338 1.01 2.237 3.08 2.237 3.08.22.44.44.593.78.593h1.744c.525 0 .78-.254.78-.677 0-.254-.17-.593-.44-1.017-.254-.44-1.186-2.49-1.186-2.49-.102-.254-.102-.44 0-.593.102-.17.44-.44.78-.78.356-.356.78-.78 1.186-1.253.593-.677.78-1.118.78-1.49 0-.254-.102-.593-.78-.593z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold">Продукт</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Возможности</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Безопасность</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Цены</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Поддержка</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold">Компания</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">О нас</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Блог</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Карьера</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Контакты</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-gray-400">
              © 2024 Guardian Angel. Все права защищены.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">Политика конфиденциальности</a>
              <a href="#" className="text-gray-400 hover:text-white">Условия использования</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
