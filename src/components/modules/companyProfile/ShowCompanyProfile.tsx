import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserCompanyInfoQuery } from '@/redux/features/auth/auth.api';
import InvestorProfile from './InvestorProfile';
import GradientTitle from '@/components/ui/gradientTitle';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

const ShowCompanyProfile = () => {
  const { data, isLoading } = useUserCompanyInfoQuery(undefined);
  const profile = data?.data;

  const tabValue = profile?.investor_profile
    ? 'investor_profile'
    : profile?.entrepreneur_profile
      ? 'entrepreneur_profile'
      : profile?.mentor_profile
        ? 'mentor_profile'
        : 'investor_profile';

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <Tabs defaultValue={tabValue} className="mx-auto w-full container mt-12">
        <TabsList className="mx-auto">
          <TabsTrigger value="investor_profile">Investor</TabsTrigger>
          <TabsTrigger value="entrepreneur_profile">Entrepreneur</TabsTrigger>
          <TabsTrigger value="mentor_profile">Mentor</TabsTrigger>
        </TabsList>

        <TabsContent value="investor_profile">
          {profile?.investor_profile ? (
            <InvestorProfile profile={profile.investor_profile} />
          ) : (
            <div className="text-center">
              <GradientTitle title="No Investor Profile Found." />
              <Link to="/company-profile">
                <Button>Add Investor Profile</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="entrepreneur_profile">
          <p>Entrepreneur Profile goes here.</p>
        </TabsContent>

        <TabsContent value="mentor_profile">
          <p>Mentor Profile goes here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShowCompanyProfile;
