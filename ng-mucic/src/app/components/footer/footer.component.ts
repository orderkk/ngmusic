import { Component, OnInit, ViewChild, Input } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { MusicService } from '../../services/music.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    trigger('childAnimation', [
      state('sideUp', style({
        opacity: 1,
        transform: 'translateY(0)',
      })),
      state('sideDown', style({
        opacity: 0,
        transform: 'translateY(100%)',
      })),
      transition('* => *', [
        animate('300ms ease-in-out')
      ]),
    ])
  ]
})

export class FooterComponent implements OnInit {

  @ViewChild('appBack') public appBack: any
  // public data: any = HTMLAudioElement // 播放器原生
  public http: string = 'http://orderkk.cn/music/2012/'
  constructor(
    public musicData: MusicService
  ) { }

  ngOnChanges(): void {
    // console.log('ngOnChanges')
  }
  ngOnInit(): void {
    var cur = this.musicData.get('curMusicDetail') ? this.musicData.get('curMusicDetail') : this.musicData.musicLists[0]
    this.musicData.curMusicDetail = {
      id: cur.id,
      name: cur.name, // 歌曲名
      singer: '李志', // 演唱者
      issueTime: '', // 发行时间
      album: '', // 专辑
      src: this.http + cur.id + '.mp3', // 歌曲路径
      img: '', // 歌曲配图
      duration: cur.duration, // 时长 （03:45）格式
      durationTime: this.musicData.formaTimeMinutes(cur.duration), // 时长 毫秒格式
      curTime: cur.curTime, // 当前播放进度
      isPlay: false, // 播放or暂停
      index: cur.index
    }

    this.musicData.set('curMusicDetail', this.musicData.curMusicDetail)
    // console.log('ngOnInit..')
  }

  ngDoCheck(): void {
    // console.log('ngDoCheck')
  }

  ngAfterContentInit(): void {
    // console.log('ngAfterContentInit')
  }

  ngAfterContentChecked(): void {
    // console.log('ngAfterContentChecked')
  }

  ngAfterViewInit(): void {
    var _this = this
    const audio = _this.appBack.audioElement.nativeElement;
    _this.appBack.data = audio

    audio.addEventListener("canplay", function () {   //当浏览器能够开始播放指定的音频/视频时，发生 canplay 事件。
      console.log("event canplay: " + (new Date()).getTime());
      _this.appBack.count = 0
    });

    audio.addEventListener("play", function () {   //开始播放时触发
      console.log("event play: " + (new Date()).getTime());
      _this.getNextandPre()
      
      _this.appBack.timer = setInterval(() => {
        _this.appBack.count += 1000
        _this.musicData.curMusicDetail.curTime = _this.musicData.formatTime(_this.appBack.count / 1000)
        _this.appBack.currentLineWidth = (_this.appBack.count / _this.musicData.curMusicDetail.durationTime) * _this.appBack.barWidth;
        if (_this.musicData.curMusicDetail.curTime == _this.musicData.curMusicDetail.duration) {
          clearInterval(_this.appBack.timer)
        }
      }, 1000)
    });
    audio.addEventListener("timeupdate", function () { //播放时间改变   这个会一直打印
      // console.log("event timeupdate: " + (new Date()).getTime());
    });
    audio.addEventListener("pause", function () {   // 暂停时会触发，当播放完一首歌曲时也会触发
      console.log("event pause: " + (new Date()).getTime());
    });
    audio.addEventListener("ended", function () {   //当播放完一首歌曲时也会触发
      console.log("event ended: " + (new Date()).getTime());
      _this.musicData.curMusicDetail.isPlay = false
      clearInterval(_this.appBack.InterVal)
      clearInterval(_this.appBack.timer)
      
      console.log(_this.musicData.nextMusicDetail)
      _this.musicData.curMusicDetail = {}
      _this.musicData.curMusicDetail = _this.musicData.nextMusicDetail
      console.log(_this.musicData.curMusicDetail)

      setTimeout(function () {
        _this.toggle()
      }, 100)
    })
    // console.log('ngAfterViewInit')
  }

  ngAfterViewChecked(): void {
    // console.log('ngAfterViewChecked')
  }

