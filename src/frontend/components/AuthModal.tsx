import React from "react";

export default function AuthModal({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
      <div className="bg-white p-lg rounded-lg w-108 h-fit text-black pb-2xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">{title}</h2>
        <div className="flex flex-col gap-sm">{children}</div>
      </div>
    </div>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-xs">
      <label className="text-md text-gray-700">{title}</label>
      {children}
    </div>
  );
}
