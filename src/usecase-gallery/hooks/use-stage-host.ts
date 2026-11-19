import { createContext, useContext } from 'react';

/** The preview stage element: a Dialog example portals into it so it renders open inside the card, not over the page. */
export const StageHostContext = createContext<HTMLElement | null>(null);

export const useStageHost = () => useContext(StageHostContext);
