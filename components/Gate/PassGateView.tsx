'use client'
import { Button, Input } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { hashMessage } from 'viem';
import { GateData } from './GateSetup';
import style from './passGate.module.css';

export type GateViewProps = {
  index: number,
  onNext: (key: string) => void,
  data: GateData
}


export default function PassGateView(props: GateViewProps) {

  const [passcode, SetPasscode] = useState("");
  const { onNext, index: gateIndex, data: gate} = props

  async function setNext(){
    if(!passcode){
      return
    }
    SetPasscode('')
    onNext(hashMessage(`${passcode},${gate.rnd}`))
  }

  return (
    <div className={style.page}>
            <div className={style.group_2}>
                <Image
                    className={style.image_1}
                    src="/logo.png"
                    alt="Password3 Logo"
                    width={24}
                    height={24}
                    priority
                />
                <div className={style.section}>
                    <div className={style.text_setting}>请设置第{gateIndex + 1}道门的钥匙</div>
                    <Input className={style.text_5}
                        placeholder='请输入设置的口令' value={passcode} onChange={(e) => { SetPasscode(e.target.value) }} />
                    <div className='mt-3 mb-3'></div>
                    <div className={style.text_wrapper_1}>
                      <Button type='primary' className='h-full' onClick={setNext} disabled={!passcode}>继续</Button>
                    </div>
                </div>
            </div>
        </div>
  );
}
