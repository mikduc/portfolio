import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactProps {
  onOpenJournal: () => void;
}

function Contact({ onOpenJournal }: ContactProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    mode: "onBlur",
  });

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.08,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55 },
    },
  };

  const socialIconMotion = {
    whileHover: { scale: 1.06, rotate: 10 },
    whileTap: { scale: 0.95 },
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/mikduc",
      icon: "github",
      color: "hover:text-primary dark:hover:text-darkLight",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/ryanfang01",
      icon: "linkedin",
      color: "hover:text-primary dark:hover:text-darkLight",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/mik.duc",
      icon: "instagram",
      color: "hover:text-primary dark:hover:text-darkLight",
    },
  ];

  return (
    <motion.section
      id="contact"
      className="min-h-screen snap-start flex items-center bg-light dark:bg-darkPrimary py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.h2
          className="section-title"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>

        <motion.div
          className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="card dark:bg-darkSecondary rounded-2xl border border-secondary/20 dark:border-darkTertiary/30">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-primary dark:text-darkLight mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-secondary dark:border-darkTertiary bg-light dark:bg-darkSecondary text-primary dark:text-darkLight focus:outline-none focus:border-accent transition-colors"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-primary dark:text-darkLight mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-secondary dark:border-darkTertiary bg-light dark:bg-darkSecondary text-primary dark:text-darkLight focus:outline-none focus:border-accent transition-colors"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-semibold text-primary dark:text-darkLight mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Your message here..."
                  rows={5}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-secondary dark:border-darkTertiary bg-light dark:bg-darkSecondary text-primary dark:text-darkLight focus:outline-none focus:border-accent transition-colors resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-tertiary dark:bg-darkTertiary/30 text-primary dark:text-darkLight rounded-lg"
                >
                  ✓ Message sent successfully!
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Social Links & Info */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-primary dark:text-darkLight mb-4">
                Let's Connect
              </h3>
              <p className="text-secondary dark:text-darkTertiary mb-8 leading-relaxed">
                Got an idea, a project, or a weird bug story? Send me a message or ping me on social. I am always happy to chat, collaborate, or trade debugging war stories.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-5">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.35 }}
                  whileHover={socialIconMotion.whileHover}
                  whileTap={socialIconMotion.whileTap}
                  className={`p-3 rounded-xl bg-secondary/10 dark:bg-darkTertiary/20 text-darkPrimary dark:text-darkLight text-4xl transition-colors duration-200 ${link.color}`}
                  title={link.name}
                >
                  {link.icon === "github" && (
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                  {link.icon === "linkedin" && (
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                    </svg>
                  )}
                  {link.icon === "instagram" && (
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.75a4 4 0 0 0-4 4v8.5a4 4 0 0 0 4 4h8.5a4 4 0 0 0 4-4v-8.5a4 4 0 0 0-4-4h-8.5Zm4.25 2.75a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 1.75a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Zm5.88-.86a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0Z" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>

            {/* Email */}
            <div>
              <h4 className="text-sm font-semibold text-secondary dark:text-darkTertiary mb-2">
                Or email me directly:
              </h4>
              <a
                href="mailto:ryanfang01@gmail.com"
                className="text-lg text-primary dark:text-darkLight font-semibold hover:opacity-80 transition-opacity"
              >
                ryanfang01@gmail.com
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3 text-center mt-16 pt-8 border-t border-secondary/40 dark:border-darkTertiary/50"
        >
          <p className="text-secondary dark:text-darkTertiary">
            © {new Date().getFullYear()} Ryan Fang.
          </p>
          <button
            type="button"
            onClick={onOpenJournal}
            title="Private journal"
            aria-label="Open private journal"
            className="h-3 w-3 rounded-full bg-secondary/60 dark:bg-darkTertiary/70 hover:bg-accent dark:hover:bg-darkAccent transition-colors"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Contact;
