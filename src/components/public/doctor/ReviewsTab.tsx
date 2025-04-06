
import { Button } from "@/components/ui/button";
import { Star, User } from "lucide-react";

interface ReviewsTabProps {
  rating: number;
  reviewCount: number;
}

export const ReviewsTab = ({ rating, reviewCount }: ReviewsTabProps) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium">Patient Reviews</h3>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-5 w-5 ${star <= Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium">{rating} out of 5</span>
          </div>
        </div>
        
        <Button variant="outline">Write a Review</Button>
      </div>
      
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-medium">
                    {["Rahul S.", "Priya M.", "Amit K."][index]}
                  </h4>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-3 w-3 ${star <= 5-(index % 2) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-xs text-gray-500">
                      {["2 months ago", "1 week ago", "3 months ago"][index]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-700">
              {[
                "Dr. Johnson was very thorough in her examination and explained everything clearly. The staff was also very helpful and courteous.",
                "I had a great experience with Dr. Johnson. She took the time to listen to my concerns and provided a comprehensive treatment plan.",
                "Excellent doctor with great knowledge. Very patient and answered all my questions in detail. Highly recommended!"
              ][index]}
            </p>
          </div>
        ))}
      </div>
      
      <Button variant="outline" className="w-full mt-4">
        Load More Reviews
      </Button>
    </div>
  );
};
