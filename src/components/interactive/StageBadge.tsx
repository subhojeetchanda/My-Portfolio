'use client';

import { motion } from 'framer-motion';

export default function StageBadge({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="absolute -top-4 left-0 bg-ink px-4 font-mono text-sm text-steel-light border border-steel"
    >
      {text}
    </motion.div>
  );
}
