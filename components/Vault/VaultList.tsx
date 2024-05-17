import Image from "next/image";
import { VaultType } from "../Contract/Password3Contract";
import './vaultList.css';

export default function VaultList({vaults}: {vaults: VaultType[]}) {
  return (
    <div className="page flex-col">
      <div className="box_1 flex-col">
        <div className="block_3 flex-row">
        {
        vaults.map((e, i) => {
          return (
            <div key={i} className="section_1 flex-col">
              <Image
              className="image_1"
              alt="image_1"
              width={74}
              height={68}
              src='/assets/vault.png'
            />
            <span className="text_4">{e.title}</span>
            <span className="text_5">快来添加你的第一条项目吧</span>
            <div className="text-wrapper_2 flex-col">
              <span className="text_6">添加一个item</span>
            </div>
            </div>
          )
        })
      }
        </div>
        <div className="image-wrapper_1 flex-row justify-between">
          <img
            className="image_2"
            src={
              "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngda2a08c12ad540582bd8f5352ddb6c4129cf3dd30b28265a1018ab8544bbffff"
            }
          />
          <img
            className="image_3"
            src={
              "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngd554d9e1f11622c1b467f22e1c9b4c553e05783159d1ebfbc5cd83afd599b6f1"
            }
          />
        </div>
      </div>
    </div>
  )
}
