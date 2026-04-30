'use client'

import { useState } from 'react'
import Link from 'next/link'
import { curriculum } from '@/data/curriculum'
import { Lesson } from '@/types'

interface LessonPlanTemplate {
  type: 'lecture' | 'inquiry' | 'project'
  name: string
  icon: string
  desc: string
}

const templates: LessonPlanTemplate[] = [
  { type: 'lecture', name: '讲授型', icon: '🎤', desc: '以教师讲解为主，适合知识点较多的课程' },
  { type: 'inquiry', name: '探究型', icon: '🔬', desc: '引导学生自主探究，适合实验类课程' },
  { type: 'project', name: '项目型', icon: '📋', desc: '项目式学习，适合综合应用类课程' },
]

export default function TeachingPage() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null)
  const [templateType, setTemplateType] = useState<'lecture' | 'inquiry' | 'project'>('lecture')
  const [generatedPlan, setGeneratedPlan] = useState<string>('')
  const [showPlan, setShowPlan] = useState(false)

  const generateLessonPlan = () => {
    if (!selectedLesson) return

    const unit = curriculum.find(u => u.id === selectedLesson.unitId)
    const template = templates.find(t => t.type === templateType)

    let plan = `# ${selectedLesson.name} 教案

## 基本信息
- **课程**：第${selectedLesson.number}课 ${selectedLesson.name}
- **单元**：第${unit?.number}单元 ${unit?.name}
- **课时**：1课时（${selectedLesson.duration}分钟）
- **课型**：${template?.name}
- **教材**：《义务教育信息科技 八年级全一册·物联网实践与探索》

---

## 一、教学目标

### 知识与技能
${selectedLesson.objectives.map((obj, idx) => `${idx + 1}. ${obj}`).join('\n')}

### 过程与方法
1. 通过观察、思考、讨论，理解${selectedLesson.keyPoints[0]}的基本原理
2. 通过实践操作，掌握相关技术的基本应用方法

### 情感态度与价值观
1. 培养对物联网技术的学习兴趣
2. 增强科技意识和创新精神
3. 培养团队协作和问题解决能力

---

## 二、教学重点与难点

### 教学重点
${selectedLesson.keyPoints.map((p, idx) => `${idx + 1}. ${p}`).join('\n')}

### 教学难点
${selectedLesson.difficulties.map((d, idx) => `${idx + 1}. ${d}`).join('\n')}

---

## 三、教学方法

`

    if (templateType === 'lecture') {
      plan += `- 讲授法：讲解${selectedLesson.keyPoints.join('、')}等知识点
- 演示法：通过模拟器演示${selectedLesson.keyPoints[0]}的工作过程
- 讨论法：组织学生讨论生活中的应用场景
- 练习法：学生动手操作，巩固所学知识`
    } else if (templateType === 'inquiry') {
      plan += `- 探究式学习：引导学生自主发现问题、分析问题、解决问题
- 小组合作：分组讨论，培养协作能力
- 实验探究：通过模拟器实验验证理论知识
- 成果展示：学生展示探究成果，互相学习`
    } else {
      plan += `- 项目式学习：以实际项目为导向，综合运用所学知识
- 任务驱动：设置具体任务，学生自主完成
- 分工协作：小组成员分工合作，共同完成项目
- 评价反思：项目完成后进行评价和反思`
    }

    plan += `

---

## 四、教学准备

### 教师准备
- 教学课件（PPT）
- ${selectedLesson.keyPoints[0]}演示案例
- 物联网模拟器（${selectedLesson.simulatorId || '待配置'}）
- 课堂测验题（${selectedLesson.quizIds.length}题）

### 学生准备
- 预习教材相关内容
- 思考生活中${selectedLesson.keyPoints[0]}的应用

---

## 五、教学过程

`

    if (templateType === 'lecture') {
      plan += `### 环节一：导入新课（5分钟）

**教师活动**：
- 展示${selectedLesson.keyPoints[0]}在生活中的应用图片或视频
- 提问：同学们在生活中见过这样的场景吗？知道这是什么技术吗？
- 引出本课主题：${selectedLesson.name}

**学生活动**：
- 观看图片/视频，思考并回答问题
- 激发学习兴趣

---

### 环节二：讲授新课（20分钟）

**教师活动**：
- 讲解${selectedLesson.keyPoints.join('、')}等知识点
- 演示模拟器，展示${selectedLesson.keyPoints[0]}的工作原理
- 结合实例，解释${selectedLesson.difficulties[0]}

**学生活动**：
- 认真听讲，理解知识点
- 观察演示，思考原理
- 记笔记，标记重点难点

---

### 环节三：实践操作（15分钟）

**教师活动**：
- 组织学生打开模拟器进行实践
- 巡视指导，解答学生疑问
- 提醒注意事项

**学生活动**：
- 动手操作模拟器
- 观察、记录实验数据
- 思考实验现象

---

### 环节四：课堂小结（5分钟）

**教师活动**：
- 总结本课知识点：${selectedLesson.keyPoints.join('、')}
- 强调重点难点
- 布置课后作业

**学生活动**：
- 回顾本课所学
- 提出疑问
- 记录作业`
    } else if (templateType === 'inquiry') {
      plan += `### 环节一：创设情境（5分钟）

**教师活动**：
- 创设问题情境：展示${selectedLesson.keyPoints[0]}的应用场景
- 提出探究问题：${selectedLesson.keyPoints[0]}是如何工作的？

**学生活动**：
- 观察情境，思考问题
- 产生探究兴趣

---

### 环节二：自主探究（15分钟）

**教师活动**：
- 引导学生自主探究${selectedLesson.keyPoints[0]}
- 提供探究资源（模拟器、资料等）
- 巡视指导，适时点拨

**学生活动**：
- 小组讨论，制定探究方案
- 操作模拟器，观察现象
- 记录数据，分析结果

---

### 环节三：交流分享（15分钟）

**教师活动**：
- 组织学生分享探究成果
- 引导学生互相评价
- 补充讲解遗漏的知识点

**学生活动**：
- 小组代表汇报成果
- 其他学生提问、评价
- 完善自己的理解

---

### 环节四：总结提升（10分钟）

**教师活动**：
- 总结${selectedLesson.keyPoints.join('、')}等知识点
- 拓展应用场景
- 布置探究作业

**学生活动**：
- 整理笔记，总结收获
- 思考拓展问题`
    } else {
      plan += `### 环节一：项目发布（5分钟）

**教师活动**：
- 发布项目任务：设计并实现一个${selectedLesson.keyPoints[0]}应用
- 明确项目要求和评价标准
- 分组，明确分工

**学生活动**：
- 了解项目任务
- 组建团队，分配角色

---

### 环节二：方案设计（10分钟）

**教师活动**：
- 引导学生设计项目方案
- 提供参考资源
- 审核各组方案

**学生活动**：
- 小组讨论，设计方案
- 绘制系统框图
- 撰写设计文档

---

### 环节三：项目实施（20分钟）

**教师活动**：
- 指导学生使用模拟器实现项目
- 解决技术问题
- 跟踪项目进度

**学生活动**：
- 按方案实施项目
- 使用模拟器进行测试
- 调试优化

---

### 环节四：成果展示（10分钟）

**教师活动**：
- 组织各组展示成果
- 引导学生评价
- 总结知识点

**学生活动**：
- 展示项目成果
- 互相评价、学习
- 反思改进`
    }

    plan += `

---

## 六、板书设计

\`\`\`
┌────────────────────────────────────────┐
│           ${selectedLesson.name}              │
├────────────────────────────────────────┤
│                                        │
│  一、${selectedLesson.keyPoints[0] || '知识点'}         │
│      ${selectedLesson.keyPoints[1] ? '• ' + selectedLesson.keyPoints[1] : ''}         │
│                                        │
│  二、工作原理                           │
│      （图示/流程图）                     │
│                                        │
│  三、应用场景                           │
│      • 场景1                            │
│      • 场景2                            │
│                                        │
└────────────────────────────────────────┘
\`\`\`

---

## 七、课堂活动设计

`

    if (selectedLesson.keyPoints.length > 0) {
      plan += `### 活动1：${selectedLesson.keyPoints[0]}体验
- **时间**：5分钟
- **形式**：小组讨论
- **内容**：讨论生活中${selectedLesson.keyPoints[0]}的应用场景
- **目的**：联系生活实际，激发学习兴趣

`
    }

    if (selectedLesson.simulatorId) {
      plan += `### 活动2：模拟器实践
- **时间**：10分钟
- **形式**：个人操作+小组交流
- **内容**：使用模拟器体验${selectedLesson.keyPoints[0]}的工作过程
- **目的**：通过实践加深理解

`
    }

    plan += `### 活动3：思考讨论
- **时间**：5分钟
- **形式**：全班讨论
- **内容**：${selectedLesson.difficulties[0] || '讨论本课难点'}
- **目的**：突破难点，加深理解

---

## 八、课后作业

### 必做题
1. 复习本课知识点，完成课后测验
2. 阅读${selectedLesson.keyPoints[0]}相关拓展材料

### 选做题
1. 思考${selectedLesson.keyPoints[0]}还能应用在哪些场景
2. 尝试设计一个简单的应用方案

---

## 九、教学反思

（课后填写）

1. 本课教学目标是否达成？
2. 学生对${selectedLesson.keyPoints[0]}的理解程度如何？
3. 教学方法是否适合？有哪些需要改进？
4. 学生活动设计是否合理？参与度如何？

---

## 十、参考资料

- 《义务教育信息科技课程标准（2022年版）》
- 《义务教育信息科技 八年级全一册·物联网实践与探索》
- 相关网络资源和教学视频

---

**教案生成时间**：${new Date().toLocaleString('zh-CN')}

*本教案由物联学堂备课助手自动生成，教师可根据实际情况调整。*
`

    setGeneratedPlan(plan)
    setShowPlan(true)
  }

  const copyPlan = () => {
    navigator.clipboard.writeText(generatedPlan)
    alert('教案已复制到剪贴板！')
  }

  const downloadPlan = () => {
    const blob = new Blob([generatedPlan], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedLesson?.name}-教案.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">备课助手</h1>
        <p className="text-gray-600">
          选择课程 → 选择模板 → 一键生成45分钟标准教案
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span>📚</span> 选择课程
            </h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {curriculum.map((unit) => (
                <div key={unit.id}>
                  <button
                    onClick={() => setSelectedUnit(selectedUnit === unit.id ? null : unit.id)}
                    className="w-full text-left font-medium text-gray-700 mb-2 flex items-center justify-between"
                  >
                    <span>第{unit.number}单元 {unit.name}</span>
                    <span>{selectedUnit === unit.id ? '▼' : '▶'}</span>
                  </button>
                  {selectedUnit === unit.id && (
                    <div className="space-y-1 pl-3">
                      {unit.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedLesson?.id === lesson.id
                              ? 'bg-primary-100 text-primary-700 font-medium'
                              : 'hover:bg-gray-100 text-gray-600'
                          }`}
                        >
                          第{lesson.number}课 {lesson.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-3">📄 选择模板</h3>
            <div className="space-y-2">
              {templates.map((t) => (
                <button
                  key={t.type}
                  onClick={() => setTemplateType(t.type)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    templateType === t.type
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{t.icon}</span>
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateLessonPlan}
            disabled={!selectedLesson}
            className="btn-primary w-full btn-lg disabled:opacity-50"
          >
            🎯 一键生成教案
          </button>
        </div>

        <div className="lg:col-span-2">
          {showPlan ? (
            <div className="card">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <span>📄</span> 教案预览
                </h3>
                <div className="flex gap-2">
                  <button onClick={copyPlan} className="btn-sm btn-secondary">
                    📋 复制
                  </button>
                  <button onClick={downloadPlan} className="btn-sm btn-secondary">
                    📥 下载Markdown
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 max-h-[800px] overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                  {generatedPlan}
                </pre>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 使用提示</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 教案采用Markdown格式，可使用Typora等工具打开</li>
                  <li>• 点击"复制"按钮可直接粘贴到Word等编辑器</li>
                  <li>• 教案内容可根据实际情况灵活调整</li>
                  <li>• 板书设计和课堂活动可根据学生情况修改</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="card text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-xl font-semibold mb-2">开始生成教案</h2>
              <p className="text-gray-500 mb-4">
                从左侧选择课程和模板，点击"一键生成教案"
              </p>
              {selectedLesson && (
                <div className="text-left max-w-md mx-auto p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">已选择课程：</div>
                  <div className="font-medium">{selectedLesson.name}</div>
                  <div className="text-sm text-gray-500 mt-2">
                    模板：{templates.find(t => t.type === templateType)?.name}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
