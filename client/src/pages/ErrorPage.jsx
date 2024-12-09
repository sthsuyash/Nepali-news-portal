import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
      <main className="grid place-items-center bg-white px-6 py-24 lg:px-8">
        <div className="text-center">
          <p className="text-3xl font-semibold text-red-600">४०४</p>
          <h1 className="mt-4 text-pretty text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            पृष्ठ भेटिएन
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          माफ गर्नुहोस्, हामीले तपाईंले खोज्नु भएको पृष्ठ फेला पार्न सकेनौं
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              गृहपृष्ठमा फर्किनुहोस्
            </Link>
            <Link to="/" className="text-sm font-semibold text-gray-900">
              सहयोगका लागि सम्पर्क गर्नुहोस् <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
  )
}

export default ErrorPage;