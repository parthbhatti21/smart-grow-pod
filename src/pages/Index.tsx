import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ImpactSection from '@/components/ImpactSection';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ImpactSection />
      <Footer />
    </div>
  );
};

export default Index;
