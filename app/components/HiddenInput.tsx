// app/components/HiddenInput.tsx
'use client';

import { forwardRef } from 'react';

export const HiddenInput = forwardRef<HTMLInputElement>((props, ref) => (
  <input
    ref={ref}
    type="text"
    autoFocus
    aria-hidden="true"
    className="fixed left-[-999999px] top-[-999999px] w-0 h-0 opacity-0 outline-none border-none -z-50"
    style={{
      caretColor: 'transparent',
      pointerEvents: 'none',
      transform: 'translateX(-999999px) translateY(-999999px)',
    }}
    {...props}
  />
));

HiddenInput.displayName = 'HiddenInput';
