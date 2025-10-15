'use client'

export default function DebugEnvPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">🔍 Environment Variables Debug</h1>
        
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
            <h2 className="font-semibold text-blue-900">NEXT_PUBLIC_APP_URL</h2>
            <code className="text-sm break-all">
              {process.env.NEXT_PUBLIC_APP_URL || '❌ NOT SET'}
            </code>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 p-4">
            <h2 className="font-semibold text-green-900">NEXT_PUBLIC_BASE_DOMAIN</h2>
            <code className="text-sm break-all">
              {process.env.NEXT_PUBLIC_BASE_DOMAIN || '❌ NOT SET'}
            </code>
          </div>

          <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
            <h2 className="font-semibold text-purple-900">NEXT_PUBLIC_SUPABASE_URL</h2>
            <code className="text-sm break-all">
              {process.env.NEXT_PUBLIC_SUPABASE_URL || '❌ NOT SET'}
            </code>
          </div>

          <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
            <h2 className="font-semibold text-yellow-900">NEXT_PUBLIC_SUPABASE_ANON_KEY</h2>
            <code className="text-sm break-all">
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ SET (hidden for security)' : '❌ NOT SET'}
            </code>
          </div>

          <div className="border-l-4 border-red-500 bg-red-50 p-4">
            <h2 className="font-semibold text-red-900">window.location.origin</h2>
            <code className="text-sm break-all">
              {typeof window !== 'undefined' ? window.location.origin : 'N/A'}
            </code>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded border">
          <h3 className="font-bold mb-2">📝 Expected Values:</h3>
          <ul className="text-sm space-y-1">
            <li>✅ NEXT_PUBLIC_APP_URL: <code>https://bröllopssidan.se</code></li>
            <li>✅ NEXT_PUBLIC_BASE_DOMAIN: <code>app.bröllopssidan.se</code> (or <code>app.xn--brllopssidan-5ib.se</code>)</li>
            <li>✅ NEXT_PUBLIC_SUPABASE_URL: <code>https://ogvcyvuhkinyiymqnwln.supabase.co</code></li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded border border-yellow-300">
          <h3 className="font-bold text-yellow-900 mb-2">⚠️ If values are wrong:</h3>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>Update env vars in Railway</li>
            <li>Trigger new deployment</li>
            <li>Wait for build to complete</li>
            <li>Hard refresh this page (Ctrl+Shift+R)</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

