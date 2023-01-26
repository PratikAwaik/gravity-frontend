import fromnow from "fromnow";

interface FromNowProps {
  date: number;
}

export default function FromNow({ date }: FromNowProps) {
  return (
    <span className="text-xs text-theme-meta-text z-10">
      {fromnow(date, { max: 1, suffix: true })}
    </span>
  );
}
