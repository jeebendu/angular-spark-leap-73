
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const SimilarDoctors = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Similar Specialists</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="overflow-hidden border-none card-shadow">
            <CardContent className="p-0">
              <div className="flex items-center p-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-3">
                  <img 
                    src={`https://placehold.co/200/eaf7fc/33C3F0?text=Dr.+${index+1}&font=montserrat`}
                    alt={`Dr. ${index+1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-base">{`Dr. ${["Robert Smith", "Sarah Williams", "James Brown"][index]}`}</h4>
                  <p className="text-sm text-gray-500">{["Cardiologist", "Cardiologist", "Cardiac Surgeon"][index]}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-xs">{4.5 + (index * 0.1)}</span>
                    <span className="ml-1 text-xs text-gray-500">({150 + (index * 25)})</span>
                  </div>
                </div>
              </div>
              <Link to={`/doctor/${index + 2}`}>
                <Button variant="outline" className="m-4 w-[calc(100%-32px)] border-primary text-primary hover:bg-primary hover:text-white">
                  View Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