  ngOnDestroy(): void {
    // console.log('ngOnDestroy')
  }
  /**
   * 下一首/上一首
   */
  getNextandPre(): void {
    var index = this.musicData.curMusicDetail.index
    var len = this.musicData.musicLists.length
    if (index == 0) {
      // 第一首
      this.musicData.preMusicDetail = {
        id: this.musicData.musicLists[len - 1].id,
        name: this.musicData.musicLists[len - 1].name, // 歌曲名
        singer: '李志', // 演唱者
        issueTime: '', // 发行时间
        album: '', // 专辑
        src: this.http + this.musicData.musicLists[len - 1].id + '.mp3', // 歌曲路径
        img: '', // 歌曲配图
        duration: this.musicData.musicLists[len - 1].duration, // 时长 （03:45）格式
        durationTime: this.musicData.formaTimeMinutes(this.musicData.musicLists[len - 1].duration), // 时长 毫秒格式
        curTime: '00:00', // 当前播放进度
        isPlay: false, // 播放or暂停
        index: this.musicData.musicLists[len - 1].index
      }
      this.musicData.nextMusicDetail = {
        id: this.musicData.musicLists[index + 1].id,
        name: this.musicData.musicLists[index + 1].name, // 歌曲名
        singer: '李志', // 演唱者
        issueTime: '', // 发行时间
        album: '', // 专辑
        src: this.http + this.musicData.musicLists[index + 1].id + '.mp3', // 歌曲路径
        img: '', // 歌曲配图
        duration: this.musicData.musicLists[index + 1].duration, // 时长 （03:45）格式
        durationTime: this.musicData.formaTimeMinutes(this.musicData.musicLists[index + 1].duration), // 时长 毫秒格式
        curTime: "00:00", // 当前播放进度
        isPlay: false, // 播放or暂停
        index: this.musicData.musicLists[index + 1].index
      }
    } else if (index == len - 1) {
      // 最后一首
      this.musicData.preMusicDetail = {
        id: this.musicData.musicLists[index - 1].id,
        name: this.musicData.musicLists[index - 1].name, // 歌曲名
        singer: '李志', // 演唱者
        issueTime: '', // 发行时间
        album: '', // 专辑
        src: this.http + this.musicData.musicLists[index - 1].id + '.mp3', // 歌曲路径
        img: '', // 歌曲配图
        duration: this.musicData.musicLists[index - 1].duration, // 时长 （03:45）格式
        durationTime: this.musicData.formaTimeMinutes(this.musicData.musicLists[index - 1].duration), // 时长 毫秒格式
        curTime: "00:00", // 当前播放进度
        isPlay: false, // 播放or暂停
        index: this.musicData.musicLists[index - 1].index
      }
      this.musicData.nextMusicDetail = {
        id: this.musicData.musicLists[0].id,
        name: this.musicData.musicLists[0].name, // 歌曲名
        singer: '李志', // 演唱者
        issueTime: '', // 发行时间
        album: '', // 专辑
        src: this.http + this.musicData.musicLists[0].id + '.mp3', // 歌曲路径
        img: '', // 歌曲配图
        duration: this.musicData.musicLists[0].duration, // 时长 （03:45）格式
        durationTime: this.musicData.formaTimeMinutes(this.musicData.musicLists[0].duration), // 时长 毫秒格式
        curTime: "00:00", // 当前播放进度
        isPlay: false, // 播放or暂停
        index: this.musicData.musicLists[0].index
      }
    } else {
      this.musicData.preMusicDetail = {
        id: this.musicData.musicLists[index - 1].id,
        name: this.musicData.musicLists[index - 1].name, // 歌曲名
        singer: '李志', // 演唱者
        issueTime: '', // 发行时间
        album: '', // 专辑
        src: this.http + this.musicData.musicLists[index - 1].id + '.mp3', // 歌曲路径
        img: '', // 歌曲配图
        duration: this.musicData.musicLists[index - 1].duration, // 时长 （03:45）格式
        durationTime: this.musicData.formaTimeMinutes(this.musicData.musicLists[index - 1].duration), // 时长 毫秒格式
        curTime: "00:00", // 当前播放进度
        isPlay: false, // 播放or暂停
        index: this.musicData.musicLists[index - 1].index
      }
      this.musicData.nextMusicDetail = {
        id: this.musicData.musicLists[index + 1].id,
        name: this.musicData.musicLists[index + 1].name, // 歌曲名
        singer: '李志', // 演唱者
        issueTime: '', // 发行时间
        album: '', // 专辑
        src: this.http + this.musicData.musicLists[index + 1].id + '.mp3', // 歌曲路径
        img: '', // 歌曲配图
        duration: this.musicData.musicLists[index + 1].duration, // 时长 （03:45）格式
        durationTime: this.musicData.formaTimeMinutes(this.musicData.musicLists[index + 1].duration), // 时长 毫秒格式
        curTime: "00:00", // 当前播放进度
        isPlay: false, // 播放or暂停
        index: this.musicData.musicLists[index + 1].index
      }
    }

  }

  /**
   * 控制音乐播放器的暂停与播放
   */
  toggle(): void {
    this.appBack.toggle()
  }

  openBack(): void {
    this.musicData.isDetailShow = true
  }
}
