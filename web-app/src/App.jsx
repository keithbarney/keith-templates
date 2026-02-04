import { useState } from 'react'
import { Button } from './components/Button'
import { Card } from './components/Card'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <header className="header">
        <h1>{{APP_NAME}}</h1>
        <p className="text-secondary">Your app description here</p>
      </header>

      <main className="main">
        <Card>
          <h2>Get Started</h2>
          <p>Edit <code>src/App.jsx</code> to start building.</p>

          <div className="stack-sm" style={{ marginTop: 'var(--space-md)' }}>
            <p className="mono">Count: {count}</p>
            <div className="row">
              <Button onClick={() => setCount(c => c + 1)}>
                Increment
              </Button>
              <Button variant="secondary" onClick={() => setCount(0)}>
                Reset
              </Button>
            </div>
          </div>
        </Card>
      </main>

      <footer className="footer">
        <p className="text-secondary mono text-sm">
          Built with Heavy Stack
        </p>
      </footer>
    </div>
  )
}
