<template>
  <div id="advert">
    <div class="bg1">
      <div>
        <img src="../assets/img/icons/icon-01.png" alt class="icon01" />
        <img src="../assets/img/icons/icon-02.png" alt class="icon02" />
        <img src="../assets/img/icons/icon-03.png" alt class="icon03" />
        <img src="../assets/img/icons/icon-04.png" alt class="icon04" />
        <img src="../assets/img/icons/icon-05.png" alt class="icon05" />
        <img src="../assets/img/icons/icon-06.png" alt class="icon06" />
        <img src="../assets/img/icons/icon-07.png" alt class="icon07" />
      </div>
    </div>
    <div class="bg2">
      <div>
        <span class="icon08">
          <img src="../assets/img/icons/icon-08.png" alt />
        </span>
        <span class="icon09">
          <img src="../assets/img/icons/icon-09.png" alt />
        </span>
        <span class="icon10">
          <img src="../assets/img/icons/icon-10.png" alt />
        </span>
      </div>
    </div>
    <div class="bg3">
      <div>
        <span class="icon11">
          <img src="../assets/img/icons/icon-11.png" alt width="16px" />
        </span>
        <span class="icon12">
          <img src="../assets/img/icons/icon-12.png" alt width="16px" />
        </span>
      </div>
    </div>
    <div class="content">
      <span>xxxx</span>
      <img src="../assets/img/icons/finger.png" alt style="height: 22px; vertical-align: middle" />
    </div>
  </div>
</template>

<script>
export default {
  name: "3DRotate",
};
</script>

<style scoped>
@keyframes animtran {
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(360deg);
  }
}

@keyframes animtrans {
  from {
    transform: rotateZ(360deg);
  }

  to {
    transform: rotateZ(0deg);
  }
}

@-webkit-keyframes animtran {
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(360deg);
  }
}

@-webkit-keyframes animtrans {
  from {
    transform: rotateZ(360deg);
  }

  to {
    transform: rotateZ(0deg);
  }
}

#advert {
  position: absolute;
  top: 0;
  right: 10%;
  width: 300px;
  height: 300px;
  margin: 10% auto;
}

#advert .bg1 {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  width: 260px;
  height: 260px;
}

#advert .bg1 div {
  position: relative;
  width: 260px;
  height: 260px;
  border: #fff 1px dash;
  border-radius: 15em;
  -webkit-animation: animtran 16s linear infinite;
  animation: animtran 16s linear infinite;
}

#advert .bg1 img {
  position: absolute;
  width: 40px;

  /* background-color: #fff;
        border-radius: 50%; */
  -webkit-animation: animtrans 16s linear infinite;
  animation: animtrans 16s linear infinite;
}

#advert .bg1 .icon01 {
  bottom: 25px;
  left: 7px;
}

#advert .bg1 .icon02 {
  top: 80px;
  left: -24px;
}

#advert .bg1 .icon03 {
  top: -7px;
  left: 44px;
}

#advert .bg1 .icon04 {
  top: -7px;
  right: 44px;
}

#advert .bg1 .icon05 {
  top: 80px;
  right: -24px;
}

#advert .bg1 .icon06 {
  right: 7px;
  bottom: 25px;
}

#advert .bg1 .icon07 {
  bottom: -25px;
  left: 105px;
}

#advert .bg2 {
  position: absolute;
  top: 60px;
  left: 60px;
  z-index: 9;
  width: 160px;
  height: 160px;
}

#advert .bg2 div {
  position: relative;
  width: 180px;
  height: 180px;
  border: #ffe 1px dotted;
  border-radius: 15em;
  -webkit-animation: animtrans 12s linear infinite;
  animation: animtrans 12s linear infinite;
}

#advert .bg2 span {
  position: absolute;
  display: inline-block;
  overflow: hidden;
  background-color: #fff;
  border-radius: 15em;
  -webkit-animation: animtran 6s linear infinite;
  animation: animtran 6s linear infinite;
}

#advert .bg2 img {
  display: block;
  width: 24px;
  padding: 5px;
}

#advert .bg2 .icon08 {
  top: 10px;
  left: 13px;
}

#advert .bg2 .icon09 {
  bottom: 0;
  left: 7px;
}

#advert .bg2 .icon10 {
  right: -15px;
  bottom: 40px;
}

