'use client'

import { useState, useEffect, useRef } from 'react'

interface SensorData {
  timestamp: number
  temperature: number
  humidity: number
  light: number
}

export default function SensorSimulator() {
  const [isRunning, setIsRunning] = useState(false)
  const [temperature, setTemperature] = useState(25)
  const [humidity, setHumidity] = useState(60)
  const [light, setLight] = useState(500)
  const [dataHistory, setDataHistory] = useState<SensorData[]>([])
  const [tempThreshold, setTempThreshold] = useState(30)
  const [interval, setIntervalTime] = useState(1)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        const newTemp = temperature + (Math.random() - 0.5) * 2
        const newHumidity = humidity + (Math.random() - 0.5) * 5
        const newLight = light + (Math.random() - 0.5) * 100
        
        setTemperature(Number(newTemp.toFixed(1)))
        setHumidity(Math.max(0, Math.min(100, Number(newHumidity.toFixed(1)))))
        setLight(Math.max(0, Number(newLight.toFixed(1))))
        
        setDataHistory(prev => {
          const newData = [...prev, {
            timestamp: Date.now(),
            temperature: newTemp,
            humidity: newHumidity,
            light: newLight
          }]
          return newData.slice(-50)
        })
      }, interval * 1000)
      
      return () => clearInterval(timer)
    }
  }, [isRunning, temperature, humidity, light, interval])

  useEffect(() => {
    if (canvasRef.current && dataHistory.length > 1) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const padding = 40
      const width = canvas.width - padding * 2
      const height = canvas.height - padding * 2
      
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 1
      for (let i = 0; i <= 5; i++) {
        const y = padding + (height / 5) * i
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(canvas.width - padding, y)
        ctx.stroke()
      }
      
      const drawLine = (data: number[], color: string, min: number, max: number) => {
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.beginPath()
        
        data.forEach((value, index) => {
          const x = padding + (width / (data.length - 1)) * index
          const normalizedValue = Math.max(0, Math.min(1, (value - min) / (max - min)))
          const y = padding + height - normalizedValue * height
          
          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })
        
        ctx.stroke()
      }
      
      const tempData = dataHistory.map(d => d.temperature)
      const humidityData = dataHistory.map(d => d.humidity)
      
      drawLine(tempData, '#ef4444', 15, 35)
      drawLine(humidityData, '#3b82f6', 40, 80)
      
      ctx.fillStyle = '#374151'
      ctx.font = '12px sans-serif'
      ctx.fillText('温度(°C)', padding, 20)
      ctx.fillText('湿度(%)', canvas.width - padding - 50, 20)
      
      ctx.fillText('35', 5, padding + 10)
      ctx.fillText('25', 5, padding + height / 2)
      ctx.fillText('15', 5, padding + height)
    }
  }, [dataHistory])

  const exportData = () => {
    const csv = '时间,温度(°C),湿度(%),光照(Lux)\n' +
      dataHistory.map(d => 
        `${new Date(d.timestamp).toLocaleString()},${d.temperature.toFixed(1)},${d.humidity.toFixed(1)},${d.light.toFixed(1)}`
      ).join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `sensor_data_${new Date().toISOString().slice(0,10)}.csv`
    link.click()
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">🌡️ 实验说明</h3>
        <p className="text-sm text-blue-800">
          本模拟器模拟温度、湿度、光照三种传感器数据采集。点击"运行仿真"开始采集数据，
          观察数据实时变化曲线。可设置采样间隔和温度报警阈值。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-3">⚙️ 参数设置</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">采样间隔（秒）</label>
                <select 
                  value={interval} 
                  onChange={(e) => setInterval(Number(e.target.value))}
                  className="select-field text-sm"
                >
                  <option value={1}>1秒</option>
                  <option value={2}>2秒</option>
                  <option value={5}>5秒</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">温度报警阈值（°C）</label>
                <input 
                  type="number" 
                  value={tempThreshold}
                  onChange={(e) => setTempThreshold(Number(e.target.value))}
                  className="input-field text-sm"
                  min="20"
                  max="40"
                />
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-3">📊 实时数据</h3>
            <div className="space-y-3">
              <div className={`p-3 rounded-lg ${temperature > tempThreshold ? 'bg-red-100 border-2 border-red-300' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">🌡️ 温度</span>
                  {temperature > tempThreshold && <span className="badge-danger text-xs">报警</span>}
                </div>
                <div className="text-2xl font-bold text-gray-900">{temperature.toFixed(1)}°C</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">💧 湿度</div>
                <div className="text-2xl font-bold text-gray-900">{humidity.toFixed(1)}%</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">☀️ 光照</div>
                <div className="text-2xl font-bold text-gray-900">{light.toFixed(0)} Lux</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">📈 数据曲线</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={isRunning ? 'btn-danger btn-sm' : 'btn-success btn-sm'}
                >
                  {isRunning ? '⏸️ 暂停' : '▶️ 运行'}
                </button>
                <button 
                  onClick={() => { setIsRunning(false); setDataHistory([]) }}
                  className="btn-secondary btn-sm"
                >
                  🔄 重置
                </button>
                <button 
                  onClick={exportData}
                  disabled={dataHistory.length === 0}
                  className="btn-secondary btn-sm disabled:opacity-50"
                >
                  📥 导出CSV
                </button>
              </div>
            </div>
            
            <div className="bg-white border rounded-lg p-2">
              <canvas 
                ref={canvasRef} 
                width={600} 
                height={300}
                className="w-full"
              />
            </div>

            <div className="mt-4 text-sm text-gray-500">
              已采集 {dataHistory.length} 个数据点 | 
              温度范围: 15-35°C | 
              湿度范围: 40-80%
            </div>
          </div>

          <div className="card mt-4">
            <h3 className="font-semibold mb-3">💡 实验思考</h3>
            <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
              <li>传感器数据为什么会有波动？（提示：环境因素、测量误差）</li>
              <li>采样间隔设为多少合适？为什么？（提示：考虑数据变化速度）</li>
              <li>温度阈值设为多少报警比较合理？（提示：考虑实际应用场景）</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
