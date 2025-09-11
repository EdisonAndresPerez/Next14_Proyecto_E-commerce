'use client'

import Link from 'next/link'
import { IoSearchOutline, IoCartOutline, RxHamburgerMenu  } from '@/components/icons'
import { titleFont } from '@/config/fonts'
import { useUIStore } from '@/store'
import { useCartStore } from '@/store/cart/cart-store'
import { usePathname } from 'next/navigation'

export const TopMenu = () => {
  const openSideMenu = useUIStore(state => state.openSideMenu)
  const getTotalItems = useCartStore(state => state.getTotalItems)
  const totalItems = getTotalItems()
  const pathname = usePathname()

  return (
    <nav className='flex px-5 justify-between items-center w-full bg-white hover:shadow-xl  transition-shadow duration-300 '>
      {/* Logo */}
      <div>
        <Link href='/'>
          <span className={`${titleFont.className} antialiased font-bold`}>
            WordGames
          </span>
          <span> | Shop </span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className='hidden sm:block'>
        <Link
          href='/category/ps5'
          className={`
        relative m-2 p-2 rounded-md transition-all
        hover:bg-gray-100
        after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black
        after:transition-all after:duration-300
        ${pathname === '/category/ps5' ? 'after:w-full' : 'after:w-0'}
      `}
        >
          Games PS5
        </Link>

        <Link
          href='/category/ps2'
          className={`
        relative m-2 p-2 rounded-md transition-all
        hover:bg-gray-100
        after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black
        after:transition-all after:duration-300
        ${pathname === '/category/ps2' ? 'after:w-full' : 'after:w-0'}
      `}
        >
          Games PS2
        </Link>

        <Link
           href='/category/ps1'
          className={`
        relative m-2 p-2 rounded-md transition-all
        hover:bg-gray-100
        after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black
        after:transition-all after:duration-300
        ${pathname === '/category/ps1' ? 'after:w-full' : 'after:w-0'}
      `}
        >
          Games PS1
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className='flex items-center'>
        <Link href='/search' className='mx-2'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>

        <Link href='/cart' className='mx-2'>
          <div className='relative'>
            {totalItems > 0 && (
              <span className='absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white'>
                {totalItems}
              </span>
            )}
            <IoCartOutline className='w-5 h-5' />
          </div>
        </Link>

        <button
          onClick={openSideMenu}
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          <RxHamburgerMenu className='w-5 h-5 inline' />
        </button>
      </div>
    </nav>
  )
}
