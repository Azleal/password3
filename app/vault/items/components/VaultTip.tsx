import { Button } from "antd";
import Image from "next/image";
import style from "./VaultTip.module.css";

export default function VaultList({ title, onEvent }: { title: string|undefined, onEvent: () => void }) {
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
            <div className={style.tip_text}>快来添加你的第一条项目吧</div>

            <Button type="primary" className={style.button} onClick={onEvent} >
                添加一个item
            </Button>
        </div>
    );
}
