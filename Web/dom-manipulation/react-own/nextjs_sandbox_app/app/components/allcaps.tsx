"use client";
import { useState } from "react";

interface AllcapsProps {
  children: React.ReactNode;
}

export function AllCaps({ children }: AllcapsProps) {
  const [isAllCaps, setIsAllCaps] = useState<boolean>(false);
  console.log(children);
  return (
    <article>
      <label htmlFor="allCaps"> All Caps ? </label>
      <input
        type="checkbox"
        id="allCaps"
        checked={isAllCaps}
        onChange={(event) => setIsAllCaps(event.target.checked)}
      />
      <section className={isAllCaps ? "allcaps" : ""}>{children}</section>
    </article>
  );
}
