const NewsDetailsPageSkeleton = () => {
  return (
    <div className="p-4">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        <div className="h-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      </div>
    </div>
  );
};

export default NewsDetailsPageSkeleton;
