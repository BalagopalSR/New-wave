'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from 'react';
import NextLink from 'next/link';
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
} from 'next/navigation';

type NavigateOptions = {
  replace?: boolean;
};

type SetSearchParamsOptions = {
  replace?: boolean;
};

type NavState = {
  isActive: boolean;
};

type NavClassName = string | ((state: NavState) => string);

export function BrowserRouter({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function Routes({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function Route({
  element,
  children,
}: {
  element?: ReactElement;
  children?: ReactNode;
  path?: string;
  index?: boolean;
}) {
  return element ?? <>{children}</>;
}

export function Outlet() {
  return null;
}

export function Navigate({
  to,
  replace,
}: {
  to: string;
  replace?: boolean;
  state?: unknown;
}) {
  const router = useRouter();
  useEffect(() => {
    if (replace) {
      router.replace(to);
      return;
    }
    router.push(to);
  }, [replace, router, to]);
  return null;
}

export function Link({
  to,
  children,
  className,
  ...rest
}: {
  to: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof NextLink>, 'href' | 'className' | 'children'>) {
  return (
    <NextLink href={to} className={className} {...rest}>
      {children}
    </NextLink>
  );
}

export function NavLink({
  to,
  end,
  className,
  children,
  ...rest
}: {
  to: string;
  end?: boolean;
  className?: NavClassName;
  children: ReactNode;
} & Omit<ComponentProps<typeof NextLink>, 'href' | 'className' | 'children'>) {
  const pathname = usePathname();
  const isActive = end ? pathname === to : pathname === to || (to !== '/' && pathname.startsWith(`${to}/`));
  const resolvedClass = typeof className === 'function' ? className({ isActive }) : className;

  return (
    <NextLink href={to} className={resolvedClass} {...rest}>
      {children}
    </NextLink>
  );
}

export function useLocation() {
  const pathname = usePathname();
  const searchParams = useNextSearchParams();
  const search = searchParams.toString();

  return useMemo(
    () => ({
      pathname,
      search: search ? `?${search}` : '',
      hash: '',
      state: null as unknown,
    }),
    [pathname, search],
  );
}

export function useNavigate() {
  const router = useRouter();
  return useCallback(
    (to: string, options?: NavigateOptions) => {
      if (options?.replace) {
        router.replace(to);
        return;
      }
      router.push(to);
    },
    [router],
  );
}

export function useParams<T extends Record<string, string>>() {
  return useNextParams() as T;
}

export function useSearchParams() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useNextSearchParams();

  const setSearchParams = useCallback(
    (next: URLSearchParams, options?: SetSearchParamsOptions) => {
      const query = next.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      if (options?.replace) {
        router.replace(url);
        return;
      }
      router.push(url);
    },
    [pathname, router],
  );

  return [params, setSearchParams] as const;
}
