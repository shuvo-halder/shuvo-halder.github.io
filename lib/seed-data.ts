// Seed data — the real content of shuvo-halder.github.io, copied from the
// live static site (index.html / services.html, November 2026).
// Used in three places:
//   1. scripts/seed.mjs writes it into MongoDB,
//   2. lib/content.ts returns it as a fallback when the DB is empty or
//      unreachable, so the public site always renders,
//   3. the admin panel starts from it after the first seed.
import type { SiteContent } from './types';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://shuvo-halder.github.io';

export const seedContent: SiteContent = {
  profile: {
    name: 'Shuvo Halder',
    role: 'System & Cloud Infrastructure Engineer',
    tagline:
      'I design, deploy, and operate private and public cloud infrastructure, from OpenStack and Proxmox to Ceph and Kubernetes.',
    bio: 'Result-driven System and Cloud Infrastructure Engineer with hands-on expertise in designing, deploying, and managing scalable private and public cloud environments. Experienced in Linux and Windows server administration, virtualization (OpenStack, Proxmox, VMware ESXi), distributed storage (Ceph), and container orchestration (Docker, Kubernetes, k3s).',
    bio2: 'I implement automated CI/CD pipelines, run secure custom email servers, and focus on infrastructure reliability, high availability, and operational excellence.',
    email: 'shuvohalder59@gmail.com',
    phone: '+8801710634144',
    whatsapp: 'https://wa.me/8801710634144',
    location: 'Dhaka, Bangladesh',
    github: 'https://github.com/shuvo-halder',
    linkedin: 'https://www.linkedin.com/in/shuvo-halder',
    devto: 'https://dev.to/shuvo_h',
    fiverr: 'https://www.fiverr.com/shuvo_halder',
    heroRoles: [
      'System & Cloud Infrastructure',
      'DevOps Engineer',
      'Private Cloud Architect',
      'Linux System Engineer',
    ],
  },
  skills: [
    {
      title: 'Cloud & Virtualization',
      command: 'ls /skills/cloud',
      items: [
        'OpenStack',
        'Proxmox',
        'VMware ESXi',
        'AWS Lightsail',
        'Microsoft Azure VM',
        'Docker',
        'Kubernetes',
        'k3s',
        'Ceph Storage',
      ],
      order: 1,
      published: true,
    },
    {
      title: 'System Administration',
      command: 'ls /skills/sysadmin',
      items: [
        'Linux (CentOS, RHEL, Ubuntu, Debian)',
        'Windows Server 2016-2022',
        'Active Directory Domain Services',
        'Email Servers (Postfix, Roundcube)',
      ],
      order: 2,
      published: true,
    },
    {
      title: 'DevOps & Automation',
      command: 'ls /skills/devops',
      items: [
        'CI/CD Pipelines',
        'Jenkins',
        'ArgoCD',
        'Git & GitHub',
        'Server Resource Monitoring',
        'LAMP / LEMP Stack',
        'Bash Scripting',
      ],
      order: 3,
      published: true,
    },
    {
      title: 'Networking & Security',
      command: 'ls /skills/networking',
      items: [
        'Cisco Routers & Switches',
        'MikroTik',
        'BGP',
        'OSPF',
        'VLAN',
        'Next-Gen Firewalls',
        'TCP/IP',
        'DNS & DHCP',
        'OLT',
        'SNMP / Radius Monitoring (Grafana)',
      ],
      order: 4,
      published: true,
    },
    {
      title: 'Programming & Web',
      command: 'ls /skills/programming-web',
      items: ['Python', 'PHP', 'Laravel', 'MySQL', 'JavaScript', 'jQuery'],
      order: 5,
      published: true,
    },
  ],
  experience: [
    {
      role: 'Assistant System Engineer',
      company: 'Plexus Cloud',
      period: 'May 2025 – Present',
      points: [
        'Installed, configured, and managed OpenStack, Proxmox, and VMware ESXi private cloud infrastructure for scalable virtualization.',
        'Configured and deployed Ceph storage clusters, integrating them with lightweight Kubernetes (k3s).',
        'Deployed and managed scalable containerized workloads using Docker, Kubernetes, and automated CI/CD pipelines.',
        'Managed custom email server solutions with a focus on security, uptime, and data protection.',
        'Implemented Radius and SNMP monitoring on MikroTik and OLT devices with Grafana-based visualization.',
        'Monitored systems, troubleshot issues, and documented configurations; assisted senior staff with system optimizations.',
      ],
      order: 1,
      published: true,
    },
    {
      role: 'Web Developer & Executive',
      company: 'Techno Apogee',
      period: 'Aug 2023 – Jul 2024',
      points: [
        'Built custom web applications with PHP, Laravel, MySQL, and JavaScript; contributed to CRM and inventory management systems.',
      ],
      order: 2,
      published: true,
    },
    {
      role: 'Web Developer',
      company: 'Prosha Bangladesh Limited',
      period: 'Oct 2022 – Jul 2023',
      points: [
        'Developed ERP, POS, and e-commerce web applications using PHP, Laravel, MySQL, and jQuery.',
      ],
      order: 3,
      published: true,
    },
  ],
  projects: [
    {
      title: 'core-panel',
      slug: 'core-panel',
      description:
        'Self-hosted, production-grade VPS management platform, lightweight and secure alternative to cPanel/CyberPanel/aaPanel with strict privilege separation.',
      tech: ['Python', 'FastAPI', 'Linux', 'VPS Management'],
      githubUrl: 'https://github.com/shuvo-halder/core-panel',
      category: 'Open Source & Automation',
      order: 1,
      published: true,
    },
    {
      title: 'virtualhost-automation',
      slug: 'virtualhost-automation',
      description:
        "Production-grade virtual host manager for Apache and Nginx on Ubuntu/Debian with SSL/Let's Encrypt, HTTP-to-HTTPS redirect, and DNS configuration.",
      tech: ['Shell', 'Nginx', 'Apache', 'Ubuntu/Debian'],
      githubUrl: 'https://github.com/shuvo-halder/virtualhost-automation',
      category: 'Open Source & Automation',
      order: 2,
      published: true,
    },
    {
      title: 'certbot-smart-manager',
      slug: 'certbot-smart-manager',
      description:
        "SSL certificate lifecycle management for Let's Encrypt / Certbot featuring automated renewals, systemd timers, backup/rollback, and multi-channel alerts.",
      tech: ['Shell', 'Certbot', "Let's Encrypt", 'Systemd'],
      githubUrl: 'https://github.com/shuvo-halder/certbot-smart-manager',
      category: 'Open Source & Automation',
      order: 3,
      published: true,
    },
    {
      title: 'nginx-inspector',
      slug: 'nginx-inspector',
      description:
        'Advanced Nginx log analyzer with web dashboard and REST API for real-time traffic analysis, security auditing, and status metric visualization.',
      tech: ['JavaScript', 'Python / Flask', 'Nginx', 'REST API'],
      githubUrl: 'https://github.com/shuvo-halder/nginx-inspector',
      category: 'Open Source & Automation',
      order: 4,
      published: true,
    },
    {
      title: 'log-archive-tool',
      slug: 'log-archive-tool',
      description:
        'Bash log archiving with compression, integrity checks, structured logging, automated cleanup, and remote backup support.',
      tech: ['Shell', 'Bash', 'Log Archiving', 'Linux'],
      githubUrl: 'https://github.com/shuvo-halder/log-archive-tool',
      category: 'Open Source & Automation',
      order: 5,
      published: true,
    },
    {
      title: 'performance-stats',
      slug: 'performance-stats',
      description:
        'Lightweight Linux server performance statistics collector — CPU, memory, disk and load reporting for capacity planning and troubleshooting.',
      tech: ['Shell', 'Linux', 'Monitoring'],
      githubUrl: 'https://github.com/shuvo-halder/performance-stats',
      category: 'Open Source & Automation',
      order: 6,
      published: true,
    },
  ],
  services: [
    {
      title: 'Linux Server Setup & Hardening',
      slug: 'linux-server-setup-hardening',
      description:
        'Production-ready Linux server setup and hardening on Ubuntu, Debian or RHEL, the way the Dev.to checklist teaches it: SSH, firewall, fail2ban, updates, backups.',
      tech: ['Ubuntu', 'Debian', 'RHEL', 'SSH', 'nftables', 'fail2ban'],
      tiers: [
        { name: 'Basic', price: 49, deliveryDays: 2, label: 'Single server hardening' },
        { name: 'Standard', price: 99, deliveryDays: 4, label: 'Hardening + firewall + backups' },
        { name: 'Premium', price: 199, deliveryDays: 7, label: 'Full setup + monitoring + docs' },
      ],
      imageUrl: '',
      fiverrUrl: '',
      order: 1,
      published: true,
    },
    {
      title: 'Docker & Kubernetes Deployment',
      slug: 'docker-kubernetes-deployment',
      description:
        'Your app containerized and running on Docker or k3s/Kubernetes — with ingress, TLS, CI/CD auto-deploy and basic monitoring. Also live as a Fiverr gig.',
      tech: ['Docker', 'Kubernetes', 'k3s', 'Ingress', 'Helm'],
      tiers: [
        { name: 'Basic', price: 50, deliveryDays: 2, label: 'DOCKERIZE — 1 app, Dockerfile + docker-compose' },
        { name: 'Standard', price: 150, deliveryDays: 5, label: 'K3S DEPLOY — k3s cluster, app deploy, ingress, SSL' },
        { name: 'Premium', price: 350, deliveryDays: 7, label: 'FULL DEVOPS — CI/CD + k3s + monitoring + backup plan' },
      ],
      imageUrl:
        'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/514518483/original/cdc8005febf37a8e31dd6c507cc8c97894344d0a/set-up-docker-kubernetes-k3s-and-ci-cd-pipeline-for-your-app.png',
      fiverrUrl:
        'https://www.fiverr.com/shuvo_halder/set-up-docker-kubernetes-k3s-and-ci-cd-pipeline-for-your-app',
      order: 2,
      published: true,
    },
    {
      title: 'Proxmox / VMware / OpenStack Cloud Setup',
      slug: 'proxmox-vmware-openstack-cloud',
      description:
        'Private cloud setup on your own hardware: Proxmox, VMware or OpenStack virtualization, Ceph storage and networking, ready for production workloads.',
      tech: ['Proxmox VE', 'VMware ESXi', 'OpenStack', 'Ceph'],
      tiers: [
        { name: 'Basic', price: 149, deliveryDays: 5, label: 'Single-node virtualization setup' },
        { name: 'Standard', price: 299, deliveryDays: 10, label: 'Multi-node + storage' },
        { name: 'Premium', price: 599, deliveryDays: 14, label: 'Full private cloud + HA' },
      ],
      imageUrl: '',
      fiverrUrl: '',
      order: 3,
      published: true,
    },
    {
      title: 'NGINX, SSL / Certbot & Website Migration',
      slug: 'nginx-ssl-certbot-migration',
      description:
        "NGINX reverse proxy and load balancer setup, auto-renewing Let's Encrypt SSL with Certbot, and zero-downtime website migration.",
      tech: ['NGINX', 'Certbot', "Let's Encrypt", 'Migration'],
      tiers: [
        { name: 'Basic', price: 39, deliveryDays: 2, label: 'NGINX + SSL for 1 site' },
        { name: 'Standard', price: 79, deliveryDays: 3, label: 'Reverse proxy + SSL + migration' },
        { name: 'Premium', price: 149, deliveryDays: 5, label: 'Load balancing + migration + hardening' },
      ],
      imageUrl: '',
      fiverrUrl: '',
      order: 4,
      published: true,
    },
    {
      title: 'CI/CD Pipeline (GitHub Actions)',
      slug: 'cicd-pipeline-github-actions',
      description:
        'Push-to-deploy pipelines with tests, builds and automated deploys — no more manual SSH-and-pray releases.',
      tech: ['GitHub Actions', 'CI/CD', 'Docker', 'Deploy'],
      tiers: [
        { name: 'Basic', price: 59, deliveryDays: 3, label: 'Single pipeline, 1 repo' },
        { name: 'Standard', price: 119, deliveryDays: 5, label: 'Tests + staging + production' },
        { name: 'Premium', price: 249, deliveryDays: 7, label: 'Multi-env + rollback + alerts' },
      ],
      imageUrl: '',
      fiverrUrl: '',
      order: 5,
      published: true,
    },
    {
      title: 'Monitoring Setup (Prometheus + Grafana)',
      slug: 'monitoring-prometheus-grafana',
      description:
        'Server monitoring setup with Prometheus, Grafana and Alertmanager — metrics, alerts and dashboards so you know a server is dying before your users do.',
      tech: ['Prometheus', 'Grafana', 'Alertmanager', 'Loki'],
      tiers: [
        { name: 'Basic', price: 59, deliveryDays: 3, label: 'Metrics + 1 dashboard' },
        { name: 'Standard', price: 119, deliveryDays: 5, label: 'Dashboards + alerts' },
        { name: 'Premium', price: 229, deliveryDays: 7, label: 'Full stack + Loki logs + docs' },
      ],
      imageUrl: '',
      fiverrUrl: '',
      order: 6,
      published: true,
    },
    {
      title: 'Network Setup — MikroTik, BGP / OSPF, VLAN',
      slug: 'network-mikrotik-bgp-ospf-vlan',
      description:
        'Office and data-center network setup: MikroTik routers, BGP/OSPF routing, VLAN segmentation, VPN and firewall rules that make sense.',
      tech: ['MikroTik', 'BGP', 'OSPF', 'VLAN', 'VPN'],
      tiers: [
        { name: 'Basic', price: 69, deliveryDays: 3, label: 'Single router + VLAN setup' },
        { name: 'Standard', price: 139, deliveryDays: 5, label: 'Routing + VPN + firewall' },
        { name: 'Premium', price: 279, deliveryDays: 10, label: 'Full network design + docs' },
      ],
      imageUrl: '',
      fiverrUrl: '',
      order: 7,
      published: true,
    },
    {
      title: 'Business Email Server — Postfix, Dovecot & Roundcube',
      slug: 'business-email-server-postfix-dovecot-roundcube',
      description:
        'Your own email server on your domain (you@yourcompany.com) — no per-user monthly fees. Setup, tested sending/receiving, and a short guide included.',
      tech: ['Postfix', 'Dovecot', 'Roundcube', 'SPF / DKIM / DMARC', 'SSL/TLS'],
      tiers: [
        { name: 'Basic', price: 40, deliveryDays: 2, label: 'BASIC MAIL SERVER — Postfix + Dovecot, SSL, 1 domain, up to 5 mailboxes' },
        { name: 'Standard', price: 90, deliveryDays: 3, label: 'BUSINESS EMAIL — plus Roundcube, SPF, DKIM, DMARC, up to 20 mailboxes' },
        { name: 'Premium', price: 180, deliveryDays: 5, label: 'SECURE EMAIL PRO — plus spam filter, hardening, backup guide, 7 days support' },
      ],
      imageUrl:
        'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/514783503/original/d1df2462d30577cd1a7db25ef8c6fe308d6e87b2/set-up-a-business-email-server-with-postfix-dovecot-and-roundcube.png',
      fiverrUrl:
        'https://www.fiverr.com/shuvo_halder/set-up-a-business-email-server-with-postfix-dovecot-and-roundcube',
      order: 8,
      published: true,
    },
  ],
  education: [
    {
      degree: 'B.Sc in Computer Science and Engineering',
      school: 'Dhaka International University',
      period: 'Expected May 2026',
      detail: '',
      order: 1,
      published: true,
    },
    {
      degree: 'Diploma in Engineering (Computer Technology)',
      school: 'Gopalganj Polytechnic Institute',
      period: 'Graduated 2021 • CGPA 3.55',
      detail: '',
      order: 2,
      published: true,
    },
  ],
  certifications: [
    {
      title: 'Red Hat Certified System Administrator (RHCSA)',
      year: '2025',
      issuer: 'Linux Pathshala Limited',
      order: 1,
      published: true,
    },
    {
      title: 'System & Network Administration (Cisco + MikroTik + Linux)',
      year: '2026',
      issuer: 'CSL Training',
      order: 2,
      published: true,
    },
    {
      title: 'Web Development (PHP, Laravel, MySQL, AJAX, React, Vue.js)',
      year: '2020',
      issuer: 'Creative IT Institute',
      order: 3,
      published: true,
    },
    {
      title: 'Web Design (JavaScript, HTML, Bootstrap, CSS)',
      year: '2019',
      issuer: 'Creative Shaper',
      order: 4,
      published: true,
    },
  ],
  articles: [
    {
      title: 'Certbot Smart Manager: Never Let an SSL Certificate Expire',
      url: 'https://dev.to/shuvo_h/certbot-smart-manager-never-let-an-ssl-certificate-expire-1l9m',
      coverImage: '',
      publishedAt: '2026-11-22',
      description: 'Automated SSL renewals, systemd timers, backup/rollback and alerts with Certbot.',
      tags: ['certbot', 'letsencrypt', 'ssl', 'devops'],
      order: 1,
      published: true,
    },
    {
      title: 'Linux Server Hardening: A Production Checklist That Actually Holds',
      url: 'https://dev.to/shuvo_h/linux-server-hardening-a-production-checklist-that-actually-holds-3pn5',
      coverImage: '',
      publishedAt: '2026-11-22',
      description: 'SSH, firewall, fail2ban, updates and backups — the hardening checklist from production.',
      tags: ['linux', 'security', 'devops', 'sysadmin'],
      order: 2,
      published: true,
    },
    {
      title: 'Docker Networking Explained: Bridge, Host, Overlay and What Breaks in Production',
      url: 'https://dev.to/shuvo_h/docker-networking-explained-bridge-host-overlay-and-what-breaks-in-production-37d2',
      coverImage: '',
      publishedAt: '2026-11-23',
      description: 'Docker networking modes explained with the failures you actually hit in production.',
      tags: ['docker', 'networking', 'devops'],
      order: 3,
      published: true,
    },
    {
      title: 'Kubernetes Ingress in k3s: Routing That Actually Works in Production',
      url: 'https://dev.to/shuvo_h/kubernetes-ingress-in-k3s-routing-that-actually-works-in-production-4k8a',
      coverImage: '',
      publishedAt: '2026-11-24',
      description: 'Ingress, TLS and sane defaults for k3s clusters that serve real traffic.',
      tags: ['kubernetes', 'k3s', 'ingress'],
      order: 4,
      published: true,
    },
    {
      title: 'Monitor Servers with Prometheus and Grafana',
      url: 'https://dev.to/shuvo_h/monitor-servers-with-prometheus-and-grafana-metrics-alerts-and-dashboards-that-actually-wake-you-2pj8',
      coverImage: '',
      publishedAt: '2026-11-25',
      description: 'Metrics, alerts and dashboards that actually wake you up.',
      tags: ['prometheus', 'grafana', 'monitoring'],
      order: 5,
      published: true,
    },
    {
      title: 'Linux Server Backup That Actually Restores',
      url: 'https://dev.to/shuvo_h/linux-server-backup-that-actually-restores-1994',
      coverImage: '',
      publishedAt: '2026-11-26',
      description: 'Backups are worthless until you test the restore. A backup plan that actually restores.',
      tags: ['linux', 'backup', 'devops'],
      order: 6,
      published: true,
    },
    {
      title: 'Proxmox VE: Build Your Own Private Cloud',
      url: 'https://dev.to/shuvo_h/proxmox-ve-build-your-own-private-cloud-2m98',
      coverImage: '',
      publishedAt: '2026-11-27',
      description: 'Build a private cloud on your own hardware with Proxmox VE.',
      tags: ['proxmox', 'cloud', 'virtualization'],
      order: 7,
      published: true,
    },
  ],
  faqs: [
    {
      question: 'How do I order a service?',
      answer:
        'Pick a gig, then order by Email, WhatsApp, or directly on Fiverr where the gig is listed. You get a confirmed price and delivery date before any work starts.',
      order: 1,
      published: true,
    },
    {
      question: 'What do you need from me to start?',
      answer:
        'Your requirements, plus server or domain access for the job — for example your VPS login, domain name, or app repository.',
      order: 2,
      published: true,
    },
    {
      question: 'How fast is delivery?',
      answer:
        'Basic packages start from 2 days; larger Standard and Premium work takes 3 to 14 days depending on scope.',
      order: 3,
      published: true,
    },
    {
      question: 'Do you offer support after delivery?',
      answer:
        'Yes — every gig includes revisions and a written guide where it applies. The business email server gig includes 7 days of free support for work-related issues.',
      order: 4,
      published: true,
    },
    {
      question: 'Can you work on my existing server or cloud?',
      answer:
        'Yes — VPS, Hetzner, DigitalOcean, AWS, or your own hardware, including Proxmox, VMware, OpenStack, and MikroTik networks.',
      order: 5,
      published: true,
    },
  ],
};
