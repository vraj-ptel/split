import Link from "next/link";
import { ArrowRight, Star, Users, Shield, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FEATURES, STEPS, TESTIMONIALS } from "@/lib/landing";

export default function LandingPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* ───── Hero ───── */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center space-y-8 pt-20">
          {/* Trust indicators */}
          {/* <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Bank-level security</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full">
              <Users className="h-4 w-4 text-green-600" />
              <span>10M+ users</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full">
              <Star className="h-4 w-4 text-green-600" />
              <span>4.9/5 rating</span>
            </div>
          </div> */}

          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 px-4 py-2 text-sm font-medium animate-pulse">
            <Sparkles className="h-4 w-4 mr-2" />
            split your expence with ai insights
          </Badge>

          <h1 className="gradient-title mx-auto max-w-6xl text-5xl font-bold md:text-7xl lg:text-8xl leading-tight">
            Manage your expences
            <span className="block text-green-600 animate-fade-in-up"> with ai insights</span>
          </h1>

          <p className="mx-auto max-w-[800px] text-gray-600 text-lg md:text-xl leading-relaxed">
            Revolutionize how you handle shared expenses with our AI-powered platform.
            Scan receipts, track spending, and settle up instantly with friends and family.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <Link href="/dashboard">
                Start 
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
          </div>

          
        </div>

        {/* Hero Image */}
        <div className="relative z-10 container mx-auto max-w-6xl px-4 mt-16 mb-20">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden group-hover:shadow-3xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              <Image
                src="/split.jpg"
                width={1200}
                height={600}
                alt="Split App Dashboard"
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                priority
              />
              
            </div>
          </div>
        </div>
      </section>

      {/* ───── Features ───── */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div id="features" className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="gradient-title text-4xl md:text-5xl font-bold mb-6">
              Everything you need to split expenses
            </h2>
            <p className="mx-auto max-w-[800px] text-gray-600 text-lg md:text-xl leading-relaxed">
              Our AI-powered platform provides cutting-edge tools to make expense sharing
              effortless, secure, and intelligent.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {FEATURES.map(({ title, Icon, bg, color, description }, index) => (
              <Card
                key={title}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="relative p-8 text-center space-y-4">
                  <div className={`inline-flex rounded-2xl p-4 ${bg} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className={`h-8 w-8 ${color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {description}
                  </p>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature highlight */}
          {/* <div className="mt-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                🎯 99.7% Accuracy in Bill Scanning
              </h3>
              <p className="text-green-100 text-lg mb-6 max-w-2xl mx-auto">
                Our advanced AI technology ensures precise expense detection and categorization,
                saving you time and eliminating manual errors.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Try AI Scanning Now
              </Button>
            </div>
          </div> */}
        </div>
      </section>

      {/* ───── How it works ───── */}
      <section id="how-it-works" className="py-24 bg-whiterelative overflow-hidden">
        <div className="container  flex items-center flex-col justify-center  mx-auto px-4 md:px-6 relative z-10">
          <Badge variant="outline" className="bg-green-100 text-green-700">
            How It Works
          </Badge>
          <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
            Splitting expenses has never been easier
          </h2>
          <p className="mx-auto mt-3  text-gray-500 md:text-md/relaxed">
            Follow these simple steps to start tracking and splitting expenses
            with friends.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {STEPS.map(({ label, title, description }) => (
              <div key={label} className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-600">
                  {label}
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-gray-500 text-center">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Testimonials ───── */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge variant="outline" className="bg-green-100 text-green-700">
            Testimonials
          </Badge>
          <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
            What our users are saying
          </h2>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map(({ quote, name, role, image }) => (
              <Card key={name} className="flex flex-col justify-between">
                <CardContent className="space-y-4 p-6">
                  <p className="text-gray-500">{quote}</p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      {/* Placeholder avatar */}
                      <AvatarImage src={image} alt={name} />
                      <AvatarFallback className="uppercase">
                        {name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-medium">{name}</p>
                      <p className="text-sm text-muted-foreground">{role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Call‑to‑Action ───── */}
      <section className="py-20 gradient">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-white">
            Ready to simplify expense sharing?
          </h2>
          <p className="mx-auto max-w-[600px] text-green-100 md:text-xl/relaxed">
            Join thousands of users who have made splitting expenses
            stress‑free.
          </p>
          <Button asChild size="lg" className="bg-green-800 hover:opacity-90">
            <Link href="/dashboard">
              
                Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            
            </Link>
          </Button>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="border-t bg-gray-50 py-12 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Split. All rights reserved.
      </footer>
    </div>
  );
}
