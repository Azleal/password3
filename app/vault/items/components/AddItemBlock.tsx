import { Modal } from "antd";
import "./ItemBlock.scss";
import { useState } from "react";

export default function AddItemBlock({ itemList, onEvent }: { itemList: ItemBlockType[], onEvent: () => void }) {
    itemList = [
        { key: '名称', value: '钱包1' },
        { key: '名称', value: '钱包1' },
        { key: '名称', value: '钱包1' },

    ]
    const [isModalOpen, setIsModalOpen] = useState(true);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="add_modal" >
                <div className="item_content" >
                    {itemList.map((item, index) => (
                        <div className="item" key={index}>
                            <span>{item.key}</span>
                            <span>{item.value}</span>
                        </div>
                    ))}
                </div>
                <div className="button_con">
                    <button className="ok" onClick={showModal}>确定</button>
                    <button className="cancel"  onClick={onEvent}>取消</button>
                </div>
            </div>

        </>
    );
}
