import fs from "fs";
import path from "path";
import axios from "axios";

const baseUrl = "https://rennystrips.com";

// ------------------------------------
// Read static routes from App.jsx
// ------------------------------------

const appFile = path.join(process.cwd(), "src", "App.jsx");
const staticRoutes = [];

if (fs.existsSync(appFile)) {
  const content = fs.readFileSync(appFile, "utf8");
const routeRegex = /<Route[\s\S]*?path="([^"]+)"/g;
  let match;

  while ((match = routeRegex.exec(content))) {
    const route = match[1];

    // Skip dynamic and wildcard routes
    if (route.includes(":") || route.includes("*")) {
      continue;
    }

    staticRoutes.push(route);
  }
}

// ------------------------------------
// Exclude legacy / redirect URLs
// ------------------------------------

const EXCLUDED_ROUTES = new Set([
  "/ec",
  "/tag/scaffolding-formwork-company-in-india/feed",
  "/tag/forged-scaffolding-components",
  "/tag/scaffolding-formwork-company-in-india",
  "/blog/renny-strips-leading-the-future-of-steel-fabrication-forging",
  "/the-surging-demand-for-sustainable-steel-scaffolding-and-formwork-within-the-construction-and-infrastructure-in",
  "/tag/scaffolding-and-formworks-frames/feed",
  "/tag/renny/feed",
  "/tag/wire-rod-manufacturers-in-india/feed",
  "/renny-kwikstage-scaffolding-a-global-leader-in-versatile-high-performance-scaffolding-solutions",
  "/category/uncategorized/page/3",
  "/category/uncategorized/page/2",
  "/tag/gi-hollow-section-pipe/feed",
  "/explore-the-leading-wire-rod",
  "/blog/renny-kwikstage-",
  "/blog/renny-indias-leading-erw-pipe-manufacturer",
  "/tag/v/feed",
  "/the-role-of-renny-steel-props-in-modern-construction-innovation-safety-efficiency",
  "/blog/the-",
]);

const uniqueStaticRoutes = [...new Set(staticRoutes)].filter(
  (route) =>
    !EXCLUDED_ROUTES.has(route) &&
    !route.includes("/thank-you")
);

// ------------------------------------
// Priority logic
// ------------------------------------

const getPriority = (route) => {
  if (route === "/") return "1.0";

  const highPriorityPages = [
    "/company-overview",
    "/manufacturing-units",
    "/quality-standard",
  
  ];

  if (highPriorityPages.includes(route)) return "0.9";
  if (route.startsWith("/blog")) return "0.8";
  if (route.startsWith("/careers")) return "0.6";

  return "0.7";
};

const getChangeFreq = (route) => {
  if (route === "/") return "weekly";
  if (route.startsWith("/blog")) return "weekly";
  return "monthly";
};

// ------------------------------------
// Build XML — static routes
// ------------------------------------

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

uniqueStaticRoutes.forEach((route) => {
  xml += `
  <url>
    <loc>${baseUrl}${route === "/" ? "" : route}</loc>
    <changefreq>${getChangeFreq(route)}</changefreq>
    <priority>${getPriority(route)}</priority>
  </url>`;
});

// ------------------------------------
// Append dynamic blog URLs
// ------------------------------------

// Load backend API URL from process.env or .env file, fallback to production URL
const envPath = path.join(process.cwd(), ".env");
let viteApiUrl = process.env.VITE_API_URL || "https://renny-backend.onrender.com";
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  const match = envContent.match(/^\s*VITE_API_URL\s*=\s*([^\s#]+)/m);
  if (match) {
    viteApiUrl = match[1].replace(/["']/g, "").trim();
  }
}
const apiUrl = viteApiUrl.replace(/\/$/, "");
console.log(`Connecting to backend API at: ${apiUrl}`);

try {
  const response = await axios.get(
    `${apiUrl}/api/blogs`
  );

  const blogs = response?.data?.data || [];

  blogs.forEach((blog) => {
    if (!blog.slug) return;

    const lastMod = blog.updatedAt || blog.createdAt;
    const lastModTag = lastMod
      ? `\n    <lastmod>${new Date(lastMod).toISOString().split("T")[0]}</lastmod>`
      : "";

    xml += `
  <url>
    <loc>${baseUrl}/blog/${blog.slug}</loc>${lastModTag}
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  console.log(`✓ Added ${blogs.length} blog URLs`);
} catch (error) {
  console.error("⚠ Could not fetch blog posts:", error.message);
  console.log("  Sitemap will only include static routes.");
}

// ------------------------------------
// Write file
// ------------------------------------

xml += `
</urlset>`;

const outPath = path.join(process.cwd(), "public", "sitemap.xml");
fs.writeFileSync(outPath, xml, "utf8");

console.log("✓ sitemap.xml written to public/sitemap.xml");
