"use client";

import BlogList from "@/components/blog/BlogList";

const BlogSection = () => {
  return (
    <section id="blog" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <BlogList fullPage={false} />
      </div>
    </section>
  );
};

export default BlogSection;
