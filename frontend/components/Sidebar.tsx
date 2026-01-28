"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ href, icon, label, isActive }: NavItemProps) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-4 py-3 mx-3 rounded-full transition-colors ${
      isActive
        ? "bg-purple-400 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    <span className="w-6 h-6 flex items-center justify-center">{icon}</span>
    <span className="font-medium text-base">{label}</span>
  </Link>
);

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Jobs",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="1.83334" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="1.83334" />
        </svg>
      ),
    },
    {
      href: "/avatar",
      label: "AI Mock Interview",
      icon: (
        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.58594 14.6665H3.66927C3.18304 14.6665 2.71673 14.4733 2.37291 14.1295C2.02909 13.7857 1.83594 13.3194 1.83594 12.8332V3.66649C1.83594 3.18026 2.02909 2.71395 2.37291 2.37013C2.71673 2.02631 3.18304 1.83316 3.66927 1.83316H18.3359C18.8222 1.83316 19.2885 2.02631 19.6323 2.37013C19.9761 2.71395 20.1693 3.18026 20.1693 3.66649V12.8332C20.1693 13.3194 19.9761 13.7857 19.6323 14.1295C19.2885 14.4733 18.8222 14.6665 18.3359 14.6665H17.4193" stroke="#1D2633" strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.0013 12.8332L15.5846 18.3332H6.41797L11.0013 12.8332Z" stroke="#1D2633" strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      ),
    },
    {
      href: "/resume",
      label: "Resume",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.83333" />
          <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.83333" />
          <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1.83333" />
          <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.83333" />
          <line x1="10" y1="9" x2="8" y2="9" stroke="currentColor" strokeWidth="1.83333" />
        </svg>
      ),
    },
  ];

  const settingsItems = [
    {
      href: "/profile",
      label: "Profile",
      icon: (
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_3666_691)">
<g clipPath="url(#clip1_3666_691)">
<g clipPath="url(#clip2_3666_691)">
<path d="M19.4354 9.2082L11.7771 16.8665C10.8389 17.8047 9.56642 18.3318 8.2396 18.3318C6.91278 18.3318 5.6403 17.8047 4.7021 16.8665C3.76389 15.9283 3.23682 14.6558 3.23682 13.329C3.23682 12.0022 3.76389 10.7297 4.7021 9.79153L12.3604 2.1332C12.9859 1.50773 13.8342 1.15634 14.7188 1.15634C15.6033 1.15634 16.4516 1.50773 17.0771 2.1332C17.7026 2.75866 18.054 3.60698 18.054 4.49153C18.054 5.37607 17.7026 6.22439 17.0771 6.84986L9.41043 14.5082C9.0977 14.8209 8.67354 14.9966 8.23126 14.9966C7.78899 14.9966 7.36483 14.8209 7.0521 14.5082C6.73936 14.1955 6.56367 13.7713 6.56367 13.329C6.56367 12.8868 6.73936 12.4626 7.0521 12.1499L14.1271 5.0832" stroke="#1D2633" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
</g>
</g>
</g>
<defs>
<clipPath id="clip0_3666_691">
<rect width="23.1429" height="20" fill="white"/>
</clipPath>
<clipPath id="clip1_3666_691">
<rect width="21.5714" height="20" fill="white" transform="translate(0.785645)"/>
</clipPath>
<clipPath id="clip2_3666_691">
<rect width="20" height="20" fill="white" transform="translate(1.57129)"/>
</clipPath>
</defs>
</svg>

      ),
    },
    {
      href: "/settings",
      label: "Setting",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.83333" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="1.83333" />
        </svg>
      ),
    },
  ];

  const subscriptionItems = [
    {
      href: "/subscription",
      label: "Subscription",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 1.5C4.30109 1.5 4.11032 1.57902 3.96967 1.71967C3.82902 1.86032 3.75 2.05109 3.75 2.25V21.75C3.74994 21.8752 3.78122 21.9984 3.84098 22.1084C3.90075 22.2184 3.98709 22.3117 4.09215 22.3798C4.19721 22.4478 4.31764 22.4885 4.44246 22.4981C4.56728 22.5077 4.69251 22.486 4.80675 22.4347L11.8125 19.2975L18.8183 22.4347C18.9282 22.484 19.0484 22.506 19.1686 22.499C19.2889 22.4919 19.4057 22.456 19.5091 22.3943C19.6126 22.3326 19.6996 22.2468 19.7629 22.1444C19.8262 22.0419 19.8639 21.9256 19.8728 21.8055L19.875 21.75V2.25C19.875 2.05109 19.796 1.86032 19.6553 1.71967C19.5147 1.57902 19.3239 1.5 19.125 1.5H4.5ZM5.25 3H18.375V20.592L12.1193 17.7915C11.9465 17.7142 11.7509 17.7051 11.5718 17.766L11.5057 17.7915L5.25 20.592V3ZM12.477 7.15275C12.4135 7.03143 12.318 6.92981 12.2009 6.85891C12.0837 6.788 11.9494 6.75051 11.8125 6.75051C11.6756 6.75051 11.5413 6.788 11.4241 6.85891C11.307 6.92981 11.2115 7.03143 11.148 7.15275L10.2375 8.895L8.2995 9.222C8.16904 9.24386 8.04669 9.29983 7.94485 9.38423C7.843 9.46864 7.76529 9.57848 7.7196 9.70261C7.67391 9.82674 7.66186 9.96075 7.68467 10.091C7.70748 10.2213 7.76435 10.3433 7.8495 10.4445L7.8885 10.4865L9.26475 11.8905L8.97675 13.8345C8.95734 13.9654 8.97289 14.099 9.02182 14.2219C9.07075 14.3448 9.15131 14.4526 9.25534 14.5343C9.35938 14.6161 9.48317 14.6688 9.61417 14.6872C9.74517 14.7057 9.87871 14.6891 10.0012 14.6392L10.0522 14.6168L11.8125 13.7415L13.5728 14.616C13.6912 14.6749 13.8231 14.7015 13.9551 14.693C14.0871 14.6845 14.2146 14.6413 14.3245 14.5676C14.4343 14.494 14.5228 14.3926 14.5809 14.2737C14.6389 14.1548 14.6645 14.0227 14.655 13.8907L14.6483 13.8345L14.3603 11.8897L15.7365 10.4872C15.8291 10.3929 15.8951 10.2757 15.9279 10.1475C15.9606 10.0194 15.9589 9.88491 15.9228 9.75767C15.8868 9.63043 15.8178 9.51497 15.7228 9.42301C15.6278 9.33104 15.5101 9.26584 15.3818 9.234L15.3255 9.222L13.3875 8.895L12.477 7.15275ZM11.8125 9.12L12.2303 9.92025C12.2839 10.0229 12.3605 10.1117 12.4542 10.1798C12.5479 10.2478 12.6561 10.2932 12.7703 10.3125L13.6597 10.4625L13.0283 11.1068C12.9547 11.1818 12.8977 11.2714 12.861 11.3699C12.8243 11.4683 12.8087 11.5734 12.8152 11.6783L12.822 11.7413L12.9548 12.6337L12.1462 12.2325C12.0531 12.1861 11.9513 12.1596 11.8474 12.1547C11.7434 12.1498 11.6396 12.1666 11.5425 12.204L11.4788 12.2325L10.671 12.6337L10.803 11.7413C10.8184 11.6374 10.8118 11.5314 10.7836 11.4303C10.7554 11.3291 10.7063 11.235 10.6395 11.154L10.5968 11.1068L9.96525 10.4618L10.8547 10.3117C10.9584 10.2944 11.0572 10.2554 11.1448 10.1974C11.2324 10.1394 11.3068 10.0636 11.3632 9.975L11.3948 9.92025L11.8125 9.12Z" fill="black"/>
        </svg>
        
      ),
    },
    {
      href: "/credits",
      label: "Extra Credits",
      icon: (
        <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_604_2129)">
<g clipPath="url(#clip1_604_2129)">
<path d="M11.3297 18.1124C11.9929 18.1124 12.5355 17.5749 12.5355 16.918V12.7378H16.7555C17.4187 12.7378 17.9612 12.2003 17.9612 11.5434C17.9612 10.8865 17.4187 10.3491 16.7555 10.3491H12.5355V6.16884C12.5355 5.51194 11.9929 4.97448 11.3297 4.97448C10.6666 4.97448 10.124 5.51194 10.124 6.16884V10.3491H5.90396C5.24081 10.3491 4.69823 10.8865 4.69823 11.5434C4.69823 12.2003 5.24081 12.7378 5.90396 12.7378H10.124V16.918C10.124 17.5749 10.6666 18.1124 11.3297 18.1124Z" fill="black"/>
<path d="M22.5008 8.68892L22.4043 8.64115C22.0125 8.44408 21.699 8.12758 21.494 7.73941L21.4458 7.64386C21.2529 7.26764 20.7043 7.26764 20.5113 7.64386L20.4631 7.73941C20.2642 8.12758 19.9446 8.43811 19.5528 8.64115L19.4563 8.68892C19.0765 8.88002 19.0765 9.42345 19.4563 9.61455L19.5528 9.66232C19.9446 9.85939 20.2581 10.1759 20.4631 10.5641L20.5113 10.6596C20.7043 11.0358 21.2529 11.0358 21.4458 10.6596L21.494 10.5641C21.693 10.1759 22.0125 9.86536 22.4043 9.66232L22.5008 9.61455C22.8806 9.42345 22.8806 8.88002 22.5008 8.68892Z" fill="black"/>
<path d="M13.8919 6.13898L14.0848 6.23453C14.6877 6.53909 15.17 7.01683 15.4774 7.61401L15.5739 7.8051C15.9055 8.45005 16.5686 8.85016 17.3041 8.85016C18.0396 8.85016 18.6967 8.45005 19.0343 7.8051L19.1308 7.61401C19.4382 7.01683 19.9205 6.53909 20.5234 6.23453L20.7163 6.13898C21.3674 5.81053 21.7713 5.15364 21.7713 4.42508C21.7713 3.69653 21.3674 3.0456 20.7163 2.71118L20.5234 2.61564C19.9205 2.31107 19.4382 1.83333 19.1308 1.23616L19.0343 1.04506C18.7027 0.400109 18.0396 0 17.3101 0C16.5807 0 15.9175 0.400109 15.5799 1.04506L15.4835 1.23616C15.176 1.83333 14.6937 2.31107 14.0908 2.61564L13.8979 2.71118C13.2468 3.03963 12.8429 3.69653 12.8429 4.41911C12.8429 5.14169 13.2468 5.79859 13.8979 6.13301L13.8919 6.13898ZM14.7118 4.31162L14.9047 4.21607C15.8512 3.73833 16.6048 2.99186 17.0871 2.05429L17.1835 1.86319C17.1835 1.86319 17.2197 1.79153 17.2981 1.79153C17.3765 1.79153 17.4066 1.83931 17.4126 1.86319L17.5091 2.05429C17.9914 2.99186 18.745 3.73833 19.6914 4.21607L19.8844 4.31162C19.8844 4.31162 19.9567 4.34745 19.9567 4.42508C19.9567 4.50271 19.9024 4.53257 19.8844 4.53855L19.6914 4.63409C18.745 5.11184 17.9914 5.85831 17.5091 6.79587L17.4126 6.98697C17.4126 6.98697 17.3765 7.05863 17.2981 7.05863C17.2197 7.05863 17.1896 7.00489 17.1835 6.98697L17.0871 6.79587C16.6048 5.85831 15.8512 5.11184 14.9047 4.63409L14.7118 4.53855C14.7118 4.53855 14.6395 4.50271 14.6395 4.42508C14.6395 4.34745 14.6937 4.31759 14.7118 4.31162Z" fill="black"/>
<path d="M21.0117 11.848C20.5174 11.7883 20.0652 12.1346 20.0049 12.6243C19.4624 16.9419 15.7306 20.2025 11.3297 20.2025C6.50682 20.2025 2.58821 16.3208 2.58821 11.5434C2.58821 6.76602 6.50682 2.88436 11.3297 2.88436C11.5106 2.88436 11.6975 2.88436 11.8783 2.90228C12.3847 2.93214 12.8067 2.55592 12.8369 2.06623C12.867 1.57058 12.4872 1.14658 11.9929 1.11672C11.7758 1.10478 11.5528 1.09881 11.3358 1.09881C5.51812 1.09881 0.785645 5.78664 0.785645 11.5494C0.785645 17.3122 5.51812 22 11.3358 22C16.647 22 21.1504 18.0706 21.8015 12.8572C21.8618 12.3675 21.5121 11.9197 21.0177 11.8599L21.0117 11.848Z" fill="black"/>
</g>
</g>
<defs>
<clipPath id="clip0_604_2129">
<rect width="23.5714" height="22" fill="white"/>
</clipPath>
<clipPath id="clip1_604_2129">
<rect width="22" height="22" fill="white" transform="translate(0.785645)"/>
</clipPath>
</defs>
</svg>

      ),
    },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-56 bg-white flex-col flex-shrink-0 border-r border-gray-100 z-10">
      {/* Logo */}
      <div style={{ padding: '10px 12px' }}>
        <Link href="/" className="flex items-center justify-center" style={{ gap: '10px', position: 'relative', top: '9px' }}>
          <Image
            src="/Frame_2087327261.png"
            alt="JobNova Logo"
            width={219}
            height={61.150634765625}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.href}
            />
          ))}
        </div>

        {/* Separator */}
        <div className="mx-4 my-4 border-t border-gray-200" />

        {/* Settings */}
        <div className="space-y-1">
          {settingsItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.href}
            />
          ))}
        </div>

        {/* Separator */}
        <div className="mx-4 my-4 border-t border-gray-200" />

        {/* Subscription */}
        <div className="space-y-1">
          {subscriptionItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.href}
            />
          ))}
        </div>
      </nav>

      {/* Upgrade Card */}
      <div className="p-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-300 via-purple-400 to-purple-600 p-5">
          {/* Texture overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative">
            <h3 className="text-white font-semibold text-lg mb-2">
              Upgrade Your Plan
            </h3>
            <p className="text-white/80 text-sm mb-4">
              Boost your success rate now!
            </p>
            <Link
              href="/subscription"
              className="inline-block bg-white text-gray-800 font-medium text-sm px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              Subscription
            </Link>
          </div>
        </div>
      </div>

      {/* User Avatar */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-semibold">
            N
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">User</p>
            <p className="text-xs text-gray-500 truncate">Free Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
