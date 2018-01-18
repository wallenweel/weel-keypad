# 移动端优先的虚拟软键盘
> 初期仅提供数字键盘布局，后期逐步支持自定义布局。

**master** 分支中 `dist` 目录里的文件不是最新的构建，建议克隆 **develop** 分支后手动构建。


## 项目进展状态

pre-Alpha ✔ --> Alpha --> Beta


## 特性清单

- [x] 数字键盘布局
- [ ] 明暗两色主题
- [x] 分离布局（Layout）与主题样式（Theme）
- [x] 基于选项的配置
- [x] Flex 方式布局
- [ ] Float 布局选项（Legacy 兼容）
- [x] 响应正常的可编辑元素（input、div[contenteditable]）
- [x] 按需叫出键盘
- [x] 支持桌面端鼠标事件


## 使用 & 选项说明

1. 使用 develop 分支手动构建，或者切换道  master 分支找到`dist/` 目录
2. 下载合适的库文件，浏览器环境建议 `keypad.umd.min.js` （通用模块）
3. 在页面中引入库文件
4. 使用 new 操作符实例化 `new Keypad(options, [, layouts])`，具体演示可访问 [Demo](http://keypad.weel.xyz/) 页面

```javascript
{
  // 可以响应 “focus|blur” 事件的元素，例如，<input type="text">、<div contenteditable>
  // 支持 selector 字符串，使用 querySelectorAll 查找 DOMs
  el: null,

  // 接受并存储按键内容的 “input” 元素, 只支持单个 DOM 元素
  input: null,

  // 默认 true 使用 Flex 布局，false 使用 Float 布局
  flex: true,

  // 默认 true 使用 touch 相关事件，false 使用 mouse 相关事件
  mobile: true,

  // 按键按下时触发回调函数，第一个参数为按键数据 [text, value, code]
  onstart: null,
  // 按键放开时触发回调函数，参数同上
  onend: null, 

  // 使用 appendChild 方法注入键盘的位置，默认为 body
  inject: document.body
}
```


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