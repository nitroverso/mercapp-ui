import Image from "next/image";

interface LogoProps {
  height?: number;
  single?: boolean;
  width?: number;
}

export default function Logo({ height = 500, single, width = 500 }: LogoProps) {
  return single ? (
    <Image
      alt="Mercapp logo"
      height={height}
      src="/single-logo.png"
      width={width}
    />
  ) : (
    <Image alt="Mercapp logo" height={height} src="/logo.png" width={width} />
  );
}
