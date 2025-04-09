
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { getAllClinics, searchClinics } from '@/services/ClinicService';
import { Clinic } from '@/models/clinic/Clinic';
import { ClinicGridItem } from '@/components/public/clinic/ClinicGridItem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AllClinics() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalClinics, setTotalClinics] = useState(0);
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
  }, [page, searchQuery, toast]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
  };

  return (
    <AppLayout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6">Health Centers & Clinics</h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search clinics by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">
              Search
            </Button>
          </form>
        </div>
        
        {/* Clinics Count */}
        <p className="text-muted-foreground mb-4">
          Found {totalClinics} {totalClinics === 1 ? 'clinic' : 'clinics'}
        </p>
        
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
