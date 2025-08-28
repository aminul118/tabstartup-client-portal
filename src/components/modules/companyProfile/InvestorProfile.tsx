import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface InvestorProfileProps {
  profile: {
    investmentExperience: string;
    linkedIn?: string;
    twitter?: string;
    portfolioSize?: number;
    investmentStage?: string;
    industryFocus?: string[];
    createdAt?: string;
    updatedAt?: string;
  };
}

const InvestorProfile = ({ profile }: InvestorProfileProps) => {
  return (
    <Card className="max-w-4xl mx-auto mt-8 pt-0 shadow-xl rounded-3xl border  hover:shadow-2xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-3xl p-6">
        <CardTitle className="text-2xl font-bold">Investor Profile</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 p-6 ">
        {/* Investment Experience */}
        <div>
          <h3 className="text-lg font-medium mb-1">Investment Experience</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {profile.investmentExperience}
          </p>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <div>
            <span className="font-semibold text-primary">Portfolio Size: </span>
            <span>{profile.portfolioSize ?? 'N/A'}</span>
          </div>
          <div>
            <span className="font-semibold">Investment Stage: </span>
            <span>{profile.investmentStage ?? 'N/A'}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="font-semibold">Industry Focus: </span>
            <span>{profile.industryFocus?.length ? profile.industryFocus.join(', ') : 'N/A'}</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4">
          {profile.linkedIn && (
            <Link
              to={profile.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              LinkedIn
            </Link>
          )}
          {profile.twitter && (
            <Link
              to={profile.twitter}
              target="_blank"
              rel="noreferrer"
              className="text-sky-500 hover:underline font-medium"
            >
              Twitter
            </Link>
          )}
        </div>

        {/* Footer Info */}
        <p className="text-sm ">
          Created: {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '—'}
        </p>
      </CardContent>
    </Card>
  );
};

export default InvestorProfile;
