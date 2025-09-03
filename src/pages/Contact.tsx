import React, { useState, useEffect } from "react";
import NavigationHeader from "@/components/navigation/NavigationHeader";
import { useUser } from "@/context/UserContext";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaGlobe,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import FooterSection from "@/components/layouts/FooterSection";
import { ContentRepository } from "@/repository/ContentRepository";
import LoadingOverlay from "@/components/common/LoadingOverlay";

interface Office {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  working_hours: string;
  is_primary?: boolean;
}

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

interface Website {
  name: string;
  url: string;
}
interface ContactSectionMetadata {
  offices?: Office[];
  social_links?: SocialLinks;
  websites?: Website[];
}

interface ContactContent {
  section: {
    id: string;
    title: string;
    content: string;
    metadata?: ContactSectionMetadata;
  } | null;
  items: any[];
}

const Contact: React.FC = () => {
  const { user } = useUser();
  const [contactContent, setContactContent] = useState<ContactContent>({
    section: null,
    items: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContactContent();
  }, []);

  const loadContactContent = async () => {
    try {
      setLoading(true);
      const data = await ContentRepository.getContentBySection("contact-page");
      setContactContent(data);
    } catch (error) {
      console.error("Failed to load contact content:", error);

      setContactContent({ section: null, items: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <NavigationHeader isAuthenticated={!!user} />

      <LoadingOverlay
        isLoading={loading}
        message="Loading contact information..."
      />

      {/* Hero Section */}
      <div className="relative w-full h-80 flex items-center justify-center bg-gradient-to-r from-green-900/90 to-green-700/80">
        <div className="absolute inset-0 bg-[url('/images/background1.png')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-extrabold mb-2 drop-shadow-lg">
            {contactContent.section?.title || "Contact Us"}
          </h1>
          <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto drop-shadow">
            {contactContent.section?.content ||
              "We're here to help you connect, exhibit, and grow at the Lagos International Trade Fair."}
          </p>
        </div>
      </div>

      {/* Main Content Card */}
      <section className="max-w-2xl mx-auto -mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12 relative z-20">
        {/* Multiple Office Information */}
        {contactContent.section?.metadata?.offices &&
        contactContent.section.metadata.offices.length > 0 ? (
          <div className="mb-8">
            {contactContent.section.metadata.offices.map(
              (office: Office, index: number) => (
                <div
                  key={office.id}
                  className={`mb-8 ${index > 0 ? "border-t pt-8" : ""}`}
                >
                  <h2 className="text-2xl font-semibold mb-2 text-green-800 flex items-center">
                    {office.name}
                    {office.is_primary && (
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Primary
                      </span>
                    )}
                  </h2>
                  <div className="mb-4">
                    <p className="mb-1 whitespace-pre-line">{office.address}</p>
                  </div>
                  <div className="mb-8 flex flex-col md:flex-row gap-8">
                    <div className="flex-1 flex items-start gap-4">
                      <FaPhoneAlt className="text-green-700 text-2xl mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Phone</h3>
                        <p className="mb-2">{office.phone}</p>
                      </div>
                    </div>
                    <div className="flex-1 flex items-start gap-4">
                      <FaEnvelope className="text-red-500 text-2xl mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Email</h3>
                        <a
                          href={`mailto:${office.email}`}
                          className="text-primary-700 hover:underline"
                        >
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  {office.working_hours && (
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">
                        Working Hours
                      </h3>
                      <p>{office.working_hours}</p>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        ) : null}

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Social Media</h3>
          <div className="flex items-center gap-6">
            <a
              href={
                contactContent.section?.metadata?.social_links?.facebook ||
                "https://facebook.com/lagosinternationaltradefair"
              }
              className="flex items-center gap-2 text-blue-700 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-2xl" /> Facebook
            </a>
            <a
              href={
                contactContent.section?.metadata?.social_links?.instagram ||
                "https://instagram.com/lagosinternationaltradefair"
              }
              className="flex items-center gap-2 text-pink-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-2xl" /> Instagram
            </a>
          </div>
          <div className="flex items-center gap-6 mt-2">
            <a
              href={
                contactContent.section?.metadata?.social_links?.twitter ||
                "https://instagram.com/lagos_tradefair"
              }
              className="flex items-center gap-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="text-2xl" /> X.com
            </a>
            <a
              href={
                contactContent.section?.metadata?.social_links?.linkedin ||
                "https://linkedin.com"
              }
              className="flex items-center gap-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-2xl" /> Linkendin
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Websites</h3>
          <div className="flex flex-col gap-2">
            {(contactContent.section?.metadata?.websites?.length
              ? contactContent.section.metadata.websites
              : [
                  {
                    name: "www.lagosinternationaltradefair.com",
                    url: "https://www.lagosinternationaltradefair.com",
                  },
                  {
                    name: "www.lagoschamber.com",
                    url: "https://www.lagoschamber.com",
                  },
                ]
            ).map((site, index) => (
              <a
                key={index}
                href={site.url}
                className="flex items-center gap-2 text-green-700 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe className="text-2xl" /> {site.name}
              </a>
            ))}
          </div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
};

export default Contact;
