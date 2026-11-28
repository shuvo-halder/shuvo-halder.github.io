// Hero role typing effect — a direct port of initTypingEffect() from the
// static site's assets/js/main.js: types each role at 100ms/char, pauses
// 2200ms, deletes at 45ms/char, 350ms gap, 600ms initial delay.
// Reduced-motion users see the full first role immediately.
'use client';

import { useEffect, useState } from 'react';

export default function RoleTyper({ roles }: { roles: string[] }) {
  const [text, setText] = useState(roles[0] ?? '');

  useEffect(() => {
    if (!roles.length) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setText('System & Cloud Infrastructure Engineer');
      return;
    }
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    function typeStep() {
      if (cancelled) return;
      const current = roles[roleIndex];
      let speed: number;
      if (isDeleting) {
        charIndex -= 1;
        speed = 45;
      } else {
        charIndex += 1;
        speed = 100;
      }
      setText(current.substring(0, charIndex));
      if (!isDeleting && charIndex === current.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 350;
      }
      timer = setTimeout(typeStep, speed);
    }
    timer = setTimeout(typeStep, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [roles]);

  return (
    <>
      <span id="role-typed" className="hero-role-typed">
        {text}
      </span>
      <span className="cursor-blink" aria-hidden="true" />
    </>
  );
}
