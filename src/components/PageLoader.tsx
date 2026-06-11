export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0D2136] z-50">
      <div className="w-12 h-12 border-4 border-[#2E6B9E] border-t-[#4AABB8] rounded-full animate-spin" />
      <p className="text-[#E8EDF2] text-sm mt-4 font-sans tracking-widest uppercase">Loading...</p>
    </div>
  );
}
