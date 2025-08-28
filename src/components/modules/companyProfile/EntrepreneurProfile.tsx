/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import GradientTitle from '@/components/ui/gradientTitle';

const EntrepreneurProfile = ({ profile }: { profile: any }) => {
  if (!profile) return <p className="text-center">No Entrepreneur Profile Found.</p>;

  const { founders, company, funding, traction, stage, industry } = profile;

  return (
    <div className="max-w-5xl mx-auto space-y-6 mt-8">
      <Card className="shadow-md">
        <CardHeader>
          <GradientTitle title={company?.name} description={company?.shortDescription} />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Company Info */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Company Info</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <li>
                <strong>Product:</strong> {company?.product}
              </li>
              <li>
                <strong>Location:</strong> {company?.location}
              </li>
              <li>
                <strong>LinkedIn:</strong>{' '}
                <a href={company?.linkedIn} target="_blank" className="text-blue-500">
                  {company?.linkedIn}
                </a>
              </li>
              <li>
                <strong>Twitter:</strong>{' '}
                <a href={company?.twitter} target="_blank" className="text-blue-500">
                  {company?.twitter}
                </a>
              </li>
              <li>
                <strong>Website:</strong>{' '}
                <a href={company?.website} target="_blank" className="text-blue-500">
                  {company?.website}
                </a>
              </li>
            </ul>
          </section>

          {/* Founders */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Founders</h3>
            <p>
              <strong>Technical Founder:</strong> {founders?.technicalFounder}
            </p>
            <p>
              <strong>Other Founders:</strong> {founders?.names?.join(', ')}
            </p>
            {founders?.coFounders && founders?.coFounderNames?.length > 0 && (
              <p>
                <strong>Co-Founders:</strong> {founders.coFounderNames.join(', ')}
              </p>
            )}
          </section>

          {/* Funding */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Funding</h3>
            <p>
              <strong>Amount Seeking:</strong> {funding?.amountSeeking} {funding?.currency}
            </p>
            <p>
              <strong>Equity Offered:</strong> {funding?.equityOffered}%
            </p>
          </section>

          {/* Traction */}
          {traction && (
            <section>
              <h3 className="text-lg font-semibold mb-2">Traction</h3>
              <p>
                <strong>Users Count:</strong> {traction?.usersCount}
              </p>
              <p>
                <strong>Revenue:</strong> {traction?.revenue}
              </p>
              <p>
                <strong>Growth Rate:</strong> {traction?.growthRate}
              </p>
            </section>
          )}

          {/* Stage & Industry */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p>
              <strong>Stage:</strong> {stage}
            </p>
            <p>
              <strong>Industry:</strong> {industry}
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default EntrepreneurProfile;
