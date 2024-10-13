import Image from "next/image";
import logo from "../../app/logo.png";

interface LogoProps {
    width?: number;
    height?: number;
}

export default function Logo({ width = 100, height = 100 }: LogoProps) {
    return (
        <Image src={logo} width={width} height={height} alt="logo" />
    );
}