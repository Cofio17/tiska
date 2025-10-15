import { MaterialCardProps } from "@/types/ui";

export default function MaterialCard({
    title,
    description,
    imageUrl = "/images/placeholder.jpg",
}: MaterialCardProps) {
    return (
        <div className="group border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md standard-transition-300">
            {/* Slika sa overlay-em */}
            <div className="relative w-full h-64 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay sa dugmadima */}
                <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-3 transition-opacity duration-300">
                    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                        Select
                    </button>
                    <button className="px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition">
                        Learn more
                    </button>
                </div>
            </div>

            {/* Tekstualni deo */}
            <div className="p-4 text-center">
                <h3 className="text-base font-semibold mb-1">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
}
