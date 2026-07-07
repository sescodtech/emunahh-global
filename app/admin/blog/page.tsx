"use client";

import { useState } from "react";
import { blogPosts as initialPosts, type BlogPost } from "@/data/blog-content";
import { Button } from "@/components/ui/button";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Client-side editable demo, same pattern as the other admin content
// pages. In production, Add/Save/Delete call server actions that write
// to a BlogPost table (see prisma/schema.prisma) instead of local state.
export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [editingId, setEditingId] = useState<string | null>(null);

  function updateField(id: string, field: keyof BlogPost, value: string | boolean) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  function addPost() {
    const id = `new-${Date.now()}`;
    const newPost: BlogPost = {
      id,
      slug: `untitled-${Date.now()}`,
      title: "Untitled Post",
      excerpt: "",
      content: "",
      coverEmoji: "📰",
      author: "Emunahh Global Team",
      publishedAt: new Date().toISOString(),
      tags: [],
      isActive: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    setEditingId(id);
  }

  function remove(id: string) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl italic text-ink-navy">Blog</h1>
          <p className="mt-1 text-sm text-slate">
            Write and publish articles shown on the public Blog page.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={addPost}>+ New Post</Button>
      </div>

      <div className="mt-6 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-navy/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 font-mono text-[0.65rem] font-medium ${
                    post.isActive
                      ? "bg-approved-green/10 text-approved-green"
                      : "bg-slate/10 text-slate"
                  }`}
                >
                  {post.isActive ? "Published" : "Draft"}
                </span>
                <span className="font-mono text-xs text-slate">/blog/{post.slug}</span>
              </div>
              <div className="flex gap-2">
                <button
                  className="text-xs text-slate underline"
                  onClick={() => setEditingId(editingId === post.id ? null : post.id)}
                >
                  {editingId === post.id ? "Close" : "Edit"}
                </button>
                <button className="text-xs text-visa-red underline" onClick={() => remove(post.id)}>
                  Delete
                </button>
              </div>
            </div>

            {editingId === post.id ? (
              <div className="mt-3 space-y-3">
                <label className="block text-sm font-medium text-ink-navy">
                  Title
                  <input
                    value={post.title}
                    onChange={(e) => {
                      updateField(post.id, "title", e.target.value);
                      updateField(post.id, "slug", slugify(e.target.value));
                    }}
                    className="mt-1 w-full rounded-lg border border-ink-navy/15 px-3 py-2 text-sm"
                  />
                </label>
                <label className="block text-sm font-medium text-ink-navy">
                  Excerpt
                  <textarea
                    value={post.excerpt}
                    onChange={(e) => updateField(post.id, "excerpt", e.target.value)}
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-ink-navy/15 px-3 py-2 text-sm"
                  />
                </label>
                <label className="block text-sm font-medium text-ink-navy">
                  Content (paragraphs separated by a blank line)
                  <textarea
                    value={post.content}
                    onChange={(e) => updateField(post.id, "content", e.target.value)}
                    rows={8}
                    className="mt-1 w-full rounded-lg border border-ink-navy/15 px-3 py-2 text-sm"
                  />
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id={`active-${post.id}`}
                    type="checkbox"
                    checked={post.isActive}
                    onChange={(e) => updateField(post.id, "isActive", e.target.checked)}
                  />
                  <label htmlFor={`active-${post.id}`} className="text-sm text-ink-navy">
                    Published (visible on the public Blog page)
                  </label>
                </div>
                <Button variant="primary" size="sm" onClick={() => setEditingId(null)}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="mt-2">
                <p className="font-body font-medium text-ink-navy">{post.title}</p>
                <p className="mt-1 text-sm text-slate line-clamp-2">{post.excerpt}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
