'use client'
import { Button, Input } from 'antd'
import Image from 'next/image'
import style from './questionGate.module.css'


export type QuestionGateDataType = {

}


export default function QuestionGate() {
  return (
    <div className={style.page}>
      <div className={style.section_1 }>
        
        <div className={style.image_wrapper_1 }>
          <Image
            className={style.image_1}
            alt="logo"
            width={72}
            height={72}
            src='/logo.png'
          />
        </div>
        <div className={style.group_2 }>
          <Image
            className={style.image_2}
            alt="image2"
            width={288}
            height={623}
            src='/bg/bg8.png'
          />
          <span className={style.text_3}>设置后可以选择设置下一道门的密码，或者直接进入Vault</span>
        </div>
        <div className={style.text_wrapper_1 }>
          <span className={style.text_4}>请设置第二道门的钥匙</span>
        </div>
        <div className={style.group_3 }>
          <span className={style.text_5}>（最多输入十个问答）</span>
          <span className={style.text_6}>问题1</span>
          <div className={style.text_wrapper_2 }>
            <Input placeholder='请输入问题'></Input>
          </div>
          <div className={style.text_wrapper_3 }>
            <Input placeholder='请输入答案'></Input>
          </div>
          <Image
            className={style.label_2}
            alt="label2"
            width={36}
            height={36}
            src='/assets/plus.png'
          />
          <div className={style.box_2}>
            <div className={style.text_wrapper_4}>
              <Button type='primary' className=' h-full'>设置下一道门</Button>
            </div>
            <div className={style.text_wrapper_5}>
              <Button type='primary' className=' h-full'>完成设置</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
