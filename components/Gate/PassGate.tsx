'use client'
import getIrys from '@/app/irys/getIrysClient';
import { encrypt, encryptWithIv, getRandomIv, getRandomSalt, uint8ArrayToHex } from '@/app/utils/encryption';
import { Button, Input } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { Hash } from 'viem';
import style from './passGate.module.css';

type GateProps = {
  previousHash: Hash|null,
  index: number,
}

export enum GateType {
  PASSCODE = 'passcode',
  QUESTION = 'question',
}

type GateData = {
  type: GateType,
  data: string | string[],
  iv: string,
  index: number,
}


export default function PassGate({props}:{props: any} ) {

  const [passcode, SetPasscode] = useState("");
  const {callback, key, index} = props

  async function upload(){
    const client = await getIrys()
    const {data, iv, salt} = await encrypt(passcode, "test")
    const {id: txId} = await client.upload(data, {tags: [
      {name: "Content-Type", value: "application/json"},
      {name: "iv", value: iv},
      {name: "salt", value: salt}]})

    console.log(`txId: ${txId}`)
  }

  async function setNext(){
    if(!passcode){
      return
    }
    const iv = uint8ArrayToHex(getRandomIv())
    const salt = uint8ArrayToHex(getRandomSalt())

    const item = {
      type: GateType.PASSCODE,
      data: [],
      iv,
      salt,
      index,
    }
    if(key){
      const encrypted = await encryptWithIv(key, iv, salt, passcode)
    }

    callback(item)
  }




  return (
    <div className={style.page}>
      <div className={style.group_1}>
        <div className={style.block_2}>
          <div className={style.group_2}>
            <Image
              className={style.image_1}
              src="/logo.png"
              alt="Password3 Logo"
              width={24}
              height={24}
              priority
            />
            <div className={style.section_1}>
              <div className={style.box_2}>
                {/* <div className={style.text_wrapper_1}>
                  <Button className={style.text_3} type='primary'>设置下一道门</Button>
                </div> */}
                <div className={style.text_wrapper_1}>
                  <Button type='primary' className=' h-full' onClick={setNext} disabled={!passcode}>设置下一道门</Button>
                </div>
                {/* <div className={style.text_wrapper_2}>
                  <Button className={style.text_4} type='primary'>完成设置</Button>
                </div> */}
                <div className={style.text_wrapper_2}>
                  <Button type='primary' className=' h-full' onClick={upload} disabled={!passcode}>完成设置</Button>
                </div>
              </div>
              <div className={style.box_3}>
                <div className={style.text_wrapper_3}>
                  <Input className={style.text_5} placeholder='请输入要设置的密码' onChange={(e) => {SetPasscode(e.target.value)}} />
                </div>
              </div>
              <span className={style.text_6}>请设置第一道门的钥匙</span>
            </div>
            <span className={style.text_7}>设置后可以选择设置下一道门的密码，或者完成设置</span>
          </div>
        </div>
      </div>
    </div>
  );
}
