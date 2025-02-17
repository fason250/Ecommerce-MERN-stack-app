
const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-auto bg-gray-900 text-white text-center p-4">
      <div className="w-full max-w-lg mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 300"
          fill="none"
          className="mx-auto text-yellow-400"
        >
          <circle cx="200" cy="150" r="100" stroke="currentColor" strokeWidth="10" fill="none" />
          <path
            d="M100 150 L100 250 L300 250 L300 150"
            stroke="currentColor"
            strokeWidth="10"
            fill="none"
            className="animate-pulse"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy="0.3em"
            fontSize="40"
            fontWeight="bold"
            fill="currentColor"
            className="text-3xl"
          >
            404😂😂
          </text>
        </svg>
      </div>

      <h1 className="text-4xl font-extrabold mb-4">Oops! Page Not Found</h1>
      <p className="text-xl mb-6">Looks like the page you were looking for doesn't exist. Try going back to our homepage!</p>

      <div className="flex gap-4">
        <a href="/" className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors duration-300">Go Home</a>
        <a href="/contact" className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-6 py-3 rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-300">Contact Us</a>
      </div>
    </div>
  );
};

export default NotFound;
