import React from "react";
import { motion } from "framer-motion";

interface ProjectProps {
  url?: string;
  img?: string;
  name: string;
  description: string;
  tags?: string[];
}

const Project: React.FC<ProjectProps> = ({
  url,
  img,
  name,
  description,
  tags = [],
}) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={() => url && window.open(url, "_blank")}
      className={`card flex flex-col h-full dark:bg-darkSecondary ${url ? "cursor-pointer" : ""}`}
    >
      {/* Project Image */}
      {img && (
        <motion.div
          className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-secondary to-accent dark:from-darkSecondary dark:to-darkSecondary"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </motion.div>
      )}

      {/* Project Title */}
      <h3 className="text-2xl font-bold text-primary dark:text-darkLight mb-2">
        {name}
      </h3>

      {/* Project Description */}
      <p className="text-secondary dark:text-darkLight flex-grow mb-4 line-clamp-3">
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-accent dark:bg-darkTertiary text-light dark:text-darkLight rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA Button */}
      {url && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary w-full mt-auto"
        >
          View Project →
        </motion.button>
      )}
    </motion.div>
  );
};

export default Project;
