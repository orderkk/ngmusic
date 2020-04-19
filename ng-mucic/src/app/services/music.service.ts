import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  /**
   * 播放模式
   * 0: 单曲循环
   * 1: 列表循环
   * 2: 
   */
  public playMode:number = 0
  public musicLists: any[] = [
    {
      id: '0001',
      name: '和你在一起',
      src: '',
      img: '',
      duration: '03:30',
      curTime: '00:00',
      index: 0
    },
    {
      id: '0002',
      name: '关于郑州的记忆',
      src: '',
      img: '',
      duration: '03:50',
      curTime: '00:00',
      index: 1
    },
    {
      id: '0003',
      name: '广场',
      src: '',
      img: '',
      duration: '05:16',
      curTime: '00:00',
      index: 2
    },
    {
      id: '0004',
      name: '和你在一起合唱.',
      src: '',
      img: '',
      duration: '03:27',
      curTime: '00:00',
      index: 3
    },
    {
      id: '0005',
      name: '黑色信封',
      src: '',
      img: '',
      duration: '05:24',
      curTime: '00:00',
      index: 4
    },
    {
      id: '0006',
      name: '忽然',
      src: '',
      img: '',
      duration: '03:13',
      curTime: '00:00',
      index: 5
    },
    {
      id: '0007',
      name: '姐姐',
      src: '',
      img: '',
      duration: '06:49',
      curTime: '00:00',
      index: 6
    },
    {
      id: '0008',
      name: '尽头',
      src: '',
      img: '',
      duration: '04:47',
      curTime: '00:00',
      index: 7
    },
    {
      id: '0009',
      name: '来了',
      src: '',
      img: '',
      duration: '08:48',
      curTime: '00:00',
      index: 8
    },
    {
      id: '0010',
      name: '董卓瑶',
      src: '',
      img: '',
      duration: '03:17',
      curTime: '00:00',
      index: 9
    },
    {
      id: '0011',
      name: '墙上的向日葵',
      src: '',
      img: '',
      duration: '08:48',
      curTime: '00:00',
      index: 10
    },
    {
      id: '0012',
      name: '山阴路的夏天',
      src: '',
      img: '',
      duration: '05:14',
      curTime: '00:00',
      index: 11
    },
    {
      id: '0013',
      name: '青春',
      src: '',
      img: '',
      duration: '02:44',
      curTime: '00:00',
      index: 12
    },
    {
      id: '0014',
      name: '人民不需要自由',
      src: '',
      img: '',
      duration: '08:07',
      curTime: '00:00',
      index: 13
    },
    {
      id: '0015',
      name: '山阴路独白版',
      src: '',
      img: '',
      duration: '04:25',
      curTime: '00:00',
      index: 14
    },
    {
      id: '0016',
      name: '她+我们不能失去信仰+1990年的春天',
      src: '',
      img: '',
      duration: '15:57',
      curTime: '00:00',
      index: 15
    },
    {
      id: '0017',
      name: '下雨',
      src: '',
      img: '',
      duration: '05:14',
      curTime: '00:00',
      index: 16
    },
    {
      id: '0018',
      name: '阿兰',
      src: '',
      img: '',
      duration: '04:21',
      curTime: '00:00',
      index: 17
    },
    {
      id: '0019',
      name: '倒影',
      src: '',
      img: '',
      duration: '02:45',
      curTime: '00:00',
      index: 18
    }
  ]
  public isDetailShow: boolean = false // 是否显示歌曲页
  public curMusicDetail: any = { // 当前播放歌曲信息
    id: '',
    name: '', // 歌曲名
    singer: '李志', // 演唱者
    issueTime: '', // 发行时间
    album: '', // 专辑
    src: '', // 歌曲路径
    img: '', // 歌曲配图
    duration: '', // 时长 （03:45）格式
    durationTime: '', // 时长 毫秒格式
    curTime: '', // 当前播放进度
    isPlay: false, // 播放or暂停
    index: '', // 当前歌曲在列表里的位置
  }
  public preMusicDetail: any = { // 当前播放歌曲上一首信息
    id: '',
    name: '', // 歌曲名
    singer: '李志', // 演唱者
    issueTime: '', // 发行时间
    album: '', // 专辑
    src: '', // 歌曲路径
    img: '', // 歌曲配图
    duration: '', // 时长 （03:45）格式
    durationTime: '', // 时长 毫秒格式
    curTime: '', // 当前播放进度
    isPlay: false, // 播放or暂停
    index: '', // 当前歌曲在列表里的位置
  }
  public nextMusicDetail: any = { // 当前播放歌曲下一首信息
    id: '',
    name: '', // 歌曲名
    singer: '李志', // 演唱者
    issueTime: '', // 发行时间
    album: '', // 专辑
    src: '', // 歌曲路径
    img: '', // 歌曲配图
    duration: '', // 时长 （03:45）格式
    durationTime: '', // 时长 毫秒格式
    curTime: '', // 当前播放进度
    isPlay: false, // 播放or暂停
    index: '', // 当前歌曲在列表里的位置
  }
  constructor() { }

  set(key:string, value:any) {
		localStorage.setItem(key, JSON.stringify(value))
	}
	get(key:string) {
		return JSON.parse(localStorage.getItem(key))
	}

	remove(key:string) {
		localStorage.removeItem(key)
  }
  
  /**
   * 
   * @param timestamp 毫秒转格式化时间
   */
  formatTime(timestamp): string {
    timestamp = Math.floor(timestamp);
    let minute = (Math.floor(timestamp / 60)).toString().padStart(2, '0');
    let second = (timestamp % 60).toString().padStart(2, '0');
    return `${minute}:${second}`;
  }
  /**
   * 
   * @param time 格式化时间转毫秒
   */
  formaTimeMinutes(time): number {
    let arr = time.split(':')
    return arr[0] * 60 * 1000 + arr[1] * 1000
  }
}
