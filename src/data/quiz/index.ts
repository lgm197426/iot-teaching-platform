import { Quiz } from '@/types'

export const quizBank: Quiz[] = [
  // 第一单元：走进物联网
  {
    id: 'Q0101',
    lessonId: 'L01',
    type: 'single',
    question: '物联网的英文缩写是什么？',
    options: [
      { label: 'A', content: 'IoT' },
      { label: 'B', content: 'IT' },
      { label: 'C', content: 'IoP' },
      { label: 'D', content: 'NET' }
    ],
    answer: 'A',
    analysis: '物联网的英文是Internet of Things，缩写为IoT。其中"I"代表Internet，"o"代表of，"T"代表Things。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '物联网定义'
  },
  {
    id: 'Q0102',
    lessonId: 'L01',
    type: 'single',
    question: '以下哪项不是物联网的三大特征？',
    options: [
      { label: 'A', content: '全面感知' },
      { label: 'B', content: '可靠传输' },
      { label: 'C', content: '高速计算' },
      { label: 'D', content: '智能处理' }
    ],
    answer: 'C',
    analysis: '物联网的三大特征是：全面感知、可靠传输、智能处理。"高速计算"不是物联网的基本特征。',
    difficulty: 2,
    points: 2,
    knowledgePoint: '物联网特征'
  },
  {
    id: 'Q0103',
    lessonId: 'L01',
    type: 'judge',
    question: '物联网就是互联网，两者没有区别。',
    options: [
      { label: 'A', content: '正确' },
      { label: 'B', content: '错误' }
    ],
    answer: 'B',
    analysis: '物联网与互联网有本质区别：互联网连接的是人与人，物联网连接的是物与物、人与物。物联网的信息来源是传感器自动采集，而互联网是人为输入。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '物联网与互联网的区别'
  },
  {
    id: 'Q0201',
    lessonId: 'L02',
    type: 'single',
    question: '"物联网"概念最早是在哪一年提出的？',
    options: [
      { label: 'A', content: '1999年' },
      { label: 'B', content: '2005年' },
      { label: 'C', content: '2010年' },
      { label: 'D', content: '2015年' }
    ],
    answer: 'A',
    analysis: '1999年，Kevin Ashton首次提出"物联网"概念，认为物品也应该能够"说话"。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '物联网起源'
  },
  {
    id: 'Q0202',
    lessonId: 'L02',
    type: 'multiple',
    question: '推动物联网发展的关键技术有哪些？（多选）',
    options: [
      { label: 'A', content: '传感器技术' },
      { label: 'B', content: '通信技术（5G等）' },
      { label: 'C', content: '云计算' },
      { label: 'D', content: '人工智能' }
    ],
    answer: ['A', 'B', 'C', 'D'],
    analysis: '物联网发展依赖多项关键技术：传感器技术实现数据采集，通信技术（5G、NB-IoT）实现数据传输，云计算提供数据处理能力，人工智能实现智能分析决策。',
    difficulty: 2,
    points: 3,
    knowledgePoint: '关键技术'
  },
  {
    id: 'Q0301',
    lessonId: 'L03',
    type: 'single',
    question: '物联网三层架构中，负责数据采集的是哪一层？',
    options: [
      { label: 'A', content: '应用层' },
      { label: 'B', content: '网络层' },
      { label: 'C', content: '感知层' },
      { label: 'D', content: '传输层' }
    ],
    answer: 'C',
    analysis: '物联网三层架构：感知层负责数据采集和设备控制，网络层负责信息传输，应用层负责数据处理和智能应用。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '三层架构'
  },
  {
    id: 'Q0302',
    lessonId: 'L03',
    type: 'fill',
    question: '物联网三层架构从下到上依次是：感知层、____层、应用层。',
    answer: '网络',
    analysis: '物联网三层架构从下到上依次是：感知层（数据采集）、网络层（信息传输）、应用层（数据处理和应用）。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '三层架构'
  },
  {
    id: 'Q0401',
    lessonId: 'L04',
    type: 'single',
    question: '以下哪个不属于智能家居的应用？',
    options: [
      { label: 'A', content: '智能音箱' },
      { label: 'B', content: '智能门锁' },
      { label: 'C', content: '共享单车' },
      { label: 'D', content: '智能灯泡' }
    ],
    answer: 'C',
    analysis: '共享单车属于智慧交通应用，不属于智能家居。智能家居包括智能音箱、智能门锁、智能灯泡、智能空调等家庭设备。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '物联网应用场景'
  },
  {
    id: 'Q0402',
    lessonId: 'L04',
    type: 'multiple',
    question: '物联网的主要应用领域包括哪些？（多选）',
    options: [
      { label: 'A', content: '智能家居' },
      { label: 'B', content: '智慧城市' },
      { label: 'C', content: '智慧农业' },
      { label: 'D', content: '智慧医疗' }
    ],
    answer: ['A', 'B', 'C', 'D'],
    analysis: '物联网应用非常广泛，包括智能家居、智慧城市、智慧交通、智慧农业、智慧医疗、工业物联网等多个领域。',
    difficulty: 1,
    points: 3,
    knowledgePoint: '物联网应用场景'
  },
  {
    id: 'Q0501',
    lessonId: 'L05',
    type: 'judge',
    question: '边缘计算是将计算能力部署在网络边缘，可以降低延迟并保护数据隐私。',
    options: [
      { label: 'A', content: '正确' },
      { label: 'B', content: '错误' }
    ],
    answer: 'A',
    analysis: '边缘计算将计算能力部署在靠近数据源的网络边缘，优势包括：低延迟（本地处理）、省带宽（减少上传）、高可靠（断网也能工作）、隐私保护（敏感数据不出本地）。',
    difficulty: 2,
    points: 2,
    knowledgePoint: '边缘计算'
  },

  // 第二单元：感知与识别
  {
    id: 'Q0601',
    lessonId: 'L06',
    type: 'single',
    question: '传感器的主要功能是什么？',
    options: [
      { label: 'A', content: '存储数据' },
      { label: 'B', content: '传输数据' },
      { label: 'C', content: '检测并转换信息' },
      { label: 'D', content: '显示数据' }
    ],
    answer: 'C',
    analysis: '传感器是一种检测装置，能感受到被测量的信息，并将检测到的信息转换成电信号或其他形式输出。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '传感器定义'
  },
  {
    id: 'Q0602',
    lessonId: 'L06',
    type: 'fill',
    question: '传感器通常由敏感元件、____元件和信号调理电路三部分组成。',
    answer: '转换',
    analysis: '传感器的组成：敏感元件（感知物理量）→ 转换元件（转换为电信号）→ 信号调理电路（放大、滤波等处理）。',
    difficulty: 2,
    points: 2,
    knowledgePoint: '传感器组成'
  },
  {
    id: 'Q0701',
    lessonId: 'L07',
    type: 'single',
    question: '手机自动调节屏幕亮度使用的是哪种传感器？',
    options: [
      { label: 'A', content: '温度传感器' },
      { label: 'B', content: '光敏传感器' },
      { label: 'C', content: '声音传感器' },
      { label: 'D', content: '运动传感器' }
    ],
    answer: 'B',
    analysis: '光敏传感器可以检测环境光照强度，手机根据光照强度自动调节屏幕亮度，在强光下提高亮度，在暗光下降低亮度。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '光敏传感器应用'
  },
  {
    id: 'Q0702',
    lessonId: 'L07',
    type: 'multiple',
    question: '以下哪些是常见的传感器类型？（多选）',
    options: [
      { label: 'A', content: '温度传感器' },
      { label: 'B', content: '湿度传感器' },
      { label: 'C', content: '光敏传感器' },
      { label: 'D', content: '运动传感器' }
    ],
    answer: ['A', 'B', 'C', 'D'],
    analysis: '常见传感器包括：温度传感器、湿度传感器、光敏传感器、运动传感器（加速度传感器）、声音传感器等。',
    difficulty: 1,
    points: 3,
    knowledgePoint: '常见传感器'
  },
  {
    id: 'Q0801',
    lessonId: 'L08',
    type: 'single',
    question: 'RFID的中文名称是什么？',
    options: [
      { label: 'A', content: '射频识别' },
      { label: 'B', content: '蓝牙识别' },
      { label: 'C', content: '红外识别' },
      { label: 'D', content: '图像识别' }
    ],
    answer: 'A',
    analysis: 'RFID是Radio Frequency Identification的缩写，中文名称为射频识别，是一种无线通信技术。',
    difficulty: 1,
    points: 2,
    knowledgePoint: 'RFID定义'
  },
  {
    id: 'Q0802',
    lessonId: 'L08',
    type: 'multiple',
    question: 'RFID系统由哪些部分组成？（多选）',
    options: [
      { label: 'A', content: 'RFID标签' },
      { label: 'B', content: 'RFID读写器' },
      { label: 'C', content: '天线' },
      { label: 'D', content: '数据库系统' }
    ],
    answer: ['A', 'B', 'C', 'D'],
    analysis: 'RFID系统组成：RFID标签（存储信息）、RFID读写器（读取/写入数据）、天线（发射和接收信号）、数据库系统（存储和管理数据）。',
    difficulty: 2,
    points: 3,
    knowledgePoint: 'RFID组成'
  },
  {
    id: 'Q0901',
    lessonId: 'L09',
    type: 'judge',
    question: '二维码比一维条形码存储的信息容量更大。',
    options: [
      { label: 'A', content: '正确' },
      { label: 'B', content: '错误' }
    ],
    answer: 'A',
    analysis: '二维码在水平和垂直两个方向都能存储信息，信息容量远大于一维条形码。二维码还可以存储汉字、图片等，容错能力也更强。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '二维码特点'
  },
  {
    id: 'Q0902',
    lessonId: 'L09',
    type: 'single',
    question: '共享单车开锁使用的是哪种识别技术？',
    options: [
      { label: 'A', content: 'RFID' },
      { label: 'B', content: '二维码' },
      { label: 'C', content: '条形码' },
      { label: 'D', content: '人脸识别' }
    ],
    answer: 'B',
    analysis: '共享单车使用二维码识别技术，用户用手机APP扫描车身上的二维码即可开锁。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '二维码应用'
  },
  {
    id: 'Q1001',
    lessonId: 'L10',
    type: 'single',
    question: '人脸识别属于哪种识别技术？',
    options: [
      { label: 'A', content: '条码识别' },
      { label: 'B', content: '图像识别' },
      { label: 'C', content: '语音识别' },
      { label: 'D', content: 'RFID识别' }
    ],
    answer: 'B',
    analysis: '人脸识别是图像识别的一种应用，通过计算机分析人脸图像特征，实现身份识别。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '图像识别'
  },
  {
    id: 'Q1101',
    lessonId: 'L11',
    type: 'single',
    question: '智能音箱（如小爱同学）能听懂语音指令，使用的是什么技术？',
    options: [
      { label: 'A', content: '图像识别' },
      { label: 'B', content: '语音识别' },
      { label: 'C', content: '条码识别' },
      { label: 'D', content: 'RFID识别' }
    ],
    answer: 'B',
    analysis: '智能音箱使用语音识别技术，将用户的语音转换为文字或命令，然后执行相应操作。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '语音识别应用'
  },

  // 第三单元：传感器与数据采集
  {
    id: 'Q1201',
    lessonId: 'L12',
    type: 'single',
    question: 'DHT11传感器可以测量哪些数据？',
    options: [
      { label: 'A', content: '仅温度' },
      { label: 'B', content: '仅湿度' },
      { label: 'C', content: '温度和湿度' },
      { label: 'D', content: '光照强度' }
    ],
    answer: 'C',
    analysis: 'DHT11是一款常用的温湿度传感器，可以同时测量温度和湿度，温度测量范围0-50°C，湿度测量范围20-90%RH。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '温湿度传感器'
  },
  {
    id: 'Q1202',
    lessonId: 'L12',
    type: 'judge',
    question: 'DHT22比DHT11的测量精度更高。',
    options: [
      { label: 'A', content: '正确' },
      { label: 'B', content: '错误' }
    ],
    answer: 'A',
    analysis: 'DHT22的精度优于DHT11。DHT22温度精度±0.5°C，湿度精度±2%RH；而DHT11温度精度±2°C，湿度精度±5%RH。',
    difficulty: 2,
    points: 2,
    knowledgePoint: '温湿度传感器精度'
  },
  {
    id: 'Q1301',
    lessonId: 'L13',
    type: 'single',
    question: '光敏电阻的阻值与光照强度的关系是？',
    options: [
      { label: 'A', content: '光照越强，阻值越大' },
      { label: 'B', content: '光照越强，阻值越小' },
      { label: 'C', content: '阻值与光照无关' },
      { label: 'D', content: '阻值始终不变' }
    ],
    answer: 'B',
    analysis: '光敏电阻的阻值随光照强度变化：光照强时阻值小，光照弱时阻值大。利用这一特性可以检测环境光照强度。',
    difficulty: 2,
    points: 2,
    knowledgePoint: '光敏电阻原理'
  },
  {
    id: 'Q1401',
    lessonId: 'L14',
    type: 'single',
    question: '手机横竖屏自动切换使用的是哪种传感器？',
    options: [
      { label: 'A', content: '温度传感器' },
      { label: 'B', content: '光敏传感器' },
      { label: 'C', content: '加速度传感器' },
      { label: 'D', content: '声音传感器' }
    ],
    answer: 'C',
    analysis: '加速度传感器（运动传感器）可以检测手机在三个方向上的加速度，根据加速度判断手机方向，实现横竖屏自动切换。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '加速度传感器应用'
  },
  {
    id: 'Q1501',
    lessonId: 'L15',
    type: 'single',
    question: '根据奈奎斯特采样定理，采样频率应该大于信号最高频率的多少倍？',
    options: [
      { label: 'A', content: '1倍' },
      { label: 'B', content: '2倍' },
      { label: 'C', content: '3倍' },
      { label: 'D', content: '4倍' }
    ],
    answer: 'B',
    analysis: '奈奎斯特采样定理：采样频率应大于信号最高频率的2倍，这样才能无失真地还原原始信号。',
    difficulty: 2,
    points: 2,
    knowledgePoint: '采样定理'
  },
  {
    id: 'Q1502',
    lessonId: 'L15',
    type: 'fill',
    question: 'CD音质的采样频率是____Hz。',
    answer: '44100',
    analysis: 'CD音质的采样频率是44100Hz（44.1kHz），即每秒采样44100次，可以高质量还原音频信号。',
    difficulty: 2,
    points: 2,
    knowledgePoint: '音频采样'
  },
  {
    id: 'Q1601',
    lessonId: 'L16',
    type: 'single',
    question: '以下哪种图表最适合展示数据的变化趋势？',
    options: [
      { label: 'A', content: '饼图' },
      { label: 'B', content: '柱状图' },
      { label: 'C', content: '折线图' },
      { label: 'D', content: '散点图' }
    ],
    answer: 'C',
    analysis: '折线图通过连接数据点展示数据的变化趋势，适合展示时间序列数据或连续变化的数据。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '数据可视化'
  },

  // 第四单元：物联网通信
  {
    id: 'Q1701',
    lessonId: 'L17',
    type: 'single',
    question: '蓝牙的有效传输距离一般在多少米以内？',
    options: [
      { label: 'A', content: '1米' },
      { label: 'B', content: '10米' },
      { label: 'C', content: '100米' },
      { label: 'D', content: '1000米' }
    ],
    answer: 'B',
    analysis: '蓝牙是一种短距离无线通信技术，有效传输距离一般在10米左右，蓝牙5.0可以扩展到100米以上。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '蓝牙传输距离'
  },
  {
    id: 'Q1702',
    lessonId: 'L17',
    type: 'multiple',
    question: '蓝牙的特点包括哪些？（多选）',
    options: [
      { label: 'A', content: '短距离传输' },
      { label: 'B', content: '低功耗' },
      { label: 'C', content: '点对点通信' },
      { label: 'D', content: '需要配对连接' }
    ],
    answer: ['A', 'B', 'C', 'D'],
    analysis: '蓝牙的特点：短距离无线传输（10-100米）、低功耗、点对点通信、使用前需要配对连接。',
    difficulty: 1,
    points: 3,
    knowledgePoint: '蓝牙特点'
  },
  {
    id: 'Q1801',
    lessonId: 'L18',
    type: 'judge',
    question: 'Wi-Fi的传输距离比蓝牙更远，传输速度也更快。',
    options: [
      { label: 'A', content: '正确' },
      { label: 'B', content: '错误' }
    ],
    answer: 'A',
    analysis: 'Wi-Fi传输距离可达几十到几百米，传输速度可达几百Mbps到几Gbps；蓝牙传输距离约10米，传输速度1-3Mbps。Wi-Fi在距离和速度上都优于蓝牙。',
    difficulty: 1,
    points: 2,
    knowledgePoint: 'Wi-Fi与蓝牙对比'
  },
  {
    id: 'Q1901',
    lessonId: 'L19',
    type: 'single',
    question: 'MQTT协议采用的是什么通信模式？',
    options: [
      { label: 'A', content: '请求-响应模式' },
      { label: 'B', content: '发布-订阅模式' },
      { label: 'C', content: '点对点模式' },
      { label: 'D', content: '广播模式' }
    ],
    answer: 'B',
    analysis: 'MQTT采用发布/订阅模式：发布者发布消息到Broker，Broker将消息推送给订阅了该Topic的订阅者。这种模式解耦了消息发送者和接收者。',
    difficulty: 2,
    points: 2,
    knowledgePoint: 'MQTT通信模式'
  },
  {
    id: 'Q1902',
    lessonId: 'L19',
    type: 'fill',
    question: 'MQTT协议中，消息的分类通过____来区分，类似于电视频道。',
    answer: 'Topic',
    analysis: 'MQTT使用Topic（主题）来分类消息，类似电视频道。发布者发布消息到特定Topic，订阅者订阅Topic接收消息。',
    difficulty: 2,
    points: 2,
    knowledgePoint: 'MQTT Topic'
  },
  {
    id: 'Q2001',
    lessonId: 'L20',
    type: 'single',
    question: '数据传输方式中，可以同时双向传输的是哪种？',
    options: [
      { label: 'A', content: '单工' },
      { label: 'B', content: '半双工' },
      { label: 'C', content: '全双工' },
      { label: 'D', content: '广播' }
    ],
    answer: 'C',
    analysis: '全双工可以同时进行双向传输（如电话）；半双工可以双向传输但不能同时进行（如对讲机）；单工只能单向传输（如广播）。',
    difficulty: 2,
    points: 2,
    knowledgePoint: '数据传输方式'
  },
  {
    id: 'Q2101',
    lessonId: 'L21',
    type: 'single',
    question: '物联网网关的主要作用是什么？',
    options: [
      { label: 'A', content: '存储数据' },
      { label: 'B', content: '显示数据' },
      { label: 'C', content: '协议转换和数据转发' },
      { label: 'D', content: '供电' }
    ],
    answer: 'C',
    analysis: '网关是连接不同网络的设备，主要作用是协议转换（将传感器协议转换为互联网协议）和数据转发（将数据传输到云端）。',
    difficulty: 2,
    points: 2,
    knowledgePoint: '网关功能'
  },
  {
    id: 'Q2201',
    lessonId: 'L22',
    type: 'multiple',
    question: '边缘计算的优势有哪些？（多选）',
    options: [
      { label: 'A', content: '低延迟' },
      { label: 'B', content: '节省带宽' },
      { label: 'C', content: '高可靠性' },
      { label: 'D', content: '隐私保护' }
    ],
    answer: ['A', 'B', 'C', 'D'],
    analysis: '边缘计算的优势：低延迟（本地处理快）、节省带宽（减少数据上传）、高可靠（断网也能工作）、隐私保护（敏感数据不出本地）。',
    difficulty: 2,
    points: 3,
    knowledgePoint: '边缘计算优势'
  },

  // 第五单元：物联网应用
  {
    id: 'Q2301',
    lessonId: 'L23',
    type: 'single',
    question: '智能家居中，多个设备按照规则自动联动运行，这叫什么？',
    options: [
      { label: 'A', content: '远程控制' },
      { label: 'B', content: '语音控制' },
      { label: 'C', content: '场景联动' },
      { label: 'D', content: '定时控制' }
    ],
    answer: 'C',
    analysis: '场景联动是指多个智能设备按照预设规则自动协同工作。例如回家场景：门锁打开后，灯光、空调、窗帘自动联动。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '场景联动'
  },
  {
    id: 'Q2302',
    lessonId: 'L23',
    type: 'judge',
    question: '智能家居系统必须连接互联网才能工作。',
    options: [
      { label: 'A', content: '正确' },
      { label: 'B', content: '错误' }
    ],
    answer: 'B',
    analysis: '智能家居系统不一定必须连接互联网。本地网关可以实现局域网内的设备控制和联动，只有需要远程控制或云服务时才需要连接互联网。',
    difficulty: 2,
    points: 2,
    knowledgePoint: '智能家居工作模式'
  },
  {
    id: 'Q2401',
    lessonId: 'L24',
    type: 'single',
    question: '智慧农业中，土壤湿度传感器可以用于实现什么功能？',
    options: [
      { label: 'A', content: '自动施肥' },
      { label: 'B', content: '智能灌溉' },
      { label: 'C', content: '病虫害预警' },
      { label: 'D', content: '光照调节' }
    ],
    answer: 'B',
    analysis: '土壤湿度传感器检测土壤湿度，当湿度低于阈值时自动开启灌溉系统，实现智能灌溉。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '智慧农业应用'
  },
  {
    id: 'Q2501',
    lessonId: 'L25',
    type: 'single',
    question: 'ETC不停车收费使用的是什么技术？',
    options: [
      { label: 'A', content: '二维码' },
      { label: 'B', content: 'RFID' },
      { label: 'C', content: '蓝牙' },
      { label: 'D', content: 'Wi-Fi' }
    ],
    answer: 'B',
    analysis: 'ETC（Electronic Toll Collection）使用RFID技术。车载OBU（车载单元）与路侧RSU（路侧单元）通过射频通信实现不停车收费。',
    difficulty: 1,
    points: 2,
    knowledgePoint: 'ETC技术'
  },
  {
    id: 'Q2601',
    lessonId: 'L26',
    type: 'multiple',
    question: '智能监控系统可以实现哪些功能？（多选）',
    options: [
      { label: 'A', content: '人脸识别' },
      { label: 'B', content: '移动侦测' },
      { label: 'C', content: '异常报警' },
      { label: 'D', content: '远程查看' }
    ],
    answer: ['A', 'B', 'C', 'D'],
    analysis: '智能监控系统功能：人脸识别（识别陌生人）、移动侦测（检测画面变化）、异常报警（发送报警信息）、远程查看（手机远程查看监控画面）。',
    difficulty: 1,
    points: 3,
    knowledgePoint: '智能监控功能'
  },
  {
    id: 'Q2701',
    lessonId: 'L27',
    type: 'single',
    question: '将多个物联网子系统整合为一个协调工作的整体，这叫什么？',
    options: [
      { label: 'A', content: '系统集成' },
      { label: 'B', content: '数据采集' },
      { label: 'C', content: '设备控制' },
      { label: 'D', content: '网络传输' }
    ],
    answer: 'A',
    analysis: '系统集成是将多个子系统整合为一个协调工作的整体系统，实现数据共享、统一管理。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '系统集成定义'
  },

  // 第六单元：物联网安全
  {
    id: 'Q2801',
    lessonId: 'L28',
    type: 'single',
    question: '以下哪项是物联网设备常见的安全风险？',
    options: [
      { label: 'A', content: '弱密码被破解' },
      { label: 'B', content: '设备电量充足' },
      { label: 'C', content: '网络信号良好' },
      { label: 'D', content: '设备正常运行' }
    ],
    answer: 'A',
    analysis: '物联网设备常见安全风险包括：弱密码被破解、设备固件漏洞、设备被劫持、数据泄露、隐私侵犯等。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '物联网安全风险'
  },
  {
    id: 'Q2802',
    lessonId: 'L28',
    type: 'multiple',
    question: '物联网安全风险包括哪些方面？（多选）',
    options: [
      { label: 'A', content: '设备安全' },
      { label: 'B', content: '网络安全' },
      { label: 'C', content: '数据安全' },
      { label: 'D', content: '应用安全' }
    ],
    answer: ['A', 'B', 'C', 'D'],
    analysis: '物联网安全风险涉及多个层面：设备安全（弱密码、固件漏洞）、网络安全（数据窃听、协议漏洞）、数据安全（数据泄露、隐私侵犯）、应用安全（权限滥用）。',
    difficulty: 2,
    points: 3,
    knowledgePoint: '安全风险类型'
  },
  {
    id: 'Q2901',
    lessonId: 'L29',
    type: 'single',
    question: '将敏感信息部分隐藏或加密处理，这叫什么？',
    options: [
      { label: 'A', content: '数据备份' },
      { label: 'B', content: '数据脱敏' },
      { label: 'C', content: '数据压缩' },
      { label: 'D', content: '数据传输' }
    ],
    answer: 'B',
    analysis: '数据脱敏是将敏感信息部分隐藏或加密处理，保护个人隐私。例如：手机号显示为138****1234。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '数据脱敏'
  },
  {
    id: 'Q3001',
    lessonId: 'L30',
    type: 'multiple',
    question: '强密码应该具备哪些特点？（多选）',
    options: [
      { label: 'A', content: '长度足够（≥8位）' },
      { label: 'B', content: '包含大小写字母' },
      { label: 'C', content: '包含数字' },
      { label: 'D', content: '包含特殊符号' }
    ],
    answer: ['A', 'B', 'C', 'D'],
    analysis: '强密码应该：长度≥8位、包含大小写字母、包含数字、包含特殊符号，且定期更换，不使用常见词汇。',
    difficulty: 1,
    points: 3,
    knowledgePoint: '强密码特点'
  },
  {
    id: 'Q3002',
    lessonId: 'L30',
    type: 'single',
    question: '使用密码加上验证码/指纹/人脸进行双重验证，这叫什么？',
    options: [
      { label: 'A', content: '单因素认证' },
      { label: 'B', content: '双重认证' },
      { label: 'C', content: '无认证' },
      { label: 'D', content: '匿名认证' }
    ],
    answer: 'B',
    analysis: '双重认证（2FA）是指使用两种不同类型的认证方式，如密码+验证码、密码+指纹等，比单因素认证更安全。',
    difficulty: 1,
    points: 2,
    knowledgePoint: '双重认证'
  }
]

export default quizBank
