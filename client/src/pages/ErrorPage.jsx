import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
      <div>
          <h1>Error</h1>

          Return to <Link to="/">Home</Link>
      </div>
  )
}

export default ErrorPage