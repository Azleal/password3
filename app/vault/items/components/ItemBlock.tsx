import "./ItemBlock.scss";

export default function ItemBlock({ itemList, onEvent }: { itemList: ItemBlockType[][], onEvent: () => void }) {
    // itemList = [
    //     [
    //         { key: '名称', value: '钱包1' },
    //         { key: '名称', value: '钱包1' },
    //         { key: '名称', value: '钱包1' },
    //     ],
    // ]
    console.log(`ItemBlock: itemList:`, itemList)
    return (
        <>
            {itemList.map((item, index) => (
                <div className="item_content" key={index}>
                    {
                        item.length > 0 ? item.map((subItem, subIndex) => (
                            <div key={index + '-' + subIndex} className="item">
                                <span>{subItem.key}</span>
                                <span>{subItem.value}</span>
                            </div>
                        )) : null
                    }
                </div>

            ))}
        </>
    );
}
