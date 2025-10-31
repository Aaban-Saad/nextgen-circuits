"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Facebook } from "lucide-react"
import Image from "next/image"

export default function AboutTeam() {
  const teamMembers = [
    {
      name: "Fahim Faisal Rafi",
      role: "Founder & CEO",
      image: "https://via.placeholder.com/300x300?text=Fahim+Rafi",
      delay: 0.1,
    },
    {
      name: "Priya Sharma",
      role: "Technical Director",
      image: "https://via.placeholder.com/300x300?text=Priya+Sharma",
      delay: 0.2,
    },
    {
      name: "Kamal Hassan",
      role: "Operations Manager",
      image: "https://via.placeholder.com/300x300?text=Kamal+Hassan",
      delay: 0.3,
    },
    {
      name: "Nadia Islam",
      role: "Customer Support Lead",
      image: "https://via.placeholder.com/300x300?text=Nadia+Islam",
      delay: 0.4,
    },
  ]

  return (
    <section className="py-12 mb-20">
      <div className="max-w-6xl mx-auto px-4 text-left">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-[#0066cc] mb-4 relative inline-block pb-4 group"
        >
          Meet Our Team
          <span
            className="absolute bottom-0 left-0 h-[3px] w-20 transition-all duration-300 hover:w-48 group-hover:w-48"
            style={{ background: "linear-gradient(to right, #00ccff, #e1f5fe)" }}
          />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[#333] max-w-3xl text-lg leading-relaxed"
        >
          The passionate individuals behind Nextgen Circuits who work tirelessly to serve our community:
        </motion.p>

        <div className="team-grid grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-10 mt-10">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: member.delay }}
              viewport={{ once: true }}
              className="team-member relative rounded-sm bg-white  overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.08)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.12)] group"
            >
              {/* Bottom line */}
              <div
                className="absolute bottom-0 z-40 left-0 w-0 h-[3px] group-hover:w-full transition-all duration-300"
                style={{ background: "linear-gradient(to right, #00ccff, #e1f5fe)" }}
              />

              {/* Image */}
              <div className="member-image relative h-[280px] overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                  unoptimized
                />
              </div>

              {/* Info */}
              <div className="member-info p-[25px_20px] text-center relative bg-white group-hover:bg-[#f9f9f9] transition-colors duration-300">
                <h3 className="text-[1.4rem] mb-2 text-[#004080] transition-colors duration-300 group-hover:text-[#00ccff]">
                  {member.name}
                </h3>
                <p className="text-[#00ccff] mb-4 font-medium text-[1.05rem]">{member.role}</p>

                <div className="social-links flex justify-center gap-4">
                  {[
                    { Icon: Linkedin, name: 'linkedin', color: '#0A66C2' },
                    { Icon: Twitter, name: 'twitter', color: '#1DA1F2' },
                    { Icon: Facebook, name: 'facebook', color: '#1877F2' },
                  ].map(({ Icon, name, color }, i) => (
                    <a
                      key={i}
                      href="#"
                      aria-label={name}
                      className={
                        `w-9 h-9 rounded-full flex items-center justify-center bg-white text-[#777] shadow-[0_5px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[3px]`
                      }
                      // apply hover color via inline style on hover using onMouseEnter/Leave would be heavier; instead use inline style for boxShadow and set CSS variable for hover
                      style={{}}
                    >
                      <Icon className="w-4 h-4" style={{ transition: 'color .2s ease' }} />
                      <style jsx>{`
                        a[aria-label=${name}]:hover { background: ${color}; color: #fff; }
                        a[aria-label=${name}]:hover svg { color: #fff; }
                      `}</style>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
