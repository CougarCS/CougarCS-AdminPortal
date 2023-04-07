export const LoadSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-red-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-5.291a7.962 7.962 0 01-2.938 5.291l3 2.647A11.965 11.965 0 0024 12h-4z"
        ></path>
      </svg>
      <span>Loading...</span>
    </div>
  );
};
