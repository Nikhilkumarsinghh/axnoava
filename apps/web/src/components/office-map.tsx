import { office } from "@/data/site-config";
export function OfficeMap() {
  if (!office.mapQuery) return null;
  return <iframe className="m-map" title={`Map of ${office.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&output=embed`} />;
}
