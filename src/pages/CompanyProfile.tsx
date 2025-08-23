import EntrepreneurProfileForm from '@/components/modules/companyProfile/EntrepreneurProfileForm';
import InvestorProfileForm from '@/components/modules/companyProfile/InvestorProfileForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import CompanyProfileSkeleton from '@/components/modules/companyProfile/CompanyProfileSkeleton';

const CompanyProfile = () => {
  const { data, isLoading } = useUserInfoQuery(undefined);

  if (isLoading) {
    return <CompanyProfileSkeleton />;
  }

  const role = data?.data?.role;

  return (
    <div>
      <Tabs defaultValue={role} className="mx-auto container mt-12">
        <TabsList className="w-md mx-auto hidden">
          <TabsTrigger value="investor">Investor</TabsTrigger>
          <TabsTrigger value="entrepreneur">Entrepreneur</TabsTrigger>
        </TabsList>
        <TabsContent value="investor">
          <InvestorProfileForm />
        </TabsContent>
        <TabsContent value="entrepreneur">
          <EntrepreneurProfileForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyProfile;
