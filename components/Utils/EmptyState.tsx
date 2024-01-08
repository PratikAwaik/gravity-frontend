import Image from "next/image";

interface EmptyStateProps {
  icon: string;
  title: string;
  btnText?: string;
  btnVariantClassName?: "";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function EmptyState({
  icon,
  title,
  btnText,
  btnVariantClassName,
  onClick,
}: EmptyStateProps) {
  return (
    <div className="w-full h-64 flex flex-col items-center justify-center">
      <Image
        src={icon}
        width={32}
        height={32}
        className="object-cover rounded-full"
      />
      <h6 className="text-sm mt-3">{title}</h6>
      {btnText && (
        <button type="button" onClick={onClick} className="btn-primary">
          {btnText}
        </button>
      )}
    </div>
  );
}
