import { Footer as FooterBg } from "../../images/bg-img";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGooglePlusG,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bg-cover bg-center bg-fixed py-20"
      style={{ backgroundImage: `url(${FooterBg.src})` }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center space-y-10">
        <h2 className="brand-fall text-[#5b32b4] text-4xl md:text-6xl font-bold tracking-tight">
          Snappy-fix Tech
        </h2>

        <div className="flex gap-4">
          <SocialButton icon={<FaFacebookF />} />
          <SocialButton icon={<FaTwitter />} />
          <SocialButton icon={<FaInstagram />} />
          <SocialButton icon={<FaGooglePlusG />} />
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-[#726a84] text-sm">
          <FooterLink label="About" />
          <FooterLink label="Terms & Conditions" />
          <FooterLink label="Privacy Policy" />
          <FooterLink label="Contact" />
        </nav>

        <p className="text-xs text-[#b5aec4]">
          © {new Date().getFullYear()} Snappy-fix Technologies. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

const SocialButton = ({ icon }: { icon: React.ReactNode }) => (
  <button
    className="w-10 h-10 flex items-center justify-center rounded-full
               bg-[#9b69e4] text-white
               transition-all duration-300
               hover:bg-[#fb397d] hover:scale-110 hover:shadow-lg"
  >
    {icon}
  </button>
);

const FooterLink = ({ label }: { label: string }) => (
  <button
    className="relative text-[#726a84] transition hover:text-[#5b32b4]
               after:absolute after:left-0 after:-bottom-1
               after:h-[2px] after:w-0 after:bg-[#fb397d]
               after:transition-all after:duration-300
               hover:after:w-full"
  >
    {label}
  </button>
);

export default Footer;
