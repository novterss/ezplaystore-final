'use client';

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import MusicPlayer from "../components/MusicPlayer";
import TrustStats from "../components/TrustStats";
import Features from "../components/Features";
import { premiumProducts, freeResources } from "../data/products";
import { Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Image from 'next/image';

import TabbedFreeZone from "../components/TabbedFreeZone";

import HowToBuy from "../components/HowToBuy";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import Modal from "../components/Modal";
import { useState } from "react";
import { Info } from "lucide-react";

export default function Home() {
  const [isSysReqOpen, setIsSysReqOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* System Requirements Modal */}
      <Modal
        isOpen={isSysReqOpen}
        onClose={() => setIsSysReqOpen(false)}
        title="ความต้องการระบบ (System Req)"
      >
        <ul className="space-y-3">

          <li className="flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-red-300">Secure Boot: Must be OFF</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-red-300">Antivirus: Must be OFF</span>
          </li>
        </ul>
      </Modal>
      <Navbar />
      <Hero />
      <TrustStats />

      {/* HOW TO BUY */}
      <HowToBuy />

      {/* SHOP SECTION */}
      <section id="shop" className="container mx-auto px-4 py-24 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Premium Shop
            </span>
          </h2>
          <p className="text-xl text-gray-400">สินค้าคุณภาพสูง รับประกันความพึงพอใจ</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {premiumProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all group relative shadow-xl"
            >
              {/* Product Image */}
              <div className="relative h-48 w-full bg-black/40 overflow-hidden">
                {product.image ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-800" />
                )}

                {product.tag && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm ${product.tag === 'Best Seller' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' :
                      'bg-green-500/20 text-green-500 border border-green-500/50'
                      }`}>
                      {product.tag}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white max-w-[60%]">{product.name}</h3>
                  <div className="flex flex-col items-end">
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through decoration-red-500/50">
                        ฿{product.originalPrice}
                      </span>
                    )}
                    <div className="text-2xl font-bold text-primary drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]">
                      ฿{product.price}
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 mb-8 leading-relaxed h-24 overflow-hidden">
                  {product.description}
                </p>

                <a
                  href="https://discord.gg/YMZXUhuMcV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(88,101,242,0.3)] hover:shadow-[0_0_25px_rgba(88,101,242,0.5)] group-hover:scale-[1.02]"
                >
                  <img src="/images/discord.jpg" alt="Discord" className="w-[24px] h-[24px] rounded-full" />
                  เปิด Ticket สั่งซื้อ
                </a>

                {/* System Req Button (Hidden for Steam Unlocker) */}
                {product.id !== 1 && (
                  <button
                    onClick={() => setIsSysReqOpen(true)}
                    className="w-full mt-3 py-2 text-sm text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2 hover:bg-white/5 rounded-lg"
                  >
                    <Info className="w-4 h-4" />
                    ℹ️ Requirements
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <TabbedFreeZone />

      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
      <MusicPlayer />
    </main>
  );
}
