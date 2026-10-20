import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-wrap flex flex-1 flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-medium tracking-[0.14em] text-[#9db4ff] uppercase">404</p>
      <h1 className="mt-4 text-[clamp(2.5rem,8vw,4.5rem)] leading-[1] font-medium tracking-[-0.05em]">
        That page is <span className="accent-serif">not here.</span>
      </h1>
      <p className="mt-4 text-lg text-white/60">The download is on the home page.</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="inline-flex h-12 items-center rounded-full bg-white px-6 font-semibold text-black">
          Back to Relay
        </Link>
        <Link
          href="/?download=1"
          className="inline-flex h-12 items-center rounded-full border border-white/15 bg-white/10 px-6 font-semibold text-white"
        >
          Download
        </Link>
      </div>
    </div>
  );
}
