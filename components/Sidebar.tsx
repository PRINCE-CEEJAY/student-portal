'use client';
import { motion } from 'motion/react';
import Link from 'next/link';

const routes = [
  {
    id: 1,
    name: 'Home',
    to: '/',
  },
  {
    id: 2,
    name: 'Bursary Collections',
    to: '/collections',
  },
  {
    id: 3,
    name: 'Postgraduate Portal',
    to: '/postgraduate',
  },
  {
    id: 4,
    name: 'Apply for UG Hostel',
    to: '/ug-hostel-application',
  },
];

export default function Sidebar() {
  return (
    <motion.div
      className={`text-black flex flex-col p-2  `}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {routes.map((route) => (
        <Link
          href={route.to}
          key={route.id}
          className='text-slate-600 font-semibold  my-4'
        >
          {route.name}
        </Link>
      ))}
    </motion.div>
  );
}
