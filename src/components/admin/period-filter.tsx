import Link from "next/link";
export function PeriodFilter({ current }: { current: number }) { return <div className="mb-5 flex gap-2">{[7,30,90].map(days => <Link key={days} href={`?days=${days}`} className={`rounded-lg px-3 py-2 text-sm font-bold ${current === days ? "bg-[#0B2D6B] text-white" : "border border-slate-200 bg-white"}`}>{days} dias</Link>)}</div>; }
