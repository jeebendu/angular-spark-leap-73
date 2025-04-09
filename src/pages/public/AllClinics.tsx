
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { getAllClinics, searchClinics } from '@/services/ClinicService';
import { Clinic } from '@/models/clinic/Clinic';
import { ClinicGridItem } from '@/components/public/clinic/ClinicGridItem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Mic, Filter, LayoutGrid, LayoutList } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export default function AllClinics() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalClinics, setTotalClinics] = useState(0);
  const [relevance, setRelevance] = useState("newest");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  // Observer for infinite scrolling
  const observer = useRef<IntersectionObserver>();
  const lastClinicElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Load clinics on mount and when page changes
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        setLoading(true);
        const response = searchQuery 
          ? await searchClinics(searchQuery, page, 10)
          : await getAllClinics(page, 10);
        
        const newClinics = response.data.content;
        setTotalClinics(response.data.totalElements);
        
        setClinics(prev => page === 0 ? newClinics : [...prev, ...newClinics]);
        setHasMore(page < response.data.totalPages - 1);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error fetching clinics",
          description: "Failed to load clinics. Please try again later."
        });
        console.error("Error fetching clinics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, [page, searchQuery, toast, relevance]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
  };

  const handleVoiceSearch = () => {
    toast({
      title: "Voice Search",
      description: "Voice search functionality will be implemented soon."
    });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setPage(0);
  };

  return (
    <AppLayout>
      <div className="py-6 max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Health Centers & Clinics</h1>
          <p className="text-muted-foreground">Find the best clinics and health centers near you</p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex items-stretch gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Search by doctor name, specialty, condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-12 h-12 rounded-full w-full"
              />
              {searchQuery && (
                <button 
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-12 flex items-center pr-3"
                >
                  <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                    ✕
                  </span>
                </button>
              )}
              <button 
                type="button"
                onClick={handleVoiceSearch}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <Mic className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              </button>
            </div>
            
            <Button type="submit" size="icon" className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="rounded-full h-12 w-12 border-muted-foreground/20"
            >
              <Filter className="h-5 w-5" />
            </Button>
          </form>
        </div>
        
        {/* Filters and View Options */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Found {totalClinics} {totalClinics === 1 ? 'clinic' : 'clinics'}
          </p>
          
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-32 justify-between font-normal">
                  {relevance === "newest" ? "Newest" : 
                   relevance === "rating" ? "Highest Rated" : 
                   relevance === "name" ? "Name (A-Z)" : 
                   "Relevance"}
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4">
                    <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.26618 11.9026 7.38064 11.95 7.49999 11.95C7.61933 11.95 7.73379 11.9026 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuRadioGroup value={relevance} onValueChange={setRelevance}>
                  <DropdownMenuRadioItem value="relevance">Relevance</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="rating">Highest Rated</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="name">Name (A-Z)</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex rounded-md border overflow-hidden">
              <button 
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white'}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button 
                className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white'}`}
                onClick={() => setViewMode('list')}
              >
                <LayoutList className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Clinics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinics.map((clinic, index) => (
            <ClinicGridItem
              key={clinic.id}
              clinic={clinic}
              index={index}
              isLastItem={index === clinics.length - 1}
              lastClinicElementRef={lastClinicElementRef}
            />
          ))}
          
          {loading && Array.from({ length: 3 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="h-80 rounded-lg bg-gray-100 animate-pulse" />
          ))}
        </div>
        
        {!loading && clinics.length === 0 && (
          <div className="text-center py-10">
            <h2 className="text-xl font-medium mb-2">No clinics found</h2>
            <p className="text-muted-foreground">Try a different search term</p>
          </div>
        )}
        
        {loading && page === 0 && (
          <div className="text-center py-10">
            <p>Loading clinics...</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
