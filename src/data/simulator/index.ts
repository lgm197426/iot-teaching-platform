import { Simulator } from '@/types'

export const simulators: Simulator[] = [
  {
    id: 'sim-sensor',
    name: '传感器仿真器',
    type: 'sensor',
    description: '模拟温度、湿度、光照等传感器数据采集',
    icon: '🌡️',
    lessonIds: ['L06', 'L07', 'L12', 'L13', 'L14', 'L15'],
    devices: [
      {
        id: 'temp-sensor',
        name: '温度传感器',
        type: 'temperature',
        icon: '🌡️',
        parameters: [
          { key: 'min', label: '最小值', type: 'number', unit: '°C', min: -40, max: 80, step: 1, defaultValue: 0 },
          { key: 'max', label: '最大值', type: 'number', unit: '°C', min: -40, max: 80, step: 1, defaultValue: 50 },
          { key: 'current', label: '当前温度', type: 'number', unit: '°C', min: -40, max: 80, step: 0.1, defaultValue: 25 },
          { key: 'interval', label: '采样间隔', type: 'number', unit: '秒', min: 1, max: 60, step: 1, defaultValue: 1 }
        ],
        defaultValue: { min: 0, max: 50, current: 25, interval: 1 }
      },
      {
        id: 'humidity-sensor',
        name: '湿度传感器',
        type: 'humidity',
        icon: '💧',
        parameters: [
          { key: 'min', label: '最小值', type: 'number', unit: '%', min: 0, max: 100, step: 1, defaultValue: 20 },
          { key: 'max', label: '最大值', type: 'number', unit: '%', min: 0, max: 100, step: 1, defaultValue: 90 },
          { key: 'current', label: '当前湿度', type: 'number', unit: '%', min: 0, max: 100, step: 1, defaultValue: 60 },
          { key: 'interval', label: '采样间隔', type: 'number', unit: '秒', min: 1, max: 60, step: 1, defaultValue: 1 }
        ],
        defaultValue: { min: 20, max: 90, current: 60, interval: 1 }
      },
      {
        id: 'light-sensor',
        name: '光照传感器',
        type: 'light',
        icon: '☀️',
        parameters: [
          { key: 'min', label: '最小值', type: 'number', unit: 'Lux', min: 0, max: 10000, step: 10, defaultValue: 0 },
          { key: 'max', label: '最大值', type: 'number', unit: 'Lux', min: 0, max: 10000, step: 10, defaultValue: 1000 },
          { key: 'current', label: '当前光照', type: 'number', unit: 'Lux', min: 0, max: 10000, step: 10, defaultValue: 500 },
          { key: 'interval', label: '采样间隔', type: 'number', unit: '秒', min: 1, max: 60, step: 1, defaultValue: 1 }
        ],
        defaultValue: { min: 0, max: 1000, current: 500, interval: 1 }
      }
    ],
    guide: `
# 传感器仿真实验指导

## 实验目的
1. 理解传感器数据采集过程
2. 观察传感器数据的变化规律
3. 学会设置阈值触发联动

## 实验步骤

### 第一步：添加传感器设备
1. 在左侧设备列表中选择要添加的传感器
2. 点击"添加设备"按钮
3. 设备会出现在右侧仿真区域

### 第二步：配置传感器参数
1. 选中设备，在配置面板设置参数
2. 设置数据范围（最小值、最大值）
3. 设置采样间隔
4. 设置报警阈值

### 第三步：运行仿真
1. 点击"运行仿真"按钮开始数据采集
2. 观察实时数据曲线变化
3. 观察数据是否触发阈值报警

### 第四步：数据记录
1. 点击"暂停"可以暂停数据采集
2. 点击"导出数据"可以导出数据到CSV文件
3. 点击"保存报告"生成实验报告

## 实验思考
1. 传感器数据为什么会有波动？
2. 如何选择合适的采样间隔？
3. 阈值设置不合理会带来什么问题？
    `
  },
  {
    id: 'sim-rfid',
    name: 'RFID模拟器',
    type: 'rfid',
    description: '模拟RFID标签读取和门禁系统',
    icon: '🎴',
    lessonIds: ['L08'],
    devices: [
      {
        id: 'rfid-reader',
        name: 'RFID读写器',
        type: 'reader',
        icon: '📡',
        parameters: [
          { key: 'power', label: '电源状态', type: 'boolean', defaultValue: true },
          { key: 'range', label: '读取范围', type: 'number', unit: 'cm', min: 1, max: 100, step: 1, defaultValue: 10 }
        ],
        defaultValue: { power: true, range: 10 }
      },
      {
        id: 'rfid-tag',
        name: 'RFID标签',
        type: 'tag',
        icon: '🏷️',
        parameters: [
          { key: 'tagId', label: '标签ID', type: 'string', defaultValue: 'TAG001' },
          { key: 'type', label: '标签类型', type: 'select', options: [{ label: '有源标签', value: 'active' }, { label: '无源标签', value: 'passive' }], defaultValue: 'passive' }
        ],
        defaultValue: { tagId: 'TAG001', type: 'passive' }
      }
    ],
    guide: `
# RFID仿真实验指导

## 实验目的
1. 理解RFID的工作原理
2. 体验RFID标签的读取过程
3. 了解RFID在门禁系统中的应用

## 实验步骤

### 第一步：添加RFID标签
1. 在标签管理区点击"添加标签"
2. 输入标签ID（如：TAG001）
3. 选择标签类型（有源/无源）
4. 点击"确认"添加标签

### 第二步：模拟刷卡
1. 选择一个RFID标签
2. 点击"刷卡"按钮模拟刷卡操作
3. 观察读写器的读取结果
4. 查看读取日志

### 第三步：设置门禁规则
1. 进入门禁设置页面
2. 添加授权标签ID
3. 测试授权标签刷卡开门
4. 测试未授权标签刷卡拒绝

## 实验思考
1. 有源标签和无源标签有什么区别？
2. RFID的读取距离受什么因素影响？
3. RFID相比条形码有哪些优势？
    `
  },
  {
    id: 'sim-bluetooth',
    name: '蓝牙通信模拟',
    type: 'bluetooth',
    description: '模拟蓝牙设备配对和数据传输',
    icon: '📶',
    lessonIds: ['L17'],
    devices: [
      {
        id: 'bt-device',
        name: '蓝牙设备',
        type: 'bluetooth',
        icon: '📱',
        parameters: [
          { key: 'name', label: '设备名称', type: 'string', defaultValue: 'Device-001' },
          { key: 'status', label: '连接状态', type: 'select', options: [{ label: '未连接', value: 'disconnected' }, { label: '配对中', value: 'pairing' }, { label: '已连接', value: 'connected' }], defaultValue: 'disconnected' }
        ],
        defaultValue: { name: 'Device-001', status: 'disconnected' }
      }
    ],
    guide: `
# 蓝牙通信实验指导

## 实验目的
1. 理解蓝牙配对过程
2. 体验蓝牙数据传输
3. 了解蓝牙的通信特点

## 实验步骤

### 第一步：设备发现
1. 点击"扫描设备"按钮
2. 观察发现的蓝牙设备列表
3. 选择要连接的设备

### 第二步：蓝牙配对
1. 选择目标设备后点击"配对"
2. 模拟配对确认过程
3. 观察配对状态变化

### 第三步：数据传输
1. 配对成功后，进入通信界面
2. 输入要发送的数据
3. 点击"发送"按钮
4. 观察数据传输过程和结果

## 实验思考
1. 蓝牙配对为什么要用户确认？
2. 蓝牙和Wi-Fi有什么区别？
    `
  },
  {
    id: 'sim-mqtt',
    name: 'MQTT仿真器',
    type: 'mqtt',
    description: '模拟MQTT协议的消息发布和订阅',
    icon: '📨',
    lessonIds: ['L19'],
    devices: [
      {
        id: 'mqtt-client',
        name: 'MQTT客户端',
        type: 'mqtt-client',
        icon: '💻',
        parameters: [
          { key: 'clientId', label: '客户端ID', type: 'string', defaultValue: 'Client-001' },
          { key: 'qos', label: 'QoS等级', type: 'select', options: [{ label: 'QoS 0 - 最多一次', value: 0 }, { label: 'QoS 1 - 至少一次', value: 1 }, { label: 'QoS 2 - 恰好一次', value: 2 }], defaultValue: 0 }
        ],
        defaultValue: { clientId: 'Client-001', qos: 0 }
      }
    ],
    guide: `
# MQTT协议实验指导

## 实验目的
1. 理解MQTT的发布/订阅模式
2. 学会创建Topic和收发消息
3. 理解QoS服务质量等级

## 实验步骤

### 第一步：创建Topic
1. 在Topic管理区点击"创建Topic"
2. 输入Topic名称（如：home/temperature）
3. 点击"确认"创建

### 第二步：订阅Topic
1. 选择一个客户端
2. 输入要订阅的Topic
3. 点击"订阅"按钮
4. 观察订阅列表

### 第三步：发布消息
1. 选择发布者客户端
2. 选择目标Topic
3. 输入消息内容（如：{"temp": 25.5}）
4. 点击"发布"按钮
5. 观察订阅者是否收到消息

### 第四步：测试QoS
1. 设置不同的QoS等级
2. 观察消息传输的差异
3. 模拟网络中断，观察消息是否重传

## 实验思考
1. 发布/订阅模式有什么优势？
2. 什么时候应该使用QoS 2？
    `
  },
  {
    id: 'sim-lock',
    name: '物联门锁模拟器',
    type: 'lock',
    description: '模拟智能门锁的多种开锁方式',
    icon: '🔐',
    lessonIds: ['L08'],
    devices: [
      {
        id: 'smart-lock',
        name: '智能门锁',
        type: 'lock',
        icon: '🔒',
        parameters: [
          { key: 'lockState', label: '锁状态', type: 'select', options: [{ label: '已锁', value: 'locked' }, { label: '已开', value: 'unlocked' }], defaultValue: 'locked' },
          { key: 'battery', label: '电量', type: 'number', unit: '%', min: 0, max: 100, step: 1, defaultValue: 80 }
        ],
        defaultValue: { lockState: 'locked', battery: 80 }
      }
    ],
    guide: `
# 智能门锁实验指导

## 实验目的
1. 了解智能门锁的多种开锁方式
2. 理解门锁的安全机制
3. 学会查看开锁日志

## 实验步骤

### 第一步：设置开锁方式

1. 密码开锁
   - 设置开锁密码
   - 输入密码测试开锁

2. 指纹开锁
   - 录入指纹信息
   - 模拟指纹验证开锁

3. 刷卡开锁
   - 添加授权RFID卡片
   - 测试刷卡开锁

4. 远程开锁
   - 模拟手机APP远程开锁
   - 查看远程开锁记录

### 第二步：查看开锁日志
1. 进入日志查看页面
2. 查看历史开锁记录
3. 筛选特定时间段或开锁方式

## 实验思考
1. 多种开锁方式如何提升安全性？
2. 门锁电量低时应该如何处理？
    `
  },
  {
    id: 'sim-home',
    name: '智能家居集成',
    type: 'home',
    description: '模拟智能家居场景和设备联动',
    icon: '🏠',
    lessonIds: ['L04', 'L23', 'L27'],
    devices: [
      {
        id: 'smart-light',
        name: '智能灯',
        type: 'light',
        icon: '💡',
        parameters: [
          { key: 'state', label: '状态', type: 'boolean', defaultValue: false },
          { key: 'brightness', label: '亮度', type: 'number', unit: '%', min: 0, max: 100, step: 10, defaultValue: 80 }
        ],
        defaultValue: { state: false, brightness: 80 }
      },
      {
        id: 'smart-ac',
        name: '智能空调',
        type: 'airconditioner',
        icon: '❄️',
        parameters: [
          { key: 'state', label: '状态', type: 'boolean', defaultValue: false },
          { key: 'mode', label: '模式', type: 'select', options: [{ label: '制冷', value: 'cool' }, { label: '制热', value: 'heat' }, { label: '自动', value: 'auto' }], defaultValue: 'cool' },
          { key: 'temperature', label: '温度', type: 'number', unit: '°C', min: 16, max: 30, step: 1, defaultValue: 26 }
        ],
        defaultValue: { state: false, mode: 'cool', temperature: 26 }
      }
    ],
    guide: `
# 智能家居场景实验指导

## 实验目的
1. 理解智能家居的联动规则
2. 学会设计智能场景
3. 体验智能家居的便捷

## 实验步骤

### 第一步：添加智能设备
1. 选择要添加的设备类型
2. 配置设备参数
3. 将设备添加到场景中

### 第二步：设置联动规则
示例：温度过高自动开空调
1. 选择触发条件：温度 > 28°C
2. 选择执行动作：打开空调，设置温度26°C
3. 保存规则

### 第三步：触发场景
1. 手动改变传感器数据
2. 观察是否触发联动
3. 查看执行日志

## 实验思考
1. 如何设计"回家模式"和"离家模式"？
2. 设备联动可能出现什么问题？
    `
  },
  {
    id: 'sim-visualization',
    name: '数据可视化',
    type: 'visualization',
    description: '传感器数据图表和仪表盘展示',
    icon: '📊',
    lessonIds: ['L11', 'L16'],
    devices: [],
    guide: `
# 数据可视化实验指导

## 实验目的
1. 学会用图表展示数据
2. 理解不同图表的适用场景
3. 掌握数据分析方法

## 实验步骤

### 第一步：导入数据
1. 选择数据源（传感器数据）
2. 设置时间范围
3. 导入历史数据

### 第二步：选择图表类型
- 折线图：展示数据变化趋势
- 柱状图：对比不同数据
- 饼图：展示比例关系
- 仪表盘：展示当前数值

### 第三步：分析数据
1. 计算平均值、最大值、最小值
2. 观察数据趋势
3. 发现异常数据

## 实验思考
1. 什么情况下用什么图表？
2. 如何发现数据中的异常？
    `
  }
]

export default simulators
