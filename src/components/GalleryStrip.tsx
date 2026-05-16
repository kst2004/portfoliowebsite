'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { galleryItems } from '../data/content';
import Reveal from './Reveal';

export default function GalleryStrip() {
  return (
    <section className="section-shell pt-8">
      <div className="page-shell space-y-10">
        <Reveal>
          <p className="kicker">Gallery Strip</p>
          <h2 className="section-heading">A quick visual reel across logos, posters, renders, and interface frames.</h2>
        </Reveal>

        <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
          <div className="flex min-w-max gap-4">
            {galleryItems.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.08}>
                <motion.figure
                  className="glass-panel w-[270px] overflow-hidden"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="overflow-hidden">
                    <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.9 }}>
                      <Image
                        src={item.image}
                        alt={item.label}
                        width={500}
                        height={360}
                        className="h-44 w-full object-cover grayscale transition duration-700 hover:grayscale-0"
                      />
                    </motion.div>
                  </div>
                  <figcaption className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-accentSoft/68">
                    {item.label}
                  </figcaption>
                </motion.figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
