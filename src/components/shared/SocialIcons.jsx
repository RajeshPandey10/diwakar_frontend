"use client";

import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { SOCIAL_LINKS } from "@/lib/constants";

const socials = [
  { href: SOCIAL_LINKS.linkedin, Icon: FaLinkedin, label: "LinkedIn" },
  { href: SOCIAL_LINKS.facebook, Icon: FaFacebook, label: "Facebook" },
  { href: SOCIAL_LINKS.twitter, Icon: RiTwitterXFill, label: "Twitter" },
  { href: SOCIAL_LINKS.instagram, Icon: FaInstagram, label: "Instagram" },
];

const SocialIcons = ({ size = 20, light = false }) => {
  const iconColor = light ? "text-white/70 hover:text-white" : "text-gray-400 hover:text-[#c9a84c]";
  const bgColor = light ? "bg-white/10 hover:bg-white/15" : "bg-gray-100 hover:bg-[#c9a84c]/10";

  return (
    <div className="flex items-center gap-3">
      {socials.map(({ href, Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 rounded-lg ${bgColor} ${iconColor} flex items-center justify-center transition-all`}
          aria-label={label}
        >
          <Icon size={size * 0.55} />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
