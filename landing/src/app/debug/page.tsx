export default function DebugPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-yellow-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🔍 Debug Page</h1>
        <p className="text-xl text-gray-600 mb-8">Debugging routing issues</p>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-sm text-gray-500 mb-2">Environment: {process.env.NODE_ENV}</p>
          <p className="text-sm text-gray-500 mb-2">Port: {process.env.PORT}</p>
          <p className="text-sm text-gray-500">Hostname: {process.env.HOSTNAME}</p>
        </div>
      </div>
    </div>
  )
}
