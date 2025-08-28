import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react'; // Using lucide-react for icons

const ComingSoon = () => {
  return (
    <div className="h-screen bg-gradient-to-tr  flex items-center justify-center">
      <Card className="rounded-3xl shadow-2xl border  p-8 max-w-md text-center ">
        <CardContent className="space-y-6">
          {/* Animated Icon */}
          <div className="flex justify-center">
            <Clock className="w-16 h-16 text-indigo-500 animate-bounce" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold ">Coming Soon</h2>

          {/* Description */}
          <p className=" leading-relaxed">
            This feature is under development and will be available soon. Stay tuned!
          </p>

          {/* Optional Button */}
          <a
            href="/"
            className="inline-block mt-4 px-6 py-2 bg-indigo-500 text-white rounded-full font-medium shadow-lg hover:bg-indigo-600 transition-colors duration-300"
          >
            Go Home
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoon;
