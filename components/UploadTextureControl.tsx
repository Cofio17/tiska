import useModal from "@/hooks/useModal"
import Modal from "./ui/Modal"
import MaterialCard from "./ui/MaterialCard";
import { UploadTextureControlProps } from "@/types/upload";
import { materials } from "@/data/dummyMaterial";

export default function UploadTextureControl({ materialId, setMaterialId }: UploadTextureControlProps) {
    const { closeModal, isOpen, openModal } = useModal();
    return (
        <div className='flex flex-col gap-3 p-4 rounded-2xl border border-gray-200'>
            <div>

                <button className="w-full px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200" onClick={() => openModal('upload-modal')}>Choose Texture</button>
                <Modal id="upload-modal" isOpen={isOpen('upload-modal')} onClose={() => closeModal('upload-modal')}>
                    <div className="flex flex-row flex-wrap gap-4 justify-center" >

                        {materials.map((material) => (
                            <div key={material.id} onClick={() => {
                                setMaterialId(material.id);
                                closeModal("upload-modal");
                            }} className="mb-4 w-1/3 last:mb-0 max-md:w-4/5 ">
                                <MaterialCard
                                    title={material.name}
                                    description={material.description}
                                />
                            </div>
                        ))}
                    </div>
                </Modal>
            </div>
            {materialId && materials.find(m => m.id === materialId) && (
                <div className='mt-2 flex items-center justify-between'>
                    <span className='text-sm'>Selected: {materials.find(m => m.id === materialId)?.name}</span>
                </div>
            )}
        </div>
    )
}