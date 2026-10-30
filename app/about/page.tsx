"use client";

import {
  AnimatedSection,
  AnimatedHeading,
  AnimatedDivider,
  AnimatedCard,
} from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePreviewVisible } from "@/components/preview-bridge";
import { readSiteContent, useSiteContent } from "@/hooks/useSiteContent";

export default function AboutPage() {
  const heroContent = useSiteContent("about_hero");
  const mission = useSiteContent("about_mission");
  const vision = useSiteContent("about_vision");
  const values = useSiteContent("about_values");
  const journey = useSiteContent("about_journey");
  const cta = useSiteContent("about_cta");
  const showHero = usePreviewVisible("about_hero");
  const showMission = usePreviewVisible("about_mission");
  const showVision = usePreviewVisible("about_vision");
  const showValues = usePreviewVisible("about_values");
  const showJourney = usePreviewVisible("about_journey");
  const showCta = usePreviewVisible("about_cta");
  const heroImage = readSiteContent(heroContent, "background_image_url", "");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {showHero && <section
        className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-[#004987] to-[#0070b8] text-white"
        style={heroImage ? { backgroundImage: `url("${encodeURI(heroImage)}")`, backgroundPosition: "center", backgroundSize: "cover" } : undefined}
      >
        {heroImage && <div className="absolute inset-0 bg-[#00345f]/65" />}
        <div className="container relative z-10 px-4 md:px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <AnimatedHeading className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {readSiteContent(heroContent, "title", "About Blockchain Pioneer Student Club")}
            </AnimatedHeading>
            <AnimatedDivider className="w-24 h-1 bg-white mx-auto mb-8" />
            <p className="text-lg md:text-xl text-white/90 mb-8">
              {readSiteContent(heroContent, "subtitle", "A pioneering student club advancing Blockchain in Vietnam")}
            </p>
            <AnimatedSection delay={0.3}>
              <Link href="/join">
                <Button
                  size="lg"
                  className="bg-white text-[#004987] hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                >
                  {readSiteContent(heroContent, "cta_label", "Join us")}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </section>}

      {/* Mission & Vision */}
      {(showMission || showVision) && <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {showMission && <AnimatedSection direction="left">
              <AnimatedHeading className="text-2xl md:text-3xl font-bold text-[#004987] mb-4">
                {readSiteContent(mission, "title", "Our mission")}
              </AnimatedHeading>
              <AnimatedDivider />
              <p className="text-gray-600 mb-6">
                {readSiteContent(
                  mission,
                  "description",
                  "We are committed to building a high-quality learning and hands-on environment for students to master Blockchain. Through diverse activities, we aim to foster a vibrant, creative student community ready to embrace emerging technologies.",
                )}
              </p>
              <ul className="space-y-3">
                {[
                  readSiteContent(mission, "item_1", "Training from fundamentals to advanced Blockchain"),
                  readSiteContent(mission, "item_2", "Organizing events and practical workshops"),
                  readSiteContent(mission, "item_3", "Connecting with businesses and industry experts"),
                  readSiteContent(mission, "item_4", "Creating internship and job opportunities"),
                ].map((item, index) => (
                  <AnimatedSection key={index} delay={0.2 * index}>
                    <li className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-[#004987] rounded-full mr-3" />
                      {item}
                    </li>
                  </AnimatedSection>
                ))}
              </ul>
            </AnimatedSection>}

            {showVision && <AnimatedSection direction="right">
              <AnimatedHeading className="text-2xl md:text-3xl font-bold text-[#004987] mb-4">
                {readSiteContent(vision, "title", "Vision")}
              </AnimatedHeading>
              <AnimatedDivider />
              <p className="text-gray-600 mb-6">
                {readSiteContent(
                  vision,
                  "description",
                  "To become a leading Blockchain club in Vietnam's student community, nurturing young talents in Blockchain and Web3.",
                )}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: readSiteContent(vision, "stat_1_number", "100+"), label: readSiteContent(vision, "stat_1_label", "Members") },
                  { number: readSiteContent(vision, "stat_2_number", "50+"), label: readSiteContent(vision, "stat_2_label", "Events") },
                  { number: readSiteContent(vision, "stat_3_number", "20+"), label: readSiteContent(vision, "stat_3_label", "Partners") },
                  { number: readSiteContent(vision, "stat_4_number", "20+"), label: readSiteContent(vision, "stat_4_label", "Projects") },
                ].map((stat, index) => (
                  <AnimatedCard
                    key={index}
                    index={index}
                    className="bg-gray-50 p-4 rounded-lg text-center"
                  >
                    <div className="text-2xl font-bold text-[#004987] mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </AnimatedCard>
                ))}
              </div>
            </AnimatedSection>}
          </div>
        </div>
      </section>}

      {/* Core Values */}
      {showValues && <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <AnimatedSection className="text-center mb-12">
            <AnimatedHeading className="text-2xl md:text-3xl font-bold text-[#004987] mb-4">
              {readSiteContent(values, "title", "Core values")}
            </AnimatedHeading>
            <AnimatedDivider />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: readSiteContent(values, "value_1_title", "Learning"),
                description:
                  readSiteContent(values, "value_1_description", "Continuous learning and updating knowledge of Blockchain & Web3"),
              },
              {
                icon: Users,
                title: readSiteContent(values, "value_2_title", "Community"),
                description: readSiteContent(values, "value_2_description", "Building a supportive and collaborative environment"),
              },
              {
                icon: Award,
                title: readSiteContent(values, "value_3_title", "Creativity"),
                description: readSiteContent(values, "value_3_description", "Encouraging innovative thinking and creative solutions"),
              },
            ].map((value, index) => (
              <AnimatedCard
                key={index}
                index={index}
                className="bg-white p-6 rounded-lg text-center"
              >
                <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-[#004987]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#004987]">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>}

      {/* Timeline */}
      {showJourney && <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <AnimatedSection className="text-center mb-12">
            <AnimatedHeading className="text-2xl md:text-3xl font-bold text-[#004987] mb-4">
              {readSiteContent(journey, "title", "Our journey")}
            </AnimatedHeading>
            <AnimatedDivider />
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#004987]/20" />
            {[
              {
                year: readSiteContent(journey, "item_1_year", "04/2024"),
                title: readSiteContent(journey, "item_1_title", "Club founded"),
                description: readSiteContent(journey, "item_1_description", "Blockchain UTC Club officially founded"),
              },
              {
                year: readSiteContent(journey, "item_2_year", "06/2024"),
                title: readSiteContent(journey, "item_2_title", "Seminar"),
                description: readSiteContent(journey, "item_2_description", "Student entrepreneurship on Blockchain"),
              },
              {
                year: readSiteContent(journey, "item_3_year", "06/2024"),
                title: readSiteContent(journey, "item_3_title", "Workshop"),
                description: readSiteContent(journey, "item_3_description", "Web3 technology and Decentralized Identity (DID)"),
              },
              {
                year: readSiteContent(journey, "item_4_year", "07/2024"),
                title: readSiteContent(journey, "item_4_title", "Cardano Blockchain Hackathon 2024"),
                description: readSiteContent(journey, "item_4_description", "The club's first hackathon co-organized with experts from the Cardano community"),
              },
              {
                year: readSiteContent(journey, "item_5_year", "10/2024"),
                title: readSiteContent(journey, "item_5_title", "Course organized"),
                description: readSiteContent(journey, "item_5_description", "Intensive Cardano Blockchain course — grasp Blockchain in 9 sessions"),
              },
              {
                year: readSiteContent(journey, "item_6_year", "03/2025"),
                title: readSiteContent(journey, "item_6_title", "Cardano Blockchain Hackathon 2025"),
                description: readSiteContent(journey, "item_6_description", "Hackathon for developers and students with 350,000,000 VND in prizes — a playground for creativity where ideas become reality"),
              },
            ].map((milestone, index) => (
              <AnimatedSection
                key={index}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={0.2 * index}
                className="relative mb-12"
              >
                <div
                  className={`flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="md:w-1/2">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="text-sm text-[#004987] font-semibold mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>}

      {/* CTA Section */}
      {showCta && <section className="py-16 md:py-24 bg-gradient-to-r from-[#004987] to-[#0070b8] text-white">
        <div className="container px-4 md:px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <AnimatedHeading className="text-2xl md:text-3xl font-bold mb-4">
              {readSiteContent(cta, "title", "Ready to join us?")}
            </AnimatedHeading>
            <p className="text-lg mb-8 text-white/90">
              {readSiteContent(cta, "description", "Become part of the Blockchain UTC community and help us build the future of Blockchain technology")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={readSiteContent(cta, "primary_url", "/join")}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-[#004987] hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                >
                  {readSiteContent(cta, "primary_label", "Join the club")}
                </Button>
              </Link>
              <Link href={readSiteContent(cta, "secondary_url", "/contact")}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-[#004987] hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                >
                  {readSiteContent(cta, "secondary_label", "Contact us")}
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>}
    </div>
  );
}
