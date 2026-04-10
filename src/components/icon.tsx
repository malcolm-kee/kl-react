import cx from "classnames";
import Image from "next/image";

interface IconProps {
  className?: string;
}

export function Icon({ className }: IconProps) {
  return (
    <div className={cx("w-12 h-12 sm:w-14 sm:h-14 relative", className)}>
      <Image
        src="/durian-react-140.png"
        alt="React KL Icon"
        width={56}
        height={56}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
