/**
 * Seed script — demo log entries.
 * Run: npx tsx scripts/seed-logs.ts
 */
import 'dotenv/config';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error('Missing MONGODB_URI');

const LogSchema = new mongoose.Schema(
  {
    title:     String,
    slug:      { type: String, unique: true },
    excerpt:   String,
    content:   String,
    tags:      [String],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);
const Log = mongoose.models.Log ?? mongoose.model('Log', LogSchema);

const LOGS = [
  {
    title:   'Building a RAG pipeline with LangChain and pgvector',
    slug:    'rag-pipeline-langchain-pgvector',
    excerpt: 'How I wired LangChain, OpenAI embeddings, and pgvector into a retrieval-augmented generation system that answers questions over private documents.',
    content: 'Full content here — replace with your actual writing.',
    tags:    ['AI', 'LangChain', 'PostgreSQL', 'RAG'],
    published: true,
  },
  {
    title:   'Why I switched from Prisma to raw Mongoose for this portfolio',
    slug:    'prisma-vs-mongoose',
    excerpt: 'Prisma is great — but for a small portfolio with a flexible schema, raw Mongoose with TypeScript generics turned out to be faster and less config overhead.',
    content: 'Full content here — replace with your actual writing.',
    tags:    ['MongoDB', 'TypeScript', 'Architecture'],
    published: true,
  },
  {
    title:   'Animating the decrypt effect — how the ProjectCard scramble works',
    slug:    'decrypt-animation-deep-dive',
    excerpt: 'A breakdown of the character scramble animation on the Projects page — setInterval, clip-path, and why I avoided Framer Motion for this one.',
    content: 'Full content here — replace with your actual writing.',
    tags:    ['React', 'Animation', 'CSS'],
    published: true,
  },
  {
    title:   'Upstash Redis rate limiting in Next.js API routes',
    slug:    'upstash-rate-limiting-nextjs',
    excerpt: 'Setting up a sliding window rate limiter on the contact form API route using Upstash Redis — free tier, edge-compatible, and 10 lines of code.',
    content: 'Full content here — replace with your actual writing.',
    tags:    ['Next.js', 'Redis', 'Security'],
    published: true,
  },
];

async function seed() {
  console.log('Connecting...');
  await mongoose.connect(MONGODB_URI);
  await Log.deleteMany({});
  const inserted = await Log.insertMany(LOGS);
  console.log('Seeded', inserted.length, 'log entries');
  await mongoose.disconnect();
}

seed().catch((e) => { console.error(e); process.exit(1); });