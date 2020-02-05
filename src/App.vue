<template>
  <div class="container">
    <SearchBar @termChange="onTermChange">
    </SearchBar>
    <div class="row" style="margin-top:10px">
      <VideoDetail :video="selectedVideo"/>
      <VideoList 
      @videoSelect="onVideoSelect"
      v-bind:videos="videos"></VideoList>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

const API_KEY = 'AIzaSyDt2s3MynqgOq5nEoweOkyyXsZCdfCZc2c';
export default {
  name: 'App',
  components: {
    SearchBar,
    VideoList,
    VideoDetail
  },
  data: function(){
    return { videos: [], selectedVideo: null };
  },
  methods:{
    onVideoSelect(video){
      this.selectedVideo = video;
    },
    onTermChange: function(searchTerm) {
      axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: API_KEY,
          type: 'video',
          part: 'snippet',
          q: searchTerm
        }
      }).then(response => {
        this.videos = response.data.items
      })
    }
  }
}
</script>