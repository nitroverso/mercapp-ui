import Image from "next/image";

interface LogoProps {
  single?: boolean;
}

export default function Logo({ single }: LogoProps) {
  return single ? (
    <Image alt="Mercapp logo" height={200} src="/single-logo.png" width={200} />
  ) : (
    <Image alt="Mercapp logo" height={500} src="/logo.png" width={500} />
  );
}
