'use client'
import { getRandomSalt, uint8ArrayToHex } from '@/tools/utils/encryption'
import { Button, Input } from 'antd'
import Image from 'next/image'
import { useState } from 'react'
import { hashMessage } from 'viem'
import { GateData, GateProps, GateType } from './GateSetup'
import style from './questionGate.module.css'


export type QuestionGateDataItemType = {
  question: string,
  answer: string
}


export default function QuestionGate(props: GateProps) {

  const {onSetComplete, onSetNext, password, index: gateIndex} = props
  const [items, setItems] = useState<QuestionGateDataItemType[]>([{question: '', answer: ''}])
//   const [checkStatus, SetCheckStatus] = useState<Boolean>(false)
  const [rnd, setRnd] = useState(uint8ArrayToHex(getRandomSalt()))


  function addNewItem(){
    const newItem = {question: '', answer: ''}
    setItems(prevItems => [...prevItems, newItem])
  }

//   useEffect(() => {
//     // 在这里设置checkStatus
//     const status = checkGateData()
//     console.log(`checkStatus: ${status}`)
//     SetCheckStatus(status);
//   }, [items]); // 当items变化时，这个useEffect会被触发


  function changeQuestionValue(index: number, value: string){
    setItems(prevItems => {
      return prevItems.map((e,i) =>
        i === index ? { ...e, question: value } : e
      );
    })
  }

  function changeAnswerValue(index: number, value: string){
    setItems(prevItems => {
      return prevItems.map((e,i) =>
        i === index ? { ...e, answer: value } : e
      );
    })
  }

  function extractKey(): string{
    if(!checkGateData()){
      throw new Error("gate data invalid")
    }
    const concatedAnswers = [...items.map(e => e.answer), rnd].join(',')
    return hashMessage(concatedAnswers)
  }

  function extractQuestions(): GateData{
    if(!checkGateData()){
      throw new Error("gate data invalid")
    }
    return {
      type: GateType.QUESTION,
      data: items.map(e => e.question),
      index: gateIndex,
      rnd
    }
  }

  /**
   * questions不为空,
   * answers不为空
   */
  function checkGateData(): Boolean{
    if(!items || items.length < 1 ){
      return false
    }
    const invalidItems = items.filter(e => !e.question || !e.answer)
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
    onSetNext(extractQuestions(), extractKey())
  }

  async function setComplete(){
    if(!checkGateData()){
      return
    }
    onSetComplete(extractQuestions(), extractKey())
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
          <div className={style.text_setting}>请设置第二道门的钥匙</div>
          <div className={style.text_tip}>设置后可以选择设置下一道门的密码，或者直接进入Vault</div>
        </div>
        <div className={style.group_3 }>
          <span className={style.text_5}>（最多输入十个问答）</span>
          
          {items.map((e,i) => {
            return (
              <div key={i}>
                <span className={style.text_6}>问题{i+1}</span>
                <div className={style.text_wrapper_2 }>
                  <Input placeholder='请输入问题' onChange={(e) => { 
                    const value = e.target.value
                    changeQuestionValue(i, value)
                   }}></Input>
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
          <Image
            className={style.label_2}
            alt="label2"
            width={36}
            height={36}
            onClick={addNewItem}
            src='/assets/plus.png'
          />
          <div className={style.box_2}>
            <div className={style.text_wrapper_4}>
              <Button type='primary' className='h-full' onClick={setNext} disabled={!checkGateData()}>设置下一道门</Button>
            </div>
            <div className={style.text_wrapper_5}>
              <Button type='primary' className=' h-full' onClick={setComplete} disabled={!checkGateData()}>完成设置</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
