import { useEffect } from "react";
import PropTypes from "prop-types";

const SEOHead = ({
  title = "Learn Solids - Interactive Geometry Education Platform",
  description = "Learn geometric solids interactively with NaucSeTelesa. Educational platform featuring 3D visualizations, interactive tasks, and comprehensive learning materials.",
  keywords = "geometry, geometric solids, education, learning, 3D shapes, interactive learning, mathematics",
  image = "/cube.webp",
  url = "https://naucsetelesa.vercel.app/",
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    }

    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }

    // Update Open Graph description
    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    }

    // Update Open Graph image
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute("content", image);
    }

    // Update Open Graph URL
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", url);
    }

    // Update Twitter title
    const twitterTitle = document.querySelector(
      'meta[property="twitter:title"]'
    );
    if (twitterTitle) {
      twitterTitle.setAttribute("content", title);
    }

    // Update Twitter description
    const twitterDescription = document.querySelector(
      'meta[property="twitter:description"]'
    );
    if (twitterDescription) {
      twitterDescription.setAttribute("content", description);
    }

    // Update Twitter image
    const twitterImage = document.querySelector(
      'meta[property="twitter:image"]'
    );
    if (twitterImage) {
      twitterImage.setAttribute("content", image);
    }

    // Update Twitter URL
    const twitterUrl = document.querySelector('meta[property="twitter:url"]');
    if (twitterUrl) {
      twitterUrl.setAttribute("content", url);
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", url);
    }
  }, [title, description, keywords, image, url]);

  return null; // This component doesn't render anything
};

SEOHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};

export default SEOHead;
