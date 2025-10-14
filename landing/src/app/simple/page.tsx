export default function SimplePage() {
  return (
    <html>
      <head>
        <title>Guardian Angel - Simple Test</title>
      </head>
      <body style={{ margin: 0, padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>✅ Guardian Angel - Simple Test</h1>
        <p>This is a basic HTML page to test if the server is working.</p>
        <p>If you can see this, the Next.js server is running correctly.</p>
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <p><strong>Status:</strong> Server is running</p>
          <p><strong>Time:</strong> {new Date().toLocaleString()}</p>
        </div>
      </body>
    </html>
  )
}
