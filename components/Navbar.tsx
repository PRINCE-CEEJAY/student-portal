'use client';
import { Show, SignInButton, UserButton } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { SidebarState } from '@/types/navbar';

export default function Navbar({ isOpen, setIsOpen }: SidebarState) {
  return (
    <nav
      className={`flex h-12 items-center bg-white/30 backdrop-blur-md shadow-lg px-2 `}
    >
      <section className='flex items-center space-x-4 cursor-pointer'>
        {isOpen ? (
          <X onClick={() => setIsOpen(false)} />
        ) : (
          <Menu onClick={() => setIsOpen(true)} />
        )}
      </section>
      <section
        className={`flex ml-4 flex-1 justify-between items-center ${isOpen && 'hidden'}`}
      >
        <Link
          href={'/'}
          className='flex items-center gap-2'
        >
          <Image
            src={'/unn-logo.png'}
            alt='unn-logo'
            width={40}
            height={40}
          />
          <h1 className='fancy-text'>University of Nigeria</h1>
        </Link>

        <header className='flex justify-end items-center p-4 gap-4 h-16'>
          <Show when='signed-out'>
            <SignInButton mode='modal'>
              <Button
                className={'cursor-pointer'}
                size={'lg'}
              >
                Login
              </Button>
            </SignInButton>
          </Show>
          <Show when='signed-in'>
            <UserButton />
          </Show>
        </header>
      </section>
    </nav>
  );
}
