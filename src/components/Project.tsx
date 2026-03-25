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
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={() => url && window.open(url, "_blank")}
      className={`card group flex flex-col h-full rounded-2xl border border-secondary/15 dark:border-darkTertiary/25 dark:bg-darkSecondary ${url ? "cursor-pointer" : ""}`}
    >
      {/* Project Image */}
      {img && (
        <motion.div
          className="relative w-full h-52 mb-5 rounded-xl overflow-hidden bg-gradient-to-br from-secondary/20 to-accent/30 dark:from-darkSecondary dark:to-darkPrimary"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={img}
            alt={name}
            className="w-full h-full object-contain p-4"
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
      <p className="text-secondary dark:text-darkLight flex-grow mb-5 leading-relaxed">
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-secondary/15 dark:bg-darkTertiary/25 text-primary dark:text-darkLight rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA Button */}
      {url && (
        <div className="mt-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full"
          >
            View Project
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default React.memo(Project);
