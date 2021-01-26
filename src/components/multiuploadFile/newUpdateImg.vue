<style lang="scss" scoped>
  @import '~scss';

  .uploadFile {
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }

  .title {
    color: #b6b9c2
  }

  .img-frame {
    margin-right: 0.333333rem;
    margin-top: 0.333333rem;
    width: 2.0rem;
    height: 2.0rem;
    position: relative;

    .img-close {
      position: absolute;
      right: 0;
      z-index: 100;
      color: white;
      background-color: #abadb3;
      border-bottom-left-radius: 55%;
      width: 0.6rem;
      height: 0.6rem;
      text-align: center;
      font-size: 0.1rem;
      line-height: 0.5rem;
    }

    .img-error {
      position: absolute;
      right: 0;
      z-index: 1000;
      color: white;
      background-color: #b31e13;
      border-bottom-left-radius: 55%;
      width: 0.6rem;
      height: 0.6rem;
      text-align: center;
      font-size: 0.1rem;
      line-height: 0.5rem;
    }

    img {
      width: 2.0rem;
      height: 2.0rem;
      // border-radius: 100%;
    }

    span {
      position: absolute;
      overflow: hidden;
      word-break: break-all;
      color: #b31e13;
      font-size: 0.2rem;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 2.0rem;
      background-color: rgba(0, 0, 0, .5);
    }
  }

  .upload-ico {
    text-align: center;
    background-color: #F3F4F7;
    position: absolute;
    width: 2.0rem;
    height: 2.0rem;
    font-size: 0.866667rem;
    line-height: 2.0rem;
    color: #C4C5CD;
  }

  .files {
    background-color: #abadb3;
    position: absolute;
    width: 2.0rem;
    height: 2.0rem;
    opacity: 0;
  }

  .file {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      align-items: center;
    }

    .file-type-p {
      color: #ff5562;
      font-size: 1.0rem;
    }

    .file-type-e {
      color: #29a027;
      font-size: 1.0rem;
    }

    .file-name {
      margin-left: 0.3333333rem;
      font-size: 0.4rem;
      color: #24262c;
    }

    .file-close {
      position: absolute;
      right: 0;
      font-size: 0.4rem;
      margin-right: 0.4rem;
      color: #abadb3;
    }
    .file-error {
      position: absolute;
      right: 0;
      font-size: 0.4rem;
      margin-right: 0.4rem;
      color: #b31e13;
    }
    .error{
      font-size: 0.4rem;
      color: #b31e13;
    }
  }

</style>
<template>
  <div class="uploadFile">
    <div class="img-frame" v-if="imgSrc.length>0 && type==='img'" v-for="item,index in imgSrc" @click="goPrew(index)">
      <v-ico :class="item.size>maxSize?'img-error':'img-close'" @click="removeImg(index)">&#xe652;</v-ico>
      <span v-if="item.size>maxSize">图片大于{{maxSize}}M</span>
      <img :src="item.src" alt="">
    </div>
    <div class="file" v-if="type==='file' && curFile.length>0">
      <div style="display: flex;align-items: flex-end">
        <v-ico class="file-type-p" v-if="curFile[0].type==='application/pdf'">&#xe69b;</v-ico>
        <v-ico class="file-type-e" v-else>&#xe672;</v-ico>
        <span class="file-name">{{curFile[0].name}}</span>
        <span class="error" v-if="curFile[0].size>(maxSize*1024*1024)">(文件大于{{maxSize}}M)</span>
      </div>
      <v-ico :class="curFile[0].size>(maxSize*1024*1024)?'file-error':'file-close'" @click="removeImg()">&#xe652;</v-ico>
    </div>
    <div class="img-frame" v-show="(type==='file' && curFile.length<=0) || type==='img'">
      <v-ico class="upload-ico">&#xe64e;</v-ico>
      <input type="file" :accept="configure.accept" class="files" @change="addFile" multiple="multiple"
             v-if="type==='img'">
      <input type="file" :accept="configure.accept" class="files" @change="addFile" v-if="type==='file'">
    </div>
    <preview ref="preview" :index="defaultImgId" :imgs="imgSrc"></preview>
  </div>
</template>
<script>
    /**
     *@author lqq
     * @data 2019-08-27
     * 多文件上传组件
     * 文件预览，上传上限(图片限制为6，文件限制为1)
     */
    import preview from "./preview";

    export default {
        inject: {form: {default: false}},
        watch: {
            configure(o) {
                if (typeof o.accept === 'string') {
                    this.accept = o.accept;
                }
                return o
            },
        },
        components: {
            preview
        },
        data() {
            return {
                showImg: false,
                defaultImgId: 0,
                imgSrc: [],//图片预览路径
                accept: 'image/*',//图片上传要求类型
                type: "img",
                fileVal: [],
                curImg: [],
                curFile: []
            }
        },

        methods: {
            //预览（区分图片和文件）
            async preview() {
                const readFileAsync = file => new Promise(resolve => {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = evt => resolve(evt.target.result)
                })
                // await同步的等待回调readFileAsync()
                for (let i = 0; i < this.fileVal.length; i++) {
                    var size = Math.round((this.fileVal[i].size) / 1024 / 1024 * 100) / 100;
                    this.imgSrc.push({
                        name: this.fileVal[i].name,
                        size: size,
                        src: await readFileAsync(this.fileVal[i])
                    })
                }
                // this.$emit('reader', this.imgSrc);
            },
            upload() {

            },
            //文件上传（区分图片和文件）
            addFile(e) {
                this.fileVal = []
                var files = e.target.files;
                if ((this.imgSrc.length + files.length) > this.maxNum) {
                    return
                }
                if (files && files.length) {
                    // 原始FileList对象不可更改，所以将其赋予curFiles提供接下来的修改
                    Array.prototype.push.apply(this.fileVal, files);
                }
                if (this.type === 'img') {
                    this.curImg.push.apply(this.curImg, this.fileVal)
                    this.$emit('filesLoad', this.curImg);
                    this.preview();
                } else {
                    if (files[0].type.includes("image/")) {
                        return;
                    }
                    this.curFile = this.fileVal
                    this.$emit('filesLoad', this.curFile);
                }
                this.input(true);
            },
            // 图片预览
            goPrew(o) {
                this.showImg = true;
                this.defaultImgId = o;
                this.$refs.preview.showImg = true;
            },
            // 删除
            removeImg(o) {
                if (this.type === 'img') {
                    this.curImg.splice(o, 1);
                    this.imgSrc.splice(o, 1);
                    this.$emit('filesLoad', this.curImg);
                } else {
                    this.curFile.splice(o, 1);
                    this.$emit('filesLoad', this.curFile);
                }
                //阻止冒泡
                event.stopPropagation()
            },
            input(o) {
                if (this.form) {
                    this.$parent.verification(o);
                }
            },
        },
        created() {
            if (this.configure.accept !== this.accept) {
                this.type = "file"
            }
        },
        props: {
            /** {
               accept:上传的要求类型
            }*/
            configure: {
                type: Object,
                default: {}
            },
            uploadTitle: {//文字提示
                type: String,
                default: '请选择要上传的图片'
            },
            maxSize: {
                type: Number,
                default: 15
            },
            maxNum:{
               type: Number,
                default: 6
            }
        },


    }
</script>
