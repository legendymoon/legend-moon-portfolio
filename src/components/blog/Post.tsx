"use client";

import { Column, Flex, Heading, SmartImage, SmartLink, Tag, Text } from '@/once-ui/components';
import styles from './Posts.module.scss';
import { formatDate } from '@/app/utils/formatDate';

interface PostProps {
    post: {
      metadata: {
        tags?: string[];
        [key: string]: any;
      };
      [key: string]: any;
    };
    thumbnail: boolean;
    direction?: "row" | "column";
}
  
export default function Post({ post, thumbnail, direction }: PostProps) {
    return (
        <SmartLink
            fillWidth
            unstyled
            style={{ borderRadius: 'var(--radius-l)' }}
            key={post.slug}
            href={`/blog/${post.slug}`}>
            <Flex
                position="relative"
                transition="micro-medium"
                direction={direction}
                radius="l"
                className={styles.hover}
                mobileDirection="column"
                fillWidth>
                {post.metadata.image && thumbnail && (
                    <SmartImage
                        priority
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 640px"
                        border="neutral-alpha-weak"
                        cursor="interactive"
                        radius="l"
                        src={post.metadata.image}
                        alt={'Thumbnail of ' + post.metadata.title}
                        aspectRatio="16 / 9"
                    />
                )}
                <Column
                    position="relative"
                    fillWidth gap="4"
                    padding="24"
                    vertical="center">
                    <Heading
                        as="h2"
                        variant="heading-strong-l"
                        wrap="balance">
                        {post.metadata.title}
                    </Heading>
                    <Text
                        variant="label-default-s"
                        onBackground="neutral-weak">
                        {formatDate(post.metadata.publishedAt, false)}
                    </Text>
                    <Flex fillWidth gap="4">
                    {Array.isArray(post.metadata.tags) &&
                    post.metadata.tags.map((tag: string) => (
                        <Tag key={tag} className="mt-12" label={tag} variant="neutral" />
                    ))}
                    </Flex>
                </Column>
            </Flex>
        </SmartLink>
    );
}