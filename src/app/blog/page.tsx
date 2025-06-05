// src/app/blog/page.tsx
import { Column, Heading } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { blog, person } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";
import BlogClient from "@/components/blog/BlogClient";
import { getPosts } from "@/app/utils/utils"; // fs OK here

export async function generateMetadata() {
  return Meta.generate({
    title: `Blog | ${person.name}`,
    description: blog.description,
    baseURL: baseURL,
    image: `${baseURL}/images/logo.png`,
    path: blog.path,
  });
}

export default async function Blog() {
  const allPosts = getPosts(['src', 'app', 'blog', 'posts']);

  return (
    <Column maxWidth="s">
      <Schema
        as="blog"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`${baseURL}/images/logo.png`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {blog.title}
      </Heading>

      <BlogClient allPosts={allPosts} />
    </Column>
  );
}
