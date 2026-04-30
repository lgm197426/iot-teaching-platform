# 华为云部署配置

## 部署方式

### 方式1：OBS静态托管（推荐）

1. 构建静态文件
```bash
npm run build
# 输出目录：out/
```

2. 上传到OBS
   - 登录华为云控制台
   - 创建OBS桶（公共读、静态托管）
   - 上传`out/`目录下所有文件
   - 设置首页：index.html
   - 设置404：404.html（如需要）

3. 配置域名（可选）
   - 绑定自定义域名
   - 配置HTTPS证书

### 方式2：ECS服务器部署

1. 购买ECS服务器
   - 规格：1核2G即可
   - 系统：Ubuntu 20.04 / CentOS 7
   - 带宽：1Mbps（教学场景足够）

2. 安装Nginx
```bash
sudo apt update
sudo apt install nginx -y
```

3. 上传文件
```bash
# 本地执行
npm run build
scp -r out/* user@server:/var/www/html/iot-teaching/
```

4. 配置Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html/iot-teaching;
    index index.html;
    
    location / {
        try_files $uri $uri/ $uri.html =404;
    }
}
```

### 方式3：云容器引擎CCE

1. 构建Docker镜像
```dockerfile
FROM nginx:alpine
COPY out/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. 推送镜像到SWR
```bash
docker build -t iot-teaching:v1.0 .
docker tag iot-teaching:v1.0 swr.cn-north-4.myhuaweicloud.com/namespace/iot-teaching:v1.0
docker push swr.cn-north-4.myhuaweicloud.com/namespace/iot-teaching:v1.0
```

3. 创建CCE工作负载
   - 选择镜像
   - 配置Service（LoadBalancer）
   - 暴露80端口

---

## 成本估算

| 部署方式 | 月费用 | 适用场景 |
|----------|--------|----------|
| OBS静态托管 | 约10元 | 最推荐，成本低 |
| ECS 1核2G | 约30-50元 | 需要更多控制 |
| CCE | 约100元+ | 大规模使用 |

---

## 性能配置

### CDN加速（可选）

华为云CDN配置：
- 源站：OBS桶或ECS
- 加速区域：中国大陆
- 缓存规则：
  - HTML：缓存1小时
  - JS/CSS：缓存7天
  - 图片：缓存30天

### HTTPS配置

使用华为云免费SSL证书：
1. 申请免费DV证书
2. 下载Nginx格式证书
3. 配置到OBS/Nginx

---

## 监控告警

配置华为云监控：
- 访问量统计
- 错误率监控
- 响应时间监控