#advert .bg3 {
  position: absolute;
  top: 100px;
  left: 100px;
  z-index: 8;
  width: 100px;
  height: 100px;
}

#advert .bg3 div {
  position: relative;
  width: 100px;
  height: 100px;
  border: #fef 1px dotted;
  border-radius: 15em;
  -webkit-animation: animtran 8s linear infinite;
  animation: animtran 8s linear infinite;
}

#advert .bg3 span {
  position: absolute;
  display: inline-block;
  overflow: hidden;
  background-color: #fff;
  border-radius: 15em;
  -webkit-animation: animtrans 4s linear infinite;
  animation: animtrans 4s linear infinite;
}

#advert .bg3 img {
  display: block;
  padding: 10px;
}

#advert .bg3 .icon11 {
  top: -14px;
  right: 0;
}

#advert .bg3 .icon12 {
  right: 10px;
  bottom: -13px;
}

#advert .content {
  position: absolute;
  top: 130px;
  left: 108px;
  z-index: 11;
  font-size: 16px;
  line-height: 40px;
  color: #fff;
  text-align: center;
  cursor: default;
  border-radius: 5px;
  -webkit-box-shadow: #f6f6f6 2px 2px 2px 1px;
  box-shadow: #f6f6f6 2px 2px 2px 1px;
}

@keyframes ani-one {
  from {
    left: 260px;
  }

  to {
    left: 16px;
  }
}

@keyframes ani-two {
  from {
    left: 260px;
  }

  to {
    left: 70px;
  }
}

@keyframes ani-three {
  from {
    top: 0;
    left: 0;
  }

  to {
    top: 8px;
    left: 8px;
  }
}

@keyframes ani-four {
  0% {
    top: 125px;
    left: 85px;
    width: 130px;
    height: 50px;
    margin-left: 0;
    border: #eee 0 solid;
    box-shadow: #f6f6f6 8px 8px 8px 4px;
  }

  100% {
    top: 0;
    left: 50%;
    width: 259px;
    height: 333px;
    margin-left: -130px;
    border: #eee 1px solid;
    box-shadow: #fff 0 0 0 0;
  }
}

@keyframes ani-five {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes ani-six {
  from {
    left: 260px;
  }

  to {
    left: 0;
  }
}

@-webkit-keyframes ani-one {
  from {
    left: 260px;
  }

  to {
    left: 16px;
  }
}

@-webkit-keyframes ani-two {
  from {
    left: 260px;
  }

  to {
    left: 70px;
  }
}

@-webkit-keyframes ani-three {
  from {
    top: 0;
    left: 0;
  }

  to {
    top: 8px;
    left: 8px;
  }
}

@-webkit-keyframes ani-four {
  0% {
    top: 125px;
    left: 85px;
    width: 130px;
    height: 50px;
    margin-left: 0;
    border: #eee 0 solid;
    box-shadow: #f6f6f6 8px 8px 8px 4px;
  }

  100% {
    top: 0;
    left: 50%;
    width: 259px;
    height: 333px;
    margin-left: -130px;
    border: #eee 1px solid;
    box-shadow: #fff 0 0 0 0;
  }
}

@-webkit-keyframes ani-five {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@-webkit-keyframes ani-six {
  from {
    left: 260px;
  }

  to {
    left: 0;
  }
}

input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #999;
}

.animation-paused {
  -webkit-animation-play-state: paused !important;
  animation-play-state: paused !important;
}

.animation-one {
  -webkit-animation: ani-one 0.6s ease 1;
  animation: ani-one 0.6s ease 1;
}

.animation-two {
  -webkit-animation: ani-two 0.6s ease 1;
  animation: ani-two 0.6s ease 1;
}

.animation-three {
  -webkit-animation: ani-three 0.6s ease 1;
  animation: ani-three 0.6s ease 1;
}

.animation-four {
  -webkit-animation: ani-four 0.3s ease 1;
  animation: ani-four 0.3s ease 1;
}

.animation-five {
  -webkit-animation: ani-five 0.5s ease 1;
  animation: ani-five 0.5s ease 1;
}

.animation-six {
  -webkit-animation: ani-six 0.6s ease 1;
  animation: ani-six 0.6s ease 1;
}

.opacity0 {
  opacity: 0;
}
</style>
