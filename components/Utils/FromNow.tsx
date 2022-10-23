import fromnow from "fromnow";

interface FromNowProps {
  date: string;
}

export default function FromNow({ date }: FromNowProps) {
  return <span>{fromnow(parseInt(date), { max: 1, suffix: true })}</span>;
}
