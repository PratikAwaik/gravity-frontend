import CustomTooltip from "../Utils/CustomTooltip";
import { useRef, useState } from "react";

interface MediaPostProps {
  postData: any;
  setPostData: React.Dispatch<React.SetStateAction<any>>;
}

export default function MediaPost({ postData, setPostData }: MediaPostProps) {
  const fileInputRef = useRef<any>();
  const [previewSource, setPreviewSource] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOnDrop = (e: any) => {
    setError(null);
    e.preventDefault();
    e.persist();
    const files = e.dataTransfer.files;
    if (files.length > 1) {
      setError("Whoops! You can only upload one file!");
      return;
    }
    handleFileChange(files[0]);
  };

  const bytesToMegaBytes = (bytes: number) => {
    return Number((bytes / 1024 / 1024).toFixed(2));
  };

  const handleFileChange = async (file: File) => {
    setError(null);
    fileInputRef.current.value = "";

    if (bytesToMegaBytes(file.size) > 10) {
      setError(`Whoops! File size must be less than 10MB!`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPostData({
        ...postData,
        mediaType: file.type,
        content: reader.result,
      });

      setPreviewSource(reader.result);
    };
  };

  const handleFileRemove = () => {
    setPreviewSource(null);
    setError(null);
    setPostData({ ...postData, mediaType: null, content: "" });
  };

  return (
    <div className="m-4">
      <input
        type="file"
        accept="image/png,image/gif,image/jpeg,image/webp,video/mp4,video/quicktime"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => handleFileChange((e.target.files as FileList)[0])}
      />
      <div
        className="flex justify-center items-center rounded border border-theme-gray-line border-dashed min-h-[18rem]"
        onDrop={handleOnDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
      >
        {!previewSource ? (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center">
              <p className="text-theme-blue text-base mr-2.5">
                Drag and drop image/video or
              </p>
              <button
                type="button"
                className="px-4 py-1.5 border border-theme-blue text-sm font-medium text-theme-blue hover:bg-theme-blue-50 rounded-3xl"
                onClick={() => fileInputRef.current.click()}
              >
                Upload
              </button>
            </div>
            {error && <p className="text-base text-theme-red my-3">{error}</p>}
          </div>
        ) : (
          <div className="w-full">
            {postData.mediaType?.includes("video") ? (
              <video
                preload="metadata"
                controls
                className="w-full object-contain max-h-[43.75rem]"
              >
                <source src={previewSource} />
              </video>
            ) : (
              <img
                src={previewSource}
                alt="Uploaded Image Preview"
                className="w-full object-contain max-h-[43.75rem]"
                loading="lazy"
              />
            )}
            <div className="p-2 flex justify-end items-center border-t border-t-theme-gray-line">
              <button
                id="submit-post-remove-file"
                type="button"
                onClick={handleFileRemove}
                className="rounded text-theme-gray-action-icon p-1 hover:bg-theme-gray-nav-icon-faded flex items-center justify-center"
              >
                <i className="ri-delete-bin-6-line text-xl leading-5"></i>
              </button>
              <CustomTooltip
                anchorId="submit-post-remove-file"
                place="top"
                content="Remove"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
