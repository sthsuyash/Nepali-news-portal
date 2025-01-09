import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
      <main className="grid place-items-center min-h-screen bg-white px-6 py-24 lg:px-8">
        <div className="text-center">
          <p className="text-3xl font-semibold text-red-600">404</p>
          <h1 className="mt-4 text-pretty text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            Page Not Found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            It looks like you found a glitch in the matrix...
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link to="/" className="text-sm font-semibold text-gray-900">
              Contact us for support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
  )
}

export default ErrorPage;