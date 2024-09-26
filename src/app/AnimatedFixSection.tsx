'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

// Safe stringify function
const safeStringify = (obj:any) => {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular]';
      }
      seen.add(value);
    }
    return value;
  });
};

const AnimatedFixSection = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const items = [
    { title: "Smartphones", gradient: "from-blue-500 to-purple-500", icon: "📱" },
    { title: "Laptops", gradient: "from-green-500 to-yellow-500", icon: "💻" },
    { title: "Printers", gradient: "from-red-500 to-orange-500", icon: "🖨️" },
  ];

  return (
    <div className="bg-[#212121] my-10 py-16 px-10 sm:px-12 md:px-14 lg:px-20">
      <motion.h1 
        className="text-white text-center text-5xl font-semibold mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        We can help you fix
      </motion.h1>
      <motion.div 
        className="grid md:grid-cols-3 gap-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item:any, index:any) => (
          <Link href={"/query"} key={safeStringify(item)}>
            <motion.div 
              className="bg-[#3c3c3c] h-[267px] rounded-3xl flex flex-col justify-center items-center overflow-hidden relative group cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredItem(index)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-30`}
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <motion.span
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 * index, type: "spring", stiffness: 200 }}
              >
                {item.icon}
              </motion.span>
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-3xl lg:text-4xl xl:text-5xl text-[#B7B7B7] z-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 * index, type: "spring", stiffness: 100 }}
              >
                {item.title}
              </motion.h1>
              <AnimatePresence>
                {hoveredItem === index && (
                  <motion.p
                    className="text-[#B7B7B7] mt-2 text-center px-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    Click to get help with your {item.title.toLowerCase()}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        ))}
        <motion.div 
          className="bg-[#3c3c3c] h-[267px] rounded-3xl flex justify-center items-center md:col-span-3 overflow-hidden"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <motion.h1 
            className="text-5xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl text-[#878787] text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001
              }
            }}
          >
            More coming soon
          </motion.h1>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedFixSection;