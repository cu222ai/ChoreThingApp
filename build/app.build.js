({
    appDir: "../",
    baseUrl: "scripts",
    dir: "../../dist",
    mainConfigFile: "../scripts/main.js",
    optimizeCss: "none",
    paths: {
      requireLib: '../scripts/vendor/requirejs/require'
    },
    modules: [

{
  name: 'main',
  include: ['requireLib', 'main', 'app'],
},

  //This makes sure everything doesnt end up in a big file, do not remove the exlude main
  {
    name: 'bundles/todo/main',
    exclude: ['main']
  }
    ]
})
