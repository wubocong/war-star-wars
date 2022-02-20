# war-star-wars

星球大战主题的个人网站开场动画

## 启动

将`src/index.html`中的音乐资源替换为本地地址(todo: 实现一个loader实现interpolation)

```html
<source src="https://warrior-10011799.cos.ap-shanghai.myqcloud.com/music/intro.ogg" type="audio/ogg" />
<source src="https://warrior-10011799.cos.ap-shanghai.myqcloud.com/music/intro.mp3" type="audio/mpeg" />
<!-- <source src="music/intro.ogg" type="audio/ogg" />
        <source src="music/intro.mp3" type="audio/mpeg" /> -->
```

随后

```bash
npm start
```

## FAQ

Q: 启动开发服务器后修改js与sass文件，刷新页面静态资源报错

A: Webpack入口文件是index.js，hmr时没有复制html模板中的静态资源，需要手动触发index.html的保存。之后考虑将入口改为index.html。
