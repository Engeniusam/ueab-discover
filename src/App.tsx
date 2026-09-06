import { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryFilterBar from './components/CategoryFilterBar';
import DestinationCard from './components/DestinationCard';
import DestinationDetailModal from './components/DestinationDetailModal';
import InformationGrid from './components/InformationGrid';
import Footer from './components/Footer';
import FaroTelemetryInspector from './components/FaroTelemetryInspector';
import TransitModal from './components/TransitModal';
import StudentPassModal from './components/StudentPassModal';
import SavedDrawer from './components/SavedDrawer';
import { DESTINATIONS } from './data/destinations';
import { Destination } from './types';
import { faroService } from './services/faro';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchAttractions, setSearchAttractions] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [matatuVerifiedOnly, setMatatuVerifiedOnly] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('kapsabet_saved_spots');
      return stored ? JSON.parse(stored) : ['chepkiit-waterfalls'];
    } catch {
      return ['chepkiit-waterfalls'];
    }
  });

  // Modal controls
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [isTransitOpen, setIsTransitOpen] = useState(false);
  const [isStudentPassOpen, setIsStudentPassOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [telemetryLogsCount, setTelemetryLogsCount] = useState(0);

  // Initialize Faro and listen to telemetry events
  useEffect(() => {
    faroService.init();
    const unsubscribe = faroService.subscribe((logs) => {
      setTelemetryLogsCount(logs.length);
    });
    return () => unsubscribe();
  }, []);

  // Persist saved IDs
  useEffect(() => {
    try {
      localStorage.setItem('kapsabet_saved_spots', JSON.stringify(savedIds));
    } catch {
      // ignore
    }
  }, [savedIds]);

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  /**
   * Custom Action: Add faro.api.pushEvent('destination_viewed', { name: destination })
   * whenever a user clicks a destination card.
   */
  const handleViewDetails = (destination: Destination) => {
    faroService.pushDestinationViewed(destination.name);
    setSelectedDestination(destination);
  };

  // Filter destinations
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const matchesCat =
          item.category === selectedCategory ||
          item.categoryLabels.some((l) => l.toLowerCase() === selectedCategory.toLowerCase());
        if (!matchesCat) return false;
      }

      // Matatu verified filter
      if (matatuVerifiedOnly && !item.studentPassVerified) {
        return false;
      }

      // Search query (from header or category bar)
      const query = (searchQuery || searchAttractions).trim().toLowerCase();
      if (query) {
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesLocation = item.locationDetails.toLowerCase().includes(query);
        const matchesLabels = item.categoryLabels.some((l) => l.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesLocation && !matchesLabels) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, matatuVerifiedOnly, searchQuery, searchAttractions]);

  const savedDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => savedIds.includes(d.id));
  }, [savedIds]);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] selection:bg-[#adedd3] selection:text-[#006948]">
      {/* Top Sticky Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        savedCount={savedIds.length}
        onOpenSaved={() => setIsSavedOpen(true)}
        onOpenTransit={() => setIsTransitOpen(true)}
        onOpenStudentPass={() => setIsStudentPassOpen(true)}
        onToggleTelemetry={() => setIsTelemetryOpen((prev) => !prev)}
        telemetryLogsCount={telemetryLogsCount}
      />

      {/* Main Content Flow */}
      <main className="flex-1 pb-12">
        {/* Hero Banner Section */}
        <HeroBanner onExploreClick={() => setSelectedCategory('all')} />

        {/* Category Filter Pills & Search */}
        <CategoryFilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchAttractions={searchAttractions}
          onSearchAttractionsChange={setSearchAttractions}
          matatuVerifiedOnly={matatuVerifiedOnly}
          onToggleMatatuVerified={() => setMatatuVerifiedOnly((prev) => !prev)}
          totalCount={DESTINATIONS.length}
        />

        {/* Destination Cards Grid */}
        <section className="max-w-[1280px] mx-auto px-4 lg:px-8 py-2">
          {filteredDestinations.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#eaedff] my-6">
              <p className="text-base font-bold text-[#131b2e]">No destinations found matching your criteria</p>
              <p className="text-xs text-[#6d7a72] mt-1 mb-4">Try clearing your search query or selecting "All Spots".</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setSearchAttractions('');
                  setMatatuVerifiedOnly(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#006948] text-white text-xs font-bold hover:bg-[#047857] transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  onViewDetails={handleViewDetails}
                  isSaved={savedIds.includes(dest.id)}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          )}
        </section>

        {/* Safety, Local Contacts & Campus Edge Latency */}
        <InformationGrid />
      </main>

      {/* Footer with intentional error-trigger button */}
      <Footer
        onOpenTelemetry={() => setIsTelemetryOpen(true)}
        onOpenGuidelines={() => setIsStudentPassOpen(true)}
      />

      {/* Destination Details Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        isSaved={selectedDestination ? savedIds.includes(selectedDestination.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Grafana Faro Live Telemetry Inspector Drawer */}
      <FaroTelemetryInspector
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
      />

      {/* Companion Modals */}
      <TransitModal
        isOpen={isTransitOpen}
        onClose={() => setIsTransitOpen(false)}
      />

      <StudentPassModal
        isOpen={isStudentPassOpen}
        onClose={() => setIsStudentPassOpen(false)}
      />

      <SavedDrawer
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedDestinations={savedDestinations}
        onRemoveSaved={handleToggleSave}
        onSelectDestination={handleViewDetails}
      />
    </div>
  );
}
