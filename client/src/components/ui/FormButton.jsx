const FormButton = ({ onClick, label, loading = false }) => (
  <div>
    <button
      onClick={onClick}
      className={`w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition duration-200 ${loading ? 'cursor-not-allowed disabled' : ''}`}
    >
      {label}
    </button>
  </div>
);

export default FormButton;
