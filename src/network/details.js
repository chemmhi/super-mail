import {request} from "@/network/request";

export function getDetails(iid){
  return request({
    url:'detail/',
    params:{
      iid:iid
    }
  })
}


export class GoodsDetails {
  constructor(itemInfo, columns, services ) {
    this.title=itemInfo.title
    this.desc=itemInfo.desc
    this.newPrice=itemInfo.price
    this.oldPrice=itemInfo.oldPrice
    this.discount=itemInfo.discountDesc
    this.realPrice=itemInfo.lowNowPrice
    this.columns=columns
    this.services=services
  }
}


export class Shop {
  constructor(shopInfo) {
    this.logo=shopInfo.shopLogo;
    this.name=shopInfo.name;
    this.fans=shopInfo.cFans;
    this.sells=shopInfo.cSells;
    this.score=shopInfo.score;
    this.goodsCount=shopInfo.cGoods;
  }
}
