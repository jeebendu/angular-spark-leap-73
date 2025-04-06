
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Clock, Mic, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationSelector } from "./LocationSelector";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [openLocationSelector, setOpenLocationSelector] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  const suggestions = [
    { text: "Cardiologist", type: "specialty", icon: <Clock className="h-5 w-5 text-gray-400" /> },
    { text: "Neurologist", type: "specialty", icon: <Clock className="h-5 w-5 text-gray-400" /> },
    { text: "Dermatologist", type: "specialty", icon: <Clock className="h-5 w-5 text-gray-400" /> },
    { text: "Pediatrician", type: "specialty", icon: <Clock className="h-5 w-5 text-gray-400" /> },
    { text: "Dr. Sarah Johnson", type: "doctor", icon: <Search className="h-5 w-5 text-gray-400" /> },
    { text: "Heart disease specialist", type: "keyword", icon: <Search className="h-5 w-5 text-gray-400" /> },
    { text: "Skin problems", type: "keyword", icon: <Search className="h-5 w-5 text-gray-400" /> }
  ];

  const filteredSuggestions = suggestions.filter(
    s => !searchQuery || s.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDoctorSearch = (term = "") => {
    const searchTerm = term || searchQuery;
    navigate(`/doctor/search${searchTerm ? `?query=${encodeURIComponent(searchTerm)}` : ""}`);
    setOpenSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleDoctorSearch(suggestion);
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice Search Unavailable",
        description: "Voice search is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      toast({
        title: "Voice Search Unavailable",
        description: "Voice search is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }
    
    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    
    setIsListening(true);
    setShowVoiceOverlay(true);
    setVoiceText("Listening...");
    
    recognition.start();
    
    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setVoiceText(transcript);
      
      if (event.results[current].isFinal) {
        setSearchQuery(transcript);
        setIsListening(false);
        
        toast({
          title: "Voice Recognized",
          description: `Searching for: "${transcript}"`,
        });
        
        setTimeout(() => {
          handleDoctorSearch(transcript);
          setShowVoiceOverlay(false);
        }, 1000);
      }
    };
    
    recognition.onerror = (event: any) => {
      setIsListening(false);
      setShowVoiceOverlay(false);
      toast({
        title: "Voice Search Error",
        description: `Error: ${event.error}`,
        variant: "destructive",
      });
    };
    
    recognition.onend = () => {
      setIsListening(false);
      setTimeout(() => {
        if (showVoiceOverlay) {
          setShowVoiceOverlay(false);
        }
      }, 500);
    };
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-radix-popper-content-wrapper]')
      ) {
        setOpenSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (openLocationSelector) {
      setOpenSuggestions(false);
    }
  }, [openLocationSelector]);

  const searchBarClasses = cn(
    "flex items-center w-full max-w-3xl mx-auto relative rounded-[30px] shadow-lg",
    openSuggestions ? "rounded-b-none shadow-lg" : "shadow-md",
    "bg-white border border-gray-200"
  );

  return (
    <div ref={searchContainerRef} className="w-full max-w-3xl mx-auto relative">
      {/* Voice Recognition Overlay */}
      {showVoiceOverlay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-morphism p-10 rounded-3xl max-w-md w-full mx-4 text-center">
            <div className="bg-pink-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mic className={cn(
                "h-16 w-16 transition-all",
                isListening ? "text-primary animate-pulse" : "text-gray-400"
              )} />
            </div>
            <h2 className="text-2xl font-medium text-gray-700 mb-2">Speak now</h2>
            <p className="text-gray-600 mb-6 text-lg font-medium animate-pulse">
              {voiceText}
            </p>
            <Button 
              variant="outline" 
              onClick={() => setShowVoiceOverlay(false)}
              className="rounded-full px-6"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className={searchBarClasses}>
        <div className="relative w-[30%] sm:w-[35%] p-2 sm:p-3 border-r border-gray-200">
          <LocationSelector 
            onOpenChange={(open) => {
              setOpenLocationSelector(open);
              if (open) setOpenSuggestions(false);
            }} 
          />
        </div>
        
        <div className="relative w-[70%] sm:w-[65%] pl-2 sm:pl-3 pr-2 flex items-center h-12 sm:h-14">
          <div className="relative w-full flex items-center">
            <Search className="h-5 w-5 text-muted-foreground absolute left-2 top-1/2 transform -translate-y-1/2" />
            <Input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search doctors, specialties..." 
              className="border-0 px-0 py-0 h-10 focus-visible:ring-0 placeholder:text-muted-foreground pl-10 pr-16 bg-transparent w-full text-base"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenSuggestions(true);
                setOpenLocationSelector(false);
              }}
              onFocus={() => {
                setOpenSuggestions(true);
                setOpenLocationSelector(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleDoctorSearch();
                }
              }}
            />
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center">
              {searchQuery && (
                <button 
                  onClick={clearSearch}
                  className="p-1 mr-1"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
              <button 
                onClick={handleVoiceSearch}
                className="p-1 mr-1"
                disabled={isListening}
              >
                <Mic className={cn(
                  "h-6 w-6 transition-colors", 
                  isListening ? "text-primary animate-pulse" : "text-gray-400 hover:text-primary"
                )} />
              </button>
              <Button 
                className="rounded-full h-9 w-9 p-0 flex items-center justify-center text-white bg-primary hover:bg-primary/90"
                onClick={() => handleDoctorSearch()}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {openSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border-x border-b border-gray-200 rounded-b-[30px] shadow-lg z-50 max-h-[60vh] overflow-y-auto">
          <div className="py-2">
            {filteredSuggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center"
                onClick={() => handleSuggestionClick(suggestion.text)}
              >
                {suggestion.icon}
                <span className="ml-3 text-base text-gray-700">{suggestion.text}</span>
              </div>
            ))}
            <div className="flex justify-center gap-2 p-3 border-t mt-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm h-9 rounded-full"
                onClick={() => handleDoctorSearch()}
              >
                Search Doctors
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm h-9 rounded-full"
              >
                Book an Appointment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
