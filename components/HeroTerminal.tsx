// Hero terminal — a direct port of initHeroTerminal(), detectClientEnvironment()
// and fetchClientNetworkInfo() from the static site's assets/js/main.js.
// Shows the visitor's IP, location, ISP, OS and browser, streamed line by
// line (65ms apart). IP/location/ISP come from ipwho.is (fallback ipinfo.io),
// cached in sessionStorage for 15 minutes. Reduced-motion users get the full
// output immediately. Terminal size stays fixed to avoid layout shifts.
'use client';

import { useEffect, useRef, useState } from 'react';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function detectClientEnvironment(): { os: string; browser: string } {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  let os = 'Unknown OS';
  let browser = 'Unknown Browser';

  if (/Windows NT 10.0/i.test(ua)) os = 'Windows 10/11';
  else if (/Windows NT 6.3/i.test(ua)) os = 'Windows 8.1';
  else if (/Windows NT 6.2/i.test(ua)) os = 'Windows 8';
  else if (/Windows NT 6.1/i.test(ua)) os = 'Windows 7';
  else if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Android/i.test(ua)) {
    const m = ua.match(/Android\s+([\d.]+)/i);
    os = m ? `Android ${m[1]}` : 'Android';
  } else if (/iPad/i.test(ua)) {
    const m = ua.match(/OS\s+([\d_]+)/i);
    os = m ? `iPadOS ${m[1].replace(/_/g, '.')}` : 'iPadOS';
  } else if (/iPhone|iPod/i.test(ua)) {
    const m = ua.match(/OS\s+([\d_]+)/i);
    os = m ? `iOS ${m[1].replace(/_/g, '.')}` : 'iOS';
  } else if (/Macintosh|Mac OS X/i.test(ua)) {
    const m = ua.match(/Mac OS X\s+([\d_]+)/i);
    os = m ? `macOS ${m[1].replace(/_/g, '.')}` : 'macOS';
  } else if (/CrOS/i.test(ua)) os = 'ChromeOS';
  else if (/Ubuntu/i.test(ua)) os = 'Ubuntu Linux';
  else if (/Linux/i.test(ua)) os = 'Linux';

  if (/SamsungBrowser\/([\d.]+)/i.test(ua)) {
    const m = ua.match(/SamsungBrowser\/([\d.]+)/i);
    browser = `Samsung Internet ${m ? m[1].split('.')[0] : ''}`.trim();
  } else if (/Edg\/([\d.]+)/i.test(ua)) {
    const m = ua.match(/Edg\/([\d.]+)/i);
    browser = `Edge ${m ? m[1].split('.')[0] : ''}`.trim();
  } else if (/OPR\/([\d.]+)/i.test(ua) || /Opera\/([\d.]+)/i.test(ua)) {
    const m = ua.match(/(?:OPR|Opera)\/([\d.]+)/i);
    browser = `Opera ${m ? m[1].split('.')[0] : ''}`.trim();
  } else if (/Chrome\/([\d.]+)/i.test(ua)) {
    const m = ua.match(/Chrome\/([\d.]+)/i);
    browser = `Chrome ${m ? m[1].split('.')[0] : ''}`.trim();
  } else if (/Firefox\/([\d.]+)/i.test(ua)) {
    const m = ua.match(/Firefox\/([\d.]+)/i);
    browser = `Firefox ${m ? m[1].split('.')[0] : ''}`.trim();
  } else if (/Version\/([\d.]+).*Safari/i.test(ua)) {
    const m = ua.match(/Version\/([\d.]+)/i);
    browser = `Safari ${m ? m[1].split('.')[0] : ''}`.trim();
  }

  return { os, browser };
}

interface NetInfo {
  ip: string;
  location: string;
  isp: string;
}

async function fetchClientNetworkInfo(): Promise<NetInfo> {
  const CACHE_KEY = 'sh_visitor_net_v1';
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as { data?: NetInfo; ts?: number };
      if (parsed && parsed.data && Date.now() - (parsed.ts || 0) < 15 * 60 * 1000) {
        return parsed.data;
      }
    }
  } catch {
    /* ignore sessionStorage errors */
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch('https://ipwho.is/', { signal: controller.signal, cache: 'no-cache' });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = (await res.json()) as Record<string, unknown>;
      if (data && data.success !== false) {
        const conn = (data.connection || {}) as Record<string, unknown>;
        const locationParts = [data.city, data.country].filter(Boolean);
        const result: NetInfo = {
          ip: String(data.ip || 'Unavailable'),
          location: locationParts.length ? (locationParts as string[]).join(', ') : 'Unavailable',
          isp: String(conn.isp || conn.org || 'Unavailable'),
        };
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: result, ts: Date.now() }));
        } catch {
          /* ignore */
        }
        return result;
      }
    }
  } catch {
    /* primary failed; try fallback */
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const res = await fetch('https://ipinfo.io/json', { signal: controller.signal, cache: 'no-cache' });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = (await res.json()) as Record<string, unknown>;
      const locationParts = [data.city, data.country].filter(Boolean);
      const cleanIsp = String(data.org || '').replace(/^AS\d+\s*/i, '').trim();
      const result: NetInfo = {
        ip: String(data.ip || 'Unavailable'),
        location: locationParts.length ? (locationParts as string[]).join(', ') : 'Unavailable',
        isp: cleanIsp || String(data.org || 'Unavailable'),
      };
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: result, ts: Date.now() }));
      } catch {
        /* ignore */
      }
      return result;
    }
  } catch {
    /* fallback failed */
  }

  return { ip: 'Unavailable', location: 'Unavailable', isp: 'Unavailable' };
}

