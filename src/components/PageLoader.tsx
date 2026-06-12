export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0D2136] z-50">
      <div className="relative flex items-center justify-center">
        {/* Spinner outer border ring */}
        <div className="w-24 h-24 border-2 border-[#2E6B9E]/20 border-t-[#4AABB8] rounded-full animate-spin absolute" />
        {/* Pulsing logo in the center */}
        <img
          src="/assets/logo.png"
          alt="DHAYATRADERS Logo"
          className="w-16 h-16 rounded-full object-cover bg-white border border-[#2E6B9E]/30 animate-pulse relative z-10"
        />
      </div>
      <p className="text-[#E8EDF2] text-[10px] mt-6 font-sans tracking-widest uppercase font-bold animate-pulse">
        DHAYATRADERS
      </p>
    </div>
  );
}

