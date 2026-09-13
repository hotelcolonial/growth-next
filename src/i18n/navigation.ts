import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

// Wrappers de navegación con reconocimiento de locale
// (Link, redirect, usePathname, useRouter, getPathname)
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
