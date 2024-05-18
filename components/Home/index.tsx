import Image from "next/image";
import Link from "next/link";
import "../common.css";
import style from "./index.module.css";

export default function HomePage() {
  return (
    <div className={style.box_1}>
      <div className={style.block_2} />
      <div className={style.text_4}>Password3</div>
      <div className={style.text_5}>用来保存您的账号密码数据</div>
      <div className={style.block_3}>
        <div className={style.section_1}>
          <span className={style.text_6}>通过加密来将您的信息保存在本地</span>
          <span className={style.text_7}>在您需要的时候就可以通过解密来获得您的账号密码信息。</span>
          <div className={style.section_2}>
            <div >
              <Link href="/vault" className={style.text_wrapper_2}>
                <span className={style.text_8}>launch&nbsp;app</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={style.block_4}>
        <div className={style.box_2} />
      </div>
      <Image
        width={560}
        height={453}
        alt="image_3"
        className={style.image_3}
        src="/bg/bg3.png"
      />
    </div>
  )
}



