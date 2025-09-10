import { titleFont } from '@/config/fonts'
import { IoGameControllerSharp } from 'react-icons/io5'

interface Props {
  title: string
  subtitle?: string
  className?: string
  showIcon?: boolean
}

export const Title = ({
  title,
  subtitle,
  className,
  showIcon = true
}: Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1
        className={`${titleFont.className} flex gap-2 items-center justify-center antialiased text-4xl font-semibold my-7`}
      >
        <span>{title}</span>
        {showIcon && (
          <span className='flex items-center'>
            <IoGameControllerSharp />
          </span>
        )}
      </h1>

      {subtitle && <h3 className='text-xl mb-5'>{subtitle}</h3>}
    </div>
  )
}
