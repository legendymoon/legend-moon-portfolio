import { Grid } from '@/once-ui/components';
import Post from './Post';

interface PostsProps {
  posts: any[];
  range?: [number] | [number, number];
  columns?: '1' | '2' | '3';
  thumbnail?: boolean;
  direction?: 'row' | 'column';
  tag?: string;
}

export function Posts({
  posts,
  range,
  columns = '1',
  thumbnail = false,
  direction,
  tag,
}: PostsProps) {
  const sortedBlogs = posts.sort((a, b) =>
    new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );

  const filteredBlogs = tag
  ? sortedBlogs.filter((post) => post.metadata.tags.includes(tag))
  : sortedBlogs;


  const displayedBlogs = range
    ? filteredBlogs.slice(
        range[0] - 1,
        range.length === 2 ? range[1] : filteredBlogs.length
      )
    : filteredBlogs;

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid columns={columns} mobileColumns="1" fillWidth marginBottom="40" gap="12">
          {displayedBlogs.map((post) => (
            <Post
              key={post.slug}
              post={post}
              thumbnail={thumbnail}
              direction={direction}
            />
          ))}
        </Grid>
      )}
    </>
  );
}
