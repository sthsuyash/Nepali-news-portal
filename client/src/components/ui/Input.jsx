const Input = ({ icon: Icon, ...props }) => {
	return (
		<div className="relative mb-6">
			{/* Icon container */}
			<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<Icon className="w-5 h-5 text-red-500" />
			</div>
			{/* Input field */}
			<input
				{...props}
				className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-md border-2 border-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500 text-gray-700 placeholder-gray-400 transition duration-150 shadow-sm"
			/>
		</div>
	);
};

export default Input;
