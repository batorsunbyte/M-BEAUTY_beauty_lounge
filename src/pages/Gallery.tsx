import GalleryGrid from '../components/gallery/GalleryGrid'
import PageBackdrop from '@/components/ui/PageBackdrop'

export default function Gallery() {
    return (
        <main className="min-h-screen w-full pt-[72px] pb-16 relative">
            <PageBackdrop />
            <div className="relative z-10">
              <GalleryGrid />
            </div>
        </main>
    );
}
