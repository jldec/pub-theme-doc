module.exports =
{
  'pub-pkg':        'pub-theme-doc',
  generatorPlugins: './plugins/generator-plugin.js',
  sources:          './templates',
  staticPaths: [
    { path:'./node_modules/github-markdown-css/github-markdown.css', route:'/css', inject:true },
    { path:'./css/pub-theme-doc.css', route:'/css', inject:true }
  ]
}