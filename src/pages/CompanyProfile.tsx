import EntrepreneurProfileForm from '@/components/modules/companyProfile/EntrepreneurProfileForm';
import InvestorProfileForm from '@/components/modules/companyProfile/InvestorProfileForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import CompanyProfileSkeleton from '@/components/modules/companyProfile/CompanyProfileSkeleton';
import MentorProfileForm from '@/components/modules/companyProfile/MentorProfileForm';

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
          <TabsTrigger value="mentor">Mentor</TabsTrigger>
        </TabsList>
        <TabsContent value="investor">
          <InvestorProfileForm />
        </TabsContent>
        <TabsContent value="entrepreneur">
          <EntrepreneurProfileForm />
        </TabsContent>
        <TabsContent value="mentor">
          <MentorProfileForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyProfile;
