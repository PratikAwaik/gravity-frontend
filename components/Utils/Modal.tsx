interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  submitBtnText?: string;
  cancelBtnText?: string;
  size?: "sm" | "md" | "lg";
}

export default function Modal({
  children,
  onClose,
  onSubmit,
  submitBtnText = "Submit",
  cancelBtnText = "Cancel",
  size = "md",
}: ModalProps) {
  const sizeClasses =
    size === "sm"
      ? "max-w-lg"
      : size === "md"
      ? "max-w-xl"
      : size === "lg"
      ? "max-w-3xl"
      : "";

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* <!--
      Background backdrop, show/hide based on modal state.
  
      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          {/* Modal panel, show/hide based on modal state.
  
          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" */}
          <div
            className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full ${sizeClasses}`}
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {children}
            </div>
            <div className="bg-gray-50 px-4 py-3 flex flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-3xl border border-transparent bg-theme-blue px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:brightness-110 ml-3 w-auto"
                onClick={onSubmit}
              >
                {submitBtnText}
              </button>
              <button
                type="button"
                className="px-4 py-1.5 border border-theme-blue text-sm font-medium text-theme-blue hover:bg-theme-blue-50 rounded-3xl"
                onClick={onClose}
              >
                {cancelBtnText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
