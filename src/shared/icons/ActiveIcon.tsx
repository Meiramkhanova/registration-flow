import type { SVGAttributes } from "react";

function ActiveIcon({ className, ...props }: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className={className}
      {...props}
      fill="transparent">
      <path
        d="M7.42441 16.1998H3.82441C2.83029 16.1998 2.02441 15.3939 2.02441 14.3998L2.02448 3.59979C2.02449 2.60569 2.83038 1.7998 3.82448 1.7998H11.9247C12.9188 1.7998 13.7247 2.60569 13.7247 3.5998V8.5498M10.1247 13.6498L11.7747 15.2998L15.9747 10.7998"
        stroke="#252526"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default ActiveIcon;
