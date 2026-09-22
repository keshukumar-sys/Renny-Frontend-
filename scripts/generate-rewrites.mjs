import fs from "fs";
import path from "path";
import axios from "axios";

// Keeps the explicit /blog/<slug> -> /blog/<slug>/index.html rules in
// amplify_rewrites.json in sync with the live blog list, so every
// prerendered post resolves to its own (self-canonicalized) static file
// instead of falling through to the homepage's index.html.

const rewritesPath = path.join(process.cwd(), "amplify_rewrites.json");

if (!fs.existsSync(rewritesPath)) {
  console.error(`✗ ${rewritesPath} not found — skipping rewrite generation.`);
  process.exit(0);
}

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

let blogs = [];
try {
  const response = await axios.get(`${apiUrl}/api/blogs`);
  blogs = response?.data?.data || [];
} catch (error) {
  console.error("⚠ Could not fetch blog posts:", error.message);
  console.log("  amplify_rewrites.json left unchanged.");
  process.exit(0);
}

const slugs = [...new Set(blogs.map((b) => b.slug).filter(Boolean))];

const rules = JSON.parse(fs.readFileSync(rewritesPath, "utf8"));

// A generated rule is a /blog/<slug> rewrite that maps a post to its own
// nested index.html; this shape never occurs among the hand-maintained
// legacy redirects, so it's safe to strip and regenerate on every run.
const isGeneratedBlogRule = (r) =>
  r.status === "200" &&
  r.source.startsWith("/blog/") &&
  r.target === `${r.source}/index.html`;

const withoutGenerated = rules.filter((r) => !isGeneratedBlogRule(r));

const blogIndexRuleIdx = withoutGenerated.findIndex(
  (r) => r.source === "/blog" && r.target === "/blog/index.html"
);

if (blogIndexRuleIdx === -1) {
  console.error(
    '✗ Could not find the "/blog" -> "/blog/index.html" rule to anchor on.'
  );
  console.log("  amplify_rewrites.json left unchanged.");
  process.exit(1);
}

const generatedRules = slugs.map((slug) => ({
  source: `/blog/${slug}`,
  status: "200",
  target: `/blog/${slug}/index.html`,
}));

const result = [
  ...withoutGenerated.slice(0, blogIndexRuleIdx + 1),
  ...generatedRules,
  ...withoutGenerated.slice(blogIndexRuleIdx + 1),
];

const unchanged = JSON.stringify(result) === JSON.stringify(rules);

if (!unchanged) {
  const output = JSON.stringify(result, null, 2).replace(/\n/g, "\r\n");
  fs.writeFileSync(rewritesPath, output, "utf8");
}

console.log(
  `✓ Synced ${slugs.length} blog rewrite rule(s) into amplify_rewrites.json${
    unchanged ? " (no changes)" : ""
  }`
);
