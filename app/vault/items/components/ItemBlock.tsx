import "./ItemBlock.scss";

export default function ItemBlock({ itemList, onEvent }: { itemList: ItemBlockType[][], onEvent: () => void }) {
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
