import type { SVGAttributes } from "react";

function MapIcon({ className, ...props }: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      className={className}
      {...props}>
      <path
        d="M35.9999 64.7999C35.9999 64.7999 58.5391 44.7652 58.5391 29.7391C58.5391 17.2911 48.448 7.19995 35.9999 7.19995C23.5519 7.19995 13.4608 17.2911 13.4608 29.7391C13.4608 44.7652 35.9999 64.7999 35.9999 64.7999Z"
        stroke="#05C0E6"
        strokeWidth="6"
      />
      <path
        d="M43.2009 28.8004C43.2009 32.7769 39.9773 36.0004 36.0009 36.0004C32.0244 36.0004 28.8009 32.7769 28.8009 28.8004C28.8009 24.824 32.0244 21.6004 36.0009 21.6004C39.9773 21.6004 43.2009 24.824 43.2009 28.8004Z"
        stroke="#05C0E6"
        strokeWidth="6"
      />
    </svg>
  );
}

export default MapIcon;
