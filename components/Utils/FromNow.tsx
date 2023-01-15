import fromnow from "fromnow";

interface FromNowProps {
  date: number;
}

export default function FromNow({ date }: FromNowProps) {
  return (
    <span className="text-xs text-theme-meta-text">
      {fromnow(date, { max: 1, suffix: true })}
    </span>
  );
}
