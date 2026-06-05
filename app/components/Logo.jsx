import React from "react";

/**
 * Hayzee Computer Resources logo — the original brand artwork (public/logo5.png:
 * the serif intertwined "HR" monogram + HAYZEE / COMPUTER RESOURCES wordmark),
 * recolored white so it reads on the navy navbar / footer.
 *
 *   <Logo className="h-10 w-auto" />           → monogram mark only
 *   <Logo className="h-12 w-auto" wordmark /> → full stacked lockup
 */
const Logo = ({ className = "h-10 w-auto", wordmark = false }) => (
  <img
    src={wordmark ? "/logo-white.png" : "/logo-mark-white.png"}
    alt="Hayzee Computer Resources"
    className={`${className} select-none object-contain`}
    draggable={false}
  />
);

export default Logo;
