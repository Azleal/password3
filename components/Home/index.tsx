import Image from "next/image";
import Link from "next/link";
import "../common.css";
import "./index.css";

export default function HomePage() {
  return (
    <div className="page flex-col">
      <div className="box_1 flex-col justify-end">
        <div className="block_2 flex-col" />
        <span className="text_4">Password3</span>
        <span className="text_5">用来保存您的账号密码数据</span>
        <div className="block_3 flex-row">
          <div className="section_1 flex-col">
            <span className="text_6">通过加密来将您的信息保存在本地</span>
            <span className="text_7">在您需要的时候就可以通过解密来获得您的账号密码信息。</span>
            <div className="section_2 flex-col">
              <div >
                <Link href="/vault" className="text-wrapper_2 flex-col">
                  <span className="text_8">launch&nbsp;app</span>
                </Link>
              </div>
            </div>
          </div>
          <Image
            width={184}
            height={193}
            className="image_1"
            alt="image_1"
            src="/bg/bg1.png"
          />
        </div>
        <Image
          className="image_2"
          width={152}
            height={270}
          alt="image_2"
          src="/bg/bg2.png"
        />
        <div className="block_4 flex-col">
          <div className="box_2 flex-col" />
        </div>
        <Image
          width={560}
          height={453}
          alt="image_3"
          className="image_3"
          src="/bg/bg3.png"
        />
      </div>
    </div>
  )
}



