import { createContext } from 'react';
import type { AvatarScale } from './use-recipe';

export const AvatarGroupScaleContext = createContext<AvatarScale | undefined>(undefined);
