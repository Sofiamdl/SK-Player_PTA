

class Player {
    constructor({ playerId }){
      this.playerElement = document.querySelector(`#${playerId}`);
      this.controls = this.playerElement.querySelector('.controls');
      this.volumeStatus = this.playerElement.querySelector('.volume-status')
      this.progressBar = this.playerElement.querySelector('.progress-bar');
      this.volumeBar = this.playerElement.querySelector('.volume-bar');
      this.playBtn = this.playerElement.querySelector('#play');
      this.pauseBtn = this.controls.querySelector('#pause');
      this.forwardBtn = this.controls.querySelector('#forward');
      this.backwardBtn = this.controls.querySelector('#backward');
      this.mutedBtn = this.volumeStatus.querySelector('#mute-volume');
      this.maxVolBtn = this.volumeStatus.querySelector('#max-volume')
      this.nextBtn = this.controls.querySelector("#next");
      this.beforeBtn = this.controls.querySelector("#before");
      this.audioElement = this.playerElement.querySelector('audio');
      this.currentTime = document.getElementById('current-time-song');
      this.album = document.getElementById('album');
      this.currentSong = 0;
      this.handleEventListeners();
      this.startSong();
    }

    handleEventListeners(){
      this.playBtn.addEventListener('click', () => {
        if (this.audioElement.paused){
            this.audioElement.play();
            this.playBtn.classList.remove('fa-play');
            this.playBtn.classList.add('fa-pause')
        }else{
            this.audioElement.pause();
            this.playBtn.classList.remove('fa-pause');
            this.playBtn.classList.add('fa-play')
        }
      });
  
      this.forwardBtn.addEventListener('click', () => {
        this.audioElement.currentTime += 10;
      });
      

      this.backwardBtn.addEventListener('click', () => {
        this.audioElement.currentTime -= 10;
      });

      this.mutedBtn.addEventListener('click', ()=>{
        this.volumeBar.value = 0;
        this.audioElement.volume = 0;
        this.mutedBtn.classList.remove('fa-volume-down');
        this.mutedBtn.classList.add('fa-volume-mute')
      });

      this.maxVolBtn.addEventListener('click', ()=>{
        if(this.audioElement.volume == 0){
          this.mutedBtn.classList.remove('fa-volume-mute');
          this.mutedBtn.classList.add('fa-volume-down')
        }
        this.volumeBar.value = 100;
        this.audioElement.volume = 1;
      });
  
      this.audioElement.addEventListener('timeupdate', () => {
        const {
          currentTime,
          duration,
        } = this.audioElement;
        this.progressBar.value = `${100 * currentTime / duration}`;
        this.currentTime.innerHTML = `${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60)}`;
      });

      this.progressBar.addEventListener('change', () =>{
        const {
            duration,
          } = this.audioElement;
          this.audioElement.currentTime = this.progressBar.value * duration/ 100 ;
      });

      this.volumeBar.addEventListener('change', () =>{
          this.audioElement.volume = this.volumeBar.value/ 100 ;
          if(this.audioElement.volume == 0){
            this.mutedBtn.classList.remove('fa-volume-down');
            this.mutedBtn.classList.add('fa-volume-mute')
          }else{
            this.mutedBtn.classList.remove('fa-volume-mute');
            this.mutedBtn.classList.add('fa-volume-down')
          }
      });

      this.nextBtn.addEventListener('click', ()=>{
        if(this.currentSong + 1 < audios.length){
          this.currentSong += 1;
        }else{
          this.currentSong = 0;
        }
        this.startSong()
        this.progressBar.value = 0;
        if(this.playBtn.classList.contains('fa-pause')){
          this.audioElement.play()
        }
      });

      this.beforeBtn.addEventListener('click', ()=>{
        if(this.currentSong - 1 >= 0){
          this.currentSong -= 1;
        }else{
          this.currentSong = audios.length - 1;
        }
        this.startSong()
        this.progressBar.value = 0;
        if(this.playBtn.hasClass('fa-pause')){
          this.audioElement.play()
        }
      });

      this.audioElement.addEventListener('ended',()=>{
        this.nextBtn.click()
      })
    }

    startSong(){
      const song = './assets/musics/'+ audios[this.currentSong].song;
      this.audioElement.src = song;
      document.getElementById('nome-musica').innerHTML = audios[this.currentSong].title;
      this.currentTime.innerHTML = "0:0";
      this.album.src = './assets/'+ audios[this.currentSong].album;
      document.getElementById("#audio").onloadeddata = function() {
        let audioID =document.getElementById("#audio")
        document.getElementById('time-song').innerHTML =  `${Math.floor(audioID.duration / 60)}:${Math.floor(audioID.duration % 60)}`;
      }
    }


  }
