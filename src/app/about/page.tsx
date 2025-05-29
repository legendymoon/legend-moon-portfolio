import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  SmartImage,
  Tag,
  Text,
  HoloFx,
  Fade,
  TiltFx,
  Badge,
  Row
} from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import TableOfContents from "@/components/about/TableOfContents";
import LifeIntro from "@/components/LifeIntro";
import WorkHistory from "@/components/WorkHistory";
import styles from "@/components/about/about.module.scss";
import { person, about, social } from "@/app/resources/content";
import React from "react";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `${baseURL}/images/logo.png`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`${baseURL}/images/logo.png`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Flex fillWidth mobileDirection="column" horizontal="center">
        <Column className={styles.blockAlign} flex={9}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            <Flex fillWidth mobileDirection="column">
              <Column fillWidth mobileDirection="column">
                <Heading className={styles.textAlign} variant="display-strong-m">
                  I'm {person.name}, a seasoned senior software engineer.
                </Heading>
                {social.length > 0 && (
                  <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" wrap horizontal="center" fitWidth data-border="rounded">
                    {social.map(
                      (item) =>
                        item.link && (
                            <React.Fragment key={item.name}>
                                <Badge href={item.link} key={item.name} id={item.name} title={item.name} icon={item.icon} background="brand-medium" textVariant="label-default-s" />
                            </React.Fragment>
                        ),
                    )}
                    {about.calendar.display && (
                      <Flex
                        fitWidth
                        border="brand-alpha-medium"
                        marginTop="20"
                        className={styles.blockAlign}
                        style={{
                          backdropFilter: "blur(var(--static-space-1))",
                        }}
                        background="brand-alpha-weak"
                        radius="full"
                        padding="4"
                        gap="8"
                        marginBottom="m"
                        vertical="center"
                      >
                        <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                        <Flex paddingX="8">Schedule a call</Flex>
                        <IconButton
                          href={about.calendar.link}
                          data-border="rounded"
                          variant="secondary"
                          icon="chevronRight"
                        />
                      </Flex>
                    )}
                  </Flex>
                )}
              </Column>
              <HoloFx
                aspectRatio={3 / 4}
                radius="l"
                shine={{
                  opacity: 30,
                  blending: "color-dodge",
                }}
                burn={{
                  opacity: 30,
                  blending: "color-dodge",
                }}
                texture={{
                  opacity: 10,
                  image: "/images/textures/foil.jpg",
                  blending: "color-dodge",
                }}
              >
                <Avatar src={person.avatar} size="xl" />
              </HoloFx>
            </Flex>
          </Column>

          {about.intro.display && (
            <Column
              fillWidth
              gap="m"
              marginBottom="xl"
              className="space-y-4"
              align="center"
            >
              <div
                className="relative w-full
                          before:absolute before:top-0 before:h-px before:bg-border-primary/50
                          before:-left-4 before:right-[-1rem]
                          md:before:-left-8 md:before:right-[-2rem]
                          lg:before:inset-x-0
                          after:absolute after:bottom-0 after:h-px after:bg-border-primary/50
                          after:-left-4 after:right-[-1rem]
                          md:after:-left-8 md:after:right-[-2rem]
                          lg:after:inset-x-0" 
              >
                <Text className="text-center text-[color:#82F1FC] w-full" style={{ color: '#10e9ff'}}>
                    Behind the Code
                </Text>
              </div>

              <div
                className="relative w-full
                          before:absolute before:top-0 before:h-px before:bg-border-primary/50
                          before:-left-4 before:right-[-1rem]
                          md:before:-left-8 md:before:right-[-2rem]
                          lg:before:inset-x-0
                          after:absolute after:bottom-0 after:h-px after:bg-border-primary/50
                          after:-left-4 after:right-[-1rem]
                          md:after:-left-8 md:after:right-[-2rem]
                          lg:after:inset-x-0"
              >
                <Heading
                  variant="display-strong-m"
                  className="mx-auto max-w-lg text-balance text-3xl font-medium
                            leading-[40px] tracking-tighter text-text-primary"
                >
                  The story behind my code and career.
                </Heading>
              </div>
            </Column>
          )}
          <Flex fillWidth horizontal="center">
            <LifeIntro/>
          </Flex>
          
          {about.intro.display && (
            <Column
              fillWidth
              gap="m"
              marginBottom="xl"
              className="space-y-4"
            >
              <div
                className="relative w-full
                          before:absolute before:top-0 before:h-px before:bg-border-primary/50
                          before:-left-4 before:right-[-1rem]
                          md:before:-left-8 md:before:right-[-2rem]
                          lg:before:inset-x-0
                          after:absolute after:bottom-0 after:h-px after:bg-border-primary/50
                          after:-left-4 after:right-[-1rem]
                          md:after:-left-8 md:after:right-[-2rem]
                          lg:after:inset-x-0" 
              >
                <Text className="text-center text-[color:#82F1FC] w-full" style={{ color: '#10e9ff'}}>
                  Professional Chapters
                </Text>
              </div>

              <div
                className="relative w-full
                          before:absolute before:top-0 before:h-px before:bg-border-primary/50
                          before:-left-4 before:right-[-1rem]
                          md:before:-left-8 md:before:right-[-2rem]
                          lg:before:inset-x-0
                          after:absolute after:bottom-0 after:h-px after:bg-border-primary/50
                          after:-left-4 after:right-[-1rem]
                          md:after:-left-8 md:after:right-[-2rem]
                          lg:after:inset-x-0"
              >
                <Heading
                  variant="display-strong-m"
                  className="mx-auto max-w-lg text-balance text-3xl font-medium
                            leading-[40px] tracking-tighter text-text-primary"
                >
                  My journey through roles and impact.
                </Heading>
              </div>
            </Column>
          )}
          <Flex fillWidth horizontal="center">
            <WorkHistory/>
          </Flex>

          {about.intro.display && (
            <Column
              fillWidth
              gap="m"
              marginBottom="xl"
              className="space-y-4"
              align="center"
            >
              <div
                className="relative w-full
                          before:absolute before:top-0 before:h-px before:bg-border-primary/50
                          before:-left-4 before:right-[-1rem]
                          md:before:-left-8 md:before:right-[-2rem]
                          lg:before:inset-x-0
                          after:absolute after:bottom-0 after:h-px after:bg-border-primary/50
                          after:-left-4 after:right-[-1rem]
                          md:after:-left-8 md:after:right-[-2rem]
                          lg:after:inset-x-0" 
              >
                <Text className="text-center text-[color:#82F1FC] w-full" style={{ color: '#10e9ff'}}>
                    Beyond the Code
                </Text>
              </div>

              <div
                className="relative w-full
                          before:absolute before:top-0 before:h-px before:bg-border-primary/50
                          before:-left-4 before:right-[-1rem]
                          md:before:-left-8 md:before:right-[-2rem]
                          lg:before:inset-x-0
                          after:absolute after:bottom-0 after:h-px after:bg-border-primary/50
                          after:-left-4 after:right-[-1rem]
                          md:after:-left-8 md:after:right-[-2rem]
                          lg:after:inset-x-0"
              >
                <Heading
                  variant="display-strong-m"
                  className="mx-auto max-w-lg text-balance text-3xl font-medium
                            leading-[40px] tracking-tighter text-text-primary"
                >
                  Exploring the things that fuel my curiosity outside the IDE.
                </Heading>
              </div>
            </Column>
          )}

          {about.intro.display && (
            <Flex fillWidth horizontal="center" gap="20" wrap>
              <Row fillWidth gap="16" mobileDirection="column">
                <Column fillWidth center>
                  {/* Hiking & Environment Lover */}
                  <TiltFx aspectRatio={3 / 4} radius="l" direction="column">
                    <SmartImage src="/images/selfie/hiking.jpg" alt="Hiking Enthusiast" />
                    <Column
                      align="center"
                      padding="m"
                      background="brand-alpha-weak"
                      radius="l"
                      style={{ marginTop: -4 }}
                    >
                      <Heading variant="display-strong-s">Hiking Enthusiast</Heading>
                      <Tag>Nature Explorer</Tag>
                    </Column>
                  </TiltFx>
                </Column>
                <Column fill gap="16">
                  <Row fill center>
                    {/* Pet Lover */}
                    <TiltFx aspectRatio={3 / 4} radius="l" direction="column">
                      <SmartImage src="/images/selfie/pet.jpeg" alt="Pet Lover" />
                      <Column
                        align="center"
                        padding="m"
                        background="brand-alpha-weak"
                        radius="l"
                        style={{ marginTop: -4 }}
                      >
                        <Heading variant="display-strong-s">Pet Lover</Heading>
                        <Tag>Dog Parent</Tag>
                      </Column>
                    </TiltFx>
                  </Row>
                  <Row fill center>
                    {/* Avid Reader */}
                    <TiltFx aspectRatio={3 / 4} radius="l" direction="column">
                      <SmartImage src="/images/illustrator/atomic_habits.jpg" alt="Avid Reader" />
                      <Column
                        align="center"
                        padding="m"
                        background="brand-alpha-weak"
                        radius="l"
                        style={{ marginTop: -4 }}
                      >
                        <Heading variant="display-strong-s">Avid Reader</Heading>
                        <Tag>Bookworm</Tag>
                      </Column>
                    </TiltFx>
                  </Row>
                </Column>
              </Row>
            </Flex>
          )}
        </Column>
      </Flex>
    </Column>
  );
}
