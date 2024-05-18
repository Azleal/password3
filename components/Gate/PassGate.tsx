'use client'
import { Button, Input } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { hashMessage } from 'viem';
import { GateProps, GateType, MAX_GATE_INDEX } from './GateSetup';
import style from './passGate.module.css';


export default function PassGate(props: GateProps) {

    const [passcode, SetPasscode] = useState("");
    const { onSetComplete, onSetNext, password, index: gateIndex } = props

    useEffect(() => {
        console.log(`in passGate`)
    }, [])

    async function setNext() {
        if (!passcode) {
            return
        }
        console.log(`passGate: setNext, passcode: ${passcode}`)
        const nextKey = hashMessage(passcode)
        const item = {
            type: GateType.PASSCODE,
            data: [],
            index: gateIndex,
        }
        SetPasscode("")
        onSetNext(item, nextKey)
    }

    async function setComplete() {
        if (!passcode) {
            return
        }
        const nextKey = hashMessage(passcode)
        const item = {
            type: GateType.PASSCODE,
            data: [],
            index: gateIndex,
        }
        SetPasscode("")
        onSetComplete(item, nextKey)
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
                    <div className={style.text_tip}>设置后可以选择设置下一道门的密码，或者完成设置</div>

                    <Input className={style.text_5}
                        placeholder='请输入要设置的密码' value={passcode} onChange={(e) => { SetPasscode(e.target.value) }} />
                    
                    <div className={style.button_box}>
                        {gateIndex < MAX_GATE_INDEX ? (<div className={style.text_wrapper_1}>
                            <Button type='primary' className=' h-full' onClick={setNext} disabled={!passcode}>设置下一道门</Button>
                        </div>) : <></>}
                        <div className={style.text_wrapper_2}>
                            <Button type='primary' className=' h-full' onClick={setComplete} disabled={!passcode}>完成设置</Button>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
}
