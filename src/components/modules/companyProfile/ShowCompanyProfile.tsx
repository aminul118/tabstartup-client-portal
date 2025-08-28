import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserCompanyInfoQuery } from '@/redux/features/auth/auth.api';
import InvestorProfile from './InvestorProfile';
import GradientTitle from '@/components/ui/gradientTitle';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import EntrepreneurProfile from './EntrepreneurProfile';
import MentorProfile from './MentorProfile';

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

  const renderNoProfile = (type: string) => (
    <div className="text-center py-10">
      <GradientTitle title={`No ${type} Profile Found.`} />
      <Link to="/company-profile">
        <Button className="mt-4">Add {type} Profile</Button>
      </Link>
    </div>
  );

  return (
    <div>
      <Tabs defaultValue={tabValue} className="mx-auto w-full container mt-12">
        <TabsList className="mx-auto hidden">
          <TabsTrigger value="investor_profile">Investor</TabsTrigger>
          <TabsTrigger value="entrepreneur_profile">Entrepreneur</TabsTrigger>
          <TabsTrigger value="mentor_profile">Mentor</TabsTrigger>
        </TabsList>

        <TabsContent value="investor_profile">
          {profile?.investor_profile ? (
            <InvestorProfile profile={profile.investor_profile} />
          ) : (
            renderNoProfile('Investor')
          )}
        </TabsContent>

        <TabsContent value="entrepreneur_profile">
          {profile?.entrepreneur_profile ? (
            <EntrepreneurProfile profile={profile.entrepreneur_profile} />
          ) : (
            renderNoProfile('Entrepreneur')
          )}
        </TabsContent>

        <TabsContent value="mentor_profile">
          {profile?.mentor_profile ? (
            <MentorProfile profile={profile.mentor_profile} />
          ) : (
            renderNoProfile('Mentor')
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShowCompanyProfile;
