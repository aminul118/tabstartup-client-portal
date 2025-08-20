import { cn } from "@/lib/utils";

interface GradientTitle {
  title?: string;
  description?: string;
  className?: string;
}

const GradientTitle = ({ title, description, className }: GradientTitle) => {
  return (
    <section>
      <div className={cn("text-center max-w-xl mx-auto ", className)}>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-5">
          {title}
        </h1>
        <p className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-5 ">
          {description}
        </p>
      </div>
    </section>
  );
};

export default GradientTitle;
