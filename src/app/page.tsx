import dynamic from 'next/dynamic';
import Hero from '@/sections/Hero';
import Navbar from '@/sections/Navbar';
import Work from '@/sections/Works';

// Force static generation for maximum performance
export const dynamicParams = false;
export const revalidate = 3600; // Revalidate every hour

// Lazy load below-the-fold components to reduce initial bundle size
const Partners = dynamic(() => import('@/sections/Partners'), {
  loading: () => <div className="w-full py-0 pt-40 md:pt-20 pb-16 lg:pb-0 lg:pt-0 lg:py-16 min-h-content" />,
});

const Works = dynamic(() => import('@/sections/Works'), {
  loading: () => <div className="w-full py-16 bg-[#F7F7F7]" />,
});

const Testimonials = dynamic(() => import('@/sections/Testimonials'), {
  loading: () => <div className="w-full py-16 bg-[#F7F7F7]" />,
});

const Footer = dynamic(() => import('@/sections/Footer'), {
  loading: () => <div className="w-full bg-white py-12" />,
});

export default function Home() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {/* Content will go here - scroll will only appear if content exceeds viewport */}
        <Navbar />
        <Hero />
        <Partners />
        <Work />
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
}
