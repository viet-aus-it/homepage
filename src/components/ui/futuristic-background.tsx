function FuturisticBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#fffbea] via-white to-[#fef9ef]">
      {/* Subtle warm blobs */}
      <div className="absolute top-[-120px] left-[-100px] w-[320px] h-[320px] bg-[#ffe7d6] rounded-full opacity-30 blur-3xl animate-pulse" />
      <div className="absolute bottom-[-100px] right-[-80px] w-[280px] h-[280px] bg-[#ffeacc] rounded-full opacity-30 blur-3xl animate-pulse delay-1000" />

      {/* Optional soft noise/texture */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(to bottom,rgba(0,0,0,0.005)_0px,rgba(0,0,0,0.005)_1px,transparent_1px,transparent_4px)] pointer-events-none" />
    </div>
  );
}

export default FuturisticBackground;
