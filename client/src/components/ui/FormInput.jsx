const FormInput = ({ label, value, onChange, type = "text" , ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-3 bg-gray-50 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
      {...props}
    />
  </div>
);

export default FormInput;
