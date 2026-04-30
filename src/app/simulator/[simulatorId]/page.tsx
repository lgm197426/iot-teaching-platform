'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { simulators } from '@/data/simulator'
import SensorSimulator from '@/components/simulator/SensorSimulator'
import RFIDSimulator from '@/components/simulator/RFIDSimulator'
import MQTTSimulator from '@/components/simulator/MQTTSimulator'
import SmartLockSimulator from '@/components/simulator/SmartLockSimulator'

export default function SimulatorDetailPage() {
  const params = useParams()
  const simulatorId = params.simulatorId as string
  const simulator = simulators.find(s => s.id === simulatorId)

  if (!simulator) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold mb-2">模拟器未找到</h1>
        <Link href="/simulator" className="btn-primary">返回模拟器列表</Link>
      </div>
    )
  }

  const renderSimulator = () => {
    switch (simulator.type) {
      case 'sensor':
        return <SensorSimulator />
      case 'rfid':
        return <RFIDSimulator />
      case 'mqtt':
        return <MQTTSimulator />
      case 'lock':
        return <SmartLockSimulator />
      default:
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">{simulator.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{simulator.name}</h3>
            <p className="text-gray-600 mb-4">{simulator.description}</p>
            <p className="text-gray-500">该模拟器正在开发中，敬请期待...</p>
          </div>
        )
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <nav className="text-sm text-gray-500 mb-2">
            <Link href="/simulator" className="hover:text-primary-600">实践模拟</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{simulator.name}</span>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-5xl">{simulator.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{simulator.name}</h1>
              <p className="text-gray-600">{simulator.description}</p>
            </div>
          </div>
        </div>
        <Link href="/simulator" className="btn-secondary">← 返回列表</Link>
      </div>

      <div className="card">
        {renderSimulator()}
      </div>

      <div className="mt-6 card">
        <details>
          <summary className="font-semibold cursor-pointer">📖 实验指导（点击展开）</summary>
          <div className="mt-4 prose prose-sm max-w-none">
            <ReactMarkdown>{simulator.guide}</ReactMarkdown>
          </div>
        </details>
      </div>
    </div>
  )
}
