# 物联学堂 - 部署说明文档

## 目录

1. [部署方式选择](#一部署方式选择)
2. [本地运行](#二本地运行)
3. [Vercel一键部署](#三vercel一键部署)
4. [华为云部署](#四华为云部署)
5. [Docker部署](#五docker部署)
6. [常见问题](#六常见问题)

---

## 一、部署方式选择

| 部署方式 | 难度 | 成本 | 适用场景 |
|----------|------|------|----------|
| 本地运行 | ⭐ 简单 | 免费 | 开发测试、单机教学 |
| Vercel | ⭐ 简单 | 免费（额度内） | 小规模使用 |
| 华为云OBS | ⭐⭐ 中等 | 约10元/月 | 推荐生产使用 |
| 华为云ECS | ⭐⭐ 中等 | 约50元/月 | 需要更多控制 |
| Docker | ⭐⭐⭐ 复杂 | 依平台而定 | 容器化部署 |

**推荐方案**：
- 学校内部使用：本地运行或内网部署
- 公网访问：华为云OBS（成本最低）
- 快速体验：Vercel免费部署

---

## 二、本地运行

### 2.1 环境要求

- Node.js 18.x 或更高版本
- npm / pnpm / yarn（任选其一）

### 2.2 安装步骤

**Windows系统**：

```powershell
# 1. 进入项目目录
cd iot-teaching-platform

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 浏览器访问 http://localhost:3000
```

**Mac/Linux系统**：

```bash
# 1. 进入项目目录
cd iot-teaching-platform

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 浏览器访问 http://localhost:3000
```

### 2.3 生产构建

```bash
# 构建静态文件
npm run build

# 输出目录：out/
# 包含：HTML、CSS、JS、图片等静态资源
```

### 2.4 本地预览生产版本

```bash
# 安装静态服务器
npm install -g serve

# 启动服务器
serve out

# 访问 http://localhost:3000
```

---

## 三、Vercel一键部署

### 3.1 准备工作

1. 注册Vercel账号：https://vercel.com
2. 安装Vercel CLI（可选）
   ```bash
   npm install -g vercel
   ```

### 3.2 方式A：通过Vercel网站（推荐）

**步骤1**：将代码上传到GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/iot-teaching-platform.git
git push -u origin main
```

**步骤2**：在Vercel导入项目
1. 登录 https://vercel.com
2. 点击 "Add New Project"
3. 选择 GitHub 仓库
4. 点击 "Import"

**步骤3**：配置项目
```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: out
```

**步骤4**：点击 "Deploy"

**步骤5**：等待部署完成，获得访问地址
```
https://iot-teaching-platform.vercel.app
```

### 3.3 方式B：通过CLI部署

```bash
# 在项目目录执行
vercel

# 首次会要求登录，按提示操作
# 部署完成后会显示访问地址
```

### 3.4 自定义域名（可选）

```bash
# 添加域名
vercel domains add your-domain.com

# 按提示配置DNS解析
```

---

## 四、华为云部署

### 4.1 方式A：OBS静态托管（推荐）

**优点**：成本低、配置简单、无需服务器

**步骤1**：构建静态文件
```bash
npm run build
# 输出：out/ 目录
```

**步骤2**：创建OBS桶
1. 登录华为云控制台
2. 进入对象存储服务 OBS
3. 点击 "创建桶"
   - 桶名称：iot-teaching-platform
   - 区域：选择就近区域（如华北-北京四）
   - 存储类别：标准存储
   - 桶访问权限：公共读

**步骤3**：配置静态网站托管
1. 进入桶详情
2. 点击 "基础配置" → "静态网站托管"
3. 配置：
   - 默认首页：index.html
   - 默认404页面：404.html

**步骤4**：上传文件
1. 点击 "对象" → "上传对象"
2. 选择 `out/` 目录下所有文件
3. 点击上传

**步骤5**：访问网站
```
访问地址格式：
https://iot-teaching-platform.obs.cn-north-4.myhuaweicloud.com/index.html

或绑定自定义域名
```

**步骤6**：绑定自定义域名（可选）
1. 桶详情 → 域名管理
2. 点击 "绑定用户域名"
3. 输入域名（如 iot.yourschool.edu.cn）
4. 按提示配置DNS解析

### 4.2 方式B：ECS服务器部署

**优点**：更灵活、可配置更多功能

**步骤1**：购买ECS服务器
- 规格：1核2G（教学场景足够）
- 系统：Ubuntu 20.04
- 带宽：1-5Mbps

**步骤2**：连接服务器
```bash
ssh root@your-server-ip
```

**步骤3**：安装Nginx
```bash
apt update
apt install nginx -y
```

**步骤4**：上传文件

本地执行：
```bash
npm run build
scp -r out/* root@your-server-ip:/var/www/html/iot/
```

**步骤5**：配置Nginx

编辑 `/etc/nginx/sites-available/iot-teaching`：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/html/iot;
    index index.html;
    
    location / {
        try_files $uri $uri/ $uri.html =404;
    }
    
    # 启用Gzip压缩
    gzip on;
    gzip_types text/plain text/css application/javascript;
}
```

启用配置：
```bash
ln -s /etc/nginx/sites-available/iot-teaching /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

**步骤6**：配置HTTPS（可选）

使用华为云免费SSL证书：
1. 申请证书：SSL证书管理服务
2. 下载Nginx格式证书
3. 配置Nginx：
```nginx
server {
    listen 443 ssl;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    # ...其他配置
}
```

---

## 五、Docker部署

### 5.1 构建Docker镜像

```bash
# 项目已包含Dockerfile
docker build -t iot-teaching:v1.0 .
```

### 5.2 本地运行Docker

```bash
docker run -d -p 80:80 --name iot-teaching iot-teaching:v1.0

# 访问 http://localhost
```

### 5.3 推送到华为云SWR

```bash
# 登录华为云SWR
docker login swr.cn-north-4.myhuaweicloud.com

# 打标签
docker tag iot-teaching:v1.0 \
  swr.cn-north-4.myhuaweicloud.com/namespace/iot-teaching:v1.0

# 推送
docker push swr.cn-north-4.myhuaweicloud.com/namespace/iot-teaching:v1.0
```

### 5.4 在CCE部署

1. 创建CCE集群
2. 创建工作负载
3. 选择SWR镜像
4. 配置Service（LoadBalancer类型）
5. 暴露80端口

---

## 六、常见问题

### Q1：npm install很慢怎么办？

**A**：切换国内镜像
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

### Q2：构建失败报错？

**A**：检查Node.js版本
```bash
node -v  # 需要v18.x或更高
```

### Q3：Vercel部署失败？

**A**：检查vercel.json配置，确保：
```json
{
  "outputDirectory": "out"
}
```

### Q4：华为云OBS访问报403？

**A**：检查桶权限设置：
- 必须设置为"公共读"
- 或配置桶策略

### Q5：如何更新部署？

**A**：
- Vercel：推送新代码自动部署
- 华为云OBS：重新上传out/目录文件
- ECS：重新scp上传文件

### Q6：如何查看访问日志？

**A**：
- Vercel：控制台 → Analytics
- 华为云OBS：桶详情 → 访问日志
- ECS：查看Nginx日志 `/var/log/nginx/access.log`

### Q7：如何配置CDN加速？

**A**：华为云CDN配置：
1. 创建CDN加速域名
2. 源站设置：OBS桶域名或ECS IP
3. 配置缓存规则
4. 修改DNS解析指向CDN

---

## 七、性能优化建议

### 7.1 启用Gzip压缩

Nginx配置：
```nginx
gzip on;
gzip_types text/plain text/css application/javascript application/json;
gzip_min_length 1024;
```

### 7.2 设置缓存

```nginx
# 静态资源长期缓存
location ~* \.(js|css|png|jpg)$ {
    expires 30d;
}

# HTML短期缓存
location ~* \.html$ {
    expires 1h;
}
```

### 7.3 使用CDN

- 静态资源走CDN加速
- 减轻源站压力
- 提升访问速度

---

## 八、成本估算

| 部署方式 | 配置 | 月费用 | 年费用 |
|----------|------|--------|--------|
| Vercel | 免费额度 | 0元 | 0元 |
| 华为云OBS | 10GB存储 | 约10元 | 约120元 |
| 华为云ECS | 1核2G | 约50元 | 约600元 |
| 华为云CCE | 最小集群 | 约200元 | 约2400元 |

**推荐**：教学场景使用华为云OBS，成本低且稳定。

---

## 九、安全建议

### 9.1 启用HTTPS

- 使用免费SSL证书
- 所有HTTP请求重定向到HTTPS

### 9.2 访问控制

- 学校内网可限制IP访问
- 公网部署建议配置访问日志

### 9.3 定期更新

- 定期检查依赖更新
- 及时修复安全漏洞

---

**部署文档 v1.0**

**更新日期**：2026年4月

**技术支持**：详见项目README.md
