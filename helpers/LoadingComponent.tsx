const LoadingComponent = () => {
  return (
    <div className="flex items-start  justify-center mt-16 h-screen bg-white transition-opacity duration-500 ease-in-out opacity-100">
      <div className="flex items-center justify-center space-x-4">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="text-[20px] font-[800] text-gray-700">
         Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingComponent;
