import { Input, Modal } from "antd";
import "./ItemBlock.scss";
import { useEffect, useState } from "react";

export default function AddItemBlock({ onEvent }: { onEvent: (open: boolean, list: ItemBlockType[]) => void }) {
    const [itemList, setItemList] = useState<ItemBlockType[]>([])
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        setItemList([
            { key: '', value: '' },
        ])
    }, [])

    const handleOk = () => {
        let isValidate = true
        itemList.forEach((item) => {
            if (item.key == '' || item.value == '') {
                isValidate = false
            }
        })
        if (!isValidate) {
            setVisible(false)
            return
        }
        onEvent(false, itemList);
    };

    const handleCancel = () => {
        onEvent(false, []);
    };
    const handleInput = (type: string, index: number, value: string) => {
        console.log(`AddItemBlock: handleInput, value:`, type, index, value)
        // @ts-ignore
        itemList[index][type] = value
        setItemList([...itemList])
    }
    const handleAdd = () => {
        itemList.push({ key: '', value: '' })
        setItemList([...itemList])

    }
    const remove = (index: number) => {
        return () => {
            itemList.splice(index, 1)
            setItemList([...itemList])
        }
    }
    const dynamicStyle = (value: string) => {
        return {
            borderColor: !visible && value == '' ? 'red' : '#32353C',
        };
    }
    return (
        <>
            {
                <div className="add_modal" >
                    <h4>添加一个item</h4>
                    <div className="add_item_content" >
                        {itemList.map((item, index) => (
                            <div className="item" key={index}>
                                <Input className="item_input item_input_key" style={dynamicStyle(item.key)}
                                    placeholder='' value={item.key}
                                    onChange={(e) => { handleInput('key', index, e.target.value) }}
                                />

                                <Input className="item_input item_input_value" style={dynamicStyle(item.value)}
                                    placeholder='' value={item.value}
                                    onChange={(e) => { handleInput('value', index, e.target.value) }}
                                />

                                {index === itemList.length - 1 ?
                                    <div className="box plus" onClick={handleAdd} >+</div> :
                                    <div className="box minus " onClick={remove(index)} >-</div>}
                            </div>
                        ))}
                    </div>
                    <div className="button_con">
                        <button className="ok" onClick={handleOk}>确定</button>
                        <button className="cancel" onClick={handleCancel}>取消</button>
                    </div>
                </div>
            }
        </>


    );
}
