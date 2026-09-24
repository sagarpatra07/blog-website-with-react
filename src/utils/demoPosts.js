export const MOCK_POSTS = [
  {
    $id: "designing-minimalist-interfaces",
    title: "Designing Minimalist Interfaces for the Modern Web",
    slug: "designing-minimalist-interfaces",
    content: `
      <p class="lead">Minimalism in digital design is not merely the absence of clutter—it is the intentional highlight of what matters most.</p>
      <h2>The Core Principles</h2>
      <p>When creating high-impact user experiences, reduction is empowerment. By stripping away extraneous shadows, heavy borders, and distracting colors, you force the reader's attention onto content and typography.</p>
      <h3>1. Content As Structure</h3>
      <p>In a minimalist layout, white space acts as active padding rather than empty real estate. It guides the eye seamlessly across headers, paragraphs, and media elements.</p>
      <h3>2. Purposeful Micro-interactions</h3>
      <p>Subtle transitions, refined hover states, and smooth focus indicators give feedback without visual noise.</p>
      <blockquote>"Simplicity is about subtracting the obvious and adding the meaningful." — John Maeda</blockquote>
      <p>Try applying subtle HSL color palettes and high-contrast typography in your next React application for an instant visual upgrade.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    status: "active",
    userId: "demo-user-1",
    authorName: "Sarah Chen",
    readTime: "4 min read",
    createdAt: "2026-09-20"
  },
  {
    $id: "react-19-and-the-future-of-state",
    title: "React 19, Server Actions, and Modern State Architecture",
    slug: "react-19-and-the-future-of-state",
    content: `
      <p class="lead">The ecosystem around React continues to evolve. With React 19's enhancements and streamlined hooks, building responsive frontends is faster than ever.</p>
      <h2>What Changed in State Management?</h2>
      <p>Redux Toolkit combined with React 19 provides unprecedented control over complex client-side workflows while preserving predictable state mutation streams.</p>
      <pre><code>const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { ... }
});</code></pre>
      <p>By decoupling domain business logic from view components, your UI remains light, testable, and reusable.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    status: "active",
    userId: "demo-user-2",
    authorName: "Alex Rivera",
    readTime: "6 min read",
    createdAt: "2026-09-22"
  },
  {
    $id: "building-scalable-cloud-backends",
    title: "Connecting Decoupled Frontends with Appwrite Cloud",
    slug: "building-scalable-cloud-backends",
    content: `
      <p class="lead">Appwrite simplifies authentication, document databases, and file storage with clean SDKs and granular security controls.</p>
      <h2>Why Appwrite?</h2>
      <p>Setting up Auth, Databases, and Buckets takes minutes. Frontend developers can focus entirely on craft, speed, and user interface elegance.</p>
      <p>With built-in querying, file previews, and real-time events, Appwrite is an ideal backend engine for React single-page applications.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    status: "active",
    userId: "demo-user-1",
    authorName: "Sarah Chen",
    readTime: "5 min read",
    createdAt: "2026-09-24"
  }
];

export function getLocalDemoPosts() {
  try {
    const saved = localStorage.getItem("demo_posts");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  return MOCK_POSTS;
}

export function saveLocalDemoPost(post) {
  const current = getLocalDemoPosts();
  const existingIndex = current.findIndex(p => p.$id === post.$id || p.slug === post.slug);
  let updated;
  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = { ...updated[existingIndex], ...post };
  } else {
    updated = [post, ...current];
  }
  try {
    localStorage.setItem("demo_posts", JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return updated;
}
