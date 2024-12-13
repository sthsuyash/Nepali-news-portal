const NewsSkeleton = () => {
  return (
    <div className="px-4 md:px-8 py-8">
      {/* Headline Skeleton */}
      <div className="mb-4">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Skeleton for News Sections */}
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 mb-5">
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        <div className="w-full lg:w-6/12 mb-5">
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      {/* Popular News Skeleton */}
      <div className="mb-8">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-36 bg-gray-300 rounded mb-4"></div>
        <div className="h-36 bg-gray-300 rounded mb-4"></div>
      </div>

      {/* Section 2 Skeleton (Sports, Health, Diaspora) */}
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 mb-5">
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
        </div>

        <div className="w-full lg:w-4/12 mb-5">
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
        </div>
      </div>

      {/* Section 3 Skeleton (World, National, Opinion) */}
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 mb-5">
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
        </div>
        <div className="w-full lg:w-4/12 mb-5">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-36 bg-gray-300 rounded mb-4"></div>
          <div className="h-36 bg-gray-300 rounded mb-4"></div>
        </div>
      </div>

      {/* Section 4 Skeleton (Entertainment, Literature) */}
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 mb-5">
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="w-full lg:w-6/12 mb-5">
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default NewsSkeleton;
