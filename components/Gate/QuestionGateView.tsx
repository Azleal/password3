'use client'
import { Button, Input } from 'antd'
import Image from 'next/image'
import { useState } from 'react'
import { hashMessage } from 'viem'
import { GateViewProps } from './PassGateView'
import style from './questionGate.module.css'




export default function QuestionGateView(props: GateViewProps) {

  const {onNext, index: gateIndex, data: gate} = props
  const [answers, setAnswers] = useState<string[]>(new Array(gate?.data.length).fill(''))

  function changeAnswerValue(index: number, value: string){
    setAnswers(prev => {
      return prev.map((e,i) =>
        i === index ? value : e
      );
    })
  }

  function extractKey(): string{
    if(!checkGateData()){
      throw new Error("gate data invalid")
    }
    const concatedAnswers = [...answers, gate.rnd].join(',')
    return hashMessage(concatedAnswers)
  }


  /**
   * questions不为空,
   * answers不为空
   */
  function checkGateData(): Boolean{
    if(!answers || answers.length < 1 ){
      return false
    }
    const invalidItems = answers.filter(e => !e)
    if(invalidItems.length > 0){
      return false
    }
    return true
  }

  async function setNext(){
    console.log(`question gate setNext clicked `)
    if(!checkGateData()){
      return
    }
    console.log(`data valid`)
    onNext(extractKey())
  }

  if(!gate){
    return <></>
  }
  
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
        <div className={style.text_wrapper_1 }>
          <div className={style.text_setting}>请输入第{gateIndex + 1}道门的钥匙</div>
        </div>
        <div className={style.group_3 }>
          
          {gate.data.map((e,i) => {
            return (
              <div key={i}>
                <span className={style.text_6}>问题{i+1}</span>
                <div className={style.text_wrapper_2 }>
                  <span className='text-white'>{e}</span>
                </div>
                <div className={style.text_wrapper_3 }>
                  <Input placeholder='请输入答案' onChange={(e) => { 
                    const value = e.target.value
                    changeAnswerValue(i, value)
                   }}></Input>
                </div>
              </div>
            )
          })}
          <div className={style.box_2}>
            <div className={style.text_wrapper_4}>
              <Button type='primary' className='h-full' onClick={setNext} disabled={!checkGateData()}>继续</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
