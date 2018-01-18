# 移动端优先的虚拟软键盘
> 初期仅提供数字键盘布局，后期逐步支持自定义布局。

**master** 分支中 `dist` 目录里的文件不是最新的构建，建议克隆 **develop** 分支后手动构建。

## 项目进展状态

pre-Alpha ✔ --> Alpha --> Beta

## 特性清单

- [x] 数字键盘布局
- [ ] 明暗两色主题
- [x] 分离布局（Layout）与主题样式（Theme）
- [ ] 基于选项的配置
- [x] Flex 方式布局
- [ ] Float 布局选项（Legacy 兼容）
- [x] 响应正常的可编辑元素（input、div[contenteditable]）
- [ ] 按需叫出键盘
- [ ] 支持桌面端使用

## 构建项目

```bash
#  安装依赖，推荐使用 yarn
yarn

# 或者
npm install

# 启动项目开发环境
npm start

# 发布时打包
npm run build
```