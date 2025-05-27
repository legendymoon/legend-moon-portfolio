import { Column, Heading } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { about, person, work } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: `Projects | ${person.name}`,
    description: work.description,
    baseURL: baseURL,
    image: `${baseURL}/images/logo.png`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="s">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`${baseURL}/images/logo.png`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {work.title}
      </Heading>
      <Projects range={[5]} />
    </Column>
  );
}
