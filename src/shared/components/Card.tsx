import { cn } from "@/shared/utils/cn";
import type { UserRole } from "@/types/registration";

interface CardProps {
  title: string;
  description: string;
  roleId: UserRole;
  selected: boolean;
  onSelect: (roleId: UserRole) => void;
}

function Card({ title, description, roleId, selected, onSelect }: CardProps) {
  return (
    <div
      onClick={() => onSelect(roleId)}
      className={cn(
        "card-choose relative border border-gray-100 shadow-xs z-20",
        "p-4 rounded-lg flex flex-col gap-1.5 w-full cursor-pointer",
        selected
          ? "ring-1 ring-brand"
          : "ring-1 ring-transparent hover:ring-gray-200",
      )}>
      <div className="p-1.5 bg-brand/10 w-fit relative z-0 rounded-lg mb-2">
        <RoleIcon roleId={roleId} />
      </div>

      <div className="font-bold uppercase tracking-wider text-lg">{title}</div>

      <div className="tracking-wide text-gray-600 w-2/3">{description}</div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none -z-10">
        {roleId === "customer" ? <CustomerDecoration /> : <CarrierDecoration />}
      </div>
    </div>
  );
}

export default Card;

function RoleIcon({ roleId }: { roleId: UserRole }) {
  if (roleId === "customer") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        className="size-7 relative z-10">
        <path
          d="M11.6016 10.4945V7.36845C11.6016 6.50521 12.3326 5.80542 13.2344 5.80542H18.9492C19.851 5.80542 20.582 6.50521 20.582 7.36845V10.4945M6.70312 26.1249H26.2969C28.1004 26.1249 29.5625 24.7253 29.5625 22.9988V13.6206C29.5625 11.8941 28.1004 10.4945 26.2969 10.4945H6.70312C4.89957 10.4945 3.4375 11.8941 3.4375 13.6206V22.9988C3.4375 24.7253 4.89957 26.1249 6.70312 26.1249Z"
          stroke="#05C0E6"
          stroke-width="2.75"
          stroke-linecap="round"
        />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      className="size-7 relative z-10">
      <path
        d="M12.6595 22.625C12.6595 24.558 11.1311 26.125 9.24569 26.125C7.3603 26.125 5.8319 24.558 5.8319 22.625M12.6595 22.625C12.6595 20.692 11.1311 19.125 9.24569 19.125C7.3603 19.125 5.8319 20.692 5.8319 22.625M12.6595 22.625H20.3405M5.8319 22.625H4.125V8.25C4.125 7.49061 4.74061 6.875 5.5 6.875H20.3405V22.625M28.0216 22.625C28.0216 24.558 26.4931 26.125 24.6078 26.125C22.7224 26.125 21.194 24.558 21.194 22.625M28.0216 22.625C28.0216 20.692 26.4931 19.125 24.6078 19.125C22.7224 19.125 21.194 20.692 21.194 22.625M28.0216 22.625H28.875V15.625L24.6078 11.25H20.3405V22.625M21.194 22.625H20.3405"
        stroke="#05C0E6"
        stroke-width="2.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function CustomerDecoration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="112"
      height="141"
      viewBox="0 0 112 141"
      fill="none">
      <path
        d="M25.5 -18L59.3174 29.7627C66.7986 40.329 62.4219 55.1107 50.394 59.9006L42.4011 63.0836C29.976 68.0317 25.8145 83.5453 34.0952 94.0476L58.5 125"
        stroke="#05C0E6"
        stroke-width="8"
      />
      <rect x="40" y="3" width="36" height="36" rx="18" fill="#EDFBFD" />
      <path
        d="M55.9569 25.4545C55.9569 26.8604 54.8453 28 53.4741 28C52.1029 28 50.9914 26.8604 50.9914 25.4545M55.9569 25.4545C55.9569 24.0487 54.8453 22.9091 53.4741 22.9091C52.1029 22.9091 50.9914 24.0487 50.9914 25.4545M55.9569 25.4545H61.5431M50.9914 25.4545H49.75V23M67.1293 25.4545C67.1293 26.8604 66.0177 28 64.6466 28C63.2754 28 62.1638 26.8604 62.1638 25.4545M67.1293 25.4545C67.1293 24.0487 66.0177 22.9091 64.6466 22.9091C63.2754 22.9091 62.1638 24.0487 62.1638 25.4545M67.1293 25.4545H67.75V20.3636L64.6466 17.1818H61.5431V25.4545M62.1638 25.4545H61.5431M61.5431 25.4545V14H50.75C50.1977 14 49.75 14.4477 49.75 15M48.25 17H54.4741M49.25 20H52.75"
        stroke="#05C0E6"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect x="40" y="105" width="36" height="36" rx="18" fill="#EDFBFD" />
      <path
        d="M50 126.204L50 129.893C50 130.451 50.2107 130.987 50.5858 131.383C50.9609 131.778 51.4696 132 52 132H64C64.5304 132 65.0391 131.778 65.4142 131.383C65.7893 130.987 66 130.451 66 129.893V126.204M58.0011 114V125.942M53.4297 121.379L58.0011 125.942L62.5725 121.379"
        stroke="#05C0E6"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function CarrierDecoration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="112"
      height="139"
      viewBox="0 0 112 139"
      fill="none">
      <rect
        x="6.44643"
        y="22.7321"
        width="13.3929"
        height="13.3929"
        rx="6.69643"
        stroke="#05ACCD"
        stroke-width="0.892857"
      />
      <rect
        x="9.57129"
        y="25.8569"
        width="7.14286"
        height="7.14286"
        rx="3.57143"
        fill="#05ACCD"
      />
      <rect
        x="12.9195"
        y="36.7945"
        width="0.446429"
        height="19.1964"
        stroke="#05ACCD"
        stroke-width="0.446429"
      />
      <rect
        x="31"
        y="22.2856"
        width="50"
        height="8.03571"
        rx="4.01786"
        fill="#05C0E6"
      />
      <rect
        x="31"
        y="35.6785"
        width="75"
        height="8.03571"
        rx="4.01786"
        fill="#05C0E6"
      />
      <rect
        x="6.44643"
        y="60.2321"
        width="13.3929"
        height="13.3929"
        rx="6.69643"
        stroke="#05ACCD"
        stroke-width="0.892857"
      />
      <rect
        x="9.57129"
        y="63.3569"
        width="7.14286"
        height="7.14286"
        rx="3.57143"
        fill="#05ACCD"
      />
      <rect
        x="12.9195"
        y="74.2945"
        width="0.446429"
        height="19.1964"
        stroke="#05ACCD"
        stroke-width="0.446429"
      />
      <rect
        x="31"
        y="59.7856"
        width="50"
        height="8.03571"
        rx="4.01786"
        fill="#05C0E6"
      />
      <rect
        x="31"
        y="73.1785"
        width="75"
        height="8.03571"
        rx="4.01786"
        fill="#05C0E6"
      />
      <rect
        x="6.44643"
        y="97.7321"
        width="13.3929"
        height="13.3929"
        rx="6.69643"
        stroke="#EDFBFD"
        stroke-width="0.892857"
      />
      <rect
        x="9.57129"
        y="100.857"
        width="7.14286"
        height="7.14286"
        rx="3.57143"
        fill="#EDFBFD"
      />
      <rect
        x="31"
        y="97.2856"
        width="50"
        height="8.03571"
        rx="4.01786"
        fill="#EDFBFD"
      />
      <rect
        x="31"
        y="110.678"
        width="75"
        height="8.03571"
        rx="4.01786"
        fill="#EDFBFD"
      />
    </svg>
  );
}
