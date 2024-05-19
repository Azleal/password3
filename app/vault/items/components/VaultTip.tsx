import { Button } from "antd";
import Image from "next/image";
import style from "./VaultTip.module.css";

export default function VaultList({ title, type, onEvent }: { title: string | undefined, type: string, onEvent: (type: string) => void }) {

    return (
        <div className={style.tip_content}>
            <Image
                className={style.image_1}
                alt="vault"
                width={74}
                height={68}
                src="/assets/vault.png"
            />
            <h2 className={style.title} >{title}</h2>

            {
                type == 'edit' ?
                <>
                    <div className={style.tip_text}>快来添加你的第一条项目吧</div>
                    <div className={style.button}>
                    <button className={style.button_add} onClick={() => onEvent('add')} >
                        添加一个item
                    </button>
                    <button className={style.button_share} onClick={() => onEvent('share')}>分享</button>
                </div>
            </> : <div className={style.tip_text}>查看分享给你的项目吧</div>
            }

            
        </div>
    );
}
