import React, { useRef, useState } from "react";
import attachmentIcon from "../../assets/icons/attachment.svg";
import crossIcon from "../../assets/icons/cross.svg";
import FormErrorLine from "../../components/reusable/FormErrorLine";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export type error = {
  category?: {
    message: string;
  };
  subCategory?: {
    message: string;
  };
  productImages?: {
    message: string;
  };
};

interface UploadImage {
  register: any;
  errors: error;
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  selectedImages: File[];
}

const UploadImage: React.FC<UploadImage> = ({
  errors,
  selectedImages,
  setSelectedImages,
}) => {
  const [isFileDropping, setIsFileDropping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenInput = () => {
    inputRef?.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const fileList = files as FileList;
      const duplicateFiles = Array.from(fileList).filter((file) =>
        selectedImages.some((selectedImage) => selectedImage.name === file.name)
      );

      if (duplicateFiles.length > 0) {
        // Display error message
        Swal.fire({
          title: "Duplicate Image",
          text: "You have already selected this image. Please select a different one.",
          icon: "error",
        });
        event.target.value = "";
      } else {
        const allFiles = [...Array.from(fileList)];
        if (allFiles.length > 4) {
          toast.error("You can only upload 4 images maximum!");
          setSelectedImages(allFiles.slice(0, 4));
        } else {
          setSelectedImages(allFiles);
        }
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsFileDropping(false);
    const files = event.dataTransfer.files;
    if (files.length === 0) return;
    if (files && files.length > 0) {
      const fileList = files as FileList;
      const duplicateFiles = Array.from(fileList).filter((file) =>
        selectedImages.some((selectedImage) => selectedImage.name === file.name)
      );

      if (duplicateFiles.length > 0) {
        // Display error message
        Swal.fire({
          title: "Duplicate Image",
          text: "You have already selected this image. Please select a different one.",
          icon: "error",
        });
      } else {
        setSelectedImages([...selectedImages, ...Array.from(fileList)]);
      }
    }
  };

  return (
    <div>
      <div className="w-full">
        <div className="bg-white min-h-[466px] rounded-[20px] border border-accent-100  p-6">
          <h3 className="font-inter font-semibold text-xl ">
            Upload Product Images
          </h3>

          {/* file input 👇  */}
          <button
            onDrop={handleDrop}
            onClick={handleOpenInput}
            type="button"
            onDragOver={(e) => {
              e.preventDefault();
              setIsFileDropping(true);
            }}
            onDragLeave={() => {
              setIsFileDropping(false);
            }}
            className={` h-[128px] w-full mt-6 w-ull flex gap-3 flex-col justify-center items-center rounded-xl border-2 border-dashed border-accent-300 ${
              isFileDropping && "shadow-md border-primary-500 "
            }`}
          >
            <div className="text-center">
              <div className={`h-10 w-40  rounded-md `}>
                <img className="w-full h-full" src={attachmentIcon} alt="" />
              </div>
              <input
                multiple
                onChange={handleImageChange}
                ref={inputRef}
                className="hidden"
                accept="image/*"
                type="file"
              />
            </div>
            <div className="">
              <h3 className="font-inter font-semibold text-xl ">
                Drag or Browse File
              </h3>
            </div>
          </button>
          <FormErrorLine message={errors?.productImages?.message ?? ""} />

          {/* uploaded files */}
          <div className="mt-3 text-accent-500 h-[193px] w-full">
            {selectedImages.length === 0 ? (
              <>
                <div className="h-full w-full flex justify-center items-center ">
                  <h4>No images uploaded yet! </h4>
                </div>
              </>
            ) : (
              <>
                <h6 className="text-accent-500 text-sm font-inter">
                  Uploaded files
                </h6>
                <div className="  overflow-y-auto scrollbar-sm  mt-2 flex flex-col gap-2 justify-center ">
                  <div className="h-[164px]">
                    {selectedImages.map((item) => (
                      <div className="flex my-1 justify-between bg-accent-50  rounded-xl py-5 px-6">
                        <h6 className="font-inter text-wrap  font-medium text-sm">
                          <a
                            className="hover:underline font-medium text-sm"
                            target="_blank"
                            href={
                              typeof item === "string"
                                ? item
                                : URL.createObjectURL(item)
                            }
                          >
                            {item.name ?? item}
                          </a>
                        </h6>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedImages(
                              selectedImages.filter((f) => f.name !== item.name)
                            )
                          }
                          className="h-6 w-6"
                        >
                          <img
                            className="h-full w-full"
                            src={crossIcon}
                            alt=""
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
