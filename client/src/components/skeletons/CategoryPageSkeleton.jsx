import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 

const CategoryPageSkeletion = () => {
    return (
        <div>
            {/* Breadcrumb Skeleton */}
            <div className="bg-white shadow-sm py-4">
                <div className="px-4 md:px-8 w-full">
                    <Skeleton width="30%" height={20} />
                    <Skeleton width="50%" height={20} style={{ marginTop: '10px' }} />
                </div>
            </div>

            {/* Main content Skeleton */}
            <div className="bg-slate-200 w-full">
                <div className="px-4 md:px-8 w-full py-8">
                    <div className="flex flex-wrap">
                        <div className="w-full xl:w-8/12">
                            <div className="w-full pr-0 xl:pr-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {Array(6).fill(0).map((_, i) => (
                                        <div key={`skeleton-${i}`} className="bg-white p-4 rounded-md shadow-md">
                                            <Skeleton height={200} />
                                            <Skeleton height={20} style={{ marginTop: '10px' }} />
                                            <Skeleton width="60%" height={15} style={{ marginTop: '5px' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-full xl:w-4/12">
                            <div className="w-full pl-0 xl:pl-4">
                                <div className="flex flex-col gap-y-8">
                                    <Skeleton height={40} />
                                    <Skeleton height={40} />
                                    <div className="p-4 bg-white">
                                        <Skeleton height={50} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8">
                        <Skeleton height={40} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPageSkeletion;
