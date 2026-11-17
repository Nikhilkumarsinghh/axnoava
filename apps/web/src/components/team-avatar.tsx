export function Avatar({ name, photo }: { name: string; photo?: string }) {
  const ini = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return photo ? <img className="m-avatar" src={photo} alt={name} loading="lazy" /> : <div className="m-avatar" aria-label={name}>{ini}</div>;
}
