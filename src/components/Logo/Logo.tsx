import { Link } from 'react-router-dom';
import logoSrc from '../../assets/logo.png';

type LogoProps = {
  className?: string;
  to?: string;
};

export function Logo({
  className = 'h-14 w-auto shrink-0 object-contain sm:h-20',
  to = '/',
}: LogoProps) {
  const image = (
    <img
      src={logoSrc.src}
      alt="New Wave"
      className={className}
      decoding="async"
      loading="eager"
    />
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex shrink-0 items-center">
        {image}
      </Link>
    );
  }

  return image;
}
