/**
 * Seed script — run once to populate your MongoDB with demo projects.
 *
 * Usage:
 *   npx tsx scripts/seed-projects.ts
 *
 * Requires MONGODB_URI in your environment (loads from .env.local).
 */

import "dotenv/config";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in environment");

const ProjectSchema = new mongoose.Schema(
  {
    title:       String,
    slug:        { type: String, unique: true },
    description: String,
    longDesc:    String,
    thumbnail:   String,
    tags:        [String],
    category:    String,
    status:      { type: String, default: "locked" },
    liveUrl:     String,
    sourceUrl:   String,
    encryption:  String,
    featured:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project ?? mongoose.model("Project", ProjectSchema);

const PROJECTS = [
  {
    title:       "Neural Flow",
    slug:        "neural-flow",
    description: "Real-time anomaly detection in high-frequency financial data streams.",
    longDesc:    "Processing >10k transactions/sec with latency sub-50ms required a custom Rust-based ingestion engine.",
    tags:        ["Rust", "PyTorch", "Kafka"],
    category:    "ai",
    status:      "unlocked",
    liveUrl:     "https://demo.yourportfolio.dev/neural-flow",
    sourceUrl:   "https://github.com/yourusername/neural-flow",
    encryption:  null,
    featured:    false,
  },
  {
    title:       "Vortex Core",
    slug:        "vortex-core",
    description: "Autonomous agent framework for distributed system management.",
    tags:        ["Go", "gRPC", "Redis"],
    category:    "ai",
    status:      "locked",
    encryption:  "SHA-256",
    featured:    false,
  },
  {
    title:       "Synth Wave",
    slug:        "synth-wave",
    description: "Generative adversarial network for audio synthesis.",
    tags:        ["Python", "TensorFlow", "FastAPI"],
    category:    "ai",
    status:      "locked",
    encryption:  "AES-128",
    featured:    true,
  },
  {
    title:       "Ghost Shell",
    slug:        "ghost-shell",
    description: "Container orchestration dashboard with predictive scaling.",
    tags:        ["React", "Node.js", "Docker", "Prometheus"],
    category:    "devops",
    status:      "locked",
    encryption:  "QUANTUM",
    featured:    false,
  },
  {
    title:       "Echo Protocol",
    slug:        "echo-protocol",
    description: "Natural language processing interface for legacy databases.",
    longDesc:    "Bridging modern LLMs with SQL-92 legacy systems securely without exposing sensitive schema data.",
    tags:        ["Python", "LangChain", "SQLAlchemy"],
    category:    "ai",
    status:      "unlocked",
    liveUrl:     "https://demo.yourportfolio.dev/echo-protocol",
    sourceUrl:   "https://github.com/yourusername/echo-protocol",
    encryption:  null,
    featured:    false,
  },
  {
    title:       "Omega Grid",
    slug:        "omega-grid",
    description: "Smart energy distribution algorithm for micro-grids.",
    tags:        ["Python", "NumPy", "MQTT"],
    category:    "ai",
    status:      "locked",
    encryption:  "RSA-4096",
    featured:    false,
  },
];

async function seed() {
  console.log("🔌 Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected");

  console.log("🗑  Clearing existing projects...");
  await Project.deleteMany({});

  console.log("🌱 Seeding projects...");
  const inserted = await Project.insertMany(PROJECTS);
  console.log(`✅ Inserted ${inserted.length} projects`);

  await mongoose.disconnect();
  console.log("🏁 Done. Run npm run dev and visit /projects");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});