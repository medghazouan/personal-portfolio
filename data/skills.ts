export type SkillCategory = "frontend" | "backend" | "ai" | "devops";

export interface Skill {
  id:          string;
  name:        string;
  category:    SkillCategory;
  description: string;
  version:     string;
  proficiency: number; // 0–100
  icon:        string; // lucide icon name or custom SVG path ref
}

export const SKILLS: Skill[] = [
  /* ── FRONTEND ─────────────────────────────────────────── */
  {
    id:          "react",
    name:        "React",
    category:    "frontend",
    description: "Component architecture & state management engine.",
    version:     "v18.2",
    proficiency: 90,
    icon:        "atom",
  },
  {
    id:          "tailwind",
    name:        "Tailwind CSS",
    category:    "frontend",
    description: "Utility-first styling framework for rapid UI.",
    version:     "v4.0",
    proficiency: 95,
    icon:        "wind",
  },
  {
    id:          "javascript",
    name:        "JavaScript",
    category:    "frontend",
    description: "Interpreted programming language for web development.",
    version:     "ES2023",
    proficiency: 90,
    icon:        "code-2",
  },
  {
    id:          "typescript",
    name:        "TypeScript",
    category:    "frontend",
    description: "Typed superset of JavaScript for scalable codebases.",
    version:     "v5",
    proficiency: 65,
    icon:        "file-code",
  },
  {
    id:          "nextjs",
    name:        "Next.js",
    category:    "frontend",
    // ↓ Self-assessed as "not that good" — proficiency adjusted
    description: "React framework for production-grade apps.",
    version:     "v15",
    proficiency: 75,
    icon:        "triangle",
  },

  /* ── BACKEND ──────────────────────────────────────────── */
  {
    id:          "nodejs",
    name:        "Node.js",
    category:    "backend",
    description: "JavaScript runtime for scalable network apps.",
    version:     "v22",
    proficiency: 75,
    icon:        "server",
  },
  {
    id:          "laravel",
    name:        "Laravel",
    category:    "backend",
    description: "PHP web application framework.",
    version:     "v11",
    proficiency: 85,
    icon:        "server",
  },
  {
    id:          "python",
    name:        "Python",
    category:    "backend",
    description: "Versatile language powering AI pipelines and APIs.",
    version:     "v3.12",
    proficiency: 88,
    icon:        "code",
  },
  {
    id:          "mysql",
    name:        "MySQL",
    category:    "backend",
    description: "Advanced open source relational database.",
    version:     "v8",
    proficiency: 85,
    icon:        "database",
  },
  {
    id:          "mongodb",
    name:        "MongoDB",
    category:    "backend",
    description: "Flexible document store for modern applications.",
    version:     "v7",
    proficiency: 87,
    icon:        "layers",
  },
  {
    id:          "supabase",
    name:        "Supabase",
    category:    "backend",
    description: "Open-source Firebase alternative with Postgres.",
    version:     "v2",
    proficiency: 80,
    icon:        "database",
  },

    /* ── AI / ML ──────────────────────────────────────────── */
  {
    id:          "langchain",
    name:        "LangChain",
    category:    "ai",
    description: "Framework for building LLM-powered applications.",
    version:     "v0.3",
    proficiency: 88,
    icon:        "link",
  },
  {
    id:          "langgraph",
    name:        "LangGraph",
    category:    "ai",
    description: "Graph-based orchestration for multi-agent AI systems.",
    version:     "v0.2",
    proficiency: 82,
    icon:        "git-branch",
  },
  {
    id:          "rag",
    name:        "RAG Systems",
    category:    "ai",
    description: "Retrieval-Augmented Generation pipelines with FAISS.",
    version:     "–",
    proficiency: 88,
    icon:        "search",
  },

  /* ── DEVOPS ───────────────────────────────────────────── */
  {
    id:          "github",
    name:        "GitHub",
    category:    "devops",
    description: "Version control and collaborative development platform.",
    version:     "–",
    proficiency: 90,
    icon:        "git-branch",
  },
  {
    id:          "vercel",
    name:        "Vercel",
    category:    "devops",
    description: "Edge deployment platform for Next.js and React apps.",
    version:     "–",
    proficiency: 85,
    icon:        "triangle",
  },
  {
    id:          "n8n",
    name:        "n8n",
    category:    "devops",
    description: "Visual workflow automation for AI and business pipelines.",
    version:     "v1",
    proficiency: 78,
    icon:        "workflow",
  },

];

/* Helper — filter by category */
export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return SKILLS.filter((s) => s.category === category);
}

export const SKILL_CATEGORIES: { id: SkillCategory | "all"; label: string }[] = [
  { id: "all",      label: "ALL SYSTEMS" },
  { id: "frontend", label: "FRONTEND"    },
  { id: "backend",  label: "BACKEND"     },
  { id: "ai",       label: "AI / ML"     },
  { id: "devops",   label: "DEVOPS"      },
];
