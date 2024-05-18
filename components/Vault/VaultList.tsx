import { Button } from "antd";
import Image from "next/image";
import { VaultType } from "../Contract/Password3Contract";
import "./vaultList.css";

export default function VaultList({ vaults }: { vaults: VaultType[] }) {
  return (
    <div className="page flex-col">
      <div className="box_1 flex-col">
        <div className="block_3 flex-row">
          {vaults.map((e, i) => {
            return (
              <div key={i} className="section_1 flex flex-col items-center">
                <div className="flex flex-row justify-center items-end h-28">
                  <Image
                    className="image_1"
                    alt="image_1"
                    width={74}
                    height={68}
                    src="/assets/vault.png"
                  />
                </div>
                <span className="text_4">{e.title}</span>
                <span className="text_5">{e.entrypoint ? '快来添加你的第一条项目吧' : '请先设置口令'}</span>
                {
                  e.entrypoint ? (<Button type="primary" className="text-wrapper_2 flex-col justify-center"><span className="text_6">进入Vault</span></Button>): (
                <Button type="primary" className="text-wrapper_2 flex-col justify-center"><span className="text_6">开始设置</span></Button>)
                }
                
                
              </div>
            );
          })}
        </div>
        <div className="image-wrapper_1 flex-row justify-between">
          <Image
            alt="image_2"
            className="image_2"
            width={184}
            height={193}
            src="/bg/bg1.png"
          />
          <Image
            alt="image_3"
            className="image_3"
            width={154}
            height={154}
            src="/bg/bg5.png"
          />
        </div>
      </div>
    </div>
  );
}
