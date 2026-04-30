'use client'

import { useState } from 'react'

interface MQTTMessage {
  topic: string
  payload: string
  qos: 0 | 1 | 2
  timestamp: Date
  from: string
}

interface Subscription {
  topic: string
  qos: 0 | 1 | 2
}

export default function MQTTSimulator() {
  const [messages, setMessages] = useState<MQTTMessage[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { topic: 'home/temperature', qos: 0 },
    { topic: 'home/humidity', qos: 0 },
  ])
  const [publishTopic, setPublishTopic] = useState('home/temperature')
  const [publishPayload, setPublishPayload] = useState('{"value": 25.5}')
  const [publishQos, setPublishQos] = useState<0 | 1 | 2>(0)
  const [subscribeTopic, setSubscribeTopic] = useState('')
  const [subscribeQos, setSubscribeQos] = useState<0 | 1 | 2>(0)
  const [clientId] = useState(`Client-${Math.random().toString(36).substr(2, 6)}`)

  const publish = () => {
    const newMessage: MQTTMessage = {
      topic: publishTopic,
      payload: publishPayload,
      qos: publishQos,
      timestamp: new Date(),
      from: clientId
    }
    setMessages(prev => [newMessage, ...prev].slice(0, 50))
  }

  const subscribe = () => {
    if (subscribeTopic && !subscriptions.find(s => s.topic === subscribeTopic)) {
      setSubscriptions(prev => [...prev, { topic: subscribeTopic, qos: subscribeQos }])
      setSubscribeTopic('')
    }
  }

  const unsubscribe = (topic: string) => {
    setSubscriptions(prev => prev.filter(s => s.topic !== topic))
  }

  const getQosLabel = (qos: number) => {
    switch (qos) {
      case 0: return 'QoS 0 - 最多一次'
      case 1: return 'QoS 1 - 至少一次'
      case 2: return 'QoS 2 - 恰好一次'
    }
  }

  const isTopicMatch = (messageTopic: string, subTopic: string) => {
    const msgParts = messageTopic.split('/')
    const subParts = subTopic.split('/')
    
    for (let i = 0; i < subParts.length; i++) {
      if (subParts[i] === '#') return true
      if (subParts[i] !== '+' && subParts[i] !== msgParts[i]) return false
    }
    return msgParts.length === subParts.length
  }

  const getReceivedMessages = () => {
    return messages.filter(msg => 
      subscriptions.some(sub => isTopicMatch(msg.topic, sub.topic))
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">📨 实验说明</h3>
        <p className="text-sm text-blue-800">
          本模拟器演示MQTT协议的发布/订阅机制。先订阅Topic，然后发布消息，
          观察订阅者如何收到匹配Topic的消息。支持通配符"+"（单级）和"#"（多级）。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-4">📤 发布消息</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Topic</label>
                <input
                  type="text"
                  value={publishTopic}
                  onChange={(e) => setPublishTopic(e.target.value)}
                  placeholder="如: home/temperature"
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">消息内容（JSON格式）</label>
                <textarea
                  value={publishPayload}
                  onChange={(e) => setPublishPayload(e.target.value)}
                  placeholder='如: {"value": 25.5}'
                  className="input-field text-sm min-h-[80px]"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">QoS等级</label>
                <select
                  value={publishQos}
                  onChange={(e) => setPublishQos(Number(e.target.value) as 0|1|2)}
                  className="select-field text-sm"
                >
                  <option value={0}>QoS 0 - 最多一次（可能丢失）</option>
                  <option value={1}>QoS 1 - 至少一次（可能重复）</option>
                  <option value={2}>QoS 2 - 恰好一次（不丢不重）</option>
                </select>
              </div>
              <button onClick={publish} className="btn-primary w-full">
                📤 发布消息
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">📥 订阅Topic</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Topic（支持通配符）</label>
                <input
                  type="text"
                  value={subscribeTopic}
                  onChange={(e) => setSubscribeTopic(e.target.value)}
                  placeholder="如: home/# 或 home/+"
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">QoS等级</label>
                <select
                  value={subscribeQos}
                  onChange={(e) => setSubscribeQos(Number(e.target.value) as 0|1|2)}
                  className="select-field text-sm"
                >
                  <option value={0}>QoS 0</option>
                  <option value={1}>QoS 1</option>
                  <option value={2}>QoS 2</option>
                </select>
              </div>
              <button onClick={subscribe} className="btn-success w-full">
                📥 订阅
              </button>
            </div>

            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium text-gray-700 mb-2">当前订阅列表</h4>
              {subscriptions.length > 0 ? (
                <div className="space-y-2">
                  {subscriptions.map((sub, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <span className="font-mono text-sm text-primary-700">{sub.topic}</span>
                        <span className="text-xs text-gray-500 ml-2">({getQosLabel(sub.qos)})</span>
                      </div>
                      <button
                        onClick={() => unsubscribe(sub.topic)}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        取消订阅
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">暂无订阅</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">📨 已发布消息</h3>
              <span className="text-sm text-gray-500">共 {messages.length} 条</span>
            </div>
            {messages.length > 0 ? (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {messages.map((msg, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm text-primary-700">{msg.topic}</span>
                      <span className="text-xs text-gray-500">{msg.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <div className="bg-gray-900 text-green-400 p-2 rounded text-sm font-mono overflow-x-auto">
                      {msg.payload}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{getQosLabel(msg.qos)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">暂无消息</p>
            )}
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">📬 收到的消息</h3>
              <span className="text-sm text-gray-500">共 {getReceivedMessages().length} 条</span>
            </div>
            {getReceivedMessages().length > 0 ? (
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {getReceivedMessages().map((msg, idx) => (
                  <div key={idx} className="p-2 bg-green-50 border border-green-200 rounded">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-green-700">{msg.topic}</span>
                      <span className="text-xs text-gray-500">{msg.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <div className="text-sm text-gray-700 mt-1">{msg.payload}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">订阅匹配的Topic后会收到消息</p>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-3">💡 通配符说明</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-gray-50 rounded">
            <div className="font-medium text-gray-900 mb-1">单级通配符 +</div>
            <p className="text-gray-600">匹配单级Topic。如 home/+ 匹配 home/temperature，但不匹配 home/living/temperature</p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <div className="font-medium text-gray-900 mb-1">多级通配符 #</div>
            <p className="text-gray-600">匹配多级Topic。如 home/# 匹配 home/temperature 和 home/living/temperature</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-3">💡 实验思考</h3>
        <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
          <li>发布/订阅模式相比请求/响应模式有什么优势？（提示：解耦、一对多）</li>
          <li>QoS 0、1、2分别适用于什么场景？（提示：考虑数据重要性和网络质量）</li>
          <li>Topic设计应该遵循什么原则？（提示：层级、可扩展性）</li>
        </ol>
      </div>
    </div>
  )
}