export default function HeroTerminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const srRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // Narrowed once so closures keep the non-null type.
    const el: HTMLDivElement = container;
    let cancelled = false;
    const env = detectClientEnvironment();
    const netPromise = fetchClientNetworkInfo();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function linesHtml(net: NetInfo): string {
      const lines = [
        { key: 'IP', val: net.ip, accent: true },
        { key: 'Location', val: net.location, accent: false },
        { key: 'ISP', val: net.isp, accent: false },
        { key: 'OS', val: env.os, accent: false },
        { key: 'Browser', val: env.browser, accent: false },
      ];
      return lines
        .map(
          (item) =>
            `<div class="client-info-line"><span class="term-key">${escapeHtml(item.key)}</span><span class="term-sep">:</span><span class="term-val${item.accent ? ' term-val-accent' : ''}">${escapeHtml(item.val)}</span></div>`,
        )
        .join('');
    }

    function updateSr(net: NetInfo) {
      if (srRef.current) {
        srRef.current.textContent = `Visitor client details: IP ${net.ip}, location ${net.location}, ISP ${net.isp}, OS ${env.os}, browser ${env.browser}.`;
      }
    }

    if (reduced) {
      netPromise.then((net) => {
        if (cancelled) return;
        el.innerHTML =
          linesHtml(net) +
          `<div class="term-line"><span class="term-prompt">$</span> <span class="terminal-cursor-block"></span></div>`;
        updateSr(net);
        setReady(true);
      });
      return () => {
        cancelled = true;
      };
    }

    el.innerHTML = `<div class="term-line"><span class="term-prompt">$</span> <span class="terminal-cursor-block"></span></div>`;
    netPromise.then((net) => {
      if (cancelled) return;
      updateSr(net);
      const lines = [
        { key: 'IP', val: net.ip, accent: true },
        { key: 'Location', val: net.location, accent: false },
        { key: 'ISP', val: net.isp, accent: false },
        { key: 'OS', val: env.os, accent: false },
        { key: 'Browser', val: env.browser, accent: false },
      ];
      el.innerHTML = '';
      let lineIdx = 0;
      let timer: ReturnType<typeof setTimeout>;
      function streamNextLine() {
        if (cancelled) return;
        if (lineIdx < lines.length) {
          const item = lines[lineIdx];
          const infoLine = document.createElement('div');
          infoLine.className = 'client-info-line';
          infoLine.innerHTML =
            `<span class="term-key">${escapeHtml(item.key)}</span>` +
            `<span class="term-sep">:</span>` +
            `<span class="term-val${item.accent ? ' term-val-accent' : ''}">${escapeHtml(item.val)}</span>`;
          el.appendChild(infoLine);
          lineIdx += 1;
          timer = setTimeout(streamNextLine, 65);
        } else {
          const finalPrompt = document.createElement('div');
          finalPrompt.className = 'term-line';
          finalPrompt.innerHTML = `<span class="term-prompt">$</span> <span class="terminal-cursor-block"></span>`;
          el.appendChild(finalPrompt);
          setReady(true);
        }
      }
      timer = setTimeout(streamNextLine, 100);
      return () => clearTimeout(timer);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="hero-terminal-window" aria-label="Terminal Introduction">
      <div className="terminal-titlebar">
        <div className="terminal-dots" aria-hidden="true">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="terminal-title">shuvo@infra: ~</div>
        <div className="terminal-badge" aria-hidden="true">
          bash
        </div>
      </div>
      <div className="terminal-body" id="hero-terminal-body" role="region" aria-live="polite">
        <div className="sr-only" id="terminal-sr-text" ref={srRef}>
          Terminal session inspecting visitor client details: IP address, location, ISP, operating
          system, and web browser.
        </div>
        <div
          className="terminal-content"
          id="terminal-content"
          aria-hidden="true"
          ref={containerRef}
          data-ready={ready}
        />
      </div>
    </div>
  );
}
