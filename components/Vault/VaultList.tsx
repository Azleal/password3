import { Button, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { VaultType } from "../Contract/Password3Contract";
import style from "./vaultList.module.css";

export default function VaultList({ vaults }: { vaults: VaultType[] }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function onSetupClicked(vault: VaultType){
    setLoading(true)
    router.push(`/vault/setup?vault=${vault.id}`)
  }


  function onEnterClicked(vault: VaultType){
    
  }

  
  return (
    <Spin spinning={loading} size="large">
      {/* page */}
      <div className="flex flex-col w-full h-full relative overflow-hidden">
      {/* box_1 */}
        <div className={style.box_1}>
        {/* block_3 */}
          <div className={style.block_3}>
            {vaults.map((e, i) => {
              return (
                <div key={i} className={style.section_1}>
                  <div className="flex flex-row justify-center items-end h-28">
                    <Image
                      className={style.image_1}
                      alt="image_1"
                      width={74}
                      height={68}
                      src="/assets/vault.png"
                    />
                  </div>
                  <span className={style.text_4}>{e.title}</span>
                  <span className={style.text_5}>{e.entrypoint ? '快来添加你的第一条项目吧' : '请先设置口令'}</span>
                  {
                    e.entrypoint ? (
                      <Button type="primary" className={style.text_wrapper_2} onClick={() => {onEnterClicked(e)}}>
                        <span className={style.text_6}>进入Vault</span>
                      </Button>): (
                      <Button type="primary" className={style.text_wrapper_2} onClick={() => {onSetupClicked(e)}}>
                        <span className={style.text_6}>开始设置</span>
                      </Button>)
                  }
                  
                  
                </div>
              );
            })}
          </div>
          <div className={style.image_wrapper_1}>
            <Image
              alt="image_2"
              className={style.image_2}
              width={184}
              height={193}
              src="/bg/bg1.png"
            />
            <Image
              alt="image_3"
              className={style.image_3}
              width={154}
              height={154}
              src="/bg/bg5.png"
            />
          </div>
        </div>
      </div>
    </Spin>
  );
}
