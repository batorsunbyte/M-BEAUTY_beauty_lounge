import GalleryGrid from '../components/gallery/GalleryGrid'
import { SparkleBackground } from '@/components/ui/SparkleBackground'

export default function Gallery() {
    return (
        <main className="min-h-screen w-full pt-[72px] pb-16 relative" style={{ background: 'var(--color-bg-body)' }}>
            <SparkleBackground particleColor="#BD7F6C" speed={2.5} particleDensity={60} />
            <div className="relative z-20">
              <GalleryGrid />
            </div>
        </main>
    );
}
