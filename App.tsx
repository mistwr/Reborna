import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import ChatbotDemo from './sections/ChatbotDemo';
import Problems from './sections/Problems';
import Solution from './sections/Solution';
import Pricing from './sections/Pricing';
import PackBase from './sections/PackBase';
import Testimonials from './sections/Testimonials';
import Sectors from './sections/Sectors';
import FAQ from './sections/FAQ';
import RiskReversal from './sections/RiskReversal';
import Footer from './sections/Footer';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      // Get all pinned ScrollTriggers sorted by start position
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center:
          (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );

            // If not in a pinned section, allow free scroll
            if (!inPinned) return value;

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Background Layer */}
      <div className="fixed inset-0 gradient-bg -z-10" />
      <div className="fixed inset-0 aurora-bg -z-10" />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <main className="relative">
        <Hero />
        <ChatbotDemo />
        <Problems />
        <Solution />
        <Pricing />
        <PackBase />
        <Testimonials />
        <Sectors />
        <FAQ />
        <RiskReversal />
        <Footer />
      </main>
    </div>
  );
}

export default App;
