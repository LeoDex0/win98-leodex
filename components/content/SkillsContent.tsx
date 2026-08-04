import { STACK } from '@/lib/data'
import { IconFileExe, IconFileDll } from '@/components/icons/PixelIcons'

export default function SkillsContent() {
  return (
    <div>
      <div className="grid grid-cols-[24px_1fr_110px] gap-x-2 border-b border-black/30 pb-1 text-[12px] font-bold px-1">
        <span />
        <span>Name</span>
        <span>Type</span>
      </div>
      <div className="sunken-panel max-h-64 overflow-auto mt-1">
        <table className="w-full text-[12px]">
          <tbody>
            {STACK.map((item) => (
              <tr key={item.name} className="align-top">
                <td className="w-7 py-1 pl-1">
                  {item.icon === 'exe' ? <IconFileExe size={16} /> : <IconFileDll size={16} />}
                </td>
                <td className="py-1 pr-2">
                  <div className="font-bold">{item.name}</div>
                  <div className="text-black/70">{item.comment}</div>
                </td>
                <td className="py-1 text-black/70">{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
