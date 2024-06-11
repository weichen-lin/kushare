import LineLogin from './line'
import clsx from 'clsx'

export default function Intergrations() {
  return (
    <div
      className={clsx(
        'w-full flex flex-col gap-y-4 items-center justify-center border-[1px] border-slate-200 rounded-md py-4 mt-8',
        'md:border-none md:justify-start md:w-[400px] md:items-start md:mt-4',
      )}
    >
      <div className='text-slate-500 text-xl md:text-slate-400'>No integrations yet</div>
      <div className='text-slate-300 text-md'>Install one of our recommended options below.</div>
      <LineLogin />
    </div>
  )
}
