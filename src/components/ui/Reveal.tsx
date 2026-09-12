import React from 'react';
import { motion } from 'framer-motion';

/** 스크롤 진입 시 한 번만 페이드업. 과한 모션은 두지 않는다. */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    className="reveal"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export default Reveal;
