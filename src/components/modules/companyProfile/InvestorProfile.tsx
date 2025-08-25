import { Card, CardContent } from '@/components/ui/card';
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
    <div>
      <Card className="rounded-2xl shadow-lg border p-6 max-w-4xl mx-auto">
        <CardContent className="space-y-6">
          {/* Title */}

          {/* Investment Experience */}
          <div>
            <h3 className="text-lg font-medium  mb-1">Investment Experience</h3>
            <p className=" leading-relaxed whitespace-pre-line">{profile.investmentExperience}</p>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div>
              <span className="font-semibold text-primary">Portfolio Size: </span>
              <span>{profile.portfolioSize ?? 'N/A'}</span>
            </div>
            <div>
              <span className="font-semibold">Investment Stage: </span>
              <span>{profile.investmentStage ?? 'N/A'}</span>
            </div>
            <div className="md:col-span-2">
              <span className="font-semibold">Industry Focus: </span>
              <span>
                {profile.industryFocus?.length ? profile.industryFocus.join(', ') : 'N/A'}
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {profile.linkedIn && (
              <Link
                to={profile.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </Link>
            )}
            {profile.twitter && (
              <Link
                to={profile.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-sky-500 hover:underline"
              >
                Twitter
              </Link>
            )}
          </div>

          {/* Footer Info */}
          <p className="text-sm text-gray-500">
            Created: {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '—'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorProfile;
