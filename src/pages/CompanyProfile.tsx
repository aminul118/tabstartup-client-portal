import Logo from '@/components/layouts/Logo';
import EntrepreneurProfileForm from '@/components/modules/companyProfile/EntrepreneurProfileForm';
import InvestorProfileForm from '@/components/modules/companyProfile/InvestorProfileForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CompanyProfile = () => {
  return (
    <div>
      <Logo />
      <Tabs defaultValue="investor" className=" mx-auto container mt-12">
        <TabsList className="w-md mx-auto">
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
