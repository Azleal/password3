'use client'
import { Input, Spin } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { useConfig } from 'wagmi';
import Password3Contract from '../Contract/Password3Contract';
import "../common.css";
import style from "./noVault.module.css";



export default function NoVault() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const config = useConfig()
  const contract = new Password3Contract(config)

  async function createVault(){
    if(title){
      setLoading(true)
      await contract.createVault(title)
      console.log("created")
      setLoading(false)
    }
  }

  function onInputChange(e: any){
    const value = e.target.value
    setTitle(value)
  }

 
  return (
    <Spin spinning={loading} >
        <div className={style.no_vault_container}>
            <div className={style.no_vault_box}>
                <Image
                    alt="image1"
                    width={101}
                    height={91}
                    className={style.image_1}
                    src='/assets/vault.png'
                />
                <div className={style.group_4}>
                    <div className={style.text_group_1}>
                        <span className={style.text_7}>创建您的第一个Vault</span>
                        <span className={style.text_8}>创建后将展示自己/他人专属的Vault列表</span>
                        <span className={style.text_9}>不必担心，我们无法偷偷上传您的信息。</span>
                    </div>
                    <div className='mt-3'>
                        <Input placeholder="请输入vault名称" onChange={onInputChange}></Input>
                    </div>
                    <div className={style.text_wrapper_2} onClick={createVault} >
                        <span className={style.text_10}>创建Vault</span>
                    </div>
                </div>
            </div>
        </div>

    </Spin>
  )
}
