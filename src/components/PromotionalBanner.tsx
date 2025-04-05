
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface PromotionalBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  bgColor: string;
}

export const PromotionalBanner = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  imageSrc,
  bgColor
}: PromotionalBannerProps) => {
  return (
    <div 
      className={`w-full rounded-xl overflow-hidden relative ${bgColor}`}
      style={{ minHeight: "180px" }}
    >
      <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 h-full w-full">
        <div className="max-w-[60%]">
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
        
        {imageSrc && (
          <div className="absolute right-0 bottom-0 md:flex items-end h-full hidden">
            <img 
              src={imageSrc} 
              alt="Banner illustration" 
              className="h-full object-contain max-h-[180px]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
