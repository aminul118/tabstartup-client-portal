/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MentorProfileProps {
  profile: any;
}

export default function MentorProfile({ profile }: MentorProfileProps) {
  if (!profile) return <p className="text-center text-gray-500 mt-6">No Mentor Profile Found.</p>;

  return (
    <Card className="max-w-4xl mx-auto pt-0 mt-8 shadow-xl rounded-3xl border hover:shadow-2xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-3xl p-6">
        <CardTitle className="text-2xl font-bold">{profile.name}</CardTitle>
        <p className="text-sm mt-1 opacity-80">{profile.organization}</p>
      </CardHeader>
      <CardContent className="grid gap-5 p-6 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <div>
            <strong>Email:</strong> {profile.email}
          </div>
          <div>
            <strong>Phone:</strong> {profile.phone}
          </div>
          <div>
            <strong>Location:</strong> {profile.location}
          </div>
          <div>
            <strong>Industry:</strong> {profile.industryExpertise.join(', ')}
          </div>
          <div>
            <strong>Experience:</strong> {profile.yearsOfExperience} yrs
          </div>
          <div>
            <strong>Availability:</strong> {profile.availabilityPerMonthHours} hrs/month
          </div>
          <div>
            <strong>Compensation:</strong> {profile.compensationType}
          </div>
          <div>
            <strong>Preferred Regions:</strong> {profile.preferredRegions.join(', ')}
          </div>
        </div>

        <div className="mt-4">
          <strong>Education:</strong>
          <ul className="list-disc ml-5 mt-1 ">
            {profile.education.map((edu: any) => (
              <li key={edu._id}>
                {edu.degree} at {edu.institution} {edu.year && `(${edu.year})`}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <strong>Expertise & Startup Stage:</strong>
          <p>
            {profile.areasOfExpertise.join(', ')} | {profile.preferredStartupStages.join(', ')}
          </p>
        </div>

        <div className="mt-4">
          <strong>Bio:</strong>
          <p className=" italic mt-1">{profile.bio}</p>
        </div>

        <div className="mt-4">
          <strong>Motivation:</strong>
          <p className=" mt-1">{profile.motivation}</p>
        </div>

        <div className="mt-4">
          <strong>Rating:</strong>
          <span className="ml-2 text-yellow-500 font-semibold">{profile.rating} ⭐</span>
        </div>

        {profile.socialLinks && (
          <div className="mt-4">
            <strong>Social Links:</strong>
            <ul className="list-disc ml-5 mt-1 text-blue-600">
              {profile.socialLinks.linkedIn && (
                <li>
                  <a
                    href={profile.socialLinks.linkedIn}
                    target="_blank"
                    className="hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {profile.socialLinks.twitter && (
                <li>
                  <a href={profile.socialLinks.twitter} target="_blank" className="hover:underline">
                    Twitter
                  </a>
                </li>
              )}
              {profile.socialLinks.website && (
                <li>
                  <a href={profile.socialLinks.website} target="_blank" className="hover:underline">
                    Website
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
