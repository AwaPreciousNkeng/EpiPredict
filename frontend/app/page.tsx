"use client";

import Link from "next/link";
import { 
  Activity, 
  Shield, 
  BarChart3, 
  MapPin, 
  ArrowRight, 
  Users,
  AlertTriangle,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
    let currentYear: number = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-600">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Epi<span className="text-blue-600">Predict</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">About</a>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-50" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
                <Activity className="h-3 w-3" /> Advanced Epidemic Surveillance
              </span>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
                Predicting Outbreaks <br /> 
                <span className="text-blue-600">Saving Communities.</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed">
                An intelligent early warning system that combines environmental data and clinical reporting to predict and prevent epidemic outbreaks before they escalate.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group">
                  Start Free Trial <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                  Watch Demo
                </button>
              </div>
            </motion.div>

            {/* Dashboard Preview Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-20 relative"
            >
              <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden max-w-5xl mx-auto p-2">
                <div className="bg-slate-50 rounded-xl p-4 lg:p-8 flex flex-col gap-6">
                   <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <div className="h-6 w-1/2 bg-slate-200 rounded-md" />
                   </div>
                   <div className="grid grid-cols-3 gap-4 h-64 lg:h-96">
                      <div className="col-span-2 bg-white rounded-lg border border-slate-100 shadow-sm p-4">
                        <div className="flex justify-between mb-4">
                           <div className="h-4 w-32 bg-slate-100 rounded" />
                           <div className="h-4 w-20 bg-slate-100 rounded" />
                        </div>
                        <div className="w-full h-full flex items-end gap-2 pb-8">
                           {[40, 60, 45, 80, 55, 70, 90, 65, 50, 85].map((h, i) => (
                             <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
                                className="flex-1 bg-blue-500/20 border-t-2 border-blue-500 rounded-t-sm" 
                             />
                           ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                         <div className="flex-1 bg-blue-600 rounded-lg p-4 text-white">
                            <div className="text-xs opacity-80 uppercase font-bold tracking-wider mb-2">Active Alerts</div>
                            <div className="text-3xl font-bold">12</div>
                            <div className="mt-2 h-1 w-full bg-white/20 rounded overflow-hidden">
                               <div className="h-full w-2/3 bg-white" />
                            </div>
                         </div>
                         <div className="flex-1 bg-white rounded-lg border border-slate-100 shadow-sm p-4">
                            <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">Reports Today</div>
                            <div className="text-3xl font-bold text-slate-800">148</div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-3">Core Capabilities</h2>
              <p className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Everything you need for rapid response.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Environmental Monitoring",
                  description: "Real-time tracking of water sources, sanitation hazards, and weather patterns that favor disease spread.",
                  icon: <Globe className="h-6 w-6" />,
                  color: "blue"
                },
                {
                  title: "Clinical Reporting",
                  description: "Secure, intuitive interface for clinicians to report symptoms and confirmed cases immediately.",
                  icon: <Activity className="h-6 w-6" />,
                  color: "blue"
                },
                {
                  title: "Predictive Analytics",
                  description: "AI-driven risk assessment that identifies high-probability outbreak zones up to 2 weeks in advance.",
                  icon: <BarChart3 className="h-6 w-6" />,
                  color: "blue"
                },
                {
                   title: "Instant Alerts",
                   description: "Automatic notifications sent to stakeholders when risk thresholds are crossed in specific districts.",
                   icon: <AlertTriangle className="h-6 w-6" />,
                   color: "blue"
                },
                {
                  title: "Resource Allocation",
                  description: "Visual heatmaps to help health departments deploy resources exactly where they are needed most.",
                  icon: <MapPin className="h-6 w-6" />,
                  color: "blue"
                },
                {
                  title: "Secure Collaboration",
                  description: "Role-based access ensures sensitive health data is handled with the highest level of privacy and compliance.",
                  icon: <Users className="h-6 w-6" />,
                  color: "blue"
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all hover:shadow-xl group">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-blue-600">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                 {[
                   { label: "Predictive Accuracy", value: "94%" },
                   { label: "Districts Monitored", value: "120+" },
                   { label: "Response Time Redux", value: "65%" },
                   { label: "Lives Impacted", value: "2M+" }
                 ].map((stat, i) => (
                   <div key={i} className="text-white">
                      <div className="text-4xl font-extrabold mb-2">{stat.value}</div>
                      <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Ready to secure your community?</h2>
              <p className="text-xl text-slate-600 mb-10">Join over 50 health departments using EpiPredict to build more resilient healthcare systems.</p>
              <Link href="/register" className="inline-flex items-center gap-2 px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200">
                Create Free Account <ArrowRight className="h-5 w-5" />
              </Link>
           </div>
        </section>
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold tracking-tight text-slate-900">EpiPredict</span>
            </div>
            <p className="text-slate-500 text-sm">© {currentYear} EpiPredict Surveillance Systems. All rights reserved.</p>
            <div className="flex gap-6">
               <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">Privacy</a>
               <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">Terms</a>
               <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
