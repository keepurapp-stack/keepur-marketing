"use client";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
      <div
        className="h-16 w-16 rounded-full border-4 border-slate-800 border-t-slate-200 animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
