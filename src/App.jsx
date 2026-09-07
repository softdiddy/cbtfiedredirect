import { useEffect, useState } from 'react'
import './App.css'

const TARGET_URL = 'https://cbtfied.ibbu.edu.ng/'

function App() {
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Animate progress bar over 1.5s
    const startTime = Date.now()
    const duration = 1500

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const currentProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(timer)
        // Perform actual redirection
        window.location.replace(TARGET_URL)
      }
    }, 30)

    return () => clearInterval(timer)
  }, [])

  const handleManualRedirect = () => {
    window.location.replace(TARGET_URL)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(TARGET_URL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="redirect-container">
      <div className="brand-badge">
        <span className="dot"></span>
        IBBU CBT Portal Redirect
      </div>

      <div className="spinner-wrapper">
        <div className="spinner-ring"></div>
        <div className="spinner-ring-inner"></div>
        <svg
          className="icon-center"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
      </div>

      <h1 className="redirect-title">Redirecting You Now</h1>
      <p className="redirect-subtitle">
        Transferring to official portal: <strong>cbtfied.ibbu.edu.ng</strong>
      </p>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
          aria-label="Redirection progress"
        ></div>
      </div>

      <div className="destination-box">
        <span className="destination-url">{TARGET_URL}</span>
        <button
          className="copy-btn"
          onClick={handleCopyLink}
          title="Copy destination link"
          type="button"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      <div className="action-buttons">
        <button onClick={handleManualRedirect} className="btn-primary" type="button">
          <span>Click Here if Not Redirected</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="footer-note">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        <span>Secure connection to Ibrahim Badamasi Babangida University Portal</span>
      </div>

      {copied && <div className="toast">URL Copied to Clipboard!</div>}
    </div>
  )
}

export default App
