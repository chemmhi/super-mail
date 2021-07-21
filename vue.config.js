
// module.exports={
//   configureWebpack:{
//     resolve:{
//       alias:{
//         'assets':'@/assets',
//         'components':'@/components',
//         // 'network':path.resolve(src_path,'network'),
//         'network':'@/network',
//         'views':'@/views',
//       }
//     }
//   }
// }

const path = require('path')
module.exports = {
  publicPath:'/dist/',
  chainWebpack: config => {
    config.resolve.alias
        // .set("@",path.join(__dirname,'src'))
        .set("components",path.join(__dirname,'src/components'))
        .set('views',path.join(__dirname,'src/views'))
        .set('assets',path.join(__dirname,'src/assets'))
        .set('network',path.join(__dirname,'src/network'))

  }
}
