<template>
  <div v-if="video" class="col-md-8">
    <div class="embed-responsive embed-responsive-16by9">
      <iframe class="embed-responsive-item" :src="videoUrl" />
    </div>
    <div class="details">
      <h4>{{video.snippet.title}}</h4>
      <p>{{video.snippet.description}}</p>
    </div>
    <div id="example">
      
      <button v-if="liked === false" @click="doLiked">{{counterLike}} <font-awesome-icon class="icon-inactive" icon="thumbs-up" /></button>
      <button v-if="liked === true" @click="doUnliked">{{counterLike}} <font-awesome-icon class="icon-active" icon="thumbs-up" /></button>

      <button v-if="disliked === false" @click="doDisliked">{{counterDislike}} <font-awesome-icon class="icon-inactive" icon="thumbs-down" /></button>
      <button v-if="disliked === true" @click="doUnDisliked">{{counterDislike}} <font-awesome-icon class="icon-active" icon="thumbs-down" /></button>
    </div>
    <div class="details" v-for="(data, index) in this.comment_list" :key="index">
      <p><span class="font-weight-bold">{{ data.name }}: </span>{{ data.content }}</p>
    </div>
    <div class="comment">
      <form @submit.prevent="" id="newcommentform" @submit="submitComment">
        <div class="section-writter">
          Name : <input v-model="writter" type="text" value="freza">
        </div>
        <textarea v-model="comment" class="comments-box" placeholder="Comment....."></textarea>
        <p>
          <input  type="submit" value="Submit">
        </p>
      </form>
    </div>
  
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'VideoDetail',
  props: ['video'],
  computed: {
    videoUrl() {
      const videoId = this.video.id.videoId;
      if(this.fetch === false) {
        this.socket.emit('join', {videoId: videoId});
      }
      return `https:/www.youtube.com/embed/${videoId}`;
    }
  },
  data: () =>{
    return { 
      counterLike : 0
      , counterDislike: 0
      , liked : false
      , disliked : false 
      , socket : io('localhost:6969/www', {transports: ['websocket']})
      , likeId : null
      , dislikeId : null
      , comment : null
      , writter : null
      , fetch : false
      , comment_list : null
    };
  },
  methods: {
    doLiked() {
      this.liked = true;
      this.socket.emit('like', {
          videoId: this.video.id.videoId,
          status: true
      });
    },
    doUnliked() {
      this.liked = false;

      this.socket.emit('like', {
          videoId: this.video.id.videoId
          , status : false
          , likeId : this.likeId
      });
    },

    doDisliked() {
      this.disliked = true;

      this.socket.emit('disliked', {
          videoId: this.video.id.videoId,
          status: true
      });
    },
    
    doUnDisliked() {
      this.disliked = false;

      this.socket.emit('disliked', {
          videoId: this.video.id.videoId
          , status: false
          , dislikeId : this.dislikeId
      });
    },
    submitComment() {
      this.socket.emit('comment', {
          videoId: this.video.id.videoId
          , content : this.comment
          , writter : this.writter
      });
      this.comment = null;
    },
  },
  mounted() {
    this.socket.on('like', (data) => {
        this.counterLike = this.counterLike+data.counter;
        this.likeId = data.likeId;
    });

    this.socket.on('disliked', (data) => {
        this.counterDislike = this.counterDislike+data.counter;
        this.dislikeId = data.dislikeId;
    });

    this.socket.on('comment', (data) => {
      let newComment = {
        name : data.name
        , content : data.content
      }
      this.comment_list.push(newComment);
    });

    this.socket.on('join', (data) => {
        this.counterLike = data.like;
        this.counterDislike = data.dislike;
        this.comment_list = data.comment_list;
        this.fetch = true;
    });
  }
}
</script>


<style scoped>
  .details{
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 2px;
  }
  .comments-box{
    width: 100%;
    margin: 10px 2px 10px 2px;
  }
  .section-writter{
    margin: 10px 2px 10px 2px;
  }
  .comment {
        margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 2px;
  }
  .icon-inactive{
    color: #909090;
  }
  .icon-active {
    color: #000
  }
  button {
    background: #0000;
  }
</style>