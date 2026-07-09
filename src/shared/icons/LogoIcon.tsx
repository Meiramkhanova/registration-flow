import type { SVGAttributes } from "react";

function LogoIcon({ className, ...props }: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
      fill="transparent"
      {...props}>
      <path
        d="M20 18L4 18M14.5 12L4 12M20 6L4 6"
        stroke="#252526"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}

export default LogoIcon;
