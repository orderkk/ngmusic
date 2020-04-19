import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { MusicService } from '../../services/music.service'
@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.css']
})
export class BackComponent implements OnInit {

  @ViewChild('musicImg') public musicImg: any
  @ViewChild('audioElement') public audioElement: any
  @ViewChild('progressBarElement') public progressBarElement: any

  public isPlay: boolean = true
  public currentLineWidth: number = 0
  public data: any = HTMLAudioElement
  public visible: boolean = false;
  public isShowLyric: boolean = false // 是否显示歌词页

  public nzTitle: string = '播放列表'

  public http: string = 'http://orderkk.cn/music/2012/'
  public barWidth: number = 0

  public InterVal: any // 图片旋转的定时器
  public timer: any // 当前播放时间的定时器
  public progressInterval: any // 进度条的定时器
  public count: number = 0 //当前播放时间的计数器
  public rotateVal: number = 0
  constructor(
    public musicData: MusicService
  ) { }

  toggle(): void {
    this.musicData.curMusicDetail.isPlay = !this.musicData.curMusicDetail.isPlay
    if (this.musicData.curMusicDetail.isPlay) {
      this.data.play()
      this.rotate()
    } else {
      this.data.pause()
      clearInterval(this.InterVal)
      clearInterval(this.timer)
    }
  }

  rotate(): void {
    var img = this.musicImg.nativeElement
    this.InterVal = setInterval(() => {
      this.rotateVal += 2
      // 设置旋转属性(顺时针)
      img.style.transform = 'rotate(' + this.rotateVal + 'deg)'
      // 设置旋转属性(逆时针)
      //img.style.transform = 'rotate(-' + rotateVal + 'deg)'
      // 设置旋转时的动画  匀速0.1s
      img.style.transition = '0.1s linear'
    }, 100)
  }

  lyric(): void {
    this.isShowLyric = !this.isShowLyric
  }

  handlerPanmove(): void {
  }

  ngOnInit(): void {
    this.nzTitle = this.nzTitle + '(' + this.musicData.musicLists.length + ')'
  }

  ngAfterViewInit(): void {
    if (this.musicData.curMusicDetail.isPlay) {
      this.rotate()
    }

    const audio = this.audioElement.nativeElement
    this.data = audio

    this.barWidth = this.progressBarElement.nativeElement.clientWidth;
    console.log(this.progressBarElement)

  }

  ngAfterViewChecked(): void {
    // console.log('ngAfterViewChecked')
  }

  closeSelf(): void {
    this.musicData.isDetailShow = false
  }


  openLists(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  chooseMusic(val: any, key: number): void {
    this.musicData.curMusicDetail = {
      id: val.id,
      name: val.name,
      src: this.http + val.id + '.mp3',
      img: '',
      duration: val.durationTime,
      // durationTime: this.formaTimeMinutes(val.durationTime)
    }
  }

  delMusic(val: number): void {
    this.musicData.musicLists.splice(val, 1)
  }

  // 上一首
  preClick(): void {
    this.currentLineWidth = 0
    clearInterval(this.InterVal)
    clearInterval(this.timer)

    this.musicData.curMusicDetail.isPlay = false
    this.musicData.curMusicDetail = this.musicData.preMusicDetail
  }

  // 下一首
  nextClick(): void {
    this.currentLineWidth = 0
    clearInterval(this.InterVal)
    clearInterval(this.timer)
    this.musicData.curMusicDetail.isPlay = false
    this.musicData.curMusicDetail = this.musicData.nextMusicDetail
  }
}
