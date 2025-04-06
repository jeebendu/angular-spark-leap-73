
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface PromotionalBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  bgColor: string;
}

export const PromotionalBanner = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  bgColor
}: PromotionalBannerProps) => {
  return (
    <div 
      className={`w-full rounded-xl overflow-hidden relative ${bgColor}`}
      style={{ minHeight: "150px" }}
    >
      <div className="p-6 md:p-8 flex flex-col justify-center h-full w-full">
        <div className="max-w-[80%]">
          <h2 className="text-xl md:text-3xl font-bold text-white mb-2">{title}</h2>
          <p className="text-sm md:text-base text-white/90 mb-4">{subtitle}</p>
          <Button 
            asChild 
            className="rounded-full text-primary-foreground bg-white hover:bg-white/90 hover:text-primary-foreground text-primary px-6"
          >
            <a href={buttonLink}>
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
