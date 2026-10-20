import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-wrap flex flex-1 flex-col justify-center py-16">
      <p className="text-sm font-medium text-white/45">404</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em] text-white">
        That page is not here.
      </h1>
      <p className="mt-3 text-white/60">The download is on the home page.</p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link href="/" className="text-[#c4b6ff]">
          Back to Relay
        </Link>
        <Link href="/?download=1" className="text-white/70 hover:text-white">
          Download
        </Link>
      </div>
    </div>
  );
}
