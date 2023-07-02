export default function LoadingBar({ loading }) {
  return (
    loading && (
      <div className="relative w-full h-1 bg-teal-400 loader-rounding bg-opacity-30 overflow-hidden">
        <div className="absolute h-full bg-teal-400 loader-rounding animate-moving-block w-full"></div>
      </div>
    )
  );
}
