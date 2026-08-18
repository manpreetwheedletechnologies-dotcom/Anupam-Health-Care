/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Images can come from: local /public assets, ui-avatars.com
    // (auto-generated avatars), and the backend's /uploads/* folder
    // (admin dashboard image uploads) — which can be any host depending
    // on where the backend is deployed. Rather than hardcode a domain
    // list that breaks on every new deployment, disable Next's built-in
    // optimizer so any image URL just works.
    unoptimized: true,
  },
};

module.exports = nextConfig;
