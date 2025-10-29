"use client"

import { motion } from "framer-motion"

export default function AboutHero() {
  return (
    <section
      className="relative overflow-hidden py-20 text-center shadow-lg rounded-b-3xl mb-16"
      style={{
        background: "linear-gradient(135deg, #e1f5fe 0%, #e1f5fe 100%)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full z-0"
        style={{ background: "rgba(52, 152, 219, 0.1)" }}
      />
      <div
        className="absolute bottom-[-50px] left-[-50px] w-[150px] h-[150px] rounded-full z-0"
        style={{ background: "rgba(52, 152, 219, 0.1)" }}
      />

      <div className="container relative z-10 mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            color: "#004080",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
          }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          About Nextgen Circuits
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            color: "#333",
          }}
          className="text-lg md:text-xl max-w-2xl mx-auto"
        >
          Your trusted partner for quality electronic components and solutions in Bangladesh
        </motion.p>
      </div>
    </section>
  )
}
