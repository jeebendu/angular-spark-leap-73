
import { Link } from "react-router-dom";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-[#effffe] pt-12 border-t">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-[#0ABAB5]">ClinicHub</h3>
            <p className="text-gray-600 mb-4">
              Your trusted healthcare companion for finding and booking appointments with top medical professionals.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-[#d7f7f6] p-2 rounded-full hover:bg-[#bff1ef] transition-colors">
                <Facebook className="h-4 w-4 text-[#0ABAB5]" />
              </a>
              <a href="#" className="bg-[#d7f7f6] p-2 rounded-full hover:bg-[#bff1ef] transition-colors">
                <Twitter className="h-4 w-4 text-[#0ABAB5]" />
              </a>
              <a href="#" className="bg-[#d7f7f6] p-2 rounded-full hover:bg-[#bff1ef] transition-colors">
                <Instagram className="h-4 w-4 text-[#0ABAB5]" />
              </a>
              <a href="#" className="bg-[#d7f7f6] p-2 rounded-full hover:bg-[#bff1ef] transition-colors">
                <Linkedin className="h-4 w-4 text-[#0ABAB5]" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-[#0ABAB5]">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#0ABAB5] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/doctor-search" className="text-gray-600 hover:text-[#0ABAB5] transition-colors">Find Doctors</Link>
              </li>
              <li>
                <Link to="/appointments" className="text-gray-600 hover:text-[#0ABAB5] transition-colors">My Appointments</Link>
              </li>
              <li>
                <Link to="/tests" className="text-gray-600 hover:text-[#0ABAB5] transition-colors">Book Tests</Link>
              </li>
              <li>
                <Link to="/reports" className="text-gray-600 hover:text-[#0ABAB5] transition-colors">My Reports</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-[#0ABAB5]">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-[#0ABAB5] mr-2 mt-0.5" />
                <span className="text-gray-600">
                  123 Healthcare Avenue, Koramangala, Bangalore, 560034
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-[#0ABAB5] mr-2" />
                <span className="text-gray-600">+91 9876543210</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-[#0ABAB5] mr-2" />
                <span className="text-gray-600">support@clinichub.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-[#0ABAB5]">Subscribe to Newsletter</h4>
            <p className="text-gray-600 mb-3">
              Stay updated with the latest healthcare news and offers.
            </p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="bg-[#0ABAB5] hover:bg-[#09a09b] text-white rounded-l-none">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} ClinicHub. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-600 hover:text-[#0ABAB5] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-[#0ABAB5] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-[#0ABAB5] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
