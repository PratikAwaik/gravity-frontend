interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  submitBtnText?: string;
  cancelBtnText?: string;
  size?: "sm" | "md" | "lg";
  headerTitle?: string;
  showHeader?: boolean;
  submitBtnHoverClassName?: string;
}

export default function Modal({
  children,
  onClose,
  onSubmit,
  submitBtnText = "Submit",
  cancelBtnText = "Cancel",
  size = "md",
  headerTitle,
  showHeader = true,
  submitBtnHoverClassName,
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
      className="relative z-50"
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

      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          {/* Modal panel, show/hide based on modal state.
  
          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" */}
          <div
            className={`relative transform overflow-hidden rounded bg-white text-left shadow-xl transition-all sm:my-8 w-full ${sizeClasses}`}
          >
            {/* Modal Header */}
            {showHeader && (
              <div className="w-full p-4 border-b border-b-theme-gray-line">
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium leading-5">
                    {headerTitle}
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center justify-center"
                  >
                    <i className="ri-close-line text-2xl leading-4 text-theme-gray-action-icon"></i>
                  </button>
                </div>
              </div>
            )}
            {/* Modal Body */}
            <div className="bg-white p-4">{children}</div>
            {/* Modal Footer */}
            <div className="bg-theme-gray-line px-4 py-3 flex flex-row-reverse p-4">
              <button
                type="button"
                className={`inline-flex items-center justify-center rounded-3xl border border-transparent bg-theme-blue px-4 py-1.5 text-sm font-medium text-white shadow-sm ml-2 w-auto ${
                  submitBtnHoverClassName ?? "hover:brightness-110"
                }`}
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
