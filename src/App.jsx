import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Legend } from "recharts";

const ADMIN_PASSWORD = "LaChorale2026";
const MCB_JUICE_NUMBER = "+230 5252 0000";
const SITE_NAME = "La Grande Chorale de Sainte Croix";

const DEFAULT_EVENTS = [
  {
    id: "e1",
    title: "Concert de Printemps",
    date: "2026-03-21",
    time: "19:00",
    venue: "Église Sainte Croix",
    price: 25,
    capacity: 200,
    sold: 78,
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1400&q=80",
    description: "Une soirée enchanteresse avec La Grande Chorale de Sainte Croix — chants sacrés et pièces contemporaines.",
  },
  {
    id: "e2",
    title: "Soirée Gospel",
    date: "2026-06-12",
    time: "18:30",
    venue: "Salle des Fêtes",
    price: 18,
    capacity: 150,
    sold: 52,
    cover: "https://images.unsplash.com/photo-1508970436-6c0c4e8ad178?w=1400&q=80",
    description: "Gospel joyeux, pleine énergie et émotion. Préparez vos mains à applaudir !",
  },
  {
    id: "e3",
    title: "Messe Chantée — Noël",
    date: "2025-12-24",
    time: "20:00",
    venue: "Cathédrale",
    price: 0,
    capacity: 500,
    sold: 320,
    cover: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1400&q=80",
    description: "Célébration de Noël avec la chorale — entrée libre (inscription recommandée).",
  },
];

function loadOrDefault(key, def) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return def;
    return JSON.parse(raw);
  } catch (e) {
    return def;
  }
}

function save(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
}

function formatDate(dateString) {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}

function IconLogo() {
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-rose-500 flex items-center justify-center text-white font-semibold shadow-lg">LC</div>
  );
}

function Nav({ onAdmin }) {
  return (
    <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <IconLogo />
        <div>
          <div className="text-lg font-semibold">La Grande Chorale</div>
          <div className="text-xs -mt-1 text-slate-400">de Sainte Croix</div>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <a href="#home" className="hover:underline">Accueil</a>
        <a href="#events" className="hover:underline">Événements</a>
        <a href="#about" className="hover:underline">À propos</a>
        <button onClick={onAdmin} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm shadow hover:bg-indigo-700">Espace Admin</button>
      </div>
      <div className="md:hidden">
        <button className="px-3 py-2 rounded-lg bg-slate-100">Menu</button>
      </div>
    </nav>
  );
}

function Hero({ subtitle }) {
  return (
    <header id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-rose-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
        <AnimatePresence>
          <motion.div className="absolute top-10 left-8 w-56 h-56 rounded-full mix-blend-multiply filter blur-3xl opacity-30" style={{ background: "linear-gradient(135deg, #7c3aed, #fb7185)" }} animate={{ x: [0, 40, -20, 0], y: [0, -10, 10, 0], scale: [1, 1.05, 0.95, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute bottom-16 right-8 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-30" style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)" }} animate={{ x: [0, -30, 20, 0], y: [0, 5, -5, 0], rotate: [0, 4, -2, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
        </AnimatePresence>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{SITE_NAME}</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-xl">{subtitle}</p>
            <div className="mt-8 flex gap-4">
              <a href="#events" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700">Voir les événements</a>
              <a href="#about" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-200">En savoir plus</a>
            </div>
            <div className="mt-6 text-sm text-slate-500">Billetterie en ligne • Places restantes visibles en temps réel</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="w-full">
            <div className="rounded-2xl shadow-xl overflow-hidden">
              <img src={DEFAULT_EVENTS[0].cover} alt="hero" className="w-full h-64 object-cover" />
              <div className="p-6 bg-white">
                <div className="text-sm text-slate-400">Prochain événement</div>
                <div className="mt-1 font-semibold text-lg">{DEFAULT_EVENTS[0].title}</div>
                <div className="text-sm text-slate-500">{formatDate(DEFAULT_EVENTS[0].date)} · {DEFAULT_EVENTS[0].time}</div>
                <div className="mt-3 text-slate-600 text-sm">{DEFAULT_EVENTS[0].description}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

function AvailabilityBar({ capacity = 0, sold = 0 }) {
  const safeCapacity = Math.max(0, Number(capacity) || 0);
  const safeSold = Math.max(0, Number(sold) || 0);
  const pct = safeCapacity > 0 ? Math.min(100, Math.round((safeSold / safeCapacity) * 100)) : 0;
  const remaining = Math.max(0, safeCapacity - safeSold);
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-slate-500">
        <span>{safeSold} vendus</span>
        <span>{remaining} restants</span>
      </div>
  ... (truncated)