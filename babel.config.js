const plugins = [
  [
    "component",
    {
      libraryName: "element-ui",
      styleLibraryName: "theme-chalk"
    }
  ],
]

// 生成模式去除console.log()
if (process.env.NODE_ENV === "production") {
  // plugins.push('transform-remove-console')
  // 如不想清除console.warn()等
  plugins.push(["transform-remove-console", {"exclude": ["error", "warn"]}])
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: plugins
}
