
module.exports={
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'components':'@/components',
        // 'network':path.resolve(src_path,'network'),
        'network':'@/network',
        'views':'@/views',
      }
    }
  }
}