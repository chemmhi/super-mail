<template>
	<div class="comment-info-wrap" v-if="Object.keys(commentInfo).length !== 0">
		<div class="comment-title">
			<div>用户评价</div>
			<div>更多</div>
		</div>
		<div v-for="item in commentInfo">
			<div class="comment-user-info">
				<span><img :src="item.user.avatar" alt="" class="avatar"></span>
				<span>{{item.user.uname}}</span>
			</div>
			<div class="comment-text">{{item.content}}</div>
			<div class="comment-goods-info">
				<span class="comment-time">{{showDate(item.created)}}</span>
				<span>{{item.style}}</span>
			</div>
			<div class="flex">
				<div class="comment-info-images" v-for="item in item.images">
					<img :src="item" alt="">
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	export default {
		name: 'DetailsComments',
		props: {
			commentInfo: {
				type: Array,
				default() {
					return []
				}
			}
		},
		computed: {
			showDate() {
				return (value)=>{
				  const date = new Date(value * 1000);
				  const year = date.getFullYear()
				  const month = date.getMonth()+1
				  const day = date.getDay()
          return year+'/'+month+'/'+day
        }
			}
		}
	}
</script>

<style scoped>
	.comment-info-wrap {
		padding: 0 .6rem;
		font-size: .8rem;
		border-bottom: 4px solid #ececec;
	}
  .comment-title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ececec;
    padding: .8rem;
  }
  .comment-user-info {
    padding: .8rem 0;
  }
  .comment-user-info .avatar {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      margin-right: 10px;
      vertical-align: middle;
    }
  .comment-text {
    line-height: 20px;
  }
  .comment-goods-info {
    color: #999;
    margin: 4px 0;
  }
  .comment-time {
      margin-right: 10px;
  }
  .comment-info-images img{
      width: 60px;
      height: 60px;
      margin-right: 6px;
  }
  .flex {
    display: flex;
  }

</style>
