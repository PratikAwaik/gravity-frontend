import { PlacesType, Tooltip } from "react-tooltip";

interface CustomTooltipProps {
  anchorId: string;
  place?: PlacesType;
  content: string;
  className?: string;
}

export default function CustomTooltip({
  anchorId,
  place = "bottom",
  content,
  className,
}: CustomTooltipProps) {
  return (
    <Tooltip
      anchorId={anchorId}
      place={place}
      content={content}
      className={`custom-tooltip ${className ?? ""}`}
    />
  );
}
