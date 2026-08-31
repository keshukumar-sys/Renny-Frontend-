import RennyLogo from "../assets/RennyLogo.webp";

const PageSpinner = () => (
  <div className="fixed inset-0 z-[9999] flex min-h-screen w-screen flex-col items-center justify-center bg-white">
    <div className="relative flex items-center justify-center">
      <div className="h-20 w-20 animate-spin rounded-full border-4 border-[#05267e]/15 border-t-[#05267e] border-r-[#05267e]" />
      <div className="absolute flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-white shadow-[0_0_24px_rgba(5,38,126,0.16)]">
        <img
          src={RennyLogo}
          alt="Renny"
          width="293"
          height="236"
          className="h-10 w-auto object-contain opacity-95"
        />
      </div>
    </div>
    <p className="mt-5 text-sm font-semibold uppercase tracking-[0.35em] text-[#05267e]/70">
      Loading…
    </p>
  </div>
);

export default PageSpinner;
