import dynamic from "next/dynamic";
import { MDXRemote } from "next-mdx-remote/rsc";

import { loadBlogPost } from "@/helpers/file-helpers";
import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet";
import Spinner from "@/components/Spinner";

const DivisionGroupsDemo = dynamic(
  () => import("@/components/DivisionGroupsDemo"),
  { loading: Spinner }
);

import styles from "./postSlug.module.css";

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const { frontmatter } = await loadBlogPost(postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;
  const { frontmatter, content } = await loadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
