
import { useEffect, useState } from "react";
import { Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getReviewsBYDoctorId } from "@/services/doctorDetailsService";
import { PatientList } from "@/pages/DoctorDetails";

interface ReviewsTabProps {
  rating: number;
  reviewCount: number;

}
export interface Reviews{
  id: number;
  like: number;
  dislike: number;
  message: string;
  rating: number;
  isrecommended: boolean;
  patient:PatientList;
  createdTime:Date;
  // doctor:Doctor;
}


export const ReviewsTab = () => {

  const [reviews, setReview] = useState<Reviews[]>([]);
  
  const [loading, setLoading] = useState(false);

   useEffect(() => {
      fetchReviewsByDoctorId();
        
    },[] ); 

      const fetchReviewsByDoctorId = async () => {
        try{
          const data = await getReviewsBYDoctorId();
          const parsedData = data.map((review: any) => ({
            ...review,
            createdTime: new Date(review.createdTime), // Parse the date string
          }));
          setReview(parsedData);
        }
        catch(error){
          console.error("Error fetching doctors:", error);
        }finally{
          setLoading(false);
        }
      };

 
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
                  className={`h-5 w-5 ${star <= Math.floor(0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium">rating out of 5</span>
          </div>
        </div>
        
        <Button variant="outline">Write a Review</Button>
      </div>
      
      <div className="space-y-4">
      {reviews.length > 0 ? (
          reviews.map((review) => (
          <div   key={review.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-medium">
                    {review.patient?.firstname} {review.patient?.lastname}
                 {/* <pre>{JSON.stringify(reviews, null, 2)}</pre>    */}
                  </h4>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <Star 
                          key={index} 
                          className={`h-3 w-3 ${index < Math.floor(review.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-xs text-gray-500">
                     {review.createdTime.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-700">
              {review.message}
            </p>
          </div>
          ))
           ) : (
            <p className="text-sm text-gray-500">No reviews available.</p>
          )}
    
      </div>
      
      <Button variant="outline" className="w-full mt-4" disabled={loading}>
      {loading ? "Loading..." : "Load More Reviews"}
      </Button>
    </div>
  );
};
