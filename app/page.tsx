'use client';
import { motion } from 'framer-motion';
import { Accessibility, ArrowRight, Check, Zap, Shield, Users, Globe } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Accessibility className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold">Javari Accessibility</span>
          </div>
          <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Get Started</a>
        </div>
      </nav>
      
      <section className="pt-32 pb-20 px-4 text-center">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-6">
            <Zap className="w-4 h-4" /> AI-Powered Platform
          </span>
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Javari Accessibility</h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Powered by Javari AI. Part of the CR AudioViz AI ecosystem.
          </p>
          <a href="https://javariai.com" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold">
            Get Started <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>
      
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: 'Secure', desc: 'Enterprise-grade security' },
            { icon: Users, title: 'Collaborative', desc: 'Work together seamlessly' },
            { icon: Globe, title: 'Accessible', desc: 'Available everywhere' },
          ].map((f, i) => (
            <motion.div key={f.title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{delay:i*0.1}} className="bg-white p-6 rounded-xl border">
              <f.icon className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      <footer className="py-12 px-4 bg-slate-900 text-center">
        <p className="text-slate-400">© 2025 CR AudioViz AI, LLC. All rights reserved.</p>
      </footer>
    </div>
  );
}
