import RSS from "rss";

import { BLOG_TITLE, BLOG_DESCRIPTION } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";

export async function GET() {
  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
  });
  const blogPosts = await getBlogPostList();
  blogPosts.forEach(({ slug, title, abstract, publishedOn }) => {
    feed.item({
      title,
      description: abstract,
      date: publishedOn,
      url: `https://example.com/${slug}`,
    });
  });
  const xml = feed.xml({ indent: true });

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
