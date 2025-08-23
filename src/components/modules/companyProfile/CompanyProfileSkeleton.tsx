import { Skeleton } from '@/components/ui/skeleton';

const CompanyProfileSkeleton = () => {
  return (
    <div className="mx-auto container mt-12 space-y-6">
      {/* Tabs Skeleton */}
      <div className="flex justify-center gap-4">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      {/* Form Skeleton */}
      <div className="space-y-4 mt-6">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  );
};

export default CompanyProfileSkeleton;
