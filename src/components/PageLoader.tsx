import logo from '../assets/Logo.png';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0D2136] z-50">
      <div className="relative flex items-center justify-center">
        {/* Spinner outer border ring */}
        <div className="w-24 h-24 border-2 border-[#2E6B9E]/20 border-t-[#4AABB8] rounded-full animate-spin absolute" />
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white border border-[#2E6B9E]/30 animate-pulse relative z-10 overflow-hidden">
          <img
            src={logo}
            alt="DHAYATRADERS Logo"
            draggable={false}
            className="w-full h-full object-contain select-none"
          />
        </div>
      </div>
      <p className="text-[#E8EDF2] text-[10px] mt-6 font-sans tracking-widest uppercase font-bold animate-pulse">
        DHAYATRADERS
      </p>
    </div>
  );
}

