import Image from 'next/image';
import "../common.css";
import style from "./noVault.module.css";



export default function Vault() {
  return (
      <div className={style.box_1}>
        <div className=' h-40 w-full'>
          &nbsp;
        </div>
        <div className={style.image_wrapper_1}>
          <Image
            alt="image1"
            width={101}
            height={91}
            className={style.image_1}
            src='/assets/vault.png'
          />
        </div>
        <div className={style.group_3}>
        <Image
            alt="image2"
            width={152}
            height={270}
            className={style.image_2}
            src='/bg/bg2.png'
          />
           <Image
            alt="image3"
            width={184}
            height={193}
            className={style.image_3}
            src='/bg/bg1.png'
          />
          <div className={style.group_4}>
            <div className={style.text_group_1}>
              <span className={style.text_7}>创建您的第一个Vault</span>
              <span className={style.text_8}>创建后将展示自己/他人专属的Vault列表</span>
              <span className={style.text_9}>不必担心，我们无法偷偷上传您的信息。</span>
            </div>
            <div className={style.text_wrapper_2}>
              <span className={style.text_10}>创建Vault</span>
            </div>
          </div>
          <Image
            alt="image4"
            width={154}
            height={154}
            className={style.image_4}
            src='/bg/bg5.png'
          />
        </div>
      </div>
  )
}
